'use strict';

angular.module(USConfig.applicationModuleName)
	.config(AdminConfig)
	.controller('AdminContainer', AdminContainer);

function AdminConfig($stateProvider, $urlRouterProvider)
{
	$urlRouterProvider.otherwise("/login");
	
	$stateProvider
	.state('usAdmin', {
		abstract: true,
		url: '/us-admin',
		templateUrl: 'admin/admin.html',
        controller: AdminContainer,
        controllerAs: 'vm'
	});
}

function AdminContainer($scope, $state, $localStorage, Menu)
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
