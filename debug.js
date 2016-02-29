/*1456775350,,JIT Construction: v2205490,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 1;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    with (this) {      /** Path: html/js/downstream/polyfill/GenericFunctionVisitor.js */
/**
 * @generated SignedSource<<c08ae7cb38fd761137a759ab955d052d>>
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

var createMeta=function(type,signature){
if(!type&&!signature){
return null;}


var meta={};
if(typeof type!=='undefined'){
meta.type=type;}


if(typeof signature!=='undefined'){
meta.signature=signature;}


return meta;};


var getMeta=function(name,params){
return createMeta(
name&&/^[A-Z]/.test(name)?name:undefined,
params&&(params.params&&params.params.length||params.returns)?
'function('+(
params.params?params.params.map(function(param){
return (/\?/.test(param)?
'?'+param.replace('?',''):
param);}).
join(','):'')+
')'+(
params.returns?':'+params.returns:''):
undefined);};



var noopAnnotator=function(fn,funcMeta,params){
return fn;};


var genericAnnotator=function(fn,funcMeta,params){
if('sourcemeta' in __transform_includes){
fn.__SMmeta=funcMeta;}


if('typechecks' in __transform_includes){
var meta=getMeta(funcMeta?funcMeta.name:undefined,params);
if(meta){
__w(fn,meta);}}


return fn;};


var noopBodyWrapper=function(scope,args,fn){
return fn.apply(scope,args);};


var typecheckBodyWrapper=function(scope,args,fn,params){
if(params&&params.params){
__t.apply(scope,params.params);}


var result=fn.apply(scope,args);

if(params&&params.returns){
__t([result,params.returns]);}


return result;};


var codeUsageBodyWrapper=function(scope,args,fn,params,funcMeta){
if(funcMeta){
if(!funcMeta.callId){


funcMeta.callId=funcMeta.module+':'+(
funcMeta.line||0)+':'+(
funcMeta.column||0);}

var key=funcMeta.callId;
funcCalls[key]=(funcCalls[key]||0)+1;}

return fn.apply(scope,args);};



if(typeof __transform_includes==='undefined'){
__annotator=noopAnnotator;
__bodyWrapper=noopBodyWrapper;}else 
{
__annotator=genericAnnotator;

if('codeusage' in __transform_includes){
__annotator=noopAnnotator;
__bodyWrapper=codeUsageBodyWrapper;
__bodyWrapper.getCodeUsage=function(){return funcCalls;};
__bodyWrapper.clearCodeUsage=function(){funcCalls={};};}else 
if('typechecks' in __transform_includes){
__bodyWrapper=typecheckBodyWrapper;}else 
{
__bodyWrapper=noopBodyWrapper;}}})();
/** Path: html/js/downstream/polyfill/TypeChecker.js */
__t = function(x) {return x[0];};__w = function(x) {return x;};
/** Path: html/js/downstream/require/require-lite.js */
/**
 * @generated SignedSource<<c96a4931770595939d7f79714b4bfabb>>
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
 */

var require,__d;
(function(global){
var map={},resolved={};
var defaultDeps=
['global','require','requireDynamic','requireLazy','module','exports'];

require=function(id,soft){
if(resolved.hasOwnProperty(id)){
return resolved[id];}

if(!map.hasOwnProperty(id)){
if(soft){
return null;}

throw new Error('Module '+id+' has not been defined');}

var module=map[id],
deps=module.deps,
length=module.factory.length,
dep,
args=[];

for(var i=0;i<length;i++){
switch(deps[i]){
case 'module':dep=module;break;
case 'exports':dep=module.exports;break;
case 'global':dep=global;break;
case 'require':dep=require;break;
case 'requireDynamic':dep=null;break;
case 'requireLazy':dep=null;break;
default:dep=require.call(null,deps[i]);}

args.push(dep);}

module.factory.apply(global,args);
resolved[id]=module.exports;
return module.exports;};




require.__markCompiled=function(){};

__d=function(id,deps,factory,
_special){
if(typeof factory=='function'){
map[id]={
factory:factory,
deps:defaultDeps.concat(deps),
exports:{}};



if(_special===3){
require.call(null,id);}}else 

{
resolved[id]=factory;}};})(


this);
/** Path: html/js/sdk/ES5Array.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Array
 */__d('ES5Array',[],function $module_ES5Array(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5Array={};

ES5Array.isArray=function(object){
return Object.prototype.toString.call(object)=='[object Array]';};


module.exports=ES5Array;},null);
/** Path: html/js/sdk/ES5ArrayPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5ArrayPrototype
 */__d('ES5ArrayPrototype',[],function $module_ES5ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5ArrayPrototype={};




ES5ArrayPrototype.map=function(func,context){
if(typeof func!='function'){
throw new TypeError();}


var ii;
var len=this.length;
var r=new Array(len);
for(ii=0;ii<len;++ii){
if(ii in this){
r[ii]=func.call(context,this[ii],ii,this);}}



return r;};





ES5ArrayPrototype.forEach=function(func,context){
ES5ArrayPrototype.map.call(this,func,context);};





ES5ArrayPrototype.filter=function(func,context){
if(typeof func!='function'){
throw new TypeError();}


var ii,val,len=this.length,r=[];
for(ii=0;ii<len;++ii){
if(ii in this){

val=this[ii];
if(func.call(context,val,ii,this)){
r.push(val);}}}




return r;};





ES5ArrayPrototype.every=function(func,context){
if(typeof func!='function'){
throw new TypeError();}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii<len;ii++){
if(ii in t){
if(!func.call(context,t[ii],ii,t)){
return false;}}}



return true;};





ES5ArrayPrototype.some=function(func,context){
if(typeof func!='function'){
throw new TypeError();}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii<len;ii++){
if(ii in t){
if(func.call(context,t[ii],ii,t)){
return true;}}}



return false;};





ES5ArrayPrototype.indexOf=function(val,index){
var len=this.length;
index|=0;

if(index<0){
index+=len;}


for(;index<len;index++){
if(index in this&&this[index]===val){
return index;}}


return -1;};


module.exports=ES5ArrayPrototype;},null);
/** Path: html/js/sdk/ES5Date.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Date
 */__d("ES5Date",[],function $module_ES5Date(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5Date={};
ES5Date.now=function(){
return new Date().getTime();};


module.exports=ES5Date;},null);
/** Path: html/js/sdk/ES5FunctionPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5FunctionPrototype
 */__d('ES5FunctionPrototype',[],function $module_ES5FunctionPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5FunctionPrototype={};









ES5FunctionPrototype.bind=function(context){
if(typeof this!='function'){
throw new TypeError('Bind must be called on a function');}

var target=this;
var appliedArguments=Array.prototype.slice.call(arguments,1);
function bound(){
return target.apply(
context,
appliedArguments.concat(Array.prototype.slice.call(arguments)));}

bound.displayName='bound:'+(target.displayName||target.name||'(?)');
bound.toString=function toString(){
return 'bound: '+target;};

return bound;};


module.exports=ES5FunctionPrototype;},null);
/** Path: html/js/ie8DontEnum.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ie8DontEnum
 */__d('ie8DontEnum',[],function $module_ie8DontEnum(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();



var dontEnumProperties=[
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'prototypeIsEnumerable',
'constructor'];


var hasOwnProperty={}.hasOwnProperty;





var ie8DontEnum=function(){};

if({toString:true}.propertyIsEnumerable('toString')){
ie8DontEnum=function(object,onProp){
for(var i=0;i<dontEnumProperties.length;i++){
var property=dontEnumProperties[i];
if(hasOwnProperty.call(object,property)){
onProp(property);}}};}





module.exports=ie8DontEnum;},null);
/** Path: html/js/sdk/ES5Object.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Object
 */__d('ES5Object',['ie8DontEnum'],function $module_ES5Object(global,require,requireDynamic,requireLazy,module,exports,ie8DontEnum){if(require.__markCompiled)require.__markCompiled();


var hasOwnProperty={}.hasOwnProperty;

var ES5Object={};



function F(){}






ES5Object.create=function(proto){
if(__DEV__){
if(arguments.length>1){
throw new Error(
'Object.create implementation supports only the first parameter');}}


var type=typeof proto;
if(type!='object'&&type!='function'){
throw new TypeError('Object prototype may only be a Object or null');}

F.prototype=proto;
return new F();};







ES5Object.keys=function(object){
var type=typeof object;
if(type!='object'&&type!='function'||object===null){
throw new TypeError('Object.keys called on non-object');}


var keys=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
keys.push(key);}}




ie8DontEnum(object,function(prop){return keys.push(prop);});

return keys;};


module.exports=ES5Object;},null);
/** Path: html/js/sdk/ES5StringPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5StringPrototype
 */__d('ES5StringPrototype',[],function $module_ES5StringPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5StringPrototype={};






ES5StringPrototype.trim=function(){
if(this==null){
throw new TypeError('String.prototype.trim called on null or undefined');}

return String.prototype.replace.call(this,/^\s+|\s+$/g,'');};


ES5StringPrototype.startsWith=function(search){
var string=String(this);
if(this==null){
throw new TypeError(
'String.prototype.startsWith called on null or undefined');}

var pos=arguments.length>1?Number(arguments[1]):0;
if(isNaN(pos)){
pos=0;}

var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)==start;};


ES5StringPrototype.endsWith=function(search){
var string=String(this);
if(this==null){
throw new TypeError(
'String.prototype.endsWith called on null or undefined');}

var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?Number(arguments[1]):stringLength;
if(isNaN(pos)){
pos=0;}

var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;}

return string.lastIndexOf(searchString,start)==start;};


ES5StringPrototype.contains=function(search){
if(this==null){
throw new TypeError(
'String.prototype.contains called on null or undefined');}

var string=String(this);
var pos=arguments.length>1?Number(arguments[1]):0;
if(isNaN(pos)){
pos=0;}

return string.indexOf(String(search),pos)!=-1;};


ES5StringPrototype.repeat=function(count){
if(this==null){
throw new TypeError(
'String.prototype.repeat called on null or undefined');}

var string=String(this);
var n=count?Number(count):0;
if(isNaN(n)){
n=0;}

if(n<0||n===Infinity){
throw RangeError();}

if(n===1){
return string;}

if(n===0){
return '';}

var result='';
while(n){
if(n&1){
result+=string;}

if(n>>=1){
string+=string;}}


return result;};


module.exports=ES5StringPrototype;},null);
/** Path: html/js/sdk/ES6Array.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6Array
 */__d('ES6Array',[],function $module_ES6Array(global,require,requireDynamic,requireLazy,module,exports){

'use strict';if(require.__markCompiled)require.__markCompiled();

var ES6Array={

from:function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;
key+=1;}


ret.length=key;
return ret;}


var len=items.length;
if(isNaN(len)||len<0){
len=0;}


ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;

key+=1;}


ret.length=key;
return ret;}};




module.exports=ES6Array;},null);
/** Path: html/js/sdk/ES6ArrayPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6ArrayPrototype
 */__d('ES6ArrayPrototype',[],function $module_ES6ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();




var ES6ArrayPrototype={




find:function(predicate,thisArg){
if(this==null){
throw new TypeError('Array.prototype.find called on null or undefined');}

if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}


var index=ES6ArrayPrototype.findIndex.call(this,predicate,thisArg);
return index===-1?void 0:this[index];},






findIndex:function(predicate,thisArg){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(thisArg,list[i],i,list)){
return i;}}


return -1;},






fill:function(value){
if(this==null){
throw new TypeError('Array.prototype.fill called on null or undefined');}

var O=Object(this);
var len=O.length>>>0;
var start=arguments[1];
var relativeStart=start>>0;
var k=relativeStart<0?
Math.max(len+relativeStart,0):
Math.min(relativeStart,len);
var end=arguments[2];
var relativeEnd=end===undefined?
len:
end>>0;
var final=relativeEnd<0?
Math.max(len+relativeEnd,0):
Math.min(relativeEnd,len);
while(k<final){
O[k]=value;
k++;}

return O;}};



module.exports=ES6ArrayPrototype;},null);
/** Path: html/js/sdk/ES6DatePrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6DatePrototype
 */__d('ES6DatePrototype',[],function $module_ES6DatePrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function pad(number){
return (number<10?'0':'')+number;}


var ES6DatePrototype={



toISOString:function(){
if(!isFinite(this)){
throw new Error('Invalid time value');}

var year=this.getUTCFullYear();
year=(year<0?'-':year>9999?'+':'')+
('00000'+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6);
return year+
'-'+pad(this.getUTCMonth()+1)+
'-'+pad(this.getUTCDate())+
'T'+pad(this.getUTCHours())+
':'+pad(this.getUTCMinutes())+
':'+pad(this.getUTCSeconds())+
'.'+(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+
'Z';}};



module.exports=ES6DatePrototype;},null);
/** Path: html/js/sdk/ES6Number.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6Number
 */__d('ES6Number',[],function $module_ES6Number(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var EPSILON=Math.pow(2,-52);
var MAX_SAFE_INTEGER=Math.pow(2,53)-1;
var MIN_SAFE_INTEGER=-1*MAX_SAFE_INTEGER;

var ES6Number={
isFinite:function(value){
return typeof value=='number'&&isFinite(value);},


isNaN:function(value){
return typeof value=='number'&&isNaN(value);},


isInteger:function(value){
return this.isFinite(value)&&
Math.floor(value)===value;},


isSafeInteger:function(value){
return this.isFinite(value)&&
value>=this.MIN_SAFE_INTEGER&&
value<=this.MAX_SAFE_INTEGER&&
Math.floor(value)===value;},


EPSILON:EPSILON,
MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,
MIN_SAFE_INTEGER:MIN_SAFE_INTEGER};


module.exports=ES6Number;},null);
/** Path: html/js/sdk/ES6Object.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6Object
 */__d('ES6Object',['ie8DontEnum'],function $module_ES6Object(global,require,requireDynamic,requireLazy,module,exports,ie8DontEnum){if(require.__markCompiled)require.__markCompiled();


var hasOwnProperty={}.hasOwnProperty;

var ES6Object={





assign:function(target){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}


target=Object(target);for(var _len=arguments.length,sources=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){sources[_key-1]=arguments[_key];}

for(var i=0;i<sources.length;i++){
var source=sources[i];

if(source==null){
continue;}


source=Object(source);

for(var prop in source){
if(hasOwnProperty.call(source,prop)){
target[prop]=source[prop];}}




ie8DontEnum(source,function(prop){return target[prop]=source[prop];});}


return target;},







is:function(x,y){
if(x===y){

return x!==0||1/x===1/y;}else 
{

return x!==x&&y!==y;}}};




module.exports=ES6Object;},null);
/** Path: html/js/sdk/ES7Object.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES7Object
 */__d('ES7Object',['ie8DontEnum'],function $module_ES7Object(global,require,requireDynamic,requireLazy,module,exports,ie8DontEnum){if(require.__markCompiled)require.__markCompiled();


var hasOwnProperty={}.hasOwnProperty;

var ES7Object={};






ES7Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');}


var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);}}




ie8DontEnum(object,function(prop){return entries.push([prop,object[prop]]);});

return entries;};







ES7Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');}


var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);}}




ie8DontEnum(object,function(prop){return values.push(object[prop]);});

return values;};


module.exports=ES7Object;},null);
/** Path: html/js/sdk/ES7StringPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES7StringPrototype
 */__d('ES7StringPrototype',[],function $module_ES7StringPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES7StringPrototype={};

ES7StringPrototype.trimLeft=function(){
return this.replace(/^\s+/,'');};


ES7StringPrototype.trimRight=function(){
return this.replace(/\s+$/,'');};


module.exports=ES7StringPrototype;},null);
/** Path: html/js/third_party/json3/json3.js */
/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */
__d("JSON3",[],function $module_JSON3(global,require,requireDynamic,requireLazy,module,exports){require.__markCompiled && require.__markCompiled();
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

/* 2KL294koxM_ */},null);
/** Path: html/js/sdk/ES.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES
 *
 * scripts/jssdk/default.spatch converts ES5/ES6 code into using this module in
 * ES3 style.
 */__d('ES',['ES5ArrayPrototype','ES5FunctionPrototype','ES5StringPrototype','ES5Array','ES5Object','ES5Date','JSON3','ES6Array','ES6Object','ES6ArrayPrototype','ES6DatePrototype','ES6Number','ES7StringPrototype','ES7Object'],function $module_ES(global,require,requireDynamic,requireLazy,module,exports,ES5ArrayPrototype,ES5FunctionPrototype,ES5StringPrototype,ES5Array,ES5Object,ES5Date,JSON3,ES6Array,ES6Object,ES6ArrayPrototype,ES6DatePrototype,ES6Number,ES7StringPrototype,ES7Object){if(require.__markCompiled)require.__markCompiled();
















var toString={}.toString;

var methodCache={


'JSON.stringify':JSON3.stringify,
'JSON.parse':JSON3.parse};


var es5Polyfills={
'Array.prototype':ES5ArrayPrototype,
'Function.prototype':ES5FunctionPrototype,
'String.prototype':ES5StringPrototype,
'Object':ES5Object,
'Array':ES5Array,
'Date':ES5Date};


var es6Polyfills={
'Object':ES6Object,
'Array.prototype':ES6ArrayPrototype,
'Date.prototype':ES6DatePrototype,
'Number':ES6Number,
'Array':ES6Array};


var es7Polyfills={
'Object':ES7Object,
'String.prototype':ES7StringPrototype};


function setupMethodsCache(polyfills){


for(var pName in polyfills){
if(!polyfills.hasOwnProperty(pName)){continue;}
var polyfillObject=polyfills[pName];


var accessor=pName.split('.');
var nativeObject=accessor.length==2?
window[accessor[0]][accessor[1]]:
window[pName];


for(var prop in polyfillObject){
if(!polyfillObject.hasOwnProperty(prop)){continue;}


if(typeof polyfillObject[prop]!=='function'){
methodCache[pName+'.'+prop]=polyfillObject[prop];
continue;}


var nativeFunction=nativeObject[prop];


methodCache[pName+'.'+prop]=
nativeFunction&&/\{\s+\[native code\]\s\}/.test(nativeFunction)?
nativeFunction:
polyfillObject[prop];}}}





setupMethodsCache(es5Polyfills);
setupMethodsCache(es6Polyfills);
setupMethodsCache(es7Polyfills);

function ES(lhs,rhs,proto){

var type=proto?
toString.call(lhs).slice(8,-1)+'.prototype':
lhs;


var propValue=methodCache[type+'.'+rhs]||lhs[rhs];


if(typeof propValue==='function'){for(var _len=arguments.length,args=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}
return propValue.apply(lhs,args);}else 
if(propValue){

return propValue;}


throw new Error('Polyfill '+type+' does not have implementation of '+rhs);}


module.exports=ES;},null);
/** Path: html/js/sdk/sdk.babelHelpers.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule sdk.babelHelpers
 */__d('sdk.babelHelpers',['ES5FunctionPrototype','ES5Object','ES6Object'],function $module_sdk_babelHelpers(global,require,requireDynamic,requireLazy,module,exports,ES5FunctionPrototype,ES5Object,ES6Object){if(require.__markCompiled)require.__markCompiled();











var babelHelpers={};
var hasOwn=Object.prototype.hasOwnProperty;




babelHelpers.inherits=function(subClass,superClass){
ES6Object.assign(subClass,superClass);
subClass.prototype=ES5Object.create(superClass&&superClass.prototype);
subClass.prototype.constructor=subClass;
subClass.__superConstructor__=superClass;
return superClass;};





babelHelpers._extends=ES6Object.assign;




babelHelpers['extends']=babelHelpers._extends;




babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};
for(var i in obj){
if(!hasOwn.call(obj,i)||keys.indexOf(i)>=0){
continue;}

target[i]=obj[i];}

return target;};





babelHelpers.taggedTemplateLiteralLoose=function(strings,raw){
strings.raw=raw;
return strings;};





babelHelpers.bind=ES5FunctionPrototype.bind;

module.exports=babelHelpers;},null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","fbcdn_http":"fbstatic-a.akamaihd.net","fbcdn_https":"fbstatic-a.akamaihd.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"2205490"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":false,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPurchase","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/OfbFbeFREb6.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_close_icon:active{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_loader{background-color:#f6f7f8;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3a5795;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #2f477a;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f8;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466],"sampleRate":500});__d("JSSDKPluginPipeConfig",[],{"threshold":0,"enabledApps":{"209753825810663":1,"187288694643718":1}});      
__d("DOMWrapper",[],function $module_DOMWrapper(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var rootElement,
windowRef;



var DOMWrapper={
setRoot:function(root){
rootElement = root;},

getRoot:function(){
return rootElement || document.body;},

setWindow:function(win){
windowRef = win;},

getWindow:function(){
return windowRef || self;}};



module.exports = DOMWrapper;},null);

__d('dotAccess',[],function $module_dotAccess(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function dotAccess(head,path,create){
var stack=path.split('.');
do {
var key=stack.shift();
head = head[key] || create && (head[key] = {});}while(
stack.length && head);
return head;}


module.exports = dotAccess;},null);

__d('guid',[],function $module_guid(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();



function guid(){
return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.','');}


module.exports = guid;},null);

__d('wrapFunction',[],function $module_wrapFunction(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var wrappers={};
function wrapFunction(fn,type,source)
{
type = type || 'default';

return function(){
var callee=type in wrappers?
wrappers[type](fn,source):
fn;

return callee.apply(this,arguments);};}



wrapFunction.setWrapper = function(fn,type){
type = type || 'default';
wrappers[type] = fn;};


module.exports = wrapFunction;},null);

__d('GlobalCallback',['DOMWrapper','dotAccess','guid','wrapFunction'],function $module_GlobalCallback(global,require,requireDynamic,requireLazy,module,exports,DOMWrapper,dotAccess,guid,wrapFunction){if(require.__markCompiled)require.__markCompiled();








var rootObject;
var callbackPrefix;

var GlobalCallback={

setPrefix:function(prefix){
rootObject = dotAccess(DOMWrapper.getWindow(),prefix,true);
callbackPrefix = prefix;},


create:function(fn,description){
if(!rootObject){


this.setPrefix('__globalCallbacks');}

var id=guid();
rootObject[id] = wrapFunction(fn,'entry',description || 'GlobalCallback');

return callbackPrefix + '.' + id;},


remove:function(name){
var id=name.substring(callbackPrefix.length + 1);
delete rootObject[id];}};




module.exports = GlobalCallback;},null);

__d("sprintf",[],function $module_sprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function sprintf(format){for(var _len=arguments.length,args=Array(_len > 1?_len - 1:0),_key=1;_key < _len;_key++) {args[_key - 1] = arguments[_key];}
var index=0;
return format.replace(/%s/g,function(match){return args[index++];});}


module.exports = sprintf;},null);

__d('Log',['sprintf'],function $module_Log(global,require,requireDynamic,requireLazy,module,exports,sprintf){if(require.__markCompiled)require.__markCompiled();



var Level={
DEBUG:3,
INFO:2,
WARNING:1,
ERROR:0};


function log(name,level){
var args=Array.prototype.slice.call(arguments,2);
var msg=sprintf.apply(null,args);
var console=window.console;
if(console && Log.level >= level){
console[name in console?name:'log'](msg);}}



var Log={



level:__DEV__?3:-1,






Level:Level,








debug:ES(log,'bind',true,null,'debug',Level.DEBUG),
info:ES(log,'bind',true,null,'info',Level.INFO),
warn:ES(log,'bind',true,null,'warn',Level.WARNING),
error:ES(log,'bind',true,null,'error',Level.ERROR)};

module.exports = Log;},null);

__d("ObservableMixin",[],function $module_ObservableMixin(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function ObservableMixin(){
this.__observableEvents = {};}


ObservableMixin.prototype = {










inform:function(what){

var args=Array.prototype.slice.call(arguments,1);
var list=Array.prototype.slice.call(this.getSubscribers(what));
for(var i=0;i < list.length;i++) {
if(list[i] === null)continue;
if(__DEV__){
list[i].apply(this,args);}else 
{
try{
list[i].apply(this,args);}
catch(e) {


setTimeout(function(){throw e;},0);}}}



return this;},








getSubscribers:function(toWhat){

return this.__observableEvents[toWhat] || (
this.__observableEvents[toWhat] = []);},







clearSubscribers:function(toWhat){

if(toWhat){
this.__observableEvents[toWhat] = [];}

return this;},






clearAllSubscribers:function(){
this.__observableEvents = {};
return this;},









subscribe:function(toWhat,withWhat){

var list=this.getSubscribers(toWhat);
list.push(withWhat);
return this;},









unsubscribe:function(toWhat,withWhat){

var list=this.getSubscribers(toWhat);
for(var i=0;i < list.length;i++) {
if(list[i] === withWhat){
list.splice(i,1);
break;}}


return this;},










monitor:function(toWhat,withWhat){
if(!withWhat()){
var monitor=ES(function(value){
if(withWhat.apply(withWhat,arguments)){
this.unsubscribe(toWhat,monitor);}},"bind",true,

this);
this.subscribe(toWhat,monitor);}

return this;}};





module.exports = ObservableMixin;},null);

__d('UrlMap',['UrlMapConfig'],function $module_UrlMap(global,require,requireDynamic,requireLazy,module,exports,UrlMapConfig){if(require.__markCompiled)require.__markCompiled();



var UrlMap={








resolve:function(key,https){
var protocol=typeof https == 'undefined'?
location.protocol.replace(':',''):
https?'https':'http';


if(key in UrlMapConfig){
return protocol + '://' + UrlMapConfig[key];}



if(typeof https == 'undefined' && key + '_' + protocol in UrlMapConfig){
return protocol + '://' + UrlMapConfig[key + '_' + protocol];}



if(https !== true && key + '_http' in UrlMapConfig){
return 'http://' + UrlMapConfig[key + '_http'];}



if(https !== false && key + '_https' in UrlMapConfig){
return 'https://' + UrlMapConfig[key + '_https'];}}};




module.exports = UrlMap;},null);

__d('QueryString',[],function $module_QueryString(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();






function encode(bag){
var pairs=[];
ES(ES('Object','keys',false,bag).sort(),'forEach',true,function(key){
var value=bag[key];

if(typeof value === 'undefined'){
return;}


if(value === null){
pairs.push(key);
return;}


pairs.push(encodeURIComponent(key) + 
'=' + 
encodeURIComponent(value));});

return pairs.join('&');}





function decode(str,strict){
var data={};
if(str === ''){
return data;}


var pairs=str.split('&');
for(var i=0;i < pairs.length;i++) {
var pair=pairs[i].split('=',2);
var key=decodeURIComponent(pair[0]);
if(strict && data.hasOwnProperty(key)){
throw new URIError('Duplicate key: ' + key);}

data[key] = pair.length === 2?
decodeURIComponent(pair[1]):
null;}

return data;}







function appendToUrl(url,params){
return url + (
ES(url,'indexOf',true,'?') !== -1?'&':'?') + (
typeof params === 'string'?
params:
QueryString.encode(params));}


var QueryString={
encode:encode,
decode:decode,
appendToUrl:appendToUrl};


module.exports = QueryString;},null);

__d("ManagedError",[],function $module_ManagedError(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function ManagedError(message,innerError){
Error.prototype.constructor.call(this,message);
this.message = message;
this.innerError = innerError;}

ManagedError.prototype = new Error();
ManagedError.prototype.constructor = ManagedError;

module.exports = ManagedError;},null);

__d('AssertionError',['ManagedError'],function $module_AssertionError(global,require,requireDynamic,requireLazy,module,exports,ManagedError){if(require.__markCompiled)require.__markCompiled();



function AssertionError(message){
ManagedError.prototype.constructor.apply(this,arguments);}

AssertionError.prototype = new ManagedError();
AssertionError.prototype.constructor = AssertionError;

module.exports = AssertionError;},null);

__d('Assert',['AssertionError','sprintf'],function $module_Assert(global,require,requireDynamic,requireLazy,module,exports,AssertionError,sprintf){if(require.__markCompiled)require.__markCompiled();













function assert(expression,message){
if(typeof expression !== 'boolean' || !expression){
throw new AssertionError(message);}

return expression;}











function assertType(type,expression,message){
var actualType;

if(expression === undefined){
actualType = 'undefined';}else 
if(expression === null){
actualType = 'null';}else 
{
var className=Object.prototype.toString.call(expression);
actualType = /\s(\w*)/.exec(className)[1].toLowerCase();}


assert(
ES(type,'indexOf',true,actualType) !== -1,
message || sprintf('Expression is of type %s, not %s',actualType,type));

return expression;}











function assertInstanceOf(type,expression,message){
assert(
expression instanceof type,
message || 'Expression not instance of type');

return expression;}


function define(type,test){
Assert['is' + type] = test;
Assert['maybe' + type] = function(expression,message){

if(expression != null){
test(expression,message);}};}




var Assert={
isInstanceOf:assertInstanceOf,
isTrue:assert,
isTruthy:function(expression,message){
return assert(!!expression,message);},

type:assertType,
define:function(type,fn){
type = type.substring(0,1).toUpperCase() + 
type.substring(1).toLowerCase();

define(type,function(expression,message){
assert(fn(expression),message);});}};





ES(['Array',
'Boolean',
'Date',
'Function',
'Null',
'Number',
'Object',
'Regexp',
'String',
'Undefined'],'forEach',true,function(type){
define(type,ES(assertType,'bind',true,null,type.toLowerCase()));});


module.exports = Assert;},null);

__d('Type',['Assert'],function $module_Type(global,require,requireDynamic,requireLazy,module,exports,Assert){if(require.__markCompiled)require.__markCompiled();






function Type(){
var mixins=this.__mixins;
if(mixins){
for(var i=0;i < mixins.length;i++) {
mixins[i].apply(this,arguments);}}}














function instanceOf(constructor,which){


if(which instanceof constructor){
return true;}



if(which instanceof Type){
for(var i=0;i < which.__mixins.length;i++) {
if(which.__mixins[i] == constructor){
return true;}}}




return false;}










function mixin(to,from){
var prototype=to.prototype;

if(!ES('Array','isArray',false,from)){
from = [from];}


for(var i=0;i < from.length;i++) {
var mixinFrom=from[i];

if(typeof mixinFrom == 'function'){
prototype.__mixins.push(mixinFrom);
mixinFrom = mixinFrom.prototype;}


ES(ES('Object','keys',false,mixinFrom),'forEach',true,function(key){
prototype[key] = mixinFrom[key];});}}


















function extend(from,prototype,mixins)
{
var constructor=prototype && prototype.hasOwnProperty('constructor')?
prototype.constructor:
function(){this.parent.apply(this,arguments);};

Assert.isFunction(constructor);


if(from && from.prototype instanceof Type === false){
throw new Error('parent type does not inherit from Type');}

from = from || Type;


function F(){}
F.prototype = from.prototype;
constructor.prototype = new F();

if(prototype){
ES('Object','assign',false,constructor.prototype,prototype);}



constructor.prototype.constructor = constructor;

constructor.parent = from;



constructor.prototype.__mixins = from.prototype.__mixins?
Array.prototype.slice.call(from.prototype.__mixins):
[];


if(mixins){
mixin(constructor,mixins);}



constructor.prototype.parent = function(){
this.parent = from.prototype.parent;
from.apply(this,arguments);};



constructor.prototype.parentCall = function(method){
return from.prototype[method].apply(this,
Array.prototype.slice.call(arguments,1));};


constructor.extend = function(prototype,mixins){
return extend(this,prototype,mixins);};

return constructor;}


ES('Object','assign',false,Type.prototype,{
instanceOf:function(type){
return instanceOf(type,this);}});



ES('Object','assign',false,Type,{
extend:function(prototype,mixins){
return typeof prototype === 'function'?
extend.apply(null,arguments):
extend(null,prototype,mixins);},

instanceOf:instanceOf});


module.exports = Type;},null);

