appDirectives.directive('testInfo', function () {
    return {
        restrict: 'E',
        scope: {
            test: "="
        },
        templateUrl: './app/scripts/components/test-info/test-info.html',
        controller: function ($scope) {

            $scope.diffInTime = function () {
                if (!$scope.test.finishTime || !$scope.test.evaluationDate) {
                    return "No info about evaluation time";
                }

                var timeDiff = Math.abs($scope.test.finishTime - $scope.test.evaluationDate);

                var minutes = Math.floor(timeDiff / (60 * 1000) % 60);
                var hours = Math.floor(timeDiff / (60 * 60 * 1000) % 24);
                var days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));


                return buildTimeString(days, hours, minutes);
            };

            $scope.getFormatUser = function (user) {
                if (user) {
                    return (user.lastName) ? (user.firstName + " " + user.lastName + " | " + user.email) : user.email;
                }
                return "No user found";
            };

            $scope.getEvaluationDate = function (evaluationDate) {
                return evaluationDate ? displayTime(evaluationDate) : "No info about date"
            };

            $scope.getFormatEvaluator = function (evaluator) {
                if (evaluator) {
                    return (evaluator.lastName) ? (evaluator.firstName + " " + evaluator.lastName + " | " + evaluator.email) : evaluator.email;
                }
                return "No evaluator found";
            };

            function displayTime(date) {
                var dateAndTime = new Date(date);
                var hours = (dateAndTime.getHours() < 10 ? '0' + dateAndTime.getHours() : dateAndTime.getHours());
                var minutes = (dateAndTime.getMinutes() < 10 ? '0' + dateAndTime.getMinutes() : dateAndTime.getMinutes());
                var seconds = (dateAndTime.getSeconds() < 10 ? '0' + dateAndTime.getSeconds() : dateAndTime.getSeconds());
                return dateAndTime.getDate() + "." + (dateAndTime.getMonth() + 1) + "." + dateAndTime.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
            }

            function buildTimeString(days, hours, minutes) {
                var result = "";
                if (days > 0) {
                    result += days;
                    if (days === 1) {
                        result += " day "
                    } else {
                        result += " days "
                    }
                }
                if (hours > 0) {
                    result += hours;
                    if (hours === 1) {
                        result += " hour "
                    } else {
                        result += " hours "
                    }
                }
                if (minutes > 0) {
                    result += minutes;
                    if (minutes === 1) {
                        result += " minute "
                    } else {
                        result += " minutes "
                    }
                }
                return result;
            }
        }
    }

});
