moohlah
=======

JQuery like system for more than just the DOM

Install
=======
npm install moohlah

Usage
=====

Basic Usage
-----------

```javascript
$ = require('moohlah')();

$.register('split',function(arg) {
 return this.split(arg);
});

$('blank plank').split(' ');
//results in ['blank','plank']

$(['blank','plank']).split('a');
//results in ['bl','nk','pl']
```


Just like in JQuery duplicates are removed.

How is this different than just using JQuery's $.fn.func = ...

The behind the scenes of JQuery is not as sophisticated as some might suspect.
The result of every JQuery call producing a set with only unique elements is not actually a feature of JQuery.  Jquery developers have just done a really good job writing each of the standard functions so that they only return sets.  They have taken the hard way to develop JQuery making it more difficult for you to add on to it.

When we write a function for $.fn the this object we get for the function is really just the list we were working with on the outside.  JQuery doesn't do anything to break the elements up for you, concatenate results, and remove duplicates and empty elements.

In JQuery the above function would have been properly written:

```javascript
$.fn.split=function(arg) {
 var retr=[];
 this.toArray().forEach(function(item) {
  retr = retr.concat(item.split(arg));
 });
 return lodash.select(lodash.uniq(retr),function(item){return item;});
}
```


Multiple implementations in one program
---------------------------------------

The entire inspiration for moohlah is that JQuery is geared towards HTML elements and not for other kinds of objects we might work with in an environment like NodeJS.

Creating additional instances of the library whose configurations won't interfere is easy.  As you may have recalled after we used require to load the module we called it as a function. We can do this as many times as we want to create set templates that operate distinctly.

```javascript
var moohlah = require('moohlah'),
 $ = moohlah(),
 _ = moohlah();
```

We also can use this to preregister functions or store template configurations in separate files.

```javascript
$ = moohlah(require('./peopleSets.js'));

_ = moohlah({split: function(arg) {return this.split(arg)}
            ,print: function() { console.log(this) }
          });

π = moohlah(function($) {
 $.register('parent',function () {return this.parentElement;});
 //registerDumb binds to the set rather than to each element in the set.
 $.registerDumb('first',function() {return $(this.toArray().split(0,1));});
}
  

```


Just for fun
============

The entire point of this module is to work with graphs.  After all this is based on JQuery which works with a special kind of graph, the DOM, which is a simple example of a tree.

Here's a bit of fun:

```javascript
function Person() {
 this.peopleIKnow;
}


$Bacon = moohlah();


$Bacon.register('peopleKnown',function() {
 return this.peopleIKnow;
}

$Bacon.registerDumb('contains',function(lookingFor) {
 return lodash.contains(this.toArray(),lookingFor);
});


function baconNumber(person) {
 var baconators = $Bacon(person),
  count=0;
  
 while(true) {
  ++c;
  baconators = baconators.peopleKnown();
  if(baconators.contains(kevinBacon)) {
   return c;
  }
 }
}
```
