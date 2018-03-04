// call angular module, and call the  the dependancy ngRoute
angular.module('min-nasdaq', ['ngRoute']).config(config);

function config($routeProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/stocks/stocks.html',
      controller: StocksController,
      controllerAs: 'vm'
    })
    .when('/stocks/:id', {
      templateUrl: 'angular-app/stocks-info/info.html',
      controller: StockInfoController,
      controllerAs: 'vm'
    });
  
}

// TODO - 
// Show history of queries in segment of page
// non logged in feature - search by industry
// non logged in feature - search by name

//clean up
// refactor stock search + stock all