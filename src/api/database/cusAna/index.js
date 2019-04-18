import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 *  客户分析 
 */
/**
 * 昨日关键指标
 */
export function yesterdayTarget (formData) {
  return request({
    url: '/data/clientYesterdayTarget.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 客户分析列表
 */
export function dataCountList (formData) {
  return request({
    url: '/data/clientList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 趋势图
 */
export function areaAnaly (formData) {
  return request({
    url: '/data/areaAnalyzeTendencyChartSelect.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 区域分析
 */
export function regInit (cityList) {
  return request({
    url: '/data/areaAnalyzeInit.do',
    method: 'post',
    data: qs.stringify(cityList)
  })
}