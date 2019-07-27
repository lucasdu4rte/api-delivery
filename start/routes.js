'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.store')

Route.resource('orders', 'OrderController')
  .apiOnly()
  .middleware('auth')

Route.resource('products', 'ProductController')
  .apiOnly()
  .middleware('auth')

Route.post('/sessions', 'SessionController.store')

Route.resource('/sizes', 'SizeController')
  .apiOnly()
  .middleware('auth')

Route.resource('types', 'TypeController')
  .apiOnly()
  .middleware('auth')
