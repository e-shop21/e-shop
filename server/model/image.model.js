module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {
        tableName: 'image',
        timestamps: false,
      });
    
      return Image;
};