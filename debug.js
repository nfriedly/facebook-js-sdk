/*1449782135,,JIT Construction: v2084449,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {__type: 'JS_SDK_SANDBOX'};  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 1;    function emptyFunction() {};    var __transform_includes = {"typechecks":true};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    with (this) {      /** Path: html/js/downstream/polyfill/GenericFunctionVisitor.js */
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
if(!type && !signature){
return null;}


var meta={};
if(typeof type !== 'undefined'){
meta.type = type;}


if(typeof signature !== 'undefined'){
meta.signature = signature;}


return meta;};


var getMeta=function(name,params){
return createMeta(
name && /^[A-Z]/.test(name)?name:undefined,
params && (params.params && params.params.length || params.returns)?
'function(' + (
params.params?params.params.map(function(param){
return (/\?/.test(param)?
'?' + param.replace('?',''):
param);}).
join(','):'') + 
')' + (
params.returns?':' + params.returns:''):
undefined);};



var noopAnnotator=function(fn,funcMeta,params){
return fn;};


var genericAnnotator=function(fn,funcMeta,params){
if('sourcemeta' in __transform_includes){
fn.__SMmeta = funcMeta;}


if('typechecks' in __transform_includes){
var meta=getMeta(funcMeta?funcMeta.name:undefined,params);
if(meta){
__w(fn,meta);}}


return fn;};


var noopBodyWrapper=function(scope,args,fn){
return fn.apply(scope,args);};


var typecheckBodyWrapper=function(scope,args,fn,params){
if(params && params.params){
__t.apply(scope,params.params);}


var result=fn.apply(scope,args);

if(params && params.returns){
__t([result,params.returns]);}


return result;};


var codeUsageBodyWrapper=function(scope,args,fn,params,funcMeta){
if(funcMeta){
if(!funcMeta.callId){


funcMeta.callId = funcMeta.module + ':' + (
funcMeta.line || 0) + ':' + (
funcMeta.column || 0);}

var key=funcMeta.callId;
funcCalls[key] = (funcCalls[key] || 0) + 1;}

return fn.apply(scope,args);};



if(typeof __transform_includes === 'undefined'){
__annotator = noopAnnotator;
__bodyWrapper = noopBodyWrapper;}else 
{
__annotator = genericAnnotator;

if('codeusage' in __transform_includes){
__annotator = noopAnnotator;
__bodyWrapper = codeUsageBodyWrapper;
__bodyWrapper.getCodeUsage = function(){return funcCalls;};
__bodyWrapper.clearCodeUsage = function(){funcCalls = {};};}else 
if('typechecks' in __transform_includes){
__bodyWrapper = typecheckBodyWrapper;}else 
{
__bodyWrapper = noopBodyWrapper;}}})();
/** Path: html/js/downstream/polyfill/TypeChecker.js */
/**
 * @generated SignedSource<<c5fa97be145c81908e39158b1e7dc11c>>
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
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @nostacktrace
 * @polyfill
 */


