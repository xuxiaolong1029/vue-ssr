<template>
  <div :style="{ height: pageHeight + 'px'}">
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState([
        "pageHeight",
      ])
    },
    data(){
      return{
        menu:[
          {path:'/',name:'首页'},
          {path:'/details',name:'详情'},
          {path:'/person',name:'个人中心'},
          {path:'/login',name:'登录'}
        ]
      }
    },
    mounted(){}

  }
</script>
<style scoped lang="less">
  #app{
    width:100%;
    .menu{
      height: 50px;line-height: 50px;background-color: chocolate;color: #fff;
      ul{
        margin: auto;cursor: pointer;
        display: flex;justify-content:space-around;
        li{
          min-width: 80px;text-align: center
        }
      }

    }
    .page{
      width:100%;margin: auto;
    }
  }

</style>
