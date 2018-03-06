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

// non logged in feature - search by industry -> add to gui
// non logged in feature - search by name

//clean up
// refactor stock search + stock all