import request from '../../utils/request'

//用户管理模块

//用户列表
export const userListService = (form) => {
  return request.post('/user/admin/list', form)
}

//删除用户
export const userDeleteService = (form) => {
  return request.delete('/user/'+form)
}

//更新用户
export const userUpdateService = (form) => {
  return request.put('/user',form)
}