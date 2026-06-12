/*
  Genera la estructura HTML base para el panel de búsqueda desplegable (Modal).
  @returns {string} Código HTML en plantilla literal.
 */
export function crearPanelBusqueda() {
  return `
    <!-- CONTENEDOR FLOTANTE PRINCIPAL (Oculto por defecto con la clase 'hidden') -->
    <div id="search-modal" class="fixed inset-0 bg-black/40 z-50 flex flex-col bg-white md:block md:h-[460px] hidden">
      <div class="bg-white px-4 py-6 flex flex-col gap-6 md:px-20 md:py-12 md:shadow-lg h-full md:h-auto">
        
        <!-- ENCABEZADO EXCLUSIVO PARA MÓVILES: Título descriptivo y botón de cierre (X) -->
        <div class="flex justify-between items-center md:mb-4">
          <span class="text-xs font-bold text-gray-800 md:hidden">Edit your search</span>
          <button id="close-modal" class="text-xl font-bold p-2 cursor-pointer hover:text-gray-500">&times;</button>
        </div>

        <!-- FORMULARIO DE ENTRADA: Inputs unificados para Ubicación y Huéspedes -->
        <div class="flex flex-col border border-gray-100 rounded-2xl shadow-md overflow-hidden bg-white md:flex-row md:items-center">
          
          <!-- Disparador e Input de Ubicación -->
          <div id="trigger-location" class="flex-1 px-6 py-3 border-b border-gray-100 md:border-b-0 md:border-r cursor-pointer hover:bg-gray-50">
            <label class="block text-[9px] font-bold uppercase tracking-wider text-gray-800">Location</label>
            <input id="modal-input-location" type="text" placeholder="Add location" class="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent mt-0.5" />
          </div>

          <!-- Disparador e Input de Huéspedes -->
          <div id="trigger-guests" class="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50">
            <label class="block text-[9px] font-bold uppercase tracking-wider text-gray-800">Guests</label>
            <input id="modal-input-guests" type="text" placeholder="Add guests" readonly class="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent mt-0.5 cursor-pointer" />
          </div>

          <!-- Botón de Búsqueda Corporativo (Solo visible en pantallas medianas/grandes) -->
          <div class="hidden md:block px-6 py-3">
            <button id="modal-btn-search-desktop" class="bg-[#EB5757] hover:bg-[#e04b4b] text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer transition-colors">
              Buscar
            </button>
          </div>
        </div>

        <!-- PANELES INFERIORES DESPLEGABLES: Muestran las opciones según la selección del usuario -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 flex-1 overflow-y-auto">
          
          <!-- Caja contenedora para la lista dinámica de ciudades -->
          <div id="panel-locations" class="flex flex-col gap-6"></div>

          <!-- Caja contenedora para los selectores de cantidad de personas -->
          <div id="panel-guests" class="flex flex-col gap-8 hidden">
            <div class="flex flex-col gap-1">
              <span class="text-sm font-bold text-gray-800">Adults</span>
              <div class="flex items-center gap-4 mt-2">
                <button class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">-</button>
                <span class="text-sm font-bold w-4 text-center">0</span>
                <button class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">+</button>
              </div>
            </div>
          </div>
          
          <!-- Espacio vacío intencional para mantener simetría con el diseño de arriba -->
          <div class="hidden md:block"></div>
        </div>

        <!-- BOTÓN BUSCAR MÓVIL: Fijo en la zona inferior de pantallas pequeñas -->
        <div class="mt-auto pt-4 md:hidden flex justify-center">
          <button id="modal-btn-search-mobile" class="bg-[#EB5757] text-white font-bold text-sm px-8 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer">
            Search
          </button>
        </div>

      </div>
    </div>
  `;
}

/**
 * Genera el botón con formato de fila para cada ciudad dinámica extraída del JSON.
 * @param {string} ciudad - Nombre del municipio (ej. Helsinki)
 * @param {string} pais - Nombre del país correspondiente
 * @returns {string} Código HTML del botón de selección.
 */
export function crearBotonCiudad(ciudad, pais) {
  return `
    <button class="item-ciudad flex items-center gap-3 text-sm text-gray-700 hover:text-black text-left cursor-pointer transition-colors" data-ciudad="${ciudad}">
      <img src="./public/images/icons/search.svg" class="w-4 h-4 opacity-50" alt="pin" /> 
      <span>${ciudad}, ${pais}</span>
    </button>
  `;
}