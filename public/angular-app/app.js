// call angular module, and call the  the dependancy ngRoute
angular.module('min-nasdaq', ['ngRoute', 'angular-jwt']).config(config).run(runAuth);

function config($httpProvider,$routeProvider) {
  // this is what allows us to add the jwt across all requests.
  $httpProvider.interceptors.push('AuthInterceptor');
  
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
      templateUrl: 'angular-app/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

  
}

function runAuth($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}

    // .when('/login', {
    //   templateUrl:'/angular-app/login/login.html',
    //   controller:LoginController,
    //   controllerAs:'vm'
    // })

// TODO - 
// log in form - front end
// i . add login page
// ii. add register page
// iii. check if works - should return jwt token, log that in console

// investigate how jsonwebtoken works... again.
// authentication - more back end
// i. auth. verifies web tokens passed in through request


//WANTS
//clean up - at the end
// determine if items are being posted multiple times
// refactor stock search + stock all
// figure out why search by Name isn't as responsive. Is query taking
//too long? Doesn't seem to work most of the times
// refactor - put repeat methods like jsonResponse somehwere. Maybe a lib
