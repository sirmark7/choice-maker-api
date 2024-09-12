import axios from 'axios'

//API to test requests
const baseURL = 'http://localhost:4000/api'

const service = axios.create({
  baseURL:baseURL,
  timeout: 5000,
  headers: {
    // Accepted: 'application/json',
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest'
  }
})

/**
 * Intercepting the request to add user token since the api will be authenticated
 * User token will be required for authenticatiob
 */
// const authStore = useAuthStore();

service.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token')?localStorage.getItem('token'):'';
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Intercept the response when authentication is verified
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
