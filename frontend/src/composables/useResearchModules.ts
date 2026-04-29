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
    },
    {
      id: "C1-A",
      title: "C1-A · Tema",
      subtitle: "Definición operativa del tema.",
      icon: "📌",
      fields: [
        { id: "foco", label: "Foco temático", type: "text", placeholder: "Ej: Diagnóstico oportuno de cáncer cervicouterino" },
        { id: "ESPECIALIDAD", label: "Especialidad o disciplina", type: "text", placeholder: "Ej: Salud Pública / Ginecología" }
      ],
      tplMax: `ROL: Redactor científico de la especialidad.
TAREA: Sección 1.1 TEMA (260–340 palabras). Anclar el foco "{foco}" al campo disciplinar de {ESPECIALIDAD}: definición operativa breve, magnitud global y regional (Bolivia/LATAM cuando exista evidencia), por qué es un tema actual y por qué pertenece al ámbito clínico-académico de la especialidad. Citar 4–6 fuentes del corpus (Apellido-año, ID) con datos numéricos cuando existan.
REGLAS: voz impersonal, 0 opiniones personales, 0 generalizaciones sin cita. Cada afirmación cuantitativa debe tener fuente. Cierre con una frase que articule el foco con la pregunta, sin enunciarla aún.`,
      tplMin: `Sección 1.1 TEMA, 200–260 palabras, foco: {foco}, 4 fuentes del corpus, cierre conectado a la pregunta sin enunciarla.`
    },
    {
      id: "C1-B",
      title: "C1-B · Problema",
      subtitle: "Plantea brecha y magnitud.",
      icon: "🧩",
      fields: [
        { id: "brecha", label: "Brecha conocida (lo que NO se sabe)", type: "textarea", rows: 3 },
        { id: "VENTANA_TEMP", label: "Ventana temporal de búsqueda", type: "text", placeholder: "Ej: últimos 5 años (2019-2024)" }
      ],
      tplMax: `ROL: Epidemiólogo redactor con experiencia en revistas de salud pública.
TAREA: Redactar la sección 1.2 PLANTEAMIENTO DEL PROBLEMA (420–540 palabras) con la estructura clásica que exigen comités de ética.

ESTRUCTURA EN CINCO DIMENSIONES (cada una en un párrafo propio, citado):
1) MAGNITUD: incidencia/prevalencia globales y regionales, con cifras y ventana {VENTANA_TEMP}.
2) TRASCENDENCIA clínica: morbi-mortalidad, calidad de vida, costo-efectividad.
3) VULNERABILIDAD: ¿es intervenible el problema? Estado actual de la evidencia.
4) FACTIBILIDAD del estudio: disponibilidad de datos, infraestructura, plazos, recursos.
5) BRECHA conocida: "{brecha}". Articular esta brecha con lo reportado identificando con precisión qué es lo NO esclarecido.

CIERRE: la PREGUNTA literal sin reformular.`,
      tplMin: `Sección 1.2 PROBLEMA, 260–320 palabras, 4 dimensiones (magnitud/trascendencia/vulnerabilidad/factibilidad), brecha: {brecha}, 5 fuentes, cierre con pregunta literal.`
    },
    {
      id: "C1-C",
      title: "C1-C · Pregunta e Hipótesis",
      subtitle: "Pregunta PICO + hipótesis si aplica.",
      icon: "🤔",
      fields: [],
      tplMax: `ROL: Metodólogo senior, redactor de protocolos.
TAREA: Redactar la sección 1.3 PREGUNTA E HIPÓTESIS.

BLOQUE 1 — PREGUNTA (180–250 palabras):
• Enunciar literalmente la pregunta, sin parafrasear.
• Tabla de descomposición PICO/PECO con columnas: componente | definición operativa | escala/medida | fuente | criterios.

BLOQUE 2 — HIPÓTESIS (150–250 palabras):
• Si la modalidad lo permite (primario/RS-MA): formular H₀ y H₁.
• Si la modalidad NO lo permite (umbrella, scoping): declarar 'estudio descriptivo-sintético'.

BLOQUE 3 — JUSTIFICACIÓN DEL DESGLOSE (150–200 palabras):
• Por qué este desglose responde con precisión al problema.`,
      tplMin: `Sección 1.3 PREGUNTA E HIPÓTESIS. Enuncia Q + tabla PICO mínima (P,I,C,O) + H₀/H₁ si aplica. 200 palabras.`
    },
    {
      id: "C1-D",
      title: "C1-D · Objetivos",
      subtitle: "General + Específicos.",
      icon: "🎯",
      fields: [],
      tplMax: `ROL: Metodólogo.
TAREA: Sección 1.4 OBJETIVOS, redactados como compromisos de la tesis.
GENERAL: una sola oración que operacionalice la pregunta, verbo medible.
ESPECÍFICOS: 3–5, cada uno cubriendo un componente PICO/PECO o desenlace, con verbo medible, sujeto y delimitación temporal. Tabla: # | objetivo | componente PICO/PECO | desenlace medible | método previsto.
VALIDACIÓN: cada objetivo específico debe corresponder a una variable, una técnica y un análisis.`,
      tplMin: `Sección 1.4 OBJETIVOS. General (1) + 3-5 específicos. Tabla: # | objetivo | componente PICO | desenlace | método. Sin justificación extensa.`
    },
    {
      id: "C1-E",
      title: "C1-E · Justificación",
      subtitle: "Relevancia + viabilidad.",
      icon: "⚖️",
      fields: [
        { id: "POPULATION", label: "Ámbito/Población objetivo para justificar factibilidad", type: "text", placeholder: "Ej: Tarija, Bolivia" }
      ],
      tplMax: `ROL: Redactor científico crítico.
TAREA: Sección 1.5 JUSTIFICACIÓN (350–450 palabras) en cinco ejes:
(a) PERTINENCIA CLÍNICA en {ESPECIALIDAD},
(b) VACÍO DE EVIDENCIA documentado,
(c) FACTIBILIDAD metodológica y ética dado el ámbito {POPULATION},
(d) IMPACTO esperado en práctica, formación o investigación,
(e) ALINEAMIENTO con prioridades sanitarias regionales.
Debe responder explícitamente '¿por qué este estudio, ahora, en este lugar y con esta modalidad?'. Cierre con una sentencia que conecte la justificación con los objetivos específicos.`,
      tplMin: `Sección 1.5 JUSTIFICACIÓN, 280–360 palabras, 5 ejes (clínica/vacío/factibilidad/impacto/alineación), 4 fuentes. Cierre articulando con objetivos.`
    },
    {
      id: "C2-A",
      title: "C2-A · Antecedentes",
      subtitle: "Estado del arte focalizado.",
      icon: "📚",
      fields: [],
      tplMax: `ROL: Revisor sistemático experto en redacción de marcos teóricos para revistas Q1.
TAREA: Sección 2.1 ANTECEDENTES (900–1200 palabras), con organización CRONOLÓGICA + TEMÁTICA cruzada.

ESTRUCTURA OBLIGATORIA:
1) PARRÁFO INTRODUCTORIO: mapa del estado del arte, qué se sabe / qué se discute / qué falta.
2) BLOQUES TEMÁTICOS (3-5 bloques de 180-260 palabras), uno por subpregunta o componente PICO/PECO. Organización cronológica: fundacionales → ampliaciones → controversias → última evidencia.
3) BLOQUE LATINOAMERICANO/BOLIVIANO: al menos 2-3 estudios regionales si existen; si no, declarar la ausencia y justificar por qué este estudio agrega valor.
4) PARRÁFO DE SÍNTESIS Y VACÍO: identificar el vacío con verbos precisos y anunciar cómo contribuye a cerrarlo.`,
      tplMin: `Antecedentes 2.1, 500–650 palabras, organización cronológica + temática, 8-10 fuentes, cierre identificando vacío.`
    },
    {
      id: "C2-B",
      title: "C2-B · Bases Teóricas",
      subtitle: "Marcos conceptuales.",
      icon: "🏗️",
      fields: [
        { id: "teorias", label: "Teorías clave", type: "text", placeholder: "Ej: Modelo de creencias en salud, Historia natural de VPH" }
      ],
      tplMax: `ROL: Teórico-metodólogo.
TAREA: Sección 2.2 BASES TEÓRICAS (500–700 palabras) sobre {teorias}. Para cada constructo: definición operativa, autores fundacionales, conexión explícita con UNA variable del estudio.
Tabla constructo | autor(es) | definición | variable enlazada.
REGLAS: cada teoría incluida debe tener correlato con un objetivo o variable; teorías ornamentales se descartan.`,
      tplMin: `Bases teóricas 2.2, 380–500 palabras sobre {teorias}. Tabla constructo|autor|definición|variable. Mínimo 6 fuentes.`
    },
    {
      id: "C2-C",
      title: "C2-C · Definiciones",
      subtitle: "Glosario operativo.",
      icon: "📖",
      fields: [],
      tplMax: `ROL: Lexicógrafo académico.
TAREA: Sección 2.3 DEFINICIÓN DE TÉRMINOS. Glosario operativo de 12–18 términos clave del estudio (no diccionario general): término | definición operativa para este estudio | sinónimos/equivalentes MeSH-DeCS | fuente.
REGLAS: privilegiar términos que aparecen en la pregunta, los objetivos y las variables. Definiciones congruentes con las usadas en el resto del manuscrito.`,
      tplMin: `Glosario 2.3 con 10–14 términos: definición operativa | sinónimos MeSH/DeCS | fuente. Solo términos de Q, objetivos o variables.`
    },
    {
      id: "C3-A",
      title: "C3-A · Tipo y diseño",
      subtitle: "Argumenta diseño según modalidad.",
      icon: "🔬",
      fields: [],
      tplMax: `ROL: Metodólogo senior con experiencia en publicación de protocolos.
TAREA: Sección 3.1 TIPO Y DISEÑO (380–520 palabras) con la fundamentación que exige un comité editorial.

ESTRUCTURA:
1) TIPO DE ESTUDIO: clasificación primaria. Justificar por qué este tipo responde mejor a la pregunta.
2) DISEÑO ESPECÍFICO: subtipo. Justificar trade-offs.
3) ALCANCE: descriptivo / correlacional / explicativo / predictivo / prescriptivo. Coherencia con el verbo del objetivo general.
4) TEMPORALIDAD: prospectivo, retrospectivo, transversal, longitudinal, mixto.
5) ENFOQUE: cuantitativo, cualitativo, mixto. Justificar.
6) REPORTING CHECKLIST OBLIGATORIO: PRISMA 2020 / STROBE / CONSORT / etc.
7) REGISTRO DEL PROTOCOLO: PROSPERO u OSF.`,
      tplMin: `Sección 3.1 TIPO Y DISEÑO, 220–280 palabras, justifica diseño y reporting checklist (PRISMA/PRIOR/STROBE/CONSORT/STARD según corresponda).`
    },
    {
      id: "C3-B",
      title: "C3-B · Ámbito y período",
      subtitle: "Tiempo y lugar.",
      icon: "🌍",
      fields: [
        { id: "lugar", label: "Lugar", type: "text" },
        { id: "periodo", label: "Periodo", type: "text" },
        { id: "VENTANA_TEMP", label: "Ventana temporal", type: "text", placeholder: "Ej: últimos 5 años" },
        { id: "IDIOMAS", label: "Idiomas permitidos", type: "text", placeholder: "Ej: Inglés y Español" }
      ],
      tplMax: `ROL: Metodólogo.
TAREA: Sección 3.2 ÁMBITO Y PERÍODO. Para estudios primarios: institución(es), nivel de atención, área geográfica de "{lugar}", periodo "{periodo}", representatividad y trazabilidad de la fuente de datos. Para revisiones: ventana temporal del corpus = {VENTANA_TEMP}, idiomas = {IDIOMAS}, bases consultadas. Sub-tabla: ámbito | criterios de inclusión espacial/temporal | justificación.
Incluir consideraciones de transferibilidad de resultados.`,
      tplMin: `Sección 3.2 ÁMBITO Y PERÍODO. Para primarios: lugar={lugar}, periodo={periodo}. Para revisiones: ventana {VENTANA_TEMP}, idiomas {IDIOMAS}. Tabla compacta.`
    },
    {
      id: "C3-C",
      title: "C3-C · Universo/Muestra",
      subtitle: "Cálculo y representatividad.",
      icon: "👥",
      fields: [
        { id: "n", label: "n estimado", type: "text" },
        { id: "metodo_n", label: "Método de cálculo", type: "text", placeholder: "Ej: Fórmula para proporciones" }
      ],
      tplMax: `ROL: Metodólogo cuantitativo.
TAREA: Sección 3.3 UNIVERSO/POBLACIÓN/MUESTRA.
ESTUDIOS PRIMARIOS: definir universo, marco muestral, n estimado = {n} con método de cálculo "{metodo_n}" — incluir fórmula utilizada, parámetros, supuestos y software.
REVISIONES: definir el corpus elegible, la unidad de análisis (estudio, paciente, comparación), el número mínimo y máximo previsto de fuentes.
DECLARAR los riesgos de sesgo de muestreo y cómo se controlarán.`,
      tplMin: `Sección 3.3 UNIVERSO/MUESTRA. Define población, marco, n={n}, método={metodo_n}, parámetros, software. Tabla parámetros.`
    },
    {
      id: "C3-D",
      title: "C3-D · Criterios I/E",
      subtitle: "Criterios de inclusión/exclusión.",
      icon: "✅",
      fields: [
        { id: "MOD_CRIT", label: "Criterios de modalidad (opcional)", type: "textarea", rows: 2 },
        { id: "IDIOMAS", label: "Idiomas", type: "text" },
        { id: "VENTANA_TEMP", label: "Ventana temporal", type: "text" }
      ],
      tplMax: `ROL: Metodólogo senior responsable de protocolos para PROSPERO/OSF.
TAREA: Redactar la sección 3.4 CRITERIOS DE INCLUSIÓN/EXCLUSIÓN con auditabilidad.

INSUMO: criterios sugeridos: {MOD_CRIT}.

ENTREGABLE 1 — LISTA DEFINITIVA: mínimo 7 inclusión + 7 exclusión, verificables.
ENTREGABLE 2 — TABLA AUDITABLE: # | criterio | tipo (I/E) | DURO o AJUSTABLE | método de verificación.
ENTREGABLE 3 — DECLARACIONES:
• idiomas: {IDIOMAS}.
• ventana: {VENTANA_TEMP}.
• exclusión por sesgo, duplicados, literatura gris.`,
      tplMin: `Sección 3.4 CRITERIOS I/E. Mínimo 5+5 criterios verificables. Tabla: # | criterio | tipo | duro/ajustable | método de verificación.`
    },
    {
      id: "C3-E",
      title: "C3-E · Variables",
      subtitle: "Tabla de operacionalización.",
      icon: "📊",
      fields: [
        { id: "MAIN_VARIABLES", label: "Variables principales", type: "textarea", rows: 3 }
      ],
      tplMax: `ROL: Metodólogo.
TAREA: Sección 3.5 OPERACIONALIZACIÓN DE VARIABLES. Tabla EXTENSA: código | variable | tipo (cualitativa/cuantitativa) | unidad | indicador | fuente | rol | objetivo al que sirve.
Mínimo 8 variables alineadas con {MAIN_VARIABLES} y objetivos específicos. Indicar valor de referencia.`,
      tplMin: `Sección 3.5 VARIABLES. Tabla mínima 8 filas: código | variable | tipo | escala | indicador | fuente | rol | objetivo enlazado. Alineadas a {MAIN_VARIABLES}.`
    },
    {
      id: "C3-F",
      title: "C3-F · Técnicas e Instrumentos",
      subtitle: "Recolección + validación.",
      icon: "🧪",
      fields: [],
      tplMax: `ROL: Metodólogo de campo.
TAREA: Sección 3.6 TÉCNICAS E INSTRUMENTOS. Por cada técnica: descripción, instrumento, validación previa, capacitación de operadores, control de calidad, prueba piloto.
PARA REVISIONES: planilla de extracción, software (Rayyan/Covidence), doble revisor, mecanismo de discrepancias.
Incluir tabla técnica | instrumento | validación | observaciones.`,
      tplMin: `Sección 3.6 TÉCNICAS E INSTRUMENTOS. Para cada técnica: instrumento | validación | control. Para revisiones: planilla extracción + software + doble revisor.`
    },
    {
      id: "C3-G",
      title: "C3-G · Plan de análisis",
      subtitle: "Plan estadístico/metaanalítico.",
      icon: "📈",
      fields: [
        { id: "software", label: "Software Estadístico", type: "text", placeholder: "Ej: R, SPSS, Stata" }
      ],
      tplMax: `ROL: Bioestadístico senior.
TAREA: Sección 3.7 PLAN DE ANÁLISIS exhaustivo, alineado uno-a-uno con objetivos y variables.
ESTRUCTURA OBLIGATORIA:
A) ANÁLISIS DESCRIPTIVO
B) ANÁLISIS BIVARIADO
C) ANÁLISIS MULTIVARIADO O METAANALÍTICO
D) MANEJO DE DATOS FALTANTES
E) ANÁLISIS DE SENSIBILIDAD
F) SUBGRUPOS
G) SESGO DE PUBLICACIÓN (si MA)
H) GRADACIÓN DE EVIDENCIA (GRADE)
I) SOFTWARE Y REPRODUCIBILIDAD ({software})
TABLA OBJETIVO×ANÁLISIS.`,
      tplMin: `Sección 3.7 PLAN DE ANÁLISIS. Por objetivo: desenlace | métrica | prueba | software ({software}). Heterogeneidad y sensibilidad si MA.`
    },
    {
      id: "C3-H",
      title: "C3-H · Ética",
      subtitle: "Consentimiento y aprobaciones.",
      icon: "🛡️",
      fields: [],
      tplMax: `ROL: Ético clínico.
TAREA: Sección 3.8 ASPECTOS ÉTICOS. Marco: Helsinki + CIOMS + Resolución Ministerial.
Para estudios primarios: riesgo del estudio, consentimiento informado, confidencialidad, anonimización.
Para revisiones: uso exclusivo de datos publicados, conflictos de interés, declaración de uso de IA.
Incluir checklist de 10 ítems éticos.`,
      tplMin: `Sección 3.8 ÉTICA. Marco (Helsinki/CIOMS), riesgo, consentimiento, confidencialidad. Para revisiones: solo datos publicados. Checklist 8 ítems.`
    },
    {
      id: "C3-I",
      title: "C3-I · Cronograma",
      subtitle: "Diagrama Gantt textual.",
      icon: "📅",
      fields: [
        { id: "meses", label: "Meses totales", type: "text" }
      ],
      tplMax: `ROL: Gestor de proyecto.
TAREA: Sección 3.9 CRONOGRAMA. Plan de {meses} meses con fases: protocolo · estrategia · cribado · extracción · síntesis · redacción · defensa.
Devolver tabla mes×actividad (1..{meses}) con celdas marcadas. Incluir HITOS críticos. Indicar holguras y dependencias críticas.`,
      tplMin: `Sección 3.9 CRONOGRAMA en {meses} meses. Tabla mes×actividad con hitos críticos.`
    },
    {
      id: "C3-J",
      title: "C3-J · Presupuesto",
      subtitle: "Costos detallados.",
      icon: "💰",
      fields: [
        { id: "moneda", label: "Moneda", type: "text", placeholder: "Ej: Bolivianos (Bs)" }
      ],
      tplMax: `ROL: Administrador del estudio.
TAREA: Sección 3.10 PRESUPUESTO en {moneda}. Rubros: recursos humanos, materiales, software, publicación open access, traducción, viáticos.
Tabla: rubro | unidad | cantidad | costo unitario | costo total | fuente de financiamiento. Total general en numérico y en letras.`,
      tplMin: `Sección 3.10 PRESUPUESTO en {moneda}. Tabla rubro|unidad|cantidad|c.unit|total|fuente. Total general.`
    },
    {
      id: "M0",
      title: "M0 · Algoritmos de búsqueda",
      subtitle: "Strings por base.",
      icon: "🔍",
      fields: [
        { id: "bases", label: "Bases de datos (PubMed, Scopus, etc.)", type: "text" },
        { id: "IDIOMAS", label: "Idiomas", type: "text" },
        { id: "VENTANA_TEMP", label: "Ventana temporal", type: "text" }
      ],
      tplMax: `ROL: Bibliotecólogo médico (PRESS-certified) + metodólogo de RS.
TAREA: Estrategia de búsqueda EXHAUSTIVA para cada base solicitada en {bases}, con la calidad que exigen Cochrane y JBI.
ESTRUCTURA POR BASE:
1) MAPEO DE TÉRMINOS CONTROLADOS (MeSH, Emtree, etc.).
2) BLOQUES BOOLEANOS (P, I, C, O cuando aplique).
3) FILTROS: Idioma: {IDIOMAS}. Ventana: {VENTANA_TEMP}.
4) STRINGS COMPLETOS POR BASE — listos para pegar.
5) REGISTRO DE EJECUCIÓN — tabla de control.
6) PROTOCOLO PRESS auto-aplicado.`,
      tplMin: `Strings booleanos por base ({bases}) con MeSH/Emtree. Tabla base|string|filtros|hits|fecha. Una versión PRESS adjunta.`
    },
    {
      id: "AP-1",
      title: "AP-1 · Onboarding del corpus",
      subtitle: "Estructura para NotebookLM.",
      icon: "📥",
      fields: [],
      tplMax: `ROL: Curador de evidencia.
TAREA: ONBOARDING DEL CORPUS en NotebookLM. Diseñar la organización: (a) nomenclatura, (b) etiquetas obligatorias, (c) tarjeta-resumen por fuente con campos: objetivo • diseño • población • intervención • desenlace • efecto principal • limitaciones.
ENTREGABLES: (1) tabla del corpus, (2) plantilla de tarjeta, (3) protocolo de actualización del corpus.`,
      tplMin: `Onboarding NotebookLM: nomenclatura, etiquetas obligatorias, plantilla de tarjeta-resumen por fuente. Tabla compacta.`
    },
    {
      id: "AP-2",
      title: "AP-2 · Clasificación + Paleta",
      subtitle: "Sistema de etiquetas/colores.",
      icon: "🎨",
      fields: [],
      tplMax: `ROL: Diseñador de información.
TAREA: CLASIFICACIÓN + PALETA. Crear sistema de etiquetas y colores reproducible: por tipo de estudio, por subpregunta PICO/PECO, por desenlace, por calidad.
ENTREGABLES: (a) tabla etiqueta | color (HEX) | regla de asignación | ejemplo, (b) leyenda visual.`,
      tplMin: `Paleta + clasificación. Tabla etiqueta|color HEX|regla|ejemplo. Regla de prioridad cuando hay solapamientos.`
    },
    {
      id: "PRISMA",
      title: "PRISMA · Texto del flujo",
      subtitle: "Genera narrativa + Mermaid.",
      icon: "🔄",
      fields: [
        { id: "ID", label: "Registros identificados", type: "number" },
        { id: "DUP", label: "Duplicados eliminados", type: "number" },
        { id: "SCR", label: "Cribados (título/resumen)", type: "number" },
        { id: "INC", label: "Estudios incluidos", type: "number" }
      ],
      tplMax: `ROL: Editor de reporting PRISMA 2020.
TAREA: Generar la NARRATIVA del flujo PRISMA 2020 con cifras: identificados={ID}, duplicados={DUP}, cribados={SCR}, incluidos={INC}.
NARRATIVA en estilo Métodos/Resultados, con etapas explícitas, fuentes y decisiones de exclusión documentadas. Acompañar de un diagrama Mermaid (flowchart TD) coherente con esos números, incluyendo tres carriles (registros, cribado, incluidos).`,
      tplMin: `Narrativa PRISMA 2020 con cifras: ID={ID}, DUP={DUP}, SCR={SCR}, INC={INC}. + Mermaid.`
    },
    {
      id: "M1-A",
      title: "M1-A · Marco diagnóstico",
      subtitle: "Hilos teóricos para Dx.",
      icon: "🩺",
      fields: [],
      tplMax: `ROL: Metodólogo en pruebas diagnósticas.
TAREA: MARCO TEÓRICO DIAGNÓSTICO (450–600 palabras). Estructura: (a) definición operativa, (b) prueba índice, (c) estándar de referencia, (d) diseños aptos, (e) métricas (Sn, Sp, VPP, VPN, AUC), (f) fuentes de heterogeneidad, (g) sesgos típicos.
CITAR 6–10 fuentes del corpus.`,
      tplMin: `Marco diagnóstico, 350–450 palabras, 6 fuentes. Estructura: definición Dx, prueba índice, gold std, métricas (Sn/Sp/AUC/LR), heterogeneidad, sesgos.`
    },
    {
      id: "M1-B",
      title: "M1-B · Marco prevalencia",
      subtitle: "Hilos teóricos para PREV.",
      icon: "👥",
      fields: [],
      tplMax: `ROL: Epidemiólogo.
TAREA: MARCO PARA REVISIÓN DE PREVALENCIA (450–600 palabras). Estructura: definición de caso, periodos, denominadores válidos, ajustes, métricas, fuentes de variación esperada, sesgos (selección, no respuesta), manejo de la heterogeneidad.
CITAR 6–10 fuentes del corpus.`,
      tplMin: `Marco prevalencia, 350–450 palabras, 6 fuentes. Definición de caso, denominadores, ajustes, métricas, fuentes de variación, sesgos.`
    },
    {
      id: "M1-C",
      title: "M1-C · Marco factores",
      subtitle: "Hilos teóricos para FACTORES.",
      icon: "🔗",
      fields: [],
      tplMax: `ROL: Epidemiólogo causal.
TAREA: MARCO PARA FACTORES ASOCIADOS (500–700 palabras). Modelos causales (DAG con notación), confusores, modificadores de efecto, mediadores. Métricas según diseño. Justificar el ajuste mínimo necesario y discutir el sesgo de confusión residual.
CITAR 6–10 fuentes del corpus.`,
      tplMin: `Marco factores, 400–500 palabras, 6 fuentes. DAG, confusores, modificadores, métricas, sesgos.`
    },
    {
      id: "M2",
      title: "M2 · Operacionalización",
      subtitle: "Convierte conceptos en variables.",
      icon: "⚙️",
      fields: [],
      tplMax: `ROL: Metodólogo cuantitativo.
TAREA: TABLA DE OPERACIONALIZACIÓN ampliada para todas las variables: concepto → dimensión → indicador → ítem o medida → escala → unidad → fuente del dato → método de extracción → control de calidad. Mínimo 10 filas.`,
      tplMin: `Tabla operacionalización (10+ filas): concepto→dimensión→indicador→ítem→escala→fuente→método→control.`
    },
    {
      id: "M3-A",
      title: "M3-A · QUADAS-2",
      subtitle: "Tabla RoB para diagnósticos.",
      icon: "🎯",
      fields: [],
      tplMax: `ROL: Auditor metodológico — QUADAS-2.
TAREA: Aplicar QUADAS-2 a cada estudio diagnóstico del corpus. Tabla principal: id | estudio | RoB-selección | RoB-índice | RoB-referencia | RoB-flujo | Aplicabilidad.
ENTREGABLES: (a) gráfico de semáforo descrito textualmente, (b) discusión de patrones, (c) recomendaciones de exclusión.`,
      tplMin: `QUADAS-2 por estudio: tabla 4 dominios RoB + 3 aplicabilidad + global. Patrones detectados + recomendaciones.`
    },
    {
      id: "M3-B",
      title: "M3-B · JBI prevalencia",
      subtitle: "Calidad de prevalencia.",
      icon: "📋",
      fields: [],
      tplMax: `ROL: Auditor metodológico — JBI prevalencia.
TAREA: Aplicar herramienta JBI para estudios de prevalencia (9 ítems) a cada estudio del corpus. Tabla: id | estudio | ítems 1–9 | puntaje | calidad.
Discusión de patrones de calidad.`,
      tplMin: `JBI prevalencia: tabla 9 ítems × estudio + puntaje + calidad. Patrones.`
    },
    {
      id: "M3-C",
      title: "M3-C · ROB-2 / ROBINS-I",
      subtitle: "RoB para ECA y observacionales.",
      icon: "🚥",
      fields: [],
      tplMax: `ROL: Auditor metodológico — ROB-2 / ROBINS-I.
TAREA: Evaluación del Riesgo de Sesgo. Para ECA → ROB-2 (5 dominios); para observacionales → ROBINS-I (7 dominios).
ENTREGABLES: Tablas por estudio con justificación textual, tabla resumen para el manuscrito, semáforo, discusión de patrones.`,
      tplMin: `ROB-2 (ECA) y/o ROBINS-I (obs). Tablas separadas por diseño con dominios + juicios + señales + recomendación.`
    },
    {
      id: "M4-A",
      title: "M4-A · MA Diagnóstico",
      subtitle: "Bivariado/HSROC.",
      icon: "📈",
      fields: [],
      tplMax: `ROL: Bioestadístico de pruebas diagnósticas.
TAREA: PLAN DE METAANÁLISIS DIAGNÓSTICO. Modelo Reitsma bivariado y HSROC. Parámetros: Sn/Sp combinadas, LR, DOR, AUC SROC.
Devolver: (a) plan textual, (b) bloque de código R (mada) y Stata (midas), (c) plan de gráficos.`,
      tplMin: `Plan MA Dx: Reitsma + HSROC. Parámetros, sintaxis R/Stata mínima, criterios robustez, plan gráficos.`
    },
    {
      id: "M4-B",
      title: "M4-B · Metaproporción",
      subtitle: "Prevalencia combinada.",
      icon: "📊",
      fields: [],
      tplMax: `ROL: Bioestadístico de revisiones de prevalencia.
TAREA: PLAN DE METAPROPORCIÓN. Transformación adecuada, modelo de efectos aleatorios, IC95% exactos, I² y τ². Subgrupos por moderadores definidos a priori.
Devolver plan + sintaxis R (metafor, meta) y Stata.`,
      tplMin: `Plan metaproporción: transformación, modelo, sintaxis R/Stata, sensibilidad por calidad y outliers.`
    },
    {
      id: "M4-C",
      title: "M4-C · Meta-regresión/Subgrupos",
      subtitle: "Heterogeneidad explicada.",
      icon: "🔬",
      fields: [
        { id: "moderadores", label: "Moderadores", type: "text" }
      ],
      tplMax: `ROL: Bioestadístico.
TAREA: META-REGRESIÓN Y SUBGRUPOS con moderadores: {moderadores}. Plan: especificar a priori cada moderador, su tipo, supuestos, software.
Devolver tabla pre-especificada y plantilla de salida.`,
      tplMin: `Meta-regresión con {moderadores}: especificación a priori, β/IC/p, R²-meta, supuestos, umbral k≥10.`
    },
    {
      id: "M5",
      title: "M5 · Síntesis cualitativa",
      subtitle: "SWiM/temas.",
      icon: "📑",
      fields: [],
      tplMax: `ROL: Síntesis cualitativa.
TAREA: SÍNTESIS NARRATIVA ESTRUCTURADA (SWiM): definir grupos por similitud clínica/metodológica; reportar dirección y magnitud sin meta-análisis. Tabla por desenlace y comparación.`,
      tplMin: `SWiM: agrupación, dirección/magnitud, vote-counting descriptivo. Tabla por desenlace × comparación.`
    },
    {
      id: "M6-A",
      title: "M6-A · Triangulación Dx",
      subtitle: "Convergencia/divergencia Dx.",
      icon: "📐",
      fields: [],
      tplMax: `ROL: Triangulador de evidencia diagnóstica.
TAREA: TRIANGULACIÓN DE EVIDENCIA Dx. Cruzar resultados Sn/Sp/AUC entre estudios por umbral, población y prueba índice. Reportar la fuerza de la evidencia.`,
      tplMin: `Triangulación Dx: convergencia/divergencia por umbral/población/prueba. Tabla resumen + brechas.`
    },
    {
      id: "M6-B",
      title: "M6-B · Triangulación Prev/Fact",
      subtitle: "Convergencia/divergencia.",
      icon: "📏",
      fields: [],
      tplMax: `ROL: Triangulador de evidencia.
TAREA: TRIANGULACIÓN DE PREVALENCIA y FACTORES. Cruzar prevalencias y efectos por geografía, año, edad. Identificar fuentes de variación.`,
      tplMin: `Triangulación prevalencia/factores: convergencia. Brechas + agenda.`
    },
    {
      id: "GRADE",
      title: "GRADE · Certeza de evidencia",
      subtitle: "Tabla SoF + downgrades.",
      icon: "⭐",
      fields: [],
      tplMax: `ROL: Evaluador GRADE certificado.
TAREA: Para cada DESENLACE, aplicar GRADE evaluando 5 dominios. Asignar nivel de certeza y justificar.
ENTREGABLE: tabla SUMMARY OF FINDINGS en Markdown y párrafo narrativo.`,
      tplMin: `GRADE por desenlace: 5 dominios + certeza + razones. Tabla SoF Markdown + párrafo implicancias.`
    },
    {
      id: "BIAS",
      title: "BIAS · Sesgo de publicación",
      subtitle: "Egger/Begg/Deeks.",
      icon: "⚖️",
      fields: [
        { id: "test", label: "Test a utilizar", type: "select", options: ["Egger", "Begg-Mazumdar", "Deeks (Dx)", "Trim-and-fill", "PET-PEESE", "Combinado"] }
      ],
      tplMax: `ROL: Bioestadístico de sesgo de publicación.
TAREA: PLAN DE EVALUACIÓN DE SESGO DE PUBLICACIÓN con el test {test}.
Devolver: plan textual, sintaxis mínima R y Stata, plantilla de tabla de resultados.`,
      tplMin: `Plan de sesgo de publicación con {test}: elegibilidad, supuestos, sintaxis, plantilla resultado.`
    },
    {
      id: "C4-A",
      title: "C4-A · Resultados",
      subtitle: "Redacción de hallazgos.",
      icon: "📝",
      fields: [],
      tplMax: `ROL: Redactor científico de Resultados.
TAREA: Capítulo IV RESULTADOS (1400–2000 palabras), congruente con el plan de análisis.
ESTRUCTURA: Flujo del estudio · Características · Riesgo de sesgo · Resultados por objetivo.
REGLAS: NO discutir aquí; reportar magnitudes con IC95%.`,
      tplMin: `Capítulo IV RESULTADOS, por objetivo. Sin discusión. Magnitudes con IC95%.`
    },
    {
      id: "C4-B",
      title: "C4-B · Discusión",
      subtitle: "Interpretación y limitaciones.",
      icon: "🗣️",
      fields: [],
      tplMax: `ROL: Redactor crítico — Discusión.
TAREA: Capítulo IV·B DISCUSIÓN (1000–1500 palabras). (1) Hallazgo principal; (2) Concordancia/discordancia; (3) Mecanismos; (4) Fortalezas; (5) Limitaciones; (6) Implicancias; (7) Agenda futura.`,
      tplMin: `Capítulo IV·B DISCUSIÓN, 8 bloques. Sin resultados nuevos.`
    },
    {
      id: "C5",
      title: "C5 · Conclusiones/Recomendaciones",
      subtitle: "Cierre del estudio.",
      icon: "🏁",
      fields: [],
      tplMax: `ROL: Editor de cierre.
TAREA: Capítulo V CONCLUSIONES + RECOMENDACIONES.
CONCLUSIONES: 5–8, una por objetivo específico + general. Declarar certeza GRADE.
RECOMENDACIONES: clínica, formación, investigación, política.`,
      tplMin: `Capítulo V CONCLUSIONES (una por objetivo, con certeza GRADE) + RECOMENDACIONES.`
    },
    {
      id: "P5",
      title: "P5 · Resumen + Abstract",
      subtitle: "Estructurado IMRyD.",
      icon: "📄",
      fields: [
        { id: "palabras_clave", label: "Palabras clave (5)", type: "text" }
      ],
      tplMax: `ROL: Editor científico bilingüe.
TAREA: Redactar RESUMEN (250–300 palabras) y ABSTRACT (250–300) ESTRUCTURADOS: Antecedentes/Objetivo · Métodos · Resultados · Conclusiones · Implicancias. Mantener equivalencia 1:1 ES↔EN. Incluir 5 PALABRAS CLAVE controladas {palabras_clave}.`,
      tplMin: `Resumen ES + Abstract EN (250 palabras c/u) estructurados IMRyD, 5 palabras clave bilingües.`
    },
    {
      id: "B1",
      title: "B1 · Bibliografía",
      subtitle: "Estilo Vancouver/APA.",
      icon: "📚",
      fields: [
        { id: "estilo", label: "Estilo", type: "select", options: ["Vancouver", "ISO 690-2", "Harvard", "APA 7"] }
      ],
      tplMax: `ROL: Editor bibliográfico.
TAREA: Generar la BIBLIOGRAFÍA del estudio en estilo {estilo}, listada SOLO con las fuentes citadas en el manuscrito.`,
      tplMin: `Bibliografía estilo {estilo} SOLO de fuentes citadas.`
    },
    {
      id: "B2",
      title: "B2 · Anexos",
      subtitle: "Listado y plantillas.",
      icon: "📎",
      fields: [],
      tplMax: `ROL: Editor.
TAREA: ANEXOS UAJMS — listado y propósito de cada uno: Protocolo de búsqueda, Planilla de extracción, Aval ético, PRISMA checklist, etc.`,
      tplMin: `Anexos UAJMS: tabla letra | título | propósito | ubicación.`
    }
  ]

  function getModuleById(id: string): ResearchModule | undefined {
    return modules.find(m => m.id === id)
  }

  return { modules, getModuleById }
}
