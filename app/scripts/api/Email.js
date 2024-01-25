appModul.factory('Email', function ($resource) {
  return $resource('api/emails', {}, {
    forgottenPassword: {method: 'POST', params: {action: "forgottenPassword"}},
    sendConfirmationEmailAgain: {method: 'POST', params: {action: "sendConfirmationEmailAgain"}}
  });
});
