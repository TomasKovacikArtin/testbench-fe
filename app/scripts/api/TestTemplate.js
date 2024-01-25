appModul.factory('TestTemplate', function ($resource) {
  return $resource('api/test-template/:id', {'id': '@id'}, {
    deleteQuestion: {url: 'api/test-template/:id/questions/:questionId', method: 'DELETE'},
    findSimple: {method: 'GET', params: {simple: true}, isArray: true}
  });

});
