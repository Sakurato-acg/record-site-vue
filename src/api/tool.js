import axios from 'axios'

const baseUrl = 'https://api.vore.top/'

//根据ip获取位置信息
export const getLocationService = (ip) => {
  return axios.get(baseUrl + `/api/IPdata?ip=${ip}`)
}
