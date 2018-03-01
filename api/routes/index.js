var express = require('express');
var router = express.Router();

// controllers

var ctrlStocks = require('../controllers/stocks.controllers.js');

// routes

router
    .route('/stocks')
    .get(ctrlStocks.getAllStocks);

module.exports = router;