<template>
  <input
    :value="displayTime"
    @input="toSeconds($event.target.value)"
    class="w-16 text-right invisible-input"
    type="text"
  />
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  },

  computed: {
    displayTime () {
      return this.$options.filters.hours(this.time)
    }
  },

  methods: {
    toSeconds (val) {
      let secs = val.replace(/,/g, '.') * 3600
      if (isNaN(secs)) {
        secs = 0
      }
      this.$emit('input', { id: this.id, secs })
    }
  }
}
</script>
