'use strict'

class OrderController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('user joined with %s socket id', socket.id)
  }

  onMessage () {
    // same as: socket.on('message')
  }

  onClose () {
    // same as: socket.on('close')
  }

  onError () {
    // same as: socket.on('error')
  }
}

module.exports = OrderController
