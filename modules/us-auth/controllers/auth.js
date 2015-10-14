'use strict';

angular.module('usAuth').controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = [
	'$scope', 
	'$http', 
	'$state', 
	'$localStorage'
];

function AuthenticationController($scope, $http, $state, $localStorage) {
	$scope.user = {};
	$scope.signin = function() {
		// this.sending = true;
		// this.alerts = [];
		// $http.post(USConfig.serverUrl + '/auth', this.user)
		// .success(function(response) {
		// 	$localStorage.user = response;
		// 	$state.go('usAdmin.dashboard');
		// }).error(function(response) {
		// 	this.sending = false;
		// 	this.alerts.push({type:'danger', msg:response.error});
		// });
		// provisorio
		$localStorage.user = $scope.user;
		$state.go('usAdmin.dashboard');
	};

	// this.signup = function() {
	// 	$http.post(USConfig.serverUrl + '/auth/0', $localStorage.user)
	// .success(function(response) {
	// 		delete $localStorage.user;
	// 		$location.path('/');
	// 	}).error(function(response) {
	// 		this.alerts.push({type:'danger', msg:response.error});
	// 	});
	// };
};
