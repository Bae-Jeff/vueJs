<template>
  <div class="product-detail">
    <van-nav-bar
      class="sticky"
      title="상품상세"
      @click-left="$router.go(-1)"
      left-text=""
      left-arrow
    >
      <template #right>
        <van-icon name="share-o" />
      </template>
    </van-nav-bar>

    <div class="product-info-wrap inset">
      <van-swipe :autoplay="30000" class="product-image-slide">
        <van-swipe-item
          v-for="(image, index) in product.productImages"
          :key="index"
        >
          <img v-lazy="image.productImage" class="product-image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="product-topics align-left inset">
      <div class="product-category">
        {{ "» " + product.categoryAppNameFull }}
      </div>
      <div class="product-title">
        {{ product.productName }}
      </div>
      <van-row class="product-info">
        <van-col span="8"> </van-col>
        <van-col span="8"></van-col>
        <van-col span="8" class="align-right">
          {{
            $tools.numberFormat(
              product.productPriceSale ?? product.productPrice
            )
          }}
        </van-col>
      </van-row>
    </div>

    <van-tabs
      v-model="detailTab"
      sticky
      :offset-top="80"
      class="product-description inset"
    >
      <van-tab title="상세설명">
        <div>
          <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </div>
      </van-tab>
      <van-tab title="리뷰">
        <div class="product-review-wrap">
          <ProductReviewRow
            v-for="i in 10"
            :review="review"
            :key="i"
          ></ProductReviewRow>
        </div>
      </van-tab>
    </van-tabs>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-button
        color="#6e6d71"
        type="warning"
        @click="selectOption"
        text="장바구니"
        badge="12"
      />
      <van-goods-action-button
        color="#ea6746"
        type="danger"
        @click="selectOption"
        text="바로구매"
      />
    </van-goods-action>
    <van-action-sheet
      class="product-option-picker"
      v-model="optionPicker.show"
      @cancel="onOptionPickerClose"
      title="주문 상품 선택"
    >
      <div class="product-option-wrap" style="height: calc(90vh - 48px)">
        <van-collapse v-model="activeOptionType" accordion>
          <van-collapse-item
            :title="optionPicker.options.base.label"
            name="base"
            ref="baseOptions"
            class="option-type-part"
            v-if="optionPicker.options.base"
          >
            <!-- <div class="option-section inset"> -->
            <!-- <div class="option-section-title">{{ optionPicker.options.base.label }}</div> -->
            <div class="option-list base">
              <van-row
                class="option-row"
                v-for="(opt, i) in optionPicker.options.base.list"
                :key="opt.optionCode"
              >
                <van-col span="18" class="option-name">
                  <p>
                    <span class="option-no">{{ i + 1 }}</span>
                    <span class="option-name-text">{{ opt.optionName }}</span>
                  </p>
                  <div class="option-status">
                    <span
                      class="option-price"
                      :class="{ strip: +opt.optionPriceSale !== 0 }"
                    >
                      {{ $tools.numberFormat(opt.optionPrice) }}
                    </span>
                    <span
                      class="option-price-sale"
                      v-if="+opt.optionPriceSale !== 0"
                    >
                      {{ $tools.numberFormat(opt.optionPriceSale) }}
                    </span>
                  </div>
                </van-col>
                <van-col span="6" class="option-image-area">
                  <img
                    :src="opt.optionImages[0].optionImageThum"
                    v-if="opt.optionImages[0]"
                    class="option-image"
                  />
                </van-col>
              </van-row>
            </div>
            <!-- </div>  -->
          </van-collapse-item>
          <van-collapse-item
            :title="optionPicker.options.etc.label"
            name="etc"
            class="option-type-part"
            v-if="optionPicker.options.etc"
          >
            <!-- <div class="option-section inset" > -->
            <!-- <div class="option-section-title">{{ optionPicker.options.etc.label }}</div> -->
            <div class="option-list etc">
              <van-row
                class="option-row"
                v-for="(opt, i) in optionPicker.options.etc.list"
                :key="opt.optionCode"
              >
                <van-col span="18" class="option-name">
                  <p>
                    <span class="option-no">{{ i + 1 }}</span>
                    <span class="option-name-text">{{ opt.optionName }}</span>
                  </p>
                  <div
                    class="option-status"
                    v-if="opt.optionPrice + opt.optionPriceSale == 0"
                  >
                    <span class="option-price"> 무료 </span>
                  </div>
                  <div class="option-status" v-else>
                    <span
                      class="option-price"
                      :class="{ strip: +opt.optionPriceSale !== 0 }"
                    >
                      {{ $tools.numberFormat(opt.optionPrice) }}
                    </span>
                    <span
                      class="option-price-sale"
                      v-if="+opt.optionPriceSale !== 0"
                    >
                      {{ $tools.numberFormat(opt.optionPriceSale) }}
                    </span>
                  </div>
                </van-col>
                <van-col span="6">
                  <img
                    :src="opt.optionImages[0].optionImageThum"
                    v-if="opt.optionImages[0]"
                    class="option-image"
                  />
                </van-col>
              </van-row>
              <!-- </div>  -->
            </div>
          </van-collapse-item>
          <van-collapse-item
            title="기타옵션"
            name="input"
            class="option-type-part"
            v-if="optionPicker.options.input || optionPicker.options.date"
          >
            <van-form validate-first>
              <div
                v-for="opt in optionPicker.options.input.list"
                :key="opt.optionCode"
              >
                <van-field
                  v-model="optionPicker.picked.input[opt.optionCode]"
                  :name="opt.optionName"
                  :label="opt.optionName"
                  :placeholder="opt.optionName + ' 입력'"
                  :rules="[{ required: true, message: '필수 입력항 입니다' }]"
                />
              </div>
              <div
                v-for="opt in optionPicker.options.date.list"
                :key="opt.optionCode"
              >
                <van-field
                  readonly
                  clickable
                  :name="opt.optionName"
                  :value="optionPicker.picked.input[opt.optionCode]"
                  :label="opt.optionName"
                  placeholder="시간선택"
                  @click="showOptionDatePicker(opt.optionCode)"
                />
              </div>
              <van-calendar
                v-model="optionPicker.datePicker"
                :min-date="optionMinDate"
                :max-date="optionMaxDate"
                @confirm="optionDateOnConfirm"
              />
            </van-form>
          </van-collapse-item>
          <!-- <van-collapse-item :title="optionPicker.options.date.label" name="date" class="option-type-part" v-if="optionPicker.options.date">
                        
                    </van-collapse-item> -->
        </van-collapse>
      </div>
      <van-goods-action safe-area-inset-bottom>
        <van-goods-action-button
          color="#6e6d71"
          type="warning"
          @click="selectOption"
          text="장바구니"
          badge="12"
        />
        <van-goods-action-button
          color="#ea6746"
          type="danger"
          @click="selectOption"
          text="바로구매"
        />
      </van-goods-action>
    </van-action-sheet>
  </div>
