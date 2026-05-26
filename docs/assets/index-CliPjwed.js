(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(l){if(l.ep)return;l.ep=!0;const a=n(l);fetch(l.href,a)}})();const Y=new Map;let D=null;function C(e,t){Y.set(e,t)}function ne(e){D=e}function g(e){window.location.hash="#"+e}function oe(e,t){const n=e==="/"?[]:e.split("/").filter(Boolean),o=t==="/"?[]:t.split("/").filter(Boolean);if(n.length!==o.length)return null;const l={};for(let a=0;a<n.length;a++)if(n[a].startsWith(":"))l[n[a].slice(1)]=decodeURIComponent(o[a]);else if(n[a]!==o[a])return null;return l}function U(){const t=(window.location.hash||"#/").slice(1)||"/";for(const[n,o]of Y){const l=oe(n,t);if(l!==null){o(l);return}}D&&D()}function ae(){window.addEventListener("hashchange",U),U()}function M(){return crypto.randomUUID()}let $=[{id:"demo-prod-1",name:"Hamlet",playwright:"William Shakespeare",created_at:new Date().toISOString()}],v=[{id:"demo-sched-1",production_id:"demo-prod-1",name:"Act I Run-Through",date:"2026-06-15",created_at:new Date().toISOString()}],y=[{id:"demo-block-1",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 1 — The Battlements",actors:"Hamlet, Horatio, Marcellus, Ghost",block_type:"blocking",duration_minutes:40,notes:`Work Ghost entrance from SR. Hamlet crosses to DSL on "I'll follow it."`,order_index:0},{id:"demo-block-2",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 2 — The Court",actors:"Hamlet, Claudius, Gertrude, Polonius",block_type:"table work",duration_minutes:30,notes:`Discuss Hamlet's internal conflict. Emphasis on the "too too solid flesh" speech.`,order_index:1},{id:"demo-block-3",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 3 — Polonius's House",actors:"Laertes, Ophelia, Polonius",block_type:"run-through",duration_minutes:25,notes:"Focus on Ophelia's reaction to advice. Speed run first, then notes.",order_index:2}];function le(){return[...$].sort((e,t)=>t.created_at.localeCompare(e.created_at))}function N(e){return $.find(t=>t.id===e)??null}function se({name:e,playwright:t}){const n={id:M(),name:e,playwright:t||null,created_at:new Date().toISOString()};return $.push(n),n}function G(e,{name:t,playwright:n}){const o=$.find(l=>l.id===e);return o?(o.name=t,o.playwright=n||null,o):null}function K(e){v.filter(n=>n.production_id===e).map(n=>n.id).forEach(n=>O(n)),$=$.filter(n=>n.id!==e)}function ie(e){return v.filter(t=>t.production_id===e).sort((t,n)=>t.created_at.localeCompare(n.created_at))}function V(e){return v.find(t=>t.id===e)??null}function de({name:e,date:t,production_id:n}){const o={id:M(),name:e,date:t||null,production_id:n,created_at:new Date().toISOString()};return v.push(o),o}function q(e,{name:t,date:n}){const o=v.find(l=>l.id===e);return o?(o.name=t,o.date=n||null,o):null}function O(e){y=y.filter(t=>t.schedule_id!==e),v=v.filter(t=>t.id!==e)}function re(e){return y.filter(t=>t.schedule_id===e).sort((t,n)=>t.order_index-n.order_index)}function ce({schedule_id:e,scene_name:t,actors:n,block_type:o,duration_minutes:l,notes:a,order_index:s}){const i={id:M(),schedule_id:e,scene_name:t||null,actors:n||null,block_type:o||null,duration_minutes:l||null,notes:a||null,order_index:s??0};return y.push(i),i}function ue(e,t){const n=y.find(o=>o.id===e);return n?(Object.assign(n,{scene_name:t.scene_name||null,actors:t.actors||null,block_type:t.block_type||null,duration_minutes:t.duration_minutes||null,notes:t.notes||null,order_index:t.order_index??n.order_index}),n):null}function me(e){y=y.filter(t=>t.id!==e)}const E=[{title:"Welcome to Rehearsal Scheduler",text:"This quick tour walks you through every feature — takes about 2 minutes. Hit Next to begin, or Skip to jump straight in.",target:null,page:null},{title:"Your Dashboard",text:"The Dashboard lists all your productions — plays, musicals, readings, anything you're directing. We've pre-loaded a demo production so you can explore right away.",target:"#productions-list",page:"/"},{title:"Create a Production",text:'Click "+ New Production" to start a show. Give it a title and an optional playwright credit. Productions are the top level of everything.',target:"#new-production-btn",page:"/"},{title:"Production Page",text:"Clicking a production card opens its detail page. The title and playwright sit at the top, and all rehearsal schedules for that show are listed below.",target:".page-title",page:"/production/demo-prod-1"},{title:"Schedules",text:'A schedule is one rehearsal session — usually one per day. Click a schedule card to open it, or use "+ New Schedule" to add one. Each schedule belongs to exactly one production.',target:"#schedules-list",page:"/production/demo-prod-1"},{title:"Schedule View",text:"Opening a schedule shows all its blocks in order. The total duration in minutes is summed up automatically next to the Blocks heading.",target:"#blocks-list",page:"/schedule/demo-sched-1"},{title:"Rehearsal Blocks",text:"Each card is one block: a scene, a run-through, table work, a tech call — whatever you need. Blocks show scene name, actors, type badge, duration, and your staging notes.",target:".block-card",page:"/schedule/demo-sched-1"},{title:"Adding & Editing Blocks",text:'Click "+ Add Block" to create a new one. Hit Edit on any block to change it. Each block has: scene name, actors, block type, duration in minutes, order index, and notes.',target:"#add-block-btn",page:"/schedule/demo-sched-1"},{title:"Block Types",text:"Five types, each colour-coded: Blocking (blue), Run-through (green), Table Work (gold), Tech (purple), Other (grey). Use them to visually scan a schedule at a glance.",target:".type-badge",page:"/schedule/demo-sched-1"},{title:"AI Schedule Names",text:"The Apertus AI panel reads your blocks and suggests 3 creative schedule names tailored to your scenes and actors. Click any suggestion to instantly rename the schedule.",target:".ai-panel",page:"/schedule/demo-sched-1"},{title:"You're All Set!",text:"That covers everything. Go create your own productions, build schedules, fill in blocks, and try the AI tool. Everything resets on refresh — so experiment freely.",target:null,page:null}];let u=-1;function J(){u=0,P()}async function P(){if(Z(),u<0||u>=E.length){A();return}const e=E[u];e.page&&(window.location.hash.slice(1)||"/")!==e.page&&(g(e.page),await W(220));const t=e.target?document.querySelector(e.target):null;t?(t.scrollIntoView({behavior:"instant",block:"center"}),await W(60),pe(t),ge(e,t)):he(e)}function pe(e){const n=e.getBoundingClientRect(),o=n.left-10,l=n.top-10,a=n.width+10*2,s=n.height+10*2,i=document.createElement("div");i.id="tour-overlay",i.style.cssText="position:fixed;inset:0;z-index:9000;pointer-events:none",i.innerHTML=`
    <svg width="100%" height="100%" style="display:block">
      <defs>
        <mask id="tour-mask">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="${o}" y="${l}" width="${a}" height="${s}" rx="10" fill="black"/>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)"/>
    </svg>
  `,document.body.appendChild(i)}function he(e){const t=document.createElement("div");t.id="tour-overlay",t.style.cssText="position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);pointer-events:none",document.body.appendChild(t);const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:all",n.innerHTML=Q(e),document.body.appendChild(n),X()}function ge(e,t){const n=document.createElement("div");n.id="tour-tooltip-wrap",n.style.cssText="position:fixed;z-index:9001;pointer-events:all",n.innerHTML=Q(e),document.body.appendChild(n);const o=t.getBoundingClientRect(),l=330,a=n.offsetHeight||210,s=window.innerWidth,i=window.innerHeight;let d=o.bottom+16;d+a>i-16&&(d=o.top-a-16),d<16&&(d=16);let b=o.left;b+l>s-16&&(b=s-l-16),b<16&&(b=16),n.style.top=d+"px",n.style.left=b+"px",X()}function Q(e){const t=u===E.length-1,n=Math.round(u/(E.length-1)*100);return`
    <div class="tour-tooltip">
      <div class="tour-tt-header">
        <span class="tour-step-label">${u+1} / ${E.length}</span>
        <button id="tour-skip" class="tour-skip-btn">Skip tour</button>
      </div>
      <div class="tour-progress-track"><div class="tour-progress-fill" style="width:${n}%"></div></div>
      <h3 class="tour-title">${e.title}</h3>
      <p class="tour-text">${e.text}</p>
      <div class="tour-footer">
        ${u>0?'<button class="btn btn-ghost btn-sm" id="tour-prev">← Back</button>':"<span></span>"}
        <button class="btn btn-primary btn-sm" id="tour-next">
          ${t?"Finish ✓":"Next →"}
        </button>
      </div>
    </div>
  `}function X(){var e,t,n;(e=document.getElementById("tour-prev"))==null||e.addEventListener("click",()=>{u--,P()}),(t=document.getElementById("tour-next"))==null||t.addEventListener("click",()=>{u===E.length-1?A():(u++,P())}),(n=document.getElementById("tour-skip"))==null||n.addEventListener("click",A)}function Z(){var e,t;(e=document.getElementById("tour-overlay"))==null||e.remove(),(t=document.getElementById("tour-tooltip-wrap"))==null||t.remove()}function A(){Z(),u=-1,sessionStorage.setItem("tour_seen","1"),(window.location.hash.slice(1)||"/")!=="/"&&g("/")}function W(e){return new Promise(t=>setTimeout(t,e))}function _(e=""){return`
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${e==="dashboard"?"active":""}">Dashboard</a>
        <button class="btn btn-ghost btn-sm" id="tour-btn">✦ Take Tour</button>
      </div>
    </nav>
  `}function I(){var e;(e=document.getElementById("tour-btn"))==null||e.addEventListener("click",J)}function m({title:e,bodyHTML:t,onSubmit:n,submitLabel:o="Save",showFooter:l=!0}){var s,i;r();const a=document.createElement("div");a.id="modal-overlay",a.className="modal-overlay",a.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2>${e}</h2>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${t}
      </div>
      ${l?`
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-btn">${o}</button>
      </div>`:""}
    </div>
  `,document.body.appendChild(a),a.addEventListener("click",d=>{d.target===a&&r()}),document.getElementById("modal-close-btn").addEventListener("click",r),(s=document.getElementById("modal-cancel-btn"))==null||s.addEventListener("click",r),n&&((i=document.getElementById("modal-submit-btn"))==null||i.addEventListener("click",async()=>{const d=document.getElementById("modal-submit-btn");d.disabled=!0,d.textContent="Saving…";try{await n()}finally{d&&(d.disabled=!1,d.textContent=o)}}))}function r(){var e;(e=document.getElementById("modal-overlay"))==null||e.remove()}function be(){const e=document.getElementById("app");e.innerHTML=`
    ${_("dashboard")}
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
  `,I(),document.getElementById("new-production-btn").addEventListener("click",fe),T()}function T(){const e=document.getElementById("productions-list");if(!e)return;const t=le();if(!t.length){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `;return}e.innerHTML=t.map(n=>`
    <div class="card card-clickable" data-id="${n.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${H(n.name)}</div>
          ${n.playwright?`<div class="card-subtitle">by ${H(n.playwright)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn"
            data-id="${n.id}" data-name="${B(n.name)}"
            data-playwright="${B(n.playwright||"")}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn"
            data-id="${n.id}" data-name="${B(n.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",o=>{o.target.closest(".btn")||g("/production/"+n.dataset.id)})}),e.querySelectorAll(".edit-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),ve(n.dataset.id,n.dataset.name,n.dataset.playwright)})}),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),ye(n.dataset.id,n.dataset.name)})})}function ee(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${B(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Playwright</label>
      <input class="form-input" id="prod-playwright" type="text"
        placeholder="e.g. William Shakespeare" value="${B(t)}" />
    </div>
    <p class="error-msg" id="prod-error"></p>
  `}function fe(){m({title:"New Production",bodyHTML:ee(),submitLabel:"Create",onSubmit:()=>{const e=document.getElementById("prod-name").value.trim();if(!e){document.getElementById("prod-error").textContent="Name is required.";return}se({name:e,playwright:document.getElementById("prod-playwright").value.trim()}),r(),T()}})}function ve(e,t,n){m({title:"Edit Production",bodyHTML:ee(t,n),submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("prod-name").value.trim();if(!o){document.getElementById("prod-error").textContent="Name is required.";return}G(e,{name:o,playwright:document.getElementById("prod-playwright").value.trim()}),r(),T()}})}function ye(e,t){var n;m({title:"Delete Production",bodyHTML:`
      <p>Delete <strong>${H(t)}</strong>? All schedules and blocks will be removed.</p>
    `,submitLabel:"Delete",onSubmit:()=>{K(e),r(),T()}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function H(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function B(e){return String(e??"").replace(/"/g,"&quot;")}function ke(e){const t=N(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${_()}
      <div class="page">
        <p class="error-msg">Production not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,I();return}L(e)}function L(e){const t=N(e);if(!t){g("/");return}const n=ie(e),o=document.getElementById("app");o.innerHTML=`
    ${_()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> / ${w(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${w(t.name)}</h1>
          ${t.playwright?`<p class="page-subtitle">by ${w(t.playwright)}</p>`:""}
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
        ${Ee(n)}
      </div>
    </div>
  `,I(),document.getElementById("edit-prod-btn").addEventListener("click",()=>$e(e,t,()=>L(e))),document.getElementById("delete-prod-btn").addEventListener("click",()=>Se(e,t.name)),document.getElementById("new-sched-btn").addEventListener("click",()=>xe(e,()=>L(e))),we(e,()=>L(e))}function Ee(e){return e.length?e.map(t=>`
    <div class="card card-clickable" data-id="${t.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${w(t.name)}</div>
          ${t.date?`<div class="card-subtitle">${Ie(t.date)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit"
            data-id="${t.id}" data-name="${f(t.name)}" data-date="${f(t.date||"")}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del"
            data-id="${t.id}" data-name="${f(t.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""):`
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `}function we(e,t){document.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",o=>{o.target.closest(".btn")||g("/schedule/"+n.dataset.id)})}),document.querySelectorAll(".sched-edit").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),Be(n.dataset.id,n.dataset.name,n.dataset.date,t)})}),document.querySelectorAll(".sched-del").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),_e(n.dataset.id,n.dataset.name,t)})})}function $e(e,t,n){m({title:"Edit Production",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="prod-name" type="text"
          value="${f(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text"
          value="${f(t.playwright||"")}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("prod-name").value.trim();if(!o){document.getElementById("prod-error").textContent="Name required.";return}G(e,{name:o,playwright:document.getElementById("prod-playwright").value.trim()}),r(),n()}})}function Se(e,t){var n;m({title:"Delete Production",bodyHTML:`<p>Delete <strong>${w(t)}</strong>? All schedules and blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{K(e),r(),g("/")}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function te(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${f(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${f(t)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `}function xe(e,t){m({title:"New Schedule",bodyHTML:te(),submitLabel:"Create",onSubmit:()=>{const n=document.getElementById("sched-name").value.trim();if(!n){document.getElementById("sched-error").textContent="Name required.";return}de({name:n,date:document.getElementById("sched-date").value||null,production_id:e}),r(),t()}})}function Be(e,t,n,o){m({title:"Edit Schedule",bodyHTML:te(t,n),submitLabel:"Save",onSubmit:()=>{const l=document.getElementById("sched-name").value.trim();if(!l){document.getElementById("sched-error").textContent="Name required.";return}q(e,{name:l,date:document.getElementById("sched-date").value||null}),r(),o()}})}function _e(e,t,n){var o;m({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${w(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{O(e),r(),n()}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}function Ie(e){if(!e)return"";const[t,n,o]=e.split("-");return new Date(+t,+n-1,+o).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function f(e){return String(e??"").replace(/"/g,"&quot;")}const Le=[50,60,5,45,23,2,62,34,54,21,11,24,46,27,52,29,46,56,61,49,29,63,47,61,53,51,54,54,56,34,41,53,14,52,23,23,23],Te=Le.map(e=>String.fromCharCode(e^90)).join(""),De=["blocking","run-through","table work","tech","other"];function Pe(e){const t=V(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${_()}
      <div class="page">
        <p class="error-msg">Schedule not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,I();return}k(e)}function k(e){const t=V(e);if(!t){g("/");return}const n=N(t.production_id),o=re(e),l=o.reduce((s,i)=>s+(i.duration_minutes||0),0),a=document.getElementById("app");a.innerHTML=`
    ${_()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> /
        <a href="#/production/${n==null?void 0:n.id}">${h((n==null?void 0:n.name)??"Production")}</a> /
        ${h(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${h(t.name)}</h1>
          ${t.date?`<p class="page-subtitle">${Re(t.date)}</p>`:""}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">
          Blocks
          ${o.length?`<span style="color:var(--text2);font-weight:400;margin-left:0.5rem">· ${l} min total</span>`:""}
        </span>
        <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
      </div>

      <div id="blocks-list">
        ${Ae(o)}
      </div>

      <div class="ai-panel">
        <div class="ai-panel-header">
          <span class="ai-panel-title">✦ Apertus AI</span>
          <button class="btn btn-ghost btn-sm" id="ai-btn">Suggest Schedule Name</button>
        </div>
        <p id="ai-status" class="ai-status" style="display:none"></p>
        <div id="ai-suggestions" class="ai-suggestions"></div>
      </div>
    </div>
  `,I(),document.getElementById("edit-sched-btn").addEventListener("click",()=>Ne(e,t,()=>k(e))),document.getElementById("delete-sched-btn").addEventListener("click",()=>qe(e,t.name,n==null?void 0:n.id)),document.getElementById("add-block-btn").addEventListener("click",()=>z(null,e,o.length,()=>k(e))),document.getElementById("ai-btn").addEventListener("click",()=>Oe(e,t,n,o)),document.querySelectorAll(".block-edit").forEach(s=>{s.addEventListener("click",()=>{const i=o.find(d=>d.id===s.dataset.id);i&&z(i,e,i.order_index,()=>k(e))})}),document.querySelectorAll(".block-del").forEach(s=>{s.addEventListener("click",()=>Me(s.dataset.id,s.dataset.name,()=>k(e)))})}function Ae(e){return e.length?e.map((t,n)=>`
    <div class="block-card">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.78rem;margin-right:0.4rem">${n+1}.</span>
          <span class="block-name">${h(t.scene_name||"Untitled scene")}</span>
          ${t.block_type?`<span class="type-badge ${Fe(t.block_type)}" style="margin-left:0.6rem">${h(t.block_type)}</span>`:""}
        </div>
        <div style="display:flex;gap:0.4rem;flex-shrink:0">
          <button class="btn btn-ghost btn-sm block-edit" data-id="${t.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del"
            data-id="${t.id}" data-name="${S(t.scene_name||"Untitled scene")}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${t.actors?`<span>👥 ${h(t.actors)}</span>`:""}
        ${t.duration_minutes?`<span>⏱ ${t.duration_minutes} min</span>`:""}
      </div>
      ${t.notes?`<div class="block-notes">${h(t.notes)}</div>`:""}
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
        placeholder="e.g. Act I, Scene 2" value="${S(e.scene_name||"")}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Actors</label>
      <input class="form-input" id="b-actors" type="text"
        placeholder="e.g. Hamlet, Ophelia" value="${S(e.actors||"")}" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Block Type</label>
        <select class="form-select" id="b-type">
          <option value="">— select —</option>
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
        placeholder="Staging notes, focus areas…">${h(e.notes||"")}</textarea>
    </div>
    <p class="error-msg" id="block-error"></p>
  `}function Ce(e){return{schedule_id:e,scene_name:document.getElementById("b-scene").value.trim()||null,actors:document.getElementById("b-actors").value.trim()||null,block_type:document.getElementById("b-type").value||null,duration_minutes:parseInt(document.getElementById("b-duration").value)||null,order_index:parseInt(document.getElementById("b-order").value)||0,notes:document.getElementById("b-notes").value.trim()||null}}function z(e,t,n,o){const l=!!e;m({title:l?"Edit Block":"Add Block",bodyHTML:He(e??{order_index:n}),submitLabel:l?"Save":"Add Block",onSubmit:()=>{const a=Ce(t);l?ue(e.id,a):ce(a),r(),o()}})}function Me(e,t,n){var o;m({title:"Delete Block",bodyHTML:`<p>Delete block <strong>${h(t)}</strong>?</p>`,submitLabel:"Delete",onSubmit:()=>{me(e),r(),n()}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}function Ne(e,t,n){m({title:"Edit Schedule",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="sched-name" type="text"
          value="${S(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${S(t.date||"")}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const o=document.getElementById("sched-name").value.trim();if(!o){document.getElementById("sched-error").textContent="Name required.";return}q(e,{name:o,date:document.getElementById("sched-date").value||null}),r(),n()}})}function qe(e,t,n){var o;m({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${h(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{O(e),r(),g("/production/"+n)}}),(o=document.getElementById("modal-submit-btn"))==null||o.classList.replace("btn-primary","btn-danger")}async function Oe(e,t,n,o){var F;const l=Te,a=document.getElementById("ai-status"),s=document.getElementById("ai-suggestions"),i=document.getElementById("ai-btn");i.disabled=!0,a.style.display="block",a.textContent="Thinking…",s.innerHTML="";const d=o.length?o.map(p=>`- ${p.scene_name||"Untitled"} | actors: ${p.actors||"none"} | type: ${p.block_type||"other"} | ${p.duration_minutes||"?"} min`).join(`
`):"(no blocks defined)",b=`<|system|>
You are a concise assistant helping a theater director name rehearsal schedules.</s>
<|user|>
Suggest exactly 3 short, evocative names for a rehearsal schedule. Reply with only the 3 names, one per line, no numbers, no explanations.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Date: ${t.date??"not set"}
Blocks:
${d}</s>
<|assistant|>`;try{const p=await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({inputs:b,parameters:{max_new_tokens:80,temperature:.85,return_full_text:!1,stop:["</s>"]}})});if(!p.ok){const c=await p.text();a.textContent=`API error ${p.status}: ${c.slice(0,100)}`,i.disabled=!1;return}const x=await p.json(),R=Array.isArray(x)?(F=x[0])==null?void 0:F.generated_text:x==null?void 0:x.generated_text;if(!R){a.textContent="No response from model.",i.disabled=!1;return}const j=R.split(`
`).map(c=>c.replace(/^[\d.\-*•"]+\s*/,"").replace(/["]+$/,"").trim()).filter(c=>c.length>2&&c.length<80).slice(0,3);if(!j.length){a.textContent="Could not parse suggestions. Try again.",i.disabled=!1;return}a.textContent="Pick one to rename this schedule:",s.innerHTML=j.map(c=>`<button class="ai-suggestion-pill" data-name="${S(c)}">${h(c)}</button>`).join(""),s.querySelectorAll(".ai-suggestion-pill").forEach(c=>{c.addEventListener("click",()=>{q(e,{name:c.dataset.name,date:t.date}),k(e)})})}catch(p){a.textContent=`Error: ${p.message}`}finally{i.disabled=!1}}function Fe(e){return{blocking:"badge-blocking","run-through":"badge-run-through","table work":"badge-table-work",tech:"badge-tech",other:"badge-other"}[e]??"badge-other"}function Re(e){if(!e)return"";const[t,n,o]=e.split("-");return new Date(+t,+n-1,+o).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function h(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function S(e){return String(e??"").replace(/"/g,"&quot;")}C("/",()=>be());C("/production/:id",({id:e})=>ke(e));C("/schedule/:id",({id:e})=>Pe(e));ne(()=>g("/"));ae();sessionStorage.getItem("tour_seen")||setTimeout(J,400);
