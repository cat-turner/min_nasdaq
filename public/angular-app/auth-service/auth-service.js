angular.module('min-nasdaq').factory('AuthServices', AuthServices);

function AuthServices($http){
    
    return {
        registerUser:registerUser,
        verifyUser:verifyUser
        
    };
    
    function verifyUser(userName, password){
            var data = JSON.stringify({
            username: userName,
            password: password
        });
        // TODO - need to change to post
        return $http.post('api/users', data)
        .then(complete, failed);
    }
    
    function registerUser(userName, password, name){
        
        var data = JSON.stringify({
            username: userName,
            password: password,
            name:name
        });
        
        return $http.post('api/users/', data)
        .then(complete,failed);
        
        
    }
    
    function complete(response){
        return response;
    }
    
    function failed(error){
        console.log(error.statusText);
    }
    
    
}