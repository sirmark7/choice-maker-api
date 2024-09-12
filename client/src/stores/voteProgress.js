
import { defineStore } from 'pinia'
import service from '../services/request';
export const useVoteProgress = defineStore('voteProgress', {
  // define store variable
  	state: () => ({
		progress: null,
	}),

  // define a function to change the variable
  actions:
  {
	setVoteProgress(data){
		this.progress=data
	},

	async getVoteProgress(electionId) {
      try {
        const userId=localStorage.getItem('userId')
        const response = await service.get(`/vote_progress/${userId}/${electionId}`);

        const data = response.data;

        this.setVoteProgress(data)
		    console.log(data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async saveUpdateVoteprogress(electionId, positionId, candidateId) {
      try {
          const userId=localStorage.getItem('userId')
          const body={userId,electionId,positionId,candidateId}
        const response = await service.post('/vote_progress',body);

        const {message,data} = response.data;

        this.setUserVotes(data)
		    console.log(data);
		
        return { success: true, data,message };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async finalizeVoteprogress(electionId) {
      try {
        const userId=localStorage.getItem('userId')
        const response = await service.put('/vote_progress',{userId,electionId});

        const {message,data} = response.data;

        this.setUserVotes(data)
		    console.log(data);
		
        return { success: true, data,message };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
  
},

getters:{
  getVoteProgress:(state) => state.progress,
}
})
