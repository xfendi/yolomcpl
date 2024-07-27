<template>
  <div>
    <Divider content="Zakup usługę" />
    <section class="section-overlay section-payment">

      <div class="payment-container">

        <div class="payment-left flex flex-col gap-2" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200">

          <div class="payment-left-image input-box">
            <div v-if="product.name" class="text-4xl">{{ product.name }}</div>
            <img v-if="product.image" :src="product.image" alt="Zdjęcie produktu" width="200" height="200">
          </div>

          <div class="payment-left-description input-box">
            <div v-html="product.description" class="product-description"></div>
          </div>

          <div class="payment-left-promocode input-box flex gap-2">
            <input type="text" class="input-txt" name="nick" id="nick" placeholder="Kod rabatowy"
              v-model="promoCode.code" :disabled="Boolean(product.promo)">
            <button class="gradient-button" v-if="promoCode.code && !promoCode.discount"
              @click="usePromoCode()">Zastosuj</button>
          </div>

        </div>

        <div class="payment-right  flex flex-col gap-2" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="300">

          <div class="payment-right-inputs input-box flex flex-col gap-2">

            <div class="payment-right-inputs-top flex flex-col gap-2">

              <input type="text" class="input-txt" name="nick" id="nick" placeholder="Twój nick w grze np. fendziorr"
                v-model="playerName" min="3" maxlength="16">
              <input type="text" class="input-txt" name="kod SMS" id="smsCode" placeholder="Kod SMS" v-model="smsCode"
                v-if="isSms(paymentMethod)">
              <div v-if="product.slider" class="input-txt payment-right-inputs-top-slide">
                <div class="form-label">{{ quantity }}</div>
                <input type="range" class="range w-full" id="quantity" v-model="quantity" :min="product.slider_min"
                  :max="product.slider_max">
              </div>

            </div>

            <div class="payment-right-inputs-bottom" role="group">
              <div v-for="provider in filterProviders()" :key="provider.id">
                <input @click="paymentMethod = provider.provider" type="radio" class="btn-check hidden peer"
                  name="btnradio" :id="provider.id" :disabled="!$store.state.shop.online">
                <label class="check-btn" :for="provider.id" v-if="!provider.is_sms">{{ provider.name }} {{
                  $price.calcPrice(product.prices[provider.provider], product.promo, quantity) }} PLN</label>
                <label class="check-btn" :for="provider.id" v-else>{{ provider.name }} {{ getSmsPrice(provider,
                  product.prices[provider.provider]).price}} PLN</label>
              </div>
            </div>

          </div>

          <div class="payment-right-confirm input-box flex flex-col gap-2">

            <div class="flex gap-2" v-if="$store.state.shop.rules">
              <div class="checkbox-wrapper-12">
                <div class="cbx">
                  <input type="checkbox" v-model="acceptedRules" id="cbx-12 acceptRulesCheckbox" />
                  <label for="cbx-12"></label>
                  <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
              </div>
              <label class="payment-right-confirm-rules-label" for="acceptRulesCheckbox">Akceptuję <a
                  :href="$store.state.shop.rules" target="_blank"
                  class="payment-right-confirm-rules-label-link">regulamin</a> płatności oraz jednocześnie potwierdzam
                poprawność podanego nicku, wybranego trybu, oraz cenę usługi.</label>
            </div>

            <button class="gradient-button" @click="buyProduct()" :disabled="!$store.state.shop.online">Kup teraz</button>

          </div>

        </div>

      </div>

      <div class="xl:m-4 m-0 flex flex-wrap  justify-center">
        <div class="flex flex-col xl:w-1/4 pr-4 pl-4 w-full">

          <div class="flex flex-col mt-3">
            <div v-if="paymentMethod === 'hotpay_sms'" class="mb-4">
              Wyślij SMS o treści <b>{{ getSmsPrice(getProvider(paymentMethod),
                product.prices[paymentMethod]).sms_content }}</b> na numer <b>{{ getSmsPrice(getProvider(paymentMethod),
                  product.prices[paymentMethod]).number }}</b>.
              Koszt SMSa wynosi <b>{{ getSmsPrice(getProvider(paymentMethod), product.prices[paymentMethod]).price
                }}</b>
              PLN brutto.
            </div>
            <div v-else-if="isSms(paymentMethod)" class="mb-4">
              Wyślij SMS o treści <b>{{ getProvider(paymentMethod).sms_content }}</b> na numer
              <b>{{ getSmsPrice(getProvider(paymentMethod), product.prices[paymentMethod]).number }}</b>.
              Koszt SMSa wynosi <b>{{ getSmsPrice(getProvider(paymentMethod), product.prices[paymentMethod]).price
                }}</b>
              PLN brutto.
            </div>
          </div>
        </div>
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
      product: {},
      promoCode: {},
      providers: [],
      acceptedRules: true,
      quantity: 1,
      paymentMethod: "",
      playerName: "",
      smsCode: ""
    }
  },
  async mounted() {
    await this.loadProduct()
    await this.getProviders()
    if (this.$store.state.shop.rules) {
      this.acceptedRules = false
    }
  },
  methods: {
    async getProviders() {
      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/payments/`)
        .then((response) => response.json())
        .then((data) => {
          this.providers = data
          if (this.providers.length == 1) {
            this.paymentMethod = this.providers[0].provider
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async loadProduct(context) {
      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/${this.$route.params.product_id}/`)
        .then((response) => {
          if (!response.ok) {
            $nuxt.context.error({
              status: 404,
              message: 'Produkt nie został znaleziony',
            })
          }
          return response.json()
        })
        .then((data) => {
          this.product = data
          if (this.product.slider) {
            this.quantity = this.product.slider_min
          }
        })
        .catch((err) => console.log(err));
    },

    usePromoCode() {
      let params = {
        headers: {
          'Accept': "application/json, text/plain, */*",
          'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify({ code: this.promoCode.code, product: this.product.id }),
        method: "POST"
      }

      return fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/codes/use/`, params)
        .then((response) => {
          if (!response.ok) {
            console.log(response.json())
            this.$toast.error('Niepoprawny kod rabatowy')
            throw Error(response.status);
          }
          return response.json()
        })
        .then((data) => {
          this.promoCode = data
          this.product.promo = this.promoCode.discount
          this.$toast.success(`Zastosowano kod rabatowy ${this.product.promo}%`)
        })
        .catch((err) => console.log(err));
    },

    async buyProduct() {
      if (!this.playerName) {
        this.$toast.error('Uzupełnij nick gracza')
        return
      } else if (!this.paymentMethod) {
        this.$toast.error('Wybierz metodę płatności')
        return
      } else if (!this.acceptedRules) {
        this.$toast.error('Musisz zaakceptować regulamin')
        return
      }

      let data = {
        player: this.playerName,
        sms_code: this.smsCode,
        provider: this.paymentMethod,
        quantity: parseInt(this.quantity),
        shop: this.$route.params.shopId,
        success_page: window.location.origin + '/payment/{PAYMENT_ID}'
      }
      if (this.promoCode.id) {
        data.promo_code = this.promoCode.code
      }

      const params = {
        headers: {
          'Accept': "application/json, text/plain, */*",
          'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify(data),
        method: "POST"
      }

      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/${this.$route.params.product_id}/payments/`, params)
        .then(r => r.json().then(data => ({ status: r.ok, body: data })))
        .then((data) => {
          if (!data.status) {
            const err = data.body[Object.keys(data.body)[0]]
            if (typeof err === 'object') {
              this.$toast.error(err[0])
            } else {
              this.$toast.error(err)
            }
            console.log(data.body)
            return
          }

          if (!this.isSms(this.paymentMethod)) {
            if (!data.body.payment_url) {
              console.log(data.body)
              this.$toast.error('Nie udało się wygenerować transakcji')
              return
            }
            window.location = data.body.payment_url
          } else {
            window.location = window.location.origin + '/payment/' + data.body.id
          }
        })
        .catch((err) => {
          this.$toast.error(err[0])
          console.log(err)
        });
    },

    filterProviders() {
      let goodProviders = []
      for (let index = 0; this.providers && index < this.providers.length; ++index) {
        const provider = this.providers[index]
        if (this.product.prices[provider.provider] != null) {
          goodProviders.push(provider)
        }
      }
      return goodProviders
    },

    getSmsPrice(provider, smsId) {
      for (let index = 0; provider.sms_numbers && index < provider.sms_numbers.length; ++index) {
        const smsNumber = provider.sms_numbers[index]
        if (smsNumber.id === smsId) {
          return smsNumber
        }
      }
      return { price: -1, number: -1, sms_content: 'error' }
    },

    getProvider(providerType) {
      for (let index = 0; this.providers && index < this.providers.length; ++index) {
        const provider = this.providers[index]
        if (provider.provider === providerType) {
          return provider
        }
      }
    },

    isSms(provider) {
      return provider.split('_').pop() === 'sms'
    }
  }
}
</script>

