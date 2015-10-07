'use strict';

angular.module('usLayout').controller('MainController', MainController);

MainController.$inject = [
	'$scope',
	'$state',
	'Menu',
	'Widget'
];

function MainController($scope, $state, Menu, Widget) 
{
	this.loader = true;
	this.auth = false;
	if (this.auth) {
		$state.go('usAdmin.dashboard');
		this.loader = false;
	} else {
		$state.go('us.signin');		
		this.loader = false;
	}
	console.log('MainController');
};