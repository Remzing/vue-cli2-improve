import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 定制需求模版列表
 */
export function queryList (formData) {
  return request({
    url: '/made/queryList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 新增更新定制模版
 */
export function addOrUpdateMade (formData) {
  return request({
    url: '/made/addOrUpdateMade.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 删除定制需求
 */
export function delMade (formData) {
  return request({
    url: '/made/delMade.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
