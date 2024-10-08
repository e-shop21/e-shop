module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      }, {
        tableName: 'category',
        timestamps: false,
      });
    
      return Category;
};