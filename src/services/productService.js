const productRepository = require('../repositories/productRepository');
const cache = require('../utils/cache');

class ProductService {
    async getSimilarProducts(productId) {
       
        const cacheKey = `similar_products_${productId}`;
        const cachedData = cache.get(cacheKey);
      
        if (cachedData) {
          console.log(`Cache Hit for product ${productId}`); 
          return cachedData;
        }
      
        
        const similarIds = await productRepository.getSimilarIds(productId);
      
        if (!similarIds) {
          const error = new Error('Product Not Found');
          error.status = 404;
          throw error;
        }
      
        const productPromises = similarIds.map(id => productRepository.getProductDetail(id));
        const products = await Promise.all(productPromises);
        
        const validProducts = products.filter(p => p !== null);
      
      
        cache.set(cacheKey, validProducts);
      
        return validProducts;
      }
}

module.exports = new ProductService();