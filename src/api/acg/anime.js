import request from '../../utils/request'

//获取番剧列表
export const animeListService = (form) => {
 return request.post('/anime/admin/list', form)
}
export const animeGetByIdService = (id) => {
  return request.get(`/anime/${id}`)
}
//添加番剧
export const animeAddService = (form) => {
  return request.put('/anime', form)
}

export const animeUpdateService = (form) => {
  return request.post('/anime ', form)
}

export const animeDeleteService = (form) => {
  return request.delete('/anime/' + form)
}
