import { initRouter, route, onNotFound, navigate } from './router.js'
import { renderDashboard } from './pages/dashboard.js'
import { renderProduction } from './pages/production.js'
import { renderSchedule } from './pages/schedule.js'
import { startTour } from './tour.js'

route('/', () => renderDashboard())
route('/production/:id', ({ id }) => renderProduction(id))
route('/schedule/:id', ({ id }) => renderSchedule(id))

onNotFound(() => navigate('/'))

initRouter()

// Auto-start tour for first-time visitors
if (!sessionStorage.getItem('tour_seen')) {
  setTimeout(startTour, 400)
}
