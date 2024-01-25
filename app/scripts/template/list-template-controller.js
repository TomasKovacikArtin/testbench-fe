appModul.controller('listTemplateCtrl', function ($scope, TestTemplate, testService, $state, confirm, growl) {
	
	$scope.templates = TestTemplate.findSimple();

	$scope.deleteTemplate = function (template) {
		confirm('Confirmation', 'Do you really want to delete the template?').then(function () {
			template.$delete().then(function () {
					growl.addSuccessMessage("Template has been saved");
					$scope.templates = TestTemplate.findSimple();
				},
				function () {
					growl.addSuccessMessage("Template has not been saved");
					$scope.templates = TestTemplate.findSimple();
				});
		});
	}

});