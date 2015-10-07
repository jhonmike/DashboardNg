/* global title */
'use strict';

angular.module('usLayout').service('Widget', [
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
		
		this.addDashboard('principal');
	}
]);
