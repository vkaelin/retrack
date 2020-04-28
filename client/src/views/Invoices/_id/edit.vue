<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-9 text-white">Invoice {{ invoice.number }}</h2>
        <div class="flex">
          <span class="block rounded-md shadow-sm">
            <router-link
              :to="{ name: 'show-invoice', params: { id: $route.params.id } }"
              class="inline-flex items-center btn-secondary-sm"
            >
              <svg
                class="w-5 h-5 mr-2 -ml-1 text-gray-400"
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
            class="ml-3 btn-primary-sm"
          >Save changes</button>
        </div>
      </div>
    </header>

    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div v-if="invoice.project" class="overflow-x-auto shadow-lg">
        <div
          ref="invoice"
          class="relative text-gray-900 bg-white rounded-lg shadow-xs"
          style="min-width: 620px;"
        >
          <img
            :src="require(`@/assets/img/invoices/${invoice.status}.png`)"
            class="absolute pointer-events-none stamp w-28"
            style="left: 40%; top: 30px;"
            alt="Invoice status stamp"
          />
          <div>
            <div class="px-12 py-20 mx-auto">
              <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                <h1 class="text-3xl font-bold leading-none text-gray-500 uppercase">Invoice</h1>
                <div class="flex items-center px-4 text-sm text-gray-700">
                  <div class="font-bold text-left">
                    <p>Invoice No:</p>
                    <p>Invoice date:</p>
                    <p>Due date:</p>
                  </div>
                  <div class="ml-8 text-right">
                    <!-- <p>#{{ invoice.number }}</p> -->
                    <input
                      class="inline-flex w-16 text-right invisible-input"
                      type="text"
                      v-model="invoice.number"
                    />
                    <p>{{ new Date(invoice.created_at).toLocaleDateString() }}</p>
                    <p>{{ dueDate }}</p>
                  </div>
                </div>
              </div>
              <table class="w-full mt-8">
                <thead>
                  <tr>
                    <th class="px-4 py-4 text-left border-b border-gray-200">Description</th>
                    <th class="px-4 py-4 text-right border-b border-gray-200">Hours</th>
                    <th class="px-4 py-4 text-right border-b border-gray-200">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in invoice.tasks" :key="task.id">
                    <td
                      class="px-4 py-4 text-left border-b border-gray-200"
                    >{{ index + 1 }}. {{ task.invoice_description }}</td>
                    <td
                      class="px-4 py-4 text-right border-b border-gray-200"
                    >{{ task.actual_time|hours }}h</td>
                    <td
                      class="px-4 py-4 text-right border-b border-gray-200"
                    >{{ task.actual_time*invoice.project.hourly_rate/3600|round(2) }}$</td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-200"></td>
                    <td class="px-4 py-4 font-bold text-right border-b border-gray-200">Total</td>
                    <td
                      class="px-4 py-4 font-bold text-right border-b border-gray-200"
                    >${{ totalPrice|round(2) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-8 text-center text-gray-700">{{ invoice.remark }}</div>
            </div>
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
      initialInvoice: {},
      invoice: {}
    }
  },

  computed: {
    dueDate () {
      const createDate = new Date(this.invoice.created_at)
      createDate.setDate(createDate.getDate() + 30)
      return createDate.toLocaleDateString()
    },
    totalPrice () {
      return this.invoice.tasks.reduce((agg, task) => {
        return agg + task.actual_time * this.invoice.project.hourly_rate / 3600
      }, 0)
    }
  },

  async created () {
    const resp = await this.$axios.get(`invoices/${this.$route.params.id}`).catch(e => console.log(e))
    this.initialInvoice = resp.data
    this.invoice = resp.data
  },

  methods: {
    async updateInvoice () {
      console.log('update invoice')
      const data = {
        invoice: this.invoice,
        tasks: this.invoice.tasks
      }

      try {
        await this.$axios.put(`invoices/${this.$route.params.id}`, data)
        this.$store.dispatch('notification/add', {
          type: 'success',
          title: 'Successfully updated!',
          message: `Invoice has been updated.`
        })
      } catch (e) {
        console.log(e)
        this.$store.dispatch('notification/add', {
          type: 'error',
          title: 'Error!',
          message: 'Error while updating the invoice.'
        })
      }
    }
  }
}
</script>

<style scoped>
.invisible-input {
  @apply rounded-sm;
}

.invisible-input:hover {
  @apply bg-gray-300;
}

.invisible-input:focus {
  @apply bg-white;
}
</style>
