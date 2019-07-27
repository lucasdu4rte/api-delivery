'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Size extends Model {
  products () {
    return this.belongsToMany('App/Models/Product').pivotTable('product_size')
  }
}

module.exports = Size
