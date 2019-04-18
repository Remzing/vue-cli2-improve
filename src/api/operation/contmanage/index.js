import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题

/**
 * 服务协议初始化
 */
export function serviceContractInit (formData) {
  return request({
    url: '/operation/serviceContractInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 法律声明和隐私政策内容初始化
 */
export function selectLawInit (formData) {
  return request({
    url: '/operation/selectLawInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 服务协议修改
 */
export function saveServiceContract (formData) {
  return request({
    url: '/operation/saveServiceContract.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 法律声明和隐私政策内容编辑
 */
export function saveLaw (formData) {
  return request({
    url: '/operation/saveLaw.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
