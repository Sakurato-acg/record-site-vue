import request from '../../utils/request'

//获取首页博客文章列表
export const articleHomeListService = (form) => {
  return request.post('/blogArticle/front/list', form)
}
//根据 id 获取前台博客文章
export const articleDetailService = (id) => {
  return request.get(`/blogArticle/front/${id}`)
}
