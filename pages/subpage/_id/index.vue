<template>
  <div>
    <Divider content="Regulamin" />
    <section class="subpage section-overlay" data-aos="fade-up" data-aos-easing="ease-out-back" data-aos-delay="200" >
      <div class="subpage-text" v-html="$store.state.subpage.content"> </div>
    </section>
  </div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: { Divider },
  mounted() {
    this.$store.dispatch('loadSubpage', this.$route.params.id)
  }
}
</script>

<style>
.subpage-text h1 {
  font-size: 44px;
}
.subpage-text h2 {
  font-size: 33px;
}
.subpage-text h3 {
  font-size: 22px;
}
.subpage-text a {
  color: blue;
  text-decoration: underline;
}
.subpage {
  border: none;
  background: white;
  width: 100%;
  box-shadow: 6px 6px 10px 4px rgb(80 80 80 / 7%);
  border-radius: 10px;
  padding: 10px;
}
.subpage-text {
  width: 100%;
}
</style>