import { navigate } from '../router.js'
import { getSupabaseClient } from '../supabase.js'
import { navHTML, attachLogout } from '../nav.js'
import { openModal, closeModal } from '../modal.js'

export async function renderDashboard() {
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
      <div id="productions-list"><div class="loading">Loading…</div></div>
    </div>
  `

  attachLogout()

  document.getElementById('new-production-btn').addEventListener('click', () => {
    openNewProductionModal()
  })

  await loadProductions()
}

async function loadProductions() {
  const supabase = getSupabaseClient()
  const list = document.getElementById('productions-list')
  if (!list) return

  const { data, error } = await supabase
    .from('productions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    list.innerHTML = `<p class="error-msg">Failed to load productions: ${error.message}</p>`
    return
  }

  if (!data.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <h3>No productions yet</h3>
        <p>Create your first production to get started</p>
      </div>
    `
    return
  }

  list.innerHTML = data.map(p => `
    <div class="card card-clickable" data-id="${p.id}">
      <div class="card-header">
        <div>
          <div class="card-title">${escHtml(p.name)}</div>
          ${p.playwright ? `<div class="card-subtitle">by ${escHtml(p.playwright)}</div>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm edit-btn" data-id="${p.id}"
            data-name="${escAttr(p.name)}" data-playwright="${escAttr(p.playwright || '')}">
            Edit
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${p.id}"
            data-name="${escAttr(p.name)}">
            Delete
          </button>
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
      openEditProductionModal(btn.dataset.id, btn.dataset.name, btn.dataset.playwright)
    })
  })

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      confirmDeleteProduction(btn.dataset.id, btn.dataset.name)
    })
  })
}

function productionFormHTML(name = '', playwright = '') {
  return `
    <div class="form-group">
      <label class="form-label" for="prod-name">Production Name *</label>
      <input class="form-input" id="prod-name" type="text"
        placeholder="e.g. Hamlet" value="${escAttr(name)}" required />
    </div>
    <div class="form-group">
      <label class="form-label" for="prod-playwright">Playwright</label>
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
    submitLabel: 'Create Production',
    onSubmit: async () => {
      const name = document.getElementById('prod-name').value.trim()
      if (!name) { document.getElementById('prod-error').textContent = 'Name is required.'; return }

      const playwright = document.getElementById('prod-playwright').value.trim()
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()

      const { error } = await supabase
        .from('productions')
        .insert({ name, playwright: playwright || null, user_id: session.user.id })

      if (error) { document.getElementById('prod-error').textContent = error.message; return }
      closeModal()
      await loadProductions()
    }
  })
}

function openEditProductionModal(id, name, playwright) {
  openModal({
    title: 'Edit Production',
    bodyHTML: productionFormHTML(name, playwright),
    submitLabel: 'Save Changes',
    onSubmit: async () => {
      const newName = document.getElementById('prod-name').value.trim()
      if (!newName) { document.getElementById('prod-error').textContent = 'Name is required.'; return }

      const newPlaywright = document.getElementById('prod-playwright').value.trim()
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('productions')
        .update({ name: newName, playwright: newPlaywright || null })
        .eq('id', id)

      if (error) { document.getElementById('prod-error').textContent = error.message; return }
      closeModal()
      await loadProductions()
    }
  })
}

function confirmDeleteProduction(id, name) {
  openModal({
    title: 'Delete Production',
    bodyHTML: `
      <p>Are you sure you want to delete <strong>${escHtml(name)}</strong>?</p>
      <p style="color:var(--text2);font-size:0.85rem;margin-top:0.5rem">
        All schedules and blocks in this production will also be deleted.
      </p>
      <p class="error-msg" id="del-error"></p>
    `,
    submitLabel: 'Delete',
    onSubmit: async () => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('productions').delete().eq('id', id)
      if (error) { document.getElementById('del-error').textContent = error.message; return }
      closeModal()
      await loadProductions()
    }
  })

  document.getElementById('modal-submit-btn')?.classList.replace('btn-primary', 'btn-danger')
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function escAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;')
}
