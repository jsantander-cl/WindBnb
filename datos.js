export async function cargarAlojamientos() {
  const respuesta = await fetch("./stays.json");
  const datos = await respuesta.json();
  return datos;
}