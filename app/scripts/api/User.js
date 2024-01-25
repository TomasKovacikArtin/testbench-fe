appModul.factory('User', function ($resource) {
  return $resource('api/users/:id', {id: '@id'}, {
    current: {method: 'GET', params: {current: true, full: false}},
    currentFullDetail: {method: 'GET', params: {current: true, full: true}},
    tests: {url: 'api/users/:id/tests', method: 'GET', isArray: true},
    updateCurrentPersonInfo: {url: 'api/users/', method: 'POST', params: {current: true}},
    updateCurrentPassword: {url: 'api/users/', method: 'POST', params: {current: true, password: true}}
  });
});
