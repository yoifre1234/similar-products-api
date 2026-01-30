const errorHandler = require('../middleware/errorHandler');

describe('Middleware: ErrorHandler', () => {
  let req, res, next;

  beforeEach(() => {
  
    jest.spyOn(console, 'error').mockImplementation(() => {});


    req = {};

   
    res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
    };

  
    next = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  test('Debe responder con el status y mensaje del error si existen', () => {

    const error = new Error('Producto no encontrado');
    error.status = 404;

    errorHandler(error, req, res, next);
    expect(console.error).toHaveBeenCalled();
    
    expect(res.status).toHaveBeenCalledWith(404);
    

    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Producto no encontrado',
    });
  });

  test('Debe responder con 500 y mensaje genérico si el error no tiene status', () => {

    const error = new Error('Fallo de base de datos');

    errorHandler(error, req, res, next);


    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Fallo de base de datos', 
    });
  });
});