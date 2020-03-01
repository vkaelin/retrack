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
      return (this.$route.meta.layout || 'Default')
    }
  }
}
</script>

<style src="./assets/tailwind.css">
