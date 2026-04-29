<template>
  <div class="prompt-viewer">
    <div class="pv-header">
      <h3 class="pv-title">🚀 Prompt Generado</h3>
      <div class="pv-actions">
        <select v-model="compressLevel" class="input-field select-sm" @change="generate">
          <option value="detailed">Nivel: Detallado (Contexto completo)</option>
          <option value="standard">Nivel: Estándar</option>
          <option value="minimal">Nivel: Mínimo (Ahorro tokens)</option>
        </select>
        <button class="btn btn-primary btn-sm" @click="copyPrompt" :class="{ 'copied': isCopied }">
          {{ isCopied ? '¡Copiado!' : 'Copiar al portapapeles' }}
        </button>
      </div>
    </div>
    
    <div class="prompt-box">
      <pre>{{ currentPrompt }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { usePromptGenerator } from '@/composables/usePromptGenerator'
import type { ResearchModule } from '@/composables/useResearchModules'
import { useStudyState } from '@/stores/studyState'

const props = defineProps<{ module: ResearchModule }>()
const promptGen = usePromptGenerator()
const studyState = useStudyState()

const compressLevel = ref<'detailed'|'standard'|'minimal'>('standard')
const currentPrompt = ref('')
const isCopied = ref(false)

function generate() {
  // Use tplMax as default if available, otherwise tplMin
  const template = props.module.tplMax || props.module.tplMin || ''
  currentPrompt.value = promptGen.generatePrompt(template, compressLevel.value)
}

async function copyPrompt() {
  generate() // ensure it's up to date
  try {
    await navigator.clipboard.writeText(currentPrompt.value)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
    
    // Save to history
    await promptGen.savePromptHistory(props.module.id, currentPrompt.value, compressLevel.value)
  } catch (err) {
    console.error('Failed to copy: ', err)
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = currentPrompt.value
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      isCopied.value = true
      setTimeout(() => { isCopied.value = false }, 2000)
      promptGen.savePromptHistory(props.module.id, currentPrompt.value, compressLevel.value)
    } catch (errFallback) {
      alert("Error al copiar al portapapeles.")
    }
    document.body.removeChild(textArea)
  }
}

// Re-generate if study state changes or module changes
watch(() => studyState.fields, generate, { deep: true })
watch(() => props.module, generate)
onMounted(generate)

</script>

<style scoped>
.pv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 12px; }
.pv-title { font-size: 14px; color: var(--brand-cyan); font-weight: 700; margin: 0; }
.pv-actions { display: flex; gap: 8px; }
.select-sm { padding: 4px 8px; font-size: 12px; height: 30px; width: auto; background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.1); }

.prompt-box {
  background: var(--gray-950); border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--r-md); padding: 16px;
  position: relative; overflow: hidden;
}
.prompt-box pre {
  margin: 0; white-space: pre-wrap; font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 13px; color: var(--gray-200); line-height: 1.6;
}

.btn.copied { background: var(--success); box-shadow: 0 0 10px rgba(16,185,129,.4); }
</style>
