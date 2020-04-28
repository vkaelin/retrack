'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invoice extends Model {
  static boot() {
    super.boot()

    // Default Invoice number is its id
    this.addHook('afterCreate', async (invoiceInstance) => {
      invoiceInstance.number = invoiceInstance.id
      await invoiceInstance.save()
    })
  }

  owner() {
    return this.belongsTo('App/Models/User', 'owner_id')
  }

  project() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Invoice
