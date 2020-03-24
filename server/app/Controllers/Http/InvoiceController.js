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
}

module.exports = InvoiceController
