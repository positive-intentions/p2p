"use strict";(self.webpackChunkp2p=self.webpackChunkp2p||[]).push([[29],{29:(e,n,t)=>{t.r(n),t.d(n,{PeerContext:()=>m,default:()=>d});var r,o=t(914),c=t.n(o),i=t(134),u=t(792);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n,t){return(n=function(e){var n=function(e,n){if("object"!=l(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==l(n)?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function y(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,c,i,u=[],l=!0,a=!1;try{if(c=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;l=!1}else for(;!(l=(r=c.call(t)).done)&&(u.push(r.value),u.length!==n);l=!0);}catch(e){a=!0,o=e}finally{try{if(!l&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(a)throw o}}return u}}(e,n)||p(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,n){if(e){if("string"==typeof e)return b(e,n);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,n):void 0}}function b(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}(0,u.define)({tag:"my-button",component:function(e){var n=e.children,t=e.initialstate,o=void 0===t?0:t,c=y((0,u.useState)(parseInt(o)),2),i=c[0],l=c[1];(0,u.useEffect)((function(){return console.log("Button mounted"),function(){console.log("Button unmounted")}}),[]),(0,u.useEffect)((function(){console.log("count effect triggered")}),[i()]);var a,f,s=(0,u.useMemo)((function(){var e=2*i();return console.log("memo calculation triggered:",e),e}),[i()]);return(0,u.html)(r||(a=['\n        <button @click="','">\n            ',"\n            ","\n            ","\n        </button>\n    "],f||(f=a.slice(0)),r=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(f)}}))),(function(){return l(i()+1)}),n,i(),s)}});var m=(0,o.createContext)();function d(e){var n=e.peerId,t=(e.config,e.contacts),r=e.contactId,l=e.appiSchema,a=e.state,d=e.actions,v=e.onConnection,g=e.children,h=y((0,o.useState)(null),2),O=h[0],S=h[1],j=y((0,o.useState)({}),2),E=j[0],w=j[1],P=y((0,o.useState)({}),2),k=P[0],C=(P[1],y((0,o.useState)(a),2)),A=C[0],I=C[1],D=(0,u.useMemo)((function(){return[].concat((e=t,function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),[r||null]).filter((function(e){return!!e}));var e}),[JSON.stringify(t),r]);(0,o.useEffect)((function(){if(n&&!O||null!=O&&O.id&&O.id!==n){var e=new i.Ay(n);N(e)}else n||(O.destroy(),S(null))}),[n,O]);var N=function(e){e.on("open",(function(){console.log("Peer connected with ID:",e.id),S(e),M(e)})),e.on("disconnected",(function(){console.log("Peer disconnected"),e.reconnect()})),e.on("connection",(function(e){console.log("Received connection from",e.peer),x(e)})),e.on("close",(function(){console.log("Peer connection closed"),S(null)})),e.on("error",(function(e){console.error("Peer error:",e),console.log({err:e});var n=f({},E);Object.keys(n).forEach((function(e){!1===n[e].open&&delete n[e]})),w(n)}))},x=(0,o.useCallback)((function(e){try{e.off("data")}catch(e){console.log("error removing data listener",e)}e.on("data",(function(n){return J(e,n)})),e.on("open",(function(){v&&v(e)})),e.on("close",(function(){console.log("Connection ".concat(e.peer," closed")),w((function(n){var t=f({},n);return delete t[e.peer],t}))})),w((function(n){return f(f({},n),{},s({},e.peer,e))}))}),[v,A]),J=(0,o.useCallback)((function(e,n){n.type&&l[n.type]&&l[n.type](A,f(f({},d),{},{setState:function(e){return I((function(n){return"function"==typeof e?e(n):f(f({},n),e)}))}})).forEach((function(t){t(f({},n),{send:function(n){return e.send(n)}},(function(){}))}))}),[l,A,d]),M=(0,o.useCallback)((function(e){D.filter((function(e){return!!e})).forEach((function(n){if(!E[n]){console.log("connecting to",n,"...");var t=e.connect(n);x(t)}}))}),[D,E,x]);return(0,o.useEffect)((function(){D.length>0&&O&&M(O)}),[JSON.stringify(D),O]),!!Object.keys(E).length&&c().createElement(m.Provider,{value:{peer:O,emit:J,call:x,streams:k,connections:E}},g,c().createElement("br",null),"counter: ",JSON.stringify(A.number),c().createElement("br",null),"peerjs: ",O?"connected":"disconnected",c().createElement("br",null),"connections:",c().createElement("ol",null,Object.keys(E).map((function(e){return c().createElement("li",{key:e},e,c().createElement("input",{type:"button",value:"ping",onClick:function(){return E[e].send({type:"ping"})}}),c().createElement("input",{type:"button",value:"increase remote counter",onClick:function(){return E[e].send({type:"addNumber",number:1})}}),c().createElement("input",{type:"button",value:"decrease remote counter",onClick:function(){return E[e].send({type:"addNumber",number:-1})}}))}))),c().createElement("my-button",{id:"aaa",initialstate:"3"},"Click me"))}}}]);