import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题


/**
 * 广告管理
 */
export function selectBanner (formData) {
  return request({
    url: '/banner/selectBanner.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 编辑广告初始化
 */
export function editBannerInit(formData) {
  return request({
    url: '/banner/editBannerInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 新增广告
 */
export function editBanner(formData) {
  return request({
    url: '/banner/editBanner.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 删除广告
 */
export function delBanner(formData) {
  return request({
    url: '/banner/delBanner.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}