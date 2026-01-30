const request = require('supertest');
const app = require('../app'); 
const productService = require('../services/productService');


jest.mock('../services/productService', () => ({
  getSimilarProducts: jest.fn(),
}));

describe('GET /product/:productId/similar', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  
  afterAll(() => {
    console.error.mockRestore();
  });


  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe responder 200 y la lista de productos (Happy Path)', async () => {

    const mockData = [{ id: '2', name: 'Similar Product', price: 10 }];
  
    productService.getSimilarProducts.mockResolvedValue(mockData);


    const response = await request(app).get('/product/1/similar');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(productService.getSimilarProducts).toHaveBeenCalledWith('1');
  });

  test('Debe responder 404 si el servicio lanza un error "Not Found"', async () => {

    const error = new Error('Product Not Found');
    error.status = 404;
    
    productService.getSimilarProducts.mockRejectedValue(error);


    const response = await request(app).get('/product/999/similar');

    expect(response.status).toBe(404);
    
    expect(response.body).toEqual({
      error: true,
      message: 'Product Not Found'
    });
  });

  test('Debe responder 500 si hay un error inesperado', async () => {

    productService.getSimilarProducts.mockRejectedValue(new Error('Database crash'));


    const response = await request(app).get('/product/1/similar');

    expect(response.status).toBe(500);
    

    expect(response.body).toEqual({
      error: true,
      message: 'Database crash'
    });
  });
});