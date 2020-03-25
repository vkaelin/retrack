<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">
          <router-link
            :to="{name: 'invoices'}"
            class="text-indigo-500 hover:text-indigo-400"
          >Invoices /</router-link>
          Invoice {{ $route.params.id }}
        </h2>
        <button
          @click="updateInvoice"
          class="bg-indigo-500 px-6 py-3 text-white font-medium leading-6 rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out"
        >Save changes</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-4 py-6 sm:px-6">
        <div v-if="invoice.project">
          <p>Project: {{ invoice.project.name }}</p>
          <p>
            Hourly rate:
            <span class="font-semibold">{{ invoice.project.hourly_rate }}$</span>
          </p>
          <p class="mt-4">Tasks available:</p>
          <ul class="ml-4">
            <li
              v-for="task in invoice.project.tasks"
              :key="task.id"
              class="flex items-center text-sm text-gray-600"
            >
              <div class="w-36">{{ task.name }}</div>
              <div class="w-12">{{ task.actual_time|hours }}h</div>
              <div>{{ task.actual_time*invoice.project.hourly_rate/3600|round(2) }}$</div>
            </li>
          </ul>
        </div>
      </div>
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
    async updateInvoice () {
      console.log('update invoice')
      // await this.$axios.put(`invoices/${this.$route.params.id}`, this.invoice).catch(e => console.log(e))
    }
  }
}
</script>
