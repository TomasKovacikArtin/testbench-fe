appModul.controller('TestFinishedCtrl', function($scope, $stateParams, Test) {

	if ($stateParams.id) {
		$scope.test = Test.results({id: $stateParams.id});
	}

});
