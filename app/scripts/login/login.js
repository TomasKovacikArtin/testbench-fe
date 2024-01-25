appModul.controller('LoginCtrl', function ($scope, $modalInstance, auth, $state, Email, confirm, growl) {

  $scope.loginUser = function () {
    if ($scope.loginForm.$valid) {
      auth.login($scope.login.email, $scope.login.password, $scope.login.firstName, $scope.login.lastName)
        .success(function (res) {
          $modalInstance.close(res.action);
        })
        .error(function (error) {
          handleErrorMessages(error.message);
        });
    }
  };

  $scope.loginCandidate = function() {
    if ($scope.loginForm.$valid) {
      auth.loginCandidate($scope.login.email, $scope.login.firstName, $scope.login.lastName)
        .success(function (res) {
          $modalInstance.close(res.action);
        })
        .error(function (error) {
          handleErrorMessages(error.message);
        });
    }
  };

  $scope.cancel = function () {
    $state.go('welcome');
    $modalInstance.dismiss('cancel');
  };

  $scope.sendNewPassword = function () {
    $scope.submittedEmails = true;

    Email.forgottenPassword($scope.login.email).$promise.then(function () {
      growl.addSuccessMessage("Password has been sent to your email");
    }, function (error) {
      handleErrorMessages(error.data.message);
    });
  };

  $scope.changePassword = function () {
    if ($scope.login.password == "") {
      $scope.login.password = undefined
    }
  };

  $scope.interacted = function (field) {
    return $scope.loginForm.$submitted || field.$dirty || $scope.submittedEmails;
  };

  function handleErrorMessages(message) {
    if (message === 'User does not exist') {
      growl.addErrorMessage('Email has not been sent. The user with this email does not exist');
    }
    if (message === 'Pre user does not need password') {
      growl.addErrorMessage('Email has not been sent. The user with this email is not registered. You can log in without password (Log in as Candidate)');
    }
    if (message === 'User is not confirmed') {
      growl.addErrorMessage('Email has not been sent. The user is not confirmed');
    }
    if (message === 'You are not registered user') {
      growl.addErrorMessage('You are not registered user!!. If you are a candidate please use a form Log in as Candidate, otherwise for a registration you need to contact a administrator');
    }
    if (message === 'Your are not confirmed') {
      growl.addErrorMessage('You has not confirmed the verification email yet');
    }
    if (message === 'Incorrect email or password') {
      growl.addErrorMessage('Incorrect email or password.');
    }
    if(message === 'You are registered user') {
      growl.addErrorMessage('You are already registered user. You need to use a form with the password field (Log in as User)');
    }
    if(message === 'You are pre-user') {
      growl.addErrorMessage('You are candidate. Please use a form Log in as Candidate. You do not need the password');
    }
  }

});