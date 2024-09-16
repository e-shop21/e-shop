const db = require('../model/_index');
const Seller = db.Seller;
const bcrypt = require('bcrypt');


exports.findAll = async (req, res) => {
    try {
        const sellers = await Seller.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [{
                model: db.Product,
                as: 'products',
                include: [{
                    model: db.Subcategory,
                    as: 'subcategory',
                    include: [{
                        model: db.Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }]
                }]
            }]
        });

        res.status(200).json({
            message: "Sellers retrieved successfully",
            sellers: sellers
        });
    } catch (error) {
        console.error('Error retrieving sellers:', error);
        res.status(500).json({ message: "Error retrieving sellers", error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await Seller.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [{
                model: db.Product,
                as: 'products',
                include: [{
                    model: db.Subcategory,
                    as: 'subcategory',
                    include: [{
                        model: db.Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }]
                }]
            }]
        });

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json({
            message: "Seller retrieved successfully",
            seller: seller
        });
    } catch (error) {
        console.error('Error retrieving seller:', error);
        res.status(500).json({ message: "Error retrieving seller", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;

        const seller = await Seller.findByPk(id);

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        await seller.update({ firstName, lastName, email });

        res.status(200).json({
            message: "Seller updated successfully",
            seller: {
                id: seller.id,
                firstName: seller.firstName,
                lastName: seller.lastName,
                email: seller.email
            }
        });
    } catch (error) {
        console.error('Error updating seller:', error);
        res.status(500).json({ message: "Error updating seller", error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await Seller.findByPk(id);

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        await seller.destroy();

        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        console.error('Error deleting seller:', error);
        res.status(500).json({ message: "Error deleting seller", error: error.message });
    }
};


exports.getProfile = async (req, res) => {
    try {
      const sellerId = req.user.id; 
      console.log(sellerId , 'sellerId')
      const seller = await Seller.findByPk(sellerId);
  
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }
  
      res.status(200).json({
        success: true,
        seller: {
          firstName: seller.firstName,
          lastName: seller.lastName,
          email: seller.email
        }
      });
    } catch (error) {
      console.error('Error fetching sell...er profile:', error);
      res.status(500).json({ message: "Error fetching seller profile", error: error.message });
    }
  };



  exports.updateProfile = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { firstName, lastName, email, currentPassword, newPassword } = req.body;
        console.log('Updating profile for seller:', sellerId);
        console.log('Received data:', { firstName, lastName, email, currentPassword: !!currentPassword, newPassword: !!newPassword });

        const seller = await Seller.findByPk(sellerId);
        if (!seller) {
            console.log('Seller not found:', sellerId);
            return res.status(404).json({ message: "Seller not found" });
        }

        if (currentPassword && newPassword) {
            console.log('Attempting to update password');
            try {
                const isMatch = await bcrypt.compare(currentPassword, seller.password);
                if (!isMatch) {
                    console.log('Current password is incorrect');
                    return res.status(403).json({ message: "Current password is incorrect" });
                }
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await seller.update({ firstName, lastName, email, password: hashedPassword });
                console.log('Password updated successfully');
            } catch (bcryptError) {
                console.error('Error in password update:', bcryptError);
                return res.status(500).json({ message: "Error updating password", error: bcryptError.message });
            }
        } else {
            console.log('Updating profile without password change');
            await seller.update({ firstName, lastName, email });
        }

        console.log('Profile updated successfully');
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            seller: { id: seller.id, firstName, lastName, email }
        });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ message: "Error updating seller profile", error: error.message });
    }
};