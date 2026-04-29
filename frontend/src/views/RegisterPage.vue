<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="orb orb-1"></div><div class="orb orb-2"></div>
    </div>
    <div class="auth-box card-glass">
      <RouterLink to="/" class="auth-logo">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#alg)"/>
          <path d="M8 22L16 10l8 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="16" cy="10" r="2.5" fill="#f59e0b"/>
          <defs><linearGradient id="alg" x1="0" y1="0" x2="32" y2="32">
            <stop stop-color="#1a3a6b"/><stop offset="1" stop-color="#2563eb"/>
          </linearGradient></defs>
        </svg>
        <span>Director <sup style="font-size:9px;color:var(--brand-cyan)">by IAM-Studio</sup></span>
      </RouterLink>

      <h1 class="auth-title">Crear tu cuenta</h1>
      <p class="auth-sub">Únete a Director para gestionar tus investigaciones.</p>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label class="form-label">Nombre completo *</label>
          <input v-model="name" type="text" class="input-field" placeholder="Tu nombre" required />
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input v-model="email" type="email" class="input-field" placeholder="tu@email.com" required />
        </div>
        <div class="form-group">
          <label class="form-label">Contraseña *</label>
          <input v-model="password" type="password" class="input-field" placeholder="••••••••" required />
        </div>
        <div class="form-group">
          <label class="form-label">Institución (Opcional)</label>
          <input v-model="institution" type="text" class="input-field" placeholder="Ej: UAJMS" />
        </div>
        
        <p v-if="error" class="auth-error">{{ error }}</p>
        
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px" :disabled="loading">
          <span v-if="loading">Creando cuenta...</span>
          <span v-else>Registrarse →</span>
        </button>
      </form>

      <p class="auth-footer">
        ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const name = ref(''), email = ref(''), password = ref(''), institution = ref('')
const error = ref(''), loading = ref(false)

async function handleRegister() {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Por favor, completa los campos requeridos.'
    return
  }
  
  loading.value = true; error.value = ''
  const ok = await auth.register(name.value, email.value, password.value, institution.value)
  if (ok) {
    router.push('/app')
  } else { 
    error.value = 'Error al registrar. Puede que el correo ya esté en uso.'
    loading.value = false 
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 24px; position: relative; overflow: hidden;
}
.auth-bg { position: absolute; inset: 0; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; filter: blur(80px); }
.orb-1 { width: 500px; height: 500px; background: rgba(37,99,235,.15); top: -100px; right: -100px; }
.orb-2 { width: 400px; height: 400px; background: rgba(6,182,212,.1); bottom: -100px; left: -100px; }
.auth-box {
  position: relative; z-index: 1; width: 100%; max-width: 420px;
  padding: 40px; border-radius: 24px;
}
.auth-logo {
  display: flex; align-items: center; gap: 10px; text-decoration: none;
  color: #fff; font-family: var(--font-display); font-weight: 800; font-size: 17px;
  margin-bottom: 32px;
}
.auth-title { font-size: 26px; color: #fff; margin-bottom: 8px; }
.auth-sub { color: var(--gray-400); font-size: 14px; margin-bottom: 28px; }

.auth-form { display: flex; flex-direction: column; gap: 16px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--gray-400); margin-bottom: 6px; }
.auth-error { font-size: 13px; color: var(--danger); padding: 8px 12px; background: rgba(239,68,68,.1); border-radius: 6px; }
.auth-footer { text-align: center; font-size: 13px; color: var(--gray-400); margin-top: 24px; }
.auth-footer a { color: var(--brand-cyan); text-decoration: none; font-weight: 600; }
</style>
