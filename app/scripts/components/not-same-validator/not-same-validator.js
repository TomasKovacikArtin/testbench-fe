appDirectives.directive('notSame', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      compValue: "="
    },
    link: function ($scope, elm, attrs, ctrl) {
      ctrl.$validators.notSame = function (modelValue, viewValue) {
        return $scope.compValue == viewValue ? true : false;
      }

      $scope.$watch('compValue', function (value) {
        ctrl.$setValidity('notSame', value === ctrl.$viewValue);
      });
    }
  }

});