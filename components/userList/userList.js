'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserListConfig)
	.controller('UserListController', UserListController)
	.run(UserListMenu);

UserListConfig.$inject = ['$stateProvider'];
UserListController.$inject = [
	'$scope',
	'$state',
	'User',
	'filterFilter'
];
UserListMenu.$inject = ['Menu'];

function UserListConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userList', {
		url: '/users',
		templateUrl: 'components/userList/userList.html',
		controller: UserListController
	});
};
 
function UserListController($scope, $state, User, filterFilter)
{
	$scope.users = User.query();
	$scope.gridOptions = {
		data: $scope.users,
		u18n: 'pt-br',
		columnDefs: [
			{ field: 'name', name: 'Name' },
			{ field: 'email', name: 'E-mail' },
			{ field: 'username', name: 'Username' },
			{ field: 'active', name: 'Active' }
		],
		enableGridMenu: true,
    	// gridMenuTitleFilter: fakeI18n,
		
		exporterLinkLabel: 'get your csv here',
		exporterPdfDefaultStyle: {fontSize: 9},
		exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
		exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
		exporterPdfOrientation: 'portrait',
		exporterPdfPageSize: 'LETTER',
		exporterPdfMaxGridWidth: 500,
		
		onRegisterApi: function(gridApi){ 
			$scope.gridApi = gridApi;
		}
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