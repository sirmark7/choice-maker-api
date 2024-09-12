<template>
      <span class="loader" >
            <img src="/images/loading.gif" alt="loading" />
  </span>
</template>

<script setup>

</script>
<style lang="css" scoped>
.loader{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
  background: #0000008b;
  z-index: 999;
}
.loader img{
  width: 100px;
  position: relative;
  z-index: 9999
}
</style>