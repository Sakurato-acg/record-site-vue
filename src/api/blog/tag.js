import request from '../../utils/request'

//获取首页标签列表
export const tagHomeListService = () => {
  return request.get('/blogTag/front', {
    params: {
      //只显示10个分类
      pageSize: 10
    }
  })
}
