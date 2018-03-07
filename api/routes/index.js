var express = require('express');
var router = express.Router();

// controllers

var ctrlStocks = require('../controllers/stocks.controllers.js');
var ctrlAnalytics = require('../controllers/analytics.controllers.js');

// routes

router
    .route('/stocks')
    .get(ctrlStocks.getAllStocks);
    
router
    .route('/stocks/:stockId')
    .get(ctrlStocks.getStockById);
    
router
    .route('/stocks')

router
    .route('/siteanalytics')
    .get(ctrlAnalytics.getSearchHistory)
    .post(ctrlAnalytics.createSearch);
    
router
    .route('/siteanalytics/calculate')
    .get(ctrlAnalytics.getCalculatedValue)

module.exports = router;