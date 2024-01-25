appModul.filter('enumValues' ,function($injector) {
  var injector = $injector;
  return function(keys, enumName) {
    var enumeration = injector.get(enumName);

    if(!enumeration) {
      throw enumName + 'does not exist in that application';
    }

    return enumeration.getValues(keys);
  }
})