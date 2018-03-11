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
// add authentication

//WANTS
//clean up - at the end
// determine if items are being posted multiple times
// refactor stock search + stock all
// figure out why search by Name isn't as responsive. Is query taking
//too long?
// refactor - put repeat methods like jsonResponse somehwere. Maybe a lib
