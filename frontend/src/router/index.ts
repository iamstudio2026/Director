import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingPage.vue'),
      meta: { public: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
      meta: { public: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage.vue'),
      meta: { public: true }
    },
    {
      path: '/auth/google/callback',
      name: 'google-callback',
      component: () => import('@/views/OAuthCallback.vue'),
      meta: { public: true }
    },
    {
      path: '/auth/github/callback',
      name: 'github-callback',
      component: () => import('@/views/OAuthCallback.vue'),
      meta: { public: true }
    },
    {
      path: '/app',
      name: 'dashboard',
      component: () => import('@/views/ProjectDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/app/project/:id',
      name: 'research-app',
      component: () => import('@/views/ResearchApp.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/app/iasig',
      name: 'iasig-app',
      component: () => import('@/views/IasigAppView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior: () => ({ top: 0 })
})

// Navigation guard
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
