function initUI() {
  // Manejador centralizado para botones y enlaces de navegación
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-section]');
    if (btn) {
      e.preventDefault();
      const section = btn.getAttribute('data-section');
      navigateTo(section);
    }
  });

  // Detectar cuando el usuario cambia manualmente la URL/Hash en el navegador
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      navigateTo(hash);
    }
  });

  // Cargar la sección correspondiente según el Hash inicial de la URL
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    navigateTo(initialHash);
  } else {
    navigateTo('inicio');
  }

  // Formulario de Contacto (VD-18 a VD-21)
  document.getElementById('formContacto')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    valid &= validateField('cntNombre', 'err-cntNombre', v => v.trim().length > 0, "Ingresa tu nombre.");
    valid &= validateField('cntCorreo', 'err-cntCorreo', Rules.isValidEmail, "Ingresa un correo válido.");
    valid &= validateField('cntAsunto', 'err-cntAsunto', v => v.trim().length > 0, "Ingresa el asunto.");
    valid &= validateField('cntMensaje', 'err-cntMensaje', v => v.trim().length > 0, "Ingresa un mensaje.");

    if (valid) {
      alert("¡Mensaje de contacto enviado con éxito!");
      e.target.reset();
    }
  });

  // Formulario de Chat (VD-22)
  document.getElementById('formChat')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const errSpan = document.getElementById('err-chatInput');

    if (!input.value.trim()) {
      errSpan.textContent = "Escribe un mensaje antes de enviarlo.";
      return;
    }

    errSpan.textContent = "";
    appendChatMessage("Tú", input.value.trim());
    input.value = "";

    setTimeout(() => {
      appendChatMessage("Empresa/Soporte", "Gracias por contactarnos. Un representante te responderá en breve.");
    }, 1000);
  });
}

/**
 * Función principal para navegar entre secciones.
 * Muestra la sección deseada o FUERZA el despliegue del Error 404 si no existe.
 */
function navigateTo(sectionId) {
  // Limpiar el estado activo de TODAS las secciones
  const allSections = document.querySelectorAll('.page-section');
  allSections.forEach(s => s.classList.remove('active'));

  // Buscar la sección correspondiente en el HTML
  const targetSection = document.getElementById(`sec-${sectionId}`);

  if (targetSection) {
    // Si la sección existe, la muestra
    targetSection.classList.add('active');
    window.location.hash = sectionId;
  } else {
    // SI LA SECCIÓN NO EXISTE: Despliega la ventana/sección de Error 404
    renderDynamicError404(sectionId);
  }

  window.scrollTo(0, 0);
}

/**
 * Activa y renderiza la pantalla de Error 404
 */
function renderDynamicError404(invalidRoute) {
  const errorSection = document.getElementById('sec-error-404');
  const errorDetailEl = document.getElementById('errorRouteDetail');

  if (errorDetailEl) {
    errorDetailEl.textContent = `Ruta o recurso no encontrado: "${invalidRoute}"`;
  }

  if (errorSection) {
    errorSection.classList.add('active');
    window.location.hash = `error-404`;
  }
}

function showSection(sectionId) {
  navigateTo(sectionId);
}

function appendChatMessage(sender, text) {
  const box = document.getElementById('chatBox');
  if (!box) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}