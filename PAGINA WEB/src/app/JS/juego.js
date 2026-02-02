let turno = 0; // 0 = Goku, 1 = Vegeta / Máquina
let posiciones = [1, 1];
let dado = 0;
let esperandoRespuesta = false;
let puedeLanzar = true;
let modoJuego = "2p"; // "2p" o "cpu"

/* ================== SONIDOS ================== */
function sonido(tipo) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  o.type = "square";
  o.frequency.value =
    tipo === "bien" ? 900 :
    tipo === "mal" ? 200 :
    tipo === "dado" ? 500 : 1200;
  o.connect(ctx.destination);
  o.start();
  setTimeout(() => o.stop(), 220);
}

const bancoPreguntas = [
{
  pregunta: "¿Qué es la Inteligencia Artificial?",
  opciones: [
    "Simulación de la inteligencia humana por máquinas",
    "Un lenguaje de programación",
    "Un sistema operativo",
    "Un componente físico"
  ],
  correcta: 0,
  retroIncorrecta: "La IA busca que las máquinas imiten capacidades humanas como pensar y aprender."
},
{
  pregunta: "¿Cuál es el objetivo principal de la IA?",
  opciones: [
    "Resolver problemas y tomar decisiones",
    "Fabricar computadoras",
    "Crear videojuegos",
    "Diseñar páginas web"
  ],
  correcta: 0,
  retroIncorrecta: "La IA se centra en resolver problemas complejos de forma inteligente."
},
{
  pregunta: "¿Qué es Machine Learning?",
  opciones: [
    "Aprendizaje automático a partir de datos",
    "Programación manual",
    "Diseño gráfico",
    "Hardware avanzado"
  ],
  correcta: 0,
  retroIncorrecta: "Machine Learning permite que los sistemas aprendan usando datos."
},
{
  pregunta: "¿Qué tipo de aprendizaje usa datos etiquetados?",
  opciones: [
    "Aprendizaje supervisado",
    "Aprendizaje no supervisado",
    "Aprendizaje por refuerzo",
    "Aprendizaje autónomo"
  ],
  correcta: 0,
  retroIncorrecta: "El aprendizaje supervisado utiliza ejemplos con respuestas conocidas."
},
{
  pregunta: "¿Qué imitan las redes neuronales artificiales?",
  opciones: [
    "El cerebro humano",
    "El disco duro",
    "La memoria RAM",
    "El procesador"
  ],
  correcta: 0,
  retroIncorrecta: "Las redes neuronales están inspiradas en el cerebro humano."
},
{
  pregunta: "¿Qué es Deep Learning?",
  opciones: [
    "Aprendizaje profundo con redes neuronales",
    "Un sistema operativo",
    "Un lenguaje de programación",
    "Un tipo de hardware"
  ],
  correcta: 0,
  retroIncorrecta: "Deep Learning usa redes neuronales con muchas capas."
},
{
  pregunta: "¿Cuál es un ejemplo cotidiano de IA?",
  opciones: [
    "Asistentes virtuales",
    "Calculadoras simples",
    "Radios",
    "Relojes analógicos"
  ],
  correcta: 0,
  retroIncorrecta: "Los asistentes virtuales usan IA para interactuar con personas."
},
{
  pregunta: "¿Qué es el procesamiento del lenguaje natural (PLN)?",
  opciones: [
    "Comprender el lenguaje humano",
    "Crear hardware",
    "Diseñar software",
    "Almacenar datos"
  ],
  correcta: 0,
  retroIncorrecta: "El PLN permite a las máquinas entender y generar lenguaje humano."
},
{
  pregunta: "¿Qué hace un chatbot?",
  opciones: [
    "Simula conversaciones humanas",
    "Controla redes",
    "Almacena archivos",
    "Diseña aplicaciones"
  ],
  correcta: 0,
  retroIncorrecta: "Un chatbot interactúa mediante texto o voz."
},
{
  pregunta: "¿Qué tipo de aprendizaje se basa en recompensas?",
  opciones: [
    "Aprendizaje por refuerzo",
    "Supervisado",
    "No supervisado",
    "Automático"
  ],
  correcta: 0,
  retroIncorrecta: "El refuerzo premia o castiga acciones para aprender."
},
{
  pregunta: "¿Qué es un algoritmo?",
  opciones: [
    "Conjunto de pasos para resolver un problema",
    "Un dispositivo",
    "Un programa sin lógica",
    "Un archivo"
  ],
  correcta: 0,
  retroIncorrecta: "Los algoritmos indican cómo actuar a la IA."
},
{
  pregunta: "¿Qué necesita la IA para entrenarse?",
  opciones: [
    "Datos",
    "Teclados",
    "Pantallas",
    "Impresoras"
  ],
  correcta: 0,
  retroIncorrecta: "Sin datos, la IA no puede aprender."
},
{
  pregunta: "¿Qué es un modelo de IA?",
  opciones: [
    "Un sistema entrenado para una tarea",
    "Un hardware",
    "Un programa vacío",
    "Un robot físico"
  ],
  correcta: 0,
  retroIncorrecta: "El modelo es el resultado del entrenamiento."
},
{
  pregunta: "¿Qué área de IA reconoce imágenes?",
  opciones: [
    "Visión por computadora",
    "Robótica",
    "PLN",
    "Bases de datos"
  ],
  correcta: 0,
  retroIncorrecta: "La visión por computadora analiza imágenes y videos."
},
{
  pregunta: "¿Qué hace un sistema de recomendación?",
  opciones: [
    "Sugiere contenido según preferencias",
    "Crea hardware",
    "Diseña redes",
    "Controla servidores"
  ],
  correcta: 0,
  retroIncorrecta: "Analiza gustos del usuario para recomendar."
},
{
  pregunta: "¿Qué es IA débil?",
  opciones: [
    "IA especializada en una sola tarea",
    "IA con emociones",
    "IA humana",
    "IA consciente"
  ],
  correcta: 0,
  retroIncorrecta: "La IA débil se enfoca en tareas específicas."
},
{
  pregunta: "¿Qué es IA fuerte?",
  opciones: [
    "IA con inteligencia similar a la humana",
    "IA básica",
    "IA sin datos",
    "IA sin algoritmos"
  ],
  correcta: 0,
  retroIncorrecta: "La IA fuerte aún es teórica."
},
{
  pregunta: "¿Qué lenguaje se usa mucho en IA?",
  opciones: [
    "Python",
    "HTML",
    "CSS",
    "PHP"
  ],
  correcta: 0,
  retroIncorrecta: "Python es popular por sus librerías de IA."
},
{
  pregunta: "¿Qué es un dataset?",
  opciones: [
    "Conjunto de datos",
    "Un algoritmo",
    "Un modelo",
    "Un hardware"
  ],
  correcta: 0,
  retroIncorrecta: "Los datasets alimentan a los modelos de IA."
},
{
  pregunta: "¿Qué hace la IA en videojuegos?",
  opciones: [
    "Controla personajes no jugadores",
    "Diseña gráficos",
    "Crea consolas",
    "Vende juegos"
  ],
  correcta: 0,
  retroIncorrecta: "La IA controla el comportamiento de los NPC."
},
{
  pregunta: "¿Qué es una red neuronal?",
  opciones: [
    "Modelo inspirado en neuronas humanas",
    "Un circuito",
    "Un procesador",
    "Un disco duro"
  ],
  correcta: 0,
  retroIncorrecta: "Las redes neuronales imitan la estructura del cerebro."
},
{
  pregunta: "¿Qué es entrenamiento en IA?",
  opciones: [
    "Proceso de aprendizaje del modelo",
    "Instalar software",
    "Comprar hardware",
    "Ejecutar programas"
  ],
  correcta: 0,
  retroIncorrecta: "El entrenamiento ajusta el modelo usando datos."
},
{
  pregunta: "¿Qué es un asistente virtual?",
  opciones: [
    "Programa que interactúa con usuarios",
    "Un robot físico",
    "Un sistema operativo",
    "Un servidor"
  ],
  correcta: 0,
  retroIncorrecta: "Los asistentes virtuales usan IA para responder."
},
{
  pregunta: "¿Qué hace la IA en medicina?",
  opciones: [
    "Ayuda a diagnosticar enfermedades",
    "Opera pacientes",
    "Fabrica medicamentos",
    "Reemplaza doctores"
  ],
  correcta: 0,
  retroIncorrecta: "La IA apoya a los médicos, no los reemplaza."
},
{
  pregunta: "¿Qué es reconocimiento de voz?",
  opciones: [
    "Identificar palabras habladas",
    "Guardar sonidos",
    "Crear música",
    "Transmitir audio"
  ],
  correcta: 0,
  retroIncorrecta: "Convierte voz en texto usando IA."
},
{
  pregunta: "¿Qué es la visión por computadora?",
  opciones: [
    "Área de la IA que interpreta imágenes",
    "Un tipo de cámara",
    "Un software de edición",
    "Un hardware especial"
  ],
  correcta: 0,
  retroIncorrecta: "La visión por computadora permite a las máquinas analizar imágenes y videos."
},
{
  pregunta: "¿Qué hace un sistema experto?",
  opciones: [
    "Imita decisiones de un experto humano",
    "Almacena datos",
    "Diseña hardware",
    "Ejecuta videojuegos"
  ],
  correcta: 0,
  retroIncorrecta: "Los sistemas expertos usan reglas y conocimiento especializado."
},
{
  pregunta: "¿Qué es un agente inteligente?",
  opciones: [
    "Entidad que percibe y actúa en un entorno",
    "Un robot físico",
    "Un software sin decisiones",
    "Un sensor"
  ],
  correcta: 0,
  retroIncorrecta: "Un agente inteligente toma decisiones según su entorno."
},
{
  pregunta: "¿Qué es un dato etiquetado?",
  opciones: [
    "Dato con respuesta conocida",
    "Dato aleatorio",
    "Dato sin valor",
    "Dato duplicado"
  ],
  correcta: 0,
  retroIncorrecta: "Los datos etiquetados indican la respuesta correcta."
},
{
  pregunta: "¿Qué es clasificación en IA?",
  opciones: [
    "Asignar categorías a datos",
    "Eliminar datos",
    "Guardar archivos",
    "Crear gráficos"
  ],
  correcta: 0,
  retroIncorrecta: "Clasificar significa ordenar datos en grupos."
},
{
  pregunta: "¿Qué es regresión en Machine Learning?",
  opciones: [
    "Predecir valores numéricos",
    "Eliminar errores",
    "Clasificar imágenes",
    "Crear reglas"
  ],
  correcta: 0,
  retroIncorrecta: "La regresión predice valores continuos."
},
{
  pregunta: "¿Qué es sobreajuste (overfitting)?",
  opciones: [
    "Cuando el modelo aprende demasiado los datos",
    "Cuando no aprende nada",
    "Cuando falla el hardware",
    "Cuando no hay datos"
  ],
  correcta: 0,
  retroIncorrecta: "El sobreajuste reduce la capacidad de generalizar."
},
{
  pregunta: "¿Qué es un chatbot inteligente?",
  opciones: [
    "Programa que conversa usando IA",
    "Un robot físico",
    "Un foro",
    "Un correo automático"
  ],
  correcta: 0,
  retroIncorrecta: "Los chatbots usan IA para responder mensajes."
},
{
  pregunta: "¿Qué es aprendizaje no supervisado?",
  opciones: [
    "Aprender sin etiquetas",
    "Aprender con profesor",
    "Aprender con castigos",
    "Aprender con reglas fijas"
  ],
  correcta: 0,
  retroIncorrecta: "Busca patrones sin respuestas previas."
},
{
  pregunta: "¿Qué es clustering?",
  opciones: [
    "Agrupar datos similares",
    "Eliminar datos",
    "Clasificar con etiquetas",
    "Predecir valores"
  ],
  correcta: 0,
  retroIncorrecta: "El clustering agrupa datos por similitud."
},
{
  pregunta: "¿Qué es un modelo predictivo?",
  opciones: [
    "Modelo que anticipa resultados",
    "Modelo gráfico",
    "Modelo físico",
    "Modelo manual"
  ],
  correcta: 0,
  retroIncorrecta: "Predice comportamientos futuros."
},
{
  pregunta: "¿Qué rol cumplen los datos en IA?",
  opciones: [
    "Son la base del aprendizaje",
    "Son opcionales",
    "No influyen",
    "Solo almacenan"
  ],
  correcta: 0,
  retroIncorrecta: "Sin datos no hay aprendizaje en IA."
},
{
  pregunta: "¿Qué es un perceptrón?",
  opciones: [
    "Unidad básica de una red neuronal",
    "Un sensor",
    "Un procesador",
    "Un algoritmo de búsqueda"
  ],
  correcta: 0,
  retroIncorrecta: "Es el modelo más simple de neurona artificial."
},
{
  pregunta: "¿Qué es reconocimiento facial?",
  opciones: [
    "Identificar personas por su rostro",
    "Editar fotos",
    "Guardar imágenes",
    "Crear cámaras"
  ],
  correcta: 0,
  retroIncorrecta: "Se usa para identificar o verificar identidades."
},
{
  pregunta: "¿Qué es IA explicable?",
  opciones: [
    "IA que explica sus decisiones",
    "IA más rápida",
    "IA más barata",
    "IA sin datos"
  ],
  correcta: 0,
  retroIncorrecta: "Busca transparencia en decisiones de IA."
},
{
  pregunta: "¿Qué es un sesgo en IA?",
  opciones: [
    "Error por datos no equilibrados",
    "Un algoritmo correcto",
    "Una mejora del modelo",
    "Un hardware defectuoso"
  ],
  correcta: 0,
  retroIncorrecta: "El sesgo ocurre por datos mal representados."
},
{
  pregunta: "¿Qué es ética en IA?",
  opciones: [
    "Uso responsable de la tecnología",
    "Programación avanzada",
    "Creación de robots",
    "Optimización de datos"
  ],
  correcta: 0,
  retroIncorrecta: "Busca que la IA sea justa y segura."
},
{
  pregunta: "¿Qué es un sistema autónomo?",
  opciones: [
    "Sistema que actúa sin intervención humana",
    "Sistema manual",
    "Sistema desconectado",
    "Sistema pasivo"
  ],
  correcta: 0,
  retroIncorrecta: "Toma decisiones por sí mismo."
},
{
  pregunta: "¿Qué hace la IA en autos autónomos?",
  opciones: [
    "Toma decisiones de conducción",
    "Fabrica el vehículo",
    "Diseña carreteras",
    "Controla semáforos"
  ],
  correcta: 0,
  retroIncorrecta: "La IA analiza el entorno y decide acciones."
},
{
  pregunta: "¿Qué es simulación en IA?",
  opciones: [
    "Imitar escenarios reales",
    "Crear hardware",
    "Almacenar datos",
    "Eliminar errores"
  ],
  correcta: 0,
  retroIncorrecta: "Se usa para entrenar modelos."
},
{
  pregunta: "¿Qué es NLP?",
  opciones: [
    "Procesamiento del lenguaje natural",
    "Nuevo lenguaje de programación",
    "Sistema operativo",
    "Red neuronal"
  ],
  correcta: 0,
  retroIncorrecta: "Permite entender texto y voz."
},
{
  pregunta: "¿Qué es un motor de búsqueda inteligente?",
  opciones: [
    "Sistema que ofrece resultados relevantes",
    "Un navegador",
    "Un servidor",
    "Un disco duro"
  ],
  correcta: 0,
  retroIncorrecta: "Usa IA para mejorar resultados."
},
{
  pregunta: "¿Qué es automatización inteligente?",
  opciones: [
    "Automatizar procesos con IA",
    "Automatizar sin lógica",
    "Control manual",
    "Diseño gráfico"
  ],
  correcta: 0,
  retroIncorrecta: "Combina IA con automatización."
},
{
  pregunta: "¿Qué es robótica inteligente?",
  opciones: [
    "Robots que toman decisiones",
    "Robots mecánicos",
    "Robots sin sensores",
    "Robots manuales"
  ],
  correcta: 0,
  retroIncorrecta: "Integra IA para actuar de forma autónoma."
},
{
  pregunta: "¿Qué es inferencia en IA?",
  opciones: [
    "Obtener conclusiones a partir de datos",
    "Guardar información",
    "Eliminar registros",
    "Entrenar modelos"
  ],
  correcta: 0,
  retroIncorrecta: "La inferencia permite tomar decisiones."
}
];



