const db = require('../model/_index');
const Subcategory = db.Subcategory;

exports.getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await Subcategory.findAll({
            where: { category_id: categoryId }
        });
        res.status(200).json({
            message: "Subcategories retrieved successfully",
            subcategories: subcategories
        });
    } catch (error) {
        console.error('Error retrieving subcategories:', error);
        res.status(500).json({ message: "Error retrieving subcategories", error: error.message });
    }
};