'use strict';

var USConfig = (function() {
	var applicationModuleName = 'UndefinedSource';
	var registerModule = function(moduleName, dependencies) {
		angular.module(moduleName, dependencies || []);
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: [
			'ui.router',
			'ngResource',
			'ngStorage',
			// 'ngAnimate',
			// 'ngCookies',
			// 'ngSanitize',
			// 'ngTouch',
			'ui.bootstrap'
		],
		registerModule: registerModule
	};
})();

angular.module(USConfig.applicationModuleName, USConfig.applicationModuleVendorDependencies)
.config(['$locationProvider',
	function($locationProvider) {
		//  $locationProvider.html5Mode(true);
	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [USConfig.applicationModuleName]);
});
