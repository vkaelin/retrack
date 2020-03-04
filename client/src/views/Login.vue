<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="@/assets/logo.png" alt="Logo" />
      <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >Sign in to your account</h2>
      <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        Or
        <a
          href="#"
          class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >register if you don't have an account</a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="login" method="POST">
          <div>
            <div class="flex justify-between items-center">
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Email address</label>
              <div
                v-if="errors.uid"
                class="mr-1 block text-xs italic leading-5 text-red-400"
              >{{ errors.uid.message }}</div>
            </div>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="email"
                id="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="flex justify-between items-center">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Password</label>
              <div
                v-if="errors.password"
                class="mr-1 block text-xs italic leading-5 text-red-400"
              >{{ errors.password.message }}</div>
            </div>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="password"
                id="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900"
              >Remember me</label>
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
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
      email: null,
      password: null,
      errors: {}
    }
  },

  methods: {
    async login () {
      console.log('login', this.email, this.password)
      try {
        await this.$store.dispatch('auth/login', { uid: this.email, password: this.password })
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
