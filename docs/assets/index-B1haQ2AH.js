(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const K=new Map;let H=null;function R(e,t){K.set(e,t)}function se(e){H=e}function y(e){window.location.hash="#"+e}function le(e,t){const n=e==="/"?[]:e.split("/").filter(Boolean),a=t==="/"?[]:t.split("/").filter(Boolean);if(n.length!==a.length)return null;const o={};for(let s=0;s<n.length;s++)if(n[s].startsWith(":"))o[n[s].slice(1)]=decodeURIComponent(a[s]);else if(n[s]!==a[s])return null;return o}function W(){const t=(window.location.hash||"#/").slice(1)||"/";for(const[n,a]of K){const o=le(n,t);if(o!==null){a(o);return}}H&&H()}function ie(){window.addEventListener("hashchange",W),W()}function j(){return crypto.randomUUID()}let B=[{id:"demo-prod-1",name:"Hamlet",playwright:"William Shakespeare",created_at:new Date().toISOString()}],k=[{id:"demo-sched-1",production_id:"demo-prod-1",name:"Act I Run-Through",date:"2026-06-15",created_at:new Date().toISOString()}],E=[{id:"demo-block-1",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 1 — The Battlements",actors:"Hamlet, Horatio, Marcellus, Ghost",block_type:"blocking",duration_minutes:40,notes:`Work Ghost entrance from SR. Hamlet crosses to DSL on "I'll follow it."`,order_index:0},{id:"demo-block-2",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 2 — The Court",actors:"Hamlet, Claudius, Gertrude, Polonius",block_type:"table work",duration_minutes:30,notes:`Discuss Hamlet's internal conflict. Emphasis on the "too too solid flesh" speech.`,order_index:1},{id:"demo-block-3",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 3 — Polonius's House",actors:"Laertes, Ophelia, Polonius",block_type:"run-through",duration_minutes:25,notes:"Focus on Ophelia's reaction to advice. Speed run first, then notes.",order_index:2}];function re(){return[...B].sort((e,t)=>t.created_at.localeCompare(e.created_at))}function F(e){return B.find(t=>t.id===e)??null}function de({name:e,playwright:t}){const n={id:j(),name:e,playwright:t||null,created_at:new Date().toISOString()};return B.push(n),n}function J(e,{name:t,playwright:n}){const a=B.find(o=>o.id===e);return a?(a.name=t,a.playwright=n||null,a):null}function V(e){k.filter(n=>n.production_id===e).map(n=>n.id).forEach(n=>z(n)),B=B.filter(n=>n.id!==e)}function ce(e){return k.filter(t=>t.production_id===e).sort((t,n)=>t.created_at.localeCompare(n.created_at))}function Q(e){return k.find(t=>t.id===e)??null}function ue({name:e,date:t,production_id:n}){const a={id:j(),name:e,date:t||null,production_id:n,created_at:new Date().toISOString()};return k.push(a),a}function U(e,{name:t,date:n}){const a=k.find(o=>o.id===e);return a?(a.name=t,a.date=n||null,a):null}function z(e){E=E.filter(t=>t.schedule_id!==e),k=k.filter(t=>t.id!==e)}function me(e){return E.filter(t=>t.schedule_id===e).sort((t,n)=>t.order_index-n.order_index)}function pe({schedule_id:e,scene_name:t,actors:n,block_type:a,duration_minutes:o,notes:s,order_index:i}){const l={id:j(),schedule_id:e,scene_name:t||null,actors:n||null,block_type:a||null,duration_minutes:o||null,notes:s||null,order_index:i??0};return E.push(l),l}function he(e,t){const n=E.find(a=>a.id===e);return n?(Object.assign(n,{scene_name:t.scene_name||null,actors:t.actors||null,block_type:t.block_type||null,duration_minutes:t.duration_minutes||null,notes:t.notes||null,order_index:t.order_index??n.order_index}),n):null}function ge(e){E=E.filter(t=>t.id!==e)}const $=[{title:"Welcome to Rehearsal Scheduler",text:"This quick tour walks you through every feature — takes about 2 minutes. Hit Next to begin, or Skip to jump straight in.",target:null,page:null},{title:"Your Dashboard",text:"The Dashboard lists all your productions — plays, musicals, readings, anything you're directing. We've pre-loaded a demo production so you can explore right away.",target:"#productions-list",page:"/"},{title:"Create a Production",text:'Click "+ New Production" to start a show. Give it a title and an optional playwright credit. Productions are the top level of everything.',target:"#new-production-btn",page:"/"},{title:"Production Page",text:"Clicking a production card opens its detail page. The title and playwright sit at the top, and all rehearsal schedules for that show are listed below.",target:".page-title",page:"/production/demo-prod-1"},{title:"Schedules",text:'A schedule is one rehearsal session — usually one per day. Click a schedule card to open it, or use "+ New Schedule" to add one. Each schedule belongs to exactly one production.',target:"#schedules-list",page:"/production/demo-prod-1"},{title:"Schedule View",text:"Opening a schedule shows all its blocks in order. The total duration in minutes is summed up automatically next to the Blocks heading.",target:"#blocks-list",page:"/schedule/demo-sched-1"},{title:"Rehearsal Blocks",text:"Each card is one block: a scene, a run-through, table work, a tech call — whatever you need. Blocks show scene name, actors, type badge, duration, and your staging notes.",target:".block-card",page:"/schedule/demo-sched-1"},{title:"Adding & Editing Blocks",text:'Click "+ Add Block" to create a new one. Hit Edit on any block to change it. Each block has: scene name, actors, block type, duration in minutes, order index, and notes.',target:"#add-block-btn",page:"/schedule/demo-sched-1"},{title:"Block Types",text:"Five types, each colour-coded: Blocking (blue), Run-through (green), Table Work (gold), Tech (purple), Other (grey). Use them to visually scan a schedule at a glance.",target:".type-badge",page:"/schedule/demo-sched-1"},{title:"AI Schedule Names",text:"The Apertus AI panel reads your blocks and suggests 3 creative schedule names tailored to your scenes and actors. Click any suggestion to instantly rename the schedule.",target:".ai-panel",page:"/schedule/demo-sched-1"},{title:"You're All Set!",text:"That covers everything. Go create your own productions, build schedules, fill in blocks, and try the AI tool. Everything resets on refresh — so experiment freely.",target:null,page:null}];let p=-1;function X(){p=0,N()}async function N(){if(te(),p<0||p>=$.length){q();return}const e=$[p];e.page&&(window.location.hash.slice(1)||"/")!==e.page&&(y(e.page),await Y(220));const t=e.target?document.querySelector(e.target):null;t?(t.scrollIntoView({behavior:"instant",block:"center"}),await Y(60),be(t),ye(e,t)):fe(e)}function be(e){const n=e.getBoundingClientRect(),a=n.left-10,o=n.top-10,s=n.width+10*2,i=n.height+10*2,l=document.createElement("div");l.id="tour-overlay",l.style.cssText="position:fixed;inset:0;z-index:9000;pointer-events:none",l.innerHTML=`
    <svg width="100%" height="100%" style="display:block">
      <defs>
        <mask id="tour-mask">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="${a}" y="${o}" width="${s}" height="${i}" rx="10" fill="black"/>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)"/>
    </svg>
  `,document.body.appendChild(l)}function fe(e){const t=document.createElement("div");t.id="tour-overlay",t.style.cssText="position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);pointer-events:none",document.body.appendChild(t);const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:all",n.innerHTML=Z(e),document.body.appendChild(n),ee()}function ye(e,t){const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;pointer-events:all",n.innerHTML=Z(e),document.body.appendChild(n);const a=t.getBoundingClientRect(),o=330,s=n.offsetHeight||210,i=window.innerWidth,l=window.innerHeight;let r=a.bottom+16;r+s>l-16&&(r=a.top-s-16),r<16&&(r=16);let f=a.left;f+o>i-16&&(f=i-o-16),f<16&&(f=16),n.style.top=r+"px",n.style.left=f+"px",ee()}function Z(e){const t=p===$.length-1,n=Math.round(p/($.length-1)*100);return`
    <div class="tour-tooltip">
      <div class="tour-tt-header">
        <span class="tour-step-label">${p+1} / ${$.length}</span>
        <button id="tour-skip" class="tour-skip-btn">Skip tour</button>
      </div>
      <div class="tour-progress-track"><div class="tour-progress-fill" style="width:${n}%"></div></div>
      <h3 class="tour-title">${e.title}</h3>
      <p class="tour-text">${e.text}</p>
      <div class="tour-footer">
        ${p>0?'<button class="btn btn-ghost btn-sm" id="tour-prev">← Back</button>':"<span></span>"}
        <button class="btn btn-primary btn-sm" id="tour-next">
          ${t?"Finish ✓":"Next →"}
        </button>
      </div>
    </div>
  `}function ee(){var e,t,n;(e=document.getElementById("tour-prev"))==null||e.addEventListener("click",()=>{p--,N()}),(t=document.getElementById("tour-next"))==null||t.addEventListener("click",()=>{p===$.length-1?q():(p++,N())}),(n=document.getElementById("tour-skip"))==null||n.addEventListener("click",q)}function te(){var e,t;(e=document.getElementById("tour-overlay"))==null||e.remove(),(t=document.getElementById("tour-tooltip-wrap"))==null||t.remove()}function q(){te(),p=-1,sessionStorage.setItem("tour_seen","1"),(window.location.hash.slice(1)||"/")!=="/"&&y("/")}function Y(e){return new Promise(t=>setTimeout(t,e))}function C(e=""){return`
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${e==="dashboard"?"active":""}">Dashboard</a>
        <button class="btn btn-ghost btn-sm" id="tour-btn">✦ Take Tour</button>
      </div>
    </nav>
  `}function P(){var e;(e=document.getElementById("tour-btn"))==null||e.addEventListener("click",X)}function h({title:e,bodyHTML:t,onSubmit:n,submitLabel:a="Save",showFooter:o=!0}){var i,l;c();const s=document.createElement("div");s.id="modal-overlay",s.className="modal-overlay",s.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2>${e}</h2>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${t}
      </div>
      ${o?`
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-btn">${a}</button>
      </div>`:""}
    </div>
  `,document.body.appendChild(s),s.addEventListener("click",r=>{r.target===s&&c()}),document.getElementById("modal-close-btn").addEventListener("click",c),(i=document.getElementById("modal-cancel-btn"))==null||i.addEventListener("click",c),n&&((l=document.getElementById("modal-submit-btn"))==null||l.addEventListener("click",async()=>{const r=document.getElementById("modal-submit-btn");r.disabled=!0,r.textContent="Saving…";try{await n()}finally{r&&(r.disabled=!1,r.textContent=a)}}))}function c(){var e;(e=document.getElementById("modal-overlay"))==null||e.remove()}function ve(){const e=document.getElementById("app");e.innerHTML=`
    ${C("dashboard")}
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
  `,P(),document.getElementById("new-production-btn").addEventListener("click",ke),M()}function M(){const e=document.getElementById("productions-list");if(!e)return;const t=re();if(!t.length){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `;return}e.innerHTML=t.map(n=>`
    <div class="card card-clickable" data-id="${n.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${O(n.name)}</div>
          ${n.playwright?`<div class="card-subtitle">by ${O(n.playwright)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn"
            data-id="${n.id}" data-name="${A(n.name)}"
            data-playwright="${A(n.playwright||"")}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn"
            data-id="${n.id}" data-name="${A(n.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",a=>{a.target.closest(".btn")||y("/production/"+n.dataset.id)})}),e.querySelectorAll(".edit-btn").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),Ee(n.dataset.id,n.dataset.name,n.dataset.playwright)})}),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),we(n.dataset.id,n.dataset.name)})})}function ne(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${A(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Playwright</label>
      <input class="form-input" id="prod-playwright" type="text"
        placeholder="e.g. William Shakespeare" value="${A(t)}" />
    </div>
    <p class="error-msg" id="prod-error"></p>
  `}function ke(){h({title:"New Production",bodyHTML:ne(),submitLabel:"Create",onSubmit:()=>{const e=document.getElementById("prod-name").value.trim();if(!e){document.getElementById("prod-error").textContent="Name is required.";return}de({name:e,playwright:document.getElementById("prod-playwright").value.trim()}),c(),M()}})}function Ee(e,t,n){h({title:"Edit Production",bodyHTML:ne(t,n),submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("prod-name").value.trim();if(!a){document.getElementById("prod-error").textContent="Name is required.";return}J(e,{name:a,playwright:document.getElementById("prod-playwright").value.trim()}),c(),M()}})}function we(e,t){var n;h({title:"Delete Production",bodyHTML:`
      <p>Delete <strong>${O(t)}</strong>? All schedules and blocks will be removed.</p>
    `,submitLabel:"Delete",onSubmit:()=>{V(e),c(),M()}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function O(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function A(e){return String(e??"").replace(/"/g,"&quot;")}function $e(e){const t=F(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${C()}
      <div class="page">
        <p class="error-msg">Production not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,P();return}D(e)}function D(e){const t=F(e);if(!t){y("/");return}const n=ce(e),a=document.getElementById("app");a.innerHTML=`
    ${C()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> / ${S(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${S(t.name)}</h1>
          ${t.playwright?`<p class="page-subtitle">by ${S(t.playwright)}</p>`:""}
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
        ${Se(n)}
      </div>
    </div>
  `,P(),document.getElementById("edit-prod-btn").addEventListener("click",()=>xe(e,t,()=>D(e))),document.getElementById("delete-prod-btn").addEventListener("click",()=>Ie(e,t.name)),document.getElementById("new-sched-btn").addEventListener("click",()=>Le(e,()=>D(e))),Be(e,()=>D(e))}function Se(e){return e.length?e.map(t=>`
    <div class="card card-clickable" data-id="${t.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${S(t.name)}</div>
          ${t.date?`<div class="card-subtitle">${Ae(t.date)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit"
            data-id="${t.id}" data-name="${v(t.name)}" data-date="${v(t.date||"")}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del"
            data-id="${t.id}" data-name="${v(t.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""):`
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `}function Be(e,t){document.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",a=>{a.target.closest(".btn")||y("/schedule/"+n.dataset.id)})}),document.querySelectorAll(".sched-edit").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),_e(n.dataset.id,n.dataset.name,n.dataset.date,t)})}),document.querySelectorAll(".sched-del").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),Te(n.dataset.id,n.dataset.name,t)})})}function xe(e,t,n){h({title:"Edit Production",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="prod-name" type="text"
          value="${v(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text"
          value="${v(t.playwright||"")}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("prod-name").value.trim();if(!a){document.getElementById("prod-error").textContent="Name required.";return}J(e,{name:a,playwright:document.getElementById("prod-playwright").value.trim()}),c(),n()}})}function Ie(e,t){var n;h({title:"Delete Production",bodyHTML:`<p>Delete <strong>${S(t)}</strong>? All schedules and blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{V(e),c(),y("/")}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function ae(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${v(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${v(t)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `}function Le(e,t){h({title:"New Schedule",bodyHTML:ae(),submitLabel:"Create",onSubmit:()=>{const n=document.getElementById("sched-name").value.trim();if(!n){document.getElementById("sched-error").textContent="Name required.";return}ue({name:n,date:document.getElementById("sched-date").value||null,production_id:e}),c(),t()}})}function _e(e,t,n,a){h({title:"Edit Schedule",bodyHTML:ae(t,n),submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("sched-name").value.trim();if(!o){document.getElementById("sched-error").textContent="Name required.";return}U(e,{name:o,date:document.getElementById("sched-date").value||null}),c(),a()}})}function Te(e,t,n){var a;h({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${S(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{z(e),c(),n()}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}function Ae(e){if(!e)return"";const[t,n,a]=e.split("-");return new Date(+t,+n-1,+a).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function v(e){return String(e??"").replace(/"/g,"&quot;")}const Ce=[50,60,5,45,23,2,62,34,54,21,11,24,46,27,52,29,46,56,61,49,29,63,47,61,53,51,54,54,56,34,41,53,14,52,23,23,23],oe=Ce.map(e=>String.fromCharCode(e^90)).join(""),Pe=["blocking","run-through","table work","tech","other"];function De(e){const t=Q(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${C()}
      <div class="page">
        <p class="error-msg">Schedule not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,P();return}w(e)}function w(e){const t=Q(e);if(!t){y("/");return}const n=F(t.production_id),a=me(e),o=a.reduce((i,l)=>i+(l.duration_minutes||0),0),s=document.getElementById("app");s.innerHTML=`
    ${C()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> /
        <a href="#/production/${n==null?void 0:n.id}">${g((n==null?void 0:n.name)??"Production")}</a> /
        ${g(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${g(t.name)}</h1>
          ${t.date?`<p class="page-subtitle">${ze(t.date)}</p>`:""}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">
          Blocks
          ${a.length?`<span style="color:var(--text2);font-weight:400;margin-left:0.5rem">· ${o} min total</span>`:""}
        </span>
        <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
      </div>

      <div id="blocks-list">
        ${Me(a)}
      </div>

      <div class="ai-panel">
        <div class="ai-panel-header">
          <span class="ai-panel-title">✦ Apertus AI</span>
          <span class="ai-advisory-label">Advisory only — all decisions stay with you</span>
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
          during tech week — all without leaving the app.
        </p>
        <div class="cs-features">
          <span class="cs-feature">📨 Cast &amp; crew schedule distribution</span>
          <span class="cs-feature">⏰ On-deck reminders for actors out of the room</span>
          <span class="cs-feature">🗓 Tech week multi-schedule dashboard</span>
          <span class="cs-feature">📢 Broadcast messages mid-rehearsal</span>
        </div>
      </div>
    </div>
  `,P(),document.getElementById("edit-sched-btn").addEventListener("click",()=>Oe(e,t,()=>w(e))),document.getElementById("delete-sched-btn").addEventListener("click",()=>Re(e,t.name,n==null?void 0:n.id)),document.getElementById("add-block-btn").addEventListener("click",()=>G(null,e,a.length,()=>w(e))),document.getElementById("ai-btn").addEventListener("click",()=>je(e,t,n,a)),document.getElementById("ai-pacing-btn").addEventListener("click",()=>Fe(e,t,n,a)),document.querySelectorAll(".block-edit").forEach(i=>{i.addEventListener("click",()=>{const l=a.find(r=>r.id===i.dataset.id);l&&G(l,e,l.order_index,()=>w(e))})}),document.querySelectorAll(".block-del").forEach(i=>{i.addEventListener("click",()=>qe(i.dataset.id,i.dataset.name,()=>w(e)))})}function Me(e){return e.length?e.map((t,n)=>`
    <div class="block-card">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.78rem;margin-right:0.4rem">${n+1}.</span>
          <span class="block-name">${g(t.scene_name||"Untitled scene")}</span>
          ${t.block_type?`<span class="type-badge ${Ue(t.block_type)}" style="margin-left:0.6rem">${g(t.block_type)}</span>`:""}
        </div>
        <div style="display:flex;gap:0.4rem;flex-shrink:0">
          <button class="btn btn-ghost btn-sm block-edit" data-id="${t.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del"
            data-id="${t.id}" data-name="${x(t.scene_name||"Untitled scene")}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${t.actors?`<span>👥 ${g(t.actors)}</span>`:""}
        ${t.duration_minutes?`<span>⏱ ${t.duration_minutes} min</span>`:""}
      </div>
      ${t.notes?`<div class="block-notes">${g(t.notes)}</div>`:""}
    </div>
  `).join(""):`
      <div class="empty-state">
        <div class="empty-state-icon">🎬</div>
        <h3>No blocks yet</h3>
        <p>Add rehearsal blocks to build your schedule</p>
      </div>
    `}function He(e={}){return`
    <div class="form-group">
      <label class="form-label">Scene Name</label>
      <input class="form-input" id="b-scene" type="text"
        placeholder="e.g. Act I, Scene 2" value="${x(e.scene_name||"")}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Actors</label>
      <input class="form-input" id="b-actors" type="text"
        placeholder="e.g. Hamlet, Ophelia" value="${x(e.actors||"")}" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Block Type</label>
        <select class="form-select" id="b-type">
          <option value="">— select —</option>
          ${Pe.map(t=>`<option value="${t}" ${e.block_type===t?"selected":""}>${t}</option>`).join("")}
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
        placeholder="Staging notes, focus areas…">${g(e.notes||"")}</textarea>
    </div>
    <p class="error-msg" id="block-error"></p>
  `}function Ne(e){return{schedule_id:e,scene_name:document.getElementById("b-scene").value.trim()||null,actors:document.getElementById("b-actors").value.trim()||null,block_type:document.getElementById("b-type").value||null,duration_minutes:parseInt(document.getElementById("b-duration").value)||null,order_index:parseInt(document.getElementById("b-order").value)||0,notes:document.getElementById("b-notes").value.trim()||null}}function G(e,t,n,a){const o=!!e;h({title:o?"Edit Block":"Add Block",bodyHTML:He(e??{order_index:n}),submitLabel:o?"Save":"Add Block",onSubmit:()=>{const s=Ne(t);o?he(e.id,s):pe(s),c(),a()}})}function qe(e,t,n){var a;h({title:"Delete Block",bodyHTML:`<p>Delete block <strong>${g(t)}</strong>?</p>`,submitLabel:"Delete",onSubmit:()=>{ge(e),c(),n()}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}function Oe(e,t,n){h({title:"Edit Schedule",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="sched-name" type="text"
          value="${x(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${x(t.date||"")}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("sched-name").value.trim();if(!a){document.getElementById("sched-error").textContent="Name required.";return}U(e,{name:a,date:document.getElementById("sched-date").value||null}),c(),n()}})}function Re(e,t,n){var a;h({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${g(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{z(e),c(),y("/production/"+n)}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}async function je(e,t,n,a){var I,L,_;const o=oe,s=document.getElementById("ai-status"),i=document.getElementById("ai-suggestions"),l=document.getElementById("ai-btn");l.disabled=!0,s.style.display="block",s.textContent="Thinking…",i.innerHTML="";const r=a.length?a.map(u=>`- ${u.scene_name||"Untitled"} | actors: ${u.actors||"none"} | type: ${u.block_type||"other"} | ${u.duration_minutes||"?"} min`).join(`
`):"(no blocks defined)",f=`Suggest exactly 3 short, evocative names for a rehearsal schedule. Reply with only the 3 names, one per line — no numbers, no bullet points, no explanations.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Date: ${t.date??"not set"}
Blocks:
${r}`;try{const u=await fetch("https://router.huggingface.co/featherless-ai/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({model:"swiss-ai/Apertus-8B-Instruct-2509",messages:[{role:"system",content:"You are a concise assistant helping a theater director name rehearsal schedules."},{role:"user",content:f}],max_tokens:80,temperature:.85})});if(!u.ok){const m=await u.text();s.textContent=`API error ${u.status}: ${m.slice(0,120)}`,l.disabled=!1;return}const d=await u.json(),b=(_=(L=(I=d==null?void 0:d.choices)==null?void 0:I[0])==null?void 0:L.message)==null?void 0:_.content;if(!b){s.textContent="No response from Apertus.",l.disabled=!1;return}const T=b.split(`
`).map(m=>m.replace(/^[\d.\-*•"]+\s*/,"").replace(/["]+$/,"").trim()).filter(m=>m.length>2&&m.length<80).slice(0,3);if(!T.length){s.textContent="Could not parse suggestions. Try again.",l.disabled=!1;return}s.textContent="Pick one to rename this schedule:",i.innerHTML=T.map(m=>`<button class="ai-suggestion-pill" data-name="${x(m)}">${g(m)}</button>`).join(""),i.querySelectorAll(".ai-suggestion-pill").forEach(m=>{m.addEventListener("click",()=>{U(e,{name:m.dataset.name,date:t.date}),w(e)})})}catch(u){s.textContent=`Error: ${u.message}`}finally{l.disabled=!1}}async function Fe(e,t,n,a){var I,L,_,u;const o=document.getElementById("ai-status"),s=document.getElementById("ai-advice"),i=document.getElementById("ai-suggestions"),l=document.getElementById("ai-pacing-btn");if(l.disabled=!0,o.style.display="block",o.textContent="Analyzing schedule…",i.innerHTML="",s.style.display="none",!a.length){o.textContent="Add some blocks first so Apertus has something to analyze.",l.disabled=!1;return}const r=a.reduce((d,b)=>d+(b.duration_minutes||0),0),f=a.map((d,b)=>`${b+1}. ${d.scene_name||"Untitled"} | actors: ${d.actors||"none"} | type: ${d.block_type||"other"} | ${d.duration_minutes||"?"} min`).join(`
`);try{const d=await fetch("https://router.huggingface.co/featherless-ai/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${oe}`,"Content-Type":"application/json"},body:JSON.stringify({model:"swiss-ai/Apertus-8B-Instruct-2509",messages:[{role:"system",content:"You are a stage management advisor. You give brief, practical observations — never make decisions for the SM. Flag concerns only; keep it under 100 words total."},{role:"user",content:`Review this rehearsal schedule for pacing, actor load, and flow. Flag 2–3 specific things worth watching. Do not suggest rearranging anything — just observations.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Total time: ${r} min
Blocks:
${f}`}],max_tokens:150,temperature:.6})});if(!d.ok){const m=await d.text();o.textContent=`API error ${d.status}: ${m.slice(0,120)}`,l.disabled=!1;return}const b=await d.json(),T=(u=(_=(L=(I=b==null?void 0:b.choices)==null?void 0:I[0])==null?void 0:L.message)==null?void 0:_.content)==null?void 0:u.trim();if(!T){o.textContent="No response from Apertus.",l.disabled=!1;return}o.textContent="Apertus observations — your call on what to do with these:",s.style.display="block",s.textContent=T}catch(d){o.textContent=`Error: ${d.message}`}finally{l.disabled=!1}}function Ue(e){return{blocking:"badge-blocking","run-through":"badge-run-through","table work":"badge-table-work",tech:"badge-tech",other:"badge-other"}[e]??"badge-other"}function ze(e){if(!e)return"";const[t,n,a]=e.split("-");return new Date(+t,+n-1,+a).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function x(e){return String(e??"").replace(/"/g,"&quot;")}R("/",()=>ve());R("/production/:id",({id:e})=>$e(e));R("/schedule/:id",({id:e})=>De(e));se(()=>y("/"));ie();sessionStorage.getItem("tour_seen")||setTimeout(X,400);
