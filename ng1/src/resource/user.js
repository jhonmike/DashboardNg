"use strict";

angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource, $q)
{
    var resource = $resource(USConfig.serverUrl + '/user/:id', {
		id: '@id'
	}, {
		'query':  {method:'GET', isArray:true},
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'update': {method:'PUT'},
		'delete': {method:'DELETE'}
	});

    resource.query = query;

    function query() {
        return mockUsers();
    }

    return resource;
}

function mockUsers()
{
    return [
        {
            "id": 1,
            "username": "test1",
            "password": "123456",
            "name": "Maka",
            "email": "test1@jhonmike.com.br"
        },
        {
            "id": 2,
            "username": "test2",
            "password": "123456",
            "name": "Maka",
            "email": "test2@jhonmike.com.br"
        },
        {
            "id": 3,
            "username": "test3",
            "password": "123456",
            "name": "Maka",
            "email": "test3@jhonmike.com.br"
        }
    ];
}
