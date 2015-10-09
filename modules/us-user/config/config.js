'use strict';

angular.module('usUser').run(['Menu', 'Widget',
	function(Menu, Widget) {
		Menu.addMenuItem('navbar', {
			itemKey : 'user',
			title : 'Usuários',
			link : 'usAdmin.userList',
			icon : 'glyphicon glyphicon-user icon',
			position : '2',
		});
	}
]);