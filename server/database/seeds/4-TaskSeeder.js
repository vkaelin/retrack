'use strict'

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Task = use('App/Models/Task')

class TaskSeeder {
  async run() {
    const tasks = [
      {
        name: 'Mobile navigation',
        planned_time: 3600,
        actual_time: 720,
        started: false,
        invoiced: false,
        project_id: 1,
      },
      {
        name: 'Design homepage',
        planned_time: 7200,
        actual_time: 3780,
        started: false,
        invoiced: false,
        project_id: 1,
      },
      {
        name: 'Fix authentication',
        planned_time: 1800,
        actual_time: 420,
        started: false,
        invoiced: false,
        project_id: 1,
      },
    ]

    for (const task of tasks) {
      await Task.create(task)
    }
  }
}

module.exports = TaskSeeder
