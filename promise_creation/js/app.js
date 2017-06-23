var app = angular.module('myapp', []);

app.controller('Xctrl', function ($scope, $q, $http) {

    var square = function (a) {
        setTimeout(function () {
            var finalValue = a * a;
            console.log('calculated ' + a * a);
            return finalValue;
        }, 3000);
    }

    var promisedSquare = function (a) {
        return $q(function (res, reject) {
            if (a < 0) reject('negative numbers not allowed');
            else {
                setTimeout(function () {
                    var finalValue = a * a;
                    console.log('calculated ' + a * a);
                    return res({
                        value: finalValue
                    });
                }, 3000);
            }
        });
    }
    /*
    $scope.calc=function(){
    	$scope.result=square($scope.num);
    	console.log(square($scope.num));
    }*/


    $scope.calc = function () {
        console.log('calc called');
        promisedSquare($scope.num).then(function (response) {
            console.log(response);
            $scope.result = response.value;
        }, function (response) {
            console.log(response);
        });

    }

    $scope.convert = function () {
        $http({
            url: 'http://api.fixer.io/latest',
            params: {
                'base': 'USD'
            },
            timeout: 5000,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            $scope.inrvalue = $scope.usd * response.data.rates.INR;
        }, function (response) {
            console.log(response);
        })
    }

    /*$scope.refresh=function(){
    	$http({
    		url:''
    	}).then(function(response){
    		$scope.registrations=response.data.data;
    	},function(resposne){
    		
    	},function(response){
    		console.log(response);
    	});
    }
    $scope.refresh();*/


    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://zenways-contact.herokuapp.com/api/contacts',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $scope.registrations = response.data.contacts;
            //console.log(response.data.contacts);
        }, function (response) {
            console.log("Failure response :" + response);
        });
    }
    $scope.refresh();



    $scope.saveData = function () {
        //console.log($scope.user);
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
    }
    
        $scope.deleteData = function () {
        //console.log($scope.user);
        $http({
            url: 'https://zenways-contact.herokuapp.com/api/contact/',
            method: 'DELETE',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            },
            data: $scope.user._id
        }).then(function (response) {
            console.log(response);
            $scope.refresh();
        }, function (resposne) {
            console.log("Save Failed" + response);
        })
    }
});
