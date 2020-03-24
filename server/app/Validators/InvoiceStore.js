'use strict'

const Project = use('App/Models/Project')

class InvoiceStore {
  async authorize() {
    const project = await Project.query()
      .where('owner_id', this.ctx.auth.user.id)
      .where('id', this.ctx.request.input('project'))
      .first()

    if (!project) {
      this.ctx.response.unauthorized('Not authorized')
      return false
    }
    return true
  }

  get rules() {
    return {
      project: 'required|number',
    }
  }
}

module.exports = InvoiceStore
