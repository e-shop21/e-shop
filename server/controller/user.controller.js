const db = require('../model/_index');
const User = db.User;

exports.create = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [
                {
                    model: db.Cart,
                    as: 'carts',
                    include: [{
                        model: db.Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price']
                    }]
                },
                {
                    model: db.Wishlist,
                    as: 'wishlists',
                    include: [{
                        model: db.Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price']
                    }]
                }
            ]
        });

        res.status(200).json({
            message: "Users retrieved successfully",
            users: users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [
                {
                    model: db.Cart,
                    as: 'carts',
                    include: [{
                        model: db.Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price']
                    }]
                },
                {
                    model: db.Wishlist,
                    as: 'wishlists',
                    include: [{
                        model: db.Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price']
                    }]
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user: user
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update({ firstName, lastName, email });

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};