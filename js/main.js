/**
 * ==============================================================================
 * MAIN.JS - Lógica Global Compartida
 * Portafolio Web Personal (MPA)
 * ==============================================================================
 * Este script se ejecuta en las 5 páginas del sitio.
 * Responsabilidades:
 * 1. Control del menú hamburguesa móvil.
 * 2. Detección y marcado automático de la página activa en la navegación.
 * 3. Inserción dinámica del año en curso en el pie de página.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------------------
  // 1. MENÚ MÓVIL (Hamburguesa)
  // ----------------------------------------------------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    // Alternar menú al presionar el botón
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Cerrar el menú móvil al hacer clic en cualquier enlace de navegación
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Cerrar el menú móvil si el usuario hace clic fuera de la barra de navegación
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 2. ENLACE ACTIVO AUTOMÁTICO (.nav-link.active)
  // ----------------------------------------------------------------------------
  // Obtenemos el nombre del archivo actual desde la ruta del navegador
  const currentPath = window.location.pathname;
  let currentPage = currentPath.split("/").pop().toLowerCase();

  // Si la ruta termina en carpeta o está vacía, corresponde a index.html
  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  const allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach((link) => {
    // Obtenemos el atributo href del enlace
    const href = link.getAttribute("href");
    if (!href) return;

    // Comparamos el href con la página actual
    const linkPage = href.split("/").pop().toLowerCase();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ----------------------------------------------------------------------------
  // 3. AÑO DINÁMICO EN EL FOOTER (#current-year)
  // ----------------------------------------------------------------------------
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
