<template >
  <div class="candidates">


    <CandidateCard 
    :mode="mode"
    v-for="(candidate, index) in candidates"
    :key="index"
    :index="index"
    :candidate="candidate"
    :toggleModal="toggleModal"
    :handleNext="handleNext"  
    :election="election" 
    />
   

  </div>
 
</template>
<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue';
import CandidateCard from './CandidateCard.vue'
  const windowWidth = ref(window.innerWidth);
    // Update windowWidth when the component is mounted
    onMounted(() => {
      updateWindowWidth();
      window.addEventListener('resize', updateWindowWidth);
    });
    // Remove the event listener when the component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });
    // Function to update windowWidth
    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

 const {candidates,toggleModal,mode,handleNext}=defineProps(['candidates','toggleModal','mode','handleNext'])



</script>
<style lang="css" scoped>
    .candidates{
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      align-items:center;
      gap: 2rem;
       flex: 1;
        padding: 10px 20px;
        align-content: center;
        scroll-behavior: smooth;
        box-shadow: -1px -1px 4px 2px #f1f1f1;
    }
   
    @media screen and (min-width:700px) {
  nav{
    max-width: 1080px;
    justify-content: space-between;
    padding: 1rem;
}
.candidates{
  width: 100%;
  grid-template-columns: 1fr 1fr;
}

  }
</style>