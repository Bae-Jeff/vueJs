import Vue from "vue";
import Vuex from "vuex";
import { Toast } from "vant";
import request from "../util/request";
Vue.use(Vuex);
// eslint-disable-next-line
export default new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: {
      isLogin: false,
      token: localStorage.getItem("authToken") || null,
      userName: null,
      userId: null,
    },
  },
  mutations: {
    // 비동기 commit('SET_USER_LOGIN',params) 으로 호출
    IS_LOADING(state, show) {
      // console.log(show);
      state.isLoading = show;
      if (show) {
        var that = this;
        setTimeout(function () {
          if (that.state.isLoading) {
            that.state.isLoading = false;
            Toast.fail("서버 통신 에러");
          }
        }, 10000);
      }
    },
    SET_USER_LOGIN(state, userInfo) {
      console.log(state, userInfo);
      localStorage.setItem("authToken", userInfo.authToken);
    },
    SET_USER_LOGOUT(state) {
      localStorage.removeItem("authToken");
      state.userInfo = {
        isLogin: false,
        token: null,
        userName: null,
        userId: null,
      };
    },
  },
  actions: {
    // 동기 dispatch('login',params) 으로 호출
    login({ commit }, loginForm) {
      request({
        method: "POST",
        url: "/api/auth/login",
        data: {
          userId: loginForm.userId,
          userPw: loginForm.userPw,
        },
      }).then((response) => {
        const { bool, data, msg } = response;
        console.log(bool, data, msg);
        if (bool) {
          commit("SET_USER_LOGIN", data);
        } else {
          Toast.fail(msg);
        }
      });
    },
    logout({ commit }) {
      commit("SET_USER_LOGOUT");
    },
    setFavorite(option) {
      console.log(option);
    },
  },
  modules: {},
  getters: {
    //computed
  },
});
