var w=Object.defineProperty;var y=(e,t,n)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var l=(e,t,n)=>(y(e,typeof t!="symbol"?t+"":t,n),n);import{b as v}from"./paths.beba501e.js";const I="1.1.0",d=typeof window<"u"&&typeof document<"u",u=d?window.navigator.userAgent:"",S=d&&(u.indexOf(" Firefox/")!==-1||u.indexOf(" Gecko/")!==-1),m=!(typeof globalThis!="object"||typeof chrome!="object"||!chrome||!chrome.runtime||!chrome.runtime.id),j=typeof ClipboardItem<"u",x=()=>document.querySelector(".wdt"),b=()=>document.getElementById("wdtInput"),M=()=>{var e;return(e=b())==null?void 0:e.focus()},k=async()=>await document.fonts.ready;function B(){const e=document.querySelector(".wdt-input select");if(!e)return;const t=e.cloneNode(),n=document.createElement("option");n.textContent=e.options[e.selectedIndex].text,t.style.width="auto",t.style.visibility="hidden",t.style.position="fixed",t.appendChild(n),e.after(t),e.style.width=`${t.getBoundingClientRect().width}px`,e.classList.remove("unloaded"),t.remove()}function G(e){e&&window.resizeBy(Math.ceil(e.width-window.innerWidth),Math.ceil(e.height-window.innerHeight))}async function _(){if(!m)return;const e=chrome.runtime.getURL("index.html"),t=x().getBoundingClientRect(),[n,o]=[t.width+30,t.height+50];S?window.open(e,"devToolboxPopout",`resizable,width=${n},height=${o}`):await chrome.windows.create({url:e,type:"popup",width:Math.ceil(n),height:Math.ceil(o)}),window.close()}function*N(e,t){for(let n=0;n<e.length;n+=t)yield e.slice(n,n+t)}function W(e){const t=document.getElementById(e);t&&(t.scrollTop=0)}function $(e=""){return v.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,"")}const E=(e,t)=>{const n=t.length;for(let o=0;o<n;o++){if(e==null)return;e=e[t[o]]}return n?e:void 0},h=(e,t,n)=>{if(t==null)return e;const o=E(e,t.split("."));return o===void 0?n:o};function z(e){if(!e.length)return e;const t=e.sort((s,a)=>s[0]-a[0]),n=[];let o=t[0];n.push(o);for(const s of t){const[a,r]=o,[f,g]=s;r>=f?o[1]=Math.max(r,g):(o=s,n.push(o))}return n}const P=(e,t)=>e.localeCompare(t,void 0,{numeric:!0})===1,c=[{version:"1.1.0",run:e=>{const t={"inputs.hash":"hashInput","inputs.encode":"encodeInput","inputs.decode":"decodeInput","inputs.number":"numberInput","inputs.time":"timeInput","inputs.net":"netInput","inputs.emoji":"emojiInput","types.number":"numberInputType","types.time":"timeInputType",lastNavClicked:"lastRoute",onlyGithubEmoji:"emojiGhOnly",darkModeEnabled:"darkModeEnabled"},n=e.state,o={};for(const[s,a]of Object.entries(t)){const r=h(n,s);r!=null&&(o[a]=r)}e.state=o}}];function O(e,t){const n=e.get("appVersion","1.0.0");if(t??(t=I),n===t)return Promise.resolve();if(!e.isEmpty()){let o=c.findIndex(s=>P(s.version,n));if(o!==-1)for(;o<c.length;o++)console.log(`Running migration for ${c[o].version}`),c[o].run(e)}return e.set("appVersion",t).save()}const i="state";class p{constructor(){l(this,"_state",{})}get state(){return this._state}set state(t){this._state=t}async init(){return this.state=await this.load()||{},this.migrate()}get(t,n){return h(this.state,t,n)}set(t,n){return this._state[t]=n,this}async migrate(){return O(this)}isEmpty(){return Object.keys(this.state).length===0}has(t){return this.get(t)!==void 0}}class A extends p{constructor(){super(...arguments);l(this,"chromeStorageApi",chrome.storage.local)}async load(){return new Promise(n=>{this.chromeStorageApi.get(i,o=>{const s=o[i];if(s!=null){n(s);return}n(null)})})}async save(){const n={[i]:this.state};return new Promise(o=>{this.chromeStorageApi.set(n,()=>{o()})})}async flush(){return new Promise(n=>{this.chromeStorageApi.remove(i,()=>{n()})})}}class T extends p{async load(){const t=window.localStorage.getItem(i);if(t!=null){const n=JSON.parse(t);if(n!=null)return Promise.resolve(n)}return Promise.resolve(null)}async save(){const t=JSON.stringify(this.state);return window.localStorage.setItem(i,t),Promise.resolve()}async flush(){return window.localStorage.removeItem(i),Promise.resolve()}}const H=m?new A:new T;export{B as a,M as b,_ as c,j as d,N as e,k as f,x as g,G as h,W as i,z as m,m as r,H as s,$ as u};
