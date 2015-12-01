angular.module(USConfig.applicationModuleName).factory('Event', Event);

Event.$inject = ['$resource'];

function Event($resource) {
	return $resource(USConfig.serverUrl + '/events/:id', {
		id: '@id'
	}, {
		update: {method: 'PUT'},
		get: {method: 'GET'},
		remove: {method:'DELETE'},
		query: {method:'GET', isArray:true}
	});
};
