import { startTour } from './tour.js'
import { rerender } from './router.js'

export function isUnionMode() {
  return localStorage.getItem('union_mode') === 'on'
}

export function navHTML(active = '') {
  const union = isUnionMode()
  return `
    <nav class="nav">
      <a href="#/" class="nav-brand">Rehearsal Scheduler</a>
      <div class="nav-links">
        <a href="#/" class="${active === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <button class="btn btn-sm ${union ? 'btn-union-on' : 'btn-ghost'}" id="union-toggle-btn">
          Union ${union ? 'ON' : 'OFF'}
        </button>
        <button class="btn btn-ghost btn-sm" id="tour-btn">Take Tour</button>
          ⚖ Union ${union ? 'ON' : 'OFF'}
        </button>
        <button class="btn btn-ghost btn-sm" id="tour-btn">✦ Take Tour</button>
      </div>
    </nav>
  `
}

export function attachNavListeners() {
  document.getElementById('tour-btn')?.addEventListener('click', startTour)

  document.getElementById('union-toggle-btn')?.addEventListener('click', () => {
    const next = !isUnionMode()
    localStorage.setItem('union_mode', next ? 'on' : 'off')
    rerender()
  })
}
