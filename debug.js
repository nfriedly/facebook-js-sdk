/*1566565165,,JIT Construction: v1001095719,en_US*/

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
try {(window.FB && !window.FB.__buffer) || (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 1;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __buffer = window.FB && window.FB.__buffer;    var __w, __t;    var undefined;    var __p;    with (this) {      /**
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
if(typeof type!=='undefined'){
meta.type=type;
}

if(typeof signature!=='undefined'){
meta.signature=signature;
}

return meta;
};

var getMeta=function getMeta(name,params){
return createMeta(
name&&/^[A-Z]/.test(name)?name:undefined,
params&&(params.params&&params.params.length||params.returns)?
'function('+(
params.params?params.params.map(function(param){
return /\?/.test(param)?
'?'+param.replace('?',''):
param;
}).join(','):'')+
')'+(
params.returns?':'+params.returns:''):
undefined);

};

var noopAnnotator=function noopAnnotator(fn,funcMeta,params){
return fn;
};

var genericAnnotator=function genericAnnotator(fn,funcMeta,params){
if('sourcemeta'in __transform_includes){
fn.__SMmeta=funcMeta;
}

if('typechecks'in __transform_includes){
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


funcMeta.callId=funcMeta.module+':'+(
funcMeta.line||0)+':'+(
funcMeta.column||0);
}
var key=funcMeta.callId;
funcCalls[key]=(funcCalls[key]||0)+1;
}
return fn.apply(scope,args);
};


if(typeof __transform_includes==='undefined'){
__annotator=noopAnnotator;
__bodyWrapper=noopBodyWrapper;
}else{
__annotator=genericAnnotator;

if('codeusage'in __transform_includes){
__annotator=noopAnnotator;
__bodyWrapper=codeUsageBodyWrapper;
__bodyWrapper.getCodeUsage=function(){return funcCalls;};
__bodyWrapper.clearCodeUsage=function(){funcCalls={};};
}else if('typechecks'in __transform_includes){
__bodyWrapper=typecheckBodyWrapper;
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
'global',
'require',
'requireDynamic',
'requireLazy',
'module',
'exports'];


require=function(id,soft){
if(Object.prototype.hasOwnProperty.call(resolved,id)){
return resolved[id];
}
if(!Object.prototype.hasOwnProperty.call(map,id)){
if(soft){
return null;
}
throw new Error('Module '+id+' has not been defined');
}
var module=map[id],
deps=module.deps,
length=module.factory.length,
dep,
args=[];

for(var i=0;i<length;i++){
switch(deps[i]){
case'module':
dep=module;
break;
case'exports':
dep=module.exports;
break;
case'global':
dep=global;
break;
case'require':
dep=require;
break;
case'requireDynamic':
dep=null;
break;
case'requireLazy':
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
if(typeof factory==='function'){
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
})(this);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5Array",[],(function $module_ES5Array(global,require,requireDynamic,requireLazy,module,exports){

var ES5Array={};

ES5Array.isArray=function(object){
return Object.prototype.toString.call(object)=='[object Array]';
};

module.exports=ES5Array;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5ArrayPrototype",[],(function $module_ES5ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){



var ES5ArrayPrototype={};




ES5ArrayPrototype.map=function(func,context){
if(typeof func!=='function'){
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
if(typeof func!=='function'){
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
if(typeof func!=='function'){
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
if(typeof func!=='function'){
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
if(typeof this!=='function'){
throw new TypeError('Bind must be called on a function');
}
var target=this;
var appliedArguments=Array.prototype.slice.call(arguments,1);
function bound(){
return target.apply(
context,
appliedArguments.concat(Array.prototype.slice.call(arguments)));

}
bound.displayName='bound:'+(target.displayName||target.name||'(?)');
bound.toString=function toString(){
return'bound: '+target;
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
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'prototypeIsEnumerable',
'constructor'];


var hasOwnProperty={}.hasOwnProperty;





var ie8DontEnum=function ie8DontEnum(){};

if({toString:true}.propertyIsEnumerable('toString')){
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



function F(){}






ES5Object.create=function(proto){
if(__DEV__){
if(arguments.length>1){
throw new Error(
'Object.create implementation supports only the first parameter');

}
}
var type=typeof proto;
if(type!='object'&&type!='function'){
throw new TypeError('Object prototype may only be a Object or null');
}

F.prototype=proto;
return new F();
};






ES5Object.keys=function(object){
var type=typeof object;
if(type!='object'&&type!='function'||object===null){
throw new TypeError('Object.keys called on non-object');
}

var keys=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
keys.push(key);
}
}


require("ie8DontEnum")(object,function(prop){return keys.push(prop);});

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

module.exports=ES5Object;}),null);
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */__d("ES5StringPrototype",[],(function $module_ES5StringPrototype(global,require,requireDynamic,requireLazy,module,exports){



var ES5StringPrototype={};






ES5StringPrototype.trim=function(){
if(this==null){
throw new TypeError('String.prototype.trim called on null or undefined');
}
return String.prototype.replace.call(this,/^\s+|\s+$/g,'');
};

ES5StringPrototype.startsWith=function(search){
var string=String(this);
if(this==null){
throw new TypeError(
'String.prototype.startsWith called on null or undefined');

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
'String.prototype.endsWith called on null or undefined');

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
'String.prototype.contains called on null or undefined');

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
throw new TypeError('String.prototype.repeat called on null or undefined');
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
return'';
}
var result='';
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

'use strict';

var ES6Array={
from:function from(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');
}


var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=
typeof Symbol==='function'?typeof Symbol==="function"?Symbol.iterator:"@@iterator":'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?new C():[];
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

ret=typeof C==='function'?new C(len):new Array(len);

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
throw new TypeError('Array.prototype.find called on null or undefined');
}
if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');
}

var index=ES6ArrayPrototype.findIndex.call(this,predicate,thisArg);
return index===-1?void 0:this[index];
},





findIndex:function findIndex(predicate,thisArg){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');

}
if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');
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
throw new TypeError('Array.prototype.fill called on null or undefined');
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
return(number<10?'0':'')+number;
}

var ES6DatePrototype={



toISOString:function toISOString(){
if(!isFinite(this)){
throw new Error('Invalid time value');
}
var year=this.getUTCFullYear();
year=
(year<0?'-':year>9999?'+':'')+
('00000'+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6);
return(
year+
'-'+
pad(this.getUTCMonth()+1)+
'-'+
pad(this.getUTCDate())+
'T'+
pad(this.getUTCHours())+
':'+
pad(this.getUTCMinutes())+
':'+
pad(this.getUTCSeconds())+
'.'+
(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+
'Z');

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
return typeof value==='number'&&isFinite(value);
}),

isNaN:function(_isNaN){function isNaN(_x2){return _isNaN.apply(this,arguments);}isNaN.toString=function(){return _isNaN.toString();};return isNaN;}(function(value){
return typeof value==='number'&&isNaN(value);
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
throw new TypeError('Object.assign target cannot be null or undefined');
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


require("ie8DontEnum")(source,function(prop){return target[prop]=source[prop];});
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
'use strict';


if(
needle!==undefined&&
isArray(this)&&
!(typeof needle==='number'&&isNaN(needle)))
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

var NaNLookup=isNaN(needle)&&typeof needle==='number';

while(i<len){
var value=o[i];
if(
value===needle||
typeof value==='number'&&NaNLookup&&isNaN(value))
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
throw new TypeError('Object.entries called on non-object');
}

var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);
}
}


require("ie8DontEnum")(object,function(prop){return entries.push([prop,object[prop]]);});

return entries;
};






ES7Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');
}

var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);
}
}


require("ie8DontEnum")(object,function(prop){return values.push(object[prop]);});

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
return this.replace(/^\s+/,'');
};

ES7StringPrototype.trimRight=function(){
return this.replace(/\s+$/,'');
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

/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
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
        // Internal: Calculates 