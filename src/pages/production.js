import { navigate } from '../router.js'
import {
  getProductionById, updateProduction, deleteProduction,
  getSchedulesByProduction, createSchedule, updateSchedule, deleteSchedule
} from '../store.js'
import { navHTML, attachNavListeners } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

export function renderProduction(id) {
  const production = getProductionById(id)
  const app = document.getElementById('app')

  if (!production) {
    app.innerHTML = `
      ${navHTML()}
      <div class="page">
        <p class="error-msg">Production not found.</p>
        <a href="#/" class="btn btn-ghost" style="margin-top:1rem">← Dashboard</a>
      </div>
    `
    attachNavListeners()
    return
  }

  renderPage(id)
}

function renderPage(id) {
  const production = getProductionById(id)
  if (!production) { navigate('/'); return }

  const schedules = getSchedulesByProduction(id)
  const app = document.getElementById('app')

  app.innerHTML = `
    ${navHTML()}
    <div class="page">
      <div class="breadcrumb">
        <a href="#/">Dashboard</a> / ${esc(production.name)}
      </div>

      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${esc(production.name)}</h1>
          ${production.playwright ? `<p class="page-subtitle">by ${esc(production.playwright)}</p>` : ''}
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
        ${renderScheduleList(schedules)}
      </div>
    </div>
  `

  attachNavListeners()

  document.getElementById('edit-prod-btn').addEventListener('click', () => openEditProdModal(id, production, () => renderPage(id)))
  document.getElementById('delete-prod-btn').addEventListener('click', () => confirmDeleteProd(id, production.name))
  document.getElementById('new-sched-btn').addEventListener('click', () => openNewSchedModal(id, () => renderPage(id)))

  attachScheduleListeners(id, () => renderPage(id))
}

function renderScheduleList(schedules) {
  if (!schedules.length) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">—</div>
        <h3>No schedules yet</h3>
        <p>Add a schedule to start building rehearsal blocks</p>
      </div>
    `
  }

  return schedules.map(s => `
    <div class="card card-clickable" data-id="${s.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${esc(s.name)}</div>
          ${s.date ? `<div class="card-subtitle">${formatDate(s.date)}</div>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm sched-edit"
            data-id="${s.id}" data-name="${escAttr(s.name)}" data-date="${escAttr(s.date || '')}">Edit</button>
          <button class="btn btn-danger btn-sm sched-del"
            data-id="${s.id}" data-name="${escAttr(s.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join('')
}

function attachScheduleListeners(productionId, reload) {
  document.querySelectorAll('.card-clickable').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn')) return
      navigate('/schedule/' + card.dataset.id)
    })
  })

  document.querySelectorAll('.sched-edit').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      openEditSchedModal(btn.dataset.id, btn.dataset.name, btn.dataset.date, reload)
    })
  })

  document.querySelectorAll('.sched-del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      confirmDeleteSched(btn.dataset.id, btn.dataset.name, reload)
    })
  })
}

// ── Production modals ──────────────────────────────────────────────

function openEditProdModal(id, production, reload) {
  openModal({
    title: 'Edit Production',
    bodyHTML: `
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input class="form-input" id="prod-name" type="text"
          value="${escAttr(production.name)}" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Playwright</label>
        <input class="form-input" id="prod-playwright" type="text"
          value="${escAttr(production.playwright || '')}" />
      </div>
      <p class="error-msg" id="prod-error"></p>
    `,
    submitLabel: 'Save',
    onSubmit: () => {
      const name = document.getElementById('prod-name').value.trim()
      if (!name) { document.getElementById('prod-error').textContent = 'Name required.'; return }
      updateProduction(id, { name, playwright: document.getElementById('prod-playwright').value.trim() })
      closeModal()
      reload()
    }
  })
}

function confirmDeleteProd(id, name) {
  openModal({
    title: 'Delete Production',
    bodyHTML: `<p>Delete <strong>${esc(name)}</strong>? All schedules and blocks will be removed.</p>`,
    submitLabel: 'Delete',
    onSubmit: () => {
      deleteProduction(id)
      closeModal()
      navigate('/')
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Schedule modals ────────────────────────────────────────────────

function schedFormHTML(name = '', date = '') {
  return `
    <div class="form-group">
      <label class="form-label">Schedule Name *</label>
      <input class="form-input" id="sched-name" type="text"
        placeholder="e.g. Act I Run-Through" value="${escAttr(name)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="sched-date" type="date" value="${escAttr(date)}" />
    </div>
    <p class="error-msg" id="sched-error"></p>
  `
}

function openNewSchedModal(productionId, reload) {
  openModal({
    title: 'New Schedule',
    bodyHTML: schedFormHTML(),
    submitLabel: 'Create',
    onSubmit: () => {
      const name = document.getElementById('sched-name').value.trim()
      if (!name) { document.getElementById('sched-error').textContent = 'Name required.'; return }
      createSchedule({ name, date: document.getElementById('sched-date').value || null, production_id: productionId })
      closeModal()
      reload()
    }
  })
}

function openEditSchedModal(id, name, date, reload) {
  openModal({
    title: 'Edit Schedule',
    bodyHTML: schedFormHTML(name, date),
    submitLabel: 'Save',
    onSubmit: () => {
      const newName = document.getElementById('sched-name').value.trim()
      if (!newName) { document.getElementById('sched-error').textContent = 'Name required.'; return }
      updateSchedule(id, { name: newName, date: document.getElementById('sched-date').value || null })
      closeModal()
      reload()
    }
  })
}

function confirmDeleteSched(id, name, reload) {
  openModal({
    title: 'Delete Schedule',
    bodyHTML: `<p>Delete <strong>${esc(name)}</strong>? All blocks will be removed.</p>`,
    submitLabel: 'Delete',
    onSubmit: () => {
      deleteSchedule(id)
      closeModal()
      reload()
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

// ── Helpers ────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function escAttr(str) { return String(str ?? '').replace(/"/g, '&quot;') }
