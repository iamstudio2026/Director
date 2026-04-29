<template>
  <div class="app-layout">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    
    <AppSidebar 
      class="app-sidebar" 
      :class="{ 'open': sidebarOpen }" 
      :activeModuleId="activeModuleId"
      @select-module="handleModuleSelect"
    />
    <div 
      v-if="sidebarOpen" 
      class="sidebar-overlay" 
      @click="sidebarOpen = false"
    ></div>
    
    <main class="app-content">
      <div v-if="projectStore.loading" class="loading-state">
        Cargando datos del proyecto...
      </div>
      
      <div v-else-if="!projectStore.currentProject" class="error-state">
        <p>No se pudo cargar el proyecto.</p>
        <RouterLink to="/app" class="btn btn-primary">Volver al Dashboard</RouterLink>
      </div>

      <div v-else class="content-wrapper">
        <!-- Banner de ancla persistente -->
        <div class="anchor-banner">
          <div class="ab-item">
            <span class="icon">🎯</span> <b>Pregunta:</b> 
            <span class="ab-val">{{ anchorQuestion || '— aún no configurada —' }}</span>
          </div>
          <div class="ab-item">
            <b>Modalidad:</b> 
            <span class="ab-val">{{ projectStore.currentProject.modality || '— no seleccionada —' }}</span>
          </div>
          <div class="ab-actions">
            <button class="btn btn-ghost btn-sm">Editar</button>
            <button class="btn btn-ghost btn-sm">Coherencia</button>
          </div>
        </div>

        <!-- Dynamic View Content -->
        <ModuleRenderer v-if="activeModule" :module="activeModule" />
        
        <div v-else class="module-view card">
          <h2 class="view-title">Bienvenido a Director</h2>
          <p class="view-subtitle">El entorno de investigación está listo. Selecciona un módulo en el panel izquierdo para comenzar.</p>
          
          <div class="placeholder-grid mt-6">
            <div class="kpi-box">
              <span class="kpi-val">0</span>
              <span class="kpi-lbl">Prompts generados</span>
            </div>
            <div class="kpi-box">
              <span class="kpi-val">0</span>
              <span class="kpi-lbl">Módulos completados</span>
            </div>
            <div class="kpi-box">
              <span class="kpi-val">0</span>
              <span class="kpi-lbl">Referencias guardadas</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useStudyState } from '@/stores/studyState'
import { useResearchModules } from '@/composables/useResearchModules'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ModuleRenderer from '@/components/ModuleRenderer.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const studyState = useStudyState()
const researchModules = useResearchModules()

const sidebarOpen = ref(false)
const activeModuleId = ref<string | null>(null)

const activeModule = computed(() => {
  if (!activeModuleId.value) return null
  return researchModules.getModuleById(activeModuleId.value) || null
})

const anchorQuestion = computed(() => studyState.getField('Q'))
const modality = computed(() => studyState.getField('modality'))

onMounted(async () => {
  const id = route.params.id as string
  if (!id) {
    router.push('/app')
    return
  }
  
  const success = await projectStore.loadProject(id)
  if (success) {
    await studyState.loadState(id)
  }
})

function handleModuleSelect(id: string) {
  activeModuleId.value = id
  sidebarOpen.value = false
}

// Close sidebar on route change (for mobile)
watch(() => route.fullPath, () => {
  sidebarOpen.value = false
})
</script>

<style scoped>
.sidebar-overlay {
  display: none;
  position: fixed; inset: 56px 0 0; background: rgba(0,0,0,.6); backdrop-filter: blur(2px); z-index: 30;
}

.content-wrapper { max-width: 1100px; margin: 0 auto; }

.anchor-banner {
  background: linear-gradient(90deg, var(--brand-gold) 0%, var(--brand-amber) 100%);
  color: #1a1000; padding: 12px 16px; border-radius: var(--r-md);
  margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px; font-size: 13px; font-family: var(--font-sans);
  box-shadow: 0 4px 12px rgba(245,158,11,.2);
}
.ab-item { display: flex; align-items: center; gap: 6px; }
.ab-val { opacity: 0.9; }
.ab-actions { display: flex; gap: 8px; margin-left: auto; }
.ab-actions .btn { border-color: rgba(26,16,0,.2); color: #1a1000; }
.ab-actions .btn:hover { background: rgba(26,16,0,.08); }

.view-title { font-size: 24px; color: #fff; margin-bottom: 8px; }
.view-subtitle { color: var(--gray-400); font-size: 14px; }
.mt-6 { margin-top: 24px; }

.placeholder-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.kpi-box {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06);
  border-radius: var(--r-md); padding: 20px; text-align: center;
}
.kpi-val { display: block; font-size: 32px; font-weight: 800; font-family: var(--font-display); color: #fff; margin-bottom: 4px; }
.kpi-lbl { font-size: 11px; text-transform: uppercase; font-weight: 600; color: var(--gray-400); letter-spacing: .5px; }

.loading-state, .error-state { padding: 40px; text-align: center; color: var(--gray-400); }

@media (max-width: 768px) {
  .sidebar-overlay { display: block; }
}
</style>
