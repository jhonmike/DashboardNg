'use strict';

angular.module('usLayout').controller('MainController', MainController);

MainController.$inject = [
	'$scope',
	'$state',
	'$localStorage',
	'$window',		
	'Menu',
	'Widget'
];

function MainController($scope, $state, $localStorage, $window, Menu, Widget) 
{
	// TODO
	this.auth = $localStorage.user;
	if (this.auth) {
		$state.go('usAdmin.dashboard');
	} else {
		$state.go('us.signin');
	}
	
	$scope.app = USConfig.layout;
	if ( angular.isDefined($localStorage.settings) ) {
		$scope.app.settings = $localStorage.settings;
	} else {
		$localStorage.settings = $scope.app.settings;
	}
	$scope.$watch('app.settings', function(){
		if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
			$scope.app.settings.headerFixed = true;
		}
		$localStorage.settings = $scope.app.settings;
	}, true);
	
	$scope.activeSetting = false;
	$scope.tabSetting = function(){
		if (!$scope.activeSetting)
			$scope.activeSetting = true;
		else
			$scope.activeSetting = false;
	}
};