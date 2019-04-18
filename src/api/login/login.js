import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

//登录
export function login (formData) {
  console.log('api-login:', formData)
  return request({
    url: '/manager/adminLogin.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
//验证码
export function getCode () {
  return request({
    url: '/imageCode.do',
    method: 'post',
    data: qs.stringify({})
  })
}


export function logout () {
  return request({
    url: '/user/exitLogin.do',
    method: 'post',
    data: qs.stringify({})
  })
}

//忘记密码
export function forgetPsw (formData) {
  return request({
    url: '/manager/updatepwd.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}


//忘记密码-发送短信
export function sendCode (formData) {
  return request({
    url: '/manager/sendcode.do',
    method: 'get',
    data: qs.stringify(formData)
  })
}
