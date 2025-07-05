// Mapeo simple de empresa a sector
function mapearSector(empresa) {
  const sectores = {
    'Romaguera-Crona': 'Trading',
    'Deckow-Crist': 'E-commerce',
    'Romaguera-Jacobson': 'Importaciones',
    'Keebler LLC': 'Inmobiliarias',
    'Considine-Lockman': 'Trading',
    'Johns Group': 'Importaciones',
    'Abernathy Group': 'E-commerce',
    'Yost and Sons': 'Inmobiliarias',
    // Agrega más si quieres
  };
  return sectores[empresa] || 'General';
}

const listaClientes = document.getElementById('lista-clientes');
const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('busqueda-nombre');
const selectSector = document.getElementById('filtro-sector');

let clientesData = [];

// Función para mostrar clientes filtrados
function mostrarClientes(clientes) {
  listaClientes.innerHTML = '';
  if (clientes.length === 0) {
    listaClientes.innerHTML = '<li>No se encontraron clientes con esos criterios.</li>';
    return;
  }

  clientes.forEach(user => {
    const sector = mapearSector(user.company.name);
    const li = document.createElement('li');
    li.style.marginBottom = '20px';
    li.style.padding = '10px';
    li.style.borderBottom = '1px solid #ccc';
    li.innerHTML = `
      <strong>${user.name}</strong> (${user.email})<br/>
      Empresa: ${user.company.name} — Sector: ${sector}<br/>
      Teléfono: ${user.phone} — Ciudad: ${user.address.city}<br/>
      Nota: ${user.company.catchPhrase}
    `;
    listaClientes.appendChild(li);
  });
}

// Función para filtrar clientes según inputs
function filtrarClientes() {
  const texto = inputBusqueda.value.toLowerCase();
  const sectorSeleccionado = selectSector.value;

  const filtrados = clientesData.filter(user => {
    const sector = mapearSector(user.company.name);
    const nombreCoincide = user.name.toLowerCase().includes(texto);
    const sectorCoincide = sectorSeleccionado === '' || sector === sectorSeleccionado;
    return nombreCoincide && sectorCoincide;
  });

  mostrarClientes(filtrados);
}

// Cargar datos de la API
async function cargarClientes() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    clientesData = await response.json();
    mostrarClientes(clientesData);
  } catch (error) {
    listaClientes.innerHTML = '<li>Error al cargar los clientes.</li>';
    console.error('Error API:', error);
  }
}

// Eventos de búsqueda y filtro
formBusqueda.addEventListener('submit', e => {
  e.preventDefault();
  filtrarClientes();
});

// También filtrar al cambiar el sector o escribir en el input (opcional)
inputBusqueda.addEventListener('input', filtrarClientes);
selectSector.addEventListener('change', filtrarClientes);

// Al cargar la página
window.addEventListener('load', () => {
  cargarClientes();
  window.scrollTo(0, 0); // Scroll al inicio
});