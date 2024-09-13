module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
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
        password: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
      }, {
        tableName: 'admin',
        timestamps: false,
      });
    
      return Admin;
};