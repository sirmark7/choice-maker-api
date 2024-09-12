<template>
  <div class="create-election">
    <h1>Create Position</h1>
    <form @submit.prevent="handleCreatePosition">
      <div class="form-group">
        <label for="name">Position Name</label>
        <input type="text" id="name" v-model="newPosition.name" required />
      </div>
      
      <div class="form-group">
        <label for="categories">Select category</label>
        <select id="categories" v-model="newPosition.categoryId" required>
          <option disabled selected value="">Please select one</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit">Create Position</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {usePositions} from '../../stores/position'
import {useCategories} from '../../stores/category'
import {useLoaderStore} from '../../stores/loader'
import Swal from 'sweetalert2'
const {getcategories}=useCategories()
const {addPosition}=usePositions()
const {setIsLoading}=useLoaderStore()
const newPosition =ref({})
const categories=ref(getcategories)
    const handleCreatePosition=async()=> {
      if(!newPosition.value.name||!newPosition.value.categoryId){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      console.log(newPosition.value);
      
      setIsLoading(true)
        const result =await addPosition(newPosition.value)
        if(result.success){
          setIsLoading(false)
      console.log('Position Created:', result);
       Swal.fire({
            title: 'successful',
            text:   `Position ${result?.data?.name}`,
            icon: 'success',
          
        });
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to create Position',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('creating failed', result);
      
      }
      newPosition.value={}
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
