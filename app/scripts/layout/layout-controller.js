appModul.controller('LayoutCtrl', function ($scope, About, auth) {

  About.version().$promise.then(function (res) {
    $scope.version = res.data;
  });
});