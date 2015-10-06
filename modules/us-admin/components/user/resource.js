angular.module('usAdmin').factory('User', ['$resource',
	function($resource) {
		return $resource(USConfig.serverUrl + '/user/:id', {
			id: '@id'
		}, {
			update: {method: 'PUT'},
			get: {method: 'GET'},
			remove: {method:'DELETE'},
			query:  {method:'GET', isArray:true}
		});
	}
]);