'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserRegisterConfig)
	.controller('UserRegisterController', UserRegisterController)
	.run(UserRegisterMenu);

function UserRegisterConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.userRegister', {
		url: '/user/register/:id',
		templateUrl: 'base/form.html',
		controller: UserRegisterController,
        controllerAs: 'vm'
	});
}

function UserRegisterController($stateParams, $state, User)
{
	var vm = this;
	vm.model= {};
    vm.title = 'Novo Usuário';
	if ($stateParams.id) {
		vm.id = $stateParams.id;
		vm.model = User.get({"id": vm.id});
		vm.title = 'Editar Usuário';
	}
	vm.breadcrumb = 'Usuários';
	vm.router = [];
	vm.router.list = 'usAdmin.userList';
	vm.$state = $state;

	vm.formFields = [
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

    vm.submit = submit;

    function submit(form)
    {
        console.log(form);
    }
}

function UserRegisterMenu(Menu)
{
	Menu.addMenuItem('topbar', {
		itemKey : 'register.user',
		title : 'Usuário',
		link : 'usAdmin.userRegister',
		position : '1'
	});
}
