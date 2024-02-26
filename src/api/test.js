import axios from 'axios'

const baseUrl = 'https://you.ctrip.com/place/hangzhou14.html'

export const test = () => {
  return axios({
    method: 'POST',
    url: 'https://m.ctrip.com/restapi/soa2/20036/json/getPoiMoreDetail',
    data: {
      poiId: '82922',
      scene: 'basic',
      head: {
        cid: '09031082319400117095',
        ctok: '',
        cver: '1.0',
        lang: '01',
        sid: '8888',
        syscode: '09',
        auth: '',
        xsid: '',
        extension: []
      }
    }
  })
}

export const getQQAvatarService = (email) => {
  return axios.get(`https://q2.qlogo.cn/headimg_dl?dst_uin=${email}&spec=160`)
}
