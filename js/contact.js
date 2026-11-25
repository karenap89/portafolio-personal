/**
 * ==============================================================================
 * CONTACT.JS - Lógica de Contacto (Portapapeles, Validación y Envío)
 * Portafolio Web Personal (MPA)
 * ==============================================================================
 * Este script se ejecuta exclusivamente en contact.html.
 * Responsabilidades:
 * 1. Copiar dirección de correo al portapapeles.
 * 2. Validar campos requeridos y formato de correo electrónico.
 * 3. Enviar mensaje abriendo el cliente de correo nativo (mailto:).
 * 4. Enviar mensaje formateado vía WhatsApp Web / API (wa.me).
 */

document.addEventListener("DOMContentLoaded", () => {
  // ============================================================================
  // DATOS CONFIGURABLES (Personalizados con la información real del CV)
  // ============================================================================
  const CONFIG = {
    // Número telefónico con código de país (+593 para Ecuador)
    whatsappNumber: "593968454418",
    // Correo electrónico real de Karen Andrea Ponce Aguirre
    targetEmail: "karenap89@gmail.com",
  };

  // Referencias del DOM
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const sendWhatsappBtn = document.getElementById("send-whatsapp-btn");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  // ----------------------------------------------------------------------------
  // 1. FUNCIÓN: COPIAR CORREO AL PORTAPAPELES
  // ----------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const emailToCopy = CONFIG.targetEmail;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          // API moderna de portapapeles
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Método alternativo de respaldo (fallback)
          const tempInput = document.createElement("textarea");
          tempInput.value = emailToCopy;
          tempInput.style.position = "fixed";
          tempInput.style.opacity = "0";
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        // Retroalimentación visual en el botón
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = "✓ ¡Correo copiado!";
        copyEmailBtn.style.color = "var(--color-success)";

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.color = "";
        }, 2500);
      } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
        alert(`No se pudo copiar automáticamente. Mi correo es: ${emailToCopy}`);
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 2. FUNCIÓN: MOSTRAR MENSAJES DE RETROALIMENTACIÓN
  // ----------------------------------------------------------------------------
  function showFeedback(message, type) {
    if (!formFeedback) return;

    formFeedback.textContent = message;
    formFeedback.className = ""; // Limpiar clases previas
    formFeedback.classList.add(type); // 'success' o 'error'
    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearFeedback() {
    if (!formFeedback) return;
    formFeedback.textContent = "";
    formFeedback.className = "";
  }

  // ----------------------------------------------------------------------------
  // 3. FUNCIÓN: VALIDAR CAMPOS DEL FORMULARIO
  // ----------------------------------------------------------------------------
  function validateForm() {
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // Validar campos vacíos
    if (!name) {
      showFeedback("Por favor, ingresa tu nombre completo.", "error");
      nameInput.focus();
      return false;
    }

    if (!email) {
      showFeedback("Por favor, ingresa tu correo electrónico.", "error");
      emailInput.focus();
      return false;
    }

    // Expresión regular para validar formato de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFeedback("Por favor, introduce un correo electrónico válido (ejemplo: usuario@correo.com).", "error");
      emailInput.focus();
      return false;
    }

    if (!subject) {
      showFeedback("Por favor, indica el asunto del mensaje.", "error");
      subjectInput.focus();
      return false;
    }

    if (!message) {
      showFeedback("Por favor, redacta el contenido de tu mensaje.", "error");
      messageInput.focus();
      return false;
    }

    clearFeedback();
    return { name, email, subject, message };
  }

  // ----------------------------------------------------------------------------
  // 4. ENVÍO POR CORREO ELECTRÓNICO (mailto:)
  // ----------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = validateForm();
      if (!data) return;

      // Construcción del asunto y cuerpo con formato codificado
      const mailSubject = encodeURIComponent(`[Portafolio Web] ${data.subject} - de ${data.name}`);
      const mailBody = encodeURIComponent(
        `Hola,\n\nHas recibido un nuevo mensaje desde tu Portafolio Web:\n\n` +
        `• Nombre: ${data.name}\n` +
        `• Correo: ${data.email}\n` +
        `• Asunto: ${data.subject}\n\n` +
        `Mensaje:\n${data.message}\n`
      );

      const mailtoUrl = `mailto:${CONFIG.targetEmail}?subject=${mailSubject}&body=${mailBody}`;

      showFeedback("Abriendo tu cliente de correo electrónico predeterminado...", "success");

      // Abrir enlace mailto
      window.location.href = mailtoUrl;
    });
  }

  // ----------------------------------------------------------------------------
  // 5. ENVÍO POR WHATSAPP (wa.me)
  // ----------------------------------------------------------------------------
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      const data = validateForm();
      if (!data) return;

      // Construcción del mensaje para WhatsApp
      const whatsappText = encodeURIComponent(
        `👋 *Hola! Mensaje desde tu Portafolio Web*\n\n` +
        `*Nombre:* ${data.name}\n` +
        `*Correo:* ${data.email}\n` +
        `*Asunto:* ${data.subject}\n\n` +
        `*Mensaje:*\n${data.message}`
      );

      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${whatsappText}`;

      showFeedback("Redirigiendo a WhatsApp en una nueva pestaña...", "success");

      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
});
