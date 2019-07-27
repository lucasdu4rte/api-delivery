'use strict'

const Order = use('App/Models/Order')

class OrderController {
  async index ({ request, response, view }) {
    const { filter_by_user_id } = request.all()
    const query = Order.query()
      .with('user')
      .with('products.sizes')

    if (filter_by_user_id) {
      // pode ser verificado se não é o admin que está logado e aplicar o filtro
      query.where('user_id', filter_by_user_id)
    }
    const orders = await query.fetch()

    return orders.toJSON().map(order => ({
      ...order,
      products: order.products.map(product => ({
        ...product,
        sizes: undefined,
        size: {
          ...product.sizes.find(size => size.id === product.pivot.size_id)
        }
      }))
    }))
  }

  async store ({ request, response, auth }) {
    const { products, ...data } = request.all()
    const user = await auth.getUser()

    const order = await Order.create({
      ...data,
      order_date: new Date(),
      user_id: user.id
    })

    if (products) {
      await order
        .products()
        .attach(products.map(product => product.id), (row, index) => {
          const productData = products.find(
            product => product.id === row.product_id
          )
          if (productData) {
            row.value = productData.price
            row.quantity = 1
            row.size_id = products[index] ? products[index].size_id : null
          }
        })
    }

    await order.load('products')

    return order
  }

  async show ({ params, request, response, view }) {
    const order = await Order.findOrFail(params.id)

    return order
  }

  async update ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)

    // const data = request.only(["description", "price", "photo_url", "type_id"]);
    const { products, ...data } = request.all()

    order.merge(data)

    await order.save()

    if (products) {
      await order.products().sync(products.map(product => product.id), row => {
        const productData = products.find(
          product => product.id === row.product_id
        )
        if (productData) {
          row.value = productData.price
          row.quantity = 1
        }
      })
    }

    await order.load('products')

    return order
  }

  async destroy ({ params, request, response }) {
    const order = await Order.findOrFail(params.id)

    await order.delete()
  }
}

module.exports = OrderController
