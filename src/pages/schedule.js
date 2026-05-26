import { navigate } from '../router.js'
import { getSupabaseClient } from '../supabase.js'
import { navHTML, attachLogout } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

const BLOCK_TYPES = ['blocking', 'run-through', 'table work', 'tech', 'other']

export async function renderSchedule(id) {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${navHTML()}
    <div class="page" id="sched-page">
      <div class="loading">Loading…</div>
    </div>
  `

  attachLogout()
  await loadPage(id)
}

async function loadPage(id) {
  const supabase = getSupabaseClient()
  const page = document.getElementById('sched-page')
  if (!page) return

  const { data: schedule, error: se } = await supabase
    .from('schedules')
    .select('*, productions(id, name)')
    .eq('id', id)
    .single()

  if (se || !schedule) {
    page.innerHTML = `
      <p class="error-msg">Schedule not found or access denied.</p>
      <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
    `
    return
  }

  const { data: blocks, error: be } = await supabase
    .from('blocks')
    .select('*')
    .eq('schedule_id', id)
    .order('order_index', { ascending: true })

  const production = schedule.productions

  page.innerHTML = `
    <div class="breadcrumb">
      <a href="#/">Dashboard</a> /
      <a href="#/production/${production.id}">${escHtml(production.name)}</a> /
      ${escHtml(schedule.name)}
    </div>

    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">${escHtml(schedule.name)}</h1>
        ${schedule.date ? `<p class="page-subtitle">${formatDate(schedule.date)}</p>` : ''}
      </div>
      <div style="display:flex;gap:0.5rem;align-items:center">
        <button class="btn btn-ghost btn-sm" id="edit-sched-btn">Edit</button>
        <button class="btn btn-danger btn-sm" id="delete-sched-btn">Delete</button>
      </div>
    </div>

    <div class="section-header">
      <span class="section-title">
        Blocks
        ${(blocks ?? []).length
          ? `<span style="color:var(--text2);margin-left:0.5rem">
              · ${totalDuration(blocks ?? [])} min total
            </span>`
          : ''}
      </span>
      <button class="btn btn-primary btn-sm" id="add-block-btn">+ Add Block</button>
    </div>

    <div id="blocks-list">
      ${renderBlocksList(blocks ?? [])}
    </div>

    <!-- AI panel -->
    <div class="ai-panel">
      <div class="ai-panel-header">
        <span class="ai-panel-title">✦ Apertus AI</span>
        <button class="btn btn-ghost btn-sm" id="ai-suggest-btn">Suggest Schedule Name</button>
      </div>
      <div id="ai-status" class="ai-status" style="display:none"></div>
      <div id="ai-suggestions" class="ai-suggestions"></div>
    </div>
  `

  document.getElementById('edit-sched-btn').addEventListener('click', () => {
    openEditScheduleModal(id, schedule.name, schedule.date || '', () => loadPage(id))
  })

  document.getElementById('delete-sched-btn').addEventListener('click', () => {
    confirmDeleteSchedule(id, schedule.name, production.id)
  })

  document.getElementById('add-block-btn').addEventListener('click', () => {
    const nextOrder = (blocks ?? []).length
    openBlockModal(null, id, nextOrder, () => loadPage(id))
  })

  document.getElementById('ai-suggest-btn').addEventListener('click', () => {
    runAISuggestion(id, schedule, blocks ?? [])
  })

  attachBlockListeners(id, blocks ?? [], () => loadPage(id))
}

// ── Block rendering ───────────────────────────────────────────────

function renderBlocksList(blocks) {
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
    <div class="block-card" data-id="${b.id}">
      <div class="block-top">
        <div>
          <span style="color:var(--text2);font-size:0.8rem;margin-right:0.5rem">#${i + 1}</span>
          <span class="block-name">${escHtml(b.scene_name || 'Untitled scene')}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${b.block_type ? `<span class="type-badge ${badgeClass(b.block_type)}">${escHtml(b.block_type)}</span>` : ''}
          <button class="btn btn-ghost btn-sm block-edit-btn" data-id="${b.id}">Edit</button>
          <button class="btn btn-danger btn-sm block-del-btn" data-id="${b.id}"
            data-name="${escAttr(b.scene_name || 'Untitled scene')}">Del</button>
        </div>
      </div>
      <div class="block-meta">
        ${b.actors ? `<span>👥 ${escHtml(b.actors)}</span>` : ''}
        ${b.duration_minutes ? `<span>⏱ ${b.duration_minutes} min</span>` : ''}
        ${b.order_index != null ? `<span style="color:var(--border)">order: ${b.order_index}</span>` : ''}
      </div>
      ${b.notes ? `<div class="block-notes">${escHtml(b.notes)}</div>` : ''}
    </div>
  `).join('')
}

