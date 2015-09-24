'use strict';

angular.module('usUser').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('us.userList', {
			url: '/user/list',
			templateUrl: 'modules/us-user/views/list.html'
		}).
		state('us.userRegister', {
			url: '/user/register/:id',
			templateUrl: 'modules/us-user/views/register.html'
		});
	}
]);