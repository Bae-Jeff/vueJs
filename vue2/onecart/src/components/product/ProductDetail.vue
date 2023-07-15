<template>
    <div class="product-detail">
        <van-nav-bar class="sticky" title="상품상세" @click-left="$router.go(-1);" left-text="" left-arrow>
            <template #right>
                <van-icon name="share-o" />
            </template>
        </van-nav-bar>

        <div class="product-info-wrap inset">
            <van-swipe :autoplay="30000" class="product-image-slide">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" class="product-image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="product-topics align-left inset">
            <div class="product-category">
                › 휴대폰 변기기
            </div>
            <div class="product-title">
                가나다라 마바사아 자차카타파하
            </div>
            <van-row class="product-info-state">
                <van-col span="8" class="product-rate">
                    <van-icon name="star" />
                    4.6
                </van-col>
                <van-col span="8">리뷰 : 2.3 K</van-col>
                <van-col span="8">판매 : 4.5 K</van-col>
            </van-row>
        </div>

        <van-tabs v-model="activeBody" sticky :offset-top="80" class="product-description inset pad-bottom">
            <van-tab title="상세설명">
                <div>
                    <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
                    <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
                    <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
                </div>
            </van-tab>
            <van-tab title="리뷰">
                <div class="product-review-wrap">
                    <reviewRow v-for="i in 10" :review="review" :key="i"></reviewRow>
                </div>
            </van-tab>
        </van-tabs>
        <van-goods-action safe-area-inset-bottom>
            <van-goods-action-icon icon="chat-o" text="문의" />
            <van-goods-action-icon icon="like-o" text="즐겨찾기" />
            <van-goods-action-button color="#6e6d71" type="warning" @click="selectOption" text="장바구니" badge="12" />
            <van-goods-action-button color="#ea6746" type="danger" @click="selectOption" text="바로구매" />
        </van-goods-action>
    </div>
</template>
<script>
import reviewRow from './reviewRow.vue';
export default {
    name: 'ProductDetail',
    data() {
        return {
            review: {
                title: "너무 좋아요~ ! 강추",
                content: "처음 구매했는데 배송도 빠르고 품질도 너무 좋아요. 다음에 또 구매할거 같아요. 대박나세요.",
                star: 5,
                productName: "고속무선충전기",
                productImage: "",
                optionName: "길이: 2m, 색상:레드",
                optionImage: "https://img01.yzcdn.cn/vant/apple-1.jpg",
                createUser: "강하나",
                createDate: "2023-07-13"
            },
            activeBody: 0,
            showOpionPicker: false,
            images: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ],
        }
    },
    components: {
        reviewRow
    },
    methods: {
        selectOption() {
            this.showOpionPicker = true
        }
    },
    created() {
        // const that = this;
        this.$store.commit('isLoading', true);
        console.log(this.productNo);
        this.$request({
            method: 'GET',
            url: '/api/product/getProductInfo?productNo=' + this.productNo,
        })
            .then(response => {
                const { bool, data, msg } = response;
                console.log(bool, data, msg);
            })

    },
    computed: {
        productNo() {
            return this.$route.params.productNo;
        },
    },
}
</script>
<style scoped>
.van-goods-action {
    z-index: 2;
}

.product-image-slide {
    height: 230px;
}

.product-image-slide .product-image {
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.product-category {
    font-size: 13px;
    height: 20px;
    line-height: 20px;
    margin: 10px 0px;
}

.product-info-state {
    border-top: 1px solid #dcdcdc6e;
    padding-top: 4px;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
}

.product-title {
    text-align: left;
    font-weight: 700;
    font-size: 18px;
    height: 40px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 7px 0;
}

.product-description {
    margin-top: 30px;
}

::v-deep .product-description .van-sticky.van-sticky--fixed {
    margin: 0 16px;
    overflow: hidden;
    border-radius: 8px;
    z-index: 1;
}

::v-deep .product-description .van-tabs__wrap {
    padding-bottom: 10px;
}

::v-deep .product-description .van-tabs__wrap .van-tabs__line {
    width: 45%;
}

.product-description img {
    max-width: 100%;
}

.product-rate .van-icon {
    color: #ffae03;
}
</style>