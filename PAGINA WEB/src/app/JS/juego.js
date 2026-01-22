const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const levelText = document.getElementById("level");
const turnText = document.getElementById("turn");
const playerPosText = document.getElementById("playerPos");
const aiPosText = document.getElementById("aiPos");
const scoreText = document.getElementById("score");

const modal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const continueBtn = document.getElementById("continueBtn");

let level = 1;
let score = 0;
const boardSize = 100;

let playerPos = 1;
let aiPos = 1;
let isPlayerTurn = true;
let pendingMove = 0;

/* =========================
   100 PREGUNTAS ÚNICAS IA
========================= */
const questions = [
{q:"¿Por qué una IA puede amplificar desigualdades sociales?",o:["Porque aprende de datos históricos con sesgos","Porque tiene ideología propia","Porque siempre falla"],c:0,e:"La IA replica patrones presentes en los datos, incluidos los sesgos sociales."},
{q:"¿Qué significa que una IA sea explicable?",o:["Que sus decisiones pueden interpretarse","Que se equivoca menos","Que aprende sola"],c:0,e:"La explicabilidad permite entender cómo y por qué la IA decide."},
{q:"¿Cuál es una desventaja del aprendizaje profundo?",o:["Requiere muchos datos y potencia","No puede aprender patrones","No usa matemáticas"],c:0,e:"Las redes profundas necesitan grandes volúmenes de datos y cómputo."},
{q:"¿Por qué la IA no posee conciencia?",o:["Porque solo ejecuta cálculos","Porque no tiene cuerpo","Porque no aprende"],c:0,e:"La IA no tiene experiencia subjetiva, solo procesa información."},
{q:"¿Qué es un modelo de IA?",o:["Una representación matemática entrenada","Un robot físico","Un programa aleatorio"],c:0,e:"Un modelo es una estructura matemática entrenada con datos."},
{q:"¿Qué riesgo existe al automatizar decisiones legales?",o:["Reproducir injusticias previas","Aumentar creatividad","Eliminar leyes"],c:0,e:"Si los datos están sesgados, la IA puede repetir injusticias."},
{q:"¿Qué significa entrenar una IA?",o:["Ajustar parámetros con datos","Instalar software","Dar instrucciones humanas"],c:0,e:"Entrenar es optimizar parámetros usando ejemplos."},
{q:"¿Qué es el sobreajuste?",o:["Aprender demasiado bien los datos de entrenamiento","Aprender lentamente","No aprender nada"],c:0,e:"El sobreajuste reduce la capacidad de generalizar."},
{q:"¿Por qué la IA necesita validación humana?",o:["Para evitar errores críticos","Para ser más rápida","Para consumir menos energía"],c:0,e:"La supervisión humana reduce riesgos y errores graves."},
{q:"¿Qué diferencia a un chatbot de un humano?",o:["No entiende significado real","Tiene menos memoria","No puede escribir"],c:0,e:"El chatbot no comprende, solo predice texto."},

{q:"¿Qué es un dato etiquetado?",o:["Dato con respuesta conocida","Dato falso","Dato sin valor"],c:0,e:"Las etiquetas guían el aprendizaje supervisado."},
{q:"¿Qué es el aprendizaje no supervisado?",o:["Encontrar patrones sin etiquetas","Aprender sin datos","Copiar respuestas"],c:0,e:"Busca estructuras ocultas en los datos."},
{q:"¿Por qué la IA puede fallar en contextos nuevos?",o:["Porque no generaliza bien","Porque es lenta","Porque no usa memoria"],c:0,e:"La IA depende del contexto visto en entrenamiento."},
{q:"¿Qué es una red neuronal?",o:["Modelo inspirado en neuronas","Un cerebro artificial","Un programa fijo"],c:0,e:"Imita conexiones neuronales de forma matemática."},
{q:"¿Qué papel juega la ética en la IA?",o:["Evitar daños sociales","Hacerla más rápida","Reducir código"],c:0,e:"La ética previene usos perjudiciales."},
{q:"¿Qué es un sesgo algorítmico?",o:["Error sistemático en decisiones","Fallo técnico","Ruido aleatorio"],c:0,e:"Proviene de datos o diseño incorrecto."},
{q:"¿Qué ventaja tiene la IA en medicina?",o:["Analizar grandes volúmenes de datos","Reemplazar médicos","Eliminar diagnósticos"],c:0,e:"Apoya al médico, no lo reemplaza."},
{q:"¿Qué significa inferencia en IA?",o:["Usar el modelo entrenado","Entrenar desde cero","Borrar datos"],c:0,e:"Es aplicar el modelo a nuevos datos."},
{q:"¿Por qué la IA no razona como humanos?",o:["No tiene comprensión semántica","No tiene memoria","No usa lógica"],c:0,e:"Solo manipula símbolos y probabilidades."},
{q:"¿Qué es un dataset?",o:["Conjunto de datos","Un algoritmo","Un servidor"],c:0,e:"Los datasets alimentan a la IA."},

{q:"¿Qué implica automatizar decisiones financieras?",o:["Riesgo si hay datos sesgados","Mayor justicia","Eliminación de bancos"],c:0,e:"Los errores se amplifican a gran escala."},
{q:"¿Qué es aprendizaje por refuerzo?",o:["Aprender por recompensas","Aprender leyendo","Aprender copiando"],c:0,e:"La IA mejora mediante prueba y error."},
{q:"¿Qué problema causa la falta de diversidad de datos?",o:["Resultados injustos","Mayor precisión","Menor costo"],c:0,e:"Datos poco diversos generan discriminación."},
{q:"¿Por qué una IA no tiene intuición?",o:["No tiene experiencia consciente","No tiene sensores","No usa reglas"],c:0,e:"La intuición es humana, no estadística."},
{q:"¿Qué es un modelo predictivo?",o:["Predice resultados futuros","Decide éticamente","Controla robots"],c:0,e:"Se basa en patrones pasados."},
{q:"¿Qué es el procesamiento del lenguaje natural?",o:["Interacción con lenguaje humano","Traducción humana","Escritura creativa"],c:0,e:"Permite analizar y generar texto."},
{q:"¿Por qué la IA puede cometer errores absurdos?",o:["Falta de contexto real","Exceso de lógica","Falta de energía"],c:0,e:"No entiende el mundo como humanos."},
{q:"¿Qué es una caja negra en IA?",o:["Modelo difícil de interpretar","Error grave","Programa dañado"],c:0,e:"No se sabe cómo llega a decisiones."},
{q:"¿Qué rol tiene el humano en la IA?",o:["Diseñar, supervisar y corregir","Obedecerla","Eliminarla"],c:0,e:"La IA debe estar bajo control humano."},
{q:"¿Qué es la generalización?",o:["Aplicar lo aprendido a nuevos datos","Memorizar","Copiar"],c:0,e:"Es clave para un buen modelo."},

{q:"¿Qué riesgo tiene usar IA sin pruebas?",o:["Errores masivos","Mayor innovación","Menos costos"],c:0,e:"Un error puede afectar a muchos."},
{q:"¿Qué es un falso positivo?",o:["Resultado incorrecto afirmativo","Error humano","Falla de red"],c:0,e:"Es detectar algo que no existe."},
{q:"¿Qué es un falso negativo?",o:["No detectar algo real","Dato inútil","Sesgo social"],c:0,e:"Puede ser crítico en medicina."},
{q:"¿Qué es un modelo generativo?",o:["Crea contenido nuevo","Clasifica datos","Almacena información"],c:0,e:"Genera texto, imágenes o audio."},
{q:"¿Por qué la IA necesita actualización?",o:["Los datos cambian","Se vuelve lenta","Pierde memoria"],c:0,e:"El mundo evoluciona."},
{q:"¿Qué es la automatización responsable?",o:["Uso con control humano","Uso total","Uso sin reglas"],c:0,e:"Reduce riesgos sociales."},
{q:"¿Qué es un prompt?",o:["Instrucción dada a la IA","Un error","Un modelo"],c:0,e:"Guía la respuesta del sistema."},
{q:"¿Por qué la IA no es objetiva?",o:["Refleja sesgos humanos","Tiene emociones","Es impredecible"],c:0,e:"Los datos no son neutrales."},
{q:"¿Qué es la privacidad de datos?",o:["Protección de información personal","Borrar datos","Compartir todo"],c:0,e:"Es un derecho fundamental."},
{q:"¿Qué riesgo tiene la vigilancia con IA?",o:["Pérdida de libertades","Mayor justicia","Más seguridad"],c:0,e:"Puede usarse de forma abusiva."},

{q:"¿Qué es la alineación en IA?",o:["Que siga valores humanos","Que sea rápida","Que sea autónoma"],c:0,e:"Busca que la IA actúe responsablemente."},
{q:"¿Por qué la IA no reemplaza profesores?",o:["No entiende contextos humanos","No sabe enseñar","No tiene datos"],c:0,e:"La educación requiere empatía."},
{q:"¿Qué es un modelo entrenado?",o:["Modelo ajustado con datos","Modelo nuevo","Modelo dañado"],c:0,e:"Ya aprendió patrones."},
{q:"¿Qué es un asistente virtual?",o:["IA que ayuda en tareas","Un humano","Un robot físico"],c:0,e:"Interactúa mediante lenguaje."},
{q:"¿Por qué la IA puede generar errores creíbles?",o:["Predice sin verificar","Tiene mala intención","No entiende reglas"],c:0,e:"No valida la verdad."},
{q:"¿Qué es una limitación técnica de la IA?",o:["Dependencia de datos","Falta de hardware","Falta de código"],c:0,e:"Sin datos no aprende."},
{q:"¿Qué es un modelo discriminativo?",o:["Clasifica datos","Genera texto","Almacena información"],c:0,e:"Diferencia entre clases."},
{q:"¿Por qué la IA necesita reglas éticas?",o:["Para evitar daños","Para ser rápida","Para ganar dinero"],c:0,e:"El poder requiere control."},
{q:"¿Qué es el aprendizaje automático?",o:["IA que aprende de datos","IA consciente","IA sin errores"],c:0,e:"Es la base de la IA moderna."},
{q:"¿Qué es la supervisión humana?",o:["Revisión de decisiones IA","Control total","Programación básica"],c:0,e:"Reduce impactos negativos."}
];



