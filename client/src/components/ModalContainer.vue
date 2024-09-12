<template>
    <div class="modal-container" >

        <div class="modal">
            <div class="nav">
                <h2>{{ heading }}</h2>
                <Close @click="toggleModal({})" class="close-icon"/>
            </div>
            <div class="modal-content">
                <ul >
                    <li v-for="candidate in candidates" :key="candidate.id" :on-click="()=>handleShowModal(candidate)">
                    {{ candidate?.student?.name }} : {{ candidate?.voteCount}} votes
                    </li>
                </ul>
                <p v-show="!candidates.length" >No Candidates </p>
                
            </div>
        </div>
    </div>
</template>

<script setup>
 import { Close } from '@vicons/ionicons5'

console.log(candidates);

const {heading,candidates,toggleModal} = defineProps(['heading','candidates','toggleModal'])
</script>

<style lang="css" scoped>
 
.modal-container{
     position: fixed;
     display: flex;
     justify-content: center;
     align-items: center;
     height:100dvh;
     width: 100vw;   
     z-index: 999999;
     top: 0;
    left: 0;
    background-color: rgba(1, 1, 1, 0.695);
}

.modal{
    position: relative;
    width: 50%;
    height:80vh ;
    background: var(--primary-color);
    overflow-y: scroll;
    scroll-behavior: smooth;
    
}

.nav{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 2px solid var(--secondary-color);
    width: 100%; 
    /* height: 40px; */
    font-size: 15px;
 } 

 
.close-icon{
    height: 40px;
    cursor: pointer;
}  
.modal-container ul {
  list-style: none;
  padding: 0;
}

.modal-container li {
  padding: 8px;
  background-color: #f1f3f5;
  margin-bottom: 5px;
  border-radius: 3px;
  cursor: pointer;
}
</style>