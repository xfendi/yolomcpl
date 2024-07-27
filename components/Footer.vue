<template>
  <div class="mt-6 xl:mt-10">
    <footer class="flex items-center justify-center flex-col relative overflow-hidden">
      <div class="flex items-center justify-between w-full pt-6 pb-6">
        <div class="flex items-center">
          <img :src="$store.state.shop.logo" alt="Logo serwera" class="h-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="50" viewBox="0 0 2 50" fill="none" class="mx-2">
            <path
              d="M0 0.999999C0 0.447714 0.447715 0 1 0C1.55228 0 2 0.447715 2 1V49C2 49.5523 1.55228 50 1 50C0.447715 50 0 49.5523 0 49V0.999999Z"
              fill="#262626" />
          </svg>
          <span class="light-text">{{ $config.address }}</span>
        </div>
        <div class="icons">
          <a v-for="icon in this.$config.socialMedia" :href="icon.link" :key="icon.name">
            <img :src="icon.icon" :alt="icon.name" class="h-4 px-2">
          </a>
        </div>
      </div>
      <div class="footer-line" ></div>
      <div class="footer-overlay pt-6 pb-6 flex items-center justify-between w-full">
        <div class="flex justify-start justify-self-start light-text text-xs">
          &copy; {{ new Date().getFullYear() }} {{ $store.state.shop.name }}
        </div>
        <div class="flex justify-center justify-self-center light-text">
          <!-- usunięcie, użycie znacznika rel w linku, zmiana/zmniejszenie widoczności poniższego akapitu będzie złamaniem licencji oraz blokadą sklepu -->
          <!-- zakazana jest również edycja zawartości poniższej linijki, nie można nic dopisywać, podawać się za autora, ani zmieniać -->
          <p class="text-center">Strona jest zasilana przez <a href="https://vishop.pl" class="text-primary">VIshop.pl</a></p>
        </div>
      </div>
      <div class="radial-footer"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.icons {
  display: flex;
  gap: 3px;
}
.footer-line {
  background-color: #e6e6e6;
  width: 100%;
  height: 1px;
}

svg {
  transition: .3s;
  width: 40px;
  height: 40px;
  fill: currentColor;
}

.link-icon:hover>svg {
  fill: #000 !important;
}

.vertical-divider {
  width: 2px;
  height: 160px;
}

.radial-footer {
  border-radius: 400px;
  filter: blur(120px);
  width: 500px;
  height: 100px;
  bottom: -100px;
  left: 50%;
  transform: translate(-50%, 0);
  position: absolute;
  z-index: -22;
}
</style>
