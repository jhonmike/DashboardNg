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
	$scope.auth = $localStorage.user;
	if ($scope.auth) {
		$state.go('usAdmin.dashboard');
	} else {
		$state.go('us.signin');
	}
	
	// Menus
	$scope.topbar = Menu.getMenu('topbar');
	$scope.navbar = Menu.getMenu('navbar');
	$scope.$state = $state;
	
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
	$scope.tabSetting = function() {
		$scope.activeSetting = (!$scope.activeSetting) ? true : false;
	}
};