/**
 * This function is used for create relation child - parent for javascript classes.
 * @param child
 * @param parent
 */
 function extend(child, parent){
 	var F = function () {};
 	F.prototype = parent.prototype;
 	child.prototype = new F();
 }