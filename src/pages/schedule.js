import { navigate } from '../router.js'
import {
  getScheduleById, updateSchedule, deleteSchedule,
  getProductionById,
  getBlocksBySchedule, createBlock, updateBlock, deleteBlock
} from '../store.js'
import { navHTML, attachNavListeners } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

const BLOCK_TYPES = ['blocking', 'run-through', 'table work', 'tech', 'other']

export function renderSchedule(id) {
  const schedule = getScheduleById(id)
  const app = document.getElementById('app')

  if (!schedule) {
    app.innerHTML = `
      ${navHTML()}
      <div class="page">
        <p class="error-msg">Schedule not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `
    attachNavListeners()
    return
  }

  renderPage(id)
}

function renderPage(id) {
  const schedule = getScheduleById(id)
  if (!schedule) { navigate('/'); return }

  const production = getProductionById(schedule.production_id)
  const blocks = getBlocksBySchedule(id)
  const totalMin = blocks.reduce((sum, b) => sum + (b.duration_minutes || 0), 0)

  const app = document.getElementById('app')
  app.innerHTML = `
    ${navHTML()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> /
        <a href="#/production/${production?.id}">${esc(production?.name ?? 'Production')}</a> /
        ${esc(schedule.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${esc(schedule.name)}</h1>
          ${schedule.date ? `<p class="page-subtitle">${formatDate(schedule.date)}</p>` : ''}
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
          <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">
          Blocks
          ${blocks.length ? `<span style="color:var(--text2);font-weight:400;margin-left:0.5rem">· ${totalMin} min total</span>` : ''}
        </span>
        <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
      </div>

      <div id="blocks-list">
        ${renderBlockList(blocks)}
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
  `

  attachNavListeners()

  document.getElementById('edit-sched-btn').addEventListener('click', () =>
    openEditSchedModal(id, schedule, () => renderPage(id)))
  document.getElementById('delete-sched-btn').addEventListener('click', () =>
    confirmDeleteSched(id, schedule.name, production?.id))
  document.getElementById('add-block-btn').addEventListener('click', () =>
    openBlockModal(null, id, blocks.length, () => renderPage(id)))
  document.getElementById('ai-btn').addEventListener('click', () =>
    runAI(id, schedule, production, blocks))

  document.querySelectorAll('.block-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = blocks.find(b => b.id === btn.dataset.id)
      if (block) openBlockModal(block, id, block.order_index, () => renderPage(id))
    })
  })

  document.querySelectorAll('.block-del').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteBlock(btn.dataset.id, btn.dataset.name, () => renderPage(id)))
  })
}

// ── Block rendering ───────────────────────────────────────────────

