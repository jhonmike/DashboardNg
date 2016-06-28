angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource)
{
	return $resource(USConfig.serverUrl + '/users/:id', {
		id: '@id'
	}, {
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query: {method:'GET', isArray:true}
	});
}
