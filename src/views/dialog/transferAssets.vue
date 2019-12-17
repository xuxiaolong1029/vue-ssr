<template>
    <div class="game-assets-otc" v-if="transferDialog">
        <div class="dialog-box">
            <!-- 活动账户资产 -->
            <p class="dialog-title">OTC账户</p>
            <div class="tab-items">
                <div class="item" :class="tabIndex==='0'?'active':''" @click="tabIndex='0'">
                    <!-- 资产划转 -->
                    资产划转
                </div>
                <div class="item" :class="tabIndex==='1'?'active':''" @click="tabIndex='1'">
                    <!-- 划转记录 -->
                    划转记录
                </div>
            </div>
            <div class="content">
                <div class="first-content" v-show="tabIndex==='0'">
                    <div class="switch-assets">
                        <div class="left-box">
                            <div class="left-box-div">
                                <div>
                                    <span class="lable">从</span><!-- 从 -->
                                    <span>{{accountType===1?'币币账户':'OTC账户'}}</span><!-- 币币账户> 节点账户-->
                                </div>
                                <div>
                                    <span class="lable">到</span> <!-- 到 -->
                                    <span>{{accountType===-1?'币币账户':'OTC账户'}}</span><!-- 币币账户 >节点账户-->
                                </div>
                            </div>
                        </div>
                        <div class="right-box">
                            <div>
                                <div class="rotate-icon" @click="rotate">
                                    <div :class="addAnimation?'rotate':''"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-num">
                        <!-- 请输入划转数量 (\.\d{1,3})?$-->
                        <input type="text" @keyup="inputData" v-model="modelNumber" placeholder="请输入划转数量" />
                        <el-select v-model.trim="currencySymbol" size="small">
                            <el-option v-for="item in options" :key="item.currencyId" :label="item.symbol" :value="item.currencyId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="account-num">
                        <!-- 币币账户 ||  节点账户 || 可用余额：-->
                        <span>{{accountType===1?'币币账户':'OTC账户'}}:</span>
                        <span>{{balance | filtersNum}} {{currencySymbol}}</span>
                        <label>可用余额:<span>{{modelNumber|filterModelNumber}} {{currencySymbol}}</span></label>
                    </div>
                    <div class="slider-otc">
                        <el-slider v-model="sliderValue" @input="sliderComputed" :marks="marks" :format-tooltip="formatTooltip"></el-slider>
                    </div>
                    <div class="transfer-otc">
                        <!-- 划转 -->
                        <button @click="transfer" type="button" :disabled="isDisabledTwo">划转</button>
                    </div>
                </div>
                <div class="second-content" v-show="tabIndex==='1'">
                    <ul class="second-content-head">
                        <!-- 时间 -->
                        <li>时间</li>
                        <!-- 币种 -->
                        <li>币种</li>
                        <!-- 数量 -->
                        <li>数量</li>
                        <!-- 类型 -->
                        <li>类型</li>
                    </ul>
                    <el-scrollbar style="width: 100%;height:93%;" v-if="transferList.length>0">
                        <ul>
                            <li v-for="(item,index) in transferList" :key="index" class="lists">
                                <div class="fl08">{{item.createTime | filterTime}}</div>
                                <div class="fl05 center">{{item.currencyName}}</div>
                                <div class="fl06 right">{{item.tradeQty | filtersNum}}</div>
                                <div class="right">{{item.tradeType===-1?'转入':'转出'}}</div>
                            </li>
                        </ul>
                    </el-scrollbar>
                    <div v-if="transferList.length===0" class="no-data">暂无数据</div>
                </div>
            </div>
            <div class="close-assets el-icon-close" @click="closeAssets"></div>
        </div>
    </div>
</template>

