'use strict';

angular.module(USConfig.applicationModuleName)
	.config(LayoutConfig)
	.controller('LayoutController', LayoutController);

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
}

function LayoutController($scope, $state, $localStorage, Menu)
{
    var vm = this;
	// Menus
    vm.topbar = Menu.getMenu('topbar');
    vm.navbar = Menu.getMenu('navbar');
    vm.dropdownUser = Menu.getMenu('dropdownUser');
    vm.$state = $state;
    vm.authentication = $localStorage.user;

    vm.app = USConfig.layout;
    if ( angular.isDefined($localStorage.settings) ) {
        vm.app.settings = $localStorage.settings;
    } else {
        $localStorage.settings = vm.app.settings;
    }
	$scope.$watch('app.settings', function(){
		if( vm.app.settings.asideDock  &&  vm.app.settings.asideFixed ){
            vm.app.settings.headerFixed = true;
		}
		$localStorage.settings = vm.app.settings;
	}, true);

    vm.activeSetting = false;
    vm.activeAside = false;
    vm.activeTopbar = false;
    vm.tabSetting = tabSetting;
    vm.toggleAside = toggleAside;
    vm.toggleTopbar = toggleTopbar;

	function tabSetting() {
        vm.activeSetting = (vm.activeSetting) ? false : true;
	}
	function toggleAside() {
        vm.activeAside = (vm.activeAside) ? false : true;
	}
	function toggleTopbar() {
        vm.activeTopbar = (vm.activeTopbar) ? false : true;
	}
}
