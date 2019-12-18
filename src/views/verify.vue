<template>
    <div class="page-login">
        <div class="login-content">
            <h2>CITEX 商户管理后台</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
                <el-form-item prop="account" label="验证码">
                    <el-input size="medium" placeholder="请输入验证码"  v-model="ruleForm.verify"></el-input>
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
    export default {
        head () {
            return{
                title:'验证',
                author:'徐小笼',
                keywords:'citex交易所,citex exchange',
                description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
            }
        },
        data() {
            return {
                imgHeight:0,
                ruleForm: {
                    verify: '',
                },
                rules: {
                    account: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min:6, max:6, message: '验证码为6位数字', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted(){
            this.imgHeight = document.documentElement.clientHeight-3
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.verify()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            verify() {
                this.$message.error('s');
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
            height: 280px;
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
                    width: 100%;margin-top:10px;
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
