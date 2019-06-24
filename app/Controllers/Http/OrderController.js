'use strict'

const Order = use("App/Models/Order");

class OrderController {
  async index ({ request, response, view }) {
    // const { type_id } = request.only(["type_id"]);
    const query = Order.query()
    // if (type_id) {
    //   query.types().whereInPivot("type_id", type_id)
    // }

    const orders = await query.fetch();

    return orders;
  }

  async store ({ request, response }) {
    const { ...data } = request.all()

    const order = await Order.create(data)

    return order
  }

  async show ({ params, request, response, view }) {
    const order = await Order.findOrFail(params.id);

    return order;
  }

  async update ({ params, request, response }) {
    const order = await Order.findOrFail(params.id);

    const data = request.only(["description", "price", "photo_url", "type_id"]);

    order.merge(data);

    await order.save();

    return order;
  }

  async destroy ({ params, request, response }) {
    const order = await Order.findOrFail(params.id);

    await order.delete();
  }
}

module.exports = OrderController
