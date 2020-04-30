<template>
  <input ref="dateTimePicker" class="text-right w-28 invisible-input" type="text" readonly />
</template>

<script>
import Flatpickr from 'flatpickr'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    hasTime: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dateTimePicker: null
    }
  },

  mounted () {
    this.dateTimePicker = new Flatpickr(this.$refs.dateTimePicker, {
      enableTime: this.hasTime,
      time_24hr: true,
      altFormat: this.hasTime ? 'd.m.Y H:i' : 'd.m.Y',
      altInput: true,
      defaultDate: this.value,
      onChange: (_, date) => {
        this.$emit('input', date)
      }
    })
  },

  beforeDestroy () {
    if (this.dateTimePicker) {
      this.dateTimePicker = null
    }
  }
}
</script>
