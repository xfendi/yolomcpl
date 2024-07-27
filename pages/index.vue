<template>
  <div>
    <section class="intro">
      <div class="intro-container" data-aos="fade-up" data-aos-easing="ease-out-back">
        <div class="intro-container-content">
          <img src="~assets/zagraj.png" class="intro-container-zagraj" alt="" data-aos="fade-up"
            data-aos-easing="ease-out-back">
          <h1 class="intro-container-title daydream" data-aos="fade-up" data-aos-easing="ease-out-back"
            data-aos-delay="100">
            Innowacyjny serwer <br>
            BOXPVP
          </h1>
        </div>
        <div class="intro-container-online" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">
          <div class="online-btn">
            <div :class="{ 'blob green': status, 'blob blob-red': !status }" @click="copy()"></div>
            <div class="online-btn-text">
              <p>&nbsp;yolomc.pl</p>
              <span class="text-gray">{{ players }} / {{ players + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Divider content="Sklep z produktami" />
    <section class="mt-10">
      <div class="servers">
        <nuxt-link :to="'server/' + server.id" class="server-link" v-for="server in $store.state.servers"
          :key="server.id" data-aos-anchor-placement="top-center" data-aos="fade-up" data-aos-easing="ease-out-back"
          data-aos-delay="200">
          <div v-if="server.image" class="server-image">
            <img :src="server.image" :alt="server.name">
          </div>
        </nuxt-link>
      </div>
    </section>
    <Divider content="Top 3 najbogatszych graczy" :negativeMargin="false" v-if="$store.state.shop.richest_player" />
    <section v-if="$store.state.shop.richest_player" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">
      <div class="richest-players">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-2">
          <div v-for="(player, index) in richestPlayer" :key="player.player"
            :class="`relative overflow-hidden px-20 py-32 flex flex-col justify-center items-center richest-player order-` + index + ` gradient-` + index">
            <div class="absolute text-center flex flex-col richest-text text-center">
              <span class="mt-2 text-xl text-black">{{ player.player }}</span>
              <span class="text-center light-text mb">{{ Math.ceil(player.spend) }} PLN</span>
            </div>
            <img :src='`https://mc-heads.net/body/` + player.player + `/right`' :alt="player.player"
              class="h-56 flex self-center absolute richest-player-skin">
          </div>
        </div>
      </div>
    </section>
    <Divider content="Ostatnie zakupy" :negativeMargin="false" v-if="$store.state.shop.latest_payments" />
    <section v-if="$store.state.shop.latest_payments" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">
      <div class="flex p-4 ml-0 mt-4 xl:mt-0 flex-col latest-payments">
        <div class="flex gap-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          <div v-for="player in $store.state.latestPayments" :key="player.player" class="lighter-bg p-4 flex">
            <img :src='`https://minotar.net/helm/` + player.player + `/48`' :alt="player.player"
              class="h-12 mr-4 rounded-xl">
            <div class="flex flex-col truncate">
              <span>{{ player.player }}</span>
              <span class="text-sm light-text">{{ player.product_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Divider content="Cel miesiąca" :negativeMargin="false" v-if="$store.state.shop.monthly_goal_public !== null" />
    <section v-if="$store.state.shop.monthly_goal_public !== null" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="300">
      <div class="lighter-bg p-8 flex justify-between monthly-goal">
        <div class="monthly-goal-layer w-full">
          <div class="bg-monthly-goal" :style='`width: ` + $store.state.shop.monthly_goal_public + `%;`'
            v-bind:class="{ 'p-4': $store.state.shop.monthly_goal_public > 0 }">
          </div>
        </div>
        <span class="ml-8">{{ Math.ceil($store.state.shop.monthly_goal_public) }}%</span>
      </div>
    </section>
  </div>
</template>

<script>
import Divider from '~/components/Divider.vue'

export default {
  name: "index",
  components: { Divider },
  data: function () {
    return {
      players: '?',
      products: [],
      announcements: [],
      product: null,
      selectedServer: this.$store.state.servers[0].id || '',
      richestPlayer: [],
      status: true
    }
  },
  async created() {
    await this.loadStatus()
    await this.loadProducts()
    await this.loadAnnouncements()
    if (this.$store.state.shop.richest_player) {
      await this.loadRichestPlayer()
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$config.address);
      this.$toast.success('Skopiowano adres serwera')
    },
    async loadStatus(context) {
      return await fetch(`https://api.mcsrvstat.us/2/${this.$config.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.online) {
            this.players = 0
            this.status = false
            return
          }
          this.players = data.players.online
        })
        .catch((err) => console.log(err));
    },
    async loadRichestPlayer(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/richest_player/?amount=3`)
        .then((response) => response.json())
        .then((data) => {
          this.richestPlayer = data
        })
        .catch((err) => console.error(err));
    },
    async loadProducts(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/?server=${this.selectedServer}`)
        .then((response) => response.json())
        .then((data) => {
          this.products = data
          this.product = this.products[0]
        })
        .catch((err) => console.error(err));
    },
    async loadAnnouncements(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`)
        .then((response) => response.json())
        .then((data) => {
          this.announcements = data
        })
        .catch((err) => console.error(err));
    },
    selectServer(serverId) {
      this.selectedServer = serverId
      this.loadProducts()
      this.product = null
    },
    buyProduct() {
      document.location = 'https://vishop.pl/pay/' + this.$store.state.shop.id + '/' + this.product.id
    }
  }
}
</script>

<style>
.header-stripes {
  position: absolute;
  top: -670px;
  right: 0;
  width: 2000px;
  z-index: 1;
  height: 2000px;
  overflow: hidden;
}

@keyframes StripesRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.inter-font {
  font-family: 'Inter', sans-serif;
}

.bg-abs {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}

.intro-container {
  background-image: url('~assets/stripes.png');
  background: rgba(195, 0, 255, 0.75);
  background-size: 100%;
  padding: 90px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 20px;
}

.intro-container-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 12px;
  align-items: center;
  justify-content: center;
}

.intro-container-zagraj {
  width: 30vh;
}

.products-list {
  max-height: 31rem;
}

.product-card {
  max-height: 31rem;
}

.server-btn {
  border-radius: 15px;
  color: #929292;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  transition: .3s;
}

.server-btn:hover {
  color: #fff;
}

.server-btn-active {
  background: #3C8527;
  color: #fff;
}

.product {
  border-radius: 15px;
  width: 95%;
  transition: .3s;
}

.product:hover {
  cursor: pointer;
}

.gray-text {
  color: #929292;
}

.product-price {
  background-color: #1E1E1F;
  border-radius: 5px;
}

.gold-1 {
  top: -11px;
  left: -15px;
  transform: rotate(-15deg);
}

.gold-2 {
  top: 55px;
  left: 240px;
  transform: rotate(30deg);
}

.gradient-2 {
  background: linear-gradient(180deg, rgba(99, 157, 82, 0.00) 0%, #583a3a 100%);
}

.gradient-0 {
  background: linear-gradient(180deg, rgba(60, 133, 39, 0.00) 0%, #fffb2d 100%);
}

.gradient-1 {
  background: linear-gradient(180deg, rgba(79, 145, 60, 0.00) 0%, #63aa47 100%);
}

.richest-text {
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}

.richest-player-skin {
  top: 100px;
}

.monthly-goal-layer {
  border-radius: 15px;
  background: #212224;
}

.bg-monthly-goal {
  border-radius: 15px;
  background: linear-gradient(90deg, #639D52 0%, #4F913C 100%);
}

.announcement {
  border-radius: 15px;
  background: rgba(18, 18, 18, 0.15);
}

.richest-player {
  border-radius: 10px;
}

@media (min-width: 1120px) {
  .richest-player:nth-child(1) {
    order: 2 !important;
  }

  .richest-player:nth-child(2) {
    order: 1 !important;
  }

  .richest-player:nth-child(3) {
    order: 3;
  }
}
</style>
