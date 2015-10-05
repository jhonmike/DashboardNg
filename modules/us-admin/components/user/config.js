angular.module('usAdmin').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('usAdmin.userList', {
			url: '/user/list',
			templateUrl: 'modules/us-admin/components/user/list.html'
		}).
		state('usAdmin.userRegister', {
			url: '/user/register/:id',
			templateUrl: 'modules/us-admin/components/user/register.html'
		});
	}
	
]);