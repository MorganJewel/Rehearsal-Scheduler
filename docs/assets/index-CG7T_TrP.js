(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const F=new Map;let w=null;function D(e,t){F.set(e,t)}function Y(e){w=e}function f(e){window.location.hash="#"+e}function z(e,t){const n=e==="/"?[]:e.split("/").filter(Boolean),a=t==="/"?[]:t.split("/").filter(Boolean);if(n.length!==a.length)return null;const l={};for(let o=0;o<n.length;o++)if(n[o].startsWith(":"))l[n[o].slice(1)]=decodeURIComponent(a[o]);else if(n[o]!==a[o])return null;return l}function q(){const t=(window.location.hash||"#/").slice(1)||"/";for(const[n,a]of F){const l=z(n,t);if(l!==null){a(l);return}}w&&w()}function J(){window.addEventListener("hashchange",q),q()}function P(){return crypto.randomUUID()}let k=[{id:"demo-prod-1",name:"Hamlet",playwright:"William Shakespeare",created_at:new Date().toISOString()}],g=[{id:"demo-sched-1",production_id:"demo-prod-1",name:"Act I Run-Through",date:"2026-06-15",created_at:new Date().toISOString()}],h=[{id:"demo-block-1",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 1 — The Battlements",actors:"Hamlet, Horatio, Marcellus, Ghost",block_type:"blocking",duration_minutes:40,notes:`Work Ghost entrance from SR. Hamlet crosses to DSL on "I'll follow it."`,order_index:0},{id:"demo-block-2",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 2 — The Court",actors:"Hamlet, Claudius, Gertrude, Polonius",block_type:"table work",duration_minutes:30,notes:`Discuss Hamlet's internal conflict. Emphasis on the "too too solid flesh" speech.`,order_index:1},{id:"demo-block-3",schedule_id:"demo-sched-1",scene_name:"Act I, Scene 3 — Polonius's House",actors:"Laertes, Ophelia, Polonius",block_type:"run-through",duration_minutes:25,notes:"Focus on Ophelia's reaction to advice. Speed run first, then notes.",order_index:2}];function Q(){return[...k].sort((e,t)=>t.created_at.localeCompare(e.created_at))}function A(e){return k.find(t=>t.id===e)??null}function V({name:e,playwright:t}){const n={id:P(),name:e,playwright:t||null,created_at:new Date().toISOString()};return k.push(n),n}function U(e,{name:t,playwright:n}){const a=k.find(l=>l.id===e);return a?(a.name=t,a.playwright=n||null,a):null}function j(e){g.filter(n=>n.production_id===e).map(n=>n.id).forEach(n=>H(n)),k=k.filter(n=>n.id!==e)}function X(e){return g.filter(t=>t.production_id===e).sort((t,n)=>t.created_at.localeCompare(n.created_at))}function R(e){return g.find(t=>t.id===e)??null}function Z({name:e,date:t,production_id:n}){const a={id:P(),name:e,date:t||null,production_id:n,created_at:new Date().toISOString()};return g.push(a),a}function M(e,{name:t,date:n}){const a=g.find(l=>l.id===e);return a?(a.name=t,a.date=n||null,a):null}function H(e){h=h.filter(t=>t.schedule_id!==e),g=g.filter(t=>t.id!==e)}function ee(e){return h.filter(t=>t.schedule_id===e).sort((t,n)=>t.order_index-n.order_index)}function te({schedule_id:e,scene_name:t,actors:n,block_type:a,duration_minutes:l,notes:o,order_index:d}){const r={id:P(),schedule_id:e,scene_name:t||null,actors:n||null,block_type:a||null,duration_minutes:l||null,notes:o||null,order_index:d??0};return h.push(r),r}function ne(e,t){const n=h.find(a=>a.id===e);return n?(Object.assign(n,{scene_name:t.scene_name||null,actors:t.actors||null,block_type:t.block_type||null,duration_minutes:t.duration_minutes||null,notes:t.notes||null,order_index:t.order_index??n.order_index}),n):null}function ae(e){h=h.filter(t=>t.id!==e)}function I(e=""){return`
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${e==="dashboard"?"active":""}">Dashboard</a>
        <button class="btn btn-ghost btn-sm" id="hf-key-btn" title="Set Hugging Face API key">
          ✦ AI Key
        </button>
      </div>
    </nav>
  `}function _(){var e;(e=document.getElementById("hf-key-btn"))==null||e.addEventListener("click",()=>{oe()})}function oe(){const e=localStorage.getItem("hf_api_key")||"",t=window.prompt(`Enter your Hugging Face API key (hf_…)
Leave blank to clear.`,e);t!==null&&(t.trim()?localStorage.setItem("hf_api_key",t.trim()):localStorage.removeItem("hf_api_key"))}function c({title:e,bodyHTML:t,onSubmit:n,submitLabel:a="Save",showFooter:l=!0}){var d,r;i();const o=document.createElement("div");o.id="modal-overlay",o.className="modal-overlay",o.innerHTML=`
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
        <button class="btn btn-primary" id="modal-submit-btn">${a}</button>
      </div>`:""}
    </div>
  `,document.body.appendChild(o),o.addEventListener("click",u=>{u.target===o&&i()}),document.getElementById("modal-close-btn").addEventListener("click",i),(d=document.getElementById("modal-cancel-btn"))==null||d.addEventListener("click",i),n&&((r=document.getElementById("modal-submit-btn"))==null||r.addEventListener("click",async()=>{const u=document.getElementById("modal-submit-btn");u.disabled=!0,u.textContent="Saving…";try{await n()}finally{u&&(u.disabled=!1,u.textContent=a)}}))}function i(){var e;(e=document.getElementById("modal-overlay"))==null||e.remove()}function le(){const e=document.getElementById("app");e.innerHTML=`
    ${I("dashboard")}
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
  `,_(),document.getElementById("new-production-btn").addEventListener("click",de),B()}function B(){const e=document.getElementById("productions-list");if(!e)return;const t=Q();if(!t.length){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `;return}e.innerHTML=t.map(n=>`
    <div class="card card-clickable" data-id="${n.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${x(n.name)}</div>
          ${n.playwright?`<div class="card-subtitle">by ${x(n.playwright)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn"
            data-id="${n.id}" data-name="${S(n.name)}"
            data-playwright="${S(n.playwright||"")}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn"
            data-id="${n.id}" data-name="${S(n.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",a=>{a.target.closest(".btn")||f("/production/"+n.dataset.id)})}),e.querySelectorAll(".edit-btn").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),re(n.dataset.id,n.dataset.name,n.dataset.playwright)})}),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),ie(n.dataset.id,n.dataset.name)})})}function K(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${S(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Playwright</label>
      <input class="form-input" id="prod-playwright" type="text"
        placeholder="e.g. William Shakespeare" value="${S(t)}" />
    </div>
    <p class="error-msg" id="prod-error"></p>
  `}function de(){c({title:"New Production",bodyHTML:K(),submitLabel:"Create",onSubmit:()=>{const e=document.getElementById("prod-name").value.trim();if(!e){document.getElementById("prod-error").textContent="Name is required.";return}V({name:e,playwright:document.getElementById("prod-playwright").value.trim()}),i(),B()}})}function re(e,t,n){c({title:"Edit Production",bodyHTML:K(t,n),submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("prod-name").value.trim();if(!a){document.getElementById("prod-error").textContent="Name is required.";return}U(e,{name:a,playwright:document.getElementById("prod-playwright").value.trim()}),i(),B()}})}function ie(e,t){var n;c({title:"Delete Production",bodyHTML:`
      <p>Delete <strong>${x(t)}</strong>? All schedules and blocks will be removed.</p>
    `,submitLabel:"Delete",onSubmit:()=>{j(e),i(),B()}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function x(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function S(e){return String(e??"").replace(/"/g,"&quot;")}function se(e){const t=A(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${I()}
      <div class="page">
        <p class="error-msg">Production not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,_();return}L(e)}function L(e){const t=A(e);if(!t){f("/");return}const n=X(e),a=document.getElementById("app");a.innerHTML=`
    ${I()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> / ${y(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${y(t.name)}</h1>
          ${t.playwright?`<p class="page-subtitle">by ${y(t.playwright)}</p>`:""}
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
        ${ce(n)}
      </div>
    </div>
  `,_(),document.getElementById("edit-prod-btn").addEventListener("click",()=>me(e,t,()=>L(e))),document.getElementById("delete-prod-btn").addEventListener("click",()=>pe(e,t.name)),document.getElementById("new-sched-btn").addEventListener("click",()=>be(e,()=>L(e))),ue(e,()=>L(e))}function ce(e){return e.length?e.map(t=>`
    <div class="card card-clickable" data-id="${t.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${y(t.name)}</div>
          ${t.date?`<div class="card-subtitle">${fe(t.date)}</div>`:""}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit"
            data-id="${t.id}" data-name="${b(t.name)}" data-date="${b(t.date||"")}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del"
            data-id="${t.id}" data-name="${b(t.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join(""):`
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `}function ue(e,t){document.querySelectorAll(".card-clickable").forEach(n=>{n.addEventListener("click",a=>{a.target.closest(".btn")||f("/schedule/"+n.dataset.id)})}),document.querySelectorAll(".sched-edit").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),ge(n.dataset.id,n.dataset.name,n.dataset.date,t)})}),document.querySelectorAll(".sched-del").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation(),he(n.dataset.id,n.dataset.name,t)})})}function me(e,t,n){c({title:"Edit Production",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="prod-name" type="text"
          value="${b(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text"
          value="${b(t.playwright||"")}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("prod-name").value.trim();if(!a){document.getElementById("prod-error").textContent="Name required.";return}U(e,{name:a,playwright:document.getElementById("prod-playwright").value.trim()}),i(),n()}})}function pe(e,t){var n;c({title:"Delete Production",bodyHTML:`<p>Delete <strong>${y(t)}</strong>? All schedules and blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{j(e),i(),f("/")}}),(n=document.getElementById("modal-submit-btn"))==null||n.classList.replace("btn-primary","btn-danger")}function W(e="",t=""){return`
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${b(e)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${b(t)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `}function be(e,t){c({title:"New Schedule",bodyHTML:W(),submitLabel:"Create",onSubmit:()=>{const n=document.getElementById("sched-name").value.trim();if(!n){document.getElementById("sched-error").textContent="Name required.";return}Z({name:n,date:document.getElementById("sched-date").value||null,production_id:e}),i(),t()}})}function ge(e,t,n,a){c({title:"Edit Schedule",bodyHTML:W(t,n),submitLabel:"Save",onSubmit:()=>{const l=document.getElementById("sched-name").value.trim();if(!l){document.getElementById("sched-error").textContent="Name required.";return}M(e,{name:l,date:document.getElementById("sched-date").value||null}),i(),a()}})}function he(e,t,n){var a;c({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${y(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{H(e),i(),n()}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}function fe(e){if(!e)return"";const[t,n,a]=e.split("-");return new Date(+t,+n-1,+a).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function b(e){return String(e??"").replace(/"/g,"&quot;")}const ve=["blocking","run-through","table work","tech","other"];function ye(e){const t=R(e),n=document.getElementById("app");if(!t){n.innerHTML=`
      ${I()}
      <div class="page">
        <p class="error-msg">Schedule not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `,_();return}v(e)}function v(e){const t=R(e);if(!t){f("/");return}const n=A(t.production_id),a=ee(e),l=a.reduce((d,r)=>d+(r.duration_minutes||0),0),o=document.getElementById("app");o.innerHTML=`
    ${I()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> /
        <a href="#/production/${n==null?void 0:n.id}">${p((n==null?void 0:n.name)??"Production")}</a> /
        ${p(t.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${p(t.name)}</h1>
          ${t.date?`<p class="page-subtitle">${we(t.date)}</p>`:""}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">
          Blocks
          ${a.length?`<span style="color:var(--text2);font-weight:400;margin-left:0.5rem">· ${l} min total</span>`:""}
        </span>
        <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
      </div>

      <div id="blocks-list">
        ${ke(a)}
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
  `,_(),document.getElementById("edit-sched-btn").addEventListener("click",()=>Ie(e,t,()=>v(e))),document.getElementById("delete-sched-btn").addEventListener("click",()=>_e(e,t.name,n==null?void 0:n.id)),document.getElementById("add-block-btn").addEventListener("click",()=>O(null,e,a.length,()=>v(e))),document.getElementById("ai-btn").addEventListener("click",()=>Le(e,t,n,a)),document.querySelectorAll(".block-edit").forEach(d=>{d.addEventListener("click",()=>{const r=a.find(u=>u.id===d.dataset.id);r&&O(r,e,r.order_index,()=>v(e))})}),document.querySelectorAll(".block-del").forEach(d=>{d.addEventListener("click",()=>Se(d.dataset.id,d.dataset.name,()=>v(e)))})}function ke(e){return e.length?e.map((t,n)=>`
    <div class="block-card">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.78rem;margin-right:0.4rem">${n+1}.</span>
          <span class="block-name">${p(t.scene_name||"Untitled scene")}</span>
          ${t.block_type?`<span class="type-badge ${Be(t.block_type)}" style="margin-left:0.6rem">${p(t.block_type)}</span>`:""}
        </div>
        <div style="display:flex;gap:0.4rem;flex-shrink:0">
          <button class="btn btn-ghost btn-sm block-edit" data-id="${t.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del"
            data-id="${t.id}" data-name="${E(t.scene_name||"Untitled scene")}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${t.actors?`<span>👥 ${p(t.actors)}</span>`:""}
        ${t.duration_minutes?`<span>⏱ ${t.duration_minutes} min</span>`:""}
      </div>
      ${t.notes?`<div class="block-notes">${p(t.notes)}</div>`:""}
    </div>
  `).join(""):`
      <div class="empty-state">
        <div class="empty-state-icon">🎬</div>
        <h3>No blocks yet</h3>
        <p>Add rehearsal blocks to build your schedule</p>
      </div>
    `}function Ee(e={}){return`
    <div class="form-group">
      <label class="form-label">Scene Name</label>
      <input class="form-input" id="b-scene" type="text"
        placeholder="e.g. Act I, Scene 2" value="${E(e.scene_name||"")}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Actors</label>
      <input class="form-input" id="b-actors" type="text"
        placeholder="e.g. Hamlet, Ophelia" value="${E(e.actors||"")}" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Block Type</label>
        <select class="form-select" id="b-type">
          <option value="">— select —</option>
          ${ve.map(t=>`<option value="${t}" ${e.block_type===t?"selected":""}>${t}</option>`).join("")}
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
  `}function $e(e){return{schedule_id:e,scene_name:document.getElementById("b-scene").value.trim()||null,actors:document.getElementById("b-actors").value.trim()||null,block_type:document.getElementById("b-type").value||null,duration_minutes:parseInt(document.getElementById("b-duration").value)||null,order_index:parseInt(document.getElementById("b-order").value)||0,notes:document.getElementById("b-notes").value.trim()||null}}function O(e,t,n,a){const l=!!e;c({title:l?"Edit Block":"Add Block",bodyHTML:Ee(e??{order_index:n}),submitLabel:l?"Save":"Add Block",onSubmit:()=>{const o=$e(t);l?ne(e.id,o):te(o),i(),a()}})}function Se(e,t,n){var a;c({title:"Delete Block",bodyHTML:`<p>Delete block <strong>${p(t)}</strong>?</p>`,submitLabel:"Delete",onSubmit:()=>{ae(e),i(),n()}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}function Ie(e,t,n){c({title:"Edit Schedule",bodyHTML:`
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="sched-name" type="text"
          value="${E(t.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${E(t.date||"")}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,submitLabel:"Save",onSubmit:()=>{const a=document.getElementById("sched-name").value.trim();if(!a){document.getElementById("sched-error").textContent="Name required.";return}M(e,{name:a,date:document.getElementById("sched-date").value||null}),i(),n()}})}function _e(e,t,n){var a;c({title:"Delete Schedule",bodyHTML:`<p>Delete <strong>${p(t)}</strong>? All blocks will be removed.</p>`,submitLabel:"Delete",onSubmit:()=>{H(e),i(),f("/production/"+n)}}),(a=document.getElementById("modal-submit-btn"))==null||a.classList.replace("btn-primary","btn-danger")}async function Le(e,t,n,a){var T;const l=localStorage.getItem("hf_api_key"),o=document.getElementById("ai-status"),d=document.getElementById("ai-suggestions"),r=document.getElementById("ai-btn");if(!l){o.style.display="block",o.textContent='No HF API key set. Click "✦ AI Key" in the nav to add one.';return}r.disabled=!0,o.style.display="block",o.textContent="Thinking…",d.innerHTML="";const u=a.length?a.map(m=>`- ${m.scene_name||"Untitled"} | actors: ${m.actors||"none"} | type: ${m.block_type||"other"} | ${m.duration_minutes||"?"} min`).join(`
`):"(no blocks defined)",G=`[INST] You are helping a theater director create a short, evocative name for a rehearsal schedule.

Production: ${(n==null?void 0:n.name)??"Unknown"}
Schedule date: ${t.date??"not set"}

Blocks:
${u}

Reply with exactly 3 schedule name suggestions, one per line, no numbering, no punctuation, no explanations. Just 3 names. [/INST]`;try{const m=await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({inputs:G,parameters:{max_new_tokens:100,temperature:.8,return_full_text:!1}})});if(!m.ok){const s=await m.text();o.textContent=`API error ${m.status}: ${s.slice(0,100)}`,r.disabled=!1;return}const $=await m.json(),N=Array.isArray($)?(T=$[0])==null?void 0:T.generated_text:$==null?void 0:$.generated_text;if(!N){o.textContent="No response from model.",r.disabled=!1;return}const C=N.split(`
`).map(s=>s.replace(/^[\d.\-*•"]+\s*/,"").replace(/["]+$/,"").trim()).filter(s=>s.length>2&&s.length<80).slice(0,3);if(!C.length){o.textContent="Could not parse suggestions. Try again.",r.disabled=!1;return}o.textContent="Pick one to rename this schedule:",d.innerHTML=C.map(s=>`<button class="ai-suggestion-pill" data-name="${E(s)}">${p(s)}</button>`).join(""),d.querySelectorAll(".ai-suggestion-pill").forEach(s=>{s.addEventListener("click",()=>{M(e,{name:s.dataset.name,date:t.date}),v(e)})})}catch(m){o.textContent=`Error: ${m.message}`}finally{r.disabled=!1}}function Be(e){return{blocking:"badge-blocking","run-through":"badge-run-through","table work":"badge-table-work",tech:"badge-tech",other:"badge-other"}[e]??"badge-other"}function we(e){if(!e)return"";const[t,n,a]=e.split("-");return new Date(+t,+n-1,+a).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function E(e){return String(e??"").replace(/"/g,"&quot;")}D("/",()=>le());D("/production/:id",({id:e})=>se(e));D("/schedule/:id",({id:e})=>ye(e));Y(()=>f("/"));J();
