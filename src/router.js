const _routes = new Map()
let _notFound = null

export function route(pattern, handler) {
  _routes.set(pattern, handler)
}

export function onNotFound(handler) {
  _notFound = handler
}

export function navigate(path) {
  window.location.hash = '#' + path
}

function matchPattern(pattern, path) {
  const pp = pattern === '/' ? [] : pattern.split('/').filter(Boolean)
  const rp = path === '/' ? [] : path.split('/').filter(Boolean)

  if (pp.length !== rp.length) return null

  const params = {}
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) {
      params[pp[i].slice(1)] = decodeURIComponent(rp[i])
    } else if (pp[i] !== rp[i]) {
      return null
    }
  }
  return params
}

function dispatch() {
  const hash = window.location.hash || '#/'
  const path = hash.slice(1) || '/'

  for (const [pattern, handler] of _routes) {
    const params = matchPattern(pattern, path)
    if (params !== null) {
      handler(params)
      return
    }
  }

  if (_notFound) _notFound()
}

export function initRouter() {
  window.addEventListener('hashchange', dispatch)
  dispatch()
}

export function rerender() {
  dispatch()
}
