import axios from 'axios'
//https://bangumi.github.io/api/#/
const baseUrl = 'https://api.bgm.tv'

//获取番剧详情
export const subjectInfoService = (subject_id) => {
  return axios.get(baseUrl + `/v0/subjects/${subject_id}`)
}
