<template>
  <div id="app">
    <van-nav-bar safe-area-inset-top />
    <van-overlay :show="$store.state.isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="block">Loading..</div>
      </div>
    </van-overlay>
    <router-view safe-area-inset-bottom />
    <van-tabbar v-model="activeMainTab" @change="onMainTabChange" safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">검색</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="cart-o">장바구니</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="contact">마이페이지</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeMainTab: 0,
      showLoginForm: false,
    }
  },
  computed: {
  },
  methods: {
    onMainTabChange() {
      console.log(11);
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


.van-tabs__line {
  background-color: #ea6746 !important;
}
</style>
