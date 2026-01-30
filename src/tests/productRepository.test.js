const productRepository = require('../repositories/productRepository');
const httpClient = require('../config/httpClient');

jest.mock('../config/httpClient');

describe('ProductRepository', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSimilarIds', () => {
    test('Debe retornar los datos cuando la llamada es exitosa', async () => {

      const mockIds = ['100', '200'];

      httpClient.get.mockResolvedValue({ data: mockIds });

      const result = await productRepository.getSimilarIds('1');

      expect(result).toEqual(mockIds);

      expect(httpClient.get).toHaveBeenCalledWith('/product/1/similarids');
    });

    test('Debe retornar null si la API responde con error 404', async () => {

      const error404 = {
        response: { status: 404 },
        message: 'Not Found'
      };
      httpClient.get.mockRejectedValue(error404);

 
      const result = await productRepository.getSimilarIds('999');


      expect(result).toBeNull();
    });

    test('Debe lanzar un error si falla por otra causa (ej. 500)', async () => {

      const error500 = {
        message: 'Internal Server Error'
      };
      httpClient.get.mockRejectedValue(error500);


      await expect(productRepository.getSimilarIds('1'))
        .rejects
        .toThrow('Error fetching similar IDs');
    });
  });

  describe('getProductDetail', () => {
    test('Debe retornar el detalle del producto si la llamada es exitosa', async () => {

      const mockDetail = { id: '100', name: 'Camisa' };
      httpClient.get.mockResolvedValue({ data: mockDetail });


      const result = await productRepository.getProductDetail('100');


      expect(result).toEqual(mockDetail);
      expect(httpClient.get).toHaveBeenCalledWith('/product/100');
    });

    test('Debe retornar null si ocurre cualquier error (para no romper el flujo)', async () => {

      httpClient.get.mockRejectedValue(new Error('Cualquier error'));

      const result = await productRepository.getProductDetail('100');


      expect(result).toBeNull();
    });
  });
});