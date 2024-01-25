appModul.controller('createTemplateCtrl', function ($scope, INPUT_TYPE, QUESTION_TYPE, TECHNOLOGY, TestTemplate, $stateParams, growl, TECHNOLOGIES, User) {

  if ($stateParams.id) {
    $scope.template = TestTemplate.get({id: $stateParams.id});
  } else {
    $scope.template = new TestTemplate({questions: []});
  }

  $scope.admins = User.query({role: "ADMIN"});


  $scope.answerTypes = [
    {code: "seznam", name: "List", questionType: QUESTION_TYPE.MULTIPLE_CHOICE},
    {code: "text", name: "Text", questionType: QUESTION_TYPE.FILL, answerInput: INPUT_TYPE.PLAIN_TEXT},
    {
      code: "codeJava",
      name: "Kód - Java",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.JAVA
    },
    {
      code: "codeJavaScript",
      name: "Kód - JavaScript",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.JAVASCRIPT
    },
    {
      code: "codeCpp",
      name: "Kód - C++",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.CPP
    },
    {
      code: "codeDelphi",
      name: "Kód - Delphi",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.DELPHI
    },
    {
      code: "codeNet",
      name: "Kód - .NET(C#)",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.NET
    },
    {
      code: "codePhp",
      name: "Kód - PHP",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.PHP
    },
    {
      code: "codePython",
      name: "Kód - Python",
      questionType: QUESTION_TYPE.FILL,
      answerInput: INPUT_TYPE.CODE,
      answerTechnology: TECHNOLOGY.PYTHON
    },

  ]

  $scope.technologies = TECHNOLOGIES.ENUMERATION;

  $scope.addQuestion = function (resetQuestionDefinition) {
    if (!$scope.existingQuestion) {
      $scope.template.questions.push($scope.question);
    }
    $scope.setDefaultQuestion();
    if (resetQuestionDefinition) {
      $scope.setQuestionDefinition();
    }
    $scope.changeQuestionDefinition();
    $scope.saveTemplate();
  };

  $scope.saveTemplate = function () {
    if (!$scope.isNotTemplateValid()) {
      $scope.template.$save(function () {
        growl.addSuccessMessage('Template has been saved');
      });
    }
  };

  $scope.initNewQuestion = function () {
    $scope.setDefaultQuestion();
    $scope.setQuestionDefinition();
  }

  $scope.loadQuestion = function (q) {
    $scope.question = q;
    $scope.testAnswer = {};
    $scope.existingQuestion = true;

    if ($scope.question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
      $scope.questionDefinition = $scope.answerTypes[0];
    } else {
      if ($scope.question.answer.technology == TECHNOLOGY.JAVASCRIPT) {
        $scope.questionDefinition = $scope.answerTypes[3];
      } else if ($scope.question.answer.technology == TECHNOLOGY.JAVA) {
        $scope.questionDefinition = $scope.answerTypes[2];
      } else if ($scope.question.answer.technology == TECHNOLOGY.CPP) {
        $scope.questionDefinition = $scope.answerTypes[4];
      } else if ($scope.question.answer.technology == TECHNOLOGY.DELPHI) {
        $scope.questionDefinition = $scope.answerTypes[5];
      } else if ($scope.question.answer.technology == TECHNOLOGY.NET) {
        $scope.questionDefinition = $scope.answerTypes[6];
      } else if ($scope.question.answer.technology == TECHNOLOGY.PHP) {
        $scope.questionDefinition = $scope.answerTypes[7];
      } else if ($scope.question.answer.technology == TECHNOLOGY.PYTHON) {
        $scope.questionDefinition = $scope.answerTypes[8];
      } else {
        $scope.questionDefinition = $scope.answerTypes[1];
      }
    }

  };

  $scope.addAnswer = function () {
    if (!$scope.question.answers) {
      $scope.question.answers = [];
    }

    if ($scope.testAnswer) {
      $scope.question.answers.push($scope.testAnswer);
      $scope.question.singleMultipleAnswer = $scope.question.answers.filter(function (a) {
        return a ? a.correct : false;
      }).length == 1;
      $scope.testAnswer = {};
    }
  };

  $scope.setAnswerCorrect = function (index) {
    if (index != undefined) {
      $scope.question.answers[index].correct = !$scope.question.answers[index].correct;
      $scope.question.singleMultipleAnswer = $scope.question.answers.filter(function (a) {
        return a ? a.correct : false;
      }).length == 1;
    } else {
      $scope.testAnswer.correct = !$scope.testAnswer.correct;
    }
  };

  $scope.deleteQuestion = function (question) {
    $scope.template.$deleteQuestion({questionId: question.id}).then(function () {
      $scope.template.$get();
      growl.addSuccessMessage("Question has been saved");
    }, function () {
      $scope.template.$get();
      growl.addErrorMessage("Question has not been saved");
    });
  }

  $scope.removeAnswer = function (index) {
    $scope.question.answers.splice(index, 1);
  };

  $scope.isQuestionCodeBlockAdded = function () {
    return $scope.question.codeBlock;
  };

  $scope.showQuestionCodeBlock = function () {
    return $scope.isQuestionCodeBlockAdded() && $scope.question.codeBlockTechnology;
  };

  $scope.showAnswerInputCode = function () {
    return $scope.question.answer && $scope.question.answer.input == INPUT_TYPE.CODE && $scope.question.answer.technology;
  };

  $scope.showAnswerInputText = function () {
    return $scope.question.answer && $scope.question.answer.input == INPUT_TYPE.PLAIN_TEXT;
  };

  $scope.isQuestionTypeMultipleSelected = function () {
    return $scope.question.type == QUESTION_TYPE.MULTIPLE_CHOICE;
  };

  $scope.isNotTemplateValid = function () {
    return $scope.createTemplateForm.$invalid;
  }

  $scope.setDefaultQuestionCodeBlockTechnology = function () {
    $scope.question.codeBlockTechnology = TECHNOLOGY.COMMON;
  }

  $scope.canAddedQuestion = function () {
    return ($scope.template.name != null || $scope.template.name != undefined) && $scope.template.availableHrsIds && $scope.template.availableControllersIds;
  }

  $scope.isNotQuestionValid = function () {
    var notValid = $scope.createQuestionForm.$invalid;

    if ($scope.question.codeBlock) {
      notValid = notValid || (!$scope.question.codeBlockTechnology || !$scope.question.code);
    }

    if ($scope.question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
      notValid = notValid || (!$scope.question.answers || $scope.question.answers.length == 0);
    }

    if ($scope.question.answer && $scope.question.answer.input == INPUT_TYPE.CODE) {
      notValid = notValid || (!$scope.question.answer.technology);
    }

    return notValid;
  }

  $scope.changeQuestionDefinition = function () {
    $scope.question.answer = {};
    $scope.question.answers = [];

    if ($scope.questionDefinition.questionType) {
      $scope.question.type = $scope.questionDefinition.questionType;
    }

    if ($scope.questionDefinition.answerInput) {
      $scope.question.answer.input = $scope.questionDefinition.answerInput;
    }

    if ($scope.questionDefinition.answerTechnology) {
      $scope.question.answer.technology = $scope.questionDefinition.answerTechnology;
    }
  }

  $scope.$watch('question.codeBlockTechnology', function () {
    $scope.aceOptionBlockTechnology = {mode: $scope.question.codeBlockTechnology}
  });

  $scope.$watch('question.answer.technology', function () {
    if ($scope.question.answer) {
      $scope.aceOption = {mode: $scope.question.answer.technology}
    }
  });

  $scope.setDefaultQuestion = function () {
    $scope.question = {maxPoints: 1, answer: {}};
    $scope.testAnswer = {correct: false};
    $scope.existingQuestion = false;
  };

  $scope.setQuestionDefinition = function () {
    $scope.questionDefinition = $scope.answerTypes[0];
    $scope.changeQuestionDefinition();
  }

  $scope.setDefaultQuestion();
  $scope.setQuestionDefinition();


});