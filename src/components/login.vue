<template>
    <div>
        登录页面
    </div>
</template>

<script>
    import fetch from '../http/fetch';
    import {getQueryCurrency,getQueryContract} from '../api/commonApi';
    export default {
        data(){
            return{

            }
        },
        mounted() {
            this.getQueryContractData();
            this.getQueryCurrencyData();
        },
        methods:{
            getQueryCurrencyData(){
                getQueryCurrency().then(data => {
                    console.log(data)
                })
            },
            getQueryContractData() {
                getQueryContract().then(data => {
                    console.log(data)
                })
            },
        }
    }
</script>

<style scoped>

</style>
