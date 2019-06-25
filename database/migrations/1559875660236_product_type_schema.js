'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeSchema extends Schema {
  up () {
    this.create('product_type', (table) => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('cascade')
        .index('product_id')
      table
        .integer('type_id')
        .unsigned()
        .references('types.id')
        .onDelete('cascade')
        .index('type_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_type')
  }
}

module.exports = ProductTypeSchema
