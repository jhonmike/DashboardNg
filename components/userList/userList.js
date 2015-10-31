'use strict';

angular.module(USConfig.applicationModuleName)
	.config(UserListConfig)
	.controller('UserListController', UserListController);

UserListConfig.$inject = ['$stateProvider'];
UserListController.$inject = [
	'$scope',
	'$state',
	'User',
	'filterFilter'
];

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
	$scope.currentPage = 1;
	$scope.entryLimit = 8;
	$scope.users.$promise.then(function () {
		$scope.totalItems = $scope.users.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
	});

	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filtered = filterFilter($scope.users, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}