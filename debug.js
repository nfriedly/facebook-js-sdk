/*1381896406,182062887,JIT Construction: v968731,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window) {
var self = window, document = window.document;
var setTimeout = window.setTimeout, setInterval = window.setInterval;var __DEV__ = 0;
function emptyFunction() {};
var __w, __t;
/**
 * @generated SignedSource<<cdec6906cffbc2262d9350096b7fa9db>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @nostacktrace
 * @typechecks
 * @polyfill
 */

/*globals __t:true, __w:true*/
/*TC*/
(function() {
  var handler;
  var currentType;
  var toString = Object.prototype.toString;
  var paused = false; // pause when there's a type check error in current tick
  var disabled = false; // Can be disabled by individual pages

  /**
   * Mapping from types to interfaces that they implement.
   */
  var typeInterfaces = {
    'DOMElement': ['DOMEventTarget', 'DOMNode'],
    'DOMDocument': ['DOMEventTarget', 'DOMNode'],
    'DOMWindow': ['DOMEventTarget'],
    'DOMTextNode': ['DOMNode'],
    'Comment': ['DOMNode']
  };

  /**
   * A recursive descent analyzer which takes a value and a typehint, validating
   * whether or not the value matches the typehint.
   * The function will call it self as long as both the value and the typehint
   * yields a nested component. This means that we will never recurse deeper
   * than needed, and also that we automatically get support for
   *   > equals([], 'array<string>') // true
   *   > equals(['string'], 'array') // true
   */
  function equals(value, node) {
    var type = typeof value;
    var subType;
    var nextNode;
    var nextValue;

    var nullable = /^\?/.test(node);
    if (nullable) {
      node = node.substring(1);
    }

    // do not treat function expressions as generics
    var indexOfFirstAngle = node.indexOf('function') !== 0
      ? node.indexOf('<')
      : -1;
    if (indexOfFirstAngle !== -1) {
      nextNode = node.substring(indexOfFirstAngle + 1, node.lastIndexOf('>'));
      node = node.substring(0, indexOfFirstAngle);
    }

    // http://jsperf.com/switch-if-else/41 shows that switch is faster in most
    // browsers
    switch (type) {
      // start by testing the most common types
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        break;
      default:
        // defer calling toString on the value since this would force boxing of
        // primitives
        var toStringType = toString.call(value).slice(8, -1);
        // Then go on to the more complex tests
        if (value === null) {
          type = 'null';
        } else if (toStringType === 'Function') {
          // let functions with signatures also match 'function'
          type = value.__TCmeta && node !== 'function'
            ? value.__TCmeta.signature
            : 'function';
        } else if (type === 'object' || type === 'function') {
          // HTMLObjectElements has a typeof function in FF
          var constructor = value.constructor;
          if (constructor && constructor.__TCmeta) {
            // The value is a custom type
            // Let custom types also match 'object'
            if (node === 'object') {
              type = 'object';
            } else {
              while (constructor && constructor.__TCmeta) {
                if (constructor.__TCmeta.type == node) {
                  type = node;
                  break;
                }
                constructor = constructor.__TCmeta.superClass;
              }
            }
          } else if (typeof value.nodeType === 'number'
                     && typeof value.nodeName === 'string') {
            // Do not use instanceof Element etc. as eg. MooTools shadow this
            switch (value.nodeType) {
              case 1: type = 'DOMElement';
                subType = value.nodeName.toUpperCase();
                break;
              case 3: type = 'DOMTextNode'; break;
              case 8: type = 'Comment'; break;
              case 9: type = 'DOMDocument'; break;
              case 11: type = 'DOMElement';
                subType = 'FRAGMENT';
                break;
            }
          } else if (value == value.window && value == value.self) {
            type = 'DOMWindow';
          } else if (toStringType == 'XMLHttpRequest'
                     || 'setRequestHeader' in value) {
            // XMLHttpRequest stringType is "Object" on IE7/8 so we duck-type it
            type = 'XMLHttpRequest';
          } else {
            // else, check if it is actually an array
            switch (toStringType) {
              case 'Error':
                // let Error match inherited objects
                type = node === 'Error'
                  ? 'Error'
                  : value.name;
                break;
              case 'Array':
                if (value.length) {
                  nextValue = value[0];
                }
                // fall through
              case 'Object':
              case 'RegExp':
              case 'Date':
                type = toStringType.toLowerCase();
                break;
            }
          }
        }
    }

    if (nullable && /undefined|null/.test(type)) {
      return true;
    }

    if (type in typeInterfaces) {
      var interfaces = typeInterfaces[type], i = interfaces.length;
      while (i--) {
        if (interfaces[i] === node) {
          type = node;
          break;
        }
      }
    }

    currentType.push(type);
    return nextValue && nextNode
      ? node === type && equals(nextValue, nextNode)
      : subType && nextNode
        ? node === type && subType === nextNode
        : node === type;
  }


  /**
   * Given a value and a typehint (can be a union type), this will return
   * whether or not the passed in value matches the typehint.
   */
  function matches(value, node) {
    var nodes = node.split('|'), i = nodes.length;
    while (i--) {
      currentType = [];
      if (equals(value, nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function report(error, framesToPop) {
    try {
      throw error;
    } catch (e) {
      // Pop to the frame calling the checked function, or to the
      // checked function
      e.framesToPop = framesToPop;
      if (handler) {
        handler(e);
      } else {
        console.error(error.message);
      }
    }
  }
  /**
   * This function will loop over all arguments, where each argment is expected
   * to be in the form of `[variable, 'typehint', 'variablename']`.
   * For each argument, it will check whether the type of the variable matches
   * that of the typehint.
   * If any of the variables are found not to match a TypeError is thrown, else,
   * the first variable is returned.
   */
  function check(/*check1, check2, ..*/) {
    if (!paused && !disabled) {
      var args = Array.prototype.slice.call(arguments);
      var i = args.length;
      while (i--) {
        var value = args[i][0];
        var expected = args[i][1];
        var name = args[i][2] || 'return value';

        if (!matches(value, expected)) {
          var actual = currentType.shift();
          while (currentType.length) {
            actual += '<' + currentType.shift() + '>';
          }
          report(
            new TypeError('Type Mismatch for ' + name +
                          ': expected `' + expected +
                          '`, actual `' + actual +
                          '` (' + toString.call(value) + ')'),
            args[i][2] ? 2 : 1
          );
          paused = true;
          setTimeout(function()  {
            paused = false;
          }, 0);
        }
      }
    }

    // Always return the first value checked
    return arguments[0][0];
  }

  /**
   * Allows you to set a handler that should handle errors. If such a handler is
   * set, no errors are thrown (the handler can choose to throw).
   */
  check.setHandler = function(fn) {
    handler = fn;
  };

  check.disable = function() {
    disabled = true;
  };

  /**
   * Annotates a function with a meta object
   */
  function annotate(fn, meta) {
    meta.superClass = fn.__superConstructor__;
    fn.__TCmeta = meta;
    return fn;
  }

  // export to global
  __t = check;
  __w = annotate;
})();
/*/TC*/

/* -rCkkQM4fB8 */
/**
 * This is a lightweigh implementation of require and __d which is used by the
 * JavaScript SDK.
 * This implementation requires that all modules are defined in order by how
 * they depend on each other, so that it is guaranteed that no module will
 * require a module that has not got all of its dependencies satisfied.
 *
 * @provides sdk.commonjs-require
 * @typechecks
 */

var require, __d;
(function (global) {
  var map = {}, resolved = {};
  var defaultDeps =
    ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'];

  require = __w(function(/*string*/ id, /*boolean?*/ soft) {__t([id, 'string', 'id'], [soft, '?boolean', 'soft']);
    if (resolved.hasOwnProperty(id)) {
      return resolved[id];
    }
    if (!map.hasOwnProperty(id)) {
      if (soft) {
        return null;
      }
      throw new Error('Module ' + id + ' has not been defined');
    }
    var module = map[id],
        deps = module.deps,
        length = deps.length,
        dep,
        args = [];

    for (var i = 0; i < length; i++) {
      switch(deps[i]) {
        case 'module'        : dep = module; break;
        case 'exports'       : dep = module.exports; break;
        case 'global'        : dep = global; break;
        case 'require'       : dep = require; break;
        case 'requireDynamic': dep = require; break;
        case 'requireLazy'   : dep = null; break;
        default              : dep = require.call(null, deps[i]);
      }
      args.push(dep);
    }
    module.factory.apply(global, args);
    resolved[id] = module.exports;
    return module.exports;
  }, {"signature":"function(string,?boolean)"});

  __d = __w(function(/*string*/ id, /*array<string>*/ deps, factory,
      /*number?*/ _special) {__t([id, 'string', 'id'], [deps, 'array<string>', 'deps'], [_special, '?number', '_special']);

    switch(typeof factory) {
      case  'function':
        map[id] = {
          factory: factory,
          deps: defaultDeps.concat(deps),
          exports: {}
        };

        // 3 signifies that this should be executed immediately
        if (_special === 3) {
          require.call(null, id);
        }
        break;

      case 'object':
        resolved[id] = factory;
        break;

      default:
        throw new TypeError('Wrong type for factory object');
    }
  }, {"signature":"function(string,array<string>,?number)"});
})(this);

/* uCie8R2eCQ0 */
var ES5 = function(){
__d("ES5ArrayPrototype",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5ArrayPrototype
 */

var ES5ArrayPrototype = {};

/**
* http://es5.github.com/#x15.4.4.19
*/
ES5ArrayPrototype.map = function(func, context) {
  if (typeof func != 'function') {
    throw new TypeError();
  }

  var ii;
  var len = this.length;
  var r   = new Array(len);
  for (ii = 0; ii < len; ++ii) {
    if (ii in this) {
      r[ii] = func.call(context, this[ii], ii, this);
    }
  }

  return r;
};

/**
* http://es5.github.com/#x15.4.4.18
*/
ES5ArrayPrototype.forEach = function(func, context) {
  ES5ArrayPrototype.map.call(this, func, context);
};

/**
* http://es5.github.com/#x15.4.4.20
*/
ES5ArrayPrototype.filter = function(func, context) {
  if (typeof func != 'function') {
    throw new TypeError();
  }

  var ii, val, len = this.length, r = [];
  for (ii = 0; ii < len; ++ii) {
    if (ii in this) {
      // Specified, to prevent mutations in the original array.
      val = this[ii];
      if (func.call(context, val, ii, this)) {
        r.push(val);
      }
    }
  }

  return r;
};

/**
* http://es5.github.com/#x15.4.4.16
*/
ES5ArrayPrototype.every = function(func, context) {
  if (typeof func != 'function') {
    throw new TypeError();
  }
  var t = new Object(this);
  var len = t.length;
  for (var ii = 0; ii < len; ii++) {
    if (ii in t) {
      if (!func.call(context, t[ii], ii, t)) {
        return false;
      }
    }
  }
  return true;
};

/**
* http://es5.github.com/#x15.4.4.17
*/
ES5ArrayPrototype.some = function(func, context) {
  if (typeof func != 'function') {
    throw new TypeError();
  }
  var t = new Object(this);
  var len = t.length;
  for (var ii = 0; ii < len; ii++) {
    if (ii in t) {
      if (func.call(context, t[ii], ii, t)) {
        return true;
      }
    }
  }
  return false;
};

/**
* http://es5.github.com/#x15.4.4.14
*/
ES5ArrayPrototype.indexOf = function(val, index) {
  var len = this.length;
  index |= 0;

  if (index < 0) {
    index += len;
  }

  for (; index < len; index++) {
    if (index in this && this[index] === val) {
      return index;
    }
  }
  return -1;
};

module.exports = ES5ArrayPrototype;

/* qhAWVZe8x9s */});
__d("ES5FunctionPrototype",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5FunctionPrototype
 */

var ES5FunctionPrototype = {};

/**
 * A simulated implementation of Function.prototype.bind that is mostly ES5-
 * compliant. The [[Call]], [[Construct]], and [[HasInstance]] internal
 * properties differ, which means that the simulated implementation produces
 * different stack traces and behaves differently when used as a constructor.
 *
 * http://es5.github.com/#x15.3.4.5
 */
ES5FunctionPrototype.bind = function(context /*, args... */) {
  if (typeof this != 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  var target = this;
  var appliedArguments = Array.prototype.slice.call(arguments, 1);
  function bound() {
    return target.apply(
      context,
      appliedArguments.concat(Array.prototype.slice.call(arguments)));
  }
  bound.displayName = 'bound:' + (target.displayName || target.name || '(?)');
  bound.toString = function toString() {
    return 'bound: ' + target;
  };
  return bound;
};

module.exports = ES5FunctionPrototype;

/* E-HyJezrgQm */});
__d("ES5StringPrototype",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5StringPrototype
 */

var ES5StringPrototype = {};

/**
 * Trims white space on either side of this string.
 *
 * http://es5.github.com/#x15.5.4.20
 */
ES5StringPrototype.trim = function() {
  if (this == null) {
    throw new TypeError('String.prototype.trim called on null or undefined');
  }
  return String.prototype.replace.call(this, /^\s+|\s+$/g, '');
};

module.exports = ES5StringPrototype;

/* qNiKjYXBLFg */});
__d("ES5Array",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5Array
 */

var ES5Array = {};

ES5Array.isArray = function(object) {
  return Object.prototype.toString.call(object) == '[object Array]';
};

module.exports = ES5Array;

/* l1hzaJEXeLt */});
__d("ES5Object",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5Object
 */

var ES5Object = {};
/**
 * Creates a new object with the specified prototype object.
 *
 * http://es5.github.com/#x15.2.3.5
 */
ES5Object.create = function(proto) {
  if (__DEV__) {
    if (arguments.length > 1) {
      throw new Error(
        'Object.create implementation supports only the first parameter');
    }
  }
  var type = typeof proto;
  if (type != 'object' && type != 'function') {
    throw new TypeError('Object prototype may only be a Object or null');
  }
  var F = new Function();
  F.prototype = proto;
  return new F();
};

/**
 * Returns an array of the given object's own enumerable properties.
 *
 * http://es5.github.com/#x15.2.3.14
 */
ES5Object.keys = function(object) {
  var type = typeof object;
  if (type != 'object' && type != 'function' || object === null) {
    throw new TypeError('Object.keys called on non-object');
  }

  var keys = [];
  for (var key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      keys.push(key);
    }
  }

  // JScript in IE8 and below mistakenly skips over built-in properties.
  // https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute
  var hasDontEnumBug = !({toString: true}).propertyIsEnumerable('toString');
  var dontEnumProperties = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'prototypeIsEnumerable',
    'constructor'
  ];
  if (hasDontEnumBug) {
    for (var ii = 0; ii < dontEnumProperties.length; ii++) {
      var property = dontEnumProperties[ii];
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        keys.push(property);
      }
    }
  }

  return keys;
};

