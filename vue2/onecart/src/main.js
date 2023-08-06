import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "./util/request";
import { numberFormat } from "./util/tools";
// eslint-disable-next-line
Vue.prototype.$request = request
Vue.prototype.$tools = {
  numberFormat,
};
import {
  NavBar,
  Button,
  Tabbar,
  TabbarItem,
  Locale,
  Search,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Col,
  Row,
  Sticky,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Overlay,
  ActionSheet,
  Empty,
  Stepper,
  Collapse,
  CollapseItem,
  Form,
  Field,
  Calendar,
  DatetimePicker,
  RadioGroup,
  Radio,
} from "vant";
import "vant/lib/index.css";
import "@/assets/css/global.css";
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Sticky);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Overlay);
Vue.use(ActionSheet);
Vue.use(Empty);
Vue.use(Stepper);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Calendar);
Vue.use(DatetimePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
// import koKR from 'vant/es/locale/lang/ko-KR';
// Locale.use('ko-KR', koKR);
import ko from "vant/lib/locale/lang/ko-KR";
Locale.use("ko-KR", ko);

Vue.config.productionTip = false;
import ProductDetail from "@/components/product/ProductDetail";
Vue.component(ProductDetail.name, ProductDetail);
// import UserLogin from 'components/UserLogin';
// Vue.component(UserLogin.name, UserLogin)
// import SearchForm from '@/components/SearchForm';
// Vue.component(SearchForm.name, SearchForm)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
