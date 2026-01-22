const sound = document.getElementById("clickSound");

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => sound.play());
});

document.querySelectorAll(".panel").forEach(panel => {
  panel.addEventListener("mouseenter", () => {
    panel.style.background = "rgba(0,255,255,0.08)";
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.background = "transparent";
  });
});
