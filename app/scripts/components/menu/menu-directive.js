appDirectives.directive('menu', function () {
  return {
    restrict: 'A',
    replace: true,
    url: '/:branchId',
    templateUrl: './app/scripts/components/menu/menu.html',
    controller: function ($scope, auth, $state, $stateParams) {
      $scope.logout = function() {
        auth.logout();
        $state.go('welcome');
      };

      $scope.loginAsCandidate = function() {
        if ($stateParams.branchId && $stateParams.branchId !== "") {
          $scope.branchId = $stateParams.branchId
        }
        auth.authenticateCandidate($scope.branchId);
      };

      $scope.loginAsAdmin = function() {
        auth.authenticate();
      };
    }
  };
});