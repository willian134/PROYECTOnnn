document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const typing = document.getElementById("typing");

    const responses = {
        "hola": "Hola humano.",
        "¿cómo estás?": "Funcionando al 100%.",
        "adiós": "Desconectando enlace. Hasta pronto.",
        "default": "Comando recibido. Procesando respuesta."
    };

  

    window.sendMessage = function (text = null) {
        const message = text ?? input.value.trim();
        if (!message) return;

        addMessage("user", message);
        input.value = "";

        const result = tryCalculate(message);
        if (result !== null) {
            delayedBot("Resultado: " + result);
            return;
        }

        delayedBot(responses[message.toLowerCase()] || responses.default);
    };

    window.sendPredefined = text => sendMessage(text);
    window.addCalc = v => input.value += v;
    window.calculate = () => sendMessage();
    window.clearCalc = () => input.value = "";

    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        msg.textContent = text;
        chat.appendChild(msg);
        save();
    }

    function delayedBot(text) {
        typing.style.opacity = 1;
        setTimeout(() => {
            typing.style.opacity = 0;
            addBot(text);
        }, 600 + Math.random() * 800);
    }

    function addBot(text) {
        const msg = document.createElement("div");
        msg.className = "message bot";
        chat.appendChild(msg);
        typeText(msg, text);
        speak(text);
        save();
    }

    function typeText(el, text) {
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 30);
    }

    function speak(text) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "es-ES";
        speechSynthesis.speak(u);
    }

    /* VOZ */
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const mic = new SpeechRecognition();
        mic.lang = "es-ES";
        mic.onresult = e => sendMessage(e.results[0][0].transcript);
        window.startVoice = () => mic.start();
    }

    
    document.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "h") {
            document.body.classList.toggle("hacker-mode");
        }
    });

    function save() {
        localStorage.setItem("chatHistory", chat.innerHTML);
        chat.scrollTop = chat.scrollHeight;
    }

    function tryCalculate(exp) {
        try {
            if (/^[0-9+\-*/().\s]+$/.test(exp)) {
                return eval(exp);
            }
        } catch {}
        return null;
    }

});
