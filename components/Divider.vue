<template>
<div class="light-text divider" v-bind:class="{ 'xl:-mt-12 mt-12': negativeMargin, 'mt-10 mb-10': !negativeMargin }" data-aos="fade-up" data-aos-easing="ease-out-back"
data-aos-delay="100" >
  <span class="mx-3 mb-1 titillium">{{content}}</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="20" height="20" viewBox="0 0 12 12" fill="none">
    <path d="M6 1V11V1ZM6 11L11 6.27778L6 11ZM6 11L1 6.27778L6 11Z" fill="#929292"/>
    <path d="M6 1V11M6 11L11 6.27778M6 11L1 6.27778" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
</template>

<script>
export default {
  name: "Divider",
  props: ['content', 'negativeMargin']
}
</script>

<style scoped>
</style>
