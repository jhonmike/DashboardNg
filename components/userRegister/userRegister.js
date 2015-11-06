'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserRegisterConfig)
	.controller('UserRegisterController', UserRegisterController)
	.run(UserRegisterMenu);
	
UserRegisterConfig.$inject = ['$stateProvider', 'formlyConfigProvider'];
UserRegisterController.$inject = [
	'$scope',
	'$stateParams',
	'User',
	'formlyVersion'
];
UserRegisterMenu.$inject = ['Menu'];

function UserRegisterConfig($stateProvider, formlyConfigProvider)
{
	$stateProvider
	.state('usAdmin.userRegister', {
		url: '/user/register/:id',
		templateUrl: 'components/userRegister/userRegister.html',
		controller: UserRegisterController
	});
	
	// Exemplo de personalização de campo no formly
	formlyConfigProvider.setType({
    	name: 'checkbox',
    	template: `
			<div>
				<label>{{to.label}} {{to.required ? '*' : ''}}</label>
			</div>
			<label class="i-switch bg-info m-t-xs m-r">
				<input type="checkbox" ng-model="model[options.key]">
				<i></i>
			</label>
		`,
    	wrapper: ['bootstrapHasError'],
    	apiCheck: check => ({
        	templateOptions: {
        		label: check.string
        	}
      	})
    });
};
 
function UserRegisterController($scope, $stateParams, User, formlyVersion)
{
	$scope.user= {};
	$scope.id = ($stateParams.id) ? $stateParams.id : 0;	  
	// $scope.user = User.findOne();
	
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