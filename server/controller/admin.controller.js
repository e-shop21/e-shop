const db = require('../model/_index');
const Admin = db.Admin;
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.createAdmin = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'admin'
        });
        res.status(201).json({ message: "Admin created successfully", adminId: admin.id });
    } catch (error) {
        console.error('Error creating admin:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error creating admin", error: error.message });
    }
}

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll();
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin", error: error.message });
    }
}

exports.getSellerStats = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
  
      const { sellerId } = req.params;
  
      const totalSold = await db.Sold.count();
      const sellerSold = await db.Sold.count({
        include: [{
          model: db.Product,
          as: 'product',  // Add this line to specify the alias
          where: { seller_id: sellerId }
        }]
      });
  
      const sellingRate = (sellerSold / totalSold) * 100;
  
      const totalQuantity = await db.Product.sum('quantity');
      const sellerQuantity = await db.Product.sum('quantity', {
        where: { seller_id: sellerId }
      });
  
      const productContributionRate = (sellerQuantity / totalQuantity) * 100;
  
      res.status(200).json({
        sellingRate,
        productContributionRate
      });
    } catch (error) {
      console.error('Error calculating seller stats:', error);
      res.status(500).json({ message: "Error calculating seller stats", error: error.message });
    }
  };




exports.getUserBuyingRate = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }

    const { userId } = req.params;

    const totalSold = await db.Sold.count();
    const userBought = await db.Sold.count({
      where: { user_id: userId }
    });

    const buyingRate = (userBought / totalSold) * 100;

    res.status(200).json({ buyingRate });
  } catch (error) {
    console.error('Error calculating user buying rate:', error);
    res.status(500).json({ message: "Error calculating user buying rate", error: error.message });
  }
};


exports.getUserPurchases = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
  
      const { userId } = req.params;
  
      const userPurchases = await db.Sold.findAll({
        where: { user_id: userId },
        include: [{
          model: db.Product,
          as: 'product',
          attributes: ['id', 'name', 'price']
        }]
      });
  
      res.status(200).json({ userPurchases });
    } catch (error) {
      console.error('Error fetching user purchases:', error);
      res.status(500).json({ message: "Error fetching user purchases", error: error.message });
    }
  };


