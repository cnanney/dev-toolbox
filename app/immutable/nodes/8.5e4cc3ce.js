import{S as v,i as z,s as O,C as m,y as f,a as w,z as _,c as V,A as $,b as B,H as d,g,d as y,B as S,h as H}from"../chunks/index.a6e5a0ea.js";import{C as P}from"../chunks/isSymbol.4a57b641.js";import{C as R,a as c}from"../chunks/methods.24cfb888.js";import{g as b}from"../chunks/clsx.m.fec05fde.js";function D(s){let e,a,n,o;const u=[{inputLabel:T,inputValueStore:s[1],inputSize:h,inputTypeStore:s[0],inputOptions:s[2]}];let i={};for(let t=0;t<u.length;t+=1)i=m(i,u[t]);e=new P({props:i});const r=[{outputRows:s[4],inputValueStore:s[1],inputTypeStore:s[0],preCalc:s[3]}];let l={};for(let t=0;t<r.length;t+=1)l=m(l,r[t]);return n=new R({props:l}),{c(){f(e.$$.fragment),a=w(),f(n.$$.fragment)},l(t){_(e.$$.fragment,t),a=V(t),_(n.$$.fragment,t)},m(t,p){$(e,t,p),B(t,a,p),$(n,t,p),o=!0},p(t,[p]){const C=p&7?d(u,[{inputLabel:T,inputValueStore:t[1],inputSize:h,inputTypeStore:t[0],inputOptions:t[2]}]):{};e.$set(C);const I=p&27?d(r,[{outputRows:t[4],inputValueStore:t[1],inputTypeStore:t[0],preCalc:t[3]}]):{};n.$set(I)},i(t){o||(g(e.$$.fragment,t),g(n.$$.fragment,t),o=!0)},o(t){y(e.$$.fragment,t),y(n.$$.fragment,t),o=!1},d(t){S(e,t),t&&H(a),S(n,t)}}}const T="Number in",h=1;function q(s){const e=b("numberInputType","10"),a=b("numberInput",""),n=[{value:"10",text:"Decimal"},{value:"2",text:"Binary"},{value:"8",text:"Octal"},{value:"16",text:"Hexadecimal"}],o=(i,r)=>({2:"0b",8:"0o",10:"",16:"0x"}[r]||"")+i,u=[{cols:[{title:"Binary",size:2,method:c.bin,sendInputType:"2"}]},{cols:[{title:"Octal",size:1,method:c.oct,sendInputType:"8"}]},{cols:[{title:"Decimal",size:1,method:c.dec,sendInputType:"10"}]},{cols:[{title:"Hexadecimal",size:1,method:c.hex,sendInputType:"16"}]}];return[e,a,n,o,u]}class k extends v{constructor(e){super(),z(this,e,q,D,O,{})}}export{k as component};