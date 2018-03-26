// In this file we make requests to our api
// this is the link to the db (backend)
angular.module('min-nasdaq').factory('DataService', DataService);


function DataService($http, AuthFactory, UserDataService){
    
    return { 
        stockList: stockList,
        stockInfo: stockInfo,
        stockSearchByKey: stockSearchByKey,
        createSearch: createSearch,
        getSearch: getSearch
    };
    
    function stockList(){
        return $http.get('/api/stocks/').then(complete).catch(failed);
    }
    
    function stockInfo(_id){
        return $http.get('/api/stocks/'+ _id).then(complete).catch(failed);
    }
    
    function stockSearchByKey(key, symbolStr){
        return $http.get(
            '/api/stocks?' + key + '=' + symbolStr.toUpperCase())
            .then(complete)
            .catch(failed);
    }
    
    function getSearch(){
        return $http.get('api/siteanalytics')
        .then(complete)
        .catch(failed);
    }
    
    function createSearch(searchString){
        var data = JSON.stringify({
            Symbol: searchString,
        });
        return $http.post('api/siteanalytics', data)
        .then(function(response){
            if (response.data.message == 'success' && AuthFactory.isLoggedIn){

                UserDataService.saveUserSearch(searchString)
                .then(complete).catch(failed);
            }
        }).catch(failed)
        
    }
    
    function complete(response){
        return response;
    }
    
    function failed(error){
        console.log(error.statusText);
    }
    
    
    
}