import { createClient } from '@supabase/supabase-js'

let _client = null
let _cachedUrl = null
let _cachedKey = null

export function getSupabaseClient() {
  const url = localStorage.getItem('supabase_url')
  const key = localStorage.getItem('supabase_anon_key')

  if (!url || !key) return null

  if (_client && url === _cachedUrl && key === _cachedKey) return _client

  _client = createClient(url, key)
  _cachedUrl = url
  _cachedKey = key

  return _client
}

export function resetSupabaseClient() {
  _client = null
  _cachedUrl = null
  _cachedKey = null
}
