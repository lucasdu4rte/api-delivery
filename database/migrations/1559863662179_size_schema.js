'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SizeSchema extends Schema {
  up () {
    this.create('sizes', (table) => {
      table.increments()

      table.text('description').notNullable()
      table.float('price').notNullable()
      table.string('photo_url', 255)

      table.timestamps()
    })
  }

  down () {
    this.drop('sizes')
  }
}

module.exports = SizeSchema
