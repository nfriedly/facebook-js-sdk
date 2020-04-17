/*1587104961,,JIT Construction: v1002005402,en_US*/

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
params.params?params.params.map(function params_params_map_$0(param){
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



function F(){}_c=F;






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


require("ie8DontEnum")(object,function ie8DontEnum_$1(prop){return entries.push([prop,object[prop]]);});

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

var main = function () {
  if (!TROMPLE_HAS_RAN) {
    TROMPLE_HAS_RAN = true;
    TROMPLE_MAIN();
  }
  return module$1.exports;
};

var trompleEntryPoint = function (requirePath) {
  switch (requirePath) {
    case undefined: return main();
  }
};

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


'JSON.stringify':require("json3").stringify,
'JSON.parse':require("json3").parse};


var es5Polyfills={
'Array.prototype':require("ES5ArrayPrototype"),
'Function.prototype':require("ES5FunctionPrototype"),
'String.prototype':require("ES5StringPrototype"),
Object:require("ES5Object"),
Array:require("ES5Array"),
Date:require("ES5Date")};


var es6Polyfills={
Object:require("ES6Object"),
'Array.prototype':require("ES6ArrayPrototype"),
'Date.prototype':require("ES6DatePrototype"),
Number:require("ES6Number"),
Array:require("ES6Array")};


var es7Polyfills={
Object:require("ES7Object"),
'String.prototype':require("ES7StringPrototype"),
'Array.prototype':require("ES7ArrayPrototype")};


function setupMethodsCache(polyfills){


for(var pName in polyfills){
if(!Object.prototype.hasOwnProperty.call(polyfills,pName)){
continue;
}
var polyfillObject=polyfills[pName];


var accessor=pName.split('.');
if(accessor.length===2){var
obj=accessor[0],prop=accessor[1];
if(!obj||!prop||!window[obj]||!window[obj][prop]){
var windowObj=obj?window[obj]:'-';
var windowObjProp=
obj&&window[obj]&&prop?window[obj][prop]:'-';
throw new Error(
'Unexpected state (t11975770): '+(
obj+", "+prop+", "+windowObj+", "+windowObjProp+", "+pName));

}
}

var nativeObject=
accessor.length===2?window[accessor[0]][accessor[1]]:window[pName];


for(var _prop in polyfillObject){
if(!Object.prototype.hasOwnProperty.call(polyfillObject,_prop)){
continue;
}


if(typeof polyfillObject[_prop]!=='function'){
methodCache[pName+'.'+_prop]=polyfillObject[_prop];
continue;
}

var nativeFunction=nativeObject[_prop];


methodCache[pName+'.'+_prop]=
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

var type=proto?toString.call(lhs).slice(8,-1)+'.prototype':lhs;


var propValue=methodCache[type+'.'+rhs]||lhs[rhs];


if(typeof propValue==='function'){for(var _len=arguments.length,args=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}
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
var _cache=typeof Map==='function'?new Map():undefined;

babelHelpers.wrapNativeSuper=function(Class){
if(Class===null){
return null;
}
if(typeof Class!=='function'){
throw new TypeError('Super expression must either be null or a function');
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
var KIND_KEYS='keys';
var KIND_VALUES='values';
var KIND_ENTRIES='entries';




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

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];
}else{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
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
return typeof classObject.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==='function'&&
typeof classObject.prototype.values==='function'&&
typeof classObject.prototype.keys==='function'&&
typeof classObject.prototype.entries==='function';
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


if(typeof object==='string'){
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
})(typeof global==='undefined'?this:global);
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
return'f'+(Math.random()*(1<<30)).toString(16).replace('.','');
}

function isNode(object){
var doc=object?object.ownerDocument||object:document;
var defaultView=doc.defaultView||windowObj;
return!!(object&&(
typeof defaultView.Node==='function'?object instanceof defaultView.Node:
typeof object==='object'&&
typeof object.nodeType==='number'&&
typeof object.nodeName==='string'));

}





function shouldPolyfillES6Collection(collectionName){
var Collection=windowObj[collectionName];
if(Collection==null){
return true;
}





if(typeof windowObj.Symbol!=='function'){
return true;
}

var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||

typeof proto['for'+'Each']!=='function';
}

var enumerate=global.FB_enumerate;

var Map=function(){





if(!shouldPolyfillES6Collection('Map')){
return windowObj.Map;
}
























































var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VALUE='key+value';



var KEY_PREFIX='$map_';



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP='$size'+guid();
}


var OLD_IE_HASH_PREFIX='IE_HASH_';var

Map=function(){"use strict";









function Map(iterable){
if(!isObject(this)){
throw new TypeError('Wrong map object type.');
}

initMap(this);

if(iterable!=null){
var it=enumerate(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError('Expected iterable items to be pair objects.');
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
if(typeof callback!=='function'){
throw new TypeError('Callback must be callable.');
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
throw new TypeError('Object is not a map.');
}

if(ES([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE],"indexOf",true,kind)===-1){
throw new Error('Invalid iteration kind.');
}

this._map=map;
this._nextIndex=0;
this._kind=kind;
}var _proto2=MapIterator.prototype;_proto2.







next=function next(){
if(!this instanceof Map){
throw new TypeError('Expected to be called on a MapIterator.');
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
if(typeof key==='string'){
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
if(typeof key==='string'){
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

Object.defineProperty(map,'size',{
set:function set(v){
console.error(
'PLEASE FIX ME: You are changing the map size property which '+
'should not be writable and will break in production.');

throw new Error('The map size property is not writable.');
},
get:function get(){return map[SECRET_SIZE_PROP];}});

}


return;
}
}



map.size=0;
}







function isObject(o){
return o!=null&&(typeof o==='object'||typeof o==='function');
}








function createIterResultObject(value,done){
return{value:value,done:done};
}


Map.__isES5=function(){
try{
Object.defineProperty({},'__.$#x',{});
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
throw new Error('Unable to set a non-enumerable property on object.');
}
return hashCounter;
}else{
throw new Error('Non-extensible objects are not allowed as keys.');
}
};
}();




return __annotator(Map,{name:'Map'});
}();

var Set=function(){





if(!shouldPolyfillES6Collection('Set')){
return windowObj.Set;
}var










































Set=function(){"use strict";










function Set(iterable){
if(this==null||
typeof this!=='object'&&typeof this!=='function'){
throw new TypeError('Wrong set object type.');
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




return __annotator(Set,{name:'Set'});
}();

global.Map=Map;
global.Set=Set;
})(typeof global==='undefined'?this:global);      __d("cr:717822",[],function(g,r,rd,rl,m,e){m.exports=require("TimeSliceImpl");});__d("cr:806696",[],function(g,r,rd,rl,m,e){m.exports=require("clearTimeoutBlue");});__d("cr:986633",[],function(g,r,rd,rl,m,e){m.exports=require("setTimeoutAcrossTransitionsBlue");});__d("cr:807042",[],function(g,r,rd,rl,m,e){m.exports=require("setTimeoutBlue");});__d("cr:1003267",[],function(g,r,rd,rl,m,e){m.exports=require("clearIntervalBlue");});__d("cr:896462",[],function(g,r,rd,rl,m,e){m.exports=require("setIntervalAcrossTransitionsBlue");});__d("cr:696703",[],function(g,r,rd,rl,m,e){m.exports=null;});__d("cr:925100",[],function(g,r,rd,rl,m,e){m.exports=require("RunBlue");});__d("cr:692209",[],function(g,r,rd,rl,m,e){m.exports=require("cancelIdleCallbackBlue");});__d("cr:1268308",[],function(g,r,rd,rl,m,e){m.exports=require("BanzaiNew");});__d("CurrentEnvironment",[],{"facebookdotcom":true,"messengerdotcom":false,"workplacedotcom":false});__d("UriNeedRawQuerySVConfig",[],{"uris":["dms.netmng.com","doubleclick.net","r.msn.com","watchit.sky.com","graphite.instagram.com","www.kfc.co.th","learn.pantheon.io","www.landmarkshops.in","www.ncl.com","s0.wp.com","www.tatacliq.com","bs.serving-sys.com","kohls.com","lazada.co.th","xg4ken.com","technopark.ru","officedepot.com.mx","bestbuy.com.mx","booking.com"]});__d("CometAltpayJsSdkIframeAllowedDomains",[],{"allowed_domains":["https:\/\/live.adyen.com","https:\/\/integration-facebook.payu.in","https:\/\/facebook.payulatam.com","https:\/\/facebook.dlocal.com","https:\/\/altpay-pe-test.herokuapp.com"]});__d("KSConfig",[],{"killed":{"__set":["POCKET_MONSTERS_CREATE","POCKET_MONSTERS_DELETE","VIDEO_DIMENSIONS_FROM_PLAYER_IN_UPLOAD_DIALOG","STO_AD_DELIVERY_PAUSE","POCKET_MONSTERS_UPDATE_NAME","ADS_PLACEMENT_FIX_PUBLISHER_PLATFORMS_MUTATION","MOBILITY_KILL_OLD_VISIBILITY_POSITION_SETTING","WORKPLACE_DISPLAY_TEXT_EVIDENCE_REPORTING","DYNAMIC_ADS_SET_CATALOG_AND_PRODUCT_SET_TOGETHER","BUSINESS_GRAPH_SETTING_APP_ASSIGNED_USERS_NEW_API","BUSINESS_GRAPH_SETTING_WABA_ASSIGNED_USERS_NEW_API","BUSINESS_GRAPH_SETTING_ESG_ASSIGNED_USERS_NEW_API","BUSINESS_GRAPH_SETTING_PRODUCT_CATALOG_ASSIGNED_USERS_NEW_API","BUSINESS_MANAGER_SHOW_UI_HIDDEN_TASK_FOR_ASSET","BUSINESS_GRAPH_SETTING_BU_ASSIGNED_USERS_NEW_API","BUSINESS_GRAPH_SETTING_SESG_ASSIGNED_USERS_NEW_API","RECRUITING_REQUISITION_VALIDATE_COMPANY_GROUPING_ON_LINK","CALENDAR_WEEKVIEW_NEW_BADGE","POST_INSIGHTS_CAPITALIZE_BREAKDOWNS_FOR_ACTION_TYPE","WORKPLACE_PLATFORM_SECURE_APPS_MAILBOXES","BUY_AT_COVID_PUNCHOUT_CHECKOUT_MODAL","DISABLE_HEARTBEAT_POLLING","LAB_NET_NEW_UI_RELEASE","WIT_DEPRECATE_GITHUB","WIT_DEPRECATE_OLD_UX"]},"ko":{"__set":["acrJTh9WGdp","1oOE64fL4wO","2dhqRnqXGLQ","3GaiM9xYkM2","7r6mSP7ofr2","1ntjZ2zgf03","3oh5Mw86USj","8NAceEy9JZo","5mNEXob0nTj","4j36SVzvP3w","8PlKuowafe8","53gCxKq281G","3yzzwBY7Npj","4NbCsulUUI3","4NSq3ZC4ScE","1onzIv0jH6H","5LSlJUj3BnT","7EZACZMulOj","6ra3sC1PDFj","5XCz1h9Iaw3","7cwY7xv5s7H","1GgWO1oFyLN","DDZhogI19W","9k7Y5kmDD1A","4jkC8ia3PYA"]}});__d("CSSLoaderConfig",[],{"timeout":5000,"modulePrefix":"BLCSS:"});__d("ImmediateImplementationExperiments",[],{"prefer_message_channel":true});__d("PromiseUsePolyfillSetImmediateGK",[],{"www_always_use_polyfill_setimmediate":false});__d("TrustedTypesConfig",[],{"useTrustedTypes":false,"reportOnly":true});__d("BootloaderConfig",[],{"jsRetries":[200,500],"jsRetryAbortNum":2,"jsRetryAbortTime":5,"payloadEndpointURI":{"thing":"https:\/\/connect.facebook.net\/ajax\/bootloader-endpoint\/"},"preloadBE":{"thing":true},"shouldCoalesceModuleRequestsMadeInSameTick":{"thing":true},"retryQueuedBootloads":false,"silentDups":false});__d("BootloaderEndpointConfig",[],{"endpointURI":"https:\/\/connect.facebook.net\/ajax\/bootloader-endpoint\/","debugNoBatching":false});__d("CurrentCommunityInitialData",[],{});__d("CurrentUserInitialData",[],{"USER_ID":"0","ACCOUNT_ID":"0","NAME":"","SHORT_NAME":null,"IS_MESSENGER_ONLY_USER":false,"IS_DEACTIVATED_ALLOWED_ON_MESSENGER":false,"APP_ID":null});__d("DTSGInitialData",[],{});__d("SprinkleConfig",[],{"param_name":"jazoest","version":2,"should_randomize":false});__d("DTSGInitData",[],{"token":"","async_get_token":""});__d("ISB",[],{});__d("LSD",[],{});__d("SiteData",[],{"server_revision":1002005402,"client_revision":1002005402,"tier":"","push_phase":"C3","pkg_cohort":"PHASED:DEFAULT","pr":1,"haste_site":"www","be_one_ahead":false,"ir_on":true,"is_rtl":false,"is_comet":false,"hsi":"6816563903551195555-0","spin":0,"__spin_r":1002005402,"__spin_b":"trunk","__spin_t":1587104961,"vip":"31.13.65.7"});__d("ServerNonce",[],{"ServerNonce":"ncRXxXGxECBrIp_YruROeY"});__d("InitialCookieConsent",[],{"deferCookies":false,"noCookies":true,"shouldShowCookieBanner":false});__d("CookieCoreLoggingConfig",[],{"maximumIgnorableStallMs":16.67,"sampleRate":9.7e-5,"sampleRateClassic":1.0e-10,"sampleRateFastStale":1.0e-8});__d("CookieCoreConfig",[],{});__d("UserAgentData",[],{"browserArchitecture":"32","browserFullVersion":"7.47.0","browserMinorVersion":47,"browserName":"Curl","browserVersion":7,"deviceName":"Unknown","engineName":"Unknown","engineVersion":null,"platformArchitecture":"32","platformName":"Unknown","platformVersion":null,"platformFullVersion":null});__d("ZeroRewriteRules",[],{"rewrite_rules":{},"whitelist":{"\/hr\/r":1,"\/hr\/p":1,"\/zero\/unsupported_browser\/":1,"\/zero\/policy\/optin":1,"\/zero\/optin\/write\/":1,"\/zero\/optin\/legal\/":1,"\/zero\/optin\/free\/":1,"\/about\/privacy\/":1,"\/about\/privacy\/update\/":1,"\/about\/privacy\/update":1,"\/zero\/toggle\/welcome\/":1,"\/zero\/toggle\/nux\/":1,"\/fup\/interstitial\/":1,"\/work\/landing":1,"\/work\/login\/":1,"\/work\/email\/":1,"\/ai.php":1,"\/js_dialog_resources\/dialog_descriptions_android.json":0,"\/connect\/jsdialog\/MPlatformAppInvitesJSDialog\/":0,"\/connect\/jsdialog\/MPlatformOAuthShimJSDialog\/":0,"\/connect\/jsdialog\/MPlatformLikeJSDialog\/":0,"\/qp\/interstitial\/":1,"\/qp\/action\/redirect\/":1,"\/qp\/action\/close\/":1,"\/zero\/support\/ineligible\/":1,"\/zero_balance_redirect\/":1,"\/zero_balance_redirect":1,"\/zero_balance_redirect\/l\/":1,"\/l.php":1,"\/lsr.php":1,"\/ajax\/dtsg\/":1,"\/checkpoint\/block\/":1,"\/exitdsite":1,"\/zero\/balance\/pixel\/":1,"\/zero\/balance\/":1,"\/zero\/balance\/carrier_landing\/":1,"\/zero\/flex\/logging\/":1,"\/tr":1,"\/tr\/":1,"\/sem_campaigns\/sem_pixel_test\/":1,"\/bookmarks\/flyout\/body\/":1,"\/zero\/subno\/":1,"\/confirmemail.php":1,"\/policies\/":1,"\/mobile\/internetdotorg\/classifier\/":1,"\/zero\/dogfooding":1,"\/xti.php":1,"\/zero\/fblite\/config\/":1,"\/hr\/zsh\/wc\/":1,"\/ajax\/bootloader-endpoint\/":1,"\/4oh4.php":1,"\/autologin.php":1,"\/birthday_help.php":1,"\/checkpoint\/":1,"\/contact-importer\/":1,"\/cr.php":1,"\/legal\/terms\/":1,"\/login.php":1,"\/login\/":1,"\/mobile\/account\/":1,"\/n\/":1,"\/remote_test_device\/":1,"\/upsell\/buy\/":1,"\/upsell\/buyconfirm\/":1,"\/upsell\/buyresult\/":1,"\/upsell\/promos\/":1,"\/upsell\/continue\/":1,"\/upsell\/h\/promos\/":1,"\/upsell\/loan\/learnmore\/":1,"\/upsell\/purchase\/":1,"\/upsell\/promos\/upgrade\/":1,"\/upsell\/buy_redirect\/":1,"\/upsell\/loan\/buyconfirm\/":1,"\/upsell\/loan\/buy\/":1,"\/upsell\/sms\/":1,"\/wap\/a\/channel\/reconnect.php":1,"\/wap\/a\/nux\/wizard\/nav.php":1,"\/wap\/appreg.php":1,"\/wap\/birthday_help.php":1,"\/wap\/c.php":1,"\/wap\/confirmemail.php":1,"\/wap\/cr.php":1,"\/wap\/login.php":1,"\/wap\/r.php":1,"\/zero\/datapolicy":1,"\/a\/timezone.php":1,"\/a\/bz":1,"\/bz\/reliability":1,"\/r.php":1,"\/mr\/":1,"\/reg\/":1,"\/registration\/log\/":1,"\/terms\/":1,"\/f123\/":1,"\/expert\/":1,"\/experts\/":1,"\/terms\/index.php":1,"\/terms.php":1,"\/srr\/":1,"\/msite\/redirect\/":1,"\/fbs\/pixel\/":1,"\/contactpoint\/preconfirmation\/":1,"\/contactpoint\/cliff\/":1,"\/contactpoint\/confirm\/submit\/":1,"\/contactpoint\/confirmed\/":1,"\/contactpoint\/login\/":1,"\/preconfirmation\/contactpoint_change\/":1,"\/help\/contact\/":1,"\/survey\/":1,"\/upsell\/loyaltytopup\/accept\/":1,"\/settings\/":1,"\/lite\/":1,"\/zero_status_update\/":1}});__d("BanzaiConfig",[],{"EXPIRY":86400000,"MAX_SIZE":10000,"MAX_WAIT":150000,"RESTORE_WAIT":150000,"blacklist":["time_spent"],"gks":{"boosted_component":true,"boosted_pagelikes":true,"jslogger":true,"mercury_send_error_logging":true,"platform_oauth_client_events":true,"xtrackable_clientview_batch":true,"visibility_tracking":true,"graphexplorer":true,"gqls_web_logging":true,"sticker_search_ranking":true}});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","revision":"1002005402","rtl":false,"sdkab":null,"sdkns":"FB","sdkurl":"https:\/\/connect.facebook.net\/en_US\/all\/debug.js"});__d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","business":"business.facebook.com","api":"api.facebook.com","api_read":"api-read.facebook.com","graph":"graph.facebook.com","an":"an.facebook.com","fbcdn":"static.xx.fbcdn.net","cdn":"staticxx.facebook.com","graph_facebook":"graph.facebook.com","graph_gaming":"graph.fb.gg"});__d("JSSDKConfig",[],{"features":{"allow_non_canvas_app_events":false,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":0.1},"xd_timeout":{"rate":1,"value":60000},"use_bundle":false,"should_log_response_error":true,"popup_blocker_scribe_logging":{"rate":100},"https_only_enforce_starting":2538809200000,"https_only_learn_more":"https:\/\/developers.facebook.com\/blog\/post\/2018\/06\/08\/enforce-https-facebook-login\/","https_only_scribe_logging":{"rate":1},"log_perf":{"rate":0.001},"use_cors_oauth_status":{"rate":100},"xd_arbiter_register_new":{"rate":100},"xd_arbiter_handle_message_new":{"rate":100},"legacy_xd_init":{"rate":0}}});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100\u0025;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100\u0025;position:absolute;right:0;top:0;width:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-position:50\u0025 50\u0025;background-repeat:no-repeat;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=46","XdBundleUrl":"\/connect\/xd_arbiter\/r\/Kg0I7Y9jrLp.js?version=46","useCdn":true});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});                                                                                                     __d("ExecutionContextObservers",[],(function $module_ExecutionContextObservers(global,require,requireDynamic,requireLazy,module,exports){



var beforeIDs={


MUTATION_COUNTING:0,
PROFILING_COUNTERS:1,
REFERENCE_COUNTING:2,
HEARTBEAT:3,
CALL_STACK:4,
TIMESLICE_EXECUTION_LOGGER:5,
FLUX_PERF_TOOL:6};


var afterIDs={


MUTATION_COUNTING:0,
REFERENCE_COUNTING:1,
PROFILING_COUNTERS:2,
HEARTBEAT:3,
CALL_STACK:4,
TIMESLICE_EXECUTION_LOGGER:5,
FLUX_PERF_TOOL:6};


var ExecutionContextObservers={
beforeIDs:beforeIDs,
afterIDs:afterIDs};













































module.exports=ExecutionContextObservers;}),null);
                                                                                         __d("ifRequired",[],(function $module_ifRequired(global,require,requireDynamic,requireLazy,module,exports){

































function ifRequired(id,cbYes,cbNo){
var requiredModule;
requireLazy&&

requireLazy.call(null,[id],function requireLazy_call_$2(x){
requiredModule=x;
});
if(requiredModule&&cbYes){
return cbYes(requiredModule);
}else if(!requiredModule&&cbNo){
return cbNo();
}
}

module.exports=ifRequired;}),null);
                                                                                                        __d("uniqueID",[],(function $module_uniqueID(global,require,requireDynamic,requireLazy,module,exports){

var ID_PREFIX='js_';
var RADIX=36;
var nextID=0;



function uniqueID(){
return ID_PREFIX+(nextID++).toString(RADIX);
}

module.exports=uniqueID;}),null);
                                                                                  __d("CallStackExecutionObserver",["ExecutionContextObservers","ifRequired","uniqueID"],(function $module_CallStackExecutionObserver(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_ExecutionContextObservers;
























var activeContinuationID=null;

function informExecutionContextEventOnAllInteractions(
event,
creationData)
{
if(creationData){var
id=creationData.id,name=creationData.name,interactions=creationData.interactions;
var beforeLimit=Error.stackTraceLimit;
Error.stackTraceLimit=1000;
var executionStack=new Error().stack;
Error.stackTraceLimit=beforeLimit;

interactions.forEach(function interactions_forEach_$0(interaction){
interaction.
inform(event+':'+name,{
rawStackTrace:executionStack}).

addStringAnnotation('id',id);
});
}
}

var CallStackExecutionObserver=


{
onNewContextCreated:function onNewContextCreated(
_parentFrame,
_newContextName,
_meta)
{
var TimeSliceAutoclosedInteraction=require("ifRequired")("TimeSliceAutoclosedInteraction",
function ifRequired_$1(tsi){return tsi;});

var allInteractions=TimeSliceAutoclosedInteraction?
TimeSliceAutoclosedInteraction.getInteractionsActiveRightNow():
[];
var fullProfiledInteractions=allInteractions.filter(function allInteractions_filter_$0(interaction){return(
interaction.isEnabledForMode('full'));});

if(_meta&&_meta.isContinuation&&fullProfiledInteractions.length){
var id=require("uniqueID")();

var beforeLimit=Error.stackTraceLimit;
Error.stackTraceLimit=1000;
var creationStack=new Error().stack;
Error.stackTraceLimit=beforeLimit;

fullProfiledInteractions.forEach(function fullProfiledInteractions_forEach_$0(interaction){
var point=interaction.
inform('created_continuation:'+_newContextName,{
rawStackTrace:creationStack}).

addStringAnnotation('id',id);
if(activeContinuationID){
point.addStringAnnotation('parentID',activeContinuationID);
}
interaction.trace().addStringAnnotation('has_stack_trace','1');
});
return{
id:id,
parentID:activeContinuationID,
name:_newContextName,
interactions:fullProfiledInteractions};

}
return null;
},

onContextCanceled:function onContextCanceled(_name,creationData){
informExecutionContextEventOnAllInteractions(
'cancelling_continuation',
creationData);

},

onBeforeContextStarted:function onBeforeContextStarted(
newFrame,
creationData,
metaInfo)
{
var executionParentID=activeContinuationID;
if(creationData&&creationData.id){
activeContinuationID=creationData.id;
}
return{executionParentID:executionParentID};
},

onAfterContextStarted:function onAfterContextStarted(
newFrame,
creationData,
executionData,
metaInfo)
{
informExecutionContextEventOnAllInteractions(
'executing_continuation',
creationData);

return executionData;
},

onAfterContextEnded:function onAfterContextEnded(
_lastFrame,
_creationData,
executionData,
_metaInfo)
{
if(executionData){
activeContinuationID=executionData.executionParentID;
}
informExecutionContextEventOnAllInteractions(
'executing_continuation_end',
_creationData);

},

getBeforeID:function getBeforeID(){
return(c_ExecutionContextObservers||(c_ExecutionContextObservers=require("ExecutionContextObservers"))).beforeIDs.CALL_STACK;
},

getAfterID:function getAfterID(){
return(c_ExecutionContextObservers||(c_ExecutionContextObservers=require("ExecutionContextObservers"))).afterIDs.CALL_STACK;
}};


module.exports=CallStackExecutionObserver;}),null);
                                                                                                                                                                                                                  __d("ErrorSerializer",[],function $module_ErrorSerializer(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






























var LEVEL_PRI={
debug:1,
info:2,
warn:3,
error:4,
fatal:5};







function _parse(s){
try{


var matches=_safeMatches(
s,
/^([\s\S]*)<\!\[EX\[(\[.*\])\]\]>([\s\S]*)$/);

if(!matches){

return _parseMessageWithTAAL(s);
}var


left=matches[0],serialized=matches[1],right=matches[2];var _JSON$parse=ES("JSON","parse",false,
serialized),messageWithTAAL=_JSON$parse[0],params=_JSON$parse.slice(1);

var serializableError=_parseMessageWithTAAL(messageWithTAAL);

serializableError.message=left+serializableError.message+right;
if(params&&params.length>0){
serializableError.params=ES(params,"map",true,function params_map_$0(param){return String(param);});
}
return serializableError;
}catch(e){
return{
message:'Unable to parse error message %s because %s',
params:[s,e.message]};

}
}





function stringify(serializableError){
return"<![EX["+ES("JSON","stringify",false,toMessageWithParams(serializableError))+"]]>";
}

function parseFromError(error){
if(error.messageFormat==null){

return _parse(error.message);
}


var serializable={
message:error.messageFormat};

if(error.messageParams){
serializable.params=[].concat(error.messageParams);
}
serializable.forcedKey=error.forcedKey;
if(error.taalOpcodes){
serializable.taalOpcodes=error.taalOpcodes;
}
return serializable;
}





function aggregateError(error,context){var _firstKey;
var caughtError=parseFromError(error);
if(ES("Object","isFrozen",false,error)){

return;
}



if(context.type){
if(!error.type||LEVEL_PRI[error.type]>LEVEL_PRI[context.type]){
error.type=context.type;
}
}

if(context.fbloggerMetadata!=null){
var fbloggerMetadata=error.fbloggerMetadata||[];
fbloggerMetadata.push.apply(fbloggerMetadata,context.fbloggerMetadata);
error.fbloggerMetadata=fbloggerMetadata;
}

if(context.project!=null){
error.project=context.project;
}

if(context.errorName!=null){
error.errorName=context.errorName;
}

if(context.componentStack!=null){
error.componentStack=context.componentStack;
}

var messageFormat=caughtError.message;
var messageParams=toStringParams(caughtError.params);
if(context.messageFormat!=null){var _context$messageParam;
messageFormat+=" [Caught in: "+context.messageFormat+"]";
messageParams.push.apply(messageParams,(_context$messageParam=context.messageParams)!=null?_context$messageParam:[]);
}
error.messageFormat=messageFormat;
error.messageParams=messageParams;

var firstKey=context.forcedKey;
var secondKey=caughtError.forcedKey;
var forcedKey=
firstKey!=null&&secondKey!=null?
firstKey+"_"+secondKey:(_firstKey=
firstKey)!=null?_firstKey:secondKey;
error.forcedKey=forcedKey;

if(caughtError.taalOpcodes!=null){
error.taalOpcodes=caughtError.taalOpcodes;
}
}




function _toFormattedMessageNoTAAL(
serializableError)
{
var message=serializableError.message||'';
var params=toStringParams(serializableError.params);
return toReadableMessage(message,params);
}

function toReadableMessage(format,params){
var index=0;


var formattedMessage=format.replace(/%s/g,function format_replace_$1(){return(
index<params.length?params[index++]:'NOPARAM');});

if(index<params.length){

formattedMessage+=" PARAMS"+ES("JSON","stringify",false,params.slice(index));
}
return formattedMessage;
}




function toFormattedMessage(serializableError){
var message=serializableError.message||'';
var params=toStringParams(serializableError.params);
return toReadableMessage(message,params)+toTAALSuffix(serializableError);
}




function toMessageWithParams(
serializableError)
{
return[
serializableError.message+toTAALSuffix(serializableError)].concat(
toStringParams(serializableError.params));

}

function toTAALSuffix(serializableError){var
taalOpcodes=serializableError.taalOpcodes,forcedKey=serializableError.forcedKey;
var allOpcodes=[];
if(taalOpcodes){
allOpcodes.push.apply(allOpcodes,taalOpcodes);
}

if(forcedKey){


allOpcodes.push('4'+forcedKey.replace(/[^\d\w]/g,'_'));
}
return allOpcodes.length>0?" TAAL["+allOpcodes.join(';')+"]":'';
}

function toStringParams(params){var _params;
return ES((_params=params)!=null?_params:[],"map",true,function map_$0(param){return String(param);});
}

function _parseMessageWithTAAL(messageWithTAAL){var _matches;


var matches=_safeMatches(messageWithTAAL,/^([\s\S]*) TAAL\[(.*)\]$/);var _ref=(_matches=
matches)!=null?_matches:[messageWithTAAL,null],message=_ref[0],taalOpcodesString=_ref[1];
var serializableError={message:message};

if(taalOpcodesString){
var taalOpcodes=[];


for(var _iterator=taalOpcodesString.split(';'),_isArray=ES("Array","isArray",false,_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray){if(_i>=_iterator.length)break;_ref2=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref2=_i.value;}var opcode=_ref2;
if(opcode==='1'||opcode==='2'||opcode==='3'){

taalOpcodes.push(parseInt(opcode,10));
}else if(opcode[0]==='4'&&opcode.length>1){
serializableError.forcedKey=opcode.substring(1);
}else{

return{message:messageWithTAAL};
}
}
if(taalOpcodes.length>0){
serializableError.taalOpcodes=taalOpcodes;
}
}
return serializableError;
}

function _safeMatches(s,re){
if(typeof s==='string'){
var matches=s.match(re);
if(matches&&matches.length>0){
return matches.slice(1);
}
}
}

module.exports=global.ErrorSerializer={
aggregateError:aggregateError,
parseFromError:parseFromError,
stringify:stringify,
toFormattedMessage:toFormattedMessage,
toReadableMessage:toReadableMessage,
toMessageWithParams:toMessageWithParams,
toStringParams:toStringParams};},3);
                                                                                                                                                                                                     __d("FBLoggerMetadata",[],function $module_FBLoggerMetadata(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



























































































var globalMetadata=[];var

FBLoggerMetadata=function(){


function FBLoggerMetadata(){
this.metadata=[].concat(globalMetadata);
}var _proto=FBLoggerMetadata.prototype;_proto.








addMetadata=function addMetadata(product,name,value){
this.metadata.push([product,name,value]);
return this;
};_proto.

isEmpty=function isEmpty(){
return this.metadata.length===0;
};_proto.

formatMetadata=function formatMetadata(){




var formattedMetadata=[];
ES(this.metadata,"forEach",true,function metadata_forEach_$0(entry){
if(entry&&entry.length){
var formattedEntry=ES(entry,"map",true,
function entry_map_$0(s){return s!=null?String(s).replace(/:/g,'_'):'';}).
join(':');
formattedMetadata.push(formattedEntry);
}
});
return formattedMetadata;
};FBLoggerMetadata.

addGlobalMetadata=function addGlobalMetadata(product,name,value){
globalMetadata.push([product,name,value]);
};FBLoggerMetadata.

getGlobalMetadata=function getGlobalMetadata(){
return globalMetadata;
};FBLoggerMetadata.

unsetGlobalMetadata=function unsetGlobalMetadata(product,name){
globalMetadata=ES(globalMetadata,"filter",true,function globalMetadata_filter_$0(entry){
return!(
ES("Array","isArray",false,entry)&&
entry[0]===product&&
entry[1]===name);

});
};return FBLoggerMetadata;}();


module.exports=FBLoggerMetadata;},null);
                                                                                                                                                               __d("getSimpleHash",[],(function $module_getSimpleHash(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

function getSimpleHash(toBeHashed){
var hash=0;
for(var i=0;i<toBeHashed.length;i++){
var char=toBeHashed.charCodeAt(i);

hash=(hash<<5)-hash+char;
hash|=0;

}
return String(hash);
}

module.exports=getSimpleHash;}),null);
                                                                                                        __d("performance",[],(function $module_performance(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

























var performance=
global.performance||global.msPerformance||global.webkitPerformance||{};

module.exports=performance;}),null);
                                                                                                        __d("performanceNow",["performance"],function $module_performanceNow(global,require,requireDynamic,requireLazy,module,exports){var c_performance;



var performanceNow;






if((c_performance||(c_performance=require("performance"))).now){
performanceNow=function performanceNow(){return(c_performance||(c_performance=require("performance"))).now();};
}else{


var cstart=global._cstart;
var initialDate=ES("Date","now",false);
var epoch=
typeof cstart==='number'&&cstart<initialDate?cstart:initialDate;
var last=0;
performanceNow=function performanceNow(){
var dateNow=ES("Date","now",false);
var now=dateNow-epoch;
if(now<last){













epoch-=last-now;
now=dateNow-epoch;
}
last=now;
return now;
};
}

module.exports=performanceNow;},null);
                                                                                                                     __d("ErrorNormalizeUtils",["ErrorSerializer","FBLoggerMetadata","getSimpleHash","performanceNow"],function $module_ErrorNormalizeUtils(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceNow;









var HTTP_OR_HTTPS_URI_PATTERN=/^https?:\/\//i;
var TYPECHECKER_ERROR_PATTERN=/^Type Mismatch for/;

var EVAL_FRAME_PATTERN_CHROME=/^at .*eval eval (at .*\:\d+\:\d+), .*$/;
var IE_AND_OTHER_FRAME_PATTERN=/(.*)[@\s][^\s]+$/;




var IE_STACK_TRACE_REFERENCES=[
'Unknown script code',
'Function code',
'eval code'];



if(Error.stackTraceLimit!=null&&Error.stackTraceLimit<40){
Error.stackTraceLimit=40;
}

function getColumn(err){

var column=err.columnNumber||err.column;
return column!=null?String(column):'';
}

function getColumnFromStackData(stackData){
return stackData[0]&&stackData[0].column||'';
}

function getLine(err){

var line=err.lineNumber||err.line;
return line!=null?String(line):'';
}

function getLineFromStackData(stackData){
return stackData[0]&&stackData[0].line||'';
}

function getScript(err){

var script=err.fileName||err.sourceURL;
return script!=null?String(script):'';
}

function getScriptFromStackData(stackData){
return stackData[0]&&stackData[0].script||'';
}

function getIEFrame(frame){
for(var i=0;i<IE_STACK_TRACE_REFERENCES.length;i++){
var ref=' '+IE_STACK_TRACE_REFERENCES[i];
if(ES(frame,"endsWith",true,ref)){
return[frame,frame.substring(0,frame.length-ref.length)];
}
}
return null;
}

function getStackWithoutMessage(error){var
name=error.name,message=error.message,stack=error.stack;
if(stack==null){
return null;
}
if(name!=null&&message!=null&&message!==''){

var prefix=name+": "+message+"\n";
if(ES(stack,"startsWith",true,prefix)){
return stack.substr(prefix.length);
}
}
if(name!=null){

var _prefix=name+"\n";
if(ES(stack,"startsWith",true,_prefix)){
return stack.substr(_prefix.length);
}
}
if(message!=null&&message!==''){


var _prefix2=": "+message+"\n";
var index=ES(stack,"indexOf",true,_prefix2);
var maybeName=stack.substring(0,index);
if(/^\w+$/.test(maybeName)){
return stack.substring(index+_prefix2.length);
}
}
return stack;
}

function normalizeStackFrame(frameRaw){
var frame=ES(frameRaw,"trim",true);


var evalMatch=frame.match(EVAL_FRAME_PATTERN_CHROME);
if(evalMatch){
frame=evalMatch[1];
}


var line;
var column;
var locationMatch=frame.match(/:(\d+)(?::(\d+))?$/);
if(locationMatch){
line=locationMatch[1];
column=locationMatch[2];
frame=frame.slice(0,-locationMatch[0].length);
}



var identifier;
var stackMatch=
getIEFrame(frame)||frame.match(IE_AND_OTHER_FRAME_PATTERN);
if(stackMatch){
frame=frame.substring(stackMatch[1].length+1);
var identifierMatch=stackMatch[1].match(/(?:at)?\s*(.*)(?:[^\s]+|$)/);
identifier=identifierMatch?identifierMatch[1]:'';
}


if(ES(frame,"includes",true,'charset=utf-8;base64,')){
frame='<inlined-file>';
}

var stackFrame={
column:column,
identifier:identifier,
line:line,
script:frame};


var sfIdentifier=
identifier!=null&&identifier!==''?' '+identifier+' (':' ';
var sfIdentifier1=sfIdentifier.length>1?')':'';
var sfLine=line!=null&&line!==''?':'+line:'';
var sfColumn=column!=null&&column!==''?':'+column:'';


var text="    at"+sfIdentifier+frame+sfLine+sfColumn+sfIdentifier1;

return babelHelpers["extends"]({},
stackFrame,{
text:text});

}





function normalizeErrorStack(error){
var stackWithoutMessage=getStackWithoutMessage(error);
if(stackWithoutMessage==null){
return[];
}
return ES(stackWithoutMessage.
split(/\n\n/)[0].
replace(/[\(\)]|\[.*?\]/g,'').
split('\n'),"map",true,
normalizeStackFrame);
}

function normalizeReactComponentStack(componentStack){
if(componentStack==null||componentStack===''){
return null;
}
var stack=componentStack.split('\n');
stack.splice(0,1);
return ES(stack,"map",true,function stack_map_$0(line){return ES(line,"trim",true);});
}









function normalizeError(err){var _err$errorName,_err$extra,_err$guard,_err$guardList,_serializable$params;
var stackData=normalizeErrorStack(err);
var stackPopped=false;

var serializable=require("ErrorSerializer").parseFromError(err);
if(err.framesToPop!=null){

var framesToPop=err.framesToPop;
var lastPoppedFrame;
while(framesToPop>0&&stackData.length>0){
lastPoppedFrame=stackData.shift();
framesToPop--;
stackPopped=true;
}

if(
TYPECHECKER_ERROR_PATTERN.test(serializable.message)&&
err.framesToPop===2&&
lastPoppedFrame!=null)
{





if(HTTP_OR_HTTPS_URI_PATTERN.test(lastPoppedFrame.script)){
serializable.message+=
' at '+
lastPoppedFrame.script+(

lastPoppedFrame.line?':'+lastPoppedFrame.line:'')+(

lastPoppedFrame.column?':'+lastPoppedFrame.column:'');
}
}
}

var reactComponentStack=normalizeReactComponentStack(err.componentStack);

var fbloggerMetadata=err.fbloggerMetadata?err.fbloggerMetadata:[];
var globalMetadata=ES(require("FBLoggerMetadata").getGlobalMetadata(),"map",true,function map_$0(d){return(
d.join(':'));});

var mergedMetadata=[].concat(fbloggerMetadata,globalMetadata);
if(mergedMetadata.length===0){

mergedMetadata=undefined;
}

var stack=ES(stackData,"map",true,function stackData_map_$0(frame){return frame.text;}).join('\n');
var name=(_err$errorName=err.errorName)!=null?_err$errorName:err.name;




var info={
column:stackPopped?
getColumnFromStackData(stackData):
getColumn(err)||getColumnFromStackData(stackData),
clientTime:Math.floor(ES("Date","now",false)/1000),
deferredSource:
err.deferredSource!=null?normalizeError(err.deferredSource):null,
extra:(_err$extra=err.extra)!=null?_err$extra:{},
fbloggerMetadata:mergedMetadata,
fbtrace_id:err.fbtrace_id,
guard:(_err$guard=err.guard)!=null?_err$guard:'',
guardList:(_err$guardList=err.guardList)!=null?_err$guardList:[],
hash:require("getSimpleHash")(name+stack),
isNormalizedError:true,
line:stackPopped?
getLineFromStackData(stackData):
getLine(err)||getLineFromStackData(stackData),
loggingSource:err.loggingSource,
message:require("ErrorSerializer").toFormattedMessage(serializable),
messageFormat:serializable.message,
messageParams:ES((_serializable$params=serializable.params)!=null?_serializable$params:[],"map",true,function map_$0(param){return String(param);}),
name:name,
page_time:Math.floor((c_performanceNow||(c_performanceNow=require("performanceNow")))()),
project:err.project,
reactComponentStack:reactComponentStack,
script:stackPopped?
getScriptFromStackData(stackData):
getScript(err)||getScriptFromStackData(stackData),
serverHash:err.serverHash,
stack:stack,
stackFrames:stackData,
type:err.type||'error'};

if(serializable.forcedKey!=null){
info.forcedKey=serializable.forcedKey;
}
if(serializable.taalOpcodes){
info.taalOpcodes=serializable.taalOpcodes;
}

var location=global.location;
if(location){
info.windowLocationURL=location.href;
}


for(var k in info){
if(info[k]==null){
delete info[k];
}
}
return info;
}

module.exports={
normalizeError:normalizeError,
normalizeReactComponentStack:normalizeReactComponentStack};},null);
                                                                                                                                                                      __d("ErrorBrowserConsole",[],function $module_ErrorBrowserConsole(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var hasLoggedAnyProductionError=false;




var cons=global.console;

function errorListener(error){
var method=cons[error.type]?error.type:'error';
if(__DEV__){
var message;
if(ES("Array","isArray",false,error.reactComponentStack)){
var reactStack=ES(error.reactComponentStack,"map",true,
function error_reactComponentStack_map_$0(frame){return'    '+frame;}).
join('\n');
message=error.message+"\n"+reactStack+"\n";
}else{
message=error.message+"\n";
}
var isTestEnv=typeof expect!=='undefined';
if(isTestEnv){

cons[method](message+error.stack);
}else{
cons[method](message,error);
}
}else{







if(method==='error'&&!hasLoggedAnyProductionError){
var _message=error.message;
cons.error(
'ErrorUtils caught an error:\n\n'+
_message+
"\n\nSubsequent errors won't be logged; see "+
'https://fburl.com/debugjs.');

hasLoggedAnyProductionError=true;
}
}
}

module.exports={errorListener:errorListener};},null);
                                                                                                                                                                __d("ErrorGuardState",[],function $module_ErrorGuardState(global,require,requireDynamic,requireLazy,module,exports){

'use strict';








var guardList=[];

var ErrorGuardState={
pushGuard:function pushGuard(entry){
guardList.unshift(entry);
},

popGuard:function popGuard(){
guardList.shift();
},

inGuard:function inGuard(){
return guardList.length!==0;
},

cloneGuardList:function cloneGuardList(){
return ES(guardList,"map",true,function guardList_map_$0(e){return e.name;});
},

findDeferredSource:function findDeferredSource(){
for(var _i=0;_i<guardList.length;_i++){var e=guardList[_i];
if(e.deferredSource!=null){
return e.deferredSource;
}
}
}};


module.exports=ErrorGuardState;},null);
                                                                                                        __d("removeFromArray",[],function $module_removeFromArray(global,require,requireDynamic,requireLazy,module,exports){




function removeFromArray(array,element){
var index=ES(array,"indexOf",true,element);
if(index!==-1){
array.splice(index,1);
}
}

module.exports=removeFromArray;},null);
                                                                                                                                                                                                                                  __d("ErrorPubSub",["ErrorBrowserConsole","ErrorGuardState","ErrorNormalizeUtils","removeFromArray"],function $module_ErrorPubSub(global,require,requireDynamic,requireLazy,module,exports){

'use strict';













var GLOBAL_ERROR_HANDLER_TAG=
typeof window==='undefined'?
'<self.onerror>':
'<window.onerror>';
var GLOBAL_REACT_ERROR_HANDLER_TAG='<global.react>';


var listeners=[];


var history=[];
var MAX_HISTORY=50;



var isReporting=false;

var ErrorPubSub={
history:history,









addListener:function addListener(listener,noPlayback){if(noPlayback===void 0){noPlayback=false;}
listeners.push(listener);
if(!noPlayback){
ES(history,"forEach",true,function history_forEach_$0(error){var _error$loggingSource;return(
listener(error,(_error$loggingSource=error.loggingSource)!=null?_error$loggingSource:'DEPRECATED'));});

}
},






unshiftListener:function unshiftListener(listener){
listeners.unshift(listener);
},






removeListener:function removeListener(listener){
require("removeFromArray")(listeners,listener);
},











onerror:function onerror(
message,
script,
line,
column,
rawError)
{var _rawError;
var error=(_rawError=rawError)!=null?_rawError:new Error(message||'');
if(error.fileName==null&&script!=null){
error.fileName=script;
}

if(error.line==null&&line!=null){
error.line=line;
}

if(error.column==null&&column!=null){
error.column=column;
}

error.guard=GLOBAL_ERROR_HANDLER_TAG;
error.guardList=[GLOBAL_ERROR_HANDLER_TAG];
error.loggingSource='ONERROR';
ErrorPubSub.reportError(error);
},

reportError:function reportError(error){
var normalizedError=require("ErrorNormalizeUtils").normalizeError(error);
ErrorPubSub.reportNormalizedError(normalizedError);
},

reportNormalizedError:function reportNormalizedError(normalizedError){
if(isReporting){

if(__DEV__){

var isTestEnv=typeof expect!=='undefined';
if(isTestEnv){


console.error(normalizedError.message+'\n'+normalizedError.stack);
}else{

console.error(
'Error reported during error processing',
normalizedError);

}
}
return false;
}

var guardList=require("ErrorGuardState").cloneGuardList();
if(normalizedError.reactComponentStack){
guardList.unshift(GLOBAL_REACT_ERROR_HANDLER_TAG);
}


if(guardList.length>0){
normalizedError.guard=normalizedError.guard||guardList[0];
normalizedError.guardList=guardList;
}

if(normalizedError.deferredSource==null){

var deferredSource=require("ErrorGuardState").findDeferredSource();
if(deferredSource!=null){
normalizedError.deferredSource=require("ErrorNormalizeUtils").normalizeError(
deferredSource);

}
}


if(history.length>MAX_HISTORY){
history.splice(MAX_HISTORY/2,1);
}

history.push(normalizedError);

isReporting=true;
for(var i=0;i<listeners.length;i++){
try{var _normalizedError$logg;
listeners[i](
normalizedError,(_normalizedError$logg=
normalizedError.loggingSource)!=null?_normalizedError$logg:'DEPRECATED');

}catch(e){
if(__DEV__){

console.error(
'Error thrown from listener during error processing',
e);

}
}
}
isReporting=false;
return true;
}};


ErrorPubSub.addListener(require("ErrorBrowserConsole").errorListener);

global.onerror=ErrorPubSub.onerror;

module.exports=ErrorPubSub;},3);
                                                                                         __d("TAALOpcodes",[],(function $module_TAALOpcodes(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






var TAALOpcodes={
PREVIOUS_FILE:1,
PREVIOUS_FRAME:2,
PREVIOUS_DIR:3,
FORCED_KEY:4};


module.exports=TAALOpcodes;}),null);
                                                                                                                                                                      __d("FBLogMessage",["ErrorNormalizeUtils","ErrorPubSub","ErrorSerializer","FBLoggerMetadata","TAALOpcodes"],function $module_FBLogMessage(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_ErrorPubSub;var












FBLogMessage=function(){








function FBLogMessage(project){
this.project=project;
this.events=[];
this.metadata=new(require("FBLoggerMetadata"))();
this.taalOpcodes=[];
}var _proto=FBLogMessage.prototype;_proto.

$FBLogMessage_log=function $FBLogMessage_log(type,format){var
error=this.error,events=this.events,project=this.project,metadata=this.metadata,forcedKey=this.forcedKey;
var normalizedError;for(var _len=arguments.length,params=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
if(this.normalizedError){



var errorMessage={
message:this.normalizedError.messageFormat+" [Caught in: "+format+"]",
params:[].concat(this.normalizedError.messageParams,params),
forcedKey:forcedKey};

normalizedError=ES("Object","assign",false,{},this.normalizedError,{
message:require("ErrorSerializer").toFormattedMessage(errorMessage),
messageFormat:errorMessage.message,
messageParams:require("ErrorSerializer").toStringParams(errorMessage.params),
project:project,
type:type});

}else if(error){

if(this.taalOpcodes.length>0){


new FBLogMessage('fblogger').
blameToPreviousFrame().
blameToPreviousFrame().
warn('Blame helpers do not work with catching');
}

require("ErrorSerializer").aggregateError(error,{
messageFormat:format,
messageParams:require("ErrorSerializer").toStringParams(params),
errorName:error.name,
forcedKey:forcedKey,
project:project,
type:type});

normalizedError=require("ErrorNormalizeUtils").normalizeError(error);
}else{

var _error=new Error(String(format));
if(_error.stack===undefined){

try{
throw _error;

}catch(_){}
}
_error.messageFormat=format;
_error.messageParams=require("ErrorSerializer").toStringParams(params);
_error.forcedKey=forcedKey;
_error.project=project;
_error.name='FBLogger';
_error.type=type;


_error.taalOpcodes=[
require("TAALOpcodes").PREVIOUS_FRAME,
require("TAALOpcodes").PREVIOUS_FRAME].concat(
this.taalOpcodes);


normalizedError=require("ErrorNormalizeUtils").normalizeError(_error);
}

normalizedError.loggingSource='FBLOGGER';
if(!metadata.isEmpty()){
normalizedError.fbloggerMetadata=metadata.formatMetadata();
}
if(events.length>0){
if(normalizedError.events!=null){var _normalizedError$even;
(_normalizedError$even=normalizedError.events).push.apply(_normalizedError$even,events);
}else{
normalizedError.events=events;
}
}

(c_ErrorPubSub||(c_ErrorPubSub=require("ErrorPubSub"))).reportNormalizedError(normalizedError);
};_proto.





fatal=function fatal(format){for(var _len2=arguments.length,params=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){params[_key2-1]=arguments[_key2];}
this.$FBLogMessage_log.apply(this,['fatal',format].concat(params));
};_proto.

mustfix=function mustfix(format){for(var _len3=arguments.length,params=new Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){params[_key3-1]=arguments[_key3];}
this.$FBLogMessage_log.apply(this,['error',format].concat(params));
};_proto.

warn=function warn(format){for(var _len4=arguments.length,params=new Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){params[_key4-1]=arguments[_key4];}
this.$FBLogMessage_log.apply(this,['warn',format].concat(params));
};_proto.

info=function info(format){for(var _len5=arguments.length,params=new Array(_len5>1?_len5-1:0),_key5=1;_key5<_len5;_key5++){params[_key5-1]=arguments[_key5];}
this.$FBLogMessage_log.apply(this,['info',format].concat(params));
};_proto.

debug=function debug(format){
if(__DEV__){for(var _len6=arguments.length,params=new Array(_len6>1?_len6-1:0),_key6=1;_key6<_len6;_key6++){params[_key6-1]=arguments[_key6];}
this.$FBLogMessage_log.apply(this,['debug',format].concat(params));
}
};_proto.

catching=function catching(error){
if(!(error instanceof Error)){
new FBLogMessage('fblogger').
blameToPreviousFrame().
warn('Catching non-Error object is not supported');
}else{
this.error=error;
}
return this;
};_proto.

catchingNormalizedError=function catchingNormalizedError(normalizedError){
this.normalizedError=normalizedError;
return this;
};_proto.






event=function event(_event){
this.events.push(_event);
return this;
};_proto.





blameToPreviousFile=function blameToPreviousFile(){
this.taalOpcodes.push(require("TAALOpcodes").PREVIOUS_FILE);
return this;
};_proto.

blameToPreviousFrame=function blameToPreviousFrame(){
this.taalOpcodes.push(require("TAALOpcodes").PREVIOUS_FRAME);
return this;
};_proto.

blameToPreviousDirectory=function blameToPreviousDirectory(){
this.taalOpcodes.push(require("TAALOpcodes").PREVIOUS_DIR);
return this;
};_proto.







addToCategoryKey=function addToCategoryKey(addedKey){
this.forcedKey=addedKey;
return this;
};_proto.

addMetadata=function addMetadata(product,name,value){
this.metadata.addMetadata(product,name,value);
return this;
};return FBLogMessage;}();


module.exports=FBLogMessage;},null);
                                                                                                                          __d("FBLogger",["FBLoggerMetadata","FBLogMessage"],(function $module_FBLogger(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







var FBLogger=function FBLogger(project,event){
var logger=new(require("FBLogMessage"))(project);
if(event!=null){
return logger.event(project+"."+event);
}
return logger;
};

FBLogger.addGlobalMetadata=function(
product,
name,
value)
{
require("FBLoggerMetadata").addGlobalMetadata(product,name,value);
};

module.exports=FBLogger;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("unrecoverableViolation",["ErrorSerializer","FBLogger","TAALOpcodes"],function $module_unrecoverableViolation(global,require,requireDynamic,requireLazy,module,exports){

'use strict';








function unrecoverableViolation(
errorMessage,
projectName,_temp)

{var _ref=_temp===void 0?{}:_temp,error=_ref.error;
var logger=require("FBLogger")(projectName);
var errorToThrow;
if(error){
errorToThrow=error;
logger=logger.catching(error);
require("ErrorSerializer").aggregateError(error,{messageFormat:errorMessage});
}else{
errorToThrow=new Error(errorMessage);
errorToThrow.taalOpcodes=[require("TAALOpcodes").PREVIOUS_FRAME];
}


logger.blameToPreviousFrame().mustfix(errorMessage);


throw errorToThrow;




}

module.exports=unrecoverableViolation;},null);
                                                                                         __d("CircularBuffer",["unrecoverableViolation"],(function $module_CircularBuffer(global,require,requireDynamic,requireLazy,module,exports){var



CircularBuffer=function(){"use strict";





function CircularBuffer(size){
if(size<=0){
throw require("unrecoverableViolation")(
'Buffer size should be a positive integer',
'comet_infra');

}
this.$CircularBuffer_size=size;
this.$CircularBuffer_head=0;
this.$CircularBuffer_buffer=[];
this.$CircularBuffer_onEvict=[];
}var _proto=CircularBuffer.prototype;_proto.

write=function write(entry){var _this=this;
if(this.$CircularBuffer_buffer.length<this.$CircularBuffer_size){
this.$CircularBuffer_buffer.push(entry);
}else{
this.$CircularBuffer_onEvict.forEach(function $CircularBuffer_onEvict_forEach_$0(cb){return cb(_this.$CircularBuffer_buffer[_this.$CircularBuffer_head]);});
this.$CircularBuffer_buffer[this.$CircularBuffer_head]=entry;
this.$CircularBuffer_head++;
this.$CircularBuffer_head%=this.$CircularBuffer_size;
}
return this;
};_proto.





onEvict=function onEvict(cb){
this.$CircularBuffer_onEvict.push(cb);
return this;
};_proto.

read=function read(){
return this.$CircularBuffer_buffer.
slice(this.$CircularBuffer_head).
concat(this.$CircularBuffer_buffer.slice(0,this.$CircularBuffer_head));
};_proto.

expand=function expand(size){
if(size>this.$CircularBuffer_size){
var all=this.read();
this.$CircularBuffer_head=0;
this.$CircularBuffer_buffer=all;
this.$CircularBuffer_size=size;
}
return this;
};_proto.

dropFirst=function dropFirst(num){
if(num<=this.$CircularBuffer_size){
var all=this.read();
this.$CircularBuffer_head=0;
all.splice(0,num);
this.$CircularBuffer_buffer=all;
}
return this;
};_proto.

clear=function clear(){
this.$CircularBuffer_head=0;
this.$CircularBuffer_buffer=[];
return this;
};_proto.

currentSize=function currentSize(){
return this.$CircularBuffer_buffer.length;
};return CircularBuffer;}();


module.exports=CircularBuffer;}),null);
                                                                                         __d("Env",[],function $module_Env(global,require,requireDynamic,requireLazy,module,exports){

var Env=



































{
ajaxpipe_token:null,
compat_iframe_token:null,
iframeKey:'',
iframeTarget:'',
iframeToken:'',
isCQuick:false,
start:ES("Date","now",false),
nocatch:false};




if(global.Env){
ES("Object","assign",false,Env,global.Env);
}

global.Env=Env;

module.exports=Env;},null);
                                                                                                                                                      __d("ErrorGuard",["Env","ErrorGuardState","ErrorNormalizeUtils","ErrorPubSub","ErrorSerializer"],(function $module_ErrorGuard(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_ErrorPubSub;var c_Env;

















var ANONYMOUS_GUARD_TAG='<anonymous guard>';




require("ErrorGuardState");
require("ErrorNormalizeUtils");
c_ErrorPubSub||(c_ErrorPubSub=require("ErrorPubSub"));

var ErrorGuard={







applyWithGuard:function applyWithGuard(
func,
context,
args,
metaArgs)
{
require("ErrorGuardState").pushGuard({
name:
(metaArgs==null?void 0:metaArgs.name)||(
func.name?"func_name:"+func.name:null)||
ANONYMOUS_GUARD_TAG,
deferredSource:metaArgs==null?void 0:metaArgs.deferredSource});


if((c_Env||(c_Env=require("Env"))).nocatch){



try{
return func.apply(context,args);
}finally{
require("ErrorGuardState").popGuard();
}
}

try{
return Function.prototype.apply.call(func,context,args);
}catch(ex){var _metaArgs,_ref2;var _ref=(_metaArgs=
metaArgs)!=null?_metaArgs:{},deferredSource=_ref.deferredSource,onError=_ref.onError,onNormalizedError=_ref.onNormalizedError;

var error=
ex!=null&&typeof ex==='object'?
ex:
new Error('applyWithGuard caught non-object');

if(deferredSource){
error.deferredSource=deferredSource;
}
require("ErrorSerializer").aggregateError(error,{
project:'ErrorGuard',
type:(_ref2=metaArgs==null?void 0:metaArgs.errorType)!=null?_ref2:'fatal'});

var normalizedError=require("ErrorNormalizeUtils").normalizeError(error);
normalizedError.loggingSource='GUARDED';

if(error==null&&func){

try{
normalizedError.extra[func.toString().substring(0,100)]='function';



if(args!=null&&args.length){
normalizedError.extra[
Array.from(args).
toString().
substring(0,100)]=
'args';
}
}catch(e){

}

}

var guardList=require("ErrorGuardState").cloneGuardList();
normalizedError.guard=guardList[0];
normalizedError.guardList=guardList;

if(onError){
onError(error);
}

if(onNormalizedError){
onNormalizedError(normalizedError);
}

(c_ErrorPubSub||(c_ErrorPubSub=require("ErrorPubSub"))).reportNormalizedError(normalizedError);
}finally{
require("ErrorGuardState").popGuard();
}
},




guard:function guard(
func,
metaArgs)
{
function guarded(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return ErrorGuard.applyWithGuard(func,this,args,metaArgs);
}

if(func.__SMmeta){
guarded.__SMmeta=func.__SMmeta;
}

if(__DEV__){
guarded.toString=func.toString.bind(func);
}

return guarded;
},


inGuard:function inGuard(){
return require("ErrorGuardState").inGuard();
}};


module.exports=global.ErrorGuard=ErrorGuard;}),3);
                                                                                  __d("IntervalTrackingBoundedBuffer",["CircularBuffer","ErrorPubSub"],(function $module_IntervalTrackingBoundedBuffer(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_ErrorPubSub;



var DEFAULT_BUFFER_SIZE=5000;var























IntervalTrackingBoundedBuffer=function(){

















function IntervalTrackingBoundedBuffer(size){var _this=this;
this.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex=0;
if(size!=null){
if(size<=0){
throw new Error('Size for a buffer must be greater than zero.');
}
}else{
size=DEFAULT_BUFFER_SIZE;
}
this.$IntervalTrackingBoundedBuffer_size=size;
this.$IntervalTrackingBoundedBuffer_buffer=new(require("CircularBuffer"))(size);
this.$IntervalTrackingBoundedBuffer_buffer.onEvict(function $IntervalTrackingBoundedBuffer_buffer_onEvict_$0(){
_this.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex++;
});
this.$IntervalTrackingBoundedBuffer_openIntervals=[];
this.$IntervalTrackingBoundedBuffer_idCounter=1;
this.$IntervalTrackingBoundedBuffer_itemIndex=0;
}var _proto=IntervalTrackingBoundedBuffer.prototype;_proto.

open=function open(){var _this2=this;
var id=this.$IntervalTrackingBoundedBuffer_idCounter++;
var closed=false;
var missedEntriesAtTheTimeOfClose;
var startIndex=this.$IntervalTrackingBoundedBuffer_itemIndex;
var interval={
id:id,
startIdx:startIndex,
hasOverflown:function hasOverflown(){return interval.getOverflowSize()>0;},
getOverflowSize:function getOverflowSize(){return(
missedEntriesAtTheTimeOfClose!=null?
missedEntriesAtTheTimeOfClose:
Math.max(_this2.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex-startIndex,0));},
close:function close(){
if(closed){
return[];
}else{
closed=true;
missedEntriesAtTheTimeOfClose=
_this2.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex-startIndex;
return _this2.$IntervalTrackingBoundedBuffer_close(id);
}
}};

this.$IntervalTrackingBoundedBuffer_openIntervals.push(interval);
return interval;
};_proto.

pushElement=function pushElement(data){
if(this.$IntervalTrackingBoundedBuffer_openIntervals.length>0){
this.$IntervalTrackingBoundedBuffer_buffer.write(data);
this.$IntervalTrackingBoundedBuffer_itemIndex++;
}
return this;
};_proto.

isActive=function isActive(){
return this.$IntervalTrackingBoundedBuffer_openIntervals.length>0;
};_proto.





$IntervalTrackingBoundedBuffer_toRealIndex=function $IntervalTrackingBoundedBuffer_toRealIndex(absoluteIndex){
return Math.max(absoluteIndex-this.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex,0);
};_proto.

$IntervalTrackingBoundedBuffer_close=function $IntervalTrackingBoundedBuffer_close(intervalId){
var minStartingIndex,minStartingIndexWithoutThis,thisIdx,thisStartIdx;
for(var ii=0;ii<this.$IntervalTrackingBoundedBuffer_openIntervals.length;ii++){var _this$$IntervalTracki=
this.$IntervalTrackingBoundedBuffer_openIntervals[ii],startIdx=_this$$IntervalTracki.startIdx,id=_this$$IntervalTracki.id;
if(id===intervalId){
thisIdx=ii;
thisStartIdx=startIdx;
}else if(
minStartingIndexWithoutThis==null||
startIdx<minStartingIndexWithoutThis)
{
minStartingIndexWithoutThis=startIdx;
}
if(minStartingIndex==null||startIdx<minStartingIndex){
minStartingIndex=startIdx;
}
}
if(thisIdx==null||minStartingIndex==null||thisStartIdx==null){



(c_ErrorPubSub||(c_ErrorPubSub=require("ErrorPubSub"))).reportError(
new Error('messed up state inside IntervalTrackingBoundedBuffer'));

return[];
}
this.$IntervalTrackingBoundedBuffer_openIntervals.splice(thisIdx,1);
var realIntervalStartIndex=this.$IntervalTrackingBoundedBuffer_toRealIndex(thisStartIdx);
var items=this.$IntervalTrackingBoundedBuffer_buffer.read().slice(realIntervalStartIndex);
var dropCount=
this.$IntervalTrackingBoundedBuffer_toRealIndex(
minStartingIndexWithoutThis==null?
this.$IntervalTrackingBoundedBuffer_itemIndex:
minStartingIndexWithoutThis)-
this.$IntervalTrackingBoundedBuffer_toRealIndex(minStartingIndex);
if(dropCount>0){
this.$IntervalTrackingBoundedBuffer_buffer.dropFirst(dropCount);
this.$IntervalTrackingBoundedBuffer_startOfBufferItemIndex+=dropCount;
}
return items;
};return IntervalTrackingBoundedBuffer;}();

module.exports=IntervalTrackingBoundedBuffer;}),null);
                                                                                         __d("WorkerUtils",[],(function $module_WorkerUtils(global,require,requireDynamic,requireLazy,module,exports){
'use strict';





function isWorkerContext(){
try{
return(
'WorkerGlobalScope'in global&&
global instanceof global.WorkerGlobalScope);

}catch(_unused){
return false;
}
}

module.exports={isWorkerContext:isWorkerContext};}),null);
                                                                                  __d("getReusableTimeSliceContinuation",[],(function $module_getReusableTimeSliceContinuation(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







function getReusableTimeSliceContinuation(
timeSlice,
SECRET_GUARD_KEY,
name)
{
var finished=false;
var currentContinuation=timeSlice.getGuardedContinuation(name);
var guard=function guard(fn){
currentContinuation(function currentContinuation_$0(){
if(!finished){
currentContinuation=timeSlice.getGuardedContinuation(name);
}
fn();
});
};
guard.last=function(fn){
var realCurrent=currentContinuation;
finish();
realCurrent(fn);
};
guard[SECRET_GUARD_KEY]={
cancel:function cancel(){
if(!finished){
timeSlice.cancel(currentContinuation);
finish();
guard=null;
finished=true;
}
},
tokens:[],
invoked:false};

function finish(){
finished=true;
currentContinuation=function currentContinuation(fn){
fn();
};
}
return guard;
}

module.exports=getReusableTimeSliceContinuation;}),null);
                                                                                         __d("TAAL",["TAALOpcodes"],function $module_TAAL(global,require,requireDynamic,requireLazy,module,exports){

'use strict';


















var TAAL={
blameToPreviousFile:function blameToPreviousFile(message){
return this.applyOpcodes(message,[require("TAALOpcodes").PREVIOUS_FILE]);
},
blameToPreviousFrame:function blameToPreviousFrame(message){
return this.applyOpcodes(message,[require("TAALOpcodes").PREVIOUS_FRAME]);
},
blameToPreviousDirectory:function blameToPreviousDirectory(message){
return this.applyOpcodes(message,[require("TAALOpcodes").PREVIOUS_DIR]);
},
applyOpcodes:function applyOpcodes(message,opcodes){
if(opcodes&&opcodes.length){
return message+" TAAL["+opcodes.join(';')+"]";
}
return message;
}};


module.exports=TAAL;},null);
                                                                                                          __d("ex",["ErrorSerializer"],function $module_ex(global,require,requireDynamic,requireLazy,module,exports){









function ex(message){for(var _len=arguments.length,rawArgs=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){rawArgs[_key-1]=arguments[_key];}
var params=ES(rawArgs,"map",true,function rawArgs_map_$0(p){return String(p);});
return require("ErrorSerializer").stringify({message:message,params:params});
}

module.exports=ex;},null);
                                                                                         __d("sprintf",[],(function $module_sprintf(global,require,requireDynamic,requireLazy,module,exports){










function sprintf(format){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var index=0;
return format.replace(/%s/g,function format_replace_$1(){return String(args[index++]);});
}

module.exports=sprintf;}),null);
                                                                                         __d("invariant",["Env","TAAL","ex","sprintf"],function $module_invariant(global,require,requireDynamic,requireLazy,module,exports){



'use strict';var c_Env;







var printingFunction=require("ex");
if(__DEV__){
printingFunction=require("sprintf");
}











function invariant(
condition,
format)

{
if(!condition){
var formatString=format;for(var _len=arguments.length,params=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){params[_key-2]=arguments[_key];}
if(typeof formatString==='number'){var _buildProdMessage=


buildProdMessage(formatString,params),message=_buildProdMessage.message,decoderLink=_buildProdMessage.decoderLink;
formatString=message;
params.unshift(decoderLink);
}else if(formatString===undefined){

formatString='Invariant: ';
for(var i=0;i<params.length;i++){
formatString+='%s,';
}
}
formatString=require("TAAL").blameToPreviousFrame(formatString);
var error=new Error(printingFunction.apply(undefined,[formatString].concat(params)));
error.name='Invariant Violation';

error.messageWithParams=[formatString].concat(params);
throw error;
}
}

function buildProdMessage(
number,
params)




{
var message="Minified invariant #"+number+"; %s";
if(params.length>0){
message+=' Params: '+ES(params,"map",true,function params_map_$0(_){return'%s';}).join(', ');
}

var decoderLink=
(c_Env||(c_Env=require("Env"))).show_invariant_decoder===true?"visit "+
buildDecoderLink(number,params)+" to see the full message.":
'';

return{message:message,decoderLink:decoderLink};
}

function buildDecoderLink(number,params){


var decodeURI="https://our.intern.facebook.com/intern/invariant/"+number+"/";
if(params.length>0){
decodeURI+=
'?'+
ES(params,"map",true,

function params_map_$0(param,index){return"args["+
index+"]="+encodeURIComponent(String(param));}).

join('&');
}
return decodeURI;
}

module.exports=invariant;},null);
                                                                                                                  __d("nullthrows",[],(function $module_nullthrows(global,require,requireDynamic,requireLazy,module,exports){

var nullthrows=function nullthrows(
x,
message)
{if(message===void 0){message='Got unexpected null or undefined';}
if(x!=null){
return x;
}
var error=new Error(message);
error.framesToPop=1;
throw error;
};

module.exports=nullthrows;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               __d("performanceAbsoluteNow",["performance"],(function $module_performanceAbsoluteNow(global,require,requireDynamic,requireLazy,module,exports){var c_performance;



var performanceAbsoluteNow;

if(
(c_performance||(c_performance=require("performance"))).now&&
(c_performance||(c_performance=require("performance"))).timing&&
(c_performance||(c_performance=require("performance"))).timing.navigationStart)
{var
navigationStart=(c_performance||(c_performance=require("performance"))).timing.navigationStart;
performanceAbsoluteNow=function performanceAbsoluteNow(){return(c_performance||(c_performance=require("performance"))).now()+navigationStart;};
}else{
performanceAbsoluteNow=function performanceAbsoluteNow(){return Date.now();};
}

module.exports=performanceAbsoluteNow;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               __d("wrapFunction",[],function $module_wrapFunction(global,require,requireDynamic,requireLazy,module,exports){







var wrappers={};

var wrapFunction=function wrapFunction(



fn,
type,
source)
{
var callee=type in wrappers?wrappers[type](fn,source):fn;
return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return callee.apply(this,args);
};
};

wrapFunction.setWrapper=function(
fn,
type)
{
wrappers[type]=fn;
};

module.exports=wrapFunction;},null);
                                                                                                                                           __d("TimeSliceImpl",["invariant","CallStackExecutionObserver","CircularBuffer","Env","ErrorGuard","FBLogger","IntervalTrackingBoundedBuffer","WorkerUtils","getReusableTimeSliceContinuation","nullthrows","performanceAbsoluteNow","wrapFunction"],(function $module_TimeSliceImpl(global,require,requireDynamic,requireLazy,module,exports,invariant){var c_Env;var c_ErrorGuard;var c_performanceAbsoluteNow;































var _executionObserversInBeforeOrder=

[];
var _executionObserversInAfterOrder=

[];

var SECRET_GUARD_KEY='key'+Math.random();


var idCounter=1;


var guarded=false;




var LOGGING_UNSET=0;
var LOGGING_ENABLED=1;
var LOGGING_DISABLED=2;
var cancellationTokenToTimeSlice={};
var loggingState=LOGGING_UNSET;
var loggingBuffer=new(require("CircularBuffer"))(100);
var samplingRate=0;
var totalTime=0;var

timesliceBufferSize=(c_Env||(c_Env=require("Env"))).timesliceBufferSize;
if(timesliceBufferSize==null){
timesliceBufferSize=5000;
}
var buffer=new(require("IntervalTrackingBoundedBuffer"))(timesliceBufferSize);
var hasStackTraceLimitSetting='stackTraceLimit'in Error;

var framesStack=[];
var creationDataStack=[];
var executionDataStack=[];

function _currentFrame(){
return peek(framesStack);
}

function peek(array){
return array.length>0?array[array.length-1]:null;
}



function _pushState(
frame,
creationData)
{
var executionData={};
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(_callOnBeforeExecutionCallbacks,null,[
frame,
creationData,
executionData]);

c_ErrorGuard.applyWithGuard(_callOnAfterExecutionStartedCallbacks,null,[
frame,
creationData,
executionData]);

framesStack.push(frame);
creationDataStack.push(creationData);
executionDataStack.push(executionData);
}

function _callOnCreateExecutionCallbacks(
creationData,
name,
meta)
{
_executionObserversInBeforeOrder.forEach(function _executionObserversInBeforeOrder_forEach_$0(observer){
var data=observer.onNewContextCreated(_currentFrame(),name,meta);
creationData[observer.getBeforeID()]=data;
});
}

function _callOnCancelExecutionCallbacks(
name,
creationData)
{
_executionObserversInBeforeOrder.forEach(function _executionObserversInBeforeOrder_forEach_$0(obs){
obs.onContextCanceled(name,creationData[obs.getBeforeID()]);
});
}

function _callOnAfterExecutionEndedCallbacks(
lastFrame,
creationData,
executionData)
{
_executionObserversInAfterOrder.forEach(function _executionObserversInAfterOrder_forEach_$0(obs){
obs.onAfterContextEnded(
lastFrame,
creationData[obs.getBeforeID()],
executionData[obs.getBeforeID()],
lastFrame.meta);

});
}

function _callOnBeforeExecutionCallbacks(
newFrame,
creationData,
executionDataHolder)
{
_executionObserversInBeforeOrder.forEach(function _executionObserversInBeforeOrder_forEach_$0(obs){
var execData=obs.onBeforeContextStarted(
newFrame,
creationData[obs.getBeforeID()],
newFrame.meta);

executionDataHolder[obs.getBeforeID()]=execData;
});
}

function _callOnAfterExecutionStartedCallbacks(
currentFrame,
creationData,
executionData)
{
_executionObserversInBeforeOrder.forEach(function _executionObserversInBeforeOrder_forEach_$0(obs){
var newExecData=obs.onAfterContextStarted(
currentFrame,
creationData[obs.getBeforeID()],
executionData[obs.getBeforeID()],
currentFrame.meta);

executionData[obs.getBeforeID()]=newExecData;
});
}

function _restoreState(){
var lastFrame=_currentFrame();
var lastCreationData=peek(creationDataStack);
var lastExecutionData=peek(executionDataStack);
if(
lastFrame==null||
lastCreationData==null||
lastExecutionData==null)
{
require("FBLogger")('TimeSlice').mustfix(
'popped too many times off the timeslice stack');

guarded=false;
return;
}
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(_callOnAfterExecutionEndedCallbacks,null,[
lastFrame,
lastCreationData,
lastExecutionData]);

guarded=!lastFrame.isRoot;
framesStack.pop();
creationDataStack.pop();
executionDataStack.pop();
}





var TimeSlice={
PropagationType:{
CONTINUATION:0,
EXECUTION:1,
ORPHAN:2},







guard:function guard(
fn,
name,
metaArgs)
{var _Env$deferred_stack_t;
typeof fn==='function'||invariant(0,'Function fn is required');
typeof name==='string'||invariant(0,'String name is required');

var meta=getMeta(metaArgs);

if(fn[SECRET_GUARD_KEY]){

return fn;
}

if(!meta.root){
TimeSlice.checkCoverage();
}
var parentFrame;
if(guarded){
parentFrame=_currentFrame();
}
var observerData={};
var executionNumber=0;
var deferredSource=undefined;

var deferredSourceSamplingRate=(_Env$deferred_stack_t=(c_Env||(c_Env=require("Env"))).deferred_stack_trace_rate)!=null?_Env$deferred_stack_t:0;
if(
metaArgs&&
metaArgs.registerCallStack&&
deferredSourceSamplingRate>0&&



Math.random()<1/deferredSourceSamplingRate)
{
deferredSource=new Error('deferred execution source');
}

var guard={
cancel:function cancel(){
if(!guard.invoked){
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(_callOnCancelExecutionCallbacks,null,[
name,
observerData]);

}
},
tokens:[],
invoked:false};


var timeSliceGuarded=function timeSliceGuarded(){
var beginTime=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();

var newContextID=idCounter++;
var newFrame={
contextID:newContextID,
name:name,
isRoot:!guarded,
executionNumber:executionNumber++,
meta:meta,
absBeginTimeMs:beginTime};


if(!guard.invoked){
guard.invoked=true;
if(guard.tokens.length){
guard.tokens.forEach(function guard_tokens_forEach_$0(token){
delete cancellationTokenToTimeSlice[token];
});
guard.tokens=[];
}
}

_pushState(newFrame,observerData);

if(parentFrame!=null){
var isContinuation=!!meta.isContinuation;
if(parentFrame.isRoot){
newFrame.indirectParentID=parentFrame.contextID;
newFrame.isEdgeContinuation=isContinuation;
}else{
newFrame.indirectParentID=parentFrame.indirectParentID;
newFrame.isEdgeContinuation=!!(
isContinuation&&parentFrame.isEdgeContinuation);

}
}


var workerContext=require("WorkerUtils").isWorkerContext();

guarded=true;
try{for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
if(!newFrame.isRoot||workerContext){


return fn.apply(this,args);
}else{

return(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(fn,this,args,{
name:'TimeSlice'+(name?': '+name:''),
deferredSource:deferredSource});

}
}finally{
var lastFrame=_currentFrame();
if(lastFrame==null){
require("FBLogger")('TimeSlice').mustfix(
'timeslice stack misaligned, not logging the block');

guarded=false;
}else{var

isRoot=



lastFrame.isRoot,contextID=lastFrame.contextID,indirectParentID=lastFrame.indirectParentID,isEdgeContinuation=lastFrame.isEdgeContinuation;
var endTime=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
lastFrame.absEndTimeMs=endTime;
if(isRoot&&beginTime!=null){
totalTime+=endTime-beginTime;

var entry=babelHelpers["extends"]({
begin:beginTime,
end:endTime,
id:contextID,

indirectParentID:indirectParentID,
representsExecution:true,
isEdgeContinuation:parentFrame&&isEdgeContinuation,

guard:name},
meta,

fn.__SMmeta);

buffer.pushElement(entry);
}
_restoreState();
}
}
};
timeSliceGuarded[SECRET_GUARD_KEY]=guard;

(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(_callOnCreateExecutionCallbacks,null,[
observerData,
name,
meta]);

return timeSliceGuarded;
},

copyGuardForWrapper:function copyGuardForWrapper(
fn,
wrapper)
{
if(fn&&fn[SECRET_GUARD_KEY]){
wrapper[SECRET_GUARD_KEY]=fn[SECRET_GUARD_KEY];
}
return wrapper;
},

cancel:function cancel(func){
var guard=func?func[SECRET_GUARD_KEY]:null;
if(guard&&!guard.invoked){
guard.cancel();
guard.tokens.forEach(function guard_tokens_forEach_$0(token){
delete cancellationTokenToTimeSlice[token];
});
guard.invoked=true;
}
},

cancelWithToken:function cancelWithToken(token){
if(cancellationTokenToTimeSlice[token]){
TimeSlice.cancel(cancellationTokenToTimeSlice[token]);
}
},



registerForCancelling:function registerForCancelling(
token,
fn)
{
if(!token){
if(__DEV__){
console.error('trying to use a falsy value as the token');
}
}else if(fn[SECRET_GUARD_KEY]){
if(cancellationTokenToTimeSlice[token]){
if(__DEV__){
console.error('registering a TimeSlice cancellation token twice');
}
}else if(fn[SECRET_GUARD_KEY].invoked){



}else{
cancellationTokenToTimeSlice[token]=fn;
fn[SECRET_GUARD_KEY].tokens.push(token);
}
}
},


inGuard:function inGuard(){
return guarded;
},

checkCoverage:function checkCoverage(){
var originalLimit;
if(loggingState!==LOGGING_DISABLED&&!guarded){
if(hasStackTraceLimitSetting){
originalLimit=Error.stackTraceLimit;
Error.stackTraceLimit=50;
}

var error=new Error('Missing TimeSlice coverage');

if(hasStackTraceLimitSetting){

Error.stackTraceLimit=originalLimit;
}

if(loggingState===LOGGING_ENABLED&&Math.random()<samplingRate){
require("FBLogger")('TimeSlice').
catching(error).
debug('Missing TimeSlice coverage');
}else if(loggingState===LOGGING_UNSET){
require("nullthrows")(loggingBuffer).write(error);
}
}
},


setLogging:function setLogging(enabled,rate){
if(loggingState!==LOGGING_UNSET){
return;
}
samplingRate=rate;
if(enabled){
loggingState=LOGGING_ENABLED;
require("nullthrows")(loggingBuffer).
read().
forEach(function forEach_$0(error){
if(Math.random()<samplingRate){
require("FBLogger")('TimeSlice').
catching(error).
warn('error from logging buffer');
}
});
}else{
loggingState=LOGGING_DISABLED;
}
require("nullthrows")(loggingBuffer).clear();
loggingBuffer=undefined;
},

getContext:function getContext(){
return _currentFrame();
},

getTotalTime:function getTotalTime(){
return totalTime;
},














getGuardedContinuation:function getGuardedContinuation(
name)
{
function firstArgInvoker(
callback)

{for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
return callback.apply(this,args);
}

return TimeSlice.guard(firstArgInvoker,name,{
propagationType:TimeSlice.PropagationType.CONTINUATION});

},





getReusableContinuation:function getReusableContinuation(name){
return require("getReusableTimeSliceContinuation")(TimeSlice,SECRET_GUARD_KEY,name);
},

getPlaceholderReusableContinuation:function getPlaceholderReusableContinuation(){
var placeholder=function placeholder(fn){return fn();};
placeholder.last=placeholder;
return placeholder;
},

getGuardNameStack:function getGuardNameStack(){
return framesStack.map(function framesStack_map_$0(frame){return frame.name;});
},

registerExecutionContextObserver:function registerExecutionContextObserver(
observer)
{
var added=false;
for(var ii=0;ii<_executionObserversInBeforeOrder.length;ii++){
if(
_executionObserversInBeforeOrder[ii].getBeforeID()>
observer.getBeforeID())
{
_executionObserversInBeforeOrder.splice(ii,0,observer);
added=true;
break;
}
}
if(!added){
_executionObserversInBeforeOrder.push(observer);
}
for(var _ii=0;_ii<_executionObserversInAfterOrder.length;_ii++){
if(
_executionObserversInAfterOrder[_ii].getAfterID()>observer.getAfterID())
{
_executionObserversInAfterOrder.splice(_ii,0,observer);
return;
}
}
_executionObserversInAfterOrder.push(observer);
},









catchUpOnDemandExecutionContextObservers:function catchUpOnDemandExecutionContextObservers(
observer)
{
for(var ii=0;ii<framesStack.length;ii++){
var frame=framesStack[ii];
var creationDataForFrame=creationDataStack[ii];
var executionDataForFrame=executionDataStack[ii]||{};
var data=observer.onBeforeContextStartedWhileEnabled(
frame,
creationDataForFrame[observer.getBeforeID()],
frame.meta);

executionDataForFrame[observer.getBeforeID()]=data;
executionDataStack[ii]=executionDataForFrame;
}
},

getBuffer:function getBuffer(){
return buffer;
}};


function getMeta(metaArgs){

var meta={};
if(metaArgs&&metaArgs.propagateCounterAttribution!==undefined){
meta.propagateCounterAttribution=metaArgs.propagateCounterAttribution;
}
if(metaArgs&&metaArgs.root!==undefined){
meta.root=metaArgs.root;
}
switch(metaArgs&&metaArgs.propagationType){
case TimeSlice.PropagationType.CONTINUATION:
meta.isContinuation=true;
meta.extendsExecution=true;
break;
case TimeSlice.PropagationType.ORPHAN:
meta.isContinuation=false;
meta.extendsExecution=false;
break;
case TimeSlice.PropagationType.EXECUTION:
default:

meta.isContinuation=false;
meta.extendsExecution=true;}

return meta;
}

if((c_Env||(c_Env=require("Env"))).sample_continuation_stacktraces){
TimeSlice.registerExecutionContextObserver(require("CallStackExecutionObserver"));
}

require("wrapFunction").setWrapper(
function wrapFunction_setWrapper_$0(fn,name){return TimeSlice.guard(fn,name,{registerCallStack:true});},
'entry');


if(__DEV__){

TimeSlice.__getGuard=function(fn){
return fn[SECRET_GUARD_KEY];
};
}

global.TimeSlice=TimeSlice;

module.exports=TimeSlice;}),6);
                                                                                         __d("requireCond",[],(function $module_requireCond(global,require,requireDynamic,requireLazy,module,exports){




































































































































































function requireCond(type,condition,mb){
throw new Error('Cannot use raw untransformed requireCond.');
}

module.exports=requireCond;}),null);
                                                                                                                        __d("TimeSlice",["requireCond","cr:717822"],(function $module_TimeSlice(global,require,requireDynamic,requireLazy,module,exports){






















































module.exports=require("cr:717822");}),null);
                                                                                         __d("TimerStorage",[],function $module_TimerStorage(global,require,requireDynamic,requireLazy,module,exports){





var _storageNames={
ANIMATION_FRAME:'ANIMATION_FRAME',
IDLE_CALLBACK:'IDLE_CALLBACK',
IMMEDIATE:'IMMEDIATE',
INTERVAL:'INTERVAL',
TIMEOUT:'TIMEOUT'};


var _storages={};

ES(ES("Object","keys",false,_storageNames),"forEach",true,function forEach_$0(name){return _storages[name]={};});

var TimerStorage=babelHelpers["extends"]({},
_storageNames,{

set:function set(name,id){
_storages[name][id]=true;
},

unset:function unset(name,id){
delete _storages[name][id];
},

clearAll:function clearAll(name,callback){



ES(ES("Object","keys",false,_storages[name]),"forEach",true,callback);
_storages[name]={};
},

getStorages:function getStorages()







{



return __DEV__?_storages:{};
}});




















module.exports=TimerStorage;},null);
                                                                                               __d("clearTimeoutBlue",["TimerStorage","TimeSlice"],(function $module_clearTimeoutBlue(global,require,requireDynamic,requireLazy,module,exports){





var nativeClearTimeout=global.__fbNativeClearTimeout||global.clearTimeout;
var name=require("TimerStorage").TIMEOUT;

function clearTimeout(id){
if(id!=null){
require("TimerStorage").unset(name,id);
var token=name+String(id);
require("TimeSlice").cancelWithToken(token);
}

nativeClearTimeout(id);
}

module.exports=clearTimeout;}),null);
                                                                                               __d("setTimeoutAcrossTransitionsBlue",["TimerStorage","TimeSlice"],(function $module_setTimeoutAcrossTransitionsBlue(global,require,requireDynamic,requireLazy,module,exports){





var setTimeout=global.__fbNativeSetTimeout||global.setTimeout;
var name=require("TimerStorage").TIMEOUT;





function setTimeoutAcrossTransitions(
callback,
ms)

{
var guardedCallback=require("TimeSlice").guard(callback,'setTimeout',{
propagationType:require("TimeSlice").PropagationType.CONTINUATION,
registerCallStack:true});for(var _len=arguments.length,args=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}





var id=Function.prototype.apply.call(setTimeout,global,[
guardedCallback,
ms].concat(
args));




var token=name+id;
require("TimeSlice").registerForCancelling(token,guardedCallback);
return id;
}

module.exports=setTimeoutAcrossTransitions;}),null);
                                                                                               __d("setTimeoutAcrossTransitions",["requireCond","cr:986633"],(function $module_setTimeoutAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports){







module.exports=require("cr:986633");}),null);
                                                                                               __d("setTimeoutBlue",["TimerStorage","TimeSlice","setTimeoutAcrossTransitions"],(function $module_setTimeoutBlue(global,require,requireDynamic,requireLazy,module,exports){









function setTimeout(
originalCallback,
ms)

{
var id;
var callback=function callback(){
require("TimerStorage").unset(require("TimerStorage").TIMEOUT,id);for(var _len2=arguments.length,innerArgs=new Array(_len2),_key2=0;_key2<_len2;_key2++){innerArgs[_key2]=arguments[_key2];}
Function.prototype.apply.call(originalCallback,this,innerArgs);
};
require("TimeSlice").copyGuardForWrapper(originalCallback,callback);for(var _len=arguments.length,args=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
id=require("setTimeoutAcrossTransitions").apply(undefined,[callback,ms].concat(args));
require("TimerStorage").set(require("TimerStorage").TIMEOUT,id);
return id;
}

module.exports=setTimeout;}),null);
                                                                                               __d("clearIntervalBlue",["TimerStorage","TimeSlice"],(function $module_clearIntervalBlue(global,require,requireDynamic,requireLazy,module,exports){





var nativeClearInterval=
global.__fbNativeClearTimeout||global.clearTimeout;

function clearInterval(id){
if(id!=null){
require("TimerStorage").unset(require("TimerStorage").INTERVAL,id);


var token=require("TimerStorage").TIMEOUT+String(id);
require("TimeSlice").cancelWithToken(token);
}

nativeClearInterval(id);
}

module.exports=clearInterval;}),null);
                                                                                               __d("setIntervalAcrossTransitionsBlue",["TimeSlice"],(function $module_setIntervalAcrossTransitionsBlue(global,require,requireDynamic,requireLazy,module,exports){




var setInterval=global.__fbNativeSetInterval||global.setInterval;





function setIntervalAcrossTransitions(
callback,
ms)

{
var guardedCallback=require("TimeSlice").guard(callback,'setInterval');for(var _len=arguments.length,args=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}




return Function.prototype.apply.call(setInterval,global,[
guardedCallback,
ms].concat(
args));

}

module.exports=setIntervalAcrossTransitions;}),null);
                                                                                               __d("ArbiterToken",["invariant"],(function $module_ArbiterToken(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var









ArbiterToken=function(){



function ArbiterToken(arbiter,subscriptions){this.







unsubscribe=function(){
for(var ii=0;ii<this.$ArbiterToken_subscriptions.length;ii++){
this.$ArbiterToken_subscriptions[ii].remove();
}
if(__DEV__){
this.$ArbiterToken_arbiterInstance=null;
}
this.$ArbiterToken_subscriptions.length=0;
};this.$ArbiterToken_arbiterInstance=arbiter;this.$ArbiterToken_subscriptions=subscriptions;}var _proto=ArbiterToken.prototype;_proto.

isForArbiterInstance=function isForArbiterInstance(arbiter){
this.$ArbiterToken_arbiterInstance||invariant(0,'Token has already been unsubscribed');
return this.$ArbiterToken_arbiterInstance===arbiter;
};return ArbiterToken;}();


module.exports=ArbiterToken;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     __d("CallbackDependencyManager",["ErrorGuard"],(function $module_CallbackDependencyManager(global,require,requireDynamic,requireLazy,module,exports){var c_ErrorGuard;var













CallbackDependencyManager=function(){"use strict";





function CallbackDependencyManager(){
this.$CallbackDependencyManager_callbackDependencyCounts=new Map();
this.$CallbackDependencyManager_callbacks=new Map();
this.$CallbackDependencyManager_lastCallbackID=1;
this.$CallbackDependencyManager_satisfiedDependencies=new Map();
}var _proto=CallbackDependencyManager.prototype;_proto.

$CallbackDependencyManager_addDependenciesToCallback=function $CallbackDependencyManager_addDependenciesToCallback(
callbackID,
deps)
{
var pendingDepCount=0;
var uniqDeps=new Set();

for(var idx=0,length=deps.length;idx<length;idx++){
uniqDeps.add(deps[idx]);
}

for(var _iterator=uniqDeps.keys(),_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var depName=_ref;
if(this.$CallbackDependencyManager_satisfiedDependencies.get(depName)){
continue;
}
pendingDepCount++;


var callbackCounts=this.$CallbackDependencyManager_callbackDependencyCounts.get(depName);
if(callbackCounts===undefined){
callbackCounts=new Map();
this.$CallbackDependencyManager_callbackDependencyCounts.set(depName,callbackCounts);
}
callbackCounts.set(callbackID,(callbackCounts.get(callbackID)||0)+1);
}

return pendingDepCount;
};_proto.

$CallbackDependencyManager_resolveCallbacksForDependency=function $CallbackDependencyManager_resolveCallbacksForDependency(depName){
var callbackCounts=this.$CallbackDependencyManager_callbackDependencyCounts.get(depName);
if(!callbackCounts){
return;
}

for(var _iterator2=callbackCounts.entries(),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var entry=_ref2;
var callbackID=entry[0];
var count=entry[1]-1;
callbackCounts.set(callbackID,count);

if(count<=0){
callbackCounts["delete"](callbackID);
}

var callback=this.$CallbackDependencyManager_callbacks.get(callbackID);
if(callback!==undefined){
callback.$CallbackDependencyManager_pendingDepCount--;

if(callback.$CallbackDependencyManager_pendingDepCount<=0){
var callbackFunction=callback.$CallbackDependencyManager_callback;
this.$CallbackDependencyManager_callbacks["delete"](callbackID);
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(callbackFunction,null,[]);
}
}
}
};_proto.

addDependenciesToExistingCallback=function addDependenciesToExistingCallback(
callbackID,
newDeps)
{
var callback=this.$CallbackDependencyManager_callbacks.get(callbackID);
if(!callback){
return null;
}
var pendingDepCount=this.$CallbackDependencyManager_addDependenciesToCallback(
callbackID,
newDeps);

callback.$CallbackDependencyManager_pendingDepCount+=pendingDepCount;
return callbackID;
};_proto.

isPersistentDependencySatisfied=function isPersistentDependencySatisfied(depName){
return!!this.$CallbackDependencyManager_satisfiedDependencies.get(depName);
};_proto.





satisfyPersistentDependency=function satisfyPersistentDependency(depName){
this.$CallbackDependencyManager_satisfiedDependencies.set(depName,1);
this.$CallbackDependencyManager_resolveCallbacksForDependency(depName);
};_proto.





satisfyNonPersistentDependency=function satisfyNonPersistentDependency(depName){
var alreadySatisfied=this.$CallbackDependencyManager_satisfiedDependencies.get(depName)===1;
if(!alreadySatisfied){
this.$CallbackDependencyManager_satisfiedDependencies.set(depName,1);
}
this.$CallbackDependencyManager_resolveCallbacksForDependency(depName);
if(!alreadySatisfied){
this.$CallbackDependencyManager_satisfiedDependencies["delete"](depName);
}
};_proto.

registerCallback=function registerCallback(
callback,
deps)
{
var callbackID=this.$CallbackDependencyManager_lastCallbackID;
this.$CallbackDependencyManager_lastCallbackID++;
var pendingDepCount=this.$CallbackDependencyManager_addDependenciesToCallback(callbackID,deps);




if(pendingDepCount===0){
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(callback,null,[]);
return null;
}

this.$CallbackDependencyManager_callbacks.set(callbackID,{
$CallbackDependencyManager_callback:callback,
$CallbackDependencyManager_pendingDepCount:pendingDepCount});


return callbackID;
};return CallbackDependencyManager;}();


module.exports=CallbackDependencyManager;}),null);
                                                                                         __d("EventSubscription",[],(function $module_EventSubscription(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var








EventSubscription=






function EventSubscription(subscriber){var _this=this;this.









remove=function(){
if(_this.subscriber){
_this.subscriber.removeSubscription(_this);
_this.subscriber=null;
}
};this.subscriber=subscriber;};




module.exports=EventSubscription;}),null);
                                                                                  __d("EmitterSubscription",["EventSubscription"],(function $module_EmitterSubscription(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var









EmitterSubscription=function(_EventSubscription){babelHelpers.inheritsLoose(EmitterSubscription,_EventSubscription);











function EmitterSubscription(
subscriber,
listener,
context)
{var _this;
_this=_EventSubscription.call(this,subscriber)||this;
_this.listener=listener;
_this.context=context;return _this;
}return EmitterSubscription;}(require("EventSubscription"));


module.exports=EmitterSubscription;}),null);
                                                                                                        __d("EventSubscriptionVendor",["invariant"],(function $module_EventSubscriptionVendor(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var







EventSubscriptionVendor=function(){
function EventSubscriptionVendor(){
this.$EventSubscriptionVendor_subscriptionsForType={};
}var _proto=EventSubscriptionVendor.prototype;_proto.







addSubscription=function addSubscription(
eventType,
subscription)
{

subscription.subscriber===this||invariant(0,
'The subscriber of the subscription is incorrectly set.');

if(!this.$EventSubscriptionVendor_subscriptionsForType[eventType]){
this.$EventSubscriptionVendor_subscriptionsForType[eventType]=[];
}
var key=this.$EventSubscriptionVendor_subscriptionsForType[eventType].length;
this.$EventSubscriptionVendor_subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;
};_proto.







removeAllSubscriptions=function removeAllSubscriptions(eventType){
if(eventType===undefined){
this.$EventSubscriptionVendor_subscriptionsForType={};
}else{
delete this.$EventSubscriptionVendor_subscriptionsForType[eventType];
}
};_proto.







removeSubscription=function removeSubscription(subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this.$EventSubscriptionVendor_subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];
}
};_proto.













getSubscriptionsForType=function getSubscriptionsForType(eventType){
return this.$EventSubscriptionVendor_subscriptionsForType[eventType];
};return EventSubscriptionVendor;}();


module.exports=EventSubscriptionVendor;}),null);
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
};













module.exports=emptyFunction;},null);
                                                                                  __d("BaseEventEmitter",["EmitterSubscription","ErrorGuard","EventSubscriptionVendor","emptyFunction","unrecoverableViolation"],(function $module_BaseEventEmitter(global,require,requireDynamic,requireLazy,module,exports){var c_ErrorGuard;var





































BaseEventEmitter=function(){"use strict";






function BaseEventEmitter(){
this.$BaseEventEmitter_subscriber=new(require("EventSubscriptionVendor"))();
this.$BaseEventEmitter_currentSubscription=null;
}var _proto=BaseEventEmitter.prototype;_proto.












addListener=function addListener(
eventType,
listener,
context)
{
return this.$BaseEventEmitter_subscriber.addSubscription(
eventType,
new(require("EmitterSubscription"))(this.$BaseEventEmitter_subscriber,listener,context));

};_proto.











once=function once(
eventType,
listener,
context)
{
var emitter=this;
return this.addListener(eventType,function addListener_$1(){
emitter.removeCurrentListener();
listener.apply(context,arguments);
});
};_proto.








removeAllListeners=function removeAllListeners(
eventType)
{
this.$BaseEventEmitter_subscriber.removeAllSubscriptions(eventType);
};_proto.











removeCurrentListener=function removeCurrentListener(){
if(!this.$BaseEventEmitter_currentSubscription){
throw require("unrecoverableViolation")(
'Not in an emitting cycle; there is no current subscription',
'emitter');

}
this.$BaseEventEmitter_subscriber.removeSubscription(this.$BaseEventEmitter_currentSubscription);
};_proto.








listeners=function listeners(
eventType)
{
var subscriptions=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.
filter(require("emptyFunction").thatReturnsTrue).
map(function map_$0(subscription){
return subscription.listener;
}):
[];
};_proto.















emit=function emit(


eventType){
var subscriptions=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
var keys=Object.keys(subscriptions);
var args;
for(var ii=0;ii<keys.length;ii++){
var key=keys[ii];
var subscription=subscriptions[key];

if(subscription){
this.$BaseEventEmitter_currentSubscription=subscription;
if(args==null){
args=[subscription,eventType];
for(var i=0,len=arguments.length<=1?0:arguments.length-1;i<len;i++){
args[i+2]=i+1<1||arguments.length<=i+1?undefined:arguments[i+1];
}
}else{
args[0]=subscription;
}
this.__emitToSubscription.apply(this,args);
}
}
this.$BaseEventEmitter_currentSubscription=null;
}
};_proto.










__emitToSubscription=function __emitToSubscription(
subscription,
eventType)

{for(var _len=arguments.length,args=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
subscription.listener,
subscription.context,
args,
{
name:"EventEmitter "+eventType+" event"});


};return BaseEventEmitter;}();


module.exports=BaseEventEmitter;}),null);
                                                                                               __d("EventEmitter",["BaseEventEmitter"],(function $module_EventEmitter(global,require,requireDynamic,requireLazy,module,exports){var



EventEmitter=function(_BaseEventEmitter){"use strict";babelHelpers.inheritsLoose(EventEmitter,_BaseEventEmitter);function EventEmitter(){return _BaseEventEmitter.apply(this,arguments)||this;}return EventEmitter;}(require("BaseEventEmitter"));



module.exports=EventEmitter;}),null);
                                                                                                 __d("EventEmitterWithHolding",[],(function $module_EventEmitterWithHolding(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var

















EventEmitterWithHolding=function(){













function EventEmitterWithHolding(
emitter,
holder)
{
this.$EventEmitterWithHolding_emitter=emitter;
this.$EventEmitterWithHolding_eventHolder=holder;
this.$EventEmitterWithHolding_currentEventToken=null;
this.$EventEmitterWithHolding_heldEventsRemovalStack=[];
this.$EventEmitterWithHolding_heldEventsEmitDepth=0;
}var _proto=EventEmitterWithHolding.prototype;_proto.




addListener=function addListener(
eventType,
listener,
context)
{
return this.$EventEmitterWithHolding_emitter.addListener(eventType,listener,context);
};_proto.




once=function once(
eventType,
listener,
context)
{
return this.$EventEmitterWithHolding_emitter.once(eventType,listener,context);
};_proto.





















addRetroactiveListener=function addRetroactiveListener(
eventType,
listener,
context)
{
var subscription=this.$EventEmitterWithHolding_emitter.addListener(eventType,listener,context);

var removeListenerStack=this.$EventEmitterWithHolding_heldEventsRemovalStack;
removeListenerStack.push(false);
this.$EventEmitterWithHolding_heldEventsEmitDepth++;
this.$EventEmitterWithHolding_eventHolder.emitToListener(eventType,listener,context);
this.$EventEmitterWithHolding_heldEventsEmitDepth--;

if(removeListenerStack[removeListenerStack.length-1]){
subscription.remove();
}
removeListenerStack.pop();

return subscription;
};_proto.




removeAllListeners=function removeAllListeners(
eventType)
{
this.$EventEmitterWithHolding_emitter.removeAllListeners(eventType);
};_proto.




removeCurrentListener=function removeCurrentListener(){
if(this.$EventEmitterWithHolding_heldEventsEmitDepth){
var removeListenerStack=this.$EventEmitterWithHolding_heldEventsRemovalStack;
removeListenerStack[removeListenerStack.length-1]=true;
}else{
this.$EventEmitterWithHolding_emitter.removeCurrentListener();
}
};_proto.




listeners=function listeners(
eventType)
{
return this.$EventEmitterWithHolding_emitter.listeners(eventType);
};_proto.




emit=function emit(
eventType)

{var _this$$EventEmitterWi;for(var _len=arguments.length,listenerArgs=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){listenerArgs[_key-1]=arguments[_key];}
(_this$$EventEmitterWi=this.$EventEmitterWithHolding_emitter).emit.apply(_this$$EventEmitterWi,[eventType].concat(listenerArgs));
};_proto.
















emitAndHold=function emitAndHold(
eventType)

{var _this$$EventEmitterWi2,_this$$EventEmitterWi3;for(var _len2=arguments.length,listenerArgs=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){listenerArgs[_key2-1]=arguments[_key2];}
this.$EventEmitterWithHolding_currentEventToken=(_this$$EventEmitterWi2=this.$EventEmitterWithHolding_eventHolder).holdEvent.apply(_this$$EventEmitterWi2,[
eventType].concat(
listenerArgs));

(_this$$EventEmitterWi3=this.$EventEmitterWithHolding_emitter).emit.apply(_this$$EventEmitterWi3,[eventType].concat(listenerArgs));
this.$EventEmitterWithHolding_currentEventToken=null;
};_proto.




releaseCurrentEvent=function releaseCurrentEvent(){
if(this.$EventEmitterWithHolding_currentEventToken!=null){
this.$EventEmitterWithHolding_eventHolder.releaseEvent(this.$EventEmitterWithHolding_currentEventToken);
}else if(this.$EventEmitterWithHolding_heldEventsEmitDepth>0){
this.$EventEmitterWithHolding_eventHolder.releaseCurrentEvent();
}
};_proto.




releaseHeldEventType=function releaseHeldEventType(
eventType)
{
this.$EventEmitterWithHolding_eventHolder.releaseEventType(eventType);
};return EventEmitterWithHolding;}();


module.exports=EventEmitterWithHolding;}),null);
                                                                                                 __d("EventHolder",["invariant"],(function $module_EventHolder(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var









EventHolder=function(){



function EventHolder(){
this.$EventHolder_heldEvents={};
this.$EventHolder_currentEventKey=[];
}var _proto=EventHolder.prototype;_proto.




















holdEvent=function holdEvent(eventType){
this.$EventHolder_heldEvents[eventType]=this.$EventHolder_heldEvents[eventType]||[];
var eventsOfType=this.$EventHolder_heldEvents[eventType];
var key={
eventType:eventType,
index:eventsOfType.length};for(var _len=arguments.length,listenerArgs=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){listenerArgs[_key-1]=arguments[_key];}

eventsOfType.push(listenerArgs);
return key;
};_proto.









emitToListener=function emitToListener(
eventType,
listener,
context)
{var _this=this;
var eventsOfType=this.$EventHolder_heldEvents[eventType];
if(!eventsOfType){
return;
}
eventsOfType.forEach(function eventsOfType_forEach_$0(eventHeld,index){
if(!eventHeld){
return;
}
_this.$EventHolder_currentEventKey.push({
eventType:eventType,
index:index});

listener.apply(context,eventHeld);
_this.$EventHolder_currentEventKey.pop();
});
};_proto.









releaseCurrentEvent=function releaseCurrentEvent(){

this.$EventHolder_currentEventKey.length||invariant(0,
'Not in an emitting cycle; there is no current event');

this.releaseEvent(this.$EventHolder_currentEventKey[this.$EventHolder_currentEventKey.length-1]);
};_proto.





releaseEvent=function releaseEvent(token){
delete this.$EventHolder_heldEvents[token.eventType][token.index];
};_proto.




releaseEventType=function releaseEventType(type){
this.$EventHolder_heldEvents[type]=[];
};return EventHolder;}();


module.exports=EventHolder;}),null);
                                                                                                                          __d("Arbiter",["invariant","ArbiterToken","CallbackDependencyManager","ErrorGuard","EventEmitter","EventEmitterWithHolding","EventHolder"],(function $module_Arbiter(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var c_ErrorGuard;












function toArray(obj){
return Array.isArray(obj)?obj:[obj];
}




function getStaticContext(that){
if(that instanceof Arbiter||that===Arbiter){
return that;
}
return Arbiter;
}var












Arbiter=function(){





function Arbiter(){
var emitter=new(require("EventEmitter"))();
this.$Arbiter_holder=new ArbiterEventHolder();
this.$Arbiter_emitter=new(require("EventEmitterWithHolding"))(emitter,this.$Arbiter_holder);
this.$Arbiter_callbackManager=new(require("CallbackDependencyManager"))();


this.$Arbiter_returnValueStack=[];
}var _proto=Arbiter.prototype;_proto.

















subscribe=function subscribe(
types,
callback,
policy)
{
types=toArray(types);
types.forEach(function types_forEach_$0(type){
type&&typeof type==='string'||invariant(0,'Invalid type: %s',type);
});

typeof callback==='function'||invariant(0,'Invalid callback: %s',callback);

policy=policy||'all';

policy==='new'||policy==='all'||invariant(0,
'Unknown policy: %s',
policy);


var subscriptions=types.map(function types_map_$0(type){
var listener=this.$Arbiter_proxyListener.bind(this,callback,type);
listener.__SMmeta=callback.__SMmeta;
if(policy==='new'){
return this.$Arbiter_emitter.addListener(type,listener);
}
this.$Arbiter_returnValueStack.push({});
var subscription=this.$Arbiter_emitter.addRetroactiveListener(type,listener);
this.$Arbiter_returnValueStack.pop();
return subscription;
},this);
return new(require("ArbiterToken"))(this,subscriptions);
};_proto.

$Arbiter_proxyListener=function $Arbiter_proxyListener(callback,type,data){
var returnValues=this.$Arbiter_returnValueStack[
this.$Arbiter_returnValueStack.length-1];

if(returnValues[type]===false){
return;
}

var value=(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(callback,null,[type,data]);
if(value===false){
this.$Arbiter_emitter.releaseCurrentEvent();
}
returnValues[type]=value;
};_proto.

unsubscribeCurrentSubscription=function unsubscribeCurrentSubscription(){
this.$Arbiter_emitter.removeCurrentListener();
};_proto.

releaseCurrentPersistentEvent=function releaseCurrentPersistentEvent(){
this.$Arbiter_emitter.releaseCurrentEvent();
};_proto.

subscribeOnce=function subscribeOnce(
types,
callback,
policy)
{var _this=this;
var token=this.subscribe(
types,
function subscribe_$1(type,data){
_this.unsubscribeCurrentSubscription();
return callback(type,data);
},
policy);

return token;
};_proto.




unsubscribe=function unsubscribe(token){

token.isForArbiterInstance(this)||invariant(0,
'Unsubscribing from another instance');

token.unsubscribe();
};_proto.




















inform=function inform(
types,
data,
behavior)
{
var expectsArrayReturn=Array.isArray(types);
types=toArray(types);

behavior=behavior||'event';
var isPersistentEvent=behavior==='state'||behavior==='persistent';

this.$Arbiter_returnValueStack.push({});

for(var ii=0;ii<types.length;ii++){
var type=types[ii];
type||invariant(0,'Event types must be non-empty strings: %s',type);

this.$Arbiter_holder.setHoldingBehavior(type,behavior);

this.$Arbiter_emitter.emitAndHold(type,data);
this.$Arbiter_updateCallbacks(type,data,isPersistentEvent);
}

var returnValues=this.$Arbiter_returnValueStack.pop();
return expectsArrayReturn?returnValues:returnValues[types[0]];
};_proto.











query=function query(type){
var holdingBehavior=this.$Arbiter_holder.getHoldingBehavior(type);

!holdingBehavior||holdingBehavior==='state'||invariant(0,
'Querying state of an unstateful event: %s',
type);


var value=null;
this.$Arbiter_holder.emitToListener(type,function $Arbiter_holder_emitToListener_$1(data){
value=data;
});
return value;
};_proto.













registerCallback=function registerCallback(
callbackOrCallbackID,
deps)
{
if(typeof callbackOrCallbackID==='function'){
return this.$Arbiter_callbackManager.registerCallback(callbackOrCallbackID,deps);
}else{
return this.$Arbiter_callbackManager.addDependenciesToExistingCallback(
callbackOrCallbackID,
deps);

}
};_proto.




$Arbiter_updateCallbacks=function $Arbiter_updateCallbacks(
type,
data,
isPersistentEvent)
{
if(data===null){
return;
}
if(isPersistentEvent){
this.$Arbiter_callbackManager.satisfyPersistentDependency(type);
}else{
this.$Arbiter_callbackManager.satisfyNonPersistentDependency(type);
}
};Arbiter.




subscribe=function subscribe(
types,
callback,
policy)
{
return Arbiter.prototype.subscribe.apply(getStaticContext(this),arguments);
};Arbiter.

unsubscribeCurrentSubscription=function unsubscribeCurrentSubscription(){
return Arbiter.prototype.unsubscribeCurrentSubscription.apply(
getStaticContext(this));

};Arbiter.

releaseCurrentPersistentEvent=function releaseCurrentPersistentEvent(){
return Arbiter.prototype.releaseCurrentPersistentEvent.apply(
getStaticContext(this));

};Arbiter.

subscribeOnce=function subscribeOnce(
types,
callback,
policy)
{
return Arbiter.prototype.subscribeOnce.apply(
getStaticContext(this),
arguments);

};Arbiter.

unsubscribe=function unsubscribe(token){
return Arbiter.prototype.unsubscribe.apply(
getStaticContext(this),
arguments);

};Arbiter.


inform=function inform(
types,
data,
behavior)
{
return Arbiter.prototype.inform.apply(getStaticContext(this),arguments);
};Arbiter.


informSingle=function informSingle(type,data,behavior){
return Arbiter.prototype.inform.apply(getStaticContext(this),arguments);
};Arbiter.

query=function query(type){
return Arbiter.prototype.query.apply(getStaticContext(this),arguments);
};Arbiter.

registerCallback=function registerCallback(
callbackOrCallbackID,
deps)
{
return Arbiter.prototype.registerCallback.apply(
getStaticContext(this),
arguments);

};Arbiter.

$Arbiter_updateCallbacks=function $Arbiter_updateCallbacks(
type,
data,
isPersistentEvent)
{
return Arbiter.prototype.$Arbiter_updateCallbacks.apply(
getStaticContext(this),
arguments);

};Arbiter.

$Arbiter_proxyListener=function $Arbiter_proxyListener(callback,type,data){
return Arbiter.prototype.$Arbiter_proxyListener.apply(
getStaticContext(this),
arguments);

};return Arbiter;}();var


ArbiterEventHolder=function(_EventHolder){babelHelpers.inheritsLoose(ArbiterEventHolder,_EventHolder);


function ArbiterEventHolder(){var _this2;
_this2=_EventHolder.call(this)||this;
_this2.$ArbiterEventHolder_holdingBehaviors={};return _this2;
}var _proto2=ArbiterEventHolder.prototype;_proto2.












setHoldingBehavior=function setHoldingBehavior(type,behavior){
this.$ArbiterEventHolder_holdingBehaviors[type]=behavior;
};_proto2.

getHoldingBehavior=function getHoldingBehavior(type){
return this.$ArbiterEventHolder_holdingBehaviors[type];
};_proto2.

holdEvent=function holdEvent(type){
var behavior=this.$ArbiterEventHolder_holdingBehaviors[type];
if(behavior!=='persistent'){
this.$ArbiterEventHolder_releaseAllEvents(type);
}
if(behavior!=='event'){var _EventHolder$prototyp;for(var _len=arguments.length,listenerArgs=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){listenerArgs[_key-1]=arguments[_key];}
return(_EventHolder$prototyp=_EventHolder.prototype.holdEvent).call.apply(_EventHolder$prototyp,[this,type].concat(listenerArgs));
}
return undefined;
};_proto2.

$ArbiterEventHolder_releaseAllEvents=function $ArbiterEventHolder_releaseAllEvents(type){


this.emitToListener(type,this.releaseCurrentEvent,this);
};_proto2.

releaseEvent=function releaseEvent(token){
if(token){
_EventHolder.prototype.releaseEvent.call(this,token);
}
};return ArbiterEventHolder;}(require("EventHolder"));




Arbiter.call(Arbiter);

module.exports=Arbiter;}),null);
                                                                                                                                                                                                                                                                    __d("BigPipeInstance",[],(function $module_BigPipeInstance(global,require,requireDynamic,requireLazy,module,exports){
'use strict';

var _instance=null;

var BigPipeInstance={
Events:{
init:'BigPipe/init',
tti:'tti_bigpipe',
displayed:'all_pagelets_displayed',
loaded:'all_pagelets_loaded'},


setCurrentInstance_DO_NOT_USE:function setCurrentInstance_DO_NOT_USE(instance){
_instance=instance;
},

getCurrentInstance:function getCurrentInstance(){
return _instance;
}};


module.exports=BigPipeInstance;}),null);
                                                                                                                          __d("err",["TAALOpcodes"],(function $module_err(global,require,requireDynamic,requireLazy,module,exports){

'use strict';











function err(format){
var err=new Error(format);
if(err.stack===undefined){

try{
throw err;

}catch(_){}
}
err.messageFormat=format;for(var _len=arguments.length,rawArgs=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){rawArgs[_key-1]=arguments[_key];}
err.messageParams=rawArgs.map(function rawArgs_map_$0(p){return String(p);});
err.taalOpcodes=[require("TAALOpcodes").PREVIOUS_FRAME];
return err;
}

module.exports=err;}),null);
                                                                                                        __d("$-core",["TAALOpcodes","err"],(function $module___core(global,require,requireDynamic,requireLazy,module,exports){














function $(id){
return truthyOrThrow(
id,
typeof id==='string'?document.getElementById(id):id);

}

function fromIDOrElement(id){
return truthyOrThrow(
id,
typeof id==='string'?document.getElementById(id):id);

}

function truthyOrThrow(id,element){
if(!element){
var error=require("err")(
'Tried to get element with id of "%s" but it is not present on the page',
String(id));

error.taalOpcodes=error.taalOpcodes||[];
error.taalOpcodes=[require("TAALOpcodes").PREVIOUS_FILE];
throw error;
}
return element;
}

$.fromIDOrElement=fromIDOrElement;
module.exports=$;}),null);
                                                                                         __d("$",["$-core"],(function $module__(global,require,requireDynamic,requireLazy,module,exports){

module.exports=require('$-core');}),null);
                                                                                                        __d("CSSCore",["invariant"],(function $module_CSSCore(global,require,requireDynamic,requireLazy,module,exports,invariant){












function matchesSelector_SLOW(element,selector){
var root=element;
while(root.parentNode){
root=root.parentNode;
}

if(root instanceof Element){
var all=root.querySelectorAll(selector);
return Array.prototype.indexOf.call(all,element)!==-1;
}

return false;
}

var CSSCore={

addClass:function addClass(element,className){

!/\s/.test(className)||invariant(0,
'CSSCore.addClass takes only a single class name. "%s" contains '+
'multiple classes.',
className);


if(className){
if(element.classList){
element.classList.add(className);
}else if(!CSSCore.hasClass(element,className)){
element.className=element.className+' '+className;
}
}
return element;
},


removeClass:function removeClass(element,className){

!/\s/.test(className)||invariant(0,
'CSSCore.removeClass takes only a single class name. "%s" contains '+
'multiple classes.',
className);


if(className){
if(element.classList){
element.classList.remove(className);
}else if(CSSCore.hasClass(element,className)){
element.className=element.className.
replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)','g'),'$1').
replace(/\s+/g,' ').
replace(/^\s*|\s*$/g,'');
}
}
return element;
},


conditionClass:function conditionClass(
element,
className,
bool)
{
return(bool?CSSCore.addClass:CSSCore.removeClass)(element,className);
},


hasClass:function hasClass(element,className){

!/\s/.test(className)||invariant(0,
'CSS.hasClass takes only a single class name.');

if(element.classList){
return!!className&&element.classList.contains(className);
}
return(' '+element.className+' ').indexOf(' '+className+' ')>-1;
},


matchesSelector:function matchesSelector(element,selector){
var matchesImpl=
element.matches||



element.webkitMatchesSelector||



element.mozMatchesSelector||



element.msMatchesSelector||
function(s){return matchesSelector_SLOW(element,s);};
return matchesImpl.call(element,selector);
}};


module.exports=CSSCore;}),null);
                                                                                                                  __d("CSS",["CSSCore","$"],(function $module_CSS(global,require,requireDynamic,requireLazy,module,exports){



var NativeCSS=typeof window!='undefined'?window.CSS:null;




var HIDDEN_CLASS='hidden_elem';









var CSS={
supports:NativeCSS&&NativeCSS.supports.bind(NativeCSS),





setClass:function setClass(element,className){
require("$").fromIDOrElement(element).className=className||'';
return element;
},








hasClass:function hasClass(
element,
className)
{




if(element instanceof Document||element instanceof Text){
return false;
}

return require("CSSCore").hasClass(require("$").fromIDOrElement(element),className);
},




matchesSelector:function matchesSelector(
element,
selector)
{




if(element instanceof Document||element instanceof Text){
return false;
}

return require("CSSCore").matchesSelector(require("$").fromIDOrElement(element),selector);
},






addClass:function addClass(element,className){
return require("CSSCore").addClass(require("$").fromIDOrElement(element),className);
},






removeClass:function removeClass(element,className){
return require("CSSCore").removeClass(require("$").fromIDOrElement(element),className);
},




conditionClass:function conditionClass(
element,
className,
bool)
{
return require("CSSCore").conditionClass(
require("$").fromIDOrElement(element),
className,
!!bool);

},





toggleClass:function toggleClass(element,className){
return CSS.conditionClass(
element,
className,
!CSS.hasClass(element,className));

},






shown:function shown(element){
return!CSS.hasClass(element,HIDDEN_CLASS);
},






hide:function hide(element){
return CSS.addClass(element,HIDDEN_CLASS);
},






show:function show(element){
return CSS.removeClass(element,HIDDEN_CLASS);
},




toggle:function toggle(element){
return CSS.toggleClass(element,HIDDEN_CLASS);
},




conditionShow:function conditionShow(element,bool){
return CSS.conditionClass(element,HIDDEN_CLASS,!bool);
}};


module.exports=CSS;}),null);
                                                                                                 __d("Parent",["CSS"],(function $module_Parent(global,require,requireDynamic,requireLazy,module,exports){



var Parent={





byTag:function byTag(startNode,tagName){
tagName=tagName.toUpperCase();
var node=Parent.find(startNode,function Parent_find_$1(n){return n.nodeName===tagName;});
return node instanceof Element?node:null;
},






byClass:function byClass(startNode,className){
var node=Parent.find(
startNode,
function Parent_find_$1(n){return n instanceof Element&&require("CSS").hasClass(n,className);});

return node instanceof Element?node:null;
},

bySelector:function bySelector(startNode,selector){
var node=startNode;



if(typeof node.matches==='function'){




while(node&&node!==document&&!node.matches(selector)){
node=node.parentNode;
}
return node instanceof Element?node:null;



}else if(typeof node.msMatchesSelector==='function'){




while(node&&node!==document&&!node.msMatchesSelector(selector)){
node=node.parentNode;
}
return node instanceof Element?node:null;
}else{

return Parent.bySelector_SLOW(node,selector);
}
},





bySelector_SLOW:function bySelector_SLOW(startNode,selector){
var node=startNode;
var root=node;
while(root.parentNode){
root=root.parentNode;
}

if(!(root instanceof Element)&&!(root instanceof Document)){
return null;
}

var all=root.querySelectorAll(selector);
while(node){
if(Array.prototype.indexOf.call(all,node)!==-1){
return node instanceof Element?node:null;
}

node=node.parentNode;
}

return node instanceof Element?node:null;
},






byAttribute:function byAttribute(
startNode,
attributeName)
{
var node=Parent.find(
startNode,
function Parent_find_$1(n){return n instanceof Element&&!!n.getAttribute(attributeName);});

return node instanceof Element?node:null;
},






find:function find(startNode,callback){
var node=startNode;
while(node){
if(callback(node)){
return node;
}
node=node.parentNode;
}
return null;
}};


module.exports=Parent;}),null);
                                                                                               __d("ContextualComponent",["Parent"],(function $module_ContextualComponent(global,require,requireDynamic,requireLazy,module,exports){var






























ContextualComponent=function(){"use strict";ContextualComponent.


forNode=function forNode(node){
return ContextualComponent.$ContextualComponent_map.get(node)||null;
};ContextualComponent.

closestToNode=function closestToNode(node){
var parentNode=require("Parent").find(
node,
function Parent_find_$1(node){return!!ContextualComponent.forNode(node);});

return parentNode?ContextualComponent.forNode(parentNode):null;
};ContextualComponent.

register=function register(
options)
{
return new ContextualComponent(options);
};








function ContextualComponent(_ref)



{var element=_ref.element,isRoot=_ref.isRoot,parent=_ref.parent;
this.$ContextualComponent_isRoot=isRoot;
this.$ContextualComponent_element=element;
this.$ContextualComponent_parent=parent;

this.$ContextualComponent_children=new Set();
this.$ContextualComponent_onCleanupCallbacks=[];
this.$ContextualComponent_onUnmountCallbacks=[];

this.$ContextualComponent_init();
}var _proto=ContextualComponent.prototype;_proto.

onCleanup=function onCleanup(callback){
this.$ContextualComponent_onCleanupCallbacks.push(callback);
};_proto.

onUnmount=function onUnmount(callback){
this.$ContextualComponent_onUnmountCallbacks.push(callback);
};_proto.

cleanup=function cleanup(){
this.$ContextualComponent_children.forEach(function $ContextualComponent_children_forEach_$0(component){return component.cleanup();});
this.$ContextualComponent_onCleanupCallbacks.forEach(function $ContextualComponent_onCleanupCallbacks_forEach_$0(cb){return cb();});
this.$ContextualComponent_onCleanupCallbacks=[];
};_proto.

unmount=function unmount(){
this.cleanup();
this.$ContextualComponent_children.forEach(function $ContextualComponent_children_forEach_$0(component){return component.unmount();});
this.$ContextualComponent_onUnmountCallbacks.forEach(function $ContextualComponent_onUnmountCallbacks_forEach_$0(cb){return cb();});
this.$ContextualComponent_onUnmountCallbacks=[];

var parent=this.$ContextualComponent_parent;
if(parent){

ContextualComponent.$ContextualComponent_map["delete"](this.$ContextualComponent_element);
parent.$ContextualComponent_detachChild(this);
}
};_proto.



reinitialize=function reinitialize(){
var parent=this.$ContextualComponent_parent;
if(parent){
parent.$ContextualComponent_detachChild(this);
this.$ContextualComponent_parent=undefined;
}
ContextualComponent.$ContextualComponent_map["delete"](this.$ContextualComponent_element);
this.$ContextualComponent_init();
};_proto.

$ContextualComponent_init=function $ContextualComponent_init(){
if(!this.$ContextualComponent_isRoot&&!this.$ContextualComponent_parent){
var parentComponent=ContextualComponent.closestToNode(this.$ContextualComponent_element);
if(parentComponent){
this.$ContextualComponent_parent=parentComponent;
}
}
if(this.$ContextualComponent_parent){
this.$ContextualComponent_parent.$ContextualComponent_attachChild(this);
}
ContextualComponent.$ContextualComponent_map.set(this.$ContextualComponent_element,this);
};_proto.

$ContextualComponent_attachChild=function $ContextualComponent_attachChild(child){
this.$ContextualComponent_children.add(child);
};_proto.

$ContextualComponent_detachChild=function $ContextualComponent_detachChild(child){
this.$ContextualComponent_children["delete"](child);
};return ContextualComponent;}();ContextualComponent.$ContextualComponent_map=new Map();


module.exports=ContextualComponent;}),null);
                                                                                         __d("ExecutionEnvironment",[],(function $module_ExecutionEnvironment(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

var canUseDOM=!!(
typeof window!=='undefined'&&
window.document&&
window.document.createElement);








var ExecutionEnvironment={
canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&
!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};


module.exports=ExecutionEnvironment;}),null);
                                                                                         __d("PageEvents",[],(function $module_PageEvents(global,require,requireDynamic,requireLazy,module,exports){

var PageEvents=Object.freeze({




NATIVE_ONLOAD:'onload/onload',





BIGPIPE_ONLOAD:'onload/onload_callback',




AJAXPIPE_ONLOAD:'ajaxpipe/onload_callback',





NATIVE_DOMREADY:'onload/dom_content_ready',





BIGPIPE_DOMREADY:'onload/domcontent_callback',




AJAXPIPE_DOMREADY:'ajaxpipe/domcontent_callback',


NATIVE_ONBEFOREUNLOAD:'onload/beforeunload',


NATIVE_ONUNLOAD:'onload/unload',






AJAXPIPE_ONUNLOAD:'onload/exit',


AJAXPIPE_SEND:'ajaxpipe/send',


AJAXPIPE_FIRST_RESPONSE:'ajaxpipe/first_response',

AJAXPIPE_ONBEFORECLEARCANVAS:'ajaxpipe/onbeforeclearcanvas'});


module.exports=PageEvents;}),null);
                                                                                                                    __d("createCancelableFunction",["emptyFunction"],(function $module_createCancelableFunction(global,require,requireDynamic,requireLazy,module,exports){













function createCancelableFunction(



func){
var localFunc=func;
var cancelableFunction=function cancelableFunction(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return localFunc.apply(this,args);
};

cancelableFunction.cancel=function(){
localFunc=require("emptyFunction");
};

return cancelableFunction;
}

module.exports=createCancelableFunction;}),null);
                                                                                                                                                                                                                                                                                                                                                  __d("isTruthy",[],(function $module_isTruthy(global,require,requireDynamic,requireLazy,module,exports){

'use strict';











function isTruthy(value){
return(


value!=null&&Boolean(value));

}

module.exports=isTruthy;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          __d("recoverableViolation",["FBLogger"],(function $module_recoverableViolation(global,require,requireDynamic,requireLazy,module,exports){

'use strict';





function recoverableViolation(
errorMessage,
projectName,_temp)

{var _ref=_temp===void 0?{}:_temp,error=_ref.error;
var logger=require("FBLogger")(projectName);
if(error){
logger=logger.catching(error);
}
logger.blameToPreviousFrame().mustfix(errorMessage);






return null;
}

module.exports=recoverableViolation;}),null);
                                                                                                                           __d("RunBlue",["Arbiter","BigPipeInstance","ContextualComponent","ExecutionEnvironment","PageEvents","TimeSlice","createCancelableFunction","emptyFunction","isTruthy","performanceAbsoluteNow","recoverableViolation"],(function $module_RunBlue(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceAbsoluteNow;























var UNLOAD_HOOK='onunloadhooks';
var AFTER_UNLOAD_HOOK='onafterunloadhooks';

function clog(name,ts){
var instance=global.CavalryLogger&&global.CavalryLogger.getInstance();
if(!instance){
return;
}
if(require("isTruthy")(ts)){
instance.setAbsTimeStamp&&instance.setAbsTimeStamp(name,ts);
}else{
instance.setTimeStamp(name);
}
}























function domreadyRegister(handler){
var PageHooks=global.PageHooks;
if(window.domready&&PageHooks){
PageHooks.runHook(handler,'domreadyhooks:late');
return{remove:require("emptyFunction")};
}else{
return _addHook('domreadyhooks',handler);
}
}










function onloadRegister(handler){
var PageHooks=global.PageHooks;
if(window.loaded&&PageHooks){
var timeout=global.setTimeout(function global_setTimeout_$0(){
PageHooks.runHook(handler,'onloadhooks:late');
},0);
return{remove:function remove(){return global.clearTimeout(timeout);}};
}else{
return _addHook('onloadhooks',handler);
}
}







































function onbeforeunloadRegister(
handler,
include_quickling_events)
{
var include_quickling=
include_quickling_events===undefined?
!window.loading_page_chrome:
include_quickling_events;

return include_quickling?
_addHook('onbeforeleavehooks',handler):
_addHook('onbeforeunloadhooks',handler);
}







function _onunloadRegister(hooks,handler){



if(!window.onunload){
window.onunload=require("TimeSlice").guard(function TimeSlice_guard_$0(){
require("Arbiter").inform(require("PageEvents").NATIVE_ONUNLOAD,true,'state');
},'window.onunload');
}
return _addHook(hooks,handler);
}




function onunloadRegister(handler){
return _onunloadRegister(UNLOAD_HOOK,handler);
}




function onafterunloadRegister(handler){
return _onunloadRegister(AFTER_UNLOAD_HOOK,handler);
}








function onleaveRegister(handler){
return _addHook('onleavehooks',handler);
}













function onCleanupOrLeaveRegister(
element,
handler)
{
var cancelableFunction=require("createCancelableFunction")(handler);

var localHandler=function localHandler(){
cancelableFunction();
cancelableFunction.cancel();
};

var component=require("ContextualComponent").closestToNode(element);
if(component){
component.onCleanup(localHandler);
}


window.onleavehooks=(window.onleavehooks||[]).concat(localHandler);

return{
remove:function remove(){
cancelableFunction.cancel();
}};

}

function _addHook(hooks,handler){var _handler;
var localHandler=(_handler=handler)!=null?_handler:require("emptyFunction");
if(!handler){
require("recoverableViolation")('Undefined handler is not allowed','web_speed');
}

var cancelableHandler=require("createCancelableFunction")(localHandler);
window[hooks]=(window[hooks]||[]).concat(cancelableHandler);

return{
remove:function remove(){
cancelableHandler.cancel();
}};

}

function removeHook(hooks){
window[hooks]=[];
}



var _domcontentready=require("TimeSlice").guard(function TimeSlice_guard_$0(){
require("Arbiter").inform(require("PageEvents").NATIVE_DOMREADY,true,'state');
},'DOMContentLoaded');

global._domcontentready=_domcontentready;








function _bootstrapEventHandlers(){
var d=document;
var w=window;
if(d.addEventListener){
var webkit=/AppleWebKit.(\d+)/.exec(navigator.userAgent);



if(webkit&&webkit[1]<525){
var timeout=global.setInterval(function global_setInterval_$0(){
if(/loaded|complete/.test(d.readyState)){
_domcontentready();
global.clearInterval(timeout);
}
},10);
}else{
d.addEventListener('DOMContentLoaded',_domcontentready,true);
}
}else{


var src=w.location.protocol==='https:'?'//:':'javascript:void(0)';





d.write(
"<script onreadystatechange=\"if (this.readyState=='complete') {"+
'this.parentNode.removeChild(this);_domcontentready();}" '+
'defer="defer" src="'+
src+
'"></');

d.write('script>');
}

var onload=w.onload;
w.onload=require("TimeSlice").guard(function TimeSlice_guard_$0(){
clog('t_layout');
onload&&onload();
require("Arbiter").inform(require("PageEvents").NATIVE_ONLOAD,true,'state');
},'window.onload');

w.onbeforeunload=require("TimeSlice").guard(function TimeSlice_guard_$0(e){
var state={};
require("Arbiter").inform(require("PageEvents").NATIVE_ONBEFOREUNLOAD,state,'state');
if(!state.warn){
require("Arbiter").inform(require("PageEvents").AJAXPIPE_ONUNLOAD,{transition_type:'normal'});
}
if(state.warn!==undefined){
var warn=state.warn.body!=null?state.warn.body:state.warn;


if(e){
e.returnValue=warn;
}


return warn;
}else{





return;
}
},'window.onbeforeunload');
}

function fireBigPipeOnload(){var _window$console;
var ts=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
if((_window$console=window.console)==null?void 0:_window$console.timeStamp){
window.console.timeStamp(
'perf_trace {"name": "e2e", "parent": "PageEvents.BIGPIPE_ONLOAD"}');

}

clog('t_onload',ts);
require("Arbiter").inform(require("PageEvents").BIGPIPE_ONLOAD,{ts:ts},'state');
}

var onload_callback=require("Arbiter").registerCallback(function Arbiter_registerCallback_$0(){



if(require("BigPipeInstance").getCurrentInstance()){
require("Arbiter").subscribeOnce(require("BigPipeInstance").Events.displayed,fireBigPipeOnload);
}else{
fireBigPipeOnload();
}
},[require("PageEvents").NATIVE_ONLOAD]);

var domcontent_callback=require("Arbiter").registerCallback(
function Arbiter_registerCallback_$0(){
clog('t_domcontent');



var parameters={timeTriggered:Date.now()};
require("Arbiter").inform(require("PageEvents").BIGPIPE_DOMREADY,parameters,'state');
},
[require("PageEvents").NATIVE_DOMREADY]);


if(require("ExecutionEnvironment").canUseDOM){
_bootstrapEventHandlers();
}

var Run={
onAfterLoad:onloadRegister,
onAfterUnload:onafterunloadRegister,
onBeforeUnload:onbeforeunloadRegister,
onCleanupOrLeave:onCleanupOrLeaveRegister,
onLeave:onleaveRegister,
onLoad:domreadyRegister,
onUnload:onunloadRegister,
__domContentCallback:domcontent_callback,
__onloadCallback:onload_callback,
__removeHook:removeHook};


module.exports=Run;}),null);
                                                                                         __d("nativeRequestAnimationFrame",[],(function $module_nativeRequestAnimationFrame(global,require,requireDynamic,requireLazy,module,exports){

var nativeRequestAnimationFrame=global.__fbNativeRequestAnimationFrame||
global.requestAnimationFrame||
global.webkitRequestAnimationFrame||
global.mozRequestAnimationFrame||
global.oRequestAnimationFrame||
global.msRequestAnimationFrame;

module.exports=nativeRequestAnimationFrame;}),null);
                                                                                         __d("requestAnimationFramePolyfill",["nativeRequestAnimationFrame","performanceNow"],(function $module_requestAnimationFramePolyfill(global,require,requireDynamic,requireLazy,module,exports){var c_performanceNow;




var lastTime=0;











var requestAnimationFrame=require("nativeRequestAnimationFrame")||
function(callback){
var currTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var timeDelay=Math.max(0,16-(currTime-lastTime));
lastTime=currTime+timeDelay;
return global.setTimeout(function global_setTimeout_$0(){
callback((c_performanceNow||(c_performanceNow=require("performanceNow")))());
},timeDelay);
};

module.exports=requestAnimationFrame;}),null);
                                                                                  __d("IdleCallbackImplementation",["performanceNow","requestAnimationFramePolyfill"],(function $module_IdleCallbackImplementation(global,require,requireDynamic,requireLazy,module,exports){var c_performanceNow;



















var _callbacks=[];
var _currentCallback=0;
var _currentHandle=0;
var _lastDeadline=-1;
var _isScheduled=false;

var FRAME_TIME=1000/60;
var BUFFER_TIME=2;




function toIdleCallbackID(handle){
return handle;
}
function toHandle(idleCallbackID){
return idleCallbackID;
}

function requestIdleCallback(
callback,
options)
{
var handle=_currentHandle++;

_callbacks[handle]=callback;
scheduleIdlePeriod();

if(options!=null&&options.timeout>0){
var idleCallbackID=toIdleCallbackID(handle);
global.setTimeout(
function global_setTimeout_$0(){return invokeIdleCallbackTimeout(idleCallbackID);},
options.timeout);

}

return toIdleCallbackID(handle);
}

function cancelIdleCallback(idleCallackID){
var handle=toHandle(idleCallackID);
_callbacks[handle]=null;
}

function scheduleIdlePeriod(){
if(!_isScheduled){
_isScheduled=true;
require("requestAnimationFramePolyfill")(function requestAnimationFramePolyfill_$0(frameStartTime){
_isScheduled=false;
startIdlePeriod((c_performanceNow||(c_performanceNow=require("performanceNow")))()-frameStartTime);
});
}
}

function calculateDeadline(frameDelay){
var effectiveFrameTime=FRAME_TIME-BUFFER_TIME;



if(frameDelay<effectiveFrameTime){
return effectiveFrameTime-frameDelay;
}



var frameOffset=frameDelay%FRAME_TIME;
if(frameOffset>effectiveFrameTime||frameOffset<BUFFER_TIME){
return 0;
}else{
return effectiveFrameTime-frameOffset;
}
}

function startIdlePeriod(frameDelay){
var now=(c_performanceNow||(c_performanceNow=require("performanceNow")))();

if(now>_lastDeadline){
var time=calculateDeadline(frameDelay);
if(time>0){
var _deadline=now+time;
invokeIdleCallbacks(_deadline);
_lastDeadline=_deadline;
}
}

if(hasIdleCallback()){
scheduleIdlePeriod();
}
}

function hasIdleCallback(){
return _currentCallback<_callbacks.length;
}

function popNextCallback(){
while(hasIdleCallback()){
var callback=_callbacks[_currentCallback];
_currentCallback++;

if(callback){
return callback;
}
}
return null;
}


function invokeIdleCallbacks(deadline){
var callback;
while((c_performanceNow||(c_performanceNow=require("performanceNow")))()<deadline&&(callback=popNextCallback())){
callback(new IdleCallbackDeadline(deadline));
}
}


function invokeIdleCallbackTimeout(idleCallbackID){
var handle=toHandle(idleCallbackID);
var callback=_callbacks[handle];

if(callback){
cancelIdleCallback(idleCallbackID);
callback(new IdleCallbackDeadline(null));
}
}var

IdleCallbackDeadline=function(){"use strict";



function IdleCallbackDeadline(deadline){
this.didTimeout=deadline==null;
this.$IdleCallbackDeadline_deadline=deadline;
}var _proto=IdleCallbackDeadline.prototype;_proto.

timeRemaining=function timeRemaining(){
var deadline=this.$IdleCallbackDeadline_deadline;

if(deadline!=null){
var now=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
if(now<deadline){
return deadline-now;
}
}

return 0;
};return IdleCallbackDeadline;}();


module.exports={
requestIdleCallback:requestIdleCallback,
cancelIdleCallback:cancelIdleCallback};}),null);
                                                                                               __d("cancelIdleCallbackBlue",["IdleCallbackImplementation","TimerStorage","TimeSlice"],(function $module_cancelIdleCallbackBlue(global,require,requireDynamic,requireLazy,module,exports){





var name=require("TimerStorage").IDLE_CALLBACK;

function cancelIdleCallbackBlue(id){
require("TimerStorage").unset(name,id);
var token=name+String(id);
require("TimeSlice").cancelWithToken(token);
require("IdleCallbackImplementation").cancelIdleCallback(id);
}
module.exports=cancelIdleCallbackBlue;}),null);
                                                                                         __d("BanzaiConsts",[],(function $module_BanzaiConsts(global,require,requireDynamic,requireLazy,module,exports){


























































var BanzaiConsts=























{
SEND:'Banzai:SEND',
OK:'Banzai:OK',
ERROR:'Banzai:ERROR',
SHUTDOWN:'Banzai:SHUTDOWN',

BASIC:'basic',
VITAL:'vital',

BASIC_WAIT:60000,
BASIC_WAIT_COMET:2000,
VITAL_WAIT:1000,



EXPIRY:30*60000,

LAST_STORAGE_FLUSH:'banzai:last_storage_flush',
STORAGE_FLUSH_INTERVAL:12*60*60000,

ODS_ROUTE:'categorized_ods',


POST_READY:0,
POST_INFLIGHT:1,
POST_SENT:2};


module.exports=BanzaiConsts;}),null);
                                                                                               __d("BootloaderEvents",["Arbiter"],(function $module_BootloaderEvents(global,require,requireDynamic,requireLazy,module,exports){
















































var BOOTLOAD='bootloader/bootload';
var _arbiter=new(require("Arbiter"))();

module.exports={
notifyBootload:function notifyBootload(logData){
_arbiter.inform(BOOTLOAD,logData,'persistent');
},

onBootload:function onBootload(handler){
return _arbiter.subscribe(BOOTLOAD,function _arbiter_subscribe_$1(_,data){return handler(data);});
}};}),null);
                                                                                               __d("BootloaderEventsManager",["CallbackDependencyManager","performanceAbsoluteNow"],(function $module_BootloaderEventsManager(global,require,requireDynamic,requireLazy,module,exports){var c_performanceAbsoluteNow;var










BootloaderEventsManager=function(){"use strict";



function BootloaderEventsManager(){
this.$BootloaderEventsManager_callbackManager=new(require("CallbackDependencyManager"))();
this.$BootloaderEventsManager_timings=new Map();
}var _proto=BootloaderEventsManager.prototype;_proto.


rsrcDone=function rsrcDone(hash){
return hash;
};_proto.


bootload=function bootload(components){
return'bl:'+components.join(',');
};_proto.


tierOne=function tierOne(comp){
return't1:'+comp;
};_proto.


tierTwoStart=function tierTwoStart(comp){
return't2s:'+comp;
};_proto.


tierTwo=function tierTwo(comp){
return't2:'+comp;
};_proto.


tierThreeStart=function tierThreeStart(comp){
return't3s:'+comp;
};_proto.


tierThree=function tierThree(comp){
return't3:'+comp;
};_proto.


beDone=function beDone(comp){
return'beDone:'+comp;
};_proto.

notify=function notify(event){
this.$BootloaderEventsManager_timings.set(event,(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());
this.$BootloaderEventsManager_callbackManager.satisfyPersistentDependency(event);
};_proto.

getEventTime=function getEventTime(event){
return this.$BootloaderEventsManager_timings.get(event);
};_proto.

registerCallback=function registerCallback(callback,events){
this.$BootloaderEventsManager_callbackManager.registerCallback(callback,events);
};return BootloaderEventsManager;}();


module.exports=BootloaderEventsManager;}),null);
                                                                                         __d("BitMap",[],(function $module_BitMap(global,require,requireDynamic,requireLazy,module,exports){

var b64='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';var

BitMap=function(){"use strict";function BitMap(){this.
$BitMap_bits=[];this.
$BitMap_cachedCompressedString=null;}var _proto=BitMap.prototype;_proto.

set=function set(index){
if(this.$BitMap_cachedCompressedString!=null&&!this.$BitMap_bits[index]){
this.$BitMap_cachedCompressedString=null;
}

this.$BitMap_bits[index]=1;
return this;
};_proto.






toString=function toString(){
var bits=[];
for(var ii=0;ii<this.$BitMap_bits.length;ii++){
bits.push(this.$BitMap_bits[ii]?1:0);
}
return bits.length?encodeBitString(bits.join('')):'';
};_proto.











toCompressedString=function toCompressedString(){
if(this.$BitMap_bits.length===0){
return'';
}

if(this.$BitMap_cachedCompressedString!=null){
return this.$BitMap_cachedCompressedString;
}

var runLengths=[];
var runCount=1;
var prevBit=this.$BitMap_bits[0]||0;
var polarity=prevBit.toString(2);

for(var ii=1;ii<this.$BitMap_bits.length;ii++){
var bit=this.$BitMap_bits[ii]||0;
if(bit===prevBit){
runCount++;
}else{
runLengths.push(eliasGammaCode(runCount));
prevBit=bit;
runCount=1;
}
}

if(runCount){
runLengths.push(eliasGammaCode(runCount));
}

return this.$BitMap_cachedCompressedString=encodeBitString(
polarity+runLengths.join(''));

};return BitMap;}();


function eliasGammaCode(num){
var bitString=num.toString(2);
var zeros='0'.repeat(bitString.length-1);
return zeros+bitString;
}

function encodeBitString(bitString){


var sextets=(bitString+'00000').match(/[01]{6}/g);
var result='';
for(var ii=0;sextets!=null&&ii<sextets.length;ii++){
result+=b64[parseInt(sextets[ii],2)];
}
return result;
}

module.exports=BitMap;}),null);
                                                                                         __d("CSRBitMap",["BitMap"],(function $module_CSRBitMap(global,require,requireDynamic,requireLazy,module,exports){












var _csr=new(require("BitMap"))();

module.exports={
add:function add(index){
_csr.set(index);
},

toCompressedString:function toCompressedString(){
return _csr.toCompressedString();
}};}),null);
                                                                                         __d("CSRIndexUtil",["invariant"],(function $module_CSRIndexUtil(global,require,requireDynamic,requireLazy,module,exports,invariant){







module.exports={




parseCSRIndexes:function parseCSRIndexes(str){
str.substr(0,1)===':'||invariant(0,'Invalid csrindex format %s',str);
return str.
substr(1).
split(',').
map(function map_$0(idx){return parseInt(idx,10);});
}};}),null);
                                                                                         __d("isFacebookURI",[],function $module_isFacebookURI(global,require,requireDynamic,requireLazy,module,exports){



var facebookURIRegex=null;

var FB_PROTOCOLS=['http','https'];





function isFacebookURI(uri){
if(!facebookURIRegex){
facebookURIRegex=new RegExp('(^|\\.)facebook\\.com$','i');
}

if(uri.isEmpty()&&uri.toString()!=='#'){
return false;
}

if(!uri.getDomain()&&!uri.getProtocol()){
return true;
}

return(
ES(FB_PROTOCOLS,"indexOf",true,uri.getProtocol())!==-1&&
facebookURIRegex.test(uri.getDomain()));

}

isFacebookURI.setRegex=function(regex){
facebookURIRegex=regex;
};

module.exports=isFacebookURI;},null);
                                                                                                              __d("isWorkplaceDotComURI",[],function $module_isWorkplaceDotComURI(global,require,requireDynamic,requireLazy,module,exports){




var workplaceDotComURIRegex=new RegExp('(^|\\.)workplace\\.com$','i');





function isWorkplaceDotComURI(uri){
return(
uri.getProtocol()==='https'&&
workplaceDotComURIRegex.test(uri.getDomain()));

}

module.exports=isWorkplaceDotComURI;},null);
                                                                                                                                                                                        __d("BlueCompatBroker",["Env","URI","isCometAltpayJsSdkIframeAllowedDomain","isFacebookURI","isWorkplaceDotComURI"],function $module_BlueCompatBroker(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;var c_Env;








var channel;
var handlers=new Map();
var _init=false;
var validateReferrer=function validateReferrer(referrerToCheck){
var uri=new(c_URI||(c_URI=require("URI")))(referrerToCheck);
return require("isFacebookURI")(uri)||require("isWorkplaceDotComURI")(uri);
};

var BlueCompatBroker={
dispatch:function dispatch(event){
var compatAction=BlueCompatBroker.getMessageEventString(
event,
'compatAction');

if(compatAction!=null){
var handler=handlers.get(compatAction);
if(handler){
handler(event);
}
}
},
getMessageEventString:function getMessageEventString(event,objectKey){var
data=event.data;
if(typeof data==='object'){
var stringValue=data==null?void 0:data[objectKey];
if(typeof stringValue==='string'){
return stringValue;
}
}
return'';
},
init:function init(customIframeKey){if(customIframeKey===void 0){customIframeKey='';}
if(!_init){

if(document.body){
document.body.style.overflow='auto';
}
var targetUrl=require("isCometAltpayJsSdkIframeAllowedDomain")()?
'https://www.facebook.com/':
document.referrer;

var firstSlash=ES(targetUrl,"indexOf",true,'/',8);

var parentWindow=targetUrl.substring(0,firstSlash);
if(validateReferrer(parentWindow)){
var messageChannel=new MessageChannel();
var iframeKey=
customIframeKey!==''?customIframeKey:(c_Env||(c_Env=require("Env"))).iframeKey;
channel=messageChannel.port1;
channel.onmessage=BlueCompatBroker.dispatch;
window.parent.postMessage(
{
compatAction:'CompatSetup',
iframeKey:iframeKey},

parentWindow+'/',
[messageChannel.port2]);

}
_init=true;
}
},
register:function register(messageType,handler){
handlers.set(messageType,handler);
},

sendMessage:function sendMessage(payload){
if(!_init){
BlueCompatBroker.init();
}
channel&&
channel.postMessage(babelHelpers["extends"]({},
payload));

}};


module.exports=BlueCompatBroker;},null);
                                                                                                        __d("MessengerEnvironment",["CurrentEnvironment"],function $module_MessengerEnvironment(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var MessengerEnvironment=babelHelpers["extends"]({},require("CurrentEnvironment"),{

messengerui:false,
setMessengerUI:function setMessengerUI(value){
this.messengerui=value;
}});


module.exports=MessengerEnvironment;},null);
                                                                                  __d("areEqual",[],function $module_areEqual(global,require,requireDynamic,requireLazy,module,exports){

var aStackPool=[];
var bStackPool=[];









function areEqual(a,b){
var aStack=aStackPool.length?aStackPool.pop():[];
var bStack=bStackPool.length?bStackPool.pop():[];
var result=eq(a,b,aStack,bStack);
aStack.length=0;
bStack.length=0;
aStackPool.push(aStack);
bStackPool.push(bStack);
return result;
}

function eq(a,b,aStack,bStack){
if(a===b){

return a!==0||1/a==1/b;
}
if(a==null||b==null){

return false;
}
if(typeof a!=='object'||typeof b!=='object'){
return false;
}
var objToStr=Object.prototype.toString;
var className=objToStr.call(a);
if(className!=objToStr.call(b)){
return false;
}
switch(className){
case'[object String]':
return a==String(b);
case'[object Number]':
return isNaN(a)||isNaN(b)?false:a==Number(b);
case'[object Date]':
case'[object Boolean]':
return+a==+b;
case'[object RegExp]':
return(
a.source==b.source&&
a.global==b.global&&
a.multiline==b.multiline&&
a.ignoreCase==b.ignoreCase);}



var length=aStack.length;
while(length--){
if(aStack[length]==a){
return bStack[length]==b;
}
}
aStack.push(a);
bStack.push(b);
var size=0;

if(className==='[object Array]'){
size=a.length;
if(size!==b.length){
return false;
}

while(size--){
if(!eq(a[size],b[size],aStack,bStack)){
return false;
}
}
}else if(a instanceof Set){
if(a.size!==b.size){
return false;
}
var bVals=ES("Array","from",false,b.values());
for(var _iterator=a,_isArray=ES("Array","isArray",false,_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var aVal=_ref;
var match=false;
for(var index=0;index<bVals.length;index++){
var bVal=bVals[index];
if(eq(aVal,bVal,aStack,bStack)){
match=true;

bVals.splice(index,1);
break;
}
}
if(match===false){
return false;
}
}
return true;
}else{
if(a.constructor!==b.constructor){
return false;
}
if(Object.prototype.hasOwnProperty.call(a,'valueOf')&&Object.prototype.hasOwnProperty.call(b,'valueOf')){
return a.valueOf()==b.valueOf();
}
var keys=ES("Object","keys",false,a);
if(keys.length!=ES("Object","keys",false,b).length){
return false;
}
for(var i=0;i<keys.length;i++){
if(keys[i]==='_owner'){




continue;
}
if(
!Object.prototype.hasOwnProperty.call(b,keys[i])||
!eq(a[keys[i]],b[keys[i]],aStack,bStack))
{
return false;
}
}
}
aStack.pop();
bStack.pop();
return true;
}

module.exports=areEqual;},null);
                                                                                         __d("isCdnURI",[],function $module_isCdnURI(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






function isCdnURI(uri){
if(uri.getProtocol()!=='http'&&uri.getProtocol()!=='https'){
return false;
}
var port=Number(uri.getPort());
if(!!port&&port!==80&&port!==443){
return false;
}
if(uri.isSubdomainOfDomain('fbcdn.net')){
return true;
}
return false;
}

module.exports=isCdnURI;},null);
                                                                                                                                                                                      __d("BlueCompatRouter",["BlueCompatBroker","Env","MessengerEnvironment","URI","areEqual","isCdnURI"],function $module_BlueCompatRouter(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;var c_Env;var c_areEqual;









var debounce=function debounce(func,wait){
var timeout;
var clearTimeout=global.__fbNativeClearTimeout||window.clearTimeout;
var setTimeout=global.__fbNativeSetTimeout||window.setTimeout;

return function executedFunction(){
var context=this;
var args=arguments;

var later=function later(){
timeout=null;
func.apply(context,args);
};
clearTimeout(timeout);
timeout=setTimeout(later,wait);
};
};

var BlueCompatRouter={
convertUri:function convertUri(uri){
if(uri==null||uri===''){
return new(c_URI||(c_URI=require("URI")))();
}

var originalUri=new(c_URI||(c_URI=require("URI")))(uri);
if(ES(originalUri.getDomain(),"endsWith",true,'messenger.com')){
return originalUri.
setDomain(
originalUri.getDomain().replace(/messenger\.com/i,'facebook.com')).

setPath('/messages'+originalUri.getPath());
}else{
return originalUri;
}
},
goFragment:function goFragment(uri){
if((c_Env||(c_Env=require("Env"))).isCQuick){

var convertedUri=BlueCompatRouter.convertUri(uri);

if(convertedUri.getFragment()){
var currentUri=(c_URI||(c_URI=require("URI"))).getRequestURI(false,false);

if(
(c_areEqual||(c_areEqual=require("areEqual")))(
new(c_URI||(c_URI=require("URI")))(currentUri).setFragment('').getQualifiedURI(),
new(c_URI||(c_URI=require("URI")))(convertedUri).setFragment('').getQualifiedURI()))

{
return true;
}
}
}
return false;
},
go:function go(uri,replace){

if((c_Env||(c_Env=require("Env"))).isCQuick){

var originalUri=new(c_URI||(c_URI=require("URI")))(uri);
var convertedUri=BlueCompatRouter.convertUri(uri);
var goURI=convertedUri.getQualifiedURI();

if(require("isCdnURI")(convertedUri)||ES(goURI.getPath(),"startsWith",true,'/compat')){
return false;
}var _ref=

function(){
if(
require("MessengerEnvironment").messengerui&&ES(
goURI.getPath(),"startsWith",true,'/messages'))
{
return[false,'/messages'];
}
if(
ES(originalUri.getPath(),"startsWith",true,'/settings')&&ES(
goURI.getPath(),"startsWith",true,'/settings')&&
goURI.getSubdomain()!==originalUri.getSubdomain())
{
return[false,'/settings'];
}
if(
ES(originalUri.getPath(),"startsWith",true,'/games')&&ES(
goURI.getPath(),"startsWith",true,'/games'))
{
return[false,'/games/web'];
}
if(

/\/[A-Za-z\-0-9]+\/settings/.test(originalUri.getPath()))
{
return[false,'/pages/settings'];
}
if(/\/[A-Za-z\-0-9]+\/insights/.test(originalUri.getPath())){

return[false,'/insights'];
}
return[true,''];
}(),shouldStopProcessing=_ref[0],maintainKey=_ref[1];


debouncedSendMessage({
compatAction:'route',
maintainKey:maintainKey,
replace:replace,
uri:String(goURI)});


return shouldStopProcessing;
}
return false;
},
startChat:function startChat(tabId){
return BlueCompatRouter.sendMessage({
compatAction:'startchat',
tabId:tabId});

},

chatListener:function chatListener(element,fbid){
element.addEventListener('click',function element_addEventListener_$1(){
BlueCompatRouter.startChat("fbid:"+fbid);
});
},
sendMessage:function sendMessage(message){
if((c_Env||(c_Env=require("Env"))).isCQuick){
require("BlueCompatBroker").init();
require("BlueCompatBroker").sendMessage(message);
return true;
}
return false;
}};


var debouncedSendMessage=debounce(BlueCompatRouter.sendMessage,250);

module.exports=BlueCompatRouter;},null);
                                                                                  __d("flattenPHPQueryData",["invariant"],(function $module_flattenPHPQueryData(global,require,requireDynamic,requireLazy,module,exports,invariant){














































function flattenPHPQueryData(
obj)
{


return _flattenPHPQueryData(obj,'',{});
}

function _flattenPHPQueryData(
obj,
name,
componentsObject)
{
if(obj===null||obj===undefined){
componentsObject[name]=undefined;
}else if(typeof obj==='object'){

typeof obj.appendChild!=='function'||invariant(0,
'Trying to serialize a DOM node. Bad idea.');


for(var k in obj){


if(
k!=='$$typeof'&&
Object.prototype.hasOwnProperty.call(obj,k)&&
obj[k]!==undefined)
{
_flattenPHPQueryData(
obj[k],
name?name+'['+k+']':k,
componentsObject);

}
}
}else{
componentsObject[name]=obj;
}

return componentsObject;
}

module.exports=flattenPHPQueryData;}),null);
                                                                                  __d("PHPQuerySerializer",["flattenPHPQueryData"],function $module_PHPQuerySerializer(global,require,requireDynamic,requireLazy,module,exports){













function serialize(obj){
var kv_pairs=[];
var componentsObject=require("flattenPHPQueryData")(obj);

for(var component in componentsObject){
if(Object.prototype.hasOwnProperty.call(componentsObject,component)){
var key=encodeComponent(component);
if(componentsObject[component]===undefined){
kv_pairs.push(key);
}else{
kv_pairs.push(
key+'='+encodeComponent(String(componentsObject[component])));

}
}
}

return kv_pairs.join('&');
}










function encodeComponent(raw){
return encodeURIComponent(raw).
replace(/%5D/g,']').
replace(/%5B/g,'[');
}




var ARRAY_QUERY_PATTERN=/^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

function replaceBadKeys(key){
if(key==='hasOwnProperty'||key==='__proto__'){





return'\ud83d\udf56';
}
return key;
}







function deserialize(query){
if(!query){
return{};
}

var result={};


var queryAsString=query.replace(/%5B/gi,'[').replace(/%5D/gi,']');

var queryAsArray=queryAsString.split('&');

var hasOwnProp=Object.prototype.hasOwnProperty;

for(var ii=0,length=queryAsArray.length;ii<length;ii++){
var match=queryAsArray[ii].match(ARRAY_QUERY_PATTERN);

if(!match){
var splitIndex=ES(queryAsArray[ii],"indexOf",true,'=');
if(splitIndex===-1){
result[decodeComponent(queryAsArray[ii])]=null;
}else{
var key=queryAsArray[ii].substring(0,splitIndex);
var value=queryAsArray[ii].substring(splitIndex+1);
result[decodeComponent(key)]=decodeComponent(value);
}
}else{
var indices=match[2].split(/\]\[|\[|\]/).slice(0,-1);
var name=match[1];
var _value=decodeComponent(match[3]||'');
indices[0]=name;



var resultNode=result;
for(var i=0;i<indices.length-1;i++){
var _key=replaceBadKeys(indices[i]);
if(_key){
if(!hasOwnProp.call(resultNode,_key)){
var nv=
indices[i+1]&&!indices[i+1].match(/^\d{1,3}$/)?{}:[];
resultNode[_key]=nv;
if(resultNode[_key]!==nv){




return result;
}
}

resultNode=resultNode[_key];
}else{
if(indices[i+1]&&!indices[i+1].match(/^\d{1,3}$/)){
resultNode.push({});
}else{
resultNode.push([]);
}
resultNode=resultNode[resultNode.length-1];
}
}

if(resultNode instanceof Array&&indices[indices.length-1]===''){
resultNode.push(_value);
}else{
resultNode[replaceBadKeys(indices[indices.length-1])]=_value;
}
}
}
return result;
}










function decodeComponent(encoded_s){
try{
return decodeURIComponent(encoded_s.replace(/\+/g,' '));
}catch(_unused){
if(__DEV__){
console.error('Bad UTF8 in URL: ',encoded_s);
}
return encoded_s;
}
}

var PHPQuerySerializer={
serialize:serialize,
encodeComponent:encodeComponent,
deserialize:deserialize,
decodeComponent:decodeComponent};


module.exports=PHPQuerySerializer;},null);
                                                                                               __d("PHPQuerySerializerNoEncoding",["PHPQuerySerializer","flattenPHPQueryData"],(function $module_PHPQuerySerializerNoEncoding(global,require,requireDynamic,requireLazy,module,exports){var c_PHPQuerySerializer;















function serialize(obj){
var kv_pairs=[];
var componentsObject=require("flattenPHPQueryData")(obj);

for(var component in componentsObject){
if(Object.prototype.hasOwnProperty.call(componentsObject,component)){
var key=encodeComponent(component);
if(componentsObject[component]===undefined){
kv_pairs.push(key);
}else{
kv_pairs.push(
key+'='+encodeComponent(String(componentsObject[component])));

}
}
}

return kv_pairs.join('&');
}







function encodeComponent(raw){
return raw;
}

var PHPQuerySerializerNoEncoding={
serialize:serialize,
encodeComponent:encodeComponent,
deserialize:(c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer"))).deserialize,
decodeComponent:c_PHPQuerySerializer.decodeComponent};


module.exports=PHPQuerySerializerNoEncoding;}),null);
                                                                                                        __d("URIRFC3986",[],function $module_URIRFC3986(global,require,requireDynamic,requireLazy,module,exports){



var PARSE_PATTERN=new RegExp(
'^'+
'([^:/?#]+:)?'+
'(//'+
'([^\\\\/?#@]*@)?'+
'('+
'\\[[A-Fa-f0-9:.]+\\]|'+
'[^\\/?#:]*'+
')'+
'(:[0-9]*)?'+
')?'+
'([^?#]*)'+
'(\\?[^#]*)?'+
'(#.*)?');






















var URIRFC3986={




parse:function parse(uriString){
if(ES(uriString,"trim",true)===''){
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
}};


module.exports=URIRFC3986;},null);
                                                                                         __d("createObjectFrom",[],function $module_createObjectFrom(global,require,requireDynamic,requireLazy,module,exports){























function createObjectFrom(
keys,
values)
{
if(__DEV__){
if(!ES("Array","isArray",false,keys)){
throw new TypeError('Must pass an array of keys.');
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
}

module.exports=createObjectFrom;},null);
                                                                                                        __d("URISchemes",["createObjectFrom"],function $module_URISchemes(global,require,requireDynamic,requireLazy,module,exports){



var defaultSchemes=require("createObjectFrom")([
'blob',
'cmms',
'fb',
'fba',
'fbatwork',
'fb-ama',
'fb-workchat',
'fb-workchat-secure',
'fb-messenger',
'fb-messenger-public',
'fb-messenger-group-thread',
'fb-page-messages',
'fb-pma',
'fbcf',
'fbconnect',
'fbinternal',
'fbmobilehome',
'fbrpc',
'file',
'ftp',
'gtalk',
'http',
'https',
'mailto',
'wss',
'ms-app',
'intent',
'itms',
'itms-apps',
'lasso',
'market',
'svn+ssh',
'fbstaging',
'tel',
'sms',
'pebblejs',
'sftp',
'whatsapp',
'moments',
'flash',
'fblite',
'chrome-extension',
'webcal',
'fb124024574287414',
'fb124024574287414rc',
'fb124024574287414master',
'fb1576585912599779',
'fb929757330408142',
'designpack',
'fbpixelcloud',
'fbapi20130214',
'fb1196383223757595',
'oculus',
'oculus.store',
'oculus.feed',
'skype',
'callto',
'workchat',
'fb236786383180508',
'fb1775440806014337',
'data',
'fb-mk',
'munki',
'kirigami',
'origami-file',
'fb-nimble-vrsrecorder',
'fb-nimble-monohandtrackingvis',
'together']);


var URISchemes={




isAllowed:function isAllowed(schema){
if(schema==null||schema===''){
return true;
}
return Object.prototype.hasOwnProperty.call(defaultSchemes,schema.toLowerCase());
}};


module.exports=URISchemes;},null);
                                                                                                              __d("isInternalFBURI",[],function $module_isInternalFBURI(global,require,requireDynamic,requireLazy,module,exports){




var internalFBURIRegex=new RegExp('(^|\\.)internalfb\\.com$','i');





function isInternalFBURI(uri){
return internalFBURIRegex.test(uri.getDomain());
}

module.exports=isInternalFBURI;},null);
                                                                                         __d("setHostSubdomain",[],(function $module_setHostSubdomain(global,require,requireDynamic,requireLazy,module,exports){

function setHostSubdomain(domain,subdomain){
var pieces=domain.split('.');
if(pieces.length<3){
pieces.unshift(subdomain);
}else{
pieces[0]=subdomain;
}
return pieces.join('.');
}

module.exports=setHostSubdomain;}),null);
                                                                                  __d("URIBase",["invariant","PHPQuerySerializerNoEncoding","UriNeedRawQuerySVChecker","URIRFC3986","URISchemes","ex","isInternalFBURI","setHostSubdomain"],function $module_URIBase(global,require,requireDynamic,requireLazy,module,exports,invariant){var c_URIRFC3986;var c_URISchemes;














var UNSAFE_DOMAIN_PATTERN=new RegExp(


'[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f'+

'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF'+

'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]');



var SECURITY_PATTERN=new RegExp(

'^(?:[^/]*:|'+

'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');






















function parse(
uri,
uriToParse,
shouldThrow,
serializer)
{
if(!uriToParse){
return true;
}


if(uriToParse instanceof URIBase){
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
uri.setProtocol(components.scheme||'');
if(!shouldThrow&&UNSAFE_DOMAIN_PATTERN.test(components.host||'')){
return false;
}
uri.setDomain(components.host||'');
uri.setPort(components.port||'');
uri.setPath(components.path||'');
if(shouldThrow){
uri.setQueryData(serializer.deserialize(components.query||'')||{});
}else{
try{
uri.setQueryData(serializer.deserialize(components.query||'')||{});
}catch(_unused){
return false;
}
}
uri.setFragment(components.fragment||'');


if(components.fragment===''){
uri.setForceFragmentSeparator(true);
}
uri.setIsGeneric(components.isGenericURI||false);
uri.setOriginalRawQuery(components.query);
uri.setQueryParamModified(false);
if(components.userinfo!==null){
if(shouldThrow){
throw new Error(
require("ex")(
'URI.parse: invalid URI (userinfo is not allowed in a URI): %s',
uriToParse));


}else{
return false;
}
}



if(!uri.getDomain()&&ES(uri.getPath(),"indexOf",true,'\\')!==-1){
if(shouldThrow){
throw new Error(
require("ex")(
'URI.parse: invalid URI (no domain but multiple back-slashes): %s',
uriToParse));


}else{
return false;
}
}



if(!uri.getProtocol()&&SECURITY_PATTERN.test(uriToParse)){
if(shouldThrow){
throw new Error(
require("ex")(
'URI.parse: invalid URI (unsafe protocol-relative URLs): %s',
uriToParse));


}else{
return false;
}
}





if(uri.getDomain()&&uri.getPath()&&!ES(uri.getPath(),"startsWith",true,'/')){
if(shouldThrow){
throw new Error(
require("ex")(
'URI.parse: invalid URI (domain and path where path lacks leading slash): %s',
uriToParse));


}else{
return false;
}
}

return true;
}




var uriFilters=[];var

























URIBase=function(){"use strict";URIBase.































tryParse=function tryParse(uri,serializer){
var result=new URIBase(null,serializer);
return parse(result,uri,false,serializer)?result:null;
};URIBase.











isValid=function isValid(uri,serializer){
return!!URIBase.tryParse(uri,serializer);
};




function URIBase(uri,serializer){
serializer||invariant(0,'no serializer set');
this.$URIBase_serializer=serializer;

this.$URIBase_protocol='';
this.$URIBase_domain='';
this.$URIBase_port='';
this.$URIBase_path='';
this.$URIBase_fragment='';
this.$URIBase_isGeneric=false;
this.$URIBase_queryData={};
this.$URIBase_forceFragmentSeparator=false;
parse(this,uri,true,serializer);
this.$URIBase_isQueryParamModified=false;
}var _proto=URIBase.prototype;_proto.




setProtocol=function setProtocol(protocol){
if(!(c_URISchemes||(c_URISchemes=require("URISchemes"))).isAllowed(protocol)){
false||invariant(0,'"%s" is not a valid protocol for a URI.',protocol);
}
this.$URIBase_protocol=protocol;
return this;
};_proto.




getProtocol=function getProtocol(){
return(this.$URIBase_protocol||'').toLowerCase();
};_proto.




setSecure=function setSecure(secure){
return this.setProtocol(secure?'https':'http');
};_proto.




isSecure=function isSecure(){
return this.getProtocol()==='https';
};_proto.




setDomain=function setDomain(domain){




if(UNSAFE_DOMAIN_PATTERN.test(domain)){
throw new Error(
require("ex")(
'URI.setDomain: unsafe domain specified: %s for url %s',
domain,
this.toString()));


}

this.$URIBase_domain=domain;
return this;
};_proto.




getDomain=function getDomain(){
return this.$URIBase_domain;
};_proto.




setPort=function setPort(port){
this.$URIBase_port=port;
return this;
};_proto.




getPort=function getPort(){
return this.$URIBase_port;
};_proto.




setPath=function setPath(path){
if(__DEV__){
if(path&&path.charAt(0)!=='/'){
console.warn(
'Path does not begin with a "/" which means this URI '+
'will likely be malformed. Ensure any string passed to .setPath() '+
'leads with "/": path "%s" for uri "%s".',
path,
this.toString());

}
}
this.$URIBase_path=path;
return this;
};_proto.




getPath=function getPath(){
return this.$URIBase_path;
};_proto.







addQueryData=function addQueryData(mapOrKey,value){

if(Object.prototype.toString.call(mapOrKey)==='[object Object]'){
ES("Object","assign",false,this.$URIBase_queryData,mapOrKey);
}else{
this.$URIBase_queryData[mapOrKey]=value;
}
this.$URIBase_isQueryParamModified=true;
return this;
};_proto.





setQueryData=function setQueryData(map){
this.$URIBase_queryData=map;
this.$URIBase_isQueryParamModified=true;
return this;
};_proto.




getQueryData=function getQueryData(){
return this.$URIBase_queryData;
};_proto.





setQueryString=function setQueryString(queryString){
return this.setQueryData(this.$URIBase_serializer.deserialize(queryString));
};_proto.






getQueryString=function getQueryString(preserveQuery){if(preserveQuery===void 0){preserveQuery=false;}
return this.$URIBase_renderQuery(false,preserveQuery);
};_proto.









$URIBase_renderQuery=function $URIBase_renderQuery(
rawQuery,
preserveQuery)
{if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}
if(
!this.$URIBase_isQueryParamModified&&(
preserveQuery||
require("UriNeedRawQuerySVChecker").isDomainNeedRawQuery(this.getDomain())))
{var _this$$URIBase_origin;
return(_this$$URIBase_origin=this.$URIBase_originalRawQuery)!=null?_this$$URIBase_origin:'';
}
return(rawQuery?require("PHPQuerySerializerNoEncoding"):

this.$URIBase_serializer).
serialize(this.getQueryData());
};_proto.




removeQueryData=function removeQueryData(keys){
if(!ES("Array","isArray",false,keys)){
keys=[keys];
}
for(var i=0,length=keys.length;i<length;++i){
delete this.$URIBase_queryData[keys[i]];
}
this.$URIBase_isQueryParamModified=true;
return this;
};_proto.




setFragment=function setFragment(fragment){
this.$URIBase_fragment=fragment;

this.setForceFragmentSeparator(false);
return this;
};_proto.




getFragment=function getFragment(){
return this.$URIBase_fragment;
};_proto.












setForceFragmentSeparator=function setForceFragmentSeparator(shouldForce){
this.$URIBase_forceFragmentSeparator=shouldForce;
return this;
};_proto.





getForceFragmentSeparator=function getForceFragmentSeparator(){
return this.$URIBase_forceFragmentSeparator;
};_proto.

setIsGeneric=function setIsGeneric(isGeneric){
this.$URIBase_isGeneric=isGeneric;
return this;
};_proto.

getIsGeneric=function getIsGeneric(){
return this.$URIBase_isGeneric;
};_proto.

getOriginalRawQuery=function getOriginalRawQuery(){
return this.$URIBase_originalRawQuery;
};_proto.

setOriginalRawQuery=function setOriginalRawQuery(originalRawQuery){
this.$URIBase_originalRawQuery=originalRawQuery;
return this;
};_proto.

setQueryParamModified=function setQueryParamModified(isQueryParamModified){
this.$URIBase_isQueryParamModified=isQueryParamModified;
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




toString=function toString(){
return this.$URIBase_toStringWithFilters(false,false);
};_proto.




toStringRawQuery=function toStringRawQuery(){
return this.$URIBase_toStringWithFilters(true,false);
};_proto.










toStringPreserveQuery=function toStringPreserveQuery(){
return this.$URIBase_toStringWithFilters(false,true);
};_proto.









$URIBase_toStringWithFilters=function $URIBase_toStringWithFilters(
rawQuery,
preserveQuery)
{if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}
var uri=this;
for(var i=0;i<uriFilters.length;i++){
uri=uriFilters[i](uri);
}
return uri.$URIBase_toStringImpl(rawQuery,preserveQuery);
};_proto.










$URIBase_toStringImpl=function $URIBase_toStringImpl(rawQuery,preserveQuery){if(rawQuery===void 0){rawQuery=false;}if(preserveQuery===void 0){preserveQuery=false;}
var str='';
var protocol=this.getProtocol();
if(protocol){
str+=protocol+':'+(this.getIsGeneric()?'':'//');
}
var domain=this.getDomain();
if(domain){
str+=domain;
}
var port=this.getPort();
if(port){
str+=':'+port;
}




var path=this.getPath();
if(path){
str+=path;
}else if(str){
str+='/';
}
var queryStr=this.$URIBase_renderQuery(rawQuery,preserveQuery);
if(queryStr){
str+='?'+queryStr;
}
var fragment=this.getFragment();
if(fragment){
str+='#'+fragment;
}else if(this.getForceFragmentSeparator()){
str+='#';
}
return str;
};URIBase.








registerFilter=function registerFilter(filter){
uriFilters.push(filter);
};_proto.




getOrigin=function getOrigin(){
var port=this.getPort();
return(
this.getProtocol()+'://'+this.getDomain()+(port?':'+port:''));

};_proto.





getQualifiedURIBase=function getQualifiedURIBase(){
return new URIBase(this,this.$URIBase_serializer).qualify();
};_proto.





qualify=function qualify(){
if(!this.getDomain()){
var current=new URIBase(window.location.href,this.$URIBase_serializer);
this.setProtocol(current.getProtocol()).
setDomain(current.getDomain()).
setPort(current.getPort());
}
return this;
};_proto.













setSubdomain=function setSubdomain(subdomain){
var qualified=this.qualify();
var domain=qualified.getDomain();

if(require("isInternalFBURI")(qualified)&&subdomain==='our'){
subdomain='www';
}
return this.setDomain(require("setHostSubdomain")(domain,subdomain));
};_proto.






getSubdomain=function getSubdomain(){
if(!this.getDomain()){
return'';
}

var domains=this.getDomain().split('.');
if(domains.length<=2){
return'';
}else{
return domains[0];
}
};_proto.








isSubdomainOfDomain=function isSubdomainOfDomain(superdomain){
var domain=this.getDomain();
return URIBase.isDomainSubdomainOfDomain(
domain,
superdomain,
this.$URIBase_serializer);

};URIBase.

isDomainSubdomainOfDomain=function isDomainSubdomainOfDomain(
domain,
superdomain,
serializer)
{
if(superdomain===''||domain===''){
return false;
}

if(ES(domain,"endsWith",true,superdomain)){
var domainLen=domain.length;
var superdomainLen=superdomain.length;
var pos=domainLen-superdomainLen-1;

if(domainLen===superdomainLen||domain[pos]==='.'){
var uri=new URIBase(null,serializer);
uri.setDomain(superdomain);
return URIBase.isValid(uri,serializer);
}
}

return false;
};return URIBase;}();


module.exports=URIBase;},null);
                                                                                               __d("UriNeedRawQuerySVChecker",["PHPQuerySerializer","URIBase","UriNeedRawQuerySVConfig"],function $module_UriNeedRawQuerySVChecker(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URIBase;var c_PHPQuerySerializer;






var PROTOCOLS=['http','https'];




function isUriNeedRawQuery(uri){
if(uri==null){
return false;
}
var uriBase=
uri instanceof(c_URIBase||(c_URIBase=require("URIBase")))?uri:(c_URIBase||(c_URIBase=require("URIBase"))).tryParse(uri,c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer")));
if(uriBase==null){
return false;
}

var protocol=uriBase.getProtocol();

if(!ES(PROTOCOLS,"includes",true,protocol)){
return false;
}

return isDomainNeedRawQuery(uriBase.getDomain());
}




function isDomainNeedRawQuery(domain){
return(
domain!=null&&ES(
require("UriNeedRawQuerySVConfig").uris,"some",true,function UriNeedRawQuerySVConfig_uris_some_$0(uriNeedRawQueryDomain){return(
(c_URIBase||(c_URIBase=require("URIBase"))).isDomainSubdomainOfDomain(
domain,
uriNeedRawQueryDomain,c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer"))));}));




}

module.exports={
isUriNeedRawQuery:isUriNeedRawQuery,
isDomainNeedRawQuery:isDomainNeedRawQuery};},null);
                                                                                                              __d("areSameOrigin",[],function $module_areSameOrigin(global,require,requireDynamic,requireLazy,module,exports){










function areSameOrigin(first,second){

if(first.isEmpty()||second.isEmpty()){
return false;
}

if(first.getProtocol()&&first.getProtocol()!=second.getProtocol()){
return false;
}

if(first.getDomain()&&first.getDomain()!=second.getDomain()){
return false;
}

if(
first.getPort()&&
first.getPort().toString()!==second.getPort().toString())
{
return false;
}

return true;
}

module.exports=areSameOrigin;},null);
                                                                                                        __d("memoize",["invariant"],(function $module_memoize(global,require,requireDynamic,requireLazy,module,exports,invariant){









function memoize(f){
var f1=f;
var result;
return function(){

!arguments.length||invariant(0,
'A memoized function cannot be called with arguments');

if(f1){
result=f1();
f1=null;
}
return result;
};
}

module.exports=memoize;}),null);
                                                                                                                    __d("memoizeStringOnly",[],function $module_memoizeStringOnly(global,require,requireDynamic,requireLazy,module,exports){

'use strict';




function memoizeStringOnly(
callback)
{
var cache={};
return function(string){
if(!Object.prototype.hasOwnProperty.call(cache,string)){
cache[string]=callback.call(this,string);
}
return cache[string];
};
}

module.exports=memoizeStringOnly;},null);
                                                                                                              __d("unqualifyURI",[],(function $module_unqualifyURI(global,require,requireDynamic,requireLazy,module,exports){







function unqualifyURI(uri){
return uri.
setProtocol('').
setDomain('').
setPort('');
}

module.exports=unqualifyURI;}),null);
                                                                                                              __d("URI",["Env","PHPQuerySerializer","PHPQuerySerializerNoEncoding","ReloadPage","URIBase","UriNeedRawQuerySVChecker","areSameOrigin","ifRequired","isFacebookURI","memoize","memoizeStringOnly","unqualifyURI","FBLogger"],function $module_URI(global,require,requireDynamic,requireLazy,module,exports){var c_PHPQuerySerializer;var c_Env;var c_URIBase;





















var getURIWithCurrentOrigin=require("memoize")(function memoize_$0(){return new URI(window.location.href);});

function getPageTransitionsIfInitialized(){
return require("ifRequired")("PageTransitions",function ifRequired_$1(PageTransitions){
if(PageTransitions.isInitialized()){
return PageTransitions;
}
});
}var

























URI=function(_URIBase){"use strict";babelHelpers.inheritsLoose(URI,_URIBase);






function URI(uri){var _this;
if(require("UriNeedRawQuerySVChecker").isUriNeedRawQuery(uri)){
_this=_URIBase.call(this,uri,require("PHPQuerySerializerNoEncoding"))||this;
}else{
_this=_URIBase.call(this,uri||'',c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer")))||this;
}return babelHelpers.assertThisInitialized(_this);
}var _proto=URI.prototype;_proto.








setPath=function setPath(path){
this.path=path;
return _URIBase.prototype.setPath.call(this,path);
};_proto.






getPath=function getPath(){
var path=_URIBase.prototype.getPath.call(this);
if(path){
return path.replace(/^\/+/,'/');
}
return path;
};_proto.





setProtocol=function setProtocol(protocol){
this.protocol=protocol;
return _URIBase.prototype.setProtocol.call(this,protocol);
};_proto.





setDomain=function setDomain(domain){
this.domain=domain;
return _URIBase.prototype.setDomain.call(this,domain);
};_proto.





setPort=function setPort(port){
this.port=port;
return _URIBase.prototype.setPort.call(this,port);
};_proto.





setFragment=function setFragment(fragment){
this.fragment=fragment;
return _URIBase.prototype.setFragment.call(this,fragment);
};_proto.




stripTrailingSlash=function stripTrailingSlash(){
this.setPath(this.getPath().replace(/\/$/,''));
return this;
};_proto.





addTrailingSlash=function addTrailingSlash(){
var path=this.getPath();
if(path.length>0&&path[path.length-1]!=='/'){
this.setPath(path+'/');
}
return this;
};_proto.






valueOf=function valueOf(){
return this.toString();
};_proto.






















getRegisteredDomain=function getRegisteredDomain(){
if(!this.getDomain()){
return'';
}

if(!require("isFacebookURI")(this)){
return null;
}

var parts=this.getDomain().split('.');
var index=ES(parts,"indexOf",true,'facebook');
if(index===-1){
index=ES(parts,"indexOf",true,'workplace');
}
return parts.slice(index).join('.');
};_proto.








getUnqualifiedURI=function getUnqualifiedURI(){
return require("unqualifyURI")(new URI(this));
};_proto.







getQualifiedURI=function getQualifiedURI(){
return new URI(this).qualify();
};_proto.













isSameOrigin=function isSameOrigin(asThisURI){
var other=asThisURI;

if(other==null){
other=getURIWithCurrentOrigin();
}else if(!(other instanceof URI)){
other=new URI(other.toString());
}

return require("areSameOrigin")(this,other);
};URI.








go=function go(uri,force,replace){
URI.goURIOnWindow(uri,window,force,replace);
};URI.






goURIOnNewWindow=function goURIOnNewWindow(uri){
URI.goURIOnWindow(uri,window.open('','_blank'),true);
};URI.










goURIOnWindow=function goURIOnWindow(
uri,

w,
force,
replace)
{if(force===void 0){force=false;}if(replace===void 0){replace=false;}

var uriObj=new URI(uri);
var shouldForce=force;
var shouldDispatchToCometRouter=!w||w===window;
if((c_Env||(c_Env=require("Env"))).isCQuick&&require("isFacebookURI")(uriObj)&&shouldDispatchToCometRouter){
var params={};
params.cquick=(c_Env||(c_Env=require("Env"))).iframeKey;
params.ctarget=c_Env.iframeTarget;
params.cquick_token=c_Env.iframeToken;
uriObj.addQueryData(params);
shouldForce=false;
}

var uriString=uriObj.toString();
var wd=w?w:window;
if(!shouldForce&&global.PageTransitions){
global.PageTransitions.go(uriString,replace);
}else if(window.location.href===uriString){
require("ReloadPage").now();
}else if(replace){
wd.location.replace(uriString);
}else{
wd.location.href=uriString;
}
};_proto.








go=function go(force,replace){
URI.go(this,force,replace);
};URI.

tryParseURI=function tryParseURI(uri){
var base=(c_URIBase||(c_URIBase=require("URIBase"))).tryParse(uri,c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer")));
return base?new URI(base):null;
};URI.

isValidURI=function isValidURI(uri){
return(c_URIBase||(c_URIBase=require("URIBase"))).isValid(uri,c_PHPQuerySerializer||(c_PHPQuerySerializer=require("PHPQuerySerializer")));
};URI.














getRequestURI=function getRequestURI(
respectPageTransitions,
suppressWarning)
{if(respectPageTransitions===void 0){respectPageTransitions=true;}if(suppressWarning===void 0){suppressWarning=false;}
if(respectPageTransitions){
var PageTransitions=getPageTransitionsIfInitialized();
if(PageTransitions){
return PageTransitions.getCurrentURI(
!!suppressWarning).
getQualifiedURI();
}
}
return new URI(window.location.href);
};URI.








getMostRecentURI=function getMostRecentURI(){
var PageTransitions=getPageTransitionsIfInitialized();
if(PageTransitions){
return PageTransitions.getMostRecentURI().getQualifiedURI();
}
return new URI(window.location.href);
};URI.











getNextURI=function getNextURI(){




var PageTransitions=getPageTransitionsIfInitialized();
if(PageTransitions){
return PageTransitions.getNextURI().getQualifiedURI();
}
return new URI(window.location.href);
};URI.













encodeComponent=function encodeComponent(raw){
return encodeURIComponent(raw).
replace(/%5D/g,']').
replace(/%5B/g,'[');
};URI.













decodeComponent=function decodeComponent(encoded_s){
return decodeURIComponent(encoded_s.replace(/\+/g,' '));
};URI.

normalize=function normalize(uri){
if(uri!=null&&typeof uri==='string'){
return this.normalizeString(uri);
}

return new URI(uri).toString();
};return URI;}(c_URIBase||(c_URIBase=require("URIBase")));URI.

normalizeString=

require("memoizeStringOnly")(function memoizeStringOnly_$0(uri){return(
new URI(uri).toString());});URI.







expression=/(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/;URI.




arrayQueryExpression=/^(\w+)((?:\[\w*\])+)=?(.*)/;


if(__DEV__){
if(typeof Object.defineProperty==='function'){
var proto=URI.prototype;
var props=['path','protocol','domain','port','fragment'];
ES(props,"forEach",true,function props_forEach_$0(prop){

var privateProp='_URI_'+prop;
var capitalized=prop.charAt(0).toUpperCase()+prop.slice(1);
Object.defineProperty(proto,prop,{
get:function get(){
require("FBLogger")('uri').warn(
'URI: Do not access the '+
prop+
' property directly. '+
'Use get'+
capitalized+
'() instead.');

return this[privateProp];
},
set:function set(newValue){
this[privateProp]=newValue;
}});

});
}
}

module.exports=URI;},null);
                                                                                                                                                                                                                 __d("isCometAltpayJsSdkIframeAllowedDomain",["CometAltpayJsSdkIframeAllowedDomains","URI"],function $module_isCometAltpayJsSdkIframeAllowedDomain(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;

var CometAltpayJsSdkIframeAllowedDomains=ES("Object","freeze",false,
require('CometAltpayJsSdkIframeAllowedDomains'));

var allowedDomains=ES("Object","freeze",false,
CometAltpayJsSdkIframeAllowedDomains.allowed_domains);



var isCometAltpayJsSdkIframeAllowedDomain=function isCometAltpayJsSdkIframeAllowedDomain(){
var originURI=new(c_URI||(c_URI=require("URI")))(window.location.href);
if(allowedDomains==null||allowedDomains.length<=0){
return false;
}
var isSameOriginAsAllowedDomain=ES(allowedDomains,"some",true,function allowedDomains_some_$0(allowedDomain){
var allowedDomainURI=new(c_URI||(c_URI=require("URI")))(allowedDomain);
if(allowedDomainURI==null){
return false;
}
return originURI.isSameOrigin(allowedDomainURI);
});
if(isSameOriginAsAllowedDomain){
return true;
}
return false;
};

module.exports=isCometAltpayJsSdkIframeAllowedDomain;},null);
                                                                                               __d("ReloadPage",["BlueCompatRouter","Env"],function $module_ReloadPage(global,require,requireDynamic,requireLazy,module,exports){var c_Env;







var ReloadPage={

now:function now(forcedReload){
if(!(c_Env||(c_Env=require("Env"))).isCQuick){
global.window.location.reload(forcedReload);
}else{
require("BlueCompatRouter").sendMessage({
compatAction:'reload'});

}
},

delay:function delay(timeout){
global.setTimeout(ES(this.now,"bind",true,this),timeout);
}};


module.exports=ReloadPage;},null);
                                                                                         __d("requireWeak",[],(function $module_requireWeak(global,require,requireDynamic,requireLazy,module,exports){




















function requireWeak(module,fn){
requireLazy&&requireLazy.call(null,[module],fn);
}

module.exports=requireWeak;}),null);
                                                                                         __d("gkx",["invariant","emptyFunction","requireWeak"],(function $module_gkx(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';














var _map={};
var _logged={};

function gkx(identifier){
var serverDatum=_map[identifier];

serverDatum!=null||invariant(0,



'gkx'+'(...): Unknown GK value "%s"',
identifier);


if(!_logged[identifier]){
_logged[identifier]=true;
require("requireWeak")('Banzai',function requireWeak_$1(Banzai){return(
Banzai.post('gk2_exposure',{identifier:identifier,hash:serverDatum.hash}));});

}
return serverDatum.result;
}

















gkx.oculus=function(identifier){
throw new Error('gkx: Unexpected gkx.oculus call.');
};

gkx.work_company=function(identifier){
throw new Error('gkx: Unexpected gkx.work_company call.');
};

gkx.session=function(identifier){
throw new Error('gkx: Unexpected gkx.session call.');
};

gkx.fb_loggedout=function(identifier){
throw new Error('gkx: Unexpected gkx.fb_loggedout call.');
};

gkx.candidate_portal=function(identifier){
throw new Error('gkx: Unexpected gkx.candidate_portal call.');
};

gkx.add=function(newMap){
for(var k in newMap){
if(!(k in _map)){
_map[k]=newMap[k];
}
}
};

var noOp=require("emptyFunction");
if(__DEV__){
noOp=function noOp(_name){return(
console.error('GK Override is not allowed in production.'));};
}

gkx.getGKs=function(){
if(__DEV__){
var result={};


Object.keys(_map).forEach(function forEach_$0(key){
result[key.split(':')[1]]=_map[key];
});
return result;
}
return null;
};



















gkx.setPass=noOp;
gkx.setFail=noOp;

module.exports=gkx;}),null);
                                                                                                 __d("XControllerURIBuilder",["invariant","URI","gkx","isInternalFBURI"],(function $module_XControllerURIBuilder(global,require,requireDynamic,requireLazy,module,exports,invariant){var c_URI;var







XControllerURIBuilder=function(){"use strict";




function XControllerURIBuilder(path,paramDefinitions){this.$XControllerURIBuilder_params={};
this.$XControllerURIBuilder_path=path;
this.$XControllerURIBuilder_paramDefinitions=paramDefinitions;
}var _proto=XControllerURIBuilder.prototype;_proto.










setInt=function setInt(param,value){
return this.__setParam(param,'Int',value);
};_proto.






setFBID=function setFBID(param,value){
return this.__setParam(param,'FBID',value);
};_proto.






setFloat=function setFloat(param,value){
return this.__setParam(param,'Float',value);
};_proto.






setString=function setString(param,value){
return this.__setParam(param,'String',value);
};_proto.








setExists=function setExists(param,value){
if(value===false){
value=undefined;
}
return this.__setParam(param,'Exists',value);
};_proto.






setBool=function setBool(param,value){
return this.__setParam(param,'Bool',value);
};_proto.






setEnum=function setEnum(param,value){
return this.__setParam(param,'Enum',value);
};_proto.









setPath=function setPath(param,value){
return this.__setParam(param,'Path',value);
};_proto.










setIntVector=function setIntVector(
param,
value)
{
return this.__setParam(param,'IntVector',value);
};_proto.






setIntKeyset=function setIntKeyset(
param,
value)
{
return this.__setParam(param,'IntKeyset',value);
};_proto.






setIntSet=function setIntSet(
param,
value)
{
return this.__setParam(param,'IntSet',value.join(','));
};_proto.






setFloatVector=function setFloatVector(
param,
value)
{
return this.__setParam(param,'FloatVector',value);
};_proto.






setFloatSet=function setFloatSet(
param,
value)
{
return this.__setParam(param,'FloatSet',value.join(','));
};_proto.






setStringVector=function setStringVector(
param,
value)
{
return this.__setParam(param,'StringVector',value);
};_proto.






setStringKeyset=function setStringKeyset(
param,
value)
{
return this.__setParam(param,'StringKeyset',value);
};_proto.






setStringSet=function setStringSet(
param,
value)
{
return this.__setParam(param,'StringSet',value);
};_proto.






setFBIDVector=function setFBIDVector(
param,
value)
{
return this.__setParam(param,'FBIDVector',value);
};_proto.






setFBIDSet=function setFBIDSet(
param,
value)
{
return this.__setParam(param,'FBIDSet',value);
};_proto.






setFBIDKeyset=function setFBIDKeyset(
param,
value)
{
return this.__setParam(param,'FBIDKeyset',value);
};_proto.






setEnumVector=function setEnumVector(
param,
value)
{
return this.__setParam(param,'EnumVector',value);
};_proto.






setEnumSet=function setEnumSet(
param,
value)
{
return this.__setParam(param,'EnumSet',value);
};_proto.






setEnumKeyset=function setEnumKeyset(
param,
value)
{
return this.__setParam(param,'EnumKeyset',value);
};_proto.








setIntToIntMap=function setIntToIntMap(param,value){
return this.__setParam(param,'IntToIntMap',value);
};_proto.






setIntToFloatMap=function setIntToFloatMap(param,value){
return this.__setParam(param,'IntToFloatMap',value);
};_proto.






setIntToStringMap=function setIntToStringMap(param,value){
return this.__setParam(param,'IntToStringMap',value);
};_proto.






setIntToBoolMap=function setIntToBoolMap(param,value){
return this.__setParam(param,'IntToBoolMap',value);
};_proto.








setStringToIntMap=function setStringToIntMap(param,value){
return this.__setParam(param,'StringToIntMap',value);
};_proto.






setStringToFloatMap=function setStringToFloatMap(param,value){
return this.__setParam(param,'StringToFloatMap',value);
};_proto.






setStringToStringMap=function setStringToStringMap(param,value){
return this.__setParam(param,'StringToStringMap',value);
};_proto.






setStringToNullableStringMap=function setStringToNullableStringMap(
param,
value)
{
return this.__setParam(param,'StringToNullableStringMap',value);
};_proto.






setStringToBoolMap=function setStringToBoolMap(param,value){
return this.__setParam(param,'StringToBoolMap',value);
};_proto.






setStringToEnumMap=function setStringToEnumMap(param,value){
return this.__setParam(param,'StringToEnumMap',value);
};_proto.






setEnumToStringVectorMap=function setEnumToStringVectorMap(
param,
value)
{
return this.__setParam(param,'EnumToStringVectorMap',value);
};_proto.






setEnumToBoolMap=function setEnumToBoolMap(param,value){
return this.__setParam(param,'EnumToBoolMap',value);
};_proto.






setEnumToIntMap=function setEnumToIntMap(param,value){
return this.__setParam(param,'EnumToIntMap',value);
};_proto.






setEnumToFBIDVectorMap=function setEnumToFBIDVectorMap(param,value){
return this.__setParam(param,'EnumToFBIDVectorMap',value);
};_proto.







setStringToIntDict=function setStringToIntDict(param,value){
return this.__setParam(param,'StringToIntDict',value);
};_proto.






setStringToNullableIntDict=function setStringToNullableIntDict(
param,
value)
{
return this.__setParam(param,'StringToNullableIntDict',value);
};_proto.






setStringToFloatDict=function setStringToFloatDict(param,value){
return this.__setParam(param,'StringToFloatDict',value);
};_proto.






setStringToNullableFloatDict=function setStringToNullableFloatDict(
param,
value)
{
return this.__setParam(param,'StringToNullableFloatDict',value);
};_proto.






setStringToStringDict=function setStringToStringDict(param,value){
return this.__setParam(param,'StringToStringDict',value);
};_proto.






setStringToNullableStringDict=function setStringToNullableStringDict(
param,
value)
{
return this.__setParam(param,'StringToNullableStringDict',value);
};_proto.






setStringToBoolDict=function setStringToBoolDict(param,value){
return this.__setParam(param,'StringToBoolDict',value);
};_proto.






setStringToEnumDict=function setStringToEnumDict(param,value){
return this.__setParam(param,'StringToEnumDict',value);
};_proto.






setEnumToIntDict=function setEnumToIntDict(param,value){
return this.__setParam(param,'EnumToIntDict',value);
};_proto.






setHackType=function setHackType(param,value){
return this.__setParam(param,'HackType',value);
};_proto.






setTypeAssert=function setTypeAssert(param,value){
return this.__setParam(param,'TypeAssert',value);
};_proto.

__validateRequiredParamsExistence=function __validateRequiredParamsExistence(){
for(var paramName in this.$XControllerURIBuilder_paramDefinitions){

!this.$XControllerURIBuilder_paramDefinitions[paramName].required||Object.prototype.hasOwnProperty.call(
this.$XControllerURIBuilder_params,paramName)||invariant(0,
'Missing required parameter: %s',
paramName);

}
};_proto.

setParams=function setParams(params){
for(var param in params){
this.__assertParamExists(param);
var type=this.$XControllerURIBuilder_paramDefinitions[param].type;
this.__setParam(param,type,params[param]);
}
return this;
};_proto.

__assertParamExists=function __assertParamExists(param){

param in this.$XControllerURIBuilder_paramDefinitions||invariant(0,
'Attempting to set invalid param "%s". Make sure the param is defined '+
"in the controller's getParamDefinition() method."+
'Parameters need to be defined as GET or GET/POST to be usable.',
param);

};_proto.

__setParam=function __setParam(param,type,value){
this.__assertParamExists(param);
var actualType=this.$XControllerURIBuilder_paramDefinitions[param].type;

actualType===type||invariant(0,
'Attempting to set param "%s" as %s, but it is defined in the '+
"controller's getParamDefinition() method as %s.",
param,
type,
actualType);

this.__setParamInt(param,value);
return this;
};_proto.

__setParamInt=function __setParamInt(param,value){
this.$XControllerURIBuilder_params[param]=value;
};_proto.





getRequest_LEGACY_UNTYPED=function getRequest_LEGACY_UNTYPED(asyncRequest){
return(
asyncRequest.


setReplaceTransportMarkers().
setURI(this.getURI()));

};_proto.

getURI=function getURI(){


this.__validateRequiredParamsExistence();


var used_params={};
var path='';
var tokenRegex=/^(.*)?\{(\?)?(\*)?(.+?)\}(.*)?$/;
var pathParts=this.$XControllerURIBuilder_path.split('/');
var followingOptionalTokensAreAmbiguous=false;
for(var idx=0;idx<pathParts.length;idx++){
var part=pathParts[idx];
if(part===''){
continue;
}
var tokenMatches=tokenRegex.exec(part);
if(!tokenMatches){

path+='/'+part;
}else{

var optional=tokenMatches[2]==='?';
var token=tokenMatches[4];
var param=this.$XControllerURIBuilder_paramDefinitions[token];

param||invariant(0,
'Found unknown token "%s" in path "%s". Ensure it is defined '+
'in getParamDefinition().',
token,
this.$XControllerURIBuilder_path);



if(optional&&followingOptionalTokensAreAmbiguous){
continue;
}


if(this.$XControllerURIBuilder_params[token]==null&&optional){

followingOptionalTokensAreAmbiguous=true;
continue;
}

this.$XControllerURIBuilder_params[token]!=null||invariant(0,
'Missing required template parameter: %s',
token);

var prefix=tokenMatches[1]?tokenMatches[1]:'';
var suffix=tokenMatches[5]?tokenMatches[5]:'';
path+='/'+prefix+this.$XControllerURIBuilder_params[token]+suffix;
used_params[token]=true;
}
}


if(this.$XControllerURIBuilder_path.slice(-1)==='/'){
path+='/';
}


if(path===''){
path='/';
}


var uri=new(c_URI||(c_URI=require("URI")))(path);
for(var _param in this.$XControllerURIBuilder_params){
var value=this.$XControllerURIBuilder_params[_param];


if(!used_params[_param]&&value!=null){
var p=this.$XControllerURIBuilder_paramDefinitions[_param];
uri.addQueryData(_param,p&&p.type==='Exists'?null:value);
}
}
return uri;
};_proto.

getLookasideURI=function getLookasideURI(){
var domain='origincache.facebook.com';
if(require("isInternalFBURI")((c_URI||(c_URI=require("URI"))).getRequestURI())){
domain='lookaside.internalfb.com';
}else{
if(require("gkx")("996940")){
domain='lookaside.internmc.facebook.com';
}
}
return this.getURI().
setDomain(domain).
setProtocol('https');
};XControllerURIBuilder.

create=function create(
path,
paramDefinitions)
{
return function(){return new XControllerURIBuilder(path,paramDefinitions);};
};return XControllerURIBuilder;}();




XControllerURIBuilder.prototype.getRequest=function(
asyncRequest)
{
return this.getRequest_LEGACY_UNTYPED(asyncRequest);
};

module.exports=XControllerURIBuilder;}),null);
                                                                                                 __d("XRequest",["invariant"],(function $module_XRequest(global,require,requireDynamic,requireLazy,module,exports,invariant){





var coerce=function coerce(type,oldValue,enumType){
var newValue;
switch(type){
case'Bool':

newValue=
oldValue&&oldValue!=='false'&&oldValue!=='0'||false;
break;
case'Int':
newValue=oldValue.toString();

/-?\d+/.test(newValue)||invariant(0,
'XRequest: Invalid "Int": %s',
oldValue);

break;
case'Float':




newValue=parseFloat(oldValue,10);
!isNaN(newValue)||invariant(0,'XRequest: Invalid "Float": %s',oldValue);
break;
case'FBID':
newValue=oldValue.toString();
for(var ii=0;ii<newValue.length;++ii){
var charCode=newValue.charCodeAt(ii);

48<=charCode&&charCode<=57||invariant(0,
'XRequest: Invalid "FBID": %s',
oldValue);

}
break;
case'String':
newValue=oldValue.toString();
break;
case'Enum':

if(enumType===0){
newValue=coerce('Int',oldValue,null);
}else if(enumType===1){
newValue=coerce('String',oldValue,null);
}else if(enumType===2){
newValue=oldValue;
}else{
false||invariant(0,'XRequest: Invalid EnumType: %s',enumType);
}
break;
default:
var nullableType,vectorType,setType,mapType;

if(nullableType=/^Nullable(\w+)$/.exec(type)){
if(oldValue===null){
newValue=null;
}else{
newValue=coerce(nullableType[1],oldValue,enumType);
}
}else if(vectorType=/^(\w+)Vector$/.exec(type)){
if(!Array.isArray(oldValue)){
newValue=oldValue.toString();
newValue=newValue===''?[]:newValue.split(',');
}else{
newValue=oldValue;
}
var memberType=vectorType[1];

typeof memberType==='string'||invariant(0,
'XRequest: Satisfying Flow Type Checks');

newValue=newValue.map(function newValue_map_$0(item){return(
coerce(memberType,item,enumType&&enumType.member));});

}else if(setType=/^(\w+)(Set|Keyset)$/.exec(type)){
if(!Array.isArray(oldValue)){
newValue=oldValue.toString();
newValue=newValue===''?[]:newValue.split(',');
}else{
newValue=oldValue;
}

newValue=newValue.reduce(function newValue_reduce_$0(seen,item){
seen[item]=item;
return seen;
},{});

memberType=setType[1];

typeof memberType==='string'||invariant(0,
'XRequest: Satisfying Flow Type Checks');


newValue=Object.keys(newValue).map(function map_$0(key){return(
coerce(memberType,newValue[key],enumType&&enumType.member));});

}else if(mapType=/^(\w+)To(\w+)Map$/.exec(type)){
newValue={};
var keyType=mapType[1];
var valueType=mapType[2];

typeof keyType==='string'&&typeof valueType==='string'||invariant(0,
'XRequest: Satisfying Flow Type Checks');

Object.keys(oldValue).forEach(function forEach_$0(key){
newValue[coerce(keyType,key,enumType&&enumType.key)]=coerce(
valueType,
oldValue[key],
enumType&&enumType.value);

});
}else{
false||invariant(0,'XRequest: Unknown Type "%s"',type);
}}

return newValue;
};var

XRequest=function(){"use strict";



function XRequest(pathTemplate,paramDefinitions,uri){
this.$XRequest_paramDefinitions=paramDefinitions;
this.$XRequest_queryData=babelHelpers["extends"]({},uri.getQueryData());

var referenceParts=pathTemplate.split('/').filter(function filter_$0(part){return part;});
var actualParts=uri.
getPath().
split('/').
filter(function filter_$0(part){return part;});
for(var index=0;index<referenceParts.length;++index){
var pattern=/^\{(\?)?(\*)?(\w+)\}$/.exec(referenceParts[index]);
if(!pattern){

referenceParts[index]===actualParts[index]||invariant(0,
'XRequest: Invalid URI path: %s',
uri.getPath());

continue;
}
var optional=!!pattern[1];
var catchall=!!pattern[2];

!catchall||index===referenceParts.length-1||invariant(0,
'XRequest: Catch-all parameter "%s" was not the last parameter.',
name);


var name=pattern[3];
Object.prototype.hasOwnProperty.call(
this.$XRequest_paramDefinitions,name)||invariant(0,
'XRequest: Unknown parameter "%s" in URI path.',
name);


if(this.$XRequest_paramDefinitions[name].required){

!optional||invariant(0,
'XRequest: According to the param definition, `%s` is required but '+
'that is not what is indicated in the path.',
name);

}else{

optional||invariant(0,
'XRequest: According to the param definition, `%s` is optional but '+
'that is not what is indicated in the path.',
name);

}

if(actualParts[index]){
this.$XRequest_queryData[name]=catchall?
actualParts.slice(index).join('/'):
actualParts[index];
}
}

Object.keys(this.$XRequest_paramDefinitions).forEach(function forEach_$0(name){


!this.$XRequest_paramDefinitions[name].required||Object.prototype.hasOwnProperty.call(
this.$XRequest_queryData,name)||invariant(0,
'XRequest: Missing value for non-optional parameter.');

},this);
}var _proto=XRequest.prototype;_proto.

getExists=function getExists(name){
return this.$XRequest_queryData[name]!==undefined;
};_proto.



getBool=function getBool(name){
return this.$XRequest_getParam(name,'Bool');
};_proto.
getInt=function getInt(name){
return this.$XRequest_getParam(name,'Int');
};_proto.
getFloat=function getFloat(name){
return this.$XRequest_getParam(name,'Float');
};_proto.
getFBID=function getFBID(name){
return this.$XRequest_getParam(name,'FBID');
};_proto.
getString=function getString(name){
return this.$XRequest_getParam(name,'String');
};_proto.
getEnum=function getEnum(name){
return this.$XRequest_getParam(name,'Enum');
};_proto.



getOptionalInt=function getOptionalInt(name){
return this.$XRequest_getOptionalParam(name,'Int');
};_proto.
getOptionalFloat=function getOptionalFloat(name){
return this.$XRequest_getOptionalParam(name,'Float');
};_proto.
getOptionalFBID=function getOptionalFBID(name){
return this.$XRequest_getOptionalParam(name,'FBID');
};_proto.
getOptionalString=function getOptionalString(name){
return this.$XRequest_getOptionalParam(name,'String');
};_proto.
getOptionalEnum=function getOptionalEnum(name){
return this.$XRequest_getOptionalParam(name,'Enum');
};_proto.



getIntVector=function getIntVector(name){
return this.$XRequest_getParam(name,'IntVector');
};_proto.
getFloatVector=function getFloatVector(name){
return this.$XRequest_getParam(name,'FloatVector');
};_proto.
getFBIDVector=function getFBIDVector(name){
return this.$XRequest_getParam(name,'FBIDVector');
};_proto.
getStringVector=function getStringVector(name){
return this.$XRequest_getParam(name,'StringVector');
};_proto.
getEnumVector=function getEnumVector(name){
return this.$XRequest_getParam(name,'EnumVector');
};_proto.



getOptionalIntVector=function getOptionalIntVector(name){
return this.$XRequest_getOptionalParam(name,'IntVector');
};_proto.
getOptionalFloatVector=function getOptionalFloatVector(name){
return this.$XRequest_getOptionalParam(name,'FloatVector');
};_proto.
getOptionalFBIDVector=function getOptionalFBIDVector(name){
return this.$XRequest_getOptionalParam(name,'FBIDVector');
};_proto.
getOptionalStringVector=function getOptionalStringVector(name){
return this.$XRequest_getOptionalParam(name,'StringVector');
};_proto.
getOptionalEnumVector=function getOptionalEnumVector(name){
return this.$XRequest_getOptionalParam(name,'EnumVector');
};_proto.



getIntSet=function getIntSet(name){
return this.$XRequest_getParam(name,'IntSet');
};_proto.
getFBIDSet=function getFBIDSet(name){
return this.$XRequest_getParam(name,'FBIDSet');
};_proto.
getFBIDKeyset=function getFBIDKeyset(name){
return this.$XRequest_getParam(name,'FBIDKeyset');
};_proto.
getStringSet=function getStringSet(name){
return this.$XRequest_getParam(name,'StringSet');
};_proto.
getEnumKeyset=function getEnumKeyset(name){
return this.$XRequest_getParam(name,'EnumKeyset');
};_proto.



getOptionalIntSet=function getOptionalIntSet(name){
return this.$XRequest_getOptionalParam(name,'IntSet');
};_proto.
getOptionalFBIDSet=function getOptionalFBIDSet(name){
return this.$XRequest_getOptionalParam(name,'FBIDSet');
};_proto.
getOptionalFBIDKeyset=function getOptionalFBIDKeyset(name){
return this.$XRequest_getOptionalParam(name,'FBIDKeyset');
};_proto.
getOptionalStringSet=function getOptionalStringSet(name){
return this.$XRequest_getOptionalParam(name,'StringSet');
};_proto.



getEnumToBoolMap=function getEnumToBoolMap(name){
return this.$XRequest_getParam(name,'EnumToBoolMap');
};_proto.
getEnumToEnumMap=function getEnumToEnumMap(name){
return this.$XRequest_getParam(name,'EnumToEnumMap');
};_proto.
getEnumToFloatMap=function getEnumToFloatMap(name){
return this.$XRequest_getParam(name,'EnumToFloatMap');
};_proto.
getEnumToIntMap=function getEnumToIntMap(name){
return this.$XRequest_getParam(name,'EnumToIntMap');
};_proto.
getEnumToStringMap=function getEnumToStringMap(name){
return this.$XRequest_getParam(name,'EnumToStringMap');
};_proto.
getIntToBoolMap=function getIntToBoolMap(name){
return this.$XRequest_getParam(name,'IntToBoolMap');
};_proto.
getIntToEnumMap=function getIntToEnumMap(name){
return this.$XRequest_getParam(name,'IntToEnumMap');
};_proto.
getIntToFloatMap=function getIntToFloatMap(name){
return this.$XRequest_getParam(name,'IntToFloatMap');
};_proto.
getIntToIntMap=function getIntToIntMap(name){
return this.$XRequest_getParam(name,'IntToIntMap');
};_proto.
getIntToStringMap=function getIntToStringMap(name){
return this.$XRequest_getParam(name,'IntToStringMap');
};_proto.
getStringToBoolMap=function getStringToBoolMap(name){
return this.$XRequest_getParam(name,'StringToBoolMap');
};_proto.
getStringToEnumMap=function getStringToEnumMap(name){
return this.$XRequest_getParam(name,'StringToEnumMap');
};_proto.
getStringToFloatMap=function getStringToFloatMap(name){
return this.$XRequest_getParam(name,'StringToFloatMap');
};_proto.
getStringToIntMap=function getStringToIntMap(name){
return this.$XRequest_getParam(name,'StringToIntMap');
};_proto.
getStringToStringMap=function getStringToStringMap(name){
return this.$XRequest_getParam(name,'StringToStringMap');
};_proto.



getOptionalEnumToBoolMap=function getOptionalEnumToBoolMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToBoolMap');
};_proto.
getOptionalEnumToEnumMap=function getOptionalEnumToEnumMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToEnumMap');
};_proto.
getOptionalEnumToFloatMap=function getOptionalEnumToFloatMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToFloatMap');
};_proto.
getOptionalEnumToIntMap=function getOptionalEnumToIntMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToIntMap');
};_proto.
getOptionalEnumToStringMap=function getOptionalEnumToStringMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToStringMap');
};_proto.
getOptionalIntToBoolMap=function getOptionalIntToBoolMap(name){
return this.$XRequest_getOptionalParam(name,'IntToBoolMap');
};_proto.
getOptionalIntToEnumMap=function getOptionalIntToEnumMap(name){
return this.$XRequest_getOptionalParam(name,'IntToEnumMap');
};_proto.
getOptionalIntToFloatMap=function getOptionalIntToFloatMap(name){
return this.$XRequest_getOptionalParam(name,'IntToFloatMap');
};_proto.
getOptionalIntToIntMap=function getOptionalIntToIntMap(name){
return this.$XRequest_getOptionalParam(name,'IntToIntMap');
};_proto.
getOptionalIntToStringMap=function getOptionalIntToStringMap(name){
return this.$XRequest_getOptionalParam(name,'IntToStringMap');
};_proto.
getOptionalStringToBoolMap=function getOptionalStringToBoolMap(name){
return this.$XRequest_getOptionalParam(name,'StringToBoolMap');
};_proto.
getOptionalStringToEnumMap=function getOptionalStringToEnumMap(name){
return this.$XRequest_getOptionalParam(name,'StringToEnumMap');
};_proto.
getOptionalStringToFloatMap=function getOptionalStringToFloatMap(name){
return this.$XRequest_getOptionalParam(name,'StringToFloatMap');
};_proto.
getOptionalStringToIntMap=function getOptionalStringToIntMap(name){
return this.$XRequest_getOptionalParam(name,'StringToIntMap');
};_proto.
getOptionalStringToStringMap=function getOptionalStringToStringMap(name){
return this.$XRequest_getOptionalParam(name,'StringToStringMap');
};_proto.



getEnumToNullableEnumMap=function getEnumToNullableEnumMap(name){
return this.$XRequest_getParam(name,'EnumToNullableEnumMap');
};_proto.
getEnumToNullableFloatMap=function getEnumToNullableFloatMap(name){
return this.$XRequest_getParam(name,'EnumToNullableFloatMap');
};_proto.
getEnumToNullableIntMap=function getEnumToNullableIntMap(name){
return this.$XRequest_getParam(name,'EnumToNullableIntMap');
};_proto.
getEnumToNullableStringMap=function getEnumToNullableStringMap(name){
return this.$XRequest_getParam(name,'EnumToNullableStringMap');
};_proto.
getIntToNullableEnumMap=function getIntToNullableEnumMap(name){
return this.$XRequest_getParam(name,'IntToNullableEnumMap');
};_proto.
getIntToNullableFloatMap=function getIntToNullableFloatMap(name){
return this.$XRequest_getParam(name,'IntToNullableFloatMap');
};_proto.
getIntToNullableIntMap=function getIntToNullableIntMap(name){
return this.$XRequest_getParam(name,'IntToNullableIntMap');
};_proto.
getIntToNullableStringMap=function getIntToNullableStringMap(name){
return this.$XRequest_getParam(name,'IntToNullableStringMap');
};_proto.
getStringToNullableEnumMap=function getStringToNullableEnumMap(name){
return this.$XRequest_getParam(name,'StringToNullableEnumMap');
};_proto.
getStringToNullableFloatMap=function getStringToNullableFloatMap(name){
return this.$XRequest_getParam(name,'StringToNullableFloatMap');
};_proto.
getStringToNullableIntMap=function getStringToNullableIntMap(name){
return this.$XRequest_getParam(name,'StringToNullableIntMap');
};_proto.
getStringToNullableStringMap=function getStringToNullableStringMap(name){
return this.$XRequest_getParam(name,'StringToNullableStringMap');
};_proto.



getOptionalEnumToNullableEnumMap=function getOptionalEnumToNullableEnumMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToNullableEnumMap');
};_proto.
getOptionalEnumToNullableFloatMap=function getOptionalEnumToNullableFloatMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToNullableFloatMap');
};_proto.
getOptionalEnumToNullableIntMap=function getOptionalEnumToNullableIntMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToNullableIntMap');
};_proto.
getOptionalEnumToNullableStringMap=function getOptionalEnumToNullableStringMap(name){
return this.$XRequest_getOptionalParam(name,'EnumToNullableStringMap');
};_proto.
getOptionalIntToNullableEnumMap=function getOptionalIntToNullableEnumMap(name){
return this.$XRequest_getOptionalParam(name,'IntToNullableEnumMap');
};_proto.
getOptionalIntToNullableFloatMap=function getOptionalIntToNullableFloatMap(name){
return this.$XRequest_getOptionalParam(name,'IntToNullableFloatMap');
};_proto.
getOptionalIntToNullableIntMap=function getOptionalIntToNullableIntMap(name){
return this.$XRequest_getOptionalParam(name,'IntToNullableIntMap');
};_proto.
getOptionalIntToNullableStringMap=function getOptionalIntToNullableStringMap(name){
return this.$XRequest_getOptionalParam(name,'IntToNullableStringMap');
};_proto.
getOptionalStringToNullableEnumMap=function getOptionalStringToNullableEnumMap(name){
return this.$XRequest_getOptionalParam(name,'StringToNullableEnumMap');
};_proto.
getOptionalStringToNullableFloatMap=function getOptionalStringToNullableFloatMap(name){
return this.$XRequest_getOptionalParam(name,'StringToNullableFloatMap');
};_proto.
getOptionalStringToNullableIntMap=function getOptionalStringToNullableIntMap(name){
return this.$XRequest_getOptionalParam(name,'StringToNullableIntMap');
};_proto.
getOptionalStringToNullableStringMap=function getOptionalStringToNullableStringMap(name){
return this.$XRequest_getOptionalParam(name,'StringToNullableStringMap');
};_proto.

$XRequest_getParam=function $XRequest_getParam(name,type){
this.$XRequest_validateParam(name,type);
var paramDefinition=this.$XRequest_paramDefinitions[name];
if(
!Object.prototype.hasOwnProperty.call(this.$XRequest_queryData,name)&&
paramDefinition.defaultValue!=null)
{

!paramDefinition.required||invariant(0,
'XRequest: Cannot specify default value if parameter is required.');

return coerce(
type,
paramDefinition.defaultValue,
paramDefinition.enumType);

}

paramDefinition.required||
type==='Bool'||
paramDefinition.defaultValue!=null||invariant(0,
'XRequest: Called get%s("%s"), but this param was optional. '+
'Use getOptional%s("%s") instead.',
type,
name,
type,
name);

return coerce(type,this.$XRequest_queryData[name],paramDefinition.enumType);
};_proto.

$XRequest_getOptionalParam=function $XRequest_getOptionalParam(name,type){
this.$XRequest_validateParam(name,type);
var paramDefinition=this.$XRequest_paramDefinitions[name];

!paramDefinition.required||invariant(0,
'XRequest: Called getOptional%s("%s"), but this param was not optional. '+
'Use get%s("%s") instead.',
type,
name,
type,
name);


!paramDefinition.defaultValue||invariant(0,
'XRequest: Cannot specify default value if parameter is required.');

if(Object.prototype.hasOwnProperty.call(this.$XRequest_queryData,name)){
return coerce(type,this.$XRequest_queryData[name],paramDefinition.enumType);
}
return null;
};_proto.

$XRequest_validateParam=function $XRequest_validateParam(name,type){
Object.prototype.hasOwnProperty.call(
this.$XRequest_paramDefinitions,name)||invariant(0,
'Attempting to get invalid param "%s". Make sure the param is '+
"defined in the controller's getParamDefinition() method.",
name);


this.$XRequest_paramDefinitions[name].type===type||invariant(0,
'Attempting to get param "%s" as "%s", but it was defined as "%s".',
name,
type,
this.$XRequest_paramDefinitions[name].type);

};return XRequest;}();


module.exports=XRequest;}),null);
                                                                                                 __d("XController",["XControllerURIBuilder","XRequest"],(function $module_XController(global,require,requireDynamic,requireLazy,module,exports){var



























XController=function(){"use strict";



function XController(path,paramDefinitions){
this.$XController_path=path;
this.$XController_paramDefinitions=paramDefinitions;
}var _proto=XController.prototype;_proto.

getURIBuilder=function getURIBuilder(uri){
var uriBuilder=new(require("XControllerURIBuilder"))(
this.$XController_path,
this.$XController_paramDefinitions);

if(uri){
var request=this.getRequest(uri);
Object.keys(this.$XController_paramDefinitions).forEach(function forEach_$0(name){
var paramDefinition=this.$XController_paramDefinitions[name];
var optional='';
if(
!paramDefinition.required&&
!Object.prototype.hasOwnProperty.call(paramDefinition,'defaultValue'))
{
optional='Optional';
}
var getter='get'+optional+paramDefinition.type;
var value=request[getter](name);
if(
value==null||
Object.prototype.hasOwnProperty.call(paramDefinition,'defaultValue')&&
value===paramDefinition.defaultValue)
{
return;
}
var setter='set'+paramDefinition.type;

uriBuilder[setter](name,value);
},this);
}
return uriBuilder;
};_proto.

getRequest=function getRequest(uri){
return new(require("XRequest"))(this.$XController_path,this.$XController_paramDefinitions,uri);
};XController.

create=function create(path,paramDefinitions){
return new XController(path,paramDefinitions);
};return XController;}();


module.exports=XController;}),null);
                                
__d("XHeartbeatController",["XController"],(function $module_XHeartbeatController(global,require,requireDynamic,requireLazy,module,exports){
module.exports = require("XController").create("\/nw\/", {});

      }),null);
                                                                                               __d("clearTimeout",["requireCond","cr:806696"],(function $module_clearTimeout(global,require,requireDynamic,requireLazy,module,exports){

'use strict';





module.exports=require("cr:806696");}),null);
                                                                                         __d("getSameOriginTransport",["ExecutionEnvironment","ex"],(function $module_getSameOriginTransport(global,require,requireDynamic,requireLazy,module,exports){





function getSameOriginTransport(){
if(!require("ExecutionEnvironment").canUseDOM){
throw new Error(
require("ex")(
'getSameOriginTransport: %s',
'Same origin transport unavailable in the server environment.'));


}

try{
return new global.XMLHttpRequest();
}catch(error){
throw new Error(require("ex")('getSameOriginTransport: %s',error.message));
}
}

module.exports=getSameOriginTransport;}),null);
                                                                                         __d("killswitch",["KSConfig"],(function $module_killswitch(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






























function killswitch(behaviour){
return require("KSConfig").killed.has(behaviour);
}

module.exports=killswitch;}),null);
                                                                                               __d("setTimeout",["requireCond","cr:807042"],(function $module_setTimeout(global,require,requireDynamic,requireLazy,module,exports){







module.exports=require("cr:807042");}),null);
                                                                                                                                                                                                                     __d("NetworkHeartbeat",["XHeartbeatController","clearTimeout","getSameOriginTransport","killswitch","setTimeout"],(function $module_NetworkHeartbeat(global,require,requireDynamic,requireLazy,module,exports){

'use strict';








var HEARTBEAT_URI=require("XHeartbeatController").getURIBuilder().
getURI().
toString();
var MAX_BACKOFF_TIME=1000;
var backOffTime=100;
var heartbeatTimer=null;
var retryCounter=0;
var heartbeatRequest=null;
var heartbeatDisabled=require("killswitch")('DISABLE_HEARTBEAT_POLLING');




function sendHeartbeat(
onSuccessCallback,
onFailureCallback)
{
heartbeatRequest=require("getSameOriginTransport")();
heartbeatRequest.open('GET',HEARTBEAT_URI,true);
heartbeatRequest.onload=function(){
if(heartbeatRequest&&heartbeatRequest.status===204){
heartbeatDisabled=true;
}
heartbeatSuccess(onSuccessCallback);
};
heartbeatRequest.onerror=function(){
heartbeatFailure(onSuccessCallback,onFailureCallback);
};
heartbeatRequest.ontimeout=function(){
heartbeatFailure(onSuccessCallback,onFailureCallback);
};
heartbeatRequest.send();
}

function stopHeartbeat(){
heartbeatRequest=null;
backOffTime=100;
retryCounter=0;
require("clearTimeout")(heartbeatTimer);
}

function heartbeatSuccess(onSuccessCallback){
stopHeartbeat();
onSuccessCallback();
}

function heartbeatFailure(
onSuccessCallback,
onFailureCallback)
{
heartbeatTimer=require("setTimeout")(function setTimeout_$0(){
maybeStartHeartbeat(onSuccessCallback,onFailureCallback,undefined,true);
},backOffTime);
retryCounter++;
var newBackOffTime=backOffTime*Math.pow(2,retryCounter);
if(newBackOffTime<=MAX_BACKOFF_TIME){
backOffTime=newBackOffTime;
}
onFailureCallback();
}





function maybeStartHeartbeat(
onSuccessCallback,
onFailureCallback,
errorReportCallback,


isRetry)
{if(errorReportCallback===void 0){errorReportCallback=function errorReportCallback(){return true;};}if(isRetry===void 0){isRetry=false;}
if(!heartbeatDisabled){
if(isRetry||heartbeatRequest==null&&errorReportCallback()){
sendHeartbeat(onSuccessCallback,onFailureCallback);
}
}
}

function isHeartbeatPending(){
return heartbeatRequest!=null;
}

var NetworkHeartbeat={
isHeartbeatPending:isHeartbeatPending,
maybeStartHeartbeat:maybeStartHeartbeat};


module.exports=NetworkHeartbeat;}),null);
                                                                                                                                                                                                       __d("NetworkStatusImpl",["FBLogger","NetworkHeartbeat","performanceNow"],(function $module_NetworkStatusImpl(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceNow;








var subscribers=[];
var _isOnline=window.navigator.onLine;
var OFFLINE_SUCCESS_ERROR_RATIO=2.0;
var OFFLINE_PERIOD=5000;
var recentErrors=[];
var recentSuccesses=[];
var lastCachedSuccess=0;
var ONLINE=true;
var OFFLINE=false;

var onHeartbeatSuccess=function onHeartbeatSuccess(){
setStatusAndNotify(ONLINE);
};
var onHeartbeatFailure=function onHeartbeatFailure(){
setStatusAndNotify(OFFLINE);
};
function notifySubscribers(){

var subscribersList=subscribers.slice();
subscribersList.forEach(function subscribersList_forEach_$0(callback){
callback({online:_isOnline});
});
}

function removeSubscriber(callback){
var callbackIndex=subscribers.indexOf(callback);
if(callbackIndex>-1){
subscribers.splice(callbackIndex,1);
}
}

function setStatusAndNotify(status){

if(_isOnline!==status&&!require("NetworkHeartbeat").isHeartbeatPending()){
_isOnline=status;
require("FBLogger")('NetworkStatus').warn("Network switched to "+(
status?'online':'offline'));

if(!_isOnline){
require("NetworkHeartbeat").maybeStartHeartbeat(
onHeartbeatSuccess,
onHeartbeatFailure);

}

notifySubscribers();
}
}

function exceededErrorReports(){
var currentTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
recentErrors=recentErrors.filter(function recentErrors_filter_$0(e){return(
newerThanOfflinePeriod(e.startTime,currentTime));});

recentSuccesses=recentSuccesses.filter(function recentSuccesses_filter_$0(e){return(
newerThanOfflinePeriod(e.startTime,currentTime));});

return(
recentSuccesses.length/recentErrors.length<OFFLINE_SUCCESS_ERROR_RATIO);

}

var newerThanOfflinePeriod=function newerThanOfflinePeriod(
startTime,
currentTime)
{
return startTime>currentTime-OFFLINE_PERIOD;
};

var NetworkStatusImpl={
isOnline:function isOnline(){
return _isOnline;
},
onChange:function onChange(callback){
subscribers.push(callback);
var removed=false;
return{
remove:function remove(){
if(!removed){
removed=true;
removeSubscriber(callback);
}
}};

},
reportError:function reportError(){
var currentTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
recentErrors.push({
startTime:currentTime});

require("NetworkHeartbeat").maybeStartHeartbeat(
onHeartbeatSuccess,
onHeartbeatFailure,
exceededErrorReports);

},
reportSuccess:function reportSuccess(){
var currentTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
recentSuccesses.push({
startTime:currentTime});

if(!newerThanOfflinePeriod(lastCachedSuccess,currentTime)){
recentSuccesses=recentSuccesses.filter(function recentSuccesses_filter_$0(e){return(
newerThanOfflinePeriod(e.startTime,currentTime));});

lastCachedSuccess=currentTime;
}
}};


window.addEventListener('online',function window_addEventListener_$1(){
setStatusAndNotify(ONLINE);
});
window.addEventListener('offline',function window_addEventListener_$1(){
setStatusAndNotify(OFFLINE);
});

module.exports=NetworkStatusImpl;}),null);
                                                                                                                                                                                                 __d("NetworkStatusSham",[],(function $module_NetworkStatusSham(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var NetworkStatusSham={
isOnline:function isOnline(){
return true;
},
onChange:function onChange(_callback){
return{
remove:function remove(){}};

},
reportError:function reportError(){
return;
},
reportSuccess:function reportSuccess(){
return;
}};


module.exports=NetworkStatusSham;}),null);
                                                                                                                                                                                                       __d("NetworkStatus",["NetworkStatusImpl","NetworkStatusSham","gkx"],(function $module_NetworkStatus(global,require,requireDynamic,requireLazy,module,exports){

'use strict';















var NetworkStatus=require("gkx")("1263340")?require("NetworkStatusImpl"):require("NetworkStatusSham");



module.exports=NetworkStatus;}),null);
                                                                                         __d("ResourceTypes",[],(function $module_ResourceTypes(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

var ResourceTypes={
JS:'js',
CSS:'css',
XHR:'xhr'};




module.exports=ResourceTypes;}),null);
                                                                                         __d("TimingAnnotations",[],(function $module_TimingAnnotations(global,require,requireDynamic,requireLazy,module,exports){var








EmptyTimingAnnotations=function(){"use strict";function EmptyTimingAnnotations(){}var _proto=EmptyTimingAnnotations.prototype;_proto.
addStringAnnotation=function addStringAnnotation(prop,value){
return this;
};_proto.

addSetAnnotation=function addSetAnnotation(prop,value){
return this;
};_proto.

addSetElement=function addSetElement(prop,value){
return this;
};_proto.

registerOnBeforeSend=function registerOnBeforeSend(callback){
return this;
};_proto.

addVectorAnnotation=function addVectorAnnotation(prop,value){
return this;
};_proto.

addVectorElement=function addVectorElement(prop,value){
return this;
};return EmptyTimingAnnotations;}();var


TimingAnnotations=function(){"use strict";function TimingAnnotations(){this.




$TimingAnnotations_setProps=null;this.
$TimingAnnotations_stringProps=null;this.
$TimingAnnotations_vectorProps=null;this.
$TimingAnnotations_callbacks=[];}var _proto2=TimingAnnotations.prototype;_proto2.

addStringAnnotation=function addStringAnnotation(prop,value){
this.$TimingAnnotations_stringProps=this.$TimingAnnotations_stringProps||new Map();
this.$TimingAnnotations_stringProps.set(prop,value);
return this;
};_proto2.

addSetAnnotation=function addSetAnnotation(prop,values){
var setProps=this.$TimingAnnotations_setProps||new Map();
var set=setProps.get(prop)||new Set();
values.forEach(function values_forEach_$0(val){return set.add(val);});
setProps.set(prop,set);
this.$TimingAnnotations_setProps=setProps;
return this;
};_proto2.

addSetElement=function addSetElement(prop,value){
var setProps=this.$TimingAnnotations_setProps||new Map();
var set=setProps.get(prop)||new Set();
set.add(value);
setProps.set(prop,set);
this.$TimingAnnotations_setProps=setProps;
return this;
};_proto2.



addVectorAnnotation=function addVectorAnnotation(prop,value){
this.$TimingAnnotations_vectorProps=this.$TimingAnnotations_vectorProps||new Map();
this.$TimingAnnotations_vectorProps.set(prop,value);
return this;
};_proto2.

addVectorElement=function addVectorElement(prop,value){
var vectorProps=this.$TimingAnnotations_vectorProps=this.$TimingAnnotations_vectorProps||new Map();
var vector=this.$TimingAnnotations_vectorProps.get(prop)||[];
vector.push(value);
vectorProps.set(prop,vector);
return this;
};_proto2.











registerOnBeforeSend=function registerOnBeforeSend(callback){
this.$TimingAnnotations_callbacks.push(callback);
return this;
};_proto2.

prepareToSend=function prepareToSend(){var _this=this;
this.$TimingAnnotations_callbacks.forEach(function $TimingAnnotations_callbacks_forEach_$0(cb){return cb(_this);});
this.$TimingAnnotations_callbacks=[];
var setProps={};
if(this.$TimingAnnotations_setProps!=null){
for(var _iterator=this.$TimingAnnotations_setProps,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray){if(_i>=_iterator.length)break;_ref2=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref2=_i.value;}var _ref3=_ref2;var key=_ref3[0];var set=_ref3[1];
setProps[key]=Array.from(set.values());
}
}
var stringProps={};
if(this.$TimingAnnotations_stringProps!=null){
for(var _iterator2=this.$TimingAnnotations_stringProps,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref5;if(_isArray2){if(_i2>=_iterator2.length)break;_ref5=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref5=_i2.value;}var _ref6=_ref5;var _key=_ref6[0];var val=_ref6[1];
stringProps[_key]=val;
}
}
var vectorProps={};
if(this.$TimingAnnotations_vectorProps!=null){
for(var _iterator3=this.$TimingAnnotations_vectorProps,_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref8;if(_isArray3){if(_i3>=_iterator3.length)break;_ref8=_iterator3[_i3++];}else{_i3=_iterator3.next();if(_i3.done)break;_ref8=_i3.value;}var _ref9=_ref8;var _key2=_ref9[0];var _val=_ref9[1];
vectorProps[_key2]=_val;
}
}
return{
setProps:setProps,
stringProps:stringProps,
vectorProps:vectorProps};

};TimingAnnotations.

combine=function combine(
first,
second)
{
var annotation;
if(first!=null&&second!=null){
first.stringProps=babelHelpers["extends"]({},

second.stringProps,
first.stringProps);

first.setProps=babelHelpers["extends"]({},
second.setProps,
first.setProps);

annotation=first;
}else if(first!=null){
annotation=first;
}else if(second!=null){
annotation=second;
}
return annotation;
};return TimingAnnotations;}();


TimingAnnotations.EmptyTimingAnnotations=EmptyTimingAnnotations;
TimingAnnotations.EmptyTraceTimingAnnotations=EmptyTimingAnnotations;
TimingAnnotations.TraceTimingAnnotations=TimingAnnotations;



module.exports=TimingAnnotations;}),null);
                                                                                               __d("ResourceTimingsStore",["CircularBuffer","ResourceTypes","TimingAnnotations","URI","performanceAbsoluteNow"],(function $module_ResourceTimingsStore(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;var c_performanceAbsoluteNow;













var MAX_REMEMBERED_PER_RESOURCE_TYPE=1000;
var nullAnnotations=new(require("TimingAnnotations").EmptyTimingAnnotations)();



















var _buffers={};
var _timings=


{};

Object.keys(require("ResourceTypes")).forEach(function forEach_$0(type){
var resource_type=require("ResourceTypes")[type];
var buffer=new(require("CircularBuffer"))(MAX_REMEMBERED_PER_RESOURCE_TYPE);
var map=new Map();
buffer.onEvict(function buffer_onEvict_$0(uid){
map["delete"](uid);
});
_buffers[resource_type]={idx:1,entries:buffer};
_timings[resource_type]=map;
});

function _generateID(
type,
uri,
counter)
{
var uid;
switch(type){
case'css':
case'js':
var result=ResourceTimingsStore.parseMakeHasteURL(uri);
var fileName=result==null?'unknown_resource':result[0];
uid=counter+"_"+fileName;
break;
case'xhr':
var parsedURI=new(c_URI||(c_URI=require("URI")))(uri).getQualifiedURI();
var hostnameAndEndpoint=parsedURI.getDomain()+parsedURI.getPath();
uid=counter+"_"+hostnameAndEndpoint;
break;
default:

type;
uid='never here';}

return uid;
}

var ResourceTimingsStore={








getUID:function getUID(type,uri){
var buffer=_buffers[type];
var uid=_generateID(type,uri,buffer.idx);
buffer.entries.write(uid);
_timings[type].set(uid,{uri:uri,uid:uid});
buffer.idx++;
return uid;
},





updateURI:function updateURI(
type,
assignedUID,
newUri)
{
var info=_timings[type].get(assignedUID);
if(info!=null){
info.uri=newUri;
}
},

getMapFor:function getMapFor(type){
return _timings[type];
},






parseMakeHasteURL:function parseMakeHasteURL(url){

var match=url.match(/\/rsrc\.php\/.*\/([^\?]+)/);
if(!match){
return null;
}
var fileName=match[1];
var extension='';
var match_tuple=fileName.match(/\.(\w+)$/);
if(match_tuple){
extension=match_tuple[1];
}
return[fileName,extension];
},





measureRequestSent:function measureRequestSent(type,uid){
var timings=_timings[type];
var entry=timings.get(uid);
if(entry==null||entry.requestSent!=null){
return;
}else{
entry.requestSent=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
}
},





measureResponseReceived:function measureResponseReceived(
type,
uid)
{
var timings=_timings[type];
var entry=timings.get(uid);
if(
entry==null||
entry.requestSent==null||
entry.responseReceived!=null)
{
return;
}else{
entry.responseReceived=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
}
},







annotate:function annotate(type,uid){
var timings=_timings[type];
var entry=timings.get(uid);

if(!entry){
return nullAnnotations;
}else{
var anno=entry.annotations;
if(anno!=null){
return anno;
}else{
var newAnno=new(require("TimingAnnotations"))();
entry.annotations=newAnno;
return newAnno;
}
}
},

getAnnotationsFor:function getAnnotationsFor(
type,
uid)
{
var timings=_timings[type];
var entry=timings.get(uid);
if(!entry){
return null;
}else{
var anno=entry.annotations;
return anno!=null?anno.prepareToSend():null;
}
}};


module.exports=ResourceTimingsStore;}),null);
                                                                                               __d("clearInterval",["requireCond","cr:1003267"],(function $module_clearInterval(global,require,requireDynamic,requireLazy,module,exports){





module.exports=require("cr:1003267");}),null);
                                                                                         __d("isEmpty",["invariant"],(function $module_isEmpty(global,require,requireDynamic,requireLazy,module,exports,invariant){



'use strict';






function isEmpty(value){
if(Array.isArray(value)){
return value.length===0;
}else if(typeof value==='object'){
if(value){

!isIterable(value)||value.size===undefined||invariant(0,
'isEmpty() does not support iterable collections.');

for(var _ in value){
return false;
}
}
return true;
}else{
return!value;
}
}

function isIterable(value){

if(typeof Symbol==='undefined'){
return false;
}
return value[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]!=null;
}

module.exports=isEmpty;}),null);
                                                                                                                             __d("setIntervalAcrossTransitions",["requireCond","cr:896462"],(function $module_setIntervalAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports){









module.exports=require("cr:896462");}),null);
                                                                                               __d("CSSLoader",["CSSLoaderConfig","NetworkStatus","ResourceTimingsStore","TimeSlice","clearInterval","ifRequired","isEmpty","nullthrows","setIntervalAcrossTransitions"],(function $module_CSSLoader(global,require,requireDynamic,requireLazy,module,exports){var c_isEmpty;































var CSS_POLL_INTERVAL=20;
var CSS_POLL_TIMEOUT=require("CSSLoaderConfig").timeout;

var _loadEventSupported=require("CSSLoaderConfig").loadEventSupported;
var _testingLoadEvent;


var _ieStyleSheets=[];

var _expirationTime;
var _activeCSSPolls=







new Map();






function _testLoadEvent(hardpoint){
if(_testingLoadEvent){
return;
}
_testingLoadEvent=true;

var link=document.createElement('link');
link.onload=function(){
_loadEventSupported=true;
if(link.parentNode){
link.parentNode.removeChild(link);
}
};
link.rel='stylesheet';
link.href='data:text/css;base64,';
hardpoint.appendChild(link);
}





function _runCSSPolls(){
var callbacks=[];
var finishedSignals=[];

if(Date.now()>=_expirationTime){
for(var _iterator=_activeCSSPolls.values(),_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var entry=_ref;
finishedSignals.push(entry.signal);
callbacks.push(entry.error);
}
_activeCSSPolls.clear();
}else{
for(var _iterator2=_activeCSSPolls,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref3;if(_isArray2){if(_i2>=_iterator2.length)break;_ref3=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref3=_i2.value;}var _ref4=_ref3;var name=_ref4[0];var _entry=_ref4[1];
var signal=_entry.signal;
var style=window.getComputedStyle?
getComputedStyle(signal):

signal.currentStyle;
if(style&&parseInt(style.height,10)>1){
callbacks.push(_entry.load);
finishedSignals.push(signal);
_activeCSSPolls["delete"](name);
}
}
}

for(var ii=0;ii<finishedSignals.length;ii++){
var parentNode=require("nullthrows")(finishedSignals[ii].parentNode);
parentNode.removeChild(finishedSignals[ii]);
}

if(!(c_isEmpty||(c_isEmpty=require("isEmpty")))(callbacks)){
for(ii=0;ii<callbacks.length;ii++){
callbacks[ii]();
}
_expirationTime=Date.now()+CSS_POLL_TIMEOUT;
}

return _activeCSSPolls.size===0;
}







function _startCSSPoll(
name,
hardpoint,
onLoad,
onError)
{


var signal=document.createElement('meta');
signal.id='bootloader_'+name.replace(/[^a-z0-9]/gi,'_');
hardpoint.appendChild(signal);

var alreadyPolling=_activeCSSPolls.size!==0;
_expirationTime=Date.now()+CSS_POLL_TIMEOUT;
_activeCSSPolls.set(name,{signal:signal,load:onLoad,error:onError});
if(!alreadyPolling){
var interval=require("setIntervalAcrossTransitions")(function _pollCSS(){
if(_runCSSPolls()){
require("clearInterval")(interval);
}
},CSS_POLL_INTERVAL);
}
}







function _setupEventListeners(
name,
uri,
hardpoint,
onLoad,
onError,
link)
{
var requestUID=require("ResourceTimingsStore").getUID('css',uri);
require("ifRequired")("TimeSliceAutoclosedInteraction",
function ifRequired_$1(TimeSliceAutoclosedInteraction){return(
TimeSliceAutoclosedInteraction.getInteractionsActiveRightNow().forEach(
function forEach_$0(interaction){return(
interaction.
forResourceRequest(requestUID).
addStringAnnotation('requested_in_continuation','true'));}));});


require("ResourceTimingsStore").annotate('css',requestUID).
addStringAnnotation('name',name).
addStringAnnotation('source',uri).
addStringAnnotation('caller','CSSLoader.loadStyleSheet');
require("ifRequired")("TimeSliceInteraction",function ifRequired_$1(TimeSliceInteraction){


TimeSliceInteraction.informGlobally('CSSLoader.loadStyleSheet').
addStringAnnotation('source',uri).
addStringAnnotation('name',name);
});
require("ResourceTimingsStore").measureRequestSent('css',requestUID);
var wrappedOnLoad=function cssMarkResponseReceived(){
require("ResourceTimingsStore").measureResponseReceived('css',requestUID);
onLoad();
};

var timeSlice=require("TimeSlice").getGuardedContinuation(
'CSSLoader link.onresponse');


if(!link){

_startCSSPoll(name,hardpoint,wrappedOnLoad,onError);
}else if(_loadEventSupported!==true){

_startCSSPoll(name,hardpoint,wrappedOnLoad,onError);
if(_loadEventSupported===undefined){
_testLoadEvent(hardpoint);
}
}else{
link.onload=timeSlice.bind(undefined,function CSSLoaderLinkLoad(){
link.onload=link.onerror=null;
wrappedOnLoad();
});
link.onerror=timeSlice.bind(undefined,function CSSLoaderLinkError(){
link.onload=link.onerror=null;
onError();
});
}
}

var CSSLoader={











loadStyleSheet:function loadStyleSheet(
name,
uri,
hardpoint,
crossOrigin,
onLoad,
onError)
{

var _document=document;

if('createStyleSheet'in _document){


var sheetIndex;
for(var ii=0;ii<_ieStyleSheets.length;ii++){
if(_ieStyleSheets[ii].imports.length<31){
sheetIndex=ii;
break;
}
}
if(sheetIndex===undefined){
try{
_ieStyleSheets.push(_document.createStyleSheet());
}catch(_unused){


require("NetworkStatus").reportError();
onError();
return;
}
sheetIndex=_ieStyleSheets.length-1;
}
require("NetworkStatus").reportSuccess();
_ieStyleSheets[sheetIndex].addImport(uri);
_setupEventListeners(name,uri,hardpoint,onLoad,onError,null);
return;
}

var link=_document.createElement('link');
link.rel='stylesheet';
link.type='text/css';
link.href=uri;
if(crossOrigin){
link.crossOrigin='anonymous';
}
_setupEventListeners(name,uri,hardpoint,onLoad,onError,link);
hardpoint.appendChild(link);
},

setupEventListeners:function setupEventListeners(
name,
uri,
hardpoint,
onLoad,
onError,
link)
{
_setupEventListeners(name,uri,hardpoint,onLoad,onError,link);
}};


module.exports=CSSLoader;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    __d("ImmediateImplementation",["ImmediateImplementationExperiments"],function $module_ImmediateImplementation(global,require,requireDynamic,requireLazy,module,exports){





(function(global,undefined){
'use strict';

var nextHandle=1;
var tasksByHandle={};
var queueHead={};
var queueTail=queueHead;
var currentlyRunningATask=false;
var doc=global.document;
var setImmediate;
var setImmediatePostMessage;
var setImmediateMessageChannel;

var messagePrefix='setImmediate$'+Math.random()+'$';

function isInsideUserActivationChain(){
var event=global.event;
if(!event){
return false;
}


return(
event.isTrusted&&ES(

[
'change',
'click',
'contextmenu',
'dblclick',
'mouseup',
'pointerup',
'reset',
'submit',
'touchend'],"includes",true,
event.type)||

event.type==='message'&&
event.source===global&&
typeof event.data==='string'&&
ES(event.data,"indexOf",true,messagePrefix)===0);

}

function addFromSetImmediateArguments(args){
var handler=args[0];
args=Array.prototype.slice.call(args,1);
tasksByHandle[nextHandle]=function(){
handler.apply(undefined,args);
};
queueTail=queueTail.next={handle:nextHandle++};
return queueTail.handle;
}

function flushQueue(){
var next,task;
while(!currentlyRunningATask&&(next=queueHead.next)){
queueHead=next;
if(task=tasksByHandle[next.handle]){
currentlyRunningATask=true;
try{
task();
currentlyRunningATask=false;
}finally{
clearImmediate(next.handle);
if(currentlyRunningATask){
currentlyRunningATask=false;






if(queueHead.next){
setImmediate(flushQueue);
}
}
}
}
}
}

function clearImmediate(handle){
delete tasksByHandle[handle];
}

function canUsePostMessage(){


if(global.postMessage&&!global.importScripts){
var postMessageIsAsynchronous=true;

var onMessage=function onMessage(){
postMessageIsAsynchronous=false;
if(global.removeEventListener){
global.removeEventListener('message',onMessage,false);
}else{
global.detachEvent('onmessage',onMessage);
}
};

if(global.addEventListener){
global.addEventListener('message',onMessage,false);
}else if(global.attachEvent){
global.attachEvent('onmessage',onMessage);
}else{
return false;
}

global.postMessage('','*');
return postMessageIsAsynchronous;
}
}

function installPostMessageImplementation(){


var onGlobalMessage=function onGlobalMessage(event){
if(
event.source===global&&
typeof event.data==='string'&&
ES(event.data,"indexOf",true,messagePrefix)===0)
{
flushQueue();
}
};

if(global.addEventListener){
global.addEventListener('message',onGlobalMessage,false);
}else{
global.attachEvent('onmessage',onGlobalMessage);
}

setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);





if(global.originalPostMessage){
global.originalPostMessage(messagePrefix+handle,'*');
}else{
global.postMessage(messagePrefix+handle,'*');
}
return handle;
};
setImmediatePostMessage=setImmediate;
}

function installMessageChannelImplementation(){
var channel=new MessageChannel();
var pendingImmediate=false;
channel.port1.onmessage=function(e){
pendingImmediate=false;
flushQueue();
};
setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);
if(!pendingImmediate){
channel.port2.postMessage(handle);
pendingImmediate=true;
}
return handle;
};
setImmediateMessageChannel=setImmediate;
}

function installReadyStateChangeImplementation(){
var html=doc.documentElement;
setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);


var script=doc.createElement('script');
script.onreadystatechange=function(){
script.onreadystatechange=null;
html.removeChild(script);
script=null;
flushQueue();
};
html.appendChild(script);
return handle;
};
}

function installSetTimeoutImplementation(){
setImmediate=function setImmediate(){
setTimeout(flushQueue,0);
return addFromSetImmediateArguments(arguments);
};
}

if(canUsePostMessage()){
if(
global.MessageChannel&&
require("ImmediateImplementationExperiments").prefer_message_channel)
{


installPostMessageImplementation();
installMessageChannelImplementation();

setImmediate=function setImmediate(){
if(isInsideUserActivationChain()){
return setImmediatePostMessage.apply(null,arguments);
}else{
return setImmediateMessageChannel.apply(null,arguments);
}
};
}else{

installPostMessageImplementation();
}
}else if(global.MessageChannel){

installMessageChannelImplementation();
}else if(
doc&&
doc.createElement&&
'onreadystatechange'in doc.createElement('script'))
{

installReadyStateChangeImplementation();
}else{

installSetTimeoutImplementation();
}

exports.setImmediate=setImmediate;
exports.clearImmediate=clearImmediate;
})(
typeof self==='undefined'?
typeof global==='undefined'?
this:
global:
self);},null);
                                                                                  __d("setImmediatePolyfill",["invariant","PromiseUsePolyfillSetImmediateGK","ImmediateImplementation"],function $module_setImmediatePolyfill(global,require,requireDynamic,requireLazy,module,exports,invariant){













var setImmediateImplementation=global.setImmediate;
if(
require("PromiseUsePolyfillSetImmediateGK").www_always_use_polyfill_setimmediate||
!setImmediateImplementation)
{
var ImmediateImplementation=require('ImmediateImplementation');
setImmediateImplementation=ImmediateImplementation.setImmediate;
}

function setImmediate(
callback)

{

typeof callback==='function'||invariant(0,'Callback must be a function');for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
return setImmediateImplementation.apply(undefined,[callback].concat(args));
}

module.exports=setImmediate;},null);
                                                                                               __d("setImmediateAcrossTransitions",["TimerStorage","TimeSlice","setImmediatePolyfill"],function $module_setImmediateAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports){








var name=require("TimerStorage").IMMEDIATE;





function setImmediateAcrossTransitions(
callback)

{
var guardedCallback=require("TimeSlice").guard(callback,'setImmediate',{
propagationType:require("TimeSlice").PropagationType.CONTINUATION,
registerCallStack:true});for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}


var id=require("setImmediatePolyfill").apply(undefined,[guardedCallback].concat(args));

var token=name+String(id);
require("TimeSlice").registerForCancelling(token,guardedCallback);
return id;
}

module.exports=setImmediateAcrossTransitions;},null);
                                                                                                                                                                                                                                                                                 __d("Promise",["TimeSlice","setImmediateAcrossTransitions","setTimeoutAcrossTransitions"],function $module_Promise(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






function noop(){}

















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}

function tryCallOne(fn,a){
try{
return fn(a);
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}
function tryCallTwo(fn,a,b){
try{
fn(a,b);
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');
}
if(typeof fn!=='function'){
throw new TypeError('not a function');
}
this._state=0;
this._value=null;
this._deferreds=[];
if(fn===noop){
return;
}
doResolve(fn,this);
}_c=Promise;
Promise._noop=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);
}
var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;
};

function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));
});
}
function handle(self,deferred){
while(self._state===3){
self=self._value;
}
if(self._state===0){
self._deferreds.push(deferred);
return;
}
require("setImmediateAcrossTransitions")(function PromiseFulfill(){
var cb=self._state===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
deferred.continuation(function deferred_continuation_$0(){});
if(self._state===1){
resolve(deferred.promise,self._value);
}else{
reject(deferred.promise,self._value);
}
return;
}
var ret=tryCallOne(ES(deferred.continuation,"bind",true,null,cb),self._value);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);
}else{
resolve(deferred.promise,ret);
}
});
}
function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));

}
if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);
}
if(then===self.then&&newValue instanceof Promise){
self._state=3;
self._value=newValue;
finale(self);
return;
}else if(typeof then==='function'){
doResolve(ES(then,"bind",true,newValue),self);
return;
}
}
self._state=1;
self._value=newValue;
finale(self);
}

function reject(self,newValue){
self._state=2;
self._value=newValue;
finale(self);
}
function finale(self){
for(var i=0;i<self._deferreds.length;i++){
handle(self,self._deferreds[i]);
}
self._deferreds=null;
}

function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.continuation=require("TimeSlice").getGuardedContinuation('Promise Handler');
this.promise=promise;
}_c2=Handler;







function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(
fn,
function tryCallTwo_$1(value){
if(done){
return;
}
done=true;
resolve(promise,value);
},
function tryCallTwo_$2(reason){
if(done){
return;
}
done=true;
reject(promise,reason);
});

if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);
}
}

Promise.prototype.done=function(onFulfilled,onRejected){
var errorLocation=new Error('Promise.done');
var self=arguments.length?this.then.apply(this,arguments):this;
self.then(null,function self_then_$1(err){
require("setTimeoutAcrossTransitions")(function setTimeoutAcrossTransitions_$0(){
if(err instanceof Error){
throw err;
}else{
errorLocation.message=''+err;
throw errorLocation;
}
},0);
});
};





var TRUE=valuePromise(true);
var FALSE=valuePromise(false);
var NULL=valuePromise(null);
var UNDEFINED=valuePromise(undefined);
var ZERO=valuePromise(0);
var EMPTYSTRING=valuePromise('');

function valuePromise(value){
var p=new Promise(Promise._noop);
p._state=1;
p._value=value;
return p;
}
Promise.resolve=function(value){
if(value instanceof Promise){
return value;
}

if(value===null){
return NULL;
}
if(value===undefined){
return UNDEFINED;
}
if(value===true){
return TRUE;
}
if(value===false){
return FALSE;
}
if(value===0){
return ZERO;
}
if(value===''){
return EMPTYSTRING;
}

if(typeof value==='object'||typeof value==='function'){
try{
var then=value.then;
if(typeof then==='function'){
return new Promise(ES(then,"bind",true,value));
}
}catch(ex){
return new Promise(function(resolve,reject){
reject(ex);
});
}
}
return valuePromise(value);
};

Promise.all=function(arr){



if(!ES("Array","isArray",false,arr)){
arr=[
Promise.reject(new TypeError('Promise.all must be passed an array.'))];

}


var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0){
return resolve([]);
}
var remaining=args.length;
function res(i,val){
if(val&&(typeof val==='object'||typeof val==='function')){
if(val instanceof Promise&&val.then===Promise.prototype.then){
while(val._state===3){
val=val._value;
}
if(val._state===1){
return res(i,val._value);
}
if(val._state===2){
reject(val._value);
}
val.then(function val_then_$0(val){
res(i,val);
},reject);
return;
}else{
var then=val.then;
if(typeof then==='function'){
var p=new Promise(ES(then,"bind",true,val));
p.then(function p_then_$0(val){
res(i,val);
},reject);
return;
}
}
}
args[i]=val;
if(--remaining===0){
resolve(args);
}
}
for(var i=0;i<args.length;i++){
res(i,args[i]);
}
});
};

Promise.allSettled=function(arr){



if(!ES("Array","isArray",false,arr)){
return Promise.reject(
new TypeError('Promise.allSettled must be passed an array.'));

}


var promises=Array(arr.length);var _loop=function _loop(


i,len){
var value=arr[i];

var isThenable=
typeof value==='object'&&
value!==null&&
typeof value.then==='function';
promises[i]=isThenable?
new Promise(function(resolve,_reject){

value.then(
function onFulfilled(value){
resolve({status:'fulfilled',value:value});
},
function onRejected(reason){
resolve({status:'rejected',reason:reason});
});

}):
Promise.resolve({
status:'fulfilled',
value:value});};for(var i=0,len=arr.length;i<len;++i){_loop(i,len);

}
return Promise.all(promises);
};

Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);
});
};

Promise.race=function(values){
return new Promise(function(resolve,reject){
ES(values,"forEach",true,function values_forEach_$0(value){
Promise.resolve(value).then(resolve,reject);
});
});
};



Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);
};








Promise.prototype["finally"]=function(onSettle){
return this.then(
function then_$0(value){return Promise.resolve(onSettle()).then(function then_$0(){return value;});},
function then_$1(error){return(
Promise.resolve(onSettle()).then(function then_$0(){
throw error;
}));});

};

module.exports=Promise;var _c,_c2;$RefreshReg$(_c,"Promise");$RefreshReg$(_c2,"Handler");},null);
                                                                                                                                                                                                                                                                  __d("PromiseAnnotate",[],(function $module_PromiseAnnotate(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

module.exports={
setDisplayName:function setDisplayName(t,name){

t.displayName=name;
return t;
},
getDisplayName:function getDisplayName(t){

var displayName=t.displayName;
if(typeof displayName==='string'){
return displayName;
}else{
return null;
}
}};}),null);
                                                                                         __d("ifRequireable",["ifRequired"],(function $module_ifRequireable(global,require,requireDynamic,requireLazy,module,exports){




































function ifRequireable(
id,
cbYes,
cbNo)
{

return require("ifRequired").call(null,id,cbYes,cbNo);
}

module.exports=ifRequireable;}),null);
                                                                                                                                                          __d("JSResourceReference",["Promise","PromiseAnnotate","ifRequireable","ifRequired"],(function $module_JSResourceReference(global,require,requireDynamic,requireLazy,module,exports){






var getModule=function getModule(module){return module;};





var _queuedBootloaderCallbacks=[];
var _bootloader=null;


function runWithBootloader(cb){
_bootloader?cb(_bootloader):_queuedBootloaderCallbacks.push(cb);
}var

JSResourceReference=function(){"use strict";JSResourceReference.



setBootloader=function setBootloader(bootloader){
_bootloader=bootloader;
for(var _i=0;_i<_queuedBootloaderCallbacks.length;_i++){var cb=_queuedBootloaderCallbacks[_i];
cb(_bootloader);
}

_queuedBootloaderCallbacks=[];
};

function JSResourceReference(moduleId){
this.$JSResourceReference_moduleId=moduleId;
}var _proto=JSResourceReference.prototype;_proto.

getModuleId=function getModuleId(){

var id=this.$JSResourceReference_moduleId;
return id;
};_proto.

getModuleIdAsRef=function getModuleIdAsRef(){
return this.$JSResourceReference_moduleId;
};_proto.

load=function load(){var _this=this;
var promise=new(require("Promise"))(function(resolve){
runWithBootloader(function runWithBootloader_$0(bl){var _this$$JSResourceRefe;return(
bl.loadModules(
[_this.getModuleId()],
resolve,(_this$$JSResourceRefe=
_this.$JSResourceReference_ref)!=null?_this$$JSResourceRefe:'JSResource: unknown caller'));});


});
require("PromiseAnnotate").setDisplayName(
promise,
'Bootload('+this.getModuleId()+')');

return promise;
};_proto.

preload=function preload(){var _this2=this;
runWithBootloader(function runWithBootloader_$0(bl){return bl.preloadModules([_this2.getModuleId()]);});
};_proto.





equals=function equals(moduleLoader){
return this===moduleLoader||this.$JSResourceReference_moduleId==moduleLoader.$JSResourceReference_moduleId;
};_proto.

getModuleIfRequireable=function getModuleIfRequireable(){


return require("ifRequireable").call(null,this.$JSResourceReference_moduleId,getModule);
};_proto.

getModuleIfRequired=function getModuleIfRequired(){


return require("ifRequired").call(null,this.$JSResourceReference_moduleId,getModule);
};_proto.





__setRef=function __setRef(ref){
this.$JSResourceReference_ref=ref;
return this;
};JSResourceReference.








loadAll=function loadAll(
loaders,
callback)
{
var uniqueRefs={};
var hasRef=false;

for(var _iterator=loaders,_isArray=Array.isArray(_iterator),_i2=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i2>=_iterator.length)break;_ref=_iterator[_i2++];}else{_i2=_iterator.next();if(_i2.done)break;_ref=_i2.value;}var loader=_ref;
var ref=loader.$JSResourceReference_ref;
if(ref){
hasRef=true;
uniqueRefs[ref]=true;
}
}

runWithBootloader(function runWithBootloader_$0(bl){return(
bl.loadModules(
loaders.map(function loaders_map_$0(loader){return loader.getModuleId();}),
callback,
hasRef?
Object.keys(uniqueRefs).join(':'):
'JSResource: unknown caller'));});


};return JSResourceReference;}();





module.exports=JSResourceReference;}),null);
                                                                                                                                                                                     __d("ResourceHasher",["invariant"],(function $module_ResourceHasher(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';







var _externalJSCounter=0;

var ResourceHasher={



getAsyncHash:function getAsyncHash(module){
return'async:'+module;
},





createExternalJSHash:function createExternalJSHash(){
return'ejs:'+_externalJSCounter++;
},

getValidResourceHash:function getValidResourceHash(hash){
typeof hash==='string'||invariant(0,'Found non string hash:%s',hash);
return hash;
}};


module.exports=ResourceHasher;}),null);
                                                                                         __d("TrustedTypes",["TrustedTypesConfig"],(function $module_TrustedTypes(global,require,requireDynamic,requireLazy,module,exports){

'use strict';










var moduleExports;




if(typeof trustedTypes!=='undefined'&&require("TrustedTypesConfig").useTrustedTypes){var







createTrustedType=function createTrustedType(
isTrustedTypeCallback,
createTrustedTypeCallback)
{
return function(s){

if(isTrustedTypeCallback(s)){
return s;
}


try{

return createTrustedTypeCallback(''+s);
}catch(e){
if(require("TrustedTypesConfig").reportOnly){


return''+s;
}
throw e;
}
};
};var _tt=trustedTypes;









var TrustedTypesNative=babelHelpers["extends"]({},
_tt,{


createPolicy:function createPolicy(name,rules){
var _policy=_tt.createPolicy(name,rules);
return{
createHTML:createTrustedType(
_tt.isHTML.bind(_tt),
_policy.createHTML.bind(_policy)),

createScript:createTrustedType(
_tt.isScript.bind(_tt),
_policy.createScript.bind(_policy)),

createScriptURL:createTrustedType(
_tt.isScriptURL.bind(_tt),
_policy.createScriptURL.bind(_policy))};


}});

moduleExports=TrustedTypesNative;
}else{




var _noop=function _noop(s){return s;};

var TrustedTypesPolyfill={
isHTML:function isHTML(){return false;},
isScriptURL:function isScriptURL(){return false;},
isScript:function isScript(){return false;},
createPolicy:function createPolicy(name,policy){return{
createHTML:_noop,
createScriptURL:_noop,
createScript:_noop};}};



moduleExports=TrustedTypesPolyfill;
}

module.exports=moduleExports;}),null);
                                                                                                                                                                                                                     __d("createTrustedScriptURLFromFacebookURI",["TrustedTypes","URI","isCdnURI","isFacebookURI"],(function $module_createTrustedScriptURLFromFacebookURI(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;









var POLICY_NAME='fburi-scripturls';
var _policy;


var _rules={
createScriptURL:function createScriptURL(s){
var uri=(c_URI||(c_URI=require("URI"))).tryParseURI(s);
if(uri!=null){
if(require("isFacebookURI")(uri)||require("isCdnURI")(uri)){
return s;
}
}
throw new TypeError();
}};


function _init(){
if(_policy){
return;
}
_policy=require("TrustedTypes").createPolicy(POLICY_NAME,_rules);
}

function _getPolicy(){
if(!_policy){
_init();
}
return _policy;
}

function createTrustedScriptURLFromFacebookURI(input){
return _getPolicy().createScriptURL(input);
}

module.exports=createTrustedScriptURLFromFacebookURI;}),null);
                                                                                                                                                                                                                                                              __d("Bootloader",["invariant","requireCond","BootloaderConfig","BootloaderEndpoint","BootloaderEvents","BootloaderEventsManager","CSRBitMap","CSRIndexUtil","CSSLoader","ErrorPubSub","FBLogger","JSResourceReference","cr:696703","NetworkStatus","ResourceHasher","ResourceTimingsStore","TAAL","TimeSlice","createTrustedScriptURLFromFacebookURI","ex","ifRequireable","nullthrows","performanceAbsoluteNow"],(function $module_Bootloader(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var c_ErrorPubSub;var c_performanceAbsoluteNow;






























var emptyFunction=function emptyFunction(){};




















































































var _queuedPreloads=[];
var _queuedLoadModules=

[];



var _requested=new Map();

var _loaded=new Map();

var _errors=new Map();


var _preloadRequested=new Set();

var _componentMap=new Map();

var _containerNode=null;

var _resources=new Map();

var _rsrcIndexMap=new Map();

var _retries=new Map();
var _retryTimes=[];


var _bootloaded=






new Map();

var _uniqueBootloadRequests=new Set();

var _pageScanned=false;
var _processedTagIDs=new Set();
var _bootloadEnabled=false;

var _events=new(require("BootloaderEventsManager"))();




var JS_RETRIES=require("BootloaderConfig").jsRetries||[];
var RETRY_ABORT_NUM=require("BootloaderConfig").jsRetryAbortNum;
var RETRY_ABORT_TIME=require("BootloaderConfig").jsRetryAbortTime;
var _useRetries=JS_RETRIES.length>0;

(c_ErrorPubSub||(c_ErrorPubSub=require("ErrorPubSub"))).unshiftListener(function ErrorPubSub_unshiftListener_$0(err){
var loading=[];
for(var _iterator=_requested,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray){if(_i>=_iterator.length)break;_ref2=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref2=_i.value;}var _ref3=_ref2;var hash=_ref3[0];var _=_ref3[1];
if(_loaded.has(hash)){
continue;
}
var entry=_getExistingResource(hash);
if(entry.type==='csr'||entry.type==='async'){
continue;
}
loading.push(entry.src);
}
err.loadingUrls=loading;
});

function canBootloadComponentsYet(components){
if(!require("BootloaderConfig").retryQueuedBootloads){
return _bootloadEnabled;
}

for(var _iterator2=components,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _entry$rdfds,_entry$rds;var _ref4;if(_isArray2){if(_i2>=_iterator2.length)break;_ref4=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref4=_i2.value;}var comp=_ref4;
var entry=_componentMap.get(comp);
if(!entry){

return false;
}var _arr=

[entry.r,((_entry$rdfds=entry.rdfds)==null?void 0:_entry$rdfds.r)||[],((_entry$rds=entry.rds)==null?void 0:_entry$rds.r)||[]];for(var _i3=0;_i3<_arr.length;_i3++){var hashes=_arr[_i3];
for(var _iterator3=hashes,_isArray3=Array.isArray(_iterator3),_i4=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref5;if(_isArray3){if(_i4>=_iterator3.length)break;_ref5=_iterator3[_i4++];}else{_i4=_iterator3.next();if(_i4.done)break;_ref5=_i4.value;}var hash=_ref5;
if(!_resources.has(hash)){

return false;
}
}
}
}

return true;
}

function _getExistingComponent(comp){
var entry=_componentMap.get(comp);
if(!entry){
throw new Error(
require("TAAL").blameToPreviousFile(
require("ex")('Bootloader: %s is not in the component map',comp)));


}

return entry;
}

function _getExistingResource(hash){
var resource=_resources.get(hash);
if(!resource){
throw new Error(
require("TAAL").blameToPreviousFile(require("ex")('No resource entry for hash: %s',hash)));

}

return resource;
}

function _registerAsyncResource(
component,
be)
{
var hash=require("ResourceHasher").getAsyncHash(component);

if(!_resources.has(hash)){
_resources.set(hash,{type:'async',module:component,blocking:!!be});
}else{
var entry=_getExistingResource(hash);
entry.type==='async'||invariant(0,'Hash is not async');




if(entry.blocking&&!be){
entry.blocking=false;
}
}
return hash;
}

function _getContainerNode(){
if(!_containerNode){
_containerNode=
document.head||
document.getElementsByTagName('head')[0]||
document.body;
}
return _containerNode;
}






function _batchDOMInsert(callback){
var batchNode=document.createDocumentFragment();
callback(batchNode);
_getContainerNode().appendChild(batchNode);
}

function _shouldUseRetries(){

if(!_useRetries){
return false;
}

var retryNum=_retryTimes.length;
if(retryNum<RETRY_ABORT_NUM){
return true;
}


var retryWindow=
_retryTimes[retryNum-1]-_retryTimes[retryNum-RETRY_ABORT_NUM];
if(retryWindow<RETRY_ABORT_TIME){
require("FBLogger")('bootloader').warn('JS retry abort');
_useRetries=false;
}

return _useRetries;
}





function _preloadResource(
hash,
entry,
batchNode)
{

if(_requested.has(hash)||_preloadRequested.has(hash)){
return;
}
_preloadRequested.add(hash);

var target=undefined;
switch(entry.type){
case'async':

_loadResource(hash,entry,batchNode,null);
return;
case'css':
target='style';
break;
case'js':
target='script';
break;
default:
target=entry.type;
false||invariant(0,'unreachable');}


var link=document.createElement('link');
link.href=entry.src;
link.rel='preload';
link.as=target;

if(!entry.nc){
link.crossOrigin='anonymous';
}
batchNode.appendChild(link);
}




function _loadJS(
hash,
entry,
callback,
batchNode)
{
var script=document.createElement('script');
script.src=require("createTrustedScriptURLFromFacebookURI")(entry.src);
script.async=true;
if(!entry.nc){
script.crossOrigin='anonymous';
}

_setupScriptEventListeners(script,hash,entry,callback);
batchNode.appendChild(script);

return script;
}

function _setupScriptEventListeners(
script,
hash,
entry,
callback)
{
var source=script.src;
var startTime=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();


var timeSlice=require("TimeSlice").getGuardedContinuation(
'Bootloader script.onresponse');

var requestUID=require("ResourceTimingsStore").getUID('js',source);
require("ifRequireable")(
'TimeSliceAutoclosedInteraction',
function ifRequireable_$1(TimeSliceAutoclosedInteraction){return(
TimeSliceAutoclosedInteraction.getInteractionsActiveRightNow().forEach(
function forEach_$0(interaction){return(
interaction.
forResourceRequest(requestUID).
addStringAnnotation('requested_in_continuation','true'));}));});


require("ResourceTimingsStore").annotate('js',requestUID).
addStringAnnotation('name',hash).
addStringAnnotation('source',source);

require("ifRequireable")('TimeSliceInteraction',function ifRequireable_$1(TimeSliceInteraction){
TimeSliceInteraction.informGlobally('bootloader._loadJS').
addStringAnnotation('source',source).
addStringAnnotation('name',hash);
});
require("ResourceTimingsStore").measureRequestSent('js',requestUID);
script.onload=timeSlice.bind(undefined,function timeSlice_bind_$1(){var _retries$get;

var retry=(_retries$get=_retries.get(source))!=null?_retries$get:0;
if(retry){
require("FBLogger")('bootloader').info(
'JS retry success [%s] at %s | time: %s | retries: %s',
hash,
source,
(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))()-startTime,
retry);

}
require("ResourceTimingsStore").measureResponseReceived('js',requestUID);
callback();
});


script.onreadystatechange=function(){
if(['loaded','complete'].includes(this.readyState)){
require("ResourceTimingsStore").measureResponseReceived('js',requestUID);
timeSlice.bind(undefined,callback)();
}
};

script.onerror=timeSlice.bind(undefined,function timeSlice_bind_$1(){var _retries$get2;
require("ResourceTimingsStore").measureResponseReceived('js',requestUID);
var retry=(_retries$get2=_retries.get(source))!=null?_retries$get2:0;
var now=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
if(_shouldUseRetries()&&retry<JS_RETRIES.length){
_retryTimes.push(now);


setTimeout(function setTimeout_$0(){
if(!_shouldUseRetries()){
return;
}


var currentContainer=script.parentNode;
if(currentContainer){
currentContainer.removeChild(script);
_loadJS(hash,entry,callback,currentContainer);
}
},JS_RETRIES[retry]);

_retries.set(source,retry+1);
}else{
_errors.set(hash,now);
require("FBLogger")('bootloader').warn(
'JS loading error [%s] at %s | time: %s | retries: %s'+
' | concurrency: %s',
hash,
source,
now-startTime,
retry,
_requested.size-_loaded.size);

require("NetworkStatus").reportError();

callback();
}
});
}

function _onCSSError(
hash,
entry,
cb)
{
return function(){
require("FBLogger")('bootloader').warn(
'CSS timeout [%s] at %s | concurrency: %s',
hash,
entry.src,
_requested.size-_loaded.size);

_errors.set(hash,(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());
require("NetworkStatus").reportError();
cb();
};
}




function _loadResource(
hash,
entry,
batchNode,
tag)
{
if(_requested.has(hash)){
return;
}
_requested.set(hash,(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());

window.CavalryLogger&&
window.CavalryLogger.getInstance().measureResources(
{
name:hash,
type:entry.type},

tag);


switch(entry.type){
case'js':
_loadJS(hash,entry,function _loadJS_$2(){return Bootloader.done(hash);},batchNode);
break;
case'css':
var callback=function callback(){return Bootloader.done(hash);};
require("CSSLoader").loadStyleSheet(
hash,
entry.src,
batchNode,
!entry.nc,
callback,
_onCSSError(hash,entry,callback));

break;
case'async':
require("BootloaderEndpoint").load(entry.module,entry.blocking,hash);
break;
default:
entry.type;
false||invariant(0,'unreachable');}

}

function _loadResources(
resourceHashes,
callback,
batchNode,
rsrcLog,
tag)
{
var willRequest=new Map();
var blockingEvents=[];

for(var _iterator4=_resolveCSRs(resourceHashes),_isArray4=Array.isArray(_iterator4),_i5=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref7;if(_isArray4){if(_i5>=_iterator4.length)break;_ref7=_iterator4[_i5++];}else{_i5=_iterator4.next();if(_i5.done)break;_ref7=_i5.value;}var _ref10=_ref7;var hash=_ref10[0];var entry=_ref10[1];
switch(entry.type){
case'css':
if(!entry.nonblocking){
blockingEvents.push(_events.rsrcDone(hash));
}
break;
case'js':
blockingEvents.push(_events.rsrcDone(hash));
break;
case'async':
if(entry.blocking){
blockingEvents.push(_events.rsrcDone(hash));
}
break;
default:
entry.type;
false||invariant(0,'unreachable');}


if(!_requested.has(hash)){
willRequest.set(hash,entry);
}
rsrcLog==null?void 0:rsrcLog.set(hash,entry);
}

if(callback){
var runner=require("cr:696703")?
require("cr:696703").getCallbackScheduler():
function(cb){return cb();};
_events.registerCallback(function _events_registerCallback_$0(){
runner(callback);
},blockingEvents);
}

for(var _iterator5=willRequest,_isArray5=Array.isArray(_iterator5),_i6=0,_iterator5=_isArray5?_iterator5:_iterator5[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref9;if(_isArray5){if(_i6>=_iterator5.length)break;_ref9=_iterator5[_i6++];}else{_i6=_iterator5.next();if(_i6.done)break;_ref9=_i6.value;}var _ref11=_ref9;var _hash=_ref11[0];var _entry=_ref11[1];










_preloadResource(_hash,_entry,batchNode);
_loadResource(_hash,_entry,batchNode,tag);
}
}






















function _addResource(
hash,
entry,
forceSot)
{
_resources.set(hash,entry);
if(entry.type==='async'||entry.type==='csr'){
return;
}
var provides=entry.p;
if(provides){
for(var _iterator6=require("CSRIndexUtil").parseCSRIndexes(provides),_isArray6=Array.isArray(_iterator6),_i7=0,_iterator6=_isArray6?_iterator6:_iterator6[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref12;if(_isArray6){if(_i7>=_iterator6.length)break;_ref12=_iterator6[_i7++];}else{_i7=_iterator6.next();if(_i7.done)break;_ref12=_i7.value;}var rsrcIndex=_ref12;
if(!_rsrcIndexMap.has(rsrcIndex)||forceSot){
_rsrcIndexMap.set(rsrcIndex,hash);
require("CSRBitMap").add(rsrcIndex);
}
}
}
}

function _initBootloadRequest(
ref,
components)
{
var bootloadEvent=_events.bootload(components);
if(_uniqueBootloadRequests.has(bootloadEvent)){
return[bootloadEvent,null];
}
_uniqueBootloadRequests.add(bootloadEvent);

var logData={
ref:ref,
components:components,
timesliceContext:require("TimeSlice").getContext(),
startTime:(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))(),
callbackStart:0,
callbackEnd:0,
tierOne:new Map(),
tierTwo:new Map(),
tierThree:new Map(),
beRequests:new Map()};


return[bootloadEvent,logData];
}

function _isRequired(module){

return require("ifRequireable").call(
null,
module,
function ifRequireable_call_$2(){return true;},
function ifRequireable_call_$3(){return false;});

}






function _loadModule(
component,
bootloadEvent,
batchNode,
logData)
{
if(!_bootloaded.has(component)){
_bootloaded.set(component,{
firstBootloadStart:(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))(),
logData:new Set()});

}
if(logData){
require("nullthrows")(_bootloaded.get(component)).logData.add(logData);
}var _getExistingComponent2=

_getExistingComponent(component),r=_getExistingComponent2.r,rdfds=_getExistingComponent2.rdfds,rds=_getExistingComponent2.rds,be=_getExistingComponent2.be;
var asyncHash=_isRequired(component)?
null:
_registerAsyncResource(component,be);

if(asyncHash==null){


_events.notify(_events.beDone(component));
}

_loadResources(
asyncHash!=null?[asyncHash].concat(r):r,
function _loadResources_$1(){return _events.notify(_events.tierOne(component));},
batchNode,
logData==null?void 0:logData.tierOne);



_loadResources(
(rdfds==null?void 0:rdfds.r)||[],
function _loadResources_$1(){return(
_events.registerCallback(function _events_registerCallback_$0(){
_events.notify(_events.tierTwoStart(component));

requireLazy.call(null,(rdfds==null?void 0:rdfds.m)||[],function requireLazy_call_$2(){return(
_events.notify(_events.tierTwo(component)));});

},[_events.tierOne(component),bootloadEvent]));},
batchNode,
logData==null?void 0:logData.tierTwo);



_loadResources(
(rds==null?void 0:rds.r)||[],
function _loadResources_$1(){return(
_events.registerCallback(function _events_registerCallback_$0(){
_events.notify(_events.tierThreeStart(component));

requireLazy.call(null,(rds==null?void 0:rds.m)||[],function requireLazy_call_$2(){return(
_events.notify(_events.tierThree(component)));});

},[_events.tierTwo(component)]));},
batchNode,
logData==null?void 0:logData.tierThree);

}








function _resolveCSRs(
hashes)
{
var ret=new Map();
for(var _iterator7=hashes,_isArray7=Array.isArray(_iterator7),_i8=0,_iterator7=_isArray7?_iterator7:_iterator7[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref13;if(_isArray7){if(_i8>=_iterator7.length)break;_ref13=_iterator7[_i8++];}else{_i8=_iterator7.next();if(_i8.done)break;_ref13=_i8.value;}var hash=_ref13;

var entry=_resources.get(hash);
if(!entry){
require("FBLogger")('bootloader').mustfix('Unable to resolve resource %s.',hash);
continue;
}

var provides=undefined;
if(entry.type==='csr'){


provides=require("CSRIndexUtil").parseCSRIndexes(entry.src);
}else if(entry.p){



provides=require("CSRIndexUtil").parseCSRIndexes(entry.p);
}else{
ret.set(hash,entry);
continue;
}

for(var _iterator8=provides,_isArray8=Array.isArray(_iterator8),_i9=0,_iterator8=_isArray8?_iterator8:_iterator8[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref14;if(_isArray8){if(_i9>=_iterator8.length)break;_ref14=_iterator8[_i9++];}else{_i9=_iterator8.next();if(_i9.done)break;_ref14=_i9.value;}var p=_ref14;

var sotHash=require("nullthrows")(
_rsrcIndexMap.get(p),"No hash for rsrcIndex:"+
p);

var sotEntry=_getExistingResource(sotHash);


sotEntry.type!=='csr'||invariant(0,
'CSR cannot be source-of-truth %s',
sotHash);

ret.set(sotHash,sotEntry);
}
}
return ret.entries();
}

function _pickupPageResource(el){var _el$parentNode;
var hashAttribute=el.getAttribute('data-bootloader-hash');
if(hashAttribute==null){
return;
}
var hash=require("ResourceHasher").getValidResourceHash(hashAttribute);
if(el.id){
if(_processedTagIDs.has(el.id)){
return;
}
_processedTagIDs.add(el.id);
}

var entry=
el.tagName=='SCRIPT'?

{src:el.src,type:'js'}:

{src:el.href,type:'css'};

if(el.crossOrigin==null){
entry.nc=1;
}
if(entry.type==='css'&&el.getAttribute('data-nonblocking')){
entry.nonblocking=1;
}

entry.p=el.getAttribute('data-p');

if(_resources.has(hash)&&!require("BootloaderConfig").silentDups){
require("FBLogger")('bootloader').warn('Duplicate resource [%s]: %s',hash,entry.src);
}


_addResource(hash,entry,true);
_requested.set(hash,(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());

var onload=function onload(){return Bootloader.done(hash);};

var markAsLoaded=
entry.type==='js'?
!el.getAttribute('async'):

((_el$parentNode=el.parentNode)==null?void 0:_el$parentNode.tagName)==='HEAD';
if(markAsLoaded||window._btldr&&window._btldr[hash]){
onload();
}else{
if(entry.type==='js'){

_setupScriptEventListeners(el,hash,entry,onload);
}else{
require("CSSLoader").setupEventListeners(
hash,
entry.src,
_getContainerNode(),
onload,
_onCSSError(hash,entry,onload),

el);

}
}
}





function _pickupPageResources(){
if(_pageScanned){
return;
}
_pageScanned=true;
Array.from(document.getElementsByTagName('link')).forEach(function forEach_$0(el){return(
_pickupPageResource(el));});

Array.from(document.getElementsByTagName('script')).forEach(function forEach_$0(el){return(
_pickupPageResource(el));});

}







var Bootloader={
preloadModules:function preloadModules(components){
if(!canBootloadComponentsYet(components)){
var continuation=require("TimeSlice").getGuardedContinuation(
'Deferred: Bootloader.preloadModules');

_queuedPreloads.push([components,continuation]);
return;
}

var resources=[];
for(var _iterator9=components,_isArray9=Array.isArray(_iterator9),_i10=0,_iterator9=_isArray9?_iterator9:_iterator9[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref15;if(_isArray9){if(_i10>=_iterator9.length)break;_ref15=_iterator9[_i10++];}else{_i10=_iterator9.next();if(_i10.done)break;_ref15=_i10.value;}var component=_ref15;
if(_isRequired(component)){
continue;
}var _getExistingComponent3=
_getExistingComponent(component),r=_getExistingComponent3.r,rdfds=_getExistingComponent3.rdfds,be=_getExistingComponent3.be;
resources.push(_registerAsyncResource(component,be));
resources.push.apply(resources,r);
resources.push.apply(resources,(rdfds==null?void 0:rdfds.r)||[]);
}

_batchDOMInsert(function _batchDOMInsert_$0(batchNode){
for(var _iterator10=_resolveCSRs(resources),_isArray10=Array.isArray(_iterator10),_i11=0,_iterator10=_isArray10?_iterator10:_iterator10[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref17;if(_isArray10){if(_i11>=_iterator10.length)break;_ref17=_iterator10[_i11++];}else{_i11=_iterator10.next();if(_i11.done)break;_ref17=_i11.value;}var _ref18=_ref17;var hash=_ref18[0];var entry=_ref18[1];
_preloadResource(hash,entry,batchNode);
}
});
},















loadModules:function loadModules(
components,
callback,
ref)
{if(callback===void 0){callback=emptyFunction;}if(ref===void 0){ref='loadModules: unknown caller';}
var isCancelled=false;
var realCallback=function realCallback(){
!isCancelled&&callback.apply(undefined,arguments);
};



var subscription={
remove:function remove(){
isCancelled=true;
}};



if(!canBootloadComponentsYet(components)){
var contName='Deferred: Bootloader.loadModules';
var continuation=require("TimeSlice").getGuardedContinuation(contName);
_queuedLoadModules.push([components,realCallback,ref,continuation]);
return subscription;
}var _initBootloadRequest2=

_initBootloadRequest(ref,components),bootloadEvent=_initBootloadRequest2[0],logData=_initBootloadRequest2[1];


_events.registerCallback(
requireLazy.bind(null,components,function requireLazy_bind_$2(){
logData&&(logData.callbackStart=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());
realCallback.apply(undefined,arguments);
logData&&(logData.callbackEnd=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());

_events.notify(bootloadEvent);
}),
components.map(function components_map_$0(comp){return _events.tierOne(comp);}));



_batchDOMInsert(function _batchDOMInsert_$0(batchNode){
for(var _iterator11=components,_isArray11=Array.isArray(_iterator11),_i12=0,_iterator11=_isArray11?_iterator11:_iterator11[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref19;if(_isArray11){if(_i12>=_iterator11.length)break;_ref19=_iterator11[_i12++];}else{_i12=_iterator11.next();if(_i12.done)break;_ref19=_i12.value;}var comp=_ref19;
_loadModule(comp,bootloadEvent,batchNode,logData);
}
});

if(logData){

var events=new Set();
for(var _iterator12=components,_isArray12=Array.isArray(_iterator12),_i13=0,_iterator12=_isArray12?_iterator12:_iterator12[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref20;if(_isArray12){if(_i13>=_iterator12.length)break;_ref20=_iterator12[_i13++];}else{_i13=_iterator12.next();if(_i13.done)break;_ref20=_i13.value;}var comp=_ref20;
events.add(_events.beDone(comp));
events.add(_events.tierThree(comp));
}var _arr2=
[logData.tierOne,logData.tierTwo,logData.tierThree];for(var _i14=0;_i14<_arr2.length;_i14++){var set=_arr2[_i14];
for(var _iterator13=set.keys(),_isArray13=Array.isArray(_iterator13),_i15=0,_iterator13=_isArray13?_iterator13:_iterator13[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref21;if(_isArray13){if(_i15>=_iterator13.length)break;_ref21=_iterator13[_i15++];}else{_i15=_iterator13.next();if(_i15.done)break;_ref21=_i15.value;}var hash=_ref21;
events.add(_events.rsrcDone(hash));
}
}
_events.registerCallback(
function _events_registerCallback_$0(){return require("BootloaderEvents").notifyBootload(logData);},
Array.from(events));


require("ifRequireable")('m#TimeSliceInteraction',function ifRequireable_$1(TimeSliceInteraction){
TimeSliceInteraction.informGlobally('Bootloader.loadResources').
addSetAnnotation(
'requested_hashes',
Array.from(logData.tierOne.keys())).

addSetAnnotation(
'rdfd_requested_hashes',
Array.from(logData.tierTwo.keys())).

addSetAnnotation(
'rd_requested_hashes',
Array.from(logData.tierThree.keys())).

addStringAnnotation('bootloader_reference',ref).
addSetAnnotation('requested_components',components);
});
}

return subscription;
},





loadResources:function loadResources(
hashes,
callback,
tag,
rsrcLog)
{
_pickupPageResources();
_batchDOMInsert(function _batchDOMInsert_$0(batchNode){return(
_loadResources(
hashes.map(function hashes_map_$0(hash){return require("ResourceHasher").getValidResourceHash(hash);}),
callback,
batchNode,
rsrcLog,
tag));});


},
















requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN:function requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN(
src)
{
var hash=require("ResourceHasher").createExternalJSHash();
_addResource(hash,{type:'js',src:src,nc:1},false);
Bootloader.loadResources([hash]);
},





done:function done(hash){
_loaded.set(hash,(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))());

window.CavalryLogger&&window.CavalryLogger.done_js([hash]);

_events.notify(_events.rsrcDone(hash));
},





beDone:function beDone(
component,
beRequestID,
beLogData)
{
var events=new Set();
for(var _iterator14=(_ref23=(_bootloaded$get=_bootloaded.get(component))==null?void 0:_bootloaded$get.logData)!=null?_ref23:[],_isArray14=Array.isArray(_iterator14),_i16=0,_iterator14=_isArray14?_iterator14:_iterator14[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref23,_bootloaded$get;var _ref22;if(_isArray14){if(_i16>=_iterator14.length)break;_ref22=_iterator14[_i16++];}else{_i16=_iterator14.next();if(_i16.done)break;_ref22=_i16.value;}var ld=_ref22;
ld.beRequests.set(beRequestID,beLogData);

for(var _iterator15=beLogData.all.keys(),_isArray15=Array.isArray(_iterator15),_i17=0,_iterator15=_isArray15?_iterator15:_iterator15[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref24;if(_isArray15){if(_i17>=_iterator15.length)break;_ref24=_iterator15[_i17++];}else{_i17=_iterator15.next();if(_i17.done)break;_ref24=_i17.value;}var hash=_ref24;
events.add(_events.rsrcDone(hash));
}
}
_events.registerCallback(
function _events_registerCallback_$0(){return _events.notify(_events.beDone(component));},
Array.from(events));

},




pickupResourcesByIDs:function pickupResourcesByIDs(ids){
for(var i=0;i<ids.length;i++){

_pickupPageResource(document.getElementById(ids[i]));
}
},






enableBootload:function enableBootload(map){
for(var resource in map){






if(!_componentMap.has(resource)){
_componentMap.set(resource,map[resource]);
}
}

if(!_bootloadEnabled){
_pickupPageResources();
_bootloadEnabled=true;
}

var queuedLoadModules=_queuedLoadModules;
_queuedLoadModules=[];
queuedLoadModules.forEach(function queuedLoadModules_forEach_$0(_ref25){var components=_ref25[0],callback=_ref25[1],ref=_ref25[2],continuation=_ref25[3];
continuation(function continuation_$0(){

Bootloader.loadModules.apply(Bootloader,[components,callback,ref]);
});
});
var queuedPreloads=_queuedPreloads;
_queuedPreloads=[];
queuedPreloads.forEach(function queuedPreloads_forEach_$0(_ref26){var components=_ref26[0],continuation=_ref26[1];
continuation(function continuation_$0(){

Bootloader.preloadModules.apply(Bootloader,[components]);
});
});
},






markComponentsAsImmediate:function markComponentsAsImmediate(comps){
for(var _iterator16=comps,_isArray16=Array.isArray(_iterator16),_i18=0,_iterator16=_isArray16?_iterator16:_iterator16[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref27;if(_isArray16){if(_i18>=_iterator16.length)break;_ref27=_iterator16[_i18++];}else{_i18=_iterator16.next();if(_i18.done)break;_ref27=_i18.value;}var comp=_ref27;
var entry=_componentMap.get(comp);
if(entry&&entry.be){
delete entry.be;
Bootloader.done(require("ResourceHasher").getAsyncHash(comp));
}
}
},





setResourceMap:function setResourceMap(
resources,
sotUpgrades)
{
for(var hash in resources){
hash=require("ResourceHasher").getValidResourceHash(hash);
if(!_resources.has(hash)){
_addResource(hash,resources[hash],false);
}
}

if(sotUpgrades){
for(var _iterator17=sotUpgrades,_isArray17=Array.isArray(_iterator17),_i19=0,_iterator17=_isArray17?_iterator17:_iterator17[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref28;if(_isArray17){if(_i19>=_iterator17.length)break;_ref28=_iterator17[_i19++];}else{_i19=_iterator17.next();if(_i19.done)break;_ref28=_i19.value;}var _hash2=_ref28;
var entry=_resources.get(_hash2);
if(entry){



_addResource(_hash2,entry,true);
}
}
}
},




getURLToHashMap:function getURLToHashMap(){
var resources=new Map();
for(var _iterator18=_resources,_isArray18=Array.isArray(_iterator18),_i20=0,_iterator18=_isArray18?_iterator18:_iterator18[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref30;if(_isArray18){if(_i20>=_iterator18.length)break;_ref30=_iterator18[_i20++];}else{_i20=_iterator18.next();if(_i20.done)break;_ref30=_i20.value;}var _ref31=_ref30;var hash=_ref31[0];var entry=_ref31[1];
if(entry.type==='async'||entry.type==='csr'){
continue;
}
resources.set(entry.src,hash);
}
return resources;
},





loadPredictedResourceMap:function loadPredictedResourceMap(
resourceMap,
callback)
{
Bootloader.setResourceMap(resourceMap);
Bootloader.loadResources(Object.keys(resourceMap),callback);
},




getCSSResources:function getCSSResources(resources){
var css=[];
for(var _iterator19=_resolveCSRs(resources),_isArray19=Array.isArray(_iterator19),_i21=0,_iterator19=_isArray19?_iterator19:_iterator19[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref33;if(_isArray19){if(_i21>=_iterator19.length)break;_ref33=_iterator19[_i21++];}else{_i21=_iterator19.next();if(_i21.done)break;_ref33=_i21.value;}var _ref34=_ref33;var hash=_ref34[0];var entry=_ref34[1];
if(entry.type==='css'){
css.push(hash);
}
}

return css;
},





getBootloadedComponents:function getBootloadedComponents(){
var ret=new Map();
for(var _iterator20=_bootloaded,_isArray20=Array.isArray(_iterator20),_i22=0,_iterator20=_isArray20?_iterator20:_iterator20[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref36;if(_isArray20){if(_i22>=_iterator20.length)break;_ref36=_iterator20[_i22++];}else{_i22=_iterator20.next();if(_i22.done)break;_ref36=_i22.value;}var _ref37=_ref36;var comp=_ref37[0];var info=_ref37[1];
ret.set(comp,info.firstBootloadStart);
}
return ret;
},







getResourceState:function getResourceState(
hash)




{
return{
loadStart:_requested.get(hash),
loadEnd:_loaded.get(hash),
loadError:_errors.get(hash)};

},




getComponentTiming:function getComponentTiming(
comp)





{var _events$getEventTime,_events$getEventTime2,_events$getEventTime3,_events$getEventTime4;
return{
tierTwoStart:(_events$getEventTime=_events.getEventTime(_events.tierTwoStart(comp)))!=null?_events$getEventTime:0,
tierTwoEnd:(_events$getEventTime2=_events.getEventTime(_events.tierTwo(comp)))!=null?_events$getEventTime2:0,
tierThreeStart:(_events$getEventTime3=_events.getEventTime(_events.tierThreeStart(comp)))!=null?_events$getEventTime3:0,
tierThreeEnd:(_events$getEventTime4=_events.getEventTime(_events.tierThree(comp)))!=null?_events$getEventTime4:0};

},




getLoadedResourceCount:function getLoadedResourceCount(){
return _loaded.size;
},




getErrorCount:function getErrorCount(){
return _errors.size;
},



__debug:{
componentMap:_componentMap,
requested:_requested,
resources:_resources,
riMap:_rsrcIndexMap,
retries:_retries,
errors:_errors,
loaded:_loaded,
bootloaded:_bootloaded}};


require("JSResourceReference").setBootloader(Bootloader);
module.exports=Bootloader;}),null);
                                                                                         __d("CSRFGuard",[],(function $module_CSRFGuard(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

var GUARD='for (;;);';
var REGEX=/^for ?\(;;\);/;







var CSRFGuard={
length:GUARD.length,
regex:REGEX,

exists:function exists(data){
return!!data.match(REGEX);
},

clean:function clean(data){
var match=data.match(REGEX);
return match?data.substr(match[0].length):match;
}};


module.exports=CSRFGuard;}),null);
                                                                                                                                                                                                                                   __d("BanzaiLazyQueue",[],(function $module_BanzaiLazyQueue(global,require,requireDynamic,requireLazy,module,exports){





var _queue=[];

var BanzaiLazyQueue={


queuePost:function queuePost(
route,
data,
options)
{
_queue.push([route,data,options]);
},


flushQueue:function flushQueue(){
var curQueue=_queue;
_queue=[];
return curQueue;
}};


module.exports=BanzaiLazyQueue;}),null);
                                                                                                           __d("ge",[],(function $module_ge(global,require,requireDynamic,requireLazy,module,exports){










function ge(arg,root,tag){
if(typeof arg!=='string'){
return arg;
}else{
if(!root){
return document.getElementById(arg);
}else{
return _geFromSubtree(arg,root,tag);
}
}
}

function _geFromSubtree(id,root,tag){
var elem,children,ii;

if(_getNodeID(root)==id){
return root;
}else if(root.getElementsByTagName){


children=root.getElementsByTagName(tag||'*');
for(ii=0;ii<children.length;ii++){
if(_getNodeID(children[ii])==id){
return children[ii];
}
}
}else{



children=root.childNodes;
for(ii=0;ii<children.length;ii++){
elem=_geFromSubtree(id,children[ii]);
if(elem){
return elem;
}
}
}

return null;
}








function _getNodeID(node){

return node.getAttribute?node.getAttribute('id'):null;
}

module.exports=ge;}),null);
                                                                                  __d("replaceTransportMarkers",["BanzaiLazyQueue","ge","memoize"],(function $module_replaceTransportMarkers(global,require,requireDynamic,requireLazy,module,exports){
















var logged=new Set();














function replaceTransportMarkers(
meta,
parent,
index)
{
var obj=index!==undefined?parent[index]:parent;
var ii;
if(Array.isArray(obj)){
for(ii=0;ii<obj.length;ii++){
replaceTransportMarkers(meta,obj,ii);
}
}else if(obj&&typeof obj==='object'){
if(obj.__m){
if(obj.__lazy){



parent[index]=require("memoize")(require.bind(null,obj.__m));
}else{


parent[index]=require.call(null,obj.__m);
}
}else if(obj.__jsr){


parent[index]=new(require.call(null,'JSResourceReference'))(
obj.__jsr).
__setRef('replaceTransportMarkers');
}else if(obj.__dr){


parent[index]=new(require.call(null,'RequireDeferredReference'))(
obj.__dr).
__setRef('replaceTransportMarkers');
}else if(obj.__rc){


if(obj.__rc[0]===null){
parent[index]=null;
}else{
parent[index]=require.call(null,obj.__rc[0]);
}

if(obj.__rc[1]){
if(!logged.has(obj.__rc[1])){
logged.add(obj.__rc[1]);



require("BanzaiLazyQueue").queuePost('require_cond_exposure_logging',{
identifier:obj.__rc[1]});

}
}
}else if(obj.__e){
parent[index]=require("ge")(obj.__e);
}else if(obj.__rel){
parent[index]=meta.relativeTo;
}else if(obj.__bigPipeContext){
parent[index]=meta.bigPipeContext;
}else if(obj.__bbox){

parent[index]=obj.__bbox;
}else{
for(var key in obj){
replaceTransportMarkers(meta,obj,key);
}


if(obj.__map){
parent[index]=new Map(obj.__map);
}else if(obj.__set){
parent[index]=new Set(obj.__set);
}else if(obj.__imm){var _obj$__imm=
obj.__imm,method=_obj$__imm.method,value=_obj$__imm.value;


parent[index]=require.call(null,'immutable')[method](value);
}
}
}
}

module.exports=replaceTransportMarkers;}),null);
                                                                                                                        __d("ServerJSDefine",["BitMap","replaceTransportMarkers"],(function $module_ServerJSDefine(global,require,requireDynamic,requireLazy,module,exports){

















var USED_AS_TRANSPORT=0x2;
var NEEDS_DEFAULT_PARAMS=0x8;

var _dynamicModuleIndices=new(require("BitMap"))();



var ServerJSDefine=












{
getLoadedModuleHash:function getLoadedModuleHash(){
return _dynamicModuleIndices.toCompressedString();
},

handleDefine:function handleDefine(
moduleName,
deps,
data,
index,
relativeTo)
{

if(index>=0){
_dynamicModuleIndices.set(index);
}
define(moduleName,deps,function ServerJSDefinedModule(
_global,
_require,
_requireLazy,
_requireDynamic,
module)
{

var wrappedData={data:data};

require("replaceTransportMarkers")({relativeTo:relativeTo},wrappedData);

if(index===-42){

var key=
data!=null&&typeof data==='object'&&data.__throw8367__;
throw new Error(
moduleName+': '+(typeof key==='string'?key:''));

}




module.exports=wrappedData.data;

},USED_AS_TRANSPORT|NEEDS_DEFAULT_PARAMS);
},

handleDefines:function handleDefines(defines,relativeTo){
defines.forEach(function defines_forEach_$0(define){
var params;






if(relativeTo!=null){
params=[].concat(define,[relativeTo]);
}else{
params=[].concat(define,[null]);
}
ServerJSDefine.handleDefine.apply(null,params);
});
}};


module.exports=ServerJSDefine;}),null);
                                                                                  __d("__debug",[],(function $module___debug(global,require,requireDynamic,requireLazy,module,exports){
























module.exports={};}),null);
                                                                                                                        __d("ServerJS",["ContextualComponent","ErrorGuard","ServerJSDefine","ex","ge","replaceTransportMarkers","__debug"],(function $module_ServerJS(global,require,requireDynamic,requireLazy,module,exports){var c_ErrorGuard;
























var REQUIRE_WHEN_READY=0x1;
var USED_AS_TRANSPORT=0x2;
var NON_JS_DEPS_READY=0x10;

var _counter=0;var





























































ServerJS=function(){"use strict";





function ServerJS(){
this.$ServerJS_moduleMap={};
this.$ServerJS_relativeTo=null;
this.$ServerJS_moduleIDsToCleanup={};
this.$ServerJS_meta=undefined;
}var _proto=ServerJS.prototype;_proto.





















handle=function handle(data,meta){
return this.$ServerJS_handleImpl(data,meta,applyEach);
};_proto.

handleWithCustomApplyEach=function handleWithCustomApplyEach(
customApplyEach,




data,
meta)
{
this.$ServerJS_handleImpl(data,meta,customApplyEach);
};_proto.

$ServerJS_handleImpl=function $ServerJS_handleImpl(
data,
meta,
applyEachFn)




{
this.$ServerJS_meta=meta;
if(data.__guard!=null){
throw new Error(
'ServerJS.handle called on data that has already been handled');

}
data.__guard=true;






applyEachFn(data.define||[],this.$ServerJS_handleDefine,this);
applyEachFn(data.markup||[],this.$ServerJS_handleMarkup,this);
applyEachFn(data.elements||[],this.$ServerJS_handleElement,this);
this.$ServerJS_handleContexts(data.contexts||[]);
applyEachFn(data.instances||[],this.$ServerJS_handleInstance,this);
var cancelers=applyEachFn(
data.pre_display_requires||[],
this.$ServerJS_handleRequire,
this);

cancelers=cancelers.concat(
applyEachFn(data.require||[],this.$ServerJS_handleRequire,this));


return{
cancel:function cancel(){
cancelers.forEach(function cancelers_forEach_$0(canceler){
if(canceler){
canceler.cancel();
}
});
}};

};_proto.








handlePartial=function handlePartial(
data,
meta)
{var _this=this;
(data.instances||[]).forEach(function forEach_$0(module){
_addModuleNameAndIncPosition3(_this.$ServerJS_moduleMap,module);
});
(data.markup||[]).forEach(function forEach_$0(module){
_addModuleNameAndIncPosition2(_this.$ServerJS_moduleMap,module);
});
(data.elements||[]).forEach(function forEach_$0(module){
_addModuleNameAndIncPosition2(_this.$ServerJS_moduleMap,module);
});
return this.handle(data,meta);
};_proto.






setRelativeTo=function setRelativeTo(relativeElem){
this.$ServerJS_relativeTo=relativeElem;
return this;
};_proto.








cleanup=function cleanup(TimeSlice){
var modules=Object.keys(this.$ServerJS_moduleMap);

if(TimeSlice){


requireLazy.call(
null,
modules,
TimeSlice.guard(function TimeSlice_guard_$0(){},'SeverJS Cleanup requireLazy',{
propagationType:TimeSlice.PropagationType.ORPHAN}));


}else{


requireLazy.call(null,modules,function requireLazy_call_$2(){});
}

this.$ServerJS_moduleMap={};



function thrower(id){var _this$$ServerJS_modul=
this.$ServerJS_moduleIDsToCleanup[id],module=_this$$ServerJS_modul[0],method=_this$$ServerJS_modul[1],serverHash=_this$$ServerJS_modul[2];
delete this.$ServerJS_moduleIDsToCleanup[id];

var fnCall=method?
'JS::call("'+module+'", "'+method+'", ...)':
'JS::requireModule("'+module+'")';
var unresolvedDependencies=require('__debug').debugUnresolvedDependencies(
[module,id]);

var err=require("ex")(
'%s did not fire because it has missing dependencies.\n%s',
fnCall,
unresolvedDependencies);

if(__DEV__){



require.call(null,id);
}
throw _addServerHash(new Error(err),serverHash);
}

for(var id in this.$ServerJS_moduleIDsToCleanup){
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(thrower,this,[id],{
name:'ServerJS:cleanup id: '+id});

}
};_proto.





$ServerJS_handleDefine=function $ServerJS_handleDefine(
moduleName,
deps,
data,
index)
{
return(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
require("ServerJSDefine").handleDefine,require("ServerJSDefine"),

[moduleName,deps,data,index,this.$ServerJS_relativeTo],
{name:'JS::define'});

};_proto.













$ServerJS_handleRequire=function $ServerJS_handleRequire(
moduleName,
method,
deps,
args)
{
return(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
this.$ServerJS_handleRequireUnguarded,
this,
[moduleName,method,deps,args],
{name:method!=null?'JS::call':'JS::requireModule'});

};_proto.







$ServerJS_handleRequireUnguarded=function $ServerJS_handleRequireUnguarded(
moduleNameWithHash,
methodOrDepsInitial,
depsInitial,
args)
{var _moduleNameWithHash$s=
moduleNameWithHash.split('@'),moduleName=_moduleNameWithHash$s[0],serverHash=_moduleNameWithHash$s[1];

var deps;
var method;
if(typeof methodOrDepsInitial==='object'){
deps=methodOrDepsInitial;
}else{
deps=depsInitial;
method=methodOrDepsInitial;
}

var modules=[moduleName].concat(deps||[]);
var id;

if(method!=null){
id='__call__'+moduleName+'.'+method;
}else{
id='__requireModule__'+moduleName;
}
id+='__'+_counter++;



this.$ServerJS_moduleIDsToCleanup[id]=[moduleName,method,serverHash];

var bigPipeContext=this.$ServerJS_meta&&this.$ServerJS_meta.bigPipeContext;

var tempFactory=(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).guard(
function ServerJSHandleRequire(_module){








var module=require.call(null,moduleName);



delete this.$ServerJS_moduleIDsToCleanup[id];

args&&
require("replaceTransportMarkers")(
{
relativeTo:this.$ServerJS_relativeTo,
bigPipeContext:bigPipeContext},

args);

if(method!=null){
if(!module[method]){
throw _addServerHash(
new TypeError(
require("ex")('Module %s has no method "%s"',moduleName,method)),

serverHash);

}

module[method].apply(module,args||[]);


tempFactory.__SMmeta=module[method].__SMmeta||{};
tempFactory.__SMmeta.module=
tempFactory.__SMmeta.module||moduleName;
tempFactory.__SMmeta.name=tempFactory.__SMmeta.name||method;
}
}.bind(this),
{
name:
method!=null?
"JS::call('"+moduleName+"', '"+method+"', ...)":
"JS::requireModule('"+moduleName+"')"});



if(__DEV__){
if(tempFactory.length>1){
throw new Error(
'The module factory length is greater than 1 which will cause an '+
'extra require of its dependencies. It should be 0 but it can be 1 '+
'because static modules never get undefined but for everything '+
'else this will break the reference counting.');

}
}






var result=define(id,modules,tempFactory,REQUIRE_WHEN_READY|
NON_JS_DEPS_READY|
USED_AS_TRANSPORT,this,1,this.$ServerJS_meta);

return result;
};_proto.


















$ServerJS_handleInstance=function $ServerJS_handleInstance(
moduleName,
deps,
args,
refCount)
{
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
this.$ServerJS_handleInstanceUnguarded,
this,
[moduleName,deps,args,refCount],
{name:'JS::instance'});

};_proto.

$ServerJS_handleInstanceUnguarded=function $ServerJS_handleInstanceUnguarded(
moduleNameWithHash,
deps,
args,
refCount)
{
var constructor=null;var _moduleNameWithHash$s2=
moduleNameWithHash.split('@'),moduleName=_moduleNameWithHash$s2[0],serverHash=_moduleNameWithHash$s2[1];

if(deps){
var bigPipeContext=this.$ServerJS_meta&&this.$ServerJS_meta.bigPipeContext;
constructor=function ServerJSHandleInstance(){






var dep=require.call(null,deps[0]);

if(__DEV__){
var type=Object.prototype.toString.call(dep);
if(type!=='[object Function]'){
throw _addServerHash(
new Error(
require("ex")('%s does not export a function (got %s)',deps[0],type)),

serverHash);

}
}

require("replaceTransportMarkers")(
{
relativeTo:this.$ServerJS_relativeTo,
bigPipeContext:bigPipeContext},

args);

var instance=Object.create(dep.prototype);
dep.apply(instance,args);
return instance;
}.bind(this);
}

if(__DEV__){
if(constructor&&constructor.length>1){
throw _addServerHash(
new Error(
'The module factory length is greater than 1 which will cause an '+
'extra require of its dependencies. It should be 0 but it can be 1 '+
'because static modules never get undefined but for everything '+
'else this will break the reference counting.'),

serverHash);

}
}






define(moduleName,deps,constructor,USED_AS_TRANSPORT|
NON_JS_DEPS_READY,null,refCount);
};_proto.










$ServerJS_handleMarkup=function $ServerJS_handleMarkup(
moduleName,
markup,
refCount)
{
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
this.$ServerJS_handleMarkupUnguarded,
this,
[moduleName,markup,refCount],
{name:'JS::markup'});

};_proto.

$ServerJS_handleMarkupUnguarded=function $ServerJS_handleMarkupUnguarded(
moduleNameWithHash,
markup,
refCount)
{var _moduleNameWithHash$s3=
moduleNameWithHash.split('@'),moduleName=_moduleNameWithHash$s3[0],serverHash=_moduleNameWithHash$s3[1];


define(moduleName,['HTML'],function ServerJSMarkupModule(HTML){
try{
return HTML.replaceJSONWrapper(markup).getRootNode();
}catch(markupException){
throw _addServerHash(markupException,serverHash);
}
},NON_JS_DEPS_READY,null,refCount);
};_proto.







$ServerJS_handleElement=function $ServerJS_handleElement(
moduleName,
elementID,
refCount,
markupDependency)
{
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(
this.$ServerJS_handleElementUnguarded,
this,
[moduleName,elementID,refCount,markupDependency],
{name:'JS::element'});

};_proto.

$ServerJS_handleElementUnguarded=function $ServerJS_handleElementUnguarded(
moduleNameWithHash,
elementID,
refCountInitial,
markupDependency)
{var _moduleNameWithHash$s4=
moduleNameWithHash.split('@'),moduleName=_moduleNameWithHash$s4[0],serverHash=_moduleNameWithHash$s4[1];






if(elementID===null&&refCountInitial!=null){
define(moduleName,null,null,NON_JS_DEPS_READY,null,refCountInitial);
return;
}

var deps=[];
var special=NON_JS_DEPS_READY;















var refCount=refCountInitial||0;
if(markupDependency!=null){
deps.push(markupDependency);

special|=REQUIRE_WHEN_READY;
refCount++;
}

define(moduleName,deps,function ServerJSElementModule(rootNode){
var elem=require("ge")(elementID,rootNode);
if(!elem){
var extra='';
if(__DEV__){
extra=
'. This usually means that the element was sent as a string '+
'instead of XHP or JS::markup, or never rendered.';
}
throw _addServerHash(
new Error(require("ex")('Could not find element "%s"%s',elementID,extra)),
serverHash);

}
return elem;
},special,null,refCount);
};_proto.

$ServerJS_handleContexts=function $ServerJS_handleContexts(contexts){
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(this.$ServerJS_handleContextsUnguarded,this,[contexts],{
name:'ContextualComponents'});

};_proto.

$ServerJS_handleContextsUnguarded=function $ServerJS_handleContextsUnguarded(contexts){var _this2=this;




var bigPipeContext=this.$ServerJS_meta&&this.$ServerJS_meta.bigPipeContext;
contexts.
map(function contexts_map_$0(payload){
require("replaceTransportMarkers")(
{
relativeTo:_this2.$ServerJS_relativeTo,
bigPipeContext:bigPipeContext},

payload);

var element=payload[0];

return[payload,getDepthInDOMTree(element)];
}).
sort(function sort_$0(a,b){
return a[1]-b[1];
}).
forEach(function forEach_$0(tuple){var _tuple$=
tuple[0],element=_tuple$[0],isRoot=_tuple$[1];

require("ContextualComponent").register({element:element,isRoot:isRoot});
});
};return ServerJS;}();






function _addServerHash(error,serverHash){

error.serverHash=serverHash;
return error;
}







function applyEach(
arr,
handler,
context)
{
return arr.map(function ServerJSApplyEach(args){
return handler.apply(context,args);
});
}

function getDepthInDOMTree(element){
var depth=0;
var curr=element;
while(curr){
curr=curr.parentElement;
depth++;
}
return depth;
}



function _addModuleNameAndIncPosition2(
moduleMap,
module)


{
var moduleName=module[0];
if(!(moduleName in moduleMap)){
module[2]=(module[2]||0)+1;
}
moduleMap[moduleName]=true;
}

function _addModuleNameAndIncPosition3(
moduleMap,
module)
{
var moduleName=module[0];
if(!(moduleName in moduleMap)){
module[3]=(module[3]||0)+1;
}
moduleMap[moduleName]=true;
}

module.exports=ServerJS;}),null);
                                                                                         __d("bx",["invariant"],(function $module_bx(global,require,requireDynamic,requireLazy,module,exports,invariant){













var _map={};












function bx(path){
var uri=_map[path];
!!uri||invariant(0,'bx'+'(...): '+'Unknown file path "%s"',path);
return uri;
}





bx.add=function(map){
var warned=false;
for(var k in map){
if(!(k in _map)){
map[k].loggingID=k;
_map[k]=map[k];
}else if(__DEV__){
if(warned){
continue;
}

map[k].loggingID=k;
var newData=JSON.stringify(map[k]);
var curData=JSON.stringify(_map[k]);

if(curData===newData){
continue;
}


console.log(
k+": the binary resource data is different "+("("+



curData+" vs "+newData+"). ")+
'If your sandbox is stale, try refreshing it, '+
'otherwise please report the issue to Static Resources.');

warned=true;
}
}
};






bx.getURL=function(value){
return value.uri;
};

module.exports=bx;}),null);
                                                                                         __d("ix",["invariant"],(function $module_ix(global,require,requireDynamic,requireLazy,module,exports,invariant){




























var _map={};












function ix(path){
var img=_map[path];
!!img||invariant(0,'ix'+'(...): '+'Unknown image path "%s"',path);
return img;
}





ix.add=function(map){
var warned=false;

for(var k in map){
if(!(k in _map)){
map[k].loggingID=k;
_map[k]=map[k];
}else if(__DEV__){
if(warned){
continue;
}

map[k].loggingID=k;
var newData=JSON.stringify(map[k]);
var curData=JSON.stringify(_map[k]);

if(curData===newData){
continue;
}


console.log(
k+": the sprite data is different "+("("+



curData+" vs "+newData+"). ")+
'If your sandbox is stale, try refreshing it, '+
'otherwise please report the issue to Static Resources.');

warned=true;
}
}
};

module.exports=ix;}),null);
                                                                                         __d("objectEntries",[],(function $module_objectEntries(global,require,requireDynamic,requireLazy,module,exports){














function objectEntries(obj)


{
if(__DEV__){
if(obj instanceof Map){

console.error(
"objectEntries doesn't work on Map instances; use instance.entries() instead");

}
}
return Object.entries(obj);
}

module.exports=objectEntries;}),null);
                                                                                         __d("qex",["invariant","requireWeak"],(function $module_qex(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';
































var _map={};

var logged={};






















var qex={



_:function _(identifier){
var serverDatum=_map[identifier];

serverDatum!=null||invariant(0,
'qex(...): Unknown QE value "%s"',
identifier);var


r=serverDatum.r,l=serverDatum.l;
if(l!=null&&!logged[identifier]){
logged[identifier]=true;
require("requireWeak")('Banzai',function requireWeak_$1(Banzai){

Banzai.post('qex',{l:l});
});
}
return r;
},

add:function add(serverData){
for(var k in serverData){
if(!(k in _map)){
_map[k]=serverData[k];
}
}
}};



module.exports=qex;}),null);
                                                                                                                                                                                  __d("BootloaderEndpoint",["ix","Bootloader","BootloaderEndpointConfig","CSRFGuard","FBLogger","ServerJS","TimeSlice","bx","getAsyncParams","getSameOriginTransport","gkx","objectEntries","performanceAbsoluteNow","qex","setImmediateAcrossTransitions"],(function $module_BootloaderEndpoint(global,require,requireDynamic,requireLazy,module,exports,ix){

'use strict';var c_performanceAbsoluteNow;















































var _baseURI=require("BootloaderEndpointConfig").endpointURI;

var _requestID=0;
var _pendingSetImmediate=null;
var _pendingBlocking=new Map();
var _pendingNonblocking=new Map();

function _getURL(
blockingMods,
nonblockingMods)
{
var args={};
if(blockingMods.size){
args.modules=Array.from(blockingMods.keys()).join(',');
}
if(nonblockingMods.size){
args.nb_modules=Array.from(nonblockingMods.keys()).join(',');
}


var paramStr=Object.entries(babelHelpers["extends"]({},args,require("getAsyncParams")('GET'))).
map(
function map_$0(_ref){var k=_ref[0],v=_ref[1];return encodeURIComponent(k)+'='+encodeURIComponent(String(v));}).

join('&');

return _baseURI+(_baseURI.includes('?')?'&':'?')+paramStr;
}

function _sendRequest(
blockingMods,
nonblockingMods)
{
var uri=_getURL(blockingMods,nonblockingMods);
var xhr=require("getSameOriginTransport")();
var requestID=_requestID++;
var requestStart=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();


xhr.open('GET',uri,true);
var continuation=require("TimeSlice").getGuardedContinuation(
'Bootloader _requestHastePayload');

xhr.onreadystatechange=function(){
if(xhr.readyState!==4){
return;
}
continuation(function continuation_$0(){
var response=
xhr.status===200?
JSON.parse(require("CSRFGuard").clean(xhr.responseText)):
null;
if(response==null){
require("FBLogger")('bootloader').warn(
'Invalid response from %s: %s',
uri,
xhr.responseText.substr(0,256));

}else{
require("TimeSlice").guard(
function TimeSlice_guard_$0(){return(
_handleResponse(
uri,
response,
blockingMods,
nonblockingMods,
requestID,
requestStart));},

'Bootloader receiveEndpointData',
{propagationType:require("TimeSlice").PropagationType.CONTINUATION})();

}
});
};
xhr.send();
}




function _handleResponse(
uri,
response,
blockingMods,
nonblockingMods,
requestID,
requestStart)
{
if(response.__error){
require("FBLogger")('bootloader').warn(
'Fatal error from bootloader endpoint: %s',
uri);

return;
}
var responseStart=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();var

ixData=response.ixData,bxData=response.bxData,gkxData=response.gkxData,qexData=response.qexData;
if(ixData){
ix.add(ixData);
}
if(bxData){
require("bx").add(bxData);
}
if(gkxData){
require("gkx").add(gkxData);
}
if(qexData){
require("qex").add(qexData);
}var


jsmods=




response.jsmods,resource_map=response.resource_map,bootloadable=response.bootloadable,allResources=response.allResources,serverGenTime=response.serverGenTime;
if(resource_map){
require("Bootloader").setResourceMap(resource_map);
}
if(bootloadable){
require("Bootloader").enableBootload(bootloadable);
}

var blocking=new Map();
var jsmodsStart=0;
var jsmodsEnd=0;
require("Bootloader").loadResources(
require("Bootloader").getCSSResources(allResources||[]),
function Bootloader_loadResources_$1(){
jsmodsStart=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
new(require("ServerJS"))().handle(jsmods||{});
jsmodsEnd=c_performanceAbsoluteNow();var _arr=


[blockingMods,nonblockingMods];for(var _i=0;_i<_arr.length;_i++){var modules=_arr[_i];
for(var _iterator=modules.values(),_isArray=Array.isArray(_iterator),_i2=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray){if(_i2>=_iterator.length)break;_ref2=_iterator[_i2++];}else{_i2=_iterator.next();if(_i2.done)break;_ref2=_i2.value;}var hash=_ref2;
require("Bootloader").done(hash);
}
}
},
null,
blocking);


var all=new Map();
require("Bootloader").loadResources(
allResources||[],
function Bootloader_loadResources_$1(){var _arr2=
[blockingMods,nonblockingMods];for(var _i3=0;_i3<_arr2.length;_i3++){var modules=_arr2[_i3];
for(var _iterator2=modules.keys(),_isArray2=Array.isArray(_iterator2),_i4=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _serverGenTime;var _ref3;if(_isArray2){if(_i4>=_iterator2.length)break;_ref3=_iterator2[_i4++];}else{_i4=_iterator2.next();if(_i4.done)break;_ref3=_i4.value;}var _module=_ref3;
require("Bootloader").beDone(_module,requestID,{
requestStart:requestStart,
responseStart:responseStart,
serverGenTime:(_serverGenTime=serverGenTime)!=null?_serverGenTime:0,
jsmodsStart:jsmodsStart,
jsmodsEnd:jsmodsEnd,
blocking:blocking,
all:all});

}
}
},
null,
all);

}

function _processPending(){
var blockingMods=_pendingBlocking;
var nonblockingMods=_pendingNonblocking;

_pendingSetImmediate=null;
_pendingBlocking=new Map();
_pendingNonblocking=new Map();

_sendRequest(blockingMods,nonblockingMods);
}

var BootloaderEndpoint={




load:function load(module,blocking,hash){
(blocking?_pendingBlocking:_pendingNonblocking).set(module,hash);

if(require("BootloaderEndpointConfig").debugNoBatching){
_processPending();
return;
}

if(_pendingSetImmediate!=null){
return;
}
var continuation=require("TimeSlice").getGuardedContinuation(
'Schedule async batch request: Bootloader._loadResources');

_pendingSetImmediate=require("setImmediateAcrossTransitions")(function setImmediateAcrossTransitions_$0(){return(
continuation(function continuation_$0(){return _processPending();}));});

}};


module.exports=BootloaderEndpoint;}),null);
                                                                                         __d("promiseDone",["FBLogger","TAAL","setTimeoutAcrossTransitions"],function $module_promiseDone(global,require,requireDynamic,requireLazy,module,exports){











function promiseDone(
promise,
onFulfill,

onReject)
{
var errorLocation=new Error('promiseDone');
var finalPromise=
arguments.length>1?promise.then(onFulfill,onReject):promise;

finalPromise.then(null,function finalPromise_then_$1(err){
require("setTimeoutAcrossTransitions")(function setTimeoutAcrossTransitions_$0(){
if(err instanceof Error){
throw err;
}else{
errorLocation.message=require("TAAL").blameToPreviousFile(err);
throw errorLocation;
}
},0);
});
}

module.exports=promiseDone;},null);
                                                                                                                                                          __d("RequireDeferredReference",["Promise","requireCond","Bootloader","cr:696703","emptyFunction","ifRequireable","ifRequired","performanceNow","promiseDone","requireWeak"],(function $module_RequireDeferredReference(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceNow;
















var getModule=function getModule(module){return module;};var



RequireDeferredReference=function(){




function RequireDeferredReference(moduleId){
this.$RequireDeferredReference_moduleId=moduleId;
}var _proto=RequireDeferredReference.prototype;_proto.

getModuleId=function getModuleId(){

var id=this.$RequireDeferredReference_moduleId;
return id;
};_proto.

getModuleIdAsRef=function getModuleIdAsRef(){
return this.$RequireDeferredReference_moduleId;
};_proto.





__setRef=function __setRef(ref){
this.$RequireDeferredReference_ref=ref;
return this;
};_proto.

preload=function preload(){

};_proto.

getModuleIfRequired=function getModuleIfRequired(){


return require("ifRequired").call(null,this.$RequireDeferredReference_moduleId,getModule);
};_proto.

getModuleIfRequireable=function getModuleIfRequireable(){


return require("ifRequireable").call(null,this.$RequireDeferredReference_moduleId,getModule);
};_proto.

load=function load(){var _this=this;
var onEnd=require("ifRequireable")(
'm#CometInteractionTracingMetrics',
function ifRequireable_$1(CometInteractionTracingMetrics){return(
CometInteractionTracingMetrics.currentInteractionLogger().addRequireDeferred(
_this.getModuleId(),
(c_performanceNow||(c_performanceNow=require("performanceNow")))()));});


return new(require("Promise"))(function(res){


require("requireWeak").call(null,_this.getModuleId(),function requireWeak_call_$2(mod){
if(onEnd){
var alreadyRequired=false;
onEnd((c_performanceNow||(c_performanceNow=require("performanceNow")))(),alreadyRequired);
}
res(mod);
});
});
};_proto.

loadImmediately=function loadImmediately(callback){var _this$$RequireDeferre;
var callbackCalled=false;
var canceled=false;

function callbackOnce(mod){
if(callbackCalled||canceled){
return;
}
callbackCalled=true;
callback(mod);
}



var bootloaderSubscription=require("Bootloader").loadModules.call(require("Bootloader"),

[this.getModuleId()],
callbackOnce,(_this$$RequireDeferre=
this.$RequireDeferredReference_ref)!=null?_this$$RequireDeferre:'RequireDeferredReference.loadImmediately()');




require("requireWeak").call(null,this.getModuleId(),function requireWeak_call_$2(mod){
callbackOnce(mod);
});

return{
remove:function remove(){
if(!canceled){
canceled=true;
bootloaderSubscription.remove();
}
}};

};_proto.



onReadyImmediately=function onReadyImmediately(callback){var _this2=this;
var canceled=false;

var now=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var onEnd=require("ifRequireable")(
'm#CometInteractionTracingMetrics',
function ifRequireable_$1(CometInteractionTracingMetrics){return(
CometInteractionTracingMetrics.currentInteractionLogger().addRequireDeferred(
_this2.getModuleId(),
now));});



var moduleIfRequireable=this.getModuleIfRequireable();
if(moduleIfRequireable!=null){
if(onEnd){
var alreadyRequired=true;
onEnd(now,alreadyRequired);
}
callback(moduleIfRequireable);
}else{
var _alreadyRequired=false;
if(require("cr:696703")){
var priorityLevel=require("cr:696703").getCurrentPriorityLevel();
this.loadImmediately(function loadImmediately_$0(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
require("cr:696703").runWithPriority(priorityLevel,function JSScheduler_runWithPriority_$1(){
if(onEnd){
onEnd((c_performanceNow||(c_performanceNow=require("performanceNow")))(),_alreadyRequired);
}
!canceled&&callback.apply(undefined,args);
});
});
}else{
this.loadImmediately(function loadImmediately_$0(){
if(onEnd){
onEnd((c_performanceNow||(c_performanceNow=require("performanceNow")))(),_alreadyRequired);
}
!canceled&&callback.apply(undefined,arguments);
});
}
}

return{
remove:function remove(){
canceled=true;
}};

};_proto.

onReady=function onReady(callback){var _this3=this;
var canceled=false;

var moduleIfRequireable=this.getModuleIfRequireable();
var loadPromise=
moduleIfRequireable!=null?
require("Promise").resolve(moduleIfRequireable):
this.load();

if(moduleIfRequireable!=null){
var now=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var onEnd=require("ifRequireable")(
'm#CometInteractionTracingMetrics',
function ifRequireable_$1(CometInteractionTracingMetrics){return(
CometInteractionTracingMetrics.currentInteractionLogger().addRequireDeferred(
_this3.getModuleId(),
now));});


if(onEnd){
var alreadyRequired=true;
onEnd(now,alreadyRequired);
}
}

require("promiseDone")(loadPromise,function promiseDone_$1(){
!canceled&&callback.apply(undefined,arguments);
});

return{
remove:function remove(){
canceled=true;
}};

};return RequireDeferredReference;}();


module.exports=RequireDeferredReference;}),null);
                                                                                                                                 __d("requireDeferred",["RequireDeferredReference"],(function $module_requireDeferred(global,require,requireDynamic,requireLazy,module,exports){

'use strict';




var requireDeferredReferenceCache=


{};

function addToMap(
moduleId,
requireDeferredReference)
{




requireDeferredReferenceCache[moduleId]=requireDeferredReference;
}

function getFromMap(
moduleId)
{




return requireDeferredReferenceCache[moduleId];
}

function requireDeferred(
module)
{
var fromCache=getFromMap(module);
if(fromCache){
return fromCache;
}

var rDR=new(require("RequireDeferredReference"))(module);
addToMap(module,rDR);
return rDR;
}

module.exports=requireDeferred;}),null);
                                                                                                 __d("CurrentCommunity",["CurrentCommunityInitialData"],(function $module_CurrentCommunity(global,require,requireDynamic,requireLazy,module,exports){






var CurrentCommunity={
getID:function getID(){
return require("CurrentCommunityInitialData").COMMUNITY_ID||'0';
},

getName:function getName(){
return require("CurrentCommunityInitialData").COMMUNITY_NAME||'';
}};


module.exports=CurrentCommunity;}),null);
                                                                                  __d("DTSG",["invariant","DTSGInitialData"],(function $module_DTSG(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';







var token=require("DTSGInitialData").token||null;

var DTSG={
getToken:function getToken(){
return token;
},

setToken:function setToken(newToken){
token=newToken;
},

refresh:function refresh(){
false||invariant(0,'DTSG.refresh(): Not supported on www.');
}};


module.exports=DTSG;}),null);
                                                                                                        __d("isMessengerDotComURI",[],function $module_isMessengerDotComURI(global,require,requireDynamic,requireLazy,module,exports){




var messengerDotComURIRegex=new RegExp('(^|\\.)messenger\\.com$','i');

var PROTOCOLS=['https'];





function isMessengerDotComURI(uri){
if(uri.isEmpty()&&uri.toString()!=='#'){
return false;
}

if(!uri.getDomain()&&!uri.getProtocol()){
return false;
}

return(
ES(PROTOCOLS,"indexOf",true,uri.getProtocol())!==-1&&
messengerDotComURIRegex.test(uri.getDomain()));

}

module.exports=isMessengerDotComURI;},null);
                                                                                                              __d("isOculusDotComURI",[],(function $module_isOculusDotComURI(global,require,requireDynamic,requireLazy,module,exports){




var oculusDotComURIRegex=new RegExp('(^|\\.)oculus\\.com$','i');

var PROTOCOLS=['https'];





function isOculusDotComURI(uri){
if(uri.isEmpty()&&uri.toString()!=='#'){
return false;
}

if(!uri.getDomain()&&!uri.getProtocol()){
return false;
}

return(
PROTOCOLS.indexOf(uri.getProtocol())!==-1&&
oculusDotComURIRegex.test(uri.getDomain()));

}

module.exports=isOculusDotComURI;}),null);
                                                                                         __d("DTSGUtils",["SprinkleConfig","isCdnURI","isFacebookURI","isMessengerDotComURI","isOculusDotComURI","isWorkplaceDotComURI"],(function $module_DTSGUtils(global,require,requireDynamic,requireLazy,module,exports){

'use strict';















var DTSGUtils={
getNumericValue:function getNumericValue(token){

var numeric_dtsg_value=0;
for(var ii=0;ii<token.length;ii++){
numeric_dtsg_value+=token.charCodeAt(ii);
}
numeric_dtsg_value=numeric_dtsg_value.toString();

if(require("SprinkleConfig").should_randomize){
return numeric_dtsg_value;
}

return require("SprinkleConfig").version+numeric_dtsg_value;
},

shouldAppendToken:function shouldAppendToken(uri){
return(
!require("isCdnURI")(uri)&&
!uri.isSubdomainOfDomain('fbsbx.com')&&(
require("isFacebookURI")(uri)||
require("isMessengerDotComURI")(uri)||
require("isWorkplaceDotComURI")(uri)||
require("isOculusDotComURI")(uri)||
uri.isSubdomainOfDomain('freebasics.com')));

}};


module.exports=DTSGUtils;}),null);
                                                                                         __d("DTSG_ASYNC",["DTSGInitData"],(function $module_DTSG_ASYNC(global,require,requireDynamic,requireLazy,module,exports){

'use strict';





var token=require("DTSGInitData").async_get_token||null;

var DTSG_ASYNC={
getToken:function getToken(){
return token;
},

setToken:function setToken(newToken){
token=newToken;
}};


module.exports=DTSG_ASYNC;}),null);
                                                                  
__d("StaticSiteData",[],(function $module_StaticSiteData(global,require,requireDynamic,requireLazy,module,exports){

module.exports = {"pkg_cohort_key":"__pc","dpr_key":"dpr","be_one_ahead_key":"__beoa","spin_rev_key":"__spin_r","spin_time_key":"__spin_t","spin_branch_key":"__spin_b","spin_mhenv_key":"__spin_dev_mhenv","weblite_key":"__wblt","weblite_iframe_key":"__wbltif","kite_key":"_ktif","haste_session_id_key":"__hsi","jsmod_key":"__dyn","csr_key":"__csr","comet_key":"__comet_req"};

      }),null);
                                                                                         __d("asyncParams",[],(function $module_asyncParams(global,require,requireDynamic,requireLazy,module,exports){

var _data={};




var asyncParams={
add:function add(key,value){
_data[key]=value;
},

get:function get(){
return _data;
}};


module.exports=asyncParams;}),null);
                                                                                                                                                             __d("isSocialPlugin",["CSSCore"],(function $module_isSocialPlugin(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



function isSocialPlugin(){
return!!document.body&&require("CSSCore").hasClass(document.body,'plugin');
}

module.exports=isSocialPlugin;}),null);
                                                                                                 __d("getAsyncParams",["CSRBitMap","CurrentCommunity","CurrentUserInitialData","DTSG","DTSG_ASYNC","DTSGUtils","Env","ISB","LSD","ServerJSDefine","SiteData","SprinkleConfig","StaticSiteData","WebSession","asyncParams","isSocialPlugin"],(function $module_getAsyncParams(global,require,requireDynamic,requireLazy,module,exports){var c_CurrentUserInitialData;var c_Env;



















var _count=1;
var urlParams={
locale:true,
cxobfus:true,
js_debug:true,
cquick:true,
ctarget:true,
cquick_token:true,
wdplevel:true,
prod_graphql:true,
sri:true};








function getAsyncParams(
method)
{var _babelHelpers$extends;
var params=babelHelpers["extends"]({},
require("asyncParams").get(),(_babelHelpers$extends={

__user:(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).USER_ID,
__a:1},_babelHelpers$extends[




require("StaticSiteData").jsmod_key]=require("ServerJSDefine").getLoadedModuleHash(),_babelHelpers$extends[

require("StaticSiteData").csr_key]=require("CSRBitMap").toCompressedString(),_babelHelpers$extends.








__req=(_count++).toString(36),_babelHelpers$extends[
require("StaticSiteData").be_one_ahead_key]=require("SiteData").be_one_ahead?1:0,_babelHelpers$extends[
require("StaticSiteData").pkg_cohort_key]=require("SiteData").pkg_cohort,_babelHelpers$extends[
require("StaticSiteData").dpr_key]=require("SiteData").pr,_babelHelpers$extends.
__rev=require("SiteData").client_revision,_babelHelpers$extends.
__s=require("WebSession").getId(),_babelHelpers$extends[
require("StaticSiteData").haste_session_id_key]=require("SiteData").hsi,_babelHelpers$extends[
require("StaticSiteData").comet_key]=require("SiteData").is_comet?1:0,_babelHelpers$extends));


if(require("SiteData").force_blue){
params.force_blue=1;
}




window.location.search.
slice(1).
split('&').
forEach(function forEach_$0(param){var _param$split=
param.split('='),key=_param$split[0],val=_param$split[1];
if(
key.substr(0,4)==='tfc_'||
key.substr(0,4)==='tfi_'||
key.substr(0,3)==='mh_'||
urlParams[key]>-1)
{
params[key]=val;
}
});

if((c_Env||(c_Env=require("Env"))).isCQuick&&!params.cquick){
params['cquick']=(c_Env||(c_Env=require("Env"))).iframeKey;
params['ctarget']=c_Env.iframeTarget;
params['cquick_token']=c_Env.iframeToken;
}



if(method=='POST'){



var token=require("DTSG").getCachedToken?require("DTSG").getCachedToken():require("DTSG").getToken();
if(token){
params.fb_dtsg=token;
if(require("SprinkleConfig").param_name){
params[require("SprinkleConfig").param_name]=require("DTSGUtils").getNumericValue(token);
}
}

if(require("LSD").token){
params.lsd=require("LSD").token;
if(require("SprinkleConfig").param_name&&!token){
params[require("SprinkleConfig").param_name]=require("DTSGUtils").getNumericValue(
require("LSD").token);

}
}
}

if(method=='GET'){



var fb_dtsg_ag=require("DTSG_ASYNC").getCachedToken?
require("DTSG_ASYNC").getCachedToken():
require("DTSG_ASYNC").getToken();
if(fb_dtsg_ag){
params.fb_dtsg_ag=fb_dtsg_ag;
if(require("SprinkleConfig").param_name){
params[require("SprinkleConfig").param_name]=require("DTSGUtils").getNumericValue(
fb_dtsg_ag);

}
}
}



if(require("ISB").token){
params.fb_isb=require("ISB").token;
}

if(require("CurrentCommunity").getID()!=='0'){
params.__cid=require("CurrentCommunity").getID();
}


if(require("isSocialPlugin")()){
params.__sp=1;
}

if(require("SiteData").spin){var StaticSiteData;
params[(StaticSiteData=require("StaticSiteData")).spin_rev_key]=require("SiteData")[StaticSiteData.spin_rev_key];
params[StaticSiteData.spin_branch_key]=
require("SiteData")[StaticSiteData.spin_branch_key];
params[StaticSiteData.spin_time_key]=
require("SiteData")[StaticSiteData.spin_time_key];
if(require("SiteData")[require("StaticSiteData").spin_mhenv_key]){
params[require("StaticSiteData").spin_mhenv_key]=
require("SiteData")[require("StaticSiteData").spin_mhenv_key];
}
}

return params;
}

module.exports=getAsyncParams;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    __d("Alea",[],function $module_Alea(global,require,requireDynamic,requireLazy,module,exports){
















function Mash(){
var n=0xefc8249d;

var mash=function mash(data){
var dataStr=data.toString();
for(var i=0;i<dataStr.length;i++){
n+=dataStr.charCodeAt(i);
var h=0.02519603282416938*n;
n=h>>>0;
h-=n;
h*=n;
n=h>>>0;
h-=n;
n+=h*0x100000000;
}
return(n>>>0)*2.3283064365386963e-10;
};

mash.version='Mash 0.9';
return mash;
}_c=Mash;

function Alea()

{

var s0=0;
var s1=0;
var s2=0;
var c=1;for(var _len=arguments.length,seeds=new Array(_len),_key=0;_key<_len;_key++){seeds[_key]=arguments[_key];}

var args=seeds.length>0?seeds:[new Date()];
var mash=new Mash();
s0=mash(' ');
s1=mash(' ');
s2=mash(' ');

for(var i=0;i<args.length;i++){
s0-=mash(args[i]);
if(s0<0){
s0+=1;
}
s1-=mash(args[i]);
if(s1<0){
s1+=1;
}
s2-=mash(args[i]);
if(s2<0){
s2+=1;
}
}
mash=null;

var random=function random(){
var t=2091639*s0+c*2.3283064365386963e-10;
s0=s1;
s1=s2;

s2=t-(c=t|0);
return s2;
};
random.version='Alea 0.9';
random.args=args;
return random;
}_c2=Alea;

module.exports=Alea;var _c,_c2;$RefreshReg$(_c,"Mash");$RefreshReg$(_c2,"Alea");},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      __d("Random",["Alea","ServerNonce"],function $module_Random(global,require,requireDynamic,requireLazy,module,exports){

'use strict';


var NORM=4294967296;


var ServerNonce=require('ServerNonce').ServerNonce;

var fallbackRng;
function getFallbackRng(){
if(fallbackRng==null){
fallbackRng=require("Alea")(ServerNonce);
}
return fallbackRng;
}

var Random={
random:function(){
var buffer=
typeof Uint32Array==='function'?new Uint32Array(1):null;
var cryptoImpl=global.crypto||global.msCrypto;
if(buffer!=null){
try{
var getRandomValuesImpl=cryptoImpl==null?void 0:cryptoImpl.getRandomValues;
if(typeof getRandomValuesImpl==='function'){
var getRandomValues=ES(getRandomValuesImpl,"bind",true,cryptoImpl);
return function(){
try{
getRandomValues(buffer);
}catch(_unused){

return getFallbackRng()();
}
return buffer[0]/NORM;
};
}
}catch(_unused2){


}
}

return getFallbackRng();
}(),

uint32:function uint32(){
return Math.floor(this.random()*NORM);
},

coinflip:function coinflip(_coinflip){
if(_coinflip===0){
return false;
}

if(_coinflip<=1){
return true;
}
return Random.random()*_coinflip<=1;
}};


module.exports=Random;},null);
                                                                                                                          __d("WebSessionDefaultTimeoutMs",[],(function $module_WebSessionDefaultTimeoutMs(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







module.exports=35000;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  __d("WebSession",["FBLogger","Random","WebSessionDefaultTimeoutMs","WebStorage"],(function $module_WebSession(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_WebStorage;






var ENCODING_BASE=36;

var EXACT_CHARACTERS_IN_ID=6;
var MAX_VALUE=_c=Math.pow(ENCODING_BASE,EXACT_CHARACTERS_IN_ID);







function coerceExpiryTime(value){
if(value==null||Number.isFinite(value)===false||value<=0){
return null;
}
return value;
}

function coerceExpiryTimeString(value){
if(value==null){
return null;
}
var integerValue=parseInt(value,10);
if(""+integerValue!==value){
require("FBLogger")('web_session').warn(
'Expected the web session expiry time to parse as an integer. Found '+
'`%s`.',
String(value));

return null;
}
return coerceExpiryTime(integerValue);
}

function coerceId(value){
if(value==null){
return null;
}
if(value.length!==EXACT_CHARACTERS_IN_ID){
require("FBLogger")('web_session').warn(
'Expected the web session id to be a %d character string. It was %d '+
'character(s). Received `%s`.',
EXACT_CHARACTERS_IN_ID,
value.length,
value);

return null;
}
if(/^[a-z0-9]+$/.test(value)===false){
require("FBLogger")('web_session').warn(
'Expected the web session ID to be a base-%d encoded string. Received '+
'`%s`.',
ENCODING_BASE,
value);

return null;
}
return value;
}

function coerceSession(encodedValue){
if(encodedValue==null){
return null;
}
if(
typeof encodedValue!=='string'&&
encodedValue instanceof String===false)
{


require("FBLogger")('web_session').warn(
'A non-string value was passed to `coerceSession`. This should be '+
"impossible according to this method's Flow type. The value was `%s`.",
encodedValue);

return null;
}var _encodedValue$split=
encodedValue.split(':'),rawId=_encodedValue$split[0],rawExpiry=_encodedValue$split[1];
var putativeExpiryTime=coerceExpiryTimeString(rawExpiry);
var putativeId=coerceId(rawId);
if(putativeExpiryTime==null||putativeId==null){
return null;
}
return{expiryTime:putativeExpiryTime,id:putativeId};
}

function generateId(){





var value=Math.floor(require("Random").random()*MAX_VALUE);
var encodedValue=value.toString(ENCODING_BASE);
return(
'0'.repeat(EXACT_CHARACTERS_IN_ID-encodedValue.length)+encodedValue);

}

var _cachedPageId=null;
function getPageId(){
if(_cachedPageId==null){
_cachedPageId=generateId();
}
return _cachedPageId;
}

function getSession(evaluationTime){if(evaluationTime===void 0){evaluationTime=Date.now();}
























var storage=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getLocalStorageForRead();
if(storage==null){
return null;
}
var session=coerceSession(storage.getItem('Session'));
return session&&evaluationTime<session.expiryTime?session:null;
}

function getSessionId(){var _getSession;
return(_getSession=getSession())==null?void 0:_getSession.id;
}

function getTabId(){
var storage=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getSessionStorageForRead();
if(storage==null){
return null;
}
var putativeTabId=coerceId(storage.getItem('TabId'));
if(putativeTabId==null){
var storageForWrite=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getSessionStorage();
if(storageForWrite==null){
return null;
}
var newId=generateId();
storageForWrite.setItem('TabId',newId);
return newId;
}
return putativeTabId;
}

var WebSession={







extend:function extend(untilTime){var _untilTime;
if(untilTime!==undefined&&coerceExpiryTime(untilTime)==null){
require("FBLogger")('web_session').warn(
'`WebSession.extend()` was passed an invalid target expiry time `%s`.',
untilTime);

return;
}
var now=Date.now();
var nextExpiryTime=(_untilTime=untilTime)!=null?_untilTime:now+require("WebSessionDefaultTimeoutMs");
var session=getSession(now);
if(

session&&session.expiryTime>=nextExpiryTime||

nextExpiryTime<=now)
{
return;
}




var storageForWrite=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getLocalStorage();
if(storageForWrite!=null){
var nextId=session==null?generateId():session.id;
storageForWrite.setItem('Session',nextId+":"+nextExpiryTime);
}
},
getId:function getId(){var _getSessionId,_getTabId;
var pageId=getPageId();
var sessionId=(_getSessionId=getSessionId())!=null?_getSessionId:'';
var tabId=(_getTabId=getTabId())!=null?_getTabId:'';
return sessionId+":"+tabId+":"+pageId;
},
getPageId_DO_NOT_USE:function getPageId_DO_NOT_USE(){
return getPageId();
}};


module.exports=WebSession;var _c;$RefreshReg$(_c,"MAX_VALUE");}),null);
                                                                                                                                                                                                                                     __d("CookieConsent",["InitialCookieConsent"],(function $module_CookieConsent(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_InitialCookieConsent;



var deferCookies=(c_InitialCookieConsent||(c_InitialCookieConsent=require("InitialCookieConsent"))).deferCookies;
var _shouldShowCookieBanner=c_InitialCookieConsent.shouldShowCookieBanner;

var CookieConsent={
setConsented:function setConsented(){
deferCookies=false;
_shouldShowCookieBanner=false;
},

isDeferCookies:function isDeferCookies(){
return deferCookies;
},

isCookiesBlocked:function isCookiesBlocked(){
return(c_InitialCookieConsent||(c_InitialCookieConsent=require("InitialCookieConsent"))).noCookies;
},

shouldShowCookieBanner:function shouldShowCookieBanner(){
return _shouldShowCookieBanner;
}};


module.exports=CookieConsent;}),null);
                                                                                               __d("WebStorage",["CookieConsent","FBLogger","ex","gkx","repairLocalStorage"],(function $module_WebStorage(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_CookieConsent;















var storageCache={};
var storageCacheForRead={};










function getCachedStorage(
cache,
fn,
storageName)
{


if((c_CookieConsent||(c_CookieConsent=require("CookieConsent"))).isCookiesBlocked()||(c_CookieConsent||(c_CookieConsent=require("CookieConsent"))).isDeferCookies()){
return null;
}
if(storageName==='localStorage'){





var shouldRunLocalStorageRepairScript=false;
try{
shouldRunLocalStorageRepairScript=require("gkx")("946894");

}catch(_unused){}
if(shouldRunLocalStorageRepairScript){
require("repairLocalStorage")();
}
}
if(!Object.prototype.hasOwnProperty.call(storageCache,storageName)){
storageCache[storageName]=fn(storageName);
}
return storageCache[storageName];
}

function getStorageForRead(storageName){
try{

return window[storageName];
}catch(e){


require("FBLogger")('web_storage').warn(
'Failed to get storage for read %s',
e.message);

}
return null;
}

function getStorage(storageName){
try{

var storage=window[storageName];



if(storage){
var key='__test__'+Date.now();
storage.setItem(key,'');
storage.removeItem(key);
}
return storage;
}catch(e){
var explanation='';
if(__DEV__){
explanation=', see https://fburl.com/qa/i0vch3xq';
}
require("FBLogger")('web_storage').warn(
'Failed to get storage %s'+explanation,
e.message);

}
return null;
}




function getKeys(storage){
var keys=[];
for(var i=0;i<storage.length;i++){
keys.push(storage.key(i)||'');
}
return keys;
}




function setItemGuarded(storage,key,value){
if(storage==null){
return new Error('storage cannot be null');
}
var err=null;
try{
storage.setItem(key,value);
}catch(e){

var keys=getKeys(storage).map(function map_$0(key){
var len=(storage.getItem(key)||'').length;
return key+'('+len+')';
});
err=new Error(
require("ex")(
'%sStorage quota exceeded while setting %s(%s). '+
'Items(length) follows: %s',
e.name?e.name+': ':'',
key,
value.length,
keys.join()));


require("FBLogger")('web_storage').
catching(err).
mustfix('Error set item');
}
return err;
}

var WebStorage=





{
getLocalStorage:function getLocalStorage(){
return getCachedStorage(storageCache,getStorage,'localStorage');
},

getSessionStorage:function getSessionStorage(){
return getCachedStorage(storageCache,getStorage,'sessionStorage');
},






getLocalStorageForRead:function getLocalStorageForRead(){
return getCachedStorage(
storageCacheForRead,
getStorageForRead,
'localStorage');

},






getSessionStorageForRead:function getSessionStorageForRead(){
return getCachedStorage(
storageCacheForRead,
getStorageForRead,
'sessionStorage');

},

setItemGuarded:setItemGuarded};


module.exports=WebStorage;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       __d("repairLocalStorage",["requireDeferred"],(function $module_repairLocalStorage(global,require,requireDynamic,requireLazy,module,exports){

'use strict';


var BanzaiODSDeferredReference=require("requireDeferred")("BanzaiODS");


var ODS_CATEGORY_ID=3082;
var ODS_ENTITY_NAME='webstorage.localstorage.repair';
var ODS_SAMPLING_RATE=1/10000;

var log=function(){
var queuedEvents=[];
var logImpl=function logImpl(event){
queuedEvents.push(event);
};
var logFn=function logFn(event){
logImpl(event);
};


BanzaiODSDeferredReference.onReady(function BanzaiODSDeferredReference_onReady_$0(BanzaiODS){

BanzaiODS.setEntitySample(ODS_ENTITY_NAME,ODS_SAMPLING_RATE);
logImpl=function logImpl(event){
BanzaiODS.bumpEntityKey(ODS_CATEGORY_ID,ODS_ENTITY_NAME,event);
};
queuedEvents.forEach(logFn);
queuedEvents.length=0;
});
return logFn;
}();

var logFraction=function()



{
var queuedEvents=




[];
var logImpl=function logImpl(
event,
numerator,
denominator)
{
queuedEvents.push({denominator:denominator,event:event,numerator:numerator});
};
var logFn=function logFn(event,numerator,denominator){
logImpl(event,numerator,denominator);
};


BanzaiODSDeferredReference.onReady(function BanzaiODSDeferredReference_onReady_$0(BanzaiODS){

BanzaiODS.setEntitySample(ODS_ENTITY_NAME,ODS_SAMPLING_RATE);
logImpl=function logImpl(event,numerator,denominator){
BanzaiODS.bumpFraction(
ODS_CATEGORY_ID,
ODS_ENTITY_NAME,
event,
numerator,
denominator);

};
queuedEvents.forEach(function queuedEvents_forEach_$0(_ref){var denominator=_ref.denominator,event=_ref.event,numerator=_ref.numerator;return(
logFn(event,numerator,denominator));});

queuedEvents.length=0;
});
return logFn;
}();

var _hasPerformedRepair=false;
function repairLocalStorage(){
if(_hasPerformedRepair===true){
return;
}
_hasPerformedRepair=true;
var storageObject;
try{

storageObject=window.localStorage;
log('access_instance.success');
}catch(_unused){
log('access_instance.fataled');
return;
}
if(storageObject==null){
log('access_instance.found_null');
return;
}
var boundStorageObjectForFlow=storageObject;
['clear','getItem','removeItem','setItem'].forEach(function forEach_$0(poisonedKey){
var storedValue;
try{
storedValue=boundStorageObjectForFlow[poisonedKey];
log("access_stored_value.success."+poisonedKey);
logFraction("evaluate_stored_value.is_poisoned_pct."+
poisonedKey,
0,
1);

}catch(_unused2){
log("access_stored_value.failure."+poisonedKey);
return;
}
if(typeof storedValue==='string'){
try{
delete boundStorageObjectForFlow[poisonedKey];
log("delete_poisoned_key.success."+poisonedKey);
}catch(_unused3){
log("delete_poisoned_key.failed."+poisonedKey);
}
logFraction("evaluate_stored_value.is_poisoned_pct."+
poisonedKey,
1,
0);

}
});
}

module.exports=repairLocalStorage;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              __d("CookieStore",["CookieCoreLoggingConfig","FBLogger","Random","gkx","performanceNow","requireDeferred"],(function $module_CookieStore(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceNow;











var BanzaiScubaReference=require("requireDeferred")("BanzaiScuba");


































function formatSetCookieString(
now,
cookieName,
cookieValue,
path,
domain,
ttlMsec,
secure,
sameSite)
{
return(
cookieName+
'='+
encodeURIComponent(cookieValue)+
'; '+(
ttlMsec!==0&&ttlMsec!=undefined?
'expires='+new Date(now+ttlMsec).toUTCString()+'; ':
'')+
'path='+
path+
'; domain='+
domain+(
secure?'; secure':'')+(
sameSite?'; SameSite='+sameSite:''));

}


function clearCookieString(
cookieName,
path,
domain)
{
return(
cookieName+
'=; expires=Thu, 01-Jan-1970 00:00:01 GMT; '+
'path='+
path+
'; domain='+
domain);

}



function readCookieSlow(){
if(__DEV__){
var DEV_COOKIE_READ_TIME_LIMIT_MS=100;
var startTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var cookieText=document.cookie;
var duration=c_performanceNow()-startTime;


if(duration>DEV_COOKIE_READ_TIME_LIMIT_MS){
require("FBLogger")('cookie_infra').info("DEV cookie read really slow: "+
Math.round(duration)+" ms");

}
return cookieText;
}
if(require("CookieCoreLoggingConfig").sampleRate>0){
var _startTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var _cookieText=document.cookie;
var _duration=c_performanceNow()-_startTime;
var shouldLog=
_duration>require("CookieCoreLoggingConfig").maximumIgnorableStallMs&&
require("Random").coinflip(1/require("CookieCoreLoggingConfig").sampleRate);
if(shouldLog){
require("FBLogger")('cookie_infra').
addMetadata('COOKIE_INFRA','WALL_TIME',String(_duration)).
warn(
'Cookie read exceeded %s milliseconds.',
require("CookieCoreLoggingConfig").maximumIgnorableStallMs);

}
return _cookieText;
}else{
return document.cookie;
}
}var




CookieStoreSlow=function(){function CookieStoreSlow(){this.
$CookieStoreSlow_reads=0;}var _proto=CookieStoreSlow.prototype;_proto.

setCookie=function setCookie(
now,
name,
value,
path,
domain,
ttlMsec,
secure,
sameSite)
{
document.cookie=formatSetCookieString(
now,
name,
value,
path,
domain,
ttlMsec,
secure,
sameSite);

};_proto.

clearCookie=function clearCookie(name,path,domain){
document.cookie=clearCookieString(name,path,domain);
};_proto.

getCookie=function getCookie(name){
this.$CookieStoreSlow_reads++;
var startTime=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var match=readCookieSlow().match(
'(?:^|;\\s*)'+name+'=(.*?)(?:;|$)');

var duration=c_performanceNow()-startTime;
var sampleRate=1/require("CookieCoreLoggingConfig").sampleRateClassic;
var shouldLog=require("Random").coinflip(sampleRate);
if(shouldLog){
logCookieReadPerf(sampleRate,'classic',duration,this.$CookieStoreSlow_reads);
}



return match?decodeURIComponent(match[1]):null;
};return CookieStoreSlow;}();


function logCookieReadPerf(
sampleRate,
method,
durationMsec,
reads,
misses,
hit)
{
BanzaiScubaReference.onReady(function BanzaiScubaReference_onReady_$0(BanzaiScuba){
var sample=new BanzaiScuba('cookie_perf',null,{
addBrowserFields:true});

sample.addInteger('sample_rate',Math.floor(sampleRate));
sample.addNormal('type',method);
sample.addInteger('duration_usec',durationMsec*1000);
sample.addInteger('reads',reads);
if(typeof misses==='number'){
sample.addInteger('misses',misses);
}
if(typeof hit==='boolean'){
sample.addNormal('hit',hit);
}
sample.post();
});
}

var STALE_COOKIE_READ_TIME_LIMIT_MS=10*1000;var








CookieCache=function(){function CookieCache(){this.
$CookieCache_cookies={};this.



$CookieCache_updated=0;this.


$CookieCache_reads=0;this.
$CookieCache_misses=0;}var _proto2=CookieCache.prototype;_proto2.





setCookie=function setCookie(
now,
name,
value,
path,
domain,
ttlMsec,
secure,
sameSite)
{
document.cookie=formatSetCookieString(
now,
name,
value,
path,
domain,
ttlMsec,
secure,
sameSite);

this.$CookieCache_cookies[name]={
value:value,
updated:now};

};_proto2.

clearCookie=function clearCookie(name,path,domain){
document.cookie=clearCookieString(name,path,domain);
this.$CookieCache_cookies[name]={
value:null,
updated:Date.now()};

};_proto2.






getCookie=function getCookie(name){
var start=(c_performanceNow||(c_performanceNow=require("performanceNow")))();var _this$$CookieCache_ge=
this.$CookieCache_getCookie(name),cookie=_this$$CookieCache_ge.cookie,hit=_this$$CookieCache_ge.hit;
var sampleRate=1/require("CookieCoreLoggingConfig").sampleRateFastStale;
var shouldLog=require("Random").coinflip(sampleRate);
if(shouldLog){
var duration=(c_performanceNow||(c_performanceNow=require("performanceNow")))()-start;
logCookieReadPerf(
sampleRate,
'fast_stale',
duration,
this.$CookieCache_reads,
this.$CookieCache_misses,
hit);

}
return cookie;
};_proto2.

$CookieCache_getCookie=function $CookieCache_getCookie(
name)




{
var now=Date.now();
var cookie=this.$CookieCache_cookies[name];
if(!cookie){
if(this.$CookieCache_updated+STALE_COOKIE_READ_TIME_LIMIT_MS<now){

this.$CookieCache_pollCookies();
return{cookie:this.$CookieCache_getCookie(name).cookie,hit:false};
}


this.$CookieCache_reads++;
return{cookie:null,hit:true};
}

if(cookie.updated+STALE_COOKIE_READ_TIME_LIMIT_MS<now){

this.$CookieCache_pollCookies();
return{cookie:this.$CookieCache_getCookie(name).cookie,hit:false};
}


this.$CookieCache_reads++;
return{cookie:cookie.value,hit:true};
};_proto2.




$CookieCache_pollCookies=function $CookieCache_pollCookies(){
this.$CookieCache_misses++;
var names_values=readCookieSlow().split(';');


this.$CookieCache_updated=Date.now();
this.$CookieCache_cookies={};
for(var _iterator=names_values,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var name_value=_ref;
var match=name_value.match('\\s*([^=]+)=(.*)');
if(!match){
continue;
}
this.$CookieCache_cookies[match[1]]={
value:decodeURIComponent(match[2]),
updated:this.$CookieCache_updated};

}
};return CookieCache;}();


module.exports={
newCookieStore:function newCookieStore(){return(
require("gkx")("676837")?new CookieCache():new CookieStoreSlow());},
CookieCacheForTest:CookieCache,
CookieStoreSlowForTest:CookieStoreSlow};}),null);
                                                                                  __d("CookieCore",["CookieCoreConfig","CookieStore"],(function $module_CookieCore(global,require,requireDynamic,requireLazy,module,exports){











var DOMAIN_REGEX=/^.*(\.(facebook|messenger|oculus|instagram|facebookcorewwwi|workplace)\..*)$/i;
var JS_TO_HTTP_REGEX=/_js_(.*)/;



var _store;
function store(){
if(!_store){
_store=require("CookieStore").newCookieStore();
}
return _store;
}

function isFirstPartyContext(cookieName){
if(window.self!=window.top){
if(__DEV__){


console.info(
'Not setting %s cookie because we are not in a first party context',
cookieName);

}
return false;
}
return true;
}

var CookieCore={
set:function set(cookieName,cookieValue){
if(!isCookieValid(cookieName)){
return;
}

CookieCore.setWithoutChecks(
cookieName,
cookieValue,
getCookieTTLMillis(cookieName),
getCookiePath(cookieName),
shouldSecureCookie(cookieName),
getSameSiteAttribute(cookieName));

},







setWithoutChecks:function setWithoutChecks(
cookieName,
cookieValue,
nMilliSecs,
path,
secure,
sameSite)
{
var now=Date.now();

if(nMilliSecs!=null){
if(nMilliSecs>now){
if(__DEV__){

console.warn(
'%s is being set with an outrageous expiration, assuming you '+
'passed in the actual timestamp, and not the desired time period',
cookieName);

}
nMilliSecs-=now;
}else if(nMilliSecs==1){
CookieCore.clear(cookieName,path);
return;
}
}

store().setCookie(
now,
cookieName,
cookieValue,
path,
window.location.hostname.replace(DOMAIN_REGEX,'$1'),
nMilliSecs,
secure,
sameSite);

},


setIfFirstPartyContext:function setIfFirstPartyContext(
cookieName,
cookieValue)
{
if(!isFirstPartyContext(cookieName)){
return;
}
CookieCore.set(cookieName,cookieValue);
},







setWithoutChecksIfFirstPartyContext:function setWithoutChecksIfFirstPartyContext(
cookieName,
cookieValue,
nMilliSecs,
path,
secure)
{
if(!isFirstPartyContext(cookieName)){
return;
}
CookieCore.setWithoutChecks(
cookieName,
cookieValue,
nMilliSecs,
path,
secure);

},

clear:function clear(cookieName,path){if(path===void 0){path='/';}
path=path||'/';
store().clearCookie(
cookieName,
path,
window.location.hostname.replace(DOMAIN_REGEX,'$1'));

},

get:function get(name){
if(!isCookieValid(name)){
return null;
}
return store().getCookie(name);
}};















function parseCookieConfig(config){
return{
insecure:config.i||false,
path:config.p||'/',
ttlSeconds:config.t||0,
sameSite:config.s||'None'};

}

function getCookieConfig(cookieName){
if(require("CookieCoreConfig")[cookieName]!==undefined){
return parseCookieConfig(require("CookieCoreConfig")[cookieName]);
}
var js_cookie_name=cookieName.match(JS_TO_HTTP_REGEX);
if(js_cookie_name&&js_cookie_name.length>1){
return getCookieConfig(js_cookie_name[1]);
}
return null;
}

function isCookieValid(cookieName){
return getCookieConfig(cookieName)!==null;
}

function shouldSecureCookie(cookieName){
var config=getCookieConfig(cookieName);
if(config==null){
return true;
}
return!config.insecure;
}

function getCookieTTLMillis(cookieName){
var config=getCookieConfig(cookieName);
if(config==null){
return null;
}
return config.ttlSeconds*1000;
}

function getCookiePath(cookieName){
var config=getCookieConfig(cookieName);
if(config==null){
return'/';
}
return config.path;
}

function getSameSiteAttribute(cookieName){
var config=getCookieConfig(cookieName);
if(config==null||config.sameSite==null){
return null;
}
return config.sameSite;
}

module.exports=CookieCore;}),null);
                                                                                               __d("Cookie",["Bootloader","CookieConsent","CookieCore"],(function $module_Cookie(global,require,requireDynamic,requireLazy,module,exports){var c_CookieConsent;






function hasCookieConsent(cookieName){
if((c_CookieConsent||(c_CookieConsent=require("CookieConsent"))).isDeferCookies()){
if(__DEV__){

console.warn(
"Not setting the %s cookie because the user hasn't consented yet",
cookieName);

}

require("Bootloader").loadModules(['BanzaiODS'],function Bootloader_loadModules_$1(BanzaiODS){
BanzaiODS.bumpEntityKey(




2966,
'defer_cookies',
'set.'+cookieName);

},"Cookie");

return false;
}

return true;
}

function canUseCookieInEnvironment(){




return!(c_CookieConsent||(c_CookieConsent=require("CookieConsent"))).isCookiesBlocked();
}







function set(cookieName,cookieValue){
if(!canUseCookieInEnvironment()||!hasCookieConsent(cookieName)){
return;
}
require("CookieCore").set(cookieName,cookieValue);
}








function setWithoutCheckingUserConsent_DANGEROUS(
cookieName,
cookieValue)
{
if(!canUseCookieInEnvironment()){
return;
}
require("CookieCore").set(cookieName,cookieValue);
}





function setWithoutChecks(
cookieName,
cookieValue,
nMilliSecs,
path,
secure)
{
if(!canUseCookieInEnvironment()||!hasCookieConsent(cookieName)){
return;
}
require("CookieCore").setWithoutChecks(
cookieName,
cookieValue,
nMilliSecs,
path,
secure);

}

module.exports=babelHelpers["extends"]({},require("CookieCore"),{

set:set,
setWithoutChecks:setWithoutChecks,
setWithoutCheckingUserConsent_DANGEROUS:setWithoutCheckingUserConsent_DANGEROUS});}),null);
                                                                                                              __d("CurrentUser",["Cookie","CurrentUserInitialData"],(function $module_CurrentUser(global,require,requireDynamic,requireLazy,module,exports){var c_CurrentUserInitialData;




var CurrentUser=
















{






getID:function getID(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).USER_ID;
},






getAccountID:function getAccountID(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).ACCOUNT_ID;
},







getEmployeeWorkUserID:function getEmployeeWorkUserID(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).WORK_USER_ID;
},




getName:function getName(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).NAME;
},




getShortName:function getShortName(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).SHORT_NAME;
},




isLoggedIn:function isLoggedIn(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).USER_ID!=='0';
},







isLoggedInNow:function isLoggedInNow(){
if(!CurrentUser.isLoggedIn()){
return false;
}




if((c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_INTERN_SITE){
return true;
}



if((c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_WORK_USER){
return true;
}


if(
(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).ORIGINAL_USER_ID!=null&&
(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).ORIGINAL_USER_ID!='')
{
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).ORIGINAL_USER_ID===require("Cookie").get('c_user');
}

return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).USER_ID===require("Cookie").get('c_user');
},




isEmployee:function isEmployee(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_EMPLOYEE;
},




isTestUser:function isTestUser(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_TEST_USER;
},






hasWorkUser:function hasWorkUser(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).HAS_WORK_USER;
},




isWorkUser:function isWorkUser(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_WORK_USER;
},




isGray:function isGray(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_GRAY;
},




isUnderage:function isUnderage(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_UNDERAGE;
},




isMessengerOnlyUser:function isMessengerOnlyUser(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_MESSENGER_ONLY_USER;
},




isDeactivatedAllowedOnMessenger:function isDeactivatedAllowedOnMessenger(){
return!!(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).IS_DEACTIVATED_ALLOWED_ON_MESSENGER;
},




getAppID:function getAppID(){
return(c_CurrentUserInitialData||(c_CurrentUserInitialData=require("CurrentUserInitialData"))).APP_ID;
}};


module.exports=CurrentUser;}),null);
                                                                                                                           __d("Run",["requireCond","cr:925100"],(function $module_Run(global,require,requireDynamic,requireLazy,module,exports){

'use strict';








module.exports=require("cr:925100");}),null);
                                                                                         __d("VersionRange",["invariant"],(function $module_VersionRange(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';



var componentRegex=/\./;
var orRegex=/\|\|/;
var rangeRegex=/\s+\-\s+/;
var modifierRegex=/^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
var numericRegex=/^(\d*)(.*)/;





function checkOrExpression(range,version){
var expressions=range.split(orRegex);

if(expressions.length>1){
return expressions.some(function expressions_some_$0(range){return VersionRange.contains(range,version);});
}else{
return checkRangeExpression(expressions[0].trim(),version);
}
}





function checkRangeExpression(range,version){
var expressions=range.split(rangeRegex);


expressions.length>0&&expressions.length<=2||invariant(0,
'the "-" operator expects exactly 2 operands');


if(expressions.length===1){
return checkSimpleExpression(expressions[0],version);
}else{var
startVersion=expressions[0],endVersion=expressions[1];

isSimpleVersion(startVersion)&&isSimpleVersion(endVersion)||invariant(0,
'operands to the "-" operator must be simple (no modifiers)');


return(
checkSimpleExpression('>='+startVersion,version)&&
checkSimpleExpression('<='+endVersion,version));

}
}





function checkSimpleExpression(startRange,version){
var range=startRange.trim();
if(range===''){
return true;
}

var versionComponents=version.split(componentRegex);var _getModifierAndCompon=
getModifierAndComponents(range),modifier=_getModifierAndCompon.modifier,rangeComponents=_getModifierAndCompon.rangeComponents;
switch(modifier){
case'<':
return checkLessThan(versionComponents,rangeComponents);
case'<=':
return checkLessThanOrEqual(versionComponents,rangeComponents);
case'>=':
return checkGreaterThanOrEqual(versionComponents,rangeComponents);
case'>':
return checkGreaterThan(versionComponents,rangeComponents);
case'~':
case'~>':
return checkApproximateVersion(versionComponents,rangeComponents);
default:
return checkEqual(versionComponents,rangeComponents);}

}




function checkLessThan(a,b){
return compareComponents(a,b)===-1;
}




function checkLessThanOrEqual(a,b){
var result=compareComponents(a,b);
return result===-1||result===0;
}




function checkEqual(a,b){
return compareComponents(a,b)===0;
}




function checkGreaterThanOrEqual(a,b){
var result=compareComponents(a,b);
return result===1||result===0;
}




function checkGreaterThan(a,b){
return compareComponents(a,b)===1;
}






function checkApproximateVersion(a,b){
var lowerBound=b.slice();
var upperBound=b.slice();

if(upperBound.length>1){
upperBound.pop();
}
var lastIndex=upperBound.length-1;
var numeric=parseInt(upperBound[lastIndex],10);
if(isNumber(numeric)){
upperBound[lastIndex]=numeric+1+'';
}

return checkGreaterThanOrEqual(a,lowerBound)&&checkLessThan(a,upperBound);
}








function getModifierAndComponents(
range)




{
var rangeComponents=range.split(componentRegex);
var matches=rangeComponents[0].match(modifierRegex);
matches||invariant(0,'expected regex to match but it did not');

return{
modifier:matches[1],
rangeComponents:[matches[2]].concat(rangeComponents.slice(1))};

}




function isNumber(number){
return!isNaN(number)&&isFinite(number);
}





function isSimpleVersion(range){
return!getModifierAndComponents(range).modifier;
}




function zeroPad(array,length){
for(var i=array.length;i<length;i++){
array[i]='0';
}
}










function normalizeVersions(
initA,
initB)
{
var a=initA.slice();
var b=initB.slice();

zeroPad(a,b.length);


for(var i=0;i<b.length;i++){
var matches=b[i].match(/^[x*]$/i);
if(matches){
b[i]=a[i]='0';


if(matches[0]==='*'&&i===b.length-1){
for(var j=i;j<a.length;j++){
a[j]='0';
}
}
}
}

zeroPad(b,a.length);

return[a,b];
}









function compareNumeric(a,b){
var aMatches=a.match(numericRegex);
var bMatches=b.match(numericRegex);
var aPrefix=aMatches&&aMatches[1];
var bPrefix=bMatches&&bMatches[1];
var aNumeric=parseInt(aPrefix,10);
var bNumeric=parseInt(bPrefix,10);

if(isNumber(aNumeric)&&isNumber(bNumeric)&&aNumeric!==bNumeric){
return compare(aNumeric,bNumeric);
}else{
return compare(a,b);
}
}







function compare(a,b){
typeof a===typeof b||invariant(0,'"a" and "b" must be of the same type');

if(typeof a==='string'&&typeof b==='string'){
if(a>b){
return 1;
}else if(a<b){
return-1;
}else{
return 0;
}
}
if(typeof a==='number'&&typeof b==='number'){
if(a>b){
return 1;
}else if(a<b){
return-1;
}else{
return 0;
}
}
typeof a===typeof b||invariant(0,'"a" and "b" must be of the same type');
return 0;
}







function compareComponents(a,b){var _normalizeVersions=
normalizeVersions(a,b),aNormalized=_normalizeVersions[0],bNormalized=_normalizeVersions[1];

for(var i=0;i<bNormalized.length;i++){
var result=compareNumeric(aNormalized[i],bNormalized[i]);
if(result){
return result;
}
}

return 0;
}

var VersionRange={



























contains:function contains(range,version){
return checkOrExpression(range.trim(),version.trim());
}};


module.exports=VersionRange;}),null);
                                                                                         __d("mapObject",[],(function $module_mapObject(global,require,requireDynamic,requireLazy,module,exports){

'use strict';


















function mapObject(






object,
callback,
context)
{
if(!object){


return null;
}

var result={};
Object.keys(object).forEach(function forEach_$0(name){
result[name]=callback.call(context,object[name],name,object);
});
return result;
}





function mapObjectUntyped(
object,


callback,
context)
{
return mapObject(object,callback,context);
}






function mapObjectShape(



object,mapper,context){
return mapObject(object,mapper,context);
}

mapObject.untyped=mapObjectUntyped;
mapObject.shape=mapObjectShape;
module.exports=mapObject;}),null);
                                                                                         __d("UserAgent",["UserAgentData","VersionRange","mapObject","memoizeStringOnly"],(function $module_UserAgent(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_mapObject;
















function compare(name,version,query,normalizer){

if(name===query){
return true;
}


if(!query.startsWith(name)){
return false;
}


var range=query.slice(name.length);
if(version!=null){
range=normalizer?normalizer(range):range;
return require("VersionRange").contains(range,version);
}

return false;
}










function normalizePlatformVersion(version){
if(require("UserAgentData").platformName==='Windows'){
return version.replace(/^\s*NT/,'');
}

return version;
}







var UserAgent={











































isBrowser:function isBrowser(query){
return compare(
require("UserAgentData").browserName,
require("UserAgentData").browserFullVersion,
query);

},









isBrowserArchitecture:function isBrowserArchitecture(query){
return compare(require("UserAgentData").browserArchitecture,null,query);
},

























isDevice:function isDevice(query){
return compare(require("UserAgentData").deviceName,null,query);
},























isEngine:function isEngine(query){
return compare(
require("UserAgentData").engineName,
require("UserAgentData").engineVersion,
query);

},




































isPlatform:function isPlatform(query){
return compare(
require("UserAgentData").platformName,
require("UserAgentData").platformFullVersion,
query,
normalizePlatformVersion);

},









isPlatformArchitecture:function isPlatformArchitecture(query){
return compare(require("UserAgentData").platformArchitecture,null,query);
}};


module.exports=(c_mapObject||(c_mapObject=require("mapObject")))(UserAgent,require("memoizeStringOnly"));}),null);
                                                                              __d("getCrossOriginTransport",["invariant","ExecutionEnvironment","ex"],(function $module_getCrossOriginTransport(global,require,requireDynamic,requireLazy,module,exports,invariant){








function getCrossOriginTransport(){
if(!require("ExecutionEnvironment").canUseDOM){
throw new Error(
require("ex")(
'getCrossOriginTransport: %s',
'Cross origin transport unavailable in the server environment.'));


}

try{
var transport=new XMLHttpRequest();
if(
!('withCredentials'in transport)&&
typeof XDomainRequest!=='undefined')
{
transport=new XDomainRequest();
}
return transport;
}catch(error){
throw new Error(require("ex")('getCrossOriginTransport: %s',error.message));
}
}

getCrossOriginTransport.withCredentials=function(){
var transport=getCrossOriginTransport();

'withCredentials'in transport||invariant(0,
'getCrossOriginTransport: Client does not support `withCredentials`.');

var _open=transport.open;
transport.open=function(){
_open.apply(this,arguments);
this.withCredentials=true;
};
return transport;
};

module.exports=getCrossOriginTransport;}),null);
                                                                                  __d("ZeroRewrites",["URI","ZeroRewriteRules","getCrossOriginTransport","getSameOriginTransport","isFacebookURI"],(function $module_ZeroRewrites(global,require,requireDynamic,requireLazy,module,exports){var c_URI;












var ZeroRewrites={
rewriteURI:function rewriteURI(uri){
if(!require("isFacebookURI")(uri)||ZeroRewrites._isWhitelisted(uri)){
return uri;
}

var new_subdomain=ZeroRewrites._getRewrittenSubdomain(uri);
if(new_subdomain!==null&&new_subdomain!==undefined){
uri=uri.setSubdomain(new_subdomain);
}
return uri;
},


getTransportBuilderForURI:function getTransportBuilderForURI(uri){
return ZeroRewrites.isRewritten(uri)?
require("getCrossOriginTransport").withCredentials:require("getSameOriginTransport");

},




isRewriteSafe:function isRewriteSafe(uri){
if(
Object.keys(require("ZeroRewriteRules").rewrite_rules).length===0||
!require("isFacebookURI")(uri))
{
return false;
}
var current_domain=ZeroRewrites._getCurrentURI().getDomain();
var new_domain=new(c_URI||(c_URI=require("URI")))(uri).qualify().getDomain();

return current_domain===new_domain||ZeroRewrites.isRewritten(uri);
},

isRewritten:function isRewritten(uri){
uri=uri.getQualifiedURI();
if(
Object.keys(require("ZeroRewriteRules").rewrite_rules).length===0||
!require("isFacebookURI")(uri)||
ZeroRewrites._isWhitelisted(uri))
{
return false;
}

var new_subdomain=uri.getSubdomain();
var current_uri=ZeroRewrites._getCurrentURI();

var current_subdomain_rewritten=ZeroRewrites._getRewrittenSubdomain(
current_uri);


return(
uri.getDomain()!==current_uri.getDomain()&&
new_subdomain===current_subdomain_rewritten);

},

_isWhitelisted:function _isWhitelisted(uri){
var path=uri.getPath();
if(!path.endsWith('/')){
path+='/';
}
return require("ZeroRewriteRules").whitelist&&require("ZeroRewriteRules").whitelist[path]===1;
},

_getRewrittenSubdomain:function _getRewrittenSubdomain(uri){
var subdomain=uri.getQualifiedURI().getSubdomain();
return require("ZeroRewriteRules").rewrite_rules[subdomain];
},


_getCurrentURI:function _getCurrentURI(){
return new(c_URI||(c_URI=require("URI")))('/').qualify();
}};


module.exports=ZeroRewrites;}),null);
                                                                                         __d("once",[],(function $module_once(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







function once(
fn)
{
var wrapper=makeWrapper(fn);

for(var prop in fn){
if(Object.prototype.hasOwnProperty.call(fn,prop)){
wrapper[prop]=fn[prop];
}
}

return wrapper;
}




function makeWrapper(
fn)
{
var fnToWrap=fn;
var returnValue;

var wrapper=function wrapper(){
if(fnToWrap){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
returnValue=fnToWrap.apply(this,args);
fnToWrap=null;
}
return returnValue;
};

return wrapper;
}

module.exports=once;}),null);
                                                                                                                                                                         __d("BanzaiAdapter",["Arbiter","BanzaiConsts","CurrentUser","ErrorGuard","Run","URI","UserAgent","ZeroRewrites","getAsyncParams","gkx","once","BanzaiConfig"],(function $module_BanzaiAdapter(global,require,requireDynamic,requireLazy,module,exports){var c_ErrorGuard;var c_URI;var c_BanzaiConsts;

















var inflight=[];
var _arbiter=new(require("Arbiter"))();




































var ENDPOINT='/ajax/bz';
var METHOD='POST';



var adapter={
config:require("BanzaiConfig"),
endpoint:ENDPOINT,
useBeacon:true,

getExtraParams:function getExtraParams(
_use_with_beacon)
{
return require("getAsyncParams")(METHOD);
},

getUserID:function getUserID(){
return require("CurrentUser").getID();
},

inform:function inform(message){
_arbiter.inform(message);
},

subscribe:function subscribe(event_type,callback){
return _arbiter.subscribe(event_type,callback);
},

cleanup:function cleanup(){
var reqs=inflight;
inflight=[];
reqs.forEach(function reqs_forEach_$0(req){
if(req.readyState<4){
req.abort();
}
});
},

preferredCompressionMethod:require("once")(function once_$0(){
return(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(function ErrorGuard_applyWithGuard_$0(){return require("gkx")("1278639");},null,[])?
'snappy':
'snappy_base64';
}),

readyToSend:function readyToSend(){


return require("UserAgent").isBrowser('IE <= 8')||navigator.onLine;
},

send:function send(payload,onSuccess,onError,signal){
var uri=require("ZeroRewrites").rewriteURI(new(c_URI||(c_URI=require("URI")))(ENDPOINT));
var xhr=require("ZeroRewrites").getTransportBuilderForURI(uri)();
xhr.open(METHOD,uri.toString(),true);

xhr.onreadystatechange=function(){
if(xhr.readyState>=4){
var index=inflight.indexOf(xhr);
if(index>=0){
inflight.splice(index,1);
}







var stat;
try{
stat=xhr.status;
}catch(_unused){
stat=0;
}

if(stat==200){
if(onSuccess){
onSuccess();
}
if(!signal){
adapter.inform((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).OK);
}
}else{
if(onError){
onError(stat);
}
if(!signal){
adapter.inform((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).ERROR);
}
}
}
};

inflight.push(xhr);


xhr.send(payload,false);
},

setHooks:function setHooks(delegate){








},

setUnloadHook:function setUnloadHook(delegate){
require("Run").onAfterUnload(delegate._unload);
},

onUnload:function onUnload(callback){
require("Run").onAfterUnload(callback);
},

isOkToSendViaBeacon:function isOkToSendViaBeacon(){
return true;
}};


module.exports=adapter;}),null);
                                                                                                                                                                                                                                                          
__d("SnappyCompress",[],(function $module_SnappyCompress(global,require,requireDynamic,requireLazy,module,exports){
                                                                                                                                                                                                                                                                                                                                                                                             
                        
  
                                 
  
                                                                               
                                                                                
                                                                               
                                                                            
                                                                        
                                                           
  
                                                                                 
                                                  
  
                                                                             
                                                                           
                                                                              
                                                                         
                                                                                
                                                                                
            

                        
  
                                 
  
                                                                               
                                                                                
                                                                               
                                                                            
                                                                        
                                                           
  
                                                                                 
                                                  
  
                                                                             
                                                                           
                                                                              
                                                                         
                                                                                
                                                                                
            

'use strict'

function isNode () {
  if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
      if (typeof process.versions.node !== 'undefined') {
        return true
      }
    }
  }
  return false
}

function isUint8Array (object) {
  return object instanceof Uint8Array && (!isNode() || !Buffer.isBuffer(object))
}

function isArrayBuffer (object) {
  return object instanceof ArrayBuffer
}

function isBuffer (object) {
  if (!isNode()) {
    return false
  }
  return Buffer.isBuffer(object)
}

var TYPE_ERROR_MSG = 'Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array'

function uncompress (compressed) {
  if (!isUint8Array(compressed) && !isArrayBuffer(compressed) && !isBuffer(compressed)) {
    throw new TypeError(TYPE_ERROR_MSG)
  }
  var uint8Mode = false
  var arrayBufferMode = false
  if (isUint8Array(compressed)) {
    uint8Mode = true
  } else if (isArrayBuffer(compressed)) {
    arrayBufferMode = true
    compressed = new Uint8Array(compressed)
  }
  var decompressor = new SnappyDecompressor(compressed)
  var length = decompressor.readUncompressedLength()
  if (length === -1) {
    throw new Error('Invalid Snappy bitstream')
  }
  var uncompressed, uncompressedView
  if (uint8Mode) {
    uncompressed = new Uint8Array(length)
    if (!decompressor.uncompressToBuffer(uncompressed)) {
      throw new Error('Invalid Snappy bitstream')
    }
  } else if (arrayBufferMode) {
    uncompressed = new ArrayBuffer(length)
    uncompressedView = new Uint8Array(uncompressed)
    if (!decompressor.uncompressToBuffer(uncompressedView)) {
      throw new Error('Invalid Snappy bitstream')
    }
  } else {
    uncompressed = Buffer.alloc(length)
    if (!decompressor.uncompressToBuffer(uncompressed)) {
      throw new Error('Invalid Snappy bitstream')
    }
  }
  return uncompressed
}

function compress (uncompressed) {
  if (!isUint8Array(uncompressed) && !isArrayBuffer(uncompressed) && !isBuffer(uncompressed)) {
    throw new TypeError(TYPE_ERROR_MSG)
  }
  var uint8Mode = false
  var arrayBufferMode = false
  if (isUint8Array(uncompressed)) {
    uint8Mode = true
  } else if (isArrayBuffer(uncompressed)) {
    arrayBufferMode = true
    uncompressed = new Uint8Array(uncompressed)
  }
  var compressor = new SnappyCompressor(uncompressed)
  var maxLength = compressor.maxCompressedLength()
  var compressed, compressedView
  var length
  if (uint8Mode) {
    compressed = new Uint8Array(maxLength)
    length = compressor.compressToBuffer(compressed)
  } else if (arrayBufferMode) {
    compressed = new ArrayBuffer(maxLength)
    compressedView = new Uint8Array(compressed)
    length = compressor.compressToBuffer(compressedView)
  } else {
    compressed = Buffer.alloc(maxLength)
    length = compressor.compressToBuffer(compressed)
  }



                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
  if (!compressed.slice) {        
    var compressedArray = new Uint8Array(Array.prototype.slice.call(compressed, 0, length));
    if (uint8Mode) {
      return compressedArray;
    } else if (arrayBufferMode) {
      return compressedArray.buffer;
    } else {
      throw new Error("not implemented");
    }
  }
                                                              
                                                              
                                                              


  return compressed.slice(0, length)
}

var BLOCK_LOG = 16
var BLOCK_SIZE = 1 << BLOCK_LOG

var MAX_HASH_TABLE_BITS = 14
var globalHashTables = new Array(MAX_HASH_TABLE_BITS + 1)

function hashFunc (key, hashFuncShift) {
  return (key * 0x1e35a7bd) >>> hashFuncShift
}

function load32 (array, pos) {
  return array[pos] + (array[pos + 1] << 8) + (array[pos + 2] << 16) + (array[pos + 3] << 24)
}

function equals32 (array, pos1, pos2) {
  return array[pos1] === array[pos2] &&
         array[pos1 + 1] === array[pos2 + 1] &&
         array[pos1 + 2] === array[pos2 + 2] &&
         array[pos1 + 3] === array[pos2 + 3]
}

function copyBytes (fromArray, fromPos, toArray, toPos, length) {
  var i
  for (i = 0; i < length; i++) {
    toArray[toPos + i] = fromArray[fromPos + i]
  }
}

function emitLiteral (input, ip, len, output, op) {
  if (len <= 60) {
    output[op] = (len - 1) << 2
    op += 1
  } else if (len < 256) {
    output[op] = 60 << 2
    output[op + 1] = len - 1
    op += 2
  } else {
    output[op] = 61 << 2
    output[op + 1] = (len - 1) & 0xff
    output[op + 2] = (len - 1) >>> 8
    op += 3
  }
  copyBytes(input, ip, output, op, len)
  return op + len
}

function emitCopyLessThan64 (output, op, offset, len) {
  if (len < 12 && offset < 2048) {
    output[op] = 1 + ((len - 4) << 2) + ((offset >>> 8) << 5)
    output[op + 1] = offset & 0xff
    return op + 2
  } else {
    output[op] = 2 + ((len - 1) << 2)
    output[op + 1] = offset & 0xff
    output[op + 2] = offset >>> 8
    return op + 3
  }
}

function emitCopy (output, op, offset, len) {
  while (len >= 68) {
    op = emitCopyLessThan64(output, op, offset, 64)
    len -= 64
  }
  if (len > 64) {
    op = emitCopyLessThan64(output, op, offset, 60)
    len -= 60
  }
  return emitCopyLessThan64(output, op, offset, len)
}

function compressFragment (input, ip, inputSize, output, op) {
  var hashTableBits = 1
  while ((1 << hashTableBits) <= inputSize &&
         hashTableBits <= MAX_HASH_TABLE_BITS) {
    hashTableBits += 1
  }
  hashTableBits -= 1
  var hashFuncShift = 32 - hashTableBits

  if (typeof globalHashTables[hashTableBits] === 'undefined') {
    globalHashTables[hashTableBits] = new Uint16Array(1 << hashTableBits)
  }
  var hashTable = globalHashTables[hashTableBits]
  var i
  for (i = 0; i < hashTable.length; i++) {
    hashTable[i] = 0
  }

  var ipEnd = ip + inputSize
  var ipLimit
  var baseIp = ip
  var nextEmit = ip

  var hash, nextHash
  var nextIp, candidate, skip
  var bytesBetweenHashLookups
  var base, matched, offset
  var prevHash, curHash
  var flag = true

  var INPUT_MARGIN = 15
  if (inputSize >= INPUT_MARGIN) {
    ipLimit = ipEnd - INPUT_MARGIN

    ip += 1
    nextHash = hashFunc(load32(input, ip), hashFuncShift)

    while (flag) {
      skip = 32
      nextIp = ip
      do {
        ip = nextIp
        hash = nextHash
        bytesBetweenHashLookups = skip >>> 5
        skip += 1
        nextIp = ip + bytesBetweenHashLookups
        if (ip > ipLimit) {
          flag = false
          break
        }
        nextHash = hashFunc(load32(input, nextIp), hashFuncShift)
        candidate = baseIp + hashTable[hash]
        hashTable[hash] = ip - baseIp
      } while (!equals32(input, ip, candidate))

      if (!flag) {
        break
      }

      op = emitLiteral(input, nextEmit, ip - nextEmit, output, op)

      do {
        base = ip
        matched = 4
        while (ip + matched < ipEnd && input[ip + matched] === input[candidate + matched]) {
          matched += 1
        }
        ip += matched
        offset = base - candidate
        op = emitCopy(output, op, offset, matched)

        nextEmit = ip
        if (ip >= ipLimit) {
          flag = false
          break
        }
        prevHash = hashFunc(load32(input, ip - 1), hashFuncShift)
        hashTable[prevHash] = ip - 1 - baseIp
        curHash = hashFunc(load32(input, ip), hashFuncShift)
        candidate = baseIp + hashTable[curHash]
        hashTable[curHash] = ip - baseIp
      } while (equals32(input, ip, candidate))

      if (!flag) {
        break
      }

      ip += 1
      nextHash = hashFunc(load32(input, ip), hashFuncShift)
    }
  }

  if (nextEmit < ipEnd) {
    op = emitLiteral(input, nextEmit, ipEnd - nextEmit, output, op)
  }

  return op
}

function putVarint (value, output, op) {
  do {
    output[op] = value & 0x7f
    value = value >>> 7
    if (value > 0) {
      output[op] += 0x80
    }
    op += 1
  } while (value > 0)
  return op
}

function SnappyCompressor (uncompressed) {
  this.array = uncompressed
}

SnappyCompressor.prototype.maxCompressedLength = function () {
  var sourceLen = this.array.length
  return 32 + sourceLen + Math.floor(sourceLen / 6)
}

SnappyCompressor.prototype.compressToBuffer = function (outBuffer) {
  var array = this.array
  var length = array.length
  var pos = 0
  var outPos = 0

  var fragmentSize

  outPos = putVarint(length, outBuffer, outPos)
  while (pos < length) {
    fragmentSize = Math.min(length - pos, BLOCK_SIZE)
    outPos = compressFragment(array, pos, fragmentSize, outBuffer, outPos)
    pos += fragmentSize
  }

  return outPos
}

var WORD_MASK = [0, 0xff, 0xffff, 0xffffff, 0xffffffff]

function copyBytes (fromArray, fromPos, toArray, toPos, length) {
  var i
  for (i = 0; i < length; i++) {
    toArray[toPos + i] = fromArray[fromPos + i]
  }
}

function selfCopyBytes (array, pos, offset, length) {
  var i
  for (i = 0; i < length; i++) {
    array[pos + i] = array[pos - offset + i]
  }
}

function SnappyDecompressor (compressed) {
  this.array = compressed
  this.pos = 0
}

SnappyDecompressor.prototype.readUncompressedLength = function () {
  var result = 0
  var shift = 0
  var c, val
  while (shift < 32 && this.pos < this.array.length) {
    c = this.array[this.pos]
    this.pos += 1
    val = c & 0x7f
    if (((val << shift) >>> shift) !== val) {
      return -1
    }
    result |= val << shift
    if (c < 128) {
      return result
    }
    shift += 7
  }
  return -1
}

SnappyDecompressor.prototype.uncompressToBuffer = function (outBuffer) {
  var array = this.array
  var arrayLength = array.length
  var pos = this.pos
  var outPos = 0

  var c, len, smallLen
  var offset

  while (pos < array.length) {
    c = array[pos]
    pos += 1
    if ((c & 0x3) === 0) {
                
      len = (c >>> 2) + 1
      if (len > 60) {
        if (pos + 3 >= arrayLength) {
          return false
        }
        smallLen = len - 60
        len = array[pos] + (array[pos + 1] << 8) + (array[pos + 2] << 16) + (array[pos + 3] << 24)
        len = (len & WORD_MASK[smallLen]) + 1
        pos += smallLen
      }
      if (pos + len > arrayLength) {
        return false
      }
      copyBytes(array, pos, outBuffer, outPos, len)
      pos += len
      outPos += len
    } else {
      switch (c & 0x3) {
        case 1:
          len = ((c >>> 2) & 0x7) + 4
          offset = array[pos] + ((c >>> 5) << 8)
          pos += 1
          break
        case 2:
          if (pos + 1 >= arrayLength) {
            return false
          }
          len = (c >>> 2) + 1
          offset = array[pos] + (array[pos + 1] << 8)
          pos += 2
          break
        case 3:
          if (pos + 3 >= arrayLength) {
            return false
          }
          len = (c >>> 2) + 1
          offset = array[pos] + (array[pos + 1] << 8) + (array[pos + 2] << 16) + (array[pos + 3] << 24)
          pos += 4
          break
        default:
          break
      }
      if (offset === 0 || offset > outPos) {
        return false
      }
      selfCopyBytes(outBuffer, outPos, offset, len)
      outPos += len
    }
  }
  return true
}

module.exports.uncompress = uncompress
module.exports.compress = compress

      }),null);
                                                                                                                                                  __d("SnappyCompressUtil",["SnappyCompress"],(function $module_SnappyCompressUtil(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var SnappyCompressUtil={
compressUint8ArrayToSnappy:function compressUint8ArrayToSnappy(buffer){
if(buffer==null){
return null;
}

var compressed=null;
try{
compressed=require("SnappyCompress").compress(buffer);
}catch(_unused){
return null;
}


var out='';
for(var i=0;i<compressed.length;i++){
out+=String.fromCharCode(compressed[i]);
}

return global.btoa(out);
},







compressStringToSnappy:function compressStringToSnappy(s){
if(global.Uint8Array===undefined||global.btoa===undefined){
return null;
}

var buffer=new global.Uint8Array(s.length);
for(var i=0;i<s.length;i++){

var charCode=s.charCodeAt(i);
if(charCode>127){

return null;
}
buffer[i]=charCode;
}
return SnappyCompressUtil.compressUint8ArrayToSnappy(buffer);
},

compressStringToSnappyBinary:function compressStringToSnappyBinary(s){
if(global.Uint8Array===undefined){
return null;
}

var buffer=null;
if(global.TextEncoder!==undefined){
buffer=new TextEncoder().encode(s);
}else{
buffer=new global.Uint8Array(s.length);
for(var i=0;i<s.length;i++){

var charCode=s.charCodeAt(i);
if(charCode>127){

return null;
}
buffer[i]=charCode;
}
}

var compressed=null;
try{
compressed=require("SnappyCompress").compress(buffer);
}catch(_unused2){
return null;
}
return compressed;
}};


module.exports=SnappyCompressUtil;}),null);
                                                                                                                          __d("BanzaiCompressionUtils",["Promise","FBLogger","SnappyCompressUtil","once","performanceNow"],(function $module_BanzaiCompressionUtils(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_performanceNow;









var supportsCompressionStream=require("once")(function once_$0(){
if(global.CompressionStream==null){
return false;
}
if(global.Response==null){
return false;
}
try{
var _cs=new global.CompressionStream('deflate');
}catch(_unused){
return false;
}
return true;
});

var BanzaiCompressionUtils={
compressWad:function compressWad(wad,preferred_compression_method){
if(wad.needs_compression!==true){
delete wad.needs_compression;
return;
}

if(preferred_compression_method==='deflate'){


BanzaiCompressionUtils.compressWad(wad,'snappy');
return;
}

var start_compress=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var stringified=JSON.stringify(wad.posts);
var compressed;
switch(preferred_compression_method){
case'snappy':
compressed=require("SnappyCompressUtil").compressStringToSnappyBinary(
stringified);

break;
case'snappy_base64':
compressed=require("SnappyCompressUtil").compressStringToSnappy(stringified);
break;
default:
break;}


if(compressed!=null&&compressed.length<stringified.length){
wad.posts=compressed;
wad.compression=preferred_compression_method;
wad.snappy_ms=Math.ceil((c_performanceNow||(c_performanceNow=require("performanceNow")))()-start_compress);
if(wad.snappy_ms<0){
require("FBLogger")('BanzaiCompressionUtils').warn(
'Expected positive snappy_ms but got %s',
wad.snappy_ms);

}
}else{
wad.compression='';
}
delete wad.needs_compression;
},

compressWadAsync:function compressWadAsync(
wad,
preferred_compression_method)
{
if(preferred_compression_method!=='deflate'){
BanzaiCompressionUtils.compressWad(wad,'snappy');
return require("Promise").resolve();
}


if(!supportsCompressionStream()){
return BanzaiCompressionUtils.compressWadAsync(wad,'snappy');
}

var start_compress=(c_performanceNow||(c_performanceNow=require("performanceNow")))();
var stringified=JSON.stringify(wad.posts);
var stream=new Response(stringified).body;
if(!stream){
wad.compression='';
delete wad.needs_compression;
return require("Promise").resolve();
}

var compressed_stream=stream.pipeThrough(
new global.CompressionStream('deflate'));


return new Response(compressed_stream).
arrayBuffer().
then(function then_$0(compressed){
if(compressed.byteLength<stringified.length){
wad.posts=new Uint8Array(compressed);
wad.compression=preferred_compression_method;
wad.snappy_ms=Math.ceil((c_performanceNow||(c_performanceNow=require("performanceNow")))()-start_compress);
if(wad.snappy_ms<0){
require("FBLogger")('BanzaiCompressionUtils').warn(
'Expected positive snappy_ms but got %s',
wad.snappy_ms);

}
}else{
wad.compression='';
}
delete wad.needs_compression;
})["catch"](
function $0(){
wad.compression='';
delete wad.needs_compression;
});
},





outOfBandsPosts:function outOfBandsPosts(payload){
var counter=0;
var blobs={};
for(var _iterator=payload,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var wad=_ref;
var needsOutOfBandPosts=
wad.compression==='snappy'||wad.compression==='deflate';
if(needsOutOfBandPosts){
var blob=new Blob([wad.posts],{type:'application/octet-stream'});
wad.posts=String(counter);
blobs['post_'+String(counter)]=blob;
counter++;
}
}
return blobs;
}};


module.exports=BanzaiCompressionUtils;}),null);
                                                                                  __d("BanzaiBase",["BanzaiAdapter","BanzaiCompressionUtils","BanzaiConsts","BanzaiLazyQueue","CurrentUser","ErrorGuard","FBLogger","WebSession"],(function $module_BanzaiBase(global,require,requireDynamic,requireLazy,module,exports){var c_BanzaiConsts;var c_ErrorGuard;
















































































































var BANZAI_ODS_ROUTE='categorized_ods';
var BANZAI_ODS_BEACON_FAILURE='blue_send_via_beacon_failure';
var BANZAI_ODS_MESSAGES_RECEIVED='blue_messages_received';
var BANZAI_ODS_MESSAGES_SENT='blue_messages_sent';
var BANZAI_ODS_TOTAL_MESSAGES_RECEIVED='blue_total_messages_received';
var BANZAI_ODS_TOTAL_MESSAGES_SENT='blue_total_messages_sent';


var READY=0;
var INFLIGHT=1;
var SENT=2;

var ods_message={
received:BANZAI_ODS_MESSAGES_RECEIVED,
sent:BANZAI_ODS_MESSAGES_SENT};


var token=null;

var nextSend;

var postBuffer=[];

var triggerRoute=null;

var postReceivedCounter=0;

var signalSentCounter=0;

var postReceivedTotal=0;

var postSentTotal=0;


function retryPost(inp_post,httpStatus){

var post=inp_post;

post.__meta.status=READY;
post[3]=(post[3]||0)+1;





if(!post.__meta.retry&&httpStatus>=400&&httpStatus<600){
postBuffer.push(inp_post);
}
}




var Banzai={
_canSend:function _canSend(post){
return(
post[2]>=
Banzai._getEventTime()-(
require("BanzaiAdapter").config.EXPIRY||(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).EXPIRY));

},

_clearPostBuffer:function _clearPostBuffer(){
postBuffer=[];
},












_gatherWadsAndPostsFromBuffer:function _gatherWadsAndPostsFromBuffer(
inflightWads,
inflightPosts,
keepRetryable,
posts,
maxPosts)
{if(maxPosts===void 0){maxPosts=null;}
var wadMap={};

var numPosts=posts.length;
var batchFull=false;
var filtered_posts=posts.filter(function posts_filter_$0(post,idx){
if(batchFull){
return true;
}

var m=post.__meta;


if(m.status>=SENT||!Banzai._canSend(post)){
return false;
}


if(m.status>=INFLIGHT){
return true;
}


var needs_compression=m.compress!=null?m.compress:true;

var hash=
(m.webSessionId!=null?m.webSessionId:'null')+(
m.userID!=null?m.userID:'null')+(
m.appID!=null?m.appID:'null')+(
needs_compression?'compress':'');
var wad=wadMap[hash];
if(!wad){
wad={
user:m.userID,
webSessionId:m.webSessionId,
app_id:m.appID,
posts:[],
needs_compression:needs_compression};

wadMap[hash]=wad;
inflightWads.push(wad);
}


m.status=INFLIGHT;
wad.posts.push(post);
inflightPosts.push(post);

if(maxPosts!=null&&maxPosts>0){
maxPosts--;
if(maxPosts==0){
batchFull=true;
if(idx<numPosts-1){


Banzai._schedule(0);
}
}
}



return keepRetryable&&m.retry;
});

if(inflightPosts.length+signalSentCounter+postReceivedCounter!==0){

postReceivedCounter+=2;
var postSentCounter=inflightPosts.length+signalSentCounter+2;
postReceivedTotal+=2;
postSentTotal+=inflightPosts.length+2;

Banzai.counterTracker(
'received',
postReceivedCounter,
inflightWads,
inflightPosts);


Banzai.counterTracker(
'sent',
postSentCounter,
inflightWads,
inflightPosts);

}
postReceivedCounter=0;
signalSentCounter=0;

return filtered_posts;
},

_getEventTime:function _getEventTime(){
return Date.now();
},

_getWebSessionId:function _getWebSessionId(){
return require("WebSession").getId();
},

_getPostBuffer:function _getPostBuffer(){
return postBuffer;
},




_getStorage:function _getStorage()



{
return{
store:function store(){},
restore:function restore(){},
flush:function flush(){}};

},

_getUserId:function _getUserId(){
return require("CurrentUser").getID();
},

_getAppId:function _getAppId(){
return require("CurrentUser").getAppID();
},





_initialize:function _initialize(){},





_sendBeacon:function _sendBeacon(endpoint,payload){
return global.navigator.sendBeacon(endpoint,payload);
},

_prepForTransit:function _prepForTransit(
payload,
use_with_beacon)
{
var formData=new FormData();
formData.append('ts',String(Date.now()));

var extra_params=require("BanzaiAdapter").getExtraParams(use_with_beacon);
Object.keys(extra_params).
sort().
forEach(function forEach_$0(key){
var value=extra_params[key];

if(value===undefined){
return;
}

if(value===null){
formData.append(key,'');
return;
}
formData.append(key,String(value));
});

var outOfBandsPosts=require("BanzaiCompressionUtils").outOfBandsPosts(payload);
Object.keys(outOfBandsPosts).forEach(function forEach_$0(key){
formData.append(key,outOfBandsPosts[key]);
});

formData.append('q',JSON.stringify(payload));
return formData;
},

_prepWadForTransit:function _prepWadForTransit(wad){
require("BanzaiCompressionUtils").compressWad(
wad,
require("BanzaiAdapter").preferredCompressionMethod());

},

_processCallbacksAndSendViaBeacon:function _processCallbacksAndSendViaBeacon(){
var posts=[];
var inflightWads=[];
var inflightPosts=[];
Banzai._gatherWadsAndPostsFromBuffer(
inflightWads,
inflightPosts,
true,
posts);

if(inflightWads.length>0){
inflightWads[0].send_method='beacon';
inflightWads.map(Banzai._prepWadForTransit);
var payload=Banzai._prepForTransit(inflightWads,true);
var success=Banzai._sendBeacon(Banzai.adapter.endpoint,payload);

if(!success){
require("FBLogger")('banzai').warn('Error sending beacon');
}
}
},

_resetPostStatus:function _resetPostStatus(post){
post.__meta.status=READY;
},




_restore:function _restore(unstash){
var storage=Banzai._getStorage();
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(storage.restore,storage,[]);

Banzai._schedule(
require("BanzaiAdapter").config.RESTORE_WAIT||(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).VITAL_WAIT);

},








_schedule:function _schedule(ms){
var t=Banzai._getEventTime()+ms;
if(!nextSend||t<nextSend){
nextSend=t;

if(token){

global.clearTimeout(token);
}
token=global.setTimeout(function global_setTimeout_$0(){
Banzai._sendWithCallbacks();
},ms);
return true;
}
return false;
},

_sendWithCallbacks:function _sendWithCallbacks(
onSuccess,
onError,
batchSize)
{

nextSend=null;
Banzai._schedule(Banzai.BASIC.delay);


if(!require("BanzaiAdapter").readyToSend()){
if(onError){
onError();
}
return;
}


if(Banzai.isEnabled('flush_storage_periodically')){
var storage=Banzai._getStorage();
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(storage.flush,storage,[]);
}


require("BanzaiAdapter").inform((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).SEND);

var inflightWads=[];
var inflightPosts=[];
postBuffer=Banzai._gatherWadsAndPostsFromBuffer(
inflightWads,
inflightPosts,
true,
postBuffer,
batchSize);




if(inflightWads.length<=0){

require("BanzaiAdapter").inform((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).OK);
if(onSuccess){
onSuccess();
}
return;
}






inflightWads[0].trigger=triggerRoute;
triggerRoute=null;

inflightWads[0].send_method='ajax';

inflightWads.map(Banzai._prepWadForTransit);
require("BanzaiAdapter").send(
Banzai._prepForTransit(inflightWads,false),
function BanzaiAdapter_send_$1(){

inflightPosts.forEach(function inflightPosts_forEach_$0(post){
var post_with_meta=post;
post_with_meta.__meta.status=SENT;
if(post_with_meta.__meta.callback){
post_with_meta.__meta.callback();
}
});
if(onSuccess){
onSuccess();
}
},
function BanzaiAdapter_send_$2(httpStatus){


inflightPosts.forEach(function inflightPosts_forEach_$0(post){
retryPost(post,httpStatus);
});

if(onError){
onError();
}
});

},




_store:function _store(unstash){
var storage=Banzai._getStorage();
(c_ErrorGuard||(c_ErrorGuard=require("ErrorGuard"))).applyWithGuard(storage.store,storage,[]);
},




_testState:function _testState()


{
return{
postBuffer:postBuffer,
triggerRoute:triggerRoute};

},




_tryToSendViaBeacon:function _tryToSendViaBeacon(){

if(
!(
navigator&&
navigator.sendBeacon&&
require("BanzaiAdapter").isOkToSendViaBeacon()))

{
return false;
}

var inflightWads=[];
var inflightPosts=[];
postBuffer=Banzai._gatherWadsAndPostsFromBuffer(
inflightWads,
inflightPosts,
false,
postBuffer);


if(inflightWads.length<=0){
return false;
}

inflightWads[0].send_method='beacon';
inflightWads.map(Banzai._prepWadForTransit);

var payload=Banzai._prepForTransit(inflightWads,true);
var success=Banzai._sendBeacon(Banzai.adapter.endpoint,payload);

if(!success){var _banzai;


inflightPosts.forEach(function inflightPosts_forEach_$0(post){
postBuffer.push(post);
});


postBuffer.push(
Banzai._wrapData(
BANZAI_ODS_ROUTE,
{
'2979':{
banzai:(_banzai={},_banzai[
BANZAI_ODS_BEACON_FAILURE]=[1],_banzai)}},



Banzai._getEventTime()));


return false;
}
return true;
},




_unload:function _unload(){var _banzai2,_banzai3;

postReceivedTotal+=2;
postSentTotal+=2;

var messages_received_total_post=Banzai._wrapData(
BANZAI_ODS_ROUTE,
{
'2979':{
banzai:(_banzai2={},_banzai2[
BANZAI_ODS_TOTAL_MESSAGES_RECEIVED]=[postReceivedTotal],_banzai2)}},



Banzai._getEventTime(),
true);

var messages_sent_total_post=Banzai._wrapData(
BANZAI_ODS_ROUTE,
{
'2979':{
banzai:(_banzai3={},_banzai3[
BANZAI_ODS_TOTAL_MESSAGES_SENT]=[postSentTotal],_banzai3)}},



Banzai._getEventTime(),
true);


postBuffer.unshift(messages_received_total_post,messages_sent_total_post);

if(
navigator&&
navigator.sendBeacon&&
require("BanzaiAdapter").isOkToSendViaBeacon())
{
Banzai._processCallbacksAndSendViaBeacon();
}

require("BanzaiAdapter").cleanup();
require("BanzaiAdapter").inform((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).SHUTDOWN);
if(postBuffer.length>0){
if(!Banzai.adapter.useBeacon||!Banzai._tryToSendViaBeacon()){
Banzai._store(false);
}
}
},

_wrapData:function _wrapData(
route,
data,
time,
retry,
size)
{
var post=[
route,
data,
time,
0,
size];



post.__meta={
webSessionId:Banzai._getWebSessionId(),
userID:Banzai._getUserId(),
appID:Banzai._getAppId(),
retry:retry===true,
status:READY};


return post;
},

BASIC:{
delay:require("BanzaiAdapter").config.MAX_WAIT||(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).BASIC_WAIT},

BASIC_WAIT:(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).BASIC_WAIT,
ERROR:c_BanzaiConsts.ERROR,
OK:c_BanzaiConsts.OK,
SEND:c_BanzaiConsts.SEND,
SHUTDOWN:c_BanzaiConsts.SHUTDOWN,

VITAL:{
delay:require("BanzaiAdapter").config.MIN_WAIT||(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).VITAL_WAIT},

VITAL_WAIT:c_BanzaiConsts.VITAL_WAIT,

adapter:require("BanzaiAdapter"),

canUseNavigatorBeacon:function canUseNavigatorBeacon(){
return Boolean(
navigator&&navigator.sendBeacon&&require("BanzaiAdapter").isOkToSendViaBeacon());

},

counterTracker:function counterTracker(
status,
messages_count,
inflightWads,
inflightPosts)
{var _banzai4;
var tmp_messages_count=messages_count;
var messages_name=Banzai._wrapData(
BANZAI_ODS_ROUTE,
{
'2979':{
banzai:(_banzai4={},_banzai4[
ods_message[status]]=[tmp_messages_count],_banzai4)}},



Banzai._getEventTime(),
true);

inflightPosts.push(messages_name);

inflightWads.push({
webSessionId:Banzai._getWebSessionId(),
posts:[messages_name],
needs_compression:true,
user:Banzai._getUserId(),
app_id:Banzai._getAppId()});

},

flush:function flush(onSuccess,onError){
global.clearTimeout(token);
token=null;
Banzai._sendWithCallbacks(onSuccess,onError);
},

isEnabled:function isEnabled(proj){
if(__DEV__){
if(!proj){
console.error('project name required');
}
}
return Boolean(require("BanzaiAdapter").config.gks&&require("BanzaiAdapter").config.gks[proj]);
},


post:function post(
route,
data,
options)
{var _JSON$stringify;

if(!route){
require("FBLogger")('banzai').mustfix(
'Banzai.post called without specifying a route');

}

var overLimitData=(_JSON$stringify=JSON.stringify(data))!=null?_JSON$stringify:'';
var retry=options==null?void 0:options.retry;


if(require("BanzaiAdapter").config.disabled){
return;
}


var bl=require("BanzaiAdapter").config.blacklist;
if(bl){
if(bl.indexOf){
if(typeof bl.indexOf=='function'){
if(bl.indexOf(route)!=-1){
return;
}
}
}
}

var size=overLimitData.length;

postReceivedCounter++;
postReceivedTotal++;

var post=Banzai._wrapData(
route,
data,
Banzai._getEventTime(),
retry,
size);


var post_with_meta=post;
if(options==null?void 0:options.callback){
post_with_meta.__meta.callback=options==null?void 0:options.callback;
}

if((options==null?void 0:options.compress)!=null){
post_with_meta.__meta.compress=options==null?void 0:options.compress;
}

var delay=options==null?void 0:options.delay;
if(delay==null){
delay=(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).BASIC_WAIT;
}

if(options==null?void 0:options.signal){


post_with_meta.__meta.status=INFLIGHT;

var payload=[
{
user:Banzai._getUserId(),
webSessionId:Banzai._getWebSessionId(),
app_id:Banzai._getAppId(),


posts:[post],
trigger:route}];



require("BanzaiAdapter").send(
Banzai._prepForTransit(payload,false),
function BanzaiAdapter_send_$1(){
postSentTotal++;
signalSentCounter++;
post_with_meta.__meta.status=SENT;
if(post_with_meta.__meta.callback){
post_with_meta.__meta.callback();
}
},
function BanzaiAdapter_send_$2(httpStatus){
retryPost(post,httpStatus);
},
true);




if(!retry){
return;
}
}

postBuffer.push(post);


if(Banzai._schedule(delay)||!triggerRoute){
triggerRoute=route;
}


var lazyQueue=require("BanzaiLazyQueue").flushQueue();
lazyQueue.forEach(function lazyQueue_forEach_$0(post){return Banzai.post.apply(Banzai,post);});
},

subscribe:require("BanzaiAdapter").subscribe};


module.exports=Banzai;}),null);
                                                                                  __d("BanzaiStreamPayloads",[],(function $module_BanzaiStreamPayloads(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







var unsentPayloads={};

var BanzaiStreamPayloads={
addPayload:function addPayload(id,payload){
unsentPayloads[id]=payload;
},

removePayload:function removePayload(id){
delete unsentPayloads[id];
},

unload:function unload(callback){
Object.keys(unsentPayloads).forEach(function forEach_$0(id){
var data=unsentPayloads[id];
callback(data.route,data.payload);
});
}};


module.exports=BanzaiStreamPayloads;}),null);
                                                                                                                                                                                                                                                           __d("FBJSON",[],(function $module_FBJSON(global,require,requireDynamic,requireLazy,module,exports){

module.exports={
parse:JSON.parse,
stringify:JSON.stringify};}),null);
                                                                                             __d("EventEmitterWithValidation",["BaseEventEmitter"],(function $module_EventEmitterWithValidation(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var






EventEmitterWithValidation=function(_BaseEventEmitter){babelHelpers.inheritsLoose(EventEmitterWithValidation,_BaseEventEmitter);




function EventEmitterWithValidation(eventTypes,ignoreUnknownEvents){var _this;
_this=_BaseEventEmitter.call(this)||this;
_this.$EventEmitterWithValidation_eventTypes=Object.keys(eventTypes);
_this.$EventEmitterWithValidation_ignoreUnknownEvents=Boolean(ignoreUnknownEvents);return _this;
}var _proto=EventEmitterWithValidation.prototype;_proto.





emit=function emit(eventType){
if(this.$EventEmitterWithValidation_eventTypes.indexOf(eventType)===-1){
if(this.$EventEmitterWithValidation_ignoreUnknownEvents){
return;
}

throw new TypeError(errorMessageFor(eventType,this.$EventEmitterWithValidation_eventTypes));
}
return _BaseEventEmitter.prototype.emit.apply(this,arguments);
};return EventEmitterWithValidation;}(require("BaseEventEmitter"));


function errorMessageFor(type,allowedTypes){
var message='Unknown event type "'+type+'". ';
if(__DEV__){
message+=recommendationFor(type,allowedTypes);
}
message+='Known event types: '+allowedTypes.join(', ')+'.';
return message;
}


if(__DEV__){
var recommendationFor=function recommendationFor(type,allowedTypes){
var closestTypeRecommendation=closestTypeFor(type,allowedTypes);
if(isCloseEnough(closestTypeRecommendation,type)){
return'Did you mean "'+closestTypeRecommendation.type+'"? ';
}else{
return'';
}
};

var closestTypeFor=function closestTypeFor(type,allowedTypes){
var typeRecommendations=allowedTypes.map(
typeRecommendationFor.bind(this,type));

return typeRecommendations.sort(recommendationSort)[0];
};

var typeRecommendationFor=function typeRecommendationFor(type,recomendedType){
return{
type:recomendedType,
distance:damerauLevenshteinDistance(type,recomendedType)};

};

var recommendationSort=function recommendationSort(recommendationA,recommendationB){
if(recommendationA.distance<recommendationB.distance){
return-1;
}else if(recommendationA.distance>recommendationB.distance){
return 1;
}else{
return 0;
}
};

var isCloseEnough=function isCloseEnough(closestType,actualType){
return closestType.distance/actualType.length<0.334;
};

var damerauLevenshteinDistance=function damerauLevenshteinDistance(a,b){
var i,j;
var d=[];

for(i=0;i<=a.length;i++){
d[i]=[i];
}

for(j=1;j<=b.length;j++){
d[0][j]=j;
}

for(i=1;i<=a.length;i++){
for(j=1;j<=b.length;j++){
var cost=a.charAt(i-1)===b.charAt(j-1)?0:1;

d[i][j]=Math.min(
d[i-1][j]+1,
d[i][j-1]+1,
d[i-1][j-1]+cost);


if(
i>1&&
j>1&&
a.charAt(i-1)==b.charAt(j-2)&&
a.charAt(i-2)==b.charAt(j-1))
{
d[i][j]=Math.min(d[i][j],d[i-2][j-2]+cost);
}
}
}

return d[a.length][b.length];
};
}

module.exports=EventEmitterWithValidation;}),null);
                                                                                  __d("mixInEventEmitter",["invariant","EventEmitterWithHolding","EventEmitterWithValidation","EventHolder"],(function $module_mixInEventEmitter(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';





























function mixInEventEmitter(
klass,
types,
ignoreUnknownEvents)
{
types||invariant(0,'Must supply set of valid event types');



var target=klass.prototype||klass;
!target.__eventEmitter||invariant(0,'An active emitter is already mixed in');

var ctor=klass.constructor;
if(ctor){

ctor===Object||ctor===Function||invariant(0,
'Mix EventEmitter into a class, not an instance');

}



target.__types=babelHelpers["extends"]({},target.__types,types);
target.__ignoreUnknownEvents=Boolean(ignoreUnknownEvents);
Object.assign(target,EventEmitterMixin);
}

var EventEmitterMixin=


















{
emit:function emit(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emit(eventType,a,b,c,d,e,_);
},

emitAndHold:function emitAndHold(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emitAndHold(eventType,a,b,c,d,e,_);
},

addListener:function addListener(eventType,listener,context){
return this.__getEventEmitter().addListener(eventType,listener,context);
},

once:function once(eventType,listener,context){
return this.__getEventEmitter().once(eventType,listener,context);
},

addRetroactiveListener:function addRetroactiveListener(eventType,listener,context){
return this.__getEventEmitter().addRetroactiveListener(
eventType,
listener,
context);

},

listeners:function listeners(eventType){
return this.__getEventEmitter().listeners(eventType);
},

removeAllListeners:function removeAllListeners(){
this.__getEventEmitter().removeAllListeners();
},

removeCurrentListener:function removeCurrentListener(){
this.__getEventEmitter().removeCurrentListener();
},

releaseHeldEventType:function releaseHeldEventType(eventType){
this.__getEventEmitter().releaseHeldEventType(eventType);
},

__getEventEmitter:function __getEventEmitter(){
if(!this.__eventEmitter){
var emitter=new(require("EventEmitterWithValidation"))(
this.__types,
this.__ignoreUnknownEvents);

var holder=new(require("EventHolder"))();
this.__eventEmitter=new(require("EventEmitterWithHolding"))(emitter,holder);
}
return this.__eventEmitter;
}};




module.exports=mixInEventEmitter;}),null);
                                                                                                                                                                                                                                                                                                              __d("pageID",["WebSession"],(function $module_pageID(global,require,requireDynamic,requireLazy,module,exports){
'use strict';



module.exports=require("WebSession").getPageId_DO_NOT_USE();}),null);
                                                                                  __d("NavigationMetricsCore",["mixInEventEmitter","pageID"],(function $module_NavigationMetricsCore(global,require,requireDynamic,requireLazy,module,exports){














var Events={
NAVIGATION_DONE:'NAVIGATION_DONE',
EVENT_OCCURRED:'EVENT_OCCURRED'};








var SiteEvents={
tti:'tti',
e2e:'e2e',
all_pagelets_loaded:'all_pagelets_loaded',
all_pagelets_displayed:'all_pagelets_displayed'};


var loadCount=0;
var serverData={};var









NavigationEntryImpl=function(){"use strict";












function NavigationEntryImpl(){this.eventTimings={tti:null,e2e:null,all_pagelets_loaded:null,all_pagelets_displayed:null};
this.lid=require("pageID")+':'+loadCount++;
this.extras={};
}var _proto=NavigationEntryImpl.prototype;_proto.

getLID=function getLID(){
return this.lid;
};_proto.

setRequestStart=function setRequestStart(timestamp){
this.start=timestamp;
return this;
};_proto.

setTTI=function setTTI(timestamp){
this.eventTimings.tti=timestamp;
this.$NavigationEntryImpl_eventOccurred(SiteEvents.tti,timestamp);
return this;
};_proto.

setE2E=function setE2E(timestamp){
this.eventTimings.e2e=timestamp;
this.$NavigationEntryImpl_eventOccurred(SiteEvents.e2e,timestamp);
return this;
};_proto.

setExtra=function setExtra(name,timestamp){
this.extras[name]=timestamp;
return this;
};_proto.

setDisplayDone=function setDisplayDone(timestamp){
this.eventTimings.all_pagelets_displayed=timestamp;


this.setExtra('all_pagelets_displayed',timestamp);
this.$NavigationEntryImpl_eventOccurred(SiteEvents.all_pagelets_displayed,timestamp);
return this;
};_proto.

setAllPageletsLoaded=function setAllPageletsLoaded(timestamp){
this.eventTimings.all_pagelets_loaded=timestamp;


this.setExtra('all_pagelets_loaded',timestamp);
this.$NavigationEntryImpl_eventOccurred(SiteEvents.all_pagelets_loaded,timestamp);
return this;
};_proto.

setServerLID=function setServerLID(serverLID){
this.serverLID=serverLID;
return this;
};_proto.

$NavigationEntryImpl_eventOccurred=function $NavigationEntryImpl_eventOccurred(event,ts){
var serverDataForLid={};
if(
serverData!=null&&
this.serverLID!=null&&
serverData[this.serverLID]!=null)
{
serverDataForLid=serverData[this.serverLID];
}
var data=babelHelpers["extends"]({},
serverDataForLid,{
event:event,
timestamp:ts});


NavigationMetrics.emitAndHold(Events.EVENT_OCCURRED,this.serverLID,data);
return this;
};_proto.





doneNavigation=function doneNavigation(){
var data=babelHelpers["extends"]({
start:this.start,
extras:this.extras},



this.eventTimings);



if(this.serverLID&&serverData[this.serverLID]){
var serverLID=this.serverLID;
Object.assign(data,serverData[serverLID]);
delete serverData[serverLID];
}





NavigationMetrics.emitAndHold(Events.NAVIGATION_DONE,this.lid,data);
};return NavigationEntryImpl;}();


var NavigationMetrics={
Events:Events,


postPagelet:function postPagelet(isTTI,pageletName,serverLID){},

siteInit:function siteInit(init){

init(NavigationEntryImpl);
},










setPage:function setPage(info){
if(!info.serverLID){
return;
}
serverData[info.serverLID]={
page:info.page,
pageType:info.page_type,
pageURI:info.page_uri,
serverLID:info.serverLID};

},

getFullPageLoadLid:function getFullPageLoadLid(){
throw new Error('getFullPageLoadLid is not implemented on this site');
}};


require("mixInEventEmitter")(NavigationMetrics,Events);


module.exports=NavigationMetrics;}),null);
                                                                                                                                            __d("NavigationMetrics",["Arbiter","BigPipeInstance","NavigationMetricsCore","PageEvents","performance"],(function $module_NavigationMetrics(global,require,requireDynamic,requireLazy,module,exports){var c_performance;








var fullPageLoadLid='0';




require("NavigationMetricsCore").getFullPageLoadLid=function(){
return fullPageLoadLid;
};

require("NavigationMetricsCore").siteInit(function NavigationMetrics_siteInit_$0(NavigationEntry){









var fullPageEntry=new NavigationEntry();
var first=true;















require("Arbiter").subscribe(require("BigPipeInstance").Events.init,function Arbiter_subscribe_$1(_,data){
var entry=first?fullPageEntry:new NavigationEntry();
if(first){
fullPageLoadLid=data.lid;
}
first=false;

entry.setServerLID(data.lid);

var arbiterInstance=data.arbiter;
arbiterInstance.subscribe(require("BigPipeInstance").Events.tti,function arbiterInstance_subscribe_$1(_,_ref){var ts=_ref.ts;
entry.setTTI(ts);
});


arbiterInstance.subscribe(require("PageEvents").AJAXPIPE_SEND,function arbiterInstance_subscribe_$1(_,_ref2){var ts=_ref2.ts;
entry.setRequestStart(ts);
});


arbiterInstance.subscribe(require("PageEvents").AJAXPIPE_ONLOAD,function arbiterInstance_subscribe_$1(_,_ref3){var ts=_ref3.ts;
entry.setE2E(ts).doneNavigation();
});




arbiterInstance.subscribe(require("BigPipeInstance").Events.displayed,function arbiterInstance_subscribe_$1(_,_ref4){var ts=_ref4.ts;
entry.setDisplayDone(ts);
});
arbiterInstance.subscribe(require("BigPipeInstance").Events.loaded,function arbiterInstance_subscribe_$1(_,_ref5){var ts=_ref5.ts;
entry.setAllPageletsLoaded(ts);
});
});

require("Arbiter").subscribe(require("PageEvents").BIGPIPE_ONLOAD,function Arbiter_subscribe_$1(_,_ref6){var ts=_ref6.ts;
first=false;
fullPageEntry.
setRequestStart((c_performance||(c_performance=require("performance"))).timing&&(c_performance||(c_performance=require("performance"))).timing.navigationStart).
setE2E(ts).
doneNavigation();
});
});

module.exports=require("NavigationMetricsCore");}),null);
                                                                                               __d("cancelIdleCallback",["requireCond","cr:692209"],(function $module_cancelIdleCallback(global,require,requireDynamic,requireLazy,module,exports){




module.exports=require("cr:692209");}),null);
                                                                                  __d("requestIdleCallbackAcrossTransitions",["IdleCallbackImplementation","TimerStorage","TimeSlice"],(function $module_requestIdleCallbackAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports){










var requestIdleCallback=
global.requestIdleCallback||require("IdleCallbackImplementation").requestIdleCallback;

var name=require("TimerStorage").IDLE_CALLBACK;





module.exports=function requestIdleCallbackAcrossTransitions(
callback,
options)
{
callback=require("TimeSlice").guard(callback,'requestIdleCallback',{
propagationType:require("TimeSlice").PropagationType.CONTINUATION,
registerCallStack:true});

var id=requestIdleCallback.call(global,callback,options);
var token=name+String(id);
require("TimeSlice").registerForCancelling(token,callback);
return id;
};}),null);
                                                                                  __d("SetIdleTimeoutAcrossTransitions",["NavigationMetrics","cancelIdleCallback","clearTimeout","nullthrows","requestIdleCallbackAcrossTransitions","setTimeoutAcrossTransitions"],(function $module_SetIdleTimeoutAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports){

'use strict';









var useIdle=false;
var idLookup=new Map();

var SetIdleTimeoutAcrossTransitions={
start:function start(callback,delay){
if(useIdle){
var timeoutId=require("setTimeoutAcrossTransitions")(function setTimeoutAcrossTransitions_$0(){
var idleId=require("requestIdleCallbackAcrossTransitions")(function requestIdleCallbackAcrossTransitions_$0(){
callback();

idLookup["delete"](idleId);
});
idLookup.set(timeoutId,idleId);
},delay);
return timeoutId;
}else{
return require("setTimeoutAcrossTransitions")(callback,delay);
}
},
clear:function clear(id){
require("clearTimeout")(id);
if(idLookup.has(id)){
require("cancelIdleCallback")(require("nullthrows")(idLookup.get(id)));
idLookup["delete"](id);
}
}};


require("NavigationMetrics").addRetroactiveListener(
require("NavigationMetrics").Events.EVENT_OCCURRED,
function NavigationMetrics_addRetroactiveListener_$1(_,eventData){
if(eventData.event==='all_pagelets_loaded'){
useIdle=!!global.requestIdleCallback;
}
});


module.exports=SetIdleTimeoutAcrossTransitions;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("Visibility",["BaseEventEmitter","ExecutionEnvironment","TimeSlice"],(function $module_Visibility(global,require,requireDynamic,requireLazy,module,exports){var


canUseDOM=require("ExecutionEnvironment").canUseDOM;




var hiddenKey,hiddenEvent;
if(canUseDOM){
if(document.hidden!==undefined){
hiddenKey='hidden';
hiddenEvent='visibilitychange';
}else if(document.mozHidden!==undefined){
hiddenKey='mozHidden';
hiddenEvent='mozvisibilitychange';
}else if(document.msHidden!==undefined){
hiddenKey='msHidden';
hiddenEvent='msvisibilitychange';
}else if(document.webkitHidden!==undefined){
hiddenKey='webkitHidden';
hiddenEvent='webkitvisibilitychange';
}
}var

VisibilityEmitter=function(_BaseEventEmitter){"use strict";babelHelpers.inheritsLoose(VisibilityEmitter,_BaseEventEmitter);function VisibilityEmitter(){var _temp,_this;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return(_temp=_this=_BaseEventEmitter.call.apply(_BaseEventEmitter,[this].concat(args))||this,_this.



HIDDEN='hidden',_this.
VISIBLE='visible',_this.
hiddenKey=



hiddenKey,_this.
hiddenEvent=



hiddenEvent,_temp)||babelHelpers.assertThisInitialized(_this);}var _proto=VisibilityEmitter.prototype;_proto.







isHidden=function isHidden(){

return hiddenKey?document[hiddenKey]:false;
};_proto.

isSupported=function isSupported(){
return canUseDOM&&document.addEventListener&&hiddenEvent!==undefined;
};return VisibilityEmitter;}(require("BaseEventEmitter"));


var Visibility=new VisibilityEmitter();

if(Visibility.isSupported()){
document.addEventListener(
Visibility.hiddenEvent,
require("TimeSlice").guard(function onVisibilityChange(e){
Visibility.emit(
Visibility.isHidden()?Visibility.HIDDEN:Visibility.VISIBLE,
{
changeTime:e.timeStamp});


},'visibility change'));

}

module.exports=Visibility;}),null);
                                                                                                                           __d("WebStorageMutex",["WebStorage","clearTimeout","pageID","setTimeout"],(function $module_WebStorageMutex(global,require,requireDynamic,requireLazy,module,exports){























'use strict';var c_WebStorage;









var storage=null;
var storageInited=false;
var curPageID=require("pageID");

function _getStorage(){
if(!storageInited){
storageInited=true;
storage=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getLocalStorage();
}
return storage;
}var

WebStorageMutex=function(){







function WebStorageMutex(name){
this.name=name;
}WebStorageMutex.




testSetPageID=function testSetPageID(id){
curPageID=id;
};var _proto=WebStorageMutex.prototype;_proto.





$WebStorageMutex_owner=function $WebStorageMutex_owner(){var _val;
var store=_getStorage();
if(!store){

return curPageID;
}
var val=store.getItem('mutex_'+this.name);
val=((_val=val)!=null?_val:'').split(':');
return val&&parseInt(val[1],10)>=Date.now()?val[0]:null;
};_proto.






$WebStorageMutex_writeLock=function $WebStorageMutex_writeLock(expires){
var store=_getStorage();
if(!store){
return;
}

var offset=expires==null?1000:expires;
var when=Date.now()+offset;
(c_WebStorage||(c_WebStorage=require("WebStorage"))).setItemGuarded(
store,
'mutex_'+this.name,
curPageID+':'+when);

};_proto.




hasLock=function hasLock(){
return this.$WebStorageMutex_owner()===curPageID;
};_proto.










lock=function lock(
onLock,
onError,
expires)
{var _this=this;
if(this.$WebStorageMutex_locking){
require("clearTimeout")(this.$WebStorageMutex_locking);
}


if(curPageID===(this.$WebStorageMutex_owner()||curPageID)){
this.$WebStorageMutex_writeLock(expires);
}




this.$WebStorageMutex_locking=require("setTimeout")(function setTimeout_$0(){
_this.$WebStorageMutex_locking=null;
var f=_this.hasLock()?onLock:onError;
if(f){
f(_this);
}
},0);
};_proto.




unlock=function unlock(){
if(this.$WebStorageMutex_locking){
require("clearTimeout")(this.$WebStorageMutex_locking);
}
var store=_getStorage();
if(store&&this.hasLock()){
store.removeItem('mutex_'+this.name);
}
};return WebStorageMutex;}();


module.exports=WebStorageMutex;}),null);
                                                                                                                                                                                                                                                                                                                                                                         __d("isInIframe",[],function $module_isInIframe(global,require,requireDynamic,requireLazy,module,exports){




var inFrame=window!=window.top;

function isInIframe(){
return inFrame;
}

module.exports=isInIframe;},null);
                                                                                                                                 __d("lowerFacebookDomain",[],(function $module_lowerFacebookDomain(global,require,requireDynamic,requireLazy,module,exports){




var captures=window.location.hostname.match(
/\.(facebook\.sg|facebookcorewwwi\.onion|workplace\.com)$/);

var domain=captures?captures[1]:'facebook.com';



lowerFacebookDomain.setDomain=function(inboundDomain){
domain=inboundDomain;
};

lowerFacebookDomain.isValidDocumentDomain=function(){
if(document.domain==domain){
return true;
}

return false;
};







function lowerFacebookDomain(){
document.domain=domain;
}

module.exports=lowerFacebookDomain;}),null);
                                                                                  __d("BanzaiNew",["BanzaiBase","BanzaiConsts","BanzaiStreamPayloads","CurrentUser","ExecutionEnvironment","FBJSON","NavigationMetrics","SetIdleTimeoutAcrossTransitions","TimeSlice","Visibility","WebStorage","emptyFunction","isInIframe","lowerFacebookDomain","performanceAbsoluteNow","WebStorageMutex"],(function $module_BanzaiNew(global,require,requireDynamic,requireLazy,module,exports){var c_WebStorage;var c_BanzaiConsts;var c_performanceAbsoluteNow;var BanzaiBase;






























var STORAGE_PREFIX='bz:';

var _super={
_getStorage:(BanzaiBase=require("BanzaiBase"))._getStorage,
_initialize:BanzaiBase._initialize,
_schedule:BanzaiBase._schedule,
flush:BanzaiBase.flush,
_unload:BanzaiBase._unload,
post:BanzaiBase.post};


var inFrame=require("isInIframe")();

var lastFlush=null;
var nextSend;
var timer;


var storage;
var webStore;
var webStoreInited=false;

function _getWebStorage(){
if(!webStoreInited){
webStoreInited=true;
webStore=(c_WebStorage||(c_WebStorage=require("WebStorage"))).getLocalStorage();
}
return webStore;
}

function _isWebStorageAvailable(){
var quotacheck_key='check_quota';
try{
var localStorage=_getWebStorage();
if(!localStorage){
return false;
}
localStorage.setItem(quotacheck_key,quotacheck_key);
localStorage.removeItem(quotacheck_key);
return true;
}catch(_unused){
return false;
}
}

BanzaiBase._getStorage=function(){
if(!storage){
if(!inFrame){
storage={
store:function store(){
var webStorage=_getWebStorage();
var posts=require("BanzaiBase")._getPostBuffer().filter(function filter_$0(post){

return post.__meta.status<2;
});
if(!webStorage||posts.length<=0){
return;
}

posts=posts.map(function posts_map_$0(post){
return[
post[0],
post[1],
post[2],
post[3]||0,
post[4],
post.__meta];

});
require("BanzaiBase")._clearPostBuffer();


(c_WebStorage||(c_WebStorage=require("WebStorage"))).setItemGuarded(
webStorage,
STORAGE_PREFIX+
require("BanzaiBase")._getWebSessionId()+
'.'+
require("BanzaiBase")._getEventTime(),
require("FBJSON").stringify(posts));

},

restore:function restore(){
var webStorage=_getWebStorage();
if(!webStorage){
return;
}


var WebStorageMutex=require('WebStorageMutex');
var loadFromStorage=function loadFromStorage(mutex){



var keys=[];
for(var i=0;i<webStorage.length;i++){
var key=webStorage.key(i);


if(
key.indexOf(STORAGE_PREFIX)===0&&
key.indexOf('bz:__')!==0)
{
keys.push(key);
}
}


keys.forEach(function keys_forEach_$0(key){


var json=webStorage.getItem(key);
webStorage.removeItem(key);

if(!json){
return;
}


var posts=require("FBJSON").parse(json);
posts.forEach(function posts_forEach_$0(post){
if(!post){
return;
}

var m=post.__meta=post.pop();

var postable=require("BanzaiBase")._canSend(post);

if(!postable){
return;
}

var currentUserId=require("CurrentUser").getID();
if(m.userID===currentUserId||currentUserId==='0'){
require("BanzaiBase")._resetPostStatus(post);
require("BanzaiBase")._getPostBuffer().push(post);
}
});
});
if(mutex){
mutex.unlock();
}
};
if(_isWebStorageAvailable()){
new WebStorageMutex('banzai').lock(loadFromStorage);
}else{


require("SetIdleTimeoutAcrossTransitions").start(loadFromStorage,0);
}
},
flush:function flush(){
var webStorage=_getWebStorage();

if(webStorage){
if(lastFlush===null){
lastFlush=parseInt(
webStorage.getItem((c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).LAST_STORAGE_FLUSH),
10);

}



var shouldClearStorage=
lastFlush&&
(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))()-lastFlush>=
(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).STORAGE_FLUSH_INTERVAL;

if(shouldClearStorage){
require("BanzaiBase")._restore(false);
}



if(shouldClearStorage||!lastFlush){
lastFlush=(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
(c_WebStorage||(c_WebStorage=require("WebStorage"))).setItemGuarded(
webStorage,
(c_BanzaiConsts||(c_BanzaiConsts=require("BanzaiConsts"))).LAST_STORAGE_FLUSH,
lastFlush.toString());

}
}
}};

}else{
storage={
store:require("emptyFunction"),
restore:require("emptyFunction"),
flush:require("emptyFunction")};

}
}
return storage;
};

BanzaiBase._initialize=function(){
if(require("ExecutionEnvironment").canUseDOM){
if(require("BanzaiBase").adapter.useBeacon&&require("Visibility").isSupported()){



require("Visibility").addListener(require("Visibility").HIDDEN,function Visibility_addListener_$1(){
if(require("BanzaiBase")._getPostBuffer().length>0){
if(!require("BanzaiBase")._tryToSendViaBeacon()){
require("BanzaiBase")._store(false);
}
}
});

if(require("BanzaiBase").isEnabled('enable_client_logging_clear_on_visible')){
require("Visibility").addListener(require("Visibility").VISIBLE,function Visibility_addListener_$1(){
if(!require("BanzaiBase")._tryToSendViaBeacon()){
require("BanzaiBase")._restore(false);
}
});
}
}else{

require("BanzaiBase").adapter.setHooks(require("BanzaiBase"));
}
require("BanzaiBase").adapter.setUnloadHook(require("BanzaiBase"));


require("NavigationMetrics").addListener(
require("NavigationMetrics").Events.NAVIGATION_DONE,
function NavigationMetrics_addListener_$1(_,data){
if(data.pageType!=='normal'){
return;
}
require("BanzaiBase")._restore(false);
require("NavigationMetrics").removeCurrentListener();
});

}
};

BanzaiBase._getEventTime=function(){
return(c_performanceAbsoluteNow||(c_performanceAbsoluteNow=require("performanceAbsoluteNow")))();
};


var send=require("TimeSlice").guard(
function TimeSlice_guard_$0(){
nextSend=null;
require("BanzaiBase")._sendWithCallbacks();
},
'Banzai.send',
{propagationType:require("TimeSlice").PropagationType.ORPHAN});


BanzaiBase._schedule=function(ms){
var t=require("BanzaiBase")._getEventTime()+ms;
if(!nextSend||t<nextSend){
nextSend=t;
require("SetIdleTimeoutAcrossTransitions").clear(timer);
var scheduleFn=function scheduleFn(){
timer=require("SetIdleTimeoutAcrossTransitions").start(send,ms);
};
scheduleFn();
return true;
}
return false;
};

BanzaiBase.flush=function(onSuccess,onError){
require("SetIdleTimeoutAcrossTransitions").clear(timer);
nextSend=null;
require("BanzaiBase")._sendWithCallbacks(onSuccess,onError);
};

BanzaiBase._unload=function(){
require("BanzaiStreamPayloads").unload(require("BanzaiBase").post);
_super._unload();
};

BanzaiBase.post=function(
route,
data,
options)
{
if(require("BanzaiBase").adapter.config.disabled){
return;
}

if(!require("ExecutionEnvironment").canUseDOM){
return;
}



if(inFrame&&require("lowerFacebookDomain").isValidDocumentDomain()){
var bz;
try{
bz=global.top.require('Banzai');
}catch(_unused2){


bz=null;
}

if(bz){
bz.post.apply(bz,arguments);
return;
}
}

_super.post(route,data,options);
};

BanzaiBase._initialize();

module.exports=BanzaiBase;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                 __d("DOMWrapper",[],function $module_DOMWrapper(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var rootElement,windowRef;



var DOMWrapper={
setRoot:function setRoot(root){
rootElement=root;
},
getRoot:function getRoot(){
return rootElement||document.body;
},
setWindow:function setWindow(win){
windowRef=win;
},
getWindow:function getWindow(){
return windowRef||self;
}};


module.exports=DOMWrapper;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("dotAccess",[],function $module_dotAccess(global,require,requireDynamic,requireLazy,module,exports){

function dotAccess(head,path,create){
var stack=path.split('.');
do{
var key=stack.shift();
head=head[key]||create&&(head[key]={});
}while(stack.length&&head);
return head;
}

module.exports=dotAccess;},null);
                                                                                                                                                                                                                                                                                              __d("guid",[],(function $module_guid(global,require,requireDynamic,requireLazy,module,exports){



function guid(){
return'f'+(Math.random()*(1<<30)).toString(16).replace('.','');
}

module.exports=guid;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],function $module_GlobalCallback(global,require,requireDynamic,requireLazy,module,exports){









var rootObject;
var callbackPrefix;

var GlobalCallback={
setPrefix:function setPrefix(prefix){
rootObject=require("dotAccess")(require("DOMWrapper").getWindow(),prefix,true);
callbackPrefix=prefix;
},

create:function create(fn,description){var _description;
if(!rootObject){


this.setPrefix('__globalCallbacks');
}
var id=require("guid")();
rootObject[id]=require("wrapFunction")(fn,'entry',(_description=description)!=null?_description:'GlobalCallback');

return callbackPrefix+"."+id;
},

remove:function remove(name){
var id=name.substring(callbackPrefix.length+1);
delete rootObject[id];
}};


module.exports=GlobalCallback;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("Log",[],function $module_Log(global,require,requireDynamic,requireLazy,module,exports){

'use strict';
























var Level={
DEBUG:3,
INFO:2,
WARNING:1,
ERROR:0};


var log=function log(
name,
level,
format)

{for(var _len=arguments.length,args=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}
var index=0;
var msg=format.replace(/%s/g,function format_replace_$1(){return String(args[index++]);});
var console=window.console;
if(console&&Log.level>=level){
console[name in console?name:'log'](msg);
}
};

var Log={



level:__DEV__?3:-1,






Level:Level,









debug:ES(log,"bind",true,null,'debug',Level.DEBUG),



info:ES(log,"bind",true,null,'info',Level.INFO),



warn:ES(log,"bind",true,null,'warn',Level.WARNING),



error:ES(log,"bind",true,null,'error',Level.ERROR),



log:log};


module.exports=Log;},null);
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
                                                                                               __d("Banzai",["requireCond","cr:1268308"],(function $module_Banzai(global,require,requireDynamic,requireLazy,module,exports){





module.exports=require("cr:1268308");}),null);
                                                                                            __d("WebFunnelLogger",["invariant","Banzai"],function $module_WebFunnelLogger(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';var

















WebFunnelLogger=function(){





function WebFunnelLogger(funnel_definition){this.$WebFunnelLogger_funnelPayload={};this.$WebFunnelLogger_actionPayload={};this.$WebFunnelLogger_banzaiRoute='web_funnel_logging';
this.$WebFunnelLogger_clear();
this.$WebFunnelLogger_data.funnel_definition=funnel_definition;
}var _proto=WebFunnelLogger.prototype;_proto.






log=function log(){
this.$WebFunnelLogger_data.funnel_payload=ES("JSON","stringify",false,this.$WebFunnelLogger_funnelPayload);
this.$WebFunnelLogger_data.action_payload=ES("JSON","stringify",false,this.$WebFunnelLogger_actionPayload);
require("Banzai").post(this.$WebFunnelLogger_banzaiRoute,this.$WebFunnelLogger_data,require("Banzai").BASIC);
this.$WebFunnelLogger_clear();
};_proto.





logWithEventTime=function logWithEventTime(timeInMiliseconds){

this.$WebFunnelLogger_data.event_time=timeInMiliseconds/1000;
this.$WebFunnelLogger_prepareData();
require("Banzai").post(this.$WebFunnelLogger_banzaiRoute,this.$WebFunnelLogger_data,require("Banzai").BASIC);
this.$WebFunnelLogger_clear();
};_proto.






logVital=function logVital(){
this.$WebFunnelLogger_prepareData();
require("Banzai").post(this.$WebFunnelLogger_banzaiRoute,this.$WebFunnelLogger_data,require("Banzai").VITAL);
this.$WebFunnelLogger_clear();
};_proto.





logVitalWithEventTime=function logVitalWithEventTime(timeInMiliseconds){

this.$WebFunnelLogger_data.event_time=timeInMiliseconds/1000;
this.$WebFunnelLogger_prepareData();
require("Banzai").post(this.$WebFunnelLogger_banzaiRoute,this.$WebFunnelLogger_data,require("Banzai").VITAL);
this.$WebFunnelLogger_clear();
};_proto.




$WebFunnelLogger_prepareData=function $WebFunnelLogger_prepareData(){
this.$WebFunnelLogger_data.funnel_payload=ES("JSON","stringify",false,this.$WebFunnelLogger_funnelPayload);
this.$WebFunnelLogger_data.action_payload=ES("JSON","stringify",false,this.$WebFunnelLogger_actionPayload);
this.$WebFunnelLogger_data.action!==null||invariant(0,'action is not null');
this.$WebFunnelLogger_data.session_key!==null||invariant(0,'session key is not null');
};_proto.




$WebFunnelLogger_clear=function $WebFunnelLogger_clear(){
this.$WebFunnelLogger_data={};
this.$WebFunnelLogger_funnelPayload={};
this.$WebFunnelLogger_actionPayload={};
return this;
};_proto.





setAction=function setAction(value){
this.$WebFunnelLogger_data.action=value;
return this;
};_proto.




addActionPayload=function addActionPayload(key,value){
this.$WebFunnelLogger_actionPayload[key]=value;
return this;
};_proto.




setActionTag=function setActionTag(value){
this.$WebFunnelLogger_data.action_tag=value;
return this;
};_proto.




addFunnelPayload=function addFunnelPayload(key,value){
this.$WebFunnelLogger_funnelPayload[key]=value;
return this;
};_proto.




setFunnelTags=function setFunnelTags(value){
this.$WebFunnelLogger_data.funnel_tags=value;
return this;
};_proto.





setSecondaryOrder=function setSecondaryOrder(value){
this.$WebFunnelLogger_data.secondary_order_value=value;
return this;
};_proto.





setSessionKey=function setSessionKey(value){
this.$WebFunnelLogger_data.session_key=value;
return this;
};_proto.





markStart=function markStart(){
this.$WebFunnelLogger_data.session_marker='start';
return this;
};_proto.




markEnd=function markEnd(){
this.$WebFunnelLogger_data.session_marker='end';
return this;
};_proto.



setUserId=function setUserId(value){
this.$WebFunnelLogger_data.user_id=value;
return this;
};_proto.

setIsEmployee=function setIsEmployee(value){
this.$WebFunnelLogger_data.is_employee=value;
return this;
};return WebFunnelLogger;}();


















module.exports=WebFunnelLogger;},null);
                                                                                                                                                                         __d("PlatformOAuthDialogLoginFunnelLogger",["FBLogger","URI","WebFunnelLogger"],function $module_PlatformOAuthDialogLoginFunnelLogger(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_URI;









var PlatformOAuthDialogLoginFunnelLogger={

CLIENT_FUNNEL_VERSION:1,



log:function log(
action,
cbt,
loggerId,
mustHaveCBT,
gdpType)
{if(mustHaveCBT===void 0){mustHaveCBT=true;}
if(
null==loggerId||
''===loggerId||
mustHaveCBT&&(null==cbt||''===cbt||0===cbt))
{
require("FBLogger")('platform_login_web_funnel_client_js').mustfix("\nerror: null_required_field\naction: "+

action+"\nloggerId: "+
String(loggerId)+"\ncbt: "+
String(cbt)+"\n        ");

return;
}
var cbtNumber='number'!==typeof cbt?parseInt(cbt,10):cbt;
var cbtDelta=ES("Date","now",false)-cbtNumber;
var firstPaintTime=getFirstPaintTime();
var responseStartTime=getResponseStart();
var logger=new(require("WebFunnelLogger"))('PlatformLoginWebFunnelDefinition').
setAction(action).
setSessionKey(loggerId).
addActionPayload('logger_id',loggerId).
addActionPayload('first_paint_time',firstPaintTime).
addActionPayload('response_start_time',responseStartTime).
addActionPayload('cbt_delta',cbtDelta).
addFunnelPayload(
'client_funnel_version',
PlatformOAuthDialogLoginFunnelLogger.CLIENT_FUNNEL_VERSION).

addFunnelPayload('cbt',cbtNumber).
addFunnelPayload('gdp_type',gdpType);
if(
action==="client_logged_out_init_impression")
{
var loginURI=getLoginURI();
logger.addFunnelPayload('login_uri',loginURI);
}
logger.logVital();
}};


var getFirstPaintTime=function getFirstPaintTime(){
if(window.performance){
var performanceEntries=ES(window.performance.
getEntriesByType('paint'),"filter",true,
function filter_$0(entry){return'first-paint'===entry.name;});
if(null==performanceEntries||0<!performanceEntries.length){
return null;
}
var firstPaintTime=
performanceEntries[0].startTime+performanceEntries[0].duration;
return firstPaintTime;
}
return null;
};

var getResponseStart=function getResponseStart(){
if(window.performance){
var performanceEntries=window.performance.getEntriesByType(
'navigation');

if(null==performanceEntries||0<!performanceEntries.length){
return null;
}
return performanceEntries[0].responseStart;
}
return null;
};

var getLoginURI=function getLoginURI(){

return(c_URI||(c_URI=require("URI"))).getRequestURI().
setQueryString('').
toString();
};

module.exports=PlatformOAuthDialogLoginFunnelLogger;},null);
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

pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(value));
});
return pairs.join('&');
}




function decode(str,strict){if(strict===void 0){strict=false;}
var data={};
if(str===''){
return data;
}

var pairs=str.split('&');
for(var i=0;i<pairs.length;i++){
var pair=pairs[i].split('=',2);
var key=decodeURIComponent(pair[0]);
if(strict&&Object.prototype.hasOwnProperty.call(data,key)){
throw new URIError('Duplicate key: '+key);
}
data[key]=pair.length===2?decodeURIComponent(pair[1]):null;
}
return data;
}






function appendToUrl(url,params){
return(
url+(
ES(url,"indexOf",true,'?')!==-1?'&':'?')+(
typeof params==='string'?params:QueryString.encode(params)));

}

var QueryString=



{
encode:encode,
decode:decode,
appendToUrl:appendToUrl};


module.exports=QueryString;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("ManagedError",[],function $module_ManagedError(global,require,requireDynamic,requireLazy,module,exports){var

ManagedError=function(_Error){"use strict";babelHelpers.inheritsLoose(ManagedError,_Error);


function ManagedError(message,innerError){var _this;
_this=_Error.call(this,message!==null&&message!==undefined?message:'')||this;
if(message!==null&&message!==undefined){
_this.message=message;
}else{
_this.message='';
}
_this.innerError=innerError;return _this;
}return ManagedError;}(babelHelpers.wrapNativeSuper(Error));


module.exports=ManagedError;},null);
                                                                                                                                                                                              __d("AssertionError",["ManagedError"],function $module_AssertionError(global,require,requireDynamic,requireLazy,module,exports){var



AssertionError=function(_ManagedError){"use strict";babelHelpers.inheritsLoose(AssertionError,_ManagedError);
function AssertionError(message){return(
_ManagedError.call(this,message)||this);
}return AssertionError;}(require("ManagedError"));


module.exports=AssertionError;},null);
                                                                                                                                                                                                       __d("Assert",["AssertionError","sprintf"],function $module_Assert(global,require,requireDynamic,requireLazy,module,exports){













function assert(expression,message){
if(typeof expression!=='boolean'||!expression){
throw new(require("AssertionError"))(message);
}
return expression;
}










function assertType(type,expression,message){
var actualType;

if(expression===undefined){
actualType='undefined';
}else if(expression===null){
actualType='null';
}else{
var className=Object.prototype.toString.call(expression);
actualType=/\s(\w*)/.exec(className)[1].toLowerCase();
}

assert(
ES(type,"indexOf",true,actualType)!==-1,
message||require("sprintf")('Expression is of type %s, not %s',actualType,type));

return expression;
}










function assertInstanceOf(type,expression,message){
assert(
expression instanceof type,
message||'Expression not instance of type');

return expression;
}

function _define(type,test){
Assert['is'+type]=test;
Assert['maybe'+type]=function(expression,message){

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
'Array',
'Boolean',
'Date',
'Function',
'Null',
'Number',
'Object',
'Regexp',
'String',
'Undefined'],"forEach",true,
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

if(typeof mixinFrom==='function'){
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
prototype&&Object.prototype.hasOwnProperty.call(prototype,'constructor')?
prototype.constructor:
function(){
this.parent.apply(this,arguments);
};

require("Assert").isFunction(constructor);


if(from&&from.prototype instanceof Type===false){
throw new Error('parent type does not inherit from Type');
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
return typeof prototype==='function'?
_extend.apply(null,arguments):
_extend(null,prototype,mixins);
},
instanceOf:_instanceOf});


module.exports=Type;var _c;$RefreshReg$(_c,"Type");},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("sdk.Model",["ObservableMixin","Type"],function $module_sdk_Model(global,require,requireDynamic,requireLazy,module,exports){

'use strict';




var Model=require("Type").extend(
{
constructor:function constructor(properties){
this.parent();


var propContainer={};
var model=this;

ES(ES("Object","keys",false,properties),"forEach",true,function forEach_$0(name){

propContainer[name]=properties[name];


model['set'+name]=function(value){
if(value===propContainer[name]){
return model;
}
propContainer[name]=value;
model.inform(name+'.change',value);
return model;
};


model['get'+name]=function(){
return propContainer[name];
};
});
}},require("ObservableMixin"));




module.exports=Model;},null);
                                                                                                                                                                                                                                            __d("sdk.Runtime",["JSSDKRuntimeConfig","sdk.Model"],function $module_sdk_Runtime(global,require,requireDynamic,requireLazy,module,exports){var JSSDKRuntimeConfig;







var ENVIRONMENTS={
UNKNOWN:0,
PAGETAB:1,
CANVAS:2,
PLATFORM:4};


var Runtime=new(require("sdk.Model"))({
AccessToken:'',
AutoLogAppEvents:false,
ClientID:'',
CookieUserID:'',
EnforceHttps:false,
Environment:ENVIRONMENTS.UNKNOWN,
GraphDomain:'',
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
UserID:'',
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
})();

module.exports=Runtime;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                  __d("UrlMap",["invariant","UrlMapConfig","sdk.Runtime"],function $module_UrlMap(global,require,requireDynamic,requireLazy,module,exports,invariant){






var UrlMap={







resolve:function resolve(key){
var protocol='https';



if(key==='graph_domain'){
var graphDomain=require("sdk.Runtime").getGraphDomain();
if(!!graphDomain){
key='graph_'.concat(graphDomain);
}else{

key='graph';
}
}

if(key in require("UrlMapConfig")){
return protocol+'://'+require("UrlMapConfig")[key];
}
key in require("UrlMapConfig")||invariant(0,'Unknown key in UrlMapConfig: %s',key);
return'';
}};


module.exports=UrlMap;},null);
                                                                                                                                                                                                                                                                                                                                                                                                  __d("sdk.Cookie",["QueryString","sdk.Runtime"],function $module_sdk_Cookie(global,require,requireDynamic,requireLazy,module,exports){








var domain=null;









function setRaw(
startingPrefix,
val,
ts,
secure)
{var _domain;
var prefix=startingPrefix+require("sdk.Runtime").getClientID();
var secureFlag=secure?';Secure':'';
var useDomain=domain!==null&&domain!=='.';

if(useDomain){

document.cookie=
prefix+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT'+secureFlag;

document.cookie=
prefix+
'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;'+
'domain='+
location.hostname+
secureFlag;
}

var expires=new Date(ts).toUTCString();
document.cookie=
prefix+
'='+
val+(
val&&ts===0?'':'; expires='+expires)+
'; path=/'+(
useDomain?'; domain='+((_domain=domain)!=null?_domain:''):'')+
secureFlag;
}

function getRaw(startingPrefix){
var prefix=startingPrefix+require("sdk.Runtime").getClientID();
var regExp=new RegExp('\\b'+prefix+'=([^;]*)\\b');
var matches=document.cookie.match(regExp);
if(matches===null||matches===undefined){
return null;
}else{
return matches[1];
}
}

var Cookie={
setDomain:function setDomain(val){
domain=val;

var meta=require("QueryString").encode({
base_domain:domain!==null&&domain!=='.'?domain:''});

var expiration=new Date();
expiration.setFullYear(expiration.getFullYear()+1);
setRaw('fbm_',meta,expiration.getTime(),true);
},

getDomain:function getDomain(){
return domain;
},




loadMeta:function loadMeta(){
var cookie=getRaw('fbm_');
if(cookie!==null&&cookie!==undefined&&domain===null){

var meta=require("QueryString").decode(cookie);

domain=meta.base_domain;
return meta;
}
return null;
},






loadSignedRequest:function loadSignedRequest(){
return getRaw('fbsr_');
},










setSignedRequestCookie:function setSignedRequestCookie(
signedRequest,
expiration)
{
if(signedRequest===''){
throw new Error(
'Value passed to Cookie.setSignedRequestCookie was empty.');

}
setRaw('fbsr_',signedRequest,expiration,true);
},





clearSignedRequestCookie:function clearSignedRequestCookie(){
this.loadMeta();
setRaw('fbsr_','',0,true);
},

setRaw:setRaw,

getRaw:getRaw};


module.exports=Cookie;},null);
                                                                                                                                                                                                                                                                                   __d("Miny",[],function $module_Miny(global,require,requireDynamic,requireLazy,module,exports){

var MAGIC='Miny1';
var LO='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');

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


var codes='';
for(i=0;i<parts.length;i++){
codes+=dict[parts[i]];
}

keys.unshift(MAGIC,keys.length);
keys.push(codes);
return keys.join('~');
}};


module.exports=Miny;},null);
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

versions.firefox=agent[2]||'';
versions.webkit=agent[3]||'';
if(agent[3]){



var chromeAgent=/(?:Chrome\/(\d+\.\d+))/.exec(uas);
versions.chrome=chromeAgent?chromeAgent[1]:'';
var edgeAgent=/(?:Edge\/(\d+\.\d+))/.exec(uas);
versions.edge=edgeAgent?edgeAgent[1]:'';
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
versions.ucWeb=ucWeb[1]||'2.0';
}

function getVersionParts(version){
return ES(String(version).
split('.'),"map",true,
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

module.exports=UA;},null);
                                                                                                                                                                                                                                                                                                                                                                                           __d("getBlankIframeSrc",["sdk.UA"],function $module_getBlankIframeSrc(global,require,requireDynamic,requireLazy,module,exports){



function getBlankIframeSrc(){
return require("sdk.UA").ie()<10?'javascript:false':'about:blank';
}

module.exports=getBlankIframeSrc;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         __d("insertIframe",["GlobalCallback","getBlankIframeSrc","guid"],function $module_insertIframe(global,require,requireDynamic,requireLazy,module,exports){






function insertIframe(opts){




opts.id=opts.id||require("guid")();
opts.name=opts.name||require("guid")();






var srcSet=false;
var onloadDone=false;
var callback=function callback(){
if(srcSet&&!onloadDone){
onloadDone=true;
opts.onload&&opts.onload(opts.root.firstChild);
}
};
var globalCallback=require("GlobalCallback").create(callback);





if(document.attachEvent){


var html=
'<iframe'+
' id="'+
opts.id+
'"'+
' name="'+
opts.name+
'"'+(
opts.title?' title="'+opts.title+'"':'')+(
opts.className?' class="'+opts.className+'"':'')+
' style="border:none;'+(
opts.width?'width:'+opts.width+'px;':'')+(
opts.height?'height:'+opts.height+'px;':'')+
'"'+
' src="'+
require("getBlankIframeSrc")()+
'"'+
' frameborder="0"'+
' scrolling="no"'+
' allowtransparency="true"'+
' onload="'+
globalCallback+
'()"'+
'></iframe>';









opts.root.innerHTML=
'<iframe src="'+
require("getBlankIframeSrc")()+
'"'+
' frameborder="0"'+
' scrolling="no"'+
' style="height:1px"></iframe>';


srcSet=true;






setTimeout(function setTimeout_$0(){
opts.root.innerHTML=html;
opts.root.firstChild.src=opts.url;
opts.onInsert&&opts.onInsert(opts.root.firstChild);
},0);
}else{



var node=document.createElement('iframe');
node.id=opts.id;
node.name=opts.name;
node.onload=callback;
node.scrolling='no';
node.style.border='none';
node.style.overflow='hidden';
if(opts.title){
node.title=opts.title;
}
if(opts.className){
node.className=opts.className;
}
if(opts.height!==undefined){
node.style.height=opts.height+'px';
}
if(opts.width!==undefined){
if(opts.width=='100%'){
node.style.width=opts.width;
}else{
node.style.width=opts.width+'px';
}
}
opts.root.appendChild(node);


srcSet=true;

node.src=opts.url;
opts.onInsert&&opts.onInsert(node);
}
}

module.exports=insertIframe;},null);
                                                                                                              __d("sdk.domReady",[],function $module_sdk_domReady(global,require,requireDynamic,requireLazy,module,exports){



var queue;
var domIsReady=
'readyState'in document?
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
document.addEventListener('DOMContentLoaded',flush,false);
window.addEventListener('load',flush,false);
}else if(document.attachEvent){
document.attachEvent('onreadystatechange',flush);
window.attachEvent('onload',flush);
}











if(document.documentElement.doScroll&&window===window.top){
var test=function test(){
try{

document.documentElement.doScroll('left');
}catch(_unused){
setTimeout(test,0);
return;
}
flush();
};
test();
}
}

module.exports=domReady;},3);
                                                                                                                                    __d("sdk.Content",["Log","sdk.domReady","sdk.UA"],function $module_sdk_Content(global,require,requireDynamic,requireLazy,module,exports){

'use strict';






var visibleRoot;
var hiddenRoot;

var Content={







append:function append(content,root){

if(!root){
if(!visibleRoot){
visibleRoot=root=document.getElementById('fb-root');
if(!root){
require("Log").warn('The "fb-root" div has not been created, auto-creating');

visibleRoot=root=document.createElement('div');
root.id='fb-root';






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
root.className+=' fb_reset';
}else{
root=visibleRoot;
}
}

if(typeof content==='string'){
var div=document.createElement('div');
root.appendChild(div).innerHTML=content;
return div;
}else{
return root.appendChild(content);
}
},







appendHidden:function appendHidden(content){
if(!hiddenRoot){
hiddenRoot=document.createElement('div');
var style=hiddenRoot.style;
style.position='absolute';
style.top='-10000px';
style.width='0';
style.height='0';
hiddenRoot=Content.append(hiddenRoot);
}

return Content.append(content,hiddenRoot);
},













submitToTarget:function submitToTarget(opts,get){
var form=document.createElement('form');
form.action=opts.url;
form.target=opts.target;
form.method=get?'GET':'POST';
Content.appendHidden(form);

for(var key in opts.params){
if(Object.prototype.hasOwnProperty.call(opts.params,key)){
var val=opts.params[key];
if(val!==null&&val!==undefined){
var input=document.createElement('input');
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
}};


module.exports=Content;},null);
                                                                                                 __d("sdk.Impressions",["Miny","QueryString","UrlMap","getBlankIframeSrc","guid","insertIframe","sdk.Content","sdk.Runtime"],function $module_sdk_Impressions(global,require,requireDynamic,requireLazy,module,exports){


















function request(params){
var clientID=require("sdk.Runtime").getClientID();

if(
clientID&&(
typeof params.api_key!=='string'||params.api_key===''))
{
params.api_key=clientID;
}

params.kid_directed_site=require("sdk.Runtime").getKidDirectedSite();

var url=require("UrlMap").resolve('www')+'/impression.php/'+require("guid")()+'/';
var fullUrlPath=require("QueryString").appendToUrl(url,params);
if(fullUrlPath.length>2000){


if(params.payload&&typeof params.payload==='string'){
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


function _makeRequest(
url,
fullUrlPath,
params)
{
var standardFetchOptions={
mode:'no-cors'};


if(fullUrlPath.length<=2000){
window.fetch(fullUrlPath,standardFetchOptions);
}else{
var searchParams=new URLSearchParams();

for(var key in params){
if(Object.prototype.hasOwnProperty.call(params,key)){
var val=params[key];
if(val!==null&&val!==undefined){
searchParams.set(key,val);
}
}
}

var fetchOptions=babelHelpers["extends"]({
method:'POST',
body:searchParams},
standardFetchOptions);

window.fetch(url,fetchOptions);
}
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
var root=require("sdk.Content").appendHidden('');
require("insertIframe")({
url:require("getBlankIframeSrc")(),
root:root,
name:name,
className:'fb_hidden fb_invisible',
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

var Impressions={
log:function log(lid,payload){
if(typeof payload.source!=='string'||payload.source===''){
payload.source='jssdk';
}

request({
lid:lid,
payload:ES("JSON","stringify",false,payload)});

},

impression:request};


module.exports=Impressions;},null);
                                                                                  __d("sdk.Scribe",["QueryString","UrlMap","sdk.Runtime"],function $module_sdk_Scribe(global,require,requireDynamic,requireLazy,module,exports){






function log(category,data){
if(data.extra!=null&&typeof data.extra==='object'){
var extra=data.extra;
extra.revision=require("sdk.Runtime").getRevision();
}
new Image().src=require("QueryString").appendToUrl(
require("UrlMap").resolve('www')+'/common/scribe_endpoint.php',
{
c:category,
m:ES("JSON","stringify",false,data)});


}

var Scribe={
log:log};


module.exports=Scribe;},null);
                                                                                         __d("Base64",[],function $module_Base64(global,require,requireDynamic,requireLazy,module,exports){














var en='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
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
'>___?456789:;<=_______'+
'\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19'+
'______\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./0123';
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
str=(str+'\0\0'.slice(i)).replace(/[\s\S]{3}/g,en3);
return str.slice(0,str.length+i-2)+'=='.slice(i);
},
decode:function decode(input){

var str=input.replace(/[^A-Za-z0-9+\/]/g,'');
var i=str.length+3&3;
str=(str+'AAA'.slice(i)).replace(/..../g,de4);
str=str.slice(0,str.length+i-3);

try{
return decodeURIComponent(escape(str));
}catch(_unused){
throw new Error('Not valid UTF-8');
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

}};


module.exports=Base64;},null);
                                                                                                                                                                                                                                                                                                                                                                       __d("sdk.SignedRequest",["Base64"],function $module_sdk_SignedRequest(global,require,requireDynamic,requireLazy,module,exports){



function parse(signed_request){
if(signed_request==null||signed_request===''){
return null;
}


var payload=signed_request.
split('.',2)[1].
replace(/\-/g,'+').
replace(/\_/g,'/');
return require("Base64").decodeObject(payload);
}

var SignedRequest={
parse:parse};


module.exports=SignedRequest;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           __d("sdk.URI",["QueryString","URIBase"],function $module_sdk_URI(global,require,requireDynamic,requireLazy,module,exports){var c_URIBase;





var facebookRe=/\.facebook\.com$/;

var serializer={
serialize:function serialize(map){
return map?require("QueryString").encode(map):'';
},
deserialize:function deserialize(text){
return text?require("QueryString").decode(text):{};
}};var


URI=function(_URIBase){"use strict";babelHelpers.inheritsLoose(URI,_URIBase);
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
return(c_URIBase||(c_URIBase=require("URIBase"))).isValid(uri,serializer);
};return URI;}(c_URIBase||(c_URIBase=require("URIBase")));


module.exports=URI;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                               __d("sdk.WebStorage",["Log"],function $module_sdk_WebStorage(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var WebStorage={
getLocalStorage:function getLocalStorage(){
try{

return window.localStorage;
}catch(_unused){
require("Log").warn('Failed to get local storage');
}
return null;
},






getLocalStorageForRead:function getLocalStorageForRead(){
try{


var storage=window.localStorage;



if(storage){
var key='__test__'+ES("Date","now",false);
storage.setItem(key,'');
storage.removeItem(key);
}
return storage;
}catch(_unused2){
require("Log").warn('Failed to get local storage');
}
return null;
},

getSessionStorage:function getSessionStorage(){
try{

return window.sessionStorage;
}catch(_unused3){
require("Log").warn('Failed to get session storage');
}
return null;
},






getSessionStorageForRead:function getSessionStorageForRead(){
try{


var storage=window.sessionStorage;



if(storage){
var key='__test__'+ES("Date","now",false);
storage.setItem(key,'');
storage.removeItem(key);
}
return storage;
}catch(_unused4){
require("Log").warn('Failed to get session storage');
}
return null;
}};


module.exports=WebStorage;},null);
                                                                                                 __d("sdk.FeatureFunctor",[],function $module_sdk_FeatureFunctor(global,require,requireDynamic,requireLazy,module,exports){








function feature(config,name,defaultValue){
if(config.features&&name in config.features){
var value=config.features[name];
if(typeof value==='object'&&typeof value.rate==='number'){

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

function createFeatureFunction(config){
return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
if(args.length<2){
throw new Error('Default value is required');
}var
name=args[0],defaultValue=args[1];
return feature(config,name,defaultValue);
};
}

module.exports={
create:createFeatureFunction};},null);
                                                                                                              __d("sdk.feature",["JSSDKConfig","sdk.FeatureFunctor"],function $module_sdk_feature(global,require,requireDynamic,requireLazy,module,exports){












module.exports=require("sdk.FeatureFunctor").create(require("JSSDKConfig"));},null);
                                                                                               __d("sdk.getContextType",["sdk.Runtime","sdk.UA"],function $module_sdk_getContextType(global,require,requireDynamic,requireLazy,module,exports){




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
}

module.exports=getContextType;},null);
                                                                                                 __d("sdk.Auth",["Log","ObservableMixin","PlatformOAuthDialogLoginFunnelLogger","QueryString","UrlMap","sdk.Cookie","sdk.feature","sdk.getContextType","sdk.Impressions","sdk.Runtime","sdk.Scribe","sdk.SignedRequest","sdk.URI","sdk.WebStorage"],function $module_sdk_Auth(global,require,requireDynamic,requireLazy,module,exports){





















var LOCAL_STORAGE_TOKEN_PREFIX='fblst_';
var SESSION_STORAGE_LOGIN_STATUS_PREFIX='fbssls_';
var LOGOUT_COOKIE_PREFIX='fblo_';
var YEAR_MS=365*24*60*60*1000;
var CONNECTED_REVALIDATE_PERIOD=60*90*1000;
var DEFAULT_REVALIDATE_PERIOD=60*60*24*1000;
var PLATFORM_E2E_TRACKING_LOG_ID=114;

var currentAuthResponse;

var timer;

var Auth=new(require("ObservableMixin"))();



























function setAuthResponse(
authResponse,
status,
fromCache)
{if(fromCache===void 0){fromCache=false;}
var currentUserID=require("sdk.Runtime").getUserID();
var currentStatus=require("sdk.Runtime").getLoginStatus();

var userID='';
if(authResponse!=null){
loadState='loaded';




if(authResponse.userID!=null&&authResponse.userID!==''){
userID=authResponse.userID;
}else if(
authResponse.signedRequest!=null&&
authResponse.signedRequest!=='')
{
var parsedSignedRequest=require("sdk.SignedRequest").parse(
authResponse.signedRequest);

if(
parsedSignedRequest!=null&&
parsedSignedRequest!==''&&
parsedSignedRequest.user_id!=null&&
parsedSignedRequest.user_id!=='')
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
currentStatus==='unknown'&&authResponse!=null||
require("sdk.Runtime").getUseCookie()&&require("sdk.Runtime").getCookieUserID()!==userID;
var logout=
currentUserID!=null&&currentUserID!==''&&authResponse==null;

var both=
authResponse!=null&&
currentUserID!=null&&
currentUserID!==''&&
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
Auth.inform('logout',response);
}
if(login||both){
Auth.inform('login',response);
}
if(authResponseChange){
Auth.inform('authresponse.change',response);
}
if(statusChange){
Auth.inform('status.change',response);
}

if(
!fromCache&&
require("sdk.feature")('cache_auth_response',false)&&
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
if(require("sdk.Cookie").getDomain()==null){




require("sdk.Cookie").setDomain('.'+baseDomain);
}
}

function setGraphDomain(graphDomain){


if(!!graphDomain){
require("sdk.Runtime").setGraphDomain(graphDomain);
}else{
require("sdk.Runtime").setGraphDomain('');
}
}

function logout(cb){
var currentAuthResponse=getAuthResponse();
setAuthResponse(null,'unknown');
setLogoutState();

if(currentAuthResponse!=null&&currentAuthResponse.accessToken!=null){
var url=new(require("sdk.URI"))(
require("UrlMap").resolve('www').replace('web.','www.')+'/x/oauth/logout').
addQueryData(
"access_token",
currentAuthResponse.accessToken);

var xhr=new XMLHttpRequest();
if(xhr){
xhr.open('GET',url.toString(),true);
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
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'PLATFORM_AUTH_LOGOUT',
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
status='connected';
setAuthResponse(authResponse,status);
logSuccessfulAuth(requestParams);
}else if(params&&params.asset_scopes){

authResponse={
asset_scopes:ES("JSON","parse",false,params.asset_scopes)};


authResponse=populateAuthResponse(authResponse,params);

removeLogoutState();
status='connected';
setAuthResponse(authResponse,status);
logSuccessfulAuth(requestParams);
}else if(params&&params.error==='access_denied'){


setLogoutState();
status='unknown';
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
client_funnel_version:
require("PlatformOAuthDialogLoginFunnelLogger").CLIENT_FUNNEL_VERSION,
cbt_delta:ES("Date","now",false)-cbt};

require("sdk.Impressions").log(117,{
payload:payload});

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

if(
require("sdk.Runtime").getUseLocalStorage()&&
location.protocol==='https:'&&
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
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,'',0,false);
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,'',0,true);
}


function setLogoutState(){
require("sdk.Cookie").setRaw(LOGOUT_COOKIE_PREFIX,'y',ES("Date","now",false)+YEAR_MS,false);
}

function unknownStatus(cb){
var unk_status='unknown';
setAuthResponse(null,unk_status);
var response={
authResponse:null,
status:unk_status};

if(cb){
cb(response);
}
}

function fetchLoginStatus(fn){var _redirAccessToken;
if(timer){
window.clearTimeout(timer);
timer=null;
}

var fb_logged_out=require("sdk.Cookie").getRaw(LOGOUT_COOKIE_PREFIX)==='y';





var redirAccessToken=null;
var redirCancelled=false;
if(
require("sdk.Runtime").getLoginStatus()!=='connected'&&(
document.referrer===''||
/^https?:\/\/([\w\.]+)?facebook.com\//.test(document.referrer)))
{

var fragment=location.hash.substr(1);
if(fragment!==''){
var fragmentParams=require("QueryString").decode(fragment,true);
redirAccessToken=fragmentParams.access_token;
if(redirAccessToken!=null){
removeLogoutState();
}

if(window==top&&redirAccessToken!=null){

delete fragmentParams.access_token;
delete fragmentParams.code;
delete fragmentParams.signed_request;
location.hash=require("QueryString").encode(fragmentParams);
}
}


var queryParams=require("QueryString").decode(location.search);
if(queryParams.error==='access_denied'){
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

if(window.location.protocol!=='https:'){

unknownStatus(fn);
}
Auth.getLoginStatusCORS(fn,token,currentAuthResponse);
}

function getCORSTarget(token){
var url=new(require("sdk.URI"))(
require("UrlMap").resolve('www').replace('web.','www.')+'/x/oauth/status').

addQueryData("client_id",require("sdk.Runtime").getClientID()).
addQueryData("input_token",token).
addQueryData(
"redirect_uri",
window.location.href).

addQueryData("origin",require("sdk.getContextType")()).
addQueryData("sdk",'joey').
addQueryData(
"wants_cookie_data",
require("sdk.Runtime").getUseCookie());


if(!!window.location.ancestorOrigins){
var ancestorOrigins=window.location.ancestorOrigins;
if(ancestorOrigins.length>0){
var ancestorOriginString='';

for(var i=0;i<ancestorOrigins.length;i++){
ancestorOriginString+=ancestorOrigins[i];
ancestorOriginString+=',';
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
location.protocol==='https:'&&
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
var _response2={
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()};

cb(_response2);
}
}

function onCORSFailure(
cb,
httpStatus,
currentAuthResponse)
{
if(httpStatus===0){
if(require("sdk.feature")('cors_status_fetch_cancel_tracking',false)){
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'CORS_STATUS_FETCH_CANCELLED',
extra:{message:'Status 0 returned.'}});

}
require("Log").error('Error retrieving login status, fetch cancelled.');
}else{

require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'CORS_STATUS_FETCH',
extra:{message:'HTTP Status Code '+httpStatus}});

require("Log").error('Error retrieving login status, HTTP status code: '+httpStatus);
}
if(cb){
var _response3={
authResponse:currentAuthResponse,
status:require("sdk.Runtime").getLoginStatus()};

cb(_response3);
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
xhr.open('GET',url.toString(),true);
xhr.withCredentials=true;
xhr.onreadystatechange=function(){
if(xhr.readyState===4){
if(require("sdk.feature")('e2e_ping_tracking',true)){
var events={
init:fetchStart,
close:ES("Date","now",false),
method:'cors'};

require("Log").debug('e2e: %s',ES("JSON","stringify",false,events));
require("sdk.Impressions").log(PLATFORM_E2E_TRACKING_LOG_ID,{
payload:events});

}

if(xhr.status===200){var _xhr$getResponseHeade,_xhr$getResponseHeade2;
onCORSSuccess(
cb,(_xhr$getResponseHeade=
xhr.getResponseHeader("fb-s"))!=null?_xhr$getResponseHeade:
"unknown",(_xhr$getResponseHeade2=
xhr.getResponseHeader("fb-ar"))!=null?_xhr$getResponseHeade2:
'{}');

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
referrer:'/',
mode:'cors',
credentials:'include'}).

then(function then_$0(response){
if(response.status===200){var _response$headers$get,_response$headers$get2;
onCORSSuccess(
cb,(_response$headers$get=
response.headers.get("fb-s"))!=null?_response$headers$get:
"unknown",(_response$headers$get2=
response.headers.get("fb-ar"))!=null?_response$headers$get2:
'{}');

}else{
onCORSFailure(cb,response.status,currentAuthResponse);
}
})["catch"](
function $0(_e){return onCORSFailure(cb,0,currentAuthResponse);});
}

if(typeof window.fetch==='function'){
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
if(appID==null||appID===''){
require("Log").warn('FB.getLoginStatus() called before calling FB.init().');
unknownStatus(cb);
return;
}

if(
!(typeof appID==='number'||typeof appID==='string')||
appID===0||
typeof appID==='string'&&(appID==='0'||!/^\d+$/.test(appID)))
{
require("Log").warn(
'FB.getLoginStatus() not checked for an invalid client ID '+appID);

unknownStatus(cb);
return;
}

if(
!force&&
require("sdk.feature")('cache_auth_response',false)&&
require("sdk.Runtime").getUseLocalStorage()&&
location.protocol==='https:')
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
loadState='loaded';
setAuthResponse(
cachedResponse.authResponse,(_cachedResponse$statu=
cachedResponse.status)!=null?_cachedResponse$statu:'unknown',
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
if(loadState==='loaded'){
if(cb){
var _response4={
authResponse:getAuthResponse(),
status:require("sdk.Runtime").getLoginStatus()};

cb(_response4);
}
return;
}else if(loadState==='loading'){
if(cb){
Auth.subscribe('FB.loginStatus',cb);
}
return;
}
}

if(cb){
Auth.subscribe('FB.loginStatus',cb);
}

loadState='loading';


var lsCb=function lsCb(response){

loadState='loaded';


Auth.inform('FB.loginStatus',response);
Auth.clearSubscribers('FB.loginStatus');
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
xdResponseWrapper:xdResponseWrapper});


module.exports=Auth;},null);
                                                                                             __d("sdk.DOM",["Assert","sdk.domReady"],function $module_sdk_DOM(global,require,requireDynamic,requireLazy,module,exports){





var cssRules={};

function getAttr(dom,name){
var attribute=
dom.getAttribute(name)||
dom.getAttribute(name.replace(/_/g,'-'))||
dom.getAttribute(name.replace(/-/g,'_'))||
dom.getAttribute(name.replace(/-/g,''))||
dom.getAttribute(name.replace(/_/g,''))||
dom.getAttribute('data-'+name)||
dom.getAttribute('data-'+name.replace(/_/g,'-'))||
dom.getAttribute('data-'+name.replace(/-/g,'_'))||
dom.getAttribute('data-'+name.replace(/-/g,''))||
dom.getAttribute('data-'+name.replace(/_/g,''));
return attribute!=null?String(attribute):null;
}

function getBoolAttr(dom,name){
var attribute=getAttr(dom,name);
return attribute!=null?/^(true|1|yes|on)$/.test(attribute):null;
}

function html(dom,content){
require("Assert").isTruthy(dom,'element not specified');
require("Assert").isString(content);

try{
dom.innerHTML=content;
}catch(e){
throw new Error('Could not set innerHTML : '+e.message);
}
}




function containsCss(dom,className){
require("Assert").isTruthy(dom,'element not specified');
require("Assert").isString(className);

var cssClassWithSpace=' '+dom.className+' ';
return ES(cssClassWithSpace,"indexOf",true,' '+className+' ')>=0;
}




function addCss(dom,className){
require("Assert").isTruthy(dom,'element not specified');
if(dom==null){
return;
}
require("Assert").isString(className);

if(!containsCss(dom,className)){
dom.className=dom.className+' '+className;
}
}




function removeCss(dom,className){
require("Assert").isTruthy(dom,'element not specified');
if(dom==null){
return;
}
require("Assert").isString(className);

var regExp=new RegExp('\\s*'+className,'g');
dom.className=ES(dom.className.replace(regExp,''),"trim",true);
}







function getByClass(
className,
dom,
tagName)
{
require("Assert").isString(className);

var _dom=dom||document.body;
if(_dom==null){
return[];
}
var _tagName=tagName||'*';
return ES("Array","from",false,_dom.querySelectorAll(_tagName+'.'+className));
}









function getStyle(dom,styleProp){
require("Assert").isTruthy(dom,'element not specified');
require("Assert").isString(styleProp);


var _styleProp=styleProp.replace(/-(\w)/g,function styleProp_replace_$1(m,g1){
return g1.toUpperCase();
});

var currentStyle=

dom.currentStyle||document.defaultView.getComputedStyle(dom,null);

var computedStyle=currentStyle[_styleProp];




if(
/backgroundPosition?/.test(_styleProp)&&
/top|left/.test(computedStyle))
{
computedStyle='0%';
}
return computedStyle;
}







function setStyle(dom,styleProp,value){
require("Assert").isTruthy(dom,'element not specified');
require("Assert").isString(styleProp);


styleProp=styleProp.replace(/-(\w)/g,function styleProp_replace_$1(m,g1){
return g1.toUpperCase();
});
dom.style[styleProp]=value;
}




function addCssRules(styles,names){


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

var style=document.createElement('style');
style.type='text/css';
style.textContent=styles;
document.getElementsByTagName('head')[0].appendChild(style);
}




function remove(elem){
if(!elem||!elem.parentNode){
return null;
}else{
return elem.parentNode.removeChild(elem);
}
}








function getViewportInfo(){var _document$body,_document$body2;

var root=
document.documentElement&&document.compatMode=='CSS1Compat'?
document.documentElement:
document.body;

return{

scrollTop:(root==null?void 0:root.scrollTop)||((_document$body=document.body)==null?void 0:_document$body.scrollTop),
scrollLeft:(root==null?void 0:root.scrollLeft)||((_document$body2=document.body)==null?void 0:_document$body2.scrollLeft),
width:window.innerWidth?window.innerWidth:root==null?void 0:root.clientWidth,
height:window.innerHeight?window.innerHeight:root==null?void 0:root.clientHeight};

}

var DOM={
addCss:addCss,
addCssRules:addCssRules,
containsCss:containsCss,
getAttr:getAttr,
getBoolAttr:getBoolAttr,
getByClass:getByClass,
getStyle:getStyle,
getViewportInfo:getViewportInfo,
html:html,
ready:require("sdk.domReady"),
remove:remove,
removeCss:removeCss,
setStyle:setStyle};


module.exports=DOM;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                  __d("normalizeError",["sdk.UA"],function $module_normalizeError(global,require,requireDynamic,requireLazy,module,exports){

'use strict';















var normalizeError=function normalizeError(err){
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
};

module.exports=normalizeError;},null);
                                                                                                 __d("sdk.ErrorHandler",["ManagedError","normalizeError","wrapFunction"],function $module_sdk_ErrorHandler(global,require,requireDynamic,requireLazy,module,exports){








function create(
handleError,
onError)



{
var currentEntry='';

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
currentEntry='';
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
'';
}catch(_unused){
return'';
}
}

function wrap(real,entry){
return function(fn,delay){
var name=
entry+
':'+(
currentEntry||'[global]')+
':'+(
fn.name||'[anonymous]'+getCalleeName(arguments));
return real(require("wrapFunction")(fn,'entry',name),delay);
};
}

if(handleError){

setTimeout=wrap(setTimeout,'setTimeout');
setInterval=wrap(setInterval,'setInterval');
require("wrapFunction").setWrapper(guard,'entry');
}

return{
guard:guard,
unguard:unguard};

}

module.exports={
create:create};},null);
                                                                                                 __d("sdk.ErrorHandling",["sdk.ErrorHandler","sdk.feature","sdk.Runtime","sdk.Scribe"],function $module_sdk_ErrorHandling(global,require,requireDynamic,requireLazy,module,exports){






var handleError=require("sdk.feature")('error_handling',false);

module.exports=require("sdk.ErrorHandler").create(handleError,function ErrorHandler_create_$1(error)




{
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:error.name||error.message,
extra:error});

});},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("FB",["DOMWrapper","GlobalCallback","JSSDKCssConfig","Log","dotAccess","sdk.Auth","sdk.Content","sdk.DOM","sdk.domReady","sdk.ErrorHandling","sdk.Runtime"],function $module_FB(global,require,requireDynamic,requireLazy,module,exports){














var externalInterface=window.FB={};

var FB={};

if(__DEV__){
FB.require=require;
window._FB=FB;
}




require("Log").level=__DEV__?3:0;


require("GlobalCallback").setPrefix('FB.__globalCallbacks');

var fbRoot=document.createElement('div');
require("DOMWrapper").setRoot(fbRoot);

require("sdk.domReady")(function domReady_$0(){
require("Log").info('domReady');
require("sdk.Content").appendHidden(fbRoot);
if(require("JSSDKCssConfig").rules){
require("sdk.DOM").addCssRules(require("JSSDKCssConfig").rules,require("JSSDKCssConfig").components);
}
});

require("sdk.Runtime").subscribe('AccessToken.change',function Runtime_subscribe_$1(value){
if(!value&&require("sdk.Runtime").getLoginStatus()==='connected'){


require("sdk.Auth").getLoginStatus(null,true);
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
if(val&&typeof val==='object'&&val.__wrapped){

return val.__wrapped;
}





return typeof val==='function'&&/^function/.test(val.toString())?
require("sdk.ErrorHandling").unguard(val):
val;
}

var args=ES(Array.prototype.slice.call(arguments),"map",true,unwrap);

var result=fn.apply(context,args);
var facade;
var isPlainObject=true;

if(result&&typeof result==='object'){



facade=ES("Object","create",false,result);
facade.__wrapped=result;



for(var key in result){
var property=result[key];
if(typeof property!=='function'||key==='constructor'){
continue;
}
isPlainObject=false;
facade[key]=protect(property,accessor+':'+key,key,result);
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


if(typeof value==='function'){
var accessor=(name?name+'.':'')+key;
var exportedProperty=protect(value,accessor,key,source);
if(exportedProperty){
externalTarget[key]=exportedProperty;
}
}else if(typeof value==='object'||typeof value==='number'){
externalTarget[key]=value;
}
});
}


ES("Object","assign",false,FB,{











provide:provide});


module.exports=FB;},null);
                                                                                                                                                                                                       __d("ArgumentError",["ManagedError"],function $module_ArgumentError(global,require,requireDynamic,requireLazy,module,exports){var



ArgumentError=function(_ManagedError){"use strict";babelHelpers.inheritsLoose(ArgumentError,_ManagedError);
function ArgumentError(message,innerError){return(
_ManagedError.call(this,message,innerError)||this);
}return ArgumentError;}(require("ManagedError"));


module.exports=ArgumentError;},null);
                                                                                                        __d("flattenObject",[],function $module_flattenObject(global,require,requireDynamic,requireLazy,module,exports){

'use strict';










var flattenObject=function flattenObject(
obj)
{
var flat={};
for(var _key in obj){
if(Object.prototype.hasOwnProperty.call(obj,_key)){
var value=obj[_key];
if(null===value||undefined===value){
continue;
}else if(typeof value==='string'){
flat[_key]=value;
}else{
flat[_key]=ES("JSON","stringify",false,value);
}
}
}
return flat;
};

module.exports=flattenObject;},null);
                                                                                  __d("ApiClientUtils",["ArgumentError","Assert","Log","flattenObject","sdk.URI","sprintf"],function $module_ApiClientUtils(global,require,requireDynamic,requireLazy,module,exports){









var METHODS={
get:true,
post:true,
"delete":true,
put:true};






function parseCallDataFromArgs(
args)





{
var path=args.shift();
require("Assert").isString(path,'Invalid path');
if(!/^https?/.test(path)&&path.charAt(0)!=='/'){
path='/'+path;
}

var uri;
var argsMap={};

try{
uri=new(require("sdk.URI"))(path);
}catch(e){
throw new(require("ArgumentError"))(e.message,e);
}


ES(args,"forEach",true,function args_forEach_$0(arg){return argsMap[typeof arg]=arg;});

var method=(argsMap.string||'get').toLowerCase();

require("Assert").isTrue(Object.prototype.hasOwnProperty.call(
METHODS,method),
require("sprintf")('Invalid method passed to ApiClient: %s',method));


var callback=argsMap['function'];
if(!callback){
require("Log").warn('No callback passed to the ApiClient');
}

if(argsMap.object){
uri.addQueryData(require("flattenObject")(argsMap.object));
}

var params=uri.getQueryData();
params.method=method;

return{uri:uri,callback:callback,params:params};
}

module.exports={parseCallDataFromArgs:parseCallDataFromArgs};},null);
                                                                              __d("errorCode",[],function $module_errorCode(global,require,requireDynamic,requireLazy,module,exports){

'use strict';




function errorCode(name){
throw new Error(
'errorCode'+'("'+name+'"): This should not happen. Oh noes!');

}

module.exports=errorCode;},null);
                                                                                                 __d("sdk.safelyParseResponse",["errorCode","nullthrows"],function $module_sdk_safelyParseResponse(global,require,requireDynamic,requireLazy,module,exports,errorCode){

'use strict';




var errorHandler=function errorHandler(ex,rawResponse,url){return ERROR;};







function safelyParseResponse(
rawResponse,
url)
{if(url===void 0){url=null;}
try{


return rawResponse===null?ERROR:ES("JSON","parse",false,require("nullthrows")(rawResponse));
}catch(ex){
return errorHandler(ex,rawResponse,url);
}
}

var ERROR={
error:{
code:1,
error_subcode:1357046,
message:'Received Invalid JSON reply.',
type:'http'}};


safelyParseResponse.ERROR=ERROR;
safelyParseResponse.setErrorHandler=function(newHandler){
errorHandler=newHandler;
};

module.exports=safelyParseResponse;},null);
                                                                                                 __d("whitelistObjectKeys",[],function $module_whitelistObjectKeys(global,require,requireDynamic,requireLazy,module,exports){





function whitelistObjectKeys(
source,
whitelist)
{
var result={};
var keys=ES("Array","isArray",false,whitelist)?whitelist:ES("Object","keys",false,whitelist);
for(var ii=0;ii<keys.length;ii++){
if(typeof source[keys[ii]]!=='undefined'){
result[keys[ii]]=source[keys[ii]];
}
}
return result;
}

module.exports=whitelistObjectKeys;},null);
                                                                                  __d("ApiBatcher",["invariant","ApiClientUtils","QueryString","sdk.safelyParseResponse","whitelistObjectKeys"],function $module_ApiBatcher(global,require,requireDynamic,requireLazy,module,exports,invariant){

'use strict';










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
var relative_url=uri.removeQueryData('method').toString();
if(method.toLowerCase()=='post'){
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
'ApiClient: _batchCalls is empty at dispatch.');


this.$ApiBatcher_batchCalls.length===this.$ApiBatcher_batchCallbacks.length||invariant(0,
'ApiClient: Every batch call should have a callback');



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
'/',
'POST',
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
callback({error:{message:'Fatal: batch call failed.'}}));});

}
});

};return ApiBatcher;}();


module.exports=ApiBatcher;},null);
                                                                                         __d("RequestConstants",["errorCode"],function $module_RequestConstants(global,require,requireDynamic,requireLazy,module,exports,errorCode){


var PARSE_ERROR_TEMPLATE={
code:1,
error_subcode:1357045,
message:'unknown error (empty response)',
type:'http',
status:0};


module.exports={
PARSE_ERROR_TEMPLATE:PARSE_ERROR_TEMPLATE};},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              __d("CORSRequest",["Log","QueryString","RequestConstants","sdk.safelyParseResponse","wrapFunction"],function $module_CORSRequest(global,require,requireDynamic,requireLazy,module,exports){








function createCORSRequest(method,url){
if(!self.XMLHttpRequest){
return null;
}
var xhr=new XMLHttpRequest();
var noop=function noop(){};
if('withCredentials'in xhr){
xhr.open(method,url,true);
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
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
if('onload'in wrapper){
wrapper.onload(xhr);
}
},
'entry',
'XMLHttpRequest:load');

var onerror=require("wrapFunction")(
function wrapFunction_$0(){
onerror=noop;
if('onerror'in wrapper){
wrapper.onerror(xhr);
}
},
'entry',
'XMLHttpRequest:error');







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
ES(url,"includes",true,'/../')||ES(
url,"includes",true,'/..\\')||ES(
url,"includes",true,'\\../')||ES(
url,"includes",true,'\\..\\'))
{
require("Log").error('CORSRequest.execute(): path traversal is not allowed.');
return false;
}
params.suppress_http_code=1;
var data=require("QueryString").encode(params);

if(method!='post'){
url=require("QueryString").appendToUrl(url,data);
data='';
}

var request=createCORSRequest(method,url);
if(!request){
return false;
}

request.onload=function(xhr){
cb(require("sdk.safelyParseResponse")(xhr.responseText,url));
};

request.onerror=function(xhr){
if(xhr.responseText){
cb(require("sdk.safelyParseResponse")(xhr.responseText,url));
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
execute:execute};

module.exports=CORSRequest;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               __d("ChunkedRequest",["Log","QueryString","RequestConstants","sdk.safelyParseResponse","wrapFunction"],function $module_ChunkedRequest(global,require,requireDynamic,requireLazy,module,exports){









var EMPTY_CHUNK_TEXT='{}';var


















ChunkParser=function(){"use strict";



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
if(!('withCredentials'in xhr)){
return null;
}

xhr.open(method,url,true);
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

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
'entry',
'XMLHttpRequest:onchunk');

var onerror=require("wrapFunction")(
function wrapFunction_$0(){



if(wrapper.onerror){
wrapper.onerror(xhr);
}
},
'entry',
'XMLHttpRequest:error');


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
ES(url,"includes",true,'/../')||ES(
url,"includes",true,'/..\\')||ES(
url,"includes",true,'\\../')||ES(
url,"includes",true,'\\..\\'))
{
require("Log").error('ChunkedRequest.execute(): path traversal is not allowed.');
return false;
}
params.suppress_http_code=1;
var data=require("QueryString").encode(params);

if(method!='post'){
url=require("QueryString").appendToUrl(url,data);
data='';
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
cb(require("sdk.safelyParseResponse")(xhr.responseText));
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

var ChunkedRequest={
execute:execute};

module.exports=ChunkedRequest;},null);
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
ES(url,"includes",true,'/../')||ES(
url,"includes",true,'/..\\')||ES(
url,"includes",true,'\\../')||ES(
url,"includes",true,'\\..\\'))
{
require("Log").error('JSONPRequest.execute(): path traversal is not allowed.');
return false;
}
var script=document.createElement('script');

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
type:'http',
message:'unknown error'}});


};


var ensureCallbackCalled=function ensureCallbackCalled(){
setTimeout(function setTimeout_$0(){


_callbackWrapper({
error:{
type:'http',
message:'unknown error'}});


},0);
};
if(script.addEventListener){
script.addEventListener('load',ensureCallbackCalled,false);
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
                                                                                                 __d("ApiClient",["ApiBatcher","ApiClientUtils","Assert","ChunkedRequest","CORSRequest","JSONPRequest","Log","ObservableMixin","QueryString","UrlMap","flattenObject"],function $module_ApiClient(global,require,requireDynamic,requireLazy,module,exports){














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


var defaultTransports=['cors','jsonp'];

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
ApiClient.inform('request.queued',url,method,paramsRaw);
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
if(method!=='get'){
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
type:'no-transport',
message:'Could not find a usable transport for request'}});


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
if(params.transport&&params.transport==='chunked'&&done===false){
callback(response,false);
return;
}

if(response&&response.error){
ApiClient.inform(
'request.error',
endpoint,
method,
params,
response,
ES("Date","now",false)-startTime,
requestIndex);

}

ApiClient.inform(
'request.complete',
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
method='post';
}

var url=
uri.getProtocol()&&uri.getDomain()?
uri.setQueryData({}).toString():
require("UrlMap").resolve('graph_domain')+uri.getPath();

var requestIndex=requestCounter++;
if('_fb_domain'in params){
ApiClient.setKeptQueryParams(['_fb_domain']);
}
ApiClient.inform('request.prepare',url,params,requestIndex);

request(
url,
method=='get'?'get':'post',
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
require("Assert").isString(params.method,'method missing');

if(!cb){
logger.warn('No callback passed to the ApiClient');
}
var method=params.method.toLowerCase().replace('.','_');
params.format='json-strings';
params.api_key=clientID;

var domain=method in READONLYCALLS?'api_read':'api';
var url=require("UrlMap").resolve(domain)+'/restserver.php';
var requestIndex=requestCounter++;
var inspector=ES(inspect,"bind",true,
null,
cb,
'/restserver.php',
'get',
params,ES("Date","now",false),

requestIndex);

request(url,'get',params,inspector);
}

function prepareBatchParams(args){
return require("ApiBatcher").prepareBatchParams(args,keptQueryParams);
}

var ApiClient=ES("Object","assign",false,new(require("ObservableMixin"))(),{
setAccessToken:function setAccessToken(access_token){
if(accessToken&&access_token&&accessToken!==access_token){
logger.error(
'You are overriding current access token, that means some other '+
'app is expecting different access token and you will probably '+
'break things. Please consider passing access_token directly to '+
'API parameters instead of overriding the global settings.');

}
accessToken=access_token;
},
setAccessTokenForClientID:function setAccessTokenForClientID(access_token,client_id){
if(accessToken&&clientID&&clientID!==client_id){
logger.error(
'Not overriding access token since it was not '+
'initialized by your application.');

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
'Warning: Two different applications have attempted to set the '+
'client ID. Overriding the previously set client ID.');

}
clientID=client_id;
},
setDefaultParams:function setDefaultParams(default_params){
defaultParams=default_params;
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
return uri.toString().length>MAX_QUERYSTRING_LENGTH&&method==='get';
}

module.exports=ApiClient;},null);
                                                                                                              __d("sdk.PlatformVersioning",["ManagedError","sdk.Runtime"],(function $module_sdk_PlatformVersioning(global,require,requireDynamic,requireLazy,module,exports){





var REGEX=/^v\d+\.\d\d?$/;

var PlatformVersioning={
REGEX:REGEX,

assertVersionIsSet:function assertVersionIsSet(){
if(!require("sdk.Runtime").getVersion()){
throw new(require("ManagedError"))('init not called with valid version');
}
},

assertValidVersion:function assertValidVersion(version){
if(!REGEX.test(version)){
throw new(require("ManagedError"))('invalid version specified');
}
}};


module.exports=PlatformVersioning;}),null);
                                                                                                                                                                      __d("sdk.warnInsecure",["Log","sdk.feature","sdk.Runtime","sdk.Scribe"],function $module_sdk_warnInsecure(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







var httpsOnlyLearnMore=require("sdk.feature")('https_only_learn_more','');
var logged={};

function warnInsecure(methodName){
if(window.location.protocol!=='https:'){
require("Log").log(
'error',
-1,
'The method FB.%s can no longer be called from http pages. %s',
methodName,
httpsOnlyLearnMore);

if(
require("sdk.feature")('https_only_scribe_logging',true)&&
!Object.prototype.hasOwnProperty.call(logged,methodName))
{
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'HttpsOnly',
extra:{
message:methodName}});


logged[methodName]=true;
}
}
return true;
}

module.exports=warnInsecure;},null);
                                                                                             __d("sdk.api",["ApiClient","sdk.feature","sdk.PlatformVersioning","sdk.Runtime","sdk.Scribe","sdk.URI","sdk.warnInsecure"],function $module_sdk_api(global,require,requireDynamic,requireLazy,module,exports){var ApiClient;








var shouldLogResponseError=require("sdk.feature")('should_log_response_error',false);


var currentAccessToken;

require("sdk.Runtime").subscribe('ClientID.change',function Runtime_subscribe_$1(value){return(
require("ApiClient").setClientID(value));});


require("sdk.Runtime").subscribe('AccessToken.change',function Runtime_subscribe_$1(value){
currentAccessToken=value;
require("ApiClient").setAccessToken(value);
});

(ApiClient=require("ApiClient")).setDefaultParams({
sdk:'joey'});



ApiClient.subscribe('request.complete',function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
var invalidateToken=false;
if(response&&typeof response==='object'){
if(response.error){
if(
response.error=='invalid_token'||
response.error.type=='OAuthException'&&response.error.code==190)
{
invalidateToken=true;
}
}else if(response.error_code){
if(response.error_code=='190'){
invalidateToken=true;
}
}
}
if(invalidateToken&&currentAccessToken===require("sdk.Runtime").getAccessToken()){

require("sdk.Runtime").setAccessToken(null);
}
});


ApiClient.subscribe('request.complete',function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
if(
(endpoint=='/me/permissions'&&method==='delete'||
endpoint=='/restserver.php'&&
params.method=='Auth.revokeAuthorization')&&
response===true)
{
require("sdk.Runtime").setAccessToken(null);
}
});


ApiClient.subscribe('request.error',function ApiClient_subscribe_$1(
endpoint,
method,
params,
response)
{
if(shouldLogResponseError&&response.error.type==='http'){
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'transport',
extra:{
name:'transport',

message:
ES("JSON","stringify",false,response.error)+' from '+endpoint+' , '+method}});


}
});







function api(path){
require("sdk.warnInsecure")('api');


if(typeof path==='string'){
if(require("sdk.Runtime").getIsVersioned()){
require("sdk.PlatformVersioning").assertVersionIsSet();


if(!/https?/.test(path)&&path.charAt(0)!=='/'){
path='/'+path;
}
path=new(require("sdk.URI"))(path).
setDomain(null).
setProtocol(null).
toString();


if(
!require("sdk.PlatformVersioning").REGEX.test(path.substring(1,ES(path,"indexOf",true,'/',1))))
{
path='/'+require("sdk.Runtime").getVersion()+path;
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




require("FB").provide('',{api:require("sdk.api")});}),3);
                                                                                                 __d("sdk.Event",[],function $module_sdk_Event(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

var Event={
SUBSCRIBE:'event.subscribe',
UNSUBSCRIBE:'event.unsubscribe',







subscribers:function subscribers(){




if(!this._subscribersMap){
this._subscribersMap={};
}
return this._subscribersMap;
},





































subscribe:function subscribe(name,cb){
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
},




















unsubscribe:function unsubscribe(name,cb){
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
},











monitor:function monitor(name,callback){
if(!callback()){
var ctx=this;
var fn=function fn(){
if(callback.apply(callback,arguments)){
ctx.unsubscribe(name,fn);
}
};

this.subscribe(name,fn);
}
},










clear:function clear(name){
delete this.subscribers()[name];
},







fire:function fire(name){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var subs=this.subscribers()[name];

if(subs){
ES(subs,"forEach",true,function subs_forEach_$0(sub){


if(sub){
sub.apply(this,args);
}
});
}
}};


module.exports=Event;},null);
                                                                                                                                                                                                                                                __d("resolveURI",[],function $module_resolveURI(global,require,requireDynamic,requireLazy,module,exports){

function resolveURI(uri){
if(!uri){

return window.location.href;
}

uri=uri.
replace(/&/g,'&amp;').
replace(/\"/g,'&quot;');

var div=document.createElement('div');


div.innerHTML='<a href="'+uri+'"></a>';

return div.firstChild.href;
}

module.exports=resolveURI;},null);
                                                                                         __d("dedupString",[],function $module_dedupString(global,require,requireDynamic,requireLazy,module,exports){

'use strict';









function dedupString(str){var _Object$keys;






return ES("Object","keys",false,(_Object$keys={},_Object$keys[str]=0,_Object$keys))[0];
}

module.exports=dedupString;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                   __d("DOMEventListener",["invariant","dedupString","emptyFunction","wrapFunction"],function $module_DOMEventListener(global,require,requireDynamic,requireLazy,module,exports,invariant){









var supportsPassive=false;
try{
var opts=Object.defineProperty({},'passive',{
get:function get(){
supportsPassive=true;
}});

window.addEventListener('test',null,opts);
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
'entry',
require("dedupString")('DOMEventListener.add '+name));

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
'entry',
'DOMEventListener.add '+name);

target.attachEvent||invariant(0,'`target` has no `attachEvent` method.');
target.attachEvent('on'+name,listener.wrapper);
};
_remove=function remove(
target,
name,
listener,
_options)
{if(_options===void 0){_options=false;}
target.detachEvent||invariant(0,'`target` has no `detachEvent` method.');



target.detachEvent('on'+name,listener.wrapper);
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
jsonrpc:'2.0',
method:_stub};for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}


if(typeof args[args.length-1]==='function'){
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
require("Log").warn('Could not find callback %s',id);
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
jsonrpc:'2.0',
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
require("Log").error('Method "%s" has not been defined',rpc.method);

send('error',{
code:-32601,
message:'Method not found',
data:rpc.method});

return;
}


rpc.params.push(ES(send,"bind",true,null,'result'));
rpc.params.push(ES(send,"bind",true,null,'error'));


try{
var returnValue=method.apply(context||null,rpc.params);

if(typeof returnValue!=='undefined'){
send('result',returnValue);
}
}catch(rpcEx){
require("Log").error(
'Invokation of RPC method %s resulted in the error: %s',
rpc.method,
rpcEx.message);


send('error',{
code:-32603,
message:'Internal error',
data:rpcEx.message});

}
};return JSONRPC;}();


module.exports=JSONRPC;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        __d("Queue",[],function $module_Queue(global,require,requireDynamic,requireLazy,module,exports){






var registry={};var







Queue=function(){"use strict";











function Queue(opts){
this._timeout=null;


this._interval=(opts==null?void 0:opts.interval)||0;
this._processor=opts==null?void 0:opts.processor;


this._queue=[];
this._stopped=true;
}var _proto=Queue.prototype;_proto.








_dispatch=function _dispatch(force){var _this=this;if(force===void 0){force=false;}
if(this._stopped||this._queue.length===0){
return;
}

var processor=this._processor;
if(processor==null){
this._stopped=true;
throw new Error('No processor available');
}

var interval=this._interval;
if(interval!=null){
processor.call(this,this._queue.shift());
this._timeout=setTimeout(function setTimeout_$0(){return _this._dispatch();},interval);
}else{
while(this._queue.length){
processor.call(this,this._queue.shift());
}
}
};_proto.









enqueue=function enqueue(message){
if(this._processor&&!this._stopped){
this._processor(message);
}else{
this._queue.push(message);
}
return this;
};_proto.








start=function start(processor){
if(processor){
this._processor=processor;
}
this._stopped=false;
this._dispatch();
return this;
};_proto.

isStarted=function isStarted(){
return!this._stopped;
};_proto.





dispatch=function dispatch(){
this._dispatch(true);
};_proto.







stop=function stop(scheduled){
this._stopped=true;
if(scheduled&&this._timeout!=null){
clearTimeout(this._timeout);
}
return this;
};_proto.









merge=function merge(queue,prepend){
if(prepend){var _this$_queue;
(_this$_queue=this._queue).unshift.apply(_this$_queue,queue._queue);
}else{var _this$_queue2;
(_this$_queue2=this._queue).push.apply(_this$_queue2,queue._queue);
}
queue._queue=[];
this._dispatch();
return this;
};_proto.




getLength=function getLength(){
return this._queue.length;
};Queue.









get=function get(name,opts){
var queue;
if(name in registry){
queue=registry[name];
}else{
queue=registry[name]=new Queue(opts);
}
return queue;
};Queue.







exists=function exists(name){
return name in registry;
};Queue.








remove=function remove(name){
return delete registry[name];
};return Queue;}();



module.exports=Queue;},null);
                                                                                             __d("sdk.RPC",["Assert","JSONRPC","Queue"],function $module_sdk_RPC(global,require,requireDynamic,requireLazy,module,exports){





var outQueue=new(require("Queue"))();
var jsonrpc=new(require("JSONRPC"))(function(message){
outQueue.enqueue(message);
});

var RPC={
local:jsonrpc.local,
remote:jsonrpc.remote,
stub:ES(jsonrpc.stub,"bind",true,jsonrpc),
setInQueue:function setInQueue(queue){
require("Assert").isInstanceOf(require("Queue"),queue);

queue.start(function queue_start_$0(message){
jsonrpc.read(message);
});
},
getOutQueue:function getOutQueue(){
return outQueue;
}};


module.exports=RPC;},null);
                                                                                             __d("sdk.Canvas.Environment",["sdk.RPC"],(function $module_sdk_Canvas_Environment(global,require,requireDynamic,requireLazy,module,exports){



function getPageInfo(appCallback){
require("sdk.RPC").remote.getPageInfo(function RPC_remote_getPageInfo_$0(response){
appCallback(response.result);
});
}

function scrollTo(x,y){
require("sdk.RPC").remote.scrollTo({x:x||0,y:y||0});
}

require("sdk.RPC").stub('getPageInfo');
require("sdk.RPC").stub('scrollTo');

var Environment={
getPageInfo:getPageInfo,
scrollTo:scrollTo};


module.exports=Environment;}),null);
                                                                                                 __d("sdk.DialogUtils",["DOMEventListener","sdk.Content","sdk.DOM","sdk.UA"],function $module_sdk_DialogUtils(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







var DialogUtils={
isOrientationPotrait:function isOrientationPotrait(){
return window.innerWidth<window.innerHeight;
},

addDoubleClickAction:function addDoubleClickAction(
element,
actionCallback,
delayBetweenClicks)
{
var clickTimer=null;
return require("DOMEventListener").add(element,'click',function DOMEventListener_add_$2(){
if(clickTimer!==null){
clearTimeout(clickTimer);
clickTimer=null;
actionCallback();
}
clickTimer=setTimeout(function setTimeout_$0(){
clickTimer=null;
},delayBetweenClicks);
});
},

addIdleDesktopAction:function addIdleDesktopAction(
element,
actionCallback,
delayToIdle)
{
var timer;
var event;
var startTimer=function startTimer(){
timer=setTimeout(actionCallback,delayToIdle);
};

startTimer();
return require("DOMEventListener").add(element,'mouseenter',function DOMEventListener_add_$2(){

clearTimeout(timer);
if(!event){
event=require("DOMEventListener").add(element,'mouseleave',function DOMEventListener_add_$2(){
startTimer();
});
}
});
},

addMobileOrientationChangeAction:function addMobileOrientationChangeAction(actionCallback){
if(!require("sdk.UA").mobile()){
return null;
}





var event=
'onorientationchange'in window?'orientationchange':'resize';

var callback=function callback(e){return setTimeout(function setTimeout_$0(e){return actionCallback(e);},50);};

return require("DOMEventListener").add(window,event,callback);
},

applyScreenDimensions:function applyScreenDimensions(element){
if(element==null){
return;
}
var view=require("sdk.DOM").getViewportInfo();


element.style.minHeight=
view.height||view.width?view.height+'px':'';
element.style.top=view.scrollTop?view.scrollTop+'px':'';
},

setDialogPositionToCenter:function setDialogPositionToCenter(
dialog,
isTablet,
pageInfo)
{
var parseNumber=function parseNumber(n){return typeof n==='number'?n:parseInt(n,10);};
var view=require("sdk.DOM").getViewportInfo();
var width=parseNumber(dialog.offsetWidth);
var height=parseNumber(dialog.offsetHeight);
var left=view.scrollLeft+(view.width-width)/2;






var minTop=(view.height-height)/2.5;
if(left<minTop){
minTop=left;
}
var maxTop=view.height-height-minTop;


var top=(view.height-height)/2;
if(pageInfo){
top=
pageInfo.scrollTop-
pageInfo.offsetTop+
(pageInfo.clientHeight-height)/2;
}


if(top<minTop){
top=minTop;
}else if(top>maxTop){
top=maxTop;
}


top+=view.scrollTop;



if(require("sdk.UA").mobile()){



















var paddingHeight=100;



if(isTablet){
paddingHeight+=(view.height-height)/2;
require("sdk.DOM").addCss(document.body,'fb_reposition');
}else{
require("sdk.DOM").addCss(document.body,'fb_hidden');




document.body.style.width='auto';

top=10000;
}

var paddingDivs=require("sdk.DOM").getByClass('fb_dialog_padding',dialog);
if(paddingDivs.length){
paddingDivs[0].style.height=paddingHeight+'px';
}
}

dialog.style.left=(left>0?left:0)+'px';
dialog.style.top=(top>0?top:0)+'px';
},

setDialogPositionToTop:function setDialogPositionToTop(
dialog,
isTablet,
pageInfo)
{

this.setDialogPositionToCenter(dialog,isTablet,pageInfo);


var view=require("sdk.DOM").getViewportInfo();
var top=view.scrollTop+(view.height-dialog.offsetHeight)*0.05;
require("sdk.DOM").setStyle(dialog,'top',top+'px');
},




setupNewDarkOverlay:function setupNewDarkOverlay(){
var overlay=document.createElement('div');

overlay.setAttribute('id','fb_dialog_ipad_overlay');
this.applyScreenDimensions(overlay);
return overlay;
},


















setupNewDialog:function setupNewDialog(options)













{
options=options||{};
var dialog=document.createElement('div');var _options=
options,onClose=_options.onClose;


if(options.closeIcon&&onClose){
var closeIcon=document.createElement('a');
closeIcon.className='fb_dialog_close_icon';
require("DOMEventListener").add(closeIcon,'click',onClose);
dialog.appendChild(closeIcon);
}


var className='fb_dialog';
className+=' '+(options.classes||'');
className+=require("sdk.UA").mobile()?' fb_dialog_mobile':' fb_dialog_advanced';
dialog.className=className;


if(options.width){
var width=parseInt(options.width,10);
if(!isNaN(width)){
dialog.style.width=width+'px';
}
}

var contentRoot=document.createElement('div');

if(options.content){
require("sdk.Content").append(options.content,contentRoot);
}
contentRoot.className='fb_dialog_content';
dialog.appendChild(contentRoot);

if(require("sdk.UA").mobile()){
var padding=document.createElement('div');
padding.className='fb_dialog_padding';
dialog.appendChild(padding);
}

return{
dialogElement:dialog,
contentRoot:contentRoot};

},

onDialogHideCleanup:function onDialogHideCleanup(isTablet){
var body=document.body;
if(isTablet){
require("sdk.DOM").removeCss(body,'fb_reposition');
}else{
require("sdk.DOM").removeCss(body,'fb_hidden');
}
}};


module.exports=DialogUtils;},null);
                                                                              __d("sdk.fbt",[],(function $module_sdk_fbt(global,require,requireDynamic,requireLazy,module,exports){




var fbt={
_:function _(table){
if(__DEV__){
if(arguments.length>1){
throw new Error('You are not using a simple string');
}
}
return typeof table==='string'?table:table[0];
}};

module.exports=fbt;}),null);
                                                                                                                   __d("sdk.Dialog",["DOMEventListener","ObservableMixin","Type","sdk.Canvas.Environment","sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.fbt","sdk.Runtime","sdk.UA"],function $module_sdk_Dialog(global,require,requireDynamic,requireLazy,module,exports){













var MARGIN_SURROUNDING=30;

var MAX_HEIGHT_MOBILE=590;
var MAX_WIDTH_MOBILE=500;
var MAX_HEIGHT_DESKTOP=240;
var MAX_WIDTH_DESKTOP=575;

function getMobileSize(){
var info=require("sdk.DOM").getViewportInfo();
if(info.height&&info.width){
return{
width:Math.min(info.width,MAX_WIDTH_MOBILE),
height:Math.min(info.height,MAX_HEIGHT_MOBILE)};

}
return null;
}















var SdkDialog=require("Type").extend(
{
constructor:function SdkDialog(id,display){
this.parent();
this.id=id;
this.display=display;

this._e2e={};

if(!Dialog._dialogs){
Dialog._dialogs={};
Dialog._addOrientationHandler();
}
Dialog._dialogs[id]=this;
this.trackEvent('init');
},

trackEvent:function trackEvent(name,time){
if(this._e2e[name]){
return this;
}
this._e2e[name]=time||ES("Date","now",false);
if(name=='close'){

this.inform('e2e:end',this._e2e);
}
return this;
},

trackEvents:function trackEvents(events){
if(typeof events==='string'){
events=ES("JSON","parse",false,events);
}
for(var key in events){
if(Object.prototype.hasOwnProperty.call(events,key)){
this.trackEvent(key,events[key]);
}
}
return this;
}},require("ObservableMixin"));




var Dialog={
newInstance:function newInstance(id,display){
return new SdkDialog(id,display);
},

_dialogs:null,
_lastYOffset:0,
_overlayListeners:[],






_loaderEl:null,






_overlayEl:null,






_stack:[],






_active:null,






get:function get(id){
return Dialog._dialogs[id];
},









_findRoot:function _findRoot(node){
while(node){
if(require("sdk.DOM").containsCss(node,'fb_dialog')){
return node;
}
node=node.parentNode;
}
},

_createWWWLoader:function _createWWWLoader(width){
width=width?width:460;
return Dialog.create({
content:
'<div class="dialog_title">'+
'  <a id="fb_dialog_loader_close">'+
'    <div class="fb_dialog_close_icon"></div>'+
'  </a>'+
'  <span>Facebook</span>'+
'  <div style="clear:both;"></div>'+
'</div>'+
'<div class="dialog_content"></div>'+
'<div class="dialog_footer"></div>',
width:width});

},

_createMobileLoader:function _createMobileLoader(){





var content;
if(require("sdk.UA").nativeApp()){
content='<div class="dialog_header"></div>';
}else if(Dialog.isTabletStyle()){
content=
'<div class="overlayLoader">'+
'<div id="fb_dialog_loader_spinner"></div>'+
'<a id="fb_dialog_loader_close" href="#">'+require("sdk.fbt")._("Cancel")+

'</a>'+
'</div>';
}else{
content=
'<div class="dialog_header">'+
'<table>'+
'  <tbody>'+
'    <tr>'+
'      <td class="header_left">'+
'        <label class="touchable_button">'+
'          <input type="submit" value="'+require("sdk.fbt")._("Cancel")+

'"'+
'            id="fb_dialog_loader_close"/>'+
'        </label>'+
'      </td>'+
'      <td class="header_center">'+
'        <div>'+
'         '+require("sdk.fbt")._("Loading...")+

'        </div>'+
'      </td>'+
'      <td class="header_right">'+
'      </td>'+
'    </tr>'+
'  </tbody>'+
'</table>'+
'</div>';
}
return Dialog.create({
classes:'loading'+(Dialog.isTabletStyle()?' centered':''),
content:content});

},

_setDialogOverlayStyle:function _setDialogOverlayStyle(){
require("sdk.DialogUtils").applyScreenDimensions(Dialog._overlayEl);
},

_showTabletOverlay:function _showTabletOverlay(_onClickForClose){
if(!Dialog.isTabletStyle()){
return;
}
if(!Dialog._overlayEl){
Dialog._overlayEl=require("sdk.DialogUtils").setupNewDarkOverlay();
require("sdk.Content").append(Dialog._overlayEl,null);
}

Dialog._overlayEl.className='';
},

_hideTabletOverlay:function _hideTabletOverlay(){
if(Dialog.isTabletStyle()){
Dialog._overlayEl.className='hidden';
ES(Dialog._overlayListeners,"forEach",true,function Dialog__overlayListeners_forEach_$0(listener){return listener.remove();});
Dialog._overlayListeners=[];
}
},








showLoader:function showLoader(cb,width){




if(!cb){
cb=function cb(){};
}

var onClick=function onClick(){
Dialog._hideLoader();
require("sdk.DialogUtils").onDialogHideCleanup(Dialog.isTabletStyle());
Dialog._hideTabletOverlay();
cb();
};

Dialog._showTabletOverlay(onClick);

if(!Dialog._loaderEl){
Dialog._loaderEl=Dialog._findRoot(
require("sdk.UA").mobile()?
Dialog._createMobileLoader():
Dialog._createWWWLoader(width));

}

var loaderClose=document.getElementById('fb_dialog_loader_close');

if(loaderClose){
require("sdk.DOM").removeCss(loaderClose,'fb_hidden');
var listener=require("DOMEventListener").add(loaderClose,'click',onClick);
Dialog._overlayListeners.push(listener);
}

Dialog._makeActive(Dialog._loaderEl);
},





_hideLoader:function _hideLoader(){
if(Dialog._loaderEl&&Dialog._loaderEl==Dialog._active){
Dialog._loaderEl.style.top='-10000px';
}
},







_makeActive:function _makeActive(el){
Dialog._setDialogSizes();
Dialog._lowerActive();
Dialog._active=el;
if(require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)){
require("sdk.Canvas.Environment").getPageInfo(function CanvasEnvironment_getPageInfo_$0(pageInfo){
Dialog._centerActive(pageInfo);
});
}
Dialog._centerActive();
},




_lowerActive:function _lowerActive(){
if(!Dialog._active){
return;
}
Dialog._active.style.top='-10000px';
Dialog._active=null;
},






_removeStacked:function _removeStacked(dialog){
Dialog._stack=ES(Dialog._stack,"filter",true,function Dialog__stack_filter_$0(node){
return node!=dialog;
});
},





_centerActive:function _centerActive(pageInfo){
var dialog=Dialog._active;
if(!dialog){
return;
}

require("sdk.DialogUtils").setDialogPositionToCenter(
dialog,
Dialog.isTabletStyle(),
pageInfo);

},

_setDialogSizes:function _setDialogSizes(skipHeight){if(skipHeight===void 0){skipHeight=false;}
if(!require("sdk.UA").mobile()){
return;
}
for(var id in Dialog._dialogs){
if(Object.prototype.hasOwnProperty.call(Dialog._dialogs,id)){
var iframe=document.getElementById(id);
if(iframe){
iframe.style.width=Dialog.getDefaultSize().width+'px';
if(!skipHeight){
iframe.style.height=Dialog.getDefaultSize().height+'px';
}
}
}
}
},

getDefaultSize:function getDefaultSize(){
if(require("sdk.UA").mobile()){
var size=getMobileSize();
if(size){
if(require("sdk.DOM").getViewportInfo().width<=size.width){
size.width=require("sdk.DOM").getViewportInfo().width-MARGIN_SURROUNDING;
}
if(require("sdk.DOM").getViewportInfo().height<=size.height){
size.height=require("sdk.DOM").getViewportInfo().height-MARGIN_SURROUNDING;
}
return size;
}



if(require("sdk.UA").ipad()){
return{
width:MAX_WIDTH_MOBILE,
height:MAX_HEIGHT_MOBILE};

}

if(require("sdk.UA").android()){


return{
width:screen.availWidth,
height:screen.availHeight};

}else{
var width=window.innerWidth;
var height=window.innerHeight;
var isLandscape=width/height>1.2;











return{
width:width,
height:Math.max(height,isLandscape?screen.width:screen.height)};

}
}
return{width:MAX_WIDTH_DESKTOP,height:MAX_HEIGHT_DESKTOP};
},




_handleOrientationChange:function _handleOrientationChange(){
Dialog._availScreenWidth=require("sdk.DOM").getViewportInfo().width;

if(Dialog.isTabletStyle()){

Dialog._setDialogSizes(true);
Dialog._centerActive();
Dialog._setDialogOverlayStyle();
}else{
var width=Dialog.getDefaultSize().width;
for(var id in Dialog._dialogs){
if(Object.prototype.hasOwnProperty.call(Dialog._dialogs,id)){

var iframe=document.getElementById(id);
if(iframe){
iframe.style.width=width+'px';
}
}
}
}
},




_addOrientationHandler:function _addOrientationHandler(){
if(!require("sdk.UA").mobile()){
return null;
}
Dialog._availScreenWidth=require("sdk.DOM").getViewportInfo().width;
require("sdk.DialogUtils").addMobileOrientationChangeAction(
Dialog._handleOrientationChange);

},



















create:function create(opts){
var created=require("sdk.DialogUtils").setupNewDialog(opts);
require("sdk.Content").append(created.dialogElement);
if(opts.visible){
Dialog.show(created.dialogElement);
}
if(typeof opts.styles==='object'){
ES("Object","assign",false,created.dialogElement.style,opts.styles);
}
return created.contentRoot;
},









show:function show(dialog){
var root=Dialog._findRoot(dialog);
if(root){
Dialog._removeStacked(root);
Dialog._hideLoader();
Dialog._makeActive(root);
Dialog._stack.push(root);
if('fbCallID'in dialog){
Dialog.get(dialog.fbCallID).
inform('iframe_show').
trackEvent('show');
}
}
},







hide:function hide(dialog){
var root=Dialog._findRoot(dialog);
Dialog._hideLoader();
if(root==Dialog._active){
Dialog._lowerActive();
require("sdk.DialogUtils").onDialogHideCleanup(Dialog.isTabletStyle());
Dialog._hideTabletOverlay();
if('fbCallID'in dialog){
Dialog.get(dialog.fbCallID).
inform('iframe_hide').
trackEvent('hide');
}
}
},






remove:function remove(dialog){
dialog=Dialog._findRoot(dialog);
if(dialog){
var is_active=Dialog._active==dialog;
Dialog._removeStacked(dialog);
if(is_active){
Dialog._hideLoader();
if(Dialog._stack.length>0){
Dialog.show(Dialog._stack.pop());
}else{
Dialog._lowerActive();
require("sdk.DialogUtils").onDialogHideCleanup(Dialog.isTabletStyle());
Dialog._hideTabletOverlay();
}
}else if(Dialog._active===null&&Dialog._stack.length>0){
Dialog.show(Dialog._stack.pop());
}







window.setTimeout(function window_setTimeout_$0(){
dialog.parentNode.removeChild(dialog);
},3000);
}
},






isActive:function isActive(node){
var root=Dialog._findRoot(node);
return root&&root===Dialog._active;
},

isTabletStyle:function isTabletStyle(){
if(!require("sdk.UA").mobile()){
return false;
}
var size=getMobileSize();
return(
size&&(
size.height>=MAX_HEIGHT_MOBILE||size.width>=MAX_WIDTH_MOBILE));

}};


module.exports=Dialog;},null);
                                                                                                              __d("sdk.NativeExtensions",["DOMEventListener","Log","sdk.UA"],function $module_sdk_NativeExtensions(global,require,requireDynamic,requireLazy,module,exports){






var NATIVE_EXTENSIONS_READY_EVENT='fbNativeExtensionsReady';





function getAPIBridge(){
if(
window._FBSdkExtensions&&
window._FBSdkExtensions.jsonRPC&&
window._FBSdkExtensions.initializeCallbackHandler&&
window._FBSdkExtensions.supportsDialog)
{
return window._FBSdkExtensions;
}
return null;
}








var NativeExtensions={






onReady:function onReady(func){

if(!require("sdk.UA").facebookInAppBrowser()){
require("Log").error(
'FB.NativeExtensions.onReady only works when the page is rendered '+
'in a WebView of the native Facebook app.');

return;
}


var extensionAPIBridge=getAPIBridge();
if(extensionAPIBridge){
func(extensionAPIBridge);
return;
}

var bridgeCalled=false;
var nativeExtensionsReadyCallback=function nativeExtensionsReadyCallback(){
var bridge=getAPIBridge();
if(bridgeCalled||!bridge){
return;
}
bridgeCalled=true;
func(bridge);
require("DOMEventListener").remove(
window,
NATIVE_EXTENSIONS_READY_EVENT,
nativeExtensionsReadyCallback);

};

require("DOMEventListener").add(
window,
NATIVE_EXTENSIONS_READY_EVENT,
nativeExtensionsReadyCallback);

}};


module.exports=NativeExtensions;},null);
                                                                                                 __d("sdk.Extensions",["JSONRPC","Queue","sdk.NativeExtensions","sdk.UA"],function $module_sdk_Extensions(global,require,requireDynamic,requireLazy,module,exports){

'use strict';









var outQueue=new(require("Queue"))();
var jsonrpc=new(require("JSONRPC"))(function(message){
outQueue.enqueue(message);
});

var rpcQueue=new(require("Queue"))();
rpcQueue.start(function rpcQueue_start_$0(message){
jsonrpc.read(message);
});

var extensionAPIBridge=null;

if(require("sdk.UA").facebookInAppBrowser()){
require("sdk.NativeExtensions").onReady(function NativeExtensions_onReady_$0(bridge){
extensionAPIBridge=bridge;


window._FBBrowserCallbackHandler=function(message){
rpcQueue.enqueue(ES("JSON","stringify",false,message));
};

bridge.initializeCallbackHandler(ES("JSON","stringify",false,
{name:'_FBBrowserCallbackHandler'}));


outQueue.start(function outQueue_start_$0(message){
bridge.jsonRPC(message);
});
});
}

module.exports={
local:jsonrpc.local,
remote:jsonrpc.remote,
stub:ES(jsonrpc.stub,"bind",true,jsonrpc),
supportsDialog:function supportsDialog(method){
return!!extensionAPIBridge&&extensionAPIBridge.supportsDialog(method);
}};},null);
                                                                                             __d("sdk.Frictionless",["sdk.api","sdk.Auth","sdk.Dialog","sdk.Event"],function $module_sdk_Frictionless(global,require,requireDynamic,requireLazy,module,exports){






var Frictionless={


_allowedRecipients:{},

_useFrictionless:false,




_updateRecipients:function _updateRecipients(){
Frictionless._allowedRecipients={};
require("sdk.api")('/me/apprequestformerrecipients',function api_$1(response){
if(!response||response.error){
return;
}
ES(response.data,"forEach",true,function response_data_forEach_$0(recipient){
Frictionless._allowedRecipients[recipient.recipient_id]=true;
});
});
},




init:function init(){
Frictionless._useFrictionless=true;
require("sdk.Auth").getLoginStatus(function Auth_getLoginStatus_$0(response){
if(response.status=='connected'){
Frictionless._updateRecipients();
}
});
require("sdk.Event").subscribe('auth.login',function Event_subscribe_$1(login){
if(login.authResponse){
Frictionless._updateRecipients();
}
});
},








_processRequestResponse:function _processRequestResponse(
cb,
hidden)
{
return function(params){
var updated=params&&params.updated_frictionless;
if(Frictionless._useFrictionless&&updated){


Frictionless._updateRecipients();
}

if(params){
if(!hidden&&params.frictionless){
require("sdk.Dialog")._hideLoader();
require("sdk.Dialog")._restoreBodyPosition();
require("sdk.Dialog")._hideIPadOverlay();
}
delete params.frictionless;
delete params.updated_frictionless;
}

cb&&cb(params);
};
},








isAllowed:function isAllowed(user_ids){
if(!user_ids){
return false;
}

if(typeof user_ids==='number'){
return user_ids in Frictionless._allowedRecipients;
}
if(typeof user_ids==='string'){
user_ids=user_ids.split(',');
}
user_ids=ES(user_ids,"map",true,function user_ids_map_$0(s){
return ES(String(s),"trim",true);
});

var allowed=true;
var has_user_ids=false;
ES(user_ids,"forEach",true,function user_ids_forEach_$0(user_id){
allowed=allowed&&user_id in Frictionless._allowedRecipients;
has_user_ids=true;
});
return allowed&&has_user_ids;
}};


require("sdk.Event").subscribe('init:post',function Event_subscribe_$1(options){
if(options.frictionlessRequests){
Frictionless.init();
}
});

module.exports=Frictionless;},null);
                                                                                             __d("sdk.Native",["Log","sdk.UA"],function $module_sdk_Native(global,require,requireDynamic,requireLazy,module,exports){





var NATIVE_READY_EVENT='fbNativeReady';

var Native={






onready:function onready(func){

if(!require("sdk.UA").nativeApp()){
require("Log").error(
'FB.Native.onready only works when the page is rendered '+
'in a WebView of the native Facebook app. Test if this is the '+
'case calling FB.UA.nativeApp()');

return;
}





if(window.__fbNative&&!this.nativeReady){
ES("Object","assign",false,this,window.__fbNative);
}


if(this.nativeReady){
func();
}else{


var nativeReadyCallback=function nativeReadyCallback(evt){
window.removeEventListener(NATIVE_READY_EVENT,nativeReadyCallback);
this.onready(func);
};
window.addEventListener(NATIVE_READY_EVENT,nativeReadyCallback,false);
}
}};


module.exports=Native;},null);
                                                                                                                                                                                                                                __d("resolveWindow",[],function $module_resolveWindow(global,require,requireDynamic,requireLazy,module,exports){

































function resolveWindow(path){
if(path==null){
return null;
}

var node=window;
var parts=path.split('.');

try{
for(var i=0;i<parts.length;i++){
var part=parts[i];

var matches=/^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(part);

if(matches){
node=node.frames[matches[1]];
}else if(part==='opener'||part==='parent'||part==='top'){
node=node[part];
}else{
return null;
}
}
}catch(_unused){
return null;
}

return node;
}

module.exports=resolveWindow;},null);
                                                                                                              __d("sdk.XD",["JSSDKXDConfig","Log","QueryString","Queue","UrlMap","guid","isFacebookURI","resolveWindow","sdk.Event","sdk.feature","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.URI"],function $module_sdk_XD(global,require,requireDynamic,requireLazy,module,exports){



















var facebookQueue=new(require("Queue"))();

var messageToFacebookRelation='parent';
var xdProxyName=null;

var facebookRe=/^https:\/\/.*facebook\.com$/;


var xdArbiterTier=require("JSSDKXDConfig").useCdn?'cdn':'www';

var xdArbiterPathAndQuery=require("JSSDKXDConfig").XdUrl;

var xdArbiterHttpsUrl=require("UrlMap").resolve(xdArbiterTier)+xdArbiterPathAndQuery;

var getOrigin=function getOrigin(){
if('origin'in location){
if(location.origin&&location.origin!='null'){
return location.origin;
}else if(window!==window.parent){
try{
var parentOrigin=parent.location.origin;
if(parentOrigin&&parentOrigin!='null'){
return parentOrigin;
}
}catch(_unused){}
}
}

return location.protocol+'//'+location.host;
};

var channel=require("guid")();
var origin=getOrigin();
var inited=false;

var rpcQueue=new(require("Queue"))();
require("sdk.RPC").setInQueue(rpcQueue);

function onRegister(registeredAs){
require("Log").info('Remote XD can talk to facebook.com (%s)',registeredAs);
require("sdk.Runtime").setEnvironment(
registeredAs==='canvas'?
require("sdk.Runtime").ENVIRONMENTS.CANVAS:
require("sdk.Runtime").ENVIRONMENTS.PAGETAB);

}

function handleAction(message,senderOrigin){
if(!senderOrigin){
require("Log").error('No senderOrigin');
throw new Error();
}

switch(message.xd_action){
case'plugin_ready':
if(typeof message.name==='string'){
var pluginName=message.name;
require("Log").info('Plugin %s ready from %s',pluginName,senderOrigin);
if(facebookRe.test(senderOrigin)){
var queue=require("Queue").get(pluginName,{});
queue.start(function queue_start_$0(message){
if(message==null){
require("Log").warn(
'Discarding null message from %s to %s on %s',
senderOrigin,
pluginName,
origin);

return;
}
if(window.frames[pluginName]!=null){
window.frames[pluginName].postMessage(
{
xdArbiterHandleMessage:true,
message:message,
origin:origin},

senderOrigin);

}else{
require("Log").info(
'Message discarded for plugin at window.frames[%s] which may have been removed by a new XFBML.parse() call.',
pluginName);

}
});
}else{
require("Log").error(
'Plugin attempted to register from non-Facebook domain %s',
senderOrigin);

return;
}
}else{
require("Log").error('plugin_ready message received without a name');
}
break;}



if(
message.data!=null&&(
typeof message.data==='object'||typeof message.data==='string'))
{

onMessage(message.data,senderOrigin);
}
}




function onMessage(
message,
senderOrigin)
{
if(
senderOrigin!=null&&
senderOrigin!=='native'&&
!require("isFacebookURI")(new(require("sdk.URI"))(senderOrigin)))
{
return;
}
if(typeof message==='string'){
if(/^FB_RPC:/.test(message)){
rpcQueue.enqueue(message.substring(7));
return;
}

if(message.substring(0,1)=='{'){
try{
message=ES("JSON","parse",false,message);
}catch(_unused2){
require("Log").warn('Failed to decode %s as JSON',message);
return;
}
}else{
message=require("QueryString").decode(message);
}
}

var messageObj=message;
if(messageObj.xd_action){
handleAction(messageObj,senderOrigin);
return;
}


if(typeof messageObj.cb==='string'){
var cb=XD._callbacks[messageObj.cb];
if(!XD._forever[messageObj.cb]){
delete XD._callbacks[messageObj.cb];
}
if(cb){
cb(messageObj);
}
}
}

function sendToFacebook(
recipient,
message)
{
if(recipient=='facebook'){
message.relation=messageToFacebookRelation;
facebookQueue.enqueue(message);
var useLegacyInit=require("sdk.feature")('legacy_xd_init',true);
if(
!useLegacyInit&&
!require("sdk.Runtime").isCanvasEnvironment()&&
!facebookQueue.isStarted())
{



tryRegister(xdProxyName);
}
}else{
require("Queue").get(recipient,{}).enqueue(message);
}
}

require("sdk.RPC").getOutQueue().start(function start_$0(message){
facebookQueue.enqueue('FB_RPC:'+message);
});

function init(xdProxyName){
if(inited){
return;
}
inited=true;


window.addEventListener('message',function window_addEventListener_$1(event){
var message=event.data;


var senderOrigin=event.origin||'native';
if(!/^(https?:\/\/|native$)/.test(senderOrigin)){
require("Log").debug('Received message from invalid origin type: %s',senderOrigin);
return;
}
if(!facebookRe.test(senderOrigin)){
return;
}


if(typeof message==='string'){
onMessage(message,senderOrigin);
}else{

if(
event.source==parent&&
event.data.xdArbiterRegisterAck&&
facebookRe.test(senderOrigin))
{
if(
typeof event.data.xdArbiterRegisterAck==='string'&&
event.data.xdArbiterRegisterAck!=='')
{
onRegister(event.data.xdArbiterRegisterAck);
}
if(!facebookQueue.isStarted()){
facebookQueue.start(function facebookQueue_start_$0(message){var _windowRef;
if(message==null){
require("Log").warn(
'Discarding null message from %s to %s',
origin,
senderOrigin);

return;
}

var windowRef=parent;
if(
typeof message==='object'&&
typeof message.relation==='string')
{
windowRef=require("resolveWindow")(message.relation);
}

((_windowRef=windowRef)!=null?_windowRef:parent).postMessage(
{
xdArbiterHandleMessage:true,
message:message,
origin:origin},

senderOrigin);

});
}

return;
}
require("Log").warn(
'Received message of type %s from %s, expected a string. %s',
typeof message,
origin,ES("JSON","stringify",false,
message));

return;
}
});

if(require("sdk.Runtime").isCanvasEnvironment()){
tryRegister(xdProxyName);
}
}







function tryRegister(xdProxyName){var _feature;
if(!inited){
init();
}

if(window.parent!=top){
require("Log").warn(
'cannot deliver messages to facebook unless window.parent is top and facebook.com.');

return;
}

var timeout=(_feature=require("sdk.feature")('xd_timeout',60000))!=null?_feature:60000;
var retryInterval=200;
var intervalId=0;
var retries=timeout/retryInterval;

var registerFunc=function registerFunc(){return(
parent.postMessage({xdArbiterRegister:true,xdProxyName:xdProxyName,origin:origin},'*'));};

intervalId=window.setInterval(function window_setInterval_$0(){
if(!facebookQueue.isStarted()&&retries>0){
retries--;
require("Log").debug('resending xdArbiterRegister');
registerFunc();
}else{
window.clearInterval(intervalId);
if(retries===0){
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'XD_FB_QUEUE_INITIALIZATION',
extra:{
message:'Failed to initialize in '+timeout+'ms'}});


require("Log").error('xdAbiterRegisterAck not received');
return;
}
}
},retryInterval);
}







var XD={


rpc:require("sdk.RPC"),

_callbacks:{},
_forever:{},
_channel:channel,
_origin:origin,

onMessage:onMessage,







init:init,









sendToFacebook:sendToFacebook,





inform:function inform(
method,
params,
relation,
behavior)
{
sendToFacebook('facebook',{
method:method,
params:ES("JSON","stringify",false,params||{}),
behavior:behavior||'p',
relation:relation});

},















handler:function handler(
cb,
relation,
forever,
id)
{
var xdArbiterFragment=
'#'+
require("QueryString").encode({
cb:XD.registerCallback(cb,forever,id),
origin:origin+'/'+channel,
domain:location.hostname,
relation:relation||'opener'});

return xdArbiterHttpsUrl+xdArbiterFragment;
},

registerCallback:function registerCallback(
cb,
persistent,
id)
{
id=id||require("guid")();
if(persistent){
XD._forever[id]=true;
}
XD._callbacks[id]=cb;
return id;
}};


require("sdk.Event").subscribe('init:post',function Event_subscribe_$1(options){
xdProxyName=options.xdProxyName;
init(options.xdProxyName);
});

module.exports=XD;},3);
                                                                                                 __d("sdk.openMessenger",["sdk.UA"],(function $module_sdk_openMessenger(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var FALLBACK_IOS_URL=
'https://itunes.apple.com/us/app/messenger/id454638411';
var FALLBACK_ANDROID_URL=
'https://play.google.com/store/apps/details?id=com.facebook.orca';
var FALLBACK_TIMEOUT=3000;

function openMessenger(params){
var uri;
var fallbackURL;

var link=params.link;
var app_id=params.app_id;
if(require("sdk.UA").android()){
uri=
'intent://share/#Intent;'+
'package=com.facebook.orca;'+
'scheme=fb-messenger;'+
'S.android.intent.extra.TEXT='+
encodeURIComponent(link)+
';'+
'S.trigger=send_plugin;';
if(app_id){
uri+='S.platform_app_id='+encodeURIComponent(app_id)+';';
}
uri+='end';
fallbackURL=FALLBACK_ANDROID_URL;
}else{
uri='fb-messenger://share?link='+encodeURIComponent(link);
if(app_id){
uri+='&app_id='+encodeURIComponent(app_id);
}
fallbackURL=FALLBACK_IOS_URL;
}

setTimeout(function setTimeout_$0(){
window.location.href=fallbackURL;
},FALLBACK_TIMEOUT);
window.location.href=uri;
}

module.exports=openMessenger;}),null);
                                                                                                                                                                                                                                                 __d("sdk.UIServer",["Log","PlatformOAuthDialogLoginFunnelLogger","QueryString","UrlMap","createObjectFrom","flattenObject","guid","insertIframe","resolveURI","sdk.api","sdk.Auth","sdk.Content","sdk.Dialog","sdk.DOM","sdk.Event","sdk.Extensions","sdk.fbt","sdk.feature","sdk.Frictionless","sdk.getContextType","sdk.Impressions","sdk.Native","sdk.openMessenger","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.UA","sdk.XD"],function $module_sdk_UIServer(global,require,requireDynamic,requireLazy,module,exports){
































var MobileIframeable={
transform:function transform(call){



if(
call.params.display==='touch'&&
UIServer.canIframe(call.params)&&
window.postMessage)
{


call.params.channel=UIServer._xdChannelHandler(call.id,'parent');

if(!require("sdk.UA").nativeApp()){
call.params.in_iframe=1;
}
return call;
}else{
return UIServer.genericTransform(call);
}
},
getXdRelation:function getXdRelation(params){
var display=params.display;
if(display==='touch'&&window.postMessage&&params.in_iframe){



return'parent';
}
return UIServer.getXdRelation(params);
}};


function isOauth(params){
return(
params.method=='permissions.oauth'||
params.method=='permissions.request'||
params.method=='oauth');

}

function isSupportedOauth(params){
return isOauth(params)&&require("sdk.Extensions").supportsDialog('oauth');
}

function isSupportedAccountLink(params){
return(
isOauth(params)&&(
params.is_account_link===true||params.is_account_link==='true')&&
require("sdk.Extensions").supportsDialog('accountLink'));

}

var Methods={
'stream.share':{
size:{width:670,height:340},
url:'sharer.php',
transform:function transform(call){
if(!call.params.u){
call.params.u=window.location.toString();
}
call.params.display='popup';
return call;
}},


gaming_friendfinder:{
url:'gaming/me/friendfinder/',
transform:function transform(call){
if(!require("sdk.Runtime").getClientID()){
require("Log").error('FriendFinder called before FB.init().');
return;
}
call.url+=require("sdk.Runtime").getClientID();
call.size={
width:400,
height:800};

return call;
}},


gaming_media_library:{
url:'gaming/me/media_asset/',
transform:function transform(call){
call.url+=call.params.media_id;
call.size={
width:400,
height:800};

return call;
}},



apprequests:{
transform:function transform(call){
call=MobileIframeable.transform(call);

call.params.frictionless=require("sdk.Frictionless")&&require("sdk.Frictionless")._useFrictionless;
if(call.params.frictionless){
if(require("sdk.Frictionless").isAllowed(call.params.to)){




call.params.display='iframe';
call.params.in_iframe=true;

call.hideLoader=true;
}


call.cb=require("sdk.Frictionless")._processRequestResponse(
call.cb,
call.hideLoader);

}


call.closeIcon=false;
return call;
},
getXdRelation:MobileIframeable.getXdRelation},


'permissions.oauth':{
url:'dialog/oauth',
size:{
width:require("sdk.UA").mobile()?null:600,
height:require("sdk.UA").mobile()?null:679},

transform:function transform(call){
if(!require("sdk.Runtime").getClientID()){
require("Log").error('FB.login() called before FB.init().');
return;
}




if(
require("sdk.Auth").getAuthResponse()&&
!call.params.scope&&
!call.params.asset_scope&&
!call.params.auth_type)
{


if(!call.params.plugin_prepare){
require("Log").error('FB.login() called when user is already connected.');
call.cb&&
call.cb({
status:require("sdk.Runtime").getLoginStatus(),
authResponse:require("sdk.Auth").getAuthResponse()});

}
return;
}

var cb=call.cb;
var id=call.id;
delete call.cb;

if(call&&call.params&&!call.params.logger_id){
call.params.logger_id=require("guid")();
}

if(call&&call.params&&!call.params.cbt){
call.params.cbt=ES("Date","now",false);
}

var auth_type=call.params.auth_type;
var isReauthenticate=
auth_type&&ES(auth_type,"includes",true,'reauthenticate');
var responseTypes=ES("Object","keys",false,ES("Object","assign",false,

call.params.response_type?
require("createObjectFrom")(call.params.response_type.split(',')):
{},
{token:true,signed_request:true,graph_domain:true})).

join(',');

if(call.params.display==='async'){
ES("Object","assign",false,call.params,{
client_id:require("sdk.Runtime").getClientID(),
origin:require("sdk.getContextType")(),
response_type:responseTypes,
domain:location.hostname});


call.cb=require("sdk.Auth").xdResponseWrapper(
cb,
require("sdk.Auth").getAuthResponse(),
'permissions.oauth',
call.params);

}else{
if(isReauthenticate){
UIServer._xdNextHandler(
function UIServer__xdNextHandler_$0(params){
cb({
authResponse:null,
status:'not_authorized'});

},
id,
call.params.plugin_prepare?'opener.parent':'opener',
true);

}
ES("Object","assign",false,call.params,{
client_id:require("sdk.Runtime").getClientID(),
redirect_uri:require("resolveURI")(
UIServer.xdHandler(
cb,
id,
call.params.plugin_prepare?'opener.parent':'opener',
require("sdk.Auth").getAuthResponse(),
'permissions.oauth',
!isReauthenticate,
call.params)),


origin:require("sdk.getContextType")(),
response_type:responseTypes,
domain:location.hostname});

}

var payload={
logger_id:call.params.logger_id,
action:"client_login_start",
client_funnel_version:
require("PlatformOAuthDialogLoginFunnelLogger").CLIENT_FUNNEL_VERSION,
cbt_delta:0};




if(!call.params.plugin_prepare){
require("sdk.Impressions").log(117,{
payload:payload});

}

return call;
}},


'auth.logout':{
transform:function transform(call){
if(!require("sdk.Runtime").getClientID()){
require("Log").error('FB.logout() called before calling FB.init().');
}else if(!require("sdk.Auth").getAuthResponse()){
require("Log").error('FB.logout() called without an access token.');
}else{
require("sdk.Auth").logout(call.cb);
}
}},


'login.status':{

transform:function transform(call){
require("sdk.Auth").getLoginStatus(call.cb);
}},


pay:{
size:{width:555,height:120},
connectDisplay:'popup'},


live_broadcast:{
transform:function transform(call){
if(call.params.phase==='create'){
call.size={width:480,height:280};
}
if(call.params.phase==='publish'){
call.size={width:772,height:540};
}
return call;
},
require_access_token:true},

boost:{
transform:function transform(call){
call.size={width:960,height:760};
call.params.display='popup';
return call;
}}};







var _dialogStates={};

function _trackRunState(cb,id){
_dialogStates[id]=true;
return function(response){
delete _dialogStates[id];
cb(response);
};
}





function shouldEnforceSingleDialogInstance(params){

var name=params.method.toLowerCase();


if(name==='pay'&&params.display==='async'){
return true;
}

return false;
}

var UIServer={



Methods:Methods,

_loadedNodes:{},
_defaultCb:{},
_resultToken:'"xxRESULTTOKENxx"',










genericTransform:function genericTransform(call){
if(call.params.display=='dialog'||call.params.display=='iframe'){
ES("Object","assign",false,
call.params,
{
display:'iframe',
channel:UIServer._xdChannelHandler(call.id,'parent.parent')},

true);

}

return call;
},





checkOauthDisplay:function checkOauthDisplay(params){
var scope=params.scope||params.perms||require("sdk.Runtime").getScope();
if(!scope){
return params.display;
}
return'popup';
},









prepareCall:function prepareCall(params,cb){
var name=params.method.toLowerCase();
var method=Object.prototype.hasOwnProperty.call(UIServer.Methods,name)?ES("Object","assign",false,
{},UIServer.Methods[name]):
{};
var id=params.id||require("guid")();
var useSSL=true;


ES("Object","assign",false,params,{
app_id:require("sdk.Runtime").getClientID(),
locale:require("sdk.Runtime").getLocale(),
sdk:'joey',
access_token:useSSL&&require("sdk.Runtime").getAccessToken()||undefined});



params.display=UIServer.getDisplayMode(method,params);


if(!method.url){
method.url='dialog/'+name;
}

if(
(method.url=='dialog/oauth'||
method.url=='dialog/permissions.request')&&(
params.display=='iframe'||
params.display=='touch'&&params.in_iframe))
{
params.display=UIServer.checkOauthDisplay(params);
}



if(params.display=='popup'&&!method.require_access_token){
delete params.access_token;
}

if(require("sdk.Runtime").getIsVersioned()&&method.url.substring(0,7)==='dialog/'){
var version=params.version||require("sdk.Runtime").getVersion();
if(version!=null&&version!==''&&version!=='null'){
method.url=version+'/'+method.url;
}
}

if(shouldEnforceSingleDialogInstance(params)){

if(_dialogStates[name]){
var errorMessage=
'Dialog "'+name+'" is trying to run more than once.';
require("Log").warn(errorMessage);
cb({error_code:-100,error_message:errorMessage});
return;
}

cb=_trackRunState(cb,name);
}


var call={
cb:cb,
id:id,
size:method.size||UIServer.getDefaultSize(),
url:
require("UrlMap").resolve(params.display=='touch'?'m':'www')+
'/'+
method.url,
params:params,
name:name,
dialog:require("sdk.Dialog").newInstance(id,params.display)};



var transform=method.transform?
method.transform:
UIServer.genericTransform;
if(transform){
call=transform(call);


if(!call){
return;
}
}


if(params.display==='touch'&&params.in_iframe){







call.params.parent_height=window.innerHeight;
}



var getXdRelationFn=method.getXdRelation||UIServer.getXdRelation;
var relation=getXdRelationFn(call.params);
if(
!(call.id in UIServer._defaultCb)&&
!('next'in call.params)&&
!('redirect_uri'in call.params))
{
call.params.next=UIServer._xdResult(
call.cb,
call.id,
relation,
true);

}

if(relation==='parent'||relation==='opener'){
ES("Object","assign",false,
call.params,
{
channel_url:UIServer._xdChannelHandler(
id,
relation==='parent'?'parent.parent':'opener')},


true);

}


call=UIServer.prepareParams(call);

return call;
},

prepareParams:function prepareParams(call){




if(call.params.display!=='async'){
delete call.params.method;
}


call.params.kid_directed_site=
require("sdk.Runtime").getKidDirectedSite()||call.params.kid_directed_site;


call.params=require("flattenObject")(call.params);
var encodedQS=require("QueryString").encode(call.params);




if(
!require("sdk.UA").nativeApp()&&
UIServer.urlTooLongForIE(call.url+'?'+encodedQS))
{
call.post=true;
}else if(encodedQS){
call.url+='?'+encodedQS;
}

return call;
},

urlTooLongForIE:function urlTooLongForIE(fullURL){
return require("sdk.UA").ie()&&require("sdk.UA").ie()<=8&&fullURL.length>2048;
},








getDisplayMode:function getDisplayMode(method,params){
if(
params.display==='hidden'||
params.display==='none'||
params.display==='native')
{
return params.display;
}

var canvas=
require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)||
require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.PAGETAB);
if(canvas&&!params.display){
return'async';
}

if(isSupportedOauth(params)||isSupportedAccountLink(params)){
return'async';
}


if(require("sdk.UA").mobile()||params.display==='touch'){
return'touch';
}


if(params.display=='iframe'||params.display=='dialog'){
if(!UIServer.canIframe(params)){
require("Log").error('"dialog" mode can only be used when the user is connected.');
return'popup';
}
}

if(method.connectDisplay&&!canvas){
return method.connectDisplay;
}


return params.display||(UIServer.canIframe(params)?'dialog':'popup');
},

canIframe:function canIframe(params){
return require("sdk.Runtime").getAccessToken();
},







getXdRelation:function getXdRelation(params){
var display=params.display;
if(display==='popup'||display==='touch'){
return'opener';
}
if(
display==='dialog'||
display==='iframe'||
display==='hidden'||
display==='none')
{
return'parent';
}
if(display==='async'){
return'parent.frames['+window.name+']';
}
return'';
},







popup:function popup(call){

var _screenX=window.screenX;
var screenY=window.screenY;
var outerWidth=window.outerWidth;
var outerHeight=window.outerHeight;


var width=require("sdk.UA").mobile()?null:call.size.width;
var height=require("sdk.UA").mobile()?null:call.size.height;
var screenX=_screenX<0?window.screen.width+_screenX:_screenX;
var left=screenX+(outerWidth-width)/2;
var top=screenY+(outerHeight-height)/2.5;
var features=[];

if(width!==null){
features.push('width='+width);
}
if(height!==null){
features.push('height='+height);
}
features.push('left='+left);
features.push('top='+top);
features.push('scrollbars=1');
if(
call.name=='permissions.request'||
call.name=='permissions.oauth')
{
features.push('toolbar=0');


if(!require("sdk.UA").chrome()||require("sdk.UA").chrome()<59){
features.push('location=1');
}
}
var featuresString=features.join(',');


var popup;
if(call.post){
popup=window.open('about:blank',call.id,featuresString);
if(popup){
UIServer.setLoadedNode(call,popup,'popup');
require("sdk.Content").submitToTarget({
url:call.url,
target:call.id,
params:call.params});

}
}else{

popup=window.open(call.url,call.id,featuresString);
if(popup){
UIServer.setLoadedNode(call,popup,'popup');
}
}


if(!popup){
if(require("sdk.feature")('popup_blocker_scribe_logging',true)){
var error=isOauth({method:call.name})?
'POPUP_MAYBE_BLOCKED_OAUTH':
'POPUP_MAYBE_BLOCKED';
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:error,
extra:{
call:call.name}});


}
return;
}


if(call.id in UIServer._defaultCb){
UIServer._popupMonitor();
}
},

setLoadedNode:function setLoadedNode(call,node,type){
if(type==='iframe'){
node.fbCallID=call.id;
}
node={
node:node,
type:type,
fbCallID:call.id,
method:call.name,
params:call.params};

UIServer._loadedNodes[call.id]=node;
},

getLoadedNode:function getLoadedNode(call){
var id=typeof call==='object'?call.id:call;
var node=UIServer._loadedNodes[id];
return node?node.node:null;
},






hidden:function hidden(call){
call.className='FB_UI_Hidden';
call.root=require("sdk.Content").appendHidden('');
UIServer._insertIframe(call);
},






iframe:function iframe(call){
call.className='FB_UI_Dialog';

var onClose=function onClose(){
var errorResult=ES("JSON","stringify",false,{

error_code:4201,
error_message:require("sdk.fbt")._("User canceled the Dialog flow")});




UIServer._triggerDefault(call.id,errorResult);
};

var dialogOptions={
onClose:onClose,
closeIcon:call.closeIcon===undefined?true:call.closeIcon,
classes:require("sdk.Dialog").isTabletStyle()?'centered':''};


call.root=require("sdk.Dialog").create(dialogOptions);
if(!call.hideLoader){
require("sdk.Dialog").showLoader(onClose,call.size.width);
}
require("sdk.DOM").addCss(call.root,'fb_dialog_iframe');
UIServer._insertIframe(call);
},







touch:function touch(call){
if(call.params&&call.params.in_iframe){


if(call.ui_created){
require("sdk.Dialog").showLoader(function Dialog_showLoader_$0(){
UIServer._triggerDefault(call.id,null);
},0);
}else{
UIServer.iframe(call);
}
}else if(require("sdk.UA").nativeApp()&&!call.ui_created){


call.frame=call.id;
require("sdk.Native").onready(function Native_onready_$0(){






UIServer.setLoadedNode(
call,
require("sdk.Native").open(call.url+'#cb='+call.frameName),
'native');

});
UIServer._popupMonitor();
}else if(!call.ui_created){

UIServer.popup(call);
}
},








async:function async(call){
call.params.redirect_uri=
location.protocol+'//'+location.host+location.pathname;
delete call.params.access_token;

var handler=function handler(response){
var result=response.result;

if(result&&result.e2e){
var dialog=require("sdk.Dialog").get(call.id);
dialog.trackEvents(result.e2e);
dialog.trackEvent('close');
delete result.e2e;
}
call.cb(result);
};

if(isSupportedOauth(call.params)||isSupportedAccountLink(call.params)){
call.params.method='oauth';
call.params.redirect_uri=call.params.next;
require("sdk.Extensions").remote.showDialog(call.params,handler);
}else{
require("sdk.RPC").remote.showDialog(call.params,handler);
}
},"native":function native(

call){
require("sdk.openMessenger")(call.params);
},

getDefaultSize:function getDefaultSize(){
return require("sdk.Dialog").getDefaultSize();
},






_insertIframe:function _insertIframe(call){



UIServer._loadedNodes[call.id]=false;
var activate=function activate(node){
if(call.id in UIServer._loadedNodes){
UIServer.setLoadedNode(call,node,'iframe');
}
};


if(call.post){
require("insertIframe")({
url:'about:blank',
root:call.root,
className:call.className,
width:call.size.width,
height:call.size.height,
id:call.id,
onInsert:activate,
onload:function onload(node){
require("sdk.Content").submitToTarget({
url:call.url,
target:node.name,
params:call.params});

}});

}else{
require("insertIframe")({
url:call.url,
root:call.root,
className:call.className,
width:call.size.width,
height:call.size.height,
id:call.id,
name:call.frameName,
onInsert:activate});

}
},






_handleResizeMessage:function _handleResizeMessage(frame,data){
var node=UIServer.getLoadedNode(frame);
if(!node){
return;
}

if(data.height){
node.style.height=data.height+'px';
}
if(data.width&&data.width!=0){
node.style.width=data.width+'px';
}

require("sdk.XD").inform('resize.ack',data||{},'parent.frames['+node.name+']');

if(!require("sdk.Dialog").isActive(node)){
require("sdk.Dialog").show(node);
}else{
require("sdk.Dialog")._centerActive();
}
},







_triggerDefault:function _triggerDefault(id,result){
var data={frame:id};
if(result){
data.result=result;
}
UIServer._xdRecv(data,UIServer._defaultCb[id]||function(){});
},







_popupMonitor:function _popupMonitor(){

var found;
for(var id in UIServer._loadedNodes){

if(
Object.prototype.hasOwnProperty.call(UIServer._loadedNodes,id)&&
id in UIServer._defaultCb)
{var _ret=function(){
var node=UIServer._loadedNodes[id];
if(node.type!='popup'&&node.type!='native'){
return"continue";
}
var win=node.node;

try{

if(win.closed){
if(node.method==='permissions.oauth'){



require("sdk.Auth").getLoginStatus(
function Auth_getLoginStatus_$0(response){
if(
response.status==='connected'&&
node.params!=null&&
node.params.return_scopes)
{
require("sdk.api")('/me/permissions',function api_$1(scopesResponse){
if(!scopesResponse||scopesResponse.error){
UIServer._triggerDefault(id,response);
}
var grantedScopesString='';
for(var i=0;i<scopesResponse.data.length;i++){
if(scopesResponse.data[i].status==='granted'){
if(grantedScopesString!==''){
grantedScopesString+=',';
}
grantedScopesString+=
scopesResponse.data[i].permission;
}
}
response.authResponse.grantedScopes=grantedScopesString;
UIServer._triggerDefault(id,response);
});
}else{
UIServer._triggerDefault(id,response);
}
},
true);

}else{
UIServer._triggerDefault(id,null);
}
}else{
found=true;
}
}catch(_unused){

}}();if(_ret==="continue")continue;
}
}

if(found&&!UIServer._popupInterval){

UIServer._popupInterval=window.setInterval(UIServer._popupMonitor,100);
}else if(!found&&UIServer._popupInterval){

window.clearInterval(UIServer._popupInterval);
UIServer._popupInterval=null;
}
},









_xdChannelHandler:function _xdChannelHandler(frame,relation){
return require("sdk.XD").handler(
function XD_handler_$0(data){
var node=UIServer.getLoadedNode(frame);
if(!node){

return;
}

if(data.type=='resize'){
UIServer._handleResizeMessage(frame,data);
}else if(data.type=='hide'){
require("sdk.Dialog").hide(node);
}else if(data.type=='rendered'){
var root=require("sdk.Dialog")._findRoot(node);
require("sdk.Dialog").show(root);
}else if(data.type=='fireevent'){
require("sdk.Event").fire(data.event,data);
}
},
relation,
true,
null);

},












_xdNextHandler:function _xdNextHandler(
cb,
frame,
relation,
isDefault)
{
if(isDefault){
UIServer._defaultCb[frame]=cb;
}

return(
require("sdk.XD").handler(function XD_handler_$0(data){
UIServer._xdRecv(data,cb);
},relation)+
'&frame='+
frame);

},









_xdRecv:function _xdRecv(data,cb){
var frame=UIServer.getLoadedNode(data.frame);
if(frame){
if(frame.close){

try{
frame.close();



if(
/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&
RegExp.$1!=='5')
{
window.focus();
}
UIServer._popupCount--;
}catch(_unused2){

}
}else{

if(require("sdk.DOM").containsCss(frame,'FB_UI_Hidden')){


window.setTimeout(function window_setTimeout_$0(){

frame.parentNode.parentNode.removeChild(frame.parentNode);
},3000);
}else if(require("sdk.DOM").containsCss(frame,'FB_UI_Dialog')){
require("sdk.Dialog").remove(frame);
}
}
}

delete UIServer._loadedNodes[data.frame];
delete UIServer._defaultCb[data.frame];

if(data.e2e){
var dialog=require("sdk.Dialog").get(data.frame);
dialog.trackEvents(data.e2e);
dialog.trackEvent('close');
delete data.e2e;
}
cb(data);
},












_xdResult:function _xdResult(
cb,
frame,
target,
isDefault)
{
return(
UIServer._xdNextHandler(
function UIServer__xdNextHandler_$0(params){
cb&&
cb(
params.result&&
params.result!=UIServer._resultToken&&ES("JSON","parse",false,
params.result));

},
frame,
target,
isDefault)+


'&result='+
encodeURIComponent(UIServer._resultToken));

},

xdHandler:function xdHandler(
cb,
frame,
target,
authResponse,
method,
isDefault,
requestParams)
{
return UIServer._xdNextHandler(
require("sdk.Auth").xdResponseWrapper(cb,authResponse,method,requestParams),
frame,
target,
isDefault);

}};


require("sdk.Extensions").stub('showDialog');
require("sdk.RPC").stub('showDialog');
module.exports=UIServer;},null);
                                                                                             __d("sdk.ui",["Assert","Log","sdk.feature","sdk.Impressions","sdk.PlatformVersioning","sdk.Runtime","sdk.UIServer","sdk.URI"],function $module_sdk_ui(global,require,requireDynamic,requireLazy,module,exports){

































































function ui(params,cb){
require("Assert").isObject(params);
require("Assert").maybeFunction(cb);

if(require("sdk.Runtime").getIsVersioned()){
require("sdk.PlatformVersioning").assertVersionIsSet();
if(params.version){
require("sdk.PlatformVersioning").assertValidVersion(params.version);
}else{
params.version=require("sdk.Runtime").getVersion();
}
}

params=ES("Object","assign",false,{},params);
if(!params.method){
require("Log").error('"method" is a required parameter for FB.ui().');
return null;
}

if(params.method=='pay.prompt'){
params.method='pay';
}

var method=params.method;

if(params.redirect_uri){
require("Log").warn('When using FB.ui, you should not specify a redirect_uri.');
delete params.redirect_uri;
}

if(!params.fallback_redirect_uri){
params.fallback_redirect_uri=document.location.href;
}

if(
(method=='permissions.request'||method=='permissions.oauth')&&(
params.display=='iframe'||params.display=='dialog'))
{
params.display=require("sdk.UIServer").checkOauthDisplay(params);
}

if(params.display==='native'&&method!=='send'){
require("Log").error('display type "native" not supported');
return null;
}

var enableE2E=require("sdk.feature")('e2e_tracking',true);
if(enableE2E){

params.e2e={};
}
var call=require("sdk.UIServer").prepareCall(params,cb||function(){});
if(!call){

return null;
}


var displayName=call.params.display;
if(displayName==='dialog'){


displayName='iframe';
}else if(displayName==='none'){
displayName='hidden';
}

var displayFn=require("sdk.UIServer")[displayName];
if(!displayFn){
require("Log").error(
'"display" must be one of "popup", '+
'"dialog", "iframe", "touch", "async", "hidden", or "none"');

return null;
}

if(enableE2E){
call.dialog.subscribe('e2e:end',function call_dialog_subscribe_$1(events){
events.method=method;
events.display=displayName;
require("Log").debug('e2e: %s',ES("JSON","stringify",false,events));

require("sdk.Impressions").log(114,{
payload:events});

});
}
displayFn(call);
return call.dialog;
}

module.exports=ui;},null);
                                                                                                                                        __d("legacy:fb.auth",["FB","Log","sdk.Auth","sdk.Cookie","sdk.Event","sdk.Runtime","sdk.SignedRequest","sdk.ui","sdk.warnInsecure"],function $module_legacy_fb_auth(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){var sdkAuth;var sdkEvent;












require("FB").provide('',{
getLoginStatus:function getLoginStatus(){
require("sdk.warnInsecure")('getLoginStatus');
return require("sdk.Auth").getLoginStatus.apply(require("sdk.Auth"),arguments);
},

getAuthResponse:function getAuthResponse(){
require("sdk.warnInsecure")('getAuthResponse');
return require("sdk.Auth").getAuthResponse();
},

getAccessToken:function getAccessToken(){
require("sdk.warnInsecure")('getAccessToken');
return require("sdk.Runtime").getAccessToken()||null;
},

getUserID:function getUserID(){
require("sdk.warnInsecure")('getUserID');
return require("sdk.Runtime").getUserID()||require("sdk.Runtime").getCookieUserID();
},

login:function login(cb,opts){
require("sdk.warnInsecure")('login');
if(opts&&opts.perms&&!opts.scope){
opts.scope=opts.perms;
delete opts.perms;
require("Log").warn(
"OAuth2 specification states that 'perms' "+
"should now be called 'scope'.  Please update.");

}
var canvas=
require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)||
require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.PAGETAB);
require("sdk.ui")(babelHelpers["extends"]({

method:'permissions.oauth',
display:canvas?'async':'popup',
domain:location.hostname},
opts||{}),

cb);

},

logout:function logout(cb){
require("sdk.ui")({method:'auth.logout',display:'hidden'},cb);
}});


(sdkAuth=require("sdk.Auth")).subscribe('logout',ES((sdkEvent=require("sdk.Event")).fire,"bind",true,sdkEvent,'auth.logout'));
sdkAuth.subscribe('login',ES(sdkEvent.fire,"bind",true,sdkEvent,'auth.login'));
sdkAuth.subscribe(
'authresponse.change',ES(
sdkEvent.fire,"bind",true,sdkEvent,'auth.authResponseChange'));

sdkAuth.subscribe('status.change',ES(sdkEvent.fire,"bind",true,sdkEvent,'auth.statusChange'));

sdkEvent.subscribe('init:post',function Event_subscribe_$1(options){
if(options.status){
require("sdk.Auth").getLoginStatus();
}
if(require("sdk.Runtime").getClientID()){
if(require("sdk.Runtime").getUseCookie()){


var signedRequest=require("sdk.Cookie").loadSignedRequest();
var parsedSignedRequest;
if(signedRequest){
try{
parsedSignedRequest=require("sdk.SignedRequest").parse(signedRequest);
}catch(_unused){

require("sdk.Cookie").clearSignedRequestCookie();
}
if(
parsedSignedRequest!=null&&
parsedSignedRequest.user_id!=null)
{
require("sdk.Runtime").setCookieUserID(parsedSignedRequest.user_id);
}
}
}
}
});},3);
                                                                                             __d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC"],(function $module_sdk_Canvas_IframeHandling(global,require,requireDynamic,requireLazy,module,exports){





var autoGrowTimer=null;
var autoGrowLastSize;

function getHeight(){
var document=require("DOMWrapper").getWindow().document;
var body=document.body,
docElement=document.documentElement,
bodyTop=Math.max(body.offsetTop,0),
docTop=Math.max(docElement.offsetTop,0),
bodyScroll=body.scrollHeight+bodyTop,
bodyOffset=body.offsetHeight+bodyTop,
docScroll=docElement.scrollHeight+docTop,
docOffset=docElement.offsetHeight+docTop;

return Math.max(bodyScroll,bodyOffset,docScroll,docOffset);
}

function setSize(params){

if(typeof params!=='object'){
params={};
}
var minShrink=0,
minGrow=0;
if(!params.height){
params.height=getHeight();





minShrink=16;
minGrow=4;
}

if(!params.frame){
params.frame=window.name||'iframe_canvas';
}

if(autoGrowLastSize){
var oldHeight=autoGrowLastSize.height;
var dHeight=params.height-oldHeight;
if(dHeight<=minGrow&&dHeight>=-minShrink){
return false;
}
}
autoGrowLastSize=params;
require("sdk.RPC").remote.setSize(params);
return true;
}

function setAutoGrow(on,interval){
if(interval===undefined&&typeof on==='number'){
interval=on;
on=true;
}

if(on||on===undefined){
if(autoGrowTimer===null){


autoGrowTimer=setInterval(function setInterval_$0(){
setSize();
},interval||100);
}
setSize();
}else{
if(autoGrowTimer!==null){
clearInterval(autoGrowTimer);
autoGrowTimer=null;
}
}
}

require("sdk.RPC").stub('setSize');

var IframeHandling={
setSize:setSize,
setAutoGrow:setAutoGrow};


module.exports=IframeHandling;}),null);
                                                                                             __d("sdk.Canvas.Navigation",["sdk.RPC"],(function $module_sdk_Canvas_Navigation(global,require,requireDynamic,requireLazy,module,exports){






























function setUrlHandler(callback){
require("sdk.RPC").local.navigate=function(path){
callback({path:path});
};
require("sdk.RPC").remote.setNavigationEnabled(true);
}


require("sdk.RPC").stub('setNavigationEnabled');

var Navigation={
setUrlHandler:setUrlHandler};


module.exports=Navigation;}),null);
                                                                                             __d("sdk.Canvas.Plugin",["Log","sdk.api","sdk.RPC","sdk.Runtime","sdk.UA"],function $module_sdk_Canvas_Plugin(global,require,requireDynamic,requireLazy,module,exports){








var flashClassID='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000';
var unityClassID='CLSID:444785F1-DE89-4295-863A-D46C3A781394';
var devHidePluginCallback=null;









var osx=require("sdk.UA").osx()&&require("sdk.UA").osx.getVersionParts();
var unityNeedsToBeHidden=!(
osx&&
osx[0]>10&&
osx[1]>10&&(
require("sdk.UA").chrome()>=31||require("sdk.UA").webkit()>=537.71||require("sdk.UA").firefox()>=25));









function hideUnityElement(elem){
elem._hideunity_savedstyle={};
elem._hideunity_savedstyle.left=elem.style.left;
elem._hideunity_savedstyle.position=elem.style.position;
elem._hideunity_savedstyle.width=elem.style.width;
elem._hideunity_savedstyle.height=elem.style.height;
elem.style.left='-10000px';
elem.style.position='absolute';
elem.style.width='1px';
elem.style.height='1px';
}








function showUnityElement(elem){
if(elem._hideunity_savedstyle){
elem.style.left=elem._hideunity_savedstyle.left;
elem.style.position=elem._hideunity_savedstyle.position;
elem.style.width=elem._hideunity_savedstyle.width;
elem.style.height=elem._hideunity_savedstyle.height;
}
}








function hideFlashElement(elem){
elem._old_visibility=elem.style.visibility;
elem.style.visibility='hidden';
}








function showFlashElement(elem){
elem.style.visibility=elem._old_visibility||'';
delete elem._old_visibility;
}

function isHideableFlashElement(elem){
var type=elem.type?elem.type.toLowerCase():null;
var isHideable=
type==='application/x-shockwave-flash'||
elem.classid&&elem.classid.toUpperCase()==flashClassID;

if(!isHideable){
return false;
}



var keepvisibleRegex=/opaque|transparent/i;
if(keepvisibleRegex.test(elem.getAttribute('wmode'))){
return false;
}

for(var j=0;j<elem.childNodes.length;j++){
var node=elem.childNodes[j];
if(
/param/i.test(node.nodeName)&&
/wmode/i.test(node.name)&&
keepvisibleRegex.test(node.value))
{
return false;
}
}
return true;
}

function isHideableUnityElement(elem){
var type=elem.type?elem.type.toLowerCase():null;
return(
type==='application/vnd.unity'||
elem.classid&&elem.classid.toUpperCase()==unityClassID);

}






function hidePluginCallback(params){
var candidates=ES("Array","from",false,window.document.getElementsByTagName('object'));
candidates=candidates.concat(ES("Array","from",false,
window.document.getElementsByTagName('embed')));


var flashPresent=false;
var unityPresent=false;
ES(candidates,"forEach",true,function candidates_forEach_$0(elem){
var isFlashElement=isHideableFlashElement(elem);
var isUnityElement=unityNeedsToBeHidden&&isHideableUnityElement(elem);
if(!isFlashElement&&!isUnityElement){
return;
}

flashPresent=flashPresent||isFlashElement;
unityPresent=unityPresent||isUnityElement;

var visibilityToggleCb=function visibilityToggleCb(){
if(params.state==='opened'){
if(isFlashElement){
hideFlashElement(elem);
}else{
hideUnityElement(elem);
}
}else{
if(isFlashElement){
showFlashElement(elem);
}else{
showUnityElement(elem);
}
}
};

if(devHidePluginCallback){
require("Log").info('Calling developer specified callback');



var devArgs={state:params.state,elem:elem};
devHidePluginCallback(devArgs);
setTimeout(visibilityToggleCb,200);
}else{
visibilityToggleCb();
}
});

if(Math.random()<=1/1000){
var opts={
unity:unityPresent,
flash:flashPresent};

require("sdk.api")(require("sdk.Runtime").getClientID()+'/occludespopups','post',opts);
}
}

require("sdk.RPC").local.hidePluginObjects=function(){
require("Log").info('hidePluginObjects called');
hidePluginCallback({state:'opened'});
};
require("sdk.RPC").local.showPluginObjects=function(){
require("Log").info('showPluginObjects called');
hidePluginCallback({state:'closed'});
};


require("sdk.RPC").local.showFlashObjects=require("sdk.RPC").local.showPluginObjects;
require("sdk.RPC").local.hideFlashObjects=require("sdk.RPC").local.hidePluginObjects;

function hidePluginElement(){
hideFlashElement();
hideUnityElement();
}
function showPluginElement(){
showFlashElement();
showUnityElement();
}

var Plugin={

_setHidePluginCallback:function _setHidePluginCallback(callback){
devHidePluginCallback=callback;
},

hidePluginElement:hidePluginElement,
showPluginElement:showPluginElement};


module.exports=Plugin;},null);
                                                                                             __d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],function $module_sdk_Canvas_Tti(global,require,requireDynamic,requireLazy,module,exports){




function passAppTtiMessage(callback,messageName){
var params={
appId:require("sdk.Runtime").getClientID(),
time:ES("Date","now",false),
name:messageName};


var args=[params];
if(callback){
args.push(function args_push_$0(response){
callback(response.result);
});
}

require("sdk.RPC").remote.logTtiMessage.apply(null,args);
}






function startTimer(){
passAppTtiMessage(null,'StartIframeAppTtiTimer');
}









function stopTimer(callback){
passAppTtiMessage(callback,'StopIframeAppTtiTimer');
}










function setDoneLoading(callback){
passAppTtiMessage(callback,'RecordIframeAppTti');
}

require("sdk.RPC").stub('logTtiMessage');

var Tti={
setDoneLoading:setDoneLoading,
startTimer:startTimer,
stopTimer:stopTimer};


module.exports=Tti;},null);
                                                                                                                                          __d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.IframeHandling","sdk.Canvas.Navigation","sdk.Canvas.Plugin","sdk.RPC","sdk.Runtime","sdk.Canvas.Tti"],function $module_legacy_fb_canvas(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){












require("FB").provide('Canvas',{

setSize:function setSize(params){
require("Assert").maybeObject(params,'Invalid argument');
return require("sdk.Canvas.IframeHandling").setSize.apply(null,arguments);
},

setAutoGrow:function setAutoGrow(){
return require("sdk.Canvas.IframeHandling").setAutoGrow.apply(null,arguments);
},


getPageInfo:function getPageInfo(callback){
require("Assert").isFunction(callback,'Invalid argument');
return require("sdk.Canvas.Environment").getPageInfo.apply(null,arguments);
},

scrollTo:function scrollTo(x,y){
require("Assert").maybeNumber(x,'Invalid argument');
require("Assert").maybeNumber(y,'Invalid argument');
return require("sdk.Canvas.Environment").scrollTo.apply(null,arguments);
},


setDoneLoading:function setDoneLoading(callback){
require("Assert").maybeFunction(callback,'Invalid argument');
return require("sdk.Canvas.Tti").setDoneLoading.apply(null,arguments);
},

startTimer:function startTimer(){
return require("sdk.Canvas.Tti").startTimer.apply(null,arguments);
},

stopTimer:function stopTimer(callback){
require("Assert").maybeFunction(callback,'Invalid argument');
return require("sdk.Canvas.Tti").stopTimer.apply(null,arguments);
},


getHash:function getHash(callback){
require("Assert").isFunction(callback,'Invalid argument');
return require("sdk.Canvas.Navigation").getHash.apply(null,arguments);
},

setHash:function setHash(hash){
require("Assert").isString(hash,'Invalid argument');
return require("sdk.Canvas.Navigation").setHash.apply(null,arguments);
},

setUrlHandler:function setUrlHandler(callback){
require("Assert").isFunction(callback,'Invalid argument');
return require("sdk.Canvas.Navigation").setUrlHandler.apply(null,arguments);
}});


require("sdk.RPC").local.fireEvent=ES(require("sdk.Event").fire,"bind",true,require("sdk.Event"));

require("sdk.Event").subscribe('init:post',function Event_subscribe_$1(options){
if(require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)){
require("Assert").isTrue(
!options.hideFlashCallback||!options.hidePluginCallback,
'cannot specify deprecated hideFlashCallback and new hidePluginCallback');

require("sdk.Canvas.Plugin")._setHidePluginCallback(
options.hidePluginCallback||options.hideFlashCallback);

}
});},3);
                                                                                                                                                 __d("legacy:fb.canvas-legacy",["Assert","FB","Log","sdk.Canvas.Tti"],(function $module_legacy_fb_canvas_legacy(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){






require("FB").provide('CanvasInsights',{
setDoneLoading:function setDoneLoading(callback){
require("Log").warn('Deprecated: use FB.Canvas.setDoneLoading');
require("Assert").maybeFunction(callback,'Invalid argument');
return require("sdk.Canvas.Tti").setDoneLoading.apply(null,arguments);
}});}),3);
                                                                                                                                                 __d("legacy:fb.canvas.plugin",["FB","sdk.Canvas.Plugin"],(function $module_legacy_fb_canvas_plugin(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){




require("FB").provide('Canvas.Plugin',require("sdk.Canvas.Plugin"));}),3);
                                                                                             __d("sdk.Canvas.Prefetcher",["JSSDKCanvasPrefetcherConfig","sdk.api","sdk.Runtime"],function $module_sdk_Canvas_Prefetcher(global,require,requireDynamic,requireLazy,module,exports){






var COLLECT={
AUTOMATIC:0,
MANUAL:1};


var sampleRate=require("JSSDKCanvasPrefetcherConfig").sampleRate;
var blacklist=require("JSSDKCanvasPrefetcherConfig").blacklist;
var collectionMode=COLLECT.AUTOMATIC;
var links=[];

function sample(){

var resourceFieldsByTag={
object:'data',
link:'href',
script:'src'};


if(collectionMode==COLLECT.AUTOMATIC){
ES(ES("Object","keys",false,resourceFieldsByTag),"forEach",true,function forEach_$0(tagName){
var propertyName=resourceFieldsByTag[tagName];
ES(ES("Array","from",false,document.getElementsByTagName(tagName)),"forEach",true,function forEach_$0(
tag)
{
if(tag[propertyName]){
links.push(tag[propertyName]);
}
});
});
}

if(links.length===0){
return;
}


require("sdk.api")(require("sdk.Runtime").getClientID()+'/staticresources','post',{
urls:ES("JSON","stringify",false,links),
is_https:location.protocol==='https:'});


links=[];
}

function maybeSample(){
if(
!require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)||
!require("sdk.Runtime").getClientID()||
!sampleRate)
{
return;
}

if(
Math.random()>=1/sampleRate||
blacklist=='*'||
~ES(blacklist,"indexOf",true,require("sdk.Runtime").getClientID()))
{
return;
}


setTimeout(sample,30000);
}














function setCollectionMode(mode){
collectionMode=mode;
}





function addStaticResource(url){
links.push(url);
}

var CanvasPrefetcher={
COLLECT_AUTOMATIC:COLLECT.AUTOMATIC,
COLLECT_MANUAL:COLLECT.MANUAL,

addStaticResource:addStaticResource,
setCollectionMode:setCollectionMode,


_maybeSample:maybeSample};


module.exports=CanvasPrefetcher;},null);
                                                                                                                                                     __d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],function $module_legacy_fb_canvas_prefetcher(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){






require("FB").provide('Canvas.Prefetcher',require("sdk.Canvas.Prefetcher"));

require("sdk.Event").subscribe('init:post',function Event_subscribe_$1(options){
if(require("sdk.Runtime").isEnvironment(require("sdk.Runtime").ENVIRONMENTS.CANVAS)){
require("sdk.Canvas.Prefetcher")._maybeSample();
}
});},3);
                                                                                                                                             __d("legacy:fb.compat.ui",["FB","Log","sdk.ui","sdk.UIServer"],function $module_legacy_fb_compat_ui(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){






require("FB").provide('',{
share:function share(u){
require("Log").error('share() has been deprecated. Please use FB.ui() instead.');
require("sdk.ui")({display:'popup',method:'stream.share',u:u});
},

publish:function publish(post,cb){
require("Log").error('publish() has been deprecated. Please use FB.ui() instead.');
post=post||{};
require("sdk.ui")(babelHelpers["extends"]({
display:'popup',method:'stream.publish',preview:1},post||{}),
cb);

},

addFriend:function addFriend(id,cb){
require("Log").error('addFriend() has been deprecated. Please use FB.ui() instead.');
require("sdk.ui")({display:'popup',id:id,method:'friend.add'},cb);
}});



require("sdk.UIServer").Methods['auth.login']=require("sdk.UIServer").Methods['permissions.request'];},3);
                                                                                                        __d("sdk.Data",["Log"],(function $module_sdk_Data(global,require,requireDynamic,requireLazy,module,exports){



var logError=function logError(){
require("Log").error(
'##########################\n'+
'#  FB.Data has been deprecated.\n'+
'#  Please use FB.api().\n'+
'#  https://developers.facebook.com/docs/javascript/reference/FB.api/\n'+
'##########################');

};




var Data={



query:logError,




waitOn:logError,




process:logError};


module.exports=Data;}),null);
                                                                                                                                        __d("legacy:fb.data",["FB","sdk.Data"],(function $module_legacy_fb_data(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){



require("FB").provide('Data',require("sdk.Data"));}),3);
                                                                                                                                         __d("legacy:fb.event",["FB","sdk.Event","Log"],function $module_legacy_fb_event(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){





var warn=function warn(name){return require("Log").error("FB.Event."+name+"() has been deprecated");};

require("FB").provide('Event',{
subscribe:function subscribe(name,cb){
return require("sdk.Event").subscribe(name,cb);
},

unsubscribe:ES(require("sdk.Event").unsubscribe,"bind",true,require("sdk.Event")),
clear:ES(warn,"bind",true,null,'clear'),
fire:ES(warn,"bind",true,null,'fire')});},3);
                                                                                                                                                __d("legacy:fb.frictionless",["FB","sdk.Frictionless"],(function $module_legacy_fb_frictionless(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){



require("FB").provide('Frictionless',require("sdk.Frictionless"));}),3);
                                                                                                 __d("sdk.GamingServices",["sdk.api","sdk.ui"],function $module_sdk_GamingServices(global,require,requireDynamic,requireLazy,module,exports){




var GamingServices={






friendFinder:function friendFinder(cb){
require("sdk.ui")(
{
display:'touch',
method:'gaming_friendfinder'},

cb);

},












uploadImageToMediaLibrary:function uploadImageToMediaLibrary(
imageUri,
caption,
shouldOpenMediaDialog,
cb)
{
require("sdk.api")(
'me/photos',
'POST',
{
caption:caption,
url:imageUri},

function api_$3(apiResponse){
if(
shouldOpenMediaDialog===false||
!apiResponse||
apiResponse.error)
{
if(cb!==null){
cb(apiResponse);
}
}else{
var upload_id=apiResponse.id;
require("sdk.ui")(
{
display:'touch',
method:'gaming_media_library',
media_id:upload_id},

function ui_$1(_response){
if(cb!==null){
cb(apiResponse);
}
});

}
});

}};


module.exports=GamingServices;},null);
                                                                                                                                                  __d("legacy:fb.gamingservices",["FB","sdk.GamingServices"],(function $module_legacy_fb_gamingservices(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){




require("FB").provide('',{gamingservices:require("sdk.GamingServices")});}),3);
                                                                                                                                                                                                             __d("sdk.MBasicInitializer",["UrlMap","sdk.DOM","sdk.fbt","sdk.Runtime","sdk.UA","sdk.URI"],function $module_sdk_MBasicInitializer(global,require,requireDynamic,requireLazy,module,exports){










var sharePluginInitialize=function sharePluginInitialize(){
function replaceWithLink(share_button){
if(!share_button){
return;
}
var share_button_container=share_button.parentNode;
if(!share_button_container){
return;
}
var href=require("sdk.DOM").getAttr(share_button,'href')||window.location.href;
var dialog=new(require("sdk.URI"))(require("UrlMap").resolve('m'));
dialog.setPath('/dialog/share');
dialog.addQueryData('href',encodeURI(href));
dialog.addQueryData('app_id',require("sdk.Runtime").getClientID());
dialog.addQueryData('mbasic_link',1);
var link=document.createElement('a');

link.style='display:inline-block; zoom:1;';
link.textContent=require("sdk.fbt")._("Share to Facebook");



link.setAttribute('href',dialog.toString());
link.setAttribute('target','_blank');
share_button_container.insertBefore(link,share_button);
share_button_container.removeChild(share_button);
}

ES(ES("Array","from",false,document.getElementsByTagName('fb:share-button')),"forEach",true,function forEach_$0(button){return(
replaceWithLink(button));});

ES(ES("Array","from",false,
document.getElementsByClassName('fb-share-button')),"forEach",true,
function forEach_$0(button){return replaceWithLink(button);});
};

function init(){
if(!require("sdk.UA").mBasic()){
return;
}
sharePluginInitialize();
}

module.exports={
init:init};},null);
                                                                                             __d("sdk.init",["Log","ManagedError","QueryString","sdk.Cookie","sdk.ErrorHandling","sdk.Event","sdk.MBasicInitializer","sdk.PlatformVersioning","sdk.Runtime","sdk.UA","sdk.URI"],function $module_sdk_init(global,require,requireDynamic,requireLazy,module,exports){




















function parseAppId(appId){
var looksValid=
typeof appId==='number'&&appId>0||
typeof appId==='string'&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(appId);
if(looksValid){
return appId.toString();
}
require("Log").warn(
'Invalid App Id: Must be a number or numeric string representing '+
'the application id.');

return null;
}



















function init(options){
if(require("sdk.Runtime").getInitialized()){
require("Log").warn('FB.init has already been called - this could indicate a problem');
}


if(require("sdk.Runtime").getIsVersioned()){

if(Object.prototype.toString.call(options)!=='[object Object]'){
throw new(require("ManagedError"))('Invalid argument');
}

if(options.authResponse){
throw new(require("ManagedError"))('Setting authResponse is not supported');
}

if(!options.version){

options.version=new(require("sdk.URI"))(location.href).getQueryData().sdk_version;
}

require("sdk.PlatformVersioning").assertValidVersion(options.version);
require("sdk.Runtime").setVersion(options.version);
}else{

if(/number|string/.test(typeof options)){
require("Log").warn('FB.init called with invalid parameters');
options={apiKey:options};
}

options=ES("Object","assign",false,
{
status:true},

options||{});

}

var appId=parseAppId(options.appId||options.apiKey);
if(appId!==null){
require("sdk.Runtime").setClientID(appId);
}

if('scope'in options){
require("sdk.Runtime").setScope(options.scope);
}

if(options.cookie){
require("sdk.Runtime").setUseCookie(true);
if(typeof options.cookie==='string'){
require("sdk.Cookie").setDomain(options.cookie);
}
}

if(options.localStorage===false||options.localStorage==='false'){
require("sdk.Runtime").setUseLocalStorage(false);
}

if(options.kidDirectedSite){
require("sdk.Runtime").setKidDirectedSite(true);
}

if(options.autoLogAppEvents==='1'||options.autoLogAppEvents==='true'){

options.autoLogAppEvents=true;
}

if(options.ab){
require("sdk.Runtime").setSDKAB(options.ab);
}

require("sdk.Runtime").setInitialized(true);



if(require("sdk.UA").mBasic()){
require("sdk.MBasicInitializer").init();
}

require("sdk.Event").fire('init:post',options);
}




window.setTimeout(function window_setTimeout_$0(){


var pattern=/(connect\.facebook\.net|\.facebook\.com\/assets.php|\.facebook\.net\/assets.php).*?#(.*)/;
ES(ES("Array","from",false,fb_fif_window.document.getElementsByTagName('script')),"forEach",true,
function forEach_$0(script){
if(script.src){
var match=pattern.exec(script.src);
if(match){
var opts=require("QueryString").decode(match[2]);
for(var key in opts){
if(Object.prototype.hasOwnProperty.call(opts,key)){
var val=opts[key];
if(val=='0'){
opts[key]=0;
}
}
}

init(opts);
}
}
});



if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){
require("sdk.Event").fire('init:asyncstart');
window.fbAsyncInit.hasRun=true;
require("sdk.ErrorHandling").unguard(window.fbAsyncInit)();
}
},0);

module.exports=init;},null);
                                                                                                                                        __d("legacy:fb.init",["FB","sdk.Event","sdk.init"],(function $module_legacy_fb_init(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){



'use strict';






require("FB").provide('',{init:require("sdk.init")});

require("sdk.Event").subscribe('init:post',function Event_subscribe_$1(){

if(__buffer){

__buffer.replay();
}
});

window.setTimeout(function window_setTimeout_$0(){

if(__buffer&&__buffer.opts){
require("sdk.init")(__buffer.opts);
}
},0);}),3);
                                                                                                                                        __d("legacy:fb.json",["FB","ManagedError"],function $module_legacy_fb_json(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){







require("FB").provide('JSON',{
stringify:function stringify(obj){
try{
return ES("JSON","stringify",false,obj);
}catch(e){
throw new(require("ManagedError"))(e.message,e);
}
},

parse:function parse(str){
try{
return ES("JSON","parse",false,str);
}catch(e){
throw new(require("ManagedError"))(e.message,e);
}
}});},3);
                                                                                         __d("runOnce",[],(function $module_runOnce(global,require,requireDynamic,requireLazy,module,exports){

function runOnce(func){
var hasRun=false;
var result;

return function(){
if(!hasRun){
hasRun=true;
result=func();
}
return result;
};
}

module.exports=runOnce;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("sdk.Time",["Log","sdk.feature","sdk.Impressions","sdk.Runtime"],function $module_sdk_Time(global,require,requireDynamic,requireLazy,module,exports){

'use strict';







var perf=window.performance;


var couldLog=perf&&'now'in perf&&'getEntriesByName'in perf;



var startTime;
var data={};

if(couldLog){
var sdkurl=require("sdk.Runtime").getSDKUrl();
var bootloadedTiming=null;
var timing=ES(perf.
getEntriesByType('resource'),"filter",true,
function filter_$0(t){return ES(t.name,"startsWith",true,sdkurl);});



if(timing.length>1){
if(timing>2){
timing=null;
}else{

var bootId=ES(timing,"findIndex",true,function timing_findIndex_$0(t){return ES(
t.name,"startsWith",true,sdkurl+'?hash=');});

if(!bootId){
timing=null;
}else{
bootloadedTiming=timing.splice(bootId)[0];
timing=timing[0];
}
}
}else if(timing.length===1){



var frame=document.getElementById('facebook-jssdk-iframe');
if(frame&&frame instanceof HTMLIFrameElement){
bootloadedTiming=frame.contentWindow.performance.
getEntriesByType('resource').
find(function find_$0(t){return ES(t.name,"startsWith",true,sdkurl);});
}
timing=timing[0];
}else{
timing=null;
}

if(timing){

data.fetchTime=Math.round(timing.duration);
if(bootloadedTiming){
data.fetchTime+=Math.round(bootloadedTiming.duration);
}

if('transferSize'in timing){
data.transferSize=timing.transferSize;
if(bootloadedTiming){
data.transferSize+=bootloadedTiming.transferSize;
}
}
require("Log").debug(
'sdkperf: it took %s ms and %s bytes to load %s',
data.fetchTime,
data.transferSize,
sdkurl);

startTime=timing.startTime;

data.ns=require("sdk.Runtime").getSDKNS();


if(startTime){
window.setTimeout(function window_setTimeout_$0(){
var shouldLog=require("sdk.feature")('log_perf',false);
var testId=require("sdk.Runtime").getSDKAB();
if(testId){
data.ab=testId;
shouldLog=true;
}
if(shouldLog){
require("sdk.Impressions").log(116,data);
}
},10000);
}
}
}

var Time={
log:function log(key){
if(!couldLog||!startTime){
return;
}
data[key]=Math.round(perf.now()-startTime);
require("Log").debug('sdkperf: %s logged after %s ms',key,data[key]);
}};


module.exports=Time;},null);
                                                                                                                                        __d("legacy:fb.time",["sdk.Event","sdk.Time","runOnce"],function $module_legacy_fb_time(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){

'use strict';var sdkEvent;






(sdkEvent=require("sdk.Event")).subscribe('init:post',function Event_subscribe_$1(){
require("sdk.Time").log('init');
});

sdkEvent.subscribe('init:asyncstart',function Event_subscribe_$1(){
require("sdk.Time").log('asyncstart');
});

sdkEvent.subscribe(
'iframeplugin:create',
require("runOnce")(function runOnce_$0(){return require("sdk.Time").log('pluginframe');}));



sdkEvent.subscribe(
'iframeplugin:onload',
require("runOnce")(function runOnce_$0(){return require("sdk.Time").log('ttfp');}));},3);
                                                                                                                                      __d("legacy:fb.ua",["FB","sdk.UA"],(function $module_legacy_fb_ua(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){



require("FB").provide('UA',{nativeApp:require("sdk.UA").nativeApp});}),3);
                                                                                                                                      __d("legacy:fb.ui",["FB","sdk.ui"],(function $module_legacy_fb_ui(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){




require("FB").provide('',{ui:require("sdk.ui")});}),3);
                                                                                                                                                                                                                                                                                                                                                                                                                            __d("XFBML",["Assert","Log","ObservableMixin","runOnce"],function $module_XFBML(global,require,requireDynamic,requireLazy,module,exports){








var xfbml={};
var html5={};

var parseCount=0;

var XFBML=new(require("ObservableMixin"))();

function propStr(object,property){
return ES(object[property]+'',"trim",true);
}

function nodeNameIE(element){


return element.scopeName?element.scopeName+':'+element.nodeName:'';
}

function xfbmlInfo(element){
return(
xfbml[propStr(element,'nodeName').toLowerCase()]||
xfbml[nodeNameIE(element).toLowerCase()]);

}

function html5Info(element){
var classNames=ES(propStr(element,'className').
split(/\s+/),"filter",true,
function filter_$0(className){
return Object.prototype.hasOwnProperty.call(html5,className);
});

if(classNames.length===0){
return undefined;
}














if(
element.getAttribute('fb-xfbml-state')||
!element.childNodes||
element.childNodes.length===0||
element.childNodes.length===1&&
element.childNodes[0].nodeType===3||
element.children.length===1&&
propStr(element.children[0],'className')==='fb-xfbml-parse-ignore')
{
return html5[classNames[0]];
}
}

function attr(element){
var attrs={};
ES(ES("Array","from",false,element.attributes),"forEach",true,function forEach_$0(at){
attrs[propStr(at,'name')]=propStr(at,'value');
});
return attrs;
}

function _parse(dom,callback,reparse){
require("Assert").isTrue(
dom&&dom.nodeType&&dom.nodeType===1&&!!dom.getElementsByTagName,
'Invalid DOM node passed to FB.XFBML.parse()');

require("Assert").isFunction(callback,'Invalid callback passed to FB.XFBML.parse()');

var pc=++parseCount;
require("Log").info('XFBML Parsing Start %s',pc);





var count=1;
var tags=0;
var onrender=function onrender(){
count--;
if(count===0){
require("Log").info('XFBML Parsing Finish %s, %s tags found',pc,tags);
callback();
XFBML.inform('render',pc,tags);
}
require("Assert").isTrue(count>=0,'onrender() has been called too many times');
};

ES(ES("Array","from",false,dom.getElementsByTagName('*')),"forEach",true,function forEach_$0(element){
if(!reparse&&element.getAttribute('fb-xfbml-state')){

return;
}
if(element.nodeType!==1){

return;
}

var info=xfbmlInfo(element)||html5Info(element);
if(!info){
return;
}

count++;
tags++;
var renderer=new info.ctor(
element,
info.xmlns,
info.localName,
attr(element));




renderer.subscribe(
'render',
require("runOnce")(function runOnce_$0(){




element.setAttribute('fb-xfbml-state','rendered');
onrender();
}));


var render=function render(){


if(element.getAttribute('fb-xfbml-state')=='parsed'){


XFBML.subscribe('render.queue',render);
}else{
element.setAttribute('fb-xfbml-state','parsed');
renderer.process();
}
};

render();
});

XFBML.inform('parse',pc,tags);

var timeout=30000;
setTimeout(function setTimeout_$0(){
if(count>0){
require("Log").warn('%s tags failed to render in %s ms',count,timeout);
}
},timeout);

onrender();
}

XFBML.subscribe('render',function XFBML_subscribe_$1(){
var q=XFBML.getSubscribers('render.queue');
XFBML.clearSubscribers('render.queue');
ES(q,"forEach",true,function q_forEach_$0(r){
r();
});


});

ES("Object","assign",false,XFBML,{
registerTag:function registerTag(info){
var fqn=info.xmlns+':'+info.localName;
require("Assert").isUndefined(xfbml[fqn],fqn+' already registered');

xfbml[fqn]=info;



html5[info.xmlns+'-'+info.localName]=info;
},

parse:function parse(dom,cb){
_parse(dom||document.body,cb||function(){},true);
},

parseNew:function parseNew(){
_parse(document.body,function _parse_$1(){},false);
}});


module.exports=XFBML;},null);
                                                                                                                                         __d("legacy:fb.xfbml",["Assert","sdk.Event","FB","XFBML","sdk.domReady","wrapFunction"],function $module_legacy_fb_xfbml(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){var sdkEvent;









require("FB").provide('XFBML',{
parse:function parse(dom){
require("Assert").maybeXfbml(dom,'Invalid argument');


if(dom&&dom.nodeType===9){
dom=dom.body;
}
return require("XFBML").parse.apply(null,arguments);
}});


require("XFBML").subscribe('parse',ES((sdkEvent=require("sdk.Event")).fire,"bind",true,sdkEvent,'xfbml.parse'));
require("XFBML").subscribe('render',ES(sdkEvent.fire,"bind",true,sdkEvent,'xfbml.render'));

sdkEvent.subscribe('init:post',function Event_subscribe_$1(options){
if(options.xfbml){

setTimeout(
require("wrapFunction")(ES(
require("sdk.domReady"),"bind",true,null,require("XFBML").parse),
'entry',
'init:post:xfbml.parse'),

0);

}
});

require("Assert").define('Xfbml',function Assert_define_$1(element){
return(
(element.nodeType===1||element.nodeType===9)&&
typeof element.nodeName==='string');

});







try{

if(document.namespaces&&!document.namespaces.item.fb){

document.namespaces.add('fb');
}
}catch(e){

}},3);
                                                                                         __d("UserAgent_DEPRECATED",[],function $module_UserAgent_DEPRECATED(global,require,requireDynamic,requireLazy,module,exports){









































var _populated=false;


var _ie,_firefox,_opera,_webkit,_chrome;


var _ie_real_version;


var _osx,_windows,_linux,_android;


var _win64;


var _iphone,_ipad,_native,_mLite;

var _mobile;

function _populate(){
if(_populated){
return;
}

_populated=true;






var uas=navigator.userAgent;
var agent=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
uas);

var os=/(Mac OS X)|(Windows)|(Linux)/.exec(uas);

_iphone=/\b(iPhone|iP[ao]d)/.exec(uas);
_ipad=/\b(iP[ao]d)/.exec(uas);
_android=/Android/i.exec(uas);
_native=/FBAN\/\w+;/i.exec(uas);
_mLite=/FBAN\/mLite;/i.exec(uas);
_mobile=/Mobile/i.exec(uas);






_win64=!!/Win64/.exec(uas);

if(agent){
_ie=agent[1]?
parseFloat(agent[1]):
agent[5]?
parseFloat(agent[5]):
NaN;

if(_ie&&document&&document.documentMode){
_ie=document.documentMode;
}

var trident=/(?:Trident\/(\d+.\d+))/.exec(uas);
_ie_real_version=trident?parseFloat(trident[1])+4:_ie;

_firefox=agent[2]?parseFloat(agent[2]):NaN;
_opera=agent[3]?parseFloat(agent[3]):NaN;
_webkit=agent[4]?parseFloat(agent[4]):NaN;
if(_webkit){



agent=/(?:Chrome\/(\d+\.\d+))/.exec(uas);
_chrome=agent&&agent[1]?parseFloat(agent[1]):NaN;
}else{
_chrome=NaN;
}
}else{
_ie=_firefox=_opera=_chrome=_webkit=NaN;
}

if(os){
if(os[1]){





var ver=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

_osx=ver?parseFloat(ver[1].replace('_','.')):true;
}else{
_osx=false;
}
_windows=!!os[2];
_linux=!!os[3];
}else{
_osx=_windows=_linux=false;
}
}

var UserAgent_DEPRECATED={






ie:function ie(){
return _populate()||_ie;
},







ieCompatibilityMode:function ieCompatibilityMode(){
return _populate()||_ie_real_version>_ie;
},






ie64:function ie64(){
return UserAgent_DEPRECATED.ie()&&_win64;
},







firefox:function firefox(){
return _populate()||_firefox;
},







opera:function opera(){
return _populate()||_opera;
},







webkit:function webkit(){
return _populate()||_webkit;
},





safari:function safari(){
return UserAgent_DEPRECATED.webkit();
},







chrome:function chrome(){
return _populate()||_chrome;
},






windows:function windows(){
return _populate()||_windows;
},







osx:function osx(){
return _populate()||_osx;
},






linux:function linux(){
return _populate()||_linux;
},







iphone:function iphone(){
return _populate()||_iphone;
},

mobile:function mobile(){
return _populate()||_iphone||_ipad||_android||_mobile;
},

nativeApp:function nativeApp(){

return _populate()||_mLite!=null?null:_native;
},

android:function android(){
return _populate()||_android;
},

ipad:function ipad(){
return _populate()||_ipad;
}};


module.exports=UserAgent_DEPRECATED;},null);
                                                                                         __d("hasNamePropertyBug",["UserAgent_DEPRECATED","guid"],function $module_hasNamePropertyBug(global,require,requireDynamic,requireLazy,module,exports){





var hasBug=require("UserAgent_DEPRECATED").ie()?undefined:false;




function test(){
var form=document.createElement('form');
var input=form.appendChild(document.createElement('input'));
input.name=require("guid")();
hasBug=input!==form.elements[input.name];
return hasBug;
}

function hasNamePropertyBug(){
return hasBug===undefined?test():hasBug;
}

module.exports=hasNamePropertyBug;},null);
                                                                                         __d("isNumberLike",[],function $module_isNumberLike(global,require,requireDynamic,requireLazy,module,exports){





function isNumberLike(n){
return!isNaN(parseFloat(n))&&isFinite(n);
}

module.exports=isNumberLike;},null);
                                                                                                                __d("sdk.createIframe",["DOMEventListener","getBlankIframeSrc","guid","hasNamePropertyBug","isNumberLike"],function $module_sdk_createIframe(global,require,requireDynamic,requireLazy,module,exports){








function createIframe(opts_arg)

















{
var opts=ES("Object","assign",false,{},opts_arg);
var frame;
var name=opts.name||require("guid")();
var root=opts.root;
var style=opts.style||{border:'none'};
var src=opts.url;
var onLoad=opts.onload;
var onError=opts.onerror;

if(require("hasNamePropertyBug")()){
frame=document.createElement(
'<iframe name="'+name+'"/>');

}else{
frame=document.createElement('iframe');
frame.name=name;
}


delete opts.style;
delete opts.name;
delete opts.url;
delete opts.root;
delete opts.onload;
delete opts.onerror;
delete opts.height;
delete opts.width;

if(opts.frameBorder===undefined){
opts.frameBorder=0;
}

if(opts.allowTransparency===undefined){
opts.allowTransparency=true;
}

if(opts.allowFullscreen===undefined){
opts.allowFullscreen=true;
}

if(opts.scrolling===undefined){
opts.scrolling='no';
}

if(opts.allow===undefined){
opts.allow='encrypted-media';
}

if(opts.lazy){
opts.loading='lazy';
}
delete opts.lazy;

if(opts_arg.width!=null&&require("isNumberLike")(opts_arg.width)){
frame.width=opts_arg.width+'px';
}
if(opts_arg.height!=null&&require("isNumberLike")(opts_arg.height)){
frame.height=opts_arg.height+'px';
}

if(opts.testid){
frame.dataset.testid=opts.testid;
delete opts.testid;
}

for(var key in opts){
if(Object.prototype.hasOwnProperty.call(opts,key)){
frame.setAttribute(key,opts[key]);
}
}

ES("Object","assign",false,frame.style,style);



frame.src=require("getBlankIframeSrc")();
if(root!=null){
root.appendChild(frame);
}
if(onLoad){
var onLoadListener=require("DOMEventListener").add(frame,'load',function DOMEventListener_add_$2(){
onLoadListener.remove();
onLoad();
});
}

if(onError){
var onErrorListener=require("DOMEventListener").add(frame,'error',function DOMEventListener_add_$2(){
onErrorListener.remove();
onError();
});
}






frame.src=src;
return frame;
}

module.exports=createIframe;},null);
                                                                                                                                                                                                                                                                                                                                                                                                                                           __d("IframePlugin",["Log","ObservableMixin","QueryString","Type","UrlMap","guid","resolveURI","sdk.Auth","sdk.createIframe","sdk.DOM","sdk.Event","sdk.PlatformVersioning","sdk.Runtime","sdk.UA","sdk.URI","sdk.XD"],function $module_IframePlugin(global,require,requireDynamic,requireLazy,module,exports){





















var baseParams={
skin:'string',
font:'string',
width:'string',
height:'px',
ref:'string',
lazy:'bool',
color_scheme:'string'};


function resize(elem,width,height){
if(width||width===0){
if(width==='100%'){
elem.style.width='100%';
}else{
elem.style.width=width+'px';
}
}

if(height||height===0){
elem.style.height=height+'px';
}
}

function resizeBubbler(pluginID){
return function(msg){
var message={width:msg.width,height:msg.height,pluginID:pluginID};
require("sdk.Event").fire('xfbml.resize',message);
};
}

var types={

string:function string(value){
return value;
},
bool:function bool(value){
return value?/^(?:true|1|yes|on)$/i.test(value):undefined;
},
url:function url(value){
return require("resolveURI")(value);
},
url_maybe:function url_maybe(value){
return value?require("resolveURI")(value):value;
},
hostname:function hostname(value){
return value||window.location.hostname;
},
px:function px(value){
return /^(\d+)(?:px)?$/.test(value)?parseInt(RegExp.$1,10):undefined;
},
text:function text(value){
return value;
}};


function getVal(attr,key){
var val=
attr[key]||
attr[key.replace(/_/g,'-')]||
attr[key.replace(/_/g,'')]||
attr['data-'+key]||
attr['data-'+key.replace(/_/g,'-')]||
attr['data-'+key.replace(/_/g,'')]||
undefined;
return val;
}

function validate(
defn,
elem,
attr,
params)
{
ES(ES("Object","keys",false,defn),"forEach",true,function forEach_$0(key){
if(defn[key]=='text'&&!attr[key]){
attr[key]=elem.textContent||elem.innerText||'';
elem.setAttribute(key,attr[key]);
}
params[key]=types[defn[key]](getVal(attr,key));
});
}



function parse(dim){
if(dim==='100%'){
return'100%';
}

return dim||dim==='0'||dim===0?parseInt(dim,10):undefined;
}

function collapseIframe(iframe){
if(iframe){
resize(iframe,0,0);
}
}


var IframePlugin=require("Type").extend(
{
constructor:function constructor(
elem,
ns,
tag,
attr)
{var _this=this;
this.parent();
tag=tag.replace(/-/g,'_');

var pluginId=getVal(attr,'plugin_id');
this.subscribe('xd.resize',resizeBubbler(pluginId));
this.subscribe('xd.resize.flow',resizeBubbler(pluginId));

this.subscribe('xd.resize.flow',function subscribe_$1(message){
ES("Object","assign",false,_this._iframeOptions.root.style,{
verticalAlign:'bottom',
overflow:''});

resize(
_this._iframeOptions.root,
parse(message.width),
parse(message.height));

_this.updateLift();
clearTimeout(_this._timeoutID);
});

this.subscribe('xd.resize',function subscribe_$1(message){
ES("Object","assign",false,_this._iframeOptions.root.style,{
verticalAlign:'bottom',
overflow:''});

resize(
_this._iframeOptions.root,
parse(message.width),
parse(message.height));

resize(_this._iframe,parse(message.width),parse(message.height));
_this._isIframeResized=true;
_this.updateLift();
clearTimeout(_this._timeoutID);
});

this.subscribe('xd.resize.iframe',function subscribe_$1(message){
resize(_this._iframe,parse(message.width),parse(message.height));
_this._isIframeResized=true;
_this.updateLift();
clearTimeout(_this._timeoutID);
});

this.subscribe('xd.sdk_event',function subscribe_$1(message){
var data=ES("JSON","parse",false,message.data);
data.pluginID=pluginId;
require("sdk.Event").fire(message.event,data,elem);
});

var url=require("UrlMap").resolve('www')+'/plugins/'+tag+'.php?';
var params={};
validate(this.getParams(),elem,attr,params);
validate(baseParams,elem,attr,params);

ES("Object","assign",false,params,{
app_id:require("sdk.Runtime").getClientID(),
locale:require("sdk.Runtime").getLocale(),
sdk:'joey',
kid_directed_site:require("sdk.Runtime").getKidDirectedSite(),
channel:require("sdk.XD").handler(
function XD_handler_$0(msg){return _this.inform('xd.'+msg.type,msg);},
'parent.parent',
true)});



if(this.shouldIgnoreWidth()){
params.width=void 0;
}

params.container_width=elem.offsetWidth;

require("sdk.DOM").addCss(elem,'fb_iframe_widget');
var name=require("guid")();
this.subscribe('xd.verify',function subscribe_$1(msg){
require("sdk.XD").sendToFacebook(name,{
method:'xd/verify',
params:ES("JSON","stringify",false,msg.token)});

});

this.subscribe('xd.refreshLoginStatus',function subscribe_$1(){
require("sdk.Auth").removeLogoutState();
require("sdk.Auth").getLoginStatus(ES(
_this.inform,"bind",true,_this,'login.status'),
true);

});

var flow=document.createElement('span');



ES("Object","assign",false,flow.style,{
verticalAlign:'top',
width:'0px',
height:'0px',
overflow:'hidden'});


this._element=elem;
this._ns=ns;
this._tag=tag;
this._params=params;
this._config=this.getConfig();
this._iframeOptions={
root:flow,
url:url+require("QueryString").encode(params),
name:name,





width:
this._config.mobile_fullsize&&require("sdk.UA").mobile()?
void 0:
params.width||1000,
height:params.height||1000,
style:{
border:'none',
visibility:'hidden'},

title:this._ns+':'+this._tag+' Facebook Social Plugin',
testid:this._ns+':'+this._tag+' Facebook Social Plugin',
onload:function onload(){return _this.inform('render');},
onerror:function onerror(){return collapseIframe(_this._iframe);},
lazy:params.lazy};


if(this.isFluid()&&params.width!=='auto'){
require("sdk.DOM").addCss(this._element,'fb_iframe_widget_fluid_desktop');
if(!params.width&&this._config.full_width){
this._element.style.width='100%';
this._iframeOptions.root.style.width='100%';
this._iframeOptions.style.width='100%';
this._params.container_width=this._element.offsetWidth;
this._iframeOptions.url=url+require("QueryString").encode(this._params);
}
}
},

shouldIgnoreWidth:function shouldIgnoreWidth(){
return require("sdk.UA").mobile()&&this.getConfig().mobile_fullsize;
},


useInlineHeightForMobile:function useInlineHeightForMobile(){
return true;
},

process:function process(){var _this2=this;
if(require("sdk.Runtime").getIsVersioned()){
require("sdk.PlatformVersioning").assertVersionIsSet();
var uri=new(require("sdk.URI"))(this._iframeOptions.url);
this._iframeOptions.url=uri.
setPath('/'+require("sdk.Runtime").getVersion()+uri.getPath()).
toString();
}


var params=ES("Object","assign",false,{},this._params);
delete params.channel;
var query=require("QueryString").encode(params);
if(this._element.getAttribute('fb-iframe-plugin-query')==query){
require("Log").info('Skipping render: %s:%s %s',this._ns,this._tag,query);
this.inform('render');
return;
}
this._element.setAttribute('fb-iframe-plugin-query',query);

this.subscribe('render',function subscribe_$1(){
require("sdk.Event").fire('iframeplugin:onload');
_this2._iframe.style.visibility='visible';




if(!_this2._isIframeResized){
collapseIframe(_this2._iframe);
}
});

while(this._element.firstChild){
this._element.removeChild(this._element.firstChild);
}
this._element.appendChild(this._iframeOptions.root);
var timeout=require("sdk.UA").mobile()?120:45;
this._timeoutID=setTimeout(function setTimeout_$0(){
collapseIframe(_this2._iframe);
require("Log").warn('%s:%s failed to resize in %ss',_this2._ns,_this2._tag,timeout);
},timeout*1000);




this._iframe=require("sdk.createIframe")(this._iframeOptions);
require("sdk.Event").fire('iframeplugin:create');

if(require("sdk.UA").mobile()||params.width==='auto'){
if(this.useInlineHeightForMobile()){
require("sdk.DOM").addCss(this._element,'fb_iframe_widget_fluid');
}

if(!this._iframeOptions.width){
ES("Object","assign",false,this._element.style,{
display:'block',
width:'100%',
height:'auto'});


ES("Object","assign",false,this._iframeOptions.root.style,{
width:'100%',
height:'auto'});


var iframeStyle={
height:'auto',
position:'static',
width:'100%'};


if(require("sdk.UA").iphone()||require("sdk.UA").ipad()){












ES("Object","assign",false,iframeStyle,{
width:'220px',
'min-width':'100%'});

}

ES("Object","assign",false,this._iframe.style,iframeStyle);
}
}
},




getConfig:function getConfig(){
return{};
},

isFluid:function isFluid(){
var config=this.getConfig();
return config.fluid;
},

updateLift:function updateLift(){

var same=
this._iframe.style.width===this._iframeOptions.root.style.width&&
this._iframe.style.height===this._iframeOptions.root.style.height;
require("sdk.DOM")[same?'removeCss':'addCss'](this._iframe,'fb_iframe_widget_lift');
}},require("ObservableMixin"));




IframePlugin.getVal=getVal;

IframePlugin.getBaseParams=function(){return baseParams;};

IframePlugin.withParams=function(
params,
config)
{
return IframePlugin.extend({
getParams:function getParams(){
return params;
},

getConfig:function getConfig(){
return config?config:{};
}});

};

module.exports=IframePlugin;},null);
                                                                                                                                                                                                                                                                  __d("PluginConfig",["sdk.feature"],(function $module_PluginConfig(global,require,requireDynamic,requireLazy,module,exports){



var PluginConfig={
comment_embed:{
mobile_fullsize:true},

messengerpreconfirmation:{
mobile_fullsize:true},

messengeraccountconfirmation:{
mobile_fullsize:true},

messengerbusinesslink:{
mobile_fullsize:true},

messengertoggle:{
mobile_fullsize:true},

messengermessageus:{
mobile_fullsize:true},

post:{
fluid:require("sdk.feature")('fluid_embed',false),
mobile_fullsize:true},

send_to_messenger:{
mobile_fullsize:true}};



module.exports=PluginConfig;}),null);
                                                                                                                               __d("PluginAttrTypes",[],(function $module_PluginAttrTypes(global,require,requireDynamic,requireLazy,module,exports){

'use strict';

var PluginAttrTypes={
string:'string',
bool:'bool',
url:'url'};


module.exports=PluginAttrTypes;}),null);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                __d("PluginTags",["PluginAttrTypes"],function $module_PluginTags(global,require,requireDynamic,requireLazy,module,exports){var PluginAttrTypes;



var PluginTags={
comment_embed:{
href:(PluginAttrTypes=require("PluginAttrTypes")).url,
include_parent:PluginAttrTypes.bool},


composer:{
action_type:PluginAttrTypes.string,
action_properties:PluginAttrTypes.string},


create_event_button:{},

group:{
href:PluginAttrTypes.url,
show_social_context:PluginAttrTypes.bool,
show_group_info:PluginAttrTypes.bool,
show_metadata:PluginAttrTypes.bool},


like:{
href:PluginAttrTypes.url,
layout:PluginAttrTypes.string,
show_faces:PluginAttrTypes.bool,
share:PluginAttrTypes.bool,
action:PluginAttrTypes.string,

send:PluginAttrTypes.bool,
size:PluginAttrTypes.string},


like_box:{
href:PluginAttrTypes.string,
show_faces:PluginAttrTypes.bool,
header:PluginAttrTypes.bool,
stream:PluginAttrTypes.bool,
force_wall:PluginAttrTypes.bool,
show_border:PluginAttrTypes.bool,

id:PluginAttrTypes.string,
connections:PluginAttrTypes.string,
profile_id:PluginAttrTypes.string,
name:PluginAttrTypes.string},


page:{
href:PluginAttrTypes.string,
hide_cta:PluginAttrTypes.bool,
hide_cover:PluginAttrTypes.bool,
small_header:PluginAttrTypes.bool,
adapt_container_width:PluginAttrTypes.bool,
show_facepile:PluginAttrTypes.bool,
show_posts:PluginAttrTypes.bool,
tabs:PluginAttrTypes.string},


messenger_checkbox:{
messenger_app_id:PluginAttrTypes.string,
page_id:PluginAttrTypes.string,
pixel_id:PluginAttrTypes.string,
prechecked:PluginAttrTypes.bool,
allow_login:PluginAttrTypes.bool,
size:PluginAttrTypes.string,
origin:PluginAttrTypes.string,
user_ref:PluginAttrTypes.string,
identity_match:PluginAttrTypes.string,
center_align:PluginAttrTypes.bool},


messengermessageus:{
messenger_app_id:PluginAttrTypes.string,
page_id:PluginAttrTypes.string,
color:PluginAttrTypes.string,
size:PluginAttrTypes.string},


send_to_messenger:{
messenger_app_id:PluginAttrTypes.string,
page_id:PluginAttrTypes.string,
color:PluginAttrTypes.string,
size:PluginAttrTypes.string,
enforce_login:PluginAttrTypes.bool,
identity_match:PluginAttrTypes.string,
origin:PluginAttrTypes.string,
cta_text:PluginAttrTypes.string},


page_events:{
href:PluginAttrTypes.url},


post:{
href:PluginAttrTypes.url,
show_text:PluginAttrTypes.bool},


profile_pic:{
uid:PluginAttrTypes.string,
linked:PluginAttrTypes.bool,
href:PluginAttrTypes.string,
size:PluginAttrTypes.string,
facebook_logo:PluginAttrTypes.bool},


send_to_mobile:{
max_rows:PluginAttrTypes.string,
show_faces:PluginAttrTypes.bool,
size:PluginAttrTypes.string}};



var aliases={
fan:'like_box',
likebox:'like_box'};


ES(ES("Object","keys",false,aliases),"forEach",true,function forEach_$0(key){
PluginTags[key]=PluginTags[aliases[key]];
});

module.exports=PluginTags;},null);
                                                                                                                                           __d("sdk.XFBML.Comments",["IframePlugin","QueryString","UrlMap","sdk.DOM","sdk.Event","sdk.Runtime","sdk.UA","sdk.URI"],function $module_sdk_XFBML_Comments(global,require,requireDynamic,requireLazy,module,exports){











var MIN_WIDTH=320;

var params=ES("Object","assign",false,
{
numposts:'string',
href:'url',
permalink:'bool',
order_by:'string',
mobile:'bool',
version:'string',
hide_post_profile:'bool',
limit:'string',
offset:'string',
view:'string',
fb_comment_id:'string',
from_mod_tool:'bool',

migrated:'string',
xid:'string',
title:'string',
url:'string',
quiet:'string',
reverse:'string',
simple:'string',
css:'string',
notify:'string',
count:'bool'},

require("IframePlugin").getBaseParams());


function setupAttributes(elem,attr){

ES(ES("Object","keys",false,params),"forEach",true,function forEach_$0(key){
var val=require("sdk.DOM").getAttr(elem,key);
if(val!==null){
attr[key]=val;
}
});
ES(ES("Object","keys",false,attr),"forEach",true,function forEach_$0(key){
if(ES(key,"startsWith",true,'data-')){
delete attr[key];
}
});

if(require("sdk.UA").mobile()&&attr.mobile!==false){
attr.mobile=true;
}
if(!attr.skin){
attr.skin=attr.colorscheme;
}


if(!attr.href){
attr.title=attr.title||document.title;
attr.url=attr.url||document.URL;

if(!attr.xid){



var index=ES(document.URL,"indexOf",true,'#');
if(index>0){
attr.xid=encodeURIComponent(document.URL.substring(0,index));
}else{
attr.xid=encodeURIComponent(document.URL);
}
}

if(attr.migrated){
attr.href=
require("UrlMap").resolve('www')+
'/plugins/comments_v1.php?'+
'app_id='+
require("sdk.Runtime").getClientID()+
'&xid='+
encodeURIComponent(attr.xid)+
'&url='+
encodeURIComponent(attr.url);
}
}else{

var fb_comment_id=attr.fb_comment_id;
if(!fb_comment_id){
fb_comment_id=require("QueryString").decode(
document.URL.substring(ES(document.URL,"indexOf",true,'?')+1)).
fb_comment_id;
if(fb_comment_id&&ES(fb_comment_id,"indexOf",true,'#')>0){

fb_comment_id=fb_comment_id.substring(0,ES(fb_comment_id,"indexOf",true,'#'));
}
}

if(fb_comment_id){
attr.fb_comment_id=fb_comment_id;
}
}

if(!attr.version){
attr.version=require("sdk.Runtime").getVersion();
}

if(!attr.permalink){
attr.width=
attr.mobile||attr.width==='auto'||attr.width==='100%'?
'':
!attr.width?
550:
Math.max(attr.width,MIN_WIDTH);


attr.height=100;
}



if(attr.href!=null){
var href=new(require("sdk.URI"))(attr.href);
if(!href.getProtocol()){
attr.href=href.setProtocol('http').toString();
}
}

return attr;
}

var Comments=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){
attr=setupAttributes(elem,attr);
this.parent(elem,ns,tag,attr);
this.subscribe('xd.sdk_event',function subscribe_$1(message){
require("sdk.Event").fire(message.event,ES("JSON","parse",false,message.data));
});
},
getConfig:function getConfig(){
return{
fluid:true,
full_width:true};

},
getParams:function getParams(){
return params;
}});

module.exports=Comments;},null);
                                                                                                 __d("sdk.XFBML.CommentsCount",["sdk.DOM","sdk.XFBML.Comments","sprintf"],function $module_sdk_XFBML_CommentsCount(global,require,requireDynamic,requireLazy,module,exports){





var CommentsCount=require("sdk.XFBML.Comments").extend({
constructor:function constructor(elem,ns,tag,attr){
require("sdk.DOM").addCss(elem,'fb_comments_count_zero');
attr.count=1;
this.parent(elem,ns,'comments',attr);
this.subscribe('xd.comment_count',function subscribe_$1(message){
var data=ES("JSON","parse",false,message.data);
require("sdk.DOM").html(
elem,
require("sprintf")('<span class="fb_comments_count">%s</span>',data.count));

if(data.count>0){
require("sdk.DOM").removeCss(elem,'fb_comments_count_zero');
}
require("sdk.DOM").removeCss(elem,'fb_iframe_widget');
});
}});

module.exports=CommentsCount;},null);
                                                                                                                                                                                                                                            __d("safeEval",[],function $module_safeEval(global,require,requireDynamic,requireLazy,module,exports){

function safeEval(source,args){
if(source===null||typeof source==='undefined'){
return;
}
if(typeof source!=='string'){
return source;
}


if(/^\w+$/.test(source)&&typeof window[source]==='function'){
return window[source].apply(null,args||[]);
}


return Function('return eval("'+source.replace(/\"/g,'\\"')+'");').apply(
null,
args||[]);

}

module.exports=safeEval;},null);
                                                                                                                __d("sdk.XFBML.LoginButton",["IframePlugin","Log","guid","safeEval","sdk.Auth","sdk.Dialog","sdk.ErrorHandling","sdk.feature","sdk.getContextType","sdk.Impressions","sdk.Runtime","sdk.Scribe","sdk.ui","sdk.UIServer","sdk.XD"],function $module_sdk_XFBML_LoginButton(global,require,requireDynamic,requireLazy,module,exports){


















var httpsOnlyLearnMore=require("sdk.feature")('https_only_learn_more','');









function invokeHandler(handler,scope,args){
if(handler){
if(typeof handler==='string'){
require("sdk.ErrorHandling").unguard(require("safeEval"))(handler,args);
}else if(handler.apply){
require("sdk.ErrorHandling").unguard(handler).apply(scope,args||[]);
}
}
}

function prepareCall(
params,
iframe_name,
cb)
{
params.id=require("guid")();
params.plugin_prepare=true;
params.origin=require("sdk.getContextType")();
params.domain=location.hostname;
params.fallback_redirect_uri=document.location.href;

var enableE2E=require("sdk.feature")('e2e_tracking',true);
if(enableE2E){

params.e2e={};
}


var popup_cb=function popup_cb(response){
if(call!=null){
require("sdk.XD").sendToFacebook(iframe_name,{
method:'loginComplete',
params:ES("JSON","stringify",false,{
frame_name:call.id,
status:require("sdk.Runtime").getLoginStatus()})});


}



cb(response);
};

var call=require("sdk.UIServer").prepareCall(params,popup_cb);
if(call!=null){




call.dims={};
call.dims.screenX=window.screenX;
call.dims.screenY=window.screenY;
call.dims.outerWidth=window.outerWidth;
call.dims.outerHeight=window.outerHeight;
call.dims.screenWidth=window.screen.width;
}

require("sdk.XD").sendToFacebook(iframe_name,{
method:'loginButtonStateInit',
params:ES("JSON","stringify",false,{call:call})});

}

var LoginButton=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){
if(location.protocol!=='https:'){
var httpsWarning=
'The Login Button plugin no longer works on http pages. '+
'Please update your site to use https for Facebook Login. %s';

require("Log").log('error',-1,httpsWarning,httpsOnlyLearnMore);

if(require("sdk.feature")('https_only_scribe_logging',true)){
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'HttpsOnly',
extra:{
message:'LoginButton'}});


}
}

this.parent(elem,ns,tag,attr);
var onlogin=require("IframePlugin").getVal(attr,'on_login');
var cb=null;
var iframeName=this._iframeOptions.name;
if(onlogin){
cb=function cb(response){
if(response.error_code){
require("Log").debug(
'Plugin Return Error (%s): %s',
response.error_code,
response.error_message||response.error_description);

return;
}

invokeHandler(onlogin,null,[response]);
};

this.subscribe('login.status',cb);
}

var dialog_open_cb=function dialog_open_cb(response){
invokeHandler(cb,null,[response]);
require("sdk.XD").sendToFacebook(iframeName,{
method:'loginReload',
params:ES("JSON","stringify",false,response)});

};


this.subscribe('xd.login_button_dialog_open',function subscribe_$1(msg){
require("sdk.ui")(ES("JSON","parse",false,msg.params),function ui_$1(response){

require("sdk.XD").sendToFacebook(iframeName,{
method:'loginComplete',
params:'{}'});

dialog_open_cb(response);
});
});


this.subscribe('xd.login_button_prepare_call',function subscribe_$1(msg){
var params=ES("JSON","parse",false,msg.params);
var paramsCopyForClosure=msg.params;

prepareCall(params,iframeName,dialog_open_cb);

require("sdk.Auth").subscribe('status.change',function Auth_subscribe_$1(response){

var closureParams=ES("JSON","parse",false,paramsCopyForClosure);
closureParams.logger_id=require("guid")();
if(response.status!=='connected'){
prepareCall(closureParams,iframeName,dialog_open_cb);
}
});
});


this.subscribe('xd.login_button_click',function subscribe_$1(msg){
var params=ES("JSON","parse",false,msg.params);
if(params.popup){
if(require("sdk.feature")('e2e_tracking',true)){
var dialog=require("sdk.Dialog").get(params.call.id);
dialog.subscribe('e2e:end',function dialog_subscribe_$1(events){
events.method=params.call.params.method;
events.display=params.call.params.display;
require("Log").debug('e2e: %s',ES("JSON","stringify",false,events));

require("sdk.Impressions").log(114,{
payload:events});

});
}
}else{
if(require("sdk.feature")('popup_blocker_scribe_logging',true)){
require("sdk.Scribe").log('jssdk_error',{
appId:require("sdk.Runtime").getClientID(),
error:'POPUP_MAYBE_BLOCKED_NEW',
extra:{
call:params.call.name}});


}
}
});

var refreshCb=function refreshCb(){
invokeHandler(cb,null,[
{
status:require("sdk.Runtime").getLoginStatus(),
authResponse:require("sdk.Auth").getAuthResponse()}]);


};


this.subscribe('xd.login_button_connected',refreshCb);


this.subscribe('xd.login_button_popup_closed',function subscribe_$1(){
require("sdk.Auth").getLoginStatus(refreshCb,true);
});
},

shouldIgnoreWidth:function shouldIgnoreWidth(){
return false;
},

getParams:function getParams(){
return{
scope:'string',
asset_scope:'string',
perms:'string',
size:'string',
login_text:'text',
show_faces:'bool',
max_rows:'string',
show_login_face:'bool',
show_login_numbers:'bool',
registration_url:'url_maybe',
auto_logout_link:'bool',
one_click:'bool',
show_banner:'bool',
auth_type:'string',
default_audience:'string',
use_continue_as:'bool',
layout:'string',
button_type:'string',
width:'px',
height:'px'};

}});


module.exports=LoginButton;},null);
                                                                                                        __d("UnicodeUtils",["invariant"],function $module_UnicodeUtils(global,require,requireDynamic,requireLazy,module,exports,invariant){












'use strict';





var SURROGATE_HIGH_START=0xd800;
var SURROGATE_HIGH_END=0xdbff;
var SURROGATE_LOW_START=0xdc00;
var SURROGATE_LOW_END=0xdfff;
var SURROGATE_UNITS_REGEX=/[\uD800-\uDFFF]/;





function isCodeUnitInSurrogateRange(codeUnit){
return SURROGATE_HIGH_START<=codeUnit&&codeUnit<=SURROGATE_LOW_END;
}










function isSurrogatePair(str,index){

0<=index&&index<str.length||invariant(0,
'isSurrogatePair: Invalid index %s for string length %s.',
index,
str.length);

if(index+1===str.length){
return false;
}
var first=str.charCodeAt(index);
var second=str.charCodeAt(index+1);
return(
SURROGATE_HIGH_START<=first&&
first<=SURROGATE_HIGH_END&&
SURROGATE_LOW_START<=second&&
second<=SURROGATE_LOW_END);

}





function hasSurrogateUnit(str){
return SURROGATE_UNITS_REGEX.test(str);
}



















function getUTF16Length(str,pos){
return 1+isCodeUnitInSurrogateRange(str.charCodeAt(pos));
}







function strlen(str){

if(!hasSurrogateUnit(str)){
return str.length;
}

var len=0;
for(var pos=0;pos<str.length;pos+=getUTF16Length(str,pos)){
len++;
}
return len;
}










function substr(str,start,length){
var startInternal=start||0;
var lengthInternal=length===undefined?Infinity:length||0;


if(!hasSurrogateUnit(str)){
return str.substr(startInternal,lengthInternal);
}


var size=str.length;
if(size<=0||startInternal>size||lengthInternal<=0){
return'';
}


var posA=0;
if(startInternal>0){
for(;startInternal>0&&posA<size;startInternal--){
posA+=getUTF16Length(str,posA);
}
if(posA>=size){
return'';
}
}else if(start<0){
for(posA=size;startInternal<0&&0<posA;startInternal++){
posA-=getUTF16Length(str,posA-1);
}
if(posA<0){
posA=0;
}
}


var posB=size;
if(lengthInternal<size){
for(posB=posA;lengthInternal>0&&posB<size;lengthInternal--){
posB+=getUTF16Length(str,posB);
}
}

return str.substring(posA,posB);
}










function substring(str,start,end){
var startInternal=start||0;
var endInternal=end===undefined?Infinity:end||0;

if(startInternal<0){
startInternal=0;
}
if(endInternal<0){
endInternal=0;
}

var length=Math.abs(endInternal-startInternal);
startInternal=startInternal<endInternal?startInternal:endInternal;
return substr(str,startInternal,length);
}







function getCodePoints(str){
var codePoints=[];
for(var pos=0;pos<str.length;pos+=getUTF16Length(str,pos)){
codePoints.push(str.codePointAt(pos));
}
return codePoints;
}

var UnicodeUtils={
getCodePoints:getCodePoints,
getUTF16Length:getUTF16Length,
hasSurrogateUnit:hasSurrogateUnit,
isCodeUnitInSurrogateRange:isCodeUnitInSurrogateRange,
isSurrogatePair:isSurrogatePair,
strlen:strlen,
substring:substring,
substr:substr};


module.exports=UnicodeUtils;},null);
                                                                                         __d("isNode",[],function $module_isNode(global,require,requireDynamic,requireLazy,module,exports){





function isNode(object){var _object$ownerDocument,_doc$defaultView;
var doc=
object!=null?(_object$ownerDocument=object.ownerDocument)!=null?_object$ownerDocument:object:document;
var defaultView=(_doc$defaultView=doc.defaultView)!=null?_doc$defaultView:window;
return!!(
object!=null&&(
typeof defaultView.Node==='function'?
object instanceof defaultView.Node:
typeof object==='object'&&
typeof object.nodeType==='number'&&
typeof object.nodeName==='string'));

}

module.exports=isNode;},null);
                                                                                         __d("isTextNode",["isNode"],function $module_isTextNode(global,require,requireDynamic,requireLazy,module,exports){







function isTextNode(object){
return require("isNode")(object)&&object.nodeType==3;
}

module.exports=isTextNode;},null);
                                                                                         __d("containsNode",["isTextNode"],function $module_containsNode(global,require,requireDynamic,requireLazy,module,exports){






function containsNode(outerNode,innerNode){
if(!outerNode||!innerNode){
return false;
}else if(outerNode===innerNode){
return true;
}else if(require("isTextNode")(outerNode)){
return false;
}else if(require("isTextNode")(innerNode)){
return containsNode(outerNode,innerNode.parentNode);
}else if('contains'in outerNode){
return ES(outerNode,"contains",true,innerNode);
}else if(outerNode.compareDocumentPosition){

return!!(outerNode.compareDocumentPosition(innerNode)&16);
}else{
return false;
}
}

module.exports=containsNode;},null);
                                                                                             __d("sdk.XFBML.Quote",["DOMEventListener","IframePlugin","UnicodeUtils","containsNode","sdk.DOM","sdk.feature","sdk.UA","sdk.XD"],function $module_sdk_XFBML_Quote(global,require,requireDynamic,requireLazy,module,exports){

'use strict';var c_UnicodeUtils;











var QUOTABLE_CLASS_NAME='fb-quotable';
var PLUGIN_WIDTH=155;
var PLUGIN_HEIGHT=70;




var selection='';
var singleton=null;
var quotableAreas=[];
var forceShow=false;
var xfbmlElement=null;
var isMobile=require("sdk.UA").mobile();

function getSelectionParent(selectionObject){
var range=selectionObject.getRangeAt(0);
var container=range.startContainer;

return container.nodeType===3?
container.parentNode:
container;
}

function handleSelection(ev){
if(!document.getSelection||isMobile){
return;
}
var selectionObject=document.getSelection();
if(selectionObject.rangeCount===0){
clearSelection();
return;
}
var areasLength=quotableAreas.length;
clearSelection();


if(areasLength){
var areaMatch=false;
for(var i=0;i<areasLength;i++){
if(require("containsNode")(quotableAreas[i],selectionObject.focusNode)){
areaMatch=true;
break;
}
}
if(!areaMatch){
return;
}
}

selection=selectionObject.toString();
if(selection===''){
clearSelection();
return;
}



selection=ES(selection.
toString().
replace(/\s+/g,' '),"trim",true);



var selectionLimit=Number(require("sdk.feature")('sharequotelimit',500));
if((c_UnicodeUtils||(c_UnicodeUtils=require("UnicodeUtils"))).strlen(selection)>selectionLimit){
selection=(c_UnicodeUtils||(c_UnicodeUtils=require("UnicodeUtils"))).substr(selection,0,selectionLimit-3)+'...';
}else{
selection=(c_UnicodeUtils||(c_UnicodeUtils=require("UnicodeUtils"))).substr(selection,0,selectionLimit);
}

if(!forceShow&&xfbmlElement){

getSelectionParent(selectionObject).appendChild(xfbmlElement);

var flyoutPosition=getFlyoutPosition(selectionObject);
xfbmlElement.style.left=flyoutPosition.x+'px';
xfbmlElement.style.top=flyoutPosition.y+'px';
}
}



function getFlyoutPosition(selectionObject){
var sizedPlugin=xfbmlElement&&xfbmlElement.offsetWidth;
var pluginHeight=sizedPlugin?xfbmlElement.offsetHeight:PLUGIN_HEIGHT;
var pluginWidth=sizedPlugin?xfbmlElement.offsetWidth:PLUGIN_WIDTH;
var range=selectionObject.getRangeAt(0);
var measuringStartSpan=document.createElement('span');
var measuringEndSpan=document.createElement('span');
var tmpStartRange=document.createRange();
tmpStartRange.setStart(range.startContainer,range.startOffset);
tmpStartRange.insertNode(measuringStartSpan);
var tmpEndRange=document.createRange();
tmpEndRange.setStart(range.endContainer,range.endOffset);
tmpEndRange.insertNode(measuringEndSpan);
var y=measuringStartSpan.offsetTop-pluginHeight;
var x=
measuringStartSpan.offsetLeft+
(measuringEndSpan.offsetLeft-measuringStartSpan.offsetLeft)/2-
pluginWidth/2;
measuringStartSpan.parentNode.removeChild(measuringStartSpan);
measuringEndSpan.parentNode.removeChild(measuringEndSpan);
return{x:x,y:y};
}

function clearSelection(){
selection='';
if(!forceShow&&xfbmlElement){
xfbmlElement.style.left='-9999px';
}
}

var Quote=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){var _this=this;
if(singleton){
return singleton;
}
this.parent(elem,ns,tag,attr);
forceShow=require("sdk.DOM").getAttr(elem,'layout')==='button';
xfbmlElement=elem;

xfbmlElement.style.position='absolute';
xfbmlElement.style.display='';

require("DOMEventListener").add(document,'keyup',handleSelection);
require("DOMEventListener").add(document,'mouseup',handleSelection);

this.subscribe('xd.getTextSelection',function subscribe_$1(){
require("sdk.XD").sendToFacebook(_this._iframeOptions.name,{
method:'setTextSelection',
params:ES("JSON","stringify",false,{text:selection})});

clearSelection();
});


quotableAreas=ES(ES("Array","from",false,document.getElementsByTagName('*')),"filter",true,
function filter_$0(element){return(
element.nodeName.toLowerCase()==='article'||
require("sdk.DOM").containsCss(element,QUOTABLE_CLASS_NAME));});


clearSelection();

singleton=this;
return singleton;
},

getParams:function getParams(){
return{
href:'url',
layout:'string'};

}});


module.exports=Quote;},null);
                                                                                                 __d("sdk.XFBML.Save",["IframePlugin","UrlMap","sdk.Content","sdk.createIframe","sdk.DialogUtils","sdk.DOM","sdk.Event","sdk.Runtime","sdk.UA","sdk.XD"],function $module_sdk_XFBML_Save(global,require,requireDynamic,requireLazy,module,exports){

'use strict';












var positionIntervalID;

var Save=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){var _this=this;
this.parent(elem,ns,tag,attr);
var isMobile=require("sdk.UA").mobile();

this.subscribe('xd.savePluginGetBlankIframe',function subscribe_$1(message){
var darkOverlay;
var show=function show(e){
if(e){
require("sdk.DOM").removeCss(e,'fb_invisible');
}
};
var hide=function hide(e){
if(e){
require("sdk.DOM").addCss(e,'fb_invisible');
}
};


if(isMobile){
darkOverlay=require("sdk.DialogUtils").setupNewDarkOverlay();
hide(darkOverlay);
require("sdk.Content").append(darkOverlay);
require("sdk.DialogUtils").addDoubleClickAction(
darkOverlay,
function DialogUtils_addDoubleClickAction_$1(){return ES(allNodes,"forEach",true,hide);},
5000);

}


var dialog=_this.setupNewIframeDialog(ES("JSON","parse",false,
message.data),
message.fromIframe);

hide(dialog);
require("sdk.Content").append(dialog);

var allNodes=[dialog,darkOverlay];

var hideDialog=function hideDialog(){
ES(allNodes,"forEach",true,hide);
require("sdk.DialogUtils").onDialogHideCleanup(isMobile);
window.clearInterval(positionIntervalID);
};

var idleEvent;
_this.subscribe('xd.savePluginShowIframe',function _this_subscribe_$1(){
require("sdk.Event").fire('savePlugin:hideDialog');
ES(allNodes,"forEach",true,show);
_this.positionOnScreen(dialog,darkOverlay);

if(!isMobile&&!idleEvent){
idleEvent=require("sdk.DialogUtils").addIdleDesktopAction(
dialog,
hideDialog,
7000);

}
});
_this.subscribe('xd.savePluginHideIframe',function _this_subscribe_$1(){return hideDialog();});
require("sdk.Event").subscribe('savePlugin:hideDialog',function Event_subscribe_$1(){return hideDialog();});


var searchIframeTimer=window.setInterval(function window_setInterval_$0(){
var searchIframe=document.getElementsByName(message.fromIframe);
if(searchIframe.length===0){
window.clearInterval(searchIframeTimer);
hideDialog();
ES(allNodes,"forEach",true,function allNodes_forEach_$0(elem){

elem&&elem.parentNode.removeChild(elem);
});
}
},500);
});
},

positionOnScreen:function positionOnScreen(dialog,darkOverlay){
var isMobile=require("sdk.UA").mobile();
if(isMobile){
var centerMobile=function centerMobile(dialog,darkOverlay){
if(darkOverlay!=null){
require("sdk.DialogUtils").setDialogPositionToCenter(darkOverlay,isMobile);
}
require("sdk.DialogUtils").setDialogPositionToCenter(dialog,isMobile);
};


centerMobile(dialog,darkOverlay);
require("sdk.DialogUtils").addMobileOrientationChangeAction(function DialogUtils_addMobileOrientationChangeAction_$0(e){
centerMobile(dialog,darkOverlay);
});


positionIntervalID=window.setInterval(
function window_setInterval_$0(){return centerMobile(dialog,darkOverlay);},
100);

}else{


require("sdk.DOM").setStyle(dialog,'position','fixed');
require("sdk.DOM").setStyle(dialog,'top','20px');
require("sdk.DOM").setStyle(dialog,'right','20px');
}
},

getOverlayIFrameURL:function getOverlayIFrameURL(){
return(
require("UrlMap").resolve('www')+(
require("sdk.Runtime").getIsVersioned()?'/'+require("sdk.Runtime").getVersion():'')+
'/plugins/save/overlay'+
'?app_id='+
require("sdk.Runtime").getClientID());

},

setupNewIframeDialog:function setupNewIframeDialog(data,fromIframe){var _this2=this;
var created=require("sdk.DialogUtils").setupNewDialog();

var onloadFunc=function onloadFunc(){
require("sdk.XD").sendToFacebook(fromIframe,{
method:'saveOverlayIFrameAck',
params:ES("JSON","stringify",false,{
name:'overlay_'+_this2._iframeOptions.name})});


};


require("sdk.createIframe")({
url:this.getOverlayIFrameURL(),
name:'overlay_'+this._iframeOptions.name,
root:created.contentRoot,
tabindex:-1,
onload:ES(onloadFunc,"bind",true,this)});

require("sdk.DOM").addCss(created.contentRoot,'fb_dialog_iframe');


ES("Object","assign",false,created.dialogElement.style,data.style||{});
require("sdk.DOM").setStyle(created.dialogElement,'width',data.width+'px');
require("sdk.DOM").setStyle(created.dialogElement,'height',data.height+'px');
ES(data.classList,"forEach",true,function data_classList_forEach_$0(cl){return require("sdk.DOM").addCss(created.dialogElement,cl);});

require("sdk.DOM").removeCss(created.dialogElement,'fb_dialog_advanced');
return created.dialogElement;
},

getParams:function getParams(){
return{
uri:'url',
url_category:'string',
size:'string'};

}});


module.exports=Save;},null);
                                                                                                 __d("sdk.XFBML.ShareButton",["IframePlugin"],function $module_sdk_XFBML_ShareButton(global,require,requireDynamic,requireLazy,module,exports){

'use strict';



var ShareButton=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){
this.parent(elem,ns,tag,attr);
},

getParams:function getParams(){
return{
href:'url',
layout:'string',
mobile_iframe:'bool',
type:'string',
size:'string'};

}});


module.exports=ShareButton;},null);
                                                                                                 __d("sdk.XFBML.Video",["Assert","IframePlugin","ObservableMixin","sdk.Event","sdk.XD"],function $module_sdk_XFBML_Video(global,require,requireDynamic,requireLazy,module,exports){var


























VideoCache=function(){"use strict";





function VideoCache(initData){
this.$VideoCache_isMuted=initData.isMuted;
this.$VideoCache_volume=initData.volume;
this.$VideoCache_timePosition=initData.timePosition;
this.$VideoCache_duration=initData.duration;
}var _proto=VideoCache.prototype;_proto.

update=function update(data){
if(data.isMuted!==undefined){
this.$VideoCache_isMuted=data.isMuted;
}
if(data.volume!==undefined){
this.$VideoCache_volume=data.volume;
}
if(data.timePosition!==undefined){
this.$VideoCache_timePosition=data.timePosition;
}
if(data.duration!==undefined){
this.$VideoCache_duration=data.duration;
}
};_proto.

isMuted=function isMuted(){
return this.$VideoCache_isMuted;
};_proto.

getVolume=function getVolume(){
return this.$VideoCache_isMuted?0:this.$VideoCache_volume;
};_proto.

getCurrentPosition=function getCurrentPosition(){
return this.$VideoCache_timePosition;
};_proto.

getDuration=function getDuration(){
return this.$VideoCache_duration;
};return VideoCache;}();var


VideoController=function(){"use strict";




function VideoController(
iframeName,
observableMixin,
cache)
{
this.$VideoController_iframeName=iframeName;
this.$VideoController_sharedObservable=observableMixin;
this.$VideoController_cache=cache;
}var _proto2=VideoController.prototype;_proto2.

play=function play(){
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'play',
params:ES("JSON","stringify",false,{})});

};_proto2.

pause=function pause(){
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'pause',
params:ES("JSON","stringify",false,{})});

};_proto2.


seek=function seek(target){
require("Assert").isNumber(target,'Invalid argument');
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'seek',
params:ES("JSON","stringify",false,{
target:target})});


};_proto2.

mute=function mute(){
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'mute',
params:ES("JSON","stringify",false,{})});

};_proto2.

unmute=function unmute(){
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'unmute',
params:ES("JSON","stringify",false,{})});

};_proto2.


setVolume=function setVolume(volume){
require("Assert").isNumber(volume,'Invalid argument');
require("sdk.XD").sendToFacebook(this.$VideoController_iframeName,{
method:'setVolume',
params:ES("JSON","stringify",false,{
volume:volume})});


};_proto2.

isMuted=function isMuted(){
return this.$VideoController_cache.isMuted();
};_proto2.

getVolume=function getVolume(){
return this.$VideoController_cache.getVolume();
};_proto2.

getCurrentPosition=function getCurrentPosition(){
return this.$VideoController_cache.getCurrentPosition();
};_proto2.

getDuration=function getDuration(){
return this.$VideoController_cache.getDuration();
};_proto2.

subscribe=function subscribe(event,callback){var _this=this;
require("Assert").isString(event,'Invalid argument');
require("Assert").isFunction(callback,'Invalid argument');
this.$VideoController_sharedObservable.subscribe(event,callback);
return{
release:function release(){
_this.$VideoController_sharedObservable.unsubscribe(event,callback);
}};

};return VideoController;}();


var Video=require("IframePlugin").extend({
constructor:function constructor(elem,ns,tag,attr){
this.parent(elem,ns,tag,attr);
this._videoController=null;
this._sharedObservable=null;
this._sharedVideoCache=null;
this.subscribe('xd.onVideoAPIReady',function subscribe_$1(msg){
this._sharedObservable=new(require("ObservableMixin"))();
this._sharedVideoCache=new VideoCache(ES("JSON","parse",false,msg.data));
this._videoController=new VideoController(
this._iframeOptions.name,
this._sharedObservable,
this._sharedVideoCache);

require("sdk.Event").fire('xfbml.ready',{
type:'video',
id:attr.id,
instance:this._videoController});

});
this.subscribe('xd.stateChange',function subscribe_$1(msg){
this._sharedObservable.inform(msg.state);
});
this.subscribe('xd.cachedStateUpdateRequest',function subscribe_$1(msg){
this._sharedVideoCache.update(ES("JSON","parse",false,msg.data));
});
},

getParams:function getParams(){
return{
allowfullscreen:'bool',
autoplay:'bool',
controls:'bool',
href:'url',
show_captions:'bool',
show_text:'bool'};

},

getConfig:function getConfig(){
return{
fluid:true,
full_width:true};

}});


module.exports=Video;},null);
                                                                                                                                                 __d("legacy:fb.xfbml.plugins",["IframePlugin","PluginConfig","PluginTags","XFBML","sdk.feature","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.LoginButton","sdk.XFBML.Quote","sdk.XFBML.Save","sdk.XFBML.ShareButton","sdk.XFBML.Video"],function $module_legacy_fb_xfbml_plugins(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports){








var customTags={
comments:require('sdk.XFBML.Comments'),
comments_count:require('sdk.XFBML.CommentsCount'),
login_button:require('sdk.XFBML.LoginButton'),
quote:require('sdk.XFBML.Quote'),
save:require('sdk.XFBML.Save'),
share_button:require('sdk.XFBML.ShareButton'),
video:require('sdk.XFBML.Video')};


var blacklist=require("sdk.feature")('plugin_tags_blacklist',[]);


ES(ES("Object","keys",false,require("PluginTags")),"forEach",true,function forEach_$0(tag){
if(ES(blacklist,"indexOf",true,tag)!==-1){
return;
}
require("XFBML").registerTag({
xmlns:'fb',
localName:tag.replace(/_/g,'-'),
ctor:require("IframePlugin").withParams(require("PluginTags")[tag],require("PluginConfig")[tag])});

});


ES(ES("Object","keys",false,customTags),"forEach",true,function forEach_$0(tag){
if(ES(blacklist,"indexOf",true,tag)!==-1){
return;
}
require("XFBML").registerTag({
xmlns:'fb',
localName:tag.replace(/_/g,'-'),
ctor:customTags[tag]});

});},3);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"1002005402","namespace":"FB","message":"'+e.message+'"}}');}