var appModul = angular.module('testBenchApp', ['ui.router', 'ui.bootstrap', 'appDirectives', 'ui.ace', 'timer', 'ngResource', 'angular-growl', 'appFilters', 'ngMessages', 'isteven-multi-select']);

appModul.config(function ($stateProvider, $urlRouterProvider) {
  // Set up the states
  $stateProvider
  .state('layout', {
    abstract: true,
    controller: 'LayoutCtrl',
    templateUrl: 'app/scripts/layout/layout.html'
  })
  .state('authenticated', {
    abstract: true,
    parent: 'layout',
    template: '<div ui-view></div>',
    resolve: {
      login: function (auth) {
        return auth.authenticate();
      }
    }
  })
  .state('user', {
    abstract: true,
    parent: 'layout',
    template: '<div ui-view></div>',
    resolve: {
      checkUser: function (auth, warn, $state) {
        return auth.checkAuthentication().then(function () {
          if (!auth.hasRole('USER') && !auth.hasRole('ADMIN') && !auth.hasRole('SUPER_ADMIN')) {
            return warn('Permission denied', 'You are not authorized.').finally(function () {
              $state.go('welcome');
            })
          }
        })
      }
    }
  })
  .state('admin-only', {
    abstract: true,
    parent: 'authenticated',
    template: '<div ui-view></div>',
    resolve: {
      checkAdmin: function (auth, warn, $state) {
        return auth.checkAuthentication().then(function () {
          if (!auth.hasRole('ADMIN')) {
            return warn('Permission denied', 'You are not authorized.').finally(function () {
              $state.go('welcome');
            })
          }
        })
      }
    }
  })
  .state('super-admin-only', {
    abstract: true,
    parent: 'authenticated',
    template: '<div ui-view></div>',
    resolve: {
      checkAdmin: function (auth, warn, $state) {
        return auth.checkAuthentication().then(function () {
        if (!auth.hasRole('SUPER_ADMIN')) {
          return warn('Not authorized', 'You do not have a permission.').finally(function () {
            $state.go('welcome');
          })
        }
        })
      }
    }
  })
  .state('welcome', {
    parent: 'layout',
    url: '/:branchId',
    controller: 'WelcomeCtrl',
    templateUrl: 'app/scripts/welcome/welcome.html'
  })
  .state('confirm', {
    parent: 'layout',
    url: '/confirm/:key',
    controller: 'WelcomeCtrl',
    templateUrl: 'app/scripts/welcome/welcome.html'
  })
  .state('fill-test', {
    parent: 'authenticated',
    url: '/tests/:id',
    controller: 'TestCtrl',
    templateUrl: 'app/scripts/test/test.html'
  })
  .state('user-profile', {
    parent: 'user',
    url: '/user/profile',
    controller: 'UserProfileCtrl',
    templateUrl: 'app/scripts/user/profile/profile.html'
  })
  .state('user-test-finished', {
    parent: 'user',
    url: '/user/tests/:id/finished',
    controller: 'TestFinishedCtrl',
    templateUrl: 'app/scripts/user/tests/test-finished.html'
  })
  .state('user-tests-finished', {
    parent: 'authenticated',
    url: '/user/tests/finished',
    controller: 'TestsFinishedCtrl',
    templateUrl: 'app/scripts/user/tests/list-test-finished.html'
  })
  .state('create-template', {
    parent: 'admin-only',
    url: '/templates/new',
    controller: 'createTemplateCtrl',
    templateUrl: 'app/scripts/template/create-template.html'
  })
  .state('list-template', {
    parent: 'admin-only',
    url: '/templates/list',
    controller: 'listTemplateCtrl',
    templateUrl: 'app/scripts/template/list-template.html'
  })
  .state('edit-template', {
    parent: 'admin-only',
    url: '/templates/:id',
    controller: 'createTemplateCtrl',
    templateUrl: 'app/scripts/template/create-template.html'
  })
  .state('test-result', {
    parent: 'admin-only',
    url: '/admin/tests/:id/result',
    controller: 'TestResultCtrl',
    templateUrl: 'app/scripts/test-results/test-result.html'
  })
  .state('list-test-result', {
    parent: 'admin-only',
    url: '/admin/tests/result',
    controller: 'ListTestResultCtrl',
    templateUrl: 'app/scripts/test-results/list-test-result.html'
  })
  .state('list-user', {
    parent: 'super-admin-only',
    url: '/super-admin/users',
    controller: 'ListUserCtrl',
    templateUrl: 'app/scripts/users/list-user.html'
  })
  .state('edit-user', {
    parent: 'super-admin-only',
    url: '/super-admin/users/:id',
    controller: 'EditUserCtrl',
    templateUrl: 'app/scripts/users/edit-user.html'
  })

  $urlRouterProvider.otherwise("/");
})

.config(function ($httpProvider, $provide, growlProvider) {

  appModul.register = {factory: $provide.factory,service: $provide.service,constant: $provide.constant};


  $httpProvider.interceptors.push('errorInterceptor');
  $httpProvider.interceptors.push('requestInterceptor');
  growlProvider.onlyUniqueMessages(false);
  growlProvider.globalTimeToLive(6000);
})

.run(function ($rootScope, auth) {
  $rootScope.auth = auth;

  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.previousStateName = fromState.name;
    $rootScope.previousStateParams = fromParams;
  });

  auth.checkAuthentication();
});