let usedQuestions = new Set();

/* =========================
   TABLERO SERPIENTE
========================= */
function createBoard() {
    board.innerHTML = "";
    let dir = true, cells = [];

    for (let r = 0; r < 10; r++) {
        let row = [];
        for (let c = 1; c <= 10; c++) row.push(r * 10 + c);
        if (!dir) row.reverse();
        dir = !dir;
        cells.push(...row);
    }

    cells.forEach(n => {
        const div = document.createElement("div");
        div.className = "cell";
        div.id = "cell-" + n;
        div.textContent = n;
        board.appendChild(div);
    });
}

createBoard();
updateTokens();

/* =========================
   LANZAR DADO (JUGADOR)
========================= */
rollBtn.onclick = () => {
    if (!isPlayerTurn) return;

    pendingMove = Math.floor(Math.random() * 6) + 1;

    showDiceResult(pendingMove, false);
};

/* =========================
   MOSTRAR RESULTADO DEL DADO
========================= */
function showDiceResult(value, isAI) {
    modal.classList.remove("hidden");
    questionText.textContent = `🎲 Resultado del dado: ${value}`;
    optionsDiv.innerHTML = "";
    feedback.textContent = "";
    continueBtn.classList.remove("hidden");

    continueBtn.textContent = "Continuar";
    continueBtn.onclick = () => {
        continueBtn.textContent = "Continuar";
        askQuestion(isAI);
    };
}

