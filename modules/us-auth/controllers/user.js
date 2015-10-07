angular.module('usAuth').controller('UserController', UserController);

UserController.$inject = [
	'$scope',
	'$state',
	'$stateParams',
	'User',
	'filterFilter'
];
 
function UserController($scope, $state, $stateParams, User, filterFilter) {	
	this.find = function() {
		this.users = User.query();
		this.currentPage = 1;
		this.entryLimit = 8;
		this.users.$promise.then(function () {
			this.totalItems = this.users.length;
			this.noOfPages = Math.ceil(this.totalItems / this.entryLimit);
		});

		this.$watch('search', function (newVal, oldVal) {
			this.filtered = filterFilter(this.users, newVal);
			this.totalItems = this.filtered.length;
			this.noOfPages = Math.ceil(this.totalItems / this.entryLimit);
			this.currentPage = 1;
		}, true);
	};
	
	this.findOne = function() {
		if ($stateParams.id) {
			this.user = User.get({
				id: $stateParams.id
			});
		}
	};
	
	this.register = function(valid) {
		this.alerts = [];
		if (valid) {
			var user = this.user;
			if ($stateParams.id) {
				user.$update(function(response) {
					user = response;
					this.alerts.push({type: "success", msg: "Usuário atualizado com sucesso!"});
				}, function(errorResponse) {
					this.alerts.push({type: "danger", msg: errorResponse.message});
				});
			} else {
				user = new User(user);
				user.$save(function(response) {
					$state.go('us.userRegister', {id:response.id}, {reload: true});
					this.alerts.push({type: "success", msg: "Usuário criado com sucesso!"});
				}, function(errorResponse) {
					this.alerts.push({type: "danger", msg: errorResponse.message});
				});
			}
		}
	};

	this.remove = function(user) {
		this.alerts = [];
		if (user) {
			user.$remove(function() {
				for (var i in this.users) {
					if (this.users[i] === user)
						this.users.splice(i, 1);
				}
				this.alerts.push({type: "success", msg: "Usuário removido com sucesso!"});
			});
		}
	};
};