<template>
    <div class="page-login">
        <div class="login-content">
            <h2>CITEX 商户管理后台</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
                <el-form-item prop="account" label="账户">
                    <el-input size="medium" placeholder="请输入登录账号"  v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input size="medium" type="password" placeholder="请输入登录密码"  v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary"  @click="submitForm('ruleForm')">下一步</el-button>
                    <p>遇到问题？提交工单</p>
                </el-form-item>
            </el-form>
        </div>
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
            return {
                ruleForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { min:2, max:12, message: '账户长度在 2 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                }
            };
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({ path: "/verify" });
                        // this.login()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            login() {
                let parmars = {
                    locale: "zh_CN",
                    password: this.$md5(this.ruleForm.password),
                    username: this.ruleForm.account,
                };
                http.fetch("/user/login",parmars,"post").then(data => {
                    if (data && data.code === 0) {

                    }else if(data.code === 40001){
                        this.$message.error(data.message);
                    }else {
                        this.$message.error(data.message);
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .page-login{
        background:#fff url("../assets/img/lantian.jpg") no-repeat;
        background-size:100% 100%;
        width:100%;
        height: 100%;
        .login-content{
            margin:auto;
            vertical-align: middle;
            width: 560px;
            height: 380px;
            background-color: #fff;
            position: relative;
            top: calc(50% - 190px);
            h2{
                padding: 50px 0 30px 0; font-size:20px;text-align: center;
            }
            .rule-form{
                width:350px;
                margin-left:60px;
                .button{
                    width: 100%;margin-top:20px;
                }
                p{
                    text-align: center;cursor: pointer;
                    &:hover{
                        color:#409EFF;
                    }
                }
            }
        }
    }
</style>
