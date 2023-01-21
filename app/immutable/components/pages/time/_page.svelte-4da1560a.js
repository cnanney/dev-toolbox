import{S as v,i as L,s as M,P as T,w as _,a as P,x as I,c as Q,y,b as U,Q as h,f as $,t as g,z as O,h as V,a3 as z}from"../../../chunks/index-3776f072.js";import{C as H}from"../../../chunks/isSymbol-dfea86d6.js";import{C as D,D as b,t as i}from"../../../chunks/methods-64ff8b78.js";import{g as w}from"../../../chunks/stores-567c1fde.js";function R(a){let s,l,t,p;const c=[{inputLabel:k,inputValueStore:a[1],inputSize:x,inputTypeStore:a[0],inputOptions:a[2],inputModifiers:a[3]}];let u={};for(let e=0;e<c.length;e+=1)u=T(u,c[e]);s=new H({props:u});const m=[{outputRows:a[5],inputValueStore:a[1],inputTypeStore:a[0],preCalc:a[4]}];let o={};for(let e=0;e<m.length;e+=1)o=T(o,m[e]);return t=new D({props:o}),{c(){_(s.$$.fragment),l=P(),_(t.$$.fragment)},l(e){I(s.$$.fragment,e),l=Q(e),I(t.$$.fragment,e)},m(e,n){y(s,e,n),U(e,l,n),y(t,e,n),p=!0},p(e,[n]){const r=n&15?h(c,[{inputLabel:k,inputValueStore:e[1],inputSize:x,inputTypeStore:e[0],inputOptions:e[2],inputModifiers:e[3]}]):{};s.$set(r);const f=n&51?h(m,[{outputRows:e[5],inputValueStore:e[1],inputTypeStore:e[0],preCalc:e[4]}]):{};t.$set(f)},i(e){p||($(s.$$.fragment,e),$(t.$$.fragment,e),p=!0)},o(e){g(s.$$.fragment,e),g(t.$$.fragment,e),p=!1},d(e){O(s,e),e&&V(l),O(t,e)}}}const k="Time in",x=1;function q(a){const s=w("timeInputType","fromSeconds"),l=w("timeInput","");function t(o=null){const e=z(l),n=z(s);let r=b.now().toUTC(),f=o===null?r:u(e,n)||r,S=n.replace("from","to"),C={toSQL:{includeOffset:!1}},d=(o===null?f:f.plus({[o]:1}))[S](C[S]||{});l.set(typeof d=="string"?d.replace(/\.000$/,""):String(d))}const p=[{value:"fromSeconds",text:"Unix (Seconds)"},{value:"fromMillis",text:"Unix (Milliseconds)"},{value:"fromISO",text:"ISO 8601"},{value:"fromSQL",text:"SQL"},{value:"fromHTTP",text:"HTTP"}],c=[{text:"Now",callback:()=>t(),separator:","},{text:"+1",separator:""},{text:"sec",callback:()=>t("seconds"),separator:","},{text:"min",callback:()=>t("minutes"),separator:","},{text:"hour",callback:()=>t("hours"),separator:","},{text:"day",callback:()=>t("days"),separator:","},{text:"month",callback:()=>t("months"),separator:","},{text:"year",callback:()=>t("years")}],u=(o,e)=>{try{let n=["fromMillis","fromSeconds"].includes(e)?Number(o):o,r=b[e](n,{zone:"utc"});return!o||!r.isValid?null:r}catch{return null}},m=[{cols:[{title:"Unix (Seconds)",size:1,method:i.unix_sec,sendInputType:"fromSeconds"},{title:"Unix (Milliseconds)",size:1,method:i.unix_milli,sendInputType:"fromMillis"},{title:"ISO 8601",size:1,method:i.iso,sendInputType:"fromISO"}]},{cols:[{title:"ISO Week",size:1,method:i.iso_week,sendInputType:"fromISO"},{title:"ISO Date",size:1,method:i.iso_date,sendInputType:"fromISO"},{title:"ISO Time",size:1,method:i.iso_time,sendInputType:"fromISO"}]},{cols:[{title:"SQL",size:1,method:i.sql,sendInputType:"fromSQL"},{title:"HTTP",size:1,method:i.http,sendInputType:"fromHTTP"}]},{cols:[{title:"Local (ISO 8601)",size:1,method:i.local,send:!1},{title:"Local (Full)",size:1,method:i.full,send:!1}]}];return[s,l,p,c,u,m]}class A extends v{constructor(s){super(),L(this,s,q,R,M,{})}}export{A as default};