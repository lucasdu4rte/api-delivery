'use strict'
const Type = use('App/Models/Type')

class TypeController {
  async index ({ request, response, view }) {
    const { with_products } = request.all()
    const query = Type.query()

    if (with_products) {
      query.with('products')
    }

    const types = await query.fetch()

    return types
  }

  async store ({ request, response }) {
    const data = request.only([
      'description',
      'type',
      'prepare_time',
      'photo_url'
    ])

    const type = await Type.create({ ...data })

    return type
  }

  async show ({ params, request, response, view }) {
    const type = await Type.findOrFail(params.id)

    return type
  }

  async update ({ params, request, response }) {
    const type = await Type.findOrFail(params.id)

    const data = request.only([
      'description',
      'type',
      'prepare_time',
      'photo_url'
    ])

    type.merge(data)

    await type.save()

    return type
  }

  async destroy ({ params, request, response }) {
    const type = await Type.findOrFail(params.id)

    await type.delete()
  }
}

module.exports = TypeController
