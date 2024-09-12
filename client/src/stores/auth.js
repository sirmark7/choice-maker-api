import { defineStore } from "pinia";
import service from "../services/request";


export const useAuthStore = defineStore("auth", {
	// state value
	state: () => ({
		user: null,
		token:null,
		isAuthenticated: false,
	}),
	

  actions: {
	setIsAuthenticated(mode){
		this.isAuthenticated=mode
	},
	async login(userData) {
      try {
        const response = await service.post('/auth/login', userData);
		  console.log(response.data);
        const { token,user} = response.data;
        this.token = token;
        this.user = user;
		localStorage.setItem('token',this.token)
     localStorage.setItem('userInfo',JSON.stringify(this.user))
		
        return { success: true, data:{token,user} };
      } catch (error) {
        // console.error('Login error:', error);
        return { success: false, message: error };
      }
    },

    async signup(userData) {
      try {
        const response = await service.post('/auth/register', userData);

        const { message, data } = response.data;
        if(message.includes('success')){
        return { success: true, data};
        }
      } catch (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'Registration failed' };
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('userInfo')
      localStorage.clear()
	
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
});
