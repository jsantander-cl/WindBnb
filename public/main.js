// =============================================
//  main.js
//  Punto de entrada: une los módulos y actualiza el DOM
// =============================================
 
import { cargarStays } from "./stays.js";
import { crearTarjeta } from "./card.js";
 
 
async function mostrarStays() {
 
  const stays = await cargarStays();
 
  const contenedor = document.getElementById("stays-list");
 
  stays.forEach(function (stay) {
    contenedor.innerHTML += crearTarjeta(stay);
  });
 
  const contador = document.getElementById("stays-count");
  contador.textContent = stays.length + "+ stays";
}
 
 
mostrarStays();