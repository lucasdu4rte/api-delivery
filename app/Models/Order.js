'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

  user () {
    return this.belongsTo('App/Models/User')
  }

  products () {
    return this.belongsToMany('App/Models/Product').pivotModel('App/Models/OrderItem')
  }
}

module.exports = Order
