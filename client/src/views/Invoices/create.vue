<template>
  <Modal :default-state="defaultState" @close="closeModal">
    <template v-slot:content>
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-8 w-8 text-green-600">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fill-rule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Create Invoice</h3>
          <div class="mt-2">
            <p
              class="text-sm leading-5 text-gray-500"
            >Select a project to create an invoice from the realized tasks.</p>
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
                v-model="form.project"
                id="project"
                class="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              >
                <option
                  v-for="project in projects"
                  :key="project.id"
                  :value="project.id"
                >{{ project.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:button>Create Invoice</template>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Modal
  },

  data () {
    return {
      createModalOpen: this.defaultState,
      form: {
        project: null
      }
    }
  },

  computed: {
    ...mapState('projects', ['projects'])
  },

  methods: {
    async closeModal (submitted) {
      this.createModalOpen = false
      this.$emit('close')

      if (submitted && this.form.project) {
        await this.$axios.post('invoices', this.form).catch(e => console.log(e))
        this.$emit('create')
      }
    }

  }
}
</script>