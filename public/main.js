// 1. CORREGIDO: Ahora importamos "cargarAlojamientos" en lugar de "cargarStays"
import { cargarAlojamientos } from "./datos.js";
import { crearTarjeta } from "./card.js";
import { crearPanelBusqueda } from "./searchModal.js";
import { inicializarFiltros } from "./filtro.js";

/**
 * Borra el contenido previo e inyecta las tarjetas de alojamientos en la cuadrícula principal.
 * @param {Array} alojamientosAFiltrar - Lista de habitaciones que cumplen con los filtros actuales.
 */
export function renderizarTarjetas(alojamientosAFiltrar) {
  const contenedor = document.getElementById("stays-list");
  const contador = document.getElementById("stays-count");

  // Detiene la ejecución si el contenedor no existe en el DOM
  if (!contenedor) return;

  // Limpiamos por completo la cuadrícula para eliminar las tarjetas anteriores
  contenedor.innerHTML = "";

  // Recorremos la lista filtrada y construimos cada tarjeta visual
  alojamientosAFiltrar.forEach(function (alojamiento) {
    contenedor.innerHTML += crearTarjeta(alojamiento);
  });
 
  // Actualizamos el contador global en base a los resultados encontrados
  if (contador) {
    contador.textContent = alojamientosAFiltrar.length > 0 
      ? `${alojamientosAFiltrar.length}+ stays` 
      : "0 stays found";
  }
}

/**
 * Orquesta el arranque de la aplicación inyectando la interfaz, cargando los datos e iniciando los eventos.
 */
async function iniciarAplicacion() {
  // Inyectamos la estructura HTML del menú desplegable al principio del body
  document.body.insertAdjacentHTML("afterbegin", crearPanelBusqueda());

  // 2. CORREGIDO: Llamamos a la función con su nuevo nombre en español
  const alojamientos = await cargarAlojamientos();

  // Pintamos el catálogo completo por defecto la primera vez que abre la página
  renderizarTarjetas(alojamientos);

  // Activamos los escuchadores del menú y le compartimos los datos junto al renderizador
  inicializarFiltros(alojamientos, renderizarTarjetas);
}
 
// Encendemos el motor de la aplicación de inmediato
iniciarAplicacion();