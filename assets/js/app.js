'use strict';

angular.module(USConfig.applicationModuleName)
	.config(AdminConfig)
	.controller('AdminContainer', AdminContainer);

function AdminConfig($stateProvider, $urlRouterProvider)
{
	$urlRouterProvider.otherwise("/login");
	
	$stateProvider
	.state('usAdmin', {
		abstract: true,
		url: '/us-admin',
		templateUrl: 'admin/admin.html',
        controller: AdminContainer,
        controllerAs: 'vm'
	});
}

function AdminContainer($scope, $state, $localStorage, Menu)
{
    var vm = this;
	// Menus
    vm.topbar = Menu.getMenu('topbar');
    vm.navbar = Menu.getMenu('navbar');
    vm.dropdownUser = Menu.getMenu('dropdownUser');
    vm.$state = $state;
    vm.authentication = $localStorage.user;

    vm.app = USConfig.layout;
    if ( angular.isDefined($localStorage.settings) ) {
        vm.app.settings = $localStorage.settings;
    } else {
        $localStorage.settings = vm.app.settings;
    }
	$scope.$watch('app.settings', function(){
		if( vm.app.settings.asideDock  &&  vm.app.settings.asideFixed ){
            vm.app.settings.headerFixed = true;
		}
		$localStorage.settings = vm.app.settings;
	}, true);

    vm.activeSetting = false;
    vm.activeAside = false;
    vm.activeTopbar = false;
    vm.tabSetting = tabSetting;
    vm.toggleAside = toggleAside;
    vm.toggleTopbar = toggleTopbar;

	function tabSetting() {
        vm.activeSetting = (vm.activeSetting) ? false : true;
	}
	function toggleAside() {
        vm.activeAside = (vm.activeAside) ? false : true;
	}
	function toggleTopbar() {
        vm.activeTopbar = (vm.activeTopbar) ? false : true;
	}
}

'use strict';

angular.module(USConfig.applicationModuleName).service('Menu', [
	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};
		
		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};
		
		// Add menu item object
		this.addMenuItem = function(menuId, itemOptions) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);
			
			this.prepareItem(menuId, itemOptions);
			
			// Return the menu object
			return this.menus[menuId];
		};
		
		// Add menu item object
		this.addMenuItems = function(menuId, itemsOptions) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);
			
			if (itemsOptions.length > 0) {
				for (var i = 0; i < itemsOptions.length; i++) {
					this.prepareItem(menuId, itemsOptions[i]);
				}
			}
			
			return this.menus[menuId];
		};
		
		this.prepareItem = function(menuId, itemOptions) {
			var key = itemOptions.itemKey.split('.');
			var element = this.menus[menuId];
			if (key.length > 0) {
				// loop da ordem das chaves
				for (var i = 0; i < key.length; i++) {
					if (element.items.length > 0) {
						// loop dos itens ja existentes
						for (var j = 0; j < element.items.length; j++) {
							if (element.items[j].id != key[i]) {
								if (key.length == (i+1)) {
									itemOptions["id"] = key[i];
									element.items.push(this.prepareOptions(menuId, itemOptions));
									break;
								}
							} else {
								if (key.length == (i+1)) {
									// merge dos itens existentes com novos dados
									itemOptions["id"] = key[i];
									itemOptions["items"] = element.items[j].items;
									element.items[j] = this.prepareOptions(menuId, itemOptions);
									break;
								} else {
									// nada a fazer apenas sob o nivel dos menus
									element = element.items[j];
								}
							}
						}
					} else {
						if (key.length === i+1) {
							// insere o primeiro item
							itemOptions["id"] = key[i];
							element.items.push(this.prepareOptions(menuId, itemOptions));
							break;
						}
					}
				}
			}
		};
		
		this.prepareOptions = function(id, options) {
			// prepares and validates the parameters
			return {
					id: options.id,
					title: options.title,
					link: options.link,
					icon: ((options.icon === null || typeof options.icon === 'undefined') ? '' : options.icon),
					itemClass: ((options.class === null || typeof options.class === 'undefined') ? '' : options.class),
					isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.menus[id].isPublic : options.isPublic),
					roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[id].roles : options.roles),
					position: options.position || 0,
					items: ((options.items === null || typeof options.items === 'undefined') ? [] : options.items),
					shouldRender: shouldRender
			};
		};
		
		this.addMenu('topbar');
		this.addMenu('navbar');
		this.addMenu('dropdownUser');
	}
]);

"use strict";

angular.module(USConfig.applicationModuleName).factory('User', User);

function User($resource, filterFilter)
{
    var resource = $resource(USConfig.serverUrl + '/user/:id', {
		id: '@id'
	}, {
		'query':  {method:'GET', isArray:true},
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'update': {method:'PUT'},
		'delete': {method:'DELETE'}
	});

    // mocks
    resource.query = find;
    resource.get = findOne;

    function find(data) {
        return filterFilter(mockUsers(), data);
    }

    function findOne(data) {
        return filterFilter(mockUsers(), {'id': data.id})[0];
    }

    return resource;
}

function mockUsers()
{
    return [
        {
            "id": 1,
            "username": "test1",
            "password": "123456",
            "name": "Maka",
            "email": "test1@jhonmike.com.br",
            "active": true
        },
        {
            "id": 2,
            "username": "test2",
            "password": "123456",
            "name": "Maka",
            "email": "test2@jhonmike.com.br",
            "active": true
        },
        {
            "id": 3,
            "username": "test3",
            "password": "123456",
            "name": "Maka",
            "email": "test3@jhonmike.com.br",
            "active": true
        }
    ];
}

