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
    <van-swipe :autoplay="30000" class="main-slide">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="main-swipe-image" />
      </van-swipe-item>
    </van-swipe>

    <!-- <van-sticky :offset-top="50"> -->
    <van-tabs v-model="cateActive" class="main-cate-wrap pad-bottom" safe-area-inset-bottom>
      <van-tab v-for="(cate, index) in  category " :key="index">
        <template #title>
          <div class="cate-icon" v-if="cate.cateIcon">
            <van-icon :name="cate.cateIcon" />
          </div>
          <div class="cate-icon" v-if="cate.cateImage">
            <img :src="item.cateImage">
          </div>
          <div class="cate-title">{{ cate.cateName }}</div>
        </template>
        <div class="product-list">
          <van-grid :gutter="10" :column-num="2">
            <van-grid-item v-for="(item, index) in cate.cateItems.data" :key="index">
              <product-block :product="item.data" />
            </van-grid-item>
          </van-grid>
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
      cateActive: 0,
      category: [
        {
          cateName: "휴대폰",
          cateCode: "abcdef",
          cateImage: "",
          cateIcon: 'graphic',
          cateItems: {
            page: 1,
            limit: 9,
            searchKey: "",
            data: [
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }, {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }, {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }, {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              },

            ]
          }
        },
        {
          cateName: "자동차",
          cateCode: "abcdef",
          cateImage: "",
          cateIcon: 'logistics',
          cateItems: {
            page: 1,
            limit: 9,
            searchKey: "",
            data: [
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }
            ]
          }
        },
        {
          cateName: "생활",
          cateCode: "abcdef",
          cateImage: "",
          cateIcon: 'flower-o',
          cateItems: {
            page: 1,
            limit: 9,
            searchKey: "",
            data: [
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }
            ]
          }
        },
        {
          cateName: "레저",
          cateCode: "abcdef",
          cateImage: "",
          cateIcon: 'fire-o',
          cateItems: {
            page: 1,
            limit: 9,
            searchKey: "",
            data: [
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }
            ]
          }
        },

        {
          cateName: "수입식품",
          cateCode: "abcdef",
          cateImage: "",
          cateIcon: 'birthday-cake-o',
          cateItems: {
            page: 1,
            limit: 9,
            searchKey: "",
            data: [
              {
                productNo: 1,
                productName: "가나다라마바사아",
                productImage: "https://img01.yzcdn.cn/vant/apple-2.jpg",
              }
            ]
          }
        },
      ],
      active: 0,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
    };
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
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
}


.main-cate-wrap .cate-icon {
  display: grid;
  height: 45px;
}

.main-cate-wrap .cate-title {
  font-size: 13px;
  margin-top: 4px;
}

::v-deep .cate-icon .van-icon {
  display: inline-block;
  background: #f0f0f0;
  width: 42px;
  margin: auto;
  border-radius: 3px;
  padding: 6px 5px;
  font-size: 30px;
}

::v-deep .main-cate-wrap .van-tabs__wrap {
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