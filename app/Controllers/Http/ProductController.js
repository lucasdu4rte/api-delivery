'use strict'
const Product = use('App/Models/Product')
const Database = use('Database')

class ProductController {
  async index ({ request }) {
    const { type_id } = request.only(['type_id'])

    const query = Database.select('products.*').from('products')

    if (type_id) {
      query
        .leftJoin('product_type', 'products.id', 'product_type.product_id')
        .leftJoin('types', 'types.id', 'product_type.type_id')
        .where('types.id', type_id)
    }

    const products = await query

    return products
  }

  async store ({ request, response }) {
    const data = request.only(['description', 'type_id', 'photo_url'])

    const product = await Product.create({ ...data })

    return product
  }

  async show ({ params, request, response, view }) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async update ({ params, request, response }) {
    const product = await Product.findOrFail(params.id)

    const data = request.only(['description', 'type_id', 'photo_url'])

    product.merge(data)

    await product.save()

    return product
  }

  async destroy ({ params, request, response }) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}

module.exports = ProductController
