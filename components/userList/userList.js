'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UsuarioListConfig)
	.controller('UsuarioListController', UsuarioListController)
	.run(UsuarioListMenu);
	
UsuarioListConfig.$inject = ['$stateProvider'];
UsuarioListController.$inject = [
	'$scope',
	'$state',
	'i18nService',
	'Usuario'
];
UsuarioListMenu.$inject = ['Menu'];

function UsuarioListConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.usuarioList', {
		url: '/usuarios',
		templateUrl: 'components/usuarioList/usuarioList.html',
		controller: UsuarioListController
	});
};
 
function UsuarioListController($scope, $state, i18nService, Usuario)
{
	$scope.users = Usuario.query();

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
		}	
	};
	i18nService.setCurrentLang('pt-br');
	
	$scope.itemSelected = {id: 1};
	
	$scope.view = function(entity) {
		
	};
	
	$scope.delete = function(entity) {
		
	};
}

function UsuarioListMenu(Menu) {			
	Menu.addMenuItem('navbar', {
		itemKey : 'user',
		title : 'Usuários',
		link : 'usAdmin.usuarioList',
		icon : 'glyphicon glyphicon-user icon',
		position : '2',
	});
}