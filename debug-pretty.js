/*1752649174,,JIT Construction: v1024796659,en_US*/

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
    (function () {
      var apply = Function.prototype.apply;
      function bindContext(fn, thisArg) {
        return function _sdkBound() {
          return apply.call(fn, thisArg, arguments);
        };
      }
      var global = {
        __type: "JS_SDK_SANDBOX",
        window: window,
        document: window.document,
      };
      var sandboxSafelist = [
        "setTimeout",
        "setInterval",
        "clearTimeout",
        "clearInterval",
      ];
      for (var i = 0; i < sandboxSafelist.length; i++) {
        global[sandboxSafelist[i]] = bindContext(
          window[sandboxSafelist[i]],
          window,
        );
      }
      (function () {
        var self = window;
        var globalThis = this;
        var __DEV__ = 1;
        function emptyFunction() {}
        var __transform_includes = {};
        var __annotator, __bodyWrapper;
        var __w, __t;
        var undefined;
        with (this) {
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           * This file contains the functions used for the generic JS function
           * transform. Please add your functionality to these functions if you
           * want to wrap or annotate functions.
           *
           * Please see the DEX https://fburl.com/80903169 for more information.
           *
           * @provides GenericFunctionVisitor
           * @requires TypeChecker
           * @polyfillUAs
           *
           * @nolint
           */

          (function (globalScope) {
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
                  : undefined,
              );
            };

            var noopAnnotator = function noopAnnotator(fn, funcMeta, params) {
              return fn;
            };

            var genericAnnotator = function genericAnnotator(
              fn,
              funcMeta,
              params,
            ) {
              if ("typechecks" in __transform_includes) {
                var meta = getMeta(
                  funcMeta ? funcMeta.name : undefined,
                  params,
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

            var codeUsageBodyWrapper = function codeUsageBodyWrapper(
              scope,
              args,
              fn,
              params,
              funcMeta,
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
              globalScope.__annotator = noopAnnotator;
              globalScope.__bodyWrapper = noopBodyWrapper;
            } else {
              globalScope.__annotator = genericAnnotator;

              if ("codeusage" in __transform_includes) {
                globalScope.__annotator = noopAnnotator;
                globalScope.__bodyWrapper = codeUsageBodyWrapper;
                globalScope.__bodyWrapper.getCodeUsage = function () {
                  return funcCalls;
                };
                globalScope.__bodyWrapper.clearCodeUsage = function () {
                  funcCalls = {};
                };
              } else {
                globalScope.__bodyWrapper = noopBodyWrapper;
              }
            }
          })(
            typeof globalThis !== "undefined"
              ? globalThis
              : typeof global !== "undefined"
                ? global
                : typeof window !== "undefined"
                  ? window
                  : typeof this !== "undefined"
                    ? this
                    : typeof self !== "undefined"
                      ? self
                      : {},
          );
          (function (globalScope) {
            globalScope.__t = function (x) {
              return x[0];
            };
            globalScope.__w = function (x) {
              return x;
            };
          })(
            typeof globalThis !== "undefined"
              ? globalThis
              : typeof global !== "undefined"
                ? global
                : typeof window !== "undefined"
                  ? window
                  : typeof this !== "undefined"
                    ? this
                    : typeof self !== "undefined"
                      ? self
                      : {},
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           * This is a lightweigh implementation of require and __d which is used by the
           * JavaScript SDK.
           * This implementation requires that all modules are defined in order by how
           * they depend on each other, so that it is guaranteed that no module will
           * require a module that has not got all of its dependencies satisfied.
           * This means that it is generally only usable in cases where all resources are
           * resolved and packaged together.
           *
           *
           * @format
           * @oncall jsinfra
           * @providesInline fbmodule-runtime-lite
           */

          (function (global) {
            var map = {};

            var defaultCJSDeps = [
              "global",
              "require",
              "requireDynamic",
              "requireLazy",
              "module",
              "exports",
            ];

            var defaultESMDeps = [
              "global",
              "require",
              "importDefault",
              "importNamespace",
              "requireLazy",
              "module",
              "exports",
            ];

            var REQUIRE_WHEN_READY = 0x1;
            var ES_MODULE_IMPORTS = 0x20;
            var ES_MODULE_EXPORTS = 0x40;
            var DO_NOT_REDEFINE = 0x100;
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
              if (hasOwnProperty.call(map, id)) {
                var _special2 = map[id].special || 0;

                if (_special2 & DO_NOT_REDEFINE) {
                  return;
                }
              }
              if (typeof factory === "function") {
                map[id] = {
                  factory: factory,
                  deps: deps,
                  defaultExport: EMPTY,
                  exports: {},
                  special: _special || 0,
                  resolved: false,
                };

                if (_special != null && _special & REQUIRE_WHEN_READY) {
                  requireInterop.call(null, id);
                }
              } else {
                map[id] = {
                  defaultExport: factory,
                  exports: factory,
                  resolved: true,
                };
              }
            }

            function ifRequireable(id, cbYes, cbNo) {
              var module = getOrIntializeModule(id, true);

              if (module) {
                if (typeof cbYes === "function") {
                  return cbYes(requireInterop(id));
                }
              } else if (typeof cbNo === "function") {
                return cbNo();
              }
            }

            define(
              "ifRequireable",
              [],
              function () {
                return ifRequireable;
              },
              DO_NOT_REDEFINE,
            );

            global.__d = define;
            global.require = requireInterop;
            global.importDefault = importDefault;
            global.importNamespace = importNamespace;

            global.$RefreshReg$ = function () {};
            global.$RefreshSig$ = function () {
              return function (type) {
                return type;
              };
            };
          })(this);
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES5FunctionPrototype = {
                bind: function bind(context) {
                  if (typeof this !== "function") {
                    throw new TypeError("Bind must be called on a function");
                  }

                  var target = this;

                  var appliedArguments = Array.prototype.slice.call(
                    arguments,
                    1,
                  );
                  function bound() {
                    return target.apply(
                      context,

                      appliedArguments.concat(
                        Array.prototype.slice.call(arguments),
                      ),
                    );
                  }
                  bound.displayName =
                    "bound:" + (target.displayName || target.name || "(?)");

                  bound.toString = function toString() {
                    return "bound: " + target;
                  };
                  return bound;
                },
              };
              var _default = ES5FunctionPrototype;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES5StringPrototype = {
                startsWith: function startsWith(search) {
                  var string = String(this);

                  if (this == null) {
                    throw new TypeError(
                      "String.prototype.startsWith called on null or undefined",
                    );
                  }
                  var pos = arguments.length > 1 ? Number(arguments[1]) : 0;
                  if (isNaN(pos)) {
                    pos = 0;
                  }
                  var start = Math.min(Math.max(pos, 0), string.length);
                  return string.indexOf(String(search), pos) == start;
                },

                endsWith: function endsWith(search) {
                  var string = String(this);

                  if (this == null) {
                    throw new TypeError(
                      "String.prototype.endsWith called on null or undefined",
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
                },

                includes: function includes(search) {
                  if (this == null) {
                    throw new TypeError(
                      "String.prototype.contains called on null or undefined",
                    );
                  }

                  var string = String(this);
                  var pos = arguments.length > 1 ? Number(arguments[1]) : 0;
                  if (isNaN(pos)) {
                    pos = 0;
                  }
                  return string.indexOf(String(search), pos) != -1;
                },

                repeat: function repeat(count) {
                  if (this == null) {
                    throw new TypeError(
                      "String.prototype.repeat called on null or undefined",
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
                },
              };
              var _default = ES5StringPrototype;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
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
                    typeof Symbol === "function" &&
                    navigator.userAgent.indexOf("Trident/7.0") === -1
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
                },
              };
              var _default = ES6Array;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES6ArrayPrototype = {
                find: function find(predicate, thisArg) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.find called on null or undefined",
                    );
                  }
                  if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function");
                  }

                  var index = ES6ArrayPrototype.findIndex.call(
                    this,
                    predicate,
                    thisArg,
                  );

                  return index === -1 ? void 0 : this[index];
                },

                findIndex: function findIndex(predicate, thisArg) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.findIndex called on null or undefined",
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

                fill: function fill(value, _start, _end) {
                  if (this == null) {
                    throw new TypeError(
                      "Array.prototype.fill called on null or undefined",
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
                },
              };
              var _default = ES6ArrayPrototype;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var EPSILON = Math.pow(2, -52);

              var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
              var MIN_SAFE_INTEGER = -1 * MAX_SAFE_INTEGER;

              var ES6Number = {
                isFinite: (function (_isFinite) {
                  function isFinite(_x) {
                    return _isFinite.apply(this, arguments);
                  }
                  isFinite.toString = function () {
                    return _isFinite.toString();
                  };
                  return isFinite;
                })(function (value) {
                  return typeof value === "number" && isFinite(value);
                }),

                isNaN: (function (_isNaN) {
                  function isNaN(_x2) {
                    return _isNaN.apply(this, arguments);
                  }
                  isNaN.toString = function () {
                    return _isNaN.toString();
                  };
                  return isNaN;
                })(function (value) {
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
                MIN_SAFE_INTEGER: MIN_SAFE_INTEGER,
              };
              var _default = ES6Number;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           *
           * @format
           */ __d(
            "ES6Object",
            [],
            function $module_ES6Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES6Object = {
                assign: function assign(target) {
                  if (target == null) {
                    throw new TypeError(
                      "Object.assign target cannot be null or undefined",
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
                  }

                  return target;
                },

                is: function is(x, y) {
                  if (x === y) {
                    return x !== 0 || 1 / x === 1 / y;
                  } else {
                    return x !== x && y !== y;
                  }
                },
              };
              var _default = ES6Object;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES5Array = {
                isArray: function isArray(object) {
                  return (
                    Object.prototype.toString.call(object) == "[object Array]"
                  );
                },
              };
              var _default = ES5Array;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES5ArrayPrototype = {
                indexOf: function indexOf(val, idx) {
                  var index = idx;

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
                },
              };
              var _default = ES5ArrayPrototype;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           *
           * @format
           */ __d(
            "ES7ArrayPrototype",
            ["ES5Array", "ES5ArrayPrototype"],
            function $module_ES7ArrayPrototype(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var isArray = require("ES5Array").isArray;
              var indexOf = require("ES5ArrayPrototype").indexOf;

              function toLength(number) {
                return Math.min(
                  Math.max(toInteger(number), 0),
                  Number.MAX_SAFE_INTEGER,
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
                },
              };

              module.exports = ES7ArrayPrototype;
            },
            null,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           *
           * @format
           */ __d(
            "ES7Object",
            [],
            function $module_ES7Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES7Object = {
                entries: function entries(object) {
                  if (object == null) {
                    throw new TypeError("Object.entries called on non-object");
                  }

                  var entries = [];
                  for (var key in object) {
                    if (hasOwnProperty.call(object, key)) {
                      entries.push([key, object[key]]);
                    }
                  }
                  return entries;
                },

                values: function values(object) {
                  if (object == null) {
                    throw new TypeError("Object.values called on non-object");
                  }

                  var values = [];
                  for (var key in object) {
                    if (hasOwnProperty.call(object, key)) {
                      values.push(object[key]);
                    }
                  }
                  return values;
                },
              };
              var _default = ES7Object;
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
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
              exports,
            ) {
              var ES7StringPrototype = {
                trimLeft: function trimLeft() {
                  return this.replace(/^\s+/, "");
                },
                trimRight: function trimRight() {
                  return this.replace(/\s+$/, "");
                },
              };
              var _default = ES7StringPrototype;
              exports["default"] = _default;
            },
            66,
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
           * @noformat
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
              exports,
            ) {
              "use strict";

              var exports$1 = {};
              var module$1 = { exports: exports$1 };

              var define;

              function TROMPLE_MAIN() {
                (function () {
                  // Detect the `define` function exposed by asynchronous module loaders. The
                  // strict `define` check is necessary for compatibility with `r.js`.
                  var isLoader = typeof define === "function";

                  // A set of types used to distinguish objects from primitives.
                  var objectTypes = {
                    function: true,
                    object: true,
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
                            (value = function () {
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
                                    "\x00\b\n\f\r\t",
                                  ],
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
                          0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
                        ];
                        // Internal: Calculates the number of days between the Unix epoch and the
                        // first day of the given month.
                        var getDay = function (year, month) {
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
                        isProperty = function (property) {
                          var members = {},
                            constructor;
                          if (
                            ((members.__proto__ = null),
                            (members.__proto__ = {
                              // The *proto* property cannot be set multiple times in recent
                              // versions of Firefox and SeaMonkey.
                              toString: 1,
                            }),
                            members).toString != getClass
                          ) {
                            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                            // supports the mutable *proto* property.
                            isProperty = function (property) {
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
                            isProperty = function (property) {
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
                      forEach = function (object, callback) {
                        var size = 0,
                          Properties,
                          members,
                          property;

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
                          members = [
                            "valueOf",
                            "toString",
                            "toLocaleString",
                            "propertyIsEnumerable",
                            "isPrototypeOf",
                            "hasOwnProperty",
                            "constructor",
                          ];
                          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                          // properties.
                          forEach = function (object, callback) {
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
                          forEach = function (object, callback) {
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
                          forEach = function (object, callback) {
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
                                (property = "constructor"),
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
                          9: "\\t",
                        };

                        // Internal: Converts `value` into a zero-padded string such that its
                        // length is at least equal to `width`. The `width` must be <= 6.
                        var leadingZeroes = "000000";
                        var toPaddedString = function (width, value) {
                          // The `|| 0` expression is necessary to work around a bug in
                          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                          return (leadingZeroes + (value || 0)).slice(-width);
                        };

                        // Internal: Double-quotes a string `value`, replacing all ASCII control
                        // characters (characters with code unit values between 0 and 31) with
                        // their escaped equivalents. This is an implementation of the
                        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                        var unicodePrefix = "\\u00";
                        var quote = function (value) {
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
                        var serialize = function (
                          property,
                          object,
                          callback,
                          properties,
                          whitespace,
                          indentation,
                          stack,
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
                                      (date - getDay(year, 0)) / 30.42,
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
                                  stack,
                                );
                                results.push(
                                  element === undef ? "null" : element,
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
                              forEach(properties || value, function (property) {
                                var element = serialize(
                                  property,
                                  value,
                                  callback,
                                  properties,
                                  whitespace,
                                  indentation,
                                  stack,
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
                                      element,
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
                        exports.stringify = function (source, filter, width) {
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
                            [],
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
                          114: "\r",
                        };

                        // Internal: Stores the parser state.
                        var Index, Source;

                        // Internal: Resets the parser state and throws a `SyntaxError`.
                        var abort = function () {
                          Index = Source = null;
                          throw SyntaxError();
                        };

                        // Internal: Returns the next token, or `"$"` if the parser has reached
                        // the end of the source string. A token may be a string, number, `null`
                        // literal, or Boolean literal.
                        var lex = function () {
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
                                          "0x" + source.slice(begin, Index),
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
                        var get = function (value) {
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
                        var update = function (source, property, callback) {
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
                        var walk = function (source, property, callback) {
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
                              forEach(value, function (property) {
                                update(value, property, callback);
                              });
                            }
                          }
                          return callback.call(source, property, value);
                        };

                        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
                        exports.parse = function (source, callback) {
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
                                callback,
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
                        noConflict: function () {
                          if (!isRestored) {
                            isRestored = true;
                            root.JSON = nativeJSON;
                            root["JSON3"] = previousJSON;
                            nativeJSON = previousJSON = null;
                          }
                          return JSON3;
                        },
                      }),
                    );

                    root.JSON = {
                      parse: JSON3.parse,
                      stringify: JSON3.stringify,
                    };
                  }
                }).call(this);
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
            null,
          );
          /**
           * @generated by yarn - see http://fburl.com/js-libs-www
           * @flow
           * @nolint
           * @noformat
           */
          __d(
            "json3",
            ["json3-3.3.2"],
            function $module_json3(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              // this module should be typed via `json3.js.flow`, otherwise it's `any`
              module.exports = require("json3-3.3.2")() /*: any */;

              /*  */
            },
            null,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           *
           * @format
           * @oncall jssdk
           * @ServerCallableModule
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
              "json3",
            ],
            function $module_ES(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var toString = {}.toString;

              var methodCache = {
                "JSON.stringify": importDefault("json3").stringify,
                "JSON.parse": importDefault("json3").parse,
              };

              var es5Polyfills = {
                "Function.prototype": importDefault("ES5FunctionPrototype"),
                "String.prototype": importDefault("ES5StringPrototype"),
              };

              var es6Polyfills = {
                Object: importDefault("ES6Object"),
                "Array.prototype": importDefault("ES6ArrayPrototype"),
                Number: importDefault("ES6Number"),
                Array: importDefault("ES6Array"),
              };

              var es7Polyfills = {
                Object: importDefault("ES7Object"),
                "String.prototype": importDefault("ES7StringPrototype"),
                "Array.prototype": importDefault("ES7ArrayPrototype"),
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
                            pName),
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
                        _prop,
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
                      "Can't polyfill " + rhs + " directly on an Array.",
                    );
                  }
                } else {
                  if (typeof type === "string") {
                    propValue = methodCache[type + "." + rhs];
                  } else if (typeof lhs === "string") {
                    throw new Error(
                      "Can't polyfill " + rhs + " directly on a string.",
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
                  "Polyfill " +
                    type +
                    " does not have implementation of " +
                    rhs,
                );
              }
              _c = ES;
              var _c;
              $RefreshReg$(_c, "ES");
              exports["default"] = ES;
            },
            98,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           *
           * @format
           */ __d(
            "ES5Object",
            [],
            function $module_ES5Object(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var hasOwnProperty = {}.hasOwnProperty;

              var ES5Object = {
                create: function create(proto) {
                  if (__DEV__) {
                    if (arguments.length > 1) {
                      throw new Error(
                        "Object.create implementation supports only the first parameter",
                      );
                    }
                  }
                  var type = typeof proto;
                  if (type != "object" && type != "function") {
                    throw new TypeError(
                      "Object prototype may only be a Object or null",
                    );
                  }

                  F.prototype = proto;

                  return new F();
                },

                keys: function keys(object) {
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
                  return keys;
                },

                freeze: function freeze(object) {
                  return object;
                },

                isFrozen: function isFrozen() {
                  return false;
                },

                seal: function seal(object) {
                  return object;
                },
              };

              function F() {}
              _c = F;
              var _default = ES5Object;
              var _c;
              $RefreshReg$(_c, "F");
              exports["default"] = _default;
            },
            66,
          );
          /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           * @format
           * @ServerCallableModule
           */ __d(
            "sdk.babelHelpers",
            ["ES5FunctionPrototype", "ES5Object", "ES6Object"],
            function $module_sdk_babelHelpers(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var babelHelpers = {};
              var hasOwn = Object.prototype.hasOwnProperty;

              babelHelpers.inheritsLoose = function (subClass, superClass) {
                require("ES6Object").assign(subClass, superClass);
                subClass.prototype = require("ES5Object").create(
                  superClass && superClass.prototype,
                );
                subClass.prototype.constructor = subClass;
                subClass.__superConstructor__ = superClass;
                return superClass;
              };

              babelHelpers.inherits = babelHelpers.inheritsLoose;

              babelHelpers.wrapNativeSuper = function (Class) {
                var _cache = typeof Map === "function" ? new Map() : undefined;

                babelHelpers.wrapNativeSuper = function (Class) {
                  if (Class === null) {
                    return null;
                  }
                  if (typeof Class !== "function") {
                    throw new TypeError(
                      "Super expression must either be null or a function",
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

              babelHelpers.assertThisInitialized = function (self) {
                if (self === void 0) {
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                }
                return self;
              };

              babelHelpers._extends = require("ES6Object").assign;

              babelHelpers["extends"] = babelHelpers._extends;

              babelHelpers.construct = function (klass, arr) {
                var a = [null];
                a.push.apply(a, arr);
                return new (Function.prototype.bind.apply(klass, a))();
              };

              babelHelpers.objectWithoutPropertiesLoose = function (obj, keys) {
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

              babelHelpers.taggedTemplateLiteralLoose = function (
                strings,
                raw,
              ) {
                if (!raw) {
                  raw = strings.slice(0);
                }
                strings.raw = raw;
                return strings;
              };

              babelHelpers.bind = require("ES5FunctionPrototype").bind;

              module.exports = babelHelpers;
            },
            null,
          );
          var ES = require("ES");
          var babelHelpers = require("sdk.babelHelpers"); /**
           * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
           *
           * Provides specific iterators (String/Array) with fallback to a generic object
           * iterator.
           *
           * @provides iterator.enumerate
           * @requires Array
           *           Object.enumFix
           *           Object
           *           Object.es6
           * @polyfillUAs
           *
           * @nolint
           */

          (function (global, undefined) {
            var KIND_KEYS = "keys";
            var KIND_VALUES = "values";
            var KIND_ENTRIES = "entries";

            var ArrayIterators = (function () {
              var hasNative = hasNativeIterator(Array);
              var ArrayIterator;

              if (!hasNative) {
                ArrayIterator = (function () {
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
                  ] = function () {
                    return this;
                  };
                  return ArrayIterator;
                })();
              }

              return {
                keys: hasNative
                  ? function (array) {
                      return array.keys();
                    }
                  : function (array) {
                      return new ArrayIterator(array, KIND_KEYS);
                    },

                values: hasNative
                  ? function (array) {
                      return array.values();
                    }
                  : function (array) {
                      return new ArrayIterator(array, KIND_VALUES);
                    },

                entries: hasNative
                  ? function (array) {
                      return array.entries();
                    }
                  : function (array) {
                      return new ArrayIterator(array, KIND_ENTRIES);
                    },
              };
            })();

            var StringIterators = (function () {
              var hasNative = hasNativeIterator(String);
              var StringIterator;

              if (!hasNative) {
                StringIterator = (function () {
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

                    if (first < 0xd800 || first > 0xdbff || index + 1 === len) {
                      ret = s[index];
                    } else {
                      var second = s.charCodeAt(index + 1);
                      if (second < 0xdc00 || second > 0xdfff) {
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
                  ] = function () {
                    return this;
                  };
                  return StringIterator;
                })();
              }

              return {
                keys: function keys() {
                  throw TypeError(
                    "Strings default iterator doesn't implement keys.",
                  );
                },

                values: hasNative
                  ? function (string) {
                      return string[
                        typeof Symbol === "function"
                          ? Symbol.iterator
                          : "@@iterator"
                      ]();
                    }
                  : function (string) {
                      return new StringIterator(string);
                    },

                entries: function entries() {
                  throw TypeError(
                    "Strings default iterator doesn't implement entries.",
                  );
                },
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
            var ObjectIterator = (function () {
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
                    done: false,
                  };
                } else if (kind === KIND_ENTRIES) {
                  return {
                    value: [key, this.$ObjectIterator_iteratedObject[key]],
                    done: false,
                  };
                }
              };
              _proto3[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ] = function () {
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
              },
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

              generic: GenericIterators.entries,
            });

            global.FB_enumerate = enumerate;
          })(
            typeof global === "object"
              ? global
              : typeof this === "object"
                ? this
                : typeof window === "object"
                  ? window
                  : typeof self === "object"
                    ? self
                    : {},
          );
          /**
           * Copyright 2013-2014 Facebook, Inc.
           *
           * Provides polyfills for:
           * - ES6 implementations of Map/Set (https://caniuse.com/es6)
           *
           * @provides Collections.es6
           * @polyfillUAs old webkit modern
           * @preventMunge
           * @requires iterator.enumerate
           * @requires GenericFunctionVisitor
           *
           * @nolint
           */

          (function (global, undefined) {
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

            var Map = (function () {
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
              var Map = (function () {
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
                          "Expected iterable items to be pair objects.",
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
                    thisArg || undefined,
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
                ] = function () {
                  return this.entries();
                };
                return Map;
              })();
              var MapIterator = (function () {
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
                  if ((!this) instanceof Map) {
                    throw new TypeError(
                      "Expected to be called on a MapIterator.",
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
                ] = function () {
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
                        SECRET_SIZE_PROP,
                      )
                    ) {
                      map[SECRET_SIZE_PROP] = 0;
                    } else {
                      Object.defineProperty(map, SECRET_SIZE_PROP, {
                        value: 0,
                        writable: true,
                      });
                      Object.defineProperty(map, "size", {
                        set: function set(v) {
                          console.error(
                            "PLEASE FIX ME: You are changing the map size property which " +
                              "should not be writable and will break in production.",
                          );
                          throw new Error(
                            "The map size property is not writable.",
                          );
                        },
                        get: function get() {
                          return map[SECRET_SIZE_PROP];
                        },
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

              Map.__isES5 = (function () {
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

              var createHash = (function () {
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
                        value: hashCounter,
                      });
                    } else if (o.propertyIsEnumerable) {
                      o.propertyIsEnumerable = function () {
                        return propIsEnumerable.apply(this, arguments);
                      };
                      o.propertyIsEnumerable[hashProperty] = hashCounter;
                    } else if (isNode(o)) {
                      o[hashProperty] = hashCounter;
                    } else {
                      throw new Error(
                        "Unable to set a non-enumerable property on object.",
                      );
                    }
                    return hashCounter;
                  } else {
                    throw new Error(
                      "Non-extensible objects are not allowed as keys.",
                    );
                  }
                };
              })();

              return __annotator(Map, { name: "Map" });
            })();

            var Set = (function () {
              if (!shouldPolyfillES6Collection("Set")) {
                return windowObj.Set;
              }
              var Set = (function () {
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
                ] = function () {
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
          })(
            typeof globalThis !== "undefined"
              ? globalThis
              : typeof global !== "undefined"
                ? global
                : typeof window !== "undefined"
                  ? window
                  : typeof this !== "undefined"
                    ? this
                    : typeof self !== "undefined"
                      ? self
                      : {},
          );
          __d("JSSDKCanvasPrefetcherConfig", [], {
            enabled: true,
            excludedAppIds: [144959615576466, 768691303149786, 320528941393723],
            sampleRate: 500,
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
                "https:\/\/developers.facebook.com\/blog\/post\/2018\/06\/08\/enforce-https-facebook-login\/",
              https_only_scribe_logging: { rate: 1 },
              log_perf: { rate: 0.001 },
              use_x_xd: { rate: 100 },
              cache_auth_response: { rate: 100 },
              oauth_funnel_logger_version: 1,
              force_popup_to_canvas_apps_with_id: [],
              force_popup_to_all_canvas_app: false,
              max_oauth_dialog_retries: { rate: 100, value: 10 },
              plugin_tags_blacklist: [],
              idle_callback_wait_time_ms: 3000,
              chat_plugin_facade_timeout_ms: 8000,
              chat_plugin_facade_enabled_pageids: [
                "102493178867330",
                "107331571710078",
                "1032787970130843",
                "107771111665395",
                "261907812360345",
                "101305975654752",
                "275483104252055",
                "101664622285042",
                "112682113428700",
                "271628573687012",
                "385757598521443",
                "100545935690488",
              ],
              should_enable_ig_login_status_fetch: true,
              log_cookies_usage: { rate: 0.1 },
              allow_shadow_dom_for_apps_with_id: [
                520916077950649, 152351391599356, 132081130190180,
                468663283258845, 409976882430412, 189845245141894, 360467581347,
                274266067164,
              ],
              allow_shadow_dom: true,
            },
          });
          __d("JSSDKCssConfig", [], {
            rules:
              ".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0px;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:400;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}\u0040keyframes fb_transform{0\u0025{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n\n.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0px;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:lucida grande,tahoma,verdana,arial,sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:400;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}\u0040keyframes fb_transform{0\u0025{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n\n.fb_dialog{background:#525252b3;position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:700;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100\u0025;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/ya\/r\/3rhSv5V8j3o.gif) #fff no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:#0006;inset:0;min-height:100\u0025;position:absolute;width:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba),to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:#fff 0 1px 1px -1px inset;color:#fff;font:700 14px Helvetica,sans-serif;text-overflow:ellipsis;text-shadow:rgba(0,30,84,.296875) 0px -1px 0px;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2),to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:700 12px Helvetica,sans-serif;margin:2px -12px;padding:2px 6px 3px;text-shadow:rgba(0,30,84,.296875) 0px -1px 0px}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:700;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #4A4A4A;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4A4A4A;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/connect.facebook.net\/rsrc.php\/v4\/yD\/r\/t-wz8gw1xG1.png);background-position:50\u0025 50\u0025;background-repeat:no-repeat;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0)}to{transform:rotate(360deg)}}\n\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}\n",
            components: [
              "css:fb.css.base",
              "css:fb.css.dialog",
              "css:fb.css.iframewidget",
            ],
          });
          __d("JSSDKRuntimeConfig", [], {
            locale: "en_US",
            revision: "1024796659",
            rtl: false,
            sdkab: null,
            sdkns: "",
            sdkurl: "https:\/\/connect.facebook.net\/en_US\/sdk\/debug.js",
            scribeurl:
              "https:\/\/www.facebook.com\/platform\/scribe_endpoint.php\/",
          });
          __d("JSSDKXDConfig", [], {
            XXdUrl: "\/x\/connect\/xd_arbiter\/?version=46",
            useCdn: true,
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
            www_instagram: "www.instagram.com",
            social_plugin: "socialplugin.facebook.net",
          });
          __d("JSSDKShadowCssConfig", [], {
            "css:fb.shadow.css.fb_login_button":
              ".fb_login_button_container{align-content:center;align-items:center;border:0;color:#fff;display:flex;font-family:Roboto,Freight Sans LF Pro,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:700;margin:auto}.fb-button-main-element{display:flex;flex-wrap:nowrap;overflow:hidden}.fb-iframe-overlay{display:flex}.fb-button-main-element:hover{cursor:pointer}.fb-button-main-element:focus{filter:brightness(80\u0025)}.fb_button_label_element{align-items:center;display:flex;font-weight:700;justify-content:center}.fb_button_label{margin:auto;pointer-events:none}.fb_button_svg_logo{height:1.33em;margin-left:.4em;margin-right:.4em;padding:.065em}.login_fb_logo .f_logo_f{fill:transparent}.single_button_svg_logo{margin-bottom:.08em}\n",
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
              exports,
            ) {
              "use strict";

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
              exports.setRoot = setRoot;
              exports.getRoot = getRoot;
              exports.setWindow = setWindow;
              exports.getWindow = getWindow;
            },
            66,
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
              exports,
            ) {
              function dotAccess(head, path, create) {
                var stack = path.split(".");
                do {
                  var key = stack.shift();
                  head = head[key] || (create && (head[key] = {}));
                } while (stack.length && head);
                return head;
              }
              exports["default"] = dotAccess;
            },
            66,
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
              exports,
            ) {
              function guid() {
                if (
                  typeof crypto === "object" &&
                  typeof crypto.getRandomValues === "function" &&
                  typeof String.prototype.padStart === "function"
                ) {
                  var numbers = crypto.getRandomValues(new Uint32Array(2));

                  return (
                    "f" +
                    numbers[0].toString(16).padStart(8, "0") +
                    numbers[1].toString(16).padStart(8, "0")
                  );
                }

                return (
                  "f" +
                  (Math.random() * (1 << 30)).toString(16).replace(".", "")
                );
              }
              exports["default"] = guid;
            },
            66,
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
              exports,
            ) {
              var wrappers = {};

              function wrapFunction(fn, type, source) {
                var callee = type in wrappers ? wrappers[type](fn, source) : fn;

                return function () {
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

              wrapFunction.setWrapper = function (fn, type) {
                wrappers[type] = fn;
              };
              exports["default"] = wrapFunction;
            },
            66,
          );
          __d(
            "GlobalCallback",
            ["DOMWrapper", "dotAccess", "guid", "wrapFunction"],
            function $module_GlobalCallback(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var rootObject;
              var callbackPrefix;

              function setPrefix(prefix) {
                rootObject = importDefault("dotAccess")(
                  importNamespace("DOMWrapper").getWindow(),
                  prefix,
                  true,
                );
                callbackPrefix = prefix;
              }

              function create(fn, description) {
                if (!rootObject) {
                  setPrefix("__globalCallbacks");
                }
                var id = importDefault("guid")();
                rootObject[id] = importDefault("wrapFunction")(
                  fn,
                  "entry",
                  description != null ? description : "GlobalCallback",
                );

                return callbackPrefix + "." + id;
              }

              function remove(name) {
                var id = name.substring(callbackPrefix.length + 1);
                delete rootObject[id];
              }
              exports.setPrefix = setPrefix;
              exports.create = create;
              exports.remove = remove;
            },
            98,
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
              exports,
            ) {
              "use strict";

              var level = __DEV__ ? 3 : -1;

              var Level = {
                DEBUG: 3,
                INFO: 2,
                WARNING: 1,
                ERROR: 0,
              };

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

              function setLevel(l) {
                level = l;
              }

              var debug = ES(log, "bind", true, null, "debug", Level.DEBUG);

              var info = ES(log, "bind", true, null, "info", Level.INFO);

              var warn = ES(log, "bind", true, null, "warn", Level.WARNING);

              var error = ES(log, "bind", true, null, "error", Level.ERROR);
              exports.Level = Level;
              exports.log = log;
              exports.setLevel = setLevel;
              exports.debug = debug;
              exports.info = info;
              exports.warn = warn;
              exports.error = error;
            },
            66,
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
              exports,
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
                ucBrowser: /UCBrowser/i.test(uas),
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
                ucWeb: NaN,
              };
              var agent =
                /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
                  uas,
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

                getVersion.getVersionParts = function () {
                  return getVersionParts(versions[key]);
                };

                UA[key] = getVersion;
              });

              Object.keys(devices).map(function map_$0(key) {
                UA[key] = function () {
                  return devices[key];
                };
              });

              UA.mobile = function () {
                return (
                  devices.iphone || devices.ipad || devices.android || mobile
                );
              };

              UA.mTouch = function () {
                return devices.android || devices.iphone || devices.ipad;
              };
              UA.facebookInAppBrowser = function () {
                return devices.nativeApp || devices.nativeAndroidApp;
              };
              UA.inAppBrowser = function () {
                return (
                  devices.nativeApp ||
                  devices.nativeAndroidApp ||
                  devices.nativeInstagramApp
                );
              };
              UA.mBasic = function () {
                return !!(versions.ucWeb || versions.operaMini);
              };
              UA.instagram = function () {
                return devices.nativeInstagramApp;
              };
              UA.messenger = function () {
                return (
                  devices.nativeMessengeriOSApp ||
                  devices.nativeMessengerAndroidApp
                );
              };
              UA.isSupportedIABVersion = function (supportedVersion) {
                if (!UA.facebookInAppBrowser()) {
                  return false;
                }
                var fb4aVersionRaw = /(?:FBAV\/(\d+(\.\d+)+))/.exec(
                  navigator.userAgent,
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
              exports["default"] = _default;
            },
            66,
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
              exports,
            ) {
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
              }
              exports["default"] = domReady;
            },
            67,
          );
          __d(
            "sdk.Content",
            ["Log", "sdk.UA", "sdk.domReady"],
            function $module_sdk_Content(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var visibleRoot;
              var hiddenRoot;

              function append(content, root) {
                if (!root) {
                  if (!visibleRoot) {
                    visibleRoot = root = document.getElementById("fb-root");
                    if (!root) {
                      importNamespace("Log").warn(
                        'The "fb-root" div has not been created, auto-creating',
                      );

                      visibleRoot = root = document.createElement("div");
                      root.id = "fb-root";

                      if (importDefault("sdk.UA").ie() || !document.body) {
                        importDefault("sdk.domReady")(function domReady_$0() {
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
                    if (val != null) {
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
              exports.append = append;
              exports.appendHidden = appendHidden;
              exports.submitToTarget = submitToTarget;
            },
            98,
          );
          __d(
            "sdk.DOM",
            ["guid", "sdk.domReady"],
            function $module_sdk_DOM(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
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

              function dangerouslySetInnerHtml(dom, content) {
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
                  _dom.querySelectorAll(_tagName + "." + className),
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
                value,
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
                      for (var j = 0; j < sheet.cssRules.length; j++) {
                        var rule = sheet.cssRules[j];
                        if (rule instanceof CSSStyleRule) {
                          if (rule.selectorText === selectorText) {
                            rule.style.setProperty(
                              camelToDashed(styleProp),
                              value,
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
                          (value != null ? value : "") +
                          "}",
                        0,
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
                      shadowDom.host.id = importDefault("guid")();
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
                      : root.clientHeight,
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
              exports.getAttr = getAttr;
              exports.getBoolAttr = getBoolAttr;
              exports.dangerouslySetInnerHtml = dangerouslySetInnerHtml;
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
              exports.ready = importDefault("sdk.domReady");
            },
            98,
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
              exports,
            ) {
              var ManagedError = (function (_Error) {
                function ManagedError(message, innerError) {
                  var _this;
                  _this =
                    _Error.call(
                      this,
                      message !== null && message !== undefined ? message : "",
                    ) || this;
                  if (message !== null && message !== undefined) {
                    _this.message = message;
                  } else {
                    _this.message = "";
                  }
                  _this.innerError = innerError;
                  return _this;
                }
                babelHelpers.inheritsLoose(ManagedError, _Error);
                return ManagedError;
              })(babelHelpers.wrapNativeSuper(Error));
              exports["default"] = ManagedError;
            },
            66,
          );
          __d(
            "normalizeError",
            ["sdk.UA"],
            function $module_normalizeError(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function normalizeError(err) {
                var info = {
                  line: err.lineNumber || err.line,
                  message: err.message,
                  name: err.name,
                  script: err.fileName || err.sourceURL || err.script,
                  stack: err.stackTrace || err.stack,
                };

                info._originalError = err;

                var matches = /([\w:\.\/]+\.js):(\d+)/.exec(err.stack);
                if (importDefault("sdk.UA").chrome() && matches) {
                  info.script = matches[1];
                  info.line = parseInt(matches[2], 10);
                }

                for (var k in info) {
                  info[k] == null && delete info[k];
                }
                return info;
              }
              exports["default"] = normalizeError;
            },
            98,
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
              exports,
            ) {
              function ObservableMixin() {
                this.__observableEvents = {};
              }
              _c = ObservableMixin;

              ObservableMixin.prototype = {
                inform: function inform(what) {
                  var _this = this;
                  var args = Array.prototype.slice.call(arguments, 1);
                  var list = Array.prototype.slice.call(
                    this.getSubscribers(what),
                  );
                  var _loop = function _loop() {
                    if (list[i] === null) {
                      return 1;
                    }
                    if (__DEV__) {
                      list[i].apply(_this, args);
                    } else {
                      try {
                        list[i].apply(_this, args);
                      } catch (e) {
                        window.setTimeout(function window_setTimeout_$0() {
                          throw e;
                        }, 0);
                      }
                    }
                  };
                  for (var i = 0; i < list.length; i++) {
                    if (_loop()) continue;
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
                },
              };

              module.exports = ObservableMixin;
              var _c;
              $RefreshReg$(_c, "ObservableMixin");
            },
            null,
          );
          __d(
            "AssertionError",
            ["ManagedError"],
            function $module_AssertionError(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var AssertionError = (function (_ManagedError) {
                function AssertionError(message) {
                  return _ManagedError.call(this, message) || this;
                }
                babelHelpers.inheritsLoose(AssertionError, _ManagedError);
                return AssertionError;
              })(importDefault("ManagedError"));
              exports["default"] = AssertionError;
            },
            98,
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
              exports,
            ) {
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
              exports["default"] = sprintf;
            },
            66,
          );
          __d(
            "Assert",
            ["AssertionError", "sprintf"],
            function $module_Assert(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function assert(expression, message) {
                if (typeof expression !== "boolean" || expression === false) {
                  throw new (importDefault("AssertionError"))(message);
                }
                return expression;
              }

              function assertType(type, expression, message) {
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
                  message != null
                    ? message
                    : importDefault("sprintf")(
                        "Expression is of type %s, not %s",
                        actualType,
                        type,
                      ),
                );
                return expression;
              }

              function assertInstanceOf(type, expression, message) {
                assert(
                  expression instanceof type,
                  message != null ? message : "Expression not instance of type",
                );
                return expression;
              }

              function define(type, test) {
                Assert["is" + type] = test;

                Assert["maybe" + type] = function (expression, message) {
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
                maybeFunction: placeholder,
              };

              [
                "Boolean",
                "Function",
                "Number",
                "Object",
                "String",
                "Undefined",
              ].forEach(function forEach_$0(type) {
                define(
                  type,
                  ES(assertType, "bind", true, null, type.toLowerCase()),
                );
              });
              var _default = Assert;
              exports["default"] = _default;
            },
            98,
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
              exports,
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
                    : function () {
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
                    prototype,
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

                constructor.prototype.parent = function () {
                  this.parent = from.prototype.parent;
                  from.apply(this, arguments);
                };

                constructor.prototype.parentCall = function (method) {
                  return from.prototype[method].apply(
                    this,
                    Array.prototype.slice.call(arguments, 1),
                  );
                };

                constructor.extend = function (prototype, mixins) {
                  return _extend(this, prototype, mixins);
                };
                return constructor;
              }

              ES("Object", "assign", false, Type.prototype, {
                instanceOf: function instanceOf(type) {
                  return _instanceOf(type, this);
                },
              });

              ES("Object", "assign", false, Type, {
                extend: function extend(prototype, mixins) {
                  return typeof prototype === "function"
                    ? _extend.apply(null, arguments)
                    : _extend(null, prototype, mixins);
                },
                instanceOf: _instanceOf,
              });

              module.exports = Type;
              var _c;
              $RefreshReg$(_c, "Type");
            },
            null,
          );
          __d(
            "sdk.Model",
            ["ObservableMixin", "Type"],
            function $module_sdk_Model(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var Model = importDefault("Type").extend(
                {
                  constructor: function constructor(properties) {
                    this.parent();

                    var propContainer = {};

                    var model = this;

                    Object.keys(properties).forEach(function forEach_$0(name) {
                      propContainer[name] = properties[name];

                      model["set" + name] = function (value) {
                        if (value === propContainer[name]) {
                          return model;
                        }
                        propContainer[name] = value;
                        model.inform(name + ".change", value);
                        return model;
                      };

                      model["get" + name] = function () {
                        return propContainer[name];
                      };
                    });
                  },
                },
                importDefault("ObservableMixin"),
              );
              var _default = Model;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Runtime",
            ["JSSDKRuntimeConfig", "sdk.Model"],
            function $module_sdk_Runtime(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _importNamespace_JSSDKRuntimeConfig;

              var ENVIRONMENTS = {
                UNKNOWN: 0,
                PAGETAB: 1,
                CANVAS: 2,
                PLATFORM: 4,
              };

              var Runtime = new (importDefault("sdk.Model"))({
                AccessToken: "",
                AutoLogAppEvents: false,
                ClientID: "",
                CookieUserID: "",
                EnforceHttps: false,
                Environment: ENVIRONMENTS.UNKNOWN,
                FamilyLoginLoaded: false,
                GraphDomain: "",
                Initialized: false,
                IsSPIN: Boolean(
                  (_importNamespace_JSSDKRuntimeConfig =
                    importNamespace("JSSDKRuntimeConfig")).isSPIN,
                ),
                IsVersioned: false,
                KidDirectedSite: undefined,
                Locale: _importNamespace_JSSDKRuntimeConfig.locale,
                LoggedIntoFacebook: undefined,
                LoginStatus: undefined,
                Revision: _importNamespace_JSSDKRuntimeConfig.revision,
                Rtl: _importNamespace_JSSDKRuntimeConfig.rtl,
                Scope: undefined,
                SDKAB: _importNamespace_JSSDKRuntimeConfig.sdkab,
                SDKUrl: _importNamespace_JSSDKRuntimeConfig.sdkurl,
                SDKNS: _importNamespace_JSSDKRuntimeConfig.sdkns,
                ShouldLoadFamilyLogin: false,
                UseCookie: false,
                UseLocalStorage: true,
                UserID: "",
                Version: undefined,
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
                },
              });

              (function () {
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
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.ErrorHandler",
            ["ManagedError", "normalizeError", "sdk.Runtime", "wrapFunction"],
            function $module_sdk_ErrorHandler(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function create(handleError, onError) {
                var currentEntry = "";

                function errorHandler(error) {
                  var originalError = error._originalError;
                  delete error._originalError;
                  onError(error);

                  throw originalError;
                }

                function guard(func, entry) {
                  return function () {
                    if (!handleError) {
                      return func.apply(this, arguments);
                    }

                    try {
                      currentEntry = entry;
                      return func.apply(this, arguments);
                    } catch (error) {
                      if (error instanceof importDefault("ManagedError")) {
                        throw error;
                      }

                      var data = importDefault("normalizeError")(error);
                      if (!data.script) {
                        var match = /.*\/([^?#]+)/.exec(
                          importDefault("sdk.Runtime").getSDKUrl(),
                        );
                        data.script = match !== null ? match[1] : "";
                      }
                      data.entry = entry;

                      var sanitizedArgs = Array.prototype.slice
                        .call(arguments)
                        .map(function map_$0(arg) {
                          var type = Object.prototype.toString.call(arg);
                          return /^\[object (String|Number|Boolean|Object|Date)\]$/.test(
                            type,
                          )
                            ? arg
                            : arg.toString();
                        });

                      data.args = ES(
                        "JSON",
                        "stringify",
                        false,
                        sanitizedArgs,
                      ).substring(0, 200);
                      errorHandler(data);
                    } finally {
                      currentEntry = "";
                    }
                  };
                }

                function unguard(func) {
                  if (!func.__wrapper) {
                    func.__wrapper = function () {
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

                function wrap(
                  real,

                  entry,
                ) {
                  return function (fn, delay) {
                    var name =
                      entry +
                      ":" +
                      (currentEntry || "[global]") +
                      ":" +
                      (fn.name || "[anonymous]" + getCalleeName(arguments));
                    return real(
                      importDefault("wrapFunction")(fn, "entry", name),
                      delay,
                    );
                  };
                }

                if (handleError) {
                  setTimeout = wrap(setTimeout, "setTimeout");
                  setInterval = wrap(setInterval, "setInterval");
                  importDefault("wrapFunction").setWrapper(guard, "entry");
                }

                return {
                  guard: guard,
                  unguard: unguard,
                };
              }
              exports.create = create;
            },
            98,
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
              exports,
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
                      encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(String(value)),
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
                  (typeof params === "string" ? params : encode(params))
                );
              }
              var _default = {
                encode: encode,
                decode: decode,
                appendToUrl: appendToUrl,
              };
              exports["default"] = _default;
            },
            66,
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
              exports,
            ) {
              var Env = {
                ajaxpipe_token: null,
                compat_iframe_token: null,
                iframeKey: "",
                iframeTarget: "",
                iframeToken: "",
                isCQuick: false,
                jssp_header_sent: false,
                jssp_targeting_enabled: false,
                loadHyperion: false,
                start: Date.now(),
                nocatch: false,
                useTrustedTypes: false,
                isTrustedTypesReportOnly: false,
                enableDefaultTrustedTypesPolicy: false,
                ig_server_override: "",
                barcelona_server_override: "",
                ig_mqtt_wss_endpoint: "",
                ig_mqtt_polling_endpoint: "",
              };

              if (global.Env) {
                ES("Object", "assign", false, Env, global.Env);
              }

              global.Env = Env;
              var _default = Env;
              exports["default"] = _default;
            },
            66,
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
              exports,
            ) {
              "use strict";

              var TAALOpcode = {
                PREVIOUS_FILE: 1,
                PREVIOUS_FRAME: 2,
                PREVIOUS_DIR: 3,
                FORCED_KEY: 4,
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
                TAALOpcode: TAALOpcode,
              };
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "invariant",
            ["Env", "fb-error-lite", "sprintf"],
            function $module_invariant(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";
              var _importDefault_closure_Env;

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
                        params,
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
                    message = importDefault("sprintf").apply(
                      void 0,
                      [formatString].concat(params),
                    );
                  }
                  var error = new Error(message);
                  error.name = "Invariant Violation";
                  error.messageFormat = formatString;
                  error.messageParams = params.map(function params_map_$0(p) {
                    return String(p);
                  });
                  error.taalOpcodes = [
                    importDefault("fb-error-lite").TAALOpcode.PREVIOUS_FRAME,
                  ];

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
                  (
                    _importDefault_closure_Env ||
                    (_importDefault_closure_Env = importDefault("Env"))
                  ).show_invariant_decoder === true
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
              exports["default"] = invariant;
            },
            98,
          );
          __d(
            "UrlMap",
            ["invariant", "UrlMapConfig", "sdk.Runtime"],
            function $module_UrlMap(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
              invariant,
            ) {
              function resolve(key) {
                var protocol = "https";

                if (key === "graph_domain") {
                  var graphDomain =
                    importDefault("sdk.Runtime").getGraphDomain();
                  if (!!graphDomain) {
                    key = "graph_".concat(graphDomain);
                  } else {
                    key = "graph";
                  }
                }

                if (key in importNamespace("UrlMapConfig")) {
                  return (
                    protocol + "://" + importNamespace("UrlMapConfig")[key]
                  );
                }

                key in importNamespace("UrlMapConfig") ||
                  invariant(0, "Unknown key in UrlMapConfig: %s", key);
                return "";
              }
              exports.resolve = resolve;
            },
            98,
          );
          __d(
            "sdk.Scribe",
            ["QueryString", "UrlMap", "sdk.Runtime"],
            function $module_sdk_Scribe(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var sentErrors = {};

              function log(category, data, should_include_creds) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }

                if (category === "jssdk_error") {
                  var msgKey = ES("JSON", "stringify", false, data);
                  if (
                    Object.prototype.hasOwnProperty.call(sentErrors, msgKey)
                  ) {
                    return;
                  } else {
                    sentErrors[msgKey] = true;
                  }
                }

                if (data.extra != null && typeof data.extra === "object") {
                  var extra = data.extra;
                  extra.revision = importDefault("sdk.Runtime").getRevision();
                }

                var image = new Image();

                var url =
                  importNamespace("UrlMap").resolve("www") +
                  "/platform/scribe_endpoint.php/";
                if (!should_include_creds) {
                  image.crossOrigin = "anonymous";
                }

                image.src = importDefault("QueryString").appendToUrl(url, {
                  c: category,
                  m: ES(
                    "JSON",
                    "stringify",
                    false,
                    babelHelpers["extends"]({}, data, {
                      isSPIN: importDefault("sdk.Runtime").getIsSPIN(),
                    }),
                  ),
                });
              }
              exports.log = log;
            },
            98,
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
              exports,
            ) {
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
                return function () {
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
              exports.create = create;
            },
            66,
          );
          __d(
            "sdk.feature",
            ["JSSDKConfig", "sdk.FeatureFunctor"],
            function $module_sdk_feature(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _default = importNamespace("sdk.FeatureFunctor").create(
                importNamespace("JSSDKConfig"),
              );
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.ErrorHandling",
            ["sdk.ErrorHandler", "sdk.Runtime", "sdk.Scribe", "sdk.feature"],
            function $module_sdk_ErrorHandling(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var handleError = importDefault("sdk.feature")(
                "error_handling",
                false,
              );
              var _default = importNamespace("sdk.ErrorHandler").create(
                handleError,
                function ErrorHandler_create_$1(error) {
                  importNamespace("sdk.Scribe").log("jssdk_error", {
                    appId: importDefault("sdk.Runtime").getClientID(),
                    error: error.name || error.message,
                    extra: error,
                  });
                },
              );
              exports["default"] = _default;
            },
            98,
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
              "sdk.domReady",
            ],
            function $module_FB(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              if (window.FB && window.FB.__buffer) {
                window.__buffer = babelHelpers["extends"](
                  {},
                  window.FB.__buffer,
                );
              }

              var externalInterface = (window.FB = {});

              var FB = {};

              if (__DEV__) {
                FB.require = require;

                window._FB = FB;
              }

              importNamespace("Log").setLevel(__DEV__ ? 3 : 0);

              importNamespace("GlobalCallback").setPrefix(
                "FB.__globalCallbacks",
              );

              var fbRoot = document.createElement("div");
              importNamespace("DOMWrapper").setRoot(fbRoot);

              importDefault("sdk.domReady")(function domReady_$0() {
                importNamespace("Log").info("domReady");
                importNamespace("sdk.Content").appendHidden(fbRoot);
                if (importDefault("JSSDKCssConfig").rules) {
                  importNamespace("sdk.DOM").addCssRules(
                    importDefault("JSSDKCssConfig").rules,
                    importDefault("JSSDKCssConfig").components,
                  );
                }
              });

              function protect(fn, accessor, key, context) {
                return importDefault("sdk.ErrorHandling").guard(
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
                        ? importDefault("sdk.ErrorHandling").unguard(val)
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

                      for (var _key in result) {
                        var property = result[_key];
                        if (
                          typeof property !== "function" ||
                          _key === "constructor"
                        ) {
                          continue;
                        }
                        isPlainObject = false;

                        facade[_key] = protect(
                          property,
                          accessor + ":" + _key,
                          _key,
                          result,
                        );
                      }
                    }

                    if (!isPlainObject) {
                      return facade;
                    }

                    return isPlainObject ? result : facade;
                  },
                  accessor,
                );
              }

              function provide(name, source) {
                var externalTarget = name
                  ? importDefault("dotAccess")(externalInterface, name, true)
                  : externalInterface;

                Object.keys(source).forEach(function forEach_$0(key) {
                  var value = source[key];

                  if (typeof value === "function") {
                    var accessor = (name ? name + "." : "") + key;
                    var exportedProperty = protect(
                      value,
                      accessor,
                      key,
                      source,
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
                provide: provide,
              });
              var _default = FB;
              exports["default"] = _default;
            },
            98,
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
              exports,
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
                APP_ID: "$app_id",
              };
            },
            null,
          );
          __d(
            "sdk.AppEvents",
            [
              "AppUserPropertyAPIBuiltinField",
              "Assert",
              "sdk.Model",
              "sdk.Runtime",
            ],
            function $module_sdk_AppEvents(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
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
                SPENT_CREDITS: "fb_mobile_spent_credits",
              });

              var HiddenEventNames = Object.freeze({
                ACTIVATED_APP: "fb_mobile_activate_app",
                PURCHASED: "fb_mobile_purchase",
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
                DESCRIPTION: "fb_description",
              });

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
                importDefault("AppUserPropertyAPIBuiltinField"),
              );
              _c = PREDEFINED_USER_PROPS;

              var AppProps = new (importDefault("sdk.Model"))({
                UserID: "",
                Version: "",
              });

              function logEvent(_eventName, _valueToSum, _params) {}

              function logPurchase(_purchaseAmount, _currency, _params) {}

              function activateApp() {
                logEvent(HiddenEventNames.ACTIVATED_APP);
              }

              function logPageView() {
                logEvent(EventNames.PAGE_VIEW);
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

              function updateUserProperties(_params, _cb) {
                if (_cb) {
                  _cb(null);
                }
              }

              function assertGetValidAppID() {
                var appID = importDefault("sdk.Runtime").getClientID();
                importDefault("Assert").isTrue(
                  appID !== null && appID.length > 0,
                  "You need to call FB.init() with App ID first.",
                );
                return appID;
              }

              function assertValidUserProperties(params) {
                importDefault("Assert").isTrue(
                  Object.keys(params).length <= MAX_USER_PROPERTIES,
                  "The total number of user properties cannot exceed " +
                    MAX_USER_PROPERTIES +
                    ".",
                );
                for (var _key in params) {
                  importDefault("Assert").isTrue(
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
                      "Or, it must be a pre-defined user property",
                  );
                  importDefault("Assert").isTrue(
                    params[_key].toString().length <=
                      MAX_USER_PROPERTIES_VALUE_LENGTH,
                    "Invalid user properties value: " +
                      params[_key] +
                      ". " +
                      "It must be no longer than " +
                      MAX_USER_PROPERTIES_VALUE_LENGTH +
                      " characters.",
                  );
                }
              }

              function assertValidEventName(eventName) {
                importDefault("Assert").isTrue(
                  EVENT_NAME_REGEX.test(eventName),
                  "Invalid event name: " +
                    eventName +
                    ". " +
                    "It must be between 1 and " +
                    MAX_EVENT_NAME_LENGTH +
                    " characters, " +
                    "and must be contain only alphanumerics, _, - or spaces, " +
                    "starting with alphanumeric or _.",
                );
              }

              function assertValidAppVersion(appVersion) {
                importDefault("Assert").isTrue(
                  appVersion.length <= MAX_APP_VERSION_LENGTH,
                  "Invalid app version: " +
                    appVersion +
                    ". " +
                    "It must be no longer than " +
                    MAX_APP_VERSION_LENGTH +
                    " characters.",
                );
              }

              function assertValidUserID(userID) {
                importDefault("Assert").isTrue(
                  userID.length !== 0,
                  "User ID must be set before updateUserProperties can be called.",
                );
                importDefault("Assert").isTrue(
                  userID.length <= MAX_USER_ID_LENGTH,
                  "Invalid user ID: " +
                    userID +
                    ". " +
                    "It must be no longer than " +
                    MAX_USER_ID_LENGTH +
                    " characters.",
                );
              }

              var AppEvents = Object.freeze({
                logEvent: logEvent,
                logPurchase: logPurchase,
                activateApp: activateApp,
                logPageView: logPageView,
                setUserID: setUserID,
                getUserID: getUserID,
                clearUserID: clearUserID,
                updateUserProperties: updateUserProperties,
                setAppVersion: setAppVersion,
                getAppVersion: getAppVersion,
                clearAppVersion: clearAppVersion,
                EventNames: EventNames,
                ParameterNames: ParameterNames,
              });
              var _c;
              $RefreshReg$(_c, "PREDEFINED_USER_PROPS");
              exports.assertGetValidAppID = assertGetValidAppID;
              exports.assertValidUserProperties = assertValidUserProperties;
              exports.assertValidEventName = assertValidEventName;
              exports.assertValidAppVersion = assertValidAppVersion;
              exports.assertValidUserID = assertValidUserID;
              exports.AppEvents = AppEvents;
            },
            98,
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
              exports,
            ) {
              "use strict";

              var SUBSCRIBE = "event.subscribe";

              var UNSUBSCRIBE = "event.unsubscribe";

              var _subscribersMap;

              function subscribers() {
                if (!_subscribersMap) {
                  _subscribersMap = {};
                }
                return _subscribersMap;
              }

              function subscribe(name, cb) {
                var subs = subscribers();

                if (!subs[name]) {
                  subs[name] = [cb];
                } else {
                  if (subs[name].indexOf(cb) == -1) {
                    subs[name].push(cb);
                  }
                }
                if (name != SUBSCRIBE && name != UNSUBSCRIBE) {
                  fire(SUBSCRIBE, name, subs[name]);
                }
              }

              function unsubscribe(name, cb) {
                var subs = subscribers()[name];
                if (subs) {
                  subs.forEach(function subs_forEach_$0(value, key) {
                    if (value === cb) {
                      subs.splice(key, 1);
                    }
                  });
                }
                if (name != SUBSCRIBE && name != UNSUBSCRIBE) {
                  fire(UNSUBSCRIBE, name, subs);
                }
              }

              function monitor(name, callback) {
                var _arguments = arguments;
                if (!callback()) {
                  var _fn = function fn() {
                    if (callback.apply(callback, _arguments)) {
                      unsubscribe(name, _fn);
                    }
                  };

                  subscribe(name, _fn);
                }
              }

              function clear(name) {
                delete subscribers()[name];
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
                var subs = subscribers()[name];

                if (subs) {
                  subs.forEach(function subs_forEach_$0(sub) {
                    if (sub) {
                      sub.apply(this, args);
                    }
                  });
                }
              }
              exports.SUBSCRIBE = SUBSCRIBE;
              exports.UNSUBSCRIBE = UNSUBSCRIBE;
              exports.subscribers = subscribers;
              exports.subscribe = subscribe;
              exports.unsubscribe = unsubscribe;
              exports.monitor = monitor;
              exports.clear = clear;
              exports.fire = fire;
            },
            66,
          );
          __d(
            "sdk.AppEvents-public",
            ["Assert", "FB", "sdk.AppEvents", "sdk.Event", "sdk.Runtime"],
            function $module_sdk_AppEvents_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function init() {
                importNamespace("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1(options) {
                    if (importDefault("sdk.Runtime").getClientID()) {
                      if (options.autoLogAppEvents !== undefined) {
                        importDefault("Assert").isBoolean(
                          options.autoLogAppEvents,
                          "Type of property autoLogAppEvents must be boolean",
                        );
                        importDefault("sdk.Runtime").setAutoLogAppEvents(
                          options.autoLogAppEvents,
                        );
                      }
                      if (importDefault("sdk.Runtime").getAutoLogAppEvents()) {
                        importNamespace(
                          "sdk.AppEvents",
                        ).AppEvents.logPageView();
                      }
                    }
                  },
                );

                importDefault("FB").provide(
                  "AppEvents",
                  importNamespace("sdk.AppEvents").AppEvents,
                );
              }

              var SDKAppEvents = { init: init };
              var _default = SDKAppEvents;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.AuthState",
            ["sdk.AuthUtils"],
            function $module_sdk_AuthState(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var authState = initState();

              function initState() {
                var initialMixedState = {
                  igAuthResponse: null,
                  fbAuthResponse: null,
                  fbLoginStatus: null,
                  igLoginStatus: null,
                };
                return {
                  currentAuthResponse: null,
                  shouldSecondLoginRequestTimeOut: false,
                  mixedAuthState: initialMixedState,
                  loadState: null,
                  timer: null,
                  currentTimeOut:
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .CONNECTED_REVALIDATE_PERIOD,
                };
              }

              function getState() {
                return ES("Object", "assign", false, initState(), authState);
              }

              function setState(newState) {
                authState = ES(
                  "Object",
                  "assign",
                  false,
                  initState(),
                  authState,
                  newState,
                );
              }

              var State = {
                getState: getState,
                setState: setState,
              };
              var _default = State;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Cookie",
            ["QueryString", "sdk.Runtime", "sdk.Scribe", "sdk.feature"],
            function $module_sdk_Cookie(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var domain = null;

              var JSSDK_COOKIE_PREFIX = ["fblo_", "fbsr_", "fbm_"];

              function setRaw(startingPrefix, val, ts, secure) {
                if (
                  !ES(JSSDK_COOKIE_PREFIX, "includes", true, startingPrefix)
                ) {
                  importNamespace("sdk.Scribe").log("jssdk_error", {
                    appId: importDefault("sdk.Runtime").getClientID(),
                    error: "unknown_cookie_prefix." + startingPrefix,
                  });
                  if (
                    importDefault("sdk.feature")(
                      "limit_unknown_cookie_setting",
                      false,
                    )
                  ) {
                    return;
                  }
                }

                var prefix =
                  startingPrefix + importDefault("sdk.Runtime").getClientID();

                var secureFlag = secure ? "; SameSite=None;Secure" : "";
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
                    ? "; domain=" + (domain != null ? domain : "")
                    : "") +
                  secureFlag;
              }

              function getRaw(startingPrefix) {
                var prefix =
                  startingPrefix + importDefault("sdk.Runtime").getClientID();
                var regExp = new RegExp("\\b" + prefix + "=([^;]*)\\b");
                var matches = document.cookie.match(regExp);
                if (matches == null) {
                  return null;
                } else {
                  return matches[1];
                }
              }

              function setDomain(val) {
                domain = val;

                var meta = importDefault("QueryString").encode({
                  base_domain: domain !== null && domain !== "." ? domain : "",
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
                if (cookie != null && domain === null) {
                  var meta = importDefault("QueryString").decode(cookie);

                  domain = meta.base_domain;
                  return { base_domain: domain };
                }
                return null;
              }

              function loadSignedRequest() {
                return getRaw("fbsr_");
              }

              function setSignedRequestCookie(signedRequest, expiration) {
                if (signedRequest === "") {
                  throw new Error(
                    "Value passed to Cookie.setSignedRequestCookie was empty.",
                  );
                }
                setRaw("fbsr_", signedRequest, expiration, true);
              }

              function clearSignedRequestCookie() {
                loadMeta();
                setRaw("fbsr_", "", 0, true);
              }
              exports.setRaw = setRaw;
              exports.getRaw = getRaw;
              exports.setDomain = setDomain;
              exports.getDomain = getDomain;
              exports.loadMeta = loadMeta;
              exports.loadSignedRequest = loadSignedRequest;
              exports.setSignedRequestCookie = setSignedRequestCookie;
              exports.clearSignedRequestCookie = clearSignedRequestCookie;
            },
            98,
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
              exports,
            ) {
              var Observable = function Observable() {
                var _this = this;
                this.getSubscribers = function (toWhat) {
                  return (
                    _this.$Observable$p_observableEvents[toWhat] ||
                    (_this.$Observable$p_observableEvents[toWhat] = [])
                  );
                };
                this.clearSubscribers = function (toWhat) {
                  if (toWhat) {
                    _this.$Observable$p_observableEvents[toWhat] = [];
                  }
                };
                this.subscribe = function (toWhat, withWhat) {
                  var list = _this.getSubscribers(toWhat);
                  list.push(withWhat);
                };
                this.unsubscribe = function (toWhat, withWhat) {
                  var list = _this.getSubscribers(toWhat);
                  for (var i = 0; i < list.length; i++) {
                    if (list[i] === withWhat) {
                      list.splice(i, 1);
                      break;
                    }
                  }
                };
                this.inform = function (what, withWhat) {
                  var list = _this.getSubscribers(what);
                  var _loop = function _loop() {
                    if (list[i] === null) {
                      return 1;
                    }
                    if (__DEV__) {
                      list[i].call(_this, withWhat);
                    } else {
                      try {
                        list[i].call(_this, withWhat);
                      } catch (e) {
                        window.setTimeout(function window_setTimeout_$0() {
                          throw e;
                        }, 0);
                      }
                    }
                  };
                  for (var i = 0; i < list.length; i++) {
                    if (_loop()) continue;
                  }
                };
                this.$Observable$p_observableEvents = {};
              };
              exports.Observable = Observable;
            },
            66,
          );
          __d(
            "sdk.AuthUtils",
            ["sdk.AuthState", "sdk.Cookie", "sdk.Observable", "sdk.Runtime"],
            function $module_sdk_AuthUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var YEAR_MS = 365 * 24 * 60 * 60 * 1000;

              function isInstagramLogin(authResponse) {
                if (authResponse != null && authResponse.graphDomain != null) {
                  return authResponse.graphDomain === "instagram";
                }
                return false;
              }

              function setBaseDomain(baseDomain) {
                if (importDefault("sdk.Runtime").getUseCookie()) {
                  if (importNamespace("sdk.Cookie").getDomain() == null) {
                    importNamespace("sdk.Cookie").setDomain("." + baseDomain);
                  }
                }
              }

              function resetFBAndIGLoginStatus() {
                var mixedAuthState = {
                  fbAuthResponse: null,
                  fbLoginStatus: null,
                  igAuthResponse: null,
                  igLoginStatus: null,
                };
                var shouldSecondLoginRequestTimeOut = false;
                importDefault("sdk.AuthState").setState({
                  mixedAuthState: mixedAuthState,
                  shouldSecondLoginRequestTimeOut:
                    shouldSecondLoginRequestTimeOut,
                });
              }

              function setGraphDomain(graphDomain) {
                if (graphDomain != null) {
                  importDefault("sdk.Runtime").setGraphDomain(graphDomain);

                  if (graphDomain == "instagram") {
                    importDefault("sdk.Runtime").setIsVersioned(false);
                  }
                } else {
                  importDefault("sdk.Runtime").setGraphDomain("");
                }
              }

              function setLogoutState() {
                importNamespace("sdk.Cookie").setRaw(
                  AuthConstants.LOGOUT_COOKIE_PREFIX,
                  "y",
                  Date.now() + YEAR_MS,
                  false,
                );
              }

              function setRevalidateTimer(timeout) {
                if (timeout === void 0) {
                  timeout = AuthConstants.CONNECTED_REVALIDATE_PERIOD;
                }
                var currentTimer =
                  importDefault("sdk.AuthState").getState().timer;
                if (currentTimer) {
                  window.clearTimeout(currentTimer);
                }
                var timer = window.setTimeout(function window_setTimeout_$0() {
                  AuthInternalEvent.inform(
                    AuthConstants.REVALIDATE_TIMER_TIMEOUT,
                  );
                }, timeout);
                importDefault("sdk.AuthState").setState({ timer: timer });
                importDefault("sdk.AuthState").setState({
                  currentTimeOut: timeout,
                });
              }

              function removeLogoutState() {
                importNamespace("sdk.Cookie").setRaw(
                  AuthConstants.LOGOUT_COOKIE_PREFIX,
                  "",
                  0,
                  false,
                );
                importNamespace("sdk.Cookie").setRaw(
                  AuthConstants.LOGOUT_COOKIE_PREFIX,
                  "",
                  0,
                  true,
                );
              }

              var observable = new (importNamespace(
                "sdk.Observable",
              ).Observable)();

              function inform(key, value) {
                observable.inform(key, value);
              }

              function subscribe(key, func) {
                observable.subscribe(key, func);
              }

              function clearSubscribers(key) {
                observable.clearSubscribers(key);
              }

              function unsubscribe(key, func) {
                observable.unsubscribe(key, func);
              }

              function getSubscribers(key) {
                return observable.getSubscribers(key);
              }

              var AuthInternalEvent = {
                inform: inform,
                subscribe: subscribe,
                clearSubscribers: clearSubscribers,
                unsubscribe: unsubscribe,
                getSubscribers: getSubscribers,
              };

              var AuthConstants = {
                LOCAL_STORAGE_TOKEN_PREFIX: "fblst_",
                IG_LOCAL_STORAGE_TOKEN_PREFIX: "iglst_",
                SESSION_STORAGE_LOGIN_STATUS_PREFIX: "fbssls_",
                CONNECTED_REVALIDATE_PERIOD: 60 * 90 * 1000,
                DEFAULT_REVALIDATE_PERIOD: 60 * 60 * 24 * 1000,
                LOGOUT_COOKIE_PREFIX: "fblo_",
                CORS_FETCH_COMPLETED_EVENT: "cors_fetch_completed",
                XFOA_FINAL_RESPONSE_EVENT: "xfoa_final_response",
                LOAD_XFOA_SUBSCRIBERS: "load_xfoa_subscribers",
                REVALIDATE_TIMER_TIMEOUT: "revalidate_timer_timeout",
              };
              exports.isInstagramLogin = isInstagramLogin;
              exports.setBaseDomain = setBaseDomain;
              exports.resetFBAndIGLoginStatus = resetFBAndIGLoginStatus;
              exports.setGraphDomain = setGraphDomain;
              exports.setLogoutState = setLogoutState;
              exports.setRevalidateTimer = setRevalidateTimer;
              exports.removeLogoutState = removeLogoutState;
              exports.AuthInternalEvent = AuthInternalEvent;
              exports.AuthConstants = AuthConstants;
            },
            98,
          );
          __d(
            "sdk.WebStorage",
            ["Log"],
            function $module_sdk_WebStorage(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function getLocalStorage() {
                try {
                  return window.localStorage;
                } catch (_unused) {
                  importNamespace("Log").warn("Failed to get local storage");
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
                  importNamespace("Log").warn("Failed to get local storage");
                }
                return null;
              }

              function getSessionStorage() {
                try {
                  return window.sessionStorage;
                } catch (_unused3) {
                  importNamespace("Log").warn("Failed to get session storage");
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
                  importNamespace("Log").warn("Failed to get session storage");
                }
                return null;
              }

              function setItemGuarded(storage, key, value) {
                if (storage == null) {
                  return;
                }
                try {
                  storage.setItem(key, value);
                } catch (_unused5) {}
              }
              exports.getLocalStorage = getLocalStorage;
              exports.getLocalStorageForRead = getLocalStorageForRead;
              exports.getSessionStorage = getSessionStorage;
              exports.getSessionStorageForRead = getSessionStorageForRead;
              exports.setItemGuarded = setItemGuarded;
            },
            98,
          );
          __d(
            "sdk.AuthStorageUtils",
            ["sdk.AuthUtils", "sdk.Runtime", "sdk.WebStorage", "sdk.feature"],
            function $module_sdk_AuthStorageUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function setLocalStorageToken(authResponse, longLivedToken) {
                if (
                  shouldEnableAuthStorage() &&
                  longLivedToken != null &&
                  longLivedToken !== ""
                ) {
                  var localStorage =
                    importNamespace("sdk.WebStorage").getLocalStorage();
                  if (localStorage) {
                    var token_prefix = importNamespace(
                      "sdk.AuthUtils",
                    ).isInstagramLogin(authResponse)
                      ? importNamespace("sdk.AuthUtils").AuthConstants
                          .IG_LOCAL_STORAGE_TOKEN_PREFIX
                      : importNamespace("sdk.AuthUtils").AuthConstants
                          .LOCAL_STORAGE_TOKEN_PREFIX;
                    localStorage.setItem(
                      token_prefix + importDefault("sdk.Runtime").getClientID(),
                      longLivedToken,
                    );
                  }
                }
              }

              function removeLocalStorageToken(loginSource) {
                var localStorage =
                  importNamespace("sdk.WebStorage").getLocalStorage();
                if (localStorage) {
                  if (loginSource === "instagram") {
                    localStorage.removeItem(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .IG_LOCAL_STORAGE_TOKEN_PREFIX +
                        importDefault("sdk.Runtime").getClientID(),
                    );
                  } else {
                    localStorage.removeItem(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .LOCAL_STORAGE_TOKEN_PREFIX +
                        importDefault("sdk.Runtime").getClientID(),
                    );
                  }
                }
              }

              function setSessionStorage(authResponse, status) {
                if (!shouldEnableAuthStorage()) {
                  return;
                }
                var sessionStorage =
                  importNamespace("sdk.WebStorage").getSessionStorage();
                if (sessionStorage) {
                  sessionStorage.setItem(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .SESSION_STORAGE_LOGIN_STATUS_PREFIX +
                      importDefault("sdk.Runtime").getClientID(),
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
                              importNamespace("sdk.AuthUtils").AuthConstants
                                .CONNECTED_REVALIDATE_PERIOD,
                            )
                          : Date.now() +
                            importNamespace("sdk.AuthUtils").AuthConstants
                              .DEFAULT_REVALIDATE_PERIOD,
                    }),
                  );
                }
              }

              function shouldEnableAuthStorage() {
                return (
                  importDefault("sdk.feature")("cache_auth_response", false) &&
                  importDefault("sdk.Runtime").getUseLocalStorage() &&
                  location.protocol === "https:"
                );
              }

              function getLocalStorageTokens() {
                var fbToken = null;
                var igToken = null;
                if (importDefault("sdk.Runtime").getUseLocalStorage()) {
                  var localStorage =
                    importNamespace("sdk.WebStorage").getLocalStorageForRead();
                  if (localStorage) {
                    fbToken = localStorage.getItem(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .LOCAL_STORAGE_TOKEN_PREFIX +
                        importDefault("sdk.Runtime").getClientID(),
                    );
                    igToken = localStorage.getItem(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .IG_LOCAL_STORAGE_TOKEN_PREFIX +
                        importDefault("sdk.Runtime").getClientID(),
                    );
                  }
                }
                return {
                  fbToken: fbToken,
                  igToken: igToken,
                };
              }

              function getCachedResponse() {
                if (!shouldEnableAuthStorage()) {
                  return null;
                }
                var sessionStorage =
                  importNamespace("sdk.WebStorage").getSessionStorageForRead();
                if (sessionStorage) {
                  var rawCachedResponse = sessionStorage.getItem(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .SESSION_STORAGE_LOGIN_STATUS_PREFIX +
                      importDefault("sdk.Runtime").getClientID(),
                  );
                  if (rawCachedResponse != null) {
                    try {
                      var cachedResponse = ES(
                        "JSON",
                        "parse",
                        false,
                        rawCachedResponse,
                      );
                      if (
                        cachedResponse != null &&
                        cachedResponse.expiresAt != null &&
                        cachedResponse.expiresAt > Date.now()
                      ) {
                        return cachedResponse;
                      }
                    } catch (_unused) {
                      return null;
                    }
                  }
                }
                return null;
              }
              exports.setLocalStorageToken = setLocalStorageToken;
              exports.removeLocalStorageToken = removeLocalStorageToken;
              exports.setSessionStorage = setSessionStorage;
              exports.getLocalStorageTokens = getLocalStorageTokens;
              exports.getCachedResponse = getCachedResponse;
            },
            98,
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
              exports,
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
                  en.charCodeAt(num & 63),
                );
              }

              var de =
                ">___?456789:;<=_______" +
                "\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19" +
                "______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";
              function de4(c) {
                var num =
                  (de.charCodeAt(c.charCodeAt(0) - 43) << 18) |
                  (de.charCodeAt(c.charCodeAt(1) - 43) << 12) |
                  (de.charCodeAt(c.charCodeAt(2) - 43) << 6) |
                  de.charCodeAt(c.charCodeAt(3) - 43);
                return String.fromCharCode(
                  num >>> 16,
                  (num >>> 8) & 255,
                  num & 255,
                );
              }

              var Base64 = {
                encode: function encode(input) {
                  var str = unescape(encodeURI(input));
                  var i = (str.length + 2) % 3;
                  str = (str + "\0\0".slice(i)).replace(/[\s\S]{3}/g, en3);
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
                        (val | -(val > 63 ? 1 : 0)) & -(val > 0 ? 1 : 0) & 63,
                      );
                    }),
                  );
                },
              };
              var _default = Base64;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "sdk.SignedRequest",
            ["Base64"],
            function $module_sdk_SignedRequest(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function parse(signed_request) {
                if (signed_request == null || signed_request === "") {
                  return null;
                }

                var payload = signed_request
                  .split(".", 2)[1]
                  .replace(/\-/g, "+")
                  .replace(/\_/g, "/");
                return importDefault("Base64").decodeObject(payload);
              }
              exports.parse = parse;
            },
            98,
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
              exports,
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
                },
              };
              var _default = Miny;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "getBlankIframeSrc",
            ["sdk.UA"],
            function $module_getBlankIframeSrc(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function getBlankIframeSrc() {
                return importDefault("sdk.UA").ie() < 10
                  ? "javascript:false"
                  : "about:blank";
              }
              exports["default"] = getBlankIframeSrc;
            },
            98,
          );
          __d(
            "insertIframe",
            ["GlobalCallback", "getBlankIframeSrc", "guid"],
            function $module_insertIframe(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function insertIframe(opts) {
                var id = opts.id != null ? opts.id : importDefault("guid")();
                var name =
                  opts.name != null ? opts.name : importDefault("guid")();

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
                var globalCallback =
                  importNamespace("GlobalCallback").create(callback);

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
                    importDefault("getBlankIframeSrc")() +
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
                    importDefault("getBlankIframeSrc")() +
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
              exports["default"] = insertIframe;
            },
            98,
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
            ],
            function $module_sdk_Impressions(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function impression(params, should_include_creds) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                var clientID = importDefault("sdk.Runtime").getClientID();
                var isCanvas = importDefault("sdk.Runtime").isEnvironment(
                  importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                );

                if (
                  clientID &&
                  (typeof params.api_key !== "string" || params.api_key === "")
                ) {
                  params.api_key = clientID;
                }

                params.kid_directed_site =
                  importDefault("sdk.Runtime").getKidDirectedSite();

                var url =
                  importNamespace("UrlMap").resolve("www") +
                  "/platform/impression.php/" +
                  importDefault("guid")() +
                  "/";
                if (isCanvas) {
                  url =
                    importNamespace("UrlMap").resolve("www") +
                    "/platform/canvas_impression.php/" +
                    importDefault("guid")() +
                    "/";
                }

                var fullUrlPath = importDefault("QueryString").appendToUrl(
                  url,
                  params,
                );
                if (fullUrlPath.length > 2000) {
                  if (params.payload && typeof params.payload === "string") {
                    var payload = params.payload;
                    var minyPayload = importDefault("Miny").encode(payload);
                    if (minyPayload && minyPayload.length < payload.length) {
                      params.payload = minyPayload;
                      fullUrlPath = importDefault("QueryString").appendToUrl(
                        url,
                        params,
                      );
                    }
                  }
                }

                if (window.fetch) {
                  makeRequest(
                    url,
                    fullUrlPath,
                    params,
                    should_include_creds || isCanvas,
                  );
                } else {
                  _makeRequest_DEPRECATED(
                    url,
                    fullUrlPath,
                    params,
                    should_include_creds || isCanvas,
                  );
                }
              }

              function makeRequest(
                url,
                fullUrlPath,
                params,
                should_include_creds,
              ) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                var standardFetchOptions = {
                  mode: "no-cors",
                  credentials: "include",
                };
                if (!should_include_creds) {
                  standardFetchOptions.credentials = "omit";
                }

                if (fullUrlPath.length <= 2000) {
                  window.fetch(fullUrlPath, standardFetchOptions);
                } else {
                  var searchParams = new URLSearchParams();

                  for (var key in params) {
                    if (Object.prototype.hasOwnProperty.call(params, key)) {
                      var val = params[key];
                      if (val != null) {
                        searchParams.set(key, val);
                      }
                    }
                  }

                  var fetchOptions = babelHelpers["extends"](
                    {
                      method: "POST",
                      body: searchParams,
                    },
                    standardFetchOptions,
                  );

                  window.fetch(url, fetchOptions);
                }
              }

              function _makeRequest_DEPRECATED(
                url,
                fullUrlPath,
                params,
                should_include_creds,
              ) {
                if (should_include_creds === void 0) {
                  should_include_creds = false;
                }
                if (fullUrlPath.length <= 2000) {
                  var image = new Image();
                  if (!should_include_creds) {
                    image.crossOrigin = "anonymous";
                  }

                  image.src = fullUrlPath;
                } else {
                  if (!should_include_creds) {
                    return;
                  }

                  var name = importDefault("guid")();
                  var root = importNamespace("sdk.Content").appendHidden(
                    document.createElement("div"),
                  );
                  importDefault("insertIframe")({
                    url: importDefault("getBlankIframeSrc")(),
                    root: root,
                    name: name,
                    className: "fb_hidden fb_invisible",
                    onload: function onload() {
                      if (root.parentNode != null) {
                        root.parentNode.removeChild(root);
                      }
                    },
                  });

                  importNamespace("sdk.Content").submitToTarget({
                    url: url,
                    target: name,
                    params: params,
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
                  payload: ES("JSON", "stringify", false, payload),
                });
              }
              exports.impression = impression;
              exports.log = log;
            },
            98,
          );
          __d(
            "performance",
            [],
            function $module_performance(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var performance =
                global.performance ||
                global.msPerformance ||
                global.webkitPerformance ||
                {};
              var _default = performance;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "performanceNow",
            ["performance"],
            function $module_performanceNow(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _importDefault_closure_performance;

              var performanceNow;

              if (
                (
                  _importDefault_closure_performance ||
                  (_importDefault_closure_performance =
                    importDefault("performance"))
                ).now
              ) {
                performanceNow = function performanceNow() {
                  return (
                    _importDefault_closure_performance ||
                    (_importDefault_closure_performance =
                      importDefault("performance"))
                  ).now();
                };
              } else {
                var cstart = global._cstart;
                var initialDate = Date.now();
                var epoch =
                  typeof cstart === "number" && cstart < initialDate
                    ? cstart
                    : initialDate;
                var last = 0;
                performanceNow = function performanceNow() {
                  var dateNow = Date.now();
                  var now = dateNow - epoch;
                  if (now < last) {
                    epoch -= last - now;
                    now = dateNow - epoch;
                  }
                  last = now;
                  return now;
                };
              }
              var _default = performanceNow;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "removeFromArray",
            [],
            function $module_removeFromArray(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              function removeFromArray(array, element) {
                var index = array.indexOf(element);
                if (index !== -1) {
                  array.splice(index, 1);
                }
              }
              exports["default"] = removeFromArray;
            },
            66,
          );
          __d(
            "fb-error",
            ["performanceNow", "removeFromArray"],
            function $module_fb_error(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";
              var _require_closure_performanceNow;

              var TAALOpcode = {
                PREVIOUS_FILE: 1,
                PREVIOUS_FRAME: 2,
                PREVIOUS_DIR: 3,
                FORCED_KEY: 4,
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

              var hasLoggedAnyProductionError = false;
              var ErrorBrowserConsole = {
                errorListener: function errorListener(error) {
                  var cons = global.console;
                  var method = cons[error.type] ? error.type : "error";

                  if (__DEV__) {
                    var message = error.message + "\n";
                    var isTestEnv = typeof expect !== "undefined";

                    if (isTestEnv) {
                      cons[method](message + error.stack);
                    } else {
                      cons[method](message, error);
                    }
                  } else {
                    if (
                      error.type === "fatal" ||
                      (method === "error" && !hasLoggedAnyProductionError)
                    ) {
                      var _message = error.message;
                      cons.error(
                        "ErrorUtils caught an error:\n\n" +
                          _message +
                          "\n\nSubsequent non-fatal errors won't be logged; see " +
                          "https://fburl.com/debugjs.",
                        error,
                      );
                      hasLoggedAnyProductionError = true;
                    }
                  }
                },
              };

              var defaultConfig = {
                skipDupErrorGuard: false,
              };
              var ErrorConfig = {
                config: defaultConfig,
                setup: setup,
              };
              var _initialized = false;

              function setup(config) {
                if (_initialized === false) {
                  _initialized = true;

                  ErrorConfig.config = Object.freeze(config);
                }
              }

              var ErrorDynamicData = {
                access_token: null,
              };

              var messagesPerWindow = 6;
              var windowMilliseconds = 60000;
              var cacheClearAfter = 10 * windowMilliseconds;
              var rateLimitCache = new Map();
              var lastCacheClear = 0;

              function _cleanupCache() {
                var now = (
                  _require_closure_performanceNow ||
                  (_require_closure_performanceNow = require("performanceNow"))
                )();

                if (now > lastCacheClear + windowMilliseconds) {
                  var cutoff = now - cacheClearAfter;

                  for (var _ref2 of rateLimitCache) {
                    var key = _ref2[0];
                    var state = _ref2[1];
                    if (state.lastAccessed < cutoff) {
                      rateLimitCache["delete"](key);
                    }
                  }

                  lastCacheClear = now;
                }
              }

              function _rateLimit(key) {
                _cleanupCache();

                var now = (
                  _require_closure_performanceNow ||
                  (_require_closure_performanceNow = require("performanceNow"))
                )();
                var state = rateLimitCache.get(key);

                if (state == null) {
                  rateLimitCache.set(key, {
                    dropped: 0,
                    logged: [now],
                    lastAccessed: now,
                  });
                  return 1;
                }

                var dropped = state.dropped,
                  logged = state.logged;
                state.lastAccessed = now;

                while (logged[0] < now - windowMilliseconds) {
                  logged.shift();
                }

                if (logged.length < messagesPerWindow) {
                  state.dropped = 0;
                  logged.push(now);
                  return dropped + 1;
                } else {
                  state.dropped++;
                  return null;
                }
              }

              var ErrorFilter = {
                shouldLog: function shouldLog(error) {
                  return _rateLimit(error.hash);
                },
              };

              var RESCRIPT_INTERNAL_KEY = "RE_EXN_ID";

              function getErrorSafe(maybeError) {
                var error = null;

                if (maybeError == null || typeof maybeError !== "object") {
                  error = err("Non-object thrown: %s", String(maybeError));
                } else if (
                  Object.prototype.hasOwnProperty.call(
                    maybeError,
                    RESCRIPT_INTERNAL_KEY,
                  )
                ) {
                  error = err(
                    "Rescript exception thrown: %s",
                    ES("JSON", "stringify", false, maybeError),
                  );
                } else if (
                  typeof (maybeError === null || maybeError === void 0
                    ? void 0
                    : maybeError.then) === "function"
                ) {
                  error = err(
                    "Promise thrown: %s",
                    ES("JSON", "stringify", false, maybeError),
                  );
                } else if (typeof maybeError.message !== "string") {
                  error = err(
                    "Non-error thrown: %s, keys: %s",
                    String(maybeError),
                    ES(
                      "JSON",
                      "stringify",
                      false,
                      Object.keys(maybeError).sort(),
                    ),
                  );
                } else if (
                  maybeError.messageFormat != null &&
                  typeof maybeError.messageFormat !== "string"
                ) {
                  error = err(
                    "Error with non-string messageFormat thrown: %s, %s, keys: %s",
                    String(maybeError.message),
                    String(maybeError),
                    ES(
                      "JSON",
                      "stringify",
                      false,
                      Object.keys(maybeError).sort(),
                    ),
                  );
                } else if (
                  Object.isExtensible &&
                  !Object.isExtensible(maybeError)
                ) {
                  error = err(
                    "Non-extensible thrown: %s",
                    String(maybeError.message),
                  );
                }

                if (error != null) {
                  error.taalOpcodes = error.taalOpcodes || [];
                  error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
                  return error;
                }

                return maybeError;
              }

              var GLOBAL_ERROR_HANDLER_TAG =
                typeof window === "undefined"
                  ? "<self.onerror>"
                  : "<window.onerror>";

              var ErrorPubSub;

              function onGlobalError(event) {
                var _ErrorPubSub;

                var error =
                  event.error != null
                    ? getErrorSafe(event.error)
                    : err(event.message || "");

                if (error.fileName == null && event.filename != null) {
                  error.fileName = event.filename;
                }

                if (error.line == null && event.lineno != null) {
                  error.line = event.lineno;
                }

                if (error.column == null && event.colno != null) {
                  error.column = event.colno;
                }

                error.guardList = [GLOBAL_ERROR_HANDLER_TAG];
                error.loggingSource = "ONERROR";
                (_ErrorPubSub = ErrorPubSub) === null || _ErrorPubSub === void 0
                  ? void 0
                  : _ErrorPubSub.reportError(error);
              }

              var ErrorGlobalEventHandler = {
                setup: function setup(errorPubSub) {
                  if (typeof global.addEventListener !== "function") {
                    return;
                  }

                  if (ErrorPubSub != null) {
                    return;
                  }

                  ErrorPubSub = errorPubSub;
                  global.addEventListener("error", onGlobalError);
                },
              };

              var guardList = [];
              var ErrorGuardState = {
                pushGuard: function pushGuard(entry) {
                  guardList.unshift(entry);
                },

                popGuard: function popGuard() {
                  guardList.shift();
                },

                inGuard: function inGuard() {
                  return guardList.length !== 0;
                },

                cloneGuardList: function cloneGuardList() {
                  return guardList.map(function guardList_map_$0(e) {
                    return e.name;
                  });
                },

                findDeferredSource: function findDeferredSource() {
                  for (var e of guardList) {
                    if (e.deferredSource != null) {
                      return e.deferredSource;
                    }
                  }
                },
              };

              function errorLevelDefiner(error) {
                if (error.type != null) {
                  return error.type;
                }

                if (
                  error.loggingSource == "GUARDED" ||
                  error.loggingSource == "ERROR_BOUNDARY"
                ) {
                  return "fatal";
                }

                if (error.name == "SyntaxError") {
                  return "fatal";
                }

                if (
                  error.loggingSource == "ONERROR" &&
                  error.message.indexOf("ResizeObserver loop") >= 0
                ) {
                  return "warn";
                }

                if (
                  error.stack != null &&
                  error.stack.indexOf("chrome-extension://") >= 0
                ) {
                  return "warn";
                }

                return "error";
              }

              var globalMetadata = [];
              var ErrorMetadata = (function () {
                function ErrorMetadata() {
                  this.metadata = [].concat(globalMetadata);
                }
                var _proto = ErrorMetadata.prototype;
                _proto.addEntries = function addEntries() {
                  var _this$metadata;
                  (_this$metadata = this.metadata).push.apply(
                    _this$metadata,
                    arguments,
                  );
                  return this;
                };
                _proto.addEntry = function addEntry(product, name, value) {
                  this.metadata.push([product, name, value]);
                  return this;
                };
                _proto.isEmpty = function isEmpty() {
                  return this.metadata.length === 0;
                };
                _proto.clearEntries = function clearEntries() {
                  this.metadata = [];
                };
                _proto.format = function format() {
                  var formattedMetadata = [];
                  this.metadata.forEach(function metadata_forEach_$0(entry) {
                    if (entry && entry.length) {
                      var formattedEntry = entry
                        .map(function entry_map_$0(s) {
                          return s != null ? String(s).replace(/:/g, "_") : "";
                        })
                        .join(":");
                      formattedMetadata.push(formattedEntry);
                    }
                  });
                  return formattedMetadata;
                };
                _proto.getAll = function getAll() {
                  return this.metadata;
                };
                ErrorMetadata.addGlobalMetadata = function addGlobalMetadata(
                  product,
                  name,
                  value,
                ) {
                  globalMetadata.push([product, name, value]);
                };
                ErrorMetadata.getGlobalMetadata = function getGlobalMetadata() {
                  return globalMetadata;
                };
                ErrorMetadata.unsetGlobalMetadata =
                  function unsetGlobalMetadata(product, name) {
                    globalMetadata = globalMetadata.filter(
                      function globalMetadata_filter_$0(entry) {
                        return !(
                          Array.isArray(entry) &&
                          entry[0] === product &&
                          entry[1] === name
                        );
                      },
                    );
                  };
                return ErrorMetadata;
              })();

              var LEVEL_PRI = {
                debug: 1,
                info: 2,
                warn: 3,
                error: 4,
                fatal: 5,
              };

              function aggregateError(error, context) {
                var _error$messageFormat, _error$messageParams;

                if (Object.isFrozen(error)) {
                  return;
                }

                if (context.type) {
                  if (
                    !error.type ||
                    LEVEL_PRI[error.type] > LEVEL_PRI[context.type]
                  ) {
                    error.type = context.type;
                  }
                }

                var contextMeta = context.metadata;

                if (contextMeta != null) {
                  var _error$metadata;

                  var metadata =
                    (_error$metadata = error.metadata) !== null &&
                    _error$metadata !== void 0
                      ? _error$metadata
                      : new ErrorMetadata();

                  if (contextMeta != null) {
                    metadata.addEntries.apply(metadata, contextMeta.getAll());
                  }

                  error.metadata = metadata;
                }

                if (context.project != null) {
                  error.project = context.project;
                }

                if (context.errorName != null) {
                  error.errorName = context.errorName;
                }

                if (context.componentStack != null) {
                  error.componentStack = context.componentStack;
                }

                if (context.deferredSource != null) {
                  error.deferredSource = context.deferredSource;
                }

                if (context.blameModule != null) {
                  error.blameModule = context.blameModule;
                }

                if (context.loggingSource != null) {
                  error.loggingSource = context.loggingSource;
                }

                var messageFormat =
                  (_error$messageFormat = error.messageFormat) !== null &&
                  _error$messageFormat !== void 0
                    ? _error$messageFormat
                    : error.message;
                var messageParams =
                  (_error$messageParams = error.messageParams) !== null &&
                  _error$messageParams !== void 0
                    ? _error$messageParams
                    : [];

                if (
                  messageFormat !== context.messageFormat &&
                  context.messageFormat != null
                ) {
                  var _context$messageParam;

                  messageFormat +=
                    " [Caught in: " + context.messageFormat + "]";
                  messageParams.push.apply(
                    messageParams,
                    (_context$messageParam = context.messageParams) !== null &&
                      _context$messageParam !== void 0
                      ? _context$messageParam
                      : [],
                  );
                }

                error.messageFormat = messageFormat;
                error.messageParams = messageParams;
                var firstKey = context.forcedKey;
                var secondKey = error.forcedKey;
                var forcedKey =
                  firstKey != null && secondKey != null
                    ? firstKey + "_" + secondKey
                    : firstKey !== null && firstKey !== void 0
                      ? firstKey
                      : secondKey;
                error.forcedKey = forcedKey;
              }

              function toReadableMessage(error) {
                var _error$messageFormat2;

                return _printf(
                  (_error$messageFormat2 = error.messageFormat) !== null &&
                    _error$messageFormat2 !== void 0
                    ? _error$messageFormat2
                    : error.message,
                  error.messageParams || [],
                );
              }

              function _printf(format, params) {
                var index = 0;
                var safeFormat = String(format);

                var formattedMessage = safeFormat.replace(
                  /%s/g,
                  function safeFormat_replace_$1() {
                    return index < params.length ? params[index++] : "NOPARAM";
                  },
                );

                if (index < params.length) {
                  formattedMessage +=
                    " PARAMS" +
                    ES("JSON", "stringify", false, params.slice(index));
                }

                return formattedMessage;
              }

              function toStringParams(params) {
                return (params !== null && params !== void 0 ? params : []).map(
                  function map_$0(param) {
                    return String(param);
                  },
                );
              }

              var ErrorSerializer = {
                aggregateError: aggregateError,
                toReadableMessage: toReadableMessage,
                toStringParams: toStringParams,
              };

              var MAX_LENGTH = 5;

              var headerValues = [];

              function add(value) {
                headerValues.push(value);

                if (headerValues.length > MAX_LENGTH) {
                  headerValues.shift();
                }
              }

              function addFromXHR(req) {
                var headers = req.getAllResponseHeaders();

                if (headers != null && headers.indexOf("X-FB-Debug") >= 0) {
                  var xfbDebug = req.getResponseHeader("X-FB-Debug");

                  if (xfbDebug) {
                    add(xfbDebug);
                  }
                }
              }

              function getAll() {
                return headerValues;
              }

              var ErrorXFBDebug = {
                add: add,
                addFromXHR: addFromXHR,
                getAll: getAll,
              };

              var CHARS = "abcdefghijklmnopqrstuvwxyz012345";

              function getSimpleHash() {
                var hash = 0;
                for (
                  var _len2 = arguments.length,
                    toBeHashed = new Array(_len2),
                    _key2 = 0;
                  _key2 < _len2;
                  _key2++
                ) {
                  toBeHashed[_key2] = arguments[_key2];
                }

                for (var s of toBeHashed) {
                  if (s != null) {
                    var len = s.length;

                    for (var i = 0; i < len; i++) {
                      hash = (hash << 5) - hash + s.charCodeAt(i);
                    }
                  }
                }

                var simpleHash = "";

                for (var j = 0; j < 6; j++) {
                  simpleHash = CHARS.charAt(hash & 0x1f) + simpleHash;
                  hash >>= 5;
                }

                return simpleHash;
              }

              var STACK_FRAME_FORMATS = [
                /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
                /@([^\s\)\()]+):(\d+):(\d+)$/,
                /^([^\s\)\()]+):(\d+):(\d+)$/,
                /^at ([^\s\)\()]+):(\d+):(\d+)$/,
              ];

              var CLEANUP_STACK_PATTERN = /^\w+:\s.*?\n/g;

              if (Error.stackTraceLimit != null && Error.stackTraceLimit < 80) {
                Error.stackTraceLimit = 80;
              }

              function getStackWithoutMessage(error) {
                var name = error.name,
                  message = error.message,
                  stack = error.stack;

                if (stack == null) {
                  return null;
                }

                if (name != null && message != null && message !== "") {
                  var prefix = name + ": " + message + "\n";

                  if (ES(stack, "startsWith", true, prefix)) {
                    return stack.substr(prefix.length);
                  }

                  if (stack === name + ": " + message) {
                    return null;
                  }
                }

                if (name != null) {
                  var _prefix = name + "\n";

                  if (ES(stack, "startsWith", true, _prefix)) {
                    return stack.substr(_prefix.length);
                  }
                }

                if (message != null && message !== "") {
                  var _prefix2 = ": " + message + "\n";
                  var _index = stack.indexOf(_prefix2);
                  var maybeName = stack.substring(0, _index);

                  if (/^\w+$/.test(maybeName)) {
                    return stack.substring(_index + _prefix2.length);
                  }
                }

                return stack.replace(CLEANUP_STACK_PATTERN, "");
              }

              function normalizeStackFrame(frameRaw) {
                var frame = frameRaw.trim();
                var identifier = frame;
                var script;
                var line;
                var column;

                if (ES(frame, "includes", true, "charset=utf-8;base64,")) {
                  identifier = "<inlined-file>";
                } else {
                  var matches;

                  for (var re of STACK_FRAME_FORMATS) {
                    matches = frame.match(re);

                    if (matches != null) {
                      break;
                    }
                  }

                  if (matches != null && matches.length === 4) {
                    script = matches[1];
                    line = parseInt(matches[2], 10);

                    column = parseInt(matches[3], 10);

                    identifier = frame.substring(
                      0,
                      frame.length - matches[0].length,
                    );
                  } else {
                    identifier = frame;
                  }

                  identifier = identifier.replace(/^at /, "").trim();
                }

                var stackFrame = {
                  identifier: identifier,
                  script: script,
                  line: line,
                  column: column,
                };
                stackFrame.text = formatStackFrame(stackFrame);
                return stackFrame;
              }

              function normalizeStack(stack) {
                if (stack == null || stack === "") {
                  return [];
                }

                return stack
                  .split(/\n\n/)[0]
                  .split("\n")
                  .map(normalizeStackFrame);
              }

              function normalizeErrorStack(error) {
                var stackWithoutMessage = getStackWithoutMessage(error);
                return normalizeStack(stackWithoutMessage);
              }

              function normalizeReactComponentStack(componentStack) {
                if (componentStack == null || componentStack === "") {
                  return null;
                }

                var stack = componentStack.split("\n");
                stack.splice(0, 1);
                return stack.map(function stack_map_$0(line) {
                  return line.trim();
                });
              }

              function formatStackFrame(_ref3) {
                var identifier = _ref3.identifier,
                  script = _ref3.script,
                  line = _ref3.line,
                  column = _ref3.column;
                var text =
                  "    at " +
                  (identifier !== null && identifier !== void 0
                    ? identifier
                    : "<unknown>");

                if (script != null && line != null && column != null) {
                  text += " (" + script + ":" + line + ":" + column + ")";
                }

                return text;
              }

              function normalizeError(error) {
                var _error$taalOpcodes,
                  _error$messageFormat,
                  _error$messageParams,
                  _error$errorName,
                  _error$lineNumber,
                  _error$columnNumber,
                  _error$fileName,
                  _error$extra,
                  _error$guardList;

                var stackData = normalizeErrorStack(error);
                var taalOpcodes =
                  (_error$taalOpcodes = error.taalOpcodes) !== null &&
                  _error$taalOpcodes !== void 0
                    ? _error$taalOpcodes
                    : [];
                var framesToPop = error.framesToPop;

                if (framesToPop != null) {
                  framesToPop = Math.min(framesToPop, stackData.length);

                  while (framesToPop-- > 0) {
                    taalOpcodes.unshift(TAALOpcode.PREVIOUS_FRAME);
                  }
                }

                var messageFormat =
                  (_error$messageFormat = error.messageFormat) !== null &&
                  _error$messageFormat !== void 0
                    ? _error$messageFormat
                    : error.message;
                var messageParams = (
                  (_error$messageParams = error.messageParams) !== null &&
                  _error$messageParams !== void 0
                    ? _error$messageParams
                    : []
                ).map(function map_$0(param) {
                  return String(param);
                });
                var reactComponentStack = normalizeReactComponentStack(
                  error.componentStack,
                );
                var componentStackFrames =
                  reactComponentStack == null
                    ? null
                    : reactComponentStack.map(normalizeStackFrame);
                var metadata = error.metadata
                  ? error.metadata.format()
                  : new ErrorMetadata().format();

                if (metadata.length === 0) {
                  metadata = undefined;
                }

                var stack = stackData
                  .map(function stackData_map_$0(frame) {
                    return frame.text;
                  })
                  .join("\n");
                var name =
                  (_error$errorName = error.errorName) !== null &&
                  _error$errorName !== void 0
                    ? _error$errorName
                    : error.name;
                var type = errorLevelDefiner(error);
                var loggingSource = error.loggingSource,
                  project = error.project;
                var line =
                  (_error$lineNumber = error.lineNumber) !== null &&
                  _error$lineNumber !== void 0
                    ? _error$lineNumber
                    : error.line;
                var column =
                  (_error$columnNumber = error.columnNumber) !== null &&
                  _error$columnNumber !== void 0
                    ? _error$columnNumber
                    : error.column;
                var script =
                  (_error$fileName = error.fileName) !== null &&
                  _error$fileName !== void 0
                    ? _error$fileName
                    : error.sourceURL;
                var hasStackFrames = stackData.length > 0;

                if (hasStackFrames && line == null) {
                  line = stackData[0].line;
                }

                if (hasStackFrames && column == null) {
                  column = stackData[0].column;
                }

                if (hasStackFrames && script == null) {
                  script = stackData[0].script;
                }

                var info = {
                  blameModule: error.blameModule,
                  cause: error.cause,
                  column: column == null ? null : String(column),
                  clientTime: Math.floor(Date.now() / 1000),
                  componentStackFrames: componentStackFrames,
                  deferredSource:
                    error.deferredSource != null
                      ? normalizeError(error.deferredSource)
                      : null,
                  extra:
                    (_error$extra = error.extra) !== null &&
                    _error$extra !== void 0
                      ? _error$extra
                      : {},

                  fbtrace_id: error.fbtrace_id,
                  guardList:
                    (_error$guardList = error.guardList) !== null &&
                    _error$guardList !== void 0
                      ? _error$guardList
                      : [],
                  hash: getSimpleHash(
                    name,
                    stack,
                    type,
                    project,
                    loggingSource,
                  ),
                  isNormalizedError: true,
                  line: line == null ? null : String(line),
                  loggingSource: loggingSource,
                  message: ErrorSerializer.toReadableMessage(error),
                  messageFormat: messageFormat,
                  messageParams: messageParams,
                  metadata: metadata,
                  name: name,
                  page_time: Math.floor(
                    (
                      _require_closure_performanceNow ||
                      (_require_closure_performanceNow = require("performanceNow"))
                    )(),
                  ),
                  project: project,
                  reactComponentStack: reactComponentStack,
                  script: script,
                  serverHash: error.serverHash,
                  stack: stack,
                  stackFrames: stackData,
                  type: type,
                  xFBDebug: ErrorXFBDebug.getAll(),
                };

                if (error.forcedKey != null) {
                  info.forcedKey = error.forcedKey;
                }

                if (taalOpcodes.length > 0) {
                  info.taalOpcodes = taalOpcodes;
                }

                var location = global.location;

                if (location) {
                  info.windowLocationURL = location.href;
                }

                for (var k in info) {
                  if (info[k] == null) {
                    delete info[k];
                  }
                }

                return info;
              }

              function ifNormalizedError(maybeNormalizedError) {
                if (
                  maybeNormalizedError != null &&
                  typeof maybeNormalizedError === "object" &&
                  maybeNormalizedError.isNormalizedError === true
                ) {
                  return maybeNormalizedError;
                }

                return null;
              }

              var ErrorNormalizeUtils = {
                formatStackFrame: formatStackFrame,
                normalizeError: normalizeError,
                ifNormalizedError: ifNormalizedError,
              };

              var GLOBAL_REACT_ERROR_HANDLER_TAG = "<global.react>";

              var listeners = [];

              var history = [];
              var MAX_HISTORY = 50;

              var isReporting = false;
              var ErrorPubSub$1 = {
                history: history,

                addListener: function addListener(listener, noPlayback) {
                  if (noPlayback === void 0) {
                    noPlayback = false;
                  }
                  listeners.push(listener);

                  if (!noPlayback) {
                    history.forEach(function history_forEach_$0(error) {
                      var _error$loggingSource;

                      return listener(
                        error,
                        (_error$loggingSource = error.loggingSource) !== null &&
                          _error$loggingSource !== void 0
                          ? _error$loggingSource
                          : "DEPRECATED",
                      );
                    });
                  }
                },

                unshiftListener: function unshiftListener(listener) {
                  listeners.unshift(listener);
                },

                removeListener: function removeListener(listener) {
                  require("removeFromArray")(listeners, listener);
                },

                reportError: function reportError(error) {
                  var normalizedError =
                    ErrorNormalizeUtils.normalizeError(error);
                  ErrorPubSub$1.reportNormalizedError(normalizedError);
                },

                reportNormalizedError: function reportNormalizedError(
                  normalizedError,
                ) {
                  if (isReporting) {
                    if (__DEV__) {
                      var isTestEnv = typeof expect !== "undefined";

                      if (isTestEnv) {
                        var tagsSection =
                          normalizedError.tags != null
                            ? "[" + normalizedError.tags.join(",") + "]"
                            : "";
                        console.error(
                          tagsSection +
                            normalizedError.message +
                            "\n" +
                            normalizedError.stack,
                        );
                      } else {
                        console.error(
                          "Error reported during error processing",
                          normalizedError,
                        );
                      }
                    }

                    return false;
                  }

                  var guardList = ErrorGuardState.cloneGuardList();

                  if (normalizedError.componentStackFrames) {
                    guardList.unshift(GLOBAL_REACT_ERROR_HANDLER_TAG);
                  }

                  if (guardList.length > 0) {
                    normalizedError.guardList = guardList;
                  }

                  if (normalizedError.deferredSource == null) {
                    var deferredSource = ErrorGuardState.findDeferredSource();

                    if (deferredSource != null) {
                      normalizedError.deferredSource =
                        ErrorNormalizeUtils.normalizeError(deferredSource);
                    }
                  }

                  if (history.length > MAX_HISTORY) {
                    history.splice(MAX_HISTORY / 2, 1);
                  }

                  history.push(normalizedError);
                  isReporting = true;

                  for (var i = 0; i < listeners.length; i++) {
                    try {
                      var _normalizedError$logg;

                      listeners[i](
                        normalizedError,
                        (_normalizedError$logg =
                          normalizedError.loggingSource) !== null &&
                          _normalizedError$logg !== void 0
                          ? _normalizedError$logg
                          : "DEPRECATED",
                      );
                    } catch (e) {
                      if (__DEV__) {
                        console.error(
                          "Error thrown from listener during error processing",
                          e,
                        );
                      }
                    }
                  }

                  isReporting = false;
                  return true;
                },
              };
              ErrorPubSub$1.addListener(ErrorBrowserConsole.errorListener);

              var ANONYMOUS_GUARD_TAG = "<anonymous guard>";

              var _skipGuard = false;
              var ErrorGuard = {
                applyWithGuard: function applyWithGuard(
                  func,
                  context,
                  args,
                  metaArgs,
                ) {
                  if (
                    ErrorConfig.config.skipDupErrorGuard &&
                    "__isMetaErrorGuarded" in func
                  ) {
                    return func.apply(context, args);
                  }

                  ErrorGuardState.pushGuard({
                    name:
                      ((metaArgs === null || metaArgs === void 0
                        ? void 0
                        : metaArgs.name) != null
                        ? metaArgs.name
                        : null) ||
                      (func.name ? "func_name:" + func.name : null) ||
                      ANONYMOUS_GUARD_TAG,
                    deferredSource:
                      metaArgs === null || metaArgs === void 0
                        ? void 0
                        : metaArgs.deferredSource,
                  });

                  if (_skipGuard) {
                    try {
                      return func.apply(context, args);
                    } finally {
                      ErrorGuardState.popGuard();
                    }
                  }

                  try {
                    return Function.prototype.apply.call(func, context, args);
                  } catch (ex) {
                    try {
                      var _metaArgs$project;

                      var _ref4 =
                          metaArgs !== null && metaArgs !== void 0
                            ? metaArgs
                            : babelHelpers["extends"]({}, null),
                        deferredSource = _ref4.deferredSource,
                        onError = _ref4.onError,
                        onNormalizedError = _ref4.onNormalizedError;

                      var error = getErrorSafe(ex);
                      var errorContext = {
                        deferredSource: deferredSource,
                        loggingSource: "GUARDED",
                        project:
                          (_metaArgs$project =
                            metaArgs === null || metaArgs === void 0
                              ? void 0
                              : metaArgs.project) !== null &&
                          _metaArgs$project !== void 0
                            ? _metaArgs$project
                            : "ErrorGuard",
                        type:
                          metaArgs === null || metaArgs === void 0
                            ? void 0
                            : metaArgs.errorType,
                      };
                      ErrorSerializer.aggregateError(error, errorContext);
                      var normalizedError =
                        ErrorNormalizeUtils.normalizeError(error);

                      if (error == null && func) {
                        normalizedError.extra[
                          func.toString().substring(0, 100)
                        ] = "function";

                        if (args != null && args.length) {
                          normalizedError.extra[
                            ES("Array", "from", false, args)
                              .toString()
                              .substring(0, 100)
                          ] = "args";
                        }
                      }

                      normalizedError.guardList =
                        ErrorGuardState.cloneGuardList();

                      if (onError) {
                        onError(error);
                      }

                      if (onNormalizedError) {
                        onNormalizedError(normalizedError);
                      }

                      ErrorPubSub$1.reportNormalizedError(normalizedError);
                    } catch (e) {}
                  } finally {
                    ErrorGuardState.popGuard();
                  }
                },

                guard: function guard(func, metaArgs) {
                  function guarded() {
                    for (
                      var _len3 = arguments.length,
                        args = new Array(_len3),
                        _key3 = 0;
                      _key3 < _len3;
                      _key3++
                    ) {
                      args[_key3] = arguments[_key3];
                    }
                    return ErrorGuard.applyWithGuard(
                      func,
                      this,
                      args,
                      metaArgs,
                    );
                  }

                  guarded.__isMetaErrorGuarded = true;

                  if (func.__SMmeta) {
                    guarded.__SMmeta = func.__SMmeta;
                  }

                  if (__DEV__) {
                    guarded.toString = ES(func.toString, "bind", true, func);
                  }

                  return guarded;
                },

                inGuard: function inGuard() {
                  return ErrorGuardState.inGuard();
                },

                skipGuardGlobal: function skipGuardGlobal(value) {
                  _skipGuard = value;
                },
              };

              var MAX_MESSAGE_LENGTH = 1024;
              var errorAncestors = [];
              var pagePosition = 0;

              function _toInt64(n) {
                return String(n);
              }

              function _toInt64Nullable(n) {
                return n == null ? null : String(n);
              }

              function _mergeExtra(errorExtra, extra) {
                var mergedExtra = {};

                if (extra) {
                  extra.forEach(function extra_forEach_$0(key) {
                    mergedExtra[key] = true;
                  });
                }

                Object.keys(errorExtra).forEach(function forEach_$0(key) {
                  if (errorExtra[key]) {
                    mergedExtra[key] = true;
                  } else if (mergedExtra[key]) {
                    delete mergedExtra[key];
                  }
                });
                return Object.keys(mergedExtra);
              }

              function _convertStack(stackFrames) {
                return (
                  stackFrames !== null && stackFrames !== void 0
                    ? stackFrames
                    : []
                ).map(function map_$0(frame) {
                  return {
                    column: _toInt64Nullable(frame.column),
                    identifier: frame.identifier,
                    line: _toInt64Nullable(frame.line),
                    script: frame.script,
                  };
                });
              }

              function _truncateHugeString(stringOrParam) {
                var s = String(stringOrParam);

                if (s.length > MAX_MESSAGE_LENGTH) {
                  return s.substring(0, MAX_MESSAGE_LENGTH - 3) + "...";
                }

                return s;
              }

              function createErrorPayload(error, info) {
                var _info$bundle_variant,
                  _info$frontend_env,
                  _info$rollout_hash,
                  _info$additional_clie;

                var newError = {
                  appId: _toInt64Nullable(info.appId),
                  cavalry_lid: info.cavalry_lid,
                  access_token: ErrorDynamicData.access_token,
                  ancestor_hash: error.hash,
                  bundle_variant:
                    (_info$bundle_variant = info.bundle_variant) !== null &&
                    _info$bundle_variant !== void 0
                      ? _info$bundle_variant
                      : null,
                  clientTime: _toInt64(error.clientTime),
                  column: error.column,
                  componentStackFrames: _convertStack(
                    error.componentStackFrames,
                  ),
                  events: error.events,
                  extra: _mergeExtra(error.extra, info.extra),
                  forcedKey: error.forcedKey,
                  frontend_env:
                    (_info$frontend_env = info.frontend_env) !== null &&
                    _info$frontend_env !== void 0
                      ? _info$frontend_env
                      : null,
                  guardList: error.guardList,
                  line: error.line,
                  loggingFramework: info.loggingFramework,
                  messageFormat: _truncateHugeString(error.messageFormat),
                  messageParams: error.messageParams.map(_truncateHugeString),
                  name: error.name,
                  sample_weight: _toInt64Nullable(info.sample_weight),
                  script: error.script,
                  site_category: info.site_category,
                  stackFrames: _convertStack(error.stackFrames),
                  type: error.type,
                  page_time: _toInt64Nullable(error.page_time),
                  project: error.project,
                  push_phase: info.push_phase,
                  report_source: info.report_source,
                  report_source_ref: info.report_source_ref,
                  rollout_hash:
                    (_info$rollout_hash = info.rollout_hash) !== null &&
                    _info$rollout_hash !== void 0
                      ? _info$rollout_hash
                      : null,
                  script_path: info.script_path,
                  server_revision: _toInt64Nullable(info.server_revision),
                  spin: _toInt64Nullable(info.spin),
                  svn_rev: String(info.client_revision),
                  additional_client_revisions: ES(
                    "Array",
                    "from",
                    false,
                    (_info$additional_clie =
                      info.additional_client_revisions) !== null &&
                      _info$additional_clie !== void 0
                      ? _info$additional_clie
                      : [],
                  ).map(_toInt64),
                  taalOpcodes:
                    error.taalOpcodes == null
                      ? null
                      : error.taalOpcodes.map(
                          function error_taalOpcodes_map_$0(v) {
                            return v;
                          },
                        ),
                  web_session_id: info.web_session_id,
                  version: "3",
                  xFBDebug: error.xFBDebug,
                  tags: error.tags,
                };
                var blameModule = error.blameModule,
                  deferredSource = error.deferredSource;

                if (blameModule != null) {
                  newError.blameModule = String(blameModule);
                }

                if (deferredSource && deferredSource.stackFrames) {
                  newError.deferredSource = {
                    stackFrames: _convertStack(deferredSource.stackFrames),
                  };
                }

                if (error.metadata) {
                  newError.metadata = error.metadata;
                }

                if (error.loadingUrls) {
                  newError.loadingUrls = error.loadingUrls;
                }

                if (error.serverHash != null) {
                  newError.serverHash = error.serverHash;
                }

                if (error.windowLocationURL != null) {
                  newError.windowLocationURL = error.windowLocationURL;
                }

                if (error.loggingSource != null) {
                  newError.loggingSource = error.loggingSource;
                }

                return newError;
              }

              function postError(error, info, logger) {
                var _info$projectBlocklis;

                pagePosition++;

                if (info.sample_weight === 0) {
                  return false;
                }

                var clientWeight = ErrorFilter.shouldLog(error);

                if (clientWeight == null) {
                  return false;
                }

                if (
                  (_info$projectBlocklis = info.projectBlocklist) !== null &&
                  _info$projectBlocklis !== void 0 &&
                  ES(_info$projectBlocklis, "includes", true, error.project)
                ) {
                  return false;
                }

                var errorPayload = createErrorPayload(error, info);

                ES("Object", "assign", false, errorPayload, {
                  ancestors: errorAncestors.slice(),
                  clientWeight: _toInt64(clientWeight),
                  page_position: _toInt64(pagePosition),
                });

                if (
                  errorAncestors.length < 15 &&
                  ES(["fatal", "error"], "includes", true, error.type)
                ) {
                  errorAncestors.push(error.hash);
                }

                logger(errorPayload);
                return true;
              }

              var ErrorPoster = {
                createErrorPayload: createErrorPayload,
                postError: postError,
              };

              var maybeLocalErrorPubSub = null;
              var subscribed = false;

              function onunhandledrejection(event) {
                if (maybeLocalErrorPubSub == null) {
                  return;
                }

                var localErrorPubSub = maybeLocalErrorPubSub;

                var reason = event.reason;
                var withKeys;
                var expandedError = getErrorSafe(reason);
                var nameToAssign = null;

                if (
                  reason !== expandedError &&
                  typeof reason === "object" &&
                  reason !== null
                ) {
                  withKeys = Object.keys(reason).sort().slice(0, 3);

                  if (
                    typeof reason.message !== "string" &&
                    typeof reason.messageFormat === "string"
                  ) {
                    reason.message = reason.messageFormat;
                    expandedError = getErrorSafe(reason);
                  }

                  if (
                    typeof reason.message !== "string" &&
                    typeof reason.errorMsg === "string"
                  ) {
                    if (/^\s*\<!doctype/i.test(reason.errorMsg)) {
                      var match =
                        /<title>([^<]+)<\/title>(?:(?:.|\n)*<h1>([^<]+)<\/h1>)?/im.exec(
                          reason.errorMsg,
                        );

                      if (match) {
                        var _match$, _match$2;

                        expandedError = err(
                          'HTML document with title="%s" and h1="%s"',
                          (_match$ = match[1]) !== null && _match$ !== void 0
                            ? _match$
                            : "",
                          (_match$2 = match[2]) !== null && _match$2 !== void 0
                            ? _match$2
                            : "",
                        );
                      } else {
                        expandedError = err("HTML document sanitized");
                      }
                    } else if (/^\s*<\?xml/i.test(reason.errorMsg)) {
                      expandedError = err("XML document sanitized");
                    } else {
                      reason.message = reason.errorMsg;
                      expandedError = getErrorSafe(reason);
                    }
                  }

                  if (
                    expandedError !== reason &&
                    typeof reason.name === "string"
                  ) {
                    nameToAssign = reason.name;
                  }

                  if (
                    typeof reason.name !== "string" &&
                    typeof reason.errorCode === "string"
                  ) {
                    nameToAssign =
                      "UnhandledRejectionWith_errorCode_" + reason.errorCode;
                  }

                  if (
                    typeof reason.name !== "string" &&
                    typeof reason.error === "number"
                  ) {
                    nameToAssign =
                      "UnhandledRejectionWith_error_" + String(reason.error);
                  }
                }

                expandedError.loggingSource = "ONUNHANDLEDREJECTION";

                try {
                  nameToAssign =
                    expandedError === reason &&
                    nameToAssign != null &&
                    nameToAssign !== ""
                      ? nameToAssign
                      : typeof (reason === null || reason === void 0
                            ? void 0
                            : reason.name) === "string" && reason.name !== ""
                        ? reason.name
                        : withKeys != null && withKeys.length > 0
                          ? "UnhandledRejectionWith_" + withKeys.join("_")
                          : "UnhandledRejection_" +
                            (reason === null ? "null" : typeof reason);

                  expandedError.name = nameToAssign;
                } catch (_unused) {}

                try {
                  var reasonStack =
                    reason === null || reason === void 0
                      ? void 0
                      : reason.stack;

                  if (typeof reasonStack !== "string" || reasonStack === "") {
                    reasonStack = expandedError.stack;
                  }

                  if (typeof reasonStack !== "string" || reasonStack === "") {
                    reasonStack = err("").stack;
                  }

                  expandedError.stack =
                    expandedError.name +
                    ": " +
                    expandedError.message +
                    "\n" +
                    reasonStack.split("\n").slice(1).join("\n");
                } catch (_unused2) {}

                try {
                  var promise = event.promise;
                  expandedError.stack =
                    expandedError.stack +
                    (promise != null && typeof promise.settledStack === "string"
                      ? "\n    at <promise_settled_stack_below>\n" +
                        promise.settledStack
                      : "") +
                    (promise != null && typeof promise.createdStack === "string"
                      ? "\n    at <promise_created_stack_below>\n" +
                        promise.createdStack
                      : "");
                } catch (_unused3) {}

                try {
                  var _promise = event.promise;

                  if (
                    "__isPromiseWithTracing" in _promise &&
                    _promise.__isPromiseWithTracing === true &&
                    _promise.deferredError != null
                  ) {
                    expandedError.deferredSource = getErrorSafe(
                      _promise.deferredError,
                    );
                  }
                } catch (_unused4) {}

                localErrorPubSub.reportError(expandedError);

                event.preventDefault();
              }

              function setup$1(injectedErrorPubSub) {
                maybeLocalErrorPubSub = injectedErrorPubSub;

                if (
                  typeof global.addEventListener === "function" &&
                  !subscribed
                ) {
                  subscribed = true;
                  global.addEventListener(
                    "unhandledrejection",
                    onunhandledrejection,
                  );
                }
              }

              var ErrorUnhandledRejectionHandler = {
                onunhandledrejection: onunhandledrejection,
                setup: setup$1,
              };

              var ErrorSetup = {
                preSetup: function preSetup(options) {
                  if (options == null || options.ignoreOnError !== true) {
                    ErrorGlobalEventHandler.setup(ErrorPubSub$1);
                  }

                  if (
                    options == null ||
                    options.ignoreOnUnahndledRejection !== true
                  ) {
                    ErrorUnhandledRejectionHandler.setup(ErrorPubSub$1);
                  }
                },

                setup: function setup(loggingInfo, logger, addAnnotations) {
                  ErrorPubSub$1.addListener(
                    function ErrorPubSub$1_addListener_$0(error) {
                      var _addAnnotations;

                      var annotatedLoggingInfo = babelHelpers["extends"](
                        {},
                        loggingInfo,
                        (_addAnnotations =
                          addAnnotations === null || addAnnotations === void 0
                            ? void 0
                            : addAnnotations()) !== null &&
                          _addAnnotations !== void 0
                          ? _addAnnotations
                          : {},
                      );

                      ErrorPoster.postError(
                        error,
                        annotatedLoggingInfo,
                        logger,
                      );
                    },
                  );
                },
              };

              var MAX_EVENTS_LOG_SIZE = 20;
              var FBLogMessage = (function () {
                function FBLogMessage(project, tags) {
                  var _this = this;
                  if (tags === void 0) {
                    tags = [];
                  }
                  this.FATAL = function (string) {
                    var formattedString = string.join("%s");
                    for (
                      var _len4 = arguments.length,
                        expressions = new Array(_len4 > 1 ? _len4 - 1 : 0),
                        _key4 = 1;
                      _key4 < _len4;
                      _key4++
                    ) {
                      expressions[_key4 - 1] = arguments[_key4];
                    }
                    _this.fatal.apply(
                      _this,
                      [formattedString].concat(expressions),
                    );
                  };
                  this.MUSTFIX = function (string) {
                    var formattedString = string.join("%s");
                    for (
                      var _len5 = arguments.length,
                        expressions = new Array(_len5 > 1 ? _len5 - 1 : 0),
                        _key5 = 1;
                      _key5 < _len5;
                      _key5++
                    ) {
                      expressions[_key5 - 1] = arguments[_key5];
                    }
                    _this.mustfix.apply(
                      _this,
                      [formattedString].concat(expressions),
                    );
                  };
                  this.WARN = function (string) {
                    var formattedString = string.join("%s");
                    for (
                      var _len6 = arguments.length,
                        expressions = new Array(_len6 > 1 ? _len6 - 1 : 0),
                        _key6 = 1;
                      _key6 < _len6;
                      _key6++
                    ) {
                      expressions[_key6 - 1] = arguments[_key6];
                    }
                    _this.warn.apply(
                      _this,
                      [formattedString].concat(expressions),
                    );
                  };
                  this.INFO = function (string) {
                    var formattedString = string.join("%s");
                    for (
                      var _len7 = arguments.length,
                        expressions = new Array(_len7 > 1 ? _len7 - 1 : 0),
                        _key7 = 1;
                      _key7 < _len7;
                      _key7++
                    ) {
                      expressions[_key7 - 1] = arguments[_key7];
                    }
                    _this.info.apply(
                      _this,
                      [formattedString].concat(expressions),
                    );
                  };
                  this.DEBUG = function (string) {
                    var formattedString = string.join("%s");
                    for (
                      var _len8 = arguments.length,
                        expressions = new Array(_len8 > 1 ? _len8 - 1 : 0),
                        _key8 = 1;
                      _key8 < _len8;
                      _key8++
                    ) {
                      expressions[_key8 - 1] = arguments[_key8];
                    }
                    _this.debug.apply(
                      _this,
                      [formattedString].concat(expressions),
                    );
                  };
                  this.project = project;
                  this.events = [];
                  this.metadata = new ErrorMetadata();
                  this.taalOpcodes = [];
                  this.loggerTags = new Set(tags);
                }
                var _proto2 = FBLogMessage.prototype;
                _proto2.$FBLogMessage_log = function $FBLogMessage_log(
                  type,
                  format,
                ) {
                  var safeFormat = String(format);
                  var events = this.events,
                    project = this.project,
                    metadata = this.metadata,
                    blameModule = this.blameModule,
                    forcedKey = this.forcedKey;
                  var error = this.error;
                  var normalizedError;
                  for (
                    var _len9 = arguments.length,
                      params = new Array(_len9 > 2 ? _len9 - 2 : 0),
                      _key9 = 2;
                    _key9 < _len9;
                    _key9++
                  ) {
                    params[_key9 - 2] = arguments[_key9];
                  }
                  if (this.normalizedError) {
                    normalizedError = babelHelpers["extends"](
                      {},
                      this.normalizedError,
                      {
                        messageFormat:
                          this.normalizedError.messageFormat +
                          " [Caught in: " +
                          safeFormat +
                          "]",
                        messageParams: ErrorSerializer.toStringParams(
                          [].concat(this.normalizedError.messageParams, params),
                        ),
                        project: project,
                        type: type,
                        loggingSource: "FBLOGGER",
                      },
                    );
                    normalizedError.message =
                      ErrorSerializer.toReadableMessage(normalizedError);
                    if (forcedKey != null) {
                      normalizedError.forcedKey =
                        normalizedError.forcedKey != null
                          ? forcedKey + "_" + normalizedError.forcedKey
                          : forcedKey;
                    }
                  } else if (error) {
                    if (this.taalOpcodes.length > 0) {
                      new FBLogMessage("fblogger")
                        .blameToPreviousFrame()
                        .blameToPreviousFrame()
                        .warn("Blame helpers do not work with catching");
                    }
                    ErrorSerializer.aggregateError(error, {
                      messageFormat: safeFormat,
                      messageParams: ErrorSerializer.toStringParams(params),
                      errorName: error.name,
                      forcedKey: forcedKey,
                      project: project,
                      type: type,
                      loggingSource: "FBLOGGER",
                    });
                    normalizedError = ErrorNormalizeUtils.normalizeError(error);
                  } else {
                    error = new Error(safeFormat);
                    if (error.stack === undefined) {
                      try {
                        throw error;
                      } catch (_) {}
                    }
                    error.messageFormat = safeFormat;
                    error.messageParams =
                      ErrorSerializer.toStringParams(params);
                    error.blameModule = blameModule;
                    error.forcedKey = forcedKey;
                    error.project = project;
                    error.type = type;
                    error.loggingSource = "FBLOGGER";
                    error.taalOpcodes = [
                      TAALOpcode.PREVIOUS_FRAME,
                      TAALOpcode.PREVIOUS_FRAME,
                    ].concat(this.taalOpcodes);
                    normalizedError = ErrorNormalizeUtils.normalizeError(error);
                    normalizedError.name = "FBLogger";
                  }
                  if (!metadata.isEmpty()) {
                    if (normalizedError.metadata == null) {
                      normalizedError.metadata = metadata.format();
                    } else {
                      var allMetadata = normalizedError.metadata.concat(
                        metadata.format(),
                      );
                      var uniqueMetadata = new Set(allMetadata);
                      normalizedError.metadata = ES(
                        "Array",
                        "from",
                        false,
                        uniqueMetadata.values(),
                      );
                    }
                  }
                  if (events.length > 0) {
                    if (normalizedError.events != null) {
                      var _normalizedError$even;
                      (_normalizedError$even =
                        normalizedError.events).push.apply(
                        _normalizedError$even,
                        events,
                      );
                    } else {
                      normalizedError.events = [].concat(events);
                    }
                    if (
                      normalizedError.events != null &&
                      normalizedError.events.length > MAX_EVENTS_LOG_SIZE
                    ) {
                      var omitted =
                        normalizedError.events.length - MAX_EVENTS_LOG_SIZE;
                      normalizedError.events.splice(
                        0,
                        omitted + 1,
                        "<first " + omitted + " events omitted>",
                      );
                    }
                  }
                  normalizedError.tags = ES(
                    "Array",
                    "from",
                    false,
                    this.loggerTags,
                  );
                  ErrorPubSub$1.reportNormalizedError(normalizedError);
                  return error;
                };
                _proto2.fatal = function fatal(format) {
                  for (
                    var _len0 = arguments.length,
                      params = new Array(_len0 > 1 ? _len0 - 1 : 0),
                      _key0 = 1;
                    _key0 < _len0;
                    _key0++
                  ) {
                    params[_key0 - 1] = arguments[_key0];
                  }
                  this.$FBLogMessage_log.apply(
                    this,
                    ["fatal", format].concat(params),
                  );
                };
                _proto2.mustfix = function mustfix(format) {
                  for (
                    var _len1 = arguments.length,
                      params = new Array(_len1 > 1 ? _len1 - 1 : 0),
                      _key1 = 1;
                    _key1 < _len1;
                    _key1++
                  ) {
                    params[_key1 - 1] = arguments[_key1];
                  }
                  this.$FBLogMessage_log.apply(
                    this,
                    ["error", format].concat(params),
                  );
                };
                _proto2.warn = function warn(format) {
                  for (
                    var _len10 = arguments.length,
                      params = new Array(_len10 > 1 ? _len10 - 1 : 0),
                      _key10 = 1;
                    _key10 < _len10;
                    _key10++
                  ) {
                    params[_key10 - 1] = arguments[_key10];
                  }
                  this.$FBLogMessage_log.apply(
                    this,
                    ["warn", format].concat(params),
                  );
                };
                _proto2.info = function info(format) {
                  for (
                    var _len11 = arguments.length,
                      params = new Array(_len11 > 1 ? _len11 - 1 : 0),
                      _key11 = 1;
                    _key11 < _len11;
                    _key11++
                  ) {
                    params[_key11 - 1] = arguments[_key11];
                  }
                  this.$FBLogMessage_log.apply(
                    this,
                    ["info", format].concat(params),
                  );
                };
                _proto2.debug = function debug(format) {
                  if (__DEV__) {
                    for (
                      var _len12 = arguments.length,
                        params = new Array(_len12 > 1 ? _len12 - 1 : 0),
                        _key12 = 1;
                      _key12 < _len12;
                      _key12++
                    ) {
                      params[_key12 - 1] = arguments[_key12];
                    }
                    this.$FBLogMessage_log.apply(
                      this,
                      ["debug", format].concat(params),
                    );
                  }
                };
                _proto2.mustfixThrow = function mustfixThrow(format) {
                  for (
                    var _len13 = arguments.length,
                      params = new Array(_len13 > 1 ? _len13 - 1 : 0),
                      _key13 = 1;
                    _key13 < _len13;
                    _key13++
                  ) {
                    params[_key13 - 1] = arguments[_key13];
                  }
                  var errorToThrow = this.$FBLogMessage_log.apply(
                    this,
                    ["error", format].concat(params),
                  );
                  if (!errorToThrow) {
                    errorToThrow = err(
                      "mustfixThrow does not support catchingNormalizedError",
                    );
                    errorToThrow.taalOpcodes = errorToThrow.taalOpcodes || [];
                    errorToThrow.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
                  }
                  try {
                    errorToThrow.message =
                      ErrorSerializer.toReadableMessage(errorToThrow);
                  } catch (_unused5) {}
                  throw errorToThrow;
                };
                _proto2.catching = function catching(error) {
                  if (!(error instanceof Error)) {
                    new FBLogMessage("fblogger")
                      .blameToPreviousFrame()
                      .warn("Catching non-Error object is not supported");
                  } else {
                    this.error = error;
                  }
                  return this;
                };
                _proto2.catchingNormalizedError =
                  function catchingNormalizedError(normalizedError) {
                    this.normalizedError = normalizedError;
                    return this;
                  };
                _proto2.event = function event(_event) {
                  this.events.push(_event);
                  return this;
                };
                _proto2.blameToModule = function blameToModule(module) {
                  this.blameModule = module;
                  return this;
                };
                _proto2.blameToPreviousFile = function blameToPreviousFile() {
                  this.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
                  return this;
                };
                _proto2.blameToPreviousFrame = function blameToPreviousFrame() {
                  this.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
                  return this;
                };
                _proto2.blameToPreviousDirectory =
                  function blameToPreviousDirectory() {
                    this.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
                    return this;
                  };
                _proto2.addToCategoryKey = function addToCategoryKey(addedKey) {
                  this.forcedKey = addedKey;
                  return this;
                };
                _proto2.addMetadata = function addMetadata(
                  product,
                  name,
                  value,
                ) {
                  this.metadata.addEntry(product, name, value);
                  return this;
                };
                _proto2.tags = function tags(_tags) {
                  var newTags = _tags.concat(
                    ES("Array", "from", false, this.loggerTags),
                  );
                  var newLogger = new FBLogMessage(this.project, newTags);
                  this.events.forEach(function events_forEach_$0(event) {
                    return newLogger.event(event);
                  });
                  this.metadata.getAll().forEach(function forEach_$0(_ref5) {
                    var product = _ref5[0],
                      name = _ref5[1],
                      value = _ref5[2];
                    return newLogger.addMetadata(product, name, value);
                  });
                  return newLogger;
                };
                return FBLogMessage;
              })();

              var FBLogger = function FBLogger(project, event) {
                var logger = new FBLogMessage(project);

                if (event != null) {
                  return logger.event(project + "." + event);
                }

                return logger;
              };

              FBLogger.addGlobalMetadata = function (product, name, value) {
                ErrorMetadata.addGlobalMetadata(product, name, value);
              };

              var CUSTOM_NAME_PREFIX = "<CUSTOM_NAME:";
              var CUSTOM_NAME_SUFFIX = ">";
              function renameFunction(fn, name) {
                if (fn != null && name != null) {
                  try {
                    Object.defineProperty(fn, "name", {
                      value:
                        CUSTOM_NAME_PREFIX + " " + name + CUSTOM_NAME_SUFFIX,
                    });
                  } catch (_unused6) {}
                }

                return fn;
              }

              var TAAL = {
                blameToPreviousFile: function blameToPreviousFile(error) {
                  var _error$taalOpcodes;

                  error.taalOpcodes =
                    (_error$taalOpcodes = error.taalOpcodes) !== null &&
                    _error$taalOpcodes !== void 0
                      ? _error$taalOpcodes
                      : [];
                  error.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
                  return error;
                },

                blameToPreviousFrame: function blameToPreviousFrame(error) {
                  var _error$taalOpcodes2;

                  error.taalOpcodes =
                    (_error$taalOpcodes2 = error.taalOpcodes) !== null &&
                    _error$taalOpcodes2 !== void 0
                      ? _error$taalOpcodes2
                      : [];
                  error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
                  return error;
                },

                blameToPreviousDirectory: function blameToPreviousDirectory(
                  error,
                ) {
                  var _error$taalOpcodes3;

                  error.taalOpcodes =
                    (_error$taalOpcodes3 = error.taalOpcodes) !== null &&
                    _error$taalOpcodes3 !== void 0
                      ? _error$taalOpcodes3
                      : [];
                  error.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
                  return error;
                },
              };

              var index = {
                err: err,
                ErrorBrowserConsole: ErrorBrowserConsole,
                ErrorConfig: ErrorConfig,
                ErrorDynamicData: ErrorDynamicData,
                ErrorFilter: ErrorFilter,
                ErrorGlobalEventHandler: ErrorGlobalEventHandler,
                ErrorGuard: ErrorGuard,
                ErrorGuardState: ErrorGuardState,
                ErrorMetadata: ErrorMetadata,
                ErrorNormalizeUtils: ErrorNormalizeUtils,
                ErrorPoster: ErrorPoster,
                ErrorPubSub: ErrorPubSub$1,
                ErrorSerializer: ErrorSerializer,
                ErrorSetup: ErrorSetup,
                ErrorXFBDebug: ErrorXFBDebug,
                FBLogger: FBLogger,
                getErrorSafe: getErrorSafe,
                getSimpleHash: getSimpleHash,
                TAAL: TAAL,
                TAALOpcode: TAALOpcode,
                renameFunction: renameFunction,
              };

              module.exports = index;
            },
            null,
          );
          __d(
            "FBLogger",
            ["fb-error"],
            function $module_FBLogger(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";
              exports["default"] = importDefault("fb-error").FBLogger;
            },
            98,
          );
          __d(
            "BaseDeserializePHPQueryData",
            [],
            function $module_BaseDeserializePHPQueryData(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var ARRAY_QUERY_PATTERN = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

              function replaceBadKeys(key) {
                if (key === "hasOwnProperty" || key === "__proto__") {
                  return "\ud83d\udf56";
                }
                return key;
              }

              function deserialize(query, decodeComponent) {
                if (query == null || query === "") {
                  return {};
                }

                var result = {};

                var queryAsString = query
                  .replace(/%5B/gi, "[")
                  .replace(/%5D/gi, "]");

                var queryAsArray = queryAsString.split("&");

                var hasOwnProp = Object.prototype.hasOwnProperty;

                for (
                  var ii = 0, length = queryAsArray.length;
                  ii < length;
                  ii++
                ) {
                  var match = queryAsArray[ii].match(ARRAY_QUERY_PATTERN);

                  if (!match) {
                    var splitIndex = queryAsArray[ii].indexOf("=");
                    if (splitIndex === -1) {
                      result[decodeComponent(queryAsArray[ii])] = null;
                    } else {
                      var key = queryAsArray[ii].substring(0, splitIndex);
                      var value = queryAsArray[ii].substring(splitIndex + 1);

                      result[decodeComponent(key)] = decodeComponent(value);
                    }
                  } else {
                    var indices = match[2].split(/\]\[|\[|\]/).slice(0, -1);
                    var name = match[1];
                    var _value = decodeComponent(match[3] || "");
                    indices[0] = name;

                    var resultNode = result;
                    for (var i = 0; i < indices.length - 1; i++) {
                      var _key = replaceBadKeys(indices[i]);
                      if (_key) {
                        if (!hasOwnProp.call(resultNode, _key)) {
                          var nv =
                            indices[i + 1] && !indices[i + 1].match(/^\d{1,3}$/)
                              ? {}
                              : [];

                          resultNode[_key] = nv;
                          if (resultNode[_key] !== nv) {
                            return result;
                          }
                        }

                        resultNode = resultNode[_key];
                      } else {
                        if (
                          indices[i + 1] &&
                          !indices[i + 1].match(/^\d{1,3}$/)
                        ) {
                          resultNode.push({});
                        } else {
                          resultNode.push([]);
                        }

                        resultNode = resultNode[resultNode.length - 1];
                      }
                    }

                    if (
                      resultNode instanceof Array &&
                      indices[indices.length - 1] === ""
                    ) {
                      resultNode.push(_value);
                    } else {
                      resultNode[replaceBadKeys(indices[indices.length - 1])] =
                        _value;
                    }
                  }
                }
                return result;
              }
              exports.deserialize = deserialize;
            },
            66,
          );
          __d(
            "flattenPHPQueryData",
            ["invariant"],
            function $module_flattenPHPQueryData(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
              invariant,
            ) {
              function flattenPHPQueryData(obj) {
                return _flattenPHPQueryData(obj, "", {});
              }

              function _flattenPHPQueryData(obj, name, componentsObject) {
                if (obj == null) {
                  componentsObject[name] = undefined;
                } else if (typeof obj === "object") {
                  typeof obj.appendChild !== "function" ||
                    invariant(0, "Trying to serialize a DOM node. Bad idea.");

                  for (var k in obj) {
                    if (
                      k !== "$$typeof" &&
                      Object.prototype.hasOwnProperty.call(obj, k) &&
                      obj[k] !== undefined
                    ) {
                      _flattenPHPQueryData(
                        obj[k],
                        name ? name + "[" + k + "]" : k,
                        componentsObject,
                      );
                    }
                  }
                } else {
                  componentsObject[name] = obj;
                }

                return componentsObject;
              }
              exports["default"] = flattenPHPQueryData;
            },
            98,
          );
          __d(
            "PHPQuerySerializer",
            ["BaseDeserializePHPQueryData", "flattenPHPQueryData"],
            function $module_PHPQuerySerializer(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function serialize(obj) {
                var kv_pairs = [];
                var componentsObject = importDefault("flattenPHPQueryData")(
                  obj,
                );

                for (var component in componentsObject) {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      componentsObject,
                      component,
                    )
                  ) {
                    var key = encodeComponent(component);
                    if (componentsObject[component] === undefined) {
                      kv_pairs.push(key);
                    } else {
                      kv_pairs.push(
                        key +
                          "=" +
                          encodeComponent(String(componentsObject[component])),
                      );
                    }
                  }
                }

                return kv_pairs.join("&");
              }

              function encodeComponent(raw) {
                return encodeURIComponent(raw)
                  .replace(/%5D/g, "]")
                  .replace(/%5B/g, "[");
              }

              function deserialize(query) {
                return importNamespace(
                  "BaseDeserializePHPQueryData",
                ).deserialize(query, decodeComponent);
              }

              function decodeComponent(encoded_s) {
                try {
                  return decodeURIComponent(encoded_s.replace(/\+/g, " "));
                } catch (_unused) {
                  if (__DEV__) {
                    console.error("Bad UTF8 in URL: ", encoded_s);
                  }
                  return encoded_s;
                }
              }

              var PHPQuerySerializer = {
                decodeComponent: decodeComponent,
                deserialize: deserialize,
                encodeComponent: encodeComponent,
                serialize: serialize,
              };

              module.exports = PHPQuerySerializer;
            },
            34,
          );
          __d(
            "PHPStrictQuerySerializer",
            ["PHPQuerySerializer", "flattenPHPQueryData"],
            function $module_PHPStrictQuerySerializer(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _importNamespace_closure_PHPQuerySerializer;

              function serialize(obj) {
                var kv_pairs = [];
                var componentsObject = importDefault("flattenPHPQueryData")(
                  obj,
                );

                for (var component in componentsObject) {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      componentsObject,
                      component,
                    )
                  ) {
                    var key = encodeComponent(component);
                    if (componentsObject[component] === undefined) {
                      kv_pairs.push(key);
                    } else {
                      kv_pairs.push(
                        key +
                          "=" +
                          encodeComponent(String(componentsObject[component])),
                      );
                    }
                  }
                }

                return kv_pairs.join("&");
              }

              function encodeComponent(raw) {
                return encodeURIComponent(raw);
              }
              exports.serialize = serialize;
              exports.encodeComponent = encodeComponent;
              exports.deserialize = (
                _importNamespace_closure_PHPQuerySerializer ||
                (_importNamespace_closure_PHPQuerySerializer =
                  importNamespace("PHPQuerySerializer"))
              ).deserialize;
              exports.decodeComponent =
                _importNamespace_closure_PHPQuerySerializer.decodeComponent;
            },
            98,
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
              exports,
            ) {
              "use strict";

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
                  "(#.*)?",
              );

              function parse(uriString) {
                if (uriString.trim() === "") {
                  return null;
                }
                var captures = uriString.match(PARSE_PATTERN);
                if (captures == null) {
                  return null;
                }
                var authority = captures[2] ? captures[2].substr(2) : null;
                var scheme = captures[1]
                  ? captures[1].substr(0, captures[1].length - 1)
                  : null;
                var uri = {
                  uri: captures[0] ? captures[0] : null,
                  scheme: scheme,
                  authority: authority,
                  userinfo: captures[3]
                    ? captures[3].substr(0, captures[3].length - 1)
                    : null,
                  host: captures[2] ? captures[4] : null,
                  port: captures[5]
                    ? captures[5].substr(1)
                      ? parseInt(captures[5].substr(1), 10)
                      : null
                    : null,
                  path: captures[6] ? captures[6] : null,
                  query: captures[7] ? captures[7].substr(1) : null,
                  fragment: captures[8] ? captures[8].substr(1) : null,
                  isGenericURI: authority === null && !!scheme,
                };
                return uri;
              }
              exports.parse = parse;
            },
            66,
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
              exports,
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
                  },
                );
                try {
                  reverseMapCache.set(enumObject, newReverseMap);
                } catch (_) {}
                return newReverseMap;
              }

              var EnumPrototype = Object.freeze(
                Object.defineProperties(Object.create(null), {
                  isValid: {
                    value: function value(x) {
                      return getReverseMap(this).has(x);
                    },
                  },
                  cast: {
                    value: function value(x) {
                      return this.isValid(x) ? x : undefined;
                    },
                  },
                  members: {
                    value: function value() {
                      return getReverseMap(this).keys();
                    },
                  },
                  getName: {
                    value: function value(_value) {
                      return getReverseMap(this).get(_value);
                    },
                  },
                }),
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
                    },
                  },
                  cast: {
                    value: EnumPrototype.cast,
                  },
                  members: {
                    value: function value() {
                      return Object.getOwnPropertyNames(this).values();
                    },
                  },
                  getName: {
                    value: function value(_value2) {
                      return _value2;
                    },
                  },
                }),
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
            null,
          );
          __d(
            "URISchemes",
            ["$InternalEnum"],
            function $module_URISchemes(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var defaultSchemes = new Set([
                "about",
                "accountscenter",
                "aidemos",
                "aistudio",
                "apk",
                "blob",
                "barcelona",
                "cmms",
                "fb",
                "fba",
                "fbatwork",
                "fb-ama",
                "fb-internal",
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
                "flipper",
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
                "itms-services",
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
                "instagram",
                "iglite",
                "fb124024574287414",
                "fb124024574287414rc",
                "fb124024574287414master",
                "fb1576585912599779",
                "fb929757330408142",
                "designpack",
                "fbpixelcloud",
                "fbapi20130214",
                "fb1196383223757595",
                "tbauth",
                "oculus",
                "oculus.store",
                "oculus.feed",
                "oculusstore",
                "socialplatform",
                "odh",
                "com.oculus.rd",
                "aria",
                "skype",
                "ms-windows-store",
                "callto",
                "messenger",
                "workchat",
                "fb236786383180508",
                "fb1775440806014337",
                "data",
                "fb-mk",
                "munki",
                "origami-file",
                "fb-nimble-vrsrecorder",
                "fb-nimble-monohandtrackingvis",
                "together",
                "togetherbl",
                "horizonlauncher",
                "horizon",
                "venues",
                "whatsapp-consumer",
                "whatsapp-smb",
                "fb-ide-opener",
                "fb-vscode",
                "fb-vscode-insiders",
                "editor",
                "spark-studio",
                "spark-player",
                "spark-simulator",
                "cosmo-player",
                "arstudio",
                "manifold",
                "origami-internal",
                "origami-public",
                "stella",
                "mwa",
                "mattermost",
                "logaggregator",
                "pcoip",
                "cinema",
                "home",
                "oculus360photos",
                "systemux",
                "moonstone",
                "hsr-asset-viewer",
                "upi",
                "phonepe",
                "gpay",
                "tez",
                "paytmmp",
                "bhim",
                "q4bconfigurator",
                "q4bnux",
                "fb-viewapp",
                "meta-ai",
                "x-safari-https",
                "meta-bloks",
                "facebook-horizon",
                "fbboost",
                "ctrl-hub",
              ]);
              var Options = require("$InternalEnum")({
                EXPLICITLY_ALLOWED_SCHEMES_ONLY:
                  "explicitly_allowed_schemes_only",
                INCLUDE_DEFAULTS: "include_defaults",
              });

              function isAllowed(
                scheme,
                schemeOptions,
                explicitlyAllowedSchemes,
              ) {
                if (schemeOptions === void 0) {
                  schemeOptions = Options.INCLUDE_DEFAULTS;
                }
                if (scheme == null || scheme === "") {
                  return true;
                }
                return (
                  (explicitlyAllowedSchemes == null
                    ? void 0
                    : explicitlyAllowedSchemes.has(scheme.toLowerCase())) ||
                  (schemeOptions === Options.INCLUDE_DEFAULTS &&
                    defaultSchemes.has(scheme.toLowerCase()))
                );
              }
              exports.Options = Options;
              exports.isAllowed = isAllowed;
            },
            66,
          );
          __d(
            "isSameOrigin",
            [],
            function $module_isSameOrigin(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function isSameOrigin(first, second) {
                if (
                  !first.getProtocol() ||
                  !first.getDomain() ||
                  !second.getProtocol() ||
                  !second.getDomain()
                ) {
                  return false;
                }

                return first.getOrigin() === second.getOrigin();
              }
              exports["default"] = isSameOrigin;
            },
            66,
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
              exports,
            ) {
              "use strict";

              function setHostSubdomain(domain, subdomain) {
                var pieces = domain.split(".");
                if (pieces.length < 3) {
                  pieces.unshift(subdomain);
                } else {
                  pieces[0] = subdomain;
                }
                return pieces.join(".");
              }
              exports["default"] = setHostSubdomain;
            },
            66,
          );
          __d(
            "URIAbstractBase",
            [
              "invariant",
              "FBLogger",
              "PHPStrictQuerySerializer",
              "URIRFC3986",
              "URISchemes",
              "isSameOrigin",
              "setHostSubdomain",
            ],
            function $module_URIAbstractBase(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant,
            ) {
              var _require_closure_URISchemes;
              var _require_closure_URIRFC3986;

              var UNSAFE_DOMAIN_PATTERN = new RegExp(
                "[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f" +
                  "\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF" +
                  "\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]",
              );

              var SECURITY_PATTERN = new RegExp(
                "^(?:[^/]*:|" + "[\\x00-\\x1f]*/[\\x00-\\x1f]*/)",
              );

              var uriFilters = [];
              var URIAbstractBase = (function () {
                "use strict";

                function URIAbstractBase(
                  uri,
                  serializer,
                  schemeOptions,
                  explicitlyAllowedSchemes,
                ) {
                  if (schemeOptions === void 0) {
                    schemeOptions = (
                      _require_closure_URISchemes ||
                      (_require_closure_URISchemes = require("URISchemes"))
                    ).Options.INCLUDE_DEFAULTS;
                  }
                  serializer || invariant(0, "no serializer set");
                  this.$URIAbstractBase$p_serializer = serializer;

                  this.$URIAbstractBase$p_protocol = "";
                  this.$URIAbstractBase$p_domain = "";
                  this.$URIAbstractBase$p_port = "";
                  this.$URIAbstractBase$p_path = "";
                  this.$URIAbstractBase$p_fragment = "";
                  this.$URIAbstractBase$p_isGeneric = false;
                  this.$URIAbstractBase$p_queryData = {};
                  this.$URIAbstractBase$p_forceFragmentSeparator = false;
                  this.$URIAbstractBase$p_schemeOptions = schemeOptions;
                  this.$URIAbstractBase$p_explicitlyAllowedSchemes =
                    explicitlyAllowedSchemes;
                  URIAbstractBase.parse(this, uri, true, serializer);
                  this.$URIAbstractBase$p_isQueryParamModified = false;
                }
                URIAbstractBase.parse = function parse(
                  uri,
                  uriToParse,
                  shouldThrow,
                  serializer,
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
                        serializer.serialize(uriToParse.getQueryData()),
                      ),
                    );
                    uri.setFragment(uriToParse.getFragment());
                    uri.setIsGeneric(uriToParse.getIsGeneric());
                    uri.setForceFragmentSeparator(
                      uriToParse.getForceFragmentSeparator(),
                    );
                    uri.setOriginalRawQuery(uriToParse.getOriginalRawQuery());
                    uri.setQueryParamModified(false);
                    return true;
                  }
                  uriToParse = uriToParse.toString().trim();
                  var components = (
                    _require_closure_URIRFC3986 ||
                    (_require_closure_URIRFC3986 = require("URIRFC3986"))
                  ).parse(uriToParse) || {
                    fragment: null,
                    scheme: null,
                    query: null,
                  };
                  if (
                    !shouldThrow &&
                    !(
                      _require_closure_URISchemes ||
                      (_require_closure_URISchemes = require("URISchemes"))
                    ).isAllowed(
                      components.scheme,
                      uri.$URIAbstractBase$p_schemeOptions,
                      uri.$URIAbstractBase$p_explicitlyAllowedSchemes,
                    )
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
                      serializer.deserialize(components.query || "") || {},
                    );
                  } else {
                    try {
                      uri.setQueryData(
                        serializer.deserialize(components.query || "") || {},
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
                          uriToParse,
                      );
                    }
                    return false;
                  }
                  if (!uri.getDomain() && uri.getPath().indexOf("\\") !== -1) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (no domain but multiple back-slashes): " +
                          uriToParse,
                      );
                    }
                    return false;
                  }
                  if (!uri.getProtocol() && SECURITY_PATTERN.test(uriToParse)) {
                    if (shouldThrow) {
                      throw new Error(
                        "URI.parse: invalid URI (unsafe protocol-relative URLs): " +
                          uriToParse +
                          "'",
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
                          uriToParse,
                      );
                    }
                    return false;
                  }
                  if (
                    uri.getProtocol() &&
                    !uri.getIsGeneric() &&
                    !uri.getDomain() &&
                    uri.getPath() !== ""
                  ) {
                    require("FBLogger")("uri").warn(
                      'URI.parse: invalid URI (protocol "' +
                        uri.getProtocol() +
                        '" with no domain)',
                    );
                  }
                  return true;
                };
                URIAbstractBase.tryParse = function tryParse(
                  uri,
                  serializer,
                  schemeOptions,
                  explicitlyAllowedSchemes,
                ) {
                  var result = new URIAbstractBase(
                    null,
                    serializer,
                    schemeOptions,
                    explicitlyAllowedSchemes,
                  );
                  return URIAbstractBase.parse(result, uri, false, serializer)
                    ? result
                    : null;
                };
                URIAbstractBase.isValid = function isValid(
                  uri,
                  serializer,
                  schemeOptions,
                  explicitlyAllowedSchemes,
                ) {
                  return !!URIAbstractBase.tryParse(
                    uri,
                    serializer,
                    schemeOptions,
                    explicitlyAllowedSchemes,
                  );
                };
                var _proto = URIAbstractBase.prototype;
                _proto.setProtocol = function setProtocol(protocol) {
                  if (
                    !(
                      _require_closure_URISchemes ||
                      (_require_closure_URISchemes = require("URISchemes"))
                    ).isAllowed(
                      protocol,
                      this.$URIAbstractBase$p_schemeOptions,
                      this.$URIAbstractBase$p_explicitlyAllowedSchemes,
                    )
                  ) {
                    false ||
                      invariant(
                        0,
                        '"%s" is not a valid protocol for a URI.',
                        protocol,
                      );
                  }
                  this.$URIAbstractBase$p_protocol = protocol;
                  return this;
                };
                _proto.getProtocol = function getProtocol() {
                  return (this.$URIAbstractBase$p_protocol || "").toLowerCase();
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
                        this.toString(),
                    );
                  }

                  this.$URIAbstractBase$p_domain = domain;
                  return this;
                };
                _proto.getDomain = function getDomain() {
                  return this.$URIAbstractBase$p_domain;
                };
                _proto.setPort = function setPort(port) {
                  this.$URIAbstractBase$p_port = port;
                  return this;
                };
                _proto.getPort = function getPort() {
                  return this.$URIAbstractBase$p_port;
                };
                _proto.setPath = function setPath(path) {
                  if (__DEV__) {
                    if (path && path.charAt(0) !== "/") {
                      var protocol = this.getProtocol();
                      var safe =
                        protocol === "mailto" ||
                        protocol === "tel" ||
                        protocol === "sms" ||
                        protocol === "data";
                      if (!safe) {
                        console.warn(
                          'Path does not begin with a "/" which means this URI ' +
                            "will likely be malformed. Ensure any string passed to .setPath() " +
                            'leads with "/": path "%s" for uri "%s".',
                          path,
                          this.toString(),
                        );
                      }
                    }
                  }
                  this.$URIAbstractBase$p_path = path;
                  return this;
                };
                _proto.getPath = function getPath() {
                  return this.$URIAbstractBase$p_path;
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
                      this.$URIAbstractBase$p_queryData,
                      mapOrKey,
                    );
                  } else {
                    this.$URIAbstractBase$p_queryData[mapOrKey] = value;
                  }
                  this.$URIAbstractBase$p_isQueryParamModified = true;
                  return this;
                };
                _proto.setQueryData = function setQueryData(map) {
                  this.$URIAbstractBase$p_queryData = map;
                  this.$URIAbstractBase$p_isQueryParamModified = true;
                  return this;
                };
                _proto.getQueryData = function getQueryData() {
                  return this.$URIAbstractBase$p_queryData;
                };
                _proto.setQueryString = function setQueryString(queryString) {
                  return this.setQueryData(
                    this.$URIAbstractBase$p_serializer.deserialize(queryString),
                  );
                };
                _proto.getQueryString = function getQueryString(
                  preserveQuery,
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding,
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
                  return this.$URIAbstractBase$p_renderQuery(
                    false,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
                  );
                };
                _proto.$URIAbstractBase$p_renderQuery =
                  function $URIAbstractBase$p_renderQuery(
                    rawQuery,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
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
                      !this.$URIAbstractBase$p_isQueryParamModified &&
                      (preserveQuery || isDomainNeedRawQuery(this.getDomain()))
                    ) {
                      var _this$$URIAbstractBas;
                      return (_this$$URIAbstractBas =
                        this.$URIAbstractBase$p_originalRawQuery) != null
                        ? _this$$URIAbstractBas
                        : "";
                    }
                    return (
                      rawQuery && PHPQuerySerializerNoEncoding
                        ? PHPQuerySerializerNoEncoding
                        : this.$URIAbstractBase$p_serializer
                    ).serialize(this.getQueryData());
                  };
                _proto.removeQueryData = function removeQueryData(keys) {
                  if (!Array.isArray(keys)) {
                    keys = [keys];
                  }
                  for (var i = 0, length = keys.length; i < length; ++i) {
                    delete this.$URIAbstractBase$p_queryData[keys[i]];
                  }
                  this.$URIAbstractBase$p_isQueryParamModified = true;
                  return this;
                };
                _proto.setFragment = function setFragment(fragment) {
                  this.$URIAbstractBase$p_fragment = fragment;

                  this.setForceFragmentSeparator(false);
                  return this;
                };
                _proto.getFragment = function getFragment() {
                  return this.$URIAbstractBase$p_fragment;
                };
                _proto.setForceFragmentSeparator =
                  function setForceFragmentSeparator(shouldForce) {
                    this.$URIAbstractBase$p_forceFragmentSeparator =
                      shouldForce;
                    return this;
                  };
                _proto.getForceFragmentSeparator =
                  function getForceFragmentSeparator() {
                    return this.$URIAbstractBase$p_forceFragmentSeparator;
                  };
                _proto.setIsGeneric = function setIsGeneric(isGeneric) {
                  this.$URIAbstractBase$p_isGeneric = isGeneric;
                  return this;
                };
                _proto.getIsGeneric = function getIsGeneric() {
                  return this.$URIAbstractBase$p_isGeneric;
                };
                _proto.getOriginalRawQuery = function getOriginalRawQuery() {
                  return this.$URIAbstractBase$p_originalRawQuery;
                };
                _proto.setOriginalRawQuery = function setOriginalRawQuery(
                  originalRawQuery,
                ) {
                  this.$URIAbstractBase$p_originalRawQuery = originalRawQuery;
                  return this;
                };
                _proto.setQueryParamModified = function setQueryParamModified(
                  isQueryParamModified,
                ) {
                  this.$URIAbstractBase$p_isQueryParamModified =
                    isQueryParamModified;
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
                  PHPQuerySerializerNoEncoding,
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase$p_toStringWithFilters(
                    false,
                    false,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
                  );
                };
                _proto.toStringRawQuery = function toStringRawQuery(
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding,
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase$p_toStringWithFilters(
                    true,
                    false,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
                  );
                };
                _proto.toStringPreserveQuery = function toStringPreserveQuery(
                  isDomainNeedRawQuery,
                  PHPQuerySerializerNoEncoding,
                ) {
                  if (isDomainNeedRawQuery === void 0) {
                    isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                      return false;
                    };
                  }
                  if (PHPQuerySerializerNoEncoding === void 0) {
                    PHPQuerySerializerNoEncoding = null;
                  }
                  return this.$URIAbstractBase$p_toStringWithFilters(
                    false,
                    true,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
                  );
                };
                _proto.toStringStrictQueryEncoding =
                  function toStringStrictQueryEncoding(isDomainNeedRawQuery) {
                    if (isDomainNeedRawQuery === void 0) {
                      isDomainNeedRawQuery = function isDomainNeedRawQuery() {
                        return false;
                      };
                    }
                    return this.$URIAbstractBase$p_toStringWithFilters(
                      true,
                      false,
                      isDomainNeedRawQuery,
                      require("PHPStrictQuerySerializer"),
                    );
                  };
                _proto.$URIAbstractBase$p_toStringWithFilters =
                  function $URIAbstractBase$p_toStringWithFilters(
                    rawQuery,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
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
                    return uri.$URIAbstractBase$p_toStringImpl(
                      rawQuery,
                      preserveQuery,
                      isDomainNeedRawQuery,
                      PHPQuerySerializerNoEncoding,
                    );
                  };
                _proto.$URIAbstractBase$p_toStringImpl =
                  function $URIAbstractBase$p_toStringImpl(
                    rawQuery,
                    preserveQuery,
                    isDomainNeedRawQuery,
                    PHPQuerySerializerNoEncoding,
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
                    var queryStr = this.$URIAbstractBase$p_renderQuery(
                      rawQuery,
                      preserveQuery,
                      isDomainNeedRawQuery,
                      PHPQuerySerializerNoEncoding,
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
                  filter,
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
                _proto.isSameOrigin = function isSameOrigin(otherURI) {
                  return require("isSameOrigin")(this, otherURI);
                };
                _proto.getQualifiedURIBase = function getQualifiedURIBase() {
                  return new URIAbstractBase(
                    this,
                    this.$URIAbstractBase$p_serializer,
                  ).qualify();
                };
                _proto.qualify = function qualify() {
                  if (!this.getDomain()) {
                    var current = new URIAbstractBase(
                      window.location.href,
                      this.$URIAbstractBase$p_serializer,
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
                    require("setHostSubdomain")(domain, subdomain),
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
                  superdomain,
                ) {
                  var domain = this.getDomain();
                  return URIAbstractBase.isDomainSubdomainOfDomain(
                    domain,
                    superdomain,
                    this.$URIAbstractBase$p_serializer,
                  );
                };
                URIAbstractBase.isDomainSubdomainOfDomain =
                  function isDomainSubdomainOfDomain(
                    domain,
                    superdomain,
                    serializer,
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
            null,
          );
          __d(
            "sdk.URI",
            ["QueryString", "URIAbstractBase"],
            function $module_sdk_URI(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var facebookRe = /\.facebook\.com$/;

              var serializer = {
                serialize: function serialize(map) {
                  return map ? importDefault("QueryString").encode(map) : "";
                },
                deserialize: function deserialize(text) {
                  return text ? importDefault("QueryString").decode(text) : {};
                },
              };
              var URI = (function (_URIBase) {
                function URI(uri) {
                  return _URIBase.call(this, uri, serializer) || this;
                }
                babelHelpers.inheritsLoose(URI, _URIBase);
                var _proto = URI.prototype;
                _proto.isFacebookURI = function isFacebookURI() {
                  return facebookRe.test(this.getDomain());
                };
                _proto.valueOf = function valueOf() {
                  return this.toString();
                };
                URI.isValidURI = function isValidURI(uri) {
                  return importDefault("URIAbstractBase").isValid(
                    uri,
                    serializer,
                  );
                };
                return URI;
              })(importDefault("URIAbstractBase"));
              exports["default"] = URI;
            },
            98,
          );
          __d(
            "sdk.getContextType",
            ["sdk.Runtime", "sdk.UA"],
            function $module_sdk_getContextType(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function getContextType() {
                if (importDefault("sdk.UA").nativeApp()) {
                  return 3;
                }
                if (importDefault("sdk.UA").mobile()) {
                  return 2;
                }
                if (
                  importDefault("sdk.Runtime").isEnvironment(
                    importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                  )
                ) {
                  return 5;
                }
                return 1;
              }
              exports["default"] = getContextType;
            },
            98,
          );
          __d(
            "sdk.statusCORS",
            [
              "Log",
              "UrlMap",
              "sdk.AuthState",
              "sdk.AuthStorageUtils",
              "sdk.AuthUtils",
              "sdk.Impressions",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.URI",
              "sdk.feature",
              "sdk.getContextType",
            ],
            function $module_sdk_statusCORS(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var DEFAULT_TIMEOUT = 60000;
              var PLATFORM_E2E_TRACKING_LOG_ID = 114;

              function getLoginStatusCORS(
                cb,
                token,
                currentAuthResponse,
                loginSource,
              ) {
                if (loginSource === void 0) {
                  loginSource = "facebook";
                }
                var url = getCORSTarget(token);
                var fetchStart = Date.now();

                function corsFetchXHR() {
                  var xhr = new XMLHttpRequest();
                  if (xhr) {
                    xhr.open("GET", url.toString(), true);
                    xhr.withCredentials = true;
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState === 4) {
                        if (
                          importDefault("sdk.feature")(
                            "e2e_ping_tracking",
                            true,
                          )
                        ) {
                          var events = {
                            init: fetchStart,
                            close: Date.now(),
                            method: "cors",
                          };
                          importNamespace("Log").debug(
                            "e2e: %s",
                            ES("JSON", "stringify", false, events),
                          );
                          importNamespace("sdk.Impressions").log(
                            PLATFORM_E2E_TRACKING_LOG_ID,
                            {
                              payload: events,
                            },
                          );
                        }

                        if (xhr.status === 200) {
                          var _xhr$getResponseHeade, _xhr$getResponseHeade2;
                          onCORSSuccess(
                            cb,
                            (_xhr$getResponseHeade =
                              xhr.getResponseHeader("fb-s")) != null
                              ? _xhr$getResponseHeade
                              : "unknown",
                            (_xhr$getResponseHeade2 =
                              xhr.getResponseHeader("fb-ar")) != null
                              ? _xhr$getResponseHeade2
                              : "{}",
                            loginSource,
                          );
                        } else {
                          onCORSFailure(
                            cb,
                            xhr.status,
                            currentAuthResponse,
                            loginSource,
                          );
                        }
                      }
                    };
                    xhr.send();
                  }
                }

                function timeOutSecondRequestIfNecessary() {
                  if (!isTheOtherLoginStatusLoaded(loginSource)) {
                    window.setTimeout(function window_setTimeout_$0() {
                      defaultLoginSourceToUnknownStatus(
                        loginSource === "facebook" ? "instagram" : "facebook",
                      );
                      importDefault("sdk.AuthState").setState({
                        shouldSecondLoginRequestTimeOut: true,
                      });
                    }, DEFAULT_TIMEOUT);
                  }
                }

                function corsFetch() {
                  window
                    .fetch(url.toString(), {
                      referrer: "/",
                      mode: "cors",
                      credentials: "include",
                    })
                    .then(function then_$0(response) {
                      if (
                        importDefault("sdk.AuthState").getState()
                          .shouldSecondLoginRequestTimeOut
                      ) {
                        importDefault("sdk.AuthState").setState({
                          shouldSecondLoginRequestTimeOut: false,
                        });

                        return;
                      }
                      timeOutSecondRequestIfNecessary();
                      if (response.status === 200) {
                        var _response$headers$get, _response$headers$get2;
                        onCORSSuccess(
                          cb,
                          (_response$headers$get =
                            response.headers.get("fb-s")) != null
                            ? _response$headers$get
                            : "unknown",
                          (_response$headers$get2 =
                            response.headers.get("fb-ar")) != null
                            ? _response$headers$get2
                            : "{}",
                          loginSource,
                        );
                      } else {
                        onCORSFailure(
                          cb,
                          response.status,
                          currentAuthResponse,
                          loginSource,
                        );
                      }
                    })
                    ["catch"](function $0(_e) {
                      if (
                        importDefault("sdk.AuthState").getState()
                          .shouldSecondLoginRequestTimeOut
                      ) {
                        importDefault("sdk.AuthState").setState({
                          shouldSecondLoginRequestTimeOut: false,
                        });

                        return;
                      }
                      timeOutSecondRequestIfNecessary();
                      onCORSFailure(cb, 0, currentAuthResponse, loginSource);
                    });
                }

                if (typeof window.fetch === "function") {
                  corsFetch();
                } else {
                  corsFetchXHR();
                }
              }

              function onCORSSuccess(
                cb,
                loginStatus,
                authResponseHeader,
                loginSource,
              ) {
                if (loginSource === void 0) {
                  loginSource = "facebook";
                }
                switch (loginStatus) {
                  case "connected":
                    var xhrAuthResponse = ES(
                      "JSON",
                      "parse",
                      false,
                      authResponseHeader,
                    );

                    var authResponse = {
                      accessToken: xhrAuthResponse.access_token,
                      userID: xhrAuthResponse.user_id,
                      expiresIn: Number(xhrAuthResponse.expires_in),
                      signedRequest: xhrAuthResponse.signed_request,
                      graphDomain: xhrAuthResponse.graph_domain,
                    };

                    if (xhrAuthResponse.enforce_https != null) {
                      importDefault("sdk.Runtime").setEnforceHttps(true);
                    }

                    if (xhrAuthResponse.data_access_expiration_time != null) {
                      authResponse.data_access_expiration_time = Number(
                        xhrAuthResponse.data_access_expiration_time,
                      );
                    }

                    if (xhrAuthResponse.base_domain != null) {
                      importNamespace("sdk.AuthUtils").setBaseDomain(
                        xhrAuthResponse.base_domain,
                      );
                    }

                    importNamespace("sdk.AuthUtils").setGraphDomain(
                      xhrAuthResponse.graph_domain,
                    );
                    importNamespace(
                      "sdk.AuthStorageUtils",
                    ).setLocalStorageToken(
                      authResponse,
                      xhrAuthResponse.long_lived_token,
                    );
                    importNamespace("sdk.AuthUtils").removeLogoutState();
                    var response = {
                      authResponse: authResponse,
                      status: loginStatus,
                      loginSource: loginSource,
                      cb: cb,
                    };
                    importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .CORS_FETCH_COMPLETED_EVENT,
                      response,
                    );
                    break;
                  case "not_authorized":
                  case "unknown":
                  default:
                    var defaultResponse = {
                      authResponse: null,
                      status: loginStatus,
                      loginSource: loginSource,
                      cb: cb,
                    };
                    importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .CORS_FETCH_COMPLETED_EVENT,
                      defaultResponse,
                    );
                }
              }

              function onCORSFailure(
                cb,
                httpStatus,
                currentAuthResponse,
                loginSource,
              ) {
                if (loginSource === void 0) {
                  loginSource = "facebook";
                }
                if (httpStatus === 0) {
                  if (
                    importDefault("sdk.feature")(
                      "cors_status_fetch_cancel_tracking",
                      false,
                    )
                  ) {
                    importNamespace("sdk.Scribe").log("jssdk_error", {
                      appId: importDefault("sdk.Runtime").getClientID(),
                      error: "CORS_STATUS_FETCH_CANCELLED",
                      extra: { message: "Status 0 returned." },
                    });
                  }
                  importNamespace("Log").error(
                    "Error retrieving login status, fetch cancelled.",
                  );
                } else {
                  importNamespace("sdk.Scribe").log("jssdk_error", {
                    appId: importDefault("sdk.Runtime").getClientID(),
                    error: "CORS_STATUS_FETCH",
                    extra: { message: "HTTP Status Code " + httpStatus },
                  });
                  importNamespace("Log").error(
                    "Error retrieving login status, HTTP status code: " +
                      httpStatus,
                  );
                }

                var currentAuthSource = getCurrentAuthResponseSource();
                if (currentAuthSource && currentAuthSource === loginSource) {
                  var _response = {
                    authResponse: currentAuthResponse,
                    status: importDefault("sdk.Runtime").getLoginStatus(),
                    loginSource: loginSource,
                    cb: cb,
                    shouldSetAuthResponse: false,
                  };
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .CORS_FETCH_COMPLETED_EVENT,
                    _response,
                  );
                } else {
                  var _response2 = {
                    authResponse: null,
                    status: "unknown",
                    loginSource: loginSource,
                    cb: cb,
                    shouldSetAuthResponse: false,
                  };
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .CORS_FETCH_COMPLETED_EVENT,
                    _response2,
                  );
                }
              }

              function getCurrentAuthResponseSource() {
                var currentAuthResponse =
                  importDefault("sdk.AuthState").getState().currentAuthResponse;
                if (currentAuthResponse) {
                  if (
                    importNamespace("sdk.AuthUtils").isInstagramLogin(
                      currentAuthResponse,
                    )
                  ) {
                    return "instagram";
                  }
                  return "facebook";
                }
                return null;
              }

              function getCORSTarget(token) {
                var url = new (importDefault("sdk.URI"))(
                  importNamespace("UrlMap")
                    .resolve("www")
                    .replace("web.", "www.") + "/x/oauth/status",
                )
                  .addQueryData(
                    "client_id",
                    importDefault("sdk.Runtime").getClientID(),
                  )
                  .addQueryData("input_token", token)
                  .addQueryData("redirect_uri", window.location.href)
                  .addQueryData("origin", importDefault("sdk.getContextType")())
                  .addQueryData("sdk", "joey")
                  .addQueryData(
                    "wants_cookie_data",
                    importDefault("sdk.Runtime").getUseCookie(),
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
                      ancestorOriginString.slice(0, -1),
                    );
                  }
                }

                return url;
              }

              function isTheOtherLoginStatusLoaded(loginSource) {
                var mixedAuthState =
                  importDefault("sdk.AuthState").getState().mixedAuthState;
                switch (loginSource) {
                  case "facebook":
                    return (
                      (mixedAuthState == null
                        ? void 0
                        : mixedAuthState.fbLoginStatus) === null &&
                      (mixedAuthState == null
                        ? void 0
                        : mixedAuthState.igLoginStatus) !== null
                    );

                  case "instagram":
                    return (
                      (mixedAuthState == null
                        ? void 0
                        : mixedAuthState.igLoginStatus) === null &&
                      (mixedAuthState == null
                        ? void 0
                        : mixedAuthState.fbLoginStatus) !== null
                    );

                  default:
                    return false;
                }
              }

              function defaultLoginSourceToUnknownStatus(loginSource) {
                var mixedAuthState =
                  importDefault("sdk.AuthState").getState().mixedAuthState;
                if (
                  (mixedAuthState == null
                    ? void 0
                    : mixedAuthState.fbLoginStatus) != null &&
                  (mixedAuthState == null
                    ? void 0
                    : mixedAuthState.igLoginStatus) != null
                ) {
                  return;
                }
                var response = {
                  authResponse: null,
                  status: "unknown",
                  loginSource: loginSource,
                };
                importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                  "xFoAFetchCompleted",
                  response,
                );
              }

              var StatusCORS = {
                getLoginStatusCORS: getLoginStatusCORS,
              };
              var _default = StatusCORS;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Auth.LoginStatus",
            [
              "Log",
              "QueryString",
              "sdk.Auth",
              "sdk.AuthState",
              "sdk.AuthStorageUtils",
              "sdk.AuthUtils",
              "sdk.Cookie",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.SignedRequest",
              "sdk.feature",
              "sdk.statusCORS",
            ],
            function $module_sdk_Auth_LoginStatus(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var facebookRe = /^https?:\/\/([\w\.]+)?\.facebook\.com\/?/;
              importDefault("sdk.Runtime").subscribe(
                "AccessToken.change",
                function Runtime_subscribe_$1(value) {
                  if (
                    !value &&
                    importDefault("sdk.Runtime").getLoginStatus() ===
                      "connected"
                  ) {
                    getLoginStatus(null, true);
                  }
                },
              );

              function onSDKInit(options) {
                if (options.legacyStatusInit) {
                  LoginStatus.getLoginStatus(
                    function LoginStatus_getLoginStatus_$0(response) {
                      if (response != null && response.status === "connected") {
                        importNamespace("sdk.Scribe").log("jssdk_error", {
                          appId: importDefault("sdk.Runtime").getClientID(),
                          error: "legacy_status_init_success",
                        });
                      }
                    },
                  );
                } else if (options.status) {
                  LoginStatus.getLoginStatus();
                }
                if (importDefault("sdk.Runtime").getClientID()) {
                  if (importDefault("sdk.Runtime").getUseCookie()) {
                    if (
                      importDefault("sdk.feature")("log_cookies_usage", false)
                    ) {
                      importNamespace("sdk.Scribe").log("jssdk_error", {
                        appId: importDefault("sdk.Runtime").getClientID(),
                        error: "jssdk_cookie_toggled_on",
                      });
                    }

                    var signedRequest =
                      importNamespace("sdk.Cookie").loadSignedRequest();
                    var parsedSignedRequest;
                    if (signedRequest) {
                      try {
                        parsedSignedRequest =
                          importNamespace("sdk.SignedRequest").parse(
                            signedRequest,
                          );
                      } catch (_unused) {
                        importNamespace(
                          "sdk.Cookie",
                        ).clearSignedRequestCookie();
                      }
                      if (
                        parsedSignedRequest != null &&
                        parsedSignedRequest.user_id != null
                      ) {
                        importDefault("sdk.Runtime").setCookieUserID(
                          parsedSignedRequest.user_id,
                        );
                      }
                    }
                  }
                }
              }

              function fetchLoginStatus(fn) {
                if (window.location.protocol !== "https:") {
                  unknownStatus(fn);
                  return;
                }
                var timer = importDefault("sdk.AuthState").getState().timer;
                if (timer) {
                  window.clearTimeout(timer);
                  importDefault("sdk.AuthState").setState({ timer: null });
                }
                importNamespace("sdk.AuthUtils").resetFBAndIGLoginStatus();

                var fb_logged_out =
                  importNamespace("sdk.Cookie").getRaw(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .LOGOUT_COOKIE_PREFIX,
                  ) === "y";

                var _checkFragment = checkFragment(fn),
                  access_token = _checkFragment.access_token,
                  redirect_cancelled = _checkFragment.redirect_cancelled;

                if (fb_logged_out || redirect_cancelled) {
                  unknownStatus(fn);
                  return;
                }

                var _getLocalStorageToken = importNamespace(
                    "sdk.AuthStorageUtils",
                  ).getLocalStorageTokens(),
                  fbToken = _getLocalStorageToken.fbToken,
                  igToken = _getLocalStorageToken.igToken;

                if (access_token != null) {
                  if (ES(access_token, "startsWith", true, "IG")) {
                    igToken = access_token;
                  } else {
                    fbToken = access_token;
                  }
                }

                if (
                  importDefault("sdk.Runtime").getShouldLoadFamilyLogin() &&
                  importDefault("sdk.feature")(
                    "should_enable_ig_login_status_fetch",
                    false,
                  )
                ) {
                  if (importDefault("sdk.Runtime").getFamilyLoginLoaded()) {
                    importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .LOAD_XFOA_SUBSCRIBERS,
                    );
                  } else {
                    importDefault("sdk.Runtime").subscribe(
                      "FamilyLoginLoaded.change",
                      function Runtime_subscribe_$1(value) {
                        if (value) {
                          importNamespace(
                            "sdk.AuthUtils",
                          ).AuthInternalEvent.inform(
                            importNamespace("sdk.AuthUtils").AuthConstants
                              .LOAD_XFOA_SUBSCRIBERS,
                          );
                        }
                      },
                    );
                  }
                } else {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.subscribe(
                    importNamespace("sdk.AuthUtils").AuthConstants
                      .CORS_FETCH_COMPLETED_EVENT,
                    importDefault("sdk.Auth").setFinalAuthResponse,
                  );
                }

                issueXFoACorsFetch(fbToken, igToken, fn);
              }

              function issueXFoACorsFetch(fbToken, igToken, fn) {
                importDefault("sdk.statusCORS").getLoginStatusCORS(
                  fn,
                  fbToken,
                  importDefault("sdk.AuthState").getState().currentAuthResponse,
                  "facebook",
                );
                if (
                  importDefault("sdk.Runtime").getShouldLoadFamilyLogin() &&
                  importDefault("sdk.feature")(
                    "should_enable_ig_login_status_fetch",
                    false,
                  )
                ) {
                  if (igToken != null) {
                    importDefault("sdk.statusCORS").getLoginStatusCORS(
                      fn,
                      igToken,
                      importDefault("sdk.AuthState").getState()
                        .currentAuthResponse,
                      "instagram",
                    );
                  } else {
                    var _response = {
                      authResponse: null,
                      status: "unknown",
                      loginSource: "instagram",
                      cb: fn,
                    };
                    importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                      importNamespace("sdk.AuthUtils").AuthConstants
                        .CORS_FETCH_COMPLETED_EVENT,
                      _response,
                    );
                  }
                }
              }

              function checkFragment(fn) {
                var redirAccessToken = null;
                var redirCancelled = false;
                if (
                  importDefault("sdk.Runtime").getLoginStatus() !==
                    "connected" &&
                  (document.referrer === "" ||
                    facebookRe.test(document.referrer))
                ) {
                  var fragment = location.hash.substr(1);
                  if (fragment !== "") {
                    var fragmentParams = importDefault("QueryString").decode(
                      fragment,
                      true,
                    );
                    redirAccessToken = fragmentParams.access_token;
                    var redirSignedRequest = fragmentParams.signed_request;
                    if (redirAccessToken != null) {
                      importNamespace("sdk.AuthUtils").removeLogoutState();
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
                          location.hash =
                            importDefault("QueryString").encode(fragmentParams);
                          if (
                            redirSignedRequest != null &&
                            response.authResponse != null
                          ) {
                            response.authResponse.signedRequest =
                              redirSignedRequest;
                          }
                        }
                        if (ofn != null) {
                          ofn(response);
                        }
                      };
                    }
                  }

                  var queryParams = importDefault("QueryString").decode(
                    location.search,
                  );
                  if (queryParams.error === "access_denied") {
                    redirCancelled = true;
                  }
                }
                return {
                  access_token: redirAccessToken,
                  redirect_cancelled: redirCancelled,
                };
              }

              function getLoginStatus(cb, force) {
                if (force === void 0) {
                  force = false;
                }
                var appID = importDefault("sdk.Runtime").getClientID();
                if (appID == null || appID === "") {
                  importNamespace("Log").warn(
                    "FB.getLoginStatus() called before calling FB.init().",
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
                  importNamespace("Log").warn(
                    "FB.getLoginStatus() not checked for an invalid client ID " +
                      appID,
                  );
                  unknownStatus(cb);
                  return;
                }

                var skipCache =
                  importDefault("sdk.Runtime").getLoginStatus() !==
                    "connected" &&
                  facebookRe.test(document.referrer) &&
                  location.hash.indexOf("cb=") > -1;

                if (!skipCache && !force) {
                  var cachedResponse = importNamespace(
                    "sdk.AuthStorageUtils",
                  ).getCachedResponse();
                  if (cachedResponse != null) {
                    var _cachedResponse$statu;
                    importDefault("sdk.AuthState").setState({
                      loadState: "loaded",
                    });
                    importDefault("sdk.Auth").setAuthResponse(
                      cachedResponse.authResponse,
                      (_cachedResponse$statu = cachedResponse.status) != null
                        ? _cachedResponse$statu
                        : "unknown",
                      "facebook",
                      true,
                    );
                    importNamespace("sdk.AuthUtils").setRevalidateTimer(
                      cachedResponse.status === "connected"
                        ? importNamespace("sdk.AuthUtils").AuthConstants
                            .CONNECTED_REVALIDATE_PERIOD
                        : importNamespace("sdk.AuthUtils").AuthConstants
                            .DEFAULT_REVALIDATE_PERIOD,
                    );
                  }
                }

                if (!force) {
                  if (
                    importDefault("sdk.AuthState").getState().loadState ===
                    "loaded"
                  ) {
                    if (cb) {
                      var _response2 = {
                        authResponse:
                          importDefault("sdk.Auth").getAuthResponse(),
                        status: importDefault("sdk.Runtime").getLoginStatus(),
                      };
                      cb(_response2);
                    }
                    return;
                  } else if (
                    importDefault("sdk.AuthState").getState().loadState ===
                    "loading"
                  ) {
                    if (cb) {
                      importNamespace(
                        "sdk.AuthUtils",
                      ).AuthInternalEvent.subscribe("FB.loginStatus", cb);
                    }
                    return;
                  }
                }

                if (cb) {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.subscribe(
                    "FB.loginStatus",
                    cb,
                  );
                }

                importDefault("sdk.AuthState").setState({
                  loadState: "loading",
                });

                var lsCb = function lsCb(response) {
                  importDefault("sdk.AuthState").setState({
                    loadState: "loaded",
                  });

                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    "FB.loginStatus",
                    response,
                  );
                  importNamespace(
                    "sdk.AuthUtils",
                  ).AuthInternalEvent.clearSubscribers("FB.loginStatus");
                };

                fetchLoginStatus(lsCb);
              }

              function unknownStatus(cb) {
                var unk_status = "unknown";
                importDefault("sdk.Auth").setAuthResponse(
                  null,
                  unk_status,
                  null,
                );
                var response = {
                  authResponse: null,
                  status: unk_status,
                  loginSource: null,
                };
                if (cb) {
                  cb(response);
                }
              }

              var LoginStatus = {
                getLoginStatus: getLoginStatus,
                fetchLoginStatus: fetchLoginStatus,
                onSDKInit: onSDKInit,
              };
              var _default = LoginStatus;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "isStringNullOrEmpty",
            [],
            function $module_isStringNullOrEmpty(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function isStringNullOrEmpty(str) {
                return str == null || str === "";
              }
              exports["default"] = isStringNullOrEmpty;
            },
            66,
          );
          __d(
            "sdk.LoggingUtils",
            ["sdk.Impressions", "sdk.feature"],
            function $module_sdk_LoggingUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var logEventName = {
                buttonLoad: "client_login_button_load",
                buttonClick: "client_login_click",
                loginSuccess: "client_login_success",
                loginCancel: "client_login_cancel",
                popupHide: "client_login_popup_hide_xfoa",
                popupShow: "client_login_popup_show_xfoa",
                loginEnd: "client_login_end",
                loginStart: "client_login_start",
                loginCompleteHeartbeat: "client_login_complete_heartbeat",
                loginStatusPopupShowXfoa: "client_login_status_popup_show_xfoa",
                loginStatusPopupHideXfoa: "client_login_status_popup_hide_xfoa",
                loginStatusPopupClickXfoa:
                  "client_login_status_popup_click_xfoa",
                loginStatusPopupErrorXfoa:
                  "client_login_status_popup_error_xfoa",
              };

              function logEvent(loggerID, actionName, extraPayload) {
                importNamespace("sdk.Impressions").log(117, {
                  payload: babelHelpers["extends"]({}, extraPayload || {}, {
                    logger_id: loggerID,
                    action: actionName,
                    client_funnel_version: importDefault("sdk.feature")(
                      "oauth_funnel_logger_version",
                      1,
                    ),
                  }),
                });
              }

              function logLoginEvent(params, actionName) {
                var cbt =
                  params && params.cbt !== undefined ? Number(params.cbt) : 0;
                logEvent(
                  params == null ? void 0 : params.logger_id,
                  actionName,
                  {
                    cbt_delta: Date.now() - cbt,
                  },
                );
              }

              function logPopupEvent(loggerID, actionName) {
                if (actionName !== undefined) {
                  logEvent(loggerID, actionName);
                }
              }

              function logDisambiguationTrayEvent(error, loggerID) {
                if (error !== undefined) {
                  logEvent(loggerID, logEventName.loginStatusPopupErrorXfoa, {
                    message: error,
                  });
                }
              }
              exports.logEventName = logEventName;
              exports.logEvent = logEvent;
              exports.logLoginEvent = logLoginEvent;
              exports.logPopupEvent = logPopupEvent;
              exports.logDisambiguationTrayEvent = logDisambiguationTrayEvent;
            },
            98,
          );
          __d(
            "sdk.Auth",
            [
              "Log",
              "UrlMap",
              "isStringNullOrEmpty",
              "sdk.AuthState",
              "sdk.AuthStorageUtils",
              "sdk.AuthUtils",
              "sdk.Cookie",
              "sdk.Frictionless",
              "sdk.LoggingUtils",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.SignedRequest",
              "sdk.URI",
              "sdk.ui",
            ],
            function $module_sdk_Auth(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              require("sdk.Frictionless");
              var LOGIN_COMPLETE_HEARTBEAT_TIMEOUT = 5 * 1000;

              function login(cb, opts) {
                if (opts && opts.perms && !opts.scope) {
                  opts.scope = opts.perms;
                  delete opts.perms;
                  importNamespace("Log").warn(
                    "OAuth2 specification states that 'perms' " +
                      "should now be called 'scope'.  Please update.",
                  );
                }
                var canvas =
                  importDefault("sdk.Runtime").isEnvironment(
                    importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                  ) ||
                  importDefault("sdk.Runtime").isEnvironment(
                    importDefault("sdk.Runtime").ENVIRONMENTS.PAGETAB,
                  );
                importDefault("sdk.ui")(
                  babelHelpers["extends"](
                    {
                      method: "permissions.oauth",
                      display: canvas ? "async" : "popup",
                      domain: location.hostname,
                    },
                    opts || {},
                  ),

                  cb,
                );
              }

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

              function setFinalAuthResponse(finalResponse) {
                if (
                  (finalResponse == null
                    ? void 0
                    : finalResponse.shouldSetAuthResponse) !== false
                ) {
                  if (
                    (finalResponse == null ? void 0 : finalResponse.status) ===
                    "connected"
                  ) {
                    importNamespace("sdk.AuthUtils").setRevalidateTimer();
                  }
                  setAuthResponse(
                    finalResponse == null ? void 0 : finalResponse.authResponse,
                    toWebOAuthStatus(
                      finalResponse == null ? void 0 : finalResponse.status,
                    ),
                    finalResponse == null ? void 0 : finalResponse.loginSource,
                  );
                }
                var cb = finalResponse == null ? void 0 : finalResponse.cb;
                if (cb != null) {
                  var response = {
                    authResponse:
                      finalResponse == null
                        ? void 0
                        : finalResponse.authResponse,
                    status: toWebOAuthStatus(
                      finalResponse == null ? void 0 : finalResponse.status,
                    ),
                    loginSource:
                      finalResponse == null
                        ? void 0
                        : finalResponse.loginSource,
                  };
                  cb(response);
                }
                importNamespace(
                  "sdk.AuthUtils",
                ).AuthInternalEvent.clearSubscribers(
                  importNamespace("sdk.AuthUtils").AuthConstants
                    .CORS_FETCH_COMPLETED_EVENT,
                );
                importNamespace(
                  "sdk.AuthUtils",
                ).AuthInternalEvent.clearSubscribers(
                  importNamespace("sdk.AuthUtils").AuthConstants
                    .XFOA_FINAL_RESPONSE_EVENT,
                );
              }

              function setAuthResponse(
                authResponse,
                status,
                loginSource,
                fromCache,
              ) {
                if (loginSource === void 0) {
                  loginSource = "facebook";
                }
                if (fromCache === void 0) {
                  fromCache = false;
                }
                var currentUserID = importDefault("sdk.Runtime").getUserID();
                var currentStatus =
                  importDefault("sdk.Runtime").getLoginStatus();

                var userID = "";
                if (authResponse != null) {
                  importDefault("sdk.AuthState").setState({
                    loadState: "loaded",
                  });

                  if (
                    authResponse.userID != null &&
                    authResponse.userID !== ""
                  ) {
                    userID = authResponse.userID;
                  } else if (
                    authResponse.signedRequest != null &&
                    authResponse.signedRequest !== ""
                  ) {
                    var parsedSignedRequest = importNamespace(
                      "sdk.SignedRequest",
                    ).parse(authResponse.signedRequest);
                    if (
                      parsedSignedRequest != null &&
                      parsedSignedRequest !== "" &&
                      parsedSignedRequest.user_id != null &&
                      parsedSignedRequest.user_id !== ""
                    ) {
                      userID = parsedSignedRequest.user_id;
                    }
                  }

                  if (importDefault("sdk.Runtime").getUseCookie()) {
                    var expirationTime =
                      authResponse.expiresIn === 0
                        ? 0
                        : Date.now() + authResponse.expiresIn * 1000;
                    importNamespace("sdk.Cookie").setSignedRequestCookie(
                      authResponse.signedRequest,
                      expirationTime,
                    );
                  }
                } else {
                  if (importDefault("sdk.Runtime").getUseCookie()) {
                    importNamespace("sdk.Cookie").clearSignedRequestCookie();
                  }
                  if (importDefault("sdk.Runtime").getUseLocalStorage()) {
                    importNamespace(
                      "sdk.AuthStorageUtils",
                    ).removeLocalStorageToken(
                      loginSource != null ? loginSource : "facebook",
                    );
                  }
                }

                var login =
                  (currentStatus === "unknown" && authResponse != null) ||
                  (importDefault("sdk.Runtime").getUseCookie() &&
                    importDefault("sdk.Runtime").getCookieUserID() !== userID);
                var logout =
                  !importDefault("isStringNullOrEmpty")(currentUserID) &&
                  authResponse == null;

                var both =
                  authResponse != null &&
                  currentUserID != null &&
                  currentUserID !== "" &&
                  currentUserID != userID;

                var authResponseChange =
                  authResponse !=
                  importDefault("sdk.AuthState").getState().currentAuthResponse;
                var statusChange = status != currentStatus;

                importDefault("sdk.Runtime").setLoginStatus(status);
                importDefault("sdk.Runtime").setAccessToken(
                  (authResponse && authResponse.accessToken) || null,
                );
                importDefault("sdk.Runtime").setUserID(userID);
                importDefault("sdk.Runtime").setGraphDomain(
                  (authResponse && authResponse.graphDomain) || "",
                );

                importDefault("sdk.AuthState").setState({
                  currentAuthResponse: authResponse,
                });

                var response = {
                  authResponse: authResponse,
                  status: status,
                  loginSource: loginSource,
                };

                if (logout || both) {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    "logout",
                    response,
                  );
                }
                if (login || both) {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    "login",
                    response,
                  );
                }
                if (authResponseChange) {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    "authresponse.change",
                    response,
                  );
                }
                if (statusChange) {
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                    "status.change",
                    response,
                  );
                }

                if (!fromCache) {
                  importNamespace("sdk.AuthStorageUtils").setSessionStorage(
                    authResponse,
                    status,
                  );
                }

                return response;
              }

              function getAuthResponse() {
                return importDefault("sdk.AuthState").getState()
                  .currentAuthResponse;
              }

              function logout(cb) {
                var currentAuthResponse = getAuthResponse();
                var currentLoginSource = importNamespace(
                  "sdk.AuthUtils",
                ).isInstagramLogin(currentAuthResponse)
                  ? "instagram"
                  : "facebook";
                setAuthResponse(null, "unknown", currentLoginSource);
                importNamespace("sdk.AuthUtils").setLogoutState();

                if (
                  currentAuthResponse != null &&
                  currentAuthResponse.accessToken != null
                ) {
                  var url = new (importDefault("sdk.URI"))(
                    importNamespace("UrlMap")
                      .resolve("www")
                      .replace("web.", "www.") + "/x/oauth/logout",
                  ).addQueryData(
                    "access_token",
                    currentAuthResponse.accessToken,
                  );
                  var xhr = new XMLHttpRequest();
                  var cb_invoked = false;
                  if (xhr) {
                    xhr.open("GET", url.toString(), true);
                    xhr.withCredentials = true;
                    if (cb) {
                      xhr.onreadystatechange = function () {
                        if (xhr.readyState >= 2) {
                          if (cb_invoked) {
                            return;
                          }
                          cb({
                            authResponse: getAuthResponse(),
                            status:
                              importDefault("sdk.Runtime").getLoginStatus(),
                          });
                          cb_invoked = true;
                        }
                      };
                    }
                    xhr.send();
                  }
                }
                importNamespace("sdk.Scribe").log("jssdk_error", {
                  appId: importDefault("sdk.Runtime").getClientID(),
                  error: "PLATFORM_AUTH_LOGOUT",
                  extra: { args: { fblo: true } },
                });
              }

              function xdResponseWrapper(
                cb,
                authResponse,
                _method,
                requestParams,
              ) {
                return function (params) {
                  var status;
                  if (params && (params.access_token || params.code)) {
                    var parsedSignedRequest = importNamespace(
                      "sdk.SignedRequest",
                    ).parse(params.signed_request);
                    var user_id =
                      parsedSignedRequest != null
                        ? parsedSignedRequest.user_id != null
                          ? parsedSignedRequest.user_id
                          : null
                        : null;
                    authResponse = {
                      userID: user_id,
                      expiresIn: Number(params.expires_in),
                    };

                    if (params.access_token) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        accessToken: params.access_token,
                      });
                    }

                    if (params.code) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        code: params.code,
                      });
                    }

                    if (params.signed_request) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        signedRequest: params.signed_request,
                      });
                    }

                    if (params.graph_domain) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        graphDomain: params.graph_domain,
                      });
                    }

                    if (params.asset_scopes) {
                      authResponse = babelHelpers["extends"]({}, authResponse, {
                        asset_scopes: ES(
                          "JSON",
                          "parse",
                          false,
                          params.asset_scopes,
                        ),
                      });
                    }

                    authResponse = populateAuthResponse(authResponse, params);

                    importNamespace("sdk.AuthUtils").removeLogoutState();
                    status = "connected";
                    setAuthResponse(authResponse, status);
                    logSuccessfulAuth(requestParams);
                  } else if (params && params.asset_scopes) {
                    authResponse = {
                      asset_scopes: ES(
                        "JSON",
                        "parse",
                        false,
                        params.asset_scopes,
                      ),
                    };

                    authResponse = populateAuthResponse(authResponse, params);

                    importNamespace("sdk.AuthUtils").removeLogoutState();
                    status = "connected";
                    setAuthResponse(authResponse, status);
                    logSuccessfulAuth(requestParams);
                  } else if (
                    params &&
                    (params.error ||
                      params.error_message ||
                      params.error_description ||
                      params.error_code ||
                      params.error_reason ||
                      (params.result && params.result.closeWindow))
                  ) {
                    importNamespace("sdk.AuthUtils").setLogoutState();
                    status = "unknown";
                    setAuthResponse(null, status);
                    var message =
                      params.error_message || params.error_description;
                    var response = {
                      authResponse: getAuthResponse(),
                      status: status,
                      message: message,
                    };

                    if (
                      params.error === "access_denied" ||
                      (params.result && params.result.closeWindow)
                    ) {
                      importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                        "loginDenied",
                        response,
                      );
                    } else {
                      importNamespace("sdk.AuthUtils").AuthInternalEvent.inform(
                        "loginError",
                        response,
                      );
                    }
                  } else if (params && params.result) {
                    importNamespace("sdk.AuthUtils").removeLogoutState();
                    authResponse = params.result.authResponse;
                  }

                  if (cb) {
                    var _response = {
                      authResponse: authResponse,
                      status: importDefault("sdk.Runtime").getLoginStatus(),
                    };
                    cb(_response);
                  }
                  return authResponse;
                };
              }

              function logSuccessfulAuth(requestParams) {
                if (
                  requestParams &&
                  requestParams.tp &&
                  requestParams.tp !== "unspecified"
                ) {
                  return;
                }

                importNamespace("sdk.LoggingUtils").logLoginEvent(
                  requestParams,
                  importNamespace("sdk.LoggingUtils").logEventName.loginEnd,
                );

                window.setTimeout(function window_setTimeout_$0() {
                  importNamespace("sdk.LoggingUtils").logLoginEvent(
                    requestParams,
                    importNamespace("sdk.LoggingUtils").logEventName
                      .loginCompleteHeartbeat,
                  );
                }, LOGIN_COMPLETE_HEARTBEAT_TIMEOUT);
              }

              function populateAuthResponse(authResponse, params) {
                if (params.granted_scopes) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    grantedScopes: params.granted_scopes,
                  });
                }

                if (params.data_access_expiration_time) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    data_access_expiration_time: Number(
                      params.data_access_expiration_time,
                    ),
                  });
                }

                if (params.base_domain != null) {
                  importNamespace("sdk.AuthUtils").setBaseDomain(
                    params.base_domain,
                  );
                }

                importNamespace("sdk.AuthUtils").setGraphDomain(
                  params.graph_domain,
                );

                if (params.enforce_https) {
                  importDefault("sdk.Runtime").setEnforceHttps(true);
                }

                if (params.referred) {
                  authResponse = babelHelpers["extends"]({}, authResponse, {
                    referred: params.referred,
                  });
                }
                importNamespace("sdk.AuthStorageUtils").setLocalStorageToken(
                  authResponse,
                  params.long_lived_token,
                );

                return authResponse;
              }
              var Auth = {
                setFinalAuthResponse: setFinalAuthResponse,
                login: login,
                logout: logout,
                setAuthResponse: setAuthResponse,
                getAuthResponse: getAuthResponse,
                parseSignedRequest: importNamespace("sdk.SignedRequest").parse,
                xdResponseWrapper: xdResponseWrapper,
                subscribe:
                  importNamespace("sdk.AuthUtils").AuthInternalEvent.subscribe,
                unsubscribe:
                  importNamespace("sdk.AuthUtils").AuthInternalEvent
                    .unsubscribe,
              };
              var _default = Auth;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
              "use strict";

              function dedupString(str) {
                var _Object$keys;

                return Object.keys(
                  ((_Object$keys = {}), (_Object$keys[str] = 0), _Object$keys),
                )[0];
              }
              exports["default"] = dedupString;
            },
            66,
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
              exports,
            ) {
              "use strict";

              function makeEmptyFunction(arg) {
                return function () {
                  return arg;
                };
              }

              var emptyFunction = function emptyFunction() {};

              emptyFunction.thatReturns = makeEmptyFunction;
              emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
              emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
              emptyFunction.thatReturnsNull = makeEmptyFunction(null);

              emptyFunction.thatReturnsThis = function () {
                return this;
              };
              emptyFunction.thatReturnsArgument = function (arg) {
                return arg;
              };
              var _default = emptyFunction;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "passiveEventListenerUtil",
            [],
            function $module_passiveEventListenerUtil(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var _isPassiveEventListenerSupported = false;
              try {
                var opts = Object.defineProperty(
                  {},

                  "passive",
                  {
                    get: function get() {
                      _isPassiveEventListenerSupported = true;
                    },
                  },
                );

                window.addEventListener("test", null, opts);
              } catch (_unused) {}

              var isPassiveEventListenerSupported =
                _isPassiveEventListenerSupported;

              function makeEventOptions(options) {
                if (isPassiveEventListenerSupported) {
                  return options;
                }
                return typeof options === "boolean"
                  ? options
                  : options.capture || false;
              }
              exports.isPassiveEventListenerSupported =
                isPassiveEventListenerSupported;
              exports.makeEventOptions = makeEventOptions;
            },
            66,
          );
          __d(
            "DOMEventListener",
            [
              "invariant",
              "dedupString",
              "emptyFunction",
              "passiveEventListenerUtil",
              "wrapFunction",
            ],
            function $module_DOMEventListener(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
              invariant,
            ) {
              var isPassiveEventListenerSupported =
                require("passiveEventListenerUtil").isPassiveEventListenerSupported;

              var _add, _remove;

              if (window.addEventListener) {
                _add = function add(target, name, listener, options) {
                  if (options === void 0) {
                    options = false;
                  }

                  listener.wrapper = require("wrapFunction")(
                    listener,
                    "entry",
                    require("dedupString")("DOMEventListener.add " + name),
                  );
                  target.addEventListener(
                    name,
                    listener.wrapper,
                    isPassiveEventListenerSupported ? options : false,
                  );
                };
                _remove = function remove(target, name, listener, options) {
                  if (options === void 0) {
                    options = false;
                  }
                  target.removeEventListener(
                    name,

                    listener.wrapper,
                    isPassiveEventListenerSupported ? options : false,
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
                    "DOMEventListener.add " + name,
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
                    },
                  };
                },

                remove: _remove,
              };

              module.exports = DOMEventListener;
            },
            null,
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
              exports,
            ) {
              var JSONRPC = (function () {
                "use strict";
                function JSONRPC(write) {
                  var _this = this;
                  this.$JSONRPC_counter = 0;
                  this.$JSONRPC_callbacks = {};

                  this.remote = function (context) {
                    _this.$JSONRPC_context = context;
                    return _this.remote;
                  };

                  this.local = {};

                  this.$JSONRPC_write = write;
                }
                var _proto = JSONRPC.prototype;
                _proto.stub = function stub(_stub) {
                  var _this2 = this;
                  this.remote[_stub] = function () {
                    var message = {
                      jsonrpc: "2.0",
                      method: _stub,
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
                      _this2.$JSONRPC_context || { method: _stub },
                    );
                  };
                };
                _proto.read = function read(message, context) {
                  var rpc = ES("JSON", "parse", false, message);
                  var id = rpc.id;

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

                  var instance = this;
                  var method = this.local[rpc.method];
                  var send;
                  if (id) {
                    send = function send(type, value) {
                      var response = {
                        jsonrpc: "2.0",
                        id: id,
                      };
                      response[type] = value;

                      window.setTimeout(function window_setTimeout_$0() {
                        instance.$JSONRPC_write(
                          ES("JSON", "stringify", false, response),
                          context,
                        );
                      }, 0);
                    };
                  } else {
                    send = function send() {};
                  }

                  if (!method) {
                    require("Log").error(
                      'Method "%s" has not been defined',
                      rpc.method,
                    );

                    send("error", {
                      code: -32601,
                      message: "Method not found",
                      data: rpc.method,
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
                      rpcEx.message,
                    );

                    send("error", {
                      code: -32603,
                      message: "Internal error",
                      data: rpcEx.message,
                    });
                  }
                };
                return JSONRPC;
              })();

              module.exports = JSONRPC;
            },
            null,
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
              exports,
            ) {
              var registry = {};
              var Queue = (function () {
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
                      queue._queue,
                    );
                  } else {
                    var _this$_queue2;
                    (_this$_queue2 = this._queue).push.apply(
                      _this$_queue2,
                      queue._queue,
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
              exports["default"] = Queue;
            },
            66,
          );
          __d(
            "sdk.RPC",
            ["Assert", "JSONRPC", "Queue"],
            function $module_sdk_RPC(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var outQueue = new (importDefault("Queue"))();
              var jsonrpc = new (importDefault("JSONRPC"))(function (message) {
                outQueue.enqueue(message);
              });

              var RPC = {
                local: jsonrpc.local,
                remote: jsonrpc.remote,
                stub: ES(jsonrpc.stub, "bind", true, jsonrpc),
                setInQueue: function setInQueue(queue) {
                  importDefault("Assert").isInstanceOf(
                    importDefault("Queue"),
                    queue,
                  );

                  queue.start(function queue_start_$0(message) {
                    jsonrpc.read(message);
                  });
                },
                getOutQueue: function getOutQueue() {
                  return outQueue;
                },
              };
              var _default = RPC;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Canvas.Environment",
            ["sdk.RPC"],
            function $module_sdk_Canvas_Environment(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function getPageInfo(appCallback) {
                importDefault("sdk.RPC").remote.getPageInfo(
                  function RPC_remote_getPageInfo_$0(response) {
                    appCallback(response.result);
                  },
                );
              }

              function scrollTo(x, y) {
                importDefault("sdk.RPC").remote.scrollTo({
                  x: x || 0,
                  y: y || 0,
                });
              }

              importDefault("sdk.RPC").stub("getPageInfo");
              importDefault("sdk.RPC").stub("scrollTo");

              var Environment = {
                getPageInfo: getPageInfo,
                scrollTo: scrollTo,
              };
              var _default = Environment;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.DialogUtils",
            ["DOMEventListener", "sdk.Content", "sdk.DOM", "sdk.UA"],
            function $module_sdk_DialogUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var MAX_HEIGHT_MOBILE = 590;
              var MAX_HEIGHT_DESKTOP = 240;
              var MAX_WIDTH_DESKTOP = 575;

              function isOrientationPotrait() {
                return window.innerWidth < window.innerHeight;
              }

              function addDoubleClickAction(
                element,
                actionCallback,
                delayBetweenClicks,
              ) {
                var clickTimer = null;
                return importNamespace("DOMEventListener").add(
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
                      delayBetweenClicks,
                    );
                  },
                );
              }

              function addIdleDesktopAction(
                element,
                actionCallback,
                delayToIdle,
              ) {
                var timer;
                var event;
                var startTimer = function startTimer() {
                  timer = window.setTimeout(actionCallback, delayToIdle);
                };

                startTimer();
                return importNamespace("DOMEventListener").add(
                  element,
                  "mouseenter",
                  function DOMEventListener_add_$2() {
                    window.clearTimeout(timer);
                    if (!event) {
                      event = importNamespace("DOMEventListener").add(
                        element,
                        "mouseleave",
                        function DOMEventListener_add_$2() {
                          startTimer();
                        },
                      );
                    }
                  },
                );
              }

              function addMobileOrientationChangeAction(actionCallback) {
                if (!importDefault("sdk.UA").mobile()) {
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

                return importNamespace("DOMEventListener").add(
                  window,
                  event,
                  callback,
                );
              }

              function applyScreenDimensions(element) {
                if (element == null) {
                  return;
                }
                var view = importNamespace("sdk.DOM").getViewportInfo();

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
                var view = importNamespace("sdk.DOM").getViewportInfo();
                var width = parseNumber(dialog.offsetWidth);
                var height = parseNumber(dialog.offsetHeight);
                var left =
                  ((_view$scrollLeft = view.scrollLeft) != null
                    ? _view$scrollLeft
                    : 0) +
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

                if (importDefault("sdk.UA").mobile()) {
                  var paddingHeight = 100;

                  if (isTablet) {
                    var _view$height4;
                    paddingHeight +=
                      ((_view$height4 = view.height) != null
                        ? _view$height4
                        : MAX_HEIGHT_MOBILE - height) / 2;
                    importNamespace("sdk.DOM").addCss(
                      document.body,
                      "fb_reposition",
                    );
                  } else {
                    importNamespace("sdk.DOM").addCss(
                      document.body,
                      "fb_hidden",
                    );

                    document.body.style.width = "auto";

                    top = 10000;
                  }

                  var paddingDivs = importNamespace("sdk.DOM").getByClass(
                    "fb_dialog_padding",
                    dialog,
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

                setDialogPositionToCenter(dialog, isTablet, pageInfo);

                var view = importNamespace("sdk.DOM").getViewportInfo();
                var top =
                  (_view$scrollTop2 = view.scrollTop) != null
                    ? _view$scrollTop2
                    : 0 +
                      ((_view$height5 = view.height) != null
                        ? _view$height5
                        : MAX_HEIGHT_MOBILE - dialog.offsetHeight) *
                        0.05;
                importNamespace("sdk.DOM").setStyle(dialog, "top", top + "px");
              }

              function setupNewDarkOverlay() {
                var overlay = document.createElement("div");

                overlay.setAttribute("id", "fb_dialog_ipad_overlay");
                applyScreenDimensions(overlay);
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
                  importNamespace("DOMEventListener").add(
                    closeIcon,
                    "click",
                    onClose,
                  );
                  dialogElement.appendChild(closeIcon);
                }

                var className = "fb_dialog";
                className += " " + (options.classes || "");
                className += importDefault("sdk.UA").mobile()
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
                  importNamespace("sdk.Content").append(
                    options.content,
                    contentRoot,
                  );
                }
                contentRoot.className = "fb_dialog_content";
                dialogElement.appendChild(contentRoot);

                if (importDefault("sdk.UA").mobile()) {
                  var padding = document.createElement("div");
                  padding.className = "fb_dialog_padding";
                  dialogElement.appendChild(padding);
                }

                return {
                  dialogElement: dialogElement,
                  contentRoot: contentRoot,
                };
              }

              function onDialogHideCleanup(isTablet) {
                var body = document.body;
                if (isTablet) {
                  importNamespace("sdk.DOM").removeCss(body, "fb_reposition");
                } else {
                  importNamespace("sdk.DOM").removeCss(body, "fb_hidden");
                }
              }
              exports.isOrientationPotrait = isOrientationPotrait;
              exports.addDoubleClickAction = addDoubleClickAction;
              exports.addIdleDesktopAction = addIdleDesktopAction;
              exports.addMobileOrientationChangeAction =
                addMobileOrientationChangeAction;
              exports.applyScreenDimensions = applyScreenDimensions;
              exports.setDialogPositionToCenter = setDialogPositionToCenter;
              exports.setDialogPositionToTop = setDialogPositionToTop;
              exports.setupNewDarkOverlay = setupNewDarkOverlay;
              exports.setupNewDialog = setupNewDialog;
              exports.onDialogHideCleanup = onDialogHideCleanup;
            },
            98,
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
              exports,
            ) {
              var fbt = function fbt() {};

              fbt._ = function (table) {
                if (__DEV__) {
                  if (arguments.length > 1) {
                    var e = new Error("You are not using a simple string");
                    e.stack;
                    throw e;
                  }
                  if (Array.isArray(table)) {
                    var _e = Error(
                      "Translation table type [PatternString, PatternHash] not supported: " +
                        table.toString(),
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
              exports["default"] = _default;
            },
            66,
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
              "sdk.fbt",
            ],
            function $module_sdk_Dialog(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var MARGIN_SURROUNDING = 30;
              var MAX_HEIGHT_MOBILE = 590;
              var MAX_WIDTH_MOBILE = 500;
              var MAX_HEIGHT_DESKTOP = 240;
              var MAX_WIDTH_DESKTOP = 575;

              function getMobileSize() {
                var info = importNamespace("sdk.DOM").getViewportInfo();
                var height = info.height;
                var width = info.width;
                if (height != null && width != null) {
                  return {
                    width: Math.min(width, MAX_WIDTH_MOBILE),
                    height: Math.min(height, MAX_HEIGHT_MOBILE),
                  };
                }
                return null;
              }

              var SdkDialogImpl = importDefault("Type").extend(
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
                  },
                },
                importDefault("ObservableMixin"),
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
                    if (
                      importNamespace("sdk.DOM").containsCss(node, "fb_dialog")
                    ) {
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
                    width: width,
                  });
                },

                _createMobileLoader: function _createMobileLoader() {
                  var content = document.createElement("div");
                  if (importDefault("sdk.UA").nativeApp()) {
                    content.innerHTML = '<div class="dialog_header"></div>';
                  } else if (Dialog.isTabletStyle()) {
                    content.innerHTML =
                      '<div class="overlayLoader">' +
                      '<div id="fb_dialog_loader_spinner"></div>' +
                      '<a id="fb_dialog_loader_close" href="#">' +
                      importDefault("sdk.fbt")._("Cancel") +
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
                      importDefault("sdk.fbt")._("Cancel") +
                      '"' +
                      '            id="fb_dialog_loader_close"/>' +
                      "        </label>" +
                      "      </td>" +
                      '      <td class="header_center">' +
                      "        <div>" +
                      "         " +
                      importDefault("sdk.fbt")._("Loading...") +
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
                    content: content,
                  });
                },

                _setDialogOverlayStyle: function _setDialogOverlayStyle() {
                  if (Dialog._overlayEl != null) {
                    importNamespace("sdk.DialogUtils").applyScreenDimensions(
                      Dialog._overlayEl,
                    );
                  }
                },

                _showTabletOverlay: function _showTabletOverlay(
                  _onClickForClose,
                ) {
                  if (!Dialog.isTabletStyle()) {
                    return;
                  }
                  if (Dialog._overlayEl == null) {
                    var newOverlay =
                      importNamespace("sdk.DialogUtils").setupNewDarkOverlay();
                    newOverlay.className = "";
                    Dialog._overlayEl = newOverlay;
                    importNamespace("sdk.Content").append(
                      Dialog._overlayEl,
                      null,
                    );
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
                      },
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
                    importNamespace("sdk.DialogUtils").onDialogHideCleanup(
                      Dialog.isTabletStyle(),
                    );
                    Dialog._hideTabletOverlay();
                    if (cb != null) {
                      cb();
                    }
                  };

                  Dialog._showTabletOverlay(onClick);

                  if (!Dialog._loaderEl) {
                    Dialog._loaderEl = Dialog._findRoot(
                      importDefault("sdk.UA").mobile()
                        ? Dialog._createMobileLoader()
                        : Dialog._createWWWLoader(width),
                    );
                  }

                  var loaderClose = document.getElementById(
                    "fb_dialog_loader_close",
                  );

                  if (loaderClose) {
                    importNamespace("sdk.DOM").removeCss(
                      loaderClose,
                      "fb_hidden",
                    );
                    var listener = importNamespace("DOMEventListener").add(
                      loaderClose,
                      "click",
                      onClick,
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
                    importDefault("sdk.Runtime").isEnvironment(
                      importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                    )
                  ) {
                    importDefault("sdk.Canvas.Environment").getPageInfo(
                      function CanvasEnvironment_getPageInfo_$0(pageInfo) {
                        Dialog._centerActive(pageInfo);
                      },
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
                    },
                  );
                },

                _centerActive: function _centerActive(pageInfo) {
                  var dialog = Dialog._active;
                  if (!dialog) {
                    return;
                  }

                  importNamespace("sdk.DialogUtils").setDialogPositionToCenter(
                    dialog,
                    Dialog.isTabletStyle(),
                    pageInfo,
                  );
                },

                _setDialogSizes: function _setDialogSizes(skipHeight) {
                  if (skipHeight === void 0) {
                    skipHeight = false;
                  }
                  if (!importDefault("sdk.UA").mobile()) {
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
                  if (importDefault("sdk.UA").mobile()) {
                    var size = getMobileSize();
                    if (size) {
                      var _DOM$getViewportInfo$,
                        _DOM$getViewportInfo,
                        _DOM$getViewportInfo$3,
                        _DOM$getViewportInfo3;
                      if (
                        (_DOM$getViewportInfo$ =
                          (_DOM$getViewportInfo =
                            importNamespace("sdk.DOM").getViewportInfo()) ==
                          null
                            ? void 0
                            : _DOM$getViewportInfo.width) != null
                          ? _DOM$getViewportInfo$
                          : MAX_WIDTH_MOBILE <= size.width
                      ) {
                        var _DOM$getViewportInfo$2, _DOM$getViewportInfo2;
                        size.width =
                          (_DOM$getViewportInfo$2 =
                            (_DOM$getViewportInfo2 =
                              importNamespace("sdk.DOM").getViewportInfo()) ==
                            null
                              ? void 0
                              : _DOM$getViewportInfo2.width) != null
                            ? _DOM$getViewportInfo$2
                            : MAX_WIDTH_MOBILE - MARGIN_SURROUNDING;
                      }
                      if (
                        (_DOM$getViewportInfo$3 =
                          (_DOM$getViewportInfo3 =
                            importNamespace("sdk.DOM").getViewportInfo()) ==
                          null
                            ? void 0
                            : _DOM$getViewportInfo3.height) != null
                          ? _DOM$getViewportInfo$3
                          : MAX_HEIGHT_MOBILE <= size.height
                      ) {
                        var _DOM$getViewportInfo$4, _DOM$getViewportInfo4;
                        size.height =
                          (_DOM$getViewportInfo$4 =
                            (_DOM$getViewportInfo4 =
                              importNamespace("sdk.DOM").getViewportInfo()) ==
                            null
                              ? void 0
                              : _DOM$getViewportInfo4.height) != null
                            ? _DOM$getViewportInfo$4
                            : MAX_HEIGHT_MOBILE - MARGIN_SURROUNDING;
                      }
                      return size;
                    }

                    if (importDefault("sdk.UA").ipad()) {
                      return {
                        width: MAX_WIDTH_MOBILE,
                        height: MAX_HEIGHT_MOBILE,
                      };
                    }

                    if (importDefault("sdk.UA").android()) {
                      return {
                        width: screen.availWidth,
                        height: screen.availHeight,
                      };
                    } else {
                      var width = window.innerWidth;
                      var height = window.innerHeight;
                      var isLandscape = width / height > 1.2;

                      return {
                        width: width,
                        height: Math.max(
                          height,
                          isLandscape ? screen.width : screen.height,
                        ),
                      };
                    }
                  }
                  return {
                    width: MAX_WIDTH_DESKTOP,
                    height: MAX_HEIGHT_DESKTOP,
                  };
                },

                _handleOrientationChange: function _handleOrientationChange() {
                  var _DOM$getViewportInfo$5, _DOM$getViewportInfo5;
                  Dialog._availScreenWidth =
                    (_DOM$getViewportInfo$5 =
                      (_DOM$getViewportInfo5 =
                        importNamespace("sdk.DOM").getViewportInfo()) == null
                        ? void 0
                        : _DOM$getViewportInfo5.width) != null
                      ? _DOM$getViewportInfo$5
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
                          id,
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
                  var _DOM$getViewportInfo$6, _DOM$getViewportInfo6;
                  if (!importDefault("sdk.UA").mobile()) {
                    return;
                  }
                  Dialog._availScreenWidth =
                    (_DOM$getViewportInfo$6 =
                      (_DOM$getViewportInfo6 =
                        importNamespace("sdk.DOM").getViewportInfo()) == null
                        ? void 0
                        : _DOM$getViewportInfo6.width) != null
                      ? _DOM$getViewportInfo$6
                      : MAX_WIDTH_MOBILE;
                  importNamespace(
                    "sdk.DialogUtils",
                  ).addMobileOrientationChangeAction(
                    Dialog._handleOrientationChange,
                  );
                },

                create: function create(opts) {
                  var created =
                    importNamespace("sdk.DialogUtils").setupNewDialog(opts);
                  importNamespace("sdk.Content").append(created.dialogElement);
                  if (opts.visible) {
                    Dialog.show(created.dialogElement);
                  }
                  if (typeof opts.styles === "object") {
                    ES(
                      "Object",
                      "assign",
                      false,
                      created.dialogElement.style,
                      opts.styles,
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
                    importNamespace("sdk.DialogUtils").onDialogHideCleanup(
                      Dialog.isTabletStyle(),
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
                        importNamespace("sdk.DialogUtils").onDialogHideCleanup(
                          Dialog.isTabletStyle(),
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
                      (_dialog$parentNode = dialog.parentNode) == null ||
                        _dialog$parentNode.removeChild(dialog);
                    }, 3000);
                  }
                },

                isActive: function isActive(node) {
                  var root = Dialog._findRoot(node);
                  return root != null && root === Dialog._active;
                },

                isTabletStyle: function isTabletStyle() {
                  if (!importDefault("sdk.UA").mobile()) {
                    return false;
                  }
                  var size = getMobileSize();
                  return (
                    size != null &&
                    (size.height >= MAX_HEIGHT_MOBILE ||
                      size.width >= MAX_WIDTH_MOBILE)
                  );
                },
              };
              var _default = Dialog;
              exports["default"] = _default;
            },
            226,
          );
          __d(
            "ArgumentError",
            ["ManagedError"],
            function $module_ArgumentError(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var ArgumentError = (function (_ManagedError) {
                function ArgumentError(message, innerError) {
                  return _ManagedError.call(this, message, innerError) || this;
                }
                babelHelpers.inheritsLoose(ArgumentError, _ManagedError);
                return ArgumentError;
              })(importDefault("ManagedError"));
              exports["default"] = ArgumentError;
            },
            98,
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
              exports,
            ) {
              "use strict";

              function flattenObject(obj) {
                var flat = {};
                for (var _key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, _key)) {
                    var value = obj[_key];
                    if (value == null) {
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
              exports["default"] = flattenObject;
            },
            66,
          );
          __d(
            "ApiClientUtils",
            [
              "ArgumentError",
              "Assert",
              "Log",
              "flattenObject",
              "sdk.URI",
              "sprintf",
            ],
            function $module_ApiClientUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var METHODS = {
                get: true,
                post: true,
                delete: true,
                put: true,
              };

              function parseCallDataFromArgs(args) {
                var path = args.shift();
                importDefault("Assert").isString(path, "Invalid path");

                if (!/^https?/.test(path) && path.charAt(0) !== "/") {
                  path = "/" + path;
                }

                var uri;
                var argsMap = {};

                try {
                  uri = new (importDefault("sdk.URI"))(path);
                } catch (e) {
                  throw new (importDefault("ArgumentError"))(e.message, e);
                }

                args.forEach(function args_forEach_$0(arg) {
                  return (argsMap[typeof arg] = arg);
                });

                var method = (argsMap.string || "get").toLowerCase();

                importDefault("Assert").isTrue(
                  Object.prototype.hasOwnProperty.call(METHODS, method),
                  importDefault("sprintf")(
                    "Invalid method passed to ApiClient: %s",
                    method,
                  ),
                );

                var callback = argsMap["function"];
                if (!callback) {
                  importNamespace("Log").warn(
                    "No callback passed to the ApiClient",
                  );
                }

                if (argsMap.object) {
                  uri.addQueryData(
                    importDefault("flattenObject")(argsMap.object),
                  );
                }

                var params = uri.getQueryData();
                params.method = method;

                return { uri: uri, callback: callback, params: params };
              }
              exports.parseCallDataFromArgs = parseCallDataFromArgs;
            },
            98,
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
              exports,
            ) {
              "use strict";

              function errorCode(name) {
                throw new Error(
                  "errorCode" +
                    '("' +
                    name +
                    '"): This should not happen. Oh noes!',
                );
              }
              exports["default"] = errorCode;
            },
            66,
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
              exports,
            ) {
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
              exports["default"] = nullthrows;
            },
            66,
          );
          __d(
            "sdk.safelyParseResponse",
            ["errorCode", "nullthrows"],
            function $module_sdk_safelyParseResponse(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
              errorCode,
            ) {
              "use strict";

              var errorHandler = function errorHandler(
                _ex,
                _rawResponse,
                _url,
                _responseCode,
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
                        importDefault("nullthrows")(rawResponse),
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
                  type: "http",
                },
              };
              safelyParseResponse.ERROR = ERROR;
              safelyParseResponse.setErrorHandler = function (newHandler) {
                errorHandler = newHandler;
              };
              var _default = safelyParseResponse;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
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
              exports["default"] = whitelistObjectKeys;
            },
            66,
          );
          __d(
            "ApiBatcher",
            [
              "invariant",
              "ApiClientUtils",
              "QueryString",
              "sdk.safelyParseResponse",
              "whitelistObjectKeys",
            ],
            function $module_ApiBatcher(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
              invariant,
            ) {
              "use strict";

              var REQUESTS_PER_BATCH = 50;

              var DEFAULT_BATCH_APP_ID = 105440539523;
              var ApiBatcher = (function () {
                function ApiBatcher(executeRequest, clientID) {
                  this.$ApiBatcher$p_batchCalls = [];
                  this.$ApiBatcher$p_batchCallbacks = [];
                  this.$ApiBatcher$p_scheduleID = null;
                  this.executeRequest = executeRequest;
                  this.$ApiBatcher$p_clientID = clientID;
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
                  var _ApiBatcher$prepareBa =
                      ApiBatcher.prepareBatchParams(args),
                    body = _ApiBatcher$prepareBa.body,
                    callback = _ApiBatcher$prepareBa.callback,
                    method = _ApiBatcher$prepareBa.method,
                    relative_url = _ApiBatcher$prepareBa.relative_url;

                  var batchCall = {
                    method: method,
                    relative_url: relative_url,
                  };

                  if (body) {
                    batchCall.body = body;
                  }

                  this.$ApiBatcher$p_batchCalls.push(batchCall);
                  this.$ApiBatcher$p_batchCallbacks.push(callback);

                  if (
                    this.$ApiBatcher$p_batchCalls.length == REQUESTS_PER_BATCH
                  ) {
                    if (this.$ApiBatcher$p_scheduleID) {
                      window.clearTimeout(this.$ApiBatcher$p_scheduleID);
                    }
                    this.$ApiBatcher$p_dispatchBatchCalls();
                  } else if (!this.$ApiBatcher$p_scheduleID) {
                    this.$ApiBatcher$p_scheduleID = window.setTimeout(
                      function window_setTimeout_$0() {
                        _this.$ApiBatcher$p_dispatchBatchCalls();
                      },
                      0,
                    );
                  }
                };
                ApiBatcher.prepareBatchParams = function prepareBatchParams(
                  args,
                  keptQueryParams,
                ) {
                  if (keptQueryParams === void 0) {
                    keptQueryParams = [];
                  }
                  var _ApiClientUtils$parse =
                      importNamespace("ApiClientUtils").parseCallDataFromArgs(
                        args,
                      ),
                    uri = _ApiClientUtils$parse.uri,
                    callback = _ApiClientUtils$parse.callback,
                    method = _ApiClientUtils$parse.params.method;

                  var body;
                  var relative_url = uri.removeQueryData("method").toString();
                  if (method.toLowerCase() == "post") {
                    var queryData = uri.getQueryData();
                    body = importDefault("QueryString").encode(queryData);
                    var filteredQueryData = importDefault(
                      "whitelistObjectKeys",
                    )(queryData, keptQueryParams);
                    relative_url = uri
                      .setQueryData(filteredQueryData)
                      .toString();
                  }

                  return {
                    body: body,
                    callback: callback,
                    method: method,
                    relative_url: relative_url,
                  };
                };
                _proto.$ApiBatcher$p_dispatchBatchCalls =
                  function $ApiBatcher$p_dispatchBatchCalls() {
                    this.$ApiBatcher$p_batchCalls.length > 0 ||
                      invariant(
                        0,
                        "ApiClient: _batchCalls is empty at dispatch.",
                      );

                    this.$ApiBatcher$p_batchCalls.length ===
                      this.$ApiBatcher$p_batchCallbacks.length ||
                      invariant(
                        0,
                        "ApiClient: Every batch call should have a callback",
                      );

                    var copiedBatchCalls = this.$ApiBatcher$p_batchCalls;
                    var copiedBatchCallbacks =
                      this.$ApiBatcher$p_batchCallbacks;
                    this.$ApiBatcher$p_batchCalls = [];
                    this.$ApiBatcher$p_batchCallbacks = [];
                    this.$ApiBatcher$p_scheduleID = null;

                    if (copiedBatchCalls.length === 1) {
                      var call = copiedBatchCalls[0];
                      var callback = copiedBatchCallbacks[0];

                      var body = call.body
                        ? importDefault("QueryString").decode(call.body)
                        : null;

                      this.executeRequest(
                        call.relative_url,
                        call.method,
                        body,
                        callback,
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
                          this.$ApiBatcher$p_clientID || DEFAULT_BATCH_APP_ID,
                      },
                      function executeRequest_$3(response) {
                        if (Array.isArray(response)) {
                          response.forEach(
                            function response_forEach_$0(data, idx) {
                              copiedBatchCallbacks[idx](
                                importDefault("sdk.safelyParseResponse")(
                                  data && data.body,
                                ),
                              );
                            },
                          );
                        } else {
                          copiedBatchCallbacks.forEach(
                            function copiedBatchCallbacks_forEach_$0(callback) {
                              return callback({
                                error: { message: "Fatal: batch call failed." },
                              });
                            },
                          );
                        }
                      },
                    );
                  };
                return ApiBatcher;
              })();
              exports["default"] = ApiBatcher;
            },
            98,
          );
          __d(
            "RequestConstants",
            ["errorCode"],
            function $module_RequestConstants(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
              errorCode,
            ) {
              var PARSE_ERROR_TEMPLATE = {
                code: 1,
                error_subcode: 1357045,
                message: "unknown error (empty response)",
                type: "http",
                status: 0,
              };
              exports.PARSE_ERROR_TEMPLATE = PARSE_ERROR_TEMPLATE;
            },
            98,
          );
          __d(
            "CORSRequest",
            [
              "Log",
              "QueryString",
              "RequestConstants",
              "sdk.Cookie",
              "sdk.safelyParseResponse",
              "wrapFunction",
            ],
            function $module_CORSRequest(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function createCORSRequest(method, url, additionalArgs) {
                var _additionalArgs;
                if (additionalArgs === void 0) {
                  additionalArgs = { withCredentials: false };
                }
                if (!self.XMLHttpRequest) {
                  return null;
                }
                var xhr;
                xhr = new XMLHttpRequest();
                var noop = function noop() {};

                if (
                  (_additionalArgs = additionalArgs) != null &&
                  _additionalArgs.withCredentials
                ) {
                  xhr.withCredentials = true;
                }

                if ("withCredentials" in xhr) {
                  xhr.open(method, url, true);
                  xhr.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded",
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
                  },
                };
                var onload = importDefault("wrapFunction")(
                  function wrapFunction_$0() {
                    onload = noop;
                    if ("onload" in wrapper) {
                      wrapper.onload(xhr);
                    }
                  },
                  "entry",
                  "XMLHttpRequest:load",
                );
                var onerror = importDefault("wrapFunction")(
                  function wrapFunction_$0() {
                    onerror = noop;
                    if ("onerror" in wrapper) {
                      wrapper.onerror(xhr);
                    }
                  },
                  "entry",
                  "XMLHttpRequest:error",
                );

                xhr.onload = function () {
                  onload();
                };

                xhr.onerror = function () {
                  onerror();
                };

                if (xhr instanceof XMLHttpRequest) {
                  xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                        onload();
                      } else {
                        onerror();
                      }
                    }
                  };
                }

                return wrapper;
              }

              var JSON_HIJACKING_SHIELD = "for (;;);";
              var JSON_HIJACKING_SHIELD_LEN = JSON_HIJACKING_SHIELD.length;

              function unshieldResponse(text) {
                if (
                  text.substring(0, JSON_HIJACKING_SHIELD_LEN) ==
                  JSON_HIJACKING_SHIELD
                ) {
                  text = text.substring(JSON_HIJACKING_SHIELD_LEN);
                }
                return text;
              }

              function execute(
                url,

                method,

                params,

                cb,
                additionalArgs,
              ) {
                if (additionalArgs === void 0) {
                  additionalArgs = { withCredentials: false };
                }
                if (
                  ES(url, "includes", true, "/../") ||
                  ES(url, "includes", true, "/..\\") ||
                  ES(url, "includes", true, "\\../") ||
                  ES(url, "includes", true, "\\..\\")
                ) {
                  importNamespace("Log").error(
                    "CORSRequest.execute(): path traversal is not allowed.",
                  );
                  return false;
                }

                try {
                  if (self.document) {
                    var cppo = importNamespace("sdk.Cookie").getRaw("cppo");
                    if (cppo) {
                      url = importDefault("QueryString").appendToUrl(
                        url,
                        importDefault("QueryString").encode({ __cppo: cppo }),
                      );
                    }
                  }
                } catch (_unused2) {}

                params.suppress_http_code = 1;
                var data = importDefault("QueryString").encode(params);

                if (method !== "post") {
                  url = importDefault("QueryString").appendToUrl(url, data);
                  data = "";
                }

                var request = createCORSRequest(method, url, additionalArgs);
                if (!request) {
                  return false;
                }

                request.onload = function (xhr) {
                  cb(
                    importDefault("sdk.safelyParseResponse")(
                      unshieldResponse(xhr.responseText),
                      url,
                      xhr.status,
                    ),
                  );
                };

                request.onerror = function (xhr) {
                  if (xhr.responseText) {
                    cb(
                      importDefault("sdk.safelyParseResponse")(
                        unshieldResponse(xhr.responseText),
                        url,
                        xhr.status,
                      ),
                    );
                  } else {
                    cb({
                      error: babelHelpers["extends"](
                        {},
                        importNamespace("RequestConstants")
                          .PARSE_ERROR_TEMPLATE,
                        {
                          status: xhr.status,
                        },
                      ),
                    });
                  }
                };
                request.send(data);
                return true;
              }

              var CORSRequest = {
                execute: execute,
              };
              var _default = CORSRequest;
              exports["default"] = _default;
            },
            98,
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
              "flattenObject",
            ],
            function $module_ApiClient(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var accessToken;
              var clientID;
              var defaultParams;
              var keptQueryParams = [];
              var withCredentials = false;

              var MAX_QUERYSTRING_LENGTH = 2000;

              var READONLYCALLS = {
                fql_query: true,
                fql_multiquery: true,
                friends_get: true,
                notifications_get: true,
                stream_get: true,
                users_getinfo: true,
              };

              var defaultTransports = ["cors"];

              var currentlyExecutingRequests = 0;
              var requestQueue = [];
              var maxConcurrentRequests = 0;
              var requestCounter = 0;

              var apiBatcher;

              var logger = importNamespace("Log");

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
                  paramsRaw,
                );

                params.pretty = params.pretty || 0;

                params = importDefault("flattenObject")(params);
                var availableTransports = {
                  cors: importDefault("CORSRequest"),
                };

                var getParams = {};

                var accessTokenForRequest = params.access_token || accessToken;
                if (accessTokenForRequest) {
                  getParams.access_token = accessTokenForRequest;
                }
                if (method !== "get") {
                  keptQueryParams.forEach(
                    function keptQueryParams_forEach_$0(keptQueryParam) {
                      getParams[keptQueryParam] = params[keptQueryParam];
                    },
                  );
                }

                var getParamNames = Object.keys(getParams);
                if (getParamNames.length > 0) {
                  url = importDefault("QueryString").appendToUrl(
                    url,
                    getParams,
                  );

                  delete params.access_token;
                }

                var transports = defaultTransports;

                for (var i = 0; i < transports.length; i++) {
                  var transport = availableTransports[transports[i]];

                  var additionalArgs = { withCredentials: withCredentials };

                  var paramsCopy = babelHelpers["extends"]({}, params);
                  if (
                    transport.execute(
                      url,
                      method,
                      paramsCopy,
                      cb,
                      additionalArgs,
                    )
                  ) {
                    return;
                  }
                }

                cb({
                  error: {
                    type: "no-transport",
                    message: "Could not find a usable transport for request",
                  },
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
                done,
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
                    requestIndex,
                  );
                }

                ApiClient.inform(
                  "request.complete",
                  endpoint,
                  method,
                  params,
                  response,
                  Date.now() - startTime,
                  requestIndex,
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
                var _ApiClientUtils$parse =
                    importNamespace("ApiClientUtils").parseCallDataFromArgs(
                      args,
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
                    : importNamespace("UrlMap").resolve("graph_domain") +
                      uri.getPath();

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
                    requestIndex,
                  ),
                );
              }

              function scheduleBatchCall() {
                var _apiBatcher;
                if (!apiBatcher) {
                  apiBatcher = new (importDefault("ApiBatcher"))(
                    requestUsingGraph,
                    clientID,
                  );
                }
                (_apiBatcher = apiBatcher).scheduleBatchCall.apply(
                  _apiBatcher,
                  arguments,
                );
              }

              function requestUsingRest(params, cb) {
                importDefault("Assert").isObject(params);
                importDefault("Assert").isString(
                  params.method,
                  "method missing",
                );

                if (!cb) {
                  logger.warn("No callback passed to the ApiClient");
                }
                var method = params.method.toLowerCase().replace(".", "_");
                params.format = "json-strings";
                params.api_key = clientID;

                var domain = method in READONLYCALLS ? "api_read" : "api";
                var url =
                  importNamespace("UrlMap").resolve(domain) + "/restserver.php";
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
                  requestIndex,
                );

                request(url, "get", params, inspector);
              }

              function prepareBatchParams(args) {
                return importDefault("ApiBatcher").prepareBatchParams(
                  args,
                  keptQueryParams,
                );
              }

              var ApiClient = ES(
                "Object",
                "assign",
                false,
                new (importDefault("ObservableMixin"))(),
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
                          "API parameters instead of overriding the global settings.",
                      );
                    }
                    accessToken = access_token;
                  },
                  setAccessTokenForClientID: function setAccessTokenForClientID(
                    access_token,
                    client_id,
                  ) {
                    if (accessToken && clientID && clientID !== client_id) {
                      logger.error(
                        "Not overriding access token since it was not " +
                          "initialized by your application.",
                      );
                    } else {
                      accessToken = access_token;
                    }
                  },
                  setWithCredentials: function setWithCredentials(
                    with_credentials,
                  ) {
                    withCredentials = with_credentials;
                  },
                  getWithCredentials: function getWithCredentials() {
                    return withCredentials;
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
                          "client ID. Overriding the previously set client ID.",
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
                    newDefaultTransports,
                  ) {
                    defaultTransports = newDefaultTransports;
                  },
                  setLogger: function setLogger(customLogger) {
                    logger = customLogger;
                  },
                  setMaxConcurrentRequests: function setMaxConcurrentRequests(
                    value,
                  ) {
                    maxConcurrentRequests = value;
                  },
                  setKeptQueryParams: function setKeptQueryParams(params) {
                    keptQueryParams = params;
                  },
                  getCurrentlyExecutingRequestCount:
                    function getCurrentlyExecutingRequestCount() {
                      return currentlyExecutingRequests;
                    },
                  getQueuedRequestCount: function getQueuedRequestCount() {
                    return requestQueue.length;
                  },
                  rest: requestUsingRest,
                  graph: requestUsingGraph,
                  scheduleBatchCall: scheduleBatchCall,
                  prepareBatchParams: prepareBatchParams,
                },
              );

              function requestIsTooLargeForGet(uri, method) {
                return (
                  uri.toString().length > MAX_QUERYSTRING_LENGTH &&
                  method === "get"
                );
              }
              var _default = ApiClient;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.PlatformVersioning",
            ["ManagedError", "sdk.Runtime"],
            function $module_sdk_PlatformVersioning(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var REGEX = /^v\d+\.\d\d?$/;

              function assertVersionIsSet() {
                if (!importDefault("sdk.Runtime").getVersion()) {
                  throw new (importDefault("ManagedError"))(
                    "init not called with valid version",
                  );
                }
              }

              function assertValidVersion(version) {
                if (!REGEX.test(version)) {
                  throw new (importDefault("ManagedError"))(
                    "invalid version specified",
                  );
                }
              }
              exports.REGEX = REGEX;
              exports.assertVersionIsSet = assertVersionIsSet;
              exports.assertValidVersion = assertValidVersion;
            },
            98,
          );
          __d(
            "sdk.warnInsecure",
            ["Log", "sdk.Runtime", "sdk.Scribe", "sdk.feature"],
            function $module_sdk_warnInsecure(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var httpsOnlyLearnMore = importDefault("sdk.feature")(
                "https_only_learn_more",
                "",
              );
              var logged = {};

              function warnInsecure(methodName) {
                if (window.location.protocol !== "https:") {
                  importNamespace("Log").log(
                    "error",
                    -1,
                    "The method FB.%s can no longer be called from http pages. %s",
                    methodName,
                    httpsOnlyLearnMore,
                  );
                  if (
                    importDefault("sdk.feature")(
                      "https_only_scribe_logging",
                      true,
                    ) &&
                    !Object.prototype.hasOwnProperty.call(logged, methodName)
                  ) {
                    importNamespace("sdk.Scribe").log("jssdk_error", {
                      appId: importDefault("sdk.Runtime").getClientID(),
                      error: "HttpsOnly",
                      extra: {
                        message: methodName,
                      },
                    });
                    logged[methodName] = true;
                  }
                }
                return true;
              }
              exports["default"] = warnInsecure;
            },
            98,
          );
          __d(
            "sdk.api",
            [
              "ApiClient",
              "sdk.PlatformVersioning",
              "sdk.Runtime",
              "sdk.URI",
              "sdk.warnInsecure",
            ],
            function $module_sdk_api(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function api(pathOrObject) {
                for (
                  var _len = arguments.length,
                    additionalArgs = new Array(_len > 1 ? _len - 1 : 0),
                    _key = 1;
                  _key < _len;
                  _key++
                ) {
                  additionalArgs[_key - 1] = arguments[_key];
                }
                importDefault("sdk.warnInsecure")("api");

                if (typeof pathOrObject === "string") {
                  if (importDefault("sdk.Runtime").getIsVersioned()) {
                    importNamespace(
                      "sdk.PlatformVersioning",
                    ).assertVersionIsSet();
                    var path = pathOrObject;

                    if (!/https?/.test(path) && path.charAt(0) !== "/") {
                      path = "/" + path;
                    }
                    path = new (importDefault("sdk.URI"))(path)
                      .setDomain("")
                      .setProtocol("")
                      .toString();

                    if (
                      !importNamespace("sdk.PlatformVersioning").REGEX.test(
                        path.substring(1, path.indexOf("/", 1)),
                      )
                    ) {
                      path =
                        "/" + importDefault("sdk.Runtime").getVersion() + path;
                    }

                    var args = [path].concat(
                      Array.prototype.slice.call(arguments, 1),
                    );
                    importDefault("ApiClient").graph.apply(
                      importDefault("ApiClient"),
                      args,
                    );
                  } else {
                    importDefault("ApiClient").graph.apply(
                      importDefault("ApiClient"),
                      arguments,
                    );
                  }
                } else {
                  importDefault("ApiClient").rest.apply(
                    importDefault("ApiClient"),
                    arguments,
                  );
                }
              }
              exports["default"] = api;
            },
            98,
          );
          __d(
            "sdk.Frictionless",
            ["sdk.Auth.LoginStatus", "sdk.Dialog", "sdk.Event", "sdk.api"],
            function $module_sdk_Frictionless(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var Frictionless = {
                _allowedRecipients: {},

                _useFrictionless: false,

                _updateRecipients: function _updateRecipients() {
                  Frictionless._allowedRecipients = {};

                  importDefault("sdk.api")(
                    "/me/apprequestformerrecipients",
                    function api_$1(response) {
                      if (!response || (response != null && response.error)) {
                        return;
                      }

                      response.data.forEach(
                        function response_data_forEach_$0(recipient) {
                          Frictionless._allowedRecipients[
                            recipient.recipient_id
                          ] = true;
                        },
                      );
                    },
                  );
                },

                init: function init() {
                  Frictionless._useFrictionless = true;

                  importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                    function LoginStatus_getLoginStatus_$0(response) {
                      if (
                        (response == null ? void 0 : response.status) ==
                        "connected"
                      ) {
                        Frictionless._updateRecipients();
                      }
                    },
                  );

                  importNamespace("sdk.Event").subscribe(
                    "auth.login",
                    function Event_subscribe_$1(login) {
                      if (login.authResponse) {
                        Frictionless._updateRecipients();
                      }
                    },
                  );
                },

                _processRequestResponse: function _processRequestResponse(
                  cb,
                  hidden,
                ) {
                  return function (params) {
                    var updated = params && params.updated_frictionless;
                    if (Frictionless._useFrictionless && updated !== null) {
                      Frictionless._updateRecipients();
                    }

                    if (params) {
                      if (!hidden && params.frictionless !== null) {
                        importDefault("sdk.Dialog")._hideLoader();
                      }
                      delete params.frictionless;
                      delete params.updated_frictionless;
                    }

                    cb && cb(params);
                  };
                },

                isAllowed: function isAllowed(user_ids) {
                  var checkedUserIds = user_ids;
                  if (!checkedUserIds) {
                    return false;
                  }

                  if (typeof checkedUserIds === "number") {
                    return checkedUserIds in Frictionless._allowedRecipients;
                  }
                  if (typeof checkedUserIds === "string") {
                    checkedUserIds = checkedUserIds.split(",");
                  }
                  var checkedUserIdsMap = checkedUserIds.map(
                    function checkedUserIds_map_$0(s) {
                      return String(s).trim();
                    },
                  );

                  var allowed = true;
                  var has_user_ids = false;
                  checkedUserIdsMap.forEach(
                    function checkedUserIdsMap_forEach_$0(user_id) {
                      allowed =
                        allowed && user_id in Frictionless._allowedRecipients;
                      has_user_ids = true;
                    },
                  );
                  return allowed && has_user_ids;
                },
              };
              var _default = Frictionless;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
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
              exports["default"] = createObjectFrom;
            },
            66,
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
              exports,
            ) {
              function resolveURI(uri) {
                if (uri == null || uri === "") {
                  return window.location.href;
                }

                var a = document.createElement("a");
                a.href = uri;
                return a.href;
              }
              exports["default"] = resolveURI;
            },
            66,
          );
          __d(
            "sdk.NativeExtensions",
            ["DOMEventListener", "Log", "sdk.UA"],
            function $module_sdk_NativeExtensions(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
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
                if (!importDefault("sdk.UA").facebookInAppBrowser()) {
                  importNamespace("Log").error(
                    "FB.NativeExtensions.onReady only works when the page is rendered " +
                      "in a WebView of the native Facebook app.",
                  );
                  return;
                }

                var extensionAPIBridge = getAPIBridge();
                if (extensionAPIBridge) {
                  func(extensionAPIBridge);
                  return;
                }

                var bridgeCalled = false;
                var _nativeExtensionsReadyCallback =
                  function nativeExtensionsReadyCallback() {
                    var bridge = getAPIBridge();
                    if (bridgeCalled || !bridge) {
                      return;
                    }
                    bridgeCalled = true;
                    func(bridge);
                    importNamespace("DOMEventListener").remove(
                      window,
                      NATIVE_EXTENSIONS_READY_EVENT,
                      _nativeExtensionsReadyCallback,
                    );
                  };

                importNamespace("DOMEventListener").add(
                  window,
                  NATIVE_EXTENSIONS_READY_EVENT,
                  _nativeExtensionsReadyCallback,
                );
              }
              exports.onReady = onReady;
            },
            98,
          );
          __d(
            "sdk.Extensions",
            ["JSONRPC", "Queue", "sdk.NativeExtensions", "sdk.UA"],
            function $module_sdk_Extensions(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var outQueue = new (importDefault("Queue"))();
              var jsonrpc = new (importDefault("JSONRPC"))(function (message) {
                outQueue.enqueue(message);
              });

              var rpcQueue = new (importDefault("Queue"))();
              rpcQueue.start(function rpcQueue_start_$0(message) {
                jsonrpc.read(message);
              });

              var extensionAPIBridge = null;

              if (importDefault("sdk.UA").facebookInAppBrowser()) {
                importNamespace("sdk.NativeExtensions").onReady(
                  function NativeExtensions_onReady_$0(bridge) {
                    extensionAPIBridge = bridge;

                    window._FBBrowserCallbackHandler = function (message) {
                      rpcQueue.enqueue(ES("JSON", "stringify", false, message));
                    };

                    bridge.initializeCallbackHandler(
                      ES("JSON", "stringify", false, {
                        name: "_FBBrowserCallbackHandler",
                      }),
                    );

                    outQueue.start(function outQueue_start_$0(message) {
                      bridge.jsonRPC(message);
                    });
                  },
                );
              }

              var local = jsonrpc.local;
              var remote = jsonrpc.remote;
              var stub = ES(jsonrpc.stub, "bind", true, jsonrpc);

              function supportsDialog(method) {
                return (
                  !!extensionAPIBridge &&
                  extensionAPIBridge.supportsDialog(method)
                );
              }
              exports.local = local;
              exports.remote = remote;
              exports.stub = stub;
              exports.supportsDialog = supportsDialog;
            },
            98,
          );
          __d(
            "sdk.Native",
            ["Log", "sdk.UA"],
            function $module_sdk_Native(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var NATIVE_READY_EVENT = "fbNativeReady";

              var Native = {
                onready: function onready(func) {
                  if (!importDefault("sdk.UA").nativeApp()) {
                    importNamespace("Log").error(
                      "FB.Native.onready only works when the page is rendered " +
                        "in a WebView of the native Facebook app. Test if this is the " +
                        "case calling FB.UA.nativeApp()",
                    );
                    return;
                  }

                  if (window.__fbNative && !this.nativeReady) {
                    ES("Object", "assign", false, this, window.__fbNative);
                  }

                  if (this.nativeReady) {
                    func();
                  } else {
                    var _nativeReadyCallback = function nativeReadyCallback() {
                      window.removeEventListener(
                        NATIVE_READY_EVENT,
                        _nativeReadyCallback,
                      );
                      this.onready(func);
                    };
                    window.addEventListener(
                      NATIVE_READY_EVENT,
                      _nativeReadyCallback,
                      false,
                    );
                  }
                },
              };
              var _default = Native;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Popup",
            [
              "sdk.Content",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.UA",
              "sdk.feature",
            ],
            function $module_sdk_Popup(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function popup(
                call,

                isOAuth,
              ) {
                var featuresString = getPopupFeaturesString({
                  name: call.name,
                  height: call.size.height,
                  width: call.size.width,
                  isOAuth: isOAuth,
                });

                var popup;
                if (call.post) {
                  popup = window.open("about:blank", call.id, featuresString);
                  if (popup) {
                    importNamespace("sdk.Content").submitToTarget({
                      url: call.url,
                      target: call.id,
                      params: call.params,
                    });
                  }
                } else {
                  popup = window.open(call.url, call.id, featuresString);
                }

                if (!popup) {
                  if (
                    importDefault("sdk.feature")(
                      "popup_blocker_scribe_logging",
                      true,
                    )
                  ) {
                    var error = isOAuth
                      ? "POPUP_MAYBE_BLOCKED_OAUTH"
                      : "POPUP_MAYBE_BLOCKED";
                    importNamespace("sdk.Scribe").log("jssdk_error", {
                      appId: importDefault("sdk.Runtime").getClientID(),
                      error: error,
                      extra: {
                        call: call.name,
                      },
                    });
                  }
                }
                return popup;
              }

              function getPopupFeaturesString(options) {
                var _screenX = window.screenX;
                var screenY = window.screenY;
                var outerWidth = window.outerWidth;
                var outerHeight = window.outerHeight;

                var width = importDefault("sdk.UA").mobile()
                  ? 0
                  : options.width;
                var height = importDefault("sdk.UA").mobile()
                  ? 0
                  : options.height;
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
                if (options.isOAuth) {
                  features.push("toolbar=0");

                  if (
                    !importDefault("sdk.UA").chrome() ||
                    importDefault("sdk.UA").chrome() < 59
                  ) {
                    features.push("location=1");
                  }
                }
                return features.join(",");
              }
              exports.popup = popup;
            },
            98,
          );
          __d(
            "isFacebookDotNetURI",
            [],
            function $module_isFacebookDotNetURI(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function isFacebookDotNetURI(uri) {
                if (
                  uri.getProtocol() !== "http" &&
                  uri.getProtocol() !== "https"
                ) {
                  return false;
                }
                var port = Number(uri.getPort());
                if (!!port && port !== 80 && port !== 443) {
                  return false;
                }
                if (uri.isSubdomainOfDomain("facebook.net")) {
                  return true;
                }
                return false;
              }
              exports["default"] = isFacebookDotNetURI;
            },
            66,
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
              exports,
            ) {
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

              isFacebookURI.setRegex = function (regex) {
                facebookURIRegex = regex;
              };
              exports["default"] = isFacebookURI;
            },
            66,
          );
          __d(
            "isInstagramURI",
            [],
            function $module_isInstagramURI(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              var instagramURIRegex = null;

              function isInstagramURI(uri) {
                if (uri.isEmpty() && uri.toString() !== "#") {
                  return false;
                }

                if (!uri.getDomain() && !uri.getProtocol()) {
                  return false;
                }

                if (uri.getProtocol() !== "https") {
                  return false;
                }

                if (!instagramURIRegex) {
                  instagramURIRegex = new RegExp(
                    "(^|\\.)instagram\\.com$",
                    "i",
                  );
                }
                return instagramURIRegex.test(uri.getDomain());
              }
              exports["default"] = isInstagramURI;
            },
            66,
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
              exports,
            ) {
              function resolveWindow(path) {
                if (path == null) {
                  return null;
                }

                var node = window;
                var parts = path.split(".");

                try {
                  for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];

                    var matches =
                      /^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(part);

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
              exports["default"] = resolveWindow;
            },
            66,
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
              "isFacebookDotNetURI",
              "isFacebookURI",
              "isInstagramURI",
              "resolveWindow",
              "sdk.Event",
              "sdk.RPC",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.URI",
              "sdk.feature",
            ],
            function $module_sdk_XD(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var facebookQueue = new (importDefault("Queue"))();

              var messageToFacebookRelation = "parent";
              var xdProxyName = null;

              var facebookRe =
                /^https:\/\/.*\.(facebook|instagram)\.(com|net)$/;

              var xdArbiterTier = importNamespace("JSSDKXDConfig").useCdn
                ? "cdn"
                : "www";

              var xdArbiterHttpsUrl =
                importNamespace("UrlMap").resolve(xdArbiterTier) +
                importNamespace("JSSDKXDConfig").XXdUrl;

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

              var channel = importDefault("guid")();
              var origin = getOrigin();
              var inited = false;

              var rpcQueue = new (importDefault("Queue"))();
              importDefault("sdk.RPC").setInQueue(rpcQueue);

              function onRegister(registeredAs) {
                importNamespace("Log").info(
                  "Remote XD can talk to facebook.com (%s)",
                  registeredAs,
                );
                importDefault("sdk.Runtime").setEnvironment(
                  registeredAs === "canvas"
                    ? importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS
                    : importDefault("sdk.Runtime").ENVIRONMENTS.PAGETAB,
                );
              }

              function handleAction(message, senderOrigin) {
                if (!senderOrigin) {
                  importNamespace("Log").error("No senderOrigin");
                  throw new Error();
                }

                switch (message.xd_action) {
                  case "plugin_ready":
                    if (typeof message.name === "string") {
                      var pluginName = message.name;
                      importNamespace("Log").info(
                        "Plugin %s ready from %s",
                        pluginName,
                        senderOrigin,
                      );
                      if (facebookRe.test(senderOrigin)) {
                        var queue = importDefault("Queue").get(pluginName, {});
                        queue.start(function queue_start_$0(message) {
                          if (message == null) {
                            importNamespace("Log").warn(
                              "Discarding null message from %s to %s on %s",
                              senderOrigin,
                              pluginName,
                              origin,
                            );
                            return;
                          }
                          if (window.frames[pluginName] != null) {
                            window.frames[pluginName].postMessage(
                              {
                                xdArbiterHandleMessage: true,
                                message: message,
                                origin: origin,
                              },
                              senderOrigin,
                            );
                          } else {
                            importNamespace("Log").info(
                              "Message discarded for plugin at window.frames[%s] which may have been removed by a new XFBML.parse() call.",
                              pluginName,
                            );
                          }
                        });
                      } else {
                        importNamespace("Log").error(
                          "Plugin attempted to register from non-Facebook domain %s",
                          senderOrigin,
                        );
                        return;
                      }
                    } else {
                      importNamespace("Log").error(
                        "plugin_ready message received without a name",
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
                var senderOriginURI = new (importDefault("sdk.URI"))(
                  senderOrigin,
                );
                if (
                  senderOrigin != null &&
                  senderOrigin !== "native" &&
                  !importDefault("isFacebookURI")(senderOriginURI) &&
                  !importDefault("isFacebookDotNetURI")(senderOriginURI) &&
                  !importDefault("isInstagramURI")(senderOriginURI)
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
                      importNamespace("Log").warn(
                        "Failed to decode %s as JSON",
                        message,
                      );
                      return;
                    }
                  } else {
                    message = importDefault("QueryString").decode(message);
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
                    !importDefault("sdk.Runtime").isCanvasEnvironment() &&
                    !facebookQueue.isStarted()
                  ) {
                    tryRegister(xdProxyName);
                  }
                } else {
                  importDefault("Queue").get(recipient, {}).enqueue(message);
                }
              }

              importDefault("sdk.RPC")
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
                      importNamespace("Log").debug(
                        "Received message from invalid origin type: %s",
                        senderOrigin,
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
                          facebookQueue.start(
                            function facebookQueue_start_$0(message) {
                              if (message == null) {
                                importNamespace("Log").warn(
                                  "Discarding null message from %s to %s",
                                  origin,
                                  senderOrigin,
                                );
                                return;
                              }

                              var windowRef = parent;
                              if (
                                typeof message === "object" &&
                                typeof message.relation === "string"
                              ) {
                                windowRef = importDefault("resolveWindow")(
                                  message.relation,
                                );
                              }

                              (windowRef != null
                                ? windowRef
                                : parent
                              ).postMessage(
                                {
                                  xdArbiterHandleMessage: true,
                                  message: message,
                                  origin: origin,
                                },
                                senderOrigin,
                              );
                            },
                          );
                        }

                        return;
                      }
                      return;
                    }
                  },
                );

                if (importDefault("sdk.Runtime").isCanvasEnvironment()) {
                  tryRegister(xdProxyName);
                }
              }

              function tryRegister(xdProxyName) {
                var _feature;
                if (!inited) {
                  init();
                }

                if (window.parent != top) {
                  importNamespace("Log").warn(
                    "cannot deliver messages to facebook unless window.parent is top and facebook.com.",
                  );
                  return;
                }

                var timeout =
                  (_feature = importDefault("sdk.feature")(
                    "xd_timeout",
                    60000,
                  )) != null
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
                      origin: origin,
                    },
                    "*",
                  );
                };

                intervalId = window.setInterval(
                  function window_setInterval_$0() {
                    if (!facebookQueue.isStarted() && retries > 0) {
                      retries--;
                      importNamespace("Log").debug(
                        "resending xdArbiterRegister",
                      );
                      registerFunc();
                    } else {
                      window.clearInterval(intervalId);
                      if (retries === 0) {
                        importNamespace("sdk.Scribe").log("jssdk_error", {
                          appId: importDefault("sdk.Runtime").getClientID(),
                          error: "XD_FB_QUEUE_INITIALIZATION",
                          extra: {
                            message:
                              "Failed to initialize in " + timeout + "ms",
                          },
                        });
                        importNamespace("Log").error(
                          "xdAbiterRegisterAck not received",
                        );
                        return;
                      }
                    }
                  },
                  retryInterval,
                );
              }

              var XD = {
                rpc: importDefault("sdk.RPC"),

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
                    relation: relation,
                  });
                },

                handler: function handler(cb, relation, forever, id) {
                  var xdArbiterFragment =
                    "#" +
                    importDefault("QueryString").encode({
                      cb: XD.registerCallback(cb, forever, id),
                      origin: origin + "/" + channel,
                      domain: location.hostname,
                      relation: relation || "opener",
                      is_canvas:
                        importDefault("sdk.Runtime").isCanvasEnvironment(),
                    });
                  return xdArbiterHttpsUrl + xdArbiterFragment;
                },

                registerCallback: function registerCallback(
                  cb,
                  persistent,
                  id,
                ) {
                  id = id || importDefault("guid")();
                  if (persistent) {
                    XD._forever[id] = true;
                  }
                  XD._callbacks[id] = cb;
                  return id;
                },
              };

              importNamespace("sdk.Event").subscribe(
                "init:post",
                function Event_subscribe_$1(options) {
                  xdProxyName = options.xdProxyName;
                  init(options.xdProxyName);
                },
              );

              module.exports = XD;
            },
            34,
          );
          __d(
            "sdk.modFeatureCheck",
            ["JSSDKConfig"],
            function $module_sdk_modFeatureCheck(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function forIDs(name, ids, defaultValue) {
                if (defaultValue === void 0) {
                  defaultValue = false;
                }
                if (
                  importNamespace("JSSDKConfig").features &&
                  name in importNamespace("JSSDKConfig").features
                ) {
                  var values = importNamespace("JSSDKConfig").features[name];
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
              exports.forIDs = forIDs;
            },
            98,
          );
          __d(
            "sdk.openMessenger",
            ["sdk.UA"],
            function $module_sdk_openMessenger(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

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
                if (importDefault("sdk.UA").android()) {
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
              exports["default"] = openMessenger;
            },
            98,
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
              "sdk.Auth.LoginStatus",
              "sdk.Content",
              "sdk.DOM",
              "sdk.Dialog",
              "sdk.Event",
              "sdk.Extensions",
              "sdk.Frictionless",
              "sdk.LoggingUtils",
              "sdk.Popup",
              "sdk.RPC",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.XD",
              "sdk.api",
              "sdk.fbt",
              "sdk.feature",
              "sdk.getContextType",
              "sdk.modFeatureCheck",
              "sdk.openMessenger",
            ],
            function $module_sdk_UIServer(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
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
                      "parent",
                    );

                    if (!importDefault("sdk.UA").nativeApp()) {
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
                },
              };

              function isSupportedOauth(params) {
                return (
                  UIServer.isOAuth(params) &&
                  importNamespace("sdk.Extensions").supportsDialog("oauth")
                );
              }

              function isSupportedAccountLink(params) {
                return (
                  UIServer.isOAuth(params) &&
                  (params.is_account_link === true ||
                    params.is_account_link === "true") &&
                  importNamespace("sdk.Extensions").supportsDialog(
                    "accountLink",
                  )
                );
              }

              function permission_oauth_transform(call) {
                if (!importDefault("sdk.Runtime").getClientID()) {
                  importNamespace("Log").error(
                    "FB.login() called before FB.init().",
                  );
                  return;
                }

                if (
                  importDefault("sdk.Auth").getAuthResponse() &&
                  !call.params.scope &&
                  !call.params.config_id &&
                  !call.params.asset_scope &&
                  !call.params.auth_type
                ) {
                  if (!call.params.plugin_prepare) {
                    importNamespace("Log").error(
                      "FB.login() called when user is already connected.",
                    );
                    call.cb &&
                      (call == null
                        ? void 0
                        : call.cb({
                            status:
                              importDefault("sdk.Runtime").getLoginStatus(),
                            authResponse:
                              importDefault("sdk.Auth").getAuthResponse(),
                          }));
                  }
                  return;
                }

                var cb = call.cb;
                var id = call.id;
                delete call.cb;

                if (call && call.params && !call.params.logger_id) {
                  call.params.logger_id = importDefault("guid")();
                }

                if (call && call.params && !call.params.cbt) {
                  call.params.cbt = Date.now();
                }

                if (
                  (call.params.fx_app === "instagram" ||
                    call.params.fx_app === "ig_single") &&
                  !call.params.scope
                ) {
                  call.params.scope = "public_profile";
                }

                var auth_type = call.params.auth_type;
                var isReauthenticate =
                  auth_type &&
                  ES(auth_type, "includes", true, "reauthenticate");
                var defaultResponseType = {
                  token: true,
                  signed_request: true,
                  graph_domain: true,
                };

                var responseTypes =
                  call.params.override_default_response_type === true
                    ? call.params.response_type
                    : Object.keys(
                        ES(
                          "Object",
                          "assign",
                          false,

                          call.params.response_type
                            ? importDefault("createObjectFrom")(
                                call.params.response_type.split(","),
                              )
                            : {},
                          defaultResponseType,
                        ),
                      ).join(",");

                if (call.params.display === "async") {
                  ES("Object", "assign", false, call.params, {
                    client_id: importDefault("sdk.Runtime").getClientID(),
                    origin: importDefault("sdk.getContextType")(),
                    response_type: responseTypes,
                    domain: location.hostname,
                  });

                  call.cb = importDefault("sdk.Auth").xdResponseWrapper(
                    cb,
                    importDefault("sdk.Auth").getAuthResponse(),
                    "permissions.oauth",
                    call.params,
                  );
                } else {
                  if (isReauthenticate) {
                    UIServer._xdNextHandler(
                      function UIServer__xdNextHandler_$0(_params) {
                        cb({
                          authResponse: null,
                          status: "not_authorized",
                        });
                      },
                      id,
                      call.params.plugin_prepare ? "opener.parent" : "opener",
                      true,
                    );
                  }

                  ES("Object", "assign", false, call.params, {
                    client_id: importDefault("sdk.Runtime").getClientID(),
                    redirect_uri: importDefault("resolveURI")(
                      UIServer.xdHandler(
                        cb,
                        id,
                        call.params.plugin_prepare ? "opener.parent" : "opener",
                        importDefault("sdk.Auth").getAuthResponse(),
                        "permissions.oauth",
                        !isReauthenticate,
                        call.params,
                      ),
                    ),
                    origin: importDefault("sdk.getContextType")(),
                    response_type: responseTypes,
                    domain: location.hostname,
                  });
                }

                var drop_funnel_logging =
                  call.params &&
                  call.params.tp &&
                  call.params.tp !== "unspecified";

                if (!call.params.plugin_prepare && !drop_funnel_logging) {
                  importNamespace("sdk.LoggingUtils").logEvent(
                    call.params.logger_id,
                    importNamespace("sdk.LoggingUtils").logEventName.loginStart,
                    { cbt_delta: 0 },
                  );
                }

                return call;
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
                  },
                },

                gaming_friendfinder: {
                  url: "gaming/me/friendfinder/",
                  transform: function transform(call) {
                    if (!importDefault("sdk.Runtime").getClientID()) {
                      importNamespace("Log").error(
                        "FriendFinder called before FB.init().",
                      );
                      return;
                    }
                    call.url += importDefault("sdk.Runtime").getClientID();
                    call.size = {
                      width: 400,
                      height: 800,
                    };
                    return call;
                  },
                },

                gaming_media_library: {
                  url: "gaming/me/media_asset/",
                  transform: function transform(call) {
                    call.url += call.params.media_id;
                    call.size = {
                      width: 400,
                      height: 800,
                    };
                    return call;
                  },
                },

                apprequests: {
                  transform: function transform(call) {
                    call = MobileIframeable.transform(call);

                    call.size = { width: 445, height: 635 };
                    call.params.display = "popup";
                    call.params.in_iframe = false;

                    call.params.frictionless =
                      importDefault("sdk.Frictionless") &&
                      importDefault("sdk.Frictionless")._useFrictionless;
                    if (call.params.frictionless) {
                      if (
                        importDefault("sdk.Frictionless").isAllowed(
                          call.params.to,
                        )
                      ) {
                        call.hideLoader = true;
                      }

                      call.cb = importDefault(
                        "sdk.Frictionless",
                      )._processRequestResponse(call.cb, call.hideLoader);
                    }

                    call.closeIcon = false;
                    return call;
                  },
                  getXdRelation: MobileIframeable.getXdRelation,
                },

                "permissions.oauth": {
                  url: "dialog/oauth",
                  size: {
                    width: importDefault("sdk.UA").mobile() ? null : 600,
                    height: importDefault("sdk.UA").mobile() ? null : 679,
                  },
                  transform: function transform(call) {
                    return permission_oauth_transform(call);
                  },
                },

                "permissions.ig_oauth": {
                  url: "oauth/authorize",
                  size: {
                    width: importDefault("sdk.UA").mobile() ? null : 600,
                    height: importDefault("sdk.UA").mobile() ? null : 679,
                  },
                  transform: function transform(call) {
                    return permission_oauth_transform(call);
                  },
                },

                photo_picker: {
                  url: "dialog/photo_picker",
                  size: {
                    width: importDefault("sdk.UA").mobile() ? null : 600,
                    height: importDefault("sdk.UA").mobile() ? null : 679,
                  },
                  transform: function transform(call) {
                    if (!importDefault("sdk.Runtime").getClientID()) {
                      importNamespace("Log").error(
                        "Photo Picker was called before FB.init().",
                      );
                      return;
                    }
                    var cb = call.cb;
                    var id = call.id;
                    delete call.cb;

                    ES("Object", "assign", false, call.params, {
                      client_id: importDefault("sdk.Runtime").getClientID(),
                      redirect_uri: importDefault("resolveURI")(
                        UIServer.xdHandlerPhotoPicker(
                          cb,
                          id,
                          call.params.plugin_prepare
                            ? "opener.parent"
                            : "opener",
                          "photo_picker",
                          call.params,
                        ),
                      ),
                      origin: importDefault("sdk.getContextType")(),
                      domain: location.hostname,
                    });

                    return call;
                  },
                },

                "auth.logout": {
                  transform: function transform(call) {
                    if (!importDefault("sdk.Runtime").getClientID()) {
                      importNamespace("Log").error(
                        "FB.logout() called before calling FB.init().",
                      );
                    } else if (!importDefault("sdk.Auth").getAuthResponse()) {
                      importNamespace("Log").error(
                        "FB.logout() called without an access token.",
                      );
                    } else {
                      importDefault("sdk.Auth").logout(call.cb);
                    }
                  },
                },

                "login.status": {
                  transform: function transform(call) {
                    importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                      call.cb,
                    );
                  },
                },

                pay: {
                  size: { width: 555, height: 120 },
                  connectDisplay: "popup",
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
                  require_access_token: true,
                },
                boost: {
                  transform: function transform(call) {
                    call.size = { width: 960, height: 760 };
                    call.params.display = "popup";
                    return call;
                  },
                },

                share_referral: {
                  size: { width: 482, height: 725 },
                },
              };

              var _dialogStates = {};

              var _oauthDialogRequestCount = 0;

              function _trackRunState(cb, id) {
                _dialogStates[id] = true;
                return function (response) {
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

                _oauthMethodNameSet: new Set([
                  "permissions.oauth",
                  "permissions.request",
                  "permissions.ig_oauth",
                ]),

                _loadedNodes: {},
                _defaultCb: {},
                _resultToken: '"xxRESULTTOKENxx"',
                _popupInterval: null,

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
                          "parent.parent",
                        ),
                      },
                      true,
                    );
                  }

                  return call;
                },

                isOAuth: function isOAuth(params) {
                  return (
                    UIServer._oauthMethodNameSet.has(params.method) ||
                    params.method == "oauth"
                  );
                },

                checkOauthDisplay: function checkOauthDisplay(params) {
                  var scope =
                    params.scope ||
                    params.perms ||
                    importDefault("sdk.Runtime").getScope();
                  if (!scope) {
                    return params.display;
                  }
                  return "popup";
                },

                prepareCall: function prepareCall(params, cb) {
                  var name = params.method.toLowerCase();
                  var method = Object.prototype.hasOwnProperty.call(
                    UIServer.Methods,
                    name,
                  )
                    ? babelHelpers["extends"]({}, UIServer.Methods[name])
                    : {};
                  var id = params.id || importDefault("guid")();
                  var useSSL = true;

                  ES("Object", "assign", false, params, {
                    app_id: importDefault("sdk.Runtime").getClientID(),
                    locale: importDefault("sdk.Runtime").getLocale(),
                    sdk: "joey",

                    access_token:
                      (useSSL &&
                        importDefault("sdk.Runtime").getAccessToken()) ||
                      undefined,
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
                      ((_feature = importDefault("sdk.feature")(
                        "max_oauth_dialog_retries",
                        100,
                      )) != null
                        ? _feature
                        : 100)
                    ) {
                      importNamespace("Log").error(
                        "Your request to oauth has exceeded the rate limit, please try again later",
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
                    importDefault("sdk.Runtime").getIsVersioned() &&
                    method.url.substring(0, 7) === "dialog/"
                  ) {
                    var version =
                      params.version ||
                      importDefault("sdk.Runtime").getVersion();
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
                      importNamespace("Log").warn(errorMessage);
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
                      importNamespace("UrlMap").resolve(
                        params.fx_app === "instagram" ||
                          params.fx_app === "ig_single"
                          ? "www_instagram"
                          : params.display == "touch"
                            ? "m"
                            : "www",
                      ) +
                      "/" +
                      method.url,
                    params: params,
                    name: name,
                    dialog: importDefault("sdk.Dialog").newInstance(
                      id,
                      params.display,
                    ),
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
                      true,
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
                          relation === "parent" ? "parent.parent" : "opener",
                        ),
                      },
                      true,
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
                    importDefault("sdk.Runtime").getKidDirectedSite() ||
                    call.params.kid_directed_site;

                  call.params = importDefault("flattenObject")(call.params);
                  var encodedQS = importDefault("QueryString").encode(
                    call.params,
                  );

                  if (
                    !importDefault("sdk.UA").nativeApp() &&
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
                    importDefault("sdk.UA").ie() != null &&
                    importDefault("sdk.UA").ie() <= 8 &&
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
                    importDefault("sdk.Runtime").isEnvironment(
                      importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                    ) ||
                    importDefault("sdk.Runtime").isEnvironment(
                      importDefault("sdk.Runtime").ENVIRONMENTS.PAGETAB,
                    );
                  if (canvas) {
                    if (
                      importNamespace("sdk.modFeatureCheck").forIDs(
                        "force_popup_to_canvas_apps_with_id",
                        [importDefault("sdk.Runtime").getClientID()],
                      ) ||
                      importDefault("sdk.feature")(
                        "force_popup_to_all_canvas_app",
                        false,
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
                    importDefault("sdk.UA").mobile() ||
                    params.display === "touch"
                  ) {
                    return "touch";
                  }

                  if (
                    params.display == "iframe" ||
                    params.display == "dialog"
                  ) {
                    if (!UIServer.canIframe(params)) {
                      importNamespace("Log").error(
                        '"dialog" mode can only be used when the user is connected.',
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
                  return importDefault("sdk.Runtime").getAccessToken();
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
                  var popup = importNamespace("sdk.Popup").popup(
                    call,
                    UIServer.isOAuth({ method: call.name }),
                  );
                  if (popup) {
                    UIServer.setLoadedNode(call, popup, "popup");

                    if (call.id in UIServer._defaultCb) {
                      UIServer._popupMonitor();
                    }
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
                    params: call.params,
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
                  call.root = importNamespace("sdk.Content").appendHidden(
                    document.createElement("div"),
                  );
                  UIServer._insertIframe(call);
                },

                iframe: function iframe(call) {
                  call.className = "FB_UI_Dialog";

                  var onClose = function onClose() {
                    var errorResult = ES("JSON", "stringify", false, {
                      error_code: 4201,
                      error_message: importDefault("sdk.fbt")._(
                        "User canceled the Dialog flow",
                      ),
                    });
                    UIServer._triggerDefault(call.id, errorResult);
                  };

                  var dialogOptions = {
                    onClose: onClose,
                    closeIcon:
                      call.closeIcon === undefined ? true : call.closeIcon,
                    classes: importDefault("sdk.Dialog").isTabletStyle()
                      ? "centered"
                      : "",
                  };

                  call.root = importDefault("sdk.Dialog").create(dialogOptions);
                  if (!call.hideLoader) {
                    importDefault("sdk.Dialog").showLoader(
                      onClose,
                      call.size.width,
                    );
                  }
                  importNamespace("sdk.DOM").addCss(
                    call.root,
                    "fb_dialog_iframe",
                  );
                  UIServer._insertIframe(call);
                },

                touch: function touch(call) {
                  if (call.params && call.params.in_iframe) {
                    if (call.ui_created) {
                      importDefault("sdk.Dialog").showLoader(
                        function Dialog_showLoader_$0() {
                          UIServer._triggerDefault(call.id, null);
                        },
                        0,
                      );
                    } else {
                      UIServer.iframe(call);
                    }
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

                  call.params.is_canvas =
                    importDefault("sdk.Runtime").isCanvasEnvironment();

                  var handler = function handler(response) {
                    var result = response.result;

                    if (result && result.e2e) {
                      var dialog = importDefault("sdk.Dialog").get(call.id);
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
                    importNamespace("sdk.Extensions").remote.showDialog(
                      call.params,
                      handler,
                    );
                  } else {
                    importDefault("sdk.RPC").remote.showDialog(
                      call.params,
                      handler,
                    );
                  }
                },
                native: function native(call) {
                  importDefault("sdk.openMessenger")(call.params);
                },

                getDefaultSize: function getDefaultSize() {
                  return importDefault("sdk.Dialog").getDefaultSize();
                },

                _insertIframe: function _insertIframe(call) {
                  UIServer._loadedNodes[call.id] = false;
                  var activate = function activate(node) {
                    if (call.id in UIServer._loadedNodes) {
                      UIServer.setLoadedNode(call, node, "iframe");
                    }
                  };

                  if (call.post) {
                    importDefault("insertIframe")({
                      url: "about:blank",
                      root: call.root,
                      className: call.className,
                      width: call.size.width,
                      height: call.size.height,
                      id: call.id,
                      onInsert: activate,
                      onload: function onload(node) {
                        importNamespace("sdk.Content").submitToTarget({
                          url: call.url,
                          target: node.name,
                          params: call.params,
                        });
                      },
                    });
                  } else {
                    importDefault("insertIframe")({
                      url: call.url,
                      root: call.root,
                      className: call.className,
                      width: call.size.width,
                      height: call.size.height,
                      id: call.id,
                      name: call.frameName,
                      onInsert: activate,
                    });
                  }
                },

                _handleResizeMessage: function _handleResizeMessage(
                  frame,
                  data,
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

                  importDefault("sdk.XD").inform(
                    "resize.ack",
                    data || {},
                    "parent.frames[" + node.name + "]",
                  );

                  if (!importDefault("sdk.Dialog").isActive(node)) {
                    importDefault("sdk.Dialog").show(node);
                  } else {
                    importDefault("sdk.Dialog")._centerActive();
                  }
                },

                _triggerDefault: function _triggerDefault(id, result) {
                  var data = { frame: id, result: "" };
                  if (result) {
                    data.result = result;
                  }
                  UIServer._xdRecv(
                    data,
                    UIServer._defaultCb[id] || function () {},
                  );
                },

                _popupMonitor: function _popupMonitor() {
                  var found;
                  var _loop = function _loop() {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        UIServer._loadedNodes,
                        id,
                      ) &&
                      id in UIServer._defaultCb
                    ) {
                      var node = UIServer._loadedNodes[id];
                      if (node.type != "popup" && node.type != "native") {
                        return 1;
                      }
                      var win = node.node;

                      try {
                        if (win.closed) {
                          if (UIServer.isOAuth(node)) {
                            importDefault(
                              "sdk.Auth.LoginStatus",
                            ).getLoginStatus(
                              function LoginStatus_getLoginStatus_$0(response) {
                                if (
                                  (response == null
                                    ? void 0
                                    : response.status) === "connected" &&
                                  node.params != null &&
                                  node.params.return_scopes
                                ) {
                                  importDefault("sdk.api")(
                                    "/me/permissions",
                                    function api_$1(scopesResponse) {
                                      if (
                                        !scopesResponse ||
                                        scopesResponse.error
                                      ) {
                                        UIServer._triggerDefault(id, response);
                                      }
                                      var grantedScopesString = "";
                                      var scopeResponse =
                                        scopesResponse && scopesResponse.data
                                          ? scopesResponse.data
                                          : [];

                                      for (
                                        var i = 0;
                                        i < scopeResponse.length;
                                        i++
                                      ) {
                                        if (
                                          scopeResponse[i].status === "granted"
                                        ) {
                                          if (grantedScopesString !== "") {
                                            grantedScopesString += ",";
                                          }
                                          grantedScopesString +=
                                            scopeResponse[i].permission;
                                        }
                                      }
                                      if (
                                        response.authResponse &&
                                        response.authResponse.grantedScopes
                                      ) {
                                        response.authResponse.grantedScopes =
                                          grantedScopesString;
                                      }
                                      UIServer._triggerDefault(id, response);
                                    },
                                  );
                                } else {
                                  if (
                                    (response == null
                                      ? void 0
                                      : response.status) !== "connected"
                                  ) {
                                    response.closeWindow = true;
                                  }
                                  UIServer._triggerDefault(id, response);
                                }
                              },
                              true,
                            );
                          } else {
                            UIServer._triggerDefault(id, null);
                          }
                        } else {
                          found = true;
                        }
                      } catch (_unused) {}
                    }
                  };
                  for (var id in UIServer._loadedNodes) {
                    if (_loop()) continue;
                  }

                  if (found && !UIServer._popupInterval) {
                    UIServer._popupInterval = window.setInterval(
                      UIServer._popupMonitor,
                      100,
                    );
                  } else if (!found && UIServer._popupInterval) {
                    window.clearInterval(UIServer._popupInterval);
                    UIServer._popupInterval = null;
                  }
                },

                _xdChannelHandler: function _xdChannelHandler(frame, relation) {
                  return importDefault("sdk.XD").handler(
                    function XD_handler_$0(data) {
                      var node = UIServer.getLoadedNode(frame);
                      if (!node) {
                        return;
                      }

                      if (data.type == "resize") {
                        UIServer._handleResizeMessage(frame, data);
                      } else if (data.type == "hide") {
                        importDefault("sdk.Dialog").hide(node);
                      } else if (data.type == "rendered") {
                        var root = importDefault("sdk.Dialog")._findRoot(node);

                        importDefault("sdk.Dialog").show(root);
                      } else if (data.type == "fireevent") {
                        importNamespace("sdk.Event").fire(data.event, data);
                      }
                    },
                    relation,
                    true,
                    null,
                  );
                },

                _xdNextHandler: function _xdNextHandler(
                  cb,
                  frame,
                  relation,
                  isDefault,
                ) {
                  if (isDefault) {
                    UIServer._defaultCb[frame] = cb;
                  }

                  return (
                    importDefault("sdk.XD").handler(function XD_handler_$0(
                      data,
                    ) {
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
                        importNamespace("sdk.DOM").containsCss(
                          frame,
                          "FB_UI_Hidden",
                        )
                      ) {
                        window.setTimeout(function window_setTimeout_$0() {
                          frame.parentNode.parentNode.removeChild(
                            frame.parentNode,
                          );
                        }, 3000);
                      } else if (
                        importNamespace("sdk.DOM").containsCss(
                          frame,
                          "FB_UI_Dialog",
                        )
                      ) {
                        importDefault("sdk.Dialog").remove(frame);
                      }
                    }
                  }

                  delete UIServer._loadedNodes[data.frame];
                  delete UIServer._defaultCb[data.frame];

                  if (data.e2e) {
                    var dialog = importDefault("sdk.Dialog").get(data.frame);
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
                              ES("JSON", "parse", false, params.result),
                          );
                      },
                      frame,
                      target,
                      isDefault,
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
                  requestParams,
                ) {
                  return UIServer._xdNextHandler(
                    importDefault("sdk.Auth").xdResponseWrapper(
                      cb,
                      authResponse,
                      method,
                      requestParams,
                    ),
                    frame,
                    target,
                    isDefault,
                  );
                },

                xdHandlerPhotoPicker: function xdHandlerPhotoPicker(
                  cb,
                  frame,
                  target,
                  _method,
                  _requestParams,
                ) {
                  return UIServer._xdNextHandler(
                    UIServer.xdResponseWrapperPhotoPicker(cb),
                    frame,
                    target,
                    false,
                  );
                },

                xdResponseWrapperPhotoPicker:
                  function xdResponseWrapperPhotoPicker(cb) {
                    return function (params) {
                      var response;
                      if (
                        params &&
                        params.result &&
                        params.result.closeWindow
                      ) {
                        response =
                          "Photo picker call was cancelled by the user";
                      } else {
                        response = params.photos;
                      }
                      if (cb) {
                        cb(response);
                      }
                      return null;
                    };
                  },
              };

              importNamespace("sdk.Extensions").stub("showDialog");
              importDefault("sdk.RPC").stub("showDialog");
              var _default = UIServer;
              exports["default"] = _default;
            },
            226,
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
              "sdk.feature",
            ],
            function $module_sdk_ui(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function ui(params, cb) {
                importDefault("Assert").isObject(params);
                importDefault("Assert").maybeFunction(cb);

                if (importDefault("sdk.Runtime").getIsVersioned()) {
                  importNamespace(
                    "sdk.PlatformVersioning",
                  ).assertVersionIsSet();
                  if (params.version) {
                    importNamespace(
                      "sdk.PlatformVersioning",
                    ).assertValidVersion(params.version);
                  } else {
                    params.version = importDefault("sdk.Runtime").getVersion();
                  }
                }

                params = babelHelpers["extends"]({}, params);
                if (!params.method) {
                  importNamespace("Log").error(
                    '"method" is a required parameter for FB.ui().',
                  );
                  return null;
                }

                if (params.method == "pay.prompt") {
                  params.method = "pay";
                }

                var method = params.method;

                if (params.redirect_uri) {
                  importNamespace("Log").warn(
                    "When using FB.ui, you should not specify a redirect_uri.",
                  );
                  delete params.redirect_uri;
                }

                if (!params.fallback_redirect_uri) {
                  params.fallback_redirect_uri = document.location.href;
                }

                if (
                  importDefault("sdk.UIServer").isOAuth(method) &&
                  (params.display == "iframe" || params.display == "dialog")
                ) {
                  params.display =
                    importDefault("sdk.UIServer").checkOauthDisplay(params);
                }

                if (params.display === "native" && method !== "send") {
                  importNamespace("Log").error(
                    'display type "native" not supported',
                  );
                  return null;
                }

                var enableE2E = importDefault("sdk.feature")(
                  "e2e_tracking",
                  true,
                );
                if (enableE2E) {
                  params.e2e = {};
                }
                var call = importDefault("sdk.UIServer").prepareCall(
                  params,
                  cb || function () {},
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

                var displayFn = importDefault("sdk.UIServer")[displayName];
                if (!displayFn) {
                  importNamespace("Log").error(
                    '"display" must be one of "popup", ' +
                      '"dialog", "iframe", "touch", "async", "hidden", or "none"',
                  );
                  return null;
                }

                if (enableE2E) {
                  call.dialog.subscribe(
                    "e2e:end",
                    function call_dialog_subscribe_$1(events) {
                      events.method = method;
                      events.display = displayName;
                      importNamespace("Log").debug(
                        "e2e: %s",
                        ES("JSON", "stringify", false, events),
                      );

                      importNamespace("sdk.Impressions").log(114, {
                        payload: events,
                      });
                    },
                  );
                }
                displayFn(call);
                return call.dialog;
              }
              exports["default"] = ui;
            },
            98,
          );
          __d(
            "sdk.Auth-public",
            [
              "FB",
              "sdk.Auth",
              "sdk.Auth.LoginStatus",
              "sdk.AuthUtils",
              "sdk.Event",
              "sdk.Runtime",
              "sdk.ui",
              "sdk.warnInsecure",
            ],
            function $module_sdk_Auth_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function init() {
                var _importNamespace_sdkEvent;
                var _importDefault_sdkAuth;
                importDefault("FB").provide("", {
                  getLoginStatus: function getLoginStatus() {
                    importDefault("sdk.warnInsecure")("getLoginStatus");
                    return importDefault(
                      "sdk.Auth.LoginStatus",
                    ).getLoginStatus.apply(
                      importDefault("sdk.Auth"),
                      arguments,
                    );
                  },

                  getAuthResponse: function getAuthResponse() {
                    importDefault("sdk.warnInsecure")("getAuthResponse");
                    return importDefault("sdk.Auth").getAuthResponse();
                  },

                  getAccessToken: function getAccessToken() {
                    importDefault("sdk.warnInsecure")("getAccessToken");
                    return (
                      importDefault("sdk.Runtime").getAccessToken() || null
                    );
                  },

                  getUserID: function getUserID() {
                    importDefault("sdk.warnInsecure")("getUserID");
                    return (
                      importDefault("sdk.Runtime").getUserID() ||
                      importDefault("sdk.Runtime").getCookieUserID()
                    );
                  },

                  login: function login(cb, opts) {
                    importDefault("sdk.warnInsecure")("login");
                    importDefault("sdk.Auth").login(cb, opts);
                  },

                  logout: function logout(cb) {
                    importDefault("sdk.ui")(
                      { method: "auth.logout", display: "hidden" },
                      cb,
                    );
                  },
                });

                (_importDefault_sdkAuth = importDefault("sdk.Auth")).subscribe(
                  "logout",
                  ES(
                    (_importNamespace_sdkEvent = importNamespace("sdk.Event"))
                      .fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.logout",
                  ),
                );

                _importDefault_sdkAuth.subscribe(
                  "login",
                  ES(
                    _importNamespace_sdkEvent.fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.login",
                  ),
                );
                _importDefault_sdkAuth.subscribe(
                  "authresponse.change",
                  ES(
                    _importNamespace_sdkEvent.fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.authResponseChange",
                  ),
                );

                _importDefault_sdkAuth.subscribe(
                  "status.change",
                  ES(
                    _importNamespace_sdkEvent.fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.statusChange",
                  ),
                );

                _importDefault_sdkAuth.subscribe(
                  "loginDenied",
                  ES(
                    _importNamespace_sdkEvent.fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.denied",
                  ),
                );

                _importDefault_sdkAuth.subscribe(
                  "loginError",
                  ES(
                    _importNamespace_sdkEvent.fire,
                    "bind",
                    true,
                    _importNamespace_sdkEvent,
                    "auth.error",
                  ),
                );

                importDefault("sdk.Runtime").subscribe(
                  "AccessToken.change",
                  function Runtime_subscribe_$1(value) {
                    if (
                      !value &&
                      importDefault("sdk.Runtime").getLoginStatus() ===
                        "connected"
                    ) {
                      importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                        null,
                        true,
                      );
                    }
                  },
                );

                importNamespace("sdk.AuthUtils").AuthInternalEvent.subscribe(
                  importNamespace("sdk.AuthUtils").AuthConstants
                    .REVALIDATE_TIMER_TIMEOUT,
                  function AuthInternalEvent_subscribe_$1(_response) {
                    importDefault("sdk.Auth.LoginStatus").fetchLoginStatus(
                      function LoginStatus_fetchLoginStatus_$0() {},
                    );
                  },
                );

                _importNamespace_sdkEvent.subscribe(
                  "init:post",
                  function Event_subscribe_$1(options) {
                    importDefault("sdk.Auth.LoginStatus").onSDKInit(options);
                  },
                );
              }

              var SDKAuth = { init: init };
              var _default = SDKAuth;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Canvas.IframeHandling",
            ["DOMWrapper", "sdk.RPC"],
            function $module_sdk_Canvas_IframeHandling(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var autoGrowTimer = null;
              var autoGrowLastSize;

              function getHeight() {
                var document =
                  importNamespace("DOMWrapper").getWindow().document;

                var body = document.body;

                var docElement = document.documentElement;
                var bodyTop = Math.max(body.offsetTop, 0);
                var docTop = Math.max(docElement.offsetTop, 0);
                var bodyScroll = body.scrollHeight + bodyTop;
                var bodyOffset = body.offsetHeight + bodyTop;
                var docScroll = docElement.scrollHeight + docTop;
                var docOffset = docElement.offsetHeight + docTop;

                return Math.max(bodyScroll, bodyOffset, docScroll, docOffset);
              }

              function setSize(params) {
                if (typeof params !== "object") {
                  params = {};
                }
                var minShrink = 0;
                var minGrow = 0;
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
                importDefault("sdk.RPC").remote.setSize(params);
                return true;
              }

              function setAutoGrow(on, interval) {
                if (interval === undefined && typeof on === "number") {
                  interval = on;
                  on = true;
                }

                if (on || on === undefined) {
                  if (autoGrowTimer === null) {
                    autoGrowTimer = window.setInterval(
                      function window_setInterval_$0() {
                        setSize();
                      },
                      interval || 100,
                    );
                  }
                  setSize();
                } else {
                  if (autoGrowTimer !== null) {
                    window.clearInterval(autoGrowTimer);
                    autoGrowTimer = null;
                  }
                }
              }

              importDefault("sdk.RPC").stub("setSize");

              var IframeHandling = {
                setSize: setSize,
                setAutoGrow: setAutoGrow,
              };
              var _default = IframeHandling;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
              function setUrlHandler(callback) {
                require("sdk.RPC").local.navigate = function (path) {
                  callback({ path: path });
                };
                require("sdk.RPC").remote.setNavigationEnabled(true);
              }

              require("sdk.RPC").stub("setNavigationEnabled");

              var Navigation = {
                setUrlHandler: setUrlHandler,
              };
              var _default = Navigation;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "sdk.Canvas.Plugin",
            ["Log", "sdk.Runtime", "sdk.UA", "sdk.api"],
            function $module_sdk_Canvas_Plugin(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var flashClassID = "CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000";
              var unityClassID = "CLSID:444785F1-DE89-4295-863A-D46C3A781394";
              var devHidePluginCallback = null;

              var osx =
                importDefault("sdk.UA").osx() &&
                importDefault("sdk.UA").osx.getVersionParts();
              var unityNeedsToBeHidden = !(
                osx &&
                osx[0] > 10 &&
                osx[1] > 10 &&
                (importDefault("sdk.UA").chrome() >= 31 ||
                  importDefault("sdk.UA").webkit() >= 537.71 ||
                  importDefault("sdk.UA").firefox() >= 25)
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
                  window.document.getElementsByTagName("object"),
                );

                candidates = candidates.concat(
                  ES(
                    "Array",
                    "from",
                    false,
                    window.document.getElementsByTagName("embed"),
                  ),
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
                    importNamespace("Log").info(
                      "Calling developer specified callback",
                    );

                    var devArgs = { state: params.state, elem: elem };
                    devHidePluginCallback(devArgs);
                    window.setTimeout(visibilityToggleCb, 200);
                  } else {
                    visibilityToggleCb();
                  }
                });

                if (Math.random() <= 1 / 1000) {
                  var opts = {
                    unity: unityPresent,
                    flash: flashPresent,
                  };
                  importDefault("sdk.api")(
                    importDefault("sdk.Runtime").getClientID() +
                      "/occludespopups",
                    "post",
                    opts,
                  );
                }
              }

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
                  callback,
                ) {
                  devHidePluginCallback = callback;
                },

                hidePluginCallback: hidePluginCallback,
                hidePluginElement: hidePluginElement,
                showPluginElement: showPluginElement,
              };
              var _default = Plugin;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Canvas.Prefetcher",
            ["JSSDKCanvasPrefetcherConfig", "sdk.Runtime", "sdk.api"],
            function $module_sdk_Canvas_Prefetcher(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _CanvasPrefetcherConf;

              var COLLECT = {
                AUTOMATIC: 0,
                MANUAL: 1,
              };

              var excludedAppIds =
                (_CanvasPrefetcherConf = importNamespace(
                  "JSSDKCanvasPrefetcherConfig",
                ).excludedAppIds) != null
                  ? _CanvasPrefetcherConf
                  : [];
              var collectionMode = COLLECT.AUTOMATIC;
              var links = [];

              function sample() {
                var resourceFieldsByTag = {
                  object: "data",
                  link: "href",
                  script: "src",
                };

                if (collectionMode == COLLECT.AUTOMATIC) {
                  Object.keys(resourceFieldsByTag).forEach(
                    function forEach_$0(tagName) {
                      var propertyName = resourceFieldsByTag[tagName];
                      ES(
                        "Array",
                        "from",
                        false,
                        document.getElementsByTagName(tagName),
                      ).forEach(function forEach_$0(tag) {
                        if (tag[propertyName]) {
                          links.push(tag[propertyName]);
                        }
                      });
                    },
                  );
                }

                if (links.length === 0) {
                  return;
                }

                importDefault("sdk.api")(
                  importDefault("sdk.Runtime").getClientID() +
                    "/staticresources",
                  "post",
                  {
                    urls: ES("JSON", "stringify", false, links),
                    is_https: location.protocol === "https:",
                  },
                );

                links = [];
              }

              function maybeSample() {
                if (
                  !importDefault("sdk.Runtime").isEnvironment(
                    importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                  ) ||
                  !importDefault("sdk.Runtime").getClientID() ||
                  !importNamespace("JSSDKCanvasPrefetcherConfig").sampleRate
                ) {
                  return;
                }

                if (
                  Math.random() >=
                    1 /
                      importNamespace("JSSDKCanvasPrefetcherConfig")
                        .sampleRate ||
                  !importNamespace("JSSDKCanvasPrefetcherConfig").enabled ||
                  ES(
                    excludedAppIds,
                    "includes",
                    true,
                    importDefault("sdk.Runtime").getClientID(),
                  )
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

                _maybeSample: maybeSample,
              };
              var _default = CanvasPrefetcher;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Canvas.Tti",
            ["sdk.RPC", "sdk.Runtime"],
            function $module_sdk_Canvas_Tti(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function passAppTtiMessage(callback, messageName) {
                var params = {
                  appId: importDefault("sdk.Runtime").getClientID(),
                  time: Date.now(),
                  name: messageName,
                };

                var args = [params];
                if (callback) {
                  args.push(function args_push_$0(response) {
                    callback(response.result);
                  });
                }

                importDefault("sdk.RPC").remote.logTtiMessage.apply(null, args);
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

              importDefault("sdk.RPC").stub("logTtiMessage");

              var Tti = {
                setDoneLoading: setDoneLoading,
                startTimer: startTimer,
                stopTimer: stopTimer,
              };
              var _default = Tti;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Canvas-public",
            [
              "Assert",
              "FB",
              "Log",
              "sdk.Canvas.Environment",
              "sdk.Canvas.IframeHandling",
              "sdk.Canvas.Navigation",
              "sdk.Canvas.Plugin",
              "sdk.Canvas.Prefetcher",
              "sdk.Canvas.Tti",
              "sdk.Event",
              "sdk.RPC",
              "sdk.Runtime",
            ],
            function $module_sdk_Canvas_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function init() {
                importDefault("FB").provide("Canvas", {
                  setSize: function setSize(params) {
                    importDefault("Assert").maybeObject(
                      params,
                      "Invalid argument",
                    );
                    return importDefault(
                      "sdk.Canvas.IframeHandling",
                    ).setSize.apply(null, arguments);
                  },

                  setAutoGrow: function setAutoGrow() {
                    return importDefault(
                      "sdk.Canvas.IframeHandling",
                    ).setAutoGrow.apply(null, arguments);
                  },

                  getPageInfo: function getPageInfo(callback) {
                    importDefault("Assert").isFunction(
                      callback,
                      "Invalid argument",
                    );
                    return importDefault(
                      "sdk.Canvas.Environment",
                    ).getPageInfo.apply(null, arguments);
                  },

                  scrollTo: function scrollTo(x, y) {
                    importDefault("Assert").maybeNumber(x, "Invalid argument");
                    importDefault("Assert").maybeNumber(y, "Invalid argument");
                    return importDefault(
                      "sdk.Canvas.Environment",
                    ).scrollTo.apply(null, arguments);
                  },

                  setDoneLoading: function setDoneLoading(callback) {
                    importDefault("Assert").maybeFunction(
                      callback,
                      "Invalid argument",
                    );
                    return importDefault("sdk.Canvas.Tti").setDoneLoading.apply(
                      null,
                      arguments,
                    );
                  },

                  startTimer: function startTimer() {
                    return importDefault("sdk.Canvas.Tti").startTimer.apply(
                      null,
                      arguments,
                    );
                  },

                  stopTimer: function stopTimer(callback) {
                    importDefault("Assert").maybeFunction(
                      callback,
                      "Invalid argument",
                    );
                    return importDefault("sdk.Canvas.Tti").stopTimer.apply(
                      null,
                      arguments,
                    );
                  },

                  setUrlHandler: function setUrlHandler(callback) {
                    importDefault("Assert").isFunction(
                      callback,
                      "Invalid argument",
                    );
                    return importDefault(
                      "sdk.Canvas.Navigation",
                    ).setUrlHandler.apply(null, arguments);
                  },
                });

                importDefault("sdk.RPC").local.fireEvent = ES(
                  importNamespace("sdk.Event").fire,
                  "bind",
                  true,
                  importNamespace("sdk.Event"),
                );

                importNamespace("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1(options) {
                    if (
                      importDefault("sdk.Runtime").isEnvironment(
                        importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                      )
                    ) {
                      importDefault("Assert").isTrue(
                        !options.hideFlashCallback ||
                          !options.hidePluginCallback,
                        "cannot specify deprecated hideFlashCallback and new hidePluginCallback",
                      );
                      importDefault("sdk.Canvas.Plugin")._setHidePluginCallback(
                        options.hidePluginCallback || options.hideFlashCallback,
                      );
                    }
                  },
                );
              }

              function initRPC() {
                var _importDefault_sdkRPC;

                (_importDefault_sdkRPC =
                  importDefault("sdk.RPC")).local.hidePluginObjects =
                  function () {
                    importNamespace("Log").info("hidePluginObjects called");
                    importDefault("sdk.Canvas.Plugin").hidePluginCallback({
                      state: "opened",
                    });
                  };
                _importDefault_sdkRPC.local.showPluginObjects = function () {
                  importNamespace("Log").info("showPluginObjects called");
                  importDefault("sdk.Canvas.Plugin").hidePluginCallback({
                    state: "closed",
                  });
                };

                _importDefault_sdkRPC.local.showFlashObjects =
                  _importDefault_sdkRPC.local.showPluginObjects;
                _importDefault_sdkRPC.local.hideFlashObjects =
                  _importDefault_sdkRPC.local.hidePluginObjects;
              }

              function initCanvasPlugin() {
                initRPC();
                importDefault("FB").provide(
                  "Canvas.Plugin",
                  importDefault("sdk.Canvas.Plugin"),
                );
              }

              function initCanvasPrefetcher() {
                importDefault("FB").provide(
                  "Canvas.Prefetcher",
                  importDefault("sdk.Canvas.Prefetcher"),
                );

                importNamespace("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1(_options) {
                    if (
                      importDefault("sdk.Runtime").isEnvironment(
                        importDefault("sdk.Runtime").ENVIRONMENTS.CANVAS,
                      )
                    ) {
                      importDefault("sdk.Canvas.Prefetcher")._maybeSample();
                    }
                  },
                );
              }

              function initCanvasPresence() {
                var _s = $RefreshSig$(),
                  _s2 = $RefreshSig$();
                var _importNamespace_sdkEvent;
                (_importNamespace_sdkEvent =
                  importNamespace("sdk.Event")).subscribe(
                  _importNamespace_sdkEvent.SUBSCRIBE,
                  subscriptionAdded,
                );
                _importNamespace_sdkEvent.subscribe(
                  _importNamespace_sdkEvent.UNSUBSCRIBE,
                  subscriptionRemoved,
                );

                importDefault("sdk.RPC").stub("useFriendsOnline");
                function subscriptionAdded(name, callbacks) {
                  _s();
                  if (name != "canvas.friendsOnlineUpdated") {
                    return;
                  }
                  if (callbacks.length === 1) {
                    importDefault("sdk.RPC").remote.useFriendsOnline(true);
                  }
                }
                _s(subscriptionAdded, "G0wvazfjIhF4NZAVPKeup5g085k=", true);

                function subscriptionRemoved(name, callbacks) {
                  _s2();
                  if (name != "canvas.friendsOnlineUpdated") {
                    return;
                  }
                  if (callbacks.length === 0) {
                    importDefault("sdk.RPC").remote.useFriendsOnline(false);
                  }
                }
                _s2(subscriptionRemoved, "G0wvazfjIhF4NZAVPKeup5g085k=", true);
              }
              var SDKCanvas = {
                init: init,
                initCanvasPlugin: initCanvasPlugin,
                initCanvasPrefetcher: initCanvasPrefetcher,
                initCanvasPresence: initCanvasPresence,
                initRPC: initRPC,
              };
              var _default = SDKCanvas;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Event-public",
            ["FB", "Log", "sdk.Event"],
            function $module_sdk_Event_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function init() {
                var warn = function warn(name) {
                  return importNamespace("Log").error(
                    "FB.Event." + name + "() has been deprecated",
                  );
                };

                importDefault("FB").provide("Event", {
                  subscribe: function subscribe(name, cb) {
                    return importNamespace("sdk.Event").subscribe(name, cb);
                  },

                  unsubscribe: ES(
                    importNamespace("sdk.Event").unsubscribe,
                    "bind",
                    true,
                    importNamespace("sdk.Event"),
                  ),

                  clear: ES(warn, "bind", true, null, "clear"),

                  fire: ES(warn, "bind", true, null, "fire"),
                });
              }

              var SDKEvent = { init: init };
              var _default = SDKEvent;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Frictionless-public",
            ["FB", "sdk.Event", "sdk.Frictionless"],
            function $module_sdk_Frictionless_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function init() {
                importNamespace("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1(options) {
                    if (options.frictionlessRequests) {
                      importDefault("sdk.Frictionless").init();
                    }
                  },
                );
                importDefault("FB").provide(
                  "Frictionless",
                  importDefault("sdk.Frictionless"),
                );
              }

              var SDKFrictionless = { init: init };
              var _default = SDKFrictionless;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.GamingServices",
            ["sdk.api", "sdk.ui"],
            function $module_sdk_GamingServices(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function friendFinder(cb) {
                importDefault("sdk.ui")(
                  {
                    display: "touch",
                    method: "gaming_friendfinder",
                  },
                  cb,
                );
              }

              function uploadImageToMediaLibrary(
                imageUri,
                caption,
                shouldOpenMediaDialog,
                cb,
              ) {
                importDefault("sdk.api")(
                  "me/photos",
                  "POST",
                  {
                    caption: caption,
                    url: imageUri,
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
                      importDefault("sdk.ui")(
                        {
                          display: "touch",
                          method: "gaming_media_library",
                          media_id: upload_id,
                        },
                        function ui_$1(_response) {
                          if (cb !== null) {
                            cb(apiResponse);
                          }
                        },
                      );
                    }
                  },
                );
              }

              var GamingServices = {
                friendFinder: friendFinder,
                uploadImageToMediaLibrary: uploadImageToMediaLibrary,
              };
              var _default = GamingServices;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.GamingServices-public",
            ["FB", "sdk.GamingServices"],
            function $module_sdk_GamingServices_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function init() {
                importDefault("FB").provide("", {
                  gamingservices: importDefault("sdk.GamingServices"),
                });
              }

              var SDKGamingServices = { init: init };
              var _default = SDKGamingServices;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.PluginUtils",
            ["resolveURI", "sdk.Event"],
            function $module_sdk_PluginUtils(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
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
                  return importDefault("resolveURI")(value);
                },
                url_maybe: function url_maybe(value) {
                  return value != null && value !== ""
                    ? importDefault("resolveURI")(value)
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
                },
              };

              function getVal(attr, key) {
                var _ref, _ref2, _ref3, _ref4, _ref5, _attr$key;
                return (_ref =
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
                return function (msg) {
                  var message = {
                    width: msg.width,
                    height: msg.height,
                    pluginID: pluginID,
                  };
                  importNamespace("sdk.Event").fire("xfbml.resize", message);
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
                color_scheme: "string",
              };
              exports.getVal = getVal;
              exports.validate = validate;
              exports.resize = resize;
              exports.resizeBubbler = resizeBubbler;
              exports.parse = parse;
              exports.collapseIframe = collapseIframe;
              exports.baseParams = baseParams;
            },
            98,
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
              exports,
            ) {
              function isNumberLike(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
              }
              exports["default"] = isNumberLike;
            },
            66,
          );
          __d(
            "sdk.createIframe",
            ["DOMEventListener", "getBlankIframeSrc", "guid", "isNumberLike"],
            function $module_sdk_createIframe(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function createIframe(opts_arg) {
                var opts = ES("Object", "assign", false, {}, opts_arg);
                var frame;

                var name = opts.name || importDefault("guid")();

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
                  importDefault("isNumberLike")(opts_arg.width)
                ) {
                  frame.width = opts_arg.width + "px";
                }
                if (
                  opts_arg.height != null &&
                  importDefault("isNumberLike")(opts_arg.height)
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

                frame.src = importDefault("getBlankIframeSrc")();
                if (root != null) {
                  root.appendChild(frame);
                }

                if (onLoad) {
                  var onLoadListener = importNamespace("DOMEventListener").add(
                    frame,
                    "load",
                    function DOMEventListener_add_$2() {
                      onLoadListener.remove();
                      onLoad();
                    },
                  );
                }

                if (onError) {
                  var onErrorListener = importNamespace("DOMEventListener").add(
                    frame,
                    "error",
                    function DOMEventListener_add_$2() {
                      onErrorListener.remove();
                      onError();
                    },
                  );
                }

                frame.src = src;
                return frame;
              }
              exports["default"] = createIframe;
            },
            98,
          );
          __d(
            "IframePlugin",
            [
              "Log",
              "ObservableMixin",
              "QueryString",
              "Type",
              "UrlMap",
              "guid",
              "sdk.Auth.LoginStatus",
              "sdk.AuthUtils",
              "sdk.DOM",
              "sdk.Event",
              "sdk.PlatformVersioning",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.XD",
              "sdk.createIframe",
            ],
            function $module_IframePlugin(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var IframePlugin = importDefault("Type").extend(
                {
                  constructor: function constructor(elem, ns, tag, attr) {
                    var _this = this;
                    var _importNamespace_sdkPluginUtils;

                    this.parent();
                    tag = tag.replace(/-/g, "_");

                    var pluginId = (_importNamespace_sdkPluginUtils =
                      importNamespace("sdk.PluginUtils")).getVal(
                      attr,
                      "plugin_id",
                    );

                    this.subscribe(
                      "xd.resize",
                      _importNamespace_sdkPluginUtils.resizeBubbler(pluginId),
                    );

                    this.subscribe(
                      "xd.resize.flow",
                      _importNamespace_sdkPluginUtils.resizeBubbler(pluginId),
                    );

                    this.subscribe(
                      "xd.resize.flow",
                      function subscribe_$1(message) {
                        ES(
                          "Object",
                          "assign",
                          false,
                          _this._iframeOptions.root.style,
                          {
                            verticalAlign: "bottom",
                            overflow: "",
                          },
                        );
                        importNamespace("sdk.PluginUtils").resize(
                          _this._iframeOptions.root,
                          importNamespace("sdk.PluginUtils").parse(
                            message.width,
                          ),
                          importNamespace("sdk.PluginUtils").parse(
                            message.height,
                          ),
                        );

                        _this.updateLift();

                        window.clearTimeout(_this._timeoutID);
                      },
                    );

                    this.subscribe("xd.resize", function subscribe_$1(message) {
                      var _importNamespace_sdkPluginUtils;

                      ES(
                        "Object",
                        "assign",
                        false,
                        _this._iframeOptions.root.style,
                        {
                          verticalAlign: "bottom",
                          overflow: "",
                        },
                      );
                      (_importNamespace_sdkPluginUtils =
                        importNamespace("sdk.PluginUtils")).resize(
                        _this._iframeOptions.root,
                        _importNamespace_sdkPluginUtils.parse(message.width),
                        _importNamespace_sdkPluginUtils.parse(message.height),
                      );
                      _importNamespace_sdkPluginUtils.resize(
                        _this._iframe,
                        _importNamespace_sdkPluginUtils.parse(message.width),
                        _importNamespace_sdkPluginUtils.parse(message.height),
                      );

                      _this._isIframeResized = true;

                      _this.updateLift();

                      window.clearTimeout(_this._timeoutID);
                    });

                    this.subscribe(
                      "xd.resize.iframe",
                      function subscribe_$1(message) {
                        importNamespace("sdk.PluginUtils").resize(
                          _this._iframe,
                          importNamespace("sdk.PluginUtils").parse(
                            message.width,
                          ),
                          importNamespace("sdk.PluginUtils").parse(
                            message.height,
                          ),
                        );

                        _this._isIframeResized = true;

                        _this.updateLift();

                        window.clearTimeout(_this._timeoutID);
                      },
                    );

                    this.subscribe(
                      "xd.sdk_event",
                      function subscribe_$1(message) {
                        var data = ES("JSON", "parse", false, message.data);
                        data.pluginID = pluginId;
                        importNamespace("sdk.Event").fire(
                          message.event,
                          data,
                          elem,
                        );
                      },
                    );

                    var url =
                      importNamespace("UrlMap").resolve("www") +
                      "/plugins/" +
                      tag +
                      ".php?";
                    var params = {};

                    _importNamespace_sdkPluginUtils.validate(
                      this.getParams(),
                      elem,
                      attr,
                      params,
                    );
                    _importNamespace_sdkPluginUtils.validate(
                      _importNamespace_sdkPluginUtils.baseParams,
                      elem,
                      attr,
                      params,
                    );

                    ES("Object", "assign", false, params, {
                      app_id: importDefault("sdk.Runtime").getClientID(),
                      locale: importDefault("sdk.Runtime").getLocale(),
                      sdk: "joey",
                      kid_directed_site:
                        importDefault("sdk.Runtime").getKidDirectedSite(),
                      channel: importNamespace("sdk.XD").handler(
                        function XD_handler_$0(msg) {
                          if (msg != null) {
                            _this.inform("xd." + msg.type, msg);
                          }
                        },
                        "parent.parent",
                        true,
                      ),
                    });

                    if (this.shouldIgnoreWidth()) {
                      params.width = void 0;
                    }

                    params.container_width = elem.offsetWidth;

                    importNamespace("sdk.DOM").addCss(elem, "fb_iframe_widget");
                    var name = importDefault("guid")();

                    this.subscribe("xd.verify", function subscribe_$1(msg) {
                      importNamespace("sdk.XD").sendToFacebook(name, {
                        method: "xd/verify",
                        params: ES("JSON", "stringify", false, msg.token),
                      });
                    });

                    this.subscribe(
                      "xd.refreshLoginStatus",
                      function subscribe_$1() {
                        importNamespace("sdk.AuthUtils").removeLogoutState();
                        importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                          ES(_this.inform, "bind", true, _this, "login.status"),
                          true,
                        );
                      },
                    );

                    var flow = document.createElement("span");

                    ES("Object", "assign", false, flow.style, {
                      verticalAlign: "top",

                      width: params.lazy ? "1px" : "0px",

                      height: params.lazy ? "1px" : "0px",
                      overflow: "hidden",
                    });

                    this._element = elem;

                    this._ns = ns;

                    this._tag = tag;

                    this._params = params;

                    this._config = this.getConfig();

                    this._iframeOptions = {
                      root: flow,
                      url: url + importDefault("QueryString").encode(params),
                      name: name,

                      width:
                        this._config.mobile_fullsize &&
                        importDefault("sdk.UA").mobile()
                          ? void 0
                          : params.width || 1000,

                      height: params.height || 1000,
                      style: {
                        border: "none",
                        visibility: "hidden",
                      },

                      title:
                        this._ns + ":" + this._tag + " Facebook Social Plugin",

                      testid:
                        this._ns + ":" + this._tag + " Facebook Social Plugin",

                      onload: function onload() {
                        return _this.inform("render");
                      },

                      onerror: function onerror() {
                        return importNamespace(
                          "sdk.PluginUtils",
                        ).collapseIframe(_this._iframe);
                      },

                      lazy: params.lazy,
                    };

                    if (this.isFluid() && params.width !== "auto") {
                      importNamespace("sdk.DOM").addCss(
                        this._element,
                        "fb_iframe_widget_fluid_desktop",
                      );

                      if (!params.width && this._config.full_width) {
                        this._element.style.width = "100%";

                        this._iframeOptions.root.style.width = "100%";

                        this._iframeOptions.style.width = "100%";

                        this._params.container_width =
                          this._element.offsetWidth;

                        this._iframeOptions.url =
                          url +
                          importDefault("QueryString").encode(this._params);
                      }
                    }
                  },

                  shouldIgnoreWidth: function shouldIgnoreWidth() {
                    return (
                      importDefault("sdk.UA").mobile() &&
                      this.getConfig().mobile_fullsize
                    );
                  },

                  useInlineHeightForMobile:
                    function useInlineHeightForMobile() {
                      return true;
                    },

                  process: function process() {
                    var _this2 = this;
                    if (importDefault("sdk.Runtime").getIsVersioned()) {
                      importNamespace(
                        "sdk.PlatformVersioning",
                      ).assertVersionIsSet();

                      var uri = new (importDefault("sdk.URI"))(
                        this._iframeOptions.url,
                      );

                      this._iframeOptions.url = uri
                        .setPath(
                          "/" +
                            importDefault("sdk.Runtime").getVersion() +
                            uri.getPath(),
                        )
                        .toString();
                    }

                    var params = babelHelpers["extends"]({}, this._params);
                    delete params.channel;
                    var query = importDefault("QueryString").encode(params);

                    if (
                      this._element.getAttribute("fb-iframe-plugin-query") ==
                      query
                    ) {
                      importNamespace("Log").info(
                        "Skipping render: %s:%s %s",
                        this._ns,
                        this._tag,
                        query,
                      );

                      this.inform("render");
                      return;
                    }

                    this._element.setAttribute("fb-iframe-plugin-query", query);

                    this.subscribe("render", function subscribe_$1() {
                      importNamespace("sdk.Event").fire("iframeplugin:onload");

                      _this2._iframe.style.visibility = "visible";

                      if (!_this2._isIframeResized) {
                        importNamespace("sdk.PluginUtils").collapseIframe(
                          _this2._iframe,
                        );
                      }
                    });

                    while (this._element.firstChild) {
                      this._element.removeChild(this._element.firstChild);
                    }

                    this._element.appendChild(this._iframeOptions.root);
                    var timeout = importDefault("sdk.UA").mobile() ? 120 : 45;

                    this._timeoutID = window.setTimeout(
                      function window_setTimeout_$0() {
                        importNamespace("sdk.PluginUtils").collapseIframe(
                          _this2._iframe,
                        );

                        importNamespace("Log").warn(
                          "%s:%s failed to resize in %ss",
                          _this2._ns,
                          _this2._tag,
                          timeout,
                        );
                      },
                      timeout * 1000,
                    );

                    this._iframe = importDefault("sdk.createIframe")(
                      this._iframeOptions,
                    );
                    importNamespace("sdk.Event").fire("iframeplugin:create");

                    if (
                      importDefault("sdk.UA").mobile() ||
                      params.width === "auto"
                    ) {
                      if (this.useInlineHeightForMobile()) {
                        importNamespace("sdk.DOM").addCss(
                          this._element,
                          "fb_iframe_widget_fluid",
                        );
                      }

                      if (!this._iframeOptions.width) {
                        ES("Object", "assign", false, this._element.style, {
                          display: "block",
                          width: "100%",
                          height: "auto",
                        });

                        ES(
                          "Object",
                          "assign",
                          false,
                          this._iframeOptions.root.style,
                          {
                            width: "100%",
                            height: "auto",
                          },
                        );

                        var iframeStyle = {
                          height: "auto",
                          position: "static",
                          width: "100%",
                        };

                        if (
                          importDefault("sdk.UA").iphone() ||
                          importDefault("sdk.UA").ipad()
                        ) {
                          ES("Object", "assign", false, iframeStyle, {
                            width: "220px",
                            "min-width": "100%",
                          });
                        }

                        ES(
                          "Object",
                          "assign",
                          false,
                          this._iframe.style,
                          iframeStyle,
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

                    importNamespace("sdk.DOM")[same ? "removeCss" : "addCss"](
                      this._iframe,
                      "fb_iframe_widget_lift",
                    );
                  },
                },
                importDefault("ObservableMixin"),
              );

              IframePlugin.withParams = function (params, config) {
                return IframePlugin.extend({
                  getParams: function getParams() {
                    return params;
                  },

                  getConfig: function getConfig() {
                    return config ? config : {};
                  },
                });
              };
              var _default = IframePlugin;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "PluginConfig",
            ["sdk.feature"],
            function $module_PluginConfig(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var comment_embed = {
                mobile_fullsize: true,
              };

              var messengerpreconfirmation = {
                mobile_fullsize: true,
              };
              var messengeraccountconfirmation = {
                mobile_fullsize: true,
              };
              var messengerbusinesslink = {
                mobile_fullsize: true,
              };
              var messengertoggle = {
                mobile_fullsize: true,
              };
              var post = {
                fluid: importDefault("sdk.feature")("fluid_embed", false),
                mobile_fullsize: true,
              };

              var PluginConfig = {
                comment_embed: comment_embed,
                messengerpreconfirmation: messengerpreconfirmation,
                messengeraccountconfirmation: messengeraccountconfirmation,
                messengerbusinesslink: messengerbusinesslink,
                messengertoggle: messengertoggle,
                post: post,
              };
              var _default = PluginConfig;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
              "use strict";

              var string = "string";

              var bool = "bool";
              var url = "url";
              exports.string = string;
              exports.bool = bool;
              exports.url = url;
            },
            66,
          );
          __d(
            "PluginTags",
            ["PluginAttrTypes"],
            function $module_PluginTags(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var _importNamespace_PluginAttrTypes;

              var PluginTags = {
                ad_library_spend_tracker: {
                  country: (_importNamespace_PluginAttrTypes =
                    importNamespace("PluginAttrTypes")).string,
                  time_preset: _importNamespace_PluginAttrTypes.string,
                  custom_start_date: _importNamespace_PluginAttrTypes.string,
                  custom_end_date: _importNamespace_PluginAttrTypes.string,
                  race_type: _importNamespace_PluginAttrTypes.string,
                  state: _importNamespace_PluginAttrTypes.string,
                  district: _importNamespace_PluginAttrTypes.string,
                  page_ids: _importNamespace_PluginAttrTypes.string,
                  include_vps: _importNamespace_PluginAttrTypes.bool,
                },

                comment_embed: {
                  href: _importNamespace_PluginAttrTypes.url,
                  include_parent: _importNamespace_PluginAttrTypes.bool,
                },

                composer: {
                  action_type: _importNamespace_PluginAttrTypes.string,
                  action_properties: _importNamespace_PluginAttrTypes.string,
                },

                create_event_button: {},

                group: {
                  href: _importNamespace_PluginAttrTypes.url,
                  show_social_context: _importNamespace_PluginAttrTypes.bool,
                  show_group_info: _importNamespace_PluginAttrTypes.bool,
                  show_metadata: _importNamespace_PluginAttrTypes.bool,
                },

                like: {
                  href: _importNamespace_PluginAttrTypes.url,
                  layout: _importNamespace_PluginAttrTypes.string,
                  show_faces: _importNamespace_PluginAttrTypes.bool,
                  share: _importNamespace_PluginAttrTypes.bool,
                  action: _importNamespace_PluginAttrTypes.string,

                  send: _importNamespace_PluginAttrTypes.bool,
                  size: _importNamespace_PluginAttrTypes.string,
                },

                like_box: {
                  href: _importNamespace_PluginAttrTypes.string,
                  show_faces: _importNamespace_PluginAttrTypes.bool,
                  header: _importNamespace_PluginAttrTypes.bool,
                  stream: _importNamespace_PluginAttrTypes.bool,
                  force_wall: _importNamespace_PluginAttrTypes.bool,
                  show_border: _importNamespace_PluginAttrTypes.bool,

                  id: _importNamespace_PluginAttrTypes.string,
                  connections: _importNamespace_PluginAttrTypes.string,
                  profile_id: _importNamespace_PluginAttrTypes.string,
                  name: _importNamespace_PluginAttrTypes.string,
                },

                page: {
                  href: _importNamespace_PluginAttrTypes.string,
                  hide_cta: _importNamespace_PluginAttrTypes.bool,
                  hide_cover: _importNamespace_PluginAttrTypes.bool,
                  small_header: _importNamespace_PluginAttrTypes.bool,
                  adapt_container_width: _importNamespace_PluginAttrTypes.bool,
                  show_facepile: _importNamespace_PluginAttrTypes.bool,
                  show_posts: _importNamespace_PluginAttrTypes.bool,
                  tabs: _importNamespace_PluginAttrTypes.string,
                },

                page_events: {
                  href: _importNamespace_PluginAttrTypes.url,
                },

                post: {
                  href: _importNamespace_PluginAttrTypes.url,
                  show_text: _importNamespace_PluginAttrTypes.bool,
                },

                profile_pic: {
                  uid: _importNamespace_PluginAttrTypes.string,
                  linked: _importNamespace_PluginAttrTypes.bool,
                  href: _importNamespace_PluginAttrTypes.string,
                  size: _importNamespace_PluginAttrTypes.string,
                  facebook_logo: _importNamespace_PluginAttrTypes.bool,
                },

                send_to_mobile: {
                  max_rows: _importNamespace_PluginAttrTypes.string,
                  show_faces: _importNamespace_PluginAttrTypes.bool,
                  size: _importNamespace_PluginAttrTypes.string,
                },
              };

              var aliases = {
                fan: "like_box",
                likebox: "like_box",
              };

              Object.keys(aliases).forEach(function forEach_$0(key) {
                PluginTags[key] = PluginTags[aliases[key]];
              });
              var _default = PluginTags;
              exports["default"] = _default;
            },
            98,
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
              exports,
            ) {
              function runOnce(func) {
                var hasRun = false;
                var result;

                return function () {
                  if (!hasRun) {
                    hasRun = true;
                    result = func();
                  }
                  return result;
                };
              }
              exports["default"] = runOnce;
            },
            66,
          );
          __d(
            "XFBML",
            ["Assert", "Log", "runOnce", "sdk.Observable"],
            function $module_XFBML(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var xfbml = {};
              var html5 = {};

              var parseCount = 0;

              var observable = new (importNamespace(
                "sdk.Observable",
              ).Observable)();

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
                      className,
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
                  },
                );

                return attrs;
              }

              function _parse(dom, callback, reparse) {
                importDefault("Assert").isTrue(
                  dom &&
                    dom.nodeType &&
                    dom.nodeType === 1 &&
                    !!dom.getElementsByTagName,
                  "Invalid DOM node passed to FB.XFBML.parse()",
                );
                importDefault("Assert").isFunction(
                  callback,
                  "Invalid callback passed to FB.XFBML.parse()",
                );
                if (dom == null) {
                  return;
                }

                var pc = ++parseCount;
                importNamespace("Log").info("XFBML Parsing Start %s", pc);

                var count = 1;
                var tags = 0;
                var onrender = function onrender() {
                  count--;
                  if (count === 0) {
                    importNamespace("Log").info(
                      "XFBML Parsing Finish %s, %s tags found",
                      pc,
                      tags,
                    );
                    if (callback != null) {
                      callback();
                    }
                    observable.inform("render", [pc, tags]);
                  }
                  importDefault("Assert").isTrue(
                    count >= 0,
                    "onrender() has been called too many times",
                  );
                };

                ES(
                  "Array",
                  "from",
                  false,
                  dom.getElementsByTagName("*"),
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
                    attr(element),
                  );

                  renderer.subscribe(
                    "render",
                    importDefault("runOnce")(function runOnce_$0() {
                      element.setAttribute("fb-xfbml-state", "rendered");
                      onrender();
                    }),
                  );

                  var _render = function render() {
                    if (element.getAttribute("fb-xfbml-state") == "parsed") {
                      observable.subscribe("render.queue", _render);
                    } else {
                      element.setAttribute("fb-xfbml-state", "parsed");
                      renderer.process();
                    }
                  };

                  _render();
                });

                observable.inform("parse", [pc, tags]);

                var timeout = 30000;
                window.setTimeout(function window_setTimeout_$0() {
                  if (count > 0) {
                    importNamespace("Log").warn(
                      "%s tags failed to render in %s ms",
                      count,
                      timeout,
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
                },
              );

              var XFBML = {
                registerTag: function registerTag(info) {
                  var fqn = info.xmlns + ":" + info.localName;

                  if (fqn === "fb:customerchat" && xfbml[fqn] != null) {
                    return;
                  }
                  importDefault("Assert").isUndefined(
                    xfbml[fqn],
                    fqn + " already registered",
                  );

                  xfbml[fqn] = info;

                  html5[info.xmlns + "-" + info.localName] = info;
                },

                parse: function parse(dom, cb) {
                  _parse(
                    dom != null ? dom : document.body,
                    cb != null ? cb : function () {},
                    true,
                  );
                },

                parseNew: function parseNew() {
                  _parse(document.body, function _parse_$1() {}, false);
                },
                subscribe: observable.subscribe,
                unsubscribe: observable.unsubscribe,
              };
              var _default = XFBML;
              exports["default"] = _default;
            },
            98,
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
              "sdk.URI",
            ],
            function $module_sdk_XFBML_Comments(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var MIN_WIDTH = 320;

              var params = babelHelpers["extends"](
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
                  color_scheme: "string",
                },

                importNamespace("sdk.PluginUtils").baseParams,
              );

              function setupAttributes(elem, attr) {
                Object.keys(params).forEach(function forEach_$0(key) {
                  var val = importNamespace("sdk.DOM").getAttr(elem, key);
                  if (val !== null) {
                    attr[key] = val;
                  }
                });
                Object.keys(attr).forEach(function forEach_$0(key) {
                  if (ES(key, "startsWith", true, "data-")) {
                    delete attr[key];
                  }
                });

                if (importDefault("sdk.UA").mobile() && attr.mobile !== false) {
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
                        document.URL.substring(0, index),
                      );
                    } else {
                      attr.xid = encodeURIComponent(document.URL);
                    }
                  }

                  if (attr.migrated) {
                    attr.href =
                      importNamespace("UrlMap").resolve("www") +
                      "/plugins/comments_v1.php?" +
                      "app_id=" +
                      importDefault("sdk.Runtime").getClientID() +
                      "&xid=" +
                      encodeURIComponent(attr.xid) +
                      "&url=" +
                      encodeURIComponent(attr.url);
                  }
                } else {
                  var fb_comment_id = attr.fb_comment_id;
                  if (!fb_comment_id) {
                    fb_comment_id = importDefault("QueryString").decode(
                      document.URL.substring(document.URL.indexOf("?") + 1),
                    ).fb_comment_id;
                    if (fb_comment_id && fb_comment_id.indexOf("#") > 0) {
                      fb_comment_id = fb_comment_id.substring(
                        0,
                        fb_comment_id.indexOf("#"),
                      );
                    }
                  }

                  if (fb_comment_id) {
                    attr.fb_comment_id = fb_comment_id;
                  }
                }

                if (!attr.version) {
                  attr.version = importDefault("sdk.Runtime").getVersion();
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
                  var href = new (importDefault("sdk.URI"))(attr.href);
                  if (!href.getProtocol()) {
                    attr.href = href.setProtocol("http").toString();
                  }
                }

                return attr;
              }

              var Comments = importDefault("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  attr = setupAttributes(elem, attr);

                  this.parent(elem, ns, tag, attr);

                  this.subscribe(
                    "xd.sdk_event",
                    function subscribe_$1(message) {
                      importNamespace("sdk.Event").fire(
                        message.event,
                        ES("JSON", "parse", false, message.data),
                      );
                    },
                  );
                },
                getConfig: function getConfig() {
                  return {
                    fluid: true,
                    full_width: true,
                  };
                },
                getParams: function getParams() {
                  return params;
                },
              });
              var _default = Comments;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.XFBML.CommentsCount",
            ["sdk.DOM", "sdk.XFBML.Comments", "sprintf"],
            function $module_sdk_XFBML_CommentsCount(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var CommentsCount = importDefault("sdk.XFBML.Comments").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  importNamespace("sdk.DOM").addCss(
                    elem,
                    "fb_comments_count_zero",
                  );
                  attr.count = 1;

                  this.parent(elem, ns, "comments", attr);

                  this.subscribe(
                    "xd.comment_count",
                    function subscribe_$1(message) {
                      var data = ES("JSON", "parse", false, message.data);
                      importNamespace("sdk.DOM").dangerouslySetInnerHtml(
                        elem,
                        importDefault("sprintf")(
                          '<span class="fb_comments_count">%s</span>',
                          data.count,
                        ),
                      );
                      if (data.count > 0) {
                        importNamespace("sdk.DOM").removeCss(
                          elem,
                          "fb_comments_count_zero",
                        );
                      }
                      importNamespace("sdk.DOM").removeCss(
                        elem,
                        "fb_iframe_widget",
                      );
                    },
                  );
                },
              });
              var _default = CommentsCount;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.XFBML.LWIAdsCreation",
            ["IframePlugin", "sdk.createIframe"],
            function $module_sdk_XFBML_LWIAdsCreation(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var LWIAdsCreation = importDefault("IframePlugin").extend({
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
                    hide_manage_button: "bool",
                    hide_explore_more_options: "bool",
                    preferred_ad_options: "string",
                  };
                },

                _setUpSubscriptions: function _setUpSubscriptions() {
                  var _this = this;

                  this.subscribe(
                    "xd.lwiadscreation.load",
                    function subscribe_$1(message) {
                      _this._createIframe(message);
                    },
                  );
                },

                _createIframe: function _createIframe(message) {
                  importDefault("sdk.createIframe")({
                    url: message.iframeURL,
                    name: "LWIAdsCreationRootIframe",
                    root: document.body,
                    height: 300,
                    width: 950,
                  });
                },
              });
              var _default = LWIAdsCreation;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.XFBML.LWIAdsInsights",
            ["IframePlugin", "sdk.createIframe"],
            function $module_sdk_XFBML_LWIAdsInsights(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var LWIAdsInsights = importDefault("IframePlugin").extend({
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
                  };
                },

                _setUpSubscriptions: function _setUpSubscriptions() {
                  var _this = this;

                  this.subscribe(
                    "xd.lwiadsinsights.load",
                    function subscribe_$1(message) {
                      _this._createIframe(message);
                    },
                  );
                },

                _createIframe: function _createIframe(message) {
                  importDefault("sdk.createIframe")({
                    url: message.iframeURL,
                    name: "LWIAdsInsightsRootIframe",
                    root: document.body,
                    height: 800,
                    width: 1050,
                  });
                },
              });
              var _default = LWIAdsInsights;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "safeEval",
            ["sdk.Runtime", "sdk.Scribe"],
            function $module_safeEval(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
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

                importNamespace("sdk.Scribe").log("jssdk_error", {
                  appId: importDefault("sdk.Runtime").getClientID(),
                  error: "USE_OF_EVAL_FUNCTION",
                  extra: {
                    message: "Developer used an eval function",
                  },
                });

                return Function(
                  'return eval("' + source.replace(/\"/g, '\\"') + '");',
                ).apply(null, args || []);
              }

              module.exports = safeEval;
            },
            34,
          );
          __d(
            "DOMPlugin",
            [
              "JSSDKShadowCssConfig",
              "Log",
              "QueryString",
              "sdk.DOM",
              "sdk.Observable",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.XD",
              "sdk.feature",
            ],
            function $module_DOMPlugin(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var DOMPlugin = (function (_Observable) {
                function DOMPlugin(element, ns, tag, attr, inParams, config) {
                  var _this;
                  _this = _Observable.call(this) || this;
                  _this.shadowCss = [];

                  _this.element = element;
                  _this.tag = tag.replace(/-/g, "_");
                  _this.ns = ns;
                  _this.config = config != null ? config : {};
                  _this.params = {};
                  importNamespace("sdk.PluginUtils").validate(
                    inParams,
                    element,
                    attr,
                    _this.params,
                  );
                  importNamespace("sdk.PluginUtils").validate(
                    importNamespace("sdk.PluginUtils").baseParams,
                    element,
                    attr,
                    _this.params,
                  );

                  ES("Object", "assign", false, _this.params, {
                    app_id: importDefault("sdk.Runtime").getClientID(),
                    locale: importDefault("sdk.Runtime").getLocale(),
                    sdk: "joey",
                    kid_directed_site:
                      importDefault("sdk.Runtime").getKidDirectedSite(),
                    channel: importNamespace("sdk.XD").handler(
                      function XD_handler_$0(msg) {
                        if (msg != null) {
                          _this.inform("xd." + msg.type, msg);
                        }
                      },
                      "parent.parent",
                      true,
                    ),
                  });
                  return _this;
                }
                babelHelpers.inheritsLoose(DOMPlugin, _Observable);
                var _proto = DOMPlugin.prototype;
                _proto.render = function render(_root) {};
                _proto.process = function process() {
                  var params = babelHelpers["extends"]({}, this.params);
                  delete params.channel;
                  var query = importDefault("QueryString").encode(params);
                  if (
                    this.element.getAttribute("fb-iframe-plugin-query") ===
                    query
                  ) {
                    importNamespace("Log").info(
                      "Skipping render: %s:%s %s",
                      this.ns,
                      this.tag,
                      query,
                    );
                    this.inform("render");
                    return;
                  }
                  this.element.setAttribute("fb-iframe-plugin-query", query);

                  maybeCreateShadowRootAndRenderInDOM(
                    this.element,
                    ES(this.render, "bind", true, this),
                    this.shadowCss,
                  );

                  this.inform("render");
                };
                return DOMPlugin;
              })(importNamespace("sdk.Observable").Observable);

              function maybeCreateShadowRootAndRenderInDOM(
                element,
                render,

                shadowCss,
              ) {
                if (shadowCss === void 0) {
                  shadowCss = [];
                }
                while (element.firstChild) {
                  element.removeChild(element.firstChild);
                }

                if (typeof element.attachShadow === "function") {
                  var shadowRootWrapper = document.createElement("div");
                  element.appendChild(shadowRootWrapper);
                  var shadowRoot = shadowRootWrapper.attachShadow({
                    mode: importDefault("sdk.feature")(
                      "shadow_dom_plugin_mode",
                      "closed",
                    ),
                  });
                  shadowCss.forEach(
                    function shadowCss_forEach_$0(cssModuleName) {
                      return importNamespace("sdk.DOM").addCssRules(
                        importDefault("JSSDKShadowCssConfig")[cssModuleName],
                        [cssModuleName],
                        shadowRoot,
                      );
                    },
                  );
                  shadowRoot.appendChild(render(shadowRoot));
                } else {
                  shadowCss.forEach(
                    function shadowCss_forEach_$0(cssModuleName) {
                      return importNamespace("sdk.DOM").addCssRules(
                        importDefault("JSSDKShadowCssConfig")[cssModuleName],
                        [cssModuleName],
                      );
                    },
                  );
                  element.appendChild(render(document));
                }
              }
              exports.DOMPlugin = DOMPlugin;
              exports.maybeCreateShadowRootAndRenderInDOM =
                maybeCreateShadowRootAndRenderInDOM;
            },
            98,
          );
          __d(
            "sdk.SVGLogos",
            ["guid"],
            function $module_sdk_SVGLogos(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var fsilo =
                "M90,212v-75h-27v-31h27v-25q0,-40 40,-40q15,0 24,2v26h-14q-16,0 -16,16v21h30l-5,31h-27v75";
              var outera = "a106 106,0,1,0,-32 0";
              var innera = "a106 106,1,0,1,-32 0";

              function applyAttribs(target, attribs) {
                Object.getOwnPropertyNames(attribs).forEach(
                  function forEach_$0(p) {
                    return target.setAttribute(p, attribs[p]);
                  },
                );
                return target;
              }

              function svgE(root, tag, attribs) {
                var x = applyAttribs(
                  document.createElementNS("http://www.w3.org/2000/svg", tag),
                  attribs,
                );
                root == null || root.appendChild(x);
                return x;
              }

              var close = function close(attribs) {
                var svg = svgE(
                  null,
                  "svg",
                  ES(
                    "Object",
                    "assign",
                    false,

                    { viewBox: "0 0 100 100", preserveAspectRatio: "xMinYMin" },
                    attribs,
                  ),
                );
                svgE(svg, "line", {
                  x1: "0",
                  y1: "100",
                  x2: "100",
                  y2: "0",
                  "stroke-width": "12",
                });
                svgE(svg, "line", {
                  x1: "0",
                  y1: "0",
                  x2: "100",
                  y2: "100",
                  "stroke-width": "12",
                });
                return svg;
              };

              var facebook = function facebook(attribs) {
                var svg = svgE(
                  null,
                  "svg",
                  ES(
                    "Object",
                    "assign",
                    false,

                    { viewBox: "0 0 213 213", preserveAspectRatio: "xMinYMin" },
                    attribs,
                  ),
                );
                svgE(svg, "path", {
                  d: fsilo + outera,
                  class: "f_logo_circle",
                });
                svgE(svg, "path", { d: fsilo + innera, class: "f_logo_f" });
                return svg;
              };
              var facebookWhite = function facebookWhite(attribs) {
                var svg = svgE(
                  null,
                  "svg",
                  ES(
                    "Object",
                    "assign",
                    false,

                    { viewBox: "0 0 213 213", preserveAspectRatio: "xMinYMin" },
                    attribs,
                  ),
                );
                svgE(svg, "path", {
                  d: fsilo + outera,
                  class: "f_logo_circle",
                  fill: "white",
                });
                svgE(svg, "path", {
                  d: fsilo + innera,
                  class: "f_logo_f",
                  fill: "white",
                });
                return svg;
              };
              var instagram = function instagram(attribs) {
                var svg = svgE(
                  null,
                  "svg",
                  ES(
                    "Object",
                    "assign",
                    false,

                    {
                      viewBox: "-2 -2 104 104",
                      preserveAspectRatio: "xMinYMin",
                    },
                    attribs,
                  ),
                );
                svgE(svg, "rect", {
                  x: "5",
                  y: "5",
                  width: "91",
                  height: "91",
                  "stroke-width": "9",
                  rx: "23",
                  class: "ig_logo_body",
                });
                svgE(svg, "circle", {
                  cx: "77",
                  cy: "23",
                  r: "6",
                  class: "ig_logo_flash",
                });
                svgE(svg, "circle", {
                  cx: "50",
                  cy: "50",
                  r: "21",
                  "stroke-width": "9",
                  class: "ig_logo_lens",
                });
                return svg;
              };
              var instagramColor = function instagramColor(attribs) {
                var maskID = importDefault("guid")();
                var svg = svgE(
                  null,
                  "svg",
                  ES(
                    "Object",
                    "assign",
                    false,

                    {
                      viewBox: "-2 -2 104 104",
                      preserveAspectRatio: "xMinYMin",
                    },
                    attribs,
                  ),
                );
                var defs = svgE(svg, "defs", {});
                var mask = svgE(defs, "mask", {
                  id: maskID,
                });
                svgE(mask, "circle", {
                  cx: "77",
                  cy: "23",
                  r: "6",
                  fill: "white",
                });
                svgE(mask, "circle", {
                  cx: "50",
                  cy: "50",
                  r: "21",
                  "stroke-width": "9",
                  stroke: "white",
                });
                svgE(mask, "rect", {
                  x: "5",
                  y: "5",
                  width: "91",
                  height: "91",
                  "stroke-width": "9",
                  rx: "23",
                  stroke: "white",
                  fill: "none",
                });
                var rg1 = svgE(defs, "linearGradient", {
                  id: "purplepink",
                  x1: "0",
                  x2: ".15",
                  y1: "0",
                  y2: ".6",
                });
                svgE(rg1, "stop", {
                  offset: "12%",
                  "stop-color": "rgb(88,85,214)",
                });
                svgE(rg1, "stop", {
                  offset: "85%",
                  "stop-color": "rgb(215,27,122)",
                });
                var rg2 = svgE(defs, "radialGradient", {
                  id: "yelloworange",
                  cx: ".35",
                  cy: "1",
                  r: "2",
                });
                svgE(rg2, "stop", {
                  offset: "7%",
                  "stop-color": "rgb(252,215,114)",
                });
                svgE(rg2, "stop", {
                  offset: "20%",
                  "stop-color": "rgb(244,102,37)",
                });
                svgE(rg2, "stop", {
                  offset: "38%",
                  "stop-color": "rgb(225,37,122)",
                  "stop-opacity": "0",
                });
                svgE(svg, "rect", {
                  x: "1",
                  y: "1",
                  width: "99",
                  height: "99",
                  "stroke-width": "0",
                  rx: "23",
                  fill: "url(#purplepink)",
                  style: "mask: url(#" + maskID + ")",
                });
                svgE(svg, "rect", {
                  x: "1",
                  y: "1",
                  width: "99",
                  height: "99",
                  "stroke-width": "0",
                  rx: "23",
                  fill: "url(#yelloworange)",
                  style: "mask: url(#" + maskID + ")",
                });
                return svg;
              };
              exports.close = close;
              exports.facebook = facebook;
              exports.facebookWhite = facebookWhite;
              exports.instagram = instagram;
              exports.instagramColor = instagramColor;
            },
            98,
          );
          __d(
            "sdk.SharedStringConstants",
            ["sdk.fbt"],
            function $module_sdk_SharedStringConstants(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";
              var _importDefault_sdkfbt;

              var buttonStringsFBT = {
                continueWith: (_importDefault_sdkfbt =
                  importDefault("sdk.fbt"))._(
                  "Continue with {facebook_app_name} or {instagram_app_name}",
                ),

                continueWithShort: _importDefault_sdkfbt._(
                  "{facebook_app_name} or {instagram_app_name}",
                ),

                loginButtonAriaLabel: _importDefault_sdkfbt._(
                  "Continue with Facebook or Instagram",
                ),

                logout: _importDefault_sdkfbt._("Logout"),

                logoutButtonAriaLabel: _importDefault_sdkfbt._(
                  "Logout the current website",
                ),

                titleText: _importDefault_sdkfbt._("Choose Account"),

                promptText: _importDefault_sdkfbt._(
                  "Which account would you like to use to log in?",
                ),

                facebookText: _importDefault_sdkfbt._("Log in with Facebook"),

                facebookTextShort: _importDefault_sdkfbt._("Log in"),

                instagramText: _importDefault_sdkfbt._("Log in with Instagram"),

                disambiguationDialogAriaLabelText: _importDefault_sdkfbt._(
                  "Log in with Facebook or Instagram",
                ),

                fbButtonText: _importDefault_sdkfbt._("Continue with Facebook"),

                igButtonText: _importDefault_sdkfbt._(
                  "Continue with Instagram",
                ),
              };
              exports.buttonStringsFBT = buttonStringsFBT;
            },
            226,
          );
          __d(
            "sdk.XFBML.ShadowDOMLoginButton",
            [
              "DOMPlugin",
              "UrlMap",
              "sdk.Auth",
              "sdk.Event",
              "sdk.LoggingUtils",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.SVGLogos",
              "sdk.SharedStringConstants",
              "sdk.createIframe",
              "sdk.ui",
            ],
            function $module_sdk_XFBML_ShadowDOMLoginButton(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var fontSize = { small: "11px", medium: "13px", large: "16px" };
              var heightSize = { small: "20px", medium: "30px", large: "40px" };
              var facebookToken = "{facebook_app_name}";
              var FBLoginButtonPlugin = (function (_DOMPlugin) {
                function FBLoginButtonPlugin(elem, ns, tag, attr, inParams) {
                  var _this;
                  _this =
                    _DOMPlugin.call(this, elem, ns, tag, attr, inParams) ||
                    this;
                  _this.stateObservers = [];
                  _this.shadowCss = ["css:fb.shadow.css.fb_login_button"];
                  _this.container = document.createElement("div");
                  _this.container.classList.add("fb_login_button_container");
                  _this.container.dir = "auto";
                  _this.loginButtonText = _this.updateLabel();
                  _this.fbLoginButton = document.createElement("button");
                  _this.borderRadius = _this.updateRadius(_this.params);

                  _this.fbLoginButton = _this.createSingleButton(
                    _this.loginButtonText,
                  );

                  _this.createFBButton(
                    "fb-button-main-element",
                    importNamespace("sdk.SharedStringConstants")
                      .buttonStringsFBT.logout,
                    importNamespace("sdk.SharedStringConstants")
                      .buttonStringsFBT.logoutButtonAriaLabel,
                    setLabelContainer,
                    function _this_createFBButton_$4(state) {
                      this.style.display =
                        state.status === "connected" ? "flex" : "none";
                    },
                    ES(
                      function (e) {
                        importDefault("sdk.Auth").logout();
                        if (
                          e &&
                          e.detail === 0 &&
                          this.fbLoginButton &&
                          this.fbLoginButton.style.display !== "none"
                        ) {
                          this.fbLoginButton.focus();
                        }
                      },
                      "bind",
                      true,
                      _this,
                    ),
                  );
                  return _this;
                }
                babelHelpers.inheritsLoose(FBLoginButtonPlugin, _DOMPlugin);
                var _proto = FBLoginButtonPlugin.prototype;
                _proto.render = function render(_root) {
                  var _this2 = this;
                  this.updateDisplay({
                    shouldHideDisambiguation: true,
                    status: importDefault("sdk.Runtime").getLoginStatus(),
                  });

                  importNamespace("sdk.Event").subscribe(
                    "auth.statusChange",
                    function Event_subscribe_$1(response) {
                      var state = {
                        shouldHideDisambiguation: true,
                        status: response.status,
                        fxApp: response.loginSource,
                      };
                      _this2.updateDisplay(state);
                    },
                  );
                  return this.container;
                };
                _proto.createSingleButton = function createSingleButton(
                  labelText,
                ) {
                  return this.createFBButton(
                    "fb-button-main-element",
                    labelText,
                    labelText,
                    setSingleButtonLabel,
                    function createFBButton_$4(state) {
                      this.style.display =
                        state.status === "connected" ? "none" : "flex";
                    },
                    ES(
                      function (e) {
                        e.stopPropagation();
                        importNamespace("sdk.LoggingUtils").logLoginEvent(
                          this.params,
                          importNamespace("sdk.LoggingUtils").logEventName
                            .buttonClick + "_single_fb",
                        );
                        this.loginTrigger();
                      },
                      "bind",
                      true,
                      this,
                    ),
                  );
                };
                _proto.loginTrigger = function loginTrigger() {
                  var scope = "";
                  importDefault("sdk.ui")(
                    {
                      method: "permissions.oauth",
                      display: "popup",
                      scope: scope,
                    },
                    this.loginCb(),
                  );
                };
                _proto.createFBButton = function createFBButton(
                  buttonClass,
                  labelText,
                  ariaLabelText,
                  setLabel,

                  updateDisplay,
                  onClick,
                ) {
                  var fbButton = document.createElement("button");
                  fbButton.classList.add(buttonClass);
                  fbButton.setAttribute("aria-label", ariaLabelText);
                  var labelContainer = document.createElement("span");
                  labelContainer.classList.add("fb_button_label_element");
                  labelContainer.classList.add("fb_button_label");
                  this.applyStyles(fbButton, this.params);
                  if (this.use_continue_as === true) {
                    labelContainer.append(
                      this.createIframeOverlay(this.container, this.params),
                    );
                  } else {
                    setLabel(this.params, labelText, labelContainer);
                  }
                  fbButton.appendChild(labelContainer);

                  fbButton.addEventListener(
                    "click",
                    function fbButton_addEventListener_$1(event) {
                      onClick(event);
                      fbButton.blur();
                    },
                  );

                  fbButton.updateDisplay = ES(
                    updateDisplay,
                    "bind",
                    true,
                    fbButton,
                  );
                  this.stateObservers.push(fbButton);
                  this.container.appendChild(fbButton);
                  return fbButton;
                };
                _proto.loginCb = function loginCb() {
                  var _this3 = this;
                  return function (response) {
                    if (
                      response.authResponse != null &&
                      response.status === "connected"
                    ) {
                      importNamespace("sdk.LoggingUtils").logLoginEvent(
                        _this3.params,
                        importNamespace("sdk.LoggingUtils").logEventName
                          .loginSuccess + "_single_fb",
                      );
                    } else {
                      importNamespace("sdk.LoggingUtils").logLoginEvent(
                        _this3.params,
                        importNamespace("sdk.LoggingUtils").logEventName
                          .loginCancel + "_single_fb",
                      );
                    }
                  };
                };
                _proto.updateDisplay = function updateDisplay(state) {
                  this.stateObservers.forEach(
                    function stateObservers_forEach_$0(comp) {
                      return comp.updateDisplay(state);
                    },
                  );
                };
                _proto.updateLabel = function updateLabel() {
                  var textLabel =
                    this.params["button-type"] === "login_with"
                      ? importNamespace("sdk.SharedStringConstants")
                          .buttonStringsFBT.facebookText
                      : importNamespace("sdk.SharedStringConstants")
                          .buttonStringsFBT.fbButtonText;
                  var loginLabel = doesTextFit(this.params, textLabel);

                  if (this.params["button-type"] === "login_with") {
                    textLabel = loginLabel
                      ? textLabel
                      : importNamespace("sdk.SharedStringConstants")
                          .buttonStringsFBT.facebookTextShort;
                  }
                  return textLabel;
                };
                _proto.updateRadius = function updateRadius(params) {
                  var _PluginUtils$getVal;
                  var radius =
                    (_PluginUtils$getVal = importNamespace(
                      "sdk.PluginUtils",
                    ).getVal(params, "layout")) != null
                      ? _PluginUtils$getVal
                      : "default";
                  var sizeParams = String(
                    importNamespace("sdk.PluginUtils").getVal(params, "size"),
                  );
                  var size = sizeParams !== "" ? sizeParams : "small";
                  var radiusDefault = size === "large" ? "4px" : "3px";

                  return radius === "rounded" ? "20px" : radiusDefault;
                };
                _proto.applyStyles = function applyStyles(component, params) {
                  var _PluginUtils$getVal2;
                  var sizeParams = String(
                    importNamespace("sdk.PluginUtils").getVal(params, "size"),
                  );
                  var size = sizeParams !== "" ? sizeParams : "small";
                  component.style.borderRadius = this.borderRadius;

                  var width =
                    (_PluginUtils$getVal2 = importNamespace(
                      "sdk.PluginUtils",
                    ).getVal(params, "width")) != null
                      ? _PluginUtils$getVal2
                      : null;
                  component.style.width = getWidthForSize(
                    size,
                    width,
                  ).toString();

                  component.style.fontSize = fontSize[size];

                  component.style.height = heightSize[size];
                  component.style.backgroundColor = "rgb(26,119,242)";
                  component.style.color = "#fff";
                  component.style.border = "0";
                  component.style.fontWeight = "bold";
                };
                _proto.createIframeOverlay = function createIframeOverlay(
                  container,
                  params,
                ) {
                  var _PluginUtils$getVal3, _PluginUtils$getVal4;
                  var sizeParams = String(
                    importNamespace("sdk.PluginUtils").getVal(params, "size"),
                  );
                  var size = sizeParams !== "" ? sizeParams : "small";
                  var appId = importDefault("sdk.Runtime").getClientID();
                  var radiusParam = String(
                    importNamespace("sdk.PluginUtils").getVal(params, "layout"),
                  );
                  var radius = radiusParam !== "" ? radiusParam : "default";
                  var widthParam =
                    (_PluginUtils$getVal3 = importNamespace(
                      "sdk.PluginUtils",
                    ).getVal(params, "width")) != null
                      ? _PluginUtils$getVal3
                      : null;
                  var width = getWidthForSize(size, widthParam).toString();
                  var url =
                    importNamespace("UrlMap").resolve("www") +
                    ("/plugins/login_button_overlay/" +
                      appId +
                      "/" +
                      width +
                      "/" +
                      size +
                      "/" +
                      radius +
                      "/");
                  var optArgs = {
                    root: container,
                    url: url,
                    borderRadius:
                      (_PluginUtils$getVal4 = importNamespace(
                        "sdk.PluginUtils",
                      ).getVal(params, "layout")) != null
                        ? _PluginUtils$getVal4
                        : "default",
                    width: width,
                  };
                  var iframe = importDefault("sdk.createIframe")(optArgs);
                  iframe.classList.add("fb-iframe-overlay");
                  return iframe;
                };
                return FBLoginButtonPlugin;
              })(importNamespace("DOMPlugin").DOMPlugin);

              function getWidthForSize(sizeFromParam, width) {
                var size = sizeFromParam != null ? sizeFromParam : "small";
                if (width === "" || width == null) {
                  return getMinWidthForSize(size);
                }
                return widthClamp(size, width);
              }

              function widthClamp(size, width) {
                var widthAsNumber = !isNaN(width) ? Number(width) : 0;
                var minSize = getMinWidthForSize(size);
                var maxSize = getMaxWidthForSize(size);
                if (widthAsNumber < getMinWidthForSize(size)) {
                  return minSize;
                }
                if (widthAsNumber > getMaxWidthForSize(size)) {
                  return maxSize;
                }
                return widthAsNumber;
              }

              function getMinWidthForSize(size) {
                switch (size) {
                  case "large":
                    return 240;
                  case "medium":
                    return 200;
                  default:
                    return 200;
                }
              }

              function getMaxWidthForSize(size) {
                switch (size) {
                  case "large":
                    return 400;
                  case "medium":
                    return 320;
                  default:
                    return 300;
                }
              }

              function doesTextFit(params, text) {
                var _PluginUtils$getVal5, _PluginUtils$getVal6;
                var textToMeasure = text.replace(
                  /\s?{facebook_app_name}\s?/,
                  "",
                );
                var width =
                  (_PluginUtils$getVal5 = importNamespace(
                    "sdk.PluginUtils",
                  ).getVal(params, "width")) != null
                    ? _PluginUtils$getVal5
                    : null;
                var size =
                  (_PluginUtils$getVal6 = importNamespace(
                    "sdk.PluginUtils",
                  ).getVal(params, "size")) != null
                    ? _PluginUtils$getVal6
                    : "large";
                var widthForSize = getWidthForSize(size, width);
                var textWidth = getTextWidth(textToMeasure)
                  ? getTextWidth(textToMeasure)
                  : 0;
                return textWidth < widthForSize;
              }

              function getTextWidth(text) {
                var canvas =
                  getTextWidth.canvas ||
                  (getTextWidth.canvas = document.createElement("canvas"));

                var context = canvas.getContext("2d");
                var metrics =
                  context == null ? void 0 : context.measureText(text);
                return metrics == null ? void 0 : metrics.width;
              }

              function setSingleButtonLabel(params, label, labelContainer) {
                var labelText = document.createElement("span");
                var buttonLogo = getLogo();
                buttonLogo.classList.add("single_button_svg_logo");
                labelContainer.append(buttonLogo);
                labelText.textContent = doesTextFit(params, label) ? label : "";
                labelContainer.append(labelText);
              }

              function setLabelContainer(params, label, labelContainer) {
                labelContainer.textContent = "";
                var facebookLocation = label.search(facebookToken);
                var facebookTokenEnd = facebookLocation + facebookToken.length;

                var startSegmentEnd = Math.min(facebookLocation);
                var midSegmentStart = Math.min(facebookTokenEnd);
                var midSegmentEnd = Math.max(facebookLocation);
                var endSegmentStart = Math.max(facebookTokenEnd);

                var fbLogo = getLogo();

                var startText = document.createElement("span");
                startText.style.whiteSpace = "nowrap";
                startText.append(label.substring(0, startSegmentEnd));
                var midText = document.createElement("span");
                midText.style.whiteSpace = "nowrap";
                midText.append(label.substring(midSegmentStart, midSegmentEnd));
                var endText = document.createElement("span");
                endText.style.whiteSpace = "nowrap";
                endText.append(label.substring(endSegmentStart, label.length));
                labelContainer.append(fbLogo);
                labelContainer.append(startText);
                labelContainer.append(midText);
                labelContainer.append(endText);
              }

              function getLogo() {
                return importNamespace("sdk.SVGLogos").facebookWhite({
                  class: "fb_button_svg_logo login_fb_logo",
                });
              }
              exports["default"] = FBLoginButtonPlugin;
            },
            98,
          );
          __d(
            "sdk.XFBML.LoginButton",
            [
              "IframePlugin",
              "Log",
              "guid",
              "safeEval",
              "sdk.Auth",
              "sdk.Auth.LoginStatus",
              "sdk.Dialog",
              "sdk.ErrorHandling",
              "sdk.Impressions",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.UIServer",
              "sdk.XD",
              "sdk.XFBML.ShadowDOMLoginButton",
              "sdk.feature",
              "sdk.getContextType",
              "sdk.modFeatureCheck",
              "sdk.ui",
            ],
            function $module_sdk_XFBML_LoginButton(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var httpsOnlyLearnMore = importDefault("sdk.feature")(
                "https_only_learn_more",
                "",
              );

              function invokeHandler(handler, scope, args) {
                if (handler) {
                  if (typeof handler === "string") {
                    importDefault("sdk.ErrorHandling").unguard(
                      importDefault("safeEval"),
                    )(handler, args);
                  } else if (handler.apply) {
                    importDefault("sdk.ErrorHandling")
                      .unguard(handler)
                      .apply(scope, args || []);
                  }
                }
              }

              function prepareCall(params, iframe_name, cb) {
                params.id = importDefault("guid")();
                params.plugin_prepare = true;
                params.origin = importDefault("sdk.getContextType")();
                params.domain = location.hostname;
                params.fallback_redirect_uri = document.location.href;

                var enableE2E = importDefault("sdk.feature")(
                  "e2e_tracking",
                  true,
                );
                if (enableE2E) {
                  params.e2e = {};
                }

                var popup_cb = function popup_cb(response) {
                  if (call != null) {
                    importNamespace("sdk.XD").sendToFacebook(iframe_name, {
                      method: "loginComplete",
                      params: ES("JSON", "stringify", false, {
                        frame_name: call.id,
                        status: importDefault("sdk.Runtime").getLoginStatus(),
                      }),
                    });
                  }

                  cb(response);
                };

                var call = importDefault("sdk.UIServer").prepareCall(
                  params,
                  popup_cb,
                );
                if (call != null) {
                  call.dims = {};

                  call.dims.screenX = window.screenX;

                  call.dims.screenY = window.screenY;

                  call.dims.outerWidth = window.outerWidth;

                  call.dims.outerHeight = window.outerHeight;

                  call.dims.screenWidth = window.screen.width;
                }

                importNamespace("sdk.XD").sendToFacebook(iframe_name, {
                  method: "loginButtonStateInit",
                  params: ES("JSON", "stringify", false, { call: call }),
                });
              }

              var LoginButton = importDefault("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  if (
                    (importNamespace("sdk.modFeatureCheck").forIDs(
                      "allow_shadow_dom_for_apps_with_id",
                      [importDefault("sdk.Runtime").getClientID()],
                    ) ||
                      (attr["data-shadow-test"] != null &&
                        attr["data-shadow-test"] === "true")) &&
                    importDefault("sdk.feature")("allow_shadow_dom", false) ===
                      true &&
                    attr["data-use-continue-as"] !== "true"
                  ) {
                    return new (importDefault(
                      "sdk.XFBML.ShadowDOMLoginButton",
                    ))(elem, ns, tag, attr, {
                      width: "string",
                      size: "string",
                      "button-type": "string",
                      layout: "string",
                      "auto-logout-link": "bool",
                      "use-continue-as": "bool",
                    });
                  }
                  if (location.protocol !== "https:") {
                    var httpsWarning =
                      "The Login Button plugin no longer works on http pages. " +
                      "Please update your site to use https for Facebook Login. %s";

                    importNamespace("Log").log(
                      "error",
                      -1,
                      httpsWarning,
                      httpsOnlyLearnMore,
                    );

                    if (
                      importDefault("sdk.feature")(
                        "https_only_scribe_logging",
                        true,
                      )
                    ) {
                      importNamespace("sdk.Scribe").log("jssdk_error", {
                        appId: importDefault("sdk.Runtime").getClientID(),
                        error: "HttpsOnly",
                        extra: {
                          message: "LoginButton",
                        },
                      });
                    }
                  }

                  this.parent(elem, ns, tag, attr);
                  var onlogin = importNamespace("sdk.PluginUtils").getVal(
                    attr,
                    "on_login",
                  );
                  var cb = null;

                  var iframeName = this._iframeOptions.name;
                  if (onlogin) {
                    cb = function cb(response) {
                      if (response.error_code) {
                        importNamespace("Log").debug(
                          "Plugin Return Error (%s): %s",
                          response.error_code,
                          response.error_message || response.error_description,
                        );
                        return;
                      }

                      invokeHandler(onlogin, null, [response]);
                    };

                    this.subscribe("login.status", cb);
                  }

                  var dialog_open_cb = function dialog_open_cb(response) {
                    invokeHandler(cb, null, [response]);
                    importNamespace("sdk.XD").sendToFacebook(iframeName, {
                      method: "loginReload",
                      params: ES("JSON", "stringify", false, response),
                    });
                  };

                  this.subscribe(
                    "xd.login_button_dialog_open",
                    function subscribe_$1(msg) {
                      importDefault("sdk.ui")(
                        ES("JSON", "parse", false, msg.params),
                        function ui_$1(response) {
                          importNamespace("sdk.XD").sendToFacebook(iframeName, {
                            method: "loginComplete",
                            params: "{}",
                          });
                          dialog_open_cb(response);
                        },
                      );
                    },
                  );

                  this.subscribe(
                    "xd.login_button_prepare_call",
                    function subscribe_$1(msg) {
                      var params = ES("JSON", "parse", false, msg.params);
                      var paramsCopyForClosure = msg.params;

                      prepareCall(params, iframeName, dialog_open_cb);

                      importDefault("sdk.Auth").subscribe(
                        "status.change",
                        function Auth_subscribe_$1(response) {
                          var closureParams = ES(
                            "JSON",
                            "parse",
                            false,
                            paramsCopyForClosure,
                          );
                          closureParams.logger_id = importDefault("guid")();
                          if (
                            response != null &&
                            response.status != null &&
                            response.status !== "connected"
                          ) {
                            prepareCall(
                              closureParams,
                              iframeName,
                              dialog_open_cb,
                            );
                          }
                        },
                      );
                    },
                  );

                  this.subscribe(
                    "xd.login_button_click",
                    function subscribe_$1(msg) {
                      var params = ES("JSON", "parse", false, msg.params);
                      if (params.popup) {
                        if (
                          importDefault("sdk.feature")("e2e_tracking", true)
                        ) {
                          var dialog = importDefault("sdk.Dialog").get(
                            params.call.id,
                          );
                          dialog.subscribe(
                            "e2e:end",
                            function dialog_subscribe_$1(events) {
                              events.method = params.call.params.method;
                              events.display = params.call.params.display;
                              importNamespace("Log").debug(
                                "e2e: %s",
                                ES("JSON", "stringify", false, events),
                              );

                              importNamespace("sdk.Impressions").log(114, {
                                payload: events,
                              });
                            },
                          );
                        }
                      } else {
                        if (
                          importDefault("sdk.feature")(
                            "popup_blocker_scribe_logging",
                            true,
                          )
                        ) {
                          importNamespace("sdk.Scribe").log("jssdk_error", {
                            appId: importDefault("sdk.Runtime").getClientID(),
                            error: "POPUP_MAYBE_BLOCKED_NEW",
                            extra: {
                              call: params.call.name,
                            },
                          });
                        }
                      }
                    },
                  );

                  var refreshCb = function refreshCb() {
                    invokeHandler(cb, null, [
                      {
                        status: importDefault("sdk.Runtime").getLoginStatus(),
                        authResponse:
                          importDefault("sdk.Auth").getAuthResponse(),
                      },
                    ]);
                  };

                  this.subscribe("xd.login_button_connected", refreshCb);

                  this.subscribe(
                    "xd.login_button_popup_closed",
                    function subscribe_$1() {
                      importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                        refreshCb,
                        true,
                      );
                    },
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
                    reset_messenger_state: "bool",
                    config_id: "string",
                  };
                },
              });
              var _default = LoginButton;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "IframePluginClass",
            [
              "Log",
              "QueryString",
              "UrlMap",
              "guid",
              "sdk.Auth.LoginStatus",
              "sdk.AuthUtils",
              "sdk.DOM",
              "sdk.Event",
              "sdk.Observable",
              "sdk.PlatformVersioning",
              "sdk.PluginUtils",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.XD",
              "sdk.createIframe",
            ],
            function $module_IframePluginClass(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var IframePluginClass = (function (_Observable) {
                function IframePluginClass(elem, ns, tag, attr, config) {
                  var _this;
                  if (config === void 0) {
                    config = null;
                  }
                  _this = _Observable.call(this) || this;
                  tag = tag.replace(/-/g, "_");

                  _this.$IframePluginClass$p_isIframeResized = false;

                  _this.config =
                    config != null
                      ? config
                      : {
                          fluid: false,
                          mobile_fullsize: false,
                          full_width: false,
                        };

                  var pluginId = importNamespace("sdk.PluginUtils").getVal(
                    attr,
                    "plugin_id",
                  );
                  var iframeName = importNamespace("sdk.PluginUtils").getVal(
                    attr,
                    "iframe_name",
                  );
                  _this.subscribe(
                    "xd.resize",
                    importNamespace("sdk.PluginUtils").resizeBubbler(pluginId),
                  );
                  _this.subscribe(
                    "xd.resize.flow",
                    importNamespace("sdk.PluginUtils").resizeBubbler(pluginId),
                  );

                  _this.subscribe(
                    "xd.resize.flow",
                    function _this_subscribe_$1(message) {
                      ES(
                        "Object",
                        "assign",
                        false,
                        _this.iframeOptions.root.style,
                        {
                          verticalAlign: "bottom",
                          overflow: "",
                        },
                      );
                      importNamespace("sdk.PluginUtils").resize(
                        _this.iframeOptions.root,
                        importNamespace("sdk.PluginUtils").parse(message.width),
                        importNamespace("sdk.PluginUtils").parse(
                          message.height,
                        ),
                      );
                      _this.updateLift();
                      window.clearTimeout(_this.$IframePluginClass$p_timeoutID);
                    },
                  );

                  _this.subscribe(
                    "xd.resize",
                    function _this_subscribe_$1(message) {
                      var _importNamespace_sdkPluginUtils;

                      ES(
                        "Object",
                        "assign",
                        false,
                        _this.iframeOptions.root.style,
                        {
                          verticalAlign: "bottom",
                          overflow: "",
                        },
                      );
                      (_importNamespace_sdkPluginUtils =
                        importNamespace("sdk.PluginUtils")).resize(
                        _this.iframeOptions.root,
                        _importNamespace_sdkPluginUtils.parse(message.width),
                        _importNamespace_sdkPluginUtils.parse(message.height),
                      );
                      _importNamespace_sdkPluginUtils.resize(
                        _this.iframe,
                        _importNamespace_sdkPluginUtils.parse(message.width),
                        _importNamespace_sdkPluginUtils.parse(message.height),
                      );
                      _this.$IframePluginClass$p_isIframeResized = true;
                      _this.updateLift();
                      window.clearTimeout(_this.$IframePluginClass$p_timeoutID);
                    },
                  );

                  _this.subscribe(
                    "xd.resize.iframe",
                    function _this_subscribe_$1(message) {
                      importNamespace("sdk.PluginUtils").resize(
                        _this.iframe,
                        importNamespace("sdk.PluginUtils").parse(message.width),
                        importNamespace("sdk.PluginUtils").parse(
                          message.height,
                        ),
                      );
                      _this.$IframePluginClass$p_isIframeResized = true;
                      _this.updateLift();
                      window.clearTimeout(_this.$IframePluginClass$p_timeoutID);
                    },
                  );

                  _this.subscribe(
                    "xd.sdk_event",
                    function _this_subscribe_$1(message) {
                      var data = ES("JSON", "parse", false, message.data);
                      data.pluginID = pluginId;
                      importNamespace("sdk.Event").fire(
                        message.event,
                        data,
                        elem,
                      );
                    },
                  );

                  var url = attr.should_use_new_domain
                    ? importNamespace("UrlMap").resolve("social_plugin") +
                      "/" +
                      tag +
                      ".php?"
                    : importNamespace("UrlMap").resolve("www") +
                      "/plugins/" +
                      tag +
                      ".php?";
                  var params = {};

                  importNamespace("sdk.PluginUtils").validate(
                    _this.getParams(),
                    elem,
                    attr,
                    params,
                  );
                  importNamespace("sdk.PluginUtils").validate(
                    importNamespace("sdk.PluginUtils").baseParams,
                    elem,
                    attr,
                    params,
                  );

                  ES("Object", "assign", false, params, {
                    app_id: importDefault("sdk.Runtime").getClientID(),
                    locale: importDefault("sdk.Runtime").getLocale(),
                    sdk: "joey",
                    kid_directed_site:
                      importDefault("sdk.Runtime").getKidDirectedSite(),
                    channel: importNamespace("sdk.XD").handler(
                      function XD_handler_$0(msg) {
                        if (msg != null) {
                          _this.inform("xd." + msg.type, msg);
                        }
                      },
                      "parent.parent",
                      true,
                    ),
                  });

                  if (_this.shouldIgnoreWidth()) {
                    params.width = void 0;
                  }

                  params.container_width = elem.offsetWidth;

                  importNamespace("sdk.DOM").addCss(elem, "fb_iframe_widget");
                  var name =
                    iframeName != null
                      ? String(iframeName)
                      : importDefault("guid")();
                  _this.subscribe(
                    "xd.verify",
                    function _this_subscribe_$1(msg) {
                      importNamespace("sdk.XD").sendToFacebook(name, {
                        method: "xd/verify",
                        params: ES("JSON", "stringify", false, msg.token),
                      });
                    },
                  );

                  _this.subscribe(
                    "xd.refreshLoginStatus",
                    function _this_subscribe_$1() {
                      importNamespace("sdk.AuthUtils").removeLogoutState();
                      importDefault("sdk.Auth.LoginStatus").getLoginStatus(
                        ES(_this.inform, "bind", true, _this, "login.status"),
                        true,
                      );
                    },
                  );

                  var flow = document.createElement("span");

                  ES("Object", "assign", false, flow.style, {
                    verticalAlign: "top",

                    width: params.lazy ? "1px" : "0px",

                    height: params.lazy ? "1px" : "0px",
                    overflow: "hidden",
                  });

                  _this.element = elem;
                  _this.ns = ns;
                  _this.tag = tag;
                  _this.params = params;
                  _this.iframeOptions = {
                    root: flow,
                    url: url + importDefault("QueryString").encode(params),
                    name: name,

                    width:
                      _this.config.mobile_fullsize &&
                      importDefault("sdk.UA").mobile()
                        ? void 0
                        : params.width || 1000,

                    height: params.height || 1000,
                    style: {
                      border: "none",
                      visibility: "hidden",
                    },
                    title:
                      _this.ns + ":" + _this.tag + " Facebook Social Plugin",
                    testid:
                      _this.ns + ":" + _this.tag + " Facebook Social Plugin",
                    onload: function onload() {
                      return _this.inform("render");
                    },
                    onerror: function onerror() {
                      return importNamespace("sdk.PluginUtils").collapseIframe(
                        _this.iframe,
                      );
                    },

                    lazy: params.lazy,
                    allow: importNamespace("sdk.PluginUtils").getVal(
                      attr,
                      "allow",
                    ),
                  };

                  if (_this.config.fluid && params.width !== "auto") {
                    importNamespace("sdk.DOM").addCss(
                      _this.element,
                      "fbiframe_widget_fluid_desktop",
                    );

                    if (!params.width && _this.config.full_width) {
                      _this.element.style.width = "100%";
                      _this.iframeOptions.root.style.width = "100%";
                      _this.iframeOptions.style.width = "100%";
                      _this.params.container_width = _this.element.offsetWidth;
                      _this.iframeOptions.url =
                        url + importDefault("QueryString").encode(_this.params);
                    }
                  }
                  return _this;
                }
                babelHelpers.inheritsLoose(IframePluginClass, _Observable);
                var _proto = IframePluginClass.prototype;
                _proto.shouldIgnoreWidth = function shouldIgnoreWidth() {
                  return (
                    importDefault("sdk.UA").mobile() &&
                    this.config.mobile_fullsize
                  );
                };
                _proto.useInlineHeightForMobile =
                  function useInlineHeightForMobile() {
                    return true;
                  };
                _proto.process = function process() {
                  var _this2 = this;
                  if (importDefault("sdk.Runtime").getIsVersioned()) {
                    importNamespace(
                      "sdk.PlatformVersioning",
                    ).assertVersionIsSet();
                    var uri = new (importDefault("sdk.URI"))(
                      this.iframeOptions.url,
                    );
                    this.iframeOptions.url = uri
                      .setPath(
                        "/" +
                          importDefault("sdk.Runtime").getVersion() +
                          uri.getPath(),
                      )
                      .toString();
                  }

                  var params = babelHelpers["extends"]({}, this.params);
                  delete params.channel;
                  var query = importDefault("QueryString").encode(params);
                  if (
                    this.element.getAttribute("fb-iframe-plugin-query") == query
                  ) {
                    importNamespace("Log").info(
                      "Skipping render: %s:%s %s",
                      this.ns,
                      this.tag,
                      query,
                    );
                    this.inform("render");
                    return;
                  }
                  this.element.setAttribute("fb-iframe-plugin-query", query);

                  this.subscribe("render", function subscribe_$1() {
                    importNamespace("sdk.Event").fire("iframeplugin:onload");
                    _this2.iframe.style.visibility = "visible";

                    if (!_this2.$IframePluginClass$p_isIframeResized) {
                      importNamespace("sdk.PluginUtils").collapseIframe(
                        _this2.iframe,
                      );
                    }
                  });

                  while (this.element.firstChild) {
                    this.element.removeChild(this.element.firstChild);
                  }
                  this.element.appendChild(this.iframeOptions.root);
                  var timeout = importDefault("sdk.UA").mobile() ? 120 : 45;
                  this.$IframePluginClass$p_timeoutID = window.setTimeout(
                    function window_setTimeout_$0() {
                      importNamespace("sdk.PluginUtils").collapseIframe(
                        _this2.iframe,
                      );
                      importNamespace("Log").warn(
                        "%s:%s failed to resize in %ss",
                        _this2.ns,
                        _this2.tag,
                        timeout,
                      );
                    },
                    timeout * 1000,
                  );

                  this.iframe = importDefault("sdk.createIframe")(
                    this.iframeOptions,
                  );
                  importNamespace("sdk.Event").fire("iframeplugin:create");

                  if (
                    importDefault("sdk.UA").mobile() ||
                    params.width === "auto"
                  ) {
                    if (this.useInlineHeightForMobile()) {
                      importNamespace("sdk.DOM").addCss(
                        this.element,
                        "fbiframe_widget_fluid",
                      );
                    }

                    if (!this.iframeOptions.width) {
                      ES("Object", "assign", false, this.element.style, {
                        display: "block",
                        width: "100%",
                        height: "auto",
                      });

                      ES(
                        "Object",
                        "assign",
                        false,
                        this.iframeOptions.root.style,
                        {
                          width: "100%",
                          height: "auto",
                        },
                      );

                      var iframeStyle = {
                        height: "auto",
                        position: "static",
                        width: "100%",
                      };

                      if (
                        importDefault("sdk.UA").iphone() ||
                        importDefault("sdk.UA").ipad()
                      ) {
                        ES("Object", "assign", false, iframeStyle, {
                          width: "220px",
                          minWidth: "100%",
                        });
                      }

                      ES(
                        "Object",
                        "assign",
                        false,
                        this.iframe.style,
                        iframeStyle,
                      );
                    }
                  }
                };
                _proto.getParams = function getParams() {
                  return this.params;
                };
                _proto.updateLift = function updateLift() {
                  var same =
                    this.iframe.style.width ===
                      this.iframeOptions.root.style.width &&
                    this.iframe.style.height ===
                      this.iframeOptions.root.style.height;
                  (same
                    ? importNamespace("sdk.DOM").removeCss
                    : importNamespace("sdk.DOM").addCss)(
                    this.iframe,
                    "fbiframe_widget_lift",
                  );
                };
                return IframePluginClass;
              })(importNamespace("sdk.Observable").Observable);
              exports["default"] = IframePluginClass;
            },
            98,
          );
          __d(
            "sdk.XFBML.MessengerCheckbox",
            ["FB", "IframePluginClass", "Log", "PluginAttrTypes", "sdk.XD"],
            function $module_sdk_XFBML_MessengerCheckbox(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function getIframeNameByParams(_ref) {
                var app_id = _ref.app_id,
                  page_id = _ref.page_id,
                  user_ref = _ref.user_ref;
                var selector =
                  '[page_id="' +
                  page_id +
                  '"][messenger_app_id="' +
                  app_id +
                  '"][user_ref="' +
                  user_ref +
                  '"] iframe';
                var element = document.querySelector(selector);

                return (
                  (element == null ? void 0 : element.getAttribute("name")) ||
                  null
                );
              }

              importDefault("FB").provide("CheckboxPlugin", {
                confirm: function confirm(params) {
                  var app_id = params.app_id,
                    page_id = params.page_id,
                    user_ref = params.user_ref;
                  var iframeName = getIframeNameByParams(params);

                  if (app_id == null) {
                    importNamespace("Log").warn(
                      "app_id is a required parameter.",
                    );
                    return;
                  }

                  if (page_id == null) {
                    importNamespace("Log").warn(
                      "page_id is a required parameter.",
                    );
                    return;
                  }

                  if (user_ref == null) {
                    importNamespace("Log").warn(
                      "user_ref is a required parameter.",
                    );
                    return;
                  }

                  if (iframeName == null) {
                    importNamespace("Log").warn(
                      "No matching checkbox for the app_id, page_id, and user_ref given.",
                    );
                    return;
                  }

                  importNamespace("sdk.XD").sendToFacebook(iframeName, {
                    method: "confirmCheckboxSubmission",
                    params: params,
                  });
                },
              });
              var MessengerCheckbox = (function (_IframePluginClass) {
                function MessengerCheckbox(elem, ns, tag, attr) {
                  return (
                    _IframePluginClass.call(this, elem, ns, tag, attr, {
                      fluid: true,
                      full_width: true,
                      mobile_fullsize: false,
                    }) || this
                  );
                }
                babelHelpers.inheritsLoose(
                  MessengerCheckbox,
                  _IframePluginClass,
                );
                var _proto = MessengerCheckbox.prototype;
                _proto.getParams = function getParams() {
                  var _importNamespace_PluginAttrTypes;
                  return {
                    messenger_app_id: (_importNamespace_PluginAttrTypes =
                      importNamespace("PluginAttrTypes")).string,
                    page_id: _importNamespace_PluginAttrTypes.string,
                    pixel_id: _importNamespace_PluginAttrTypes.string,
                    prechecked: _importNamespace_PluginAttrTypes.bool,
                    allow_login: _importNamespace_PluginAttrTypes.bool,
                    size: _importNamespace_PluginAttrTypes.string,
                    origin: _importNamespace_PluginAttrTypes.string,
                    user_ref: _importNamespace_PluginAttrTypes.string,
                    identity_match: _importNamespace_PluginAttrTypes.string,
                    center_align: _importNamespace_PluginAttrTypes.bool,
                    opt_in_type: _importNamespace_PluginAttrTypes.string,
                    promotional_frequency:
                      _importNamespace_PluginAttrTypes.string,
                    promotional_topic: _importNamespace_PluginAttrTypes.string,
                  };
                };
                return MessengerCheckbox;
              })(importDefault("IframePluginClass"));
              exports["default"] = MessengerCheckbox;
            },
            98,
          );
          __d(
            "sdk.XFBML.MessengerCheckboxWrapper",
            ["sdk.Observable", "sdk.XFBML.MessengerCheckbox"],
            function $module_sdk_XFBML_MessengerCheckboxWrapper(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var MessengerCheckboxWrapperPlugin =
                function MessengerCheckboxWrapperPlugin(
                  element,
                  ns,
                  tag,
                  attr,
                ) {
                  return new MessengerCheckboxWrapper(element, ns, tag, attr);
                };
              _c = MessengerCheckboxWrapperPlugin;
              var MessengerCheckboxWrapper = (function (_Observable) {
                function MessengerCheckboxWrapper(element, ns, tag, attr) {
                  var _this;
                  _this = _Observable.call(this) || this;
                  _this.$MessengerCheckboxWrapper$p_element = element;
                  _this.$MessengerCheckboxWrapper$p_ns = ns;
                  _this.$MessengerCheckboxWrapper$p_tag = tag;
                  _this.$MessengerCheckboxWrapper$p_attr = attr;
                  return _this;
                }
                babelHelpers.inheritsLoose(
                  MessengerCheckboxWrapper,
                  _Observable,
                );
                var _proto = MessengerCheckboxWrapper.prototype;
                _proto.process = function process() {
                  var _this2 = this;
                  this.$MessengerCheckboxWrapper$p_attr.should_use_new_domain = true;
                  this.$MessengerCheckboxWrapper$p_plugin = new (importDefault(
                    "sdk.XFBML.MessengerCheckbox",
                  ))(
                    this.$MessengerCheckboxWrapper$p_element,
                    this.$MessengerCheckboxWrapper$p_ns,
                    this.$MessengerCheckboxWrapper$p_tag,
                    this.$MessengerCheckboxWrapper$p_attr,
                  );
                  this.$MessengerCheckboxWrapper$p_plugin.subscribe(
                    "render",
                    function $MessengerCheckboxWrapper$p_plugin_subscribe_$1() {
                      _this2.inform("render");
                    },
                  );
                  this.$MessengerCheckboxWrapper$p_plugin.process();
                };
                return MessengerCheckboxWrapper;
              })(importNamespace("sdk.Observable").Observable);
              var _default = MessengerCheckboxWrapperPlugin;
              var _c;
              $RefreshReg$(_c, "MessengerCheckboxWrapperPlugin");
              exports["default"] = _default;
            },
            98,
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
              "sdk.createIframe",
            ],
            function $module_sdk_XFBML_Save(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var positionIntervalID;

              var Save = importDefault("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  var _this = this;

                  this.parent(elem, ns, tag, attr);
                  var isMobile = importDefault("sdk.UA").mobile();

                  this.subscribe(
                    "xd.savePluginGetBlankIframe",
                    function subscribe_$1(message) {
                      var darkOverlay;
                      var show = function show(e) {
                        if (e) {
                          importNamespace("sdk.DOM").removeCss(
                            e,
                            "fb_invisible",
                          );
                        }
                      };
                      var hide = function hide(e) {
                        if (e) {
                          importNamespace("sdk.DOM").addCss(e, "fb_invisible");
                        }
                      };

                      if (isMobile) {
                        darkOverlay =
                          importNamespace(
                            "sdk.DialogUtils",
                          ).setupNewDarkOverlay();
                        hide(darkOverlay);
                        importNamespace("sdk.Content").append(darkOverlay);
                        importNamespace("sdk.DialogUtils").addDoubleClickAction(
                          darkOverlay,
                          function DialogUtils_addDoubleClickAction_$1() {
                            return allNodes.forEach(hide);
                          },
                          5000,
                        );
                      }

                      var dialog = _this.setupNewIframeDialog(
                        ES("JSON", "parse", false, message.data),
                        message.fromIframe,
                      );
                      hide(dialog);
                      importNamespace("sdk.Content").append(dialog);

                      var allNodes = [dialog, darkOverlay];

                      var hideDialog = function hideDialog() {
                        allNodes.forEach(hide);
                        importNamespace("sdk.DialogUtils").onDialogHideCleanup(
                          isMobile,
                        );
                        window.clearInterval(positionIntervalID);
                      };

                      var idleEvent;

                      _this.subscribe(
                        "xd.savePluginShowIframe",
                        function _this_subscribe_$1() {
                          importNamespace("sdk.Event").fire(
                            "savePlugin:hideDialog",
                          );
                          allNodes.forEach(show);

                          _this.positionOnScreen(dialog, darkOverlay);

                          if (!isMobile && !idleEvent) {
                            idleEvent = importNamespace(
                              "sdk.DialogUtils",
                            ).addIdleDesktopAction(dialog, hideDialog, 7000);
                          }
                        },
                      );

                      _this.subscribe(
                        "xd.savePluginHideIframe",
                        function _this_subscribe_$1() {
                          return hideDialog();
                        },
                      );

                      importNamespace("sdk.Event").subscribe(
                        "savePlugin:hideDialog",
                        function Event_subscribe_$1() {
                          return hideDialog();
                        },
                      );

                      var searchIframeTimer = window.setInterval(
                        function window_setInterval_$0() {
                          var searchIframe = document.getElementsByName(
                            message.fromIframe,
                          );
                          if (searchIframe.length === 0) {
                            window.clearInterval(searchIframeTimer);
                            hideDialog();
                            allNodes.forEach(
                              function allNodes_forEach_$0(elem) {
                                elem && elem.parentNode.removeChild(elem);
                              },
                            );
                          }
                        },
                        500,
                      );
                    },
                  );
                },

                positionOnScreen: function positionOnScreen(
                  dialog,
                  darkOverlay,
                ) {
                  var isMobile = importDefault("sdk.UA").mobile();
                  if (isMobile) {
                    var centerMobile = function centerMobile(
                      dialog,
                      darkOverlay,
                    ) {
                      if (darkOverlay != null) {
                        importNamespace(
                          "sdk.DialogUtils",
                        ).setDialogPositionToCenter(darkOverlay, isMobile);
                      }
                      importNamespace(
                        "sdk.DialogUtils",
                      ).setDialogPositionToCenter(dialog, isMobile);
                    };

                    centerMobile(dialog, darkOverlay);
                    importNamespace(
                      "sdk.DialogUtils",
                    ).addMobileOrientationChangeAction(
                      function DialogUtils_addMobileOrientationChangeAction_$0(
                        e,
                      ) {
                        centerMobile(dialog, darkOverlay);
                      },
                    );

                    positionIntervalID = window.setInterval(
                      function window_setInterval_$0() {
                        return centerMobile(dialog, darkOverlay);
                      },
                      100,
                    );
                  } else {
                    importNamespace("sdk.DOM").setStyle(
                      dialog,
                      "position",
                      "fixed",
                    );
                    importNamespace("sdk.DOM").setStyle(dialog, "top", "20px");
                    importNamespace("sdk.DOM").setStyle(
                      dialog,
                      "right",
                      "20px",
                    );
                  }
                },

                getOverlayIFrameURL: function getOverlayIFrameURL() {
                  return (
                    importNamespace("UrlMap").resolve("www") +
                    (importDefault("sdk.Runtime").getIsVersioned()
                      ? "/" + importDefault("sdk.Runtime").getVersion()
                      : "") +
                    "/plugins/save/overlay" +
                    "?app_id=" +
                    importDefault("sdk.Runtime").getClientID()
                  );
                },

                setupNewIframeDialog: function setupNewIframeDialog(
                  data,
                  fromIframe,
                ) {
                  var _this2 = this;
                  var created =
                    importNamespace("sdk.DialogUtils").setupNewDialog();

                  var onloadFunc = function onloadFunc() {
                    importNamespace("sdk.XD").sendToFacebook(fromIframe, {
                      method: "saveOverlayIFrameAck",
                      params: ES("JSON", "stringify", false, {
                        name: "overlay_" + _this2._iframeOptions.name,
                      }),
                    });
                  };

                  importDefault("sdk.createIframe")({
                    url: this.getOverlayIFrameURL(),

                    name: "overlay_" + this._iframeOptions.name,
                    root: created.contentRoot,
                    tabindex: -1,

                    onload: ES(onloadFunc, "bind", true, this),
                  });
                  importNamespace("sdk.DOM").addCss(
                    created.contentRoot,
                    "fb_dialog_iframe",
                  );

                  ES(
                    "Object",
                    "assign",
                    false,
                    created.dialogElement.style,
                    data.style || {},
                  );
                  importNamespace("sdk.DOM").setStyle(
                    created.dialogElement,
                    "width",
                    data.width + "px",
                  );
                  importNamespace("sdk.DOM").setStyle(
                    created.dialogElement,
                    "height",
                    data.height + "px",
                  );
                  data.classList.forEach(
                    function data_classList_forEach_$0(cl) {
                      return importNamespace("sdk.DOM").addCss(
                        created.dialogElement,
                        cl,
                      );
                    },
                  );

                  importNamespace("sdk.DOM").removeCss(
                    created.dialogElement,
                    "fb_dialog_advanced",
                  );
                  return created.dialogElement;
                },

                getParams: function getParams() {
                  return {
                    uri: "url",
                    url_category: "string",
                    size: "string",
                  };
                },
              });
              var _default = Save;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.XFBML.ShareButton",
            ["IframePlugin"],
            function $module_sdk_XFBML_ShareButton(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var ShareButton = importDefault("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);
                },

                getParams: function getParams() {
                  return {
                    href: "url",
                    layout: "string",
                    mobile_iframe: "bool",
                    type: "string",
                    size: "string",
                  };
                },
              });
              var _default = ShareButton;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.XFBML.Video",
            [
              "Assert",
              "IframePlugin",
              "ObservableMixin",
              "sdk.Event",
              "sdk.XD",
            ],
            function $module_sdk_XFBML_Video(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var VideoCache = (function () {
                function VideoCache(initData) {
                  this.$VideoCache$p_isMuted = initData.isMuted;
                  this.$VideoCache$p_volume = initData.volume;
                  this.$VideoCache$p_timePosition = initData.timePosition;
                  this.$VideoCache$p_duration = initData.duration;
                }
                var _proto = VideoCache.prototype;
                _proto.update = function update(data) {
                  if (data.isMuted !== undefined) {
                    this.$VideoCache$p_isMuted = data.isMuted;
                  }
                  if (data.volume !== undefined) {
                    this.$VideoCache$p_volume = data.volume;
                  }
                  if (data.timePosition !== undefined) {
                    this.$VideoCache$p_timePosition = data.timePosition;
                  }
                  if (data.duration !== undefined) {
                    this.$VideoCache$p_duration = data.duration;
                  }
                };
                _proto.isMuted = function isMuted() {
                  return this.$VideoCache$p_isMuted;
                };
                _proto.getVolume = function getVolume() {
                  return this.$VideoCache$p_isMuted
                    ? 0
                    : this.$VideoCache$p_volume;
                };
                _proto.getCurrentPosition = function getCurrentPosition() {
                  return this.$VideoCache$p_timePosition;
                };
                _proto.getDuration = function getDuration() {
                  return this.$VideoCache$p_duration;
                };
                return VideoCache;
              })();
              var VideoController = (function () {
                function VideoController(
                  iframeName,

                  observableMixin,
                  cache,
                ) {
                  this.$VideoController$p_iframeName = iframeName;
                  this.$VideoController$p_sharedObservable = observableMixin;
                  this.$VideoController$p_cache = cache;
                }
                var _proto2 = VideoController.prototype;
                _proto2.play = function play() {
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "play",
                      params: ES("JSON", "stringify", false, {}),
                    },
                  );
                };
                _proto2.pause = function pause() {
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "pause",
                      params: ES("JSON", "stringify", false, {}),
                    },
                  );
                };
                _proto2.seek = function seek(target) {
                  importDefault("Assert").isNumber(target, "Invalid argument");
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "seek",
                      params: ES("JSON", "stringify", false, {
                        target: target,
                      }),
                    },
                  );
                };
                _proto2.mute = function mute() {
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "mute",
                      params: ES("JSON", "stringify", false, {}),
                    },
                  );
                };
                _proto2.unmute = function unmute() {
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "unmute",
                      params: ES("JSON", "stringify", false, {}),
                    },
                  );
                };
                _proto2.setVolume = function setVolume(volume) {
                  importDefault("Assert").isNumber(volume, "Invalid argument");
                  importNamespace("sdk.XD").sendToFacebook(
                    this.$VideoController$p_iframeName,
                    {
                      method: "setVolume",
                      params: ES("JSON", "stringify", false, {
                        volume: volume,
                      }),
                    },
                  );
                };
                _proto2.isMuted = function isMuted() {
                  return this.$VideoController$p_cache.isMuted();
                };
                _proto2.getVolume = function getVolume() {
                  return this.$VideoController$p_cache.getVolume();
                };
                _proto2.getCurrentPosition = function getCurrentPosition() {
                  return this.$VideoController$p_cache.getCurrentPosition();
                };
                _proto2.getDuration = function getDuration() {
                  return this.$VideoController$p_cache.getDuration();
                };
                _proto2.subscribe = function subscribe(event, callback) {
                  var _this = this;
                  importDefault("Assert").isString(event, "Invalid argument");
                  importDefault("Assert").isFunction(
                    callback,
                    "Invalid argument",
                  );
                  this.$VideoController$p_sharedObservable.subscribe(
                    event,
                    callback,
                  );
                  return {
                    release: function release() {
                      _this.$VideoController$p_sharedObservable.unsubscribe(
                        event,
                        callback,
                      );
                    },
                  };
                };
                return VideoController;
              })();

              var Video = importDefault("IframePlugin").extend({
                constructor: function constructor(elem, ns, tag, attr) {
                  this.parent(elem, ns, tag, attr);

                  this._videoController = null;

                  this._sharedObservable = null;

                  this._sharedVideoCache = null;

                  this.subscribe(
                    "xd.onVideoAPIReady",
                    function subscribe_$1(msg) {
                      this._sharedObservable = new (importDefault(
                        "ObservableMixin",
                      ))();
                      this._sharedVideoCache = new VideoCache(
                        ES("JSON", "parse", false, msg.data),
                      );
                      this._videoController = new VideoController(
                        this._iframeOptions.name,
                        this._sharedObservable,
                        this._sharedVideoCache,
                      );
                      importNamespace("sdk.Event").fire("xfbml.ready", {
                        type: "video",
                        id: attr.id,
                        instance: this._videoController,
                      });
                    },
                  );

                  this.subscribe("xd.stateChange", function subscribe_$1(msg) {
                    this._sharedObservable.inform(msg.state);
                  });

                  this.subscribe(
                    "xd.cachedStateUpdateRequest",
                    function subscribe_$1(msg) {
                      this._sharedVideoCache.update(
                        ES("JSON", "parse", false, msg.data),
                      );
                    },
                  );
                },

                getParams: function getParams() {
                  return {
                    allowfullscreen: "bool",
                    autoplay: "bool",
                    controls: "bool",
                    href: "url",
                    show_captions: "bool",
                    show_text: "bool",
                  };
                },

                getConfig: function getConfig() {
                  return {
                    fluid: true,
                    full_width: true,
                  };
                },
              });
              var _default = Video;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.CustomTags",
            [
              "sdk.XFBML.Comments",
              "sdk.XFBML.CommentsCount",
              "sdk.XFBML.LWIAdsCreation",
              "sdk.XFBML.LWIAdsInsights",
              "sdk.XFBML.LoginButton",
              "sdk.XFBML.MessengerCheckboxWrapper",
              "sdk.XFBML.Save",
              "sdk.XFBML.ShareButton",
              "sdk.XFBML.Video",
            ],
            function $module_sdk_CustomTags(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var CustomTags = {
                comments: require("sdk.XFBML.Comments"),
                comments_count: require("sdk.XFBML.CommentsCount"),
                login_button: require("sdk.XFBML.LoginButton"),
                lwi_ads_creation: require("sdk.XFBML.LWIAdsCreation"),
                lwi_ads_insights: require("sdk.XFBML.LWIAdsInsights"),
                messenger_checkbox: require("sdk.XFBML.MessengerCheckboxWrapper"),
                save: require("sdk.XFBML.Save"),
                share_button: require("sdk.XFBML.ShareButton"),
                video: require("sdk.XFBML.Video"),
              };
              var _default = CustomTags;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "sdk.XFBML-public",
            [
              "AssertionError",
              "FB",
              "IframePlugin",
              "PluginConfig",
              "PluginTags",
              "XFBML",
              "sdk.CustomTags",
              "sdk.Event",
              "sdk.domReady",
              "sdk.feature",
              "wrapFunction",
            ],
            function $module_sdk_XFBML_public(
              global,
              require,
              requireDynamic,
              requireLazy,
              module,
              exports,
            ) {
              function init() {
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
                  },
                });

                require("XFBML").subscribe(
                  "parse",
                  function XFBML_subscribe_$1(counts) {
                    return require("sdk.Event").fire(
                      "xfbml.parse",
                      counts[0],
                      counts[1],
                    );
                  },
                );
                require("XFBML").subscribe(
                  "render",
                  function XFBML_subscribe_$1(counts) {
                    return require("sdk.Event").fire(
                      "xfbml.render",
                      counts[0],
                      counts[1],
                    );
                  },
                );

                require("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1(options) {
                    if (options.xfbml) {
                      window.setTimeout(
                        require("wrapFunction")(
                          ES(
                            require("sdk.domReady"),
                            "bind",
                            true,
                            null,
                            require("XFBML").parse,
                          ),
                          "entry",
                          "init:post:xfbml.parse",
                        ),
                        0,
                      );
                    }
                  },
                );

                try {
                  if (document.namespaces && !document.namespaces.item.fb) {
                    document.namespaces.add("fb");
                  }
                } catch (_unused) {}
              }

              function initXFBMLBasedSocialPlugin() {
                var blocklist = require("sdk.feature")(
                  "plugin_tags_blocklist",
                  [],
                );

                Object.keys(require("PluginTags")).forEach(
                  function forEach_$0(tag) {
                    if (blocklist.indexOf(tag) !== -1) {
                      return;
                    }
                    require("XFBML").registerTag({
                      xmlns: "fb",
                      localName: tag.replace(/_/g, "-"),

                      ctor: require("IframePlugin").withParams(
                        require("PluginTags")[tag],
                        require("PluginConfig")[tag],
                      ),
                    });
                  },
                );

                Object.keys(require("sdk.CustomTags")).forEach(
                  function forEach_$0(tag) {
                    if (blocklist.indexOf(tag) !== -1) {
                      return;
                    }
                    require("XFBML").registerTag({
                      xmlns: "fb",
                      localName: tag.replace(/_/g, "-"),
                      ctor: require("sdk.CustomTags")[tag],
                    });
                  },
                );
              }

              var SDKXFBML = {
                init: init,
                initXFBMLBasedSocialPlugin: initXFBMLBasedSocialPlugin,
              };
              var _default = SDKXFBML;
              exports["default"] = _default;
            },
            66,
          );
          __d(
            "sdk.api-public",
            [
              "ApiClient",
              "FB",
              "sdk.Runtime",
              "sdk.Scribe",
              "sdk.api",
              "sdk.feature",
            ],
            function $module_sdk_api_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              var shouldLogResponseError = importDefault("sdk.feature")(
                "should_log_response_error",
                false,
              );

              var currentAccessToken;

              function init() {
                var _importDefault_ApiClient;
                importDefault("sdk.Runtime").subscribe(
                  "ClientID.change",
                  function Runtime_subscribe_$1(value) {
                    return importDefault("ApiClient").setClientID(value);
                  },
                );

                importDefault("sdk.Runtime").subscribe(
                  "AccessToken.change",
                  function Runtime_subscribe_$1(value) {
                    currentAccessToken = value;
                    importDefault("ApiClient").setAccessToken(value);
                  },
                );

                (_importDefault_ApiClient =
                  importDefault("ApiClient")).setDefaultParams({
                  sdk: "joey",
                });

                _importDefault_ApiClient.subscribe(
                  "request.complete",

                  function ApiClient_subscribe_$1(
                    endpoint,
                    method,
                    params,
                    response,
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
                        importDefault("sdk.Runtime").getAccessToken()
                    ) {
                      importDefault("sdk.Runtime").setAccessToken(null);
                    }
                  },
                );

                _importDefault_ApiClient.subscribe(
                  "request.complete",
                  function ApiClient_subscribe_$1(
                    endpoint,
                    method,
                    params,
                    response,
                  ) {
                    if (
                      ((endpoint == "/me/permissions" && method === "delete") ||
                        (endpoint == "/restserver.php" &&
                          params.method == "Auth.revokeAuthorization")) &&
                      response === true
                    ) {
                      importDefault("sdk.Runtime").setAccessToken(null);
                    }
                  },
                );

                _importDefault_ApiClient.subscribe(
                  "request.error",

                  function ApiClient_subscribe_$1(
                    endpoint,
                    method,
                    params,
                    response,
                  ) {
                    if (
                      shouldLogResponseError &&
                      response.error.type === "http"
                    ) {
                      importNamespace("sdk.Scribe").log("jssdk_error", {
                        appId: importDefault("sdk.Runtime").getClientID(),
                        error: "transport",
                        extra: {
                          name: "transport",

                          message:
                            ES("JSON", "stringify", false, response.error) +
                            " from " +
                            endpoint +
                            " , " +
                            method,
                        },
                      });
                    }
                  },
                );
                importDefault("FB").provide("", {
                  api: importDefault("sdk.api"),
                });
              }

              var SDKGraphAPI = {
                init: init,
              };
              var _default = SDKGraphAPI;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.MBasicInitializer",
            [
              "UrlMap",
              "sdk.DOM",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
              "sdk.fbt",
            ],
            function $module_sdk_MBasicInitializer(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
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
                    importNamespace("sdk.DOM").getAttr(share_button, "href") ||
                    window.location.href;
                  var dialog = new (importDefault("sdk.URI"))(
                    importNamespace("UrlMap").resolve("m"),
                  );
                  dialog.setPath("/dialog/share");
                  dialog.addQueryData("href", encodeURI(href));
                  dialog.addQueryData(
                    "app_id",
                    importDefault("sdk.Runtime").getClientID(),
                  );
                  dialog.addQueryData("mbasic_link", 1);
                  var link = document.createElement("a");

                  link.style = "display:inline-block; zoom:1;";
                  link.textContent =
                    importDefault("sdk.fbt")._("Share to Facebook");

                  link.setAttribute("href", dialog.toString());
                  link.setAttribute("target", "_blank");
                  share_button_container.insertBefore(link, share_button);
                  share_button_container.removeChild(share_button);
                }

                ES(
                  "Array",
                  "from",
                  false,
                  document.getElementsByTagName("fb:share-button"),
                ).forEach(function forEach_$0(button) {
                  return replaceWithLink(button);
                });
                ES(
                  "Array",
                  "from",
                  false,
                  document.getElementsByClassName("fb-share-button"),
                ).forEach(function forEach_$0(button) {
                  return replaceWithLink(button);
                });
              };

              function init() {
                if (!importDefault("sdk.UA").mBasic()) {
                  return;
                }
                sharePluginInitialize();
              }
              exports.init = init;
            },
            226,
          );
          __d(
            "sdk.init",
            [
              "Log",
              "ManagedError",
              "sdk.Cookie",
              "sdk.Event",
              "sdk.MBasicInitializer",
              "sdk.PlatformVersioning",
              "sdk.Runtime",
              "sdk.UA",
              "sdk.URI",
            ],
            function $module_sdk_init(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              function parseAppId(appId) {
                var looksValid =
                  (typeof appId === "number" && appId > 0) ||
                  (typeof appId === "string" &&
                    /^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(appId));
                if (looksValid) {
                  return appId.toString();
                }
                importNamespace("Log").warn(
                  "Invalid App Id: Must be a number or numeric string representing " +
                    "the application id.",
                );
                return null;
              }

              function init(options) {
                if (importDefault("sdk.Runtime").getInitialized()) {
                  importNamespace("Log").warn(
                    "FB.init has already been called - this could indicate a problem",
                  );
                }

                if (importDefault("sdk.Runtime").getIsVersioned()) {
                  if (
                    Object.prototype.toString.call(options) !==
                    "[object Object]"
                  ) {
                    throw new (importDefault("ManagedError"))(
                      "Invalid argument",
                    );
                  }

                  if (options.authResponse) {
                    throw new (importDefault("ManagedError"))(
                      "Setting authResponse is not supported",
                    );
                  }

                  if (!options.version) {
                    options.version = new (importDefault("sdk.URI"))(
                      location.href,
                    ).getQueryData().sdk_version;
                  }

                  importNamespace("sdk.PlatformVersioning").assertValidVersion(
                    options.version,
                  );
                  importDefault("sdk.Runtime").setVersion(options.version);
                } else {
                  if (/number|string/.test(typeof options)) {
                    importNamespace("Log").warn(
                      "FB.init called with invalid parameters",
                    );
                    options = { apiKey: options };
                  }

                  if (options.status == null) {
                    options.legacyStatusInit = true;
                  }

                  options = babelHelpers["extends"](
                    {
                      status: true,
                    },
                    options || {},
                  );
                }

                var appId = parseAppId(options.appId || options.apiKey);
                if (appId !== null) {
                  importDefault("sdk.Runtime").setClientID(appId);
                }

                if ("scope" in options) {
                  importDefault("sdk.Runtime").setScope(options.scope);
                }

                if (options.cookie) {
                  importDefault("sdk.Runtime").setUseCookie(true);
                  if (typeof options.cookie === "string") {
                    importNamespace("sdk.Cookie").setDomain(options.cookie);
                  }
                }

                if (
                  options.localStorage === false ||
                  options.localStorage === "false"
                ) {
                  importDefault("sdk.Runtime").setUseLocalStorage(false);
                }

                if (options.kidDirectedSite) {
                  importDefault("sdk.Runtime").setKidDirectedSite(true);
                }

                if (options.useFamilyLogin) {
                  importDefault("sdk.Runtime").setShouldLoadFamilyLogin(true);
                }

                if (
                  options.autoLogAppEvents === "1" ||
                  options.autoLogAppEvents === "true"
                ) {
                  options.autoLogAppEvents = true;
                }

                if (options.ab) {
                  importDefault("sdk.Runtime").setSDKAB(options.ab);
                }

                importDefault("sdk.Runtime").setInitialized(true);

                if (importDefault("sdk.UA").mBasic()) {
                  importNamespace("sdk.MBasicInitializer").init();
                }

                importNamespace("sdk.Event").fire("init:post", options);
              }
              exports["default"] = init;
            },
            98,
          );
          __d(
            "sdk.init-public",
            [
              "FB",
              "QueryString",
              "sdk.AppEvents",
              "sdk.ErrorHandling",
              "sdk.Event",
              "sdk.Frictionless",
              "sdk.XD",
              "sdk.init",
            ],
            function $module_sdk_init_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function initialize() {
                require("sdk.XD");
                require("sdk.AppEvents");
                require("sdk.Frictionless");

                window.setTimeout(function window_setTimeout_$0() {
                  var pattern =
                    /(connect\.facebook\.net|\.facebook\.com\/assets.php|\.facebook\.net\/assets.php).*?#(.*)/;
                  ES(
                    "Array",
                    "from",
                    false,
                    window.document.getElementsByTagName("script"),
                  ).forEach(function forEach_$0(script) {
                    if (script.src) {
                      var match = pattern.exec(script.src);
                      if (match) {
                        var opts = {};
                        var decoded = importDefault("QueryString").decode(
                          match[2],
                        );
                        for (var key in decoded) {
                          if (
                            Object.prototype.hasOwnProperty.call(decoded, key)
                          ) {
                            var val = decoded[key];
                            if (val === "0") {
                              opts[key] = 0;
                            } else {
                              opts[key] = val;
                            }
                          }
                        }

                        importDefault("sdk.init")(opts);
                      }
                    }
                  });

                  if (window.fbAsyncInit && !window.fbAsyncInit.hasRun) {
                    importNamespace("sdk.Event").fire("init:asyncstart");

                    window.fbAsyncInit.hasRun = true;

                    importDefault("sdk.ErrorHandling").unguard(
                      window.fbAsyncInit,
                    )();
                  }
                }, 0);
                importDefault("FB").provide("", {
                  init: importDefault("sdk.init"),
                });

                importNamespace("sdk.Event").subscribe(
                  "init:post",
                  function Event_subscribe_$1() {
                    if (window.__buffer !== undefined) {
                      window.__buffer.replay();
                    }
                  },
                );

                window.setTimeout(function window_setTimeout_$0() {
                  if (window.__buffer && window.__buffer.opts) {
                    importDefault("sdk.init")(window.__buffer.opts);
                  }
                }, 0);
              }

              var SDKInit = { initialize: initialize };
              var _default = SDKInit;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "sdk.Time",
            ["Log", "sdk.Impressions", "sdk.Runtime", "sdk.URI", "sdk.feature"],
            function $module_sdk_Time(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              var perf = window.performance;

              var couldLog =
                perf && "now" in perf && "getEntriesByName" in perf;

              var startTime;
              var data = {};

              function recordBootload() {
                function isFileSPINServedJSSDK(resource, SDKUrl) {
                  var doesResourceMatchJSSDK = false;
                  try {
                    var resourceURI = new (importDefault("sdk.URI"))(
                      resource.name,
                    );
                    var domain = resourceURI.getDomain();
                    var path = resourceURI.getPath();

                    doesResourceMatchJSSDK =
                      domain === SDKUrl.getDomain() &&
                      ES(path, "includes", true, "/rsrc.php/");
                  } catch (e) {
                    importNamespace("Log").error(
                      "Malformed URL was passed to the URL constructor: Error %s occured",
                      e.message,
                    );
                  }
                  return doesResourceMatchJSSDK;
                }

                function getPerformanceResourceTimings(SDKUrl) {
                  try {
                    var timings = perf
                      .getEntriesByType("resource")
                      .filter(function filter_$0(t) {
                        return isFileSPINServedJSSDK(
                          t,
                          new (importDefault("sdk.URI"))(SDKUrl),
                        );
                      });

                    var isJSSDKServedFromSPIN = timings.length >= 1;

                    if (!isJSSDKServedFromSPIN) {
                      timings = perf
                        .getEntriesByType("resource")
                        .filter(function filter_$0(t) {
                          return ES(t.name, "startsWith", true, SDKUrl);
                        });
                    }
                    return timings;
                  } catch (e) {
                    importNamespace("Log").error(
                      "Malformed URL was passed to the URL constructor: Error %s occured",
                      e.message,
                    );
                  }
                }
                if (couldLog) {
                  var sdkurl = importDefault("sdk.Runtime").getSDKUrl();
                  var bootloadedTiming = null;
                  var timing = getPerformanceResourceTimings(sdkurl);

                  if (timing && timing.length > 1) {
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
                            sdkurl + "?hash=",
                          );
                        },
                      );

                      if (!bootId) {
                        timing = null;
                      } else {
                        bootloadedTiming = timing.splice(bootId)[0];

                        timing = timing[0];
                      }
                    }
                  } else if (timing && timing.length === 1) {
                    var frame = document.getElementById(
                      "facebook-jssdk-iframe",
                    );
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
                    importNamespace("Log").debug(
                      "sdkperf: it took %s ms and %s bytes to load %s",
                      data.fetchTime,
                      data.transferSize,
                      sdkurl,
                    );
                    startTime = timing.startTime;

                    data.ns = importDefault("sdk.Runtime").getSDKNS();

                    if (startTime) {
                      window.setTimeout(function window_setTimeout_$0() {
                        var shouldLog = importDefault("sdk.feature")(
                          "log_perf",
                          false,
                        );
                        var testId = importDefault("sdk.Runtime").getSDKAB();
                        if (testId) {
                          data.ab = testId;
                          shouldLog = true;
                        }
                        if (shouldLog) {
                          importNamespace("sdk.Impressions").log(116, data);
                        }
                      }, 10000);
                    }
                  }
                }
              }

              function log(key) {
                if (!couldLog || !startTime) {
                  return;
                }
                data[key] = Math.round(perf.now() - startTime);
                importNamespace("Log").debug(
                  "sdkperf: %s logged after %s ms",
                  key,
                  data[key],
                );
              }
              exports.recordBootload = recordBootload;
              exports.log = log;
            },
            98,
          );
          __d(
            "sdk.time-public",
            ["runOnce", "sdk.Event", "sdk.Time"],
            function $module_sdk_time_public(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              module,
              exports,
            ) {
              "use strict";

              function init() {
                var _importNamespace_sdkEvent;
                importNamespace("sdk.Time").recordBootload();

                (_importNamespace_sdkEvent =
                  importNamespace("sdk.Event")).subscribe(
                  "init:post",
                  function Event_subscribe_$1() {
                    importNamespace("sdk.Time").log("init");
                  },
                );

                _importNamespace_sdkEvent.subscribe(
                  "init:asyncstart",
                  function Event_subscribe_$1() {
                    importNamespace("sdk.Time").log("asyncstart");
                  },
                );

                _importNamespace_sdkEvent.subscribe(
                  "iframeplugin:create",
                  importDefault("runOnce")(function runOnce_$0() {
                    return importNamespace("sdk.Time").log("pluginframe");
                  }),
                );

                _importNamespace_sdkEvent.subscribe(
                  "iframeplugin:onload",
                  importDefault("runOnce")(function runOnce_$0() {
                    return importNamespace("sdk.Time").log("ttfp");
                  }),
                );
              }

              var SDKTime = { init: init };
              var _default = SDKTime;
              exports["default"] = _default;
            },
            98,
          );
          __d(
            "legacy:fb.sdk.index",
            [
              "FB",
              "sdk.AppEvents-public",
              "sdk.Auth-public",
              "sdk.Canvas-public",
              "sdk.Event-public",
              "sdk.Frictionless-public",
              "sdk.GamingServices-public",
              "sdk.Runtime",
              "sdk.XFBML-public",
              "sdk.api-public",
              "sdk.init-public",
              "sdk.time-public",
              "sdk.ui",
            ],
            function $module_legacy_fb_sdk_index(
              global,
              require,
              importDefault,
              importNamespace,
              requireLazy,
              __DO_NOT_USE__module,
              __DO_NOT_USE__exports,
            ) {
              var _importDefault_sdkCanvaspublic;

              importDefault("sdk.api-public").init();
              importDefault("sdk.AppEvents-public").init();
              importDefault("sdk.Auth-public").init();
              (_importDefault_sdkCanvaspublic =
                importDefault("sdk.Canvas-public")).init();
              _importDefault_sdkCanvaspublic.initCanvasPlugin();
              _importDefault_sdkCanvaspublic.initCanvasPrefetcher();
              _importDefault_sdkCanvaspublic.initCanvasPresence();
              importDefault("sdk.Event-public").init();
              importDefault("sdk.Frictionless-public").init();
              importDefault("sdk.GamingServices-public").init();
              importDefault("sdk.init-public").initialize();
              importDefault("sdk.time-public").init();
              importDefault("FB").provide("", { ui: importDefault("sdk.ui") });
              importDefault("sdk.XFBML-public").init();
              importDefault("sdk.XFBML-public").initXFBMLBasedSocialPlugin();
              importDefault("sdk.Runtime").setIsVersioned(true);
            },
            35,
          );

          if (window.FB && window.FB.__buffer) {
            window.__buffer = babelHelpers["extends"]({}, window.FB.__buffer);
          }
        }
      }).call(global);
    })();
} catch (__fb_err) {
  var __fb_i = new Image();
  __fb_i.crossOrigin = "anonymous";
  __fb_i.dataset.testid = "fbSDKErrorReport";
  __fb_i.src =
    "https://www.facebook.com/platform/scribe_endpoint.php/?c=jssdk_error&m=" +
    encodeURIComponent(
      '{"error":"LOAD", "extra": {"name":"' +
        __fb_err.name +
        '","line":"' +
        (__fb_err.lineNumber || __fb_err.line) +
        '","script":"' +
        (__fb_err.fileName ||
          __fb_err.sourceURL ||
          __fb_err.script ||
          "debug.js") +
        '","stack":"' +
        (__fb_err.stackTrace || __fb_err.stack) +
        '","revision":"1024796659","namespace":"FB","message":"' +
        __fb_err.message +
        '"}}',
    );
  document.body.appendChild(__fb_i);
}
