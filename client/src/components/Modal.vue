<template>
  <div
    v-show="open"
    class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
  >
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="open" class="fixed inset-0">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="transform opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-class="transform opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="open"
        class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl sm:max-w-sm sm:w-full sm:p-6"
      >
        <slot name="content" />
        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button
              @click="updateState"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <slot name="button" />
            </button>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      open: this.defaultState
    }
  },

  watch: {
    defaultState () {
      this.open = this.defaultState
    }
  },

  methods: {
    updateState () {
      this.open = !this.open
      this.$emit('updateState', this.open)
    }
  }
}
</script>
