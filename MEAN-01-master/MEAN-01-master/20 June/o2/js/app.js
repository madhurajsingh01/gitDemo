var app=angular.module('myapp',[]);

app.controller('Xctrl',function($scope,$q,$http){
	var promisedFunction=function(a){
		var q=$q.defer();
		
		setTimeout(function(){
			var square=a*a;
			q.notify({msg:'Square calculated',done:33});
			setTimeout(function(){
				var cube=square*square*square;
				q.notify({msg:'Cube calculated',done:66});
				setTimeout(function(){
					var finalResult=cube+5;
					q.notify({msg:'Final calculated',done:100});
					q.resolve(finalResult);
				},3000);
			},3000);
			
		},3000);
		
		return q.promise;
	}
	$scope.progress=0;
	$scope.calc=function(){
		$scope.progress=0;
		promisedFunction($scope.num).then(function(response){
			console.log(response);
		},function(response){
			console.log(response);
		},function(status){
			console.log(status);
			$scope.progress=status.done;
		});
	}
});