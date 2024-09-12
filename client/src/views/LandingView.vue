<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

setTimeout(function () {
  router.push('/auth/login')
}, 5000)
</script>

<template>
  <section class="main-container">
    <h1>ChoiceMaker</h1>
  </section>
</template>
<style lang="css" scoped></style>
