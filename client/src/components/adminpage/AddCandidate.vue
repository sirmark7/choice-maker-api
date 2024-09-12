<template>
  <div class="create-election">
    <h1>Add Candidate</h1>
    <form @submit.prevent="handleCreateCandidate">
      <div class="form-group">
        <label for="manifesto">Candidate Manifesto/Catch Phrase</label>
        <textarea placeholder="Enter Summary of Manifesto or Catch Phrase" rows="10" id="manifesto" v-model="newCandidate.manifesto" required >

        </textarea>
       
      </div>
      <div class="form-group">
        <label for="policies">Candidate Policies (seperate with '-')</label>
        <textarea placeholder="Eg. Policy one - Policy two -" id="policies" rows="10"  v-model="newCandidate.policies" required >

        </textarea>
       
      </div>
      
      <div class="form-group">
        <label for="categories">Select Position</label>
        <select id="categories" v-model="newCandidate.positionId" required>
          <option disabled selected value="">Please select one</option>
          <option v-for="position in positions" :key="position.id" :value="position.id">
            {{ position.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="categories">Select User</label>
        <select id="categories" v-model="newCandidate.userId" required>
          <option disabled selected value="">Please select one</option>
          <option v-for="student in students" :key="student.id" :value="student.id">
            {{ student.name }}
          </option>
        </select>
      </div>
      <button type="submit">Add Candidate</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {usePositions} from '../../stores/position'
import {useCandidates} from '../../stores/candidates'
import {useUserStore} from '../../stores/user'
import {useLoaderStore} from '../../stores/loader'
import Swal from 'sweetalert2'

const {getStudentUsers}=useUserStore()
const {addCandidate}=useCandidates()
const {getpositions}=usePositions()
const {setIsLoading}=useLoaderStore()
const positions =ref(getpositions)
const students=ref(getStudentUsers)
const newCandidate=ref({})
console.log(students.value);

    const handleCreateCandidate=async()=> {
      if(!newCandidate.value.manifesto||!newCandidate.value.userId||!newCandidate.value.positionId||!newCandidate.value.policies){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      console.log(newCandidate.value);
      
      setIsLoading(true)
        const result =await addCandidate(newCandidate.value)
        if(result.success){
          setIsLoading(false)
      console.log('Candidate Created:', result);
       Swal.fire({
            title: 'successful',
            text:   `Candidate Created`,
            icon: 'success',
          
        });
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to create Candidate',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('creating failed', result);
      
      }
      newCandidate.value={}
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
option{
  text-transform: capitalize;
}
textarea{
  width: 100%;
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
