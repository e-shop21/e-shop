const db = require('../model/_index');
const Sold = db.Sold;

exports.createSold = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user.id;
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "Product ID and Quantity are required" });
        }

        const newSold = await Sold.create({ user_id, product_id, quantity });

        res.status(201).json({
            message: "Sold item created successfully",
            sold: newSold
        });
    } catch (error) {
        console.error('Error creating sold item:', error);
        res.status(500).json({ message: "Error creating sold item", error: error.message });
    }
};

exports.findAllSold = async (req, res) => {
    try {
        const soldItems = await Sold.findAll({
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });

        res.status(200).json({
            message: "Sold items retrieved successfully",
            soldItems: soldItems
        });
    } catch (error) {
        console.error('Error retrieving sold items:', error);
        res.status(500).json({ message: "Error retrieving sold items", error: error.message });
    }
};

exports.findSoldById = async (req, res) => {
    try {
        const { id } = req.params;
        const soldItem = await Sold.findByPk(id, {
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });

        if (!soldItem) {
            return res.status(404).json({ message: "Sold item not found" });
        }

        res.status(200).json({
            message: "Sold item retrieved successfully",
            soldItem: soldItem
        });
    } catch (error) {
        console.error('Error retrieving sold item:', error);
        res.status(500).json({ message: "Error retrieving sold item", error: error.message });
    }
};

exports.updateSold = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, sold_at } = req.body;

        const soldItem = await Sold.findByPk(id);

        if (!soldItem) {
            return res.status(404).json({ message: "Sold item not found" });
        }

        await soldItem.update({ quantity, sold_at });

        res.status(200).json({
            message: "Sold item updated successfully",
            soldItem: soldItem
        });
    } catch (error) {
        console.error('Error updating sold item:', error);
        res.status(500).json({ message: "Error updating sold item", error: error.message });
    }
};

exports.deleteSold = async (req, res) => {
    try {
        const { id } = req.params;
        const soldItem = await Sold.findByPk(id);

        if (!soldItem) {
            return res.status(404).json({ message: "Sold item not found" });
        }

        await soldItem.destroy();

        res.status(200).json({ message: "Sold item deleted successfully" });
    } catch (error) {
        console.error('Error deleting sold item:', error);
        res.status(500).json({ message: "Error deleting sold item", error: error.message });
    }
};

exports.createSoldItem = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user.id;
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "Product ID and Quantity are required" });
        }

        const newSold = await Sold.create({ user_id, product_id, quantity });

        res.status(201).json({
            message: "Sold item created successfully",
            sold: newSold
        });
    } catch (error) {
        console.error('Error creating sold item:', error);
        res.status(500).json({ message: "Error creating sold item", error: error.message });
    }
};

exports.getSoldItemsBySeller = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const soldItems = await Sold.findAll({
            attributes: ['id', 'user_id', 'quantity'],
            include: [{
                model: db.Product,
                as: 'product',
                where: { seller_id: sellerId },
                attributes: ['id', 'name', 'price']
            }]
        });

        res.status(200).json({
            message: "Seller's sold items retrieved successfully",
            soldItems: soldItems
        });
    } catch (error) {
        console.error('Error retrieving seller\'s sold items:', error);
        res.status(500).json({ message: "Error retrieving seller's sold items", error: error.message });
    }
};

exports.getSoldItemsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Fetching sold items for user:', userId);
        const soldItems = await Sold.findAll({
            attributes: ['id', 'user_id', 'quantity'],
            where: { user_id: userId },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price'],
                include: [{
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'url'],
                    required: false
                }]
            }]
        });

        console.log('Sold items fetched:', soldItems.length);
        res.status(200).json({
            message: "User's sold items retrieved successfully",
            soldItems: soldItems
        });
    } catch (error) {
        console.error('Error retrieving user\'s sold items:', error);
        res.status(500).json({ message: "Error retrieving user's sold items", error: error.message });
    }
};