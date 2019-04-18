import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 定制需求列表初始化
 */
export function selectDemandListInit (formData) {
  return request({
    url: '/operation/selectDemandListInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 定制需求列表
 */
export function selectDemandList (formData) {
  return request({
    url: '/operation/selectDemandList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更改需求状态
 */
export function updateDemandState (formData) {
  return request({
    url: '/operation/updateDemandState.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 创建定制订单
 */
export function createOrderMade (formData) {
  return request({
    url: '/operation/createOrderMade.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
