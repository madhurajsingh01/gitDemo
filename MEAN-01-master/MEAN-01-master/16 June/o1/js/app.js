var app=angular.module('myapp',[]);


app.run(function($rootScope){
	$rootScope.x=100;
	console.log('Run Function');
});

app.controller('BController',function($scope,$rootScope){
	console.log('controller B');
	$scope.y=7;
	//$scope.x=500;
	
	
	$scope.setVar=function(){
		console.log("I was called");
		$rootScope.x=700;
	};
	
	
	
	$scope.arr=[4,9,6,8,5,1];
	
	
	$scope.students=[
		{name:'Pqr',roll:4},
		{name:'Xyz',roll:1},
		{name:'Mno',roll:5},
		{name:'abc',roll:7},
		{name:'rst',roll:3},
		{name:'Efg',roll:2},
	];
	
	
	
	$scope.obj={
		a:1,
		b:"Hello",
		c:true,
		d:"DHsjdgh"
	}
});


app.controller('AController',function($scope){
	console.log('controller A');
	$scope.y=9;
});

app.run(function($rootScope){
	console.log('Run Function 2');
});