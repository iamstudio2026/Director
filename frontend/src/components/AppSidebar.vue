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
        <!-- DUM Modules -->
        <div class="nav-group">
          <div class="nav-group-title">Setup (For Dummies)</div>
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

        <!-- CAP 1 -->
        <div class="nav-group">
          <div class="nav-group-title">Capítulo I: Problema</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C1-A' }" @click="$emit('select-module', 'C1-A')">
            <span class="dot"></span> <span class="code">C1-A</span> Tema
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C1-B' }" @click="$emit('select-module', 'C1-B')">
            <span class="dot"></span> <span class="code">C1-B</span> Problema
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C1-C' }" @click="$emit('select-module', 'C1-C')">
            <span class="dot"></span> <span class="code">C1-C</span> Pregunta e Hipótesis
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C1-D' }" @click="$emit('select-module', 'C1-D')">
            <span class="dot"></span> <span class="code">C1-D</span> Objetivos
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C1-E' }" @click="$emit('select-module', 'C1-E')">
            <span class="dot"></span> <span class="code">C1-E</span> Justificación
          </button>
        </div>

        <!-- CAP 2 -->
        <div class="nav-group">
          <div class="nav-group-title">Capítulo II: Marco Teórico</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C2-A' }" @click="$emit('select-module', 'C2-A')">
            <span class="dot"></span> <span class="code">C2-A</span> Antecedentes
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C2-B' }" @click="$emit('select-module', 'C2-B')">
            <span class="dot"></span> <span class="code">C2-B</span> Bases Teóricas
          </button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C2-C' }" @click="$emit('select-module', 'C2-C')">
            <span class="dot"></span> <span class="code">C2-C</span> Definiciones
          </button>
        </div>
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
        <button class="nav-btn" :class="{ active: activeModuleId === 'C1-A' }" @click="$emit('select-module', 'C1-A')"><span class="dot"></span> <span class="icon">🔎</span> <span class="code">C1A</span> Tema</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C1-B' }" @click="$emit('select-module', 'C1-B')"><span class="dot"></span> <span class="icon">⚠️</span> <span class="code">C1B</span> Problema</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C1-C' }" @click="$emit('select-module', 'C1-C')"><span class="dot"></span> <span class="icon">❓</span> <span class="code">C1C</span> Pregunta/Hip.</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C1-D' }" @click="$emit('select-module', 'C1-D')"><span class="dot"></span> <span class="icon">🎯</span> <span class="code">C1D</span> Objetivos</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C1-E' }" @click="$emit('select-module', 'C1-E')"><span class="dot"></span> <span class="icon">💡</span> <span class="code">C1E</span> Justificación</button>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="section-title">
        Cap. II <span class="count">0/3</span>
      </h3>
      <div class="nav-group">
        <button class="nav-btn" :class="{ active: activeModuleId === 'C2-A' }" @click="$emit('select-module', 'C2-A')"><span class="dot"></span> <span class="icon">📖</span> <span class="code">C2A</span> Antecedentes</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C2-B' }" @click="$emit('select-module', 'C2-B')"><span class="dot"></span> <span class="icon">🏗️</span> <span class="code">C2B</span> Bases teóricas</button>
        <button class="nav-btn" :class="{ active: activeModuleId === 'C2-C' }" @click="$emit('select-module', 'C2-C')"><span class="dot"></span> <span class="icon">📘</span> <span class="code">C2C</span> Definiciones</button>
      </div>
    </div>

        <!-- CAP 3 -->
        <div class="nav-group">
          <div class="nav-group-title">Capítulo III: Metodología</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-A' }" @click="$emit('select-module', 'C3-A')"><span class="dot"></span> <span class="code">C3-A</span> Tipo y diseño</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-B' }" @click="$emit('select-module', 'C3-B')"><span class="dot"></span> <span class="code">C3-B</span> Ámbito</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-C' }" @click="$emit('select-module', 'C3-C')"><span class="dot"></span> <span class="code">C3-C</span> Univ/Muestra</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-D' }" @click="$emit('select-module', 'C3-D')"><span class="dot"></span> <span class="code">C3-D</span> Criterios I/E</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-E' }" @click="$emit('select-module', 'C3-E')"><span class="dot"></span> <span class="code">C3-E</span> Variables</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-F' }" @click="$emit('select-module', 'C3-F')"><span class="dot"></span> <span class="code">C3-F</span> Técnicas</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-G' }" @click="$emit('select-module', 'C3-G')"><span class="dot"></span> <span class="code">C3-G</span> Plan de análisis</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-H' }" @click="$emit('select-module', 'C3-H')"><span class="dot"></span> <span class="code">C3-H</span> Ética</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-I' }" @click="$emit('select-module', 'C3-I')"><span class="dot"></span> <span class="code">C3-I</span> Cronograma</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C3-J' }" @click="$emit('select-module', 'C3-J')"><span class="dot"></span> <span class="code">C3-J</span> Presupuesto</button>
        </div>

        <!-- EXT / PRISMA -->
        <div class="nav-group">
          <div class="nav-group-title">Búsqueda y PRISMA</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M0' }" @click="$emit('select-module', 'M0')"><span class="dot"></span> <span class="code">M0</span> Algoritmos</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'AP-1' }" @click="$emit('select-module', 'AP-1')"><span class="dot"></span> <span class="code">AP-1</span> Onboarding</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'AP-2' }" @click="$emit('select-module', 'AP-2')"><span class="dot"></span> <span class="code">AP-2</span> Paleta</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'PRISMA' }" @click="$emit('select-module', 'PRISMA')"><span class="dot"></span> <span class="code">PR</span> Flujo PRISMA</button>
          <!-- Enlace interno a IASIG Citología embebida -->
          <RouterLink to="/app/iasig" class="nav-btn" active-class="active" style="text-decoration: none;">
            <span class="dot"></span> <span class="icon">🔬</span> <span class="code">IA</span> IASIG Citología
          </RouterLink>
        </div>

        <!-- MARCOS Y ROB -->
        <div class="nav-group">
          <div class="nav-group-title">Extracción y Calidad</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M1-A' }" @click="$emit('select-module', 'M1-A')"><span class="dot"></span> <span class="code">M1-A</span> Marco Dx</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M1-B' }" @click="$emit('select-module', 'M1-B')"><span class="dot"></span> <span class="code">M1-B</span> Marco Prev</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M1-C' }" @click="$emit('select-module', 'M1-C')"><span class="dot"></span> <span class="code">M1-C</span> Marco Factores</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M2' }" @click="$emit('select-module', 'M2')"><span class="dot"></span> <span class="code">M2</span> Operacionalización</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M3-A' }" @click="$emit('select-module', 'M3-A')"><span class="dot"></span> <span class="code">M3-A</span> QUADAS-2</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M3-B' }" @click="$emit('select-module', 'M3-B')"><span class="dot"></span> <span class="code">M3-B</span> JBI Prev</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M3-C' }" @click="$emit('select-module', 'M3-C')"><span class="dot"></span> <span class="code">M3-C</span> ROB-2/ROBINS</button>
        </div>

        <!-- SÍNTESIS -->
        <div class="nav-group">
          <div class="nav-group-title">Síntesis y Sesgo</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M4-A' }" @click="$emit('select-module', 'M4-A')"><span class="dot"></span> <span class="code">M4-A</span> MA Diagnóstico</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M4-B' }" @click="$emit('select-module', 'M4-B')"><span class="dot"></span> <span class="code">M4-B</span> Metaproporción</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M4-C' }" @click="$emit('select-module', 'M4-C')"><span class="dot"></span> <span class="code">M4-C</span> Meta-regresión</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M5' }" @click="$emit('select-module', 'M5')"><span class="dot"></span> <span class="code">M5</span> Síntesis Cualit.</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M6-A' }" @click="$emit('select-module', 'M6-A')"><span class="dot"></span> <span class="code">M6-A</span> Triangulación Dx</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'M6-B' }" @click="$emit('select-module', 'M6-B')"><span class="dot"></span> <span class="code">M6-B</span> Triangulación Prev</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'GRADE' }" @click="$emit('select-module', 'GRADE')"><span class="dot"></span> <span class="code">GD</span> GRADE</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'BIAS' }" @click="$emit('select-module', 'BIAS')"><span class="dot"></span> <span class="code">BS</span> Sesgo Pub.</button>
        </div>

        <!-- CAP 4 & 5 -->
        <div class="nav-group">
          <div class="nav-group-title">Resultados y Conclusiones</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C4-A' }" @click="$emit('select-module', 'C4-A')"><span class="dot"></span> <span class="code">C4-A</span> Resultados</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C4-B' }" @click="$emit('select-module', 'C4-B')"><span class="dot"></span> <span class="code">C4-B</span> Discusión</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'C5' }" @click="$emit('select-module', 'C5')"><span class="dot"></span> <span class="code">C5</span> Conclusiones</button>
        </div>

        <!-- CIERRE -->
        <div class="nav-group">
          <div class="nav-group-title">Cierre y Anexos</div>
          <button class="nav-btn" :class="{ active: activeModuleId === 'P5' }" @click="$emit('select-module', 'P5')"><span class="dot"></span> <span class="code">P5</span> Abstract</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'B1' }" @click="$emit('select-module', 'B1')"><span class="dot"></span> <span class="code">B1</span> Bibliografía</button>
          <button class="nav-btn" :class="{ active: activeModuleId === 'B2' }" @click="$emit('select-module', 'B2')"><span class="dot"></span> <span class="code">B2</span> Anexos</button>
        </div>

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
