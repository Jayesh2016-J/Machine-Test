const { categories } = require('../models'); // Import Category model

// Get all category
exports.getAllCategory = async (req, res) => {
    try {
        const category = await categories.findAll({ where: { isDeleted: false } });
        res.json({ message: 'All Categories Data', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const { CategoryName } = req.body;
        const categoryExit=await categories.findOne({where:{CategoryName:CategoryName,isDeleted:false},attributes:['CategoryId']});
        if (categoryExit) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        const category = await categories.create({ CategoryName });
       const result= await categories.findOne({where:{CategoryId:category.CategoryId},attributes:['CategoryId','CategoryName']});
       res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};


// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { id, CategoryName } = req.body;
        const category = await categories.findOne({ where: { CategoryId: id, isDeleted: false } });
        if (!category) {
            return res.status(404).json({ message: 'Category not exists' });
        }
        await categories.update({ CategoryName },{ where: { CategoryId: id } });
        const result = await categories.findOne({where: { CategoryId: id },attributes: ['CategoryId', 'CategoryName']});
        return res.status(200).json({message:'Category updated successfully', result});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || 'Server error' });
    }
};


// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categories.findOne({ where: { CategoryId: id, isDeleted: false } });
        if (!category) {
            return res.status(404).json({ message: 'Category not exists' });
        }
        await categories.update({ isDeleted: true }, { where: { CategoryId: id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};