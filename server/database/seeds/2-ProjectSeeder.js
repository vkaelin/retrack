'use strict'

/*
|--------------------------------------------------------------------------
| ProjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Project = use('App/Models/Project')

class ProjectSeeder {
  async run () {
    await Project.create({
      name: 'NBA Website',
      owner_id: 21,
    })

    await Project.create({
      name: 'Wikipedia rebrand',
      owner_id: 21,
    })

    await Project.create({
      name: 'Swiss Basketball mobile app',
      owner_id: 21,
    })
  }
}

module.exports = ProjectSeeder
