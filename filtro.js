import { crearBotonCiudad } from "./searchmodal.js";

export function inicializarFiltros(alojamientos, dibujarTarjetas) {

  // Variables para guardar el estado de los filtros
  let cantidadAdultos = 0;
  let cantidadNinos = 0;
  let ciudadElegida = "";

  // Buscamos todos los elementos que vamos a usar
  const modal = document.getElementById("ventanaEmergenteBusqueda");
  const btnCerrar = document.getElementById("btnCerrarModal");

  const inputEncabezadoUbicacion = document.getElementById("encabezadoFiltroUbicacion");
  const inputEncabezadoHuespedes = document.getElementById("encabezadoFiltroHuespedes");
  const btnEncabezadoBuscar = document.getElementById("btnEncabezadoBuscar");

  const pestanaUbicacion = document.getElementById("pestanaModalUbicacion");
  const pestanaHuespedes = document.getElementById("pestanaModalHuespedes");

  const panelUbicaciones = document.getElementById("panelListaCiudades");
  const panelHuespedes = document.getElementById("panelListaHuespedes");

  const btnBuscarEscritorio = document.getElementById("btnModalBuscarEscritorio");
  const btnBuscarMovil = document.getElementById("btnModalBuscarMovil");

  const inputModalUbicacion = document.getElementById("inputModalUbicacion");
  const inputModalHuespedes = document.getElementById("inputModalHuespedes");

  const btnMenosAdultos = document.getElementById("btnMenosAdultos");
  const txtAdultos = document.getElementById("txtAdultos");
  const btnMasAdultos = document.getElementById("btnMasAdultos");

  const btnMenosNinos = document.getElementById("btnMenosNinos");
  const txtNinos = document.getElementById("txtNinos");
  const btnMasNinos = document.getElementById("btnMasNinos");


  // ----------------------------------------------
  // FUNCIÓN PRINCIPAL: filtra los alojamientos
  // ----------------------------------------------
  function filtrarAlojamientos() {
    const totalHuespedes = cantidadAdultos + cantidadNinos;
    const resultado = [];

    for (let i = 0; i < alojamientos.length; i++) {
      const alojamiento = alojamientos[i];

      let coincideCiudad = false;
      if (ciudadElegida === "") {
        coincideCiudad = true;
      } else if (alojamiento.city.toLowerCase() === ciudadElegida.toLowerCase()) {
        coincideCiudad = true;
      }

      let coincideHuespedes = false;
      if (alojamiento.maxGuests >= totalHuespedes) {
        coincideHuespedes = true;
      }

      if (coincideCiudad && coincideHuespedes) {
        resultado.push(alojamiento);
      }
    }

    dibujarTarjetas(resultado);
  }


  // ----------------------------------------------
  // CREAR LISTA DE CIUDADES (sin repetir)
  // ----------------------------------------------
  if (panelUbicaciones) {
    const ciudadesYaAgregadas = [];

    for (let i = 0; i < alojamientos.length; i++) {
      const ciudad = alojamientos[i].city;
      const pais = alojamientos[i].country;

      if (ciudadesYaAgregadas.indexOf(ciudad) === -1) {
        ciudadesYaAgregadas.push(ciudad);
        panelUbicaciones.innerHTML += crearBotonCiudad(ciudad, pais);
      }
    }
  }


  // ----------------------------------------------
  // CLIC EN UNA CIUDAD DE LA LISTA
  // ----------------------------------------------
  if (panelUbicaciones) {
    panelUbicaciones.addEventListener("click", function (e) {
      e.stopPropagation();

      const boton = e.target.closest(".itemCiudad");

      if (boton) {
        const ciudad = boton.getAttribute("data-ciudad");
        ciudadElegida = ciudad;

        inputModalUbicacion.value = ciudad + ", Finland";
        inputEncabezadoUbicacion.value = ciudad + ", Finland";

        filtrarAlojamientos();
      }
    });
  }


  // ----------------------------------------------
  // ESCRIBIR EN EL INPUT DE UBICACIÓN
  // ----------------------------------------------
  if (inputModalUbicacion) {
    inputModalUbicacion.addEventListener("input", function (e) {
      let texto = e.target.value;
      texto = texto.replace(", Finland", "");
      ciudadElegida = texto;

      inputEncabezadoUbicacion.value = e.target.value;

      filtrarAlojamientos();
    });
  }


  // ----------------------------------------------
  // BOTONES DE ADULTOS
  // ----------------------------------------------
  if (btnMenosAdultos) {
    btnMenosAdultos.addEventListener("click", function (e) {
      e.stopPropagation();

      if (cantidadAdultos > 0) {
        cantidadAdultos = cantidadAdultos - 1;
        txtAdultos.textContent = cantidadAdultos;
        actualizarTextoHuespedes();
      }
    });
  }

  if (btnMasAdultos) {
    btnMasAdultos.addEventListener("click", function (e) {
      e.stopPropagation();

      cantidadAdultos = cantidadAdultos + 1;
      txtAdultos.textContent = cantidadAdultos;
      actualizarTextoHuespedes();
    });
  }


  // ----------------------------------------------
  // BOTONES DE NIÑOS
  // ----------------------------------------------
  if (btnMenosNinos) {
    btnMenosNinos.addEventListener("click", function (e) {
      e.stopPropagation();

      if (cantidadNinos > 0) {
        cantidadNinos = cantidadNinos - 1;
        txtNinos.textContent = cantidadNinos;
        actualizarTextoHuespedes();
      }
    });
  }

  if (btnMasNinos) {
    btnMasNinos.addEventListener("click", function (e) {
      e.stopPropagation();

      cantidadNinos = cantidadNinos + 1;
      txtNinos.textContent = cantidadNinos;
      actualizarTextoHuespedes();
    });
  }


  // ----------------------------------------------
  // ACTUALIZAR EL TEXTO "X guests"
  // ----------------------------------------------
  function actualizarTextoHuespedes() {
    const total = cantidadAdultos + cantidadNinos;

    let texto = "";
    if (total > 0) {
      texto = total + " guests";
    }

    inputModalHuespedes.value = texto;
    inputEncabezadoHuespedes.value = texto;

    filtrarAlojamientos();
  }


  // ----------------------------------------------
  // ABRIR Y CERRAR EL MODAL
  // ----------------------------------------------
  function abrirModal(seccion) {
    modal.style.display = "flex";

    if (seccion === "location") {
      mostrarUbicaciones();
    }
    if (seccion === "guests") {
      mostrarHuespedes();
    }
  }

  function cerrarModal() {
    modal.style.display = "none";
  }


  // ----------------------------------------------
  // MOSTRAR PESTAÑA UBICACIÓN
  // ----------------------------------------------
  function mostrarUbicaciones() {
    panelUbicaciones.style.display = "flex";
    panelHuespedes.style.display = "none";

    pestanaUbicacion.className = "flex-1 px-6 py-3 border border-gray-900 rounded-2xl bg-gray-50 cursor-pointer";
    pestanaHuespedes.className = "flex-1 px-6 py-3 border border-transparent cursor-pointer hover:bg-gray-50";
  }


  // ----------------------------------------------
  // MOSTRAR PESTAÑA HUÉSPEDES
  // ----------------------------------------------
  function mostrarHuespedes() {
    panelHuespedes.style.display = "flex";
    panelUbicaciones.style.display = "none";

    pestanaHuespedes.className = "flex-1 px-6 py-3 border border-gray-900 rounded-2xl bg-gray-50 cursor-pointer";
    pestanaUbicacion.className = "flex-1 px-6 py-3 border border-transparent cursor-pointer hover:bg-gray-50";
  }


  // ----------------------------------------------
  // EVENTOS PARA ABRIR EL MODAL
  // ----------------------------------------------
  if (inputEncabezadoUbicacion) {
    inputEncabezadoUbicacion.addEventListener("click", function (e) {
      e.stopPropagation();
      abrirModal("location");
    });
  }

  if (inputEncabezadoHuespedes) {
    inputEncabezadoHuespedes.addEventListener("click", function (e) {
      e.stopPropagation();
      abrirModal("guests");
    });
  }

  if (btnEncabezadoBuscar) {
    btnEncabezadoBuscar.addEventListener("click", function (e) {
      e.stopPropagation();
      abrirModal("location");
    });
  }


  // ----------------------------------------------
  // EVENTO PARA CERRAR EL MODAL
  // ----------------------------------------------
  if (btnCerrar) {
    btnCerrar.addEventListener("click", function (e) {
      e.stopPropagation();
      cerrarModal();
    });
  }


  // ----------------------------------------------
  // EVENTOS PARA CAMBIAR DE PESTAÑA DENTRO DEL MODAL
  // ----------------------------------------------
  if (pestanaUbicacion) {
    pestanaUbicacion.addEventListener("click", function (e) {
      e.stopPropagation();
      mostrarUbicaciones();
    });
  }

  if (pestanaHuespedes) {
    pestanaHuespedes.addEventListener("click", function (e) {
      e.stopPropagation();
      mostrarHuespedes();
    });
  }


  // ----------------------------------------------
  // BOTONES "BUSCAR" QUE CIERRAN EL MODAL
  // ----------------------------------------------
  if (btnBuscarEscritorio) {
    btnBuscarEscritorio.addEventListener("click", function (e) {
      e.stopPropagation();
      cerrarModal();
    });
  }

  if (btnBuscarMovil) {
    btnBuscarMovil.addEventListener("click", function (e) {
      e.stopPropagation();
      cerrarModal();
    });
  }

}