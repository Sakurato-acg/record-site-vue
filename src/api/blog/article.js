import request from '../../utils/request'

//获取前台博客文章列表
export const articleFrontListService = (form) => {
  return request.post('/blogArticle/front/list', form)
}
//根据 id 获取前台博客文章
export const articleFrontDetailService = (id) => {
  return request.get(`/blogArticle/front/${id}`)
}

//根据id更新文章浏览量
export const articleViewCountUpdatedService=(id)=>{
  return request.post(`/blogArticle/updateView/${id}`)
}

//获取后台文章列表
export const articleAdminListService = (form) => {
  return request.post('/blogArticle/admin/list', form)
}

//根据 id 获取后台博客文章
export const articleAdminDetailService = (id) => {
  return request.get(`/blogArticle/admin/${id}`)
}

//新增文章
export const articleAddService = (form) => {
  return request.post('/blogArticle/admin', form)
}

//更新文章
export const articleUpdateService = (form) => {
  return request.put('/blogArticle/admin', form)
}

//删除文章
export const articleDeleteService = (ids) => {
  return request.delete(`/blogArticle/${ids}`)
}
