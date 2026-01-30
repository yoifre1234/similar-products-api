const axios = require('axios');
const axiosRetry = require('axios-retry').default; 


const httpClient = axios.create({
  baseURL: 'http://localhost:3001', 
  timeout: 5000, 
});


axiosRetry(httpClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay, 
  retryCondition: (error) => {
    
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
  },
});

module.exports = httpClient;