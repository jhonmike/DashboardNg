'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserListConfig)
	.controller('UserListController', UserListController)
	.run(UserListMenu);

function UserListConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userList', {
		url: '/users',
		templateUrl: 'base/list.html',
		controller: UserListController,
        controllerAs: 'vm'
	});
}
 
function UserListController($scope, $state, i18nService, User)
{
	var vm = this;
	vm.title = 'Usuários';
	vm.breadcrumb = 'Lista de Usuários';
	vm.router = [];
	vm.router.form = 'usAdmin.userRegister';
	vm.$state = $state;
	vm.users = User.query();
	vm.currentSelection = {};
	vm.itemsSelected = [];
	vm.gridOptions = {
		data: vm.users,
		columnDefs: [
			{ field: 'id', name: 'Cod.' },
			{ field: 'name', name: 'Nome' },
			{ field: 'username', name: 'Usuário' },
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
					vm.currentSelection = row.entity;
					vm.itemsSelected = $scope.gridApi.selection.getSelectedRows();
				}
			).bind(this);
		}	
	};
	i18nService.setCurrentLang('pt-br');
	
	vm.view = view;
	vm.delete = deletefn;

	function view(entity)
    {
		
	}

	function deletefn(entity)
	{
		
	}
}

function UserListMenu(Menu)
{
	Menu.addMenuItem('navbar', {
		itemKey : 'user',
		title : 'Usuários',
		link : 'usAdmin.userList',
		icon : 'glyphicon glyphicon-user icon',
		position : '2'
	});
}