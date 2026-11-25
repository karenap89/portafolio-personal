# Portafolio Web Personal (MPA)

Proyecto académico de un sitio web de **5 páginas independientes** desarrollado exclusivamente con tecnologías web nativas (**HTML5**, **CSS3** y **JavaScript puro / Vanilla JS**), sin el uso de librerías ni frameworks externos.

---

## 1. Objetivo del Proyecto
Desarrollar un sitio web personal de **5 páginas independientes** que compartan una misma identidad visual (encabezado, menú de navegación, paleta de colores, tipografía y pie de página), utilizando únicamente tecnologías web nativas.

---

## 2. Reglas Técnicas Estrictas
1. **Solo tecnologías nativas**: Únicamente **HTML5**, **CSS3** y **JavaScript puro (Vanilla JS)**.
2. **Sin frameworks ni librerías**: No usar Bootstrap, Tailwind, React, Vue, jQuery ni plantillas externas.
3. **Sin backend**: Toda la funcionalidad debe ejecutarse en el navegador del cliente.
4. **Sitio Multipágina (MPA)**: Cada sección principal debe ser un archivo `.html` independiente (no construir todo en una sola página de scroll largo).
5. **Convención de idioma**:
   * **Nombres de archivos, carpetas, IDs y clases CSS**: en **inglés** (`index.html`, `about.html`, `.nav-menu`, `.project-card`).
   * **Contenido visible para el visitante y comentarios del código**: en **español**.

---

## 3. Arquitectura Oficial de Carpetas y Archivos
```text
c:\Portafolio\
│
├── README.md               # Especificación y guía del proyecto
├── index.html              # Página 1: Inicio (Presentación y resumen)
├── about.html              # Página 2: Sobre mí (Biografía, trayectoria y CV)
├── skills.html             # Página 3: Habilidades (Técnicas, herramientas y blandas)
├── projects.html           # Página 4: Proyectos (Galería de tarjetas de proyectos)
├── contact.html            # Página 5: Contacto (WhatsApp, LinkedIn, Correo y formulario)
│
├── css/
│   ├── global.css          # Variables (:root), reset, botones, header, nav y footer
│   └── pages.css           # Estilos específicos del contenido (<main>) de cada página
│
├── js/
│   ├── main.js             # Lógica global (menú móvil, enlace activo y año del footer)
│   └── contact.js          # Lógica de contacto (copiar correo, validar form, enviar a WhatsApp/mailto)
│
└── assets/
    ├── img/                # Foto de perfil e imágenes de proyectos
    └── docs/               # Currículum Vitae en PDF para descarga
```

---

## 4. Responsabilidad de Archivos

### A. Estructura Compartida en los 5 Archivos HTML
Todos los archivos `.html` comparten el mismo `<header>` y `<footer>`, variando únicamente el contenido dentro de `<main>`:
* **`<head>`**: Enlaza `css/global.css` y `css/pages.css`.
* **`<header class="site-header">`**: Contiene la navegación `.navbar` con logo, botón de menú móvil (`#menu-toggle`) y la lista `.nav-menu`.
* **`<main>`**: Vista específica de cada página.
* **`<footer class="site-footer">`**: Créditos con `#current-year` y enlaces rápidos.
* **Scripts**: Todos cargan `js/main.js`, y `contact.html` carga adicionalmente `js/contact.js`.

### B. Vistas del Sitio
1. **`index.html` (Inicio)**: Sección Hero con foto de perfil, presentación, botones de acción y 3 tarjetas de fortalezas en cuadrícula.
2. **`about.html` (Sobre mí)**: Cuadrícula de 2 columnas con biografía + descarga de CV y línea de tiempo académica/laboral.
3. **`skills.html` (Habilidades)**: Tarjetas por categoría con barras de progreso visuales animadas.
4. **`projects.html` (Proyectos)**: Cuadrícula con 3 proyectos, insignias de tecnologías, imagen y enlaces a Demo y Código.
5. **`contact.html` (Contacto)**: Canales directos (WhatsApp, LinkedIn, Correo con botón para copiar al portapapeles) y formulario interactivo con opción de envío vía cliente de correo o WhatsApp Web.

---

## 5. Instrucciones de Ejecución y Visualización
Para abrir y probar el proyecto:
1. Abre cualquier archivo `.html` (por ejemplo `index.html`) directamente en cualquier navegador moderno (Google Chrome, Firefox, Edge, Safari).
2. Si utilizas la extensión *Live Server* en tu editor, haz clic derecho en `index.html` y selecciona **Open with Live Server**.

---

## 6. Personalización
Para personalizar este portafolio con tus propios datos:
* **Textos e información personal**: Modifica el contenido dentro de `<main>` en cada archivo `.html`.
* **Imágenes**: Coloca tu foto de perfil e imágenes de tus proyectos en `assets/img/` y actualiza la ruta `src` en los archivos HTML.
* **Currículum Vitae**: Guarda tu CV en `assets/docs/curriculum-vitae.pdf`.
* **Colores**: Edita las variables CSS en `:root` dentro de `css/global.css`.
* **Número de teléfono y correo**: Modifica los atributos `href` y las constantes en `contact.html` y `js/contact.js`.
