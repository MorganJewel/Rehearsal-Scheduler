(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const K=new Map;let D=null;function R(e,t){K.set(e,t)}function ie(e){D=e}function v(e){window.location.hash="#"+e}function le(e,t){const n=e==="/"?[]:e.split("/").filter(Boolean),o=t==="/"?[]:t.split("/").filter(Boolean);if(n.length!==o.length)return null;const a={};for(let s=0;s<n.length;s++)if(n[s].startsWith(":"))a[n[s].slice(1)]=decodeURIComponent(o[s]);else if(n[s]!==o[s])return null;return a}function H(){const t=(window.location.hash||"#/").slice(1)||"/";for(const[n,o]of K){const a=le(n,t);if(a!==null){o(a);return}}D&&D()}function re(){window.addEventListener("hashchange",H),H()}function de(){H()}function U(){return crypto.randomUUID()}let _=[{id:"demo-prod-1",name:"Hamlet",playwright:"William Shakespeare",created_at:new Date().toISOString()}],$=[{id:"demo-sched-1",production_id:"demo-prod-1",name:"Act I Run-Through",date:"2026-06-15",created_at:new Date().toISOString()}],E=[{id:"demo-block-1",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 1: The Battlements",actors:"Hamlet, Horatio, Marcellus, Ghost",block_type:"blocking",duration_minutes:40,notes:`Work Ghost entrance from SR. Hamlet crosses to DSL on "I'll follow it."`,order_index:0},{id:"demo-block-2",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 2: The Court",actors:"Hamlet, Claudius, Gertrude, Polonius",block_type:"table work",duration_minutes:30,notes:`Discuss Hamlet's internal conflict. Emphasis on the "too too solid flesh" speech.`,order_index:1},{id:"demo-block-3",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 3: Polonius's House",actors:"Laertes, Ophelia, Polonius",block_type:"run-through",duration_minutes:25,notes:"Focus on Ophelia's reaction to advice. Speed run first, then notes.",order_index:2}];function ce(){return[..._].sort((e,t)=>t.created_at.localeCompare(e.created_at))}function j(e){return _.find(t=>t.id===e)??null}function ue({name:e,playwright:t}){const n={id:U(),name:e,playwright:t||null,created_at:new Date().toISOString()};return _.push(n),n}function J(e,{name:t,playwright:n}){const o=_.find(a=>a.id===e);return o?(o.name=t,o.playwright=n||null,o):null}function V(e){$.filter(n=>n.production_id===e).map(n=>n.id).forEach(n=>W(n)),_=_.filter(n=>n.id!==e)}function me(e){return $.filter(t=>t.production_id===e).sort((t,n)=>t.created_at.localeCompare(n.created_at))}function Q(e){return $.find(t=>t.id===e)??null}function pe({name:e,date:t,production_id:n}){const o={id:U(),name:e,date:t||null,production_id:n,created_at:new Date().toISOString()};return $.push(o),o}function F(e,{name:t,date:n}){const o=$.find(a=>a.id===e);return o?(o.name=t,o.date=n||null,o):null}function W(e){E=E.filter(t=>t.schedule_id!==e),$=$.filter(t=>t.id!==e)}function he(e){return E.filter(t=>t.schedule_id===e).sort((t,n)=>t.order_index-n.order_index)}function ge({schedule_id:e,scene_name:t,actors:n,block_type:o,duration_minutes:a,notes:s,order_index:l}){const i={id:U(),schedule_id:e,scene_name:t||null,actors:n||null,block_type:o||null,duration_minutes:a||null,notes:s||null,order_index:l??0};return E.push(i),i}function be(e,t){const n=E.find(o=>o.id===e);return n?(Object.assign(n,{scene_name:t.scene_name||null,actors:t.actors||null,block_type:t.block_type||null,duration_minutes:t.duration_minutes||null,notes:t.notes||null,order_index:t.order_index??n.order_index}),n):null}function fe(e){E=E.filter(t=>t.id!==e)}const B=[{title:"Welcome to Rehearsal Scheduler",text:"This quick tour walks you through every feature. Takes about 2 minutes. Hit Next to begin, or Skip to jump straight in.",target:null,page:null},{title:"Your Dashboard",text:"The Dashboard lists all your productions: plays, musicals, readings, anything you're directing. We've pre-loaded a demo production so you can explore right away.",target:"#productions-list",page:"/"},{title:"Create a Production",text:'Click "+ New Production" to start a show. Give it a title and an optional playwright credit. Productions are the top level of everything.',target:"#new-production-btn",page:"/"},{title:"Production Page",text:"Clicking a production card opens its detail page. The title and playwright sit at the top, and all rehearsal schedules for that show are listed below.",target:".page-title",page:"/production/demo-prod-1"},{title:"Schedules",text:'A schedule is one rehearsal session, usually one per day. Click a schedule card to open it, or use "+ New Schedule" to add one. Each schedule belongs to exactly one production.',target:"#schedules-list",page:"/production/demo-prod-1"},{title:"Schedule View",text:"Opening a schedule shows all its blocks in order. The total duration in minutes is summed up automatically next to the Blocks heading.",target:"#blocks-list",page:"/schedule/demo-sched-1"},{title:"Rehearsal Blocks",text:"Each card is one block: a scene, a run-through, table work, a tech call, whatever you need. Blocks show scene name, actors, type badge, duration, and your staging notes.",target:".block-card",page:"/schedule/demo-sched-1"},{title:"Adding & Editing Blocks",text:'Click "+ Add Block" to create a new one. Hit Edit on any block to change it. Each block has: scene name, actors, block type, duration in minutes, order index, and notes.',target:"#add-block-btn",page:"/schedule/demo-sched-1"},{title:"Block Types",text:"Five types, each colour-coded: Blocking (blue), Run-through (green), Table Work (gold), Tech (purple), Other (grey). Use them to visually scan a schedule at a glance.",target:".type-badge",page:"/schedule/demo-sched-1"},{title:"AI Schedule Names",text:"The Apertus AI panel reads your blocks and suggests 3 creative schedule names tailored to your scenes and actors. Click any suggestion to instantly rename the schedule.",target:".ai-panel",page:"/schedule/demo-sched-1"},{title:"You're All Set!",text:"That covers everything. Go create your own productions, build schedules, fill in blocks, and try the AI tool. Everything resets on refresh, so experiment freely.",target:null,page:null}];let g=-1;function X(){g=0,N()}async function N(){if(te(),g<0||g>=B.length){O();return}const e=B[g];e.page&&(window.location.hash.slice(1)||"/")!==e.page&&(v(e.page),await Y(220));const t=e.target?document.querySelector(e.target):null;t?(t.scrollIntoView({behavior:"instant",block:"center"}),await Y(60),ye(t),ke(e,t)):ve(e)}function ye(e){const n=e.getBoundingClientRect(),o=n.left-10,a=n.top-10,s=n.width+10*2,l=n.height+10*2,i=document.createElement("div");i.id="tour-overlay",i.style.cssText="position:fixed;inset:0;z-index:9000;pointer-events:none",i.innerHTML=`
    <svg width="100%" height="100%" style="display:block">
      <defs>
        <mask id="tour-mask">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="${o}" y="${a}" width="${s}" height="${l}" rx="10" fill="black"/>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)"/>
    </svg>
  `,document.body.appendChild(i)}function ve(e){const t=document.createElement("div");t.id="tour-overlay",t.style.cssText="position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);pointer-events:none",document.body.appendChild(t);const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:all",n.innerHTML=Z(e),document.body.appendChild(n),ee()}function ke(e,t){const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;pointer-events:all",n.innerHTML=Z(e),document.body.appendChild(n);const o=t.getBoundingClientRect(),a=330,s=n.offsetHeight||210,l=window.innerWidth,i=window.innerHeight;let r=o.bottom+16;r+s>i-16&&(r=o.top-s-16),r<16&&(r=16);let d=o.left;d+a>l-16&&(d=l-a-16),d<16&&(d=16),n.style.top=r+"px",n.style.left=d+"px",ee()}function Z(e){const t=g===B.length-1,n=Math.round(g/(B.length-1)*100);return`
    <div class="tour-tooltip">
      <div class="tour-tt-header">
        <span class="tour-step-label">${g+1} / ${B.length}</span>
        <button id="tour-skip" class="tour-skip-btn">Skip tour</button>
      </div>
      <div class="tour-progress-track"><div class="tour-progress-fill" style="width:${n}%"></div></div>
      <h3 class="tour-title">${e.title}</h3>
      <p class="tour-text">${e.text}</p>
      <div class="tour-footer">
        ${g>0?'<button class="btn btn-ghost btn-sm" id="tour-prev">← Back</button>':"<span></span>"}
        <button class="btn btn-primary btn-sm" id="tour-next">
          ${t?"Finish ✓":"Next →"}
        </button>
      </div>
    </div>
  `}function ee(){var e,t,n;(e=document.getElementById("tour-prev"))==null||e.addEventListener("click",()=>{g--,N()}),(t=document.getElementById("tour-next"))==null||t.addEventListener("click",()=>{g===B.length-1?O():(g++,N())}),(n=document.getElementById("tour-skip"))==null||n.addEventListener("click",O)}function te(){var e,t;(e=document.getElementById("tour-overlay"))==null||e.remove(),(t=document.getElementById("tour-tooltip-wrap"))==null||t.remove()}function O(){te(),g=-1,sessionStorage.setItem("tour_seen","1"),(window.location.hash.slice(1)||"/")!=="/"&&v("/")}function Y(e){return new Promise(t=>setTimeout(t,e))}function z(){return localStorage.getItem("union_mode")==="on"}function A(e=""){const t=z();return`
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${e==="dashboard"?"active":""}">Dashboard</a>
        <button class="btn btn-sm ${t?"btn-union-on":"btn-ghost"}" id="union-toggle-btn">
          Union ${t?"ON":"OFF"}
        </button>
        <button class="btn btn-ghost btn-sm" id="tour-btn">Take Tour</button>
      </div>
    </nav>
  `}function M(){var e,t;(e=document.getElementById("tour-btn"))==null||e.addEventListener("click",X),(t=document.getElementById("union-toggle-btn"))==null||t.addEventListener("click",()=>{const n=!z();localStorage.setItem("union_mode",n?"on":"off"),de()})}function b({title:e,bodyHTML:t,onSubmit:n,submitLabel:o="Save",showFooter:a=!0}){var l,i;u();const s=document.createElement("div");s.id="modal-overlay",s.className="modal-overlay",s.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2>${e}</h2>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${t}
      </div>
      ${a?`
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-btn">${o}</button>
      </div>`:""}
    </div>
  `,document.body.appendChild(s),s.addEventListener("click",r=>{r.target===s&&u()}),document.getElementById("modal-close-btn").addEventListener("click",u),(l=document.getElementById("modal-cancel-btn"))==null||l.addEventListener("click",u),n&&((i=document.getElementById("modal-submit-btn"))==null||i.addEventListener("click",async()=>{const r=document.getElementById("modal-submit-btn");r.disabled=!0,r.textContent="Saving…";try{await n()}finally{r&&(r.disabled=!1,r.textContent=o)}}))}function u(){var e;(e=document.getElementById("modal-overlay"))==null||e.remove()}function we(){const e=document.getElementById("app");e.innerHTML=`
    ${A("dashboard")}
    <div class="page">
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">Productions</h1>
          <p class="page-subtitle">Your active theater productions</p>
        </div>
        <button class="btn btn-primary" id="new-production-btn">+ New Production</button>
      </div>
      <div id="productions-list"></div>
    </div>
  `,M(),document.getElementById("new-production-btn").addEventListener("click",$e),P()}function P(){const e=document.getElementById("productions-list");if(!e)return;const t=ce();if(!t.length){e.innerHTML=`
      <div class="empty-state">
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `;return}e.innerHTML=t.map(n=>`
    <div class="card card-clickable" data-id="${n.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${q(n.name)}</div>
          ${n.playwright?`<div class="card-subtitle">by ${q(n.playwright)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn"
            data-id="${n.id}" data-name="${T(n.name)}"
            data-playwright="${T(n.playwright||"")}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn"
            data-id="${n.id}" data-name="${T(n.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",o=>{o.target.closest(".btn")||v("/production/"+n.dataset.id)})}),e.querySelectorAll(".edit-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),Ee(n.dataset.id,n.dataset.name,n.dataset.playwright)})}),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),Se(n.dataset.id,n.dataset.name)})})}function ne(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${T(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Playwright</label>
      <input class="form-input" id="prod-playwright" type="text"
        placeholder="e.g. William Shakespeare" value="${T(t)}" />
    </div>
    <p class="error-msg" id="prod-error"></p>
  `}function $e(){b({title:"New Production",bodyHTML:ne(),submitLabel:"Create",onSubmit:()=>{const e=document.getElementById("prod-name").value.trim();if(!e){document.getElementById("prod-error").textContent="Name is required.";return}ue({name:e,playwright:document.getElementById("prod-playwright").value.trim()}),u(),P()}})}function Ee(e,t,n){b({title:"Edit Production",bodyHTML:ne(t,n),submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("prod-name").value.trim();if(!o){document.getElementById("prod-error").textContent="Name is required.";return}J(e,{name:o,playwright:document.getElementById("prod-playwright").value.trim()}),u(),P()}})}function Se(e,t){var n;b({title:"Delete Production",bodyHTML:`
      <p>Delete <strong>${q(t)}</strong>? All schedules and blocks will be removed.</p>
    `,submitLabel:"Delete",onSubmit:()=>{V(e),u(),P()}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function q(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function T(e){return String(e??"").replace(/"/g,"&quot;")}function xe(e){const t=j(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${A()}
      <div class="page">
        <p class="error-msg">Production not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,M();return}C(e)}function C(e){const t=j(e);if(!t){v("/");return}const n=me(e),o=document.getElementById("app");o.innerHTML=`
    ${A()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> / ${I(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${I(t.name)}</h1>
          ${t.playwright?`<p class="page-subtitle">by ${I(t.playwright)}</p>`:""}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-prod-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-prod-btn">Delete</button>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">Schedules</span>
        <button class="btn btn-primary btn-sm" id="new-sched-btn">+ New Schedule</button>
      </div>

      <div id="schedules-list">
        ${Be(n)}
      </div>
    </div>
  `,M(),document.getElementById("edit-prod-btn").addEventListener("click",()=>_e(e,t,()=>C(e))),document.getElementById("delete-prod-btn").addEventListener("click",()=>Le(e,t.name)),document.getElementById("new-sched-btn").addEventListener("click",()=>Te(e,()=>C(e))),Ie(e,()=>C(e))}function Be(e){return e.length?e.map(t=>`
    <div class="card card-clickable" data-id="${t.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${I(t.name)}</div>
          ${t.date?`<div class="card-subtitle">${Ce(t.date)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit"
            data-id="${t.id}" data-name="${w(t.name)}" data-date="${w(t.date||"")}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del"
            data-id="${t.id}" data-name="${w(t.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""):`
      <div class="empty-state">
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `}function Ie(e,t){document.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",o=>{o.target.closest(".btn")||v("/schedule/"+n.dataset.id)})}),document.querySelectorAll(".sched-edit").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),Ae(n.dataset.id,n.dataset.name,n.dataset.date,t)})}),document.querySelectorAll(".sched-del").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),Me(n.dataset.id,n.dataset.name,t)})})}function _e(e,t,n){b({title:"Edit Production",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="prod-name" type="text"
          value="${w(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text"
          value="${w(t.playwright||"")}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("prod-name").value.trim();if(!o){document.getElementById("prod-error").textContent="Name required.";return}J(e,{name:o,playwright:document.getElementById("prod-playwright").value.trim()}),u(),n()}})}function Le(e,t){var n;b({title:"Delete Production",bodyHTML:`<p>Delete <strong>${I(t)}</strong>? All schedules and blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{V(e),u(),v("/")}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function oe(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${w(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${w(t)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `}function Te(e,t){b({title:"New Schedule",bodyHTML:oe(),submitLabel:"Create",onSubmit:()=>{const n=document.getElementById("sched-name").value.trim();if(!n){document.getElementById("sched-error").textContent="Name required.";return}pe({name:n,date:document.getElementById("sched-date").value||null,production_id:e}),u(),t()}})}function Ae(e,t,n,o){b({title:"Edit Schedule",bodyHTML:oe(t,n),submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("sched-name").value.trim();if(!a){document.getElementById("sched-error").textContent="Name required.";return}F(e,{name:a,date:document.getElementById("sched-date").value||null}),u(),o()}})}function Me(e,t,n){var o;b({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${I(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{W(e),u(),n()}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}function Ce(e){if(!e)return"";const[t,n,o]=e.split("-");return new Date(+t,+n-1,+o).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function I(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function w(e){return String(e??"").replace(/"/g,"&quot;")}function Pe(e){const t=[...e].sort((l,i)=>l.order_index-i.order_index),n=[],o=[],a=t.reduce((l,i)=>l+(i.duration_minutes||0),0);a>480?n.push({rule:"8-Hour Rule",detail:`Session is ${a} min (${(a/60).toFixed(1)} hrs) — AEA maximum is 8 hours (480 min).`}):a>420&&o.push({rule:"8-Hour Rule",detail:`Session is ${a} min — within 1 hour of the 8-hour limit. Plan accordingly.`});let s=0;for(const l of t){const i=l.duration_minutes||0;l.block_type==="break"?i>=5&&(s=0):(s+=i,s>55&&(n.push({rule:"55-Minute Rule",detail:`${s} min of continuous work without a break. AEA requires a 5-min break at least every 55 minutes.`}),s=0))}return a>300&&(t.some(i=>i.block_type==="break"&&(i.duration_minutes||0)>=60)||n.push({rule:"Meal Break",detail:`Session is over 5 hours (${a} min) — a minimum 1-hour meal break is required. Add a "break" block of ≥60 min.`})),a>600&&n.push({rule:"10-Hour Hard Cap",detail:`Session exceeds 10 hours (${a} min). Even the tech-week 10-out-of-12 rule has a 10-hour work ceiling.`}),{violations:n,warnings:o,total:a}}const ae="https://soft-block-5a15.morganjewel01.workers.dev",De=["blocking","run-through","table work","tech","other","break"];function He(e){const t=Q(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${A()}
      <div class="page">
        <p class="error-msg">Schedule not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,M();return}x(e)}function x(e){const t=Q(e);if(!t){v("/");return}const n=j(t.production_id),o=he(e),a=o.reduce((d,f)=>d+(f.duration_minutes||0),0),s=z(),{violations:l,warnings:i}=s?Pe(o):{violations:[],warnings:[]},r=document.getElementById("app");r.innerHTML=`
    ${A()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> /
        <a href="#/production/${n==null?void 0:n.id}">${p((n==null?void 0:n.name)??"Production")}</a> /
        ${p(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${p(t.name)}</h1>
          ${t.date?`<p class="page-subtitle">${Ge(t.date)}</p>`:""}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
        </div>
      </div>

      ${s?ze(l,i):""}

      <div class="section-header">
        <span class="section-title">
          Blocks
          ${o.length?`<span style="color:var(--text2);font-weight:400;margin-left:0.5rem">· ${a} min total</span>`:""}
        </span>
        <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
      </div>

      <div id="blocks-list">
        ${Ne(o)}
      </div>

      <div class="ai-panel">
        <div class="ai-panel-header">
          <span class="ai-panel-title">Apertus AI</span>
          <span class="ai-advisory-label">Advisory only. All decisions stay with you.</span>
        </div>
        <div class="ai-btn-row">
          <button class="btn btn-ghost btn-sm" id="ai-btn">Suggest Schedule Name</button>
          <button class="btn btn-ghost btn-sm" id="ai-pacing-btn">Analyze Pacing &amp; Load</button>
        </div>
        <p id="ai-status" class="ai-status" style="display:none"></p>
        <div id="ai-suggestions" class="ai-suggestions"></div>
        <div id="ai-advice" class="ai-advice" style="display:none"></div>
      </div>

      <div class="coming-soon-card">
        <div class="cs-header">
          <span class="cs-badge">Coming Soon</span>
          <h3 class="cs-title">Messaging &amp; Reminders</h3>
        </div>
        <p class="cs-desc">
          Send today's schedule directly to cast and crew, push on-deck reminders
          to actors waiting outside, and manage multiple simultaneous schedules
          during tech week, all without leaving the app.
        </p>
        <div class="cs-features">
          <span class="cs-feature">→ Cast &amp; crew schedule distribution</span>
          <span class="cs-feature">→ On-deck reminders for actors out of the room</span>
          <span class="cs-feature">→ Tech week multi-schedule dashboard</span>
          <span class="cs-feature">→ Broadcast messages mid-rehearsal</span>
        </div>
      </div>
    </div>
  `,M(),document.getElementById("edit-sched-btn").addEventListener("click",()=>Ue(e,t,()=>x(e))),document.getElementById("delete-sched-btn").addEventListener("click",()=>je(e,t.name,n==null?void 0:n.id)),document.getElementById("add-block-btn").addEventListener("click",()=>G(null,e,o.length,()=>x(e))),document.getElementById("ai-btn").addEventListener("click",()=>Fe(e,t,n,o)),document.getElementById("ai-pacing-btn").addEventListener("click",()=>We(e,t,n,o)),document.querySelectorAll(".block-edit").forEach(d=>{d.addEventListener("click",()=>{const f=o.find(k=>k.id===d.dataset.id);f&&G(f,e,f.order_index,()=>x(e))})}),document.querySelectorAll(".block-del").forEach(d=>{d.addEventListener("click",()=>Re(d.dataset.id,d.dataset.name,()=>x(e)))})}function Ne(e){return e.length?e.map((t,n)=>`
    <div class="block-card${t.block_type?` btype-${t.block_type.replace(/\s+/g,"-")}`:""}">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.78rem;margin-right:0.4rem">${n+1}.</span>
          <span class="block-name">${p(t.scene_name||"Untitled scene")}</span>
          ${t.block_type?`<span class="type-badge ${Ye(t.block_type)}" style="margin-left:0.6rem">${p(t.block_type)}</span>`:""}
        </div>
        <div style="display:flex;gap:0.4rem;flex-shrink:0">
          <button class="btn btn-ghost btn-sm block-edit" data-id="${t.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del"
            data-id="${t.id}" data-name="${L(t.scene_name||"Untitled scene")}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${t.actors?`<span>${p(t.actors)}</span>`:""}
        ${t.duration_minutes?`<span>${t.duration_minutes} min</span>`:""}
      </div>
      ${t.notes?`<div class="block-notes">${p(t.notes)}</div>`:""}
    </div>
  `).join(""):`
      <div class="empty-state">
        <h3>No blocks yet</h3>
        <p>Add rehearsal blocks to build your schedule</p>
      </div>
    `}function Oe(e={}){return`
    <div class="form-group">
      <label class="form-label">Scene Name</label>
      <input class="form-input" id="b-scene" type="text"
        placeholder="e.g. Act I, Scene 2" value="${L(e.scene_name||"")}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Actors</label>
      <input class="form-input" id="b-actors" type="text"
        placeholder="e.g. Hamlet, Ophelia" value="${L(e.actors||"")}" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Block Type</label>
        <select class="form-select" id="b-type">
          <option value="">select type</option>
          ${De.map(t=>`<option value="${t}" ${e.block_type===t?"selected":""}>${t}</option>`).join("")}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Duration (min)</label>
        <input class="form-input" id="b-duration" type="number"
          min="1" max="480" placeholder="30" value="${e.duration_minutes??""}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Order Index</label>
      <input class="form-input" id="b-order" type="number" min="0"
        value="${e.order_index??0}" />
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <textarea class="form-textarea" id="b-notes"
        placeholder="Staging notes, focus areas…">${p(e.notes||"")}</textarea>
    </div>
    <p class="error-msg" id="block-error"></p>
  `}function qe(e){return{schedule_id:e,scene_name:document.getElementById("b-scene").value.trim()||null,actors:document.getElementById("b-actors").value.trim()||null,block_type:document.getElementById("b-type").value||null,duration_minutes:parseInt(document.getElementById("b-duration").value)||null,order_index:parseInt(document.getElementById("b-order").value)||0,notes:document.getElementById("b-notes").value.trim()||null}}function G(e,t,n,o){const a=!!e;b({title:a?"Edit Block":"Add Block",bodyHTML:Oe(e??{order_index:n}),submitLabel:a?"Save":"Add Block",onSubmit:()=>{const s=qe(t);a?be(e.id,s):ge(s),u(),o()}})}function Re(e,t,n){var o;b({title:"Delete Block",bodyHTML:`<p>Delete block <strong>${p(t)}</strong>?</p>`,submitLabel:"Delete",onSubmit:()=>{fe(e),u(),n()}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}function Ue(e,t,n){b({title:"Edit Schedule",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="sched-name" type="text"
          value="${L(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${L(t.date||"")}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("sched-name").value.trim();if(!o){document.getElementById("sched-error").textContent="Name required.";return}F(e,{name:o,date:document.getElementById("sched-date").value||null}),u(),n()}})}function je(e,t,n){var o;b({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${p(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{W(e),u(),v("/production/"+n)}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}async function Fe(e,t,n,o){var d,f,k;const a=document.getElementById("ai-status"),s=document.getElementById("ai-suggestions"),l=document.getElementById("ai-btn");l.disabled=!0,a.style.display="block",a.textContent="Thinking…",s.innerHTML="";const i=o.length?o.map(h=>`- ${h.scene_name||"Untitled"} | actors: ${h.actors||"none"} | type: ${h.block_type||"other"} | ${h.duration_minutes||"?"} min`).join(`
`):"(no blocks defined)",r=`Suggest exactly 3 short, evocative names for a rehearsal schedule. Reply with only the 3 names, one per line — no numbers, no bullet points, no explanations.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Date: ${t.date??"not set"}
Blocks:
${i}`;try{const h=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"swiss-ai/Apertus-8B-Instruct-2509",messages:[{role:"system",content:"You are a concise assistant helping a theater director name rehearsal schedules."},{role:"user",content:r}],max_tokens:80,temperature:.85})});if(!h.ok){const m=await h.text();a.textContent=`API error ${h.status}: ${m.slice(0,120)}`,l.disabled=!1;return}const S=await h.json(),c=(k=(f=(d=S==null?void 0:S.choices)==null?void 0:d[0])==null?void 0:f.message)==null?void 0:k.content;if(!c){a.textContent="No response from Apertus.",l.disabled=!1;return}const y=c.split(`
`).map(m=>m.replace(/^[\d.\-*•"]+\s*/,"").replace(/["]+$/,"").trim()).filter(m=>m.length>2&&m.length<80).slice(0,3);if(!y.length){a.textContent="Could not parse suggestions. Try again.",l.disabled=!1;return}a.textContent="Pick one to rename this schedule:",s.innerHTML=y.map(m=>`<button class="ai-suggestion-pill" data-name="${L(m)}">${p(m)}</button>`).join(""),s.querySelectorAll(".ai-suggestion-pill").forEach(m=>{m.addEventListener("click",()=>{F(e,{name:m.dataset.name,date:t.date}),x(e)})})}catch(h){a.textContent=`Error: ${h.message}`}finally{l.disabled=!1}}async function We(e,t,n,o){var f,k,h,S;const a=document.getElementById("ai-status"),s=document.getElementById("ai-advice"),l=document.getElementById("ai-suggestions"),i=document.getElementById("ai-pacing-btn");if(i.disabled=!0,a.style.display="block",a.textContent="Analyzing schedule…",l.innerHTML="",s.style.display="none",!o.length){a.textContent="Add some blocks first so Apertus has something to analyze.",i.disabled=!1;return}const r=o.reduce((c,y)=>c+(y.duration_minutes||0),0),d=o.map((c,y)=>`${y+1}. ${c.scene_name||"Untitled"} | actors: ${c.actors||"none"} | type: ${c.block_type||"other"} | ${c.duration_minutes||"?"} min`).join(`
`);try{const c=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"swiss-ai/Apertus-8B-Instruct-2509",messages:[{role:"system",content:"You are a stage management advisor. You give brief, practical observations — never make decisions for the SM. Flag concerns only; keep it under 100 words total."},{role:"user",content:`Review this rehearsal schedule for pacing, actor load, and flow. Flag 2–3 specific things worth watching. Do not suggest rearranging anything — just observations.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Total time: ${r} min
Blocks:
${d}`}],max_tokens:150,temperature:.6})});if(!c.ok){const se=await c.text();a.textContent=`API error ${c.status}: ${se.slice(0,120)}`,i.disabled=!1;return}const y=await c.json(),m=(S=(h=(k=(f=y==null?void 0:y.choices)==null?void 0:f[0])==null?void 0:k.message)==null?void 0:h.content)==null?void 0:S.trim();if(!m){a.textContent="No response from Apertus.",i.disabled=!1;return}a.textContent="Apertus observations — your call on what to do with these:",s.style.display="block",s.textContent=m}catch(c){a.textContent=`Error: ${c.message}`}finally{i.disabled=!1}}function ze(e,t){const n=e.length>0||t.length>0;return`
    <div class="${e.length?"union-panel union-has-violations":t.length?"union-panel union-has-warnings":"union-panel union-clear"}">
      <div class="union-panel-header">
        <span class="union-mode-label">Union Mode (AEA)</span>
        <span class="union-mode-label">⚖ Union Mode (AEA)</span>
        ${e.length?`<span class="union-count-badge union-viol-badge">${e.length} violation${e.length!==1?"s":""}</span>`:t.length?`<span class="union-count-badge union-warn-badge">${t.length} warning${t.length!==1?"s":""}</span>`:'<span class="union-ok-badge">✓ Schedule appears compliant</span>'}
      </div>

      ${e.map(a=>`
        <div class="union-issue-row union-issue-violation">
          <span class="union-rule-tag union-tag-violation">${p(a.rule)}</span>
          <span class="union-issue-detail">${p(a.detail)}</span>
        </div>
      `).join("")}

      ${t.map(a=>`
        <div class="union-issue-row union-issue-warning">
          <span class="union-rule-tag union-tag-warning">${p(a.rule)}</span>
          <span class="union-issue-detail">${p(a.detail)}</span>
        </div>
      `).join("")}

      ${n?`
        <p class="union-hint">
          Add a block of type <strong>break</strong> to schedule rest periods.
          Breaks ≥5 min satisfy the 55-minute rule; ≥60 min counts as a meal break.
        </p>`:""}
    </div>
  `}function Ye(e){return{blocking:"badge-blocking","run-through":"badge-run-through","table work":"badge-table-work",tech:"badge-tech",break:"badge-break",other:"badge-other"}[e]??"badge-other"}function Ge(e){if(!e)return"";const[t,n,o]=e.split("-");return new Date(+t,+n-1,+o).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function L(e){return String(e??"").replace(/"/g,"&quot;")}R("/",()=>we());R("/production/:id",({id:e})=>xe(e));R("/schedule/:id",({id:e})=>He(e));ie(()=>v("/"));re();sessionStorage.getItem("tour_seen")||setTimeout(X,400);
