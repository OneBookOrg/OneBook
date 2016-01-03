
//
(function(){
	var app = angular.module('userOrgs', []);
	app.controller('userOrgController', function($scope, $http){
	
		$http.get("/userOrgs")
    		.then(function(response) {
          		$scope.orgs = response.data.userOrgs;
        	});
        
	});
})();
