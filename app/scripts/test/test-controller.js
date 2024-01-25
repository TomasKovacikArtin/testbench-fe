appModul.controller('TestCtrl', function ($scope, $stateParams, Test, confirm, $state, $interval, TEST_STATE, auth, growl) {

  $scope.qIndex = 1;
  var wasVisitedLastQuestion = false;

  $scope.test = Test.get({id: $stateParams.id, simple: true}, function () {
    actualizeQuestion();
    updateTest();
  });

  function actualizeQuestion() {
    $scope.question = $scope.test.questions[$scope.qIndex - 1];
  }

  $scope.hasNextQuestion = function () {
    return $scope.test.questions && $scope.qIndex < $scope.test.questions.length;
  };

  $scope.wasVisitedLastQuestion = function () {
    if ($scope.test && $scope.test.questions && $scope.qIndex == $scope.test.questions.length && !wasVisitedLastQuestion) {
      wasVisitedLastQuestion = true;
    }
    return wasVisitedLastQuestion;
  };

  $scope.hasPreviousQuestion = function () {
    return $scope.test.questions && $scope.qIndex > 1;
  };

  $scope.nextQuestion = function () {
    updateTest();
    if ($scope.hasNextQuestion()) {
      $scope.qIndex++;
      $scope.test.$fillingTest(actualizeQuestion);
      actualizeQuestion();
    }
  };

  $scope.previousQuestion = function () {
    updateTest();
    if ($scope.hasPreviousQuestion()) {
      $scope.qIndex--;
      $scope.test.$fillingTest(actualizeQuestion);
      actualizeQuestion();
    }
  };

  $scope.finishTest = function () {
    updateTest();
    destroyInterval();
    confirm('Completion', 'Do you really want to finish the test? After finish test you can not continue filling the test')
      .then(function () {
        $scope.markTestAsFinished().then(function () {
          confirm('Test saved', 'Test has been saved!', 'info').then(function () {
            $state.go('user-tests-finished');
          });
        });
      }, function () {
        updateTest();
        initInterval();
      });
  };

  $scope.isLittleTime = function () {
    return $scope.test.remainingSeconds < 120;
  };

  $scope.markTestAsFinished = function () {
    return $scope.test.$save({finish: true});
  };

  function updateTest() {
    $scope.test.questions[$scope.qIndex - 1] = $scope.question;
    $scope.test.$fillingTest().then(function (test) {
      // for test without a time limit
      if (test.remainingSeconds < 1 && test.timeSeconds) {
        destroyInterval();
        $scope.markTestAsFinished().then(function () {
          confirm('Info', 'Your time is up', 'info')
            .then(function () {
              confirm('Test saved', 'Test has been saved!', 'info').then(function () {
                $state.go('user-tests-finished');
              });
            });
        });
      } else {
        $scope.$broadcast('timer-set-countdown', test.remainingSeconds);
      }
    });
  }

  var intervalPromise = $interval(updateTest, 1000);

  $scope.$on('$destroy', function () {
    destroyInterval();
  });

  function destroyInterval() {
    if (intervalPromise)
      $interval.cancel(intervalPromise);
  }

  function initInterval() {
    intervalPromise = $interval(updateTest, 1000);
  }
});
