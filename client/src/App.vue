<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
  },

  created () {
    this.getCurrentUser()
  },

  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  }
}
</script>

<style src="./assets/tailwind.css">
