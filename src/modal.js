export function openModal({ title, bodyHTML, onSubmit, submitLabel = 'Save', showFooter = true }) {
  closeModal()

  const overlay = document.createElement('div')
  overlay.id = 'modal-overlay'
  overlay.className = 'modal-overlay'
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${bodyHTML}
      </div>
      ${showFooter ? `
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-btn">${submitLabel}</button>
      </div>` : ''}
    </div>
  `

  document.body.appendChild(overlay)

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal() })
  document.getElementById('modal-close-btn').addEventListener('click', closeModal)
  document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal)

  if (onSubmit) {
    document.getElementById('modal-submit-btn')?.addEventListener('click', async () => {
      const btn = document.getElementById('modal-submit-btn')
      btn.disabled = true
      btn.textContent = 'Saving…'
      try {
        await onSubmit()
      } finally {
        if (btn) {
          btn.disabled = false
          btn.textContent = submitLabel
        }
      }
    })
  }
}

export function closeModal() {
  document.getElementById('modal-overlay')?.remove()
}

export function showError(containerId, msg) {
  const el = document.getElementById(containerId)
  if (el) el.textContent = msg
}
