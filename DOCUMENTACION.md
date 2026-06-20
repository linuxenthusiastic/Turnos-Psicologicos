# Sistema de Reserva de Turnos Psicológicos

## 1. Análisis

### Problema
Los consultorios psicológicos pequeños manejan reservas de forma manual (teléfono, WhatsApp, papel), lo que genera superposición de horarios, olvidos y falta de registro.

### Alcance
Sistema web simple para:
- Registrar un turno con nombre, email, fecha y hora
- Consultar todos los turnos registrados
- Cancelar un turno existente

No incluye: autenticación, backend, pago, ni recordatorios automáticos.

### Usuarios
- **Paciente**: reserva y consulta sus turnos
- **Profesional** (uso básico): ve el listado de turnos del día/semana

---

## 2. Diseño

### Arquitectura
Aplicación de una sola página (SPA) sin framework. Persistencia en `localStorage`.

```
index.html          → estructura HTML
src/
  main.js           → lógica de UI y eventos
  storage.js        → acceso a localStorage
  style.css         → estilos
```

### Modelo de datos (turno)
```json
{
  "id": 1748560000000,
  "nombre": "María González",
  "email": "maria@correo.com",
  "fecha": "2026-06-10",
  "hora": "10:00",
  "motivo": "Ansiedad general"
}
```

### Flujo principal
1. Usuario completa el formulario
2. Se validan los campos en el cliente
3. Se verifica que el horario no esté ocupado
4. Se guarda en `localStorage`
5. En la pestaña "Mis turnos" se listan ordenados por fecha/hora

---

## 3. Desarrollo

### Stack
| Herramienta | Uso |
|-------------|-----|
| Vanilla JS (ES Modules) | Lógica de la app |
| Vite 5 | Bundler y servidor de desarrollo |
| CSS nativo | Estilos |
| localStorage | Persistencia local |

### Comandos
```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (localhost:5173)
npm run build     # compilar para producción → /dist
npm run preview   # previsualizar build
```

---

## 4. Validación

### Reglas de validación del formulario
| Campo  | Regla |
|--------|-------|
| Nombre | Obligatorio, no vacío |
| Email  | Obligatorio, formato válido |
| Fecha  | Obligatoria, no puede ser en el pasado |
| Hora   | Obligatoria, debe seleccionarse |
| Horario duplicado | Si fecha + hora ya existe → error |

### Casos probados
- [ ] Reserva exitosa con todos los campos correctos
- [ ] Error visible si se deja campo vacío
- [ ] Error si el email no tiene formato válido
- [ ] Error si la fecha es anterior a hoy
- [ ] Error si el horario ya está reservado
- [ ] Cancelación de turno con confirmación
- [ ] Mensaje de éxito desaparece a los 3 segundos
- [ ] Turnos ordenados por fecha y hora
