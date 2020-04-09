<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-9 text-white">Settings</h2>
      </div>
    </header>
    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
        <form @submit.prevent="updateSettings">
          <div>
            <div class>
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p
                  class="max-w-2xl mt-1 text-sm leading-5 text-gray-500"
                >This information will be the default values when you create invoices.</p>
              </div>
              <div class="mt-6 sm:mt-5">
                <div
                  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="company"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Name or Company name</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-xs rounded-md shadow-sm">
                      <input
                        v-model="form.company"
                        id="company"
                        class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="street"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Street address</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm">
                      <input
                        v-model="form.street"
                        id="street"
                        class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="city"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >City and ZIP / Postal</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-xs rounded-md shadow-sm">
                      <input
                        v-model="form.city"
                        id="city"
                        class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="country"
                    class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >Country / Region</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-xs rounded-md shadow-sm">
                      <input
                        v-model="form.country"
                        id="country"
                        class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-5 mt-8 border-t border-gray-200">
            <div class="flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button
                  @click="fillOldValues()"
                  type="button"
                  class="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                >Reset</button>
              </span>
              <span class="inline-flex ml-3 rounded-md shadow-sm">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                >Save</button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        company: null,
        street: null,
        city: null,
        country: null
      }
    }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  created () {
    this.fillOldValues()
  },

  methods: {
    fillOldValues () {
      this.form.company = this.currentUser.company
      this.form.street = this.currentUser.street
      this.form.city = this.currentUser.city
      this.form.country = this.currentUser.country
    },
    async updateSettings () {
      try {
        await this.$axios.put('users/settings', this.form)
        this.$store.dispatch('notification/add', {
          type: 'success',
          title: 'Successfully edited!',
          message: 'Your settings are now updated.'
        })
        this.$store.dispatch('auth/updateSettings', this.form)
      } catch (e) {
        console.log(e)
        this.$store.dispatch('notification/add', {
          type: 'error',
          title: 'Error!',
          message: 'Please fill in all the the fields.'
        })
      }
    }
  }
}
</script>