(function(){
var handler;
var currentType=[];
var toStringFunc=Object.prototype.toString;
var paused=false;
var disabled=false;


var nextType;
var nextValue;




var typeInterfaceMap={
'HTMLElement':{'DOMEventTarget':true,'DOMNode':true},
'DOMElement':{'DOMEventTarget':true,'DOMNode':true},
'DOMDocument':{'DOMEventTarget':true,'DOMNode':true},
'DocumentFragment':{
'DOMElement':true,
'DOMEventTarget':true,
'DOMNode':true},

'DOMWindow':{'DOMEventTarget':true},
'DOMTextNode':{'DOMNode':true},
'Comment':{'DOMNode':true},
'file':{'blob':true},
'worker':{'DOMEventTarget':true},

'Set':{'set':true},
'Map':{'map':true},
'FbtResult':{'Fbt':true},
'string':{'Fbt':true},
'array':{'Fbt':true}};







function stringType(value){
return toStringFunc.call(value).slice(8,-1);}


function getTagName(string){
switch(string){
case 'A':
return 'Anchor';
case 'IMG':
return 'Image';
case 'TEXTAREA':
return 'TextArea';}

return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();}





function isDOMNode(type,value,nodeType){
if(type === 'function'){


if(typeof value.call !== 'undefined'){
return false;}}else 

if(type !== 'object'){
return false;}


return typeof value.nodeName === 'string' && value.nodeType === nodeType;}





function getObjectType(type,value,node,checkNextNode){
nextValue = null;


var toStringType=stringType(value);
if(value === null){
type = 'null';}else 
if(toStringType === 'Function'){
if(node === '$Class'){

type = '$Class';
if(checkNextNode && value.__TCmeta && value.__TCmeta.type){
nextType = value.__TCmeta.type;}}else 

{
if(value.__TCmeta){

type = node === 'function'?'function':value.__TCmeta.signature;}else 
{

type = node.indexOf('function') === 0?node:'function';}}}else 


if(type === 'object' || type === 'function'){
var constructor=value.constructor;
if(constructor && constructor.__TCmeta){


if(node === 'object'){
type = 'object';}else 
{
type = constructor.__TCmeta.type;
while(constructor && constructor.__TCmeta) {
if(constructor.__TCmeta.type == node){
type = node;
break;}

constructor = constructor.__TCmeta.superClass;}}}else 


if(typeof value.nodeType === 'number' && 
typeof value.nodeName === 'string'){


switch(value.nodeType){
case 1:
if(node === 'HTMLElement'){

type = 'HTMLElement';}else 
{
type = 'HTML' + getTagName(value.nodeName) + 'Element';
typeInterfaceMap[type] = typeInterfaceMap['HTMLElement'];}

break;
case 3:type = 'DOMTextNode';break;
case 8:type = 'Comment';break;
case 9:type = 'DOMDocument';break;
case 11:type = 'DocumentFragment';break;}}else 

if(value == value.window && value == value.self){
type = 'DOMWindow';}else 
if(toStringType == 'XMLHttpRequest' || 
'setRequestHeader' in value){

type = 'XMLHttpRequest';}else 
{

switch(toStringType){
case 'Error':

type = node === 'Error'?
'Error':
value.name;
break;
case 'Array':
if(checkNextNode && value.length){
nextValue = value[0];}

type = toStringType.toLowerCase();
break;
case 'Object':
if(node === 'Set' && value['@@__IMMUTABLE_SET__@@'] || 
node === 'Map' && value['@@__IMMUTABLE_MAP__@@']){
type = node;}else 
{
if(checkNextNode){
for(var key in value) {
if(value.hasOwnProperty(key)){
nextValue = value[key];
break;}}}



type = toStringType.toLowerCase();}

break;
case 'RegExp':
case 'Date':
case 'Blob':
case 'File':
case 'FileList':
case 'Worker':
case 'Map':
case 'Set':

case 'Uint8Array':
case 'Int8Array':
case 'Uint16Array':
case 'Int16Array':
case 'Uint32Array':
case 'Int32Array':
case 'Float32Array':
case 'Float64Array':
type = toStringType.toLowerCase();
break;}}}



return type;}











function equals(value,node){



var nullable=node.charAt(0) === '?';


if(value == null){
currentType.push(typeof value === 'undefined'?'undefined':'null');
return nullable;}else 
if(nullable){
node = node.substring(1);}


var type=typeof value;

if(node === 'Fbt' && type === 'string'){
return true;}


switch(type){
case 'boolean':
case 'number':
case 'string':


currentType.push(type);
return node === type;}





var simpleMatch=false;
switch(node){
case 'function':

simpleMatch = type === 'function' && typeof value.call === 'function';
break;
case 'object':

simpleMatch = type === 'object' && stringType(value) === 'Object';
break;
case 'array':
simpleMatch = type === 'object' && stringType(value) === 'Array';
break;
case 'promise':
simpleMatch = type === 'object' && typeof value.then === 'function';
break;
case 'HTMLElement':
simpleMatch = isDOMNode(type,value,1);
break;
case 'DOMTextNode':
simpleMatch = isDOMNode(type,value,3);
break;
case 'Iterator':
simpleMatch = type === 'object' && typeof value.next === 'function';
break;
case 'IteratorResult':
simpleMatch = type === 'object' && typeof value.done === 'boolean';
break;
case 'OrderedMap':

case 'ImmOrderedMap':
simpleMatch = type === 'object' && 
value['@@__IMMUTABLE_ORDERED__@@'] && 
value['@@__IMMUTABLE_MAP__@@'];
break;
case 'OrderedSet':

case 'ImmOrderedSet':
simpleMatch = type === 'object' && 
value['@@__IMMUTABLE_ORDERED__@@'] && 
value['@@__IMMUTABLE_SET__@@'];
break;
case 'ImmMap':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_MAP__@@'];
break;
case 'ImmSet':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_SET__@@'];
break;
case 'List':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_LIST__@@'];
break;}


if(simpleMatch){
currentType.push(node);
return true;}



var indexOfFirstAngle=node.indexOf('<');
var nextNode;

if(indexOfFirstAngle !== -1 && node.indexOf('function') !== 0){
nextNode = node.substring(indexOfFirstAngle + 1,node.lastIndexOf('>'));
node = node.substring(0,indexOfFirstAngle);}



type = getObjectType(type,value,node,!!nextNode);



var interfaces;
if(type !== node && (interfaces = typeInterfaceMap[type])){
if(interfaces[node]){
type = node;}}




currentType.push(type);

if(node !== type){
return false;}



if(nextNode){

if(nextType && nextNode !== nextType){
return false;}


if(nextValue && !equals(nextValue,nextNode)){
return false;}}


return true;}







function matches(value,node){
if(node.indexOf('|') === -1){
currentType.length = 0;
return equals(value,node);}else 
{
var nodes=node.split('|');
for(var i=0;i < nodes.length;i++) {
currentType.length = 0;
if(equals(value,nodes[i])){
return true;}}}



return false;}










function check(){
if(!paused && !disabled){
var args=arguments;
var ii=args.length;
while(ii--) {
var value=args[ii][0];
var expected=args[ii][1];
var name=args[ii][2] || 'return value';

if(!matches(value,expected)){
var actual=currentType.shift();
while(currentType.length) {
actual += '<' + currentType.shift() + '>';}


var isReturn=!!args[ii][2];
var stackBoundary;
try{
stackBoundary = isReturn?arguments.callee.caller:check;}
catch(e) {}




var message=
'Type Mismatch for ' + name + ': expected `' + expected + '`, ' + 
'actual `' + actual + '` (' + toStringFunc.call(value) + ').';




if(actual === 'object' && 
expected.match(/^[A-Z]/) && 
!value.__TCmeta){
message += 
' Check the constructor\'s module is marked as typechecked -' + 
' see http://fburl.com/typechecks for more information.';}


var error=new TypeError(message);

if(Error.captureStackTrace){
Error.captureStackTrace(error,stackBoundary || check);}else 
{


error.framesToPop = isReturn?2:1;}


if(typeof handler == 'function'){
handler(error);

paused = true;

setTimeout(function(){return paused = false;},0);}else 
if(handler === 'throw'){
throw error;}}}}






return arguments[0][0];}






check.setHandler = function(fn){
handler = fn;};


check.disable = function(){
disabled = true;};





function annotate(fn,meta){
meta.superClass = fn.__superConstructor__;
fn.__TCmeta = meta;
return fn;}



__t = check;
__w = annotate;})();
/** Path: html/js/downstream/require/require-lite.js */
/**
 * @generated SignedSource<<ba7623c59d6ed179ad3938220834cfc7>>
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

require = function(id,soft){
if(resolved.hasOwnProperty(id)){
return resolved[id];}

if(!map.hasOwnProperty(id)){
if(soft){
return null;}

throw new Error('Module ' + id + ' has not been defined');}

var module=map[id],
deps=module.deps,
length=module.factory.length,
dep,
args=[];

for(var i=0;i < length;i++) {
switch(deps[i]){
case 'module':dep = module;break;
case 'exports':dep = module.exports;break;
case 'global':dep = global;break;
case 'require':dep = require;break;
case 'requireDynamic':dep = require;break;
case 'requireLazy':dep = null;break;
default:dep = require.call(null,deps[i]);}

args.push(dep);}

module.factory.apply(global,args);
resolved[id] = module.exports;
return module.exports;};




require.__markCompiled = function(){};

__d = function(id,deps,factory,
_special){
if(typeof factory == 'function'){
map[id] = {
factory:factory,
deps:defaultDeps.concat(deps),
exports:{}};



if(_special === 3){
require.call(null,id);}}else 

{
resolved[id] = factory;}};})(


this);
/** Path: html/js/sdk/ES5ArrayPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5ArrayPrototype
 */__d('ES5ArrayPrototype',[],__annotator(function $module_ES5ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5ArrayPrototype={};




ES5ArrayPrototype.map = __annotator(function(func,context){
if(typeof func != 'function'){
throw new TypeError();}


var ii;
var len=this.length;
var r=new Array(len);
for(ii = 0;ii < len;++ii) {
if(ii in this){
r[ii] = func.call(context,this[ii],ii,this);}}



return r;},{'module':'ES5ArrayPrototype','line':12,'column':24});





ES5ArrayPrototype.forEach = __annotator(function(func,context){
ES5ArrayPrototype.map.call(this,func,context);},{'module':'ES5ArrayPrototype','line':32,'column':28});





ES5ArrayPrototype.filter = __annotator(function(func,context){
if(typeof func != 'function'){
throw new TypeError();}


var ii,val,len=this.length,r=[];
for(ii = 0;ii < len;++ii) {
if(ii in this){

val = this[ii];
if(func.call(context,val,ii,this)){
r.push(val);}}}




return r;},{'module':'ES5ArrayPrototype','line':39,'column':27});





ES5ArrayPrototype.every = __annotator(function(func,context){
if(typeof func != 'function'){
throw new TypeError();}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii < len;ii++) {
if(ii in t){
if(!func.call(context,t[ii],ii,t)){
return false;}}}



return true;},{'module':'ES5ArrayPrototype','line':61,'column':26});





ES5ArrayPrototype.some = __annotator(function(func,context){
if(typeof func != 'function'){
throw new TypeError();}

var t=new Object(this);
var len=t.length;
for(var ii=0;ii < len;ii++) {
if(ii in t){
if(func.call(context,t[ii],ii,t)){
return true;}}}



return false;},{'module':'ES5ArrayPrototype','line':80,'column':25});





ES5ArrayPrototype.indexOf = __annotator(function(val,index){
var len=this.length;
index |= 0;

if(index < 0){
index += len;}


for(;index < len;index++) {
if(index in this && this[index] === val){
return index;}}


return -1;},{'module':'ES5ArrayPrototype','line':99,'column':28});


module.exports = ES5ArrayPrototype;},{'module':'ES5ArrayPrototype','line':0,'column':0,'name':'$module_ES5ArrayPrototype'}),null);
/** Path: html/js/sdk/ES5FunctionPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5FunctionPrototype
 */__d('ES5FunctionPrototype',[],__annotator(function $module_ES5FunctionPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5FunctionPrototype={};









ES5FunctionPrototype.bind = __annotator(function(context){
if(typeof this != 'function'){
throw new TypeError('Bind must be called on a function');}

var target=this;
var appliedArguments=Array.prototype.slice.call(arguments,1);
function bound(){
return target.apply(
context,
appliedArguments.concat(Array.prototype.slice.call(arguments)));}__annotator(bound,{'module':'ES5FunctionPrototype','line':23,'column':2,'name':'bound'});

bound.displayName = 'bound:' + (target.displayName || target.name || '(?)');
bound.toString = __annotator(function toString(){
return 'bound: ' + target;},{'module':'ES5FunctionPrototype','line':29,'column':19,'name':'toString'});

return bound;},{'module':'ES5FunctionPrototype','line':17,'column':28});


module.exports = ES5FunctionPrototype;},{'module':'ES5FunctionPrototype','line':0,'column':0,'name':'$module_ES5FunctionPrototype'}),null);
/** Path: html/js/sdk/ES5StringPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5StringPrototype
 */__d('ES5StringPrototype',[],__annotator(function $module_ES5StringPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5StringPrototype={};






ES5StringPrototype.trim = __annotator(function(){
if(this == null){
throw new TypeError('String.prototype.trim called on null or undefined');}

return String.prototype.replace.call(this,/^\s+|\s+$/g,'');},{'module':'ES5StringPrototype','line':14,'column':26});


ES5StringPrototype.startsWith = __annotator(function(search){
var string=String(this);
if(this == null){
throw new TypeError(
'String.prototype.startsWith called on null or undefined');}

var pos=arguments.length > 1?Number(arguments[1]):0;
if(isNaN(pos)){
pos = 0;}

var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos) == start;},{'module':'ES5StringPrototype','line':21,'column':32});


ES5StringPrototype.endsWith = __annotator(function(search){
var string=String(this);
if(this == null){
throw new TypeError(
'String.prototype.endsWith called on null or undefined');}

var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length > 1?Number(arguments[1]):stringLength;
if(isNaN(pos)){
pos = 0;}

var end=Math.min(Math.max(pos,0),stringLength);
var start=end - searchString.length;
if(start < 0){
return false;}

return string.lastIndexOf(searchString,start) == start;},{'module':'ES5StringPrototype','line':35,'column':30});


ES5StringPrototype.contains = __annotator(function(search){
if(this == null){
throw new TypeError(
'String.prototype.contains called on null or undefined');}

var string=String(this);
var pos=arguments.length > 1?Number(arguments[1]):0;
if(isNaN(pos)){
pos = 0;}

return string.indexOf(String(search),pos) != -1;},{'module':'ES5StringPrototype','line':55,'column':30});


ES5StringPrototype.repeat = __annotator(function(count){
if(this == null){
throw new TypeError(
'String.prototype.repeat called on null or undefined');}

var string=String(this);
var n=count?Number(count):0;
if(isNaN(n)){
n = 0;}

if(n < 0 || n === Infinity){
throw RangeError();}

if(n === 1){
return string;}

if(n === 0){
return '';}

var result='';
while(n) {
if(n & 1){
result += string;}

if(n >>= 1){
string += string;}}


return result;},{'module':'ES5StringPrototype','line':68,'column':28});


module.exports = ES5StringPrototype;},{'module':'ES5StringPrototype','line':0,'column':0,'name':'$module_ES5StringPrototype'}),null);
/** Path: html/js/sdk/ES5Array.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Array
 */__d('ES5Array',[],__annotator(function $module_ES5Array(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5Array={};

ES5Array.isArray = __annotator(function(object){
return Object.prototype.toString.call(object) == '[object Array]';},{'module':'ES5Array','line':9,'column':19});


module.exports = ES5Array;},{'module':'ES5Array','line':0,'column':0,'name':'$module_ES5Array'}),null);
/** Path: html/js/ie8DontEnum.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ie8DontEnum
 */__d('ie8DontEnum',[],__annotator(function $module_ie8DontEnum(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();



var dontEnumProperties=[
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'prototypeIsEnumerable',
'constructor'];


var hasOwnProperty=({}).hasOwnProperty;





var ie8DontEnum=__annotator(function(){},{'module':'ie8DontEnum','line':25,'column':18});

if(({toString:true}).propertyIsEnumerable('toString')){
ie8DontEnum = __annotator(function(object,onProp){
for(var i=0;i < dontEnumProperties.length;i++) {
var property=dontEnumProperties[i];
if(hasOwnProperty.call(object,property)){
onProp(property);}}},{'module':'ie8DontEnum','line':28,'column':16});}





module.exports = ie8DontEnum;},{'module':'ie8DontEnum','line':0,'column':0,'name':'$module_ie8DontEnum'}),null);
/** Path: html/js/sdk/ES5Object.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Object
 */__d('ES5Object',['ie8DontEnum'],__annotator(function $module_ES5Object(global,require,requireDynamic,requireLazy,module,exports,ie8DontEnum){if(require.__markCompiled)require.__markCompiled();


var hasOwnProperty=({}).hasOwnProperty;

var ES5Object={};



function F(){}__annotator(F,{'module':'ES5Object','line':14,'column':0,'name':'F'});






ES5Object.create = __annotator(function(proto){
if(__DEV__){
if(arguments.length > 1){
throw new Error(
'Object.create implementation supports only the first parameter');}}


var type=typeof proto;
if(type != 'object' && type != 'function'){
throw new TypeError('Object prototype may only be a Object or null');}

F.prototype = proto;
return new F();},{'module':'ES5Object','line':21,'column':19});







ES5Object.keys = __annotator(function(object){
var type=typeof object;
if(type != 'object' && type != 'function' || object === null){
throw new TypeError('Object.keys called on non-object');}


var keys=[];
for(var key in object) {
if(hasOwnProperty.call(object,key)){
keys.push(key);}}




ie8DontEnum(object,__annotator(function(prop){return keys.push(prop);},{'module':'ES5Object','line':55,'column':22}));

return keys;},{'module':'ES5Object','line':41,'column':17});


module.exports = ES5Object;},{'module':'ES5Object','line':0,'column':0,'name':'$module_ES5Object'}),null);
/** Path: html/js/sdk/ES5Date.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES5Date
 */__d("ES5Date",[],__annotator(function $module_ES5Date(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES5Date={};
ES5Date.now = __annotator(function(){
return new Date().getTime();},{"module":"ES5Date","line":8,"column":14});


module.exports = ES5Date;},{"module":"ES5Date","line":0,"column":0,"name":"$module_ES5Date"}),null);
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
/** Path: html/js/sdk/ES6Object.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6Object
 */__d('ES6Object',['ie8DontEnum'],__annotator(function $module_ES6Object(global,require,requireDynamic,requireLazy,module,exports,ie8DontEnum){if(require.__markCompiled)require.__markCompiled();


var hasOwnProperty=({}).hasOwnProperty;

var ES6Object={





assign:__annotator(function(target){
if(target == null){
throw new TypeError('Object.assign target cannot be null or undefined');}


target = Object(target);for(var _len=arguments.length,sources=Array(_len > 1?_len - 1:0),_key=1;_key < _len;_key++) {sources[_key - 1] = arguments[_key];}

for(var i=0;i < sources.length;i++) {
var source=sources[i];

if(source == null){
continue;}


source = Object(source);

for(var prop in source) {
if(hasOwnProperty.call(source,prop)){
target[prop] = source[prop];}}




ie8DontEnum(source,__annotator(function(prop){return target[prop] = source[prop];},{'module':'ES6Object','line':39,'column':26}));}


return target;},{'module':'ES6Object','line':16,'column':8}),







is:__annotator(function(x,y){
if(x === y){

return x !== 0 || 1 / x === 1 / y;}else 
{

return x !== x && y !== y;}},{'module':'ES6Object','line':50,'column':4})};




module.exports = ES6Object;},{'module':'ES6Object','line':0,'column':0,'name':'$module_ES6Object'}),null);
/** Path: html/js/sdk/ES6ArrayPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6ArrayPrototype
 */__d('ES6ArrayPrototype',[],__annotator(function $module_ES6ArrayPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();




var ES6ArrayPrototype={




find:__annotator(function(predicate,thisArg){
if(this == null){
throw new TypeError('Array.prototype.find called on null or undefined');}

if(typeof predicate !== 'function'){
throw new TypeError('predicate must be a function');}


var index=ES6ArrayPrototype.findIndex.call(this,predicate,thisArg);
return index === -1?void 0:this[index];},{'module':'ES6ArrayPrototype','line':15,'column':6}),






findIndex:__annotator(function(predicate,thisArg){
if(this == null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate !== 'function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length >>> 0;
for(var i=0;i < length;i++) {
if(predicate.call(thisArg,list[i],i,list)){
return i;}}


return -1;},{'module':'ES6ArrayPrototype','line':31,'column':11}),






fill:__annotator(function(value){
if(this == null){
throw new TypeError('Array.prototype.fill called on null or undefined');}

var O=Object(this);
var len=O.length >>> 0;
var start=arguments[1];
var relativeStart=start >> 0;
var k=relativeStart < 0?
Math.max(len + relativeStart,0):
Math.min(relativeStart,len);
var end=arguments[2];
var relativeEnd=end === undefined?
len:
end >> 0;
var final=relativeEnd < 0?
Math.max(len + relativeEnd,0):
Math.min(relativeEnd,len);
while(k < final) {
O[k] = value;
k++;}

return O;},{'module':'ES6ArrayPrototype','line':54,'column':6})};



module.exports = ES6ArrayPrototype;},{'module':'ES6ArrayPrototype','line':0,'column':0,'name':'$module_ES6ArrayPrototype'}),null);
/** Path: html/js/sdk/ES6DatePrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6DatePrototype
 */__d('ES6DatePrototype',[],__annotator(function $module_ES6DatePrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function pad(number){
return (number < 10?'0':'') + number;}__annotator(pad,{'module':'ES6DatePrototype','line':7,'column':0,'name':'pad'});


var ES6DatePrototype={



toISOString:__annotator(function(){
if(!isFinite(this)){
throw new Error('Invalid time value');}

var year=this.getUTCFullYear();
year = (year < 0?'-':year > 9999?'+':'') + 
('00000' + Math.abs(year)).slice(0 <= year && year <= 9999?-4:-6);
return year + 
'-' + pad(this.getUTCMonth() + 1) + 
'-' + pad(this.getUTCDate()) + 
'T' + pad(this.getUTCHours()) + 
':' + pad(this.getUTCMinutes()) + 
':' + pad(this.getUTCSeconds()) + 
'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2,5) + 
'Z';},{'module':'ES6DatePrototype','line':15,'column':13})};



module.exports = ES6DatePrototype;},{'module':'ES6DatePrototype','line':0,'column':0,'name':'$module_ES6DatePrototype'}),null);
/** Path: html/js/sdk/ES6Number.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES6Number
 */__d('ES6Number',[],__annotator(function $module_ES6Number(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var EPSILON=Math.pow(2,-52);
var MAX_SAFE_INTEGER=Math.pow(2,53) - 1;
var MIN_SAFE_INTEGER=-1 * MAX_SAFE_INTEGER;

var ES6Number={
isFinite:__annotator(function(value){
return typeof value == 'number' && isFinite(value);},{'module':'ES6Number','line':12,'column':10}),


isNaN:__annotator(function(value){
return typeof value == 'number' && isNaN(value);},{'module':'ES6Number','line':16,'column':7}),


isInteger:__annotator(function(value){
return this.isFinite(value) && 
Math.floor(value) === value;},{'module':'ES6Number','line':20,'column':11}),


isSafeInteger:__annotator(function(value){
return this.isFinite(value) && 
value >= this.MIN_SAFE_INTEGER && 
value <= this.MAX_SAFE_INTEGER && 
Math.floor(value) === value;},{'module':'ES6Number','line':25,'column':15}),


EPSILON:EPSILON,
MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,
MIN_SAFE_INTEGER:MIN_SAFE_INTEGER};


module.exports = ES6Number;},{'module':'ES6Number','line':0,'column':0,'name':'$module_ES6Number'}),null);
/** Path: html/js/sdk/ES7StringPrototype.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES7StringPrototype
 */__d('ES7StringPrototype',[],__annotator(function $module_ES7StringPrototype(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var ES7StringPrototype={};

ES7StringPrototype.trimLeft = __annotator(function(){
return this.replace(/^\s+/,'');},{'module':'ES7StringPrototype','line':9,'column':30});


ES7StringPrototype.trimRight = __annotator(function(){
return this.replace(/\s+$/,'');},{'module':'ES7StringPrototype','line':13,'column':31});


module.exports = ES7StringPrototype;},{'module':'ES7StringPrototype','line':0,'column':0,'name':'$module_ES7StringPrototype'}),null);
/** Path: html/js/sdk/ES.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ES
 *
 * scripts/jssdk/default.spatch converts ES5/ES6 code into using this module in
 * ES3 style.
 */__d('ES',['ES5ArrayPrototype','ES5FunctionPrototype','ES5StringPrototype','ES5Array','ES5Object','ES5Date','JSON3','ES6Object','ES6ArrayPrototype','ES6DatePrototype','ES6Number','ES7StringPrototype'],__annotator(function $module_ES(global,require,requireDynamic,requireLazy,module,exports,ES5ArrayPrototype,ES5FunctionPrototype,ES5StringPrototype,ES5Array,ES5Object,ES5Date,JSON3,ES6Object,ES6ArrayPrototype,ES6DatePrototype,ES6Number,ES7StringPrototype){if(require.__markCompiled)require.__markCompiled();














var toString=({}).toString;

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
'Number':ES6Number};


var es7Polyfills={
'String.prototype':ES7StringPrototype};


function setupMethodsCache(polyfills){


for(var pName in polyfills) {
if(!polyfills.hasOwnProperty(pName)){continue;}
var polyfillObject=polyfills[pName];


var accessor=pName.split('.');
var nativeObject=accessor.length == 2?
window[accessor[0]][accessor[1]]:
window[pName];


for(var prop in polyfillObject) {
if(!polyfillObject.hasOwnProperty(prop)){continue;}


if(typeof polyfillObject[prop] !== 'function'){
methodCache[pName + '.' + prop] = polyfillObject[prop];
continue;}


var nativeFunction=nativeObject[prop];


methodCache[pName + '.' + prop] = 
nativeFunction && /\{\s+\[native code\]\s\}/.test(nativeFunction)?
nativeFunction:
polyfillObject[prop];}}}__annotator(setupMethodsCache,{'module':'ES','line':52,'column':0,'name':'setupMethodsCache'});





setupMethodsCache(es5Polyfills);
setupMethodsCache(es6Polyfills);
setupMethodsCache(es7Polyfills);

function ES(lhs,rhs,proto){

var type=proto?
toString.call(lhs).slice(8,-1) + '.prototype':
lhs;


var propValue=methodCache[type + '.' + rhs] || lhs[rhs];


if(typeof propValue === 'function'){for(var _len=arguments.length,args=Array(_len > 3?_len - 3:0),_key=3;_key < _len;_key++) {args[_key - 3] = arguments[_key];}
return propValue.apply(lhs,args);}else 
if(propValue){

return propValue;}


throw new Error('Polyfill ' + type + ' does not have implementation of ' + rhs);}__annotator(ES,{'module':'ES','line':91,'column':0,'name':'ES'});


module.exports = ES;},{'module':'ES','line':0,'column':0,'name':'$module_ES'}),null);
/** Path: html/js/sdk/sdk.babelHelpers.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule sdk.babelHelpers
 */__d('sdk.babelHelpers',['ES5FunctionPrototype','ES5Object','ES6Object'],__annotator(function $module_sdk_babelHelpers(global,require,requireDynamic,requireLazy,module,exports,ES5FunctionPrototype,ES5Object,ES6Object){if(require.__markCompiled)require.__markCompiled();











var babelHelpers={};
var hasOwn=Object.prototype.hasOwnProperty;




babelHelpers.inherits = __annotator(function(subClass,superClass){
ES6Object.assign(subClass,superClass);
subClass.prototype = ES5Object.create(superClass && superClass.prototype);
subClass.prototype.constructor = subClass;
subClass.__superConstructor__ = superClass;
return superClass;},{'module':'sdk.babelHelpers','line':23,'column':24});





babelHelpers._extends = ES6Object.assign;




babelHelpers.objectWithoutProperties = __annotator(function(obj,keys){
var target={};
for(var i in obj) {
if(!hasOwn.call(obj,i) || keys.indexOf(i) >= 0){
continue;}

target[i] = obj[i];}

return target;},{'module':'sdk.babelHelpers','line':39,'column':39});





babelHelpers.taggedTemplateLiteralLoose = __annotator(function(strings,raw){
strings.raw = raw;
return strings;},{'module':'sdk.babelHelpers','line':53,'column':42});





babelHelpers.bind = ES5FunctionPrototype.bind;

module.exports = babelHelpers;},{'module':'sdk.babelHelpers','line':0,'column':0,'name':'$module_sdk_babelHelpers'}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      __d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"2084449"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPurchase","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","fbcdn_http":"fbstatic-a.akamaihd.net","fbcdn_https":"fbstatic-a.akamaihd.net","cdn_http":"static.ak.facebook.com","cdn_https":"s-static.ak.facebook.com"});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=41","XdBundleUrl":"\/connect\/xd_arbiter\/d6XgaBk8fMW.js?version=41","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow-x:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_close_icon:active{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_loader{background-color:#f6f7f8;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3a5795;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;left:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #2f477a;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f8;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466],"sampleRate":500});__d("JSSDKPluginPipeConfig",[],{"threshold":0,"enabledApps":{"209753825810663":1,"187288694643718":1}});      
__d('QueryString',[],__annotator(function $module_QueryString(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();






function encode(bag){return __bodyWrapper(this,arguments,function(){
var pairs=[];
ES(ES('Object','keys',false,bag).sort(),'forEach',true,__annotator(function(key){
var value=bag[key];

if(typeof value === 'undefined'){
return;}


if(value === null){
pairs.push(key);
return;}


pairs.push(encodeURIComponent(key) + 
'=' + 
encodeURIComponent(value));},{'module':'QueryString','line':31,'column':34}));

return pairs.join('&');},{params:[[bag,'object','bag']],returns:'string'});}__annotator(encode,{'module':'QueryString','line':29,'column':0,'name':'encode'},{params:['object'],returns:'string'});





function decode(str,strict){return __bodyWrapper(this,arguments,function(){
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

return data;},{params:[[str,'string','str'],[strict,'?boolean','strict']],returns:'object'});}__annotator(decode,{'module':'QueryString','line':53,'column':0,'name':'decode'},{params:['string','?boolean'],returns:'object'});







function appendToUrl(url,params){return __bodyWrapper(this,arguments,function(){
return url + (
ES(url,'indexOf',true,'?') !== -1?'&':'?') + (
typeof params === 'string'?
params:
QueryString.encode(params));},{params:[[url,'string','url']],returns:'string'});}__annotator(appendToUrl,{'module':'QueryString','line':78,'column':0,'name':'appendToUrl'},{params:['string'],returns:'string'});


var QueryString={
encode:encode,
decode:decode,
appendToUrl:appendToUrl};


module.exports = QueryString;},{'module':'QueryString','line':0,'column':0,'name':'$module_QueryString'}),null);

__d("ManagedError",[],__annotator(function $module_ManagedError(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function ManagedError(message,innerError){
Error.prototype.constructor.call(this,message);
this.message = message;
this.innerError = innerError;}__annotator(ManagedError,{"module":"ManagedError","line":30,"column":0,"name":"ManagedError"});

ManagedError.prototype = new Error();
ManagedError.prototype.constructor = ManagedError;

module.exports = ManagedError;},{"module":"ManagedError","line":0,"column":0,"name":"$module_ManagedError"}),null);

__d('AssertionError',['ManagedError'],__annotator(function $module_AssertionError(global,require,requireDynamic,requireLazy,module,exports,ManagedError){if(require.__markCompiled)require.__markCompiled();



function AssertionError(message){
ManagedError.prototype.constructor.apply(this,arguments);}__annotator(AssertionError,{'module':'AssertionError','line':12,'column':0,'name':'AssertionError'});

AssertionError.prototype = new ManagedError();
AssertionError.prototype.constructor = AssertionError;

module.exports = AssertionError;},{'module':'AssertionError','line':0,'column':0,'name':'$module_AssertionError'}),null);

__d("sprintf",[],__annotator(function $module_sprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function sprintf(format){for(var _len=arguments.length,args=Array(_len > 1?_len - 1:0),_key=1;_key < _len;_key++) {args[_key - 1] = arguments[_key];}return __bodyWrapper(this,arguments,function(){
var index=0;
return format.replace(/%s/g,__annotator(function(match){return args[index++];},{"module":"sprintf","line":32,"column":31}));},{params:[[format,"string","format"]],returns:"string"});}__annotator(sprintf,{"module":"sprintf","line":30,"column":0,"name":"sprintf"},{params:["string"],returns:"string"});


module.exports = sprintf;},{"module":"sprintf","line":0,"column":0,"name":"$module_sprintf"}),null);

__d('Assert',['AssertionError','sprintf'],__annotator(function $module_Assert(global,require,requireDynamic,requireLazy,module,exports,AssertionError,sprintf){if(require.__markCompiled)require.__markCompiled();













function assert(expression,message){return __bodyWrapper(this,arguments,function(){
if(typeof expression !== 'boolean' || !expression){
throw new AssertionError(message);}

return expression;},{params:[[expression,'boolean','expression'],[message,'?string','message']],returns:'boolean'});}__annotator(assert,{'module':'Assert','line':23,'column':0,'name':'assert'},{params:['boolean','?string'],returns:'boolean'});











function assertType(type,expression,message){return __bodyWrapper(this,arguments,function(){
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

return expression;},{params:[[type,'string','type'],[message,'?string','message']]});}__annotator(assertType,{'module':'Assert','line':39,'column':0,'name':'assertType'},{params:['string','?string']});











function assertInstanceOf(type,expression,message){return __bodyWrapper(this,arguments,function(){
assert(
expression instanceof type,
message || 'Expression not instance of type');

return expression;},{params:[[type,'function','type'],[message,'?string','message']]});}__annotator(assertInstanceOf,{'module':'Assert','line':67,'column':0,'name':'assertInstanceOf'},{params:['function','?string']});


function define(type,test){return __bodyWrapper(this,arguments,function(){
Assert['is' + type] = test;
Assert['maybe' + type] = __annotator(function(expression,message){

if(expression != null){
test(expression,message);}},{'module':'Assert','line':77,'column':27});},{params:[[type,'string','type'],[test,'function','test']]});}__annotator(define,{'module':'Assert','line':75,'column':0,'name':'define'},{params:['string','function']});




var Assert={
isInstanceOf:assertInstanceOf,
isTrue:assert,
isTruthy:__annotator(function(expression,message){return __bodyWrapper(this,arguments,function(){
return assert(!!expression,message);},{params:[[message,'?string','message']],returns:'boolean'});},{'module':'Assert','line':88,'column':16},{params:['?string'],returns:'boolean'}),

type:assertType,
define:__annotator(function(type,fn){return __bodyWrapper(this,arguments,function(){
type = type.substring(0,1).toUpperCase() + 
type.substring(1).toLowerCase();

define(type,__annotator(function(expression,message){
assert(fn(expression),message);},{'module':'Assert','line':96,'column':17}));},{params:[[type,'string','type'],[fn,'function','fn']]});},{'module':'Assert','line':92,'column':16},{params:['string','function']})};





ES(['Array',
'Boolean',
'Date',
'Function',
'Null',
'Number',
'Object',
'Regexp',
'String',
'Undefined'],'forEach',true,__annotator(function(type){return __bodyWrapper(this,arguments,function(){
define(type,ES(assertType,'bind',true,null,type.toLowerCase()));},{params:[[type,'string','type']]});},{'module':'Assert','line':112,'column':22},{params:['string']}));


module.exports = Assert;},{'module':'Assert','line':0,'column':0,'name':'$module_Assert'}),null);

__d('Type',['Assert'],__annotator(function $module_Type(global,require,requireDynamic,requireLazy,module,exports,Assert){if(require.__markCompiled)require.__markCompiled();






function Type(){
var mixins=this.__mixins;
if(mixins){
for(var i=0;i < mixins.length;i++) {
mixins[i].apply(this,arguments);}}}__annotator(Type,{'module':'Type','line':75,'column':0,'name':'Type'});














function instanceOf(constructor,which){return __bodyWrapper(this,arguments,function(){


if(which instanceof constructor){
return true;}



if(which instanceof Type){
for(var i=0;i < which.__mixins.length;i++) {
if(which.__mixins[i] == constructor){
return true;}}}




return false;},{params:[[constructor,'function','constructor']],returns:'boolean'});}__annotator(instanceOf,{'module':'Type','line':94,'column':0,'name':'instanceOf'},{params:['function'],returns:'boolean'});










function mixin(to,from){return __bodyWrapper(this,arguments,function(){
var prototype=to.prototype;

if(!ES('Array','isArray',false,from)){
from = [from];}


for(var i=0;i < from.length;i++) {
var mixinFrom=from[i];

if(typeof mixinFrom == 'function'){
prototype.__mixins.push(mixinFrom);
mixinFrom = mixinFrom.prototype;}


ES(ES('Object','keys',false,mixinFrom),'forEach',true,__annotator(function(key){
prototype[key] = mixinFrom[key];},{'module':'Type','line':136,'column':35}));}},{params:[[to,'function','to']]});}__annotator(mixin,{'module':'Type','line':121,'column':0,'name':'mixin'},{params:['function']});


















function extend(from,prototype,mixins){return __bodyWrapper(this,arguments,function()
{
var constructor=prototype && prototype.hasOwnProperty('constructor')?
prototype.constructor:__annotator(
function(){this.parent.apply(this,arguments);},{'module':'Type','line':160,'column':6});

Assert.isFunction(constructor);


if(from && from.prototype instanceof Type === false){
throw new Error('parent type does not inherit from Type');}

from = from || Type;


function F(){}__annotator(F,{'module':'Type','line':171,'column':2,'name':'F'});
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



constructor.prototype.parent = __annotator(function(){
this.parent = from.prototype.parent;
from.apply(this,arguments);},{'module':'Type','line':196,'column':33});



constructor.prototype.parentCall = __annotator(function(method){return __bodyWrapper(this,arguments,function(){
return from.prototype[method].apply(this,
Array.prototype.slice.call(arguments,1));},{params:[[method,'string','method']]});},{'module':'Type','line':202,'column':37},{params:['string']});


constructor.extend = __annotator(function(prototype,mixins){return __bodyWrapper(this,arguments,function(){
return extend(this,prototype,mixins);},{params:[[prototype,'?object','prototype']]});},{'module':'Type','line':207,'column':23},{params:['?object']});

return constructor;},{params:[[from,'?function','from'],[prototype,'?object','prototype']],returns:'function'});}__annotator(extend,{'module':'Type','line':156,'column':0,'name':'extend'},{params:['?function','?object'],returns:'function'});


ES('Object','assign',false,Type.prototype,{
instanceOf:__annotator(function(type){return __bodyWrapper(this,arguments,function(){
return instanceOf(type,this);},{params:[[type,'function','type']],returns:'boolean'});},{'module':'Type','line':214,'column':14},{params:['function'],returns:'boolean'})});



ES('Object','assign',false,Type,{
extend:__annotator(function(prototype,mixins){return __bodyWrapper(this,arguments,function(){
return typeof prototype === 'function'?
extend.apply(null,arguments):
extend(null,prototype,mixins);},{returns:'function'});},{'module':'Type','line':220,'column':10},{returns:'function'}),

instanceOf:instanceOf});


module.exports = Type;},{'module':'Type','line':0,'column':0,'name':'$module_Type'}),null);

__d("ObservableMixin",[],__annotator(function $module_ObservableMixin(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function ObservableMixin(){
this.__observableEvents = {};}__annotator(ObservableMixin,{"module":"ObservableMixin","line":22,"column":0,"name":"ObservableMixin"});


ObservableMixin.prototype = {










inform:__annotator(function(what){return __bodyWrapper(this,arguments,function(){

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


setTimeout(__annotator(function(){throw e;},{"module":"ObservableMixin","line":51,"column":21}),0);}}}



return this;},{params:[[what,"string","what"]]});},{"module":"ObservableMixin","line":37,"column":10},{params:["string"]}),








getSubscribers:__annotator(function(toWhat){return __bodyWrapper(this,arguments,function(){

return this.__observableEvents[toWhat] || (
this.__observableEvents[toWhat] = []);},{params:[[toWhat,"string","toWhat"]],returns:"array"});},{"module":"ObservableMixin","line":64,"column":18},{params:["string"],returns:"array"}),







clearSubscribers:__annotator(function(toWhat){return __bodyWrapper(this,arguments,function(){

if(toWhat){
this.__observableEvents[toWhat] = [];}

return this;},{params:[[toWhat,"string","toWhat"]]});},{"module":"ObservableMixin","line":75,"column":20},{params:["string"]}),






clearAllSubscribers:__annotator(function(){
this.__observableEvents = {};
return this;},{"module":"ObservableMixin","line":87,"column":23}),









subscribe:__annotator(function(toWhat,withWhat){return __bodyWrapper(this,arguments,function(){

var list=this.getSubscribers(toWhat);
list.push(withWhat);
return this;},{params:[[toWhat,"string","toWhat"],[withWhat,"function","withWhat"]]});},{"module":"ObservableMixin","line":99,"column":13},{params:["string","function"]}),









unsubscribe:__annotator(function(toWhat,withWhat){return __bodyWrapper(this,arguments,function(){

var list=this.getSubscribers(toWhat);
for(var i=0;i < list.length;i++) {
if(list[i] === withWhat){
list.splice(i,1);
break;}}


return this;},{params:[[toWhat,"string","toWhat"],[withWhat,"function","withWhat"]]});},{"module":"ObservableMixin","line":113,"column":15},{params:["string","function"]}),










monitor:__annotator(function(toWhat,withWhat){return __bodyWrapper(this,arguments,function(){
if(!withWhat()){
var monitor=ES(__annotator(function(value){
if(withWhat.apply(withWhat,arguments)){
this.unsubscribe(toWhat,monitor);}},{"module":"ObservableMixin","line":135,"column":20}),"bind",true,

this);
this.subscribe(toWhat,monitor);}

return this;},{params:[[toWhat,"string","toWhat"],[withWhat,"function","withWhat"]]});},{"module":"ObservableMixin","line":133,"column":11},{params:["string","function"]})};





module.exports = ObservableMixin;},{"module":"ObservableMixin","line":0,"column":0,"name":"$module_ObservableMixin"}),null);

