module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      }, {
        tableName: 'user',
        timestamps: false,
      });
    
      return User;
};