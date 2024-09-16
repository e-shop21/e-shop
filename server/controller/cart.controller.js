const db = require('../model/_index');
const Cart = db.Cart;

exports.createCart = async (req, res) => {
    console.log('Creating cart item:', req.body);
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user.id;

        if (!product_id || !quantity) {
            console.log('Missing product_id or quantity');
            return res.status(400).json({ message: "Product ID and Quantity are required" });
        }

        const newCart = await Cart.create({ user_id, product_id, quantity });
        console.log('Cart item created:', newCart);

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
    console.log('Fetching cart items for user:', req.user.id);
    try {
        const user_id = req.user.id;
        const carts = await Cart.findAll({
            where: { user_id },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });
        console.log('Cart items retrieved:', carts);

        res.status(200).json({
            message: "Cart items retrieved successfully",
            carts: carts
        });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: "Error retrieving cart items", error: error.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    console.log('Deleting cart item:', req.params.id);
    try {
        const { id } = req.params;
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            console.log('Cart item not found');
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cartItem.destroy();
        console.log('Cart item deleted successfully');

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: "Error deleting cart item", error: error.message });
    }
};

exports.deleteAllByProductAndUser = async (req, res) => {
    console.log('Deleting all instances of product from cart:', req.params.product_id, 'for user:', req.user.id);
    try {
        const user_id = req.user.id;
        const { product_id } = req.params;

        const result = await Cart.destroy({
            where: { user_id, product_id }
        });
        console.log('Deleted instances:', result);

        res.status(200).json({ message: "All instances of product deleted from cart successfully" });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: "Error deleting product from cart", error: error.message });
    }
};


exports.checkout = async (req, res) => {
    console.log('Processing checkout for user:', req.user.id);
    try {
        const user_id = req.user.id;
        const { cartItems } = req.body;

        for (const item of cartItems) {
            const product = await db.Product.findByPk(item.product.id);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.product.id} not found` });
            }

            const newQuantity = product.quantity - item.quantity;
            if (newQuantity < 0) {
                return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
            }

            await product.update({ quantity: newQuantity });
            console.log(`Updated product ${product.id} quantity to ${newQuantity}`);
        }

        await Cart.destroy({ where: { user_id } });
        console.log(`Cart items deleted for user ${user_id}`);

        res.status(200).json({ message: "Checkout successful" });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: "Error during checkout", error: error.message });
    }
};