<template>
  <div>
    <Divider content="Sklep z produktami" />
    <section class="section-overlay" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">
      <div class="input-box flex flex-col gap-2 items-center">
        <input type="text" class="input-txt" placeholder="Twój nick z gry np. fendziorr" v-model="nick">
        <input type="text" class="input-txt" placeholder="Kod" v-model="code">
        <button class="btn-zrealizuj" @click="useVoucher">Zrealizuj</button>
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
      nick: "",
      code: ""
    }
  },
  methods: {
    async useVoucher(context) {
      const params = {
        headers: {
          'Accept': "application/json, text/plain, */*",
          'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify({ player: this.nick, code: this.code }),
        method: "POST"
      }

      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/vouchers/use/`, params)
        .then((response) => {
          if (!response.ok) {
            this.$toast.error('Niepoprawny voucher')
            throw Error(response.status);
          }
          return response.json()
        })
        .then((data) => {
          this.$toast.success('Voucher został zrealizowany')
        })
        .catch((err) => console.log(err));
    },
  }
}
</script>

<style scoped>
.btn-zrealizuj {
  padding: 0 25px;
  background: var(--primary-color);
  border: none;
  width: 300px;
  height: 50px;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  box-shadow: 6px 6px 10px 4px rgb(80 80 80 / 4%);
}
</style>
