appModul.factory('errorInterceptor', function ($q, $injector, auth) {
  return {
    responseError: function (response) {
      //TODO TM: dodelat
      if (response.status === 401) {
        console.log('interceptor - 401 caught');
        auth.removeCurrentUser();
      }
      if (response.status === 403) {
        $modal().open({
          templateUrl: "app/scripts/utils/authentication-error/authentication-error.html",
          controller: 'AuthenticationErrorModelCtrl'
        });
      }

      return $q.reject(response);
    }
  };

  function $modal() {
    return $injector.get('$modal');
  }

  function $state() {
    return $injector.get('$state');
  }
});
