<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Tasks</h2>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div>Page tasks</div>
        <div v-for="i in 50" :key="i">a</div>
      </div>
    </div>
  </main>
</template>
