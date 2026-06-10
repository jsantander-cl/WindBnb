// =============================================
//  card.js
//  Responsabilidad: crear el HTML de una tarjeta
// =============================================
 
export function crearTarjeta(stay) {
 
  // Si el stay tiene camas, mostramos ". X beds"
  const camas = stay.beds ? ` . ${stay.beds} beds` : "";
 
  // Badge SUPERHOST (solo si aplica)
  const superhost = stay.superHost
    ? `<span class="border border-gray-800 rounded-full px-2 py-0.5 text-xs font-bold mr-2">SUPERHOST</span>`
    : "";
 
  return `
    <div>
 
      <!-- Imagen con bordes redondeados -->
      <div class="rounded-2xl overflow-hidden">
        <img
          src="${stay.photo}"
          alt="${stay.title}"
          class="w-full h-52 object-cover"
        />
      </div>
 
      <!-- Info debajo de la imagen (fuera de la card) -->
      <div class="mt-3">
 
        <!-- Fila: tipo de lugar y rating -->
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500">
            ${superhost}${stay.type}${camas}
          </span>
          <span class="flex items-center gap-1 text-xs font-bold">
            <img src="images/icons/star.svg" alt="estrella" class="w-3 h-3" />
            ${stay.rating}
          </span>
        </div>
 
        <!-- Título del lugar -->
        <h2 class="font-extrabold text-base mt-1">${stay.title}</h2>
 
      </div>
 
    </div>
  `;
}