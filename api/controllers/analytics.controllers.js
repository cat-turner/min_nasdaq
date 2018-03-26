var mongoose = require('mongoose');
var Stocks = mongoose.model('Stock');
var stockSearches = mongoose.model('StockSearch');
var Users = mongoose.model('Users');
var sanitize = require('mongo-sanitize');


var handleError = function(res, err, code = 400) {
    console.log("error finding stock");
    console.log(err);
    res
    .status(code)
    .json(err);
}

var jsonResponse = function(res, message, code = 200) {
    res
    .status(code)
    .json({
            'message': message
        });

}

module.exports.createSearch = function(req, res){
    
    // data is sent via the body
    
    var postReq = req.body;

    if (postReq.Symbol){
        // seach by symbol
        var symbol = sanitize(postReq.Symbol);
        
        Stocks
        .findOne({'Symbol': symbol}, function(err, item){
            
            if (err) return handleError(res, err, 404);
            
            
            if (item){

                symbol = item.Symbol;

                var search = new stockSearches({
                    Symbol: symbol
                });
        
                search.save(function(err, doc) {
                    if (err) return handleError(doc, err, 400);
                    console.log('Saved '+ symbol + doc._id);
            
                });
        
                var message = 'success';
                
                return jsonResponse(res, message, 201);
                
            }else{
                jsonResponse(res,
                    'no match found; not added to db - ' + symbol,
                    304);
                return;
            }
            
        });
        
    }
    
}

module.exports.getSearch = function(req, res) {
    var offset = 0;
    var count = 10;

    
    if (req.query){
        

        var query = req.query;

        // check for pagination

        if (query.offset) {

            offset = parseInt(query.offset, 10);
        }

        if (query.count) {
            count = parseInt(query.count, 10);

        }

        if (isNaN(offset) || isNaN(count)) {

            return jsonResponse(res, 'bad value for query string', 400);

        }
        
    }
    
    stockSearches
    .find()
    .skip(offset)
    .sort({'date': -1})
    .limit(count)
    .exec(function(err,doc){
        
            if (err) {

                return handleError(res, err, 500);

            } else if (!doc) {

                return handleError(res, err, 404);

            } else {

                res
                .status(200)
                .json(doc);

            }
        
    });
    
    
}


module.exports.saveSearchUser = function(req, res){
    // check if auth info in body
    var userName = req.user;
    var stockName = sanitize(req.body.name);
    if (stockName){
        Users
        .findOne({
            username:userName
        })
        .select('searchHistory')
        .exec(function(err,user){
            if (err) return handleError(res, err, 404);
    
            if (!user){
    
                return jsonResponse(res, 'user not found', 404);
                
            } else{
                
                user.searchHistory.push({
                    name: stockName
                });
                user.save(function(err,userUpdated){
                    if (err) return handleError(res, err, 500);
                    
                    res
                    .status(201)
                    .json({'message': 'search saved'});
                });
                
            }
            
        })

    }else{
        return jsonResponse(res, 'no stock provided', 500);
    }
    
    
}