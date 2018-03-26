angular.module('min-nasdaq').controller('StocksController', StocksController);

function StocksController($route, $routeParams, $timeout, DataService){
    var vm = this;
    vm.title = 'MEAN NASDAQ';

    vm.stocks = null
    
    var addSearchHistoryToPage = function(){
        
        DataService.getSearch().then(function(response){
            vm.searchAnalytics = response.data;
        });
    }
    
    var addStocksToPage = function(){
    
        DataService.stockList().then(function(response){
            vm.stocks = response.data;
        });
        
    }


    var inputPromise = null;
    
    vm.inputChange = function(searchKey, id){

        var searchStr = angular.element(id).val();


        // kill the last promise that was made
        // this is to avoid making get 
        // requests if the promise was
        // made in less than X milliseconds
        $timeout.cancel(inputPromise);
        
        inputPromise = $timeout(function(){
            // log input after time has passed
            
        if (searchStr.length > 1){
            
            DataService.stockSearchByKey(searchKey, searchStr).then(function(response){
                
                vm.stocks = response.data;
                DataService.createSearch(searchStr);
                
            }).catch(function(err){
                console.log('stock not found');
            });
            

            
        }else{
            // when text is deleted, refill page
            addStocksToPage();
            addSearchHistoryToPage();
            
        }

        // update the search history
        
        }, 300);
    };

    $timeout.cancel(inputPromise);
    // on inital load, populate search history array
    addStocksToPage();
    addSearchHistoryToPage()
    
}