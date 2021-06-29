var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,a=(e,t)=>{for(var n in t||(t={}))r.call(t,n)&&l(e,n,t[n]);if(o)for(var n of o(t))i.call(t,n)&&l(e,n,t[n]);return e},s=(e,t)=>{var n={};for(var l in e)r.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&o)for(var l of o(e))t.indexOf(l)<0&&i.call(e,l)&&(n[l]=e[l]);return n};import{q as c,l as u,a as d,F as h,y as m,B as v,b as p,C as y,A as g,c as f,d as b,e as C,f as S,H as P,g as I,V as O,R as j,S as w,h as _,i as k,j as x,k as T,T as D,m as A,n as N,o as E,p as L,r as R,s as G,t as B,u as M,v as q,w as z,x as $,z as K,I as U,D as Q,W,E as V,G as F,J,K as H,L as X,M as Y,N as Z,O as ee,P as te,Q as ne,U as oe,X as re}from"./vendor.js";class ie{getID(){return this.data.id}constructor(e){var t,n;this.data=e,this.coloredParts=["shell","cabinet"].map((t=>{var n,o;const r=e[t+"Image"];return{name:t,image:null==(n=null==r?void 0:r[0])?void 0:n.url,color:null==(o=e[t+"Color"])?void 0:o[0]}})),this.combinedColor=null!=(n=null==(t=this.data.combinationColor)?void 0:t[0])?n:null}get combinedImage(){var e,t;return null==(t=null==(e=this.data.combinationImage)?void 0:e[0])?void 0:t.url}}const le=async e=>{return(t="https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7",n=`\n\tproductColorCombinations( product : "${e}" ) {\n\t\tid\n\t\tshellColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcabinetColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcombinationImage\n\t\tshellImage\n\t\tcabinetImage\n\t\tcombinationColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t}\n\t`,fetch(t,{method:"POST",body:JSON.stringify({query:`{${n}}`}),headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((e=>e.json())).then((e=>e.data))).then((e=>(console.log(e),e))).then((e=>{var t;return null==(t=null==e?void 0:e.productColorCombinations)?void 0:t.map((e=>new ie(e)))}));var t,n},ae=(e,o)=>{let r=e;const i=e=>{r=a(a({},r),e),o(r)},l=e=>t=>i({[e]:t}),s=l("combinations"),c=l("error"),u=l("colorsIndex"),d=l("combinedColors"),h=(e,t)=>{var n,o;const i={},l=r.combinations.filter((n=>{for(const o of n.coloredParts)if(o.name===e&&o.color&&o.color.name!==t)return!1;return!0})),a=[];for(const c of l){let e=0;for(const t of c.coloredParts)t.color&&r.selectedPartColors[t.name]===t.color.name&&e++;a[e]=c}const s=a.pop();if(null==s?void 0:s.coloredParts)for(const r of s.coloredParts)(null==(n=null==r?void 0:r.color)?void 0:n.name)&&(null==r?void 0:r.name)&&(i[r.name]=null==(o=null==r?void 0:r.color)?void 0:o.name);return i},m=e=>{const t=r.selectedPartColors;return r.combinations.filter((n=>{for(const o of n.coloredParts)if(o.name!==e&&t[o.name]&&o.color&&t[o.name]!==o.color.name)return!1;return!0}),[])},v=e=>{var t,n;return null!=(n=null==(t=m(e))?void 0:t.reduce(((t,n)=>(n.coloredParts.forEach((n=>{var o;(null==n?void 0:n.name)===e&&(null==(o=null==n?void 0:n.color)?void 0:o.name)&&t.push(n.color.name)})),t)),[]))?n:[]},p=(e,t)=>v(e).includes(t);return{state:r,actions:{setCombinations:s,setError:c,setColorsIndexedByPart:e=>{l("colorsIndexedByPart")(e)},setColorsIndex:u,setCombinedColors:d,selectPartColor:(e,o)=>{var l,s;p(e,o)?i({selectedPartColors:(l=a({},r.selectedPartColors),s={[e]:o},t(l,n(s)))}):i({selectedPartColors:h(e,o)})},selectCombinedColor:e=>{i({selectedCombinedColor:e})}},utilities:{getCompatibleCombinationsFor:m,getCompatibleColorsFor:v,isCompatiblePartColor:p,getSelectionCompatibleWith:h,getSelectedCombination:()=>{var e;return null==(e=null==r?void 0:r.combinations)?void 0:e.find((e=>{var t;if(e.coloredParts.length>0){for(const n of e.coloredParts)if(!r.selectedPartColors[n.name]||r.selectedPartColors[n.name]!==(null==(t=null==n?void 0:n.color)?void 0:t.name))return!1;return!0}return!1}))}}}},se=c(null),ce=()=>{var e;return null==(e=h(se))?void 0:e.state},ue=()=>{var e;return null==(e=h(se))?void 0:e.actions},de=()=>{var e;return null==(e=h(se))?void 0:e.utilities},he=({children:e})=>{const[t,n]=u({combinations:[],colorsIndexedByPart:{},selectedPartColors:{}});return d(se.Provider,{value:ae(t,n)},e)},me=()=>{const{error:e}=ce();return console.log("[ERROR]",e),d("div",null,d("div",null,"An Error Occurred"),d("p",null,null==e?void 0:e.name),d("p",null,null==e?void 0:e.stack))},ve=()=>{var e,t;const{combinations:n,selectedCombinedColor:o}=ce(),{getSelectedCombination:r}=de(),i=r(),l=o?[null==(e=n.find((e=>{var t;return(null==(t=null==e?void 0:e.combinedColor)?void 0:t.name)===o})))?void 0:e.combinedImage]:(null==i?void 0:i.combinedImage)?[i.combinedImage]:null==(t=null==i?void 0:i.coloredParts)?void 0:t.map((e=>null==e?void 0:e.image));return l?d(v,{w:"full",position:"relative"},l.filter((e=>e)).map((e=>d("img",{src:e,class:"gsg-procuts-hot-tub"})))):null},pe=()=>{var e;const{colorsIndexedByPart:t,colorsIndex:n,selectedPartColors:o,combinedColors:r,selectedCombinedColor:i}=ce(),{selectPartColor:l,selectCombinedColor:a}=ue(),{isCompatiblePartColor:s}=de(),c=Object.entries(t).reduce(((e,[t,r])=>{const i=[],a=[];r.forEach((e=>{var r,c,u;const h=s(t,e),m=null==n?void 0:n[e];if(m){const e={width:"60px",outline:o[t]===(null==m?void 0:m.image)?"1px solid rgba(0,0,0,0.1)":"",opacity:h?1:.5},n=d("li",{style:e,onClick:()=>l(t,null==m?void 0:m.name)},d("img",{style:{width:"60px",height:"60px",objectFit:"cover",position:"static",margin:"auto"},src:null!=(u=null==(c=null==(r=null==m?void 0:m.image)?void 0:r[0])?void 0:c.url)?u:"",alt:`${null==m?void 0:m.name} ${t}`}));h?i.push(n):a.push(n)}}),[]);const c=[];return i.length>0&&c.push(d("div",{style:{marginBottom:20}},d("div",{style:{marginBottom:7}},d("b",null,"Compatible ",t," Colors")),d("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},i))),a.length>0&&c.push(d("div",null,d("div",{style:{marginBottom:7}},d("b",null,"Other ",t," Colors")),d("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},a))),e.push(d("div",{style:{display:"flex"}},c)),e}),[]);if(r&&(null==r?void 0:r.length)>0){const t=null!=(e=null==r?void 0:r.reduce(((e,t)=>{var o,r;const l=null==n?void 0:n[t];return l&&e.push(d("li",{style:{width:"150px",outline:i===(null==l?void 0:l.name)?"1px solid rgba(0,0,0,0.1)":""},onClick:()=>a(null==l?void 0:l.name)},d("img",{style:{width:"100%"},src:null==(r=null==(o=null==l?void 0:l.image)?void 0:o[0])?void 0:r.url,alt:`${null==l?void 0:l.name}`}))),e}),[]))?e:[];c.push(d("div",null,d("div",null,d("b",null,"Combined Colors")),d("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:"0",gap:"16px"}},t)))}return d(p,null,c)},ye=()=>d("div",{class:"gsg-color-selector"},d("h3",null,"Color Selector"),d("div",{style:{display:"flex",justifyContent:"space-around"}},d(ve,null),d(pe,null))),ge=({product:e})=>{const{setCombinations:t,setError:n,setColorsIndexedByPart:o,setColorsIndex:r,setCombinedColors:i,selectCombinedColor:l,selectPartColor:a}=ue(),{error:s,selectedPartColors:c,selectedCombinedColor:u,combinedColors:h,colorsIndexedByPart:v}=ce(),{isCompatiblePartColor:p}=de();if(null==h?void 0:h[0]){const e=h[0];!u&&e&&l(e)}else for(const[d,m]of Object.entries(v))if(!c[d])for(const e of m)e&&p(d,e)&&a(d,e);return m((()=>{le(e).then((e=>{var n,l,a;t(e),o(null!=(n=null==e?void 0:e.reduce(((e,t)=>{var n;return null==(n=null==t?void 0:t.coloredParts)||n.forEach((t=>{var n;if(t.color){let o=null!=(n=e[t.name])?n:[];t.color.name&&!o.includes(t.color.name)&&o.push(t.color.name),e[t.name]=o}})),e}),{}))?n:{}),r(null!=(l=null==e?void 0:e.reduce(((e,t)=>{var n,o,r;return(null==t?void 0:t.combinedColor)&&(null==(n=null==t?void 0:t.combinedColor)?void 0:n.name)&&!e[null==(o=null==t?void 0:t.combinedColor)?void 0:o.name]?e[null==(r=null==t?void 0:t.combinedColor)?void 0:r.name]=null==t?void 0:t.combinedColor:t.coloredParts.forEach((t=>{var n,o,r;(null==(n=t.color)?void 0:n.name)&&!e[null==(o=t.color)?void 0:o.name]&&(e[null==(r=null==t?void 0:t.color)?void 0:r.name]=t.color)})),e}),{}))?l:{}),i(null!=(a=null==e?void 0:e.reduce(((e,t)=>{var n;return(null==(n=null==t?void 0:t.combinedColor)?void 0:n.name)&&!e.includes(t.combinedColor.name)&&e.push(t.combinedColor.name),e}),[]))?a:{})})).catch(n)}),[e]),d("div",null,d(s?me:ye,null))},fe="https://gsg-heroku-proxy.herokuapp.com/https://cloud3.evosus.com/api".replace(/\/+$/,"");class be extends Error{constructor(e,t){super(t),this.field=e,this.name="RequiredError"}}const Ce="https://example.com",Se=function(e,t,n){if(null==n)throw new be(t,`Required parameter ${t} was null or undefined when calling ${e}.`)},Pe=function(e,...t){const n=new URLSearchParams(e.search);for(const o of t)for(const e in o)if(Array.isArray(o[e])){n.delete(e);for(const t of o[e])n.append(e,t)}else n.set(e,o[e]);e.search=n.toString()},Ie=function(e,t,n){const o="string"!=typeof e;return(o&&n&&n.isJsonMime?n.isJsonMime(t.headers["Content-Type"]):o)?JSON.stringify(void 0!==e?e:{}):e||""},Oe=function(e){return e.pathname+e.search+e.hash},je=function(e,t,n,o){return(r=t,i=n)=>{const l=Object.assign(Object.assign({},e.options),{url:((null==o?void 0:o.basePath)||i)+e.url});return r.request(l)}};var we=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function l(e){try{s(o.next(e))}catch(t){i(t)}}function a(e){try{s(o.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((o=o.apply(e,t||[])).next())}))};const _e=function(e){const t=function(e){return{inventoryDistributionMethodSearch:(t,n,o={})=>we(this,void 0,void 0,(function*(){Se("inventoryDistributionMethodSearch","companySN",t),Se("inventoryDistributionMethodSearch","ticket",n);const r=new URL("/method/Inventory_DistributionMethod_Search",Ce);let i;e&&(i=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},i),o),a={};void 0!==t&&(a.CompanySN=t),void 0!==n&&(a.ticket=n),Pe(r,a,o.query);let s=i&&i.headers?i.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},{}),s),o.headers),{url:Oe(r),options:l}})),inventoryItemGet:(t,n,o,r={})=>we(this,void 0,void 0,(function*(){Se("inventoryItemGet","companySN",t),Se("inventoryItemGet","ticket",n),Se("inventoryItemGet","body",o);const i=new URL("/method/Inventory_Item_Get",Ce);let l;e&&(l=e.baseOptions);const a=Object.assign(Object.assign({method:"POST"},l),r),s={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),s["Content-Type"]="application/json",Pe(i,c,r.query);let u=l&&l.headers?l.headers:{};return a.headers=Object.assign(Object.assign(Object.assign({},s),u),r.headers),a.data=Ie(o,a,e),{url:Oe(i),options:a}})),inventoryItemSearch:(t,n,o,r={})=>we(this,void 0,void 0,(function*(){Se("inventoryItemSearch","companySN",t),Se("inventoryItemSearch","ticket",n),Se("inventoryItemSearch","body",o);const i=new URL("/method/Inventory_Item_Search",Ce);let l;e&&(l=e.baseOptions);const a=Object.assign(Object.assign({method:"POST"},l),r),s={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),s["Content-Type"]="application/json",Pe(i,c,r.query);let u=l&&l.headers?l.headers:{};return a.headers=Object.assign(Object.assign(Object.assign({},s),u),r.headers),a.data=Ie(o,a,e),{url:Oe(i),options:a}})),inventoryItemStockSiteQuantityGet:(t,n,o,r={})=>we(this,void 0,void 0,(function*(){Se("inventoryItemStockSiteQuantityGet","companySN",t),Se("inventoryItemStockSiteQuantityGet","ticket",n);const i=new URL("/method/Inventory_Item_StockSiteQuantity_Get",Ce);let l;e&&(l=e.baseOptions);const a=Object.assign(Object.assign({method:"POST"},l),r),s={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),s["Content-Type"]="application/json",Pe(i,c,r.query);let u=l&&l.headers?l.headers:{};return a.headers=Object.assign(Object.assign(Object.assign({},s),u),r.headers),a.data=Ie(o,a,e),{url:Oe(i),options:a}})),inventoryProductLineSearch:(t,n,o={})=>we(this,void 0,void 0,(function*(){Se("inventoryProductLineSearch","companySN",t),Se("inventoryProductLineSearch","ticket",n);const r=new URL("/method/Inventory_ProductLine_Search",Ce);let i;e&&(i=e.baseOptions);const l=Object.assign(Object.assign({method:"POST"},i),o),a={};void 0!==t&&(a.CompanySN=t),void 0!==n&&(a.ticket=n),Pe(r,a,o.query);let s=i&&i.headers?i.headers:{};return l.headers=Object.assign(Object.assign(Object.assign({},{}),s),o.headers),{url:Oe(r),options:l}})),inventoryVendorSearch:(t,n,o,r={})=>we(this,void 0,void 0,(function*(){Se("inventoryVendorSearch","companySN",t),Se("inventoryVendorSearch","ticket",n),Se("inventoryVendorSearch","body",o);const i=new URL("/method/Inventory_Vendor_Search",Ce);let l;e&&(l=e.baseOptions);const a=Object.assign(Object.assign({method:"POST"},l),r),s={},c={};void 0!==t&&(c.CompanySN=t),void 0!==n&&(c.ticket=n),s["Content-Type"]="application/json",Pe(i,c,r.query);let u=l&&l.headers?l.headers:{};return a.headers=Object.assign(Object.assign(Object.assign({},s),u),r.headers),a.data=Ie(o,a,e),{url:Oe(i),options:a}}))}}(e);return{inventoryDistributionMethodSearch(n,o,r){return we(this,void 0,void 0,(function*(){const i=yield t.inventoryDistributionMethodSearch(n,o,r);return je(i,y,fe,e)}))},inventoryItemGet(n,o,r,i){return we(this,void 0,void 0,(function*(){const l=yield t.inventoryItemGet(n,o,r,i);return je(l,y,fe,e)}))},inventoryItemSearch(n,o,r,i){return we(this,void 0,void 0,(function*(){const l=yield t.inventoryItemSearch(n,o,r,i);return je(l,y,fe,e)}))},inventoryItemStockSiteQuantityGet(n,o,r,i){return we(this,void 0,void 0,(function*(){const l=yield t.inventoryItemStockSiteQuantityGet(n,o,r,i);return je(l,y,fe,e)}))},inventoryProductLineSearch(n,o,r){return we(this,void 0,void 0,(function*(){const i=yield t.inventoryProductLineSearch(n,o,r);return je(i,y,fe,e)}))},inventoryVendorSearch(n,o,r,i){return we(this,void 0,void 0,(function*(){const l=yield t.inventoryVendorSearch(n,o,r,i);return je(l,y,fe,e)}))}}};class ke extends class{constructor(e,t=fe,n=y){this.basePath=t,this.axios=n,e&&(this.configuration=e,this.basePath=e.basePath||this.basePath)}}{inventoryDistributionMethodSearch(e,t,n){return _e(this.configuration).inventoryDistributionMethodSearch(e,t,n).then((e=>e(this.axios,this.basePath)))}inventoryItemGet(e,t,n,o){return _e(this.configuration).inventoryItemGet(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryItemSearch(e,t,n,o){return _e(this.configuration).inventoryItemSearch(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryItemStockSiteQuantityGet(e,t,n,o){return _e(this.configuration).inventoryItemStockSiteQuantityGet(e,t,n,o).then((e=>e(this.axios,this.basePath)))}inventoryProductLineSearch(e,t,n){return _e(this.configuration).inventoryProductLineSearch(e,t,n).then((e=>e(this.axios,this.basePath)))}inventoryVendorSearch(e,t,n,o){return _e(this.configuration).inventoryVendorSearch(e,t,n,o).then((e=>e(this.axios,this.basePath)))}}const xe=e=>{var t=e,{children:n,itemProps:o}=t,r=s(t,["children","itemProps"]);return d(f,a({w:"100%",allowMultiple:!0},r),(Array.isArray(n)?n:[n]).map((e=>d(g,null,e))))},Te=e=>{var t=e,{children:n,title:o}=t,r=s(t,["children","title"]);return d(p,null,d(C,{w:"100%"},d(S,{w:"100%",alignItems:"center",justifyContent:"space-between"},d(P,{size:"md"},o),d(I,null))),d(b,a({},r),n))},De=e=>{const[t,n]=u(null),[o,r]=u(null),[i,l]=u(null),[a,s]=u(["price","quantity","name","weight"]),[c,h]=u(!1),[p,y]=u(null);m((()=>{(({ticket:e,companySN:t,gsgToken:n,clientID:o})=>t&&e?n&&o?Promise.resolve({ticket:e,companySN:t,gsgToken:n,clientID:o}):Promise.reject("Invalid GSG access credentials"):Promise.reject("Invalid evosus access credentials"))(e).then((({ticket:e,companySN:t})=>(async(e,{companySN:t,ticket:n})=>{const o=await e.inventoryProductLineSearch(t,n).then((e=>e.data.response));return o?Promise.resolve(o):Promise.reject("Failed to retrieve product line items from Evosus API")})(new ke,{ticket:e,companySN:t}).then(n).then(r.bind(null,null)))).catch(r)}),[e]);return d(v,null,d(P,{w:"100%",size:"md"},"GSG Evosus Dashboard"),d(v,null,o?d(B,{status:"error"},d(M,null),d(q,{mr:2},o),d(z,null)):null),d(xe,null,d(Te,{title:"Sync Products"},d(O,{w:"100%",justifyContent:"stretch",alignItems:"stretch",alignContent:"stretch",justifyItems:"stretch"},d(P,{size:"sm"},"Select a product Line"),null===t?"Loading Product Lines":null,d(j,{onChange:l,value:null!=i?i:""},d(w,{columns:2},null==t?void 0:t.map((({ProductLine:e,ProductLineID:t})=>d(_,{value:null==t?void 0:t.toString()},e))))),d(P,{size:"sm"},"Select which properties should be synced"),d(k,{onChange:e=>s(e),value:a},d(w,null,d(x,{value:"name"},"Product Name"),d(x,{value:"price"},"Price"),d(x,{value:"quantity"},"Quantity"),d(x,{value:"weight"},"Weight"))),d(v,null,d(T,{onClick:()=>{h(!0),fetch(`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${e.clientID}`,{method:"POST",body:JSON.stringify({search:{productLineID:i},fields:a}),headers:{authorization:`Bearer ${e.gsgToken}`,"content-type":"application/json"}}).then((async e=>{if(408===e.status)throw r("The request timed out, you may try again to finish syncing"),new Error(await e.text());return 200!==e.status?(r(null),e.json()):e.json()})).then(y).then(r.bind(null,null)).catch(r.bind(null,"Error while syncing")).finally(h.bind(null,!1))},w:"100%",mt:8,disabled:c||!i||0===a.length},"Sync Products")),d(v,null,c?"Syncing...":null),d(f,{allowMultiple:!0},null==p?void 0:p.map((e=>{var t,n,o;return d(g,{bg:"fulfilled"===e.status?"green.400":"red.400"},d(C,null,d(v,{flex:"1",textAlign:"left"},"fulfilled"===e.status?"Success":"Failure",": ","fulfilled"===e.status?(null==(t=e.value.update)?void 0:t.length)||(null==(n=e.value.create)?void 0:n.length):null," ","fulfilled"===e.status?e.value.update?"Updated":e.value.create?"Created":null:null),d(I,null)),d(b,{pb:4,bg:"white"},d(D,{variant:"simple"},d(A,null,d(N,null,d(E,null,"ID#"),d(E,null,"Name"),d(E,null,"SKU"),d(E,null,"Quanitity"),d(E,null,"Price"))),d(L,null,"fulfilled"===e.status?null==(o=e.value.update||e.value.create)?void 0:o.map((e=>d(N,null,d(R,null,e.id),d(R,null,e.name),d(R,null,e.sku),d(R,null,e.stock_quantity),d(R,null,e.price)))):null),d(G,null,d(N,null,d(E,null,"ID#"),d(E,null,"Name"),d(E,null,"SKU"),d(E,null,"Quanitity"),d(E,null,"Price"))))))})))))))},Ae=(e,t=[])=>{const[n,o]=u(null),[r,i]=u(null),[l,a]=$(!0);return m((()=>{o(null),i(null),a.on(),e&&e().then(o).catch(i).finally(a.off)}),t),{resolved:n,rejected:r,loading:l}},Ne=e=>{const[t,n]=u(e);return{array:t,set:n,push:e=>n([...t,e]),concat:e=>n([...t,...e]),remove:e=>n(t.filter((t=>t!==e)))}},Ee=e=>{if("object"==typeof e&&null!==e){if("function"==typeof Object.getPrototypeOf){const t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}return"[object Object]"===Object.prototype.toString.call(e)}return!1},Le=(...e)=>e.reduce(((e,t)=>(Object.keys(t).forEach((n=>{Array.isArray(e[n])&&Array.isArray(t[n])?e[n]=Array.from(new Set(e[n].concat(t[n]))):Ee(e[n])&&Ee(t[n])?e[n]=Le(e[n],t[n]):e[n]=t[n]})),e)),{}),Re=({nonce:e,siteurl:t,cookieHash:n,cookieValue:o,gsgToken:r})=>{console.log({gsgToken:r});const i=K((()=>(({nonce:e,siteurl:t,cookieHash:n,cookieValue:o,gsgToken:r})=>{!r&&n&&o&&Q.set(n,o);const i={"content-type":"application/json"};return r?i.Authorization=`Bearer ${r}`:i["X-WP-Nonce"]=e,{get:()=>fetch(`${t}/wp-json/gsg/v1/options`,{headers:i,credentials:"include"}).then((e=>e.json())),set:e=>(console.log({headers:i}),fetch(`${t}/wp-json/gsg/v1/options`,{headers:i,credentials:"include",method:"POST",body:JSON.stringify(e)}).then((e=>e.json())))}})({nonce:e,siteurl:t,cookieHash:n,cookieValue:o,gsgToken:r})),[e,t,n,o,r]),[l,s]=$(!1),[c,h]=$(!1),[v,p]=u({clientID:"",gsgToken:"",wc:{access:{key:"",secret:"",url:""}},evosus:{access:{companySN:"",ticket:""}},rb:{access:{CompanyID:"",APIKey:"",name:""}},an:{options:{credentials:{name:"",refId:"",transactionKey:""},testMode:!0}}});m((()=>{h.on(),i.get().then((e=>{var t;if(void 0!==(null==(t=e.gsgToken)?void 0:t.length)){const t=Le(v,e);p(a({},t))}})).finally(h.off)}),[e,t,n,o,r]),m((()=>{var e;!c&&!l&&(null==(e=v.gsgToken)?void 0:e.length)>0&&(s.on(),i.set(v).finally(s.off.bind(null)))}),[v]);return{optionInput:(e,t,n)=>{const o=e[t];return d(U,{disabled:c,placeholder:n,value:e[t],onChange:n=>{const o=n.target.value;e[t]=o},onBlur:()=>{console.log(e[t],o),e[t]!==o&&p(a({},v))}})},fetching:c,saving:l,options:v}};var Ge=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function l(e){try{s(o.next(e))}catch(t){i(t)}}function a(e){try{s(o.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((o=o.apply(e,t||[])).next())}))};const Be=e=>t=>Ge(void 0,void 0,void 0,(function*(){let n=!0;const o=[];for(t.per_page=100,t.page=1;!0===n;)try{const r=yield e(t);r.length<100?n=!1:t.page+=1,o.push(...r)}catch(r){return Promise.reject(r)}return Promise.resolve(o)})),Me=(e,t)=>{const n=n=>e.get(t,n).then((e=>e.data));return{create:n=>e.post(t,n).then((e=>e.data)),retrieve:n=>e.get(`${t}/${n}`).then((e=>e.data)),list:n,put:(n,o)=>e.put(`${t}/${n}`,o).then((e=>e.data)),update:(n,o)=>e.put(`${t}/${n}`,o).then((e=>e.data)),delete:(n,o=!1)=>e.delete(`${t}/${n}`,{force:o}).then((e=>e.data)),batch:n=>e.post(`${t}/batch`,n).then((e=>e.data)),getAll:Be(n)}};var qe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",crud:e=>Me(e,"products")});var ze=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",crud:e=>Me(e,"orders")});var $e=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",crud:e=>Me(e,"customers")}),Ke=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",Product:qe,Order:ze,Customer:$e});const Ue=e=>{return t=(({key:e,secret:t,url:n})=>new W({url:n,consumerKey:e,consumerSecret:t,version:"wc/v3"}))(e),Object.entries(Ke).reduce(((e,[n,o])=>(e[n]=Object.assign(Object.assign({},o),{crud:o.crud(t)}),e)),{});var t};var Qe=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function l(e){try{s(o.next(e))}catch(t){i(t)}}function a(e){try{s(o.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((o=o.apply(e,t||[])).next())}))};const We=(e,t)=>Array.from(Array(Math.ceil(e.length/t)).keys()).map((n=>e.slice(n*t,n*t+t))),Ve=e=>(t,n,o)=>e.get("/RBXItemSearch",{params:{name:t,dept:n,cat:o}}),Fe=(e,t)=>Ve(e)(t,void 0,void 0).then((e=>e.data)),Je=(e,t)=>n=>Ve(e)(t,n,void 0).then((e=>e.data)),He=(e,t)=>(n,o)=>Ve(e)(t,n,o).then((e=>e.data)),Xe=e=>t=>e.post("https://www.rbrsswebservices.com/api/RBXSalesOrder",t).then((e=>e.data)),Ye=e=>{const t=e.name,n=(e=>y.create({headers:{"Content-Type":"application/json",APIKey:e.APIKey,CompanyID:e.CompanyID},baseURL:"https://www.rbrsswebservices.com/api"}))(e);return{itemSearch:Ve(n),getDepartments:Fe.bind(null,n,t),getCategories:Je(n,t),getProducts:He(n,t),postOrder:Xe(n)}};var Ze=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function l(e){try{s(o.next(e))}catch(t){i(t)}}function a(e){try{s(o.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((o=o.apply(e,t||[])).next())}))};const et=e=>({AddrLine1:e.address_1,AddrLine2:e.address_2,City:e.city,PostCode:e.postcode,StateProv:e.state}),tt=(e,t,n)=>o=>Ze(void 0,void 0,void 0,(function*(){return Promise.all(o.map((o=>Ze(void 0,void 0,void 0,(function*(){const{Payments:r,CCAuth:i}=yield(l=n,e=>Qe(void 0,void 0,void 0,(function*(){const t=e.transaction_id;if(!t)return Promise.reject(new TypeError("No transaction ID in order"));if(!["authorize_net_cim_credit_card","yith_wcauthnet_credit_card_gateway"].includes(e.payment_method))return Promise.reject(new TypeError("Payment method not supported"));const n=yield l.getTransactionDetails(t);return{CCAuth:n.transaction.authCode,Payments:[{PaymentType:"Credit Card",CCExp:n.transaction.payment.creditCard.expirationDate,CCType:n.transaction.payment.creditCard.cardType,CCNum:n.transaction.payment.creditCard.cardNumber.replaceAll("X","")}]}})))(o);var l;const a={BillTo:et(o.billing),ShipTo:et(o.shipping),OrderItems:o.line_items.map((e=>({Product:e.name,Sku:e.sku,Qty:e.quantity,Price:parseFloat(e.total)}))),TransactionType:"Ecommerce Order",Comments:o.customer_note,OrderID:o.id.toString(),Discount:parseFloat(o.discount_total),Shipping:parseFloat(o.shipping_total),Subtotal:parseFloat(o.line_items.reduce(((e,t)=>e+(parseFloat(t.subtotal)||0)),0)),TotalPrice:parseFloat(o.total),Data1:"",Date:o.date_created,Phone:o.billing.phone,Mobile:o.billing.phone,FirstName:o.billing.first_name,LastName:o.billing.last_name,Email:o.billing.email,Payments:r,CCAuth:i};return console.log({rbOrder:a}),yield e.postOrder(a),t.Order.crud.update(o.id,{status:"posted-to-rb"})})))))})),nt=e=>({sku:e.ID.toString(),categories:[{name:e.Category},{name:e.Department}],short_description:e.Description,description:e.LongDescription,regular_price:e.Price.toString(),sale_price:e.SalePrice.toString(),date_on_sale_from:e.SaleStart,date_on_sale_to:e.SaleEnd,stock_quantity:e.Quantity}),[ot,rt]=V({name:"RB Context",errorMessage:"RBProvider missing"}),it=e=>{var t=e,{children:n}=t,o=s(t,["children"]);console.log({access:o});const r=(e=>({client:K((()=>Ye(e)),[e])}))(o);return d(ot,{value:r},n)},lt=rt,[at,st]=V({name:"RB Context",errorMessage:"RBProvider missing"}),ct=e=>{var t=e,{children:n}=t;const o=(e=>({client:K((()=>Ue(e)),[e])}))(s(t,["children"]));return d(at,{value:o},n)},ut=st,dt=e=>({client:K((()=>(({credentials:e,testMode:t})=>{const n={"Content-Type":"application/json"},o=t?"https://apitest.authorize.net/xml/v1/request.api":"https://api.authorize.net/xml/v1/request.api",r=(t,r)=>y({url:o,method:"POST",headers:n,data:{[t]:Object.assign({merchantAuthentication:{name:e.name,transactionKey:e.transactionKey}},r)}}).then((e=>{var t,n,o,r,i,l;return"Error"===(null===(n=null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.messages)||void 0===n?void 0:n.resultCode)?Promise.reject(new Error(null===(l=null===(i=null===(r=null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.messages)||void 0===r?void 0:r.message)||void 0===i?void 0:i.map((e=>null==e?void 0:e.text)))||void 0===l?void 0:l.join("\n"))):e.data}));return{post:r,getTransactionDetails:e=>r("getTransactionDetailsRequest",{transId:e}).then((e=>e))}})(e)),[e])}),[ht,mt]=V({name:"AN Context",errorMessage:"ANProvider missing"}),vt=e=>{var t=e,{children:n}=t,o=s(t,["children"]);const r=dt(o);return d(ht,{value:r},n)},pt=mt,yt=e=>{var t=e,{headers:n,children:o}=t,r=s(t,["headers","children"]);const i=K((()=>n.map((e=>d(E,null,e)))),[n]);return d(D,a({whiteSpace:"nowrap",w:"100%",variant:"simple"},r),d(A,null,d(N,null,i)),d(L,null,o),d(G,null,d(N,null,i)))},gt=e=>{var t,n=e,{options:o}=n,r=s(n,["options"]);return d(j,a({},r),d(w,{columns:2},Array.isArray(o)?o.map((e=>d(_,{value:e},e))):null==(t=Object.entries(o))?void 0:t.map((([e,t])=>d(_,{value:e},t)))))},ft=()=>{const{client:e}=ut(),{client:t}=lt(),{client:n}=pt(),o=Ae(F(t.getDepartments,[t]),[t]),[r,i]=u(null),l=Ae(F(r?t.getCategories.bind(null,r):()=>Promise.reject("No dept selected"),[r]),[r]),[a,s]=u(null),c=Ne([]),h=Ne([]),[v,p]=$(!1),y=F((()=>{var n;r&&a&&(p.on(),t.getProducts(r,a).then((n=e,e=>n.Product.crud.getAll({sku:e.map((e=>e.ID)).join(",")}).then((t=>{const o=[],r=[];for(const n of e){const e=t.find((e=>e.sku===`${n.ID}`));e?r.push(Object.assign({id:e.id},nt(n))):o.push(nt(n))}return[...We(r,100).map((e=>n.Product.crud.batch({update:e}))),...We(o,100).map((e=>n.Product.crud.batch({create:e})))]})))).then((e=>e.map((e=>e.then((e=>{e.create&&c.concat(e.create),e.update&&h.concat(e.update)})))))).finally(p.off))}),[r,a]),g=Ne([]);m((()=>{e.Order.crud.list({status:"processing"}).then((e=>e.filter((e=>["authorize_net_cim_credit_card","yith_wcauthnet_credit_card_gateway"].includes(e.payment_method))))).then(g.set)}),[e]),console.log({dept:r,cat:a,syncing:v});const f=Ne([]);Ne([]);const[b,C]=$(!1),S=F((()=>{g&&f.array.length>0&&(C.on(),tt(t,e,n)(g.array.filter((e=>f.array.includes(e.id.toString())))).then((e=>g.set([...g.array.filter((t=>null===e.find((e=>e.id===t.id)))),...e]))).finally(C.off))}),[f,t]);return d(O,null,d(P,{size:"md"},"RB Integration Dashboard"),d(xe,null,d(Te,{title:"Sync Products"},d(O,{w:"100%",alignItems:"stretch"},o.resolved?d(gt,{onChange:i,options:o.resolved}):"Loading Deparments",l.resolved?d(gt,{onChange:s,options:l.resolved}):"Loading Categories",d(T,{onClick:y,disabled:!r||!a||v},"Sync Products"),c.array.length>0||h.array.length>0?d(yt,{headers:["ID#","Name","SKU","Regular Price & Sales Price","Storage Quantity"]},d(A,null,"Created ",c.array.length),c.array.map((e=>d(N,null,d(R,null,e.id),d(R,null,e.name),d(R,null,e.sku),d(R,null,e.regular_price,d("br",null),e.sale_price),d(R,null,e.stock_quantity)))),d(A,null,"Updated ",h.array.length),h.array.map((e=>d(N,null,d(R,null,e.id),d(R,null,e.name),d(R,null,e.sku),d(R,null,e.regular_price,d("br",null),e.sale_price),d(R,null,e.stock_quantity))))):null)),d(Te,{title:"Post Orders"},d(O,{alignItems:"stretch"},g.array?d(yt,{headers:["","ID#","Status","CustomerID#"]},g.array.map((e=>d(N,null,d(R,null,d(x,{name:"order-ids",onChange:e=>{e.target.checked?f.push(e.target.value):f.remove(e.target.value)},value:e.id.toString(),checked:f.array.includes(e.id.toString())})),d(R,null,e.id),d(R,null,e.status),d(R,null,e.customer_id))))):"Loading Orders",d(T,{onClick:S,disabled:b},"Post Orders")))))};var bt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ProductColors:({product:e})=>d(he,null,d(ge,{product:e})),WordpressDashboard:e=>{var t,n,o;const{optionInput:r,fetching:i,saving:l,options:s}=Re(e);return console.log(s),d(oe,null,d(v,null,d(J,{as:"header",justifyContent:"center",alignItems:"center"},d(P,null,"Get Smart Plugin"),i||l?d(H,null):null),d(xe,null,d(Te,{title:"Integrations"},d(X,{variant:"soft-rounded",colorScheme:"blue"},d(Y,null,d(Z,null,"Evosus"),d(Z,null,"RB")),d(ee,null,d(te,null,d(De,{clientID:s.clientID,gsgToken:s.gsgToken,companySN:s.evosus.access.companySN,ticket:s.evosus.access.ticket})),d(te,null,(null!=(t=s.wc.access.url.length)?t:0)>0&&(null!=(n=s.wc.access.key.length)?n:0)>0&&(null!=(o=s.wc.access.secret.length)?o:0)>0?d(ct,a({},s.wc.access),d(it,a({},s.rb.access),d(vt,a({},s.an.options),d(ft,null)))):null)))),d(Te,{title:"Config"},d(X,{variant:"soft-rounded",colorScheme:"blue"},d(Y,null,d(Z,null,"GSG"),d(Z,null,"WooCommerce"),d(Z,null,"Evosus"),d(Z,null,"RB")),d(ee,null,d(te,null,d(P,{size:"sm"},"GSG Config"),d(ne,{spacing:3},r(s,"clientID","Client ID"),r(s,"gsgToken","GSG Token"))),d(te,null,d(P,{size:"sm"},"WooCommerce Config"),d(ne,{spacing:3},r(s.wc.access,"key","WC REST API Key"),r(s.wc.access,"secret","WC REST API Secret"),r(s.wc.access,"url","WC Website URL"))),d(te,null,d(P,{size:"sm"},"Evosus Config"),d(ne,{spacing:3},r(s.evosus.access,"companySN","Evosus Company SN"),r(s.evosus.access,"ticket","Evosus Ticket"))),d(te,null,d(P,{size:"sm"},"RB Config"),d(ne,{spacing:3},r(s.rb.access,"CompanyID","RB Company ID"),r(s.rb.access,"APIKey","RB API Key"),r(s.rb.access,"name","RB Name"),r(s.an.options.credentials,"name","Authorize.net credentials name"),r(s.an.options.credentials,"transactionKey","Authorize.net credentials Transaction Key"),r(s.an.options.credentials,"refId","Authorize.net credentials Ref ID (Optional)")))))))))}});null==window||window.addEventListener("load",(()=>{document.querySelectorAll("[data-component]").forEach((e=>{const t=e.getAttribute("data-component"),n=e.getAttributeNames().reduce(((t,n)=>{if(n&&"data-component"!==n){const o=e.getAttribute(n);o&&(t[n]=o)}return t}),{});if(t){const o=bt[t];o&&re(d(o,a({},n)),e)}}))}));
