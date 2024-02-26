import request from '../../utils/request'

// 注册接口
export const userRegisterService = (form) => {
  return request.put('/user/register', form)
}

// 登录接口
export const userLoginService = (form) => {
  return request.post('/user/login', form)
}
// 注销接口
export const userLogoutService = () => {
  return request.delete('/user/logout')
}

//获取路由
export const userRouterService = () => {
  return request.get('/user/router')
}

//获取用户信息
export const userInfoService = (id) => {
  if (id == undefined) {
    return request.get('/user/header')
  } else {
    return request.get('/user/admin?id=' + id)
  }
}

//更新用户
export const userUpdateService = (form) => {
  return request.put('/user/edit',form)
}
