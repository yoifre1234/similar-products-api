const productController = require('../controllers/productController');
const productService = require('../services/productService');

jest.mock('../services/productService', () => ({
  getSimilarProducts: jest.fn(),
}));

describe('ProductController', () => {
  let req, res, next;

  
  beforeEach(() => {
  
    req = { params: { productId: '1' } };

 
    res = {

      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
    };


    next = jest.fn();


    jest.clearAllMocks();
  });

  test('Debe responder con status 200 y devolver los productos (Happy Path)', async () => {

    const mockData = [{ id: '100', name: 'Zapatos' }];
    productService.getSimilarProducts.mockResolvedValue(mockData);


    await productController.getSimilar(req, res, next);

  
    expect(productService.getSimilarProducts).toHaveBeenCalledWith('1');
    
 
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockData);
    

    expect(next).not.toHaveBeenCalled();
  });

  test('Debe pasar el error a "next" si el servicio falla', async () => {
 
    const error = new Error('Database Error');
    error.status = 500;
    

    productService.getSimilarProducts.mockRejectedValue(error);

    await productController.getSimilar(req, res, next);


    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledWith(error);
  });
});