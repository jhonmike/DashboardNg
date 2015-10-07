angular.module('usSite').controller('HomeController', HomeController);

HomeController.$inject = [
	'$scope'
];
 
function HomeController($scope)
{
	console.log('HomeController');
}