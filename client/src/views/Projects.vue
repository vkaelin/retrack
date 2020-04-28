<template>
  <main class="-mt-64">
    <header class="py-10">
      <div class="flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-9 text-white">Projects</h2>
        <button
          class="btn-primary"
        >Create project</button>
      </div>
    </header>
    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
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
