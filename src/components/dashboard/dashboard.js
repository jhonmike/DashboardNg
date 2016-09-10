'use strict';

angular.module(USConfig.applicationModuleName)
	.config(DashboardConfig)
	.controller('DashboardController', DashboardController)
	.run(DashboardMenu)
	.run(DashboardWidgets);

function DashboardConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.dashboard', {
		url: '/dashboard',
		templateUrl: 'dashboard/dashboard.html',
		controller: DashboardController,
		controllerAs: 'vm'
	});
}

function DashboardController(Widget)
{
	var vm = this;
	vm.widgets = Widget.getDashboard('dashboard');
}

function DashboardMenu(Menu)
{
	Menu.addMenuItem('topbar', {
		itemKey : 'register',
		title : 'Cadastros',
		link : 'usAdmin',
		position : '1'
	});				
	Menu.addMenuItem('navbar', {
		itemKey : 'dashboard',
		title : 'Dashboard',
		link : 'usAdmin.dashboard',
		icon : 'glyphicon glyphicon-stats icon',
		position : '1'
	});
}

function DashboardWidgets(Widget)
{
	Widget.addDashboardItem('dashboard', {
		template : `<div class="panel panel-default">
			<div class="panel-heading">
				<span class="text-lt">Widget 01</span>
			</div>
			<div class="hbox text-center text-sm">
				<h1> Exemplo de widget com template
			</div>
		</div>`,
		class : 'col-md-4 widget', 
		position : '1'
	});
}