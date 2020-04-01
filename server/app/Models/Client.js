'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  owner() {
    return this.belongsTo('App/Models/User', 'owner_id')
  }

  projects() {
    return this.hasMany('App/Models/Project', 'id', 'client_id')
  }
}

module.exports = Client
