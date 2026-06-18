const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Local developer database connection fallback
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marketplace')
    .then(() => console.log('Database Connected Successfully'))
    .catch(err => console.error('Database connection error:', err));

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Product', ProductSchema);

// API endpoint to retrieve system catalog listings
app.get('/api/products', async (req, res) => {
    try {
        const storeCatalog = await Product.find({});
        res.json(storeCatalog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch catalog items' });
    }
});

const APP_PORT = 5000;
app.listen(APP_PORT, () => console.log(`Marketplace backend online on port ${APP_PORT}`));
