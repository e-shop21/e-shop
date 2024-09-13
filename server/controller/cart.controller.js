const db = require('../model/_index');
const Cart = db.Cart;

exports.createCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ message: "User ID, Product ID, and Quantity are required" });
        }

        const newCart = await Cart.create({ user_id, product_id, quantity });

        res.status(201).json({
            message: "Cart item created successfully",
            cart: newCart
        });
    } catch (error) {
        console.error('Error creating cart item:', error);
        res.status(500).json({ message: "Error creating cart item", error: error.message });
    }
};

exports.findAllByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const carts = await Cart.findAll({
            where: { user_id },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });

        res.status(200).json({
            message: "Cart items retrieved successfully",
            carts: carts
        });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: "Error retrieving cart items", error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cart.update({ quantity });

        res.status(200).json({
            message: "Cart item updated successfully",
            cart: cart
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: "Error updating cart item", error: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cart.destroy();

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: "Error deleting cart item", error: error.message });
    }
};