'use strict';

angular.module(USConfig.applicationModuleName)
	.config(LayoutConfig)
	.controller('LayoutController', LayoutController);

LayoutConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
LayoutController.$inject = [
	'$scope',
	'$state',
	'$localStorage',
	'Menu'
];

function LayoutConfig($stateProvider, $urlRouterProvider)
{
	$urlRouterProvider.otherwise("/login");
	
	$stateProvider
	// .state('us', {
	// 	abstract: true,
	// 	templateUrl: 'layout/site.html'
	// })
	.state('usAdmin', {
		abstract: true,
		url: '/us-admin',
		templateUrl: 'admin.html'
	});
};

function LayoutController($scope, $state, $localStorage, Menu)
{
	// Menus
	$scope.topbar = Menu.getMenu('topbar');
	$scope.navbar = Menu.getMenu('navbar');
	$scope.dropdownUser = Menu.getMenu('dropdownUser');
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
	$scope.activeAside = false;
	$scope.toggleAside = function() {
		$scope.activeAside = (!$scope.activeAside) ? true : false;
	}
	$scope.activeTopbar = false;
	$scope.toggleTopbar = function() {
		$scope.activeTopbar = (!$scope.activeTopbar) ? true : false;
	}
};
