const httpClient = require('../config/httpClient');

describe('Config: HTTP Client (Axios)', () => {
  
  test('Debe tener configurada la URL base correcta', () => {

    expect(httpClient.defaults.baseURL).toBe('http://localhost:3001');
  });

  test('Debe tener un Timeout configurado', () => {

    expect(httpClient.defaults.timeout).toBe(5000);
  });

  test('Debe tener interceptores configurados (axios-retry)', () => {

    const responseInterceptors = httpClient.interceptors.response.handlers;
    
    expect(responseInterceptors.length).toBeGreaterThan(0);
  });
});