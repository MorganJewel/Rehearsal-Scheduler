import { navigate } from './router.js'
import { getSupabaseClient } from './supabase.js'

export function navHTML(active = '') {
  return `
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${active === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <a href="#/settings" class="${active === 'settings' ? 'active' : ''}">Settings</a>
        <button class="btn btn-ghost btn-sm" id="logout-btn">Logout</button>
      </div>
    </nav>
  `
}

export function attachLogout() {
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    const supabase = getSupabaseClient()
    if (supabase) await supabase.auth.signOut()
    navigate('/login')
  })
}
