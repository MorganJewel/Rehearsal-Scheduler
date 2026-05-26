import { navigate } from './router.js'

const STEPS = [
  {
    title: 'Welcome to Rehearsal Scheduler',
    text: "This quick tour walks you through every feature — takes about 2 minutes. Hit Next to begin, or Skip to jump straight in.",
    target: null,
    page: null
  },
  {
    title: 'Your Dashboard',
    text: "The Dashboard lists all your productions — plays, musicals, readings, anything you're directing. We've pre-loaded a demo production so you can explore right away.",
    target: '#productions-list',
    page: '/'
  },
  {
    title: 'Create a Production',
    text: 'Click "+ New Production" to start a show. Give it a title and an optional playwright credit. Productions are the top level of everything.',
    target: '#new-production-btn',
    page: '/'
  },
  {
    title: 'Production Page',
    text: "Clicking a production card opens its detail page. The title and playwright sit at the top, and all rehearsal schedules for that show are listed below.",
    target: '.page-title',
    page: '/production/demo-prod-1'
  },
  {
    title: 'Schedules',
    text: 'A schedule is one rehearsal session — usually one per day. Click a schedule card to open it, or use "+ New Schedule" to add one. Each schedule belongs to exactly one production.',
    target: '#schedules-list',
    page: '/production/demo-prod-1'
  },
  {
    title: 'Schedule View',
    text: "Opening a schedule shows all its blocks in order. The total duration in minutes is summed up automatically next to the Blocks heading.",
    target: '#blocks-list',
    page: '/schedule/demo-sched-1'
  },
  {
    title: 'Rehearsal Blocks',
    text: 'Each card is one block: a scene, a run-through, table work, a tech call — whatever you need. Blocks show scene name, actors, type badge, duration, and your staging notes.',
    target: '.block-card',
    page: '/schedule/demo-sched-1'
  },
  {
    title: 'Adding & Editing Blocks',
    text: 'Click "+ Add Block" to create a new one. Hit Edit on any block to change it. Each block has: scene name, actors, block type, duration in minutes, order index, and notes.',
    target: '#add-block-btn',
    page: '/schedule/demo-sched-1'
  },
  {
    title: 'Block Types',
    text: 'Five types, each colour-coded: Blocking (blue), Run-through (green), Table Work (gold), Tech (purple), Other (grey). Use them to visually scan a schedule at a glance.',
    target: '.type-badge',
    page: '/schedule/demo-sched-1'
  },
  {
    title: 'AI Schedule Names',
    text: 'The Apertus AI panel reads your blocks and suggests 3 creative schedule names tailored to your scenes and actors. Click any suggestion to instantly rename the schedule.',
    target: '.ai-panel',
    page: '/schedule/demo-sched-1'
  },
  {
    title: "You're All Set!",
    text: "That covers everything. Go create your own productions, build schedules, fill in blocks, and try the AI tool. Everything resets on refresh — so experiment freely.",
    target: null,
    page: null
  }
]

let _step = -1

export function startTour() {
  _step = 0
  _show()
}

export function isTourActive() {
  return _step >= 0
}

async function _show() {
  _cleanup()

  if (_step < 0 || _step >= STEPS.length) { _end(); return }

  const s = STEPS[_step]

  // Navigate if needed
  if (s.page) {
    const cur = window.location.hash.slice(1) || '/'
    if (cur !== s.page) {
      navigate(s.page)
      await _sleep(220)
    }
  }

  const target = s.target ? document.querySelector(s.target) : null

  if (target) {
    target.scrollIntoView({ behavior: 'instant', block: 'center' })
    await _sleep(60)
    _renderSpotlight(target)
    _renderTooltipAnchored(s, target)
  } else {
    _renderCenteredOverlay(s)
  }
}

// ── Spotlight overlay ─────────────────────────────────────────────

function _renderSpotlight(el) {
  const pad = 10
  const r = el.getBoundingClientRect()
  const x = r.left - pad
  const y = r.top - pad
  const w = r.width + pad * 2
  const h = r.height + pad * 2

  const div = document.createElement('div')
  div.id = 'tour-overlay'
  div.style.cssText = 'position:fixed;inset:0;z-index:9000;pointer-events:none'
  div.innerHTML = `
    <svg width="100%" height="100%" style="display:block">
      <defs>
        <mask id="tour-mask">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="black"/>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)"/>
    </svg>
  `
  document.body.appendChild(div)
}

function _renderCenteredOverlay(s) {
  const div = document.createElement('div')
  div.id = 'tour-overlay'
  div.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);pointer-events:none'
  document.body.appendChild(div)

  const wrap = document.createElement('div')
  wrap.id = 'tour-tooltip-wrap'
  wrap.style.cssText = 'position:fixed;z-index:9001;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:all'
  wrap.innerHTML = _tooltipHTML(s)
  document.body.appendChild(wrap)
  _wire()
}

// ── Anchored tooltip ──────────────────────────────────────────────

function _renderTooltipAnchored(s, el) {
  const wrap = document.createElement('div')
  wrap.id = 'tour-tooltip-wrap'
  wrap.style.cssText = 'position:fixed;z-index:9001;pointer-events:all'
  wrap.innerHTML = _tooltipHTML(s)
  document.body.appendChild(wrap)

  // Position: prefer below the element, fallback above
  const er = el.getBoundingClientRect()
  const tw = 330
  const th = wrap.offsetHeight || 210
  const vw = window.innerWidth
  const vh = window.innerHeight

  let top = er.bottom + 16
  if (top + th > vh - 16) top = er.top - th - 16
  if (top < 16) top = 16

  let left = er.left
  if (left + tw > vw - 16) left = vw - tw - 16
  if (left < 16) left = 16

  wrap.style.top = top + 'px'
  wrap.style.left = left + 'px'
  _wire()
}

// ── Tooltip HTML ──────────────────────────────────────────────────

function _tooltipHTML(s) {
  const isLast = _step === STEPS.length - 1
  const pct = Math.round((_step / (STEPS.length - 1)) * 100)

  return `
    <div class="tour-tooltip">
      <div class="tour-tt-header">
        <span class="tour-step-label">${_step + 1} / ${STEPS.length}</span>
        <button id="tour-skip" class="tour-skip-btn">Skip tour</button>
      </div>
      <div class="tour-progress-track"><div class="tour-progress-fill" style="width:${pct}%"></div></div>
      <h3 class="tour-title">${s.title}</h3>
      <p class="tour-text">${s.text}</p>
      <div class="tour-footer">
        ${_step > 0
          ? `<button class="btn btn-ghost btn-sm" id="tour-prev">← Back</button>`
          : `<span></span>`}
        <button class="btn btn-primary btn-sm" id="tour-next">
          ${isLast ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  `
}

function _wire() {
  document.getElementById('tour-prev')?.addEventListener('click', () => { _step--; _show() })
  document.getElementById('tour-next')?.addEventListener('click', () => {
    if (_step === STEPS.length - 1) _end()
    else { _step++; _show() }
  })
  document.getElementById('tour-skip')?.addEventListener('click', _end)
}

// ── Helpers ───────────────────────────────────────────────────────

function _cleanup() {
  document.getElementById('tour-overlay')?.remove()
  document.getElementById('tour-tooltip-wrap')?.remove()
}

function _end() {
  _cleanup()
  _step = -1
  sessionStorage.setItem('tour_seen', '1')
  // Return to dashboard
  if ((window.location.hash.slice(1) || '/') !== '/') navigate('/')
}

function _sleep(ms) { return new Promise(r => setTimeout(r, ms)) }
