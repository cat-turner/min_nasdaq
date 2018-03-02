// call angular module, and call the  the dependancy ngRoute
angular.module('min-nasdaq', ['ngRoute']).config(config);

function config($routeProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/templates/main.html',
      controller: StocksController,
      controllerAs: 'vm'
    })
    .when('/stocks/:id', {
      templateUrl: 'angular-app/templates/info.html',
      controller: StockInfoController,
      controllerAs: 'vm'
    });
  
}

// TODO - 
// make controllers
// see page with plain text
// populate with data, very simply