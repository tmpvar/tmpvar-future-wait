var future = require('tmpvar-future');

module.exports = waitForFutures;


function waitForFutures(args, fn) {
  if (!args) {
    return fn(null, args);
  }

  var f = future();
  var argl = arguments.length;

  if (!Array.isArray(args)) {
    arga = new Array(argl);
    for (var i = 0; i < argl; i++) {
      arga[i] = arguments[i];
    }
    args = arga;
  }

  var lastArg = args[argl-1];

  if (typeof lastArg === 'function' && !lastArg.isFuture) {
    // setup the passed callback as a callback on the future
    f(args.pop());
  } else if (typeof fn === 'function') {
    f(fn);
  }

  var resolved = Array(args.length);

  var pending = args.length;
  args.forEach(function(arg, i) {
    if (typeof arg === 'function' && arg.isFuture) {
      arg(function waitForArgsListener(e, r) {
        if (e) {
          return fn(e);
        }

        resolved[i] = r;

        pending--;
        if (pending <= 0) {
          f(null, resolved);
        }
      })
    } else {
      resolved[i] = args[i];
      pending--;
    }
  });

  // if we fell through immediately
  if (pending <= 0) {
    f(null, args);
  }
  return f;
}