<script>
    import { subStringNum,formatTime } from "../../utils/utils";
    import bigDecimal from "js-big-decimal";
    import otcApi from "../../api/otcApi";
    export default {
        props: {
            transferDialog: {
                type: Boolean,
                default:false
            }
        },
        data() {
            return {
                addAnimation: false,
                tabIndex: "0",
                marks:{0:'0', 25: '25%', 50:'50%', 75:'75%', 100:'100%'},
                // 账户类型 1币币账户到节点账户 -1聚变账户到币币账户
                accountType:1,
                options:[{currencyId:3,symbol:'USDT'}],
                balance:0,
                modelNumber: '',
                currencyId:3,
                currencySymbol:'USDT',
                sliderValue:0,
                isDisabledTwo:false,
                transferList:[],
            };
        },
        watch: {
            tabIndex(val){
                if(val==='1'){
                    this.getTransferList();
                }
            }
        },
        mounted() {

        },
        methods: {
            inputData(){
                let ifNum = (this.modelNumber.toString()).split('.')[1];
                if(ifNum&&ifNum.length>3){
                    this.modelNumber = Number(this.modelNumber.split('.')[0]+'.'+ifNum.substr(0,3));
                }
            },
            //划转记录
            getTransferList(){
                let par={
                    pageNum: 1,
                    pageSize: 20
                };
                otcApi.otcTranferRecord(par).then(res => {
                    if (res.code === 0) {
                        this.transferList = res.data.list;
                    }else{
                        this.$message.error(res.message);
                    }
                });
            },
            // 切换账户
            rotate() {
                this.addAnimation=true;
                // 账户类型 1币币账户到节点账户 -1节点账户到币币账户
                this.accountType = this.accountType===1?-1:1;
                this.modelNumber="";
                this.sliderValue = 0;
                setTimeout(() => {
                    this.addAnimation=false;
                }, 400);
            },
            // 资金划转
            transfer() {
                if (!this.modelNumber) {
                    this.$message.error('请输入划转数量');//请输入划转数量
                    return;
                }
                if (this.modelNumber === 0) {
                    this.$message.error('转账数量不能为0，请输入转账数量');//转账数量不能为0，请输入转账数量
                    return;
                }
                if (isNaN(this.modelNumber)) {
                    this.$message.error('请输入正确的数量');//请输入正确的数量
                    return;
                }
                let parmas = {
                    optType: this.accountType, //'操作方向：1入账;-1出账'
                    amount: parseFloat(this.modelNumber), //划转数量
                    currencyId:this.currencyId,
                    currencyName:"USDT",
                };
                this.isDisabledTwo = true;
                otcApi.otcTranfer(parmas).then(res => {
                    this.isDisabledTwo = false;
                    this.modelNumber="";
                    this.sliderValue=0;
                    if (res && res.code === 0) {
                        this.$message.success('划转成功');
                        this.getFusionAccount();
                        this.$emit("uploadData","false");
                    }else if(res.code === 10204){
                        this.$message.error('最少划转额度为0.001');//最少划转额度为
                    }else if(res.code === 26000){
                        this.$message.error('可用余额不足');//可用余额不足
                    }else {
                        this.$message.error(res.message);
                    }
                });
            },
            // 关闭弹框
            closeAssets() {
                this.tabIndex='0';
                this.modelNumber="";
                this.sliderValue = 0;
                this.$emit("close-dialog");
            },
            sliderComputed(val){
                let num = subStringNum(bigDecimal.multiply(this.balance,val/100),3);
                this.modelNumber=Number(num)===0?'':num;
            },
            formatTooltip(val){
                return val+'%'
            },
        },
        filters: {
            filterTime(time) {
                return formatTime(time, "/");
            },
            filterModelNumber(val){
                return bigDecimal.divide(val, 20, 3); // quotient = 11.25
            },
            filtersNum(val){
                let value = Number(val) || 0;
                if(value%1!==0){
                    return subStringNum(value, 3);
                }else{
                    return value
                }
            }
        }
    };
