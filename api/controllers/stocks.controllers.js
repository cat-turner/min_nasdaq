var mongoose = require('mongoose');
var Stocks = mongoose.model('Stock');
var stockSearches = mongoose.model('StockSearch');

var handleError = function(res, err, code = 200) {
    console.log("error finding stock");
    console.log(err);
    res
    .status(code)
    .json(err);
}

var badValue = function(res, code = 400){
    
}

module.exports.getAllStocks = function(req, res) {

    var returnFields = {
        Name: 1,
        Symbol: 1,
        MarketCap: 1,
        Industry: 1
    }
    
    var offset = 0;
    var count = 5;

    var searchQuery = req.query;
    
    if (req.query){
        
        var query = req.query;
        
        // check for pagination
        
        if (query.offset){
            
            offset = parseInt(query.offset, 10);
        }
        
        if (query.count){
            count = parseInt(query.count, 10);
            
        }
        
        if (isNaN(offset) || isNaN(count)){
            res
            .status(400)
            .json({'error': 'bad value for query string'});
            return;
        }
        
        // search for symbol
        
        if (query.Symbol){
            
            if (isNaN(query.Symbol)){
                
                
            }
            
            
            
            
        }
        
        
    }
    
    
    if (searchQuery.Symbol) {
        Stocks.findOne({
            'Symbol': searchQuery.Symbol
        }, returnFields, function(err, stock) {
            if (err) return handleError(res, err, 500);

            if (stock) {

                var search = new stockSearches({
                    Symbol: searchQuery.Symbol
                });

                search.save(function(err, res) {
                    if (err) return handleError(res, err, 400);
                    console.log(res._id);

                });

                res
                .json(stock);

            }else{
                res
                .status(404)
                .json({'search': searchQuery.Symbol + ':stock not found'});
            }



        });

    
    }else {
        Stocks
            .find()
            .select(returnFields)
            .exec(function(err, stock) {
                if (err) return handleError(res, err, 500);
                res
                .json(stock);

            });
    }
};



module.exports.getStockById = function(req, res) {
    var _id = req.params.stockId;
    Stocks
        .findById(_id)
        .exec(function(err, doc) {
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