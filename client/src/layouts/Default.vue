<template>
  <div>
    <div class="bg-gray-800 pb-64">
      <Navbar />
    </div>
    <slot/>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>
