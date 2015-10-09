'use strict';

angular.module('usAuth').config(configAuth);

configAuth.$inject = ['$urlRouterProvider', '$stateProvider'];

function configAuth($urlRouterProvider, $stateProvider)
{	
	/*  ui routers */
	$stateProvider
	.state('us.signin', {
		url: '/signin',
		templateUrl: 'modules/us-auth/views/signin.html',
		controller: AuthenticationController
	});
};