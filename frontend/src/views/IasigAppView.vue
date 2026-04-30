<template>
  <div class="app-layout">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    
    <!-- Mantenemos la barra lateral original de la plataforma para navegación global si se desea, 
         o podemos ocultarla para dar más espacio. Por defecto la ocultamos para que no haya doble menú. -->
    
    <main class="iframe-container">
      <iframe 
        src="/iasig-citologia.html" 
        class="embedded-app"
        title="IASIG Citología"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      ></iframe>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

const sidebarOpen = ref(false)
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.iframe-container {
  flex: 1;
  width: 100%;
  height: calc(100vh - 56px); /* Restando la altura del AppHeader */
  background: var(--bg-dark);
}

.embedded-app {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
