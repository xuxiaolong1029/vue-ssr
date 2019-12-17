<template>
  <div :style="{ height: pageHeight + 'px'}">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        pageHeight:''
      }
    },
    mounted(){
      this.pageHeight = document.documentElement.clientHeight
    }
  }
</script>
