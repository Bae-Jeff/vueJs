<template>
  <div class="product-row">
    <div class="product-image">
      <van-icon name="like-o" class="prorudct-ctrl-like" @click="likeProduct(11)" />
      <img :src="product.productImage" @click="showDetail(11)">
    </div>
    <div class="product-title" @click="showDetail()">{{ product.productName }}</div>
    <van-row>
      <van-col span="12" class="product-topics"></van-col>
      <van-col span="12" class="product-price align-right">{{ product.productPrice }}</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "ProductBlock",
  props: {
    product: Object,
  },
  methods: {
    showDetail() {
      this.$router.push("/product/" + this.product.productNo);
    },
    likeProduct() {

    }
  },
  created() {
    // console.log(this)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-image img {
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: 130px;
}

.prorudct-ctrl-like {
  font-size: 20px;
  font-weight: 800;
  position: absolute;
  right: 10px;
  top: 10px;
  background: #ffffff;
  padding: 4px;
  border-radius: 2px;
  box-shadow: 0px 0px 8px #00000030;
}

.product-title {
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 4px;
}

.product-price {
  font-weight: 500;
}
</style>
