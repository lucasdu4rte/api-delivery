'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Size extends Model {

  types () {
    return this.belongsToMany('App/Models/Type')
  }
}

module.exports = Size
