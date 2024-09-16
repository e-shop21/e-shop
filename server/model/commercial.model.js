module.exports = (sequelize, DataTypes) => {
    const Commercial = sequelize.define('Commercial', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ref: {
        type: DataTypes.ENUM('NA:sectionA', 'NA:sectionB', 'NA:sectionC', 'NA:sectionD', 'exclusiveOffer', 'Pub'),
        allowNull: false
      }
    }, {
      tableName: 'commercials',
      timestamps: true
    });
  
    return Commercial;
  };