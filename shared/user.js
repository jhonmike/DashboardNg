angular.module(USConfig.applicationModuleName).factory('User', User);

User.$inject = ['$resource'];

function User($resource) {
	return $resource(USConfig.serverUrl + '/user/:id', {
		id: '@id'
	}, {
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query:  {method:'GET', isArray:true}
	});
};