__d('sdk.Model',['Type','ObservableMixin'],function $module_sdk_Model(global,require,requireDynamic,requireLazy,module,exports,Type,ObservableMixin){if(require.__markCompiled)require.__markCompiled();




var Model=Type.extend({
constructor:function(properties){
this.parent();


var propContainer={};
var model=this;

ES(ES('Object','keys',false,properties),'forEach',true,function(name){

propContainer[name] = properties[name];


model['set' + name] = function(value){
if(value === propContainer[name]){
return this;}

propContainer[name] = value;
model.inform(name + '.change',value);
return model;};



model['get' + name] = function(){
return propContainer[name];};});}},



ObservableMixin);

module.exports = Model;},null);

__d('sdk.Runtime',['sdk.Model','JSSDKRuntimeConfig'],function $module_sdk_Runtime(global,require,requireDynamic,requireLazy,module,exports,Model,RuntimeConfig){if(require.__markCompiled)require.__markCompiled();





var ENVIRONMENTS={
UNKNOWN:0,
PAGETAB:1,
CANVAS:2,
PLATFORM:4};


var Runtime=new Model({
AccessToken:'',
ClientID:'',
CookieUserID:'',
Environment:ENVIRONMENTS.UNKNOWN,
Initialized:false,
IsVersioned:false,
KidDirectedSite:undefined,
Locale:RuntimeConfig.locale,
LoggedIntoFacebook:undefined,
LoginStatus:undefined,
Revision:RuntimeConfig.revision,
Rtl:RuntimeConfig.rtl,
Scope:undefined,
Secure:undefined,
UseCookie:false,
UserID:'',
Version:undefined});


ES('Object','assign',false,Runtime,{

ENVIRONMENTS:ENVIRONMENTS,

isEnvironment:function(target){
var environment=this.getEnvironment();
return (target | environment) === environment;},


isCanvasEnvironment:function(){
return this.isEnvironment(ENVIRONMENTS.CANVAS) || 
this.isEnvironment(ENVIRONMENTS.PAGETAB);}});



(function(){
var environment=/app_runner/.test(window.name)?
ENVIRONMENTS.PAGETAB:
/iframe_canvas/.test(window.name)?
ENVIRONMENTS.CANVAS:
ENVIRONMENTS.UNKNOWN;


if((environment | ENVIRONMENTS.PAGETAB) === environment){
environment = environment | ENVIRONMENTS.CANVAS;}

Runtime.setEnvironment(environment);})();


module.exports = Runtime;},null);

__d('sdk.Cookie',['QueryString','sdk.Runtime'],function $module_sdk_Cookie(global,require,requireDynamic,requireLazy,module,exports,QueryString,Runtime){if(require.__markCompiled)require.__markCompiled();






var domain=null;








function setRaw(prefix,val,ts){
prefix = prefix + Runtime.getClientID();

var useDomain=domain && domain !== '.';

if(useDomain){

document.cookie = prefix + '=; expires=Wed, 04 Feb 2004 08:00:00 GMT;';

document.cookie = prefix + '=; expires=Wed, 04 Feb 2004 08:00:00 GMT;' + 
'domain=' + location.hostname + ';';}


var expires=new Date(ts).toGMTString();
document.cookie = prefix + '=' + val + (
val && ts === 0?'':'; expires=' + expires) + 
'; path=/' + (
useDomain?'; domain=' + domain:'');}


function getRaw(prefix){
prefix = prefix + Runtime.getClientID();
var regExp=new RegExp('\\b' + prefix + '=([^;]*)\\b');
return regExp.test(document.cookie)?
RegExp.$1:
null;}


var Cookie={
setDomain:function(val){
domain = val;

var meta=QueryString.encode({
base_domain:domain && domain !== '.'?domain:''});

var expiration=new Date();
expiration.setFullYear(expiration.getFullYear() + 1);
setRaw('fbm_',meta,expiration.getTime());},


getDomain:function(){
return domain;},







loadMeta:function(){
var cookie=getRaw('fbm_');
if(cookie){

var meta=QueryString.decode(cookie);
if(!domain){

domain = meta.base_domain;}

return meta;}},








loadSignedRequest:function(){
return getRaw('fbsr_');},











setSignedRequestCookie:function(signedRequest,
expiration){
if(!signedRequest){
throw new Error('Value passed to Cookie.setSignedRequestCookie ' + 
'was empty.');}

setRaw('fbsr_',signedRequest,expiration);},






clearSignedRequestCookie:function(){
setRaw('fbsr_','',0);},


setRaw:setRaw,

getRaw:getRaw};


module.exports = Cookie;},null);

__d('Miny',[],function $module_Miny(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var MAGIC='Miny1';
var LO='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');

var Miny={

encode:function(s){
if(/^$|[~\\]|__proto__/.test(s)){
return s;}



var parts=s.match(/\w+|\W+/g);

var i;


var dict=ES('Object','create',false,null);
for(i = 0;i < parts.length;i++) {
dict[parts[i]] = (dict[parts[i]] || 0) + 1;}




var keys=ES('Object','keys',false,dict);
keys.sort(function(a,b){return dict[b] - dict[a];});


for(i = 0;i < keys.length;i++) {
var n=(i - i % 32) / 32;
dict[keys[i]] = n?n.toString(32) + LO[i % 32]:LO[i % 32];}



var codes='';
for(i = 0;i < parts.length;i++) {
codes += dict[parts[i]];}


keys.unshift(MAGIC,keys.length);
keys.push(codes);
return keys.join('~');}};



module.exports = Miny;},null);

__d('sdk.UA',[],function $module_sdk_UA(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var uas=navigator.userAgent;


var devices={
iphone:/\b(iPhone|iP[ao]d)/.test(uas),
ipad:/\b(iP[ao]d)/.test(uas),
android:/Android/i.test(uas),
nativeApp:/FBAN\/\w+;/i.test(uas)};

var mobile=/Mobile/i.test(uas);


var versions={
ie:'',
firefox:'',
chrome:'',
webkit:'',
osx:''};

var agent=
/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.
exec(uas);
if(agent){
versions.ie = agent[1]?
parseFloat(agent[1]):
agent[4]?
parseFloat(agent[4]):
'';

versions.firefox = agent[2] || '';
versions.webkit = agent[3] || '';
if(agent[3]){



var chromeAgent=/(?:Chrome\/(\d+\.\d+))/.exec(uas);
versions.chrome = chromeAgent?chromeAgent[1]:'';}}




var mac=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
if(mac){
versions.osx = mac[1];}


function getVersionParts(version){
return ES(version.split('.'),'map',true,function(v){return parseFloat(v);});}


var UA={};

ES(ES('Object','keys',false,versions),'map',true,function(key){



UA[key] = function(){return parseFloat(versions[key]);};



UA[key].getVersionParts = function(){return getVersionParts(versions[key]);};});


ES(ES('Object','keys',false,devices),'map',true,function(key){



UA[key] = function(){return devices[key];};});





UA.mobile = function(){return devices.iphone || devices.ipad || devices.android || mobile;};


module.exports = UA;},null);

__d('getBlankIframeSrc',['sdk.UA'],function $module_getBlankIframeSrc(global,require,requireDynamic,requireLazy,module,exports,UA){if(require.__markCompiled)require.__markCompiled();



function getBlankIframeSrc(){
return UA.ie() < 10?'javascript:false':'about:blank';}


module.exports = getBlankIframeSrc;},null);

__d('insertIframe',['GlobalCallback','getBlankIframeSrc','guid'],function $module_insertIframe(global,require,requireDynamic,requireLazy,module,exports,GlobalCallback,getBlankIframeSrc,guid){if(require.__markCompiled)require.__markCompiled();






function insertIframe(opts){






opts.id = opts.id || guid();
opts.name = opts.name || guid();






var srcSet=false;
var onloadDone=false;
var callback=function(){
if(srcSet && !onloadDone){
onloadDone = true;
opts.onload && opts.onload(opts.root.firstChild);}};


var globalCallback=GlobalCallback.create(callback);






if(document.attachEvent){


var html=
'<iframe' + 
' id="' + opts.id + '"' + 
' name="' + opts.name + '"' + (
opts.title?' title="' + opts.title + '"':'') + (
opts.className?' class="' + opts.className + '"':'') + 
' style="border:none;' + (
opts.width?'width:' + opts.width + 'px;':'') + (
opts.height?'height:' + opts.height + 'px;':'') + 
'"' + 
' src="' + getBlankIframeSrc() + '"' + 
' frameborder="0"' + 
' scrolling="no"' + 
' allowtransparency="true"' + 
' onload="' + globalCallback + '()"' + 
'></iframe>';










opts.root.innerHTML = 
'<iframe src="' + getBlankIframeSrc() + '"' + 
' frameborder="0"' + 
' scrolling="no"' + 
' style="height:1px"></iframe>';



srcSet = true;






setTimeout(function(){
opts.root.innerHTML = html;
opts.root.firstChild.src = opts.url;
opts.onInsert && opts.onInsert(opts.root.firstChild);},
0);}else 

{



var node=document.createElement('iframe');
node.id = opts.id;
node.name = opts.name;
node.onload = callback;
node.scrolling = 'no';
node.style.border = 'none';
node.style.overflow = 'hidden';
if(opts.title){
node.title = opts.title;}

if(opts.className){
node.className = opts.className;}

if(opts.height !== undefined){
node.style.height = opts.height + 'px';}

if(opts.width !== undefined){
if(opts.width == '100%'){
node.style.width = opts.width;}else 
{
node.style.width = opts.width + 'px';}}


opts.root.appendChild(node);


srcSet = true;

node.src = opts.url;
opts.onInsert && opts.onInsert(node);}}



module.exports = insertIframe;},null);

__d('sdk.domReady',[],function $module_sdk_domReady(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
var queue;
var domIsReady="readyState" in document?
/loaded|complete/.test(document.readyState):





!!document.body;

function flush(){
if(!queue){
return;}


var fn;
while(fn = queue.shift()) {
fn();}

queue = null;}


function domReady(fn){
if(queue){
queue.push(fn);
return;}else 
{
fn();}}



if(!domIsReady){
queue = [];
if(document.addEventListener){
document.addEventListener('DOMContentLoaded',flush,false);
window.addEventListener('load',flush,false);}else 
if(document.attachEvent){
document.attachEvent('onreadystatechange',flush);
window.attachEvent('onload',flush);}




if(document.documentElement.doScroll && window == window.top){
var test=function(){
try{


document.documentElement.doScroll('left');}
catch(error) {
setTimeout(test,0);
return;}

flush();};

test();}}



module.exports = domReady;},3);

__d('sdk.Content',['Log','sdk.UA','sdk.domReady'],function $module_sdk_Content(global,require,requireDynamic,requireLazy,module,exports,Log,UA,domReady){if(require.__markCompiled)require.__markCompiled();






var visibleRoot;
var hiddenRoot;

var Content={








append:function(content,root)
{


if(!root){
if(!visibleRoot){
visibleRoot = root = document.getElementById('fb-root');
if(!root){
Log.warn('The "fb-root" div has not been created, auto-creating');

visibleRoot = root = document.createElement('div');
root.id = 'fb-root';






if(UA.ie() || !document.body){
domReady(function(){
document.body.appendChild(root);});}else 

{
document.body.appendChild(root);}}


root.className += ' fb_reset';}else 
{
root = visibleRoot;}}



if(typeof content == 'string'){
var div=document.createElement('div');
root.appendChild(div).innerHTML = content;
return div;}else 
{
return root.appendChild(content);}},









appendHidden:function(content){
if(!hiddenRoot){
var 
hiddenRoot=document.createElement('div'),
style=hiddenRoot.style;
style.position = 'absolute';
style.top = '-10000px';
style.width = style.height = 0;
hiddenRoot = Content.append(hiddenRoot);}


return Content.append(content,hiddenRoot);},














submitToTarget:function(opts,get){
var form=document.createElement('form');
form.action = opts.url;
form.target = opts.target;
form.method = get?'GET':'POST';
Content.appendHidden(form);

for(var key in opts.params) {
if(opts.params.hasOwnProperty(key)){
var val=opts.params[key];
if(val !== null && val !== undefined){
var input=document.createElement('input');
input.name = key;
input.value = val;
form.appendChild(input);}}}




form.submit();
form.parentNode.removeChild(form);}};



module.exports = Content;},null);

__d('sdk.Impressions',['sdk.Content','Miny','QueryString','sdk.Runtime','UrlMap','getBlankIframeSrc','guid','insertIframe'],function $module_sdk_Impressions(global,require,requireDynamic,requireLazy,module,exports,Content,Miny,QueryString,Runtime,UrlMap,getBlankIframeSrc,guid,insertIframe){if(require.__markCompiled)require.__markCompiled();











function request(params){
var clientID=Runtime.getClientID();

if(!params.api_key && clientID){
params.api_key = clientID;}


params.kid_directed_site = Runtime.getKidDirectedSite();

var url=UrlMap.resolve('www',true) + 
'/impression.php/' + guid() + '/';
var fullUrlPath=QueryString.appendToUrl(url,params);
if(fullUrlPath.length > 2000){


if(params.payload && typeof params.payload === 'string'){
var minyPayload=Miny.encode(params.payload);
if(minyPayload && minyPayload.length < params.payload.length){
params.payload = minyPayload;
fullUrlPath = QueryString.appendToUrl(url,params);}}}




if(fullUrlPath.length <= 2000){
var image=new Image();
image.src = fullUrlPath;}else 
{

var name=guid();
var root=Content.appendHidden('');
insertIframe({
url:getBlankIframeSrc(),
root:root,
name:name,
className:'fb_hidden fb_invisible',
onload:function(){
root.parentNode.removeChild(root);}});



Content.submitToTarget({
url:url,
target:name,
params:params});}}




var Impressions={
log:function(lid,payload){
if(!payload.source){
payload.source = 'jssdk';}


request({
lid:lid,
payload:ES('JSON','stringify',false,payload)});},



impression:request};


module.exports = Impressions;},null);

__d('sdk.Scribe',['QueryString','sdk.Runtime','UrlMap'],function $module_sdk_Scribe(global,require,requireDynamic,requireLazy,module,exports,QueryString,Runtime,UrlMap){if(require.__markCompiled)require.__markCompiled();




function log(category,data){
if(typeof data.extra == 'object'){
data.extra.revision = Runtime.getRevision();}

new Image().src = QueryString.appendToUrl(
UrlMap.resolve('www',true) + '/common/scribe_endpoint.php',
{
c:category,
m:ES('JSON','stringify',false,data)});}




var Scribe={
log:log};


module.exports = Scribe;},null);

__d('Base64',[],function $module_Base64(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();













var en=
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function en3(c){
c = c.charCodeAt(0) << 16 | c.charCodeAt(1) << 8 | c.charCodeAt(2);
return String.fromCharCode(
en.charCodeAt(c >>> 18),en.charCodeAt(c >>> 12 & 63),
en.charCodeAt(c >>> 6 & 63),en.charCodeAt(c & 63));}





var de=
'>___?456789:;<=_______' + 
'\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19' + 
'______\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./0123';
function de4(c){
c = de.charCodeAt(c.charCodeAt(0) - 43) << 18 | 
de.charCodeAt(c.charCodeAt(1) - 43) << 12 | 
de.charCodeAt(c.charCodeAt(2) - 43) << 6 | 
de.charCodeAt(c.charCodeAt(3) - 43);
return String.fromCharCode(c >>> 16,c >>> 8 & 255,c & 255);}


var Base64={
encode:function(s){

s = unescape(encodeURI(s));
var i=(s.length + 2) % 3;
s = (s + '\0\0'.slice(i)).replace(/[\s\S]{3}/g,en3);
return s.slice(0,s.length + i - 2) + '=='.slice(i);},

decode:function(s){

s = s.replace(/[^A-Za-z0-9+\/]/g,'');
var i=s.length + 3 & 3;
s = (s + 'AAA'.slice(i)).replace(/..../g,de4);
s = s.slice(0,s.length + i - 3);

try{return decodeURIComponent(escape(s));}
catch(_) {throw new Error('Not valid UTF-8');}},

encodeObject:function(obj){
return Base64.encode(ES('JSON','stringify',false,obj));},

decodeObject:function(b64){
return ES('JSON','parse',false,Base64.decode(b64));},


encodeNums:function(l){
return String.fromCharCode.apply(String,ES(l,'map',true,function(val){
return en.charCodeAt((val | -(val > 63)) & -(val > 0) & 63);}));}};




module.exports = Base64;},null);

__d('sdk.SignedRequest',['Base64'],function $module_sdk_SignedRequest(global,require,requireDynamic,requireLazy,module,exports,Base64){if(require.__markCompiled)require.__markCompiled();



function parse(signed_request){
if(!signed_request){
return null;}



var payload=signed_request.split('.',2)[1].
replace(/\-/g,'+').replace(/\_/g,'/');
return Base64.decodeObject(payload);}



var SignedRequest={
parse:parse};


module.exports = SignedRequest;},null);

__d('URIRFC3986',[],function $module_URIRFC3986(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var PARSE_PATTERN=new RegExp(
'^' + 
'([^:/?#]+:)?' + 
'(//' + 
'([^\\\\/?#@]*@)?' + 
'(' + 
'\\[[A-Fa-f0-9:.]+\\]|' + 
'[^\\/?#:]*' + 
')' + 
'(:[0-9]*)?' + 
')?' + 
'([^?#]*)' + 
'(\\?[^#]*)?' + 
'(#.*)?');








var URIRFC3986={








parse:function(uriString){
if(ES(uriString,'trim',true) === ''){
return null;}

var captures=uriString.match(PARSE_PATTERN);
var uri={};




uri.uri = captures[0]?captures[0]:null;
uri.scheme = captures[1]?
captures[1].substr(0,captures[1].length - 1):
null;
uri.authority = captures[2]?captures[2].substr(2):null;
uri.userinfo = captures[3]?
captures[3].substr(0,captures[3].length - 1):
null;
uri.host = captures[2]?captures[4]:null;
uri.port = captures[5]?
captures[5].substr(1)?parseInt(captures[5].substr(1),10):null:
null;
uri.path = captures[6]?captures[6]:null;
uri.query = captures[7]?captures[7].substr(1):null;
uri.fragment = captures[8]?captures[8].substr(1):null;
uri.isGenericURI = uri.authority === null && !!uri.scheme;
return uri;}};



module.exports = URIRFC3986;},null);

__d('createObjectFrom',[],function $module_createObjectFrom(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
























function createObjectFrom(
keys,
values)
{
if(__DEV__){
if(!ES('Array','isArray',false,keys)){
throw new TypeError('Must pass an array of keys.');}}



var object={};
var isArray=ES('Array','isArray',false,values);
if(values === undefined){
values = true;}


for(var ii=keys.length - 1;ii >= 0;ii--) {
object[keys[ii]] = isArray?values[ii]:values;}

return object;}


module.exports = createObjectFrom;},null);

__d('URISchemes',['createObjectFrom'],function $module_URISchemes(global,require,requireDynamic,requireLazy,module,exports,createObjectFrom){if(require.__markCompiled)require.__markCompiled();



var defaultSchemes=createObjectFrom([
'blob',
'fb',
'fb-ama',
'fb-messenger',
'fb-page-messages',
'fbcf',
'fbconnect',
'fbmobilehome',
'fbrpc',
'file',
'ftp',
'http',
'https',
'mailto',
'ms-app',
'intent',
'itms',
'itms-apps',
'itms-services',
'market',
'svn+ssh',
'fbstaging',
'tel',
'sms',
'pebblejs',
'sftp']);


var URISchemes={





isAllowed:function(schema){
if(!schema){
return true;}

return defaultSchemes.hasOwnProperty(schema.toLowerCase());}};



module.exports = URISchemes;},null);

__d('eprintf',[],function $module_eprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();











var eprintf=function(errorMessage){
var args=ES(Array.prototype.slice.call(arguments),'map',true,function(arg){
return String(arg);});

var expectedLength=errorMessage.split('%s').length - 1;

if(expectedLength !== args.length - 1){

return eprintf('eprintf args number mismatch: %s',ES('JSON','stringify',false,args));}


var index=1;
return errorMessage.replace(/%s/g,function(whole){
return String(args[index++]);});};



module.exports = eprintf;},null);

__d('ex',['eprintf'],function $module_ex(global,require,requireDynamic,requireLazy,module,exports,eprintf){if(require.__markCompiled)require.__markCompiled();

















var ex=function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args = ES(args,'map',true,function(arg){return String(arg);});
if(args[0].split('%s').length !== args.length){

return ex('ex args number mismatch: %s',ES('JSON','stringify',false,args));}


if(__DEV__){
return eprintf.apply(null,args);}else 
{
return ex._prefix + ES('JSON','stringify',false,args) + ex._suffix;}};




ex._prefix = '<![EX[';
ex._suffix = ']]>';

module.exports = ex;},null);

__d('invariant',['ex','sprintf'],function $module_invariant(global,require,requireDynamic,requireLazy,module,exports,ex,sprintf){



'use strict';if(require.__markCompiled)require.__markCompiled();




var printingFunction=ex;
if(__DEV__){
printingFunction = sprintf;}












function invariant(condition,format){
if(__DEV__){
if(format === undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error=undefined;
if(format === undefined){
error = new Error(
'Minified exception occurred; use the non-minified dev environment ' + 
'for the full error message and additional helpful warnings.');}else 

{
var messageWithParams=[format];
for(var i=2,l=arguments.length;i < l;i++) {
messageWithParams.push(arguments[i]);}

error = new Error(printingFunction.apply(null,messageWithParams));
error.name = 'Invariant Violation';
error.messageWithParams = messageWithParams;}


error.framesToPop = 1;
throw error;}}



module.exports = invariant;},null);

__d('URIBase',['URIRFC3986','URISchemes','ex','invariant'],function $module_URIBase(global,require,requireDynamic,requireLazy,module,exports,URIRFC3986,URISchemes,ex,invariant){if(require.__markCompiled)require.__markCompiled();







var UNSAFE_DOMAIN_PATTERN=new RegExp(


'[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' + 

'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' + 

'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]');


var SECURITY_PATTERN=new RegExp(

'^(?:[^/]*:|' + 

'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');














function parse(uri,uriToParse,shouldThrow,serializer){
if(!uriToParse){
return true;}



if(uriToParse instanceof URIBase){
uri.setProtocol(uriToParse.getProtocol());
uri.setDomain(uriToParse.getDomain());
uri.setPort(uriToParse.getPort());
uri.setPath(uriToParse.getPath());
uri.setQueryData(
serializer.deserialize(
serializer.serialize(uriToParse.getQueryData())));


uri.setFragment(uriToParse.getFragment());
uri.setForceFragmentSeparator(uriToParse.getForceFragmentSeparator());
return true;}


uriToParse = ES(uriToParse.toString(),'trim',true);
var components=URIRFC3986.parse(uriToParse) || {};
if(!shouldThrow && !URISchemes.isAllowed(components.scheme)){
return false;}

uri.setProtocol(components.scheme || '');
if(!shouldThrow && UNSAFE_DOMAIN_PATTERN.test(components.host)){
return false;}

uri.setDomain(components.host || '');
uri.setPort(components.port || '');
uri.setPath(components.path || '');
if(shouldThrow){
uri.setQueryData(serializer.deserialize(components.query) || {});}else 
{
try{
uri.setQueryData(serializer.deserialize(components.query) || {});}
catch(err) {
return false;}}


uri.setFragment(components.fragment || '');


if(components.fragment === ''){
uri.setForceFragmentSeparator(true);}


if(components.userinfo !== null){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (userinfo is not allowed in a URI): %s',
uri.toString()));}else 

{
return false;}}





if(!uri.getDomain() && ES(uri.getPath(),'indexOf',true,'\\') !== -1){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (no domain but multiple back-slashes): %s',
uri.toString()));}else 

{
return false;}}





if(!uri.getProtocol() && SECURITY_PATTERN.test(uriToParse)){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (unsafe protocol-relative URLs): %s',
uri.toString()));}else 

{
return false;}}


return true;}





var uriFilters=[];
































function URIBase(uri,serializer){'use strict';
!serializer?invariant(0,'no serializer set'):undefined;
this.$URIBase_serializer = serializer;

this.$URIBase_protocol = '';
this.$URIBase_domain = '';
this.$URIBase_port = '';
this.$URIBase_path = '';
this.$URIBase_fragment = '';
this.$URIBase_queryData = {};
this.$URIBase_forceFragmentSeparator = false;
parse(this,uri,true,serializer);}URIBase.prototype.








setProtocol = function(protocol){'use strict';
!
URISchemes.isAllowed(protocol)?invariant(0,
'"%s" is not a valid protocol for a URI.',protocol):undefined;

this.$URIBase_protocol = protocol;
return this;};URIBase.prototype.







getProtocol = function(protocol){'use strict';
return this.$URIBase_protocol;};URIBase.prototype.








setSecure = function(secure){'use strict';
return this.setProtocol(secure?'https':'http');};URIBase.prototype.







isSecure = function(){'use strict';
return this.getProtocol() === 'https';};URIBase.prototype.








setDomain = function(domain){'use strict';




if(UNSAFE_DOMAIN_PATTERN.test(domain)){
throw new Error(ex(
'URI.setDomain: unsafe domain specified: %s for url %s',
domain,
this.toString()));}



this.$URIBase_domain = domain;
return this;};URIBase.prototype.







getDomain = function(){'use strict';
return this.$URIBase_domain;};URIBase.prototype.








setPort = function(port){'use strict';
this.$URIBase_port = port;
return this;};URIBase.prototype.







getPort = function(){'use strict';
return this.$URIBase_port;};URIBase.prototype.








setPath = function(path){'use strict';
if(__DEV__){
if(path && path.charAt(0) !== '/'){
console.warn('Path does not begin with a "/" which means this URI ' + 
'will likely be malformed. Ensure any string passed to .setPath() ' + 
'leads with "/"');}}


this.$URIBase_path = path;
return this;};URIBase.prototype.







getPath = function(){'use strict';
return this.$URIBase_path;};URIBase.prototype.









addQueryData = function(mapOrKey,value){'use strict';

if(Object.prototype.toString.call(mapOrKey) === '[object Object]'){
ES('Object','assign',false,this.$URIBase_queryData,mapOrKey);}else 
{
this.$URIBase_queryData[mapOrKey] = value;}

return this;};URIBase.prototype.









setQueryData = function(map){'use strict';
this.$URIBase_queryData = map;
return this;};URIBase.prototype.







getQueryData = function(){'use strict';
return this.$URIBase_queryData;};URIBase.prototype.








removeQueryData = function(keys){'use strict';
if(!ES('Array','isArray',false,keys)){
keys = [keys];}

for(var i=0,length=keys.length;i < length;++i) {
delete this.$URIBase_queryData[keys[i]];}

return this;};URIBase.prototype.








setFragment = function(fragment){'use strict';
this.$URIBase_fragment = fragment;

this.setForceFragmentSeparator(false);
return this;};URIBase.prototype.







getFragment = function(){'use strict';
return this.$URIBase_fragment;};URIBase.prototype.

















setForceFragmentSeparator = function(shouldForce){'use strict';
this.$URIBase_forceFragmentSeparator = shouldForce;
return this;};URIBase.prototype.








getForceFragmentSeparator = function(){'use strict';
return this.$URIBase_forceFragmentSeparator;};URIBase.prototype.







isEmpty = function(){'use strict';
return !(
this.getPath() || 
this.getProtocol() || 
this.getDomain() || 
this.getPort() || 
ES('Object','keys',false,this.getQueryData()).length > 0 || 
this.getFragment());};URIBase.prototype.








toString = function(){'use strict';
var uri=this;
for(var i=0;i < uriFilters.length;i++) {
uri = uriFilters[i](uri);}

return uri.$URIBase_toStringImpl();};URIBase.prototype.








$URIBase_toStringImpl = function(){'use strict';
var str='';
var protocol=this.getProtocol();
if(protocol){
str += protocol + '://';}

var domain=this.getDomain();
if(domain){
str += domain;}

var port=this.getPort();
if(port){
str += ':' + port;}





var path=this.getPath();
if(path){
str += path;}else 
if(str){
str += '/';}

var queryStr=this.$URIBase_serializer.serialize(this.getQueryData());
if(queryStr){
str += '?' + queryStr;}

var fragment=this.getFragment();
if(fragment){
str += '#' + fragment;}else 
if(this.getForceFragmentSeparator()){
str += '#';}

return str;};URIBase.









registerFilter = function(filter){'use strict';
uriFilters.push(filter);};URIBase.prototype.






getOrigin = function(){'use strict';
var port=this.getPort();
return this.getProtocol() + 
'://' + 
this.getDomain() + (
port?':' + port:'');};













URIBase.isValidURI = function(uri,serializer){
return parse(new URIBase(null,serializer),uri,false,serializer);};


module.exports = URIBase;},null);

__d('sdk.URI',['Assert','QueryString','URIBase'],function $module_sdk_URI(global,require,requireDynamic,requireLazy,module,exports,Assert,QueryString,URIBase){var _URIBase,_superProto;if(require.__markCompiled)require.__markCompiled();





var facebookRe=/\.facebook\.com$/;

var serializer={
serialize:function(map){
return map?
QueryString.encode(map):
'';},

deserialize:function(text){
return text?
QueryString.decode(text):
{};}};_URIBase = babelHelpers.inherits(



URI,URIBase);_superProto = _URIBase && _URIBase.prototype;
function URI(uri){'use strict';
Assert.isString(uri,'The passed argument was of invalid type.');
_superProto.constructor.call(this,uri,serializer);}URI.prototype.


isFacebookURI = function(){'use strict';
return facebookRe.test(this.getDomain());};URI.prototype.


valueOf = function(){'use strict';
return this.toString();};



module.exports = URI;},null);

