import { getTurnos, saveTurno, deleteTurno } from './storage.js';
import { validateTurno, formatFecha } from './validation.js';

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    if (btn.dataset.tab === 'turnos') renderTurnos();
  });
});

const form = document.getElementById('form-reserva');
const mensajeExito = document.getElementById('mensaje-exito');

function setError(field, msg) {
  document.getElementById(`error-${field}`).textContent = msg;
  document.getElementById(field).classList.toggle('invalid', !!msg);
}

function clearErrors() {
  ['nombre', 'email', 'fecha', 'hora'].forEach(f => setError(f, ''));
}

function isTurnoOcupado(fecha, hora) {
  return getTurnos().some(t => t.fecha === fecha && t.hora === hora);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    motivo: document.getElementById('motivo').value,
  };

  clearErrors();
  const { valid, errors } = validateTurno(data);
  Object.entries(errors).forEach(([field, msg]) => setError(field, msg));
  if (!valid) return;

  if (isTurnoOcupado(data.fecha, data.hora)) {
    setError('hora', 'Ese horario ya está reservado. Elegí otro.');
    return;
  }

  saveTurno(data);
  form.reset();
  const SUCCESS_DISPLAY_MS = 3000;
  mensajeExito.classList.remove('hidden');
  setTimeout(() => mensajeExito.classList.add('hidden'), SUCCESS_DISPLAY_MS);
});

function renderTurnos() {
  const lista = document.getElementById('lista-turnos');
  const turnos = getTurnos().sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));

  if (turnos.length === 0) {
    lista.innerHTML = '<p class="sin-turnos">No hay turnos registrados.</p>';
    return;
  }

  lista.innerHTML = turnos.map(t => `
    <div class="turno-card">
      <div class="turno-info">
        <h3>${t.nombre}</h3>
        <p>${t.email}</p>
        ${t.motivo ? `<p><em>${t.motivo}</em></p>` : ''}
      </div>
      <div style="text-align:right">
        <div class="turno-fecha">${formatFecha(t.fecha)}<br>${t.hora} hs</div>
        <button class="btn-cancelar" data-id="${t.id}" style="margin-top:0.5rem">Cancelar</button>
      </div>
    </div>
  `).join('');

  lista.querySelectorAll('.btn-cancelar').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Cancelar este turno?')) {
        deleteTurno(Number(btn.dataset.id));
        renderTurnos();
      }
    });
  });
}
