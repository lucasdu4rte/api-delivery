"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderItemSchema extends Schema {
  up() {
    this.create("order_items", table => {
      table.increments();
      table
        .integer("product_id")
        .unsigned()
        .references("products.id")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("size_id")
        .unsigned()
        .references("sizes.id")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("order_id")
        .notNullable()
        .unsigned()
        .references("orders.id")
        .index("order_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.float("value").notNullable();
      table.integer("quantity").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("order_items");
  }
}

module.exports = OrderItemSchema;