/* 🔀 MEZCLAR PREGUNTAS */
const preguntas = bancoPreguntas.sort(() => Math.random() - 0.5);

/* ================== INICIAR JUEGO ================== */
function iniciarJuego(modo) {
  modoJuego = modo;

  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("juego").classList.remove("oculto");

  crearTablero();
  actualizarFichas();
}

/* ================== TABLERO ================== */
function crearTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const c = document.createElement("div");
    c.className = "casilla";
    c.textContent = i;
    tablero.appendChild(c);
  }
}

/* ================== FICHAS ================== */
function actualizarFichas() {
  document.querySelectorAll(".ficha").forEach(f => f.remove());

  posiciones.forEach((pos, i) => {
    const f = document.createElement("div");
    f.className = "ficha";
    f.id = i === 0 ? "goku" : "vegeta";
    f.textContent = i === 0 ? "🟠" : "🔵";
    document.querySelectorAll(".casilla")[pos - 1].appendChild(f);
  });
}

/* ================== DADO ================== */
function lanzarDado() {
  if (!puedeLanzar) return;

  puedeLanzar = false;
  esperandoRespuesta = true;

  dado = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dado").textContent = dado;
  sonido("dado");

  mostrarPregunta();
}

/* ================== MOSTRAR PREGUNTA ================== */
function mostrarPregunta() {
  const preguntaActual = preguntas[posiciones[turno] - 1];

  document.getElementById("pregunta").textContent = preguntaActual.pregunta;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  document.getElementById("feedback").textContent = "";

  preguntaActual.opciones.forEach((texto, i) => {
    const btn = document.createElement("div");
    btn.className = "opcion";
    btn.textContent = texto;
    btn.onclick = () => responder(i);
    opcionesDiv.appendChild(btn);
  });

  document.getElementById("overlay").classList.remove("oculto");
  document.getElementById("preguntaBox").classList.remove("oculto");

  /* 🤖 TURNO DE LA MÁQUINA */
  if (modoJuego === "cpu" && turno === 1) {
    setTimeout(respuestaMaquina, 1000);
  }
}

