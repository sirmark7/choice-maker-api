<template>
  <section class="main-container auth">
    <h2>ChoiceMaker</h2>
    <router-view />
    <LoaderModal v-show="loading"/>
  </section>
</template>
<script setup>
import LoaderModal from '../components/LoaderModal.vue'
import {ref,onMounted} from 'vue'
import {useLoaderStore} from '../stores/loader'
const {getLoading}=useLoaderStore()
const loading=ref(getLoading)
onMounted(()=>{
  loading.value=getLoading
})
</script>

<style lang="css" scoped>
.auth h2{
  position: absolute;
    top: 20%;
    left:50%;
    font-size: 2rem;
    transform: translateX(-50%);
}
</style>
