<template>
  <div>
    <div class="pb-64 bg-gray-800">
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
