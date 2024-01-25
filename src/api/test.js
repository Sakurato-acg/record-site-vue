import axios from 'axios'

const baseUrl = 'https://you.ctrip.com/place/hangzhou14.html'

export const test=()=>{
    return axios.get(baseUrl)
}

export const getQQAvatarService = (email)=>{
  return axios.get(`https://q2.qlogo.cn/headimg_dl?dst_uin=${email}&spec=160`)
}

