const db = require('../model/_index');
const { Op } = require('sequelize');


exports.createProduct = async (req, res) => {
    try {
        const { name, price, quantity, seller_id, subcategory_id } = req.body;

        if (!name || !price || !seller_id || !subcategory_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = await db.Product.create({
            name,
            price,
            quantity,
            seller_id,
            subcategory_id
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

// exports.getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await db.Product.findByPk(id, {
//             include: [
//                 {
//                     model: db.Seller,
//                     as: 'seller',
//                     attributes: ['id', 'firstName', 'lastName', 'email']
//                 },
//                 {
//                     model: db.Subcategory,
//                     as: 'subcategory',
//                     attributes: ['id', 'name'],
//                     include: {
//                         model: db.Category,
//                         as: 'category',
//                         attributes: ['id', 'name']
//                     }
//                 },
//                 {
//                     model: db.Image,
//                     as: 'images',
//                     attributes: ['id', 'url']
//                 }
//             ]
//         });

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({
//             message: "Product retrieved successfully",
//             product: product
//         });
//     } catch (error) {
//         console.error('Error retrieving product:', error);
//         res.status(500).json({ message: "Error retrieving product", error: error.message });
//     }
// };

exports.updateProduct = async (req, res) => {
    try {
        console.log('Updating product...');
        console.log('Request body:', req.body);

        const { id } = req.params;
        const { name, price, quantity, subcategory_id } = req.body;

        console.log('Product ID:', id);
        console.log('Updated fields:', { name, price, quantity, subcategory_id });

        const product = await db.Product.findByPk(id);

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: "Product not found" });
        }

        console.log('Existing product:', product);

        // Update only the fields that are provided
        const updatedFields = {};
        if (name !== undefined) updatedFields.name = name;
        if (price !== undefined) updatedFields.price = parseFloat(price);
        if (quantity !== undefined) updatedFields.quantity = parseInt(quantity);
        if (subcategory_id !== undefined) updatedFields.subcategory_id = parseInt(subcategory_id);

        console.log('Updated fields to be saved:', updatedFields);

        await product.update(updatedFields);
        console.log('Product updated');

        const updatedProduct = await db.Product.findByPk(id, {
            include: [
                {
                    model: db.Subcategory,
                    as: 'subcategory',
                    include: {
                        model: db.Category,
                        as: 'category'
                    }
                },
                {
                    model: db.Image,
                    as: 'images'
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: "Error updating product", error: error.message });
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

exports.getProductsBySubcategoryId = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const products = await db.Product.findAll({
            where: { SubCategory_id: subcategoryId },
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


exports.getProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
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
                    where: { category_id: categoryId },
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


exports.getProductsBySellerId = async (req, res) => {
    try {
        const sellerId = req.user.id; // Assuming the user ID is attached to the request by middleware
        const products = await db.Product.findAll({
            where: { seller_id: sellerId },
            include: [
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
            message: "Seller's products retrieved successfully",
            products: products
        });
    } catch (error) {
        console.error('Error retrieving seller\'s products:', error);
        res.status(500).json({ message: "Error retrieving seller's products", error: error.message });
    }
};


exports.getPendingProductsBySellerId = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const pendingProducts = await db.Product.findAll({
            where: { 
                seller_id: sellerId,
                quantity: { [Op.gt]: 0 }
            },
            include: [
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
            message: "Seller's pending products retrieved successfully",
            products: pendingProducts
        });
    } catch (error) {
        console.error('Error retrieving seller\'s pending products:', error);
        res.status(500).json({ message: "Error retrieving seller's pending products", error: error.message });
    }
};

  
exports.getSellerPendingProductsForAdmin = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
  
      const { sellerId } = req.params;
      const pendingProducts = await db.Product.findAll({
        where: { 
          seller_id: sellerId,
          quantity: { [Op.gt]: 0 }
        },
        include: [
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
        message: "Seller's pending products retrieved successfully",
        products: pendingProducts
      });
    } catch (error) {
      console.error('Error retrieving seller\'s pending products:', error);
      res.status(500).json({ message: "Error retrieving seller's pending products", error: error.message });
    }
  };
  
  exports.getSellerSoldProductsForAdmin = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
  
      const { sellerId } = req.params;
      const soldItems = await db.Sold.findAll({
        attributes: ['id', 'user_id', 'quantity'],
        include: [
          {
            model: db.Product,
            as: 'product',
            where: { seller_id: sellerId },
            attributes: ['id', 'name', 'price']
          },
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
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


  exports.searchProducts = async (req, res) => {
    try {
      const { searchTerm, category, subcategory } = req.query;
      let whereClause = {};
      
      if (searchTerm) {
        whereClause.name = { [Op.like]: `%${searchTerm}%` };
      }
      
      if (category && category !== 'all') {
        whereClause['$subcategory.category.id$'] = category;
      }
      
      if (subcategory && subcategory !== 'all') {
        whereClause.SubCategory_id = subcategory;
      }
  
      const products = await db.Product.findAll({
        where: whereClause,
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
      console.error('Error searching products:', error);
      res.status(500).json({ message: "Error searching products", error: error.message, stack: error.stack });
    }
  };