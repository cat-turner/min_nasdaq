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
    .when('/profile',{
      templateUrl: 'angular-app/user-profile/user-profile.html',
      controller:UserProfileController,
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
