<template>
  <transition leave-active-class="duration-300">
    <div
      v-show="open"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
    >
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-if="open" @click="closeModal(false)" class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-class="transform translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="transform translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="transform translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="transform translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="open"
          class="relative px-4 pt-5 pb-4 overflow-hidden bg-white rounded-lg shadow-xl sm:max-w-sm sm:w-full sm:p-6"
        >
          <slot name="content" />
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button
                @click="closeModal(true)"
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5"
              >
                <slot name="button" />
              </button>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
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
    closeModal (button = false) {
      this.open = false
      this.$emit('close', button)
    }
  }
}
</script>
