'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON from retrack' }
})

Route.post('sessions', 'SessionController.store')
Route.post('users', 'UserController.store').validator('UserStore')

Route.group(() => {
  Route.get('me', 'UserController.current')
  Route.put('users/settings', 'UserController.update').validator('UserUpdate')
  Route.delete('sessions', 'SessionController.destroy')

  Route.get('projects', 'ProjectController.index')

  Route.get('invoices', 'InvoiceController.index')
  Route.post('invoices', 'InvoiceController.create').validator('InvoiceStore')
  Route.get('invoices/:id', 'InvoiceController.show')
  Route.put('invoices/:id', 'InvoiceController.update').middleware('ownsInvoice')
  Route.put('invoices/:id/status', 'InvoiceController.status').middleware('ownsInvoice')
  Route.post('invoices/:id/print', 'InvoiceController.print').middleware('ownsInvoice')
}).middleware('auth')
