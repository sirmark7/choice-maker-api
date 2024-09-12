
import { defineStore } from 'pinia'
import service from '../services/request';
export const useCategories = defineStore('categories', {
  // define store variable
  	state: () => ({
		allCategories: [],
	}),

  // define a function to change the variable
  actions:
  {
	setCategories(data){
		this.allCategories=data
	},
	async getAllCategories() {
      try {
        const response = await service.get('/categories');

        const { message,data} = response.data;

        this.setCategories(data)
		console.log(message,data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
	async addCategory(name) {
      try {
        const response = await service.post('/categories',name);

        const { message,data} = response.data;

        this.setCategories([...this.allCategories,data])
		
        return { success: true, data,message };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },

  async deleteCategory(id) {
    try {
      const response = await service.delete(`/categories/${id}`);

      const { message,data} = response.data;
      const list =this.allCategories.filter((item) => item._id !== data.id);
      this.setCategories(list)

      return { success: true, data,message };
    } catch (error) {
      // console.error('Login error:', error);
      return { success: false, message: error };
    }
    }
},

getters:{
  getcategories:(state) => state.allCategories,
}
})
