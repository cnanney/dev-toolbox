var w=Object.defineProperty;var y=(t,e,n)=>e in t?w(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var c=(t,e,n)=>(y(t,typeof e!="symbol"?e+"":e,n),n);import{c as v}from"./shared-23917130.js";const I="1.1.0",d=typeof window<"u"&&typeof document<"u",u=d?window.navigator.userAgent:"",S=d&&(u.indexOf(" Firefox/")!==-1||u.indexOf(" Gecko/")!==-1),h=!(typeof globalThis!="object"||typeof chrome!="object"||!chrome||!chrome.runtime||!chrome.runtime.id),M=typeof ClipboardItem<"u",x=()=>document.querySelector(".wdt"),b=()=>document.getElementById("wdtInput"),R=()=>{var t;return(t=b())==null?void 0:t.focus()},k=async()=>await document.fonts.ready;function B(t){const e=[];return t.forEach(n=>{e.push(typeof n=="string"?n:Object.entries(n).filter(([o,i])=>o!==""&&i).map(([o])=>o).join(" "))}),e.join(" ")}function G(){let t=document.querySelector(".wdt-input select");if(!t)return;let e=t.cloneNode(),n=document.createElement("option");n.textContent=t.options[t.selectedIndex].text,e.style.width="auto",e.style.visibility="hidden",e.style.position="fixed",e.appendChild(n),t.after(e),t.style.width=`${e.getBoundingClientRect().width}px`,t.classList.remove("unloaded"),e.remove()}function _(t){t&&window.resizeBy(Math.ceil(t.width-window.innerWidth),Math.ceil(t.height-window.innerHeight))}async function N(){if(!h)return;const t=chrome.runtime.getURL("index.html"),e=x().getBoundingClientRect(),[n,o]=[e.width+30,e.height+50];S?window.open(t,"devToolboxPopout",`resizable,width=${n},height=${o}`):await chrome.windows.create({url:t,type:"popup",width:Math.ceil(n),height:Math.ceil(o)}),window.close()}function*W(t,e){for(let n=0;n<t.length;n+=e)yield t.slice(n,n+e)}function $(t){let e=document.getElementById(t);e&&(e.scrollTop=0)}function z(t=""){return v.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}const E=(t,e)=>{let n=e.length;for(let o=0;o<n;o++){if(t==null)return;t=t[e[o]]}return n?t:void 0},m=(t,e,n)=>{if(e==null)return t;let o=E(t,e.split("."));return o===void 0?n:o};function H(t){if(!t.length)return t;let e=t.sort((i,a)=>i[0]-a[0]),n=[],o=e[0];n.push(o);for(let i of e){const[a,r]=o,[f,g]=i;r>=f?o[1]=Math.max(r,g):(o=i,n.push(o))}return n}const O=(t,e)=>t.localeCompare(e,void 0,{numeric:!0})===1,l=[{version:"1.1.0",run:t=>{const e={"inputs.hash":"hashInput","inputs.encode":"encodeInput","inputs.decode":"decodeInput","inputs.number":"numberInput","inputs.time":"timeInput","inputs.net":"netInput","inputs.emoji":"emojiInput","types.number":"numberInputType","types.time":"timeInputType",lastNavClicked:"lastRoute",onlyGithubEmoji:"emojiGhOnly",darkModeEnabled:"darkModeEnabled"};let n=t.state,o={};for(const[i,a]of Object.entries(e)){let r=m(n,i);r!=null&&(o[a]=r)}t.state=o}}];function P(t,e){const n=t.get("appVersion","1.0.0");if(e??(e=I),n===e)return Promise.resolve();if(!t.isEmpty()){let o=l.findIndex(i=>O(i.version,n));if(o!==-1)for(;o<l.length;o++)console.log(`Running migration for ${l[o].version}`),l[o].run(t)}return t.set("appVersion",e).save()}const s="state";class p{constructor(){c(this,"_state",{})}get state(){return this._state}set state(e){this._state=e}async init(){return this.state=await this.load()||{},this.migrate()}get(e,n){return m(this.state,e,n)}set(e,n){return this._state[e]=n,this}async migrate(){return P(this)}isEmpty(){return Object.keys(this.state).length===0}has(e){return this.get(e)!==void 0}}class j extends p{constructor(){super(...arguments);c(this,"chromeStorageApi",chrome.storage.local)}async load(){return new Promise(n=>{this.chromeStorageApi.get(s,o=>{const i=o[s];if(i!=null){n(i);return}n(null)})})}async save(){const n={[s]:this.state};return new Promise(o=>{this.chromeStorageApi.set(n,()=>{o()})})}async flush(){return new Promise(n=>{this.chromeStorageApi.remove(s,()=>{n()})})}}class A extends p{async load(){let e=window.localStorage.getItem(s);if(e!=null){const n=JSON.parse(e);if(n!=null)return Promise.resolve(n)}return Promise.resolve(null)}async save(){const e=JSON.stringify(this.state);return window.localStorage.setItem(s,e),Promise.resolve()}async flush(){return window.localStorage.removeItem(s),Promise.resolve()}}const K=h?new j:new A;export{B as a,G as b,N as c,R as d,M as e,k as f,x as g,_ as h,W as i,$ as j,H as m,h as r,K as s,z as u};
