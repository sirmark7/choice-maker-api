<template>
  <form class="auth-form" @submit.prevent="handleSignup">
    <h3>SIGN UP</h3>
    <input type="text" placeholder="Folio Number" required v-model="user.folio_number" />
    <input type="password" placeholder="Password" required v-model="user.password" />
    <input
      type="password"
      placeholder="Confirm Password"
      required
      v-model="user.confirm_password"
    />
    <button class="btn">Sign up</button>
    <p>Already have an account? <router-link to="login">login</router-link></p>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
// import {useAuthStore} from '../stores/auth'
import Helpers from '../services/helpers'
import Swal from 'sweetalert2'
const router =useRouter()

const user = ref({})
const handleSignup = async () => {
    const comparePassword =Helpers.compare(user.value.password,user.value.confirm_password)
   if(!comparePassword){
        return Swal.fire({
            title: 'Password Mismatch',
            text:   `password dose not match`,
            icon: 'warning',
          
        });
    }
  console.log(user.value)
 alert('signup successful')
  router.push('/auth/login')
  
//  const result = await signup(user.value)
  // if (result.success) {
       
  //       Swal.fire({
  //           title: 'Signup successful',
  //           text:   `Login to Access Dashboad`,
  //           icon: 'success',
          
  //       });
  //        router.push('/auth/login')
  //     } else {
  //      return Swal.fire({
  //           title: 'Registration Failed',
  //           text:   ``,
  //           icon: 'warning',
          
  //       })
  //       console.error('signup failed', result.message);
  //       }
}

</script>
<style lang=""></style>
