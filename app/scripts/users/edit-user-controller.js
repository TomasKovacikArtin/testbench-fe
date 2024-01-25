appModul.controller('EditUserCtrl', function ($scope, $stateParams, growl, User, ENUM_ROLES, ENUM_BRANCHES) {

  $scope.roles = ENUM_ROLES.ENUMERATION;
  $scope.branches = ENUM_BRANCHES.ENUMERATION;

  if ($stateParams.id) {
    $scope.user = User.get({id: $stateParams.id}, function () {
      _.each($scope.roles, function (role) {
        role.selected = _.contains($scope.user.roles, role.id)
      })
      _.each($scope.branches, function (branch) {
        branch.selected = _.contains($scope.user.branches, branch.id)
      })
    });
  } else {
    $scope.user = new User();
    $scope.user.confirmed = false;

    _.each($scope.roles, function (role) {
      role.selected = false;
    })
    _.each($scope.branches, function (branch) {
      branch.selected = false;
      })
  }

  $scope.updateUser = function () {
    $scope.user.$save(function () {
      growl.addSuccessMessage("User profile has been saved");
    }, function () {
      growl.addErrorMessage("User profile has not been saved");
    });
  }

  $scope.updateRoles = function () {
    $scope.user.roles = _.map(_.filter($scope.roles, function (role) {
      return role.selected;
    }), function (r) {
      return r.id
    })
  }

  $scope.updateBranches = function () {
    $scope.user.branches = _.map(_.filter($scope.branches, function (branch) {
      return branch.selected;
    }), function (r) {
      return r.id
    })
  }
});