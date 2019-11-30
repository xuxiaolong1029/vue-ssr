<template>
  <div class="foo">
    <h1 @click="onHandleClick">Foo</h1>
    <p>Component</p>
  </div>
</template>

<script>
export default {head () {
    return{
      title:' | 个人',
      author:'徐小笼',
      keywords:'citex交易所,citex exchange',
      description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
    }
  },
  methods: {
    onHandleClick() {
      alert('foo');
    }
  },
}
</script>

<style>
.foo {
  background: yellowgreen;
}
</style>