/* =========================
   OBTENER PREGUNTA ÚNICA
========================= */
function getQuestion() {
    for (let i = 0; i < questions.length; i++) {
        if (!usedQuestions.has(i)) {
            usedQuestions.add(i);
            return questions[i];
        }
    }
    return questions[0];
}

/* =========================
   MOSTRAR PREGUNTA
========================= */
function askQuestion(isAI) {
    const q = getQuestion();
    questionText.textContent = q.q;
    optionsDiv.innerHTML = "";
    feedback.textContent = "";
    continueBtn.classList.add("hidden");

    q.o.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.disabled = isAI;
        optionsDiv.appendChild(btn);
    });

    if (isAI) {
        setTimeout(() => {
            const aiCorrect = Math.random() < (0.6 + level * 0.03);
            resolveAnswer(aiCorrect, q, true);
        }, 1500);
    } else {
        [...optionsDiv.children].forEach((btn, i) => {
            btn.onclick = () => resolveAnswer(i === q.c, q, false);
        });
    }
}

/* =========================
   RESOLVER RESPUESTA
========================= */
function resolveAnswer(correct, q, isAI) {
    optionsDiv.innerHTML = "";

    if (correct) {
        feedback.style.color = "green";
        feedback.textContent = "✔ Correcto, avanzas " + pendingMove + " casillas";
        if (isAI) aiPos += pendingMove;
        else {
            playerPos += pendingMove;
            score += 10;
        }
    } else {
        feedback.style.color = "red";
        feedback.textContent = "✘ Incorrecto. " + q.e;
    }

    updateTokens();
    continueBtn.classList.remove("hidden");
    continueBtn.onclick = () => {
        modal.classList.add("hidden");
        nextTurn();
    };
}

/* =========================
   TURNOS
========================= */
function nextTurn() {
    isPlayerTurn = !isPlayerTurn;
    turnText.textContent = isPlayerTurn ? "Jugador" : "Máquina";

    if (!isPlayerTurn) {
        pendingMove = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => showDiceResult(pendingMove, true), 800);
    }
}

/* =========================
   FICHAS
========================= */
function updateTokens() {
    document.querySelectorAll(".player-token").forEach(e => e.remove());

    place(playerPos, "player-token");
    place(aiPos, "player-token ai");

    playerPosText.textContent = playerPos;
    aiPosText.textContent = aiPos;
    scoreText.textContent = score;
}

function place(pos, cls) {
    const cell = document.getElementById("cell-" + pos);
    if (cell) {
        const t = document.createElement("div");
        t.className = cls;
        cell.appendChild(t);
    }
}
