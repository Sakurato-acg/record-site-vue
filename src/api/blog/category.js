import request from '../../utils/request'

//获取首页分类文章列表
/**
 *
 * @returns List<Category>
 * category{
 *  id  name count
 * }
 */
export const categoryHomeListService = () => {
  return request.get('/blogCategory/front', {
    params: {
      //只显示10个分类
      pageSize: 10
    }
  })
}