<style scoped>
.payment-left {
  text-align: center;
  width: 32%;
}

.payment-right {
  width: 66.1%;
}

@media screen and (max-width: 1000px) {
  .payment-container {
    flex-direction: column;
  }

  .payment-right,
  .payment-left {
    width: 100%;
  }
}

.payment-container {
  display: flex;
  justify-content: center;
  width: 100%;
  row-gap: 20px;
  column-gap: 20px;
}

.check-btn {
  display: block;
  background: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-align: center;
  transition: .2s;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 25px;
  padding-left: 25px;
}

.check-btn:hover {
  cursor: pointer;
  color: white;
  background: var(--primary-color);
}

.gradient-button {
  padding: 10px;
  color: white;
  background: var(--primary-color);
  border-radius: 10px;
  text-align: center;
  transition: .2s;
  width: 100%;
}

input:disabled,
button:disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: var(--primary-color);
}

.range {
  margin-right: 15px;
  width: 200px;
  height: 7px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background: #ffffff;
  background-repeat: no-repeat;
}

input[type="radio"]:checked~label {
  color: white;
  background: var(--primary-color);
}

.payment-right-confirm-rules-label {
  font-size: 15px;
  font-weight: 400;
}

.payment-right-confirm-rules-label-link {
  color: var(--primary-color);
}

