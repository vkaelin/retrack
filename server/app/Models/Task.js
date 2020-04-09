'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', (userInstance) => {
      // Set default invoice description
      if (userInstance.dirty.name && !userInstance.dirty.invoice_description) {
        userInstance.invoice_description = userInstance.dirty.name
      }
    })
  }
  
  invoice() {
    return this.belongsTo('App/Models/Invoice', 'invoice_id')
  }

  project() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }
}

module.exports = Task
