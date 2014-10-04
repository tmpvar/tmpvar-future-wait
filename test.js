var test = require('tape');
var wait = require('./tmpvar-future-wait');
var future = require('tmpvar-future');

test('resolves immediately when passed primitives', function(t) {
  var f = wait(1, 'a', false, null, [], {}, function noop() {}, function(err, args) {
    t.equal(args[0], 1);
    t.equal(args[1], 'a');
    t.equal(args[2], false);
    t.equal(args[3], null);
    t.deepEqual(args[4], []);
    t.deepEqual(args[5], {});
    t.equal(typeof args[6], 'function');
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
