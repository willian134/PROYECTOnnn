document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    const responses = {
        "hola": "¡Hola! 👋",
        "¿cómo estás?": "Muy bien, gracias 😊",
        "adiós": "¡Hasta luego!",
        "default": "Puedes escribir o usar la calculadora."
    };

    // Enviar con ENTER
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            sendMessage();
            e.preventDefault();
        }
    });

    window.sendMessage = function (text = null) {
        const message = text ?? input.value.trim();
        if (!message) return;

        addMessage("user", message);
        input.value = "";

        const result = tryCalculate(message);
        if (result !== null) {
            addMessage("bot", "Resultado: " + result);
            return;
        }

        addMessage("bot", responses[message.toLowerCase()] || responses.default);
    };

    window.sendPredefined = function (text) {
        sendMessage(text);
    };

    window.addCalc = function (value) {
        input.value += value;
        input.focus();
    };

    window.calculate = function () {
        sendMessage();
    };

    window.clearCalc = function () {
        input.value = "";
    };

    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        msg.textContent = text;
        chat.appendChild(msg);
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
