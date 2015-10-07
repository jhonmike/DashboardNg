'use strict';

angular.module('usSite').config(configSite);

configSite.$inject = ['$urlRouterProvider', '$stateProvider'];

function configSite($urlRouterProvider, $stateProvider)
{	
	/*  ui routers */
	$stateProvider
	.state('us.home', {
		url: '/',
		templateUrl: 'modules/us-site/components/home/home.html',
		controller: HomeController
	})
	.state('us.about', {
		url: '/about',
		templateUrl: 'modules/us-site/components/about/about.html'
	})
	.state('us.contact', {
		url: '/contact',
		templateUrl: 'modules/us-site/components/contact/contact.html',
		controller: ContactController
	});
};