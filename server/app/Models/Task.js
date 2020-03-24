'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  invoice() {
    return this.belongsTo('App/Models/Invoice', 'invoice_id')
  }

  project() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }
}

module.exports = Task
