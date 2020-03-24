'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invoice extends Model {
  project() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Invoice
