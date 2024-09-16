const db = require('../model/_index');
const cloudinary = require('../config/cloudinary');

exports.createImage = async (req, res) => {
  try {
    const { url, product_id } = req.body;

    if (!url || !product_id) {
      return res.status(400).json({ message: "URL and product ID are required" });
    }

    const newImage = await db.Image.create({
      url,
      product_id
    });

    res.status(201).json({
      message: "Image created successfully",
      image: newImage
    });
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(500).json({ message: "Error creating image", error: error.message });
  }
};

exports.getImagesByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const images = await db.Image.findAll({
      where: { product_id },
      include: [{
        model: db.Product,
        as: 'product',
        attributes: ['id', 'name']
      }]
    });

    res.status(200).json({
      message: "Images retrieved successfully",
      images: images
    });
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: "Error retrieving images", error: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { base64Image, product_id } = req.body;

    if (!base64Image || !product_id) {
      return res.status(400).json({ message: "Base64 image and product ID are required" });
    }

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'products',
    });

    const newImage = await db.Image.create({
      url: result.secure_url,
      product_id,
    });

    res.status(201).json({
      message: "Image uploaded and created successfully",
      image: newImage,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};

// Add the updateImage function
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, product_id } = req.body;

    if (!url || !product_id) {
      return res.status(400).json({ message: "URL and product ID are required" });
    }

    const image = await db.Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.url = url;
    image.product_id = product_id;
    await image.save();

    res.status(200).json({
      message: "Image updated successfully",
      image: image
    });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: "Error updating image", error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await db.Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.destroy();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: "Error deleting image", error: error.message });
  }
};

exports.getAllImages = async (req, res) => {
    try {
      const images = await db.Image.findAll({
        include: [{
          model: db.Product,
          as: 'product',
          attributes: ['id', 'name']
        }]
      });
  
      res.status(200).json({
        message: "All images retrieved successfully",
        images: images
      });
    } catch (error) {
      console.error('Error retrieving all images:', error);
      res.status(500).json({ message: "Error retrieving all images", error: error.message });
    }
  };