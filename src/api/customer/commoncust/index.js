import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 全部客户列表
 */
export function getList (formData) {
  return request({
    url: '/user/selectUserList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 查看客户详细信息
 */
export function selectUserInfo (formData) {
  return request({
    url: '/user/selectUserInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更换客服初始化
 */
export function updateCsInit (formData) {
  return request({
    url: '/user/updateCsInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更换客服
 */
export function updateCs (formData) {
  return request({
    url: '/user/updateCs.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 密码重置
 */
export function updatePassword (formData) {
  return request({
    url: '/user/updatePassword.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 变更状态
 */
export function updateUserState (formData) {
  return request({
    url: '/user/updateUserState.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 变更状态
 */
export function loginLog (formData) {
  return request({
    url: '/user/loginLog.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
