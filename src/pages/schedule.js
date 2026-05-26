import { navigate } from '../router.js'
import {
  getScheduleById, updateSchedule, deleteSchedule,
  getProductionById,
  getBlocksBySchedule, createBlock, updateBlock, deleteBlock
} from '../store.js'
import { navHTML, attachNavListeners } from '../nav.js'
import { openModal, closeModal } from '../modal.js'
import { HF_API_KEY } from '../config.js'

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
  document.getElementById('ai-pacing-btn').addEventListener('click', () =>
    runPacingAnalysis(id, schedule, production, blocks))

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
  const hfKey = HF_API_KEY
  const statusEl = document.getElementById('ai-status')
  const suggestionsEl = document.getElementById('ai-suggestions')
  const btn = document.getElementById('ai-btn')

  btn.disabled = true
  statusEl.style.display = 'block'
  statusEl.textContent = 'Thinking…'
  suggestionsEl.innerHTML = ''

  const blockSummary = blocks.length
    ? blocks.map(b =>
        `- ${b.scene_name || 'Untitled'} | actors: ${b.actors || 'none'} | type: ${b.block_type || 'other'} | ${b.duration_minutes || '?'} min`
      ).join('\n')
    : '(no blocks defined)'

  const userMsg = `Suggest exactly 3 short, evocative names for a rehearsal schedule. Reply with only the 3 names, one per line — no numbers, no bullet points, no explanations.

Production: ${production?.name ?? 'Unknown'}
Date: ${schedule.date ?? 'not set'}
Blocks:
${blockSummary}`

  try {
    const res = await fetch(
      'https://router.huggingface.co/featherless-ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'swiss-ai/Apertus-8B-Instruct-2509',
          messages: [
            { role: 'system', content: 'You are a concise assistant helping a theater director name rehearsal schedules.' },
            { role: 'user', content: userMsg }
          ],
          max_tokens: 80,
          temperature: 0.85
        })
      }
    )

    if (!res.ok) {
      const txt = await res.text()
      statusEl.textContent = `API error ${res.status}: ${txt.slice(0, 120)}`
      btn.disabled = false
      return
    }

    const json = await res.json()
    const raw = json?.choices?.[0]?.message?.content
    if (!raw) { statusEl.textContent = 'No response from Apertus.'; btn.disabled = false; return }

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

// ── Pacing Analysis ───────────────────────────────────────────────

async function runPacingAnalysis(scheduleId, schedule, production, blocks) {
  const statusEl = document.getElementById('ai-status')
  const adviceEl = document.getElementById('ai-advice')
  const suggestionsEl = document.getElementById('ai-suggestions')
  const btn = document.getElementById('ai-pacing-btn')

  btn.disabled = true
  statusEl.style.display = 'block'
  statusEl.textContent = 'Analyzing schedule…'
  suggestionsEl.innerHTML = ''
  adviceEl.style.display = 'none'

  if (!blocks.length) {
    statusEl.textContent = 'Add some blocks first so Apertus has something to analyze.'
    btn.disabled = false
    return
  }

  const totalMin = blocks.reduce((s, b) => s + (b.duration_minutes || 0), 0)
  const blockList = blocks.map((b, i) =>
    `${i + 1}. ${b.scene_name || 'Untitled'} | actors: ${b.actors || 'none'} | type: ${b.block_type || 'other'} | ${b.duration_minutes || '?'} min`
  ).join('\n')

  try {
    const res = await fetch(
      'https://router.huggingface.co/featherless-ai/v1/chat/completions',
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${HF_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'swiss-ai/Apertus-8B-Instruct-2509',
          messages: [
            {
              role: 'system',
              content: 'You are a stage management advisor. You give brief, practical observations — never make decisions for the SM. Flag concerns only; keep it under 100 words total.'
            },
            {
              role: 'user',
              content: `Review this rehearsal schedule for pacing, actor load, and flow. Flag 2–3 specific things worth watching. Do not suggest rearranging anything — just observations.

Production: ${production?.name ?? 'Unknown'}
Total time: ${totalMin} min
Blocks:\n${blockList}`
            }
          ],
          max_tokens: 150,
          temperature: 0.6
        })
      }
    )

    if (!res.ok) {
      const txt = await res.text()
      statusEl.textContent = `API error ${res.status}: ${txt.slice(0, 120)}`
      btn.disabled = false
      return
    }

    const json = await res.json()
    const raw = json?.choices?.[0]?.message?.content?.trim()
    if (!raw) { statusEl.textContent = 'No response from Apertus.'; btn.disabled = false; return }

    statusEl.textContent = 'Apertus observations — your call on what to do with these:'
    adviceEl.style.display = 'block'
    adviceEl.textContent = raw
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