</script>
<style scoped lang="less">
    .game-assets-otc {
        width: 100%;height: 100%;position: fixed;
        background: rgba(0, 0, 0, 0.6);
        top: 0;left: 0;
        padding-top: 140px;
        z-index: 999;
        .dialog-box {
            width: 500px;margin: 0 auto;position: relative;background-color:#F8FBFF;
            overflow: hidden;border-radius: 5px;height: 500px;
            .dialog-title {
                height: 50px;line-height:50px;padding-left: 40px;text-align: left;
                background: #fff;border-bottom: 1px solid #eee;color: #333;
            }
            .tab-items {
                padding-top:10px;width: 100%;height:50px;display: flex;border-bottom: 1px solid #eee;
                .item {
                    height: 100%;flex: 1;text-align: center;
                    cursor: pointer;line-height: 50px;
                    position: relative;font-size: 16px;color:#666;
                }
                .active {
                    color: #388CFF;border-bottom: 2px solid #388CFF;
                }
            }
            .content {
               width: 100%;height: auto;
                .first-content {
                    padding: 0 40px 0 40px;
                    .switch-assets {
                        height: 54px;
                        position: relative;
                        margin: 30px 0 0;
                        border-radius: 10px;
                        overflow: hidden;
                        padding: 10px 0 0 15px;
                        background: #F5F5F5;
                        .left-box {
                            .left-box-div {
                                display: flex;color: #333;font-size: 16px;margin-top:12px;
                                div {
                                    flex: 1;
                                    color: #333333;
                                    font-size: 19px;
                                    &:last-child{
                                        margin-left: 85px;
                                    }
                                }
                                .lable {
                                    color:#999999;
                                    font-size: 19px;
                                    width: 30px;
                                    margin-right: 15px;
                                }
                            }

                        }
                        .right-box {
                            position: absolute;top: 10px;right: 200px;width: 54px;height: 34px;padding: 4px 0;
                            > div {
                                width: 100%;height: 100%;border-left: 1px solid #e2e2e2;
                            }
                            .rotate-icon {
                                width: 54px;
                                height: 34px;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                                > div {
                                    width: 100%;
                                    height: 100%;
                                    background: url("../../assets/img/switch.png") no-repeat center;
                                }
                            }
                            .rotate {
                                transition: all 0.3s;
                                animation: rrotate 0.3s linear;
                            }
                            .rotates {
                                transition: all 0.3s;
                                animation: rrrotate 0.3s linear;
                            }
                            @keyframes rrotate {
                                from {
                                    transform: rotate(0);
                                }
                                to {
                                    transform: rotate(360deg);
                                }
                            }

                            @keyframes rrrotate {
                                from {
                                    transform: rotate(360deg);
                                }
                                to {
                                    transform: rotate(0);
                                }
                            }
                        }
                    }
                    .input-num {
                        width: 100%;
                        height: 50px;
                        border-radius: 5px;
                        margin-top: 30px;
                        background: #F5F5F5;
                        input {
                            width: 70%;
                            height: 100%;
                            line-height: 50px;
                            box-shadow:0 0 0 0 #F5F5F5;
                            margin-left: 18px;
                            font-size: 18px;
                            border: none;
                            background: #F5F5F5;
                        }
                    }
                    .account-num{
                        margin-top: 10px;font-size: 14px;color: #666;
                        label{
                            float: right;
                        }
                    }
                    .transfer-otc {
                        margin: 50px auto 0;
                        button{
                            width:100%;border: none;color: #fff;text-align: center;
                            border-radius: 2px;background:rgba(56,140,255,0.5);cursor: pointer;
                            font-size: 16px;height: 40px;line-height: 40px;
                            &:disabled{
                                border-color: #a0cfff;
                                cursor: no-drop;
                            }
                        }
                    }
                    .agree{
                        width: 100%;margin-top:15px;color:#596A7A;font-size:12px;
                        .el-icon-warning{
                            font-size: 18px;
                        }
                        span{
                            float: left;
                        }
                        .fl{
                            width: 15px;
                        }
                        .fr{
                            width: 375px;
                            margin-left: 5px;
                        }
                        .treaty{
                            color:#388CFF;cursor: pointer;
                        }
                        .img{
                            width: 15px;
                            height: 15px;
                            vertical-align: -3px;
                            margin-right: 5px;
                        }
                        .agreement {
                            background: url("../../assets/img/checked.png") no-repeat center;
                            background-size: contain;
                        }
                        .unagreement {
                            background: url("../../assets/img/uncheck.png") no-repeat center;
                            background-size: contain;
                        }
                    }
                }
                .second-content {
                    height:390px;position: relative;overflow: hidden;
                    .second-content-head{
                        height: 40px;line-height: 40px;display: flex;color: #999;
                        border-bottom: 1px solid #eee;
                        li{
                            flex: 1;text-align: center;
                        }
                    }
                    .lists {
                        color:rgba(255,255,255,0.5);
                        font-size: 12px;
                        padding:8px 0;
                    }
                    .no-data{
                        font-size: 12px;
                        color: #c5cfd5;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(50%);
                        border: 0 none !important;
                    }
                }
            }
        }
        .close-assets {
            cursor: pointer;
            width: 19px;
            height: 20px;
            position: absolute;
            right:30px;
            top:18px;
            font-size: 18px;
            color: #333;
        }
    }
</style>
