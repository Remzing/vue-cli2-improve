import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 银行卡列表
 */
export function bankCard (formData) {
  return request({
    url: '/finance/bankCard.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 查看客户
 */
export function userBasicInit (formData) {
  return request({
    url: '/finance/userBasicInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
