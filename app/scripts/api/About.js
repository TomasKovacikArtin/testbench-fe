appModul.factory('About', function ($resource) {
  return $resource('api/about', {}, {
    version: {
      method: 'GET', url: "api/about/version", isArray: false, transformResponse: function (data) {
        return {data: data};
      }
    }
  });
});
