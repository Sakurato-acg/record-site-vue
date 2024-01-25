import axios from 'axios'
//https://bangumi.github.io/api/#/
const baseUrl = 'https://api.bgm.tv'

//获取番剧详情
export const subjectInfoService = (subject_id) => {
  return axios.get(baseUrl + `/v0/subjects/${subject_id}`)
}

export const test = () => {
  // axios.head('Access-Control-Allow-Origin', 'https://api.bilibili.com')
  return axios.get(
    'https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=265601447&season_id=1046978&sort_reverse=false&page_num=2&page_size=30'
  )
}
