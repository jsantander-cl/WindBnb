/*
  Conecta con el archivo de almacenamiento local y descarga la lista de alojamientos.
  Se utiliza una función asíncrona (async/await) para manejar la respuesta del servidor.
  @returns {Promise<Array>} Promesa que resuelve en el arreglo completo de alojamientos.
 */
export async function cargarAlojamientos() {
  // 1. Realizamos la petición HTTP asíncrona para obtener el archivo de datos
  const respuesta = await fetch("stays.json");
  
  // 2. Transformamos la respuesta binaria cruda en un objeto JSON legible por JavaScript
  const datosalojamientos = await respuesta.json();
  
  // 3. Devolvemos el arreglo final de datos listo para ser utilizado
  return datosalojamientos;
}