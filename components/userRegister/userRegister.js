'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UsuarioRegisterConfig)
	.controller('UsuarioRegisterController', UsuarioRegisterController)
	.run(UsuarioRegisterMenu);
	
UsuarioRegisterConfig.$inject = ['$stateProvider'];
UsuarioRegisterController.$inject = [
	'$scope',
	'$stateParams',
	'Usuario',
	'formlyVersion'
];
UsuarioRegisterMenu.$inject = ['Menu'];

function UsuarioRegisterConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.usuarioRegister', {
		url: '/usuario/register/:id',
		templateUrl: 'components/usuarioRegister/usuarioRegister.html',
		controller: UsuarioRegisterController
	});
};
 
function UsuarioRegisterController($scope, $stateParams, Usuario, formlyVersion)
{
	$scope.user= {};
	$scope.id = ($stateParams.id) ? $stateParams.id : 0;	  
	// $scope.user = Usuario.findOne();
	
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
			key: 'usuario',
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

function UsuarioRegisterMenu(Menu) {			
	Menu.addMenuItem('topbar', {
		itemKey : 'user',
		title : 'Usuário',
		link : 'usAdmin.usuarioRegister',
		icon : 'glyphicon glyphicon-user icon',
		position : '2',
	});
}