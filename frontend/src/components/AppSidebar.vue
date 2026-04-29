<template>
  <aside class="sidebar-inner">
    <div class="sidebar-section">
      <h3 class="section-title">Inicio</h3>
      <div class="nav-group">
        <button class="nav-btn active">
          <span class="dot"></span> <span class="icon">🏠</span> <span class="code">H</span> Inicio
        </button>
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">📊</span> <span class="code">DB</span> Tablero
        </button>
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">🧭</span> <span class="code">W</span> Flujo guiado
        </button>
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">❓</span> <span class="code">?</span> Ayuda
        </button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        🎓 For Dummies
        <span class="count">0/5</span>
      </h3>
      <div class="nav-group">
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">🚀</span> <span class="code">DALL</span> Pipeline integrado
        </button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'DUM-0' }" @click="$emit('select-module', 'DUM-0')">
          <span class="dot"></span> <span class="icon">❓</span> <span class="code">D0</span> Pregunta (PICO)
        </button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'DUM-1' }" @click="$emit('select-module', 'DUM-1')">
          <span class="dot"></span> <span class="icon">🎯</span> <span class="code">D1</span> Objetivos y Diseño
        </button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'DUM-2' }" @click="$emit('select-module', 'DUM-2')">
          <span class="dot"></span> <span class="icon">🔬</span> <span class="code">D2</span> Constructor PICO
        </button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'DUM-3' }" @click="$emit('select-module', 'DUM-3')">
          <span class="dot"></span> <span class="icon">📐</span> <span class="code">D3</span> Modalidad
        </button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        ⭐ Ancla
      </h3>
      <div class="nav-group">
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">🎯</span> <span class="code">A</span> Pregunta + Modalidad
        </button>
        <button class="nav-btn">
          <span class="dot"></span> <span class="icon">✅</span> <span class="code">CK</span> Coherencia
        </button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        Cap. I <span class="count">0/5</span>
      </h3>
      <div class="nav-group">
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🔎</span> <span class="code">C1A</span> Tema</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">⚠️</span> <span class="code">C1B</span> Problema</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">❓</span> <span class="code">C1C</span> Pregunta/Hip.</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🎯</span> <span class="code">C1D</span> Objetivos</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">💡</span> <span class="code">C1E</span> Justificación</button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        Cap. II <span class="count">0/3</span>
      </h3>
      <div class="nav-group">
        <button class="nav-btn"><span class="dot"></span> <span class="icon">📖</span> <span class="code">C2A</span> Antecedentes</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🏗️</span> <span class="code">C2B</span> Bases teóricas</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">📘</span> <span class="code">C2C</span> Definiciones</button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        Cap. III <span class="count">0/10</span>
      </h3>
      <div class="nav-group">
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🔬</span> <span class="code">C3A</span> Tipo y diseño</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🌍</span> <span class="code">C3B</span> Ámbito</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">👥</span> <span class="code">C3C</span> Universo/Muestra</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">✅</span> <span class="code">C3D</span> Criterios I/E</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">📊</span> <span class="code">C3E</span> Variables</button>
        <button class="nav-btn"><span class="dot"></span> <span class="icon">🧪</span> <span class="code">C3F</span> Técnicas</button>
      </div>
    </div>

    <!-- TODO: Agregar resto de los capítulos y módulos (Corpus, Síntesis, Resultados, Bibliografía) según la versión HTML -->

  </aside>
</template>

<script setup lang="ts">
defineProps<{
  activeModuleId: string | null
}>()

defineEmits(['select-module'])
</script>

<style scoped>
.sidebar-inner { height: 100%; padding-bottom: 40px; }
.sidebar-section { margin-bottom: 16px; }
.section-title { 
  font-family: var(--font-sans); font-size: 11px; font-weight: 700; 
  color: var(--gray-400); text-transform: uppercase; letter-spacing: .5px;
  margin-bottom: 8px; padding: 0 8px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px dashed rgba(255,255,255,.1); padding-bottom: 4px;
}
.count { font-weight: 500; color: var(--gray-600); }

.nav-group { display: flex; flex-direction: column; gap: 2px; }
.nav-btn {
  display: flex; align-items: center; gap: 8px;
  width: 100%; text-align: left; background: transparent; border: none;
  padding: 6px 8px; border-radius: var(--r-sm); cursor: pointer;
  color: var(--gray-200); font-size: 13px; font-family: var(--font-sans);
  transition: all .15s;
}
.nav-btn:hover { background: rgba(255,255,255,.05); }
.nav-btn.active { background: rgba(37,99,235,.2); color: #fff; font-weight: 600; }

.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gray-600); flex-shrink: 0; }
.nav-btn.active .dot { background: var(--brand-blue); box-shadow: 0 0 6px var(--brand-blue); }
/* State dots classes to be added via dynamic binding: .inprog (gold), .done (green) */

.icon { font-size: 14px; width: 18px; text-align: center; }
.code { 
  font-size: 10px; font-family: monospace; font-weight: 700;
  background: rgba(255,255,255,.1); padding: 1px 4px; border-radius: 3px;
  color: var(--gray-400); min-width: 28px; text-align: center;
}
.nav-btn.active .code { color: #93c5fd; background: rgba(37,99,235,.3); }
</style>
