const httpClient = require('../config/httpClient');

class ProductRepository {
    
    async getSimilarIds(productId) {
        try {
          
            const response = await httpClient.get(`/product/${productId}/similarids`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) return null;
          
            throw new Error(`Error fetching similar IDs: ${error.message}`);
        }
    }

    async getProductDetail(productId) {
        try {
            const response = await httpClient.get(`/product/${productId}`);
            return response.data;
        } catch (error) {   
           
            return null;
        }
    }
}

module.exports = new ProductRepository();