/* ================== RESPUESTA HUMANO ================== */
function responder(seleccion) {
  if (!esperandoRespuesta) return;
  procesarRespuesta(seleccion);
}

/* ================== RESPUESTA MÁQUINA ================== */
function respuestaMaquina() {
  const p = preguntas[posiciones[turno] - 1];
  const acierta = Math.random() < 0.6; // 60% de probabilidad
  const seleccion = acierta ? p.correcta : Math.floor(Math.random() * 4);
  procesarRespuesta(seleccion);
}

function procesarRespuesta(seleccion) {
  esperandoRespuesta = false;
  const p = preguntas[posiciones[turno] - 1];

  if (seleccion === p.correcta) {
    posiciones[turno] += dado;
    sonido("bien");
    document.getElementById("feedback").textContent = "✅ Correcto";
  } else {
    sonido("mal");
    document.getElementById("feedback").textContent =
      "❌ Incorrecto. " + p.retroIncorrecta;
  }

  if (posiciones[turno] >= 100) {
    posiciones[turno] = 100;
    sonido("ganar");
    alert(`🏆 ¡Ganó ${turno === 0 ? "Goku" : "Vegeta"}!`);
  }

  actualizarFichas();

  setTimeout(() => {
    document.getElementById("preguntaBox").classList.add("oculto");
    document.getElementById("overlay").classList.add("oculto");

    turno = (turno + 1) % 2;
    document.getElementById("turnoTexto").textContent =
      "Turno: " + (turno === 0 ? "Goku" : (modoJuego === "cpu" ? "Máquina" : "Vegeta"));

    puedeLanzar = true;

    if (modoJuego === "cpu" && turno === 1) {
      setTimeout(lanzarDado, 800);
    }
  }, 1600);
}
