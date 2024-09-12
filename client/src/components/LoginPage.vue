<template>
  <form class="auth-form" @submit.prevent="handleLogin">
    <h3>LOGIN</h3>
    <input type="text" placeholder="Id Number" required v-model="user.personalId" />
    <input type="password" placeholder="Password" required v-model="user.password" />
    <button class="btn" type="submit">Login</button>
    <p>Do not have an account? <router-link to="#">contact your Admin</router-link></p>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useLoaderStore } from '@/stores/loader'
import Swal from 'sweetalert2'
const {setIsAuthenticated,login}=useAuthStore()
const {setIsLoading}=useLoaderStore()
const {setUser}=useUserStore()
const user = ref({})
const router = useRouter()

const handleLogin = async() => {
  setIsLoading(true)
  const voteStatus= await JSON.parse(localStorage.getItem('votesStatus'))
  if (!user.value.personalId || !user.value.password) {
     setIsLoading(false)
    return Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
          
        });
  }

      const result = await login(user.value);
      if (result.success) {
        setIsAuthenticated(true)
        setUser(result.data.user)
        setIsLoading(false)
        Swal.fire({
            title: 'Login successful',
            text:   `Welcome ${result?.data?.user?.name}`,
            icon: 'success',
          
        });
        if (voteStatus!== true) {
          router.push('/home')
          console.log(voteStatus);
        }else{
           Swal.fire({
            title: 'You Have completed your Vote ',
            text:   `Welcome `,
            icon: 'success',
          
        });
          router.push('/about')
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        Swal.fire({
            title: 'Login Failed',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('Login failed', result.message);
      }
}

</script>
<style lang="" scope></style>
