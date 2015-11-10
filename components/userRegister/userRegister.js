'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserRegisterConfig)
	.controller('UserRegisterController', UserRegisterController)
	.run(UserRegisterMenu);
	
UserRegisterConfig.$inject = ['$stateProvider'];
UserRegisterController.$inject = [
	'$scope',
	'$stateParams',
	'$state',
	'User'
];
UserRegisterMenu.$inject = ['Menu'];

function UserRegisterConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userRegister', {
		url: '/user/register/:id',
		templateUrl: 'components/base/form.html',
		controller: UserRegisterController
	});
};
 
function UserRegisterController($scope, $stateParams, $state, User)
{
	$scope.user= {};
	if ($stateParams.id) {
		$scope.id = $stateParams.id;
		$scope.user = User.findOne();
		$scope.title = 'Editar Usuário';
	} else {
		$scope.title = 'Novo Usuário';
	}	  
	$scope.breadcrumb = 'Usuários';
	$scope.router = [];
	$scope.router.list = 'usAdmin.userList';
	$scope.$state = $state;
	
	$scope.userFields = [
		{
			className:'col-sm-6',
			key: 'nome',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Nome: ',
				placeholder: ''
			}
		},
		{
			className:'col-sm-4',
			key: 'user',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Usuário: ',
				placeholder: ''
			}
		},
		{
			className:'col-sm-2',
			key: 'senha',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Senha',
				placeholder: ''
			}
		},
		{
			className:'col-sm-12 m-b-md',
			key: 'ativo',
			type: 'checkbox',
			templateOptions: {
				label: 'Ativo'
			}
		}
	];
	
	$scope.submit = function(user) {
		console.log(user);	
	};
}

function UserRegisterMenu(Menu) {			
	Menu.addMenuItem('topbar', {
		itemKey : 'user',
		title : 'Usuário',
		link : 'usAdmin.userRegister',
		icon : 'glyphicon glyphicon-user icon',
		position : '2',
	});
}