const NodeCache = require('node-cache');

// TTL (Time to Live): 600 segundos = 10 minutos
const cache = new NodeCache({ stdTTL: 600 });

module.exports = cache;