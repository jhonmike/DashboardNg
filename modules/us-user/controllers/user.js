angular.module('usUser').controller('UserController', UserController);

UserController.$inject = [
	'$scope',
	'$state',
	'$stateParams',
	'User',
	'filterFilter'
];
 
function UserController($scope, $state, $stateParams, User, filterFilter)
{
	$scope.find = function() {
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
	};
	
	$scope.findOne = function() {
		if ($stateParams.id) {
			$scope.user = User.get({
				id: $stateParams.id
			});
		}
	};
	
	$scope.register = function(valid) {
		$scope.alerts = [];
		if (valid) {
			var user = $scope.user;
			if ($stateParams.id) {
				user.$update(function(response) {
					user = response;
					$scope.alerts.push({type: "success", msg: "Usuário atualizado com sucesso!"});
				}, function(errorResponse) {
					$scope.alerts.push({type: "danger", msg: errorResponse.message});
				});
			} else {
				user = new User(user);
				user.$save(function(response) {
					$state.go('us.userRegister', {id:response.id}, {reload: true});
					$scope.alerts.push({type: "success", msg: "Usuário criado com sucesso!"});
				}, function(errorResponse) {
					$scope.alerts.push({type: "danger", msg: errorResponse.message});
				});
			}
		}
	};

	$scope.remove = function(user) {
		$scope.alerts = [];
		if (user) {
			user.$remove(function() {
				for (var i in $scope.users) {
					if ($scope.users[i] === user)
						$scope.users.splice(i, 1);
				}
				$scope.alerts.push({type: "success", msg: "Usuário removido com sucesso!"});
			});
		}
	};
};