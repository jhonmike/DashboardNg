'use strict';

angular.module('usAuth').config(['$httpProvider',
	function($httpProvider) {
		$httpProvider.defaults.timeout = 5000;
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage',
			function($q, $location, $localStorage) {
				return {
					request: function(config) {
						config.headers =  {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						};
						return config;
					},
					response: function(response) {
						response.config.headers =  {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						};
						return response;
					},
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								break;
							case 403:
								// Add unauthorized behaviour
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
