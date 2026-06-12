# Windbnb - Mejoras Adicionales ✨

Este documento detalla las funcionalidades y mejoras implementadas en el proyecto que **no están especificadas** en los requisitos originales del desafío, pero que aportan valor en términos de experiencia de usuario, robustez y buenas prácticas.

---

## 1. Selección de ciudad únicamente por clic (sin escritura libre)

El campo de ubicación es **solo lectura (`readonly`)**, por lo que el usuario no puede escribir texto libre en el input. La única forma de filtrar por ciudad es seleccionando una opción de la lista desplegable.

**Beneficio**: evita errores de tipeo, ciudades inexistentes o resultados vacíos por mala escritura (ej: "Helsinky" en vez de "Helsinki"), garantizando que el filtro siempre coincida con datos reales.

---

## 2. Efecto zoom-in en las imágenes de las tarjetas

Al pasar el mouse (o tocar en móvil) sobre la imagen de un alojamiento, esta se amplía levemente con una transición suave (`hover:scale-105`, `group-hover:scale-105`, `group-active:scale-105`).

**Beneficio**: agrega interactividad visual y feedback al usuario, dando una sensación más moderna y "viva" a la interfaz, similar a plataformas reales como Airbnb.

---
## 3. Modal de búsqueda con pestañas independientes (Ubicación / Huéspedes)

La ventana de búsqueda está dividida en dos pestañas navegables (**Location** y **Guests**), cada una con su propio estilo activo/inactivo. El usuario puede moverse entre ambas sin cerrar el modal, mejorando la organización de la información.

---

## 4. Diseño responsivo diferenciado para el modal de búsqueda

El modal de búsqueda no es simplemente una versión reducida del desktop: en móvil se transforma en una **pantalla completa** con su propio encabezado ("Edit your search"), mientras que en escritorio aparece como un panel desplegable debajo de la barra de búsqueda, ajustándose a una altura fija (`md:h-[460px]`).

---

## 5. Prevención de cierres accidentales del modal

Se utiliza `e.stopPropagation()` en todos los elementos interactivos del modal, evitando que un clic dentro de la ventana de búsqueda se propague y cierre el modal de forma involuntaria.