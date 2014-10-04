# tmpvar-future-awate

wait for an array of tmpvar-futures to complete

## install

```npm install tmpvar-future tmpvar-future-wait```

## use 

```javascript

var future = require('tmpvar-future');
var wait = require('tmpvar-future-wait');

var f1 = future();
var f2 = future();

var f3 = wait(f1, f2)

f3(function(e, r) {
  console.log(e); // null
  console.log(r); // ['abc', 123]
})

f1(null, 'abc');
f2(null, 123);

```

see [test.js](test.js) for more examples

## license

[MIT](LICENSE.txt)
