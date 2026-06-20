import { describe, test, expect } from 'vitest'
import { validateTurno, esHoraValida } from '../src/validation.js'

const MANANA = new Date(Date.now() + 86400000).toISOString().split('T')[0]

const turnoBase = {
  nombre: 'María González',
  email: 'maria@correo.com',
  fecha: MANANA,
  hora: '10:00',
}

describe('validateTurno - nombre mínimo', () => {
  test('error si el nombre tiene menos de 2 caracteres', () => {
    const { valid, errors } = validateTurno({ ...turnoBase, nombre: 'A' })
    expect(valid).toBe(false)
    expect(errors.nombre).toBeTruthy()
  })

  test('acepta nombre con exactamente 2 caracteres', () => {
    const { errors } = validateTurno({ ...turnoBase, nombre: 'Al' })
    expect(errors.nombre).toBeUndefined()
  })
})

describe('esHoraValida', () => {
  test('acepta formato HH:MM válido', () => {
    expect(esHoraValida('09:00')).toBe(true)
    expect(esHoraValida('23:59')).toBe(true)
  })

  test('rechaza hora fuera de rango', () => {
    expect(esHoraValida('25:00')).toBe(false)
    expect(esHoraValida('10:60')).toBe(false)
  })

  test('rechaza formato incorrecto', () => {
    expect(esHoraValida('9:00')).toBe(false)
    expect(esHoraValida('abc')).toBe(false)
  })
})
