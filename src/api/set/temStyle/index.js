import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 查询模版风格
 */
export function queryList (formData) {
  return request({
    url: '/style/queryList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 保存更新模版风格
 */
export function addOrUpdateStyle (formData) {
  return request({
    url: '/style/addOrUpdateStyle.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 删除风格
 */
export function delStyle (formData) {
  return request({
    url: '/style/delStyle.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
