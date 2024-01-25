appModul.controller('AuthenticationErrorModelCtrl', function ($scope, $state, $modalInstance) {

  $scope.closeModal = function () {
    $modalInstance.close();
    $state.go("welcome");
  }

});