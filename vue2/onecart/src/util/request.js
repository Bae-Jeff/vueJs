import axios from "axios";
import { Toast } from "vant";
import store from "@/store";
const request = (options) => {
  return new Promise((resolve, reject) => {
    if (options.method == "POST") {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    store.commit("IS_LOADING", true);
    console.log(options);
    axios({
      ...options,
      headers: {
        ...options.headers,
        token: "test",
      },
      timeout: 10000,
    })
      .then((response) => {
        if (store) {
          store.commit("IS_LOADING", false);
        }
        resolve(response.data);
      })
      .catch((error) => {
        if (store) {
          store.commit("IS_LOADING", false);
        }
        if (error.response) {
          // 서버에서 오류 응답을 반환한 경우
          Toast.fail(
            "요청을 전송하는 동안 오류가 발생했습니다." + error.message
          );
        } else if (error.request) {
          // 요청 전송 중에 오류가 발생한 경우
          Toast.fail("요청을 전송하는 동안 오류가 발생했습니다.");
        } else {
          // 오류가 발생한 경우
          Toast.fail(
            "요청을 전송하는 동안 오류가 발생했습니다." + error.message
          );
        }
        reject(error);
      });
  });
};
export default request;

/*
import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
    timeout: 10000 // timeout
})

request.interceptors.request.use(
    config => {
        config.headers.token = 'This is user login Token__'
        return config
    }, error => {
        Toast.fail(error.message)
        return Promise.reject(error.message)
    }
)
request.interceptors.response.use(
    response => {
        const { code, message } = response.data
        if (code == 200) {
            return response.data
        } else {
            Toast.fail(message)
            return Promise.reject(message)
        }
    },
    error => {
        Toast.fail(error.message)
        return Promise.reject(error.message)
    }
)
export default request
*/
