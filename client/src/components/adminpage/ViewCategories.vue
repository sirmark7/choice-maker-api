<template>
  <div class="view-user">
    <h1>Categories</h1>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category,i) in categories" :key="category.id">
          <td>{{ i+1 }}</td>
          <td>{{ category.name }}</td>
          <td>
            <TrashBin class="icon" :onclick="()=>handleDeletsCategory(category.id)" />
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue'

import {useCategories} from '../../stores/category'
import {useLoaderStore} from '../../stores/loader'
import {TrashBin} from '@vicons/ionicons5';
import Swal from 'sweetalert2'
const {getcategories,deleteCategory,getAllCategories}=useCategories()
const {setIsLoading}=useLoaderStore()
const categories=ref(getcategories)
onMounted(async()=>{
  await getAllCategories()
  .then(()=>categories.value=getcategories)
})
    const handleDeletsCategory=async(info)=> {
      if(!info){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }     
      setIsLoading(true)
        const result =await deleteCategory(info)
        if(result.success){
          await getAllCategories()
          setIsLoading(false)
      console.log('Category Deleted:', result);
       Swal.fire({
            title: 'successful',
            text:   `Category ${result?.data?.name}`,
            icon: 'success',
          
        });
        categories.value=categories.value.filter((category)=>category.id!==info)
        // categories.value=getcategories
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to delete Category',
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
