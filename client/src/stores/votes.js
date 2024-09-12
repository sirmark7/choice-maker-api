
import { defineStore } from 'pinia'
import service from '../services/request';
export const useVotes = defineStore('votes', {
  // define store variable
  	state: () => ({
		allVotes: null,
    electionVotes:null
	}),

  // define a function to change the variable
  actions:
  {
	setVotes(data){
		this.allVotes=data
	},
	setUserVotes(data){
		this.electionVotes=data
	},
	async getAllVotes() {
      try {
        const response = await service.get('/votes');

        const data = response.data;

        this.setVotes(data)
		console.log(data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async getAllUserVotes() {
      try {
        const response = await service.get('/votes/user');

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
  getVotes:(state) => state.allVotes,
  getUserVotes:(state) => state.electionVotes,
  getVotesCount:(state)=>state.allVotes?.length?state.allVotes?.length:0
}
})
