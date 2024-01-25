appDirectives.directive('question', function () {
  return {
    restrict: 'E',
    scope: {
      question: '=quest',
      disabled: '@',
      showResults: '@',
      editResults: '=',
      testMode: '@',
      updateTestParent: '&updateTestMethod'
    },
    templateUrl: './app/scripts/components/question/question.html',
    controller: function ($scope, INPUT_TYPE, QUESTION_TYPE) {

      $scope.isQuestionTextCode = function () {
        return $scope.question && $scope.question.codeBlock;
      };

      $scope.showOptions = function () {
        return $scope.question && $scope.question.type == QUESTION_TYPE.MULTIPLE_CHOICE;
      };

      $scope.isQuestionTypeFill = function () {
        return $scope.question && $scope.question.type == QUESTION_TYPE.FILL
      };

      $scope.showCheckboxes = function () {
        return !$scope.showRadioButtons();
      };

      $scope.showRadioButtons = function () {
        return $scope.question.singleMultipleAnswer;
      };

      $scope.answerSelected = function (index) {
        for (var i = 0; i < $scope.question.answers.length; i++) {
          var answer = $scope.question.answers[i];
          answer.marked = i === index;
        }
      };

      $scope.markAsCorrectedAnswer = function () {
        $scope.question.points = 1;
        $scope.updateTest();
      }

      $scope.markAsIncorrectedAnswer = function () {
        $scope.question.points = 0;
        $scope.updateTest();
      }

      $scope.showPlainTextAnswer = function () {
        return $scope.question && $scope.question.answer && $scope.question.answer.input == INPUT_TYPE.PLAIN_TEXT
      }

      $scope.showCodeFormatingAnswer = function () {
        return $scope.question && $scope.question.answer && $scope.question.answer.input == INPUT_TYPE.CODE
      }

      $scope.getAceOption = function () {
        if ($scope.showCodeFormatingAnswer()) {
          return {
            mode: $scope.question.answer.technology,
            onLoad: $scope.aceLoadedAnswer,
            onChange: $scope.aceChangedAnswer
          };
        }
      }

      $scope.getAceOptionQuestionCodeBlock = function () {
        if ($scope.isQuestionTextCode()) {
          return {
            mode: $scope.question.codeBlockTechnology,
            onLoad: $scope.aceLoadedQuestion,
            onChange: $scope.aceChangedQuestion
          };
        }
      }

      $scope.aceLoadedAnswer = function (_editor) {
        _editor.setReadOnly($scope.disabled);
      };

      $scope.aceLoadedQuestion = function (_editor) {
        _editor.setReadOnly($scope.disabled || $scope.testMode);
      };

      $scope.showRatingButtons = function () {
        return $scope.editResults && ( $scope.isQuestionTypeFill() && $scope.question.maxPoints == 1 );
      }

      $scope.showRatingInput = function () {
        return $scope.editResults && $scope.question.maxPoints > 1;
      }

      $scope.updateTest = function () {
        if (!$scope.updateTestParent) {
          console.error("Update method for test has to be set");
        } else {
          $scope.updateTestParent();
        }
      }
    }
  };
});