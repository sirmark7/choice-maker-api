<template>
  <div class='home-page'>
    <NavigationBar :show="true" :handleElectionType="handleElectionType" :isActive="isActive" :electionName="electionName" :category="categoryName"/>
      <span></span>
    <CandidateList :candidates="candidates" :toggleModal="handleShowModal" mode="voting" :handleNext="handleElectionType" :election="election" /> 
  </div>
  <ModalCard v-show="showModal" heading="Candidate Profile" :candidate="candidateProfile" :toggleModal="handleShowModal"/>
 <!-- <LoaderModal v-show="loading"/> -->
</template >

<script setup>
import ModalCard from '../components/ModalCard.vue';
import CandidateList from '../components/homepage/CandidateList.vue';
import NavigationBar from '../components/homepage/NavigationBar.vue';

import {useElections} from '../stores/elections'
import {useLoaderStore} from '../stores/loader'
import LoaderModal from '../components/LoaderModal.vue'
// import Swal from 'sweetalert2'
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2'

const {getAllElectionsWithCandidates,getEletionCandidates,getEletionsCount}=useElections()
// const {isLoading}=useLoaderStore()
const router =useRouter()
const elections =ref(getEletionCandidates)
const electionName =ref()
const election =ref()
const currentElection =ref(0)
const electionCount=ref(getEletionsCount)
const currentPosition =ref(0)
const positionCount =ref()
const categoryName=ref()
const positions=ref([])
const candidates =ref()
const isActive =ref({position:'',state:true})
const showModal=ref(false)
const candidateProfile=ref({})
onMounted(async()=>{
await getAllElectionsWithCandidates()
.then((res)=>{
  elections.value=res.data
  electionName.value=res.data[currentElection.value]?.name
  election.value=res.data[currentElection.value]
  electionCount.value=res.data?.length
  positions.value=res.data[currentElection.value]?.positions
  positionCount.value=positions.value?.length;
  isActive.value.position=positions.value[currentPosition.value]?.name
  categoryName.value=positions.value[currentPosition.value]?.category.name
  candidates.value=positions.value[currentPosition.value].candidates
console.log(positionCount.value);
}  )
}
)
const handleFilter=()=> {
    console.log(currentElection.value,electionCount.value,currentPosition.value,positionCount.value);
      // Filter candidates based on selected position
  election.value=elections.value[currentElection.value]
  electionName.value=elections.value[currentElection.value]?.name
  positions.value=elections.value[currentElection.value]?.positions
  positionCount.value=elections.value[currentElection.value]?.positions?.length;
  isActive.value.position=positions.value[currentPosition.value]?.name
  categoryName.value=positions.value[currentPosition.value]?.category.name
  candidates.value=positions.value[currentPosition.value].candidates
     
    }



const handleElectionType =()=>{
  console.log(currentElection.value,electionCount.value,currentPosition.value,positionCount.value);
  
  if (currentElection.value===electionCount.value-1 && currentPosition.value===positionCount.value-1){
    isActive.value['state']=false
      localStorage.setItem('votesStatus',JSON.stringify(true))
      // get all votes from localstorage
      console.log('first');
        router.push('/about')
        Swal.fire("Votes Confirmed",`Vote Counted`, "success",)
    return;
    }
    else if(currentElection.value==electionCount.value-1 && currentPosition.value<positionCount.value-1){
      console.log('second');

      ++currentPosition.value
      handleFilter()
      return;
    }
    else if(currentElection.value<electionCount.value-1 && currentPosition.value==positionCount.value-1){
      console.log('third');

      ++currentElection.value
      currentPosition.value=0
      handleFilter()
      return;
    }
    else if(currentElection.value<electionCount.value-1 && currentPosition.value<positionCount.value-1){
      console.log('forth');

       ++currentPosition.value
      handleFilter()
      return;
    }
    
}


const handleShowModal=(candidate)=>{
  event.stopPropagation()
  candidateProfile.value=candidate
  showModal.value=!showModal.value
}

</script>
<style lang="css" scoped>
.home-page{
  display: flex;
  justify-content:flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  height: 100vh;
}
.home-page>span{
  display: block;
  background: #000;
  width: 100%;
}

</style>
