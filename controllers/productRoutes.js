const { where } = require('sequelize');
const { products, categories } = require('../models'); // Import models

// Get products with pagination
exports.getAllProducts = async (req, res) => {
    try {
        let categoryId = req.query ? req.query.CategoryId : undefined;
        const condition = { isDeleted: false };
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (categoryId) {
            condition.CategoryId = categoryId;
        }
        console.log(condition);
        const offset = (page - 1) * pageSize;
        const { count, rows } = await categories.findAndCountAll({
            where: condition,
            include: [
                {  
                    model: products,
                    as: 'products_category',
 
                    where: { isDeleted: false },
                    required: false 
                }
            ],
            limit: pageSize,
            offset: offset
        });

        res.json({message: 'All Products successfully', totalRecords: count,currentPage: page,pageSize: pageSize,products: rows}); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId } = req.body;

        let categoriesExist = await categories.findOne({ where: { CategoryId: CategoryId, isDeleted: false } });
        if (!categoriesExist) {
            return res.status(400).json({ message: 'Category does not exist' });
        }
        let productExists = await products.findOne({ where: { ProductName, CategoryId, isDeleted: false } });
        if (productExists) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        const product = await products.create({ ProductName, CategoryId });
     
        const result = await categories.findOne({
            where: { CategoryId: CategoryId, isDeleted: false },
            attributes: ['CategoryId', 'CategoryName'],
            include: [{
                model: products,
                as: 'products_category',
                where: { ProductId: product.ProductId },
                attributes: ['ProductId', 'ProductName']
            }]
        });

        res.json({ message: 'Product created successfully', product: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId, ProductId } = req.body;
        let categoriesExist = await categories.findOne({ where: { CategoryId: CategoryId, isDeleted: false } });
        if (!categoriesExist) {
            return res.status(400).json({ message: 'Category does not exist' });
        }
        let productExists = await products.findOne({ where: { ProductId, isDeleted: false } });
        if (!productExists) {
            return res.status(400).json({ message: 'Product does not exist' });
        }
        const product = await products.update({ ProductName }, { where: { ProductId: productExists.ProductId } });
        const result = await categories.findOne({
            where: { CategoryId: CategoryId, isDeleted: false },
            attributes: ['CategoryId', 'CategoryName'],
            include: [{
                model: products,
                as: 'products_category',
                where: { ProductId: productExists.ProductId },
                attributes: ['ProductId', 'ProductName']
            }]
        });

        res.json({ message: 'Product Updated successfully', product: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const productId  =  req.params.id;

        if(!productId){ 
            return res.status(400).json({ message: 'ProductId is required' });
        }
        let productExists = await products.findOne({ where: { ProductId: productId, isDeleted: false } });
        if (!productExists) {
            return res.status(400).json({ message: 'Product does not exist' });
        }
        await products.update({isDeleted:true},{where:{ProductId:productId}})
        res.status(200).send("Product Deleted successfully");

    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};