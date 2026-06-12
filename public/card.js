/*
 Construye la estructura visual (HTML) para la tarjeta de una habitación o alojamiento.
 @param {Object} alojamiento - Objeto individual con la información de la habitación.
 @returns {string} Código HTML en plantilla literal listo para ser inyectado.
 */
export function crearTarjeta(alojamiento) {
 
  // Evaluamos si el alojamiento incluye camas disponibles para concatenar el texto
  const textoCamas = alojamiento.beds ? ` . ${alojamiento.beds} beds` : "";
 
  // Evaluamos de forma condicional si es un Superhost para generar su etiqueta visual
  const etiquetaSuperhost = alojamiento.superHost
    ? `<span class="border border-gray-800 rounded-full px-2 py-0.5 text-xs font-bold mr-2">SUPERHOST</span>`
    : "";
 
  return `
    <div>

      <!-- CONTENEDOR MULTIMEDIA: Imagen con márgenes redondeados y efecto de zoom al pasar el cursor -->
      <div class="rounded-2xl overflow-hidden"> 
        <img
          src="${alojamiento.photo}"
          alt="${alojamiento.title}"
          class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
        
      <!-- DETALLES INFORMATIVOS: Bloque inferior con los datos técnicos de la habitación -->
      <div class="mt-3">
 
        <!-- Fila técnica: Muestra Superhost, tipo de propiedad, camas y puntuación -->
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500">
            ${etiquetaSuperhost}${alojamiento.type}${textoCamas}
          </span>
          
          <!-- Marcador de calificación (Rating numérico) junto al icono de la estrella -->
          <span class="flex items-center gap-1 text-xs font-bold text-[#6f706f]">
            <img src="/public/images/icons/star.svg" alt="estrella" class="w-3 h-3" />
            ${alojamiento.rating}
          </span>
        </div>
 
        <!-- Título principal descriptivo del alojamiento -->
        <h2 class="font-extrabold text-base mt-1">${alojamiento.title}</h2>
 
      </div>
 
    </div>
  `;
}