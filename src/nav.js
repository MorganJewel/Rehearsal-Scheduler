export function navHTML(active = '') {
  return `
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${active === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <button class="btn btn-ghost btn-sm" id="hf-key-btn" title="Set Hugging Face API key">
          ✦ AI Key
        </button>
      </div>
    </nav>
  `
}

export function attachNavListeners() {
  document.getElementById('hf-key-btn')?.addEventListener('click', () => {
    promptHFKey()
  })
}

function promptHFKey() {
  const existing = localStorage.getItem('hf_api_key') || ''
  const key = window.prompt(
    'Enter your Hugging Face API key (hf_…)\nLeave blank to clear.',
    existing
  )
  if (key === null) return // cancelled
  if (key.trim()) {
    localStorage.setItem('hf_api_key', key.trim())
  } else {
    localStorage.removeItem('hf_api_key')
  }
}
