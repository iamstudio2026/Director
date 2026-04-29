import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor: auto-refresh on 401
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = localStorage.getItem('director_refresh')
        if (!refresh) throw new Error('No refresh token')
        const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refresh_token: refresh })
        localStorage.setItem('director_token', data.access_token)
        localStorage.setItem('director_refresh', data.refresh_token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
        original.headers['Authorization'] = `Bearer ${data.access_token}`
        return api(original)
      } catch {
        localStorage.removeItem('director_token')
        localStorage.removeItem('director_refresh')
        localStorage.removeItem('director_user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
