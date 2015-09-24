'use strict';

angular.module('US').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.		
		state('us', {
			abstract: true,
			url: '/us-admin',
			template: '<ui-view></ui-view>'
		});
	}
]);