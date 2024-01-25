import axios from 'axios'

const baseUrl = 'https://api.vore.top/'

//根据ip获取位置信息
export const getLocationService = (ip) => {
  if (ip == undefined) {
    return axios.get(baseUrl + '/api/IPdata')
  } else {
    return axios.get(baseUrl + `/api/IPdata?ip=${ip}`)
  }
}
export const getQQAvatarService = (email)=>{
  return axios.get(`https://q2.qlogo.cn/headimg_dl?dst_uin=${email}&spec=160`)
}

