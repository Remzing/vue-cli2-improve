import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 消息模版列表初始化
 */
export function messageListInit (formData) {
  return request({
    url: '/settings/messageListInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 消息类型下拉框
 */
export function messageType (formData) {
  return request({
    url: '/settings/messageType.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 消息列表
 */
export function messageList (formData) {
  return request({
    url: '/settings/messageList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑消息数据回显
 */
export function compileMessageEcho (formData) {
  return request({
    url: '/settings/compileMessageEcho.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑消息
 */
export function compileMessage (formData) {
  return request({
    url: '/settings/compileMessage.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更改状态回显
 */
export function changeStateEcho (formData) {
  return request({
    url: '/settings/changeStateEcho.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更改状态
 */
export function changeState (formData) {
  return request({
    url: '/settings/changeState.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
