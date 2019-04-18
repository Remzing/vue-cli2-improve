import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 *  产品分析 
 */
/**
 * 昨日关键指标
 */
export function yesterdayTarget (formData) {
  return request({
    url: '/data/productKeyIndex.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 产品分析列表
 */
export function dataCountList (formData) {
  return request({
    url: '/data/productAnalyzeList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
// /**
//  * 趋势图
//  */
export function areaAnaly (formData) {
  return request({
    url: '/data/productTendencyChartSelect.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}
/**
 * 产品销售排行
 */
export function proInit (cityList) {
  return request({
    url: '/data/productSalesRank.do',
    method: 'post',
    data: qs.stringify(cityList)
  })
}

/**
 * 产品销售区域排行
 */
export function regInit (cityList) {
  return request({
    url: '/data/productSalesAreaRank.do',
    method: 'post',
    data: qs.stringify(cityList)
  })
}