var underscore = require('underscore');

$=(function() {
 function Set(array) {
  this.array=underscore.select(underscore.uniq(array),function(item){return item;});
 }
 $ = function(input) {
  return new Set([].concat(input));
 }
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

$.register('split',function(arg) { return this.split(arg)})


