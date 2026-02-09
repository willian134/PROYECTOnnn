const SERVER_URL = "https://holy-salad-1d51.weorellana.workers.dev";


const genBtn = document.getElementById("genBtn");
const img = document.getElementById("imgResult");
const downloadBtn = document.getElementById("downloadBtn");

genBtn.onclick = async () => {
  const prompt = document.getElementById("prompt").value;

  if(prompt.trim() === ""){
    alert("Escribe una descripción");
    return;
  }

  genBtn.textContent = "Generando...";
  genBtn.disabled = true;

  try {
    const res = await fetch(SERVER_URL, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    img.src = data.image;
    img.style.display="block";
    downloadBtn.style.display="block";

  } catch (err) {
    alert("Error al conectar con el servidor");
  }

  genBtn.textContent = "Generar Imagen";
  genBtn.disabled = false;
};

downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.href = img.src;
  a.download = "xchatgpt-image.png";
  a.click();
};
