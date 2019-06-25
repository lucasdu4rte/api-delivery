'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('cascade')
        .index('user_id')
      table.datetime('order_date').notNullable()
      table.float('total').notNullable()

      table.text('observation')
      table.string('zip_code', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('number', 255).notNullable()
      table.string('complement', 255)
      table.string('neighborhood', 255).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
