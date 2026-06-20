const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateTurno(data) {
  const errors = {};

  if (!data.nombre || !data.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio.';
  }

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
