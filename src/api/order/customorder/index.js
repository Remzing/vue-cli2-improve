import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 定制订单列表初始化
 */
export function selectOrderMadeInit (formData) {
  return request({
    url: '/order/selectOrderMadeInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 定制订单列表
 */
export function selectOrderMadeList (formData) {
  return request({
    url: '/order/selectOrderMadeList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 查看定制订单详情
 */
export function selectOrderMadeInfo (formData) {
  return request({
    url: '/order/selectOrderMadeInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 修改合同
 */
export function updateContractNo (formData) {
  return request({
    url: '/order/updateContractNo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 更改定制订单状态
 */
export function updateOrderMadeState (formData) {
  return request({
    url: '/order/updateOrderMadeState.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
