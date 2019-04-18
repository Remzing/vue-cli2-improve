import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 查询支付接口
 */
export function queryAlipay (formData) {
  return request({
    url: '/bank/queryAlipay.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 保存支付接口
 */
export function saveAlipay (formData) {
  return request({
    url: '/bank/saveAlipay.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
