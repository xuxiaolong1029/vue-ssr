<template>
    <div>
        登录页面
    </div>
</template>

<script>
    import {getQueryCurrency,getQueryContract,getQueryIndicatorList} from '../api/commonApi';
    export default {
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

<style scoped>

</style>
