import fetch from "../http/fetch";
//获取计价货币
export const getQueryAccountCurrency = () =>
  fetch.fetch("/common/queryQuotedCurrency", "", "get");
//获取所有货币信息
export const getQueryCurrency = () =>
  fetch.fetch("/common/queryCurrency", "", "get");
//获取所有交易对信息
export const getQueryContract = () =>
  fetch.fetch("/common/queryContract", "", "get"); //queryContract  /queryContractIndex
//获取所有汇率信息
export const getExchangeRate = () =>
  fetch.fetch("/common/exchange/list", "", "get");
//获取所有货币价格
export const getExchangeCoins = () =>
  fetch.fetch("/common/exchange/coins", "", "get");
//获取所有交易对行情
export const getQueryIndicatorList = () =>
  fetch.fetch("/quot/queryIndicatorList", "", "get");
//获取用户信息
export const getUserInfo = () => fetch.fetch("/users/userInfo", "", "get");
// 逐笔成交

