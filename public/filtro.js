import { cargarStays } from "./stays.js";
import { crearTarjeta } from "./card.js";
 
 
// --- Estado del filtro ---
let adultos = 0;
let ninos   = 0;
 

 
// --- Mostrar / ocultar el panel ---
export function iniciarFiltro() {
 
  const panel        = document.getElementById("panel-filtro");
  const inputLocation = document.getElementById("input-location");
  const inputGuests   = document.getElementById("input-guests");
  const btnSearch     = document.getElementById("btn-search");
 
  // Abrir panel al hacer click en cualquiera de los inputs
  inputLocation.addEventListener("click", function () {
    panel.classList.remove("hidden");
  });
 
  inputGuests.addEventListener("click", function () {
    panel.classList.remove("hidden");
  });
 console.log(ninos);
  // Filtrar en tiempo real al escribir la ciudad
  inputLocation.addEventListener("input", function () {
    filtrarYMostrar();
  });
 
  // Botón de buscar: cierra el panel
  btnSearch.addEventListener("click", function () {
    panel.classList.add("hidden");
    filtrarYMostrar();
  });
 
  // Botones + y - de adultos
  document.getElementById("btn-adultos-mas").addEventListener("click", function () {
    adultos++;
    actualizarContadores();
    filtrarYMostrar();
  });
 
  document.getElementById("btn-adultos-menos").addEventListener("click", function () {
    if (adultos > 0) {
      adultos--;
      actualizarContadores();
      filtrarYMostrar();
    }
  });
 
  // Botones + y - de niños
  document.getElementById("btn-ninos-mas").addEventListener("click", function () {
    ninos++;
    actualizarContadores();
    filtrarYMostrar();
  });
 
  document.getElementById("btn-ninos-menos").addEventListener("click", function () {
    if (ninos > 0) {
      ninos--;
      actualizarContadores();
      filtrarYMostrar();
    }
  });
}
 
 
// --- Actualiza los números en pantalla y el input de guests ---
function actualizarContadores() {
 
  document.getElementById("num-adultos").textContent = adultos;
  document.getElementById("num-ninos").textContent   = ninos;
 
  const total = adultos + ninos;
  const inputGuests = document.getElementById("input-guests");
 
  inputGuests.value = total > 0 ? total + " guests" : "";
}
 
 
// --- Filtra las tarjetas y actualiza el DOM ---
async function filtrarYMostrar() {
 
  const stays = await cargarStays();
 
  const ciudad = document.getElementById("input-location").value.toLowerCase();
  const totalGuests = adultos + ninos;
 
  // Filtramos según ciudad y número de huéspedes
  const resultado = stays.filter(function (stay) {
 
    const coincideCiudad = ciudad === "" || stay.city.toLowerCase().includes(ciudad);
    const coincideGuests = totalGuests === 0 || stay.maxGuests >= totalGuests;
 
    return coincideCiudad && coincideGuests;
  });
 
  // Actualizamos el DOM con los resultados
  const contenedor = document.getElementById("stays-list");
  contenedor.innerHTML = "";
 
  resultado.forEach(function (stay) {
    contenedor.innerHTML += crearTarjeta(stay);
  });
 
  // Actualizamos el contador de stays
  document.getElementById("stays-count").textContent = resultado.length + "+ stays";}