'use strict';

angular.module(USConfig.applicationModuleName)
	.config(AppConfig)
	.controller('AppController', AppController);

AppConfig.$inject = ['$stateProvider'];
AppController.$inject = [
	'$scope',
	'$state',
	'$localStorage',
	'Menu'
];

function AppConfig($stateProvider)
{
	$stateProvider
	// .state('us', {
	// 	abstract: true,
	// 	templateUrl: 'layout/site.html'
	// })
	.state('usAdmin', {
		abstract: true,
		url: '/us-admin',
		templateUrl: 'layout/admin.html'
	});
};

function AppController($scope, $state, $localStorage, Menu)
{
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
