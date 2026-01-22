const images = {
  dragon: "https://tse4.mm.bing.net/th/id/OIP.n1pbptLZBqFHj_qzN_QzxQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
  robot: "https://tse1.mm.bing.net/th/id/OIP.fxK_A8sJAuvhfNZY9ZTJ5QHaEL?rs=1&pid=ImgDetMain&o=7&rm=3",
  ciudad: "https://img.freepik.com/fotos-premium/inteligencia-artificial-que-analiza-trafico-datos-infraestructura-ciudad-control-ia-ciudad-inteligente-garantiza_327072-34485.jpg",
  moto: "https://tse4.mm.bing.net/th/id/OIP.ROLLB9soNtP4RA_bcAzztAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  robotia: "https://imagenes.20minutos.es/uploads/imagenes/2024/01/18/inteligencia-artificial-1.jpeg"
};

function selectIdea(key) {
  document.getElementById("inputText").value = key;
}

function send() {
  const text = document.getElementById("inputText").value.trim().toLowerCase();
  const result = document.getElementById("result");

  result.innerHTML = "";

  if (images[text]) {
    const img = document.createElement("img");
    img.src = images[text];
    img.onload = () => result.appendChild(img);
    img.onerror = () => result.innerHTML = "❌ No se pudo cargar la imagen.";
  } else {
    result.innerHTML = "❌ No tengo esa imagen.";
  }
}
