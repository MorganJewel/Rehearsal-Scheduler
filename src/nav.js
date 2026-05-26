import { startTour } from './tour.js'

export function navHTML(active = '') {
  return `
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${active === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <button class="btn btn-ghost btn-sm" id="tour-btn">✦ Take Tour</button>
      </div>
    </nav>
  `
}

export function attachNavListeners() {
  document.getElementById('tour-btn')?.addEventListener('click', startTour)
}
