<template>
  <div class="auth-page">
    <div class="auth-box card-glass text-center">
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
        <p>Autenticando...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <h3>Error de Autenticación</h3>
        <p>{{ error }}</p>
        <RouterLink to="/login" class="btn btn-primary mt-4">Volver al login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const code = route.query.code as string
  if (!code) {
    error.value = 'Código de autorización no encontrado.'
    loading.value = false
    return
  }

  const provider = route.name === 'google-callback' ? 'google' : 'github'
  
  const success = await authStore.handleOAuthCallback(provider, code)
  
  if (success) {
    router.push('/app')
  } else {
    error.value = 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.'
    loading.value = false
  }
})
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--brand-dark); }
.auth-box { padding: 40px; border-radius: 24px; min-width: 320px; }
.text-center { text-align: center; }
.mt-4 { margin-top: 16px; }

.spinner-container { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner {
  width: 40px; height: 40px; border: 3px solid rgba(255,255,255,.1);
  border-top-color: var(--brand-blue); border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.error-container h3 { color: var(--danger); margin-bottom: 8px; }
.error-container p { color: var(--gray-400); font-size: 14px; }
</style>
