moohlah
=======

Jquery like system for more than just the dom

Usage
=====

Basic Usage
-----------

$ = require('moohlah')();

$.register('split',function(arg) {
 return this.split(arg);
});

$('blank plank').split(' ');

//results in ['blank','plank']

$(['blank','plank']).split('a');

//results in ['bl','nk','pl']


Just like in jquery duplicates are removed.

How is this different than just using jqueries $.fn.func = ...

The behind the scenes of jquery is not as sophisticated as some might suspect.
The result of every jquery call producing a set with only unique elements is not actually a featcher of jquery.  Jquery developers have just done a really good job writing each of the standard functions so that they only return sets.  They have taken the hard way to develop jquery making it more difficult for you to add on to it.

When we write a function for $.fn the argument we get the the function(arg) is really just the list we were working with on the outside.  Jquery doesn't do anything to break the elements up for you, concatonate results, and remove duplicates and empty elements.

In jquery the above function would have been properly written:

$.fn.split=function(arg) {
 var retr=[];
 this.toArray().forEach(function(item) {
  retr = retr.concat(item.split(arg));
 });
 return lodash.select(lodash.uniq(retr),function(item){return item;});
}


Multiple implementations in one program
---------------------------------------

The entire insparation for moohlah is that jquery is geared towards html elements and not for other kinds of objects we might work with in an environment like nodejs.

Creating additional instances of the libary whose configurations won't intefer is easy.  As you may have recalled after we used require to load the module we called it as a function. We can do this as many times as we want to create set templates that opperate distinctly.

var moohlah = require('moohlah'),
 $ = moohlah(),
 _ = moohlah();

We also can use this to preregister functions or store template configurations in seperate files.

$ = moohlah(require('./peopleSets.js'));
_ = moohlah({split: function(arg) {return this.split(arg)}
            ,print: function() { console.log(this) }
          });

Just for fun
------------

The entire point of this module is to work with graphs.  After this is based on jquery with works with a special kind of graph, the DOM, which is an example of a tree.

Here's a bit of fun.
          
function Person() {
 this.peopleIKnow;
}

$Bacon = moohlah();

$Bacon.register('peopleKnown',function() {
 return this.peopleIKnow;
}

function baconNumber(person) {
 var baconators = $Bacon(person),
  count=0;
 while(true) {
  ++c;
  baconators = baconators.peopleKnown();
  if(baconators.toArray().indexOf(kevinBacon) !== -1) {
   return c;
  }
 }
}





















