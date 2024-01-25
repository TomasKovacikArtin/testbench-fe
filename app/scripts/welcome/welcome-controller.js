appModul.controller('WelcomeCtrl', function ($scope, $http, $state, auth, TestTemplate, Test, $stateParams, ENUM_ROLES) {
  $scope.templates = TestTemplate.findSimple();
  $scope.showPassword = false;
  $scope.branchId = null;

  if ($stateParams.key) {
    $http.post('api/users/confirm', $stateParams.key).then(function () {
      auth.authenticate().then(function () {
        $state.go('welcome');
      });
    }, function () {
      alert("Nastala neocekavana chyba");
    })
  }

  if ($stateParams.branchId && $stateParams.branchId !== "") {
    $scope.branchId = $stateParams.branchId
  }


  function createAndGoToTest(template) {
    Test.create({templateId: template.id}).$promise.then(function (data) {
      $state.go('fill-test', {id: data.id});
    });
  }

  $scope.createTest = function (template) {
    if (!auth.isAuthenticated()) {
      auth.authenticateCandidate($scope.branchId).then(function () {
        createAndGoToTest(template);
      });
    } else {
      createAndGoToTest(template);
    }
  };
});
