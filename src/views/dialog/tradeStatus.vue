<template>
  <div class="message-box" v-if="statusDialog">
    <div class="mask" @click="closeMack"></div>
    <div class="message-content">
      <img src="../../assets/img/close-icon.png" class="icon" @click="closeMack" alt="" />
      <h3 class="title">
        订单详情&nbsp;<span :style="{color:tradeType===0?'#0DA88B':'#EF5656'}">{{tradeType===0?'买入':'卖出'}}USDT</span>
      </h3>
      <div class="dialog-content">
        <ul class="order-message">
          <li>
            <label>订单号</label><span>{{orderData.orderNo}}</span>
          </li>
          <li>
            <label>订单状态</label><span>{{orderData.status}}</span>
          </li>
          <li>
            <label>订单金额(CNY)</label><span>754(7.62*200)</span>
          </li>
          <li>
            <label>交易用户</label><span>{{orderData.time}}</span>
          </li>
        </ul>
        <div class="suffix-order">
          <h3><span>可选支付方式</span><label><span>银行卡</span><span>支付宝</span><span>微信</span></label></h3>
          <div class="suffix-card-message">
            <ul>
              <li>姓名：褚志壮<label v-clipboard:copy="'褚志壮'" v-clipboard:success="onCopy">复制</label></li>
              <li>银行：中国银行 <span>支行：深圳宝安支行</span></li>
              <li>卡号：4454 5555 5555 5555 <label v-clipboard:copy="'4454 5555 5555 5555'" v-clipboard:success="onCopy">复制</label></li>
            </ul>
          </div>
          <div class="suffix-button">
            <button class="bg1" style="width: 100%;color: #fff;">已完成</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      statusDialog:{
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

      }
    },
    methods:{
      onCopy(){
        this.$message({
          type: 'success',
          message: '复制成功!'
        });
      },
      closeMack(){
        this.$emit("close-dialog");
      }
    }
  }
</script>
<style scoped lang="less">
  @import './dialog.less';
  .dialog-content{
    padding:20px 25px!important;
    .order-message{
      width:100%;color: #333333;
      border:1px solid rgba(238,238,238,1);
      li{
        height: 40px;line-height: 40px;border-top:1px solid rgba(238,238,238,1);
        &:nth-of-type(1){
          border-top:none;
        }
        label{
          height: 39px;padding-left: 20px;color: #333;font-size: 12px;
          display: inline-block;width: 130px;background-color:#F7F7F7;
        }
        span{
          display: inline-block;padding-left: 25px;font-size: 14px;
        }
      }
    }
    .suffix-order{
      padding-top:15px;padding-bottom:23px;
      h3{
        display: flex;justify-content: space-between;color:#333;font-size: 16px;
        label{
          display: flex;width: 200px;
          span{
            flex: 1;text-align: center;cursor: pointer;color: #aaa;
            &:hover{
              color: #2B6CF6;
            }
          }
        }
      }
      .suffix-card-message{
        display: flex;justify-content: space-between;
        ul{
          color:#333;padding:10px 0;font-size: 15px;
          li{
            line-height:32px;
            span{
              margin-left:20px;
            }
            label{
              color: #2B6CF6;margin-left: 5px;
            }
          }
        }
        p{
          width: 80px;height: 80px;margin-top: 15px;background-color: #888;
        }
      }
    }
  }
</style>
