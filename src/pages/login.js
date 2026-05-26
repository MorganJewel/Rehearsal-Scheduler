import { navigate } from '../router.js'
import { getSupabaseClient } from '../supabase.js'

export function renderLogin() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">Rehearsal Scheduler</div>
        <p class="login-tagline">Theater production management for directors</p>

        <div class="auth-tabs">
          <button class="auth-tab active" id="tab-login">Sign In</button>
          <button class="auth-tab" id="tab-register">Register</button>
        </div>

        <form id="auth-form" autocomplete="on">
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" id="email" name="email"
              placeholder="director@theater.com" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input class="form-input" type="password" id="password" name="password"
              placeholder="••••••••" required autocomplete="current-password" minlength="6" />
          </div>
          <p class="error-msg" id="auth-error"></p>
          <button class="btn btn-primary" type="submit" id="auth-submit"
            style="width:100%;margin-top:0.5rem;">Sign In</button>
        </form>

        <p style="text-align:center;margin-top:1.25rem;font-size:0.82rem;color:var(--text2)">
          No Supabase credentials yet?
          <a href="#/settings" style="color:var(--accent)">Configure Settings</a>
        </p>
      </div>
    </div>
  `

  let mode = 'login'

  const tabLogin = document.getElementById('tab-login')
  const tabRegister = document.getElementById('tab-register')
  const submitBtn = document.getElementById('auth-submit')

  tabLogin.addEventListener('click', () => {
    mode = 'login'
    tabLogin.classList.add('active')
    tabRegister.classList.remove('active')
    submitBtn.textContent = 'Sign In'
    document.getElementById('auth-error').textContent = ''
  })

  tabRegister.addEventListener('click', () => {
    mode = 'register'
    tabRegister.classList.add('active')
    tabLogin.classList.remove('active')
    submitBtn.textContent = 'Create Account'
    document.getElementById('auth-error').textContent = ''
  })

  document.getElementById('auth-form').addEventListener('submit', async e => {
    e.preventDefault()
    const supabase = getSupabaseClient()
    if (!supabase) {
      document.getElementById('auth-error').textContent =
        'Supabase not configured. Please visit Settings first.'
      return
    }

    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value

    submitBtn.disabled = true
    submitBtn.textContent = mode === 'login' ? 'Signing in…' : 'Creating account…'
    document.getElementById('auth-error').textContent = ''

    try {
      let error
      if (mode === 'login') {
        ;({ error } = await supabase.auth.signInWithPassword({ email, password }))
      } else {
        ;({ error } = await supabase.auth.signUp({ email, password }))
        if (!error) {
          document.getElementById('auth-error').style.color = 'var(--accent)'
          document.getElementById('auth-error').textContent =
            'Account created! Check your email to confirm, then sign in.'
          submitBtn.disabled = false
          submitBtn.textContent = 'Create Account'
          return
        }
      }

      if (error) {
        document.getElementById('auth-error').style.color = 'var(--accent2)'
        document.getElementById('auth-error').textContent = error.message
        submitBtn.disabled = false
        submitBtn.textContent = mode === 'login' ? 'Sign In' : 'Create Account'
        return
      }

      navigate('/')
    } catch (err) {
      document.getElementById('auth-error').textContent = err.message
      submitBtn.disabled = false
      submitBtn.textContent = mode === 'login' ? 'Sign In' : 'Create Account'
    }
  })
}
