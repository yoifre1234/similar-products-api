const cache = require('../utils/cache');

describe('Utils: Cache Service', () => {
  
  beforeEach(() => {
    cache.flushAll();
  });

  test('Debe guardar y recuperar un valor correctamente', () => {
    const key = 'test_key';
    const value = { id: 1, name: 'Test' };

    cache.set(key, value);

    const result = cache.get(key);

    expect(result).toEqual(value);
  });

  test('Debe devolver undefined si la clave no existe', () => {
    const result = cache.get('clave_inexistente');
    expect(result).toBeUndefined();
  });

  test('Debe tener un TTL configurado (verificación de configuración)', () => {

    expect(cache.options.stdTTL).toBe(600);
  });
});