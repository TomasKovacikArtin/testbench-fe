appModul.controller('ListTestResultCtrl', function ($scope, Test, confirm, growl) {

  $scope.totalElements = 0;
  $scope.currentPage = 1;
  $scope.maxSize = 10;
  $scope.itemsPerPage = 20;
  $scope.perPage = [10, 20, 50, 100];
  $scope.sorting = 'startTime,desc';

  $scope.filter = {};

  $scope.pageChanged = function() {
    $scope.fetchTests();
	};

	$scope.deleteTest = function (testt) {
		test = new Test();
		test.id = testt.id;
		confirm('Confirmation', 'Do you really want to delete the test?').then(function () {
			test.$delete().then(function () {
          $scope.fetchTests();
					growl.addSuccessMessage("Test has been deleted");
				},
				function () {
          $scope.fetchTests();
					growl.addErrorMessage("Test has not been deleted");
				});
		});
	};

	$scope.fetchTests = function () {
		Test.listTests({size: $scope.itemsPerPage, page: $scope.currentPage-1, sort: $scope.sorting, filter: $scope.filter}).$promise.then(function(data) {
      $scope.tests = data.content;
      $scope.totalElements = data.totalElements;
      if(isAllOptionSelected()) {
        $scope.itemsPerPage = data.totalElements;
      }
      addAllCountToPerPageCombo(data.totalElements);
    });
	};

	$scope.filterList = function(target) {
    if (target.which === 13) {
    	$scope.fetchTests();
		}
	};

	$scope.sortingChanged = function(sorting) {
		$scope.sorting = sorting;
    $scope.fetchTests();
	};

	$scope.fetchTests();

	function addAllCountToPerPageCombo(totalElements) {
		$scope.perPage[4] = totalElements;
	};

	function isAllOptionSelected() {
		return $scope.itemsPerPage !== $scope.perPage[0] &&
      $scope.itemsPerPage !== $scope.perPage[1] &&
      $scope.itemsPerPage !== $scope.perPage[2] &&
      $scope.itemsPerPage !== $scope.perPage[3];
	}
});