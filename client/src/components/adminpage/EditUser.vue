<template>
  <div class="modal-container">
  <div class="create-user">
    <h1>Update User</h1>
    
    <CloseCircle :onclick="toggleModal" class="close"/>
    
    <form @submit.prevent="handleUpdateUser">
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
                    :src="profileView?profileView:prefixImg+userInfo?.logo"
                    alt="Profile"
                  />
                </div>
                <div class="icon">
                  <span class=""></span>
                </div>
        </div>


      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" v-model="newUser.name"  required  />
      </div>
      <div class="form-group">
        <label for="personalId">Personal ID</label>
        <input type="text" id="personalId" name="personalId" v-model="newUser.personalId"  minlength="6" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role" v-model="newUser.role" required>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <!-- <div class="form-group">
        <label for="password">Old Password</label>
        <input type="password" id="password" name="oldPassword" v-model="newUser.oldPassword" minlength="8" />
      </div>
      <div class="form-group">
        <label for="confirm-password">New Password</label>
        <input type="password" id="confirm-password" name="newPassword" v-model="newUser.newPassword"  />
      </div> -->
      <button type="submit">Update User</button>
    </form>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useUserStore} from '../../stores/user'
import {useLoaderStore} from '../../stores/loader'
import {CloseCircle} from '@vicons/ionicons5'
import Swal from 'sweetalert2'
const {updateUser}=useUserStore()
const {setIsLoading}=useLoaderStore()
const newUser=ref(userInfo)
 const profileImage = ref();
const profileView = ref();
const prefixImg=ref('/uploads/')
const {userInfo,toggleModal} =defineProps(['userInfo','toggleModal'])

// onMounted(()=>{
  
//   newUser.value=userInfo&&userInfo
//   console.log(newUser);
// })
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
    const handleUpdateUser=async()=> {
      if(!newUser.value.name||!newUser.value.personalId||!newUser.value.role){
        return  Swal.fire({
            title: 'Incorrect credentials',
            text:   `check and re-enter details`,
            icon: 'warning',
        });
      }
      // if(){
      //   return  Swal.fire({
      //       title: 'password error',
      //       text:   `Passwords do not match`,
      //       icon: 'warning',
      //   })
      // }
      if(newUser.value.personalId.length!==6) {
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
      // if(newUser.value.newPassword&&newUser.value.oldPassword){
      // formData.append('password',newUser.value.newPassword)
      // formData.append('password',newUser.value.oldPassword)
      // }
      setIsLoading(true)
        const result =await updateUser(userInfo.id,formData)
        if(result.success){
          setIsLoading(false)
      console.log('User update:', result);
       Swal.fire({
            title: 'successful',
            text:   `User ${result?.data?.name}`,
            icon: 'success',
          
        });
        }else {
          setIsLoading(false)
        Swal.fire({
            title: 'Failed to update User',
            text:   ``,
            icon: 'warning',
          
        });
        console.error('update failed', result);
      
      }
      toggleModal()
    }
</script>

<style scoped>
.modal-container{
     position: fixed;
     display: flex;
     justify-content: center;
     align-items: center;
     height:100dvh;
     width: 100vw;   
     z-index: 999999;
     top: 0;
    left: 0;
    background-color: rgba(1, 1, 1, 0.84);
}
.close{
  color:red;;
  width: 35px;
  position:absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
}
.create-user {
  padding: 20px;
    width: 60%;
  margin: auto;
  position: relative;
  color: var(--secondary-color);
  border: #3f1d2c 2px solid;
  background: var(--primary-color);
  border-radius: 10px;
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
