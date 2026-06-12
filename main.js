// import { cargarAlojamientos } from "./datos.js";
// import { crearTarjeta } from "./card.js";
// import { crearPanelBusqueda } from "./searchmodal.js";
// import { inicializarFiltros } from "./filtro.js";


// export function renderizarTarjetas(alojamientosAFiltrar) {
//   const contenedor = document.getElementById("listaAlojamientos");
//   const contador = document.getElementById("contadorAlojamientos");

//   if (!contenedor) return;

//   contenedor.innerHTML = "";

//   alojamientosAFiltrar.forEach(function (alojamiento) {
//     contenedor.innerHTML += crearTarjeta(alojamiento);
//   });
 
//   if (contador) {
//     contador.textContent = alojamientosAFiltrar.length > 0 
//       ? `${alojamientosAFiltrar.length}+ stays` 
//       : "0 stays found";
//   }
// }


// async function iniciarAplicacion() {
//   document.body.insertAdjacentHTML("afterbegin", crearPanelBusqueda());

//   const alojamientos = await cargarAlojamientos();

//   renderizarTarjetas(alojamientos);

//   inicializarFiltros(alojamientos, renderizarTarjetas);
// }
 
// iniciarAplicacion();

import { cargarAlojamientos } from "./datos.js";
import { crearTarjeta } from "./card.js";
import { crearPanelBusqueda } from "./searchmodal.js";
import { inicializarFiltros } from "./filtro.js";


export function renderizarTarjetas(listaAlojamientos) {
  const contenedor = document.getElementById("listaAlojamientos");
  const contador = document.getElementById("contadorAlojamientos");

  contenedor.innerHTML = "";

  for (let i = 0; i < listaAlojamientos.length; i++) {
    contenedor.innerHTML += crearTarjeta(listaAlojamientos[i]);
  }

  if (listaAlojamientos.length > 0) {
    contador.textContent = listaAlojamientos.length + "+ stays";
  } else {
    contador.textContent = "0 stays found";
  }
}


async function iniciarAplicacion() {
  document.body.insertAdjacentHTML("afterbegin", crearPanelBusqueda());

  const alojamientos = await cargarAlojamientos();

  renderizarTarjetas(alojamientos);

  inicializarFiltros(alojamientos, renderizarTarjetas);
}

iniciarAplicacion();