appDirectives.directive('sortColumn', function () {
  return {
    restrict: 'A',
    transclude: true,
    template: '<span style="cursor:pointer;" ng-click="onClick()">' +
    '<span ng-transclude></span>&nbsp;' +
    '<i ng-class="{\'fa fa-sort-down\' : order === by && !reverse,  \'fa fa-sort-up\' : order === by && reverse,  \'icon-sort\' : order !== by}"></i>' +
    '</span>',
    scope: {
      order: '=',
      by: '=',
      reverse: '=',
      defaultreverse: '=',
      sortingChanged: '&'
    },
    link: function (scope, element, attrs) {
      scope.onClick = function () {
        if (scope.order === scope.by) {
          scope.reverse = !scope.reverse
        } else {
          scope.by = scope.order;
          scope.reverse = scope.defaultreverse;
        }
        var direction = scope.reverse == true ? "desc" : "asc";
        scope.sortingChanged({sorting: scope.by + ',' + direction});
      };
    }
  }
});