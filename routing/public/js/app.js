var app=angular.module('myapp',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        template:'<p>Hello welcome to angular JS App with routing</p>'
    }).when('/a',{
        template:'<p>This is another route</p>'
    }).when('/b',{
        templateUrl:'views/bview.html',
        controller:'BCtrl'
    }).when('/c',{
        templateUrl:'views/cview.html'
    }).when('/product/:product_id',{
        templateUrl:'views/product.html',
        controller:'ProductController'
    }).otherwise({redirectTo:'/'});
    
    
    $locationProvider.html5Mode(true);
});

app.controller('ProductController',function($scope,$routeParams){
    
    $scope.product_id=$routeParams.product_id;
})

app.controller('BCtrl',function($scope,$location){
    $scope.submitData=function(){
        $location.path('/c');
    }
});