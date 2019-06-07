'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeSizeSchema extends Schema {
  up () {
    this.create('type_sizes', (table) => {
      table.increments()
      table
        .integer('type_id')
        .unsigned()
        .references('types.id')
        .onDelete('cascade')
        .index('type_id')
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
    this.drop('type_sizes')
  }
}

module.exports = TypeSizeSchema
