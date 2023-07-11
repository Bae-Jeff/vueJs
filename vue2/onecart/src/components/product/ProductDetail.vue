<template>
    <div class="product-detail">
        <van-nav-bar title="상품상세" @click-left="$router.go(-1);" left-text="" left-arrow>
            <template #right>
                <van-icon name="like-o" />
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
        <div class="product-description inset pad-bottom">
            <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
            <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
            <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </div>

        <van-sku v-model="showOpionPicker" :sku="sku" :goods="goods" :goods-id="goodsId" :quota="quota"
            :quota-used="quotaUsed" :hide-stock="sku.hide_stock" :message-config="messageConfig" @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked" safe-area-inset-bottom />
        <van-goods-action safe-area-inset-bottom>
            <van-goods-action-icon icon="chat-o" text="문의" />
            <van-goods-action-icon icon="like-o" text="즐겨찾기" />
            <van-goods-action-button color="#6e6d71" type="warning" @click="selectOption" text="장바구니" badge="12" />
            <van-goods-action-button color="#ea6746" type="danger" @click="selectOption" text="바로구매" />
        </van-goods-action>
    </div>
</template>
<script>
export default {
    name: 'ProductDetail',
    data() {
        return {
            showOpionPicker: false,
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        v: [
                            {
                                id: '1', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img01.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img01.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
                            },
                            {
                                id: '1',
                                name: '蓝色',
                                imgUrl: 'https://img01.yzcdn.cn/2.jpg',
                                previewImgUrl: 'https://img01.yzcdn.cn/2p.jpg',
                            }
                        ],
                        largeImageMode: true, //  是否展示大图模式
                    }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                        id: 2259, // skuId
                        s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 100, // 价格（单位分）
                        stock_num: 110 // 当前 sku 组合对应的库存
                    }
                ],
                price: '1.00', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                messages: [
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '留言', // 留言名称
                        type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '1', // 是否必填 '1' 表示必填
                        placeholder: '', // 可选值，占位文本
                        extraDesc: ''  // 可选值，附加描述文案
                    }
                ],
                hide_stock: false // 是否隐藏剩余库存
            },
            goods: {
                // 数据结构见下方文档
            },
            messageConfig: {
                // 数据结构见下方文档
            },
            images: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ],
        }
    },
    components: {

    },
    methods: {
        selectOption() {
            this.showOpionPicker = true
        }
    },
    created() {
        // const that = this;
        this.$store.commit('showLoading');
        console.log(this.productNo);

        this.$request.get('/api/data').then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
        // this.$store.commit('hideLoading');
        // setTimeout(function () {
        //     that.$store.state.isLoading = false;
        // }, 1000)
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

.product-description img {
    max-width: 100%;
}

.product-rate .van-icon {
    color: #ffae03;
}
</style>