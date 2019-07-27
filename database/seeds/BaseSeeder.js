'use strict'
const Size = use('App/Models/Size')
const Type = use('App/Models/Type')
const Product = use('App/Models/Product')

class BaseSeeder {
  async run () {
    const products = await Product.all()

    if (!products.toJSON().length) {
      products[0] = await Product.create({
        description: 'Portuguesa'
      })

      products[1] = await Product.create({
        description: 'Calabresa'
      })

      products[2] = await Product.create({
        description: 'Frango Frito'
      })

      products[3] = await Product.create({
        description: 'Marguerita'
      })

      products[4] = await Product.create({
        description: 'Dois Queijos'
      })

      products[5] = await Product.create({
        description: 'Coca Cola'
      })
    }

    const sizes = await Size.all()

    if (!sizes.toJSON().length) {
      sizes[0] = await Size.create({
        description: 'Gigante',
        price: 76
      })
      sizes[1] = await Size.create({
        description: 'Grande',
        price: 59
      })
      sizes[2] = await Size.create({
        description: 'Média',
        price: 42
      })
      sizes[3] = await Size.create({
        description: 'Pequena',
        price: 29
      })
    }

    const types = await Type.all()

    if (!types.toJSON().length) {
      types[0] = await Type.create({
        description:
          'Mais de 50 sabores de pizza em até 4 tamanhos diferentes de fome.',
        type: 'Pizzas',
        prepare_time: 25
      })

      types[1] = await Type.create({
        description:
          '10 tipos de massas com diferentes molhos para te satisfazer.',
        type: 'Massas',
        prepare_time: 25
      })

      types[2] = await Type.create({
        description:
          'Calzones super recheados com mais de 50 sabores diferentes.',
        type: 'Calzones',
        prepare_time: 25
      })

      types[3] = await Type.create({
        description: 'Refrigerantes, sucos, chá gelado, energéticos e água.',
        type: 'Bebidas não-alcóolicas',
        prepare_time: 25
      })

      types[4] = await Type.create({
        description: 'Cervejas artesanais, vinhos e destilados.',
        type: 'Bebibas Alcóolicas',
        prepare_time: 25
      })

      if (Array.isArray(products)) {
        products.forEach(product => {
          console.log('product', product)
          product.types().attach(types.map(type => type.toJSON().id))
        })
      }
    }
  }
}

module.exports = BaseSeeder