__d('sdk.Model',['Type','ObservableMixin'],__annotator(function $module_sdk_Model(global,require,requireDynamic,requireLazy,module,exports,Type,ObservableMixin){if(require.__markCompiled)require.__markCompiled();




var Model=Type.extend({
constructor:__annotator(function(properties){return __bodyWrapper(this,arguments,function(){
this.parent();


var propContainer={};
var model=this;

ES(ES('Object','keys',false,properties),'forEach',true,__annotator(function(name){return __bodyWrapper(this,arguments,function(){

propContainer[name] = properties[name];


model['set' + name] = __annotator(function(value){
if(value === propContainer[name]){
return this;}

propContainer[name] = value;
model.inform(name + '.change',value);
return model;},{'module':'sdk.Model','line':48,'column':28});



model['get' + name] = __annotator(function(){
return propContainer[name];},{'module':'sdk.Model','line':58,'column':28});},{params:[[name,'string','name']]});},{'module':'sdk.Model','line':43,'column':36},{params:['string']}));},{params:[[properties,'object','properties']]});},{'module':'sdk.Model','line':36,'column':15},{params:['object']})},



ObservableMixin);

module.exports = Model;},{'module':'sdk.Model','line':0,'column':0,'name':'$module_sdk_Model'}),null);

__d('sdk.Runtime',['sdk.Model','JSSDKRuntimeConfig'],__annotator(function $module_sdk_Runtime(global,require,requireDynamic,requireLazy,module,exports,Model,RuntimeConfig){if(require.__markCompiled)require.__markCompiled();





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

isEnvironment:__annotator(function(target){return __bodyWrapper(this,arguments,function(){
var environment=this.getEnvironment();
return (target | environment) === environment;},{params:[[target,'number','target']],returns:'boolean'});},{'module':'sdk.Runtime','line':45,'column':17},{params:['number'],returns:'boolean'}),


isCanvasEnvironment:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return this.isEnvironment(ENVIRONMENTS.CANVAS) || 
this.isEnvironment(ENVIRONMENTS.PAGETAB);},{returns:'boolean'});},{'module':'sdk.Runtime','line':50,'column':23},{returns:'boolean'})});



