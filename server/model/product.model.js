module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true, // This should be the auto-increment column
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        subcategory_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seller_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {
        tableName: 'product',
        timestamps: false,
      });
    
      return Product;
};


