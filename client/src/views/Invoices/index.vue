<template>
  <main class="-mt-64">
    <CreateInvoiceModal
      :default-state="openModal"
      @close="openModal = false"
      @create="getInvoices"
    />

    <header class="py-10">
      <div class="flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-9 text-white">Invoices</h2>
        <button
          @click="openModal = true"
          class="px-6 py-3 font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
        >Create invoice</button>
      </div>
    </header>
    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="py-6 bg-white rounded-lg shadow">
        <router-link
          :to="{ name: 'show-invoice', params: { id: invoice.id} }"
          v-for="(invoice) in invoices"
          :key="invoice.id"
          class="flex items-center justify-between px-5 py-4 text-gray-900 transition duration-150 ease-in-out border-b border-gray-200 hover:bg-gray-50 focus:bg-gray-50 sm:px-6"
        >
          <div class="w-1/12 font-bold">{{ invoice.id }}</div>
          <div class="w-6/12">Project: {{ invoice.project.name }}</div>
          <div
            class="w-3/12 text-cool-gray-500"
          >Created the {{ new Date(invoice.created_at).toLocaleDateString() }}</div>
          <div class="w-1/12">
            <span
              :class="badgeColor(invoice.status)"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5"
            >{{ invoice.status }}</span>
          </div>
          <div class="flex items-center justify-end w-1/12">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import CreateInvoiceModal from '@/views/Invoices/create.vue'

export default {
  components: {
    CreateInvoiceModal
  },

  data () {
    return {
      openModal: false,
      invoices: []
    }
  },

  async created () {
    if (!this.$store.getters['project/projectsLoaded']) {
      this.$store.dispatch('project/get')
    }

    this.getInvoices()
  },

  methods: {
    badgeColor (status) {
      switch (status) {
        case 'Draft':
          return 'bg-gray-100 text-gray-800'
        case 'Sent':
          return 'bg-orange-100 text-orange-800'
        case 'Paid':
          return 'bg-green-100 text-green-800'
        default:
          return ''
      }
    },
    async getInvoices () {
      const resp = await this.$axios.get('invoices').catch(e => console.log(e))
      this.invoices = resp.data
    }
  }
}
</script>
