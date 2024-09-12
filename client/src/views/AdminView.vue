<template>
  <div class="container">
    
    <header>
        <h1>Choise Maker</h1>
        <div class="profile">
            <img src="/images/admin-avatar.jpeg" alt="admin avatar">
            <span>{{ name }}</span>
        </div>

    </header>

    <div class="main_side">
        <nav class="sidebar">

            <RouterLink class="side-nav " :class="{active: $route.path === navItem.link }" v-for="navItem in navItems" :key="navItem.name"   :to="navItem.link"  >
                    {{ navItem.name }}
            </RouterLink>
            
            <button class="log-out btn side-nav" @click="handleLogout">
                    Log Out
            </button>
        </nav>

        <div class="display" >
             <router-view />
        </div>
    </div>
     <LoaderModal v-show="loading"/>
  </div>
</template>

<script setup>
// import { defineComponent } from '@vue/composition-api';
import { useAuthStore } from '../stores/auth';
import {useElections} from '../stores/elections'
import {useVotes} from '../stores/votes'
import {useCandidates} from '../stores/candidates'
import {usePositions} from '../stores/position'
import {useUserStore} from '../stores/user'
import {useLoaderStore} from '../stores/loader'
import {useCategories} from '../stores/category'
import LoaderModal from '../components/LoaderModal.vue'
import Swal from 'sweetalert2';
import {useRouter} from 'vue-router'
import {ref,onMounted} from 'vue'
const {logout}=useAuthStore()
const {getAllCategories}=useCategories()
const {getAllElections}=useElections()
const {getAllCandidates,getAllCandidatesVotes}=useCandidates()
const {getAllPositions}=usePositions()
const { getAllUsers}=useUserStore()
const {setIsLoading,getLoading}=useLoaderStore()
const {getAllVotes}=useVotes()
const name=ref()
const loading=ref(getLoading)

onMounted(async()=>{
    setIsLoading(true)
    name.value=JSON.parse(localStorage.getItem('userInfo'))?.name
    await getAllElections()
    await getAllCandidates()
    await getAllCandidatesVotes()
    await getAllCategories()
    await getAllPositions()
    await  getAllUsers()
    await getAllVotes()
    setIsLoading(false)
})


const router =useRouter()


const navItems = [
    {link:'/admin',name:'Dashboard'},
    {link:'/admin/view-election', name:'View Elections'},
    {link:'/admin/add-election', name:'Create Elections'},
    {link:'/admin/add-candidate', name:'Add Candidates'},
    {link:'/admin/view-positions', name:'View Positions'},
    {link:'/admin/add-positions', name:'Create Positions'},
    {link:'/admin/view-categories', name:'View Categories'},
    {link:'/admin/add-categories', name:'Create Categories'},
    {link:'/admin/view-user', name:'View User'},
    {link:'/admin/create-user', name:'Create User'}
    ]

const handleLogout=async()=>{
    await logout()
    Swal.fire({
            title: 'Log Out  Success full',
            text:   `Good Bye`,
            icon: 'success',
        });
        
    router.push('/auth/admin')
}
</script>

<style lang="css" scoped>
.container{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    width: 100%;
    /* overflow-y: hidden; */
    
    flex-direction: column;
    padding: 10px 20px;
}

.container header{
background: #24904d;
width: 100%;
border-bottom: 2px solid #f1f1f1;
padding: 5px 10px;
display: flex;
justify-content: space-between;
align-items: center;
}

h1{
    color: var(--secondary-color);
   font-size: 1.5rem;
   
} 
.profile{
    display: flex;
    align-items: center;
    gap: 10px;
    color: #f1f1f1;
}

.profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}



.main_side{
    background: #924646;
    height: 100%;
    display: flex;
    width: 100%;
    justify-content: flex-start;
}


.sidebar{
    position: relative;
    background: #d2cdcd;
    height: 100%;
    min-width: 200px;
    border-right: 2px solid #f1f1f1;
    padding: 5px ;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-top: 20px;
}
.sidebar.mini{
    width: fit-content;
}

.side-nav{
    background: #a98c8c;
    width: 100%;

    list-style: none;
    padding: 5px;
    border: 2px solid var(--secondary-color);
    border-radius: 5px;
    background: var(--primary-light); 
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
}
.side-nav:hover {
    background:var(--primary-color);
    color: var(--secondary-color);
}

.log-out{
    position: absolute;
    bottom: 20px;
    width: 95%;
}
.active.side-nav{
    background:var(--primary-color);
    color: var(--secondary-color);
}

.display{
    background: #802247;
    flex: 1;
    height: calc(100vh - 70px);
    width: 100%;
    overflow-y: scroll;
}

</style>
