export async function cargarAlojamientos() {
  const respuesta = await fetch("./stays.json");
  const datosalojamientos = await respuesta.json();
  return datosalojamientos;
}