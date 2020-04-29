'use strict'

const puppeteer = require('puppeteer')
const Invoice = use('App/Models/Invoice')
const Task = use('App/Models/Task')

class InvoiceController {
  async index({ auth, response }) {
    const projects = await auth.user.projects().fetch()
    const projectsId = projects.toJSON().map(p => p.id)

    const invoices = await Invoice.query().whereIn('project_id', projectsId).with('project').orderBy('id', 'desc').fetch()
    return response.json(invoices)
  }

  async create({ auth, request, response }) {
    const projectId = request.input('project')
    const invoice = await Invoice.create({
      project_id: projectId,
      owner_id: auth.user.id
    })

    // Add invoiceId to tasks
    await Task
      .query()
      .where('project_id', projectId)
      .where('invoiced', false)
      .update({
        invoice_id: invoice.id,
        invoiced: true
      })

    return response.ok()
  }

  async show({ auth, params, response }) {
    try {
      const invoice = await Invoice.query()
        .where('id', params.id)
        .with('project')
        .with('tasks')
        .with('project.client')
        // .with('project.tasks', (builder) => {
        //   builder.where('invoiced', false)
        // })
        .firstOrFail()

      if (invoice.owner_id !== auth.user.id) {
        return response.forbidden()
      }

      return response.json(invoice)
    } catch (e) {
      return response.notFound()
    }
  }

  async update({ auth, request, params, response }) {
    const invoice = request.input('invoice')
    const tasks = request.input('tasks')

    // Update Tasks
    const tasksToCreate = []
    const tasksToUpdate = []
    const tasksToDelete = []

    for (const task of tasks) {
      switch (task.status) {
        case 'new':
          tasksToCreate.push(task)
          break
        case 'deleted':
          tasksToDelete.push(task.id)
          break
        default:
          tasksToUpdate.push(task)
          break
      }
    }

    // Create new tasks
    tasksToCreate.forEach(task => {
      task.invoice_id = invoice.id
      task.name = task.invoice_description
      task.project_id = invoice.project_id
      task.invoiced = true

      delete task.status
      delete task.id
    })
    await Task.createMany(tasksToCreate)

    // Update existing tasks
    const updates = tasksToUpdate.map((task) => {
      return Task
        .query()
        .where('id', task.id)
        .update(task)
    })
    await Promise.all(updates)

    // Delete tasks
    await Task
      .query()
      .whereIn('id', tasksToDelete)
      .delete()

    // Update Invoice
    await Invoice
      .query()
      .where('id', params.id)
      .update(invoice)

    return response.ok()
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

  async print({ request, response }) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(request.input('html'))
    await page.addStyleTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.3.5/tailwind.min.css' })
    const pdf = await page.pdf({ format: 'A4' })

    response.type('application/pdf')
    response.send(pdf)

    await browser.close()
  }
}

module.exports = InvoiceController
