'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserRegisterConfig)
	.controller('UserRegisterController', UserRegisterController)
	.run(UserRegisterMenu);
	
UserRegisterConfig.$inject = ['$stateProvider'];
UserRegisterController.$inject = [
	'$scope',
	'$stateParams',
	'User',
	'formlyVersion'
];
UserRegisterMenu.$inject = ['Menu'];

function UserRegisterConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userRegister', {
		url: '/user/register/:id',
		templateUrl: 'components/userRegister/userRegister.html',
		controller: UserRegisterController
	});
};
 
function UserRegisterController($scope, $stateParams, User, formlyVersion)
{
	$scope.user= {};
	$scope.id = ($stateParams.id) ? $stateParams.id : 0;	  
	// $scope.user = User.findOne();
	
	$scope.userFields = [
		{
			key: 'nome',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Nome: ',
				placeholder: ''
			}
		},
		{
			key: 'user',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Usuário: ',
				placeholder: ''
			}
		},
		{
			key: 'senha',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Senha',
				placeholder: ''
			}
		},
		{
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