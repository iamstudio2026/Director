<template>
  <div class="landing">
    <!-- ── NAV ─────────────────────────────────────────────── -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="container nav-inner">
        <RouterLink to="/" class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#lg)"/>
            <path d="M8 22L16 10l8 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="16" cy="10" r="2.5" fill="#f59e0b"/>
            <defs><linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
              <stop stop-color="#1a3a6b"/><stop offset="1" stop-color="#2563eb"/>
            </linearGradient></defs>
          </svg>
          <span class="logo-text">Director <sup class="logo-by">by IAM-Studio</sup></span>
        </RouterLink>
        <div class="nav-links">
          <a href="#features" class="nav-link">Funcionalidades</a>
          <a href="#workflow" class="nav-link">Flujo</a>
          <a href="#about" class="nav-link">Acerca de</a>
        </div>
        <div class="nav-cta">
          <RouterLink to="/login" class="btn btn-ghost btn-sm">Iniciar sesión</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">Comenzar gratis →</RouterLink>
        </div>
      </div>
    </nav>

    <!-- ── HERO ────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-badge animate-fade-up">
          <span class="badge badge-blue">✦ IAM-Studio · Investigación científica</span>
        </div>
        <h1 class="hero-title animate-fade-up delay-100">
          Orquesta tu investigación.<br/>
          <span class="text-gradient">Sin límites. Sin pérdidas.</span>
        </h1>
        <p class="hero-sub animate-fade-up delay-200">
          <strong>Director</strong> es la plataforma profesional para doctorandos e investigadores.
          Gestiona tu protocolo, genera prompts para IA, controla PRISMA, bibliografía y síntesis —
          todo persistido en la nube y accesible desde cualquier dispositivo.
        </p>
        <div class="hero-actions animate-fade-up delay-300">
          <RouterLink to="/register" class="btn btn-gold btn-lg">
            🚀 Crear cuenta gratuita
          </RouterLink>
          <RouterLink to="/login" class="btn btn-ghost btn-lg">
            Iniciar sesión
          </RouterLink>
        </div>
        <div class="hero-stats animate-fade-up delay-400">
          <div class="stat"><span class="stat-n">50+</span><span class="stat-l">Módulos de investigación</span></div>
          <div class="stat-div"></div>
          <div class="stat"><span class="stat-n">6</span><span class="stat-l">Estilos bibliográficos</span></div>
          <div class="stat-div"></div>
          <div class="stat"><span class="stat-n">100%</span><span class="stat-l">En la nube</span></div>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ─────────────────────────────────────────── -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="badge badge-cyan">✦ Funcionalidades</span>
          <h2 class="section-title">Todo lo que necesitas para investigar</h2>
          <p class="section-sub">Desde la pregunta PICO hasta la bibliografía final — un solo lugar.</p>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in features" :key="i" class="feature-card card animate-fade-up" :style="`animation-delay:${i*0.08}s`">
            <div class="feature-icon" :style="`background:${f.color}20;color:${f.color}`">{{ f.icon }}</div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
            <div class="feature-tags">
              <span v-for="t in f.tags" :key="t" class="badge badge-blue">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── WORKFLOW ──────────────────────────────────────────── -->
    <section id="workflow" class="workflow">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-gold">✦ Pipeline</span>
          <h2 class="section-title">El flujo completo de tu investigación</h2>
        </div>
        <div class="workflow-steps">
          <div v-for="(s, i) in steps" :key="i" class="workflow-step">
            <div class="step-num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="step-body">
              <h4 class="step-title">{{ s.title }}</h4>
              <p class="step-desc">{{ s.desc }}</p>
            </div>
            <div v-if="i < steps.length-1" class="step-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CLOUD BANNER ─────────────────────────────────────── -->
    <section class="cloud-banner">
      <div class="container cloud-inner">
        <div class="cloud-text">
          <h2>Desde cualquier lugar.<br/><span class="text-gradient">Siempre disponible.</span></h2>
          <p>Tu trabajo persiste en la nube. Auto-guardado cada 30 segundos. Historial completo de prompts. Snapshots automáticos. Sin miedo a perder nada.</p>
          <div class="cloud-badges">
            <span class="badge badge-green">🔒 SSL/HTTPS</span>
            <span class="badge badge-blue">☁️ VPS dedicado</span>
            <span class="badge badge-cyan">🔄 Auto-backup</span>
            <span class="badge badge-gold">👥 Multi-usuario</span>
          </div>
        </div>
        <div class="cloud-visual">
          <div class="cloud-card card-glass">
            <div class="cloud-row"><span class="dot-ok"></span> Auto-save activo</div>
            <div class="cloud-row"><span class="dot-ok"></span> 47 prompts guardados</div>
            <div class="cloud-row"><span class="dot-ok"></span> PRISMA sincronizado</div>
            <div class="cloud-row"><span class="dot-ok"></span> 3 usuarios conectados</div>
            <div class="cloud-progress">
              <div class="cp-label">Progreso global del protocolo</div>
              <div class="cp-bar"><div class="cp-fill" style="width:72%"></div></div>
              <div class="cp-pct">72%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────── -->
    <section class="cta">
      <div class="container cta-inner">
        <h2 class="cta-title">Empieza a investigar con <span class="text-gradient-gold">Director</span> hoy</h2>
        <p class="cta-sub">Crea tu cuenta, importa tu proyecto existente y nunca vuelvas a perder tu trabajo.</p>
        <div class="cta-actions">
          <RouterLink to="/register" class="btn btn-gold btn-lg">Crear cuenta gratuita →</RouterLink>
          <RouterLink to="/login" class="btn btn-ghost btn-lg">Ya tengo cuenta</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ────────────────────────────────────────────── -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="logo-text">Director <sup class="logo-by">by IAM-Studio</sup></span>
          <p class="footer-desc">Plataforma profesional de investigación científica para doctorandos e investigadores UAJMS.</p>
        </div>
        <div class="footer-links">
          <span class="footer-col-title">Producto</span>
          <RouterLink to="/login">Iniciar sesión</RouterLink>
          <RouterLink to="/register">Registrarse</RouterLink>
        </div>
        <div class="footer-links">
          <span class="footer-col-title">IAM-Studio</span>
          <a href="https://github.com/iamstudio2026" target="_blank">GitHub</a>
          <a href="mailto:iamstudio2026@gmail.com">Contacto</a>
        </div>
      </div>
      <div class="footer-copy">
        <div class="container">© 2026 IAM-Studio · Todos los derechos reservados</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const features = [
  { icon: '🎯', color: '#2563eb', title: 'Pipeline PICO/PECO', desc: 'Refina tu pregunta de investigación paso a paso con el flujo guiado DUM y el asistente FINER.', tags: ['PICO', 'PECO', 'FINER'] },
  { icon: '📋', color: '#10b981', title: 'Protocolo completo', desc: 'Cap. I al V, portada, dedicatoria, abstract, cronograma, presupuesto. Todo con prompts optimizados para IA.', tags: ['NotebookLM', 'Colab'] },
  { icon: '📐', color: '#6366f1', title: 'PRISMA & Calidad', desc: 'Diagrama PRISMA interactivo, evaluación QUADAS-2, ROB-2, ROBINS-I, JBI y GRADE integrados.', tags: ['PRISMA', 'GRADE', 'QUADAS-2'] },
  { icon: '📚', color: '#f59e0b', title: 'Bibliografía multi-estilo', desc: 'Genera citas en APA 7, Vancouver, IEEE, Harvard, Chicago y MLA. Detección de duplicados incluida.', tags: ['APA 7', 'Vancouver', 'IEEE'] },
  { icon: '📊', color: '#06b6d4', title: 'Síntesis estadística', desc: 'Forest plot, SROC/Reitsma, curva ROC, meta-regresión, Funnel + Egger. Código Python listo para Colab.', tags: ['Forest plot', 'SROC', 'Meta-análisis'] },
  { icon: '☁️', color: '#8b5cf6', title: 'Nube + Multi-proyecto', desc: 'Auto-guardado cada 30s, historial completo de prompts, snapshots automáticos, acceso desde cualquier dispositivo.', tags: ['Cloud', 'Auto-save'] },
]

