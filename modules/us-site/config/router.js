'use strict';

angular.module('usSite').config(['$urlRouterProvider', '$stateProvider',
	function($urlRouterProvider, $stateProvider) {		
		/*  ui routers */
		$stateProvider.
		state('usSite', {
			abstract: true,
			templateUrl: 'modules/us-site/view/layout-front.html'
		}).	
		state('usSite.home', {
			url: '/',
			templateUrl: 'modules/us-site/view/theme-home.html'
		}).
		state('usSite.about', {
			url: '/about',
			templateUrl: 'modules/us-site/view/theme-about.html'
		}).
		state('usSite.contact', {
			url: '/contact',
			templateUrl: 'modules/us-site/view/theme-contact.html'
		});
	}
]);