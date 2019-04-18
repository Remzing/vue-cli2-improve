import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 发票列表
 */
export function billList (formData) {
  return request({
    url: '/finance/billList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 提交财务初始化
 */
export function commitFinanceInit (formData) {
  return request({
    url: '/finance/commitFinanceInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 提交财务／取消开票
 */
export function commitFinance (formData) {
  return request({
    url: '/finance/commitFinance.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 确认开票初始化
 */
export function confirmBillInit (formData) {
  return request({
    url: '/finance/confirmBillInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 确认开票
 */
export function confirmBill (formData) {
  return request({
    url: '/finance/confirmBill.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 发票信息
 */
export function billDetail (formData) {
  return request({
    url: '/finance/billDetail.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 发票详情
 */
export function billDetailInfo (formData) {
  return request({
    url: '/finance/billDetailInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 邮寄信息初始化
 */
export function mailAddressInfo (formData) {
  return request({
    url: '/finance/mailAddressInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 邮寄信息-确认寄出
 */
export function confirmMail (formData) {
  return request({
    url: '/finance/confirmMail.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
