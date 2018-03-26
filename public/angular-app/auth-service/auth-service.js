angular.module('min-nasdaq').factory('AuthServices', AuthServices);

function AuthServices($http, $window, AuthFactory,jwtHelper){
    
    return {
        registerUser:registerUser,
        verifyUser:verifyUser
        
    };
    
    function verifyUser(userName, password){
            var data = JSON.stringify({
            username: userName,
            password: password
        });

        return $http.post('api/users/login', data)
        .then(function(response){
            
            if (response.data.success){
                console.log('token obtained');
                var token = response.data.token;
                $window.sessionStorage.token = token;
                var decodedToken = jwtHelper.decodeToken(token);
                AuthFactory.loggedInUser = decodedToken.username;
            }

            return response;
            
        
        }).catch(failed)
    }
    
    function registerUser(userName, password, name){
        
        var data = JSON.stringify({
            username: userName,
            password: password,
            name:name
        });
        
        return $http.post('api/users/register', data)
        .then(complete,failed);
        
        
    }
    
    function complete(response){
        return response;
    }
    
    function failed(error){
        console.log(error.statusText);
    }
    
    
}