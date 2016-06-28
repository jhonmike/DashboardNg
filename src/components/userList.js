'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserListConfig)
	.controller('UserListController', UserListController)
	.run(UserListMenu);
	
UserListConfig.$inject = ['$stateProvider'];
UserListController.$inject = [
	'$scope',
	'$state',
	'i18nService',
	'User'
];
UserListMenu.$inject = ['Menu'];

function UserListConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userList', {
		url: '/users',
		templateUrl: 'base/list.html',
		controller: UserListController
	});
};
 
function UserListController($scope, $state, i18nService, User)
{
	$scope.title = 'Usuários';
	$scope.breadcrumb = 'Lista de Usuários';
	$scope.router = [];
	$scope.router.form = 'usAdmin.userRegister';
	$scope.$state = $state;
	$scope.users = User.query();
	$scope.currentSelection = {};
	$scope.itemsSelected = [];
	$scope.gridOptions = {
		data: $scope.users,
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

function UserListMenu(Menu) {			
	Menu.addMenuItem('navbar', {
		itemKey : 'user',
		title : 'Usuários',
		link : 'usAdmin.userList',
		icon : 'glyphicon glyphicon-user icon',
		position : '2',
	});
}