__annotator(function(){
var environment=/app_runner/.test(window.name)?
ENVIRONMENTS.PAGETAB:
/iframe_canvas/.test(window.name)?
ENVIRONMENTS.CANVAS:
ENVIRONMENTS.UNKNOWN;


if((environment | ENVIRONMENTS.PAGETAB) === environment){
environment = environment | ENVIRONMENTS.CANVAS;}

Runtime.setEnvironment(environment);},{'module':'sdk.Runtime','line':56,'column':1})();


module.exports = Runtime;},{'module':'sdk.Runtime','line':0,'column':0,'name':'$module_sdk_Runtime'}),null);

__d('sdk.Cookie',['QueryString','sdk.Runtime'],__annotator(function $module_sdk_Cookie(global,require,requireDynamic,requireLazy,module,exports,QueryString,Runtime){if(require.__markCompiled)require.__markCompiled();






var domain=null;








function setRaw(prefix,val,ts){return __bodyWrapper(this,arguments,function(){
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
useDomain?'; domain=' + domain:'');},{params:[[prefix,'string','prefix'],[val,'string','val'],[ts,'number','ts']]});}__annotator(setRaw,{'module':'sdk.Cookie','line':28,'column':0,'name':'setRaw'},{params:['string','string','number']});


function getRaw(prefix){return __bodyWrapper(this,arguments,function(){
prefix = prefix + Runtime.getClientID();
var regExp=new RegExp('\\b' + prefix + '=([^;]*)\\b');
return regExp.test(document.cookie)?
RegExp.$1:
null;},{params:[[prefix,'string','prefix']],returns:'?string'});}__annotator(getRaw,{'module':'sdk.Cookie','line':48,'column':0,'name':'getRaw'},{params:['string'],returns:'?string'});


var Cookie={
setDomain:__annotator(function(val){return __bodyWrapper(this,arguments,function(){
domain = val;

var meta=QueryString.encode({
base_domain:domain && domain !== '.'?domain:''});

var expiration=new Date();
expiration.setFullYear(expiration.getFullYear() + 1);
setRaw('fbm_',meta,expiration.getTime());},{params:[[val,'?string','val']]});},{'module':'sdk.Cookie','line':57,'column':13},{params:['?string']}),


getDomain:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return domain;},{returns:'?string'});},{'module':'sdk.Cookie','line':68,'column':13},{returns:'?string'}),







