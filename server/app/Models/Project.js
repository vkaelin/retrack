'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  client() {
    return this.belongsTo('App/Models/Client', 'client_id')
  }

  owner() {
    return this.belongsTo('App/Models/User', 'owner_id')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
