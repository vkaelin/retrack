<template>
  <main v-if="invoice.project" class="-mt-64">
    <header class="py-10">
      <div class="max-w-4xl px-4 mx-auto sm:px-6 lg:px-0">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-9 text-white sm:text-3xl">
              <router-link
                :to="{name: 'invoices'}"
                class="text-indigo-500 hover:text-indigo-400"
              >Invoices /</router-link>
              Invoice {{ invoice.number }}
            </h2>
            <div class="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
              <div class="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                  />
                </svg>
                {{ invoice.project.name }}
              </div>
              <div class="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ invoice.project.hourly_rate }}$/h
              </div>
              <div class="flex items-center mt-2 text-sm leading-5 text-gray-300">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ new Date(invoice.created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>
          </div>
          <div class="flex mt-5 lg:mt-0 lg:ml-4">
            <span class="hidden rounded-md shadow-sm sm:block">
              <router-link
                :to="{ name: 'edit-invoice', params: { id: $route.params.id } }"
                class="inline-flex items-center btn-secondary-sm"
              >
                <svg
                  class="w-5 h-5 mr-2 -ml-1 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
                Edit
              </router-link>
            </span>

            <span class="hidden ml-3 rounded-md shadow-sm sm:block">
              <button
                @click="downloadPDF"
                :disabled="isDownloading"
                :class="isDownloading ? 'bg-gray-800 border-gray-700 text-gray-400 cursor-default' : 'bg-gray-700 hover:bg-gray-600 text-white'"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none focus:shadow-outline-gray focus:border-gray-800"
              >
                <svg
                  class="w-5 h-5 mr-2 -ml-1 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Download
              </button>
            </span>

            <span
              :class="{'hidden': invoice.status === 'Paid'}"
              class="rounded-md shadow-sm sm:ml-3"
            >
              <button
                @click="updateInvoiceStatus"
                type="button"
                class="inline-flex items-center btn-primary-sm"
              >
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Mark as {{ nextInvoiceStatus }}
              </button>
            </span>

            <Dropdown
              btn-classes="bg-gray-700 border border-transparent rounded-md hover:bg-gray-600 focus:shadow-outline-gray focus:border-gray-800 transition duration-150 ease-in-out"
              content-classes="-ml-1 w-32"
              position="left"
              :class="{'ml-3': invoice.status !== 'Paid'}"
              class="rounded-md shadow-sm sm:hidden"
            >
              <template v-slot:trigger>
                <div
                  class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white"
                >
                  More
                  <svg
                    class="w-5 h-5 ml-2 -mr-1 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </template>
              <template>
                <div class="py-1 bg-white rounded-md shadow-xs">
                  <router-link
                    :to="{ name: 'edit-invoice', params: { id: $route.params.id } }"
                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >Edit</router-link>
                  <button
                    @click="downloadPDF"
                    :disabled="isDownloading"
                    :class="isDownloading ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-100 focus:bg-gray-100'"
                    type="button"
                    class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out focus:outline-none"
                  >Download</button>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
    <div class="max-w-4xl px-4 pb-12 mx-auto sm:px-6 lg:px-0">
      <div class="overflow-x-auto shadow-lg">
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
          <div class="px-12 py-20 mx-auto" style="min-height: 1036px;">
            <div class="flex items-center justify-between pb-8 border-b border-gray-300">
              <h1 class="text-3xl font-bold leading-none text-gray-500 uppercase">Invoice</h1>
              <div class="flex items-center px-4 text-sm text-gray-700">
                <div class="font-bold text-left">
                  <p>Invoice No:</p>
                  <p>Invoice date:</p>
                  <p>Due date:</p>
                </div>
                <div class="ml-8 text-right">
                  <p>#{{ invoice.number }}</p>
                  <p>{{ new Date(invoice.created_at).toLocaleDateString() }}</p>
                  <p>{{ dueDate }}</p>
                </div>
              </div>
            </div>
            <div class="mt-8 whitespace-no-wrap sm:flex sm:items-start">
              <div v-if="invoice.project.client" class="w-1/2 sm:px-6">
                <p class="text-sm font-bold text-gray-700">To:</p>
                <p class="mt-2">{{ invoice.project.client.company }}</p>
                <p>{{ invoice.project.client.street }}</p>
                <p>{{ invoice.project.client.city }}</p>
                <p>{{ invoice.project.client.country }}</p>
              </div>
              <div v-else class="w-1/2 sm:px-6">
                <p class="text-sm font-bold text-gray-700">To:</p>
                <p class="mt-2">University of Somewhere</p>
                <p>118 Bureaucracy Lane</p>
                <p>Cityville, CA 90210</p>
              </div>
              <div v-if="currentUser.company" class="w-1/2 sm:px-6">
                <p class="text-sm font-bold text-gray-700">From:</p>
                <p class="mt-2">{{ currentUser.company }}</p>
                <p>{{ currentUser.street }}</p>
                <p>{{ currentUser.city }}</p>
                <p>{{ currentUser.country }}</p>
              </div>
              <div v-else class="w-1/2 sm:px-6">
                <p class="text-sm font-bold text-gray-700">From:</p>
                <div class="inline-block px-4 py-2 mt-2 border-2 border-indigo-400 rounded-md">
                  <p>No address filled yet.</p>
                  <p>
                    Please go to your
                    <router-link
                      :to="{ name: 'settings' }"
                      class="font-semibold text-indigo-500"
                    >Settings page</router-link>
                  </p>
                  <p>to edit your information.</p>
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
import { mapState } from 'vuex'
import Dropdown from '@/components/Common/Dropdown.vue'

export default {
  components: {
    Dropdown
  },

  data () {
    return {
      invoice: {},
      isDownloading: false
    }
  },

  async created () {
    const resp = await this.$axios.get(`invoices/${this.$route.params.id}`).catch(e => console.log(e))
    this.invoice = resp.data
  },

  computed: {
    dueDate () {
      const createDate = new Date(this.invoice.created_at)
      createDate.setDate(createDate.getDate() + 30)
      return createDate.toLocaleDateString()
    },
    nextInvoiceStatus () {
      return this.invoice.status === 'Draft' ? 'Sent' : 'Paid'
    },
    totalPrice () {
      return this.invoice.tasks.reduce((agg, task) => {
        return agg + task.actual_time * this.invoice.project.hourly_rate / 3600
      }, 0)
    },
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    async downloadPDF () {
      if (this.isDownloading) return

      this.isDownloading = true
      const html = this.$refs.invoice.outerHTML.replace(/sm:|shadow-xs/g, '').replace(/stamp/g, 'hidden')
      const resp = await this.$axios.post(`invoices/${this.$route.params.id}/print`, { html }, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf'
        }
      })

      const blob = new Blob([resp.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `Invoice-${this.invoice.id}.pdf`
      link.click()
      this.isDownloading = false
    },
    async updateInvoiceStatus () {
      const data = {
        status: this.invoice.status === 'Draft' ? 'Sent' : 'Paid'
      }
      try {
        await this.$axios.put(`invoices/${this.$route.params.id}/status`, data)
        this.invoice.status = data.status
        this.$store.dispatch('notification/add', {
          type: 'success',
          title: 'Successfully updated!',
          message: `Invoice marked as ${data.status}.`
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