loadMeta:__annotator(function(){return __bodyWrapper(this,arguments,function(){
var cookie=getRaw('fbm_');
if(cookie){

var meta=QueryString.decode(cookie);
if(!domain){

domain = meta.base_domain;}

return meta;}},{returns:'?object'});},{'module':'sdk.Cookie','line':77,'column':12},{returns:'?object'}),








loadSignedRequest:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return getRaw('fbsr_');},{returns:'?string'});},{'module':'sdk.Cookie','line':95,'column':21},{returns:'?string'}),











setSignedRequestCookie:__annotator(function(signedRequest,
expiration){return __bodyWrapper(this,arguments,function(){
if(!signedRequest){
throw new Error('Value passed to Cookie.setSignedRequestCookie ' + 
'was empty.');}

setRaw('fbsr_',signedRequest,expiration);},{params:[[signedRequest,'string','signedRequest'],[expiration,'number','expiration']]});},{'module':'sdk.Cookie','line':108,'column':26},{params:['string','number']}),






clearSignedRequestCookie:__annotator(function(){
setRaw('fbsr_','',0);},{'module':'sdk.Cookie','line':121,'column':28}),


setRaw:setRaw};


module.exports = Cookie;},{'module':'sdk.Cookie','line':0,'column':0,'name':'$module_sdk_Cookie'}),null);