__d('Queue',[],function $module_Queue(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();




var registry={};







function Queue(opts){'use strict';

this._opts = babelHelpers['extends']({
interval:0,
processor:null},
opts);



this._queue = [];
this._stopped = true;}Queue.prototype.









_dispatch = function(force){'use strict';
if(this._stopped || this._queue.length === 0){
return;}

if(!this._opts.processor){
this._stopped = true;
throw new Error('No processor available');}


if(this._opts.interval){
this._opts.processor.call(this,this._queue.shift());
this._timeout = setTimeout(ES(
this._dispatch,'bind',true,this),
this._opts.interval);}else 

{
while(this._queue.length) {
this._opts.processor.call(this,this._queue.shift());}}};Queue.prototype.












enqueue = function(message){'use strict';
if(this._opts.processor && !this._stopped){
this._opts.processor.call(this,message);}else 
{
this._queue.push(message);}

return this;};Queue.prototype.









start = function(processor){'use strict';
if(processor){
this._opts.processor = processor;}

this._stopped = false;
this._dispatch();
return this;};Queue.prototype.


isStarted = function(){'use strict';
return !this._stopped;};Queue.prototype.






dispatch = function(){'use strict';
this._dispatch(true);};Queue.prototype.








stop = function(scheduled){'use strict';
this._stopped = true;
if(scheduled){
clearTimeout(this._timeout);}

return this;};Queue.prototype.










merge = function(queue,prepend){'use strict';
this._queue[prepend?'unshift':'push'].
apply(this._queue,queue._queue);
queue._queue = [];
this._dispatch();
return this;};Queue.prototype.





getLength = function(){'use strict';
return this._queue.length;};Queue.










get = function(name,opts){'use strict';
var queue;
if(name in registry){
queue = registry[name];}else 
{
queue = registry[name] = new Queue(opts);}

return queue;};Queue.








exists = function(name){'use strict';
return name in registry;};Queue.









remove = function(name){'use strict';
return delete registry[name];};




module.exports = Queue;},null);

__d('DOMEventListener',['wrapFunction'],function $module_DOMEventListener(global,require,requireDynamic,requireLazy,module,exports,wrapFunction){if(require.__markCompiled)require.__markCompiled();



var add,remove;

if(window.addEventListener){


add = function(target,name,listener){
listener.wrapper = 
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.addEventListener(name,listener.wrapper,false);};

remove = function(target,name,listener){
target.removeEventListener(name,listener.wrapper,false);};}else 


if(window.attachEvent){


add = function(target,name,listener){
listener.wrapper = 
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.attachEvent('on' + name,listener.wrapper);};

remove = function(target,name,listener){
target.detachEvent('on' + name,listener.wrapper);};}else 


{
remove = add = function(){};}


var DOMEventListener={











add:function(target,name,listener){


add(target,name,listener);
return {



remove:function(){
remove(target,name,listener);
target = null;}};},











remove:remove};


module.exports = DOMEventListener;},null);

__d('UserAgent_DEPRECATED',[],function $module_UserAgent_DEPRECATED(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();









































var _populated=false;


var _ie,_firefox,_opera,_webkit,_chrome;


var _ie_real_version;


var _osx,_windows,_linux,_android;


var _win64;


var _iphone,_ipad,_native;

var _mobile;

function _populate(){
if(_populated){
return;}


_populated = true;






var uas=navigator.userAgent;
var agent=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
var os=/(Mac OS X)|(Windows)|(Linux)/.exec(uas);

_iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
_ipad = /\b(iP[ao]d)/.exec(uas);
_android = /Android/i.exec(uas);
_native = /FBAN\/\w+;/i.exec(uas);
_mobile = /Mobile/i.exec(uas);






_win64 = !!/Win64/.exec(uas);

if(agent){
_ie = agent[1]?parseFloat(agent[1]):
agent[5]?parseFloat(agent[5]):NaN;

if(_ie && document && document.documentMode){
_ie = document.documentMode;}


var trident=/(?:Trident\/(\d+.\d+))/.exec(uas);
_ie_real_version = trident?parseFloat(trident[1]) + 4:_ie;

_firefox = agent[2]?parseFloat(agent[2]):NaN;
_opera = agent[3]?parseFloat(agent[3]):NaN;
_webkit = agent[4]?parseFloat(agent[4]):NaN;
if(_webkit){



agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
_chrome = agent && agent[1]?parseFloat(agent[1]):NaN;}else 
{
_chrome = NaN;}}else 

{
_ie = _firefox = _opera = _chrome = _webkit = NaN;}


if(os){
if(os[1]){





var ver=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

_osx = ver?parseFloat(ver[1].replace('_','.')):true;}else 
{
_osx = false;}

_windows = !!os[2];
_linux = !!os[3];}else 
{
_osx = _windows = _linux = false;}}



var UserAgent_DEPRECATED={







ie:function(){
return _populate() || _ie;},








ieCompatibilityMode:function(){
return _populate() || _ie_real_version > _ie;},








ie64:function(){
return UserAgent_DEPRECATED.ie() && _win64;},








firefox:function(){
return _populate() || _firefox;},









opera:function(){
return _populate() || _opera;},









webkit:function(){
return _populate() || _webkit;},






safari:function(){
return UserAgent_DEPRECATED.webkit();},








chrome:function(){
return _populate() || _chrome;},








windows:function(){
return _populate() || _windows;},









osx:function(){
return _populate() || _osx;},







linux:function(){
return _populate() || _linux;},








iphone:function(){
return _populate() || _iphone;},


mobile:function(){
return _populate() || _iphone || _ipad || _android || _mobile;},


nativeApp:function(){

return _populate() || _native;},


android:function(){
return _populate() || _android;},


ipad:function(){
return _populate() || _ipad;}};



module.exports = UserAgent_DEPRECATED;},null);

__d('htmlSpecialChars',[],function $module_htmlSpecialChars(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();





var r_amp=/&/g;
var r_lt=/</g;
var r_gt=/>/g;
var r_quot=/"/g;
var r_squo=/'/g;







function htmlSpecialChars(text){
if(typeof text == 'undefined' || text === null || !text.toString){
return '';}


if(text === false){
return '0';}else 
if(text === true){
return '1';}


return text.
toString().
replace(r_amp,'&amp;').
replace(r_quot,'&quot;').
replace(r_squo,'&#039;').
replace(r_lt,'&lt;').
replace(r_gt,'&gt;');}


module.exports = htmlSpecialChars;},null);

__d('Flash',['DOMEventListener','DOMWrapper','QueryString','UserAgent_DEPRECATED','guid','htmlSpecialChars'],function $module_Flash(global,require,requireDynamic,requireLazy,module,exports,DOMEventListener,DOMWrapper,QueryString,UserAgent_DEPRECATED,guid,htmlSpecialChars){if(require.__markCompiled)require.__markCompiled();











var registry={};
var unloadHandlerAttached;
var document=DOMWrapper.getWindow().document;

function remove(id){
var swf=document.getElementById(id);
if(swf){
swf.parentNode.removeChild(swf);}

delete registry[id];}


function unloadRegisteredSWFs(){
for(var id in registry) {
if(registry.hasOwnProperty(id)){
remove(id);}}}







function normalize(s){
return s.replace(
/\d+/g,
function(m){return '000'.substring(m.length) + m;});}



function register(id){
if(!unloadHandlerAttached){


if(UserAgent_DEPRECATED.ie() >= 9){
DOMEventListener.add(window,'unload',unloadRegisteredSWFs);}

unloadHandlerAttached = true;}

registry[id] = id;}



var Flash={












embed:function(src,container,params,flashvars){

var id=guid();



src = htmlSpecialChars(src).replace(/&amp;/g,'&');


params = babelHelpers['extends']({
allowscriptaccess:'always',
flashvars:flashvars,
movie:src},
params);



if(typeof params.flashvars == 'object'){
params.flashvars = QueryString.encode(params.flashvars);}



var pElements=[];
for(var key in params) {
if(params.hasOwnProperty(key) && params[key]){
pElements.push('<param name="' + htmlSpecialChars(key) + '" value="' + 
htmlSpecialChars(params[key]) + '">');}}



var span=container.appendChild(document.createElement('span'));
var html=
'<object ' + (UserAgent_DEPRECATED.ie()?
'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':
'type="application/x-shockwave-flash"') + 
'data="' + src + '" ' + (
params.height?'height="' + params.height + '" ':'') + (
params.width?'width="' + params.width + '" ':'') + 
'id="' + id + '">' + pElements.join('') + '</object>';
span.innerHTML = html;
var swf=span.firstChild;

register(id);
return swf;},







remove:remove,






getVersion:function(){
var name='Shockwave Flash';
var mimeType='application/x-shockwave-flash';
var activexType='ShockwaveFlash.ShockwaveFlash';
var flashVersion;

if(navigator.plugins && typeof navigator.plugins[name] == 'object'){

var description=navigator.plugins[name].description;
if(description && navigator.mimeTypes && 
navigator.mimeTypes[mimeType] && 
navigator.mimeTypes[mimeType].enabledPlugin){
flashVersion = description.match(/\d+/g);}}


if(!flashVersion){
try{
flashVersion = new ActiveXObject(activexType).
GetVariable('$version').
match(/(\d+),(\d+),(\d+),(\d+)/);
flashVersion = Array.prototype.slice.call(flashVersion,1);}

catch(notSupportedException) {}}


return flashVersion;},






getVersionString:function(){
var version=Flash.getVersion();
return version?version.join('.'):'';},









checkMinVersion:function(minVersion){
var version=Flash.getVersion();
if(!version){
return false;}

return normalize(version.join('.')) >= normalize(minVersion);},







isAvailable:function(){
return !!Flash.getVersion();}};




module.exports = Flash;},null);

__d("emptyFunction",[],function $module_emptyFunction(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function(){return this;};
emptyFunction.thatReturnsArgument = function(arg){return arg;};

module.exports = emptyFunction;},null);

__d('XDM',['DOMEventListener','DOMWrapper','emptyFunction','Flash','GlobalCallback','guid','Log','UserAgent_DEPRECATED','wrapFunction'],function $module_XDM(global,require,requireDynamic,requireLazy,module,exports,DOMEventListener,DOMWrapper,emptyFunction,Flash,GlobalCallback,guid,Log,UserAgent_DEPRECATED,wrapFunction){if(require.__markCompiled)require.__markCompiled();











var transports={};
var configuration={
transports:[]};

var window=DOMWrapper.getWindow();

function findTransport(blacklist){
var blacklistMap={},
i=blacklist.length,
list=configuration.transports;

while(i--) {blacklistMap[blacklist[i]] = 1;}

i = list.length;
while(i--) {
var name=list[i],
transport=transports[name];
if(!blacklistMap[name] && transport.isAvailable()){
return name;}}}




var XDM={





register:function(name,provider){
Log.debug('Registering %s as XDM provider',name);
configuration.transports.push(name);
transports[name] = provider;},


























create:function(config){
if(!config.whenReady && !config.onMessage){
Log.error('An instance without whenReady or onMessage makes no sense');
throw new Error('An instance without whenReady or ' + 
'onMessage makes no sense');}

if(!config.channel){
Log.warn('Missing channel name, selecting at random');
config.channel = guid();}


if(!config.whenReady){
config.whenReady = emptyFunction;}

if(!config.onMessage){
config.onMessage = emptyFunction;}


var name=config.transport || findTransport(config.blacklist || []),
transport=transports[name];
if(transport && transport.isAvailable()){
Log.debug('%s is available',name);
transport.init(config);
return name;}}};









XDM.register('flash',(function(){
var inited=false;
var swf;
var doLog=false;
var timeout=15000;
var timer;

if(__DEV__){
doLog = true;}


return {
isAvailable:function(){


return Flash.checkMinVersion('8.0.24');},

init:function(config){
Log.debug('init flash: ' + config.channel);
var xdm={
send:function(message,origin,windowRef,channel){
Log.debug('sending to: %s (%s)',origin,channel);
swf.postMessage(message,origin,channel);}};


if(inited){
config.whenReady(xdm);
return;}

var div=config.root.appendChild(window.document.createElement('div'));

var callback=GlobalCallback.create(function(){
GlobalCallback.remove(callback);
clearTimeout(timer);
Log.info('xdm.swf called the callback');
var messageCallback=GlobalCallback.create(function(msg,origin){
msg = decodeURIComponent(msg);
origin = decodeURIComponent(origin);
Log.debug('received message %s from %s',msg,origin);
config.onMessage(msg,origin);},
'xdm.swf:onMessage');
swf.init(config.channel,messageCallback);
config.whenReady(xdm);},
'xdm.swf:load');

swf = Flash.embed(config.flashUrl,div,null,{
protocol:location.protocol.replace(':',''),
host:location.host,
callback:callback,
log:doLog});


timer = setTimeout(function(){
Log.warn('The Flash component did not load within %s ms - ' + 
'verify that the container is not set to hidden or invisible ' + 
'using CSS as this will cause some browsers to not load ' + 
'the components',timeout);},
timeout);
inited = true;}};})());





var facebookRe=/\.facebook\.com(\/|$)/;










XDM.register('postmessage',(function(){
var inited=false;

return {
isAvailable:function(){
return !!window.postMessage;},

init:function(config){
Log.debug('init postMessage: ' + config.channel);
var prefix='_FB_' + config.channel;
var xdm={
send:function(message,origin,windowRef,channel){
if(window === windowRef){
Log.error('Invalid windowref, equal to window (self)');
throw new Error();}

Log.debug('sending to: %s (%s)',origin,channel);
var send=function(){

windowRef.postMessage('_FB_' + channel + message,origin);};









if(UserAgent_DEPRECATED.ie() == 8 || UserAgent_DEPRECATED.ieCompatibilityMode()){
setTimeout(send,0);}else 
{
send();}}};



if(inited){
config.whenReady(xdm);
return;}


DOMEventListener.add(window,'message',wrapFunction(function(event){
var message=event.data;


var origin=event.origin || 'native';
if(!/^(https?:\/\/|native$)/.test(origin)){
Log.debug('Received message from invalid origin type: %s',origin);
return;}


if(origin !== 'native' && 
!(facebookRe.test(location.hostname) || 
facebookRe.test(event.origin))){

return;}


if(typeof message != 'string'){
Log.warn('Received message of type %s from %s, expected a string',
typeof message,origin);
return;}


Log.debug('received message %s from %s',message,origin);

if(message.substring(0,prefix.length) == prefix){
message = message.substring(prefix.length);}

config.onMessage(message,origin);},
'entry','onMessage'));
config.whenReady(xdm);
inited = true;}};})());




module.exports = XDM;},null);

__d('isFacebookURI',[],function $module_isFacebookURI(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var facebookURIRegex=null;

var FB_PROTOCOLS=['http','https'];








function isFacebookURI(uri){
if(!facebookURIRegex){

facebookURIRegex = new RegExp('(^|\\.)facebook\\.com$','i');}


if(uri.isEmpty() && uri.toString() !== '#'){
return false;}


if(!uri.getDomain() && !uri.getProtocol()){
return true;}


return ES(FB_PROTOCOLS,'indexOf',true,uri.getProtocol()) !== -1 && 
facebookURIRegex.test(uri.getDomain());}


isFacebookURI.setRegex = function(regex){
facebookURIRegex = regex;};


module.exports = isFacebookURI;},null);

__d('sdk.Event',[],function $module_sdk_Event(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var Event={

SUBSCRIBE:'event.subscribe',
UNSUBSCRIBE:'event.unsubscribe',







subscribers:function(){




if(!this._subscribersMap){
this._subscribersMap = {};}

return this._subscribersMap;},




































subscribe:function(name,cb){
var subs=this.subscribers();

if(!subs[name]){
subs[name] = [cb];}else 
{
if(ES(subs[name],'indexOf',true,cb) == -1){
subs[name].push(cb);}}


if(name != this.SUBSCRIBE && name != this.UNSUBSCRIBE){
this.fire(this.SUBSCRIBE,name,subs[name]);}},






















unsubscribe:function(name,cb){
var subs=this.subscribers()[name];
if(subs){
ES(subs,'forEach',true,function(value,key){
if(value == cb){
subs.splice(key,1);}});}



if(name != this.SUBSCRIBE && name != this.UNSUBSCRIBE){
this.fire(this.UNSUBSCRIBE,name,subs);}},













monitor:function(name,callback){
if(!callback()){
var 
ctx=this,
fn=function(){
if(callback.apply(callback,arguments)){
ctx.unsubscribe(name,fn);}};



this.subscribe(name,fn);}},












clear:function(name){
delete this.subscribers()[name];},








fire:function(name){
var 
args=Array.prototype.slice.call(arguments,1),
subs=this.subscribers()[name];

if(subs){
ES(subs,'forEach',true,function(sub){


if(sub){
sub.apply(this,args);}});}}};






module.exports = Event;},null);

__d('JSONRPC',['Log'],function $module_JSONRPC(global,require,requireDynamic,requireLazy,module,exports,Log){if(require.__markCompiled)require.__markCompiled();





function JSONRPC(write){'use strict';
this.$JSONRPC_counter = 0;
this.$JSONRPC_callbacks = {};

this.remote = ES(function(context){
this.$JSONRPC_context = context;
return this.remote;},'bind',true,this);


this.local = {};

this.$JSONRPC_write = write;}JSONRPC.prototype.











stub = function(stub){'use strict';
this.remote[stub] = ES(function(){
var message={
jsonrpc:'2.0',
method:stub};for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}


if(typeof args[args.length - 1] == 'function'){
message.id = ++this.$JSONRPC_counter;
this.$JSONRPC_callbacks[message.id] = args.pop();}


message.params = args;

this.$JSONRPC_write(ES('JSON','stringify',false,message),this.$JSONRPC_context || {method:stub});},'bind',true,this);};JSONRPC.prototype.













read = function(message,context){'use strict';
var rpc=ES('JSON','parse',false,message),id=rpc.id;

if(!rpc.method){

if(!this.$JSONRPC_callbacks[id]){
Log.warn('Could not find callback %s',id);
return;}

var callback=this.$JSONRPC_callbacks[id];
delete this.$JSONRPC_callbacks[id];

delete rpc.id;
delete rpc.jsonrpc;

callback(rpc);
return;}



var instance=this,method=this.local[rpc.method],send;
if(id){

send = function(type,value){
var response={
jsonrpc:'2.0',
id:id};

response[type] = value;



setTimeout(function(){
instance.$JSONRPC_write(ES('JSON','stringify',false,response),context);},
0);};}else 

{

send = function(){};}


if(!method){
Log.error('Method "%s" has not been defined',rpc.method);

send('error',{
code:-32601,
message:'Method not found',
data:rpc.method});

return;}



rpc.params.push(ES(send,'bind',true,null,'result'));
rpc.params.push(ES(send,'bind',true,null,'error'));


try{
var returnValue=method.apply(context || null,rpc.params);

if(typeof returnValue !== 'undefined'){
send('result',returnValue);}}

catch(rpcEx) {
Log.error('Invokation of RPC method %s resulted in the error: %s',
rpc.method,rpcEx.message);

send('error',{
code:-32603,
message:'Internal error',
data:rpcEx.message});}};





module.exports = JSONRPC;},null);

__d('sdk.RPC',['Assert','JSONRPC','Queue'],function $module_sdk_RPC(global,require,requireDynamic,requireLazy,module,exports,Assert,JSONRPC,Queue){if(require.__markCompiled)require.__markCompiled();





var outQueue=new Queue();
var jsonrpc=new JSONRPC(function(message){
outQueue.enqueue(message);});


var RPC={
local:jsonrpc.local,
remote:jsonrpc.remote,
stub:ES(jsonrpc.stub,'bind',true,jsonrpc),
setInQueue:function(queue){
Assert.isInstanceOf(Queue,queue);

queue.start(function(message){
jsonrpc.read(message);});},


getOutQueue:function(){
return outQueue;}};



module.exports = RPC;},null);

__d('hasNamePropertyBug',['guid','UserAgent_DEPRECATED'],function $module_hasNamePropertyBug(global,require,requireDynamic,requireLazy,module,exports,guid,UserAgent_DEPRECATED){if(require.__markCompiled)require.__markCompiled();




var hasBug=UserAgent_DEPRECATED.ie()?undefined:false;




function test(){
var form=document.createElement("form"),
input=form.appendChild(document.createElement("input"));
input.name = guid();
hasBug = input !== form.elements[input.name];
form = input = null;
return hasBug;}


function hasNamePropertyBug(){
return typeof hasBug === 'undefined'?
test():
hasBug;}


module.exports = hasNamePropertyBug;},null);

__d('sdk.createIframe',['DOMEventListener','getBlankIframeSrc','guid','hasNamePropertyBug'],function $module_sdk_createIframe(global,require,requireDynamic,requireLazy,module,exports,DOMEventListener,getBlankIframeSrc,guid,hasNamePropertyBug){if(require.__markCompiled)require.__markCompiled();







function createIframe(opts){
opts = ES('Object','assign',false,{},opts);
var frame;
var name=opts.name || guid();
var root=opts.root;
var style=opts.style || {border:'none'};
var src=opts.url;
var onLoad=opts.onload;
var onError=opts.onerror;

if(hasNamePropertyBug()){
frame = document.createElement('<iframe name="' + name + '"/>');}else 
{
frame = document.createElement("iframe");
frame.name = name;}



delete opts.style;
delete opts.name;
delete opts.url;
delete opts.root;
delete opts.onload;
delete opts.onerror;

var attributes=ES('Object','assign',false,{
frameBorder:0,
allowTransparency:true,
allowFullscreen:true,
scrolling:'no'},
opts);


if(attributes.width){
frame.width = attributes.width + 'px';}

if(attributes.height){
frame.height = attributes.height + 'px';}


delete attributes.height;
delete attributes.width;

for(var key in attributes) {
if(attributes.hasOwnProperty(key)){
frame.setAttribute(key,attributes[key]);}}



ES('Object','assign',false,frame.style,style);



frame.src = getBlankIframeSrc();
root.appendChild(frame);
if(onLoad){
var onLoadListener=DOMEventListener.add(frame,'load',function(){
onLoadListener.remove();
onLoad();});}



if(onError){
var onErrorListener=DOMEventListener.add(frame,'error',function(){
onErrorListener.remove();
onError();});}





frame.src = src;
return frame;}


module.exports = createIframe;},null);

__d('sdk.feature',['JSSDKConfig','invariant'],function $module_sdk_feature(global,require,requireDynamic,requireLazy,module,exports,SDKConfig,invariant){if(require.__markCompiled)require.__markCompiled();












function feature(name,defaultValue){
!(
arguments.length >= 2)?invariant(0,
'Default value is required'):undefined;

if(SDKConfig.features && name in SDKConfig.features){
var value=SDKConfig.features[name];
if(typeof value === 'object' && typeof value.rate === 'number'){
if(value.rate && Math.random() * 100 <= value.rate){
return value.value || true;}else 
{
return value.value?null:false;}}else 

{
return value;}}


return defaultValue;}


module.exports = feature;},null);

__d('sdk.XD',['sdk.Content','sdk.Event','Log','QueryString','Queue','sdk.RPC','sdk.Runtime','sdk.Scribe','sdk.URI','UrlMap','JSSDKXDConfig','XDM','isFacebookURI','sdk.createIframe','sdk.feature','guid'],function $module_sdk_XD(global,require,requireDynamic,requireLazy,module,exports,Content,Event,Log,QueryString,Queue,RPC,Runtime,Scribe,URI,UrlMap,XDConfig,XDM,isFacebookURI,createIframe,feature,guid){if(require.__markCompiled)require.__markCompiled();



















var facebookQueue=new Queue();
var httpProxyQueue=new Queue();
var httpsProxyQueue=new Queue();
var httpProxyFrame;
var httpsProxyFrame;
var proxySecret=guid();

var xdArbiterTier=XDConfig.useCdn?'cdn':'www';
var xdArbiterPathAndQuery=feature('use_bundle',false)?
XDConfig.XdBundleUrl:
XDConfig.XdUrl;
var xdArbiterHttpUrl=
UrlMap.resolve(xdArbiterTier,false) + xdArbiterPathAndQuery;
var xdArbiterHttpsUrl=
UrlMap.resolve(xdArbiterTier,true) + xdArbiterPathAndQuery;

var channel=guid();
var origin=location.protocol + '//' + location.host;
var xdm;
var inited=false;
var IFRAME_TITLE='Facebook Cross Domain Communication Frame';

var pluginRegistry={};
var rpcQueue=new Queue();
RPC.setInQueue(rpcQueue);

function onRegister(registeredAs){
Log.info('Remote XD can talk to facebook.com (%s)',registeredAs);
Runtime.setEnvironment(
registeredAs === 'canvas'?
Runtime.ENVIRONMENTS.CANVAS:
Runtime.ENVIRONMENTS.PAGETAB);}


function handleAction(message,senderOrigin){
if(!senderOrigin){
Log.error('No senderOrigin');
throw new Error();}


var protocol=/^https?/.exec(senderOrigin)[0];

switch(message.xd_action){
case 'proxy_ready':
var proxyQueue;
var targetProxyFrame;

if(protocol == 'https'){
proxyQueue = httpsProxyQueue;
targetProxyFrame = httpsProxyFrame;
Runtime.setLoggedIntoFacebook(message.logged_in === 'true');}else 
{
proxyQueue = httpProxyQueue;
targetProxyFrame = httpProxyFrame;}


if(message.registered){
onRegister(message.registered);
facebookQueue = proxyQueue.merge(facebookQueue);}


Log.info('Proxy ready, starting queue %s containing %s messages',
protocol + 'ProxyQueue',proxyQueue.getLength());

proxyQueue.start(function(message){
xdm.send(
typeof message === 'string'?message:QueryString.encode(message),
senderOrigin,
targetProxyFrame.contentWindow,
channel + '_' + protocol);});


break;

case 'plugin_ready':
Log.info('Plugin %s ready, protocol: %s',message.name,protocol);
pluginRegistry[message.name] = {protocol:protocol};
if(Queue.exists(message.name)){
var queue=Queue.get(message.name);
Log.debug('Enqueuing %s messages for %s in %s',queue.getLength(),
message.name,protocol + 'ProxyQueue');

(protocol == 'https'?httpsProxyQueue:httpProxyQueue).merge(queue);}

break;}



if(message.data){
onMessage(message.data,senderOrigin);}}






function onMessage(message,senderOrigin){
if(senderOrigin && senderOrigin !== 'native' && 
!isFacebookURI(new URI(senderOrigin))){
return;}

if(typeof message == 'string'){
if(/^FB_RPC:/.test(message)){
rpcQueue.enqueue(message.substring(7));
return;}


if(message.substring(0,1) == '{'){
try{
message = ES('JSON','parse',false,message);}
catch(decodeException) {
Log.warn('Failed to decode %s as JSON',message);
return;}}else 

{
message = QueryString.decode(message);}}




if(!senderOrigin){

if(message.xd_sig == proxySecret){
senderOrigin = message.xd_origin;}}



if(message.xd_action){
handleAction(message,senderOrigin);
return;}




if(message.access_token){
Runtime.setSecure(/^https/.test(origin));}



if(message.cb){
var cb=XD._callbacks[message.cb];
if(!XD._forever[message.cb]){
delete XD._callbacks[message.cb];}

if(cb){
cb(message);}}}




function sendToFacebook(recipient,message){
if(recipient == 'facebook'){
message.relation = 'parent.parent';
facebookQueue.enqueue(message);}else 
{
message.relation = 'parent.frames["' + recipient + '"]';
var regInfo=pluginRegistry[recipient];
if(regInfo){
Log.debug('Enqueuing message for plugin %s in %s',
recipient,regInfo.protocol + 'ProxyQueue');

(regInfo.protocol == 'https'?httpsProxyQueue:httpProxyQueue).
enqueue(message);}else 
{
Log.debug('Buffering message for plugin %s',recipient);
Queue.get(recipient).enqueue(message);}}}





RPC.getOutQueue().start(function(message){
sendToFacebook('facebook','FB_RPC:' + message);});


function init(xdProxyName){
if(inited){
return;}



var container=Content.appendHidden(document.createElement('div'));


var transport=XDM.create({
blacklist:null,
root:container,
channel:channel,
flashUrl:XDConfig.Flash.path,
whenReady:function(instance){
xdm = instance;

var proxyData={
channel:channel,
origin:location.protocol + '//' + location.host,
transport:transport,
xd_name:xdProxyName};


var xdArbiterFragment='#' + QueryString.encode(proxyData);






if(Runtime.getSecure() !== true){


httpProxyFrame = createIframe({
url:xdArbiterHttpUrl + xdArbiterFragment,
name:'fb_xdm_frame_http',
id:'fb_xdm_frame_http',
root:container,
'aria-hidden':true,
title:IFRAME_TITLE,
tabindex:-1});}





httpsProxyFrame = createIframe({
url:xdArbiterHttpsUrl + xdArbiterFragment,
name:'fb_xdm_frame_https',
id:'fb_xdm_frame_https',
root:container,
'aria-hidden':true,
title:IFRAME_TITLE,
tabindex:-1});},


onMessage:onMessage});

if(!transport){
Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'XD_TRANSPORT',
extra:{
message:'Failed to create a valid transport'}});}



inited = true;}








var XD={


rpc:RPC,

_callbacks:{},
_forever:{},
_channel:channel,
_origin:origin,

onMessage:onMessage,
recv:onMessage,







init:init,









sendToFacebook:sendToFacebook,





inform:function(method,params,relation,
behavior){
sendToFacebook('facebook',{
method:method,
params:ES('JSON','stringify',false,params || {}),
behavior:behavior || 'p',
relation:relation});},

















handler:function(cb,relation,forever,
id){
var xdArbiterFragment='#' + QueryString.encode({
cb:this.registerCallback(cb,forever,id),
origin:origin + '/' + channel,
domain:location.hostname,
relation:relation || 'opener'});

return (location.protocol == 'https:'?
xdArbiterHttpsUrl:
xdArbiterHttpUrl) + 
xdArbiterFragment;},


registerCallback:function(cb,persistent,
id){
id = id || guid();
if(persistent){
XD._forever[id] = true;}

XD._callbacks[id] = cb;
return id;}};







Event.subscribe('init:post',function(options){
init(options.xdProxyName);
var timeout=feature('xd_timeout',false);
if(timeout){
setTimeout(function(){
var initialized=
httpsProxyFrame && 
!!httpProxyFrame == httpProxyQueue.isStarted() && 
!!httpsProxyFrame == httpsProxyQueue.isStarted();

if(!initialized){
Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'XD_INITIALIZATION',
extra:{
message:'Failed to initialize in ' + timeout + 'ms'}});}},



timeout);}});




module.exports = XD;},null);

__d('sdk.getContextType',['sdk.Runtime','sdk.UA'],function $module_sdk_getContextType(global,require,requireDynamic,requireLazy,module,exports,Runtime,UA){if(require.__markCompiled)require.__markCompiled();




function getContextType(){






if(UA.nativeApp()){
return 3;}

if(UA.mobile()){
return 2;}

if(Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)){
return 5;}

return 1;}


module.exports = getContextType;},null);

