var mongoose = require('mongoose');
var Stocks = mongoose.model('Stock');
var stockSearches = mongoose.model('StockSearch');
var sanitize = require('mongo-sanitize');


var handleError = function(res, err, code = 400) {
    console.log("error finding stock");
    console.log(err);
    res
    .status(code)
    .json(err);
}

var jsonResponse = function(res, code = 200, message) {
    res
    .status(code)
    .json({
            'message': message
        });

}

module.exports.getSearchHistory = function(req, res) {
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

            return jsonResponse(res, 400, 'bad value for query string');

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