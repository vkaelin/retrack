<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl leading-9 font-bold text-white">Projects</h2>
        <button
          class="bg-indigo-600 px-6 py-3 text-white font-medium leading-6 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
        >Create project</button>
      </div>
    </header>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="{ 'mt-8': index !== 0 }"
        >
          <span class="font-bold">{{ project.name }}</span>
          <ul class="mt-4">
            <li v-for="task in project.tasks" :key="task.id">
              <span>Task: {{ task.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      projects: []
    }
  },

  async created () {
    const resp = await this.$axios.get('projects').catch(e => console.log(e))
    this.projects = resp.data
  }
}
</script>
