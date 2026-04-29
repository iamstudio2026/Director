import { useStudyState } from '@/stores/studyState'
import { useRoute } from 'vue-router'
import api from '@/api/client'

export function usePromptGenerator() {
  const studyState = useStudyState()
  const route = useRoute()

  // Equivalent to compressTxt from original HTML
  function compressTxt(text: string, maxLen: number): string {
    if (!text) return ""
    let c = text.replace(/\s+/g, " ").trim()
    return c.length > maxLen ? c.substring(0, maxLen - 3) + "..." : c
  }

  function getGlobalContext(level: 'minimal' | 'detailed' | 'standard'): string {
    const q = studyState.getField('Q') || ''
    const mod = studyState.getField('modality') || ''
    const pp = studyState.getField('PICO_P') || ''
    const pi = studyState.getField('PICO_I') || ''
    const pc = studyState.getField('PICO_C') || ''
    const po = studyState.getField('PICO_O') || ''

    if (level === 'minimal') {
      const pico_min = (pp || po) ? ` | P:${compressTxt(pp, 40)} O:${compressTxt(po, 40)}` : ''
      return `[CTX] Q: ${q || "—"} | Mod: ${mod}${pico_min}`.trim()
    } 
    else if (level === 'detailed') {
      const pico = (pp || pi || pc || po) 
        ? `• P (Población): ${compressTxt(pp, 140) || "—"}\n  • I/E (Interv/Expos): ${compressTxt(pi, 140) || "—"}\n  • C (Comparador): ${compressTxt(pc, 120) || "—"}\n  • O (Desenlace): ${compressTxt(po, 140) || "—"}`
        : "  • PICO/PECO no definido"
      return `CONTEXTO GLOBAL DEL ESTUDIO:\n• Modalidad: ${mod || "—"}\n• Pregunta (Q): ${q || "—"}\n• PICO/PECO:\n  ${pico}`
    }
    else {
      // standard
      const pico = (pp || pi || pc || po)
        ? `P:${compressTxt(pp, 70)} | I/E:${compressTxt(pi, 70)} | C:${compressTxt(pc, 60)} | O:${compressTxt(po, 70)}`
        : ""
      return `[CTX] Q: ${q || "—"} | Mod: ${mod} ${pico ? `| PICO: ${pico}` : ""}`.trim()
    }
  }

  function generatePrompt(template: string, level: 'minimal' | 'detailed' | 'standard' = 'standard'): string {
    let result = template

    // Inject module fields
    const matches = result.match(/\{([^}]+)\}/g)
    if (matches) {
      matches.forEach(match => {
        const key = match.slice(1, -1)
        const val = studyState.getField(key) || `[Falta ${key}]`
        result = result.replace(match, val)
      })
    }

    // Inject global context at the beginning if required
    const ctx = getGlobalContext(level)
    return `${ctx}\n\n${result}`
  }

  async function savePromptHistory(moduleKey: string, promptText: string, compressLevel: string) {
    const projectId = route.params.id as string
    if (!projectId) return

    try {
      await api.post(`/projects/${projectId}/prompts`, {
        module_key: moduleKey,
        prompt_text: promptText,
        compress_level: compressLevel
      })
    } catch (e) {
      console.error('Failed to save prompt history', e)
    }
  }

  return { generatePrompt, savePromptHistory }
}
