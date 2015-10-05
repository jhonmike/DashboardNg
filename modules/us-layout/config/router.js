'use strict';

angular.module('usLayout').config(['$urlRouterProvider', '$stateProvider',
	function($urlRouterProvider, $stateProvider) {
		
		/* router default */
		// $urlRouterProvider.when('/', '/us-admin'); /* caso remova o module us-site(area sem autenticação) no seu projeto descomentar a linha */
		$urlRouterProvider.when('/us-admin', '/us-admin/dashboard');
		
		/*  ui routers */
		$stateProvider.
		state('us', {
			abstract: true,
			templateUrl: 'modules/us-layout/components/site/layout.html'
		}).
		state('usAdmin', {
			abstract: true,
			url: '/us-admin',
			templateUrl: 'modules/us-layout/components/admin/layout.html'
		});
	}
]);