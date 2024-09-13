const db = require('../model/_index');
const Seller = db.Seller;

exports.create = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingSeller = await Seller.findOne({ where: { email } });
        if (existingSeller) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newSeller = await Seller.create({
            firstName: firstName || null,
            lastName: lastName || null,
            email,
            password,
        });

        res.status(201).json({
            message: "Seller created successfully",
            seller: {
                id: newSeller.id,
                firstName: newSeller.firstName,
                lastName: newSeller.lastName,
                email: newSeller.email
            }
        });
    } catch (error) {
        console.error('Error creating seller:', error);
        res.status(500).json({ message: "Error creating seller", error: error.message });
    }
};

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