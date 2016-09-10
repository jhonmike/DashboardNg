"use strict";

angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource, filterFilter)
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

    // mocks
    resource.query = find;
    resource.get = findOne;

    function find(data) {
        return filterFilter(mockUsers(), data);
    }

    function findOne(data) {
        return filterFilter(mockUsers(), {'id': data.id})[0];
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
            "email": "test1@jhonmike.com.br",
            "active": true
        },
        {
            "id": 2,
            "username": "test2",
            "password": "123456",
            "name": "Maka",
            "email": "test2@jhonmike.com.br",
            "active": true
        },
        {
            "id": 3,
            "username": "test3",
            "password": "123456",
            "name": "Maka",
            "email": "test3@jhonmike.com.br",
            "active": true
        }
    ];
}
