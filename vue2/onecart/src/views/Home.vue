<template>
  <div class="home">
    <van-nav-bar class="sticky" @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <img src="../assets/logo-header.png" class="nav-bar-logo-image">
      </template>
      <template #right>
        <router-link to="/search">
          <van-icon name="smile-comment-o" size="18" badge="9" @click="showSearchForm" />
        </router-link>
      </template>
    </van-nav-bar>
    <van-swipe :autoplay="30000" class="main-slide inset">
      <van-swipe-item v-for="(slider, index) in sliders" :key="index">
        <div v-if="slider.bannerLink">
          <a href="slider.bannerLink">
            <img v-lazy="slider.bannerImageM" class="main-swipe-image" />
          </a>
        </div>
        <div v-else>
          <img v-lazy="slider.bannerImageM" class="main-swipe-image" />
        </div>

      </van-swipe-item>
    </van-swipe>

    <!-- <van-sticky :offset-top="50"> -->
    <van-tabs v-model="categoryActive" class="main-category-wrap pad-bottom" safe-area-inset-bottom>
      <van-tab v-for="(category, index) in  categories " :key="index">
        <template #title>
          <div class="category-icon" v-if="category.categoryIcon">
            <van-icon :name="category.categoryIcon" />
          </div>
          <div class="category-icon" v-if="category.categoryImage">
            <img :src="item.categoryImage">
          </div>
          <div class="category-title">{{ category.categoryAppName }}</div>
        </template>
        <div class="product-list">
          <van-grid :gutter="10" :column-num="2" v-if="category.products.data">
            <van-grid-item v-for="(item, index) in category.products.data" :key="index" class="product-card">
              <product-block :product="item" />
            </van-grid-item>
          </van-grid>
          <van-empty v-if="category.products.data.length < 1" class="custom-image" image="search"
            description="현재 카테고리에 상품이 없습니다." />
        </div>
      </van-tab>
    </van-tabs>
    <!-- </van-sticky> -->
  </div>
</template>

<script>
import { Notify, Toast } from 'vant';
import ProductBlock from "@/components/product/ProductBlock.vue";
export default {
  name: "Home",
  components: { ProductBlock },
  data() {
    return {
      categoryActive: 0,
      categories: [],
      active: 0,
      sliders: [],
    };
  },
  created() {
    this.$request({
      method: 'GET',
      url: '/api/main',
    })
      .then(response => {
        const { bool, data, msg } = response;
        console.log(bool, data, msg);
        this.sliders = data.slider
        this.categories = data.category
      })
  },
  methods: {
    showSearchForm() {

    },
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    onChange(index) {
      Notify({ type: 'primary', message: index });
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  },
};
</script>
<style scoped>
.nav-bar-logo-image {
  height: 26px;
}



.main-swipe-image {
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  height: 200px;
  object-position: center;
}


.main-category-wrap .category-icon {
  display: grid;
  height: 45px;
}

.main-category-wrap .category-title {
  font-size: 13px;
  margin-top: 4px;
}

::v-deep .product-card .van-grid-item__content {
  padding: 0px;
}

::v-deep .category-icon .van-icon {
  display: inline-block;
  background: #f0f0f0;
  width: 42px;
  margin: auto;
  border-radius: 3px;
  padding: 6px 5px;
  font-size: 30px;
}

::v-deep .main-category-wrap .van-tabs__wrap {
  height: 78px !important;
  margin-top: 6px;
  margin-bottom: 23px;
  position: sticky;
  z-index: 111;
  top: 40px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
}

::v-deep .product-list .van-grid-item__content {
  box-shadow: 0px 0px 6px 2px #00000012;
}
</style>