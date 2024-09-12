<template>
  <div class="view-user">
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Personal ID</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><img :src="user.logo?prefixImg+user.logo:prefixImg+'default.png'" alt="user image" class="img" /></td>
          <td>{{ user.name }}</td>
          <td>{{ user.personalId }}</td>
          <td>{{ user.role }}</td>
          <td class="actions">
            <TrashBin class="icon deleteIcon" :onclick="()=>handleDeleteUser(user.id)" />
            <PencilOutline class="icon editIcon" :onclick="()=>handleEditUser(user)" />
          </td>
        </tr>
      </tbody>
    </table>
    
    <EditUser v-if="show" :toggleModal="toggleModal" :updateUser="handleEditUser"  :userInfo="selectedUser"/>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import EditUser from './EditUser.vue'
import {useUserStore} from '../../stores/user'
import {useLoaderStore} from '../../stores/loader'
import {TrashBin,PencilOutline} from '@vicons/ionicons5';
import Swal from 'sweetalert2'
const {getUsers,deleteUser,getAllUsers}=useUserStore()
const {setIsLoading}=useLoaderStore()
const show=ref(false)
const users=ref(getUsers)
const prefixImg=ref('/uploads/')
const selectedUser=ref({})
onMounted(async()=>{
  await  getAllUsers()
  users.value =getUsers
})
    const handleDeleteUser=async(info)=> {
      if(!info){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }     
      setIsLoading(true)
        const result =await deleteUser(info)
        if(result.success){
          setIsLoading(false)
      console.log('User Deleted:', result);
       Swal.fire({
            title: 'successful',
            text:   `User ${result?.data?.name}`,
            icon: 'success',
          
        });
        users.value=users.value.filter((user)=>user.id!==info)
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to delete User',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('deleting failed', result);
      
      }
    }

    const handleEditUser=(data)=>{
      selectedUser.value=data;
      show.value=true;
    }

    const toggleModal=()=>{
      window.location.reload()
      users.value=getUsers
      console.log('hello');
      show.value=false;
      selectedUser.value={}
      }

</script>

<style scoped>
.view-user {
  padding: 20px;
    width: 100%;
  margin: auto;
}
h1{
  text-align: center;
}

table {
  color: white;
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
  flex: 1;
}
tr,td,th{
  display: flex;
  justify-content: start ;
  width: 100%;
}
td{
border: 1px solid rgb(126, 130, 126);
padding:0 5px;
justify-content: center
}
td img{
    width: 100px;
        height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
}
th{
  justify-content: center;
font-weight: bold;
}
td:last-child{
  justify-content: center
}
.icon {
  cursor: pointer;
  width: 20px;
}
.deleteIcon{
color:red;
}
.editIcon{
  color:var(--primary-color)
}

td.actions{
  display: flex;
  justify-content: space-evenly;
  padding: 5px
}

</style>
