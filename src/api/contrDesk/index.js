import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 *  控制台 
 */
/**
 * 工作台基本数据
 */
export function conBaseData (formData) {
  return request({
    url: '/workbench/workbenchAmount.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 工作台代办提醒
 */
export function conremind (formData) {
  return request({
    url: '/workbench/commissionRemind.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}