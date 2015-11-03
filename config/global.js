'use strict';

var USConfig = (function() {
	return {
		applicationModuleName: 'UndefinedSource',
		applicationModuleVendorDependencies: [
			'ngResource',
			'ngStorage',
			'ngAnimate',
			'ngCookies',
			'ngSanitize',
            'ngTouch',
			'ngImgCrop',
			'ui.router',
			'ui.bootstrap',
			'ui.grid',
			'ui.grid.selection',
			'ui.grid.pagination',
			'formly',
			'formlyBootstrap'
		]
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
