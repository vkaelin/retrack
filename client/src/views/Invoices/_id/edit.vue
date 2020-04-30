<template>
  <main v-if="invoice.id" class="-mt-64">
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
          <button @click="updateInvoice" class="ml-3 btn-primary-sm">Save changes</button>
        </div>
      </div>
    </header>

    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="overflow-x-auto shadow-lg">
        <div
          ref="invoice"
          class="text-gray-900 bg-white rounded-lg shadow-xs"
          style="min-width: 780px;"
        >
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
                    <input
                      v-model="invoice.number"
                      class="flex w-16 ml-auto text-right invisible-input"
                      type="number"
                    />
                    <DateTimePicker v-model="invoice.created_at" :hasTime="false" />
                    <p>{{ dueDate }}</p>
                  </div>
                </div>
              </div>
              <table class="w-full mt-8 table-fixed">
                <thead>
                  <tr>
                    <th class="px-4 py-4 text-left border-b border-gray-200 w-desc">Description</th>
                    <th class="px-4 py-4 text-right border-b border-gray-200 w-hours">Hours</th>
                    <th class="px-4 py-4 text-right border-b border-gray-200 w-amount">Amount</th>
                    <th class="px-4 py-4 text-right border-b border-gray-200 w-delete"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in displayedTasks" :key="index + 'task'">
                    <td class="px-4 py-4 text-left border-b border-gray-200">
                      <div class="flex items-center">
                        <div>{{ index + 1 }}.</div>
                        <div class="flex-1 ml-1">
                          <input
                            v-model="task.invoice_description"
                            class="w-full invisible-input"
                            type="text"
                          />
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-right border-b border-gray-200">
                      <InputHours :id="task.id" :time="task.actual_time" @input="updateTaskHours" />
                    </td>
                    <td
                      class="px-4 py-4 text-right border-b border-gray-200"
                    >{{ task.actual_time*project.hourly_rate/3600|round(2) }}$</td>
                    <td class="px-4 py-4 text-right border-b border-gray-200">
                      <button
                        @click="deleteTask(task.id)"
                        class="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                        type="button"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-4 py-4">
                      <button
                        @click="addTask"
                        type="button"
                        class="flex items-center text-indigo-600 hover:text-indigo-500 focus:outline-none focus:text-indigo-500"
                      >
                        <div>
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="ml-2 font-semibold">Add one task</div>
                      </button>
                    </td>
                    <td class="px-4 py-4"></td>
                    <td class="px-4 py-4"></td>
                    <td class="px-4 py-4"></td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-200"></td>
                    <td class="border-b border-gray-200"></td>
                    <td class="px-4 py-4 font-bold text-right border-b border-gray-200">Total</td>
                    <td
                      class="px-4 py-4 font-bold text-right border-b border-gray-200"
                    >${{ totalPrice|round(2) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-8 text-center text-gray-700">
                <input v-model="invoice.remark" class="invisible-input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import DateTimePicker from '@/components/Form/DateTimePicker.vue'
import InputHours from '@/components/Invoices/InputHours.vue'

export default {
  components: {
    DateTimePicker,
    InputHours
  },

  data () {
    return {
      invoice: {},
      project: {},
      tasks: []
    }
  },

  computed: {
    displayedTasks () {
      return this.tasks.filter(t => t.status !== 'deleted')
    },
    dueDate () {
      const createDate = new Date(this.invoice.created_at)
      createDate.setDate(createDate.getDate() + 30)
      return createDate.toLocaleDateString()
    },
    totalPrice () {
      return this.tasks.reduce((agg, task) => {
        return agg + task.actual_time * this.project.hourly_rate / 3600
      }, 0)
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get(`invoices/${this.$route.params.id}`)
      this.tasks = resp.data.tasks
      this.project = resp.data.project

      delete resp.data.tasks
      delete resp.data.project

      this.invoice = resp.data
    } catch (error) {
      this.$store.dispatch('notification/add', {
        type: 'error',
        title: 'Error!',
        message: 'Invoice not found.'
      })
    }
  },

  methods: {
    addTask () {
      const tmpId = this.tasks.length ? (this.tasks.reduce((a, b) => a.id > b.id ? a : b).id + 1) : 0
      this.tasks.push({
        id: tmpId,
        status: 'new',
        actual_time: 0,
        invoice_description: 'Edit your new task'
      })
    },
    deleteTask (id) {
      const index = this.tasks.findIndex(t => t.id === id)
      this.tasks[index].status = 'deleted'
      this.$set(this.tasks, index, this.tasks[index])
    },
    async updateInvoice () {
      console.log('update invoice')
      const data = {
        invoice: this.invoice,
        tasks: this.tasks
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
    },
    updateTaskHours ({ secs, id }) {
      const index = this.tasks.findIndex(t => t.id === id)
      this.tasks[index].actual_time = secs
    }
  }
}
</script>

<style scoped>
.w-desc {
  width: 60%;
}

.w-hours {
  width: 10%;
}

.w-amount {
  width: 20%;
}

.w-delete {
  width: 10%;
}
</style>
