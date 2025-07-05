document.addEventListener('DOMContentLoaded', () => {
  const barra = document.querySelector('.barra-progreso');
  const contenedor = document.querySelector('.barra-progreso-container');
  const monto = document.querySelector('.monto-facturacion');
  const maxMonto = 64230;

  if (!barra || !contenedor) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        barra.classList.add('animate');
        
        // Animar monto (opcional)
        let start = null;
        function animarMonto(ts) {
          if (!start) start = ts;
          const elapsed = ts - start;
          const duracion = 2500;
          const porcentaje = Math.min(elapsed / duracion, 1);
          const valorActual = Math.floor(porcentaje * maxMonto);
          monto.textContent = valorActual.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          });
          if (porcentaje < 1) requestAnimationFrame(animarMonto);
        }
        requestAnimationFrame(animarMonto);

        observer.unobserve(contenedor);
      }
    });
  }, { threshold: 0.5 }); // se activa cuando el 50% del contenedor es visible

  observer.observe(contenedor);
});