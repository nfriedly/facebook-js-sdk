/*1620875968,,JIT Construction: v1003781883,en_US*/

/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
try {
  (window.FB && !window.FB.__buffer) ||
    (function(window, fb_fif_window) {
      var apply = Function.prototype.apply;
      function bindContext(fn, thisArg) {
        return function _sdkBound() {
          return apply.call(fn, thisArg, arguments);
        };
      }
      var global = {
        __type: "JS_SDK_SANDBOX",
        window: window,
        document: window.document
      };
      var sandboxWhitelist = [
        "setTimeout",
        "setInterval",
        "clearTimeout",
        "clearInterval"
      ];
      for (var i = 0; i < sandboxWhitelist.length; i++) {
        global[sandboxWhitelist[i]] = bindContext(
          window[sandboxWhitelist[i]],
          window
        );
      }
      (function() {
        var self = window;
        var __DEV__ = 1;
        function emptyFunction() {}
        var __transform_includes = {};
        var __annotator, __bodyWrapper;
        var __buffer = window.FB && window.FB.__buffer;
        var __w, __t;
        var undefined;
        with (this) {
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @provides GenericFunctionVisitor
           * @polyfill
           *
           * This file contains the functions used for the generic JS function
           * transform. Please add your functionality to these functions if you
           * want to wrap or annotate functions.
           *
           * Please see the DEX https://fburl.com/80903169 for more information.
           */

          (function() {
            var funcCalls = {};

            var createMeta = function createMeta(type, signature) {
              if (!type && !signature) {
                return null;
              }

              var meta = {};
              if (typeof type !== "undefined") {
                meta.type = type;
              }

              if (typeof signature !== "undefined") {
                meta.signature = signature;
              }

              return meta;
            };

            var getMeta = function getMeta(name, params) {
              return createMeta(
                name && /^[A-Z]/.test(name) ? name : undefined,
                params &&
                  ((params.params && params.params.length) || params.returns)
                  ? "function(" +
                      (params.params
                        ? params.params
                            .map(function params_params_map_$0(param) {
                              return /\?/.test(param)
                                ? "?" + param.replace("?", "")
                                : param;
                            })
                            .join(",")
                        : "") +
                      ")" +
                      (params.returns ? ":" + params.returns : "")
                  : undefined
              );
            };

            var noopAnnotator = function noopAnnotator(fn, funcMeta, params) {
              return fn;
            };

            var genericAnnotator = function genericAnnotator(
              fn,
              funcMeta,
              params
            ) {
              if ("sourcemeta" in __transform_includes) {
                fn.__SMmeta = funcMeta;
              }

              if ("typechecks" in __transform_includes) {
                var meta = getMeta(
                  funcMeta ? funcMeta.name : undefined,
                  params
                );
                if (meta) {
                  __w(fn, meta);
                }
              }
              return fn;
            };

            var noopBodyWrapper = function noopBodyWrapper(scope, args, fn) {
              return fn.apply(scope, args);
            };

            var typecheckBodyWrapper = function typecheckBodyWrapper(
              scope,
              args,
              fn,
              params
            ) {
              if (params && params.params) {
                __t.apply(scope, params.params);
              }

              var result = fn.apply(scope, args);

              if (params && params.returns) {
                __t([result, params.returns]);
              }

              return result;
            };

            var codeUsageBodyWrapper = function codeUsageBodyWrapper(
              scope,
              args,
              fn,
              params,
              funcMeta
            ) {
              if (funcMeta) {
                if (!funcMeta.callId) {
                  funcMeta.callId =
                    funcMeta.module +
                    ":" +
                    (funcMeta.line || 0) +
                    ":" +
                    (funcMeta.column || 0);
                }
                var key = funcMeta.callId;
                funcCalls[key] = (funcCalls[key] || 0) + 1;
              }
              return fn.apply(scope, args);
            };

            if (typeof __transform_includes === "undefined") {
              __annotator = noopAnnotator;
              __bodyWrapper = noopBodyWrapper;
            } else {
              __annotator = genericAnnotator;

              if ("codeusage" in __transform_includes) {
                __annotator = noopAnnotator;
                __bodyWrapper = codeUsageBodyWrapper;
                __bodyWrapper.getCodeUsage = function() {
                  return funcCalls;
                };
                __bodyWrapper.clearCodeUsage = function() {
                  funcCalls = {};
                };
              } else if ("typechecks" in __transform_includes) {
                __bodyWrapper = __DEV__
                  ? typecheckBodyWrapper
                  : noopBodyWrapper;
              } else {
                __bodyWrapper = noopBodyWrapper;
              }
            }
          })();
          __t = function(x) {
            return x[0];
          };
          __w = function(x) {
            return x;
          };
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * This is a lightweigh implementation of require and __d which is used by the
           * JavaScript SDK.
           * This implementation requires that all modules are defined in order by how
           * they depend on each other, so that it is guaranteed that no module will
           * require a module that has not got all of its dependencies satisfied.
           * This means that it is generally only usable in cases where all resources are
           * resolved and packaged together.
           *
           * @providesInline fbmodule-runtime-lite
           * @format
           *  strict
           */

          (function(global) {
            var map = {};

            var defaultCJSDeps = [
              "global",
              "require",
              "requireDynamic",
              "requireLazy",
              "module",
              "exports"
            ];

            var defaultESMDeps = [
              "global",
              "require",
              "importDefault",
              "importNamespace",
              "requireLazy",
              "module",
              "exports"
            ];

            var REQUIRE_WHEN_READY = 1;
            var ES_MODULE_IMPORTS = 32;
            var ES_MODULE_EXPORTS = 64;
            var EMPTY = {};
            var hasOwnProperty = Object.prototype.hasOwnProperty;

            function getOrIntializeModule(id, soft) {
              if (!hasOwnProperty.call(map, id)) {
                if (soft) {
                  return null;
                }
                throw new Error("Module " + id + " has not been defined");
              }

              var module = map[id];
              if (module.resolved) {
                return module;
              }

              var _special = module.special;
              var length = module.factory.length;

              var deps =
                _special & ES_MODULE_IMPORTS
                  ? defaultESMDeps.concat(module.deps)
                  : defaultCJSDeps.concat(module.deps);

              var args = [];
              var dep;
              for (var i = 0; i < length; i++) {
                switch (deps[i]) {
                  case "module":
                    dep = module;
                    break;
                  case "exports":
                    dep = module.exports;
                    break;
                  case "global":
                    dep = global;
                    break;
                  case "require":
                    dep = requireInterop;
                    break;
                  case "requireDynamic":
                    dep = null;
                    break;
                  case "requireLazy":
                    dep = null;
                    break;
                  case "importDefault":
                    dep = importDefault;
                    break;
                  case "importNamespace":
                    dep = importNamespace;
                    break;
                  default:
                    if (typeof deps[i] === "string") {
                      dep = requireInterop.call(null, deps[i]);
                    }
                }

                args.push(dep);
              }
              var ret = module.factory.apply(global, args);

              if (ret) {
                module.exports = ret;
              }

              if (_special & ES_MODULE_EXPORTS) {
                if (
                  module.exports != null &&
                  hasOwnProperty.call(module.exports, "default")
                ) {
                  module.defaultExport = module.exports["default"];
                }
              } else {
                module.defaultExport = module.exports;
              }

              module.resolved = true;

              return module;
            }

            function requireInterop(id, soft) {
              var module = getOrIntializeModule(id, soft);

              if (module) {
                return module.defaultExport !== EMPTY
                  ? module.defaultExport
                  : module.exports;
              }
            }

            function importDefault(id) {
              var module = getOrIntializeModule(id);

              if (module) {
                return module.defaultExport !== EMPTY
                  ? module.defaultExport
                  : null;
              }
            }

            function importNamespace(id) {
              var module = getOrIntializeModule(id);

              if (module) {
                return module.exports;
              }
            }

            function define(id, deps, factory, _special) {
              if (typeof factory === "function") {
                map[id] = {
                  factory: factory,
                  deps: deps,
                  defaultExport: EMPTY,
                  exports: {},
                  special: _special || 0,
                  resolved: false
                };

                if (_special != null && _special & REQUIRE_WHEN_READY) {
                  requireInterop.call(null, id);
                }
              } else {
                map[id] = {
                  defaultExport: factory,
                  exports: factory,
                  resolved: true
                };
              }
            }

            global.__d = define;
            global.require = requireInterop;
            global.importDefault = importDefault;
            global.importNamespace = importNamespace;

            global.$RefreshReg$ = function() {};
            global.$RefreshSig$ = function() {
              return function(type) {
                return type;
              };
            };
          })(this);
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES5FunctionPrototype",
            [],
            function $module_ES5FunctionPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES5FunctionPrototype = {};

              ES5FunctionPrototype.bind = function(context) {
                if (typeof this !== "function") {
                  throw new TypeError("Bind must be called on a function");
                }
                var target = this;
                var appliedArguments = Array.prototype.slice.call(arguments, 1);
                function bound() {
                  return target.apply(
                    context,
                    appliedArguments.concat(
                      Array.prototype.slice.call(arguments)
                    )
                  );
                }
                bound.displayName =
                  "bound:" + (target.displayName || target.name || "(?)");
                bound.toString = function toString() {
                  return "bound: " + target;
                };
                return bound;
              };

              module.exports = ES5FunctionPrototype;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES5StringPrototype",
            [],
            function $module_ES5StringPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES5StringPrototype = {};

              ES5StringPrototype.trim = function() {
                if (this == null) {
                  throw new TypeError(
                    "String.prototype.trim called on null or undefined"
                  );
                }
                return String.prototype.replace.call(this, /^\s+|\s+$/g, "");
              };

              ES5StringPrototype.startsWith = function(search) {
                var string = String(this);
                if (this == null) {
                  throw new TypeError(
                    "String.prototype.startsWith called on null or undefined"
                  );
                }
                var pos = arguments.length > 1 ? Number(arguments[1]) : 0;
                if (isNaN(pos)) {
                  pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), string.length);
                return string.indexOf(String(search), pos) == start;
              };

              ES5StringPrototype.endsWith = function(search) {
                var string = String(this);
                if (this == null) {
                  throw new TypeError(
                    "String.prototype.endsWith called on null or undefined"
                  );
                }
                var stringLength = string.length;
                var searchString = String(search);
                var pos =
                  arguments.length > 1 ? Number(arguments[1]) : stringLength;
                if (isNaN(pos)) {
                  pos = 0;
                }
                var end = Math.min(Math.max(pos, 0), stringLength);
                var start = end - searchString.length;
                if (start < 0) {
                  return false;
                }
                return string.lastIndexOf(searchString, start) == start;
              };

              ES5StringPrototype.includes = function(search) {
                if (this == null) {
                  throw new TypeError(
                    "String.prototype.contains called on null or undefined"
                  );
                }
                var string = String(this);
                var pos = arguments.length > 1 ? Number(arguments[1]) : 0;
                if (isNaN(pos)) {
                  pos = 0;
                }
                return string.indexOf(String(search), pos) != -1;
              };

              ES5StringPrototype.contains = ES5StringPrototype.includes;

              ES5StringPrototype.repeat = function(count) {
                if (this == null) {
                  throw new TypeError(
                    "String.prototype.repeat called on null or undefined"
                  );
                }
                var string = String(this);
                var n = count ? Number(count) : 0;
                if (isNaN(n)) {
                  n = 0;
                }
                if (n < 0 || n === Infinity) {
                  throw RangeError();
                }
                if (n === 1) {
                  return string;
                }
                if (n === 0) {
                  return "";
                }
                var result = "";
                while (n) {
                  if (n & 1) {
                    result += string;
                  }
                  if ((n >>= 1)) {
                    string += string;
                  }
                }
                return result;
              };

              module.exports = ES5StringPrototype;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES6Array",
            [],
            function $module_ES6Array(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var ES6Array = {
                from: function from(arrayLike) {
                  if (arrayLike == null) {
                    throw new TypeError("Object is null or undefined");
                  }

                  var mapFn = arguments[1];
                  var thisArg = arguments[2];

                  var C = this;
                  var items = Object(arrayLike);
                  var symbolIterator =
                    typeof Symbol === "function"
                      ? typeof Symbol === "function"
                        ? Symbol.iterator
                        : "@@iterator"
                      : "@@iterator";
                  var mapping = typeof mapFn === "function";
                  var usingIterator =
                    typeof items[symbolIterator] === "function";
                  var key = 0;
                  var ret;
                  var value;

                  if (usingIterator) {
                    ret = typeof C === "function" ? new C() : [];
                    var it = items[symbolIterator]();
                    var next;

                    while (!(next = it.next()).done) {
                      value = next.value;

                      if (mapping) {
                        value = mapFn.call(thisArg, value, key);
                      }

                      ret[key] = value;
                      key += 1;
                    }

                    ret.length = key;
                    return ret;
                  }

                  var len = items.length;
                  if (isNaN(len) || len < 0) {
                    len = 0;
                  }

                  ret = typeof C === "function" ? new C(len) : new Array(len);

                  while (key < len) {
                    value = items[key];

                    if (mapping) {
                      value = mapFn.call(thisArg, value, key);
                    }

                    ret[key] = value;

                    key += 1;
                  }

                  ret.length = key;
                  return ret;
                }
              };

              module.exports = ES6Array;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES6ArrayPrototype",
            [],
            function $module_ES6ArrayPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES6ArrayPrototype = {
                find: function find(predicate, thisArg) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.find called on null or undefined"
                    );
                  }
                  if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function");
                  }

                  var index = ES6ArrayPrototype.findIndex.call(
                    this,
                    predicate,
                    thisArg
                  );
                  return index === -1 ? void 0 : this[index];
                },

                findIndex: function findIndex(predicate, thisArg) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.findIndex called on null or undefined"
                    );
                  }
                  if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function");
                  }
                  var list = Object(this);
                  var length = list.length >>> 0;
                  for (var i = 0; i < length; i++) {
                    if (predicate.call(thisArg, list[i], i, list)) {
                      return i;
                    }
                  }
                  return -1;
                },

                fill: function fill(value) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.fill called on null or undefined"
                    );
                  }
                  var O = Object(this);
                  var len = O.length >>> 0;
                  var start = arguments[1];
                  var relativeStart = start >> 0;
                  var k =
                    relativeStart < 0
                      ? Math.max(len + relativeStart, 0)
                      : Math.min(relativeStart, len);
                  var end = arguments[2];
                  var relativeEnd = end === undefined ? len : end >> 0;
                  var final =
                    relativeEnd < 0
                      ? Math.max(len + relativeEnd, 0)
                      : Math.min(relativeEnd, len);
                  while (k < final) {
                    O[k] = value;
                    k++;
                  }
                  return O;
                }
              };

              module.exports = ES6ArrayPrototype;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES6Number",
            [],
            function $module_ES6Number(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var EPSILON = Math.pow(2, -52);
              var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
              var MIN_SAFE_INTEGER = -1 * MAX_SAFE_INTEGER;

              var ES6Number = {
                isFinite: (function(_isFinite) {
                  function isFinite(_x) {
                    return _isFinite.apply(this, arguments);
                  }
                  isFinite.toString = function() {
                    return _isFinite.toString();
                  };
                  return isFinite;
                })(function(value) {
                  return typeof value === "number" && isFinite(value);
                }),

                isNaN: (function(_isNaN) {
                  function isNaN(_x2) {
                    return _isNaN.apply(this, arguments);
                  }
                  isNaN.toString = function() {
                    return _isNaN.toString();
                  };
                  return isNaN;
                })(function(value) {
                  return typeof value === "number" && isNaN(value);
                }),

                isInteger: function isInteger(value) {
                  return this.isFinite(value) && Math.floor(value) === value;
                },

                isSafeInteger: function isSafeInteger(value) {
                  return (
                    this.isFinite(value) &&
                    value >= this.MIN_SAFE_INTEGER &&
                    value <= this.MAX_SAFE_INTEGER &&
                    Math.floor(value) === value
                  );
                },

                EPSILON: EPSILON,
                MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
                MIN_SAFE_INTEGER: MIN_SAFE_INTEGER
              };

              module.exports = ES6Number;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ie8DontEnum",
            [],
            function $module_ie8DontEnum(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var dontEnumProperties = [
                "toString",
                "toLocaleString",
                "valueOf",
                "hasOwnProperty",
                "isPrototypeOf",
                "prototypeIsEnumerable",
                "constructor"
              ];

              var hasOwnProperty = {}.hasOwnProperty;

              var ie8DontEnum = function ie8DontEnum() {};

              if ({ toString: true }.propertyIsEnumerable("toString")) {
                ie8DontEnum = function ie8DontEnum(object, onProp) {
                  for (var i = 0; i < dontEnumProperties.length; i++) {
                    var property = dontEnumProperties[i];
                    if (hasOwnProperty.call(object, property)) {
                      onProp(property);
                    }
                  }
                };
              }

              module.exports = ie8DontEnum;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES6Object",
            ["ie8DontEnum"],
            function $module_ES6Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES6Object = {
                assign: function assign(target) {
                  if (target == null) {
                    throw new TypeError(
                      "Object.assign target cannot be null or undefined"
                    );
                  }

                  target = Object(target);

                  for (
                    var i = 0;
                    i < (arguments.length <= 1 ? 0 : arguments.length - 1);
                    i++
                  ) {
                    var source =
                      i + 1 < 1 || arguments.length <= i + 1
                        ? undefined
                        : arguments[i + 1];

                    if (source == null) {
                      continue;
                    }

                    source = Object(source);

                    for (var prop in source) {
                      if (hasOwnProperty.call(source, prop)) {
                        target[prop] = source[prop];
                      }
                    }

                    require("ie8DontEnum")(source, function ie8DontEnum_$1(
                      prop
                    ) {
                      return (target[prop] = source[prop]);
                    });
                  }

                  return target;
                },

                is: function is(x, y) {
                  if (x === y) {
                    return x !== 0 || 1 / x === 1 / y;
                  } else {
                    return x !== x && y !== y;
                  }
                }
              };

              module.exports = ES6Object;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES5Array",
            [],
            function $module_ES5Array(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES5Array = {};

              ES5Array.isArray = function(object) {
                return (
                  Object.prototype.toString.call(object) == "[object Array]"
                );
              };

              module.exports = ES5Array;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES5ArrayPrototype",
            [],
            function $module_ES5ArrayPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES5ArrayPrototype = {};

              ES5ArrayPrototype.map = function(func, context) {
                if (typeof func !== "function") {
                  throw new TypeError();
                }

                var ii;
                var len = this.length;
                var r = new Array(len);
                for (ii = 0; ii < len; ++ii) {
                  if (ii in this) {
                    r[ii] = func.call(context, this[ii], ii, this);
                  }
                }

                return r;
              };

              ES5ArrayPrototype.forEach = function(func, context) {
                ES5ArrayPrototype.map.call(this, func, context);
              };

              ES5ArrayPrototype.filter = function(func, context) {
                if (typeof func !== "function") {
                  throw new TypeError();
                }

                var ii;
                var val;
                var len = this.length;
                var r = [];
                for (ii = 0; ii < len; ++ii) {
                  if (ii in this) {
                    val = this[ii];
                    if (func.call(context, val, ii, this)) {
                      r.push(val);
                    }
                  }
                }

                return r;
              };

              ES5ArrayPrototype.every = function(func, context) {
                if (typeof func !== "function") {
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

              ES5ArrayPrototype.some = function(func, context) {
                if (typeof func !== "function") {
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
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           *
           */ __d(
            "ES7ArrayPrototype",
            ["ES5Array", "ES5ArrayPrototype"],
            function $module_ES7ArrayPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var isArray = require("ES5Array").isArray;
              var indexOf = require("ES5ArrayPrototype").indexOf;

              function toLength(number) {
                return Math.min(
                  Math.max(toInteger(number), 0),
                  Number.MAX_SAFE_INTEGER
                );
              }

              function toInteger(number) {
                var n = Number(number);
                return isFinite(n) && n !== 0
                  ? sign(n) * Math.floor(Math.abs(n))
                  : n;
              }

              function sign(number) {
                return number >= 0 ? 1 : -1;
              }

              var ES7ArrayPrototype = {
                includes: function includes(needle) {
                  "use strict";

                  if (
                    needle !== undefined &&
                    isArray(this) &&
                    !(typeof needle === "number" && isNaN(needle))
                  ) {
                    return indexOf.apply(this, arguments) !== -1;
                  }

                  var o = Object(this);
                  var len = o.length ? toLength(o.length) : 0;

                  if (len === 0) {
                    return false;
                  }

                  var fromIndex =
                    arguments.length > 1 ? toInteger(arguments[1]) : 0;

                  var i =
                    fromIndex < 0 ? Math.max(len + fromIndex, 0) : fromIndex;

                  var NaNLookup = isNaN(needle) && typeof needle === "number";

                  while (i < len) {
                    var value = o[i];
                    if (
                      value === needle ||
                      (typeof value === "number" && NaNLookup && isNaN(value))
                    ) {
                      return true;
                    }
                    i++;
                  }
                  return false;
                }
              };

              module.exports = ES7ArrayPrototype;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES7Object",
            ["ie8DontEnum"],
            function $module_ES7Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES7Object = {};

              ES7Object.entries = function(object) {
                if (object == null) {
                  throw new TypeError("Object.entries called on non-object");
                }

                var entries = [];
                for (var key in object) {
                  if (hasOwnProperty.call(object, key)) {
                    entries.push([key, object[key]]);
                  }
                }

                require("ie8DontEnum")(object, function ie8DontEnum_$1(prop) {
                  return entries.push([prop, object[prop]]);
                });

                return entries;
              };

              ES7Object.values = function(object) {
                if (object == null) {
                  throw new TypeError("Object.values called on non-object");
                }

                var values = [];
                for (var key in object) {
                  if (hasOwnProperty.call(object, key)) {
                    values.push(object[key]);
                  }
                }

                require("ie8DontEnum")(object, function ie8DontEnum_$1(prop) {
                  return values.push(object[prop]);
                });

                return values;
              };

              module.exports = ES7Object;
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES7StringPrototype",
            [],
            function $module_ES7StringPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ES7StringPrototype = {};

              ES7StringPrototype.trimLeft = function() {
                return this.replace(/^\s+/, "");
              };

              ES7StringPrototype.trimRight = function() {
                return this.replace(/\s+$/, "");
              };

              module.exports = ES7StringPrototype;
            },
            null
          );
          /**
           * MIT License
           *
           * Copyright (c) 2017 The copyright holders
           *
           * Permission is hereby granted, free of charge, to any person obtaining a copy
           * of this software and associated documentation files (the "Software"), to deal
           *  in the Software without restriction, including without limitation the rights
           *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell co
           * pies of the Software, and to permit persons to whom the Software is furnished
           *  to do so, subject to the following conditions:
           *
           * The above copyright notice and this permission notice shall be included in al
           * l copies or substantial portions of the Software.
           *
           * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IM
           * PLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNES
           * S FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
           *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WH
           * ETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
           *  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
           *
           * THIS FILE HAS BEEN AUTOMATICALLY GENERATED AND IS NOT MEANT TO BE
           * EDITED THROUGH NORMAL MEANS. PLEASE CHECK THE DOCUMENTATION FOR
           * DETAILS AND GUIDANCE: http://fburl.com/js-libs-www
           *
           * @preserve-header
           * @nolint
           */
          __d(
            "json3-3.3.2",
            [],
            function $module_json3_3_3_2(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var exports$1 = {};
              var module$1 = { exports: exports$1 };

              var define;

              function TROMPLE_MAIN() {
                (function() {
                  // Detect the `define` function exposed by asynchronous module loaders. The
                  // strict `define` check is necessary for compatibility with `r.js`.
                  var isLoader = typeof define === "function" && define.amd;

                  // A set of types used to distinguish objects from primitives.
                  var objectTypes = {
                    function: true,
                    object: true
                  };

                  // Detect the `exports` object exposed by CommonJS implementations.
                  var freeExports =
                    objectTypes[typeof exports$1] &&
                    exports$1 &&
                    !exports$1.nodeType &&
                    exports$1;

                  // Use the `global` object exposed by Node (including Browserify via
                  // `insert-module-globals`), Narwhal, and Ringo as the default context,
                  // and the `window` object in browsers. Rhino exports a `global` function
                  // instead.
                  var root = (objectTypes[typeof window] && window) || this,
                    freeGlobal =
                      freeExports &&
                      objectTypes[typeof module$1] &&
                      module$1 &&
                      !module$1.nodeType &&
                      typeof global == "object" &&
                      global;

                  if (
                    freeGlobal &&
                    (freeGlobal["global"] === freeGlobal ||
                      freeGlobal["window"] === freeGlobal ||
                      freeGlobal["self"] === freeGlobal)
                  ) {
                    root = freeGlobal;
                  }

                  // Public: Initializes JSON 3 using the given `context` object, attaching the
                  // `stringify` and `parse` functions to the specified `exports` object.
                  function runInContext(context, exports) {
                    context || (context = root["Object"]());
                    exports || (exports = root["Object"]());

                    // Native constructor aliases.
                    var Number = context["Number"] || root["Number"],
                      String = context["String"] || root["String"],
                      Object = context["Object"] || root["Object"],
                      Date = context["Date"] || root["Date"],
                      SyntaxError =
                        context["SyntaxError"] || root["SyntaxError"],
                      TypeError = context["TypeError"] || root["TypeError"],
                      Math = context["Math"] || root["Math"],
                      nativeJSON = context["JSON"] || root["JSON"];

                    // Delegate to the native `stringify` and `parse` implementations.
                    if (typeof nativeJSON == "object" && nativeJSON) {
                      exports.stringify = nativeJSON.stringify;
                      exports.parse = nativeJSON.parse;
                    }

                    // Convenience aliases.
                    var objectProto = Object.prototype,
                      getClass = objectProto.toString,
                      isProperty,
                      forEach,
                      undef;

                    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
                    var isExtended = new Date(-3509827334573292);
                    try {
                      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
                      // results for certain dates in Opera >= 10.53.
                      isExtended =
                        isExtended.getUTCFullYear() == -109252 &&
                        isExtended.getUTCMonth() === 0 &&
                        isExtended.getUTCDate() === 1 &&
                        // Safari < 2.0.2 stores the internal millisecond time value correctly,
                        // but clips the values returned by the date methods to the range of
                        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
                        isExtended.getUTCHours() == 10 &&
                        isExtended.getUTCMinutes() == 37 &&
                        isExtended.getUTCSeconds() == 6 &&
                        isExtended.getUTCMilliseconds() == 708;
                    } catch (exception) {}

                    // Internal: Determines whether the native `JSON.stringify` and `parse`
                    // implementations are spec-compliant. Based on work by Ken Snyder.
                    function has(name) {
                      if (has[name] !== undef) {
                        // Return cached feature test result.
                        return has[name];
                      }
                      var isSupported;
                      if (name == "bug-string-char-index") {
                        // IE <= 7 doesn't support accessing string characters using square
                        // bracket notation. IE 8 only supports this for primitives.
                        isSupported = "a"[0] != "a";
                      } else if (name == "json") {
                        // Indicates whether both `JSON.stringify` and `JSON.parse` are
                        // supported.
                        isSupported =
                          has("json-stringify") && has("json-parse");
                      } else {
                        var value,
                          serialized =
                            '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        // Test `JSON.stringify`.
                        if (name == "json-stringify") {
                          var stringify = exports.stringify,
                            stringifySupported =
                              typeof stringify == "function" && isExtended;
                          if (stringifySupported) {
                            // A test function object with a custom `toJSON` method.
                            (value = function() {
                              return 1;
                            }).toJSON = value;
                            try {
                              stringifySupported =
                                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                                // primitives as object literals.
                                stringify(0) === "0" &&
                                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                                // literals.
                                stringify(new Number()) === "0" &&
                                stringify(new String()) == '""' &&
                                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                                // does not define a canonical JSON representation (this applies to
                                // objects with `toJSON` properties as well, *unless* they are nested
                                // within an object or array).
                                stringify(getClass) === undef &&
                                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                                // FF 3.1b3 pass this test.
                                stringify(undef) === undef &&
                                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                                // respectively, if the value is omitted entirely.
                                stringify() === undef &&
                                // FF 3.1b1, 2 throw an error if the given value is not a number,
                                // string, array, object, Boolean, or `null` literal. This applies to
                                // objects with custom `toJSON` methods as well, unless they are nested
                                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                                // methods entirely.
                                stringify(value) === "1" &&
                                stringify([value]) == "[1]" &&
                                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                                // `"[null]"`.
                                stringify([undef]) == "[null]" &&
                                // YUI 3.0.0b1 fails to serialize `null` literals.
                                stringify(null) == "null" &&
                                // FF 3.1b1, 2 halts serialization if an array contains a function:
                                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                                // elides non-JSON values from objects and arrays, unless they
                                // define custom `toJSON` methods.
                                stringify([undef, getClass, null]) ==
                                  "[null,null,null]" &&
                                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                                stringify({
                                  a: [
                                    value,
                                    true,
                                    false,
                                    null,
                                    "\x00\b\n\f\r\t"
                                  ]
                                }) == serialized &&
                                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                                stringify(null, value) === "1" &&
                                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                                // serialize extended years.
                                stringify(new Date(-8.64e15)) ==
                                  '"-271821-04-20T00:00:00.000Z"' &&
                                // The milliseconds are optional in ES 5, but required in 5.1.
                                stringify(new Date(8.64e15)) ==
                                  '"+275760-09-13T00:00:00.000Z"' &&
                                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                                // four-digit years instead of six-digit years. Credits: @Yaffle.
                                stringify(new Date(-621987552e5)) ==
                                  '"-000001-01-01T00:00:00.000Z"' &&
                                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                                // values less than 1000. Credits: @Yaffle.
                                stringify(new Date(-1)) ==
                                  '"1969-12-31T23:59:59.999Z"';
                            } catch (exception) {
                              stringifySupported = false;
                            }
                          }
                          isSupported = stringifySupported;
                        }
                        // Test `JSON.parse`.
                        if (name == "json-parse") {
                          var parse = exports.parse;
                          if (typeof parse == "function") {
                            try {
                              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                              // Conforming implementations should also coerce the initial argument to
                              // a string prior to parsing.
                              if (parse("0") === 0 && !parse(false)) {
                                // Simple parsing test.
                                value = parse(serialized);
                                var parseSupported =
                                  value["a"].length == 5 && value["a"][0] === 1;
                                if (parseSupported) {
                                  try {
                                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                                    parseSupported = !parse('"\t"');
                                  } catch (exception) {}
                                  if (parseSupported) {
                                    try {
                                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                                      // certain octal literals.
                                      parseSupported = parse("01") !== 1;
                                    } catch (exception) {}
                                  }
                                  if (parseSupported) {
                                    try {
                                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                                      // points. These environments, along with FF 3.1b1 and 2,
                                      // also allow trailing commas in JSON objects and arrays.
                                      parseSupported = parse("1.") !== 1;
                                    } catch (exception) {}
                                  }
                                }
                              }
                            } catch (exception) {
                              parseSupported = false;
                            }
                          }
                          isSupported = parseSupported;
                        }
                      }
                      return (has[name] = !!isSupported);
                    }

                    if (!has("json")) {
                      // Common `[[Class]]` name aliases.
                      var functionClass = "[object Function]",
                        dateClass = "[object Date]",
                        numberClass = "[object Number]",
                        stringClass = "[object String]",
                        arrayClass = "[object Array]",
                        booleanClass = "[object Boolean]";

                      // Detect incomplete support for accessing string characters by index.
                      var charIndexBuggy = has("bug-string-char-index");

                      // Define additional utility methods if the `Date` methods are buggy.
                      if (!isExtended) {
                        var floor = Math.floor;
                        // A mapping between the months of the year and the number of days between
                        // January 1st and the first of the respective month.
                        var Months = [
                          0,
                          31,
                          59,
                          90,
                          120,
                          151,
                          181,
                          212,
                          243,
                          273,
                          304,
                          334
                        ];
                        // Internal: Calculates the number of days between the Unix epoch and the
                        // first day of the given month.
                        var getDay = function(year, month) {
                          return (
                            Months[month] +
                            365 * (year - 1970) +
                            floor((year - 1969 + (month = +(month > 1))) / 4) -
                            floor((year - 1901 + month) / 100) +
                            floor((year - 1601 + month) / 400)
                          );
                        };
                      }

                      // Internal: Determines if a property is a direct property of the given
                      // object. Delegates to the native `Object#hasOwnProperty` method.
                      if (!(isProperty = objectProto.hasOwnProperty)) {
                        isProperty = function(property) {
                          var members = {},
                            constructor;
                          if (
                            ((members.__proto__ = null),
                            (members.__proto__ = {
                              // The *proto* property cannot be set multiple times in recent
                              // versions of Firefox and SeaMonkey.
                              toString: 1
                            }),
                            members).toString != getClass
                          ) {
                            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                            // supports the mutable *proto* property.
                            isProperty = function(property) {
                              // Capture and break the object's prototype chain (see section 8.6.2
                              // of the ES 5.1 spec). The parenthesized expression prevents an
                              // unsafe transformation by the Closure Compiler.
                              var original = this.__proto__,
                                result =
                                  property in ((this.__proto__ = null), this);
                              // Restore the original prototype chain.
                              this.__proto__ = original;
                              return result;
                            };
                          } else {
                            // Capture a reference to the top-level `Object` constructor.
                            constructor = members.constructor;
                            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
                            // other environments.
                            isProperty = function(property) {
                              var parent = (this.constructor || constructor)
                                .prototype;
                              return (
                                property in this &&
                                !(
                                  property in parent &&
                                  this[property] === parent[property]
                                )
                              );
                            };
                          }
                          members = null;
                          return isProperty.call(this, property);
                        };
                      }

                      // Internal: Normalizes the `for...in` iteration algorithm across
                      // environments. Each enumerated key is yielded to a `callback` function.
                      forEach = function(object, callback) {
                        var size = 0,
                          Properties,
                          members,
                          property;

                        // Tests for bugs in the current environment's `for...in` algorithm. The
                        // `valueOf` property inherits the non-enumerable flag from
                        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
                        (Properties = function() {
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
                          members = [
                            "valueOf",
                            "toString",
                            "toLocaleString",
                            "propertyIsEnumerable",
                            "isPrototypeOf",
                            "hasOwnProperty",
                            "constructor"
                          ];
                          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                          // properties.
                          forEach = function(object, callback) {
                            var isFunction =
                                getClass.call(object) == functionClass,
                              property,
                              length;
                            var hasProperty =
                              (!isFunction &&
                                typeof object.constructor != "function" &&
                                objectTypes[typeof object.hasOwnProperty] &&
                                object.hasOwnProperty) ||
                              isProperty;
                            for (property in object) {
                              // Gecko <= 1.0 enumerates the `prototype` property of functions under
                              // certain conditions; IE does not.
                              if (
                                !(isFunction && property == "prototype") &&
                                hasProperty.call(object, property)
                              ) {
                                callback(property);
                              }
                            }
                            // Manually invoke the callback for each non-enumerable property.
                            for (
                              length = members.length;
                              (property = members[--length]);
                              hasProperty.call(object, property) &&
                              callback(property)
                            );
                          };
                        } else if (size == 2) {
                          // Safari <= 2.0.4 enumerates shadowed properties twice.
                          forEach = function(object, callback) {
                            // Create a set of iterated properties.
                            var members = {},
                              isFunction =
                                getClass.call(object) == functionClass,
                              property;
                            for (property in object) {
                              // Store each property name to prevent double enumeration. The
                              // `prototype` property of functions is not enumerated due to cross-
                              // environment inconsistencies.
                              if (
                                !(isFunction && property == "prototype") &&
                                !isProperty.call(members, property) &&
                                (members[property] = 1) &&
                                isProperty.call(object, property)
                              ) {
                                callback(property);
                              }
                            }
                          };
                        } else {
                          // No bugs detected; use the standard `for...in` algorithm.
                          forEach = function(object, callback) {
                            var isFunction =
                                getClass.call(object) == functionClass,
                              property,
                              isConstructor;
                            for (property in object) {
                              if (
                                !(isFunction && property == "prototype") &&
                                isProperty.call(object, property) &&
                                !(isConstructor = property === "constructor")
                              ) {
                                callback(property);
                              }
                            }
                            // Manually invoke the callback for the `constructor` property due to
                            // cross-environment inconsistencies.
                            if (
                              isConstructor ||
                              isProperty.call(
                                object,
                                (property = "constructor")
                              )
                            ) {
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
                      if (!has("json-stringify")) {
                        // Internal: A map of control characters and their escaped equivalents.
                        var Escapes = {
                          92: "\\\\",
                          34: '\\"',
                          8: "\\b",
                          12: "\\f",
                          10: "\\n",
                          13: "\\r",
                          9: "\\t"
                        };

                        // Internal: Converts `value` into a zero-padded string such that its
                        // length is at least equal to `width`. The `width` must be <= 6.
                        var leadingZeroes = "000000";
                        var toPaddedString = function(width, value) {
                          // The `|| 0` expression is necessary to work around a bug in
                          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                          return (leadingZeroes + (value || 0)).slice(-width);
                        };

                        // Internal: Double-quotes a string `value`, replacing all ASCII control
                        // characters (characters with code unit values between 0 and 31) with
                        // their escaped equivalents. This is an implementation of the
                        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                        var unicodePrefix = "\\u00";
                        var quote = function(value) {
                          var result = '"',
                            index = 0,
                            length = value.length,
                            useCharIndex = !charIndexBuggy || length > 10;
                          var symbols =
                            useCharIndex &&
                            (charIndexBuggy ? value.split("") : value);
                          for (; index < length; index++) {
                            var charCode = value.charCodeAt(index);
                            // If the character is a control character, append its Unicode or
                            // shorthand escape sequence; otherwise, append the character as-is.
                            switch (charCode) {
                              case 8:
                              case 9:
                              case 10:
                              case 12:
                              case 13:
                              case 34:
                              case 92:
                                result += Escapes[charCode];
                                break;
                              default:
                                if (charCode < 32) {
                                  result +=
                                    unicodePrefix +
                                    toPaddedString(2, charCode.toString(16));
                                  break;
                                }
                                result += useCharIndex
                                  ? symbols[index]
                                  : value.charAt(index);
                            }
                          }
                          return result + '"';
                        };

                        // Internal: Recursively serializes an object. Implements the
                        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
                        var serialize = function(
                          property,
                          object,
                          callback,
                          properties,
                          whitespace,
                          indentation,
                          stack
                        ) {
                          var value,
                            className,
                            year,
                            month,
                            date,
                            time,
                            hours,
                            minutes,
                            seconds,
                            milliseconds,
                            results,
                            element,
                            index,
                            length,
                            prefix,
                            result;
                          try {
                            // Necessary for host object support.
                            value = object[property];
                          } catch (exception) {}
                          if (typeof value == "object" && value) {
                            className = getClass.call(value);
                            if (
                              className == dateClass &&
                              !isProperty.call(value, "toJSON")
                            ) {
                              if (value > -1 / 0 && value < 1 / 0) {
                                // Dates are serialized according to the `Date#toJSON` method
                                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                                // for the ISO 8601 date time string format.
                                if (getDay) {
                                  // Manually compute the year, month, date, hours, minutes,
                                  // seconds, and milliseconds if the `getUTC*` methods are
                                  // buggy. Adapted from @Yaffle's `date-shim` project.
                                  date = floor(value / 864e5);
                                  for (
                                    year = floor(date / 365.2425) + 1970 - 1;
                                    getDay(year + 1, 0) <= date;
                                    year++
                                  );
                                  for (
                                    month = floor(
                                      (date - getDay(year, 0)) / 30.42
                                    );
                                    getDay(year, month + 1) <= date;
                                    month++
                                  );
                                  date = 1 + date - getDay(year, month);
                                  // The `time` value specifies the time within the day (see ES
                                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                                  // to compute `A modulo B`, as the `%` operator does not
                                  // correspond to the `modulo` operation for negative numbers.
                                  time = ((value % 864e5) + 864e5) % 864e5;
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
                                value =
                                  (year <= 0 || year >= 1e4
                                    ? (year < 0 ? "-" : "+") +
                                      toPaddedString(6, year < 0 ? -year : year)
                                    : toPaddedString(4, year)) +
                                  "-" +
                                  toPaddedString(2, month + 1) +
                                  "-" +
                                  toPaddedString(2, date) +
                                  // Months, dates, hours, minutes, and seconds should have two
                                  // digits; milliseconds should have three.
                                  "T" +
                                  toPaddedString(2, hours) +
                                  ":" +
                                  toPaddedString(2, minutes) +
                                  ":" +
                                  toPaddedString(2, seconds) +
                                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                                  "." +
                                  toPaddedString(3, milliseconds) +
                                  "Z";
                              } else {
                                value = null;
                              }
                            } else if (
                              typeof value.toJSON == "function" &&
                              ((className != numberClass &&
                                className != stringClass &&
                                className != arrayClass) ||
                                isProperty.call(value, "toJSON"))
                            ) {
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
                          if (className == booleanClass) {
                            // Booleans are represented literally.
                            return "" + value;
                          } else if (className == numberClass) {
                            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                            // `"null"`.
                            return value > -1 / 0 && value < 1 / 0
                              ? "" + value
                              : "null";
                          } else if (className == stringClass) {
                            // Strings are double-quoted and escaped.
                            return quote("" + value);
                          }
                          // Recursively serialize objects and arrays.
                          if (typeof value == "object") {
                            // Check for cyclic structures. This is a linear search; performance
                            // is inversely proportional to the number of unique nested objects.
                            for (length = stack.length; length--; ) {
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
                            if (className == arrayClass) {
                              // Recursively serialize array elements.
                              for (
                                index = 0, length = value.length;
                                index < length;
                                index++
                              ) {
                                element = serialize(
                                  index,
                                  value,
                                  callback,
                                  properties,
                                  whitespace,
                                  indentation,
                                  stack
                                );
                                results.push(
                                  element === undef ? "null" : element
                                );
                              }
                              result = results.length
                                ? whitespace
                                  ? "[\n" +
                                    indentation +
                                    results.join(",\n" + indentation) +
                                    "\n" +
                                    prefix +
                                    "]"
                                  : "[" + results.join(",") + "]"
                                : "[]";
                            } else {
                              // Recursively serialize object members. Members are selected from
                              // either a user-specified list of property names, or the object
                              // itself.
                              forEach(properties || value, function(property) {
                                var element = serialize(
                                  property,
                                  value,
                                  callback,
                                  properties,
                                  whitespace,
                                  indentation,
                                  stack
                                );
                                if (element !== undef) {
                                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                                  // is not the empty string, let `member` {quote(property) + ":"}
                                  // be the concatenation of `member` and the `space` character."
                                  // The "`space` character" refers to the literal space
                                  // character, not the `space` {width} argument provided to
                                  // `JSON.stringify`.
                                  results.push(
                                    quote(property) +
                                      ":" +
                                      (whitespace ? " " : "") +
                                      element
                                  );
                                }
                              });
                              result = results.length
                                ? whitespace
                                  ? "{\n" +
                                    indentation +
                                    results.join(",\n" + indentation) +
                                    "\n" +
                                    prefix +
                                    "}"
                                  : "{" + results.join(",") + "}"
                                : "{}";
                            }
                            // Remove the object from the traversed object stack.
                            stack.pop();
                            return result;
                          }
                        };

                        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
                        exports.stringify = function(source, filter, width) {
                          var whitespace, callback, properties, className;
                          if (objectTypes[typeof filter] && filter) {
                            if (
                              (className = getClass.call(filter)) ==
                              functionClass
                            ) {
                              callback = filter;
                            } else if (className == arrayClass) {
                              // Convert the property names array into a makeshift set.
                              properties = {};
                              for (
                                var index = 0, length = filter.length, value;
                                index < length;
                                value = filter[index++],
                                  ((className = getClass.call(value)),
                                  className == stringClass ||
                                    className == numberClass) &&
                                    (properties[value] = 1)
                              );
                            }
                          }
                          if (width) {
                            if (
                              (className = getClass.call(width)) == numberClass
                            ) {
                              // Convert the `width` to an integer and create a string containing
                              // `width` number of space characters.
                              if ((width -= width % 1) > 0) {
                                for (
                                  whitespace = "", width > 10 && (width = 10);
                                  whitespace.length < width;
                                  whitespace += " "
                                );
                              }
                            } else if (className == stringClass) {
                              whitespace =
                                width.length <= 10 ? width : width.slice(0, 10);
                            }
                          }
                          // Opera <= 7.54u2 discards the values associated with empty string keys
                          // (`""`) only if they are used directly within an object member list
                          // (e.g., `!("" in { "": 1})`).
                          return serialize(
                            "",
                            ((value = {}), (value[""] = source), value),
                            callback,
                            properties,
                            whitespace,
                            "",
                            []
                          );
                        };
                      }

                      // Public: Parses a JSON source string.
                      if (!has("json-parse")) {
                        var fromCharCode = String.fromCharCode;

                        // Internal: A map of escaped control characters and their unescaped
                        // equivalents.
                        var Unescapes = {
                          92: "\\",
                          34: '"',
                          47: "/",
                          98: "\b",
                          116: "\t",
                          110: "\n",
                          102: "\f",
                          114: "\r"
                        };

                        // Internal: Stores the parser state.
                        var Index, Source;

                        // Internal: Resets the parser state and throws a `SyntaxError`.
                        var abort = function() {
                          Index = Source = null;
                          throw SyntaxError();
                        };

                        // Internal: Returns the next token, or `"$"` if the parser has reached
                        // the end of the source string. A token may be a string, number, `null`
                        // literal, or Boolean literal.
                        var lex = function() {
                          var source = Source,
                            length = source.length,
                            value,
                            begin,
                            position,
                            isSigned,
                            charCode;
                          while (Index < length) {
                            charCode = source.charCodeAt(Index);
                            switch (charCode) {
                              case 9:
                              case 10:
                              case 13:
                              case 32:
                                // Skip whitespace tokens, including tabs, carriage returns, line
                                // feeds, and space characters.
                                Index++;
                                break;
                              case 123:
                              case 125:
                              case 91:
                              case 93:
                              case 58:
                              case 44:
                                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                                // the current position.
                                value = charIndexBuggy
                                  ? source.charAt(Index)
                                  : source[Index];
                                Index++;
                                return value;
                              case 34:
                                // `"` delimits a JSON string; advance to the next character and
                                // begin parsing the string. String tokens are prefixed with the
                                // sentinel `@` character to distinguish them from punctuators and
                                // end-of-string tokens.
                                for (value = "@", Index++; Index < length; ) {
                                  charCode = source.charCodeAt(Index);
                                  if (charCode < 32) {
                                    // Unescaped ASCII control characters (those with a code unit
                                    // less than the space character) are not permitted.
                                    abort();
                                  } else if (charCode == 92) {
                                    // A reverse solidus (`\`) marks the beginning of an escaped
                                    // control character (including `"`, `\`, and `/`) or Unicode
                                    // escape sequence.
                                    charCode = source.charCodeAt(++Index);
                                    switch (charCode) {
                                      case 92:
                                      case 34:
                                      case 47:
                                      case 98:
                                      case 116:
                                      case 110:
                                      case 102:
                                      case 114:
                                        // Revive escaped control characters.
                                        value += Unescapes[charCode];
                                        Index++;
                                        break;
                                      case 117:
                                        // `\u` marks the beginning of a Unicode escape sequence.
                                        // Advance to the first character and validate the
                                        // four-digit code point.
                                        begin = ++Index;
                                        for (
                                          position = Index + 4;
                                          Index < position;
                                          Index++
                                        ) {
                                          charCode = source.charCodeAt(Index);
                                          // A valid sequence comprises four hexdigits (case-
                                          // insensitive) that form a single hexadecimal value.
                                          if (
                                            !(
                                              (charCode >= 48 &&
                                                charCode <= 57) ||
                                              (charCode >= 97 &&
                                                charCode <= 102) ||
                                              (charCode >= 65 && charCode <= 70)
                                            )
                                          ) {
                                            // Invalid Unicode escape sequence.
                                            abort();
                                          }
                                        }
                                        // Revive the escaped character.
                                        value += fromCharCode(
                                          "0x" + source.slice(begin, Index)
                                        );
                                        break;
                                      default:
                                        // Invalid escape sequence.
                                        abort();
                                    }
                                  } else {
                                    if (charCode == 34) {
                                      // An unescaped double-quote character marks the end of the
                                      // string.
                                      break;
                                    }
                                    charCode = source.charCodeAt(Index);
                                    begin = Index;
                                    // Optimize for the common case where a string is valid.
                                    while (
                                      charCode >= 32 &&
                                      charCode != 92 &&
                                      charCode != 34
                                    ) {
                                      charCode = source.charCodeAt(++Index);
                                    }
                                    // Append the string as-is.
                                    value += source.slice(begin, Index);
                                  }
                                }
                                if (source.charCodeAt(Index) == 34) {
                                  // Advance to the next character and return the revived string.
                                  Index++;
                                  return value;
                                }
                                // Unterminated string.
                                abort();
                              default:
                                // Parse numbers and literals.
                                begin = Index;
                                // Advance past the negative sign, if one is specified.
                                if (charCode == 45) {
                                  isSigned = true;
                                  charCode = source.charCodeAt(++Index);
                                }
                                // Parse an integer or floating-point value.
                                if (charCode >= 48 && charCode <= 57) {
                                  // Leading zeroes are interpreted as octal literals.
                                  if (
                                    charCode == 48 &&
                                    ((charCode = source.charCodeAt(Index + 1)),
                                    charCode >= 48 && charCode <= 57)
                                  ) {
                                    // Illegal octal literal.
                                    abort();
                                  }
                                  isSigned = false;
                                  // Parse the integer component.
                                  for (
                                    ;
                                    Index < length &&
                                    ((charCode = source.charCodeAt(Index)),
                                    charCode >= 48 && charCode <= 57);
                                    Index++
                                  );
                                  // Floats cannot contain a leading decimal point; however, this
                                  // case is already accounted for by the parser.
                                  if (source.charCodeAt(Index) == 46) {
                                    position = ++Index;
                                    // Parse the decimal component.
                                    for (
                                      ;
                                      position < length &&
                                      ((charCode = source.charCodeAt(position)),
                                      charCode >= 48 && charCode <= 57);
                                      position++
                                    );
                                    if (position == Index) {
                                      // Illegal trailing decimal.
                                      abort();
                                    }
                                    Index = position;
                                  }
                                  // Parse exponents. The `e` denoting the exponent is
                                  // case-insensitive.
                                  charCode = source.charCodeAt(Index);
                                  if (charCode == 101 || charCode == 69) {
                                    charCode = source.charCodeAt(++Index);
                                    // Skip past the sign following the exponent, if one is
                                    // specified.
                                    if (charCode == 43 || charCode == 45) {
                                      Index++;
                                    }
                                    // Parse the exponential component.
                                    for (
                                      position = Index;
                                      position < length &&
                                      ((charCode = source.charCodeAt(position)),
                                      charCode >= 48 && charCode <= 57);
                                      position++
                                    );
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
                                if (isSigned) {
                                  abort();
                                }
                                // `true`, `false`, and `null` literals.
                                if (source.slice(Index, Index + 4) == "true") {
                                  Index += 4;
                                  return true;
                                } else if (
                                  source.slice(Index, Index + 5) == "false"
                                ) {
                                  Index += 5;
                                  return false;
                                } else if (
                                  source.slice(Index, Index + 4) == "null"
                                ) {
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
                        var get = function(value) {
                          var results, hasMembers;
                          if (value == "$") {
                            // Unexpected end of input.
                            abort();
                          }
                          if (typeof value == "string") {
                            if (
                              (charIndexBuggy ? value.charAt(0) : value[0]) ==
                              "@"
                            ) {
                              // Remove the sentinel `@` character.
                              return value.slice(1);
                            }
                            // Parse object and array literals.
                            if (value == "[") {
                              // Parses a JSON array, returning a new JavaScript array.
                              results = [];
                              for (; ; hasMembers || (hasMembers = true)) {
                                value = lex();
                                // A closing square bracket marks the end of the array literal.
                                if (value == "]") {
                                  break;
                                }
                                // If the array literal contains elements, the current token
                                // should be a comma separating the previous element from the
                                // next.
                                if (hasMembers) {
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
                              for (; ; hasMembers || (hasMembers = true)) {
                                value = lex();
                                // A closing curly brace marks the end of the object literal.
                                if (value == "}") {
                                  break;
                                }
                                // If the object literal contains members, the current token
                                // should be a comma separator.
                                if (hasMembers) {
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
                                if (
                                  value == "," ||
                                  typeof value != "string" ||
                                  (charIndexBuggy
                                    ? value.charAt(0)
                                    : value[0]) != "@" ||
                                  lex() != ":"
                                ) {
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
                        var update = function(source, property, callback) {
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
                        var walk = function(source, property, callback) {
                          var value = source[property],
                            length;
                          if (typeof value == "object" && value) {
                            // `forEach` can't be used to traverse an array in Opera <= 8.54
                            // because its `Object#hasOwnProperty` implementation returns `false`
                            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                            if (getClass.call(value) == arrayClass) {
                              for (length = value.length; length--; ) {
                                update(value, length, callback);
                              }
                            } else {
                              forEach(value, function(property) {
                                update(value, property, callback);
                              });
                            }
                          }
                          return callback.call(source, property, value);
                        };

                        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
                        exports.parse = function(source, callback) {
                          var result, value;
                          Index = 0;
                          Source = "" + source;
                          result = get(lex());
                          // If a JSON string contains multiple tokens, it is invalid.
                          if (lex() != "$") {
                            abort();
                          }
                          // Reset the parser state.
                          Index = Source = null;
                          return callback &&
                            getClass.call(callback) == functionClass
                            ? walk(
                                ((value = {}), (value[""] = result), value),
                                "",
                                callback
                              )
                            : result;
                        };
                      }
                    }

                    exports["runInContext"] = runInContext;
                    return exports;
                  }

                  if (freeExports && !isLoader) {
                    // Export for CommonJS environments.
                    runInContext(root, freeExports);
                  } else {
                    // Export for web browsers and JavaScript engines.
                    var nativeJSON = root.JSON,
                      previousJSON = root["JSON3"],
                      isRestored = false;

                    var JSON3 = runInContext(
                      root,
                      (root["JSON3"] = {
                        // Public: Restores the original value of the global `JSON` object and
                        // returns a reference to the `JSON3` object.
                        noConflict: function() {
                          if (!isRestored) {
                            isRestored = true;
                            root.JSON = nativeJSON;
                            root["JSON3"] = previousJSON;
                            nativeJSON = previousJSON = null;
                          }
                          return JSON3;
                        }
                      })
                    );

                    root.JSON = {
                      parse: JSON3.parse,
                      stringify: JSON3.stringify
                    };
                  }

                  // Export for asynchronous module loaders.
                  if (isLoader) {
                    define(function() {
                      return JSON3;
                    });
                  }
                }.call(this));
              }

              var TROMPLE_HAS_RAN = false;

              function main() {
                if (!TROMPLE_HAS_RAN) {
                  TROMPLE_HAS_RAN = true;
                  TROMPLE_MAIN();
                }
                return module$1.exports;
              }

              function trompleEntryPoint(requirePath) {
                switch (requirePath) {
                  case undefined:
                    return main();
                }
              }

              module.exports = trompleEntryPoint;

              /*  */
            },
            null
          );

          __d(
            "json3",
            ["json3-3.3.2"],
            function $module_json3(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              // @generated by yarn - see http://fburl.com/js-libs-www
              // @flow
              // @nolint

              // this module should be typed via `json3.js.flow`, otherwise it's `any`
              module.exports = (require("json3-3.3.2")() /*: any */);

              /*  */
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           *
           * scripts/static_resources/js/fb-transforms/babel-7/babel-plugin-jssdk
           * converts ES5/ES6 code into using this module in ES3 style.
           *
           * @ServerCallableModule
           * @format
           *
           */ __d(
            "ES",
            [
              "ES5FunctionPrototype",
              "ES5StringPrototype",
              "ES6Array",
              "ES6ArrayPrototype",
              "ES6Number",
              "ES6Object",
              "ES7ArrayPrototype",
              "ES7Object",
              "ES7StringPrototype",
              "json3"
            ],
            function $module_ES(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = ES;

              var toString = {}.toString;

              var methodCache = {
                "JSON.stringify": require("json3").stringify,
                "JSON.parse": require("json3").parse
              };

              var es5Polyfills = {
                "Function.prototype": require("ES5FunctionPrototype"),
                "String.prototype": require("ES5StringPrototype")
              };

              var es6Polyfills = {
                Object: require("ES6Object"),
                "Array.prototype": require("ES6ArrayPrototype"),
                Number: require("ES6Number"),
                Array: require("ES6Array")
              };

              var es7Polyfills = {
                Object: require("ES7Object"),
                "String.prototype": require("ES7StringPrototype"),
                "Array.prototype": require("ES7ArrayPrototype")
              };

              function setupMethodsCache(polyfills) {
                for (var pName in polyfills) {
                  if (!Object.prototype.hasOwnProperty.call(polyfills, pName)) {
                    continue;
                  }
                  var polyfillObject = polyfills[pName];

                  var accessor = pName.split(".");
                  if (accessor.length === 2) {
                    var obj = accessor[0],
                      prop = accessor[1];
                    if (!obj || !prop || !window[obj] || !window[obj][prop]) {
                      var windowObj = obj ? window[obj] : "-";
                      var windowObjProp =
                        obj && window[obj] && prop ? window[obj][prop] : "-";
                      throw new Error(
                        "Unexpected state (t11975770): " +
                          (obj +
                            ", " +
                            prop +
                            ", " +
                            windowObj +
                            ", " +
                            windowObjProp +
                            ", " +
                            pName)
                      );
                    }
                  }

                  var nativeObject =
                    accessor.length === 2
                      ? window[accessor[0]][accessor[1]]
                      : window[pName];

                  for (var _prop in polyfillObject) {
                    if (
                      !Object.prototype.hasOwnProperty.call(
                        polyfillObject,
                        _prop
                      )
                    ) {
                      continue;
                    }

                    if (typeof polyfillObject[_prop] !== "function") {
                      methodCache[pName + "." + _prop] = polyfillObject[_prop];
                      continue;
                    }

                    var nativeFunction = nativeObject[_prop];

                    methodCache[pName + "." + _prop] =
                      nativeFunction &&
                      /\{\s+\[native code\]\s\}/.test(nativeFunction)
                        ? nativeFunction
                        : polyfillObject[_prop];
                  }
                }
              }

              setupMethodsCache(es5Polyfills);
              setupMethodsCache(es6Polyfills);
              setupMethodsCache(es7Polyfills);

              function ES(lhs, rhs, proto) {
                var type = proto
                  ? toString.call(lhs).slice(8, -1) + ".prototype"
                  : lhs;
                var propValue;

                if (Array.isArray(lhs)) {
                  if (typeof type === "string") {
                    propValue = methodCache[type + "." + rhs];
                  } else {
                    throw new Error(
                      "Can't polyfill " + rhs + " directly on an Array."
                    );
                  }
                } else {
                  if (typeof type === "string") {
                    propValue = methodCache[type + "." + rhs];
                  } else if (typeof lhs === "string") {
                    throw new Error(
                      "Can't polyfill " + rhs + " directly on a string."
                    );
                  } else {
                    propValue = lhs[rhs];
                  }
                }

                if (typeof propValue === "function") {
                  for (
                    var _len = arguments.length,
                      args = new Array(_len > 3 ? _len - 3 : 0),
                      _key = 3;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 3] = arguments[_key];
                  }

                  return propValue.apply(lhs, args);
                } else if (propValue) {
                  return propValue;
                }

                throw new Error(
                  "Polyfill " + type + " does not have implementation of " + rhs
                );
              }
              _c = ES;
              var _c;
              $RefreshReg$(_c, "ES");
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @format
           */ __d(
            "ES5Object",
            ["ie8DontEnum"],
            function $module_ES5Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES5Object = {};

              function F() {}
              _c = F;

              ES5Object.create = function(proto) {
                if (__DEV__) {
                  if (arguments.length > 1) {
                    throw new Error(
                      "Object.create implementation supports only the first parameter"
                    );
                  }
                }
                var type = typeof proto;
                if (type != "object" && type != "function") {
                  throw new TypeError(
                    "Object prototype may only be a Object or null"
                  );
                }

                F.prototype = proto;
                return new F();
              };

              ES5Object.keys = function(object) {
                var type = typeof object;
                if (
                  (type != "object" && type != "function") ||
                  object === null
                ) {
                  throw new TypeError("Object.keys called on non-object");
                }

                var keys = [];
                for (var key in object) {
                  if (hasOwnProperty.call(object, key)) {
                    keys.push(key);
                  }
                }

                require("ie8DontEnum")(object, function ie8DontEnum_$1(prop) {
                  return keys.push(prop);
                });

                return keys;
              };

              ES5Object.freeze = function(object) {
                return object;
              };

              ES5Object.isFrozen = function() {
                return false;
              };

              ES5Object.seal = function(object) {
                return object;
              };

              module.exports = ES5Object;
              var _c;
              $RefreshReg$(_c, "F");
            },
            null
          );
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @ServerCallableModule
           * @format
           */ __d(
            "sdk.babelHelpers",
            ["ES5FunctionPrototype", "ES5Object", "ES6Object"],
            function $module_sdk_babelHelpers(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var babelHelpers = {};
              var hasOwn = Object.prototype.hasOwnProperty;

              babelHelpers.inheritsLoose = function(subClass, superClass) {
                require("ES6Object").assign(subClass, superClass);
                subClass.prototype = require("ES5Object").create(
                  superClass && superClass.prototype
                );
                subClass.prototype.constructor = subClass;
                subClass.__superConstructor__ = superClass;
                return superClass;
              };

              babelHelpers.inherits = babelHelpers.inheritsLoose;

              babelHelpers.wrapNativeSuper = function(Class) {
                var _cache = typeof Map === "function" ? new Map() : undefined;

                babelHelpers.wrapNativeSuper = function(Class) {
                  if (Class === null) {
                    return null;
                  }
                  if (typeof Class !== "function") {
                    throw new TypeError(
                      "Super expression must either be null or a function"
                    );
                  }
                  if (_cache !== undefined) {
                    if (_cache.has(Class)) {
                      return _cache.get(Class);
                    }
                    _cache.set(Class, Wrapper);
                  }
                  babelHelpers.inheritsLoose(Wrapper, Class);
                  function Wrapper() {
                    Class.apply(this, arguments);
                  }
                  return Wrapper;
                };

                return babelHelpers.wrapNativeSuper(Class);
              };

              babelHelpers.assertThisInitialized = function(self) {
                if (self === void 0) {
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                }
                return self;
              };

              babelHelpers._extends = require("ES6Object").assign;

              babelHelpers["extends"] = babelHelpers._extends;

              babelHelpers.construct = function(klass, arr) {
                var a = [null];
                a.push.apply(a, arr);
                return new (Function.prototype.bind.apply(klass, a))();
              };

              babelHelpers.objectWithoutPropertiesLoose = function(obj, keys) {
                var target = {};
                for (var i in obj) {
                  if (!hasOwn.call(obj, i) || keys.indexOf(i) >= 0) {
                    continue;
                  }
                  target[i] = obj[i];
                }
                return target;
              };

              babelHelpers.objectWithoutProperties =
                babelHelpers.objectWithoutPropertiesLoose;

              babelHelpers.taggedTemplateLiteralLoose = function(strings, raw) {
                if (!raw) {
                  raw = strings.slice(0);
                }
                strings.raw = raw;
                return strings;
              };

              babelHelpers.bind = require("ES5FunctionPrototype").bind;

              module.exports = babelHelpers;
            },
            null
          );
          var ES = require("ES");
          var babelHelpers = require("sdk.babelHelpers");
          /**
           * Copyright 2004-present Facebook. All Rights Reserved.
           *
           * @provides iterator.enumerate
           * @requires Array
           *           Object.enumFix
           *           Object
           *           Object.es6
           * @polyfill
           *
           */

          (function(global, undefined) {
            var KIND_KEYS = "keys";
            var KIND_VALUES = "values";
            var KIND_ENTRIES = "entries";

            var ArrayIterators = (function() {
              var hasNative = hasNativeIterator(Array);
              var ArrayIterator;

              if (!hasNative) {
                ArrayIterator = (function() {
                  "use strict";

                  function ArrayIterator(array, kind) {
                    this.$ArrayIterator_iteratedObject = array;
                    this.$ArrayIterator_kind = kind;
                    this.$ArrayIterator_nextIndex = 0;
                  }
                  var _proto = ArrayIterator.prototype;
                  _proto.next = function next() {
                    if (this.$ArrayIterator_iteratedObject == null) {
                      return { value: undefined, done: true };
                    }

                    var array = this.$ArrayIterator_iteratedObject;
                    var len = this.$ArrayIterator_iteratedObject.length;
                    var index = this.$ArrayIterator_nextIndex;
                    var kind = this.$ArrayIterator_kind;

                    if (index >= len) {
                      this.$ArrayIterator_iteratedObject = undefined;
                      return { value: undefined, done: true };
                    }

                    this.$ArrayIterator_nextIndex = index + 1;

                    if (kind === KIND_KEYS) {
                      return { value: index, done: false };
                    } else if (kind === KIND_VALUES) {
                      return { value: array[index], done: false };
                    } else if (kind === KIND_ENTRIES) {
                      return { value: [index, array[index]], done: false };
                    }
                  };
                  _proto[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ] = function() {
                    return this;
                  };
                  return ArrayIterator;
                })();
              }

              return {
                keys: hasNative
                  ? function(array) {
                      return array.keys();
                    }
                  : function(array) {
                      return new ArrayIterator(array, KIND_KEYS);
                    },

                values: hasNative
                  ? function(array) {
                      return array.values();
                    }
                  : function(array) {
                      return new ArrayIterator(array, KIND_VALUES);
                    },

                entries: hasNative
                  ? function(array) {
                      return array.entries();
                    }
                  : function(array) {
                      return new ArrayIterator(array, KIND_ENTRIES);
                    }
              };
            })();

            var StringIterators = (function() {
              var hasNative = hasNativeIterator(String);
              var StringIterator;

              if (!hasNative) {
                StringIterator = (function() {
                  "use strict";

                  function StringIterator(string) {
                    this.$StringIterator_iteratedString = string;
                    this.$StringIterator_nextIndex = 0;
                  }
                  var _proto2 = StringIterator.prototype;
                  _proto2.next = function next() {
                    if (this.$StringIterator_iteratedString == null) {
                      return { value: undefined, done: true };
                    }

                    var index = this.$StringIterator_nextIndex;
                    var s = this.$StringIterator_iteratedString;
                    var len = s.length;

                    if (index >= len) {
                      this.$StringIterator_iteratedString = undefined;
                      return { value: undefined, done: true };
                    }

                    var ret;
                    var first = s.charCodeAt(index);

                    if (first < 55296 || first > 56319 || index + 1 === len) {
                      ret = s[index];
                    } else {
                      var second = s.charCodeAt(index + 1);
                      if (second < 56320 || second > 57343) {
                        ret = s[index];
                      } else {
                        ret = s[index] + s[index + 1];
                      }
                    }

                    this.$StringIterator_nextIndex = index + ret.length;

                    return { value: ret, done: false };
                  };
                  _proto2[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ] = function() {
                    return this;
                  };
                  return StringIterator;
                })();
              }

              return {
                keys: function keys() {
                  throw TypeError(
                    "Strings default iterator doesn't implement keys."
                  );
                },

                values: hasNative
                  ? function(string) {
                      return string[
                        typeof Symbol === "function"
                          ? Symbol.iterator
                          : "@@iterator"
                      ]();
                    }
                  : function(string) {
                      return new StringIterator(string);
                    },

                entries: function entries() {
                  throw TypeError(
                    "Strings default iterator doesn't implement entries."
                  );
                }
              };
            })();

            function hasNativeIterator(classObject) {
              return (
                typeof classObject.prototype[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ] === "function" &&
                typeof classObject.prototype.values === "function" &&
                typeof classObject.prototype.keys === "function" &&
                typeof classObject.prototype.entries === "function"
              );
            }
            var ObjectIterator = (function() {
              "use strict";
              function ObjectIterator(object, kind) {
                this.$ObjectIterator_iteratedObject = object;
                this.$ObjectIterator_kind = kind;
                this.$ObjectIterator_keys = Object.keys(object);
                this.$ObjectIterator_nextIndex = 0;
              }
              var _proto3 = ObjectIterator.prototype;
              _proto3.next = function next() {
                var len = this.$ObjectIterator_keys.length;
                var index = this.$ObjectIterator_nextIndex;
                var kind = this.$ObjectIterator_kind;
                var key = this.$ObjectIterator_keys[index];

                if (index >= len) {
                  this.$ObjectIterator_iteratedObject = undefined;
                  return { value: undefined, done: true };
                }

                this.$ObjectIterator_nextIndex = index + 1;

                if (kind === KIND_KEYS) {
                  return { value: key, done: false };
                } else if (kind === KIND_VALUES) {
                  return {
                    value: this.$ObjectIterator_iteratedObject[key],
                    done: false
                  };
                } else if (kind === KIND_ENTRIES) {
                  return {
                    value: [key, this.$ObjectIterator_iteratedObject[key]],
                    done: false
                  };
                }
              };
              _proto3[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ] = function() {
                return this;
              };
              return ObjectIterator;
            })();

            var GenericIterators = {
              keys: function keys(object) {
                return new ObjectIterator(object, KIND_KEYS);
              },

              values: function values(object) {
                return new ObjectIterator(object, KIND_VALUES);
              },

              entries: function entries(object) {
                return new ObjectIterator(object, KIND_ENTRIES);
              }
            };

            function enumerate(object, kind) {
              if (typeof object === "string") {
                return StringIterators[kind || KIND_VALUES](object);
              } else if (Array.isArray(object)) {
                return ArrayIterators[kind || KIND_VALUES](object);
              } else if (
                object[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]
              ) {
                return object[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
              } else {
                return GenericIterators[kind || KIND_ENTRIES](object);
              }
            }

            ES("Object", "assign", false, enumerate, {
              KIND_KEYS: KIND_KEYS,
              KIND_VALUES: KIND_VALUES,
              KIND_ENTRIES: KIND_ENTRIES,

              keys: function keys(object) {
                return enumerate(object, KIND_KEYS);
              },

              values: function values(object) {
                return enumerate(object, KIND_VALUES);
              },

              entries: function entries(object) {
                return enumerate(object, KIND_ENTRIES);
              },

              generic: GenericIterators.entries
            });

            global.FB_enumerate = enumerate;
          })(typeof global === "undefined" ? this : global);
          /**
           * Copyright 2013-2014 Facebook, Inc.
           * @provides Collections.es6
           * @polyfill old ie8 webkit modern
           * @preventMunge
           * @requires iterator.enumerate
           * @requires TypeChecker
           * @requires GenericFunctionVisitor
           */

          (function(global, undefined) {
            var windowObj = global.window || global;
            function guid() {
              return (
                "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
              );
            }

            function isNode(object) {
              var doc = object ? object.ownerDocument || object : document;
              var defaultView = doc.defaultView || windowObj;
              return !!(
                object &&
                (typeof defaultView.Node === "function"
                  ? object instanceof defaultView.Node
                  : typeof object === "object" &&
                    typeof object.nodeType === "number" &&
                    typeof object.nodeName === "string")
              );
            }

            function shouldPolyfillES6Collection(collectionName) {
              var Collection = windowObj[collectionName];
              if (Collection == null) {
                return true;
              }

              if (typeof windowObj.Symbol !== "function") {
                return true;
              }

              var proto = Collection.prototype;

              return (
                Collection == null ||
                typeof Collection !== "function" ||
                typeof proto.clear !== "function" ||
                new Collection().size !== 0 ||
                typeof proto.keys !== "function" ||
                typeof proto["for" + "Each"] !== "function"
              );
            }

            var enumerate = global.FB_enumerate;

            var Map = (function() {
              if (!shouldPolyfillES6Collection("Map")) {
                return windowObj.Map;
              }

              var KIND_KEY = "key";
              var KIND_VALUE = "value";
              var KIND_KEY_VALUE = "key+value";

              var KEY_PREFIX = "$map_";

              var SECRET_SIZE_PROP;
              if (__DEV__) {
                SECRET_SIZE_PROP = "$size" + guid();
              }

              var OLD_IE_HASH_PREFIX = "IE_HASH_";
              var Map = (function() {
                "use strict";

                function Map(iterable) {
                  if (!isObject(this)) {
                    throw new TypeError("Wrong map object type.");
                  }

                  initMap(this);

                  if (iterable != null) {
                    var it = enumerate(iterable);
                    var next;
                    while (!(next = it.next()).done) {
                      if (!isObject(next.value)) {
                        throw new TypeError(
                          "Expected iterable items to be pair objects."
                        );
                      }
                      this.set(next.value[0], next.value[1]);
                    }
                  }
                }
                var _proto = Map.prototype;
                _proto.clear = function clear() {
                  initMap(this);
                };
                _proto.has = function has(key) {
                  var index = getIndex(this, key);
                  return !!(index != null && this._mapData[index]);
                };
                _proto.set = function set(key, value) {
                  var index = getIndex(this, key);

                  if (index != null && this._mapData[index]) {
                    this._mapData[index][1] = value;
                  } else {
                    index = this._mapData.push([key, value]) - 1;
                    setIndex(this, key, index);
                    if (__DEV__) {
                      this[SECRET_SIZE_PROP] += 1;
                    } else {
                      this.size += 1;
                    }
                  }

                  return this;
                };
                _proto.get = function get(key) {
                  var index = getIndex(this, key);
                  if (index == null) {
                    return undefined;
                  } else {
                    return this._mapData[index][1];
                  }
                };
                _proto["delete"] = function _delete(key) {
                  var index = getIndex(this, key);
                  if (index != null && this._mapData[index]) {
                    setIndex(this, key, undefined);
                    this._mapData[index] = undefined;
                    if (__DEV__) {
                      this[SECRET_SIZE_PROP] -= 1;
                    } else {
                      this.size -= 1;
                    }
                    return true;
                  } else {
                    return false;
                  }
                };
                _proto.entries = function entries() {
                  return new MapIterator(this, KIND_KEY_VALUE);
                };
                _proto.keys = function keys() {
                  return new MapIterator(this, KIND_KEY);
                };
                _proto.values = function values() {
                  return new MapIterator(this, KIND_VALUE);
                };
                _proto.forEach = function forEach(callback, thisArg) {
                  if (typeof callback !== "function") {
                    throw new TypeError("Callback must be callable.");
                  }

                  var boundCallback = ES(
                    callback,
                    "bind",
                    true,
                    thisArg || undefined
                  );
                  var mapData = this._mapData;

                  for (var i = 0; i < mapData.length; i++) {
                    var entry = mapData[i];
                    if (entry != null) {
                      boundCallback(entry[1], entry[0], this);
                    }
                  }
                };
                _proto[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ] = function() {
                  return this.entries();
                };
                return Map;
              })();
              var MapIterator = (function() {
                "use strict";

                function MapIterator(map, kind) {
                  if (!(isObject(map) && map._mapData)) {
                    throw new TypeError("Object is not a map.");
                  }

                  if (
                    [KIND_KEY, KIND_KEY_VALUE, KIND_VALUE].indexOf(kind) === -1
                  ) {
                    throw new Error("Invalid iteration kind.");
                  }

                  this._map = map;
                  this._nextIndex = 0;
                  this._kind = kind;
                }
                var _proto2 = MapIterator.prototype;
                _proto2.next = function next() {
                  if (!this instanceof Map) {
                    throw new TypeError(
                      "Expected to be called on a MapIterator."
                    );
                  }

                  var map = this._map;
                  var index = this._nextIndex;
                  var kind = this._kind;

                  if (map == null) {
                    return createIterResultObject(undefined, true);
                  }

                  var entries = map._mapData;

                  while (index < entries.length) {
                    var record = entries[index];

                    index += 1;
                    this._nextIndex = index;

                    if (record) {
                      if (kind === KIND_KEY) {
                        return createIterResultObject(record[0], false);
                      } else if (kind === KIND_VALUE) {
                        return createIterResultObject(record[1], false);
                      } else if (kind) {
                        return createIterResultObject(record, false);
                      }
                    }
                  }

                  this._map = undefined;

                  return createIterResultObject(undefined, true);
                };
                _proto2[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ] = function() {
                  return this;
                };
                return MapIterator;
              })();

              function getIndex(map, key) {
                if (isObject(key)) {
                  var hash = getHash(key);
                  return hash ? map._objectIndex[hash] : undefined;
                } else {
                  var prefixedKey = KEY_PREFIX + key;
                  if (typeof key === "string") {
                    return map._stringIndex[prefixedKey];
                  } else {
                    return map._otherIndex[prefixedKey];
                  }
                }
              }

              function setIndex(map, key, index) {
                var shouldDelete = index == null;

                if (isObject(key)) {
                  var hash = getHash(key);
                  if (!hash) {
                    hash = createHash(key);
                  }
                  if (shouldDelete) {
                    delete map._objectIndex[hash];
                  } else {
                    map._objectIndex[hash] = index;
                  }
                } else {
                  var prefixedKey = KEY_PREFIX + key;
                  if (typeof key === "string") {
                    if (shouldDelete) {
                      delete map._stringIndex[prefixedKey];
                    } else {
                      map._stringIndex[prefixedKey] = index;
                    }
                  } else if (shouldDelete) {
                    delete map._otherIndex[prefixedKey];
                  } else {
                    map._otherIndex[prefixedKey] = index;
                  }
                }
              }

              function initMap(map) {
                map._mapData = [];

                map._objectIndex = {};

                map._stringIndex = {};

                map._otherIndex = {};

                if (__DEV__) {
                  if (Map.__isES5) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        map,
                        SECRET_SIZE_PROP
                      )
                    ) {
                      map[SECRET_SIZE_PROP] = 0;
                    } else {
                      Object.defineProperty(map, SECRET_SIZE_PROP, {
                        value: 0,
                        writable: true
                      });

                      Object.defineProperty(map, "size", {
                        set: function set(v) {
                          console.error(
                            "PLEASE FIX ME: You are changing the map size property which " +
                              "should not be writable and will break in production."
                          );

                          throw new Error(
                            "The map size property is not writable."
                          );
                        },
                        get: function get() {
                          return map[SECRET_SIZE_PROP];
                        }
                      });
                    }

                    return;
                  }
                }

                map.size = 0;
              }

              function isObject(o) {
                return (
                  o != null &&
                  (typeof o === "object" || typeof o === "function")
                );
              }

              function createIterResultObject(value, done) {
                return { value: value, done: done };
              }

              Map.__isES5 = (function() {
                try {
                  Object.defineProperty({}, "__.$#x", {});
                  return true;
                } catch (e) {
                  return false;
                }
              })();

              function isExtensible(o) {
                if (!Map.__isES5 || !Object.isExtensible) {
                  return true;
                } else {
                  return Object.isExtensible(o);
                }
              }

              function getIENodeHash(node) {
                var uniqueID;
                switch (node.nodeType) {
                  case 1:
                    uniqueID = node.uniqueID;
                    break;
                  case 9:
                    uniqueID = node.documentElement.uniqueID;
                    break;
                  default:
                    return null;
                }

                if (uniqueID) {
                  return OLD_IE_HASH_PREFIX + uniqueID;
                } else {
                  return null;
                }
              }

              var hashProperty = guid();

              function getHash(o) {
                if (o[hashProperty]) {
                  return o[hashProperty];
                } else if (
                  !Map.__isES5 &&
                  o.propertyIsEnumerable &&
                  o.propertyIsEnumerable[hashProperty]
                ) {
                  return o.propertyIsEnumerable[hashProperty];
                } else if (!Map.__isES5 && isNode(o) && getIENodeHash(o)) {
                  return getIENodeHash(o);
                } else if (!Map.__isES5 && o[hashProperty]) {
                  return o[hashProperty];
                }
              }

              var createHash = (function() {
                var propIsEnumerable = Object.prototype.propertyIsEnumerable;
                var hashCounter = 0;

                return function createHash(o) {
                  if (isExtensible(o)) {
                    hashCounter += 1;
                    if (Map.__isES5) {
                      Object.defineProperty(o, hashProperty, {
                        enumerable: false,
                        writable: false,
                        configurable: false,
                        value: hashCounter
                      });
                    } else if (o.propertyIsEnumerable) {
                      o.propertyIsEnumerable = function() {
                        return propIsEnumerable.apply(this, arguments);
                      };
                      o.propertyIsEnumerable[hashProperty] = hashCounter;
                    } else if (isNode(o)) {
                      o[hashProperty] = hashCounter;
                    } else {
                      throw new Error(
                        "Unable to set a non-enumerable property on object."
                      );
                    }
                    return hashCounter;
                  } else {
                    throw new Error(
                      "Non-extensible objects are not allowed as keys."
                    );
                  }
                };
              })();

              return __annotator(Map, { name: "Map" });
            })();

            var Set = (function() {
              if (!shouldPolyfillES6Collection("Set")) {
                return windowObj.Set;
              }
              var Set = (function() {
                "use strict";

                function Set(iterable) {
                  if (
                    this == null ||
                    (typeof this !== "object" && typeof this !== "function")
                  ) {
                    throw new TypeError("Wrong set object type.");
                  }

                  initSet(this);

                  if (iterable != null) {
                    var it = enumerate(iterable);
                    var next;
                    while (!(next = it.next()).done) {
                      this.add(next.value);
                    }
                  }
                }
                var _proto3 = Set.prototype;
                _proto3.add = function add(value) {
                  this._map.set(value, value);
                  this.size = this._map.size;
                  return this;
                };
                _proto3.clear = function clear() {
                  initSet(this);
                };
                _proto3["delete"] = function _delete(value) {
                  var ret = this._map["delete"](value);
                  this.size = this._map.size;
                  return ret;
                };
                _proto3.entries = function entries() {
                  return this._map.entries();
                };
                _proto3.forEach = function forEach(callback) {
                  var thisArg = arguments[1];
                  var it = this._map.keys();
                  var next;
                  while (!(next = it.next()).done) {
                    callback.call(thisArg, next.value, next.value, this);
                  }
                };
                _proto3.has = function has(value) {
                  return this._map.has(value);
                };
                _proto3.values = function values() {
                  return this._map.values();
                };
                _proto3.keys = function keys() {
                  return this.values();
                };
                _proto3[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ] = function() {
                  return this.values();
                };
                return Set;
              })();

              function initSet(set) {
                set._map = new Map();
                set.size = set._map.size;
              }

              return __annotator(Set, { name: "Set" });
            })();

            global.Map = Map;
            global.Set = Set;
          })(typeof global === "undefined" ? this : global);
          __d("JSSDKRuntimeConfig", [], {
            locale: "en_US",
            revision: "1003781883",
            rtl: false,
            sdkab: null,
            sdkns: "FB",
            sdkurl: "https://connect.facebook.net/en_US/all/debug.js"
          });
          __d("UrlMapConfig", [], {
            www: "www.facebook.com",
            m: "m.facebook.com",
            business: "business.facebook.com",
            api: "api.facebook.com",
            api_read: "api-read.facebook.com",
            graph: "graph.facebook.com",
            an: "an.facebook.com",
            fbcdn: "static.xx.fbcdn.net",
            cdn: "staticxx.facebook.com",
            graph_facebook: "graph.facebook.com",
            graph_gaming: "graph.fb.gg",
            graph_instagram: "graph.instagram.com",
            www_instagram: "www.instagram.com"
          });
          __d("JSSDKConfig", [], {
            features: {
              allow_non_canvas_app_events: false,
              error_handling: { rate: 4 },
              e2e_ping_tracking: { rate: 0.1 },
              xd_timeout: { rate: 1, value: 60000 },
              use_bundle: false,
              should_log_response_error: true,
              popup_blocker_scribe_logging: { rate: 100 },
              https_only_enforce_starting: 2538809200000,
              https_only_learn_more:
                "https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/",
              https_only_scribe_logging: { rate: 1 },
              log_perf: { rate: 0.001 },
              use_x_xd: { rate: 100 },
              cache_auth_response: { rate: 100 },
              oauth_funnel_logger_version: 1,
              force_popup_to_canvas_apps_with_id: [],
              force_popup_to_all_canvas_app: false,
              max_oauth_dialog_retries: { rate: 100, value: 10 },
              plugin_tags_blacklist: [],
              epd_endpoint_migration: { rate: 100 },
              epd_omit_cookies: { rate: 100 }
            }
          });
          __d("JSSDKCssConfig", [], {
            rules:
              '.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:"lucida grande", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100\u0025;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100\u0025;position:absolute;right:0;top:0;width:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/t-wz8gw1xG1.png);background-position:50\u0025 50\u0025;background-repeat:no-repeat;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}\n.fb_mpn_mobile_landing_page_slide_out{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_out_from_left{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out_from_left;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_up{animation-duration:500ms;animation-name:fb_mpn_landing_page_slide_up;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_in{animation-duration:300ms;animation-name:fb_mpn_bounce_in;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out{animation-duration:300ms;animation-name:fb_mpn_bounce_out;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out_v2{animation-duration:300ms;animation-name:fb_mpn_fade_out;transition-timing-function:ease-in}.fb_customer_chat_bounce_in_v2{animation-duration:300ms;animation-name:fb_bounce_in_v2;transition-timing-function:ease-in}.fb_customer_chat_bounce_in_from_left{animation-duration:300ms;animation-name:fb_bounce_in_from_left;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_v2{animation-duration:300ms;animation-name:fb_bounce_out_v2;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_from_left{animation-duration:300ms;animation-name:fb_bounce_out_from_left;transition-timing-function:ease-in}.fb_customer_chat_bubble_animated_no_badge{box-shadow:0 3px 12px rgba(0, 0, 0, .15);transition:box-shadow 150ms linear}.fb_customer_chat_bubble_animated_no_badge:hover{box-shadow:0 5px 24px rgba(0, 0, 0, .3)}.fb_customer_chat_bubble_animated_with_badge{box-shadow:-5px 4px 14px rgba(0, 0, 0, .15);transition:box-shadow 150ms linear}.fb_customer_chat_bubble_animated_with_badge:hover{box-shadow:-5px 8px 24px rgba(0, 0, 0, .2)}.fb_invisible_flow{display:inherit;height:0;overflow-x:hidden;width:0}.fb_new_ui_mobile_overlay_active{overflow:hidden}\u0040keyframes fb_mpn_landing_page_slide_in{0\u0025{border-radius:50\u0025;margin:0 24px;width:60px}40\u0025{border-radius:18px}100\u0025{margin:0 12px;width:100\u0025 - 24px}}\u0040keyframes fb_mpn_landing_page_slide_in_from_left{0\u0025{border-radius:50\u0025;left:12px;margin:0 24px;width:60px}40\u0025{border-radius:18px}100\u0025{left:12px;margin:0 12px;width:100\u0025 - 24px}}\u0040keyframes fb_mpn_landing_page_slide_out{0\u0025{margin:0 12px;width:100\u0025 - 24px}60\u0025{border-radius:18px}100\u0025{border-radius:50\u0025;margin:0 24px;width:60px}}\u0040keyframes fb_mpn_landing_page_slide_out_from_left{0\u0025{left:12px;width:100\u0025 - 24px}60\u0025{border-radius:18px}100\u0025{border-radius:50\u0025;left:12px;width:60px}}\u0040keyframes fb_mpn_landing_page_slide_up{0\u0025{bottom:0;opacity:0}100\u0025{bottom:24px;opacity:1}}\u0040keyframes fb_mpn_bounce_in{0\u0025{opacity:.5;top:100\u0025}100\u0025{opacity:1;top:0}}\u0040keyframes fb_mpn_fade_out{0\u0025{bottom:30px;opacity:1}100\u0025{bottom:0;opacity:0}}\u0040keyframes fb_mpn_bounce_out{0\u0025{opacity:1;top:0}100\u0025{opacity:.5;top:100\u0025}}\u0040keyframes fb_bounce_in_v2{0\u0025{opacity:0;transform:scale(0, 0);transform-origin:bottom right}50\u0025{transform:scale(1.03, 1.03);transform-origin:bottom right}100\u0025{opacity:1;transform:scale(1, 1);transform-origin:bottom right}}\u0040keyframes fb_bounce_in_from_left{0\u0025{opacity:0;transform:scale(0, 0);transform-origin:bottom left}50\u0025{transform:scale(1.03, 1.03);transform-origin:bottom left}100\u0025{opacity:1;transform:scale(1, 1);transform-origin:bottom left}}\u0040keyframes fb_bounce_out_v2{0\u0025{opacity:1;transform:scale(1, 1);transform-origin:bottom right}100\u0025{opacity:0;transform:scale(0, 0);transform-origin:bottom right}}\u0040keyframes fb_bounce_out_from_left{0\u0025{opacity:1;transform:scale(1, 1);transform-origin:bottom left}100\u0025{opacity:0;transform:scale(0, 0);transform-origin:bottom left}}\u0040keyframes fb_bounce_out_v2_mobile_chat_started{0\u0025{opacity:1;top:0}100\u0025{opacity:0;top:20px}}\u0040keyframes fb_customer_chat_bubble_bounce_in_animation{0\u0025{bottom:6pt;opacity:0;transform:scale(0, 0);transform-origin:center}70\u0025{bottom:18pt;opacity:1;transform:scale(1.2, 1.2)}100\u0025{transform:scale(1, 1)}}\u0040keyframes slideInFromBottom{0\u0025{opacity:.1;transform:translateY(100\u0025)}100\u0025{opacity:1;transform:translateY(0)}}\u0040keyframes slideInFromBottomDelay{0\u0025{opacity:0;transform:translateY(100\u0025)}97\u0025{opacity:0;transform:translateY(100\u0025)}100\u0025{opacity:1;transform:translateY(0)}}',
            components: [
              "css:fb.css.base",
              "css:fb.css.dialog",
              "css:fb.css.iframewidget",
              "css:fb.css.customer_chat_plugin_iframe"
            ]
          });
          __d("JSSDKXDConfig", [], {
            XXdUrl: "/x/connect/xd_arbiter/?version=46",
            useCdn: true
          });
          __d("JSSDKCanvasPrefetcherConfig", [], {
            blacklist: [144959615576466, 768691303149786, 320528941393723],
            sampleRate: 500
          });
          __d(
            "DOMWrapper",
            [],
            function $module_DOMWrapper(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.setRoot = setRoot;
              exports.getRoot = getRoot;
              exports.setWindow = setWindow;
              exports.getWindow = getWindow;

              var rootElement, windowRef;

              function setRoot(root) {
                rootElement = root;
              }

              function getRoot() {
                return rootElement || document.body;
              }
              function setWindow(win) {
                windowRef = win;
              }
              function getWindow() {
                return windowRef || self;
              }
            },
            null
          );
          __d(
            "dotAccess",
            [],
            function $module_dotAccess(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = dotAccess;

              function dotAccess(head, path, create) {
                var stack = path.split(".");
                do {
                  var key = stack.shift();
                  head = head[key] || (create && (head[key] = {}));
                } while (stack.length && head);
                return head;
              }
            },
            null
          );
          __d(
            "guid",
            [],
            function $module_guid(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = guid;

              function guid() {
                return (
                  "f" +
                  (Math.random() * (1 << 30)).toString(16).replace(".", "")
                );
              }
            },
            null
          );
          __d(
            "wrapFunction",
            [],
            function $module_wrapFunction(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = wrapFunction;

              var wrappers = {};

              function wrapFunction(fn, type, source) {
                var callee = type in wrappers ? wrappers[type](fn, source) : fn;
                return function() {
                  for (
                    var _len = arguments.length,
                      args = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    args[_key] = arguments[_key];
                  }
                  return callee.apply(this, args);
                };
              }

              wrapFunction.setWrapper = function(fn, type) {
                wrappers[type] = fn;
              };
            },
            null
          );
          __d(
            "GlobalCallback",
            ["DOMWrapper", "dotAccess", "guid", "wrapFunction"],
            function $module_GlobalCallback(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.setPrefix = setPrefix;
              exports.create = create;
              exports.remove = remove;

              var rootObject;
              var callbackPrefix;

              function setPrefix(prefix) {
                rootObject = require("dotAccess")(
                  require("DOMWrapper").getWindow(),
                  prefix,
                  true
                );
                callbackPrefix = prefix;
              }

              function create(fn, description) {
                var _description;
                if (!rootObject) {
                  this.setPrefix("__globalCallbacks");
                }
                var id = require("guid")();
                rootObject[id] = require("wrapFunction")(
                  fn,
                  "entry",
                  (_description = description) != null
                    ? _description
                    : "GlobalCallback"
                );

                return callbackPrefix + "." + id;
              }

              function remove(name) {
                var id = name.substring(callbackPrefix.length + 1);
                delete rootObject[id];
              }
            },
            null
          );
          __d(
            "Log",
            [],
            function $module_Log(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.setLevel = setLevel;

              var level = __DEV__ ? 3 : -1;

              var Level = {
                DEBUG: 3,
                INFO: 2,
                WARNING: 1,
                ERROR: 0
              };
              exports.Level = Level;

              var log = function log(name, logLevel, format) {
                for (
                  var _len = arguments.length,
                    args = new Array(_len > 3 ? _len - 3 : 0),
                    _key = 3;
                  _key < _len;
                  _key++
                ) {
                  args[_key - 3] = arguments[_key];
                }
                var index = 0;
                var msg = format.replace(/%s/g, function format_replace_$1() {
                  return String(args[index++]);
                });
                var console = window.console;
                if (console && level >= logLevel) {
                  console[name in console ? name : "log"](msg);
                }
              };
              exports.log = log;

              function setLevel(l) {
                level = l;
              }

              var debug = ES(log, "bind", true, null, "debug", Level.DEBUG);
              exports.debug = debug;

              var info = ES(log, "bind", true, null, "info", Level.INFO);
              exports.info = info;

              var warn = ES(log, "bind", true, null, "warn", Level.WARNING);
              exports.warn = warn;

              var error = ES(log, "bind", true, null, "error", Level.ERROR);
              exports.error = error;
            },
            null
          );
          __d(
            "sdk.UA",
            [],
            function $module_sdk_UA(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var uas = navigator.userAgent;

              var devices = {
                iphone: /\b(iPhone|iP[ao]d)/.test(uas),
                ipad: /\b(iP[ao]d)/.test(uas),
                android: /Android/i.test(uas),
                nativeApp: /FBAN\/\w+;/i.test(uas) && !/FBAN\/mLite;/.test(uas),
                nativeAndroidApp: /FB_IAB\/\w+;/i.test(uas),
                nativeInstagramApp: /Instagram/i.test(uas),
                nativeMessengeriOSApp: /MessengerForiOS/i.test(uas),
                nativeMessengerAndroidApp: /Orca\-Android/i.test(uas),
                ucBrowser: /UCBrowser/i.test(uas)
              };

              var mobile = /Mobile/i.test(uas);

              var versions = {
                ie: NaN,
                firefox: NaN,
                chrome: NaN,
                webkit: NaN,
                osx: NaN,
                edge: NaN,
                operaMini: NaN,
                ucWeb: NaN
              };

              var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
                uas
              );

              if (agent) {
                versions.ie = agent[1]
                  ? parseFloat(agent[1])
                  : agent[4]
                  ? parseFloat(agent[4])
                  : NaN;

                versions.firefox = agent[2] || "";
                versions.webkit = agent[3] || "";
                if (agent[3]) {
                  var chromeAgent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
                  versions.chrome = chromeAgent ? chromeAgent[1] : "";
                  var edgeAgent = /(?:Edge\/(\d+\.\d+))/.exec(uas);
                  versions.edge = edgeAgent ? edgeAgent[1] : "";
                }
              }

              var mac = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
              if (mac) {
                versions.osx = mac[1];
              }

              var operaMini = /(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(uas);
              if (operaMini) {
                versions.operaMini = operaMini[1];
              }

              var ucWeb = /(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(uas);
              if (ucWeb) {
                versions.ucWeb = ucWeb[1] || "2.0";
              }

              function getVersionParts(version) {
                return String(version)
                  .split(".")
                  .map(function map_$0(v) {
                    return parseFloat(v);
                  });
              }

              var UA = {};

              Object.keys(versions).map(function map_$0(key) {
                var getVersion = function getVersion() {
                  return parseFloat(versions[key]);
                };

                getVersion.getVersionParts = function() {
                  return getVersionParts(versions[key]);
                };

                UA[key] = getVersion;
              });

              Object.keys(devices).map(function map_$0(key) {
                UA[key] = function() {
                  return devices[key];
                };
              });

              UA.mobile = function() {
                return (
                  devices.iphone || devices.ipad || devices.android || mobile
                );
              };

              UA.mTouch = function() {
                return devices.android || devices.iphone || devices.ipad;
              };
              UA.facebookInAppBrowser = function() {
                return devices.nativeApp || devices.nativeAndroidApp;
              };
              UA.inAppBrowser = function() {
                return (
                  devices.nativeApp ||
                  devices.nativeAndroidApp ||
                  devices.nativeInstagramApp
                );
              };
              UA.mBasic = function() {
                return !!(versions.ucWeb || versions.operaMini);
              };
              UA.instagram = function() {
                return devices.nativeInstagramApp;
              };
              UA.messenger = function() {
                return (
                  devices.nativeMessengeriOSApp ||
                  devices.nativeMessengerAndroidApp
                );
              };
              UA.isSupportedIABVersion = function(supportedVersion) {
                if (!UA.facebookInAppBrowser()) {
                  return false;
                }
                var fb4aVersionRaw = /(?:FBAV\/(\d+(\.\d+)+))/.exec(
                  navigator.userAgent
                );
                if (fb4aVersionRaw) {
                  var fb4aVersion = parseFloat(fb4aVersionRaw[1]);
                  if (fb4aVersion >= supportedVersion) {
                    return true;
                  }
                }
                return false;
              };
              var _default = UA;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.domReady",
            [],
            function $module_sdk_domReady(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = domReady;

              var queue;
              var domIsReady =
                "readyState" in document
                  ? /loaded|complete/.test(document.readyState)
                  : !!document.body;

              function flush() {
                if (!queue) {
                  return;
                }

                var fn;
                while ((fn = queue.shift())) {
                  fn();
                }
                queue = null;
              }

              function domReady(fn) {
                if (queue) {
                  queue.push(fn);
                  return;
                } else {
                  fn();
                }
              }

              if (!domIsReady) {
                queue = [];
                if (document.addEventListener) {
                  document.addEventListener("DOMContentLoaded", flush, false);
                  window.addEventListener("load", flush, false);
                } else if (document.attachEvent) {
                  document.attachEvent("onreadystatechange", flush);
                  window.attachEvent("onload", flush);
                }

                if (
                  document.documentElement.doScroll &&
                  window === window.top
                ) {
                  var test = function test() {
                    try {
                      document.documentElement.doScroll("left");
                    } catch (_unused) {
                      setTimeout(test, 0);
                      return;
                    }
                    flush();
                  };
                  test();
                }
              }
            },
            3
          );
          __d(
            "sdk.Content",
            ["Log", "sdk.UA", "sdk.domReady"],
            function $module_sdk_Content(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.append = append;
              exports.appendHidden = appendHidden;
              exports.submitToTarget = submitToTarget;

              var visibleRoot;
              var hiddenRoot;

              function append(content, root) {
                if (!root) {
                  if (!visibleRoot) {
                    visibleRoot = root = document.getElementById("fb-root");
                    if (!root) {
                      require("Log").warn(
                        'The "fb-root" div has not been created, auto-creating'
                      );

                      visibleRoot = root = document.createElement("div");
                      root.id = "fb-root";

                      if (require("sdk.UA").ie() || !document.body) {
                        require("sdk.domReady")(function domReady_$0() {
                          if (root && document.body) {
                            document.body.appendChild(root);
                          }
                        });
                      } else {
                        document.body.appendChild(root);
                      }
                    }
                    root.className += " fb_reset";
                  } else {
                    root = visibleRoot;
                  }
                }

                root.appendChild(content);
                return content;
              }

              function appendHidden(content) {
                if (!hiddenRoot) {
                  hiddenRoot = document.createElement("div");
                  var style = hiddenRoot.style;
                  style.position = "absolute";
                  style.top = "-10000px";
                  style.width = "0";
                  style.height = "0";
                  hiddenRoot = append(hiddenRoot);
                }

                return append(content, hiddenRoot);
              }

              function submitToTarget(opts, get) {
                var form = document.createElement("form");
                form.action = opts.url;
                form.target = opts.target;
                form.method = get ? "GET" : "POST";
                appendHidden(form);

                for (var key in opts.params) {
                  if (Object.prototype.hasOwnProperty.call(opts.params, key)) {
                    var val = opts.params[key];
                    if (val !== null && val !== undefined) {
                      var input = document.createElement("input");
                      input.name = key;
                      input.value = val;
                      form.appendChild(input);
                    }
                  }
                }

                form.submit();
                if (form.parentNode) {
                  form.parentNode.removeChild(form);
                }
              }
            },
            null
          );
          __d(
            "sdk.DOM",
            ["guid", "sdk.domReady"],
            function $module_sdk_DOM(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.getAttr = getAttr;
              exports.getBoolAttr = getBoolAttr;
              exports.html = html;
              exports.containsCss = containsCss;
              exports.addCss = addCss;
              exports.removeCss = removeCss;
              exports.getByClass = getByClass;
              exports.getStyle = getStyle;
              exports.setStyle = setStyle;
              exports.updateOrAddCssRule = updateOrAddCssRule;
              exports.addCssRules = addCssRules;
              exports.remove = remove;
              exports.getViewportInfo = getViewportInfo;

              var defaultDocumentCssRules = {};
              var shadowDOMCssRules = {};

              function getAttr(dom, name) {
                var attribute =
                  dom.getAttribute(name) ||
                  dom.getAttribute(name.replace(/_/g, "-")) ||
                  dom.getAttribute(name.replace(/-/g, "_")) ||
                  dom.getAttribute(name.replace(/-/g, "")) ||
                  dom.getAttribute(name.replace(/_/g, "")) ||
                  dom.getAttribute("data-" + name) ||
                  dom.getAttribute("data-" + name.replace(/_/g, "-")) ||
                  dom.getAttribute("data-" + name.replace(/-/g, "_")) ||
                  dom.getAttribute("data-" + name.replace(/-/g, "")) ||
                  dom.getAttribute("data-" + name.replace(/_/g, ""));
                return attribute != null ? String(attribute) : null;
              }

              function getBoolAttr(dom, name) {
                var attribute = getAttr(dom, name);
                return attribute != null
                  ? /^(true|1|yes|on)$/.test(attribute)
                  : null;
              }

              function html(dom, content) {
                try {
                  dom.innerHTML = content;
                } catch (e) {
                  throw new Error("Could not set innerHTML : " + e.message);
                }
              }

              function containsCss(dom, className) {
                var cssClassWithSpace = " " + dom.className + " ";
                return cssClassWithSpace.indexOf(" " + className + " ") >= 0;
              }

              function addCss(dom, className) {
                if (dom == null) {
                  return;
                }
                if (!containsCss(dom, className)) {
                  dom.className = dom.className + " " + className;
                }
              }

              function removeCss(dom, className) {
                if (dom == null) {
                  return;
                }
                var regExp = new RegExp("\\s*" + className, "g");
                dom.className = dom.className.replace(regExp, "").trim();
              }

              function getByClass(className, dom, tagName) {
                if (tagName === void 0) {
                  tagName = "*";
                }
                var _dom = dom || document.body;
                if (_dom == null) {
                  return [];
                }
                var _tagName = tagName || "*";
                return ES(
                  "Array",
                  "from",
                  false,
                  _dom.querySelectorAll(_tagName + "." + className)
                );
              }

              function getStyle(dom, styleProp) {
                var _styleProp = camelToDashed(styleProp);
                var computedStyle = document.defaultView
                  .getComputedStyle(dom)
                  .getPropertyValue(_styleProp);

                computedStyle = dom.style.getPropertyValue(_styleProp);

                if (
                  /background-position?/.test(_styleProp) &&
                  /top|left/.test(computedStyle)
                ) {
                  computedStyle = "0%";
                }
                return computedStyle;
              }

              function setStyle(dom, styleProp, value) {
                dom.style.setProperty(camelToDashed(styleProp), value);
              }

              function updateOrAddCssRule(
                root,
                sdkCssModule,
                selectorText,
                styleProp,
                value
              ) {
                var styleSheetList = root.styleSheets;
                for (var i = 0; i < styleSheetList.length; i++) {
                  var _styleSheetList$i$own;
                  if (
                    styleSheetList[i].ownerNode instanceof HTMLElement &&
                    styleSheetList[i].ownerNode.dataset != null &&
                    ((_styleSheetList$i$own =
                      styleSheetList[i].ownerNode.dataset.fbcssmodules) == null
                      ? void 0
                      : _styleSheetList$i$own.indexOf(sdkCssModule)) !== -1
                  ) {
                    var sheet = styleSheetList[i];
                    if (sheet instanceof CSSStyleSheet) {
                      var _value;
                      for (var j = 0; j < sheet.cssRules.length; j++) {
                        var rule = sheet.cssRules[j];
                        if (rule instanceof CSSStyleRule) {
                          if (rule.selectorText === selectorText) {
                            rule.style.setProperty(
                              camelToDashed(styleProp),
                              value
                            );
                            return;
                          }
                        }
                      }

                      sheet.insertRule(
                        selectorText +
                          "{" +
                          camelToDashed(styleProp) +
                          ":" +
                          ((_value = value) != null ? _value : "") +
                          "}",
                        0
                      );
                    }
                  }
                }
              }

              function addCssRules(styles, names, dom) {
                var cssRules;
                if (dom != null && dom.nodeType === 11) {
                  var shadowDom = dom;
                  if (
                    shadowDom.host.id != null &&
                    shadowDOMCssRules[shadowDom.host.id] != null
                  ) {
                    cssRules = shadowDOMCssRules[shadowDom.host.id];
                  } else {
                    if (!shadowDom.host.id) {
                      shadowDom.host.id = require("guid")();
                    }
                    cssRules = {};
                    shadowDOMCssRules[shadowDom.host.id] = cssRules;
                  }
                } else {
                  cssRules = defaultDocumentCssRules;
                }

                var allIncluded = true;
                for (var i = 0, id; (id = names[i++]); ) {
                  if (!(id in cssRules)) {
                    allIncluded = false;
                    cssRules[id] = true;
                  }
                }

                if (allIncluded) {
                  return;
                }

                var style = document.createElement("style");
                style.type = "text/css";
                style.textContent = styles;
                var attrVal = "";
                names.forEach(function names_forEach_$0(v) {
                  return (attrVal += v + " ");
                });
                style.setAttribute("data-fbcssmodules", attrVal.trim());
                if (dom == null || dom === document) {
                  document.getElementsByTagName("head")[0].appendChild(style);
                } else {
                  dom.appendChild(style);
                }
              }

              function remove(elem) {
                if (!elem || !elem.parentNode) {
                  return null;
                } else {
                  return elem.parentNode.removeChild(elem);
                }
              }

              function getViewportInfo() {
                var _document$body, _document$body2;

                var root =
                  document.documentElement &&
                  document.compatMode == "CSS1Compat"
                    ? document.documentElement
                    : document.body;

                return {
                  scrollTop:
                    (root == null ? void 0 : root.scrollTop) ||
                    ((_document$body = document.body) == null
                      ? void 0
                      : _document$body.scrollTop),
                  scrollLeft:
                    (root == null ? void 0 : root.scrollLeft) ||
                    ((_document$body2 = document.body) == null
                      ? void 0
                      : _document$body2.scrollLeft),
                  width: window.innerWidth
                    ? window.innerWidth
                    : root == null
                    ? void 0
                    : root.clientWidth,
                  height: window.innerHeight
                    ? window.innerHeight
                    : root == null
                    ? void 0
                    : root.clientHeight
                };
              }

              var camel_to_dashed = /[A-Z]/g;
              var first_segment = /^\([^-]\)-/;
              var vendor_prefixes = ["o", "moz", "ms", "webkit"];

              function camelToDashed(camelCase) {
                var dashed = camelCase
                  .replace(camel_to_dashed, "-$&")
                  .toLowerCase();
                var match = dashed.match(first_segment);
                if (match && vendor_prefixes.indexOf(match[1]) !== -1) {
                  dashed = "-" + dashed;
                }
                return dashed;
              }

              var ready = require("sdk.domReady");
              exports.ready = ready;
            },
            null
          );
          __d(
            "ManagedError",
            [],
            function $module_ManagedError(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ManagedError = (function(_Error) {
                babelHelpers.inheritsLoose(ManagedError, _Error);

                function ManagedError(message, innerError) {
                  var _this;
                  _this =
                    _Error.call(
                      this,
                      message !== null && message !== undefined ? message : ""
                    ) || this;
                  if (message !== null && message !== undefined) {
                    _this.message = message;
                  } else {
                    _this.message = "";
                  }
                  _this.innerError = innerError;
                  return _this;
                }
                return ManagedError;
              })(babelHelpers.wrapNativeSuper(Error));
              module.exports = ManagedError;
            },
            null
          );
          __d(
            "normalizeError",
            ["sdk.UA"],
            function $module_normalizeError(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = normalizeError;

              function normalizeError(err) {
                var info = {
                  line: err.lineNumber || err.line,
                  message: err.message,
                  name: err.name,
                  script: err.fileName || err.sourceURL || err.script,
                  stack: err.stackTrace || err.stack
                };

                info._originalError = err;

                var matches = /([\w:\.\/]+\.js):(\d+)/.exec(err.stack);
                if (require("sdk.UA").chrome() && matches) {
                  info.script = matches[1];
                  info.line = parseInt(matches[2], 10);
                }

                for (var k in info) {
                  info[k] == null && delete info[k];
                }
                return info;
              }
            },
            null
          );
          __d(
            "sdk.ErrorHandler",
            ["ManagedError", "normalizeError", "wrapFunction"],
            function $module_sdk_ErrorHandler(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.create = create;

              function create(handleError, onError) {
                var currentEntry = "";

                function errorHandler(error) {
                  var originalError = error._originalError;
                  delete error._originalError;
                  onError(error);

                  throw originalError;
                }

                function guard(func, entry) {
                  return function() {
                    if (!handleError) {
                      return func.apply(this, arguments);
                    }

                    try {
                      currentEntry = entry;
                      return func.apply(this, arguments);
                    } catch (error) {
                      if (error instanceof require("ManagedError")) {
                        throw error;
                      }

                      var data = require("normalizeError")(error);
                      data.entry = entry;

                      var sanitizedArgs = Array.prototype.slice
                        .call(arguments)
                        .map(function map_$0(arg) {
                          var type = Object.prototype.toString.call(arg);
                          return /^\[object (String|Number|Boolean|Object|Date)\]$/.test(
                            type
                          )
                            ? arg
                            : arg.toString();
                        });

                      data.args = ES(
                        "JSON",
                        "stringify",
                        false,
                        sanitizedArgs
                      ).substring(0, 200);
                      errorHandler(data);
                    } finally {
                      currentEntry = "";
                    }
                  };
                }

                function unguard(func) {
                  if (!func.__wrapper) {
                    func.__wrapper = function() {
                      try {
                        return func.apply(this, arguments);
                      } catch (e) {
                        window.setTimeout(function window_setTimeout_$0() {
                          throw e;
                        }, 0);
                        return false;
                      }
                    };
                  }
                  return func.__wrapper;
                }

                function getCalleeName(arg) {
                  try {
                    return arg && arg.callee && arg.callee.caller
                      ? arg.callee.caller.name
                      : "";
                  } catch (_unused) {
                    return "";
                  }
                }

                function wrap(real, entry) {
                  return function(fn, delay) {
                    var name =
                      entry +
                      ":" +
                      (currentEntry || "[global]") +
                      ":" +
                      (fn.name || "[anonymous]" + getCalleeName(arguments));
                    return real(
                      require("wrapFunction")(fn, "entry", name),
                      delay
                    );
                  };
                }

                if (handleError) {
                  setTimeout = wrap(setTimeout, "setTimeout");
                  setInterval = wrap(setInterval, "setInterval");
                  require("wrapFunction").setWrapper(guard, "entry");
                }

                return {
                  guard: guard,
                  unguard: unguard
                };
              }
            },
            null
          );
          __d(
            "ObservableMixin",
            [],
            function $module_ObservableMixin(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function ObservableMixin() {
                this.__observableEvents = {};
              }
              _c = ObservableMixin;

              ObservableMixin.prototype = {
                inform: function inform(what) {
                  var args = Array.prototype.slice.call(arguments, 1);
                  var list = Array.prototype.slice.call(
                    this.getSubscribers(what)
                  );
                  for (var i = 0; i < list.length; i++) {
                    if (list[i] === null) {
                      continue;
                    }
                    if (__DEV__) {
                      list[i].apply(this, args);
                    } else {
                      try {
                        list[i].apply(this, args);
                      } catch (e) {
                        window.setTimeout(function window_setTimeout_$0() {
                          throw e;
                        }, 0);
                      }
                    }
                  }
                  return this;
                },

                getSubscribers: function getSubscribers(toWhat) {
                  return (
                    this.__observableEvents[toWhat] ||
                    (this.__observableEvents[toWhat] = [])
                  );
                },

                clearSubscribers: function clearSubscribers(toWhat) {
                  if (toWhat) {
                    this.__observableEvents[toWhat] = [];
                  }
                  return this;
                },

                subscribe: function subscribe(toWhat, withWhat) {
                  var list = this.getSubscribers(toWhat);
                  list.push(withWhat);
                  return this;
                },

                unsubscribe: function unsubscribe(toWhat, withWhat) {
                  var list = this.getSubscribers(toWhat);
                  for (var i = 0; i < list.length; i++) {
                    if (list[i] === withWhat) {
                      list.splice(i, 1);
                      break;
                    }
                  }
                  return this;
                }
              };

              module.exports = ObservableMixin;
              var _c;
              $RefreshReg$(_c, "ObservableMixin");
            },
            null
          );
          __d(
            "AssertionError",
            ["ManagedError"],
            function $module_AssertionError(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var AssertionError = (function(_ManagedError) {
                babelHelpers.inheritsLoose(AssertionError, _ManagedError);
                function AssertionError(message) {
                  return _ManagedError.call(this, message) || this;
                }
                return AssertionError;
              })(require("ManagedError"));
              module.exports = AssertionError;
            },
            null
          );
          __d(
            "sprintf",
            [],
            function $module_sprintf(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = sprintf;

              function sprintf(format) {
                for (
                  var _len = arguments.length,
                    args = new Array(_len > 1 ? _len - 1 : 0),
                    _key = 1;
                  _key < _len;
                  _key++
                ) {
                  args[_key - 1] = arguments[_key];
                }
                var index = 0;
                return format.replace(/%s/g, function format_replace_$1() {
                  return String(args[index++]);
                });
              }
            },
            null
          );
          __d(
            "Assert",
            ["AssertionError", "sprintf"],
            function $module_Assert(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function assert(expression, message) {
                if (typeof expression !== "boolean" || expression === false) {
                  throw new (require("AssertionError"))(message);
                }
                return expression;
              }

              function assertType(type, expression, message) {
                var _message2;
                var actualType;

                if (expression === undefined) {
                  actualType = "undefined";
                } else if (expression === null) {
                  actualType = "null";
                } else {
                  var className = Object.prototype.toString.call(expression);
                  var regexpResult = /\s(\w*)/.exec(className);
                  actualType =
                    regexpResult == null
                      ? typeof regexpResult
                      : regexpResult[1].toLowerCase();
                }

                assert(
                  type.indexOf(actualType) !== -1,
                  (_message2 = message) != null
                    ? _message2
                    : require("sprintf")(
                        "Expression is of type %s, not %s",
                        actualType,
                        type
                      )
                );

                return expression;
              }

              function assertInstanceOf(type, expression, message) {
                var _message3;
                assert(
                  expression instanceof type,
                  (_message3 = message) != null
                    ? _message3
                    : "Expression not instance of type"
                );

                return expression;
              }

              function define(type, test) {
                Assert["is" + type] = test;
                Assert["maybe" + type] = function(expression, message) {
                  return expression == null
                    ? expression
                    : test(expression, message);
                };
              }

              var placeholder = function placeholder(expression, _message) {
                return expression;
              };

              var Assert = {
                isInstanceOf: assertInstanceOf,
                isTrue: assert,
                isTruthy: function isTruthy(expression, message) {
                  return assert(!!expression, message);
                },
                isBoolean: placeholder,
                isFunction: placeholder,
                isNumber: placeholder,
                isObject: placeholder,
                isString: placeholder,
                isUndefined: placeholder,
                maybeObject: placeholder,
                maybeNumber: placeholder,
                maybeFunction: placeholder
              };

              [
                "Boolean",
                "Function",
                "Number",
                "Object",
                "String",
                "Undefined"
              ].forEach(function forEach_$0(type) {
                define(type, ES(
                  assertType,
                  "bind",
                  true,
                  null,
                  type.toLowerCase()
                ));
              });
              var _default = Assert;
              module.exports = _default;
            },
            null
          );
          __d(
            "Type",
            ["Assert"],
            function $module_Type(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function Type() {
                var mixins = this.__mixins;
                if (mixins) {
                  for (var i = 0; i < mixins.length; i++) {
                    mixins[i].apply(this, arguments);
                  }
                }
              }
              _c = Type;

              function _instanceOf(constructor, which) {
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
              }

              function mixin(to, from) {
                var prototype = to.prototype;

                if (!Array.isArray(from)) {
                  from = [from];
                }

                for (var i = 0; i < from.length; i++) {
                  var mixinFrom = from[i];

                  if (typeof mixinFrom === "function") {
                    prototype.__mixins.push(mixinFrom);
                    mixinFrom = mixinFrom.prototype;
                  }

                  Object.keys(mixinFrom).forEach(function forEach_$0(key) {
                    prototype[key] = mixinFrom[key];
                  });
                }
              }

              function _extend(from, prototype, mixins) {
                var constructor =
                  prototype &&
                  Object.prototype.hasOwnProperty.call(prototype, "constructor")
                    ? prototype.constructor
                    : function() {
                        this.parent.apply(this, arguments);
                      };

                require("Assert").isFunction(constructor);

                if (from && from.prototype instanceof Type === false) {
                  throw new Error("parent type does not inherit from Type");
                }
                from = from || Type;

                function F() {}
                F.prototype = from.prototype;
                constructor.prototype = new F();

                if (prototype) {
                  ES(
                    "Object",
                    "assign",
                    false,
                    constructor.prototype,
                    prototype
                  );
                }

                constructor.prototype.constructor = constructor;

                constructor.parent = from;

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

                constructor.prototype.parentCall = function(method) {
                  return from.prototype[method].apply(
                    this,
                    Array.prototype.slice.call(arguments, 1)
                  );
                };

                constructor.extend = function(prototype, mixins) {
                  return _extend(this, prototype, mixins);
                };
                return constructor;
              }

              ES("Object", "assign", false, Type.prototype, {
                instanceOf: function instanceOf(type) {
                  return _instanceOf(type, this);
                }
              });

              ES("Object", "assign", false, Type, {
                extend: function extend(prototype, mixins) {
                  return typeof prototype === "function"
                    ? _extend.apply(null, arguments)
                    : _extend(null, prototype, mixins);
                },
                instanceOf: _instanceOf
              });

              module.exports = Type;
              var _c;
              $RefreshReg$(_c, "Type");
            },
            null
          );
          __d(
            "sdk.Model",
            ["ObservableMixin", "Type"],
            function $module_sdk_Model(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var Model = require("Type").extend(
                {
                  constructor: function constructor(properties) {
                    this.parent();

                    var propContainer = {};
                    var model = this;

                    Object.keys(properties).forEach(function forEach_$0(name) {
                      propContainer[name] = properties[name];

                      model["set" + name] = function(value) {
                        if (value === propContainer[name]) {
                          return model;
                        }
                        propContainer[name] = value;
                        model.inform(name + ".change", value);
                        return model;
                      };

                      model["get" + name] = function() {
                        return propContainer[name];
                      };
                    });
                  }
                },
                require("ObservableMixin")
              );
              var _default = Model;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.Runtime",
            ["JSSDKRuntimeConfig", "sdk.Model"],
            function $module_sdk_Runtime(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var JSSDKRuntimeConfig;

              var ENVIRONMENTS = {
                UNKNOWN: 0,
                PAGETAB: 1,
                CANVAS: 2,
                PLATFORM: 4
              };

              var Runtime = new (require("sdk.Model"))({
                AccessToken: "",
                AutoLogAppEvents: false,
                ClientID: "",
                CookieUserID: "",
                EnforceHttps: false,
                Environment: ENVIRONMENTS.UNKNOWN,
                GraphDomain: "",
                Initialized: false,
                IsVersioned: false,
                KidDirectedSite: undefined,
                Locale: (JSSDKRuntimeConfig = require("JSSDKRuntimeConfig"))
                  .locale,
                LoggedIntoFacebook: undefined,
                LoginStatus: undefined,
                Revision: JSSDKRuntimeConfig.revision,
                Rtl: JSSDKRuntimeConfig.rtl,
                Scope: undefined,
                SDKAB: JSSDKRuntimeConfig.sdkab,
                SDKUrl: JSSDKRuntimeConfig.sdkurl,
                SDKNS: JSSDKRuntimeConfig.sdkns,
                UseCookie: false,
                UseLocalStorage: true,
                UserID: "",
                Version: undefined
              });

              ES("Object", "assign", false, Runtime, {
                ENVIRONMENTS: ENVIRONMENTS,

                isEnvironment: function isEnvironment(target) {
                  var environment = this.getEnvironment();
                  return (target | environment) === environment;
                },

                isCanvasEnvironment: function isCanvasEnvironment() {
                  return (
                    this.isEnvironment(ENVIRONMENTS.CANVAS) ||
                    this.isEnvironment(ENVIRONMENTS.PAGETAB)
                  );
                }
              });

              (function() {
                var environment = /app_runner/.test(window.name)
                  ? ENVIRONMENTS.PAGETAB
                  : /iframe_canvas/.test(window.name)
                  ? ENVIRONMENTS.CANVAS
                  : ENVIRONMENTS.UNKNOWN;

                if ((environment | ENVIRONMENTS.PAGETAB) === environment) {
                  environment |= ENVIRONMENTS.CANVAS;
                }
                Runtime.setEnvironment(environment);
              })();
              var _default = Runtime;
              module.exports = _default;
            },
            null
          );
          __d(
            "QueryString",
            [],
            function $module_QueryString(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function encode(bag) {
                var pairs = [];
                Object.keys(bag)
                  .sort()
                  .forEach(function forEach_$0(key) {
                    var value = bag[key];

                    if (value === undefined) {
                      return;
                    }

                    if (value === null) {
                      pairs.push(key);
                      return;
                    }

                    pairs.push(
                      encodeURIComponent(key) + "=" + encodeURIComponent(value)
                    );
                  });
                return pairs.join("&");
              }

              function decode(str, strict) {
                if (strict === void 0) {
                  strict = false;
                }
                var data = {};
                if (str === "") {
                  return data;
                }

                var pairs = str.split("&");
                for (var i = 0; i < pairs.length; i++) {
                  var pair = pairs[i].split("=", 2);
                  var key = decodeURIComponent(pair[0]);
                  if (
                    strict &&
                    Object.prototype.hasOwnProperty.call(data, key)
                  ) {
                    throw new URIError("Duplicate key: " + key);
                  }
                  data[key] =
                    pair.length === 2 ? decodeURIComponent(pair[1]) : null;
                }
                return data;
              }

              function appendToUrl(url, params) {
                return (
                  url +
                  (url.indexOf("?") !== -1 ? "&" : "?") +
                  (typeof params === "string"
                    ? params
                    : QueryString.encode(params))
                );
              }

              var QueryString = {
                encode: encode,
                decode: decode,
                appendToUrl: appendToUrl
              };
              var _default = QueryString;
              module.exports = _default;
            },
            null
          );
          __d(
            "Env",
            [],
            function $module_Env(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var Env = {
                ajaxpipe_token: null,
                compat_iframe_token: null,
                iframeKey: "",
                iframeTarget: "",
                iframeToken: "",
                isCQuick: false,
                start: Date.now(),
                nocatch: false
              };

              if (global.Env) {
                ES("Object", "assign", false, Env, global.Env);
              }

              global.Env = Env;
              var _default = Env;
              module.exports = _default;
            },
            null
          );
          __d(
            "fb-error-lite",
            [],
            function $module_fb_error_lite(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var TAALOpcode = {
                PREVIOUS_FILE: 1,
                PREVIOUS_FRAME: 2,
                PREVIOUS_DIR: 3,
                FORCED_KEY: 4
              };

              function err(format) {
                var err = new Error(format);

                if (err.stack === undefined) {
                  try {
                    throw err;
                  } catch (_) {}
                }
                err.messageFormat = format;
                for (
                  var _len = arguments.length,
                    rawArgs = new Array(_len > 1 ? _len - 1 : 0),
                    _key = 1;
                  _key < _len;
                  _key++
                ) {
                  rawArgs[_key - 1] = arguments[_key];
                }
                err.messageParams = rawArgs.map(function rawArgs_map_$0(p) {
                  return String(p);
                });
                err.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];
                return err;
              }
              var _default = {
                err: err,
                TAALOpcode: TAALOpcode
              };
              module.exports = _default;
            },
            null
          );
          __d(
            "invariant",
            ["Env", "fb-error-lite", "sprintf"],
            function $module_invariant(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = invariant;
              var c_Env;
              var TAALOpcode = require("fb-error-lite").TAALOpcode;

              function invariant(condition, format) {
                if (!condition) {
                  var formatString = format;
                  for (
                    var _len = arguments.length,
                      params = new Array(_len > 2 ? _len - 2 : 0),
                      _key = 2;
                    _key < _len;
                    _key++
                  ) {
                    params[_key - 2] = arguments[_key];
                  }
                  if (typeof formatString === "number") {
                    var _buildProdMessage = buildProdMessage(
                        formatString,
                        params
                      ),
                      _message = _buildProdMessage.message,
                      decoderLink = _buildProdMessage.decoderLink;
                    formatString = _message;
                    params.unshift(decoderLink);
                  } else if (formatString === undefined) {
                    formatString = "Invariant: ";
                    for (var i = 0; i < params.length; i++) {
                      formatString += "%s,";
                    }
                  }

                  var message = formatString;
                  if (__DEV__) {
                    message = require("sprintf").apply(
                      void 0,
                      [formatString].concat(params)
                    );
                  }
                  var error = new Error(message);
                  error.name = "Invariant Violation";
                  error.messageFormat = formatString;
                  error.messageParams = params.map(function params_map_$0(p) {
                    return String(p);
                  });
                  error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];

                  error.stack;
                  throw error;
                }
              }

              function buildProdMessage(number, params) {
                var message = "Minified invariant #" + number + "; %s";
                if (params.length > 0) {
                  message +=
                    " Params: " +
                    params
                      .map(function params_map_$0(_) {
                        return "%s";
                      })
                      .join(", ");
                }

                var decoderLink =
                  (c_Env || (c_Env = require("Env"))).show_invariant_decoder ===
                  true
                    ? "visit " +
                      buildDecoderLink(number, params) +
                      " to see the full message."
                    : "";

                return { message: message, decoderLink: decoderLink };
              }

              function buildDecoderLink(number, params) {
                var decodeURI =
                  "https://www.internalfb.com/intern/invariant/" + number + "/";
                if (params.length > 0) {
                  decodeURI +=
                    "?" +
                    params
                      .map(function params_map_$0(param, index) {
                        return (
                          "args[" +
                          index +
                          "]=" +
                          encodeURIComponent(String(param))
                        );
                      })
                      .join("&");
                }
                return decodeURI;
              }
            },
            null
          );
          __d(
            "UrlMap",
            ["invariant", "UrlMapConfig", "sdk.Runtime"],
            function $module_UrlMap(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant
            ) {
              exports.resolve = resolve;

              function resolve(key) {
                var protocol = "https";

                if (key === "graph_domain") {
                  var graphDomain = require("sdk.Runtime").getGraphDomain();
                  if (!!graphDomain) {
                    key = "graph_".concat(graphDomain);
                  } else {
                    key = "graph";
                  }
                }

                if (key in require("UrlMapConfig")) {
                  return protocol + "://" + require("UrlMapConfig")[key];
                }

                key in require("UrlMapConfig") ||
                  invariant(0, "Unknown key in UrlMapConfig: %s", key);
                return "";
              }
            },
            null
          );
          __d(
            "sdk.FeatureFunctor",
            [],
            function $module_sdk_FeatureFunctor(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.create = create;

              function feature(config, name, defaultValue) {
                if (config.features && name in config.features) {
                  var value = config.features[name];
                  if (
                    typeof value === "object" &&
                    typeof value.rate === "number"
                  ) {
                    if (value.rate && Math.random() * 100 <= value.rate) {
                      return value.value || true;
                    } else {
                      return value.value ? null : false;
                    }
                  } else {
                    return value;
                  }
                }
                return defaultValue;
              }

              function create(config) {
                return function() {
                  for (
                    var _len = arguments.length,
                      args = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    args[_key] = arguments[_key];
                  }
                  if (args.length < 2) {
                    throw new Error("Default value is required");
                  }
                  var name = args[0],
                    defaultValue = args[1];
                  return feature(config, name, defaultValue);
                };
              }
            },
            null
          );
          __d(
            "sdk.feature",
            ["JSSDKConfig", "sdk.FeatureFunctor"],
            function $module_sdk_feature(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var _default = require("sdk.FeatureFunctor").create(
                require("JSSDKConfig")
              );
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.Scribe",
            ["QueryString", "UrlMap", "sdk.Runtime", "sdk.feature"],
            function $module_sdk_Scribe(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.log = log;

              function log(category, data, should_include_creds) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                if (data.extra != null && typeof data.extra === "object") {
                  var extra = data.extra;
                  extra.revision = require("sdk.Runtime").getRevision();
                }

                var image = new Image();

                var url =
                  require("UrlMap").resolve("www") +
                  "/common/scribe_endpoint.php";
                if (require("sdk.feature")("epd_endpoint_migration", false)) {
                  url =
                    require("UrlMap").resolve("www") +
                    "/platform/scribe_endpoint.php/";
                  if (
                    require("sdk.feature")("epd_omit_cookies", false) &&
                    !should_include_creds
                  ) {
                    image.crossOrigin = "anonymous";
                  }
                }

                image.src = require("QueryString").appendToUrl(url, {
                  c: category,
                  m: ES("JSON", "stringify", false, data)
                });
              }
            },
            null
          );
          __d(
            "sdk.ErrorHandling",
            ["sdk.ErrorHandler", "sdk.Runtime", "sdk.Scribe", "sdk.feature"],
            function $module_sdk_ErrorHandling(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var handleError = require("sdk.feature")("error_handling", false);
              var _default = require("sdk.ErrorHandler").create(
                handleError,
                function ErrorHandler_create_$1(error) {
                  require("sdk.Scribe").log("jssdk_error", {
                    appId: require("sdk.Runtime").getClientID(),
                    error: error.name || error.message,
                    extra: error
                  });
                }
              );
              module.exports = _default;
            },
            null
          );
          __d(
            "FB",
            [
              "DOMWrapper",
              "GlobalCallback",
              "JSSDKCssConfig",
              "Log",
              "dotAccess",
              "sdk.Content",
              "sdk.DOM",
              "sdk.ErrorHandling",
              "sdk.domReady"
            ],
            function $module_FB(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var externalInterface = (window.FB = {});

              var FB = {};

              if (__DEV__) {
                FB.require = require;
                window._FB = FB;
              }

              require("Log").setLevel(__DEV__ ? 3 : 0);

              require("GlobalCallback").setPrefix("FB.__globalCallbacks");

              var fbRoot = document.createElement("div");
              require("DOMWrapper").setRoot(fbRoot);

              require("sdk.domReady")(function domReady_$0() {
                require("Log").info("domReady");
                require("sdk.Content").appendHidden(fbRoot);
                if (require("JSSDKCssConfig").rules) {
                  require("sdk.DOM").addCssRules(
                    require("JSSDKCssConfig").rules,
                    require("JSSDKCssConfig").components
                  );
                }
              });

              function protect(fn, accessor, key, context) {
                return require("sdk.ErrorHandling").guard(
                  function ErrorHandling_guard_$0() {
                    function unwrap(val) {
                      if (Array.isArray(val)) {
                        return val.map(unwrap);
                      }
                      if (val && typeof val === "object" && val.__wrapped) {
                        return val.__wrapped;
                      }

                      return typeof val === "function" &&
                        /^function/.test(val.toString())
                        ? require("sdk.ErrorHandling").unguard(val)
                        : val;
                    }

                    var args = Array.prototype.slice
                      .call(arguments)
                      .map(unwrap);

                    var result = fn.apply(context, args);
                    var facade;
                    var isPlainObject = true;

                    if (result && typeof result === "object") {
                      facade = Object.create(result);
                      facade.__wrapped = result;

                      for (var key in result) {
                        var property = result[key];
                        if (
                          typeof property !== "function" ||
                          key === "constructor"
                        ) {
                          continue;
                        }
                        isPlainObject = false;
                        facade[key] = protect(
                          property,
                          accessor + ":" + key,
                          key,
                          result
                        );
                      }
                    }

                    if (!isPlainObject) {
                      return facade;
                    }
                    return isPlainObject ? result : facade;
                  },
                  accessor
                );
              }

              function provide(name, source) {
                var externalTarget = name
                  ? require("dotAccess")(externalInterface, name, true)
                  : externalInterface;

                Object.keys(source).forEach(function forEach_$0(key) {
                  var value = source[key];

                  if (typeof value === "function") {
                    var accessor = (name ? name + "." : "") + key;
                    var exportedProperty = protect(
                      value,
                      accessor,
                      key,
                      source
                    );
                    if (exportedProperty) {
                      externalTarget[key] = exportedProperty;
                    }
                  } else if (
                    typeof value === "object" ||
                    typeof value === "number"
                  ) {
                    externalTarget[key] = value;
                  }
                });
              }

              ES("Object", "assign", false, FB, {
                provide: provide
              });

              module.exports = FB;
            },
            null
          );
          __d(
            "ArgumentError",
            ["ManagedError"],
            function $module_ArgumentError(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ArgumentError = (function(_ManagedError) {
                babelHelpers.inheritsLoose(ArgumentError, _ManagedError);
                function ArgumentError(message, innerError) {
                  return _ManagedError.call(this, message, innerError) || this;
                }
                return ArgumentError;
              })(require("ManagedError"));
              module.exports = ArgumentError;
            },
            null
          );
          __d(
            "flattenObject",
            [],
            function $module_flattenObject(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = flattenObject;

              function flattenObject(obj) {
                var flat = {};
                for (var _key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, _key)) {
                    var value = obj[_key];
                    if (null === value || undefined === value) {
                      continue;
                    } else if (typeof value === "string") {
                      flat[_key] = value;
                    } else {
                      flat[_key] = ES("JSON", "stringify", false, value);
                    }
                  }
                }
                return flat;
              }
            },
            null
          );
          __d(
            "URIRFC3986",
            [],
            function $module_URIRFC3986(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.parse = parse;

              var PARSE_PATTERN = new RegExp(
                "^" +
                  "([^:/?#]+:)?" +
                  "(//" +
                  "([^\\\\/?#@]*@)?" +
                  "(" +
                  "\\[[A-Fa-f0-9:.]+\\]|" +
                  "[^\\/?#:]*" +
                  ")" +
                  "(:[0-9]*)?" +
                  ")?" +
                  "([^?#]*)" +
                  "(\\?[^#]*)?" +
                  "(#.*)?"
              );

              function parse(uriString) {
                if (uriString.trim() === "") {
                  return null;
                }
                var captures = uriString.match(PARSE_PATTERN);
                if (captures == null) {
                  return null;
                }
                var uri = {};

                uri.uri = captures[0] ? captures[0] : null;
                uri.scheme = captures[1]
                  ? captures[1].substr(0, captures[1].length - 1)
                  : null;
                uri.authority = captures[2] ? captures[2].substr(2) : null;
                uri.userinfo = captures[3]
                  ? captures[3].substr(0, captures[3].length - 1)
                  : null;
                uri.host = captures[2] ? captures[4] : null;
                uri.port = captures[5]
                  ? captures[5].substr(1)
                    ? parseInt(captures[5].substr(1), 10)
                    : null
                  : null;
                uri.path = captures[6] ? captures[6] : null;
                uri.query = captures[7] ? captures[7].substr(1) : null;
                uri.fragment = captures[8] ? captures[8].substr(1) : null;
                uri.isGenericURI = uri.authority === null && !!uri.scheme;
                return uri;
              }
            },
            null
          );
          __d(
            "createObjectFrom",
            [],
            function $module_createObjectFrom(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = createObjectFrom;

              function createObjectFrom(keys, values) {
                if (__DEV__) {
                  if (!Array.isArray(keys)) {
                    throw new TypeError("Must pass an array of keys.");
                  }
                }
                if (values === undefined) {
                  return createObjectFrom(keys, true);
                }

                var object = {};
                if (Array.isArray(values)) {
                  for (var ii = keys.length - 1; ii >= 0; ii--) {
                    object[keys[ii]] = values[ii];
                  }
                } else {
                  for (var _ii = keys.length - 1; _ii >= 0; _ii--) {
                    object[keys[_ii]] = values;
                  }
                }

                return object;
              }
            },
            null
          );
          __d(
            "URISchemes",
            ["createObjectFrom"],
            function $module_URISchemes(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.isAllowed = isAllowed;

              var defaultSchemes = require("createObjectFrom")([
                "aidemos",
                "aistudio",
                "blob",
                "cmms",
                "fb",
                "fba",
                "fbatwork",
                "fb-ama",
                "fb-workchat",
                "fb-workchat-secure",
                "fb-messenger",
                "fb-messenger-public",
                "fb-messenger-group-thread",
                "fb-page-messages",
                "fb-pma",
                "fbcf",
                "fbconnect",
                "fbinternal",
                "fbmobilehome",
                "fbrpc",
                "file",
                "ftp",
                "gtalk",
                "http",
                "https",
                "mailto",
                "wss",
                "ms-app",
                "intent",
                "itms",
                "itms-apps",
                "lasso",
                "market",
                "svn+ssh",
                "fbstaging",
                "tel",
                "sms",
                "pebblejs",
                "sftp",
                "whatsapp",
                "moments",
                "flash",
                "fblite",
                "chrome-extension",
                "webcal",
                "fb124024574287414",
                "fb124024574287414rc",
                "fb124024574287414master",
                "fb1576585912599779",
                "fb929757330408142",
                "designpack",
                "fbpixelcloud",
                "fbapi20130214",
                "fb1196383223757595",
                "oculus",
                "oculus.store",
                "oculus.feed",
                "oculusstore",
                "odh",
                "skype",
                "callto",
                "workchat",
                "fb236786383180508",
                "fb1775440806014337",
                "data",
                "fb-mk",
                "munki",
                "kirigami",
                "origami-file",
                "fb-nimble-vrsrecorder",
                "fb-nimble-monohandtrackingvis",
                "together",
                "togetherbl",
                "venues",
                "whatsapp-consumer",
                "whatsapp-smb",
                "fb-ide-opener",
                "spark-studio"
              ]);

              function isAllowed(schema) {
                if (schema == null || schema === "") {
                  return true;
                }
                return Object.prototype.hasOwnProperty.call(
                  defaultSchemes,
                  schema.toLowerCase()
                );
              }
            },
            null
          );
          __d(
            "setHostSubdomain",
            [],
            function $module_setHostSubdomain(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = setHostSubdomain;

              function setHostSubdomain(domain, subdomain) {
                var pieces = domain.split(".");
                if (pieces.length < 3) {
                  pieces.unshift(subdomain);
                } else {
                  pieces[0] = subdomain;
                }
                return pieces.join(".");
              }
            },
            null
          );
          __d(
            "URIAbstractBase",
            ["invariant", "URIRFC3986", "URISchemes", "setHostSubdomain"],
            function $module_URIAbstractBase(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant
            ) {
              var c_URIRFC3986;
              var c_URISchemes;

              var UNSAFE_DOMAIN_PATTERN = new RegExp(
                "[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f" +
                  "\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF" +
                  "\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"
              );

              var SECURITY_PATTERN = new RegExp(
                "^(?:[^/]*:|" + "[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"
              );

              var uriFilters = [];
              var URIAbstractBase = (function() {
                "use strict";
                URIAbstractBase.parse = function parse(
                  uri,
                  uriToParse,
                  shouldThrow,
                  serializer
                ) {
                  if (!uriToParse) {
                    return true;
                  }

                  if (uriToParse instanceof URIAbstractBase) {
                    uri.setProtocol(uriToParse.getProtocol());
                    uri.setDomain(uriToParse.getDomain());
                    uri.setPort(uriToParse.getPort());
                    uri.setPath(uriToParse.getPath());
                    uri.setQueryData(
                      serializer.deserialize(
                        serializer.serialize(uriToParse.getQueryData())
                      )
                    );

                    uri.setFragment(uriToParse.getFragment());
                    uri.setIsGeneric(uriToParse.getIsGeneric());
                    uri.setForceFragmentSeparator(
                      uriToParse.getForceFragmentSeparator()
                    );
                    uri.setOriginalRawQuery(uriToParse.getOriginalRawQuery());
                    uri.setQueryParamModified(false);
                    return true;
                  }

                  uriToParse = uriToParse.toString().trim();
                  var components = (
                    c_URIRFC3986 || (c_URIRFC3986 = require("URIRFC3986"))
                  ).parse(uriToParse) || {
                    fragment: null,
                    scheme: null,
                    query: null
                  };

                  if (
                    !shouldThrow &&
                    !(
                      c_URISchemes || (c_URISchemes = require("URISchemes"))
                    ).isAllowed(components.scheme)
                  ) {
                    return false;
                  }
                  uri.setProtocol(components.scheme || "");
                  if (
                    !shouldThrow &&
                    UNSAFE_DOMAIN_PATTERN.test(components.host || "")
                  ) {
                    return false;
                  }
                  uri.setDomain(components.host || "");
                  uri.setPort(components.port || "");
                  uri.setPath(components.path || "");
                  if (shouldThrow) {
                    uri.setQueryData(
                      serializer.deserialize(components.query || "") || {}
                    );
                  } else {
                    try {
                      uri.setQueryData(
                        serializer.deserialize(components.query || "") || {}
                      );
                    } catch (_unused) {
                      return false;
                    }
                  }
                  uri.setFragment(components.fragment || "");

                  if (components.fragment === "") {
                    uri.setForceFragmentSeparator(true);
                  }
                  uri.setIsGeneric(components.isGenericURI || false);
                  uri.setOriginalRawQuery(components.query);
                  uri.setQueryParamModified(false);
                  if (components.userinfo !== null) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (userinfo is not allowed in a URI): " +
                          uriToParse
                      );
                    }

                    return false;
                  }

                  if (!uri.getDomain() && uri.getPath().indexOf("\\") !== -1) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (no domain but multiple back-slashes): " +
                          uriToParse
                      );
                    }

                    return false;
                  }

                  if (!uri.getProtocol() && SECURITY_PATTERN.test(uriToParse)) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (unsafe protocol-relative URLs): " +
                          uriToParse +
                          "'"
                      );
                    }

                    return false;
                  }

                  if (
                    uri.getDomain() &&
                    uri.getPath() &&
                    !ES(uri.getPath(), "startsWith", true, "/")
                  ) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (domain and path where path lacks leading slash): " +
                          uriToParse
                      );
                    }

                    return false;
                  }

                  return true;
                };
                URIAbstractBase.tryParse = function tryParse(uri, serializer) {
                  var result = new URIAbstractBase(null, serializer);
                  return URIAbstractBase.parse(result, uri, false, serializer)
                    ? result
                    : null;
                };
                URIAbstractBase.isValid = function isValid(uri, serializer) {
                  return !!URIAbstractBase.tryParse(uri, serializer);
                };

                function URIAbstractBase(uri, serializer) {
                  serializer || invariant(0, "no serializer set");
                  this.$URIAbstractBase_serializer = serializer;

                  this.$URIAbstractBase_protocol = "";
                  this.$URIAbstractBase_domain = "";
                  this.$URIAbstractBase_port = "";
                  this.$URIAbstractBase_path = "";
                  this.$URIAbstractBase_fragment = "";
                  this.$URIAbstractBase_isGeneric = false;
                  this.$URIAbstractBase_queryData = {};
                  this.$URIAbstractBase_forceFragmentSeparator = false;
                  URIAbstractBase.parse(this, uri, true, serializer);
                  this.$URIAbstractBase_isQueryParamModified = false;
                }
                var _proto = URIAbstractBase.prototype;
                _proto.setProtocol = function setProtocol(protocol) {
                  if (
                    !(
                      c_URISchemes || (c_URISchemes = require("URISchemes"))
                    ).isAllowed(protocol)
                  ) {
                    false ||
                      invariant(
                        0,
                        '"%s" is not a valid protocol for a URI.',
                        protocol
                      );
                  }
                  this.$URIAbstractBase_protocol = protocol;
                  return this;
                };
                _proto.getProtocol = function getProtocol() {
                  return (this.$URIAbstractBase_protocol || "").toLowerCase();
                };
                _proto.setSecure = function setSecure(secure) {
                  return this.setProtocol(secure ? "https" : "http");
                };
                _proto.isSecure = function isSecure() {
                  return this.getProtocol() === "https";
                };
                _proto.setDomain = function setDomain(domain) {
                  if (UNSAFE_DOMAIN_PATTERN.test(domain)) {
                    throw new Error(
                      "URI.setDomain: unsafe domain specified: " +
                        domain +
                        " for url " +
                        this.toString()
                    );
                  }

                  this.$URIAbstractBase_domain = domain;
                  return this;
                };
                _proto.getDomain = function getDomain() {
                  return this.$URIAbstractBase_domain;
                };
                _proto.setPort = function setPort(port) {
                  this.$URIAbstractBase_port = port;
                  return this;
                };
                _proto.getPort = function getPort() {
                  return this.$URIAbstractBase_port;
                };
                _proto.setPath = function setPath(path) {
                  if (__DEV__) {
                    if (path && path.charAt(0) !== "/") {
                      var protocol = this.getProtocol();
                      var safe =
                        protocol === "mailto" ||
                        protocol === "tel" ||
                        protocol === "sms";
                      if (!safe) {
                        console.warn(
                          'Path does not begin with a "/" which means this URI ' +
                            "will likely be malformed. Ensure any string passed to .setPath() " +
                            'leads with "/": path "%s" for uri "%s".',
                          path,
                          this.toString()
                        );
                      }
                    }
                  }
                  this.$URIAbstractBase_path = path;
                  return this;
                };
                _proto.getPath = function getPath() {
                  return this.$URIAbstractBase_path;
                };
                _proto.addQueryData = function addQueryData(mapOrKey, value) {
                  if (
                    Object.prototype.toString.call(mapOrKey) ===
                    "[object Object]"
                  ) {
                    ES(
                      "Object",
                      "assign",
                      false,
                      this.$URIAbstractBase_queryData,
                      mapOrKey
                    );
                  } else {
                    this.$URIAbstractBase_queryData[mapOrKey] = value;
                  }
                  this.$URIAbstractBase_isQueryParamModified = true;
                  return this;
                };
                _proto.setQueryData = function setQueryData(map) {
                  this.$URIAbstractBase_queryData = map;
                  this.$URIAbstractBase_isQueryParamModified = true;
                  return this;
                };
                _proto.getQueryData = function getQueryData() {
                  return this.$URIAbstractBase_queryData;
                };
                _proto.setQueryString = function setQueryString(queryString) {
                  return this.setQueryData(
                    this.$URIAbstractBase_serializer.deserialize(queryString)
                  );
                };
                _proto.getQueryString = function getQueryString(
                  preserveQuery,
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (preserveQuery === void 0) {
                    preserveQuery = false;
                  }
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase_renderQuery(
                    false,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );
                };
                _proto.$URIAbstractBase_renderQuery = function $URIAbstractBase_renderQuery(
                  rawQuery,
                  preserveQuery,
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (rawQuery === void 0) {
                    rawQuery = false;
                  }
                  if (preserveQuery === void 0) {
                    preserveQuery = false;
                  }
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  if (
                    !this.$URIAbstractBase_isQueryParamModified &&
                    (preserveQuery || isDomainNeedRawQuery(this.getDomain()))
                  ) {
                    var _this$$URIAbstractBas;
                    return (_this$$URIAbstractBas = this
                      .$URIAbstractBase_originalRawQuery) != null
                      ? _this$$URIAbstractBas
                      : "";
                  }
                  return (rawQuery && PHPQuerySerializerNoEncoding
                    ? PHPQuerySerializerNoEncoding
                    : this.$URIAbstractBase_serializer
                  ).serialize(this.getQueryData());
                };
                _proto.removeQueryData = function removeQueryData(keys) {
                  if (!Array.isArray(keys)) {
                    keys = [keys];
                  }
                  for (var i = 0, length = keys.length; i < length; ++i) {
                    delete this.$URIAbstractBase_queryData[keys[i]];
                  }
                  this.$URIAbstractBase_isQueryParamModified = true;
                  return this;
                };
                _proto.setFragment = function setFragment(fragment) {
                  this.$URIAbstractBase_fragment = fragment;

                  this.setForceFragmentSeparator(false);
                  return this;
                };
                _proto.getFragment = function getFragment() {
                  return this.$URIAbstractBase_fragment;
                };
                _proto.setForceFragmentSeparator = function setForceFragmentSeparator(
                  shouldForce
                ) {
                  this.$URIAbstractBase_forceFragmentSeparator = shouldForce;
                  return this;
                };
                _proto.getForceFragmentSeparator = function getForceFragmentSeparator() {
                  return this.$URIAbstractBase_forceFragmentSeparator;
                };
                _proto.setIsGeneric = function setIsGeneric(isGeneric) {
                  this.$URIAbstractBase_isGeneric = isGeneric;
                  return this;
                };
                _proto.getIsGeneric = function getIsGeneric() {
                  return this.$URIAbstractBase_isGeneric;
                };
                _proto.getOriginalRawQuery = function getOriginalRawQuery() {
                  return this.$URIAbstractBase_originalRawQuery;
                };
                _proto.setOriginalRawQuery = function setOriginalRawQuery(
                  originalRawQuery
                ) {
                  this.$URIAbstractBase_originalRawQuery = originalRawQuery;
                  return this;
                };
                _proto.setQueryParamModified = function setQueryParamModified(
                  isQueryParamModified
                ) {
                  this.$URIAbstractBase_isQueryParamModified = isQueryParamModified;
                  return this;
                };
                _proto.isEmpty = function isEmpty() {
                  return !(
                    this.getPath() ||
                    this.getProtocol() ||
                    this.getDomain() ||
                    this.getPort() ||
                    Object.keys(this.getQueryData()).length > 0 ||
                    this.getFragment()
                  );
                };
                _proto.toString = function toString(
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase_toStringWithFilters(
                    false,
                    false,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );
                };
                _proto.toStringRawQuery = function toStringRawQuery(
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase_toStringWithFilters(
                    true,
                    false,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );
                };
                _proto.toStringPreserveQuery = function toStringPreserveQuery(
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase_toStringWithFilters(
                    false,
                    true,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );
                };
                _proto.$URIAbstractBase_toStringWithFilters = function $URIAbstractBase_toStringWithFilters(
                  rawQuery,
                  preserveQuery,
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (rawQuery === void 0) {
                    rawQuery = false;
                  }
                  if (preserveQuery === void 0) {
                    preserveQuery = false;
                  }
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  var uri = this;
                  for (var i = 0; i < uriFilters.length; i++) {
                    uri = uriFilters[i](uri);
                  }
                  return uri.$URIAbstractBase_toStringImpl(
                    rawQuery,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );
                };
                _proto.$URIAbstractBase_toStringImpl = function $URIAbstractBase_toStringImpl(
                  rawQuery,
                  preserveQuery,
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding
                ) {
                  if (rawQuery === void 0) {
                    rawQuery = false;
                  }
                  if (preserveQuery === void 0) {
                    preserveQuery = false;
                  }
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  var str = "";
                  var protocol = this.getProtocol();
                  if (protocol) {
                    str += protocol + ":" + (this.getIsGeneric() ? "" : "//");
                  }
                  var domain = this.getDomain();
                  if (domain) {
                    str += domain;
                  }
                  var port = this.getPort();
                  if (port) {
                    str += ":" + port;
                  }

                  var path = this.getPath();
                  if (path) {
                    str += path;
                  } else if (str) {
                    str += "/";
                  }
                  var queryStr = this.$URIAbstractBase_renderQuery(
                    rawQuery,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding
                  );

                  if (queryStr) {
                    str += "?" + queryStr;
                  }
                  var fragment = this.getFragment();
                  if (fragment) {
                    str += "#" + fragment;
                  } else if (this.getForceFragmentSeparator()) {
                    str += "#";
                  }
                  return str;
                };
                URIAbstractBase.registerFilter = function registerFilter(
                  filter
                ) {
                  uriFilters.push(filter);
                };
                _proto.getOrigin = function getOrigin() {
                  var port = this.getPort();
                  return (
                    this.getProtocol() +
                    "://" +
                    this.getDomain() +
                    (port ? ":" + port : "")
                  );
                };
                _proto.getQualifiedURIBase = function getQualifiedURIBase() {
                  return new URIAbstractBase(
                    this,
                    this.$URIAbstractBase_serializer
                  ).qualify();
                };
                _proto.qualify = function qualify() {
                  if (!this.getDomain()) {
                    var current = new URIAbstractBase(
                      window.location.href,
                      this.$URIAbstractBase_serializer
                    );
                    this.setProtocol(current.getProtocol())
                      .setDomain(current.getDomain())
                      .setPort(current.getPort());
                  }
                  return this;
                };
                _proto.setSubdomain = function setSubdomain(subdomain) {
                  var qualified = this.qualify();
                  var domain = qualified.getDomain();
                  return this.setDomain(
                    require("setHostSubdomain")(domain, subdomain)
                  );
                };
                _proto.getSubdomain = function getSubdomain() {
                  if (!this.getDomain()) {
                    return "";
                  }

                  var domains = this.getDomain().split(".");
                  if (domains.length <= 2) {
                    return "";
                  } else {
                    return domains[0];
                  }
                };
                _proto.isSubdomainOfDomain = function isSubdomainOfDomain(
                  superdomain
                ) {
                  var domain = this.getDomain();
                  return URIAbstractBase.isDomainSubdomainOfDomain(
                    domain,
                    superdomain,
                    this.$URIAbstractBase_serializer
                  );
                };
                URIAbstractBase.isDomainSubdomainOfDomain = function isDomainSubdomainOfDomain(
                  domain,
                  superdomain,
                  serializer
                ) {
                  if (superdomain === "" || domain === "") {
                    return false;
                  }

                  if (ES(domain, "endsWith", true, superdomain)) {
                    var domainLen = domain.length;
                    var superdomainLen = superdomain.length;
                    var pos = domainLen - superdomainLen - 1;

                    if (domainLen === superdomainLen || domain[pos] === ".") {
                      var uri = new URIAbstractBase(null, serializer);
                      uri.setDomain(superdomain);
                      return URIAbstractBase.isValid(uri, serializer);
                    }
                  }

                  return false;
                };
                return URIAbstractBase;
              })();

              module.exports = URIAbstractBase;
            },
            null
          );
          __d(
            "sdk.URI",
            ["QueryString", "URIAbstractBase"],
            function $module_sdk_URI(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var facebookRe = /\.facebook\.com$/;

              var serializer = {
                serialize: function serialize(map) {
                  return map ? require("QueryString").encode(map) : "";
                },
                deserialize: function deserialize(text) {
                  return text ? require("QueryString").decode(text) : {};
                }
              };
              var URI = (function(_URIBase) {
                babelHelpers.inheritsLoose(URI, _URIBase);
                function URI(uri) {
                  return _URIBase.call(this, uri, serializer) || this;
                }
                var _proto = URI.prototype;
                _proto.isFacebookURI = function isFacebookURI() {
                  return facebookRe.test(this.getDomain());
                };
                _proto.valueOf = function valueOf() {
                  return this.toString();
                };
                URI.isValidURI = function isValidURI(uri) {
                  return require("URIAbstractBase").isValid(uri, serializer);
                };
                return URI;
              })(require("URIAbstractBase"));
              module.exports = URI;
            },
            null
          );
          __d(
            "ApiClientUtils",
            [
              "ArgumentError",
              "Assert",
              "Log",
              "flattenObject",
              "sdk.URI",
              "sprintf"
            ],
            function $module_ApiClientUtils(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.parseCallDataFromArgs = parseCallDataFromArgs;

              var METHODS = {
                get: true,
                post: true,
                delete: true,
                put: true
              };

              function parseCallDataFromArgs(args) {
                var path = args.shift();
                require("Assert").isString(path, "Invalid path");
                if (!/^https?/.test(path) && path.charAt(0) !== "/") {
                  path = "/" + path;
                }

                var uri;
                var argsMap = {};

                try {
                  uri = new (require("sdk.URI"))(path);
                } catch (e) {
                  throw new (require("ArgumentError"))(e.message, e);
                }

                args.forEach(function args_forEach_$0(arg) {
                  return (argsMap[typeof arg] = arg);
                });

                var method = (argsMap.string || "get").toLowerCase();

                require("Assert").isTrue(
                  Object.prototype.hasOwnProperty.call(METHODS, method),
                  require("sprintf")(
                    "Invalid method passed to ApiClient: %s",
                    method
                  )
                );

                var callback = argsMap["function"];
                if (!callback) {
                  require("Log").warn("No callback passed to the ApiClient");
                }

                if (argsMap.object) {
                  uri.addQueryData(require("flattenObject")(argsMap.object));
                }

                var params = uri.getQueryData();
                params.method = method;

                return { uri: uri, callback: callback, params: params };
              }
            },
            null
          );
          __d(
            "errorCode",
            [],
            function $module_errorCode(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = errorCode;

              function errorCode(name) {
                throw new Error(
                  "errorCode" +
                    '("' +
                    name +
                    '"): This should not happen. Oh noes!'
                );
              }
            },
            null
          );
          __d(
            "nullthrows",
            [],
            function $module_nullthrows(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = nullthrows;

              function nullthrows(x, message) {
                if (message === void 0) {
                  message = "Got unexpected null or undefined";
                }
                if (x != null) {
                  return x;
                }
                var error = new Error(message);
                error.framesToPop = 1;
                throw error;
              }
            },
            null
          );
          __d(
            "sdk.safelyParseResponse",
            ["errorCode", "nullthrows"],
            function $module_sdk_safelyParseResponse(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              errorCode
            ) {
              "use strict";

              var errorHandler = function errorHandler(
                _ex,
                _rawResponse,
                _url,
                _responseCode
              ) {
                return ERROR;
              };

              function safelyParseResponse(rawResponse, url, responseCode) {
                if (url === void 0) {
                  url = null;
                }
                if (responseCode === void 0) {
                  responseCode = null;
                }
                try {
                  return rawResponse === null
                    ? ERROR
                    : ES(
                        "JSON",
                        "parse",
                        false,
                        require("nullthrows")(rawResponse)
                      );
                } catch (ex) {
                  return errorHandler(ex, rawResponse, url, responseCode);
                }
              }

              var ERROR = {
                error: {
                  code: 1,
                  error_subcode: 1357046,
                  message: "Received Invalid JSON reply.",
                  type: "http"
                }
              };

              safelyParseResponse.ERROR = ERROR;
              safelyParseResponse.setErrorHandler = function(newHandler) {
                errorHandler = newHandler;
              };
              var _default = safelyParseResponse;
              module.exports = _default;
            },
            null
          );
          __d(
            "whitelistObjectKeys",
            [],
            function $module_whitelistObjectKeys(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = whitelistObjectKeys;

              function whitelistObjectKeys(source, whitelist) {
                var result = {};
                var keys = Array.isArray(whitelist)
                  ? whitelist
                  : Object.keys(whitelist);
                for (var ii = 0; ii < keys.length; ii++) {
                  if (typeof source[keys[ii]] !== "undefined") {
                    result[keys[ii]] = source[keys[ii]];
                  }
                }
                return result;
              }
            },
            null
          );
          __d(
            "ApiBatcher",
            [
              "invariant",
              "ApiClientUtils",
              "QueryString",
              "sdk.safelyParseResponse",
              "whitelistObjectKeys"
            ],
            function $module_ApiBatcher(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant
            ) {
              "use strict";

              var REQUESTS_PER_BATCH = 50;

              var DEFAULT_BATCH_APP_ID = 105440539523;
              var ApiBatcher = (function() {
                function ApiBatcher(executeRequest, clientID) {
                  this.$ApiBatcher_batchCalls = [];
                  this.$ApiBatcher_batchCallbacks = [];
                  this.$ApiBatcher_scheduleID = null;
                  this.executeRequest = executeRequest;
                  this.$ApiBatcher_clientID = clientID;
                }
                var _proto = ApiBatcher.prototype;
                _proto.scheduleBatchCall = function scheduleBatchCall() {
                  var _this = this;
                  for (
                    var _len = arguments.length,
                      args = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    args[_key] = arguments[_key];
                  }
                  var _ApiBatcher$prepareBa = ApiBatcher.prepareBatchParams(
                      args
                    ),
                    body = _ApiBatcher$prepareBa.body,
                    callback = _ApiBatcher$prepareBa.callback,
                    method = _ApiBatcher$prepareBa.method,
                    relative_url = _ApiBatcher$prepareBa.relative_url;

                  var batchCall = {
                    method: method,
                    relative_url: relative_url
                  };

                  if (body) {
                    batchCall.body = body;
                  }

                  this.$ApiBatcher_batchCalls.push(batchCall);
                  this.$ApiBatcher_batchCallbacks.push(callback);

                  if (
                    this.$ApiBatcher_batchCalls.length == REQUESTS_PER_BATCH
                  ) {
                    if (this.$ApiBatcher_scheduleID) {
                      clearTimeout(this.$ApiBatcher_scheduleID);
                    }
                    this.$ApiBatcher_dispatchBatchCalls();
                  } else if (!this.$ApiBatcher_scheduleID) {
                    this.$ApiBatcher_scheduleID = setTimeout(
                      function setTimeout_$0() {
                        _this.$ApiBatcher_dispatchBatchCalls();
                      },
                      0
                    );
                  }
                };
                ApiBatcher.prepareBatchParams = function prepareBatchParams(
                  args,
                  keptQueryParams
                ) {
                  if (keptQueryParams === void 0) {
                    keptQueryParams = [];
                  }
                  var _ApiClientUtils$parse = require("ApiClientUtils").parseCallDataFromArgs(
                      args
                    ),
                    uri = _ApiClientUtils$parse.uri,
                    callback = _ApiClientUtils$parse.callback,
                    method = _ApiClientUtils$parse.params.method;

                  var body;
                  var relative_url = uri.removeQueryData("method").toString();
                  if (method.toLowerCase() == "post") {
                    var queryData = uri.getQueryData();
                    body = require("QueryString").encode(queryData);
                    var filteredQueryData = require("whitelistObjectKeys")(
                      queryData,
                      keptQueryParams
                    );
                    relative_url = uri
                      .setQueryData(filteredQueryData)
                      .toString();
                  }

                  return {
                    body: body,
                    callback: callback,
                    method: method,
                    relative_url: relative_url
                  };
                };
                _proto.$ApiBatcher_dispatchBatchCalls = function $ApiBatcher_dispatchBatchCalls() {
                  this.$ApiBatcher_batchCalls.length > 0 ||
                    invariant(
                      0,
                      "ApiClient: _batchCalls is empty at dispatch."
                    );

                  this.$ApiBatcher_batchCalls.length ===
                    this.$ApiBatcher_batchCallbacks.length ||
                    invariant(
                      0,
                      "ApiClient: Every batch call should have a callback"
                    );

                  var copiedBatchCalls = this.$ApiBatcher_batchCalls;
                  var copiedBatchCallbacks = this.$ApiBatcher_batchCallbacks;
                  this.$ApiBatcher_batchCalls = [];
                  this.$ApiBatcher_batchCallbacks = [];
                  this.$ApiBatcher_scheduleID = null;

                  if (copiedBatchCalls.length === 1) {
                    var call = copiedBatchCalls[0];
                    var callback = copiedBatchCallbacks[0];

                    var body = call.body
                      ? require("QueryString").decode(call.body)
                      : null;

                    this.executeRequest(
                      call.relative_url,
                      call.method,
                      body,
                      callback
                    );
                    return;
                  }

                  this.executeRequest(
                    "/",
                    "POST",
                    {
                      batch: copiedBatchCalls,
                      include_headers: false,
                      batch_app_id:
                        this.$ApiBatcher_clientID || DEFAULT_BATCH_APP_ID
                    },

                    function executeRequest_$3(response) {
                      if (Array.isArray(response)) {
                        response.forEach(function response_forEach_$0(
                          data,
                          idx
                        ) {
                          copiedBatchCallbacks[idx](
                            require("sdk.safelyParseResponse")(
                              data && data.body
                            )
                          );
                        });
                      } else {
                        copiedBatchCallbacks.forEach(
                          function copiedBatchCallbacks_forEach_$0(callback) {
                            return callback({
                              error: { message: "Fatal: batch call failed." }
                            });
                          }
                        );
                      }
                    }
                  );
                };
                return ApiBatcher;
              })();
              module.exports = ApiBatcher;
            },
            null
          );
          __d(
            "RequestConstants",
            ["errorCode"],
            function $module_RequestConstants(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              errorCode
            ) {
              var PARSE_ERROR_TEMPLATE = {
                code: 1,
                error_subcode: 1357045,
                message: "unknown error (empty response)",
                type: "http",
                status: 0
              };
              exports.PARSE_ERROR_TEMPLATE = PARSE_ERROR_TEMPLATE;
            },
            null
          );
          __d(
            "sdk.Cookie",
            ["QueryString", "sdk.Runtime"],
            function $module_sdk_Cookie(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.setRaw = setRaw;
              exports.getRaw = getRaw;
              exports.setDomain = setDomain;
              exports.getDomain = getDomain;
              exports.loadMeta = loadMeta;
              exports.loadSignedRequest = loadSignedRequest;
              exports.setSignedRequestCookie = setSignedRequestCookie;
              exports.clearSignedRequestCookie = clearSignedRequestCookie;

              var domain = null;

              function setRaw(startingPrefix, val, ts, secure) {
                var _domain;
                var prefix =
                  startingPrefix + require("sdk.Runtime").getClientID();
                var secureFlag = secure ? ";Secure" : "";
                var useDomain = domain !== null && domain !== ".";

                if (useDomain) {
                  document.cookie =
                    prefix +
                    "=; expires=Wed, 04 Feb 2004 08:00:00 GMT" +
                    secureFlag;

                  document.cookie =
                    prefix +
                    "=; expires=Wed, 04 Feb 2004 08:00:00 GMT;" +
                    "domain=" +
                    location.hostname +
                    secureFlag;
                }

                var expires = new Date(ts).toUTCString();
                document.cookie =
                  prefix +
                  "=" +
                  val +
                  (val && ts === 0 ? "" : "; expires=" + expires) +
                  "; path=/" +
                  (useDomain
                    ? "; domain=" + ((_domain = domain) != null ? _domain : "")
                    : "") +
                  secureFlag;
              }

              function getRaw(startingPrefix) {
                var prefix =
                  startingPrefix + require("sdk.Runtime").getClientID();
                var regExp = new RegExp("\\b" + prefix + "=([^;]*)\\b");
                var matches = document.cookie.match(regExp);
                if (matches === null || matches === undefined) {
                  return null;
                } else {
                  return matches[1];
                }
              }

              function setDomain(val) {
                domain = val;

                var meta = require("QueryString").encode({
                  base_domain: domain !== null && domain !== "." ? domain : ""
                });

                var expiration = new Date();
                expiration.setFullYear(expiration.getFullYear() + 1);
                setRaw("fbm_", meta, expiration.getTime(), true);
              }

              function getDomain() {
                return domain;
              }

              function loadMeta() {
                var cookie = getRaw("fbm_");
                if (
                  cookie !== null &&
                  cookie !== undefined &&
                  domain === null
                ) {
                  var meta = require("QueryString").decode(cookie);

                  domain = meta.base_domain;
                  return meta;
                }
                return null;
              }

              function loadSignedRequest() {
                return getRaw("fbsr_");
              }

              function setSignedRequestCookie(signedRequest, expiration) {
                if (signedRequest === "") {
                  throw new Error(
                    "Value passed to Cookie.setSignedRequestCookie was empty."
                  );
                }
                setRaw("fbsr_", signedRequest, expiration, true);
              }

              function clearSignedRequestCookie() {
                this.loadMeta();
                setRaw("fbsr_", "", 0, true);
              }
            },
            null
          );
          __d(
            "CORSRequest",
            [
              "Log",
              "QueryString",
              "RequestConstants",
              "sdk.Cookie",
              "sdk.safelyParseResponse",
              "wrapFunction"
            ],
            function $module_CORSRequest(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function createCORSRequest(method, url) {
                if (!self.XMLHttpRequest) {
                  return null;
                }
                var xhr = new XMLHttpRequest();
                var noop = function noop() {};
                if ("withCredentials" in xhr) {
                  xhr.open(method, url, true);
                  xhr.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                  );
                } else if (self.XDomainRequest) {
                  xhr = new XDomainRequest();
                  try {
                    xhr.open(method, url);

                    xhr.onprogress = xhr.ontimeout = noop;
                  } catch (_unused) {
                    return null;
                  }
                } else {
                  return null;
                }

                var wrapper = {
                  send: function send(data) {
                    xhr.send(data);
                  }
                };

                var onload = require("wrapFunction")(
                  function wrapFunction_$0() {
                    onload = noop;
                    if ("onload" in wrapper) {
                      wrapper.onload(xhr);
                    }
                  },
                  "entry",
                  "XMLHttpRequest:load"
                );

                var onerror = require("wrapFunction")(
                  function wrapFunction_$0() {
                    onerror = noop;
                    if ("onerror" in wrapper) {
                      wrapper.onerror(xhr);
                    }
                  },
                  "entry",
                  "XMLHttpRequest:error"
                );

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
              }

              function execute(url, method, params, cb) {
                if (
                  ES(url, "includes", true, "/../") ||
                  ES(url, "includes", true, "/..\\") ||
                  ES(url, "includes", true, "\\../") ||
                  ES(url, "includes", true, "\\..\\")
                ) {
                  require("Log").error(
                    "CORSRequest.execute(): path traversal is not allowed."
                  );
                  return false;
                }

                try {
                  if (self.document) {
                    var cppo = require("sdk.Cookie").getRaw("cppo");
                    if (cppo) {
                      url = require("QueryString").appendToUrl(
                        url,
                        require("QueryString").encode({ __cppo: cppo })
                      );
                    }
                  }
                } catch (_unused2) {}

                params.suppress_http_code = 1;
                var data = require("QueryString").encode(params);

                if (method != "post") {
                  url = require("QueryString").appendToUrl(url, data);
                  data = "";
                }

                var request = createCORSRequest(method, url);
                if (!request) {
                  return false;
                }

                request.onload = function(xhr) {
                  cb(
                    require("sdk.safelyParseResponse")(
                      xhr.responseText,
                      url,
                      xhr.status
                    )
                  );
                };

                request.onerror = function(xhr) {
                  if (xhr.responseText) {
                    cb(
                      require("sdk.safelyParseResponse")(
                        xhr.responseText,
                        url,
                        xhr.status
                      )
                    );
                  } else {
                    cb({
                      error: babelHelpers["extends"](
                        {},
                        require("RequestConstants").PARSE_ERROR_TEMPLATE,
                        {
                          status: xhr.status
                        }
                      )
                    });
                  }
                };
                request.send(data);
                return true;
              }

              var CORSRequest = {
                execute: execute
              };
              var _default = CORSRequest;
              module.exports = _default;
            },
            null
          );
          __d(
            "ApiClient",
            [
              "ApiBatcher",
              "ApiClientUtils",
              "Assert",
              "CORSRequest",
              "Log",
              "ObservableMixin",
              "QueryString",
              "UrlMap",
              "flattenObject"
            ],
            function $module_ApiClient(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var accessToken;
              var clientID;
              var defaultParams;
              var keptQueryParams = [];

              var MAX_QUERYSTRING_LENGTH = 2000;

              var READONLYCALLS = {
                fql_query: true,
                fql_multiquery: true,
                friends_get: true,
                notifications_get: true,
                stream_get: true,
                users_getinfo: true
              };

              var defaultTransports = ["cors"];

              var currentlyExecutingRequests = 0;
              var requestQueue = [];
              var maxConcurrentRequests = 0;
              var requestCounter = 0;

              var apiBatcher;

              var logger = require("Log");

              function request(url, method, paramsRaw, cb) {
                var shouldQueueRequest =
                  maxConcurrentRequests !== 0 &&
                  currentlyExecutingRequests >= maxConcurrentRequests;

                if (shouldQueueRequest) {
                  requestQueue.push(function requestQueue_push_$0() {
                    return request(url, method, paramsRaw, cb);
                  });
                  ApiClient.inform("request.queued", url, method, paramsRaw);
                  return;
                }

                currentlyExecutingRequests++;

                var params = babelHelpers["extends"](
                  {},
                  defaultParams,
                  paramsRaw
                );

                params.pretty = params.pretty || 0;

                params = require("flattenObject")(params);
                var availableTransports = {
                  cors: require("CORSRequest")
                };

                var getParams = {};

                var accessTokenForRequest = params.access_token || accessToken;
                if (accessTokenForRequest) {
                  getParams.access_token = accessTokenForRequest;
                }
                if (method !== "get") {
                  keptQueryParams.forEach(function keptQueryParams_forEach_$0(
                    keptQueryParam
                  ) {
                    getParams[keptQueryParam] = params[keptQueryParam];
                  });
                }

                var getParamNames = Object.keys(getParams);
                if (getParamNames.length > 0) {
                  url = require("QueryString").appendToUrl(url, getParams);

                  delete params.access_token;
                }

                var transports = defaultTransports;

                for (var i = 0; i < transports.length; i++) {
                  var transport = availableTransports[transports[i]];
                  var paramsCopy = ES("Object", "assign", false, {}, params);
                  if (transport.execute(url, method, paramsCopy, cb)) {
                    return;
                  }
                }

                cb({
                  error: {
                    type: "no-transport",
                    message: "Could not find a usable transport for request"
                  }
                });
              }

              function inspect(
                callback,
                endpoint,
                method,
                params,
                startTime,
                requestIndex,
                response,
                done
              ) {
                if (
                  params.transport &&
                  params.transport === "chunked" &&
                  done === false
                ) {
                  callback(response, false);
                  return;
                }

                if (response && response.error) {
                  ApiClient.inform(
                    "request.error",
                    endpoint,
                    method,
                    params,
                    response,
                    Date.now() - startTime,
                    requestIndex
                  );
                }

                ApiClient.inform(
                  "request.complete",
                  endpoint,
                  method,
                  params,
                  response,
                  Date.now() - startTime,
                  requestIndex
                );

                currentlyExecutingRequests--;
                if (callback) {
                  callback(response);
                }

                var shouldExecuteQueuedRequest =
                  requestQueue.length > 0 &&
                  currentlyExecutingRequests < maxConcurrentRequests;
                if (shouldExecuteQueuedRequest) {
                  var nextRequest = requestQueue.shift();
                  nextRequest();
                }
              }

              function requestUsingGraph() {
                for (
                  var _len = arguments.length, args = new Array(_len), _key = 0;
                  _key < _len;
                  _key++
                ) {
                  args[_key] = arguments[_key];
                }
                var _ApiClientUtils$parse = require("ApiClientUtils").parseCallDataFromArgs(
                    args
                  ),
                  uri = _ApiClientUtils$parse.uri,
                  callback = _ApiClientUtils$parse.callback,
                  params = _ApiClientUtils$parse.params;
                var method = params.method;

                if (requestIsTooLargeForGet(uri, method)) {
                  method = "post";
                }

                var url =
                  uri.getProtocol() && uri.getDomain()
                    ? uri.setQueryData({}).toString()
                    : require("UrlMap").resolve("graph_domain") + uri.getPath();

                var requestIndex = requestCounter++;
                if ("_fb_domain" in params) {
                  ApiClient.setKeptQueryParams(["_fb_domain"]);
                }
                ApiClient.inform("request.prepare", url, params, requestIndex);

                request(
                  url,
                  method == "get" ? "get" : "post",
                  params,
                  ES(
                    inspect,
                    "bind",
                    true,
                    null,
                    callback,
                    uri.getPath(),
                    method,
                    params,
                    Date.now(),
                    requestIndex
                  )
                );
              }

              function scheduleBatchCall() {
                var _apiBatcher;
                if (!apiBatcher) {
                  apiBatcher = new (require("ApiBatcher"))(
                    requestUsingGraph,
                    clientID
                  );
                }
                (_apiBatcher = apiBatcher).scheduleBatchCall.apply(
                  _apiBatcher,
                  arguments
                );
              }

              function requestUsingRest(params, cb) {
                require("Assert").isObject(params);
                require("Assert").isString(params.method, "method missing");

                if (!cb) {
                  logger.warn("No callback passed to the ApiClient");
                }
                var method = params.method.toLowerCase().replace(".", "_");
                params.format = "json-strings";
                params.api_key = clientID;

                var domain = method in READONLYCALLS ? "api_read" : "api";
                var url = require("UrlMap").resolve(domain) + "/restserver.php";
                var requestIndex = requestCounter++;
                var inspector = ES(
                  inspect,
                  "bind",
                  true,
                  null,
                  cb,
                  "/restserver.php",
                  "get",
                  params,
                  Date.now(),
                  requestIndex
                );

                request(url, "get", params, inspector);
              }

              function prepareBatchParams(args) {
                return require("ApiBatcher").prepareBatchParams(
                  args,
                  keptQueryParams
                );
              }

              var ApiClient = ES(
                "Object",
                "assign",
                false,
                new (require("ObservableMixin"))(),
                {
                  setAccessToken: function setAccessToken(access_token) {
                    if (
                      accessToken &&
                      access_token &&
                      accessToken !== access_token
                    ) {
                      logger.error(
                        "You are overriding current access token, that means some other " +
                          "app is expecting different access token and you will probably " +
                          "break things. Please consider passing access_token directly to " +
                          "API parameters instead of overriding the global settings."
                      );
                    }
                    accessToken = access_token;
                  },
                  setAccessTokenForClientID: function setAccessTokenForClientID(
                    access_token,
                    client_id
                  ) {
                    if (accessToken && clientID && clientID !== client_id) {
                      logger.error(
                        "Not overriding access token since it was not " +
                          "initialized by your application."
                      );
                    } else {
                      accessToken = access_token;
                    }
                  },
                  getClientID: function getClientID() {
                    return clientID;
                  },
                  getAccessToken: function getAccessToken() {
                    return accessToken;
                  },
                  setClientID: function setClientID(client_id) {
                    if (clientID && clientID !== client_id) {
                      logger.warn(
                        "Warning: Two different applications have attempted to set the " +
                          "client ID. Overriding the previously set client ID."
                      );
                    }
                    clientID = client_id;
                  },
                  setDefaultParams: function setDefaultParams(default_params) {
                    defaultParams = default_params;
                  },
                  getDefaultParams: function getDefaultParams() {
                    return defaultParams;
                  },
                  setDefaultTransports: function setDefaultTransports(
                    newDefaultTransports
                  ) {
                    defaultTransports = newDefaultTransports;
                  },
                  setLogger: function setLogger(customLogger) {
                    logger = customLogger;
                  },
                  setMaxConcurrentRequests: function setMaxConcurrentRequests(
                    value
                  ) {
                    maxConcurrentRequests = value;
                  },
                  setKeptQueryParams: function setKeptQueryParams(params) {
                    keptQueryParams = params;
                  },
                  getCurrentlyExecutingRequestCount: function getCurrentlyExecutingRequestCount() {
                    return currentlyExecutingRequests;
                  },
                  getQueuedRequestCount: function getQueuedRequestCount() {
                    return requestQueue.length;
                  },
                  rest: requestUsingRest,
                  graph: requestUsingGraph,
                  scheduleBatchCall: scheduleBatchCall,
                  prepareBatchParams: prepareBatchParams
                }
              );

              function requestIsTooLargeForGet(uri, method) {
                return (
                  uri.toString().length > MAX_QUERYSTRING_LENGTH &&
                  method === "get"
                );
              }
              var _default = ApiClient;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.PlatformVersioning",
            ["ManagedError", "sdk.Runtime"],
            function $module_sdk_PlatformVersioning(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.assertVersionIsSet = assertVersionIsSet;
              exports.assertValidVersion = assertValidVersion;

              var REGEX = /^v\d+\.\d\d?$/;
              exports.REGEX = REGEX;

              function assertVersionIsSet() {
                if (!require("sdk.Runtime").getVersion()) {
                  throw new (require("ManagedError"))(
                    "init not called with valid version"
                  );
                }
              }

              function assertValidVersion(version) {
                if (!REGEX.test(version)) {
                  throw new (require("ManagedError"))(
                    "invalid version specified"
                  );
                }
              }
            },
            null
          );
          __d(
            "sdk.warnInsecure",
            ["Log", "sdk.Runtime", "sdk.Scribe", "sdk.feature"],
            function $module_sdk_warnInsecure(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = warnInsecure;

              var httpsOnlyLearnMore = require("sdk.feature")(
                "https_only_learn_more",
                ""
              );
              var logged = {};

              function warnInsecure(methodName) {
                if (window.location.protocol !== "https:") {
                  require("Log").log(
                    "error",
                    -1,
                    "The method FB.%s can no longer be called from http pages. %s",
                    methodName,
                    httpsOnlyLearnMore
                  );

                  if (
                    require("sdk.feature")("https_only_scribe_logging", true) &&
                    !Object.prototype.hasOwnProperty.call(logged, methodName)
                  ) {
                    require("sdk.Scribe").log("jssdk_error", {
                      appId: require("sdk.Runtime").getClientID(),
                      error: "HttpsOnly",
                      extra: {
                        message: methodName
                      }
                    });

                    logged[methodName] = true;
                  }
                }
                return true;
              }
            },
            null
          );
          __d(
            "sdk.api",
            [
              "ApiClient",
              "sdk.PlatformVersioning",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.URI",
              "sdk.feature",
              "sdk.warnInsecure"
            ],
            function $module_sdk_api(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var ApiClient;

              var shouldLogResponseError = require("sdk.feature")(
                "should_log_response_error",
                false
              );

              var currentAccessToken;

              require("sdk.Runtime").subscribe(
                "ClientID.change",
                function Runtime_subscribe_$1(value) {
                  return require("ApiClient").setClientID(value);
                }
              );

              require("sdk.Runtime").subscribe(
                "AccessToken.change",
                function Runtime_subscribe_$1(value) {
                  currentAccessToken = value;
                  require("ApiClient").setAccessToken(value);
                }
              );

              (ApiClient = require("ApiClient")).setDefaultParams({
                sdk: "joey"
              });

              ApiClient.subscribe(
                "request.complete",
                function ApiClient_subscribe_$1(
                  endpoint,
                  method,
                  params,
                  response
                ) {
                  var invalidateToken = false;
                  if (response && typeof response === "object") {
                    if (response.error) {
                      if (
                        response.error == "invalid_token" ||
                        (response.error.type == "OAuthException" &&
                          response.error.code == 190)
                      ) {
                        invalidateToken = true;
                      }
                    } else if (response.error_code) {
                      if (response.error_code == "190") {
                        invalidateToken = true;
                      }
                    }
                  }
                  if (
                    invalidateToken &&
                    currentAccessToken ===
                      require("sdk.Runtime").getAccessToken()
                  ) {
                    require("sdk.Runtime").setAccessToken(null);
                  }
                }
              );

              ApiClient.subscribe(
                "request.complete",
                function ApiClient_subscribe_$1(
                  endpoint,
                  method,
                  params,
                  response
                ) {
                  if (
                    ((endpoint == "/me/permissions" && method === "delete") ||
                      (endpoint == "/restserver.php" &&
                        params.method == "Auth.revokeAuthorization")) &&
                    response === true
                  ) {
                    require("sdk.Runtime").setAccessToken(null);
                  }
                }
              );

              ApiClient.subscribe(
                "request.error",
                function ApiClient_subscribe_$1(
                  endpoint,
                  method,
                  params,
                  response
                ) {
                  if (
                    shouldLogResponseError &&
                    response.error.type === "http"
                  ) {
                    require("sdk.Scribe").log("jssdk_error", {
                      appId: require("sdk.Runtime").getClientID(),
                      error: "transport",
                      extra: {
                        name: "transport",

                        message:
                          ES("JSON", "stringify", false, response.error) +
                          " from " +
                          endpoint +
                          " , " +
                          method
                      }
                    });
                  }
                }
              );

              function api(path) {
                require("sdk.warnInsecure")("api");

                if (typeof path === "string") {
                  if (require("sdk.Runtime").getIsVersioned()) {
                    require("sdk.PlatformVersioning").assertVersionIsSet();

                    if (!/https?/.test(path) && path.charAt(0) !== "/") {
                      path = "/" + path;
                    }
                    path = new (require("sdk.URI"))(path)
                      .setDomain(null)
                      .setProtocol(null)
                      .toString();

                    if (
                      !require("sdk.PlatformVersioning").REGEX.test(
                        path.substring(1, path.indexOf("/", 1))
                      )
                    ) {
                      path = "/" + require("sdk.Runtime").getVersion() + path;
                    }

                    var args = [path].concat(
                      Array.prototype.slice.call(arguments, 1)
                    );
                    require("ApiClient").graph.apply(
                      require("ApiClient"),
                      args
                    );
                  } else {
                    require("ApiClient").graph.apply(
                      require("ApiClient"),
                      arguments
                    );
                  }
                } else {
                  require("ApiClient").rest.apply(
                    require("ApiClient"),
                    arguments
                  );
                }
              }

              module.exports = api;
            },
            null
          );
          __d(
            "legacy:fb.api",
            ["FB", "sdk.api"],
            function $module_legacy_fb_api(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("", { api: require("sdk.api") });
            },
            3
          );
          __d(
            "Miny",
            [],
            function $module_Miny(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var MAGIC = "Miny1";
              var LO = "wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("");

              var Miny = {
                encode: function encode(s) {
                  var _s$match;
                  if (/^$|[~\\]|__proto__/.test(s)) {
                    return s;
                  }

                  var parts =
                    (_s$match = s.match(/\w+|\W+/g)) != null ? _s$match : [];

                  var i;

                  var dict = Object.create(null);
                  for (i = 0; i < parts.length; i++) {
                    dict[parts[i]] = (dict[parts[i]] || 0) + 1;
                  }

                  var keys = Object.keys(dict);
                  keys.sort(function keys_sort_$0(a, b) {
                    return parseInt(dict[b], 10) - parseInt(dict[a], 10);
                  });

                  for (i = 0; i < keys.length; i++) {
                    var n = (i - (i % 32)) / 32;
                    dict[keys[i]] = n
                      ? n.toString(32) + LO[i % 32]
                      : LO[i % 32];
                  }

                  var codes = "";
                  for (i = 0; i < parts.length; i++) {
                    codes += dict[parts[i]];
                  }

                  keys.unshift(MAGIC, keys.length);
                  keys.push(codes);
                  return keys.join("~");
                }
              };
              var _default = Miny;
              module.exports = _default;
            },
            null
          );
          __d(
            "getBlankIframeSrc",
            ["sdk.UA"],
            function $module_getBlankIframeSrc(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = getBlankIframeSrc;

              function getBlankIframeSrc() {
                return require("sdk.UA").ie() < 10
                  ? "javascript:false"
                  : "about:blank";
              }
            },
            null
          );
          __d(
            "insertIframe",
            ["GlobalCallback", "getBlankIframeSrc", "guid"],
            function $module_insertIframe(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = insertIframe;

              function insertIframe(opts) {
                var id = opts.id != null ? opts.id : require("guid")();
                var name = opts.name != null ? opts.name : require("guid")();

                var srcSet = false;
                var onloadDone = false;
                var callback = function callback() {
                  if (srcSet && !onloadDone) {
                    onloadDone = true;
                    if (typeof opts.onload === "function") {
                      opts.onload(opts.root.firstChild);
                    }
                  }
                };
                var globalCallback = require("GlobalCallback").create(callback);

                if (document.attachEvent) {
                  var html =
                    "<iframe" +
                    ' id="' +
                    id +
                    '"' +
                    ' name="' +
                    name +
                    '"' +
                    (opts.title != null ? ' title="' + opts.title + '"' : "") +
                    (opts.className != null
                      ? ' class="' + opts.className + '"'
                      : "") +
                    ' style="border:none;' +
                    (opts.width != null ? "width:" + opts.width + "px;" : "") +
                    (opts.height != null
                      ? "height:" + opts.height + "px;"
                      : "") +
                    '"' +
                    ' src="' +
                    require("getBlankIframeSrc")() +
                    '"' +
                    ' frameborder="0"' +
                    ' scrolling="no"' +
                    ' allowtransparency="true"' +
                    ' onload="' +
                    globalCallback +
                    '()"' +
                    "></iframe>";

                  opts.root.innerHTML =
                    '<iframe src="' +
                    require("getBlankIframeSrc")() +
                    '"' +
                    ' frameborder="0"' +
                    ' scrolling="no"' +
                    ' style="height:1px"></iframe>';

                  srcSet = true;

                  window.setTimeout(function window_setTimeout_$0() {
                    opts.root.innerHTML = html;

                    opts.root.firstChild.src = opts.url;
                    typeof opts.onInsert === "function" &&
                      opts.onInsert(opts.root.firstChild);
                  }, 0);
                } else {
                  var node = document.createElement("iframe");
                  node.id = id;
                  node.name = name;
                  node.onload = callback;
                  node.scrolling = "no";
                  node.style.border = "none";
                  node.style.overflow = "hidden";
                  if (opts.title != null) {
                    node.title = opts.title;
                  }
                  if (opts.className != null) {
                    node.className = opts.className;
                  }
                  if (opts.height !== undefined) {
                    node.style.height = opts.height + "px";
                  }
                  if (opts.width !== undefined) {
                    if (opts.width === "100%") {
                      node.style.width = opts.width;
                    } else {
                      node.style.width = opts.width + "px";
                    }
                  }
                  opts.root.appendChild(node);

                  srcSet = true;

                  node.src = opts.url;
                  opts.onInsert && opts.onInsert(node);
                }
              }
            },
            null
          );
          __d(
            "sdk.Impressions",
            [
              "Miny",
              "QueryString",
              "UrlMap",
              "getBlankIframeSrc",
              "guid",
              "insertIframe",
              "sdk.Content",
              "sdk.Runtime",
              "sdk.feature"
            ],
            function $module_sdk_Impressions(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.impression = impression;
              exports.log = log;

              function impression(params, should_include_creds) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                var clientID = require("sdk.Runtime").getClientID();
                var isCanvas = require("sdk.Runtime").isEnvironment(
                  require("sdk.Runtime").ENVIRONMENTS.CANVAS
                );

                if (
                  clientID &&
                  (typeof params.api_key !== "string" || params.api_key === "")
                ) {
                  params.api_key = clientID;
                }

                params.kid_directed_site = require("sdk.Runtime").getKidDirectedSite();

                var url =
                  require("UrlMap").resolve("www") +
                  "/impression.php/" +
                  require("guid")() +
                  "/";
                if (require("sdk.feature")("epd_endpoint_migration", false)) {
                  if (isCanvas) {
                    url =
                      require("UrlMap").resolve("www") +
                      "/platform/canvas_impression.php/" +
                      require("guid")() +
                      "/";
                  } else {
                    url =
                      require("UrlMap").resolve("www") +
                      "/platform/impression.php/" +
                      require("guid")() +
                      "/";
                  }
                }

                var fullUrlPath = require("QueryString").appendToUrl(
                  url,
                  params
                );
                if (fullUrlPath.length > 2000) {
                  if (params.payload && typeof params.payload === "string") {
                    var payload = params.payload;
                    var minyPayload = require("Miny").encode(payload);
                    if (minyPayload && minyPayload.length < payload.length) {
                      params.payload = minyPayload;
                      fullUrlPath = require("QueryString").appendToUrl(
                        url,
                        params
                      );
                    }
                  }
                }

                if (window.fetch) {
                  makeRequest(
                    url,
                    fullUrlPath,
                    params,
                    should_include_creds || isCanvas
                  );
                } else {
                  _makeRequest_DEPRECATED(
                    url,
                    fullUrlPath,
                    params,
                    should_include_creds || isCanvas
                  );
                }
              }

              function makeRequest(
                url,
                fullUrlPath,
                params,
                should_include_creds
              ) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                var standardFetchOptions = {
                  mode: "no-cors",
                  credentials: "include"
                };

                if (
                  require("sdk.feature")("epd_omit_cookies", false) &&
                  !should_include_creds
                ) {
                  standardFetchOptions.credentials = "omit";
                }

                if (fullUrlPath.length <= 2000) {
                  window.fetch(fullUrlPath, standardFetchOptions);
                } else {
                  var searchParams = new URLSearchParams();

                  for (var key in params) {
                    if (Object.prototype.hasOwnProperty.call(params, key)) {
                      var val = params[key];
                      if (val !== null && val !== undefined) {
                        searchParams.set(key, val);
                      }
                    }
                  }

                  var fetchOptions = babelHelpers["extends"](
                    {
                      method: "POST",
                      body: searchParams
                    },
                    standardFetchOptions
                  );

                  window.fetch(url, fetchOptions);
                }
              }

              function _makeRequest_DEPRECATED(
                url,
                fullUrlPath,
                params,
                should_include_creds
              ) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                if (fullUrlPath.length <= 2000) {
                  var image = new Image();
                  if (
                    require("sdk.feature")("epd_omit_cookies", false) &&
                    !should_include_creds
                  ) {
                    image.crossOrigin = "anonymous";
                  }

                  image.src = fullUrlPath;
                } else {
                  if (
                    require("sdk.feature")("epd_omit_cookies", false) &&
                    !should_include_creds
                  ) {
                    return;
                  }

                  var name = require("guid")();
                  var root = require("sdk.Content").appendHidden(
                    document.createElement("div")
                  );
                  require("insertIframe")({
                    url: require("getBlankIframeSrc")(),
                    root: root,
                    name: name,
                    className: "fb_hidden fb_invisible",
                    onload: function onload() {
                      if (root.parentNode != null) {
                        root.parentNode.removeChild(root);
                      }
                    }
                  });

                  require("sdk.Content").submitToTarget({
                    url: url,
                    target: name,
                    params: params
                  });
                }
              }

              function log(lid, payload) {
                if (
                  typeof payload.source !== "string" ||
                  payload.source === ""
                ) {
                  payload.source = "jssdk";
                }

                impression({
                  lid: lid,
                  payload: ES("JSON", "stringify", false, payload)
                });
              }
            },
            null
          );
          __d(
            "sdk.Observable",
            [],
            function $module_sdk_Observable(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var Observable = (function() {
                function Observable() {
                  this.$Observable_observableEvents = {};
                  this.getSubscribers = ES(
                    this.getSubscribers,
                    "bind",
                    true,
                    this
                  );
                  this.clearSubscribers = ES(
                    this.clearSubscribers,
                    "bind",
                    true,
                    this
                  );
                  this.subscribe = ES(this.subscribe, "bind", true, this);
                  this.unsubscribe = ES(this.unsubscribe, "bind", true, this);
                  this.inform = ES(this.inform, "bind", true, this);
                }
                var _proto = Observable.prototype;
                _proto.getSubscribers = function getSubscribers(toWhat) {
                  return (
                    this.$Observable_observableEvents[toWhat] ||
                    (this.$Observable_observableEvents[toWhat] = [])
                  );
                };
                _proto.clearSubscribers = function clearSubscribers(toWhat) {
                  if (toWhat) {
                    this.$Observable_observableEvents[toWhat] = [];
                  }
                };
                _proto.subscribe = function subscribe(toWhat, withWhat) {
                  var list = this.getSubscribers(toWhat);
                  list.push(withWhat);
                };
                _proto.unsubscribe = function unsubscribe(toWhat, withWhat) {
                  var list = this.getSubscribers(toWhat);
                  for (var i = 0; i < list.length; i++) {
                    if (list[i] === withWhat) {
                      list.splice(i, 1);
                      break;
                    }
                  }
                };
                _proto.inform = function inform(what, withWhat) {
                  var list = this.getSubscribers(what);
                  for (var i = 0; i < list.length; i++) {
                    if (list[i] === null) {
                      continue;
                    }
                    if (__DEV__) {
                      list[i].call(this, withWhat);
                    } else {
                      try {
                        list[i].call(this, withWhat);
                      } catch (e) {
                        window.setTimeout(function window_setTimeout_$0() {
                          throw e;
                        }, 0);
                      }
                    }
                  }
                };
                return Observable;
              })();
              exports.Observable = Observable;
            },
            null
          );
          __d(
            "Base64",
            [],
            function $module_Base64(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var en =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
              function en3(c) {
                var num =
                  (c.charCodeAt(0) << 16) |
                  (c.charCodeAt(1) << 8) |
                  c.charCodeAt(2);
                return String.fromCharCode(
                  en.charCodeAt(num >>> 18),
                  en.charCodeAt((num >>> 12) & 63),
                  en.charCodeAt((num >>> 6) & 63),
                  en.charCodeAt(num & 63)
                );
              }

              var de =
                ">___?456789:;<=_______" +
                "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000B\f\r\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019" +
                "______\u001A\u001B\u001C\u001D\u001E\u001F !\"#$%&'()*+,-./0123";
              function de4(c) {
                var num =
                  (de.charCodeAt(c.charCodeAt(0) - 43) << 18) |
                  (de.charCodeAt(c.charCodeAt(1) - 43) << 12) |
                  (de.charCodeAt(c.charCodeAt(2) - 43) << 6) |
                  de.charCodeAt(c.charCodeAt(3) - 43);
                return String.fromCharCode(
                  num >>> 16,
                  (num >>> 8) & 255,
                  num & 255
                );
              }

              var Base64 = {
                encode: function encode(input) {
                  var str = unescape(encodeURI(input));
                  var i = (str.length + 2) % 3;
                  str = (str + "\u0000\u0000".slice(i)).replace(
                    /[\s\S]{3}/g,
                    en3
                  );
                  return str.slice(0, str.length + i - 2) + "==".slice(i);
                },
                decode: function decode(input) {
                  var str = input.replace(/[^A-Za-z0-9+\/]/g, "");
                  var i = (str.length + 3) & 3;
                  str = (str + "AAA".slice(i)).replace(/..../g, de4);
                  str = str.slice(0, str.length + i - 3);

                  try {
                    return decodeURIComponent(escape(str));
                  } catch (_unused) {
                    throw new Error("Not valid UTF-8");
                  }
                },
                encodeObject: function encodeObject(obj) {
                  return Base64.encode(ES("JSON", "stringify", false, obj));
                },
                decodeObject: function decodeObject(b64) {
                  return ES("JSON", "parse", false, Base64.decode(b64));
                },

                encodeNums: function encodeNums(l) {
                  return String.fromCharCode.apply(
                    String,
                    l.map(function l_map_$0(val) {
                      return en.charCodeAt(
                        (val | -(val > 63 ? 1 : 0)) & -(val > 0 ? 1 : 0) & 63
                      );
                    })
                  );
                }
              };
              var _default = Base64;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.SignedRequest",
            ["Base64"],
            function $module_sdk_SignedRequest(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.parse = parse;

              function parse(signed_request) {
                if (signed_request == null || signed_request === "") {
                  return null;
                }

                var payload = signed_request
                  .split(".", 2)[1]
                  .replace(/\-/g, "+")
                  .replace(/\_/g, "/");
                return require("Base64").decodeObject(payload);
              }
            },
            null
          );
          __d(
            "sdk.WebStorage",
            ["Log"],
            function $module_sdk_WebStorage(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.getLocalStorage = getLocalStorage;
              exports.getLocalStorageForRead = getLocalStorageForRead;
              exports.getSessionStorage = getSessionStorage;
              exports.getSessionStorageForRead = getSessionStorageForRead;

              function getLocalStorage() {
                try {
                  return window.localStorage;
                } catch (_unused) {
                  require("Log").warn("Failed to get local storage");
                }
                return null;
              }

              function getLocalStorageForRead() {
                try {
                  var storage = window.localStorage;

                  if (storage) {
                    var key = "__test__" + Date.now();
                    storage.setItem(key, "");
                    storage.removeItem(key);
                  }
                  return storage;
                } catch (_unused2) {
                  require("Log").warn("Failed to get local storage");
                }
                return null;
              }

              function getSessionStorage() {
                try {
                  return window.sessionStorage;
                } catch (_unused3) {
                  require("Log").warn("Failed to get session storage");
                }
                return null;
              }

              function getSessionStorageForRead() {
                try {
                  var storage = window.sessionStorage;

                  if (storage) {
                    var key = "__test__" + Date.now();
                    storage.setItem(key, "");
                    storage.removeItem(key);
                  }
                  return storage;
                } catch (_unused4) {
                  require("Log").warn("Failed to get session storage");
                }
                return null;
              }
            },
            null
          );
          __d(
            "sdk.getContextType",
            ["sdk.Runtime", "sdk.UA"],
            function $module_sdk_getContextType(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = getContextType;

              function getContextType() {
                if (require("sdk.UA").nativeApp()) {
                  return 3;
                }
                if (require("sdk.UA").mobile()) {
                  return 2;
                }
                if (
                  require("sdk.Runtime").isEnvironment(
                    require("sdk.Runtime").ENVIRONMENTS.CANVAS
                  )
                ) {
                  return 5;
                }
                return 1;
              }
            },
            null
          );
          __d(
            "sdk.Auth",
            [
              "Log",
              "QueryString",
              "UrlMap",
              "sdk.Cookie",
              "sdk.Frictionless",
              "sdk.Impressions",
              "sdk.Observable",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.SignedRequest",
              "sdk.UA",
              "sdk.URI",
              "sdk.WebStorage",
              "sdk.feature",
              "sdk.getContextType"
            ],
            function $module_sdk_Auth(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              require("sdk.Frictionless");

              var LOCAL_STORAGE_TOKEN_PREFIX = "fblst_";
              var SESSION_STORAGE_LOGIN_STATUS_PREFIX = "fbssls_";
              var LOGOUT_COOKIE_PREFIX = "fblo_";
              var YEAR_MS = 365 * 24 * 60 * 60 * 1000;
              var CONNECTED_REVALIDATE_PERIOD = 60 * 90 * 1000;
              var DEFAULT_REVALIDATE_PERIOD = 60 * 60 * 24 * 1000;
              var LOGIN_COMPLETE_HEARTBEAT_TIMEOUT = 5 * 1000;
              var PLATFORM_E2E_TRACKING_LOG_ID = 114;
              var PLATFORM_JSSDK_FUNNEL_LOG_ID = 117;

              var observable = new (require("sdk.Observable")).Observable();

              var currentAuthResponse;

              var timer;

              var facebookRe = /^https?:\/\/([\w\.]+)?\.facebook\.com\/?/;

              require("sdk.Runtime").subscribe(
                "AccessToken.change",
                function Runtime_subscribe_$1(value) {
                  if (
                    !value &&
                    require("sdk.Runtime").getLoginStatus() === "connected"
                  ) {
                    Auth.getLoginStatus(null, true);
                  }
                }
              );

              function toWebOAuthStatus(status) {
                switch (status) {
                  case "connected":
                    return "connected";
                  case "not_authorized":
                    return "not_authorized";
                  default:
                    return "unknown";
                }
              }

              function setAuthResponse(authResponse, status, fromCache) {
                if (fromCache === void 0) {
                  fromCache = false;
                }
                var currentUserID = require("sdk.Runtime").getUserID();
                var currentStatus = require("sdk.Runtime").getLoginStatus();

                var userID = "";
                if (authResponse != null) {
                  loadState = "loaded";

                  if (
                    authResponse.userID != null &&
                    authResponse.userID !== ""
                  ) {
                    userID = authResponse.userID;
                  } else if (
                    authResponse.signedRequest != null &&
                    authResponse.signedRequest !== ""
                  ) {
                    var parsedSignedRequest = require("sdk.SignedRequest").parse(
                      authResponse.signedRequest
                    );

                    if (
                      parsedSignedRequest != null &&
                      parsedSignedRequest !== "" &&
                      parsedSignedRequest.user_id != null &&
                      parsedSignedRequest.user_id !== ""
                    ) {
                      userID = parsedSignedRequest.user_id;
                    }
                  }

                  if (require("sdk.Runtime").getUseCookie()) {
                    var expirationTime =
                      authResponse.expiresIn === 0
                        ? 0
                        : Date.now() + authResponse.expiresIn * 1000;
                    require("sdk.Cookie").setSignedRequestCookie(
                      authResponse.signedRequest,
                      expirationTime
                    );
                  }
                } else {
                  if (require("sdk.Runtime").getUseCookie()) {
                    require("sdk.Cookie").clearSignedRequestCookie();
                  }
                  if (require("sdk.Runtime").getUseLocalStorage()) {
                    removeLocalStorageToken();
                  }
                }

                var login =
                  (currentStatus === "unknown" && authResponse != null) ||
                  (require("sdk.Runtime").getUseCookie() &&
                    require("sdk.Runtime").getCookieUserID() !== userID);
                var logout =
                  currentUserID != null &&
                  currentUserID !== "" &&
                  authResponse == null;

                var both =
                  authResponse != null &&
                  currentUserID != null &&
                  currentUserID !== "" &&
                  currentUserID != userID;

                var authResponseChange = authResponse != currentAuthResponse;
                var statusChange = status != currentStatus;

                require("sdk.Runtime").setLoginStatus(status);
                require("sdk.Runtime").setAccessToken(
                  (authResponse && authResponse.accessToken) || null
                );
                require("sdk.Runtime").setUserID(userID);
                require("sdk.Runtime").setGraphDomain(
                  (authResponse && authResponse.graphDomain) || ""
                );

                currentAuthResponse = authResponse;

                var response = {
                  authResponse: authResponse,
                  status: status
                };

                if (logout || both) {
                  observable.inform("logout", response);
                }
                if (login || both) {
                  observable.inform("login", response);
                }
                if (authResponseChange) {
                  observable.inform("authresponse.change", response);
                }
                if (statusChange) {
                  observable.inform("status.change", response);
                }

                if (
                  !fromCache &&
                  require("sdk.feature")("cache_auth_response", false) &&
                  require("sdk.Runtime").getUseLocalStorage()
                ) {
                  var sessionStorage = require("sdk.WebStorage").getSessionStorage();
                  if (sessionStorage) {
                    sessionStorage.setItem(
                      SESSION_STORAGE_LOGIN_STATUS_PREFIX +
                        require("sdk.Runtime").getClientID(),
                      ES("JSON", "stringify", false, {
                        authResponse: authResponse,
                        status: status,
                        expiresAt:
                          authResponse != null &&
                          authResponse.expiresIn &&
                          authResponse.expiresIn !== 0
                            ? Date.now() +
                              Math.min(
                                authResponse.expiresIn * 0.75 * 1000,
                                CONNECTED_REVALIDATE_PERIOD
                              )
                            : Date.now() + DEFAULT_REVALIDATE_PERIOD
                      })
                    );
                  }
                }

                return response;
              }

              function getAuthResponse() {
                return currentAuthResponse;
              }

              function setBaseDomain(baseDomain) {
                if (require("sdk.Runtime").getUseCookie()) {
                  if (require("sdk.Cookie").getDomain() == null) {
                    require("sdk.Cookie").setDomain("." + baseDomain);
                  }
                }
              }

              function setGraphDomain(graphDomain) {
                if (!!graphDomain) {
                  require("sdk.Runtime").setGraphDomain(graphDomain);
                } else {
                  require("sdk.Runtime").setGraphDomain("");
                }
              }

              function logout(cb) {
                var currentAuthResponse = getAuthResponse();
                setAuthResponse(null, "unknown");
                setLogoutState();

                if (
                  currentAuthResponse != null &&
                  currentAuthResponse.accessToken != null
                ) {
                  var url = new (require("sdk.URI"))(
                    require("UrlMap")
                      .resolve("www")
                      .replace("web.", "www.") + "/x/oauth/logout"
                  ).addQueryData(
                    "access_token",
                    currentAuthResponse.accessToken
                  );

                  var xhr = new XMLHttpRequest();
                  if (xhr) {
                    xhr.open("GET", url.toString(), true);
                    xhr.withCredentials = true;
                    if (cb) {
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState >= 2) {
                          cb({
                            authResponse: getAuthResponse(),
                            status: require("sdk.Runtime").getLoginStatus()
                          });
                        }
                      };
                    }
                    xhr.send();
                  }
                }
                require("sdk.Scribe").log("jssdk_error", {
                  appId: require("sdk.Runtime").getClientID(),
                  error: "PLATFORM_AUTH_LOGOUT",
                  extra: { args: { fblo: true } }
                });
              }

              function xdResponseWrapper(
                cb,
                authResponse,
                _method,
                requestParams
              ) {
                return function(params) {
                  var status;
                  if (params && params.access_token) {
                    var parsedSignedRequest = require("sdk.SignedRequest").parse(
                      params.signed_request
                    );
                    var user_id =
                      parsedSignedRequest != null
                        ? parsedSignedRequest.user_id != null
                          ? parsedSignedRequest.user_id
                          : null
                        : null;
                    authResponse = {
                      accessToken: params.access_token,
                      userID: user_id,
                      expiresIn: Number(params.expires_in),
                      signedRequest: params.signed_request,
                      graphDomain: params.graph_domain
                    };

                    if (params.asset_scopes) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        asset_scopes: ES(
                          "JSON",
                          "parse",
                          false,
                          params.asset_scopes
                        )
                      });
                    }

                    authResponse = populateAuthResponse(authResponse, params);

                    removeLogoutState();
                    status = "connected";
                    setAuthResponse(authResponse, status);
                    logSuccessfulAuth(requestParams);
                  } else if (params && params.asset_scopes) {
                    authResponse = {
                      asset_scopes: ES(
                        "JSON",
                        "parse",
                        false,
                        params.asset_scopes
                      )
                    };

                    authResponse = populateAuthResponse(authResponse, params);

                    removeLogoutState();
                    status = "connected";
                    setAuthResponse(authResponse, status);
                    logSuccessfulAuth(requestParams);
                  } else if (params && params.error === "access_denied") {
                    setLogoutState();
                    status = "unknown";
                    setAuthResponse(null, status);
                  } else if (params && params.result) {
                    removeLogoutState();
                    authResponse = params.result.authResponse;
                  }

                  if (cb) {
                    var _response = {
                      authResponse: authResponse,
                      status: require("sdk.Runtime").getLoginStatus()
                    };

                    cb(_response);
                  }
                  return authResponse;
                };
              }

              function logSuccessfulAuth(requestParams) {
                var loggerID =
                  requestParams && requestParams.logger_id
                    ? requestParams.logger_id
                    : null;
                var cbt =
                  requestParams && requestParams.cbt ? requestParams.cbt : 0;
                var payload = {
                  action: "client_login_end",
                  logger_id: loggerID,
                  client_funnel_version: require("sdk.feature")(
                    "oauth_funnel_logger_version",
                    1
                  ),
                  cbt_delta: Date.now() - cbt
                };

                if (
                  requestParams &&
                  requestParams.tp &&
                  requestParams.tp !== "unspecified"
                ) {
                  return;
                }

                require("sdk.Impressions").log(PLATFORM_JSSDK_FUNNEL_LOG_ID, {
                  payload: payload
                });

                window.setTimeout(function window_setTimeout_$0() {
                  var payload = {
                    action: "client_login_complete_heartbeat",
                    logger_id: loggerID,
                    client_funnel_version: require("sdk.feature")(
                      "oauth_funnel_logger_version",
                      1
                    ),
                    cbt_delta: Date.now() - cbt
                  };

                  require("sdk.Impressions").log(PLATFORM_JSSDK_FUNNEL_LOG_ID, {
                    payload: payload
                  });
                }, LOGIN_COMPLETE_HEARTBEAT_TIMEOUT);
              }

              function populateAuthResponse(authResponse, params) {
                if (params.granted_scopes) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    grantedScopes: params.granted_scopes
                  });
                }

                if (params.data_access_expiration_time) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    data_access_expiration_time: Number(
                      params.data_access_expiration_time
                    )
                  });
                }

                if (params.base_domain != null) {
                  setBaseDomain(params.base_domain);
                }

                setGraphDomain(params.graph_domain);

                if (params.enforce_https) {
                  require("sdk.Runtime").setEnforceHttps(true);
                }

                if (params.referred) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    referred: params.referred
                  });
                }

                if (
                  require("sdk.Runtime").getUseLocalStorage() &&
                  location.protocol === "https:" &&
                  require("sdk.feature")("cache_auth_response", false) &&
                  params.long_lived_token
                ) {
                  var localStorage = require("sdk.WebStorage").getLocalStorage();
                  if (localStorage) {
                    localStorage.setItem(
                      LOCAL_STORAGE_TOKEN_PREFIX +
                        require("sdk.Runtime").getClientID(),
                      params.long_lived_token
                    );
                  }
                }

                return authResponse;
              }

              function removeLocalStorageToken() {
                var localStorage = require("sdk.WebStorage").getLocalStorage();
                if (localStorage) {
                  localStorage.removeItem(
                    LOCAL_STORAGE_TOKEN_PREFIX +
                      require("sdk.Runtime").getClientID()
                  );
                }
              }

              function removeLogoutState() {
                require("sdk.Cookie").setRaw(
                  LOGOUT_COOKIE_PREFIX,
                  "",
                  0,
                  false
                );
                require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX, "", 0, true);
              }

              function setLogoutState() {
                require("sdk.Cookie").setRaw(
                  LOGOUT_COOKIE_PREFIX,
                  "y",
                  Date.now() + YEAR_MS,
                  false
                );
              }

              function unknownStatus(cb) {
                var unk_status = "unknown";
                setAuthResponse(null, unk_status);
                var response = {
                  authResponse: null,
                  status: unk_status
                };

                if (cb) {
                  cb(response);
                }
              }

              function executeIABCallback(cb, iabResponseStr) {
                var iabResponse = ES("JSON", "parse", false, iabResponseStr);
                if (iabResponse["iab-s"] == null) {
                  iabResponse["iab-s"] = "unknown";
                }
                switch (iabResponse["iab-s"]) {
                  case "connected":
                    setAuthResponse(iabResponse["iab-ar"], "connected");

                    break;
                  case "not_authorized":
                  case "unknown":
                  default:
                    setAuthResponse(null, iabResponse["iab-s"]);
                }

                if (cb) {
                  var _response2 = {
                    authResponse: getAuthResponse(),
                    status: require("sdk.Runtime").getLoginStatus()
                  };

                  cb(_response2);
                }
                window.removeEventListener(
                  "fbNativeLoginResponse",
                  function window_removeEventListener_$1(ev) {
                    return executeIABCallback(cb, ev.response);
                  }
                );
              }

              function fetchLoginStatus(fn) {
                var _redirAccessToken;
                if (timer) {
                  window.clearTimeout(timer);
                  timer = null;
                }

                var fb_logged_out =
                  require("sdk.Cookie").getRaw(LOGOUT_COOKIE_PREFIX) === "y";

                var redirAccessToken = null;
                var redirCancelled = false;
                if (
                  require("sdk.Runtime").getLoginStatus() !== "connected" &&
                  (document.referrer === "" ||
                    facebookRe.test(document.referrer))
                ) {
                  var fragment = location.hash.substr(1);
                  if (fragment !== "") {
                    var fragmentParams = require("QueryString").decode(
                      fragment,
                      true
                    );
                    redirAccessToken = fragmentParams.access_token;
                    var redirSignedRequest = fragmentParams.signed_request;
                    if (redirAccessToken != null) {
                      removeLogoutState();
                    }

                    if (window == top && redirAccessToken != null) {
                      var ofn = fn;
                      fn = function fn(response) {
                        var _response$authRespons;
                        if (
                          response != null &&
                          response.status === "connected" &&
                          ((_response$authRespons = response.authResponse) ==
                          null
                            ? void 0
                            : _response$authRespons.accessToken) ===
                            redirAccessToken
                        ) {
                          delete fragmentParams.access_token;
                          delete fragmentParams.code;
                          delete fragmentParams.signed_request;
                          location.hash = require("QueryString").encode(
                            fragmentParams
                          );
                          if (
                            redirSignedRequest != null &&
                            response.authResponse != null
                          ) {
                            response.authResponse.signedRequest = redirSignedRequest;
                          }
                        }
                        if (ofn != null) {
                          ofn(response);
                        }
                      };
                    }
                  }

                  var queryParams = require("QueryString").decode(
                    location.search
                  );
                  if (queryParams.error === "access_denied") {
                    redirCancelled = true;
                  }
                }

                if (fb_logged_out || redirCancelled) {
                  unknownStatus(fn);
                  return;
                }

                var localStorageToken = null;
                if (require("sdk.Runtime").getUseLocalStorage()) {
                  var localStorage = require("sdk.WebStorage").getLocalStorageForRead();
                  if (localStorage) {
                    localStorageToken = localStorage.getItem(
                      LOCAL_STORAGE_TOKEN_PREFIX +
                        require("sdk.Runtime").getClientID()
                    );
                  }
                }

                var token =
                  (_redirAccessToken = redirAccessToken) != null
                    ? _redirAccessToken
                    : localStorageToken;

                if (window.location.protocol !== "https:") {
                  unknownStatus(fn);
                }

                if (
                  require("sdk.UA").isSupportedIABVersion(
                    parseFloat(
                      require("sdk.feature")(
                        "iab_login_android_support_version",
                        "999.0"
                      )
                    )
                  ) &&
                  window.FBLogin &&
                  typeof window.FBLogin.showFBLoginBottomSheetInIAB ===
                    "function" &&
                  require("sdk.feature")("iab_login_status", false)
                ) {
                  window.addEventListener(
                    "fbNativeLoginResponse",
                    function window_addEventListener_$1(ev) {
                      return executeIABCallback(fn, ev.response);
                    }
                  );

                  window.addEventListener(
                    "fbNativeLoginFallbackResponse",
                    function window_addEventListener_$1(_ev) {
                      Auth.getLoginStatusCORS(fn, token, currentAuthResponse);
                    }
                  );
                  var clientID = require("sdk.Runtime").getClientID();
                  window.FBLogin.showFBLoginBottomSheetInIAB(clientID);
                } else {
                  Auth.getLoginStatusCORS(fn, token, currentAuthResponse);
                }
              }

              function getCORSTarget(token) {
                var url = new (require("sdk.URI"))(
                  require("UrlMap")
                    .resolve("www")
                    .replace("web.", "www.") + "/x/oauth/status"
                )
                  .addQueryData(
                    "client_id",
                    require("sdk.Runtime").getClientID()
                  )
                  .addQueryData("input_token", token)
                  .addQueryData("redirect_uri", window.location.href)
                  .addQueryData("origin", require("sdk.getContextType")())
                  .addQueryData("sdk", "joey")
                  .addQueryData(
                    "wants_cookie_data",
                    require("sdk.Runtime").getUseCookie()
                  );

                if (!!window.location.ancestorOrigins) {
                  var ancestorOrigins = window.location.ancestorOrigins;
                  if (ancestorOrigins.length > 0) {
                    var ancestorOriginString = "";

                    for (var i = 0; i < ancestorOrigins.length; i++) {
                      ancestorOriginString += ancestorOrigins[i];
                      ancestorOriginString += ",";
                    }

                    url.addQueryData(
                      "ancestor_origins",
                      ancestorOriginString.slice(0, -1)
                    );
                  }
                }

                return url;
              }

              function onCORSSuccess(cb, loginStatus, authResponseHeader) {
                switch (loginStatus) {
                  case "connected":
                    var xhrAuthResponse = ES(
                      "JSON",
                      "parse",
                      false,
                      authResponseHeader
                    );

                    var authResponse = {
                      accessToken: xhrAuthResponse.access_token,
                      userID: xhrAuthResponse.user_id,
                      expiresIn: Number(xhrAuthResponse.expires_in),
                      signedRequest: xhrAuthResponse.signed_request,
                      graphDomain: xhrAuthResponse.graph_domain
                    };

                    if (xhrAuthResponse.enforce_https != null) {
                      require("sdk.Runtime").setEnforceHttps(true);
                    }

                    if (xhrAuthResponse.data_access_expiration_time != null) {
                      authResponse.data_access_expiration_time = Number(
                        xhrAuthResponse.data_access_expiration_time
                      );
                    }

                    if (xhrAuthResponse.base_domain != null) {
                      setBaseDomain(xhrAuthResponse.base_domain);
                    }

                    setGraphDomain(xhrAuthResponse.graph_domain);

                    if (
                      require("sdk.Runtime").getUseLocalStorage() &&
                      location.protocol === "https:" &&
                      require("sdk.feature")("cache_auth_response", false) &&
                      xhrAuthResponse.long_lived_token
                    ) {
                      var localStorage = require("sdk.WebStorage").getLocalStorage();
                      if (localStorage) {
                        localStorage.setItem(
                          LOCAL_STORAGE_TOKEN_PREFIX +
                            require("sdk.Runtime").getClientID(),
                          xhrAuthResponse.long_lived_token
                        );
                      }
                    }

                    removeLogoutState();
                    setAuthResponse(authResponse, loginStatus);
                    timer = window.setTimeout(function window_setTimeout_$0() {
                      fetchLoginStatus(function fetchLoginStatus_$0() {});
                    }, CONNECTED_REVALIDATE_PERIOD);
                    break;
                  case "not_authorized":
                  case "unknown":
                  default:
                    setAuthResponse(null, loginStatus);
                }

                if (cb) {
                  var _response3 = {
                    authResponse: getAuthResponse(),
                    status: require("sdk.Runtime").getLoginStatus()
                  };

                  cb(_response3);
                }
              }

              function onCORSFailure(cb, httpStatus, currentAuthResponse) {
                if (httpStatus === 0) {
                  if (
                    require("sdk.feature")(
                      "cors_status_fetch_cancel_tracking",
                      false
                    )
                  ) {
                    require("sdk.Scribe").log("jssdk_error", {
                      appId: require("sdk.Runtime").getClientID(),
                      error: "CORS_STATUS_FETCH_CANCELLED",
                      extra: { message: "Status 0 returned." }
                    });
                  }
                  require("Log").error(
                    "Error retrieving login status, fetch cancelled."
                  );
                } else {
                  require("sdk.Scribe").log("jssdk_error", {
                    appId: require("sdk.Runtime").getClientID(),
                    error: "CORS_STATUS_FETCH",
                    extra: { message: "HTTP Status Code " + httpStatus }
                  });

                  require("Log").error(
                    "Error retrieving login status, HTTP status code: " +
                      httpStatus
                  );
                }
                if (cb) {
                  var _response4 = {
                    authResponse: currentAuthResponse,
                    status: require("sdk.Runtime").getLoginStatus()
                  };

                  cb(_response4);
                }
              }

              function getLoginStatusCORS(cb, token, currentAuthResponse) {
                var fetchStart = Date.now();
                var url = getCORSTarget(token);

                function corsFetchXHR() {
                  var xhr = new XMLHttpRequest();
                  if (xhr) {
                    xhr.open("GET", url.toString(), true);
                    xhr.withCredentials = true;
                    xhr.onreadystatechange = function() {
                      if (xhr.readyState === 4) {
                        if (require("sdk.feature")("e2e_ping_tracking", true)) {
                          var events = {
                            init: fetchStart,
                            close: Date.now(),
                            method: "cors"
                          };

                          require("Log").debug(
                            "e2e: %s",
                            ES("JSON", "stringify", false, events)
                          );
                          require("sdk.Impressions").log(
                            PLATFORM_E2E_TRACKING_LOG_ID,
                            {
                              payload: events
                            }
                          );
                        }

                        if (xhr.status === 200) {
                          var _xhr$getResponseHeade;
                          onCORSSuccess(
                            cb,
                            toWebOAuthStatus(xhr.getResponseHeader("fb-s")),
                            (_xhr$getResponseHeade = xhr.getResponseHeader(
                              "fb-ar"
                            )) != null
                              ? _xhr$getResponseHeade
                              : "{}"
                          );
                        } else {
                          onCORSFailure(cb, xhr.status, currentAuthResponse);
                        }
                      }
                    };
                    xhr.send();
                  }
                }

                function corsFetch() {
                  window
                    .fetch(url.toString(), {
                      referrer: "/",
                      mode: "cors",
                      credentials: "include"
                    })
                    .then(function then_$0(response) {
                      if (response.status === 200) {
                        var _response$headers$get, _response$headers$get2;
                        onCORSSuccess(
                          cb,
                          (_response$headers$get = response.headers.get(
                            "fb-s"
                          )) != null
                            ? _response$headers$get
                            : "unknown",
                          (_response$headers$get2 = response.headers.get(
                            "fb-ar"
                          )) != null
                            ? _response$headers$get2
                            : "{}"
                        );
                      } else {
                        onCORSFailure(cb, response.status, currentAuthResponse);
                      }
                    })
                    ["catch"](function $0(_e) {
                      return onCORSFailure(cb, 0, currentAuthResponse);
                    });
                }

                if (typeof window.fetch === "function") {
                  corsFetch();
                } else {
                  corsFetchXHR();
                }
              }

              var loadState;
              function getLoginStatus(cb, force) {
                if (force === void 0) {
                  force = false;
                }
                var appID = require("sdk.Runtime").getClientID();
                if (appID == null || appID === "") {
                  require("Log").warn(
                    "FB.getLoginStatus() called before calling FB.init()."
                  );
                  unknownStatus(cb);
                  return;
                }

                if (
                  !(typeof appID === "number" || typeof appID === "string") ||
                  appID === 0 ||
                  (typeof appID === "string" &&
                    (appID === "0" || !/^\d+$/.test(appID)))
                ) {
                  require("Log").warn(
                    "FB.getLoginStatus() not checked for an invalid client ID " +
                      appID
                  );

                  unknownStatus(cb);
                  return;
                }

                var skipCache =
                  require("sdk.Runtime").getLoginStatus() !== "connected" &&
                  facebookRe.test(document.referrer) &&
                  location.hash.indexOf("cb=") > -1;

                if (
                  !skipCache &&
                  !force &&
                  require("sdk.feature")("cache_auth_response", false) &&
                  require("sdk.Runtime").getUseLocalStorage() &&
                  location.protocol === "https:"
                ) {
                  var sessionStorage = require("sdk.WebStorage").getSessionStorageForRead();
                  if (sessionStorage) {
                    var rawCachedResponse = sessionStorage.getItem(
                      SESSION_STORAGE_LOGIN_STATUS_PREFIX +
                        require("sdk.Runtime").getClientID()
                    );

                    if (rawCachedResponse != null) {
                      try {
                        var cachedResponse = ES(
                          "JSON",
                          "parse",
                          false,
                          rawCachedResponse
                        );

                        if (
                          cachedResponse != null &&
                          cachedResponse.expiresAt != null &&
                          cachedResponse.expiresAt > Date.now()
                        ) {
                          var _cachedResponse$statu;
                          loadState = "loaded";
                          setAuthResponse(
                            cachedResponse.authResponse,
                            (_cachedResponse$statu = cachedResponse.status) !=
                              null
                              ? _cachedResponse$statu
                              : "unknown",
                            true
                          );

                          timer = window.setTimeout(
                            function window_setTimeout_$0() {
                              fetchLoginStatus(
                                function fetchLoginStatus_$0() {}
                              );
                            },
                            cachedResponse.status === "connected"
                              ? CONNECTED_REVALIDATE_PERIOD
                              : DEFAULT_REVALIDATE_PERIOD
                          );
                        }
                      } catch (_unused) {}
                    }
                  }
                }

                if (!force) {
                  if (loadState === "loaded") {
                    if (cb) {
                      var _response5 = {
                        authResponse: getAuthResponse(),
                        status: require("sdk.Runtime").getLoginStatus()
                      };

                      cb(_response5);
                    }
                    return;
                  } else if (loadState === "loading") {
                    if (cb) {
                      Auth.subscribe("FB.loginStatus", cb);
                    }
                    return;
                  }
                }

                if (cb) {
                  Auth.subscribe("FB.loginStatus", cb);
                }

                loadState = "loading";

                var lsCb = function lsCb(response) {
                  loadState = "loaded";

                  observable.inform("FB.loginStatus", response);
                  observable.clearSubscribers("FB.loginStatus");
                };

                fetchLoginStatus(lsCb);
              }

              var Auth = {
                removeLogoutState: removeLogoutState,
                getLoginStatus: getLoginStatus,
                getLoginStatusCORS: getLoginStatusCORS,
                fetchLoginStatus: fetchLoginStatus,
                logout: logout,
                setAuthResponse: setAuthResponse,
                getAuthResponse: getAuthResponse,
                parseSignedRequest: require("sdk.SignedRequest").parse,
                xdResponseWrapper: xdResponseWrapper,
                subscribe: observable.subscribe,
                unsubscribe: observable.unsubscribe
              };
              var _default = Auth;
              module.exports = _default;
            },
            null
          );
          __d(
            "dedupString",
            [],
            function $module_dedupString(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = dedupString;

              function dedupString(str) {
                var _Object$keys;

                return Object.keys(
                  ((_Object$keys = {}), (_Object$keys[str] = 0), _Object$keys)
                )[0];
              }
            },
            null
          );
          __d(
            "emptyFunction",
            [],
            function $module_emptyFunction(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function makeEmptyFunction(arg) {
                return function() {
                  return arg;
                };
              }

              var emptyFunction = function emptyFunction() {};

              emptyFunction.thatReturns = makeEmptyFunction;
              emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
              emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
              emptyFunction.thatReturnsNull = makeEmptyFunction(null);
              emptyFunction.thatReturnsThis = function() {
                return this;
              };
              emptyFunction.thatReturnsArgument = function(arg) {
                return arg;
              };
              var _default = emptyFunction;
              module.exports = _default;
            },
            null
          );
          __d(
            "DOMEventListener",
            ["invariant", "dedupString", "emptyFunction", "wrapFunction"],
            function $module_DOMEventListener(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant
            ) {
              var supportsPassive = false;
              try {
                var opts = Object.defineProperty({}, "passive", {
                  get: function get() {
                    supportsPassive = true;
                  }
                });

                window.addEventListener("test", null, opts);
              } catch (_unused) {}

              var _add, _remove;

              if (window.addEventListener) {
                _add = function add(target, name, listener, options) {
                  if (options === void 0) {
                    options = false;
                  }

                  listener.wrapper = require("wrapFunction")(
                    listener,
                    "entry",
                    require("dedupString")("DOMEventListener.add " + name)
                  );

                  target.addEventListener(
                    name,
                    listener.wrapper,
                    supportsPassive ? options : false
                  );
                };
                _remove = function remove(target, name, listener, options) {
                  if (options === void 0) {
                    options = false;
                  }
                  target.removeEventListener(
                    name,

                    listener.wrapper,
                    supportsPassive ? options : false
                  );
                };
              } else if (window.attachEvent) {
                _add = function add(target, name, listener, _options) {
                  if (_options === void 0) {
                    _options = false;
                  }

                  listener.wrapper = require("wrapFunction")(
                    listener,
                    "entry",
                    "DOMEventListener.add " + name
                  );

                  target.attachEvent ||
                    invariant(0, "`target` has no `attachEvent` method.");
                  target.attachEvent("on" + name, listener.wrapper);
                };
                _remove = function remove(target, name, listener, _options) {
                  if (_options === void 0) {
                    _options = false;
                  }
                  target.detachEvent ||
                    invariant(0, "`target` has no `detachEvent` method.");

                  target.detachEvent("on" + name, listener.wrapper);
                };
              } else {
                _remove = _add = require("emptyFunction");
              }

              var DOMEventListener = {
                add: function add(target, name, listener, options) {
                  if (options === void 0) {
                    options = false;
                  }
                  _add(target, name, listener, options);
                  return {
                    remove: function remove() {
                      _remove(target, name, listener, options);
                    }
                  };
                },

                remove: _remove
              };

              module.exports = DOMEventListener;
            },
            null
          );
          __d(
            "JSONRPC",
            ["Log"],
            function $module_JSONRPC(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var JSONRPC = (function() {
                "use strict";
                function JSONRPC(write) {
                  var _this = this;
                  this.$JSONRPC_counter = 0;
                  this.$JSONRPC_callbacks = {};

                  this.remote = function(context) {
                    _this.$JSONRPC_context = context;
                    return _this.remote;
                  };

                  this.local = {};

                  this.$JSONRPC_write = write;
                }
                var _proto = JSONRPC.prototype;
                _proto.stub = function stub(_stub) {
                  var _this2 = this;
                  this.remote[_stub] = function() {
                    var message = {
                      jsonrpc: "2.0",
                      method: _stub
                    };
                    for (
                      var _len = arguments.length,
                        args = new Array(_len),
                        _key = 0;
                      _key < _len;
                      _key++
                    ) {
                      args[_key] = arguments[_key];
                    }

                    if (typeof args[args.length - 1] === "function") {
                      message.id = ++_this2.$JSONRPC_counter;
                      _this2.$JSONRPC_callbacks[message.id] = args.pop();
                    }

                    message.params = args;

                    _this2.$JSONRPC_write(
                      ES("JSON", "stringify", false, message),
                      _this2.$JSONRPC_context || { method: _stub }
                    );
                  };
                };
                _proto.read = function read(message, context) {
                  var rpc = ES("JSON", "parse", false, message),
                    id = rpc.id;

                  if (!rpc.method) {
                    if (!this.$JSONRPC_callbacks[id]) {
                      require("Log").warn("Could not find callback %s", id);
                      return;
                    }
                    var callback = this.$JSONRPC_callbacks[id];
                    delete this.$JSONRPC_callbacks[id];

                    delete rpc.id;
                    delete rpc.jsonrpc;

                    callback(rpc);
                    return;
                  }

                  var instance = this,
                    method = this.local[rpc.method],
                    send;
                  if (id) {
                    send = function send(type, value) {
                      var response = {
                        jsonrpc: "2.0",
                        id: id
                      };

                      response[type] = value;

                      window.setTimeout(function window_setTimeout_$0() {
                        instance.$JSONRPC_write(
                          ES("JSON", "stringify", false, response),
                          context
                        );
                      }, 0);
                    };
                  } else {
                    send = function send() {};
                  }

                  if (!method) {
                    require("Log").error(
                      'Method "%s" has not been defined',
                      rpc.method
                    );

                    send("error", {
                      code: -32601,
                      message: "Method not found",
                      data: rpc.method
                    });

                    return;
                  }

                  rpc.params.push(ES(send, "bind", true, null, "result"));
                  rpc.params.push(ES(send, "bind", true, null, "error"));

                  try {
                    var returnValue = method.apply(context || null, rpc.params);

                    if (typeof returnValue !== "undefined") {
                      send("result", returnValue);
                    }
                  } catch (rpcEx) {
                    require("Log").error(
                      "Invokation of RPC method %s resulted in the error: %s",
                      rpc.method,
                      rpcEx.message
                    );

                    send("error", {
                      code: -32603,
                      message: "Internal error",
                      data: rpcEx.message
                    });
                  }
                };
                return JSONRPC;
              })();

              module.exports = JSONRPC;
            },
            null
          );
          __d(
            "Queue",
            [],
            function $module_Queue(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var registry = {};
              var Queue = (function() {
                function Queue(opts) {
                  this._timeout = null;

                  this._interval = (opts == null ? void 0 : opts.interval) || 0;
                  this._processor = opts == null ? void 0 : opts.processor;

                  this._queue = [];
                  this._stopped = true;
                }
                var _proto = Queue.prototype;
                _proto._dispatch = function _dispatch(force) {
                  var _this = this;
                  if (force === void 0) {
                    force = false;
                  }
                  if (this._stopped || this._queue.length === 0) {
                    return;
                  }

                  var processor = this._processor;
                  if (processor == null) {
                    this._stopped = true;
                    throw new Error("No processor available");
                  }

                  var interval = this._interval;
                  if (interval != null) {
                    processor.call(this, this._queue.shift());
                    this._timeout = setTimeout(function setTimeout_$0() {
                      return _this._dispatch();
                    }, interval);
                  } else {
                    while (this._queue.length) {
                      processor.call(this, this._queue.shift());
                    }
                  }
                };
                _proto.enqueue = function enqueue(message) {
                  if (this._processor && !this._stopped) {
                    this._processor(message);
                  } else {
                    this._queue.push(message);
                  }
                  return this;
                };
                _proto.start = function start(processor) {
                  if (processor) {
                    this._processor = processor;
                  }
                  this._stopped = false;
                  this._dispatch();
                  return this;
                };
                _proto.isStarted = function isStarted() {
                  return !this._stopped;
                };
                _proto.dispatch = function dispatch() {
                  this._dispatch(true);
                };
                _proto.stop = function stop(scheduled) {
                  this._stopped = true;
                  if (scheduled && this._timeout != null) {
                    clearTimeout(this._timeout);
                  }
                  return this;
                };
                _proto.merge = function merge(queue, prepend) {
                  if (prepend) {
                    var _this$_queue;
                    (_this$_queue = this._queue).unshift.apply(
                      _this$_queue,
                      queue._queue
                    );
                  } else {
                    var _this$_queue2;
                    (_this$_queue2 = this._queue).push.apply(
                      _this$_queue2,
                      queue._queue
                    );
                  }
                  queue._queue = [];
                  this._dispatch();
                  return this;
                };
                _proto.getLength = function getLength() {
                  return this._queue.length;
                };
                Queue.get = function get(name, opts) {
                  var queue;
                  if (name in registry) {
                    queue = registry[name];
                  } else {
                    queue = registry[name] = new Queue(opts);
                  }
                  return queue;
                };
                Queue.exists = function exists(name) {
                  return name in registry;
                };
                Queue.remove = function remove(name) {
                  return delete registry[name];
                };
                return Queue;
              })();
              module.exports = Queue;
            },
            null
          );
          __d(
            "sdk.RPC",
            ["Assert", "JSONRPC", "Queue"],
            function $module_sdk_RPC(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var outQueue = new (require("Queue"))();
              var jsonrpc = new (require("JSONRPC"))(function(message) {
                outQueue.enqueue(message);
              });

              var RPC = {
                local: jsonrpc.local,
                remote: jsonrpc.remote,
                stub: ES(jsonrpc.stub, "bind", true, jsonrpc),
                setInQueue: function setInQueue(queue) {
                  require("Assert").isInstanceOf(require("Queue"), queue);

                  queue.start(function queue_start_$0(message) {
                    jsonrpc.read(message);
                  });
                },
                getOutQueue: function getOutQueue() {
                  return outQueue;
                }
              };

              module.exports = RPC;
            },
            null
          );
          __d(
            "sdk.Canvas.Environment",
            ["sdk.RPC"],
            function $module_sdk_Canvas_Environment(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function getPageInfo(appCallback) {
                require("sdk.RPC").remote.getPageInfo(
                  function RPC_remote_getPageInfo_$0(response) {
                    appCallback(response.result);
                  }
                );
              }

              function scrollTo(x, y) {
                require("sdk.RPC").remote.scrollTo({ x: x || 0, y: y || 0 });
              }

              require("sdk.RPC").stub("getPageInfo");
              require("sdk.RPC").stub("scrollTo");

              var Environment = {
                getPageInfo: getPageInfo,
                scrollTo: scrollTo
              };

              module.exports = Environment;
            },
            null
          );
          __d(
            "sdk.DialogUtils",
            ["DOMEventListener", "sdk.Content", "sdk.DOM", "sdk.UA"],
            function $module_sdk_DialogUtils(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.isOrientationPotrait = isOrientationPotrait;
              exports.addDoubleClickAction = addDoubleClickAction;
              exports.addIdleDesktopAction = addIdleDesktopAction;
              exports.addMobileOrientationChangeAction = addMobileOrientationChangeAction;
              exports.applyScreenDimensions = applyScreenDimensions;
              exports.setDialogPositionToCenter = setDialogPositionToCenter;
              exports.setDialogPositionToTop = setDialogPositionToTop;
              exports.setupNewDarkOverlay = setupNewDarkOverlay;
              exports.setupNewDialog = setupNewDialog;
              exports.onDialogHideCleanup = onDialogHideCleanup;

              var MAX_HEIGHT_MOBILE = 590;
              var MAX_HEIGHT_DESKTOP = 240;
              var MAX_WIDTH_DESKTOP = 575;

              function isOrientationPotrait() {
                return window.innerWidth < window.innerHeight;
              }

              function addDoubleClickAction(
                element,
                actionCallback,
                delayBetweenClicks
              ) {
                var clickTimer = null;
                return require("DOMEventListener").add(
                  element,
                  "click",
                  function DOMEventListener_add_$2() {
                    if (clickTimer !== null) {
                      window.clearTimeout(clickTimer);
                      clickTimer = null;
                      actionCallback();
                    }
                    clickTimer = window.setTimeout(
                      function window_setTimeout_$0() {
                        clickTimer = null;
                      },
                      delayBetweenClicks
                    );
                  }
                );
              }

              function addIdleDesktopAction(
                element,
                actionCallback,
                delayToIdle
              ) {
                var timer;
                var event;
                var startTimer = function startTimer() {
                  timer = window.setTimeout(actionCallback, delayToIdle);
                };

                startTimer();
                return require("DOMEventListener").add(
                  element,
                  "mouseenter",
                  function DOMEventListener_add_$2() {
                    window.clearTimeout(timer);
                    if (!event) {
                      event = require("DOMEventListener").add(
                        element,
                        "mouseleave",
                        function DOMEventListener_add_$2() {
                          startTimer();
                        }
                      );
                    }
                  }
                );
              }

              function addMobileOrientationChangeAction(actionCallback) {
                if (!require("sdk.UA").mobile()) {
                  return null;
                }

                var event =
                  "onorientationchange" in window
                    ? "orientationchange"
                    : "resize";

                var callback = function callback(e) {
                  return window.setTimeout(function window_setTimeout_$0(e) {
                    return actionCallback(e);
                  }, 50);
                };

                return require("DOMEventListener").add(window, event, callback);
              }

              function applyScreenDimensions(element) {
                if (element == null) {
                  return;
                }
                var view = require("sdk.DOM").getViewportInfo();

                element.style.minHeight = view.height ? view.height + "px" : "";
                element.style.top = view.scrollTop ? view.scrollTop + "px" : "";
              }

              function setDialogPositionToCenter(dialog, isTablet, pageInfo) {
                var _view$scrollLeft,
                  _view$width,
                  _view$height,
                  _view$height2,
                  _view$height3,
                  _view$scrollTop;
                var parseNumber = function parseNumber(n) {
                  return typeof n === "number" ? n : parseInt(n, 10);
                };
                var view = require("sdk.DOM").getViewportInfo();
                var width = parseNumber(dialog.offsetWidth);
                var height = parseNumber(dialog.offsetHeight);
                var left =
                  (_view$scrollLeft = view.scrollLeft) != null
                    ? _view$scrollLeft
                    : 0 +
                      ((_view$width = view.width) != null
                        ? _view$width
                        : MAX_WIDTH_DESKTOP - width) /
                        2;

                var minTop =
                  ((_view$height = view.height) != null
                    ? _view$height
                    : MAX_HEIGHT_DESKTOP - height) / 2.5;
                if (left < minTop) {
                  minTop = left;
                }
                var maxTop =
                  (_view$height2 = view.height) != null
                    ? _view$height2
                    : MAX_HEIGHT_DESKTOP - height - minTop;

                var top =
                  ((_view$height3 = view.height) != null
                    ? _view$height3
                    : MAX_HEIGHT_DESKTOP - height) / 2;
                if (pageInfo) {
                  top =
                    pageInfo.scrollTop -
                    pageInfo.offsetTop +
                    (pageInfo.clientHeight - height) / 2;
                }

                if (top < minTop) {
                  top = minTop;
                } else if (top > maxTop) {
                  top = maxTop;
                }

                top +=
                  (_view$scrollTop = view.scrollTop) != null
                    ? _view$scrollTop
                    : 0;

                if (require("sdk.UA").mobile()) {
                  var paddingHeight = 100;

                  if (isTablet) {
                    var _view$height4;
                    paddingHeight +=
                      ((_view$height4 = view.height) != null
                        ? _view$height4
                        : MAX_HEIGHT_MOBILE - height) / 2;
                    require("sdk.DOM").addCss(document.body, "fb_reposition");
                  } else {
                    require("sdk.DOM").addCss(document.body, "fb_hidden");

                    document.body.style.width = "auto";

                    top = 10000;
                  }

                  var paddingDivs = require("sdk.DOM").getByClass(
                    "fb_dialog_padding",
                    dialog
                  );
                  if (paddingDivs.length) {
                    paddingDivs[0].style.height = paddingHeight + "px";
                  }
                }

                dialog.style.left = (left > 0 ? left : 0) + "px";
                dialog.style.top = (top > 0 ? top : 0) + "px";
              }

              function setDialogPositionToTop(dialog, isTablet, pageInfo) {
                var _view$scrollTop2, _view$height5;

                this.setDialogPositionToCenter(dialog, isTablet, pageInfo);

                var view = require("sdk.DOM").getViewportInfo();
                var top =
                  (_view$scrollTop2 = view.scrollTop) != null
                    ? _view$scrollTop2
                    : 0 +
                      ((_view$height5 = view.height) != null
                        ? _view$height5
                        : MAX_HEIGHT_MOBILE - dialog.offsetHeight) *
                        0.05;
                require("sdk.DOM").setStyle(dialog, "top", top + "px");
              }

              function setupNewDarkOverlay() {
                var overlay = document.createElement("div");

                overlay.setAttribute("id", "fb_dialog_ipad_overlay");

                this.applyScreenDimensions(overlay);
                return overlay;
              }

              function setupNewDialog(options) {
                options = options || {};
                var dialogElement = document.createElement("div");
                var _options = options,
                  onClose = _options.onClose;

                if (options.closeIcon && onClose) {
                  var closeIcon = document.createElement("a");
                  closeIcon.className = "fb_dialog_close_icon";
                  require("DOMEventListener").add(closeIcon, "click", onClose);
                  dialogElement.appendChild(closeIcon);
                }

                var className = "fb_dialog";
                className += " " + (options.classes || "");
                className += require("sdk.UA").mobile()
                  ? " fb_dialog_mobile"
                  : " fb_dialog_advanced";
                dialogElement.className = className;

                if (options.width) {
                  var width = parseInt(options.width, 10);
                  if (!isNaN(width)) {
                    dialogElement.style.width = width + "px";
                  }
                }

                var contentRoot = document.createElement("div");

                if (options.content) {
                  require("sdk.Content").append(options.content, contentRoot);
                }
                contentRoot.className = "fb_dialog_content";
                dialogElement.appendChild(contentRoot);

                if (require("sdk.UA").mobile()) {
                  var padding = document.createElement("div");
                  padding.className = "fb_dialog_padding";
                  dialogElement.appendChild(padding);
                }

                return {
                  dialogElement: dialogElement,
                  contentRoot: contentRoot
                };
              }

              function onDialogHideCleanup(isTablet) {
                var body = document.body;
                if (isTablet) {
                  require("sdk.DOM").removeCss(body, "fb_reposition");
                } else {
                  require("sdk.DOM").removeCss(body, "fb_hidden");
                }
              }
            },
            null
          );
          __d(
            "sdk.fbt",
            [],
            function $module_sdk_fbt(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var fbt = function fbt() {};

              fbt._ = function(table) {
                if (__DEV__) {
                  if (arguments.length > 1) {
                    var e = new Error("You are not using a simple string");
                    e.stack;
                    throw e;
                  }
                  if (Array.isArray(table)) {
                    var _e = Error(
                      "Translation table type [PatternString, PatternHash] not supported: " +
                        table.toString()
                    );

                    _e.stack;
                    throw _e;
                  }
                }
                var result = typeof table === "string" ? table : table[0];
                if (result == null) {
                  if (
                    typeof table === "object" &&
                    table !== null &&
                    !Array.isArray(table) &&
                    "*" in table
                  ) {
                    result = table["*"];
                  }
                }
                return result;
              };
              var _default = fbt;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.Dialog",
            [
              "DOMEventListener",
              "ObservableMixin",
              "Type",
              "sdk.Canvas.Environment",
              "sdk.Content",
              "sdk.DOM",
              "sdk.DialogUtils",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.fbt"
            ],
            function $module_sdk_Dialog(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var MARGIN_SURROUNDING = 30;

              var MAX_HEIGHT_MOBILE = 590;
              var MAX_WIDTH_MOBILE = 500;
              var MAX_HEIGHT_DESKTOP = 240;
              var MAX_WIDTH_DESKTOP = 575;

              function getMobileSize() {
                var info = require("sdk.DOM").getViewportInfo();
                var height = info.height;
                var width = info.width;
                if (height != null && width != null) {
                  return {
                    width: Math.min(width, MAX_WIDTH_MOBILE),
                    height: Math.min(height, MAX_HEIGHT_MOBILE)
                  };
                }
                return null;
              }

              var SdkDialogImpl = require("Type").extend(
                {
                  constructor: function SdkDialogImpl(id, display) {
                    this.parent();
                    this.id = id;
                    this.display = display;

                    this._e2e = {};

                    if (!Dialog._dialogs) {
                      Dialog._dialogs = {};
                      Dialog._addOrientationHandler();
                    }
                    Dialog._dialogs[id] = this;
                    this.trackEvent("init");
                  },

                  trackEvent: function trackEvent(name, time) {
                    if (this._e2e[name]) {
                      return this;
                    }
                    this._e2e[name] = time || Date.now();
                    if (name == "close") {
                      this.inform("e2e:end", this._e2e);
                    }
                    return this;
                  },

                  trackEvents: function trackEvents(events) {
                    if (typeof events === "string") {
                      events = ES("JSON", "parse", false, events);
                    }
                    for (var key in events) {
                      if (Object.prototype.hasOwnProperty.call(events, key)) {
                        this.trackEvent(key, events[key]);
                      }
                    }
                    return this;
                  }
                },
                require("ObservableMixin")
              );

              var Dialog = {
                newInstance: function newInstance(id, display) {
                  return new SdkDialogImpl(id, display);
                },

                _dialogs: null,
                _lastYOffset: 0,
                _availScreenWidth: null,
                _overlayListeners: [],

                _loaderEl: null,

                _overlayEl: null,

                _stack: [],

                _active: null,

                get: function get(id) {
                  return Dialog._dialogs[id];
                },

                _findRoot: function _findRoot(startNode) {
                  var node = startNode;
                  while (node) {
                    if (require("sdk.DOM").containsCss(node, "fb_dialog")) {
                      return node;
                    }
                    if (node.parentElement instanceof HTMLElement) {
                      node = node.parentElement;
                    }
                  }
                },

                _createWWWLoader: function _createWWWLoader(width) {
                  width = width ? width : "460";

                  var content = document.createElement("div");
                  content.innerHTML =
                    '<div class="dialog_title">' +
                    '  <a id="fb_dialog_loader_close">' +
                    '    <div class="fb_dialog_close_icon"></div>' +
                    "  </a>" +
                    "  <span>Facebook</span>" +
                    '  <div style="clear:both;"></div>' +
                    "</div>" +
                    '<div class="dialog_content"></div>' +
                    '<div class="dialog_footer"></div>';

                  return Dialog.create({
                    content: content,
                    width: width
                  });
                },

                _createMobileLoader: function _createMobileLoader() {
                  var content = document.createElement("div");
                  if (require("sdk.UA").nativeApp()) {
                    content.innerHTML = '<div class="dialog_header"></div>';
                  } else if (Dialog.isTabletStyle()) {
                    content.innerHTML =
                      '<div class="overlayLoader">' +
                      '<div id="fb_dialog_loader_spinner"></div>' +
                      '<a id="fb_dialog_loader_close" href="#">' +
                      require("sdk.fbt")._("Cancel") +
                      "</a>" +
                      "</div>";
                  } else {
                    content.innerHTML =
                      '<div class="dialog_header">' +
                      "<table>" +
                      "  <tbody>" +
                      "    <tr>" +
                      '      <td class="header_left">' +
                      '        <label class="touchable_button">' +
                      '          <input type="submit" value="' +
                      require("sdk.fbt")._("Cancel") +
                      '"' +
                      '            id="fb_dialog_loader_close"/>' +
                      "        </label>" +
                      "      </td>" +
                      '      <td class="header_center">' +
                      "        <div>" +
                      "         " +
                      require("sdk.fbt")._("Loading...") +
                      "        </div>" +
                      "      </td>" +
                      '      <td class="header_right">' +
                      "      </td>" +
                      "    </tr>" +
                      "  </tbody>" +
                      "</table>" +
                      "</div>";
                  }
                  return Dialog.create({
                    classes:
                      "loading" + (Dialog.isTabletStyle() ? " centered" : ""),
                    content: content
                  });
                },

                _setDialogOverlayStyle: function _setDialogOverlayStyle() {
                  if (Dialog._overlayEl != null) {
                    require("sdk.DialogUtils").applyScreenDimensions(
                      Dialog._overlayEl
                    );
                  }
                },

                _showTabletOverlay: function _showTabletOverlay(
                  _onClickForClose
                ) {
                  if (!Dialog.isTabletStyle()) {
                    return;
                  }
                  if (Dialog._overlayEl == null) {
                    var newOverlay = require("sdk.DialogUtils").setupNewDarkOverlay();
                    newOverlay.className = "";
                    Dialog._overlayEl = newOverlay;
                    require("sdk.Content").append(Dialog._overlayEl, null);
                  } else {
                    Dialog._overlayEl.className = "";
                  }
                },

                _hideTabletOverlay: function _hideTabletOverlay() {
                  if (Dialog.isTabletStyle()) {
                    if (Dialog._overlayEl != null) {
                      Dialog._overlayEl.className = "hidden";
                    }
                    Dialog._overlayListeners.forEach(
                      function Dialog__overlayListeners_forEach_$0(listener) {
                        return listener.remove();
                      }
                    );
                    Dialog._overlayListeners = [];
                  }
                },

                showLoader: function showLoader(cb, width) {
                  if (!cb) {
                    cb = function cb() {};
                  }

                  var onClick = function onClick() {
                    Dialog._hideLoader();
                    require("sdk.DialogUtils").onDialogHideCleanup(
                      Dialog.isTabletStyle()
                    );
                    Dialog._hideTabletOverlay();
                    if (cb != null) {
                      cb();
                    }
                  };

                  Dialog._showTabletOverlay(onClick);

                  if (!Dialog._loaderEl) {
                    Dialog._loaderEl = Dialog._findRoot(
                      require("sdk.UA").mobile()
                        ? Dialog._createMobileLoader()
                        : Dialog._createWWWLoader(width)
                    );
                  }

                  var loaderClose = document.getElementById(
                    "fb_dialog_loader_close"
                  );

                  if (loaderClose) {
                    require("sdk.DOM").removeCss(loaderClose, "fb_hidden");
                    var listener = require("DOMEventListener").add(
                      loaderClose,
                      "click",
                      onClick
                    );
                    Dialog._overlayListeners.push(listener);
                  }

                  if (Dialog._loaderEl != null) {
                    Dialog._makeActive(Dialog._loaderEl);
                  }
                },

                _hideLoader: function _hideLoader() {
                  if (Dialog._loaderEl && Dialog._loaderEl == Dialog._active) {
                    Dialog._loaderEl.style.top = "-10000px";
                  }
                },

                _makeActive: function _makeActive(el) {
                  Dialog._setDialogSizes();
                  Dialog._lowerActive();
                  Dialog._active = el;
                  if (
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    )
                  ) {
                    require("sdk.Canvas.Environment").getPageInfo(
                      function CanvasEnvironment_getPageInfo_$0(pageInfo) {
                        Dialog._centerActive(pageInfo);
                      }
                    );
                  }
                  Dialog._centerActive();
                },

                _lowerActive: function _lowerActive() {
                  if (!Dialog._active) {
                    return;
                  }
                  Dialog._active.style.top = "-10000px";
                  Dialog._active = null;
                },

                _removeStacked: function _removeStacked(dialog) {
                  Dialog._stack = Dialog._stack.filter(
                    function Dialog__stack_filter_$0(node) {
                      return node != dialog;
                    }
                  );
                },

                _centerActive: function _centerActive(pageInfo) {
                  var dialog = Dialog._active;
                  if (!dialog) {
                    return;
                  }

                  require("sdk.DialogUtils").setDialogPositionToCenter(
                    dialog,
                    Dialog.isTabletStyle(),
                    pageInfo
                  );
                },

                _setDialogSizes: function _setDialogSizes(skipHeight) {
                  if (skipHeight === void 0) {
                    skipHeight = false;
                  }
                  if (!require("sdk.UA").mobile()) {
                    return;
                  }
                  for (var id in Dialog._dialogs) {
                    if (
                      Object.prototype.hasOwnProperty.call(Dialog._dialogs, id)
                    ) {
                      var iframe = document.getElementById(id);
                      if (iframe) {
                        iframe.style.width =
                          Dialog.getDefaultSize().width + "px";
                        if (!skipHeight) {
                          iframe.style.height =
                            Dialog.getDefaultSize().height + "px";
                        }
                      }
                    }
                  }
                },

                getDefaultSize: function getDefaultSize() {
                  if (require("sdk.UA").mobile()) {
                    var size = getMobileSize();
                    if (size) {
                      var _ref,
                        _DOM$getViewportInfo,
                        _ref3,
                        _DOM$getViewportInfo3;
                      if (
                        (_ref =
                          (_DOM$getViewportInfo = require("sdk.DOM").getViewportInfo()) ==
                          null
                            ? void 0
                            : _DOM$getViewportInfo.width) != null
                          ? _ref
                          : MAX_WIDTH_MOBILE <= size.width
                      ) {
                        var _ref2, _DOM$getViewportInfo2;
                        size.width =
                          (_ref2 =
                            (_DOM$getViewportInfo2 = require("sdk.DOM").getViewportInfo()) ==
                            null
                              ? void 0
                              : _DOM$getViewportInfo2.width) != null
                            ? _ref2
                            : MAX_WIDTH_MOBILE - MARGIN_SURROUNDING;
                      }
                      if (
                        (_ref3 =
                          (_DOM$getViewportInfo3 = require("sdk.DOM").getViewportInfo()) ==
                          null
                            ? void 0
                            : _DOM$getViewportInfo3.height) != null
                          ? _ref3
                          : MAX_HEIGHT_MOBILE <= size.height
                      ) {
                        var _ref4, _DOM$getViewportInfo4;
                        size.height =
                          (_ref4 =
                            (_DOM$getViewportInfo4 = require("sdk.DOM").getViewportInfo()) ==
                            null
                              ? void 0
                              : _DOM$getViewportInfo4.height) != null
                            ? _ref4
                            : MAX_HEIGHT_MOBILE - MARGIN_SURROUNDING;
                      }
                      return size;
                    }

                    if (require("sdk.UA").ipad()) {
                      return {
                        width: MAX_WIDTH_MOBILE,
                        height: MAX_HEIGHT_MOBILE
                      };
                    }

                    if (require("sdk.UA").android()) {
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
                        height: Math.max(
                          height,
                          isLandscape ? screen.width : screen.height
                        )
                      };
                    }
                  }
                  return {
                    width: MAX_WIDTH_DESKTOP,
                    height: MAX_HEIGHT_DESKTOP
                  };
                },

                _handleOrientationChange: function _handleOrientationChange() {
                  var _ref5, _DOM$getViewportInfo5;
                  Dialog._availScreenWidth =
                    (_ref5 =
                      (_DOM$getViewportInfo5 = require("sdk.DOM").getViewportInfo()) ==
                      null
                        ? void 0
                        : _DOM$getViewportInfo5.width) != null
                      ? _ref5
                      : MAX_WIDTH_MOBILE;

                  if (Dialog.isTabletStyle()) {
                    Dialog._setDialogSizes(true);
                    Dialog._centerActive();
                    Dialog._setDialogOverlayStyle();
                  } else {
                    var width = Dialog.getDefaultSize().width;
                    for (var id in Dialog._dialogs) {
                      if (
                        Object.prototype.hasOwnProperty.call(
                          Dialog._dialogs,
                          id
                        )
                      ) {
                        var iframe = document.getElementById(id);
                        if (iframe) {
                          iframe.style.width = width + "px";
                        }
                      }
                    }
                  }
                },

                _addOrientationHandler: function _addOrientationHandler() {
                  var _ref6, _DOM$getViewportInfo6;
                  if (!require("sdk.UA").mobile()) {
                    return;
                  }
                  Dialog._availScreenWidth =
                    (_ref6 =
                      (_DOM$getViewportInfo6 = require("sdk.DOM").getViewportInfo()) ==
                      null
                        ? void 0
                        : _DOM$getViewportInfo6.width) != null
                      ? _ref6
                      : MAX_WIDTH_MOBILE;
                  require("sdk.DialogUtils").addMobileOrientationChangeAction(
                    Dialog._handleOrientationChange
                  );
                },

                create: function create(opts) {
                  var created = require("sdk.DialogUtils").setupNewDialog(opts);
                  require("sdk.Content").append(created.dialogElement);
                  if (opts.visible) {
                    Dialog.show(created.dialogElement);
                  }
                  if (typeof opts.styles === "object") {
                    ES(
                      "Object",
                      "assign",
                      false,
                      created.dialogElement.style,
                      opts.styles
                    );
                  }
                  return created.contentRoot;
                },

                show: function show(dialog) {
                  var root = Dialog._findRoot(dialog);
                  if (root != null) {
                    Dialog._removeStacked(root);
                    Dialog._hideLoader();
                    Dialog._makeActive(root);
                    Dialog._stack.push(root);
                    if ("fbCallID" in dialog) {
                      Dialog.get(dialog.fbCallID)
                        .inform("iframe_show")
                        .trackEvent("show");
                    }
                  }
                },

                hide: function hide(dialog) {
                  var root = Dialog._findRoot(dialog);
                  Dialog._hideLoader();
                  if (root == Dialog._active) {
                    Dialog._lowerActive();
                    require("sdk.DialogUtils").onDialogHideCleanup(
                      Dialog.isTabletStyle()
                    );
                    Dialog._hideTabletOverlay();
                    if ("fbCallID" in dialog) {
                      Dialog.get(dialog.fbCallID)
                        .inform("iframe_hide")
                        .trackEvent("hide");
                    }
                  }
                },

                remove: function remove(childElement) {
                  var dialog = Dialog._findRoot(childElement);
                  if (dialog) {
                    var is_active = Dialog._active == dialog;
                    Dialog._removeStacked(dialog);
                    if (is_active) {
                      Dialog._hideLoader();
                      if (Dialog._stack.length > 0) {
                        Dialog.show(Dialog._stack.pop());
                      } else {
                        Dialog._lowerActive();
                        require("sdk.DialogUtils").onDialogHideCleanup(
                          Dialog.isTabletStyle()
                        );
                        Dialog._hideTabletOverlay();
                      }
                    } else if (
                      Dialog._active === null &&
                      Dialog._stack.length > 0
                    ) {
                      Dialog.show(Dialog._stack.pop());
                    }

                    window.setTimeout(function window_setTimeout_$0() {
                      var _dialog$parentNode;
                      (_dialog$parentNode = dialog.parentNode) == null
                        ? void 0
                        : _dialog$parentNode.removeChild(dialog);
                    }, 3000);
                  }
                },

                isActive: function isActive(node) {
                  var root = Dialog._findRoot(node);
                  return root != null && root === Dialog._active;
                },

                isTabletStyle: function isTabletStyle() {
                  if (!require("sdk.UA").mobile()) {
                    return false;
                  }
                  var size = getMobileSize();
                  return (
                    size != null &&
                    (size.height >= MAX_HEIGHT_MOBILE ||
                      size.width >= MAX_WIDTH_MOBILE)
                  );
                }
              };
              var _default = Dialog;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.Event",
            [],
            function $module_sdk_Event(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.subscribers = subscribers;
              exports.subscribe = subscribe;
              exports.unsubscribe = unsubscribe;
              exports.monitor = monitor;
              exports.clear = clear;
              exports.fire = fire;

              var SUBSCRIBE = "event.subscribe";
              exports.SUBSCRIBE = SUBSCRIBE;

              var UNSUBSCRIBE = "event.unsubscribe";
              exports.UNSUBSCRIBE = UNSUBSCRIBE;

              function subscribers() {
                if (!this._subscribersMap) {
                  this._subscribersMap = {};
                }

                return this._subscribersMap;
              }

              function subscribe(name, cb) {
                var subs = this.subscribers();

                if (!subs[name]) {
                  subs[name] = [cb];
                } else {
                  if (subs[name].indexOf(cb) == -1) {
                    subs[name].push(cb);
                  }
                }

                if (name != this.SUBSCRIBE && name != this.UNSUBSCRIBE) {
                  this.fire(this.SUBSCRIBE, name, subs[name]);
                }
              }

              function unsubscribe(name, cb) {
                var subs = this.subscribers()[name];
                if (subs) {
                  subs.forEach(function subs_forEach_$0(value, key) {
                    if (value === cb) {
                      subs.splice(key, 1);
                    }
                  });
                }

                if (name != this.SUBSCRIBE && name != this.UNSUBSCRIBE) {
                  this.fire(this.UNSUBSCRIBE, name, subs);
                }
              }

              function monitor(name, callback) {
                if (!callback()) {
                  var ctx = this;
                  var fn = function fn() {
                    if (callback.apply(callback, arguments)) {
                      ctx.unsubscribe(name, fn);
                    }
                  };

                  this.subscribe(name, fn);
                }
              }

              function clear(name) {
                delete this.subscribers()[name];
              }

              function fire(name) {
                for (
                  var _len = arguments.length,
                    args = new Array(_len > 1 ? _len - 1 : 0),
                    _key = 1;
                  _key < _len;
                  _key++
                ) {
                  args[_key - 1] = arguments[_key];
                }

                var subs = this.subscribers()[name];

                if (subs) {
                  subs.forEach(function subs_forEach_$0(sub) {
                    if (sub) {
                      sub.apply(this, args);
                    }
                  });
                }
              }
            },
            null
          );
          __d(
            "sdk.Frictionless",
            ["sdk.Auth", "sdk.Dialog", "sdk.Event", "sdk.api"],
            function $module_sdk_Frictionless(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var Frictionless = {
                _allowedRecipients: {},

                _useFrictionless: false,

                _updateRecipients: function _updateRecipients() {
                  Frictionless._allowedRecipients = {};
                  require("sdk.api")(
                    "/me/apprequestformerrecipients",
                    function api_$1(response) {
                      if (!response || response.error) {
                        return;
                      }
                      response.data.forEach(function response_data_forEach_$0(
                        recipient
                      ) {
                        Frictionless._allowedRecipients[
                          recipient.recipient_id
                        ] = true;
                      });
                    }
                  );
                },

                init: function init() {
                  Frictionless._useFrictionless = true;
                  require("sdk.Auth").getLoginStatus(
                    function Auth_getLoginStatus_$0(response) {
                      if (response.status == "connected") {
                        Frictionless._updateRecipients();
                      }
                    }
                  );
                  require("sdk.Event").subscribe(
                    "auth.login",
                    function Event_subscribe_$1(login) {
                      if (login.authResponse) {
                        Frictionless._updateRecipients();
                      }
                    }
                  );
                },

                _processRequestResponse: function _processRequestResponse(
                  cb,
                  hidden
                ) {
                  return function(params) {
                    var updated = params && params.updated_frictionless;
                    if (Frictionless._useFrictionless && updated) {
                      Frictionless._updateRecipients();
                    }

                    if (params) {
                      if (!hidden && params.frictionless) {
                        require("sdk.Dialog")._hideLoader();
                        require("sdk.Dialog")._restoreBodyPosition();
                        require("sdk.Dialog")._hideIPadOverlay();
                      }
                      delete params.frictionless;
                      delete params.updated_frictionless;
                    }

                    cb && cb(params);
                  };
                },

                isAllowed: function isAllowed(user_ids) {
                  if (!user_ids) {
                    return false;
                  }

                  if (typeof user_ids === "number") {
                    return user_ids in Frictionless._allowedRecipients;
                  }
                  if (typeof user_ids === "string") {
                    user_ids = user_ids.split(",");
                  }
                  user_ids = user_ids.map(function user_ids_map_$0(s) {
                    return String(s).trim();
                  });

                  var allowed = true;
                  var has_user_ids = false;
                  user_ids.forEach(function user_ids_forEach_$0(user_id) {
                    allowed =
                      allowed && user_id in Frictionless._allowedRecipients;
                    has_user_ids = true;
                  });
                  return allowed && has_user_ids;
                }
              };

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  if (options.frictionlessRequests) {
                    Frictionless.init();
                  }
                }
              );

              module.exports = Frictionless;
            },
            null
          );
          __d(
            "resolveURI",
            [],
            function $module_resolveURI(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = resolveURI;

              function resolveURI(uri) {
                if (uri == null || uri === "") {
                  return window.location.href;
                }

                var a = document.createElement("a");
                a.href = uri;
                return a.href;
              }
            },
            null
          );
          __d(
            "sdk.NativeExtensions",
            ["DOMEventListener", "Log", "sdk.UA"],
            function $module_sdk_NativeExtensions(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.onReady = onReady;

              var NATIVE_EXTENSIONS_READY_EVENT = "fbNativeExtensionsReady";

              function getAPIBridge() {
                if (
                  window._FBSdkExtensions &&
                  window._FBSdkExtensions.jsonRPC &&
                  window._FBSdkExtensions.initializeCallbackHandler &&
                  window._FBSdkExtensions.supportsDialog
                ) {
                  return window._FBSdkExtensions;
                }
                return null;
              }

              function onReady(func) {
                if (!require("sdk.UA").facebookInAppBrowser()) {
                  require("Log").error(
                    "FB.NativeExtensions.onReady only works when the page is rendered " +
                      "in a WebView of the native Facebook app."
                  );

                  return;
                }

                var extensionAPIBridge = getAPIBridge();
                if (extensionAPIBridge) {
                  func(extensionAPIBridge);
                  return;
                }

                var bridgeCalled = false;
                var nativeExtensionsReadyCallback = function nativeExtensionsReadyCallback() {
                  var bridge = getAPIBridge();
                  if (bridgeCalled || !bridge) {
                    return;
                  }
                  bridgeCalled = true;
                  func(bridge);
                  require("DOMEventListener").remove(
                    window,
                    NATIVE_EXTENSIONS_READY_EVENT,
                    nativeExtensionsReadyCallback
                  );
                };

                require("DOMEventListener").add(
                  window,
                  NATIVE_EXTENSIONS_READY_EVENT,
                  nativeExtensionsReadyCallback
                );
              }
            },
            null
          );
          __d(
            "sdk.Extensions",
            ["JSONRPC", "Queue", "sdk.NativeExtensions", "sdk.UA"],
            function $module_sdk_Extensions(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.supportsDialog = supportsDialog;

              var outQueue = new (require("Queue"))();
              var jsonrpc = new (require("JSONRPC"))(function(message) {
                outQueue.enqueue(message);
              });

              var rpcQueue = new (require("Queue"))();
              rpcQueue.start(function rpcQueue_start_$0(message) {
                jsonrpc.read(message);
              });

              var extensionAPIBridge = null;

              if (require("sdk.UA").facebookInAppBrowser()) {
                require("sdk.NativeExtensions").onReady(
                  function NativeExtensions_onReady_$0(bridge) {
                    extensionAPIBridge = bridge;

                    window._FBBrowserCallbackHandler = function(message) {
                      rpcQueue.enqueue(ES("JSON", "stringify", false, message));
                    };

                    bridge.initializeCallbackHandler(
                      ES("JSON", "stringify", false, {
                        name: "_FBBrowserCallbackHandler"
                      })
                    );

                    outQueue.start(function outQueue_start_$0(message) {
                      bridge.jsonRPC(message);
                    });
                  }
                );
              }

              var local = jsonrpc.local;
              exports.local = local;
              var remote = jsonrpc.remote;
              exports.remote = remote;
              var stub = ES(jsonrpc.stub, "bind", true, jsonrpc);
              exports.stub = stub;
              function supportsDialog(method) {
                return (
                  !!extensionAPIBridge &&
                  extensionAPIBridge.supportsDialog(method)
                );
              }
            },
            null
          );
          __d(
            "sdk.Native",
            ["Log", "sdk.UA"],
            function $module_sdk_Native(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var NATIVE_READY_EVENT = "fbNativeReady";

              var Native = {
                onready: function onready(func) {
                  if (!require("sdk.UA").nativeApp()) {
                    require("Log").error(
                      "FB.Native.onready only works when the page is rendered " +
                        "in a WebView of the native Facebook app. Test if this is the " +
                        "case calling FB.UA.nativeApp()"
                    );

                    return;
                  }

                  if (window.__fbNative && !this.nativeReady) {
                    ES("Object", "assign", false, this, window.__fbNative);
                  }

                  if (this.nativeReady) {
                    func();
                  } else {
                    var nativeReadyCallback = function nativeReadyCallback() {
                      window.removeEventListener(
                        NATIVE_READY_EVENT,
                        nativeReadyCallback
                      );
                      this.onready(func);
                    };
                    window.addEventListener(
                      NATIVE_READY_EVENT,
                      nativeReadyCallback,
                      false
                    );
                  }
                }
              };
              var _default = Native;
              module.exports = _default;
            },
            null
          );
          __d(
            "isFacebookURI",
            [],
            function $module_isFacebookURI(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = isFacebookURI;

              var facebookURIRegex = null;

              var FB_PROTOCOLS = ["http", "https"];

              function isFacebookURI(uri) {
                if (!facebookURIRegex) {
                  facebookURIRegex = new RegExp("(^|\\.)facebook\\.com$", "i");
                }

                if (uri.isEmpty() && uri.toString() !== "#") {
                  return false;
                }

                if (!uri.getDomain() && !uri.getProtocol()) {
                  return true;
                }

                return (
                  FB_PROTOCOLS.indexOf(uri.getProtocol()) !== -1 &&
                  facebookURIRegex.test(uri.getDomain())
                );
              }

              isFacebookURI.setRegex = function(regex) {
                facebookURIRegex = regex;
              };
            },
            null
          );
          __d(
            "resolveWindow",
            [],
            function $module_resolveWindow(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = resolveWindow;

              function resolveWindow(path) {
                if (path == null) {
                  return null;
                }

                var node = window;
                var parts = path.split(".");

                try {
                  for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];

                    var matches = /^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(
                      part
                    );

                    if (matches) {
                      node = node.frames[matches[1]];
                    } else if (
                      part === "opener" ||
                      part === "parent" ||
                      part === "top"
                    ) {
                      node = node[part];
                    } else {
                      return null;
                    }
                  }
                } catch (_unused) {
                  return null;
                }

                return node;
              }
            },
            null
          );
          __d(
            "sdk.XD",
            [
              "JSSDKXDConfig",
              "Log",
              "QueryString",
              "Queue",
              "UrlMap",
              "guid",
              "isFacebookURI",
              "resolveWindow",
              "sdk.Event",
              "sdk.RPC",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.URI",
              "sdk.feature"
            ],
            function $module_sdk_XD(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var facebookQueue = new (require("Queue"))();

              var messageToFacebookRelation = "parent";
              var xdProxyName = null;

              var facebookRe = /^https:\/\/.*\.facebook\.com$/;

              var xdArbiterTier = require("JSSDKXDConfig").useCdn
                ? "cdn"
                : "www";

              var xdArbiterHttpsUrl =
                require("UrlMap").resolve(xdArbiterTier) +
                require("JSSDKXDConfig").XXdUrl;

              var getOrigin = function getOrigin() {
                if ("origin" in location) {
                  if (location.origin && location.origin != "null") {
                    return location.origin;
                  } else if (window !== window.parent) {
                    try {
                      var parentOrigin = parent.location.origin;
                      if (parentOrigin && parentOrigin != "null") {
                        return parentOrigin;
                      }
                    } catch (_unused) {}
                  }
                }

                return location.protocol + "//" + location.host;
              };

              var channel = require("guid")();
              var origin = getOrigin();
              var inited = false;

              var rpcQueue = new (require("Queue"))();
              require("sdk.RPC").setInQueue(rpcQueue);

              function onRegister(registeredAs) {
                require("Log").info(
                  "Remote XD can talk to facebook.com (%s)",
                  registeredAs
                );
                require("sdk.Runtime").setEnvironment(
                  registeredAs === "canvas"
                    ? require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    : require("sdk.Runtime").ENVIRONMENTS.PAGETAB
                );
              }

              function handleAction(message, senderOrigin) {
                if (!senderOrigin) {
                  require("Log").error("No senderOrigin");
                  throw new Error();
                }

                switch (message.xd_action) {
                  case "plugin_ready":
                    if (typeof message.name === "string") {
                      var pluginName = message.name;
                      require("Log").info(
                        "Plugin %s ready from %s",
                        pluginName,
                        senderOrigin
                      );
                      if (facebookRe.test(senderOrigin)) {
                        var queue = require("Queue").get(pluginName, {});
                        queue.start(function queue_start_$0(message) {
                          if (message == null) {
                            require("Log").warn(
                              "Discarding null message from %s to %s on %s",
                              senderOrigin,
                              pluginName,
                              origin
                            );

                            return;
                          }
                          if (window.frames[pluginName] != null) {
                            window.frames[pluginName].postMessage(
                              {
                                xdArbiterHandleMessage: true,
                                message: message,
                                origin: origin
                              },

                              senderOrigin
                            );
                          } else {
                            require("Log").info(
                              "Message discarded for plugin at window.frames[%s] which may have been removed by a new XFBML.parse() call.",
                              pluginName
                            );
                          }
                        });
                      } else {
                        require("Log").error(
                          "Plugin attempted to register from non-Facebook domain %s",
                          senderOrigin
                        );

                        return;
                      }
                    } else {
                      require("Log").error(
                        "plugin_ready message received without a name"
                      );
                    }
                    break;
                }

                if (
                  message.data != null &&
                  (typeof message.data === "object" ||
                    typeof message.data === "string")
                ) {
                  onMessage(message.data, senderOrigin);
                }
              }

              function onMessage(message, senderOrigin) {
                if (
                  senderOrigin != null &&
                  senderOrigin !== "native" &&
                  !require("isFacebookURI")(
                    new (require("sdk.URI"))(senderOrigin)
                  )
                ) {
                  return;
                }
                if (typeof message === "string") {
                  if (/^FB_RPC:/.test(message)) {
                    rpcQueue.enqueue(message.substring(7));
                    return;
                  }

                  if (message.substring(0, 1) == "{") {
                    try {
                      message = ES("JSON", "parse", false, message);
                    } catch (_unused2) {
                      require("Log").warn(
                        "Failed to decode %s as JSON",
                        message
                      );
                      return;
                    }
                  } else {
                    message = require("QueryString").decode(message);
                  }
                }

                var messageObj = message;
                if (messageObj.xd_action) {
                  handleAction(messageObj, senderOrigin);
                  return;
                }

                if (typeof messageObj.cb === "string") {
                  var cb = XD._callbacks[messageObj.cb];
                  if (!XD._forever[messageObj.cb]) {
                    delete XD._callbacks[messageObj.cb];
                  }
                  if (cb) {
                    cb(messageObj);
                  }
                }
              }

              function sendToFacebook(recipient, message) {
                if (recipient == "facebook") {
                  message.relation = messageToFacebookRelation;
                  facebookQueue.enqueue(message);
                  if (
                    !require("sdk.Runtime").isCanvasEnvironment() &&
                    !facebookQueue.isStarted()
                  ) {
                    tryRegister(xdProxyName);
                  }
                } else {
                  require("Queue")
                    .get(recipient, {})
                    .enqueue(message);
                }
              }

              require("sdk.RPC")
                .getOutQueue()
                .start(function start_$0(message) {
                  facebookQueue.enqueue("FB_RPC:" + message);
                });

              function init(xdProxyName) {
                if (inited) {
                  return;
                }
                inited = true;

                window.addEventListener(
                  "message",
                  function window_addEventListener_$1(event) {
                    var message = event.data;

                    var senderOrigin = event.origin || "native";
                    if (!/^(https?:\/\/|native$)/.test(senderOrigin)) {
                      require("Log").debug(
                        "Received message from invalid origin type: %s",
                        senderOrigin
                      );
                      return;
                    }
                    if (!facebookRe.test(senderOrigin)) {
                      return;
                    }

                    if (typeof message === "string") {
                      onMessage(message, senderOrigin);
                    } else {
                      if (
                        event.source == parent &&
                        event.data.xdArbiterRegisterAck &&
                        facebookRe.test(senderOrigin)
                      ) {
                        if (
                          typeof event.data.xdArbiterRegisterAck === "string" &&
                          event.data.xdArbiterRegisterAck !== ""
                        ) {
                          onRegister(event.data.xdArbiterRegisterAck);
                        }
                        if (!facebookQueue.isStarted()) {
                          facebookQueue.start(function facebookQueue_start_$0(
                            message
                          ) {
                            var _windowRef;
                            if (message == null) {
                              require("Log").warn(
                                "Discarding null message from %s to %s",
                                origin,
                                senderOrigin
                              );

                              return;
                            }

                            var windowRef = parent;
                            if (
                              typeof message === "object" &&
                              typeof message.relation === "string"
                            ) {
                              windowRef = require("resolveWindow")(
                                message.relation
                              );
                            }

                            ((_windowRef = windowRef) != null
                              ? _windowRef
                              : parent
                            ).postMessage(
                              {
                                xdArbiterHandleMessage: true,
                                message: message,
                                origin: origin
                              },

                              senderOrigin
                            );
                          });
                        }

                        return;
                      }
                      require("Log").warn(
                        "Received message of type %s from %s, expected a string. %s",
                        typeof message,
                        origin,
                        ES("JSON", "stringify", false, message)
                      );

                      return;
                    }
                  }
                );

                if (require("sdk.Runtime").isCanvasEnvironment()) {
                  tryRegister(xdProxyName);
                }
              }

              function tryRegister(xdProxyName) {
                var _feature;
                if (!inited) {
                  init();
                }

                if (window.parent != top) {
                  require("Log").warn(
                    "cannot deliver messages to facebook unless window.parent is top and facebook.com."
                  );

                  return;
                }

                var timeout =
                  (_feature = require("sdk.feature")("xd_timeout", 60000)) !=
                  null
                    ? _feature
                    : 60000;
                var retryInterval = 200;
                var intervalId = 0;
                var retries = timeout / retryInterval;

                var registerFunc = function registerFunc() {
                  return parent.postMessage(
                    {
                      xdArbiterRegister: true,
                      xdProxyName: xdProxyName,
                      origin: origin
                    },
                    "*"
                  );
                };

                intervalId = window.setInterval(
                  function window_setInterval_$0() {
                    if (!facebookQueue.isStarted() && retries > 0) {
                      retries--;
                      require("Log").debug("resending xdArbiterRegister");
                      registerFunc();
                    } else {
                      window.clearInterval(intervalId);
                      if (retries === 0) {
                        require("sdk.Scribe").log("jssdk_error", {
                          appId: require("sdk.Runtime").getClientID(),
                          error: "XD_FB_QUEUE_INITIALIZATION",
                          extra: {
                            message: "Failed to initialize in " + timeout + "ms"
                          }
                        });

                        require("Log").error(
                          "xdAbiterRegisterAck not received"
                        );
                        return;
                      }
                    }
                  },
                  retryInterval
                );
              }

              var XD = {
                rpc: require("sdk.RPC"),

                _callbacks: {},
                _forever: {},
                _channel: channel,
                _origin: origin,

                onMessage: onMessage,

                init: init,

                sendToFacebook: sendToFacebook,

                inform: function inform(method, params, relation, behavior) {
                  sendToFacebook("facebook", {
                    method: method,
                    params: ES("JSON", "stringify", false, params || {}),
                    behavior: behavior || "p",
                    relation: relation
                  });
                },

                handler: function handler(cb, relation, forever, id) {
                  var xdArbiterFragment =
                    "#" +
                    require("QueryString").encode({
                      cb: XD.registerCallback(cb, forever, id),
                      origin: origin + "/" + channel,
                      domain: location.hostname,
                      relation: relation || "opener"
                    });

                  return xdArbiterHttpsUrl + xdArbiterFragment;
                },

                registerCallback: function registerCallback(
                  cb,
                  persistent,
                  id
                ) {
                  id = id || require("guid")();
                  if (persistent) {
                    XD._forever[id] = true;
                  }
                  XD._callbacks[id] = cb;
                  return id;
                }
              };

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  xdProxyName = options.xdProxyName;
                  init(options.xdProxyName);
                }
              );

              module.exports = XD;
            },
            null
          );
          __d(
            "sdk.modFeatureCheck",
            ["JSSDKConfig"],
            function $module_sdk_modFeatureCheck(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.forIDs = forIDs;

              function forIDs(name, ids, defaultValue) {
                if (defaultValue === void 0) {
                  defaultValue = false;
                }
                if (
                  require("JSSDKConfig").features &&
                  name in require("JSSDKConfig").features
                ) {
                  var values = require("JSSDKConfig").features[name];
                  if (typeof values === "object" && Array.isArray(values)) {
                    return ids.some(function ids_some_$0(x) {
                      return values.some(function values_some_$0(y) {
                        return x % y === 0;
                      });
                    });
                  }
                }

                return defaultValue;
              }
            },
            null
          );
          __d(
            "sdk.openMessenger",
            ["sdk.UA"],
            function $module_sdk_openMessenger(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              module.exports = openMessenger;

              var FALLBACK_IOS_URL =
                "https://itunes.apple.com/us/app/messenger/id454638411";
              var FALLBACK_ANDROID_URL =
                "https://play.google.com/store/apps/details?id=com.facebook.orca";
              var FALLBACK_TIMEOUT = 3000;

              function openMessenger(params) {
                var uri;
                var fallbackURL;

                var link = params.link;
                var app_id = params.app_id;
                if (require("sdk.UA").android()) {
                  uri =
                    "intent://share/#Intent;" +
                    "package=com.facebook.orca;" +
                    "scheme=fb-messenger;" +
                    "S.android.intent.extra.TEXT=" +
                    encodeURIComponent(link) +
                    ";" +
                    "S.trigger=send_plugin;";
                  if (app_id) {
                    uri +=
                      "S.platform_app_id=" + encodeURIComponent(app_id) + ";";
                  }
                  uri += "end";
                  fallbackURL = FALLBACK_ANDROID_URL;
                } else {
                  uri = "fb-messenger://share?link=" + encodeURIComponent(link);
                  if (app_id) {
                    uri += "&app_id=" + encodeURIComponent(app_id);
                  }
                  fallbackURL = FALLBACK_IOS_URL;
                }

                setTimeout(function setTimeout_$0() {
                  window.location.href = fallbackURL;
                }, FALLBACK_TIMEOUT);
                window.location.href = uri;
              }
            },
            null
          );
          __d(
            "sdk.UIServer",
            [
              "Log",
              "QueryString",
              "UrlMap",
              "createObjectFrom",
              "flattenObject",
              "guid",
              "insertIframe",
              "resolveURI",
              "sdk.Auth",
              "sdk.Content",
              "sdk.DOM",
              "sdk.Dialog",
              "sdk.Event",
              "sdk.Extensions",
              "sdk.Frictionless",
              "sdk.Impressions",
              "sdk.Native",
              "sdk.RPC",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.UA",
              "sdk.XD",
              "sdk.api",
              "sdk.fbt",
              "sdk.feature",
              "sdk.getContextType",
              "sdk.modFeatureCheck",
              "sdk.openMessenger"
            ],
            function $module_sdk_UIServer(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var MobileIframeable = {
                transform: function transform(call) {
                  if (
                    call.params.display === "touch" &&
                    UIServer.canIframe(call.params) &&
                    window.postMessage
                  ) {
                    call.params.channel = UIServer._xdChannelHandler(
                      call.id,
                      "parent"
                    );

                    if (!require("sdk.UA").nativeApp()) {
                      call.params.in_iframe = 1;
                    }
                    return call;
                  } else {
                    return UIServer.genericTransform(call);
                  }
                },
                getXdRelation: function getXdRelation(params) {
                  var display = params.display;
                  if (
                    display === "touch" &&
                    window.postMessage &&
                    params.in_iframe
                  ) {
                    return "parent";
                  }
                  return UIServer.getXdRelation(params);
                }
              };

              function isOauth(params) {
                return (
                  params.method == "permissions.oauth" ||
                  params.method == "permissions.request" ||
                  params.method == "oauth"
                );
              }

              function isSupportedOauth(params) {
                return (
                  isOauth(params) &&
                  require("sdk.Extensions").supportsDialog("oauth")
                );
              }

              function isSupportedAccountLink(params) {
                return (
                  isOauth(params) &&
                  (params.is_account_link === true ||
                    params.is_account_link === "true") &&
                  require("sdk.Extensions").supportsDialog("accountLink")
                );
              }

              var Methods = {
                "stream.share": {
                  size: { width: 670, height: 340 },
                  url: "sharer.php",
                  transform: function transform(call) {
                    if (!call.params.u) {
                      call.params.u = window.location.toString();
                    }
                    call.params.display = "popup";
                    return call;
                  }
                },

                gaming_friendfinder: {
                  url: "gaming/me/friendfinder/",
                  transform: function transform(call) {
                    if (!require("sdk.Runtime").getClientID()) {
                      require("Log").error(
                        "FriendFinder called before FB.init()."
                      );
                      return;
                    }
                    call.url += require("sdk.Runtime").getClientID();
                    call.size = {
                      width: 400,
                      height: 800
                    };

                    return call;
                  }
                },

                gaming_media_library: {
                  url: "gaming/me/media_asset/",
                  transform: function transform(call) {
                    call.url += call.params.media_id;
                    call.size = {
                      width: 400,
                      height: 800
                    };

                    return call;
                  }
                },

                apprequests: {
                  transform: function transform(call) {
                    call = MobileIframeable.transform(call);

                    call.params.frictionless =
                      require("sdk.Frictionless") &&
                      require("sdk.Frictionless")._useFrictionless;
                    if (call.params.frictionless) {
                      if (
                        require("sdk.Frictionless").isAllowed(call.params.to)
                      ) {
                        call.params.display = "iframe";
                        call.params.in_iframe = true;

                        call.hideLoader = true;
                      }

                      call.cb = require("sdk.Frictionless")._processRequestResponse(
                        call.cb,
                        call.hideLoader
                      );
                    }

                    call.closeIcon = false;
                    return call;
                  },
                  getXdRelation: MobileIframeable.getXdRelation
                },

                "permissions.oauth": {
                  url: "dialog/oauth",
                  size: {
                    width: require("sdk.UA").mobile() ? null : 600,
                    height: require("sdk.UA").mobile() ? null : 679
                  },

                  transform: function transform(call) {
                    if (!require("sdk.Runtime").getClientID()) {
                      require("Log").error(
                        "FB.login() called before FB.init()."
                      );
                      return;
                    }

                    if (
                      require("sdk.Auth").getAuthResponse() &&
                      !call.params.scope &&
                      !call.params.asset_scope &&
                      !call.params.auth_type
                    ) {
                      if (!call.params.plugin_prepare) {
                        require("Log").error(
                          "FB.login() called when user is already connected."
                        );
                        call.cb &&
                          call.cb({
                            status: require("sdk.Runtime").getLoginStatus(),
                            authResponse: require("sdk.Auth").getAuthResponse()
                          });
                      }
                      return;
                    }

                    var cb = call.cb;
                    var id = call.id;
                    delete call.cb;

                    if (call && call.params && !call.params.logger_id) {
                      call.params.logger_id = require("guid")();
                    }

                    if (call && call.params && !call.params.cbt) {
                      call.params.cbt = Date.now();
                    }

                    var auth_type = call.params.auth_type;
                    var isReauthenticate =
                      auth_type &&
                      ES(auth_type, "includes", true, "reauthenticate");
                    var responseTypes = Object.keys(
                      ES(
                        "Object",
                        "assign",
                        false,

                        call.params.response_type
                          ? require("createObjectFrom")(
                              call.params.response_type.split(",")
                            )
                          : {},
                        {
                          token: true,
                          signed_request: true,
                          graph_domain: true
                        }
                      )
                    ).join(",");

                    if (call.params.display === "async") {
                      ES("Object", "assign", false, call.params, {
                        client_id: require("sdk.Runtime").getClientID(),
                        origin: require("sdk.getContextType")(),
                        response_type: responseTypes,
                        domain: location.hostname
                      });

                      call.cb = require("sdk.Auth").xdResponseWrapper(
                        cb,
                        require("sdk.Auth").getAuthResponse(),
                        "permissions.oauth",
                        call.params
                      );
                    } else {
                      if (isReauthenticate) {
                        UIServer._xdNextHandler(
                          function UIServer__xdNextHandler_$0(params) {
                            cb({
                              authResponse: null,
                              status: "not_authorized"
                            });
                          },
                          id,
                          call.params.plugin_prepare
                            ? "opener.parent"
                            : "opener",
                          true
                        );
                      }
                      ES("Object", "assign", false, call.params, {
                        client_id: require("sdk.Runtime").getClientID(),
                        redirect_uri: require("resolveURI")(
                          UIServer.xdHandler(
                            cb,
                            id,
                            call.params.plugin_prepare
                              ? "opener.parent"
                              : "opener",
                            require("sdk.Auth").getAuthResponse(),
                            "permissions.oauth",
                            !isReauthenticate,
                            call.params
                          )
                        ),

                        origin: require("sdk.getContextType")(),
                        response_type: responseTypes,
                        domain: location.hostname
                      });
                    }

                    var payload = {
                      logger_id: call.params.logger_id,
                      action: "client_login_start",
                      client_funnel_version: require("sdk.feature")(
                        "oauth_funnel_logger_version",
                        1
                      ),
                      cbt_delta: 0
                    };

                    var drop_funnel_logging =
                      call.params &&
                      call.params.tp &&
                      call.params.tp !== "unspecified";

                    if (!call.params.plugin_prepare && !drop_funnel_logging) {
                      require("sdk.Impressions").log(117, {
                        payload: payload
                      });
                    }

                    return call;
                  }
                },

                "auth.logout": {
                  transform: function transform(call) {
                    if (!require("sdk.Runtime").getClientID()) {
                      require("Log").error(
                        "FB.logout() called before calling FB.init()."
                      );
                    } else if (!require("sdk.Auth").getAuthResponse()) {
                      require("Log").error(
                        "FB.logout() called without an access token."
                      );
                    } else {
                      require("sdk.Auth").logout(call.cb);
                    }
                  }
                },

                "login.status": {
                  transform: function transform(call) {
                    require("sdk.Auth").getLoginStatus(call.cb);
                  }
                },

                pay: {
                  size: { width: 555, height: 120 },
                  connectDisplay: "popup"
                },

                live_broadcast: {
                  transform: function transform(call) {
                    if (call.params.phase === "create") {
                      call.size = { width: 480, height: 280 };
                    }
                    if (call.params.phase === "publish") {
                      call.size = { width: 772, height: 540 };
                    }
                    return call;
                  },
                  require_access_token: true
                },

                boost: {
                  transform: function transform(call) {
                    call.size = { width: 960, height: 760 };
                    call.params.display = "popup";
                    return call;
                  }
                },

                share_referral: {
                  size: { width: 482, height: 725 }
                }
              };

              var _dialogStates = {};

              var _oauthDialogRequestCount = 0;

              function _trackRunState(cb, id) {
                _dialogStates[id] = true;
                return function(response) {
                  delete _dialogStates[id];
                  cb(response);
                };
              }

              function shouldEnforceSingleDialogInstance(params) {
                var name = params.method.toLowerCase();

                if (name === "pay" && params.display === "async") {
                  return true;
                }

                return false;
              }

              var UIServer = {
                Methods: Methods,

                _loadedNodes: {},
                _defaultCb: {},
                _resultToken: '"xxRESULTTOKENxx"',

                genericTransform: function genericTransform(call) {
                  if (
                    call.params.display == "dialog" ||
                    call.params.display == "iframe"
                  ) {
                    ES(
                      "Object",
                      "assign",
                      false,
                      call.params,
                      {
                        display: "iframe",
                        channel: UIServer._xdChannelHandler(
                          call.id,
                          "parent.parent"
                        )
                      },

                      true
                    );
                  }

                  return call;
                },

                checkOauthDisplay: function checkOauthDisplay(params) {
                  var scope =
                    params.scope ||
                    params.perms ||
                    require("sdk.Runtime").getScope();
                  if (!scope) {
                    return params.display;
                  }
                  return "popup";
                },

                prepareCall: function prepareCall(params, cb) {
                  var name = params.method.toLowerCase();
                  var method = Object.prototype.hasOwnProperty.call(
                    UIServer.Methods,
                    name
                  )
                    ? ES("Object", "assign", false, {}, UIServer.Methods[name])
                    : {};
                  var id = params.id || require("guid")();
                  var useSSL = true;

                  ES("Object", "assign", false, params, {
                    app_id: require("sdk.Runtime").getClientID(),
                    locale: require("sdk.Runtime").getLocale(),
                    sdk: "joey",
                    access_token:
                      (useSSL && require("sdk.Runtime").getAccessToken()) ||
                      undefined
                  });

                  params.display = UIServer.getDisplayMode(method, params);

                  if (!method.url) {
                    method.url = "dialog/" + name;
                  }

                  if (
                    (method.url == "dialog/oauth" ||
                      method.url == "dialog/permissions.request") &&
                    (params.display == "iframe" ||
                      (params.display == "touch" && params.in_iframe))
                  ) {
                    params.display = UIServer.checkOauthDisplay(params);
                  }

                  if (method.url == "dialog/oauth") {
                    var _feature;
                    if (
                      _oauthDialogRequestCount >=
                      ((_feature = require("sdk.feature")(
                        "max_oauth_dialog_retries",
                        100
                      )) != null
                        ? _feature
                        : 100)
                    ) {
                      require("Log").error(
                        "Your request to oauth has exceeded the rate limit, please try again later"
                      );

                      return;
                    }
                    _oauthDialogRequestCount++;
                  }

                  if (
                    params.display == "popup" &&
                    !method.require_access_token
                  ) {
                    delete params.access_token;
                  }

                  if (
                    require("sdk.Runtime").getIsVersioned() &&
                    method.url.substring(0, 7) === "dialog/"
                  ) {
                    var version =
                      params.version || require("sdk.Runtime").getVersion();
                    if (
                      version != null &&
                      version !== "" &&
                      version !== "null"
                    ) {
                      method.url = version + "/" + method.url;
                    }
                  }

                  if (shouldEnforceSingleDialogInstance(params)) {
                    if (_dialogStates[name]) {
                      var errorMessage =
                        'Dialog "' +
                        name +
                        '" is trying to run more than once.';
                      require("Log").warn(errorMessage);
                      cb({ error_code: -100, error_message: errorMessage });
                      return;
                    }

                    cb = _trackRunState(cb, name);
                  }

                  var call = {
                    cb: cb,
                    id: id,
                    size: method.size || UIServer.getDefaultSize(),
                    url:
                      require("UrlMap").resolve(
                        params.display == "touch" ? "m" : "www"
                      ) +
                      "/" +
                      method.url,
                    params: params,
                    name: name,
                    dialog: require("sdk.Dialog").newInstance(
                      id,
                      params.display
                    )
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

                  if (params.display === "touch" && params.in_iframe) {
                    call.params.parent_height = window.innerHeight;
                  }

                  var getXdRelationFn =
                    method.getXdRelation || UIServer.getXdRelation;
                  var relation = getXdRelationFn(call.params);
                  if (
                    !(call.id in UIServer._defaultCb) &&
                    !("next" in call.params) &&
                    !("redirect_uri" in call.params)
                  ) {
                    call.params.next = UIServer._xdResult(
                      call.cb,
                      call.id,
                      relation,
                      true
                    );
                  }

                  if (relation === "parent" || relation === "opener") {
                    ES(
                      "Object",
                      "assign",
                      false,
                      call.params,
                      {
                        channel_url: UIServer._xdChannelHandler(
                          id,
                          relation === "parent" ? "parent.parent" : "opener"
                        )
                      },

                      true
                    );
                  }

                  call = UIServer.prepareParams(call);

                  return call;
                },

                prepareParams: function prepareParams(call) {
                  if (call.params.display !== "async") {
                    delete call.params.method;
                  }

                  call.params.kid_directed_site =
                    require("sdk.Runtime").getKidDirectedSite() ||
                    call.params.kid_directed_site;

                  call.params = require("flattenObject")(call.params);
                  var encodedQS = require("QueryString").encode(call.params);

                  if (
                    !require("sdk.UA").nativeApp() &&
                    UIServer.urlTooLongForIE(call.url + "?" + encodedQS)
                  ) {
                    call.post = true;
                  } else if (encodedQS) {
                    call.url += "?" + encodedQS;
                  }

                  return call;
                },

                urlTooLongForIE: function urlTooLongForIE(fullURL) {
                  return (
                    require("sdk.UA").ie() &&
                    require("sdk.UA").ie() <= 8 &&
                    fullURL.length > 2048
                  );
                },

                getDisplayMode: function getDisplayMode(method, params) {
                  if (
                    params.display === "hidden" ||
                    params.display === "none" ||
                    params.display === "native"
                  ) {
                    return params.display;
                  }

                  var canvas =
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    ) ||
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.PAGETAB
                    );
                  if (canvas) {
                    if (
                      require("sdk.modFeatureCheck").forIDs(
                        "force_popup_to_canvas_apps_with_id",
                        [require("sdk.Runtime").getClientID()]
                      ) ||
                      require("sdk.feature")(
                        "force_popup_to_all_canvas_app",
                        false
                      )
                    ) {
                      return "popup";
                    }
                  }
                  if (canvas && !params.display) {
                    return "async";
                  }

                  if (
                    isSupportedOauth(params) ||
                    isSupportedAccountLink(params)
                  ) {
                    return "async";
                  }

                  if (
                    require("sdk.UA").mobile() ||
                    params.display === "touch"
                  ) {
                    return "touch";
                  }

                  if (
                    params.display == "iframe" ||
                    params.display == "dialog"
                  ) {
                    if (!UIServer.canIframe(params)) {
                      require("Log").error(
                        '"dialog" mode can only be used when the user is connected.'
                      );
                      return "popup";
                    }
                  }

                  if (method.connectDisplay && !canvas) {
                    return method.connectDisplay;
                  }

                  return (
                    params.display ||
                    (UIServer.canIframe(params) ? "dialog" : "popup")
                  );
                },

                canIframe: function canIframe(params) {
                  return require("sdk.Runtime").getAccessToken();
                },

                getXdRelation: function getXdRelation(params) {
                  var display = params.display;
                  if (display === "popup" || display === "touch") {
                    return "opener";
                  }
                  if (
                    display === "dialog" ||
                    display === "iframe" ||
                    display === "hidden" ||
                    display === "none"
                  ) {
                    return "parent";
                  }
                  if (display === "async") {
                    return "parent.frames[" + window.name + "]";
                  }
                  return "";
                },

                popup: function popup(call) {
                  var _screenX = window.screenX;
                  var screenY = window.screenY;
                  var outerWidth = window.outerWidth;
                  var outerHeight = window.outerHeight;

                  var width = require("sdk.UA").mobile()
                    ? null
                    : call.size.width;
                  var height = require("sdk.UA").mobile()
                    ? null
                    : call.size.height;
                  var screenX =
                    _screenX < 0 ? window.screen.width + _screenX : _screenX;
                  var left = screenX + (outerWidth - width) / 2;
                  var top = screenY + (outerHeight - height) / 2.5;
                  var features = [];

                  if (width !== null) {
                    features.push("width=" + width);
                  }
                  if (height !== null) {
                    features.push("height=" + height);
                  }
                  features.push("left=" + left);
                  features.push("top=" + top);
                  features.push("scrollbars=1");
                  if (
                    call.name == "permissions.request" ||
                    call.name == "permissions.oauth"
                  ) {
                    features.push("toolbar=0");

                    if (
                      !require("sdk.UA").chrome() ||
                      require("sdk.UA").chrome() < 59
                    ) {
                      features.push("location=1");
                    }
                  }
                  var featuresString = features.join(",");

                  var popup;
                  if (call.post) {
                    popup = window.open("about:blank", call.id, featuresString);
                    if (popup) {
                      UIServer.setLoadedNode(call, popup, "popup");
                      require("sdk.Content").submitToTarget({
                        url: call.url,
                        target: call.id,
                        params: call.params
                      });
                    }
                  } else {
                    popup = window.open(call.url, call.id, featuresString);
                    if (popup) {
                      UIServer.setLoadedNode(call, popup, "popup");
                    }
                  }

                  if (!popup) {
                    if (
                      require("sdk.feature")(
                        "popup_blocker_scribe_logging",
                        true
                      )
                    ) {
                      var error = isOauth({ method: call.name })
                        ? "POPUP_MAYBE_BLOCKED_OAUTH"
                        : "POPUP_MAYBE_BLOCKED";
                      require("sdk.Scribe").log("jssdk_error", {
                        appId: require("sdk.Runtime").getClientID(),
                        error: error,
                        extra: {
                          call: call.name
                        }
                      });
                    }
                    return;
                  }

                  if (call.id in UIServer._defaultCb) {
                    UIServer._popupMonitor();
                  }
                },

                setLoadedNode: function setLoadedNode(call, node, type) {
                  if (type === "iframe") {
                    node.fbCallID = call.id;
                  }
                  node = {
                    node: node,
                    type: type,
                    fbCallID: call.id,
                    method: call.name,
                    params: call.params
                  };

                  UIServer._loadedNodes[call.id] = node;
                },

                getLoadedNode: function getLoadedNode(call) {
                  var id = typeof call === "object" ? call.id : call;
                  var node = UIServer._loadedNodes[id];
                  return node ? node.node : null;
                },

                hidden: function hidden(call) {
                  call.className = "FB_UI_Hidden";
                  call.root = require("sdk.Content").appendHidden(
                    document.createElement("div")
                  );
                  UIServer._insertIframe(call);
                },

                iframe: function iframe(call) {
                  call.className = "FB_UI_Dialog";

                  var onClose = function onClose() {
                    var errorResult = ES("JSON", "stringify", false, {
                      error_code: 4201,
                      error_message: require("sdk.fbt")._(
                        "User canceled the Dialog flow"
                      )
                    });

                    UIServer._triggerDefault(call.id, errorResult);
                  };

                  var dialogOptions = {
                    onClose: onClose,
                    closeIcon:
                      call.closeIcon === undefined ? true : call.closeIcon,
                    classes: require("sdk.Dialog").isTabletStyle()
                      ? "centered"
                      : ""
                  };

                  call.root = require("sdk.Dialog").create(dialogOptions);
                  if (!call.hideLoader) {
                    require("sdk.Dialog").showLoader(onClose, call.size.width);
                  }
                  require("sdk.DOM").addCss(call.root, "fb_dialog_iframe");
                  UIServer._insertIframe(call);
                },

                touch: function touch(call) {
                  if (call.params && call.params.in_iframe) {
                    if (call.ui_created) {
                      require("sdk.Dialog").showLoader(
                        function Dialog_showLoader_$0() {
                          UIServer._triggerDefault(call.id, null);
                        },
                        0
                      );
                    } else {
                      UIServer.iframe(call);
                    }
                  } else if (
                    require("sdk.UA").nativeApp() &&
                    !call.ui_created
                  ) {
                    call.frame = call.id;
                    require("sdk.Native").onready(function Native_onready_$0() {
                      UIServer.setLoadedNode(
                        call,
                        require("sdk.Native").open(
                          call.url + "#cb=" + call.frameName
                        ),
                        "native"
                      );
                    });
                    UIServer._popupMonitor();
                  } else if (!call.ui_created) {
                    UIServer.popup(call);
                  }
                },

                async: function async(call) {
                  call.params.redirect_uri =
                    location.protocol +
                    "//" +
                    location.host +
                    location.pathname;
                  delete call.params.access_token;

                  var handler = function handler(response) {
                    var result = response.result;

                    if (result && result.e2e) {
                      var dialog = require("sdk.Dialog").get(call.id);
                      dialog.trackEvents(result.e2e);
                      dialog.trackEvent("close");
                      delete result.e2e;
                    }
                    call.cb(result);
                  };

                  if (
                    isSupportedOauth(call.params) ||
                    isSupportedAccountLink(call.params)
                  ) {
                    call.params.method = "oauth";
                    call.params.redirect_uri = call.params.next;
                    require("sdk.Extensions").remote.showDialog(
                      call.params,
                      handler
                    );
                  } else {
                    require("sdk.RPC").remote.showDialog(call.params, handler);
                  }
                },
                native: function native(call) {
                  require("sdk.openMessenger")(call.params);
                },

                getDefaultSize: function getDefaultSize() {
                  return require("sdk.Dialog").getDefaultSize();
                },

                _insertIframe: function _insertIframe(call) {
                  UIServer._loadedNodes[call.id] = false;
                  var activate = function activate(node) {
                    if (call.id in UIServer._loadedNodes) {
                      UIServer.setLoadedNode(call, node, "iframe");
                    }
                  };

                  if (call.post) {
                    require("insertIframe")({
                      url: "about:blank",
                      root: call.root,
                      className: call.className,
                      width: call.size.width,
                      height: call.size.height,
                      id: call.id,
                      onInsert: activate,
                      onload: function onload(node) {
                        require("sdk.Content").submitToTarget({
                          url: call.url,
                          target: node.name,
                          params: call.params
                        });
                      }
                    });
                  } else {
                    require("insertIframe")({
                      url: call.url,
                      root: call.root,
                      className: call.className,
                      width: call.size.width,
                      height: call.size.height,
                      id: call.id,
                      name: call.frameName,
                      onInsert: activate
                    });
                  }
                },

                _handleResizeMessage: function _handleResizeMessage(
                  frame,
                  data
                ) {
                  var node = UIServer.getLoadedNode(frame);
                  if (!node) {
                    return;
                  }

                  if (data.height) {
                    node.style.height = data.height + "px";
                  }
                  if (data.width && data.width != 0) {
                    node.style.width = data.width + "px";
                  }

                  require("sdk.XD").inform(
                    "resize.ack",
                    data || {},
                    "parent.frames[" + node.name + "]"
                  );

                  if (!require("sdk.Dialog").isActive(node)) {
                    require("sdk.Dialog").show(node);
                  } else {
                    require("sdk.Dialog")._centerActive();
                  }
                },

                _triggerDefault: function _triggerDefault(id, result) {
                  var data = { frame: id };
                  if (result) {
                    data.result = result;
                  }
                  UIServer._xdRecv(
                    data,
                    UIServer._defaultCb[id] || function() {}
                  );
                },

                _popupMonitor: function _popupMonitor() {
                  var found;
                  for (var id in UIServer._loadedNodes) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        UIServer._loadedNodes,
                        id
                      ) &&
                      id in UIServer._defaultCb
                    ) {
                      var _ret = (function() {
                        var node = UIServer._loadedNodes[id];
                        if (node.type != "popup" && node.type != "native") {
                          return "continue";
                        }
                        var win = node.node;

                        try {
                          if (win.closed) {
                            if (node.method === "permissions.oauth") {
                              require("sdk.Auth").getLoginStatus(
                                function Auth_getLoginStatus_$0(response) {
                                  if (
                                    response.status === "connected" &&
                                    node.params != null &&
                                    node.params.return_scopes
                                  ) {
                                    require("sdk.api")(
                                      "/me/permissions",
                                      function api_$1(scopesResponse) {
                                        if (
                                          !scopesResponse ||
                                          scopesResponse.error
                                        ) {
                                          UIServer._triggerDefault(
                                            id,
                                            response
                                          );
                                        }
                                        var grantedScopesString = "";
                                        for (
                                          var i = 0;
                                          i < scopesResponse.data.length;
                                          i++
                                        ) {
                                          if (
                                            scopesResponse.data[i].status ===
                                            "granted"
                                          ) {
                                            if (grantedScopesString !== "") {
                                              grantedScopesString += ",";
                                            }
                                            grantedScopesString +=
                                              scopesResponse.data[i].permission;
                                          }
                                        }
                                        response.authResponse.grantedScopes = grantedScopesString;
                                        UIServer._triggerDefault(id, response);
                                      }
                                    );
                                  } else {
                                    UIServer._triggerDefault(id, response);
                                  }
                                },
                                true
                              );
                            } else {
                              UIServer._triggerDefault(id, null);
                            }
                          } else {
                            found = true;
                          }
                        } catch (_unused) {}
                      })();
                      if (_ret === "continue") continue;
                    }
                  }

                  if (found && !UIServer._popupInterval) {
                    UIServer._popupInterval = window.setInterval(
                      UIServer._popupMonitor,
                      100
                    );
                  } else if (!found && UIServer._popupInterval) {
                    window.clearInterval(UIServer._popupInterval);
                    UIServer._popupInterval = null;
                  }
                },

                _xdChannelHandler: function _xdChannelHandler(frame, relation) {
                  return require("sdk.XD").handler(
                    function XD_handler_$0(data) {
                      var node = UIServer.getLoadedNode(frame);
                      if (!node) {
                        return;
                      }

                      if (data.type == "resize") {
                        UIServer._handleResizeMessage(frame, data);
                      } else if (data.type == "hide") {
                        require("sdk.Dialog").hide(node);
                      } else if (data.type == "rendered") {
                        var root = require("sdk.Dialog")._findRoot(node);
                        require("sdk.Dialog").show(root);
                      } else if (data.type == "fireevent") {
                        require("sdk.Event").fire(data.event, data);
                      }
                    },
                    relation,
                    true,
                    null
                  );
                },

                _xdNextHandler: function _xdNextHandler(
                  cb,
                  frame,
                  relation,
                  isDefault
                ) {
                  if (isDefault) {
                    UIServer._defaultCb[frame] = cb;
                  }

                  return (
                    require("sdk.XD").handler(function XD_handler_$0(data) {
                      UIServer._xdRecv(data, cb);
                    }, relation) +
                    "&frame=" +
                    frame
                  );
                },

                _xdRecv: function _xdRecv(data, cb) {
                  var frame = UIServer.getLoadedNode(data.frame);
                  if (frame) {
                    if (frame.close) {
                      try {
                        frame.close();

                        if (
                          /iPhone.*Version\/(5|6)/.test(navigator.userAgent) &&
                          RegExp.$1 !== "5"
                        ) {
                          window.focus();
                        }
                        UIServer._popupCount--;
                      } catch (_unused2) {}
                    } else {
                      if (
                        require("sdk.DOM").containsCss(frame, "FB_UI_Hidden")
                      ) {
                        window.setTimeout(function window_setTimeout_$0() {
                          frame.parentNode.parentNode.removeChild(
                            frame.parentNode
                          );
                        }, 3000);
                      } else if (
                        require("sdk.DOM").containsCss(frame, "FB_UI_Dialog")
                      ) {
                        require("sdk.Dialog").remove(frame);
                      }
                    }
                  }

                  delete UIServer._loadedNodes[data.frame];
                  delete UIServer._defaultCb[data.frame];

                  if (data.e2e) {
                    var dialog = require("sdk.Dialog").get(data.frame);
                    dialog.trackEvents(data.e2e);
                    dialog.trackEvent("close");
                    delete data.e2e;
                  }
                  cb(data);
                },

                _xdResult: function _xdResult(cb, frame, target, isDefault) {
                  return (
                    UIServer._xdNextHandler(
                      function UIServer__xdNextHandler_$0(params) {
                        cb &&
                          cb(
                            params.result &&
                              params.result != UIServer._resultToken &&
                              ES("JSON", "parse", false, params.result)
                          );
                      },
                      frame,
                      target,
                      isDefault
                    ) +
                    "&result=" +
                    encodeURIComponent(UIServer._resultToken)
                  );
                },

                xdHandler: function xdHandler(
                  cb,
                  frame,
                  target,
                  authResponse,
                  method,
                  isDefault,
                  requestParams
                ) {
                  return UIServer._xdNextHandler(
                    require("sdk.Auth").xdResponseWrapper(
                      cb,
                      authResponse,
                      method,
                      requestParams
                    ),
                    frame,
                    target,
                    isDefault
                  );
                }
              };

              require("sdk.Extensions").stub("showDialog");
              require("sdk.RPC").stub("showDialog");
              module.exports = UIServer;
            },
            null
          );
          __d(
            "sdk.ui",
            [
              "Assert",
              "Log",
              "sdk.Impressions",
              "sdk.PlatformVersioning",
              "sdk.Runtime",
              "sdk.UIServer",
              "sdk.feature"
            ],
            function $module_sdk_ui(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function ui(params, cb) {
                require("Assert").isObject(params);
                require("Assert").maybeFunction(cb);

                if (require("sdk.Runtime").getIsVersioned()) {
                  require("sdk.PlatformVersioning").assertVersionIsSet();
                  if (params.version) {
                    require("sdk.PlatformVersioning").assertValidVersion(
                      params.version
                    );
                  } else {
                    params.version = require("sdk.Runtime").getVersion();
                  }
                }

                params = ES("Object", "assign", false, {}, params);
                if (!params.method) {
                  require("Log").error(
                    '"method" is a required parameter for FB.ui().'
                  );
                  return null;
                }

                if (params.method == "pay.prompt") {
                  params.method = "pay";
                }

                var method = params.method;

                if (params.redirect_uri) {
                  require("Log").warn(
                    "When using FB.ui, you should not specify a redirect_uri."
                  );
                  delete params.redirect_uri;
                }

                if (!params.fallback_redirect_uri) {
                  params.fallback_redirect_uri = document.location.href;
                }

                if (
                  (method == "permissions.request" ||
                    method == "permissions.oauth") &&
                  (params.display == "iframe" || params.display == "dialog")
                ) {
                  params.display = require("sdk.UIServer").checkOauthDisplay(
                    params
                  );
                }

                if (params.display === "native" && method !== "send") {
                  require("Log").error('display type "native" not supported');
                  return null;
                }

                var enableE2E = require("sdk.feature")("e2e_tracking", true);
                if (enableE2E) {
                  params.e2e = {};
                }
                var call = require("sdk.UIServer").prepareCall(
                  params,
                  cb || function() {}
                );
                if (!call) {
                  return null;
                }

                var displayName = call.params.display;
                if (displayName === "dialog") {
                  displayName = "iframe";
                } else if (displayName === "none") {
                  displayName = "hidden";
                }

                var displayFn = require("sdk.UIServer")[displayName];
                if (!displayFn) {
                  require("Log").error(
                    '"display" must be one of "popup", ' +
                      '"dialog", "iframe", "touch", "async", "hidden", or "none"'
                  );

                  return null;
                }

                if (enableE2E) {
                  call.dialog.subscribe(
                    "e2e:end",
                    function call_dialog_subscribe_$1(events) {
                      events.method = method;
                      events.display = displayName;
                      require("Log").debug(
                        "e2e: %s",
                        ES("JSON", "stringify", false, events)
                      );

                      require("sdk.Impressions").log(114, {
                        payload: events
                      });
                    }
                  );
                }
                displayFn(call);
                return call.dialog;
              }

              module.exports = ui;
            },
            null
          );
          __d(
            "legacy:fb.auth",
            [
              "FB",
              "Log",
              "sdk.Auth",
              "sdk.Cookie",
              "sdk.Event",
              "sdk.Runtime",
              "sdk.SignedRequest",
              "sdk.ui",
              "sdk.warnInsecure"
            ],
            function $module_legacy_fb_auth(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              var sdkAuth;
              var sdkEvent;

              require("FB").provide("", {
                getLoginStatus: function getLoginStatus() {
                  require("sdk.warnInsecure")("getLoginStatus");
                  return require("sdk.Auth").getLoginStatus.apply(
                    require("sdk.Auth"),
                    arguments
                  );
                },

                getAuthResponse: function getAuthResponse() {
                  require("sdk.warnInsecure")("getAuthResponse");
                  return require("sdk.Auth").getAuthResponse();
                },

                getAccessToken: function getAccessToken() {
                  require("sdk.warnInsecure")("getAccessToken");
                  return require("sdk.Runtime").getAccessToken() || null;
                },

                getUserID: function getUserID() {
                  require("sdk.warnInsecure")("getUserID");
                  return (
                    require("sdk.Runtime").getUserID() ||
                    require("sdk.Runtime").getCookieUserID()
                  );
                },

                login: function login(cb, opts) {
                  require("sdk.warnInsecure")("login");
                  if (opts && opts.perms && !opts.scope) {
                    opts.scope = opts.perms;
                    delete opts.perms;
                    require("Log").warn(
                      "OAuth2 specification states that 'perms' " +
                        "should now be called 'scope'.  Please update."
                    );
                  }
                  var canvas =
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    ) ||
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.PAGETAB
                    );
                  require("sdk.ui")(
                    babelHelpers["extends"](
                      {
                        method: "permissions.oauth",
                        display: canvas ? "async" : "popup",
                        domain: location.hostname
                      },
                      opts || {}
                    ),

                    cb
                  );
                },

                logout: function logout(cb) {
                  require("sdk.ui")(
                    { method: "auth.logout", display: "hidden" },
                    cb
                  );
                }
              });

              (sdkAuth = require("sdk.Auth")).subscribe(
                "logout",
                ES(
                  (sdkEvent = require("sdk.Event")).fire,
                  "bind",
                  true,
                  sdkEvent,
                  "auth.logout"
                )
              );
              sdkAuth.subscribe(
                "login",
                ES(sdkEvent.fire, "bind", true, sdkEvent, "auth.login")
              );
              sdkAuth.subscribe(
                "authresponse.change",
                ES(
                  sdkEvent.fire,
                  "bind",
                  true,
                  sdkEvent,
                  "auth.authResponseChange"
                )
              );

              sdkAuth.subscribe(
                "status.change",
                ES(sdkEvent.fire, "bind", true, sdkEvent, "auth.statusChange")
              );
              sdkAuth.subscribe(
                "loginDenied",
                ES(sdkEvent.fire, "bind", true, sdkEvent, "auth.denied")
              );
              sdkAuth.subscribe(
                "loginError",
                ES(sdkEvent.fire, "bind", true, sdkEvent, "auth.error")
              );

              sdkEvent.subscribe("init:post", function Event_subscribe_$1(
                options
              ) {
                if (options.status) {
                  require("sdk.Auth").getLoginStatus();
                }
                if (require("sdk.Runtime").getClientID()) {
                  if (require("sdk.Runtime").getUseCookie()) {
                    var signedRequest = require("sdk.Cookie").loadSignedRequest();
                    var parsedSignedRequest;
                    if (signedRequest) {
                      try {
                        parsedSignedRequest = require("sdk.SignedRequest").parse(
                          signedRequest
                        );
                      } catch (_unused) {
                        require("sdk.Cookie").clearSignedRequestCookie();
                      }
                      if (
                        parsedSignedRequest != null &&
                        parsedSignedRequest.user_id != null
                      ) {
                        require("sdk.Runtime").setCookieUserID(
                          parsedSignedRequest.user_id
                        );
                      }
                    }
                  }
                }
              });
            },
            3
          );
          __d(
            "sdk.Canvas.IframeHandling",
            ["DOMWrapper", "sdk.RPC"],
            function $module_sdk_Canvas_IframeHandling(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var autoGrowTimer = null;
              var autoGrowLastSize;

              function getHeight() {
                var document = require("DOMWrapper").getWindow().document;
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

              function setSize(params) {
                if (typeof params !== "object") {
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
                  params.frame = window.name || "iframe_canvas";
                }

                if (autoGrowLastSize) {
                  var oldHeight = autoGrowLastSize.height;
                  var dHeight = params.height - oldHeight;
                  if (dHeight <= minGrow && dHeight >= -minShrink) {
                    return false;
                  }
                }
                autoGrowLastSize = params;
                require("sdk.RPC").remote.setSize(params);
                return true;
              }

              function setAutoGrow(on, interval) {
                if (interval === undefined && typeof on === "number") {
                  interval = on;
                  on = true;
                }

                if (on || on === undefined) {
                  if (autoGrowTimer === null) {
                    autoGrowTimer = setInterval(function setInterval_$0() {
                      setSize();
                    }, interval || 100);
                  }
                  setSize();
                } else {
                  if (autoGrowTimer !== null) {
                    clearInterval(autoGrowTimer);
                    autoGrowTimer = null;
                  }
                }
              }

              require("sdk.RPC").stub("setSize");

              var IframeHandling = {
                setSize: setSize,
                setAutoGrow: setAutoGrow
              };

              module.exports = IframeHandling;
            },
            null
          );
          __d(
            "sdk.Canvas.Navigation",
            ["sdk.RPC"],
            function $module_sdk_Canvas_Navigation(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function setUrlHandler(callback) {
                require("sdk.RPC").local.navigate = function(path) {
                  callback({ path: path });
                };
                require("sdk.RPC").remote.setNavigationEnabled(true);
              }

              require("sdk.RPC").stub("setNavigationEnabled");

              var Navigation = {
                setUrlHandler: setUrlHandler
              };

              module.exports = Navigation;
            },
            null
          );
          __d(
            "sdk.Canvas.Plugin",
            ["Log", "sdk.RPC", "sdk.Runtime", "sdk.UA", "sdk.api"],
            function $module_sdk_Canvas_Plugin(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var flashClassID = "CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000";
              var unityClassID = "CLSID:444785F1-DE89-4295-863A-D46C3A781394";
              var devHidePluginCallback = null;

              var osx =
                require("sdk.UA").osx() &&
                require("sdk.UA").osx.getVersionParts();
              var unityNeedsToBeHidden = !(
                osx &&
                osx[0] > 10 &&
                osx[1] > 10 &&
                (require("sdk.UA").chrome() >= 31 ||
                  require("sdk.UA").webkit() >= 537.71 ||
                  require("sdk.UA").firefox() >= 25)
              );

              function hideUnityElement(elem) {
                elem._hideunity_savedstyle = {};
                elem._hideunity_savedstyle.left = elem.style.left;
                elem._hideunity_savedstyle.position = elem.style.position;
                elem._hideunity_savedstyle.width = elem.style.width;
                elem._hideunity_savedstyle.height = elem.style.height;
                elem.style.left = "-10000px";
                elem.style.position = "absolute";
                elem.style.width = "1px";
                elem.style.height = "1px";
              }

              function showUnityElement(elem) {
                if (elem._hideunity_savedstyle) {
                  elem.style.left = elem._hideunity_savedstyle.left;
                  elem.style.position = elem._hideunity_savedstyle.position;
                  elem.style.width = elem._hideunity_savedstyle.width;
                  elem.style.height = elem._hideunity_savedstyle.height;
                }
              }

              function hideFlashElement(elem) {
                elem._old_visibility = elem.style.visibility;
                elem.style.visibility = "hidden";
              }

              function showFlashElement(elem) {
                elem.style.visibility = elem._old_visibility || "";
                delete elem._old_visibility;
              }

              function isHideableFlashElement(elem) {
                var type = elem.type ? elem.type.toLowerCase() : null;
                var isHideable =
                  type === "application/x-shockwave-flash" ||
                  (elem.classid && elem.classid.toUpperCase() == flashClassID);

                if (!isHideable) {
                  return false;
                }

                var keepvisibleRegex = /opaque|transparent/i;
                if (keepvisibleRegex.test(elem.getAttribute("wmode"))) {
                  return false;
                }

                for (var j = 0; j < elem.childNodes.length; j++) {
                  var node = elem.childNodes[j];
                  if (
                    /param/i.test(node.nodeName) &&
                    /wmode/i.test(node.name) &&
                    keepvisibleRegex.test(node.value)
                  ) {
                    return false;
                  }
                }
                return true;
              }

              function isHideableUnityElement(elem) {
                var type = elem.type ? elem.type.toLowerCase() : null;
                return (
                  type === "application/vnd.unity" ||
                  (elem.classid && elem.classid.toUpperCase() == unityClassID)
                );
              }

              function hidePluginCallback(params) {
                var candidates = ES(
                  "Array",
                  "from",
                  false,
                  window.document.getElementsByTagName("object")
                );
                candidates = candidates.concat(
                  ES(
                    "Array",
                    "from",
                    false,
                    window.document.getElementsByTagName("embed")
                  )
                );

                var flashPresent = false;
                var unityPresent = false;
                candidates.forEach(function candidates_forEach_$0(elem) {
                  var isFlashElement = isHideableFlashElement(elem);
                  var isUnityElement =
                    unityNeedsToBeHidden && isHideableUnityElement(elem);
                  if (!isFlashElement && !isUnityElement) {
                    return;
                  }

                  flashPresent = flashPresent || isFlashElement;
                  unityPresent = unityPresent || isUnityElement;

                  var visibilityToggleCb = function visibilityToggleCb() {
                    if (params.state === "opened") {
                      if (isFlashElement) {
                        hideFlashElement(elem);
                      } else {
                        hideUnityElement(elem);
                      }
                    } else {
                      if (isFlashElement) {
                        showFlashElement(elem);
                      } else {
                        showUnityElement(elem);
                      }
                    }
                  };

                  if (devHidePluginCallback) {
                    require("Log").info("Calling developer specified callback");

                    var devArgs = { state: params.state, elem: elem };
                    devHidePluginCallback(devArgs);
                    setTimeout(visibilityToggleCb, 200);
                  } else {
                    visibilityToggleCb();
                  }
                });

                if (Math.random() <= 1 / 1000) {
                  var opts = {
                    unity: unityPresent,
                    flash: flashPresent
                  };

                  require("sdk.api")(
                    require("sdk.Runtime").getClientID() + "/occludespopups",
                    "post",
                    opts
                  );
                }
              }

              require("sdk.RPC").local.hidePluginObjects = function() {
                require("Log").info("hidePluginObjects called");
                hidePluginCallback({ state: "opened" });
              };
              require("sdk.RPC").local.showPluginObjects = function() {
                require("Log").info("showPluginObjects called");
                hidePluginCallback({ state: "closed" });
              };

              require("sdk.RPC").local.showFlashObjects = require("sdk.RPC").local.showPluginObjects;
              require("sdk.RPC").local.hideFlashObjects = require("sdk.RPC").local.hidePluginObjects;

              function hidePluginElement() {
                hideFlashElement();
                hideUnityElement();
              }
              function showPluginElement() {
                showFlashElement();
                showUnityElement();
              }

              var Plugin = {
                _setHidePluginCallback: function _setHidePluginCallback(
                  callback
                ) {
                  devHidePluginCallback = callback;
                },

                hidePluginElement: hidePluginElement,
                showPluginElement: showPluginElement
              };

              module.exports = Plugin;
            },
            null
          );
          __d(
            "sdk.Canvas.Tti",
            ["sdk.RPC", "sdk.Runtime"],
            function $module_sdk_Canvas_Tti(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function passAppTtiMessage(callback, messageName) {
                var params = {
                  appId: require("sdk.Runtime").getClientID(),
                  time: Date.now(),
                  name: messageName
                };

                var args = [params];
                if (callback) {
                  args.push(function args_push_$0(response) {
                    callback(response.result);
                  });
                }

                require("sdk.RPC").remote.logTtiMessage.apply(null, args);
              }

              function startTimer() {
                passAppTtiMessage(null, "StartIframeAppTtiTimer");
              }

              function stopTimer(callback) {
                passAppTtiMessage(callback, "StopIframeAppTtiTimer");
              }

              function setDoneLoading(callback) {
                passAppTtiMessage(callback, "RecordIframeAppTti");
              }

              require("sdk.RPC").stub("logTtiMessage");

              var Tti = {
                setDoneLoading: setDoneLoading,
                startTimer: startTimer,
                stopTimer: stopTimer
              };

              module.exports = Tti;
            },
            null
          );
          __d(
            "legacy:fb.canvas",
            [
              "Assert",
              "FB",
              "sdk.Canvas.Environment",
              "sdk.Canvas.IframeHandling",
              "sdk.Canvas.Navigation",
              "sdk.Canvas.Plugin",
              "sdk.Canvas.Tti",
              "sdk.Event",
              "sdk.RPC",
              "sdk.Runtime"
            ],
            function $module_legacy_fb_canvas(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("Canvas", {
                setSize: function setSize(params) {
                  require("Assert").maybeObject(params, "Invalid argument");
                  return require("sdk.Canvas.IframeHandling").setSize.apply(
                    null,
                    arguments
                  );
                },

                setAutoGrow: function setAutoGrow() {
                  return require("sdk.Canvas.IframeHandling").setAutoGrow.apply(
                    null,
                    arguments
                  );
                },

                getPageInfo: function getPageInfo(callback) {
                  require("Assert").isFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Environment").getPageInfo.apply(
                    null,
                    arguments
                  );
                },

                scrollTo: function scrollTo(x, y) {
                  require("Assert").maybeNumber(x, "Invalid argument");
                  require("Assert").maybeNumber(y, "Invalid argument");
                  return require("sdk.Canvas.Environment").scrollTo.apply(
                    null,
                    arguments
                  );
                },

                setDoneLoading: function setDoneLoading(callback) {
                  require("Assert").maybeFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Tti").setDoneLoading.apply(
                    null,
                    arguments
                  );
                },

                startTimer: function startTimer() {
                  return require("sdk.Canvas.Tti").startTimer.apply(
                    null,
                    arguments
                  );
                },

                stopTimer: function stopTimer(callback) {
                  require("Assert").maybeFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Tti").stopTimer.apply(
                    null,
                    arguments
                  );
                },

                getHash: function getHash(callback) {
                  require("Assert").isFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Navigation").getHash.apply(
                    null,
                    arguments
                  );
                },

                setHash: function setHash(hash) {
                  require("Assert").isString(hash, "Invalid argument");
                  return require("sdk.Canvas.Navigation").setHash.apply(
                    null,
                    arguments
                  );
                },

                setUrlHandler: function setUrlHandler(callback) {
                  require("Assert").isFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Navigation").setUrlHandler.apply(
                    null,
                    arguments
                  );
                }
              });

              require("sdk.RPC").local.fireEvent = ES(
                require("sdk.Event").fire,
                "bind",
                true,
                require("sdk.Event")
              );

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  if (
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    )
                  ) {
                    require("Assert").isTrue(
                      !options.hideFlashCallback || !options.hidePluginCallback,
                      "cannot specify deprecated hideFlashCallback and new hidePluginCallback"
                    );

                    require("sdk.Canvas.Plugin")._setHidePluginCallback(
                      options.hidePluginCallback || options.hideFlashCallback
                    );
                  }
                }
              );
            },
            3
          );
          __d(
            "legacy:fb.canvas-legacy",
            ["Assert", "FB", "Log", "sdk.Canvas.Tti"],
            function $module_legacy_fb_canvas_legacy(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("CanvasInsights", {
                setDoneLoading: function setDoneLoading(callback) {
                  require("Log").warn(
                    "Deprecated: use FB.Canvas.setDoneLoading"
                  );
                  require("Assert").maybeFunction(callback, "Invalid argument");
                  return require("sdk.Canvas.Tti").setDoneLoading.apply(
                    null,
                    arguments
                  );
                }
              });
            },
            3
          );
          __d(
            "legacy:fb.canvas.plugin",
            ["FB", "sdk.Canvas.Plugin"],
            function $module_legacy_fb_canvas_plugin(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide(
                "Canvas.Plugin",
                require("sdk.Canvas.Plugin")
              );
            },
            3
          );
          __d(
            "sdk.Canvas.Prefetcher",
            ["JSSDKCanvasPrefetcherConfig", "sdk.Runtime", "sdk.api"],
            function $module_sdk_Canvas_Prefetcher(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var COLLECT = {
                AUTOMATIC: 0,
                MANUAL: 1
              };

              var sampleRate = require("JSSDKCanvasPrefetcherConfig")
                .sampleRate;
              var blacklist = require("JSSDKCanvasPrefetcherConfig").blacklist;
              var collectionMode = COLLECT.AUTOMATIC;
              var links = [];

              function sample() {
                var resourceFieldsByTag = {
                  object: "data",
                  link: "href",
                  script: "src"
                };

                if (collectionMode == COLLECT.AUTOMATIC) {
                  Object.keys(resourceFieldsByTag).forEach(function forEach_$0(
                    tagName
                  ) {
                    var propertyName = resourceFieldsByTag[tagName];
                    ES(
                      "Array",
                      "from",
                      false,
                      document.getElementsByTagName(tagName)
                    ).forEach(function forEach_$0(tag) {
                      if (tag[propertyName]) {
                        links.push(tag[propertyName]);
                      }
                    });
                  });
                }

                if (links.length === 0) {
                  return;
                }

                require("sdk.api")(
                  require("sdk.Runtime").getClientID() + "/staticresources",
                  "post",
                  {
                    urls: ES("JSON", "stringify", false, links),
                    is_https: location.protocol === "https:"
                  }
                );

                links = [];
              }

              function maybeSample() {
                if (
                  !require("sdk.Runtime").isEnvironment(
                    require("sdk.Runtime").ENVIRONMENTS.CANVAS
                  ) ||
                  !require("sdk.Runtime").getClientID() ||
                  !sampleRate
                ) {
                  return;
                }

                if (
                  Math.random() >= 1 / sampleRate ||
                  blacklist == "*" ||
                  ~blacklist.indexOf(require("sdk.Runtime").getClientID())
                ) {
                  return;
                }

                setTimeout(sample, 30000);
              }

              function setCollectionMode(mode) {
                collectionMode = mode;
              }

              function addStaticResource(url) {
                links.push(url);
              }

              var CanvasPrefetcher = {
                COLLECT_AUTOMATIC: COLLECT.AUTOMATIC,
                COLLECT_MANUAL: COLLECT.MANUAL,

                addStaticResource: addStaticResource,
                setCollectionMode: setCollectionMode,

                _maybeSample: maybeSample
              };

              module.exports = CanvasPrefetcher;
            },
            null
          );
          __d(
            "legacy:fb.canvas.prefetcher",
            ["FB", "sdk.Canvas.Prefetcher", "sdk.Event", "sdk.Runtime"],
            function $module_legacy_fb_canvas_prefetcher(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide(
                "Canvas.Prefetcher",
                require("sdk.Canvas.Prefetcher")
              );

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  if (
                    require("sdk.Runtime").isEnvironment(
                      require("sdk.Runtime").ENVIRONMENTS.CANVAS
                    )
                  ) {
                    require("sdk.Canvas.Prefetcher")._maybeSample();
                  }
                }
              );
            },
            3
          );
          __d(
            "legacy:fb.compat.ui",
            ["FB", "Log", "sdk.UIServer", "sdk.ui"],
            function $module_legacy_fb_compat_ui(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("", {
                share: function share(u) {
                  require("Log").error(
                    "share() has been deprecated. Please use FB.ui() instead."
                  );
                  require("sdk.ui")({
                    display: "popup",
                    method: "stream.share",
                    u: u
                  });
                },

                publish: function publish(post, cb) {
                  require("Log").error(
                    "publish() has been deprecated. Please use FB.ui() instead."
                  );
                  post = post || {};
                  require("sdk.ui")(
                    babelHelpers["extends"](
                      {
                        display: "popup",
                        method: "stream.publish",
                        preview: 1
                      },
                      post || {}
                    ),
                    cb
                  );
                },

                addFriend: function addFriend(id, cb) {
                  require("Log").error(
                    "addFriend() has been deprecated. Please use FB.ui() instead."
                  );
                  require("sdk.ui")(
                    { display: "popup", id: id, method: "friend.add" },
                    cb
                  );
                }
              });

              require("sdk.UIServer").Methods[
                "auth.login"
              ] = require("sdk.UIServer").Methods["permissions.request"];
            },
            3
          );
          __d(
            "sdk.Data",
            ["Log"],
            function $module_sdk_Data(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var logError = function logError() {
                require("Log").error(
                  "##########################\n" +
                    "#  FB.Data has been deprecated.\n" +
                    "#  Please use FB.api().\n" +
                    "#  https://developers.facebook.com/docs/javascript/reference/FB.api/\n" +
                    "##########################"
                );
              };

              var Data = {
                query: logError,

                waitOn: logError,

                process: logError
              };

              module.exports = Data;
            },
            null
          );
          __d(
            "legacy:fb.data",
            ["FB", "sdk.Data"],
            function $module_legacy_fb_data(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("Data", require("sdk.Data"));
            },
            3
          );
          __d(
            "legacy:fb.event",
            ["FB", "Log", "sdk.Event"],
            function $module_legacy_fb_event(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              var warn = function warn(name) {
                return require("Log").error(
                  "FB.Event." + name + "() has been deprecated"
                );
              };

              require("FB").provide("Event", {
                subscribe: function subscribe(name, cb) {
                  return require("sdk.Event").subscribe(name, cb);
                },

                unsubscribe: ES(
                  require("sdk.Event").unsubscribe,
                  "bind",
                  true,
                  require("sdk.Event")
                ),
                clear: ES(warn, "bind", true, null, "clear"),
                fire: ES(warn, "bind", true, null, "fire")
              });
            },
            3
          );
          __d(
            "legacy:fb.frictionless",
            ["FB", "sdk.Frictionless"],
            function $module_legacy_fb_frictionless(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide(
                "Frictionless",
                require("sdk.Frictionless")
              );
            },
            3
          );
          __d(
            "sdk.GamingServices",
            ["sdk.api", "sdk.ui"],
            function $module_sdk_GamingServices(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.friendFinder = friendFinder;
              exports.uploadImageToMediaLibrary = uploadImageToMediaLibrary;

              function friendFinder(cb) {
                require("sdk.ui")(
                  {
                    display: "touch",
                    method: "gaming_friendfinder"
                  },

                  cb
                );
              }

              function uploadImageToMediaLibrary(
                imageUri,
                caption,
                shouldOpenMediaDialog,
                cb
              ) {
                require("sdk.api")(
                  "me/photos",
                  "POST",
                  {
                    caption: caption,
                    url: imageUri
                  },

                  function api_$3(apiResponse) {
                    if (
                      shouldOpenMediaDialog === false ||
                      !apiResponse ||
                      apiResponse.error
                    ) {
                      if (cb !== null) {
                        cb(apiResponse);
                      }
                    } else {
                      var upload_id = apiResponse.id;
                      require("sdk.ui")(
                        {
                          display: "touch",
                          method: "gaming_media_library",
                          media_id: upload_id
                        },

                        function ui_$1(_response) {
                          if (cb !== null) {
                            cb(apiResponse);
                          }
                        }
                      );
                    }
                  }
                );
              }
            },
            null
          );
          __d(
            "legacy:fb.gamingservices",
            ["FB", "sdk.GamingServices"],
            function $module_legacy_fb_gamingservices(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("", {
                gamingservices: require("sdk.GamingServices")
              });
            },
            3
          );

          __d(
            "AppUserPropertyAPIBuiltinField",
            [],
            function $module_AppUserPropertyAPIBuiltinField(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = {
                GENDER: "$gender",
                CITY: "$city",
                STATE: "$state",
                ZIPCODE: "$zipcode",
                COUNTRY: "$country",
                LANGUAGE: "$language",
                CURRENCY: "$currency",
                INSTALL_SOURCE: "$install_source",
                USER_TYPE: "$user_type",
                ACCOUNT_CREATED_TIME: "$account_created_time",
                APP_ID: "$app_id"
              };
            },
            null
          );
          __d(
            "FBEventsParamList",
            [],
            function $module_FBEventsParamList(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var APPEND_DEEP = "deep";
              var APPEND_SHALLOW = "shallow";
              var ParamList = (function() {
                function ParamList() {
                  this.list = [];
                }
                var _proto = ParamList.prototype;
                _proto.append = function append(name, value) {
                  this.$ParamList_append(
                    encodeURIComponent(name),
                    value,
                    APPEND_DEEP
                  );
                };
                _proto.each = function each(fn) {
                  var list = this.list;
                  for (var i = 0, len = list.length; i < len; i++) {
                    fn(list[i][0], list[i][1]);
                  }
                };
                _proto.toQueryString = function toQueryString() {
                  var output = [];
                  this.each(function each_$0(name, value) {
                    output.push(name + "=" + encodeURIComponent(value));
                  });
                  return output.join("&");
                };
                _proto.$ParamList_append = function $ParamList_append(
                  name,
                  value,
                  appendType
                ) {
                  if (Object(value) !== value) {
                    this.$ParamList_appendPrimitive(name, value);
                  } else {
                    if (appendType === APPEND_DEEP) {
                      this.$ParamList_appendObject(name, value);
                    } else {
                      this.$ParamList_appendPrimitive(name, stringify(value));
                    }
                  }
                };
                _proto.$ParamList_appendPrimitive = function $ParamList_appendPrimitive(
                  name,
                  value
                ) {
                  if (value != null) {
                    this.list.push([name, value]);
                  }
                };
                _proto.$ParamList_appendObject = function $ParamList_appendObject(
                  name,
                  object
                ) {
                  for (var key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                      var childName =
                        name + "[" + encodeURIComponent(key) + "]";

                      this.$ParamList_append(
                        childName,
                        object[key],
                        APPEND_SHALLOW
                      );
                    }
                  }
                };
                return ParamList;
              })();
              module.exports = ParamList;

              function stringify(value) {
                if (
                  typeof JSON === "undefined" ||
                  JSON === null ||
                  !ES("JSON", "stringify", false)
                ) {
                  return Object.prototype.toString.call(value);
                } else {
                  return ES("JSON", "stringify", false, value);
                }
              }
            },
            null
          );
          __d(
            "FBEventsUtils",
            [],
            function $module_FBEventsUtils(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.listenOnce = listenOnce;

              var isLegacy = !("addEventListener" in document);

              function listenOnce(element, eventName, callback) {
                var compatEventName = isLegacy ? "on" + eventName : eventName;
                var listener = function listener() {
                  isLegacy
                    ? element.detachEvent &&
                      element.detachEvent(compatEventName, listener)
                    : element.removeEventListener(
                        compatEventName,
                        listener,
                        false
                      );
                  callback();
                };
                isLegacy
                  ? element.attachEvent &&
                    element.attachEvent(compatEventName, listener)
                  : element.addEventListener(compatEventName, listener, false);
              }
            },
            null
          );
          __d(
            "FBPixelEndpoint",
            ["invariant", "FBEventsParamList", "FBEventsUtils"],
            function $module_FBPixelEndpoint(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant
            ) {
              "use strict";
              exports.sendEvent = sendEvent;

              var ENDPOINT = "https://www.facebook.com/tr/";

              var currentUrl = location.href;
              var inFrame = window.top !== window;
              var referrerUrl = document.referrer;

              function getParamList(id, eventName, customData, customParams) {
                if (customParams === void 0) {
                  customParams = {};
                }
                var paramList = new (require("FBEventsParamList"))();
                paramList.append("id", id);
                paramList.append("ev", eventName);
                paramList.append("dl", currentUrl);
                paramList.append("rl", referrerUrl);
                paramList.append("if", inFrame);

                paramList.append("ts", new Date().valueOf());
                paramList.append("cd", customData);
                paramList.append("sw", window.screen.width);
                paramList.append("sh", window.screen.height);

                for (var param in customParams) {
                  paramList.append(param, customParams[param]);
                }

                return paramList;
              }

              function sendEvent(id, eventName, customData, customParams) {
                var paramList = getParamList(
                  id,
                  eventName,
                  customData,
                  customParams
                );
                var queryString = paramList.toQueryString();
                if (2048 > (ENDPOINT + "?" + queryString).length) {
                  sendGET(ENDPOINT, queryString);
                } else {
                  sendPOST(ENDPOINT, paramList);
                }
              }

              function sendGET(endpoint, queryString) {
                var image = new Image();
                image.src = endpoint + "?" + queryString;
              }

              function sendPOST(endpoint, paramList) {
                var _document$body;
                var name =
                  "fb" +
                  Math.random()
                    .toString()
                    .replace(".", "");
                var form = document.createElement("form");
                form.method = "post";
                form.action = endpoint;
                form.target = name;
                form.acceptCharset = "utf-8";
                form.style.display = "none";

                var isLegacyIE = !!(
                  window.attachEvent && !window.addEventListener
                );
                var el = isLegacyIE ? '<iframe name="' + name + '">' : "iframe";
                var iframe = document.createElement(el);
                iframe instanceof HTMLIFrameElement ||
                  invariant(0, "element must be an iframe");

                iframe.src = "javascript:false";
                iframe.id = name;
                iframe.name = name;
                form.appendChild(iframe);

                require("FBEventsUtils").listenOnce(
                  iframe,
                  "load",
                  function Utils_listenOnce_$2() {
                    paramList.each(function paramList_each_$0(name, value) {
                      var input = document.createElement("input");
                      input.name = name;
                      input.value = value;
                      form.appendChild(input);
                    });

                    require("FBEventsUtils").listenOnce(
                      iframe,
                      "load",
                      function Utils_listenOnce_$2() {
                        var _form$parentNode;
                        (_form$parentNode = form.parentNode) == null
                          ? void 0
                          : _form$parentNode.removeChild(form);
                      }
                    );
                    form.submit();
                  }
                );
                (_document$body = document.body) == null
                  ? void 0
                  : _document$body.appendChild(form);
              }
            },
            null
          );
          __d(
            "FBAppEvents",
            ["ApiClient", "FBPixelEndpoint"],
            function $module_FBAppEvents(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.logEvent = logEvent;
              exports.updateUserProperties = updateUserProperties;

              function logEvent(
                appID,
                eventName,
                params,
                valueToSum,
                accessToken
              ) {
                var customParams = {};
                if (valueToSum != null) {
                  customParams.vts = valueToSum.toString();
                }
                if (accessToken != null) {
                  customParams.at = accessToken;
                }

                require("FBPixelEndpoint").sendEvent(
                  appID.toString(),
                  eventName,
                  params,
                  customParams
                );
              }

              function updateUserProperties(userID, appID, params, cb) {
                var url = "/" + appID + "/user_properties";
                var data = {
                  data: [{ user_unique_id: userID, custom_data: params }]
                };
                require("ApiClient").graph(url, "post", data, cb);
              }
            },
            null
          );
          __d(
            "sdk.AppEvents",
            [
              "AppUserPropertyAPIBuiltinField",
              "Assert",
              "FBAppEvents",
              "sdk.Event",
              "sdk.Impressions",
              "sdk.Model",
              "sdk.Runtime"
            ],
            function $module_sdk_AppEvents(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.logEvent = logEvent;
              exports.assertValidEventName = assertValidEventName;
              exports.logPurchase = logPurchase;
              exports.activateApp = activateApp;
              exports.logPageView = logPageView;
              exports.assertValidUserID = assertValidUserID;
              exports.setUserID = setUserID;
              exports.getUserID = getUserID;
              exports.clearUserID = clearUserID;
              exports.assertValidAppVersion = assertValidAppVersion;
              exports.setAppVersion = setAppVersion;
              exports.getAppVersion = getAppVersion;
              exports.clearAppVersion = clearAppVersion;
              exports.assertValidUserProperties = assertValidUserProperties;
              exports.updateUserProperties = updateUserProperties;

              var EventNames = Object.freeze({
                COMPLETED_REGISTRATION: "fb_mobile_complete_registration",
                VIEWED_CONTENT: "fb_mobile_content_view",
                SEARCHED: "fb_mobile_search",
                RATED: "fb_mobile_rate",
                COMPLETED_TUTORIAL: "fb_mobile_tutorial_completion",
                ADDED_TO_CART: "fb_mobile_add_to_cart",
                ADDED_TO_WISHLIST: "fb_mobile_add_to_wishlist",
                INITIATED_CHECKOUT: "fb_mobile_initiated_checkout",
                ADDED_PAYMENT_INFO: "fb_mobile_add_payment_info",
                ACHIEVED_LEVEL: "fb_mobile_level_achieved",
                UNLOCKED_ACHIEVEMENT: "fb_mobile_achievement_unlocked",
                PAGE_VIEW: "fb_page_view",
                SPENT_CREDITS: "fb_mobile_spent_credits"
              });
              exports.EventNames = EventNames;

              var HiddenEventNames = Object.freeze({
                ACTIVATED_APP: "fb_mobile_activate_app",
                PURCHASED: "fb_mobile_purchase"
              });

              var ParameterNames = Object.freeze({
                APP_USER_ID: "_app_user_id",
                APP_VERSION: "_appVersion",
                CURRENCY: "fb_currency",
                REGISTRATION_METHOD: "fb_registration_method",
                CONTENT_TYPE: "fb_content_type",
                CONTENT_ID: "fb_content_id",
                SEARCH_STRING: "fb_search_string",
                SUCCESS: "fb_success",
                MAX_RATING_VALUE: "fb_max_rating_value",
                PAYMENT_INFO_AVAILABLE: "fb_payment_info_available",
                NUM_ITEMS: "fb_num_items",
                LEVEL: "fb_level",
                DESCRIPTION: "fb_description"
              });
              exports.ParameterNames = ParameterNames;

              var EVENT_NAME_REGEX = /^[0-9a-zA-Z_][0-9a-zA-Z _-]{0,39}$/;
              var MAX_EVENT_NAME_LENGTH = 40;
              var USER_PROPERTIES_KEY_REGEX = EVENT_NAME_REGEX;
              var MAX_USER_PROPERTIES_KEY_LENGTH = MAX_EVENT_NAME_LENGTH;
              var MAX_USER_ID_LENGTH = 100;
              var MAX_APP_VERSION_LENGTH = 100;
              var MAX_USER_PROPERTIES = 100;
              var MAX_USER_PROPERTIES_VALUE_LENGTH = 100;
              var PREDEFINED_USER_PROPS = ES(
                "Object",
                "values",
                false,
                require("AppUserPropertyAPIBuiltinField")
              );
              _c = PREDEFINED_USER_PROPS;

              var AppProps = new (require("sdk.Model"))({
                UserID: "",
                Version: ""
              });

              function logCanvasEvent(appID, eventName, valueToSum, params) {
                var payload = {
                  ae: 1,
                  ev: eventName,
                  vts: valueToSum,
                  canvas: 1
                };

                if (params) {
                  payload.cd = params;
                }
                require("sdk.Impressions").impression({
                  api_key: appID,
                  payload: ES("JSON", "stringify", false, payload)
                });
              }

              function logAppEvent(appID, eventName, valueToSum, params) {
                var accessToken = require("sdk.Runtime").getAccessToken();
                require("FBAppEvents").logEvent(
                  appID,
                  eventName,
                  params || {},
                  valueToSum,
                  accessToken
                );
              }

              function logEvent(appID, eventName, valueToSum, params) {
                assertValidEventName(eventName);

                var userID = AppProps.getUserID();
                if (userID !== "") {
                  params = params || {};
                  params[ParameterNames.APP_USER_ID] = userID;
                }

                var appVersion = AppProps.getVersion();
                if (appVersion !== "") {
                  params = params || {};
                  params[ParameterNames.APP_VERSION] = appVersion;
                }

                if (require("sdk.Runtime").isCanvasEnvironment()) {
                  logCanvasEvent(appID, eventName, valueToSum, params);
                } else {
                  logAppEvent(appID, eventName, valueToSum, params);
                }
              }

              function assertValidEventName(eventName) {
                require("Assert").isTrue(
                  EVENT_NAME_REGEX.test(eventName),
                  "Invalid event name: " +
                    eventName +
                    ". " +
                    "It must be between 1 and " +
                    MAX_EVENT_NAME_LENGTH +
                    " characters, " +
                    "and must be contain only alphanumerics, _, - or spaces, " +
                    "starting with alphanumeric or _."
                );
              }

              function logPurchase(appID, purchaseAmount, currency, params) {
                var extraParams = {};
                extraParams[ParameterNames.CURRENCY] = currency;

                logEvent(
                  appID,
                  HiddenEventNames.PURCHASED,
                  purchaseAmount,
                  babelHelpers["extends"]({}, params, extraParams)
                );
              }

              function activateApp(appID) {
                logEvent(appID, HiddenEventNames.ACTIVATED_APP);
              }

              function logPageView(appID) {
                logEvent(appID, EventNames.PAGE_VIEW);
              }

              function assertValidUserID(userID) {
                require("Assert").isTrue(
                  userID.length !== 0,
                  "User ID must be set before updateUserProperties can be called."
                );

                require("Assert").isTrue(
                  userID.length <= MAX_USER_ID_LENGTH,
                  "Invalid user ID: " +
                    userID +
                    ". " +
                    "It must be no longer than " +
                    MAX_USER_ID_LENGTH +
                    " characters."
                );
              }

              function setUserID(userID) {
                assertValidUserID(userID);
                AppProps.setUserID(userID);
              }

              function getUserID() {
                return AppProps.getUserID();
              }

              function clearUserID() {
                AppProps.setUserID("");
              }

              function assertValidAppVersion(appVersion) {
                require("Assert").isTrue(
                  appVersion.length <= MAX_APP_VERSION_LENGTH,
                  "Invalid app version: " +
                    appVersion +
                    ". " +
                    "It must be no longer than " +
                    MAX_APP_VERSION_LENGTH +
                    " characters."
                );
              }

              function setAppVersion(appVersion) {
                assertValidAppVersion(appVersion);
                AppProps.setVersion(appVersion);
              }

              function getAppVersion() {
                return AppProps.getVersion();
              }

              function clearAppVersion() {
                AppProps.setVersion("");
              }

              function assertValidUserProperties(params) {
                require("Assert").isTrue(
                  Object.keys(params).length <= MAX_USER_PROPERTIES,
                  "The total number of user properties cannot exceed " +
                    MAX_USER_PROPERTIES +
                    "."
                );

                for (var _key in params) {
                  require("Assert").isTrue(
                    USER_PROPERTIES_KEY_REGEX.test(_key) ||
                      ES(PREDEFINED_USER_PROPS, "includes", true, _key),
                    "Invalid user properties key name: " +
                      _key +
                      ". " +
                      "It must be between 1 and " +
                      MAX_USER_PROPERTIES_KEY_LENGTH +
                      " " +
                      "characters, and must contain only alphanumerics, _, - or spaces, " +
                      "starting with alphanumeric or _. " +
                      "Or, it must be a pre-defined user property"
                  );

                  require("Assert").isTrue(
                    params[_key].toString().length <=
                      MAX_USER_PROPERTIES_VALUE_LENGTH,
                    "Invalid user properties value: " +
                      params[_key] +
                      ". " +
                      "It must be no longer than " +
                      MAX_USER_PROPERTIES_VALUE_LENGTH +
                      " characters."
                  );
                }
              }

              function updateUserProperties(appID, params, cb) {
                var userID = getUserID();
                assertValidUserID(userID);
                assertValidUserProperties(params);
                require("FBAppEvents").updateUserProperties(
                  userID,
                  appID,
                  params,
                  cb
                );
              }

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  if (require("sdk.Runtime").getClientID()) {
                    if (options.autoLogAppEvents !== undefined) {
                      require("Assert").isBoolean(
                        options.autoLogAppEvents,
                        "Type of property autoLogAppEvents must be boolean"
                      );

                      require("sdk.Runtime").setAutoLogAppEvents(
                        options.autoLogAppEvents
                      );
                    }

                    if (require("sdk.Runtime").getAutoLogAppEvents()) {
                      logPageView(require("sdk.Runtime").getClientID());
                    }
                  }
                }
              );
              var _c;
              $RefreshReg$(_c, "PREDEFINED_USER_PROPS");
            },
            null
          );
          __d(
            "sdk.MBasicInitializer",
            [
              "UrlMap",
              "sdk.DOM",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.fbt"
            ],
            function $module_sdk_MBasicInitializer(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.init = init;

              var sharePluginInitialize = function sharePluginInitialize() {
                function replaceWithLink(share_button) {
                  if (!share_button) {
                    return;
                  }
                  var share_button_container = share_button.parentNode;
                  if (!share_button_container) {
                    return;
                  }
                  var href =
                    require("sdk.DOM").getAttr(share_button, "href") ||
                    window.location.href;
                  var dialog = new (require("sdk.URI"))(
                    require("UrlMap").resolve("m")
                  );
                  dialog.setPath("/dialog/share");
                  dialog.addQueryData("href", encodeURI(href));
                  dialog.addQueryData(
                    "app_id",
                    require("sdk.Runtime").getClientID()
                  );
                  dialog.addQueryData("mbasic_link", 1);
                  var link = document.createElement("a");

                  link.style = "display:inline-block; zoom:1;";
                  link.textContent = require("sdk.fbt")._("Share to Facebook");

                  link.setAttribute("href", dialog.toString());
                  link.setAttribute("target", "_blank");
                  share_button_container.insertBefore(link, share_button);
                  share_button_container.removeChild(share_button);
                }

                ES(
                  "Array",
                  "from",
                  false,
                  document.getElementsByTagName("fb:share-button")
                ).forEach(function forEach_$0(button) {
                  return replaceWithLink(button);
                });

                ES(
                  "Array",
                  "from",
                  false,
                  document.getElementsByClassName("fb-share-button")
                ).forEach(function forEach_$0(button) {
                  return replaceWithLink(button);
                });
              };

              function init() {
                if (!require("sdk.UA").mBasic()) {
                  return;
                }
                sharePluginInitialize();
              }
            },
            null
          );
          __d(
            "sdk.init",
            [
              "Log",
              "ManagedError",
              "QueryString",
              "sdk.AppEvents",
              "sdk.Cookie",
              "sdk.ErrorHandling",
              "sdk.Event",
              "sdk.Frictionless",
              "sdk.MBasicInitializer",
              "sdk.PlatformVersioning",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.XD"
            ],
            function $module_sdk_init(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              require("sdk.XD");
              require("sdk.AppEvents");
              require("sdk.Frictionless");

              function parseAppId(appId) {
                var looksValid =
                  (typeof appId === "number" && appId > 0) ||
                  (typeof appId === "string" &&
                    /^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(appId));
                if (looksValid) {
                  return appId.toString();
                }
                require("Log").warn(
                  "Invalid App Id: Must be a number or numeric string representing " +
                    "the application id."
                );

                return null;
              }

              function init(options) {
                if (require("sdk.Runtime").getInitialized()) {
                  require("Log").warn(
                    "FB.init has already been called - this could indicate a problem"
                  );
                }

                if (require("sdk.Runtime").getIsVersioned()) {
                  if (
                    Object.prototype.toString.call(options) !==
                    "[object Object]"
                  ) {
                    throw new (require("ManagedError"))("Invalid argument");
                  }

                  if (options.authResponse) {
                    throw new (require("ManagedError"))(
                      "Setting authResponse is not supported"
                    );
                  }

                  if (!options.version) {
                    options.version = new (require("sdk.URI"))(
                      location.href
                    ).getQueryData().sdk_version;
                  }

                  require("sdk.PlatformVersioning").assertValidVersion(
                    options.version
                  );
                  require("sdk.Runtime").setVersion(options.version);
                } else {
                  if (/number|string/.test(typeof options)) {
                    require("Log").warn(
                      "FB.init called with invalid parameters"
                    );
                    options = { apiKey: options };
                  }

                  options = ES(
                    "Object",
                    "assign",
                    false,
                    {
                      status: true
                    },

                    options || {}
                  );
                }

                var appId = parseAppId(options.appId || options.apiKey);
                if (appId !== null) {
                  require("sdk.Runtime").setClientID(appId);
                }

                if ("scope" in options) {
                  require("sdk.Runtime").setScope(options.scope);
                }

                if (options.cookie) {
                  require("sdk.Runtime").setUseCookie(true);
                  if (typeof options.cookie === "string") {
                    require("sdk.Cookie").setDomain(options.cookie);
                  }
                }

                if (
                  options.localStorage === false ||
                  options.localStorage === "false"
                ) {
                  require("sdk.Runtime").setUseLocalStorage(false);
                }

                if (options.kidDirectedSite) {
                  require("sdk.Runtime").setKidDirectedSite(true);
                }

                if (
                  options.autoLogAppEvents === "1" ||
                  options.autoLogAppEvents === "true"
                ) {
                  options.autoLogAppEvents = true;
                }

                if (options.ab) {
                  require("sdk.Runtime").setSDKAB(options.ab);
                }

                require("sdk.Runtime").setInitialized(true);

                if (require("sdk.UA").mBasic()) {
                  require("sdk.MBasicInitializer").init();
                }

                require("sdk.Event").fire("init:post", options);
              }

              window.setTimeout(function window_setTimeout_$0() {
                var pattern = /(connect\.facebook\.net|\.facebook\.com\/assets.php|\.facebook\.net\/assets.php).*?#(.*)/;

                ES(
                  "Array",
                  "from",
                  false,
                  fb_fif_window.document.getElementsByTagName("script")
                ).forEach(function forEach_$0(script) {
                  if (script.src) {
                    var match = pattern.exec(script.src);
                    if (match) {
                      var opts = require("QueryString").decode(match[2]);
                      for (var key in opts) {
                        if (Object.prototype.hasOwnProperty.call(opts, key)) {
                          var val = opts[key];
                          if (val == "0") {
                            opts[key] = 0;
                          }
                        }
                      }

                      init(opts);
                    }
                  }
                });

                if (window.fbAsyncInit && !window.fbAsyncInit.hasRun) {
                  require("sdk.Event").fire("init:asyncstart");
                  window.fbAsyncInit.hasRun = true;
                  require("sdk.ErrorHandling").unguard(window.fbAsyncInit)();
                }
              }, 0);

              module.exports = init;
            },
            null
          );
          __d(
            "legacy:fb.init",
            ["FB", "sdk.Event", "sdk.init"],
            function $module_legacy_fb_init(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              "use strict";

              require("FB").provide("", { init: require("sdk.init") });

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1() {
                  if (__buffer) {
                    __buffer.replay();
                  }
                }
              );

              window.setTimeout(function window_setTimeout_$0() {
                if (__buffer && __buffer.opts) {
                  require("sdk.init")(__buffer.opts);
                }
              }, 0);
            },
            3
          );
          __d(
            "legacy:fb.json",
            ["FB", "ManagedError"],
            function $module_legacy_fb_json(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("JSON", {
                stringify: function stringify(obj) {
                  try {
                    return ES("JSON", "stringify", false, obj);
                  } catch (e) {
                    throw new (require("ManagedError"))(e.message, e);
                  }
                },

                parse: function parse(str) {
                  try {
                    return ES("JSON", "parse", false, str);
                  } catch (e) {
                    throw new (require("ManagedError"))(e.message, e);
                  }
                }
              });
            },
            3
          );
          __d(
            "runOnce",
            [],
            function $module_runOnce(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = runOnce;

              function runOnce(func) {
                var hasRun = false;
                var result;

                return function() {
                  if (!hasRun) {
                    hasRun = true;
                    result = func();
                  }
                  return result;
                };
              }
            },
            null
          );
          __d(
            "sdk.Time",
            ["Log", "sdk.Impressions", "sdk.Runtime", "sdk.feature"],
            function $module_sdk_Time(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              exports.log = log;

              var perf = window.performance;

              var couldLog =
                perf && "now" in perf && "getEntriesByName" in perf;

              var startTime;
              var data = {};

              if (couldLog) {
                var sdkurl = require("sdk.Runtime").getSDKUrl();
                var bootloadedTiming = null;
                var timing = perf
                  .getEntriesByType("resource")
                  .filter(function filter_$0(t) {
                    return ES(t.name, "startsWith", true, sdkurl);
                  });

                if (timing.length > 1) {
                  if (timing > 2) {
                    timing = null;
                  } else {
                    var bootId = ES(
                      timing,
                      "findIndex",
                      true,
                      function timing_findIndex_$0(t) {
                        return ES(
                          t.name,
                          "startsWith",
                          true,
                          sdkurl + "?hash="
                        );
                      }
                    );

                    if (!bootId) {
                      timing = null;
                    } else {
                      bootloadedTiming = timing.splice(bootId)[0];
                      timing = timing[0];
                    }
                  }
                } else if (timing.length === 1) {
                  var frame = document.getElementById("facebook-jssdk-iframe");
                  if (frame && frame instanceof HTMLIFrameElement) {
                    bootloadedTiming = frame.contentWindow.performance
                      .getEntriesByType("resource")
                      .find(function find_$0(t) {
                        return ES(t.name, "startsWith", true, sdkurl);
                      });
                  }
                  timing = timing[0];
                } else {
                  timing = null;
                }

                if (timing) {
                  data.fetchTime = Math.round(timing.duration);
                  if (bootloadedTiming) {
                    data.fetchTime += Math.round(bootloadedTiming.duration);
                  }

                  if ("transferSize" in timing) {
                    data.transferSize = timing.transferSize;
                    if (bootloadedTiming) {
                      data.transferSize += bootloadedTiming.transferSize;
                    }
                  }
                  require("Log").debug(
                    "sdkperf: it took %s ms and %s bytes to load %s",
                    data.fetchTime,
                    data.transferSize,
                    sdkurl
                  );

                  startTime = timing.startTime;

                  data.ns = require("sdk.Runtime").getSDKNS();

                  if (startTime) {
                    window.setTimeout(function window_setTimeout_$0() {
                      var shouldLog = require("sdk.feature")("log_perf", false);
                      var testId = require("sdk.Runtime").getSDKAB();
                      if (testId) {
                        data.ab = testId;
                        shouldLog = true;
                      }
                      if (shouldLog) {
                        require("sdk.Impressions").log(116, data);
                      }
                    }, 10000);
                  }
                }
              }

              function log(key) {
                if (!couldLog || !startTime) {
                  return;
                }
                data[key] = Math.round(perf.now() - startTime);
                require("Log").debug(
                  "sdkperf: %s logged after %s ms",
                  key,
                  data[key]
                );
              }
            },
            null
          );
          __d(
            "legacy:fb.time",
            ["runOnce", "sdk.Event", "sdk.Time"],
            function $module_legacy_fb_time(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              "use strict";
              var sdkEvent;

              (sdkEvent = require("sdk.Event")).subscribe(
                "init:post",
                function Event_subscribe_$1() {
                  require("sdk.Time").log("init");
                }
              );

              sdkEvent.subscribe(
                "init:asyncstart",
                function Event_subscribe_$1() {
                  require("sdk.Time").log("asyncstart");
                }
              );

              sdkEvent.subscribe(
                "iframeplugin:create",
                require("runOnce")(function runOnce_$0() {
                  return require("sdk.Time").log("pluginframe");
                })
              );

              sdkEvent.subscribe(
                "iframeplugin:onload",
                require("runOnce")(function runOnce_$0() {
                  return require("sdk.Time").log("ttfp");
                })
              );
            },
            3
          );
          __d(
            "legacy:fb.ua",
            ["FB", "sdk.UA"],
            function $module_legacy_fb_ua(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("UA", {
                nativeApp: require("sdk.UA").nativeApp
              });
            },
            3
          );
          __d(
            "legacy:fb.ui",
            ["FB", "sdk.ui"],
            function $module_legacy_fb_ui(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("", { ui: require("sdk.ui") });
            },
            3
          );
          __d(
            "XFBML",
            ["Assert", "Log", "runOnce", "sdk.Observable"],
            function $module_XFBML(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var xfbml = {};
              var html5 = {};

              var parseCount = 0;

              var observable = new (require("sdk.Observable")).Observable();

              function propStr(object, property) {
                return (object[property] + "").trim();
              }

              function xfbmlInfo(element) {
                return xfbml[propStr(element, "nodeName").toLowerCase()];
              }

              function html5Info(element) {
                var classNames = propStr(element, "className")
                  .split(/\s+/)
                  .filter(function filter_$0(className) {
                    return Object.prototype.hasOwnProperty.call(
                      html5,
                      className
                    );
                  });

                if (classNames.length === 0) {
                  return undefined;
                }

                if (
                  element.getAttribute("fb-xfbml-state") ||
                  !element.childNodes ||
                  element.childNodes.length === 0 ||
                  (element.childNodes.length === 1 &&
                    element.childNodes[0].nodeType === 3) ||
                  (element.children.length === 1 &&
                    propStr(element.children[0], "className") ===
                      "fb-xfbml-parse-ignore")
                ) {
                  return html5[classNames[0]];
                }
              }

              function attr(element) {
                var attrs = {};
                ES("Array", "from", false, element.attributes).forEach(
                  function forEach_$0(at) {
                    attrs[propStr(at, "name")] = propStr(at, "value");
                  }
                );
                return attrs;
              }

              function _parse(dom, callback, reparse) {
                require("Assert").isTrue(
                  dom &&
                    dom.nodeType &&
                    dom.nodeType === 1 &&
                    !!dom.getElementsByTagName,
                  "Invalid DOM node passed to FB.XFBML.parse()"
                );

                require("Assert").isFunction(
                  callback,
                  "Invalid callback passed to FB.XFBML.parse()"
                );
                if (dom == null) {
                  return;
                }

                var pc = ++parseCount;
                require("Log").info("XFBML Parsing Start %s", pc);

                var count = 1;
                var tags = 0;
                var onrender = function onrender() {
                  count--;
                  if (count === 0) {
                    require("Log").info(
                      "XFBML Parsing Finish %s, %s tags found",
                      pc,
                      tags
                    );
                    if (callback != null) {
                      callback();
                    }
                    observable.inform("render", [pc, tags]);
                  }
                  require("Assert").isTrue(
                    count >= 0,
                    "onrender() has been called too many times"
                  );
                };

                ES(
                  "Array",
                  "from",
                  false,
                  dom.getElementsByTagName("*")
                ).forEach(function forEach_$0(element) {
                  if (
                    reparse !== true &&
                    element.getAttribute("fb-xfbml-state")
                  ) {
                    return;
                  }
                  if (element.nodeType !== 1) {
                    return;
                  }

                  var info = xfbmlInfo(element) || html5Info(element);
                  if (info == null) {
                    return;
                  }

                  count++;
                  tags++;
                  var renderer = new info.ctor(
                    element,
                    info.xmlns,
                    info.localName,
                    attr(element)
                  );

                  renderer.subscribe(
                    "render",
                    require("runOnce")(function runOnce_$0() {
                      element.setAttribute("fb-xfbml-state", "rendered");
                      onrender();
                    })
                  );

                  var render = function render() {
                    if (element.getAttribute("fb-xfbml-state") == "parsed") {
                      observable.subscribe("render.queue", render);
                    } else {
                      element.setAttribute("fb-xfbml-state", "parsed");
                      renderer.process();
                    }
                  };

                  render();
                });

                observable.inform("parse", [pc, tags]);

                var timeout = 30000;
                window.setTimeout(function window_setTimeout_$0() {
                  if (count > 0) {
                    require("Log").warn(
                      "%s tags failed to render in %s ms",
                      count,
                      timeout
                    );
                  }
                }, timeout);

                onrender();
              }

              observable.subscribe(
                "render",
                function observable_subscribe_$1() {
                  var q = observable.getSubscribers("render.queue");
                  observable.clearSubscribers("render.queue");
                  q.forEach(function q_forEach_$0(r) {
                    r([]);
                  });
                }
              );

              var XFBML = {
                registerTag: function registerTag(info) {
                  var fqn = info.xmlns + ":" + info.localName;

                  if (fqn === "fb:customerchat" && xfbml[fqn] != null) {
                    return;
                  }
                  require("Assert").isUndefined(
                    xfbml[fqn],
                    fqn + " already registered"
                  );

                  xfbml[fqn] = info;

                  html5[info.xmlns + "-" + info.localName] = info;
                },

                parse: function parse(dom, cb) {
                  var _dom, _cb;
                  _parse(
                    (_dom = dom) != null ? _dom : document.body,
                    (_cb = cb) != null ? _cb : function() {},
                    true
                  );
                },

                parseNew: function parseNew() {
                  _parse(document.body, function _parse_$1() {}, false);
                },
                subscribe: observable.subscribe,
                unsubscribe: observable.unsubscribe
              };
              var _default = XFBML;
              module.exports = _default;
            },
            null
          );
          __d(
            "legacy:fb.xfbml",
            [
              "AssertionError",
              "FB",
              "XFBML",
              "sdk.Event",
              "sdk.domReady",
              "wrapFunction"
            ],
            function $module_legacy_fb_xfbml(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              require("FB").provide("XFBML", {
                parse: function parse(dom) {
                  if (
                    dom != null &&
                    !(
                      (dom.nodeType === 1 || dom.nodeType === 9) &&
                      typeof dom.nodeName === "string"
                    )
                  ) {
                    throw new (require("AssertionError"))("Invalid argument");
                  }

                  if (dom && dom.nodeType === 9) {
                    dom = dom.body;
                  }
                  return require("XFBML").parse.apply(null, arguments);
                }
              });

              require("XFBML").subscribe("parse", function XFBML_subscribe_$1(
                counts
              ) {
                return require("sdk.Event").fire(
                  "xfbml.parse",
                  counts[0],
                  counts[1]
                );
              });

              require("XFBML").subscribe("render", function XFBML_subscribe_$1(
                counts
              ) {
                return require("sdk.Event").fire(
                  "xfbml.render",
                  counts[0],
                  counts[1]
                );
              });

              require("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  if (options.xfbml) {
                    setTimeout(
                      require("wrapFunction")(
                        ES(
                          require("sdk.domReady"),
                          "bind",
                          true,
                          null,
                          require("XFBML").parse
                        ),
                        "entry",
                        "init:post:xfbml.parse"
                      ),

                      0
                    );
                  }
                }
              );

              try {
                if (document.namespaces && !document.namespaces.item.fb) {
                  document.namespaces.add("fb");
                }
              } catch (e) {}
            },
            3
          );
          __d(
            "$InternalEnum",
            [],
            function $module__InternalEnum(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var hasOwnProperty = Object.prototype.hasOwnProperty;

              var reverseMapCache =
                typeof WeakMap === "function" ? new WeakMap() : new Map();

              function getReverseMap(enumObject) {
                var reverseMap = reverseMapCache.get(enumObject);
                if (reverseMap !== undefined) {
                  return reverseMap;
                }

                var newReverseMap = new Map();
                Object.getOwnPropertyNames(enumObject).forEach(
                  function forEach_$0(name) {
                    newReverseMap.set(enumObject[name], name);
                  }
                );
                reverseMapCache.set(enumObject, newReverseMap);
                return newReverseMap;
              }

              var EnumPrototype = Object.freeze(
                Object.defineProperties(Object.create(null), {
                  isValid: {
                    value: function value(x) {
                      return getReverseMap(this).has(x);
                    }
                  },

                  cast: {
                    value: function value(x) {
                      return this.isValid(x) ? x : undefined;
                    }
                  },

                  members: {
                    value: function value() {
                      return getReverseMap(this).keys();
                    }
                  },

                  getName: {
                    value: function value(_value) {
                      return getReverseMap(this).get(_value);
                    }
                  }
                })
              );

              function Enum(members) {
                var o = Object.create(EnumPrototype);
                for (var k in members) {
                  if (hasOwnProperty.call(members, k)) {
                    Object.defineProperty(o, k, { value: members[k] });
                  }
                }
                return Object.freeze(o);
              }

              var EnumMirroredPrototype = Object.freeze(
                Object.defineProperties(Object.create(null), {
                  isValid: {
                    value: function value(x) {
                      if (typeof x === "string") {
                        return hasOwnProperty.call(this, x);
                      }
                      return false;
                    }
                  },

                  cast: {
                    value: EnumPrototype.cast
                  },

                  members: {
                    value: function value() {
                      return Object.getOwnPropertyNames(this);
                    }
                  },

                  getName: {
                    value: function value(_value2) {
                      return _value2;
                    }
                  }
                })
              );

              Enum.Mirrored = function EnumMirrored(members) {
                var o = Object.create(EnumMirroredPrototype);
                for (var i = 0, len = members.length; i < len; ++i) {
                  Object.defineProperty(o, members[i], { value: members[i] });
                }
                return Object.freeze(o);
              };

              Object.freeze(Enum.Mirrored);

              module.exports = Object.freeze(Enum);
            },
            null
          );
          __d(
            "MPNConstants",
            ["$InternalEnum"],
            function $module_MPNConstants(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";
              var InternalEnum;
              var MPNRedirect = (InternalEnum = require("$InternalEnum"))({
                NEW_GUEST_SESSION: "new_guest_sess",
                ITP_CONTINUE_SESSION: "ipt_continue_sess",
                FB_LOG_IN: "fb_log_in",
                GUEST_UPGRADE: "guest_upgrade",
                GUEST_UPGRADE_SWITCH_ACCOUNT: "guest_upgrade_switch_account"
              });
              exports.MPNRedirect = MPNRedirect;
              var MPNUpgradePrompt = InternalEnum({
                NOT_SHOWN: "not_shown",
                ATTACHMENT_UPSELL: "attachment_upsell",
                DONT_WAIT_FOR_REPLY_UPSELL: "dont_wait_for_reply_upsell",
                CONTINUE_IN_MESSENGER: "continue_in_messenger"
              });
              exports.MPNUpgradePrompt = MPNUpgradePrompt;
              var MPNVisibility = InternalEnum({
                HIDDEN: "hidden",
                NOT_HIDDEN: "not-hidden"
              });
              exports.MPNVisibility = MPNVisibility;
              var MPNGreenDotSize = InternalEnum.Mirrored(["LARGE", "MEDIUM"]);
              exports.MPNGreenDotSize = MPNGreenDotSize;
              var MPNQuickReplyLayout = InternalEnum.Mirrored([
                "HORIZONTAL",
                "VERTICAL"
              ]);
              exports.MPNQuickReplyLayout = MPNQuickReplyLayout;
              var MPNQuickReplyContentType = InternalEnum({
                TEXT: "text",
                USER_EMAIL: "user_email",
                USER_PHONE_NUMBER: "user_phone_number",
                USER_STATE: "user_state",
                USER_ZIP_CODE: "user_zip_code"
              });
              exports.MPNQuickReplyContentType = MPNQuickReplyContentType;
            },
            null
          );
          __d(
            "MPNLocalState",
            [],
            function $module_MPNLocalState(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var MPNLocalStatePath = {
                LANDING_BANNER: 1,
                WELCOME_PAGE: 2,
                ITP_CONTINUE: 3,
                THREAD_VIEW: 4,
                BUBBLE: 5
              };
              exports.MPNLocalStatePath = MPNLocalStatePath;

              var MPNChatState = {
                CHAT_NOT_STARTED: 1,
                LOGGED_IN_CHAT_STARTED: 2,
                GUEST_CHAT_STARTED: 3
              };
              exports.MPNChatState = MPNChatState;

              var LOCAL_STATE_KEY = "__fb_chat_plugin";
              exports.LOCAL_STATE_KEY = LOCAL_STATE_KEY;
            },
            null
          );
          __d(
            "sdk.PluginUtils",
            ["resolveURI", "sdk.Event"],
            function $module_sdk_PluginUtils(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.getVal = getVal;
              exports.validate = validate;
              exports.resize = resize;
              exports.resizeBubbler = resizeBubbler;
              exports.parse = parse;
              exports.collapseIframe = collapseIframe;

              var types = {
                string: function string(value) {
                  return value;
                },
                bool: function bool(value) {
                  return value != null
                    ? /^(?:true|1|yes|on)$/i.test(value)
                    : undefined;
                },
                url: function url(value) {
                  return require("resolveURI")(value);
                },
                url_maybe: function url_maybe(value) {
                  return value != null && value !== ""
                    ? require("resolveURI")(value)
                    : undefined;
                },
                hostname: function hostname(value) {
                  return value != null && value !== ""
                    ? value
                    : "window.location.hostname";
                },
                px: function px(value) {
                  if (typeof value === "string") {
                    var match = value.match(/^(\d+)(?:px)?$/);
                    return match != null ? parseInt(match[0], 10) : undefined;
                  } else if (typeof value === "number") {
                    return value;
                  } else {
                    return undefined;
                  }
                },
                text: function text(value) {
                  return value;
                }
              };

              function getVal(attr, key) {
                var _ref, _ref2, _ref3, _ref4, _ref5, _attr$key;
                var val =
                  (_ref =
                    (_ref2 =
                      (_ref3 =
                        (_ref4 =
                          (_ref5 =
                            (_attr$key = attr[key]) != null
                              ? _attr$key
                              : attr[key.replace(/_/g, "-")]) != null
                            ? _ref5
                            : attr[key.replace(/_/g, "")]) != null
                          ? _ref4
                          : attr["data-" + key]) != null
                        ? _ref3
                        : attr["data-" + key.replace(/_/g, "-")]) != null
                      ? _ref2
                      : attr["data-" + key.replace(/_/g, "")]) != null
                    ? _ref
                    : undefined;
                return val;
              }

              function validate(defn, elem, attr, params) {
                Object.keys(defn).forEach(function forEach_$0(key) {
                  if (defn[key] === "text" && !attr[key]) {
                    var _ref6, _elem$textContent;
                    attr[key] =
                      (_ref6 =
                        (_elem$textContent = elem.textContent) != null
                          ? _elem$textContent
                          : elem.innerText) != null
                        ? _ref6
                        : undefined;
                    elem.setAttribute(key, attr[key]);
                  }
                  params[key] = types[defn[key]](getVal(attr, key));
                });
              }

              function resize(elem, width, height) {
                if (width === "100%") {
                  elem.style.width = "100%";
                } else if (width != null && width !== "") {
                  elem.style.width = width + "px";
                }

                if ((height != null && height !== "") || height === 0) {
                  elem.style.height = height + "px";
                }
              }

              function resizeBubbler(pluginID) {
                return function(msg) {
                  var message = {
                    width: msg.width,
                    height: msg.height,
                    pluginID: pluginID
                  };
                  require("sdk.Event").fire("xfbml.resize", message);
                };
              }

              function parse(dim) {
                if (dim === "100%") {
                  return "100%";
                }

                return dim != null ? parseInt(dim, 10) : undefined;
              }

              function collapseIframe(iframe) {
                if (iframe != null) {
                  resize(iframe, 0, 0);
                }
              }

              var baseParams = {
                skin: "string",
                font: "string",
                width: "string",
                height: "px",
                ref: "string",
                lazy: "bool",
                color_scheme: "string"
              };
              exports.baseParams = baseParams;
            },
            null
          );
          __d(
            "isNumberLike",
            [],
            function $module_isNumberLike(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = isNumberLike;

              function isNumberLike(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
              }
            },
            null
          );
          __d(
            "sdk.createIframe",
            ["DOMEventListener", "getBlankIframeSrc", "guid", "isNumberLike"],
            function $module_sdk_createIframe(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = createIframe;

              function createIframe(opts_arg) {
                var opts = ES("Object", "assign", false, {}, opts_arg);
                var frame;
                var name = opts.name || require("guid")();
                var root = opts.root;
                var style = opts.style || { border: "none" };
                var src = opts.url;
                var onLoad = opts.onload;
                var onError = opts.onerror;

                frame = document.createElement("iframe");
                frame.name = name;

                delete opts.style;
                delete opts.name;
                delete opts.url;
                delete opts.root;
                delete opts.onload;
                delete opts.onerror;
                delete opts.height;
                delete opts.width;

                if (opts.frameBorder === undefined) {
                  opts.frameBorder = 0;
                }

                if (opts.allowTransparency === undefined) {
                  opts.allowTransparency = true;
                }

                if (opts.allowFullscreen === undefined) {
                  opts.allowFullscreen = true;
                }

                if (opts.scrolling === undefined) {
                  opts.scrolling = "no";
                }

                if (opts.allow === undefined) {
                  opts.allow = "encrypted-media";
                }

                if (opts.lazy) {
                  opts.loading = "lazy";

                  if (style.visibility) {
                    delete style.visibility;
                  }
                }
                delete opts.lazy;

                if (
                  opts_arg.width != null &&
                  require("isNumberLike")(opts_arg.width)
                ) {
                  frame.width = opts_arg.width + "px";
                }
                if (
                  opts_arg.height != null &&
                  require("isNumberLike")(opts_arg.height)
                ) {
                  frame.height = opts_arg.height + "px";
                }

                if (opts.testid && frame.dataset != null) {
                  frame.dataset.testid = opts.testid;
                  delete opts.testid;
                }

                for (var key in opts) {
                  if (Object.prototype.hasOwnProperty.call(opts, key)) {
                    frame.setAttribute(key, opts[key]);
                  }
                }

                ES("Object", "assign", false, frame.style, style);

                frame.src = require("getBlankIframeSrc")();
                if (root != null) {
                  root.appendChild(frame);
                }
                if (onLoad) {
                  var onLoadListener = require("DOMEventListener").add(
                    frame,
                    "load",
                    function DOMEventListener_add_$2() {
                      onLoadListener.remove();
                      onLoad();
                    }
                  );
                }

                if (onError) {
                  var onErrorListener = require("DOMEventListener").add(
                    frame,
                    "error",
                    function DOMEventListener_add_$2() {
                      onErrorListener.remove();
                      onError();
                    }
                  );
                }

                frame.src = src;
                return frame;
              }
            },
            null
          );
          __d(
            "IframePlugin",
            [
              "Log",
              "MPNLocalState",
              "ObservableMixin",
              "QueryString",
              "Type",
              "UrlMap",
              "guid",
              "sdk.Auth",
              "sdk.DOM",
              "sdk.Event",
              "sdk.PlatformVersioning",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.WebStorage",
              "sdk.XD",
              "sdk.createIframe"
            ],
            function $module_IframePlugin(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var IframePlugin = require("Type").extend(
                {
                  constructor: function constructor(elem, ns, tag, attr) {
                    var _this = this;
                    var sdkPluginUtils;
                    this.parent();
                    tag = tag.replace(/-/g, "_");

                    var pluginId = (sdkPluginUtils = require("sdk.PluginUtils")).getVal(
                      attr,
                      "plugin_id"
                    );
                    this.subscribe(
                      "xd.resize",
                      sdkPluginUtils.resizeBubbler(pluginId)
                    );
                    this.subscribe(
                      "xd.resize.flow",
                      sdkPluginUtils.resizeBubbler(pluginId)
                    );

                    this.subscribe("xd.resize.flow", function subscribe_$1(
                      message
                    ) {
                      ES(
                        "Object",
                        "assign",
                        false,
                        _this._iframeOptions.root.style,
                        {
                          verticalAlign: "bottom",
                          overflow: ""
                        }
                      );

                      require("sdk.PluginUtils").resize(
                        _this._iframeOptions.root,
                        require("sdk.PluginUtils").parse(message.width),
                        require("sdk.PluginUtils").parse(message.height)
                      );

                      _this.updateLift();
                      window.clearTimeout(_this._timeoutID);
                    });

                    this.subscribe("xd.resize", function subscribe_$1(message) {
                      var sdkPluginUtils;
                      ES(
                        "Object",
                        "assign",
                        false,
                        _this._iframeOptions.root.style,
                        {
                          verticalAlign: "bottom",
                          overflow: ""
                        }
                      );

                      (sdkPluginUtils = require("sdk.PluginUtils")).resize(
                        _this._iframeOptions.root,
                        sdkPluginUtils.parse(message.width),
                        sdkPluginUtils.parse(message.height)
                      );

                      sdkPluginUtils.resize(
                        _this._iframe,
                        sdkPluginUtils.parse(message.width),
                        sdkPluginUtils.parse(message.height)
                      );

                      _this._isIframeResized = true;
                      _this.updateLift();
                      window.clearTimeout(_this._timeoutID);
                    });

                    this.subscribe("xd.resize.iframe", function subscribe_$1(
                      message
                    ) {
                      require("sdk.PluginUtils").resize(
                        _this._iframe,
                        require("sdk.PluginUtils").parse(message.width),
                        require("sdk.PluginUtils").parse(message.height)
                      );

                      _this._isIframeResized = true;
                      _this.updateLift();
                      window.clearTimeout(_this._timeoutID);
                    });

                    this.subscribe("xd.sdk_event", function subscribe_$1(
                      message
                    ) {
                      var data = ES("JSON", "parse", false, message.data);
                      data.pluginID = pluginId;
                      require("sdk.Event").fire(message.event, data, elem);
                    });

                    var url =
                      require("UrlMap").resolve("www") +
                      "/plugins/" +
                      tag +
                      ".php?";
                    var params = {};
                    sdkPluginUtils.validate(
                      this.getParams(),
                      elem,
                      attr,
                      params
                    );
                    sdkPluginUtils.validate(
                      sdkPluginUtils.baseParams,
                      elem,
                      attr,
                      params
                    );

                    ES("Object", "assign", false, params, {
                      app_id: require("sdk.Runtime").getClientID(),
                      locale: require("sdk.Runtime").getLocale(),
                      sdk: "joey",
                      kid_directed_site: require("sdk.Runtime").getKidDirectedSite(),
                      channel: require("sdk.XD").handler(
                        function XD_handler_$0(msg) {
                          if (msg != null) {
                            _this.inform("xd." + msg.type, msg);
                          }
                        },
                        "parent.parent",
                        true
                      )
                    });

                    if (tag == "customerchat") {
                      var storage = require("sdk.WebStorage").getLocalStorage();
                      var localState = null;
                      if (storage != null) {
                        try {
                          localState = storage.getItem(
                            require("MPNLocalState").LOCAL_STATE_KEY
                          );
                        } catch (_unused) {
                          require("Log").warn("Failed to access localStorage");
                        }
                      }
                      if (localState != null) {
                        ES("Object", "assign", false, params, {
                          local_state: localState
                        });
                      }

                      var requestTime = Date.now();
                      ES("Object", "assign", false, params, {
                        request_time: requestTime
                      });
                    }

                    if (this.shouldIgnoreWidth()) {
                      params.width = void 0;
                    }

                    params.container_width = elem.offsetWidth;

                    require("sdk.DOM").addCss(elem, "fb_iframe_widget");
                    var name = require("guid")();
                    this.subscribe("xd.verify", function subscribe_$1(msg) {
                      require("sdk.XD").sendToFacebook(name, {
                        method: "xd/verify",
                        params: ES("JSON", "stringify", false, msg.token)
                      });
                    });

                    this.subscribe(
                      "xd.refreshLoginStatus",
                      function subscribe_$1() {
                        require("sdk.Auth").removeLogoutState();
                        require("sdk.Auth").getLoginStatus(
                          ES(_this.inform, "bind", true, _this, "login.status"),
                          true
                        );
                      }
                    );

                    var flow = document.createElement("span");

                    ES("Object", "assign", false, flow.style, {
                      verticalAlign: "top",
                      width: params.lazy ? "1px" : "0px",
                      height: params.lazy ? "1px" : "0px",
                      overflow: "hidden"
                    });

                    this._element = elem;
                    this._ns = ns;
                    this._tag = tag;
                    this._params = params;
                    this._config = this.getConfig();
                    this._iframeOptions = {
                      root: flow,
                      url: url + require("QueryString").encode(params),
                      name: name,

                      width:
                        this._config.mobile_fullsize &&
                        require("sdk.UA").mobile()
                          ? void 0
                          : params.width || 1000,
                      height: params.height || 1000,
                      style: {
                        border: "none",
                        visibility: "hidden"
                      },

                      title:
                        this._ns + ":" + this._tag + " Facebook Social Plugin",
                      testid:
                        this._ns + ":" + this._tag + " Facebook Social Plugin",
                      onload: function onload() {
                        return _this.inform("render");
                      },
                      onerror: function onerror() {
                        return require("sdk.PluginUtils").collapseIframe(
                          _this._iframe
                        );
                      },
                      lazy: params.lazy
                    };

                    if (this.isFluid() && params.width !== "auto") {
                      require("sdk.DOM").addCss(
                        this._element,
                        "fb_iframe_widget_fluid_desktop"
                      );
                      if (!params.width && this._config.full_width) {
                        this._element.style.width = "100%";
                        this._iframeOptions.root.style.width = "100%";
                        this._iframeOptions.style.width = "100%";
                        this._params.container_width = this._element.offsetWidth;
                        this._iframeOptions.url =
                          url + require("QueryString").encode(this._params);
                      }
                    }
                  },

                  shouldIgnoreWidth: function shouldIgnoreWidth() {
                    return (
                      require("sdk.UA").mobile() &&
                      this.getConfig().mobile_fullsize
                    );
                  },

                  useInlineHeightForMobile: function useInlineHeightForMobile() {
                    return true;
                  },

                  process: function process() {
                    var _this2 = this;
                    if (require("sdk.Runtime").getIsVersioned()) {
                      require("sdk.PlatformVersioning").assertVersionIsSet();
                      var uri = new (require("sdk.URI"))(
                        this._iframeOptions.url
                      );
                      this._iframeOptions.url = uri
                        .setPath(
                          "/" +
                            require("sdk.Runtime").getVersion() +
                            uri.getPath()
                        )
                        .toString();
                    }

                    var params = ES(
                      "Object",
                      "assign",
                      false,
                      {},
                      this._params
                    );
                    delete params.channel;
                    var query = require("QueryString").encode(params);
                    if (
                      this._element.getAttribute("fb-iframe-plugin-query") ==
                      query
                    ) {
                      require("Log").info(
                        "Skipping render: %s:%s %s",
                        this._ns,
                        this._tag,
                        query
                      );
                      this.inform("render");
                      return;
                    }
                    this._element.setAttribute("fb-iframe-plugin-query", query);

                    this.subscribe("render", function subscribe_$1() {
                      require("sdk.Event").fire("iframeplugin:onload");
                      _this2._iframe.style.visibility = "visible";

                      if (!_this2._isIframeResized) {
                        require("sdk.PluginUtils").collapseIframe(
                          _this2._iframe
                        );
                      }
                    });

                    while (this._element.firstChild) {
                      this._element.removeChild(this._element.firstChild);
                    }
                    this._element.appendChild(this._iframeOptions.root);
                    var timeout = require("sdk.UA").mobile() ? 120 : 45;
                    this._timeoutID = window.setTimeout(
                      function window_setTimeout_$0() {
                        require("sdk.PluginUtils").collapseIframe(
                          _this2._iframe
                        );
                        require("Log").warn(
                          "%s:%s failed to resize in %ss",
                          _this2._ns,
                          _this2._tag,
                          timeout
                        );
                      },
                      timeout * 1000
                    );

                    this._iframe = require("sdk.createIframe")(
                      this._iframeOptions
                    );
                    require("sdk.Event").fire("iframeplugin:create");

                    if (require("sdk.UA").mobile() || params.width === "auto") {
                      if (this.useInlineHeightForMobile()) {
                        require("sdk.DOM").addCss(
                          this._element,
                          "fb_iframe_widget_fluid"
                        );
                      }

                      if (!this._iframeOptions.width) {
                        ES("Object", "assign", false, this._element.style, {
                          display: "block",
                          width: "100%",
                          height: "auto"
                        });

                        ES(
                          "Object",
                          "assign",
                          false,
                          this._iframeOptions.root.style,
                          {
                            width: "100%",
                            height: "auto"
                          }
                        );

                        var iframeStyle = {
                          height: "auto",
                          position: "static",
                          width: "100%"
                        };

                        if (
                          require("sdk.UA").iphone() ||
                          require("sdk.UA").ipad()
                        ) {
                          ES("Object", "assign", false, iframeStyle, {
                            width: "220px",
                            "min-width": "100%"
                          });
                        }

                        ES(
                          "Object",
                          "assign",
                          false,
                          this._iframe.style,
                          iframeStyle
                        );
                      }
                    }
                  },

                  getConfig: function getConfig() {
                    return {};
                  },

                  isFluid: function isFluid() {
                    var config = this.getConfig();
                    return config.fluid;
                  },

                  updateLift: function updateLift() {
                    var same =
                      this._iframe.style.width ===
                        this._iframeOptions.root.style.width &&
                      this._iframe.style.height ===
                        this._iframeOptions.root.style.height;

                    require("sdk.DOM")[same ? "removeCss" : "addCss"](
                      this._iframe,
                      "fb_iframe_widget_lift"
                    );
                  }
                },
                require("ObservableMixin")
              );

              IframePlugin.withParams = function(params, config) {
                return IframePlugin.extend({
                  getParams: function getParams() {
                    return params;
                  },

                  getConfig: function getConfig() {
                    return config ? config : {};
                  }
                });
              };
              var _default = IframePlugin;
              module.exports = _default;
            },
            null
          );
          __d(
            "PluginConfig",
            ["sdk.feature"],
            function $module_PluginConfig(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var comment_embed = {
                mobile_fullsize: true
              };
              exports.comment_embed = comment_embed;

              var messengerpreconfirmation = {
                mobile_fullsize: true
              };
              exports.messengerpreconfirmation = messengerpreconfirmation;

              var messengeraccountconfirmation = {
                mobile_fullsize: true
              };
              exports.messengeraccountconfirmation = messengeraccountconfirmation;

              var messengerbusinesslink = {
                mobile_fullsize: true
              };
              exports.messengerbusinesslink = messengerbusinesslink;

              var messengertoggle = {
                mobile_fullsize: true
              };
              exports.messengertoggle = messengertoggle;

              var messengermessageus = {
                mobile_fullsize: true
              };
              exports.messengermessageus = messengermessageus;

              var post = {
                fluid: require("sdk.feature")("fluid_embed", false),
                mobile_fullsize: true
              };
              exports.post = post;

              var send_to_messenger = {
                mobile_fullsize: true
              };
              exports.send_to_messenger = send_to_messenger;
            },
            null
          );
          __d(
            "PluginAttrTypes",
            [],
            function $module_PluginAttrTypes(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var string = "string";
              exports.string = string;

              var bool = "bool";
              exports.bool = bool;
              var url = "url";
              exports.url = url;
            },
            null
          );
          __d(
            "PluginTags",
            ["PluginAttrTypes"],
            function $module_PluginTags(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var PluginAttrTypes;

              var PluginTags = {
                ad_library_spend_tracker: {
                  country: (PluginAttrTypes = require("PluginAttrTypes"))
                    .string,
                  time_preset: PluginAttrTypes.string,
                  custom_start_date: PluginAttrTypes.string,
                  custom_end_date: PluginAttrTypes.string,
                  race_type: PluginAttrTypes.string,
                  state: PluginAttrTypes.string,
                  district: PluginAttrTypes.string,
                  page_ids: PluginAttrTypes.string,
                  include_vps: PluginAttrTypes.bool
                },

                comment_embed: {
                  href: PluginAttrTypes.url,
                  include_parent: PluginAttrTypes.bool
                },

                composer: {
                  action_type: PluginAttrTypes.string,
                  action_properties: PluginAttrTypes.string
                },

                create_event_button: {},

                group: {
                  href: PluginAttrTypes.url,
                  show_social_context: PluginAttrTypes.bool,
                  show_group_info: PluginAttrTypes.bool,
                  show_metadata: PluginAttrTypes.bool
                },

                like: {
                  href: PluginAttrTypes.url,
                  layout: PluginAttrTypes.string,
                  show_faces: PluginAttrTypes.bool,
                  share: PluginAttrTypes.bool,
                  action: PluginAttrTypes.string,

                  send: PluginAttrTypes.bool,
                  size: PluginAttrTypes.string
                },

                like_box: {
                  href: PluginAttrTypes.string,
                  show_faces: PluginAttrTypes.bool,
                  header: PluginAttrTypes.bool,
                  stream: PluginAttrTypes.bool,
                  force_wall: PluginAttrTypes.bool,
                  show_border: PluginAttrTypes.bool,

                  id: PluginAttrTypes.string,
                  connections: PluginAttrTypes.string,
                  profile_id: PluginAttrTypes.string,
                  name: PluginAttrTypes.string
                },

                page: {
                  href: PluginAttrTypes.string,
                  hide_cta: PluginAttrTypes.bool,
                  hide_cover: PluginAttrTypes.bool,
                  small_header: PluginAttrTypes.bool,
                  adapt_container_width: PluginAttrTypes.bool,
                  show_facepile: PluginAttrTypes.bool,
                  show_posts: PluginAttrTypes.bool,
                  tabs: PluginAttrTypes.string
                },

                messenger_checkbox: {
                  messenger_app_id: PluginAttrTypes.string,
                  page_id: PluginAttrTypes.string,
                  pixel_id: PluginAttrTypes.string,
                  prechecked: PluginAttrTypes.bool,
                  allow_login: PluginAttrTypes.bool,
                  size: PluginAttrTypes.string,
                  origin: PluginAttrTypes.string,
                  user_ref: PluginAttrTypes.string,
                  identity_match: PluginAttrTypes.string,
                  center_align: PluginAttrTypes.bool
                },

                messengermessageus: {
                  messenger_app_id: PluginAttrTypes.string,
                  page_id: PluginAttrTypes.string,
                  color: PluginAttrTypes.string,
                  size: PluginAttrTypes.string
                },

                send_to_messenger: {
                  messenger_app_id: PluginAttrTypes.string,
                  page_id: PluginAttrTypes.string,
                  color: PluginAttrTypes.string,
                  size: PluginAttrTypes.string,
                  enforce_login: PluginAttrTypes.bool,
                  identity_match: PluginAttrTypes.string,
                  origin: PluginAttrTypes.string,
                  cta_text: PluginAttrTypes.string
                },

                page_events: {
                  href: PluginAttrTypes.url
                },

                post: {
                  href: PluginAttrTypes.url,
                  show_text: PluginAttrTypes.bool
                },

                profile_pic: {
                  uid: PluginAttrTypes.string,
                  linked: PluginAttrTypes.bool,
                  href: PluginAttrTypes.string,
                  size: PluginAttrTypes.string,
                  facebook_logo: PluginAttrTypes.bool
                },

                send_to_mobile: {
                  max_rows: PluginAttrTypes.string,
                  show_faces: PluginAttrTypes.bool,
                  size: PluginAttrTypes.string
                }
              };

              var aliases = {
                fan: "like_box",
                likebox: "like_box"
              };

              Object.keys(aliases).forEach(function forEach_$0(key) {
                PluginTags[key] = PluginTags[aliases[key]];
              });
              var _default = PluginTags;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.Comments",
            [
              "IframePlugin",
              "QueryString",
              "UrlMap",
              "sdk.DOM",
              "sdk.Event",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI"
            ],
            function $module_sdk_XFBML_Comments(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var MIN_WIDTH = 320;

              var params = ES(
                "Object",
                "assign",
                false,
                {
                  numposts: "string",
                  href: "url",
                  permalink: "bool",
                  order_by: "string",
                  mobile: "bool",
                  version: "string",
                  hide_post_profile: "bool",
                  limit: "string",
                  offset: "string",
                  view: "string",
                  fb_comment_id: "string",
                  from_mod_tool: "bool",

                  migrated: "string",
                  xid: "string",
                  title: "string",
                  url: "string",
                  quiet: "string",
                  reverse: "string",
                  simple: "string",
                  css: "string",
                  notify: "string",
                  count: "bool",
                  skin: "string",
                  font: "string",
                  width: "string",
                  height: "px",
                  ref: "string",
                  lazy: "bool",
                  color_scheme: "string"
                },

                require("sdk.PluginUtils").baseParams
              );

              function setupAttributes(elem, attr) {
                Object.keys(params).forEach(function forEach_$0(key) {
                  var val = require("sdk.DOM").getAttr(elem, key);
                  if (val !== null) {
                    attr[key] = val;
                  }
                });
                Object.keys(attr).forEach(function forEach_$0(key) {
                  if (ES(key, "startsWith", true, "data-")) {
                    delete attr[key];
                  }
                });

                if (require("sdk.UA").mobile() && attr.mobile !== false) {
                  attr.mobile = true;
                }
                if (!attr.skin) {
                  attr.skin = attr.colorscheme;
                }

                if (!attr.href) {
                  attr.title = attr.title || document.title;
                  attr.url = attr.url || document.URL;

                  if (!attr.xid) {
                    var index = document.URL.indexOf("#");
                    if (index > 0) {
                      attr.xid = encodeURIComponent(
                        document.URL.substring(0, index)
                      );
                    } else {
                      attr.xid = encodeURIComponent(document.URL);
                    }
                  }

                  if (attr.migrated) {
                    attr.href =
                      require("UrlMap").resolve("www") +
                      "/plugins/comments_v1.php?" +
                      "app_id=" +
                      require("sdk.Runtime").getClientID() +
                      "&xid=" +
                      encodeURIComponent(attr.xid) +
                      "&url=" +
                      encodeURIComponent(attr.url);
                  }
                } else {
                  var fb_comment_id = attr.fb_comment_id;
                  if (!fb_comment_id) {
                    fb_comment_id = require("QueryString").decode(
                      document.URL.substring(document.URL.indexOf("?") + 1)
                    ).fb_comment_id;
                    if (fb_comment_id && fb_comment_id.indexOf("#") > 0) {
                      fb_comment_id = fb_comment_id.substring(
                        0,
                        fb_comment_id.indexOf("#")
                      );
                    }
                  }

                  if (fb_comment_id) {
                    attr.fb_comment_id = fb_comment_id;
                  }
                }

                if (!attr.version) {
                  attr.version = require("sdk.Runtime").getVersion();
                }

                if (!attr.permalink) {
                  attr.width =
                    attr.mobile ||
                    attr.width === "auto" ||
                    attr.width === "100%"
                      ? ""
                      : !attr.width
                      ? 550
                      : Math.max(attr.width, MIN_WIDTH);

                  attr.height = 100;
                }

                if (attr.href != null) {
                  var href = new (require("sdk.URI"))(attr.href);
                  if (!href.getProtocol()) {
                    attr.href = href.setProtocol("http").toString();
                  }
                }

                return attr;
              }

              var Comments = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  attr = setupAttributes(elem, attr);
                  this.parent(elem, ns, tag, attr);
                  this.subscribe("xd.sdk_event", function subscribe_$1(
                    message
                  ) {
                    require("sdk.Event").fire(
                      message.event,
                      ES("JSON", "parse", false, message.data)
                    );
                  });
                },
                getConfig: function getConfig() {
                  return {
                    fluid: true,
                    full_width: true
                  };
                },
                getParams: function getParams() {
                  return params;
                }
              });
              var _default = Comments;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.CommentsCount",
            ["sdk.DOM", "sdk.XFBML.Comments", "sprintf"],
            function $module_sdk_XFBML_CommentsCount(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var CommentsCount = require("sdk.XFBML.Comments").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  require("sdk.DOM").addCss(elem, "fb_comments_count_zero");
                  attr.count = 1;
                  this.parent(elem, ns, "comments", attr);
                  this.subscribe("xd.comment_count", function subscribe_$1(
                    message
                  ) {
                    var data = ES("JSON", "parse", false, message.data);
                    require("sdk.DOM").html(
                      elem,
                      require("sprintf")(
                        '<span class="fb_comments_count">%s</span>',
                        data.count
                      )
                    );

                    if (data.count > 0) {
                      require("sdk.DOM").removeCss(
                        elem,
                        "fb_comments_count_zero"
                      );
                    }
                    require("sdk.DOM").removeCss(elem, "fb_iframe_widget");
                  });
                }
              });
              var _default = CommentsCount;
              module.exports = _default;
            },
            null
          );
          __d(
            "getFacebookOriginForTarget",
            ["Log"],
            function $module_getFacebookOriginForTarget(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = getFacebookOriginForTarget;

              function getFacebookOriginForTarget(cb, target) {
                if (target === void 0) {
                  target = top;
                }
                var intervalId = 0;
                var ackReceived = false;
                var retries = 200;

                window.addEventListener(
                  "message",
                  function window_addEventListener_$1(event) {
                    if (event.source === target && event.data.xdArbiterAck) {
                      if (
                        /\.facebook\.com$/.test(event.origin) &&
                        /^https:/.test(event.origin)
                      ) {
                        if (ackReceived === false) {
                          ackReceived = true;
                          require("Log").debug(
                            "initXdArbiter got xdArbiterAck from " +
                              event.origin
                          );
                          cb(event.origin);
                        }
                      } else {
                        require("Log").error(
                          "xdAbiterAck was not from Facebook: ",
                          event.origin
                        );
                      }
                    }
                  },
                  false
                );

                target.postMessage({ xdArbiterSyn: true }, "*");

                intervalId = window.setInterval(
                  function window_setInterval_$0() {
                    if (!ackReceived && retries > 0) {
                      retries--;
                      require("Log").debug("resending xdArbiterSyn");
                      target.postMessage({ xdArbiterSyn: true }, "*");
                    } else {
                      window.clearInterval(intervalId);
                    }
                  },
                  200
                );
              }
            },
            null
          );
          __d(
            "sdk.DocumentTitle",
            [],
            function $module_sdk_DocumentTitle(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              exports.get = get;
              exports.set = set;
              exports.blink = blink;

              var trueTitle = document.title;
              var temporaryTitle = null;
              var BLINK_SPEED = 1500;
              var interval = null;
              var showingBlinkTitle = false;

              function _doBlink() {
                if (temporaryTitle) {
                  if (!showingBlinkTitle) {
                    _setBlinkTitle(temporaryTitle);
                  } else {
                    _resetTitle();
                  }
                } else {
                  clearInterval(interval);
                  interval = null;
                  _resetTitle();
                }
              }

              function _setBlinkTitle(new_title) {
                document.title = new_title;
                showingBlinkTitle = true;
              }

              function _resetTitle() {
                set(trueTitle);
                showingBlinkTitle = false;
              }

              function get() {
                return trueTitle;
              }

              function set(newTitle) {
                document.title = newTitle;
              }

              function blink(title) {
                temporaryTitle = title;
                if (interval === null) {
                  interval = setInterval(_doBlink, BLINK_SPEED);
                }
                return {
                  stop: function stop() {
                    temporaryTitle = null;
                  }
                };
              }
            },
            null
          );
          __d(
            "sdk.XFBML.CustomerChat",
            [
              "DOMEventListener",
              "IframePlugin",
              "MPNLocalState",
              "UrlMap",
              "getFacebookOriginForTarget",
              "sdk.Content",
              "sdk.DOM",
              "sdk.DialogUtils",
              "sdk.DocumentTitle",
              "sdk.Event",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.WebStorage",
              "sdk.XD",
              "sdk.createIframe"
            ],
            function $module_sdk_XFBML_CustomerChat(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var ANIMATION_EVENTS = [
                "animationend",
                "mozAnimationEnd",
                "MSAnimationEnd",
                "oAnimationEnd",
                "webkitAnimationEnd"
              ];

              var LEFT_ANCHOR_CLASS = "anchor_left";
              var RIGHT_ANCHOR_CLASS = "anchor_right";

              var _blinkerToken = null;
              var _browserSupportsAnimation = !(require("sdk.UA").ie() <= 9);
              var _unreadCountIFrame = null;
              var _iconInnerIFrame = null;
              var _bubbleIFrame = null;
              var _chatStarted = false;
              var _bubbleDialog = null;
              var _dialogIFrame = null;
              var _dialogIFrameName = "";
              var _dialogIFrameOrigin = null;
              var _bubbleIFrameName = "";
              var _unreadCountIFrameName = "";
              var _savedScrollXPosition = 0;
              var _savedScrollYPosition = 0;
              var _showInterstitialOnPage = false;
              var _visibilityGuard = null;
              var LANDING_PAGE = "/";
              var WELCOME_PAGE = "/welcome";
              var BUBBLE = "/bubble";
              var ITP_PAGE = "/itpcontinue";
              var _mobilePath = LANDING_PAGE;
              var DIALOG_FRAME_MAX_HEIGHT = "calc(100% - 80px)";
              var DIALOG_FRAME_MIN_HEIGHT = "360px";
              var _bubbleIFrameLoaded = false;
              var _badgeIFrameLoaded = false;
              var _isHidden = false;
              var _isIframeHidden = false;

              var CustomerChat = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  require("sdk.DOM").addCss(elem, "fb_invisible_flow");

                  require("sdk.DOM").remove(elem);
                  require("sdk.Content").append(elem);

                  this.parent(elem, ns, tag, attr);

                  this._iframeOptions.title = "";

                  require("sdk.Event").fire("customerchat.load");

                  this._setUpSubscriptions();
                },

                _setUpSubscriptions: function _setUpSubscriptions() {
                  var _this = this;

                  this.subscribe(
                    "xd.liveChatPluginResizeIframeVariableHeight",
                    function subscribe_$1(message) {
                      if (message.setBoxShadow) {
                        _this._handleSetIframeBoxShadow();
                      } else {
                        _this._handleUnsetIframeBoxShadow();
                      }
                      _this._handleResizeIframe(message);
                    }
                  );
                  this.subscribe(
                    "xd.liveChatPluginUpdateShadow",
                    function subscribe_$1(message) {
                      _this._handleShadowUpdate(message);
                    }
                  );
                  this.subscribe(
                    "xd.liveChatPluginUpdatePageTitle",
                    function subscribe_$1(message) {
                      _this._handleUpdatePageTitle(message);
                    }
                  );

                  if (require("sdk.UA").iphone()) {
                    this.subscribe(
                      "xd.liveChatPluginBlurComposer",
                      function subscribe_$1(_message) {
                        _this._handleBlurComposer();
                      }
                    );
                  }

                  this.subscribe("xd.mpn.resizeIframe", function subscribe_$1(
                    message
                  ) {
                    _this._handleResizeIframe(message);
                  });
                  this.subscribe("xd.mpn.setAppearance", function subscribe_$1(
                    message
                  ) {
                    _this._handleSetAppearance(message);
                  });
                  this.subscribe("xd.mpn.prepareIframe", function subscribe_$1(
                    message
                  ) {
                    _this._handlePrepareIframe(message);
                  });
                  this.subscribe(
                    "xd.mpn.prepareIconIframe",
                    function subscribe_$1(message) {
                      _this._handlePrepareIconIframe(message);
                    }
                  );
                  this.subscribe("xd.mpn.storeState", function subscribe_$1(
                    message
                  ) {
                    _this._storeStateInfo(message.state);
                  });
                  this.subscribe("xd.mpn.getState", function subscribe_$1(_) {
                    var state = _this._getStateInfo();
                    var event = {
                      name: "mpnDidFetchState",
                      params: ES("JSON", "stringify", false, state || {})
                    };

                    postMessageToDialogFrame(event);
                    postMessaegToBubbleFrame(event);
                  });
                  this.subscribe("xd.mpn.reload", function subscribe_$1(
                    message
                  ) {
                    var iframeSrc = _this._iframe.src;

                    var storage = require("sdk.WebStorage").getLocalStorage();
                    var localState = null;
                    if (storage != null) {
                      try {
                        localState = storage.getItem(
                          require("MPNLocalState").LOCAL_STATE_KEY
                        );
                      } catch (_unused) {}
                    }
                    var iframeSrcUri = new (require("sdk.URI"))(iframeSrc);
                    var queryData = iframeSrcUri.getQueryData();
                    queryData.local_state = localState;
                    queryData.request_time = Date.now();
                    if (message.hasExplicitInteraction) {
                      queryData.has_explicit_interaction = "1";
                    }
                    iframeSrcUri.setQueryData(queryData);
                    _this._iframe.src = iframeSrcUri.valueOf();
                  });
                },

                _handleSetAppearance: function _handleSetAppearance(message) {
                  if (message.isReparse == "true") {
                    _visibilityGuard = null;
                  }
                  if (message.shouldSetHidden == "true") {
                    var alignment = message.alignment,
                      chatStarted = message.chatStarted,
                      isMobile = message.isMobile,
                      hidden = message.hidden,
                      mobilePath = message.mobilePath;
                    _mobilePath = mobilePath;
                    _isHidden = hidden == "true";
                    if (hidden == "true") {
                      this._iframe.style.removeProperty("animation");
                      this._handleHideDialogIframe({
                        chatStarted: chatStarted,
                        isMobile: isMobile,
                        alignment: alignment
                      });
                    } else {
                      this._handleShowDialogIframe({
                        chatStarted: chatStarted,
                        isMobile: isMobile,
                        alignment: alignment
                      });
                    }
                  }
                  if (message.shadow != null) {
                    this._handleShadowUpdate({
                      resetShadow: message.shadow
                    });
                  }
                },

                _handlePrepareIframe: function _handlePrepareIframe(message) {
                  _visibilityGuard = null;
                  if (this._iframe) {
                    this._iframe.setAttribute("data-testid", "dialog_iframe");
                    this._iframe.style.cssText = message.cssText;
                  }
                  _dialogIFrame = this._iframe;
                  _dialogIFrameName = this._iframe.name;
                  _mobilePath = message.path;

                  require("sdk.DOM").removeCss(
                    _dialogIFrame,
                    LEFT_ANCHOR_CLASS
                  );
                  require("sdk.DOM").removeCss(
                    _dialogIFrame,
                    RIGHT_ANCHOR_CLASS
                  );
                  if (message.alignment != null) {
                    require("sdk.DOM").addCss(
                      _dialogIFrame,
                      message.alignment == "right"
                        ? RIGHT_ANCHOR_CLASS
                        : LEFT_ANCHOR_CLASS
                    );
                  }

                  if (
                    _browserSupportsAnimation &&
                    message.isMobile === "true" &&
                    !_isHidden &&
                    _mobilePath == LANDING_PAGE
                  ) {
                    var bounceInAnimationName = _getBounceInAnimationName(
                      message.isMobile === "true",

                      "right"
                    );

                    bounceInAnimationName != null &&
                      require("sdk.DOM").addCss(
                        _dialogIFrame,
                        bounceInAnimationName
                      );
                  }

                  if (
                    message.isMobile === "true" &&
                    !_isHidden &&
                    _mobilePath != LANDING_PAGE &&
                    _mobilePath != BUBBLE
                  ) {
                    setParentDocumentPositionFixed();
                  }

                  if (_isIframeHidden) {
                    CustomerChat.hide();
                  }
                },

                _handlePrepareIconIframe: function _handlePrepareIconIframe(
                  message
                ) {
                  var _this2 = this;
                  if (_bubbleDialog) {
                    require("sdk.DOM").remove(_bubbleDialog);
                  }
                  var iconDiv = document.createElement("div");
                  var created = require("sdk.DialogUtils").setupNewDialog();
                  _dialogIFrameName = this._iframeOptions.name;
                  _bubbleIFrameName = "blank_" + message.frameName;
                  var css = ES("JSON", "parse", false, message.cssText);
                  _iconInnerIFrame = require("sdk.createIframe")({
                    url: this._getBubbleFrameURL(),
                    name: _bubbleIFrameName,
                    root: created.contentRoot,
                    tabindex: -1,
                    width: 60,
                    style: css,
                    "data-testid": "bubble_iframe",
                    onload: function onload() {
                      _bubbleIFrameLoaded = true;
                      _this2._notifyDialogFrame();
                      window.setTimeout(function window_setTimeout_$0() {
                        require("sdk.DOM").remove(iconDiv);
                      }, 100);
                    }
                  });

                  this._bubbleDialog = created.dialogElement;
                  _bubbleDialog = this._bubbleDialog;
                  _bubbleIFrame = this._bubbleDialog;
                  require("sdk.DOM").setStyle(
                    this._bubbleDialog,
                    "overflow",
                    "visible"
                  );
                  require("sdk.DOM").setStyle(
                    this._bubbleDialog,
                    "z-index",
                    css.zIndex
                  );
                  if (message.uiPolishEnabled === "true") {
                    require("sdk.DOM").addCss(
                      _iconInnerIFrame,
                      "fb_customer_chat_icon"
                    );
                  }
                  require("sdk.Content").append(this._bubbleDialog);
                  if (message.iconSVG != null) {
                    require("sdk.DOM").html(iconDiv, message.iconSVG);
                    ES("Object", "assign", false, iconDiv.style, css);
                    iconDiv.style.boxShadow = "";
                    require("sdk.DOM").setStyle(iconDiv, "z-index", "1");
                    require("sdk.Content").append(iconDiv, created.contentRoot);
                  }

                  _unreadCountIFrameName = "unread_" + message.frameName;
                  _unreadCountIFrame = require("sdk.createIframe")({
                    url: this._getBubbleFrameURL(),
                    name: _unreadCountIFrameName,
                    root: created.contentRoot,
                    tabindex: -1,
                    style: ES(
                      "JSON",
                      "parse",
                      false,
                      message.unreadCountCssText
                    ),
                    "data-testid": "unread_iframe",
                    onload: function onload() {
                      _badgeIFrameLoaded = true;
                      _this2._notifyDialogFrame();
                    }
                  });

                  require("sdk.Content").append(
                    _unreadCountIFrame,
                    created.contentRoot
                  );
                },

                _handleResizeIframe: function _handleResizeIframe(message) {
                  if (this._iframe) {
                    require("sdk.DOM").setStyle(
                      this._iframe,
                      "height",
                      ES("JSON", "parse", false, message.height) + "px"
                    );
                  }
                },

                _handleSetIframeBoxShadow: function _handleSetIframeBoxShadow() {
                  if (this._iframe) {
                    require("sdk.DOM").setStyle(
                      this._iframe,
                      "boxShadow",
                      "0 1pt 12pt grey"
                    );
                    require("sdk.DOM").setStyle(this._iframe, "margin", "12px");
                  }
                },

                _handleUnsetIframeBoxShadow: function _handleUnsetIframeBoxShadow() {
                  if (this._iframe) {
                    require("sdk.DOM").setStyle(
                      this._iframe,
                      "boxShadow",
                      "none"
                    );
                    require("sdk.DOM").setStyle(
                      this._iframe,
                      "margin",
                      "0px 12px"
                    );
                  }
                },

                _handleShowDialogIframe: function _handleShowDialogIframe(
                  message
                ) {
                  showDialog(
                    this._iframe,
                    ES("JSON", "parse", false, message.chatStarted),
                    ES("JSON", "parse", false, message.isMobile),
                    true,
                    message.alignment
                  );
                },

                _handleHideDialogIframe: function _handleHideDialogIframe(
                  message
                ) {
                  hideDialog(
                    this._iframe,
                    ES("JSON", "parse", false, message.chatStarted),
                    ES("JSON", "parse", false, message.isMobile),
                    true,
                    message.alignment
                  );
                },

                _handleShadowUpdate: function _handleShadowUpdate(message) {
                  if (
                    ES("JSON", "parse", false, message.resetShadow) &&
                    this._bubbleDialog
                  ) {
                    require("sdk.DOM").setStyle(
                      this._bubbleDialog,
                      "borderRadius",
                      "50%"
                    );

                    if (_browserSupportsAnimation) {
                      require("sdk.DOM").addCss(
                        this._bubbleDialog,
                        "fb_customer_chat_bubble_animated_no_badge"
                      );
                    } else {
                      require("sdk.DOM").setStyle(
                        this._bubbleDialog,
                        "boxShadow",
                        "0px 3px 12px rgba(0, 0, 0, 0.15)"
                      );
                    }
                  } else if (!ES("JSON", "parse", false, message.resetShadow)) {
                    this._setBubbleBadgeStyle();
                  }
                },

                _handleUpdatePageTitle: function _handleUpdatePageTitle(
                  message
                ) {
                  var _this3 = this;
                  if (!_blinkerToken && message.titleText) {
                    _blinkerToken = require("sdk.DocumentTitle").blink(
                      message.titleText
                    );
                    require("DOMEventListener").add(
                      window,
                      "focus",
                      function DOMEventListener_add_$2(e) {
                        _this3._stopBlinking();
                      }
                    );
                  } else if (_blinkerToken && !message.titleText) {
                    this._stopBlinking();
                  }
                },

                _handleBlurComposer: function _handleBlurComposer() {
                  require("sdk.DOM").setStyle(
                    this._iframe,
                    "maxHeight",
                    "100%"
                  );
                },

                _notifyDialogFrame: function _notifyDialogFrame() {
                  var _iconInnerIFrame2, _unreadCountIFrame2;
                  postMessageToDialogFrame({
                    name: "bubbleFrameLoaded",
                    frameName: _bubbleIFrameLoaded ? _bubbleIFrameName : null,
                    unreadCountFrameName: _badgeIFrameLoaded
                      ? _unreadCountIFrameName
                      : null,
                    iconSrc:
                      (_iconInnerIFrame2 = _iconInnerIFrame) == null
                        ? void 0
                        : _iconInnerIFrame2.src,
                    unreadSrc:
                      (_unreadCountIFrame2 = _unreadCountIFrame) == null
                        ? void 0
                        : _unreadCountIFrame2.src
                  });
                },

                _getBubbleFrameURL: function _getBubbleFrameURL() {
                  return require("sdk.Runtime").getIsVersioned()
                    ? require("UrlMap").resolve("www") +
                        "/" +
                        require("sdk.Runtime").getVersion() +
                        "/plugins/customer_chat/bubble"
                    : "";
                },

                _createBubbleDialogIframe: function _createBubbleDialogIframe(
                  fromIframe
                ) {
                  var _this4 = this;
                  var created = require("sdk.DialogUtils").setupNewDialog();

                  require("sdk.DOM").setStyle(
                    created.contentRoot,
                    "background",
                    "none"
                  );

                  _dialogIFrameName = this._iframeOptions.name;
                  _bubbleIFrameName = "blank_" + _dialogIFrameName;

                  require("sdk.createIframe")({
                    url: this._getBubbleFrameURL(),
                    name: _bubbleIFrameName,
                    root: created.contentRoot,
                    tabindex: -1,
                    width: 60,
                    "data-testid": "bubble_iframe",
                    onload: function onload() {
                      _bubbleIFrameLoaded = true;
                      _this4._notifyDialogFrame();
                    }
                  });

                  ES("Object", "assign", false, created.dialogElement.style, {
                    background: "none",
                    borderRadius: "50%",
                    bottom: "18pt",
                    display: "none",
                    height: "45pt",
                    padding: "0",
                    position: "fixed",
                    right: "18pt",
                    top: "auto",
                    width: "45pt",
                    zIndex: "2147483646"
                  });

                  if (_browserSupportsAnimation) {
                    require("sdk.DOM").removeCss(
                      created.dialogElement,
                      "fb_customer_chat_bubble_animated_with_badge"
                    );

                    require("sdk.DOM").addCss(
                      created.dialogElement,
                      "fb_customer_chat_bubble_animated_no_badge"
                    );
                  } else {
                    require("sdk.DOM").setStyle(
                      created.dialogElement,
                      "boxShadow",
                      "0px 3px 12px rgba(0, 0, 0, 0.15)"
                    );
                  }
                  return created.dialogElement;
                },

                _setBubbleBadgeStyle: function _setBubbleBadgeStyle() {
                  if (this._bubbleDialog) {
                    require("sdk.DOM").setStyle(
                      this._bubbleDialog,
                      "borderRadius",
                      "50% 0% 50% 50%"
                    );

                    if (_browserSupportsAnimation) {
                      require("sdk.DOM").removeCss(
                        this._bubbleDialog,
                        "fb_customer_chat_bubble_animated_no_badge"
                      );

                      require("sdk.DOM").addCss(
                        this._bubbleDialog,
                        "fb_customer_chat_bubble_animated_with_badge"
                      );
                    } else {
                      require("sdk.DOM").setStyle(
                        this._bubbleDialog,
                        "boxShadow",
                        "-5px 4px 14px rgba(0, 0, 0, 0.15)"
                      );
                    }
                  }
                },

                _stopBlinking: function _stopBlinking() {
                  if (_blinkerToken) {
                    _blinkerToken.stop();
                    _blinkerToken = null;
                  }
                },

                _storeStateInfo: function _storeStateInfo(message) {
                  var storage = require("sdk.WebStorage").getLocalStorageForRead();
                  if (!storage) {
                    return;
                  }
                  try {
                    if (message == null) {
                      storage.removeItem(
                        require("MPNLocalState").LOCAL_STATE_KEY
                      );
                    } else {
                      var currState = storage.getItem(
                        require("MPNLocalState").LOCAL_STATE_KEY
                      );
                      if (currState == null) {
                        storage.setItem(
                          require("MPNLocalState").LOCAL_STATE_KEY,
                          ES(
                            "JSON",
                            "stringify",
                            false,
                            ES("JSON", "parse", false, message)
                          )
                        );
                      } else {
                        var parsedCurrentState = ES(
                          "JSON",
                          "parse",
                          false,
                          currState
                        );
                        var parsedMessage = ES("JSON", "parse", false, message);
                        storage.setItem(
                          require("MPNLocalState").LOCAL_STATE_KEY,
                          ES(
                            "JSON",
                            "stringify",
                            false,
                            babelHelpers["extends"](
                              {},
                              parsedCurrentState,
                              parsedMessage
                            )
                          )
                        );
                      }
                    }
                  } catch (_unused2) {
                    return;
                  }
                },

                _getStateInfo: function _getStateInfo() {
                  var storage = require("sdk.WebStorage").getLocalStorageForRead();
                  if (!storage) {
                    return;
                  }
                  var item = storage.getItem(
                    require("MPNLocalState").LOCAL_STATE_KEY
                  );
                  if (!item) {
                    return null;
                  }
                  return ES("JSON", "parse", false, item);
                },

                getParams: function getParams() {
                  return {
                    allow_guests: "bool",
                    attribution: "string",
                    greeting_dialog_display: "string",
                    greeting_dialog_delay: "string",
                    logged_in_greeting: "string",
                    logged_out_greeting: "string",
                    minimized: "bool",
                    page_id: "string",
                    theme_color: "string",
                    override: "string",
                    attribution_version: "string"
                  };
                }
              });

              function postMessageToIframe(frameName, message) {
                var pmf = function pmf(origin) {
                  var _window$frames$frameN;
                  (_window$frames$frameN = window.frames[frameName]) == null
                    ? void 0
                    : _window$frames$frameN.postMessage(
                        babelHelpers["extends"](
                          {},

                          message
                        ),

                        origin
                      );
                };
                if (_dialogIFrameOrigin === null) {
                  require("getFacebookOriginForTarget")(
                    function getFacebookOriginForTarget_$0(origin) {
                      _dialogIFrameOrigin = origin;
                      pmf(_dialogIFrameOrigin);
                    },
                    window.frames[frameName]
                  );
                } else {
                  pmf(_dialogIFrameOrigin);
                }
              }

              function postMessaegToBubbleFrame(message) {
                postMessageToIframe(_bubbleIFrameName, message);
              }

              function postMessageToDialogFrame(message) {
                postMessageToIframe(_dialogIFrameName, message);
              }

              function handleSDKCall(event) {
                postMessageToDialogFrame({
                  name: "CustomerChat.SDK.Called",
                  event: event
                });
              }

              function setParentDocumentPositionFixed() {
                _savedScrollXPosition =
                  window.pageXOffset !== undefined
                    ? window.pageXOffset
                    : document.documentElement &&
                      document.documentElement.scrollLeft;
                _savedScrollYPosition =
                  window.pageYOffset !== undefined
                    ? window.pageYOffset
                    : document.documentElement &&
                      document.documentElement.scrollTop;
                var mobile_overlay = "fb_new_ui_mobile_overlay_active";
                require("sdk.DOM").addCss(document.body, mobile_overlay);
              }

              function resetParentDocumentPosition() {
                var mobile_overlay = "fb_new_ui_mobile_overlay_active";
                require("sdk.DOM").removeCss(document.body, mobile_overlay);
              }

              function _getBounceInAnimationName(isMobile, alignment) {
                var bounceInAnimationName;
                if (isMobile) {
                  switch (_mobilePath) {
                    case LANDING_PAGE:
                      return "fb_mpn_mobile_landing_page_slide_up";
                    case WELCOME_PAGE:
                    case BUBBLE:
                    case ITP_PAGE:
                      return null;
                    default:
                      return "fb_mpn_mobile_bounce_in";
                  }
                } else {
                  switch (alignment) {
                    case "left":
                      bounceInAnimationName =
                        "fb_customer_chat_bounce_in_from_left";
                      break;
                    case "right":
                    default:
                      bounceInAnimationName = "fb_customer_chat_bounce_in_v2";
                  }
                }
                return bounceInAnimationName;
              }

              function _getBounceOutAnimationName(isMobile, alignment) {
                var bounceOutAnimationName;
                if (isMobile) {
                  switch (_mobilePath) {
                    case LANDING_PAGE:
                      return alignment === "left"
                        ? "fb_mpn_mobile_landing_page_slide_out_from_left"
                        : "fb_mpn_mobile_landing_page_slide_out";
                    case BUBBLE:
                      return "fb_mpn_mobile_bounce_out_v2";
                    default:
                      return "fb_mpn_mobile_bounce_out";
                  }
                } else {
                  switch (alignment) {
                    case "left":
                      bounceOutAnimationName =
                        "fb_customer_chat_bounce_out_from_left";
                      break;
                    case "right":
                    default:
                      bounceOutAnimationName = "fb_customer_chat_bounce_out_v2";
                  }
                }
                return bounceOutAnimationName;
              }

              function showDialog(
                dialogIframe,
                chatStarted,
                isMobile,
                fireEvent,
                alignment
              ) {
                if (fireEvent === void 0) {
                  fireEvent = true;
                }
                if (!dialogIframe) {
                  return;
                }

                if (alignment == null) {
                  if (
                    require("sdk.DOM").containsCss(
                      dialogIframe,
                      LEFT_ANCHOR_CLASS
                    )
                  ) {
                    alignment = "left";
                  } else {
                    alignment = "right";
                  }
                }

                if (_visibilityGuard === null || _visibilityGuard === false) {
                  if (
                    isMobile &&
                    (chatStarted ||
                      _showInterstitialOnPage ||
                      (_mobilePath !== LANDING_PAGE && _mobilePath !== BUBBLE))
                  ) {
                    setParentDocumentPositionFixed();
                  }

                  if (_browserSupportsAnimation) {
                    var bounceInAnimationName = _getBounceInAnimationName(
                      isMobile,
                      alignment
                    );

                    var bounceOutAnimationName = _getBounceOutAnimationName(
                      isMobile,
                      alignment
                    );

                    require("sdk.DOM").removeCss(
                      dialogIframe,
                      bounceOutAnimationName
                    );
                    bounceInAnimationName != null &&
                      require("sdk.DOM").addCss(
                        dialogIframe,
                        bounceInAnimationName
                      );
                  }
                  if (isMobile) {
                    require("sdk.DOM").setStyle(
                      dialogIframe,
                      "maxHeight",
                      "100%"
                    );
                    require("sdk.DOM").setStyle(dialogIframe, "width", "100%");
                  } else {
                    require("sdk.DOM").setStyle(
                      dialogIframe,
                      "maxHeight",
                      DIALOG_FRAME_MAX_HEIGHT
                    );
                    require("sdk.DOM").setStyle(
                      dialogIframe,
                      "minHeight",
                      DIALOG_FRAME_MIN_HEIGHT
                    );
                  }

                  postMessageToDialogFrame({
                    name: "CustomerChat.isDialogHidden",
                    params: { is_dialog_hidden: false }
                  });

                  postMessaegToBubbleFrame({
                    name: "CustomerChat.isDialogHidden",
                    params: { is_dialog_hidden: false }
                  });

                  _visibilityGuard = true;
                }

                if (fireEvent) {
                  require("sdk.Event").fire("customerchat.dialogShow");
                }
              }

              function hideDialog(
                iframe,
                chatStarted,
                isMobile,
                fireEvent,
                alignment
              ) {
                if (fireEvent === void 0) {
                  fireEvent = true;
                }
                var dialogIframe = iframe;
                if (!dialogIframe) {
                  return;
                }

                if (alignment == null) {
                  if (
                    require("sdk.DOM").containsCss(
                      dialogIframe,
                      LEFT_ANCHOR_CLASS
                    )
                  ) {
                    alignment = "left";
                  } else {
                    alignment = "right";
                  }
                }

                if (_visibilityGuard === null || _visibilityGuard === true) {
                  if (
                    isMobile &&
                    (chatStarted ||
                      _showInterstitialOnPage ||
                      _mobilePath !== LANDING_PAGE)
                  ) {
                    resetParentDocumentPosition();
                  }
                  if (!_browserSupportsAnimation) {
                    require("sdk.DOM").setStyle(dialogIframe, "maxHeight", "0");
                    require("sdk.DOM").setStyle(dialogIframe, "minHeight", "0");
                    _visibilityGuard = false;
                  } else {
                    var _hideDialog = function _hideDialog(e) {
                      if (_isHidden) {
                        require("sdk.DOM").setStyle(
                          dialogIframe,
                          "maxHeight",
                          "0"
                        );
                        require("sdk.DOM").setStyle(
                          dialogIframe,
                          "minHeight",
                          "0"
                        );
                        ANIMATION_EVENTS.forEach(
                          function ANIMATION_EVENTS_forEach_$0(event) {
                            require("DOMEventListener").remove(
                              dialogIframe,
                              event,
                              _hideDialog
                            );
                          }
                        );
                        _visibilityGuard = false;
                      }
                    };
                    var bounceInAnimationName = _getBounceInAnimationName(
                      isMobile,
                      alignment
                    );

                    var bounceOutAnimationName = _getBounceOutAnimationName(
                      isMobile,
                      alignment
                    );

                    bounceInAnimationName != null &&
                      require("sdk.DOM").removeCss(
                        dialogIframe,
                        bounceInAnimationName
                      );
                    require("sdk.DOM").addCss(
                      dialogIframe,
                      bounceOutAnimationName
                    );
                    ANIMATION_EVENTS.forEach(
                      function ANIMATION_EVENTS_forEach_$0(event) {
                        require("DOMEventListener").add(
                          dialogIframe,
                          event,
                          _hideDialog
                        );
                      }
                    );
                  }
                  postMessageToDialogFrame({
                    name: "CustomerChat.isDialogHidden",
                    params: { is_dialog_hidden: true }
                  });

                  postMessaegToBubbleFrame({
                    name: "CustomerChat.isDialogHidden",
                    params: { is_dialog_hidden: true }
                  });
                }

                if (fireEvent) {
                  require("sdk.Event").fire("customerchat.dialogHide");
                }
              }

              CustomerChat.show = function(shouldShowDialog) {
                if (shouldShowDialog === void 0) {
                  shouldShowDialog = true;
                }
                _isIframeHidden = false;
                if (_bubbleIFrame != null) {
                  require("sdk.DOM").setStyle(
                    _bubbleIFrame,
                    "display",
                    "inline"
                  );
                }
                if (shouldShowDialog) {
                  _isHidden = false;
                  showDialog(
                    _dialogIFrame,
                    _chatStarted,
                    require("sdk.UA").mobile(),
                    false
                  );
                }
                require("sdk.Event").fire("customerchat.show");
                handleSDKCall("show");
              };

              CustomerChat.hide = function() {
                _isIframeHidden = true;
                if (_bubbleIFrame != null) {
                  require("sdk.DOM").setStyle(_bubbleIFrame, "display", "none");
                }
                _isHidden = true;
                hideDialog(
                  _dialogIFrame,
                  _chatStarted,
                  require("sdk.UA").mobile(),
                  false
                );
                require("sdk.Event").fire("customerchat.hide");
                handleSDKCall("hide");
              };

              CustomerChat.showDialog = function() {
                if (_bubbleIFrame != null) {
                  require("sdk.DOM").setStyle(
                    _bubbleIFrame,
                    "display",
                    "inline"
                  );
                }
                _isHidden = false;
                showDialog(
                  _dialogIFrame,
                  _chatStarted,
                  require("sdk.UA").mobile()
                );
                handleSDKCall("showDialog");
              };

              CustomerChat.hideDialog = function() {
                _isHidden = true;
                hideDialog(
                  _dialogIFrame,
                  _chatStarted,
                  require("sdk.UA").mobile()
                );
                handleSDKCall("hideDialog");
              };

              CustomerChat.update = function(data) {
                require("sdk.XD").sendToFacebook(_dialogIFrameName, {
                  method: "updateCustomerChat",
                  params: ES("JSON", "stringify", false, data || {})
                });

                handleSDKCall("update");
              };
              var _default = CustomerChat;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.LWIAdsCreation",
            ["IframePlugin", "sdk.createIframe"],
            function $module_sdk_XFBML_LWIAdsCreation(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var LWIAdsCreation = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);
                  this._setUpSubscriptions();
                },

                getParams: function getParams() {
                  return {
                    fbe_extras: "string",
                    fbe_redirect_uri: "string",
                    fbe_scopes: "string",
                    fbe_state: "string",
                    hide_manage_button: "bool"
                  };
                },

                _setUpSubscriptions: function _setUpSubscriptions() {
                  var _this = this;
                  this.subscribe(
                    "xd.lwiadscreation.load",
                    function subscribe_$1(message) {
                      _this._createIframe(message);
                    }
                  );
                },

                _createIframe: function _createIframe(message) {
                  require("sdk.createIframe")({
                    url: message.iframeURL,
                    name: "LWIAdsCreationRootIframe",
                    root: document.body,
                    height: 300,
                    width: 950
                  });
                }
              });
              var _default = LWIAdsCreation;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.LWIAdsInsights",
            ["IframePlugin", "sdk.createIframe"],
            function $module_sdk_XFBML_LWIAdsInsights(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var LWIAdsInsights = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);
                  this._setUpSubscriptions();
                },

                getParams: function getParams() {
                  return {
                    fbe_extras: "string",
                    fbe_redirect_uri: "string",
                    fbe_scopes: "string",
                    fbe_state: "string"
                  };
                },

                _setUpSubscriptions: function _setUpSubscriptions() {
                  var _this = this;
                  this.subscribe(
                    "xd.lwiadsinsights.load",
                    function subscribe_$1(message) {
                      _this._createIframe(message);
                    }
                  );
                },

                _createIframe: function _createIframe(message) {
                  require("sdk.createIframe")({
                    url: message.iframeURL,
                    name: "LWIAdsInsightsRootIframe",
                    root: document.body,
                    height: 800,
                    width: 1050
                  });
                }
              });
              var _default = LWIAdsInsights;
              module.exports = _default;
            },
            null
          );
          __d(
            "safeEval",
            [],
            function $module_safeEval(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              function safeEval(source, args) {
                if (source === null || typeof source === "undefined") {
                  return;
                }
                if (typeof source !== "string") {
                  return source;
                }

                if (
                  /^\w+$/.test(source) &&
                  typeof window[source] === "function"
                ) {
                  return window[source].apply(null, args || []);
                }

                return Function(
                  'return eval("' + source.replace(/\"/g, '\\"') + '");'
                ).apply(null, args || []);
              }

              module.exports = safeEval;
            },
            null
          );
          __d(
            "sdk.XFBML.LoginButton",
            [
              "IframePlugin",
              "Log",
              "guid",
              "safeEval",
              "sdk.Auth",
              "sdk.Dialog",
              "sdk.ErrorHandling",
              "sdk.Impressions",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.UIServer",
              "sdk.XD",
              "sdk.feature",
              "sdk.getContextType",
              "sdk.ui"
            ],
            function $module_sdk_XFBML_LoginButton(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var httpsOnlyLearnMore = require("sdk.feature")(
                "https_only_learn_more",
                ""
              );

              function invokeHandler(handler, scope, args) {
                if (handler) {
                  if (typeof handler === "string") {
                    require("sdk.ErrorHandling").unguard(require("safeEval"))(
                      handler,
                      args
                    );
                  } else if (handler.apply) {
                    require("sdk.ErrorHandling")
                      .unguard(handler)
                      .apply(scope, args || []);
                  }
                }
              }

              function prepareCall(params, iframe_name, cb) {
                params.id = require("guid")();
                params.plugin_prepare = true;
                params.origin = require("sdk.getContextType")();
                params.domain = location.hostname;
                params.fallback_redirect_uri = document.location.href;

                var enableE2E = require("sdk.feature")("e2e_tracking", true);
                if (enableE2E) {
                  params.e2e = {};
                }

                var popup_cb = function popup_cb(response) {
                  if (call != null) {
                    require("sdk.XD").sendToFacebook(iframe_name, {
                      method: "loginComplete",
                      params: ES("JSON", "stringify", false, {
                        frame_name: call.id,
                        status: require("sdk.Runtime").getLoginStatus()
                      })
                    });
                  }

                  cb(response);
                };

                var call = require("sdk.UIServer").prepareCall(
                  params,
                  popup_cb
                );
                if (call != null) {
                  call.dims = {};
                  call.dims.screenX = window.screenX;
                  call.dims.screenY = window.screenY;
                  call.dims.outerWidth = window.outerWidth;
                  call.dims.outerHeight = window.outerHeight;
                  call.dims.screenWidth = window.screen.width;
                }

                require("sdk.XD").sendToFacebook(iframe_name, {
                  method: "loginButtonStateInit",
                  params: ES("JSON", "stringify", false, { call: call })
                });
              }

              var LoginButton = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  if (location.protocol !== "https:") {
                    var httpsWarning =
                      "The Login Button plugin no longer works on http pages. " +
                      "Please update your site to use https for Facebook Login. %s";

                    require("Log").log(
                      "error",
                      -1,
                      httpsWarning,
                      httpsOnlyLearnMore
                    );

                    if (
                      require("sdk.feature")("https_only_scribe_logging", true)
                    ) {
                      require("sdk.Scribe").log("jssdk_error", {
                        appId: require("sdk.Runtime").getClientID(),
                        error: "HttpsOnly",
                        extra: {
                          message: "LoginButton"
                        }
                      });
                    }
                  }

                  this.parent(elem, ns, tag, attr);
                  var onlogin = require("sdk.PluginUtils").getVal(
                    attr,
                    "on_login"
                  );
                  var cb = null;
                  var iframeName = this._iframeOptions.name;
                  if (onlogin) {
                    cb = function cb(response) {
                      if (response.error_code) {
                        require("Log").debug(
                          "Plugin Return Error (%s): %s",
                          response.error_code,
                          response.error_message || response.error_description
                        );

                        return;
                      }

                      invokeHandler(onlogin, null, [response]);
                    };

                    this.subscribe("login.status", cb);
                  }

                  var dialog_open_cb = function dialog_open_cb(response) {
                    invokeHandler(cb, null, [response]);
                    require("sdk.XD").sendToFacebook(iframeName, {
                      method: "loginReload",
                      params: ES("JSON", "stringify", false, response)
                    });
                  };

                  this.subscribe(
                    "xd.login_button_dialog_open",
                    function subscribe_$1(msg) {
                      require("sdk.ui")(
                        ES("JSON", "parse", false, msg.params),
                        function ui_$1(response) {
                          require("sdk.XD").sendToFacebook(iframeName, {
                            method: "loginComplete",
                            params: "{}"
                          });

                          dialog_open_cb(response);
                        }
                      );
                    }
                  );

                  this.subscribe(
                    "xd.login_button_prepare_call",
                    function subscribe_$1(msg) {
                      var params = ES("JSON", "parse", false, msg.params);
                      var paramsCopyForClosure = msg.params;

                      prepareCall(params, iframeName, dialog_open_cb);

                      require("sdk.Auth").subscribe(
                        "status.change",
                        function Auth_subscribe_$1(response) {
                          var closureParams = ES(
                            "JSON",
                            "parse",
                            false,
                            paramsCopyForClosure
                          );
                          closureParams.logger_id = require("guid")();
                          if (
                            response != null &&
                            response.status != null &&
                            response.status !== "connected"
                          ) {
                            prepareCall(
                              closureParams,
                              iframeName,
                              dialog_open_cb
                            );
                          }
                        }
                      );
                    }
                  );

                  this.subscribe("xd.login_button_click", function subscribe_$1(
                    msg
                  ) {
                    var params = ES("JSON", "parse", false, msg.params);
                    if (params.popup) {
                      if (require("sdk.feature")("e2e_tracking", true)) {
                        var dialog = require("sdk.Dialog").get(params.call.id);
                        dialog.subscribe(
                          "e2e:end",
                          function dialog_subscribe_$1(events) {
                            events.method = params.call.params.method;
                            events.display = params.call.params.display;
                            require("Log").debug(
                              "e2e: %s",
                              ES("JSON", "stringify", false, events)
                            );

                            require("sdk.Impressions").log(114, {
                              payload: events
                            });
                          }
                        );
                      }
                    } else {
                      if (
                        require("sdk.feature")(
                          "popup_blocker_scribe_logging",
                          true
                        )
                      ) {
                        require("sdk.Scribe").log("jssdk_error", {
                          appId: require("sdk.Runtime").getClientID(),
                          error: "POPUP_MAYBE_BLOCKED_NEW",
                          extra: {
                            call: params.call.name
                          }
                        });
                      }
                    }
                  });

                  var refreshCb = function refreshCb() {
                    invokeHandler(cb, null, [
                      {
                        status: require("sdk.Runtime").getLoginStatus(),
                        authResponse: require("sdk.Auth").getAuthResponse()
                      }
                    ]);
                  };

                  this.subscribe("xd.login_button_connected", refreshCb);

                  this.subscribe(
                    "xd.login_button_popup_closed",
                    function subscribe_$1() {
                      require("sdk.Auth").getLoginStatus(refreshCb, true);
                    }
                  );
                },

                shouldIgnoreWidth: function shouldIgnoreWidth() {
                  return false;
                },

                getParams: function getParams() {
                  return {
                    scope: "string",
                    asset_scope: "string",
                    perms: "string",
                    size: "string",
                    login_text: "text",
                    show_faces: "bool",
                    max_rows: "string",
                    show_login_face: "bool",
                    show_login_numbers: "bool",
                    registration_url: "url_maybe",
                    auto_logout_link: "bool",
                    one_click: "bool",
                    show_banner: "bool",
                    auth_type: "string",
                    default_audience: "string",
                    use_continue_as: "bool",
                    layout: "string",
                    button_type: "string",
                    width: "px",
                    height: "px",
                    force_confirmation: "bool",
                    messenger_page_id: "string",
                    reset_messenger_state: "bool"
                  };
                }
              });
              var _default = LoginButton;
              module.exports = _default;
            },
            null
          );
          __d(
            "isNode",
            [],
            function $module_isNode(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = isNode;

              function isNode(object) {
                var _object$ownerDocument, _doc$defaultView;
                var doc =
                  object != null
                    ? (_object$ownerDocument = object.ownerDocument) != null
                      ? _object$ownerDocument
                      : object
                    : document;
                var defaultView =
                  (_doc$defaultView = doc.defaultView) != null
                    ? _doc$defaultView
                    : window;
                return !!(
                  object != null &&
                  (typeof defaultView.Node === "function"
                    ? object instanceof defaultView.Node
                    : typeof object === "object" &&
                      typeof object.nodeType === "number" &&
                      typeof object.nodeName === "string")
                );
              }
            },
            null
          );
          __d(
            "isTextNode",
            ["isNode"],
            function $module_isTextNode(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = isTextNode;

              function isTextNode(object) {
                return require("isNode")(object) && object.nodeType == 3;
              }
            },
            null
          );
          __d(
            "containsNode",
            ["isTextNode"],
            function $module_containsNode(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              module.exports = containsNode;

              function containsNode(outerNode, innerNode) {
                if (!outerNode || !innerNode) {
                  return false;
                } else if (outerNode === innerNode) {
                  return true;
                } else if (require("isTextNode")(outerNode)) {
                  return false;
                } else if (require("isTextNode")(innerNode)) {
                  return containsNode(outerNode, innerNode.parentNode);
                } else if ("contains" in outerNode) {
                  return ES(outerNode, "contains", true, innerNode);
                } else if (outerNode.compareDocumentPosition) {
                  return !!(outerNode.compareDocumentPosition(innerNode) & 16);
                } else {
                  return false;
                }
              }
            },
            null
          );
          __d(
            "sdk.XFBML.Quote",
            [
              "DOMEventListener",
              "IframePlugin",
              "containsNode",
              "sdk.DOM",
              "sdk.UA",
              "sdk.XD",
              "sdk.feature"
            ],
            function $module_sdk_XFBML_Quote(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var QUOTABLE_CLASS_NAME = "fb-quotable";
              var PLUGIN_WIDTH = 155;
              var PLUGIN_HEIGHT = 70;

              var selection = "";
              var singleton = null;
              var quotableAreas = [];
              var forceShow = false;
              var xfbmlElement = null;
              var isMobile = require("sdk.UA").mobile();

              function getSelectionParent(selectionObject) {
                var range = selectionObject.getRangeAt(0);
                var container = range.startContainer;

                return container.nodeType === 3
                  ? container.parentNode
                  : container;
              }

              function handleSelection(ev) {
                if (!document.getSelection || isMobile) {
                  return;
                }
                var selectionObject = document.getSelection();
                if (selectionObject.rangeCount === 0) {
                  clearSelection();
                  return;
                }
                var areasLength = quotableAreas.length;
                clearSelection();

                if (areasLength) {
                  var areaMatch = false;
                  for (var i = 0; i < areasLength; i++) {
                    if (
                      require("containsNode")(
                        quotableAreas[i],
                        selectionObject.focusNode
                      )
                    ) {
                      areaMatch = true;
                      break;
                    }
                  }
                  if (!areaMatch) {
                    return;
                  }
                }

                selection = selectionObject.toString();
                if (selection === "") {
                  clearSelection();
                  return;
                }

                selection = selection
                  .toString()
                  .replace(/\s+/g, " ")
                  .trim();

                var selectionLimit = Number(
                  require("sdk.feature")("sharequotelimit", 500)
                );
                if ([].concat(selection).length > selectionLimit) {
                  var truncate = [].concat(selection);
                  truncate.length = selectionLimit - 3;
                  selection = truncate.join("") + "...";
                }

                if (!forceShow && xfbmlElement) {
                  getSelectionParent(selectionObject).appendChild(xfbmlElement);

                  var flyoutPosition = getFlyoutPosition(selectionObject);
                  xfbmlElement.style.left = flyoutPosition.x + "px";
                  xfbmlElement.style.top = flyoutPosition.y + "px";
                }
              }

              function getFlyoutPosition(selectionObject) {
                var sizedPlugin = xfbmlElement && xfbmlElement.offsetWidth;
                var pluginHeight = sizedPlugin
                  ? xfbmlElement.offsetHeight
                  : PLUGIN_HEIGHT;
                var pluginWidth = sizedPlugin
                  ? xfbmlElement.offsetWidth
                  : PLUGIN_WIDTH;
                var range = selectionObject.getRangeAt(0);
                var measuringStartSpan = document.createElement("span");
                var measuringEndSpan = document.createElement("span");
                var tmpStartRange = document.createRange();
                tmpStartRange.setStart(range.startContainer, range.startOffset);
                tmpStartRange.insertNode(measuringStartSpan);
                var tmpEndRange = document.createRange();
                tmpEndRange.setStart(range.endContainer, range.endOffset);
                tmpEndRange.insertNode(measuringEndSpan);
                var y = measuringStartSpan.offsetTop - pluginHeight;
                var x =
                  measuringStartSpan.offsetLeft +
                  (measuringEndSpan.offsetLeft -
                    measuringStartSpan.offsetLeft) /
                    2 -
                  pluginWidth / 2;
                measuringStartSpan.parentNode.removeChild(measuringStartSpan);
                measuringEndSpan.parentNode.removeChild(measuringEndSpan);
                return { x: x, y: y };
              }

              function clearSelection() {
                selection = "";
                if (!forceShow && xfbmlElement) {
                  xfbmlElement.style.left = "-9999px";
                }
              }

              var Quote = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  var _this = this;
                  if (singleton) {
                    return singleton;
                  }
                  this.parent(elem, ns, tag, attr);
                  forceShow =
                    require("sdk.DOM").getAttr(elem, "layout") === "button";
                  xfbmlElement = elem;

                  xfbmlElement.style.position = "absolute";
                  xfbmlElement.style.display = "";

                  require("DOMEventListener").add(
                    document,
                    "keyup",
                    handleSelection
                  );
                  require("DOMEventListener").add(
                    document,
                    "mouseup",
                    handleSelection
                  );

                  this.subscribe(
                    "xd.getTextSelection",
                    function subscribe_$1() {
                      require("sdk.XD").sendToFacebook(
                        _this._iframeOptions.name,
                        {
                          method: "setTextSelection",
                          params: ES("JSON", "stringify", false, {
                            text: selection
                          })
                        }
                      );

                      clearSelection();
                    }
                  );

                  quotableAreas = ES(
                    "Array",
                    "from",
                    false,
                    document.getElementsByTagName("*")
                  ).filter(function filter_$0(element) {
                    return (
                      element.nodeName.toLowerCase() === "article" ||
                      require("sdk.DOM").containsCss(
                        element,
                        QUOTABLE_CLASS_NAME
                      )
                    );
                  });

                  clearSelection();

                  singleton = this;
                  return singleton;
                },

                getParams: function getParams() {
                  return {
                    href: "url",
                    layout: "string"
                  };
                }
              });

              module.exports = Quote;
            },
            null
          );
          __d(
            "sdk.XFBML.Save",
            [
              "IframePlugin",
              "UrlMap",
              "sdk.Content",
              "sdk.DOM",
              "sdk.DialogUtils",
              "sdk.Event",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.XD",
              "sdk.createIframe"
            ],
            function $module_sdk_XFBML_Save(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var positionIntervalID;

              var Save = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  var _this = this;
                  this.parent(elem, ns, tag, attr);
                  var isMobile = require("sdk.UA").mobile();

                  this.subscribe(
                    "xd.savePluginGetBlankIframe",
                    function subscribe_$1(message) {
                      var darkOverlay;
                      var show = function show(e) {
                        if (e) {
                          require("sdk.DOM").removeCss(e, "fb_invisible");
                        }
                      };
                      var hide = function hide(e) {
                        if (e) {
                          require("sdk.DOM").addCss(e, "fb_invisible");
                        }
                      };

                      if (isMobile) {
                        darkOverlay = require("sdk.DialogUtils").setupNewDarkOverlay();
                        hide(darkOverlay);
                        require("sdk.Content").append(darkOverlay);
                        require("sdk.DialogUtils").addDoubleClickAction(
                          darkOverlay,
                          function DialogUtils_addDoubleClickAction_$1() {
                            return allNodes.forEach(hide);
                          },
                          5000
                        );
                      }

                      var dialog = _this.setupNewIframeDialog(
                        ES("JSON", "parse", false, message.data),
                        message.fromIframe
                      );

                      hide(dialog);
                      require("sdk.Content").append(dialog);

                      var allNodes = [dialog, darkOverlay];

                      var hideDialog = function hideDialog() {
                        allNodes.forEach(hide);
                        require("sdk.DialogUtils").onDialogHideCleanup(
                          isMobile
                        );
                        window.clearInterval(positionIntervalID);
                      };

                      var idleEvent;
                      _this.subscribe(
                        "xd.savePluginShowIframe",
                        function _this_subscribe_$1() {
                          require("sdk.Event").fire("savePlugin:hideDialog");
                          allNodes.forEach(show);
                          _this.positionOnScreen(dialog, darkOverlay);

                          if (!isMobile && !idleEvent) {
                            idleEvent = require("sdk.DialogUtils").addIdleDesktopAction(
                              dialog,
                              hideDialog,
                              7000
                            );
                          }
                        }
                      );
                      _this.subscribe(
                        "xd.savePluginHideIframe",
                        function _this_subscribe_$1() {
                          return hideDialog();
                        }
                      );

                      require("sdk.Event").subscribe(
                        "savePlugin:hideDialog",
                        function Event_subscribe_$1() {
                          return hideDialog();
                        }
                      );

                      var searchIframeTimer = window.setInterval(
                        function window_setInterval_$0() {
                          var searchIframe = document.getElementsByName(
                            message.fromIframe
                          );
                          if (searchIframe.length === 0) {
                            window.clearInterval(searchIframeTimer);
                            hideDialog();
                            allNodes.forEach(function allNodes_forEach_$0(
                              elem
                            ) {
                              elem && elem.parentNode.removeChild(elem);
                            });
                          }
                        },
                        500
                      );
                    }
                  );
                },

                positionOnScreen: function positionOnScreen(
                  dialog,
                  darkOverlay
                ) {
                  var isMobile = require("sdk.UA").mobile();
                  if (isMobile) {
                    var centerMobile = function centerMobile(
                      dialog,
                      darkOverlay
                    ) {
                      if (darkOverlay != null) {
                        require("sdk.DialogUtils").setDialogPositionToCenter(
                          darkOverlay,
                          isMobile
                        );
                      }
                      require("sdk.DialogUtils").setDialogPositionToCenter(
                        dialog,
                        isMobile
                      );
                    };

                    centerMobile(dialog, darkOverlay);
                    require("sdk.DialogUtils").addMobileOrientationChangeAction(
                      function DialogUtils_addMobileOrientationChangeAction_$0(
                        e
                      ) {
                        centerMobile(dialog, darkOverlay);
                      }
                    );

                    positionIntervalID = window.setInterval(
                      function window_setInterval_$0() {
                        return centerMobile(dialog, darkOverlay);
                      },
                      100
                    );
                  } else {
                    require("sdk.DOM").setStyle(dialog, "position", "fixed");
                    require("sdk.DOM").setStyle(dialog, "top", "20px");
                    require("sdk.DOM").setStyle(dialog, "right", "20px");
                  }
                },

                getOverlayIFrameURL: function getOverlayIFrameURL() {
                  return (
                    require("UrlMap").resolve("www") +
                    (require("sdk.Runtime").getIsVersioned()
                      ? "/" + require("sdk.Runtime").getVersion()
                      : "") +
                    "/plugins/save/overlay" +
                    "?app_id=" +
                    require("sdk.Runtime").getClientID()
                  );
                },

                setupNewIframeDialog: function setupNewIframeDialog(
                  data,
                  fromIframe
                ) {
                  var _this2 = this;
                  var created = require("sdk.DialogUtils").setupNewDialog();

                  var onloadFunc = function onloadFunc() {
                    require("sdk.XD").sendToFacebook(fromIframe, {
                      method: "saveOverlayIFrameAck",
                      params: ES("JSON", "stringify", false, {
                        name: "overlay_" + _this2._iframeOptions.name
                      })
                    });
                  };

                  require("sdk.createIframe")({
                    url: this.getOverlayIFrameURL(),
                    name: "overlay_" + this._iframeOptions.name,
                    root: created.contentRoot,
                    tabindex: -1,
                    onload: ES(onloadFunc, "bind", true, this)
                  });

                  require("sdk.DOM").addCss(
                    created.contentRoot,
                    "fb_dialog_iframe"
                  );

                  ES(
                    "Object",
                    "assign",
                    false,
                    created.dialogElement.style,
                    data.style || {}
                  );
                  require("sdk.DOM").setStyle(
                    created.dialogElement,
                    "width",
                    data.width + "px"
                  );
                  require("sdk.DOM").setStyle(
                    created.dialogElement,
                    "height",
                    data.height + "px"
                  );
                  data.classList.forEach(function data_classList_forEach_$0(
                    cl
                  ) {
                    return require("sdk.DOM").addCss(created.dialogElement, cl);
                  });

                  require("sdk.DOM").removeCss(
                    created.dialogElement,
                    "fb_dialog_advanced"
                  );
                  return created.dialogElement;
                },

                getParams: function getParams() {
                  return {
                    uri: "url",
                    url_category: "string",
                    size: "string"
                  };
                }
              });
              var _default = Save;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.ShareButton",
            ["IframePlugin"],
            function $module_sdk_XFBML_ShareButton(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              "use strict";

              var ShareButton = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);
                },

                getParams: function getParams() {
                  return {
                    href: "url",
                    layout: "string",
                    mobile_iframe: "bool",
                    type: "string",
                    size: "string"
                  };
                }
              });
              var _default = ShareButton;
              module.exports = _default;
            },
            null
          );
          __d(
            "sdk.XFBML.Video",
            [
              "Assert",
              "IframePlugin",
              "ObservableMixin",
              "sdk.Event",
              "sdk.XD"
            ],
            function $module_sdk_XFBML_Video(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports
            ) {
              var VideoCache = (function() {
                function VideoCache(initData) {
                  this.$VideoCache_isMuted = initData.isMuted;
                  this.$VideoCache_volume = initData.volume;
                  this.$VideoCache_timePosition = initData.timePosition;
                  this.$VideoCache_duration = initData.duration;
                }
                var _proto = VideoCache.prototype;
                _proto.update = function update(data) {
                  if (data.isMuted !== undefined) {
                    this.$VideoCache_isMuted = data.isMuted;
                  }
                  if (data.volume !== undefined) {
                    this.$VideoCache_volume = data.volume;
                  }
                  if (data.timePosition !== undefined) {
                    this.$VideoCache_timePosition = data.timePosition;
                  }
                  if (data.duration !== undefined) {
                    this.$VideoCache_duration = data.duration;
                  }
                };
                _proto.isMuted = function isMuted() {
                  return this.$VideoCache_isMuted;
                };
                _proto.getVolume = function getVolume() {
                  return this.$VideoCache_isMuted ? 0 : this.$VideoCache_volume;
                };
                _proto.getCurrentPosition = function getCurrentPosition() {
                  return this.$VideoCache_timePosition;
                };
                _proto.getDuration = function getDuration() {
                  return this.$VideoCache_duration;
                };
                return VideoCache;
              })();
              var VideoController = (function() {
                function VideoController(iframeName, observableMixin, cache) {
                  this.$VideoController_iframeName = iframeName;
                  this.$VideoController_sharedObservable = observableMixin;
                  this.$VideoController_cache = cache;
                }
                var _proto2 = VideoController.prototype;
                _proto2.play = function play() {
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "play",
                      params: ES("JSON", "stringify", false, {})
                    }
                  );
                };
                _proto2.pause = function pause() {
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "pause",
                      params: ES("JSON", "stringify", false, {})
                    }
                  );
                };
                _proto2.seek = function seek(target) {
                  require("Assert").isNumber(target, "Invalid argument");
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "seek",
                      params: ES("JSON", "stringify", false, {
                        target: target
                      })
                    }
                  );
                };
                _proto2.mute = function mute() {
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "mute",
                      params: ES("JSON", "stringify", false, {})
                    }
                  );
                };
                _proto2.unmute = function unmute() {
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "unmute",
                      params: ES("JSON", "stringify", false, {})
                    }
                  );
                };
                _proto2.setVolume = function setVolume(volume) {
                  require("Assert").isNumber(volume, "Invalid argument");
                  require("sdk.XD").sendToFacebook(
                    this.$VideoController_iframeName,
                    {
                      method: "setVolume",
                      params: ES("JSON", "stringify", false, {
                        volume: volume
                      })
                    }
                  );
                };
                _proto2.isMuted = function isMuted() {
                  return this.$VideoController_cache.isMuted();
                };
                _proto2.getVolume = function getVolume() {
                  return this.$VideoController_cache.getVolume();
                };
                _proto2.getCurrentPosition = function getCurrentPosition() {
                  return this.$VideoController_cache.getCurrentPosition();
                };
                _proto2.getDuration = function getDuration() {
                  return this.$VideoController_cache.getDuration();
                };
                _proto2.subscribe = function subscribe(event, callback) {
                  var _this = this;
                  require("Assert").isString(event, "Invalid argument");
                  require("Assert").isFunction(callback, "Invalid argument");
                  this.$VideoController_sharedObservable.subscribe(
                    event,
                    callback
                  );
                  return {
                    release: function release() {
                      _this.$VideoController_sharedObservable.unsubscribe(
                        event,
                        callback
                      );
                    }
                  };
                };
                return VideoController;
              })();

              var Video = require("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);
                  this._videoController = null;
                  this._sharedObservable = null;
                  this._sharedVideoCache = null;
                  this.subscribe("xd.onVideoAPIReady", function subscribe_$1(
                    msg
                  ) {
                    this._sharedObservable = new (require("ObservableMixin"))();
                    this._sharedVideoCache = new VideoCache(
                      ES("JSON", "parse", false, msg.data)
                    );
                    this._videoController = new VideoController(
                      this._iframeOptions.name,
                      this._sharedObservable,
                      this._sharedVideoCache
                    );

                    require("sdk.Event").fire("xfbml.ready", {
                      type: "video",
                      id: attr.id,
                      instance: this._videoController
                    });
                  });
                  this.subscribe("xd.stateChange", function subscribe_$1(msg) {
                    this._sharedObservable.inform(msg.state);
                  });
                  this.subscribe(
                    "xd.cachedStateUpdateRequest",
                    function subscribe_$1(msg) {
                      this._sharedVideoCache.update(
                        ES("JSON", "parse", false, msg.data)
                      );
                    }
                  );
                },

                getParams: function getParams() {
                  return {
                    allowfullscreen: "bool",
                    autoplay: "bool",
                    controls: "bool",
                    href: "url",
                    show_captions: "bool",
                    show_text: "bool"
                  };
                },

                getConfig: function getConfig() {
                  return {
                    fluid: true,
                    full_width: true
                  };
                }
              });
              var _default = Video;
              module.exports = _default;
            },
            null
          );
          __d(
            "legacy:fb.xfbml.plugins",
            [
              "IframePlugin",
              "PluginConfig",
              "PluginTags",
              "XFBML",
              "sdk.XFBML.Comments",
              "sdk.XFBML.CommentsCount",
              "sdk.XFBML.CustomerChat",
              "sdk.XFBML.LWIAdsCreation",
              "sdk.XFBML.LWIAdsInsights",
              "sdk.XFBML.LoginButton",
              "sdk.XFBML.Quote",
              "sdk.XFBML.Save",
              "sdk.XFBML.ShareButton",
              "sdk.XFBML.Video",
              "sdk.feature"
            ],
            function $module_legacy_fb_xfbml_plugins(
              global,
              require,
              requireDynamic,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports
            ) {
              var customTags = {
                comments: require("sdk.XFBML.Comments"),
                comments_count: require("sdk.XFBML.CommentsCount"),
                login_button: require("sdk.XFBML.LoginButton"),
                customerchat: require("sdk.XFBML.CustomerChat"),

                lwi_ads_creation: require("sdk.XFBML.LWIAdsCreation"),
                lwi_ads_insights: require("sdk.XFBML.LWIAdsInsights"),
                quote: require("sdk.XFBML.Quote"),
                save: require("sdk.XFBML.Save"),
                share_button: require("sdk.XFBML.ShareButton"),
                video: require("sdk.XFBML.Video")
              };

              var blacklist = require("sdk.feature")(
                "plugin_tags_blacklist",
                []
              );

              Object.keys(require("PluginTags")).forEach(function forEach_$0(
                tag
              ) {
                if (blacklist.indexOf(tag) !== -1) {
                  return;
                }
                require("XFBML").registerTag({
                  xmlns: "fb",
                  localName: tag.replace(/_/g, "-"),
                  ctor: require("IframePlugin").withParams(
                    require("PluginTags")[tag],
                    require("PluginConfig")[tag]
                  )
                });
              });

              Object.keys(customTags).forEach(function forEach_$0(tag) {
                if (blacklist.indexOf(tag) !== -1) {
                  return;
                }
                require("XFBML").registerTag({
                  xmlns: "fb",
                  localName: tag.replace(/_/g, "-"),
                  ctor: customTags[tag]
                });
              });
            },
            3
          );
        }
      }.call(global));
    })(window.inDapIF ? parent.window : window, window);
} catch (e) {
  var i = new Image();
  i.crossOrigin = "anonymous";
  i.dataset.testid = "fbSDKErrorReport";
  i.src =
    "https://www.facebook.com/platform/scribe_endpoint.php/?c=jssdk_error&m=" +
    encodeURIComponent(
      '{"error":"LOAD", "extra": {"name":"' +
        e.name +
        '","line":"' +
        (e.lineNumber || e.line) +
        '","script":"' +
        (e.fileName || e.sourceURL || e.script) +
        '","stack":"' +
        (e.stackTrace || e.stack) +
        '","revision":"1003781883","namespace":"FB","message":"' +
        e.message +
        '"}}'
    );
  document.body.appendChild(i);
}
