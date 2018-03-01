var mongoose = require('mongoose');
// removing that last coumn
//db.stocks.update({}, {$unset: {"":1}} , {multi: true});

var stockSchema = new mongoose.Schema({
Symbol: String,
Name:String,
LastSale:Number,
MarketCap:Number,
"ADR TSO": String,
IPOyear: Schema.Types.Mixed,
Sector:String,
Industry: String,
"Summary Quote":String
})


mongoose.model('Stock', stockSchema);

//1- fix shema
//2-double check all items being called
//3 do get request to test if stock data is
//being grabbed in the db