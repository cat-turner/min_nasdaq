angular.module('min-nasdaq').controller('RegisterController', RegisterController);

function RegisterController($http, AuthServices) {
  var vm = this;

  vm.register = function() {
    var user = {
      username: vm.username,
      password: vm.password,
      name: vm.name
    };

    if (!vm.username || !vm.password || !vm.name) {
      vm.error = 'Please add a username,password, and a name.';
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.';
      } else {
        AuthServices.registerUser(vm.username,vm.password,vm.name).then(function(result) {
          console.log(result);
          vm.message = 'Successful registration, please login.';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
};