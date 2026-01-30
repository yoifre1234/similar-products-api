const productService = require('../services/productService');

class ProductController {

    async getSimilar(req, res, next) {
        const { productId } = req.params;
  
        return productService.getSimilarProducts(productId)
          .then((products) => {
            res.status(200).json(products);
          })
          .catch(next);
      }
}

module.exports = new ProductController();