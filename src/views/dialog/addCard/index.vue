<template>
    <div class="card-all">
        <el-tabs v-model="activeName">
            <el-tab-pane label="银行卡" name="1">
                <Card></Card>
            </el-tab-pane>
            <el-tab-pane label="支付宝" name="2">
                <AliPay></AliPay>
            </el-tab-pane>
            <el-tab-pane label="微信" name="3">
                <WX></WX>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    import Card from './card';
    import WX from './wx';
    import AliPay from './alipay';
    export default {
        components:{
            Card,WX,AliPay
        },
        data() {
            return{
                activeName:'1'
            }
        },
        methods:{

        }
    }
</script>

<style lang="less">
    .get-code{
        position: absolute;top:0;right:110px;color:#409EFF;
    }
</style>