</template>
<script>
import ProductReviewRow from "./ProductReviewRow.vue";
// import ProductOptionRow from './ProductOptionRow.vue';
export default {
  name: "ProductDetail",
  data() {
    return {
      activeOptionType: "base",
      detailTab: 0,
      product: {},
      optionPicker: {
        show: false,
        options: {},
        datePicker: false,
        datePickerTarge: "",
        picked: {
          base: {},
          etc: {},
          input: {},
        },
      },
      review: {
        title: "너무 좋아요~ ! 강추",
        content:
          "처음 구매했는데 배송도 빠르고 품질도 너무 좋아요. 다음에 또 구매할거 같아요. 대박나세요.",
        star: 5,
        productName: "고속무선충전기",
        productImage: "",
        optionName: "길이: 2m, 색상:레드",
        optionImage: "https://img01.yzcdn.cn/vant/apple-1.jpg",
        createUser: "강하나",
        createDate: "2023-07-13",
      },
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  components: {
    ProductReviewRow,
    // ProductOptionRow
  },
  methods: {
    selectOption() {
      this.optionPicker.show = true;
      // this.$refs.baseOptions.toggle = true
    },
    showOptionDatePicker(optCode) {
      console.log(optCode);
      this.optionPicker.datePickerTarget = optCode;
      this.optionPicker.datePicker = true;
    },
    optionDateOnConfirm(date) {
      // this.value = time;
      this.optionPicker.datePicker = false;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      // const hour = String(date.getHours()).padStart(2, '0');
      // const minute = String(date.getMinutes()).padStart(2, '0');
      // const second = String(date.getSeconds()).padStart(2, '0');
      const pickedDate = `${year}-${month}-${day}`;
      // const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      this.optionPicker.picked.input[this.optionPicker.datePickerTarget] =
        pickedDate;
      console.log(this.optionPicker);
    },
    onOptionPickerClose(e) {
      console.log(e);
    },
    onOptionTuned(e) {
      console.log(e);
    },
  },
  created() {
    // const that = this;
    console.log(this.productNo);

    this.$request({
      method: "GET",
      url: "/api/product/getProductInfo?productNo=" + this.productNo,
    }).then((response) => {
      const { bool, data, msg } = response;
      console.log(bool, data, msg);
      this.product = data;
      for (let optType in data.productOptions) {
        var curOptions = data.productOptions[optType].options.map((option) => {
          option.pickedQty = 0;
          return option;
        });
        console.log(curOptions);
        this.optionPicker.options[optType] = {
          label: data.productOptions[optType].label,
          list: curOptions,
        };
      }
    });
    console.log(this.optionPicker);
  },
  computed: {
    productNo() {
      return this.$route.params.productNo;
    },
    optionMinDate() {
      return new Date();
    },
    optionMaxDate() {
      // return new Date(2023, 10, 30);
      const now = new Date();
      const maxDate = new Date(
        now.getFullYear(),
        now.getMonth() + 6,
        now.getDate()
      );
      return maxDate;
      // const yy = maxDate.getFullYear();
      // const mm = String(maxDate.getMonth() + 1).padStart(2, '0');
      // const dd = String(maxDate.getDate()).padStart(2, '0');

      // const formattedDate = `${yy}-${mm}-${dd}`;
      // console.log(formattedDate);
    },
  },
};
</script>
<style scoped>
.van-goods-action {
  z-index: 2;
}

.product-image-slide .product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  height: 240px;
  object-position: center;
}

.product-category {
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  margin: 10px 0px;
}

.product-info {
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
::v-deep .product-option-picker {
  max-height: 90%;
}
::v-deep .van-collapse-item__content {
  color: #555555 !important;
}
.option-name {
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0px;
  border-right: 1px solid #ededed;
  color: #555555 !important;
}
.option-no {
  display: inline-block;
  width: 26px;
  text-align: center;
  margin-right: 7px;
  background: #ededed;
  border-radius: 3px;
}
/* .option-row {
    border-bottom: 1px dashed #dcdcdcab;
    padding: 6px 0px;
}
.option-row:last-child {
    border: 0px;
} */

.option-row {
  background: #f7fdff;
  margin-bottom: 6px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  padding: 0px 8px;
}
.option-image-area {
  margin: 5px 0px;
}
.option-status {
  text-align: right;
  font-size: 14px;
  font-weight: 500;
}
.option-image {
  width: calc(100% - 10px);
  height: 75px;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  border-radius: 5px;
  margin: 2px 5px;
  margin-right: 0px;
  margin-bottom: -5px;
}
.option-section-title {
  height: 45px;
  line-height: 45px;
  text-align: left;
  border-bottom: 1px solid #dcdcdc;
}
.option-list {
  /* max-height: calc( 90vh - 154px); */
  max-height: calc(100vh - 520px);
  overflow: auto;
}
.option-price,
.option-price-sale {
  margin-right: 10px;
  font-weight: 700;
  font-size: 15px;
  background: #f1f1f1;
  min-width: 55px;
  display: inline-block;
  padding: 0px 8px;
  border-radius: 10px;
}
.option-price.strip {
  text-decoration: line-through;
  font-weight: 400;
  font-size: 13px;
}
.option-price-sale {
  background: #d8f8ff !important;
}
::v-deep .option-type-part .van-cell__title {
  text-align: left;
  font-size: 15px;
  font-weight: 600;
}
::v-deep .van-collapse-item__content {
  padding: 12px 16px;
  color: #969799;
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  max-height: calc(100vh - 520px);
}
</style>
