const board = document.getElementById("board");
const rollBtn = document.getElementById("rollDice");
const diceValue = document.getElementById("diceValue");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const twoBtn = document.getElementById("twoPlayers");
const cpuBtn = document.getElementById("vsCPU");

let p1=1;
let p2=1;
let turn=1;
let dice=0;
let vsCPU=false;
let currentQuestion=null;

/* ========= TABLERO ========= */
for(let i=1;i<=100;i++){
  const c=document.createElement("div");
  c.className="cell";
  c.innerText=i;
  board.appendChild(c);
}

/* ========= FICHAS ========= */
const t1=document.createElement("div");
t1.className="token player1";
const t2=document.createElement("div");
t2.className="token player2";
board.children[0].appendChild(t1);
board.children[0].appendChild(t2);

/* ========= MODOS ========= */
twoBtn.onclick=()=>{vsCPU=false;alert("Modo 2 Jugadores");};
cpuBtn.onclick=()=>{vsCPU=true;alert("Modo VS Máquina");};

/* ========= 100 PREGUNTAS ========= */
const questions=[
{q:"¿Qué es la inteligencia artificial?",options:["Robot","Sistema que aprende","Virus","Videojuego"],answer:1},
{q:"¿Qué significa IA?",options:["Inteligencia Artificial","Internet Activo","Interfaz Avanzada","Ingeniería"],answer:0},
{q:"¿Quién creó ChatGPT?",options:["OpenAI","Google","Meta","Microsoft"],answer:0},
{q:"¿Qué es Gemini?",options:["IA de Google","Robot","Juego","Virus"],answer:0},
{q:"¿Qué hace un algoritmo?",options:["Resuelve problemas","Rompe PCs","Decora","Apaga"],answer:0},
{q:"¿Qué es machine learning?",options:["IA que aprende","Virus","Juego","Pantalla"],answer:0},
{q:"¿Qué usa la IA para aprender?",options:["Datos","Magia","Electricidad","Internet"],answer:0},
{q:"¿Qué es una red neuronal?",options:["Modelo que imita el cerebro","Robot","App","Pantalla"],answer:0},
{q:"¿Para qué sirve la IA?",options:["Resolver problemas","Romper PCs","Borrar archivos","Crear virus"],answer:0},
{q:"¿Qué tipo de IA es ChatGPT?",options:["Modelo de lenguaje","Robot físico","Navegador","Videojuego"],answer:0},
];

// Rellenar hasta 100 automáticamente
while(questions.length<100){
questions.push({
q:"¿La IA puede aprender de los datos?",
options:["Sí","No","Solo robots","Solo humanos"],
answer:0
});
}

/* ========= DADO ========= */
rollBtn.onclick=()=>{
if(vsCPU && turn===2) return;
dice=Math.floor(Math.random()*6)+1;
diceValue.innerText=dice;
showQuestion();
};

/* ========= MOSTRAR PREGUNTA ========= */
function showQuestion(){
let pos = turn===1 ? p1 : p2;
currentQuestion = questions[pos-1];

questionText.innerText = "Casilla " + pos + ": " + currentQuestion.q;
optionsDiv.innerHTML="";
feedback.innerText="";
questionBox.style.display="block";

currentQuestion.options.forEach((o,i)=>{
let b=document.createElement("button");
b.innerText=o;
b.onclick=()=>check(i===currentQuestion.answer);
optionsDiv.appendChild(b);
});
}

/* ========= RESPUESTA ========= */
function check(ok){
optionsDiv.innerHTML="";

if(ok){
feedback.innerText="✔ Correcto. Avanzas "+dice+" casillas";
feedback.style.color="#00ff66";
move();
}else{
feedback.innerText="❌ Incorrecto. La respuesta correcta era:\n"+currentQuestion.options[currentQuestion.answer];
feedback.style.color="red";
changeTurn();
}

setTimeout(()=>{
questionBox.style.display="none";
feedback.innerText="";
if(vsCPU && turn===2){
setTimeout(cpuPlay,800);
}
},2500);
}

/* ========= MOVER ========= */
function move(){
let pos=turn===1?p1:p2;
pos+=dice;
if(pos>100)pos=100;
let token=turn===1?t1:t2;
board.children[pos-1].appendChild(token);
if(turn===1)p1=pos; else p2=pos;
if(pos===100){
alert("🏆 Jugador "+turn+" ganó");
location.reload();
}
changeTurn();
}

/* ========= TURNO ========= */
function changeTurn(){
turn = turn===1 ? 2 : 1;
}

/* ========= CPU ========= */
function cpuPlay(){
dice=Math.floor(Math.random()*6)+1;
diceValue.innerText=dice;
let ok=Math.random()>0.3;

if(ok){
feedback.innerText="🤖 CPU acertó y avanza";
feedback.style.color="#00ff66";
move();
}else{
feedback.innerText="🤖 CPU falló";
feedback.style.color="red";
changeTurn();
}
}
