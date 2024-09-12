<template>
    <header>
        <nav>
           
                <RouterLink to="/home" >
                Choise Maker
                </RouterLink>

                <button class="log-out btn" @click="handleLogout">
                    Log Out
                </button>
           
        </nav>
           <div v-if="show" class="election-nav" >
             <h1 class='btn active' title="election" >{{ electionName?.replace(/_/g,' ') }}</h1>
            <button class='btn' title=" switch SRC Elections"  @click="handleElectionType">Next</button>
            <!-- <button class='btn' title=" switch SRC Elections"  @click="()=>{}">Next</button> -->
           </div>
           <label v-if="show" >Select Candidate for <span>{{ category }} : {{isActive?.position?.replace(/_/g,' ') }}</span></label>
    </header>
</template>
<script setup>

import { useAuthStore } from '../../stores/auth';
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2';
const router =useRouter()
const {logout}=useAuthStore()

const {electionName ,isActive,show,category} =defineProps(['handleElectionType','isActive','show','electionName','category'])


const handleLogout=async()=>{
    await logout()
    Swal.fire({
            title: 'Log Out  Success full',
            text:   `Good Bye`,
            icon: 'success',
        });
    router.push('/auth/login')
}
 
</script>
<style lang="css" scoped>
header{
    position: relative;
    z-index: 999;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 0px;
    background:var(--secondary-color);
    gap: 10px;
}
nav{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    gap: 50px;
    padding: 10px;
    border-radius: 15px 15px 0px 0px;
    background: var(--primary-color);
    border-bottom: 2px solid var(--secondary-color);
}
nav>a{
    color: var(--secondary-color);
}
h1{
   font-size: 1.5rem;
} 
.election-nav{
    max-width: 500px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    padding: 10px;
    background: var(--primary-color);
}

.btn{
    padding: 5px;
    border-radius: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    background: var(--primary-color);
    
    
}
/* nav .btn{color: #615f5f;} */
.btn.active{
    background: var(--secondary-color); 
    color: var(--primary-color);
    text-transform: capitalize;
}
label{
  
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: capitalize;
  
}

label span{
  background-color: var(--primary-light);
  color: var(--secondary-color);
  padding:5px;
}

@media screen and (min-width:700px) {
  nav{
    max-width: 1080px;
    justify-content: space-between;
    padding: 1rem;
}
  }
</style>