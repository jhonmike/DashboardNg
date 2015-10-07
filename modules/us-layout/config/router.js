'use strict';

angular.module('usLayout').config(configLayout);

configLayout.$inject = ['$urlRouterProvider', '$stateProvider'];

function configLayout($urlRouterProvider, $stateProvider)
{
	/* router default */
	// $urlRouterProvider.when('/', '/us-admin'); /* caso remova o module us-site(area sem autenticação) no seu projeto descomentar a linha */
	$urlRouterProvider.when('/us-admin', '/us-admin/dashboard');
	
	/*  ui routers */
	$stateProvider
	.state('us', {
		abstract: true,
		templateUrl: 'modules/us-layout/views/layout-site.html'
	})
	.state('usAdmin', {
		abstract: true,
		url: '/us-admin',
		templateUrl: 'modules/us-layout/views/layout-admin.html'
	})
	.state('usAdmin.dashboard', {
		url: '/dashboard',
		templateUrl: 'modules/us-layout/views/dashboard.html'
	});
};