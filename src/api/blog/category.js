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

//获取select分类列表
export const categorySelectListService=()=> { 
  return request.get('/blogCategory/select') 
}

//获取后台分类列表
export const categoryAdminListService=(form)=> { 
  return request.post('/blogCategory/admin',form) 
}

//添加分类
export const categoryAddService=(form)=> { 
  return request.put('/blogCategory',form) 
}
//获取分类详情
export const categoryInfoService=(id)=>{
  return request.get(`/blogCategory/${id}`)
}
//更新分类
export const categoryUpdateService=(form)=>{
  return request.post(`/blogCategory/${form.id}`,form) 
}
//删除分类
export const categoryDeleteService=(form)=>{
  return request.delete('/blogCategory/' + form)
}