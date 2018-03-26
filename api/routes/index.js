var express = require('express');
var router = express.Router();

// controllers

var ctrlStocks = require('../controllers/stocks.controllers.js');
var ctrlAnalytics = require('../controllers/analytics.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

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
    .get(ctrlAnalytics.getSearch)
    .post(ctrlAnalytics.createSearch);

router
    .route('/siteanalytics/user')
    .post(ctrlUsers.authenticate, ctrlAnalytics.saveSearchUser)


// Authentication
router
    .route('/users/register')
    .post(ctrlUsers.userRegister);

router
    .route('/users/login')
    .post(ctrlUsers.userLogin);
 
router
    .route('/profile')
    .get(ctrlUsers.authenticate, ctrlUsers.profileInfo);


module.exports = router;