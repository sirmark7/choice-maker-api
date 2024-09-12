<template>
  <div class="create-election">
    <h1>Create Category</h1>
    <form @submit.prevent="handleCreateCategory">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input type="text" id="name" v-model="newCategory.name" required placeholder="Enter category name"/>
      </div>
      <button type="submit">Create Category</button>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import {useCategories} from '../../stores/category'
import {useLoaderStore} from '../../stores/loader'
import Swal from 'sweetalert2'
const newCategory =ref({})
const {addCategory}=useCategories()
const {setIsLoading}=useLoaderStore()
    const handleCreateCategory=async()=> {
      if(!newCategory.value.name){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      console.log(newCategory.value);
      
      setIsLoading(true)
        const result =await addCategory(newCategory.value)
        if(result.success){
          setIsLoading(false)
      console.log('Category Created:', result);
       Swal.fire({
            title: 'successful',
            text:   `Category ${result?.data?.name}`,
            icon: 'success',
          
        });
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to create Category',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('creating failed', result);
      }
    
        newCategory.value={}
     
    }
</script>

<style scoped>
.create-election {
  padding: 20px;
  width: 60%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
