angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource)
{
	return $resource(USConfig.serverUrl + '/user.json/:id', {
		id: '@id'
	}, {
		'query':  {method:'GET', isArray:true},
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'update': {method:'PUT'},
		'delete': {method:'DELETE'}
	});
}
