import router from "../router";
import axios from "axios";
import Vue from "vue";
let $vm = new Vue();

let axiosConfig = function(){
  /**
   *
   * 登陆拦截信息
   */
    // http request 请求拦截器，有token值则配置上token值
  axios.defaults.timeout = 10000;
  axios.interceptors.request.use(config => {
      // 配置不需要拦截的接口  绑定银行卡正式环境https://gw.coocon.co.kr/sol/gateway/acctnm_rcms_wapi.jsp
      // let currentUrl = config.url;
      // let unInterceptUrl = ["https://cs.citex.co.kr/api/index.php", "http://dev.coocon.co.kr/sol/gateway/acctnm_rcms_wapi.jsp"];
      // if (unInterceptUrl.indexOf(currentUrl) != -1) {
      //   return config;
      // } else {
      //   axios.defaults.headers.post["Content-Type"] =
      //     "application/json;charset=UTF-8"; //配置请求头信息。
      // }
      axios.defaults.headers.post["Content-Type"] ="application/json;charset=UTF-8"; //配置请求头信息。
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      let userToken = JSON.parse(
        localStorage.getItem("userToken") || "{}"
      );
      let AUTH_TOKEN = userToken.access_token;
      let TOKEN_TYPE = userToken.token_type;
      if (AUTH_TOKEN) {
          config.headers.common.Authorization = TOKEN_TYPE + " " + AUTH_TOKEN;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
  axios.interceptors.response.use(response => {
      return response;
    },error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            $vm.$toast.error("400 Bad Request");
            break;
          case 401:
            // 这里写清除token的代码
            localStorage.removeItem("userToken");
            try{
              if (router.currentRoute.fullPath.indexOf("?redirect") != -1) {
                router.replace({
                  path: "/login"
                });
              } else {
                router.replace({
                  path: "/login",
                });
              }
            }catch(e){
              router.replace({
                path: "/login",
              });
            }
            
            break;
          case 404:
            $vm.$toast.error("404");
            router.push({path:'/NotFound'})
            break;
          case 500:
            //$vm.$toast.error("服务器异常，请稍后再试");
            break;
          // case 502:
          //   $vm.$toast.error("服务器异常，请稍后再试");
          //   break;
        }
        return Promise.reject(error.response.data);
      }else{
        return Promise.reject(error);
      }
    }
  );

  /**
   * 路由登录拦截
   */
  router.beforeEach((to, from, next) => {
    let userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
    let AUTH_TOKEN = userToken.access_token;
    if (to.meta.requireAuth) {
      // 判断该路由是否需要登录权限
      if (AUTH_TOKEN) {
        next();
      } else {
        next({
          path: "/login",
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      next();
    }

    //已登录不允许跳转登录注册页面
    if (AUTH_TOKEN) {
      if (from.fullPath === "/login" && to.fullPath.indexOf("/modify/restSuccess") !== -1) {
        next({ path: "/personal/userinfo" });
      } else if (
        to.fullPath.indexOf("/login") !== -1 ||
        to.fullPath.indexOf("/register") !== -1 ||
        to.fullPath.indexOf("/restLoginPsw") !== -1
      ) {
        next({ path: "/home" });
      } else {
        next();
      }
    }
  });
};

export default {
  axiosConfig
};
