

$ = require('../moohlah')();

test = {};

$.register('nulltest',function () {
 return null;
});  //should be empty;
test.nulltest = function (result) {
 return result.length() === 0;
}

$.register('undeftest',function () {
 //noop;
});  //should be empty;
test.undeftest = test.nulltest;

$.register('zerotest',function () {
 return 0;
});  //should be 0;
test.zerotest = function (result) {
 return result.sub(0) === 0;
};

$.register('expandtest',function () {
 return [this,Math.random()];
}); //should be longer;
test.expandtest = function (result,old) {
 return result.length() === old.length()*2;
}


$.register('emptystringtest',function () {
 return '';
}); //should be empty;
test.emptystringtest = test.nulltest;


$.register('zerostringtest',function () {
 return '0';
}); //should be "0";
test.zerostringtest = function (result) {
 return result.sub(0) === "0";
};


a=$(['hello','world']);

['nulltest','undeftest','zerotest','expandtest','emptystringtest','zerostringtest'].forEach(function(item) {
 var result = a[item]();
 console.log(item,a[item](),test[item](result,a));
});







