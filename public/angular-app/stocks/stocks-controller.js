angular.module('min-nasdaq').controller('StocksController', StocksController);

function StocksController($route, $routeParams, $timeout, DataService){
    var vm = this;
    vm.title = 'MEAN NASDAQ';

    vm.stocks = null

    // initial data
    DataService.stockList().then(function(response){
        vm.stocks = response.data;
    });
    var inputPromise = null;
    
    vm.inputChange = function(){
        var searchStr = angular.element('#SearchBoxSym').val();
        var searchResult = null;

        // kill the last promise that was made
        // this is to avoid making get 
        // requests if the promise was
        // made in less than X milliseconds
        $timeout.cancel(inputPromise);
        
        inputPromise = $timeout(function(){
            // log input after time has passed
            
        if (searchStr.length > 1){
            
            DataService.stockSearchBySym(searchStr).then(function(response){
                vm.stocks = response.data;
                searchResult = response.data;
                
            }).catch(function(err){
                console.log('stock not found');
            });
            
        }else{
            DataService.stockList().then(function(response){
                vm.stocks = response.data;
            });
            
        }
        addSearchesToPage();
        }, 300);
        
        
        

    };
    $timeout.cancel(inputPromise);
    
    var addSearchesToPage = function(){
        
        DataService.searchAnalytics().then(function(response){
            vm.searchAnalytics = response.data;
        });
    }
    
    // on inital load, populate search history array
    addSearchesToPage()
        
    
    
}