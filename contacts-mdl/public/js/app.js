var app = angular.module('myapp', ['ngRoute','ngMessages']);

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
    }).when('/contacts/:contact_id', {
        templateUrl: 'views/contactDetails.html',
        controller: 'contactDetails'
    }).otherwise({
        redirectTo: '/'
    });


    $locationProvider.html5Mode(true);
});

app.controller('contactDetails', function ($scope, $routeParams) {

    $scope.contact_id = $routeParams.contact_id;
})
app.run(function($rootScope) {
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
        })
app.controller('register', function ($rootScope, $location, $scope) {
        $scope.addNew = function (contacts) {
            $rootScope.contacts.push({
                'name': $scope.name,
                'mobile': $scope.mobile,
                'email': $scope.email,
                'address': $scope.address
            });
            $location.path('/contacts');
        }
});

app.controller('contacts', function ($scope) {
    
    
});


app.controller('contactDetails', function ($scope) {
    
    
});

