import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 企业审核列表
 */
export function getList (formData) {
  return request({
    url: '/user/selectCompanyAuditList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 企业审核
 */
export function auditHandle (formData) {
  return request({
    url: '/user/conpanyAudit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
