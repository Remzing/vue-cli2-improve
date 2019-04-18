import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 模板库列表初始化
 */
export function selectTemplateInit (formData) {
  return request({
    url: '/product/selectTemplateInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 模板库列表
 */
export function selectTemplateList (formData) {
  return request({
    url: '/product/selectTemplateList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑模板初始化
 */
export function setTemplateInit (formData) {
  return request({
    url: '/product/setTemplateInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 编辑或新增模板
 */
export function setTemplate (formData) {
  return request({
    url: '/product/setTemplate.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 保存更新模版风格
 */
export function addOrUpdateStyle (formData) {
  return request({
    url: '/product/addOrUpdateStyle.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 上/下架模板
 */
export function putawayTemplate (formData) {
  return request({
    url: '/product/putawayTemplate.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
