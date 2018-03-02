var mongoose = require('mongoose');

// removing that last coumn
//db.stocks.update({}, {$unset: {"":1}} , {multi: true});

var stockSchema = new mongoose.Schema({
    Symbol: String,
    Name:String,
    LastSale:Number,
    MarketCap:Number,
    "ADR TSO": String,
    IPOyear: "",
    Sector:String,
    Industry: String,
    "Summary Quote":String
})

var searchQuerySchema = new mongoose.Schema({
    Symbol: String,
    date: { type: Date, default: Date.now },
})


mongoose.model('Stock', stockSchema);
mongoose.model('StockSearch', searchQuerySchema);
