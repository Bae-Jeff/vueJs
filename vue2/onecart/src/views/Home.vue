<template>
  <div class="home">
    <van-nav-bar
      class="sticky"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <img src="../assets/logo-header.png" class="nav-bar-logo-image" />
      </template>
      <template #right>
        <router-link to="/search">
          <van-icon
            name="smile-comment-o"
            size="18"
            badge="9"
            @click="showSearchForm"
          />
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
    <van-tabs
      v-model="categoryActive"
      class="main-category-wrap pad-bottom"
      safe-area-inset-bottom
    >
      <van-tab v-for="(category, index) in categories" :key="index">
        <template #title>
          <div class="category-icon" v-if="category.categoryIcon">
            <van-icon :name="category.categoryIcon" />
          </div>
          <div class="category-icon" v-if="category.categoryImage">
            <img :src="item.categoryImage" />
          </div>
          <div class="category-title">{{ category.categoryAppName }}</div>
        </template>
        <div class="product-list">
          <van-grid :gutter="10" :column-num="2" v-if="category.products.data">
            <van-grid-item
              v-for="(item, index) in category.products.data"
              :key="index"
              class="product-card"
            >
              <product-block :product="item" />
            </van-grid-item>
          </van-grid>
          <van-empty
            v-if="category.products.data.length < 1"
            class="custom-image"
            image="search"
            description="현재 카테고리에 상품이 없습니다."
          />
        </div>
      </van-tab>
    </van-tabs>
    <!-- </van-sticky> -->
    <van-action-sheet
      v-model="$store.state.showLoginPop"
      :title="authFormData.type == 'login' ? '로그인' : '회원가입'"
      class="user-login-pop"
      @opened="onAuthPopOpen"
      @closed="onAuthPopClose"
    >
      <div class="login-wrap" v-if="authFormData.type == 'login'">
        <van-form
          @submit="onSubmitLogin"
          ref="authLoginForm"
          validate-trigger="onSubmitLogin"
          class="user-login-form"
        >
          <van-field
            v-model="authFormData.userId"
            name="아이디"
            label="아이디"
            autocomplete="off"
            placeholder="이메일"
            ref="userId"
            class="login-input-label"
            :rules="[{ required: true, message: '아이디를 입력하세요' }]"
          >
            <template #label style="text-align: center">
              <img src="@/assets/icons/user_id.svg" class="field-icon" />
            </template>
          </van-field>
          <van-field
            v-model="authFormData.userPw"
            type="password"
            name="비밀번호"
            label="비밀번호"
            placeholder="비밀번호"
            ref="userPw"
            class="login-input-label"
            :rules="[{ required: true, message: '비밀번호를 입력하세요' }]"
          >
            <template #label>
              <img src="@/assets/icons/user_pw.svg" class="field-icon" />
            </template>
          </van-field>
          <div style="margin: 15px; margin-bottom: 0px; padding-top: 25px">
            <van-button round block type="info" native-type="submit">
              로그인</van-button
            >
            <van-row class="user-acount-etc">
              <van-col span="12" class="align-left" @click="onChangeToJoin"
                >회원가입</van-col
              >
              <van-col span="12" class="align-right">비밀번호 찾기</van-col>
            </van-row>
          </div>
        </van-form>
      </div>
      <div class="join-wrap" v-if="authFormData.type == 'join'">
        <van-form
          @submit="onSubmitLogin"
          ref="authJoinForm"
          validate-trigger="onSubmitJoin"
          class="user-join-form"
        >
          <van-field
            v-model="authFormData.userId"
            name="아이디"
            label="아이디"
            placeholder="이메일"
            autocomplete="off"
            ref="userId"
            class="login-input-label"
            :rules="[{ required: true, message: '아이디를 입력하세요' }]"
          >
            <template #label style="text-align: center">
              <img src="@/assets/icons/user_id.svg" class="field-icon" />
            </template>
          </van-field>
          <van-field
            v-model="authFormData.userPw"
            type="password"
            name="비밀번호"
            label="비밀번호"
            placeholder="비밀번호"
            ref="userPw"
            class="login-input-label"
            :rules="[{ required: true, message: '비밀번호를 입력하세요' }]"
          >
            <template #label>
              <img src="@/assets/icons/user_pw.svg" class="field-icon" />
            </template>
          </van-field>
          <van-field
            v-model="authFormData.userPwAgain"
            type="password"
            name="비밀번호"
            label="비밀번호"
            placeholder="비밀번호 재확인"
            ref="userPw"
            class="login-input-label"
            :rules="[{ required: true, message: '비밀번호를 입력하세요' }]"
          >
            <template #label>
              <img src="@/assets/icons/user_pw.svg" class="field-icon" />
            </template>
          </van-field>
          <van-field
            v-model="authFormData.userName"
            name="이름"
            label="이름"
            autocomplete="off"
            placeholder="이름"
            ref="userName"
            class="login-input-label"
            :rules="[{ required: true, message: '이름을 입력하세요' }]"
          >
            <template #label style="text-align: center">
              <img src="@/assets/icons/user_name.svg" class="field-icon" />
            </template>
          </van-field>
          <van-field
            name="성별"
            label="성별"
            autocomplete="off"
            placeholder="성별"
            ref="userGender"
            class="login-input-label"
            :rules="[{ required: true, message: '성별을 선택 하세요' }]"
          >
            <template #label style="text-align: center">
              <img src="@/assets/icons/user_gender.svg" class="field-icon" />
            </template>
            <template #input>
              <van-radio-group
                v-model="authFormData.userGender"
                direction="horizontal"
              >
                <van-radio name="M">남</van-radio>
                <van-radio name="F">여</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="authFormData.confirmCode"
            name="인증코드"
            label="인증코드"
            placeholder="인증코드"
            autocomplete="off"
            ref="confrimCode"
            class="login-input-label"
            :rules="[
              { required: true, message: '이메일로 받으신 인증코드 입력' },
            ]"
          >
            <template #label>
              <img src="@/assets/icons/confirm_code.svg" class="field-icon" />
            </template>
            <template #button>
              <van-button
                size="small"
                type="primary"
                v-on:click.prevent="sendConfirmMail"
                :disabled="confirmConfig.isMailSend"
                >{{ confirmConfig.sendBtnText }}</van-button
              >
            </template>
          </van-field>
          <div style="margin: 15px; margin-bottom: 0px; padding-top: 25px">
            <van-button round block type="info" native-type="submit"
              >회원가입</van-button
            >
            <van-row class="user-acount-etc">
              <van-col span="12" class="align-left" @click="onChangeToLogin"
                >로그인</van-col
              >
              <van-col
                span="12"
                class="align-right"
                @click="authFormData.type = 'find'"
                >비밀번호 찾기</van-col
              >
            </van-row>
          </div>
        </van-form>
      </div>
      <div
        class="van-hairline--top-bottom"
        style="margin: 15px; display: flex"
      ></div>
      <div class="user-sns-area inset">
        <p class="user-sns-title">SNS 로그인</p>
        <van-row class="user-sns-btn kakao" @click="snsKakaoLogin">
          <van-col span="6" class="align-right sns-icon">
            <img src="@/assets/icons/icon_kakao.png" class="login-sns-icon" />
          </van-col>
          <van-col span="18" class="sns-text"
            ><span class="stick"></span> 카카오 로그인</van-col
          >
        </van-row>
        <van-row class="user-sns-btn naver" @click="snsNaverLogin">
          <van-col span="6" class="align-right sns-icon">
            <img src="@/assets/icons/icon_naver.png" class="login-sns-icon" />
          </van-col>
          <van-col span="18" class="sns-text"
            ><span class="stick"></span> 네이버 로그인</van-col
          >
        </van-row>
        <van-row class="user-sns-btn google">
          <van-col span="6" class="align-right sns-icon">
            <img src="@/assets/icons/icon_google.png" class="login-sns-icon" />
          </van-col>
          <van-col span="18" class="sns-text"
            ><span class="stick"></span> Google 로그인</van-col
          >
        </van-row>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
