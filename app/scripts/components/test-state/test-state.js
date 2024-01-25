appDirectives.directive('testState', function () {
  return {
    restrict: 'E',
    scope: {
      state: "@"
    },
    templateUrl: './app/scripts/components/test-state/test-state.html',
    controller: function ($scope, TEST_STATE) {

      $scope.showInitState = function () {
        return $scope.state == TEST_STATE.INIT;
      }
      $scope.showFillingState = function () {
        return $scope.state == TEST_STATE.FILLING;
      }
      $scope.showFinishedState = function () {
        return $scope.state == TEST_STATE.FINISHED;
      }
    }
  }

});