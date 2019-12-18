<template>
    <div class="page-index">
      首页
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
        .page-index-top{
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
        .page-index-bottom{
            margin-top: 60px;
            .card-img{
                img{
                    width: 35px;vertical-align: middle;margin-right: 10px;
                }
            }
        }
    }
</style>
