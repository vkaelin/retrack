'use strict'

class UserController {
  async current ({ auth }) {
    return auth.user
  }
}

module.exports = UserController
