// une los módulos y actualiza el DOM
 
import { cargarStays } from "./datos.js";
import { crearTarjeta } from "./card.js";
 
 
async function mostrarDatos() {
 
  const stays = await cargarStays();
 
  const contenedor = document.getElementById("stays-list");
 
  stays.forEach(function (stay) {
    contenedor.innerHTML += crearTarjeta(stay);
  });
 
  const contador = document.getElementById("stays-count");
  contador.textContent = stays.length + "+ stays";
}
 
 
mostrarDatos();