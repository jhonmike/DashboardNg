'use strict';

angular.module('usUser').run(['Menu', 'Widget',
	function(Menu, Widget) {
		Widget.addDashboardItem('dashboard', {
			template : '<div class="panel panel-default"> '+
			'	<div class="panel-heading"> '+
			'		<span class="text-lt">Widget User</span> '+
			'	</div> '+
			'	<div class="hbox text-center text-sm"> '+
			'		<h1> Exemplo de widget em outro modulo '+
			'	</div> '+
			'</div>',
            class : 'col-md-4 widget', 
        	position : '2',
    	});
		
		Menu.addMenuItem('navbar', {
			itemKey : 'user',
			title : 'Usuários',
			link : 'usAdmin.userList',
			icon : 'glyphicon glyphicon-user icon',
			position : '2',
		});
	}
]);