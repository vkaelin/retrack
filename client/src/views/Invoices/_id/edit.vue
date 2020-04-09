<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Invoice {{ invoice.id }}</h2>
        <div class="flex">
          <span class="block shadow-sm rounded-md">
            <router-link
              :to="{ name: 'show-invoice', params: { id: $route.params.id } }"
              class="inline-flex items-center px-4 py-2 bg-gray-700 text-white border border-transparent text-sm leading-5 font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray focus:border-gray-800 transition duration-150 ease-in-out"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Cancel
            </router-link>
          </span>
          <button
          @click="updateInvoice"
            class="ml-3 bg-indigo-500 px-4 py-2 text-white text-sm font-medium leading-5 rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out"
          >Save changes</button>
        </div>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow py-6"></div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      invoice: {}
    }
  },

  async created () {
    const resp = await this.$axios.get(`invoices/${this.$route.params.id}`).catch(e => console.log(e))
    this.invoice = resp.data
  },

  methods: {
    updateInvoice () {
      console.log('update invoice')
    }
  }
}
</script>
