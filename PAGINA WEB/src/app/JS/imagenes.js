function mostrarImagen(opcion) {
    const img = document.getElementById("imagenMostrada");

    const imagenes = {
        ronaldo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR61GIS1HdYLSnZatxHOgSjaVBbfQVQL3BfUg&s",
        messi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhUrFEDABYvSCborRdUL3wyTmIJCltnCUnw&s",
        caicedo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDE8I4tL06NDCaRi3NFEw-f4NM9TB_wrMNw&s",
        dbz: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKmPkKz7qe4UF0X5eHIFM1Qwe-AY2bRaq6g&s",
        naruto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiccwKj3fabqP1EGVJgaVGN4Bvaaxdy64fTg&s",
        onepiece: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJopumdH_yyA_dhyMivCaor3P954b8PeeSTQ&s"
    };

    img.src = imagenes[opcion];
}
