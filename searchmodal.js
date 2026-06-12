/**
 * Genera la estructura HTML base para el panel de búsqueda desplegable (Modal).
 * @returns {string} Código HTML en plantilla literal.
 */
export function crearPanelBusqueda() {
  return `
    <div id="ventanaEmergenteBusqueda" style="display: none;" class="fixed inset-0 bg-black/40 z-50 flex flex-col bg-white md:block md:h-[460px]">
      <div class="bg-white px-4 py-6 flex flex-col gap-6 md:px-20 md:py-12 md:shadow-lg h-full md:h-auto">
        
        <!-- Encabezado para dispositivos móviles -->
        <div class="flex justify-between items-center md:mb-4">
          <span class="text-xs font-bold text-gray-800 md:hidden">Edit your search</span>
          <button id="btnCerrarModal" class="text-xl font-bold p-2 cursor-pointer hover:text-gray-500">&times;</button>
        </div>

        <!-- Barra de entradas interna del menú (VISTA MOBILE) -->
        <div class="flex flex-col border border-gray-300 rounded-2xl shadow-md overflow-hidden bg-white md:flex-row md:items-center">
          
          <!-- Pestaña de Ubicación -->
          <div id="pestanaModalUbicacion" class="flex-1 px-6 py-3 border-b border-gray-100 md:border-b-0 md:border-r cursor-pointer hover:bg-gray-50">
            <label class="block text-[9px] font-bold uppercase tracking-wider text-gray-400 pointer-events-none">Location</label>
            <input id="inputModalUbicacion" type="text" placeholder="Add location" class="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent mt-0.5 pointer-events-none" />
          </div>

          <!-- Pestaña de Huéspedes -->
          <div id="pestanaModalHuespedes" class="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50">
            <label class="block text-[9px] font-bold uppercase tracking-wider text-gray-400 pointer-events-none">Guests</label>
            <input id="inputModalHuespedes" type="text" placeholder="Add guests" readonly class="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent mt-0.5 cursor-pointer pointer-events-none" />
          </div>

          <!-- Botón Buscar (VISTA DESKTOP) -->
          <div class="hidden md:block px-6 py-3">
            <button id="btnModalBuscarEscritorio" class="bg-[#EB5757] hover:bg-[#e04b4b] text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer transition-colors">
              Buscar
            </button>
          </div>
        </div>

        <!-- Paneles desplegables de opciones inferiores -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 flex-1 overflow-y-auto">
          
          <!-- Contenedor de la lista de ciudades -->
          <div id="panelListaCiudades" class="flex flex-col gap-6"></div>

          <!-- Selectores numéricos de personas -->
          <div id="panelListaHuespedes" class="flex flex-col gap-8 hidden">
            
          <!-- Selector Adultos -->
            <div class="flex flex-col gap-1">
              <span class="text-sm font-bold text-gray-800">Adults</span>
              <span class="text-xs text-gray-400">Ages 13 or above</span>
              
              <div class="flex items-center gap-4 mt-2">
                <button id="btnMenosAdultos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">-</button>
                <span id="txtAdultos" class="text-sm font-bold w-4 text-center">0</span>
                <button id="btnMasAdultos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">+</button>
              </div>
            </div>


            <!-- Selector Niños -->
            <div class="flex flex-col gap-1">
              <span class="text-sm font-bold text-gray-800">Children</span>

              <span class="text-xs text-gray-400">Ages 2-12</span>
              <div class="flex items-center gap-4 mt-2">
                <button id="btnMenosNinos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">-</button>
                
                <span id="txtNinos" class="text-sm font-bold w-4 text-center">0</span>

                <button id="btnMasNinos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">+</button>
              </div>
            </div>
          </div>
          
          <div class="hidden md:block"></div>
        </div>

        <!-- BOTÓN BUSCAR (mobile) -->
        <div class="mt-auto pt-4 md:hidden flex justify-center">
          <button id="btnModalBuscarMovil" class="bg-[#EB5757] active:bg-[#e04b4b] text-white font-bold text-sm px-8 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer transition-colors">
            Search
          </button>
        </div>

      </div>
    </div>
  `;
}

export function crearBotonCiudad(ciudad, pais) {
  return `
    <button class="itemCiudad flex items-center gap-3 text-sm text-gray-700 hover:text-black text-left cursor-pointer transition-colors" data-ciudad="${ciudad}">
      <img src="./public/images/icons/search.svg" class="w-4 h-4 opacity-50" alt="pin" /> 
      <span>${ciudad}, ${pais}</span>
    </button>
  `;
}