function renderBlockList(blocks) {
  if (!blocks.length) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">🎬</div>
        <h3>No blocks yet</h3>
        <p>Add rehearsal blocks to build your schedule</p>
      </div>
    `
  }

  return blocks.map((b, i) => `
    <div class="block-card">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.78rem;margin-right:0.4rem">${i + 1}.</span>
          <span class="block-name">${esc(b.scene_name || 'Untitled scene')}</span>
          ${b.block_type
            ? `<span class="type-badge ${badgeClass(b.block_type)}" style="margin-left:0.6rem">${esc(b.block_type)}</span>`
            : ''}
        </div>
        <div style="display:flex;gap:0.4rem;flex-shrink:0">
          <button class="btn btn-ghost btn-sm block-edit" data-id="${b.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del"
            data-id="${b.id}" data-name="${escAttr(b.scene_name || 'Untitled scene')}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${b.actors ? `<span>👥 ${esc(b.actors)}</span>` : ''}
        ${b.duration_minutes ? `<span>⏱ ${b.duration_minutes} min</span>` : ''}
      </div>
      ${b.notes ? `<div class="block-notes">${esc(b.notes)}</div>` : ''}
    </div>
  `).join('')
}

// ── Block modals ──────────────────────────────────────────────────

function blockFormHTML(b = {}) {
  return `
    <div class="form-group">
      <label class="form-label">Scene Name</label>
      <input class="form-input" id="b-scene" type="text"
        placeholder="e.g. Act I, Scene 2" value="${escAttr(b.scene_name || '')}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Actors</label>
      <input class="form-input" id="b-actors" type="text"
        placeholder="e.g. Hamlet, Ophelia" value="${escAttr(b.actors || '')}" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Block Type</label>
        <select class="form-select" id="b-type">
          <option value="">— select —</option>
          ${BLOCK_TYPES.map(t => `<option value="${t}" ${b.block_type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Duration (min)</label>
        <input class="form-input" id="b-duration" type="number"
          min="1" max="480" placeholder="30" value="${b.duration_minutes ?? ''}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Order Index</label>
      <input class="form-input" id="b-order" type="number" min="0"
        value="${b.order_index ?? 0}" />
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <textarea class="form-textarea" id="b-notes"
        placeholder="Staging notes, focus areas…">${esc(b.notes || '')}</textarea>
    </div>
    <p class="error-msg" id="block-error"></p>
  `
}

function readBlockForm(scheduleId) {
  return {
    schedule_id: scheduleId,
    scene_name: document.getElementById('b-scene').value.trim() || null,
    actors: document.getElementById('b-actors').value.trim() || null,
    block_type: document.getElementById('b-type').value || null,
    duration_minutes: parseInt(document.getElementById('b-duration').value) || null,
    order_index: parseInt(document.getElementById('b-order').value) || 0,
    notes: document.getElementById('b-notes').value.trim() || null
  }
}

function openBlockModal(block, scheduleId, defaultOrder, reload) {
  const isEdit = !!block
  openModal({
    title: isEdit ? 'Edit Block' : 'Add Block',
    bodyHTML: blockFormHTML(block ?? { order_index: defaultOrder }),
    submitLabel: isEdit ? 'Save' : 'Add Block',
    onSubmit: () => {
      const data = readBlockForm(scheduleId)
      if (isEdit) updateBlock(block.id, data)
      else createBlock(data)
      closeModal()
      reload()
    }
  })
}

function confirmDeleteBlock(id, name, reload) {
  openModal({
    title: 'Delete Block',
    bodyHTML: `<p>Delete block <strong>${esc(name)}</strong>?</p>`,
    submitLabel: 'Delete',
    onSubmit: () => { deleteBlock(id); closeModal(); reload() }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Schedule modals ───────────────────────────────────────────────

function openEditSchedModal(id, schedule, reload) {
  openModal({
    title: 'Edit Schedule',
    bodyHTML: `
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="sched-name" type="text"
          value="${escAttr(schedule.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${escAttr(schedule.date || '')}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,
    submitLabel: 'Save',
    onSubmit: () => {
      const name = document.getElementById('sched-name').value.trim()
      if (!name) { document.getElementById('sched-error').textContent = 'Name required.'; return }
      updateSchedule(id, { name, date: document.getElementById('sched-date').value || null })
      closeModal()
      reload()
    }
  })
}

function confirmDeleteSched(id, name, productionId) {
  openModal({
    title: 'Delete Schedule',
    bodyHTML: `<p>Delete <strong>${esc(name)}</strong>? All blocks will be removed.</p>`,
    submitLabel: 'Delete',
    onSubmit: () => {
      deleteSchedule(id)
      closeModal()
      navigate('/production/' + productionId)
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── AI Suggestion ─────────────────────────────────────────────────

async function runAI(scheduleId, schedule, production, blocks) {
  const hfKey = localStorage.getItem('hf_api_key')
  const statusEl = document.getElementById('ai-status')
  const suggestionsEl = document.getElementById('ai-suggestions')
  const btn = document.getElementById('ai-btn')

  if (!hfKey) {
    statusEl.style.display = 'block'
    statusEl.textContent = 'No HF API key set. Click "✦ AI Key" in the nav to add one.'
    return
  }

  btn.disabled = true
  statusEl.style.display = 'block'
  statusEl.textContent = 'Thinking…'
  suggestionsEl.innerHTML = ''

  const blockSummary = blocks.length
    ? blocks.map(b =>
        `- ${b.scene_name || 'Untitled'} | actors: ${b.actors || 'none'} | type: ${b.block_type || 'other'} | ${b.duration_minutes || '?'} min`
      ).join('\n')
    : '(no blocks defined)'

  const prompt = `[INST] You are helping a theater director create a short, evocative name for a rehearsal schedule.

Production: ${production?.name ?? 'Unknown'}
Schedule date: ${schedule.date ?? 'not set'}

Blocks:
${blockSummary}

Reply with exactly 3 schedule name suggestions, one per line, no numbering, no punctuation, no explanations. Just 3 names. [/INST]`

  try {
    const res = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 100, temperature: 0.8, return_full_text: false }
        })
      }
    )

    if (!res.ok) {
      const txt = await res.text()
      statusEl.textContent = `API error ${res.status}: ${txt.slice(0, 100)}`
      btn.disabled = false
      return
    }

    const json = await res.json()
    const raw = Array.isArray(json) ? json[0]?.generated_text : json?.generated_text
    if (!raw) { statusEl.textContent = 'No response from model.'; btn.disabled = false; return }

    const suggestions = raw
      .split('\n')
      .map(l => l.replace(/^[\d.\-*•"]+\s*/, '').replace(/["]+$/, '').trim())
      .filter(l => l.length > 2 && l.length < 80)
      .slice(0, 3)

    if (!suggestions.length) {
      statusEl.textContent = 'Could not parse suggestions. Try again.'
      btn.disabled = false
      return
    }

    statusEl.textContent = 'Pick one to rename this schedule:'
    suggestionsEl.innerHTML = suggestions.map(s =>
      `<button class="ai-suggestion-pill" data-name="${escAttr(s)}">${esc(s)}</button>`
    ).join('')

    suggestionsEl.querySelectorAll('.ai-suggestion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        updateSchedule(scheduleId, { name: pill.dataset.name, date: schedule.date })
        renderPage(scheduleId)
      })
    })
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`
  } finally {
    btn.disabled = false
  }
}

// ── Helpers ───────────────────────────────────────────────────────

function badgeClass(type) {
  return { blocking: 'badge-blocking', 'run-through': 'badge-run-through',
           'table work': 'badge-table-work', tech: 'badge-tech', other: 'badge-other' }[type] ?? 'badge-other'
}

function formatDate(s) {
  if (!s) return ''
  const [y, m, d] = s.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
}

function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function escAttr(str) { return String(str ?? '').replace(/"/g, '&quot;') }
