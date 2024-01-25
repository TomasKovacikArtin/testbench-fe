/**
 * Base class for enumeration. Every enumeration should inherit from that class.
 * The class contains main methods for using enumeration.
 * @constructor
 */
 var BaseEnumFactory = function () {

 }

 BaseEnumFactory.prototype.getValues = function (keys) {

  if(keys instanceof Array){
    keys = keys.toString();
  }

  if(keys != null){
    var keyArray = keys.split(",");
  }
  var self = this;

  var array = _.map(keyArray, function (key) {
    var result = _.findWhere(self.ENUMERATION, {id: key});

    if (result && result.value == undefined)
      throw "Enumeration must have property 'value'"

    return result.value;
  });

  return array.toString();
}


function createEnumeration(name, array) {
  var enumeration = function() {
    this.ENUMERATION = array;
  };

  extend(enumeration, BaseEnumFactory);

  appModul.register.factory(name, function(){
    return new enumeration();
  })
}

appModul.run(function(ROLES, TECHNOLOGY, BRANCHES) {
  createEnumeration("TECHNOLOGIES", [
    {id: TECHNOLOGY.JAVA, value: 'Java'},
    {id: TECHNOLOGY.JAVASCRIPT, value: 'JavaScript'},
    {id: TECHNOLOGY.CPP, value: 'C++'},
    {id: TECHNOLOGY.DELPHI, value: 'Delphi'},
    {id: TECHNOLOGY.NET, value: '.Net(C#)'},
    {id: TECHNOLOGY.PHP, value: 'PHP'},
    {id: TECHNOLOGY.PYTHON, value: 'Python'},
    {id: TECHNOLOGY.COMMON, value: "Obecný kód"}]);

  createEnumeration('ENUM_ROLES', [
    {id: ROLES.PRE_USER, value: 'Candidate'},
    {id: ROLES.USER, value: 'User'},
    {id: ROLES.ADMIN, value: 'Admin'},
    {id: ROLES.SUPER_ADMIN, value: 'Superman'}]);

  createEnumeration('ENUM_BRANCHES', [
    {id: BRANCHES.BRNO, value: 'Brno'},
    {id: BRANCHES.PRAHA, value: 'Praha'},
    {id: BRANCHES.BRATISLAVA, value: 'Bratislava'},
    {id: BRANCHES.NULL, value: 'No branch selected'}]);
})



