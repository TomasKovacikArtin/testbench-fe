appModul.factory('auth', function ($rootScope, $q, $injector) {
  return {
    currentUser: null,
    branchValue: null,

    isAuthenticated: function () {
      return this.currentUser && this.currentUser.$resolved;
    },

    hasRole: function (role) {
      return this.currentUser && _.contains(this.currentUser.roles, role);
    },

    authenticate: function () {
      var self = this;
      var deferred = $q.defer();

      if (!self.currentUser) {
        self.checkAuthentication()
          .then(function (user) {
            deferred.resolve(user);
          })
          .catch(function () {
              self.currentUser = null;
              return $modal().open({
                templateUrl: 'app/scripts/login/login.html',
                controller: 'LoginCtrl',
                backdrop: 'static',
                keyboard: false
              }).result
                .then(function (action) {
                  self.currentUser = User().current();
                  deferred.resolve(self.currentUser);
                  self.currentUser.$promise.then( function() {
                    self.addJiraFeedbackButton();
                  });
                })
                .catch(function () {
                  self.currentUser = null;
                  deferred.reject('Login failed');
                });
            }
          );
      }
      else {
        deferred.resolve(self.currentUser);
      }

      return deferred.promise;
    },

    authenticateCandidate: function (branch) {
      branchValue = branch;
      var self = this;
      var deferred = $q.defer();

      if (!self.currentUser) {
        self.checkAuthentication()
          .then(function (user) {
            deferred.resolve(user);
          })
          .catch(function () {
              self.currentUser = null;
              return $modal().open({
                templateUrl: 'app/scripts/login/login-candidate.html',
                controller: 'LoginCtrl',
                backdrop: 'static',
                keyboard: false
              }).result
                .then(function (action) {
                    self.currentUser = User().current();
                    deferred.resolve(self.currentUser);
                })
                .catch(function () {
                  self.currentUser = null;
                  deferred.reject('Login failed');
                });
            }
          );
      }
      else {
        deferred.resolve(self.currentUser);
      }

      return deferred.promise;
    },

    checkAuthentication: function () {
      var self = this;
      if (!self.currentUserPromise) {
        self.currentUserPromise = User().current().$promise;
      }
      self.currentUserPromise
        .then(function (user) {
          self.currentUser = user;
          self.addJiraFeedbackButton();
          return user;
        })
        .catch(function () {
          self.currentUser = null;
        })
        .finally(function () {
          self.currentUserPromise = null;
        });

      return self.currentUserPromise;
    },

    refreshUserDetail: function () {
      this.checkAuthentication();
    },

    login: function (email, password, firstName, lastName) {
      return $http().post('api/users/login', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).success(function () {
      });
    },

    loginCandidate: function(email, firstName, lastName) {
      var branch = branchValue;
      return $http().post('api/users/login-candidate', {
        email: email,
        firstName: firstName,
        lastName: lastName,
        branch: branch
      }).success(function () {
      });
    },

    logout: function () {
      var self = this;
      if (self.currentUser) {
        return $http().post('api/users/' + self.currentUser.id + '/logout').success(function () {
          self.currentUser = null;
          //Remove Jira Trigger button
          document.getElementById("atlwdg-trigger").remove();
        });
      }
    },

    removeCurrentUser: function () {
      this.currentUser = null;
    },

    addJiraFeedbackButton: function() {
      if (this.currentUser) {
        var elScript = document.createElement("script");
        elScript.src = "https://jira.artin.cz/s/b76a795291186b650bb215f121ff4f6c-T/upltft/808000/88f32109c8d3a305353fedb1d46faba9/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=d861fe29";
        elScript.async = false;
        document.head.appendChild(elScript);
        window.ATL_JQ_PAGE_PROPS = $.extend(window.ATL_JQ_PAGE_PROPS, {
          fieldValues: {
            fullname: this.currentUser.firstName + ' ' + this.currentUser.lastName,
            email: this.currentUser.email
          }
        });
      }
    }
  };

  function $modal() {
    return $injector.get('$modal');
  }

  function $http() {
    return $injector.get('$http');
  }

  function User() {
    return $injector.get('User');
  }
});
