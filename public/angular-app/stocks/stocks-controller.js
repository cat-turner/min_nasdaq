angular.module('min-nasdaq').controller('StocksController', StocksController);

function StocksController($route, $routeParams, DataService){
    var vm = this;
    vm.title = 'MEAN NASDAQ';
    DataService.stockList().then(function(response){
        vm.stocks = response.data;
    });
    
}