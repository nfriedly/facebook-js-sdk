/*1616146151,,JIT Construction: v1003479826,en_US*/

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
try {(window.FB && !window.FB.__buffer) || (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 1;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __buffer = window.FB && window.FB.__buffer;    var __w, __t;    var undefined;    with (this) {      /**
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


(function(){
var funcCalls={};

var createMeta=function createMeta(type,signature){
if(!type&&!signature){
return null;
}

var meta={};
if(typeof type!=="undefined"){
meta.type=type;
}

if(typeof signature!=="undefined"){
meta.signature=signature;
}

return meta;
};

var getMeta=function getMeta(name,params){
return createMeta(
name&&/^[A-Z]/.test(name)?name:undefined,
params&&(params.params&&params.params.length||params.returns)?
"function("+(
params.params?params.params.map(function params_params_map_$0(param){
return /\?/.test(param)?
"?"+param.replace("?",""):
param;
}).join(","):"")+
")"+(
params.returns?":"+params.returns:""):
undefined);

};

var noopAnnotator=function noopAnnotator(fn,funcMeta,params){
return fn;
};

var genericAnnotator=function genericAnnotator(fn,funcMeta,params){
if("sourcemeta"in __transform_includes){
fn.__SMmeta=funcMeta;
}

if("typechecks"in __transform_includes){
var meta=getMeta(funcMeta?funcMeta.name:undefined,params);
if(meta){
__w(fn,meta);
}
}
return fn;
};

var noopBodyWrapper=function noopBodyWrapper(scope,args,fn){
return fn.apply(scope,args);
};

var typecheckBodyWrapper=function typecheckBodyWrapper(scope,args,fn,params){
if(params&&params.params){
__t.apply(scope,params.params);
}

var result=fn.apply(scope,args);

if(params&&params.returns){
__t([result,params.returns]);
}

return result;
};

var codeUsageBodyWrapper=function codeUsageBodyWrapper(scope,args,fn,params,funcMeta){
if(funcMeta){
if(!funcMeta.callId){


funcMeta.callId=funcMeta.module+":"+(
funcMeta.line||0)+":"+(
funcMeta.column||0);
}
var key=funcMeta.callId;
funcCalls[key]=(funcCalls[key]||0)+1;
}
return fn.apply(scope,args);
};


if(typeof __transform_includes==="undefined"){
__annotator=noopAnnotator;
__bodyWrapper=noopBodyWrapper;
}else{
__annotator=genericAnnotator;

if("codeusage"in __transform_includes){
__annotator=noopAnnotator;
__bodyWrapper=codeUsageBodyWrapper;
__bodyWrapper.getCodeUsage=function(){return funcCalls;};
__bodyWrapper.clearCodeUsage=function(){funcCalls={};};
}else if("typechecks"in __transform_includes){
__bodyWrapper=__DEV__?typecheckBodyWrapper:noopBodyWrapper;
}else{
__bodyWrapper=noopBodyWrapper;
}
}
})();
__t=function(x){return x[0]};__w=function(x){return x};
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
 * @providesInline commonjs-require-lite
 * @typechecks
 * @format
 */

var require,__d;
(function(global){
var map={},
resolved={};
var defaultDeps=[
"global",
"require",
"requireDynamic",
"requireLazy",
"module",
"exports"];


require=function(id,soft){
if(Object.prototype.hasOwnProperty.call(resolved,id)){
return resolved[id];
}
if(!Object.prototype.hasOwnProperty.call(map,id)){
if(soft){
return null;
}
throw new Error("Module "+id+" has not been defined");
}
var module=map[id],
deps=module.deps,
length=module.factory.length,
dep,
args=[];

for(var i=0;i<length;i++){
switch(deps[i]){
case"module":
dep=module;
break;
case"exports":
dep=module.exports;
break;
case"global":
dep=global;
break;
case"require":
dep=require;
break;
case"requireDynamic":
dep=null;
break;
case"requireLazy":
dep=null;
break;
default:
dep=require.call(null,deps[i]);}

args.push(dep);
}
module.factory.apply(global,args);
resolved[id]=module.exports;
return module.exports;
};

__d=function(
id,
deps,
factory,
_special)
{
if(typeof factory==="function"){
map[id]={
factory:factory,
deps:defaultDeps.concat(deps),
exports:{}};



if(_special===3){
require.call(null,id);
}
}else{
resolved[id]=factory;
}
};

global.$RefreshReg$=function(){};
global.$RefreshSig$=function(){return function(type){return type;};};
})(this);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5Array",[],(function $module_ES5Array(global,require,requireDynamic,requireLazy,module,exports){

var ES5Array={};

ES5Array.isArray=function(object){
return Object.prototype.toString.call(object)=="[object Array]";
};

module.exports=ES5Array;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5ArrayPrototype",[],(function $module_ES5ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){



var ES5ArrayPrototype={};




ES5ArrayPrototype.map=function(func,context){
if(typeof func!=="function"){
throw new TypeError();
}

var ii;
var len=this.length;
var r=new Array(len);
for(ii=0;ii<len;++ii){
if(ii in this){
r[ii]=func.call(context,this[ii],ii,this);
}
}

return r;
};




ES5ArrayPrototype.forEach=function(func,context){
ES5ArrayPrototype.map.call(this,func,context);
};




ES5ArrayPrototype.filter=function(func,context){
if(typeof func!=="function"){
throw new TypeError();
}

var ii;
var val;
var len=this.length;
var r=[];
for(ii=0;ii<len;++ii){
if(ii in this){

val=this[ii];
if(func.call(context,val,ii,this)){
r.push(val);
}
}
}

return r;
};




ES5ArrayPrototype.every=function(func,context){
if(typeof func!=="function"){
throw new TypeError();
}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii<len;ii++){
if(ii in t){
if(!func.call(context,t[ii],ii,t)){
return false;
}
}
}
return true;
};




ES5ArrayPrototype.some=function(func,context){
if(typeof func!=="function"){
throw new TypeError();
}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii<len;ii++){
if(ii in t){
if(func.call(context,t[ii],ii,t)){
return true;
}
}
}
return false;
};




ES5ArrayPrototype.indexOf=function(val,index){
var len=this.length;
index|=0;

if(index<0){
index+=len;
}

for(;index<len;index++){
if(index in this&&this[index]===val){
return index;
}
}
return-1;
};

module.exports=ES5ArrayPrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5Date",[],(function $module_ES5Date(global,require,requireDynamic,requireLazy,module,exports){

var ES5Date={};
ES5Date.now=function(){
return new Date().getTime();
};

module.exports=ES5Date;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5FunctionPrototype",[],(function $module_ES5FunctionPrototype(global,require,requireDynamic,requireLazy,module,exports){

var ES5FunctionPrototype={};









ES5FunctionPrototype.bind=function(context){
if(typeof this!=="function"){
throw new TypeError("Bind must be called on a function");
}
var target=this;
var appliedArguments=Array.prototype.slice.call(arguments,1);
function bound(){
return target.apply(
context,
appliedArguments.concat(Array.prototype.slice.call(arguments)));

}
bound.displayName="bound:"+(target.displayName||target.name||"(?)");
bound.toString=function toString(){
return"bound: "+target;
};
return bound;
};

module.exports=ES5FunctionPrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ie8DontEnum",[],(function $module_ie8DontEnum(global,require,requireDynamic,requireLazy,module,exports){



var dontEnumProperties=[
"toString",
"toLocaleString",
"valueOf",
"hasOwnProperty",
"isPrototypeOf",
"prototypeIsEnumerable",
"constructor"];


var hasOwnProperty={}.hasOwnProperty;





var ie8DontEnum=function ie8DontEnum(){};

if({toString:true}.propertyIsEnumerable("toString")){
ie8DontEnum=function ie8DontEnum(object,onProp){
for(var i=0;i<dontEnumProperties.length;i++){
var property=dontEnumProperties[i];
if(hasOwnProperty.call(object,property)){
onProp(property);
}
}
};
}

module.exports=ie8DontEnum;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5Object",["ie8DontEnum"],(function $module_ES5Object(global,require,requireDynamic,requireLazy,module,exports){


var hasOwnProperty={}.hasOwnProperty;

var ES5Object={};



function F(){}_c=F;






ES5Object.create=function(proto){
if(__DEV__){
if(arguments.length>1){
throw new Error(
"Object.create implementation supports only the first parameter");

}
}
var type=typeof proto;
if(type!="object"&&type!="function"){
throw new TypeError("Object prototype may only be a Object or null");
}

F.prototype=proto;
return new F();
};






ES5Object.keys=function(object){
var type=typeof object;
if(type!="object"&&type!="function"||object===null){
throw new TypeError("Object.keys called on non-object");
}

var keys=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
keys.push(key);
}
}


require("ie8DontEnum")(object,function ie8DontEnum_$1(prop){return keys.push(prop);});

return keys;
};

ES5Object.freeze=function(object){
return object;
};

ES5Object.isFrozen=function(){
return false;
};

ES5Object.seal=function(object){
return object;
};

module.exports=ES5Object;var _c;$RefreshReg$(_c,"F");}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5StringPrototype",[],(function $module_ES5StringPrototype(global,require,requireDynamic,requireLazy,module,exports){



var ES5StringPrototype={};






ES5StringPrototype.trim=function(){
if(this==null){
throw new TypeError("String.prototype.trim called on null or undefined");
}
return String.prototype.replace.call(this,/^\s+|\s+$/g,"");
};

ES5StringPrototype.startsWith=function(search){
var string=String(this);
if(this==null){
throw new TypeError(
"String.prototype.startsWith called on null or undefined");

}
var pos=arguments.length>1?Number(arguments[1]):0;
if(isNaN(pos)){
pos=0;
}
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)==start;
};

ES5StringPrototype.endsWith=function(search){
var string=String(this);
if(this==null){
throw new TypeError(
"String.prototype.endsWith called on null or undefined");

}
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?Number(arguments[1]):stringLength;
if(isNaN(pos)){
pos=0;
}
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;
}
return string.lastIndexOf(searchString,start)==start;
};

ES5StringPrototype.includes=function(search){
if(this==null){
throw new TypeError(
"String.prototype.contains called on null or undefined");

}
var string=String(this);
var pos=arguments.length>1?Number(arguments[1]):0;
if(isNaN(pos)){
pos=0;
}
return string.indexOf(String(search),pos)!=-1;
};

ES5StringPrototype.contains=ES5StringPrototype.includes;

ES5StringPrototype.repeat=function(count){
if(this==null){
throw new TypeError("String.prototype.repeat called on null or undefined");
}
var string=String(this);
var n=count?Number(count):0;
if(isNaN(n)){
n=0;
}
if(n<0||n===Infinity){
throw RangeError();
}
if(n===1){
return string;
}
if(n===0){
return"";
}
var result="";
while(n){
if(n&1){
result+=string;
}
if(n>>=1){
string+=string;
}
}
return result;
};

module.exports=ES5StringPrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES6Array",[],function $module_ES6Array(global,require,requireDynamic,requireLazy,module,exports){

"use strict";

var ES6Array={
from:function from(arrayLike){
if(arrayLike==null){
throw new TypeError("Object is null or undefined");
}


var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=
typeof Symbol==="function"?typeof Symbol==="function"?Symbol.iterator:"@@iterator":"@@iterator";
var mapping=typeof mapFn==="function";
var usingIterator=typeof items[symbolIterator]==="function";
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==="function"?new C():[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);
}

ret[key]=value;
key+=1;
}

ret.length=key;
return ret;
}

var len=items.length;
if(isNaN(len)||len<0){
len=0;
}

ret=typeof C==="function"?new C(len):new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);
}

ret[key]=value;

key+=1;
}

ret.length=key;
return ret;
}};


module.exports=ES6Array;},null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES6ArrayPrototype",[],(function $module_ES6ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){



var ES6ArrayPrototype={




find:function find(predicate,thisArg){
if(this==null){
throw new TypeError("Array.prototype.find called on null or undefined");
}
if(typeof predicate!=="function"){
throw new TypeError("predicate must be a function");
}

var index=ES6ArrayPrototype.findIndex.call(this,predicate,thisArg);
return index===-1?void 0:this[index];
},





findIndex:function findIndex(predicate,thisArg){
if(this==null){
throw new TypeError(
"Array.prototype.findIndex called on null or undefined");

}
if(typeof predicate!=="function"){
throw new TypeError("predicate must be a function");
}
var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(thisArg,list[i],i,list)){
return i;
}
}
return-1;
},





fill:function fill(value){
if(this==null){
throw new TypeError("Array.prototype.fill called on null or undefined");
}
var O=Object(this);
var len=O.length>>>0;
var start=arguments[1];
var relativeStart=start>>0;
var k=
relativeStart<0?
Math.max(len+relativeStart,0):
Math.min(relativeStart,len);
var end=arguments[2];
var relativeEnd=end===undefined?len:end>>0;
var final=
relativeEnd<0?
Math.max(len+relativeEnd,0):
Math.min(relativeEnd,len);
while(k<final){
O[k]=value;
k++;
}
return O;
}};


module.exports=ES6ArrayPrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES6DatePrototype",[],(function $module_ES6DatePrototype(global,require,requireDynamic,requireLazy,module,exports){

function pad(number){
return(number<10?"0":"")+number;
}

var ES6DatePrototype={



toISOString:function toISOString(){
if(!isFinite(this)){
throw new Error("Invalid time value");
}
var year=this.getUTCFullYear();
year=
(year<0?"-":year>9999?"+":"")+
("00000"+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6);
return(
year+
"-"+
pad(this.getUTCMonth()+1)+
"-"+
pad(this.getUTCDate())+
"T"+
pad(this.getUTCHours())+
":"+
pad(this.getUTCMinutes())+
":"+
pad(this.getUTCSeconds())+
"."+
(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+
"Z");

}};


module.exports=ES6DatePrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES6Number",[],(function $module_ES6Number(global,require,requireDynamic,requireLazy,module,exports){

var EPSILON=Math.pow(2,-52);
var MAX_SAFE_INTEGER=Math.pow(2,53)-1;
var MIN_SAFE_INTEGER=-1*MAX_SAFE_INTEGER;

var ES6Number={
isFinite:function(_isFinite){function isFinite(_x){return _isFinite.apply(this,arguments);}isFinite.toString=function(){return _isFinite.toString();};return isFinite;}(function(value){
return typeof value==="number"&&isFinite(value);
}),

isNaN:function(_isNaN){function isNaN(_x2){return _isNaN.apply(this,arguments);}isNaN.toString=function(){return _isNaN.toString();};return isNaN;}(function(value){
return typeof value==="number"&&isNaN(value);
}),

isInteger:function isInteger(value){
return this.isFinite(value)&&Math.floor(value)===value;
},

isSafeInteger:function isSafeInteger(value){
return(
this.isFinite(value)&&
value>=this.MIN_SAFE_INTEGER&&
value<=this.MAX_SAFE_INTEGER&&
Math.floor(value)===value);

},

EPSILON:EPSILON,
MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,
MIN_SAFE_INTEGER:MIN_SAFE_INTEGER};


module.exports=ES6Number;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES6Object",["ie8DontEnum"],(function $module_ES6Object(global,require,requireDynamic,requireLazy,module,exports){


var hasOwnProperty={}.hasOwnProperty;

var ES6Object={





assign:function assign(target){
if(target==null){
throw new TypeError("Object.assign target cannot be null or undefined");
}

target=Object(target);

for(var i=0;i<(arguments.length<=1?0:arguments.length-1);i++){
var source=i+1<1||arguments.length<=i+1?undefined:arguments[i+1];

if(source==null){
continue;
}

source=Object(source);

for(var prop in source){
if(hasOwnProperty.call(source,prop)){
target[prop]=source[prop];
}
}


require("ie8DontEnum")(source,function ie8DontEnum_$1(prop){return target[prop]=source[prop];});
}

return target;
},






is:function is(x,y){
if(x===y){


return x!==0||1/x===1/y;
}else{

return x!==x&&y!==y;
}
}};


module.exports=ES6Object;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * 
 */__d("ES7ArrayPrototype",["ES5Array","ES5ArrayPrototype"],(function $module_ES7ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){var

isArray=require("ES5Array").isArray;var
indexOf=require("ES5ArrayPrototype").indexOf;


function toLength(number){
return Math.min(Math.max(toInteger(number),0),Number.MAX_SAFE_INTEGER);
}


function toInteger(number){
var n=Number(number);
return isFinite(n)&&n!==0?sign(n)*Math.floor(Math.abs(n)):n;
}

function sign(number){
return number>=0?1:-1;
}

var ES7ArrayPrototype={
includes:function includes(needle){
"use strict";


if(
needle!==undefined&&
isArray(this)&&
!(typeof needle==="number"&&isNaN(needle)))
{
return indexOf.apply(this,arguments)!==-1;
}


var o=Object(this);
var len=o.length?toLength(o.length):0;

if(len===0){
return false;
}

var fromIndex=arguments.length>1?toInteger(arguments[1]):0;

var i=fromIndex<0?Math.max(len+fromIndex,0):fromIndex;

var NaNLookup=isNaN(needle)&&typeof needle==="number";

while(i<len){
var value=o[i];
if(
value===needle||
typeof value==="number"&&NaNLookup&&isNaN(value))
{
return true;
}
i++;
}
return false;
}};


module.exports=ES7ArrayPrototype;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES7Object",["ie8DontEnum"],(function $module_ES7Object(global,require,requireDynamic,requireLazy,module,exports){


var hasOwnProperty={}.hasOwnProperty;

var ES7Object={};






ES7Object.entries=function(object){

if(object==null){
throw new TypeError("Object.entries called on non-object");
}

var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);
}
}


require("ie8DontEnum")(object,function ie8DontEnum_$1(prop){return entries.push([prop,object[prop]]);});

return entries;
};






ES7Object.values=function(object){

if(object==null){
throw new TypeError("Object.values called on non-object");
}

var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);
}
}


require("ie8DontEnum")(object,function ie8DontEnum_$1(prop){return values.push(object[prop]);});

return values;
};

module.exports=ES7Object;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES7StringPrototype",[],(function $module_ES7StringPrototype(global,require,requireDynamic,requireLazy,module,exports){

var ES7StringPrototype={};

ES7StringPrototype.trimLeft=function(){
return this.replace(/^\s+/,"");
};

ES7StringPrototype.trimRight=function(){
return this.replace(/\s+$/,"");
};

module.exports=ES7StringPrototype;}),null);
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
__d("json3-3.3.2",[],(function $module_json3_3_3_2(global,require,requireDynamic,requireLazy,module,exports){
'use strict';

var exports$1 = {};
var module$1 = { exports: exports$1 };

var define;

function TROMPLE_MAIN() {
(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports$1] && exports$1 && !exports$1.nodeType && exports$1;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module$1] && module$1 && !module$1.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
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
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
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
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
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
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
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
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
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
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
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
      return has[name] = !!isSupported;
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
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
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
        var size = 0, Properties, members, property;

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
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
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
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
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
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
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
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
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
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
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
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
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
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
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
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
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
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
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
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
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
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
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
                  if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
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
                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
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
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
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
              for (;; hasMembers || (hasMembers = true)) {
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
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
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
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
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
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
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

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}

var TROMPLE_HAS_RAN = false;

function main () {
  if (!TROMPLE_HAS_RAN) {
    TROMPLE_HAS_RAN = true;
    TROMPLE_MAIN();
  }
  return module$1.exports;
}

function trompleEntryPoint (requirePath) {
  switch (requirePath) {
    case undefined: return main();
  }
}

module.exports = trompleEntryPoint;

/*  */}),null);

