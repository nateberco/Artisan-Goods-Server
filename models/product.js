module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING(2000), //to limit the data
      allowNull: false,
    },
    adminDisplay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    owner: {
      type: DataTypes.INTEGER,
    },
  });
  return Product;
};
