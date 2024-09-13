module.exports = (sequelize, DataTypes) => {
    const Sold = sequelize.define('Sold', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {
        tableName: 'sold',
        timestamps: false,
      });
    
      return Sold;
};