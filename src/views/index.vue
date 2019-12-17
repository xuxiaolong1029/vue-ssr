<template>
    <div class="page-index">
        <div class="top">
            <el-card class="box-card"  shadow="never">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <div class="shopper-message">
                    <p><label>商户名称：</label>MR陈 </p>
                    <p><label>缴纳保证金：</label>MR陈 </p>
                    <p><label>今日已出售USDT：</label>MR陈 </p>
                    <p><label>今日已收购USDT：</label>MR陈 </p>
                    <p><label>手续费比例：</label>MR陈 </p>
                </div>
            </el-card>
            <el-card class="box-card"  shadow="never">
                <div slot="header" class="clearfix">
                    <span>钱包信息</span>
                    <el-button style="float: right; padding: 3px 0" @click="transferDialog=true" type="text">资金划转</el-button>
                </div>
                <div class="shopper-money">
                    <div>
                        <h3>● 币币钱包</h3>
                        <p><label>可用：</label>25000USDT </p>
                        <p><label>冻结：</label>25000USDT </p>
                    </div>
                    <div>
                        <h3>● OTC钱包</h3>
                        <p><label>可用：</label>25000USDT </p>
                        <p><label>冻结：</label>25000USDT </p>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="bottom">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>支付管理</span>
                    <el-button style="float: right;" @click="formObj={};dialogFormVisible=true;" size="small" type="primary">添加</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="收款方式" width="130">
                        <template slot-scope="scope">
                            <div class="card-img">
                                <img :src="scope.row.icon" alt=""/>
                                <span>{{scope.row.type | filterType}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="account" label="账号">
                    </el-table-column>
                    <el-table-column prop="img" label="二维码">
                    </el-table-column>
                    <el-table-column prop="address" label="是否启用" width="240">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.switch" active-text="开" inactive-text="关"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleLook(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <el-dialog style="width:1200px" title="添加支付方式" :visible.sync="dialogFormVisible">
            <div style="margin-left:30px;">
                <All v-if="Object.keys(formObj).length===0"></All>
                <Card :formObj="formObj" v-if="formObj.type==='1'"></Card>
                <AliPay :formObj="formObj" v-if="formObj.type==='2'"></AliPay>
                <WX :formObj="formObj" v-if="formObj.type==='3'"></WX>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <Transfer :transferDialog="transferDialog" @close-dialog ='transferDialog=false'></Transfer>
    </div>
</template>
<script>
    import Transfer from './dialog/transferAssets'
    import All from './dialog/addCard/index';
    import Card from './dialog/addCard/card';
    import WX from './dialog/addCard/wx';
    import AliPay from './dialog/addCard/alipay';
    export default {
        components:{
            All,Transfer,Card,WX,AliPay
        },
        data(){
            return{
                dialogFormVisible:false,
                transferDialog:false,//划转弹窗
                formObj:{},
                tableData: [{
                    type:'1',
                    icon:require('../assets/img/user.png'),
                    account: '43314711476',
                    switch:true,
                    img: ''
                },{
                    type:'2',
                    icon:require('../assets/img/user.png'),
                    account:'1314711476',
                    switch:true,
                    img: ''
                },{
                    type:'3',
                    icon:require('../assets/img/user.png'),
                    account:'144711476',
                    switch:false,
                    img: ''
                }]
            }
        },
        methods:{
            handleLook(row){
                this.formObj = row;
                this.dialogFormVisible = true;
            },
            deleteData(row){
                let typeName = row.type==='1'?'银行卡':row.type==='2'?'支付宝':'微信';
                this.$confirm(`是否确认删除“${typeName}”收款信息?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(row)
            }
        },
        filters:{
            filterType(type){
                return type==='1'?'银行卡':type==='2'?'支付宝':'微信'
            }
        }
    }
</script>
<style lang="less" scoped>
    .page-index{
        width: 100%;
        padding:50px 100px;box-sizing: border-box;
        .top{
            display: flex;justify-content: space-between;
            .box-card{
                width: 43%;cursor: pointer;
                .shopper-message{
                    color: #777;
                    p{
                        line-height:40px;
                        label{
                            font-size: 14px;
                        }
                    }
                }
                .shopper-money{
                    color: #777;
                    h3{
                        color:#409EFF;line-height: 30px;
                    }
                    p{
                        line-height:35px;
                        label{
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .bottom{
            margin-top: 60px;
            .card-img{
                img{
                    width: 35px;vertical-align: middle;margin-right: 10px;
                }
            }
        }
    }
</style>
