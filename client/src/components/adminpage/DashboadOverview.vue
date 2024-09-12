<template>
  <div class="dashboard">
    <main>
      <section class="overview">
        <div class="card">
          <h2>Active Elections</h2>
          <p>{{ activeElectionsCount }}</p>
        </div>
        <div class="card">
          <h2>Total Users</h2>
          <p>{{ totalUsersCount }}</p>
        </div>
        <div class="card">
          <h2>Votes Cast</h2>
          <p>{{ totalVotesCast }}</p>
        </div>
      </section>

      <section class="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li v-for="activity in recentActivities" :key="activity.id">
            {{ activity.message }}
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useElections} from '../../stores/elections'
// import {useCandidates} from '../../stores/candidates'
// import {usePositions} from '../../stores/position'
import {useLoaderStore} from  '../../stores/loader'
import {useUserStore} from '../../stores/user'
import {useVotes} from '../../stores/votes'
const {getEletionsCount}=useElections()
// const {getCandidates}=useCandidates()
// const {getPositions}=usePositions()
const {setIsLoading}=useLoaderStore()
const {getUsersCount}=useUserStore()
const {getVotesCount}=useVotes()
const totalVotesCast=ref()
const totalUsersCount=ref()
const activeElectionsCount=ref()
const recentActivities=ref([])

onMounted(()=>{
  setIsLoading(true)
  totalUsersCount.value=getUsersCount
  activeElectionsCount.value=getEletionsCount
  totalVotesCast.value=getVotesCount
  setIsLoading(false)
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

.overview {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.card  p{
  font-size: larger;
  color: #24904d;
  font-weight: 800;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.recent-activity {
  margin-top: 40px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
}

.recent-activity li {
  background-color: #e9ecef;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
