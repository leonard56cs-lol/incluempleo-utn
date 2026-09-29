// Validaciones de datos (VD-01 a VD-24)
const Rules = {
  isNotEmpty: val => val.trim().length > 0,
  hasMinLen: (val, min) => val.trim().length >= min,
  noNumbers: val => !/\d/.test(val),
  isValidEmail: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  isValidPhone: val => /^\d{10}$/.test(val.trim()),
  isValidUrl: val => {
    if (!val) return true;
    try { new URL(val); return true; } catch { return false; }
  }
};

function validateField(inputId, errorId, testFn, errorMsg) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(errorId);
  if (!input || !errorSpan) return true;

  const valid = testFn(input.value);
  errorSpan.textContent = valid ? "" : errorMsg;
  return valid;
}

function initAuth() {
  // Manejo de Registro
  document.getElementById('formRegistro')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('regTipo').value;
    let isValid = true;

    if (tipo === 'usuario') {
      isValid &= validateField('regNombre', 'err-regNombre', v => Rules.hasMinLen(v, 4) && Rules.noNumbers(v), "Ingresa un nombre válido.");
      isValid &= validateField('regApellidos', 'err-regApellidos', v => Rules.hasMinLen(v, 4) && Rules.noNumbers(v), "Ingresa apellidos válidos.");
    } else {
      isValid &= validateField('regEmpresaNombre', 'err-regEmpresaNombre', v => Rules.hasMinLen(v, 2), "Ingresa el nombre de la empresa.");
      isValid &= validateField('regSitioWeb', 'err-regSitioWeb', Rules.isValidUrl, "Ingresa una dirección web válida.");
    }

    isValid &= validateField('regCorreo', 'err-regCorreo', Rules.isValidEmail, "Ingresa un correo electrónico válido.");
    isValid &= validateField('regTelefono', 'err-regTelefono', Rules.isValidPhone, "Ingresa un número de teléfono válido (10 dígitos).");
    isValid &= validateField('regPassword', 'err-regPassword', v => Rules.hasMinLen(v, 8), "La contraseña debe tener al menos 8 caracteres.");
    
    const passVal = document.getElementById('regPassword').value;
    isValid &= validateField('regConfirmPassword', 'err-regConfirmPassword', v => v === passVal, "Las contraseñas no coinciden.");

    if (isValid) {
      alert("¡Cuenta registrada exitosamente en IncluEmpleo!");
      showSection('login');
    }
  });

  // Manejo de Login
  document.getElementById('formLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    isValid &= validateField('loginCorreo', 'err-loginCorreo', Rules.isValidEmail, "Ingresa un correo válido.");
    isValid &= validateField('loginPassword', 'err-loginPassword', Rules.isNotEmpty, "Ingresa tu contraseña válida.");

    if (isValid) {
      alert("Inicio de sesión exitoso.");
      switchRole('user');
      showSection('inicio');
    }
  });

  // Manejo de Recuperación de Contraseña
  document.getElementById('formRecuperar')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateField('recCorreo', 'err-recCorreo', Rules.isValidEmail, "Ingresa un correo electrónico válido.")) {
      alert("Se han enviado las instrucciones de recuperación.");
      showSection('login');
    }
  });

  // Switcher de Campos de Registro
  document.getElementById('regTipo')?.addEventListener('change', (e) => {
    const val = e.target.value;
    document.getElementById('camposUsuario')?.classList.toggle('hidden', val !== 'usuario');
    document.getElementById('camposEmpresa')?.classList.toggle('hidden', val !== 'empresa');
  });

  // Selector de Rol Global
  document.getElementById('roleSelect')?.addEventListener('change', (e) => {
    switchRole(e.target.value);
  });

  document.getElementById('btnLogout')?.addEventListener('click', () => {
    switchRole('guest');
    showSection('inicio');
  });
}

function switchRole(role) {
  document.querySelectorAll('.auth-only, .guest-only, .user-only, .company-only').forEach(el => el.classList.add('hidden'));

  if (role === 'guest') {
    document.querySelectorAll('.guest-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'user') {
    document.querySelectorAll('.auth-only, .user-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'company') {
    document.querySelectorAll('.auth-only, .company-only').forEach(el => el.classList.remove('hidden'));
  }
}