__d('sdk.Auth',['sdk.Cookie','sdk.createIframe','DOMWrapper','sdk.feature','sdk.getContextType','guid','sdk.Impressions','Log','ObservableMixin','sdk.Runtime','sdk.Scribe','sdk.SignedRequest','UrlMap','sdk.URI','sdk.XD'],function $module_sdk_Auth(global,require,requireDynamic,requireLazy,module,exports,Cookie,createIframe,DOMWrapper,feature,getContextType,guid,Impressions,Log,ObservableMixin,Runtime,Scribe,SignedRequest,UrlMap,URI,XD){if(require.__markCompiled)require.__markCompiled();

















var LOGOUT_COOKIE_PREFIX='fblo_';
var YEAR_MS=365 * 24 * 60 * 60 * 1000;

var currentAuthResponse;

var timer;

var Auth=new ObservableMixin();

function setAuthResponse(authResponse,status){
var currentUserID=Runtime.getUserID();
var userID='';
if(authResponse){




if(authResponse.userID){
userID = authResponse.userID;}else 
if(authResponse.signedRequest){
var parsedSignedRequest=
SignedRequest.parse(authResponse.signedRequest);
if(parsedSignedRequest && parsedSignedRequest.user_id){
userID = parsedSignedRequest.user_id;}}}




var 
currentStatus=Runtime.getLoginStatus(),
login=currentStatus === 'unknown' && authResponse || 
Runtime.getUseCookie() && Runtime.getCookieUserID() !== userID,
logout=currentUserID && !authResponse,
both=authResponse && currentUserID && currentUserID != userID,
authResponseChange=authResponse != currentAuthResponse,
statusChange=status != (currentStatus || 'unknown');



Runtime.setLoginStatus(status);
Runtime.setAccessToken(authResponse && authResponse.accessToken || null);
Runtime.setUserID(userID);

currentAuthResponse = authResponse;

var response={
authResponse:authResponse,
status:status};


if(logout || both){
Auth.inform('logout',response);}

if(login || both){
Auth.inform('login',response);}

if(authResponseChange){
Auth.inform('authresponse.change',response);}

if(statusChange){
Auth.inform('status.change',response);}

return response;}


function getAuthResponse(){
return currentAuthResponse;}


function xdResponseWrapper(cb,authResponse,
method){
return function(params){
var status;
if(params && params.access_token){

var parsedSignedRequest=SignedRequest.parse(params.signed_request);
authResponse = {
accessToken:params.access_token,
userID:parsedSignedRequest.user_id,
expiresIn:parseInt(params.expires_in,10),
signedRequest:params.signed_request};


if(params.granted_scopes){
authResponse.grantedScopes = params.granted_scopes;}


if(Runtime.getUseCookie()){
var expirationTime=authResponse.expiresIn === 0?
0:
ES('Date','now',false) + authResponse.expiresIn * 1000;
var baseDomain=Cookie.getDomain();
if(!baseDomain && params.base_domain){




Cookie.setDomain('.' + params.base_domain);}

Cookie.setSignedRequestCookie(params.signed_request,
expirationTime);
removeLogoutState();}

status = 'connected';
setAuthResponse(authResponse,status);}else 
if(method === 'logout' || method === 'login_status'){




if(params.error && params.error === 'not_authorized'){
status = 'not_authorized';}else 
{
status = 'unknown';}

setAuthResponse(null,status);
if(Runtime.getUseCookie()){
Cookie.clearSignedRequestCookie();}

if(method === 'logout'){
setLogoutState();

Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'PLATFORM_AUTH_LOGOUT',
extra:{args:{fblo:true}}});}}





if(params && params.https == 1){
Runtime.setSecure(true);}


if(cb){
cb({
authResponse:authResponse,
status:Runtime.getLoginStatus()});}


return authResponse;};}



function removeLogoutState(){
Cookie.setRaw(LOGOUT_COOKIE_PREFIX,'',0);}


function setLogoutState(){
Cookie.setRaw(
LOGOUT_COOKIE_PREFIX,
'y',
ES('Date','now',false) + YEAR_MS);}


function fetchLoginStatus(fn){
var frame,fetchStart=ES('Date','now',false);

if(timer){
clearTimeout(timer);
timer = null;}


var fb_logged_out=Cookie.getRaw(LOGOUT_COOKIE_PREFIX) === 'y';

if(feature('getloginstatus_tracking',true)){
Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'PLATFORM_AUTH_GETLOGINSTATUS',
extra:{args:{fblo:fb_logged_out}}});}



if(fb_logged_out){




var unk_status='unknown';
setAuthResponse(null,unk_status);
if(fn){
fn({
authResponse:null,
status:unk_status});}


return;}


var handleResponse=xdResponseWrapper(fn,currentAuthResponse,
'login_status');

var url=new URI(UrlMap.resolve('www',true) + '/connect/ping').
setQueryData({
client_id:Runtime.getClientID(),
response_type:'token,signed_request,code',
domain:location.hostname,
origin:getContextType(),
redirect_uri:XD.handler(function(response){
if(feature('e2e_ping_tracking',true)){
var events={
init:fetchStart,
close:ES('Date','now',false),
method:'ping'};

Log.debug('e2e: %s',ES('JSON','stringify',false,events));

Impressions.log(114,{
payload:events});}


frame.parentNode.removeChild(frame);
if(handleResponse(response)){

timer = setTimeout(function(){
fetchLoginStatus(function(){});},
1200000);}},

'parent'),
sdk:'joey',
kid_directed_site:Runtime.getKidDirectedSite()});


frame = createIframe({
root:DOMWrapper.getRoot(),
name:guid(),
url:url.toString(),
style:{display:'none'}});}




var loadState;
function getLoginStatus(cb,force){
if(!Runtime.getClientID()){
Log.warn('FB.getLoginStatus() called before calling FB.init().');
return;}




if(cb){
if(!force && loadState == 'loaded'){
cb({status:Runtime.getLoginStatus(),
authResponse:getAuthResponse()});
return;}else 
{
Auth.subscribe('FB.loginStatus',cb);}}




if(!force && loadState == 'loading'){
return;}


loadState = 'loading';


var lsCb=function(response){

loadState = 'loaded';


Auth.inform('FB.loginStatus',response);
Auth.clearSubscribers('FB.loginStatus');};


fetchLoginStatus(lsCb);}


ES('Object','assign',false,Auth,{
removeLogoutState:removeLogoutState,
getLoginStatus:getLoginStatus,
fetchLoginStatus:fetchLoginStatus,
setAuthResponse:setAuthResponse,
getAuthResponse:getAuthResponse,
parseSignedRequest:SignedRequest.parse,

xdResponseWrapper:xdResponseWrapper});


module.exports = Auth;},null);

__d('sdk.DOM',['Assert','sdk.UA','sdk.domReady'],function $module_sdk_DOM(global,require,requireDynamic,requireLazy,module,exports,Assert,UA,domReady){if(require.__markCompiled)require.__markCompiled();






var cssRules={};

function getAttr(dom,name){
var attribute=
dom.getAttribute(name) || 
dom.getAttribute(name.replace(/_/g,'-')) || 
dom.getAttribute(name.replace(/-/g,'_')) || 
dom.getAttribute(name.replace(/-/g,'')) || 
dom.getAttribute(name.replace(/_/g,'')) || 
dom.getAttribute('data-' + name) || 
dom.getAttribute('data-' + name.replace(/_/g,'-')) || 
dom.getAttribute('data-' + name.replace(/-/g,'_')) || 
dom.getAttribute('data-' + name.replace(/-/g,'')) || 
dom.getAttribute('data-' + name.replace(/_/g,''));

return attribute?
String(attribute):
null;}


function getBoolAttr(dom,name){
var attribute=getAttr(dom,name);
return attribute?
/^(true|1|yes|on)$/.test(attribute):
null;}


function getProp(dom,name){
Assert.isTruthy(dom,'element not specified');
Assert.isString(name);

try{
return String(dom[name]);}
catch(e) {
throw new Error('Could not read property ' + name + ' : ' + e.message);}}



function html(dom,content){
Assert.isTruthy(dom,'element not specified');
Assert.isString(content);

try{
dom.innerHTML = content;}
catch(e) {
throw new Error('Could not set innerHTML : ' + e.message);}}






function hasClass(dom,className){
Assert.isTruthy(dom,'element not specified');
Assert.isString(className);

var cssClassWithSpace=' ' + getProp(dom,'className') + ' ';
return ES(cssClassWithSpace,'indexOf',true,' ' + className + ' ') >= 0;}





function addClass(dom,className){
Assert.isTruthy(dom,'element not specified');
Assert.isString(className);

if(!hasClass(dom,className)){
dom.className = getProp(dom,'className') + ' ' + className;}}






function removeClass(dom,className){
Assert.isTruthy(dom,'element not specified');
Assert.isString(className);

var regExp=new RegExp('\\s*' + className,'g');
dom.className = ES(getProp(dom,'className').replace(regExp,''),'trim',true);}








function getByClass(className,dom,tagName){
Assert.isString(className);

dom = dom || document.body;
tagName = tagName || '*';
if(dom.querySelectorAll){
return ES('Array','from',false,
dom.querySelectorAll(tagName + '.' + className));}


var all=dom.getElementsByTagName(tagName),
els=[];
for(var i=0,len=all.length;i < len;i++) {
if(hasClass(all[i],className)){
els[els.length] = all[i];}}


return els;}










function getStyle(dom,styleProp){
Assert.isTruthy(dom,'element not specified');
Assert.isString(styleProp);


styleProp = styleProp.replace(/-(\w)/g,function(m,g1){
return g1.toUpperCase();});


var currentStyle=dom.currentStyle || 
document.defaultView.getComputedStyle(dom,null);

var computedStyle=currentStyle[styleProp];




if(/backgroundPosition?/.test(styleProp) && 
/top|left/.test(computedStyle)){
computedStyle = '0%';}

return computedStyle;}








function setStyle(dom,styleProp,value){
Assert.isTruthy(dom,'element not specified');
Assert.isString(styleProp);


styleProp = styleProp.replace(/-(\w)/g,function(m,g1){
return g1.toUpperCase();});

dom.style[styleProp] = value;}





function addCssRules(styles,names){


var allIncluded=true;
for(var i=0,id;id = names[i++];) {
if(!(id in cssRules)){
allIncluded = false;
cssRules[id] = true;}}



if(allIncluded){
return;}


if(UA.ie() < 11){
try{
document.createStyleSheet().cssText = styles;}
catch(exc) {



if(document.styleSheets[0]){
document.styleSheets[0].cssText += styles;}}}else 


{
var style=document.createElement('style');
style.type = 'text/css';
style.textContent = styles;
document.getElementsByTagName('head')[0].appendChild(style);}}







function getViewportInfo(){

var root=document.documentElement && document.compatMode == 'CSS1Compat'?
document.documentElement:
document.body;

return {

scrollTop:root.scrollTop || document.body.scrollTop,
scrollLeft:root.scrollLeft || document.body.scrollLeft,
width:window.innerWidth?window.innerWidth:root.clientWidth,
height:window.innerHeight?window.innerHeight:root.clientHeight};}







function getPosition(node){
Assert.isTruthy(node,'element not specified');

var x=0,
y=0;
do {
x += node.offsetLeft;
y += node.offsetTop;}while(
node = node.offsetParent);

return {x:x,y:y};}



var DOM={
containsCss:hasClass,
addCss:addClass,
removeCss:removeClass,
getByClass:getByClass,

getStyle:getStyle,
setStyle:setStyle,

getAttr:getAttr,
getBoolAttr:getBoolAttr,
getProp:getProp,

html:html,

addCssRules:addCssRules,

getViewportInfo:getViewportInfo,
getPosition:getPosition,

ready:domReady};


module.exports = DOM;},null);

__d('normalizeError',['sdk.UA'],function $module_normalizeError(global,require,requireDynamic,requireLazy,module,exports,UA){if(require.__markCompiled)require.__markCompiled();


function normalizeError(err){









var info={
line:err.lineNumber || err.line,
message:err.message,
name:err.name,
script:err.fileName || err.sourceURL || err.script,
stack:err.stackTrace || err.stack};



info._originalError = err;





var matches=/([\w:\.\/]+\.js):(\d+)/.exec(err.stack);
if(UA.chrome() && matches){
info.script = matches[1];
info.line = parseInt(matches[2],10);}



for(var k in info) {
info[k] == null && delete info[k];}

return info;}


module.exports = normalizeError;},null);

__d('sdk.ErrorHandling',['ManagedError','sdk.Runtime','sdk.Scribe','sdk.feature','normalizeError','wrapFunction'],function $module_sdk_ErrorHandling(global,require,requireDynamic,requireLazy,module,exports,ManagedError,Runtime,Scribe,feature,normalizeError,wrapFunction){if(require.__markCompiled)require.__markCompiled();











var handleError=feature('error_handling',false);
var currentEntry='';

function errorHandler(error){
var originalError=error._originalError;
delete error._originalError;
Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:error.name || error.message,
extra:error});



throw originalError;}


function guard(func,entry){
return function(){


if(!handleError){
return func.apply(this,arguments);}


try{
currentEntry = entry;
return func.apply(this,arguments);}
catch(error) {


if(error instanceof ManagedError){
throw error;}


var data=normalizeError(error);
data.entry = entry;


var sanitizedArgs=ES(Array.prototype.slice.call(arguments),'map',true,
function(arg){
var type=Object.prototype.toString.call(arg);
return (/^\[object (String|Number|Boolean|Object|Date)\]$/.test(type)?
arg:
arg.toString());});


data.args = ES('JSON','stringify',false,sanitizedArgs).substring(0,200);
errorHandler(data);}finally 
{
currentEntry = '';}};}




function unguard(func){
if(!func.__wrapper){
func.__wrapper = function(){
try{
return func.apply(this,arguments);}
catch(e) {

window.setTimeout(function(){
throw e;},
0);
return false;}};}



return func.__wrapper;}


function wrap(real,entry){
return function(fn,delay){
var name=entry + ':' + (
currentEntry || '[global]') + ':' + (
fn.name || 
'[anonymous]' + (arguments.callee.caller.name?
'(' + arguments.callee.caller.name + ')':
''));
return real(wrapFunction(fn,'entry',name),delay);};}



if(handleError){

setTimeout = wrap(setTimeout,'setTimeout');
setInterval = wrap(setInterval,'setInterval');
wrapFunction.setWrapper(guard,'entry');}



var ErrorHandler={
guard:guard,
unguard:unguard};


module.exports = ErrorHandler;},null);

__d('sdk.Insights',['sdk.Impressions'],function $module_sdk_Insights(global,require,requireDynamic,requireLazy,module,exports,Impressions){if(require.__markCompiled)require.__markCompiled();



var Insights={
TYPE:{
NOTICE:'notice',
WARNING:'warn',
ERROR:'error'},

CATEGORY:{
DEPRECATED:'deprecated',
APIERROR:'apierror'},



log:function(type,category,content){
var payload={
source:'jssdk',
type:type,
category:category,
payload:content};


Impressions.log(
113,
payload);},



impression:Impressions.impression};


module.exports=Insights;},null);

__d('FB',['sdk.Auth','JSSDKCssConfig','dotAccess','sdk.domReady','sdk.DOM','sdk.ErrorHandling','sdk.Content','DOMWrapper','GlobalCallback','sdk.Insights','Log','sdk.Runtime','sdk.Scribe','JSSDKConfig'],function $module_FB(global,require,requireDynamic,requireLazy,module,exports,Auth,CssConfig,dotAccess,domReady,DOM,ErrorHandling,Content,DOMWrapper,GlobalCallback,Insights,Log,Runtime,Scribe,SDKConfig){if(require.__markCompiled)require.__markCompiled();
















var externalInterface;
var apiWhitelist,apiWhitelistMode=dotAccess(SDKConfig,'api.mode');
var logged={};
externalInterface = window.FB = {};
var FB={};

if(__DEV__){
FB.require = require;
window._FB = FB;}





Log.level = __DEV__?3:0;


GlobalCallback.setPrefix('FB.__globalCallbacks');

var fbRoot=document.createElement('div');
DOMWrapper.setRoot(fbRoot);

domReady(function(){
Log.info('domReady');
Content.appendHidden(fbRoot);
if(CssConfig.rules){
DOM.addCssRules(CssConfig.rules,CssConfig.components);}});



Runtime.subscribe('AccessToken.change',function(value){
if(!value && Runtime.getLoginStatus() === 'connected'){


Auth.getLoginStatus(null,true);}});





if(dotAccess(SDKConfig,'api.whitelist.length')){
apiWhitelist = {};
ES(SDKConfig.api.whitelist,'forEach',true,function(key){
apiWhitelist[key] = 1;});}



function protect(fn,accessor,key,
context){
var exportMode;
if(/^_/.test(key)){
exportMode = 'hide';}else 
if(apiWhitelist && !apiWhitelist[accessor]){
exportMode = apiWhitelistMode;}


switch(exportMode){
case 'hide':
return;
case 'stub':
return function(){
Log.warn('The method FB.%s has been removed from the JS SDK.',
accessor);};

default:
return ErrorHandling.guard(function(){
if(exportMode === 'warn'){
Log.warn('The method FB.%s is not officially supported by ' + 
'Facebook and access to it will soon be removed.',accessor);
if(!logged.hasOwnProperty(accessor)){
Insights.log(
Insights.TYPE.WARNING,
Insights.CATEGORY.DEPRECATED,
'FB.' + accessor);



Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'Private method used',
extra:{args:accessor}});


logged[accessor] = true;}}



function unwrap(val){
if(ES('Array','isArray',false,val)){
return ES(val,'map',true,unwrap);}

if(val && typeof val === 'object' && val.__wrapped){

return val.__wrapped;}






return typeof val === 'function' && /^function/.test(val.toString())?
ErrorHandling.unguard(val):
val;}


var args=ES(Array.prototype.slice.call(arguments),'map',true,unwrap);

var result=fn.apply(context,args);
var facade;
var isPlainObject=true;

if(result && typeof result === 'object'){



facade = ES('Object','create',false,result);
facade.__wrapped = result;



for(var key in result) {
var property=result[key];
if(typeof property !== 'function' || key === 'constructor'){
continue;}

isPlainObject = false;
facade[key] = protect(property,accessor + ':' + key,key,result);}}



if(!isPlainObject){
return facade;}

return isPlainObject?
result:
facade;},
accessor);}}
















function provide(name,source){
var externalTarget=name?
dotAccess(externalInterface,name,true):
externalInterface;

ES(ES('Object','keys',false,source),'forEach',true,function(key){
var value=source[key];


if(typeof value === 'function'){
var accessor=(name?name + '.':'') + key;
var exportedProperty=protect(value,accessor,key,source);
if(exportedProperty){
externalTarget[key] = exportedProperty;}}else 

if(typeof value === 'object'){

accessor = (name?name + '.':'') + key;
if(apiWhitelist && apiWhitelist[accessor]){
externalTarget[key] = value;}}});}







Runtime.setSecure((function(){

var inCanvas=/iframe_canvas|app_runner/.test(window.name);
var inDialog=/dialog/.test(window.name);



if(location.protocol == 'https:' && (
window == top || !(inCanvas || inDialog))){



return true;}




if(/_fb_https?/.test(window.name)){
return ES(window.name,'indexOf',true,'_fb_https') != -1;}})());




ES('Object','assign',false,FB,{












provide:provide});



module.exports = FB;},null);

__d('ArgumentError',['ManagedError'],function $module_ArgumentError(global,require,requireDynamic,requireLazy,module,exports,ManagedError){if(require.__markCompiled)require.__markCompiled();



function ArgumentError(message,innerError){
ManagedError.prototype.constructor.apply(this,arguments);}

ArgumentError.prototype = new ManagedError();
ArgumentError.prototype.constructor = ArgumentError;

module.exports = ArgumentError;},null);

__d('CORSRequest',['wrapFunction','QueryString'],function $module_CORSRequest(global,require,requireDynamic,requireLazy,module,exports,wrapFunction,QueryString){if(require.__markCompiled)require.__markCompiled();




function createCORSRequest(method,url){
if(!self.XMLHttpRequest){
return null;}

var xhr=new XMLHttpRequest();
var noop=function(){};
if('withCredentials' in xhr){
xhr.open(method,url,true);
xhr.setRequestHeader(
'Content-type','application/x-www-form-urlencoded');}else 
if(self.XDomainRequest){
xhr = new XDomainRequest();
try{




xhr.open(method,url);







xhr.onprogress = xhr.ontimeout = noop;}
catch(accessDeniedError) {
return null;}}else 

{
return null;}


var wrapper={
send:function(data){
xhr.send(data);}};


var onload=wrapFunction(function(){
onload = noop;
if('onload' in wrapper){
wrapper.onload(xhr);}},

'entry','XMLHttpRequest:load');
var onerror=wrapFunction(function(){
onerror = noop;
if('onerror' in wrapper){
wrapper.onerror(xhr);}},

'entry','XMLHttpRequest:error');






xhr.onload = function(){
onload();};


xhr.onerror = function(){
onerror();};


xhr.onreadystatechange = function(){
if(xhr.readyState == 4){
if(xhr.status == 200){
onload();}else 
{
onerror();}}};




return wrapper;}


function execute(url,method,params,
cb){
params.suppress_http_code = 1;
var data=QueryString.encode(params);

if(method != 'post'){
url = QueryString.appendToUrl(url,data);
data = '';}


var request=createCORSRequest(method,url);
if(!request){
return false;}


request.onload = function(xhr){
cb(ES('JSON','parse',false,xhr.responseText));};

request.onerror = function(xhr){
if(xhr.responseText){
cb(ES('JSON','parse',false,xhr.responseText));}else 
{
cb({
error:{
type:'http',
message:'unknown error',
status:xhr.status}});}};




request.send(data);
return true;}


var CORSRequest={
execute:execute};

module.exports = CORSRequest;},null);

__d('FlashRequest',['DOMWrapper','Flash','GlobalCallback','QueryString','Queue'],function $module_FlashRequest(global,require,requireDynamic,requireLazy,module,exports,DOMWrapper,Flash,GlobalCallback,QueryString,Queue){if(require.__markCompiled)require.__markCompiled();







var flashQueue;
var requestCallbacks={};
var swfUrl;
var swf;

function initFlash(){
if(!swfUrl){
throw new Error('swfUrl has not been set');}


var initCallback=GlobalCallback.create(function(){
flashQueue.start(function(item){
var id=swf.execute(
item.method,
item.url,
item.body);

if(!id){
throw new Error('Could create request');}

requestCallbacks[id] = item.callback;});});




var requestCallback=GlobalCallback.create(function(id,
status,response){
var data;
try{
data = ES('JSON','parse',false,decodeURIComponent(response));}
catch(parseError) {
data = {
error:{
type:'SyntaxError',
message:parseError.message,
status:status,
raw:response}};}




requestCallbacks[id](data);
delete requestCallbacks[id];});


swf = Flash.embed(swfUrl,DOMWrapper.getRoot(),null,{
log:__DEV__?true:false,
initCallback:initCallback,
requestCallback:requestCallback});}











function execute(url,method,params,
cb){


params.suppress_http_code = 1;




if(!params.method){
params.method = method;}



var body=QueryString.encode(params);
if(method === 'get' && url.length + body.length < 2000){


url = QueryString.appendToUrl(url,body);
body = '';}else 
{
method = 'post';}



if(!flashQueue){
if(!Flash.isAvailable()){
return false;}

flashQueue = new Queue();
initFlash();}



flashQueue.enqueue({
method:method,
url:url,
body:body,
callback:cb});

return true;}


var FlashRequest={
setSwfUrl:function(swf_url){
swfUrl = swf_url;},

execute:execute};


module.exports = FlashRequest;},null);

__d('JSONPRequest',['DOMWrapper','GlobalCallback','QueryString'],function $module_JSONPRequest(global,require,requireDynamic,requireLazy,module,exports,DOMWrapper,GlobalCallback,QueryString){if(require.__markCompiled)require.__markCompiled();





var MAX_QUERYSTRING_LENGTH=2000;









function execute(url,method,params,
cb){
var script=document.createElement('script');

var callbackWrapper=function(response){
callbackWrapper = function(){};
GlobalCallback.remove(params.callback);
cb(response);
script.parentNode.removeChild(script);};


params.callback = GlobalCallback.create(callbackWrapper);


if(!params.method){
params.method = method;}


url = QueryString.appendToUrl(url,params);
if(url.length > MAX_QUERYSTRING_LENGTH){
GlobalCallback.remove(params.callback);
return false;}



script.onerror = function(){
callbackWrapper({
error:{
type:'http',
message:'unknown error'}});};





var ensureCallbackCalled=function(){
setTimeout(function(){


callbackWrapper({
error:{
type:'http',
message:'unknown error'}});},


0);};

if(script.addEventListener){
script.addEventListener('load',ensureCallbackCalled,false);}else 
{
script.onreadystatechange = function(){
if(/loaded|complete/.test(this.readyState)){
ensureCallbackCalled();}};}




script.src = url;
DOMWrapper.getRoot().appendChild(script);
return true;}


var JSONPRequest={
execute:execute,
MAX_QUERYSTRING_LENGTH:MAX_QUERYSTRING_LENGTH};


module.exports = JSONPRequest;},null);

__d('flattenObject',[],function $module_flattenObject(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function flattenObject(obj){
var flat={};
for(var key in obj) {
if(obj.hasOwnProperty(key)){
var value=obj[key];
if(null === value || undefined === value){
continue;}else 
if(typeof value == 'string'){
flat[key] = value;}else 
{
flat[key] = ES('JSON','stringify',false,value);}}}


return flat;}


module.exports = flattenObject;},null);

__d('ApiClient',['ArgumentError','Assert','CORSRequest','FlashRequest','flattenObject','JSONPRequest','Log','ObservableMixin','QueryString','sprintf','sdk.URI','UrlMap','ApiClientConfig','invariant'],function $module_ApiClient(global,require,requireDynamic,requireLazy,module,exports,ArgumentError,Assert,CORSRequest,FlashRequest,flattenObject,JSONPRequest,Log,ObservableMixin,QueryString,sprintf,URI,UrlMap,ApiClientConfig,invariant){if(require.__markCompiled)require.__markCompiled();


















var accessToken;
var clientID;
var defaultParams;

var MAX_QUERYSTRING_LENGTH=JSONPRequest.MAX_QUERYSTRING_LENGTH;
var METHODS={
'get':true,
'post':true,
'delete':true,
'put':true};


var READONLYCALLS={
fql_query:true,
fql_multiquery:true,
friends_get:true,
notifications_get:true,
stream_get:true,
users_getinfo:true};


var defaultTransports=['jsonp','cors','flash'];


var batchCalls=[];
var batchCallbacks=[];
var scheduleId=null;

var currentlyExecutingRequests=0;
var requestQueue=[];
var maxConcurrentRequests=0;



var REQUESTS_PER_BATCH=50;




var DEFAULT_BATCH_APP_ID=105440539523;









function request(url,method,params,
cb){


var shouldQueueRequest=
maxConcurrentRequests !== 0 && 
currentlyExecutingRequests >= maxConcurrentRequests;

if(shouldQueueRequest){


requestQueue.push(function(){return request(url,method,params,cb);});
ApiClient.inform(
'request.queued',
url,
method,
params);

return;}


currentlyExecutingRequests++;

if(defaultParams){
params = ES('Object','assign',false,{},defaultParams,params);}


params.access_token = params.access_token || accessToken;
params.pretty = params.pretty || 0;

params = flattenObject(params);
var availableTransports={
jsonp:JSONPRequest,
cors:CORSRequest,
flash:FlashRequest};




var transports;
if(params.transport){
transports = [params.transport];
delete params.transport;}else 
{
transports = defaultTransports;}


for(var i=0;i < transports.length;i++) {
var transport=availableTransports[transports[i]];
var paramsCopy=ES('Object','assign',false,{},params);
if(transport.execute(url,method,paramsCopy,cb)){
return;}}



cb({
error:{
type:'no-transport',
message:'Could not find a usable transport for request'}});}




function inspect(callback,endpoint,method,
params,startTime,response){
if(response && response.error){
ApiClient.inform(
'request.error',
endpoint,
method,
params,
response,
ES('Date','now',false) - startTime);}



ApiClient.inform(
'request.complete',
endpoint,
method,
params,
response,
ES('Date','now',false) - startTime);



currentlyExecutingRequests--;
if(callback){
callback(response);}




var shouldExecuteQueuedRequest=
requestQueue.length > 0 && 
currentlyExecutingRequests < maxConcurrentRequests;
if(shouldExecuteQueuedRequest){
var nextRequest=requestQueue.shift();
nextRequest();}}







function parseCallDataFromArgs(args){
var path=args.shift();
Assert.isString(path,'Invalid path');
if(!/^https?/.test(path) && path.charAt(0) !== '/'){
path = '/' + path;}


var uri;
var argsMap={};

try{
uri = new URI(path);}
catch(e) {
throw new ArgumentError(e.message,e);}



ES(args,'forEach',true,function(arg){return argsMap[typeof arg] = arg;});

var method=(argsMap.string || 'get').toLowerCase();

Assert.isTrue(
METHODS.hasOwnProperty(method),
sprintf('Invalid method passed to ApiClient: %s',method));


var callback=argsMap['function'];
if(!callback){
Log.warn('No callback passed to the ApiClient');}


if(argsMap.object){
uri.addQueryData(flattenObject(argsMap.object));}


var params=uri.getQueryData();
params.method = method;

return {uri:uri,callback:callback,params:params};}

























function requestUsingGraph(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}var _parseCallDataFromArg=
parseCallDataFromArgs(args);var uri=_parseCallDataFromArg.uri;var callback=_parseCallDataFromArg.callback;var params=_parseCallDataFromArg.params;
var method=params.method;

if(requestIsTooLargeForGet(uri,method)){
method = 'post';}


var url=uri.getProtocol() && uri.getDomain()?
uri.setQueryData({}).toString():
UrlMap.resolve('graph') + uri.getPath();

ApiClient.inform('request.prepare',url,params);

request(
url,
method == 'get'?'get':'post',
params,ES(
inspect,'bind',true,null,callback,uri.getPath(),method,params,ES('Date','now',false)));}



function prepareBatchParams(args){var _parseCallDataFromArg2=
parseCallDataFromArgs(args);var uri=_parseCallDataFromArg2.uri;var callback=_parseCallDataFromArg2.callback;var method=_parseCallDataFromArg2.params.method;

var body;
var relative_url=uri.removeQueryData('method').toString();
if(method.toLowerCase() == 'post'){
body = QueryString.encode(uri.getQueryData());
relative_url = uri.setQueryData({}).toString();}


return {
body:body,
callback:callback,
method:method,
relative_url:relative_url};}






function scheduleBatchCall(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2 < _len2;_key2++) {args[_key2] = arguments[_key2];}var _prepareBatchParams=
prepareBatchParams(args);var body=_prepareBatchParams.body;var callback=_prepareBatchParams.callback;var method=_prepareBatchParams.method;var relative_url=_prepareBatchParams.relative_url;

var batchCall={
method:method,
relative_url:relative_url};


if(body){
batchCall.body = body;}


batchCalls.push(batchCall);
batchCallbacks.push(callback);



if(batchCalls.length == REQUESTS_PER_BATCH){
if(scheduleId){
clearTimeout(scheduleId);}

dispatchBatchCalls();}else 
if(!scheduleId){

scheduleId = setTimeout(dispatchBatchCalls,0);}}