const steps = [
  { title: 'Refina tu pregunta', desc: 'DUM wizard: PICO/PECO → objetivos → diseño → modalidad' },
  { title: 'Construye el protocolo', desc: 'Completa Cap. I–V con asistencia IA y prompts optimizados' },
  { title: 'Busca y clasifica', desc: 'Algoritmos de búsqueda, onboarding, PRISMA, criterios I/E' },
  { title: 'Extrae y evalúa', desc: 'QUADAS-2, ROB-2, JBI, GRADE, sesgo de publicación' },
  { title: 'Sintetiza y exporta', desc: 'Meta-análisis en Colab, bibliografía multi-estilo, ensamble final' },
]
</script>

<style scoped>
/* ── NAV ──────────────────────────────────────────────────── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: all .3s ease;
}
.nav.scrolled {
  background: rgba(8,12,20,.92);
  border-bottom: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(16px);
}
.nav-inner {
  display: flex; align-items: center; gap: 32px;
  height: 64px;
}
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 18px; color: #fff; }
.logo-by { font-size: 9px; font-weight: 500; color: var(--brand-cyan); vertical-align: super; margin-left: 4px; }
.nav-links { display: flex; gap: 28px; flex: 1; }
.nav-link { color: var(--gray-400); text-decoration: none; font-size: 14px; font-weight: 500; transition: color .15s; }
.nav-link:hover { color: #fff; }
.nav-cta { display: flex; gap: 10px; margin-left: auto; }

/* ── HERO ─────────────────────────────────────────────────── */
.hero {
  min-height: 100vh; display: flex; align-items: center;
  position: relative; overflow: hidden; padding: 120px 0 80px;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); animation: glow-pulse 4s ease infinite;
}
.orb-1 { width: 600px; height: 600px; background: rgba(37,99,235,.18); top: -150px; left: -100px; }
.orb-2 { width: 500px; height: 500px; background: rgba(6,182,212,.12); top: 100px; right: -100px; animation-delay: 2s; }
.orb-3 { width: 400px; height: 400px; background: rgba(139,92,246,.1); bottom: 0; left: 40%; animation-delay: 1s; }
.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
.hero-inner { position: relative; z-index: 1; text-align: center; }
.hero-badge { margin-bottom: 24px; }
.hero-title { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 24px; color: #fff; }
.hero-sub {
  font-size: 18px; color: var(--gray-400); max-width: 640px; margin: 0 auto 40px;
  line-height: 1.7;
}
.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px; }
.hero-stats { display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
.stat { text-align: center; }
.stat-n { display: block; font-size: 32px; font-weight: 800; color: #fff; font-family: var(--font-display); }
.stat-l { font-size: 12px; color: var(--gray-400); text-transform: uppercase; letter-spacing: .5px; }
.stat-div { width: 1px; height: 40px; background: rgba(255,255,255,.1); }

/* ── FEATURES ─────────────────────────────────────────────── */
.features { padding: 100px 0; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-title { font-size: clamp(1.8rem, 4vw, 3rem); color: #fff; margin: 16px 0 12px; }
.section-sub { color: var(--gray-400); font-size: 17px; max-width: 500px; margin: 0 auto; }
.features-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}
.feature-card { padding: 28px; }
.feature-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
.feature-title { font-size: 18px; color: #fff; margin-bottom: 10px; }
.feature-desc { color: var(--gray-400); font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
.feature-tags { display: flex; gap: 6px; flex-wrap: wrap; }

/* ── WORKFLOW ─────────────────────────────────────────────── */
.workflow { padding: 100px 0; background: rgba(15,31,61,.3); }
.workflow-steps {
  display: flex; gap: 0; flex-wrap: wrap;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px; overflow: hidden;
}
.workflow-step {
  flex: 1; min-width: 200px; padding: 32px 24px;
  border-right: 1px solid rgba(255,255,255,.06);
  position: relative;
  transition: background .2s;
}
.workflow-step:hover { background: rgba(37,99,235,.08); }
.workflow-step:last-child { border-right: none; }
.step-num { font-size: 40px; font-weight: 900; color: rgba(37,99,235,.3); font-family: var(--font-display); margin-bottom: 12px; }
.step-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.step-desc { font-size: 13px; color: var(--gray-400); line-height: 1.6; }

/* ── CLOUD BANNER ────────────────────────────────────────── */
.cloud-banner { padding: 100px 0; }
.cloud-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.cloud-text h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: #fff; margin-bottom: 20px; }
.cloud-text p { color: var(--gray-400); font-size: 16px; line-height: 1.8; margin-bottom: 28px; }
.cloud-badges { display: flex; gap: 8px; flex-wrap: wrap; }
.cloud-card {
  padding: 28px; border-radius: 16px;
  background: linear-gradient(135deg, rgba(26,58,107,.6), rgba(15,31,61,.8));
  border: 1px solid rgba(37,99,235,.3);
  box-shadow: 0 0 60px rgba(37,99,235,.15);
}
.cloud-row {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.06);
  font-size: 14px; color: var(--gray-200);
}
.dot-ok { width: 8px; height: 8px; background: var(--success); border-radius: 50%; box-shadow: 0 0 6px var(--success); flex-shrink: 0; }
.cloud-progress { margin-top: 20px; }
.cp-label { font-size: 12px; color: var(--gray-400); margin-bottom: 8px; }
.cp-bar { height: 8px; background: rgba(255,255,255,.1); border-radius: 4px; overflow: hidden; }
.cp-fill { height: 100%; background: linear-gradient(90deg, var(--brand-blue), var(--brand-cyan)); border-radius: 4px; transition: width 1s ease; }
.cp-pct { font-size: 13px; color: var(--brand-cyan); font-weight: 700; margin-top: 6px; }

/* ── CTA ─────────────────────────────────────────────────── */
.cta {
  padding: 120px 0; text-align: center;
  background: radial-gradient(ellipse at center, rgba(37,99,235,.12) 0%, transparent 70%);
}
.cta-title { font-size: clamp(2rem, 4.5vw, 3.5rem); color: #fff; margin-bottom: 20px; }
.cta-sub { color: var(--gray-400); font-size: 18px; margin-bottom: 40px; max-width: 500px; margin-inline: auto; }
.cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* ── FOOTER ──────────────────────────────────────────────── */
.footer { background: rgba(8,12,20,.8); border-top: 1px solid rgba(255,255,255,.06); padding: 60px 0 0; }
.footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; padding-bottom: 48px; }
.footer-desc { color: var(--gray-400); font-size: 13px; line-height: 1.7; margin-top: 12px; }
.footer-links { display: flex; flex-direction: column; gap: 12px; }
.footer-col-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-600); margin-bottom: 4px; }
.footer-links a { color: var(--gray-400); text-decoration: none; font-size: 14px; transition: color .15s; }
.footer-links a:hover { color: #fff; }
.footer-copy { border-top: 1px solid rgba(255,255,255,.06); padding: 20px 0; font-size: 13px; color: var(--gray-600); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .cloud-inner { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr; gap: 32px; }
  .workflow-steps { flex-direction: column; }
}
</style>
