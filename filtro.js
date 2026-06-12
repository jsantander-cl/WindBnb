// Importamos el formateador de botones de ciudad con su nuevo nombre en español
import { crearBotonCiudad } from "./searchModal.js";

/**
 * Inicializa y coordina toda la interactividad del panel de búsqueda y el filtrado.
 * @param {Array} alojamientos - Lista de datos base leídos desde el JSON.
 * @param {Function} dibujarTarjetas - Función inyectada desde main.js para actualizar la grilla principal.
 */
export function inicializarFiltros(alojamientos, dibujarTarjetas) {
  
  // --- ELEMENTOS DEL DOM: VENTANA EMERGENTE Y CONTROLES PRINCIPALES ---
  const modal = document.getElementById("search-modal");
  const btnCerrar = document.getElementById("close-modal");
  
  // Forzamos el estado oculto inline al arrancar la aplicación
  if (modal) modal.style.display = "none";

  // Disparadores de la barra superior fija (Header)
  const inputEncabezadoUbicacion = document.getElementById("input-location");
  const inputEncabezadoHuespedes = document.getElementById("input-guests");
  const btnEncabezadoBuscar = document.getElementById("btn-header-search");

  // Pestañas e Inputs internos de control dentro de la ventana emergente
  const pestañaUbicacion = document.getElementById("trigger-location");
  const pestañaHuespedes = document.getElementById("trigger-guests");
  const panelUbicaciones = document.getElementById("panel-locations");
  const panelHuespedes = document.getElementById("panel-guests");

  // Botones finales de acción "Buscar" dentro del modal
  const btnBuscarEscritorio = document.getElementById("modal-btn-search-desktop");
  const btnBuscarMovil = document.getElementById("modal-btn-search-mobile");

  // Cuadros de texto internos del modal
  const inputModalUbicacion = document.getElementById("modal-input-location");
  const inputModalHuespedes = document.getElementById("modal-input-guests");

  // --- VARIABLES DE CONTROL INTERNO (ESTADO ACTUAL) ---
  let adultos = 0;
  let ninos = 0;
  let filtroCiudad = ""; 

  /**
   * Filtra las habitaciones en tiempo real basándose en los inputs actuales y redibuja la pantalla.
   */
  function ejecutarFiltro() {
    const totalHuespedes = adultos + ninos;

    const listaFiltrada = alojamientos.filter(alojamiento => {
      // Condición 1: Comparamos nombres en minúsculas ignorando espacios vacíos
      const coincideCiudad = filtroCiudad === "" || 
        alojamiento.city.toLowerCase().trim() === filtroCiudad.toLowerCase().trim();

      // Condición 2: Validamos que la habitación soporte al menos la cantidad actual de huéspedes
      const coincideHuespedes = alojamiento.maxGuests >= totalHuespedes;

      return coincideCiudad && coincideHuespedes;
    });

    // Redibujamos de forma inmediata las tarjetas llamando a la función externa de main.js
    dibujarTarjetas(listaFiltrada);
  }

  // --- GENERACIÓN DINÁMICA DE LA LISTA DE CIUDADES ÚNICAS ---
  if (panelUbicaciones && alojamientos) {
    const ciudadesUnicas = new Set();
    
    // Almacenamos registros formateados "Ciudad|País" evitando duplicaciones con el Set
    alojamientos.forEach(alojamiento => {
      ciudadesUnicas.add(`${alojamiento.city}|${alojamiento.country}`);
    });
    
    panelUbicaciones.innerHTML = "";

    // Construimos los botones reales inyectando la plantilla importada
    ciudadesUnicas.forEach(registro => {
      const [ciudad, pais] = registro.split("|");
      panelUbicaciones.innerHTML += crearBotonCiudad(ciudad, pais);
    });
  }

  // --- CAPTURA DE EVENTOS: SELECCIÓN Y ESCRITURA DE UBICACIÓN ---
  
  // Al hacer clic en un botón de ciudad de la lista izquierda
  if (panelUbicaciones) {
    panelUbicaciones.addEventListener("click", (e) => {
      e.stopPropagation();
      const botonPresionado = e.target.closest(".item-ciudad");
      
      if (botonPresionado && inputModalUbicacion) {
        const ciudadSeleccionada = botonPresionado.getAttribute("data-ciudad");
        
        // Sincronizamos las variables y los cuadros de texto
        filtroCiudad = ciudadSeleccionada;
        inputModalUbicacion.value = `${ciudadSeleccionada}, Finland`;
        if (inputEncabezadoUbicacion) inputEncabezadoUbicacion.value = `${ciudadSeleccionada}, Finland`;

        ejecutarFiltro();
      }
    });
  }

  // Al escribir manualmente dentro del input de ubicación del modal
  if (inputModalUbicacion) {
    inputModalUbicacion.addEventListener("input", (e) => {
      // Limpiamos la cadena para capturar la ciudad pura si el usuario borra o escribe
      const textoLimpio = e.target.value.replace(", Finland", "").trim();
      filtroCiudad = textoLimpio;

      if (inputEncabezadoUbicacion) inputEncabezadoUbicacion.value = e.target.value;

      ejecutarFiltro();
    });
  }

  // --- CAPTURA DE EVENTOS: CONTADORES NUMÉRICOS DE PERSONAS ---
  if (panelHuespedes) {
    // Si solo existe el bloque de adultos, inyectamos dinámicamente la fila de niños
    if (panelHuespedes.children.length === 1) {
      panelHuespedes.innerHTML += `
        <div class="flex flex-col gap-1">
          <span class="text-sm font-bold text-gray-800">Children</span>
          <span class="text-xs text-gray-400">Ages 2-12</span>
          <div class="flex items-center gap-4 mt-2">
            <button id="btn-menos-ninos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">-</button>
            <span id="txt-ninos" class="text-sm font-bold w-4 text-center">0</span>
            <button id="btn-mas-ninos" class="w-6 h-6 border border-gray-400 rounded flex items-center justify-center font-bold text-gray-500 cursor-pointer">+</button>
          </div>
        </div>
      `;

      // Asignamos identificadores directos a la primera fila (Adultos) para controlarla de forma estricta
      const bloqueAdultos = panelHuespedes.children[0].querySelector(".flex.items-center.gap-4");
      if (bloqueAdultos) {
        bloqueAdultos.children[0].id = "btn-menos-adultos";
        bloqueAdultos.children[1].id = "txt-adultos";
        bloqueAdultos.children[2].id = "btn-mas-adultos";
      }
    }

    // Vinculamos las variables con sus respectivos elementos del DOM
    const btnMenosAdultos = document.getElementById("btn-menos-adultos");
    const txtAdultos = document.getElementById("txt-adultos");
    const btnMasAdultos = document.getElementById("btn-mas-adultos");

    const btnMenosNinos = document.getElementById("btn-menos-ninos");
    const txtNinos = document.getElementById("txt-ninos");
    const btnMasNinos = document.getElementById("btn-mas-ninos");

    // Eventos de control numérico para Adultos
    if (btnMenosAdultos && btnMasAdultos && txtAdultos) {
      btnMenosAdultos.addEventListener("click", (e) => {
        e.stopPropagation();
        if (adultos > 0) {
          adultos--;
          txtAdultos.textContent = adultos;
          actualizarMarcadorHuespedes();
        }
      });

      btnMasAdultos.addEventListener("click", (e) => {
        e.stopPropagation();
        adultos++;
        txtAdultos.textContent = adultos;
        actualizarMarcadorHuespedes();
      });
    }

    // Eventos de control numérico para Niños
    if (btnMenosNinos && btnMasNinos && txtNinos) {
      btnMenosNinos.addEventListener("click", (e) => {
        e.stopPropagation();
        if (ninos > 0) {
          ninos--;
          txtNinos.textContent = ninos;
          actualizarMarcadorHuespedes();
        }
      });

      btnMasNinos.addEventListener("click", (e) => {
        e.stopPropagation();
        ninos++;
        txtNinos.textContent = ninos;
        actualizarMarcadorHuespedes();
      });
    }
  }

  /**
   * Suma los contadores, actualiza los textos visuales de huéspedes y activa el filtrado.
   */
  function actualizarMarcadorHuespedes() {
    const total = adultos + ninos;
    const textoResumen = total > 0 ? `${total} guests` : "";
    
    if (inputModalHuespedes) inputModalHuespedes.value = textoResumen;
    if (inputEncabezadoHuespedes) inputEncabezadoHuespedes.value = textoResumen;

    ejecutarFiltro();
  }

  // --- CONTROL EXCLUSIVO DE VISIBILIDAD DE MENÚS (OPEN/CLOSE/TOGGLE) ---
  
  function alternarModal(seccionInicial) {
    if (!modal) return;
    if (modal.style.display === "none") {
      modal.style.display = "flex";
      if (seccionInicial === "location") mostrarSeccionUbicacion();
      if (seccionInicial === "guests") mostrarSeccionHuespedes();
    } else {
      modal.style.display = "none";
    }
  }

  function ocultarModal() {
    if (modal) modal.style.display = "none";
  }

  function mostrarSeccionUbicacion() {
    if (panelUbicaciones) panelUbicaciones.style.display = "flex";
    if (panelHuespedes) panelHuespedes.style.display = "none";
  }

  function mostrarSeccionHuespedes() {
    if (panelHuespedes) panelHuespedes.style.display = "flex";
    if (panelUbicaciones) panelUbicaciones.style.display = "none";
  }

  // --- ESCUCHADORES DE CLIC PARA NAVEGACIÓN Y CIERRES ---
  
  if (inputEncabezadoUbicacion) {
    inputEncabezadoUbicacion.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarModal("location");
    });
  }

  if (inputEncabezadoHuespedes) {
    inputEncabezadoHuespedes.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarModal("guests");
    });
  }

  if (btnEncabezadoBuscar) {
    btnEncabezadoBuscar.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarModal("location");
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", (e) => {
      e.stopPropagation();
      ocultarModal();
    });
  }

  if (pestañaUbicacion) {
    pestañaUbicacion.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarSeccionUbicacion();
    });
  }

  if (pestañaHuespedes) {
    pestañaHuespedes.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarSeccionHuespedes();
    });
  }

  if (btnBuscarEscritorio) {
    btnBuscarEscritorio.addEventListener("click", (e) => {
        e.stopPropagation();ocultarModal();});}if (btnBuscarMovil) {btnBuscarMovil.addEventListener("click", (e) => {e.stopPropagation();ocultarModal();});}}