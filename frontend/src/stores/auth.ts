import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/client'

interface User { id: string; name: string; email: string; role: string; institution?: string; avatar_url?: string }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('director_user') || 'null'))
  const accessToken = ref<string | null>(localStorage.getItem('director_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('director_refresh'))

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  function _persist(data: { access_token: string; refresh_token: string; user: User }) {
    accessToken.value = data.access_token
    refreshToken.value = data.refresh_token
    user.value = data.user
    localStorage.setItem('director_token', data.access_token)
    localStorage.setItem('director_refresh', data.refresh_token)
    localStorage.setItem('director_user', JSON.stringify(data.user))
    api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      _persist(data)
      return true
    } catch { return false }
  }

  async function register(name: string, email: string, password: string, institution?: string): Promise<boolean> {
    try {
      const { data } = await api.post('/auth/register', { name, email, password, institution })
      _persist(data)
      return true
    } catch { return false }
  }

  async function refreshAccess(): Promise<boolean> {
    try {
      const { data } = await api.post('/auth/refresh', { refresh_token: refreshToken.value })
      _persist(data)
      return true
    } catch { logout(); return false }
  }

  async function getGoogleUrl(): Promise<{ url: string }> {
    const { data } = await api.get('/auth/google/url')
    return data
  }

  async function getGithubUrl(): Promise<{ url: string }> {
    const { data } = await api.get('/auth/github/url')
    return data
  }

  async function handleOAuthCallback(provider: 'google' | 'github', code: string): Promise<boolean> {
    try {
      const { data } = await api.post(`/auth/${provider}/callback`, null, { params: { code } })
      _persist(data)
      return true
    } catch { return false }
  }

  function logout() {
    user.value = null; accessToken.value = null; refreshToken.value = null
    localStorage.removeItem('director_token')
    localStorage.removeItem('director_refresh')
    localStorage.removeItem('director_user')
    delete api.defaults.headers.common['Authorization']
  }

  // Initialize axios header on store creation
  if (accessToken.value) api.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`

  return { user, isAuthenticated, login, register, logout, refreshAccess, getGoogleUrl, getGithubUrl, handleOAuthCallback }
})
