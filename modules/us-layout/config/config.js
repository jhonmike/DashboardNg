'use strict';

angular.module('usLayout').run(['Menu', 'Widget',
	function(Menu, Widget) {
		Menu.addMenuItem('navbar', {
			itemKey : 'dashboard',
			title : 'Dashboard',
			link : 'usAdmin.dashboard',
			icon : 'glyphicon glyphicon-stats icon',
			position : '1',
		});
	}
]);