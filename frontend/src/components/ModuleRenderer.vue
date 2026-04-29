<template>
  <div class="module-renderer card">
    <div class="mr-header">
      <div class="mr-icon">{{ module.icon }}</div>
      <div>
        <h2 class="mr-title">{{ module.title }}</h2>
        <p class="mr-subtitle">{{ module.subtitle }}</p>
      </div>
    </div>

    <div class="mr-body">
      <div v-for="field in module.fields" :key="field.id" class="form-group">
        <label class="form-label">{{ field.label }}</label>
        
        <template v-if="field.type === 'textarea'">
          <textarea 
            class="input-field" 
            :rows="field.rows || 3" 
            :placeholder="field.placeholder"
            :value="studyState.getField(field.id)"
            @input="e => updateField(field.id, (e.target as HTMLTextAreaElement).value)"
          ></textarea>
        </template>
        
        <template v-else-if="field.type === 'select'">
          <select 
            class="input-field" 
            :value="studyState.getField(field.id)"
            @change="e => updateField(field.id, (e.target as HTMLSelectElement).value)"
          >
            <option value="" disabled>Selecciona una opción...</option>
            <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </template>
        
        <template v-else-if="field.type === 'text'">
          <input 
            type="text" 
            class="input-field" 
            :placeholder="field.placeholder"
            :value="studyState.getField(field.id)"
            @input="e => updateField(field.id, (e.target as HTMLInputElement).value)"
          />
        </template>
      </div>
    </div>

    <div class="mr-footer" v-if="module.tplMin || module.tplMax">
      <PromptViewer :module="module" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudyState } from '@/stores/studyState'
import type { ResearchModule } from '@/composables/useResearchModules'
import PromptViewer from './PromptViewer.vue'

defineProps<{ module: ResearchModule }>()

const studyState = useStudyState()

function updateField(key: string, value: string) {
  studyState.setField(key, value)
}
</script>

<style scoped>
.mr-header { display: flex; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
.mr-icon { font-size: 32px; background: rgba(255,255,255,.05); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
.mr-title { font-size: 20px; color: #fff; margin-bottom: 4px; }
.mr-subtitle { font-size: 13px; color: var(--gray-400); }

.mr-body { display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; }
.form-label { font-size: 13px; font-weight: 600; color: var(--gray-400); margin-bottom: 8px; }

.mr-footer { margin-top: 32px; padding-top: 24px; border-top: 1px dashed rgba(255,255,255,.1); }
</style>
