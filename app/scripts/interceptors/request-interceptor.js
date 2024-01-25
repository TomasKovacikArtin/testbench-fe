appModul.factory('requestInterceptor', function ($q, $rootScope) {
  $rootScope.pendingRequests = 0;
  return {
    'request': function (config) {
      addPendingRequest(config);
      return config || $q.when(config);
    },

    'requestError': function (rejection) {
      removePendingRequest();
      return $q.reject(rejection);
    },

    'response': function (response) {
      removePendingRequest();
      return response || $q.when(response);
    },

    'responseError': function (rejection) {
      removePendingRequest();
      return $q.reject(rejection);
    }
  }

  function addPendingRequest(config) {
    if (!config.skipShowIndicator) {
      $rootScope.pendingRequests++
    }
  }

  function removePendingRequest() {
    if ($rootScope.pendingRequests > 0) {
      $rootScope.pendingRequests--;
    }
  }
});