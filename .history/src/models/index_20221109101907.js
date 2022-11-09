"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = "development";
// const config = require(__dirname + "/../config/config.json")[env];
let db = {};

let sequelize;
const customizeConfig = {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
  logging: false,
};
sequelize = new Sequelize(
  "sql12552746",
  "sql12552746",
  "8LkRCAGEZH",

  customizeConfig
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
