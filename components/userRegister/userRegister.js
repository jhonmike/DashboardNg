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
	$scope.model= {};
	if ($stateParams.id) {
		$scope.id = $stateParams.id;
		$scope.model = User.findOne();
		$scope.title = 'Editar Usuário';
	} else {
		$scope.title = 'Novo Usuário';
	}
	$scope.breadcrumb = 'Usuários';
	$scope.router = [];
	$scope.router.list = 'usAdmin.userList';
	$scope.$state = $state;

	$scope.formFields = [
		{
			className: 'col-sm-6',
			key: 'name',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Nome',
				required: true
			}
		},
		{
			className: 'col-sm-6',
			key: 'user',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Usuário',
				placeholder: ''
			}
		},
		{
			className: 'col-sm-6',
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Senha',
				placeholder: ''
			}
		},
		{
			className: 'col-sm-6',
			key: 'password-confirm',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Confirmar Senha',
				placeholder: ''
			}
		},
		{
			className: 'col-sm-12',
			key: 'active',
			type: 'checkbox',
			templateOptions: {
				label: 'Ativo'
			}
		}
	];

	$scope.submit = function(form) {
		console.log(form);
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