'use strict';

angular.module(USConfig.applicationModuleName).service('Widget', [
	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the dashboard object
		this.dashboards = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};
		
		// Validate dashboard existance
		this.validateDashboardExistance = function(dashboardId) {
			if (dashboardId && dashboardId.length) {
				if (this.dashboards[dashboardId]) {
					return true;
				} else {
					throw new Error('Dashboard does not exists');
				}
			} else {
				throw new Error('DashboardId was not provided');
			}

			return false;
		};

		// Get the dashboard object by dashboard id
		this.getDashboard = function(dashboardId) {
			// Validate that the dashboard exists
			this.validateDashboardExistance(dashboardId);

			// Return the dashboard object
			return this.dashboards[dashboardId];
		};

		// Add new dashboard object by dashboard id
		this.addDashboard = function(dashboardId, isPublic, roles) {
			// Create the new dashboard
			this.dashboards[dashboardId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the dashboard object
			return this.dashboards[dashboardId];
		};

		// Remove existing dashboard object by dashboard id
		this.removeDashboard = function(dashboardId) {
			// Validate that the dashboard exists
			this.validateDashboardExistance(dashboardId);

			// Return the dashboard object
			delete this.dashboards[dashboardId];
		};
		
		// Add dashboard item object
		this.addDashboardItem = function(dashboardId, itemOptions) {
			// Validate that the dashboard exists
			this.validateDashboardExistance(dashboardId);
			
			this.prepareItem(dashboardId, itemOptions);
			
			// Return the dashboard object
			return this.dashboards[dashboardId];
		};
		
		// Add dashboard item object
		this.addDashboardItems = function(dashboardId, itemsOptions) {
			// Validate that the dashboard exists
			this.validateDashboardExistance(dashboardId);
			
			if (itemsOptions.length > 0) {
				for (var i = 0; i < itemsOptions.length; i++) {
					this.prepareItem(dashboardId, itemsOptions[i]);
				}
			}
			
			return this.dashboards[dashboardId];
		};
		
		this.prepareItem = function(id, options) {
			var element = this.dashboards[id];
			element.items.push({
				template: options.template || null,
				templateUrl: options.templateUrl || null,
				itemClass: ((options.class === null || typeof options.class === 'undefined') ? '' : options.class),
				isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.dashboards[id].isPublic : options.isPublic),
				roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.dashboards[id].roles : options.roles),
				position: options.position || 0,
				shouldRender: shouldRender
			});
		};
		
		this.addDashboard('dashboard');
	}
]);

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
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email',
				required: true
			}
		},
		{
			className: 'col-sm-6',
			key: 'username',
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

'use strict';

angular.module(USConfig.applicationModuleName)
	.config(DashboardConfig)
	.controller('DashboardController', DashboardController)
	.run(DashboardMenu)
	.run(DashboardWidgets);

function DashboardConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.dashboard', {
		url: '/dashboard',
		templateUrl: 'dashboard/dashboard.html',
		controller: DashboardController,
		controllerAs: 'vm'
	});
}

function DashboardController(Widget)
{
	var vm = this;
	vm.widgets = Widget.getDashboard('dashboard');
}

function DashboardMenu(Menu)
{
	Menu.addMenuItem('topbar', {
		itemKey : 'register',
		title : 'Cadastros',
		link : 'usAdmin',
		position : '1'
	});				
	Menu.addMenuItem('navbar', {
		itemKey : 'dashboard',
		title : 'Dashboard',
		link : 'usAdmin.dashboard',
		icon : 'glyphicon glyphicon-stats icon',
		position : '1'
	});
}

function DashboardWidgets(Widget)
{
	Widget.addDashboardItem('dashboard', {
		template : `<div class="panel panel-default">
			<div class="panel-heading">
				<span class="text-lt">Widget 01</span>
			</div>
			<div class="hbox text-center text-sm">
				<h1> Exemplo de widget com template
			</div>
		</div>`,
		class : 'col-md-4 widget', 
		position : '1'
	});
}
'use strict';

angular.module(USConfig.applicationModuleName)
	.config(LoginConfig)
	.controller('LoginController', LoginController);

function LoginConfig($stateProvider)
{
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'login/login.html',
		controller: LoginController,
        controllerAs: 'vm'
	});
}

function LoginController($http, $state, $localStorage)
{
	var vm = this;
	vm.user = {};
	vm.signin = signin;
	// vm.signup = signup;

	function signin()
	{
		// this.sending = true;
		// this.alerts = [];
		// $http.post(USConfig.serverUrl + '/auth', this.user)
		// .success(function(response) {
		// 	$localStorage.user = response;
		// 	$state.go('usAdmin.dashboard');
		// }).error(function(response) {
		// 	this.sending = false;
		// 	this.alerts.push({type:'danger', msg:response.error});
		// });
		// provisorio
		$localStorage.user = vm.user;
		$state.go('usAdmin.dashboard');
	}

	// function signup()
	// {
	// 	$http.post(USConfig.serverUrl + '/auth/0', $localStorage.user)
	// .success(function(response) {
	// 		delete $localStorage.user;
	// 		$location.path('/');
	// 	}).error(function(response) {
	// 		this.alerts.push({type:'danger', msg:response.error});
	// 	});
	// };
}
