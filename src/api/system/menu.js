import request from '../../utils/request'

//权限管理模块

//查询后台权限列表
export const menuListService = (form) => {
  return request.post('/menu', form)
}

//查询权限详细信息
export const menuInfoService = (id) => {
  return request.get(`/menu/${id}`)
}

//查询权限下拉框
export const menuSelectService = () => {
  return request.get('/menu/select')
}

//更新权限
export const menuUpdateService = (form) => {
  return request.put('/menu', form)
}

//增加权限
export const menuAddService = (form) => {
  return request.post('/menu/add', form)
}

//删除权限
export const menuDeleteService = (form) => {
  return request.delete(`/menu/${form}`)
}
