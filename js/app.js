document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de Iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // Inicializar Módulos del Sistema
  initAccesibilidad();
  initAuth();
  initVacantes();
  initUI(); // Controla la navegación y la pantalla de Error 404

  // Establecer rol por defecto
  switchRole('guest');
});