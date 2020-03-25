'use strict'

const Invoice = use('App/Models/Invoice')

class InvoiceController {
  async index({ auth, response }) {
    const projects = await auth.user.projects().fetch()
    const projectsId = projects.toJSON().map(p => p.id)

    const invoices = await Invoice.query().whereIn('project_id', projectsId).with('project').orderBy('id', 'desc').fetch()
    return response.json(invoices)
  }

  async create({ request, response }) {
    const projectId = request.input('project')
    await Invoice.create({
      project_id: projectId
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

      if (invoice.toJSON().project.owner_id !== auth.user.id) {
        return response.forbidden()
      }

      return response.json(invoice)
    } catch (e) {
      return response.notFound()
    }
  }

  async update({ auth, request, response }) {

  }
}

module.exports = InvoiceController