function dispatchBatchCalls(){
!(
batchCalls.length > 0)?invariant(0,
'ApiClient: batchCalls is empty at dispatch.'):undefined;

!(
batchCalls.length === batchCallbacks.length)?invariant(0,
'ApiClient: Every batch call should have a callback'):undefined;




var copiedBatchCalls=batchCalls;
var copiedBatchCallbacks=batchCallbacks;

batchCalls = [];
batchCallbacks = [];
scheduleId = null;


if(copiedBatchCalls.length === 1){
var call=copiedBatchCalls[0];
var callback=copiedBatchCallbacks[0];


var body=call.body?QueryString.decode(call.body):null;

requestUsingGraph(
call.relative_url,
call.method,
body,
callback);

return;}


requestUsingGraph(
'/',
'POST',
{
batch:copiedBatchCalls,
include_headers:false,
batch_app_id:clientID || DEFAULT_BATCH_APP_ID},

function(response){
if(ES('Array','isArray',false,response)){
ES(response,'forEach',true,function(data,idx){
copiedBatchCallbacks[idx](ES('JSON','parse',false,data.body));});}else 

{
ES(copiedBatchCallbacks,'forEach',true,function(callback){return (
callback({error:{message:'Fatal: batch call failed.'}}));});}});}

















function requestUsingRest(params,cb){
Assert.isObject(params);
Assert.isString(params.method,'method missing');

if(!cb){
Log.warn('No callback passed to the ApiClient');}

var method=params.method.toLowerCase().replace('.','_');
params.format = 'json-strings';
params.api_key = clientID;

var domain=method in READONLYCALLS?'api_read':'api';
var url=UrlMap.resolve(domain) + '/restserver.php';
var inspector=ES(
inspect,'bind',true,null,cb,'/restserver.php','get',params,ES('Date','now',false));
request(url,'get',params,inspector);}


var ApiClient=ES('Object','assign',false,new ObservableMixin(),{
setAccessToken:function(access_token){
if(__DEV__){
if(accessToken && accessToken !== access_token){
console.error(
'You are overriding current access token, that means some other ' + 
'app is expecting different access token and you will probably ' + 
'break things. Please consider passing access_token directly to ' + 
'API parameters instead of overriding the global settings.');}}



accessToken = access_token;},

setAccessTokenForClientID:function(access_token,client_id){
if(accessToken && clientID && clientID !== client_id){
console.error(
'Not overriding access token since it was not ' + 
'initialized by your application.');}else 

{
accessToken = access_token;}},


getAccessToken:function(){
return accessToken;},

setClientID:function(client_id){
clientID = client_id;},

setDefaultParams:function(default_params){
defaultParams = default_params;},

setDefaultTransports:function(newDefaultTransports){
defaultTransports = newDefaultTransports;},

setMaxConcurrentRequests:function(value){
maxConcurrentRequests = value;},

getCurrentlyExecutingRequestCount:function(){
return currentlyExecutingRequests;},

getQueuedRequestCount:function(){
return requestQueue.length;},

rest:requestUsingRest,
graph:requestUsingGraph,
scheduleBatchCall:scheduleBatchCall,
prepareBatchParams:prepareBatchParams});


function requestIsTooLargeForGet(uri,method){
return uri.toString().length > MAX_QUERYSTRING_LENGTH && method === 'get';}



FlashRequest.setSwfUrl(ApiClientConfig.FlashRequest.swfUrl);

module.exports = ApiClient;},null);

__d('sdk.PlatformVersioning',['sdk.Runtime','ManagedError'],function $module_sdk_PlatformVersioning(global,require,requireDynamic,requireLazy,module,exports,Runtime,ManagedError){if(require.__markCompiled)require.__markCompiled();




var REGEX=/^v\d+\.\d\d?$/;

var PlatformVersioning={

REGEX:REGEX,

assertVersionIsSet:function(){
if(!Runtime.getVersion()){
throw new ManagedError('init not called with valid version');}},



assertValidVersion:function(version){
if(!REGEX.test(version)){
throw new ManagedError('invalid version specified');}}};





module.exports=PlatformVersioning;},null);

__d('sdk.api',['ApiClient','sdk.PlatformVersioning','sdk.Runtime','sdk.Scribe','sdk.URI','sdk.feature'],function $module_sdk_api(global,require,requireDynamic,requireLazy,module,exports,ApiClient,PlatformVersioning,Runtime,Scribe,URI,feature){if(require.__markCompiled)require.__markCompiled();








var shouldLogResponseError=feature('should_log_response_error',false);

var currentAccessToken;

Runtime.subscribe(
'ClientID.change',
function(value){return ApiClient.setClientID(value);});


Runtime.subscribe(
'AccessToken.change',
function(value){
currentAccessToken = value;
ApiClient.setAccessToken(value);});



ApiClient.setDefaultParams({
sdk:'joey'});



ApiClient.subscribe(
'request.complete',
function(endpoint,method,params,response){
var invalidateToken=false;
if(response && typeof response == 'object'){
if(response.error){
if(response.error == 'invalid_token' || 
response.error.type == 'OAuthException' && 
response.error.code == 190){
invalidateToken = true;}}else 

if(response.error_code){
if(response.error_code == '190'){
invalidateToken = true;}}}



if(invalidateToken && 
currentAccessToken === Runtime.getAccessToken()){

Runtime.setAccessToken(null);}});




ApiClient.subscribe(
'request.complete',
function(endpoint,method,params,response){
if((endpoint == '/me/permissions' && 
method === 'delete' || 
endpoint == '/restserver.php' && 
params.method == 'Auth.revokeAuthorization') && 
response === true){
Runtime.setAccessToken(null);}});





ApiClient.subscribe(
'request.error',
function(endpoint,method,params,response){
if(shouldLogResponseError && response.error.type === 'http'){
Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'transport',
extra:{
name:'transport',

message:ES('JSON','stringify',false,response.error)}});}});












function api(path){


if(typeof path === 'string'){
if(Runtime.getIsVersioned()){
PlatformVersioning.assertVersionIsSet();


if(!/https?/.test(path) && path.charAt(0) !== '/'){
path = '/' + path;}

path = new URI(path).setDomain(null).setProtocol(null).toString();


if(!PlatformVersioning.REGEX.
test(path.substring(1,ES(path,'indexOf',true,'/',1)))){
path = '/' + Runtime.getVersion() + path;}


var args=[path].concat(Array.prototype.slice.call(arguments,1));
ApiClient.graph.apply(ApiClient,args);}else 
{
ApiClient.graph.apply(ApiClient,arguments);}}else 

{
ApiClient.rest.apply(ApiClient,arguments);}}



module.exports = api;},null);

__d('legacy:fb.api',['FB','sdk.api'],function $module_legacy_fb_api(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,api){if(require.__markCompiled)require.__markCompiled();




FB.provide('',{
api:api});},3);

__d('resolveURI',[],function $module_resolveURI(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function resolveURI(uri){
if(!uri){
return window.location.href;}


uri = uri.replace(/&/g,'&amp;').
replace(/"/g,'&quot;');

var div=document.createElement('div');


div.innerHTML = '<a href="' + uri + '"></a>';

return div.firstChild.href;}


module.exports = resolveURI;},null);

__d('sdk.Canvas.Environment',['sdk.RPC'],function $module_sdk_Canvas_Environment(global,require,requireDynamic,requireLazy,module,exports,RPC){if(require.__markCompiled)require.__markCompiled();



function getPageInfo(appCallback){
RPC.remote.getPageInfo(function(response){
appCallback(response.result);});}



function scrollTo(x,y){
RPC.remote.scrollTo({x:x||0,y:y||0});}



RPC.stub('getPageInfo');
RPC.stub('scrollTo');

var Environment={
getPageInfo:getPageInfo,
scrollTo:scrollTo};


module.exports=Environment;},null);

__d('sdk.fbt',[],function $module_sdk_fbt(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();




var fbt={
_:function(table){
if(__DEV__){
if(arguments.length>1){
throw 'You are not using a simple string';}}


return typeof table==='string'?table:table[0];}};


module.exports=fbt;},null);

__d('sdk.Dialog',['sdk.Canvas.Environment','sdk.Content','sdk.DOM','DOMEventListener','ObservableMixin','sdk.Runtime','Type','sdk.UA','sdk.fbt','sdk.feature'],function $module_sdk_Dialog(global,require,requireDynamic,requireLazy,module,exports,CanvasEnvironment,Content,DOM,DOMEventListener,ObservableMixin,Runtime,Type,UA,fbt,feature){if(require.__markCompiled)require.__markCompiled();












var MARGIN_SURROUNDING=30;

var MAX_HEIGHT_MOBILE=590;
var MAX_WIDTH_MOBILE=500;
var MAX_HEIGHT_DESKTOP=240;
var MAX_WIDTH_DESKTOP=575;

function getMobileSize(){

if(feature('dialog_resize_refactor',false)){
var info=DOM.getViewportInfo();
if(info.height && info.width){
return {
width:Math.min(info.width,MAX_WIDTH_MOBILE),
height:Math.min(info.height,MAX_HEIGHT_MOBILE)};}}



return null;}
















var SdkDialog=Type.extend({
constructor:function SdkDialog(id,display){
this.parent();
this.id = id;
this.display = display;

this._e2e = {};

if(!Dialog._dialogs){
Dialog._dialogs = {};
Dialog._addOrientationHandler();}

Dialog._dialogs[id] = this;
this.trackEvent('init');},


trackEvent:function(name,time){
if(this._e2e[name]){
return this;}

this._e2e[name] = time || ES('Date','now',false);
if(name == 'close'){

this.inform('e2e:end',this._e2e);}

return this;},


trackEvents:function(events){
if(typeof events === 'string'){
events = ES('JSON','parse',false,events);}

for(var key in events) {
if(events.hasOwnProperty(key)){
this.trackEvent(key,events[key]);}}


return this;}},

ObservableMixin);

var Dialog={
newInstance:function(id,display){
return new SdkDialog(id,display);},





_dialogs:null,
_lastYOffset:0,
_overlayListeners:[],






_loaderEl:null,






_overlayEl:null,






_stack:[],






_active:null,






_forceTabletStyle:null,






_closeOnOverlayTap:null,






_positionDialogAtTopWhenPortrait:null,






get:function(id){
return Dialog._dialogs[id];},











_findRoot:function(node){
while(node) {
if(DOM.containsCss(node,'fb_dialog')){
return node;}

node = node.parentNode;}},



_createWWWLoader:function(width){
width = width?width:460;
return Dialog.create({
content:
'<div class="dialog_title">' + 
'  <a id="fb_dialog_loader_close">' + 
'    <div class="fb_dialog_close_icon"></div>' + 
'  </a>' + 
'  <span>Facebook</span>' + 
'  <div style="clear:both;"></div>' + 
'</div>' + 
'<div class="dialog_content"></div>' + 
'<div class="dialog_footer"></div>',
width:width});},



_createMobileLoader:function(){





var content;
if(UA.nativeApp()){
content = '<div class="dialog_header"></div>';}else 
if(Dialog.isTabletStyle()){
content = 
'<div class="overlayLoader">' + 
'<div id="fb_dialog_loader_spinner"></div>' + 
'<a id="fb_dialog_loader_close" href="#">' + fbt._("Cancel") + 

'</a>' + 
'</div>';}else 
{
content = '<div class="dialog_header">' + 
'<table>' + 
'  <tbody>' + 
'    <tr>' + 
'      <td class="header_left">' + 
'        <label class="touchable_button">' + 
'          <input type="submit" value="' + fbt._("Cancel") + 

'"' + 
'            id="fb_dialog_loader_close"/>' + 
'        </label>' + 
'      </td>' + 
'      <td class="header_center">' + 
'        <div>' + 
'         ' + fbt._("Loading...") + 

'        </div>' + 
'      </td>' + 
'      <td class="header_right">' + 
'      </td>' + 
'    </tr>' + 
'  </tbody>' + 
'</table>' + 
'</div>';}

return Dialog.create({
classes:'loading' + (Dialog.isTabletStyle()?' centered':''),
content:content});},



_restoreBodyPosition:function(){
var body=document.body;
if(Dialog.isTabletStyle()){
DOM.removeCss(body,'fb_reposition');}else 
{
DOM.removeCss(body,'fb_hidden');}},



_setDialogOverlayStyle:function(){
if(!Dialog._overlayEl){
return;}


var view=DOM.getViewportInfo();


Dialog._overlayEl.style.minHeight = view.height || view.width?
view.height + 'px':
null;
Dialog._overlayEl.style.top = view.scrollTop?
view.scrollTop + 'px':
null;},


_showTabletOverlay:function(onClickForClose){
if(!Dialog.isTabletStyle()){
return;}

if(!Dialog._overlayEl){
Dialog._overlayEl = document.createElement('div');
Dialog._overlayEl.setAttribute('id','fb_dialog_ipad_overlay');
Content.append(Dialog._overlayEl,null);}

Dialog._setDialogOverlayStyle();


if(Dialog._closeOnOverlayTap){
var clickTimer=null;

var listener=DOMEventListener.add(
Dialog._overlayEl,
'click',
function(){
if(clickTimer !== null){
clearTimeout(clickTimer);
clickTimer = null;
onClickForClose();}

clickTimer = setTimeout(function(){clickTimer = null;},5000);});


Dialog._overlayListeners.push(listener);}

Dialog._overlayEl.className = '';},


_hideTabletOverlay:function(){
if(Dialog.isTabletStyle()){
Dialog._overlayEl.className = 'hidden';
ES(Dialog._overlayListeners,'forEach',true,function(listener){return listener.remove();});
Dialog._overlayListeners = [];}},










showLoader:function(cb,width){




if(!cb){
cb = function(){};}


var onClick=function(){
Dialog._hideLoader();
Dialog._restoreBodyPosition();
Dialog._hideTabletOverlay();
cb();};


Dialog._showTabletOverlay(onClick);

if(!Dialog._loaderEl){
Dialog._loaderEl = Dialog._findRoot(UA.mobile()?
Dialog._createMobileLoader():
Dialog._createWWWLoader(width));}


var loaderClose=document.getElementById('fb_dialog_loader_close');

if(loaderClose){
DOM.removeCss(loaderClose,'fb_hidden');
var listener=DOMEventListener.add(
loaderClose,
'click',
onClick);

Dialog._overlayListeners.push(listener);}


Dialog._makeActive(Dialog._loaderEl);},


setCloseOnOverlayTap:function(val){
Dialog._closeOnOverlayTap = !!val;},


setPositionDialogAtTopWhenPortrait:function(val){
Dialog._positionDialogAtTopWhenPortrait = !!val;},






_hideLoader:function(){
if(Dialog._loaderEl && Dialog._loaderEl == Dialog._active){
Dialog._loaderEl.style.top = '-10000px';}},









_makeActive:function(el){
Dialog._setDialogSizes();
Dialog._lowerActive();
Dialog._active = el;
if(Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)){
CanvasEnvironment.getPageInfo(function(pageInfo){
Dialog._centerActive(pageInfo);});}


Dialog._centerActive();},





_lowerActive:function(){
if(!Dialog._active){
return;}

Dialog._active.style.top = '-10000px';
Dialog._active = null;},







_removeStacked:function(dialog){
Dialog._stack = ES(Dialog._stack,'filter',true,function(node){
return node != dialog;});},







_centerActive:function(pageInfo){
var dialog=Dialog._active;
if(!dialog){
return;}


var view=DOM.getViewportInfo();
var width=parseInt(dialog.offsetWidth,10);
var height=parseInt(dialog.offsetHeight,10);
var left=view.scrollLeft + (view.width - width) / 2;








var minTop=(view.height - height) / 2.5;
if(left < minTop){
minTop = left;}

var maxTop=view.height - height - minTop;


var top=(view.height - height) / 2;
if(pageInfo){
top = pageInfo.scrollTop - pageInfo.offsetTop + 
(pageInfo.clientHeight - height) / 2;}



if(top < minTop){
top = minTop;}else 
if(top > maxTop){
top = maxTop;}



top += view.scrollTop;



if(UA.mobile()){



















var paddingHeight=100;



var body=document.body;
if(Dialog.isTabletStyle()){
paddingHeight += (view.height - height) / 2;
DOM.addCss(body,'fb_reposition');}else 
{
DOM.addCss(body,'fb_hidden');
if(feature('dialog_resize_refactor',false)){
body.style.width = 'auto';}

top = 10000;}


var paddingDivs=DOM.getByClass('fb_dialog_padding',dialog);
if(paddingDivs.length){
paddingDivs[0].style.height = paddingHeight + 'px';}}



dialog.style.left = (left > 0?left:0) + 'px';
dialog.style.top = (top > 0?top:0) + 'px';


if(Dialog._positionDialogAtTopWhenPortrait && 
window.innerWidth < window.innerHeight){
top = (view.height - height) * 0.1 + view.scrollTop;
dialog.style.top = top + 'px';}},



_setDialogSizes:function(){var skipHeight=arguments.length <= 0 || arguments[0] === undefined?false:arguments[0];
if(!UA.mobile()){
return;}

for(var id in Dialog._dialogs) {
if(Dialog._dialogs.hasOwnProperty(id)){
var iframe=document.getElementById(id);
if(iframe){
iframe.style.width = Dialog.getDefaultSize().width + 'px';
if(!skipHeight){
iframe.style.height = Dialog.getDefaultSize().height + 'px';}}}}},






getDefaultSize:function(){
if(UA.mobile()){
var size=getMobileSize();
if(size){
if(DOM.getViewportInfo().width <= size.width){
size.width = DOM.getViewportInfo().width - MARGIN_SURROUNDING;}

if(DOM.getViewportInfo().height <= size.height){
size.height = DOM.getViewportInfo().height - MARGIN_SURROUNDING;}

return size;}




if(UA.ipad()){
return {
width:MAX_WIDTH_MOBILE,
height:MAX_HEIGHT_MOBILE};}



if(UA.android()){


return {
width:screen.availWidth,
height:screen.availHeight};}else 

{
var width=window.innerWidth;
var height=window.innerHeight;
var isLandscape=width / height > 1.2;











return {
width:width,
height:Math.max(height,
isLandscape?screen.width:screen.height)};}}



return {width:MAX_WIDTH_DESKTOP,height:MAX_HEIGHT_DESKTOP};},






_handleOrientationChange:function(){

var screenWidth=feature('dialog_resize_refactor',false)?
DOM.getViewportInfo().width:
screen.availWidth;

Dialog._availScreenWidth = screenWidth;

if(Dialog.isTabletStyle()){

Dialog._setDialogSizes(true);
Dialog._centerActive();
Dialog._setDialogOverlayStyle();}else 
{
var width=Dialog.getDefaultSize().width;
for(var id in Dialog._dialogs) {
if(Dialog._dialogs.hasOwnProperty(id)){

var iframe=document.getElementById(id);
if(iframe){
iframe.style.width = width + 'px';}}}}},









_addOrientationHandler:function(){
if(!UA.mobile()){
return;}




var event_name="onorientationchange" in window?
'orientationchange':
'resize';

Dialog._availScreenWidth = feature('dialog_resize_refactor',false)?
DOM.getViewportInfo().width:
screen.availWidth;

DOMEventListener.add(
window,
event_name,


function(e){return setTimeout(Dialog._handleOrientationChange,50);});},




















create:function(opts){
opts = opts || {};

var 
dialog=document.createElement('div'),
contentRoot=document.createElement('div'),
className='fb_dialog';


if(opts.closeIcon && opts.onClose){
var closeIcon=document.createElement('a');
closeIcon.className = 'fb_dialog_close_icon';
closeIcon.onclick = opts.onClose;
dialog.appendChild(closeIcon);}


className += ' ' + (opts.classes || '');


if(UA.ie()){
className += ' fb_dialog_legacy';
ES(['vert_left',
'vert_right',
'horiz_top',
'horiz_bottom',
'top_left',
'top_right',
'bottom_left',
'bottom_right'],'forEach',true,function(name){
var span=document.createElement('span');
span.className = 'fb_dialog_' + name;
dialog.appendChild(span);});}else 

{
className += UA.mobile()?
' fb_dialog_mobile':
' fb_dialog_advanced';}


if(opts.content){
Content.append(opts.content,contentRoot);}

dialog.className = className;
var width=parseInt(opts.width,10);
if(!isNaN(width)){
dialog.style.width = width + 'px';}

contentRoot.className = 'fb_dialog_content';

dialog.appendChild(contentRoot);
if(UA.mobile()){
var padding=document.createElement('div');
padding.className = 'fb_dialog_padding';
dialog.appendChild(padding);}


Content.append(dialog);

if(opts.visible){
Dialog.show(dialog);}

return contentRoot;},










show:function(dialog){
var root=Dialog._findRoot(dialog);
if(root){
Dialog._removeStacked(root);
Dialog._hideLoader();
Dialog._makeActive(root);
Dialog._stack.push(root);
if('fbCallID' in dialog){
Dialog.get(dialog.fbCallID).
inform('iframe_show').
trackEvent('show');}}},










hide:function(dialog){
var root=Dialog._findRoot(dialog);
Dialog._hideLoader();
if(root == Dialog._active){
Dialog._lowerActive();
Dialog._restoreBodyPosition();
Dialog._hideTabletOverlay();
if('fbCallID' in dialog){
Dialog.get(dialog.fbCallID).
inform('iframe_hide').
trackEvent('hide');}}},









remove:function(dialog){
dialog = Dialog._findRoot(dialog);
if(dialog){
var is_active=Dialog._active == dialog;
Dialog._removeStacked(dialog);
if(is_active){
Dialog._hideLoader();
if(Dialog._stack.length > 0){
Dialog.show(Dialog._stack.pop());}else 
{
Dialog._lowerActive();
Dialog._restoreBodyPosition();
Dialog._hideTabletOverlay();}}else 

if(Dialog._active === null && Dialog._stack.length > 0){
Dialog.show(Dialog._stack.pop());}








setTimeout(function(){
dialog.parentNode.removeChild(dialog);},
3000);}},








isActive:function(node){
var root=Dialog._findRoot(node);
return root && root === Dialog._active;},


setForceTabletStyle:function(val){
Dialog._forceTabletStyle = !!val;},


isTabletStyle:function(){
var result;
if(!UA.mobile()){
return false;}

if(Dialog._forceTabletStyle){
return true;}

if(feature('dialog_resize_refactor',false)){
var size=getMobileSize();
result = size && (
size.height >= MAX_HEIGHT_MOBILE || size.width >= MAX_WIDTH_MOBILE);}else 
{
result = !!UA.ipad();}

return result;}};



module.exports = Dialog;},null);

__d('sdk.Frictionless',['sdk.Auth','sdk.api','sdk.Event','sdk.Dialog'],function $module_sdk_Frictionless(global,require,requireDynamic,requireLazy,module,exports,Auth,api,Event,Dialog){if(require.__markCompiled)require.__markCompiled();






var Frictionless={



_allowedRecipients:{},

_useFrictionless:false,




_updateRecipients:function(){
Frictionless._allowedRecipients = {};
api('/me/apprequestformerrecipients',function(response){
if(!response || response.error){
return;}

ES(response.data,'forEach',true,function(recipient){
Frictionless._allowedRecipients[recipient.recipient_id] = true;});});},







init:function(){
Frictionless._useFrictionless = true;
Auth.getLoginStatus(function(response){
if(response.status == 'connected'){
Frictionless._updateRecipients();}});


Event.subscribe('auth.login',function(login){
if(login.authResponse){
Frictionless._updateRecipients();}});},











_processRequestResponse:function(cb,hidden)
{
return function(params){
var updated=params && params.updated_frictionless;
if(Frictionless._useFrictionless && updated){


Frictionless._updateRecipients();}


if(params){
if(!hidden && params.frictionless){
Dialog._hideLoader();
Dialog._restoreBodyPosition();
Dialog._hideIPadOverlay();}

delete params.frictionless;
delete params.updated_frictionless;}


cb && cb(params);};},










isAllowed:function(user_ids){
if(!user_ids){
return false;}


if(typeof user_ids === 'number'){
return user_ids in Frictionless._allowedRecipients;}

if(typeof user_ids === 'string'){
user_ids = user_ids.split(',');}

user_ids = ES(user_ids,'map',true,function(s){return ES(String(s),'trim',true);});

var allowed=true;
var has_user_ids=false;
ES(user_ids,'forEach',true,function(user_id){
allowed = allowed && user_id in Frictionless._allowedRecipients;
has_user_ids = true;});

return allowed && has_user_ids;}};



Event.subscribe('init:post',function(options){
if(options.frictionlessRequests){
Frictionless.init();}});




module.exports = Frictionless;},null);

__d('sdk.Native',['Log','sdk.UA'],function $module_sdk_Native(global,require,requireDynamic,requireLazy,module,exports,Log,UA){if(require.__markCompiled)require.__markCompiled();




var NATIVE_READY_EVENT='fbNativeReady';

var Native={







onready:function(func){

if(!UA.nativeApp()){
Log.error('FB.Native.onready only works when the page is rendered ' + 
'in a WebView of the native Facebook app. Test if this is the ' + 
'case calling FB.UA.nativeApp()');
return;}






if(window.__fbNative && !this.nativeReady){
ES('Object','assign',false,this,window.__fbNative);}



if(this.nativeReady){
func();}else 
{


var nativeReadyCallback=function(evt){
window.removeEventListener(NATIVE_READY_EVENT,nativeReadyCallback);
this.onready(func);};

window.addEventListener(NATIVE_READY_EVENT,nativeReadyCallback,false);}}};




module.exports = Native;},null);

