//Depends on underscore to make arrays into sets and to drop empty items
var underscore = require('lodash');

//Calling this function will return the $ library.  You can initiat that instance of the library with a functions list and those functions will be preregistered with that instance of the library.
module.exports = $maker = (function(functions) {
 //This is the type of object returned by $(..)
 function Set(array) {
  //Remove duplicates and remove empty elements
  this.array=underscore.select(underscore.uniq(array),function(item){return item;});
 }
 var handleOnString;
 $ = function(input) {
  console.log(handleOnString);
  if(input instanceof Set) {
   return input;
  }
  else {
   //If this is a string and we have a handle for that pass it through the handler.
   if(handleOnString && typeof input === 'string') {
    input = handleOnString(input);
   }
   //Convert input to array before it is sent to Set constructor
   return new Set([].concat(input));
  }
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
 $.registerDumb = function(funcName,func) {
  Set.prototype[funcName] = func;
 }
 $.registerStringHandler = function(func) {
  handleOnString=func;
 }
 if(functions) {
  if(functions instanceof Function) {
   functions($);
  }
  else {
   Object.keys(functions).forEach(function(funcName) {
    if(funcName!=='dumb' && funcName!=='stringHandle') {
     $.register(funcName,functions[funcName]);
    }
   });
   if(functions.dumb) {
    var dumbs=functions.dumb;
    Object.keys(dumbs).forEach(function(funcName) {
     $.registerDumb(funcName,dumbs[funcName]);
    });
   }
   if(functions.stringHandle) {
    handleOnString=functions.stringHandle;
   }
  }
 }
 $.registerDumb('toArray',function() {
  return this.array;
 });
 $.registerDumb('sub',function(i) {
  return this.array[i];
 })
 $.registerDumb('length',function() {
  return this.array.length;
 });
 $.registerDumb('add',function(additions) {
  additions=$(additions);
  return $(this.toArray().concat(additions.toArray()));
 });
 return $;
});


