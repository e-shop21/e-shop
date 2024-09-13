const db = require('../model/_index');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, Seller_id, SubCategory_id } = req.body;

        if (!name || !price || !Seller_id || !SubCategory_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = await db.Product.create({
            name,
            price,
            Seller_id,
            review: 0,
            reviewCounter: 0,
            SubCategory_id
        });

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Seller,
                    as: 'seller',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: db.Subcategory,
                    as: 'subcategory',
                    attributes: ['id', 'name'],
                    include: {
                        model: db.Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'url']
                }
            ]
        });

        res.status(200).json({
            message: "Products retrieved successfully",
            products: products
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id, {
            include: [
                {
                    model: db.Seller,
                    as: 'seller',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: db.Subcategory,
                    as: 'subcategory',
                    attributes: ['id', 'name'],
                    include: {
                        model: db.Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'url']
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            product: product
        });
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id, {
            include: [
                {
                    model: db.Seller,
                    as: 'seller',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: db.Subcategory,
                    as: 'subcategory',
                    attributes: ['id', 'name'],
                    include: {
                        model: db.Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                },
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'url']
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            product: product
        });
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const product = await db.Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.update(updateData);

        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};