import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 小程序订单列表初始化
 */
export function xcxListInit (formData) {
  return request({
    url: '/order/selectOrderXcxListInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 小程序订单列表
 */
export function selectOrderXcxList (formData) {
  return request({
    url: '/order/selectOrderXcxList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 查看小程序订单
 */
export function selectOrderXcxInfo (formData) {
  return request({
    url: '/order/selectOrderXcxInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 手工续费
 */
export function handRenew (formData) {
  return request({
    url: '/order/handRenew.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更改到期时间
 */
export function updateEndTime (formData) {
  return request({
    url: '/order/updateEndTime.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 关闭应用
 */
export function closeOrderXcx (formData) {
  return request({
    url: '/order/closeOrderXcx.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 打开应用
 */
export function openOrderXcx (formData) {
  return request({
    url: '/order/openOrderXcx.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 小程序订单记录
 */
export function orderXcxLog (formData) {
  return request({
    url: '/order/orderXcxLog.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
