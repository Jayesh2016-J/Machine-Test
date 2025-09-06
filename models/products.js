const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define(
    "products",
    {
      ProductId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ProductName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "CategoryId",
        },
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
      tableName: "products",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ProductId" }],
        },
        {
          name: "CategoryId",
          using: "BTREE",
          fields: [{ name: "CategoryId" }],
        },
      ],
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.categories, {
      as: "category_product", 
      foreignKey: "CategoryId",
    });
  };

  return Product;
};