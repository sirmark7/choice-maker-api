<template>
 <div class="container" autofocus>
    <div class="profile-page">
    <img class="profile-img" :src="`/images/${candidate?.img}`" :alt="candidate?.student?.name">
    <h1>{{candidate?.student?.name}}</h1>
    <div class="profile-details">
      <span>
        <h2>Biography</h2>
        <p>{{ candidate?.manifesto }}</p>
      </span>
      <span>
        <h3>Policies</h3>
        <ul class="policies">
          <li v-for="(policy,i) in candidate?.policies?.split('-')" :key="i" >{{ policy }}</li>
        </ul>
      </span>
      </div>
 
  </div>
</div>
  </template>
  <script setup>
//   onMounted(()=>{
// profile.value=candidateList.find((candidate)=>candidate.name==route.params.id)
//   })
const {candidate} =defineProps(['candidate'])
  
  </script>
  <style lang="css" scoped>
  h1{
    font-size: 20px;
  }
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-page{
    max-width: 500px;
    /* min-height: 500px; */
    height: fit-content;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    gap: 12px;
    color: var(--secondary-color);
  }
h2, h3{
  text-decoration: underline;
  font-size: 18px;
  width: 100%;
  text-align: left;

}
  .profile-page::after{
    position: absolute;
    top: 0;
    left: 0;
    border-bottom-left-radius:30% ;
    border-bottom-right-radius: 30%;
    content: '';
    height: 10vh;
    width: 100%;
    background: #22a148;
  }
.candidate-nav{
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  height: 50px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 500;
  z-index: 10;
  width: 100%;
  cursor: pointer;
   font-size: 12px;

}
.candidate-nav:hover{
  color: rgb(60, 58, 58);
}
.profile-img{
  z-index: 10;
  border-radius: 100%;
  height: 100px;
  width: 100px;
}

.back-icon {
  height: 20px;
  font-weight: 800;
}

.profile-details{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 2rem;
}

.policies{
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  gap: 20px;
}

</style>
  