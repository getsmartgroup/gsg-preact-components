var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;import{N as l,a as i}from"./vendor.js";let a;const d={};null==window||window.addEventListener("load",(()=>{document.querySelectorAll("[data-component]").forEach((e=>{const s=e.getAttribute("data-component"),c=e.getAttributeNames().reduce(((t,r)=>{if(r&&"data-component"!==r){const n=e.getAttribute(r);n&&(t[r]=n)}return t}),{});s&&function(e,t){if(!t)return e();if(void 0===a){const e=document.createElement("link").relList;a=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in d)return;d[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":a,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))}((()=>import(`./components/${s}`)),void 0).then((a=>{a&&l(i(a.default,((e,l)=>{for(var i in l||(l={}))r.call(l,i)&&o(e,i,l[i]);if(t)for(var i of t(l))n.call(l,i)&&o(e,i,l[i]);return e})({},c)),e)}))}))}));