__d('sdk.UIServer',['sdk.Auth','sdk.Content','sdk.DOM','sdk.Dialog','sdk.Event','sdk.Frictionless','Log','sdk.Native','QueryString','sdk.RPC','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap','sdk.XD','createObjectFrom','sdk.feature','sdk.fbt','flattenObject','sdk.getContextType','guid','insertIframe','resolveURI'],function $module_sdk_UIServer(global,require,requireDynamic,requireLazy,module,exports,Auth,Content,DOM,Dialog,Event,Frictionless,Log,Native,QueryString,RPC,Runtime,SDKConfig,UA,UrlMap,XD,createObjectFrom,feature,fbt,flattenObject,getContextType,guid,insertIframe,resolveURI){if(require.__markCompiled)require.__markCompiled();


























var MobileIframeable={
transform:function(call){



if(call.params.display === 'touch' && 
UIServer.canIframe(call.params) && 
window.postMessage)
{


call.params.channel = UIServer._xdChannelHandler(
call.id,
'parent');


if(!UA.nativeApp()){
call.params.in_iframe = 1;}

return call;}else 
{
return UIServer.genericTransform(call);}},


getXdRelation:function(params){
var display=params.display;
if(display === 'touch' && window.postMessage && params.in_iframe){



return 'parent';}

return UIServer.getXdRelation(params);}};



var Methods={
'stream.share':{
size:{width:670,height:340},
url:'sharer.php',
transform:function(call){
if(!call.params.u){
call.params.u = window.location.toString();}

call.params.display = 'popup';
return call;}},




'apprequests':{
transform:function(call){
call = MobileIframeable.transform(call);

call.params.frictionless = Frictionless && 
Frictionless._useFrictionless;
if(call.params.frictionless){

if(Frictionless.isAllowed(call.params.to)){




call.params.display = 'iframe';
call.params.in_iframe = true;

call.hideLoader = true;}



call.cb = Frictionless._processRequestResponse(
call.cb,
call.hideLoader);}




call.closeIcon = false;
return call;},

getXdRelation:MobileIframeable.getXdRelation},


'permissions.oauth':{
url:'dialog/oauth',
size:{width:UA.mobile()?null:475,
height:UA.mobile()?null:183},
transform:function(call){
if(!Runtime.getClientID()){
Log.error('FB.login() called before FB.init().');
return;}





if(Auth.getAuthResponse() && 
!call.params.scope && 
!call.params.auth_type){
Log.error('FB.login() called when user is already connected.');
call.cb && call.cb({status:Runtime.getLoginStatus(),
authResponse:Auth.getAuthResponse()});
return;}


var 
cb=call.cb,
id=call.id;
delete call.cb;

var responseTypes=ES('Object','keys',false,ES('Object','assign',false,
call.params.response_type?
createObjectFrom(call.params.response_type.split(',')):
{},
{token:true,signed_request:true})).
join(',');

if(call.params.display === 'async'){
ES('Object','assign',false,
call.params,{
client_id:Runtime.getClientID(),
origin:getContextType(),
response_type:responseTypes,
domain:location.hostname});


call.cb = Auth.xdResponseWrapper(
cb,Auth.getAuthResponse(),'permissions.oauth');}else 
{
ES('Object','assign',false,
call.params,{
client_id:Runtime.getClientID(),
redirect_uri:resolveURI(
UIServer.xdHandler(
cb,
id,
'opener',
Auth.getAuthResponse(),
'permissions.oauth')),
origin:getContextType(),
response_type:responseTypes,
domain:location.hostname});}



return call;}},



'auth.logout':{
url:'logout.php',
transform:function(call){
if(!Runtime.getClientID()){
Log.error('FB.logout() called before calling FB.init().');}else 
if(!Auth.getAuthResponse()){
Log.error('FB.logout() called without an access token.');}else 
{
call.params.next = UIServer.xdHandler(call.cb,
call.id,
'parent',
Auth.getAuthResponse(),
'logout');
return call;}}},




'login.status':{
url:'dialog/oauth',
transform:function(call){
var 
cb=call.cb,
id=call.id;
delete call.cb;
ES('Object','assign',false,call.params,{
client_id:Runtime.getClientID(),
redirect_uri:UIServer.xdHandler(cb,
id,
'parent',
Auth.getAuthResponse(),
'login_status'),
origin:getContextType(),
response_type:'token,signed_request,code',
domain:location.hostname});


return call;}},



'pay':{
size:{width:555,height:120},
connectDisplay:'popup'}};







var _dialogStates={};

function _trackRunState(cb,id){
_dialogStates[id] = true;
return function(response){
delete _dialogStates[id];
cb(response);};}







function shouldEnforceSingleDialogInstance(params){

if(!feature('should_force_single_dialog_instance',true)){
return false;}



var name=params.method.toLowerCase();


if(name === 'pay' && params.display === 'async'){
return true;}


return false;}


var UIServer={



Methods:Methods,

_loadedNodes:{},
_defaultCb:{},
_resultToken:'"xxRESULTTOKENxx"',










genericTransform:function(call){
if(call.params.display == 'dialog' || call.params.display == 'iframe'){
ES('Object','assign',false,call.params,{
display:'iframe',
channel:UIServer._xdChannelHandler(call.id,'parent.parent')},
true);}


return call;},






checkOauthDisplay:function(params){
var scope=params.scope || params.perms || Runtime.getScope();
if(!scope){
return params.display;}


var scopes=scope.split(/\s|,/g);
for(var ii=0;ii < scopes.length;ii++) {
if(!SDKConfig.initSitevars.iframePermissions[ES(scopes[ii],'trim',true)]){
return 'popup';}}



return params.display;},










prepareCall:function(params,cb){
var 
name=params.method.toLowerCase(),
method=UIServer.Methods.hasOwnProperty(name)?ES('Object','assign',false,
{},UIServer.Methods[name]):
{},
id=guid(),
useSSL=Runtime.getSecure() || 
name !== 'auth.status' && name != 'login.status';


ES('Object','assign',false,params,{
app_id:Runtime.getClientID(),
locale:Runtime.getLocale(),
sdk:'joey',
access_token:useSSL && Runtime.getAccessToken() || undefined});



if(name === 'share' || name === 'share_open_graph'){
if(params.iframe_test){
method = ES('Object','assign',false,{},MobileIframeable);}}




params.display = UIServer.getDisplayMode(method,params);


if(!method.url){
method.url = 'dialog/' + name;}


if((method.url == 'dialog/oauth' || 
method.url == 'dialog/permissions.request') && (
params.display == 'iframe' || 
params.display == 'touch' && params.in_iframe)){
params.display = UIServer.checkOauthDisplay(params);}




if(params.display == 'popup'){
delete params.access_token;}


if(Runtime.getIsVersioned() && method.url.substring(0,7) === 'dialog/'){
method.url = params.version + '/' + method.url;}


if(shouldEnforceSingleDialogInstance(params)){

if(_dialogStates[name]){
var errorMessage='Dialog "' + name + 
'" is trying to run more than once.';
Log.warn(errorMessage);
cb({error_code:-100,error_message:errorMessage});
return;}


cb = _trackRunState(cb,name);}



var call={
cb:cb,
id:id,
size:method.size || UIServer.getDefaultSize(),
url:UrlMap.resolve(params.display == 'touch'?'m':'www',useSSL) + 
'/' + method.url,
params:params,
name:name,
dialog:Dialog.newInstance(id,params.display)};



var transform=method.transform?
method.transform:
UIServer.genericTransform;
if(transform){
call = transform(call);


if(!call){
return;}}




if(params.display === 'touch' && params.in_iframe){







call.params.parent_height = window.innerHeight;}




var getXdRelationFn=method.getXdRelation || UIServer.getXdRelation;
var relation=getXdRelationFn(call.params);
if(!(call.id in UIServer._defaultCb) && 
!('next' in call.params) && 
!('redirect_uri' in call.params)){
call.params.next = UIServer._xdResult(
call.cb,
call.id,
relation,
true);}


if(relation === 'parent'){
ES('Object','assign',false,call.params,{
channel_url:UIServer._xdChannelHandler(id,'parent.parent')},
true);}



call = UIServer.prepareParams(call);

return call;},


prepareParams:function(call){




if(call.params.display !== 'async'){
delete call.params.method;}



call.params = flattenObject(call.params);
var encodedQS=QueryString.encode(call.params);




if(!UA.nativeApp() && 
UIServer.urlTooLongForIE(call.url + '?' + encodedQS)){
call.post = true;}else 
if(encodedQS){
call.url += '?' + encodedQS;}


return call;},


urlTooLongForIE:function(fullURL){
return UA.ie() && UA.ie() <= 8 && fullURL.length > 2048;},









getDisplayMode:function(method,params){
if(params.display === 'hidden' || 
params.display === 'none'){
return params.display;}


var canvas=Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) || 
Runtime.isEnvironment(Runtime.ENVIRONMENTS.PAGETAB);
if(canvas && !params.display){
return 'async';}



if(UA.mobile() || params.display === 'touch'){
return 'touch';}



if(params.display == 'iframe' || params.display == 'dialog'){
if(!UIServer.canIframe(params)){
Log.error('"dialog" mode can only be used when the user is connected.');
return 'popup';}}



if(method.connectDisplay && !canvas){
return method.connectDisplay;}



return params.display || (UIServer.canIframe(params)?'dialog':'popup');},


canIframe:function(params){
if(Runtime.getAccessToken()){
return true;}



if(UA.mobile() && Runtime.getLoggedIntoFacebook()){
return !!params.iframe_test;}

return false;},








getXdRelation:function(params){
var display=params.display;
if(display === 'popup' || display === 'touch'){
return 'opener';}

if(display === 'dialog' || display === 'iframe' || 
display === 'hidden' || display === 'none'){
return 'parent';}

if(display === 'async'){
return 'parent.frames[' + window.name + ']';}},









popup:function(call){

var 
_screenX=typeof window.screenX != 'undefined'?
window.screenX:
window.screenLeft,
screenY=typeof window.screenY != 'undefined'?
window.screenY:
window.screenTop,
outerWidth=typeof window.outerWidth != 'undefined'?
window.outerWidth:
document.documentElement.clientWidth,
outerHeight=typeof window.outerHeight != 'undefined'?
window.outerHeight:
document.documentElement.clientHeight - 22,



width=UA.mobile()?null:call.size.width,
height=UA.mobile()?null:call.size.height,
screenX=_screenX < 0?window.screen.width + _screenX:_screenX,
left=parseInt(screenX + (outerWidth - width) / 2,10),
top=parseInt(screenY + (outerHeight - height) / 2.5,10),
features=[];

if(width !== null){
features.push('width=' + width);}

if(height !== null){
features.push('height=' + height);}

features.push('left=' + left);
features.push('top=' + top);
features.push('scrollbars=1');
if(call.name == 'permissions.request' || 
call.name == 'permissions.oauth'){
features.push('location=1,toolbar=0');}

features = features.join(',');


var popup;
if(call.post){
popup = window.open('about:blank',call.id,features);
if(popup){
UIServer.setLoadedNode(call,popup,'popup');
Content.submitToTarget({
url:call.url,
target:call.id,
params:call.params});}}else 


{
popup = window.open(call.url,call.id,features);
if(popup){
UIServer.setLoadedNode(call,popup,'popup');}}




if(!popup){

return;}



if(call.id in UIServer._defaultCb){
UIServer._popupMonitor();}},



setLoadedNode:function(call,node,type){
if(type === 'iframe'){
node.fbCallID = call.id;}

node = {
node:node,
type:type,
fbCallID:call.id};

UIServer._loadedNodes[call.id] = node;},


getLoadedNode:function(call){
var id=typeof call == 'object'?call.id:call,
node=UIServer._loadedNodes[id];
return node?node.node:null;},







hidden:function(call){
call.className = 'FB_UI_Hidden';
call.root = Content.appendHidden('');
UIServer._insertIframe(call);},







iframe:function(call){
call.className = 'FB_UI_Dialog';
if(call.params.iframe_test){
Dialog.setForceTabletStyle(true);
Dialog.setCloseOnOverlayTap(true);
Dialog.setPositionDialogAtTopWhenPortrait(true);}

var onClose=function(){
var errorResult=ES('JSON','stringify',false,{

error_code:4201,
error_message:fbt._("User canceled the Dialog flow")});




UIServer._triggerDefault(call.id,errorResult);};

call.root = Dialog.create({
onClose:onClose,
closeIcon:call.closeIcon === undefined?true:call.closeIcon,
classes:Dialog.isTabletStyle()?'centered':''});

if(!call.hideLoader){
Dialog.showLoader(onClose,call.size.width);}

DOM.addCss(call.root,'fb_dialog_iframe');
UIServer._insertIframe(call);},








touch:function(call){
if(call.params && call.params.in_iframe){


if(call.ui_created){
Dialog.showLoader(function(){
UIServer._triggerDefault(call.id,null);},
0);}else 
{
UIServer.iframe(call);}}else 

if(UA.nativeApp() && !call.ui_created){


call.frame = call.id;
Native.onready(function(){






UIServer.setLoadedNode(
call,
Native.open(call.url + '#cb=' + call.frameName),
'native');});

UIServer._popupMonitor();}else 
if(!call.ui_created){

UIServer.popup(call);}},










async:function(call){
call.params.redirect_uri = location.protocol + '//' + 
location.host + location.pathname;
delete call.params.access_token;

RPC.remote.showDialog(
call.params,

function(response){
var result=response.result;

if(result && result.e2e){
var dialog=Dialog.get(call.id);
dialog.trackEvents(result.e2e);
dialog.trackEvent('close');
delete result.e2e;}

call.cb(result);});},




getDefaultSize:function(){
return Dialog.getDefaultSize();},







_insertIframe:function(call){



UIServer._loadedNodes[call.id] = false;
var activate=function(node){
if(call.id in UIServer._loadedNodes){
UIServer.setLoadedNode(call,node,'iframe');}};




if(call.post){
insertIframe({
url:'about:blank',
root:call.root,
className:call.className,
width:call.size.width,
height:call.size.height,
id:call.id,
onInsert:activate,
onload:function(node){
Content.submitToTarget({
url:call.url,
target:node.name,
params:call.params});}});}else 



{
insertIframe({
url:call.url,
root:call.root,
className:call.className,
width:call.size.width,
height:call.size.height,
id:call.id,
name:call.frameName,
onInsert:activate});}},









_handleResizeMessage:function(frame,data){
var node=UIServer.getLoadedNode(frame);
if(!node){
return;}


if(data.height){
node.style.height = data.height + 'px';}

if(data.width){
node.style.width = data.width + 'px';}


XD.inform(
'resize.ack',
data || {},
'parent.frames[' + node.name + ']');

if(!Dialog.isActive(node)){
Dialog.show(node);}else 
{
Dialog._centerActive();}},









_triggerDefault:function(id,result){
var data={frame:id};
if(result){
data.result = result;}

UIServer._xdRecv(
data,
UIServer._defaultCb[id] || function(){});},









_popupMonitor:function(){

var found;
for(var id in UIServer._loadedNodes) {

if(UIServer._loadedNodes.hasOwnProperty(id) && 
id in UIServer._defaultCb){
var node=UIServer._loadedNodes[id];
if(node.type != 'popup' && node.type != 'native'){
continue;}

var win=node.node;

try{

if(win.closed){
UIServer._triggerDefault(id,null);}else 
{
found = true;}}

catch(y) {}}}





if(found && !UIServer._popupInterval){

UIServer._popupInterval = setInterval(UIServer._popupMonitor,100);}else 
if(!found && UIServer._popupInterval){

clearInterval(UIServer._popupInterval);
UIServer._popupInterval = null;}},











_xdChannelHandler:function(frame,relation)
{
return XD.handler(function(data){
var node=UIServer.getLoadedNode(frame);
if(!node){
return;}


if(data.type == 'resize'){
UIServer._handleResizeMessage(frame,data);}else 
if(data.type == 'hide'){
Dialog.hide(node);}else 
if(data.type == 'rendered'){
var root=Dialog._findRoot(node);
Dialog.show(root);}else 
if(data.type == 'fireevent'){
Event.fire(data.event);}},

relation,true,null);},













_xdNextHandler:function(cb,frame,
relation,isDefault){
if(isDefault){
UIServer._defaultCb[frame] = cb;}


return XD.handler(function(data){
UIServer._xdRecv(data,cb);},
relation) + '&frame=' + frame;},










_xdRecv:function(data,cb){
var frame=UIServer.getLoadedNode(data.frame);
if(frame){
if(frame.close){

try{
frame.close();



if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent) && 
RegExp.$1 !== '5'){
window.focus();}

UIServer._popupCount--;}
catch(y) {}}else 


{

if(DOM.containsCss(frame,'FB_UI_Hidden')){


setTimeout(function(){

frame.parentNode.parentNode.removeChild(frame.parentNode);},
3000);}else 
if(DOM.containsCss(frame,'FB_UI_Dialog')){
Dialog.remove(frame);}}}




delete UIServer._loadedNodes[data.frame];
delete UIServer._defaultCb[data.frame];

if(data.e2e){
var dialog=Dialog.get(data.frame);
dialog.trackEvents(data.e2e);
dialog.trackEvent('close');
delete data.e2e;}

cb(data);},













_xdResult:function(cb,frame,target,
isDefault){
return (
UIServer._xdNextHandler(function(params){
cb && cb(params.result && 
params.result != UIServer._resultToken && ES('JSON','parse',false,
params.result));},
frame,target,isDefault) + 

'&result=' + encodeURIComponent(UIServer._resultToken));},



xdHandler:function(cb,frame,target,
authResponse,method){
return UIServer._xdNextHandler(
Auth.xdResponseWrapper(cb,authResponse,method),
frame,
target,
true);}};




RPC.stub('showDialog');
module.exports = UIServer;},null);

__d('sdk.ui',['Assert','sdk.Impressions','Log','sdk.PlatformVersioning','sdk.Runtime','sdk.UIServer','sdk.feature'],function $module_sdk_ui(global,require,requireDynamic,requireLazy,module,exports,Assert,Impressions,Log,PlatformVersioning,Runtime,UIServer,feature){if(require.__markCompiled)require.__markCompiled();
































































function ui(params,cb){
Assert.isObject(params);
Assert.maybeFunction(cb);

if(Runtime.getIsVersioned()){
PlatformVersioning.assertVersionIsSet();
if(params.version){
PlatformVersioning.assertValidVersion(params.version);}else 
{
params.version = Runtime.getVersion();}}



params = ES('Object','assign',false,{},params);
if(!params.method){
Log.error('"method" is a required parameter for FB.ui().');
return null;}


if(params.method == 'pay.prompt'){
params.method = 'pay';}


var method=params.method;

if(params.redirect_uri){
Log.warn('When using FB.ui, you should not specify a redirect_uri.');
delete params.redirect_uri;}



if((method == 'permissions.request' || method == 'permissions.oauth') && (
params.display == 'iframe' || params.display == 'dialog')){
params.display = UIServer.checkOauthDisplay(params);}


var enableE2E=feature('e2e_tracking',true);
if(enableE2E){

params.e2e = {};}

var call=UIServer.prepareCall(params,cb || function(){});
if(!call){
return null;}



var displayName=call.params.display;
if(displayName === 'dialog'){

displayName = 'iframe';}else 
if(displayName === 'none'){
displayName = 'hidden';}


var displayFn=UIServer[displayName];
if(!displayFn){
Log.error('"display" must be one of "popup", ' + 
'"dialog", "iframe", "touch", "async", "hidden", or "none"');
return null;}


if(enableE2E){
call.dialog.subscribe('e2e:end',function(events){
events.method = method;
events.display = displayName;
Log.debug('e2e: %s',ES('JSON','stringify',false,events));

Impressions.log(114,{
payload:events});});}



displayFn(call);
return call.dialog;}


module.exports = ui;},null);

__d('legacy:fb.auth',['sdk.Auth','sdk.Cookie','sdk.Event','FB','Log','sdk.Runtime','sdk.SignedRequest','sdk.ui'],function $module_legacy_fb_auth(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,Auth,Cookie,Event,FB,Log,Runtime,SignedRequest,ui){if(require.__markCompiled)require.__markCompiled();










FB.provide('',{

getLoginStatus:function(){
return Auth.getLoginStatus.apply(Auth,arguments);},


getAuthResponse:function(){
return Auth.getAuthResponse();},


getAccessToken:function(){
return Runtime.getAccessToken() || null;},


getUserID:function(){
return Runtime.getUserID() || Runtime.getCookieUserID();},


login:function(cb,opts){
if(opts && opts.perms && !opts.scope){
opts.scope = opts.perms;
delete opts.perms;
Log.warn('OAuth2 specification states that \'perms\' ' + 
'should now be called \'scope\'.  Please update.');}

var canvas=Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) || 
Runtime.isEnvironment(Runtime.ENVIRONMENTS.PAGETAB);
ui(babelHelpers['extends']({
method:'permissions.oauth',

display:canvas?
'async':
'popup',

domain:location.hostname},
opts || {}),

cb);},



logout:function(cb){
ui({method:'auth.logout',display:'hidden'},cb);}});



Auth.subscribe('logout',ES(Event.fire,'bind',true,Event,'auth.logout'));
Auth.subscribe('login',ES(Event.fire,'bind',true,Event,'auth.login'));
Auth.subscribe('authresponse.change',ES(Event.fire,'bind',true,Event,
'auth.authResponseChange'));
Auth.subscribe('status.change',ES(Event.fire,'bind',true,Event,'auth.statusChange'));

Event.subscribe('init:post',function(options){
if(options.status){
Auth.getLoginStatus();}

if(Runtime.getClientID()){
if(options.authResponse){
Auth.setAuthResponse(options.authResponse,'connected');}else 
if(Runtime.getUseCookie()){


var signedRequest=Cookie.loadSignedRequest(),parsedSignedRequest;
if(signedRequest){
try{
parsedSignedRequest = SignedRequest.parse(signedRequest);}
catch(e) {

Cookie.clearSignedRequestCookie();}

if(parsedSignedRequest && parsedSignedRequest.user_id){
Runtime.setCookieUserID(parsedSignedRequest.user_id);}}


Cookie.loadMeta();}}});},3);

__d('sdk.Canvas.IframeHandling',['DOMWrapper','sdk.RPC'],function $module_sdk_Canvas_IframeHandling(global,require,requireDynamic,requireLazy,module,exports,DOMWrapper,RPC){if(require.__markCompiled)require.__markCompiled();




var autoGrowTimer=null;
var autoGrowLastSize;

function getHeight(){
var document=DOMWrapper.getWindow().document;
var body=document.body,
docElement=document.documentElement,
bodyTop=Math.max(body.offsetTop,0),
docTop=Math.max(docElement.offsetTop,0),
bodyScroll=body.scrollHeight+bodyTop,
bodyOffset=body.offsetHeight+bodyTop,
docScroll=docElement.scrollHeight+docTop,
docOffset=docElement.offsetHeight+docTop;

return Math.max(bodyScroll,bodyOffset,docScroll,docOffset);}


function setSize(params){

if(typeof params!='object'){
params={};}

var minShrink=0,
minGrow=0;
if(!params.height){
params.height=getHeight();





minShrink=16;
minGrow=4;}


if(!params.frame){
params.frame=window.name||'iframe_canvas';}


if(autoGrowLastSize){
var oldHeight=autoGrowLastSize.height;
var dHeight=params.height-oldHeight;
if(dHeight<=minGrow&&dHeight>=-minShrink){
return false;}}


autoGrowLastSize=params;
RPC.remote.setSize(params);
return true;}


function setAutoGrow(on,interval){
if(interval===undefined&&typeof on==='number'){
interval=on;
on=true;}


if(on||on===undefined){
if(autoGrowTimer===null){


autoGrowTimer=setInterval(function(){
setSize();},
interval||100);}

setSize();}else 
{
if(autoGrowTimer!==null){
clearInterval(autoGrowTimer);
autoGrowTimer=null;}}}




RPC.stub('setSize');

var IframeHandling={
setSize:setSize,
setAutoGrow:setAutoGrow};


module.exports=IframeHandling;},null);

__d('sdk.Canvas.Navigation',['sdk.RPC'],function $module_sdk_Canvas_Navigation(global,require,requireDynamic,requireLazy,module,exports,RPC){if(require.__markCompiled)require.__markCompiled();






























function setUrlHandler(callback){
RPC.local.navigate=function(path){
callback({path:path});};

RPC.remote.setNavigationEnabled(true);}



RPC.stub('setNavigationEnabled');

var Navigation={
setUrlHandler:setUrlHandler};


module.exports=Navigation;},null);

__d('sdk.Canvas.Plugin',['Log','sdk.RPC','sdk.Runtime','sdk.UA','sdk.api'],function $module_sdk_Canvas_Plugin(global,require,requireDynamic,requireLazy,module,exports,Log,RPC,Runtime,UA,api){if(require.__markCompiled)require.__markCompiled();








var flashClassID='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000';
var unityClassID='CLSID:444785F1-DE89-4295-863A-D46C3A781394';
var devHidePluginCallback=null;









var osx=UA.osx() && UA.osx.getVersionParts();
var unityNeedsToBeHidden=!(osx && osx[0] > 10 && osx[1] > 10 && (
UA.chrome() >= 31 || 
UA.webkit() >= 537.71 || 
UA.firefox() >= 25));








function hideUnityElement(elem){
elem._hideunity_savedstyle = {};
elem._hideunity_savedstyle.left = elem.style.left;
elem._hideunity_savedstyle.position = elem.style.position;
elem._hideunity_savedstyle.width = elem.style.width;
elem._hideunity_savedstyle.height = elem.style.height;
elem.style.left = '-10000px';
elem.style.position = 'absolute';
elem.style.width = '1px';
elem.style.height = '1px';}









function showUnityElement(elem){
if(elem._hideunity_savedstyle){
elem.style.left = elem._hideunity_savedstyle.left;
elem.style.position = elem._hideunity_savedstyle.position;
elem.style.width = elem._hideunity_savedstyle.width;
elem.style.height = elem._hideunity_savedstyle.height;}}










function hideFlashElement(elem){
elem._old_visibility = elem.style.visibility;
elem.style.visibility = 'hidden';}









function showFlashElement(elem){
elem.style.visibility = elem._old_visibility || '';
delete elem._old_visibility;}


function isHideableFlashElement(elem){
var type=elem.type?elem.type.toLowerCase():null;
var isHideable=type === 'application/x-shockwave-flash' || 
elem.classid && elem.classid.toUpperCase() == flashClassID;

if(!isHideable){
return false;}




var keepvisibleRegex=/opaque|transparent/i;
if(keepvisibleRegex.test(elem.getAttribute('wmode'))){
return false;}


for(var j=0;j < elem.childNodes.length;j++) {
var node=elem.childNodes[j];
if(/param/i.test(node.nodeName) && /wmode/i.test(node.name) && 
keepvisibleRegex.test(node.value)){
return false;}}


return true;}


function isHideableUnityElement(elem){
var type=elem.type?elem.type.toLowerCase():null;
return type === 'application/vnd.unity' || 
elem.classid && elem.classid.toUpperCase() == unityClassID;}







function hidePluginCallback(params){
var candidates=ES('Array','from',false,
window.document.getElementsByTagName('object'));

candidates = candidates.concat(ES('Array','from',false,
window.document.getElementsByTagName('embed')));


var flashPresent=false;
var unityPresent=false;
ES(candidates,'forEach',true,function(elem){
var isFlashElement=isHideableFlashElement(elem);
var isUnityElement=unityNeedsToBeHidden && isHideableUnityElement(elem);
if(!isFlashElement && !isUnityElement){
return;}


flashPresent = flashPresent || isFlashElement;
unityPresent = unityPresent || isUnityElement;

var visibilityToggleCb=function(){
if(params.state === 'opened'){
if(isFlashElement){
hideFlashElement(elem);}else 
{
hideUnityElement(elem);}}else 

{
if(isFlashElement){
showFlashElement(elem);}else 
{
showUnityElement(elem);}}};




if(devHidePluginCallback){
Log.info('Calling developer specified callback');



var devArgs={state:params.state,elem:elem};
devHidePluginCallback(devArgs);
setTimeout(visibilityToggleCb,200);}else 
{
visibilityToggleCb();}});



if(Math.random() <= 1 / 1000){
var opts={
'unity':unityPresent,
'flash':flashPresent};

api(Runtime.getClientID() + '/occludespopups','post',opts);}}



RPC.local.hidePluginObjects = function(){
Log.info('hidePluginObjects called');
hidePluginCallback({state:'opened'});};

RPC.local.showPluginObjects = function(){
Log.info('showPluginObjects called');
hidePluginCallback({state:'closed'});};



RPC.local.showFlashObjects = RPC.local.showPluginObjects;
RPC.local.hideFlashObjects = RPC.local.hidePluginObjects;

function hidePluginElement(){
hideFlashElement();
hideUnityElement();}

function showPluginElement(){
showFlashElement();
showUnityElement();}


var Plugin={

_setHidePluginCallback:function(callback){
devHidePluginCallback = callback;},


hidePluginElement:hidePluginElement,
showPluginElement:showPluginElement};


module.exports = Plugin;},null);

__d('sdk.Canvas.Tti',['sdk.RPC','sdk.Runtime'],function $module_sdk_Canvas_Tti(global,require,requireDynamic,requireLazy,module,exports,RPC,Runtime){if(require.__markCompiled)require.__markCompiled();




function passAppTtiMessage(callback,messageName){
var params={
appId:Runtime.getClientID(),
time:ES('Date','now',false),
name:messageName};


var args=[params];
if(callback){
args.push(function(response){
callback(response.result);});}



RPC.remote.logTtiMessage.apply(null,args);}







function startTimer(){
passAppTtiMessage(null,'StartIframeAppTtiTimer');}










function stopTimer(callback){
passAppTtiMessage(callback,'StopIframeAppTtiTimer');}











function setDoneLoading(callback){
passAppTtiMessage(callback,'RecordIframeAppTti');}


RPC.stub('logTtiMessage');

var Tti={
setDoneLoading:setDoneLoading,
startTimer:startTimer,
stopTimer:stopTimer};


module.exports = Tti;},null);

__d('legacy:fb.canvas',['Assert','sdk.Canvas.Environment','sdk.Event','FB','sdk.Canvas.IframeHandling','sdk.Canvas.Navigation','sdk.Canvas.Plugin','sdk.RPC','sdk.Runtime','sdk.Canvas.Tti'],function $module_legacy_fb_canvas(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,Assert,Environment,Event,FB,IframeHandling,Navigation,Plugin,RPC,Runtime,Tti){if(require.__markCompiled)require.__markCompiled();












FB.provide('Canvas',{

setSize:function(params){
Assert.maybeObject(params,'Invalid argument');
return IframeHandling.setSize.apply(null,arguments);},

setAutoGrow:function(){
return IframeHandling.setAutoGrow.apply(null,arguments);},



getPageInfo:function(callback){
Assert.isFunction(callback,'Invalid argument');
return Environment.getPageInfo.apply(null,arguments);},

scrollTo:function(x,y){
Assert.maybeNumber(x,'Invalid argument');
Assert.maybeNumber(y,'Invalid argument');
return Environment.scrollTo.apply(null,arguments);},



setDoneLoading:function(callback){
Assert.maybeFunction(callback,'Invalid argument');
return Tti.setDoneLoading.apply(null,arguments);},

startTimer:function(){
return Tti.startTimer.apply(null,arguments);},

stopTimer:function(callback){
Assert.maybeFunction(callback,'Invalid argument');
return Tti.stopTimer.apply(null,arguments);},



getHash:function(callback){
Assert.isFunction(callback,'Invalid argument');
return Navigation.getHash.apply(null,arguments);},

setHash:function(hash){
Assert.isString(hash,'Invalid argument');
return Navigation.setHash.apply(null,arguments);},

setUrlHandler:function(callback){
Assert.isFunction(callback,'Invalid argument');
return Navigation.setUrlHandler.apply(null,arguments);}});




RPC.local.fireEvent = ES(Event.fire,'bind',true,Event);

Event.subscribe('init:post',function(options){
if(Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)){
Assert.isTrue(
!options.hideFlashCallback || !options.hidePluginCallback,
'cannot specify deprecated hideFlashCallback and new hidePluginCallback');

Plugin._setHidePluginCallback(
options.hidePluginCallback || 
options.hideFlashCallback);}});},3);

__d('legacy:fb.canvas-legacy',['Assert','FB','Log','sdk.Canvas.Tti'],function $module_legacy_fb_canvas_legacy(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,Assert,FB,Log,Tti){if(require.__markCompiled)require.__markCompiled();






FB.provide('CanvasInsights',{
setDoneLoading:function(callback){
Log.warn('Deprecated: use FB.Canvas.setDoneLoading');
Assert.maybeFunction(callback,'Invalid argument');
return Tti.setDoneLoading.apply(null,arguments);}});},3);

__d('sdk.Canvas.Prefetcher',['JSSDKCanvasPrefetcherConfig','sdk.Runtime','sdk.api'],function $module_sdk_Canvas_Prefetcher(global,require,requireDynamic,requireLazy,module,exports,CanvasPrefetcherConfig,Runtime,api){if(require.__markCompiled)require.__markCompiled();






var COLLECT={
AUTOMATIC:0,
MANUAL:1};


var sampleRate=CanvasPrefetcherConfig.sampleRate;
var blacklist=CanvasPrefetcherConfig.blacklist;
var collectionMode=COLLECT.AUTOMATIC;
var links=[];

function sample(){

var resourceFieldsByTag={
object:'data',
link:'href',
script:'src'};


if(collectionMode == COLLECT.AUTOMATIC){
ES(ES('Object','keys',false,resourceFieldsByTag),'forEach',true,function(tagName){
var propertyName=resourceFieldsByTag[tagName];
ES(ES('Array','from',false,document.getElementsByTagName(tagName)),'forEach',true,
function(tag){
if(tag[propertyName]){
links.push(tag[propertyName]);}});});}





if(links.length === 0){
return;}



api(Runtime.getClientID() + '/staticresources','post',{
urls:ES('JSON','stringify',false,links),
is_https:location.protocol === 'https:'});


links = [];}


function maybeSample(){
if(!Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS) || 
!Runtime.getClientID() || 
!sampleRate){
return;}


if(Math.random() > 1 / sampleRate || 
blacklist == '*' || ~ES(blacklist,'indexOf',true,Runtime.getClientID())){
return;}



setTimeout(sample,30000);}















function setCollectionMode(mode){
collectionMode = mode;}






function addStaticResource(url){
links.push(url);}


var CanvasPrefetcher={
COLLECT_AUTOMATIC:COLLECT.AUTOMATIC,
COLLECT_MANUAL:COLLECT.MANUAL,

addStaticResource:addStaticResource,
setCollectionMode:setCollectionMode,


_maybeSample:maybeSample};


module.exports = CanvasPrefetcher;},null);

__d('legacy:fb.canvas.prefetcher',['FB','sdk.Canvas.Prefetcher','sdk.Event','sdk.Runtime'],function $module_legacy_fb_canvas_prefetcher(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,CanvasPrefetcher,Event,Runtime){if(require.__markCompiled)require.__markCompiled();






FB.provide('Canvas.Prefetcher',CanvasPrefetcher);

Event.subscribe('init:post',function(options){
if(Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)){
CanvasPrefetcher._maybeSample();}});},3);

__d('legacy:fb.compat.ui',['FB','Log','sdk.ui','sdk.UIServer'],function $module_legacy_fb_compat_ui(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,Log,ui,UIServer){if(require.__markCompiled)require.__markCompiled();






FB.provide('',{
share:function(u){
Log.error('share() has been deprecated. Please use FB.ui() instead.');
ui({
display:'popup',
method:'stream.share',
u:u});},



publish:function(post,cb){
Log.error('publish() has been deprecated. Please use FB.ui() instead.');
post = post || {};
ui(babelHelpers['extends']({
display:'popup',
method:'stream.publish',
preview:1},
post || {}),
cb);},


addFriend:function(id,cb){
Log.error('addFriend() has been deprecated. Please use FB.ui() instead.');
ui({
display:'popup',
id:id,
method:'friend.add'},
cb);}});




UIServer.Methods['auth.login'] = UIServer.Methods['permissions.request'];},3);

__d("mergeArrays",[],function $module_mergeArrays(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function mergeArrays(target,source){
for(var i=0;i < source.length;i++) {
if(ES(target,"indexOf",true,source[i]) < 0){
target.push(source[i]);}}


return target;}

module.exports = mergeArrays;},null);

