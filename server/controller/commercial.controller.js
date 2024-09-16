const db = require('../model/_index');

exports.createCommercial = async (req, res) => {
    try {
        const { url, product_id, ref } = req.body;
        const newCommercial = await db.Commercial.create({ url, product_id, ref });
        res.status(201).json({
            message: "Commercial created successfully",
            commercial: newCommercial
        });
    } catch (error) {
        console.error('Error creating commercial:', error);
        res.status(500).json({ message: "Error creating commercial", error: error.message });
    }
};

exports.getNewArrivals = async (req, res) => {
    try {
        const newArrivals = await db.Commercial.findAll({
            where: {
                ref: ['NA:sectionA', 'NA:sectionB', 'NA:sectionC', 'NA:sectionD']
            },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });
        res.status(200).json(newArrivals);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({ message: "Error fetching new arrivals", error: error.message });
    }
};

exports.getExclusiveOffer = async (req, res) => {
    try {
        const exclusiveOffer = await db.Commercial.findOne({
            where: { ref: 'exclusiveOffer' },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });
        res.status(200).json(exclusiveOffer);
    } catch (error) {
        console.error('Error fetching exclusive offer:', error);
        res.status(500).json({ message: "Error fetching exclusive offer", error: error.message });
    }
};

exports.getPub = async (req, res) => {
    try {
        const pub = await db.Commercial.findOne({
            where: { ref: 'Pub' },
            include: [{
                model: db.Product,
                as: 'product',
                attributes: ['id', 'name', 'price']
            }]
        });
        res.status(200).json(pub);
    } catch (error) {
        console.error('Error fetching pub:', error);
        res.status(500).json({ message: "Error fetching pub", error: error.message });
    }
};