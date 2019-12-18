<template>
    <div style="margin-top: 20px">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="姓名">
                <el-input style="width:240px" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
                <el-input style="width:240px" v-model="form.cardNo"></el-input>
            </el-form-item>
            <el-form-item label="二维码">
                <el-input style="width:240px" v-model="form.bank"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" style="position: relative;">
                <el-input style="width:240px" v-model="form.code"></el-input>
                <p class="get-code">获取验证码</p>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props:{
            formObj:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return{
                form:{
                    name:'',cardNo:'',bank:'',code:''
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
