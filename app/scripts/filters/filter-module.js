var appFilters = angular.module('appFilters', []);

appFilters.filter('filterOr', function (filterFilter) {
  return function (arr, exp, cmp) {
    if (!exp) {
      return arr;
    }
    return exp.split(/\s+/g).reduce(function (res, expPart) {
      return _.union(filterFilter(arr, expPart, cmp), res);
    }, []);
  };
});

appFilters.filter('filterAnd', function (filterFilter) {
  return function (arr, exp, cmp) {
    if (!exp) {
      return arr;
    }

    return exp.split(/\s+/g).reduce(function (res, expPart) {
      return filterFilter(res, expPart, cmp);
    }, arr);
  };
});


appFilters.filter('secondsToHHmm', function () {
  return function (input) {

    if (!input) {
      return input;
    }

    function convertToMilliseconds(input) {
      return input * 1000;
    }

    return moment.utc(convertToMilliseconds(input)).format("HH:mm");
  }
});