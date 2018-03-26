angular.module('min-nasdaq').controller('UserProfileController', UserProfileController);

function UserProfileController(UserDataService, AuthFactory){
    var vm = this;
    
    vm.isLoggedIn = AuthFactory.isLoggedIn;
    vm.message = '';

    if (AuthFactory.isLoggedIn){
        UserDataService.userInfo().then(function(response){
            var user = response.data;
            vm.userName = user.username;
            vm.name = user.name;
            
            vm.searchHistory = user.searchHistory;
            
            
        }).catch(function(error){
            console.log('Cannot get user info');
            console.log(error);
        });
    }else{
        vm.message = 'Login to view profile. Register if you don\'t have an account.';
        vm.name = 'Stranger';
        
        
    }
}