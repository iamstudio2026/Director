import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/client'

export interface Project {
  id: string
  title: string
  description: string | null
  modality: string | null
  updated_at: string
}

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const loading = ref(false)

  async function fetchProjects() {
    loading.value = true
    try {
      const { data } = await api.get('/projects')
      projects.value = data
    } finally {
      loading.value = false
    }
  }

  async function createProject(title: string, description?: string, modality?: string): Promise<string | null> {
    try {
      const { data } = await api.post('/projects', { title, description, modality })
      await fetchProjects()
      return data.id
    } catch {
      return null
    }
  }

  async function loadProject(id: string) {
    try {
      const { data } = await api.get(`/projects/${id}`)
      currentProject.value = data
      return true
    } catch {
      return false
    }
  }

  return { projects, currentProject, loading, fetchProjects, createProject, loadProject }
})
