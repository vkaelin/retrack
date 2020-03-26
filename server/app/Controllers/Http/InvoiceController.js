'use strict'

const Invoice = use('App/Models/Invoice')

class InvoiceController {
  async index({ auth, response }) {
    const projects = await auth.user.projects().fetch()
    const projectsId = projects.toJSON().map(p => p.id)

    const invoices = await Invoice.query().whereIn('project_id', projectsId).with('project').orderBy('id', 'desc').fetch()
    return response.json(invoices)
  }

  async create({ auth, request, response }) {
    const projectId = request.input('project')
    await Invoice.create({
      project_id: projectId,
      owner_id: auth.user.id
    })
    return response.ok()
  }

  async show({ auth, params, response }) {
    try {
      const invoice = await Invoice.query()
        .where('id', params.id)
        .with('project')
        .with('project.tasks', (builder) => {
          builder.where('invoiced', false)
        })
        .firstOrFail()

      if (invoice.owner_id !== auth.user.id) {
        return response.forbidden()
      }

      return response.json(invoice)
    } catch (e) {
      return response.notFound()
    }
  }

  async update({ auth, request, response }) {

  }

  async status({ request, params, response }) {
    const status = request.input('status')
    if (status !== 'Sent' && status !== 'Paid') {
      return response.badRequest()
    }

    await Invoice
      .query()
      .where('id', params.id)
      .update({ status })

    return response.ok()
  }
}

module.exports = InvoiceController
