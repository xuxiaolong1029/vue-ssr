<template>
    <div>
        首页
        <img src="../assets/img/img2.png" width="200" alt=""/>
        <div class="bg">
            <el-row>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        head () {
            return{
                title:'首页',
                author:'徐小笼',
                keywords:'citex交易所,citex exchange',
                description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
            }
        }
    }
</script>

<style scoped lang="less">
.bg{
    background: url('../assets/img/img2.png') no-repeat;
    background-size: 200px 200px;
    width: 200px;
    height: 200px;
}
</style>
