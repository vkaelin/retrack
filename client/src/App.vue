<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Default from '@/layouts/Default.vue'
import Visitor from '@/layouts/Visitor.vue'

export default {
  components: {
    Default,
    Visitor
  },

  computed: {
    layout () {
      return this.$route.name ? (this.$route.meta.layout || 'Default') : null
    }
  }
}
</script>

<style src="./assets/css/main.css">
