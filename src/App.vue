<template>
  <div id="app">
    <div class="menu">
      <ul>
        <router-link tag="li" v-for="(item,index) in menu" :key="index" :to="item.path">{{item.name}}</router-link>
      </ul>
    </div>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        menu:[
          {path:'/',name:'首页'},
          {path:'/otc',name:'otc'},
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
        width:1200px;margin: auto;cursor: pointer;
        display: flex;justify-content:space-between;
      }

    }
    .page{
      width: 1200px;margin: auto;
    }
  }

</style>
