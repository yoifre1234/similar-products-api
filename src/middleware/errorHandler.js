const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logueamos el error en el servidor para nosotros
  
    // Si el error tiene un status personalizado (ej. 404 del servicio), lo usamos
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(status).json({
      error: true,
      message: message,
    });
  };
  
  module.exports = errorHandler;