__d('safeEval',[],function $module_safeEval(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function safeEval(source,args){
if(source === null || typeof source === 'undefined'){
return;}

if(typeof source !== 'string'){
return source;}



if(/^\w+$/.test(source) && typeof window[source] === 'function'){
return window[source].apply(null,args || []);}



return Function('return eval("' + source.replace(/"/g,'\\"') + '");').
apply(null,args || []);}


module.exports = safeEval;},null);

__d('format',[],function $module_format(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function format(str,argsdotdot){
argsdotdot = Array.prototype.slice.call(arguments,1);
return str.replace(/\{(\d+)\}/g,function(_,index){
var value=argsdotdot[Number(index)];
return value === null || value === undefined?
'':
value.toString();});}


module.exports = format;},null);

__d('sdk.Waitable',['sdk.Model'],function $module_sdk_Waitable(global,require,requireDynamic,requireLazy,module,exports,Model){if(require.__markCompiled)require.__markCompiled();








var Waitable=Model.extend({





constructor:function(){
this.parent({Value:undefined});},







error:function(ex){
this.inform("error",ex);},



























wait:function(callback,errorHandler){

if(errorHandler){
this.subscribe('error',errorHandler);}


this.monitor('Value.change',ES(function(){
var value=this.getValue();
if(value !== undefined){

this.value = value;
callback(value);
return true;}},'bind',true,

this));}});



module.exports = Waitable;},null);

__d('sdk.Query',['format','safeEval','Type','sdk.Waitable'],function $module_sdk_Query(global,require,requireDynamic,requireLazy,module,exports,format,safeEval,Type,Waitable){if(require.__markCompiled)require.__markCompiled();























































function toFields(s){
return ES(s.split(','),'map',true,function(s){return ES(s,'trim',true);});}








function parseWhere(s){


var 
re=/^\s*(\w+)\s*=\s*(.*)\s*$/i.exec(s),
result,
value,
type='unknown';
if(re){

value = re[2];


if(/^(["'])(?:\\?.)*?\1$/.test(value)){


value = safeEval(value);
type = 'index';}else 
if(/^\d+\.?\d*$/.test(value)){
type = 'index';}}



if(type == 'index'){

result = {type:'index',key:re[1],value:value};}else 
{

result = {type:'unknown',value:s};}

return result;}







function encode(value){
return typeof value === 'string'?ES('JSON','stringify',false,
value):
value;}


var counter=1;

var Query=Waitable.extend({
constructor:function(){
this.parent();
this.name = 'v_' + counter++;},


hasDependency:function(value){
if(arguments.length){
this._hasDependency = value;}

return !!this._hasDependency;},








parse:function(args){
var 
fql=format.apply(null,args),
re=/^select (.*?) from (\w+)\s+where (.*)$/i.exec(fql);
this.fields = toFields(re[1]);
this.table = re[2];
this.where = parseWhere(re[3]);

for(var i=1;i < args.length;i++) {
if(Type.instanceOf(Query,args[i])){


args[i].hasDependency(true);}}



return this;},







toFql:function(){
var s='select ' + this.fields.join(',') + ' from ' + 
this.table + ' where ';
switch(this.where.type){
case 'unknown':
s += this.where.value;
break;
case 'index':
s += this.where.key + '=' + encode(this.where.value);
break;
case 'in':
if(this.where.value.length == 1){
s += this.where.key + '=' + encode(this.where.value[0]);}else 
{
s += this.where.key + ' in (' + 
ES(this.where.value,'map',true,encode).join(',') + ')';}

break;}

return s;},










toString:function(){
return '#' + this.name;}});



module.exports = Query;},null);

__d('sdk.Data',['sdk.api','sdk.ErrorHandling','mergeArrays','sdk.Query','safeEval','sdk.Waitable'],function $module_sdk_Data(global,require,requireDynamic,requireLazy,module,exports,api,ErrorHandling,mergeArrays,Query,safeEval,Waitable){if(require.__markCompiled)require.__markCompiled();





























var Data={








































































query:function(template,data){
var query=new Query().parse(Array.prototype.slice.call(arguments));
Data.queue.push(query);
Data._waitToProcess();
return query;},



































































waitOn:function(dependencies,callback){
var 
result=new Waitable(),
count=dependencies.length;



if(typeof callback == 'string'){
var s=callback;
callback = ErrorHandling.unguard(function(){return safeEval(s);});}


ES(dependencies,'forEach',true,function(item){
item.monitor('Value.change',function(){
var done=false;
if(Data._getValue(item) !== undefined){

item.value = item.getValue();
count--;
done = true;}

if(count === 0){
var value=callback(ES(dependencies,'map',true,Data._getValue));
result.setValue(value !== undefined?value:true);}

return done;});});


return result;},







process:function(token){
Data._process(token);},








_getValue:function(item){
return item instanceof Waitable?
item.getValue():
item;},












_selectByIndex:function(fields,table,name,
value){
var query=new Query();
query.fields = fields;
query.table = table;
query.where = {type:'index',key:name,value:value};
Data.queue.push(query);
Data._waitToProcess();
return query;},






_waitToProcess:function(){
if(Data.timer < 0){
Data.timer = setTimeout(function(){
Data._process();},
10);}},








_process:function(token){
Data.timer = -1;

var 
mqueries={},
q=Data.queue;

if(!q.length){
return;}


Data.queue = [];

for(var i=0;i < q.length;i++) {
var item=q[i];
if(item.where.type == 'index' && !item.hasDependency()){
Data._mergeIndexQuery(item,mqueries);}else 
{
mqueries[item.name] = item;}}




var params={q:{}};
for(var key in mqueries) {
if(mqueries.hasOwnProperty(key)){
params.q[key] = mqueries[key].toFql();}}



if(token){
params.access_token = token;}


api('/fql','GET',params,function(result){
if(result.error){
ES(ES('Object','keys',false,mqueries),'forEach',true,function(key){
mqueries[key].error(new Error(result.error.message));});}else 

{
ES(result.data,'forEach',true,function(o){
mqueries[o.name].setValue(o.fql_result_set);});}});},









_mergeIndexQuery:function(item,mqueries){
var key=item.where.key,
value=item.where.value;

var name='index_' + item.table + '_' + key;
var master=mqueries[name];
if(!master){
master = mqueries[name] = new Query();
master.fields = [key];
master.table = item.table;
master.where = {type:'in',key:key,value:[]};}



mergeArrays(master.fields,item.fields);
mergeArrays(master.where.value,[value]);


master.wait(function(r){
item.setValue(ES(r,'filter',true,function(x){
return x[key] == value;}));});},




timer:-1,
queue:[]};


module.exports = Data;},null);

__d('legacy:fb.data',['FB','sdk.Data'],function $module_legacy_fb_data(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,Data){if(require.__markCompiled)require.__markCompiled();



FB.provide('Data',Data);},3);

__d('legacy:fb.event',['FB','sdk.Event','sdk.Runtime','sdk.Scribe','sdk.feature'],function $module_legacy_fb_event(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,Event,Runtime,Scribe,feature){if(require.__markCompiled)require.__markCompiled();








var eventsToLog=[];
var logScheduleId=null;
var logTimeout=feature('event_subscriptions_log',false);

FB.provide('Event',{
subscribe:function(name,cb){
if(logTimeout){
eventsToLog.push(name);



if(!logScheduleId){
logScheduleId = setTimeout(function(){

Scribe.log('jssdk_error',{
appId:Runtime.getClientID(),
error:'EVENT_SUBSCRIPTIONS_LOG',
extra:{
line:0,
name:'EVENT_SUBSCRIPTIONS_LOG',
script:'N/A',
stack:'N/A',
message:eventsToLog.sort().join(',')}});



eventsToLog.length = 0;
logScheduleId = null;},

logTimeout);}}


return Event.subscribe(name,cb);},


unsubscribe:ES(Event.unsubscribe,'bind',true,Event)});},3);

__d('legacy:fb.event-legacy',['FB','sdk.Event'],function $module_legacy_fb_event_legacy(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,Event){if(require.__markCompiled)require.__markCompiled();




FB.provide('Event',{
clear:ES(Event.clear,'bind',true,Event),
fire:ES(Event.fire,'bind',true,Event),
monitor:ES(Event.monitor,'bind',true,Event)});


FB.provide('EventProvider',Event);},3);

__d('legacy:fb.frictionless',['FB','sdk.Frictionless'],function $module_legacy_fb_frictionless(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,Frictionless){if(require.__markCompiled)require.__markCompiled();



FB.provide('Frictionless',Frictionless);},3);

__d('sdk.init',['sdk.Cookie','sdk.ErrorHandling','sdk.Event','sdk.Impressions','Log','ManagedError','sdk.PlatformVersioning','QueryString','sdk.Runtime','sdk.URI','sdk.feature'],function $module_sdk_init(global,require,requireDynamic,requireLazy,module,exports,Cookie,ErrorHandling,Event,Impressions,Log,ManagedError,PlatformVersioning,QueryString,Runtime,URI,feature){if(require.__markCompiled)require.__markCompiled();




















function parseAppId(appId){
var looksValid=
typeof appId == 'number' && appId > 0 || 
typeof appId == 'string' && /^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(appId);
if(looksValid){
return appId.toString();}

Log.warn('Invalid App Id: Must be a number or numeric string representing ' + 
'the application id.');
return null;}


















function init(options){
if(Runtime.getInitialized()){
Log.warn(
'FB.init has already been called - this could indicate a problem');}



if(Runtime.getIsVersioned()){

if(Object.prototype.toString.call(options) !== '[object Object]'){
throw new ManagedError('Invalid argument');}


if(options.authResponse){
Log.warn('Setting authResponse is not supported');}


if(!options.version){

options.version = new URI(location.href).getQueryData().sdk_version;}


PlatformVersioning.assertValidVersion(options.version);
Runtime.setVersion(options.version);}else 
{

if(/number|string/.test(typeof options)){
Log.warn('FB.init called with invalid parameters');
options = {apiKey:options};}


options = ES('Object','assign',false,{
status:true},
options || {});}



var appId=parseAppId(options.appId || options.apiKey);
if(appId !== null){
Runtime.setClientID(appId);}


if('scope' in options){
Runtime.setScope(options.scope);}


if(options.cookie){
Runtime.setUseCookie(true);
if(typeof options.cookie === 'string'){
Cookie.setDomain(options.cookie);}}



if(options.kidDirectedSite){
Runtime.setKidDirectedSite(true);}


Runtime.setInitialized(true);


if(feature('js_sdk_impression_on_load',true)){

Impressions.log(115,{});}


Event.fire('init:post',options);}





setTimeout(function(){


var pattern=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;
ES(ES('Array','from',false,fb_fif_window.document.getElementsByTagName('script')),'forEach',true,
function(script){
if(script.src){
var match=pattern.exec(script.src);
if(match){
var opts=QueryString.decode(match[2]);
for(var key in opts) {
if(opts.hasOwnProperty(key)){
var val=opts[key];
if(val == '0'){
opts[key] = 0;}}}




init(opts);}}});






if(window.fbAsyncInit && !window.fbAsyncInit.hasRun){
window.fbAsyncInit.hasRun = true;
ErrorHandling.unguard(window.fbAsyncInit)();}},

0);

module.exports = init;},null);

__d('legacy:fb.init',['FB','sdk.init'],function $module_legacy_fb_init(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,init){if(require.__markCompiled)require.__markCompiled();




FB.provide('',{
init:init});},3);

__d('legacy:fb.json',['FB','ManagedError'],function $module_legacy_fb_json(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,ManagedError){if(require.__markCompiled)require.__markCompiled();







FB.provide('JSON',{
stringify:function(obj){
try{
return ES('JSON','stringify',false,obj);}
catch(e) {
throw new ManagedError(e.message,e);}},


parse:function(str){
try{
return ES('JSON','parse',false,str);}
catch(e) {
throw new ManagedError(e.message,e);}}});},3);

__d('legacy:fb.ua',['FB','sdk.UA'],function $module_legacy_fb_ua(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,UA){if(require.__markCompiled)require.__markCompiled();



FB.provide('UA',{
nativeApp:UA.nativeApp});},3);

__d('legacy:fb.ui',['FB','sdk.ui'],function $module_legacy_fb_ui(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,FB,ui){if(require.__markCompiled)require.__markCompiled();




FB.provide('',{
ui:ui});},3);

__d("runOnce",[],function $module_runOnce(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function runOnce(func){
var run,ret;
return function(){
if(!run){
run=true;
ret=func();}

return ret;};}



module.exports=runOnce;},null);

__d('XFBML',['Assert','sdk.DOM','Log','ObservableMixin','sdk.UA','runOnce'],function $module_XFBML(global,require,requireDynamic,requireLazy,module,exports,Assert,DOM,Log,ObservableMixin,UA,runOnce){if(require.__markCompiled)require.__markCompiled();










var xfbml={};
var html5={};

var parseCount=0;

var XFBML=new ObservableMixin();

function propStr(object,property){
return ES(object[property] + '','trim',true);}


function nodeNameIE(element){


return element.scopeName?
element.scopeName + ':' + element.nodeName:
'';}


function xfbmlInfo(element){
return xfbml[propStr(element,'nodeName').toLowerCase()] || 
xfbml[nodeNameIE(element).toLowerCase()];}


function html5Info(element){
var classNames=ES(propStr(element,'className').split(/\s+/),'filter',true,
function(className){return html5.hasOwnProperty(className);});

if(classNames.length === 0){
return undefined;}















if(
element.getAttribute('fb-xfbml-state') || 
!element.childNodes || 
element.childNodes.length === 0 || 
element.childNodes.length === 1 && 
element.childNodes[0].nodeType === 3 || 
element.children.length === 1 && 
propStr(element.children[0],'className') === 'fb-xfbml-parse-ignore')
{
return html5[classNames[0]];}}



function attr(element){
var attrs={};
ES(ES('Array','from',false,element.attributes),'forEach',true,function(at){
attrs[propStr(at,'name')] = propStr(at,'value');});

return attrs;}


function convertSyntax(
element,ns,ln){
var replacement=document.createElement('div');
DOM.addCss(element,ns + '-' + ln);
ES(ES('Array','from',false,element.childNodes),'forEach',true,function(child){
replacement.appendChild(child);});

ES(ES('Array','from',false,element.attributes),'forEach',true,function(attribute){
replacement.setAttribute(attribute.name,attribute.value);});

element.parentNode.replaceChild(replacement,element);
return replacement;}


function parse(dom,callback,reparse){
Assert.isTrue(
dom && dom.nodeType && dom.nodeType === 1 && !!dom.getElementsByTagName,
'Invalid DOM node passed to FB.XFBML.parse()');
Assert.isFunction(callback,'Invalid callback passed to FB.XFBML.parse()');

var pc=++parseCount;
Log.info('XFBML Parsing Start %s',pc);





var count=1;
var tags=0;
var onrender=function(){
count--;
if(count === 0){
Log.info('XFBML Parsing Finish %s, %s tags found',pc,tags);
callback();
XFBML.inform('render',pc,tags);}

Assert.isTrue(count >= 0,'onrender() has been called too many times');};


ES(ES('Array','from',false,dom.getElementsByTagName('*')),'forEach',true,function(element){
if(!reparse && element.getAttribute('fb-xfbml-state')){

return;}

if(element.nodeType !== 1){

return;}


var info=xfbmlInfo(element) || html5Info(element);
if(!info){
return;}


if(UA.ie() < 9 && element.scopeName){


element = convertSyntax(element,info.xmlns,info.localName);}


count++;
tags++;
var renderer=
new info.ctor(element,info.xmlns,info.localName,attr(element));



renderer.subscribe('render',runOnce(function(){




element.setAttribute('fb-xfbml-state','rendered');
onrender();}));


var render=function(){


if(element.getAttribute('fb-xfbml-state') == 'parsed'){


XFBML.subscribe('render.queue',render);}else 
{
element.setAttribute('fb-xfbml-state','parsed');
renderer.process();}};



render();});


XFBML.inform('parse',pc,tags);

var timeout=30000;
setTimeout(function(){
if(count > 0){
Log.warn('%s tags failed to render in %s ms',count,timeout);}},

timeout);

onrender();}


XFBML.subscribe('render',function(){
var q=XFBML.getSubscribers('render.queue');
XFBML.clearSubscribers('render.queue');
ES(q,'forEach',true,function(r){r();});});




ES('Object','assign',false,XFBML,{

registerTag:function(info){
var fqn=info.xmlns + ':' + info.localName;
Assert.isUndefined(xfbml[fqn],fqn + ' already registered');

xfbml[fqn] = info;



html5[info.xmlns + '-' + info.localName] = info;},


parse:function(dom,cb){
parse(dom || document.body,cb || function(){},true);},


parseNew:function(){
parse(document.body,function(){},false);}});



module.exports = XFBML;},null);

__d('PluginPipe',['sdk.Content','sdk.feature','guid','insertIframe','Miny','ObservableMixin','JSSDKPluginPipeConfig','sdk.Runtime','sdk.UA','UrlMap','XFBML'],function $module_PluginPipe(global,require,requireDynamic,requireLazy,module,exports,Content,feature,guid,insertIframe,Miny,ObservableMixin,PluginPipeConfig,Runtime,UA,UrlMap,XFBML){if(require.__markCompiled)require.__markCompiled();












var PluginPipe=new ObservableMixin();

var threshold=PluginPipeConfig.threshold;
var queued=[];

function isEnabled(){
return !!(feature('plugin_pipe',false) && 
Runtime.getSecure() !== undefined && (
UA.chrome() || UA.firefox()) && 
PluginPipeConfig.enabledApps[Runtime.getClientID()]);}


function insertPlugins(){
var q=queued;
queued = [];

if(q.length <= threshold){
ES(q,'forEach',true,function(plugin){
insertIframe(plugin.config);});

return;}


var count=q.length + 1;
function onrender(){
count--;
if(count === 0){
insertPipe(q);}}



ES(q,'forEach',true,function(plugin){
var config={};
for(var key in plugin.config) {
config[key] = plugin.config[key];}

config.url = UrlMap.resolve('www',Runtime.getSecure()) + 
'/plugins/plugin_pipe_shell.php';
config.onload = onrender;
insertIframe(config);});


onrender();}


XFBML.subscribe('parse',insertPlugins);

function insertPipe(plugins){
var root=document.createElement('span');
Content.appendHidden(root);

var params={};
ES(plugins,'forEach',true,function(plugin){
params[plugin.config.name] = {
plugin:plugin.tag,
params:plugin.params};});



var raw=ES('JSON','stringify',false,params);
var miny=Miny.encode(raw);

ES(plugins,'forEach',true,function(plugin){
var frame=document.getElementsByName(plugin.config.name)[0];
frame.onload = plugin.config.onload;});


var url=UrlMap.resolve('www',Runtime.getSecure()) + '/plugins/pipe.php';
var name=guid();

insertIframe({
url:'about:blank',
root:root,
name:name,
className:'fb_hidden fb_invisible',
onload:function(){
Content.submitToTarget({
url:url,
target:name,
params:{
plugins:miny.length < raw.length?miny:raw}});}});}





ES('Object','assign',false,PluginPipe,{
add:function(plugin){
var enabled=isEnabled();
enabled && queued.push({
config:plugin._config,
tag:plugin._tag,
params:plugin._params});

return enabled;}});



module.exports = PluginPipe;},null);

__d('IframePlugin',['sdk.Auth','sdk.DOM','sdk.Event','Log','ObservableMixin','sdk.PlatformVersioning','PluginPipe','QueryString','sdk.Runtime','Type','sdk.UA','sdk.URI','UrlMap','sdk.XD','sdk.createIframe','sdk.feature','guid','resolveURI'],function $module_IframePlugin(global,require,requireDynamic,requireLazy,module,exports,Auth,DOM,Event,Log,ObservableMixin,PlatformVersioning,PluginPipe,QueryString,Runtime,Type,UA,URI,UrlMap,XD,createIframe,feature,guid,resolveURI){if(require.__markCompiled)require.__markCompiled();





















var baseParams={
skin:'string',
font:'string',
width:'px',
height:'px',
ref:'string',
color_scheme:'string'};


function resize(elem,width,height){
if(width || width === 0){
if(width === '100%'){
elem.style.width = '100%';}else 
{
elem.style.width = width + 'px';}}



if(height || height === 0){
elem.style.height = height + 'px';}}



function resizeBubbler(pluginID){
return function(msg){
var message={width:msg.width,height:msg.height,pluginID:pluginID};
Event.fire('xfbml.resize',message);};}



var types={

string:function(value){
return value;},

bool:function(value){
return value?/^(?:true|1|yes|on)$/i.test(value):undefined;},

url:function(value){
return resolveURI(value);},

url_maybe:function(value){
return value?resolveURI(value):value;},

hostname:function(value){
return value || window.location.hostname;},

px:function(value){
return (/^(\d+)(?:px)?$/.test(value)?parseInt(RegExp.$1,10):undefined);},

text:function(value){
return value;}};



function getVal(attr,key){
var val=
attr[key] || 
attr[key.replace(/_/g,'-')] || 
attr[key.replace(/_/g,'')] || 
attr['data-' + key] || 
attr['data-' + key.replace(/_/g,'-')] || 
attr['data-' + key.replace(/_/g,'')] || 
undefined;
return val;}


function validate(defn,elem,attr,
params){
ES(ES('Object','keys',false,defn),'forEach',true,function(key){
if(defn[key] == 'text' && !attr[key]){
attr[key] = elem.textContent || elem.innerText || '';
elem.setAttribute(key,attr[key]);}

params[key] = types[defn[key]](getVal(attr,key));});}





function parse(dim){
if(dim === '100%'){
return '100%';}


return dim || dim === '0' || dim === 0?parseInt(dim,10):undefined;}


function collapseIframe(iframe){
if(iframe){
resize(iframe,0,0);}}




var IframePlugin=Type.extend({
constructor:function(
elem,
ns,
tag,
attr)
{
this.parent();
tag = tag.replace(/-/g,'_');

var pluginId=getVal(attr,'plugin_id');
this.subscribe('xd.resize',resizeBubbler(pluginId));
this.subscribe('xd.resize.flow',resizeBubbler(pluginId));

this.subscribe('xd.resize.flow',ES(function(message){
ES('Object','assign',false,this._iframeOptions.root.style,{
verticalAlign:'bottom',
overflow:''});

resize(
this._iframeOptions.root,
parse(message.width),
parse(message.height));

this.updateLift();
clearTimeout(this._timeoutID);},'bind',true,this));


this.subscribe('xd.resize',ES(function(message){
ES('Object','assign',false,this._iframeOptions.root.style,{
verticalAlign:'bottom',
overflow:''});

resize(
this._iframeOptions.root,
parse(message.width),
parse(message.height));

resize(this._iframe,parse(message.width),parse(message.height));
this._isIframeResized = true;
this.updateLift();
clearTimeout(this._timeoutID);},'bind',true,this));


this.subscribe('xd.resize.iframe',ES(function(message){
if(
message.reposition === 'true' && 
feature('reposition_iframe',false))
{
this.reposition(parse(message.width));}


resize(this._iframe,parse(message.width),parse(message.height));
this._isIframeResized = true;
this.updateLift();
clearTimeout(this._timeoutID);},'bind',true,this));


this.subscribe('xd.sdk_event',function(message){
var data=ES('JSON','parse',false,message.data);
data.pluginID = pluginId;
Event.fire(message.event,data,elem);});


var secure=Runtime.getSecure() || window.location.protocol == 'https:';

var url=UrlMap.resolve('www',secure) + '/plugins/' + tag + '.php?';
var params={};
validate(this.getParams(),elem,attr,params);
validate(baseParams,elem,attr,params);

ES('Object','assign',false,params,{
app_id:Runtime.getClientID(),
locale:Runtime.getLocale(),
sdk:'joey',
kid_directed_site:Runtime.getKidDirectedSite(),
channel:XD.handler(ES(
function(msg){return this.inform('xd.' + msg.type,msg);},'bind',true,this),
'parent.parent',
true)});



params.container_width = elem.offsetWidth;

DOM.addCss(elem,'fb_iframe_widget');
var name=guid();
this.subscribe('xd.verify',function(msg){
XD.sendToFacebook(
name,{method:'xd/verify',params:ES('JSON','stringify',false,msg.token)});});


this.subscribe(
'xd.refreshLoginStatus',ES(function(){
Auth.removeLogoutState();
Auth.getLoginStatus(ES(
this.inform,'bind',true,this,'login.status'),
true);},'bind',true,this));



var flow=document.createElement('span');



ES('Object','assign',false,flow.style,{
verticalAlign:'top',
width:'0px',
height:'0px',
overflow:'hidden'});


this._element = elem;
this._ns = ns;
this._tag = tag;
this._params = params;
this._config = this.getConfig();
this._iframeOptions = {
root:flow,
url:url + QueryString.encode(params),
name:name,





width:this._config.mobile_fullsize && UA.mobile()?
void 0:
params.width || 1000,
height:params.height || 1000,
style:{
border:'none',
visibility:'hidden'},

title:this._ns + ':' + this._tag + ' Facebook Social Plugin',
onload:ES(function(){return this.inform('render');},'bind',true,this),
onerror:ES(function(){return collapseIframe(this._iframe);},'bind',true,this)};


if(this.isFluid()){
DOM.addCss(this._element,'fb_iframe_widget_fluid_desktop');
if(!params.width && this._config.full_width){
this._element.style.width = '100%';
this._iframeOptions.root.style.width = '100%';
this._iframeOptions.style.width = '100%';
this._params.container_width = this._element.offsetWidth;
this._iframeOptions.url = url + QueryString.encode(this._params);}}},





process:function(){
if(Runtime.getIsVersioned()){
PlatformVersioning.assertVersionIsSet();
var uri=new URI(this._iframeOptions.url);
this._iframeOptions.url = 
uri.setPath('/' + Runtime.getVersion() + uri.getPath()).toString();}



var params=ES('Object','assign',false,{},this._params);
delete params.channel;
var query=QueryString.encode(params);
if(this._element.getAttribute('fb-iframe-plugin-query') == query){
Log.info('Skipping render: %s:%s %s',this._ns,this._tag,query);
this.inform('render');
return;}

this._element.setAttribute('fb-iframe-plugin-query',query);

this.subscribe('render',ES(function(){
this._iframe.style.visibility = 'visible';




if(!this._isIframeResized){
collapseIframe(this._iframe);}},'bind',true,this));



while(this._element.firstChild) {
this._element.removeChild(this._element.firstChild);}

this._element.appendChild(this._iframeOptions.root);
var timeout=UA.mobile()?120:45;
this._timeoutID = setTimeout(ES(function(){
collapseIframe(this._iframe);
Log.warn(
'%s:%s failed to resize in %ss',
this._ns,
this._tag,
timeout);},'bind',true,this),

timeout * 1000);






if(!PluginPipe.add(this)){
this._iframe = createIframe(this._iframeOptions);}

if(UA.mobile()){
DOM.addCss(this._element,'fb_iframe_widget_fluid');

if(!this._iframeOptions.width){
ES('Object','assign',false,this._element.style,{
display:'block',
width:'100%',
height:'auto'});


ES('Object','assign',false,this._iframeOptions.root.style,{
width:'100%',
height:'auto'});


var iframeStyle={
height:'auto',
position:'static',
width:'100%'};


if(UA.iphone() || UA.ipad()){












ES('Object','assign',false,iframeStyle,{
width:'220px',
'min-width':'100%'});}



ES('Object','assign',false,this._iframe.style,iframeStyle);}}},







getConfig:function(){
return {};},


isFluid:function(){
var config=this.getConfig();
return config.fluid;},


reposition:function(newWidth){
var leftPosition=DOM.getPosition(this._iframe).x;
var screenWidth=DOM.getViewportInfo().width;

var oldWidth=parseInt(DOM.getStyle(this._iframe,'width'),10);

var params={};
if(
leftPosition + newWidth > screenWidth && 
leftPosition > newWidth)
{
this._iframe.style.left = 
parseInt(DOM.getStyle(this._iframe,'width'),10) - newWidth + 'px';

this._isRepositioned = true;
params.type = 'reposition';}else 

if(this._isRepositioned && oldWidth - newWidth !== 0){

this._iframe.style.left = '0px';
this._isRepositioned = false;
params.type = 'restore';}else 

{

return;}


XD.sendToFacebook(
this._iframe.name,
{
method:'xd/reposition',
params:ES('JSON','stringify',false,params)});},




updateLift:function(){
var same=
this._iframe.style.width === this._iframeOptions.root.style.width && 
this._iframe.style.height === this._iframeOptions.root.style.height;
DOM[same?'removeCss':'addCss'](this._iframe,'fb_iframe_widget_lift');}},

ObservableMixin);

IframePlugin.getVal = getVal;

IframePlugin.withParams = function(
params,
config)
{
return IframePlugin.extend({
getParams:function(){
return params;},


getConfig:function(){
return config?config:{};}});};




module.exports = IframePlugin;},null);

__d('PluginConfig',['sdk.feature'],function $module_PluginConfig(global,require,requireDynamic,requireLazy,module,exports,feature){if(require.__markCompiled)require.__markCompiled();



var PluginConfig={
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
fluid:feature('fluid_embed',false),
mobile_fullsize:true}};



module.exports=PluginConfig;},null);

__d('PluginTags',[],function $module_PluginTags(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var PluginTags={
composer:{
action_type:'string',
action_properties:'string'},


create_event_button:{},


follow:{
href:'url',
layout:'string',
show_faces:'bool'},


like:{
href:'url',
layout:'string',
show_faces:'bool',
share:'bool',
action:'string',

send:'bool'},


like_box:{
href:'string',
show_faces:'bool',
header:'bool',
stream:'bool',
force_wall:'bool',
show_border:'bool',

id:'string',
connections:'string',
profile_id:'string',
name:'string'},


page:{
href:'string',
hide_cta:'bool',
hide_cover:'bool',
small_header:'bool',
adapt_container_width:'bool',
show_facepile:'bool',
show_posts:'bool',
tabs:'string'},


messengerpreconfirmation:{
messenger_app_id:'string'},


messengeraccountconfirmation:{
messenger_app_id:'string',
state:'string'},


messengerbusinesslink:{
messenger_app_id:'string',
state:'string'},


messengertoggle:{
messenger_app_id:'string',
token:'string'},


messengermessageus:{
messenger_app_id:'string',
color:'string',
size:'string'},


page_events:{
href:'url'},


post:{
href:'url',
show_border:'bool'},


profile_pic:{
uid:'string',
linked:'bool',
href:'string',
size:'string',
facebook_logo:'bool'},


send:{
href:'url'},


send_to_mobile:{
max_rows:'string',
show_faces:'bool',
size:'string'}};




var aliases={
subscribe:'follow',
fan:'like_box',
likebox:'like_box'};


ES(ES('Object','keys',false,aliases),'forEach',true,function(key){
PluginTags[key] = PluginTags[aliases[key]];});


module.exports = PluginTags;},null);

__d('sdk.Arbiter',[],function $module_sdk_Arbiter(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var Arbiter={
BEHAVIOR_EVENT:'e',
BEHAVIOR_PERSISTENT:'p',
BEHAVIOR_STATE:'s'};

module.exports=Arbiter;},null);

__d('sdk.XFBML.Element',['sdk.DOM','Type','ObservableMixin'],function $module_sdk_XFBML_Element(global,require,requireDynamic,requireLazy,module,exports,DOM,Type,ObservableMixin){if(require.__markCompiled)require.__markCompiled();









var Element=Type.extend({






constructor:function(dom){
this.parent();
this.dom = dom;},


fire:function(){
this.inform.apply(this,arguments);},













getAttribute:function(name,defaultValue,
transform){
var value=DOM.getAttr(this.dom,name);
return value?
transform?
transform(value):
value:
defaultValue;},








_getBoolAttribute:function(name,defaultValue)
{
var value=DOM.getBoolAttr(this.dom,name);
return value === null?
defaultValue:
value;},








_getPxAttribute:function(name,defaultValue)
{
return this.getAttribute(name,defaultValue,function(s){
var value=parseInt(s,10);
return isNaN(value)?defaultValue:value;});},









_getLengthAttribute:function(name,defaultValue){
return this.getAttribute(name,defaultValue,function(s){
if(s === '100%'){
return s;}

var value=parseInt(s,10);
return isNaN(value)?defaultValue:value;});},












_getAttributeFromList:function(name,defaultValue,
allowed){
return this.getAttribute(name,defaultValue,function(s)
{
s = s.toLowerCase();
return ES(allowed,'indexOf',true,s) > -1?
s:
defaultValue;});},








isValid:function(){
for(var dom=this.dom;dom;dom = dom.parentNode) {
if(dom == document.body){
return true;}}},








clear:function(){
DOM.html(this.dom,'');}},


ObservableMixin);

module.exports = Element;},null);

__d('sdk.XFBML.IframeWidget',['sdk.Arbiter','sdk.Auth','sdk.Content','sdk.DOM','sdk.Event','sdk.XFBML.Element','guid','insertIframe','QueryString','sdk.Runtime','sdk.ui','UrlMap','sdk.XD'],function $module_sdk_XFBML_IframeWidget(global,require,requireDynamic,requireLazy,module,exports,Arbiter,Auth,Content,DOM,Event,Element,guid,insertIframe,QueryString,Runtime,ui,UrlMap,XD){if(require.__markCompiled)require.__markCompiled();


















var IframeWidget=Element.extend({






_iframeName:null,





_showLoader:true,






_refreshOnAuthChange:false,






_allowReProcess:false,






_fetchPreCachedLoader:false,








_visibleAfter:'load',






_widgetPipeEnabled:false,





_borderReset:false,






_repositioned:false,

















getUrlBits:function(){
throw new Error('Inheriting class needs to implement getUrlBits().');},
















setupAndValidate:function(){
return true;},






oneTimeSetup:function(){},









getSize:function(){},












getIframeName:function(){
return this._iframeName;},






getIframeTitle:function(){
return 'Facebook Social Plugin';},











getChannelUrl:function(){
if(!this._channelUrl){


var self=this;
this._channelUrl = XD.handler(function(message){
self.fire('xd.' + message.type,message);},
'parent.parent',true);}

return this._channelUrl;},







getIframeNode:function(){


return this.dom.getElementsByTagName('iframe')[0];},





arbiterInform:function(event,message,
behavior){
XD.sendToFacebook(
this.getIframeName(),{
method:event,
params:ES('JSON','stringify',false,message || {}),
behavior:behavior || Arbiter.BEHAVIOR_PERSISTENT});},



_arbiterInform:function(event,message,
behavior){
var relation='parent.frames["' + this.getIframeNode().name + '"]';
XD.inform(event,message,relation,behavior);},






getDefaultWebDomain:function(){
return UrlMap.resolve('www');},












process:function(force){

if(this._done){
if(!this._allowReProcess && !force){
return;}

this.clear();}else 
{
this._oneTimeSetup();}

this._done = true;

this._iframeName = this.getIframeName() || this._iframeName || guid();
if(!this.setupAndValidate()){

this.fire('render');
return;}



if(this._showLoader){
this._addLoader();}



DOM.addCss(this.dom,'fb_iframe_widget');
if(this._visibleAfter != 'immediate'){
DOM.addCss(this.dom,'fb_hide_iframes');}else 
{
this.subscribe('iframe.onload',ES(this.fire,'bind',true,this,'render'));}



var size=this.getSize() || {};
var url=this.getFullyQualifiedURL();

if(size.width == '100%'){
DOM.addCss(this.dom,'fb_iframe_widget_fluid');}


this.clear();
insertIframe({
url:url,
root:this.dom.appendChild(document.createElement('span')),
name:this._iframeName,
title:this.getIframeTitle(),
className:Runtime.getRtl()?'fb_rtl':'fb_ltr',
height:size.height,
width:size.width,
onload:ES(this.fire,'bind',true,this,'iframe.onload')});


this._resizeFlow(size);

this.loaded = false;
this.subscribe('iframe.onload',ES(function(){
this.loaded = true;


if(!this._isResizeHandled){
DOM.addCss(this.dom,'fb_hide_iframes');}},'bind',true,this));},












generateWidgetPipeIframeName:function(){
widgetPipeIframeCount++;
return 'fb_iframe_' + widgetPipeIframeCount;},












getFullyQualifiedURL:function(){



var url=this._getURL();
url += '?' + QueryString.encode(this._getQS());

if(url.length > 2000){

url = 'about:blank';
var onload=ES(function(){
this._postRequest();
this.unsubscribe('iframe.onload',onload);},'bind',true,
this);
this.subscribe('iframe.onload',onload);}


return url;},













_getWidgetPipeShell:function(){
return UrlMap.resolve('www') + '/common/widget_pipe_shell.php';},





_oneTimeSetup:function(){


this.subscribe('xd.resize',ES(this._handleResizeMsg,'bind',true,this));
this.subscribe('xd.resize',ES(this._bubbleResizeEvent,'bind',true,this));

this.subscribe('xd.resize.iframe',ES(this._resizeIframe,'bind',true,this));
this.subscribe('xd.resize.flow',ES(this._resizeFlow,'bind',true,this));
this.subscribe('xd.resize.flow',ES(this._bubbleResizeEvent,'bind',true,this));

this.subscribe('xd.refreshLoginStatus',function(){
Auth.getLoginStatus(function(){},true);});

this.subscribe('xd.logout',function(){
ui({method:'auth.logout',display:'hidden'},function(){});});



if(this._refreshOnAuthChange){
this._setupAuthRefresh();}



if(this._visibleAfter == 'load'){
this.subscribe('iframe.onload',ES(this._makeVisible,'bind',true,this));}


this.subscribe(
'xd.verify',ES(function(message){
this.arbiterInform('xd/verify',message.token);},'bind',true,
this));


this.oneTimeSetup();},





_makeVisible:function(){
this._removeLoader();
DOM.removeCss(this.dom,'fb_hide_iframes');
this.fire('render');},











_setupAuthRefresh:function(){
Auth.getLoginStatus(ES(function(response){
var lastStatus=response.status;
Event.subscribe('auth.statusChange',ES(function(response){
if(!this.isValid()){
return;}


if(lastStatus == 'unknown' || response.status == 'unknown'){
this.process(true);}

lastStatus = response.status;},'bind',true,
this));},'bind',true,
this));},





_handleResizeMsg:function(message){
if(!this.isValid()){
return;}

this._resizeIframe(message);
this._resizeFlow(message);

if(!this._borderReset){
this.getIframeNode().style.border = 'none';
this._borderReset = true;}


this._isResizeHandled = true;
this._makeVisible();},





_bubbleResizeEvent:function(message){
var filtered_message={
height:message.height,
width:message.width,
pluginID:this.getAttribute('plugin-id')};


Event.fire('xfbml.resize',filtered_message);},


_resizeIframe:function(message){
var iframe=this.getIframeNode();
if(message.reposition === "true"){
this._repositionIframe(message);}

message.height && (iframe.style.height = message.height + 'px');
message.width && (iframe.style.width = message.width + 'px');
this._updateIframeZIndex();},


_resizeFlow:function(message){
var span=this.dom.getElementsByTagName('span')[0];
message.height && (span.style.height = message.height + 'px');
message.width && (span.style.width = message.width + 'px');
this._updateIframeZIndex();},


_updateIframeZIndex:function(){
var span=this.dom.getElementsByTagName('span')[0];
var iframe=this.getIframeNode();
var identical=iframe.style.height === span.style.height && 
iframe.style.width === span.style.width;
var method=identical?'removeCss':'addCss';
DOM[method](iframe,'fb_iframe_widget_lift');},


_repositionIframe:function(message){
var iframe=this.getIframeNode();
var iframe_width=parseInt(DOM.getStyle(iframe,'width'),10);
var left=DOM.getPosition(iframe).x;
var screen_width=DOM.getViewportInfo().width;
var comment_width=parseInt(message.width,10);
if(left + comment_width > screen_width && 
left > comment_width){
iframe.style.left = iframe_width - comment_width + 'px';
this.arbiterInform('xd/reposition',{type:'horizontal'});
this._repositioned = true;}else 
if(this._repositioned){
iframe.style.left = '0px';
this.arbiterInform('xd/reposition',{type:'restore'});
this._repositioned = false;}},






_addLoader:function(){
if(!this._loaderDiv){
DOM.addCss(this.dom,'fb_iframe_widget_loader');
this._loaderDiv = document.createElement('div');
this._loaderDiv.className = 'FB_Loader';
this.dom.appendChild(this._loaderDiv);}},






_removeLoader:function(){
if(this._loaderDiv){
DOM.removeCss(this.dom,'fb_iframe_widget_loader');
if(this._loaderDiv.parentNode){
this._loaderDiv.parentNode.removeChild(this._loaderDiv);}

this._loaderDiv = null;}},









_getQS:function(){
return ES('Object','assign',false,{
api_key:Runtime.getClientID(),
locale:Runtime.getLocale(),
sdk:'joey',
kid_directed_site:Runtime.getKidDirectedSite(),
ref:this.getAttribute('ref')},
this.getUrlBits().params);},







_getURL:function(){
var 
domain=this.getDefaultWebDomain(),
static_path='';

return domain + '/plugins/' + static_path + 
this.getUrlBits().name + '.php';},





_postRequest:function(){
Content.submitToTarget({
url:this._getURL(),
target:this.getIframeNode().name,
params:this._getQS()});}});




var widgetPipeIframeCount=0;
var allWidgetPipeIframes={};

function groupWidgetPipeDescriptions(){
var widgetPipeDescriptions={};
for(var key in allWidgetPipeIframes) {
var controller=allWidgetPipeIframes[key];

widgetPipeDescriptions[key] = {
widget:controller.getUrlBits().name,
params:controller._getQS()};}



return widgetPipeDescriptions;}










































module.exports = IframeWidget;},null);

__d('sdk.XFBML.Comments',['sdk.Event','sdk.XFBML.IframeWidget','QueryString','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap'],function $module_sdk_XFBML_Comments(global,require,requireDynamic,requireLazy,module,exports,Event,IframeWidget,QueryString,Runtime,SDKConfig,UA,UrlMap){if(require.__markCompiled)require.__markCompiled();









var Comments=IframeWidget.extend({
_visibleAfter:'immediate',




_refreshOnAuthChange:true,




setupAndValidate:function(){

var attr={
channel_url:this.getChannelUrl(),
colorscheme:this.getAttribute('colorscheme'),
skin:this.getAttribute('skin'),
numposts:this.getAttribute('num-posts',10),
width:this._getLengthAttribute('width'),
href:this.getAttribute('href'),
permalink:this.getAttribute('permalink'),
publish_feed:this.getAttribute('publish_feed'),
order_by:this.getAttribute('order_by'),
mobile:this._getBoolAttribute('mobile'),
version:this.getAttribute('version')};


if(!attr.width && !attr.permalink){
attr.width = 550;}


if(SDKConfig.initSitevars.enableMobileComments && 
UA.mobile() && 
attr.mobile !== false){
attr.mobile = true;
delete attr.width;}

if(!attr.skin){
attr.skin = attr.colorscheme;}



if(!attr.href){
attr.migrated = this.getAttribute('migrated');
attr.xid = this.getAttribute('xid');
attr.title = this.getAttribute('title',document.title);
attr.url = this.getAttribute('url',document.URL);
attr.quiet = this.getAttribute('quiet');
attr.reverse = this.getAttribute('reverse');
attr.simple = this.getAttribute('simple');
attr.css = this.getAttribute('css');
attr.notify = this.getAttribute('notify');


if(!attr.xid){



var index=ES(document.URL,'indexOf',true,'#');
if(index > 0){
attr.xid = encodeURIComponent(document.URL.substring(0,index));}else 
{
attr.xid = encodeURIComponent(document.URL);}}



if(attr.migrated){
attr.href = 
UrlMap.resolve('www') + '/plugins/comments_v1.php?' + 
'app_id=' + Runtime.getClientID() + 
'&xid=' + encodeURIComponent(attr.xid) + 
'&url=' + encodeURIComponent(attr.url);}}else 

{

var fb_comment_id=this.getAttribute('fb_comment_id');
if(!fb_comment_id){
fb_comment_id = 
QueryString.decode(
document.URL.substring(
ES(document.URL,'indexOf',true,'?') + 1)).fb_comment_id;
if(fb_comment_id && ES(fb_comment_id,'indexOf',true,'#') > 0){

fb_comment_id = 
fb_comment_id.substring(0,ES(
fb_comment_id,'indexOf',true,'#'));}}



if(fb_comment_id){
attr.fb_comment_id = fb_comment_id;
this.subscribe('render',ES(
function(){



if(!window.location.hash){
window.location.hash = this.getIframeNode().id;}},'bind',true,

this));}}



if(!attr.version){
attr.version = Runtime.getVersion();}


this._attr = attr;
return true;},





oneTimeSetup:function(){
this.subscribe('xd.sdk_event',function(message){
Event.fire(message.event,ES('JSON','parse',false,message.data));});},









getSize:function(){
if(!this._attr.permalink){
return {
width:this._attr.mobile?'100%':this._attr.width,


height:100};}},









getUrlBits:function(){
return {name:'comments',params:this._attr};},










getDefaultWebDomain:function(){
return UrlMap.resolve('www',true);}});



module.exports = Comments;},null);

__d('sdk.XFBML.CommentsCount',['ApiClient','sdk.DOM','sdk.XFBML.Element','sprintf'],function $module_sdk_XFBML_CommentsCount(global,require,requireDynamic,requireLazy,module,exports,ApiClient,DOM,Element,sprintf){if(require.__markCompiled)require.__markCompiled();






var CommentsCount=Element.extend({

process:function(){
DOM.addCss(this.dom,'fb_comments_count_zero');

var href=this.getAttribute('href',window.location.href);

ApiClient.scheduleBatchCall(
'/v2.1/' + encodeURIComponent(href),
{fields:'share'},ES(
function(value){
var c=value.share && value.share.comment_count || 0;
DOM.html(
this.dom,
sprintf('<span class="fb_comments_count">%s</span>',c));


if(c > 0){
DOM.removeCss(this.dom,'fb_comments_count_zero');}


this.fire('render');},'bind',true,this));}});






module.exports = CommentsCount;},null);

__d('sdk.Helper',['sdk.ErrorHandling','sdk.Event','UrlMap','safeEval','sprintf'],function $module_sdk_Helper(global,require,requireDynamic,requireLazy,module,exports,ErrorHandling,Event,UrlMap,safeEval,sprintf){if(require.__markCompiled)require.__markCompiled();








var Helper={









isUser:function(id){
return id < 2200000000 || 
id >= 100000000000000 && 
id <= 100099999989999 || 
id >= 89000000000000 && 
id <= 89999999999999 || 
id >= 60000010000000 && 
id <= 60000019999999;},








upperCaseFirstChar:function(s){
if(s.length > 0){
return s.substr(0,1).toUpperCase() + s.substr(1);}else 

{
return s;}},











getProfileLink:function(
userInfo,
html,
href)
{
if(!href && userInfo){
href = sprintf(
'%s/profile.php?id=%s',
UrlMap.resolve('www'),
userInfo.uid || userInfo.id);}


if(href){
html = sprintf('<a class="fb_link" href="%s">%s</a>',href,html);}

return html;},










invokeHandler:function(handler,scope,args){
if(handler){
if(typeof handler === 'string'){
ErrorHandling.unguard(safeEval)(handler,args);}else 
if(handler.apply){
ErrorHandling.unguard(handler).apply(scope,args || []);}}},












fireEvent:function(eventName,eventSource){
var href=eventSource._attr.href;
eventSource.fire(eventName,href);
Event.fire(eventName,href,eventSource);},







executeFunctionByName:function(functionName){
var args=Array.prototype.slice.call(arguments,1);
var namespaces=functionName.split(".");
var func=namespaces.pop();
var context=window;
for(var i=0;i < namespaces.length;i++) {
context = context[namespaces[i]];}

return context[func].apply(this,args);}};




module.exports = Helper;},null);

__d('sdk.XFBML.LoginButton',['sdk.Helper','IframePlugin','Log','sdk.ui'],function $module_sdk_XFBML_LoginButton(global,require,requireDynamic,requireLazy,module,exports,Helper,IframePlugin,Log,ui){if(require.__markCompiled)require.__markCompiled();






var LoginButton=IframePlugin.extend({
constructor:function(elem,ns,tag,
attr){
this.parent(elem,ns,tag,attr);
var onlogin=IframePlugin.getVal(attr,'on_login');
var cb=null;

if(onlogin){
cb = function(response){
if(response.error_code){
Log.debug(
'Plugin Return Error (%s): %s',
response.error_code,
response.error_message || response.error_description);

return;}


Helper.invokeHandler(onlogin,null,[response]);};


this.subscribe('login.status',cb);}


this.subscribe('xd.login_button_native_open',function(msg){
ui(ES('JSON','parse',false,msg.params),cb);});},



getParams:function(){
return {
scope:'string',
perms:'string',
size:'string',
login_text:'text',
show_faces:'bool',
max_rows:'string',
show_login_face:'bool',
registration_url:'url_maybe',
auto_logout_link:'bool',
one_click:'bool',
show_banner:'bool',
auth_type:'string',
default_audience:'string'};}});




module.exports = LoginButton;},null);

__d('escapeHTML',[],function $module_escapeHTML(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var re=/[&<>"'\/]/g;
var map={
'&':'&amp;',
'<':'&lt;',
'>':'&gt;',
'"':'&quot;',
"'":'&#039;',
'/':'&#x2F;'};


function escapeHTML(value){
return value.replace(re,function(m){
return map[m];});}


module.exports = escapeHTML;},null);

__d('sdk.XFBML.Name',['ApiClient','escapeHTML','sdk.Event','sdk.XFBML.Element','sdk.Helper','Log','sdk.Runtime'],function $module_sdk_XFBML_Name(global,require,requireDynamic,requireLazy,module,exports,ApiClient,escapeHTML,Event,Element,Helper,Log,Runtime){if(require.__markCompiled)require.__markCompiled();









var hasOwnProperty=({}).hasOwnProperty;

var Name=Element.extend({



process:function(){
ES('Object','assign',false,this,{
_uid:this.getAttribute('uid'),
_firstnameonly:this._getBoolAttribute('first-name-only'),
_lastnameonly:this._getBoolAttribute('last-name-only'),
_possessive:this._getBoolAttribute('possessive'),
_reflexive:this._getBoolAttribute('reflexive'),
_objective:this._getBoolAttribute('objective'),
_linked:this._getBoolAttribute('linked',true),
_subjectId:this.getAttribute('subject-id')});


if(!this._uid){
Log.error('"uid" is a required attribute for <fb:name>');
this.fire('render');
return;}


var fields=[];
if(this._firstnameonly){
fields.push('first_name');}else 
if(this._lastnameonly){
fields.push('last_name');}else 
{
fields.push('name');}


if(this._subjectId){
fields.push('gender');

if(this._subjectId == Runtime.getUserID()){
this._reflexive = true;}}




Event.monitor('auth.statusChange',ES(function(){

if(!this.isValid()){
this.fire('render');
return true;}


if(!this._uid || this._uid == 'loggedinuser'){
this._uid = Runtime.getUserID();}


if(!this._uid){
return;}


ApiClient.scheduleBatchCall(



'/v1.0/' + this._uid,
{fields:fields.join(',')},ES(
function(data){
if(hasOwnProperty.call(data,'error')){
Log.warn('The name is not found for ID: ' + this._uid);
return;}

if(this._subjectId == this._uid){
this._renderPronoun(data);}else 
{
this._renderOther(data);}

this.fire('render');},'bind',true,this));},'bind',true,this));},








_renderPronoun:function(userInfo){
var 
word='',
objective=this._objective;
if(this._subjectId){
objective = true;
if(this._subjectId === this._uid){
this._reflexive = true;}}


if(this._uid == Runtime.getUserID() && 
this._getBoolAttribute('use-you',true)){
if(this._possessive){
if(this._reflexive){
word = 'your own';}else 
{
word = 'your';}}else 

{
if(this._reflexive){
word = 'yourself';}else 
{
word = 'you';}}}else 



{
switch(userInfo.gender){
case 'male':
if(this._possessive){
word = this._reflexive?'his own':'his';}else 
{
if(this._reflexive){
word = 'himself';}else 
if(objective){
word = 'him';}else 
{
word = 'he';}}


break;
case 'female':
if(this._possessive){
word = this._reflexive?'her own':'her';}else 
{
if(this._reflexive){
word = 'herself';}else 
if(objective){
word = 'her';}else 
{
word = 'she';}}


break;
default:
if(this._getBoolAttribute('use-they',true)){
if(this._possessive){
if(this._reflexive){
word = 'their own';}else 
{
word = 'their';}}else 

{
if(this._reflexive){
word = 'themselves';}else 
if(objective){
word = 'them';}else 
{
word = 'they';}}}else 



{
if(this._possessive){
if(this._reflexive){
word = 'his/her own';}else 
{
word = 'his/her';}}else 

{
if(this._reflexive){
word = 'himself/herself';}else 
if(objective){
word = 'him/her';}else 
{
word = 'he/she';}}}



break;}}


if(this._getBoolAttribute('capitalize',false)){
word = Helper.upperCaseFirstChar(word);}

this.dom.innerHTML = word;},






_renderOther:function(userInfo){
var 
name='',
html='';
if(this._uid == Runtime.getUserID() && 
this._getBoolAttribute('use-you',true)){
if(this._reflexive){
if(this._possessive){
name = 'your own';}else 
{
name = 'yourself';}}else 

{

if(this._possessive){
name = 'your';}else 
{
name = 'you';}}}else 



if(userInfo){

if(null === userInfo.first_name){
userInfo.first_name = '';}

if(null === userInfo.last_name){
userInfo.last_name = '';}





if(this._firstnameonly && userInfo.first_name !== undefined){
name = escapeHTML(userInfo.first_name);}else 
if(this._lastnameonly && userInfo.last_name !== undefined){
name = escapeHTML(userInfo.last_name);}


if(!name){
name = escapeHTML(userInfo.name);}


if(name !== '' && this._possessive){
name += '\'s';}}



if(!name){
name = escapeHTML(
this.getAttribute('if-cant-see','Facebook User'));}

if(name){
if(this._getBoolAttribute('capitalize',false)){
name = Helper.upperCaseFirstChar(name);}

if(userInfo && this._linked){
html = Helper.getProfileLink(userInfo,name,
this.getAttribute('href',null));}else 
{
html = name;}}


this.dom.innerHTML = html;}});



module.exports = Name;},null);

__d('sdk.XFBML.ShareButton',['IframePlugin','sdk.ui'],function $module_sdk_XFBML_ShareButton(global,require,requireDynamic,requireLazy,module,exports,IframePlugin,UI){

'use strict';if(require.__markCompiled)require.__markCompiled();




var ShareButton=IframePlugin.extend({
constructor:function(
elem,
ns,
tag,
attr)
{
this.parent(elem,ns,tag,attr);
this.subscribe('xd.shareTriggerIframe',function(message){
var data=ES('JSON','parse',false,message.data);

UI({
method:'share',
href:data.href,
iframe_test:true});});},





getParams:function(){
return {
href:'url',
layout:'string',
type:'string'};}});




module.exports = ShareButton;},null);

__d('sdk.XFBML.Video',['Assert','sdk.Event','IframePlugin','ObservableMixin','sdk.XD'],function $module_sdk_XFBML_Video(global,require,requireDynamic,requireLazy,module,exports,Assert,Event,IframePlugin,ObservableMixin,XD){if(require.__markCompiled)require.__markCompiled();






























function VideoCache(initData){'use strict';
this.$VideoCache_isMuted = initData.isMuted;
this.$VideoCache_volume = initData.volume;
this.$VideoCache_timePosition = initData.timePosition;
this.$VideoCache_duration = initData.duration;}VideoCache.prototype.


update = function(data){'use strict';
if(data.isMuted !== undefined){
this.$VideoCache_isMuted = data.isMuted;}

if(data.volume !== undefined){
this.$VideoCache_volume = data.volume;}

if(data.timePosition !== undefined){
this.$VideoCache_timePosition = data.timePosition;}

if(data.duration !== undefined){
this.$VideoCache_duration = data.duration;}};VideoCache.prototype.



isMuted = function(){'use strict';
return this.$VideoCache_isMuted;};VideoCache.prototype.


getVolume = function(){'use strict';
return this.$VideoCache_isMuted?0:this.$VideoCache_volume;};VideoCache.prototype.


getCurrentPosition = function(){'use strict';
return this.$VideoCache_timePosition;};VideoCache.prototype.


getDuration = function(){'use strict';
return this.$VideoCache_duration;};










function VideoController(
iframeName,
observableMixin,
cache)
{'use strict';
this.$VideoController_iframeName = iframeName;
this.$VideoController_sharedObservable = observableMixin;
this.$VideoController_cache = cache;}VideoController.prototype.


play = function(){'use strict';
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'play',
params:ES('JSON','stringify',false,{})});};VideoController.prototype.



pause = function(){'use strict';
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'pause',
params:ES('JSON','stringify',false,{})});};VideoController.prototype.




seek = function(target){'use strict';
Assert.isNumber(target,'Invalid argument');
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'seek',
params:ES('JSON','stringify',false,{
target:target})});};VideoController.prototype.




