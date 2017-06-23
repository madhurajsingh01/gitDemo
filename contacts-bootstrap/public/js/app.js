var app = angular.module('myapp', ['ngRoute', 'ngMessages']);
app.value('myval', function (xyz) {
    return xyz * 1000
});

app.factory('MyMath', function ($rootScope, myval) {
    return {
        square: function (a) {
            return a * a;
        },
        sum: function (a, b) {
            return a + b;
        }
    }
});

app.service('MyMathService', function ($rootScope, myval) {

    this.square = function (a) {
        return a * a;
    };
    this.sum = function (a, b) {
        return a + b;
    }

});


app.constant('GMAP_KEY', 'cjsdckjsdjhcvsd')
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/registration', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'contacts'
    }).when('/contacts/:contact', {
        templateUrl: 'views/contactDetails.html',
        controller: 'contactDetails'
    }).otherwise({
        redirectTo: '/'
    });


    $locationProvider.html5Mode(true);
});


app.run(function ($rootScope, myval, GMAP_KEY) {
    $rootScope.contacts = [{
            'name': 'Madhuraj',
            'mobile': '9990097361',
            'email': 'raj@gmail.com',
            'address': 'abc Delhi'
                },
        {
            'name': 'Amit',
            'mobile': '9990345362',
            'email': 'amit@gmail.com',
            'address': 'Du Jaipur'
                },
            ]

    console.log(myval(100));
    console.log(GMAP_KEY)
})
app.controller('register', function ($rootScope, $location, $scope, MyMath,MyMathService) {
    $scope.addNew = function (contacts) {
        $rootScope.contacts.push(angular.copy($scope.contact));
        $location.path('/contacts');
    }
    
    
    
    
    console.log(MyMath.square(100));
    console.log(MyMathService.square(9));
});

app.controller('contacts', function ($scope, $location, MyMath) {
    /*Remove a row*/
    $scope.removeRow = function ($index, name) {
        $scope.contacts.splice($index, 1);
    }
    
    
    
    console.log(MyMath.sum(100, 200))
    /*Filling the values to Edited Row input boxes*/
    $scope.editRow = function (contact, $index) {
        $scope.name = contact.name;
        $scope.mobile = contact.mobile;
        $scope.email = contact.email;
        $scope.address = contact.address;
        $scope.selectedIndex = $index;
        $scope.state = 2;
    }

    /*Updating a object in array*/
    $scope.updateRow = function (index, selected) {
        $scope.contacts[index] = {
            'name': selected.Name,
            'mobile': selected.Mobile,
            'email': selected.Email,
            'address': selected.Address
        };
        $scope.state = 1;
    }

    $scope.details = function (contact) {
        $location.path('/contacts/contact.name');
    }

});

app.controller('contactDetails', function ($scope, $rootScope, $routeParams) {
    $scope.contact = $rootScope.contacts.filter(function (element) {
        return element.name == $routeParams.contact;
    })[0];
})


app.directive('myDirective',function(){
    return {
        restrict:'E',
        replace:true,
        templateUrl:'directives/mydirective.html',
        scope:{
            contact:'='
        },
        controller:function($scope){
            $scope.myclick=function(){
                alert($scope.contact.name)
            }
        }
    }
});