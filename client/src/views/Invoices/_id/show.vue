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
        >Edit invoice</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <!-- <div class="bg-white rounded-lg shadow px-4 py-6 text-gray-900 sm:px-6"> -->
      <div class="bg-white rounded-lg shadow py-6 text-gray-900">
        <div v-if="invoice.project">
          <div class="flex items-center justify-center px-4 pb-2 sm:px-6">
            <p>Project: {{ invoice.project.name }}</p>
            <p class="ml-6">
              Hourly rate:
              <span class="font-semibold">{{ invoice.project.hourly_rate }}$</span>
            </p>
          </div>
          <div
            class="max-w-4xl mx-auto px-12 py-20 border border-gray-200 shadow"
            style="min-height: 1036px;"
          >
            <h1
              class="pb-8 text-3xl text-gray-500 font-bold uppercase border-b border-gray-300"
            >Invoice</h1>
            <div class="mt-8 flex items-start">
              <div class="w-1/2 px-6">
                <p class="text-sm text-gray-700 font-bold">To:</p>
                <p class="mt-2">University of Somewhere</p>
                <p>118 Bureaucracy Lane</p>
                <p>Cityville, CA 90210</p>
              </div>
              <div class="w-1/2 px-6">
                <p class="text-sm text-gray-700 font-bold">From:</p>
                <p class="mt-2">Retrack Inc.</p>
                <p>Verger de Meruz 8</p>
                <p>1804 Corsier-sur-Vevey</p>
                <p>Switzerland</p>
              </div>
            </div>
            <table class="w-full mt-8">
              <thead>
                <tr>
                  <th class="px-4 py-4 border-b border-gray-200 text-left">Description</th>
                  <th class="px-4 py-4 border-b border-gray-200 text-right">Hours</th>
                  <th class="px-4 py-4 border-b border-gray-200 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(task, index) in invoice.project.tasks" :key="task.id">
                  <td
                    class="px-4 py-4 border-b border-gray-200 text-left"
                  >{{ index + 1 }}. {{ task.name }}</td>
                  <td
                    class="px-4 py-4 border-b border-gray-200 text-right"
                  >{{ task.actual_time|hours }}h</td>
                  <td
                    class="px-4 py-4 border-b border-gray-200 text-right"
                  >{{ task.actual_time*invoice.project.hourly_rate/3600|round(2) }}$</td>
                </tr>
                <tr>
                  <td class="border-b border-gray-200"></td>
                  <td class="border-b border-gray-200 px-4 py-4 text-right font-bold">Total</td>
                  <td
                    class="border-b border-gray-200 px-4 py-4 text-right font-bold"
                  >${{ totalPrice|round(2) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="mt-8 text-center text-gray-700">All prices in USD.</div>
          </div>
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

  computed: {
    totalPrice () {
      return this.invoice.project.tasks.reduce((agg, task) => {
        return agg + task.actual_time * this.invoice.project.hourly_rate / 3600
      }, 0)
    }
  },

  methods: {
    async updateInvoice () {
      console.log('update invoice')
      // await this.$axios.put(`invoices/${this.$route.params.id}`, this.invoice).catch(e => console.log(e))
    }
  }
}
</script>
