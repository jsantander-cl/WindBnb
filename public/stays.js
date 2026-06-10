//  trae los datos del JSON
 
export async function cargarStays() {
  const respuesta = await fetch("stays.json");
  const stays = await respuesta.json();
  return stays;
}