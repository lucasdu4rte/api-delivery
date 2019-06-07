'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeSchema extends Schema {
  up () {
    this.create('product_types', (table) => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('cascade')
        .index('product_id')
      table
        .integer('size_id')
        .unsigned()
        .references('sizes.id')
        .onDelete('cascade')
        .index('size_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_types')
  }
}

module.exports = ProductTypeSchema
