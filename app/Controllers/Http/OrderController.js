"use strict";

const Order = use("App/Models/Order");

class OrderController {
  async index({ request, response, view }) {
    // const { type_id } = request.only(["type_id"]);
    const query = Order.query();
    // if (type_id) {
    //   query.types().whereInPivot("type_id", type_id)
    // }

    const orders = await query.fetch();

    return orders;
  }

  async store({ request, response, auth }) {
    const { products, ...data } = request.all();
    const user = await auth.getUser()

    const order = await Order.create({
      ...data,
      order_date: new Date(),
      user_id: user.id
    });

    if (products) {
      await order
        .products()
        .attach(products.map(product => product.id), row => {
          const productData = products.find(
            product => product.id === row.product_id
          );
          if (productData) {
            row.value = productData.price;
            row.quantity = 1;
          }
        });
    }

    await order.load('products')

    return order;
  }

  async show({ params, request, response, view }) {
    const order = await Order.findOrFail(params.id);

    return order;
  }

  async update({ params, request, response }) {
    const order = await Order.findOrFail(params.id);

    // const data = request.only(["description", "price", "photo_url", "type_id"]);
    const { products, ...data } = request.all();

    order.merge(data);

    await order.save();

    if (products) {
      await order
        .products()
        .sync(products.map(product => product.id), row => {
          const productData = products.find(
            product => product.id === row.product_id
          );
          if (productData) {
            row.value = productData.price;
            row.quantity = 1;
          }
        });
    }

    await order.load('products')

    return order;
  }

  async destroy({ params, request, response }) {
    const order = await Order.findOrFail(params.id);

    await order.delete();
  }
}

module.exports = OrderController;
