/*1354089748,171837750,JIT Construction: v680556,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window) {
var self = window, document = window.document;
var __DEV__ = 0;
function emptyFunction() {};
/**
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @typechecks
 * @polyfill
 */


/*globals __DEV__*/
/*TC*/
var __t = (function() {
  var toString = Object.prototype.toString;
  var handler;

  function getType(value) {
    var type;
    var subType;
    if (value === undefined) {
      type = 'undefined';
    } else if (value === null) {
      type = 'null';
    } else if (toString.call(value) === '[object Function]') {
      type = 'function';
    } else {
      type = typeof value;
      // HTMLObjectElements has a typeof function in FF
      if (type === 'object' || type === 'function') {
        if (typeof Element !== 'undefined'
              ? value instanceof Element
              : value.nodeType === 1 &&
                typeof value.nodeName === 'string') {
          // If it's an HTMLElement, extract the subtype
           type = 'DOMElement';
           subType = value.nodeName.toUpperCase();
        } else {
          // else, check if it is actually an array
          type = toString.call(value).slice(8, -1);
          switch (type) {
            case 'Array':
              if (value.length) {
                subType = getType(value[0]);
              }
              // fall through
            case 'Object':
            case 'RegExp':
            case 'Date':
              type = type.toLowerCase();
              break;
          }
        }
      }
    }
    return subType
      ? type + '<' + subType + '>'
      : type;
  }

  function matches(expected, actual) {
    // Allow nullable types
    if (/null|undefined/.test(actual) && /\?$/.test(expected)) {
      return true;
    }

    // Normalize in order to match using the longest applicable selector
    expected = expected.replace(/>*$|\?|$/, '<');
    actual = actual.replace(/>*$|$/, '<');
    var len = Math.min(expected.length, actual.length);

    return expected.substring(0, len) === actual.substring(0, len);
  }

  function __t(/*args*/) {
    var args = Array.prototype.slice.call(arguments);
    var i = args.length;
    while (i--) {
      var expected = args[i][1];
      var actual = getType(args[i][0]);
      var name = args[i][2] || 'return value';

      if (!matches(expected, actual)) {
        var error = new TypeError('Type Mismatch for ' + name + ': expected ' +
          expected + ', actual ' + actual);
        if (handler) {
          try {
            throw error;
          } catch (e) {
            // Pop to the frame calling the checked function, or to the
            // checked function
            e.framesToPop = args[i][2] ? 2 : 1;
            handler(e);
          }
        } else {
          throw error;
        }
      }
    }

    // Always return the first value checked
    return args[0][0];
  }
  __t.setHandler = function(fn) {
    handler = fn;
  };
  return __t;
})();
/*/TC*/

/* lHCP52GvSod */

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

  require = function(/*string*/ id, /*boolean?*/ soft) {/*TC*/__t([id,'string','id'],[soft,'boolean?','soft']);/*/TC*/
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
        default              : dep = require(deps[i]);
      }
      args.push(dep);
    }
    module.factory.apply(global, args);
    resolved[id] = module.exports;
    return module.exports;
  };

  __d = function(/*string*/ id, /*array<string>*/ deps, factory,
      /*number?*/ _special) {/*TC*/__t([id,'string','id'],[_special,'number?','_special']);/*/TC*/

    switch(typeof factory) {
      case  'function':
        map[id] = {
          factory: factory,
          deps: defaultDeps.concat(deps),
          exports: {}
        };

        // 3 signifies that this should be executed immediately
        if (_special === 3) {
          require(id);
        }
        break;

      case 'object':
        resolved[id] = factory;
        break;

      default:
        throw new TypeError('Wrong type for factory object');
    }
  };
})(this);

/* JYlGIRbtuGE */

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

/* miP1aWku6ht */});
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

/* NQq-UuTg_al */});
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

/* hP_V1uATp0d */});
__d("ES5Array",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5Array
 */

var ES5Array = {};

ES5Array.isArray = function(object) {
  return Object.prototype.toString.call(object) == '[object Array]';
};

module.exports = ES5Array;

/* GSqKf3nZN2U */});
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

