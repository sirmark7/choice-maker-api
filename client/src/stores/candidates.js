
import { defineStore } from 'pinia'
import service from '../services/request';
export const useCandidates = defineStore('candidates', {
  // define store variable
  	state: () => ({
		allCandidates: null,
    candidatesVotes:[],
	}),

  // define a function to change the variable
  actions:
  {
	setCandidates(data){
		this.allCandidates=data
	},
	setCandidatesVotes(data){
		this.candidatesVotes=data
	},
	async getAllCandidates() {
      try {
        const response = await service.get('/candidates');

        const { message,data} = response.data;

        this.setCandidates(data)
		console.log(message,data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async getCandidatesByCategory() {
      try {
        const response = await service.get('/candidates/category');

        const { message,data} = response.data;

        this.setCandidates(data)
		console.log(message,data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async getAllCandidatesVotes() {
      try {
        const response = await service.get('/candidates/votes');

        const { message,data} = response.data;

        this.setCandidatesVotes(data)
		console.log(message,data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
     async addCandidate(body) {
      try {
       
       const response = await service.post('/candidates',body);
        
        const { message,data} = response.data;
		    console.log(message,data);

        this.setCandidates([...this.allCandidates,data])
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
},

getters:{
  getCandidates:(state) => state.allCandidates,
  getCandidatesVotes:(state)=>state.candidatesVotes
}
})