.payment-right-inputs-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #D9D9D9;
  box-shadow: 6px 6px 10px 4px rgb(80 80 80 / 7%);
  border-radius: 10px;
}

.payment-left-image {
  text-align: center;
}

.payment-left-image img {
  margin-left: auto;
  margin-right: auto;
}

.form-label {
  font-weight: 500;
}

input[type="range"] {
  width: 100%;
}

.product-description {
  width: 50%;
}

.section-payment {
  width: 90%;
  margin: auto;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  width: 100%;
}

/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  background-color: white;
  border-radius: 0.5rem;
  height: 1rem;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Override default look */
  appearance: none;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: 3px solid var(--primary-color);
  outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: #add8e6;
  border-radius: 0.5rem;
  height: 1.5rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  background-color: var(--primary-color);
  border: none;
  /*Removes extra border that FF applies*/
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-moz-range-thumb {
  outline: 3px solid var(--primary-color);
  outline-offset: 0.125rem;
}

.payment-left-description {
  font-size: 16px;
  font-weight: 500;
}
.payment-left-description div {
  margin: auto;
}
</style>

<style>
.checkbox-wrapper-12 {
  position: relative;
}

.checkbox-wrapper-12>svg {
  position: absolute;
  top: -130%;
  left: -170%;
  width: 110px;
  pointer-events: none;
}

.checkbox-wrapper-12 * {
  box-sizing: border-box;
}

.checkbox-wrapper-12 input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
}

.checkbox-wrapper-12 input[type="checkbox"]:focus {
  outline: 0;
}

.checkbox-wrapper-12 .cbx {
  width: 24px;
  height: 24px;
  top: calc(50vh - 12px);
  left: calc(50vw - 12px);
}

.checkbox-wrapper-12 .cbx input {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #bfbfc0;
  border-radius: 50%;
}

.checkbox-wrapper-12 .cbx label {
  width: 24px;
  height: 24px;
  background: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-filter: url("#goo-12");
  filter: url("#goo-12");
  transform: trasnlate3d(0, 0, 0);
  pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg {
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 1;
  pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg path {
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 19;
  stroke-dashoffset: 19;
  transition: stroke-dashoffset 0.3s ease;
  transition-delay: 0.2s;
}

.checkbox-wrapper-12 .cbx input:checked+label {
  animation: splash-12 0.6s ease forwards;
}

.checkbox-wrapper-12 .cbx input:checked+label+svg path {
  stroke-dashoffset: 0;
}

@-moz-keyframes splash-12 {
  40% {
    background: var(--primary-color);
    box-shadow: 0 -18px 0 -8px var(--primary-color), 16px -8px 0 -8px var(--primary-color), 16px 8px 0 -8px var(--primary-color), 0 18px 0 -8px var(--primary-color), -16px 8px 0 -8px var(--primary-color), -16px -8px 0 -8px var(--primary-color);
  }

  100% {
    background: var(--primary-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@-webkit-keyframes splash-12 {
  40% {
    background: var(--primary-color);
    box-shadow: 0 -18px 0 -8px var(--primary-color), 16px -8px 0 -8px var(--primary-color), 16px 8px 0 -8px var(--primary-color), 0 18px 0 -8px var(--primary-color), -16px 8px 0 -8px var(--primary-color), -16px -8px 0 -8px var(--primary-color);
  }

  100% {
    background: var(--primary-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@-o-keyframes splash-12 {
  40% {
    background: var(--primary-color);
    box-shadow: 0 -18px 0 -8px var(--primary-color), 16px -8px 0 -8px var(--primary-color), 16px 8px 0 -8px var(--primary-color), 0 18px 0 -8px var(--primary-color), -16px 8px 0 -8px var(--primary-color), -16px -8px 0 -8px var(--primary-color);
  }

  100% {
    background: var(--primary-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@keyframes splash-12 {
  40% {
    background: var(--primary-color);
    box-shadow: 0 -18px 0 -8px var(--primary-color), 16px -8px 0 -8px var(--primary-color), 16px 8px 0 -8px var(--primary-color), 0 18px 0 -8px var(--primary-color), -16px 8px 0 -8px var(--primary-color), -16px -8px 0 -8px var(--primary-color);
  }

  100% {
    background: var(--primary-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
</style>
