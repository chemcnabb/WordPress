'use strict';

describe('Controller: frontController', function () {
	// load the controller's module
	beforeEach(module('azureTicketsApp'));

	var frontController, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		scope = {};
		frontController = $controller('frontController', {
			$scope : scope
		});
	}));

	it('should initialize properly', function () {
		expect(scope.config).toBeDefined();
	});
});
