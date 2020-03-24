'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index({ auth, response }) {
    const projects = await Project.query().where('owner_id', auth.user.id).with('tasks').orderBy('id', 'desc').fetch()
    return response.json(projects)
  }
}

module.exports = ProjectController
