<template>
  <div id="app">
    <router-link tag="p" v-for="(item,index) in menu" :key="index" :to="item.path">{{item.name}}</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menu:[
        {path:'/bar',name:'Bar'},
        {path:'/foo',name:'Foo'},

      ]
    }
  }

}
</script>
<style coped>
  p{
    display: inline-block;width: 100px;cursor: pointer;
    text-align: center;
  }
</style>
