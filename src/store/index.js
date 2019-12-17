import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { getExchangeCoins, getQueryIndicatorList, getUserInfo} from "../api/commonApi";

function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: '',
      exchangeCoinsList:[],
      //pageHeight:document.documentElement.clientHeight,
    },

    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data;
      },
      // 获取计价货币
      exchangeCoinsList(state, data) {
        state.exchangeCoinsList = data;
      },
    },

    actions: {
      //获取所有货币价格
      getExchangeCoins(context) {
        getExchangeCoins().then(data => {
          context.commit("exchangeCoinsList", data.result);
        });
      },
    }
  });
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    //console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
}

export default createStore
