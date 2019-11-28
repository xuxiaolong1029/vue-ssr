import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {getQueryAccountCurrency, getQueryCurrency, getQueryContract, getExchangeRate, getExchangeCoins, getQueryIndicatorList, getTime, getUserInfo} from "../api/commonApi";

const fetchBar = function() {
  return new Promise((resolve, reject) => {
    resolve('bar 组件返回 ajax 数据');
  });
};

function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: '',
      exchangeCoinsList:[]
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
      fetchBar({ commit }) {
        return fetchBar().then((data) => {
          commit('SET_BAR', data);
        }).catch((err) => {
          console.error(err);
        })
      },
      //获取所有货币价格
      getExchangeCoins(context) {
        getExchangeCoins().then(data => {
          context.commit("exchangeCoinsList", data.result);
        });
      },
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
}

export default createStore;
