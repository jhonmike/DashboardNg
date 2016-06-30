angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource)
{
	return $resource(USConfig.serverUrl + '/user.json/:id', {
		id: '@id'
	}, {
		save: {method: 'POST'},
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query: {method:'GET', isArray:true}
	});
}
