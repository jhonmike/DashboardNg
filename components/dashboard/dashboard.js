'use strict';

angular.module(USConfig.applicationModuleName)
	.config(DashboardConfig)
	.controller('DashboardController', DashboardController)
	.run(registerWidgets);

DashboardConfig.$inject = ['$stateProvider'];
DashboardController.$inject = [
	'$scope',
	'Widget'
];
registerWidgets.$inject = ['Widget'];

function DashboardConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.dashboard', {
		url: '/dashboard',
		templateUrl: 'components/dashboard/dashboard.html',
		controller: DashboardController
	});
};

function DashboardController($scope, Widget)
{
	$scope.widgets = Widget.getDashboard('dashboard');
};

function registerWidgets(Widget) {
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
		position : '1',
	});
}