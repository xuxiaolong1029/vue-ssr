<template>
  <div>
    <h1 @click="onHandleClick">详情页面</h1>
    <img src="../assets/img/img1.png" width="200" alt=""/>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    head () {
      return{
        title:'OTC',
        author:'徐小笼',
        keywords:'citex交易所,citex exchange',
        description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
      }
    },
    asyncData({ store,route }) {
      return store.dispatch('getExchangeCoins')
    },
    methods: {
      onHandleClick(){
        console.log(this.exchangeCoinsList);
        alert('sss')
      }
    },

    mounted() {
      //this.$store.dispatch('getExchangeCoins');
      // 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
      // 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
      let store = this.$store;
     // fetchInitialData({ store });
    },
    computed: {
      ...mapState([
        "bar",
        "exchangeCoinsList"
      ])
    }
  }
</script>

<style scoped lang="less">

</style>
