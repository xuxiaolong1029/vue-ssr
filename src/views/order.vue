<template>
    <div class="page-order">
        <ul class="order-type">
            <li @click="active=index" :class="active===index?'menu-active':''" v-for="(item,index) in menu" :key="index">{{item}}</li>
        </ul>
        <div class="content-table">
            <el-form class="from-input" ref="form" :model="form">
                <el-form-item label="订单号" label-width="60px">
                    <el-input size="small" placeholder="订单号" v-model="form.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="时间" label-width="50px">
                    <el-date-picker
                            style="width: 240px;"
                            v-model="form.orderTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交易类型" label-width="80px">
                    <el-select size="small" v-model="form.orderType" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="50px">
                    <el-select size="small" v-model="form.orderStatus" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:15px;" size="small" type="primary">查询</el-button>
                    <el-button style="margin-left:15px;" size="small" type="primary">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="type" label="订单号">
                </el-table-column>
                <el-table-column prop="account" label="时间">
                </el-table-column>
                <el-table-column prop="address" label="交易类型">
                </el-table-column>
                <el-table-column prop="address" label="数量(USDT)">
                </el-table-column>
                <el-table-column prop="address" label="价格(CNY)">
                </el-table-column>
                <el-table-column prop="address" label="金额(CNY)">
                </el-table-column>
                <el-table-column prop="address" label="手续费(CNY)">
                </el-table-column>
                <el-table-column prop="address" label="支付方式">
                </el-table-column>
                <el-table-column prop="address" label="状态">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.native="handLook(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <tradeStatus :orderData="orderData" :statusDialog="statusDialog" @close-dialog ='statusDialog=false'></tradeStatus>
    </div>
</template>

<script>
    import tradeStatus from './dialog/tradeStatus'
    export default {
        components:{
            tradeStatus
        },
        data(){
            return{
                statusDialog:false,
                orderData:{},
                menu:[
                  '我的买单','我的卖单'
                ],
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
                tableData: [{
                    type:'1',
                    account: '43314711476',
                    address: '1517'
                }, {
                    type:'2',
                    account:'1314711476',
                    address: '1517'
                }, {
                    type:'3',
                    account:'144711476',
                    address: '1517'
                }],
                active:0,
                form:{
                    orderNum:'',orderTime:'',orderType:'',orderStatus:''
                }
            }
        },
        methods:{
            handLook(row){
                this.orderData = row;
                this.statusDialog=true;
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-order{
        position: relative;
        width: 100%;height: 100%;box-sizing: border-box;padding: 40px 30px;
        .order-type{
            position: absolute;height: 60px;line-height: 60px;display: flex;
            right: 0;justify-content: space-between;top: -60px;
            li{
                width: 70px;text-align: center;margin: 0 20px;cursor: pointer;
            }
            .menu-active{
                color:#409EFF;border-bottom: 1px solid #409EFF;
            }
        }
        .content-table{
            width: 100%;background-color: #fff;height:100%;
            .from-input{
                padding:20px 10px 0 10px;
                display: flex;
                justify-content:space-between ;
            }
        }
    }
</style>
