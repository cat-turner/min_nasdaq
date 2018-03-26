angular.module('min-nasdaq').factory('UserDataService', UserDataService);


function UserDataService($http, AuthFactory){
    
    return {
        userInfo:userInfo,
        saveUserSearch:saveUserSearch
    }

    function userInfo(){
        return $http.get('/api/profile').then(complete).catch(failed);
    }
    
    function saveUserSearch(searchString){
        var data = JSON.stringify({
            name:searchString
        });
        return $http.post('/api/siteanalytics/user', data)
        .then(complete).catch(failed);
    }

    function complete(response){
        return response;
    }
    
    function failed(error){
        return error;
        
    }
}