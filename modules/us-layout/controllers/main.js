'use strict';

angular.module('usLayout').controller('MainController', MainController);

MainController.$inject = [
	'$scope',
	'$state',
	'$localStorage',
	'Menu',
	'Widget'
];

function MainController($scope, $state, $localStorage, Menu, Widget) 
{
	this.loader = true;
	// TODO
	this.auth = $localStorage.user;
	if (this.auth) {
		$state.go('usAdmin.dashboard');
		this.loader = false;
	} else {
		$state.go('us.signin');		
		this.loader = false;
	}
	console.log('MainController');
};