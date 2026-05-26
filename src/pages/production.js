import { navigate } from '../router.js'
import { getSupabaseClient } from '../supabase.js'
import { navHTML, attachLogout } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

export async function renderProduction(id) {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${navHTML()}
    <div class="page" id="prod-page">
      <div class="loading">Loading…</div>
    </div>
  `

  attachLogout()
  await loadPage(id)
}

async function loadPage(id) {
  const supabase = getSupabaseClient()
  const page = document.getElementById('prod-page')
  if (!page) return

  const [{ data: production, error: pe }, { data: schedules, error: se }] = await Promise.all([
    supabase.from('productions').select('*').eq('id', id).single(),
    supabase.from('schedules').select('*').eq('production_id', id).order('created_at', { ascending: true })
  ])

  if (pe || !production) {
    page.innerHTML = `
      <p class="error-msg">Production not found or access denied.</p>
      <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Back to Dashboard</a>
    `
    return
  }

  page.innerHTML = `
    <div class="breadcrumb">
      <a href="#/">Dashboard</a> / ${escHtml(production.name)}
    </div>

    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">${escHtml(production.name)}</h1>
        ${production.playwright ? `<p class="page-subtitle">by ${escHtml(production.playwright)}</p>` : ''}
      </div>
      <div style="display:flex;gap:0.5rem">
        <button class="btn btn-ghost btn-sm" id="edit-prod-btn">Edit</button>
        <button class="btn btn-danger btn-sm" id="delete-prod-btn">Delete</button>
      </div>
    </div>

    <div class="section-header">
      <span class="section-title">Schedules</span>
      <button class="btn btn-primary btn-sm" id="new-schedule-btn">+ New Schedule</button>
    </div>
    <div id="schedules-list">
      ${renderSchedulesList(schedules ?? [])}
    </div>
  `

  document.getElementById('edit-prod-btn').addEventListener('click', () => {
    openEditProductionModal(id, production.name, production.playwright || '', () => loadPage(id))
  })

  document.getElementById('delete-prod-btn').addEventListener('click', () => {
    confirmDeleteProduction(id, production.name)
  })

  document.getElementById('new-schedule-btn').addEventListener('click', () => {
    openNewScheduleModal(id, () => loadPage(id))
  })

  attachScheduleListeners(id, schedules ?? [], () => loadPage(id))
}

function renderSchedulesList(schedules) {
  if (!schedules.length) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `
  }

  return schedules.map(s => `
    <div class="card card-clickable" data-id="${s.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${escHtml(s.name)}</div>
          ${s.date ? `<div class="card-subtitle">${formatDate(s.date)}</div>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit-btn"
            data-id="${s.id}"
            data-name="${escAttr(s.name)}"
            data-date="${escAttr(s.date || '')}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del-btn"
            data-id="${s.id}"
            data-name="${escAttr(s.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join('')
}

function attachScheduleListeners(productionId, schedules, reload) {
  const list = document.getElementById('schedules-list')
  if (!list) return

  list.querySelectorAll('.card-clickable').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn')) return
      navigate('/schedule/' + card.dataset.id)
    })
  })

  list.querySelectorAll('.sched-edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      openEditScheduleModal(btn.dataset.id, btn.dataset.name, btn.dataset.date, reload)
    })
  })

  list.querySelectorAll('.sched-del-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      confirmDeleteSchedule(btn.dataset.id, btn.dataset.name, reload)
    })
  })
}

// ── Production modals ─────────────────────────────────────────────

function openEditProductionModal(id, name, playwright, reload) {
  openModal({
    title: 'Edit Production',
    bodyHTML: `
      <div class="form-group">
        <label class="form-label">Production Name *</label>
        <input class="form-input" id="prod-name" type="text" value="${escAttr(name)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text" value="${escAttr(playwright)}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,
    submitLabel: 'Save Changes',
    onSubmit: async () => {
      const newName = document.getElementById('prod-name').value.trim()
      if (!newName) { document.getElementById('prod-error').textContent = 'Name is required.'; return }
      const newPw = document.getElementById('prod-playwright').value.trim()
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('productions')
        .update({ name: newName, playwright: newPw || null })
        .eq('id', id)
      if (error) { document.getElementById('prod-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
}

function confirmDeleteProduction(id, name) {
  openModal({
    title: 'Delete Production',
    bodyHTML: `
      <p>Delete <strong>${escHtml(name)}</strong>? All schedules and blocks will be removed.</p>
      <p class="error-msg" id="del-error"></p>
    `,
    submitLabel: 'Delete',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('productions').delete().eq('id', id)
      if (error) { document.getElementById('del-error').textContent = error.message; return }
      closeModal()
      navigate('/')
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Schedule modals ───────────────────────────────────────────────

function scheduleFormHTML(name = '', date = '') {
  return `
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${escAttr(name)}" />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${escAttr(date)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `
}

function openNewScheduleModal(productionId, reload) {
  openModal({
    title: 'New Schedule',
    bodyHTML: scheduleFormHTML(),
    submitLabel: 'Create Schedule',
    onSubmit: async () => {
      const name = document.getElementById('sched-name').value.trim()
      if (!name) { document.getElementById('sched-error').textContent = 'Name is required.'; return }
      const date = document.getElementById('sched-date').value || null
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from('schedules')
        .insert({ name, date, production_id: productionId })
      if (error) { document.getElementById('sched-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
}

function openEditScheduleModal(id, name, date, reload) {
  openModal({
    title: 'Edit Schedule',
    bodyHTML: scheduleFormHTML(name, date),
    submitLabel: 'Save Changes',
    onSubmit: async () => {
      const newName = document.getElementById('sched-name').value.trim()
      if (!newName) { document.getElementById('sched-error').textContent = 'Name is required.'; return }
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

function confirmDeleteSchedule(id, name, reload) {
  openModal({
    title: 'Delete Schedule',
    bodyHTML: `
      <p>Delete <strong>${escHtml(name)}</strong>? All blocks in this schedule will be removed.</p>
      <p class="error-msg" id="del-error"></p>
    `,
    submitLabel: 'Delete',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('schedules').delete().eq('id', id)
      if (error) { document.getElementById('del-error').textContent = error.message; return }
      closeModal()
      await reload()
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Helpers ───────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function escAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;')
}
