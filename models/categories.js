const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define(
    "categories",
    {
      CategoryId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      CategoryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "categories",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "CategoryId" }],
        },
      ],
    }
  );

  
  Category.associate = (models) => {
    Category.hasMany(models.products, {
      as: "products_category", 
      foreignKey: "CategoryId",
    });
  };

  return Category;
};