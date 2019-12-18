<template>
  <div id="app" :style="{ height: pageHeight + 'px'}">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        pageHeight:0
      }
    },
    mounted() {
      this.pageHeight = document.documentElement.clientHeight
    }
  }
</script>

