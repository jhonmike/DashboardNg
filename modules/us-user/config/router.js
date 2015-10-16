'use strict';

angular.module('usUser').config(configUser);

configUser.$inject = ['$urlRouterProvider', '$stateProvider'];

function configUser($urlRouterProvider, $stateProvider)
{
	/*  ui routers */
	$stateProvider
	.state('usAdmin.userList', {
		url: '/user/list',
		templateUrl: 'modules/us-user/views/list.html',
		controller: UserController
	})
	.state('usAdmin.userRegister', {
		url: '/user/register',
		templateUrl: 'modules/us-user/views/register.html',
		controller: UserController
	});
};