module.exports = ES5Object;

/* AthxqEMCBRt */});
__d("ES5Date",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5Date
 */

var ES5Date = {};
ES5Date.now = function() {
  return new Date().getTime();
};

module.exports = ES5Date;

/* gWLwAqneaJw */});
__d("JSON3",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */
;(function () {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;
  var JSON3 = module.exports = {};
  // A JSON source string used to test the native `stringify` and `parse`
  // implementations.
  var serialized = '{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';

  // Feature tests to determine whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  var stringifySupported, Escapes, toPaddedString, quote, serialize;
  var parseSupported, fromCharCode, Unescapes, abort, lex, get, walk, update, Index, Source;

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var value = new Date(-3509827334573292), floor, Months, getDay;

  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    value = value.getUTCFullYear() == -109252 && value.getUTCMonth() === 0 && value.getUTCDate() == 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      value.getUTCHours() == 10 && value.getUTCMinutes() == 37 && value.getUTCSeconds() == 6 && value.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Define additional utility methods if the `Date` methods are buggy.
  if (!value) {
    floor = Math.floor;
    // A mapping between the months of the year and the number of days between
    // January 1st and the first of the respective month.
    Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    // Internal: Calculates the number of days between the Unix epoch and the
    // first day of the given month.
    getDay = function (year, month) {
      return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
    };
  }

  if (typeof JSON == "object" && JSON) {
    // Delegate to the native `stringify` and `parse` implementations in
    // asynchronous module loaders and CommonJS environments.
    JSON3.stringify = JSON.stringify;
    JSON3.parse = JSON.parse;
  }

  // Test `JSON.stringify`.
  if ((stringifySupported = typeof JSON3.stringify == "function" && !getDay)) {
    // A test function object with a custom `toJSON` method.
    (value = function () {
      return 1;
    }).toJSON = value;
    try {
      stringifySupported =
        // Firefox 3.1b1 and b2 serialize string, number, and boolean
        // primitives as object literals.
        JSON3.stringify(0) === "0" &&
        // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
        // literals.
        JSON3.stringify(new Number()) === "0" &&
        JSON3.stringify(new String()) == '""' &&
        // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
        // does not define a canonical JSON representation (this applies to
        // objects with `toJSON` properties as well, *unless* they are nested
        // within an object or array).
        JSON3.stringify(getClass) === undef &&
        // IE 8 serializes `undefined` as `"undefined"`. Safari 5.1.2 and FF
        // 3.1b3 pass this test.
        JSON3.stringify(undef) === undef &&
        // Safari 5.1.2 and FF 3.1b3 throw `Error`s and `TypeError`s,
        // respectively, if the value is omitted entirely.
        JSON3.stringify() === undef &&
        // FF 3.1b1, 2 throw an error if the given value is not a number,
        // string, array, object, Boolean, or `null` literal. This applies to
        // objects with custom `toJSON` methods as well, unless they are nested
        // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
        // methods entirely.
        JSON3.stringify(value) === "1" &&
        JSON3.stringify([value]) == "[1]" &&
        // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
        // `"[null]"`.
        JSON3.stringify([undef]) == "[null]" &&
        // YUI 3.0.0b1 fails to serialize `null` literals.
        JSON3.stringify(null) == "null" &&
        // FF 3.1b1, 2 halts serialization if an array contains a function:
        // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
        // of Firefox also allow trailing commas in JSON objects and arrays.
        // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
        // define custom `toJSON` methods.
        JSON3.stringify([undef, getClass, null]) == "[null,null,null]" &&
        // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
        // where character escape codes are expected (e.g., `\b` => `\u0008`).
        JSON3.stringify({ "result": [value, true, false, null, "\0\b\n\f\r\t"] }) == serialized &&
        // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
        JSON3.stringify(null, value) === "1" &&
        JSON3.stringify([1, 2], null, 1) == "[\n 1,