<template>
    <div class="message-box" style="width: 300px" v-if="setDialog">
        <div class="mask" @click="closeMack"></div>
        <div class="message-content">
            <img src="../../assets/img/close-icon.png" class="icon" @click="closeMack" alt="" />
            <h3 class="title">
               <span>{{tradeType===0?'买入':'卖出'}}设置</span>
            </h3>
            <div class="dialog-content">
                <ul class="dialog-message">
                    <li>
                        币种<label>USDT</label>
                    </li>
                    <li>
                        参考价格<label>13CNY</label>
                    </li>
                    <li>
                        价格CNY<label>
                        <el-input-number step="0.01" controls-position="right" v-model="form.price" :min="1" :max="10" size="mini" >
                        </el-input-number>
                    </label>
                    </li>
                    <li>
                        数量
                        <label>
                            <el-input style="width: 130px;" size="small" placeholder="请输入出售数量" v-model="form.num"></el-input>&nbsp; USDT
                        </label>
                    </li>
                    <li class="dialog-message-fr">
                        <label></label><label>可用：5000.36USDT <span @click="transferDialog=true">划转</span></label>
                    </li>
                    <li>
                        收款方式<label>
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="银行卡"></el-checkbox>
                            <el-checkbox label="支付宝"></el-checkbox>
                            <el-checkbox label="微信"></el-checkbox>
                        </el-checkbox-group>
                    </label>
                    </li>
                    <li>
                        手机验证码
                        <label>
                            <el-input size="small" placeholder="请输入手机验证码" v-model="form.code"></el-input>
                        </label>
                    </li>
                    <li>
                        是否在线
                        <label>
                            <el-switch
                                    v-model="form.online"
                                    active-text="是"
                                    inactive-text="否">
                            </el-switch>
                        </label>
                    </li>
                </ul>
                <div class="suffix-button">
                    <button>发布广告</button>
                </div>
            </div>
        </div>
        <Transfer :transferDialog="transferDialog" @close-dialog ='transferDialog=false'></Transfer>
    </div>

</template>

<script>
    import Transfer from './transferAssets'
    export default {
        components:{
            Transfer
        },
        props: {
            setDialog:{
                type:Boolean,
                default:false
            },
            tradeType:{
                type:Number,
                default:0
            },
            maskClosed:{
                type: Boolean,
                default:true
            },
            orderData:{
                type: Object,
                default:{}
            }
        },
        data(){
            return{
                transferDialog:false,
                form:{
                    price:'',
                    type:[],
                    num:'',
                    code:'',
                    online:true
                }
            }
        },
        methods:{
            closeMack(){
                this.$emit("close-dialog");
            }
        }
    }
</script>
<style scoped lang="less">
    @import './dialog.less';
    .dialog-content{
        padding:20px 25px;
        .dialog-message{
            color: #999;
            li{
                display: flex;justify-content: space-between;height: 45px;line-height: 45px;
                label{
                    color: #333;
                }
            }
            .dialog-message-fr{
                height: 40px;line-height:30px;width: 100%;font-size: 13px;
                label{
                    color: #555;
                    span{
                        color: #2E6EF6;margin-left:50px;cursor: pointer;margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
