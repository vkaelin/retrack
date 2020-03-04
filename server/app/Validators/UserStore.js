'use strict'

class UserStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|min:2|max:24|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    }
  }

  get messages() {
    return {
      'username.required': 'You must provide a username.',
      'username.min': 'Minimum length is 2 characters.',
      'username.max': 'Maximum length is 24 characters.',
      'username.unique': 'Username already taken.',
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'Email already taken.',
      'password.required': 'You must provide a password.',
      'password_confirmation.required_if': 'The passwords are not identical.',
      'password_confirmation.same': 'The passwords are not identical.'
    }
  }
}

module.exports = UserStore
