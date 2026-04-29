export interface ModuleField {
  id: string
  label: string
  type: 'textarea' | 'text' | 'select' | 'info'
  placeholder?: string
  options?: { value: string, label: string }[]
  rows?: number
  help?: string
}

export interface ResearchModule {
  id: string
  title: string
  subtitle: string
  icon: string
  isDum?: boolean
  fields: ModuleField[]
  tplMin?: string
  tplMax?: string
}

export function useResearchModules() {
  const modules: ResearchModule[] = [
    {
      id: "DUM-0",
      title: "DUM-0 · Refinador de pregunta",
      subtitle: "Tu idea inicial → crítica + 3 preguntas refinadas (PICO/PECO).",
      icon: "❓",
      isDum: true,
      fields: [
        { id: "idea_inicial", label: "Idea o tema inicial (lo que tienes en mente)", type: "textarea", rows: 3, placeholder: "Ej: Quiero ver si hacer papanicolaou seguido sirve para..." },
        { id: "contexto", label: "Contexto / Ámbito (Opcional)", type: "text", placeholder: "Ej: Hospital San Juan de Dios, Tarija" }
      ],
      tplMax: `TAREA: Eres un metodólogo estricto. Analiza esta idea inicial: "{idea_inicial}". Contexto: "{contexto}".
1) CRÍTICA METODOLÓGICA: ¿Es viable? ¿Qué le falta para ser una pregunta PICO/PECO medible? (máximo 100 palabras).
2) 3 PREGUNTAS REFINADAS (no variaciones cosméticas — variantes con énfasis distintos: una de exactitud, una de impacto, una de equidad/contexto local cuando aplique). Cada una en formato PICO/PECO completo: tabla P | I/E | C | O | tipo de pregunta (etiología/Dx/terapéutica/pronóstica/descriptiva).
Responde en Markdown, sin preámbulos.`
    },
    {
      id: "DUM-1",
      title: "DUM-1 · Objetivos y Diseño",
      subtitle: "A partir de la pregunta elegida, deduce objetivos y el mejor diseño.",
      icon: "🎯",
      isDum: true,
      fields: [
        { id: "Q", label: "Pregunta PICO/PECO elegida (Cópiala del resultado anterior)", type: "textarea", rows: 3 }
      ],
      tplMax: `TAREA: A partir de esta pregunta de investigación: "{Q}", genera:
1) OBJETIVO GENERAL: Verbo en infinitivo + qué + en quiénes + dónde/cuándo.
2) OBJETIVOS ESPECÍFICOS: 3 a 4 objetivos que desagreguen el general (operacionalizan la P, la I, la C y la O).
3) PROPUESTA DE DISEÑO: ¿Cuál es el diseño epidemiológico ideal para responder esto? (Ej. Cohorte, Transversal, Ensayo, Revisión Sistemática). Justifica en 1 línea.
4) VARIABLES PRINCIPALES: Lista de 3 variables independientes y 1 dependiente deducidas de la pregunta.`
    },
    {
      id: "DUM-2",
      title: "DUM-2 · Constructor PICO Estricto",
      subtitle: "Define los 4 elementos exactos para el resto de la app.",
      icon: "🔬",
      isDum: true,
      fields: [
        { id: "Q", label: "Pregunta Definitiva", type: "textarea", rows: 2 },
        { id: "PICO_P", label: "P - Población / Pacientes", type: "textarea", rows: 2, placeholder: "Ej: Mujeres de 30-65 años con ASC-US..." },
        { id: "PICO_I", label: "I / E - Intervención o Exposición", type: "textarea", rows: 2, placeholder: "Ej: Triaje con test de VPH de alto riesgo" },
        { id: "PICO_C", label: "C - Comparador", type: "textarea", rows: 2, placeholder: "Ej: Repetición de citología a los 6 meses" },
        { id: "PICO_O", label: "O - Desenlace (Outcome)", type: "textarea", rows: 2, placeholder: "Ej: Detección de NIC2+ confirmada por biopsia" }
      ],
      tplMin: `Verifica si los elementos PICO ({PICO_P}, {PICO_I}, {PICO_C}, {PICO_O}) son perfectamente coherentes con la pregunta: "{Q}". Si hay desconexión, avísame. Si está bien, dime "PICO OK".`
    },
    {
      id: "DUM-3",
      title: "DUM-3 · Selección de Modalidad",
      subtitle: "Define la modalidad del trabajo (Primario, Revisión, etc).",
      icon: "📐",
      isDum: true,
      fields: [
        { 
          id: "modality", 
          label: "Modalidad de Investigación", 
          type: "select",
          options: [
            { value: "umbrella", label: "Umbrella Review (Revisión de Revisiones)" },
            { value: "systematic_review", label: "Revisión Sistemática (con/sin Meta-análisis)" },
            { value: "primary", label: "Estudio Primario (Transversal, Casos-Ctrl, Cohorte)" },
            { value: "scoping", label: "Scoping Review (Revisión Exploratoria)" },
            { value: "other", label: "Otro (Casos clínicos, Narrativa, etc)" }
          ]
        }
      ]
    }
  ]

  function getModuleById(id: string): ResearchModule | undefined {
    return modules.find(m => m.id === id)
  }

  return { modules, getModuleById }
}
