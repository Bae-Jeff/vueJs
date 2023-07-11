import Vue from "vue";
import Vuex from "vuex";
import { Toast } from 'vant'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    showLoading() {
      this.state.isLoading = true;
      var that = this;
      setTimeout(function () {
        that.state.isLoading = false;
        Toast.fail('서버 통신 에러')
      }, 3000);
    },
    hideLoading() {
      this.state.isLoading = false;
    }
  },
  actions: {

  },
  modules: {

  },
});
