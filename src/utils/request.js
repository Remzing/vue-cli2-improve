import axios from 'axios'
import { Message, Loading} from 'element-ui'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: window.REQUEST_API_URL// api的base_url
  // timeout: 15000 // 请求超时时间
})
let loading = {}
// 允许跨域访问
service.defaults.withCredentials = true
// request拦截器
service.interceptors.request.use(config => {
  // 让发送的数据变为键值对的形式发送  -- 解决请求会发送options的问题
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  loading = Loading.service({
    lock: true,
    text: '',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.03)'
  })
  return config
}, error => {
  // Do something with request error
  console.log('error', error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * errcode 可结合自己业务进行修改
     */
    loading.close()
    console.log('response:', response)
    const res = response.data
    if (res.errcode < 1) {
      Message({
        message: res.errmsg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error('errmsg: ' + res.errmsg))
    } else if (res === 'noLogin') {
      Message({
        message: '未登录或登录已过期,请重新登录',
        type: 'error',
        duration: 3 * 1000
      })
      router.push({
        path: '/'
      })
      return Promise.reject(new Error('noLogin!'))
    } else {
      return response.data
    }
  },
  error => {
    console.error('err' + error)// for debug
    Message({
      message: '请求出错或超时！' + error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
