<template>
    <div>
        登录页面
    </div>
</template>

<script>
    import {getQueryCurrency,getQueryContract,getQueryIndicatorList} from '../api/commonApi';
    export default {
        head () {
            return{
                title:'登录',
                author:'徐小笼',
                keywords:'citex交易所,citex exchange',
                description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
            }
        },
        data(){
            return{

            }
        },
        mounted() {
            this.getQueryContractData();
            this.getQueryCurrencyData();
            this.getTickTrade();
        },
        methods:{
            getTickTrade(){
                getQueryIndicatorList().then(data => {
                   // console.log(data)
                })
            },
            getQueryCurrencyData(){
                getQueryCurrency().then(data => {
                  //  console.log(data)
                })
            },
            getQueryContractData() {
                getQueryContract().then(data => {
                   // console.log(data)
                })
            },
        }
    }
</script>

<style scoped lang="less">

</style>
