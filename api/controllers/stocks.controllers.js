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
        Industry: 1,
        IPOyear: 1
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
            console.log('middle part');

            Stocks
                .find({
                    "Symbol": {
                        '$regex': cleanSymbol
                    }
                })
                .select(returnFields)
                .exec(function(err, stocks) {
                    if (err) return handleError(res, err, 500);

                    if (stocks && stocks.length > 0) {

                        if (stocks.length == 1 && stocks[0].Symbol == cleanSymbol){
                           saveStock(cleanSymbol); 
                        }
                        

                        res
                            .status(200)
                            .json(stocks);



                    } else {
                        console.log('no stocks');
                        res
                            .json({
                                'message': 'stock not found'
                            });
                        return;

                    }

                });

        } else if (query.Industry) {

            // get stocks in industry
            var cleanIndustry = sanitize(query.Industry);


            // get unique industry
            Stocks
                .distinct("Industry")
                .exec(function(err, industries) {
                    var closematches = getclosestMatch(industries, cleanIndustry);

                    if (closematches.length > 0) {
                        console.log('Close matches');
                        console.log(closematches);

                        var regex = closematches.join("|");
                        Stocks.find({
                                "Industry": {
                                    '$regex': regex
                                }
                            })
                            .select(returnFields)
                            .exec(function(err, stocks) {
                                if (err) return handleError(res, err, 500);
                                if (stocks && stocks.length > 0) {
                                    res
                                        .status(200)
                                        .json(stocks);
                                    return;

                                }


                            });

                    } else {
                        console.log('no stocks under industry');
                        res
                            .json({
                                'message': 'industry - stocks not found'
                            });
                        return;
                    }

                });

        } else {

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




        }

    } else {

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

    }
    // console.log('----');
    // console.log('heyeye');
    // Stocks
    //     .find()
    //     .select(returnFields)
    //     .skip(offset)
    //     .limit(count)
    //     .exec(function(err, stock) {
    //         if (err) return handleError(res, err, 500);
    //         res
    //         .json(stock);

    //     });

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

var getclosestMatch = function(industries, userInput) {
    var userInputUpper = userInput.toUpperCase();
    var closeMatches = [];
    for (var i = 0; i < industries.length; i++) {
        var wordInText = industries[i];
        var wordInTextUpper = wordInText.toUpperCase();
        if (wordInTextUpper.includes(userInputUpper)) {
            closeMatches.push(wordInText);
        }

    }

    return closeMatches



}