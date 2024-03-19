import axios from 'axios'
import qs from 'qs'
import { useUserStore } from '../stores/index.js'
import { ElMessage } from 'element-plus'
import router from '../router/index.js'

// const baseURL = `${'http://2858534773.gnway.cc:8000'}`
const baseURL = 'http://localhost:82'

const instance = axios.create({
  baseURL,
  timeout: 20000
})

instance.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // if (userStore.token && config.url != 'https://bgm.tv/subject/389474') {
    //   config.headers.token = userStore.token
    // }
    if (userStore.token) {
      config.headers.token = userStore.token
    }

    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 200) {
      if (res.data.msg !== undefined) {
        ElMessage.success(res.data.msg)
      }
      return res.data.data
    }
    // TODO 5. 处理40x / 50x 错误
    // 错误的特殊情况 => 501需要登录 503权限不足 或 token 过期 => 拦截到登录
    if (res.data.code === 501 || res.data.code === 503) {
      ElMessage.error(res.data.msg || '服务异常')
      const useStore = useUserStore()
      useStore.removeToken()
      router.push('/login')
      return Promise.reject(res.data)
    }

    // TODO 3. 处理业务失败
    // 处理业务失败, 给错误提示，抛出错误
    ElMessage.error(res.data.msg || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // alert(2)
    // 错误的默认情况 => 只要给提示
    if (err.response != undefined) {
      ElMessage.error(err.response.data.msg || '服务异常')
    } else {
      ElMessage.error('服务异常')
    }
    return Promise.reject(err)
  }
)

export default instance