__d("json3",["json3-3.3.2"],(function $module_json3(global,require,requireDynamic,requireLazy,module,exports){// @generated by yarn - see http://fburl.com/js-libs-www
// @flow
// @nolint

// this module should be typed via `json3.js.flow`, otherwise it's `any`
module.exports = (require("json3-3.3.2")()/*: any */);

/*  */}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 *
 * scripts/static_resources/js/fb-transforms/babel-7/babel-plugin-jssdk
 * converts ES5/ES6 code into using this module in ES3 style.
 *
 * @ServerCallableModule
 * @format
 */__d("ES",["ES5Array","ES5ArrayPrototype","ES5Date","ES5FunctionPrototype","ES5Object","ES5StringPrototype","ES6Array","ES6ArrayPrototype","ES6DatePrototype","ES6Number","ES6Object","ES7ArrayPrototype","ES7Object","ES7StringPrototype","json3"],(function $module_ES(global,require,requireDynamic,requireLazy,module,exports){


















var toString={}.toString;

var methodCache={


"JSON.stringify":require("json3").stringify,
"JSON.parse":require("json3").parse};


var es5Polyfills={
"Array.prototype":require("ES5ArrayPrototype"),
"Function.prototype":require("ES5FunctionPrototype"),
"String.prototype":require("ES5StringPrototype"),
Object:require("ES5Object"),
Array:require("ES5Array"),
Date:require("ES5Date")};


var es6Polyfills={
Object:require("ES6Object"),
"Array.prototype":require("ES6ArrayPrototype"),
"Date.prototype":require("ES6DatePrototype"),
Number:require("ES6Number"),
Array:require("ES6Array")};


var es7Polyfills={
Object:require("ES7Object"),
"String.prototype":require("ES7StringPrototype"),
"Array.prototype":require("ES7ArrayPrototype")};


function setupMethodsCache(polyfills){


for(var pName in polyfills){
if(!Object.prototype.hasOwnProperty.call(polyfills,pName)){
continue;
}
var polyfillObject=polyfills[pName];


var accessor=pName.split(".");
if(accessor.length===2){var
obj=accessor[0],prop=accessor[1];
if(!obj||!prop||!window[obj]||!window[obj][prop]){
var windowObj=obj?window[obj]:"-";
var windowObjProp=
obj&&window[obj]&&prop?window[obj][prop]:"-";
throw new Error(
"Unexpected state (t11975770): "+(
obj+", "+prop+", "+windowObj+", "+windowObjProp+", "+pName));

}
}

var nativeObject=
accessor.length===2?window[accessor[0]][accessor[1]]:window[pName];


for(var _prop in polyfillObject){
if(!Object.prototype.hasOwnProperty.call(polyfillObject,_prop)){
continue;
}


if(typeof polyfillObject[_prop]!=="function"){
methodCache[pName+"."+_prop]=polyfillObject[_prop];
continue;
}

var nativeFunction=nativeObject[_prop];


methodCache[pName+"."+_prop]=
nativeFunction&&/\{\s+\[native code\]\s\}/.test(nativeFunction)?
nativeFunction:
polyfillObject[_prop];
}
}
}


setupMethodsCache(es5Polyfills);
setupMethodsCache(es6Polyfills);
setupMethodsCache(es7Polyfills);

function ES(lhs,rhs,proto){

var type=proto?toString.call(lhs).slice(8,-1)+".prototype":lhs;


var propValue=methodCache[type+"."+rhs]||lhs[rhs];


if(typeof propValue==="function"){for(var _len=arguments.length,args=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}
return propValue.apply(lhs,args);
}else if(propValue){

return propValue;
}

throw new Error("Polyfill "+type+" does not have implementation of "+rhs);
}_c=ES;

module.exports=ES;var _c;$RefreshReg$(_c,"ES");}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @ServerCallableModule
 * @format
 */__d("sdk.babelHelpers",["ES5FunctionPrototype","ES5Object","ES6Object"],(function $module_sdk_babelHelpers(global,require,requireDynamic,requireLazy,module,exports){











var babelHelpers={};
var hasOwn=Object.prototype.hasOwnProperty;




babelHelpers.inheritsLoose=function(subClass,superClass){
require("ES6Object").assign(subClass,superClass);
subClass.prototype=require("ES5Object").create(superClass&&superClass.prototype);
subClass.prototype.constructor=subClass;
subClass.__superConstructor__=superClass;
return superClass;
};




babelHelpers.inherits=babelHelpers.inheritsLoose;







babelHelpers.wrapNativeSuper=function(Class){
var _cache=typeof Map==="function"?new Map():undefined;

babelHelpers.wrapNativeSuper=function(Class){
if(Class===null){
return null;
}
if(typeof Class!=="function"){
throw new TypeError("Super expression must either be null or a function");
}
if(_cache!==undefined){
if(_cache.has(Class)){
return _cache.get(Class);
}
_cache.set(Class,Wrapper);
}
babelHelpers.inheritsLoose(Wrapper,Class);
function Wrapper(){
Class.apply(this,arguments);
}
return Wrapper;
};

return babelHelpers.wrapNativeSuper(Class);
};

babelHelpers.assertThisInitialized=function(self){
if(self===void 0){
throw new ReferenceError(
"this hasn't been initialised - super() hasn't been called");

}
return self;
};




babelHelpers._extends=require("ES6Object").assign;




babelHelpers["extends"]=babelHelpers._extends;





babelHelpers.construct=function(klass,arr){
var a=[null];
a.push.apply(a,arr);
return new(Function.prototype.bind.apply(klass,a))();
};




babelHelpers.objectWithoutPropertiesLoose=function(obj,keys){
var target={};
for(var i in obj){
if(!hasOwn.call(obj,i)||keys.indexOf(i)>=0){
continue;
}
target[i]=obj[i];
}
return target;
};




babelHelpers.objectWithoutProperties=
babelHelpers.objectWithoutPropertiesLoose;




babelHelpers.taggedTemplateLiteralLoose=function(strings,raw){
if(!raw){
raw=strings.slice(0);
}
strings.raw=raw;
return strings;
};




babelHelpers.bind=require("ES5FunctionPrototype").bind;

module.exports=babelHelpers;}),null);var ES=require('ES');var babelHelpers=require('sdk.babelHelpers');/**
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

(function(global,undefined){
var KIND_KEYS="keys";
var KIND_VALUES="values";
var KIND_ENTRIES="entries";




var ArrayIterators=function(){

var hasNative=hasNativeIterator(Array);
var ArrayIterator;

if(!hasNative){
ArrayIterator=function(){"use strict";

function ArrayIterator(array,kind){
this.$ArrayIterator_iteratedObject=array;
this.$ArrayIterator_kind=kind;
this.$ArrayIterator_nextIndex=0;
}var _proto=ArrayIterator.prototype;_proto.


next=function next(){
if(this.$ArrayIterator_iteratedObject==null){
return{value:undefined,done:true};
}

var array=this.$ArrayIterator_iteratedObject;
var len=this.$ArrayIterator_iteratedObject.length;
var index=this.$ArrayIterator_nextIndex;
var kind=this.$ArrayIterator_kind;

if(index>=len){
this.$ArrayIterator_iteratedObject=undefined;
return{value:undefined,done:true};
}

this.$ArrayIterator_nextIndex=index+1;

if(kind===KIND_KEYS){
return{value:index,done:false};
}else if(kind===KIND_VALUES){
return{value:array[index],done:false};
}else if(kind===KIND_ENTRIES){
return{value:[index,array[index]],done:false};
}
};_proto[typeof Symbol==="function"?


Symbol.iterator:"@@iterator"]=function(){
return this;
};return ArrayIterator;}();

}

return{
keys:hasNative?
function(array){return array.keys();}:
function(array){return new ArrayIterator(array,KIND_KEYS);},

values:hasNative?
function(array){return array.values();}:
function(array){return new ArrayIterator(array,KIND_VALUES);},

entries:hasNative?
function(array){return array.entries();}:
function(array){return new ArrayIterator(array,KIND_ENTRIES);}};

}();






var StringIterators=function(){

var hasNative=hasNativeIterator(String);
var StringIterator;

if(!hasNative){
StringIterator=function(){"use strict";

function StringIterator(string){
this.$StringIterator_iteratedString=string;
this.$StringIterator_nextIndex=0;
}var _proto2=StringIterator.prototype;_proto2.


next=function next(){
if(this.$StringIterator_iteratedString==null){
return{value:undefined,done:true};
}

var index=this.$StringIterator_nextIndex;
var s=this.$StringIterator_iteratedString;
var len=s.length;

if(index>=len){
this.$StringIterator_iteratedString=undefined;
return{value:undefined,done:true};
}

var ret;
var first=s.charCodeAt(index);

if(first<55296||first>56319||index+1===len){
ret=s[index];
}else{
var second=s.charCodeAt(index+1);
if(second<56320||second>57343){
ret=s[index];
}else{
ret=s[index]+s[index+1];
}
}

this.$StringIterator_nextIndex=index+ret.length;

return{value:ret,done:false};
};_proto2[typeof Symbol==="function"?


Symbol.iterator:"@@iterator"]=function(){
return this;
};return StringIterator;}();

}

return{
keys:function keys(){
throw TypeError("Strings default iterator doesn't implement keys.");
},

values:hasNative?
function(string){return string[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();}:
function(string){return new StringIterator(string);},

entries:function entries(){
throw TypeError("Strings default iterator doesn't implement entries.");
}};


}();

function hasNativeIterator(classObject){
return typeof classObject.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"&&
typeof classObject.prototype.values==="function"&&
typeof classObject.prototype.keys==="function"&&
typeof classObject.prototype.entries==="function";
}var






ObjectIterator=function(){"use strict";
function ObjectIterator(object,kind){
this.$ObjectIterator_iteratedObject=object;
this.$ObjectIterator_kind=kind;
this.$ObjectIterator_keys=ES("Object","keys",false,object);
this.$ObjectIterator_nextIndex=0;
}var _proto3=ObjectIterator.prototype;_proto3.

next=function next(){
var len=this.$ObjectIterator_keys.length;
var index=this.$ObjectIterator_nextIndex;
var kind=this.$ObjectIterator_kind;
var key=this.$ObjectIterator_keys[index];

if(index>=len){
this.$ObjectIterator_iteratedObject=undefined;
return{value:undefined,done:true};
}

this.$ObjectIterator_nextIndex=index+1;

if(kind===KIND_KEYS){
return{value:key,done:false};
}else if(kind===KIND_VALUES){
return{value:this.$ObjectIterator_iteratedObject[key],done:false};
}else if(kind===KIND_ENTRIES){
return{value:[key,this.$ObjectIterator_iteratedObject[key]],done:false};
}
};_proto3[typeof Symbol==="function"?

Symbol.iterator:"@@iterator"]=function(){
return this;
};return ObjectIterator;}();







var GenericIterators={
keys:function keys(object){
return new ObjectIterator(object,KIND_KEYS);
},

values:function values(object){
return new ObjectIterator(object,KIND_VALUES);
},

entries:function entries(object){
return new ObjectIterator(object,KIND_ENTRIES);
}};








function enumerate(object,kind){


if(typeof object==="string"){
return StringIterators[kind||KIND_VALUES](object);
}else if(ES("Array","isArray",false,object)){
return ArrayIterators[kind||KIND_VALUES](object);


}else if(object[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]){
return object[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();


}else{
return GenericIterators[kind||KIND_ENTRIES](object);
}
}

ES("Object","assign",false,enumerate,{




KIND_KEYS:KIND_KEYS,
KIND_VALUES:KIND_VALUES,
KIND_ENTRIES:KIND_ENTRIES,





keys:function keys(object){
return enumerate(object,KIND_KEYS);
},

values:function values(object){
return enumerate(object,KIND_VALUES);
},

entries:function entries(object){
return enumerate(object,KIND_ENTRIES);
},

generic:GenericIterators.entries});



global.FB_enumerate=enumerate;
})(typeof global==="undefined"?this:global);
/**
 * Copyright 2013-2014 Facebook, Inc.
 * @provides Collections.es6
 * @polyfill old ie8 webkit modern
 * @preventMunge
 * @requires iterator.enumerate
 * @requires TypeChecker
 * @requires GenericFunctionVisitor
 */






(function(global,undefined){



var windowObj=global.window||global;
function guid(){
return"f"+(Math.random()*(1<<30)).toString(16).replace(".","");
}

function isNode(object){
var doc=object?object.ownerDocument||object:document;
var defaultView=doc.defaultView||windowObj;
return!!(object&&(
typeof defaultView.Node==="function"?object instanceof defaultView.Node:
typeof object==="object"&&
typeof object.nodeType==="number"&&
typeof object.nodeName==="string"));

}





function shouldPolyfillES6Collection(collectionName){
var Collection=windowObj[collectionName];
if(Collection==null){
return true;
}





if(typeof windowObj.Symbol!=="function"){
return true;
}

var proto=Collection.prototype;




return Collection==null||
typeof Collection!=="function"||
typeof proto.clear!=="function"||
new Collection().size!==0||
typeof proto.keys!=="function"||

typeof proto["for"+"Each"]!=="function";
}

var enumerate=global.FB_enumerate;

var Map=function(){





if(!shouldPolyfillES6Collection("Map")){
return windowObj.Map;
}
























































var KIND_KEY="key";
var KIND_VALUE="value";
var KIND_KEY_VALUE="key+value";



var KEY_PREFIX="$map_";



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP="$size"+guid();
}


var OLD_IE_HASH_PREFIX="IE_HASH_";var

Map=function(){"use strict";









function Map(iterable){
if(!isObject(this)){
throw new TypeError("Wrong map object type.");
}

initMap(this);

if(iterable!=null){
var it=enumerate(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError("Expected iterable items to be pair objects.");
}
this.set(next.value[0],next.value[1]);
}
}
}var _proto=Map.prototype;_proto.





clear=function clear(){
initMap(this);
};_proto.








has=function has(key){
var index=getIndex(this,key);
return!!(index!=null&&this._mapData[index]);
};_proto.









set=function set(key,value){
var index=getIndex(this,key);

if(index!=null&&this._mapData[index]){
this._mapData[index][1]=value;
}else{
index=this._mapData.push([
key,
value])-
1;
setIndex(this,key,index);
if(__DEV__){
this[SECRET_SIZE_PROP]+=1;
}else{
this.size+=1;
}
}

return this;
};_proto.








get=function get(key){
var index=getIndex(this,key);
if(index==null){
return undefined;
}else{
return this._mapData[index][1];
}
};_proto["delete"]=









function _delete(key){
var index=getIndex(this,key);
if(index!=null&&this._mapData[index]){
setIndex(this,key,undefined);
this._mapData[index]=undefined;
if(__DEV__){
this[SECRET_SIZE_PROP]-=1;
}else{
this.size-=1;
}
return true;
}else{
return false;
}
};_proto.








entries=function entries(){
return new MapIterator(this,KIND_KEY_VALUE);
};_proto.







keys=function keys(){
return new MapIterator(this,KIND_KEY);
};_proto.







values=function values(){
return new MapIterator(this,KIND_VALUE);
};_proto.










forEach=function forEach(callback,thisArg){
if(typeof callback!=="function"){
throw new TypeError("Callback must be callable.");
}

var boundCallback=ES(callback,"bind",true,thisArg||undefined);
var mapData=this._mapData;




for(var i=0;i<mapData.length;i++){
var entry=mapData[i];
if(entry!=null){
boundCallback(entry[1],entry[0],this);
}
}
};_proto[typeof Symbol==="function"?


Symbol.iterator:"@@iterator"]=function(){
return this.entries();
};return Map;}();var


MapIterator=function(){"use strict";








function MapIterator(map,kind){
if(!(isObject(map)&&map._mapData)){
throw new TypeError("Object is not a map.");
}

if(ES([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE],"indexOf",true,kind)===-1){
throw new Error("Invalid iteration kind.");
}

this._map=map;
this._nextIndex=0;
this._kind=kind;
}var _proto2=MapIterator.prototype;_proto2.







next=function next(){
if(!this instanceof Map){
throw new TypeError("Expected to be called on a MapIterator.");
}

var map=this._map;
var index=this._nextIndex;
var kind=this._kind;

if(map==null){
return createIterResultObject(undefined,true);
}

var entries=map._mapData;

while(index<entries.length){
var record=entries[index];

index+=1;
this._nextIndex=index;

if(record){
if(kind===KIND_KEY){
return createIterResultObject(record[0],false);
}else if(kind===KIND_VALUE){
return createIterResultObject(record[1],false);
}else if(kind){
return createIterResultObject(record,false);
}
}
}

this._map=undefined;

return createIterResultObject(undefined,true);
};_proto2[typeof Symbol==="function"?

Symbol.iterator:"@@iterator"]=function(){
return this;
};return MapIterator;}();














function getIndex(map,key){
if(isObject(key)){
var hash=getHash(key);
return hash?map._objectIndex[hash]:undefined;
}else{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==="string"){
return map._stringIndex[prefixedKey];
}else{
return map._otherIndex[prefixedKey];
}
}
}







function setIndex(map,key,index){
var shouldDelete=index==null;

if(isObject(key)){
var hash=getHash(key);
if(!hash){
hash=createHash(key);
}
if(shouldDelete){
delete map._objectIndex[hash];
}else{
map._objectIndex[hash]=index;
}
}else{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==="string"){
if(shouldDelete){
delete map._stringIndex[prefixedKey];
}else{
map._stringIndex[prefixedKey]=index;
}
}else if(shouldDelete){
delete map._otherIndex[prefixedKey];
}else{
map._otherIndex[prefixedKey]=index;
}
}
}






function initMap(map){






map._mapData=[];







map._objectIndex={};


map._stringIndex={};


map._otherIndex={};







if(__DEV__){
if(Map.__isES5){



if(Object.prototype.hasOwnProperty.call(map,SECRET_SIZE_PROP)){
map[SECRET_SIZE_PROP]=0;
}else{
Object.defineProperty(map,SECRET_SIZE_PROP,{
value:0,
writable:true});

Object.defineProperty(map,"size",{
set:function set(v){
console.error(
"PLEASE FIX ME: You are changing the map size property which "+
"should not be writable and will break in production.");

throw new Error("The map size property is not writable.");
},
get:function get(){return map[SECRET_SIZE_PROP];}});

}


return;
}
}



map.size=0;
}







function isObject(o){
return o!=null&&(typeof o==="object"||typeof o==="function");
}








function createIterResultObject(value,done){
return{value:value,done:done};
}


Map.__isES5=function(){
try{
Object.defineProperty({},"__.$#x",{});
return true;
}catch(e){
return false;
}
}();







function isExtensible(o){
if(!Map.__isES5||!Object.isExtensible){
return true;
}else{
return Object.isExtensible(o);
}
}









function getIENodeHash(node){
var uniqueID;
switch(node.nodeType){
case 1:
uniqueID=node.uniqueID;
break;
case 9:
uniqueID=node.documentElement.uniqueID;
break;
default:
return null;}


if(uniqueID){
return OLD_IE_HASH_PREFIX+uniqueID;
}else{
return null;
}
}

var hashProperty=guid();






function getHash(o){
if(o[hashProperty]){
return o[hashProperty];
}else if(!Map.__isES5&&
o.propertyIsEnumerable&&
o.propertyIsEnumerable[hashProperty]){
return o.propertyIsEnumerable[hashProperty];
}else if(!Map.__isES5&&
isNode(o)&&
getIENodeHash(o)){
return getIENodeHash(o);
}else if(!Map.__isES5&&o[hashProperty]){
return o[hashProperty];
}
}

var createHash=function(){
var propIsEnumerable=Object.prototype.propertyIsEnumerable;
var hashCounter=0;







return function createHash(o){
if(isExtensible(o)){
hashCounter+=1;
if(Map.__isES5){
Object.defineProperty(o,hashProperty,{
enumerable:false,
writable:false,
configurable:false,
value:hashCounter});

}else if(o.propertyIsEnumerable){




o.propertyIsEnumerable=function(){
return propIsEnumerable.apply(this,arguments);
};
o.propertyIsEnumerable[hashProperty]=hashCounter;
}else if(isNode(o)){




o[hashProperty]=hashCounter;
}else{
throw new Error("Unable to set a non-enumerable property on object.");
}
return hashCounter;
}else{
throw new Error("Non-extensible objects are not allowed as keys.");
}
};
}();




return __annotator(Map,{name:"Map"});
}();

var Set=function(){





if(!shouldPolyfillES6Collection("Set")){
return windowObj.Set;
}var










































Set=function(){"use strict";










function Set(iterable){
if(this==null||
typeof this!=="object"&&typeof this!=="function"){
throw new TypeError("Wrong set object type.");
}

initSet(this);

if(iterable!=null){
var it=enumerate(iterable);
var next;
while(!(next=it.next()).done){
this.add(next.value);
}
}
}var _proto3=Set.prototype;_proto3.









add=function add(value){
this._map.set(value,value);
this.size=this._map.size;
return this;
};_proto3.






clear=function clear(){
initSet(this);
};_proto3["delete"]=










function _delete(value){
var ret=this._map["delete"](value);
this.size=this._map.size;
return ret;
};_proto3.






entries=function entries(){
return this._map.entries();
};_proto3.








forEach=function forEach(callback){
var thisArg=arguments[1];
var it=this._map.keys();
var next;
while(!(next=it.next()).done){
callback.call(thisArg,next.value,next.value,this);
}
};_proto3.









has=function has(value){
return this._map.has(value);
};_proto3.






values=function values(){
return this._map.values();
};_proto3.




keys=function keys(){
return this.values();
};_proto3[typeof Symbol==="function"?


Symbol.iterator:"@@iterator"]=function(){
return this.values();
};return Set;}();


function initSet(set){
set._map=new Map();
set.size=set._map.size;
}




return __annotator(Set,{name:"Set"});
}();

global.Map=Map;
global.Set=Set;
})(typeof global==="undefined"?this:global);      __d("JSSDKRuntimeConfig",[],{"locale":"en_US","revision":"1003479826","rtl":false,"sdkab":null,"sdkns":"FB","sdkurl":"https:\/\/connect.facebook.net\/en_US\/all\/debug.js"});__d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","business":"business.facebook.com","api":"api.facebook.com","api_read":"api-read.facebook.com","graph":"graph.facebook.com","an":"an.facebook.com","fbcdn":"static.xx.fbcdn.net","cdn":"staticxx.facebook.com","graph_facebook":"graph.facebook.com","graph_gaming":"graph.fb.gg","graph_instagram":"graph.instagram.com"});__d("JSSDKConfig",[],{"features":{"allow_non_canvas_app_events":false,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":0.1},"xd_timeout":{"rate":1,"value":60000},"use_bundle":false,"should_log_response_error":true,"popup_blocker_scribe_logging":{"rate":100},"https_only_enforce_starting":2538809200000,"https_only_learn_more":"https:\/\/developers.facebook.com\/blog\/post\/2018\/06\/08\/enforce-https-facebook-login\/","https_only_scribe_logging":{"rate":1},"log_perf":{"rate":0.001},"use_x_xd":{"rate":100},"cache_auth_response":{"rate":0},"oauth_funnel_logger_version":1,"force_popup_to_canvas_apps_with_id":[],"force_popup_to_all_canvas_app":false,"max_oauth_dialog_retries":{"rate":100,"value":10}}});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100\u0025;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100\u0025;position:absolute;right:0;top:0;width:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-position:50\u0025 50\u0025;background-repeat:no-repeat;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("JSSDKXDConfig",[],{"XXdUrl":"\/x\/connect\/xd_arbiter\/?version=46","useCdn":true});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});                                                                                                                                                                                                                                                                                                                                                                                                                       __d("DOMWrapper",[],function $module_DOMWrapper(global,require,requireDynamic,requireLazy,module,exports){

"use strict";exports.setRoot=setRoot;exports.getRoot=getRoot;exports.setWindow=setWindow;exports.getWindow=getWindow;



var rootElement,windowRef;

function setRoot(root){
rootElement=root;
}

function getRoot(){
return rootElement||document.body;
}
function setWindow(win){
windowRef=win;
}
function getWindow(){
return windowRef||self;
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("dotAccess",[],function $module_dotAccess(global,require,requireDynamic,requireLazy,module,exports){module.exports=dotAccess;

function dotAccess(
head,
path,
create)
{
var stack=path.split(".");
do{
var key=stack.shift();
head=head[key]||create&&(head[key]={});
}while(stack.length&&head);
return head;
}},null);
                                                                                                                                                                                                                                                                                              __d("guid",[],(function $module_guid(global,require,requireDynamic,requireLazy,module,exports){module.exports=guid;



function guid(){
return"f"+(Math.random()*(1<<30)).toString(16).replace(".","");
}}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               __d("wrapFunction",[],function $module_wrapFunction(global,require,requireDynamic,requireLazy,module,exports){module.exports=wrapFunction;







var wrappers={};

function wrapFunction(
fn,
type,
source)
{
var callee=type in wrappers?wrappers[type](fn,source):fn;
return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return callee.apply(this,args);
};
}

wrapFunction.setWrapper=function(
fn,
type)
{
wrappers[type]=fn;
};},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],function $module_GlobalCallback(global,require,requireDynamic,requireLazy,module,exports){exports.setPrefix=setPrefix;exports.create=create;exports.remove=remove;









var rootObject;
var callbackPrefix;

function setPrefix(prefix){
rootObject=require("dotAccess")(require("DOMWrapper").getWindow(),prefix,true);
callbackPrefix=prefix;
}

function create(fn,description){var _description;
if(!rootObject){




this.setPrefix("__globalCallbacks");
}
var id=require("guid")();
rootObject[id]=require("wrapFunction")(fn,"entry",(_description=description)!=null?_description:"GlobalCallback");

return callbackPrefix+"."+id;
}

function remove(name){
var id=name.substring(callbackPrefix.length+1);
delete rootObject[id];
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("Log",[],function $module_Log(global,require,requireDynamic,requireLazy,module,exports){

"use strict";exports.setLevel=setLevel;




var level=__DEV__?3:-1;






var Level={
DEBUG:3,
INFO:2,
WARNING:1,
ERROR:0};exports.Level=Level;


var log=function log(
name,
logLevel,
format)

{for(var _len=arguments.length,args=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}
var index=0;
var msg=format.replace(/%s/g,function format_replace_$1(){return String(args[index++]);});
var console=window.console;
if(console&&level>=logLevel){
console[name in console?name:"log"](msg);
}
};exports.log=log;




function setLevel(l){
level=l;
}









var debug=ES(log,"bind",true,null,"debug",Level.DEBUG);exports.debug=debug;



var info=ES(log,"bind",true,null,"info",Level.INFO);exports.info=info;



var warn=ES(log,"bind",true,null,"warn",Level.WARNING);exports.warn=warn;



var error=ES(log,"bind",true,null,"error",Level.ERROR);exports.error=error;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("sdk.UA",[],function $module_sdk_UA(global,require,requireDynamic,requireLazy,module,exports){



var uas=navigator.userAgent;


var devices=









{
iphone:/\b(iPhone|iP[ao]d)/.test(uas),
ipad:/\b(iP[ao]d)/.test(uas),
android:/Android/i.test(uas),
nativeApp:/FBAN\/\w+;/i.test(uas)&&!/FBAN\/mLite;/.test(uas),
nativeAndroidApp:/FB_IAB\/\w+;/i.test(uas),
nativeInstagramApp:/Instagram/i.test(uas),
nativeMessengeriOSApp:/MessengerForiOS/i.test(uas),
nativeMessengerAndroidApp:/Orca\-Android/i.test(uas),
ucBrowser:/UCBrowser/i.test(uas)};

var mobile=/Mobile/i.test(uas);


var versions=








{
ie:NaN,
firefox:NaN,
chrome:NaN,
webkit:NaN,
osx:NaN,
edge:NaN,
operaMini:NaN,
ucWeb:NaN};

var agent=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
uas);

if(agent){
versions.ie=agent[1]?
parseFloat(agent[1]):
agent[4]?
parseFloat(agent[4]):
NaN;

versions.firefox=agent[2]||"";
versions.webkit=agent[3]||"";
if(agent[3]){



var chromeAgent=/(?:Chrome\/(\d+\.\d+))/.exec(uas);
versions.chrome=chromeAgent?chromeAgent[1]:"";
var edgeAgent=/(?:Edge\/(\d+\.\d+))/.exec(uas);
versions.edge=edgeAgent?edgeAgent[1]:"";
}
}


var mac=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
if(mac){
versions.osx=mac[1];
}

var operaMini=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(uas);
if(operaMini){
versions.operaMini=operaMini[1];
}



var ucWeb=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(uas);
if(ucWeb){
versions.ucWeb=ucWeb[1]||"2.0";
}

function getVersionParts(version){
return ES(String(version).
split("."),"map",true,
function map_$0(v){return parseFloat(v);});
}

var UA=


























{};


ES(ES("Object","keys",false,versions),"map",true,function map_$0(key){



var getVersion=function getVersion(){return parseFloat(versions[key]);};



getVersion.getVersionParts=function(){return getVersionParts(versions[key]);};

UA[key]=getVersion;
});

ES(ES("Object","keys",false,devices),"map",true,function map_$0(key){



UA[key]=function(){return devices[key];};
});




UA.mobile=function(){return devices.iphone||devices.ipad||devices.android||mobile;};

UA.mTouch=function(){return devices.android||devices.iphone||devices.ipad;};
UA.facebookInAppBrowser=function(){return devices.nativeApp||devices.nativeAndroidApp;};
UA.inAppBrowser=function(){return(
devices.nativeApp||devices.nativeAndroidApp||devices.nativeInstagramApp);};
UA.mBasic=function(){return!!(versions.ucWeb||versions.operaMini);};
UA.instagram=function(){return devices.nativeInstagramApp;};
UA.messenger=function(){return(
devices.nativeMessengeriOSApp||devices.nativeMessengerAndroidApp);};
UA.isSupportedIABVersion=function(supportedVersion){
if(!UA.facebookInAppBrowser()){
return false;
}
var fb4aVersionRaw=/(?:FBAV\/(\d+(\.\d+)+))/.exec(navigator.userAgent);
if(fb4aVersionRaw){
var fb4aVersion=parseFloat(fb4aVersionRaw[1]);
if(fb4aVersion>=supportedVersion){
return true;
}
}
return false;
};var _default=
UA;module.exports=_default;},null);
                                                                                                              __d("sdk.domReady",[],function $module_sdk_domReady(global,require,requireDynamic,requireLazy,module,exports){module.exports=domReady;



var queue;
var domIsReady=
"readyState"in document?
/loaded|complete/.test(document.readyState):





!!document.body;

function flush(){
if(!queue){
return;
}

var fn;
while(fn=queue.shift()){
fn();
}
queue=null;
}

function domReady(fn){
if(queue){
queue.push(fn);
return;
}else{
fn();
}
}

if(!domIsReady){
queue=[];
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",flush,false);
window.addEventListener("load",flush,false);
}else if(document.attachEvent){
document.attachEvent("onreadystatechange",flush);
window.attachEvent("onload",flush);
}












if(document.documentElement.doScroll&&window===window.top){
var test=function test(){
try{


document.documentElement.doScroll("left");
}catch(_unused){
setTimeout(test,0);
return;
}
flush();
};
test();
}
}},3);
                                                                                                                                    __d("sdk.Content",["Log","sdk.UA","sdk.domReady"],function $module_sdk_Content(global,require,requireDynamic,requireLazy,module,exports){

"use strict";exports.append=append;exports.appendHidden=appendHidden;exports.submitToTarget=submitToTarget;






var visibleRoot;
var hiddenRoot;








function append(content,root){

if(!root){
if(!visibleRoot){
visibleRoot=root=document.getElementById("fb-root");
if(!root){
require("Log").warn("The \"fb-root\" div has not been created, auto-creating");

visibleRoot=root=document.createElement("div");
root.id="fb-root";






if(require("sdk.UA").ie()||!document.body){
require("sdk.domReady")(function domReady_$0(){
if(root&&document.body){
document.body.appendChild(root);
}
});
}else{
document.body.appendChild(root);
}
}
root.className+=" fb_reset";
}else{
root=visibleRoot;
}
}

root.appendChild(content);
return content;
}







function appendHidden(content){
if(!hiddenRoot){
hiddenRoot=document.createElement("div");
var style=hiddenRoot.style;
style.position="absolute";
style.top="-10000px";
style.width="0";
style.height="0";
hiddenRoot=append(hiddenRoot);
}

return append(content,hiddenRoot);
}













function submitToTarget(opts,get){
var form=document.createElement("form");
form.action=opts.url;
form.target=opts.target;
form.method=get?"GET":"POST";
appendHidden(form);

for(var key in opts.params){
if(Object.prototype.hasOwnProperty.call(opts.params,key)){
var val=opts.params[key];
if(val!==null&&val!==undefined){
var input=document.createElement("input");
input.name=key;
input.value=val;
form.appendChild(input);
}
}
}

form.submit();
if(form.parentNode){
form.parentNode.removeChild(form);
}
}},null);
                                                                                               __d("sdk.DOM",["guid","sdk.domReady"],function $module_sdk_DOM(global,require,requireDynamic,requireLazy,module,exports){exports.getAttr=getAttr;exports.getBoolAttr=getBoolAttr;exports.html=html;exports.containsCss=containsCss;exports.addCss=addCss;exports.removeCss=removeCss;exports.getByClass=getByClass;exports.getStyle=getStyle;exports.setStyle=setStyle;exports.updateOrAddCssRule=updateOrAddCssRule;exports.addCssRules=addCssRules;exports.remove=remove;exports.getViewportInfo=getViewportInfo;



var defaultDocumentCssRules={};
var shadowDOMCssRules={};





function getAttr(dom,name){
var attribute=
dom.getAttribute(name)||
dom.getAttribute(name.replace(/_/g,"-"))||
dom.getAttribute(name.replace(/-/g,"_"))||
dom.getAttribute(name.replace(/-/g,""))||
dom.getAttribute(name.replace(/_/g,""))||
dom.getAttribute("data-"+name)||
dom.getAttribute("data-"+name.replace(/_/g,"-"))||
dom.getAttribute("data-"+name.replace(/-/g,"_"))||
dom.getAttribute("data-"+name.replace(/-/g,""))||
dom.getAttribute("data-"+name.replace(/_/g,""));
return attribute!=null?String(attribute):null;
}

function getBoolAttr(dom,name){
var attribute=getAttr(dom,name);
return attribute!=null?/^(true|1|yes|on)$/.test(attribute):null;
}

function html(dom,content){
try{
dom.innerHTML=content;
}catch(e){
throw new Error("Could not set innerHTML : "+e.message);
}
}




function containsCss(dom,className){
var cssClassWithSpace=" "+dom.className+" ";
return ES(cssClassWithSpace,"indexOf",true," "+className+" ")>=0;
}




function addCss(dom,className){
if(dom==null){
return;
}
if(!containsCss(dom,className)){
dom.className=dom.className+" "+className;
}
}




function removeCss(dom,className){
if(dom==null){
return;
}
var regExp=new RegExp("\\s*"+className,"g");
dom.className=ES(dom.className.replace(regExp,""),"trim",true);
}







function getByClass(
className,
dom,
tagName)
{if(tagName===void 0){tagName="*";}
var _dom=dom||document.body;
if(_dom==null){
return[];
}
var _tagName=tagName||"*";
return ES("Array","from",false,_dom.querySelectorAll(_tagName+"."+className));
}







function getStyle(dom,styleProp){
var _styleProp=camelToDashed(styleProp);
var computedStyle=document.defaultView.
getComputedStyle(dom).
getPropertyValue(_styleProp);

computedStyle=dom.style.getPropertyValue(_styleProp);




if(
/background-position?/.test(_styleProp)&&
/top|left/.test(computedStyle))
{
computedStyle="0%";
}
return computedStyle;
}







function setStyle(dom,styleProp,value){
dom.style.setProperty(camelToDashed(styleProp),value);
}

function updateOrAddCssRule(
root,
sdkCssModule,
selectorText,
styleProp,
value)
{
var styleSheetList=root.styleSheets;
for(var i=0;i<styleSheetList.length;i++){var _styleSheetList$i$own;
if(
styleSheetList[i].ownerNode instanceof HTMLElement&&
((_styleSheetList$i$own=styleSheetList[i].ownerNode.dataset.fbcssmodules)==null?void 0:ES(_styleSheetList$i$own,"indexOf",true,
sdkCssModule))!==
-1)
{
var sheet=styleSheetList[i];
if(sheet instanceof CSSStyleSheet){var _value;
for(var j=0;j<sheet.cssRules.length;j++){
var rule=sheet.cssRules[j];
if(rule instanceof CSSStyleRule){
if(rule.selectorText===selectorText){
rule.style.setProperty(camelToDashed(styleProp),value);
return;
}
}
}

sheet.insertRule(
selectorText+
"{"+
camelToDashed(styleProp)+
":"+((_value=
value)!=null?_value:"")+
"}",
0);

}
}
}
}




function addCssRules(
styles,
names,
dom)
{
var cssRules;
if(dom!=null&&dom.nodeType===11){

var shadowDom=dom;
if(
shadowDom.host.id!=null&&
shadowDOMCssRules[shadowDom.host.id]!=null)
{
cssRules=shadowDOMCssRules[shadowDom.host.id];
}else{
if(!shadowDom.host.id){
shadowDom.host.id=require("guid")();
}
cssRules={};
shadowDOMCssRules[shadowDom.host.id]=cssRules;
}
}else{
cssRules=defaultDocumentCssRules;
}



var allIncluded=true;
for(var i=0,id;id=names[i++];){
if(!(id in cssRules)){
allIncluded=false;
cssRules[id]=true;
}
}

if(allIncluded){
return;
}

var style=document.createElement("style");
style.type="text/css";
style.textContent=styles;
style.setAttribute(
"data-fbcssmodules",ES(
names.reduce(function names_reduce_$0(a,cv){return a+cv+" ";}),"trim",true));

if(dom==null||dom===document){
document.getElementsByTagName("head")[0].appendChild(style);
}else{
dom.appendChild(style);
}
}




function remove(elem){
if(!elem||!elem.parentNode){
return null;
}else{
return elem.parentNode.removeChild(elem);
}
}








function getViewportInfo()




{var _document$body,_document$body2;

var root=
document.documentElement&&document.compatMode=="CSS1Compat"?
document.documentElement:
document.body;

return{

scrollTop:(root==null?void 0:root.scrollTop)||((_document$body=document.body)==null?void 0:_document$body.scrollTop),
scrollLeft:(root==null?void 0:root.scrollLeft)||((_document$body2=document.body)==null?void 0:_document$body2.scrollLeft),
width:window.innerWidth?window.innerWidth:root==null?void 0:root.clientWidth,
height:window.innerHeight?window.innerHeight:root==null?void 0:root.clientHeight};

}

var camel_to_dashed=/[A-Z]/g;
var first_segment=/^\([^-]\)-/;
var vendor_prefixes=["o","moz","ms","webkit"];

function camelToDashed(camelCase){
var dashed=camelCase.replace(camel_to_dashed,"-$&").toLowerCase();
var match=dashed.match(first_segment);
if(match&&ES(vendor_prefixes,"indexOf",true,match[1])!==-1){
dashed="-"+dashed;
}
return dashed;
}

var ready=require("sdk.domReady");exports.ready=ready;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("ManagedError",[],function $module_ManagedError(global,require,requireDynamic,requireLazy,module,exports){var

ManagedError=function(_Error){babelHelpers.inheritsLoose(ManagedError,_Error);


function ManagedError(message,innerError){var _this;
_this=_Error.call(this,message!==null&&message!==undefined?message:"")||this;
if(message!==null&&message!==undefined){
_this.message=message;
}else{
_this.message="";
}
_this.innerError=innerError;return _this;
}return ManagedError;}(babelHelpers.wrapNativeSuper(Error));module.exports=ManagedError;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                  __d("normalizeError",["sdk.UA"],function $module_normalizeError(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=normalizeError;















function normalizeError(err){
var info={
line:err.lineNumber||err.line,
message:err.message,
name:err.name,
script:err.fileName||err.sourceURL||err.script,
stack:err.stackTrace||err.stack};



info._originalError=err;





var matches=/([\w:\.\/]+\.js):(\d+)/.exec(err.stack);
if(require("sdk.UA").chrome()&&matches){
info.script=matches[1];
info.line=parseInt(matches[2],10);
}


for(var k in info){
info[k]==null&&delete info[k];
}
return info;
}},null);
                                                                                                 __d("sdk.ErrorHandler",["ManagedError","normalizeError","wrapFunction"],function $module_sdk_ErrorHandler(global,require,requireDynamic,requireLazy,module,exports){exports.create=create;








function create(
handleError,
onError)



{
var currentEntry="";

function errorHandler(error){
var originalError=error._originalError;
delete error._originalError;
onError(error);


throw originalError;
}

function guard(func,entry){
return function(){


if(!handleError){
return func.apply(this,arguments);
}

try{
currentEntry=entry;
return func.apply(this,arguments);
}catch(error){


if(error instanceof require("ManagedError")){
throw error;
}

var data=require("normalizeError")(error);
data.entry=entry;


var sanitizedArgs=ES(Array.prototype.slice.
call(arguments),"map",true,
function map_$0(arg){
var type=Object.prototype.toString.call(arg);
return /^\[object (String|Number|Boolean|Object|Date)\]$/.test(type)?
arg:
arg.toString();
});

data.args=ES("JSON","stringify",false,sanitizedArgs).substring(0,200);
errorHandler(data);
}finally{
currentEntry="";
}
};
}

function unguard(func){
if(!func.__wrapper){
func.__wrapper=function(){
try{
return func.apply(this,arguments);
}catch(e){

window.setTimeout(function window_setTimeout_$0(){
throw e;
},0);
return false;
}
};
}
return func.__wrapper;
}

function getCalleeName(arg){
try{
return arg&&arg.callee&&arg.callee.caller?
arg.callee.caller.name:
"";
}catch(_unused){
return"";
}
}

function wrap(real,entry){
return function(fn,delay){
var name=
entry+
":"+(
currentEntry||"[global]")+
":"+(
fn.name||"[anonymous]"+getCalleeName(arguments));
return real(require("wrapFunction")(fn,"entry",name),delay);
};
}

if(handleError){

setTimeout=wrap(setTimeout,"setTimeout");
setInterval=wrap(setInterval,"setInterval");
require("wrapFunction").setWrapper(guard,"entry");
}

return{
guard:guard,
unguard:unguard};

}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           __d("ObservableMixin",[],function $module_ObservableMixin(global,require,requireDynamic,requireLazy,module,exports){

function ObservableMixin(){
this.__observableEvents={};
}_c=ObservableMixin;

ObservableMixin.prototype={









inform:function inform(what){
var args=Array.prototype.slice.call(arguments,1);
var list=Array.prototype.slice.call(this.getSubscribers(what));
for(var i=0;i<list.length;i++){
if(list[i]===null){
continue;
}
if(__DEV__){
list[i].apply(this,args);
}else{
try{
list[i].apply(this,args);
}catch(e){


window.setTimeout(function window_setTimeout_$0(){
throw e;
},0);
}
}
}
return this;
},







getSubscribers:function getSubscribers(toWhat){
return(
this.__observableEvents[toWhat]||(this.__observableEvents[toWhat]=[]));

},






clearSubscribers:function clearSubscribers(toWhat){
if(toWhat){
this.__observableEvents[toWhat]=[];
}
return this;
},








subscribe:function subscribe(toWhat,withWhat){
var list=this.getSubscribers(toWhat);
list.push(withWhat);
return this;
},








unsubscribe:function unsubscribe(toWhat,withWhat){
var list=this.getSubscribers(toWhat);
for(var i=0;i<list.length;i++){
if(list[i]===withWhat){
list.splice(i,1);
break;
}
}
return this;
}};


module.exports=ObservableMixin;var _c;$RefreshReg$(_c,"ObservableMixin");},null);
                                                                                                                                                                                              __d("AssertionError",["ManagedError"],function $module_AssertionError(global,require,requireDynamic,requireLazy,module,exports){var



AssertionError=function(_ManagedError){babelHelpers.inheritsLoose(AssertionError,_ManagedError);
function AssertionError(message){return(
_ManagedError.call(this,message)||this);
}return AssertionError;}(require("ManagedError"));module.exports=AssertionError;},null);
                                                                                         __d("sprintf",[],(function $module_sprintf(global,require,requireDynamic,requireLazy,module,exports){module.exports=sprintf;










function sprintf(format){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var index=0;
return format.replace(/%s/g,function format_replace_$1(){return String(args[index++]);});
}}),null);
                                                                                                                                                                                                       __d("Assert",["AssertionError","sprintf"],function $module_Assert(global,require,requireDynamic,requireLazy,module,exports){













function assert(expression,message){
if(typeof expression!=="boolean"||!expression){
throw new(require("AssertionError"))(message);
}
return expression;
}










function assertType(type,expression,message){
var actualType;

if(expression===undefined){
actualType="undefined";
}else if(expression===null){
actualType="null";
}else{
var className=Object.prototype.toString.call(expression);
actualType=/\s(\w*)/.exec(className)[1].toLowerCase();
}

assert(
ES(type,"indexOf",true,actualType)!==-1,
message||require("sprintf")("Expression is of type %s, not %s",actualType,type));

return expression;
}










function assertInstanceOf(type,expression,message){
assert(
expression instanceof type,
message||"Expression not instance of type");

return expression;
}

function _define(type,test){
Assert["is"+type]=test;
Assert["maybe"+type]=function(expression,message){

if(expression!=null){
test(expression,message);
}
};
}

var Assert={
isInstanceOf:assertInstanceOf,
isTrue:assert,
isTruthy:function isTruthy(expression,message){
return assert(!!expression,message);
},
type:assertType,
define:function define(type,fn){
type=type.substring(0,1).toUpperCase()+type.substring(1).toLowerCase();

_define(type,function _define_$1(expression,message){
assert(fn(expression),message);
});
}};



ES([
"Array",
"Boolean",
"Date",
"Function",
"Null",
"Number",
"Object",
"Regexp",
"String",
"Undefined"],"forEach",true,
function forEach_$0(type){
_define(type,ES(assertType,"bind",true,null,type.toLowerCase()));
});

module.exports=Assert;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("Type",["Assert"],function $module_Type(global,require,requireDynamic,requireLazy,module,exports){







function Type(){
var mixins=this.__mixins;
if(mixins){
for(var i=0;i<mixins.length;i++){
mixins[i].apply(this,arguments);
}
}
}_c=Type;











function _instanceOf(constructor,which){

if(which instanceof constructor){
return true;
}


if(which instanceof Type){
for(var i=0;i<which.__mixins.length;i++){
if(which.__mixins[i]==constructor){
return true;
}
}
}

return false;
}









function mixin(to,from){
var prototype=to.prototype;

if(!ES("Array","isArray",false,from)){
from=[from];
}

for(var i=0;i<from.length;i++){
var mixinFrom=from[i];

if(typeof mixinFrom==="function"){
prototype.__mixins.push(mixinFrom);
mixinFrom=mixinFrom.prototype;
}

ES(ES("Object","keys",false,mixinFrom),"forEach",true,function forEach_$0(key){
prototype[key]=mixinFrom[key];
});
}
}















function _extend(
from,
prototype,
mixins)
{
var constructor=
prototype&&Object.prototype.hasOwnProperty.call(prototype,"constructor")?
prototype.constructor:
function(){
this.parent.apply(this,arguments);
};

require("Assert").isFunction(constructor);


if(from&&from.prototype instanceof Type===false){
throw new Error("parent type does not inherit from Type");
}
from=from||Type;


function F(){}
F.prototype=from.prototype;
constructor.prototype=new F();

if(prototype){
ES("Object","assign",false,constructor.prototype,prototype);
}


constructor.prototype.constructor=constructor;

constructor.parent=from;



constructor.prototype.__mixins=from.prototype.__mixins?
Array.prototype.slice.call(from.prototype.__mixins):
[];


if(mixins){
mixin(constructor,mixins);
}


constructor.prototype.parent=function(){
this.parent=from.prototype.parent;
from.apply(this,arguments);
};


constructor.prototype.parentCall=function(method){
return from.prototype[method].apply(
this,
Array.prototype.slice.call(arguments,1));

};

constructor.extend=function(prototype,mixins){
return _extend(this,prototype,mixins);
};
return constructor;
}

ES("Object","assign",false,Type.prototype,{
instanceOf:function instanceOf(type){
return _instanceOf(type,this);
}});


ES("Object","assign",false,Type,{
extend:function extend(prototype,mixins){
return typeof prototype==="function"?
_extend.apply(null,arguments):
_extend(null,prototype,mixins);
},
instanceOf:_instanceOf});


module.exports=Type;var _c;$RefreshReg$(_c,"Type");},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("sdk.Model",["ObservableMixin","Type"],function $module_sdk_Model(global,require,requireDynamic,requireLazy,module,exports){

"use strict";




var Model=require("Type").extend(
{
constructor:function constructor(properties){
this.parent();


var propContainer={};
var model=this;

ES(ES("Object","keys",false,properties),"forEach",true,function forEach_$0(name){

propContainer[name]=properties[name];


model["set"+name]=function(value){
if(value===propContainer[name]){
return model;
}
propContainer[name]=value;
model.inform(name+".change",value);
return model;
};


model["get"+name]=function(){
return propContainer[name];
};
});
}},require("ObservableMixin"));var _default=




Model;module.exports=_default;},null);
                                                                                                                                                                                                                                            __d("sdk.Runtime",["JSSDKRuntimeConfig","sdk.Model"],function $module_sdk_Runtime(global,require,requireDynamic,requireLazy,module,exports){var JSSDKRuntimeConfig;









var ENVIRONMENTS={
UNKNOWN:0,
PAGETAB:1,
CANVAS:2,
PLATFORM:4};


var Runtime=new(require("sdk.Model"))({
AccessToken:"",
AutoLogAppEvents:false,
ClientID:"",
CookieUserID:"",
EnforceHttps:false,
Environment:ENVIRONMENTS.UNKNOWN,
GraphDomain:"",
Initialized:false,
IsVersioned:false,
KidDirectedSite:undefined,
Locale:(JSSDKRuntimeConfig=require("JSSDKRuntimeConfig")).locale,
LoggedIntoFacebook:undefined,
LoginStatus:undefined,
Revision:JSSDKRuntimeConfig.revision,
Rtl:JSSDKRuntimeConfig.rtl,
Scope:undefined,
SDKAB:JSSDKRuntimeConfig.sdkab,
SDKUrl:JSSDKRuntimeConfig.sdkurl,
SDKNS:JSSDKRuntimeConfig.sdkns,
UseCookie:false,
UseLocalStorage:true,
UserID:"",
Version:undefined});


ES("Object","assign",false,Runtime,{
ENVIRONMENTS:ENVIRONMENTS,

isEnvironment:function isEnvironment(target){
var environment=this.getEnvironment();
return(target|environment)===environment;
},

isCanvasEnvironment:function isCanvasEnvironment(){
return(
this.isEnvironment(ENVIRONMENTS.CANVAS)||
this.isEnvironment(ENVIRONMENTS.PAGETAB));

}});


(function(){
var environment=/app_runner/.test(window.name)?
ENVIRONMENTS.PAGETAB:
/iframe_canvas/.test(window.name)?
ENVIRONMENTS.CANVAS:
ENVIRONMENTS.UNKNOWN;


if((environment|ENVIRONMENTS.PAGETAB)===environment){
environment|=ENVIRONMENTS.CANVAS;
}
Runtime.setEnvironment(environment);
})();var _default=

Runtime;module.exports=_default;},null);
                                                                                                                                               __d("QueryString",[],function $module_QueryString(global,require,requireDynamic,requireLazy,module,exports){








function encode(bag){
var pairs=[];
ES(ES("Object","keys",false,bag).
sort(),"forEach",true,
function forEach_$0(key){
var value=bag[key];

if(value===undefined){
return;
}

if(value===null){
pairs.push(key);
return;
}

pairs.push(encodeURIComponent(key)+"="+encodeURIComponent(value));
});
return pairs.join("&");
}




function decode(str,strict){if(strict===void 0){strict=false;}
var data={};
if(str===""){
return data;
}

var pairs=str.split("&");
for(var i=0;i<pairs.length;i++){
var pair=pairs[i].split("=",2);
var key=decodeURIComponent(pair[0]);
if(strict&&Object.prototype.hasOwnProperty.call(data,key)){
throw new URIError("Duplicate key: "+key);
}
data[key]=pair.length===2?decodeURIComponent(pair[1]):null;
}
return data;
}






function appendToUrl(url,params){
return(
url+(
ES(url,"indexOf",true,"?")!==-1?"&":"?")+(
typeof params==="string"?params:QueryString.encode(params)));

}

var QueryString=



{
encode:encode,
decode:decode,
appendToUrl:appendToUrl};var _default=


QueryString;module.exports=_default;},null);
                                                                                         __d("Env",[],function $module_Env(global,require,requireDynamic,requireLazy,module,exports){

var Env=








































{
ajaxpipe_token:null,
compat_iframe_token:null,
iframeKey:"",
iframeTarget:"",
iframeToken:"",
isCQuick:false,
start:ES("Date","now",false),
nocatch:false};




if(global.Env){
ES("Object","assign",false,Env,global.Env);
}

global.Env=Env;var _default=

Env;module.exports=_default;},null);
                                                                                                                           __d("TAALOpcode",[],(function $module_TAALOpcode(global,require,requireDynamic,requireLazy,module,exports){

"use strict";






var TAALOpcode={
PREVIOUS_FILE:1,
PREVIOUS_FRAME:2,
PREVIOUS_DIR:3,
FORCED_KEY:4};var _default=


TAALOpcode;module.exports=_default;}),null);
                                                                                                                           __d("invariant",["Env","TAALOpcode","sprintf"],function $module_invariant(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=invariant;var c_Env;


















function invariant(
condition,
format)

{
if(!condition){
var formatString=format;for(var _len=arguments.length,params=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
if(typeof formatString==="number"){var _buildProdMessage=


buildProdMessage(formatString,params),_message=_buildProdMessage.message,decoderLink=_buildProdMessage.decoderLink;
formatString=_message;
params.unshift(decoderLink);
}else if(formatString===undefined){

formatString="Invariant: ";
for(var i=0;i<params.length;i++){
formatString+="%s,";
}
}


var message=formatString;
if(__DEV__){


message=require("sprintf").apply(void 0,[formatString].concat(params));
}
var error=new Error(message);
error.name="Invariant Violation";
error.messageFormat=formatString;
error.messageParams=ES(params,"map",true,function params_map_$0(p){return String(p);});
error.taalOpcodes=[require("TAALOpcode").PREVIOUS_FRAME];


error.stack;
throw error;
}
}

function buildProdMessage(
number,
params)




{
var message="Minified invariant #"+number+"; %s";
if(params.length>0){
message+=" Params: "+ES(params,"map",true,function params_map_$0(_){return"%s";}).join(", ");
}

var decoderLink=
(c_Env||(c_Env=require("Env"))).show_invariant_decoder===true?"visit "+
buildDecoderLink(number,params)+" to see the full message.":
"";

return{message:message,decoderLink:decoderLink};
}

function buildDecoderLink(number,params){


var decodeURI="https://www.internalfb.com/intern/invariant/"+number+"/";
if(params.length>0){
decodeURI+=
"?"+
ES(params,"map",true,

function params_map_$0(param,index){return"args["+
index+"]="+encodeURIComponent(String(param));}).

join("&");
}
return decodeURI;
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                  __d("UrlMap",["invariant","UrlMapConfig","sdk.Runtime"],function $module_UrlMap(global,require,requireDynamic,requireLazy,module,exports,invariant){exports.resolve=resolve;













function resolve(key){
var protocol="https";



if(key==="graph_domain"){
var graphDomain=require("sdk.Runtime").getGraphDomain();
if(!!graphDomain){
key="graph_".concat(graphDomain);
}else{

key="graph";
}
}



if(key in require("UrlMapConfig")){


return protocol+"://"+require("UrlMapConfig")[key];
}


key in require("UrlMapConfig")||invariant(0,"Unknown key in UrlMapConfig: %s",key);
return"";
}},null);
                                                                                  __d("sdk.Scribe",["QueryString","UrlMap","sdk.Runtime"],function $module_sdk_Scribe(global,require,requireDynamic,requireLazy,module,exports){exports.log=log;






function log(
category,
data)
{
if(data.extra!=null&&typeof data.extra==="object"){
var extra=data.extra;
extra.revision=require("sdk.Runtime").getRevision();
}
new Image().src=require("QueryString").appendToUrl(
require("UrlMap").resolve("www")+"/common/scribe_endpoint.php",
{
c:category,
m:ES("JSON","stringify",false,data)});


}},null);
                                                                                                 __d("sdk.FeatureFunctor",[],function $module_sdk_FeatureFunctor(global,require,requireDynamic,requireLazy,module,exports){exports.create=create;








function feature(config,name,defaultValue){
if(config.features&&name in config.features){
var value=config.features[name];
if(typeof value==="object"&&typeof value.rate==="number"){

if(value.rate&&Math.random()*100<=value.rate){
return value.value||true;
}else{
return value.value?null:false;
}
}else{
return value;
}
}
return defaultValue;
}

function create(config){
return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
if(args.length<2){
throw new Error("Default value is required");
}var
name=args[0],defaultValue=args[1];
return feature(config,name,defaultValue);
};
}},null);
                                                                                                              __d("sdk.feature",["JSSDKConfig","sdk.FeatureFunctor"],function $module_sdk_feature(global,require,requireDynamic,requireLazy,module,exports){var _default=
















require("sdk.FeatureFunctor").create(require("JSSDKConfig"));module.exports=_default;},null);
                                                                                                 __d("sdk.ErrorHandling",["sdk.ErrorHandler","sdk.Runtime","sdk.Scribe","sdk.feature"],function $module_sdk_ErrorHandling(global,require,requireDynamic,requireLazy,module,exports){






var handleError=require("sdk.feature")("error_handling",false);var _default=

require("sdk.ErrorHandler").create(
handleError,
function ErrorHandler_create_$1(error){
require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:error.name||error.message,
extra:error});

});module.exports=_default;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("FB",["DOMWrapper","GlobalCallback","JSSDKCssConfig","Log","dotAccess","sdk.Content","sdk.DOM","sdk.ErrorHandling","sdk.domReady"],function $module_FB(global,require,requireDynamic,requireLazy,module,exports){












var externalInterface=window.FB={};

var FB={};

if(__DEV__){
FB.require=require;
window._FB=FB;
}




require("Log").setLevel(__DEV__?3:0);


require("GlobalCallback").setPrefix("FB.__globalCallbacks");

var fbRoot=document.createElement("div");
require("DOMWrapper").setRoot(fbRoot);

require("sdk.domReady")(function domReady_$0(){
require("Log").info("domReady");
require("sdk.Content").appendHidden(fbRoot);
if(require("JSSDKCssConfig").rules){
require("sdk.DOM").addCssRules(require("JSSDKCssConfig").rules,require("JSSDKCssConfig").components);
}
});

function protect(
fn,
accessor,
key,
context)
{
return require("sdk.ErrorHandling").guard(function ErrorHandling_guard_$0(){
function unwrap(val){
if(ES("Array","isArray",false,val)){
return ES(val,"map",true,unwrap);
}
if(val&&typeof val==="object"&&val.__wrapped){

return val.__wrapped;
}





return typeof val==="function"&&/^function/.test(val.toString())?
require("sdk.ErrorHandling").unguard(val):
val;
}

var args=ES(Array.prototype.slice.call(arguments),"map",true,unwrap);

var result=fn.apply(context,args);
var facade;
var isPlainObject=true;

if(result&&typeof result==="object"){



facade=ES("Object","create",false,result);
facade.__wrapped=result;



for(var key in result){
var property=result[key];
if(typeof property!=="function"||key==="constructor"){
continue;
}
isPlainObject=false;
facade[key]=protect(property,accessor+":"+key,key,result);
}
}

if(!isPlainObject){
return facade;
}
return isPlainObject?result:facade;
},accessor);
}














function provide(name,source){
var externalTarget=name?
require("dotAccess")(externalInterface,name,true):
externalInterface;

ES(ES("Object","keys",false,source),"forEach",true,function forEach_$0(key){
var value=source[key];


if(typeof value==="function"){
var accessor=(name?name+".":"")+key;
var exportedProperty=protect(value,accessor,key,source);
if(exportedProperty){
externalTarget[key]=exportedProperty;
}
}else if(typeof value==="object"||typeof value==="number"){
externalTarget[key]=value;
}
});
}


ES("Object","assign",false,FB,{











provide:provide});


module.exports=FB;},null);
                                                                                                                                                                                                       __d("ArgumentError",["ManagedError"],function $module_ArgumentError(global,require,requireDynamic,requireLazy,module,exports){var



ArgumentError=function(_ManagedError){babelHelpers.inheritsLoose(ArgumentError,_ManagedError);
function ArgumentError(message,innerError){return(
_ManagedError.call(this,message,innerError)||this);
}return ArgumentError;}(require("ManagedError"));module.exports=ArgumentError;},null);
                                                                                                        __d("flattenObject",[],function $module_flattenObject(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=flattenObject;










function flattenObject(
obj)
{
var flat={};
for(var _key in obj){
if(Object.prototype.hasOwnProperty.call(obj,_key)){
var value=obj[_key];
if(null===value||undefined===value){
continue;
}else if(typeof value==="string"){
flat[_key]=value;
}else{
flat[_key]=ES("JSON","stringify",false,value);
}
}
}
return flat;
}},null);
                                                                                                        __d("URIRFC3986",[],function $module_URIRFC3986(global,require,requireDynamic,requireLazy,module,exports){exports.parse=parse;



var PARSE_PATTERN=new RegExp(
"^"+
"([^:/?#]+:)?"+
"(//"+
"([^\\\\/?#@]*@)?"+
"("+
"\\[[A-Fa-f0-9:.]+\\]|"+
"[^\\/?#:]*"+
")"+
"(:[0-9]*)?"+
")?"+
"([^?#]*)"+
"(\\?[^#]*)?"+
"(#.*)?");




















function parse(uriString){
if(ES(uriString,"trim",true)===""){
return null;
}
var captures=uriString.match(PARSE_PATTERN);
if(captures==null){
return null;
}
var uri={};




uri.uri=captures[0]?captures[0]:null;
uri.scheme=captures[1]?
captures[1].substr(0,captures[1].length-1):
null;
uri.authority=captures[2]?captures[2].substr(2):null;
uri.userinfo=captures[3]?
captures[3].substr(0,captures[3].length-1):
null;
uri.host=captures[2]?captures[4]:null;
uri.port=captures[5]?
captures[5].substr(1)?
parseInt(captures[5].substr(1),10):
null:
null;
uri.path=captures[6]?captures[6]:null;
uri.query=captures[7]?captures[7].substr(1):null;
uri.fragment=captures[8]?captures[8].substr(1):null;
uri.isGenericURI=uri.authority===null&&!!uri.scheme;
return uri;
}},null);
                                                                                         __d("createObjectFrom",[],function $module_createObjectFrom(global,require,requireDynamic,requireLazy,module,exports){module.exports=createObjectFrom;























function createObjectFrom(
keys,
values)
{
if(__DEV__){
if(!ES("Array","isArray",false,keys)){
throw new TypeError("Must pass an array of keys.");
}
}
if(values===undefined){
return createObjectFrom(keys,true);
}

var object={};
if(ES("Array","isArray",false,values)){
for(var ii=keys.length-1;ii>=0;ii--){
object[keys[ii]]=values[ii];
}
}else{
for(var _ii=keys.length-1;_ii>=0;_ii--){
object[keys[_ii]]=values;
}
}

return object;
}},null);
                                                                                                        __d("URISchemes",["createObjectFrom"],function $module_URISchemes(global,require,requireDynamic,requireLazy,module,exports){exports.isAllowed=isAllowed;



var defaultSchemes=require("createObjectFrom")([
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
"fb-ide-opener"]);






function isAllowed(schema){
if(schema==null||schema===""){
return true;
}
return Object.prototype.hasOwnProperty.call(defaultSchemes,schema.toLowerCase());
}},null);
                                                                                         __d("setHostSubdomain",[],(function $module_setHostSubdomain(global,require,requireDynamic,requireLazy,module,exports){module.exports=setHostSubdomain;

function setHostSubdomain(
domain,
subdomain)
{
var pieces=domain.split(".");
if(pieces.length<3){
pieces.unshift(subdomain);
}else{
pieces[0]=subdomain;
}
return pieces.join(".");
}}),null);
                                                                                  __d("URIAbstractBase",["invariant","URIRFC3986","URISchemes","setHostSubdomain"],function $module_URIAbstractBase(global,require,requireDynamic,requireLazy,module,exports,invariant){var c_URIRFC3986;var c_URISchemes;










var UNSAFE_DOMAIN_PATTERN=new RegExp(


"[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f"+

"\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF"+

"\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]");



var SECURITY_PATTERN=new RegExp(

"^(?:[^/]*:|"+

"[\\x00-\\x1f]*/[\\x00-\\x1f]*/)");















var uriFilters=[];var

























URIAbstractBase=function(){"use strict";URIAbstractBase.
































parse=function parse(
uri,
uriToParse,
shouldThrow,
serializer)
{
if(!uriToParse){
return true;
}


if(uriToParse instanceof URIAbstractBase){
uri.setProtocol(uriToParse.getProtocol());
uri.setDomain(uriToParse.getDomain());
uri.setPort(uriToParse.getPort());
uri.setPath(uriToParse.getPath());
uri.setQueryData(
serializer.deserialize(serializer.serialize(uriToParse.getQueryData())));

uri.setFragment(uriToParse.getFragment());
uri.setIsGeneric(uriToParse.getIsGeneric());
uri.setForceFragmentSeparator(uriToParse.getForceFragmentSeparator());
uri.setOriginalRawQuery(uriToParse.getOriginalRawQuery());
uri.setQueryParamModified(false);
return true;
}

uriToParse=ES(uriToParse.toString(),"trim",true);
var components=(c_URIRFC3986||(c_URIRFC3986=require("URIRFC3986"))).parse(uriToParse)||{
fragment:null,
scheme:null,
query:null};

if(!shouldThrow&&!(c_URISchemes||(c_URISchemes=require("URISchemes"))).isAllowed(components.scheme)){
return false;
}
uri.setProtocol(components.scheme||"");
if(!shouldThrow&&UNSAFE_DOMAIN_PATTERN.test(components.host||"")){
return false;
}
uri.setDomain(components.host||"");
uri.setPort(components.port||"");
uri.setPath(components.path||"");
if(shouldThrow){
uri.setQueryData(serializer.deserialize(components.query||"")||{});
}else{
try{
uri.setQueryData(serializer.deserialize(components.query||"")||{});
}catch(_unused){
return false;
}
}
uri.setFragment(components.fragment||"");


if(components.fragment===""){
uri.setForceFragmentSeparator(true);
}
uri.setIsGeneric(components.isGenericURI||false);
uri.setOriginalRawQuery(components.query);
uri.setQueryParamModified(false);
if(components.userinfo!==null){
if(shouldThrow){
throw new Error("URI.parse: invalid URI (userinfo is not allowed in a URI): "+
uriToParse);

}

return false;
}



if(!uri.getDomain()&&ES(uri.getPath(),"indexOf",true,"\\")!==-1){
if(shouldThrow){
throw new Error("URI.parse: invalid URI (no domain but multiple back-slashes): "+
uriToParse);

}

return false;
}



if(!uri.getProtocol()&&SECURITY_PATTERN.test(uriToParse)){
if(shouldThrow){
throw new Error("URI.parse: invalid URI (unsafe protocol-relative URLs): "+
uriToParse+"'");

}

return false;
}





if(uri.getDomain()&&uri.getPath()&&!ES(uri.getPath(),"startsWith",true,"/")){
if(shouldThrow){
throw new Error("URI.parse: invalid URI (domain and path where path lacks leading slash): "+
uriToParse);

}

return false;
}

return true;
};URIAbstractBase.










tryParse=function tryParse(
uri,
serializer)
{
var result=new URIAbstractBase(null,serializer);
return URIAbstractBase.parse(result,uri,false,serializer)?
result:
null;
};URIAbstractBase.











isValid=function isValid(
uri,
serializer)
{
return!!URIAbstractBase.tryParse(uri,serializer);
};




function URIAbstractBase(uri,serializer){
serializer||invariant(0,"no serializer set");
this.$URIAbstractBase_serializer=serializer;

this.$URIAbstractBase_protocol="";
this.$URIAbstractBase_domain="";
this.$URIAbstractBase_port="";
this.$URIAbstractBase_path="";
this.$URIAbstractBase_fragment="";
this.$URIAbstractBase_isGeneric=false;
this.$URIAbstractBase_queryData={};
this.$URIAbstractBase_forceFragmentSeparator=false;
URIAbstractBase.parse(this,uri,true,serializer);
this.$URIAbstractBase_isQueryParamModified=false;
}var _proto=URIAbstractBase.prototype;_proto.




setProtocol=function setProtocol(protocol){
if(!(c_URISchemes||(c_URISchemes=require("URISchemes"))).isAllowed(protocol)){
false||invariant(0,"\"%s\" is not a valid protocol for a URI.",protocol);
}
this.$URIAbstractBase_protocol=protocol;
return this;
};_proto.




getProtocol=function getProtocol(){
return(this.$URIAbstractBase_protocol||"").toLowerCase();
};_proto.




setSecure=function setSecure(secure){
return this.setProtocol(secure?"https":"http");
};_proto.




isSecure=function isSecure(){
return this.getProtocol()==="https";
};_proto.




setDomain=function setDomain(domain){




if(UNSAFE_DOMAIN_PATTERN.test(domain)){
throw new Error("URI.setDomain: unsafe domain specified: "+
domain+" for url "+this.toString());

}

this.$URIAbstractBase_domain=domain;
return this;
};_proto.




getDomain=function getDomain(){
return this.$URIAbstractBase_domain;
};_proto.




setPort=function setPort(port){
this.$URIAbstractBase_port=port;
return this;
};_proto.




getPort=function getPort(){
return this.$URIAbstractBase_port;
};_proto.




setPath=function setPath(path){
if(__DEV__){
if(path&&path.charAt(0)!=="/"){



var protocol=this.getProtocol();
var safe=
protocol==="mailto"||protocol==="tel"||protocol==="sms";
if(!safe){
console.warn(
"Path does not begin with a \"/\" which means this URI "+
"will likely be malformed. Ensure any string passed to .setPath() "+
"leads with \"/\": path \"%s\" for uri \"%s\".",
path,
this.toString());

}
}
}
this.$URIAbstractBase_path=path;
return this;
};_proto.




getPath=function getPath(){
return this.$URIAbstractBase_path;
};_proto.







addQueryData=function addQueryData(mapOrKey,value){

if(Object.prototype.toString.call(mapOrKey)==="[object Object]"){
ES("Object","assign",false,this.$URIAbstractBase_queryData,mapOrKey);
}else{
this.$URIAbstractBase_queryData[mapOrKey]=value;
}
this.$URIAbstractBase_isQueryParamModified=true;
return this;
};_proto.





setQueryData=function setQueryData(map){
this.$URIAbstractBase_queryData=map;
this.$URIAbstractBase_isQueryParamModified=true;
return this;
};_proto.




getQueryData=function getQueryData(){
return this.$URIAbstractBase_queryData;
};_proto.





setQueryString=function setQueryString(queryString){
return this.setQueryData(this.$URIAbstractBase_serializer.deserialize(queryString));
};_proto.








getQueryString=function getQueryString(
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(preserveQuery===void 0){preserveQuery=false;}if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
return this.$URIAbstractBase_renderQuery(
false,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

};_proto.











$URIAbstractBase_renderQuery=function $URIAbstractBase_renderQuery(
rawQuery,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
if(
!this.$URIAbstractBase_isQueryParamModified&&(
preserveQuery||isDomainNeedRawQuery(this.getDomain())))
{var _this$$URIAbstractBas;
return(_this$$URIAbstractBas=this.$URIAbstractBase_originalRawQuery)!=null?_this$$URIAbstractBas:"";
}
return(rawQuery&&PHPQuerySerializerNoEncoding?
PHPQuerySerializerNoEncoding:
this.$URIAbstractBase_serializer).
serialize(this.getQueryData());
};_proto.




removeQueryData=function removeQueryData(keys){
if(!ES("Array","isArray",false,keys)){
keys=[keys];
}
for(var i=0,length=keys.length;i<length;++i){
delete this.$URIAbstractBase_queryData[keys[i]];
}
this.$URIAbstractBase_isQueryParamModified=true;
return this;
};_proto.




setFragment=function setFragment(fragment){
this.$URIAbstractBase_fragment=fragment;

this.setForceFragmentSeparator(false);
return this;
};_proto.




getFragment=function getFragment(){
return this.$URIAbstractBase_fragment;
};_proto.












setForceFragmentSeparator=function setForceFragmentSeparator(shouldForce){
this.$URIAbstractBase_forceFragmentSeparator=shouldForce;
return this;
};_proto.





getForceFragmentSeparator=function getForceFragmentSeparator(){
return this.$URIAbstractBase_forceFragmentSeparator;
};_proto.

setIsGeneric=function setIsGeneric(isGeneric){
this.$URIAbstractBase_isGeneric=isGeneric;
return this;
};_proto.

getIsGeneric=function getIsGeneric(){
return this.$URIAbstractBase_isGeneric;
};_proto.

getOriginalRawQuery=function getOriginalRawQuery(){
return this.$URIAbstractBase_originalRawQuery;
};_proto.

setOriginalRawQuery=function setOriginalRawQuery(originalRawQuery){
this.$URIAbstractBase_originalRawQuery=originalRawQuery;
return this;
};_proto.

setQueryParamModified=function setQueryParamModified(isQueryParamModified){
this.$URIAbstractBase_isQueryParamModified=isQueryParamModified;
return this;
};_proto.




isEmpty=function isEmpty(){
return!(
this.getPath()||
this.getProtocol()||
this.getDomain()||
this.getPort()||
ES("Object","keys",false,this.getQueryData()).length>0||
this.getFragment());

};_proto.






toString=function toString(
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
return this.$URIAbstractBase_toStringWithFilters(
false,
false,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

};_proto.






toStringRawQuery=function toStringRawQuery(
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
return this.$URIAbstractBase_toStringWithFilters(
true,
false,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

};_proto.












toStringPreserveQuery=function toStringPreserveQuery(
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
return this.$URIAbstractBase_toStringWithFilters(
false,
true,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

};_proto.











$URIAbstractBase_toStringWithFilters=function $URIAbstractBase_toStringWithFilters(
rawQuery,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
var uri=this;
for(var i=0;i<uriFilters.length;i++){
uri=uriFilters[i](uri);
}
return uri.$URIAbstractBase_toStringImpl(
rawQuery,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

};_proto.












$URIAbstractBase_toStringImpl=function $URIAbstractBase_toStringImpl(
rawQuery,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding)
{if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}if(isDomainNeedRawQuery===void 0){isDomainNeedRawQuery=function isDomainNeedRawQuery(){return false;};}if(PHPQuerySerializerNoEncoding===void 0){PHPQuerySerializerNoEncoding=null;}
var str="";
var protocol=this.getProtocol();
if(protocol){
str+=protocol+":"+(this.getIsGeneric()?"":"//");
}
var domain=this.getDomain();
if(domain){
str+=domain;
}
var port=this.getPort();
if(port){
str+=":"+port;
}




var path=this.getPath();
if(path){
str+=path;
}else if(str){
str+="/";
}
var queryStr=this.$URIAbstractBase_renderQuery(
rawQuery,
preserveQuery,
isDomainNeedRawQuery,
PHPQuerySerializerNoEncoding);

if(queryStr){
str+="?"+queryStr;
}
var fragment=this.getFragment();
if(fragment){
str+="#"+fragment;
}else if(this.getForceFragmentSeparator()){
str+="#";
}
return str;
};URIAbstractBase.








registerFilter=function registerFilter(filter){
uriFilters.push(filter);
};_proto.




getOrigin=function getOrigin(){
var port=this.getPort();
return(
this.getProtocol()+"://"+this.getDomain()+(port?":"+port:""));

};_proto.





getQualifiedURIBase=function getQualifiedURIBase(){
return new URIAbstractBase(this,this.$URIAbstractBase_serializer).qualify();
};_proto.





qualify=function qualify(){
if(!this.getDomain()){
var current=new URIAbstractBase(window.location.href,this.$URIAbstractBase_serializer);
this.setProtocol(current.getProtocol()).
setDomain(current.getDomain()).
setPort(current.getPort());
}
return this;
};_proto.













setSubdomain=function setSubdomain(subdomain){
var qualified=this.qualify();
var domain=qualified.getDomain();
return this.setDomain(require("setHostSubdomain")(domain,subdomain));
};_proto.






getSubdomain=function getSubdomain(){
if(!this.getDomain()){
return"";
}

var domains=this.getDomain().split(".");
if(domains.length<=2){
return"";
}else{
return domains[0];
}
};_proto.








isSubdomainOfDomain=function isSubdomainOfDomain(superdomain){
var domain=this.getDomain();
return URIAbstractBase.isDomainSubdomainOfDomain(
domain,
superdomain,
this.$URIAbstractBase_serializer);

};URIAbstractBase.

isDomainSubdomainOfDomain=function isDomainSubdomainOfDomain(
domain,
superdomain,
serializer)
{
if(superdomain===""||domain===""){
return false;
}

if(ES(domain,"endsWith",true,superdomain)){
var domainLen=domain.length;
var superdomainLen=superdomain.length;
var pos=domainLen-superdomainLen-1;

if(domainLen===superdomainLen||domain[pos]==="."){
var uri=new URIAbstractBase(null,serializer);
uri.setDomain(superdomain);
return URIAbstractBase.isValid(uri,serializer);
}
}

return false;
};return URIAbstractBase;}();


module.exports=URIAbstractBase;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           __d("sdk.URI",["QueryString","URIAbstractBase"],function $module_sdk_URI(global,require,requireDynamic,requireLazy,module,exports){





var facebookRe=/\.facebook\.com$/;

var serializer={
serialize:function serialize(map){
return map?require("QueryString").encode(map):"";
},
deserialize:function deserialize(text){
return text?require("QueryString").decode(text):{};
}};var


URI=function(_URIBase){babelHelpers.inheritsLoose(URI,_URIBase);
function URI(uri){return(
_URIBase.call(this,uri,serializer)||this);
}var _proto=URI.prototype;_proto.

isFacebookURI=function isFacebookURI(){
return facebookRe.test(this.getDomain());
};_proto.

valueOf=function valueOf(){
return this.toString();
};URI.

isValidURI=function isValidURI(uri){
return require("URIAbstractBase").isValid(uri,serializer);
};return URI;}(require("URIAbstractBase"));module.exports=URI;},null);
                                                                                  __d("ApiClientUtils",["ArgumentError","Assert","Log","flattenObject","sdk.URI","sprintf"],function $module_ApiClientUtils(global,require,requireDynamic,requireLazy,module,exports){exports.parseCallDataFromArgs=parseCallDataFromArgs;









var METHODS={
get:true,
post:true,
"delete":true,
put:true};






function parseCallDataFromArgs(
args)





{
var path=args.shift();
require("Assert").isString(path,"Invalid path");
if(!/^https?/.test(path)&&path.charAt(0)!=="/"){
path="/"+path;
}

var uri;
var argsMap={};

try{
uri=new(require("sdk.URI"))(path);
}catch(e){
throw new(require("ArgumentError"))(e.message,e);
}


ES(args,"forEach",true,function args_forEach_$0(arg){return argsMap[typeof arg]=arg;});

var method=(argsMap.string||"get").toLowerCase();

require("Assert").isTrue(Object.prototype.hasOwnProperty.call(
METHODS,method),
require("sprintf")("Invalid method passed to ApiClient: %s",method));


var callback=argsMap["function"];
if(!callback){
require("Log").warn("No callback passed to the ApiClient");
}

if(argsMap.object){
uri.addQueryData(require("flattenObject")(argsMap.object));
}

var params=uri.getQueryData();
params.method=method;

return{uri:uri,callback:callback,params:params};
}},null);
                                                                              __d("errorCode",[],function $module_errorCode(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=errorCode;




function errorCode(name){
throw(
new Error(
"errorCode"+"(\""+name+"\"): This should not happen. Oh noes!"));


}},null);
                                                                                                                  __d("nullthrows",[],(function $module_nullthrows(global,require,requireDynamic,requireLazy,module,exports){module.exports=nullthrows;

function nullthrows(
x,
message)
{if(message===void 0){message="Got unexpected null or undefined";}
if(x!=null){
return x;
}
var error=new Error(message);
error.framesToPop=1;
throw error;
}}),null);
                                                                                                 __d("sdk.safelyParseResponse",["errorCode","nullthrows"],function $module_sdk_safelyParseResponse(global,require,requireDynamic,requireLazy,module,exports,errorCode){

"use strict";




var errorHandler=function errorHandler(
_ex,
_rawResponse,
_url,
_responseCode){return(
ERROR);};







function safelyParseResponse(
rawResponse,
url,
responseCode)
{if(url===void 0){url=null;}if(responseCode===void 0){responseCode=null;}
try{


return rawResponse===null?ERROR:ES("JSON","parse",false,require("nullthrows")(rawResponse));
}catch(ex){
return errorHandler(ex,rawResponse,url,responseCode);
}
}

var ERROR={
error:{
code:1,
error_subcode:1357046,
message:"Received Invalid JSON reply.",
type:"http"}};


safelyParseResponse.ERROR=ERROR;
safelyParseResponse.setErrorHandler=function(newHandler){
errorHandler=newHandler;
};var _default=

safelyParseResponse;module.exports=_default;},null);
                                                                                                 __d("whitelistObjectKeys",[],function $module_whitelistObjectKeys(global,require,requireDynamic,requireLazy,module,exports){module.exports=whitelistObjectKeys;





function whitelistObjectKeys(
source,
whitelist)
{
var result={};
var keys=ES("Array","isArray",false,whitelist)?whitelist:ES("Object","keys",false,whitelist);
for(var ii=0;ii<keys.length;ii++){
if(typeof source[keys[ii]]!=="undefined"){
result[keys[ii]]=source[keys[ii]];
}
}
return result;
}},null);
                                                                                  __d("ApiBatcher",["invariant","ApiClientUtils","QueryString","sdk.safelyParseResponse","whitelistObjectKeys"],function $module_ApiBatcher(global,require,requireDynamic,requireLazy,module,exports,invariant){

"use strict";










var REQUESTS_PER_BATCH=50;




var DEFAULT_BATCH_APP_ID=105440539523;var









ApiBatcher=function(){







function ApiBatcher(executeRequest,clientID){this.$ApiBatcher_batchCalls=[];this.$ApiBatcher_batchCallbacks=[];this.$ApiBatcher_scheduleID=null;
this.executeRequest=executeRequest;
this.$ApiBatcher_clientID=clientID;
}var _proto=ApiBatcher.prototype;_proto.

scheduleBatchCall=function scheduleBatchCall(){var _this=this;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var _ApiBatcher$prepareBa=





ApiBatcher.prepareBatchParams(args),body=_ApiBatcher$prepareBa.body,callback=_ApiBatcher$prepareBa.callback,method=_ApiBatcher$prepareBa.method,relative_url=_ApiBatcher$prepareBa.relative_url;

var batchCall={
method:method,
relative_url:relative_url};


if(body){
batchCall.body=body;
}

this.$ApiBatcher_batchCalls.push(batchCall);
this.$ApiBatcher_batchCallbacks.push(callback);



if(this.$ApiBatcher_batchCalls.length==REQUESTS_PER_BATCH){
if(this.$ApiBatcher_scheduleID){
clearTimeout(this.$ApiBatcher_scheduleID);
}
this.$ApiBatcher_dispatchBatchCalls();
}else if(!this.$ApiBatcher_scheduleID){

this.$ApiBatcher_scheduleID=setTimeout(function setTimeout_$0(){
_this.$ApiBatcher_dispatchBatchCalls();
},0);
}
};ApiBatcher.

prepareBatchParams=function prepareBatchParams(
args,
keptQueryParams)






{if(keptQueryParams===void 0){keptQueryParams=[];}var _ApiClientUtils$parse=




require("ApiClientUtils").parseCallDataFromArgs(args),uri=_ApiClientUtils$parse.uri,callback=_ApiClientUtils$parse.callback,method=_ApiClientUtils$parse.params.method;

var body;
var relative_url=uri.removeQueryData("method").toString();
if(method.toLowerCase()=="post"){
var queryData=uri.getQueryData();
body=require("QueryString").encode(queryData);
var filteredQueryData=require("whitelistObjectKeys")(queryData,keptQueryParams);
relative_url=uri.setQueryData(filteredQueryData).toString();
}

return{
body:body,
callback:callback,
method:method,
relative_url:relative_url};

};_proto.





$ApiBatcher_dispatchBatchCalls=function $ApiBatcher_dispatchBatchCalls(){

this.$ApiBatcher_batchCalls.length>0||invariant(0,
"ApiClient: _batchCalls is empty at dispatch.");


this.$ApiBatcher_batchCalls.length===this.$ApiBatcher_batchCallbacks.length||invariant(0,
"ApiClient: Every batch call should have a callback");



var copiedBatchCalls=this.$ApiBatcher_batchCalls;
var copiedBatchCallbacks=this.$ApiBatcher_batchCallbacks;
this.$ApiBatcher_batchCalls=[];
this.$ApiBatcher_batchCallbacks=[];
this.$ApiBatcher_scheduleID=null;


if(copiedBatchCalls.length===1){
var call=copiedBatchCalls[0];
var callback=copiedBatchCallbacks[0];


var body=call.body?require("QueryString").decode(call.body):null;

this.executeRequest(call.relative_url,call.method,body,callback);
return;
}

this.executeRequest(
"/",
"POST",
{
batch:copiedBatchCalls,
include_headers:false,
batch_app_id:this.$ApiBatcher_clientID||DEFAULT_BATCH_APP_ID},

function executeRequest_$3(response){
if(ES("Array","isArray",false,response)){
ES(response,"forEach",true,function response_forEach_$0(data,idx){
copiedBatchCallbacks[idx](require("sdk.safelyParseResponse")(data&&data.body));
});
}else{
ES(copiedBatchCallbacks,"forEach",true,function copiedBatchCallbacks_forEach_$0(callback){return(
callback({error:{message:"Fatal: batch call failed."}}));});

}
});

};return ApiBatcher;}();module.exports=ApiBatcher;},null);
                                                                                         __d("RequestConstants",["errorCode"],function $module_RequestConstants(global,require,requireDynamic,requireLazy,module,exports,errorCode){


var PARSE_ERROR_TEMPLATE={
code:1,
error_subcode:1357045,
message:"unknown error (empty response)",
type:"http",
status:0};exports.PARSE_ERROR_TEMPLATE=PARSE_ERROR_TEMPLATE;},null);
                                                                                                                                                                                                                                                                                                                                                                                                  __d("sdk.Cookie",["QueryString","sdk.Runtime"],function $module_sdk_Cookie(global,require,requireDynamic,requireLazy,module,exports){exports.setRaw=setRaw;exports.getRaw=getRaw;exports.setDomain=setDomain;exports.getDomain=getDomain;exports.loadMeta=loadMeta;exports.loadSignedRequest=loadSignedRequest;exports.setSignedRequestCookie=setSignedRequestCookie;exports.clearSignedRequestCookie=clearSignedRequestCookie;








var domain=null;









function setRaw(
startingPrefix,
val,
ts,
secure)
{var _domain;
var prefix=startingPrefix+require("sdk.Runtime").getClientID();
var secureFlag=secure?";Secure":"";
var useDomain=domain!==null&&domain!==".";

if(useDomain){

document.cookie=
prefix+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT"+secureFlag;

document.cookie=
prefix+
"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;"+
"domain="+
location.hostname+
secureFlag;
}

var expires=new Date(ts).toUTCString();
document.cookie=
prefix+
"="+
val+(
val&&ts===0?"":"; expires="+expires)+
"; path=/"+(
useDomain?"; domain="+((_domain=domain)!=null?_domain:""):"")+
secureFlag;
}

function getRaw(startingPrefix){
var prefix=startingPrefix+require("sdk.Runtime").getClientID();
var regExp=new RegExp("\\b"+prefix+"=([^;]*)\\b");
var matches=document.cookie.match(regExp);
if(matches===null||matches===undefined){
return null;
}else{
return matches[1];
}
}

function setDomain(val){
domain=val;

var meta=require("QueryString").encode({
base_domain:domain!==null&&domain!=="."?domain:""});

var expiration=new Date();
expiration.setFullYear(expiration.getFullYear()+1);
setRaw("fbm_",meta,expiration.getTime(),true);
}

function getDomain(){
return domain;
}




function loadMeta(){
var cookie=getRaw("fbm_");
if(cookie!==null&&cookie!==undefined&&domain===null){

var meta=require("QueryString").decode(cookie);

domain=meta.base_domain;
return meta;
}
return null;
}






function loadSignedRequest(){
return getRaw("fbsr_");
}










function setSignedRequestCookie(
signedRequest,
expiration)
{
if(signedRequest===""){
throw new Error("Value passed to Cookie.setSignedRequestCookie was empty.");
}
setRaw("fbsr_",signedRequest,expiration,true);
}





function clearSignedRequestCookie(){


this.loadMeta();
setRaw("fbsr_","",0,true);
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              __d("CORSRequest",["Log","QueryString","RequestConstants","sdk.Cookie","sdk.safelyParseResponse","wrapFunction"],function $module_CORSRequest(global,require,requireDynamic,requireLazy,module,exports){










function createCORSRequest(method,url){
if(!self.XMLHttpRequest){
return null;
}
var xhr=new XMLHttpRequest();
var noop=function noop(){};
if("withCredentials"in xhr){
xhr.open(method,url,true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
}else if(self.XDomainRequest){

xhr=new XDomainRequest();
try{




xhr.open(method,url);







xhr.onprogress=xhr.ontimeout=noop;
}catch(_unused){
return null;
}
}else{
return null;
}

var wrapper={
send:function send(data){
xhr.send(data);
}};

var onload=require("wrapFunction")(
function wrapFunction_$0(){
onload=noop;
if("onload"in wrapper){
wrapper.onload(xhr);
}
},
"entry",
"XMLHttpRequest:load");

var onerror=require("wrapFunction")(
function wrapFunction_$0(){
onerror=noop;
if("onerror"in wrapper){
wrapper.onerror(xhr);
}
},
"entry",
"XMLHttpRequest:error");







xhr.onload=function(){
onload();
};

xhr.onerror=function(){
onerror();
};

xhr.onreadystatechange=function(){
if(xhr.readyState==4){
if(xhr.status==200){
onload();
}else{
onerror();
}
}
};

return wrapper;
}

function execute(
url,
method,
params,
cb)
{
if(
ES(url,"includes",true,"/../")||ES(
url,"includes",true,"/..\\")||ES(
url,"includes",true,"\\../")||ES(
url,"includes",true,"\\..\\"))
{
require("Log").error("CORSRequest.execute(): path traversal is not allowed.");
return false;
}

try{
if(self.document){
var cppo=require("sdk.Cookie").getRaw("cppo");
if(cppo){
url=require("QueryString").appendToUrl(url,require("QueryString").encode({__cppo:cppo}));
}
}
}catch(_unused2){


}

params.suppress_http_code=1;
var data=require("QueryString").encode(params);

if(method!="post"){
url=require("QueryString").appendToUrl(url,data);
data="";
}

var request=createCORSRequest(method,url);
if(!request){
return false;
}

request.onload=function(xhr){
cb(require("sdk.safelyParseResponse")(xhr.responseText,url,xhr.status));
};

request.onerror=function(xhr){
if(xhr.responseText){
cb(require("sdk.safelyParseResponse")(xhr.responseText,url,xhr.status));
}else{
cb({
error:babelHelpers["extends"]({},
require("RequestConstants").PARSE_ERROR_TEMPLATE,{
status:xhr.status})});


}
};
request.send(data);
return true;
}

var CORSRequest={
execute:execute};var _default=

CORSRequest;module.exports=_default;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               __d("ChunkedRequest",["Log","QueryString","RequestConstants","sdk.safelyParseResponse","wrapFunction"],function $module_ChunkedRequest(global,require,requireDynamic,requireLazy,module,exports){exports.execute=execute;









var EMPTY_CHUNK_TEXT="{}";var


















ChunkParser=function(){



function ChunkParser(delimiter){if(delimiter===void 0){delimiter="\r\n";}this.offset=0;this.delimiter="\r\n";
this.delimiter=delimiter;
}var _proto=ChunkParser.prototype;_proto.

parse=function parse(text,final){if(final===void 0){final=false;}
var subChunks=[];
var chunk=text.substring(this.offset);
var start=0;
var finish=ES(chunk,"indexOf",true,this.delimiter,start);

if(finish===0){

start=this.delimiter.length;

finish=ES(chunk,"indexOf",true,this.delimiter,start);
}

while(finish>-1){
var subChunk=chunk.substring(start,finish);
if(subChunk){
subChunks.push(subChunk);
}
start=finish+this.delimiter.length;
finish=ES(chunk,"indexOf",true,this.delimiter,start);
}
this.offset+=start;


if(final&&chunk&&finish===-1){

var remaining=text.substring(this.offset);
subChunks.push(remaining);
}

return subChunks;
};return ChunkParser;}();


function createChunkedRequest(method,url){
if(!self.XMLHttpRequest){
return null;
}
var xhr=new XMLHttpRequest();
if(!("withCredentials"in xhr)){
return null;
}

xhr.open(method,url,true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

var chunkParser=new ChunkParser();
var wrapper={
send:function send(data){
xhr.send(data);
}};

var onchunk=require("wrapFunction")(
function wrapFunction_$0(chunkText,done){



if(wrapper.onchunk){
var subChunks=chunkParser.parse(chunkText);
ES(subChunks,"forEach",true,function subChunks_forEach_$0(subChunk){return wrapper.onchunk(subChunk,done);});
if(done){
wrapper.onchunk(EMPTY_CHUNK_TEXT,done);
}
}
},
"entry",
"XMLHttpRequest:onchunk");

var onerror=require("wrapFunction")(
function wrapFunction_$0(){



if(wrapper.onerror){
wrapper.onerror(xhr);
}
},
"entry",
"XMLHttpRequest:error");


xhr.onerror=onerror;

xhr.onreadystatechange=function(){
if(xhr.readyState==4){
if(xhr.status===200){
onchunk(xhr.responseText,true);
}else{
onerror();
}
}else if(xhr.readyState==3){

onchunk(xhr.responseText,false);
}
};

return wrapper;
}

function execute(
url,
method,
params,
cb)
{
if(
ES(url,"includes",true,"/../")||ES(
url,"includes",true,"/..\\")||ES(
url,"includes",true,"\\../")||ES(
url,"includes",true,"\\..\\"))
{
require("Log").error("ChunkedRequest.execute(): path traversal is not allowed.");
return false;
}
params.suppress_http_code=1;
var data=require("QueryString").encode(params);

if(method!="post"){
url=require("QueryString").appendToUrl(url,data);
data="";
}

var request=createChunkedRequest(method,url);
if(!request){
return false;
}

request.onchunk=function(chunkText,done){
cb(require("sdk.safelyParseResponse")(chunkText),done);
};

request.onerror=function(xhr){
if(xhr.responseText){
cb(require("sdk.safelyParseResponse")(xhr.responseText,null,xhr.status));
}else{
cb({
error:babelHelpers["extends"]({},
require("RequestConstants").PARSE_ERROR_TEMPLATE,{
status:xhr.status})});


}
};
request.send(data);
return true;
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("JSONPRequest",["DOMWrapper","GlobalCallback","Log","QueryString"],function $module_JSONPRequest(global,require,requireDynamic,requireLazy,module,exports){





var MAX_QUERYSTRING_LENGTH=2000;


var _ignoreMaxQuerystringLength=false;









function execute(
url,
method,
params,
cb)
{
if(
ES(url,"includes",true,"/../")||ES(
url,"includes",true,"/..\\")||ES(
url,"includes",true,"\\../")||ES(
url,"includes",true,"\\..\\"))
{
require("Log").error("JSONPRequest.execute(): path traversal is not allowed.");
return false;
}
var script=document.createElement("script");

var _callbackWrapper=function callbackWrapper(response){
_callbackWrapper=function callbackWrapper(){};
require("GlobalCallback").remove(params.callback);
cb(response);
script.parentNode.removeChild(script);
};

params.callback=require("GlobalCallback").create(_callbackWrapper);


if(!params.method){
params.method=method;
}

url=require("QueryString").appendToUrl(url,params);
if(!_ignoreMaxQuerystringLength&&url.length>MAX_QUERYSTRING_LENGTH){
require("GlobalCallback").remove(params.callback);
return false;
}


script.onerror=function(){
_callbackWrapper({
error:{
type:"http",
message:"unknown error"}});


};


var ensureCallbackCalled=function ensureCallbackCalled(){
setTimeout(function setTimeout_$0(){


_callbackWrapper({
error:{
type:"http",
message:"unknown error"}});


},0);
};
if(script.addEventListener){
script.addEventListener("load",ensureCallbackCalled,false);
}else{
script.onreadystatechange=function(){
if(/loaded|complete/.test(this.readyState)){
ensureCallbackCalled();
}
};
}

script.src=url;
require("DOMWrapper").getRoot().appendChild(script);
return true;
}

function ignoreMaxQuerystringLength(){
_ignoreMaxQuerystringLength=true;
}

var JSONPRequest={
execute:execute,
ignoreMaxQuerystringLength:ignoreMaxQuerystringLength,
MAX_QUERYSTRING_LENGTH:MAX_QUERYSTRING_LENGTH};


module.exports=JSONPRequest;},null);
                                                                                                 __d("ApiClient",["ApiBatcher","ApiClientUtils","Assert","CORSRequest","ChunkedRequest","JSONPRequest","Log","ObservableMixin","QueryString","UrlMap","flattenObject"],function $module_ApiClient(global,require,requireDynamic,requireLazy,module,exports){














var accessToken;
var clientID;
var defaultParams;
var keptQueryParams=[];

var MAX_QUERYSTRING_LENGTH=require("JSONPRequest").MAX_QUERYSTRING_LENGTH;

var READONLYCALLS={
fql_query:true,
fql_multiquery:true,
friends_get:true,
notifications_get:true,
stream_get:true,
users_getinfo:true};


var defaultTransports=["cors","jsonp"];

var currentlyExecutingRequests=0;
var requestQueue=[];
var maxConcurrentRequests=0;
var requestCounter=0;

var apiBatcher;


var logger=require("Log");









function request(
url,
method,
paramsRaw,
cb)
{

var shouldQueueRequest=
maxConcurrentRequests!==0&&
currentlyExecutingRequests>=maxConcurrentRequests;

if(shouldQueueRequest){


requestQueue.push(function requestQueue_push_$0(){return request(url,method,paramsRaw,cb);});
ApiClient.inform("request.queued",url,method,paramsRaw);
return;
}

currentlyExecutingRequests++;

var params=babelHelpers["extends"]({},
defaultParams,
paramsRaw);


params.pretty=params.pretty||0;

params=require("flattenObject")(params);
var availableTransports={


jsonp:require("JSONPRequest"),
cors:require("CORSRequest"),


chunked:require("ChunkedRequest")};


var getParams={};



var accessTokenForRequest=params.access_token||accessToken;
if(accessTokenForRequest){
getParams.access_token=accessTokenForRequest;
}
if(method!=="get"){
ES(keptQueryParams,"forEach",true,function keptQueryParams_forEach_$0(keptQueryParam){
getParams[keptQueryParam]=params[keptQueryParam];
});
}

var getParamNames=ES("Object","keys",false,getParams);
if(getParamNames.length>0){
url=require("QueryString").appendToUrl(url,getParams);


delete params.access_token;
}



var transports=defaultTransports;

for(var i=0;i<transports.length;i++){
var transport=availableTransports[transports[i]];
var paramsCopy=ES("Object","assign",false,{},params);
if(transport.execute(url,method,paramsCopy,cb)){
return;
}
}

cb({
error:{
type:"no-transport",
message:"Could not find a usable transport for request"}});


}

function inspect(
callback,
endpoint,
method,
params,
startTime,
requestIndex,
response,
done)
{

if(params.transport&&params.transport==="chunked"&&done===false){
callback(response,false);
return;
}

if(response&&response.error){
ApiClient.inform(
"request.error",
endpoint,
method,
params,
response,
ES("Date","now",false)-startTime,
requestIndex);

}

ApiClient.inform(
"request.complete",
endpoint,
method,
params,
response,
ES("Date","now",false)-startTime,
requestIndex);


currentlyExecutingRequests--;
if(callback){
callback(response);
}



var shouldExecuteQueuedRequest=
requestQueue.length>0&&
currentlyExecutingRequests<maxConcurrentRequests;
if(shouldExecuteQueuedRequest){
var nextRequest=requestQueue.shift();
nextRequest();
}
}
























function requestUsingGraph(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var _ApiClientUtils$parse=
require("ApiClientUtils").parseCallDataFromArgs(args),uri=_ApiClientUtils$parse.uri,callback=_ApiClientUtils$parse.callback,params=_ApiClientUtils$parse.params;
var method=params.method;

if(requestIsTooLargeForGet(uri,method)){
method="post";
}

var url=
uri.getProtocol()&&uri.getDomain()?
uri.setQueryData({}).toString():
require("UrlMap").resolve("graph_domain")+uri.getPath();

var requestIndex=requestCounter++;
if("_fb_domain"in params){
ApiClient.setKeptQueryParams(["_fb_domain"]);
}
ApiClient.inform("request.prepare",url,params,requestIndex);

request(
url,
method=="get"?"get":"post",
params,ES(
inspect,"bind",true,
null,
callback,
uri.getPath(),
method,
params,ES("Date","now",false),

requestIndex));


}




function scheduleBatchCall(){var _apiBatcher;
if(!apiBatcher){
apiBatcher=new(require("ApiBatcher"))(requestUsingGraph,clientID);
}
(_apiBatcher=apiBatcher).scheduleBatchCall.apply(_apiBatcher,arguments);
}












function requestUsingRest(params,cb){
require("Assert").isObject(params);
require("Assert").isString(params.method,"method missing");

if(!cb){
logger.warn("No callback passed to the ApiClient");
}
var method=params.method.toLowerCase().replace(".","_");
params.format="json-strings";
params.api_key=clientID;

var domain=method in READONLYCALLS?"api_read":"api";
var url=require("UrlMap").resolve(domain)+"/restserver.php";
var requestIndex=requestCounter++;
var inspector=ES(inspect,"bind",true,
null,
cb,
"/restserver.php",
"get",
params,ES("Date","now",false),

requestIndex);

request(url,"get",params,inspector);
}

function prepareBatchParams(args){
return require("ApiBatcher").prepareBatchParams(args,keptQueryParams);
}






























var ApiClient=ES("Object","assign",false,new(require("ObservableMixin"))(),{
setAccessToken:function setAccessToken(access_token){
if(accessToken&&access_token&&accessToken!==access_token){
logger.error(
"You are overriding current access token, that means some other "+
"app is expecting different access token and you will probably "+
"break things. Please consider passing access_token directly to "+
"API parameters instead of overriding the global settings.");

}
accessToken=access_token;
},
setAccessTokenForClientID:function setAccessTokenForClientID(access_token,client_id){
if(accessToken&&clientID&&clientID!==client_id){
logger.error(
"Not overriding access token since it was not "+
"initialized by your application.");

}else{
accessToken=access_token;
}
},
getClientID:function getClientID(){
return clientID;
},
getAccessToken:function getAccessToken(){
return accessToken;
},
setClientID:function setClientID(client_id){
if(clientID&&clientID!==client_id){
logger.warn(
"Warning: Two different applications have attempted to set the "+
"client ID. Overriding the previously set client ID.");

}
clientID=client_id;
},
setDefaultParams:function setDefaultParams(default_params){
defaultParams=default_params;
},
getDefaultParams:function getDefaultParams(){
return defaultParams;
},
setDefaultTransports:function setDefaultTransports(newDefaultTransports){
defaultTransports=newDefaultTransports;
},
setLogger:function setLogger(customLogger)





{
logger=customLogger;
},
setMaxConcurrentRequests:function setMaxConcurrentRequests(value){
maxConcurrentRequests=value;
},
setKeptQueryParams:function setKeptQueryParams(params){
keptQueryParams=params;
},
getCurrentlyExecutingRequestCount:function getCurrentlyExecutingRequestCount(){
return currentlyExecutingRequests;
},
getQueuedRequestCount:function getQueuedRequestCount(){
return requestQueue.length;
},
rest:requestUsingRest,
graph:requestUsingGraph,
scheduleBatchCall:scheduleBatchCall,
prepareBatchParams:prepareBatchParams});


function requestIsTooLargeForGet(uri,method){
return uri.toString().length>MAX_QUERYSTRING_LENGTH&&method==="get";
}var _default=

ApiClient;module.exports=_default;},null);
                                                                                                              __d("sdk.PlatformVersioning",["ManagedError","sdk.Runtime"],(function $module_sdk_PlatformVersioning(global,require,requireDynamic,requireLazy,module,exports){exports.assertVersionIsSet=assertVersionIsSet;exports.assertValidVersion=assertValidVersion;





var REGEX=/^v\d+\.\d\d?$/;exports.REGEX=REGEX;

function assertVersionIsSet(){
if(!require("sdk.Runtime").getVersion()){
throw new(require("ManagedError"))("init not called with valid version");
}
}

function assertValidVersion(version){
if(!REGEX.test(version)){
throw new(require("ManagedError"))("invalid version specified");
}
}}),null);
                                                                                                                                                                                       __d("sdk.warnInsecure",["Log","sdk.Runtime","sdk.Scribe","sdk.feature"],function $module_sdk_warnInsecure(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=warnInsecure;







var httpsOnlyLearnMore=require("sdk.feature")("https_only_learn_more","");
var logged={};

function warnInsecure(methodName){
if(window.location.protocol!=="https:"){
require("Log").log(
"error",
-1,
"The method FB.%s can no longer be called from http pages. %s",
methodName,
httpsOnlyLearnMore);

if(
require("sdk.feature")("https_only_scribe_logging",true)&&
!Object.prototype.hasOwnProperty.call(logged,methodName))
{
require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:"HttpsOnly",
extra:{
message:methodName}});


logged[methodName]=true;
}
}
return true;
}},null);
                                                                                             __d("sdk.api",["ApiClient","sdk.PlatformVersioning","sdk.Runtime","sdk.Scribe","sdk.URI","sdk.feature","sdk.warnInsecure"],function $module_sdk_api(global,require,requireDynamic,requireLazy,module,exports){var ApiClient;








var shouldLogResponseError=require("sdk.feature")("should_log_response_error",false);


var currentAccessToken;

require("sdk.Runtime").subscribe("ClientID.change",function Runtime_subscribe_$1(value){return(
require("ApiClient").setClientID(value));});


require("sdk.Runtime").subscribe("AccessToken.change",function Runtime_subscribe_$1(value){
currentAccessToken=value;
require("ApiClient").setAccessToken(value);
});

(ApiClient=require("ApiClient")).setDefaultParams({
sdk:"joey"});



ApiClient.subscribe("request.complete",function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
var invalidateToken=false;
if(response&&typeof response==="object"){
if(response.error){
if(
response.error=="invalid_token"||
response.error.type=="OAuthException"&&response.error.code==190)
{
invalidateToken=true;
}
}else if(response.error_code){
if(response.error_code=="190"){
invalidateToken=true;
}
}
}
if(invalidateToken&&currentAccessToken===require("sdk.Runtime").getAccessToken()){

require("sdk.Runtime").setAccessToken(null);
}
});


ApiClient.subscribe("request.complete",function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
if(
(endpoint=="/me/permissions"&&method==="delete"||
endpoint=="/restserver.php"&&
params.method=="Auth.revokeAuthorization")&&
response===true)
{
require("sdk.Runtime").setAccessToken(null);
}
});


ApiClient.subscribe("request.error",function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
if(shouldLogResponseError&&response.error.type==="http"){
require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:"transport",
extra:{
name:"transport",

message:
ES("JSON","stringify",false,response.error)+" from "+endpoint+" , "+method}});


}
});







function api(path){
require("sdk.warnInsecure")("api");


if(typeof path==="string"){
if(require("sdk.Runtime").getIsVersioned()){
require("sdk.PlatformVersioning").assertVersionIsSet();


if(!/https?/.test(path)&&path.charAt(0)!=="/"){
path="/"+path;
}
path=new(require("sdk.URI"))(path).setDomain(null).setProtocol(null).toString();


if(
!require("sdk.PlatformVersioning").REGEX.test(path.substring(1,ES(path,"indexOf",true,"/",1))))
{
path="/"+require("sdk.Runtime").getVersion()+path;
}

var args=[path].concat(Array.prototype.slice.call(arguments,1));
require("ApiClient").graph.apply(require("ApiClient"),args);
}else{
require("ApiClient").graph.apply(require("ApiClient"),arguments);
}
}else{
require("ApiClient").rest.apply(require("ApiClient"),arguments);
}
}

module.exports=api;},null);
                                                                                                                                       __d("legacy:fb.api",["FB","sdk.api"],(function $module_legacy_fb_api(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){




require("FB").provide("",{api:require("sdk.api")});}),3);
                                                                                                                                                                                                                                                                                   __d("Miny",[],function $module_Miny(global,require,requireDynamic,requireLazy,module,exports){

var MAGIC="Miny1";
var LO="wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("");

var Miny={

encode:function encode(s){
if(/^$|[~\\]|__proto__/.test(s)){
return s;
}


var parts=s.match(/\w+|\W+/g);

var i;


var dict=ES("Object","create",false,null);
for(i=0;i<parts.length;i++){
dict[parts[i]]=(dict[parts[i]]||0)+1;
}



var keys=ES("Object","keys",false,dict);
keys.sort(function keys_sort_$0(a,b){return dict[b]-dict[a];});


for(i=0;i<keys.length;i++){
var n=(i-i%32)/32;
dict[keys[i]]=n?n.toString(32)+LO[i%32]:LO[i%32];
}


var codes="";
for(i=0;i<parts.length;i++){
codes+=dict[parts[i]];
}

keys.unshift(MAGIC,keys.length);
keys.push(codes);
return keys.join("~");
}};


module.exports=Miny;},null);
                                                                                                                                                                                                                                                                                                                                                                                           __d("getBlankIframeSrc",["sdk.UA"],function $module_getBlankIframeSrc(global,require,requireDynamic,requireLazy,module,exports){module.exports=getBlankIframeSrc;



function getBlankIframeSrc(){
return require("sdk.UA").ie()<10?"javascript:false":"about:blank";
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          __d("insertIframe",["GlobalCallback","getBlankIframeSrc","guid"],function $module_insertIframe(global,require,requireDynamic,requireLazy,module,exports){module.exports=insertIframe;






function insertIframe(opts)










{



var id=opts.id!=null?opts.id:require("guid")();
var name=opts.name!=null?opts.name:require("guid")();






var srcSet=false;
var onloadDone=false;
var callback=function callback(){
if(srcSet&&!onloadDone){
onloadDone=true;
if(typeof opts.onload==="function"){
opts.onload(opts.root.firstChild);
}
}
};
var globalCallback=require("GlobalCallback").create(callback);





if(document.attachEvent){


var html=
"<iframe"+
" id=\""+
id+
"\""+
" name=\""+
name+
"\""+(
opts.title!=null?" title=\""+opts.title+"\"":"")+(
opts.className!=null?" class=\""+opts.className+"\"":"")+
" style=\"border:none;"+(
opts.width!=null?"width:"+opts.width+"px;":"")+(
opts.height!=null?"height:"+opts.height+"px;":"")+
"\""+
" src=\""+
require("getBlankIframeSrc")()+
"\""+
" frameborder=\"0\""+
" scrolling=\"no\""+
" allowtransparency=\"true\""+
" onload=\""+
globalCallback+
"()\""+
"></iframe>";









opts.root.innerHTML=
"<iframe src=\""+
require("getBlankIframeSrc")()+
"\""+
" frameborder=\"0\""+
" scrolling=\"no\""+
" style=\"height:1px\"></iframe>";


srcSet=true;






window.setTimeout(function window_setTimeout_$0(){
opts.root.innerHTML=html;


opts.root.firstChild.src=opts.url;
typeof opts.onInsert==="function"&&
opts.onInsert(opts.root.firstChild);
},0);
}else{



var node=document.createElement("iframe");
node.id=id;
node.name=name;
node.onload=callback;
node.scrolling="no";
node.style.border="none";
node.style.overflow="hidden";
if(opts.title!=null){
node.title=opts.title;
}
if(opts.className!=null){
node.className=opts.className;
}
if(opts.height!==undefined){
node.style.height=opts.height+"px";
}
if(opts.width!==undefined){
if(opts.width==="100%"){
node.style.width=opts.width;
}else{
node.style.width=opts.width+"px";
}
}
opts.root.appendChild(node);


srcSet=true;

node.src=opts.url;
opts.onInsert&&opts.onInsert(node);
}
}},null);
                                                                                                 __d("sdk.Impressions",["Miny","QueryString","UrlMap","getBlankIframeSrc","guid","insertIframe","sdk.Content","sdk.Runtime"],function $module_sdk_Impressions(global,require,requireDynamic,requireLazy,module,exports){exports.impression=impression;exports.log=log;


















function impression(params){
var clientID=require("sdk.Runtime").getClientID();

if(
clientID&&(
typeof params.api_key!=="string"||params.api_key===""))
{
params.api_key=clientID;
}

params.kid_directed_site=require("sdk.Runtime").getKidDirectedSite();

var url=require("UrlMap").resolve("www")+"/impression.php/"+require("guid")()+"/";
var fullUrlPath=require("QueryString").appendToUrl(url,params);
if(fullUrlPath.length>2000){


if(params.payload&&typeof params.payload==="string"){
var payload=params.payload;
var minyPayload=require("Miny").encode(payload);
if(minyPayload&&minyPayload.length<payload.length){
params.payload=minyPayload;
fullUrlPath=require("QueryString").appendToUrl(url,params);
}
}
}

_makeRequest_DEPRECATED(url,fullUrlPath,params);
}

function _makeRequest_DEPRECATED(
url,
fullUrlPath,
params)
{
if(fullUrlPath.length<=2000){
var image=new Image();
image.src=fullUrlPath;
}else{
var name=require("guid")();
var root=require("sdk.Content").appendHidden(document.createElement("div"));
require("insertIframe")({
url:require("getBlankIframeSrc")(),
root:root,
name:name,
className:"fb_hidden fb_invisible",
onload:function onload(){
if(root.parentNode!=null){
root.parentNode.removeChild(root);
}
}});


require("sdk.Content").submitToTarget({
url:url,
target:name,
params:params});

}
}

function log(lid,payload){
if(typeof payload.source!=="string"||payload.source===""){
payload.source="jssdk";
}

impression({
lid:lid,
payload:ES("JSON","stringify",false,payload)});

}},null);
                                                                                         __d("Base64",[],function $module_Base64(global,require,requireDynamic,requireLazy,module,exports){














var en="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function en3(c){
var num=
c.charCodeAt(0)<<16|c.charCodeAt(1)<<8|c.charCodeAt(2);
return String.fromCharCode(
en.charCodeAt(num>>>18),
en.charCodeAt(num>>>12&63),
en.charCodeAt(num>>>6&63),
en.charCodeAt(num&63));

}




var de=
">___?456789:;<=_______"+
"\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000B\f\r\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019"+
"______\u001A\u001B\u001C\u001D\u001E\u001F !\"#$%&'()*+,-./0123";
function de4(c){
var num=
de.charCodeAt(c.charCodeAt(0)-43)<<18|
de.charCodeAt(c.charCodeAt(1)-43)<<12|
de.charCodeAt(c.charCodeAt(2)-43)<<6|
de.charCodeAt(c.charCodeAt(3)-43);
return String.fromCharCode(num>>>16,num>>>8&255,num&255);
}

var Base64=





{
encode:function encode(input){

var str=unescape(encodeURI(input));
var i=(str.length+2)%3;
str=(str+"\u0000\u0000".slice(i)).replace(/[\s\S]{3}/g,en3);
return str.slice(0,str.length+i-2)+"==".slice(i);
},
decode:function decode(input){

var str=input.replace(/[^A-Za-z0-9+\/]/g,"");
var i=str.length+3&3;
str=(str+"AAA".slice(i)).replace(/..../g,de4);
str=str.slice(0,str.length+i-3);

try{
return decodeURIComponent(escape(str));
}catch(_unused){
throw new Error("Not valid UTF-8");
}
},
encodeObject:function encodeObject(obj){



return Base64.encode(ES("JSON","stringify",false,obj));
},
decodeObject:function decodeObject(b64){
return ES("JSON","parse",false,Base64.decode(b64));
},

encodeNums:function encodeNums(l){
return String.fromCharCode.apply(
String,ES(
l,"map",true,function l_map_$0(val){
return en.charCodeAt(
(val|-(val>63?1:0))&-(val>0?1:0)&63);

}));

}};var _default=


Base64;module.exports=_default;},null);
                                                                                                                                                                                                                                                                                                                                                                       __d("sdk.SignedRequest",["Base64"],function $module_sdk_SignedRequest(global,require,requireDynamic,requireLazy,module,exports){exports.parse=parse;



function parse(signed_request){
if(signed_request==null||signed_request===""){
return null;
}


var payload=signed_request.
split(".",2)[1].
replace(/\-/g,"+").
replace(/\_/g,"/");
return require("Base64").decodeObject(payload);
}},null);
                                                                                                                                                                                                                                                                                                                                                                                                                               __d("sdk.WebStorage",["Log"],function $module_sdk_WebStorage(global,require,requireDynamic,requireLazy,module,exports){

"use strict";exports.getLocalStorage=getLocalStorage;exports.getLocalStorageForRead=getLocalStorageForRead;exports.getSessionStorage=getSessionStorage;exports.getSessionStorageForRead=getSessionStorageForRead;



function getLocalStorage(){
try{

return window.localStorage;
}catch(_unused){
require("Log").warn("Failed to get local storage");
}
return null;
}






function getLocalStorageForRead(){
try{


var storage=window.localStorage;



if(storage){
var key="__test__"+ES("Date","now",false);
storage.setItem(key,"");
storage.removeItem(key);
}
return storage;
}catch(_unused2){
require("Log").warn("Failed to get local storage");
}
return null;
}

function getSessionStorage(){
try{

return window.sessionStorage;
}catch(_unused3){
require("Log").warn("Failed to get session storage");
}
return null;
}






function getSessionStorageForRead(){
try{


var storage=window.sessionStorage;



if(storage){
var key="__test__"+ES("Date","now",false);
storage.setItem(key,"");
storage.removeItem(key);
}
return storage;
}catch(_unused4){
require("Log").warn("Failed to get session storage");
}
return null;
}},null);
                                                                                               __d("sdk.getContextType",["sdk.Runtime","sdk.UA"],function $module_sdk_getContextType(global,require,requireDynamic,requireLazy,module,exports){module.exports=getContextType;




function getContextType(){






if(require("sdk.UA").nativeApp()){
return 3;
}
if(require("sdk.UA").mobile()){
return 2;
}
if(require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)){
return 5;
}
return 1;
}},null);
                                                                                                 __d("sdk.Auth",["Log","ObservableMixin","QueryString","UrlMap","sdk.Cookie","sdk.Impressions","sdk.Runtime","sdk.Scribe","sdk.SignedRequest","sdk.UA","sdk.URI","sdk.WebStorage","sdk.feature","sdk.getContextType"],function $module_sdk_Auth(global,require,requireDynamic,requireLazy,module,exports){





















var LOCAL_STORAGE_TOKEN_PREFIX="fblst_";
var SESSION_STORAGE_LOGIN_STATUS_PREFIX="fbssls_";
var LOGOUT_COOKIE_PREFIX="fblo_";
var YEAR_MS=365*24*60*60*1000;
var CONNECTED_REVALIDATE_PERIOD=60*90*1000;
var DEFAULT_REVALIDATE_PERIOD=60*60*24*1000;
var LOGIN_COMPLETE_HEARTBEAT_TIMEOUT=5*1000;
var PLATFORM_E2E_TRACKING_LOG_ID=114;
var PLATFORM_JSSDK_FUNNEL_LOG_ID=117;

var currentAuthResponse;

var timer;

var facebookRe=/^https?:\/\/([\w\.]+)?\.facebook\.com\/?/;

var Auth=new(require("ObservableMixin"))();



























require("sdk.Runtime").subscribe("AccessToken.change",function Runtime_subscribe_$1(value){
if(!value&&require("sdk.Runtime").getLoginStatus()==="connected"){


Auth.getLoginStatus(null,true);
}
});

function setAuthResponse(
authResponse,
status,
fromCache)
{if(fromCache===void 0){fromCache=false;}
var currentUserID=require("sdk.Runtime").getUserID();
var currentStatus=require("sdk.Runtime").getLoginStatus();

var userID="";
if(authResponse!=null){
loadState="loaded";




if(authResponse.userID!=null&&authResponse.userID!==""){
userID=authResponse.userID;
}else if(
authResponse.signedRequest!=null&&
authResponse.signedRequest!=="")
{
var parsedSignedRequest=require("sdk.SignedRequest").parse(
authResponse.signedRequest);

if(
parsedSignedRequest!=null&&

parsedSignedRequest!==""&&
parsedSignedRequest.user_id!=null&&
parsedSignedRequest.user_id!=="")
{
userID=parsedSignedRequest.user_id;
}
}

if(require("sdk.Runtime").getUseCookie()){
var expirationTime=
authResponse.expiresIn===0?
0:
ES("Date","now",false)+authResponse.expiresIn*1000;
require("sdk.Cookie").setSignedRequestCookie(authResponse.signedRequest,expirationTime);
}
}else{
if(require("sdk.Runtime").getUseCookie()){
require("sdk.Cookie").clearSignedRequestCookie();
}
if(require("sdk.Runtime").getUseLocalStorage()){
removeLocalStorageToken();
}
}

var login=
currentStatus==="unknown"&&authResponse!=null||
require("sdk.Runtime").getUseCookie()&&require("sdk.Runtime").getCookieUserID()!==userID;
var logout=
currentUserID!=null&&currentUserID!==""&&authResponse==null;

var both=
authResponse!=null&&
currentUserID!=null&&
currentUserID!==""&&
currentUserID!=userID;

var authResponseChange=authResponse!=currentAuthResponse;
var statusChange=status!=currentStatus;



require("sdk.Runtime").setLoginStatus(status);
require("sdk.Runtime").setAccessToken(authResponse&&authResponse.accessToken||null);
require("sdk.Runtime").setUserID(userID);

currentAuthResponse=authResponse;

var response={
authResponse:authResponse,
status:status};


if(logout||both){
Auth.inform("logout",response);
}
if(login||both){
Auth.inform("login",response);
}
if(authResponseChange){
Auth.inform("authresponse.change",response);
}
if(statusChange){
Auth.inform("status.change",response);
}

if(
!fromCache&&
require("sdk.feature")("cache_auth_response",false)&&
require("sdk.Runtime").getUseLocalStorage())
{
var sessionStorage=require("sdk.WebStorage").getSessionStorage();
if(sessionStorage){
sessionStorage.setItem(
SESSION_STORAGE_LOGIN_STATUS_PREFIX+require("sdk.Runtime").getClientID(),ES("JSON","stringify",false,
{
authResponse:authResponse,
status:status,
expiresAt:
authResponse!=null&&
authResponse.expiresIn&&
authResponse.expiresIn!==0?
ES("Date","now",false)+
Math.min(
authResponse.expiresIn*0.75*1000,
CONNECTED_REVALIDATE_PERIOD):

ES("Date","now",false)+DEFAULT_REVALIDATE_PERIOD}));


}
}

return response;
}

function getAuthResponse(){
return currentAuthResponse;
}

function setBaseDomain(baseDomain){
if(require("sdk.Runtime").getUseCookie()){
if(require("sdk.Cookie").getDomain()==null){




require("sdk.Cookie").setDomain("."+baseDomain);
}
}
}

function setGraphDomain(graphDomain){


if(!!graphDomain){
require("sdk.Runtime").setGraphDomain(graphDomain);
}else{
require("sdk.Runtime").setGraphDomain("");
}
}

function logout(cb){
var currentAuthResponse=getAuthResponse();
setAuthResponse(null,"unknown");
setLogoutState();

if(currentAuthResponse!=null&&currentAuthResponse.accessToken!=null){
var url=new(require("sdk.URI"))(
require("UrlMap").resolve("www").replace("web.","www.")+"/x/oauth/logout").
addQueryData(
"access_token",
currentAuthResponse.accessToken);

var xhr=new XMLHttpRequest();
if(xhr){
xhr.open("GET",url.toString(),true);
xhr.withCredentials=true;
if(cb){
xhr.onreadystatechange=function(){


if(xhr.readyState>=2){
cb({
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()});

}
};
}
xhr.send();
}
}
require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:"PLATFORM_AUTH_LOGOUT",
extra:{args:{fblo:true}}});

}

function xdResponseWrapper(
cb,
authResponse,
_method,
requestParams)
{
return function(params){
var status;
if(params&&params.access_token){

var parsedSignedRequest=require("sdk.SignedRequest").parse(params.signed_request);
var user_id=
parsedSignedRequest!=null?
parsedSignedRequest.user_id!=null?
parsedSignedRequest.user_id:
null:
null;
authResponse={
accessToken:params.access_token,
userID:user_id,
expiresIn:Number(params.expires_in),
signedRequest:params.signed_request,
graphDomain:params.graph_domain};


if(params.asset_scopes){
authResponse=babelHelpers["extends"]({},
authResponse,{
asset_scopes:ES("JSON","parse",false,params.asset_scopes)});

}

authResponse=populateAuthResponse(authResponse,params);

removeLogoutState();
status="connected";
setAuthResponse(authResponse,status);
logSuccessfulAuth(requestParams);
}else if(params&&params.asset_scopes){

authResponse={
asset_scopes:ES("JSON","parse",false,params.asset_scopes)};


authResponse=populateAuthResponse(authResponse,params);

removeLogoutState();
status="connected";
setAuthResponse(authResponse,status);
logSuccessfulAuth(requestParams);
}else if(params&&params.error==="access_denied"){


setLogoutState();
status="unknown";
setAuthResponse(null,status);
}else if(params&&params.result){
removeLogoutState();
authResponse=params.result.authResponse;
}

if(cb){
var _response={
authResponse:authResponse,
status:require("sdk.Runtime").getLoginStatus()};

cb(_response);
}
return authResponse;
};
}

function logSuccessfulAuth(requestParams){
var loggerID=
requestParams&&requestParams.logger_id?requestParams.logger_id:null;
var cbt=requestParams&&requestParams.cbt?requestParams.cbt:0;
var payload={
action:"client_login_end",
logger_id:loggerID,
client_funnel_version:require("sdk.feature")("oauth_funnel_logger_version",1),
cbt_delta:ES("Date","now",false)-cbt};



if(requestParams&&requestParams.tp&&requestParams.tp!=="unspecified"){
return;
}

require("sdk.Impressions").log(PLATFORM_JSSDK_FUNNEL_LOG_ID,{
payload:payload});


window.setTimeout(function window_setTimeout_$0(){
var payload={
action:"client_login_complete_heartbeat",
logger_id:loggerID,
client_funnel_version:require("sdk.feature")("oauth_funnel_logger_version",1),
cbt_delta:ES("Date","now",false)-cbt};

require("sdk.Impressions").log(PLATFORM_JSSDK_FUNNEL_LOG_ID,{
payload:payload});

},LOGIN_COMPLETE_HEARTBEAT_TIMEOUT);
}

function populateAuthResponse(authResponse,params){
if(params.granted_scopes){
authResponse=babelHelpers["extends"]({},
authResponse,{
grantedScopes:params.granted_scopes});

}

if(params.data_access_expiration_time){
authResponse=babelHelpers["extends"]({},
authResponse,{
data_access_expiration_time:Number(params.data_access_expiration_time)});

}

if(params.base_domain!=null){
setBaseDomain(params.base_domain);
}

setGraphDomain(params.graph_domain);

if(params.enforce_https){
require("sdk.Runtime").setEnforceHttps(true);
}

if(params.referred){
authResponse=babelHelpers["extends"]({},
authResponse,{
referred:params.referred});

}

if(
require("sdk.Runtime").getUseLocalStorage()&&
location.protocol==="https:"&&
params.long_lived_token)
{
var localStorage=require("sdk.WebStorage").getLocalStorage();
if(localStorage){
localStorage.setItem(
LOCAL_STORAGE_TOKEN_PREFIX+require("sdk.Runtime").getClientID(),
params.long_lived_token);

}
}

return authResponse;
}

function removeLocalStorageToken(){
var localStorage=require("sdk.WebStorage").getLocalStorage();
if(localStorage){
localStorage.removeItem(LOCAL_STORAGE_TOKEN_PREFIX+require("sdk.Runtime").getClientID());
}
}

function removeLogoutState(){
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,"",0,false);
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,"",0,true);
}

function setLogoutState(){
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,"y",ES("Date","now",false)+YEAR_MS,false);
}

function unknownStatus(cb){
var unk_status="unknown";
setAuthResponse(null,unk_status);
var response={
authResponse:null,
status:unk_status};

if(cb){
cb(response);
}
}

function executeIABCallback(
cb,
iabResponseStr)
{
var iabResponse=ES("JSON","parse",false,iabResponseStr);
if(iabResponse["iab-s"]==null){
iabResponse["iab-s"]="unknown";
}
switch(iabResponse["iab-s"]){
case"connected":
setAuthResponse(
iabResponse["iab-ar"],
"connected");

break;
case"not_authorized":
case"unknown":
default:
setAuthResponse(null,iabResponse["iab-s"]);}


if(cb){
var _response2={
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()};

cb(_response2);
}
window.removeEventListener("fbNativeLoginResponse",function window_removeEventListener_$1(ev){return(
executeIABCallback(cb,ev.response));});

}

function fetchLoginStatus(fn){var _redirAccessToken;
if(timer){
window.clearTimeout(timer);
timer=null;
}

var fb_logged_out=require("sdk.Cookie").getRaw(LOGOUT_COOKIE_PREFIX)==="y";





var redirAccessToken=null;
var redirCancelled=false;
if(
require("sdk.Runtime").getLoginStatus()!=="connected"&&(
document.referrer===""||facebookRe.test(document.referrer)))
{

var fragment=location.hash.substr(1);
if(fragment!==""){
var fragmentParams=require("QueryString").decode(fragment,true);
redirAccessToken=fragmentParams.access_token;
var redirSignedRequest=fragmentParams.signed_request;
if(redirAccessToken!=null){
removeLogoutState();
}

if(window==top&&redirAccessToken!=null){
var ofn=fn;
fn=function fn(response){var _response$authRespons;
if(
response!=null&&
response.status==="connected"&&
((_response$authRespons=response.authResponse)==null?void 0:_response$authRespons.accessToken)===redirAccessToken)
{

delete fragmentParams.access_token;
delete fragmentParams.code;
delete fragmentParams.signed_request;
location.hash=require("QueryString").encode(fragmentParams);
if(redirSignedRequest!=null&&response.authResponse!=null){
response.authResponse.signedRequest=redirSignedRequest;
}
}
if(ofn!=null){
ofn(response);
}
};
}
}


var queryParams=require("QueryString").decode(location.search);
if(queryParams.error==="access_denied"){
redirCancelled=true;
}
}

if(fb_logged_out||redirCancelled){




unknownStatus(fn);
return;
}

var localStorageToken=null;
if(require("sdk.Runtime").getUseLocalStorage()){
var localStorage=require("sdk.WebStorage").getLocalStorageForRead();
if(localStorage){
localStorageToken=localStorage.getItem(
LOCAL_STORAGE_TOKEN_PREFIX+require("sdk.Runtime").getClientID());

}
}

var token=(_redirAccessToken=redirAccessToken)!=null?_redirAccessToken:localStorageToken;

if(window.location.protocol!=="https:"){

unknownStatus(fn);
}

if(
require("sdk.UA").isSupportedIABVersion(
parseFloat(require("sdk.feature")("iab_login_android_support_version","999.0")))&&

window.FBLogin&&
typeof window.FBLogin.showFBLoginBottomSheetInIAB==="function"&&
require("sdk.feature")("iab_login_status",false))
{
window.addEventListener("fbNativeLoginResponse",function window_addEventListener_$1(ev){return(
executeIABCallback(fn,ev.response));});

window.addEventListener("fbNativeLoginFallbackResponse",function window_addEventListener_$1(_ev){
Auth.getLoginStatusCORS(fn,token,currentAuthResponse);
});
var clientID=require("sdk.Runtime").getClientID();
window.FBLogin.showFBLoginBottomSheetInIAB(clientID);

}else{
Auth.getLoginStatusCORS(fn,token,currentAuthResponse);
}
}

function getCORSTarget(token){
var url=new(require("sdk.URI"))(
require("UrlMap").resolve("www").replace("web.","www.")+"/x/oauth/status").

addQueryData("client_id",require("sdk.Runtime").getClientID()).
addQueryData("input_token",token).
addQueryData(
"redirect_uri",
window.location.href).

addQueryData("origin",require("sdk.getContextType")()).
addQueryData("sdk","joey").
addQueryData(
"wants_cookie_data",
require("sdk.Runtime").getUseCookie());


if(!!window.location.ancestorOrigins){
var ancestorOrigins=window.location.ancestorOrigins;
if(ancestorOrigins.length>0){
var ancestorOriginString="";

for(var i=0;i<ancestorOrigins.length;i++){
ancestorOriginString+=ancestorOrigins[i];
ancestorOriginString+=",";
}

url.addQueryData(
"ancestor_origins",
ancestorOriginString.slice(0,-1));

}
}

return url;
}

function onCORSSuccess(
cb,
loginStatus,
authResponseHeader)
{
switch(loginStatus){
case"connected":
var xhrAuthResponse=ES("JSON","parse",false,authResponseHeader);

var authResponse={
accessToken:xhrAuthResponse.access_token,
userID:xhrAuthResponse.user_id,
expiresIn:Number(xhrAuthResponse.expires_in),
signedRequest:xhrAuthResponse.signed_request,
graphDomain:xhrAuthResponse.graph_domain};


if(xhrAuthResponse.enforce_https!=null){
require("sdk.Runtime").setEnforceHttps(true);
}


if(xhrAuthResponse.data_access_expiration_time!=null){
authResponse.data_access_expiration_time=Number(
xhrAuthResponse.data_access_expiration_time);

}


if(xhrAuthResponse.base_domain!=null){
setBaseDomain(xhrAuthResponse.base_domain);
}

setGraphDomain(xhrAuthResponse.graph_domain);


if(
require("sdk.Runtime").getUseLocalStorage()&&
location.protocol==="https:"&&
xhrAuthResponse.long_lived_token)
{
var localStorage=require("sdk.WebStorage").getLocalStorage();
if(localStorage){
localStorage.setItem(
LOCAL_STORAGE_TOKEN_PREFIX+require("sdk.Runtime").getClientID(),
xhrAuthResponse.long_lived_token);

}
}

removeLogoutState();
setAuthResponse(authResponse,loginStatus);
timer=window.setTimeout(function window_setTimeout_$0(){
fetchLoginStatus(function fetchLoginStatus_$0(){});
},CONNECTED_REVALIDATE_PERIOD);
break;
case"not_authorized":
case"unknown":
default:
setAuthResponse(null,loginStatus);}


if(cb){
var _response3={
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()};

cb(_response3);
}
}

function onCORSFailure(
cb,
httpStatus,
currentAuthResponse)
{
if(httpStatus===0){
if(require("sdk.feature")("cors_status_fetch_cancel_tracking",false)){
require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:"CORS_STATUS_FETCH_CANCELLED",
extra:{message:"Status 0 returned."}});

}
require("Log").error("Error retrieving login status, fetch cancelled.");
}else{

require("sdk.Scribe").log("jssdk_error",{
appId:require("sdk.Runtime").getClientID(),
error:"CORS_STATUS_FETCH",
extra:{message:"HTTP Status Code "+httpStatus}});

require("Log").error("Error retrieving login status, HTTP status code: "+httpStatus);
}
if(cb){
var _response4={
authResponse:currentAuthResponse,
status:require("sdk.Runtime").getLoginStatus()};

cb(_response4);
}
}

function getLoginStatusCORS(
cb,
token,
currentAuthResponse)
{
var fetchStart=ES("Date","now",false);
var url=getCORSTarget(token);

function corsFetchXHR(){
var xhr=new XMLHttpRequest();
if(xhr){
xhr.open("GET",url.toString(),true);
xhr.withCredentials=true;
xhr.onreadystatechange=function(){
if(xhr.readyState===4){
if(require("sdk.feature")("e2e_ping_tracking",true)){
var events={
init:fetchStart,
close:ES("Date","now",false),
method:"cors"};

require("Log").debug("e2e: %s",ES("JSON","stringify",false,events));
require("sdk.Impressions").log(PLATFORM_E2E_TRACKING_LOG_ID,{
payload:events});

}

if(xhr.status===200){var _xhr$getResponseHeade,_xhr$getResponseHeade2;
onCORSSuccess(
cb,(_xhr$getResponseHeade=
xhr.getResponseHeader("fb-s"))!=null?_xhr$getResponseHeade:
"unknown",(_xhr$getResponseHeade2=
xhr.getResponseHeader("fb-ar"))!=null?_xhr$getResponseHeade2:
"{}");

}else{
onCORSFailure(cb,xhr.status,currentAuthResponse);
}
}
};
xhr.send();
}
}

function corsFetch(){
window.
fetch(url.toString(),{
referrer:"/",
mode:"cors",
credentials:"include"}).

then(function then_$0(response){
if(response.status===200){var _response$headers$get,_response$headers$get2;
onCORSSuccess(
cb,(_response$headers$get=
response.headers.get("fb-s"))!=null?_response$headers$get:
"unknown",(_response$headers$get2=
response.headers.get("fb-ar"))!=null?_response$headers$get2:
"{}");

}else{
onCORSFailure(cb,response.status,currentAuthResponse);
}
})["catch"](
function $0(_e){return onCORSFailure(cb,0,currentAuthResponse);});
}

if(typeof window.fetch==="function"){
corsFetch();
}else{
corsFetchXHR();
}
}

var loadState;
function getLoginStatus(
cb,
force)
{if(force===void 0){force=false;}
var appID=require("sdk.Runtime").getClientID();
if(appID==null||appID===""){
require("Log").warn("FB.getLoginStatus() called before calling FB.init().");
unknownStatus(cb);
return;
}

if(
!(typeof appID==="number"||typeof appID==="string")||
appID===0||
typeof appID==="string"&&(appID==="0"||!/^\d+$/.test(appID)))
{
require("Log").warn(
"FB.getLoginStatus() not checked for an invalid client ID "+appID);

unknownStatus(cb);
return;
}





var skipCache=
require("sdk.Runtime").getLoginStatus()!=="connected"&&
facebookRe.test(document.referrer)&&
ES(location.hash,"indexOf",true,"cb=")>-1;

if(
!skipCache&&
!force&&
require("sdk.feature")("cache_auth_response",false)&&
require("sdk.Runtime").getUseLocalStorage()&&
location.protocol==="https:")
{
var sessionStorage=require("sdk.WebStorage").getSessionStorageForRead();
if(sessionStorage){
var rawCachedResponse=sessionStorage.getItem(
SESSION_STORAGE_LOGIN_STATUS_PREFIX+require("sdk.Runtime").getClientID());

if(rawCachedResponse!=null){
try{
var cachedResponse=ES("JSON","parse",false,
rawCachedResponse);

if(
cachedResponse!=null&&
cachedResponse.expiresAt!=null&&
cachedResponse.expiresAt>ES("Date","now",false))
{var _cachedResponse$statu;
loadState="loaded";
setAuthResponse(
cachedResponse.authResponse,(_cachedResponse$statu=
cachedResponse.status)!=null?_cachedResponse$statu:"unknown",
true);

timer=window.setTimeout(
function window_setTimeout_$0(){
fetchLoginStatus(function fetchLoginStatus_$0(){});
},
cachedResponse.status==="connected"?
CONNECTED_REVALIDATE_PERIOD:
DEFAULT_REVALIDATE_PERIOD);

}
}catch(_unused){

}
}
}
}


if(!force){
if(loadState==="loaded"){
if(cb){
var _response5={
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()};

cb(_response5);
}
return;
}else if(loadState==="loading"){
if(cb){
Auth.subscribe("FB.loginStatus",cb);
}
return;
}
}

if(cb){
Auth.subscribe("FB.loginStatus",cb);
}

loadState="loading";


var lsCb=function lsCb(response){

loadState="loaded";


Auth.inform("FB.loginStatus",response);
Auth.clearSubscribers("FB.loginStatus");
};

fetchLoginStatus(lsCb);
}

ES("Object","assign",false,Auth,{
removeLogoutState:removeLogoutState,
getLoginStatus:getLoginStatus,
getLoginStatusCORS:getLoginStatusCORS,
fetchLoginStatus:fetchLoginStatus,
logout:logout,
setAuthResponse:setAuthResponse,
getAuthResponse:getAuthResponse,
parseSignedRequest:require("sdk.SignedRequest").parse,
xdResponseWrapper:xdResponseWrapper});var _default=


Auth;module.exports=_default;},null);
                                                                                                 __d("sdk.Event",[],function $module_sdk_Event(global,require,requireDynamic,requireLazy,module,exports){

"use strict";exports.subscribers=subscribers;exports.subscribe=subscribe;exports.unsubscribe=unsubscribe;exports.monitor=monitor;exports.clear=clear;exports.fire=fire;

var SUBSCRIBE="event.subscribe";exports.SUBSCRIBE=SUBSCRIBE;

var UNSUBSCRIBE="event.unsubscribe";exports.UNSUBSCRIBE=UNSUBSCRIBE;







function subscribers(){






if(!this._subscribersMap){


this._subscribersMap={};
}


return this._subscribersMap;
}





































function subscribe(name,cb){


var subs=this.subscribers();

if(!subs[name]){
subs[name]=[cb];
}else{
if(ES(subs[name],"indexOf",true,cb)==-1){
subs[name].push(cb);
}
}


if(name!=this.SUBSCRIBE&&name!=this.UNSUBSCRIBE){


this.fire(this.SUBSCRIBE,name,subs[name]);
}
}




















function unsubscribe(name,cb){


var subs=this.subscribers()[name];
if(subs){
ES(subs,"forEach",true,function subs_forEach_$0(value,key){
if(value===cb){
subs.splice(key,1);
}
});
}


if(name!=this.SUBSCRIBE&&name!=this.UNSUBSCRIBE){


this.fire(this.UNSUBSCRIBE,name,subs);
}
}











function monitor(name,callback){
if(!callback()){


var ctx=this;
var fn=function fn(){
if(callback.apply(callback,arguments)){
ctx.unsubscribe(name,fn);
}
};



this.subscribe(name,fn);
}
}










function clear(name){


delete this.subscribers()[name];
}







function fire(name){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}


var subs=this.subscribers()[name];

if(subs){
ES(subs,"forEach",true,function subs_forEach_$0(sub){


if(sub){
sub.apply(this,args);
}
});
}
}},null);
                                                                                                                                                                                                                                                           __d("resolveURI",[],function $module_resolveURI(global,require,requireDynamic,requireLazy,module,exports){module.exports=resolveURI;

function resolveURI(
uri)
{
if(uri==null||uri===""){

return window.location.href;
}

var a=document.createElement("a");
a.href=uri;
return a.href;
}},null);
                                                                                         __d("dedupString",[],function $module_dedupString(global,require,requireDynamic,requireLazy,module,exports){

"use strict";module.exports=dedupString;









function dedupString(str){var _Object$keys;






return ES("Object","keys",false,(_Object$keys={},_Object$keys[str]=0,_Object$keys))[0];
}},null);
                                                                                                                                                       __d("emptyFunction",[],function $module_emptyFunction(global,require,requireDynamic,requireLazy,module,exports){





function makeEmptyFunction(arg){
return function(){
return arg;
};
}






var emptyFunction=function emptyFunction(){};

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;
};
emptyFunction.thatReturnsArgument=function(arg){
return arg;
};var _default=













emptyFunction;module.exports=_default;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("DOMEventListener",["invariant","dedupString","emptyFunction","wrapFunction"],function $module_DOMEventListener(global,require,requireDynamic,requireLazy,module,exports,invariant){









var supportsPassive=false;
try{
var opts=Object.defineProperty({},"passive",{
get:function get(){
supportsPassive=true;
}});

window.addEventListener("test",null,opts);
}catch(_unused){}






var _add,
_remove;














if(window.addEventListener){

_add=function add(
target,
name,
listener,
options)
{if(options===void 0){options=false;}



listener.wrapper=require("wrapFunction")(
listener,
"entry",
require("dedupString")("DOMEventListener.add "+name));

target.addEventListener(
name,
listener.wrapper,
supportsPassive?options:false);

};
_remove=function remove(
target,
name,
listener,
options)
{if(options===void 0){options=false;}
target.removeEventListener(
name,



listener.wrapper,
supportsPassive?options:false);

};
}else if(window.attachEvent){

_add=function add(
target,
name,
listener,
_options)
{if(_options===void 0){_options=false;}



listener.wrapper=require("wrapFunction")(
listener,
"entry",
"DOMEventListener.add "+name);

target.attachEvent||invariant(0,"`target` has no `attachEvent` method.");
target.attachEvent("on"+name,listener.wrapper);
};
_remove=function remove(
target,
name,
listener,
_options)
{if(_options===void 0){_options=false;}
target.detachEvent||invariant(0,"`target` has no `detachEvent` method.");



target.detachEvent("on"+name,listener.wrapper);
};
}else{
_remove=_add=require("emptyFunction");
}

var DOMEventListener={











add:function add(
target,
name,
listener,
options)
{if(options===void 0){options=false;}
_add(target,name,listener,options);
return{
remove:function remove(){
_remove(target,name,listener,options);
}};

},








remove:_remove};


module.exports=DOMEventListener;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             __d("JSONRPC",["Log"],function $module_JSONRPC(global,require,requireDynamic,requireLazy,module,exports){var



JSONRPC=function(){"use strict";
function JSONRPC(write){var _this=this;
this.$JSONRPC_counter=0;
this.$JSONRPC_callbacks={};

this.remote=function(context){
_this.$JSONRPC_context=context;
return _this.remote;
};

this.local={};

this.$JSONRPC_write=write;
}var _proto=JSONRPC.prototype;_proto.










stub=function stub(_stub){var _this2=this;
this.remote[_stub]=function(){
var message={
jsonrpc:"2.0",
method:_stub};for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}


if(typeof args[args.length-1]==="function"){
message.id=++_this2.$JSONRPC_counter;
_this2.$JSONRPC_callbacks[message.id]=args.pop();
}

message.params=args;

_this2.$JSONRPC_write(ES("JSON","stringify",false,message),_this2.$JSONRPC_context||{method:_stub});
};
};_proto.











read=function read(message,context){
var rpc=ES("JSON","parse",false,message),
id=rpc.id;

if(!rpc.method){

if(!this.$JSONRPC_callbacks[id]){
require("Log").warn("Could not find callback %s",id);
return;
}
var callback=this.$JSONRPC_callbacks[id];
delete this.$JSONRPC_callbacks[id];

delete rpc.id;
delete rpc.jsonrpc;

callback(rpc);
return;
}


var instance=this,
method=this.local[rpc.method],
send;
if(id){

send=function send(type,value){
var response={
jsonrpc:"2.0",
id:id};

response[type]=value;



window.setTimeout(function window_setTimeout_$0(){
instance.$JSONRPC_write(ES("JSON","stringify",false,response),context);
},0);
};
}else{

send=function send(){};
}

if(!method){
require("Log").error("Method \"%s\" has not been defined",rpc.method);

send("error",{
code:-32601,
message:"Method not found",
data:rpc.method});

return;
}


rpc.params.push(ES(send,"bind",true,null,"result"));
rpc.params.push(ES(send,"bind",true,null,"error"));


try{
var returnValue=method.apply(context||null,rpc.params);

if(typeof returnValue!=="undefined"){
send("result",returnValue);
}
}catch(rpcEx){
require("Log").error(
"Invokation of RPC method %s resulted in the error: %s",
rpc.method,
rpcEx.message);


send("error",{
code:-32603,
message:"Internal error",
data:rpcEx.message});

}
};return JSONRPC;}();


module.exports=JSONRPC;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("Queue",[],function $module_Queue(global,require,requireDynamic,requireLazy,module,exports){






var registry={};var








Queue=function(){











function Queue(opts){
this._timeout=null;


this._interval=(opts==null?void 0:opts.interval)||0;
this._pro