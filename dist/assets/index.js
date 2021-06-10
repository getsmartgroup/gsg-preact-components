var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,l=(e,t)=>{for(var n in t||(t={}))i.call(t,n)&&s(e,n,t[n]);if(o)for(var n of o(t))r.call(t,n)&&s(e,n,t[n]);return e};import{q as a,l as c,a as u,F as d,y as h,B as m,b as v,C as y,A as p,c as b,d as g,e as f,H as S,f as C,g as P,V as I,R as j,S as O,h as k,i as w,j as x,k as N,m as T,n as G,o as E,p as D,u as L,r as _,s as q,T as R,t as V,v as A,w as M,x as B,z as W,I as $,D as z,E as Q,N as U}from"./vendor.js";class H{getID(){return this.data.id}constructor(e){var t,n;this.data=e,this.coloredParts=["shell","cabinet"].map((t=>{var n,o;const i=e[t+"Image"];return{name:t,image:null==(n=null==i?void 0:i[0])?void 0:n.url,color:null==(o=e[t+"Color"])?void 0:o[0]}})),this.combinedColor=null!=(n=null==(t=this.data.combinationColor)?void 0:t[0])?n:null}get combinedImage(){var e,t;return null==(t=null==(e=this.data.combinationImage)?void 0:e[0])?void 0:t.url}}const J=async e=>{return(t="https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7",n=`\n\tproductColorCombinations( product : "${e}" ) {\n\t\tid\n\t\tshellColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcabinetColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcombinationImage\n\t\tshellImage\n\t\tcabinetImage\n\t\tcombinationColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t}\n\t`,fetch(t,{method:"POST",body:JSON.stringify({query:`{${n}}`}),headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((e=>e.json())).then((e=>e.data))).then((e=>(console.log(e),e))).then((e=>{var t;return null==(t=null==e?void 0:e.productColorCombinations)?void 0:t.map((e=>new H(e)))}));var t,n},F=(e,o)=>{let i=e;const r=e=>{i=l(l({},i),e),o(i)},s=e=>t=>r({[e]:t}),a=s("combinations"),c=s("error"),u=s("colorsIndex"),d=s("combinedColors"),h=(e,t)=>{var n,o;const r={},s=i.combinations.filter((n=>{for(const o of n.coloredParts)if(o.name===e&&o.color&&o.color.name!==t)return!1;return!0})),l=[];for(const c of s){let e=0;for(const t of c.coloredParts)t.color&&i.selectedPartColors[t.name]===t.color.name&&e++;l[e]=c}const a=l.pop();if(null==a?void 0:a.coloredParts)for(const i of a.coloredParts)(null==(n=null==i?void 0:i.color)?void 0:n.name)&&(null==i?void 0:i.name)&&(r[i.name]=null==(o=null==i?void 0:i.color)?void 0:o.name);return r},m=e=>{const t=i.selectedPartColors;return i.combinations.filter((n=>{for(const o of n.coloredParts)if(o.name!==e&&t[o.name]&&o.color&&t[o.name]!==o.color.name)return!1;return!0}),[])},v=e=>{var t,n;return null!=(n=null==(t=m(e))?void 0:t.reduce(((t,n)=>(n.coloredParts.forEach((n=>{var o;(null==n?void 0:n.name)===e&&(null==(o=null==n?void 0:n.color)?void 0:o.name)&&t.push(n.color.name)})),t)),[]))?n:[]},y=(e,t)=>v(e).includes(t);return{state:i,actions:{setCombinations:a,setError:c,setColorsIndexedByPart:e=>{s("colorsIndexedByPart")(e)},setColorsIndex:u,setCombinedColors:d,selectPartColor:(e,o)=>{var s,a;y(e,o)?r({selectedPartColors:(s=l({},i.selectedPartColors),a={[e]:o},t(s,n(a)))}):r({selectedPartColors:h(e,o)})},selectCombinedColor:e=>{r({selectedCombinedColor:e})}},utilities:{getCompatibleCombinationsFor:m,getCompatibleColorsFor:v,isCompatiblePartColor:y,getSelectionCompatibleWith:h,getSelectedCombination:()=>{var e;return null==(e=null==i?void 0:i.combinations)?void 0:e.find((e=>{var t;if(e.coloredParts.length>0){for(const n of e.coloredParts)if(!i.selectedPartColors[n.name]||i.selectedPartColors[n.name]!==(null==(t=null==n?void 0:n.color)?void 0:t.name))return!1;return!0}return!1}))}}}},K=a(null),X=()=>{var e;return null==(e=d(K))?void 0:e.state},Y=()=>{var e;return null==(e=d(K))?void 0:e.actions},Z=()=>{var e;return null==(e=d(K))?void 0:e.utilities},ee=({children:e})=>{const[t,n]=c({combinations:[],colorsIndexedByPart:{},selectedPartColors:{}});return u(K.Provider,{value:F(t,n)},e)},te=()=>{const{error:e}=X();return console.log("[ERROR]",e),u("div",null,u("div",null,"An Error Occurred"),u("p",null,null==e?void 0:e.name),u("p",null,null==e?void 0:e.stack))},ne=()=>{var e,t;const{combinations:n,selectedCombinedColor:o}=X(),{getSelectedCombination:i}=Z(),r=i(),s=o?[null==(e=n.find((e=>{var t;return(null==(t=null==e?void 0:e.combinedColor)?void 0:t.name)===o})))?void 0:e.combinedImage]:(null==r?void 0:r.combinedImage)?[r.combinedImage]:null==(t=null==r?void 0:r.coloredParts)?void 0:t.map((e=>null==e?void 0:e.image));return s?u(m,{w:"full",position:"relative"},s.filter((e=>e)).map((e=>u("img",{src:e,class:"gsg-procuts-hot-tub"})))):null},oe=()=>{var e;const{colorsIndexedByPart:t,colorsIndex:n,selectedPartColors:o,combinedColors:i,selectedCombinedColor:r}=X(),{selectPartColor:s,selectCombinedColor:l}=Y(),{isCompatiblePartColor:a}=Z(),c=Object.entries(t).reduce(((e,[t,i])=>{const r=[],l=[];i.forEach((e=>{var i,c,d;const h=a(t,e),m=null==n?void 0:n[e];if(m){const e={width:"60px",outline:o[t]===(null==m?void 0:m.image)?"1px solid rgba(0,0,0,0.1)":"",opacity:h?1:.5},n=u("li",{style:e,onClick:()=>s(t,null==m?void 0:m.name)},u("img",{style:{width:"60px",height:"60px",objectFit:"cover",position:"static",margin:"auto"},src:null!=(d=null==(c=null==(i=null==m?void 0:m.image)?void 0:i[0])?void 0:c.url)?d:"",alt:`${null==m?void 0:m.name} ${t}`}));h?r.push(n):l.push(n)}}),[]);const c=[];return r.length>0&&c.push(u("div",{style:{marginBottom:20}},u("div",{style:{marginBottom:7}},u("b",null,"Compatible ",t," Colors")),u("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},r))),l.length>0&&c.push(u("div",null,u("div",{style:{marginBottom:7}},u("b",null,"Other ",t," Colors")),u("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},l))),e.push(u("div",{style:{display:"flex"}},c)),e}),[]);if(i&&(null==i?void 0:i.length)>0){const t=null!=(e=null==i?void 0:i.reduce(((e,t)=>{var o,i;const s=null==n?void 0:n[t];return s&&e.push(u("li",{style:{width:"150px",outline:r===(null==s?void 0:s.name)?"1px solid rgba(0,0,0,0.1)":""},onClick:()=>l(null==s?void 0:s.name)},u("img",{style:{width:"100%"},src:null==(i=null==(o=null==s?void 0:s.image)?void 0:o[0])?void 0:i.url,alt:`${null==s?void 0:s.name}`}))),e}),[]))?e:[];c.push(u("div",null,u("div",null,u("b",null,"Combined Colors")),u("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},t)))}return u(v,null,c)},ie=()=>u("div",{class:"gsg-color-selector"},u("h3",null,"Color Selector"),u("div",{style:{display:"flex",justifyContent:"space-around"}},u(ne,null),u(oe,null))),re=({product:e})=>{const{setCombinations:t,setError:n,setColorsIndexedByPart:o,setColorsIndex:i,setCombinedColors:r,selectCombinedColor:s,selectPartColor:l}=Y(),{error:a,selectedPartColors:c,selectedCombinedColor:d,combinedColors:m,colorsIndexedByPart:v}=X(),{isCompatiblePartColor:y}=Z();if(null==m?void 0:m[0]){const e=m[0];!d&&e&&s(e)}else for(const[u,h]of Object.entries(v))if(!c[u])for(const e of h)e&&y(u,e)&&l(u,e);return h((()=>{J(e).then((e=>{var n,s,l;t(e),o(null!=(n=null==e?void 0:e.reduce(((e,t)=>{var n;return null==(n=null==t?void 0:t.coloredParts)||n.forEach((t=>{var n;if(t.color){let o=null!=(n=e[t.name])?n:[];t.color.name&&!o.includes(t.color.name)&&o.push(t.color.name),e[t.name]=o}})),e}),{}))?n:{}),i(null!=(s=null==e?void 0:e.reduce(((e,t)=>{var n,o,i;return(null==t?void 0:t.combinedColor)&&(null==(n=null==t?void 0:t.combinedColor)?void 0:n.name)&&!e[null==(o=null==t?void 0:t.combinedColor)?void 0:o.name]?e[null==(i=null==t?void 0:t.combinedColor)?void 0:i.name]=null==t?void 0:t.combinedColor:t.coloredParts.forEach((t=>{var n,o,i;(null==(n=t.color)?void 0:n.name)&&!e[null==(o=t.color)?void 0:o.name]&&(e[null==(i=null==t?void 0:t.color)?void 0:i.name]=t.color)})),e}),{}))?s:{}),r(null!=(l=null==e?void 0:e.reduce(((e,t)=>{var n;return(null==(n=null==t?void 0:t.combinedColor)?void 0:n.name)&&!e.includes(t.combinedColor.name)&&e.push(t.combinedColor.name),e}),[]))?l:{})})).catch(n)}),[e]),u("div",null,u(a?te:ie,null))},se="https://cloud3.evosus.com/api".replace(/\/+$/,"");class le extends Error{constructor(e,t){super(t),this.field=e,this.name="RequiredError"}}const ae="https://example.com",ce=function(e,t,n){if(null==n)throw new le(t,`Required parameter ${t} was null or undefined when calling ${e}.`)},ue=function(e,...t){const n=new URLSearchParams(e.search);for(const o of t)for(const e in o)if(Array.isArray(o[e])){n.delete(e);for(const t of o[e])n.append(e,t)}else n.set(e,o[e]);e.search=n.toString()},de=function(e,t,n){const o="string"!=typeof e;return(o&&n&&n.isJsonMime?n.isJsonMime(t.headers["Content-Type"]):o)?JSON.stringify(void 0!==e?e:{}):e||""},he=function(e){return e.pathname+e.search+e.hash},me=function(e,t,n,o){return(i=t,r=n)=>{const s=Object.assign(Object.assign({},e.options),{url:((null==o?void 0:o.basePath)||r)+e.url});return i.request(s)}};var ve=function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{a(o.next(e))}catch(t){r(t)}}function l(e){try{a(o.throw(e))}catch(t){r(t)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}a((o=o.apply(e,t||[])).next())}))};const ye=function(e){const t=function(e){return{inventoryDistributionMethodSearch:(t,n,o={})=>ve(this,void 0,void 0,(function*(){ce("inventoryDistributionMethodSearch","companySN",t),ce("inventoryDistributionMethodSearch","ticket",n);const i=new URL("/method/Inventory_DistributionMethod_Search",ae);let r;e&&(r=e.baseOptions);const s=Object.assign(Object.assign({method:"POST"},r),o),l={};void 0!==t&&(l.CompanySN=t),void 0!==n&&(l.ticket=n),ue(i,l,o.query);let a=r&&r.headers?r.headers:{};return s.headers=Object.assign(Object.assign(Object.assign({},{}),a),o.headers),{url:he(i),options:s}})),inventoryItemGet:(t,n,o,i={})=>ve(this,void 0,void 0,(function*(){ce("inventoryItemGet","companySN",t),ce("inventoryItemGet","ticket",n),ce("inventoryItemGet","body",o);const r=new URL("/method/Inventory_Item_Get",ae);let s;e&&(s=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},s),i),a={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),a["Content-Type"]="application/json",ue(r,c,i.query);let u=s&&s.headers?s.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},a),u),i.headers),l.data=de(o,l,e),{url:he(r),options:l}})),inventoryItemSearch:(t,n,o,i={})=>ve(this,void 0,void 0,(function*(){ce("inventoryItemSearch","companySN",t),ce("inventoryItemSearch","ticket",n),ce("inventoryItemSearch","body",o);const r=new URL("/method/Inventory_Item_Search",ae);let s;e&&(s=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},s),i),a={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),a["Content-Type"]="application/json",ue(r,c,i.query);let u=s&&s.headers?s.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},a),u),i.headers),l.data=de(o,l,e),{url:he(r),options:l}})),inventoryItemStockSiteQuantityGet:(t,n,o,i={})=>ve(this,void 0,void 0,(function*(){ce("inventoryItemStockSiteQuantityGet","companySN",t),ce("inventoryItemStockSiteQuantityGet","ticket",n);const r=new URL("/method/Inventory_Item_StockSiteQuantity_Get",ae);let s;e&&(s=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},s),i),a={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),a["Content-Type"]="application/json",ue(r,c,i.query);let u=s&&s.headers?s.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},a),u),i.headers),l.data=de(o,l,e),{url:he(r),options:l}})),inventoryProductLineSearch:(t,n,o={})=>ve(this,void 0,void 0,(function*(){ce("inventoryProductLineSearch","companySN",t),ce("inventoryProductLineSearch","ticket",n);const i=new URL("/method/Inventory_ProductLine_Search",ae);let r;e&&(r=e.baseOptions);const s=Object.assign(Object.assign({method:"POST"},r),o),l={};void 0!==t&&(l.CompanySN=t),void 0!==n&&(l.ticket=n),ue(i,l,o.query);let a=r&&r.headers?r.headers:{};return s.headers=Object.assign(Object.assign(Object.assign({},{}),a),o.headers),{url:he(i),options:s}})),inventoryVendorSearch:(t,n,o,i={})=>ve(this,void 0,void 0,(function*(){ce("inventoryVendorSearch","companySN",t),ce("inventoryVendorSearch","ticket",n),ce("inventoryVendorSearch","body",o);const r=new URL("/method/Inventory_Vendor_Search",ae);let s;e&&(s=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},s),i),a={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),a["Content-Type"]="application/json",ue(r,c,i.query);let u=s&&s.headers?s.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},a),u),i.headers),l.data=de(o,l,e),{url:he(r),options:l}}))}}(e);return{inventoryDistributionMethodSearch(n,o,i){return ve(this,void 0,void 0,(function*(){const r=yield t.inventoryDistributionMethodSearch(n,o,i);return me(r,y,se,e)}))},inventoryItemGet(n,o,i,r){return ve(this,void 0,void 0,(function*(){const s=yield t.inventoryItemGet(n,o,i,r);return me(s,y,se,e)}))},inventoryItemSearch(n,o,i,r){return ve(this,void 0,void 0,(function*(){const s=yield t.inventoryItemSearch(n,o,i,r);return me(s,y,se,e)}))},inventoryItemStockSiteQuantityGet(n,o,i,r){return ve(this,void 0,void 0,(function*(){const s=yield t.inventoryItemStockSiteQuantityGet(n,o,i,r);return me(s,y,se,e)}))},inventoryProductLineSearch(n,o,i){return ve(this,void 0,void 0,(function*(){const r=yield t.inventoryProductLineSearch(n,o,i);return me(r,y,se,e)}))},inventoryVendorSearch(n,o,i,r){return ve(this,void 0,void 0,(function*(){const s=yield t.inventoryVendorSearch(n,o,i,r);return me(s,y,se,e)}))}}};class pe extends class{constructor(e,t=se,n=y){this.basePath=t,this.axios=n,e&&(this.configuration=e,this.basePath=e.basePath||this.basePath)}}{inventoryDistributionMethodSearch(e,t,n){return ye(this.configuration).inventoryDistributionMethodSearch(e,t,n).then((e=>e(this.axios,this.basePath)))}inventoryItemGet(e,t,n,o){return ye(this.configuration).inventoryItemGet(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryItemSearch(e,t,n,o){return ye(this.configuration).inventoryItemSearch(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryItemStockSiteQuantityGet(e,t,n,o){return ye(this.configuration).inventoryItemStockSiteQuantityGet(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryProductLineSearch(e,t,n){return ye(this.configuration).inventoryProductLineSearch(e,t,n).then((e=>e(this.axios,this.basePath)))}inventoryVendorSearch(e,t,n,o){return ye(this.configuration).inventoryVendorSearch(e,t,n,o).then((e=>e(this.axios,this.basePath)))}}const be=e=>{const[t,n]=c(null),[o,i]=c(null),[r,s]=c(null),[l,a]=c(["price","quantity","name","weight"]),[d,v]=c(!1),[y,L]=c(null);h((()=>{(({ticket:e,companySN:t,gsgToken:n,clientID:o})=>t&&e?n&&o?Promise.resolve({ticket:e,companySN:t,gsgToken:n,clientID:o}):Promise.reject("Invalid GSG access credentials"):Promise.reject("Invalid evosus access credentials"))(e).then((({ticket:e,companySN:t})=>(async(e,{companySN:t,ticket:n})=>{const o=await e.inventoryProductLineSearch(t,n).then((e=>e.data.response));return o?Promise.resolve(o):Promise.reject("Failed to retrieve product line items from Evosus API")})(new pe,{ticket:e,companySN:t}).then(n).then(i.bind(null,null)))).catch(i)}),[e]);return u(m,null,u(S,{w:"100%",textAlign:"right"},"GSG Evosus Dashboard"),u(m,null,o?u(T,{status:"error"},u(G,null),u(E,{mr:2},o),u(D,null)):null),u(p,{allowMultiple:!0},u(b,null,u(g,{w:"100%"},u(f,{w:"100%",alignItems:"center",justifyContent:"space-between"},u(S,{size:"md"},"Sync Products"),u(C,null))),u(P,{pb:4},u(I,{w:"100%",justifyContent:"stretch",alignItems:"stretch",alignContent:"stretch",justifyItems:"stretch"},u(S,{size:"sm"},"Select a product Line"),null===t?"Loading Product Lines":null,u(j,{onChange:s,value:null!=r?r:""},u(O,{columns:2},null==t?void 0:t.map((({ProductLine:e,ProductLineID:t})=>u(k,{value:null==t?void 0:t.toString()},e))))),u(S,{size:"sm"},"Select which properties should be synced"),u(w,{onChange:e=>a(e),value:l},u(O,null,u(x,{value:"name"},"Product Name"),u(x,{value:"price"},"Price"),u(x,{value:"quantity"},"Quantity"),u(x,{value:"weight"},"Weight"))),u(m,null,u(N,{onClick:()=>{v(!0),fetch(`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${e.clientID}`,{method:"POST",body:JSON.stringify({search:{productLineID:r},fields:l}),headers:{authorization:`Bearer ${e.gsgToken}`,"content-type":"application/json"}}).then((async e=>{if(408===e.status)throw i("The request timed out, you may try again to finish syncing"),new Error(await e.text());return 200!==e.status?(i(null),e.json()):e.json()})).then(L).then(i.bind(null,null)).catch(i.bind(null,"Error while syncing")).finally(v.bind(null,!1))},w:"100%",mt:8,disabled:d||!r||0===l.length},"Sync Products")),u(m,null,d?"Syncing...":null))))))},ge=({nonce:e,siteurl:t,cookieHash:n,cookieValue:o})=>{n&&o&&Q.set(n,o);const i={"X-WP-Nonce":e,"content-type":"application/json"};return{get:()=>fetch(`${t}/wp-json/gsg/v1/options`,{headers:i,credentials:"include"}).then((e=>e.json())),set:e=>fetch(`${t}/wp-json/gsg/v1/options`,{headers:i,credentials:"include",method:"POST",body:JSON.stringify(e)}).then((e=>e.json()))}};var fe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ProductColors:({product:e})=>u(ee,null,u(re,{product:e})),WordpressDashboard:({nonce:e,siteurl:t,cookieHash:n,cookieValue:o})=>{const i=ge({nonce:e,siteurl:t,cookieHash:n,cookieValue:o}),[r,s]=L(!1),[a,d]=L(!0),[v,y]=c({clientID:"",gsgToken:"",wc:{access:{key:"",secret:""}},evosus:{access:{companySN:"",ticket:""}}});h((()=>{i.get().then((e=>e?y(e):null)).finally(d.off.bind(null))}),[e,t,n,o]),h((()=>{if(!a){const i=ge({nonce:e,siteurl:t,cookieHash:n,cookieValue:o});s.on(),i.set(v).finally(s.off.bind(null))}}),[v]);const p=(e,t,n)=>{const o=e[t];return u($,{disabled:a,placeholder:n,value:e[t],onChange:n=>{const o=n.target.value;e[t]=o},onBlur:()=>{e[t]!==o&&y(l({},v))}})};return u(z,null,u(m,null,u(_,{as:"header",justifyContent:"center",alignItems:"center"},u(S,null,"Get Smart Plugin"),a||r?u(q,null):null),u(R,{variant:"soft-rounded",colorScheme:"blue"},u(V,null,u(A,null,"GSG"),u(A,null,"WooCommerce"),u(A,null,"Evosus")),u(M,null,u(B,null,u(S,{size:"sm"},"GSG Config"),u(W,{spacing:3},p(v,"clientID","Client ID"),p(v,"gsgToken","GSG Token"))),u(B,null,u(S,{size:"sm"},"WooCommerce Config"),u(W,{spacing:3},p(v.wc.access,"key","WC REST API Key"),p(v.wc.access,"secret","WC REST API Secret"))),u(B,null,u(S,{size:"sm"},"Evosus Config"),u(W,{spacing:3},p(v.evosus.access,"companySN","Evosus Company SN"),p(v.evosus.access,"ticket","Evosus Ticket")),u(be,{clientID:v.clientID,gsgToken:v.gsgToken,companySN:v.evosus.access.companySN,ticket:v.evosus.access.ticket}))))))}});null==window||window.addEventListener("load",(()=>{document.querySelectorAll("[data-component]").forEach((e=>{const t=e.getAttribute("data-component"),n=e.getAttributeNames().reduce(((t,n)=>{if(n&&"data-component"!==n){const o=e.getAttribute(n);o&&(t[n]=o)}return t}),{});if(t){const o=fe[t];o&&U(u(o,l({},n)),e)}}))}));
