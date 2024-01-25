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

//获取select标签列表
export const tagSelectListService=()=> { 
  return request.get('/blogTag/select') 
}
//获取后台标签列表
export const tagAdminListService=(form)=> { 
  return request.post('/blogTag/admin',form) 
}
//添加标签
export const tagAddService=(form)=> { 
  return request.put('/blogTag',form) 
}
//获取标签详情
export const tagInfoService=(id)=>{
  return request.get(`/blogTag/${id}`)
}
//更新标签
export const tagUpdateService=(form)=>{
  return request.post(`/blogTag/${form.id}`,form) 
}
//删除标签
export const tagDeleteService=(form)=>{
  return request.delete('/blogTag/' + form)
}