<template>
  <div>
    <div class="bg-gray-800 pb-32">
      <Navbar />
      <header class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl leading-9 font-bold text-white">Dashboard</h2>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <!-- <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </div>-->
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <slot />
        </div>
        <!-- /End replace -->
      </div>
    </main>
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
