// All data lives here. Refreshing the page resets everything.

function uuid() {
  return crypto.randomUUID()
}

let productions = [
  {
    id: 'demo-prod-1',
    name: 'Hamlet',
    playwright: 'William Shakespeare',
    created_at: new Date().toISOString()
  }
]

let schedules = [
  {
    id: 'demo-sched-1',
    production_id: 'demo-prod-1',
    name: 'Act I Run-Through',
    date: '2026-06-15',
    created_at: new Date().toISOString()
  }
]

let blocks = [
  {
    id: 'demo-block-1',
    schedule_id: 'demo-sched-1',
    scene_name: 'Act I, Scene 1: The Battlements',
    actors: 'Hamlet, Horatio, Marcellus, Ghost',
    block_type: 'blocking',
    duration_minutes: 40,
    notes: 'Work Ghost entrance from SR. Hamlet crosses to DSL on "I\'ll follow it."',
    order_index: 0
  },
  {
    id: 'demo-block-2',
    schedule_id: 'demo-sched-1',
    scene_name: 'Act I, Scene 2: The Court',
    actors: 'Hamlet, Claudius, Gertrude, Polonius',
    block_type: 'table work',
    duration_minutes: 30,
    notes: 'Discuss Hamlet\'s internal conflict. Emphasis on the "too too solid flesh" speech.',
    order_index: 1
  },
  {
    id: 'demo-block-3',
    schedule_id: 'demo-sched-1',
    scene_name: 'Act I, Scene 3: Polonius\'s House',
    actors: 'Laertes, Ophelia, Polonius',
    block_type: 'run-through',
    duration_minutes: 25,
    notes: 'Focus on Ophelia\'s reaction to advice. Speed run first, then notes.',
    order_index: 2
  }
]

// ── Productions ────────────────────────────────────────────────────

export function getProductions() {
  return [...productions].sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export function getProductionById(id) {
  return productions.find(p => p.id === id) ?? null
}

export function createProduction({ name, playwright }) {
  const p = { id: uuid(), name, playwright: playwright || null, created_at: new Date().toISOString() }
  productions.push(p)
  return p
}

export function updateProduction(id, { name, playwright }) {
  const p = productions.find(p => p.id === id)
  if (!p) return null
  p.name = name
  p.playwright = playwright || null
  return p
}

export function deleteProduction(id) {
  // cascade: delete schedules (which cascade to blocks)
  const scheduleIds = schedules.filter(s => s.production_id === id).map(s => s.id)
  scheduleIds.forEach(sid => deleteSchedule(sid))
  productions = productions.filter(p => p.id !== id)
}

// ── Schedules ──────────────────────────────────────────────────────

export function getSchedulesByProduction(productionId) {
  return schedules
    .filter(s => s.production_id === productionId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
}

export function getScheduleById(id) {
  return schedules.find(s => s.id === id) ?? null
}

export function createSchedule({ name, date, production_id }) {
  const s = { id: uuid(), name, date: date || null, production_id, created_at: new Date().toISOString() }
  schedules.push(s)
  return s
}

export function updateSchedule(id, { name, date }) {
  const s = schedules.find(s => s.id === id)
  if (!s) return null
  s.name = name
  s.date = date || null
  return s
}

export function deleteSchedule(id) {
  blocks = blocks.filter(b => b.schedule_id !== id)
  schedules = schedules.filter(s => s.id !== id)
}

// ── Blocks ─────────────────────────────────────────────────────────

export function getBlocksBySchedule(scheduleId) {
  return blocks
    .filter(b => b.schedule_id === scheduleId)
    .sort((a, b) => a.order_index - b.order_index)
}

export function createBlock({ schedule_id, scene_name, actors, block_type, duration_minutes, notes, order_index }) {
  const b = {
    id: uuid(),
    schedule_id,
    scene_name: scene_name || null,
    actors: actors || null,
    block_type: block_type || null,
    duration_minutes: duration_minutes || null,
    notes: notes || null,
    order_index: order_index ?? 0
  }
  blocks.push(b)
  return b
}

export function updateBlock(id, data) {
  const b = blocks.find(b => b.id === id)
  if (!b) return null
  Object.assign(b, {
    scene_name: data.scene_name || null,
    actors: data.actors || null,
    block_type: data.block_type || null,
    duration_minutes: data.duration_minutes || null,
    notes: data.notes || null,
    order_index: data.order_index ?? b.order_index
  })
  return b
}

export function deleteBlock(id) {
  blocks = blocks.filter(b => b.id !== id)
}
