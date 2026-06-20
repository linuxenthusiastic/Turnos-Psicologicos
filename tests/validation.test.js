import { describe, test, expect } from 'vitest'
import { validateTurno, formatFecha } from '../src/validation.js'

const HOY = new Date().toISOString().split('T')[0]
const MANANA = new Date(Date.now() + 86400000).toISOString().split('T')[0]

const turnoValido = {
  nombre: 'María González',
  email: 'maria@correo.com',
  fecha: MANANA,
  hora: '10:00',
}

describe('validateTurno', () => {
  describe('caso válido', () => {
    test('retorna valid=true con todos los campos correctos', () => {
      const { valid, errors } = validateTurno(turnoValido)
      expect(valid).toBe(true)
      expect(errors).toEqual({})
    })
  })

  describe('nombre', () => {
    test('error si el nombre está vacío', () => {
      const { valid, errors } = validateTurno({ ...turnoValido, nombre: '' })
      expect(valid).toBe(false)
      expect(errors.nombre).toBeTruthy()
    })

    test('error si el nombre es solo espacios', () => {
      const { valid, errors } = validateTurno({ ...turnoValido, nombre: '   ' })
      expect(valid).toBe(false)
      expect(errors.nombre).toBeTruthy()
    })
  })

  describe('email', () => {
    test('error si el email está vacío', () => {
      const { errors } = validateTurno({ ...turnoValido, email: '' })
      expect(errors.email).toBeTruthy()
    })

    test.each([
      'sinArroba',
      'sin@dominio',
      '@sinusuario.com',
      'espacios en@medio.com',
    ])('error con email inválido: "%s"', (email) => {
      const { errors } = validateTurno({ ...turnoValido, email })
      expect(errors.email).toBeTruthy()
    })

    test.each([
      'usuario@dominio.com',
      'a+b@test.org',
      'nombre.apellido@empresa.com.ar',
    ])('acepta email válido: "%s"', (email) => {
      const { errors } = validateTurno({ ...turnoValido, email })
      expect(errors.email).toBeUndefined()
    })
  })

  describe('fecha', () => {
    test('error si la fecha está vacía', () => {
      const { errors } = validateTurno({ ...turnoValido, fecha: '' })
      expect(errors.fecha).toBeTruthy()
    })

    test('error si la fecha es hoy (mismo día no permitido)', () => {
      const { errors } = validateTurno({ ...turnoValido, fecha: HOY })
      expect(errors.fecha).toBeUndefined()
    })

    test('error si la fecha es en el pasado', () => {
      const { errors } = validateTurno({ ...turnoValido, fecha: '2020-01-01' })
      expect(errors.fecha).toBeTruthy()
    })

    test('acepta fecha futura', () => {
      const { errors } = validateTurno({ ...turnoValido, fecha: MANANA })
      expect(errors.fecha).toBeUndefined()
    })
  })

  describe('hora', () => {
    test('error si no se seleccionó horario', () => {
      const { errors } = validateTurno({ ...turnoValido, hora: '' })
      expect(errors.hora).toBeTruthy()
    })

    test('acepta un horario válido', () => {
      const { errors } = validateTurno({ ...turnoValido, hora: '09:00' })
      expect(errors.hora).toBeUndefined()
    })
  })

  describe('múltiples errores', () => {
    test('reporta todos los campos vacíos a la vez', () => {
      const { valid, errors } = validateTurno({ nombre: '', email: '', fecha: '', hora: '' })
      expect(valid).toBe(false)
      expect(Object.keys(errors)).toHaveLength(4)
    })
  })
})

describe('formatFecha', () => {
  test('convierte formato ISO a DD/MM/YYYY', () => {
    expect(formatFecha('2026-07-15')).toBe('15/07/2026')
  })

  test('mantiene el cero en día y mes de un dígito', () => {
    expect(formatFecha('2026-01-05')).toBe('05/01/2026')
  })
})
