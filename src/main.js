import { initRouter, route, onNotFound, navigate } from './router.js'
import { renderDashboard } from './pages/dashboard.js'
import { renderProduction } from './pages/production.js'
import { renderSchedule } from './pages/schedule.js'

route('/', () => renderDashboard())
route('/production/:id', ({ id }) => renderProduction(id))
route('/schedule/:id', ({ id }) => renderSchedule(id))

onNotFound(() => navigate('/'))

initRouter()
