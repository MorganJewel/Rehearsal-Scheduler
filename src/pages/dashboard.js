import { navigate } from '../router.js'
import { getProductions, createProduction, updateProduction, deleteProduction } from '../store.js'
import { navHTML, attachNavListeners } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

export function renderDashboard() {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${navHTML('dashboard')}
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
  `

  attachNavListeners()
  document.getElementById('new-production-btn').addEventListener('click', openNewProductionModal)
  renderList()
}

function renderList() {
  const list = document.getElementById('productions-list')
  if (!list) return

  const productions = getProductions()

  if (!productions.length) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `
    return
  }

  list.innerHTML = productions.map(p => `
    <div class="card card-clickable" data-id="${p.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${esc(p.name)}</div>
          ${p.playwright ? `<div class="card-subtitle">by ${esc(p.playwright)}</div>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn"
            data-id="${p.id}" data-name="${escAttr(p.name)}"
            data-playwright="${escAttr(p.playwright || '')}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn"
            data-id="${p.id}" data-name="${escAttr(p.name)}">Delete</button>
        </div>
      </div>
    </div>
  `).join('')

  list.querySelectorAll('.card-clickable').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn')) return
      navigate('/production/' + card.dataset.id)
    })
  })

  list.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      openEditModal(btn.dataset.id, btn.dataset.name, btn.dataset.playwright)
    })
  })

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      confirmDelete(btn.dataset.id, btn.dataset.name)
    })
  })
}

function productionFormHTML(name = '', playwright = '') {
  return `
    <div class="form-group">
      <label class="form-label">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${escAttr(name)}" autofocus />
    </div>
    <div class="form-group">
      <label class="form-label">Playwright</label>
      <input class="form-input" id="prod-playwright" type="text"
        placeholder="e.g. William Shakespeare" value="${escAttr(playwright)}" />
    </div>
    <p class="error-msg" id="prod-error"></p>
  `
}

function openNewProductionModal() {
  openModal({
    title: 'New Production',
    bodyHTML: productionFormHTML(),
    submitLabel: 'Create',
    onSubmit: () => {
      const name = document.getElementById('prod-name').value.trim()
      if (!name) { document.getElementById('prod-error').textContent = 'Name is required.'; return }
      createProduction({ name, playwright: document.getElementById('prod-playwright').value.trim() })
      closeModal()
      renderList()
    }
  })
}

function openEditModal(id, name, playwright) {
  openModal({
    title: 'Edit Production',
    bodyHTML: productionFormHTML(name, playwright),
    submitLabel: 'Save',
    onSubmit: () => {
      const newName = document.getElementById('prod-name').value.trim()
      if (!newName) { document.getElementById('prod-error').textContent = 'Name is required.'; return }
      updateProduction(id, { name: newName, playwright: document.getElementById('prod-playwright').value.trim() })
      closeModal()
      renderList()
    }
  })
}

function confirmDelete(id, name) {
  openModal({
    title: 'Delete Production',
    bodyHTML: `
      <p>Delete <strong>${esc(name)}</strong>? All schedules and blocks will be removed.</p>
    `,
    submitLabel: 'Delete',
    onSubmit: () => {
      deleteProduction(id)
      closeModal()
      renderList()
    }
  })
  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function escAttr(str) { return String(str ?? '').replace(/"/g, '&quot;') }
