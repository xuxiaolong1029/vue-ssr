<template>
  <div class="bar">
    <h1 @click="onHandleClick">Bar</h1>
    <p>Component</p>
    <h2>异步Ajax数据：</h2>
    <span>{{ bar }}</span>
    <img src="./img/img1.jpg" alt="">
  </div>
</template>

<script>
  import { mapState } from "vuex";
  const fetchInitialData = ({ store }) => {
    return ()=>{
      store.dispatch('fetchBar');
      store.dispatch('getExchangeCoins');
    };
  };
  export default {
    head() {
      let title = `ETH/BTC`;
      try {
        let str = this.activeCoinType.split("/");
        title = `${str[0]}/${str[1]} - ${this.$t("lang.title")}`;
      } catch (e) {}

      return {
        title: 'CITEX Global | Global Digital Trading Platform',
        meta: [
          {
            hid: "description",
            name: "description",
            content:'CITEX—全球首家立体生态型数字资产交易平台'
          }
        ]
      };
    },
    asyncData: fetchInitialData,
    methods: {
      onHandleClick(){
        console.log(this.exchangeCoinsList)
        alert('sss')
      }
    },

    mounted() {
      this.$store.dispatch('getExchangeCoins');
      // 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
      // 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
      let store = this.$store;
      fetchInitialData({ store });
    },
    computed: {
      ...mapState([
        "bar",
        "exchangeCoinsList"
      ])
    }
  }
</script>

<style>
.bar {
  background: bisque;
}
</style>