function attachBlockListeners(scheduleId, blocks, reload) {
  document.querySelectorAll('.block-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = blocks.find(b => b.id === btn.dataset.id)
      if (block) openBlockModal(block, scheduleId, block.order_index, reload)
    })
  })

  document.querySelectorAll('.block-del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      confirmDeleteBlock(btn.dataset.id, btn.dataset.name, reload)
    })
  })
}

// ── Block modals ──────────────────────────────────────────────────

function blockFormHTML(block = null) {
  const b = block ?? {}
  return `
    <div class="form-group">
      <label class="form-label">Scene Name</label>
      <input class="form-input" id="b-scene" type="text"
        placeholder="e.g. Act I, Scene 3" value="${escAttr(b.scene_name || '')}" />
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
          ${BLOCK_TYPES.map(t =>
            `<option value="${t}" ${(b.block_type === t) ? 'selected' : ''}>${t}</option>`
          ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Duration (minutes)</label>
        <input class="form-input" id="b-duration" type="number"
          min="1" max="480" placeholder="60"
          value="${b.duration_minutes ?? ''}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Order Index</label>
      <input class="form-input" id="b-order" type="number"
        min="0" value="${b.order_index ?? 0}" />
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <textarea class="form-textarea" id="b-notes"
        placeholder="Staging notes, focus areas…">${escHtml(b.notes || '')}</textarea>
    </div>
    <p class="error-msg" id="block-error"></p>
  `
}