import ProductBlock from "@/components/product/ProductBlock.vue";

export default {
  name: "Home",
  components: { ProductBlock },
  data() {
    return {
      authFormData: {
        type: "login",
      },
      categoryActive: 0,
      categories: [],
      active: 0,
      sliders: [],
      confirmConfig: {
        isMailSend: false,
        sendBtnText: "인증번호 발송",
        timer: null,
        counter: 5,
        reset() {
          this.isMailSend = false;
          this.sendBtnText = "인증번호 발송";
          if (this.timer) {
            clearInterval(this.timer);
            this.counter = 5;
            this.timer = null;
          }
        },
      },
    };
  },
  created() {
    this.$request({
      method: "GET",
      url: "/api/main",
    }).then((response) => {
      const { bool, data, msg } = response;
      console.log(bool, data, msg);
      this.sliders = data.slider;
      this.categories = data.category;
    });
  },
  methods: {
    showSearchForm() {},
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    },
    onSubmitLogin() {
      console.log(this.authFormData);
    },
    onAuthPopOpen() {
      this.$nextTick(() => {
        if (this.$refs.authLoginForm !== undefined) {
          // this.$refs.authLoginForm.reset();
        }
        this.$refs.userId.focus();
      });
    },
    onAuthPopClose() {
      // console.log(this.$refs.authLoginForm);
      this.authFormData = {
        type: "login",
      };
    },
    onChangeToLogin() {
      this.authFormData.type = "login";
      this.$nextTick(() => {
        if (this.$refs.authLoginForm !== undefined) {
          // this.$refs.authLoginForm.reset();
          this.$refs.authLoginForm.resetValidation();
          console.log(this.authFormData);
        }
      });
    },
    onChangeToJoin() {
      this.authFormData.type = "join";
      this.$nextTick(() => {
        if (this.$refs.authJoinForm !== undefined) {
          // this.$refs.authJoinForm.reset();
          this.$refs.authJoinForm.resetValidation();
        }
      });
    },
    onChangeToFind() {
      this.$refs.authFindForm.resetValidation();
    },
    confirmCountDown() {
      console.log(this.confirmConfig.isMailSend);
      this.confirmConfig.timer = setInterval(() => {
        this.confirmConfig.sendBtnText = `(${this.confirmConfig.counter}초) 후 재발송 가능`;
        this.confirmConfig.counter--;
        if (this.confirmConfig.counter < 0) {
          clearInterval(this.confirmConfig.timer);
          this.confirmConfig.reset();
        }
      }, 1000);
    },
    sendConfirmMail() {
      if (!this.authFormData.userId) {
        this.$notify("아이디로 사용하실 이메일을 입력하세요");
        this.$refs.userId.focus();
        return false;
      }
      this.confirmConfig.isMailSend = true;
      this.confirmCountDown();
    },
    snsNaverLogin() {
      const naver_id_login = new window.naver_id_login(
        "Client Id",
        "callback URL"
      );
      const state = naver_id_login.getUniqState();
      naver_id_login.setButton("white", 2, 40); // 버튼 설정
      naver_id_login.setState(state);
      // naver_id_login.setPopup(); // popup 설정을 위한 코드
      naver_id_login.init_naver_id_login();
    },
    snsKakaoLogin() {
      /*
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: "/v1/user/unlink",
          success: function (response) {
            console.log(response);
          },
          fail: function (error) {
            console.log(error);
          },
        });
        window.Kakao.Auth.setAccessToken(undefined);
      }
*/
      const that = this;
      window.Kakao.Auth.login({
        success: function () {
          console.log(window.Kakao.Auth.getAccessToken());
          that
            .$request({
              method: "POST",
              url: "/api/auth/kakao/login",
              data: {
                token: window.Kakao.Auth.getAccessToken(),
              },
            })
            .then((response) => {
              const { bool, data, msg, code } = response;

              if (!bool) {
                if (code == "AU001") {
                  that.authFormData = data;
                  that.authFormData.type = "join";
                  console.log(that.authFormData);
                } else {
                  Toast(msg);
                }
              } else if (bool) {
                that.$store.state.showLoginPop = false;
              } else {
                Toast(msg);
              }
              console.log(bool, data, msg);
            });
          // window.Kakao.API.request({
          //   url: "/v2/user/me",
          //   success: async function (response) {
          //     console.log(response);
          //   },
          //   fail: function (error) {
          //     console.log(error);
          //   },
          // });
        },
        fail: function (error) {
          console.log(error);
        },
      });
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

.user-login-pop {
  max-height: 90vh;
  height: 90vh;
  background: #fff;
}

.user-login-form,
.user-join-form {
  margin: 30px 15px 15px;
  padding: 35px 0px 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 1px 7px #d6d6d657;
}
.user-sns-area {
  padding: 10px 20px 30px;
  background: #ffffff;
  border-radius: 10px;
}
.user-sns-title {
  border-bottom: 1px solid #dcdcdc73;
  font-size: 15px;
  padding-bottom: 10px;
  margin-top: 6px;
}
.user-sns-btn {
  background: #dcdcdc;
  margin-bottom: 10px;
  line-height: 33px;
  border-radius: 6px;
}
.user-sns-btn .stick {
  border-right: 1px solid #dcdcdc8f;
  margin-right: 20px;
}
.user-sns-btn.kakao {
  background: #ffe802;
}
.user-sns-btn.naver {
  background: #04c75a;
  color: #fff;
}
.user-sns-btn.google {
  background: #e94337;
  color: #fff;
}
.login-sns-icon {
  height: 33px;
  vertical-align: middle;
  margin: 6px;
}
.align-right.sns-icon {
  padding-right: 15px;
}
.sns-text {
  line-height: 45px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
}
.user-login-pop .van-action-sheet__content {
  background: #f6f6f6;
}
.user-acount-etc {
  margin-top: 15px;
  font-size: 13px;
  padding: 0px 10px;
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

::v-deep .login-input-label .van-field__label {
  text-align: center;
}
</style>
