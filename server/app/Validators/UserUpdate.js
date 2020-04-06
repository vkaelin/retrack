'use strict'

class UserUpdate {
  get rules () {
    return {
      company: 'required',
      street: 'required',
      city: 'required',
      country: 'required',
    }
  }
}

module.exports = UserUpdate
