import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
    timeout: 10000 // timeout
})

request.interceptors.request.use(
    config => {
        config.headers.token = 'test'
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
        return Promise.reject(message)
    }
)