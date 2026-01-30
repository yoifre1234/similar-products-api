const productService = require('../services/productService');
const productRepository = require('../repositories/productRepository');
const cache = require('../utils/cache');

jest.mock('../repositories/productRepository', () => ({
  getSimilarIds: jest.fn(),
  getProductDetail: jest.fn(),
}));


jest.mock('../utils/cache', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('ProductService', () => {


  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('Si los datos están en caché, los devuelve sin llamar al repositorio', async () => {
    const cachedProducts = [{ id: '100', name: 'Cached Product' }];
    cache.get.mockReturnValue(cachedProducts);

    const result = await productService.getSimilarProducts('1');

    expect(result).toEqual(cachedProducts);
    
    expect(cache.get).toHaveBeenCalledWith('similar_products_1');
    
    expect(productRepository.getSimilarIds).not.toHaveBeenCalled();
  });


  test('Si NO hay caché, llama al repositorio y guarda el resultado en caché', async () => {

    cache.get.mockReturnValue(undefined);


    productRepository.getSimilarIds.mockResolvedValue(['100', '200']);
    
    productRepository.getProductDetail
      .mockResolvedValueOnce({ id: '100', name: 'Product A' })
      .mockResolvedValueOnce({ id: '200', name: 'Product B' });

    const result = await productService.getSimilarProducts('1');


    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Product A');

 
    expect(productRepository.getSimilarIds).toHaveBeenCalledWith('1');
    

    expect(cache.set).toHaveBeenCalledWith(
      'similar_products_1', 
      expect.arrayContaining([expect.objectContaining({ id: '100' })]) 
    );
  });

  test('Debe lanzar error 404 si no se encuentran IDs similares', async () => {
    cache.get.mockReturnValue(undefined);
    productRepository.getSimilarIds.mockResolvedValue(null); 

    await expect(productService.getSimilarProducts('999'))
      .rejects
      .toMatchObject({ message: 'Product Not Found', status: 404 });
  });

  test('Debe filtrar los productos que fallen individualmente', async () => {
    cache.get.mockReturnValue(undefined);
    productRepository.getSimilarIds.mockResolvedValue(['100', '200']);

    productRepository.getProductDetail
      .mockResolvedValueOnce({ id: '100', name: 'Ok' })
      .mockResolvedValueOnce(null);

    const result = await productService.getSimilarProducts('1');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('100');
    

    expect(cache.set).toHaveBeenCalledWith(
        'similar_products_1', 
        [{ id: '100', name: 'Ok' }]
    );
  });
});