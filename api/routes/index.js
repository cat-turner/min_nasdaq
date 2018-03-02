var express = require('express');
var router = express.Router();
var querymen = require('querymen')

// controllers

var ctrlStocks = require('../controllers/stocks.controllers.js');

// routes

router
    .route('/stocks')
    .get(ctrlStocks.getAllStocks);
    
router
    .route('/stocks/:stockId')
    .get(ctrlStocks.getStockById);

module.exports = router;