angular.module('min-nasdaq').controller('StockInfoController', StockInfoController);

function StockInfoController($route, $routeParams, DataService){
    var vm = this;
    var id = $routeParams.id;
    
    DataService.stockInfo(id).then(function(response){
        vm.stock = response.data;
        
    }).catch(function(error){
        console.log('Cannot get stock info');
    });
}