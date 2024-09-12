<template>
  <div class="results-page">
   <button type="button" :onclick="handleRefresh" >Refresh</button>
    <h1>Election Results</h1>


    <div  v-if="elections.length">
      <details v-for="election in elections" :key="election.id" class="election-result">
            <TrashBin class='icon' :onclick="()=>handleDeleteElection(election)"/>
        <summary class="election-dates" :onclick="handleRotate">
        <h2>{{ election.name }}</h2>
          <span>
           <span>Start Date: {{ election.startDate.split('T')[0] }}</span>

          <span>End Date: {{ election.endDate.split('T')[0] }}</span>
          </span>
            <img src="/images/chevron-down.png" alt="arrow" class="arrow" :class="{active:rotate}"/>
          </summary>

          <ul>
          <li v-for="position in election.positions" :key="position.id" :onclick="()=>handleShowModal(position)">
           <span class="in-text">Category</span>: {{ position.category.name }}  <span class="in-text">Position</span>: {{ position.name }} 
          </li>
        </ul>
      </details>
    </div>
    <div v-else>
      <p>No elections available.</p>
    </div>
    <ModalContainer  v-show="showModal" :heading="modalTitle" :candidates="selectedCandidates" :toggle-modal="handleShowModal"/> 
  </div>
</template>

<script setup>
import {ref ,onMounted} from 'vue'
import ModalContainer from '../ModalContainer.vue'
import {useElections} from '../../stores/elections'
import {useCandidates} from '../../stores/candidates'
import {TrashBin} from '@vicons/ionicons5';
import Swal from 'sweetalert2'
const {getEletions,deleteElection,getAllElections}=useElections()
const {getCandidatesVotes}=useCandidates()
const elections=ref([])
const candidates=ref([])
const modalTitle=ref('')
const selectedCandidates=ref([])
const showModal=ref(false)
const rotate=ref(false)
const handleRefresh=()=>{
  window.location.reload()
}
const handleRotate=()=>{
  document.querySelector('.arrow').classList.toggle('active')
}
onMounted(async()=>{
  await getAllElections()
  elections.value=getEletions
  candidates.value=getCandidatesVotes
})

const handleDeleteElection=async(info)=>{
 if(!info.id){
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  })
 }
  const result=await deleteElection(info.id)
  if(!result.success){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Election deleted successfully',
  })
     elections.value=elections.value.filter((election)=>election.id!==info.id)
}
const handleShowModal=async(data)=>{
 
  event.stopPropagation()
  console.log(data);
  
  modalTitle.value= data.name && `${data?.category.name} ${data?.name}`
  console.log(candidates.value);
  
  selectedCandidates.value= candidates.value?.filter((student)=>student?.position?.id===data.id)
  console.log(selectedCandidates.value);
  
  showModal.value=!showModal.value
}

</script>

<style scoped>
.results-page {
  padding: 20px;
    width: 100%;
  margin: auto;
  height: 100%;
}
h1{
  text-align: center;
}

.election-result {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.election-result h2 {
  margin-bottom: 10px;
  text-transform: capitalize;
}

.election-result ul {
  list-style: none;
  padding: 0;
}

.election-result li {
  padding: 8px;
  background-color: #f1f3f5;
  margin-bottom: 5px;
  border-radius: 3px;
  cursor: pointer;
}
.election-result li:hover{
  color: #f1f3f5;
  background: green;
  transition: all .5s;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
 .election-dates .active{
  transform: rotate(180deg);
  transition: all .5s;
}
img,.icon{
  width: 40px;
  
}
.icon{
  color:red;
  margin-left: 10px;
  cursor: pointer;

}
button:hover {
  background-color: #0056b3;
}
.election-dates{
  display: flex;
  gap: 10px;
  font-weight: 600;
  align-items: center;
  color: white;
  justify-content: space-between;
  margin-bottom: 4px;

}

.election-dates >span{
  display: flex;
  gap: 10px ;
}
.in-text{
  font-weight: 600;
}
summary{
  cursor: pointer;
}
</style>
