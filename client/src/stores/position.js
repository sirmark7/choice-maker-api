
import { defineStore } from 'pinia'
import service from '../services/request';
export const usePositions = defineStore('positions', {
  // define store variable
  	state: () => ({
		allPositions:[],
	}),

  // define a function to change the variable
  actions:
  {
	setPositions(data){
		this.allPositions=data
	},
	async getAllPositions() {
      try {
        const response = await service.get('/positions');

        const { message,data} = response.data;

        this.setPositions(data)
		console.log(message,data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
    	async addPosition(body) {
      try {
        const response = await service.post('/positions',body);

        const { message,data} = response.data;

        this.setPositions([...this.allPositions,data])
		
        return { success: true, data,message };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
     async deletePosition(id) {
      try {
        const response = await service.delete(`/positions/${id}`);

        const { message,data} = response.data;
        const list =this.allPositions.filter((item) => item._id !== data.id);
        this.setPositions(list)
            return { success: true, data,message };

    }catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
},

getters:{
  getpositions:(state) => state.allPositions,
}
})
