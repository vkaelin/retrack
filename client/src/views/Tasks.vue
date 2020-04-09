<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-9 text-white">Tasks</h2>
      </div>
    </header>
    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
        <div>Page tasks</div>
        <div v-for="i in 50" :key="i">a</div>
      </div>
    </div>
  </main>
</template>
