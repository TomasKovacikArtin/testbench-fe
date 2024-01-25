appModul.controller('TestResultCtrl', function ($scope, $stateParams, Test, growl) {

	if ($stateParams.id) {
		$scope.test = Test.get({id: $stateParams.id});
	}

	$scope.updateTest = function() {
		$scope.test.$save(function() {
			growl.addSuccessMessage('Test has been saved');
		}, function() {
			growl.addErrorMessage('Test has not been saved');
		});
	};

    $scope.areAllPointsGiven = function () {
        if ($scope.test.questions) {
            return $scope.test.questions.every(function (question) {
                return question.points != null;
            })
        }
    }

});