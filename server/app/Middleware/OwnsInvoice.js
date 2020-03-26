'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Invoice = use('App/Models/Invoice')

class OwnsInvoice {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, params, response }, next) {
    try {
      const invoice = await Invoice.query()
        .where('id', params.id)
        .where('owner_id', auth.user.id)
        .firstOrFail()

      request.invoice = invoice

      await next()

    } catch (e) {
      return response.forbidden()
    }
  }
}

module.exports = OwnsInvoice
