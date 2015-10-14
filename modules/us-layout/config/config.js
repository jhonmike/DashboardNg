'use strict';

angular.module('usLayout').run(['Menu', 'Widget',
	function(Menu, Widget) {
		Widget.addDashboardItem('dashboard', {
            templateUrl : 'modules/us-layout/views/widget/exemplo01.html',
            class : 'col-md-4 widget', 
        	position : '1',
    	});
		
		Menu.addMenuItem('navbar', {
			itemKey : 'dashboard',
			title : 'Dashboard',
			link : 'usAdmin.dashboard',
			icon : 'glyphicon glyphicon-stats icon',
			position : '1',
		});
	}
]);