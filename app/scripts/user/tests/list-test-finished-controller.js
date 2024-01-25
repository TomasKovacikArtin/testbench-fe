appModul.controller('TestsFinishedCtrl', function ($scope, User, TEST_STATE, auth, growl, Test, confirm) {

	$scope.tests = User.tests({id: auth.currentUser.id});

	$scope.isInFillingState = function(test) {
		return test.state == TEST_STATE.FILLING;
	}
});
