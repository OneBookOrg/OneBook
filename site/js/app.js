
//
(function(){
	var app = angular.module('userOrgs', []);
	app.controller('userOrgController', function($scope, $http){
	
		$http.get("/userOrgs")
    		.then(function(response) {
          		$scope.orgs = response.data.userOrgs;
        	});
        
	});

	app.controller('userProfileController', function($scope, $http){
		
		$http.get("/userInfo")
    		.then(function(response) {
    			console.log(response.data.user);
          		$scope.user = response.data.user;
        	});
	});


})();
