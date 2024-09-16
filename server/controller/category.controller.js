const db = require('../model/_index');
const Category = db.Category;

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories: categories
        });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};