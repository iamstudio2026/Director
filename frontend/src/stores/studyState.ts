import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/client'
import { useDebounceFn } from '@vueuse/core'

export const useStudyState = defineStore('studyState', () => {
  const fields = ref<Record<string, string>>({})
  const loading = ref(false)
  const isSaving = ref(false)
  const lastSavedAt = ref<Date | null>(null)
  
  const route = useRoute()

  // Auto-save logic (debounced 2s)
  const triggerAutoSave = useDebounceFn(async () => {
    const projectId = route.params.id as string
    if (!projectId) return

    isSaving.value = true
    try {
      await api.put(`/projects/${projectId}/state`, { fields: fields.value })
      lastSavedAt.value = new Date()
    } catch (e) {
      console.error('Error auto-saving state', e)
    } finally {
      isSaving.value = false
    }
  }, 2000)

  // Watch for ANY change in fields and trigger auto-save
  watch(fields, () => {
    if (!loading.value) {
      triggerAutoSave()
    }
  }, { deep: true })

  async function loadState(projectId: string) {
    loading.value = true
    try {
      const { data } = await api.get(`/projects/${projectId}/state`)
      fields.value = data.fields || {}
    } catch (e) {
      console.error('Error loading project state', e)
    } finally {
      loading.value = false
    }
  }

  function getField(key: string): string {
    return fields.value[key] || ''
  }

  function setField(key: string, value: string) {
    fields.value[key] = value
  }

  return {
    fields,
    loading,
    isSaving,
    lastSavedAt,
    loadState,
    getField,
    setField
  }
})
