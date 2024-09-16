const db = require('../model/_index');
const User = db.User;
const Seller = db.Seller;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = db.Admin;


dotenv.config();

exports.signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required" });
        }

        // Check if the email is already used in either User or Seller model
        const existingUser = await User.findOne({ where: { email } });
        const existingSeller = await Seller.findOne({ where: { email } });

        if (existingUser || existingSeller) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser;
        if (role === 'user') {
            newUser = await User.create({ email, password: hashedPassword, role });
        } else if (role === 'seller') {
            newUser = await Seller.create({ email, password: hashedPassword, role });
        } else {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(201).json({
            message: "Account created successfully",
            token,
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: "Error creating account", error: error.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        const seller = await Seller.findOne({ where: { email } });
        const admin = await Admin.findOne({ where: { email } });

        const account = user || seller || admin;
        if (!account) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: account.id, role: account.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({
            message: "User signed in successfully",
            token,
            user: { id: account.id, email: account.email, role: account.role }
        });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: "Error signing in user", error: error.message });
    }
};


exports.verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            user: { id: decoded.id, role: decoded.role }
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};