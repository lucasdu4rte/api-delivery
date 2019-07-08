"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  types() {
    return this.belongsToMany("App/Models/Type");
  }

  sizes() {
    return this.belongsToMany("App/Models/Size").pivotTable("product_size")
  }
}

module.exports = Product;
