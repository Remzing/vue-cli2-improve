import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 *  财务分析 
 */
/**
 * 昨日关键指标
 */
export function yesterdayTarget (formData) {
  return request({
    url: '/data/financeYesterdayTarget.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 财务分析列表
 */
export function dataCountList (formData) {
  return request({
    url: 'data/financeList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
// /**
//  * 趋势图
//  */
export function areaAnaly (formData) {
  return request({
    url: '/data/financeTendencyChart.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 交易分布
 */
export function regInit (formData) {
  return request({
    url: '/data/financeDistributionDiagramInit.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}