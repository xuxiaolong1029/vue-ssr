<template>
    <div class="page-setting">
        <div class="content-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="type" label="交易类型">
                </el-table-column>
                <el-table-column prop="price" label="单价">
                </el-table-column>
                <el-table-column prop="address" label="数量">
                </el-table-column>
                <el-table-column prop="address" label="支付方式">
                </el-table-column>
                <el-table-column prop="address" label="状态">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleSet(scope.row)">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <setDailog :orderData="orderData" :setDialog="setDialog" @close-dialog ='setDialog=false'></setDailog>
    </div>
</template>

<script>
    import setDailog from './dialog/setDailog'
    export default {
        components:{
            setDailog
        },
        data(){
            return{
                setDialog:false,
                orderData:{},
                tableData: [{
                    id:'1',
                    type:'买入',
                    price:'6.09',
                    account: '43314711476',
                    address: '1517'
                }, {
                    id:'1',
                    type:'买入',
                    price:'6.09',
                    account:'1314711476',
                    address: '1517'
                }, {
                    id:'1',
                    type:'卖出',
                    price:'6.09',
                    account:'144711476',
                    address: '1517'
                }]
            }
        },
        methods:{
            handleSet(row){
                this.setDialog = true;
                this.orderData = row;
            }
        }
    }
</script>

<style scoped lang="less">
    .page-setting{
        width: 100%;height: 100%;box-sizing: border-box;padding: 40px 30px;
        .content-table{
            width: 100%;background-color: #fff;height:100%;
        }
    }
</style>
