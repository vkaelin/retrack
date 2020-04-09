<template>
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="w-auto h-12 mx-auto" src="@/assets/img/logo-icon.svg" alt="Logo" />
      <h2
        class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
      >Sign in to your account</h2>
      <p class="mt-2 text-sm leading-5 text-center text-gray-600 max-w">
        Or
        <router-link
          :to="{name: 'register'}"
          class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
        >sign up if you don't have an account</router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="login" method="POST">
          <div>
            <div class="flex items-center justify-between">
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Email address</label>
              <div
                v-if="errors.uid"
                class="block mr-1 text-xs italic leading-5 text-red-400"
              >{{ errors.uid.message }}</div>
            </div>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="form.email"
                id="email"
                type="email"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Password</label>
              <div
                v-if="errors.password"
                class="block mr-1 text-xs italic leading-5 text-red-400"
              >{{ errors.password.message }}</div>
            </div>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="form.password"
                id="password"
                type="password"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center">
              <input
                v-model="form.remember"
                id="remember_me"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
              />
              <label
                for="remember_me"
                class="block ml-2 text-sm leading-5 text-gray-900"
              >Remember me</label>
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              >Sign in</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: null,
        password: null,
        remember: false
      },
      errors: {}
    }
  },

  methods: {
    async login () {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push({ name: 'tasks' })
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  }
}
</script>
