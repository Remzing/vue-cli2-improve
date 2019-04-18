import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 *  控制台 
 */
/**
 * 工作台数据分析
 */
export function chartBoxData (formData) {
  return request({
    url: '/workbench/informationAnalyze.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 工作台趋势图
 */
export function trendBoxData (formData) {
  return request({
    url: '/workbench/trendData.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}