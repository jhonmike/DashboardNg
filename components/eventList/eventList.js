'use strict';

angular.module(USConfig.applicationModuleName)
	.config(EventListConfig)
	.controller('EventListController', EventListController)
	.run(EventListMenu);

EventListConfig.$inject = ['$stateProvider'];
EventListController.$inject = [
	'$scope',
	'$state',
	'i18nService',
	'Event'
];
EventListMenu.$inject = ['Menu'];

function EventListConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.eventList', {
		url: '/events',
		templateUrl: 'components/base/list.html',
		controller: EventListController
	});
};

function EventListController($scope, $state, i18nService, Event)
{
	$scope.title = 'Eventos';
	$scope.breadcrumb = 'Lista de Eventos';
	$scope.router = [];
	$scope.router.form = 'usAdmin.eventRegister';
	$scope.$state = $state;
	$scope.events = Event.query();
	$scope.currentSelection = {};
	$scope.itemsSelected = [];
	$scope.gridOptions = {
		data: $scope.events,
		columnDefs: [
			{ field: 'id', name: 'Cod.' },
			{ field: 'nome', name: 'Nome' },
			{ field: 'contato', name: 'Contato' },
			{ field: 'email', name: 'E-mail' }
		],
		enableSorting: true,
		showGridFooter: true,
		showColumnFooter: true,
		enableFiltering: true,
		enableGridMenu: true,
		enableSelectAll: true,
		enableRowSelection: false,
		selectionRowHeaderWidth: 35,
		enableRowHeaderSelection: true,
		paginationPageSizes: [5, 10, 15],
    	paginationPageSize: 5,
		onRegisterApi: function(gridApi){
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,
				function(row) {
					$scope.currentSelection = row.entity;
					$scope.itemsSelected = $scope.gridApi.selection.getSelectedRows();
				}
			).bind(this);
		}
	};
	i18nService.setCurrentLang('pt-br');

	$scope.view = function(entity) {

	};

	$scope.delete = function(entity) {

	};
}

function EventListMenu(Menu) {
	Menu.addMenuItem('navbar', {
		itemKey : 'event',
		title : 'Eventos',
		link : 'usAdmin.eventList',
		icon : 'glyphicon glyphicon-calendar icon',
		position : '3',
	});
}
