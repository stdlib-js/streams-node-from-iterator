// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("stream"),require("buffer"),require("process")):"function"==typeof define&&define.amd?define(["stream","buffer","process"],r):(e="undefined"!=typeof globalThis?globalThis:e||self).iteratorStream=r(e.require$$0$3,e.require$$0$1,e.require$$0$2)}(this,(function(e,r,t){"use strict";var n="function"==typeof Object.defineProperty?Object.defineProperty:null;var o,i=Object.defineProperty,a=Object.prototype,u=a.toString,c=a.__defineGetter__,f=a.__defineSetter__,s=a.__lookupGetter__,l=a.__lookupSetter__;o=function(){try{return n({},"x",{}),!0}catch(e){return!1}}()?i:function(e,r,t){var n,o,i,p;if("object"!=typeof e||null===e||"[object Array]"===u.call(e))throw new TypeError("invalid argument. First argument must be an object. Value: `"+e+"`.");if("object"!=typeof t||null===t||"[object Array]"===u.call(t))throw new TypeError("invalid argument. Property descriptor must be an object. Value: `"+t+"`.");if((o="value"in t)&&(s.call(e,r)||l.call(e,r)?(n=e.__proto__,e.__proto__=a,delete e[r],e[r]=t.value,e.__proto__=n):e[r]=t.value),i="get"in t,p="set"in t,o&&(i||p))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return i&&c&&c.call(e,r,t.get),p&&f&&f.call(e,r,t.set),e};var p=o;function g(e,r,t){p(e,r,{configurable:!1,enumerable:!1,writable:!1,value:t})}function h(e){if(e.__esModule)return e;var r=e.default;if("function"==typeof r){var t=function e(){if(this instanceof e){var t=[null];t.push.apply(t,arguments);var n=Function.bind.apply(r,t);return new n}return r.apply(this,arguments)};t.prototype=r.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t}var d=Object.prototype.hasOwnProperty;function y(e,r){return null!=e&&d.call(e,r)}var b=/./;function v(e){return"boolean"==typeof e}var w="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function m(){return w&&"symbol"==typeof Symbol.toStringTag}var j=Object.prototype.toString;var _="function"==typeof Symbol?Symbol.toStringTag:"";var O=m()?function(e){var r,t,n;if(null==e)return j.call(e);t=e[_],r=y(e,_);try{e[_]=void 0}catch(r){return j.call(e)}return n=j.call(e),r?e[_]=t:delete e[_],n}:function(e){return j.call(e)},E=Boolean.prototype.toString;var S=m();function T(e){return"object"==typeof e&&(e instanceof Boolean||(S?function(e){try{return E.call(e),!0}catch(e){return!1}}(e):"[object Boolean]"===O(e)))}function k(e){return v(e)||T(e)}function x(){return new Function("return this;")()}g(k,"isPrimitive",v),g(k,"isObject",T);var I="object"==typeof self?self:null,M="object"==typeof window?window:null,V="object"==typeof global?global:null;var P=function(e){if(arguments.length){if(!v(e))throw new TypeError("invalid argument. Must provide a boolean primitive. Value: `"+e+"`.");if(e)return x()}if(I)return I;if(M)return M;if(V)return V;throw new Error("unexpected error. Unable to resolve global object.")}(),A=P.document&&P.document.childNodes,F=Int8Array;function $(){return/^\s*function\s*([^(]*)/i}var N=/^\s*function\s*([^(]*)/i;g($,"REGEXP",N);var C=Array.isArray?Array.isArray:function(e){return"[object Array]"===O(e)};function z(e){return null!==e&&"object"==typeof e}function W(e){return z(e)&&(e._isBuffer||e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e))}function B(e){var r,t,n;if(("Object"===(t=O(e).slice(8,-1))||"Error"===t)&&e.constructor){if("string"==typeof(n=e.constructor).name)return n.name;if(r=N.exec(n.toString()))return r[1]}return W(e)?"Buffer":t}g(z,"isObjectLikeArray",function(e){if("function"!=typeof e)throw new TypeError("invalid argument. Must provide a function. Value: `"+e+"`.");return function(r){var t,n;if(!C(r))return!1;if(0===(t=r.length))return!1;for(n=0;n<t;n++)if(!1===e(r[n]))return!1;return!0}}(z));var R="function"==typeof b||"object"==typeof F||"function"==typeof A?function(e){return B(e).toLowerCase()}:function(e){var r;return null===e?"null":"object"===(r=typeof e)?B(e).toLowerCase():r};function L(e){return"function"===R(e)}function q(e){var r=typeof e;return null!==e&&("object"===r||"function"===r)&&L(e.next)}var G,J=Object.getPrototypeOf;G=L(Object.getPrototypeOf)?J:function(e){var r=function(e){return e.__proto__}(e);return r||null===r?r:"[object Function]"===O(e.constructor)?e.constructor.prototype:e instanceof Object?Object.prototype:null};var X=G;function Z(e){return null==e?null:(e=Object(e),X(e))}var U=L(Object.assign),Y=Object.assign,D=Object;function H(e){return Object.keys(Object(e))}var K,Q=void 0!==Object.keys;function ee(e){return"[object Arguments]"===O(e)}K=function(){return ee(arguments)}();var re=K;function te(e){return"string"==typeof e}var ne=String.prototype.valueOf;var oe=m();function ie(e){return"object"==typeof e&&(e instanceof String||(oe?function(e){try{return ne.call(e),!0}catch(e){return!1}}(e):"[object String]"===O(e)))}function ae(e){return te(e)||ie(e)}function ue(e){return"number"==typeof e}g(ae,"isPrimitive",te),g(ae,"isObject",ie);var ce=Number,fe=ce.prototype.toString;var se=m();function le(e){return"object"==typeof e&&(e instanceof ce||(se?function(e){try{return fe.call(e),!0}catch(e){return!1}}(e):"[object Number]"===O(e)))}function pe(e){return ue(e)||le(e)}function ge(e){return e!=e}function he(e){return ue(e)&&ge(e)}function de(e){return le(e)&&ge(e.valueOf())}function ye(e){return he(e)||de(e)}g(pe,"isPrimitive",ue),g(pe,"isObject",le),g(ye,"isPrimitive",he),g(ye,"isObject",de);var be=Number.POSITIVE_INFINITY,ve=ce.NEGATIVE_INFINITY,we=Math.floor;function me(e){return we(e)===e}function je(e){return e<be&&e>ve&&me(e)}function _e(e){return ue(e)&&je(e)}function Oe(e){return le(e)&&je(e.valueOf())}function Ee(e){return _e(e)||Oe(e)}g(Ee,"isPrimitive",_e),g(Ee,"isObject",Oe);var Se=Object.prototype.propertyIsEnumerable;var Te=!Se.call("beep","0");function ke(e,r){var t;return null!=e&&(!(t=Se.call(e,r))&&Te&&ae(e)?!he(r=+r)&&_e(r)&&r>=0&&r<e.length:t)}var xe=re?ee:function(e){return null!==e&&"object"==typeof e&&!C(e)&&"number"==typeof e.length&&me(e.length)&&e.length>=0&&e.length<=4294967295&&y(e,"callee")&&!ke(e,"callee")},Ie=Array.prototype.slice;var Me=ke((function(){}),"prototype"),Ve=!ke({toString:null},"toString");function Pe(e){return"object"==typeof e&&null!==e&&"number"==typeof e.length&&me(e.length)&&e.length>=0&&e.length<=9007199254740991}function Ae(e,r,t){var n,o;if(!Pe(e)&&!te(e))throw new TypeError("invalid argument. First argument must be an array-like object. Value: `"+e+"`.");if(0===(n=e.length))return-1;if(3===arguments.length){if(!_e(t))throw new TypeError("invalid argument. `fromIndex` must be an integer. Value: `"+t+"`.");if(t>=0){if(t>=n)return-1;o=t}else(o=n+t)<0&&(o=0)}else o=0;if(ye(r)){for(;o<n;o++)if(ye(e[o]))return o}else for(;o<n;o++)if(e[o]===r)return o;return-1}function Fe(e){return e.constructor&&e.constructor.prototype===e}var $e=["console","external","frame","frameElement","frames","innerHeight","innerWidth","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","scrollLeft","scrollTop","scrollX","scrollY","self","webkitIndexedDB","webkitStorageInfo","window"],Ne="undefined"==typeof window?void 0:window;var Ce=function(){var e;if("undefined"===R(Ne))return!1;for(e in Ne)try{-1===Ae($e,e)&&y(Ne,e)&&null!==Ne[e]&&"object"===R(Ne[e])&&Fe(Ne[e])}catch(e){return!0}return!1}(),ze="undefined"!=typeof window;var We,Be=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];We=Q?function(){return 2!==(H(arguments)||"").length}(1,2)?function(e){return xe(e)?H(Ie.call(e)):H(e)}:H:function(e){var r,t,n,o,i,a,u;if(o=[],xe(e)){for(u=0;u<e.length;u++)o.push(u.toString());return o}if("string"==typeof e){if(e.length>0&&!y(e,"0"))for(u=0;u<e.length;u++)o.push(u.toString())}else{if(!1==(n="function"==typeof e)&&!z(e))return o;t=Me&&n}for(i in e)t&&"prototype"===i||!y(e,i)||o.push(String(i));if(Ve)for(r=function(e){if(!1===ze&&!Ce)return Fe(e);try{return Fe(e)}catch(e){return!1}}(e),u=0;u<Be.length;u++)a=Be[u],r&&"constructor"===a||!y(e,a)||o.push(String(a));return o};var Re,Le=We,qe=D.getOwnPropertyDescriptor;Re=U?Y:function(e){var r,t,n,o,i,a,u,c;if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(a=D(e),u=1;u<arguments.length;u++)if(null!=(r=arguments[u]))for(i=(n=Le(D(r))).length,c=0;c<i;c++)o=n[c],void 0!==(t=qe(r,o))&&t.enumerable&&(a[o]=r[o]);return a};var Ge=Re;function Je(e){var r=typeof e;return null===e||"object"!==r&&"function"!==r?new TypeError("invalid argument. A provided constructor must be either an object (except null) or a function. Value: `"+e+"`."):null}var Xe=Object.create;function Ze(){}var Ue="function"==typeof Xe?Xe:function(e){return Ze.prototype=e,new Ze};function Ye(e,r,t){p(e,r,{configurable:!0,enumerable:!1,writable:!0,value:t})}var De="function"==typeof Buffer?Buffer:null;var He,Ke=r.Buffer;He=function(){var e,r;if("function"!=typeof De)return!1;try{e=W(r="function"==typeof De.from?De.from([1,2,3,4]):new De([1,2,3,4]))&&1===r[0]&&2===r[1]&&3===r[2]&&4===r[3]}catch(r){e=!1}return e}()?Ke:function(){throw new Error("not implemented")};var Qe=He,er=L(Qe.from);function rr(e){return"number"==typeof e}function tr(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function nr(e,r,t){var n=!1,o=r-e.length;return o<0||(function(e){return"-"===e[0]}(e)&&(n=!0,e=e.substr(1)),e=t?e+tr(o):tr(o)+e,n&&(e="-"+e)),e}var or=String.prototype.toLowerCase,ir=String.prototype.toUpperCase;function ar(e){var r,t,n;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(t=e.arg,n=parseInt(t,10),!isFinite(n)){if(!rr(t))throw new Error("invalid integer. Value: "+t);n=0}return n<0&&("u"===e.specifier||10!==r)&&(n=4294967295+n+1),n<0?(t=(-n).toString(r),e.precision&&(t=nr(t,e.precision,e.padRight)),t="-"+t):(t=n.toString(r),n||e.precision?e.precision&&(t=nr(t,e.precision,e.padRight)):t="",e.sign&&(t=e.sign+t)),16===r&&(e.alternate&&(t="0x"+t),t=e.specifier===ir.call(e.specifier)?ir.call(t):or.call(t)),8===r&&e.alternate&&"0"!==t.charAt(0)&&(t="0"+t),t}function ur(e){return"string"==typeof e}var cr=Math.abs,fr=String.prototype.toLowerCase,sr=String.prototype.toUpperCase,lr=String.prototype.replace,pr=/e\+(\d)$/,gr=/e-(\d)$/,hr=/^(\d+)$/,dr=/^(\d+)e/,yr=/\.0$/,br=/\.0*e/,vr=/(\..*[^0])0*e/;function wr(e){var r,t,n=parseFloat(e.arg);if(!isFinite(n)){if(!rr(e.arg))throw new Error("invalid floating-point number. Value: "+t);n=e.arg}switch(e.specifier){case"e":case"E":t=n.toExponential(e.precision);break;case"f":case"F":t=n.toFixed(e.precision);break;case"g":case"G":cr(n)<1e-4?((r=e.precision)>0&&(r-=1),t=n.toExponential(r)):t=n.toPrecision(e.precision),e.alternate||(t=lr.call(t,vr,"$1e"),t=lr.call(t,br,"e"),t=lr.call(t,yr,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return t=lr.call(t,pr,"e+0$1"),t=lr.call(t,gr,"e-0$1"),e.alternate&&(t=lr.call(t,hr,"$1."),t=lr.call(t,dr,"$1.e")),n>=0&&e.sign&&(t=e.sign+t),t=e.specifier===sr.call(e.specifier)?sr.call(t):fr.call(t)}function mr(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}function jr(e,r,t){var n=r-e.length;return n<0?e:e=t?e+mr(n):mr(n)+e}var _r=String.fromCharCode,Or=isNaN,Er=Array.isArray;function Sr(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function Tr(e){var r,t,n,o,i,a,u,c,f;if(!Er(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(a="",u=1,c=0;c<e.length;c++)if(ur(n=e[c]))a+=n;else{if(r=void 0!==n.precision,!(n=Sr(n)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+n+"`.");for(n.mapping&&(u=n.mapping),t=n.flags,f=0;f<t.length;f++)switch(o=t.charAt(f)){case" ":n.sign=" ";break;case"+":n.sign="+";break;case"-":n.padRight=!0,n.padZeros=!1;break;case"0":n.padZeros=t.indexOf("-")<0;break;case"#":n.alternate=!0;break;default:throw new Error("invalid flag: "+o)}if("*"===n.width){if(n.width=parseInt(arguments[u],10),u+=1,Or(n.width))throw new TypeError("the argument for * width at position "+u+" is not a number. Value: `"+n.width+"`.");n.width<0&&(n.padRight=!0,n.width=-n.width)}if(r&&"*"===n.precision){if(n.precision=parseInt(arguments[u],10),u+=1,Or(n.precision))throw new TypeError("the argument for * precision at position "+u+" is not a number. Value: `"+n.precision+"`.");n.precision<0&&(n.precision=1,r=!1)}switch(n.arg=arguments[u],n.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(n.padZeros=!1),n.arg=ar(n);break;case"s":n.maxWidth=r?n.precision:-1;break;case"c":if(!Or(n.arg)){if((i=parseInt(n.arg,10))<0||i>127)throw new Error("invalid character code. Value: "+n.arg);n.arg=Or(i)?String(n.arg):_r(i)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(n.precision=6),n.arg=wr(n);break;default:throw new Error("invalid specifier: "+n.specifier)}n.maxWidth>=0&&n.arg.length>n.maxWidth&&(n.arg=n.arg.substring(0,n.maxWidth)),n.padZeros?n.arg=nr(n.arg,n.width||n.precision,n.padRight):n.width&&(n.arg=jr(n.arg,n.width,n.padRight)),a+=n.arg||"",u+=1}return a}var kr,xr=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function Ir(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function Mr(e){var r,t,n,o;for(t=[],o=0,n=xr.exec(e);n;)(r=e.slice(o,xr.lastIndex-n[0].length)).length&&t.push(r),t.push(Ir(n)),o=xr.lastIndex,n=xr.exec(e);return(r=e.slice(o)).length&&t.push(r),t}function Vr(e){return"string"==typeof e}function Pr(e){var r,t,n;if(!Vr(e))throw new TypeError(Pr("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=Mr(e),(t=new Array(arguments.length))[0]=r,n=1;n<t.length;n++)t[n]=arguments[n];return Tr.apply(null,t)}kr=er?function(e,r){if(!te(e))throw new TypeError(Pr("invalid argument. First argument must be a string. Value: `%s`.",e));if(arguments.length>1){if(!te(r))throw new TypeError(Pr("invalid argument. Second argument must be a string. Value: `%s`.",r));return Qe.from(e,r)}return Qe.from(e,"utf8")}:function(e,r){if(!te(e))throw new TypeError(Pr("invalid argument. First argument must be a string. Value: `%s`.",e));if(arguments.length>1){if(!te(r))throw new TypeError(Pr("invalid argument. Second argument must be a string. Value: `%s`.",r));return new Qe(e,r)}return new Qe(e,"utf8")};var Ar=kr,Fr=t;function $r(){var e,r=arguments,t=r[0],n="https://stdlib.io/e/"+t+"?";for(e=1;e<r.length;e++)n+="&arg[]="+encodeURIComponent(r[e]);return n}var Nr={objectMode:!1,encoding:null,sep:"\n"};var Cr=Object.prototype;function zr(e){var r;return!!function(e){return"object"==typeof e&&null!==e&&!C(e)}(e)&&(!(r=Z(e))||!y(e,"constructor")&&y(r,"constructor")&&L(r.constructor)&&"[object Function]"===O(r.constructor)&&y(r,"isPrototypeOf")&&L(r.isPrototypeOf)&&(r===Cr||function(e){var r;for(r in e)if(!y(e,r))return!1;return!0}(e)))}function Wr(e){return ue(e)&&e>=0}function Br(e){return le(e)&&e.valueOf()>=0}function Rr(e){return Wr(e)||Br(e)}function Lr(e,r){return zr(r)?y(r,"sep")&&(e.sep=r.sep,!te(e.sep))?new TypeError($r("0g12i","sep",e.sep)):y(r,"objectMode")&&(e.objectMode=r.objectMode,!v(e.objectMode))?new TypeError($r("0g130","objectMode",e.objectMode)):y(r,"encoding")&&(e.encoding=r.encoding,!te(e.encoding)&&null!==e.encoding)?new TypeError($r("0g184","encoding",e.encoding)):y(r,"highWaterMark")&&(e.highWaterMark=r.highWaterMark,!Wr(e.highWaterMark))?new TypeError($r("0g14x","highWaterMark",e.highWaterMark)):y(r,"serialize")&&(e.serialize=r.serialize,!L(e.serialize))?new TypeError($r("0g178","serialize",e.serialize)):null:new TypeError($r("0g12h",r))}g(Rr,"isPrimitive",Wr),g(Rr,"isObject",Br);var qr=h(Object.freeze({__proto__:null,default:()=>()=>{}}))("from-iterator-stream"),Gr=e.Readable;function Jr(e,r){var t,n;if(!(this instanceof Jr))return arguments.length>1?new Jr(e,r):new Jr(e);if(!q(e))throw new TypeError($r("0g148",e));if(t=Ge({},Nr),arguments.length>1&&(n=Lr(t,r)))throw n;return qr("Creating a readable stream configured with the following options: %s.",JSON.stringify(t)),Gr.call(this,t),Ye(this,"_destroyed",!1),g(this,"_objectMode",t.objectMode),g(this,"_sep",t.sep),g(this,"_serialize",t.serialize||JSON.stringify),g(this,"_iterator",e),Ye(this,"_i",0),this}return function(e,r){var t=Je(e);if(t)throw t;if(t=Je(r))throw t;if(void 0===r.prototype)throw new TypeError("invalid argument. Second argument must have a prototype from which another object can inherit. Value: `"+r.prototype+"`.");e.prototype=Ue(r.prototype),p(e.prototype,"constructor",{configurable:!0,enumerable:!1,writable:!0,value:e})}(Jr,Gr),g(Jr.prototype,"_read",(function(){var e,r,t;if(!this._destroyed)for(e=!0;e;){if(t=this._iterator.next(),this._i+=1,t.done)return y(t,"value")&&(t=t.value,qr("Value: %s. Iter: %d.",JSON.stringify(t),this._i),!1===this._objectMode&&("string"==typeof(t=this._serialize(t))?(t=1===this._i?Ar(t):Ar(this._sep+t),this.push(t)):W(t)?(this._i>1&&(t=Qe.concat([Ar(this._sep),t])),this.push(t)):(r=new Error($r("0g1Au",t)),this.emit("error",r)))),qr("Finished iteration."),this.push(null);if(t=t.value,qr("Value: %s. Iter: %d.",JSON.stringify(t),this._i),!1===this._objectMode)if("string"==typeof(t=this._serialize(t)))t=1===this._i?Ar(t):Ar(this._sep+t);else{if(!W(t)){r=new Error($r("0g1Au",t)),this.emit("error",r);continue}this._i>1&&(t=Qe.concat([Ar(this._sep),t]))}e=this.push(t)}})),g(Jr.prototype,"destroy",(function(e){var r;return this._destroyed?(qr("Attempted to destroy an already destroyed stream."),this):(r=this,this._destroyed=!0,function(e){var r,t;for(r=[],t=1;t<arguments.length;t++)r.push(arguments[t]);function n(){e.apply(null,r)}Fr.nextTick(n)}((function(){e&&(qr("Stream was destroyed due to an error. Error: %s.",function(e){if("object"!=typeof e||null===e)return!1;if(e instanceof Error)return!0;for(;e;){if("[object Error]"===O(e))return!0;e=Z(e)}return!1}(e)?e.message:JSON.stringify(e)),r.emit("error",e));qr("Closing the stream..."),r.emit("close")})),this)})),g(Jr,"objectMode",(function(e,r){var t;if(arguments.length>1){if(!zr(t=r))throw new TypeError($r("0g12h",t));t=Ge({},r)}else t={};return t.objectMode=!0,new Jr(e,t)})),g(Jr,"factory",(function(e){var r;return r=arguments.length?Ge({},e):{},t;function t(e){return new Jr(e,r)}})),Jr}));
//# sourceMappingURL=index.js.map
