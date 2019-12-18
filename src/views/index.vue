<template>
    <div :style="{ height: pageHeight + 'px'}">
        首页
        <img src="../assets/img/img2.png" width="200" alt=""/>
        <div class="bg">
        </div>
        <button @click="dss()">
           <i class="el-icon-setting"></i> {{pageHeight}}
        </button>
        <el-select v-model="value" @change="getSelect()" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
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
        },
        data(){
            return{
                pageHeight:0,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                input:''
            }
        },
        mounted(){
            this.pageHeight = document.documentElement.clientHeight
        },
        methods:{
            getSelect(){
                this.$message(this.value);
            },
            dss(){
                alert('你好')
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
