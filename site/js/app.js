
//
(function(){
	var app = angular.module('userOrgs', []);
	app.controller('userOrgController', function($scope, $http){
	
		$http.get("/userOrgs")
    		.then(function(response) {
                if(response.data.success){
          		    $scope.orgs = response.data.userOrgs;
                }
                else{
                    $window.location.href = response.data.redirect;
                    return false;
                }
        	});
        
	});

	app.controller('userProfileController', function($scope, $http, $window){
		
		$http.get("/userInfo")
    		.then(function(response) {
                if(response.data.success){
        			console.log(response.data.user);
              		$scope.user = response.data.user;
                }
                else{
                    $window.location.href = response.data.redirect;
                    return false;
                }
        	});

        this.signOut = function(){
        	$http.get("/logout")
        }
	});


})();
