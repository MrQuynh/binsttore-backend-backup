"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Bookings.init(
    {
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      listProducts: DataTypes.STRING,
      phone: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookings",
    }
  );
  return Bookings;
};
