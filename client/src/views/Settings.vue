<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Settings</h2>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <form @submit.prevent="updateSettings">
          <div>
            <div class>
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                <p
                  class="mt-1 max-w-2xl text-sm leading-5 text-gray-500"
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
                        class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                        class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                        class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                        class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-200 pt-5">
            <div class="flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button
                  @click="fillOldValues()"
                  type="button"
                  class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                >Reset</button>
              </span>
              <span class="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
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
