import request from '../../utils/request'

//上传md件
export const uploadMdService = (file) => {
  return request({
    url: '/media/upload/md',
    method: 'post',
    data: file,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

//上传文md件
export const uploadImageService = (file) => {
  return request({
    url: '/media/upload/image',
    method: 'post',
    data: file,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}