__d('wrapFunction',[],__annotator(function $module_wrapFunction(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var wrappers={};
function wrapFunction(fn,type,source){return __bodyWrapper(this,arguments,function()
{
type = type || 'default';

return __annotator(function(){
var callee=type in wrappers?
wrappers[type](fn,source):
fn;

return callee.apply(this,arguments);},{'module':'wrapFunction','line':34,'column':9});},{params:[[fn,'function','fn'],[type,'?string','type'],[source,'?string','source']],returns:'function'});}__annotator(wrapFunction,{'module':'wrapFunction','line':30,'column':0,'name':'wrapFunction'},{params:['function','?string','?string'],returns:'function'});



wrapFunction.setWrapper = __annotator(function(fn,type){return __bodyWrapper(this,arguments,function(){
type = type || 'default';
wrappers[type] = fn;},{params:[[fn,'function','fn'],[type,'?string','type']]});},{'module':'wrapFunction','line':43,'column':26},{params:['function','?string']});


module.exports = wrapFunction;},{'module':'wrapFunction','line':0,'column':0,'name':'$module_wrapFunction'}),null);

__d('DOMEventListener',['wrapFunction'],__annotator(function $module_DOMEventListener(global,require,requireDynamic,requireLazy,module,exports,wrapFunction){if(require.__markCompiled)require.__markCompiled();



var add,remove;

if(window.addEventListener){


add = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
listener.wrapper = 
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.addEventListener(name,listener.wrapper,false);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':23,'column':8},{params:['string','function']});

remove = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
target.removeEventListener(name,listener.wrapper,false);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':28,'column':11},{params:['string','function']});}else 


if(window.attachEvent){


add = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
listener.wrapper = 
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.attachEvent('on' + name,listener.wrapper);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':35,'column':8},{params:['string','function']});

remove = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
target.detachEvent('on' + name,listener.wrapper);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':40,'column':11},{params:['string','function']});}else 


{
remove = add = __annotator(function(){},{'module':'DOMEventListener','line':45,'column':17});}


var DOMEventListener={











add:__annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){


add(target,name,listener);
return {



remove:__annotator(function(){
remove(target,name,listener);
target = null;},{'module':'DOMEventListener','line':68,'column':14})};},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':60,'column':7},{params:['string','function']}),











remove:remove};


module.exports = DOMEventListener;},{'module':'DOMEventListener','line':0,'column':0,'name':'$module_DOMEventListener'}),null);

__d('sdk.UA',[],__annotator(function $module_sdk_UA(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

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


function getVersionParts(version){return __bodyWrapper(this,arguments,function(){
return ES(version.split('.'),'map',true,__annotator(function(v){return parseFloat(v);},{'module':'sdk.UA','line':92,'column':32}));},{params:[[version,'string','version']],returns:'array'});}__annotator(getVersionParts,{'module':'sdk.UA','line':91,'column':0,'name':'getVersionParts'},{params:['string'],returns:'array'});


var UA={};

ES(ES('Object','keys',false,versions),'map',true,__annotator(function(key){



UA[key] = __annotator(function(){return parseFloat(versions[key]);},{'module':'sdk.UA','line':101,'column':12});



UA[key].getVersionParts = __annotator(function(){return getVersionParts(versions[key]);},{'module':'sdk.UA','line':105,'column':28});},{'module':'sdk.UA','line':97,'column':26}));


ES(ES('Object','keys',false,devices),'map',true,__annotator(function(key){



UA[key] = __annotator(function(){return devices[key];},{'module':'sdk.UA','line':112,'column':12});},{'module':'sdk.UA','line':108,'column':25}));





UA.mobile = __annotator(function(){return devices.iphone || devices.ipad || devices.android || mobile;},{'module':'sdk.UA','line':118,'column':12});


module.exports = UA;},{'module':'sdk.UA','line':0,'column':0,'name':'$module_sdk_UA'}),null);

__d('getBlankIframeSrc',['sdk.UA'],__annotator(function $module_getBlankIframeSrc(global,require,requireDynamic,requireLazy,module,exports,UA){if(require.__markCompiled)require.__markCompiled();



function getBlankIframeSrc(){return __bodyWrapper(this,arguments,function(){
return UA.ie() < 10?'javascript:false':'about:blank';},{returns:'string'});}__annotator(getBlankIframeSrc,{'module':'getBlankIframeSrc','line':16,'column':0,'name':'getBlankIframeSrc'},{returns:'string'});


module.exports = getBlankIframeSrc;},{'module':'getBlankIframeSrc','line':0,'column':0,'name':'$module_getBlankIframeSrc'}),null);

__d('guid',[],__annotator(function $module_guid(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();



function guid(){
return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.','');}__annotator(guid,{'module':'guid','line':27,'column':0,'name':'guid'});


module.exports = guid;},{'module':'guid','line':0,'column':0,'name':'$module_guid'}),null);

__d('UserAgent_DEPRECATED',[],__annotator(function $module_UserAgent_DEPRECATED(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();









































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
_osx = _windows = _linux = false;}}__annotator(_populate,{'module':'UserAgent_DEPRECATED','line':66,'column':0,'name':'_populate'});



var UserAgent_DEPRECATED={







ie:__annotator(function(){
return _populate() || _ie;},{'module':'UserAgent_DEPRECATED','line':150,'column':6}),








ieCompatibilityMode:__annotator(function(){
return _populate() || _ie_real_version > _ie;},{'module':'UserAgent_DEPRECATED','line':160,'column':23}),








ie64:__annotator(function(){
return UserAgent_DEPRECATED.ie() && _win64;},{'module':'UserAgent_DEPRECATED','line':170,'column':8}),








firefox:__annotator(function(){
return _populate() || _firefox;},{'module':'UserAgent_DEPRECATED','line':180,'column':11}),









opera:__annotator(function(){
return _populate() || _opera;},{'module':'UserAgent_DEPRECATED','line':191,'column':9}),









webkit:__annotator(function(){
return _populate() || _webkit;},{'module':'UserAgent_DEPRECATED','line':202,'column':10}),






safari:__annotator(function(){
return UserAgent_DEPRECATED.webkit();},{'module':'UserAgent_DEPRECATED','line':210,'column':10}),








chrome:__annotator(function(){
return _populate() || _chrome;},{'module':'UserAgent_DEPRECATED','line':220,'column':11}),








windows:__annotator(function(){
return _populate() || _windows;},{'module':'UserAgent_DEPRECATED','line':230,'column':11}),









osx:__annotator(function(){
return _populate() || _osx;},{'module':'UserAgent_DEPRECATED','line':241,'column':7}),







linux:__annotator(function(){
return _populate() || _linux;},{'module':'UserAgent_DEPRECATED','line':250,'column':9}),








iphone:__annotator(function(){
return _populate() || _iphone;},{'module':'UserAgent_DEPRECATED','line':260,'column':10}),


mobile:__annotator(function(){
return _populate() || (_iphone || _ipad || _android || _mobile);},{'module':'UserAgent_DEPRECATED','line':264,'column':10}),


nativeApp:__annotator(function(){

return _populate() || _native;},{'module':'UserAgent_DEPRECATED','line':268,'column':13}),


android:__annotator(function(){
return _populate() || _android;},{'module':'UserAgent_DEPRECATED','line':273,'column':11}),


ipad:__annotator(function(){
return _populate() || _ipad;},{'module':'UserAgent_DEPRECATED','line':277,'column':8})};



module.exports = UserAgent_DEPRECATED;},{'module':'UserAgent_DEPRECATED','line':0,'column':0,'name':'$module_UserAgent_DEPRECATED'}),null);

