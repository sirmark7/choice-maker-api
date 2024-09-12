
import { defineStore } from 'pinia'
import service from '../services/request';

export const useUserStore = defineStore('user', {
  // state value
  state: () => ({
    users: [],
    user:{},
    newUser:{}
  }),
  // getter functions
  getters: {
    getUsers(state) {
      return state.users
    },
    getUser(state) {
      return state.user
    },
    getStudentUsers(state){
        return state.users.filter((user)=>user.role=='student')
    },
    getUsersCount(state){
      return state.users?.length?state.users?.length:0
    }
  },
  // setter functions
  actions: {
    setUser(data){
      this.user =data
    },
     setUsers(data){
      this.users =data
    },
     setNewUser(data){
      this.newUser =data
    },
  async getAllUsers() {
      try {
        const response = await service.get('/users');

        const data= response.data;

        this.setUsers(data)
		console.log(data);
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },

    async addUser(userData) {
      try {
        let response;
        if(userData.role === 'admin'||userData.role === 'stuff'){
          delete userData.role
          
        response = await service.post('/auth/register/admin',userData);
        }
        else{
        response = await service.post('/auth/register',userData);

        }

        const { message,data} = response.data;
		    console.log(message,data);

        this.setUsers([...this.users,data])
		
        return { success: true, data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
    async updateUser(id,body) {
      try {
        const response = await service.put(`/users/${id}`,body);
        const { message ,data} = response.data;
        this.setUsers(this.users.filter((user) => user.id !== data.id))
        await this.getAllUsers()
        return { success: true, message,data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
    async deleteUser(id) {
      try {
        const response = await service.delete(`/users/${id}`);
        const { message ,data} = response.data;
        this.setUsers(this.users.filter((user) => user.id !== data.id))
        return { success: true, message,data };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },
  }
})
