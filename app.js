const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('NodeJS MVC App Running');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});