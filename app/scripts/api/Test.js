appModul.factory('Test', function ($resource) {
  return $resource('api/tests/:id', {'id': '@id'}, {
    create: {method: 'POST', params: {createFromTemplate: '@templateId'}},
    current: {method: 'GET', params: {current: true}, isArray: true},
    results: {method: 'GET', params: {results: true}},
    fillingTest: {method: 'POST', params: {filling: true}, skipShowIndicator: true},
    listTests: {method: 'GET', params: {pageable: true}}
  });
});
