
export function crearTarjeta(alojamiento) {
 
  const textoCamas = alojamiento.beds ? ` . ${alojamiento.beds} beds` : "";
 
  const etiquetaSuperhost = alojamiento.superHost
    ? `<span class="border border-gray-800 rounded-full px-2 py-0.5 text-xs font-bold mr-2">SUPERHOST</span>`
    : "";
 
  return `
    <!-- Añadimos la clase 'group' para controlar estados táctiles de los hijos -->
    <div class="group cursor-pointer">

      <!-- CONTENEDOR MULTIMEDIA (Soporta hover en desktop y active en móvil mediante el grupo) -->
      <div class="rounded-2xl overflow-hidden"> 
        <img
          src="${alojamiento.photo}"
          alt="${alojamiento.title}"
          class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105 group-active:scale-105 group-hover:scale-105"
        />
      </div>
        
      <!-- DETALLES INFORMATIVOS -->
      <div class="mt-3">
 
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500">
            ${etiquetaSuperhost}${alojamiento.type}${textoCamas}
          </span>
          
          <span class="flex items-center gap-1 text-xs font-bold text-[#6f706f]">
            <img src="/public/images/icons/star.svg" alt="estrella" class="w-3 h-3" />
            ${alojamiento.rating}
          </span>
        </div>
 
        <h2 class="font-extrabold text-base mt-1">${alojamiento.title}</h2>
 
      </div>
 
    </div>
  `;
}