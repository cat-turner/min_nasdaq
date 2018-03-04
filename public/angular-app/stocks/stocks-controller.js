angular.module('min-nasdaq').controller('StocksController', StocksController);

function StocksController($route, $routeParams, $timeout, DataService){
    var vm = this;
    vm.title = 'MEAN NASDAQ';
    vm.quantity = 10;
    DataService.stockList().then(function(response){
        vm.stocks = response.data;
    });
    var inputPromise = null;
    
    vm.inputChange = function(){
        // kill the last promise that was made
        // this is to avoid making get 
        // requests if the promise was
        // made in less than X milliseconds
        $timeout.cancel(inputPromise);
        
        inputPromise = $timeout(function(){
            // log input after time has passed
            var searchStr = angular.element('#SearchBoxSym').val();
            DataService.stockSearchBySym(searchStr);
            
        }, 800);

    };
    $timeout.cancel(inputPromise);
    
}