__d('hasNamePropertyBug',['guid','UserAgent_DEPRECATED'],__annotator(function $module_hasNamePropertyBug(global,require,requireDynamic,requireLazy,module,exports,guid,UserAgent_DEPRECATED){if(require.__markCompiled)require.__markCompiled();




var hasBug=UserAgent_DEPRECATED.ie()?undefined:false;




function test(){return __bodyWrapper(this,arguments,function(){
var form=document.createElement("form"),
input=form.appendChild(document.createElement("input"));
input.name = guid();
hasBug = input !== form.elements[input.name];
form = input = null;
return hasBug;},{returns:'boolean'});}__annotator(test,{'module':'hasNamePropertyBug','line':16,'column':0,'name':'test'},{returns:'boolean'});


function hasNamePropertyBug(){return __bodyWrapper(this,arguments,function(){
return typeof hasBug === 'undefined'?
test():
hasBug;},{returns:'boolean'});}__annotator(hasNamePropertyBug,{'module':'hasNamePropertyBug','line':25,'column':0,'name':'hasNamePropertyBug'},{returns:'boolean'});


module.exports = hasNamePropertyBug;},{'module':'hasNamePropertyBug','line':0,'column':0,'name':'$module_hasNamePropertyBug'}),null);

__d('sdk.createIframe',['DOMEventListener','getBlankIframeSrc','guid','hasNamePropertyBug'],__annotator(function $module_sdk_createIframe(global,require,requireDynamic,requireLazy,module,exports,DOMEventListener,getBlankIframeSrc,guid,hasNamePropertyBug){if(require.__markCompiled)require.__markCompiled();







function createIframe(opts){return __bodyWrapper(this,arguments,function(){
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
var onLoadListener=DOMEventListener.add(frame,'load',__annotator(function(){
onLoadListener.remove();
onLoad();},{'module':'sdk.createIframe','line':72,'column':61}));}



if(onError){
var onErrorListener=DOMEventListener.add(frame,'error',__annotator(function(){
onErrorListener.remove();
onError();},{'module':'sdk.createIframe','line':79,'column':63}));}





frame.src = src;
return frame;},{params:[[opts,'object','opts']],returns:'HTMLElement'});}__annotator(createIframe,{'module':'sdk.createIframe','line':16,'column':0,'name':'createIframe'},{params:['object'],returns:'HTMLElement'});


module.exports = createIframe;},{'module':'sdk.createIframe','line':0,'column':0,'name':'$module_sdk_createIframe'}),null);

