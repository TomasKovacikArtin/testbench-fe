appModul.controller('UserProfileCtrl', function ($scope, User, auth, growl) {

  $scope.user = User.currentFullDetail();
  $scope.userForPassword = User.currentFullDetail();


  $scope.updatePersonalInfo = function () {
    $scope.user.$updateCurrentPersonInfo().then(function () {
      growl.addSuccessMessage("Profile has been saved");
      auth.refreshUserDetail();
    }, function () {
      growl.addErrorMessage("Profile has not been saved");
    });
  }

  $scope.updatePassword = function () {
    $scope.userPasswordForm.$setPristine(true);
    $scope.userForPassword.$updateCurrentPassword().then(function () {
      growl.addSuccessMessage("Password has been changed successfully");
    }, function () {
      growl.addErrorMessage("Password has not been changed");
    });
  }

  $scope.interacted = function (field) {
    return !$scope.userPasswordForm.$submitted && field.$dirty;
  };
});