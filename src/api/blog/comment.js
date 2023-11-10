import request from '../../utils/request'

//获取文章评论列表
export const commentListService = (form) => {
  return request.post('/comment', form)
}
