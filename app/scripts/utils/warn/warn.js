appModul.factory('warn', function($modal) {
  return function(title, text) {
    return $modal.open({
      size: 'lg',
      templateUrl: 'app/scripts/utils/warn/warn.html',
      controller: function($scope, $modalInstance) {
        $scope.title = title;
        $scope.text = text;
        $scope.ok = function() {
          $modalInstance.close('OK');
        };
      }
    }).result;
  }
});