/* TBb9ybAUw89 */});
__d("ES5Date",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5Date
 */

var ES5Date = {};
ES5Date.now = function() {
  return new Date().getTime();
};

module.exports = ES5Date;

/* OQGHHuaovMx */});
__d("JSON3",[],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule JSON3
 * @option preserve-header
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
        JSON3.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
        // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
        // serialize extended years.
        JSON3.stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
        // The milliseconds are optional in ES 5, but required in 5.1.
        JSON3.stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
        // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
        // four-digit years instead of six-digit years. Credits: @Yaffle.
        JSON3.stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
        // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
        // values less than 1000. Credits: @Yaffle.
        JSON3.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
    } catch (exception) {
      stringifySupported = false;
    }
  }

  // Test `JSON.parse`.
  if (typeof JSON3.parse == "function") {
    try {
      // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
      // Conforming implementations should also coerce the initial argument to
      // a string prior to parsing.
      if (JSON3.parse("0") === 0 && !JSON3.parse(false)) {
        // Simple parsing test.
        value = JSON3.parse(serialized);
        if ((parseSupported = value.A.length == 5 && value.A[0] == 1)) {
          try {
            // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
            parseSupported = !JSON3.parse('"\t"');
          } catch (exception) {}
          if (parseSupported) {
            try {
              // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
              // trailing decimal points. FF 4.0, 4.0.1, and IE 9 also allow
              // certain octal literals.
              parseSupported = JSON3.parse("01") != 1;
            } catch (exception) {}
          }
        }
      }
    } catch (exception) {
      parseSupported = false;
    }
  }

  // Clean up the variables used for the feature tests.
  value = serialized = null;

  if (!stringifySupported || !parseSupported) {
    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property, forEach;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == "[object Function]", property, length;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && isProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; isProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == "[object Function]", property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == "[object Function]", property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!stringifySupported) {
      // Internal: A map of control characters and their escaped equivalents.
      Escapes = {
        "\\": "\\\\",
        '"': '\\"',
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return ("000000" + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      quote = function (value) {
        var result = '"', index = 0, symbol;
        for (; symbol = value.charAt(index); index++) {
          // Escape the reverse solidus, double quote, backspace, form feed, line
          // feed, carriage return, and tab characters.
          result += '\\"\b\f\n\r\t'.indexOf(symbol) > -1 ? Escapes[symbol] :
            // If the character is a control character, append its Unicode escape
            // sequence; otherwise, append the character as-is.
            symbol < " " ? "\\u00" + toPaddedString(2, symbol.charCodeAt(0).toString(16)) : symbol;
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value = object[property], className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, any;
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == "[object Date]" && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != "[object Number]" && className != "[object String]" && className != "[object Array]") || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == "[object Boolean]") {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == "[object Number]") {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == "[object String]") {
          // Strings are double-quoted and escaped.
          return quote(value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == "[object Array]") {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; any || (any = true), index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            return any ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
              any || (any = true);
            });
            return any ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties, index, length, value;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if (getClass.call(filter) == "[object Function]") {
            callback = filter;
          } else if (getClass.call(filter) == "[object Array]") {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (index = 0, length = filter.length; index < length; value = filter[index++], ((getClass.call(value) == "[object String]" || getClass.call(value) == "[object Number]") && (properties[value] = 1)));
          }
        }
        if (width) {
          if (getClass.call(width) == "[object Number]") {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (getClass.call(width) == "[object String]") {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!parseSupported) {
      fromCharCode = String.fromCharCode;
      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      Unescapes = {
        "\\": "\\",
        '"': '"',
        "/": "/",
        "b": "\b",
        "t": "\t",
        "n": "\n",
        "f": "\f",
        "r": "\r"
      };

      // Internal: Resets the parser state and throws a `SyntaxError`.
      abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      lex = function () {
        var source = Source, length = source.length, symbol, value, begin, position, sign;
        while (Index < length) {
          symbol = source.charAt(Index);
          if ("\t\r\n ".indexOf(symbol) > -1) {
            // Skip whitespace tokens, including tabs, carriage returns, line
            // feeds, and space characters.
            Index++;
          } else if ("{}[]:,".indexOf(symbol) > -1) {
            // Parse a punctuator token at the current position.
            Index++;
            return symbol;
          } else if (symbol == '"') {
            // Advance to the next character and parse a JSON string at the
            // current position. String tokens are prefixed with the sentinel
            // `@` character to distinguish them from punctuators.
            for (value = "@", Index++; Index < length;) {
              symbol = source.charAt(Index);
              if (symbol < " ") {
                // Unescaped ASCII control characters are not permitted.
                abort();
              } else if (symbol == "\\") {
                // Parse escaped JSON control characters, `"`, `\`, `/`, and
                // Unicode escape sequences.
                symbol = source.charAt(++Index);
                if ('\\"/btnfr'.indexOf(symbol) > -1) {
                  // Revive escaped control characters.
                  value += Unescapes[symbol];
                  Index++;
                } else if (symbol == "u") {
                  // Advance to the first character of the escape sequence.
                  begin = ++Index;
                  // Validate the Unicode escape sequence.
                  for (position = Index + 4; Index < position; Index++) {
                    symbol = source.charAt(Index);
                    // A valid sequence comprises four hexdigits that form a
                    // single hexadecimal value.
                    if (!(symbol >= "0" && symbol <= "9" || symbol >= "a" && symbol <= "f" || symbol >= "A" && symbol <= "F")) {
                      // Invalid Unicode escape sequence.
                      abort();
                    }
                  }
                  // Revive the escaped character.
                  value += fromCharCode("0x" + source.slice(begin, Index));
                } else {
                  // Invalid escape sequence.
                  abort();
                }
              } else {
                if (symbol == '"') {
                  // An unescaped double-quote character marks the end of the
                  // string.
                  break;
                }
                // Append the original character as-is.
                value += symbol;
                Index++;
              }
            }
            if (source.charAt(Index) == '"') {
              Index++;
              // Return the revived string.
              return value;
            }
            // Unterminated string.
            abort();
          } else {
            // Parse numbers and literals.
            begin = Index;
            // Advance the scanner's position past the sign, if one is
            // specified.
            if (symbol == "-") {
              sign = true;
              symbol = source.charAt(++Index);
            }
            // Parse an integer or floating-point value.
            if (symbol >= "0" && symbol <= "9") {
              // Leading zeroes are interpreted as octal literals.
              if (symbol == "0" && (symbol = source.charAt(Index + 1), symbol >= "0" && symbol <= "9")) {
                // Illegal octal literal.
                abort();
              }
              sign = false;
              // Parse the integer component.
              for (; Index < length && (symbol = source.charAt(Index), symbol >= "0" && symbol <= "9"); Index++);
              // Floats cannot contain a leading decimal point; however, this
              // case is already accounted for by the parser.
              if (source.charAt(Index) == ".") {
                position = ++Index;
                // Parse the decimal component.
                for (; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position++);
                if (position == Index) {
                  // Illegal trailing decimal.
                  abort();
                }
                Index = position;
              }
              // Parse exponents.
              symbol = source.charAt(Index);
              if (symbol == "e" || symbol == "E") {
                // Skip past the sign following the exponent, if one is
                // specified.
                symbol = source.charAt(++Index);
                if (symbol == "+" || symbol == "-") {
                  Index++;
                }
                // Parse the exponential component.
                for (position = Index; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position++);
                if (position == Index) {
                  // Illegal empty exponent.
                  abort();
                }
                Index = position;
              }
              // Coerce the parsed value to a JavaScript number.
              return +source.slice(begin, Index);
            }
            // A negative sign may only precede numbers.
            if (sign) {
              abort();
            }
            // `true`, `false`, and `null` literals.
            if (source.slice(Index, Index + 4) == "true") {
              Index += 4;
              return true;
            } else if (source.slice(Index, Index + 5) == "false") {
              Index += 5;
              return false;
            } else if (source.slice(Index, Index + 4) == "null") {
              Index += 4;
              return null;
            }
            // Unrecognized token.
            abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      get = function (value) {
        var results, any, key;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if (value.charAt(0) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; any || (any = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (any) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; any || (any = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (any) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || value.charAt(0) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          if (getClass.call(value) == "[object Array]") {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            // `forEach` can't be used to traverse an array in Opera <= 8.54,
            // as `Object#hasOwnProperty` returns `false` for array indices
            // (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        Index = 0;
        Source = source;
        var result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == "[object Function]" ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }
}).call(this);

/* Hwm0T30sh3E */});
__d("ES5",["ES5ArrayPrototype","ES5FunctionPrototype","ES5StringPrototype","ES5Array","ES5Object","ES5Date","JSON3"],function(global,require,requireDynamic,requireLazy,module,exports) {/**
 * @providesModule ES5
 *
 * scripts/jssdk/default.spatch converts ES5 code into using this module in
 * ES3 style.
 */

var ES5ArrayPrototype = require('ES5ArrayPrototype');
var ES5FunctionPrototype = require('ES5FunctionPrototype');
var ES5StringPrototype = require('ES5StringPrototype');
var ES5Array= require('ES5Array');
var ES5Object = require('ES5Object');
var ES5Date = require('ES5Date');
var JSON3 = require('JSON3');

var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

var methodCache = {
  // Always use the polyfill for JSON to work around Prototype 1.6.x issues.
  // JSON3 will use the native versions if possible.
  'JSON.stringify': JSON3.stringify,
  'JSON.parse': JSON3.parse
};

var polyfills = {
  'array'   : ES5ArrayPrototype,
  'function': ES5FunctionPrototype,
  'string'  : ES5StringPrototype,
  'Object'  : ES5Object,
  'Array'   : ES5Array,
  'Date'    : ES5Date
};

// Iterate over the polyfills, and add either a valid native implementation or
// a polyfill to the methodCache
for (var pName in polyfills) {
  if (!polyfills.hasOwnProperty(pName)) { continue; }
  var polyfillObject =  polyfills[pName];

  // Resolve which native object holds the function we are looking for
  var nativeObject = pName === pName.toLowerCase()
    ? window[pName.replace(/^\w/, function(m) { return m.toUpperCase(); })]
        .prototype
    : window[pName];

  // Iterate over the shimmed methods, testing the native implementation
  for (var fName in polyfillObject) {
    if (!polyfillObject.hasOwnProperty(fName)) { continue; }

    var nativeFunction = nativeObject[fName];
    // If the native function exist, and tests as a native function, then
    // we save it for later
    methodCache[pName + '.' + fName] =
      nativeFunction && /\{\s+\[native code\]\s\}/.test(nativeFunction)
        ? nativeFunction
        : polyfillObject[fName];
  }
}

function ES5(lhs, rhs, proto/*, args*/) {
  var args = slice.call(arguments, 3);

  // Normalize the type information
  var type = proto
    ? /\s(.*)\]/.exec(toString.call(lhs).toLowerCase())[1]
    : lhs;

  // Locate the method to use
  var method = methodCache[type + '.' + rhs] || lhs[rhs];

  // Invoke or throw
  if (typeof method === 'function') {
    return method.apply(lhs, args);
  }
  if (__DEV__) {
    throw new Error('Polyfill ' + type + ' does not have a method ' + rhs);
  }
}

module.exports = ES5;

/* W3yMDgei9oE */});
ES5 = require('ES5');
return ES5.apply(null, arguments);
};

__d("sdk.RuntimeConfig",[],{"locale":"en_US","rtl":false});__d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","fbcdn_http":"s-static.ak.fbcdn.net","fbcdn_https":"s-static.ak.fbcdn.net","cdn_http":"static.ak.facebook.com","cdn_https":"s-static.ak.facebook.com"});__d("XDConfig",[],{"XdUrl":"connect\/xd_arbiter.php?version=17","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/ys\/r\/WON-TVLCpDP.swf"},"useCdn":true});__d("SDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"api":{"mode":"warn","whitelist":["Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Data","Data.process","Data.query","Data.query:wait","Data.waitOn","Data.waitOn:wait","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.init","Payment.setSize","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","ui:subscribe"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("CssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}\n.fb_invisible{display:none}\n.fb_reset{background:none;border-spacing:0;border:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}\n.fb_link img{border:none}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}\n.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}\n.fb_dialog_content{background:#fff;color:#333}\n.fb_dialog_close_icon{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yA\/x\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/y6\/x\/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px;top:8px\\9;right:7px\\9}\n.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}\n.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}\n.fb_dialog_close_icon:hover{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yA\/x\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/y6\/x\/s816eWC-2sl.gif)}\n.fb_dialog_close_icon:active{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yA\/x\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/y6\/x\/s816eWC-2sl.gif)}\n.fb_dialog_loader{background-color:#f2f2f2;border:1px solid #606060;font-size:24px;padding:20px}\n.fb_dialog_top_left,\n.fb_dialog_top_right,\n.fb_dialog_bottom_left,\n.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}\n\/* \u0040noflip *\/\n.fb_dialog_top_left{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yR\/x\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}\n\/* \u0040noflip *\/\n.fb_dialog_top_right{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yR\/x\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}\n\/* \u0040noflip *\/\n.fb_dialog_bottom_left{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yR\/x\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}\n\/* \u0040noflip *\/\n.fb_dialog_bottom_right{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yR\/x\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}\n.fb_dialog_vert_left,\n.fb_dialog_vert_right,\n.fb_dialog_horiz_top,\n.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}\n.fb_dialog_vert_left,\n.fb_dialog_vert_right{width:10px;height:100\u0025}\n.fb_dialog_vert_left{margin-left:-10px}\n.fb_dialog_vert_right{right:0;margin-right:-10px}\n.fb_dialog_horiz_top,\n.fb_dialog_horiz_bottom{width:100\u0025;height:10px}\n.fb_dialog_horiz_top{margin-top:-10px}\n.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}\n.fb_dialog_iframe{line-height:0}\n.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3b5998;color:#fff;font-size:14px;font-weight:bold;margin:0}\n.fb_dialog_content .dialog_title > span{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yD\/x\/Cou7n-nqK52.gif)\nno-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}\nbody.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;left:-10000px;overflow:visible;position:absolute;top:-10000px;width:100\u0025\n}\n.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yc\/x\/3rhSv5V8j3o.gif)\nwhite no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}\n.fb_dialog.fb_dialog_mobile.loading.centered{max-height:590px;min-height:590px;max-width:500px;min-width:500px}\n#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;left:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}\n#fb-root #fb_dialog_ipad_overlay.hidden{display:none}\n.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}\n.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0 0, 0 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}\n.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025\n}\n.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px\n}\n.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px\n}\n.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0 0, 0 100\u0025, from(#4966A6),\ncolor-stop(0.5, #355492), to(#2A4887));border:1px solid #29447e;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset,\nrgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}\n.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}\n.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}\n.fb_dialog_content .dialog_content{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yJ\/x\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}\n.fb_dialog_content .dialog_footer{background:#f2f2f2;border:1px solid #555;border-top-color:#ccc;height:40px}\n#fb_dialog_loader_close{float:left}\n.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}\n.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}\n.fb_iframe_widget{position:relative;display:-moz-inline-block;display:inline-block}\n.fb_iframe_widget iframe{position:absolute}\n.fb_iframe_widget_lift{z-index:1}\n.fb_iframe_widget span{position:relative;display:inline-block;vertical-align:text-bottom;text-align:justify}\n.fb_hide_iframes iframe{position:relative;left:-10000px}\n.fb_iframe_widget_loader{position:relative;display:inline-block}\n.fb_iframe_widget_fluid{display:inline}\n.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}\n.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yJ\/x\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}\n.fb_button_simple,\n.fb_button_simple_rtl{background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yH\/x\/eIpbnVKI9lR.png);background-repeat:no-repeat;cursor:pointer;outline:none;text-decoration:none}\n.fb_button_simple_rtl{background-position:right 0}\n.fb_button_simple .fb_button_text{margin:0 0 0 20px;padding-bottom:1px}\n.fb_button_simple_rtl .fb_button_text{margin:0 10px 0 0}\na.fb_button_simple:hover .fb_button_text,\na.fb_button_simple_rtl:hover .fb_button_text,\n.fb_button_simple:hover .fb_button_text,\n.fb_button_simple_rtl:hover .fb_button_text{text-decoration:underline}\n.fb_button,\n.fb_button_rtl{background:#29447e url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yl\/x\/FGFbc80dUKj.png);background-repeat:no-repeat;cursor:pointer;display:inline-block;padding:0 0 0 1px;text-decoration:none;outline:none}\n.fb_button .fb_button_text,\n.fb_button_rtl .fb_button_text{background:#5f78ab url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yl\/x\/FGFbc80dUKj.png);border-top:solid 1px #879ac0;border-bottom:solid 1px #1a356e;color:#fff;display:block;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;font-weight:bold;padding:2px 6px 3px 6px;margin:1px 1px 0 21px;text-shadow:none}\na.fb_button,\na.fb_button_rtl,\n.fb_button,\n.fb_button_rtl{text-decoration:none}\na.fb_button:active .fb_button_text,\na.fb_button_rtl:active .fb_button_text,\n.fb_button:active .fb_button_text,\n.fb_button_rtl:active .fb_button_text{border-bottom:solid 1px #29447e;border-top:solid 1px #45619d;background:#4f6aa3;text-shadow:none}\n.fb_button_xlarge,\n.fb_button_xlarge_rtl{background-position:left -60px;font-size:24px;line-height:30px}\n.fb_button_xlarge .fb_button_text{padding:3px 8px 3px 12px;margin-left:38px}\na.fb_button_xlarge:active{background-position:left -99px}\n.fb_button_xlarge_rtl{background-position:right -268px}\n.fb_button_xlarge_rtl .fb_button_text{padding:3px 8px 3px 12px;margin-right:39px}\na.fb_button_xlarge_rtl:active{background-position:right -307px}\n.fb_button_large,\n.fb_button_large_rtl{background-position:left -138px;font-size:13px;line-height:16px}\n.fb_button_large .fb_button_text{margin-left:24px;padding:2px 6px 4px 6px}\na.fb_button_large:active{background-position:left -163px}\n.fb_button_large_rtl{background-position:right -346px}\n.fb_button_large_rtl .fb_button_text{margin-right:25px}\na.fb_button_large_rtl:active{background-position:right -371px}\n.fb_button_medium,\n.fb_button_medium_rtl{background-position:left -188px;font-size:11px;line-height:14px}\na.fb_button_medium:active{background-position:left -210px}\n.fb_button_medium_rtl{background-position:right -396px}\n.fb_button_text_rtl,\n.fb_button_medium_rtl .fb_button_text{padding:2px 6px 3px 6px;margin-right:22px}\na.fb_button_medium_rtl:active{background-position:right -418px}\n.fb_button_small,\n.fb_button_small_rtl{background-position:left -232px;font-size:10px;line-height:10px}\n.fb_button_small .fb_button_text{padding:2px 6px 3px;margin-left:17px}\na.fb_button_small:active,\n.fb_button_small:active{background-position:left -250px}\n.fb_button_small_rtl{background-position:right -440px}\n.fb_button_small_rtl .fb_button_text{padding:2px 6px;margin-right:18px}\na.fb_button_small_rtl:active{background-position:right -458px}\n.fb_share_count_wrapper{position:relative;float:left}\n.fb_share_count{background:#b0b9ec none repeat scroll 0 0;color:#333;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;text-align:center}\n.fb_share_count_inner{background:#e8ebf2;display:block}\n.fb_share_count_right{margin-left:-1px;display:inline-block}\n.fb_share_count_right .fb_share_count_inner{border-top:solid 1px #e8ebf2;border-bottom:solid 1px #b0b9ec;margin:1px 1px 0 1px;font-size:10px;line-height:10px;padding:2px 6px 3px;font-weight:bold}\n.fb_share_count_top{display:block;letter-spacing:-1px;line-height:34px;margin-bottom:7px;font-size:22px;border:solid 1px #b0b9ec}\n.fb_share_count_nub_top{border:none;display:block;position:absolute;left:7px;top:35px;margin:0;padding:0;width:6px;height:7px;background-repeat:no-repeat;background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yP\/x\/bSOHtKbCGYI.png)}\n.fb_share_count_nub_right{border:none;display:inline-block;padding:0;width:5px;height:10px;background-repeat:no-repeat;background-image:url(https:\/\/s-static.ak.fbcdn.net\/rsrc.php\/v2\/yL\/x\/i_oIVTKMYsL.png);vertical-align:top;background-position:right 5px;z-index:10;left:2px;margin:0 2px 0 0;position:relative}\n.fb_share_no_count{display:none}\n.fb_share_size_Small .fb_share_count_right .fb_share_count_inner{font-size:10px}\n.fb_share_size_Medium .fb_share_count_right .fb_share_count_inner{font-size:11px;padding:2px 6px 3px;letter-spacing:-1px;line-height:14px}\n.fb_share_size_Large .fb_share_count_right .fb_share_count_inner{font-size:13px;line-height:16px;padding:2px 6px 4px;font-weight:normal;letter-spacing:-1px}\n.fb_share_count_hidden .fb_share_count_nub_top,\n.fb_share_count_hidden .fb_share_count_top,\n.fb_share_count_hidden .fb_share_count_nub_right,\n.fb_share_count_hidden .fb_share_count_right{visibility:hidden}\n.fb_connect_bar_container div,\n.fb_connect_bar_container span,\n.fb_connect_bar_container a,\n.fb_connect_bar_container img,\n.fb_connect_bar_container strong{background:none;border-spacing:0;border:0;direction:ltr;font-style:normal;font-variant:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal;vertical-align:baseline}\n.fb_connect_bar_container{position:fixed;left:0 !important;right:0 !important;height:42px !important;padding:0 25px !important;margin:0 !important;vertical-align:middle !important;border-bottom:1px solid #333 !important;background:#3b5998 !important;z-index:99999999 !important;overflow:hidden !important}\n.fb_connect_bar_container_ie6{position:absolute;top:expression(document.compatMode==\"CSS1Compat\"? document.documentElement.scrollTop+\"px\":body.scrollTop+\"px\")}\n.fb_connect_bar{position:relative;margin:auto;height:100\u0025;width:100\u0025;padding:6px 0 0 0 !important;background:none;color:#fff !important;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif !important;font-size:13px !important;font-style:normal !important;font-variant:normal !important;font-weight:normal !important;letter-spacing:normal !important;line-height:1 !important;text-decoration:none !important;text-indent:0 !important;text-shadow:none !important;text-transform:none !important;white-space:normal !important;word-spacing:normal !important}\n.fb_connect_bar a:hover{color:#fff}\n.fb_connect_bar .fb_profile img{height:30px;width:30px;vertical-align:middle;margin:0 6px 5px 0}\n.fb_connect_bar div a,\n.fb_connect_bar span,\n.fb_connect_bar span a{color:#bac6da;font-size:11px;text-decoration:none}\n.fb_connect_bar .fb_buttons{float:right;margin-top:7px}\n.fb_edge_widget_with_comment{position:relative;*z-index:1000}\n.fb_edge_widget_with_comment span.fb_edge_comment_widget{position:absolute}\n.fb_edge_widget_with_comment span.fb_send_button_form_widget{z-index:1}\n.fb_edge_widget_with_comment span.fb_send_button_form_widget .FB_Loader{left:0;top:1px;margin-top:6px;margin-left:0;background-position:50\u0025 50\u0025;background-color:#fff;height:150px;width:394px;border:1px #666 solid;border-bottom:2px solid #283e6c;z-index:1}\n.fb_edge_widget_with_comment span.fb_send_button_form_widget.dark .FB_Loader{background-color:#000;border-bottom:2px solid #ccc}\n.fb_edge_widget_with_comment span.fb_send_button_form_widget.siderender\n.FB_Loader{margin-top:0}\n.fbpluginrecommendationsbarleft,\n.fbpluginrecommendationsbarright{position:fixed !important;bottom:0;z-index:999}\n\/* \u0040noflip *\/\n.fbpluginrecommendationsbarleft{left:10px}\n\/* \u0040noflip *\/\n.fbpluginrecommendationsbarright{right:10px}\n","components":["fb.css.base","fb.css.dialog","fb.css.iframewidget","fb.css.button","fb.css.sharebutton","fb.css.connectbarwidget","fb.css.edgecommentwidget","fb.css.sendbuttonformwidget","fb.css.plugin.recommendationsbar"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/y5\/r\/SrnvQJBTxo-.swf"}});__d("CanvasPrefetcherConfig",[],{"blacklist":[144959615576466],"sampleRate":500});__d("PluginPipeConfig",[],{"threshold":0,"enabledApps":{"111476658864976":1,"cca6477272fc5cb805f85a84f20fca1d":1,"179150165472010":1}});__d("ConnectBarConfig",[],{"imgs":{"buttonUrl":"rsrc.php\/v2\/yY\/r\/h_Y6u1wrZPW.png","missingProfileUrl":"rsrc.php\/v2\/yo\/r\/UlIqmHJn-SK.gif"}});__d("ProfilePicConfig",[],{"defPicMap":{"pic":"rsrc.php\/v1\/yh\/r\/C5yt7Cqf3zU.jpg","pic_big":"rsrc.php\/v2\/yL\/r\/HsTZSDw4avx.gif","pic_big_with_logo":"rsrc.php\/v2\/y5\/r\/SRDCaeCL7hM.gif","pic_small":"rsrc.php\/v1\/yi\/r\/odA9sNLrE86.jpg","pic_small_with_logo":"rsrc.php\/v2\/yD\/r\/k1xiRXKnlGd.gif","pic_square":"rsrc.php\/v2\/yo\/r\/UlIqmHJn-SK.gif","pic_square_with_logo":"rsrc.php\/v2\/yX\/r\/9dYJBPDHXwZ.gif","pic_with_logo":"rsrc.php\/v2\/yu\/r\/fPPR9f2FJ3t.gif"}});
__d("QueryString",[],function(global,require,requireDynamic,requireLazy,module,exports) {



function encode(/*object*/ bag) /*string*/ {/*TC*/__t([bag,'object','bag']); return __t([function(){/*/TC*/
  var pairs = [];
  ES5(ES5('Object', 'keys', false,bag), 'forEach', true,function(key) {
    var value = bag[key];
    
    if (typeof value === 'undefined') {
      return;
    }
    
    if (value === null) {
      pairs.push(key);
      return;
    }
    
    pairs.push(encodeURIComponent(key) +
               '=' +
               encodeURIComponent(value));
  });
  return pairs.join('&');
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}


function decode(/*string*/ str, /*boolean?*/ strict) /*object*/ {/*TC*/__t([str,'string','str'],[strict,'boolean?','strict']); return __t([function(){/*/TC*/
  var data = {};
  if (str === '') {
    return data;
  }

  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=', 2);
    var key = decodeURIComponent(pair[0]);
    if (strict && data.hasOwnProperty(key)) {
      throw new URIError('Duplicate key: ' + key);
    }
    data[key] = pair.length === 2
      ? decodeURIComponent(pair[1])
      : null;
  }
  return data;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}


function appendToUrl(/*string*/ url, params) /*string*/ {/*TC*/__t([url,'string','url']); return __t([function(){/*/TC*/
  return url +
    (~ES5(url, 'indexOf', true,'?') ? '&' : '?') +
    (typeof params === 'string'
      ? params
      : QueryString.encode(params));
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

var QueryString = {
  encode: encode,
  decode: decode,
  appendToUrl: appendToUrl
};

module.exports = QueryString;

});
__d("copyProperties",[],function(global,require,requireDynamic,requireLazy,module,exports) {


function copyProperties(obj, a, b, c, d, e, f) {
  obj = obj || {};

  if (__DEV__) {
    if (f) {
      throw new Error('Too many arguments passed to copyProperties');
    }
  }

  var args = [a, b, c, d, e];
  var ii = 0, v;
  while (args[ii]) {
    v = args[ii++];
    for (var k in v) {
      obj[k] = v[k];
    }

    
    
    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
      obj.toString = v.toString;
    }
  }

  return obj;
}

module.exports = copyProperties;

});
__d("ManagedError",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function ManagedError(message, innerError) {
  Error.prototype.constructor.call(this, message);
  this.message = message;
  this.innerError = innerError;
}
ManagedError.prototype = new Error();
ManagedError.prototype.constructor = ManagedError;

module.exports = ManagedError;

});
__d("AssertionError",["ManagedError"],function(global,require,requireDynamic,requireLazy,module,exports) {

var ManagedError = require('ManagedError');

function AssertionError(message) {
  ManagedError.prototype.constructor.apply(this, arguments);
}
AssertionError.prototype = new ManagedError();
AssertionError.prototype.constructor = AssertionError;

module.exports = AssertionError;


});
__d("sprintf",[],function(global,require,requireDynamic,requireLazy,module,exports) {


function sprintf(/*string*/ str, argsdotdot) /*string*/ {/*TC*/__t([str,'string','str']); return __t([function(){/*/TC*/
  argsdotdot = Array.prototype.slice.call(arguments, 1);
  var index = 0;
  return str.replace(/%s/g, function(match) {
    return argsdotdot[index++];
  });
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

module.exports = sprintf;

});
__d("Assert",["AssertionError","sprintf"],function(global,require,requireDynamic,requireLazy,module,exports) {

var AssertionError = require('AssertionError');

var sprintf = require('sprintf');


function assert(/*boolean*/ expression, /*string?*/ message) /*boolean*/ {/*TC*/__t([expression,'boolean','expression'],[message,'string?','message']); return __t([function(){/*/TC*/
  if (!expression) {
    throw new AssertionError(message);
  }
  return expression;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}


function assertType(/*string*/ type, expression, /*string?*/ message) {/*TC*/__t([type,'string','type'],[message,'string?','message']);/*/TC*/
  var actualType;

  if (expression === undefined) {
    actualType = 'undefined';
  } else if (expression === null) {
    actualType = 'null';
  } else {
    var className = Object.prototype.toString.call(expression);
    actualType = /\s(\w*)/.exec(className)[1].toLowerCase();
  }

  assert(
    ES5(type, 'indexOf', true,actualType) !== -1,
    message || sprintf('Expression is of type %s, not %s', actualType, type)
  );
  return expression;
}


function assertInstanceOf(/*function*/ type, expression, /*string?*/ message) {/*TC*/__t([type,'function','type'],[message,'string?','message']);/*/TC*/
  assert(
    expression instanceof type,
    message || 'Expression not instance of type'
  );
  return expression;
}

function define(/*string*/ type, /*function*/ test) {/*TC*/__t([type,'string','type'],[test,'function','test']);/*/TC*/
  Assert['is' + type] = test;
  Assert['maybe' + type] = function(expression, message) {
    
    if (expression != null) {
      test(expression, message);
    }
  };
}

var Assert = {
  isInstanceOf: assertInstanceOf,
  isTrue      : assert,
  type        : assertType,
  define      : function(/*string*/ type, /*function*/ fn) {/*TC*/__t([type,'string','type'],[fn,'function','fn']);/*/TC*/
    type = type.substring(0, 1).toUpperCase() +
      type.substring(1).toLowerCase();

    define(type, function(expression, message) {
      assert(fn(expression), message);
    });
  }
};


ES5(['Array',
 'Boolean',
 'Date',
 'Function',
 'Null',
 'Number',
 'Object',
 'Regexp',
 'String',
 'Undefined'], 'forEach', true,function(/*string*/ type) {/*TC*/__t([type,'string','type']);/*/TC*/
   define(type, ES5(assertType, 'bind', true,null, type.toLowerCase()));
 });

module.exports = Assert;

});
__d("Type",["copyProperties","Assert"],function(global,require,requireDynamic,requireLazy,module,exports) {
var copyProperties = require('copyProperties');
var Assert = require('Assert');


function Type() {
  var mixins = this.__mixins;
  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      mixins[i].apply(this, arguments);
    }
  }
}


function instanceOf(/*function*/ constructor, which) /*boolean*/ {/*TC*/__t([constructor,'function','constructor']); return __t([function(){/*/TC*/

  
  if (which instanceof constructor) {
    return true;
  }

  
  if (which instanceof Type) {
    for (var i = 0; i < which.__mixins.length; i++) {
      if (which.__mixins[i] == constructor) {
        return true;
      }
    }
  }

  return false;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}


function mixin(/*function*/ to, from) {/*TC*/__t([to,'function','to']);/*/TC*/
  var prototype = to.prototype;

  if (!ES5('Array', 'isArray', false,from)) {
    from = [from];
  }

  for (var i = 0; i < from.length; i++) {
    var mixinFrom = from[i];
    
    if(typeof mixinFrom == 'function') {
      prototype.__mixins.push(mixinFrom);
      mixinFrom = mixinFrom.prototype;
    }
    
    ES5(ES5('Object', 'keys', false,mixinFrom), 'forEach', true,function(key) {
      prototype[key] = mixinFrom[key];
    });
  }
}


function extend(/*function?*/ from, /*object?*/ prototype, mixins)
    /*function*/ {/*TC*/__t([from,'function?','from'],[prototype,'object?','prototype']); return __t([function(){/*/TC*/
  var constructor = prototype && prototype.hasOwnProperty('constructor')
    ? prototype.constructor
    : function() {this.parent.apply(this, arguments);};

  Assert.isFunction(constructor);

  
  if (from && from.prototype instanceof Type === false) {
    throw new Error('parent type does not inherit from Type');
  }
  from = from || Type;

  
  var F = new Function();
  F.prototype = from.prototype;
  constructor.prototype = new F();
  copyProperties(constructor.prototype, prototype);

  
  
  constructor.prototype.__mixins = from.prototype.__mixins
    ? Array.prototype.slice.call(from.prototype.__mixins)
    : [];

  
  if (mixins) {
    mixin(constructor, mixins);
  }

  
  constructor.prototype.parent = function() {
    this.parent = from.prototype.parent;
    from.apply(this, arguments);
  };

  
  constructor.prototype.parentCall = function(/*string*/ method) {/*TC*/__t([method,'string','method']);/*/TC*/
    return from.prototype[method].apply(this,
      Array.prototype.slice.call(arguments, 1));
  };

  constructor.extend = function(/*object?*/ prototype, mixins) {/*TC*/__t([prototype,'object?','prototype']);/*/TC*/
    return extend(this, prototype, mixins);
  };
  return constructor;
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

copyProperties(Type.prototype, {
  instanceOf: function(/*function*/ type) /*boolean*/ {/*TC*/__t([type,'function','type']); return __t([function(){/*/TC*/
    return instanceOf(type, this);
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}
});

copyProperties(Type, {
  extend: function(prototype, mixins) /*function*/ {/*TC*/ return __t([function(){/*/TC*/
    return typeof prototype === 'function'
      ? extend.apply(null, arguments)
      : extend(null, prototype, mixins);
  /*TC*/}.apply(this, arguments), 'function']);/*/TC*/},
  instanceOf: instanceOf
});

module.exports = Type;

});
__d("ObservableMixin",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function ObservableMixin() {
  this.__observableEvents = {};
}

ObservableMixin.prototype = {

  
  inform: function(/*string*/ what /*, args*/) {/*TC*/__t([what,'string','what']);/*/TC*/

    var args = Array.prototype.slice.call(arguments, 1);
    var list = Array.prototype.slice.call(this.getSubscribers(what));
    for (var i = 0; i < list.length; i++) {
      if (list[i] === null) continue;
      try {
        list[i].apply(this, args);
      } catch(e) {
        
        
        setTimeout(function() { throw e; }, 0);
      }
    }
    return this;
  },

  
  getSubscribers: function(/*string*/ toWhat) /*array*/ {/*TC*/__t([toWhat,'string','toWhat']); return __t([function(){/*/TC*/

    return this.__observableEvents[toWhat] ||
      (this.__observableEvents[toWhat] = []);
  /*TC*/}.apply(this, arguments), 'array']);/*/TC*/},

  
  clearSubscribers: function(/*string*/ toWhat) {/*TC*/__t([toWhat,'string','toWhat']);/*/TC*/

    if (toWhat) {
      this.__observableEvents[toWhat] = [];
    }
    return this;
  },

  
  clearAllSubscribers: function() {
    this.__observableEvents = {};
    return this;
  },

  
  subscribe: function(/*string*/ toWhat, /*function*/ withWhat) {/*TC*/__t([toWhat,'string','toWhat'],[withWhat,'function','withWhat']);/*/TC*/

    var list = this.getSubscribers(toWhat);
    list.push(withWhat);
    return this;
  },

  
  unsubscribe: function(/*string*/ toWhat, /*function*/ withWhat) {/*TC*/__t([toWhat,'string','toWhat'],[withWhat,'function','withWhat']);/*/TC*/

    var list = this.getSubscribers(toWhat);
    for (var i = 0; i < list.length; i++) {
      if (list[i] === withWhat) {
        list.splice(i, 1);
        break;
      }
    }
    return this;
  },

  
  monitor: function(/*string*/ toWhat, /*function*/ withWhat) {/*TC*/__t([toWhat,'string','toWhat'],[withWhat,'function','withWhat']);/*/TC*/
    if (!withWhat()) {
      var monitor = ES5(function(value) {
        if (withWhat.apply(withWhat, arguments)) {
          this.unsubscribe(toWhat, monitor);
        }
      }, 'bind', true,this);
      this.subscribe(toWhat, monitor);
    }
    return this;
  }

};


module.exports = ObservableMixin;

});
__d("sdk.Model",["Type","ObservableMixin"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Type = require('Type');
var ObservableMixin = require('ObservableMixin');

var Model = Type.extend({
  constructor: function(/*object*/ properties) {/*TC*/__t([properties,'object','properties']);/*/TC*/
    this.parent();

    
    var propContainer = {};
    var model = this;

    ES5(ES5('Object', 'keys', false,properties), 'forEach', true,function(/*string*/ name) {/*TC*/__t([name,'string','name']);/*/TC*/
      
      propContainer[name] = properties[name];

      
      model['set' + name] = function(value) {
        if (value === propContainer[name]) {
          return this;
        }
        propContainer[name] = value;
        model.inform(name + '.change', value);
        return model;
      };

      
      model['get' + name] = function() {
        return propContainer[name];
      };
    });
  }
}, ObservableMixin);

module.exports = Model;

});
__d("sdk.Runtime",["sdk.Model","copyProperties","sdk.RuntimeConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Model = require('sdk.Model');
var copyProperties = require('copyProperties');
var RuntimeConfig = requireDynamic('sdk.RuntimeConfig');

var ENVIRONMENTS = {
  UNKNOWN: 0,
  PAGETAB: 1,
  CANVAS: 2,
  PLATFORM: 4
};

var Runtime = new Model({
  AccessToken: '',
  ClientID: '',
  Environment: ENVIRONMENTS.UNKNOWN,
  Initialized: false,
  Locale: RuntimeConfig.locale,
  LoginStatus: undefined,
  Rtl: RuntimeConfig.rtl,
  Scope: undefined,
  Secure: undefined,
  UseCookie: false,
  UserID: ''
});

copyProperties(Runtime, {

  ENVIRONMENTS: ENVIRONMENTS,

  isEnvironment: function(/*number*/ target) /*boolean*/ {/*TC*/__t([target,'number','target']); return __t([function(){/*/TC*/
    var environment = this.getEnvironment();
    return (target | environment) === environment;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}
});

(function() {
  var environment = /app_runner/.test(window.name)
    ? ENVIRONMENTS.PAGETAB
    : /iframe_canvas/.test(window.name)
      ? ENVIRONMENTS.CANVAS
      : ENVIRONMENTS.UNKNOWN;

  
  if ((environment | ENVIRONMENTS.PAGETAB) === environment) {
    environment = environment | ENVIRONMENTS.CANVAS;
  }
  Runtime.setEnvironment(environment);
})();

module.exports = Runtime;

});
__d("sdk.Cookie",["QueryString","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');



var domain = null;


function setRaw(/*string*/ prefix, /*string*/ val, /*number*/ ts) {/*TC*/__t([prefix,'string','prefix'],[val,'string','val'],[ts,'number','ts']);/*/TC*/
  prefix = prefix + Runtime.getClientID();

  var useDomain = domain && domain !== '.';
  
  if (useDomain) {
    
    document.cookie = prefix + '=; expires=Wed, 04 Feb 2004 08:00:00 GMT;';
    
    document.cookie = prefix  + '=; expires=Wed, 04 Feb 2004 08:00:00 GMT;' +
      'domain=' + location.hostname + ';';
  }

  var expires = new Date(ts).toGMTString();
  document.cookie = prefix +  '=' + val +
    (val && ts === 0 ? '' : '; expires=' + expires) +
    '; path=/' +
    (useDomain ? '; domain=' + domain : '');
}

function getRaw(/*string*/ prefix) /*string?*/ {/*TC*/__t([prefix,'string','prefix']); return __t([function(){/*/TC*/
  prefix = prefix + Runtime.getClientID();
  var regExp = new RegExp('\\b' + prefix + '=([^;]*)\\b');
  return regExp.test(document.cookie)
    ? RegExp.$1
    : null;
/*TC*/}.apply(this, arguments), 'string?']);/*/TC*/}

var Cookie = {
  setDomain: function(/*string?*/ val) {/*TC*/__t([val,'string?','val']);/*/TC*/
    domain = val;
    
    var meta  = QueryString.encode({
      base_domain: domain && domain !== '.' ? domain : ''
    });
    var expiration = new Date();
    expiration.setFullYear(expiration.getFullYear() + 1);
    setRaw('fbm_', meta, expiration.getTime());
  },

  getDomain: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*/
    return domain;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  
  loadMeta: function() /*object?*/ {/*TC*/ return __t([function(){/*/TC*/
    var cookie = getRaw('fbm_');
    if (cookie) {
      
      var meta = QueryString.decode(cookie);
      if (!domain) {
        
        domain = meta.base_domain;
      }
      return meta;
    }
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/},

  
  loadSignedRequest: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*/
    return getRaw('fbsr_');
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  
  setSignedRequestCookie: function(/*string*/ signedRequest,
      /*number*/ expiration) {/*TC*/__t([signedRequest,'string','signedRequest'],[expiration,'number','expiration']);/*/TC*/
    if (!signedRequest) {
      throw new Error('Value passed to Cookie.setSignedRequestCookie ' +
                      'was empty.');
    }
    setRaw('fbsr_', signedRequest, expiration);
  },

  
  clearSignedRequestCookie: function() {
    setRaw('fbsr_', '', 0);
  },

  setRaw: setRaw
};

module.exports = Cookie;

});
__d("guid",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function guid() {
  return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '');
}

module.exports = guid;

});
__d("sdk.createIframe",["copyProperties","guid"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var guid = require('guid');




var hasNamePropertyBug = function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    var form = document.createElement("form"),
        input = form.appendChild(document.createElement("input")),
        hasBug;
    input.name = guid();
    hasBug = input !== form.elements[input.name];
    form = input = null;
    hasNamePropertyBug = function() { return hasBug; };
    return hasBug;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/};

function createIframe(/*object*/ opts) /*DOMElement*/ {/*TC*/__t([opts,'object','opts']); return __t([function(){/*/TC*/
  var frame = hasNamePropertyBug()
    ? document.createElement('<iframe name="' + opts.name + '"/>')
    : document.createElement("iframe");

  if (opts.style) {
    copyProperties(frame.style, opts.style);
  }
  frame.name = frame.id = opts.name;
  
  
  
  
  
  frame.src = "javascript:false";
  opts.root.appendChild(frame);
  
  
  frame.src = opts.url;
  return frame;
/*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/}

module.exports = createIframe;

});
__d("DOMWrapper",[],function(global,require,requireDynamic,requireLazy,module,exports) {
/*global self:true*/
var rootElement,
    windowRef;



var DOMWrapper = {
  setRoot: function(/*DOMElement?*/ root) {/*TC*/__t([root,'DOMElement?','root']);/*/TC*/
    rootElement = root;
  },
  getRoot: function() /*DOMElement*/ {/*TC*/ return __t([function(){/*/TC*/
    return rootElement || document.body;
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},
  setWindow: function(win) {
    windowRef = win;
  },
  getWindow: function() {
    return windowRef || self;
  }
};

module.exports = DOMWrapper;

});
__d("UserAgent",[],function(global,require,requireDynamic,requireLazy,module,exports) {



var _populated = false;


var _ie, _firefox, _opera, _webkit, _chrome;


var _osx, _windows, _linux, _android;


var _win64;


var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true;

  
  
  
  
  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/.exec(uas);
  var os    = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas);

  
  
  
  
  
  _win64 = !!(/Win64/.exec(uas));

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : NaN;
    
    if (_ie && document.documentMode) {
      _ie = document.documentMode;
    }
    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera   = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit  = agent[4] ? parseFloat(agent[4]) : NaN;
    if (_webkit) {
      
      
      
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      
      
      
      
      
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }
    _windows = !!os[2];
    _linux   = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent = {

  
  ie: function() {
    return _populate() || _ie;
  },


  
  ie64: function() {
    return UserAgent.ie() && _win64;
  },

  
  firefox: function() {
    return _populate() || _firefox;
  },


  
  opera: function() {
    return _populate() || _opera;
  },


  
  webkit: function() {
    return _populate() || _webkit;
  },

  
  safari: function() {
    return UserAgent.webkit();
  },

  
  chrome : function() {
    return _populate() || _chrome;
  },


  
  windows: function() {
    return _populate() || _windows;
  },


  
  osx: function() {
    return _populate() || _osx;
  },

  
  linux: function() {
    return _populate() || _linux;
  },

  
  iphone: function() {
    return _populate() || _iphone;
  },

  mobile: function() {
    return _populate() || (_iphone || _ipad || _android || _mobile);
  },

  nativeApp: function() {
    
    return _populate() || _native;
  },

  android: function() {
    return _populate() || _android;
  },

  ipad: function() {
    return _populate() || _ipad;
  }
};

module.exports = UserAgent;

});
__d("sdk.getContextType",["UserAgent","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var UserAgent = require('UserAgent');
var Runtime = require('sdk.Runtime');

function getContextType() /*number*/ {/*TC*/ return __t([function(){/*/TC*/
  
  
  
  
  
  
  if (UserAgent.nativeApp()) {
    return 3;
  }
  if (UserAgent.mobile()) {
    return 2;
  }
  if (Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)) {
    return 5;
  }
  return 1;
/*TC*/}.apply(this, arguments), 'number']);/*/TC*/}

module.exports = getContextType;

});
__d("Log",["sprintf"],function(global,require,requireDynamic,requireLazy,module,exports) {

/*globals console */

var sprintf = require('sprintf');

var Level = {
  DEBUG    : 3,
  INFO     : 2,
  WARNING  : 1,
  ERROR    : 0
};

function doLog(level, name/*, args*/ ) {
  var args = Array.prototype.slice.call(arguments, 2);
  var msg = sprintf.apply(null, args);
  var console = window.console;
  if (console && Log.level >= level) {
    console[name in console ? name : 'log'](msg);
  }
}

var Log = {
  
  level: __DEV__ ? 3 : -1,

  
  Level: Level,

  
  debug : ES5(doLog, 'bind', true,null, Level.DEBUG,   'debug'),
  info  : ES5(doLog, 'bind', true,null, Level.INFO,    'debug'),
  warn  : ES5(doLog, 'bind', true,null, Level.WARNING, 'debug'),
  error : ES5(doLog, 'bind', true,null, Level.ERROR,   'debug')
};
module.exports = Log;


});
__d("Base64",[],function(global,require,requireDynamic,requireLazy,module,exports) {




var en =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function en3(c) {
  c = (c.charCodeAt(0) << 16) | (c.charCodeAt(1) << 8) | c.charCodeAt(2);
  return String.fromCharCode(
    en.charCodeAt(c >>> 18), en.charCodeAt((c >>> 12) & 63),
    en.charCodeAt((c >>> 6) & 63), en.charCodeAt(c & 63));
}




var de =
  '>___?456789:;<=_______' +
  '\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31' +
  '______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';
function de4(c) {
  c = (de.charCodeAt(c.charCodeAt(0) - 43) << 18) |
      (de.charCodeAt(c.charCodeAt(1) - 43) << 12) |
      (de.charCodeAt(c.charCodeAt(2) - 43) <<  6) |
       de.charCodeAt(c.charCodeAt(3) - 43);
  return String.fromCharCode(c >>> 16, (c >>> 8) & 255, c & 255);
}

var Base64 = {
  encode: function(s) {
    
    s = unescape(encodeURI(s));
    var i = (s.length + 2) % 3;
    s = (s + '\0\0'.slice(i)).replace(/[\s\S]{3}/g, en3);
    return s.slice(0, s.length + i - 2) + '=='.slice(i);
  },
  decode: function(s) {
    
    s = s.replace(/[^A-Za-z0-9+\/]/g, '');
    var i = (s.length + 3) & 3;
    s = (s + 'AAA'.slice(i)).replace(/..../g, de4);
    s = s.slice(0, s.length + i - 3);
    
    try { return decodeURIComponent(escape(s)); }
    catch (_) { throw new Error('Not valid UTF-8'); }
  },
  encodeObject: function(obj) {
    return Base64.encode(ES5('JSON', 'stringify', false,obj));
  },
  decodeObject: function(b64) {
    return ES5('JSON', 'parse', false,Base64.decode(b64));
  },
  
  encodeNums: function(l) {
    return String.fromCharCode.apply(String, ES5(l, 'map', true,function(val) {
      return en.charCodeAt((val | -(val > 63)) & -(val > 0) & 63);
    }));
  }
};

module.exports = Base64;

});
__d("sdk.SignedRequest",["Base64"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Base64 = require('Base64');

function parse(/*string?*/ signed_request) /*object?*/ {/*TC*/__t([signed_request,'string?','signed_request']); return __t([function(){/*/TC*/
  if (!signed_request) {
    return null;
  }

  
  var payload = signed_request.split('.', 2)[1]
    .replace(/\-/g, '+').replace(/\_/g, '/');
  return Base64.decodeObject(payload);
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}


var SignedRequest = {
  parse: parse
};

module.exports = SignedRequest;

});
__d("UrlMap",["UrlMapConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var UrlMapConfig = requireDynamic('UrlMapConfig');

var UrlMap = {
  
  resolve: function(/*string*/ key, /*boolean?*/ https) /*string*/ {/*TC*/__t([key,'string','key'],[https,'boolean?','https']); return __t([function(){/*/TC*/
    var protocol = typeof https == 'undefined'
      ? location.protocol.replace(':', '')
      : https ? 'https' : 'http';

    
    if (key in UrlMapConfig) {
      return protocol + '://' + UrlMapConfig[key];
    }

    
    if (typeof https == 'undefined' && key + '_' + protocol in UrlMapConfig) {
      return protocol + '://' + UrlMapConfig[key + '_' + protocol];
    }

    
    if (https !== true && key + '_http' in UrlMapConfig) {
      return 'http://' + UrlMapConfig[key + '_http'];
    }

    
    if (https !== false && key + '_https' in UrlMapConfig) {
      return 'https://' + UrlMapConfig[key + '_https'];
    }
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
};

module.exports = UrlMap;

});
__d("URL",["Assert","copyProperties","QueryString","Log"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Assert = require('Assert');
var copyProperties = require('copyProperties');
var QueryString = require('QueryString');
var Log = require('Log');



var urlRe = new RegExp(
  '(' + 
    '(((\\w+):)?//)' + 
    '(.*?@)?' + 
    '([^~/?#:]+)' + 
    '(:(\\d+))?' + 
  ')?' +
  '([^\\?$#]+)?' + 
  '(\\?([^$#]+))?' + 
  '(#([^$]+))?' 
);


var bannedRe = /[\0\\]/;

var unsafeRe = /[^\w\-\.,;\/?:@=&%#$~+!*'\[\]()]+/g;

var domainRe = /^[a-z0-9.][a-z0-9\-\.]+[a-z0-9.]$/;

var facebookRe = /\.facebook\.com$/;


function URL(/*string*/ url) {/*TC*/__t([url,'string','url']);/*/TC*/
  Assert.isString(url, 'The passed argument was of invalid type.');

  if (bannedRe.test(url)) {
    throw new URIError('The passed argument could not be parsed as a url.');
  }

  
  if (this instanceof URL === false) {
    return new URL(url);
  }

  
  var match = url
    .replace(unsafeRe, function(m) {
      Log.warn('Escaping unescaped character \\x%s from "%s"',
        m.charCodeAt(0).toString(16), url);
      return encodeURIComponent(m);
    })
    .match(urlRe);

  if (!url || !match) {
    throw new URIError('The passed argument could not be parsed as a url.');
  }

  
  
  
  var useDefaults = !!location.hostname;

  this.setProtocol(match[4] ||
    (useDefaults ? location.protocol.replace(/:/, '') : ''));
  this.setDomain(match[6] || location.hostname);
  this.setPort(match[8] || (useDefaults && !match[6] ? location.port : ''));
  this.setPath(match[9] || '');
  this.setSearch(match[11] || '');
  this.setFragment(match[13] || '');

  if (this._path.substring(0,1) != '/') {
    this._path = '/' + this._path;
  }

  
  if (this._domain &&
      !domainRe.test(decodeURIComponent(this._domain.toLowerCase()))) {
    Log.error('Invalid characters found in domain name: %s', this._domain);
    throw new URIError('Domain contained invalid characters.');
  }
}

copyProperties(URL.prototype, {
  constructor : URL,

  getProtocol: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._protocol;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setProtocol: function(/*string*/ protocol) /*object*/ {/*TC*/__t([protocol,'string','protocol']); return __t([function(){/*/TC*/
    this._protocol = protocol;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getDomain: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._domain;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setDomain: function(/*string*/ domain) /*object*/ {/*TC*/__t([domain,'string','domain']); return __t([function(){/*/TC*/
    this._domain = domain;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getPort: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._port;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setPort: function(port) /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    this._port = port;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getPath: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._path;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setPath: function(path) /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    this._path = path;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getSearch: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._search;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setSearch: function(search) /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    this._search = search;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getFragment: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._fragment;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  setFragment: function(fragment) /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    this._fragment = fragment;
    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getParsedSearch: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return QueryString.decode(this._search);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getParsedFragment: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return QueryString.decode(this._fragment);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  isFacebookURL: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    return facebookRe.test(this._domain);
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  toString: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return (this._protocol ? this._protocol + ':' : '') +
      (this._domain ? '//' + this._domain : '') +
      (this._port ? ':' + this._port : '') +
      this._path +
      (this._search ? '?' + this._search : '') +
      (this._fragment ? '#' + this._fragment : '');
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},
  valueOf: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this.toString();
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
});

copyProperties(URL, {

  getCurrent: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return new URL(location.href);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  getReferrer: function() /*object?*/ {/*TC*/ return __t([function(){/*/TC*/
    return document.referrer
      ? new URL(document.referrer)
      : null;
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

});

module.exports = URL;

});
__d("sdk.domReady",[],function(global,require,requireDynamic,requireLazy,module,exports) {
var queue;
var domIsReady = "readyState" in document
  ? /loaded|complete/.test(document.readyState)
  
  
  
  
  
  : !!document.body;

function flush() {
  if (!queue) {
    return;
  }

  var fn;
  while (fn = queue.shift()) {
    fn();
  }
  queue = null;
}

function domReady(/*function*/ fn) {/*TC*/__t([fn,'function','fn']);/*/TC*/
  if (queue) {
    queue.push(fn);
    return;
  } else {
    fn();
  }
}

if(!domIsReady) {
  queue = [];
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', flush, false);
    window.addEventListener('load', flush, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', flush);
    window.attachEvent('onload', flush);
  }

  
  
  if (document.documentElement.doScroll && window == window.top) {
    var test = function() {
      try {
        
        
        document.documentElement.doScroll('left');
      } catch(error) {
        setTimeout(test, 0);
        return;
      }
      flush();
    };
    test();
  }
}

module.exports = domReady;

},3);
__d("sdk.Content",["sdk.domReady","Log","UserAgent"],function(global,require,requireDynamic,requireLazy,module,exports) {

var domReady = require('sdk.domReady');
var Log = require('Log');
var UserAgent = require('UserAgent');

var visibleRoot;
var hiddenRoot;

var Content = {

  
  append: function(content, /*DOMElement?*/ root) /*DOMElement*/{/*TC*/__t([root,'DOMElement?','root']);/*/TC*/
    
    if (!root) {
      if (!visibleRoot) {
        visibleRoot = root = document.getElementById('fb-root');
        if (!root) {
          Log.warn('The "fb-root" div has not been created, auto-creating');
          
          visibleRoot = root = document.createElement('div');
          root.id = 'fb-root';
          
          
          
          
          
          if (UserAgent.ie() || !document.body) {
            domReady(function() {
              document.body.appendChild(root);
            });
          } else {
            document.body.appendChild(root);
          }
        }
        root.className += ' fb_reset';
      } else {
        root = visibleRoot;
      }
    }

    if (typeof content == 'string') {
      var div = document.createElement('div');
      root.appendChild(div).innerHTML = content;
      return div;
    } else {
      return root.appendChild(content);
    }
  },

  
  appendHidden: function(content) /*DOMElement*/ {/*TC*/ return __t([function(){/*/TC*/
    if (!hiddenRoot) {
      var
        hiddenRoot = document.createElement('div'),
        style      = hiddenRoot.style;
      style.position = 'absolute';
      style.top      = '-10000px';
      style.width    = style.height = 0;
      hiddenRoot = Content.append(hiddenRoot);
    }

    return Content.append(content, hiddenRoot);
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},

  
  submitToTarget: function(/*object*/ opts, /*boolean?*/ get) {/*TC*/__t([opts,'object','opts'],[get,'boolean?','get']);/*/TC*/
    var form = document.createElement('form');
    form.action = opts.url;
    form.target = opts.target;
    form.method = (get) ? 'GET' : 'POST';
    Content.appendHidden(form);

    for (var key in opts.params) {
      if (opts.params.hasOwnProperty(key)) {
        var val = opts.params[key];
        if (val !== null && val !== undefined) {
          var input = document.createElement('input');
          input.name = key;
          input.value = val;
          form.appendChild(input);
        }
      }
    }

    form.submit();
    form.parentNode.removeChild(form);
  }
};

module.exports = Content;

});
__d("wrapFunction",[],function(global,require,requireDynamic,requireLazy,module,exports) {

var wrappers = {};
function wrapFunction(/*function*/ fn, /*string?*/ type, /*string?*/ source)
    /*function*/ {/*TC*/__t([fn,'function','fn'],[type,'string?','type'],[source,'string?','source']); return __t([function(){/*/TC*/
  type = type || 'default';

  return function() {
    var callee = type in wrappers
      ? wrappers[type](fn, source)
      : fn;

    return callee.apply(this, arguments);
  };
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

wrapFunction.setWrapper = function(/*function*/ fn, /*string?*/ type) {/*TC*/__t([fn,'function','fn'],[type,'string?','type']);/*/TC*/
  type = type || 'default';
  wrappers[type] = fn;
};

module.exports = wrapFunction;

});
__d("sdk.Event",["wrapFunction"],function(global,require,requireDynamic,requireLazy,module,exports) {

var wrapFunction = require('wrapFunction');

var Event = {
  
  subscribers: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    
    
    
    
    if (!this._subscribersMap) {
      this._subscribersMap = {};
    }
    return this._subscribersMap;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  subscribe: function(/*string*/ name, /*function*/ cb) {/*TC*/__t([name,'string','name'],[cb,'function','cb']);/*/TC*/
    var subs = this.subscribers();

    if (!subs[name]) {
      subs[name] = [cb];
    } else {
      subs[name].push(cb);
    }
  },

  
  unsubscribe: function(/*string*/ name, /*function*/ cb) {/*TC*/__t([name,'string','name'],[cb,'function','cb']);/*/TC*/
    var subs = this.subscribers()[name];
    if (subs) {
      ES5(subs, 'forEach', true,function(value, key) {
        if (value == cb) {
          subs[key] = null;
        }
      });
    }
  },

  
  monitor: function(/*string*/ name, /*function*/ callback) {/*TC*/__t([name,'string','name'],[callback,'function','callback']);/*/TC*/
    if (!callback()) {
      var
        ctx = this,
        fn = function() {
          if (callback.apply(callback, arguments)) {
            ctx.unsubscribe(name, fn);
          }
        };

      this.subscribe(name, fn);
    }
  },

  
  clear: function(/*string*/ name) {/*TC*/__t([name,'string','name']);/*/TC*/
    delete this.subscribers()[name];
  },

  
  fire: function() {
    var
      args = Array.prototype.slice.call(arguments),
      name = args.shift(),
      subs = this.subscribers()[name];

    if (subs) {
      ES5(subs, 'forEach', true,function(sub) {
        
        
        if (sub) {
          sub.apply(this, args);
        }
      });
    }
  }
};

module.exports = Event;

});
__d("Queue",["copyProperties"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');


var registry = {};


function Queue(opts) {
  
  this._opts = copyProperties({
    interval: 0,
    processor: null
  }, opts);

  
  this._queue = [];
  this._stopped = true;
}


copyProperties(Queue.prototype, {

  
  _dispatch: function(force) {
    if (this._stopped || this._queue.length === 0) {
      return;
    }
    if (!this._opts.processor) {
      this._stopped = true;
      throw new Error('No processor available');
    }

    if (this._opts.interval) {
      this._opts.processor.call(this, this._queue.shift());
      this._timeout = setTimeout(
        ES5(this._dispatch, 'bind', true,this),
        this._opts.interval
      );
    } else {
      while(this._queue.length) {
        this._opts.processor.call(this, this._queue.shift());
      }
    }
  },

  
  enqueue: function(message) {
    if (this._opts.processor && !this._stopped) {
      this._opts.processor.call(this, message);
    } else {
      this._queue.push(message);
    }
    return this;
  },

  
  start: function(processor) {
    if (processor) {
      this._opts.processor = processor;
    }
    this._stopped = false;
    this._dispatch();
    return this;
  },

  
  dispatch: function() {
    this._dispatch(true);
  },

  
  stop: function(scheduled) {
    this._stopped = true;
    if (scheduled) {
      clearTimeout(this._timeout);
    }
    return this;
  },

  
  merge: function(queue, prepend) {
    this._queue[prepend ? 'unshift' : 'push']
      .apply(this._queue, queue._queue);
    queue._queue = [];
    this._dispatch();
    return this;
  },

  
  getLength: function() {
    return this._queue.length;
  }

});


copyProperties(Queue, {

  
  get: function(name, opts) {
   var queue;
   if (name in registry) {
     queue = registry[name];
   } else {
    queue = registry[name] = new Queue(opts);
   }
   return queue;
  },

  
  exists: function(name) {
    return name in registry;
  },

  
  remove: function(name) {
    return delete registry[name];
  }

});


module.exports = Queue;

});
__d("resolveURI",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function resolveURI(/*string?*/ uri) /*string*/ {/*TC*/__t([uri,'string?','uri']); return __t([function(){/*/TC*/
  if (!uri) { 
    return window.location.href;
  }

  uri = uri.replace(/&/g, '&amp;') 
           .replace(/"/g, '&quot;'); 

  var div = document.createElement('div');
  
  
  div.innerHTML = '<a href="' + uri + '"></a>';

  return div.firstChild.href; 
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

module.exports = resolveURI;

});
__d("resolveWindow",[],function(global,require,requireDynamic,requireLazy,module,exports) {



function resolveWindow(path) {
  var node = window; 
  var parts = path.split('.');

  try {
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      
      var matches = /^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(part);

      if (matches) {
        node = node.frames[matches[1]];
      } else if (part === 'opener' || part === 'parent' || part === 'top') {
        node = node[part];
      } else {
        return null;
      }
    }
  } catch (securityOrReferenceException) {
    return null;
  }

  return node;
}

module.exports = resolveWindow;

});
__d("JSONRPC",["copyProperties","Log"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var Log = require('Log');

function JSONRPC(/*function*/ write) {/*TC*/__t([write,'function','write']);/*/TC*/
  this._counter = 0;
  this._callbacks = {};

  this.remote = {};
  this.local = {};

  this._write = write;
}

copyProperties(JSONRPC.prototype, {

  
  stub: function(/*string*/ stub) {/*TC*/__t([stub,'string','stub']);/*/TC*/
    this.remote[stub] = ES5(function() {
      var args = Array.prototype.slice.call(arguments),
          message = {
            jsonrpc: '2.0',
            method: stub
          };

      if (typeof args[args.length - 1] == 'function') {
        message.id = ++this._counter;
        this._callbacks[message.id] = args.pop();
      }

      message.params = args;

      this._write(ES5('JSON', 'stringify', false,message),{method: stub });
    }, 'bind', true,this);
  },

  
  read: function(/*string*/ message, context) {/*TC*/__t([message,'string','message']);/*/TC*/
    var rpc = ES5('JSON', 'parse', false,message), id = rpc.id;

    if (!rpc.method) {
      
      if (!this._callbacks[id]) {
        Log.warn('Could not find callback %s', id);
        return;
      }
      var callback = this._callbacks[id];
      delete this._callbacks[id];

      delete rpc.id;
      delete rpc.jsonrpc;

      callback(rpc);
      return;
    }

    
    var instance = this, method = this.local[rpc.method], send;
    if (id) {
      
      send = function(/*string*/ type, value) {/*TC*/__t([type,'string','type']);/*/TC*/
        var response = {
          jsonrpc: '2.0',
          id: id
        };
        response[type] = value;

        
        
        setTimeout(function() {
          instance._write(ES5('JSON', 'stringify', false,response), context);
        }, 0);
      };
    } else {
      
      send = function() {};
    }

    if (!method) {
      Log.error('Method "%s" has not been defined', rpc.method);

      send('error', {
        code: -32601,
        message: 'Method not found',
        data: rpc.method
      });
      return;
    }

    
    rpc.params.push(ES5(send, 'bind', true,null, 'result'));
    rpc.params.push(ES5(send, 'bind', true,null, 'error'));

    
    try {
      var returnValue = method.apply(context || null, rpc.params);
      
      if (typeof returnValue !== 'undefined') {
        send('result', returnValue);
      }
    } catch(rpcEx) {
      Log.error('Invokation of RPC method %s resulted in the error: %s',
        rpc.method, rpcEx.message);

      send('error', {
        code: -32603,
        message: 'Internal error',
        data: rpcEx.message
      });
    }
  }

});

module.exports = JSONRPC;

});
__d("sdk.RPC",["Assert","JSONRPC","Queue"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Assert = require('Assert');
var JSONRPC = require('JSONRPC');
var Queue = require('Queue');

var outQueue = new Queue();
var jsonrpc = new JSONRPC(function(/*string*/ message) {/*TC*/__t([message,'string','message']);/*/TC*/
  outQueue.enqueue(message);
});

var RPC = {
  local: jsonrpc.local,
  remote: jsonrpc.remote,
  stub: ES5(jsonrpc.stub, 'bind', true,jsonrpc),
  setInQueue: function(/*object*/ queue) {/*TC*/__t([queue,'object','queue']);/*/TC*/
    Assert.isInstanceOf(Queue, queue);

    queue.start(function(/*string*/ message) {/*TC*/__t([message,'string','message']);/*/TC*/
      jsonrpc.read(message);
    });
  },
  getOutQueue: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return outQueue;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
};

module.exports = RPC;

});
__d("DOMEventListener",["wrapFunction"],function(global,require,requireDynamic,requireLazy,module,exports) {

var wrapFunction = require('wrapFunction');

var add, remove;

if (window.addEventListener) {

  
  add = function(target, /*string*/ name, /*function*/ listener) {/*TC*/__t([name,'string','name'],[listener,'function','listener']);/*/TC*/
    listener.wrapper = wrapFunction(listener, 'entry', target + ':' + name);
    target.addEventListener(name, listener.wrapper, false);
  };
  remove = function(target, /*string*/ name, /*function*/ listener) {/*TC*/__t([name,'string','name'],[listener,'function','listener']);/*/TC*/
    target.removeEventListener(name, listener.wrapper, false);
  };

} else if (window.attachEvent) {

  
  add = function(target, /*string*/ name, /*function*/ listener) {/*TC*/__t([name,'string','name'],[listener,'function','listener']);/*/TC*/
    listener.wrapper = wrapFunction(listener, 'entry', target + ':' + name);
    target.attachEvent('on' + name, listener.wrapper);
  };
  remove = function(target, /*string*/ name, /*function*/ listener) {/*TC*/__t([name,'string','name'],[listener,'function','listener']);/*/TC*/
    target.detachEvent('on' + name, listener.wrapper);
  };

}

var DOMEventListener = {

  
  add: function(target, /*string*/ name, /*function*/ listener) {/*TC*/__t([name,'string','name'],[listener,'function','listener']);/*/TC*/
    
    
    add(target, name, listener);
    return {
      
      
      
      remove: function() {
        remove(target, name, listener);
        target = null;
      }
    };
  },

  
  remove: remove

};
module.exports = DOMEventListener;

});
__d("Flash",["DOMWrapper","QueryString","UserAgent","copyProperties","guid"],function(global,require,requireDynamic,requireLazy,module,exports) {

/*globals ActiveXObject */

var DOMWrapper = require('DOMWrapper');
var QueryString = require('QueryString');
var UserAgent = require('UserAgent');

var copyProperties = require('copyProperties');
var guid = require('guid');

var registry = {};
var unloadHandlerAttached;
var document = DOMWrapper.getWindow().document;

function remove(id) {
  var swf = document.getElementById(id);
  if (swf) {
    swf.parentNode.removeChild(swf);
  }
  delete registry[id];
}

function unloadRegisteredSWFs() {
  for (var id in registry) {
    if (registry.hasOwnProperty(id)) {
        remove(id);
    }
  }
}


function normalize(s) {
  return s.replace(
    /\d+/g,
    function (m) { return '000'.substring(m.length) + m; }
  );
}

function register(id) {
  if (!unloadHandlerAttached) {
    
    
    if (UserAgent.ie() >= 9) {
      window.attachEvent('onunload', unloadRegisteredSWFs);
    }
    unloadHandlerAttached = true;
  }
  registry[id] = id;
}


var Flash = {

  
  embed: function(src, container, params, flashvars) {
    
    var id = guid();
    
    src = encodeURI(src);

    
    params = copyProperties({
        allowscriptaccess: 'always',
        flashvars: flashvars,
        movie: src
      },
      params || {});

    
    if (typeof params.flashvars == 'object') {
      params.flashvars = QueryString.encode(params.flashvars);
    }

    
    var pElements = [];
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        
        pElements.push('<param name="' + encodeURI(key) + '" value="' +
          encodeURI(params[key]) + '">');
      }
    }

    var div = document.createElement('div');
    var html =
      '<object ' + (UserAgent.ie()
         ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
         : 'type="application/x-shockwave-flash"') +
        'data="' + src + '" ' +
        'id="' + id + '">' + pElements.join('') + '</object>';
    div.innerHTML = html;
    var swf = container.appendChild(div.firstChild);

    register(id);
    return swf;
  },

  
  remove: remove,

  
  getVersion: function() {
    var name = 'Shockwave Flash';
    var mimeType = 'application/x-shockwave-flash';
    var activexType = 'ShockwaveFlash.ShockwaveFlash';
    var flashVersion;

    if (navigator.plugins && typeof navigator.plugins[name] == 'object') {
        
        var description = navigator.plugins[name].description;
        if (description && navigator.mimeTypes &&
              navigator.mimeTypes[mimeType] &&
              navigator.mimeTypes[mimeType].enabledPlugin) {
            flashVersion = description.match(/\d+/g);
        }
    }
    if (!flashVersion) {
        try {
            flashVersion = (new ActiveXObject(activexType))
              .GetVariable('$version')
              .match(/(\d+),(\d+),(\d+),(\d+)/);
            flashVersion = Array.prototype.slice.call(flashVersion, 1);
        }
        catch (notSupportedException) {
        }
    }
    return flashVersion;
  },

  
  checkMinVersion: function(minVersion) {
    var version = Flash.getVersion();
    if (!version) {
      return false;
    }
    return normalize(version.join('.')) >= normalize(minVersion);
  },

  
  isAvailable : function() {
    return !!Flash.getVersion();
  }

};

module.exports = Flash;

});
__d("emptyFunction",["copyProperties"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}


function emptyFunction() {}

copyProperties(emptyFunction, {
  thatReturns: makeEmptyFunction,
  thatReturnsFalse: makeEmptyFunction(false),
  thatReturnsTrue: makeEmptyFunction(true),
  thatReturnsNull: makeEmptyFunction(null),
  thatReturnsThis: function() { return this; },
  thatReturnsArgument: function(arg) { return arg; }
});

module.exports = emptyFunction;

});
__d("XDM",["DOMEventListener","DOMWrapper","Flash","Log","UserAgent","emptyFunction","guid"],function(global,require,requireDynamic,requireLazy,module,exports) {

/*globals __fbNative */

var DOMEventListener = require('DOMEventListener');
var DOMWrapper = require('DOMWrapper');
var Flash = require('Flash');
var Log = require('Log');
var UserAgent = require('UserAgent');

var emptyFunction = require('emptyFunction');
var guid = require('guid');

var transports = {};
var configuration = {
  transports : []
};
var window = DOMWrapper.getWindow();

function findTransport(blacklist) {
  var blacklistMap = {},
      i = blacklist.length,
      list = configuration.transports;

  while (i--) { blacklistMap[blacklist[i]] = 1; }

  i = list.length;
  while (i--) {
    var name = list[i],
        transport = transports[name];
    if (!blacklistMap[name] && transport.isAvailable()) {
      return name;
    }
  }
}

var XDM = {

  
  register: function(name, provider) {
    Log.debug('Registering %s as XDM provider', name);
    configuration.transports.push(name);
    transports[name] = provider;
  },

  
  create: function(config) {
    if (!config.whenReady && !config.onMessage) {
      Log.error('An instance without whenReady or onMessage makes no sense');
      throw new Error('An instance without whenReady or ' +
                      'onMessage makes no sense');
    }
    if (!config.channel) {
      Log.warn('Missing channel name, selecting at random');
      config.channel = guid();
    }

    if (!config.whenReady) {
      config.whenReady = emptyFunction;
    }
    if (!config.onMessage) {
      config.onMessage = emptyFunction;
    }

    var name = config.transport || findTransport(config.blacklist || []),
        transport = transports[name];
    if (transport && transport.isAvailable()) {
      Log.debug('%s is available', name);
      transport.init(config);
      return name;
    }
  }

};


XDM.register('fragment', (function() {
  var inited = false;
  var root;
  var senderOrigin = location.protocol + '//' + location.host;

  function insertIframe(url) {
    var iframe = document.createElement('iframe');
    iframe.src = 'javascript:false';
    var ev = DOMEventListener.add(iframe, 'load', function() {
      ev.remove();
      setTimeout(function() {
        iframe.parentNode.removeChild(iframe);
      }, 5000);
    });
    root.appendChild(iframe);
    iframe.src = url;
  }

  return {
    isAvailable: function() {
      return true;
    },
    init: function(config) {
      Log.debug('init fragment');
      var xdm = {
        send: function(message, origin, windowRef, channel) {
          Log.debug('sending to: %s (%s)',
            origin + config.channelPath, channel);
          
          
          
          
          insertIframe(origin + config.channelPath + message +
            '&xd_rel=parent.parent&relation=parent.parent&xd_origin=' +
            encodeURIComponent(senderOrigin));
        }
      };
      if (inited) {
        config.whenReady(xdm);
        return;
      }
      root = config.root;
      inited = true;
      config.whenReady(xdm);
    }
  };
})());


XDM.register('flash', (function() {
  var inited = false;
  var swf;
  var callbacks = {};
  var doLog = false;
  var timeout = 15000;
  var timer;

  return {
    isAvailable: function() {
      
      
      return Flash.checkMinVersion('8.0.24');
    },
    init: function(config) {
      Log.debug('init flash: ' + config.channel);
      var xdm = {
        send: function(message, origin, windowRef, channel) {
          Log.debug('sending to: %s (%s)', origin, channel);
          swf.postMessage(message, origin, channel);
        }
      };
      if (inited) {
        config.whenReady(xdm);
        return;
      }
      var div = config.root.appendChild(window.document.createElement('div'));
      var callback = guid();

      callbacks[callback] = function() {
        clearTimeout(timer);
        Log.info('xdm.swf called the callback');
        delete callbacks[callback];
        callback = guid();
        callbacks[callback] = function(msg, origin) {
          msg = decodeURIComponent(msg);
          Log.debug('received message %s from %s', msg, origin);
          config.onMessage(msg, origin);
        };
        swf.init(config.channel, 'FB_XDM_CALLBACKS.' + callback);
        config.whenReady(xdm);
      };

      window.FB_XDM_CALLBACKS = callbacks;
      swf = Flash.embed(config.flashUrl, div, null, {
        protocol: location.protocol.replace(':', ''),
        host: location.host,
        callback: 'FB_XDM_CALLBACKS.' + callback,
        log: doLog
      });

      timer = setTimeout(function() {
        Log.warn('The Flash component did not load within %s ms - ' +
          'verify that the container is not set to hidden or invisible ' +
          'using CSS as this will cause some browsers to not load ' +
          'the components', timeout);
      }, timeout);
      inited = true;
    }
  };
})());


XDM.register('postmessage', (function() {
  var inited = false;

  return {
    isAvailable : function() {
      return !!window.postMessage;
    },
    init: function(config) {
      Log.debug('init postMessage: ' + config.channel);
      var prefix = '_FB_' + config.channel;
      var xdm = {
        send: function(message, origin, windowRef, channel) {
          if (window === windowRef) {
            Log.error('Invalid windowref, equal to window (self)');
            throw new Error();
          }
          Log.debug('sending to: %s (%s)', origin, channel);
          var send = function() {
            
            windowRef.postMessage('_FB_' + channel + message, origin);
          };
          
          
          
          
          if (UserAgent.ie() == 8) {
            setTimeout(send, 0);
          } else{
            send();
          }
        }
      };
      if (inited) {
        config.whenReady(xdm);
        return;
      }

      DOMEventListener.add(window, 'message', function(event) {
        var message = event.data;
        
        
        var origin = event.origin || 'native';
        if (typeof message != 'string') {
          Log.warn('Received message of type %s from %s, expected a string',
            typeof message, origin);
          return;
        }

        Log.debug('received message %s from %s', message, origin);
        
        if (message.substring(0, prefix.length) == prefix) {
          message = message.substring(prefix.length);
        }
        config.onMessage(message, origin);
      });
      config.whenReady(xdm);
      inited = true;
    }
  };
})());

module.exports = XDM;

});
__d("sdk.XD",["sdk.Content","sdk.createIframe","sdk.Event","guid","Log","QueryString","Queue","resolveURI","resolveWindow","sdk.RPC","sdk.Runtime","UrlMap","URL","wrapFunction","XDM","XDConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Content = require('sdk.Content');
var createIframe = require('sdk.createIframe');
var Event = require('sdk.Event');
var guid = require('guid');
var Log = require('Log');
var QueryString = require('QueryString');
var Queue = require('Queue');
var resolveURI = require('resolveURI');
var resolveWindow = require('resolveWindow');
var RPC = require('sdk.RPC');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');
var URL = require('URL');
var wrapFunction = require('wrapFunction');
var XDConfig = requireDynamic('XDConfig');
var XDM = require('XDM');

var facebookQueue = new Queue();
var httpProxyQueue = new Queue();
var httpsProxyQueue = new Queue();
var httpProxyFrame;
var httpsProxyFrame;
var proxySecret = guid();


var channel = guid();
var origin = location.protocol + '//' + location.host;
var xdm;
var inited = false;

var pluginRegistry = {};
var rpcQueue = new Queue();
RPC.setInQueue(rpcQueue);

function onRegister(/*string*/ registeredAs) {/*TC*/__t([registeredAs,'string','registeredAs']);/*/TC*/
  Log.info('Remote XD can talk to facebook.com (%s)', registeredAs);
  Runtime.setEnvironment(
    registeredAs === 'canvas'
      ? Runtime.ENVIRONMENTS.CANVAS
      : Runtime.ENVIRONMENTS.PAGETAB);
}

function handleAction(/*object*/ message, /*string?*/ senderOrigin) {/*TC*/__t([message,'object','message'],[senderOrigin,'string?','senderOrigin']);/*/TC*/
  if (!senderOrigin) {
    Log.error('No senderOrigin');
    throw new Error();
  }

  var protocol = /^https?/.exec(senderOrigin)[0];

  switch(message.xd_action) {
    case 'proxy_ready':
      var proxyQueue;
      var targetProxyFrame;

      if (protocol == 'https') {
        proxyQueue = httpsProxyQueue;
        targetProxyFrame = httpsProxyFrame;
      } else {
        proxyQueue = httpProxyQueue;
        targetProxyFrame = httpProxyFrame;
      }

      if (message.registered) {
        onRegister(message.registered);
        facebookQueue = proxyQueue.merge(facebookQueue);
      }

      Log.info('Proxy ready, starting queue %s containing %s messages',
        protocol + 'ProxyQueue', proxyQueue.getLength());

      proxyQueue.start(function(message) {
        xdm.send(
          typeof message === 'string' ? message : QueryString.encode(message),
          senderOrigin,
          targetProxyFrame.contentWindow,
          channel + '_' + protocol
        );
      });
      break;

    case 'plugin_ready':
      Log.info('Plugin %s ready, protocol: %s', message.name, protocol);
      pluginRegistry[message.name] = { protocol: protocol };
      if (Queue.exists(message.name)) {
        var queue = Queue.get(message.name);
        Log.debug('Enqueuing %s messages for %s in %s', queue.getLength(),
          message.name, protocol + 'ProxyQueue');

        (protocol == 'https' ? httpsProxyQueue : httpProxyQueue).merge(queue);
      }
      break;
  }

  
  if (message.data) {
    onMessage(message.data, senderOrigin);
  }
}




function onMessage(message, senderOrigin) {
  if (senderOrigin && senderOrigin !== 'native' &&
      !URL(senderOrigin).isFacebookURL()) {
    return;
  }
  if (typeof message == 'string') {
    if (/^FB_RPC:/.test(message)) {
      rpcQueue.enqueue(message.substring(7));
      return;
    }
    
    if (message.substring(0, 1) == '{') {
      try {
        message = ES5('JSON', 'parse', false,message);
      } catch (decodeException) {
        Log.warn('Failed to decode %s as JSON', message);
        return;
      }
    } else {
      message = QueryString.decode(message);
    }
  }
  

  if (!senderOrigin) {
    
    if (message.xd_sig == proxySecret) {
      senderOrigin = message.xd_origin;
    }
  }

  if (message.xd_action) {
    handleAction(message, senderOrigin);
    return;
  }

  
  
  if (message.access_token) {
    Runtime.setSecure(/^https/.test(origin));
  }

  
  if (message.cb) {
    var cb = XD._callbacks[message.cb];
    if (!XD._forever[message.cb]) {
      delete XD._callbacks[message.cb];
    }
    if (cb) {
      cb(message);
    }
  }
}

function sendToFacebook(/*string*/ recipient, message) {/*TC*/__t([recipient,'string','recipient']);/*/TC*/
  if (recipient == 'facebook') {
    message.relation = 'parent.parent';
    facebookQueue.enqueue(message);
  } else {
    message.relation = 'parent.frames["' + recipient + '"]';
    var regInfo = pluginRegistry[recipient];
    if (regInfo) {
      Log.debug('Enqueuing message for plugin %s in %s',
        recipient, regInfo.protocol + 'ProxyQueue');

      (regInfo.protocol == 'https' ? httpsProxyQueue : httpProxyQueue)
        .enqueue(message);
    } else {
      Log.debug('Buffering message for plugin %s', recipient);
      Queue.get(recipient).enqueue(message);
    }
  }
}


RPC.getOutQueue().start(function(/*string*/ message) {/*TC*/__t([message,'string','message']);/*/TC*/
  sendToFacebook('facebook', 'FB_RPC:' + message);
});

function init(/*string?*/ channelUrl, /*string?*/ xdProxyName) {/*TC*/__t([channelUrl,'string?','channelUrl'],[xdProxyName,'string?','xdProxyName']);/*/TC*/
  if (inited) {
    return;
  }

  
  
  var channelPath = channelUrl
    ? /\/\/.*?(\/[^#]*)/.exec(channelUrl)[1]
    : location.pathname + location.search;

  channelPath += (~ES5(channelPath, 'indexOf', true,'?') ? '&' : '?') +
    'fb_xd_fragment#xd_sig=' + proxySecret + '&';

  
  var container = Content.appendHidden(document.createElement('div'));

  
  var transport = XDM.create({
    root: container,
    channel: channel,
    channelPath: '/' + XDConfig.XdUrl + '#',
    flashUrl: XDConfig.Flash.path,
    whenReady: function(/*object*/ instance) {/*TC*/__t([instance,'object','instance']);/*/TC*/
      xdm = instance;
      
      var proxyData = {
        channel: channel, 
        origin: location.protocol + '//' + location.host, 
        channel_path: channelPath, 
        transport: transport, 
        xd_name: xdProxyName 
      };

      var proxyUrl = '/' + XDConfig.XdUrl +
        '#' + QueryString.encode(proxyData);

      
      
      var httpDomain = XDConfig.useCdn
       ? UrlMap.resolve('cdn', false)
       : 'http://www.facebook.com';

      var httpsDomain = XDConfig.useCdn
       ? UrlMap.resolve('cdn', true)
       : 'https://www.facebook.com';

      
      
      if (Runtime.getSecure() !== true) {
        
        
        httpProxyFrame = createIframe({
          url       : httpDomain + proxyUrl,
          name      : 'fb_xdm_frame_http',
          root      : container
        });
      }

      
      
      httpsProxyFrame = createIframe({
        url       : httpsDomain + proxyUrl,
        name      : 'fb_xdm_frame_https',
        root      : container
      });
    },
    onMessage: wrapFunction(onMessage, 'entry', 'XD:message')
  });

  if (transport === 'fragment') {
    window.FB_XD_onMessage = wrapFunction(onMessage, 'entry', 'XD:fragment')
  }

  inited = true;
}


var XD = {
  
  
  rpc: RPC,

  _callbacks: {},
  _forever: {},
  _channel: channel,
  _origin: origin,

  onMessage: onMessage,
  recv: onMessage,

  
  init: init,

  
  sendToFacebook: sendToFacebook,

  
  inform: function(/*string*/ method, /*object?*/ params, /*string?*/ relation,
      /*string?*/ behavior) {/*TC*/__t([method,'string','method'],[params,'object?','params'],[relation,'string?','relation'],[behavior,'string?','behavior']);/*/TC*/
    sendToFacebook('facebook', {
      method: method,
      params: ES5('JSON', 'stringify', false,params || {}),
      behavior: behavior || 'p',
      relation: relation
    });
  },

  
  handler: function(/*function*/ cb, /*string?*/ relation, /*boolean?*/ forever,
      /*string?*/ id) /*string*/ {/*TC*/__t([cb,'function','cb'],[relation,'string?','relation'],[forever,'boolean?','forever'],[id,'string?','id']); return __t([function(){/*/TC*/
    var handlerDomain = XDConfig.useCdn
      ? UrlMap.resolve('cdn', location.protocol == 'https:')
      : location.protocol + '//www.facebook.com';

    
    
    
    return handlerDomain + '/' + XDConfig.XdUrl + '#' + QueryString.encode({
      cb        : this.registerCallback(cb, forever, id),
      origin    : origin + '/' + channel,
      domain    : location.hostname,
      relation  : relation || 'opener'
    });
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  registerCallback: function(/*function*/ cb, /*boolean?*/ persistent,
      /*string?*/ id) /*string*/ {/*TC*/__t([cb,'function','cb'],[persistent,'boolean?','persistent'],[id,'string?','id']); return __t([function(){/*/TC*/
    id = id || guid();
    if (persistent) {
      XD._forever[id] = true;
    }
    XD._callbacks[id] = cb;
    return id;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
};




(function() {
  var match = location.href.match(/[?&]fb_xd_fragment#(.*)$/);

  if (match) {
    
    document.documentElement.style.display = 'none';

    var message = QueryString.decode(match[1]);
    var targetWindow = resolveWindow(message.xd_rel);
    Log.debug('Passing fragment based message: %s', match[1]);
    targetWindow.FB_XD_onMessage(message);

    
    document.open();
    document.close();
  }
})();

Event.subscribe('init:post', function(/*object*/ options) {/*TC*/__t([options,'object','options']);/*/TC*/
  init(
    options.channelUrl ? resolveURI(options.channelUrl) : null,
    options.xdProxyName
  );
});


module.exports = XD;

});
__d("sdk.Auth",["sdk.Cookie","copyProperties","sdk.createIframe","DOMWrapper","sdk.getContextType","guid","Log","ObservableMixin","QueryString","sdk.Runtime","sdk.SignedRequest","UrlMap","URL","sdk.XD"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Cookie = require('sdk.Cookie');
var copyProperties = require('copyProperties');
var createIframe = require('sdk.createIframe');
var DOMWrapper = require('DOMWrapper');
var getContextType = require('sdk.getContextType');
var guid = require('guid');
var Log = require('Log');
var ObservableMixin = require('ObservableMixin');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var SignedRequest = require('sdk.SignedRequest');
var UrlMap = require('UrlMap');
var URL = require('URL');
var XD = require('sdk.XD');

var currentAuthResponse;

var timer;

var Auth = new ObservableMixin();

function setAuthResponse(/*object?*/ authResponse, /*string*/ status) {/*TC*/__t([authResponse,'object?','authResponse'],[status,'string','status']);/*/TC*/
  var currentUserID = Runtime.getUserID();
  var userID = '';
  if (authResponse) {
    
    
    
    
    if (authResponse.userID) {
      userID = authResponse.userID;
    } else if (authResponse.signedRequest) {
      var parsedSignedRequest =
        SignedRequest.parse(authResponse.signedRequest);
      if (parsedSignedRequest && parsedSignedRequest.user_id) {
        userID = parsedSignedRequest.user_id;
      }
    }
  }

  var
    login = !currentUserID && authResponse,
    logout = currentUserID && !authResponse,
    both = authResponse && currentUserID && currentUserID != userID,
    authResponseChange = authResponse != currentAuthResponse,
    statusChange = status != (Runtime.getLoginStatus() || 'unknown');

  
  
  Runtime.setLoginStatus(status);
  Runtime.setAccessToken(authResponse && authResponse.accessToken || null);
  Runtime.setUserID(userID);

  currentAuthResponse = authResponse;

  var response = {
    authResponse : authResponse,
    status : status
  };

  if (logout || both) {
    Auth.inform('logout', response);
  }
  if (login || both) {
    Auth.inform('login', response);
  }
  if (authResponseChange) {
    Auth.inform('authresponse.change', response);
  }
  if (statusChange) {
    Auth.inform('status.change', response);
  }
  return response;
}

function getAuthResponse() /*object?*/ {/*TC*/ return __t([function(){/*/TC*/
  return currentAuthResponse;
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

function xdResponseWrapper(/*function*/ cb, /*object?*/ authResponse,
    /*string?*/ method) /*function*/ {/*TC*/__t([cb,'function','cb'],[authResponse,'object?','authResponse'],[method,'string?','method']); return __t([function(){/*/TC*/
  return function (/*object?*/ params) /*object?*/ {/*TC*/__t([params,'object?','params']); return __t([function(){/*/TC*/
    var status;

    if (params && params.access_token) {
      
      var parsedSignedRequest = SignedRequest.parse(params.signed_request);
      authResponse = {
        accessToken: params.access_token,
        userID: parsedSignedRequest.user_id,
        expiresIn: parseInt(params.expires_in, 10),
        signedRequest: params.signed_request
      };

      if (Runtime.getUseCookie()) {
        var expirationTime = authResponse.expiresIn === 0
          ? 0 
          : ES5('Date', 'now', false) + authResponse.expiresIn * 1000;
        var baseDomain = Cookie.getDomain();
        if (!baseDomain && params.base_domain) {
          
          
          
          
          Cookie.setDomain('.' + params.base_domain);
        }
        Cookie.setSignedRequestCookie(params.signed_request,
                                         expirationTime);
      }
      status = 'connected';
      setAuthResponse(authResponse, status);
    } else if (method === 'logout' || method === 'login_status') {
      
      
      
      
      if (params.error && params.error === 'not_authorized') {
        status = 'not_authorized';
      } else {
        status = 'unknown';
      }
      setAuthResponse(null, status);
      if (Runtime.getUseCookie()) {
        Cookie.clearSignedRequestCookie();
      }
    }

    
    if (params && params.https == 1) {
      Runtime.setSecure(true);
    }

    if (cb) {
      cb({
        authResponse: authResponse,
        status: Runtime.getLoginStatus()
      });
    }
    return authResponse;
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/};
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

function fetchLoginStatus(/*function*/ fn) {/*TC*/__t([fn,'function','fn']);/*/TC*/
  var frame;

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  var handleResponse = xdResponseWrapper(fn, currentAuthResponse,
    'login_status');

  var url = URL(UrlMap.resolve('www', true) + '/dialog/oauth')
    .setSearch(QueryString.encode({
      client_id: Runtime.getClientID(),
      response_type: 'token,signed_request,code',
      display: 'none',
      domain: location.hostname,
      origin: getContextType(),
      redirect_uri: XD.handler(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
        frame.parentNode.removeChild(frame);
        if (handleResponse(response)) {
          
          timer = setTimeout(function() {
            fetchLoginStatus(function() {});
          }, 1200000); 
        }
      }, 'parent'),
      sdk: 'joey'
    }));

  frame = createIframe({
    root: DOMWrapper.getRoot(),
    name: guid(),
    url: url.toString(),
    style: { display: 'none' }
  });

}

var loadState;
function getLoginStatus(/*function?*/ cb, /*boolean?*/ force) {/*TC*/__t([cb,'function?','cb'],[force,'boolean?','force']);/*/TC*/
  if (!Runtime.getClientID()) {
    Log.warn('FB.getLoginStatus() called before calling FB.init().');
    return;
  }

  
  
  if (cb) {
    if (!force && loadState == 'loaded') {
      cb({ status: Runtime.getLoginStatus(),
           authResponse: getAuthResponse()});
      return;
    } else {
      Auth.subscribe('FB.loginStatus', cb);
    }
  }

  
  if (!force && loadState == 'loading') {
    return;
  }

  loadState = 'loading';

  
  var lsCb = function(/*object?*/ response) {/*TC*/__t([response,'object?','response']);/*/TC*/
    
    loadState = 'loaded';

    
    Auth.inform('FB.loginStatus', response);
    Auth.clearSubscribers('FB.loginStatus');
  };

  fetchLoginStatus(lsCb);
}

copyProperties(Auth, {
  getLoginStatus: getLoginStatus,
  fetchLoginStatus: fetchLoginStatus,
  setAuthResponse: setAuthResponse,
  getAuthResponse: getAuthResponse,
  parseSignedRequest: SignedRequest.parse,
  
  xdResponseWrapper: xdResponseWrapper
});

module.exports = Auth;

});
__d("dotAccess",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function dotAccess(head, path, create) {
  var stack = path.split('.');
  do {
    var key = stack.shift();
    head = head[key] || create && (head[key] = {});
  } while(stack.length && head);
  return head;
}

module.exports = dotAccess;

});
__d("hasArrayNature",[],function(global,require,requireDynamic,requireLazy,module,exports) {


function hasArrayNature(obj) {
  return (
    
    !!obj &&
    
    (typeof obj == 'object' || typeof obj == 'function') &&
    
    ('length' in obj) &&
    
    !('setInterval' in obj) &&
    (
      
      Object.prototype.toString.call(obj) === "[object Array]" ||
      
      ('callee' in obj) ||
      
      ('item' in obj)
    )
  );
}

module.exports = hasArrayNature;

});
__d("createArrayFrom",["hasArrayNature"],function(global,require,requireDynamic,requireLazy,module,exports) {

var hasArrayNature = require('hasArrayNature');


function createArrayFrom(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  }
  if (obj.item) {
    
    var l = obj.length, ret = new Array(l);
    while (l--) { ret[l] = obj[l]; }
    return ret;
  }
  return Array.prototype.slice.call(obj);
}

module.exports = createArrayFrom;

});
__d("sdk.DOM",["Assert","createArrayFrom","DOMEventListener","sdk.domReady","UserAgent"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Assert = require('Assert');
var createArrayFrom = require('createArrayFrom');
var DOMEventListener = require('DOMEventListener');
var domReady = require('sdk.domReady');
var UserAgent = require('UserAgent');

var cssRules = {};

function getAttr(/*DOMElement*/ dom, /*string*/ name) /*string?*/ {/*TC*/__t([dom,'DOMElement','dom'],[name,'string','name']); return __t([function(){/*/TC*/
  var attribute = (
    dom.getAttribute(name) ||
    dom.getAttribute(name.replace(/_/g, '-')) ||
    dom.getAttribute(name.replace(/-/g, '_')) ||
    dom.getAttribute(name.replace(/-/g, '')) ||
    dom.getAttribute(name.replace(/_/g, '')) ||
    dom.getAttribute('data-' + name) ||
    dom.getAttribute('data-' + name.replace(/_/g, '-')) ||
    dom.getAttribute('data-' + name.replace(/-/g, '_')) ||
    dom.getAttribute('data-' + name.replace(/-/g, '')) ||
    dom.getAttribute('data-' + name.replace(/_/g, ''))
  );
  return attribute
    ? String(attribute)
    : null;
/*TC*/}.apply(this, arguments), 'string?']);/*/TC*/}

function getBoolAttr(/*DOMElement*/ dom, /*string*/ name) /*boolean?*/ {/*TC*/__t([dom,'DOMElement','dom'],[name,'string','name']); return __t([function(){/*/TC*/
  var attribute = getAttr(dom, name);
  return attribute
    ? /^(true|1|yes|on)$/.test(attribute)
    : null;
/*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/}

function getProp(/*DOMElement*/ dom, /*string*/ name) /*string*/ {/*TC*/__t([dom,'DOMElement','dom'],[name,'string','name']); return __t([function(){/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(name);

  try {
    return String(dom[name]);
  } catch (e) {
    throw new Error('Could not read property ' + name + ' : ' + e.message);
  }
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

function html(/*DOMElement*/ dom, /*string*/ content) {/*TC*/__t([dom,'DOMElement','dom'],[content,'string','content']);/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(content);

  try {
    dom.innerHTML = content;
  } catch (e) {
    throw new Error('Could not set innerHTML : ' + e.message);
  }
}


function hasClass(/*DOMElement*/ dom, /*string*/ className) /*boolean*/ {/*TC*/__t([dom,'DOMElement','dom'],[className,'string','className']); return __t([function(){/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(className);

  var cssClassWithSpace = ' ' + getProp(dom, 'className') + ' ';
  return ES5(cssClassWithSpace, 'indexOf', true,' ' + className + ' ') >= 0;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}


function addClass(/*DOMElement*/ dom, /*string*/ className) {/*TC*/__t([dom,'DOMElement','dom'],[className,'string','className']);/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(className);

  if (!hasClass(dom, className)) {
    dom.className = getProp(dom, 'className') + ' ' + className;
  }
}


function removeClass(/*DOMElement*/ dom, /*string*/ className) {/*TC*/__t([dom,'DOMElement','dom'],[className,'string','className']);/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(className);

  var regExp = new RegExp('\\s*' + className, 'g');
  dom.className = ES5(getProp(dom, 'className').replace(regExp, ''),'trim', true);
}


function getByClass(/*string*/ className, dom, tagName) /*array<DOMElement>*/ {/*TC*/__t([className,'string','className']);/*/TC*/
  Assert.isString(className);

  dom = dom || document.body;
  tagName = tagName || '*';
  if (dom.querySelectorAll) {
    return createArrayFrom(
      dom.querySelectorAll(tagName + '.' + className)
    );
  }
  var all = dom.getElementsByTagName(tagName),
      els = [];
  for (var i = 0, len = all.length; i < len; i++) {
    if (hasClass(all[i], className)) {
      els[els.length] = all[i];
    }
  }
  return els;
}


function getStyle(/*DOMElement*/ dom, /*string*/ styleProp) /*string*/ {/*TC*/__t([dom,'DOMElement','dom'],[styleProp,'string','styleProp']); return __t([function(){/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(styleProp);

  
  styleProp = styleProp.replace(/-(\w)/g, function(m, g1) {
    return g1.toUpperCase();
  });

  var currentStyle = dom.currentStyle ||
    document.defaultView.getComputedStyle(dom, null);

  var computedStyle = currentStyle[styleProp];

  
  
  
  if (/backgroundPosition?/.test(styleProp) &&
      /top|left/.test(computedStyle)) {
    computedStyle = '0%';
  }
  return computedStyle;
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}


function setStyle(/*DOMElement*/ dom, /*string*/ styleProp, value) {/*TC*/__t([dom,'DOMElement','dom'],[styleProp,'string','styleProp']);/*/TC*/
  Assert.isTrue(!!dom, 'element not specified');
  Assert.isString(styleProp);

  
  styleProp = styleProp.replace(/-(\w)/g, function(m, g1) {
    return g1.toUpperCase();
  });
  dom.style[styleProp] = value;
}


function addCssRules(/*string*/ styles, /*array<string>*/ names) {/*TC*/__t([styles,'string','styles']);/*/TC*/
  
  
  var allIncluded = true;
  for (var i = 0, id; id = names[i++];) {
    if (!(id in cssRules)) {
      allIncluded = false;
      cssRules[id] = true;
    }
  }

  if (allIncluded) {
    return;
  }

  if (!UserAgent.ie()) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = styles;
    document.getElementsByTagName('head')[0].appendChild(style);
  } else {
    try {
      document.createStyleSheet().cssText = styles;
    } catch (exc) {
      
      
      
      if (document.styleSheets[0]) {
        document.styleSheets[0].cssText += styles;
      }
    }
  }
}


function getViewportInfo() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
  
  var root = (document.documentElement && document.compatMode == 'CSS1Compat')
    ? document.documentElement
    : document.body;

  return {
    
    scrollTop  : root.scrollTop || document.body.scrollTop,
    scrollLeft : root.scrollLeft || document.body.scrollLeft,
    width      : window.innerWidth  ? window.innerWidth  : root.clientWidth,
    height     : window.innerHeight ? window.innerHeight : root.clientHeight
  };
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}


function getPosition(/*DOMElement*/ node) /*object*/ {/*TC*/__t([node,'DOMElement','node']); return __t([function(){/*/TC*/
  Assert.isTrue(!!node, 'element not specified');

  var x = 0,
      y = 0;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while (node = node.offsetParent);

  return {x: x, y: y};
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}


var DOM = {
  containsCss: hasClass,
  addCss: addClass,
  removeCss: removeClass,
  getByClass: getByClass,

  getStyle: getStyle,
  setStyle: setStyle,

  getAttr: getAttr,
  getBoolAttr: getBoolAttr,
  getProp: getProp,

  html: html,

  addCssRules: addCssRules,

  getViewportInfo: getViewportInfo,
  getPosition: getPosition,

  ready: domReady
};

module.exports = DOM;

});
__d("sdk.Scribe",["UrlMap","QueryString"],function(global,require,requireDynamic,requireLazy,module,exports) {
var UrlMap = require('UrlMap');
var QueryString = require('QueryString');

function log(/*string*/ category, /*object*/ data) {/*TC*/__t([category,'string','category'],[data,'object','data']);/*/TC*/
  (new Image()).src = QueryString.appendToUrl(
    UrlMap.resolve('www', /*force ssl*/true) + '/common/scribe_endpoint.php',
    {
      c: category,
      m: ES5('JSON', 'stringify', false,data)
    }
  );
}

var Scribe = {
  log: log
};

module.exports = Scribe;

});
__d("sdk.ErrorHandling",["UserAgent","sdk.Scribe","sdk.Runtime","wrapFunction","ManagedError","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var UserAgent = require('UserAgent');
var Scribe = require('sdk.Scribe');
var SDKConfig = requireDynamic('SDKConfig');
var Runtime = require('sdk.Runtime');
var wrapFunction = require('wrapFunction');
var ManagedError = require('ManagedError');

var handleError = false;

function errorHandler(/*object*/ error) {/*TC*/__t([error,'object','error']);/*/TC*/
  var originalError = error._originalError;
  delete error._originalError;
  Scribe.log('jssdk_error', {
    appId: Runtime.getClientID(),
    error: error.name || error.message,
    extra: error
  });

  
  throw originalError;
}


function normalizeError(err) /*object*/ {/*TC*/ return __t([function(){/*/TC*/
  var info = {
    line: err.lineNumber || err.line,
    message: err.message,
    name: err.name,
    script: err.fileName || err.sourceURL || err.script,
    stack: err.stackTrace || err.stack
  };

  
  info._originalError = err;

  
  
  
  
  if (UserAgent.chrome() && /([\w:\.\/]+\.js):(\d+)/.test(err.stack)) {
    info.script = RegExp.$1;
    info.line = parseInt(RegExp.$2, 10);
  }

  
  for (var k in info) {
    (info[k] == null && delete info[k]);
  }
  return info;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}

function guard(/*function*/ func, /*string?*/ entry) /*function*/ {/*TC*/__t([func,'function','func'],[entry,'string?','entry']); return __t([function(){/*/TC*/
  return function() {
    
    
    if (!handleError) {
      return func.apply(this, arguments);
    }

    try {
      return func.apply(this, arguments);
    } catch(error) {
      
      
      if (error instanceof ManagedError) {
        throw error;
      }

      var data = normalizeError(error);
      data.entry = entry;

      
      var sanitizedArgs = ES5(Array.prototype.slice.call(arguments), 'map', true,function(arg) {
        var type = Object.prototype.toString.call(arg);
        return (/^\[object (String|Number|Boolean|Object|Date)\]$/).test(type)
          ? arg
          : arg.toString();
      });

      data.args = ES5('JSON', 'stringify', false,sanitizedArgs).substring(0, 200);
      errorHandler(data);
    }
  };
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

function unguard(/*function*/ func) /*function*/ {/*TC*/__t([func,'function','func']); return __t([function(){/*/TC*/
  if (!func.__wrapper) {
    func.__wrapper = function() {
      try {
        return func.apply(this, arguments);
      } catch(e) {
        setTimeout(function() {
          throw e;
        }, 0);
        return false;
      }
    };
  }
  return func.__wrapper;
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}


var sampleRate = SDKConfig.errorHandling.rate;

if (sampleRate && Math.floor(Math.random() * 100) + 1 <= sampleRate) {
  handleError = true;
}

if (handleError) {
  wrapFunction.setWrapper(guard, 'entry');
}


var ErrorHandler = {
  guard: guard,
  unguard: unguard
};

module.exports = ErrorHandler;

});
__d("GlobalCallback",["wrapFunction","dotAccess"],function(global,require,requireDynamic,requireLazy,module,exports) {

var wrapFunction = require('wrapFunction');
var dotAccess = require('dotAccess');



var rootObject;
var callbackPrefix;
var counter = 0;

var GlobalCallback = {

  setPrefix: function(/*string*/ prefix) {/*TC*/__t([prefix,'string','prefix']);/*/TC*/
    rootObject = dotAccess(window, prefix, true);
    callbackPrefix = prefix;
  },

  create: function(/*function*/ fn) /*string*/ {/*TC*/__t([fn,'function','fn']); return __t([function(){/*/TC*/
    if (!rootObject) {
      
      
      this.setPrefix('window.__globalCallbacks');
    }
    var id = '__gcb' + (++counter);
    rootObject[id] = wrapFunction(fn, 'entry', 'GlobalCallback');

    return callbackPrefix + '.' + id;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  remove: function(/*string*/ name) {/*TC*/__t([name,'string','name']);/*/TC*/
    var id = name.substring(callbackPrefix.length + 1);
    delete rootObject[id];
  }

};

module.exports = GlobalCallback;

});
__d("sdk.Impressions",["guid","QueryString","sdk.Runtime","UrlMap"],function(global,require,requireDynamic,requireLazy,module,exports) {

var guid = require('guid');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');

function request(/*object*/ params) {/*TC*/__t([params,'object','params']);/*/TC*/
  var clientID = Runtime.getClientID();

  if (!params.api_key && clientID) {
    params.api_key = clientID;
  }

  var image = new Image();

  image.src = QueryString.appendToUrl(
    UrlMap.resolve('www', /*force ssl*/true) +
      '/impression.php/' + guid() + '/',
    params
  );
}

var Impressions = {
  log: function(/*number*/ lid, /*object*/ payload) {/*TC*/__t([lid,'number','lid'],[payload,'object','payload']);/*/TC*/
    if (!payload.source) {
      payload.source = 'jssdk';
    }

    request({
      lid: lid, 
      payload: ES5('JSON', 'stringify', false,payload)
    });
  },

  impression: request
};

module.exports = Impressions;

});
__d("sdk.Insights",["sdk.Impressions"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Impressions = require('sdk.Impressions');

var Insights = {
  TYPE: {
    NOTICE: 'notice',
    WARNING: 'warn',
    ERROR: 'error'
  },
  CATEGORY:  {
    DEPRECATED: 'deprecated',
    APIERROR: 'apierror'
  },

  
  log: function(/*string*/ type, /*string*/ category, /*string*/ content) {/*TC*/__t([type,'string','type'],[category,'string','category'],[content,'string','content']);/*/TC*/
    var payload = {
      source: 'jssdk',
      type: type,
      category: category,
      payload: content
    };

    Impressions.log(
      113, 
      payload
    );
  },
  
  impression: Impressions.impression
};

module.exports = Insights;

});
__d("FB",["sdk.Auth","copyProperties","dotAccess","sdk.domReady","sdk.DOM","sdk.ErrorHandling","sdk.Content","DOMWrapper","GlobalCallback","sdk.Insights","Log","sdk.Runtime","sdk.Scribe","CssConfig","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Auth = require('sdk.Auth');
var copyProperties = require('copyProperties');
var CssConfig = requireDynamic('CssConfig');
var dotAccess = require('dotAccess');
var domReady = require('sdk.domReady');
var DOM = require('sdk.DOM');
var ErrorHandling = require('sdk.ErrorHandling');
var Content = require('sdk.Content');
var DOMWrapper = require('DOMWrapper');
var GlobalCallback = require('GlobalCallback');
var Insights = require('sdk.Insights');
var Log = require('Log');
var Runtime = require('sdk.Runtime');
var Scribe = require('sdk.Scribe');
var SDKConfig = requireDynamic('SDKConfig');

var externalInterface;
var apiWhitelist, apiWhitelistMode = dotAccess(SDKConfig, 'api.mode');
var logged = {};
externalInterface = window.FB = {};
var FB = {};

if (__DEV__) {
  FB.require = require;
  window._FB = FB
}




Log.level = __DEV__ ? 3 : 1;

GlobalCallback.setPrefix('FB._callbacks');

var fbRoot = document.createElement('div');
DOMWrapper.setRoot(fbRoot);

domReady(function() {
  Log.info('domReady');
  Content.appendHidden(fbRoot);
  if (CssConfig.rules) {
    DOM.addCssRules(CssConfig.rules, CssConfig.components);
  }
});

Runtime.subscribe('AccessToken.change', function(/*string?*/ value) {/*TC*/__t([value,'string?','value']);/*/TC*/
  if (!value && Runtime.getLoginStatus() === 'connected') {
    
    
    Auth.getLoginStatus(null, true);
  }
});



if (dotAccess(SDKConfig, 'api.whitelist.length')) {
  apiWhitelist = {};
  ES5(SDKConfig.api.whitelist, 'forEach', true,function(/*string*/ key) {/*TC*/__t([key,'string','key']);/*/TC*/
    apiWhitelist[key] = 1;
  });
}

function protect(/*function*/ fn, /*string*/ accessor, /*string*/ key,
    /*object*/ context) /*function?*/ {/*TC*/__t([fn,'function','fn'],[accessor,'string','accessor'],[key,'string','key'],[context,'object','context']); return __t([function(){/*/TC*/
  var exportMode;
  if (/^_/.test(key)) {
    exportMode = 'hide';
  } else if (apiWhitelist && !apiWhitelist[accessor]) {
    exportMode = apiWhitelistMode;
  }

  switch(exportMode) {
    case 'hide':
      return;
    case 'stub':
      return function() {
        Log.warn('The method FB.%s has been removed from the JS SDK.',
          accessor);
      };
      break;
    default:
      return ErrorHandling.guard(function(/*args*/) {
        if (exportMode === 'warn') {
          Log.warn('The method FB.%s is not officially supported by ' +
            'Facebook and access to it will soon be removed.', accessor);
          if (!logged.hasOwnProperty(accessor)) {
            Insights.log(
              Insights.TYPE.WARNING,
              Insights.CATEGORY.DEPRECATED,
              'FB.' + accessor
            );

            
            Scribe.log('jssdk_error', {
              appId: Runtime.getClientID(),
              error: 'Private method used',
              extra: {args: accessor}
            });

            logged[accessor] = true;
          }
        }

        function unwrap(val) {
          if (ES5('Array', 'isArray', false,val)) {
            return ES5(val, 'map', true,unwrap);
          }
          if (val && typeof val === 'object' && val.__wrapped) {
            
            return val.__wrapped;
          }
          
          
          
          
          
          return typeof val === 'function' && /^function/.test(val.toString())
            ? ErrorHandling.unguard(val)
            : val;
        }

        var args = ES5(Array.prototype.slice.call(arguments), 'map', true,unwrap);

        var result = fn.apply(context, args);
        var facade;
        var isPlainObject = true;

        if (result && typeof result === 'object') {
          
          
          
          var F = Function();
          F.prototype = result;
          facade = new F();
          facade.__wrapped = result;

          
          
          for (var key in result) {
            var property = result[key];
            if (typeof property !== 'function' || key === 'constructor') {
              continue;
            }
            isPlainObject = false;
            facade[key] = protect(property, accessor + ':' + key, key, result);
          }
        }

          if (!isPlainObject) {
            return facade;
          }
        return isPlainObject
          ? result
          : facade;
      }, accessor);
  }
/*TC*/}.apply(this, arguments), 'function?']);/*/TC*/}


function provide(/*string*/ name, /*object*/ source) {/*TC*/__t([name,'string','name'],[source,'object','source']);/*/TC*/
  var externalTarget = name
    ? dotAccess(externalInterface, name, true)
    : externalInterface;

  ES5(ES5('Object', 'keys', false,source), 'forEach', true,function(/*string*/ key) {/*TC*/__t([key,'string','key']);/*/TC*/
    var value = source[key];

    
    if (typeof value === 'function') {
      var accessor = (name ? name + '.' : '') + key;
      var exportedProperty = protect(value, accessor, key, source);
      if (exportedProperty) {
        externalTarget[key] = exportedProperty;
      }
    }
  });
}



Runtime.setSecure((function() /*boolean?*/ {/*TC*/ return __t([function(){/*/TC*/
  
  var inCanvas = /iframe_canvas|app_runner/.test(window.name);
  var inDialog = /dialog/.test(window.name);

  
  
  if (location.protocol == 'https:' &&
      (window == top || !(inCanvas || inDialog))) {
    
    
    
    return true;
  }

  
  
  if (/_fb_https?/.test(window.name)) {
    return ES5(window.name, 'indexOf', true,'_fb_https') != -1;
  }
/*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/})());


copyProperties(FB, {

  
  provide: provide

});

module.exports = FB;

});
__d("flattenObject",[],function(global,require,requireDynamic,requireLazy,module,exports) {


function flattenObject(/*object*/ obj) /*object*/ {/*TC*/__t([obj,'object','obj']); return __t([function(){/*/TC*/
  var flat = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      if (null === value || undefined === value) {
        continue;
      } else if (typeof value == 'string') {
        flat[key] = value;
      } else {
        flat[key] = ES5('JSON', 'stringify', false,value); }
    }
  }
  return flat;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}

module.exports = flattenObject;

});
__d("CORSRequest",["wrapFunction","QueryString"],function(global,require,requireDynamic,requireLazy,module,exports) {
/*global self:true*/
var wrapFunction = require('wrapFunction');
var QueryString = require('QueryString');

function createCORSRequest(/*string*/ method, /*string*/ url) /*object?*/ {/*TC*/__t([method,'string','method'],[url,'string','url']); return __t([function(){/*/TC*/
   if (!self.XMLHttpRequest) {
    return null;
   }
   var xhr = new XMLHttpRequest();
   var noop = function() {};
   if ('withCredentials' in xhr) {
     xhr.open(method, url, true);
     xhr.setRequestHeader(
       'Content-type', 'application/x-www-form-urlencoded');
   } else if (self.XDomainRequest) {
     xhr = new XDomainRequest();
     try {
       
       
       
       
       xhr.open(method, url);

       
       
       
       
       
       
       xhr.onprogress = xhr.ontimeout = noop;
     } catch (accessDeniedError) {
       return null;
     }
   } else {
     return null;
   }

   var wrapper = {
     send: function(/*string*/ data) {/*TC*/__t([data,'string','data']);/*/TC*/
       xhr.send(data);
     }
   };
   var onload = wrapFunction(function() {
     onload = noop;
     if ('onload' in wrapper)  {
       wrapper.onload(xhr);
     }
   }, 'entry', 'XMLHttpRequest:load');
   var onerror = wrapFunction(function() {
     onerror = noop;
     if ('onerror' in wrapper) {
       wrapper.onerror(xhr);
     }
   }, 'entry', 'XMLHttpRequest:error');

   
   
   
   

   xhr.onload = function() {
     onload();
   };

   xhr.onerror = function() {
     onerror();
   };

   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       if (xhr.status == 200) {
         onload();
       } else {
         onerror();
       }
     }
   };

   return wrapper;
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

function execute(/*string*/ url, /*string*/ method, /*object*/ params,
    /*function*/ cb) /*boolean*/ {/*TC*/__t([url,'string','url'],[method,'string','method'],[params,'object','params'],[cb,'function','cb']); return __t([function(){/*/TC*/
  params.suppress_http_code = 1;
  var data = QueryString.encode(params);

  if (method != 'post') {
    url = QueryString.appendToUrl(url, data);
    data = '';
  }

  var request = createCORSRequest(method, url);
  if (!request) {
    return false;
  }

  request.onload = function(xhr) {
    cb(ES5('JSON', 'parse', false,xhr.responseText));
  };
  request.onerror = function(xhr) {
    if (xhr.responseText) {
      cb(ES5('JSON', 'parse', false,xhr.responseText));
    } else {
      cb({
        error: {
          type   : 'http',
          message: 'unknown error',
          status : xhr.status
        }
      });
    }
  };
  request.send(data);
  return true;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

var CORSRequest = {
  execute: execute
};
module.exports = CORSRequest;

});
__d("FlashRequest",["DOMWrapper","Flash","GlobalCallback","QueryString","Queue"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOMWrapper     = require('DOMWrapper');
var Flash          = require('Flash');
var GlobalCallback = require('GlobalCallback');
var QueryString    = require('QueryString');
var Queue          = require('Queue');

var flashQueue; 
var requestCallbacks = {}; 
var swfUrl; 
var swf; 

function initFlash() {
  if (!swfUrl) {
    throw new Error('swfUrl has not been set');
  }

  var initCallback = GlobalCallback.create(function() {
    flashQueue.start(function(/*object*/ item) {/*TC*/__t([item,'object','item']);/*/TC*/
      var id = swf.execute(
        item.method,
        item.url,
        item.body);

      if (!id) {
        throw new Error('Could create request');
      }
      requestCallbacks[id] = item.callback;
    });
  });

  
  var requestCallback = GlobalCallback.create(function(/*string*/ id,
      /*number*/ status, /*string*/ response) {/*TC*/__t([id,'string','id'],[status,'number','status'],[response,'string','response']);/*/TC*/
    var data;
    try {
      data = ES5('JSON', 'parse', false,decodeURIComponent(response));
    } catch (parseError) {
      data = {
        error: {
          type   : 'SyntaxError',
          message: parseError.message,
          status : status,
          raw    : response
        }
      };
    }

    requestCallbacks[id](data);
    delete requestCallbacks[id];
  });

  swf = Flash.embed(swfUrl, DOMWrapper.getRoot(), null, {
    log: __DEV__ ? true : false,
    initCallback: initCallback,
    requestCallback: requestCallback
  });
}


function execute(/*string*/ url, /*string*/ method, /*object*/ params,
    /*function*/ cb) /*boolean*/ {/*TC*/__t([url,'string','url'],[method,'string','method'],[params,'object','params'],[cb,'function','cb']); return __t([function(){/*/TC*/
  
  
  params.suppress_http_code = 1;

  
  
  
  if (!params.method) {
    params.method = method;
  }


  var body = QueryString.encode(params);
  if (method === 'get' && url.length + body.length < 2000) {
    
    
    url = QueryString.appendToUrl(url, body);
    body = '';
  } else {
    method = 'post';
  }

  
  if (!flashQueue) {
    if (!Flash.isAvailable()) {
      return false;
    }
    flashQueue = new Queue();
    initFlash();
  }

  
  flashQueue.enqueue({
    method: method,
    url: url,
    body: body,
    callback: cb
  });
  return true;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

var FlashRequest = {
  setSwfUrl: function(/*string*/ swf_url) {/*TC*/__t([swf_url,'string','swf_url']);/*/TC*/
    swfUrl = swf_url;
  },
  execute: execute
};

module.exports = FlashRequest;

});
__d("JSONPRequest",["DOMWrapper","GlobalCallback","QueryString"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOMWrapper     = require('DOMWrapper');
var GlobalCallback = require('GlobalCallback');
var QueryString    = require('QueryString');


function execute(/*string*/ url, /*string*/ method, /*object*/ params,
    /*function*/ cb) /*boolean*/ {/*TC*/__t([url,'string','url'],[method,'string','method'],[params,'object','params'],[cb,'function','cb']); return __t([function(){/*/TC*/
  var script = document.createElement('script');

  var callbackWrapper = function(response) {
    callbackWrapper = function() {};
    GlobalCallback.remove(params.callback);
    cb(response);
    script.parentNode.removeChild(script);
  };

  params.callback = GlobalCallback.create(callbackWrapper);

  
  if (!params.method) {
    params.method = method;
  }

  url = QueryString.appendToUrl(url, params);
  if (url.length > 2000) {
    GlobalCallback.remove(params.callback);
    return false;
  }

  
  script.onerror = function() {
    callbackWrapper({
      error: {
        type   : 'http',
        message: 'unknown error'
      }
    });
  };

  
  var ensureCallbackCalled = function() {
    setTimeout(function() {
      
      
      callbackWrapper({
        error: {
          type   : 'http',
          message: 'unknown error'
        }
      });
    }, 0);
  };
  if (script.addEventListener) {
    script.addEventListener('load', ensureCallbackCalled, false);
  } else {
    script.onreadystatechange = function() {
      if (/loaded|complete/.test(this.readyState)) {
        ensureCallbackCalled();
      }
    };
  }

  script.src = url;
  DOMWrapper.getRoot().appendChild(script);
  return true;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

var JSONPRequest = {
  execute: execute
};

module.exports = JSONPRequest;

});
__d("ArgumentError",["ManagedError"],function(global,require,requireDynamic,requireLazy,module,exports) {

var ManagedError = require('ManagedError');

function ArgumentError(message, innerError) {
  ManagedError.prototype.constructor.apply(this, arguments);
}
ArgumentError.prototype = new ManagedError();
ArgumentError.prototype.constructor = ArgumentError;

module.exports = ArgumentError;

});
__d("ApiClient",["copyProperties","flattenObject","sprintf","CORSRequest","FlashRequest","JSONPRequest","Log","UrlMap","URL","ArgumentError","Assert","ApiClientConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var flattenObject  = require('flattenObject');
var sprintf        = require('sprintf');
var CORSRequest    = require('CORSRequest');
var FlashRequest   = require('FlashRequest');
var JSONPRequest   = require('JSONPRequest');
var Log            = require('Log');
var UrlMap         = require('UrlMap');
var URL            = require('URL');
var ArgumentError  = require('ArgumentError');
var Assert         = require('Assert');

var ApiClientConfig = requireDynamic('ApiClientConfig');

var accessToken;
var invalidTokenCallback;
var clientID;
var defaultParams;

var METHODS = {
  'get': true,
  'post': true,
  'delete': true,
  'put': true
};

var READONLYCALLS = {
  fql_query: true,
  fql_multiquery: true,
  friends_get: true,
  notifications_get: true,
  stream_get: true,
  users_getinfo: true
};


function request(/*string*/ url, /*string*/ method, /*object*/ params,
    /*function?*/ cb) {/*TC*/__t([url,'string','url'],[method,'string','method'],[params,'object','params'],[cb,'function?','cb']);/*/TC*/
  if (!params.access_token) {
    params.access_token = accessToken;
  }
  params.pretty = 0;
  if (defaultParams) {
    copyProperties(params, defaultParams);
  }

  params = flattenObject(params);
  if (!cb) {
    Log.warn('No callback passed to the ApiClient for %s', url);
    cb = function() {};
  }

  var availableTransports = {
    jsonp: JSONPRequest,
    cors : CORSRequest,
    flash: FlashRequest
  };

  
  
  var transports;
  if (params.transport) {
    transports = [params.transport];
    delete params.transport;
  } else {
    transports = ['jsonp', 'cors', 'flash'];
  }

  var responseInspector = function(data) {
    var invalidateToken = false;
    if (invalidTokenCallback && data && typeof data == 'object') {
      if (data.error) {
        if (data.error == 'invalid_token' ||
           (data.error.type == 'OAuthException' && data.error.code == 190)) {
          invalidateToken = true;
        }
      } else if (data.error_code) {
        if (data.error_code == '190') {
          invalidateToken = true;
        }
      }
      if (invalidateToken) {
        invalidTokenCallback();
      }
    }
    cb(data);
  };

  for (var i = 0; i < transports.length; i++) {
    var transport = availableTransports[transports[i]];
    var paramsCopy = copyProperties({}, params);
    if (transport.execute(url, method, paramsCopy, responseInspector)) {
      return;
    }
  }

  cb({
    error: {
      type   : 'no-transport',
      message: 'Could not find a usable transport for request'
    }
  });
}


function requestUsingGraph(/*string*/ path) {/*TC*/__t([path,'string','path']);/*/TC*/
  Assert.isString(path, 'Invalid path');
  var url;
  var args = {};

  try {
    url= new URL(path);
  } catch (e) {
    throw new ArgumentError(e.message, e);
  }

  
  ES5(Array.prototype.slice.call(arguments, 1), 'forEach', true,function(argument) {
    args[typeof argument] = argument;
  });

  var method = (args.string || 'get').toLowerCase();
  var params = copyProperties(args.object || {}, url.getParsedSearch());
  var callback = args['function'];

  Assert.isTrue(method in METHODS,
    sprintf('Invalid method passed to ApiClient: %s', method));

  params.method = method;
  url = UrlMap.resolve('graph') + url.getPath();
  request(url, method == 'get' ? 'get' : 'post', params, callback);
}


function requestUsingRest(/*object*/ params, /*function?*/ cb) {/*TC*/__t([params,'object','params'],[cb,'function?','cb']);/*/TC*/
  Assert.isObject(params);
  Assert.isString(params.method, 'method missing');

  var method = params.method.toLowerCase().replace('.', '_');
  params.format = 'json-strings';
  params.api_key = clientID;

  var domain = method in READONLYCALLS ? 'api_read' : 'api';
  var url = UrlMap.resolve(domain) + '/restserver.php';
  request(url, 'get', params, cb);
}

var ApiClient = {
  setAccessToken: function(/*string?*/ access_token) {/*TC*/__t([access_token,'string?','access_token']);/*/TC*/
    accessToken = access_token;
  },
  setInvalidAccessTokenHandler: function(/*function?*/ invalid_token_callback) {/*TC*/__t([invalid_token_callback,'function?','invalid_token_callback']);/*/TC*/
    invalidTokenCallback = invalid_token_callback;
  },
  setClientID: function(/*string?*/ client_id) {/*TC*/__t([client_id,'string?','client_id']);/*/TC*/
    clientID = client_id;
  },
  setDefaultParams: function(/*object?*/ default_params) {/*TC*/__t([default_params,'object?','default_params']);/*/TC*/
    defaultParams = default_params;
  },
  rest: requestUsingRest,
  graph: requestUsingGraph
};


FlashRequest.setSwfUrl(ApiClientConfig.FlashRequest.swfUrl);

module.exports = ApiClient;

});
__d("sdk.api",["ApiClient","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var ApiClient  = require('ApiClient');
var Runtime    = require('sdk.Runtime');

var currentAccessToken;

Runtime.subscribe('ClientID.change', function(/*string?*/ value) {/*TC*/__t([value,'string?','value']);/*/TC*/
  ApiClient.setClientID(value);
});

Runtime.subscribe('AccessToken.change', function(/*string?*/ value) {/*TC*/__t([value,'string?','value']);/*/TC*/
  currentAccessToken = value;
  ApiClient.setAccessToken(value);
});

ApiClient.setDefaultParams({
  sdk: 'joey'
});

ApiClient.setInvalidAccessTokenHandler(function() {
  
  if (currentAccessToken === Runtime.getAccessToken()) {
    
    Runtime.setAccessToken(null);
  }
});


function api() {

  
  if (typeof arguments[0] === 'string') {
    ApiClient.graph.apply(ApiClient, arguments);
  } else {
    ApiClient.rest.apply(ApiClient, arguments);
  }
}

module.exports = api;

});
__d("legacy:fb.api",["FB","sdk.api"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var api = require('sdk.api');

FB.provide('', {
  api: api
});

},3);
__d("sdk.Canvas.Environment",["sdk.RPC"],function(global,require,requireDynamic,requireLazy,module,exports) {

var RPC = require('sdk.RPC');

function getPageInfo(/*function*/ appCallback) {/*TC*/__t([appCallback,'function','appCallback']);/*/TC*/
  RPC.remote.getPageInfo(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
    appCallback(response.result);
  });
}

function scrollTo(/*number?*/ x, /*number?*/ y) {/*TC*/__t([x,'number?','x'],[y,'number?','y']);/*/TC*/
  RPC.remote.scrollTo({ x: x || 0, y: y || 0 });
}


RPC.stub('getPageInfo');
RPC.stub('scrollTo');

var Environment = {
  getPageInfo: getPageInfo,
  scrollTo: scrollTo
};

module.exports = Environment;

});
__d("sdk.Intl",["Log"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Log = require('Log');


var _punctCharClass = (
  '[' +
    '.!?' +
    '\u3002' +  
    '\uFF01' +  
    '\uFF1F' +  
    '\u0964' +  
    '\u2026' +  
    '\u0EAF' +  
    '\u1801' +  
    '\u0E2F' +  
    '\uFF0E' +  
  ']'
);


function _endsInPunct(/*string?*/ str) /*boolean*/ {/*TC*/__t([str,'string?','str']); return __t([function(){/*/TC*/
  if (typeof str != 'string') {
    return false;
  }

  return !!str.match(new RegExp(
    _punctCharClass +
    '[' +
      ')"' +
      "'" +
      
      
      
      
      
      
      
      '\u00BB' +  
      '\u0F3B' +  
      '\u0F3D' +  
      '\u2019' +  
      '\u201D' +  
      '\u203A' +  
      '\u3009' +  
      '\u300B' +  
      '\u300D' +  
      '\u300F' +  
      '\u3011' +  
      '\u3015' +  
      '\u3017' +  
      '\u3019' +  
      '\u301B' +  
      '\u301E' +  
      '\u301F' +  
      '\uFD3F' +  
      '\uFF07' +  
      '\uFF09' +  
      '\uFF3D' +  
      '\\s' +
    ']*$'
  ));
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}


function _substituteTokens(/*string*/ str, /*object?*/ args) /*string*/ {/*TC*/__t([str,'string','str'],[args,'object?','args']); return __t([function(){/*/TC*/
  
  
  if (args !== undefined) {
    if (typeof args != 'object') {
      Log.error(
        'The second arg to FB.Intl.tx() must be an Object for ' +
        'FB.Intl.tx(' + str + ', ...)'
      );
    } else {
      var regexp;
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          
          

          if (_endsInPunct(args[key])) {
            
            
            regexp = new RegExp('\\{' + key + '\\}' +
                                  _punctCharClass + '*',
                                'g');
          } else {
            regexp = new RegExp('\\{' + key + '\\}', 'g');
          }
          str = str.replace(regexp, args[key]);
        }
      }
    }
  }
  return str;
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}


function tx() {
  throw new Error('Placeholder function');
}


tx._ = _substituteTokens;


module.exports = {
  tx: tx};

});
__d("sdk.Dialog",["sdk.Canvas.Environment","sdk.Content","sdk.DOM","DOMEventListener","sdk.Event","sdk.Intl","ObservableMixin","sdk.Runtime","Type","UserAgent"],function(global,require,requireDynamic,requireLazy,module,exports) {

var CanvasEnvironment = require('sdk.Canvas.Environment');
var Content = require('sdk.Content');
var DOM = require('sdk.DOM');
var DOMEventListener = require('DOMEventListener');
var Event = require('sdk.Event');
var Intl = require('sdk.Intl');
var ObservableMixin = require('ObservableMixin');
var Runtime = require('sdk.Runtime');
var Type = require('Type');
var UserAgent = require('UserAgent');



var Constructor = Type.extend({
  constructor: function(/*string*/ id, /*string*/ display) {/*TC*/__t([id,'string','id'],[display,'string','display']);/*/TC*/
    this.parent();
    this.id = id;
    this.display = display;
    if (!Dialog._dialogs) {
      Dialog._dialogs = {};
      Dialog._addOrientationHandler();
    }
    Dialog._dialogs[id] = this;
  }
}, ObservableMixin);

var Dialog = {

  newInstance: function(/*string*/ id, /*string*/ display) /*object*/ {/*TC*/__t([id,'string','id'],[display,'string','display']); return __t([function(){/*/TC*/
    return new Constructor(id, display);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _dialogs: null,
  _lastYOffset: 0,

  
  _loaderEl: null,

  
  _overlayEl: null,

  
  _stack: [],

  
  _active: null,

  
  get: function(/*string*/ id) /*object*/ {/*TC*/__t([id,'string','id']); return __t([function(){/*/TC*/
    return Dialog._dialogs[id];
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},


  
  _findRoot: function(/*DOMElement*/ node) /*DOMElement*/ {/*TC*/__t([node,'DOMElement','node']); return __t([function(){/*/TC*/
    while (node) {
      if (DOM.containsCss(node, 'fb_dialog')) {
        return node;
      }
      node = node.parentNode;
    }
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},

  _createWWWLoader: function(/*number*/ width) /*DOMElement*/ {/*TC*/__t([width,'number','width']); return __t([function(){/*/TC*/
    width = width ? width : 460;
    return Dialog.create({
      content: (
      '<div class="dialog_title">' +
      '  <a id="fb_dialog_loader_close">' +
      '    <div class="fb_dialog_close_icon"></div>' +
      '  </a>' +
      '  <span>Facebook</span>' +
      '  <div style="clear:both;"></div>' +
      '</div>' +
      '<div class="dialog_content"></div>' +
      '<div class="dialog_footer"></div>'),
      width: width
    });
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},

  _createMobileLoader: function() /*DOMElement*/ {/*TC*/ return __t([function(){/*/TC*/
    
    
    
    
    
    var chrome = UserAgent.nativeApp()
      ? ''
      : ('<table>' +
        '  <tbody>' +
        '    <tr>' +
        '      <td class="header_left">' +
        '        <label class="touchable_button">' +
        '          <input type="submit" value="' +
                     Intl.tx._("Cancel") + '"' +
        '            id="fb_dialog_loader_close"/>' +
        '        </label>' +
        '      </td>' +
        '      <td class="header_center">' +
        '        <div>' + Intl.tx._("Loading...") + '</div>' +
        '      </td>' +
        '      <td class="header_right">' +
        '      </td>' +
        '    </tr>' +
        '  </tbody>' +
        '</table>');

    return Dialog.create({
      classes: 'loading' + (UserAgent.ipad() ? ' centered' : ''),
      content: (
        '<div class="dialog_header">' +
          chrome +
        '</div>')
    });
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},

  _restoreBodyPosition: function() {
    if (!UserAgent.ipad()) {
      var body = document.getElementsByTagName('body')[0];
      DOM.removeCss(body, 'fb_hidden');
    }
  },

  _showIPadOverlay: function() {
    if (!UserAgent.ipad()) {
      return;
    }
    if (!Dialog._overlayEl) {
      Dialog._overlayEl = document.createElement('div');
      Dialog._overlayEl.setAttribute('id', 'fb_dialog_ipad_overlay');
      Content.append(Dialog._overlayEl, null);
    }
    Dialog._overlayEl.className = '';
  },

  _hideIPadOverlay: function() {
    if (UserAgent.ipad()) {
      Dialog._overlayEl.className = 'hidden';
    }
  },

  
  showLoader: function(/*function?*/ cb, /*number*/ width) {/*TC*/__t([cb,'function?','cb'],[width,'number','width']);/*/TC*/
    Dialog._showIPadOverlay();

    if (!Dialog._loaderEl) {
      Dialog._loaderEl = Dialog._findRoot(UserAgent.mobile()
        ? Dialog._createMobileLoader()
        : Dialog._createWWWLoader(width));
    }

    
    
    
    
    if (!cb) {
      cb = function() {};
    }
    var loaderClose = document.getElementById('fb_dialog_loader_close');
    DOM.removeCss(loaderClose, 'fb_hidden');
    loaderClose.onclick = function() {
      Dialog._hideLoader();
      Dialog._restoreBodyPosition();
      Dialog._hideIPadOverlay();
      cb();
    };
    var iPadOverlay = document.getElementById('fb_dialog_ipad_overlay');
    if (iPadOverlay) {
      iPadOverlay.ontouchstart = loaderClose.onclick;
    }

    Dialog._makeActive(Dialog._loaderEl);
  },

  
  _hideLoader: function() {
    if (Dialog._loaderEl && Dialog._loaderEl == Dialog._active) {
      Dialog._loaderEl.style.top = '-10000px';
    }
  },

  
  _makeActive: function(/*DOMElement*/ el) {/*TC*/__t([el,'DOMElement','el']);/*/TC*/
    Dialog._setDialogSizes();
    Dialog._lowerActive();
    Dialog._active = el;
    if (Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)) {
      CanvasEnvironment.getPageInfo(function(pageInfo) {
        Dialog._centerActive(pageInfo);
      });
    }
    Dialog._centerActive();
  },

  
  _lowerActive: function() {
    if (!Dialog._active) {
      return;
    }
    Dialog._active.style.top = '-10000px';
    Dialog._active = null;
  },

  
  _removeStacked: function(/*DOMElement*/ dialog) {/*TC*/__t([dialog,'DOMElement','dialog']);/*/TC*/
    Dialog._stack = ES5(Dialog._stack, 'filter', true,function(node) {
      return node != dialog;
    });
  },

  
  _centerActive: function(/*object?*/ pageInfo) {/*TC*/__t([pageInfo,'object?','pageInfo']);/*/TC*/
    var dialog = Dialog._active;
    if (!dialog) {
      return;
    }

    var view = DOM.getViewportInfo();
    var width = parseInt(dialog.offsetWidth, 10);
    var height = parseInt(dialog.offsetHeight, 10);
    var left = view.scrollLeft + (view.width - width) / 2;

    
    
    
    
    
    
    
    var minTop = (view.height - height) / 2.5;
    if (left < minTop) {
      minTop = left;
    }
    var maxTop = view.height - height - minTop;

    
    var top = (view.height - height) / 2;
    if (pageInfo) {
      top = pageInfo.scrollTop - pageInfo.offsetTop +
        (pageInfo.clientHeight - height) / 2;
    }

    
    if (top < minTop) {
      top = minTop;
    } else if (top > maxTop) {
      top = maxTop;
    }

    
    top += view.scrollTop;

    
    
    if (UserAgent.mobile()) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      var paddingHeight = 100;

      
      
      if (UserAgent.ipad()) {
        paddingHeight += (view.height - height) / 2;
      } else {
        var body = document.getElementsByTagName('body')[0];
        DOM.addCss(body, 'fb_hidden');
        left = 10000;
        top = 10000;
      }

      var paddingDivs = DOM.getByClass('fb_dialog_padding', dialog);
      if (paddingDivs.length) {
        paddingDivs[0].style.height = paddingHeight + 'px';
      }
    }

    dialog.style.left = (left > 0 ? left : 0) + 'px';
    dialog.style.top = (top > 0 ? top : 0) + 'px';
  },

  _setDialogSizes: function() {
    if (!UserAgent.mobile() || UserAgent.ipad()) {
      return;
    }
    for (var id in Dialog._dialogs) {
      if (Dialog._dialogs.hasOwnProperty(id)) {
        var iframe = document.getElementById(id);
        if (iframe) {
          iframe.style.width = Dialog.getDefaultSize().width + 'px';
          iframe.style.height = Dialog.getDefaultSize().height + 'px';
        }
      }
    }
  },
  getDefaultSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    if (UserAgent.mobile()) {
      if (UserAgent.ipad()) {
        return {
          width: 500,
          height: 590
        };
      } else if (UserAgent.android()) {
        
        
        return {
          width: screen.availWidth,
          height: screen.availHeight
        };
      } else {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var isLandscape = width / height > 1.2;
        
        
        
        
        
        
        
        
        
        
        
        return {
          width: width,
          height: Math.max(height,
                         (isLandscape ? screen.width : screen.height))
        };
      }
    }
    return {width: 575, height: 240};
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},


  
  _handleOrientationChange: function(e) {
    
    
    
    
    
    
    
    
    if (UserAgent.android() &&
        screen.availWidth == Dialog._availScreenWidth) {
      setTimeout(Dialog._handleOrientationChange, 50);
      return;
    }

    Dialog._availScreenWidth = screen.availWidth;

    if (UserAgent.ipad()) {
      Dialog._centerActive();
    } else {
      var width = Dialog.getDefaultSize().width;
      for (var id in Dialog._dialogs) {
        if (Dialog._dialogs.hasOwnProperty(id)) {
          
          var iframe = document.getElementById(id);
          if (iframe) {
            iframe.style.width = width + 'px';
          }
        }
      }
    }
  },

  
  _addOrientationHandler: function() {
    if (!UserAgent.mobile()) {
      return;
    }
    
    
    
    var event_name = "onorientationchange" in window
      ? 'orientationchange'
      : 'resize';

    Dialog._availScreenWidth = screen.availWidth;
    DOMEventListener.add(window, event_name, Dialog._handleOrientationChange);
  },

  
  create: function(/*object*/ opts) /*DOMElement*/ {/*TC*/__t([opts,'object','opts']); return __t([function(){/*/TC*/
    opts = opts || {};

    var
      dialog      = document.createElement('div'),
      contentRoot = document.createElement('div'),
      className   = 'fb_dialog';

    
    if (opts.closeIcon && opts.onClose) {
      var closeIcon = document.createElement('a');
      closeIcon.className = 'fb_dialog_close_icon';
      closeIcon.onclick = opts.onClose;
      dialog.appendChild(closeIcon);
    }

    className += ' ' + (opts.classes || '');

    
    if (UserAgent.ie()) {
      className += ' fb_dialog_legacy';
      ES5([ 'vert_left',
        'vert_right',
        'horiz_top',
        'horiz_bottom',
        'top_left',
        'top_right',
        'bottom_left',
        'bottom_right'], 'forEach', true,function(/*string*/ name) {/*TC*/__t([name,'string','name']);/*/TC*/
          var span = document.createElement('span');
          span.className = 'fb_dialog_' + name;
          dialog.appendChild(span);
        });
    } else {
      className += UserAgent.mobile()
        ? ' fb_dialog_mobile'
        : ' fb_dialog_advanced';
    }

    if (opts.content) {
      Content.append(opts.content, contentRoot);
    }
    dialog.className = className;
    var width = parseInt(opts.width, 10);
    if (!isNaN(width)) {
      dialog.style.width = width + 'px';
    }
    contentRoot.className = 'fb_dialog_content';

    dialog.appendChild(contentRoot);
    if (UserAgent.mobile()) {
      var padding = document.createElement('div');
      padding.className = 'fb_dialog_padding';
      dialog.appendChild(padding);
    }

    Content.append(dialog);

    if (opts.visible) {
      Dialog.show(dialog);
    }

    return contentRoot;
  /*TC*/}.apply(this, arguments), 'DOMElement']);/*/TC*/},

  
  show: function(/*DOMElement*/ dialog) {/*TC*/__t([dialog,'DOMElement','dialog']);/*/TC*/
    var root = Dialog._findRoot(dialog);
    if (root) {
      Dialog._removeStacked(root);
      Dialog._hideLoader();
      Dialog._makeActive(root);
      Dialog._stack.push(root);
      if ('fbCallID' in dialog) {
        Dialog.get(dialog.fbCallID).inform('iframe_show');
      }
    }
  },

  
  hide: function(/*DOMElement*/ dialog) {/*TC*/__t([dialog,'DOMElement','dialog']);/*/TC*/
    var root = Dialog._findRoot(dialog);
    if (root == Dialog._active) {
      Dialog._lowerActive();
      Dialog._restoreBodyPosition();
      Dialog._hideIPadOverlay();
      if ('fbCallID' in dialog) {
        Dialog.get(dialog.fbCallID).inform('iframe_hide');
      }
    }
  },

  
  remove: function(/*DOMElement*/ dialog) {/*TC*/__t([dialog,'DOMElement','dialog']);/*/TC*/
    dialog = Dialog._findRoot(dialog);
    if (dialog) {
      var is_active = Dialog._active == dialog;
      Dialog._removeStacked(dialog);
      if (is_active) {
        Dialog._hideLoader();
        if (Dialog._stack.length > 0) {
          Dialog.show(Dialog._stack.pop());
        } else {
          Dialog._lowerActive();
          Dialog._restoreBodyPosition();
          Dialog._hideIPadOverlay();
        }
      } else if (Dialog._active === null && Dialog._stack.length > 0) {
        Dialog.show(Dialog._stack.pop());
      }

      
      
      
      
      
      
      setTimeout(function() {
        dialog.parentNode.removeChild(dialog);
      }, 3000);
    }
  },

  
  isActive: function(/*DOMElement*/ node) /*boolean*/ {/*TC*/__t([node,'DOMElement','node']); return __t([function(){/*/TC*/
    var root = Dialog._findRoot(node);
    return root && root === Dialog._active;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

};

module.exports = Dialog;

});
__d("sdk.Frictionless",["sdk.Auth","sdk.api","sdk.Event","sdk.Dialog"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Auth = require('sdk.Auth');
var api = require('sdk.api');
var Event = require('sdk.Event');
var Dialog = require('sdk.Dialog');

var Frictionless = {

  
  
  _allowedRecipients: {},

  _useFrictionless: false,

  
  _updateRecipients: function() {
    Frictionless._allowedRecipients = {};
    api('/me/apprequestformerrecipients', function(response) {
      if (!response || response.error) {
        return;
      }
      ES5(response.data, 'forEach', true,function(/*object*/ recipient) {/*TC*/__t([recipient,'object','recipient']);/*/TC*/
        Frictionless._allowedRecipients[recipient.recipient_id] = true;
      });
    });
  },

  
  init: function() {
    Frictionless._useFrictionless = true;
    Auth.getLoginStatus(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
      if (response.status == 'connected') {
        Frictionless._updateRecipients();
      }
    });
    Event.subscribe('auth.login', function(/*object*/ login) {/*TC*/__t([login,'object','login']);/*/TC*/
      if (login.authResponse) {
        Frictionless._updateRecipients();
      }
    });
  },

  
  _processRequestResponse: function(/*function*/ cb, /*boolean? */hidden)
      /*function*/ {/*TC*/__t([cb,'function','cb']); return __t([function(){/*/TC*/
    return function(/*object?*/ params) {/*TC*/__t([params,'object?','params']);/*/TC*/
      var updated = params && params.updated_frictionless;
      if (Frictionless._useFrictionless && updated) {
        
        
        Frictionless._updateRecipients();
      }

      if (params) {
        if (!hidden && params.frictionless) {
          Dialog._hideLoader();
          Dialog._restoreBodyPosition();
          Dialog._hideIPadOverlay();
        }
        delete params.frictionless;
        delete params.updated_frictionless;
      }
      
      cb && cb(params);
    };
  /*TC*/}.apply(this, arguments), 'function']);/*/TC*/},

  
  isAllowed: function(user_ids) /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    if (!user_ids) {
      return false;
    }

    if (typeof user_ids === 'number') {
      return user_ids in Frictionless._allowedRecipients;
    }
    if (typeof user_ids === 'string') {
      user_ids = user_ids.split(',');
    }
    user_ids = ES5(user_ids, 'map', true,function(s) {return ES5(String(s),'trim', true);});

    var allowed = true;
    var has_user_ids = false;
    ES5(user_ids, 'forEach', true,function(/*string*/ user_id) {/*TC*/__t([user_id,'string','user_id']);/*/TC*/
      allowed = allowed && user_id in Frictionless._allowedRecipients;
      has_user_ids = true;
    });
    return allowed && has_user_ids;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}
};

Event.subscribe('init:post', function(/*object*/ options) {/*TC*/__t([options,'object','options']);/*/TC*/
  if (options.frictionlessRequests) {
    Frictionless.init();
  }
});


module.exports = Frictionless;

});
__d("insertIframe",["guid","GlobalCallback"],function(global,require,requireDynamic,requireLazy,module,exports) {

var guid = require('guid');
var GlobalCallback = require('GlobalCallback');

function insertIframe(/*object*/ opts) {/*TC*/__t([opts,'object','opts']);/*/TC*/

  
  

  opts.id = opts.id || guid();
  opts.name = opts.name || guid();

  
  
  
  
  
  var srcSet = false;
  var onloadDone = false;
  var callback = function() {
    if (srcSet && !onloadDone) {
      onloadDone = true;
      opts.onload && opts.onload(opts.root.firstChild);
    }
  };
  var globalCallback = GlobalCallback.create(callback);


  
  
  

  if (document.attachEvent) {
    
    
    var html = (
      '<iframe' +
        ' id="' + opts.id + '"' +
        ' name="' + opts.name + '"' +
        (opts.title ? ' title="' + opts.title + '"' : '') +
        (opts.className ? ' class="' + opts.className + '"' : '') +
        ' style="border:none;' +
        (opts.width ? 'width:' + opts.width + 'px;' : '') +
        (opts.height ? 'height:' + opts.height + 'px;' : '') +
        '"' +
        ' src="javascript:false;"' +
        ' frameborder="0"' +
        ' scrolling="no"' +
        ' allowtransparency="true"' +
        ' onload="' + globalCallback + '()"' +
        '></iframe>'
    );

    
    
    
    
    
    
    
    
    opts.root.innerHTML = (
      '<iframe src="javascript:false"' +
        ' frameborder="0"' +
        ' scrolling="no"' +
        ' style="height:1px"></iframe>'
    );

    
    srcSet = true;

    
    
    
    
    
    window.setTimeout(function() {
      opts.root.innerHTML = html;
      opts.root.firstChild.src = opts.url;
      opts.onInsert && opts.onInsert(opts.root.firstChild);
    }, 0);

  } else {
    
    
    
    var node = document.createElement('iframe');
    node.id = opts.id;
    node.name = opts.name;
    node.onload = callback;
    node.scrolling = 'no';
    node.style.border = 'none';
    node.style.overflow = 'hidden';
    if (opts.title) {
      node.title = opts.title;
    }
    if (opts.className) {
      node.className = opts.className;
    }
    if (opts.height !== undefined) {
      node.style.height = opts.height + 'px';
    }
    if (opts.width !== undefined) {
      if (opts.width == '100%') {
        node.style.width = opts.width;
      } else {
        node.style.width = opts.width + 'px';
      }
    }
    opts.root.appendChild(node);

    
    srcSet = true;

    node.src = opts.url;
    opts.onInsert && opts.onInsert(node);
  }
}

module.exports = insertIframe;

});
__d("sdk.Native",["copyProperties","Log","UserAgent"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var Log = require('Log');
var UserAgent = require('UserAgent');

var NATIVE_READY_EVENT = 'fbNativeReady';

var Native = {

  
  onready: function(/*function*/ func) {/*TC*/__t([func,'function','func']);/*/TC*/
    
    if (!UserAgent.nativeApp()) {
      Log.error('FB.Native.onready only works when the page is rendered ' +
             'in a WebView of the native Facebook app. Test if this is the ' +
             'case calling FB.UA.nativeApp()');
      return;
    }

    
    
    
    
    if (window.__fbNative && !this.nativeReady) {
      copyProperties(this, window.__fbNative);
    }

    
    if (this.nativeReady) {
      func();
    } else {
      
      
      var nativeReadyCallback = function(evt) {
        window.removeEventListener(NATIVE_READY_EVENT, nativeReadyCallback);
        this.onready(func);
      };
      window.addEventListener(NATIVE_READY_EVENT, nativeReadyCallback, false);
    }
  }
};

module.exports = Native;

});
__d("sdk.UIServer",["sdk.Auth","sdk.Content","copyProperties","sdk.Dialog","sdk.DOM","sdk.Event","flattenObject","sdk.Frictionless","sdk.getContextType","guid","insertIframe","Log","sdk.Native","QueryString","resolveURI","sdk.RPC","sdk.Runtime","UrlMap","UserAgent","sdk.XD"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Auth = require('sdk.Auth');
var Content = require('sdk.Content');
var copyProperties = require('copyProperties');
var Dialog = require('sdk.Dialog');
var DOM = require('sdk.DOM');
var Event = require('sdk.Event');
var flattenObject = require('flattenObject');
var Frictionless = require('sdk.Frictionless');
var getContextType = require('sdk.getContextType');
var guid = require('guid');
var insertIframe = require('insertIframe');
var Log = require('Log');
var Native = require('sdk.Native');
var QueryString = require('QueryString');
var resolveURI = require('resolveURI')
var RPC = require('sdk.RPC');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');
var UserAgent = require('UserAgent');
var XD = require('sdk.XD');

var MobileIframeable = {
  transform: function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
    
    
    
    if (call.params.display === 'touch' &&
        call.params.access_token &&
        window.postMessage
       ) {
      
      
      call.params.channel = UIServer._xdChannelHandler(
        call.id,
        'parent'
      );
      
      if (!UserAgent.nativeApp()) {
        call.params.in_iframe = 1;
      }
      return call;
    } else {
      return UIServer.genericTransform(call);
    }
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},
  getXdRelation: function(/*object*/ params) /*string*/ {/*TC*/__t([params,'object','params']); return __t([function(){/*/TC*/
    var display = params.display;
    if (display === 'touch' && window.postMessage && params.in_iframe) {
      
      
      
      return 'parent';
    }
    return UIServer.getXdRelation(params);
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
};

var Methods = {
  'stream.share': {
    size      : { width: 670, height: 340 },
    url       : 'sharer.php',
    transform : function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      if (!call.params.u) {
        call.params.u = window.location.toString();
      }
      call.params.display = 'popup';
      return call;
    /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
  },

  
  'auth.logintofacebook': {
    size            : { width: 530, height: 287 },
    url             : 'login.php',
    transform       : function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      
      
      call.params.skip_api_login = 1;

      
      
      
      
      
      var relation = UIServer.getXdRelation(call.params);
      var next = UIServer._xdResult(
          call.cb,
          call.id,
          relation,
          true 
        );
      call.params.next =
        UrlMap.resolve('www') + '/login.php?' + QueryString.encode({
            api_key: Runtime.getClientID(),
            next: next,
            skip_api_login: 1
        });

      return call;
    /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
  },
  
  'apprequests': {
    transform: function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      call = MobileIframeable.transform(call);

      call.params.frictionless = Frictionless &&
        Frictionless._useFrictionless;
      if (call.params.frictionless) {

        if (Frictionless.isAllowed(call.params.to)) {
          
          
          
          
          call.params.display = 'iframe';
          call.params.in_iframe = true;
          
          call.hideLoader = true;
        }

        
        call.cb = Frictionless._processRequestResponse(
          call.cb,
          call.hideLoader
        );
      }
      return call;
    /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},
    getXdRelation: MobileIframeable.getXdRelation
  },
  'feed': MobileIframeable,

  'permissions.oauth': {
    url       : 'dialog/oauth',
    size      : { width: (UserAgent.mobile() ? null : 627),
                  height: (UserAgent.mobile() ? null : 326) },
    transform : function(/*object*/ call) /*object?*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      if (!Runtime.getClientID()) {
        Log.error('FB.login() called before FB.init().');
        return;
      }

      
      
      
      if (Auth.getAuthResponse() && !call.params.scope) {
        Log.error('FB.login() called when user is already connected.');
        call.cb && call.cb({ status: Runtime.getLoginStatus(),
                             authResponse: Auth.getAuthResponse()});
        return;
      }

      var
        cb = call.cb,
        id = call.id;
      delete call.cb;

      if (call.params.display === 'async') {
        copyProperties(
          call.params, {
            client_id : Runtime.getClientID(),
            origin : getContextType(),
            response_type: 'token,signed_request',
            domain: location.hostname
          });

        call.cb = Auth.xdResponseWrapper(
          cb, Auth.getAuthResponse(), 'permissions.oauth');
      } else {
        copyProperties(
          call.params, {
            client_id : Runtime.getClientID(),
            redirect_uri : resolveURI(
              UIServer.xdHandler(
                cb,
                id,
                'opener',
                Auth.getAuthResponse(),
                'permissions.oauth')),
            origin : getContextType(),
            response_type: 'token,signed_request',
            domain: location.hostname
          });
      }

      return call;
    /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}
  },

  'auth.logout': {
    url       : 'logout.php',
    transform : function(/*object*/ call) /*object?*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      if (!Runtime.getClientID()) {
        Log.error('FB.logout() called before calling FB.init().');
      } else if (!Auth.getAuthResponse()) {
        Log.error('FB.logout() called without an access token.');
      } else {
        call.params.next = UIServer.xdHandler(call.cb,
                                             call.id,
                                             'parent',
                                             Auth.getAuthResponse(),
                                             'logout');
        return call;
      }
    /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}
  },

  'login.status': {
    url       : 'dialog/oauth',
    transform : function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      var
        cb = call.cb,
        id = call.id;
      delete call.cb;
      copyProperties(call.params, {
        client_id : Runtime.getClientID(),
        redirect_uri : UIServer.xdHandler(cb,
                                         id,
                                         'parent',
                                         Auth.getAuthResponse(),
                                         'login_status'),
        origin : getContextType(),
        response_type : 'token,signed_request,code',
        domain: location.hostname
      });

      return call;
    /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
  }
};

var UIServer = {
  
  Methods: Methods,
  
  _loadedNodes   : {},
  _defaultCb     : {},
  _resultToken   : '"xxRESULTTOKENxx"',

  
  genericTransform: function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
    if (call.params.display == 'dialog' || call.params.display == 'iframe') {
      copyProperties(call.params, {
        display: 'iframe',
        channel: UIServer._xdChannelHandler(call.id, 'parent.parent')
      }, true);
    }

    return call;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  prepareCall: function(/*object*/ params, /*function*/ cb) /*object?*/ {/*TC*/__t([params,'object','params'],[cb,'function','cb']); return __t([function(){/*/TC*/
    var
      name   = params.method.toLowerCase(),
      method = copyProperties({}, UIServer.Methods[name]),
      id     = guid(),
      
      
      
      forceHTTPS = (method.noHttps !== true) &&
                   (Runtime.getSecure() ||
                    (name !== 'auth.status' && name != 'login.status'));

    
    copyProperties(params, {
      api_key      : Runtime.getClientID(),
      app_id       : Runtime.getClientID(),
      locale       : Runtime.getLocale(),
      sdk          : 'joey',
      access_token : forceHTTPS && Runtime.getAccessToken() || undefined
    });

    
    params.display = UIServer.getDisplayMode(method, params);

    
    if (!method.url) {
      method.url = 'dialog/' + name;
    }

    
    var call = {
      cb     : cb,
      id     : id,
      size   : method.size || UIServer.getDefaultSize(),
      url    : UrlMap.resolve('www', forceHTTPS) + '/' + method.url,
      forceHTTPS: forceHTTPS,
      params : params,
      name   : name,
      dialog : Dialog.newInstance(id, params.display)
    };

    
    var transform = method.transform
      ? method.transform
      : UIServer.genericTransform;
    if (transform) {
      call = transform(call);

      
      if (!call) {
        return;
      }
    }

    
    
    var getXdRelationFn = method.getXdRelation || UIServer.getXdRelation;
    var relation = getXdRelationFn(call.params);
    if (!(call.id in UIServer._defaultCb) &&
        !('next' in call.params) &&
        !('redirect_uri' in call.params)) {
      call.params.next = UIServer._xdResult(
        call.cb,
        call.id,
        relation,
        true 
      );
    }
    if (relation === 'parent') {
      copyProperties(call.params, {
        channel_url: UIServer._xdChannelHandler(id, 'parent.parent')
      }, true);
    }

    
    call = UIServer.prepareParams(call);

    return call;
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/},

  prepareParams: function(/*object*/ call) /*object*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
    var method = call.params.method;
    
    
    
    
    if (call.params.display !== 'async') {
      delete call.params.method;
    }

    
    call.params = flattenObject(call.params);
    var encodedQS = QueryString.encode(call.params);

    
    
    
    if (!UserAgent.nativeApp() &&
        UIServer.urlTooLongForIE(call.url + '?' + encodedQS)) {
      call.post = true;
    } else if (encodedQS) {
      call.url += '?' + encodedQS;
    }

    return call;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  urlTooLongForIE: function(/*string*/ fullURL) /*boolean*/ {/*TC*/__t([fullURL,'string','fullURL']); return __t([function(){/*/TC*/
    return fullURL.length > 2000;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getDisplayMode: function(/*object*/ method, /*object*/ params) /*string*/ {/*TC*/__t([method,'object','method'],[params,'object','params']); return __t([function(){/*/TC*/
    if (params.display === 'hidden' ||
        params.display === 'none') {
      return params.display;
    }

    var canvas = Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) ||
                 Runtime.isEnvironment(Runtime.ENVIRONMENTS.PAGETAB);
    if (canvas && !params.display) {
      return 'async';
    }

    
    if (UserAgent.mobile() || params.display === 'touch') {
      return 'touch';
    }

    
    if (!Runtime.getAccessToken() &&
        params.display == 'dialog' &&
        !method.loggedOutIframe) {
      Log.error('"dialog" mode can only be used when the user is connected.');
      return 'popup';
    }

    if (method.connectDisplay && !canvas) {
      return method.connectDisplay;
    }

    
    return params.display || (Runtime.getAccessToken() ? 'dialog' : 'popup');
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  getXdRelation: function(/*object*/ params) /*string*/ {/*TC*/__t([params,'object','params']); return __t([function(){/*/TC*/
    var display = params.display;
    if (display === 'popup' || display === 'touch') {
      return 'opener';
    }
    if (display === 'dialog' || display === 'iframe' ||
        display === 'hidden' || display === 'none') {
      return 'parent';
    }
    if (display === 'async') {
      return 'parent.frames[' + window.name + ']';
    }
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  popup: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    
    var
      _screenX   = typeof window.screenX      != 'undefined'
        ? window.screenX
        : window.screenLeft,
      screenY    = typeof window.screenY      != 'undefined'
        ? window.screenY
        : window.screenTop,
      outerWidth = typeof window.outerWidth   != 'undefined'
        ? window.outerWidth
        : document.documentElement.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined'
        ? window.outerHeight
        : (document.documentElement.clientHeight - 22), 

      
      
      width    = UserAgent.mobile() ? null : call.size.width,
      height   = UserAgent.mobile() ? null : call.size.height,
      screenX  = (_screenX < 0) ? window.screen.width + _screenX : _screenX,
      left     = parseInt(screenX + ((outerWidth - width) / 2), 10),
      top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
      features = [];

    if (width !== null) {
      features.push('width=' + width);
    }
    if (height !== null) {
      features.push('height=' + height);
    }
    features.push('left=' + left);
    features.push('top=' + top);
    features.push('scrollbars=1');
    if (call.name == 'permissions.request' ||
        call.name == 'permissions.oauth') {
      features.push('location=1,toolbar=0');
    }
    features = features.join(',');

    
    var popup;
    if (call.post) {
      popup = window.open('about:blank', call.id, features);
      if (popup) {
        UIServer.setLoadedNode(call, popup, 'popup');
        Content.submitToTarget({
          url    : call.url,
          target : call.id,
          params : call.params
        });
      }
    } else {
      popup = window.open(call.url, call.id, features);
      if (popup) {
        UIServer.setLoadedNode(call, popup, 'popup');
      }
    }

    
    if (!popup) {
      //TODO: signal failure
      return;
    }

    
    if (call.id in UIServer._defaultCb) {
      UIServer._popupMonitor();
    }
  },

  setLoadedNode: function(/*object*/ call, node, /*string?*/ type) {/*TC*/__t([call,'object','call'],[type,'string?','type']);/*/TC*/
    if (call.params && call.params.display != 'popup') {
      
      
      
      node.fbCallID = call.id;
    }
    node = {
      node: node,
      type: type,
      fbCallID: call.id
    };
    UIServer._loadedNodes[call.id] = node;
  },

  getLoadedNode: function(call) {
    var id = typeof call == 'object' ? call.id : call,
        node = UIServer._loadedNodes[id];
    return node ? node.node : null;
  },

  
  hidden: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    call.className = 'FB_UI_Hidden';
    call.root = Content.appendHidden('');
    UIServer._insertIframe(call);
  },

  
  iframe: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    call.className = 'FB_UI_Dialog';
    var onClose = function() {
      UIServer._triggerDefault(call.id);
    };
    call.root = Dialog.create({
      onClose: onClose,
      closeIcon: true,
      classes: (UserAgent.ipad() ? 'centered' : '')
    });
    if (!call.hideLoader) {
      Dialog.showLoader(onClose, call.size.width);
    }
    DOM.addCss(call.root, 'fb_dialog_iframe');
    UIServer._insertIframe(call);
  },

  
  touch: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    if (call.params && call.params.in_iframe) {
      
      
      if (call.ui_created) {
        Dialog.showLoader(function() {
          UIServer._triggerDefault(call.id);
        }, 0);
      } else {
        UIServer.iframe(call);
      }
    } else if (UserAgent.nativeApp() && !call.ui_created) {
      
      
      call.frame = call.id;
      Native.onready(function() {
        
        
        
        
        
        
        UIServer.setLoadedNode(
          call,
          Native.open(call.url + '#cb=' + call.frameName),
          'native');
      });
      UIServer._popupMonitor();
    } else if (!call.ui_created) {
      
      UIServer.popup(call);
    }
  },

  
  async: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    call.params.redirect_uri = location.protocol + '//' +
      location.host + location.pathname;

    RPC.remote.showDialog(call.params, function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
      call.cb(response.result);
    });
  },

  getDefaultSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return Dialog.getDefaultSize();
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _insertIframe: function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
    
    
    
    UIServer._loadedNodes[call.id] = false;
    var activate = function(/*DOMElement*/ node) {/*TC*/__t([node,'DOMElement','node']);/*/TC*/
      if (call.id in UIServer._loadedNodes) {
        UIServer.setLoadedNode(call, node, 'iframe');
      }
    };

    
    if (call.post) {
      insertIframe({
        url       : 'about:blank',
        root      : call.root,
        className : call.className,
        width     : call.size.width,
        height    : call.size.height,
        id        : call.id,
        onInsert  : activate,
        onload    : function(/*DOMElement*/ node) {/*TC*/__t([node,'DOMElement','node']);/*/TC*/
          Content.submitToTarget({
            url    : call.url,
            target : node.name,
            params : call.params
          });
        }
      });
    } else {
      insertIframe({
        url       : call.url,
        root      : call.root,
        className : call.className,
        width     : call.size.width,
        height    : call.size.height,
        id        : call.id,
        name      : call.frameName,
        onInsert  : activate
      });
    }
  },

  
  _handleResizeMessage: function(/*string*/ frame, /*object*/ data) {/*TC*/__t([frame,'string','frame'],[data,'object','data']);/*/TC*/
    var node = UIServer.getLoadedNode(frame);
    if (!node) {
      return;
    }

    if (data.height) {
      node.style.height = data.height + 'px';
    }
    if (data.width) {
      node.style.width = data.width + 'px';
    }

    XD.inform(
      'resize.ack',
      data || {},
      'parent.frames[' + node.name + ']');

    if (!Dialog.isActive(node)) {
      Dialog.show(node);
    }
  },

  
  _triggerDefault: function(/*string*/ id) {/*TC*/__t([id,'string','id']);/*/TC*/
    UIServer._xdRecv(
      { frame: id },
      UIServer._defaultCb[id] || function() {}
    );
  },

  
  _popupMonitor: function() {
    
    var found;
    for (var id in UIServer._loadedNodes) {
      
      if (UIServer._loadedNodes.hasOwnProperty(id) &&
          id in UIServer._defaultCb) {
        var node = UIServer._loadedNodes[id];
        if (node.type != 'popup' && node.type != 'native') {
          continue;
        }
        var win = node.node;

        try {
          
          if (win.closed) {
            UIServer._triggerDefault(id);
          } else {
            found = true; 
          }
        } catch (y) {
          
        }
      }
    }

    if (found && !UIServer._popupInterval) {
      
      UIServer._popupInterval = setInterval(UIServer._popupMonitor, 100);
    } else if (!found && UIServer._popupInterval) {
      
      clearInterval(UIServer._popupInterval);
      UIServer._popupInterval = null;
    }
  },

  
  _xdChannelHandler: function(/*string*/ frame, /*string*/ relation)
      /*string*/ {/*TC*/__t([frame,'string','frame'],[relation,'string','relation']); return __t([function(){/*/TC*/
    return XD.handler(function(/*object*/ data) {/*TC*/__t([data,'object','data']);/*/TC*/
      var node = UIServer.getLoadedNode(frame);
      if (!node) { 
        return;
      }

      if (data.type == 'resize') {
        UIServer._handleResizeMessage(frame, data);
      } else if (data.type == 'hide') {
        Dialog.hide(node);
      } else if (data.type == 'rendered') {
        var root = Dialog._findRoot(node);
        Dialog.show(root);
      } else if (data.type == 'fireevent') {
        Event.fire(data.event);
      }
    }, relation, true, null);
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _xdNextHandler: function(/*function*/ cb, /*string*/ frame,
       /*string*/ relation, /*boolean*/ isDefault) /*string*/ {/*TC*/__t([cb,'function','cb'],[frame,'string','frame'],[relation,'string','relation'],[isDefault,'boolean','isDefault']); return __t([function(){/*/TC*/
    if (isDefault) {
      UIServer._defaultCb[frame] = cb;
    }

    return XD.handler(function(data) {
      UIServer._xdRecv(data, cb);
    }, relation) + '&frame=' + frame;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _xdRecv: function(/*object*/ data, /*function*/ cb) {/*TC*/__t([data,'object','data'],[cb,'function','cb']);/*/TC*/
    var frame = UIServer.getLoadedNode(data.frame);
    if (frame) {
      
      try {
        if (DOM.containsCss(frame, 'FB_UI_Hidden')) {
          
          
          setTimeout(function() {
            
            frame.parentNode.parentNode.removeChild(frame.parentNode);
          }, 3000);
        } else if (DOM.containsCss(frame, 'FB_UI_Dialog')) {
          Dialog.remove(frame);
        }
      } catch (x) {
        
      }

      
      try {
        if (frame.close) {
          frame.close();
          window.focus();
          UIServer._popupCount--;
        }
      } catch (y) {
        
      }

    }
    
    delete UIServer._loadedNodes[data.frame];
    delete UIServer._defaultCb[data.frame];
    cb(data);
  },

  
  _xdResult: function(/*function*/ cb, /*string*/ frame, /*string*/ target,
      /*boolean*/ isDefault) /*string*/ {/*TC*/__t([cb,'function','cb'],[frame,'string','frame'],[target,'string','target'],[isDefault,'boolean','isDefault']); return __t([function(){/*/TC*/
    return (
      UIServer._xdNextHandler(function(params) {
        cb && cb(params.result &&
                 params.result != UIServer._resultToken &&
                 ES5('JSON', 'parse', false,params.result));
      }, frame, target, isDefault) +
      '&result=' + encodeURIComponent(UIServer._resultToken)
    );
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  xdHandler: function(/*function*/ cb, /*string*/ frame, /*string*/ target,
      /*object?*/ authResponse, /*string*/ method) /*string*/ {/*TC*/__t([cb,'function','cb'],[frame,'string','frame'],[target,'string','target'],[authResponse,'object?','authResponse'],[method,'string','method']); return __t([function(){/*/TC*/
    return UIServer._xdNextHandler(
      Auth.xdResponseWrapper(cb, authResponse, method),
      frame,
      target,
      true);
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

};

RPC.stub('showDialog');
module.exports = UIServer;

});
__d("sdk.ui",["Assert","copyProperties","Log","sdk.Runtime","sdk.UIServer","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Assert = require('Assert');
var copyProperties = require('copyProperties');
var Log = require('Log');
var Runtime = require('sdk.Runtime');
var SDKConfig = requireDynamic('SDKConfig');
var UIServer = require('sdk.UIServer');


function ui(/*object*/ params, /*function?*/ cb) /*object?*/ {/*TC*/__t([params,'object','params'],[cb,'function?','cb']); return __t([function(){/*/TC*/
  Assert.isObject(params);
  Assert.maybeFunction(cb);

  params = copyProperties({}, params);
  if (!params.method) {
    Log.error('"method" is a required parameter for FB.ui().');
    return null;
  }

  
  if ((params.method == 'permissions.request' ||
       params.method == 'permissions.oauth') &&
      (params.display == 'iframe' || params.display == 'dialog')) {
    var perms = 'scope' in params
      ? params.scope
      : Runtime.getScope();
    if (perms) {
      var requested_perms = perms.split(/\s|,/g);
      
      
      for (var i = 0; i < requested_perms.length; i++) {
        var perm = ES5(requested_perms[i],'trim', true);
        
        
        if (perm && !SDKConfig.initSitevars.iframePermissions[perm]) {
          params.display = 'popup';
          
          
          break;
        }
      }
    }
  }

  var call = UIServer.prepareCall(params, cb || function() {});
  if (!call) { 
    return null;
  }

  
  var displayName = call.params.display;
  if (displayName === 'dialog') { 
                                 
    displayName = 'iframe';
  } else if (displayName === 'none') {
    displayName = 'hidden';
  }

  var displayFn = UIServer[displayName];
  if (!displayFn) {
    Log.error('"display" must be one of "popup", ' +
           '"dialog", "iframe", "touch", "async", "hidden", or "none"');
    return null;
  }

  displayFn(call);
  return call.dialog;
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

module.exports = ui;

});
__d("legacy:fb.auth",["sdk.Auth","sdk.Cookie","copyProperties","sdk.Event","FB","Log","sdk.Runtime","sdk.SignedRequest","sdk.ui"],function(global,require,requireDynamic,requireLazy) {

var Auth = require('sdk.Auth');
var Cookie = require('sdk.Cookie');
var copyProperties = require('copyProperties');
var Event = require('sdk.Event');
var FB = require('FB');
var Log = require('Log');
var Runtime = require('sdk.Runtime');
var SignedRequest = require('sdk.SignedRequest');
var ui = require('sdk.ui');

FB.provide('', {

  getLoginStatus: function() /*object?*/ {/*TC*/ return __t([function(){/*/TC*/
    return Auth.getLoginStatus.apply(Auth, arguments);
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/},

  getAuthResponse: function() /*object?*/ {/*TC*/ return __t([function(){/*/TC*/
    return Auth.getAuthResponse();
  /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/},

  getAccessToken: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*/
    return Runtime.getAccessToken() || null;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  getUserID: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*/
    return Runtime.getUserID();
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  login: function(/*function?*/ cb, /*object?*/ opts) {/*TC*/__t([cb,'function?','cb'],[opts,'object?','opts']);/*/TC*/
    if (opts && opts.perms && !opts.scope) {
      opts.scope = opts.perms;
      delete opts.perms;
      Log.warn('OAuth2 specification states that \'perms\' ' +
             'should now be called \'scope\'.  Please update.');
    }
    var canvas = Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) ||
                 Runtime.isEnvironment(Runtime.ENVIRONMENTS.PAGETAB);
    ui(copyProperties({
        method: 'permissions.oauth',
        display: canvas
          ? 'async'
          : 'popup',
        domain: location.hostname
      }, opts || {}),
    cb);
  },


  logout: function(/*function?*/ cb) {/*TC*/__t([cb,'function?','cb']);/*/TC*/
    ui({ method: 'auth.logout', display: 'hidden' }, cb);
  }
});

Auth.subscribe('logout', ES5(Event.fire, 'bind', true,Event, 'auth.logout'));
Auth.subscribe('login', ES5(Event.fire, 'bind', true,Event, 'auth.login'));
Auth.subscribe('authresponse.change', ES5(Event.fire, 'bind', true,Event,
  'auth.authResponseChange'));
Auth.subscribe('status.change', ES5(Event.fire, 'bind', true,Event, 'auth.statusChange'));

Event.subscribe('init:post', function(/*object*/ options) {/*TC*/__t([options,'object','options']);/*/TC*/
  if (options.status) {
    Auth.getLoginStatus();
  }
  if (Runtime.getClientID()) {
    if (options.authResponse) {
      Auth.setAuthResponse(options.authResponse, 'connected');
    } else if (Runtime.getUseCookie()) {
      
      
      var signedRequest = Cookie.loadSignedRequest();
      if (signedRequest) {
        try {
          var parsedSignedRequest = SignedRequest.parse(signedRequest);
          Runtime.setUserID(parsedSignedRequest.user_id || '');
        } catch (e) {
          
          Cookie.clearSignedRequestCookie();
        }
      }
      Cookie.loadMeta();
    }
  }
});

},3);
__d("sdk.Canvas.Flash",["sdk.api","sdk.RPC","Log","sdk.Runtime","createArrayFrom"],function(global,require,requireDynamic,requireLazy,module,exports) {

var api = require('sdk.api');
var RPC = require('sdk.RPC');
var Log = require('Log');
var Runtime = require('sdk.Runtime');
var createArrayFrom = require('createArrayFrom');

var flashClassID = 'CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000';
var devHideFlashCallback = null;


function hideFlashElement(/*DOMElement*/ elem) {/*TC*/__t([elem,'DOMElement','elem']);/*/TC*/
  elem.style.visibility = 'hidden';
}


function showFlashElement(/*DOMElement*/ elem) {/*TC*/__t([elem,'DOMElement','elem']);/*/TC*/
  elem.style.visibility = '';
}


function hideFlashCallback(/*object*/ params) {/*TC*/__t([params,'object','params']);/*/TC*/
  Log.info('hideFlashCallback called with %s', params.state);

  var candidates = window.document.getElementsByTagName('object');
  ES5(createArrayFrom(candidates), 'forEach', true,function(/*DOMElement*/ elem) {/*TC*/__t([elem,'DOMElement','elem']);/*/TC*/
    if (elem.type.toLowerCase() != "application/x-shockwave-flash" &&
        (!elem.classid ||
        elem.classid.toUpperCase() != flashClassID)) {
      return;
    }

    for (var j = 0; j < elem.childNodes.length; j++) {
      var node = elem.childNodes[j];
      if (/param/i.test(node.nodeName) && /wmode/i.test(node.name) &&
          /opaque|transparent/i.test(node.value)) {
        return;
      }
    }

    if (devHideFlashCallback) {
      Log.info('Calling developer specified callback');
      
      
      
      var devArgs = { state : params.state, elem : elem };
      devHideFlashCallback(devArgs);
      setTimeout(function() {
        if (devArgs.state == 'opened') {
          hideFlashElement(elem);
        } else {
          showFlashElement(elem);
        }
      }, 200);
    } else {
      if (params.state == 'opened') {
        elem._old_visibility = elem.style.visibility;
        elem.style.visibility = 'hidden';
      } else if (params.state == 'closed') {
        elem.style.visibility = elem._old_visibility || '';
        delete elem._old_visibility;
      }
    }

    if (Math.random() <= 1 / 1000) {
      api(Runtime.getClientID() + '/occludespopups', 'post', {});
    }
  });
}

RPC.local.hideFlashObjects = function() {
  hideFlashCallback({state: 'opened'});
};
RPC.local.showFlashObjects = function() {
  hideFlashCallback({state: 'closed'});
};

var Flash = {
  
  _setHideFlashCallback: function(/*function?*/ callback) {/*TC*/__t([callback,'function?','callback']);/*/TC*/
    devHideFlashCallback = callback;
  },

  hideFlashElement: hideFlashElement,
  showFlashElement: showFlashElement
};

module.exports = Flash;

});
__d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC","wrapFunction"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOMWrapper = require('DOMWrapper');
var RPC = require('sdk.RPC');
var wrapFunction = require('wrapFunction');

var autoGrowTimer = null;
var autoGrowLastSize;

function getHeight() {
  var document = DOMWrapper.getWindow().document;
  var body = document.body,
      docElement = document.documentElement,
      bodyTop = Math.max(body.offsetTop, 0),
      docTop = Math.max(docElement.offsetTop, 0),
      bodyScroll = body.scrollHeight + bodyTop,
      bodyOffset = body.offsetHeight + bodyTop,
      docScroll = docElement.scrollHeight + docTop,
      docOffset = docElement.offsetHeight + docTop;

  return Math.max(bodyScroll, bodyOffset, docScroll, docOffset);
}

function setSize(/*object?*/ params) /*boolean*/ {/*TC*/__t([params,'object?','params']); return __t([function(){/*/TC*/
  
  if (typeof params != 'object') {
    params = {};
  }
  var minShrink = 0,
      minGrow = 0;
  if (!params.height) {
    params.height = getHeight();
    
    
    
    
    
    minShrink = 16;
    minGrow = 4;
  }

  if (!params.frame) {
    params.frame = window.name || 'iframe_canvas';
  }

  if (autoGrowLastSize) {
    var oldHeight = autoGrowLastSize.height;
    var dHeight = params.height - oldHeight;
    if (dHeight <= minGrow && dHeight >= -minShrink) {
      return false;
    }
  }
  autoGrowLastSize = params;
  RPC.remote.setSize(params);
  return true;
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

function setAutoGrow(on, interval) {
  if (interval === undefined && typeof on === 'number') {
    interval = on;
    on = true;
  }

  if (on || on === undefined) {
    if (autoGrowTimer === null) {
      
      
      autoGrowTimer = setInterval(wrapFunction(function() {
        setSize();
      }, 'entry', 'setAutoGrow:setTimeout'), interval || 100);
    }
    setSize();
  } else {
    if (autoGrowTimer !== null) {
      clearInterval(autoGrowTimer);
      autoGrowTimer = null;
    }
  }
}

RPC.stub('setSize');

var IframeHandling = {
  setSize: setSize,
  setAutoGrow: setAutoGrow
};

module.exports = IframeHandling;

});
__d("sdk.Canvas.Navigation",["sdk.RPC"],function(global,require,requireDynamic,requireLazy,module,exports) {

var RPC = require('sdk.RPC');


function setHash(/*string*/ hash) {/*TC*/__t([hash,'string','hash']);/*/TC*/
  
  hash = hash.replace(/[{}<\[\]>#%"]/, encodeURIComponent);
  RPC.remote.setHash(hash);
}


function getHash(/*function*/ appCallback) {/*TC*/__t([appCallback,'function','appCallback']);/*/TC*/
  RPC.remote.getHash(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
    appCallback(response.result);
  });
}


function setUrlHandler(/*function*/ callback) {/*TC*/__t([callback,'function','callback']);/*/TC*/
  RPC.local.navigate = function(/*string*/ path) {/*TC*/__t([path,'string','path']);/*/TC*/
    callback({ path: path });
  };
  RPC.remote.setNavigationEnabled(true);
}


RPC.stub('setNavigationEnabled');
RPC.stub('getHash');
RPC.stub('setHash');

var Navigation = {
  getHash: getHash,
  setHash: setHash,
  setUrlHandler: setUrlHandler
};

module.exports = Navigation;

});
__d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var RPC = require('sdk.RPC');
var Runtime = require('sdk.Runtime');

function passAppTtiMessage(/*function?*/ callback, /*string*/ messageName) {/*TC*/__t([callback,'function?','callback'],[messageName,'string','messageName']);/*/TC*/
  var params = {
    appId: Runtime.getClientID(),
    time: ES5('Date', 'now', false),
    name: messageName
  };

  var args = [params];
  if (callback) {
    args.push(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
      callback(response.result);
    });
  }

  RPC.remote.logTtiMessage.apply(null, args);
}


function startTimer() {
  passAppTtiMessage(null, 'StartIframeAppTtiTimer');
}

function stopTimer(/*function?*/ callback) {/*TC*/__t([callback,'function?','callback']);/*/TC*/
  passAppTtiMessage(callback, 'StopIframeAppTtiTimer');
}


function setDoneLoading(/*function?*/ callback) {/*TC*/__t([callback,'function?','callback']);/*/TC*/
  passAppTtiMessage(callback, 'RecordIframeAppTti');
}

RPC.stub('logTtiMessage');

var Tti = {
  setDoneLoading: setDoneLoading,
  startTimer: startTimer,
  stopTimer: stopTimer
};

module.exports = Tti;

});
__d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.Flash","sdk.Canvas.IframeHandling","Log","sdk.Canvas.Navigation","sdk.Runtime","sdk.Canvas.Tti"],function(global,require,requireDynamic,requireLazy) {

var Assert = require('Assert');
var Environment = require('sdk.Canvas.Environment');
var Event = require('sdk.Event');
var FB = require('FB');
var Flash = require('sdk.Canvas.Flash');
var IframeHandling = require('sdk.Canvas.IframeHandling');
var Log = require('Log');
var Navigation = require('sdk.Canvas.Navigation');
var Runtime = require('sdk.Runtime');
var Tti = require('sdk.Canvas.Tti');

FB.provide('Canvas', {
  
  setSize: function(params) {
    Assert.maybeObject(params, 'Invalid argument');
    return IframeHandling.setSize.apply(null, arguments);
  },
  setAutoGrow: function() {
    return IframeHandling.setAutoGrow.apply(null, arguments);
  },

  
  getPageInfo: function(callback) {
    Assert.isFunction(callback, 'Invalid argument');
    return Environment.getPageInfo.apply(null, arguments);
  },
  scrollTo: function(x, y) {
    Assert.maybeNumber(x, 'Invalid argument');
    Assert.maybeNumber(y, 'Invalid argument');
    return Environment.scrollTo.apply(null, arguments);
  },

  
  setDoneLoading: function(callback) {
    Assert.maybeFunction(callback, 'Invalid argument');
    return Tti.setDoneLoading.apply(null, arguments);
  },
  startTimer: function() {
    return Tti.startTimer.apply(null, arguments);
  },
  stopTimer: function(callback) {
    Assert.maybeFunction(callback, 'Invalid argument');
    return Tti.stopTimer.apply(null, arguments);
  },

  
  getHash: function(callback) {
    Assert.isFunction(callback, 'Invalid argument');
    return Navigation.getHash.apply(null, arguments);
  },
  setHash: function(hash) {
    Assert.isString(hash, 'Invalid argument');
    return Navigation.setHash.apply(null, arguments);
  },
  setUrlHandler: function(callback) {
    Assert.isFunction(callback, 'Invalid argument');
    return Navigation.setUrlHandler.apply(null, arguments);
  }

});
FB.provide('CanvasInsights', {
  setDoneLoading: function(callback) {
    Log.warn('Deprecated: use FB.Canvas.setDoneLoading');
    Assert.maybeFunction(callback, 'Invalid argument');
    return Tti.setDoneLoading.apply(null, arguments);
  }
});

Event.subscribe('init:post', function(options) {
  if (Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)) {
    Flash._setHideFlashCallback(options.hideFlashCallback);
  }
});

},3);
__d("sdk.Canvas.Prefetcher",["sdk.api","createArrayFrom","sdk.Runtime","CanvasPrefetcherConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var api = require('sdk.api');
var createArrayFrom = require('createArrayFrom');
var CanvasPrefetcherConfig = requireDynamic('CanvasPrefetcherConfig');
var Runtime = require('sdk.Runtime');

var COLLECT = {
  AUTOMATIC : 0,
  MANUAL : 1
};

var sampleRate = CanvasPrefetcherConfig.sampleRate;
var blacklist = CanvasPrefetcherConfig.blacklist;
var collectionMode = COLLECT.AUTOMATIC;
var links = [];

function sample() {
  
  var resourceFieldsByTag = {
    object: 'data',
    link: 'href',
    script: 'src'
  };

  if (collectionMode == COLLECT.AUTOMATIC) {
    ES5(ES5('Object', 'keys', false,resourceFieldsByTag), 'forEach', true,function(/*string*/ tagName) {/*TC*/__t([tagName,'string','tagName']);/*/TC*/
      var propertyName = resourceFieldsByTag[tagName];
      ES5(createArrayFrom(document.getElementsByTagName(tagName)), 'forEach', true,function(/*DOMElement*/ tag) {/*TC*/__t([tag,'DOMElement','tag']);/*/TC*/
          if (tag[propertyName]) {
            links.push(tag[propertyName]);
          }
        });
    });
  }

  if (links.length === 0) {
    return;
  }

  
  api(Runtime.getClientID() + '/staticresources', 'post', {
    urls: ES5('JSON', 'stringify', false,links),
    is_https: location.protocol === 'https:'
  });

  links = [];
}

function maybeSample() {
  if (!Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) ||
      !Runtime.getClientID() ||
      !sampleRate) {
    return;
  }

  if (Math.random() > 1 / sampleRate ||
      blacklist == '*' || ~ES5(blacklist, 'indexOf', true,Runtime.getClientID())) {
    return;
  }

  
  setTimeout(sample, 30000);
}


function setCollectionMode(/*number*/ mode) {/*TC*/__t([mode,'number','mode']);/*/TC*/
  collectionMode = mode;
}


function addStaticResource(/*string*/ url) {/*TC*/__t([url,'string','url']);/*/TC*/
  links.push(url);
}

var CanvasPrefetcher = {
  COLLECT_AUTOMATIC : COLLECT.AUTOMATIC,
  COLLECT_MANUAL : COLLECT.MANUAL,

  addStaticResource: addStaticResource,
  setCollectionMode: setCollectionMode,

  
  _maybeSample: maybeSample
};

module.exports = CanvasPrefetcher;

});
__d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var CanvasPrefetcher = require('sdk.Canvas.Prefetcher');
var Event = require('sdk.Event');
var Runtime = require('sdk.Runtime');

FB.provide('Canvas.Prefetcher', CanvasPrefetcher);

Event.subscribe('init:post', function(options) {
  if (Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)) {
    CanvasPrefetcher._maybeSample();
  }
});

},3);
__d("legacy:fb.compat.ui",["copyProperties","FB","Log","sdk.ui","sdk.UIServer"],function(global,require,requireDynamic,requireLazy) {

var copyProperties = require('copyProperties');
var FB = require('FB');
var Log = require('Log');
var ui = require('sdk.ui');
var UIServer = require('sdk.UIServer');

FB.provide('', {
  share: function(u) {
    Log.error('share() has been deprecated. Please use FB.ui() instead.');
    ui({
      display : 'popup',
      method  : 'stream.share',
      u       : u
    });
  },

  publish: function(post, cb) {
    Log.error('publish() has been deprecated. Please use FB.ui() instead.');
    post = post || {};
    ui(copyProperties({
      display : 'popup',
      method  : 'stream.publish',
      preview : 1
    }, post || {}), cb);
  },

  addFriend: function(id, cb) {
    Log.error('addFriend() has been deprecated. Please use FB.ui() instead.');
    ui({
      display : 'popup',
      id      : id,
      method  : 'friend.add'
    }, cb);
  }
});


UIServer.Methods['auth.login'] = UIServer.Methods['permissions.request'];

},3);
__d("mergeArrays",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function mergeArrays(/*array*/ target, /*array*/ source) /*array*/ {/*TC*/__t([target,'array','target'],[source,'array','source']); return __t([function(){/*/TC*/
  for (var i=0; i < source.length; i++) {
    if (ES5(target, 'indexOf', true,source[i]) < 0) {
      target.push(source[i]);
    }
  }
  return target;
/*TC*/}.apply(this, arguments), 'array']);/*/TC*/}
module.exports = mergeArrays;

});
__d("format",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function format(/*string*/ str, argsdotdot) /*string*/ {
  argsdotdot = Array.prototype.slice.call(arguments, 1);
  return str.replace(/\{(\d+)\}/g, function(_, index) {
    var value = argsdotdot[Number(index)];
    return (value === null || value === undefined)
     ? ''
     : value.toString();
  });
}
module.exports = format;

});
__d("safeEval",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function safeEval(source) {
  if (source === null || typeof source === 'undefined') {
    return;
  }
  if (typeof source !== 'string') {
    return source;
  }

  return Function('return eval("' + source.replace(/"/g, '\\"') + '");')();
}

module.exports = safeEval;

});
__d("sdk.Waitable",["copyProperties","sdk.Model"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var Model = require('sdk.Model');


var Waitable = Model.extend({
  
  constructor: function() {
    this.parent({Value: undefined});
  },

  
  error: function(ex) {
    this.inform("error", ex);
  },

  
  wait: function(/*function?*/ callback, /*function?*/ errorHandler) {/*TC*/__t([callback,'function?','callback'],[errorHandler,'function?','errorHandler']);/*/TC*/
    
    if (errorHandler) {
      this.subscribe('error', errorHandler);
    }

    this.monitor('Value.change', ES5(function() /*boolean?*/ {/*TC*/ return __t([function(){/*/TC*/
      var value = this.getValue();
      if (value !== undefined) {
        
        this.value = value;
        callback(value);
        return true;
      }
    /*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/}, 'bind', true,this));
  }
});

module.exports = Waitable;

});
__d("sdk.Query",["format","safeEval","Type","sdk.Waitable"],function(global,require,requireDynamic,requireLazy,module,exports) {

var format = require('format');
var safeEval = require('safeEval');
var Type = require('Type');
var Waitable = require('sdk.Waitable');





function toFields(/*string*/ s) /*array<string>*/ {/*TC*/__t([s,'string','s']);/*/TC*/
  return ES5(s.split(','), 'map', true,function(s) {return ES5(s,'trim', true);});
}


function parseWhere(/*string*/ s) /*object*/ {/*TC*/__t([s,'string','s']); return __t([function(){/*/TC*/
  
  
  var
    re = (/^\s*(\w+)\s*=\s*(.*)\s*$/i).exec(s),
    result,
    value,
    type = 'unknown';
  if (re) {
    
    value = re[2];
    
    
    if (/^(["'])(?:\\?.)*?\1$/.test(value)) {
      
      
      value = safeEval(value);
      type = 'index';
    } else if (/^\d+\.?\d*$/.test(value)) {
      type = 'index';
    }
  }

  if (type == 'index') {
    
    result = { type: 'index', key: re[1], value: value };
  } else {
    
    result = { type: 'unknown', value: s };
  }
  return result;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}

function encode(value) /*string*/ {/*TC*/ return __t([function(){/*/TC*/
  return typeof value === 'string'
    ? ES5('JSON', 'stringify', false,value)
    : value;
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

var counter = 1;

var Query = Waitable.extend({
  constructor: function() {
    this.parent();
    this.name = 'v_' + counter++;
  },
  
  hasDependency: function(/*boolean?*/ value) /*boolean*/ {/*TC*/__t([value,'boolean?','value']); return __t([function(){/*/TC*/
    if (arguments.length) {
      this._hasDependency = value;
    }
    return !!this._hasDependency;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  parse: function(/*array*/ args) /*object*/ {/*TC*/__t([args,'array','args']); return __t([function(){/*/TC*/
    var
      fql = format.apply(null, args),
      re = (/^select (.*?) from (\w+)\s+where (.*)$/i).exec(fql); 
    this.fields = toFields(re[1]);
    this.table = re[2];
    this.where = parseWhere(re[3]);

    for (var i=1; i < args.length; i++) {
      if (Type.instanceOf(Query, args[i])) {
        
        
        args[i].hasDependency(true);
      }
    }

    return this;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  toFql: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    var s = 'select ' + this.fields.join(',') + ' from ' +
            this.table + ' where ';
    switch (this.where.type) {
      case 'unknown':
        s += this.where.value;
        break;
      case 'index':
        s += this.where.key + '=' + encode(this.where.value);
        break;
      case 'in':
        if (this.where.value.length == 1) {
          s += this.where.key + '=' +  encode(this.where.value[0]);
        } else {
          s += this.where.key + ' in (' +
            ES5(this.where.value, 'map', true,encode).join(',') + ')';
        }
        break;
    }
    return s;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},


  
  toString: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return '#' + this.name;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
});

module.exports = Query;

});
__d("sdk.Data",["sdk.api","sdk.ErrorHandling","mergeArrays","sdk.Query","safeEval","Type","sdk.Waitable"],function(global,require,requireDynamic,requireLazy,module,exports) {

var api = require('sdk.api');
var ErrorHandling = require('sdk.ErrorHandling');
var mergeArrays = require('mergeArrays');
var Query = require('sdk.Query');
var safeEval = require('safeEval');
var Type = require('Type');
var Waitable = require('sdk.Waitable');



var Data = {
  
  query: function(/*string*/ template, data) /*object*/ {/*TC*/__t([template,'string','template']); return __t([function(){/*/TC*/
    var query = new Query().parse(Array.prototype.slice.call(arguments));
    Data.queue.push(query);
    Data._waitToProcess();
    return query;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  waitOn: function(/*array*/ dependencies, /*function*/ callback) /*object*/ {/*TC*/__t([dependencies,'array','dependencies'],[callback,'function','callback']); return __t([function(){/*/TC*/
    var
      result = new Waitable(),
      count = dependencies.length;

    
    
    if (typeof(callback) == 'string') {
      var s = callback;
      callback = ErrorHandling.unguard(function() { return safeEval(s); });
    }

    ES5(dependencies, 'forEach', true,function(/*object*/ item) {/*TC*/__t([item,'object','item']);/*/TC*/
      item.monitor('Value.change', function() {
        var done = false;
        if (Data._getValue(item) !== undefined) {
          
          item.value = item.getValue();
          count--;
          done = true;
        }
        if (count === 0) {
          var value = callback(ES5(dependencies, 'map', true,Data._getValue));
          result.setValue(value !== undefined ? value : true);
        }
        return done;
      });
    });
    return result;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  process: function(/*string?*/ token) {/*TC*/__t([token,'string?','token']);/*/TC*/
    Data._process(token);
  },

  
  _getValue: function(item) {
    return item instanceof Waitable
      ? item.getValue()
      : item;
  },

  
  _selectByIndex: function(/*array*/ fields, /*string*/ table, /*string*/ name,
      /*string*/ value) /*object*/ {/*TC*/__t([fields,'array','fields'],[table,'string','table'],[name,'string','name'],[value,'string','value']); return __t([function(){/*/TC*/
    var query = new Query();
    query.fields = fields;
    query.table = table;
    query.where = { type: 'index', key: name, value: value };
    Data.queue.push(query);
    Data._waitToProcess();
    return query;
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _waitToProcess: function() {
    if (Data.timer < 0) {
      Data.timer = setTimeout(function() {
        Data._process();
      }, 10);
    }
  },

  
  _process: function(/*string?*/ token) {/*TC*/__t([token,'string?','token']);/*/TC*/
    Data.timer = -1;

    var
      mqueries = {},
      q = Data.queue;

    if (!q.length) {
      return;
    }

    Data.queue = [];

    for (var i=0; i < q.length; i++) {
      var item = q[i];
      if (item.where.type == 'index' && !item.hasDependency()) {
        Data._mergeIndexQuery(item, mqueries);
      } else {
        mqueries[item.name] = item;
      }
    }

    
    var params = { q : {} };
    for (var key in mqueries) {
      if (mqueries.hasOwnProperty(key)) {
        params.q[key] = mqueries[key].toFql();
      }
    }

    if (token) {
      params.access_token = token;
    }

    api('/fql', 'GET', params, function(/*object*/ result) {/*TC*/__t([result,'object','result']);/*/TC*/
      if (result.error) {
        ES5(ES5('Object', 'keys', false,mqueries), 'forEach', true,function(/*string*/ key) {/*TC*/__t([key,'string','key']);/*/TC*/
          mqueries[key].error(new Error(result.error.message));
        });
      } else {
        ES5(result.data, 'forEach', true,function(/*object*/ o) {/*TC*/__t([o,'object','o']);/*/TC*/
          mqueries[o.name].setValue(o.fql_result_set);
        });
      }
    });
  },

  
  _mergeIndexQuery: function(/*object*/ item, /*array<object>*/ mqueries) {/*TC*/__t([item,'object','item']);/*/TC*/
    var key = item.where.key,
    value = item.where.value;

    var name = 'index_' +  item.table + '_' + key;
    var master = mqueries[name];
    if (!master) {
      master = mqueries[name] = new Query();
      master.fields = [key];
      master.table = item.table;
      master.where = {type: 'in', key: key, value: []};
    }

    
    mergeArrays(master.fields, item.fields);
    mergeArrays(master.where.value, [value]);

    
    master.wait(function(/*array<object>*/ r) {
      item.setValue(ES5(r, 'filter', true,function(/*object*/ x) {/*TC*/__t([x,'object','x']);/*/TC*/
        return x[key] == value;
      }));
    });
  },

  timer: -1,
  queue: []
};

module.exports = Data;

});
__d("legacy:fb.data",["FB","sdk.Data"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var Data = require('sdk.Data');
FB.provide('Data', Data);

},3);
__d("legacy:fb.event",["FB","sdk.Event"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var Event = require('sdk.Event');

FB.provide('Event', Event);
FB.provide('EventProvider', Event);

},3);
__d("legacy:fb.frictionless",["FB","sdk.Frictionless"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var Frictionless = require('sdk.Frictionless');
FB.provide('Frictionless', Frictionless);

},3);
__d("sdk.init",["sdk.Cookie","copyProperties","createArrayFrom","sdk.ErrorHandling","sdk.Event","Log","QueryString","sdk.Runtime","wrapFunction"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Cookie = require('sdk.Cookie');
var copyProperties = require('copyProperties');
var createArrayFrom = require('createArrayFrom');
var ErrorHandling = require('sdk.ErrorHandling');
var Event = require('sdk.Event');
var Log = require('Log');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var wrapFunction = require('wrapFunction');


function init(options) {
  if (Runtime.getInitialized()) {
    Log.warn(
      'FB.init has already been called - this could indicate a problem');
  }

  
  if (/number|string/.test(typeof options)) {
    Log.warn('FB.init called with invalid parameters');
    options = {apiKey: options};
  }

  options = copyProperties({
    logging: true,
    status: true
  }, options || {});

  var appId = options.appId || options.apiKey;
  if (/number|string/.test(typeof appId)) {
    Runtime.setClientID(appId.toString());
  }

  if ('scope' in options) {
    Runtime.setScope(options.scope);
  }

  if (options.cookie) {
    Runtime.setUseCookie(true);
    if (typeof options.cookie === 'string') {
      Cookie.setDomain(options.cookie);
    }
  }

  Runtime.setInitialized(true);
  Event.fire('init:post', options);
}




setTimeout(wrapFunction(function() {
  
  
  var pattern = /(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;
  ES5(createArrayFrom(document.getElementsByTagName('script')), 'forEach', true,function(script) {
    if (script.src) {
      var match = pattern.exec(script.src);
      if (match) {
        var opts = QueryString.decode(match[2]);
        for (var key in opts) {
          if (opts.hasOwnProperty(key)) {
            var val = opts[key];
            if (val == '0') {
              opts[key] = 0;
            }
          }
        }

        init(opts);
      }
    }
  });

  
  if (window.fbAsyncInit && !window.fbAsyncInit.hasRun) {
    window.fbAsyncInit.hasRun = true;
    ErrorHandling.unguard(window.fbAsyncInit)();
  }
}, 'entry', 'init:helper'), 0);

module.exports = init;

});
__d("legacy:fb.init",["FB","sdk.init"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var init = require('sdk.init');

FB.provide('', {
  init: init
});

},3);
__d("legacy:fb.json",["FB","ManagedError"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var ManagedError = require('ManagedError');




FB.provide('JSON', {
  stringify: function(obj) {
    try {
      return ES5('JSON', 'stringify', false,obj);
    } catch(e) {
      throw new ManagedError(e.message, e);
    }
  },
  parse: function(str) {
    try {
      return ES5('JSON', 'parse', false,str);
    } catch(e) {
      throw new ManagedError(e.message, e);
    }
  }
});

},3);
__d("legacy:fb.pay",["copyProperties","FB","sdk.Runtime","sdk.UIServer","sdk.XD"],function(global,require,requireDynamic,requireLazy) {

var copyProperties = require('copyProperties');
var FB = require('FB');
var Runtime = require('sdk.Runtime');
var UIServer = require('sdk.UIServer');
var XD = require('sdk.XD');

var DEF_ERROR_MSG = {
  'error_code': 1383001,
  'error_message': 'An unknown error caused the dialog to be closed'
};

var callbackWrapper = function(/*function*/ callback) /*function*/ {/*TC*/__t([callback,'function','callback']); return __t([function(){/*/TC*/
  return function(/*object?*/ msg) {/*TC*/__t([msg,'object?','msg']);/*/TC*/
    callback(msg && msg.response
      ? ES5('JSON', 'parse', false,msg.response)
      : DEF_ERROR_MSG
    );
  };
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/};


copyProperties(UIServer.Methods, {
  'pay.prompt': {
    transform : function(/*object*/ call) {/*TC*/__t([call,'object','call']);/*/TC*/
      var handler = XD.handler(
        callbackWrapper(call.cb),
        'parent.frames[' + (window.name || 'iframe_canvas') + ']');

      call.params.channel = handler;

      XD.inform('Pay.Prompt', call.params);
    }
  },
  'pay': {
    size      : { width: 555, height: 120 },
    connectDisplay : 'popup',
    transform : function(/*object*/ call) /*object?*/ {/*TC*/__t([call,'object','call']); return __t([function(){/*/TC*/
      call.cb = callbackWrapper(call.cb);
      if (!Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)) {
        
        call.params.order_info = ES5('JSON', 'stringify', false,call.params.order_info);
        return call;
      }
      var handler = XD.handler(
        call.cb,
        'parent.frames[' + (window.name || 'iframe_canvas') + ']');

      call.params.channel = handler;
      call.params.uiserver = true;

      XD.inform('Pay.Prompt', call.params);
    /*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}
  }
});


},3);
__d("legacy:fb.ua",["FB","UserAgent"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var UserAgent = require('UserAgent');
FB.provide('UA', {
  nativeApp: UserAgent.nativeApp
});

},3);
__d("legacy:fb.ui",["FB","sdk.ui"],function(global,require,requireDynamic,requireLazy) {

var FB = require('FB');
var ui = require('sdk.ui');

FB.provide('', {
  ui: ui
});


},3);
__d("Miny",[],function(global,require,requireDynamic,requireLazy,module,exports) {

var MAGIC = 'Miny1';


var _indexMap = {encode: [], decode: {}};
var LO = 'wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');
function getIndexMap(length) {
  for (var i = _indexMap.encode.length; i < length; i++) {
    
    var s = i.toString(32).split('');
    s[s.length - 1] = LO[parseInt(s[s.length - 1], 32)];
    s = s.join('');

    _indexMap.encode[i] = s;
    _indexMap.decode[s] = i;
  }

  return _indexMap;
}


function encode(s) {
  
  var parts = s.match(/\w+|\W+/g);

  
  
  var dict = {};
  for (var i = 0; i < parts.length; i++) {
    dict[parts[i]] = (dict[parts[i]] || 0) + 1;
  }

  
  
  var byCount = ES5('Object', 'keys', false,dict);
  byCount.sort(function(a,b) {
    return dict[a] < dict[b] ? 1 : (dict[b] < dict[a] ? -1 : 0);
  });

  
  var encodeMap = getIndexMap(byCount.length).encode;
  for (i = 0; i < byCount.length; i++) {
    dict[byCount[i]] = encodeMap[i];
  }

  
  var codes = [];
  for (i = 0; i < parts.length; i++) {
    codes[i] = dict[parts[i]];
  }

  
  for (i = 0; i < byCount.length; i++) {
    byCount[i] = byCount[i].replace(/'~'/g, '\\~');
  }

  return [MAGIC, byCount.length].
         concat(byCount).
         concat(codes.join('')).
         join('~');
}


function decode(s) {
  var fields = s.split('~');

  if (fields.shift() != MAGIC) {
    throw new Error('Not a Miny stream');
  }
  var nKeys = parseInt(fields.shift(), 10);
  var codes = fields.pop();
  codes = codes.match(/[0-9a-v]*[\-w-zA-Z_]/g);

  
  var dict = fields;

  var decodeMap = getIndexMap(nKeys).decode;
  var parts = [];
  for (var i = 0; i < codes.length; i++) {
    parts[i] = dict[decodeMap[codes[i]]];
  }

  return parts.join('');
}

var Miny = {
  encode: encode,
  decode: decode
};

module.exports = Miny;

});
__d("runOnce",[],function(global,require,requireDynamic,requireLazy,module,exports) {

function runOnce(func) {
  var run, ret;
  return function() {
    if (!run) {
      run = true;
      ret = func();
    }
    return ret;
  };
}

module.exports = runOnce;

});
__d("XFBML",["Assert","copyProperties","createArrayFrom","dotAccess","FB","sdk.Impressions","Log","ObservableMixin","runOnce","wrapFunction","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Assert = require('Assert');
var copyProperties = require('copyProperties');
var createArrayFrom = require('createArrayFrom');
var dotAccess = require('dotAccess');
var FB = require('FB');
var Impressions = require('sdk.Impressions');
var Log = require('Log');
var ObservableMixin = require('ObservableMixin');
var runOnce = require('runOnce');
var SDKConfig = requireDynamic('SDKConfig');
var wrapFunction = require('wrapFunction');


var xfbml = {}; 
var html5 = {}; 

var parseCount = 0;

var XFBML = new ObservableMixin();

function propStr(object, /*string*/ property) /*string*/ {/*TC*/__t([property,'string','property']); return __t([function(){/*/TC*/
  return object[property] + '';
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

function nodeNameIE(/*DOMElement*/ element) /*string*/ {/*TC*/__t([element,'DOMElement','element']); return __t([function(){/*/TC*/
  
  
  return element.scopeName
    ? (element.scopeName + ':' + element.nodeName)
    : '';
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

function xfbmlInfo(/*DOMElement*/ element) /*object?*/ {/*TC*/__t([element,'DOMElement','element']); return __t([function(){/*/TC*/
  return xfbml[propStr(element, 'nodeName').toLowerCase()]
    || xfbml[nodeNameIE(element).toLowerCase()];
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

function html5Info(/*DOMElement*/ element) /*object?*/ {/*TC*/__t([element,'DOMElement','element']); return __t([function(){/*/TC*/
  var classNames = ES5(ES5(propStr(element, 'className'),'trim', true).split(/\s+/), 'filter', true,
    function(className) { return html5.hasOwnProperty(className); });

  if (classNames.length === 0) {
    return undefined;
  }

  
  
  
  
  
  
  if (!element.childNodes ||
      element.childNodes.length === 0 ||
      (element.childNodes.length == 1 &&
       element.childNodes[0].nodeType == 3 ) ||
      element.getAttribute('fb-xfbml-state')) {
    return html5[classNames[0]];
  }
/*TC*/}.apply(this, arguments), 'object?']);/*/TC*/}

function attr(/*DOMElement*/ element) /*object*/ {/*TC*/__t([element,'DOMElement','element']); return __t([function(){/*/TC*/
  var attrs = {};
  ES5(createArrayFrom(element.attributes), 'forEach', true,function(at) {
    attrs[propStr(at, 'name')] = propStr(at, 'value');
  });
  return attrs;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}

function parse(/*DOMElement*/ dom, /*function*/ callback, /*boolean*/ reparse) {/*TC*/__t([dom,'DOMElement','dom'],[callback,'function','callback'],[reparse,'boolean','reparse']);/*/TC*/
  Assert.isTrue(
    dom && dom.nodeType && dom.nodeType === 1 && !!dom.getElementsByTagName,
    'Invalid DOM node passed to FB.XFBML.parse()');
  Assert.isFunction(callback, 'Invalid callback passed to FB.XFBML.parse()');

  var pc = ++parseCount;
  Log.info('XFBML Parsing Start %s', pc);

  
  
  
  
  var count = 1;
  var tags = 0;
  var onrender = function() {
    count--;
    if (count === 0) {
      Log.info('XFBML Parsing Finish %s, %s tags found', pc, tags);
      callback();
      XFBML.inform('render', pc, tags);
    }
    Assert.isTrue(count >= 0, 'onrender() has been called too many times');
  };

  ES5(createArrayFrom(dom.getElementsByTagName('*')), 'forEach', true,function(element) {
    if (!reparse && element.getAttribute('fb-xfbml-state')) {
      
      return;
    }
    if (element.nodeType !== 1) {
      
      return;
    }

    var info = xfbmlInfo(element) || html5Info(element);
    if (!info) {
      return; 
    }

    count++;
    tags++;
    var renderer =
      new info.ctor(element, info.xmlns, info.localName, attr(element));
    
    
    
    renderer.subscribe('render', runOnce(function() {
      
      
      
      
      element.setAttribute('fb-xfbml-state', 'rendered');
      onrender();
    }));

    var render = function() {
      
      
      if (element.getAttribute('fb-xfbml-state') == 'parsed') {
        
        
        XFBML.subscribe('render.queue', render);
      } else {
        element.setAttribute('fb-xfbml-state', 'parsed');
        renderer.process(); 
      }
    };

    render();
  });

  XFBML.inform('parse', pc, tags);

  var timeout = 30000; 
  window.setTimeout(function() {
    if (count > 0) {
      Log.warn('%s tags failed to render in %s ms', count, timeout);
    }
  }, timeout);

  onrender(); 
}

XFBML.subscribe('render', function() {
  var q = XFBML.getSubscribers('render.queue');
  XFBML.clearSubscribers('render.queue');
  ES5(q, 'forEach', true,function(r) { r(); });
  
  
});

copyProperties(XFBML, {

  registerTag: function(/*object*/ info) {/*TC*/__t([info,'object','info']);/*/TC*/
    var fqn = info.xmlns + ':' + info.localName;
    Assert.isUndefined(xfbml[fqn], fqn + ' already registered');

    xfbml[fqn] = info;

    
    
    html5[info.xmlns + '-' + info.localName] = info;
  },

  parse: function(/*DOMElement?*/ dom, /*function?*/ cb) {/*TC*/__t([dom,'DOMElement?','dom'],[cb,'function?','cb']);/*/TC*/
    parse(dom || document.body, cb || function(){},  true);
  },

  parseNew: function() {
    parse(document.body, function(){},  false);
  }
});

var logTagCount = function(/*number*/ parseCount, /*number*/ numTags) {/*TC*/__t([parseCount,'number','parseCount'],[numTags,'number','numTags']);/*/TC*/
  if (Math.random() < SDKConfig.tagCountLogRate) {
    
    
    setTimeout(
      wrapFunction(
        ES5(Impressions.log, 'bind', true,null, 102, {tag_count: numTags}),
        'entry',
        'xfbml-insights-log'),
      5000
    );
  }
  XFBML.unsubscribe('parse', logTagCount);
};
XFBML.subscribe('parse', logTagCount);

module.exports = XFBML;

});
__d("PluginPipe",["sdk.Content","copyProperties","guid","insertIframe","Miny","ObservableMixin","QueryString","sdk.Runtime","UrlMap","UserAgent","XFBML","PluginPipeConfig","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {
var Content = require('sdk.Content');
var copyProperties = require('copyProperties');
var guid = require('guid');
var insertIframe = require('insertIframe');
var Miny = require('Miny');
var ObservableMixin = require('ObservableMixin');
var PluginPipeConfig = requireDynamic('PluginPipeConfig');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var SDKConfig = requireDynamic('SDKConfig');
var UrlMap = require('UrlMap');
var UserAgent = require('UserAgent');
var XFBML = require('XFBML');

var PluginPipe = new ObservableMixin();

var threshold = PluginPipeConfig.threshold;
var queued = [];

function isEnabled() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
  return !!(SDKConfig.usePluginPipe &&
         (UserAgent.chrome() || UserAgent.firefox()) &&
         PluginPipeConfig.enabledApps[Runtime.getClientID()]);
/*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}

function insertPlugins() {
  var q = queued;
  queued = [];

  if (q.length <= threshold) {
    ES5(q, 'forEach', true,function(/*object*/ plugin) {/*TC*/__t([plugin,'object','plugin']);/*/TC*/
      insertIframe(plugin.config);
    });
    return;
  }

  var count = q.length + 1;
  function onrender() {
    count--;
    if (count === 0) {
      insertPipe(q);
    }
  }

  ES5(q, 'forEach', true,function(/*object*/ plugin) {/*TC*/__t([plugin,'object','plugin']);/*/TC*/
    var config = {};
    for (var key in plugin.config) {
      config[key] = plugin.config[key];
    }
    config.url =
      UrlMap.resolve('www') + '/plugins/plugin_pipe_shell.php';
    config.onload = onrender;
    insertIframe(config);
  });

  onrender();
}

XFBML.subscribe('parse', insertPlugins);

function insertPipe(/*array<object>*/ plugins) {
  var root = document.createElement('span');
  Content.appendHidden(root);

  var params = {};
  ES5(plugins, 'forEach', true,function(/*object*/ plugin){/*TC*/__t([plugin,'object','plugin']);/*/TC*/
    params[plugin.config.name] = {
      plugin: plugin.tag,
      params: plugin.params
    };
  });

  var raw = ES5('JSON', 'stringify', false,params);
  var miny = Miny.encode(raw);

  var qs = QueryString.encode({
    plugins: miny.length < raw.length ? miny : raw
  });

  ES5(plugins, 'forEach', true,function(/*object*/ plugin) {/*TC*/__t([plugin,'object','plugin']);/*/TC*/
    var frame = document.getElementsByName(plugin.config.name)[0];
    frame.onload = plugin.config.onload;
  });


  insertIframe({
    url: UrlMap.resolve('www') + '/plugins/pipe/?' + qs,
    root: root,
    name: guid(),
    className: 'fb_hidden fb_invisible'
  });
}

copyProperties(PluginPipe, {
  add: function(/*object*/ plugin) /*boolean*/ {/*TC*/__t([plugin,'object','plugin']); return __t([function(){/*/TC*/
    var enabled = isEnabled();
    enabled && queued.push({
      config: plugin._config,
      tag: plugin._tag,
      params: plugin._params
    });
    return enabled;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}
});

module.exports = PluginPipe;

});
__d("IframePlugin",["sdk.Auth","sdk.DOM","sdk.Event","ObservableMixin","PluginPipe","QueryString","sdk.Runtime","Type","UrlMap","sdk.XD","guid","insertIframe","resolveURI"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Auth = require('sdk.Auth');
var DOM = require('sdk.DOM');
var Event = require('sdk.Event');
var ObservableMixin = require('ObservableMixin');
var PluginPipe = require('PluginPipe');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var Type = require('Type');
var UrlMap = require('UrlMap');
var XD = require('sdk.XD');
var guid = require('guid');
var insertIframe = require('insertIframe');
var resolveURI = require('resolveURI');

var baseParams = {
  skin: 'string',
  font: 'string',
  width: 'px',
  height: 'px',
  ref: 'string',
  color_scheme: 'string' 
};

function resizer(/*DOMElement*/ root, /*string*/ tagName) /*function*/ {/*TC*/__t([root,'DOMElement','root'],[tagName,'string','tagName']); return __t([function(){/*/TC*/
  return function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    
    var element = root.getElementsByTagName(tagName)[0];
    message.width && (element.style.width = message.width + 'px');
    message.height && (element.style.height = message.height + 'px');

    
    var span = root.getElementsByTagName('span')[0];
    var iframe = root.getElementsByTagName('iframe')[0];
    var identical = iframe.style.height === span.style.height &&
      iframe.style.width === span.style.width;
    var method = identical ? 'removeCss' : 'addCss';
    DOM[method](iframe, 'fb_iframe_widget_lift');
  };
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

function resizeBubbler(/*string?*/ pluginID) /*function*/ {/*TC*/__t([pluginID,'string?','pluginID']); return __t([function(){/*/TC*/
  return function(/*object*/ msg) {/*TC*/__t([msg,'object','msg']);/*/TC*/
    var message = { width: msg.width, height: msg.height, pluginID: pluginID };
    Event.fire('xfbml.resize', message);
  }
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

var types = {
  
  string: function(/*string?*/ value) /*string?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return value;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},
  bool: function(/*string?*/ value) /*boolean?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return value ? (/^(?:true|1|yes|on)$/i).test(value) : undefined;
  /*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/},
  url: function(/*string?*/ value) /*string?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return resolveURI(value);
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},
  url_maybe: function(/*string?*/ value) /*string?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return value ? resolveURI(value) : value;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},
  hostname: function(/*string?*/ value) /*string?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return value || window.location.hostname;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},
  px: function(/*string?*/ value) /*number?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return (/^(\d+)(?:px)?$/).test(value) ? parseInt(RegExp.$1, 10) : undefined;
  /*TC*/}.apply(this, arguments), 'number?']);/*/TC*/},
  text: function(/*string?*/ value) /*string?*/ {/*TC*/__t([value,'string?','value']); return __t([function(){/*/TC*/
    return value;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/}
};

function getVal(/*object*/ attr, /*string*/ key) {/*TC*/__t([attr,'object','attr'],[key,'string','key']);/*/TC*/
  var val =
    attr[key] ||
    attr[key.replace(/_/g, '-')] ||
    attr[key.replace(/_/g, '')] ||
    attr['data-' + key] ||
    attr['data-' + key.replace(/_/g, '-')] ||
    attr['data-' + key.replace(/_/g, '')] ||
    undefined;
  return val;
}

function validate(/*object*/ defn, /*DOMElement*/ elem, /*object*/ attr,
    /*object*/ params) {/*TC*/__t([defn,'object','defn'],[elem,'DOMElement','elem'],[attr,'object','attr'],[params,'object','params']);/*/TC*/
  ES5(ES5('Object', 'keys', false,defn), 'forEach', true,function(key) {
    if (defn[key] == 'text' && !attr[key]) {
      attr[key] = elem.textContent || elem.innerText || ''; 
      elem.setAttribute(key, attr[key]); 
    }
    params[key] = types[defn[key]](getVal(attr, key));
  });
}

var IframePlugin = Type.extend({
  constructor: function(/*DOMElement*/ elem, /*string*/ ns, /*string*/ tag,
      /*object*/ attr) {/*TC*/__t([elem,'DOMElement','elem'],[ns,'string','ns'],[tag,'string','tag'],[attr,'object','attr']);/*/TC*/
    this.parent();
    tag = tag.replace(/-/g, '_');

    var pluginId = getVal(attr, 'plugin_id');
    this.subscribe('xd.resize', resizer(elem, 'span'));
    this.subscribe('xd.resize', resizer(elem, 'iframe'));
    this.subscribe('xd.resize', resizeBubbler(pluginId));
    this.subscribe('xd.resize.flow', resizer(elem, 'span'));
    this.subscribe('xd.resize.flow', resizeBubbler(pluginId));
    this.subscribe('xd.resize.iframe', resizer(elem, 'iframe'));

    var secure = Runtime.getSecure() || window.location.protocol == 'https:';
    
    var url = UrlMap.resolve('www', secure) + '/plugins/' + tag + '.php?';
    var params = {};
    validate(this.getParams(), elem, attr, params);
    validate(baseParams, elem, attr, params);
    params.app_id = Runtime.getClientID();
    params.locale = Runtime.getLocale();
    params.sdk = 'joey';
    var xd = ES5(function(msg) { this.inform('xd.' + msg.type, msg); }, 'bind', true,this);
    params.channel = XD.handler(xd, 'parent.parent', /*forever=*/ true);

    DOM.addCss(elem, 'fb_iframe_widget');

    var name = guid();
    this.subscribe('xd.verify', function(/*object*/ msg) {/*TC*/__t([msg,'object','msg']);/*/TC*/
      XD.sendToFacebook(
        name, { method: 'xd/verify', params: ES5('JSON', 'stringify', false,msg.token) });
    });

    this.subscribe(
      'xd.refreshLoginStatus', ES5(Auth.getLoginStatus, 'bind', true,
        Auth, ES5(this.inform, 'bind', true,this, 'login.status'), /*force*/true));

    var flow = document.createElement('span');
    flow.style.width = '0px';
    flow.style.height = '0px';

    this._element = elem;
    this._tag = tag;
    this._params = params;
    this._config = {
      root: flow,
      url: url + QueryString.encode(params),
      name: name,
      
      
      
      
      width: params.width || 1000,
      height: params.height || 1000,
      onload: ES5(this.inform, 'bind', true,this, 'render')
    };
  },

  process: function() {
    this._element.innerHTML = '';
    this._element.appendChild(this._config.root);
    if (!PluginPipe.add(this)) {
      insertIframe(this._config);
    }
  }

}, ObservableMixin);

IframePlugin.getVal = getVal;

IframePlugin.withParams = function(/*object*/ params) /*function*/ {/*TC*/__t([params,'object','params']); return __t([function(){/*/TC*/
  return IframePlugin.extend({ getParams: function() { return params; } });
/*TC*/}.apply(this, arguments), 'function']);/*/TC*/};

module.exports = IframePlugin;

});
__d("PluginTags",[],function(global,require,requireDynamic,requireLazy,module,exports) {

var PluginTags = {
  activity: {
    border_color: 'string',
    filter: 'string',
    action: 'string',
    max_age: 'string',
    linktarget: 'string',
    header: 'bool',
    recommendations: 'bool',
    site: 'hostname'
  },

  create_event_button: {
  },

  degrees: {
    href: 'url'
  },

  facepile: {
    href: 'string',
    action: 'string',
    size: 'string',
    max_rows: 'string'
  },

  friendpile: {
    href: 'string',
    action: 'string',
    size: 'string',
    max_rows: 'string'
  },

  page_events: {
    href: 'url'
  },

  privacy_selector: {
  },

  recommendations: {
    border_color: 'string',
    filter: 'string',
    action: 'string',
    max_age: 'string',
    linktarget: 'string',
    header: 'bool',
    site: 'hostname'
  },

  share_button: {
    href: 'url',
    type: 'string'
  },

  shared_activity: {
    header: 'bool'
  },

  send_to_mobile: {
    max_rows:   'string',
    show_faces: 'bool',
    size:       'string'
  },

  subscribe: {
    href:       'url',
    layout:     'string',
    show_faces: 'bool'
  },

  want: {
    href:       'url',
    layout:     'string',
    show_faces: 'bool'
  }

};

module.exports = PluginTags;

});
__d("sdk.Arbiter",[],function(global,require,requireDynamic,requireLazy,module,exports) {

var Arbiter = {
  BEHAVIOR_EVENT: 'e',
  BEHAVIOR_PERSISTENT: 'p',
  BEHAVIOR_STATE: 's'
};
module.exports = Arbiter;

});
__d("sdk.XFBML.Element",["sdk.DOM","sdk.Event","Type","ObservableMixin"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOM = require('sdk.DOM');
var Event = require('sdk.Event');
var Type = require('Type');
var ObservableMixin = require('ObservableMixin');


var Element = Type.extend({
  
  constructor: function(/*DOMElement*/ dom) {/*TC*/__t([dom,'DOMElement','dom']);/*/TC*/
    this.parent();
    this.dom = dom;
  },

  fire: function() {
    this.inform.apply(this, arguments);
  },

  
  getAttribute: function(/*string*/ name, defaultValue,
      /*function?*/ transform) {/*TC*/__t([name,'string','name'],[transform,'function?','transform']);/*/TC*/
    var value = DOM.getAttr(this.dom, name);
    return value
      ? transform
        ? transform(value)
        : value
      : defaultValue;
  },

  
  _getBoolAttribute: function(/*string*/ name, /*boolean?*/ defaultValue)
      /*boolean?*/ {/*TC*/__t([name,'string','name'],[defaultValue,'boolean?','defaultValue']); return __t([function(){/*/TC*/
    var value = DOM.getBoolAttr(this.dom, name);
    return value === null
      ? defaultValue
      : value;
  /*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/},

  
  _getPxAttribute: function(/*string*/ name, /*number?*/ defaultValue)
      /*number?*/ {/*TC*/__t([name,'string','name'],[defaultValue,'number?','defaultValue']); return __t([function(){/*/TC*/
    return this.getAttribute(name, defaultValue, function(/*string*/ s)
        /*number?*/ {/*TC*/__t([s,'string','s']); return __t([function(){/*/TC*/
      var size = parseInt(s.replace('px', ''), 10);
      if (isNaN(size)) {
        return defaultValue;
      } else {
        return size;
      }
    /*TC*/}.apply(this, arguments), 'number?']);/*/TC*/});
  /*TC*/}.apply(this, arguments), 'number?']);/*/TC*/},

  
  _getAttributeFromList: function(/*string*/ name, /*string*/ defaultValue,
      /*array<string>*/ allowed) /*string*/ {/*TC*/__t([name,'string','name'],[defaultValue,'string','defaultValue']); return __t([function(){/*/TC*/
    return this.getAttribute(name, defaultValue, function(/*string*/ s)
        /*string*/ {/*TC*/__t([s,'string','s']); return __t([function(){/*/TC*/
      s = s.toLowerCase();
      return (ES5(allowed, 'indexOf', true,s) > -1)
        ? s
        : defaultValue;
    /*TC*/}.apply(this, arguments), 'string']);/*/TC*/});
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  isValid: function() /*boolean?*/ {/*TC*/ return __t([function(){/*/TC*/
    for (var dom = this.dom; dom; dom = dom.parentNode) {
      if (dom == document.body) {
        return true;
      }
    }
  /*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/},

  
  clear: function() {
    DOM.html(this.dom, '');
  }

}, ObservableMixin);

module.exports = Element;

});
__d("sdk.XFBML.IframeWidget",["sdk.Arbiter","sdk.Auth","sdk.Content","copyProperties","sdk.DOM","sdk.Event","sdk.XFBML.Element","guid","insertIframe","QueryString","sdk.Runtime","sdk.ui","UrlMap","sdk.XD"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Arbiter = require('sdk.Arbiter');
var Auth = require('sdk.Auth');
var Content = require('sdk.Content');
var copyProperties = require('copyProperties');
var DOM = require('sdk.DOM');
var Event = require('sdk.Event');
var Element = require('sdk.XFBML.Element');
var guid = require('guid');
var insertIframe = require('insertIframe');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var ui = require('sdk.ui');
var UrlMap = require('UrlMap');
var XD = require('sdk.XD');


var IframeWidget = Element.extend({
  
  _iframeName: null,

  
  _showLoader: true,

  
  _refreshOnAuthChange: false,

  
  _allowReProcess: false,

  
  _fetchPreCachedLoader: false,

  
  _visibleAfter: 'load',

  
  _widgetPipeEnabled: false,

  
  _borderReset: false,

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    throw new Error('Inheriting class needs to implement getUrlBits().');
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  oneTimeSetup: function() {},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*//*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getIframeName: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._iframeName;
  /*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  
  getIframeTitle: function() /*string?*/ {/*TC*/ return __t([function(){/*/TC*//*TC*/}.apply(this, arguments), 'string?']);/*/TC*/},

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  
  getChannelUrl: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    if (!this._channelUrl) {
      
      
      var self = this;
      this._channelUrl = XD.handler(function(message) {
        self.fire('xd.' + message.type, message);
      }, 'parent.parent', true);
    }
    return this._channelUrl;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  getIframeNode: function() /*DOMElement?*/ {/*TC*/ return __t([function(){/*/TC*/
    
    
    return this.dom.getElementsByTagName('iframe')[0];
  /*TC*/}.apply(this, arguments), 'DOMElement?']);/*/TC*/},

  
  arbiterInform: function(/*string*/ event, /*object?*/ message,
      /*string?*/ behavior) {/*TC*/__t([event,'string','event'],[message,'object?','message'],[behavior,'string?','behavior']);/*/TC*/
    XD.sendToFacebook(
      this.getIframeName(), {
        method: event,
        params: ES5('JSON', 'stringify', false,message || {}),
        behavior: behavior || Arbiter.BEHAVIOR_PERSISTENT
      });
  },

  _arbiterInform: function(/*string*/ event, /*object*/  message,
      /*string?*/ behavior) {/*TC*/__t([event,'string','event'],[behavior,'string?','behavior']);/*/TC*/
    var relation = 'parent.frames["' + this.getIframeNode().name + '"]';
    XD.inform(event, message, relation, behavior);
  },

  
  getDefaultWebDomain: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return UrlMap.resolve('www');
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  
  process: function(/*boolean?*/ force) {/*TC*/__t([force,'boolean?','force']);/*/TC*/
    
    if (this._done) {
      if (!this._allowReProcess && !force) {
        return;
      }
      this.clear();
    } else {
      this._oneTimeSetup();
    }
    this._done = true;

    this._iframeName = this.getIframeName() || this._iframeName || guid();
    if (!this.setupAndValidate()) {
      
      this.fire('render');
      return;
    }

    
    if (this._showLoader) {
      this._addLoader();
    }

    
    DOM.addCss(this.dom, 'fb_iframe_widget');
    if (this._visibleAfter != 'immediate') {
      DOM.addCss(this.dom, 'fb_hide_iframes');
    } else {
      this.subscribe('iframe.onload', ES5(this.fire, 'bind', true,this, 'render'));
    }

    
    var size = this.getSize() || {};
    var url = this.getFullyQualifiedURL();

    if (size.width == '100%') {
      DOM.addCss(this.dom, 'fb_iframe_widget_fluid');
    }

    this.clear();
    insertIframe({
      url       : url,
      root      : this.dom.appendChild(document.createElement('span')),
      name      : this._iframeName,
      title     : this.getIframeTitle(),
      className : Runtime.getRtl() ? 'fb_rtl' : 'fb_ltr',
      height    : size.height,
      width     : size.width,
      onload    : ES5(this.fire, 'bind', true,this, 'iframe.onload')
    });

    this._resizeFlow(size);

    this.loaded = false;
    this.subscribe('iframe.onload', ES5(function() {
      this.loaded = true;
    }, 'bind', true,this));
  },

  
  generateWidgetPipeIframeName: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    widgetPipeIframeCount++;
    return 'fb_iframe_' + widgetPipeIframeCount;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  getFullyQualifiedURL: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    
    
    
    var url = this._getURL();
    url += '?' + QueryString.encode(this._getQS());

    if (url.length > 2000) {
      
      url = 'about:blank';
      var onload = ES5(function() {
        this._postRequest();
        this.unsubscribe('iframe.onload', onload);
      }, 'bind', true,this);
      this.subscribe('iframe.onload', onload);
    }

    return url;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

   

  _getWidgetPipeShell: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return UrlMap.resolve('www') + '/common/widget_pipe_shell.php';
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _oneTimeSetup: function() {
    
    
    this.subscribe('xd.resize', ES5(this._handleResizeMsg, 'bind', true,this));
    this.subscribe('xd.resize', ES5(this._bubbleResizeEvent, 'bind', true,this));

    this.subscribe('xd.resize.iframe', ES5(this._resizeIframe, 'bind', true,this));
    this.subscribe('xd.resize.flow', ES5(this._resizeFlow, 'bind', true,this));
    this.subscribe('xd.resize.flow', ES5(this._bubbleResizeEvent, 'bind', true,this));

    this.subscribe('xd.refreshLoginStatus', function() {
      Auth.getLoginStatus(function(){}, true);
    });
    this.subscribe('xd.logout', function() {
      ui({ method: 'auth.logout', display: 'hidden' }, function() {});
    });

    
    if (this._refreshOnAuthChange) {
      this._setupAuthRefresh();
    }

    
    if (this._visibleAfter == 'load') {
      this.subscribe('iframe.onload', ES5(this._makeVisible, 'bind', true,this));
    }

    this.subscribe(
      'xd.verify', ES5(function(message) {
          this.arbiterInform('xd/verify', message.token);
        }, 'bind', true,this));

    
    this.oneTimeSetup();
  },

  
  _makeVisible: function() {
    this._removeLoader();
    DOM.removeCss(this.dom, 'fb_hide_iframes');
    this.fire('render');
  },

  
  _setupAuthRefresh: function() {
    Auth.getLoginStatus(ES5(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
      var lastStatus = response.status;
      Event.subscribe('auth.statusChange', ES5(function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
        if (!this.isValid()) {
          return;
        }
        
        if (lastStatus == 'unknown' || response.status == 'unknown') {
          this.process(true);
        }
        lastStatus = response.status;
      }, 'bind', true,this));
    }, 'bind', true,this));
  },

  
  _handleResizeMsg: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    if (!this.isValid()) {
      return;
    }
    this._resizeIframe(message);
    this._resizeFlow(message);

    if (!this._borderReset) {
      this.getIframeNode().style.border = 'none';
      this._borderReset = true;
    }

    this._makeVisible();
  },

  
  _bubbleResizeEvent: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    var filtered_message = {
      height: message.height,
      width: message.width,
      pluginID: this.getAttribute('plugin-id')
    };

    Event.fire('xfbml.resize', filtered_message);
  },

  _resizeIframe: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    var iframe = this.getIframeNode();
    message.height && (iframe.style.height = message.height + 'px');
    message.width && (iframe.style.width = message.width + 'px');
    this._updateIframeZIndex();
  },

  _resizeFlow: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    var span = this.dom.getElementsByTagName('span')[0];
    message.height && (span.style.height = message.height + 'px');
    message.width && (span.style.width = message.width + 'px');
    this._updateIframeZIndex();
  },

  _updateIframeZIndex: function() {
    var span = this.dom.getElementsByTagName('span')[0];
    var iframe = this.getIframeNode();
    var identical = iframe.style.height === span.style.height &&
      iframe.style.width === span.style.width;
    var method = identical ? 'removeCss' : 'addCss';
    DOM[method](iframe, 'fb_iframe_widget_lift');
  },

  
  _addLoader: function() {
    if (!this._loaderDiv) {
      DOM.addCss(this.dom, 'fb_iframe_widget_loader');
      this._loaderDiv = document.createElement('div');
      this._loaderDiv.className = 'FB_Loader';
      this.dom.appendChild(this._loaderDiv);
    }
  },

  
  _removeLoader: function() {
    if (this._loaderDiv) {
      DOM.removeCss(this.dom, 'fb_iframe_widget_loader');
      if (this._loaderDiv.parentNode) {
        this._loaderDiv.parentNode.removeChild(this._loaderDiv);
      }
      this._loaderDiv = null;
    }
  },

  
  _getQS: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return copyProperties({
      api_key      : Runtime.getClientID(),
      locale       : Runtime.getLocale(),
      sdk          : 'joey',
      ref          : this.getAttribute('ref')
    }, this.getUrlBits().params);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _getURL: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    var
      domain = this.getDefaultWebDomain(),
      static_path = '';

    return domain + '/plugins/' + static_path +
           this.getUrlBits().name + '.php';
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _postRequest: function() {
    Content.submitToTarget({
      url    : this._getURL(),
      target : this.getIframeNode().name,
      params : this._getQS()
    });
  }
});

var widgetPipeIframeCount = 0;
var masterWidgetPipeIframe = null;
var allWidgetPipeIframes = {};

function groupWidgetPipeDescriptions() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
  var widgetPipeDescriptions = {};
  for (var key in allWidgetPipeIframes) {
    var controller = allWidgetPipeIframes[key];

    widgetPipeDescriptions[key] = {
      widget: controller.getUrlBits().name,
      params: controller._getQS()
    };
  }

  return widgetPipeDescriptions;
/*TC*/}.apply(this, arguments), 'object']);/*/TC*/}

function batchWidgetPipeRequests() {
  if (!masterWidgetPipeIframe) {
    
    
    return;
  }

  var widgetPipeDescriptions = groupWidgetPipeDescriptions();
  var widgetPipeParams = {
    widget_pipe: ES5('JSON', 'stringify', false,widgetPipeDescriptions),
    href: window.location,
    site: location.hostname,
    channel: masterWidgetPipeIframe.getChannelUrl(),
    api_key: Runtime.getClientID(),
    locale: Runtime.getLocale(),
    sdk: 'joey'
  };
  var widgetPipeIframeName = guid();
  var masterWidgetPipeDom = masterWidgetPipeIframe.dom;
  
  
  var masterWidgetPipeSpan =
    masterWidgetPipeDom.appendChild(document.createElement('span'));
  insertIframe({
    url: 'about:blank',
    root: masterWidgetPipeSpan,
    name: widgetPipeIframeName,
    className: 'fb_hidden fb_invisible',
    onload: function() {
      Content.submitToTarget({
        url: UrlMap.resolve('www') + 'plugins/pipe/',
        target: widgetPipeIframeName,
        params: widgetPipeParams
      }, 1);
    }
  });
}

module.exports = IframeWidget;

});
__d("sdk.XFBML.Comments",["sdk.Event","sdk.XFBML.IframeWidget","QueryString","sdk.Runtime","UrlMap","UserAgent","SDKConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Event = require('sdk.Event');
var IframeWidget = require('sdk.XFBML.IframeWidget');
var QueryString = require('QueryString');
var Runtime = require('sdk.Runtime');
var SDKConfig = requireDynamic('SDKConfig');
var UrlMap = require('UrlMap');
var UserAgent = require('UserAgent');

var Comments = IframeWidget.extend({
  _visibleAfter: 'immediate',

  
  _refreshOnAuthChange: true,

  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    
    var attr = {
      channel_url : this.getChannelUrl(),
      colorscheme : this.getAttribute('colorscheme'),
      numposts    : this.getAttribute('num-posts', 10),
      width       : this._getPxAttribute('width', 550),
      href        : this.getAttribute('href'),
      permalink   : this.getAttribute('permalink'),
      publish_feed : this.getAttribute('publish_feed'),
      order_by    : this.getAttribute('order_by'),
      mobile      : this._getBoolAttribute('mobile')
    };

    if (SDKConfig.initSitevars.enableMobileComments &&
        UserAgent.mobile() &&
        attr.mobile !== false) {
      attr.mobile = true;
      delete attr.width;
    }

    
    if (!attr.href) {
      attr.migrated    = this.getAttribute('migrated');
      attr.xid         = this.getAttribute('xid');
      attr.title       = this.getAttribute('title', document.title);
      attr.url         = this.getAttribute('url', document.URL);
      attr.quiet       = this.getAttribute('quiet');
      attr.reverse     = this.getAttribute('reverse');
      attr.simple      = this.getAttribute('simple');
      attr.css         = this.getAttribute('css');
      attr.notify      = this.getAttribute('notify');

      
      if (!attr.xid) {
        
        
        
        var index = ES5(document.URL, 'indexOf', true,'#');
        if (index > 0) {
          attr.xid = encodeURIComponent(document.URL.substring(0, index));
        }
        else {
          attr.xid = encodeURIComponent(document.URL);
        }
      }

      if (attr.migrated) {
        attr.href =
          UrlMap.resolve('www') + '/plugins/comments_v1.php?' +
          'app_id=' + Runtime.getClientID() +
          '&xid=' + encodeURIComponent(attr.xid) +
          '&url=' + encodeURIComponent(attr.url);
      }
    } else {
      
      var fb_comment_id = this.getAttribute('fb_comment_id');
      if (!fb_comment_id) {
        fb_comment_id =
          QueryString.decode(
            document.URL.substring(
              ES5(document.URL, 'indexOf', true,'?') + 1)).fb_comment_id;
        if (fb_comment_id && ES5(fb_comment_id, 'indexOf', true,'#') > 0) {
          
          fb_comment_id =
            fb_comment_id.substring(0,
                                    ES5(fb_comment_id, 'indexOf', true,'#'));
        }
      }

      if (fb_comment_id) {
        attr.fb_comment_id = fb_comment_id;
        this.subscribe('render',
                       ES5(function() {
                           
                           
                           
                           if (!window.location.hash) {
                             window.location.hash = this.getIframeNode().id;
                           }
                         }, 'bind', true,this));
      }
    }

    this._attr = attr;
    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  oneTimeSetup: function() {
    this.subscribe('xd.addComment',
                   ES5(this._handleCommentMsg, 'bind', true,this));
    this.subscribe('xd.commentCreated',
                   ES5(this._handleCommentCreatedMsg, 'bind', true,this));
    this.subscribe('xd.commentRemoved',
                   ES5(this._handleCommentRemovedMsg, 'bind', true,this));
  },

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    if (this._attr.mobile) {
      return { width: '100%', height: 160 };
    }
    return { width: this._attr.width, height: 160 };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'comments', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getDefaultWebDomain: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return UrlMap.resolve(
      this._attr.mobile
        ? 'm'
        : 'www',
      true
    );
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _handleCommentMsg: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    //TODO (naitik) what should we be giving the developers here? is there a
    
    if (!this.isValid()) {
      return;
    }
    Event.fire('comments.add', {
      post: message.post,
      user: message.user,
      widget: this
    });
  },

  _handleCommentCreatedMsg: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    if (!this.isValid()) {
      return;
    }

    var eventArgs = {
      href: message.href,
      commentID: message.commentID,
      parentCommentID: message.parentCommentID
    };

    Event.fire('comment.create', eventArgs);
  },

  _handleCommentRemovedMsg: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    if (!this.isValid()) {
      return;
    }

    var eventArgs = {
      href: message.href,
      commentID: message.commentID
    };

    Event.fire('comment.remove', eventArgs);
  }
});
module.exports = Comments;

});
__d("sdk.XFBML.CommentsCount",["sdk.Data","sdk.DOM","sdk.XFBML.Element","sprintf"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Data = require('sdk.Data');
var DOM = require('sdk.DOM');
var Element = require('sdk.XFBML.Element');
var sprintf = require('sprintf');

var CommentsCount = Element.extend({

  process: function() {
    DOM.addCss(this.dom, 'fb_comments_count_zero');

    var href = this.getAttribute('href', window.location.href);

    Data._selectByIndex(['commentsbox_count'], 'link_stat', 'url', href)
      .wait(ES5(function(/*array<object>*/ value) {
        var c = value[0].commentsbox_count;

        DOM.html(
          this.dom,
          sprintf('<span class="fb_comments_count">%s</span>', c)
        );

        if (c > 0) {
          DOM.removeCss(this.dom, 'fb_comments_count_zero');
        }

        this.fire('render');
      }, 'bind', true,this));
  }

});

module.exports = CommentsCount;

});
__d("sdk.Anim",["sdk.DOM"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOM = require('sdk.DOM');
var Anim = {
  
  ate: function(/*DOMElement*/ dom, /*object*/ props, /*number?*/ duration,
      /*function?*/ callback) {/*TC*/__t([dom,'DOMElement','dom'],[props,'object','props'],[duration,'number?','duration'],[callback,'function?','callback']);/*/TC*/
    duration = !isNaN(parseFloat(duration)) && duration >= 0
      ? duration
      : 750;
    var
      frame_speed = 40,
      from        = {},
      to          = {},
      begin       = null,
      timer       = setInterval(ES5(function() {
        if (!begin) { begin = ES5('Date', 'now', false); }
        
        var pd = 1;
        if (duration != 0) {
          pd = Math.min((ES5('Date', 'now', false) - begin) / duration, 1);
        }
        for (var prop in props) if (props.hasOwnProperty(prop)) {
          var value = props[prop];
          if (!from[prop]) { 
            var style = DOM.getStyle(dom, prop);
            
            if (style === false) { return; }
            from[prop] = this._parseCSS(style+''); 
          }
          if (!to[prop]) { 
            to[prop] = this._parseCSS(value.toString());
          }
          var next = ''; 
          ES5(from[prop], 'forEach', true,function(/*object*/ pair, /*number*/ i) {/*TC*/__t([pair,'object','pair'],[i,'number','i']);/*/TC*/
            
            if (isNaN(to[prop][i].numPart) && to[prop][i].textPart == '?') {
              next = pair.numPart + pair.textPart;
            
            } else if (isNaN(pair.numPart)) {
              next = pair.textPart;
            
            } else {
              next +=
                (pair.numPart + 
                 Math.ceil((to[prop][i].numPart - pair.numPart) *
                            Math.sin(Math.PI/2 * pd))) +
                to[prop][i].textPart + ' '; 
            }
          });
          
          DOM.setStyle(dom, prop, next);
        }
        if (pd == 1) { 
          clearInterval(timer);
          if (callback) { callback(dom); }
        }
      }, 'bind', true,this), frame_speed);
  },

  
  _parseCSS: function(/*string*/ css) /*array<object>*/ {/*TC*/__t([css,'string','css']);/*/TC*/
    var ret = [];
    ES5(css.split(' '), 'forEach', true,function(peice) {
      var num = parseInt(peice, 10);
      ret.push({numPart: num, textPart: peice.replace(num,'')});
    });
    return ret;
  }
};
module.exports = Anim;

});
__d("escapeHTML",[],function(global,require,requireDynamic,requireLazy,module,exports) {

var re = /[&<>"'\/]/g;
var map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
  '/': '&#x2F;'
};

function escapeHTML(/*string*/ value) /*string*/ {/*TC*/__t([value,'string','value']); return __t([function(){/*/TC*/
  return value.replace(re, function(m) {
    return map[m];
  });
/*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
module.exports = escapeHTML;

});
__d("sdk.Helper",["sdk.ErrorHandling","sdk.Event","FB","sdk.Runtime","safeEval","UrlMap"],function(global,require,requireDynamic,requireLazy,module,exports) {

var ErrorHandling = require('sdk.ErrorHandling');
var Event = require('sdk.Event');
var FB = require('FB');
var Runtime = require('sdk.Runtime');
var safeEval = require('safeEval');
var UrlMap = require('UrlMap');

var Helper = {
  
  isUser: function(id) /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    return id < 2200000000 ||
      (id >= 100000000000000 &&  
       id <= 100099999989999) || 
      (id >= 89000000000000 &&   
       id <= 89999999999999);    
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  upperCaseFirstChar: function(/*string*/ s) /*string*/ {/*TC*/__t([s,'string','s']); return __t([function(){/*/TC*/
    if (s.length > 0) {
      return s.substr(0, 1).toUpperCase() + s.substr(1);
    }
    else {
      return s;
    }
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  getProfileLink: function(/*object?*/ userInfo, /*string*/ html,
      /*string?*/ href) /*string*/ {/*TC*/__t([userInfo,'object?','userInfo'],[html,'string','html'],[href,'string?','href']); return __t([function(){/*/TC*/
    href = href || (userInfo ? UrlMap.resolve('www') + '/profile.php?id=' +
                    userInfo.uid : null);
    if (href) {
      html = '<a class="fb_link" href="' + href + '">' + html + '</a>';
    }
    return html;
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  invokeHandler: function(handler, /*object?*/ scope, /*array?*/ args) {/*TC*/__t([scope,'object?','scope'],[args,'array?','args']);/*/TC*/
    if (handler) {
      if (typeof handler === 'string') {
        ErrorHandling.unguard(safeEval)(handler);
      } else if (handler.apply) {
        ErrorHandling.unguard(handler).apply(scope, args || []);
      }
    }
  },

  
  fireEvent: function(/*string*/ eventName, /*object*/ eventSource) {/*TC*/__t([eventName,'string','eventName'],[eventSource,'object','eventSource']);/*/TC*/
    var href = eventSource._attr.href;
    eventSource.fire(eventName, href); 
    Event.fire(eventName, href, eventSource); 
  },

  
  executeFunctionByName: function(/*string*/ functionName /*, args */) {/*TC*/__t([functionName,'string','functionName']);/*/TC*/
    var args = Array.prototype.slice.call(arguments, 1);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    var context = window;
    for (var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
  }

};

module.exports = Helper;

});
__d("sdk.XFBML.ConnectBar",["sdk.Anim","sdk.api","sdk.Auth","createArrayFrom","sdk.Data","sdk.DOM","sdk.XFBML.Element","escapeHTML","sdk.Event","format","sdk.Helper","sdk.Insights","sdk.Intl","sdk.Runtime","UrlMap","UserAgent","ConnectBarConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Anim = require('sdk.Anim');
var api = require('sdk.api');
var Auth = require('sdk.Auth');
var createArrayFrom = require('createArrayFrom');
var ConnectBarConfig = requireDynamic('ConnectBarConfig');
var Data = require('sdk.Data');
var DOM = require('sdk.DOM');
var Element = require('sdk.XFBML.Element');
var escapeHTML = require('escapeHTML');
var Event = require('sdk.Event');
var format = require('format');
var Helper = require('sdk.Helper');
var Insights = require('sdk.Insights');
var Intl = require('sdk.Intl');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');
var UserAgent = require('UserAgent');

var ConnectBar = Element.extend({
  _initialHeight: null,
  _initTopMargin: 0,
  _picFieldName: 'pic_square',
  _page: null, 
  _displayed: false, 
  _notDisplayed: false, 
  _container: null,
  _animationSpeed: 0, 

  
  process: function() {
    
    Auth.getLoginStatus(ES5(function(/*object*/ resp) {/*TC*/__t([resp,'object','resp']);/*/TC*/
      Event.monitor('auth.statusChange', ES5(function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
        
        if (this.isValid() && Runtime.getLoginStatus() == 'connected') {
          this._uid = Runtime.getUserID();
          api({ 
            method: 'Connect.shouldShowConnectBar'
          }, ES5(function(showBar) {
            if (showBar != 2) {
              this._animationSpeed = (showBar == 0) ? 750 : 0;
              this._showBar();
            } else {
              this._noRender();
            }
          }, 'bind', true,this));
        } else {
          this._noRender();
        }
        return false; 
      /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}, 'bind', true,this));
    }, 'bind', true,this));
  },

  
  _showBar: function() {
    var q1 = Data._selectByIndex(['first_name', 'profile_url',
                                      this._picFieldName],
                                    'user', 'uid', this._uid);
    var q2 = Data._selectByIndex(['display_name'], 'application',
                                    'api_key', Runtime.getClientID());
    Data.waitOn([q1, q2], ES5(function(/*array<array<object>>*/ data) {
      data[0][0].site_name = data[1][0].display_name;
      if (!this._displayed) {
        this._displayed = true;
        this._notDisplayed = false;
        this._renderConnectBar(data[0][0]);
        this.fire('render');
        Insights.impression({
          lid: 104,
          name: 'widget_load'
        });
        this.fire('connectbar.ondisplay');
        Event.fire('connectbar.ondisplay', this);
        Helper.invokeHandler(this.getAttribute('on-display'), this);
      }
    }, 'bind', true,this));
  },

  
  _noRender: function() {
    if (this._displayed) {
      this._displayed = false;
      this._closeConnectBar();
    }
    if (!this._notDisplayed) {
      this._notDisplayed = true;
      this.fire('render');
      this.fire('connectbar.onnotdisplay');
      Event.fire('connectbar.onnotdisplay', this);
      Helper.invokeHandler(this.getAttribute('on-not-display'), this);
    }
  },

  
  _renderConnectBar: function(/*object*/ info) {/*TC*/__t([info,'object','info']);/*/TC*/
    var bar = document.createElement('div'),
        container = document.createElement('div');
    
    bar.className = 'fb_connect_bar';
    container.className = 'fb_reset fb_connect_bar_container';
    container.appendChild(bar);
    document.body.appendChild(container);
    this._container = container;
    this._initialHeight = Math.round(
              parseFloat(DOM.getStyle(container, 'height')) +
              parseFloat(DOM.getStyle(container, 'borderBottomWidth')));
    DOM.html(bar, format(
      '<div class="fb_buttons">' +
        '<a href="#" class="fb_bar_close">' +
          '<img src="{1}" alt="{2}" title="{2}"/>' +
        '</a>' +
      '</div>' +
      '<a href="{7}" class="fb_profile" target="_blank">' +
        '<img src="{3}" alt="{4}" title="{4}"/>' +
      '</a>' +
      '{5}' +
      ' <span>' +
        '<a href="{8}" class="fb_learn_more" target="_blank">{6}</a> &ndash; ' +
        '<a href="#" class="fb_no_thanks">{0}</a>' +
      '</span>',
      Intl.tx._("No Thanks"),
      UrlMap.resolve('fbcdn') + '/' + ConnectBarConfig.imgs.buttonUrl,
      Intl.tx._("Close"),
      info[this._picFieldName] || UrlMap.resolve('fbcdn') + '/' +
                                  ConnectBarConfig.imgs.missingProfileUrl,
      escapeHTML(info.first_name),
      Intl.tx._("Hi {firstName}. \u003Cstrong>{siteName}\u003C\/strong> is using Facebook to personalize your experience.", {
        firstName: escapeHTML(info.first_name),
        siteName: escapeHTML(info.site_name)
      }),
      Intl.tx._("Learn More"),
      info.profile_url,
      UrlMap.resolve('www') + '/sitetour/connect.php'
    ));
    ES5(createArrayFrom(bar.getElementsByTagName('a')), 'forEach', true,function(/*DOMElement*/ el) {/*TC*/__t([el,'DOMElement','el']);/*/TC*/
        el.onclick = ES5(this._clickHandler, 'bind', true,this);
      }, this);
    this._page = document.body;
    var top_margin = 0;
    if (this._page.parentNode) {
      top_margin = Math.round(
        (parseFloat(DOM.getStyle(this._page.parentNode, 'height')) -
        parseFloat(DOM.getStyle(this._page, 'height'))) / 2);
    } else {
      top_margin = parseInt(DOM.getStyle(this._page, 'marginTop'), 10);
    }
    top_margin = isNaN(top_margin) ? 0 : top_margin;
    this._initTopMargin = top_margin;
    if (!window.XMLHttpRequest) { 
      container.className += " fb_connect_bar_container_ie6";
    } else {
      container.style.top = (-1*this._initialHeight) + 'px';
      Anim.ate(container, { top: '0px' }, this._animationSpeed);
    }
    var move = { marginTop: this._initTopMargin + this._initialHeight + 'px' }
    if (UserAgent.ie()) { 
      move.backgroundPositionY = this._initialHeight + 'px'
    } else { 
      move.backgroundPosition = '? ' + this._initialHeight + 'px'
    }
    Anim.ate(this._page, move, this._animationSpeed);
  },

  
  _clickHandler : function(e) {
    e = e || window.event;
    var el = e.target || e.srcElement;
    while (el.nodeName != 'A') { el = el.parentNode; }
    switch (el.className) {
      case 'fb_bar_close':
        api({ 
          method: 'Connect.connectBarMarkAcknowledged'
        });
        Insights.impression({
          lid: 104,
          name: 'widget_user_closed'
        });
        this._closeConnectBar();
        break;
      case 'fb_learn_more':
      case 'fb_profile':
        window.open(el.href);
        break;
      case 'fb_no_thanks':
        this._closeConnectBar();
        api({ 
          method: 'Connect.connectBarMarkAcknowledged'
        });
        Insights.impression({
          lid: 104,
          name: 'widget_user_no_thanks'
        });
        api({ method: 'auth.revokeAuthorization', block: true }, ES5(function() {
          this.fire('connectbar.ondeauth');
          Event.fire('connectbar.ondeauth', this);
          Helper.invokeHandler(this.getAttribute('on-deauth'), this);
          if (this._getBoolAttribute('auto-refresh', true)) {
            window.location.reload();
          }
        }, 'bind', true,this));
        break;
    }
    return false;
  },

  _closeConnectBar: function() {
    this._notDisplayed = true;
    var move = { marginTop: this._initTopMargin + 'px' }
    if (UserAgent.ie()) { 
      move.backgroundPositionY = '0px'
    } else { 
      move.backgroundPosition = '? 0px'
    }
    var speed = (this._animationSpeed == 0) ? 0 : 300;
    Anim.ate(this._page, move, speed);
    Anim.ate(this._container, {
      top: (-1 * this._initialHeight) + 'px'
    }, speed, function(/*DOMElement*/ el) {/*TC*/__t([el,'DOMElement','el']);/*/TC*/
      el.parentNode.removeChild(el);
    });
    this.fire('connectbar.onclose');
    Event.fire('connectbar.onclose', this);
    Helper.invokeHandler(this.getAttribute('on-close'), this);
  }
});

module.exports = ConnectBar;

});
__d("sdk.XFBML.Fan",["sdk.XFBML.IframeWidget","sdk.Runtime","Log"],function(global,require,requireDynamic,requireLazy,module,exports) {

var IframeWidget = require('sdk.XFBML.IframeWidget');
var Runtime = require('sdk.Runtime');
var Log = require('Log');

var Fan = IframeWidget.extend({
  _visibleAfter: 'load',

  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    this._attr = {
      api_key     : Runtime.getClientID(),
      connections : this.getAttribute('connections', '10'),
      css         : this.getAttribute('css'),
      height      : this._getPxAttribute('height'),
      id          : this.getAttribute('profile-id'),
      logobar     : this._getBoolAttribute('logo-bar'),
      name        : this.getAttribute('name'),
      stream      : this._getBoolAttribute('stream', true),
      width       : this._getPxAttribute('width', 300)
    };

    
    if (!this._attr.id && !this._attr.name) {
      Log.error('<fb:fan> requires one of the "id" or "name" attributes.');
      return false;
    }

    var height = this._attr.height;
    if (!height) {
      if ((!this._attr.connections || this._attr.connections === '0') &&
          !this._attr.stream) {
        height = 65;
      } else if (!this._attr.connections || this._attr.connections === '0') {
        height = 375;
      } else if (!this._attr.stream) {
        height = 250;
      } else {
        height = 550;
      }
    }
    
    if (this._attr.logobar) {
      height += 25;
    }

    this._attr.height = height;
    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { width: this._attr.width, height: this._attr.height };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'fan', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = Fan;

});
__d("sdk.XFBML.EdgeCommentWidget",["sdk.XFBML.IframeWidget","sdk.DOM"],function(global,require,requireDynamic,requireLazy,module,exports) {

var IframeWidget = require('sdk.XFBML.IframeWidget');
var DOM = require('sdk.DOM');

var nextZIndex = 10000;

var Widget = IframeWidget.extend({
  constructor: function(/*object*/ opts) {/*TC*/__t([opts,'object','opts']);/*/TC*/
    this.parent(opts.commentNode);
    this._iframeWidth = opts.width + 1;
    this._iframeHeight = opts.height;
    this._attr = {
      master_frame_name: opts.masterFrameName,
      offsetX: opts.relativeWidthOffset - opts.paddingLeft
    };
    this.dom = opts.commentNode;
    this.dom.style.top = opts.relativeHeightOffset + 'px';
    this.dom.style.left = opts.relativeWidthOffset + 'px';
    this.dom.style.zIndex = nextZIndex++;
    DOM.addCss(this.dom, 'fb_edge_comment_widget');
  },

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  
  _visibleAfter: 'load',
  _showLoader: false,

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return {
      width: this._iframeWidth,
      height: this._iframeHeight
    };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'comment_widget_shell', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = Widget;

});
__d("sdk.XFBML.EdgeWidget",["sdk.XFBML.IframeWidget","sdk.XFBML.EdgeCommentWidget","sdk.DOM","sdk.Helper","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var IframeWidget = require('sdk.XFBML.IframeWidget');
var EdgeCommentWidget = require('sdk.XFBML.EdgeCommentWidget');
var DOM = require('sdk.DOM');
var Helper = require('sdk.Helper');
var Runtime = require('sdk.Runtime');

var EdgeWidget = IframeWidget.extend({
  
  _visibleAfter: 'immediate',
  _showLoader: false,
  _rootPadding: null,

  
  setupAndValidate : function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    DOM.addCss(this.dom, 'fb_edge_widget_with_comment');
    this._attr = {
      channel_url             : this.getChannelUrl(),
      debug                   : this._getBoolAttribute('debug'),
      href                    : this.getAttribute('href', window.location.href),
      is_permalink            : this._getBoolAttribute('is-permalink'),
      node_type               : this.getAttribute('node-type', 'link'),
      width                   : this._getWidgetWidth(),
      font                    : this.getAttribute('font'),
      layout                  : this._getLayout(),
      colorscheme             : this.getAttribute('color-scheme', 'light'),
      action                  : this.getAttribute('action'),
      ref                     : this.getAttribute('ref'),
      show_faces              : this._shouldShowFaces(),
      no_resize               : this._getBoolAttribute('no_resize'),
      send                    : this._getBoolAttribute('send'),
      url_map                 : this.getAttribute('url_map'),
      extended_social_context :
        this._getBoolAttribute('extended_social_context', false)
    };

    this._rootPadding = {
      left: parseFloat(DOM.getStyle(this.dom, 'paddingLeft')),
      top:  parseFloat(DOM.getStyle(this.dom, 'paddingTop'))
    };

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  oneTimeSetup : function() {
    this.subscribe('xd.authPrompted', ES5(this._onAuthPrompt, 'bind', true,this));
    this.subscribe('xd.edgeCreated', ES5(this._onEdgeCreate, 'bind', true,this));
    this.subscribe('xd.edgeRemoved', ES5(this._onEdgeRemove, 'bind', true,this));
    this.subscribe('xd.presentEdgeCommentDialog',
      ES5(this._handleEdgeCommentDialogPresentation, 'bind', true,this));
    this.subscribe('xd.dismissEdgeCommentDialog',
      ES5(this._handleEdgeCommentDialogDismissal, 'bind', true,this));
    this.subscribe('xd.hideEdgeCommentDialog',
      ES5(this._handleEdgeCommentDialogHide, 'bind', true,this));
    this.subscribe('xd.showEdgeCommentDialog',
      ES5(this._handleEdgeCommentDialogShow, 'bind', true,this));
  },

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return {
      width: this._getWidgetWidth(),
      height: this._getWidgetHeight()
    };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _getWidgetHeight : function() /*number*/ {/*TC*/ return __t([function(){/*/TC*/
    var layout = this._getLayout();
    var should_show_faces = this._shouldShowFaces() ? 'show' : 'hide';
    var send = this._getBoolAttribute('send');
    var box_count = 65 + (send ? 25 : 0);
    var layoutToDefaultHeightMap =
      { 'standard' : {'show': 80, 'hide': 35},
        'box_count' : {'show': box_count, 'hide': box_count},
        'button_count' : {'show': 21, 'hide': 21},
        'simple' : {'show': 20, 'hide': 20}};
    return layoutToDefaultHeightMap[layout][should_show_faces];
  /*TC*/}.apply(this, arguments), 'number']);/*/TC*/},

  
  _getWidgetWidth : function() /*number*/ {/*TC*/ return __t([function(){/*/TC*/
    var layout = this._getLayout();
    var send = this._getBoolAttribute('send');
    var should_show_faces = this._shouldShowFaces() ? 'show' : 'hide';

    var recommend = (this.getAttribute('action') === 'recommend');
    var standard_min_width =
      (recommend ? 265 : 225) + (send ? 60 : 0);
    var button_count_default_width =
      (recommend ? 130 : 90) + (send ? 60 : 0);
    var box_count_default_width =
      this.getAttribute('action') === 'recommend' ? 100 : 55;
    var simple_default_width =
      this.getAttribute('action') === 'recommend' ? 90 : 50;
    var layoutToDefaultWidthMap =
      { 'standard': {'show': 450,
                     'hide': 450},
        'box_count': {'show': box_count_default_width,
                      'hide': box_count_default_width},
        'button_count': {'show': button_count_default_width,
                         'hide': button_count_default_width},
        'simple': {'show': simple_default_width,
                   'hide': simple_default_width}};
    var defaultWidth = layoutToDefaultWidthMap[layout][should_show_faces];
    var width = this._getPxAttribute('width', defaultWidth);

    var allowedWidths =
      { 'standard' : {'min' : standard_min_width, 'max' : 900},
        'box_count' : {'min' : box_count_default_width,
                       'max' : 900},
        'button_count' : {'min' : button_count_default_width,
                          'max' : 900},
        'simple' : {'min' : 49,
                    'max' : 900}};
    if (width < allowedWidths[layout].min) {
      width = allowedWidths[layout].min;
    } else if (width > allowedWidths[layout].max) {
      width = allowedWidths[layout].max;
    }

    return width;
  /*TC*/}.apply(this, arguments), 'number']);/*/TC*/},

  
  _getLayout : function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._getAttributeFromList(
      'layout',
      'standard',
      ['standard', 'button_count', 'box_count', 'simple']);
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _shouldShowFaces : function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    return this._getLayout() === 'standard' &&
           this._getBoolAttribute('show-faces', true);
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  _handleEdgeCommentDialogPresentation : function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    if (!this.isValid()) {
      return;
    }
    var comment_node = document.createElement('span');
    this._commentSlave = this._createEdgeCommentWidget(message, comment_node);
    this.dom.appendChild(comment_node);
    this._commentSlave.process();
    this._commentWidgetNode = comment_node;
  },

  
  _createEdgeCommentWidget : function(/*object*/ message,
      /*DOMElement*/ comment_node) /*object*/ {/*TC*/__t([message,'object','message'],[comment_node,'DOMElement','comment_node']); return __t([function(){/*/TC*/
    var opts = {
      commentNode          : comment_node,
      externalUrl          : message.externalURL,
      masterFrameName      : message.masterFrameName,
      layout               : this._getLayout(),
      relativeHeightOffset : this._getHeightOffset(message),
      relativeWidthOffset  : this._getWidthOffset(message),
      anchorTargetX        : parseFloat(message['query[anchorTargetX]']) +
                             this._rootPadding.left,
      anchorTargetY        : parseFloat(message['query[anchorTargetY]']) +
                             this._rootPadding.top,
      width                : parseFloat(message.width),
      height               : parseFloat(message.height),
      paddingLeft          : this._rootPadding.left
    };
    return new EdgeCommentWidget(opts);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  

  _getHeightOffset : function(/*object*/ message) /*number*/ {/*TC*/__t([message,'object','message']); return __t([function(){/*/TC*/
    return parseFloat(message['anchorGeometry[y]']) +
           parseFloat(message['anchorPosition[y]']) +
           this._rootPadding.top;
  /*TC*/}.apply(this, arguments), 'number']);/*/TC*/},

  
  _getWidthOffset : function(/*object*/ message) /*number*/ {/*TC*/__t([message,'object','message']); return __t([function(){/*/TC*/
    var off = parseFloat(message['anchorPosition[x]']) + this._rootPadding.left;
    var plugin_left = DOM.getPosition(this.dom).x;
    var plugin_width = this.dom.offsetWidth;
    var screen_width = DOM.getViewportInfo().width;
    var comment_width = parseFloat(message.width);
    var flipit = false;

    if (Runtime.getRtl()) {
        flipit = comment_width < plugin_left;
    } else if ((plugin_left + comment_width) > screen_width) {
      flipit = true;
    }

    if (flipit) {
      off += parseFloat(message['anchorGeometry[x]']) - comment_width;
    }

    return off;
  /*TC*/}.apply(this, arguments), 'number']);/*/TC*/},

  
  _getCommonEdgeCommentWidgetOpts : function(/*object*/ message,
      /*DOMElement*/ comment_node) /*object*/ {/*TC*/__t([message,'object','message'],[comment_node,'DOMElement','comment_node']); return __t([function(){/*/TC*/
    return {
      colorscheme             : this._attr.colorscheme,
      commentNode             : comment_node,
      controllerID            : message.controllerID,
      nodeImageURL            : message.nodeImageURL,
      nodeRef                 : this._attr.ref,
      nodeTitle               : message.nodeTitle,
      nodeURL                 : message.nodeURL,
      nodeSummary             : message.nodeSummary,
      width                   : parseFloat(message.width),
      height                  : parseFloat(message.height),
      relativeHeightOffset    : this._getHeightOffset(message),
      relativeWidthOffset     : this._getWidthOffset(message),
      error                   : message.error,
      siderender              : message.siderender,
      extended_social_context : message.extended_social_context,
      anchorTargetX           : parseFloat(message['query[anchorTargetX]']) +
                                this._rootPadding.left,
      anchorTargetY           : parseFloat(message['query[anchorTargetY]']) +
                                this._rootPadding.top
    };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _handleEdgeCommentDialogDismissal : function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    if (this._commentWidgetNode) {
      this.dom.removeChild(this._commentWidgetNode);
      delete this._commentWidgetNode;
    }
  },

  
  _handleEdgeCommentDialogHide: function() {
    if (this._commentWidgetNode) {
      this._commentWidgetNode.style.display="none";
    }
  },

  
  _handleEdgeCommentDialogShow: function() {
    if (this._commentWidgetNode) {
      this._commentWidgetNode.style.display="block";
    }
  },

  
  _fireEventAndInvokeHandler: function(/*string*/ eventName,
      /*string*/ eventAttribute) {/*TC*/__t([eventName,'string','eventName'],[eventAttribute,'string','eventAttribute']);/*/TC*/
    Helper.fireEvent(eventName, this);
    Helper.invokeHandler(
      this.getAttribute(eventAttribute), this, [this._attr.href]); 
  },

  
  _onEdgeCreate: function() {
    this._fireEventAndInvokeHandler('edge.create', 'on-create');
  },

  
  _onEdgeRemove: function() {
    this._fireEventAndInvokeHandler('edge.remove', 'on-remove');
  },

  
  _onAuthPrompt: function() {
    this._fireEventAndInvokeHandler('auth.prompt', 'on-prompt');
  }

});

module.exports = EdgeWidget;

});
__d("sdk.XFBML.SendButtonFormWidget",["sdk.XFBML.EdgeCommentWidget","sdk.DOM","sdk.Event"],function(global,require,requireDynamic,requireLazy,module,exports) {

var EdgeCommentWidget = require('sdk.XFBML.EdgeCommentWidget');
var DOM = require('sdk.DOM');
var Event = require('sdk.Event');

var SendButtonFormWidget = EdgeCommentWidget.extend({
  constructor: function(/*object*/ opts) {/*TC*/__t([opts,'object','opts']);/*/TC*/
    this.parent(opts);

    DOM.addCss(this.dom, 'fb_send_button_form_widget');
    DOM.addCss(this.dom, opts.colorscheme);
    DOM.addCss(this.dom,
      (typeof opts.siderender != 'undefined' && opts.siderender) ?
        'siderender' : '');

    
    this._attr.nodeImageURL = opts.nodeImageURL;
    this._attr.nodeRef      = opts.nodeRef;
    this._attr.nodeTitle    = opts.nodeTitle;
    this._attr.nodeURL      = opts.nodeURL;
    this._attr.nodeSummary  = opts.nodeSummary;
    this._attr.offsetX      = opts.relativeWidthOffset;
    this._attr.offsetY      = opts.relativeHeightOffset;
    this._attr.anchorTargetX = opts.anchorTargetX;
    this._attr.anchorTargetY = opts.anchorTargetY;

    
    this._attr.channel      = this.getChannelUrl();

    
    
    
    this._attr.controllerID = opts.controllerID;

    
    this._attr.colorscheme  = opts.colorscheme;

    
    this._attr.error        = opts.error;

    
    this._attr.siderender   = opts.siderender;

    
    this._attr.extended_social_context = opts.extended_social_context;
  },
  
  
  
  _showLoader: true,

  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'send_button_form_shell', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  oneTimeSetup: function() {
    this.subscribe('xd.messageSent', ES5(this._onMessageSent, 'bind', true,this));
  },

  _onMessageSent: function() {
    Event.fire('message.send', this._attr.nodeURL, this);
  }
});

module.exports = SendButtonFormWidget;

});
__d("sdk.XFBML.Like",["sdk.XFBML.EdgeWidget","sdk.XFBML.SendButtonFormWidget","XFBML"],function(global,require,requireDynamic,requireLazy,module,exports) {

var EdgeWidget = require('sdk.XFBML.EdgeWidget');
var SendButtonFormWidget = require('sdk.XFBML.SendButtonFormWidget');
var XFBML = require('XFBML');

var Like = EdgeWidget.extend({

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'like', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _createEdgeCommentWidget: function(/*object*/ message,
      /*DOMElement*/ comment_node) /*object*/ {/*TC*/__t([message,'object','message'],[comment_node,'DOMElement','comment_node']); return __t([function(){/*/TC*/
    
    
    
    if ('send' in this._attr &&
        'widget_type' in message &&
        message.widget_type == 'send') {
      var opts = this._getCommonEdgeCommentWidgetOpts(message, comment_node);
      return new SendButtonFormWidget(opts);
    } else {
      return this.parentCall("_createEdgeCommentWidget", message, comment_node);
    }
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getIframeTitle: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return 'Like this content on Facebook.';
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}
});

module.exports = Like;

});
__d("sdk.XFBML.LikeBox",["sdk.XFBML.EdgeWidget","sdk.Helper","Log","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var EdgeWidget = require('sdk.XFBML.EdgeWidget');
var Helper = require('sdk.Helper');
var Log = require('Log');
var Runtime = require('sdk.Runtime');

var LikeBox = EdgeWidget.extend({
  _visibleAfter: 'load',

  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    this._attr = {
      channel     : this.getChannelUrl(),
      api_key     : Runtime.getClientID(),
      connections : this.getAttribute('connections'),
      css         : this.getAttribute('css'),
      height      : this.getAttribute('height'),
      id          : this.getAttribute('profile-id'),
      header      : this._getBoolAttribute('header', true),
      name        : this.getAttribute('name'),
      show_faces  : this._getBoolAttribute('show-faces', true),
      stream      : this._getBoolAttribute('stream', true),
      width       : this._getPxAttribute('width', 300),
      href        : this.getAttribute('href'),
      colorscheme : this.getAttribute('colorscheme', 'light'),
      border_color: this.getAttribute('border_color')
    };

    if (this._getBoolAttribute('force_wall', false)) {
      this._attr.force_wall = true;
    }

    
    
    if (this._attr.connections === '0') {
      this._attr.show_faces = false;
    } else if (this._attr.connections) {
      this._attr.show_faces = true;
    }

    
    if (!this._attr.id && !this._attr.name && !this._attr.href) {
      Log.error('<fb:like-box> requires one of the "id" or "name" attributes.');
      return false;
    }

    var height = this._attr.height;
    if (!height) {
      if (!this._attr.show_faces &&
          !this._attr.stream) {
        height = 62;
      } else {
        height = 95;

        if (this._attr.show_faces) {
          height += 163;
        }

        if (this._attr.stream) {
          height += 300;
        }

        
        if (this._attr.header &&
            this._attr.header !== '0') {
         height += 32;
        }
      }
    }

    this._attr.height = height;

    
    this.subscribe('xd.likeboxLiked', ES5(this._onLiked, 'bind', true,this));
    this.subscribe('xd.likeboxUnliked', ES5(this._onUnliked, 'bind', true,this));

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { width: this._attr.width, height: this._attr.height };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'likebox', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _onLiked: function() {
    Helper.fireEvent('edge.create', this);
  },

  
  _onUnliked: function() {
    Helper.fireEvent('edge.remove', this);
  }
});

module.exports = LikeBox;

});
__d("sdk.XFBML.LiveStream",["sdk.XFBML.IframeWidget","XFBML"],function(global,require,requireDynamic,requireLazy,module,exports) {

var IframeWidget = require('sdk.XFBML.IframeWidget');
var XFBML = require('XFBML');

var LiveStream = IframeWidget.extend({
  _visibleAfter: 'load',

  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    this._attr = {
      app_id : this.getAttribute('event-app-id'),
      href : this.getAttribute('href', window.location.href),
      height : this._getPxAttribute('height', 500),
      hideFriendsTab : this.getAttribute('hide-friends-tab'),
      redesigned : this._getBoolAttribute('redesigned-stream'),
      width : this._getPxAttribute('width', 400),
      xid : this.getAttribute('xid', 'default'),
      always_post_to_friends : this._getBoolAttribute('always-post-to-friends'),
      via_url : this.getAttribute('via_url')
    };

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { width: this._attr.width, height: this._attr.height };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    var name = this._attr.redesigned ? 'live_stream_box' : 'livefeed';
    if (this._getBoolAttribute('modern', false)) {
      name = 'live_stream';
    }
    return { name: name, params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = LiveStream;

});
__d("sdk.XFBML.LoginButton",["sdk.Helper","IframePlugin"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Helper = require('sdk.Helper');
var IframePlugin = require('IframePlugin');

var LoginButton = IframePlugin.extend({
  constructor: function(/*DOMElement*/ elem, /*string*/ ns, /*string*/ tag,
      /*object*/ attr) {/*TC*/__t([elem,'DOMElement','elem'],[ns,'string','ns'],[tag,'string','tag'],[attr,'object','attr']);/*/TC*/
    this.parent(elem, ns, tag, attr);
    var onlogin = IframePlugin.getVal(attr, 'on_login');
    if (onlogin) {
      this.subscribe('login.status', function(/*object*/ response) {/*TC*/__t([response,'object','response']);/*/TC*/
        Helper.invokeHandler(onlogin, null, [response]);
      });
    }
  },

  getParams: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return {
      scope: 'string',
      perms: 'string', 
      size: 'string',
      login_text: 'text',
      show_faces: 'bool',
      max_rows: 'string',
      show_login_face: 'bool',
      registration_url: 'url_maybe',
      auto_logout_link: 'bool',
      one_click: 'bool'
    };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = LoginButton;

});
__d("sdk.XFBML.Name",["copyProperties","sdk.Data","escapeHTML","sdk.Event","sdk.XFBML.Element","FB","sdk.Helper","Log","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var copyProperties = require('copyProperties');
var Data = require('sdk.Data');
var escapeHTML = require('escapeHTML');
var Event = require('sdk.Event');
var Element = require('sdk.XFBML.Element');
var FB = require('FB');
var Helper = require('sdk.Helper');
var Log = require('Log');
var Runtime = require('sdk.Runtime');

var Name = Element.extend({
  
  process: function() {
    copyProperties(this, {
      _uid           : this.getAttribute('uid'),
      _firstnameonly : this._getBoolAttribute('first-name-only'),
      _lastnameonly  : this._getBoolAttribute('last-name-only'),
      _possessive    : this._getBoolAttribute('possessive'),
      _reflexive     : this._getBoolAttribute('reflexive'),
      _objective     : this._getBoolAttribute('objective'),
      _linked        : this._getBoolAttribute('linked', true),
      _subjectId     : this.getAttribute('subject-id')
    });

    if (!this._uid) {
      Log.error('"uid" is a required attribute for <fb:name>');
      this.fire('render');
      return;
    }

    var fields = [];
    if (this._firstnameonly) {
      fields.push('first_name');
    } else if (this._lastnameonly) {
      fields.push('last_name');
    } else {
      fields.push('name');
    }

    if (this._subjectId) {
      fields.push('sex');

      if (this._subjectId == Runtime.getUserID()) {
        this._reflexive = true;
      }
    }

    var data;
    
    Event.monitor('auth.statusChange', ES5(function() {
      
      if (!this.isValid()) {
        this.fire('render');
        return true; 
      }

      if (!this._uid || this._uid == 'loggedinuser') {
        this._uid = Runtime.getUserID();
      }

      if (!this._uid) {
        return; 
      }

      if (Helper.isUser(this._uid)) {
        data = Data._selectByIndex(fields, 'user', 'uid', this._uid);
      } else {
        data = Data._selectByIndex(['name', 'id'], 'profile', 'id', this._uid);
      }
      data.wait(ES5(function(/*array<object>*/ data) {
        if (this._subjectId == this._uid) {
          this._renderPronoun(data[0]);
        } else {
          this._renderOther(data[0]);
        }
        this.fire('render');
      }, 'bind', true,this));
    }, 'bind', true,this));
  },

  
  _renderPronoun: function(/*object*/ userInfo) {/*TC*/__t([userInfo,'object','userInfo']);/*/TC*/
    var
      word = '',
      objective = this._objective;
    if (this._subjectId) {
      objective = true;
      if (this._subjectId === this._uid) {
        this._reflexive = true;
      }
    }
    if (this._uid == Runtime.getUserID() &&
        this._getBoolAttribute('use-you', true)) {
      if (this._possessive) {
        if (this._reflexive) {
          word = 'your own';
        } else {
          word = 'your';
        }
      } else {
        if (this._reflexive) {
          word = 'yourself';
        } else {
          word = 'you';
        }
      }
    }
    else {
      switch (userInfo.sex) {
        case 'male':
          if (this._possessive) {
            word = this._reflexive ? 'his own' : 'his';
          } else {
            if (this._reflexive) {
              word = 'himself';
            } else if (objective) {
              word = 'him';
            } else {
              word = 'he';
            }
          }
          break;
        case 'female':
          if (this._possessive) {
            word = this._reflexive ? 'her own' : 'her';
          } else {
            if (this._reflexive) {
              word = 'herself';
            } else if (objective) {
              word = 'her';
            } else {
              word = 'she';
            }
          }
          break;
        default:
          if (this._getBoolAttribute('use-they', true)) {
            if (this._possessive) {
              if (this._reflexive) {
                word = 'their own';
              } else {
                word = 'their';
              }
            } else {
              if (this._reflexive) {
                word = 'themselves';
              } else if (objective) {
                word = 'them';
              } else {
                word = 'they';
              }
            }
          }
          else {
            if (this._possessive) {
              if (this._reflexive) {
                word = 'his/her own';
              } else {
                word = 'his/her';
              }
            } else {
              if (this._reflexive) {
                word = 'himself/herself';
              } else if (objective) {
                word = 'him/her';
              } else {
                word = 'he/she';
              }
            }
          }
          break;
      }
    }
    if (this._getBoolAttribute('capitalize', false)) {
      word = Helper.upperCaseFirstChar(word);
    }
    this.dom.innerHTML = word;
  },

  
  _renderOther: function(/*object*/ userInfo) {/*TC*/__t([userInfo,'object','userInfo']);/*/TC*/
    var
      name = '',
      html = '';
    if (this._uid == Runtime.getUserID() &&
        this._getBoolAttribute('use-you', true)) {
      if (this._reflexive) {
        if (this._possessive) {
          name = 'your own';
        } else {
          name = 'yourself';
        }
      } else {
        
        if (this._possessive) {
          name = 'your';
        } else {
          name = 'you';
        }
      }
    }
    else if (userInfo) {
      
      if (null === userInfo.first_name) {
        userInfo.first_name = '';
      }
      if (null === userInfo.last_name) {
        userInfo.last_name = '';
      }
      
      
      
      
      if (this._firstnameonly && userInfo.first_name !== undefined) {
        name = escapeHTML(userInfo.first_name);
      } else if (this._lastnameonly && userInfo.last_name !== undefined) {
        name = escapeHTML(userInfo.last_name);
      }

      if (!name) {
        name = escapeHTML(userInfo.name);
      }

      if (name !== '' && this._possessive) {
        name += '\'s';
      }
    }

    if (!name) {
      name = escapeHTML(
        this.getAttribute('if-cant-see', 'Facebook User'));
    }
    if (name) {
      if (this._getBoolAttribute('capitalize', false)) {
        name = Helper.upperCaseFirstChar(name);
      }
      if (userInfo && this._linked) {
        html = Helper.getProfileLink(userInfo, name,
          this.getAttribute('href', null));
      } else {
        html = name;
      }
    }
    this.dom.innerHTML = html;
  }
});

module.exports = Name;

});
__d("sdk.XFBML.ProfilePic",["sdk.Data","sdk.DOM","escapeHTML","sdk.XFBML.Element","sdk.Event","format","sdk.Helper","sdk.Runtime","UrlMap","ProfilePicConfig"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Data = require('sdk.Data');
var DOM = require('sdk.DOM');
var escapeHTML = require('escapeHTML');
var ProfilePicConfig = requireDynamic('ProfilePicConfig');
var Element = require('sdk.XFBML.Element');
var Event = require('sdk.Event');
var format = require('format');
var Helper = require('sdk.Helper');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');


var sizeToPicFieldMap = {
  n      : 'pic_big',
  normal : 'pic_big',
  q      : 'pic_square',
  s      : 'pic',
  small  : 'pic',
  square : 'pic_square',
  t      : 'pic_small',
  thumb  : 'pic_small'
};

var ProfilePic = Element.extend({
  
  process: function() {
    var
      size = this.getAttribute('size', 'thumb'),
      picFieldName = sizeToPicFieldMap[size],
      width = this._getPxAttribute('width'),
      height = this._getPxAttribute('height'),
      style = this.dom.style,
      uid = this.getAttribute('uid');

    
    if (this._getBoolAttribute('facebook-logo')) {
      picFieldName += '_with_logo';
    }

    if (width) {
      width = width + 'px';
      style.width = width;
    }
    if (height) {
      height = height + 'px';
      style.height = height;
    }

    var renderFn = ES5(function(/*array<object>*/ result) {
      var
        userInfo = result ? result[0] : null,
        imgSrc = userInfo ? userInfo[picFieldName] : null;

      if (!imgSrc) {
        
        imgSrc = UrlMap.resolve('fbcdn') +
          ProfilePicConfig.defPicMap[picFieldName];
      }
      
      
      var
        styleValue = (
          (width ? 'width:' + width + ';' : '') +
          (height ? 'height:' + width + ';' : '')
        ),
        html = format(
          '<img src="{0}" alt="{1}" title="{1}" style="{2}" class="{3}" />',
          imgSrc,
          userInfo ? escapeHTML(userInfo.name) : '',
          styleValue,
          this.dom.className
        );

      if (this._getBoolAttribute('linked', true)) {
        html = Helper.getProfileLink(
          userInfo,
          html,
          this.getAttribute('href', null)
        );
      }
      this.dom.innerHTML = html;
      DOM.addCss(this.dom, 'fb_profile_pic_rendered');
      this.fire('render');
    }, 'bind', true,this);

    
    Event.monitor('auth.statusChange', ES5(function() /*boolean?*/ {/*TC*/ return __t([function(){/*/TC*/
      //Is Element still in DOM tree
      if (!this.isValid()) {
        this.fire('render');
        return true; 
      }

      if (this.getAttribute('uid', null) == 'loggedinuser') {
        uid = Runtime.getUserID();
      }

      
      if (Runtime.getLoginStatus() !== 'unknown' && uid) {
        
        
        Data._selectByIndex(
          ['name', picFieldName],
          Helper.isUser(uid) ? 'user' : 'profile',
          Helper.isUser(uid) ? 'uid' : 'id',
          uid
        ).wait(renderFn);
      } else {
        
        renderFn();
      }
    /*TC*/}.apply(this, arguments), 'boolean?']);/*/TC*/}, 'bind', true,this));
  }
});

module.exports = ProfilePic;

});
__d("sdk.XFBML.RecommendationsBar",["sdk.Arbiter","DOMEventListener","sdk.Event","sdk.XFBML.IframeWidget","resolveURI","sdk.Runtime"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Arbiter = require('sdk.Arbiter');
var DOMEventListener = require('DOMEventListener');
var Event = require('sdk.Event');
var IframeWidget = require('sdk.XFBML.IframeWidget');
var resolveURI = require('resolveURI');
var Runtime = require('sdk.Runtime');

var Bar = IframeWidget.extend({

  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'recommendations_bar', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/


    function interval_queue(/*number*/ interval, /*function*/ func)
        /*function*/ {/*TC*/__t([interval,'number','interval'],[func,'function','func']); return __t([function(){/*/TC*/
      var last_run = 0;
      var queued = null;

      function run() {
        func();
        queued = null;
        last_run = ES5('Date', 'now', false);
      }
      return function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
        if (!queued) {
          var now = ES5('Date', 'now', false);
          if (now - last_run < interval) {
            queued = setTimeout(run, interval - (now - last_run));
          } else {
            run();
          }
        }
        return true;
      /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/};
    /*TC*/}.apply(this, arguments), 'function']);/*/TC*/}

    function validate_trigger(/*string?*/ trigger) {/*TC*/__t([trigger,'string?','trigger']);/*/TC*/
      if (trigger.match(/^\d+(?:\.\d+)?%$/)) {
        
        var percent = Math.min(Math.max(parseInt(trigger, 10), 0), 100);
        trigger = percent / 100;
      } else if (trigger != 'manual' && trigger != 'onvisible') {
        trigger = 'onvisible';
      }
      return trigger;
    }

    function validate_read_time(/*string?*/ read_time) /*number*/ {/*TC*/__t([read_time,'string?','read_time']); return __t([function(){/*/TC*/
      return Math.max(parseInt(read_time, 10) || 30, 10);
    /*TC*/}.apply(this, arguments), 'number']);/*/TC*/}

    function validate_side(/*string?*/ side) /*string*/ {/*TC*/__t([side,'string?','side']); return __t([function(){/*/TC*/
      if (side == 'left' || side == 'right') { 
        return side;
      }
      return Runtime.getRtl() ? 'left' : 'right'; 
    /*TC*/}.apply(this, arguments), 'string']);/*/TC*/}

    this._attr = {
      channel      : this.getChannelUrl(),
      api_key      : Runtime.getClientID(),
      font         : this.getAttribute('font'),
      colorscheme  : this.getAttribute('colorscheme'),
      href         : resolveURI(this.getAttribute('href')),
      side         : validate_side(this.getAttribute('side')),
      site         : this.getAttribute('site'),
      action       : this.getAttribute('action'),
      ref          : this.getAttribute('ref'),
      max_age      : this.getAttribute('max_age'),
      trigger      : validate_trigger(this.getAttribute('trigger', '')),
      read_time    : validate_read_time(this.getAttribute('read_time')),
      num_recommendations :
        parseInt(this.getAttribute('num_recommendations'), 10) || 2
    };

    this._showLoader = false;

    this.subscribe('iframe.onload', ES5(function() {
      var span = this.dom.children[0];
      span.className = 'fbpluginrecommendationsbar' + this._attr.side;
    }, 'bind', true,this));

    var action = ES5(function() {
      DOMEventListener.remove(window, 'scroll', action);
      DOMEventListener.remove(document.documentElement, 'click', action);
      DOMEventListener.remove(document.documentElement, 'mousemove', action);
      setTimeout(ES5(this.arbiterInform, 'bind', true,
          this,
          'platform/plugins/recommendations_bar/action',
          null,
          Arbiter.BEHAVIOR_STATE),
        this._attr.read_time * 1000); 
      return true;
    }, 'bind', true,this);
    DOMEventListener.add(window, 'scroll', action);
    DOMEventListener.add(document.documentElement, 'click', action);
    DOMEventListener.add(document.documentElement, 'mousemove', action);

    if (this._attr.trigger == "manual") {
      var manual = ES5(function(/*string*/ href) /*boolean*/ {/*TC*/__t([href,'string','href']); return __t([function(){/*/TC*/
        if (href == this._attr.href) {
          Event.unsubscribe('xfbml.recommendationsbar.read', manual);
          this.arbiterInform(
            'platform/plugins/recommendations_bar/trigger',
            null,
            Arbiter.BEHAVIOR_STATE);
        }
        return true;
      /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}, 'bind', true,this);
      Event.subscribe('xfbml.recommendationsbar.read', manual);
    } else {
      var trigger = interval_queue(500, ES5(function() {
        if (this.calculateVisibility()) {
          DOMEventListener.remove(window, 'scroll', trigger);
          DOMEventListener.remove(window, 'resize', trigger);
          this.arbiterInform('platform/plugins/recommendations_bar/trigger',
            null, Arbiter.BEHAVIOR_STATE);
        }
        return true;
      }, 'bind', true,this));
      DOMEventListener.add(window, 'scroll', trigger);
      DOMEventListener.add(window, 'resize', trigger);
      trigger(); 
    }

    this.visible = false;
    var visible = interval_queue(500, ES5(function() {
      if (!this.visible && this.calculateVisibility()) {
        this.visible = true;
        this.arbiterInform('platform/plugins/recommendations_bar/visible');
      } else if (this.visible && !this.calculateVisibility()) {
        this.visible = false;
        this.arbiterInform('platform/plugins/recommendations_bar/invisible');
      }
      return true;
    }, 'bind', true,this));
    DOMEventListener.add(window, 'scroll', visible);
    DOMEventListener.add(window, 'resize', visible);
    visible(); 

    this.focused = true;
    var toggleFocused = ES5(function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
      this.focused = !this.focused;
      return true;
    /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}, 'bind', true,this);
    DOMEventListener.add(window, 'blur', toggleFocused);
    DOMEventListener.add(window, 'focus', toggleFocused);

    this.resize_running = false;
    this.animate = false;
    this.subscribe('xd.signal_animation', ES5(function() {
      this.animate = true;
    }, 'bind', true,this));

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    
    return {
      height: 25, width: (this._attr.action == 'recommend' ? 140 : 96) };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  calculateVisibility: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    var fold = document.documentElement.clientHeight; 

    
    
    
    
    
    
    
    if (!this.focused && window.console && window.console.firebug) {
      return this.visible;
    }

    switch (this._attr.trigger) {
      case "manual":
        return false;

      case "onvisible":
        
        var elem = this.dom.getBoundingClientRect().top;
        return elem <= fold;

      default: 
        var scroll = window.pageYOffset || document.body.scrollTop;
        var height = document.documentElement.scrollHeight; 
        return (scroll + fold) / height >= this._attr.trigger;
    }
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/}
});

module.exports = Bar;

});
__d("sdk.XFBML.Registration",["sdk.Auth","sdk.Helper","sdk.XFBML.IframeWidget","sdk.Runtime","UrlMap"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Auth = require('sdk.Auth');
var Helper = require('sdk.Helper');
var IframeWidget = require('sdk.XFBML.IframeWidget');
var Runtime = require('sdk.Runtime');
var UrlMap = require('UrlMap');

var Registration = IframeWidget.extend({
  _visibleAfter: 'immediate',

  
  
  
  _baseHeight: 167,
  
  _fieldHeight: 28,

  
  _skinnyWidth: 520,
  
  
  _skinnyBaseHeight: 173,
  
  _skinnyFieldHeight: 52,

  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    this._attr = {
      action       : this.getAttribute('action'),
      border_color : this.getAttribute('border-color'),
      channel_url  : this.getChannelUrl(),
      client_id    : Runtime.getClientID(),
      fb_only      : this._getBoolAttribute('fb-only', false),
      fb_register  : this._getBoolAttribute('fb-register', false),
      fields       : this.getAttribute('fields'),
      height       : this._getPxAttribute('height'),
      redirect_uri : this.getAttribute('redirect-uri', window.location.href),
      no_footer    : this._getBoolAttribute('no-footer'),
      no_header    : this._getBoolAttribute('no-header'),
      onvalidate   : this.getAttribute('onvalidate'),
      width        : this._getPxAttribute('width', 600),
      target       : this.getAttribute('target')
    };
    
    

    if (this._attr.onvalidate) {
      this.subscribe('xd.validate', ES5(function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
        var value = ES5('JSON', 'parse', false,message.value);
        var callback = ES5(function(errors) {
          this.arbiterInform('Registration.Validation',
                             { errors: errors, id: message.id });
        }, 'bind', true,this);

        
        var response = Helper.executeFunctionByName(this._attr.onvalidate,
                                                       value, callback);

        
        if (response) {
          callback(response);
        }
      }, 'bind', true,this));
    }

    this.subscribe('xd.authLogin', ES5(this._onAuthLogin, 'bind', true,this));
    this.subscribe('xd.authLogout', ES5(this._onAuthLogout, 'bind', true,this));

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { width: this._attr.width, height: this._getHeight() };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  _getHeight: function() /*number*/ {/*TC*/ return __t([function(){/*/TC*/
    if (this._attr.height) {
      return this._attr.height;
    }
    var fields;
    if (!this._attr.fields) {
      
      fields = ['name'];
    } else {
      try {
        
        fields = ES5('JSON', 'parse', false,this._attr.fields);
      } catch (e) {
        
        fields = this._attr.fields.split(/,/);
      }
    }

    if (this._attr.width < this._skinnyWidth) {
      return this._skinnyBaseHeight + fields.length * this._skinnyFieldHeight;
    } else {
      return this._baseHeight + fields.length * this._fieldHeight;
    }
  /*TC*/}.apply(this, arguments), 'number']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'registration', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getDefaultWebDomain: function() /*string*/ {/*TC*/ return __t([function(){/*/TC*/
    return UrlMap.resolve('www', true);
  /*TC*/}.apply(this, arguments), 'string']);/*/TC*/},

  
  _onAuthLogin: function() {
    if (!Auth.getAuthResponse()) {
      Auth.getLoginStatus();
    }
    Helper.fireEvent('auth.login', this);
  },

  
  _onAuthLogout: function() {
    if (!Auth.getAuthResponse()) {
      Auth.getLoginStatus();
    }
    Helper.fireEvent('auth.logout', this);
  }

});

module.exports = Registration;

});
__d("sdk.XFBML.Send",["sdk.DOM","sdk.XFBML.EdgeWidget","sdk.Runtime","sdk.XFBML.SendButtonFormWidget"],function(global,require,requireDynamic,requireLazy,module,exports) {

var DOM = require('sdk.DOM');
var EdgeWidget = require('sdk.XFBML.EdgeWidget');
var Runtime = require('sdk.Runtime');
var SendButtonFormWidget = require('sdk.XFBML.SendButtonFormWidget');

var Send = EdgeWidget.extend({
  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    DOM.addCss(this.dom, 'fb_edge_widget_with_comment');
    this._attr = {
      channel                 : this.getChannelUrl(),
      api_key                 : Runtime.getClientID(),
      font                    : this.getAttribute('font'),
      colorscheme             : this.getAttribute('colorscheme', 'light'),
      href                    : this.getAttribute('href', window.location.href),
      ref                     : this.getAttribute('ref'),
      extended_social_context :
        this.getAttribute('extended_social_context', false)
    };

    this._rootPadding = {
      left: parseFloat(DOM.getStyle(this.dom, 'paddingLeft')),
      top:  parseFloat(DOM.getStyle(this.dom, 'paddingTop'))
    };

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'send', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  _createEdgeCommentWidget: function(/*object*/ message,
      /*DOMElement*/ comment_node) /*object*/ {/*TC*/__t([message,'object','message'],[comment_node,'DOMElement','comment_node']); return __t([function(){/*/TC*/
    var opts = this._getCommonEdgeCommentWidgetOpts(message, comment_node);
    return new SendButtonFormWidget(opts);
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return {
      width  : 80,
      height : 25
    };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = Send;

});
__d("sdk.XFBML.SocialContext",["sdk.Event","sdk.XFBML.IframeWidget"],function(global,require,requireDynamic,requireLazy,module,exports) {

var Event = require('sdk.Event');
var IframeWidget = require('sdk.XFBML.IframeWidget');

var SocialContext = IframeWidget.extend({
  
  setupAndValidate: function() /*boolean*/ {/*TC*/ return __t([function(){/*/TC*/
    var size = this.getAttribute('size', 'small');
    this._attr = {
      channel: this.getChannelUrl(),
      width: this._getPxAttribute('width', 400),
      height: this._getPxAttribute('height', 100),
      ref: this.getAttribute('ref'),
      size: this.getAttribute('size'),
      keywords: this.getAttribute('keywords'),
      urls: this.getAttribute('urls'),
      object_id: this.getAttribute('object_id')
    };

    this.subscribe(
      'xd.social_context_stats', ES5(this._bubbleSocialContextStats, 'bind', true,this));

    return true;
  /*TC*/}.apply(this, arguments), 'boolean']);/*/TC*/},

  
  _bubbleSocialContextStats: function(/*object*/ message) {/*TC*/__t([message,'object','message']);/*/TC*/
    var filtered_message = {
      pluginID: this.getAttribute('plugin-id'),
      socialContextPageIDs: ES5('JSON', 'parse', false,message.social_context_page_ids)
    };
    Event.fire('xfbml.social_context_stats', filtered_message);
  },

  
  getSize: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { width: this._attr.width, height: this._attr.height };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/},

  
  getUrlBits: function() /*object*/ {/*TC*/ return __t([function(){/*/TC*/
    return { name: 'social_context', params: this._attr };
  /*TC*/}.apply(this, arguments), 'object']);/*/TC*/}
});

module.exports = SocialContext;

});
__d("legacy:fb.xfbml",["Assert","sdk.domReady","sdk.Event","FB","IframePlugin","PluginTags","wrapFunction","XFBML","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.ConnectBar","sdk.XFBML.Fan","sdk.XFBML.Like","sdk.XFBML.LikeBox","sdk.XFBML.LiveStream","sdk.XFBML.LoginButton","sdk.XFBML.Name","sdk.XFBML.ProfilePic","sdk.XFBML.RecommendationsBar","sdk.XFBML.Registration","sdk.XFBML.Send","sdk.XFBML.SocialContext"],function(global,require,requireDynamic,requireLazy) {

var Assert = require('Assert');
var domReady = require('sdk.domReady');
var Event = require('sdk.Event');
var FB = require('FB');
var IframePlugin = require('IframePlugin');
var PluginTags = require('PluginTags');
var wrapFunction = require('wrapFunction');
var XFBML = require('XFBML');

var customTags = {
  comments: require('sdk.XFBML.Comments'),
  comments_count: require('sdk.XFBML.CommentsCount'),
  connect_bar: require('sdk.XFBML.ConnectBar'),
  fan: require('sdk.XFBML.Fan'),
  like: require('sdk.XFBML.Like'),
  like_box: require('sdk.XFBML.LikeBox'),
  live_stream: require('sdk.XFBML.LiveStream'),
  login_button: require('sdk.XFBML.LoginButton'),
  name: require('sdk.XFBML.Name'),
  profile_pic: require('sdk.XFBML.ProfilePic'),
  recommendations_bar: require('sdk.XFBML.RecommendationsBar'),
  registration: require('sdk.XFBML.Registration'),
  send: require('sdk.XFBML.Send'),
  social_context: require('sdk.XFBML.SocialContext')
};


ES5(ES5('Object', 'keys', false,PluginTags), 'forEach', true,function(tag) {
  XFBML.registerTag({
    xmlns: 'fb',
    localName: tag.replace(/_/g, '-'),
    ctor: IframePlugin.withParams(PluginTags[tag])
  });
});


ES5(ES5('Object', 'keys', false,customTags), 'forEach', true,function(tag) {
  XFBML.registerTag({
    xmlns: 'fb',
    localName: tag.replace(/_/g, '-'),
    ctor: customTags[tag]
  });
});

FB.provide('XFBML', {
  parse: function(dom) {
    Assert.maybeXfbml(dom, 'Invalid argument');

    
    if (dom && dom.nodeType === 9) {
      dom = dom.body;
    }
    return XFBML.parse.apply(null, arguments);
  }
});

FB.provide('XFBML.RecommendationsBar', {
  
  markRead: function(href) {
    Event.fire('xfbml.recommendationsbar.read', href || window.location.href);
  }
});

XFBML.subscribe('parse', ES5(Event.fire, 'bind', true,Event, 'xfbml.parse'));
XFBML.subscribe('render', ES5(Event.fire, 'bind', true,Event, 'xfbml.render'));

Event.subscribe('init:post', function(options) {
  if (options.xfbml) {
    
    setTimeout(
      wrapFunction(
        ES5(domReady, 'bind', true,null, XFBML.parse),
        'entry',
        'init:post:xfbml.parse'
      ),
      0
    );
  }
});

Assert.define('Xfbml', function(element) {
  return (element.nodeType === 1 || element.nodeType === 9) &&
         typeof element.nodeName === 'string';
});




try {
  if (document.namespaces && !document.namespaces.item.fb) {
     document.namespaces.add('fb');
  }
} catch(e) {
  
}

},3);


void(0);



}).call({}, window.inDapIF ? parent.window : window);
} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","message":"'+e.message+'"}}');}