<template>
    <van-row class="review-row">
        <van-col span="6" class="align-left">
            <div class="review-stars">
                <van-icon v-for="i in 5" :key="i" :name="i <= review.star ? 'star' : 'star-o'" />
            </div>
            <div class="option-image" v-if="review.optionImage || review.productImage">
                <img :src="review.optionImage ? review.optionImage : review.productImage">
            </div>
        </van-col>
        <van-col span="18">
            <div class="review-title">{{ review.title }}</div>
            <div class="review-content">{{ review.content }}</div>
            <div class="review-option">옵션: {{ review.optionName }}</div>
        </van-col>
    </van-row>
</template>
  
<script>
export default {
    name: "reviewRow",
    props: {
        review: Object
    }
}
</script>
  
<style scoped>
.review-row {
    border-bottom: 1px dashed #dcdcdc;
    padding: 10px 0px;
}

.review-row:last-child {
    border-bottom: 0px;
}

.review-stars {
    display: flex;
}

.review-stars .van-icon-star {
    color: #ff8917;
}

.review-stars .van-icon-star-o {
    color: #ff976a;
}

.review-title {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.review-content {
    text-align: left;
    font-size: 13px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.review-option {
    text-align: right;
    font-size: 12px;
    font-weight: 700;
    border-top: 1px solid #f3f3f3;
    margin-top: 10px;
    padding-top: 6px;
}

.product-review-wrap .option-image img {
    max-width: 70%;
    padding: 4%;
    box-shadow: 0px 0px 0px 1px #0000001a;
    border-radius: 1px;
    margin: 6px 3px 0px;
}
</style>