<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">
          <router-link
            :to="{name: 'invoices'}"
            class="text-indigo-500 hover:text-indigo-400"
          >Invoices /</router-link>
          Invoice {{ $route.params.id }}
        </h2>
        <button
          class="bg-indigo-500 px-6 py-3 text-white font-medium leading-6 rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out"
        >Edit invoice</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-4 py-6 sm:px-6">
        <p>Edit page of the Invoice # {{ $route.params.id }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {

}
</script>