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
    })
    .when('/login', {
      templateUrl:'/angular-app/login/login.html',
      controller:LoginController,
      controllerAs:'vm'
    })
  
}

// TODO - 
// add authentication
// i. add html code to form
// ii.try out form. Should be able to submit data
// iii. change user login to post method, and test route

//WANTS
//clean up - at the end
// determine if items are being posted multiple times
// refactor stock search + stock all
// figure out why search by Name isn't as responsive. Is query taking
//too long?
// refactor - put repeat methods like jsonResponse somehwere. Maybe a lib
