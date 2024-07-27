<template>
  <div>
    <Navbar />
    <div :style="cssVars" class="container-fluid container-padrem" data-aos-easing="ease-out-back" data-aos-delay="100" >
      <component :is="`style`">::-webkit-scrollbar-thumb {
        background-color: {{ this.$config.primaryColor }};
        outline: none;
        border-radius: 5px;
        }</component>
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar, Footer
  },
  computed: {
    cssVars() {
      return {
        '--primary-color': this.$config.primaryColor,
        '--gradient-color': this.$config.gradientColor
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: block !important;
  background: #252525;
  width: 5px;
}

.titillium {
  font-family: "Titillium Web";
}

.products,
.richest-players,
.latest-payments,
.monthly-goal,
.subpage {
  border-radius: 10px;
  background-blend-mode: multiply;
}
</style>
