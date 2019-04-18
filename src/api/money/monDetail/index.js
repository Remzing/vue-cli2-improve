import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 收支明细
 */
export function financeDetail (formData) {
  return request({
    url: '/finance/financeDetail.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 查看详情
 */
export function queryFinanceById (formData) {
  return request({
    url: '/finance/queryFinanceById.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
