//  trae los datos del JSON
 
export async function cargarStays() {
  const respuesta = await fetch("stays.json");
  const datos = await respuesta.json();
  return datos;
}