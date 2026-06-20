const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HORA_REGEX  = /^([01]\d|2[0-3]):([0-5]\d)$/;
const NOMBRE_MIN  = 2;

export function esHoraValida(hora) {
  return HORA_REGEX.test(hora);
}

function _validarNombre(nombre, errors) {
  if (!nombre || !nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio.';
  } else if (nombre.trim().length < NOMBRE_MIN) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres.';
  }
}

export function validateTurno(data) {
  const errors = {};

  _validarNombre(data.nombre, errors);

  if (!data.email || !data.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Ingresá un email válido.';
  }

  if (!data.fecha) {
    errors.fecha = 'Seleccioná una fecha.';
  } else if (data.fecha < new Date().toISOString().split('T')[0]) {
    errors.fecha = 'La fecha no puede ser en el pasado.';
  }

  if (!data.hora) {
    errors.hora = 'Seleccioná un horario.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function formatFecha(fecha) {
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y}`;
}
