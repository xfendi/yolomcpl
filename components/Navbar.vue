<template>
  <nav class="navbar justify-center container-padrem">
    <div class="flex items-center justify-between" v-bind:class="{ 'flex-row': !showMenu, 'flex-col': showMenu }">
      <nuxt-link to="/" class="flex items-center">
        <img :src="$store.state.shop.logo" alt="Logo serwera" width="77" height="77">
      </nuxt-link>
      <div class="flex items-center justify-center">
        <div v-bind:class="{ 'hidden': !showMenu, 'flex flex-col': showMenu }" class="w-full lg:block lg:w-auto"
          id="navbar-default">
          <ul class="flex items-center align-center flex-col lg:flex-row">
            <li class="mr-0 lg:mr-12" v-if="$store.state.shop.home_link">
              <nuxt-link to="/" class="nav-link">Strona główna</nuxt-link>
            </li>
            <li v-for="navElement in $store.state.shop.navigation" v-bind:key="navElement.id" class="mr-0 lg:mr-12">
              <nuxt-link :to="'/subpage/' + navElement.subpage" v-if="navElement.subpage"
                class="nav-link">{{ navElement.name }}</nuxt-link>
              <a :href="navElement.url" v-else class="nav-link">{{ navElement.name }}</a>
            </li>
            <li class="nav-item">
              <nuxt-link to="/voucher" class="nav-link">Voucher</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-bind:class="{ 'hidden': !showMenu, 'flex justify-center my-3': showMenu }"
        class="w-full lg:flex lg:w-auto gap-3" id="navbar-default">
        <a v-for="icon in this.$config.socialMedia" :href="icon.link" :key="icon.name">
          <img :src="icon.icon" :alt="icon.name" class="h-4 px-2">
        </a>
      </div>
      <button @click="toggleNavbar" data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Otwórz menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
      console.log(this.showMenu)
    }
  }
}
</script>

<style>
.navbar {
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
}

.nav-link {
  color: #808080;
  font-family: "Titillium Web";
}

.nuxt-link-exact-active,
.nav-link:hover {
  color: #000 !important;
}
</style>