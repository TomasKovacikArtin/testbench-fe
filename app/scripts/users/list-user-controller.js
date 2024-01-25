appModul.controller('ListUserCtrl', function ($scope, growl, User, confirm, ROLES) {

  $scope.users = User.query();

  $scope.deleteUser = function(user) {
    confirm('Confirmation', 'Do you want to delete the user?').then(function () {
      user.$delete().then(function () {
          $scope.users = User.query();
          growl.addSuccessMessage("User has been deleted");
        },
        function () {
          $scope.users = User.query();
          growl.addErrorMessage("User has not been deleted");
        });
    });
  }
});