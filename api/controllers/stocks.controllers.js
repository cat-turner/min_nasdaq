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

var saveStock = function(symbol) {

    var search = new stockSearches({
        Symbol: symbol
    });

    search.save(function(err, res) {
        if (err) return handleError(res, err, 400);
        console.log(res._id);
    });

}

module.exports.getAllStocks = function(req, res) {

    var returnFields = {
        Name: 1,
        Symbol: 1,
        MarketCap: 1,
        Industry: 1
    }

    var offset = 0;
    var count = 1000;

    if (req.query) {

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

        // stock symbol search

        if (query.Symbol) {

            var cleanSymbol = sanitize(query.Symbol).toUpperCase();
            

            Stocks
                .find({
                    "Symbol": {
                        '$regex': cleanSymbol
                    }
                })
                .select(returnFields)
                .exec(function(err, stocks) {
                    if (err) return handleError(res, err, 500);

                    if (stocks) {
                        

                        saveStock(cleanSymbol)

                        res
                        .status(200)
                        .json(stocks);



                    } else {
                        console.log('no stocks');
                        return jsonResponse(res, 404, 'stock not found');

                    }

                });

        }

    }

    Stocks
        .find()
        .select(returnFields)
        .skip(offset)
        .limit(count)
        .exec(function(err, stock) {
            if (err) return handleError(res, err, 500);
            res
            .json(stock);

        });

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