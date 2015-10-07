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
	})
	
	.state('usAdmin.userList', {
		url: '/user/list',
		templateUrl: 'modules/us-auth/views/user/list.html',
		controller: UserController
	})
	.state('usAdmin.userRegister', {
		url: '/user/register/:id',
		templateUrl: 'modules/us-auth/views/user/register.html',
		controller: UserController
	});
};