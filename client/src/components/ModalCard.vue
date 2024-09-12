<template>
    <div class="modal-container" >

        <div class="modal">
            <div class="nav">
                <h2>{{ heading }}</h2>
                <Close @click="toggleModal({})" class="close-icon"/>
            </div>
            <div class="modal-content">
               <ProfileCard :candidate="candidate" />
            </div>
        </div>
    </div>
</template>

<script setup>
 import { Close } from '@vicons/ionicons5'
 import ProfileCard from '../components/homepage/ProfileCard.vue';
 const {heading,candidate,toggleModal} = defineProps(['heading','candidate','toggleModal'])
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
</style>