'use strict'
const Size = use("App/Models/Size");


class SizeController {
  async index({ request, response, view }) {
    const sizes = Size.all();

    return sizes;
  }

  async store({ request, response }) {
    const data = request.only(["description", "price", "photo_url", "type_id"]);

    const size = await Size.create({ ...data });

    return size;
  }

  async show({ params, request, response, view }) {
    const size = await Size.findOrFail(params.id);

    return size;
  }

  async update({ params, request, response }) {
    const size = await Size.findOrFail(params.id);

    const data = request.only(["description", "price", "photo_url", "type_id"]);

    size.merge(data);

    await size.save();

    return size;
  }

  async destroy({ params, request, response }) {
    const size = await Size.findOrFail(params.id);

    await size.delete();
  }
}

module.exports = SizeController
