<template>
  <div class="relative">
    <div>
      <button @click="isOpen = !isOpen" :class="btnClasses" class="block focus:outline-none">
        <slot name="trigger"></slot>
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        :class="[contentClasses, contentPosition]"
        class="absolute mt-2 rounded-md shadow-lg"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    btnClasses: {
      type: String,
      default: ''
    },
    contentClasses: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'right'
    }
  },

  data () {
    return {
      isOpen: false
    }
  },

  computed: {
    contentPosition () {
      return this.position === 'right' ? 'origin-top-right right-0' : 'origin-top-left left-0'
    }
  },

  created () {
    document.addEventListener('click', this.clickOutside)
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutside)
    document.removeEventListener('keydown', this.handleEscape)
  },

  methods: {
    clickOutside (e) {
      e.stopPropagation()

      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }

      this.isOpen = false
    },
    handleEscape (e) {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
  }
}
</script>
