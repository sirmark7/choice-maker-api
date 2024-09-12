<template>
  <div class="create-election">
    <h1>Create Election</h1>
    <form @submit.prevent="handleCreateElection">
      <div class="form-group">
        <label for="name">Election Name</label>
        <input type="text" id="name" v-model="newElection.name" required />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" v-model="newElection.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date</label>
        <input type="date" id="endDate" v-model="newElection.endDate" required />
      </div>
      <div class="form-group">
        <label for="positions">Select Positions</label>
     
        <VueMultiselect
          v-model="newElection.positions"
          :options="positions"
          :multiple="true"
          :close-on-select="true"
          placeholder="Select Positions"
          label="name"
          track-by="id"
        >
        <template #noResult>
          Oops! No positions found. Consider changing the search query.
       </template>
        </VueMultiselect>

      </div>
      <button type="submit">Create Election</button>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import {usePositions} from '../../stores/position'
import {useElections} from '../../stores/elections'
import {useLoaderStore} from '../../stores/loader'
import Swal from 'sweetalert2'
const {getpositions}=usePositions()
const {setIsLoading}=useLoaderStore()
const {addElection,getAllElections}=useElections()
const newElection =ref({name:'',startDate:"",endDate:'',positions:[]})
const positions=ref([...getpositions])
const status=ref('')
    const handleCreateElection=async()=> {
      if(!newElection.value.name||!newElection.value.startDate||!newElection.value.endDate||!newElection.value.positions){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      const dateObj = new Date();
      const month   = dateObj.getUTCMonth() + 1; // months from 1-12
      const day     = dateObj.getUTCDate();
      const year    = dateObj.getUTCFullYear();

      const newDate = year + "-" + month + "-" + day;
      const currentDate = new Date(newDate);
      const startDate=new Date(newElection.value.startDate)
      const endDate=new Date(newElection.value.endDate)
        if(currentDate>startDate||currentDate>endDate){
          return  Swal.fire({
              title: 'Incorrect Date credentials',
              text:   `check and re-enter details`,
              icon: 'warning',
          })
        }
        if(newDate>newElection.value.startDate){
            status.value='upcoming'         
        }else{
          status.value='ongoing' 
        }
        newElection.value.status=status.value

        newElection.value.positions=newElection.value.positions.map(p=>p.id)
      console.log(newElection.value,newDate);
      setIsLoading(true)
        const result =await addElection(newElection.value)
        if(result.success){
           await getAllElections()
          setIsLoading(false)
      console.log('Election Created:', result);
       Swal.fire({
            title: 'successful',
            text:   `Election ${result?.data?.name}`,
            icon: 'success',
          
        });
      
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to create Election',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('creating failed', result);
      
      }
      newElection.value={}
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style  lang="css" scoped>
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
  width: 100%;
  text-transform: capitalize;
   cursor: pointer;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

#positions {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  height: 300px;
  overflow-y: scroll;
}
#positions span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 4px;
  padding: 2px 5px;

}
 #positions span:hover {
  background-color: #f1f3f5;
  transition: all 0.3s ease;
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