__d("DOMWrapper",[],__annotator(function $module_DOMWrapper(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var rootElement,
windowRef;



var DOMWrapper={
setRoot:__annotator(function(root){return __bodyWrapper(this,arguments,function(){
rootElement = root;},{params:[[root,"?HTMLElement","root"]]});},{"module":"DOMWrapper","line":20,"column":11},{params:["?HTMLElement"]}),

getRoot:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return rootElement || document.body;},{returns:"HTMLElement"});},{"module":"DOMWrapper","line":23,"column":11},{returns:"HTMLElement"}),

setWindow:__annotator(function(win){
windowRef = win;},{"module":"DOMWrapper","line":26,"column":13}),

getWindow:__annotator(function(){
return windowRef || self;},{"module":"DOMWrapper","line":29,"column":13})};



module.exports = DOMWrapper;},{"module":"DOMWrapper","line":0,"column":0,"name":"$module_DOMWrapper"}),null);

__d('eprintf',[],__annotator(function $module_eprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();











var eprintf=__annotator(function(errorMessage){return __bodyWrapper(this,arguments,function(){
var args=ES(Array.prototype.slice.call(arguments),'map',true,__annotator(function(arg){
return String(arg);},{'module':'eprintf','line':33,'column':55}));

var expectedLength=errorMessage.split('%s').length - 1;

if(expectedLength !== args.length - 1){

return eprintf('eprintf args number mismatch: %s',ES('JSON','stringify',false,args));}


var index=1;
return errorMessage.replace(/%s/g,__annotator(function(whole){
return String(args[index++]);},{'module':'eprintf','line':44,'column':37}));},{params:[[errorMessage,'string','errorMessage']]});},{'module':'eprintf','line':32,'column':14},{params:['string']});



module.exports = eprintf;},{'module':'eprintf','line':0,'column':0,'name':'$module_eprintf'}),null);

__d('ex',['eprintf'],__annotator(function $module_ex(global,require,requireDynamic,requireLazy,module,exports,eprintf){if(require.__markCompiled)require.__markCompiled();

















var ex=__annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args = ES(args,'map',true,__annotator(function(arg){return String(arg);},{'module':'ex','line':39,'column':18}));
if(args[0].split('%s').length !== args.length){

return ex('ex args number mismatch: %s',ES('JSON','stringify',false,args));}


if(__DEV__){
return eprintf.apply(null,args);}else 
{
return ex._prefix + ES('JSON','stringify',false,args) + ex._suffix;}},{'module':'ex','line':38,'column':9});




ex._prefix = '<![EX[';
ex._suffix = ']]>';

module.exports = ex;},{'module':'ex','line':0,'column':0,'name':'$module_ex'}),null);

__d('invariant',['ex','sprintf'],__annotator(function $module_invariant(global,require,requireDynamic,requireLazy,module,exports,ex,sprintf){



'use strict';if(require.__markCompiled)require.__markCompiled();




var printingFunction=ex;
if(__DEV__){
printingFunction = sprintf;}












function invariant(condition,format){
if(__DEV__){
if(format === undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
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
throw error;}}__annotator(invariant,{'module':'invariant','line':54,'column':0,'name':'invariant'});



module.exports = invariant;},{'module':'invariant','line':0,'column':0,'name':'$module_invariant'}),null);

__d('sdk.feature',['JSSDKConfig','invariant'],__annotator(function $module_sdk_feature(global,require,requireDynamic,requireLazy,module,exports,SDKConfig,invariant){if(require.__markCompiled)require.__markCompiled();












function feature(name,defaultValue){return __bodyWrapper(this,arguments,function(){
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


return defaultValue;},{params:[[name,'string','name']]});}__annotator(feature,{'module':'sdk.feature','line':20,'column':0,'name':'feature'},{params:['string']});


module.exports = feature;},{'module':'sdk.feature','line':0,'column':0,'name':'$module_sdk_feature'}),null);

__d('sdk.getContextType',['sdk.Runtime','sdk.UA'],__annotator(function $module_sdk_getContextType(global,require,requireDynamic,requireLazy,module,exports,Runtime,UA){if(require.__markCompiled)require.__markCompiled();




function getContextType(){return __bodyWrapper(this,arguments,function(){






if(UA.nativeApp()){
return 3;}

if(UA.mobile()){
return 2;}

if(Runtime.isEnvironment(Runtime.ENVIRONMENTS.CANVAS)){
return 5;}

return 1;},{returns:'number'});}__annotator(getContextType,{'module':'sdk.getContextType','line':11,'column':0,'name':'getContextType'},{returns:'number'});


module.exports = getContextType;},{'module':'sdk.getContextType','line':0,'column':0,'name':'$module_sdk_getContextType'}),null);

__d('Log',['sprintf'],__annotator(function $module_Log(global,require,requireDynamic,requireLazy,module,exports,sprintf){if(require.__markCompiled)require.__markCompiled();



var Level={
DEBUG:3,
INFO:2,
WARNING:1,
ERROR:0};


function log(name,level){return __bodyWrapper(this,arguments,function(){
var args=Array.prototype.slice.call(arguments,2);
var msg=sprintf.apply(null,args);
var console=window.console;
if(console && Log.level >= level){
console[name in console?name:'log'](msg);}},{params:[[name,'string','name'],[level,'number','level']]});}__annotator(log,{'module':'Log','line':38,'column':0,'name':'log'},{params:['string','number']});



var Log={



level:__DEV__?3:-1,






Level:Level,








debug:ES(log,'bind',true,null,'debug',Level.DEBUG),
info:ES(log,'bind',true,null,'info',Level.INFO),
warn:ES(log,'bind',true,null,'warn',Level.WARNING),
error:ES(log,'bind',true,null,'error',Level.ERROR)};

module.exports = Log;},{'module':'Log','line':0,'column':0,'name':'$module_Log'}),null);

__d('sdk.domReady',[],__annotator(function $module_sdk_domReady(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
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

queue = null;}__annotator(flush,{'module':'sdk.domReady','line':18,'column':0,'name':'flush'});


function domReady(fn){return __bodyWrapper(this,arguments,function(){
if(queue){
queue.push(fn);
return;}else 
{
fn();}},{params:[[fn,'function','fn']]});}__annotator(domReady,{'module':'sdk.domReady','line':30,'column':0,'name':'domReady'},{params:['function']});



if(!domIsReady){
queue = [];
if(document.addEventListener){
document.addEventListener('DOMContentLoaded',flush,false);
window.addEventListener('load',flush,false);}else 
if(document.attachEvent){
document.attachEvent('onreadystatechange',flush);
window.attachEvent('onload',flush);}




if(document.documentElement.doScroll && window == window.top){
var test=__annotator(function(){
try{


document.documentElement.doScroll('left');}
catch(error) {
setTimeout(test,0);
return;}

flush();},{'module':'sdk.domReady','line':52,'column':15});

test();}}



module.exports = domReady;},{'module':'sdk.domReady','line':