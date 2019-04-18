import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 查询对公信息
 */
export function queryBankInfo (formData) {
  return request({
    url: '/bank/queryBankInfo.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑对公信息
 */
export function editPublicMsg (formData) {
  return request({
    url: '/bank/editPublicMsg.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
