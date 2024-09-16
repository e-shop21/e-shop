const db = require('../model/_index');
const Wishlist = db.Wishlist;

exports.createWishlist = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.user.id; // Get user ID from the authenticated request

        if (!product_id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const newWishlist = await Wishlist.create({ user_id, product_id });

        res.status(201).json({
            message: "Wishlist item created successfully",
            wishlist: newWishlist
        });
    } catch (error) {
        console.error('Error creating wishlist item:', error);
        res.status(500).json({ message: "Error creating wishlist item", error: error.message });
    }
};

exports.findAllByUser = async (req, res) => {
    try {
        const user_id = req.user.id; 
        const wishlists = await Wishlist.findAll({
            where: { user_id },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });

        res.status(200).json({
            message: "Wishlists retrieved successfully",
            wishlists: wishlists
        });
    } catch (error) {
        console.error('Error retrieving wishlists:', error);
        res.status(500).json({ message: "Error retrieving wishlists", error: error.message });
    }
};

exports.findAllByProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const wishlists = await Wishlist.findAll({
            where: { product_id },
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });

        res.status(200).json({
            message: "Wishlists retrieved successfully",
            wishlists: wishlists
        });
    } catch (error) {
        console.error('Error retrieving wishlists:', error);
        res.status(500).json({ message: "Error retrieving wishlists", error: error.message });
    }
};

exports.deleteWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const result = await Wishlist.destroy({
            where: { user_id: userId, product_id: productId }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        res.status(200).json({ message: "Wishlist item deleted successfully" });
    } catch (error) {
        console.error('Error deleting wishlist item:', error);
        res.status(500).json({ message: "Error deleting wishlist item", error: error.message });
    }
};







  exports.getAllWishlist = async (req, res) => {
    try {
      const wishlists = await Wishlist.findAll();
      res.status(200).json({
        message: "Wishlists retrieved successfully",
        wishlists: wishlists
      });
    } catch (error) {
      console.error('Error retrieving wishlists:', error);
      res.status(500).json({ message: "Error retrieving wishlists", error: error.message });
    }
  };    




      