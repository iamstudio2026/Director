<template>
  <div class="dashboard-page">
    <header class="dash-header">
      <div class="container dash-header-inner">
        <RouterLink to="/" class="logo">
          <span class="logo-text">Director</span>
        </RouterLink>
        <div class="user-menu">
          <div class="avatar">{{ authStore.user?.name.charAt(0).toUpperCase() }}</div>
          <span class="user-name">{{ authStore.user?.name }}</span>
          <button class="btn btn-ghost btn-sm" @click="handleLogout">Salir</button>
        </div>
      </div>
    </header>

    <main class="container dash-main">
      <div class="dash-top">
        <div>
          <h1 class="dash-title">Tus Proyectos</h1>
          <p class="dash-sub">Selecciona una investigación para continuar o crea una nueva.</p>
        </div>
        <button class="btn btn-primary" @click="showNewModal = true">+ Nuevo Proyecto</button>
      </div>

      <div v-if="projectsStore.loading" class="loading-state">Cargando proyectos...</div>
      
      <div v-else-if="projectsStore.projects.length === 0" class="empty-state card">
        <div class="empty-icon">📂</div>
        <h3>No tienes proyectos aún</h3>
        <p>Crea tu primer proyecto de investigación para comenzar a utilizar Director.</p>
        <button class="btn btn-primary" @click="showNewModal = true">Crear mi primer proyecto</button>
      </div>

      <div v-else class="projects-grid">
        <RouterLink 
          v-for="p in projectsStore.projects" :key="p.id" 
          :to="`/app/project/${p.id}`" 
          class="project-card card"
        >
          <div class="pc-top">
            <span v-if="p.modality" class="badge badge-blue">{{ getModalityLabel(p.modality) }}</span>
            <span v-else class="badge badge-gold">Sin modalidad</span>
            <time class="pc-date">Actualizado: {{ new Date(p.updated_at).toLocaleDateString() }}</time>
          </div>
          <h3 class="pc-title">{{ p.title }}</h3>
          <p class="pc-desc">{{ p.description || 'Sin descripción' }}</p>
          <div class="pc-footer">
            <span class="btn btn-ghost btn-sm">Abrir proyecto →</span>
          </div>
        </RouterLink>
      </div>
    </main>

    <!-- NEW PROJECT MODAL -->
    <div v-if="showNewModal" class="modal-overlay" @click.self="showNewModal = false">
      <div class="modal-content card">
        <h2>Crear nuevo proyecto</h2>
        <form @submit.prevent="handleCreate">
          <div class="form-group">
            <label class="form-label">Título de la investigación *</label>
            <input v-model="newProject.title" type="text" class="input-field" placeholder="Ej: Prevalencia de..." required />
          </div>
          <div class="form-group">
            <label class="form-label">Descripción corta</label>
            <textarea v-model="newProject.description" class="input-field" rows="3" placeholder="Opcional"></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-ghost" @click="showNewModal = false">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="isCreating">
              {{ isCreating ? 'Creando...' : 'Crear Proyecto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/projects'

const authStore = useAuthStore()
const projectsStore = useProjectStore()
const router = useRouter()

const showNewModal = ref(false)
const isCreating = ref(false)
const newProject = ref({ title: '', description: '' })

onMounted(() => {
  projectsStore.fetchProjects()
})

const getModalityLabel = (m: string) => {
  const map: Record<string, string> = {
    umbrella: 'Umbrella Review',
    systematic_review: 'Revisión Sistemática',
    primary: 'Estudio Primario',
    other: 'Otro Diseño'
  }
  return map[m] || m
}

async function handleCreate() {
  if (!newProject.value.title) return
  isCreating.value = true
  const id = await projectsStore.createProject(newProject.value.title, newProject.value.description)
  isCreating.value = false
  if (id) {
    showNewModal.value = false
    router.push(`/app/project/${id}`)
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-page { min-height: 100vh; background: var(--brand-dark); }
.dash-header { border-bottom: 1px solid rgba(255,255,255,.07); background: rgba(8,12,20,.95); position: sticky; top: 0; z-index: 10; }
.dash-header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.logo { text-decoration: none; color: #fff; }
.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 18px; }
.user-menu { display: flex; align-items: center; gap: 12px; }
.avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 14px; }
.user-name { font-size: 14px; font-weight: 500; color: var(--gray-200); }

.dash-main { padding: 48px var(--space-6); }
.dash-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
.dash-title { font-size: 28px; color: #fff; margin-bottom: 8px; }
.dash-sub { color: var(--gray-400); font-size: 15px; }

.empty-state { text-align: center; padding: 64px 24px; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-state h3 { font-size: 20px; color: #fff; margin-bottom: 12px; }
.empty-state p { color: var(--gray-400); margin-bottom: 24px; max-width: 400px; margin-inline: auto; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
.project-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; padding: 24px; cursor: pointer; }
.project-card:hover h3 { color: var(--brand-blue); }
.pc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.pc-date { font-size: 11px; color: var(--gray-400); }
.pc-title { font-size: 18px; color: #fff; margin-bottom: 8px; transition: color .2s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pc-desc { font-size: 13px; color: var(--gray-400); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }
.pc-footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.05); text-align: right; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { width: 100%; max-width: 500px; padding: 32px; background: var(--gray-900); }
.modal-content h2 { margin-bottom: 24px; color: #fff; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; font-weight: 600; color: var(--gray-400); margin-bottom: 8px; }
.form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }

@media (max-width: 640px) { .user-name { display: none; } .dash-top { flex-direction: column; align-items: flex-start; } }
</style>
