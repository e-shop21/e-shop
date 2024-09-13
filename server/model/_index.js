const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('e_c', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
   
});

const db = {};

 db.Admin = require('./admin.model')(sequelize, DataTypes);
db.Category = require('./category.model')(sequelize, DataTypes);
db.Subcategory = require('./subCategory.model')(sequelize, DataTypes);
db.Seller = require('./seller.model')(sequelize, DataTypes);
db.Product = require('./product.model')(sequelize, DataTypes);
db.User = require('./user.model')(sequelize, DataTypes);
db.Cart = require('./cart.model')(sequelize, DataTypes);
db.Image = require('./image.model')(sequelize, DataTypes);
db.Wishlist = require('./wishlist.model')(sequelize, DataTypes);
db.Sold = require('./soldmodel')(sequelize, DataTypes);

// Define relationships
db.Category.hasMany(db.Subcategory, {
    foreignKey: 'category_id',
    as: 'subcategories',
  });
  db.Subcategory.belongsTo(db.Category, {
    foreignKey: 'category_id',
    as: 'category',
  });
  
  db.Subcategory.hasMany(db.Product, {
    foreignKey: 'subcategory_id',
    as: 'products',
  });
  db.Product.belongsTo(db.Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory',
  });
  
  db.Seller.hasMany(db.Product, {
    foreignKey: 'seller_id',
    as: 'products',
  });
  db.Product.belongsTo(db.Seller, {
    foreignKey: 'seller_id',
    as: 'seller',
  });
  
  db.User.hasMany(db.Cart, {
    foreignKey: 'user_id',
    as: 'carts',
  });
  db.Cart.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
  
  db.Product.hasMany(db.Cart, {
    foreignKey: 'product_id',
    as: 'carts',
  });
  db.Cart.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
  
  db.Product.hasMany(db.Image, {
    foreignKey: 'product_id',
    as: 'images',
  });
  db.Image.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
  
  db.User.hasMany(db.Wishlist, {
    foreignKey: 'user_id',
    as: 'wishlists',
  });
  db.Wishlist.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
  
  db.Product.hasMany(db.Wishlist, {
    foreignKey: 'product_id',
    as: 'wishlists',
  });
  db.Wishlist.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
  
  db.Cart.hasOne(db.Sold, {
    foreignKey: 'cart_id',
    as: 'sold',
  });
  db.Sold.belongsTo(db.Cart, {
    foreignKey: 'cart_id',
    as: 'cart',
  });


  
Object.keys(sequelize.models).forEach(modelName => {
    if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models);
    }
});






sequelize.authenticate()
    .then(() => {
        console.log(`














          

            ******************************************************************
            *                                                                *
            *                                                                *
            *               C O N N E C T E D   T O   D A T A B A S E        *
            *                                                                *
            *                                                                *
            ******************************************************************

`)
    })
    .catch(err => {
        console.log('Connection Error:', err);
    });

    // sequelize.sync({alter:true});



module.exports = db;