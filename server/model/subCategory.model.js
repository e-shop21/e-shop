module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {
        tableName: 'subcategory',
        timestamps: false,
      });
    
      return Subcategory;
};