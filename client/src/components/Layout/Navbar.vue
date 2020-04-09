<template>
  <nav @keydown.escape="sideOpen = false" class="bg-gray-800">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="border-b border-gray-700">
        <div class="flex items-center justify-between h-16 px-4 sm:px-0">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="@/assets/img/logo-icon.svg" alt="Logo" />
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10">
                <!-- <router-link
                  :to="{ name: 'tasks' }"
                  class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Tasks</router-link>-->
                <router-link
                  :to="{ name: 'projects' }"
                  class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Projects</router-link>
                <a
                  href="#"
                  class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Clients</a>
                <a
                  href="#"
                  class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Reports</a>
                <router-link
                  :to="{ name: 'invoices' }"
                  class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Invoices</router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <button
                class="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
              >
                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <Dropdown
                class="ml-3"
                btn-classes="rounded-full text-white focus:shadow-solid"
                content-classes="w-48"
              >
                <template v-slot:trigger>
                  <div class="flex items-center max-w-xs text-sm">
                    <img
                      class="w-8 h-8 rounded-full"
                      :src="`https://www.gravatar.com/avatar/${$store.state.auth.currentUser.email_hashed}?d=retro`"
                      alt
                    />
                  </div>
                </template>
                <template>
                  <div class="py-1 bg-white rounded-md shadow-xs">
                    <!-- <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Your Profile</a>-->
                    <router-link
                      :to="{name: 'settings'}"
                      class="block px-4 py-2 text-sm text-gray-700 dropdown-link hover:bg-gray-100"
                    >Settings</router-link>
                    <a
                      @click="logout"
                      class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    >Sign out</a>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="flex -mr-2 md:hidden">
            <button
              @click="sideOpen = !sideOpen"
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  :class="{'hidden': sideOpen, 'inline-flex': !sideOpen }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  :class="{'hidden': !sideOpen, 'inline-flex': sideOpen }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{'block': sideOpen, 'hidden': !sideOpen}"
      class="border-b border-gray-700 md:hidden"
    >
      <div class="px-2 py-3 sm:px-3">
        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
        >Tasks</a>
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >Projects</a>
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >Reports</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">Tom Cook</div>
            <div class="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
          </div>
        </div>
        <div class="px-2 mt-3">
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Your Profile</a>
          <a
            href="#"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Settings</a>
          <a
            @click="logout"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Sign out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Dropdown from '@/components/Common/Dropdown.vue'

export default {
  components: {
    Dropdown
  },

  data () {
    return {
      sideOpen: false
    }
  },

  methods: {
    async logout () {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      } catch (e) { }
    }
  }
}
</script>

<style scoped>
.router-link-active:not(.dropdown-link) {
  @apply bg-gray-900 text-white;
}

.router-link-active:hover:not(.dropdown-link),
.router-link-active:focus:not(.dropdown-link) {
  @apply bg-gray-900;
}
</style>