function openBlockModal(block, scheduleId, defaultOrder, reload) {
  const isEdit = !!block
  openModal({
    title: isEdit ? 'Edit Block' : 'Add Block',
    bodyHTML: blockFormHTML(block ? block : { order_index: defaultOrder }),
    submitLabel: isEdit ? 'Save Changes' : 'Add Block',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const payload = {
        schedule_id: scheduleId,
        scene_name: document.getElementById('b-scene').value.trim() || null,
        actors: document.getElementById('b-actors').value.trim() || null,
        block_type: document.getElementById('b-type').value || null,
        duration_minutes: parseInt(document.getElementById('b-duration').value) || null,
        order_index: parseInt(document.getElementById('b-order').value) || 0,
        notes: document.getElementById('b-notes').value.trim() || null
      }

      let error
      if (isEdit) {
        ;({ error } = await supabase.from('blocks').update(payload).eq('id', block.id))
      } else {
        ;({ error } = await supabase.from('blocks').insert(payload))
      }

      if (error) { document.getElementById('block-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
}

function confirmDeleteBlock(id, name, reload) {
  openModal({
    title: 'Delete Block',
    bodyHTML: `
      <p>Delete block <strong>${escHtml(name)}</strong>?</p>
      <p class="error-msg" id="del-error"></p>
    `,
    submitLabel: 'Delete',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('blocks').delete().eq('id', id)
      if (error) { document.getElementById('del-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Schedule modals ───────────────────────────────────────────────

function openEditScheduleModal(id, name, date, reload) {
  openModal({
    title: 'Edit Schedule',
    bodyHTML: `
      <div class="form-group">
        <label class="form-label">Schedule Name *</label>
        <input class="form-input" id="sched-name" type="text" value="${escAttr(name)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sched-date" type="date" value="${escAttr(date)}" />
      </div>
      <p class="error-msg" id="sched-error"></p>
    `,
    submitLabel: 'Save Changes',
    onSubmit: async () => {
      const newName = document.getElementById('sched-name').value.trim()
      if (!newName) { document.getElementById('sched-error').textContent = 'Name required.'; return }
      const newDate = document.getElementById('sched-date').value || null
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('schedules')
        .update({ name: newName, date: newDate })
        .eq('id', id)
      if (error) { document.getElementById('sched-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
}

function confirmDeleteSchedule(id, name, productionId) {
  openModal({
    title: 'Delete Schedule',
    bodyHTML: `
      <p>Delete <strong>${escHtml(name)}</strong>? All blocks will be removed.</p>
      <p class="error-msg" id="del-error"></p>
    `,
    submitLabel: 'Delete',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('schedules').delete().eq('id', id)
      if (error) { document.getElementById('del-error').textContent = error.message; return }
      closeModal()
      navigate('/production/' + productionId)
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── AI Suggestion ─────────────────────────────────────────────────

async function runAISuggestion(scheduleId, schedule, blocks) {
  const hfKey = localStorage.getItem('hf_api_key')
  const statusEl = document.getElementById('ai-status')
  const suggestionsEl = document.getElementById('ai-suggestions')
  const btn = document.getElementById('ai-suggest-btn')

  if (!hfKey) {
    statusEl.style.display = 'block'
    statusEl.textContent = 'No Hugging Face API key set. Visit Settings to add one.'
    return
  }

  btn.disabled = true
  statusEl.style.display = 'block'
  statusEl.textContent = 'Thinking…'
  suggestionsEl.innerHTML = ''

  const blockSummary = blocks.length
    ? blocks.map(b =>
        `- Scene: ${b.scene_name || 'Untitled'}, ` +
        `Actors: ${b.actors || 'none'}, ` +
        `Type: ${b.block_type || 'other'}, ` +
        `Duration: ${b.duration_minutes || '?'} min`
      ).join('\n')
    : '(no blocks defined yet)'

  const prompt = `[INST] You are helping a theater director name a rehearsal schedule.
Production: ${schedule.productions?.name || 'Unknown'}
Schedule date: ${schedule.date || 'not set'}

Rehearsal blocks:
${blockSummary}

Give exactly 3 short, creative schedule names — each on its own line, no numbers, no explanations, no quotes. Just the names. [/INST]`

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 120,
            temperature: 0.8,
            return_full_text: false
          }
        })
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      statusEl.textContent = `API error (${response.status}): ${errText.slice(0, 120)}`
      btn.disabled = false
      return
    }

    const result = await response.json()
    const raw = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text
    if (!raw) {
      statusEl.textContent = 'No response from model. Try again.'
      btn.disabled = false
      return
    }

    const suggestions = raw
      .split('\n')
      .map(l => l.replace(/^[\d.\-*•]+\s*/, '').trim())
      .filter(l => l.length > 2 && l.length < 80)
      .slice(0, 3)

    if (!suggestions.length) {
      statusEl.textContent = 'Could not parse suggestions. Raw: ' + raw.slice(0, 100)
      btn.disabled = false
      return
    }

    statusEl.textContent = 'Pick a suggestion to apply it as the schedule name:'
    suggestionsEl.innerHTML = suggestions.map(s =>
      `<button class="ai-suggestion-pill" data-name="${escAttr(s)}">${escHtml(s)}</button>`
    ).join('')

    suggestionsEl.querySelectorAll('.ai-suggestion-pill').forEach(pill => {
      pill.addEventListener('click', async () => {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('schedules')
          .update({ name: pill.dataset.name })
          .eq('id', scheduleId)
        if (!error) {
          statusEl.textContent = `Schedule renamed to "${pill.dataset.name}".`
          suggestionsEl.innerHTML = ''
          await loadPage(scheduleId)
        }
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
  const map = {
    'blocking': 'badge-blocking',
    'run-through': 'badge-run-through',
    'table work': 'badge-table-work',
    'tech': 'badge-tech',
    'other': 'badge-other'
  }
  return map[type] ?? 'badge-other'
}

function totalDuration(blocks) {
  return blocks.reduce((sum, b) => sum + (b.duration_minutes || 0), 0)
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function escAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;')
}
