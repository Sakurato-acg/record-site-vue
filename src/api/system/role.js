import request from '../../utils/request'

//角色管理模块

//获取角色下拉框列表 role_id + role_name

export const roleSelectService = () => {
  return request.get('/role/select')
}

//获取角色列表
export const roleListService = (from) => {
  return request.post('/role/list', from)
}

//获取角色详情
export const roleInfoService = (id) => {
  return request.get(`/role/${id}`)
}

//更新角色
export const roleUpdateService = (from) => {
  return request.put('/role', from)
}

//删除角色
export const roleDeleteService=(form)=>{
  return request.delete('/role/'+form)
}