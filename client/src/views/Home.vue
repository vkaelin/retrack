<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center bg-gray-800">
    <h1 class="text-xl text-white font-semibold">Homepage</h1>
    <div class="mt-4 flex items-baseline">
      <router-link
        :to="{ name: 'login' }"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >Login</router-link>
      <router-link
        :to="{ name: 'register' }"
        class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >Register</router-link>
    </div>
  </div>
</template>
