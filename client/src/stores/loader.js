
import { defineStore } from 'pinia'
export const useLoaderStore = defineStore('loader', {
  // define store variable
  	state: () => ({
		isLoading: false,
	}),

  // define a function to change the variable
  actions:
  {
	setIsLoading(data){
		this.isLoading=data
	},

  },
  getters:{
	getLoading:(state)=>state.isLoading
  }

})
