<template>
  <div class="section-overlay p-8 mt-12">
    <div class="lighter-bg p-8 text-center">
      <h1 v-if="error.statusCode === 404" class="text-4xl">Nie znaleziono</h1>
      <h1 v-else class="text-4xl">Wystąpił błąd</h1>
      <NuxtLink to="/">Wróć do strony głównej</NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
