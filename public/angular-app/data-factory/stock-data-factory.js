// In this file we make requests to our api
// this is the link to the db (backend)
angular.module('min-nasdaq').factory('DataService', DataService);


function DataService($http){
    
    return { 
        stockList: stockList,
        stockInfo: stockInfo,
        stockSearchBySym: stockSearchBySym,
        createSearch: createSearch,
        getSearch: getSearch
    };
    
    function stockList(){
        return $http.get('/api/stocks/').then(complete).catch(failed);
    }
    
    function stockInfo(_id){
        return $http.get('/api/stocks/'+ _id).then(complete).catch(failed);
    }
    
    function stockSearchBySym(symbolStr, count){
        return $http.get(
            '/api/stocks?Symbol=' + symbolStr.toUpperCase())
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
        .then(complete, failed)
        
    }
    
    function complete(response){
        return response;
    }
    
    function failed(error){
        console.log(error.statusText);
    }
    
    
    
}