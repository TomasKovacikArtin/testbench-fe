appModul.factory('confirm', function($modal) {
  return function(title, text, type) {
    return $modal.open({
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      templateUrl: 'app/scripts/utils/confirm/confirm.html',
      controller: function($scope, $modalInstance) {
        $scope.title = title;
        $scope.text = text;
        $scope.ok = function() {
          $modalInstance.close('OK');
        };
        $scope.cancel = function() {
          $modalInstance.dismiss('Cancelled');
        };
        $scope.isInfoType = function() {
          return type === "info";
        }
      }
    }).result;
  }
});