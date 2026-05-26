import { initRouter, route, onNotFound, navigate } from './router.js'
import { getSupabaseClient } from './supabase.js'
import { renderLogin } from './pages/login.js'
import { renderDashboard } from './pages/dashboard.js'
import { renderProduction } from './pages/production.js'
import { renderSchedule } from './pages/schedule.js'
import { renderSettings } from './pages/settings.js'

async function requireAuth(fn) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    navigate('/settings')
    return
  }
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    navigate('/login')
    return
  }
  fn(session)
}

route('/', () => requireAuth(() => renderDashboard()))
route('/login', () => renderLogin())
route('/settings', () => renderSettings())
route('/production/:id', ({ id }) => requireAuth(() => renderProduction(id)))
route('/schedule/:id', ({ id }) => requireAuth(() => renderSchedule(id)))

onNotFound(() => navigate('/'))

initRouter()
