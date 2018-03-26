angular.module('min-nasdaq').factory('AuthFactory', AuthFactory);

function AuthFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: false,
    loggedInUser: ''
  };
}