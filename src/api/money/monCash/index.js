import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 提现列表
 */
export function cashFinanceList (formData) {
  return request({
    url: '/finance/cashFinanceList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 提现审核初始化
 */
export function reviewInit (formData) {
  return request({
    url: '/finance/reviewInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 审核通过
 */
export function reviewOk (formData) {
  return request({
    url: '/finance/reviewOk.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 拒绝审核
 */
export function notReview (formData) {
  return request({
    url: '/finance/notReview.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 申请结果列表
 */
export function cashResultList (formData) {
  return request({
    url: '/finance/cashResultList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 提现详情
 */
export function cashInfo (formData) {
  return request({
    url: '/finance/cashInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
