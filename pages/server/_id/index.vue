<template>
  <div>
    <Divider content="Produkty do kupna" :negativeMargin="false"></Divider>
    <div class="servers">
      <span v-if="$store.state.products.length === 0 && $store.state.server.name" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">Wybrany serwer nie posiada żadnych
        produktów.</span>
      <div class="server-item server-link" v-for="product in $store.state.products" v-bind:key="product.id"
        data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">
        <img v-if="product.image" :src="product.image" alt="Zdjęcie produktu" width="200" height="200"
          class="server-item-image h-52">
        <span class="server-item-name">{{ product.name }}</span>
        <p class="light-text text-sm mw-full break-word"
          v-bind:class="{ 'mt-6': $config.showProductName, 'mt-2': !$config.showProductName }"
          v-if="product.short_description">{{ product.short_description }}</p>
        <div class="server-item-price" v-if="product.main_price">
          <span class="text-xl" :class="{ 'line-through light-text': product.promo }">{{ product.main_price }}
            PLN</span>
          <span class="text-primary text-xl" v-if="product.promo">{{ $price.calcPrice(product.main_price, product.promo)
            }} PLN </span>
        </div>
        <a :href="'product/' + product.id" class="btn-buy flex items-center justify-center relative">
          Przejdź do zakupu
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none" class="ml-3">
            <path d="M1 6H12M12 6L6.80556 1M12 6L6.80556 11" stroke="#ECECEC" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <div v-if="product.promo" class="absolute -top-4 -right-4 promo-indicator">
            -{{ product.promo }}%
          </div>
        </a>
      </div>
    </div>
    <div v-if="$store.state.shop.monthly_goal_public !== null">
      <Divider content="Cel serwera" :negativeMargin="false"></Divider>
      <div class="lighter-bg p-8 flex justify-between" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="300">
        <div class="monthly-goal-layer w-full">
          <div class="section-overlay" :style='`width: ` + $store.state.shop.monthly_goal_public + `%;`'
            v-bind:class="{ 'p-4': $store.state.shop.monthly_goal_public > 0 }">
          </div>
        </div>
        <span class="ml-8">{{ Math.ceil($store.state.shop.monthly_goal_public) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: { Divider },
  data: function () {
    return {
      announcements: []
    }
  },
  async created() {
    await this.$store.dispatch('loadServer', this.$route.params.id)
    await this.$store.dispatch('loadProducts', this.$route.params.id)
    await this.loadAnnouncements()
  },
  methods: {
    async loadAnnouncements(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`)
        .then((response) => response.json())
        .then((data) => {
          this.announcements = data
        })
        .catch((err) => console.error(err));
    },
  }
}
</script>

<style scoped>
.server-item {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: max-content;

  background: white;
  box-shadow: 6px 6px 10px 4px rgb(80 80 80 / 7%);
  border-radius: 10px;
  padding: 15px;
}

.server-item-image {
  background: #D9D9D9;
  outline: none;
  width: 100%;
  border-radius: 10px;
}

.server-item-name {
  font-size: 25px;
  font-weight: 700;
}

.server-item-price span {
  font-size: 20px;
}

.product-link:hover {
  cursor: pointer;
}

.promo-indicator {
  border-radius: 10px;
  background: rgba(94, 230, 72, 0.25);
  color: #5EE648;
  text-align: center;
  font-size: 20px;
  padding: 5px 24px 5px 24px;
}

.monthly-goal-layer {
  border-radius: 10px;
  background: #222;
}
</style>
