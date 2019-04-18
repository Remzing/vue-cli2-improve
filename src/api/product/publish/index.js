import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 发布产品初始化
 */
export function publishProductInit (formData) {
  return request({
    url: '/product/publishProductInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 产品更新初始化
 */
export function updateProductInit (formData) {
  return request({
    url: '/product/updateProductInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 发布产品或更新
 */
export function publishProduct (formData) {
  return request({
    url: '/product/publishProduct.do',
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
 * 产品库列表初始化
 */
export function selectProductListInit (formData) {
  return request({
    url: '/product/selectProductListInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 产品库列表
 */
export function selectProductList (formData) {
  return request({
    url: '/product/selectProductList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 上/下架产品
 */
export function putawayProduct (formData) {
  return request({
    url: '/product/putawayProduct.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 添加产品合法域名初始化
 */
export function updateProductUrlInit (formData) {
  return request({
    url: '/product/updateProductUrlInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 添加产品合法域名
 */
export function updateProductUrl (formData) {
  return request({
    url: '/product/updateProductUrl.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 删除产品
 */
export function deleteProduct (formData) {
  return request({
    url: '/product/deleteProduct.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
