<template>
  <main class="-mt-64">
    <CreateInvoiceModal
      :default-state="openModal"
      @close="openModal = false"
      @create="getInvoices"
    />

    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Invoices</h2>
        <button
          @click="openModal = true"
          class="bg-indigo-600 px-6 py-3 text-white font-medium leading-6 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
        >Create invoice</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div
          v-for="(invoice, index) in invoices"
          :key="invoice.id"
          :class="{ 'mt-8': index !== 0 }"
          class="flex justify-between items-center"
        >
          <div class="font-bold">{{ invoice.id }}</div>
          <div>Project: {{ invoice.project.name }}</div>
          <div>Date: {{ invoice.created_at }}</div>
        </div>
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
    if (!this.$store.getters['projects/projectsLoaded']) {
      this.$store.dispatch('projects/get')
    }

    this.getInvoices()
  },

  methods: {
    async getInvoices () {
      const resp = await this.$axios.get('invoices').catch(e => console.log(e))
      this.invoices = resp.data
    }
  }
}
</script>
