<template>
  <div class="create-user">
    <h1>Create User</h1>
    <form @submit.prevent="handleCreateUser">
        <div class="image-upload">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  :onchange="(e)=>handleFileChange(e)"
                />
                <div class="img-container">
                  <img
                    id="profile-img"
                    :src="profileView"
                    alt="Profile"
                  />
                </div>
                <div class="icon">
                  <span class=""></span>
                </div>
        </div>


      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newUser.name" required  />
      </div>
      <div class="form-group">
        <label for="personalId">Personal ID</label>
        <input type="text" id="personalId" v-model="newUser.personalId" minlength="6" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="newUser.role" required>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="newUser.password" minlength="8" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="newUser.confirmPassword" required />
      </div>
      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useUserStore} from '../../stores/user'
import {useLoaderStore} from '../../stores/loader'
import Swal from 'sweetalert2'
const {addUser}=useUserStore()
const {setIsLoading}=useLoaderStore()
const newUser=ref({})
 const profileImage = ref();
const profileView = ref();

const handleFileChange = (event) => {
      event.preventDefault()
    const file = event.target.files?.[0];
    console.log(file);
    
    if (file) {
      profileImage.value=file
      const reader = new FileReader();
      reader.onload = () => {
        profileView.value=reader.result;
      };
      reader.readAsDataURL(file);      
    }
  };
    const handleCreateUser=async()=> {
      if(!newUser.value.name||!newUser.value.personalId||!newUser.value.role||!newUser.value.password||!newUser.value.confirmPassword){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      if(newUser.value.password!==newUser.value.confirmPassword){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `Passwords do not match`,
            icon: 'warning',
        })
      }
      if(newUser.value.personalId.length!==6 ||newUser.value.password.length<8) {
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `PersonalID must be 6 characters long and Pasword must be 8 characters long`,
            icon: 'warning',
        })
      }
      console.log(newUser.value);
      // add image
      const formData =new FormData();
      formData.append('logo',profileImage.value)
      formData.append('name',newUser.value.name)
      formData.append('personalId',newUser.value.personalId)
      formData.append('role',newUser.value.role)
      formData.append('password',newUser.value.password)
      setIsLoading(true)
        const result =await addUser(formData)
        if(result.success){
          setIsLoading(false)
      console.log('User Created:', result);
       Swal.fire({
            title: 'successful',
            text:   `User ${result?.data?.name}`,
            icon: 'success',
          
        });
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to create User',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('creating failed', result);
      
      }
      newUser.value={}
      profileView.value=null
    }
</script>

<style scoped>
.create-user {
  padding: 20px;
    width: 60%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

.image-upload{
  position : relative;
   width: 150px;
  height: 150px;
}
.image-upload input{
 opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.img-container{
  width: 100%;
  height: 100%;
  border-radius: 50%; /* This makes the element fully rounded */
  background-color: #fde68a; /* Equivalent to Tailwind's amber-200 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-container img{
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Makes the element fully rounded */
  object-fit: cover; /* Ensures the image covers the container without stretching */
  object-position: top; /* Positions the image starting from the top */
}

.icon{
   position: absolute;
  bottom: 0.5rem; /* Equivalent to Tailwind's bottom-2 (2 * 0.25rem) */
  right: 0.5rem; /* Equivalent to Tailwind's right-2 (2 * 0.25rem) */
  width: 1.75rem; /* Equivalent to Tailwind's w-7 (7 * 0.25rem) */
  height: 1.75rem; /* Equivalent to Tailwind's h-7 (7 * 0.25rem) */
  background-color: #3f1d2c; /* Equivalent to Tailwind's bg-pink-950 */
  border-radius: 50%; /* Makes the element fully rounded */
  display: flex;
  align-items: center; /* Vertically centers content inside the flex container */
  justify-content: center;
}

.icon span{
   width: 1rem; /* Equivalent to Tailwind's w-4 (4 * 0.25rem) */
  height: 1rem; /* Equivalent to Tailwind's h-4 (4 * 0.25rem) */
  background-color: white; /* Sets the background color to white */
  border-radius: 50%; 
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>
