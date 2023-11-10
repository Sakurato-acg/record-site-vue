import axios from 'axios'
import { useUserStore } from '../stores/index.js'
import { ElMessage } from 'element-plus'
import router from '../router/index.js'

// const baseURL = `${'http://j8180072h3.goho.co:37486'}`
const baseURL = 'http://localhost:81'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

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
    // console.log(res)
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 200) {
      if (res.data.msg !== undefined) {
        ElMessage.success(res.data.msg)
      }
      return res.data.data
    }
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 403权限不足 或 token 过期 => 拦截到登录
    if (res.data.code === 401 || res.data.code === 403) {
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
    // ElMessage.error(err.response.data.message || '服务异常')
    ElMessage.error('服务异常')
    return Promise.reject(err)
  }
)

export default instance
