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

//上传图片
export const uploadImageService = (way,file) => {
  return request({
    url: `/media/upload/image/${way}`,
    method: 'post',
    data: file,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}
