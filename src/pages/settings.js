import { navHTML, attachLogout } from '../nav.js'
import { resetSupabaseClient, getSupabaseClient } from '../supabase.js'

const SCHEMA_SQL = `-- Run this in your Supabase SQL editor

create table productions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  playwright text,
  created_at timestamptz default now()
);

create table schedules (
  id uuid primary key default gen_random_uuid(),
  production_id uuid references productions(id) on delete cascade not null,
  name text not null,
  date date,
  created_at timestamptz default now()
);

create table blocks (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid references schedules(id) on delete cascade not null,
  scene_name text,
  actors text,
  block_type text check (block_type in ('blocking','run-through','table work','tech','other')),
  duration_minutes integer,
  notes text,
  order_index integer default 0
);

-- Row Level Security
alter table productions enable row level security;
alter table schedules enable row level security;
alter table blocks enable row level security;

create policy "productions_own" on productions
  for all using (user_id = auth.uid());

create policy "schedules_own" on schedules
  for all using (
    production_id in (select id from productions where user_id = auth.uid())
  );

create policy "blocks_own" on blocks
  for all using (
    schedule_id in (
      select s.id from schedules s
      join productions p on p.id = s.production_id
      where p.user_id = auth.uid()
    )
  );`

export function renderSettings() {
  const supabase = getSupabaseClient()
  const isAuthed = !!supabase

  const app = document.getElementById('app')
  app.innerHTML = `
    ${navHTML('settings')}
    <div class="page">
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle">Configure your credentials — stored locally in your browser</p>
        </div>
      </div>

      <div class="settings-section">
        <h2>Supabase Credentials</h2>
        <div class="form-group">
          <label class="form-label" for="sb-url">Project URL</label>
          <input class="form-input" id="sb-url" type="url"
            placeholder="https://xxxx.supabase.co"
            value="${localStorage.getItem('supabase_url') || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label" for="sb-key">Anon / Public Key</label>
          <input class="form-input" id="sb-key" type="text"
            placeholder="eyJhbGci…"
            value="${localStorage.getItem('supabase_anon_key') || ''}" />
        </div>
        <button class="btn btn-primary" id="save-sb">Save Supabase</button>
        <p class="success-msg" id="sb-msg" style="display:none">Saved!</p>
      </div>

      <div class="settings-section">
        <h2>Hugging Face API Key</h2>
        <div class="form-group">
          <label class="form-label" for="hf-key">API Key</label>
          <input class="form-input" id="hf-key" type="text"
            placeholder="hf_…"
            value="${localStorage.getItem('hf_api_key') || ''}" />
        </div>
        <button class="btn btn-primary" id="save-hf">Save HF Key</button>
        <p class="success-msg" id="hf-msg" style="display:none">Saved!</p>
      </div>

      <div class="settings-section">
        <h2>Database Setup</h2>
        <p style="color:var(--text2);font-size:0.9rem;margin-bottom:1rem">
          Run the following SQL in your Supabase project's
          <strong style="color:var(--text)">SQL Editor</strong>
          to create the required tables and security policies.
        </p>
        <div class="code-block">${SCHEMA_SQL}</div>
        <button class="btn btn-ghost btn-sm" id="copy-sql" style="margin-top:0.75rem">
          Copy SQL
        </button>
        <p class="success-msg" id="copy-msg" style="display:none">Copied to clipboard!</p>
      </div>
    </div>
  `

  attachLogout()

  function flashMsg(id) {
    const el = document.getElementById(id)
    el.style.display = 'block'
    setTimeout(() => { el.style.display = 'none' }, 2500)
  }

  document.getElementById('save-sb').addEventListener('click', () => {
    const url = document.getElementById('sb-url').value.trim()
    const key = document.getElementById('sb-key').value.trim()
    if (url) localStorage.setItem('supabase_url', url)
    if (key) localStorage.setItem('supabase_anon_key', key)
    resetSupabaseClient()
    flashMsg('sb-msg')
  })

  document.getElementById('save-hf').addEventListener('click', () => {
    const key = document.getElementById('hf-key').value.trim()
    if (key) localStorage.setItem('hf_api_key', key)
    flashMsg('hf-msg')
  })

  document.getElementById('copy-sql').addEventListener('click', async () => {
    await navigator.clipboard.writeText(SCHEMA_SQL)
    flashMsg('copy-msg')
  })
}
