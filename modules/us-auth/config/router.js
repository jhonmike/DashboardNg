'use strict';

angular.module('usAuth').config(configAuth);

configAuth.$inject = ['$urlRouterProvider', '$stateProvider'];

function configAuth($urlRouterProvider, $stateProvider)
{
	/*  ui routers */
	$stateProvider
	.state('access', {
		url: '/access',
		abstract: true,
		template: '<ui-view></ui-view>'
	})
	.state('access.signin', {
		url: '/signin',
		templateUrl: 'modules/us-auth/views/signin.html',
		controller: AuthenticationController
	});
};
