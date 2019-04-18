import request from '@/utils/request'
import qs from 'qs' // 解决axios 数据格式转换的问题
/**
 * 数据统计
 */
/**
 * 昨日关键指标
 */
export function yesterdayTarget (formData) {
  return request({
    url: '/data/dataYesterdayTarget.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}

/**
 * 数据统计列表
 */
export function dataCountList (formData) {
  return request({
    url: '/data/selectDataStatisticsList.do',
    method: 'post',
    data: qs.stringify(formData)
  })
}