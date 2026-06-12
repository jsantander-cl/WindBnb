import { crearBotonCiudad } from "./searchModal.js";

export function inicializarFiltros(alojamientos, dibujarTarjetas) {
  const modal = document.getElementById("ventanaEmergenteBusqueda");
  const btnCerrar = document.getElementById("btnCerrarModal");

  const inputEncabezadoUbicacion = document.getElementById("encabezadoFiltroUbicacion");
  const inputEncabezadoHuespedes = document.getElementById("encabezadoFiltroHuespedes");
  const btnEncabezadoBuscar = document.getElementById("btnEncabezadoBuscar");

  const pestañaUbicacion = document.getElementById("pestanaModalUbicacion");
  const pestañaHuespedes = document.getElementById("pestanaModalHuespedes");
  
  const panelUbicaciones = document.getElementById("panelListaCiudades");
  const panelHuespedes = document.getElementById("panelListaHuespedes");

  const btnBuscarEscritorio = document.getElementById("btnModalBuscarEscritorio");
  
  const btnBuscarMovil = document.getElementById("btnModalBuscarMovil");

  const inputModalUbicacion = document.getElementById("inputModalUbicacion");
  const inputModalHuespedes = document.getElementById("inputModalHuespedes");

  let cantidadAdultos = 0;
  let cantidadNinos = 0;
  let filtroCiudadTexto = "";

  function ejecutarFiltro() {
    const totalHuespedes = cantidadAdultos + cantidadNinos;

    const listaFiltrada = alojamientos.filter((alojamiento) => {
      const coincideCiudad = filtroCiudadTexto === "" || 
        alojamiento.city.toLowerCase().trim() === filtroCiudadTexto.toLowerCase().trim();

      const coincideHuespedes = alojamiento.maxGuests >= totalHuespedes;

      return coincideCiudad && coincideHuespedes;
    });

    dibujarTarjetas(listaFiltrada);
  }

  if (panelUbicaciones && alojamientos) {
    const ciudadesUnicas = new Set();
    alojamientos.forEach((alojamiento) => {
      ciudadesUnicas.add(`${alojamiento.city}|${alojamiento.country}`);
    });

    panelUbicaciones.innerHTML = "";

    ciudadesUnicas.forEach((registro) => {
      const [ciudad, pais] = registro.split("|");
      panelUbicaciones.innerHTML += crearBotonCiudad(ciudad, pais);
    });
  }

  if (panelUbicaciones) {
    panelUbicaciones.addEventListener("click", (e) => {
      e.stopPropagation();
      const botonPresionado = e.target.closest(".itemCiudad");

      if (botonPresionado && inputModalUbicacion) {
        const ciudadSeleccionada = botonPresionado.getAttribute("data-ciudad");

        filtroCiudadTexto = ciudadSeleccionada;
        inputModalUbicacion.value = `${ciudadSeleccionada}, Finland`;
        if (inputEncabezadoUbicacion) inputEncabezadoUbicacion.value = `${ciudadSeleccionada}, Finland`;

        ejecutarFiltro();
      }
    });
  }

  if (inputModalUbicacion) {
    inputModalUbicacion.addEventListener("input", (e) => {
      filtroCiudadTexto = e.target.value.replace(", Finland", "").trim();
      if (inputEncabezadoUbicacion) inputEncabezadoUbicacion.value = e.target.value;
      ejecutarFiltro();
    });
  }

  const btnMenosAdultos = document.getElementById("btnMenosAdultos");
  const txtAdultos = document.getElementById("txtAdultos");
  const btnMasAdultos = document.getElementById("btnMasAdultos");

  const btnMenosNinos = document.getElementById("btnMenosNinos");
  const txtNinos = document.getElementById("txtNinos");
  const btnMasNinos = document.getElementById("btnMasNinos");

  if (btnMenosAdultos && btnMasAdultos && txtAdultos) {
    btnMenosAdultos.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cantidadAdultos > 0) {
        cantidadAdultos--;
        txtAdultos.textContent = cantidadAdultos;
        actualizarMarcadorHuespedes();
      }
    });

    btnMasAdultos.addEventListener("click", (e) => {
      e.stopPropagation();
      cantidadAdultos++;
      txtAdultos.textContent = cantidadAdultos;
      actualizarMarcadorHuespedes();
    });
  }

  if (btnMenosNinos && btnMasNinos && txtNinos) {
    btnMenosNinos.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cantidadNinos > 0) {
        cantidadNinos--;
        txtNinos.textContent = cantidadNinos;
        actualizarMarcadorHuespedes();
      }
    });

    btnMasNinos.addEventListener("click", (e) => {
      e.stopPropagation();
      cantidadNinos++;
      txtNinos.textContent = cantidadNinos;
      actualizarMarcadorHuespedes();
    });
  }

  function actualizarMarcadorHuespedes() {
    const total = cantidadAdultos + cantidadNinos;
    const textoResumen = total > 0 ? `${total} guests` : "";

    if (inputModalHuespedes) inputModalHuespedes.value = textoResumen;
    if (inputEncabezadoHuespedes) inputEncabezadoHuespedes.value = textoResumen;

    ejecutarFiltro();
  }

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

    if (pestañaUbicacion) pestañaUbicacion.className = "flex-1 px-6 py-3 border border-gray-900 rounded-2xl bg-gray-50 cursor-pointer";
    if (pestañaHuespedes) pestañaHuespedes.className = "flex-1 px-6 py-3 border border-transparent cursor-pointer hover:bg-gray-50";
  }

  function mostrarSeccionHuespedes() {
    if (panelHuespedes) panelHuespedes.style.display = "flex";
    if (panelUbicaciones) panelUbicaciones.style.display = "none";

    if (pestañaHuespedes) pestañaHuespedes.className = "flex-1 px-6 py-3 border border-gray-900 rounded-2xl bg-gray-50 cursor-pointer";
    if (pestañaUbicacion) pestañaUbicacion.className = "flex-1 px-6 py-3 border border-transparent cursor-pointer hover:bg-gray-50";
  }

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
    btnCerrar.addEventListener("click", (e) => { e.stopPropagation(); ocultarModal(); });
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
    btnBuscarEscritorio.addEventListener("click", (e) => { e.stopPropagation(); ocultarModal(); });
  }


  if (btnBuscarMovil) {
    btnBuscarMovil.addEventListener("click", (e) => { e.stopPropagation(); ocultarModal(); });
  }
}