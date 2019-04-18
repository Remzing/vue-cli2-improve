import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 查询产品行业
 */
export function queryList (formData) {
  return request({
    url: '/industry/queryList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 添加保存产品行业
 */
export function addOrUpdateIndustry (formData) {
  return request({
    url: '/industry/addOrUpdateIndustry.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 删除产品行业
 */
export function delIndustry (formData) {
  return request({
    url: '/industry/delIndustry.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
