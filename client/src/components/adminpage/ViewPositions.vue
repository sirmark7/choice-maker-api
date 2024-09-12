<template>
  <div class="view-user">
    <h1>Positions</h1>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(position,i) in positions&&positions" :key="position.id">
          <td>{{ i+1 }}</td>
          <td>{{ position?.name }}</td>
          <td>{{ position?.category?.name }}</td>
          <td>
            <TrashBin class="icon" :onclick="()=>handleDeletePosition(position.id)" />
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'

import {usePositions} from '../../stores/position'
import {useLoaderStore} from '../../stores/loader'
import {TrashBin} from '@vicons/ionicons5';
import Swal from 'sweetalert2'
const {getpositions,deletePosition,getAllPositions}=usePositions()
const {setIsLoading}=useLoaderStore()
const positions=ref(getpositions)
onMounted(async()=>{
  await getAllPositions()
  positions.value =getpositions
})
    const handleDeletePosition=async(info)=> {
      if(!info){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }     
      setIsLoading(true)
        const result =await deletePosition(info)
        if(result.success){
          await getAllPositions()
          setIsLoading(false)
      console.log('Position Deleted:', result);
       Swal.fire({
            title: 'successful',
            text:   `Position ${result?.data?.name}`,
            icon: 'success',
          
        });
        positions.value=positions.value.filter((position)=>position.id!==info)
        // positions.value=getpositions
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to delete Position',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('deleting failed', result);
      
      }
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
th{
  justify-content: center;
font-weight: bold;
}
td:last-child{
  justify-content: center
}
.icon {
  cursor: pointer;
  color:red;
  width: 20px;
}

</style>
