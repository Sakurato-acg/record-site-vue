import request from '../../utils/request'

//角色管理模块

//获取角色列表 role_id + role_name

export const roleSelectService = () => {
  return request.get('/role/select')
}
