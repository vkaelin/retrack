<template>
  <div class="flex flex-col items-center justify-center w-full min-h-screen bg-gray-800">
    <h1 class="text-xl font-semibold text-white">Homepage</h1>
    <div class="flex items-baseline mt-4">
      <router-link
        :to="{ name: 'login' }"
        class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >Login</router-link>
      <router-link
        :to="{ name: 'register' }"
        class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >Register</router-link>
    </div>
  </div>
</template>
