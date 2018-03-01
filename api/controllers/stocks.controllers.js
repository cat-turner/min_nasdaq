var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');


module.exports.getAllStocks= function(req, res) {

  Stock
    .find()
    .exec(function(err, stocks) {
      if (err){
        console.log("error finding stock");
        res
        .status(500)
        .json(err);
        
      }else{
        console.log("Found stocks", stocks.length);
        res
          .json(stocks);
      }

    });

};


module.exports.hotelsGetOne = function(req, res) {

  var hotelId = req.params.hotelId;
  console.log('GET hotelId', hotelId);

  // find one returns the first one
  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      
      // use an object to hold your responses
      var response = {
          status: 200,
          message: doc
        };
      
      if (err){
        console.log("hotel not found");
      res
        .status(500)
        .json(doc);  
      
      }else if(!doc){
        //if no doc
        res
          .status(404)
          .json({
            "message": "hotel not found"
          });
          return;
        
        
      }else{
        res
          .status(200)
          .json(doc);
        
      }
      
      

  });

};
