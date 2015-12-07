'use strict';

angular.module(USConfig.applicationModuleName)
	.config(EventRegisterConfig)
	.controller('EventRegisterController', EventRegisterController)
	.run(EventRegisterMenu);

EventRegisterConfig.$inject = ['$stateProvider'];
EventRegisterController.$inject = [
	'$scope',
	'$stateParams',
	'$state',
	'Event'
];
EventRegisterMenu.$inject = ['Menu'];

function EventRegisterConfig($stateProvider)
{
	$stateProvider
	.state('usAdmin.eventRegister', {
		url: '/event/register/:id',
		templateUrl: 'base/form.html',
		controller: EventRegisterController
	});
};

function EventRegisterController($scope, $stateParams, $state, Event)
{
	$scope.model= {};
	if ($stateParams.id) {
		$scope.id = $stateParams.id;
		$scope.model = Event.findOne();
		$scope.title = 'Editar Evento';
	} else {
		$scope.title = 'Novo Evento';
	}
	$scope.breadcrumb = 'Eventos';
	$scope.router = [];
	$scope.router.list = 'usAdmin.eventList';
	$scope.$state = $state;

	$scope.formFields = [
		{
			className: 'col-xs-12',
			key: 'name',
		    type: 'input',
		    templateOptions: {
				type: 'text',
			    label: 'Nome',
				required: true
			}
		},
        {
			className: 'col-sm-3',
			key: 'begin-date',
		    type: 'datepicker',
		    templateOptions: {
			    label: 'Data Início'
			}
		},
        {
			className: 'col-sm-3',
			key: 'end-date',
		    type: 'datepicker',
		    templateOptions: {
			    label: 'Data Fim'
			}
		}
	];

	$scope.submit = function(form) {
		console.log(form);
	};
}

function EventRegisterMenu(Menu) {
	Menu.addMenuItem('topbar', {
		itemKey : 'register.event',
		title : 'Evento',
		link : 'usAdmin.eventRegister',
		position : '2',
	});
}
