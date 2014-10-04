var test = require('tape');
var wait = require('./tmpvar-future-wait');
var future = require('tmpvar-future');

test('resolves immediately when passed primitives', function(t) {

  var f = wait(1, 'a', function(err, args) {
    called = true;
    t.equal(args[0], 1);
    t.equal(args[1], 'a');
    t.end();
  });

});

test('returns a future', function(t) {

  var f = wait(1);
  f(function(e, a) {
    t.equal(a[0], 1);
    t.ok(!e);
    t.end();
  });

});

test('waits for all futures', function(t) {

  var f1 = future();
  var f2 = future();

  wait(f1, f2, function(err, args) {
    t.equal(args[0], 1);
    t.equal(args[1], 2)
    t.end();
  });

  process.nextTick(function() {
    f1(null, 1);
  });

  f2(null, 2);
});
