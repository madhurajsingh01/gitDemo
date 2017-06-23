var app=angular.module('myapp',['ngMessages']);


app.controller('MyFormController',function($scope){
	$scope.btn=function(){
		console.log('Button was clicked');
	}
	$scope.submitForm=function(){
		console.log('Form was submittted');
		console.log($scope.student);
	}
});