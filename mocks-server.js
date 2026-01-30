const express = require('express');
const app = express();
const PORT = 3001;

// Datos simulados
const products = {
    '1': { id: '1', name: 'Product 1', price: 10.99, availability: true },
    '2': { id: '2', name: 'Product 2', price: 20.99, availability: false },
    '3': { id: '3', name: 'Product 3', price: 30.50, availability: true },
    '4': { id: '4', name: 'Product 4', price: 9.99, availability: true },
};

const similarIds = {
    '1': ['2', '3', '4'],
    '2': ['1', '3'],
    '3': ['4'],
};

// Endpoint 1: Obtener IDs similares
app.get('/product/:productId/similarids', (req, res) => {
    const { productId } = req.params;
    const similar = similarIds[productId];
    if (!similar) return res.status(404).json({ message: 'Not found' });
    res.json(similar);
});

// Endpoint 2: Obtener detalle de producto
app.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products[productId];
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`🎭 Mock Server (Existing APIs) running on http://localhost:${PORT}`);
});