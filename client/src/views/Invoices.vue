<template>
  <main class="-mt-64">
    <Modal :default-state="createModalOpen" @updateState="updateModalState">
      <template v-slot:content>
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              class="h-6 w-6 text-green-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Create Invoice</h3>
            <div class="mt-2">
              <p
                class="text-sm leading-5 text-gray-500"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
            </div>
          </div>
          <div
            class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="project"
              class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
            >Project</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="max-w-xs rounded-md shadow-sm">
                <select
                  id="project"
                  class="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option v-for="project in projects" :key="project.id">{{ project.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:button>Create Invoice</template>
    </Modal>
    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Invoices</h2>
        <button
          @click="createInvoice"
          class="bg-indigo-600 px-6 py-3 text-white font-medium rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
        >Create invoice</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div>Your invoices</div>
        <div v-for="i in 50" :key="i">a</div>
      </div>
    </div>
  </main>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },

  data () {
    return {
      createModalOpen: false,
      projects: []
    }
  },

  methods: {
    async createInvoice () {
      this.createModalOpen = !this.createModalOpen

      const resp = await this.$axios.get('projects').catch(e => console.log(e))
      this.projects = resp.data
    },
    updateModalState (value) {
      this.createModalOpen = value
    }
  }
}
</script>
