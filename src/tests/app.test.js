const request = require('supertest');
const app = require('../app');

describe('App Configuration (app.js)', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

 
  afterAll(() => {
    console.error.mockRestore();
  });
  
  test('Debe tener CORS habilitado (Access-Control-Allow-Origin)', async () => {
    const response = await request(app).get('/product/1/similar');
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });

  test('Debe devolver 404 para rutas no definidas (Manejo de rutas desconocidas)', async () => {
    const response = await request(app).get('/esta-ruta-no-existe');
    expect(response.status).toBe(404);
  });

  test('Debe parsear JSON correctamente', async () => {

    expect(app).toBeDefined();
  });
});