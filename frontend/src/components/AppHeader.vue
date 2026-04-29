<template>
  <header class="app-topbar">
    <div class="header-left">
      <button class="mobile-menu-btn" @click="$emit('toggle-sidebar')">☰</button>
      <RouterLink to="/app" class="brand-link">
        <span class="logo-text">Director</span>
      </RouterLink>
      <div class="project-title" v-if="projectStore.currentProject">
        / {{ projectStore.currentProject.title }}
        <span v-if="projectStore.currentProject.modality" class="badge badge-blue ml-2">{{ projectStore.currentProject.modality }}</span>
      </div>
    </div>
    
    <div class="header-right">
      <div class="global-progress">
        <span class="gp-label">Progreso</span>
        <div class="gp-bar"><div class="gp-fill" style="width:10%"></div></div>
        <span class="gp-pct">10%</span>
      </div>

      <div class="actions">
        <select class="input-field select-sm" v-model="compressLevel" title="Nivel de compresión global">
          <option value="detailed">Std</option>
          <option value="minimal">Min</option>
          <option value="detailed">Det</option>
        </select>
        <button class="btn btn-ghost btn-sm btn-icon" title="Búsqueda (Ctrl+K)">🔍</button>
        <button class="btn btn-ghost btn-sm btn-icon" title="Ajustes del proyecto">⚙️</button>
        
        <div class="user-avatar" title="Perfil">
          {{ authStore.user?.name.charAt(0).toUpperCase() }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/projects'

defineEmits(['toggle-sidebar'])

const authStore = useAuthStore()
const projectStore = useProjectStore()
const compressLevel = ref('detailed')
</script>

<style scoped>
.header-left { display: flex; align-items: center; gap: 16px; }
.mobile-menu-btn { display: none; background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; }
.brand-link { text-decoration: none; }
.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 16px; color: #fff; }
.project-title { font-size: 13px; color: var(--gray-400); font-weight: 500; display: flex; align-items: center; }
.ml-2 { margin-left: 8px; }

.header-right { display: flex; align-items: center; gap: 24px; margin-left: auto; }
.global-progress { display: flex; align-items: center; gap: 8px; }
.gp-label { font-size: 11px; color: var(--gray-400); text-transform: uppercase; font-weight: 600; }
.gp-bar { width: 120px; height: 6px; background: rgba(255,255,255,.1); border-radius: 999px; overflow: hidden; }
.gp-fill { height: 100%; background: var(--brand-gold); transition: width .3s; }
.gp-pct { font-size: 11px; color: #fff; font-weight: 700; font-variant-numeric: tabular-nums; }

.actions { display: flex; align-items: center; gap: 8px; }
.select-sm { padding: 4px 8px; font-size: 12px; width: auto; height: 28px; }
.user-avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 12px; cursor: pointer; margin-left: 8px; }

@media (max-width: 768px) {
  .mobile-menu-btn { display: block; }
  .project-title { display: none; }
  .global-progress { display: none; }
}
</style>
