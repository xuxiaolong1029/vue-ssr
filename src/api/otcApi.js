import fetch from "../http/fetch";
import { platform } from "os";
// OTC相关接口
export default {
  // 获取最新报价
  otcGetPrice(){
    return fetch.fetch("/otc/open/getPrice", {}, "post");
  },
  // 购买
  otcPayCoin(params){
    return fetch.fetch("/otc/trade/payCoin", params, "post");
  },
  // 获取币种资产
  otcAssetInfo(params){
    return fetch.fetch("/otc/trade/asset/assetInfo", params, "post");
  },
  // 获取划转记录
  otcTranferRecord(params){
    return fetch.fetch("/otc/trade/asset/tranferRecord", params, "post");
  },
  // 提交划转操作
  otcTranfer(params){
    return fetch.fetch("/otc/trade/asset/transfer", params, "post");
  },
  // 查询用户已绑定支付方式
  otcSelectWay(params){
    return fetch.fetch("/otc/trade/selectWay", params, "post");
  },
  // 添加银行卡设置
  otcAddBank(params){
    return fetch.fetch("/otc/trade/addBank", params, "post");
  },
  // 添加支付宝设置
  otcAddAlipay(params){
    return fetch.fetch("/otc/trade/addAli", params, "post");
  },
  // 上传图片
  otcUploadQr(params){
    return fetch.fetch("/otc/trade/uploadQr", params, "post");
  },
  // 删除支付方式
  otcDelPayWay(params){
    return fetch.fetch("/otc/trade/delPayWay", params, "post");
  },
  // 获取订单记录
  otcBuyAndSellRecord(params){
    return fetch.fetch("/otc/trade/buyAndSellRecord", params, "post");
  },
  // otc卖出操作
  otcSellOrder(params){
    return fetch.fetch("/otc/trade/sell", params, "post");
  },
  // 发送邮箱验证码
  otcSendEmailCode(params){
    return fetch.fetch("/otc/trade/sendEmailCode", params, "post");
  },
  // 发送手机验证码
  otcPhoneCode(params){
    return fetch.fetch("/otc/trade/phoneCode", params, "post");
  },
  // 修改认证信息
  otcAuthInfo(params){
    return fetch.fetch("/otc/trade/authInfo", params, "post");
  },
  // 查询OTC该用户的认证信息
  otcQueryInfo(params){
    return fetch.fetch("/otc/trade/queryInfo", params, "post");
  },

  otcTimeOut(params){
    return fetch.fetch("/otc/trade/timeOut", params, "post");
  },
};
