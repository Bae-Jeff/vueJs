import Vue from "vue";
import Vuex from "vuex";
import { Toast } from 'vant'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    isLoading(state, show) {
      // console.log(show);
      state.isLoading = show;
      if (show) {
        var that = this;
        setTimeout(function () {
          if (that.state.isLoading) {
            that.state.isLoading = false;
            Toast.fail('서버 통신 에러')
          }
        }, 10000);
      }
    }
  },
  actions: {

  },
  modules: {

  },
});