mute = function(){'use strict';
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'mute',
params:ES('JSON','stringify',false,{})});};VideoController.prototype.



unmute = function(){'use strict';
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'unmute',
params:ES('JSON','stringify',false,{})});};VideoController.prototype.




setVolume = function(volume){'use strict';
Assert.isNumber(volume,'Invalid argument');
XD.sendToFacebook(this.$VideoController_iframeName,{
method:'setVolume',
params:ES('JSON','stringify',false,{
volume:volume})});};VideoController.prototype.




isMuted = function(){'use strict';
return this.$VideoController_cache.isMuted();};VideoController.prototype.


getVolume = function(){'use strict';
return this.$VideoController_cache.getVolume();};VideoController.prototype.


getCurrentPosition = function(){'use strict';
return this.$VideoController_cache.getCurrentPosition();};VideoController.prototype.


getDuration = function(){'use strict';
return this.$VideoController_cache.getDuration();};VideoController.prototype.


subscribe = function(event,callback){'use strict';
Assert.isString(event,'Invalid argument');
Assert.isFunction(callback,'Invalid argument');
this.$VideoController_sharedObservable.subscribe(event,callback);
return {
release:ES(function(){
this.$VideoController_sharedObservable.unsubscribe(event,callback);},'bind',true,this)};};





var Video=IframePlugin.extend({
constructor:function(
elem,
ns,
tag,
attr)
{
this.parent(elem,ns,tag,attr);
this._videoController = null;
this._sharedObservable = null;
this._sharedVideoCache = null;
this.subscribe('xd.onVideoAPIReady',function(msg){
this._sharedObservable = new ObservableMixin();
this._sharedVideoCache = new VideoCache(ES('JSON','parse',false,msg.data));
this._videoController = new VideoController(
this._iframeOptions.name,
this._sharedObservable,
this._sharedVideoCache);

Event.fire('xfbml.ready',{
type:'video',
id:attr.id,
instance:this._videoController});});


this.subscribe('xd.stateChange',function(msg){
this._sharedObservable.inform(msg.state);});

this.subscribe('xd.cachedStateUpdateRequest',function(msg){
this._sharedVideoCache.update(ES('JSON','parse',false,msg.data));});},



getParams:function(){
return {
allowfullscreen:'bool',
autoplay:'bool',
controls:'bool',
href:'url',
showpostcontent:'bool'};},



getConfig:function(){
return {
fluid:true,
full_width:true};}});




module.exports = Video;},null);

__d('legacy:fb.xfbml',['Assert','sdk.Event','FB','IframePlugin','PluginConfig','PluginTags','XFBML','sdk.domReady','sdk.feature','wrapFunction','sdk.XFBML.Comments','sdk.XFBML.CommentsCount','sdk.XFBML.LoginButton','sdk.XFBML.Name','sdk.XFBML.ShareButton','sdk.XFBML.Video'],function $module_legacy_fb_xfbml(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,Assert,Event,FB,IframePlugin,PluginConfig,PluginTags,XFBML,domReady,feature,wrapFunction){if(require.__markCompiled)require.__markCompiled();













var customTags={
comments:require('sdk.XFBML.Comments'),
comments_count:require('sdk.XFBML.CommentsCount'),
login_button:require('sdk.XFBML.LoginButton'),
name:require('sdk.XFBML.Name'),
share_button:require('sdk.XFBML.ShareButton'),
video:require('sdk.XFBML.Video')};


var blacklist=feature('plugin_tags_blacklist',[]);


ES(ES('Object','keys',false,PluginTags),'forEach',true,function(tag){
if(ES(blacklist,'indexOf',true,tag) !== -1){
return;}

XFBML.registerTag({
xmlns:'fb',
localName:tag.replace(/_/g,'-'),
ctor:IframePlugin.withParams(PluginTags[tag],PluginConfig[tag])});});




ES(ES('Object','keys',false,customTags),'forEach',true,function(tag){
if(ES(blacklist,'indexOf',true,tag) !== -1){
return;}

XFBML.registerTag({
xmlns:'fb',
localName:tag.replace(/_/g,'-'),
ctor:customTags[tag]});});



FB.provide('XFBML',{
parse:function(dom){
Assert.maybeXfbml(dom,'Invalid argument');


if(dom && dom.nodeType === 9){
dom = dom.body;}

return XFBML.parse.apply(null,arguments);}});



XFBML.subscribe('parse',ES(Event.fire,'bind',true,Event,'xfbml.parse'));
XFBML.subscribe('render',ES(Event.fire,'bind',true,Event,'xfbml.render'));

Event.subscribe('init:post',function(options){
if(options.xfbml){

setTimeout(
wrapFunction(ES(
domReady,'bind',true,null,XFBML.parse),
'entry',
'init:post:xfbml.parse'),

0);}});




Assert.define('Xfbml',function(element){
return (element.nodeType === 1 || element.nodeType === 9) && 
typeof element.nodeName === 'string';});








try{
if(document.namespaces && !document.namespaces.item.fb){
document.namespaces.add('fb');}}

catch(e) {}},3);

    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"2205490","namespace":"FB","message":"'+e.message+'"}}');}