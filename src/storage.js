const KEY = 'turnos_psicologicos';

function _generateId() {
  return Date.now();
}

export function getTurnos() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveTurno(turno) {
  const turnos = getTurnos();
  turnos.push({ ...turno, id: _generateId() });
  localStorage.setItem(KEY, JSON.stringify(turnos));
}

export function deleteTurno(id) {
  const turnos = getTurnos().filter(t => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(turnos));
}

export function isTurnoOcupado(fecha, hora) {
  return getTurnos().some(t => t.fecha === fecha && t.hora === hora);
}

export function getTurnosByFecha(fecha) {
  return getTurnos().filter(t => t.fecha === fecha);
}
