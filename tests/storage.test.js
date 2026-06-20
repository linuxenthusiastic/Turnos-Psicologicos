import { describe, test, expect, beforeEach, vi } from 'vitest'
import { getTurnos, saveTurno, deleteTurno, isTurnoOcupado, getTurnosByFecha } from '../src/storage.js'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem:    (key) => store[key] ?? null,
    setItem:    (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
    clear:      () => { store = {} },
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

beforeEach(() => {
  localStorageMock.clear()
})

describe('getTurnos', () => {
  test('retorna array vacío cuando no hay turnos', () => {
    expect(getTurnos()).toEqual([])
  })

  test('retorna los turnos guardados', () => {
    saveTurno({ nombre: 'Ana', email: 'ana@test.com', fecha: '2026-08-01', hora: '09:00' })
    expect(getTurnos()).toHaveLength(1)
    expect(getTurnos()[0].nombre).toBe('Ana')
  })
})

describe('deleteTurno', () => {
  test('elimina el turno con el id dado', () => {
    saveTurno({ nombre: 'Ana', email: 'ana@test.com', fecha: '2026-08-01', hora: '09:00' })
    const id = getTurnos()[0].id
    deleteTurno(id)
    expect(getTurnos()).toHaveLength(0)
  })
})

describe('isTurnoOcupado', () => {
  test('retorna true si ya existe un turno en esa fecha y hora', () => {
    saveTurno({ nombre: 'Ana', email: 'ana@test.com', fecha: '2026-08-01', hora: '09:00' })
    expect(isTurnoOcupado('2026-08-01', '09:00')).toBe(true)
  })

  test('retorna false si no hay turno en esa fecha y hora', () => {
    expect(isTurnoOcupado('2026-08-01', '10:00')).toBe(false)
  })
})

describe('getTurnosByFecha', () => {
  test('retorna solo los turnos de la fecha indicada', () => {
    saveTurno({ nombre: 'Ana',  email: 'a@test.com', fecha: '2026-08-01', hora: '09:00' })
    saveTurno({ nombre: 'Luis', email: 'l@test.com', fecha: '2026-08-02', hora: '10:00' })

    const resultado = getTurnosByFecha('2026-08-01')

    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Ana')
  })

  test('retorna array vacío si no hay turnos en esa fecha', () => {
    expect(getTurnosByFecha('2026-08-01')).toEqual([])
  })
})
