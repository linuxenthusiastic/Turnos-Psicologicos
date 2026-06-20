const KEY = 'turnos_psicologicos';

export function getTurnos() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveTurno(turno) {
  const turnos = getTurnos();
  turnos.push({ ...turno, id: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(turnos));
}

export function deleteTurno(id) {
  const turnos = getTurnos().filter(t => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(turnos));
}
