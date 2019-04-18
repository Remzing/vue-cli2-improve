import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 对公转账列表
 */
export function companyAccounts (formData) {
  return request({
    url: '/finance/companyAccounts.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 确认到账
 */
export function confirmTheAccount (formData) {
  return request({
    url: '/finance/confirmTheAccount.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
