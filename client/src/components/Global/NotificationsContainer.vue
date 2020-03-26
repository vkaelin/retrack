<template>
  <div class="fixed inset-0 z-40 px-4 py-6 pointer-events-none sm:p-6 sm:-mt-2">
    <transition-group
      enter-active-class="transform ease-out duration-300 transition"
      enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      class="w-full h-full flex flex-col items-end justify-end sm:justify-start"
    >
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import Notification from '@/components/Global/Notification.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Notification
  },
  computed: {
    ...mapState('notification', ['notifications'])
  }
}
</script>
