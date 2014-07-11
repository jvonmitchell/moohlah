//Depends on underscore to make arrays into sets and to drop empty items
var underscore = require('underscore');

$=(function() {
 //This is the type of object returned by $(..)
 function Set(array) {
  //Remove duplicates and remove empty elements
  this.array=underscore.select(underscore.uniq(array),function(item){return item;});
 }
 $ = function(input) {
  //Convert input to array before it is sent to Set constructor
  return new Set([].concat(input));
 }
 //A function for registering functions we can perform on Sets
 //Form of $.register('split',function(arg) {return this.split(arg)});
 //This will perform the operation on each element and concat the results into the resulting set.
 $.register = function(funcName,func) {
  Set.prototype[funcName] = function() {
   var args = arguments,
    retrArray = [];
   console.log('this',this);
   this.array.forEach(function(item) {
    retrArray = retrArray.concat(func.apply(item,args));
   });
   return new Set(retrArray);
  }
 }
 return $;
})();

//This is an example function
$.register('split',function(arg) { return this.split(arg)})


