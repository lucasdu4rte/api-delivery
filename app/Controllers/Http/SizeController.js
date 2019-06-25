"use strict";
const Size = use("App/Models/Size");
const Database = use("Database");

class SizeController {
  async index({ request }) {
    const { product_id } = request.only(["product_id"]);

    const query = Database.select("sizes.*").from("sizes");

    if (product_id) {
      query
        .leftJoin("product_size", "sizes.id", "product_size.size_id")
        .leftJoin("products", "products.id", "product_size.product_id")
        .where("products.id", product_id);
    }

    const sizes = await query;

    return sizes;
  }

  async store({ request }) {
    const data = request.only(["description", "price", "photo_url", "type_id"]);

    const size = await Size.create({ ...data });

    return size;
  }

  async show({ params }) {
    const size = await Size.findOrFail(params.id);

    return size;
  }

  async update({ params, request }) {
    const size = await Size.findOrFail(params.id);

    const data = request.only(["description", "price", "photo_url", "type_id"]);

    size.merge(data);

    await size.save();

    return size;
  }

  async destroy({ params }) {
    const size = await Size.findOrFail(params.id);

    await size.delete();
  }
}

module.exports = SizeController;
