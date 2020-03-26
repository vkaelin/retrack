<template>
  <div id="app">
    <NotificationsContainer />
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Default from '@/layouts/Default.vue'
import Visitor from '@/layouts/Visitor.vue'
import NotificationsContainer from '@/components/Global/NotificationsContainer.vue'

export default {
  components: {
    Default,
    Visitor,
    NotificationsContainer
  },

  computed: {
    layout () {
      return this.$route.name ? (this.$route.meta.layout || 'Default') : null
    }
  }
}
</script>

<style src="./assets/css/main.css">
