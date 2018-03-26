angular.module('min-nasdaq').controller('LoginController', LoginController);

function LoginController($window,$scope, $location, AuthServices, AuthFactory){
    var vm = this;
    
    // initializing form value
    $scope.hideform = false;
    if (AuthFactory.isLoggedIn){
      $scope.hideform = true;
    }

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };

    vm.login = function() {
    if (!vm.username || !vm.password) {
      vm.error = 'Please add a username and a password.';
    } else {
        AuthServices.verifyUser(vm.username, vm.password).then(function(result) {
          console.log(result);
          vm.message = 'You are logged in!';
          vm.error = '';
          $scope.hideform = true;

        }).catch(function(error) {
          console.log(error);
        });
      }
    }
    
    vm.logout = function(){

        AuthFactory.isLoggedIn = false;
        AuthFactory.loggedInUser = '';
        delete $window.sessionStorage.token;
        console.log('you are logged out.');
        $location.path('/');
        
      }


}