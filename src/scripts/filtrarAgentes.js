// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".filtros-agentes");
  const cards = document.querySelectorAll(".card-agente");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recargar la página

    const categoriaSeleccionada = document.getElementById("categoria").value.toLowerCase();
    const precioMax = parseFloat(document.getElementById("precio").value);

    cards.forEach((card) => {
      const categoriaCard = card.dataset.categoria.toLowerCase();
      const precioCard = parseFloat(card.dataset.precio);

      // Condiciones de filtrado
      const coincideCategoria = !categoriaSeleccionada || categoriaCard === categoriaSeleccionada;
      const coincidePrecio = !precioMax || precioCard <= precioMax;

      // Mostrar u ocultar la card según filtros
      if (coincideCategoria && coincidePrecio) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});