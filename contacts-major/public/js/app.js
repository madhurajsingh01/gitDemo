var app = angular.module('myapp', ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/registration', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/contacts', {
        templateUrl: 'views/showContacts.html',
        controller: 'contacts'
    }).when('/contacts/:contact', {
        templateUrl: 'views/showContactDetails.html',
        controller: 'contactDetails'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});


app.run(function ($rootScope) {
    $rootScope.contacts = [{
            'name': 'Madhuraj',
            'mobile': '9990097361',
            'email': 'raj@gmail.com',
            'address': 'Pocket B Saket, New Delhi'
                },
        {
            'name': 'Amit',
            'mobile': '9990345362',
            'email': 'amit@gmail.com',
            'address': 'Pink City Jaipur'
                },
            ]

})
app.controller('register', function ($rootScope, $location, $scope, $q, $http) {
    $scope.addNew = function () {
       
        $http({
            url: 'https://zenways-contact.herokuapp.com/api/contact',
            method: 'POST',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            },
            data: $scope.user
        }).then(function (response) {
            console.log(response);
            $scope.refresh();
        }, function (resposne) {
            console.log("Save Failed" + response);
        })
        
        
        $rootScope.contacts.push(angular.copy($scope.contact));
        $location.path('/contacts');
    }
});

app.controller('contacts', function ($scope, $location, $q, $http) {


    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://zenways-contact.herokuapp.com/api/contacts',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $scope.state = 1;
            $scope.registrations = response.data.contacts;
        }, function (response) {
            console.log("Failure response :" + response);
        });
    }
    $scope.refresh();

    /*Remove a row*/
    $scope.removeRow = function ($index, name) {
        $scope.contacts.splice($index, 1);
    }

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
